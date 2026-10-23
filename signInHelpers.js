import { openSellAppSheet } from './sellAppSheet';

// New accounts are created in the app (since 2026-10-23): every way of creating one on
// this page opens "Fortsätt med appen" instead. An existing account signs in as before.
// The backend refuses a phone sign-up from the web too (POST /api/users/authVerify);
// e-mail and Google accounts are made by the Firebase SDK itself, so they are stopped here.
function blockWebSignup(method) {
  try {
    analytics.track('Web Signup Blocked', { method, path: window.location.pathname });
  } catch (e) {
    // Tracking never blocks the sheet.
  }
  openSellAppSheet({}, { variant: 'signup' });
}

function isInAppBrowser() {
  const browsers = {
    facebook: /\bFB[\w_]+\//,
    twitter: /\bTwitter/i,
    tiktok: /\bBytedance\//i,
    instagram: /\bInstagram/i,
  }
  for (let [browser, regex] of Object.entries(browsers)) {
    if (regex.test(navigator.userAgent)) {
      return browser;
    }
  }
  return false;
}

async function signInWithGoogle() {
  if (isInAppBrowser()) {
    const element = document.getElementById('inAppBrowserInfo');
    if (!element.classList.contains('tooltip-show')) {
      setTimeout(() => {
        element.classList.add('tooltip-show');
        analytics.track("Element Viewed", { elementID: "googleInAppBrowserPopup" });
      }, 0);
    }
    return;
  }
  googleButtonText.style.display = 'none';
  googleButtonLoadingIcon.style.display = 'block';
  // [START auth_google_provider_create]
  var provider = new firebase.auth.GoogleAuthProvider();
  // [END auth_google_provider_create]


  //NEW POPUP SIGNIN
  try {
    const credential = await firebase.auth().signInWithPopup(provider);
    if (credential?.additionalUserInfo?.isNewUser) {
      // The popup has already made the account: undo it before anything is written for it.
      // Deleting needs a recent sign-in, which this is; should it still fail, the visitor
      // is at least signed out again.
      try {
        await credential.user.delete();
      } catch (e) {
        errorHandler.report(e);
        await firebase.auth().signOut();
      }
      googleButtonText.style.display = 'block';
      googleButtonLoadingIcon.style.display = 'none';
      blockWebSignup('google.com');
      return;
    }
    await authUser.whenSet(signedInNextStep);
  } catch (error) {
    errorHandler.report(error);
    const errorText = `[webflow] Error signing in with Google: ${error.code}, ${error.message}, ${error.email}, ${error}`;
    console.log(errorText);
  }
}

document.addEventListener('click', event => {
  const tooltip = document.getElementById('inAppBrowserInfo')
  if (!tooltip.contains(event.target)) {
    tooltip.classList.remove('tooltip-show');
  }
});

function displayPreferredSignInMethod(signInMethod) {
  if (!signInMethod.length) {
    return;
  }
  const buttonId = signInMethod === 'google.com' ? 'googleSignInButton' : (signInMethod === 'phone' ? 'smsCodeButton' : 'emailAndPasswordButton');
  const innerDiv = document.getElementById(buttonId);
  const outerDiv = innerDiv.parentElement;
  preferredSignInMethodDiv.appendChild(outerDiv.removeChild(innerDiv));
  preferredSignInMethodDiv.style.display = 'block';
  showOtherSignInMethodsButton.style.display = 'flex';
  otherSignInMethodsDiv.style.display = 'none';
}
function escapeHtml(value) {
  return typeof value === 'string'
    ? value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    : '';
}

const params = new URL(window.location).searchParams;
//Get preferred sign in method
if (params.has('s') && params.get('s').length >= 3) {
  getSignInInfo(params.get('s')).then(res => {
    // The link's key is public (it is also the id of the seller's shop page), so the answer
    // carries the sign-in method and a masked hint, never the email address or phone number.
    if (!res?.method) {
      return;
    }
    // displayIntroDivText puts the address into innerHTML; the hint comes from a user's own doc.
    const emailHint = escapeHtml(res.emailHint);
    if (res.method === 'google.com') {
      displayIntroDivText('logInIntroText', emailHint);
      displayPreferredSignInMethod('google.com');
    } else if (res.method === 'password') {
      displayIntroDivText('logInIntroText', emailHint);
      displayPreferredSignInMethod('password');
    } else if (res.method === 'phone') {
      displayIntroDivText('logInIntroText');
      phoneLoginDiv.style.display = 'block';
      mobileNumberDiv.style.display = 'block';
      orLoginOtherWayDiv.style.display = 'block';
      loginAlternativesDiv.style.display = 'none';
    }
  });
} else {
  displayPreferredSignInMethod(getPreferredLogInMethodCookie());
}

