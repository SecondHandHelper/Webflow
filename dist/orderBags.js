!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,r,n,d){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof a[n]&&a[n],l=o.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function i(t,r){if(!l[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var d="function"==typeof a[n]&&a[n];if(!r&&d)return d(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(o)return o(t,!0);// Try the node require function if it exists.
if(s&&"string"==typeof t)return s(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}c.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},c.cache={};var m=l[t]=new i.Module(t);e[t][0].call(m.exports,c,m,m.exports,this)}return l[t].exports;function c(e){var t=c.resolve(e);return!1===t?{}:i(t)}}i.isParcelRequire=!0,i.Module=function(e){this.id=e,this.bundle=i,this.exports={}},i.modules=e,i.cache=l,i.parent=o,i.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(i,"root",{get:function(){return a[n]}}),a[n]=i;for(var u=0;u<t.length;u++)i(t[u]);if(r){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var m=i(r);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=m:"function"==typeof define&&define.amd?define(function(){return m}):d&&(this[d]=m)}}({aCqKZ:[function(e,t,r){var n=e("./general"),d=10;async function a(){let e=await (0,n.callBackendApi)("/api/bags/orders/allowed",{requiresAuth:!0});if(e?.data)return e.data?.errorCode==="unfulfilled-order"?(document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Du har nyligen lagt en best\xe4llning som \xe4r p\xe5 v\xe4g till dig.\nV\xe4nta in p\xe5sarna innan du l\xe4gger fler best\xe4llningar.",0):e.data?.maxOrderBags===0?(document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Du kan bara best\xe4lla p\xe5sar om\ndu har p\xe5g\xe5ende f\xf6rs\xe4ljningar.",0):d=Math.min(e.data.maxOrderBags,d)}function o(){return+document.getElementById("numSmall").value+ +document.getElementById("numMedium").value+ +document.getElementById("numLarge").value}function l(){document.getElementById("orderBags").innerText=`Best\xe4ll ${o()} ${s()} gratis`,document.getElementById("orderBagsError").style.display="none"}function s(){return 1===o()?"p\xe5se":"p\xe5sar"}function i(e){return e?.replace(/\s/g,"")?.length>0}async function u(){let e=await db.collection("users").doc(authUser.current.uid).get(),{addressFirstName:t,addressLastName:r,addressStreetAddress:n,addressPostalCode:d,addressCity:a}=e.data();return[t,r,n,d,a].every(i)}function m(e,t,r){document.getElementById(e).addEventListener("click",function(){var e;(e=document.getElementById(r)).value=Math.max(+e.value-1,0),e.style.color=0==+e.value?"#c3c2c2":"#000",l()}),document.getElementById(t).addEventListener("click",function(){var e;e=document.getElementById(r),o()>=10||(e.value=Math.min(+e.value+1,10),l(),1!=+e.value||(e.style.color="black"))})}m("minusSmall","plusSmall","numSmall"),m("minusMedium","plusMedium","numMedium"),m("minusLarge","plusLarge","numLarge"),document.getElementById("userAddressForm").addEventListener("submit",async()=>{let e=(0,n.getFormAddressFields)(),t=db.collection("users").doc(authUser.current.uid);await t.update(e),document.getElementById("orderBagsConfirmation").style.display="block",document.getElementById("addressFormDiv").style.display="none"}),document.getElementById("orderBags").addEventListener("click",async function(){if(0===o()){document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="V\xe4lj minst 1 p\xe5se";return}if(o()>10){document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Max 10 p\xe5sar per best\xe4llning";return}document.getElementById("orderBagsError").style.display="none",document.getElementById("orderBags").style.display="none",document.getElementById("orderBagsSpinner").style.display="flex";//Tobias added
let e=await a();if(0===e){document.getElementById("orderBags").style.display="flex",document.getElementById("orderBagsSpinner").style.display="none";return}if(o()>e){document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText=`Inte fler \xe4n antalet p\xe5g\xe5ende f\xf6rs\xe4ljningar, dvs ${e}`,document.getElementById("orderBags").style.display="flex",document.getElementById("orderBagsSpinner").style.display="none";return}let t=+document.getElementById("numSmall").value,r=+document.getElementById("numMedium").value,d=+document.getElementById("numLarge").value;try{await (0,n.callBackendApi)("/api/bags/order",{data:{numLargeBags:d,numSmallBags:t,numMediumBags:r}}),document.getElementById("bagsOrdered").innerText=`${o()} ${s()} p\xe5 v\xe4g!`}catch(e){errorHandler.report(e),document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="N\xe5got gick fel vid best\xe4llningen. F\xf6rs\xf6k igen och kontakta oss om det fortfarande inte fungerar.",document.getElementById("orderBags").style.display="flex",document.getElementById("orderBagsSpinner").style.display="none";return}if(document.getElementById("orderBagsForm").style.display="none",await u())document.getElementById("orderBagsConfirmation").style.display="block";else{let e=await db.collection("users").doc(authUser.current.uid).get(),t=e.data();document.getElementById("addressFormDiv").style.display="block",(0,n.setFormAddressFields)(t)}}),document.getElementById("closeOrderBagsConfirmationButton").addEventListener("click",function(){document.getElementById("closeOrderBagsConfirmationButton").style.display="none",document.getElementById("closeOrderBagsSpinner").style.display="flex"})},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function d(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}n.defineInteropFlag(r),n.export(r,"signOut",()=>d),n.export(r,"BACKEND_API_URL",()=>a),// Function to call web api backend function, with or without auth
n.export(r,"callBackendApi",()=>o),n.export(r,"setFormAddressFields",()=>s),n.export(r,"getFormAddressFields",()=>i),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
n.export(r,"isValidSwedishSsn",()=>u),n.export(r,"formatPersonalId",()=>m),n.export(r,"itemCoverImage",()=>c),n.export(r,"shareCode",()=>g);let a="https://europe-west1-second-hand-helper.cloudfunctions.net/webApi";async function o(e,{data:t,method:r,requiresAuth:n,timeoutSec:d=20}={}){// const { data, method, requiresAuth, timeoutSec = 20 } = opts;
let o=new AbortController,s=setTimeout(()=>o.abort(),1e3*d),i="",u=r||(t?"POST":"GET");(n||"GET"!==u)&&(i=await l());try{let r=await fetch(`${a}${e}`,{method:u,headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},...t?{body:JSON.stringify(t)}:{},signal:o.signal});if("0"===r.headers.get("content-length"))return{data:void 0};let n=await r.json();return{data:n}}catch(e){throw console.error(e),errorHandler.report(`Failure calling backend function ${JSON.stringify(e)}`),e}finally{clearTimeout(s)}}async function l(){let e=localStorage.getItem("idToken");if(!e){if(firebase.auth().currentUser){let e=await result.getIdToken();localStorage.setItem("idToken",e),authUser.current=firebase.auth().currentUser,localStorage.setItem("authUser",JSON.stringify(authUser.current))}else throw Error("User not authenticated")}return e}function s(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function i(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,d=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,o=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:n,addressPostalCode:d=d?d.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:o=o?o.trim():""}}function u(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function m(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function c(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function g(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||t.hasOwnProperty(r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["aCqKZ"],"aCqKZ","parcelRequire81ca")//# sourceMappingURL=orderBags.js.map
;
//# sourceMappingURL=orderBags.js.map
