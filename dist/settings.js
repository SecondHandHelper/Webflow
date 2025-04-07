!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,s,r){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},d="function"==typeof a[s]&&a[s],i=d.cache||{},o="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,n){if(!i[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var r="function"==typeof a[s]&&a[s];if(!n&&r)return r(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(d)return d(t,!0);// Try the node require function if it exists.
if(o&&"string"==typeof t)return o(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}m.resolve=function(n){var s=e[t][1][n];return null!=s?s:n},m.cache={};var c=i[t]=new l.Module(t);e[t][0].call(c.exports,m,c,c.exports,this)}return i[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=i,l.parent=d,l.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(l,"root",{get:function(){return a[s]}}),a[s]=l;for(var u=0;u<t.length;u++)l(t[u]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var c=l(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):r&&(this[r]=c)}}({"3jmDt":[function(e,t,n){let s;var r=e("./general");async function a(){try{g(),await callBackendApi("/api/users",{data:{data:(0,r.getFormAddressFields)()},method:"PUT"}),await p()}catch(e){errorHandler.report(e),console.log("Error updating user",e)}}async function d(){g();let e="",t=document.getElementsByName("shippingMethodSettings");for(let n=0;n<t.length;n++)t[n].checked&&(e=t[n].value);// "Service point" or "Pickup"
await callBackendApi("/api/users",{data:{data:{preferences:{shippingMethod:e}}},method:"PUT"}),await p()}async function i(e){try{let t;g(),await callBackendApi("/api/users",{data:{data:(t=e?swishNumber.value.trim():phoneNumber.value.trim(),e?{swishPayeeAlias:formatPhoneNumber(t)}:{phoneNumber:formatPhoneNumber(t)})},method:"PUT"}),await p()}catch(e){errorHandler.report(e)}}async function o(){try{g(),await callBackendApi("/api/users",{data:{data:{personalId:(0,r.formatPersonalId)(personalId.value.trim().replace(/\D/g,""))}},method:"PUT"}),await p()}catch(e){errorHandler.report(e),console.log("Error updating user",e)}}let l="",u=document.getElementById("pageTitleText");async function c(e){try{let e=await callBackendApi("/api/users",{requiresAuth:!0});s=e.data,await m(s.personalId),console.log("data",s);let t=s?.preferences?.shippingMethod||null;console.log("shippingMethod",t),addressDisplay.innerHTML=s.addressStreetAddress?`${s.addressFirstName} ${s.addressLastName}${s.addressCO?`, C/o ${s.addressCO}`:""}<br/>${s.addressStreetAddress}<br/>${s.addressPostalCode} ${s.addressCity}`:"-",console.log("address displayed"),swishNumberDisplay.innerHTML=s.swishPayeeAlias||"-",console.log("swish displayed"),phoneNumberDisplay.innerHTML=s.phoneNumber||"-",console.log("phoneNumberDisplay"),console.log("data.phoneNumber",s.phoneNumber),t?("Pickup"===t&&(shippingPreferencesDisplay.innerHTML="Upph\xe4mtning vid d\xf6rren"),"Service point"===t&&(shippingPreferencesDisplay.innerHTML="L\xe4mna till ombud",// Hide expand button since we don't allow users to change to Pickup anymore
expandShippingPrefButton.style.display="none")):shippingPreferencesDisplay.innerHTML="-"}catch(e){errorHandler.report(e),console.log("error fetching user data",e)}finally{e||(loadingDiv.style.display="none",settingsContainer.style.display="block")}}async function m(e){let t="-";if((l=e||"").length>4){t=l.substring(l.length-4),personalIdDisplay.innerHTML=`XXXXXXXX${t}`;return}personalIdDisplay.innerHTML=t}async function p(){await c(!0),savedCheckIcon.style.display="flex",saveLoadingSpinner.style.display="none"}function g(){saveButton.style.display="none",saveLoadingSpinner.style.display="flex"}function f(e,t,n,s){document.getElementById(t).style.display="block",document.getElementById("updateContainer").style.display="block",document.getElementById("goBackDiv").style.display="none",document.getElementById("resetPageDiv").style.display="block",saveButton.style.display="block",saveButtonContainer.style.display="flex",settingsContainer.style.display="none",u.innerHTML=s,u.value=s,n&&(n===personalId?n.value=l:n.value=document.getElementById(e).innerHTML.length>2?document.getElementById(e).innerHTML:"",n.dispatchEvent(new Event("input"))),"shippingPrefForm"===t&&(document.getElementById(e).innerHTML.includes("ombud")&&(servicePointSettings.previousElementSibling.classList.add("w--redirected-checked"),servicePointSettings.checked=!0),document.getElementById(e).innerHTML.includes("Upph\xe4mtning")&&(pickupSettings.previousElementSibling.classList.add("w--redirected-checked"),pickupSettings.checked=!0))}function y(e){return!!e.validity.valid&&"Spara"===saveButton.innerHTML}function h(e,t){e.style.display=t?"inline-block":"none"}function v(){saveButton.style.display="flex",savedCheckIcon.style.display="none",saveLoadingSpinner.style.display="none"}//Address
adressDiv.addEventListener("click",async function(){await (0,r.setFormAddressFields)(s),f("adressDiv","addressForm",null,"Adress")}),addressFirstName.addEventListener("input",function(){h(firstNameLabel,addressFirstName.value),v()}),addressLastName.addEventListener("input",function(){h(lastNameLabel,addressLastName.value),v()}),addressStreetAddress.addEventListener("input",function(){h(streetAddressLabel,addressStreetAddress.value),v()}),addressCO.addEventListener("input",function(){h(addressCoLabel,addressCO.value),v()}),addressPostalCode.addEventListener("input",function(){h(postalCodeLabel,addressPostalCode.value),v()}),addressCity.addEventListener("input",function(){h(cityLabel,addressCity.value),v()}),addressDoorCode.addEventListener("input",function(){h(doorCodeLabel,addressDoorCode.value),v()}),//Phone
phoneDiv.addEventListener("click",function(){f("phoneNumberDisplay","phoneForm",phoneNumber,"Mobilnummer")}),phoneNumber.addEventListener("input",function(){h(phoneNumberLabel,phoneNumber.value),v();let e=formatPhoneNumber(phoneNumber.value),t=e.length>=12&&e.includes("+")?"":"Ogiltigt mobilnummer";phoneNumber.setCustomValidity(t)}),//Shipping
shippingPrefDiv.addEventListener("click",function(){shippingPreferencesDisplay.innerHTML.includes("ombud")?(shippingPrefInfoText.style.display="block",setTimeout(function(){shippingPrefInfoText.style.display="none"},3e3)):f("shippingPreferencesDisplay","shippingPrefForm",null,"Skicka plagg")}),//Swish
swishDiv.addEventListener("click",function(){f("swishNumberDisplay","swishForm",swishNumber,"Swish")}),swishNumber.addEventListener("input",()=>{h(swishNumberLabel,swishNumber.value),v();let e=0!==swishNumber.length?"":"Ogiltigt swishnummer";swishNumber.setCustomValidity(e)}),personIdDiv.addEventListener("click",function(){f("fullPersonId","personIdForm",personalId,"Personnummer")}),personalId.addEventListener("input",()=>{h(personalIdLabel,personalId.value),v();let e=(0,r.isValidSwedishSsn)(personalId.value)?"":"Ogiltigt personnummer";personalId.setCustomValidity(e)}),saveButton.addEventListener("click",async function(){switch(u.value){case"Adress":(function(e){let t=!0;for(let n of e)n.validity.valid||(t=!1);return!!t&&"Spara"===saveButton.innerHTML})([addressFirstName,addressLastName,addressCity,addressPostalCode,addressStreetAddress])&&await a(),addressFirstName.reportValidity(),addressLastName.reportValidity(),addressCity.reportValidity(),addressPostalCode.reportValidity(),addressStreetAddress.reportValidity();break;case"Skicka plagg":await d();break;case"Personnummer":y(personalId)&&await o(),personalId.reportValidity();break;case"Swish":y(swishNumber)&&await i(!0),swishNumber.reportValidity();break;case"Mobilnummer":y(phoneNumber)&&await i(),phoneNumber.reportValidity()}}),resetPageButton.addEventListener("click",()=>{document.getElementById({Adress:"addressForm",Mobilnummer:"phoneForm",Swish:"swishForm",Personnummer:"personIdForm","Skicka plagg":"shippingPrefForm"}[u.value]).style.display="none",document.getElementById("updateContainer").style.display="none",document.getElementById("goBackDiv").style.display="block",document.getElementById("resetPageDiv").style.display="none",settingsContainer.style.display="block",saveButton.style.display="none",saveLoadingSpinner.style.display="none",savedCheckIcon.style.display="none",u.innerHTML="Inst\xe4llningar",u.value="Inst\xe4llningar"}),c()},{"./general":"1tOWF"}],"1tOWF":[function(e,t,n){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");function r(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function a(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function d(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,s=document.getElementById("addressCO").value,r=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,d=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",s=s?s.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:s,addressPostalCode:r=r?r.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:d=d?d.trim():""}}function i(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function o(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function l(e){if(e.images){let t=e.images;return t.modelImageSmall||t.modelImage||t.coverImageSmall||t.coverImage||t.enhancedFrontImageSmall||t.enhancedFrontImage||t.frontImageSmall||t.frontImage}if(e.imagesv2)for(let t of["modelImage","enhancedFrontImage","frontImage"]){let n=e.imagesv2.find(e=>e.name===t);if(n){if(n.versions.small)return n.versions.small;if(n.versions.medium)return n.versions.medium;if(n.versions.large)return n.versions.large;if(n.url)return n.url}}return null}function u(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}function c(e){let t=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;t?(document.getElementById("continueOnWebBottomSheet").href=window.location.origin+e,document.getElementById("darkOverlay").classList.add("active"),document.getElementById("channelBottomSheet").classList.add("active")):window.location.href=e}function m(){document.getElementById("darkOverlay").classList.remove("active"),document.getElementById("channelBottomSheet").classList.remove("active")}s.defineInteropFlag(n),s.export(n,"signOut",()=>r),s.export(n,"setFormAddressFields",()=>a),s.export(n,"getFormAddressFields",()=>d),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
s.export(n,"isValidSwedishSsn",()=>i),s.export(n,"formatPersonalId",()=>o),s.export(n,"itemCoverImage",()=>l),s.export(n,"shareCode",()=>u),// Channel bottom sheet
s.export(n,"channelRouter",()=>c),s.export(n,"hideChannelBottomSheet",()=>m)// End of channel bottom sheet
},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||t.hasOwnProperty(n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["3jmDt"],"3jmDt","parcelRequire81ca")//# sourceMappingURL=settings.js.map
;
//# sourceMappingURL=settings.js.map
