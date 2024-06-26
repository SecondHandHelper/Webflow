!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,o,n,i){/* eslint-disable no-undef */var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof r[n]&&r[n],l=s.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,o){if(!l[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var i="function"==typeof r[n]&&r[n];if(!o&&i)return i(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(s)return s(t,!0);// Try the node require function if it exists.
if(a&&"string"==typeof t)return a(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}f.resolve=function(o){var n=e[t][1][o];return null!=n?n:o},f.cache={};var c=l[t]=new d.Module(t);e[t][0].call(c.exports,f,c,c.exports,this)}return l[t].exports;function f(e){var t=f.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=s,d.register=function(t,o){e[t]=[function(e,t){t.exports=o},{}]},Object.defineProperty(d,"root",{get:function(){return r[n]}}),r[n]=d;for(var u=0;u<t.length;u++)d(t[u]);if(o){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var c=d(o);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):i&&(this[i]=c)}}({ioxVe:[function(e,t,o){async function n(){if(function(){for(let[e,t]of Object.entries({facebook:/\bFB[\w_]+\//,twitter:/\bTwitter/i,tiktok:/\bBytedance\//i,instagram:/\bInstagram/i}))if(t.test(navigator.userAgent))return e;return!1}()){let e=document.getElementById("inAppBrowserInfo");e.classList.contains("tooltip-show")||setTimeout(()=>{e.classList.add("tooltip-show"),analytics.track("Element Viewed",{elementID:"googleInAppBrowserPopup"})},0);return}googleButtonText.style.display="none",googleButtonLoadingIcon.style.display="block";// [START auth_google_provider_create]
var e=new firebase.auth.GoogleAuthProvider;// [END auth_google_provider_create]
//NEW POPUP SIGNIN
try{await firebase.auth().signInWithPopup(e),await authUser.whenSet(signedInNextStep)}catch(t){errorHandler.report(t);let e=`[webflow] Error signing in with Google: ${t.code}, ${t.message}, ${t.email}, ${t}`;console.log(e)}}document.addEventListener("click",e=>{let t=document.getElementById("inAppBrowserInfo");t.contains(e.target)||t.classList.remove("tooltip-show")}),document.getElementById("passwordGoBack").addEventListener("click",()=>{chooseEmailDiv.style.display="block",choosePasswordDiv.style.display="none",document.getElementById("Choose-email-form").style.display="block",document.querySelector(".success-message").style.display="none"}),googleSignInButton.addEventListener("click",n),googleSignInButton2.addEventListener("click",n)},{}]},["ioxVe"],"ioxVe","parcelRequire81ca")//# sourceMappingURL=signInHelpers.js.map
;
//# sourceMappingURL=signInHelpers.js.map
