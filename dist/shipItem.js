!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,r,n,o){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof a[n]&&a[n],i=s.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,r){if(!i[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var o="function"==typeof a[n]&&a[n];if(!r&&o)return o(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(s)return s(t,!0);// Try the node require function if it exists.
if(l&&"string"==typeof t)return l(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},m.cache={};var u=i[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return i[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=i,d.parent=s,d.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(d,"root",{get:function(){return a[n]}}),a[n]=d;for(var c=0;c<t.length;c++)d(t[c]);if(r){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(r);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):o&&(this[o]=u)}}({fSnW0:[function(e,t,r){var n,o=e("./general");// Load item
let a=getParamsObject();n=a.id,console.log(`loadItem(${n})`),db.collection("items").doc(n).get().then(e=>{if(e.exists){let t;console.log("Item data:",e.data());let r=e.data(),n=r.brand,a=(0,o.itemCoverImage)(r),s=r.category?r.category:"",i=r.postnordQrCode,l=r.postnordQrCodePage,d=r.dhlLicensePlateBarcodeSrc,c=r.dhlLicensePlate,u=r.upsShipmentId,m=r.vestiaireShippingLabel,p=r.buyer?.FirstName||r.buyerFirstName||"",g=r.buyer?.LastName||r.buyerLastName||"";r.buyer?.StreetAddress||r.buyerAddressStreetAddress,r.buyer?.PostalCode||r.buyerAddressPostalCode;let f=r.buyer?.City||r.buyerAddressCity||"",y=r.shippingMethod,h=r.shippingStatus,v=r.soldPlatform,b=r.soldDate;if(b){specificDate=new Date(b);let e=new Date;specificDate.setHours(0,0,0,0),e.setHours(0,0,0,0),t=Math.round((e-specificDate)/864e5)}pageTitleText.innerHTML=`Skicka ${n.trim()}-${s.trim().toLowerCase()}`,buyerAddressDiv.innerHTML=`${p.trim()} ${g.trim()}<br>${f.trim()}`,itemImageDiv.style.backgroundImage=`url('${a}')`,y&&("Service point"===y?i&&!("Vestiaire Collective"===v||"Grailed"===v)?(qrCodeImage.style.backgroundImage=`url('${i}')`,postnordQrCodeDiv.href=l,postnordQrCodeDiv.style.display="flex",mainInstructionDiv.style.display="block",howToShipQrDiv.style.display="block"):d&&"Vestiaire Collective"===v?(barcodeImageContainer.innerHTML=`<img src="${d}" alt="barcode" class="image-98">`,dhlBarcodeDiv.style.display="flex",c&&(dhlLicensePlateText.innerHTML=c,dhlLicensePlateText.style.display="block"),mainInstructionText.innerText="L\xe4mna p\xe5sen till ett ombud och\nbe dem scanna streckkoden",findDhlServicePointLink.style.display="flex",mainInstructionDiv.style.display="block",howToShipDhlBarcodeDiv.style.display="block"):u&&"Vestiaire Collective"===v?(upsIconDiv.style.display="block",findUpsServicePointLink.style.display="flex",mainInstructionText.innerText="S\xe4tt p\xe5 fraktsedeln vi skickat dig p\xe5 p\xe5sen och l\xe4mna till ombud",bullet3TitleNoQr.innerText="L\xe4mna till UPS-ombud",howToShipNoQrDiv.style.display="block",mainInstructionDiv.style.display="block",m&&t>=4&&(openShippingLabelButton.href=m,openShippingLabelButton.style.display="block")):(howToShipNoQrDiv.style.display="block",dividerTop.style.display="none"):"Pickup"===y&&(howToShipPickupDiv.style.display="block",dividerTop.style.display="none")),pageTitleText.style.display="block",y&&"Sent"!==h?contentDiv.style.display="block":(y?"Sent"===h&&(errorMessage.innerHTML="Plagget har skickats!"):errorMessage.innerHTML="Plagget saknar fraktmetod!",errorMessageDiv.style.display="block"),loadingDiv.style.display="none"}else console.log("No such document!")}).catch(e=>{errorHandler.report(e),console.log("Error getting item document:",e)})},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}n.defineInteropFlag(r),n.export(r,"signOut",()=>o),n.export(r,"BACKEND_API_URL",()=>a),// Function to call web api backend function, with or without auth
n.export(r,"callBackendApi",()=>s),n.export(r,"setFormAddressFields",()=>l),n.export(r,"getFormAddressFields",()=>d),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
n.export(r,"isValidSwedishSsn",()=>c),n.export(r,"formatPersonalId",()=>u),n.export(r,"itemCoverImage",()=>m),n.export(r,"shareCode",()=>p);let a="https://europe-west1-second-hand-helper.cloudfunctions.net/webApi";async function s(e,{data:t,method:r,requiresAuth:n,timeoutSec:o=20}={}){// const { data, method, requiresAuth, timeoutSec = 20 } = opts;
let s=new AbortController,l=setTimeout(()=>s.abort(),1e3*o),d="",c=r||(t?"POST":"GET");(n||"GET"!==c)&&(d=await i());try{let r=await fetch(`${a}${e}`,{method:c,headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},...t?{body:JSON.stringify(t)}:{},signal:s.signal});if("0"===r.headers.get("content-length"))return{data:void 0};let n=await r.json();return{data:n}}catch(e){throw console.error(e),errorHandler.report(`Failure calling backend function ${JSON.stringify(e)}`),e}finally{clearTimeout(l)}}async function i(){let e=localStorage.getItem("idToken");if(!e){if(firebase.auth().currentUser){let e=await result.getIdToken();localStorage.setItem("idToken",e),authUser.current=firebase.auth().currentUser,localStorage.setItem("authUser",JSON.stringify(authUser.current))}else throw Error("User not authenticated")}return e}function l(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function d(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,s=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:n,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:s=s?s.trim():""}}function c(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function u(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function m(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function p(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||t.hasOwnProperty(r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["fSnW0"],"fSnW0","parcelRequire81ca")//# sourceMappingURL=shipItem.js.map
;
//# sourceMappingURL=shipItem.js.map
