window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sendCodeButton', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});

console.log('Check onAuthStateChanged: ', new Date());
firebase.auth().onAuthStateChanged(async (result) => {
  console.log("onAuthStateChanged callback: ", new Date());
  const now = new Date().toISOString();
  if (result) {
    // Get and set current user
    const authenticated = result;
    authUser.current = authenticated;
    console.log("authUser:", authUser.current);
    localStorage.setItem('authUserId', authenticated.uid);
    try {
      setPreferredLogInMethodCookie(authenticated.providerData[0].providerId);
      const doc = await db.collection("users").doc(authenticated.uid).get();
      if (doc.exists) {
        identify(authenticated, doc.data());
        console.log("user:", doc.data());
        user.current = doc.data();
      }
      await saveRefreshToken();
    } catch (error) {
      errorHandler.report(error);
      console.log("Error getting document:", error);
    }
  } else {
    console.log('No user');
    localStorage.removeItem('authUserId')
    // Go to landing page if no user and on logged in pages
    const path = window.location.pathname;
    // Latest page view for logged out users
    analytics.identify({ latestPageView: now });

    if (path === "/private" || path === "/personal-id-form" || path === "/address-form" || path === "/item" || path === "/ship-item" || path === "/edit-item" || path === "/order-bags") {
      location.href = './';
    }
    if (path === "/"){
      headerLoginLoading.style.display = 'none';
      headerLoginButton.style.display = 'flex';
    }
  }
});

async function saveRefreshToken() {
  const refreshToken = authUser.current.refreshToken
  const idToken = await authUser.current.getIdToken();
  try {
    // TODO: Change to maiapp.se to go live
    return await fetch('https://api.shh-test.page/maiappAuth', {
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'X-Mai-Refresh-Token': refreshToken,
      }
    });
  } catch (ex) {
    errorHandler.report(ex);
    console.log('Error setting cookie with refresh token', ex);
  }
}

async function loginWithCookieToken() {
  const cookie = getCookie('maiAuth');
  if (!cookie?.length) {
    return;
  }
  if (authUser.current) {
    return; // No need to log in
  }
  try {
    // Get an id token that can be validated by the firebase function maiappAuth
    const refreshResponse = await fetch(`https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: cookie
      })
    });
    const refreshJson = await refreshResponse.json();
    if (refreshJson.id_token && !authUser.current) {
      // Get a custom token that we can use to sign in
      const customTokenResponse = await fetch(`https://api.shh-test.page/maiappAuth?id_token=${refreshJson.id_token}`);
      const customTokenJson = await customTokenResponse.json();
      if (customTokenJson.status === 'customToken' && !authUser.current) {
        await firebase.auth().signInWithCustomToken(customTokenJson.customToken);
      }
    }
  } catch (ex) {
    errorHandler.report(ex);
    console.log('Failed to log in using saved token', ex);
  }
}

loginWithCookieToken();

function userIsSellingNewItem() {
  return sessionStorage.getItem('itemToBeCreatedAfterSignIn') &&
    (document.referrer.includes('/sell-item') || document.referrer.includes('/item-valuation'));
}

async function updateFirestoreUserDocument(userId, email, phone, ssn) {
  let fields = {};
  if (email) { fields["email"] = email; }
  if (phone) { fields["phoneNumber"] = phone; }
  if (ssn) { fields["personalId"] = ssn; }
  const signInMethod = authUser.current.providerData[0].providerId;
  if (signInMethod) { fields["signInMethod"] = signInMethod; }
  const docRef = db.collection("users").doc(userId);

  try {
    const doc = await docRef.get();
    if (doc.exists) {
      await docRef.update(fields);
      console.log(`User document ${userId} was successfully updated with these fields: `, fields);
    } else {
      // Get and set attribution utm parameters only when creating user doc
      const utm_campaign = checkCookie("utm_campaign");
      const utm_source = checkCookie("utm_source");
      const utm_medium = checkCookie("utm_medium");
      const utm_term = checkCookie("utm_term");
      const utm_content = checkCookie("utm_content");
      let a = {};
      if (utm_campaign) { a["utm_campaign"] = utm_campaign; }
      if (utm_source) { a["utm_source"] = utm_source; }
      if (utm_medium) { a["utm_medium"] = utm_medium; }
      if (utm_term) { a["utm_term"] = utm_term; }
      if (utm_content) { a["utm_content"] = utm_content; }
      if (Object.keys(a).length > 0) { fields["attribution"] = a }

      // Create User Document
      await docRef.set(fields);
      console.log(`User document was created with id ${userId} and these fields: `, fields);
      identify(authUser.current, fields);
      user.current = fields;

      // Connect referral user from invite cookie only when creating user doc
      const inputCode = checkCookie("invite");
      if (inputCode) {
        await connectReferralUsers(inputCode);
      }
    }
  } catch (e) {
    errorHandler.report(e);
    console.log("Something went wrong:", e);
  }
}

