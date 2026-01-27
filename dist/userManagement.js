!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,o,n,t,i){/* eslint-disable no-undef */var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof r[t]&&r[t],l=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(o,n){if(!l[o]){if(!e[o]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var i="function"==typeof r[t]&&r[t];if(!n&&i)return i(o,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(a)return a(o,!0);// Try the node require function if it exists.
if(s&&"string"==typeof o)return s(o);var c=Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}u.resolve=function(n){var t=e[o][1][n];return null!=t?t:n},u.cache={};var f=l[o]=new d.Module(o);e[o][0].call(f.exports,u,f,f.exports,this)}return l[o].exports;function u(e){var o=u.resolve(e);return!1===o?{}:d(o)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=a,d.register=function(o,n){e[o]=[function(e,o){o.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return r[t]}}),r[t]=d;for(var c=0;c<o.length;c++)d(o[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var f=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=f:"function"==typeof define&&define.amd?define(function(){return f}):i&&(this[i]=f)}}({"6Z4Mv":[function(e,o,n){var t,i;function r(e){let o=getParamsObject();return o[e]}// Get the action to complete
let a=r("mode"),l=r("oobCode"),s=r("continueUrl"),d=r("lang");// Handle the user management action.
switch(console.log("mode",a),a){case"resetPassword":// Display reset password handler and UI.
console.log("case resetPassword calling handleResetPassword",auth,l,s,d),// [START auth_handle_reset_password]
function(e,o,n,i){// Localize the UI to the selected language as determined by the lang
// parameter.
// Verify the password reset code is valid.
e.verifyPasswordResetCode(o).then(e=>{console.log("verifyPasswordResetCode callback invoked",e),t=e,accountEmailText.innerHTML=`Email: ${t}`,resetPasswordDiv.style.display="block",loadingDiv.style.display="none"}).catch(e=>{console.log(e.code,e.message),errorHandler.report(e)})}(auth,l,0,0);break;case"recoverEmail":// Display email recovery handler and UI.
!// [END auth_handle_reset_password]
// [START auth_handle_recover_email]
function(e,o,n){// Localize the UI to the selected language as determined by the lang
// parameter.
var t=null;// Confirm the action code is valid.
e.checkActionCode(o).then(n=>(// Get the restored email address.
    t=n.data.email,e.applyActionCode(o))).then(()=>{// Account email reverted to restoredEmail
// TODO: Display a confirmation message to the user.
// You might also want to give the user the option to reset their password
// in case the account was compromised:
e.sendPasswordResetEmail(t).then(()=>{// Password reset confirmation sent. Ask user to check their email.
}).catch(e=>{errorHandler.report(e);// Error encountered while sending password reset code.
})}).catch(e=>{errorHandler.report(e);// Invalid code.
})}(auth,l,0);break;case"verifyEmail":// Display email verification handler and UI.
!// [END auth_handle_recover_email]
// [START auth_handle_verify_email]
function(e,o,n,t){// Localize the UI to the selected language as determined by the lang
// parameter.
// Try to apply the email verification code.
e.applyActionCode(o).then(e=>{// Email address has been verified.
// Show confirmation.
emailVerifiedDiv.style.display="block",loadingDiv.style.display="none",toMaiButton.style.display="block"}).catch(e=>{errorHandler.report(e),emailVerificationFailedDiv.style.display="block",loadingDiv.style.display="none";// Code is invalid or expired. Ask the user to verify their email address
// again.
})}(auth,l,0,0);break;case"sendEmailVerification":// Display email verification handler and UI.
auth,authUser.whenSet(e=>{e&&(emailVerificationText.innerHTML=`Klicka p\xe5 l\xe4nken i mailet vi skickat till ${e.email} f\xf6r att verifiera din email.`),verifyEmailDiv.style.display="block",loadingDiv.style.display="none",setCookie("viewedVerifyEmailDiv","true",2)})}sendEmailVerificationButton.addEventListener("click",function(){firebase.auth().currentUser.sendEmailVerification().then(()=>{// Email verification sent!
emailSentDiv.style.display="block",sendEmailVerificationButton.style.display="none",setTimeout(function(){toMaiButton.style.display="block",closeVerifyEmailButton.style.display="none"},1e4)})}),savePasswordAndLoginButton.addEventListener("click",function(){// Save the new password.
passwordLoadIcon.style.display="block",savePasswordAndLoginButton.style.display="none";var e=newPassword.value;auth.confirmPasswordReset(l,e).then(o=>{console.log("Password reset has been confirmed and new password updated"),// Sign in
firebase.auth().signInWithEmailAndPassword(t,e).then(e=>{if(s){let e=s;try{e=decodeURIComponent(s)}catch(o){// decodeURIComponent may throw, so we catch and fall back to original string.
e=s}location.href=e}else location.href="./private"}).catch(e=>{errorHandler.report(e),console.log("Error message:",e.code,e.message)})}).catch(e=>{errorHandler.report(e),console.log("Error message:",e.code,e.message)})})},{}]},["6Z4Mv"],"6Z4Mv","parcelRequire81ca")//# sourceMappingURL=userManagement.js.map
;
//# sourceMappingURL=userManagement.js.map
