
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
    await firebase.auth().signInWithPopup(provider)
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
const params = new URL(window.location).searchParams;
//Get preferred sign in method
if (params.has('s') && params.get('s').length >= 3) {
  getSignInInfo(params.get('s')).then(res => {
    if (!(res.email || res.phone || res.method)) {
      return;
    }
    emailAddress.value = res.email;
    document.getElementById('signinPhoneNumber').value = res.phone?.replace('+46', '');
    if (res.method === 'google.com') {
      displayIntroDivText('logInIntroText', res.email);
      displayPreferredSignInMethod('google.com');
    } else if (res.method === 'password') {
      loginAlternativesDiv.style.display = 'none';
      displayIntroDivText('logInIntroText');
      checkEmail();
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
  const formPhoneNumber = signinPhoneNumber.value.startsWith('0') ? signinPhoneNumber.value.slice(1) : signinPhoneNumber.value;
  const phoneNumber = formPhoneNumber.startsWith('+46') ? formPhoneNumber : `+46${formPhoneNumber}`;
  console.log('signInWithPhoneNumber', phoneNumber);
  callBackendApi('/api/users/authStart', { data: { phoneNumber }, requiresAuth: false })
    .then(() => {
      window.phoneNumber = phoneNumber;
      mobileNumberDiv.style.display = 'none';
      verifyDiv.style.display = 'block';
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
  let isNewUser = false;
  callBackendApi('/api/users/phoneNumberExists', { data: { phoneNumber }, requiresAuth: false })
    .then((result) => {
      console.log('phoneNumberExists result', phoneNumber, JSON.stringify(result));
      const type = result.data.exists ? 'signIn' : 'signUp';
      isNewUser = type === 'signUp';
      return callBackendApi('/api/users/authVerify', { data: { phoneNumber, code, type }, requiresAuth: false });
    })
    .then((result) => {
      const customToken = result.data.customToken;
      return firebase.auth().signInWithCustomToken(customToken);
    })
    .then((user) => {
      if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem("userId", user.uid);
        sessionStorage.setItem("phone", user.phoneNumber);
      } else {
        console.log("Sorry, your browser does not support Web Storage...");
      }

      console.log("isNewUser", isNewUser);
      if (isNewUser) {
        emailForTipsDiv.style.display = 'block';
        verifyDiv.style.display = 'none';
        phoneLoginDiv.style.display = 'none';
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
  passwordGoBack.style.display = 'none';
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
      passwordGoBack.style.display = 'block';
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
  firebase.auth().fetchSignInMethodsForEmail(email)
    .then((signInMethods) => {
      chooseEmailDiv.style.display = 'none';
      if (signInMethods.indexOf(
        firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {
        // Account exists
        signinWithEmailDiv.style.display = 'block';
        document.getElementById('prefilledEmail').innerText = `Ange lösenord för ${email}`;
      } else {
        // New account
        choosePasswordDiv.style.display = 'block';
        document.getElementById('createAccountEmail').innerText = `Välj lösenord för ${email}`;
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

document.getElementById('passwordGoBack').addEventListener('click', () => {
  chooseEmailDiv.style.display = 'block';
  choosePasswordDiv.style.display = 'none';
  document.getElementById('Choose-email-form').style.display = 'block';
  document.querySelector('.success-message').style.display = 'none';
})
googleSignInButton.addEventListener('click', signInWithGoogle);
googleSignInButton2.addEventListener('click', signInWithGoogle);
document.getElementById('emailAndPasswordButton').addEventListener('click', function () {
  console.log('button clicked');
  chooseEmailDiv.style.display = 'block';
  loginAlternativesDiv.style.display = 'none';
});
