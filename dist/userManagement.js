!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,n,t,o,i){/* eslint-disable no-undef */var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof r[o]&&r[o],l=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(n,t){if(!l[n]){if(!e[n]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var i="function"==typeof r[o]&&r[o];if(!t&&i)return i(n,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(a)return a(n,!0);// Try the node require function if it exists.
if(s&&"string"==typeof n)return s(n);var c=Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}f.resolve=function(t){var o=e[n][1][t];return null!=o?o:t},f.cache={};var u=l[n]=new d.Module(n);e[n][0].call(u.exports,f,u,u.exports,this)}return l[n].exports;function f(e){var n=f.resolve(e);return!1===n?{}:d(n)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=a,d.register=function(n,t){e[n]=[function(e,n){n.exports=t},{}]},Object.defineProperty(d,"root",{get:function(){return r[o]}}),r[o]=d;for(var c=0;c<n.length;c++)d(n[c]);if(t){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(t);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):i&&(this[i]=u)}}({"6Z4Mv":[function(e,n,t){var o,i;function r(e){let n=getParamsObject();return n[e]}// Get the action to complete
let a=r("mode"),l=r("oobCode");// Handle the user management action.
switch(r("continueUrl"),r("lang"),a){case"resetPassword":// Display reset password handler and UI.
!// [START auth_handle_reset_password]
function(e,n,t,i){// Localize the UI to the selected language as determined by the lang
// parameter.
// Verify the password reset code is valid.
e.verifyPasswordResetCode(n).then(e=>{o=e,// TODO: Show the reset screen with the user's email and ask the user for
// the new password.
accountEmailText.innerHTML=`Email: ${o}`,resetPasswordDiv.style.display="block",loadingDiv.style.display="none"}).catch(e=>{errorHandler.report(e),console.log(e.code,e.message)})}(auth,l,0,0);break;case"recoverEmail":// Display email recovery handler and UI.
!// [END auth_handle_reset_password]
// [START auth_handle_recover_email]
function(e,n,t){// Localize the UI to the selected language as determined by the lang
// parameter.
var o=null;// Confirm the action code is valid.
e.checkActionCode(n).then(t=>(// Get the restored email address.
    o=t.data.email,e.applyActionCode(n))).then(()=>{// Account email reverted to restoredEmail
// TODO: Display a confirmation message to the user.
// You might also want to give the user the option to reset their password
// in case the account was compromised:
e.sendPasswordResetEmail(o).then(()=>{// Password reset confirmation sent. Ask user to check their email.
}).catch(e=>{errorHandler.report(e);// Error encountered while sending password reset code.
})}).catch(e=>{errorHandler.report(e);// Invalid code.
})}(auth,l,0);break;case"verifyEmail":// Display email verification handler and UI.
!// [END auth_handle_recover_email]
// [START auth_handle_verify_email]
function(e,n,t,o){// Localize the UI to the selected language as determined by the lang
// parameter.
// Try to apply the email verification code.
e.applyActionCode(n).then(e=>{// Email address has been verified.
// Show confirmation.
emailVerifiedDiv.style.display="block",loadingDiv.style.display="none",toMaiButton.style.display="block"}).catch(e=>{errorHandler.report(e),emailVerificationFailedDiv.style.display="block",loadingDiv.style.display="none";// Code is invalid or expired. Ask the user to verify their email address
// again.
})}(auth,l,0,0);break;case"sendEmailVerification":// Display email verification handler and UI.
auth,authUser.whenSet(e=>{e&&(emailVerificationText.innerHTML=`Klicka p\xe5 l\xe4nken i mailet vi skickat till ${e.email} f\xf6r att verifiera din email.`),verifyEmailDiv.style.display="block",loadingDiv.style.display="none",setCookie("viewedVerifyEmailDiv","true",2)})}sendEmailVerificationButton.addEventListener("click",function(){firebase.auth().currentUser.sendEmailVerification().then(()=>{// Email verification sent!
emailSentDiv.style.display="block",sendEmailVerificationButton.style.display="none",setTimeout(function(){toMaiButton.style.display="block",closeVerifyEmailButton.style.display="none"},1e4)})}),savePasswordAndLoginButton.addEventListener("click",function(){// Save the new password.
passwordLoadIcon.style.display="block",savePasswordAndLoginButton.style.display="none";var e=newPassword.value;auth.confirmPasswordReset(l,e).then(n=>{console.log("Password reset has been confirmed and new password updated"),// Sign in
firebase.auth().signInWithEmailAndPassword(o,e).then(e=>{location.href="./private"}).catch(e=>{errorHandler.report(e),console.log("Error message:",e.code,e.message)})}).catch(e=>{errorHandler.report(e),console.log("Error message:",e.code,e.message)})})},{}]},["6Z4Mv"],"6Z4Mv","parcelRequire81ca")//# sourceMappingURL=userManagement.js.map
;
//# sourceMappingURL=userManagement.js.map
