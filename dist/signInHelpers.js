!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,o,n,i){/* eslint-disable no-undef */var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof r[n]&&r[n],u=l.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function a(t,o){if(!u[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var i="function"==typeof r[n]&&r[n];if(!o&&i)return i(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(l)return l(t,!0);// Try the node require function if it exists.
if(s&&"string"==typeof t)return s(t);var f=Error("Cannot find module '"+t+"'");throw f.code="MODULE_NOT_FOUND",f}c.resolve=function(o){var n=e[t][1][o];return null!=n?n:o},c.cache={};var d=u[t]=new a.Module(t);e[t][0].call(d.exports,c,d,d.exports,this)}return u[t].exports;function c(e){var t=c.resolve(e);return!1===t?{}:a(t)}}a.isParcelRequire=!0,a.Module=function(e){this.id=e,this.bundle=a,this.exports={}},a.modules=e,a.cache=u,a.parent=l,a.register=function(t,o){e[t]=[function(e,t){t.exports=o},{}]},Object.defineProperty(a,"root",{get:function(){return r[n]}}),r[n]=a;for(var f=0;f<t.length;f++)a(t[f]);if(o){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var d=a(o);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=d:"function"==typeof define&&define.amd?define(function(){return d}):i&&(this[i]=d)}}({ioxVe:[function(e,t,o){async function n(){if(function(){for(let[e,t]of Object.entries({facebook:/\bFB[\w_]+\//,twitter:/\bTwitter/i,tiktok:/\bBytedance\//i,instagram:/\bInstagram/i}))if(t.test(navigator.userAgent))return e;return!1}()){let e=document.getElementById("inAppBrowserInfo");e.classList.contains("tooltip-show")||setTimeout(()=>{e.classList.add("tooltip-show"),analytics.track("Element Viewed",{elementID:"googleInAppBrowserPopup"})},0);return}googleButtonText.style.display="none",googleButtonLoadingIcon.style.display="block";// [START auth_google_provider_create]
var e=new firebase.auth.GoogleAuthProvider;// [END auth_google_provider_create]
//NEW POPUP SIGNIN
try{await firebase.auth().signInWithPopup(e),await authUser.whenSet(signedInNextStep)}catch(t){errorHandler.report(t);let e=`[webflow] Error signing in with Google: ${t.code}, ${t.message}, ${t.email}, ${t}`;console.log(e)}}document.addEventListener("click",e=>{let t=document.getElementById("inAppBrowserInfo");t.contains(e.target)||t.classList.remove("tooltip-show")}),googleSignInButton.addEventListener("click",n),googleSignInButton2.addEventListener("click",n)},{}]},["ioxVe"],"ioxVe","parcelRequire81ca")//# sourceMappingURL=signInHelpers.js.map
;
//# sourceMappingURL=signInHelpers.js.map
