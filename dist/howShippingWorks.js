!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,n,t,o,r){/* eslint-disable no-undef */var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},f="function"==typeof i[o]&&i[o],u=f.cache||{},d="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(n,t){if(!u[n]){if(!e[n]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var r="function"==typeof i[o]&&i[o];if(!t&&r)return r(n,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(f)return f(n,!0);// Try the node require function if it exists.
if(d&&"string"==typeof n)return d(n);var a=Error("Cannot find module '"+n+"'");throw a.code="MODULE_NOT_FOUND",a}s.resolve=function(t){var o=e[n][1][t];return null!=o?o:t},s.cache={};var c=u[n]=new l.Module(n);e[n][0].call(c.exports,s,c,c.exports,this)}return u[n].exports;function s(e){var n=s.resolve(e);return!1===n?{}:l(n)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=u,l.parent=f,l.register=function(n,t){e[n]=[function(e,n){n.exports=t},{}]},Object.defineProperty(l,"root",{get:function(){return i[o]}}),i[o]=l;for(var a=0;a<n.length;a++)l(n[a]);if(t){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var c=l(t);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):r&&(this[r]=c)}}({kMCfr:[function(e,n,t){!async function(){if(authUser.current){let e=await callBackendApi("/api/bags/orders/allowed",{requiresAuth:!0});console.log("maxBags",e),e?.data?.maxOrderBags>0&&(document.getElementById("orderBagsButton").style.display="flex")}}()},{}]},["kMCfr"],"kMCfr","parcelRequire81ca")//# sourceMappingURL=howShippingWorks.js.map
;
//# sourceMappingURL=howShippingWorks.js.map
