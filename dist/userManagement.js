!function(){var e;function a(e){let a=getParamsObject();return a[e]}// Get the action to complete
let i=a("mode"),t=a("oobCode");// Handle the user management action.
switch(a("continueUrl"),a("lang"),i){case"resetPassword":// Display reset password handler and UI.
!// [START auth_handle_reset_password]
function(a,i,t,n){// Localize the UI to the selected language as determined by the lang
// parameter.
// Verify the password reset code is valid.
a.verifyPasswordResetCode(i).then(a=>{e=a,// TODO: Show the reset screen with the user's email and ask the user for
// the new password.
accountEmailText.innerHTML=`Email: ${e}`,resetPasswordDiv.style.display="block",loadingDiv.style.display="none"}).catch(e=>{errorHandler.report(e),console.log(e.code,e.message)})}(auth,t,0,0);break;case"recoverEmail":// Display email recovery handler and UI.
!// [END auth_handle_reset_password]
// [START auth_handle_recover_email]
function(e,a,i){// Localize the UI to the selected language as determined by the lang
// parameter.
var t=null;// Confirm the action code is valid.
e.checkActionCode(a).then(i=>(// Get the restored email address.
    t=i.data.email,e.applyActionCode(a))).then(()=>{// Account email reverted to restoredEmail
// TODO: Display a confirmation message to the user.
// You might also want to give the user the option to reset their password
// in case the account was compromised:
e.sendPasswordResetEmail(t).then(()=>{// Password reset confirmation sent. Ask user to check their email.
}).catch(e=>{errorHandler.report(e);// Error encountered while sending password reset code.
})}).catch(e=>{errorHandler.report(e);// Invalid code.
})}(auth,t,0);break;case"verifyEmail":// Display email verification handler and UI.
!// [END auth_handle_recover_email]
// [START auth_handle_verify_email]
function(e,a,i,t){// Localize the UI to the selected language as determined by the lang
// parameter.
// Try to apply the email verification code.
e.applyActionCode(a).then(e=>{// Email address has been verified.
// Show confirmation.
emailVerifiedDiv.style.display="block",loadingDiv.style.display="none",toMaiButton.style.display="block"}).catch(e=>{errorHandler.report(e),emailVerificationFailedDiv.style.display="block",loadingDiv.style.display="none";// Code is invalid or expired. Ask the user to verify their email address
// again.
})}(auth,t,0,0);break;case"sendEmailVerification":// Display email verification handler and UI.
!// [END auth_handle_verify_email]
function(e){e.onAuthStateChanged(e=>{e&&(emailVerificationText.innerHTML=`Klicka p\xe5 l\xe4nken i mailet vi skickat till ${e.email} f\xf6r att verifiera din email.`),verifyEmailDiv.style.display="block",loadingDiv.style.display="none",setCookie("viewedVerifyEmailDiv","true",2)})}(auth)}sendEmailVerificationButton.addEventListener("click",function(){firebase.auth().currentUser.sendEmailVerification().then(()=>{// Email verification sent!
emailSentDiv.style.display="block",sendEmailVerificationButton.style.display="none",setTimeout(function(){toMaiButton.style.display="block",closeVerifyEmailButton.style.display="none"},1e4)})}),savePasswordAndLoginButton.addEventListener("click",function(){// Save the new password.
passwordLoadIcon.style.display="block",savePasswordAndLoginButton.style.display="none";var a=newPassword.value;auth.confirmPasswordReset(t,a).then(i=>{console.log("Password reset has been confirmed and new password updated"),// Sign in
firebase.auth().signInWithEmailAndPassword(e,a).then(e=>{location.href="./private"}).catch(e=>{errorHandler.report(e),console.log("Error message:",e.code,e.message)})}).catch(e=>{errorHandler.report(e),console.log("Error message:",e.code,e.message)})})}();//# sourceMappingURL=userManagement.js.map

//# sourceMappingURL=userManagement.js.map
