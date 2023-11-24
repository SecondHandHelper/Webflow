!function(){var e;function t(e){let t=function(){for(var e=window.location.search.substring(1).split("&"),t={},i=0;i<e.length;i++){var n=e[i].split("=");t[n[0]]=decodeURIComponent(n[1])}return t}();return t[e]}// Get the action to complete
let i=t("mode"),n=t("oobCode");// Handle the user management action.
switch(t("continueUrl"),t("lang"),i){case"resetPassword":// Display reset password handler and UI.
!// [START auth_handle_reset_password]
function(t,i,n,a){// Localize the UI to the selected language as determined by the lang
// parameter.
// Verify the password reset code is valid.
t.verifyPasswordResetCode(i).then(t=>{e=t,// TODO: Show the reset screen with the user's email and ask the user for
// the new password.
accountEmailText.innerHTML=`Email: ${e}`,resetPasswordDiv.style.display="block",loadingDiv.style.display="none"}).catch(e=>{errorHandler.report(e),console.log(e.code,e.message)})}(auth,n,0,0);break;case"recoverEmail":// Display email recovery handler and UI.
!// [END auth_handle_reset_password]
// [START auth_handle_recover_email]
function(e,t,i){// Localize the UI to the selected language as determined by the lang
// parameter.
var n=null;// Confirm the action code is valid.
e.checkActionCode(t).then(i=>(// Get the restored email address.
    n=i.data.email,e.applyActionCode(t))).then(()=>{// Account email reverted to restoredEmail
// TODO: Display a confirmation message to the user.
// You might also want to give the user the option to reset their password
// in case the account was compromised:
e.sendPasswordResetEmail(n).then(()=>{// Password reset confirmation sent. Ask user to check their email.
}).catch(e=>{errorHandler.report(e);// Error encountered while sending password reset code.
})}).catch(e=>{errorHandler.report(e);// Invalid code.
})}(auth,n,0);break;case"verifyEmail":// Display email verification handler and UI.
!// [END auth_handle_recover_email]
// [START auth_handle_verify_email]
function(e,t,i,n){// Localize the UI to the selected language as determined by the lang
// parameter.
// Try to apply the email verification code.
e.applyActionCode(t).then(e=>{// Email address has been verified.
// Show confirmation.
emailVerifiedDiv.style.display="block",loadingDiv.style.display="none",toMaiButton.style.display="block"}).catch(e=>{errorHandler.report(e),emailVerificationFailedDiv.style.display="block",loadingDiv.style.display="none";// Code is invalid or expired. Ask the user to verify their email address
// again.
})}(auth,n,0,0);break;case"sendEmailVerification":// Display email verification handler and UI.
!// [END auth_handle_verify_email]
function(e){e.onAuthStateChanged(e=>{e&&(emailVerificationText.innerHTML=`Klicka p\xe5 l\xe4nken i mailet vi skickat till ${e.email} f\xf6r att verifiera din email.`),verifyEmailDiv.style.display="block",loadingDiv.style.display="none",function(e,t,i){let n=new Date;n.setTime(n.getTime()+1728e5);let a="expires="+n.toUTCString();t=encodeURIComponent(t=t.replaceAll("+"," ")),document.cookie=e+"="+t+";"+a+";path=/";//console.log("Cookie set: ", cname + "=" + cvalue);
}("viewedVerifyEmailDiv","true",0)})}(auth)}sendEmailVerificationButton.addEventListener("click",function(){firebase.auth().currentUser.sendEmailVerification().then(()=>{// Email verification sent!
emailSentDiv.style.display="block",sendEmailVerificationButton.style.display="none",setTimeout(function(){toMaiButton.style.display="block",closeVerifyEmailButton.style.display="none"},1e4)})}),savePasswordAndLoginButton.addEventListener("click",function(){// Save the new password.
passwordLoadIcon.style.display="block",savePasswordAndLoginButton.style.display="none";var t=newPassword.value;auth.confirmPasswordReset(n,t).then(i=>{console.log("Password reset has been confirmed and new password updated"),// Sign in
firebase.auth().signInWithEmailAndPassword(e,t).then(e=>{location.href="./private"}).catch(e=>{errorHandler.report(e),console.log("Error message:",e.code,e.message)})}).catch(e=>{errorHandler.report(e),console.log("Error message:",e.code,e.message)})})}();//# sourceMappingURL=userManagement.js.map

//# sourceMappingURL=userManagement.js.map
