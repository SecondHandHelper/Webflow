!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,o,i){/* eslint-disable no-undef */var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r="function"==typeof s[o]&&s[o],l=r.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!l[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var i="function"==typeof s[o]&&s[o];if(!n&&i)return i(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(r)return r(t,!0);// Try the node require function if it exists.
if(a&&"string"==typeof t)return a(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}g.resolve=function(n){var o=e[t][1][n];return null!=o?o:n},g.cache={};var u=l[t]=new d.Module(t);e[t][0].call(u.exports,g,u,u.exports,this)}return l[t].exports;function g(e){var t=g.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=r,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return s[o]}}),s[o]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):i&&(this[i]=u)}}({ioxVe:[function(e,t,n){async function o(){if(function(){for(let[e,t]of Object.entries({facebook:/\bFB[\w_]+\//,twitter:/\bTwitter/i,tiktok:/\bBytedance\//i,instagram:/\bInstagram/i}))if(t.test(navigator.userAgent))return e;return!1}()){let e=document.getElementById("inAppBrowserInfo");e.classList.contains("tooltip-show")||setTimeout(()=>{e.classList.add("tooltip-show"),analytics.track("Element Viewed",{elementID:"googleInAppBrowserPopup"})},0);return}googleButtonText.style.display="none",googleButtonLoadingIcon.style.display="block";// [START auth_google_provider_create]
var e=new firebase.auth.GoogleAuthProvider;// [END auth_google_provider_create]
//NEW POPUP SIGNIN
try{await firebase.auth().signInWithPopup(e),await authUser.whenSet(signedInNextStep)}catch(t){errorHandler.report(t);let e=`[webflow] Error signing in with Google: ${t.code}, ${t.message}, ${t.email}, ${t}`;console.log(e)}}function i(e){if(!e.length)return;let t=document.getElementById("google.com"===e?"googleSignInButton":"phone"===e?"smsCodeButton":"emailAndPasswordButton"),n=t.parentElement;preferredSignInMethodDiv.appendChild(n.removeChild(t)),preferredSignInMethodDiv.style.display="block",showOtherSignInMethodsButton.style.display="flex",otherSignInMethodsDiv.style.display="none"}document.addEventListener("click",e=>{let t=document.getElementById("inAppBrowserInfo");t.contains(e.target)||t.classList.remove("tooltip-show")});let s=new URL(window.location).searchParams;if(s.has("s")&&s.get("s").length>=3?getSignInInfo(s.get("s")).then(e=>{(e.email||e.phone||e.method)&&(emailAddress.value=e.email,document.getElementById("signinPhoneNumber").value=e.phone?.replace("+46",""),"google.com"===e.method?(displayIntroDivText("logInIntroText",e.email),i("google.com")):"password"===e.method?(loginAlternativesDiv.style.display="none",displayIntroDivText("logInIntroText"),r()):"phone"===e.method&&(displayIntroDivText("logInIntroText"),phoneLoginDiv.style.display="block",mobileNumberDiv.style.display="block",orLoginOtherWayDiv.style.display="block",loginAlternativesDiv.style.display="none"))}):i(getPreferredLogInMethodCookie()),userIsSellingNewItem()){let e=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn")).item;itemImage.src=e?.images?.enhancedFrontImageSmall||e?.images?.enhancedFrontImage||"",notificationText.innerHTML=`F\xf6r att fullf\xf6lja f\xf6rs\xe4ljningen av ditt ${e.brand}-plagg beh\xf6ver du logga in eller skapa konto`,itemToBeCreatedDiv.style.display="block"}function r(){let e=emailAddress.value;firebase.auth().fetchSignInMethodsForEmail(e).then(t=>{chooseEmailDiv.style.display="none",-1!==t.indexOf(firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)?(// Account exists
signinWithEmailDiv.style.display="block",document.getElementById("prefilledEmail").innerText=`Ange l\xf6senord f\xf6r ${e}`):(// New account
choosePasswordDiv.style.display="block",document.getElementById("createAccountEmail").innerText=`V\xe4lj l\xf6senord f\xf6r ${e}`)}).catch(e=>{errorHandler.report(e),console.log("Error message:",e.code,e.message)})}// Disable Webflow form submit
$("#Password-form").submit(function(){return!1}),$("#Choose-password-form").submit(function(){return!1}),document.getElementById("Phone-number-form").addEventListener("submit",function(e){e.preventDefault(),submitLoadIcon.style.display="block",sendCodeButton.style.display="none";let t=signinPhoneNumber.value.startsWith("0")?signinPhoneNumber.value.slice(1):signinPhoneNumber.value,n=t.startsWith("+46")?t:`+46${t}`;console.log("signInWithPhoneNumber",n),callBackendApi("/api/users/authStart",{data:{phoneNumber:n},requiresAuth:!1}).then(()=>{window.phoneNumber=n,mobileNumberDiv.style.display="none",verifyDiv.style.display="block"}).catch(e=>{submitLoadIcon.style.display="none",errorMessageDiv.innerText=e.message,console.log("Error message: "+e.message),errorHandler.report(e)})}),signinButton.addEventListener("click",function(){let e=verificationCode.value;console.log("Verify screen. My code: ",e),console.log("phone number to verify",phoneNumber);let t=!1;callBackendApi("/api/users/phoneNumberExists",{data:{phoneNumber},requiresAuth:!1}).then(n=>{console.log("phoneNumberExists result",phoneNumber,JSON.stringify(n));let o=n.data.exists?"signIn":"signUp";return t="signUp"===o,callBackendApi("/api/users/authVerify",{data:{phoneNumber,code:e,type:o},requiresAuth:!1})}).then(e=>{let t=e.data.customToken;return firebase.auth().signInWithCustomToken(t)}).then(e=>{"undefined"!=typeof Storage?(sessionStorage.setItem("userId",e.uid),sessionStorage.setItem("phone",e.phoneNumber)):console.log("Sorry, your browser does not support Web Storage..."),console.log("isNewUser",t),t?(emailForTipsDiv.style.display="block",verifyDiv.style.display="none",phoneLoginDiv.style.display="none"):authUser.whenSet(signedInNextStep)}).catch(e=>{console.log("My error: "+e.message),errorHandler.report(e)})}),smsCodeButton.addEventListener("click",function(){phoneLoginDiv.style.display="block",mobileNumberDiv.style.display="block",orLoginOtherWayDiv.style.display="block",loginAlternativesDiv.style.display="none"}),emailNextStepButton.addEventListener("click",r),tipsEmailButton.addEventListener("click",function(){try{tipsEmailButton.style.display="none",loadingSpinnerDiv.style.display="flex","undefined"!=typeof Storage?sessionStorage.setItem("email",emailTipsInput.value):console.log("Sorry, your browser does not support Web Storage..."),authUser.whenSet(signedInNextStep)}catch(e){console.log("failed to add email",e),loadingSpinnerDiv.style.display="none",tipsEmailButton.style.display="block",errorHandler.report(e)}}),resetPasswordLink.addEventListener("click",function(){let e=emailAddress.value;// [START auth_send_password_reset]
firebase.auth().sendPasswordResetEmail(e).then(()=>{// Password reset email sent!
console.log("Reset password email sent"),forgotPasswordText.innerHTML=`Email skickat till ${e}`}).catch(e=>{errorHandler.report(e),console.log(e.code,e.message)});// [END auth_send_password_reset]
}),signUpWithEmailButton.addEventListener("click",function(){let e=emailAddress.value,t=newPassword.value;signUpWithEmailButton.style.display="none",passwordGoBack.style.display="none",newPasswordLoadIcon.style.display="block",// [START auth_signup_password]
firebase.auth().createUserWithEmailAndPassword(e,t).then(e=>{// Signed in
let t=e.user;window.userId=t.uid,console.log("Logged in user: ",t),firebase.auth().currentUser.sendEmailVerification().then(()=>{authUser.whenSet(()=>signedInNextStep("./user-management?mode=sendEmailVerification"))})}).catch(e=>{errorHandler.report(e);var t=e.code,n=e.message;console.log("Error message:",t,n),newPasswordFeedback.innerText=n,signUpWithEmailButton.style.display="block",passwordGoBack.style.display="block",newPasswordLoadIcon.style.display="none"});// [END auth_signup_password]
}),signInWithEmailButton.addEventListener("click",// EMAIL AND PASSWORD SIGN UP
function(){let e=emailAddress.value,t=emailPassword.value;signInWithEmailButton.style.display="none",passwordLoadIcon.style.display="block",// [START auth_signin_password]
firebase.auth().signInWithEmailAndPassword(e,t).then(e=>{// Signed in
let t=e.user;window.userId=t.uid,console.log("Logged in user: ",t.uid),authUser.whenSet(()=>{authUser.current.emailVerified||"true"===getCookie("viewedVerifyEmailDiv")?signedInNextStep():signedInNextStep("./user-management?mode=sendEmailVerification")})}).catch(e=>{errorHandler.report(e),console.log("Error message:",e.code,e.message),"auth/wrong-password"===e.code&&(passwordFeedback.innerText="Fel l\xf6senord",passwordFeedback.style.display="block",signInWithEmailButton.style.display="block",passwordLoadIcon.style.display="none")});// [END auth_signin_password]
}),showOtherSignInMethodsButton.addEventListener("click",function(){triggerOtherSignInMethodsView.click()}),document.getElementById("passwordGoBack").addEventListener("click",()=>{chooseEmailDiv.style.display="block",choosePasswordDiv.style.display="none",document.getElementById("Choose-email-form").style.display="block",document.querySelector(".success-message").style.display="none"}),googleSignInButton.addEventListener("click",o),googleSignInButton2.addEventListener("click",o),document.getElementById("emailAndPasswordButton").addEventListener("click",function(){console.log("button clicked"),chooseEmailDiv.style.display="block",loginAlternativesDiv.style.display="none"})},{}]},["ioxVe"],"ioxVe","parcelRequire81ca")//# sourceMappingURL=signInHelpers.js.map
;
//# sourceMappingURL=signInHelpers.js.map