if (userIsSellingNewItem()) {
  const storedItem = sessionStorage.getItem('itemToBeCreatedAfterSignIn');
  if (storedItem) {
    const item = JSON.parse(storedItem).item;
    itemImage.src = item?.images?.enhancedFrontImageSmall || item?.images?.enhancedFrontImage || '';
    notificationText.innerHTML = `För att fullfölja försäljningen av ditt ${item.brand}-plagg behöver du logga in`;
    itemToBeCreatedDiv.style.display = 'block';
  } else {
    const expertValuationDraftId = sessionStorage.getItem('expertValuationDraftAfterSignIn');
    if (expertValuationDraftId) {
      callBackendApi(`/api/items/${expertValuationDraftId}`, { requiresAuth: false })
        .then(response => {
          const item = response.data;
          itemImage.src = item?.images?.enhancedFrontImageSmall || item?.images?.enhancedFrontImage || '';
          notificationText.innerHTML = `För att fullfölja försäljningen av ditt ${item.brand}-plagg behöver du logga in`;
          itemToBeCreatedDiv.style.display = 'block';
        })
        .catch(e => {
          console.error('Failed to fetch expert valuation draft', e);
          itemToBeCreatedDiv.style.display = 'block';
        });
    }
  }
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
  const formPhoneNumber = signinPhoneNumber.value.startsWith('0') ? signinPhoneNumber.value.slice(1) : signinPhoneNumber.value;
  const phoneNumber = formPhoneNumber.startsWith('+46') ? formPhoneNumber : `+46${formPhoneNumber}`;
  console.log('signInWithPhoneNumber', phoneNumber);
  // A number without an account gets the app sheet before any SMS is sent. When the
  // check itself fails (no answer), the code is sent anyway: verifyCode asks again, and
  // the backend refuses a sign-up from the web regardless.
  callBackendApi('/api/users/phoneNumberExists', { data: { phoneNumber }, requiresAuth: false })
    .then((result) => {
      if (result?.data && result.data.exists === false) {
        submitLoadIcon.style.display = 'none';
        sendCodeButton.style.display = 'block';
        blockWebSignup('phone');
        return;
      }
      return callBackendApi('/api/users/authStart', { data: { phoneNumber }, requiresAuth: false })
        .then(() => {
          window.phoneNumber = phoneNumber;
          mobileNumberDiv.style.display = 'none';
          verifyDiv.style.display = 'block';
        });
    }).catch((error) => {
      submitLoadIcon.style.display = 'none';
      errorMessageDiv.innerText = error.message;
      console.log('Error message: ' + error.message);
      errorHandler.report(error);
    });
}

signinButton.addEventListener('click', verifyCode);
smsCodeButton.addEventListener('click', function () {
  phoneLoginDiv.style.display = 'block';
  mobileNumberDiv.style.display = 'block';
  orLoginOtherWayDiv.style.display = 'block';
  loginAlternativesDiv.style.display = 'none';
});

