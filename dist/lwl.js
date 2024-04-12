!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,r,l){/* eslint-disable no-undef */var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof o[r]&&o[r],i=a.cache||{},d="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(t,n){if(!i[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var l="function"==typeof o[r]&&o[r];if(!n&&l)return l(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(a)return a(t,!0);// Try the node require function if it exists.
if(d&&"string"==typeof t)return d(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}m.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},m.cache={};var c=i[t]=new s.Module(t);e[t][0].call(c.exports,m,c,c.exports,this)}return i[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:s(t)}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=i,s.parent=a,s.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(s,"root",{get:function(){return o[r]}}),o[r]=s;for(var u=0;u<t.length;u++)s(t[u]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var c=s(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):l&&(this[l]=c)}}({"2mRjC":[function(e,t,n){document.getElementById("doneButton").addEventListener("click",()=>{let e=document.getElementById("lwlThreadUrl");if(!e.value.length){console.log("No url thread given");return}let t=new WebSocket("wss://lwl-to-mai-heypmjzjfq-ey.a.run.app");t.addEventListener("open",()=>{console.log("connected to lwl thread scraping server"),t.send(JSON.stringify({url:e.value}))}),t.addEventListener("message",async n=>{document.getElementById("scrapeProgressDiv").style.display="flex",console.log("received message from server",n.data);let l=n.data;try{l=JSON.parse(n.data)}catch(e){l={status:"Starting..."}}if(document.getElementById("scrapeProgress").innerText=l.status,l.status.match(/klar/i)){t.close(),document.getElementById("scrapeProgress").innerText="Skapar plagg i Mai med data h\xe4mtade fr\xe5n LWL";let n=await firebase.app().functions("europe-west3").httpsCallable("createItemDraftsFromLwl")({itemData:l.data,url:e});document.getElementById("scrapeProgressDiv").style.display="none",n.data.length&&r(n.data)}})});let r=e=>{document.getElementById("lwlItemsDiv").style.display="block";let t=document.getElementById("lwlItemCard")||document.getElementsByClassName("lwlItemCard")[0],n=document.getElementById("lwlItemList");for(let r of(n.innerHTML="",e)){let e=t.cloneNode(!0);e.id=`lwlItemCard${r.id}`,e.classList.add("lwlItemCard");let l=r.images?.enhancedFrontImageLarge||r.images?.enhancedFrontImage||r.images?.frontImageLarge||r.images?.frontImage;l?(e.querySelector(".img-container").style.backgroundImage=`url("${l}")`,e.querySelector(".no-image-text").style.display="none"):e.querySelector(".img-container").style.display="none",e.querySelector(".lwl-item-title").innerText=`${r.cleanedBrand||r.brand?.trim()}`,e.querySelector(".lwl-item-subtext").innerText=`${[r.category,r.maiSize].filter(e=>e).join(", ")}`,n.appendChild(e)}}},{}]},["2mRjC"],"2mRjC","parcelRequire81ca")//# sourceMappingURL=lwl.js.map
;
//# sourceMappingURL=lwl.js.map