async function signedInNextStep(fallbackRedirect) {
  // User is signed in
  if (authUser.current) {
    const email = authUser.current.email || sessionStorage.getItem("email");
    const phone = authUser.current.phoneNumber || sessionStorage.getItem("phoneNumber");
    const ssn = authUser.current.personalId || sessionStorage.getItem("personalId");
    await updateFirestoreUserDocument(authUser.current.uid, email, phone, ssn); //Important that this happens first, since many other functions depend on an existing user document
  }
  // If itemCreatedFromAnotherItem in sessionStorage => Back to sell-item
  if (userIsSellingNewItem()) {
    location.href = './sell-item';
  } else if (fallbackRedirect && typeof fallbackRedirect === 'string') {
    location.href = fallbackRedirect;
  } else {
    location.href = './private';
  }
}

function displayPerferredSignInMethod(buttonId) {
  var outerDiv = document.getElementById(buttonId).parentElement;
  var innerDiv = document.getElementById(buttonId);
  preferredSignInMethodDiv.appendChild(outerDiv.removeChild(innerDiv));
  preferredSignInMethodDiv.style.display = 'block';
  showOtherSignInMethodsButton.style.display = 'flex';
  otherSignInMethodsDiv.style.display = 'none';
}

//Get preferred sign in method
const preferredSignInMethod = getPreferredLogInMethod();

if (preferredSignInMethod) {
  console.log("preferredSignInMethod exist", preferredSignInMethod);
  if (preferredSignInMethod === 'google.com') {
    displayPerferredSignInMethod('googleSignInButton');
  }
  if (preferredSignInMethod === 'phone') {
    displayPerferredSignInMethod('smsCodeButton');
  }
  if (preferredSignInMethod === 'password') {
    displayPerferredSignInMethod('emailAndPasswordButton');
  }
}

if (userIsSellingNewItem()) {
  const item = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn')).item;
  itemImage.src = item?.images?.enhancedFrontImageSmall || item?.images?.enhancedFrontImage || '';
  notificationText.innerHTML = `För att fullfölja försäljningen av ditt ${item.brand}-plagg behöver du logga in eller skapa konto`;
  itemToBeCreatedDiv.style.display = 'block';
}

// Disable Webflow form submit
$('#Password-form').submit(function () {
  return false;
});
$('#Choose-password-form').submit(function () {
  return false;
});

var form = document.getElementById("Phone-number-form");
form.addEventListener('submit', phoneSignIn);

function phoneSignIn(event) {
  event.preventDefault();

  submitLoadIcon.style.display = 'block';
  sendCodeButton.style.display = 'none';
  const formPhoneNumber = signinPhoneNumber.value;
  const phoneNumber = `+46${formPhoneNumber}`;

  console.log(formPhoneNumber, phoneNumber);

  const appVerifier = window.recaptchaVerifier;

  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log('V Code' + window.confirmationResult.verificationId);
      mobileNumberDiv.style.display = 'none';
      verifyDiv.style.display = 'block';

    }).catch((error) => {
    // Error; SMS not sent
    // ...
    //errorMessageDiv.style.display = 'block';
    submitLoadIcon.style.display = 'none';
    errorMessageDiv.innerText = error.message;
    console.log('Error message: ' + error.message);
    errorHandler.report(error);
  });
}

signinButton.addEventListener('click', verifyCode);
smsCodeButton.addEventListener('click', function () {
  mobileNumberDiv.style.display = 'block';
  orLoginOtherWayDiv.style.display = 'block';
  loginAlternativesDiv.style.display = 'none';
});

function verifyCode() {
  const code = verificationCode.value;
  console.log('Verify screen. My code: ' + code);
  console.log('VerificationID' + confirmationResult.verificationId);
  confirmationResult.confirm(code).then((result) => {
    const user = result.user;

    if (typeof (Storage) !== "undefined") {
      sessionStorage.setItem("userId", user.uid);
      sessionStorage.setItem("phone", user.phoneNumber);
    } else {
      console.log("Sorry, your browser does not support Web Storage...");
    }

    if (result.additionalUserInfo.isNewUser) {
      emailForTipsDiv.style.display = 'block';
      verifyDiv.style.display = 'none';
    } else {
      authUser.whenSet(signedInNextStep);
    }
  }).catch((error) => {
    console.log('My error: ' + error.message);
    errorHandler.report(error);
  });
}


