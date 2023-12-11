!function(e,t,n,s,r){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},d="function"==typeof a[s]&&a[s],i=d.cache||{},o="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,n){if(!i[t]){if(!e[t]){var r="function"==typeof a[s]&&a[s];if(!n&&r)return r(t,!0);if(d)return d(t,!0);if(o&&"string"==typeof t)return o(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}c.resolve=function(n){var s=e[t][1][n];return null!=s?s:n},c.cache={};var p=i[t]=new l.Module(t);e[t][0].call(p.exports,c,p,p.exports,this)}return i[t].exports;function c(e){var t=c.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=i,l.parent=d,l.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(l,"root",{get:function(){return a[s]}}),a[s]=l;for(var u=0;u<t.length;u++)l(t[u]);if(n){var p=l(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=p:"function"==typeof define&&define.amd?define(function(){return p}):r&&(this[r]=p)}}({"3jmDt":[function(e,t,n){let s;var r=e("./general");async function a(){try{g(),await firebase.app().functions("europe-west1").httpsCallable("updateFirebaseUser")({...(0,r.getFormAddressFields)()}),await m()}catch(e){errorHandler.report(e),console.log("Error updating user",e)}}async function d(){g();let e="",t=document.getElementsByName("shippingMethodSettings");for(let n=0;n<t.length;n++)t[n].checked&&(e=t[n].value);await firebase.app().functions("europe-west1").httpsCallable("updateFirebaseUser")({preferences:{shippingMethod:e}}),await m()}async function i(e){try{let t;g(),await firebase.app().functions("europe-west1").httpsCallable("updateFirebaseUser")({...(t=e?swishNumber.value.trim():phoneNumber.value.trim(),e?{swishPayeeAlias:formatPhoneNumber(t)}:{phoneNumber:formatPhoneNumber(t)})}),await m()}catch(e){errorHandler.report(e)}}async function o(){try{g(),await firebase.app().functions("europe-west1").httpsCallable("updateFirebaseUser")({personalId:(0,r.formatPersonalId)(personalId.value.trim().replace(/\D/g,""))}),await m()}catch(e){errorHandler.report(e),console.log("Error updating user",e)}}let l="",u=document.getElementById("pageTitleText");async function p(e){try{s=(await firebase.app().functions("europe-west1").httpsCallable("getUserInfo")()).data,await c(s.personalId),console.log("data",s);let e=s?.preferences?.shippingMethod||null;console.log("shippingMethod",e),addressDisplay.innerHTML=s.addressStreetAddress?`${s.addressFirstName} ${s.addressLastName}${s.addressCO?`, C/o ${s.addressCO}`:""}<br/>${s.addressStreetAddress}<br/>${s.addressPostalCode} ${s.addressCity}`:"-",console.log("address displayed"),swishNumberDisplay.innerHTML=s.swishPayeeAlias||"-",console.log("swish displayed"),phoneNumberDisplay.innerHTML=s.phoneNumber||"-",console.log("phoneNumberDisplay"),console.log("data.phoneNumber",s.phoneNumber),e?("Pickup"===e&&(shippingPreferencesDisplay.innerHTML="Upphämtning vid dörren"),"Service point"===e&&(shippingPreferencesDisplay.innerHTML="Lämna till ombud")):shippingPreferencesDisplay.innerHTML="-"}catch(e){errorHandler.report(e),console.log("error fetching user data",e)}finally{e||(loadingDiv.style.display="none",settingsContainer.style.display="block")}}async function c(e){let t="-";if((l=e||"").length>4){t=l.substring(l.length-4),personalIdDisplay.innerHTML=`XXXXXXXX${t}`;return}personalIdDisplay.innerHTML=t}async function m(){await p(!0),savedCheckIcon.style.display="flex",saveLoadingSpinner.style.display="none"}function g(){saveButton.style.display="none",saveLoadingSpinner.style.display="flex"}function f(e,t,n,s){document.getElementById(t).style.display="block",document.getElementById("updateContainer").style.display="block",document.getElementById("goBackDiv").style.display="none",document.getElementById("resetPageDiv").style.display="block",saveButton.style.display="block",saveButtonContainer.style.display="flex",settingsContainer.style.display="none",u.innerHTML=s,u.value=s,n&&(n===personalId?n.value=l:n.value=document.getElementById(e).innerHTML.length>2?document.getElementById(e).innerHTML:"",n.dispatchEvent(new Event("input"))),"shippingPrefForm"===t&&(document.getElementById(e).innerHTML.includes("ombud")&&(servicePointSettings.previousElementSibling.classList.add("w--redirected-checked"),servicePointSettings.checked=!0),document.getElementById(e).innerHTML.includes("Upphämtning")&&(pickupSettings.previousElementSibling.classList.add("w--redirected-checked"),pickupSettings.checked=!0))}function y(e){return!!e.validity.valid&&"Spara"===saveButton.innerHTML}function h(e,t){e.style.display=t?"inline-block":"none"}function v(){saveButton.style.display="flex",savedCheckIcon.style.display="none",saveLoadingSpinner.style.display="none"}adressDiv.addEventListener("click",async function(){await (0,r.setFormAddressFields)(s),f("adressDiv","addressForm",null,"Adress")}),addressFirstName.addEventListener("input",function(){h(firstNameLabel,addressFirstName.value),v()}),addressLastName.addEventListener("input",function(){h(lastNameLabel,addressLastName.value),v()}),addressStreetAddress.addEventListener("input",function(){h(streetAddressLabel,addressStreetAddress.value),v()}),addressCO.addEventListener("input",function(){h(addressCoLabel,addressCO.value),v()}),addressPostalCode.addEventListener("input",function(){h(postalCodeLabel,addressPostalCode.value),v()}),addressCity.addEventListener("input",function(){h(cityLabel,addressCity.value),v()}),addressDoorCode.addEventListener("input",function(){h(doorCodeLabel,addressDoorCode.value),v()}),phoneDiv.addEventListener("click",function(){f("phoneNumberDisplay","phoneForm",phoneNumber,"Mobilnummer")}),phoneNumber.addEventListener("input",function(){h(phoneNumberLabel,phoneNumber.value),v();let e=formatPhoneNumber(phoneNumber.value),t=e.length>=12&&e.includes("+")?"":"Ogiltigt mobilnummer";phoneNumber.setCustomValidity(t)}),shippingPrefDiv.addEventListener("click",function(){f("shippingPreferencesDisplay","shippingPrefForm",null,"Skicka plagg")}),swishDiv.addEventListener("click",function(){f("swishNumberDisplay","swishForm",swishNumber,"Swish")}),swishNumber.addEventListener("input",()=>{h(swishNumberLabel,swishNumber.value),v();let e=0!==swishNumber.length?"":"Ogiltigt swishnummer";swishNumber.setCustomValidity(e)}),personIdDiv.addEventListener("click",function(){f("fullPersonId","personIdForm",personalId,"Personnummer")}),personalId.addEventListener("input",()=>{h(personalIdLabel,personalId.value),v();let e=(0,r.isValidSwedishSsn)(personalId.value)?"":"Ogiltigt personnummer";personalId.setCustomValidity(e)}),saveButton.addEventListener("click",async function(){switch(u.value){case"Adress":(function(e){let t=!0;for(let n of e)n.validity.valid||(t=!1);return!!t&&"Spara"===saveButton.innerHTML})([addressFirstName,addressLastName,addressCity,addressPostalCode,addressStreetAddress])&&await a(),addressFirstName.reportValidity(),addressLastName.reportValidity(),addressCity.reportValidity(),addressPostalCode.reportValidity(),addressStreetAddress.reportValidity();break;case"Skicka plagg":await d();break;case"Personnummer":y(personalId)&&await o(),personalId.reportValidity();break;case"Swish":y(swishNumber)&&await i(!0),swishNumber.reportValidity();break;case"Mobilnummer":y(phoneNumber)&&await i(),phoneNumber.reportValidity()}}),resetPageButton.addEventListener("click",()=>{document.getElementById({Adress:"addressForm",Mobilnummer:"phoneForm",Swish:"swishForm",Personnummer:"personIdForm","Skicka plagg":"shippingPrefForm"}[u.value]).style.display="none",document.getElementById("updateContainer").style.display="none",document.getElementById("goBackDiv").style.display="block",document.getElementById("resetPageDiv").style.display="none",settingsContainer.style.display="block",saveButton.style.display="none",saveLoadingSpinner.style.display="none",savedCheckIcon.style.display="none",u.innerHTML="Inställningar",u.value="Inställningar"}),p()},{"./general":"1tOWF"}],"1tOWF":[function(e,t,n){var s=e("@parcel/transformer-js/src/esmodule-helpers.js");function r(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,location.href="/",deleteCookie("maiAuth")}).catch(e=>{errorHandler.report(e),console.log(e)})}function a(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function d(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,s=document.getElementById("addressCO").value,r=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,d=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",s=s?s.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:s,addressPostalCode:r=r?r.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:d=d?d.trim():""}}function i(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t))%10}function o(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function l(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function u(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}s.defineInteropFlag(n),s.export(n,"signOut",()=>r),s.export(n,"setFormAddressFields",()=>a),s.export(n,"getFormAddressFields",()=>d),s.export(n,"isValidSwedishSsn",()=>i),s.export(n,"formatPersonalId",()=>o),s.export(n,"itemCoverImage",()=>l),s.export(n,"shareCode",()=>u)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["3jmDt"],"3jmDt","parcelRequire81ca");
//# sourceMappingURL=settings.js.map
