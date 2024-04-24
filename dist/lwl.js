!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,l,r){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof a[l]&&a[l],d=o.cache||{},i="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(t,n){if(!d[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var r="function"==typeof a[l]&&a[l];if(!n&&r)return r(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(o)return o(t,!0);// Try the node require function if it exists.
if(i&&"string"==typeof t)return i(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(n){var l=e[t][1][n];return null!=l?l:n},m.cache={};var u=d[t]=new s.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return d[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:s(t)}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=d,s.parent=o,s.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(s,"root",{get:function(){return a[l]}}),a[l]=s;for(var c=0;c<t.length;c++)s(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=s(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):r&&(this[r]=u)}}({"2mRjC":[function(e,t,n){let l=getParamsObject();if("true"===l.createDrafts&&localStorage.getItem("lwlItemDrafts")&&(document.referrer.includes("sign-in")||document.referrer.includes("private"))){document.getElementById("headerImage").style.display="none",document.getElementById("threadInputDiv").style.display="none",document.getElementById("lwlItemsDiv").style.display="none",document.getElementById("loadingDiv").style.display="flex";let e=JSON.parse(localStorage.getItem("lwlItemDrafts"));authUser.whenSet(async()=>{await Promise.all(e.map(e=>firebase.app().functions("europe-west1").httpsCallable("createItem")({id:e.id,item:e}))),localStorage.removeItem("lwlItemDrafts"),location.href="/private#wardrobe"})}let r=!1;document.getElementById("doneButton").addEventListener("click",()=>{if(r)return;let e=document.getElementById("lwlThreadUrl");if(!e.value.length){console.log("No url thread given");return}r=!0,document.getElementById("lwlThreadUrl").style.display="none",document.getElementById("buttonsDiv").style.display="none",document.getElementById("doneButton").style.display="none",document.getElementById("introHeading").style.display="none",document.getElementById("scrapeProgressDiv").style.display="flex",document.getElementById("scrapeProgress").innerText="Startar...";let t=new WebSocket("wss://lwl-to-mai-heypmjzjfq-ey.a.run.app");t.addEventListener("open",()=>{console.log("connected to lwl thread scraping server"),t.send(JSON.stringify({url:e.value}))}),t.addEventListener("message",async n=>{console.log("received message from server",n.data);let l=n.data;try{l=JSON.parse(n.data)}catch(e){l={status:"Startar..."}}if(""===l.status&&l.data,document.getElementById("scrapeProgress").innerText=l.status,l.status.match(/klar/i)){t.close(),document.getElementById("scrapeProgress").innerText="Skapar plagg i Mai med data h\xe4mtade fr\xe5n LWL";let n=await firebase.app().functions("europe-west3").httpsCallable("createItemDraftsFromLwl",{timeout:24e4})({itemData:l.data,url:e});authUser.current?location.href="/private#wardrobe":(document.getElementById("scrapeProgressDiv").style.display="none",document.getElementById("introHeading").innerText="Plaggen fr\xe5n din tr\xe5d. Logga in f\xf6r att l\xe5ta Mai s\xe4lja dem.",document.getElementById("introHeading").style.display="block",// showLwLDraftItemsFromPreview(draftItemResponse.data);
a(n.data),document.getElementById("buttonsDiv").style.display="block",document.getElementById("signInButton").style.display="flex",document.getElementById("signInButton").addEventListener("click",async()=>{localStorage.setItem("lwlItemDrafts",JSON.stringify(n.data)),location.href="/sign-in"}))}})});let a=e=>{document.getElementById("lwlItemsDiv").style.display="block";let t=document.getElementById("lwlItemCard")||document.getElementsByClassName("lwlItemCard")[0],n=document.getElementById("lwlItemList");for(let l of(n.innerHTML="",e)){let e=t.cloneNode(!0);e.id=`lwlItemCard${l.id}`,e.classList.add("lwlItemCard");let r=l.images?.frontImage;r?(e.querySelector(".img-container").style.backgroundImage=`url("${r}")`,e.querySelector(".no-image-text").style.display="none"):e.querySelector(".img-container").style.display="none",e.querySelector(".lwl-item-title").innerText=`${l.cleanedBrand||l.brand?.trim()}`,e.querySelector(".lwl-item-subtext").innerText=`${[l.category,l.maiSize].filter(e=>e).join(", ")}`,n.appendChild(e)}}},{}]},["2mRjC"],"2mRjC","parcelRequire81ca")//# sourceMappingURL=lwl.js.map
;
//# sourceMappingURL=lwl.js.map
