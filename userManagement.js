function getParameterByName(name) {
  const paramsObj = getParamsObject();
  return paramsObj[name];
}

// Get the action to complete
const mode = getParameterByName('mode');
const actionCode = getParameterByName('oobCode');
const continueUrl = getParameterByName('continueUrl');
const lang = getParameterByName('lang');
var accountEmail;

// Handle the user management action.
switch (mode) {
  case 'resetPassword':
    // Display reset password handler and UI.
    handleResetPassword(auth, actionCode, continueUrl, lang);
    break;
  case 'recoverEmail':
    // Display email recovery handler and UI.
    handleRecoverEmail(auth, actionCode, lang);
    break;
  case 'verifyEmail':
    // Display email verification handler and UI.
    handleVerifyEmail(auth, actionCode, continueUrl, lang);
    break;
  case 'sendEmailVerification':
    // Display email verification handler and UI.
    sendEmailVerification(auth);
    break;
  default:
  // Error: invalid mode.
}

// [START auth_handle_reset_password]
function handleResetPassword(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.

  // Verify the password reset code is valid.
  auth.verifyPasswordResetCode(actionCode).then((email) => {
    accountEmail = email;
    // TODO: Show the reset screen with the user's email and ask the user for
    // the new password.
    accountEmailText.innerHTML = `Email: ${accountEmail}`;
    resetPasswordDiv.style.display = 'block';
    loadingDiv.style.display = 'none';
  }).catch((error) => {
    errorHandler.report(error);
    console.log(error.code, error.message);
  });
}
// [END auth_handle_reset_password]

// [START auth_handle_recover_email]
function handleRecoverEmail(auth, actionCode, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  var restoredEmail = null;
  // Confirm the action code is valid.
  auth.checkActionCode(actionCode).then((info) => {
    // Get the restored email address.
    restoredEmail = info['data']['email'];

    // Revert to the old email.
    return auth.applyActionCode(actionCode);
  }).then(() => {
    // Account email reverted to restoredEmail

    // TODO: Display a confirmation message to the user.

    // You might also want to give the user the option to reset their password
    // in case the account was compromised:
    auth.sendPasswordResetEmail(restoredEmail).then(() => {
      // Password reset confirmation sent. Ask user to check their email.
    }).catch((error) => {
      errorHandler.report(error);
      // Error encountered while sending password reset code.
    });
  }).catch((error) => {
    errorHandler.report(error);
    // Invalid code.
  });
}
// [END auth_handle_recover_email]

// [START auth_handle_verify_email]
function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  // Try to apply the email verification code.
  auth.applyActionCode(actionCode).then((resp) => {
    // Email address has been verified.
    // Show confirmation.
    emailVerifiedDiv.style.display = 'block';
    loadingDiv.style.display = 'none';
    toMaiButton.style.display = 'block';
  }).catch((error) => {
    errorHandler.report(error);
    emailVerificationFailedDiv.style.display = 'block';
    loadingDiv.style.display = 'none';
    // Code is invalid or expired. Ask the user to verify their email address
    // again.
  });
}
// [END auth_handle_verify_email]

function sendEmailVerification(auth) {
  authUser.whenSet((user) => {
    if (user) {
      emailVerificationText.innerHTML = `Klicka på länken i mailet vi skickat till ${user.email} för att verifiera din email.`;
    }
    verifyEmailDiv.style.display = 'block';
    loadingDiv.style.display = 'none';
    setCookie('viewedVerifyEmailDiv', 'true', 2);
  });
}

sendEmailVerificationButton.addEventListener('click', function sendEmail() {
  firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      // Email verification sent!
      emailSentDiv.style.display = 'block';
      sendEmailVerificationButton.style.display = 'none';
      setTimeout(function showButton() {
        toMaiButton.style.display = 'block';
        closeVerifyEmailButton.style.display = 'none';
      }, 10000);
    });
});

savePasswordAndLoginButton.addEventListener('click', function () {
  // Save the new password.
  passwordLoadIcon.style.display = 'block';
  savePasswordAndLoginButton.style.display = 'none';
  var password = newPassword.value;
  auth.confirmPasswordReset(actionCode, password).then((resp) => {
    console.log("Password reset has been confirmed and new password updated");
    // Sign in
    firebase.auth().signInWithEmailAndPassword(accountEmail, password)
      .then((userCredential) => {
        location.href = './private';
      })
      .catch((error) => {
        errorHandler.report(error);
        console.log("Error message:", error.code, error.message);
      });
  }).catch((error) => {
    errorHandler.report(error);
    console.log("Error message:", error.code, error.message);
  });
});
