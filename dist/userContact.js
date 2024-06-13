!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,r,n,a){/* eslint-disable no-undef */var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof o[n]&&o[n],d=s.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function i(t,r){if(!d[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var a="function"==typeof o[n]&&o[n];if(!r&&a)return a(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(s)return s(t,!0);// Try the node require function if it exists.
if(l&&"string"==typeof t)return l(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}c.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},c.cache={};var m=d[t]=new i.Module(t);e[t][0].call(m.exports,c,m,m.exports,this)}return d[t].exports;function c(e){var t=c.resolve(e);return!1===t?{}:i(t)}}i.isParcelRequire=!0,i.Module=function(e){this.id=e,this.bundle=i,this.exports={}},i.modules=e,i.cache=d,i.parent=s,i.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(i,"root",{get:function(){return o[n]}}),o[n]=i;for(var u=0;u<t.length;u++)i(t[u]);if(r){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var m=i(r);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=m:"function"==typeof define&&define.amd?define(function(){return m}):a&&(this[a]=m)}}({qaquL:[function(e,t,r){var n=e("./general");let a=async()=>{let e=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"))?.item||JSON.parse(localStorage.getItem("latestItemCreated"));e&&(itemImage.src=e?.images?.enhancedFrontImageSmall||e?.images?.enhancedFrontImage||"",itemNotificationText.innerHTML=`Vi beh\xf6ver dina uppgifter f\xf6r att fullf\xf6lja f\xf6rs\xe4ljningen av ditt ${e.brand}-plagg. Anges bara en g\xe5ng.`,itemToBeCreatedDiv.style.display="block"),phoneNumber.addEventListener("input",function(){o("phoneNumberLabel");let e=formatPhoneNumber(phoneNumber.value),t=e.length>=12&&e.includes("+")?"":"Ogiltigt mobilnummer";phoneNumber.setCustomValidity(t)}),personalId.addEventListener("input",o("personalIdLabel")),saveUserDetailsButton.addEventListener("click",async()=>{let e=!personalId.value?.length||(0,n.isValidSwedishSsn)(personalId.value)?"":"Ogiltigt personnummer";if(personalId.setCustomValidity(e),document.getElementById("wf-form-User-Details").reportValidity()){try{await callFirebaseFunction("europe-west1","updateFirebaseUser",{phoneNumber:formatPhoneNumber(phoneNumber.value),personalId:(0,n.formatPersonalId)(personalId.value)})}catch(e){console.error("Failed saving user contact info",e)}location.href="/item-confirmation"}})};function o(e){return t=>{document.getElementById(e).style.display=t.target.value.length>0?"inline-block":"none"}}a()},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function a(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}async function o(e,t,r,n){let a="";n&&(a=await getIdToken());try{let n=await fetch(`https://europe-west1-second-hand-helper.cloudfunctions.net/webApi${t}`,{method:e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},..."POST"===e&&r?{body:JSON.stringify(r)}:{}}),o=await n.json();return{data:o}}catch(e){throw console.error(e),errorHandler.report(`Failure calling backend function ${JSON.stringify(e)}`),e}}function s(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function d(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,a=document.getElementById("addressPostalCode").value,o=document.getElementById("addressCity").value,s=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:n,addressPostalCode:a=a?a.trim().replace(/\D/g,""):"",addressCity:o=o?o.trim().charAt(0).toUpperCase()+o.trim().slice(1):"",addressDoorCode:s=s?s.trim():""}}function l(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function i(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function u(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function m(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}n.defineInteropFlag(r),n.export(r,"signOut",()=>a),// Function to call new web api backend function, with or without auth
n.export(r,"callBackendApi",()=>o),n.export(r,"setFormAddressFields",()=>s),n.export(r,"getFormAddressFields",()=>d),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
n.export(r,"isValidSwedishSsn",()=>l),n.export(r,"formatPersonalId",()=>i),n.export(r,"itemCoverImage",()=>u),n.export(r,"shareCode",()=>m)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||t.hasOwnProperty(r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["qaquL"],"qaquL","parcelRequire81ca")//# sourceMappingURL=userContact.js.map
;
//# sourceMappingURL=userContact.js.map
