!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,o,r){/* eslint-disable no-undef */var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},f="function"==typeof i[o]&&i[o],u=f.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,n){if(!u[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var r="function"==typeof i[o]&&i[o];if(!n&&r)return r(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(f)return f(t,!0);// Try the node require function if it exists.
if(a&&"string"==typeof t)return a(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}s.resolve=function(n){var o=e[t][1][n];return null!=o?o:n},s.cache={};var c=u[t]=new l.Module(t);e[t][0].call(c.exports,s,c,c.exports,this)}return u[t].exports;function s(e){var t=s.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=u,l.parent=f,l.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(l,"root",{get:function(){return i[o]}}),i[o]=l;for(var d=0;d<t.length;d++)l(t[d]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var c=l(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):r&&(this[r]=c)}}({"5bxKa":[function(e,t,n){let o=async()=>{try{document.getElementById("emailText").innerText=getParamsObject().email;let e=await fetch("https://itemrecommendationssignup-heypmjzjfq-ew.a.run.app",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:getParamsObject().email})});if(!e.ok)return console.error(`Error: ${e.statusText}`),null;let t=await e.json();console.log(t)}catch(e){console.error("Failed to register for purchase recommendation email.",e),document.getElementById("emailText").innerText="N\xe5got gick fel"}};o()},{}]},["5bxKa"],"5bxKa","parcelRequire81ca")//# sourceMappingURL=emailSignUp.js.map
;
//# sourceMappingURL=emailSignUp.js.map
