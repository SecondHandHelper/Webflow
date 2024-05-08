!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,l,o){/* eslint-disable no-undef */var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof r[l]&&r[l],a=i.cache||{},d="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(t,n){if(!a[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var o="function"==typeof r[l]&&r[l];if(!n&&o)return o(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(i)return i(t,!0);// Try the node require function if it exists.
if(d&&"string"==typeof t)return d(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}u.resolve=function(n){var l=e[t][1][n];return null!=l?l:n},u.cache={};var m=a[t]=new s.Module(t);e[t][0].call(m.exports,u,m,m.exports,this)}return a[t].exports;function u(e){var t=u.resolve(e);return!1===t?{}:s(t)}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=a,s.parent=i,s.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(s,"root",{get:function(){return r[l]}}),r[l]=s;for(var c=0;c<t.length;c++)s(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var m=s(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=m:"function"==typeof define&&define.amd?define(function(){return m}):o&&(this[o]=m)}}({"2mRjC":[function(e,t,n){let l=getParamsObject();if("true"===l.createDrafts&&localStorage.getItem("lwlItemDrafts")&&(document.referrer.includes("sign-in")||document.referrer.includes("private"))){document.getElementsByClassName("div-block-230")[0].style.display="none",document.getElementById("header").style.display="none",document.getElementById("formDiv").style.display="none",document.getElementById("threadInputDiv").style.display="none",document.getElementById("lwlItemsDiv").style.display="none",document.getElementById("loadingDiv").style.display="flex";let e=JSON.parse(localStorage.getItem("lwlItemDrafts"));authUser.whenSet(async()=>{await Promise.all(e.map(e=>firebase.app().functions("europe-west1").httpsCallable("createItem")({id:e.id,item:e}))),localStorage.removeItem("lwlItemDrafts"),location.href="/private#wardrobe"})}let o=!1,r=e=>{document.getElementById("errorMessage").innerHTML=e||"N\xe5got gick fel, kontrollera att du skrivit in en giltig LWL tr\xe5d och f\xf6rs\xf6k igen.",document.getElementsByClassName("w-form-fail")[0].style.display="block",document.getElementById("lwlThreadUrl").style.display="block",document.getElementById("buttonsDiv").style.display="block",document.getElementById("doneButton").style.display="flex",document.getElementById("doneButton").innerText="Starta om",document.getElementById("introHeading").style.display="block",document.getElementById("scrapeProgressDiv").style.display="none",o=!1};document.getElementById("doneButton").addEventListener("click",()=>{if(o)return;document.getElementsByClassName("w-form-fail")[0].style.display="none";let e=document.getElementById("lwlThreadUrl");if(!e.value.length){console.log("No url thread given");return}if(!e.value.match(/^https:\/\/www.facebook.com\/groups\/982264948455365\/permalink\/\d+/)){r("Ogilitg LWL url angiven.");return}o=!0,document.getElementById("lwlThreadUrl").style.display="none",document.getElementById("buttonsDiv").style.display="none",document.getElementById("doneButton").style.display="none",document.getElementById("introHeading").style.display="none",document.getElementById("openIntroDiv").style.display="none",document.getElementById("scrapeProgressDiv").style.display="flex",document.getElementById("scrapeProgress").innerText="Startar...";let t=new WebSocket("wss://lwl-to-mai-heypmjzjfq-ey.a.run.app");t.addEventListener("open",()=>{console.log("connected to lwl thread scraping server"),t.send(JSON.stringify({url:e.value}))}),t.addEventListener("error",e=>{r(),t.close()}),t.addEventListener("message",async n=>{console.log("received message from server",n.data);let l=n.data;try{l=JSON.parse(n.data)}catch(e){l={status:"Startar..."}}if("Error"===l.status){r(l.data?.threadIsValid?"N\xe5got gick fel, f\xf6rs\xf6k g\xe4rna igen.":null),t.close();return}if("Item"===l.status&&l.data&&a(l.data),document.getElementById("scrapeProgress").innerText=l.status,l.status.match(/klar/i)){if(t.close(),document.getElementById("scrapeProgress").innerText="Skapar plaggen i Mai...",!l.data.length){r(),t.close();return}let n=await firebase.app().functions("europe-west3").httpsCallable("createItemDraftsFromLwl",{timeout:24e4})({itemData:l.data,url:e.value});authUser.current?location.href="/private#wardrobe":(document.getElementById("scrapeProgressDiv").style.display="none",document.getElementById("introHeading").innerText="Os\xe5lda plagg fr\xe5n din tr\xe5d. Logga in f\xf6r att justera och s\xe4lja.",document.getElementById("introHeading").style.display="block",d(n.data),// TODO: remove this comment and the function when we are happy with addLwLItemPreview + showLwLDraftItemsFromPreview
// showLwLDraftItems(draftItemResponse.data);
document.getElementById("buttonsDiv").style.display="block",document.getElementById("signInButton").style.display="flex",document.getElementById("signInButton").addEventListener("click",async()=>{localStorage.setItem("lwlItemDrafts",JSON.stringify(n.data)),location.href="/sign-in"}))}})});let i=!1,a=e=>{let t=document.getElementsByClassName("lwlitemcard")[0],n=document.getElementById("lwlItemList");i||(document.getElementById("lwlItemsDiv").style.display="block",n.innerHTML="",i=!0);let l=t.cloneNode(!0);l.classList.add("lwlItemCard");let o=e.images?.[0];o?(l.querySelector(".img-container").style.backgroundImage=`url("${o}")`,l.querySelector(".no-image-text").style.display="none",l.style.opacity="0.5"):l.querySelector(".img-container").style.display="none",l.querySelector(".lwl-item-title").innerText="",l.querySelector(".lwl-item-subtext").innerText="",n.appendChild(l)},d=e=>{let t=document.getElementsByClassName("lwlItemCard");for(let n of t){let t=n.getElementsByClassName("img-container")[0].style.backgroundImage.slice(4,-1).replaceAll(/"/g,""),l=e.find(e=>e.draftSourceProperties.rawData.images.includes(t));n.style.opacity="1",n.querySelector(".lwl-item-title").innerText=`${l.cleanedBrand||l.brand?.trim()}`,n.querySelector(".lwl-item-subtext").innerText=`${[l.category,l.maiSize].filter(e=>e).join(", ")}`}};//INTRO STUFF
document.getElementById("introNext").addEventListener("click",()=>{"S\xe4tt ig\xe5ng"===document.getElementById("introNext").innerText&&(setCookie("lwlIntroSeen","true"),document.getElementById("introSection").style.display="none"),document.getElementById("introRightArrow").click(),document.querySelector(".w-slider-nav div:last-child").classList.contains("w-active")&&(document.getElementById("introNext").innerText="S\xe4tt ig\xe5ng")}),document.getElementById("skipIntro").addEventListener("click",()=>{setCookie("lwlIntroSeen","true"),document.getElementById("introSection").style.display="none"}),"true"!==getCookie("lwlIntroSeen")&&(document.getElementById("introSection").style.display="flex"),document.getElementById("openIntroButton").addEventListener("click",()=>{document.getElementById("introSection").style.display="flex",document.querySelector(".slide-nav-lwl div.w-slider-dot").click(),document.getElementById("introNext").innerText="N\xe4sta"}),document.getElementById("chatLink").addEventListener("click",()=>{Intercom("showNewMessage","Klistra in en l\xe4nk till LWL tr\xe5den du f\xf6rs\xf6kte l\xe4sa in?\n\n")}),window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var n=document,l=function(){l.c(arguments)};l.q=[],l.c=function(e){l.q.push(e)},e.Intercom=l;var o=function(){var e=n.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=n.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",o):e.addEventListener("load",o,!1)}}()},{}]},["2mRjC"],"2mRjC","parcelRequire81ca")//# sourceMappingURL=lwl.js.map
;
//# sourceMappingURL=lwl.js.map
