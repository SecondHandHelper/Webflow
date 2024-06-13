!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,i,r){/* eslint-disable no-undef */var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof o[i]&&o[i],d=l.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(t,n){if(!d[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var r="function"==typeof o[i]&&o[i];if(!n&&r)return r(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(l)return l(t,!0);// Try the node require function if it exists.
if(a&&"string"==typeof t)return a(t);var m=Error("Cannot find module '"+t+"'");throw m.code="MODULE_NOT_FOUND",m}u.resolve=function(n){var i=e[t][1][n];return null!=i?i:n},u.cache={};var s=d[t]=new c.Module(t);e[t][0].call(s.exports,u,s,s.exports,this)}return d[t].exports;function u(e){var t=u.resolve(e);return!1===t?{}:c(t)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=d,c.parent=l,c.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(c,"root",{get:function(){return o[i]}}),o[i]=c;for(var m=0;m<t.length;m++)c(t[m]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var s=c(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=s:"function"==typeof define&&define.amd?define(function(){return s}):r&&(this[r]=s)}}({YhYNY:[function(e,t,n){function i(e){return({Beige:"Beige",Blue:"Bl\xe5",Brown:"Brun",Green:"Gr\xf6n",Grey:"Gr\xe5",Yellow:"Gul",Gold:"Guld",Purple:"Lila",Navy:"Navy",Orange:"Orange",Pink:"Rosa",Red:"R\xf6d",Silver:"Silver",Black:"Svart",Turquoise:"Turkos",Burgundy:"Vinr\xf6d",White:"Vit",Multicolour:"Flerf\xe4rgad"})[e]||e}let r=async e=>{let t=await callBackendApi("get",`/api/items?itemId=${e}`);return{...t?.data||{},id:e}},o=async()=>{let e=getParamsObject(),t=e.id?await r(e.id):JSON.parse(localStorage.getItem("latestItemCreated"));t||(console.error("Invalid item id param or no recently created item"),location.href="/private"),function(e){var t;let n,{humanCheckNeeded:r,maxPriceEstimate:o,newMinMaxLog:l}=e.mlValuation||{};e.infoRequests?.price?.response==="User proposal"?(document.getElementById("nextStepTitle").style.display="block",document.getElementById("nextStepTitle").innerText="Granskar pris\xe4ndringar",document.getElementById("nextStepText").innerText="Vi kikar p\xe5 dina pris\xe4ndringar, och om det ser bra ut s\xe5 p\xe5b\xf6rjar vi f\xf6rs\xe4ljningen. Vi tar sedan hand om s\xe4ljprocessen och h\xf6r av oss p\xe5 SMS n\xe4r plagget \xe4r s\xe5lt."):(r||!o&&!e.infoRequests?.price?.maxPrice||l)&&(document.getElementById("nextStepTitle").style.display="block",document.getElementById("nextStepText").innerText=`Ditt ${e.cleanedBrand||e.brand}-plagg beh\xf6ver v\xe4rderas manuellt, d\xe5 AI-v\xe4rderingen har l\xe4gre tr\xe4ffs\xe4kerhet p\xe5 detta varum\xe4rke. Du kommer f\xe5 ett SMS n\xe4r vi v\xe4rderat plagget som du kan ta st\xe4llning till.`),document.getElementById("itemTitle").innerText=(e.cleanedBrand||e.brand).trim()+"-"+e.category.toLowerCase(),document.getElementById("itemPrice").innerText=!e.maxPriceEstimate||r||l?"":`${e.maxPriceEstimate||o} SEK`,document.getElementById("itemPrice").style.display="block",document.getElementById("itemSubtitle").innerText=e.model?`${e.model}, ${i(e.color)}`:i(e.color),document.getElementById("itemSize").innerText=e.size,document.getElementById("itemMaterial").innerText=e.material,document.getElementById("itemCondition").innerText=e.condition=(n="",((n="Anv\xe4nd, tecken p\xe5 slitage"===(t=e).condition&&(t.defects.length||t.defectDescription)?t.defectDescription?t.defectDescription:t.defects&&t.defects.length>0?"Anm\xe4rkning: "+t.defects.filter(e=>"Annat"!==e).join(", "):t.condition:t.condition)+".").replace("..",".")),e.originalPrice&&(itemOriginalPrice.innerText=e.originalPrice+" SEK",originalPriceDiv.style.display="flex"),e.userComment&&(document.getElementById("itemComment").innerText=e.userComment,document.getElementById("itemCommentDiv").style.display="block"),e?.platformsToBePublishedOn?.length?function(e){if(e?.platformsToBePublishedOn?.length<2){document.getElementById("platformsSection").style.display="none";return}let t=document.getElementById("platformTradera");e.platformsToBePublishedOn.forEach(e=>{if(e.match(/Tradera/))return;// Tradera is set statically in Webflow and always displayed
let n=t.cloneNode(!0);n.id=e,n.innerText=e,t.parentNode.appendChild(n)}),document.getElementById("platformsLoadingDiv").style.display="none",document.getElementById("platformsDiv").style.display="block"}(e):document.getElementById("platformsSection").style.display="none"}(t),triggerShowContent.click()};o()},{}]},["YhYNY"],"YhYNY","parcelRequire81ca")//# sourceMappingURL=itemConfirmation.js.map
;
//# sourceMappingURL=itemConfirmation.js.map