function verifyCode() {
  const code = verificationCode.value;
  console.log('Verify screen. My code: ', code);
  console.log('phone number to verify', phoneNumber);
  // Only an existing account is signed in: a number the backend says has none gets the
  // app sheet. When the check itself fails (no answer) the code is still verified as a
  // sign-in, which the backend answers 401 for a number without an account; it refuses
  // `type: 'signUp'` from the web should it ever be sent.
  callBackendApi('/api/users/phoneNumberExists', { data: { phoneNumber }, requiresAuth: false })
    .then((result) => {
      console.log('phoneNumberExists result', phoneNumber, JSON.stringify(result));
      if (result?.data && result.data.exists === false) {
        verifyDiv.style.display = 'none';
        phoneLoginDiv.style.display = 'none';
        loginAlternativesDiv.style.display = 'block';
        blockWebSignup('phone');
        return null;
      }
      return callBackendApi('/api/users/authVerify', { data: { phoneNumber, code, type: 'signIn' }, requiresAuth: false });
    })
    .then((result) => {
      if (!result) return null;
      const customToken = result.data?.customToken;
      if (!customToken) throw new Error('authVerify gave no token');
      return firebase.auth().signInWithCustomToken(customToken);
    })
    .then((user) => {
      if (!user) return;
      if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem("userId", user.uid);
        sessionStorage.setItem("phone", user.phoneNumber);
      } else {
        console.log("Sorry, your browser does not support Web Storage...");
      }
      authUser.whenSet(signedInNextStep);
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



// EMAIL AND PASSWORD SIGN UP

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
        const isSellingItem = sessionStorage.getItem('itemToBeCreatedAfterSignIn') || sessionStorage.getItem('expertValuationDraftAfterSignIn');
        if (!authUser.current.emailVerified && getCookie('viewedVerifyEmailDiv') !== 'true' && !isSellingItem) {
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

// The "Välj lösenord" step is no longer shown (checkEmail): should its button still be
// reached, it opens the app sheet instead of creating an account.
function signUpWithEmailPassword() {
  blockWebSignup('password');
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
  firebase.auth().fetchSignInMethodsForEmail(email)
    .then((signInMethods) => {
      if (signInMethods.indexOf(
        firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {
        // Account exists
        chooseEmailDiv.style.display = 'none';
        signinWithEmailDiv.style.display = 'block';
        document.getElementById('prefilledEmail').innerText = `Ange lösenord för ${email}`;
      } else if (signInMethods.indexOf(firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD) !== -1) {
        // The address belongs to a Google account: offer that sign-in, not a second account.
        chooseEmailDiv.style.display = 'none';
        choosePasswordDiv.style.display = 'none';
        document.getElementById('logInIntroText').innerText = 'Det här kontot loggar in med Google.';
        document.getElementById('notificationBanner').style.display = 'flex';
        displayPreferredSignInMethod('google.com');
      } else if (signInMethods.length) {
        // An account the web cannot sign in (Apple, from the app): say so instead of
        // offering a new one.
        keepChooseEmailStep();
        document.getElementById('logInIntroText').innerText = 'Det här kontot loggar in med Apple. Logga in i appen.';
        document.getElementById('notificationBanner').style.display = 'flex';
      } else {
        // No account for this address: new accounts are created in the app. Webflow's own
        // form handling puts the e-mail form in its "success" state a few hundred ms after
        // the click, before or after this answer; the e-mail step is put back under the
        // sheet now and again once that has run.
        keepChooseEmailStep();
        blockWebSignup('password');
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

signUpWithEmailButton.addEventListener('click', signUpWithEmailPassword);
signInWithEmailButton.addEventListener('click', signInWithEmailPassword);
showOtherSignInMethodsButton.addEventListener('click', function () {
  triggerOtherSignInMethodsView.click();
});

// Back to the e-mail field from the "Välj lösenord" step, which the Fortsätt button's
// Webflow interaction shows (it also puts the e-mail form in its "success" state).
function showChooseEmailStep() {
  chooseEmailDiv.style.display = 'block';
  choosePasswordDiv.style.display = 'none';
  document.getElementById('Choose-email-form').style.display = 'block';
  document.querySelector('.success-message').style.display = 'none';
}
document.getElementById('passwordGoBack').addEventListener('click', showChooseEmailStep);
// Webflow's form handling hides the e-mail form (its "success" state) about 300 ms after
// the Fortsätt click (measured 2026-10-23 on the staging site), usually after
// fetchSignInMethodsForEmail has answered. That timing is Webflow's, so the e-mail step
// is restored a few times over the next second rather than once.
function keepChooseEmailStep() {
  showChooseEmailStep();
  [250, 600, 1200].forEach((ms) => setTimeout(showChooseEmailStep, ms));
}
googleSignInButton.addEventListener('click', signInWithGoogle);
googleSignInButton2.addEventListener('click', signInWithGoogle);
document.getElementById('emailAndPasswordButton').addEventListener('click', function () {
  console.log('button clicked');
  chooseEmailDiv.style.display = 'block';
  loginAlternativesDiv.style.display = 'none';
});
