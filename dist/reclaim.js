!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,l,i){/* eslint-disable no-undef */var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof o[l]&&o[l],r=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(t,n){if(!r[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var i="function"==typeof o[l]&&o[l];if(!n&&i)return i(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(a)return a(t,!0);// Try the node require function if it exists.
if(s&&"string"==typeof t)return s(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}u.resolve=function(n){var l=e[t][1][n];return null!=l?l:n},u.cache={};var m=r[t]=new c.Module(t);e[t][0].call(m.exports,u,m,m.exports,this)}return r[t].exports;function u(e){var t=u.resolve(e);return!1===t?{}:c(t)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=r,c.parent=a,c.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(c,"root",{get:function(){return o[l]}}),o[l]=c;for(var d=0;d<t.length;d++)c(t[d]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var m=c(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=m:"function"==typeof define&&define.amd?define(function(){return m}):i&&(this[i]=m)}}({"7h7Hl":[function(e,t,n){async function l(){return document.getElementById("reclaimFormInner").reportValidity(),new Promise((e,t)=>{// Custom
let n=document.getElementById("reclaimReason");return n.value?e(!0):(n.setCustomValidity(`V\xe4lj anledning till reklamationen`),document.getElementById("reclaimFormInner").reportValidity(),e(!1))})}async function i(e){if(!await l())return;let t=new Date,n=reclaimReason.value,i=reclaimListingError.value||"",o=reclaimDescription.value||"",a="",r=document.getElementsByName("compensationPreference");for(var s=0;s<r.length;s++)r[s].checked&&(a=r[s].value);let c=a.includes("10 percent discount")?parseInt(discount10PercentText.innerText.match(/\d+/g)):null,d={createdAt:t,status:"Pending",reason:n,description:o,listingError:i,compensationPreference:a,...c?{refundAmount:c}:{}};console.log("Will update: ",{itemId:e,reclaim:d}),await callFirebaseFunction("europe-west1","saveReclaim",{itemId:e,reclaim:d})}let o=async e=>{let t=await callBackendApi("get",`/api/items?itemId=${e}`);return{...t?.data||{},id:e}},a=async()=>{let e=getParamsObject(),t=e.id?await o(e.id):"";t||(console.error("Invalid item id param"),location.href="/"),function(e){let t=(e.cleanedBrand||e.brand).trim()+"-"+e.category.toLowerCase();document.getElementById("itemTitle").innerText=t,document.getElementById("itemTitleBanner").innerText=t,console.log("item",e),console.log("soldDate",e.soldDate);let n=new Date(e.soldDate).toLocaleDateString("sv-SE",{day:"numeric",month:"long",year:"numeric"}),l=`${e.soldPrice} kr, ${n}`;document.getElementById("itemSubtitle").innerText="K\xf6ptes f\xf6r "+l,document.getElementById("itemSubtitleBanner").innerText=l;let i=window.innerWidth<=400?e?.images?.modelImage||e?.images?.enhancedFrontImageSmall||e?.images?.enhancedFrontImage||e?.images?.frontImageSmall||e?.images?.frontImage:e?.images?.modelImage||e?.images?.enhancedFrontImage||e?.images?.frontImage;document.getElementById("itemImage").src=i,document.getElementById("itemImageBanner").src=i,document.getElementById("resellButton").href=`./sell-item?id=${e.id}`;let o=Math.round(.1*e.soldPrice);o=o<60?60:o>250?250:o,discount10PercentText.innerText=`Beh\xe5lla plagget och f\xe5 ${o} kr \xe5terbetalt`;let a=e.buyer.Email||e.buyer.PhoneNumber;thankYouText.innerText=`Vi tittar p\xe5 \xe4rendet och skickar svar ${a.includes("@")?`till din email ${a}`:`p\xe5 SMS till ditt telefonnummer ${a}`}`;// Om reclaim redan finns -> Gå direkt till Tack!
/*
    if (item?.reclaim?.status){
        hideAllButtons();
        toMaiButton.style.display = 'flex';
        introDiv.style.display = 'none';
        thankYouDiv.style.display = 'block';
        itemBanner.style.display = 'block';
    }
    */}(t),document.getElementById("reclaimButton").addEventListener("click",function(){itemBanner.style.display="block",document.getElementById("reclaimForm").style.display="block",cancelButton.style.display="flex",doneButton.style.display="flex",resellButton.style.display="none",reclaimButton.style.display="none",document.getElementById("introDiv").style.display="none"}),reclaimReason.onchange=function(){// Color and label
let e=this.value;if(console.log("input",e),""===e){reasonLabel.style.display="none",this.style.color="#929292";return}reasonLabel.style.display="block",this.style.color="#101010";// Hide all fields
let t=document.querySelectorAll(".simple-input-container");t.forEach(function(e){e.id.includes("Reason")||(e.style.display="none")}),reclaimImagesContainer.style.display="none",e.includes("Defects")?(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block"):e.includes("Listing")?reclaimListingErrorContainer.style.display="block":e.includes("False")?(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block"):e.includes("Dirty")?(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block"):e.includes("Smelly")?reclaimDescriptionContainer.style.display="block":(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block"),compensationPreferenceDiv.style.display="block"},reclaimListingError.onchange=function(){// Color and label
let e=this.value;if(""===e){listingErrorLabel.style.display="none",this.style.color="#929292";return}listingErrorLabel.style.display="block",this.style.color="#101010","Other"===e&&(reclaimDescriptionContainer.style.display="block")},document.getElementById("doneButton").addEventListener("click",async function(){//showSpinner();
let e=getParamsObject();await i(e.id),console.log("RECLAIM SAVED"),reclaimForm.style.display="none",resellButton.style.display="none",reclaimButton.style.display="none",cancelButton.style.display="none",doneButton.style.display="none",toMaiButton.style.display="none",toMaiButton.style.display="flex",thankYouDiv.style.display="block"}),triggerShowContent.click()};a()},{}]},["7h7Hl"],"7h7Hl","parcelRequire81ca")//# sourceMappingURL=reclaim.js.map
;
//# sourceMappingURL=reclaim.js.map
