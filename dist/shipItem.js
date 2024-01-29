!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,r,n,a){/* eslint-disable no-undef */var d="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof d[n]&&d[n],s=o.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function i(t,r){if(!s[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var a="function"==typeof d[n]&&d[n];if(!r&&a)return a(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(o)return o(t,!0);// Try the node require function if it exists.
if(l&&"string"==typeof t)return l(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}m.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},m.cache={};var c=s[t]=new i.Module(t);e[t][0].call(c.exports,m,c,c.exports,this)}return s[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:i(t)}}i.isParcelRequire=!0,i.Module=function(e){this.id=e,this.bundle=i,this.exports={}},i.modules=e,i.cache=s,i.parent=o,i.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(i,"root",{get:function(){return d[n]}}),d[n]=i;for(var u=0;u<t.length;u++)i(t[u]);if(r){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var c=i(r);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):a&&(this[a]=c)}}({fSnW0:[function(e,t,r){var n,a=e("./general");// Load item
let d=getParamsObject();n=d.id,console.log(`loadItem(${n})`),db.collection("items").doc(n).get().then(e=>{if(e.exists){console.log("Item data:",e.data()),data=e.data();let t=data.brand,r=(0,a.itemCoverImage)(data),n=data.category?data.category:"",d=data.postnordQrCode,o=data.dhlLicensePlateBarcodeSrc,s=data.dhlLicensePlate,l=data.buyer?.FirstName||data.buyerFirstName||"",i=data.buyer?.LastName||data.buyerLastName||"";data.buyer?.StreetAddress||data.buyerAddressStreetAddress,data.buyer?.PostalCode||data.buyerAddressPostalCode;let u=data.buyer?.City||data.buyerAddressCity||"",c=data.shippingMethod,m=data.shippingStatus,p=data.soldPlatform;pageTitleText.innerHTML=`Skicka ${t.trim()}-${n.trim().toLowerCase()}`,buyerAddressDiv.innerHTML=`${l.trim()} ${i.trim()}<br>${u.trim()}`,itemImageDiv.style.backgroundImage=`url('${r}')`,c&&("Service point"===c?d&&!("Vestiaire Collective"===p||"Grailed"===p)?(qrCodeImage.style.backgroundImage=`url('${d}')`,postnordQrCodeDiv.style.display="flex",scanCodeDiv.style.display="block",howToShipQrDiv.style.display="block"):o&&"Vestiaire Collective"===p?(barcodeImageContainer.innerHTML=`<img src="${o}" alt="barcode" class="image-98">`,dhlBarcodeDiv.style.display="flex",s&&(dhlLicensePlateText.innerHTML=s,dhlLicensePlateText.style.display="block"),mainInstructionText.innerText="L\xe4mna p\xe5sen till ett ombud och\nbe dem scanna streckkoden",findDhlServicePointLink.style.display="flex",scanCodeDiv.style.display="block",howToShipDhlBarcodeDiv.style.display="block"):(howToShipNoQrDiv.style.display="block",dividerTop.style.display="none"):"Pickup"===c&&(howToShipPickupDiv.style.display="block",dividerTop.style.display="none")),pageTitleText.style.display="block",c&&"Sent"!==m?contentDiv.style.display="block":(c?"Sent"===m&&(errorMessage.innerHTML="Plagget har skickats!"):errorMessage.innerHTML="Plagget saknar fraktmetod!",errorMessageDiv.style.display="block"),loadingDiv.style.display="none"}else console.log("No such document!")}).catch(e=>{errorHandler.report(e),console.log("Error getting item document:",e)})},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function a(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,location.href="/",deleteCookie("maiAuth"),sessionStorage.removeItem("sessionUser")}).catch(e=>{errorHandler.report(e),console.log(e)})}function d(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function o(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,a=document.getElementById("addressPostalCode").value,d=document.getElementById("addressCity").value,o=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:n,addressPostalCode:a=a?a.trim().replace(/\D/g,""):"",addressCity:d=d?d.trim().charAt(0).toUpperCase()+d.trim().slice(1):"",addressDoorCode:o=o?o.trim():""}}function s(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function l(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function i(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function u(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}n.defineInteropFlag(r),n.export(r,"signOut",()=>a),n.export(r,"setFormAddressFields",()=>d),n.export(r,"getFormAddressFields",()=>o),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
n.export(r,"isValidSwedishSsn",()=>s),n.export(r,"formatPersonalId",()=>l),n.export(r,"itemCoverImage",()=>i),n.export(r,"shareCode",()=>u)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||t.hasOwnProperty(r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["fSnW0"],"fSnW0","parcelRequire81ca")//# sourceMappingURL=shipItem.js.map
;
//# sourceMappingURL=shipItem.js.map