function addEmailAndNavigate() {
  try {
    tipsEmailButton.style.display = 'none'
    loadingSpinnerDiv.style.display = 'flex'
    if (typeof (Storage) !== "undefined") {
      sessionStorage.setItem("email", emailTipsInput.value);
    } else {
      console.log("Sorry, your browser does not support Web Storage...");
    }

    authUser.whenSet(signedInNextStep);
  } catch (e) {
    console.log('failed to add email', e)
    loadingSpinnerDiv.style.display = 'none'
    tipsEmailButton.style.display = 'block'
    errorHandler.report(e);
  }
}
googleSignInButton.addEventListener('click', signInWithGoogle);
googleSignInButton2.addEventListener('click', signInWithGoogle);
signinFormsDiv.style.display = 'block';
signinLoadingDiv.style.display = 'none';

async function signInWithGoogle() {
  googleButtonText.style.display = 'none';
  googleButtonLoadingIcon.style.display = 'block';
  // [START auth_google_provider_create]
  var provider = new firebase.auth.GoogleAuthProvider();
  // [END auth_google_provider_create]


  //NEW POPUP SIGNIN
  try {
    await firebase.auth().signInWithPopup(provider)
    await authUser.whenSet(signedInNextStep);
  } catch (error) {
    errorHandler.report(error);
    const errorText = `[webflow] Error signing in with Google: ${error.code}, ${error.message}, ${error.email}, ${error}`;
    console.log(errorText);
  }
}

function signInWithEmailPassword() {
  const email = emailAddress.value;
  const password = emailPassword.value;
  signInWithEmailButton.style.display = 'none';
  passwordLoadIcon.style.display = 'block';
  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.userId = user.uid;
      console.log("Logged in user: ", user.uid);
      authUser.whenSet(() => {
        if (!authUser.current.emailVerified && getCookie('viewedVerifyEmailDiv') !== 'true') {
          signedInNextStep('./user-management?mode=sendEmailVerification');
        } else {
          signedInNextStep();
        }
      });
    })
    .catch((error) => {
      errorHandler.report(error);
      console.log("Error message:", error.code, error.message);
      if (error.code === "auth/wrong-password") {
        passwordFeedback.innerText = "Fel lösenord";
        passwordFeedback.style.display = 'block';
        signInWithEmailButton.style.display = 'block';
        passwordLoadIcon.style.display = 'none';
      }
    });
  // [END auth_signin_password]
}

function signUpWithEmailPassword() {
  const email = emailAddress.value;
  const password = newPassword.value;
  signUpWithEmailButton.style.display = 'none';
  newPasswordLoadIcon.style.display = 'block';
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.userId = user.uid;
      console.log("Logged in user: ", user);
      firebase.auth().currentUser.sendEmailVerification().then(() => {
        authUser.whenSet(() => signedInNextStep('./user-management?mode=sendEmailVerification'));
      });
    })
    .catch((error) => {
      errorHandler.report(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error message:", errorCode, errorMessage);
      newPasswordFeedback.innerText = errorMessage;
      signUpWithEmailButton.style.display = 'block';
      newPasswordLoadIcon.style.display = 'none';
    });
  // [END auth_signup_password]
}

function sendPasswordReset() {
  const email = emailAddress.value;
  // [START auth_send_password_reset]
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      console.log("Reset password email sent");
      forgotPasswordText.innerHTML = `Email skickat till ${email}`;
    })
    .catch((error) => {
      errorHandler.report(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  // [END auth_send_password_reset]
}

function checkEmail() {
  const email = emailAddress.value;
  console.log("emailAddress: ", email);
  firebase.auth().fetchSignInMethodsForEmail(email)
    .then((signInMethods) => {
      if (signInMethods.indexOf(
        firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {
        // User can sign in with email/password.
        console.log("Account exists -> Login with email");
        chooseEmailDiv.style.display = 'none';
        signinWithEmailDiv.style.display = 'block';
      } else {
        console.log("Account doesn't exist -> Create new account");
        chooseEmailDiv.style.display = 'none';
        choosePasswordDiv.style.display = 'block';
      }
    })
    .catch((error) => {
      errorHandler.report(error);
      console.log("Error message:", error.code, error.message);
    });
}

emailNextStepButton.addEventListener('click', checkEmail);
tipsEmailButton.addEventListener('click', addEmailAndNavigate)
resetPasswordLink.addEventListener('click', sendPasswordReset);
emailAndPasswordButton.addEventListener('click', function () {
  chooseEmailDiv.style.display = 'block';
  loginAlternativesDiv.style.display = 'none';
});
signUpWithEmailButton.addEventListener('click', signUpWithEmailPassword);
signInWithEmailButton.addEventListener('click', signInWithEmailPassword);
showOtherSignInMethodsButton.addEventListener('click', function () {
  triggerOtherSignInMethodsView.click();
});
