!function(e,t,n,r,o){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},d="function"==typeof a[r]&&a[r],s=d.cache||{},i="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,n){if(!s[t]){if(!e[t]){var o="function"==typeof a[r]&&a[r];if(!n&&o)return o(t,!0);if(d)return d(t,!0);if(i&&"string"==typeof t)return i(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}c.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},c.cache={};var m=s[t]=new l.Module(t);e[t][0].call(m.exports,c,m,m.exports,this)}return s[t].exports;function c(e){var t=c.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=s,l.parent=d,l.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(l,"root",{get:function(){return a[r]}}),a[r]=l;for(var u=0;u<t.length;u++)l(t[u]);if(n){var m=l(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=m:"function"==typeof define&&define.amd?define(function(){return m}):o&&(this[o]=m)}}({"3PxFl":[function(e,t,n){var r=e("./general"),o=e("./cookieManagement");async function a(){localStorage.setItem("photoShootBooked",!0);let e=(0,r.getFormAddressFields)();document.getElementById("amount").value;let t=formatPhoneNumber(phoneNumber.value);await db.collection("users").doc(authUser.current.uid).update({...e,phoneNumber:t}).then(()=>{console.log(`Address and phone of ${authUser.current.uid} is now updated`),confirmationScreen.style.display="block",header.style.display="none",formDiv.style.display="none",(0,o.deleteCookie)("photo_invite")}).catch(e=>{errorHandler.report(e),console.error("Error updating document: ",e)})}photoShootInviteCode.value=checkCookie("photo_invite"),photoShootForm.addEventListener("submit",a),phoneNumber.addEventListener("input",function(){let e=formatPhoneNumber(phoneNumber.value),t=e.length>=12&&e.includes("+")?"":"Ogiltigt mobilnummer";phoneNumber.setCustomValidity(t)})},{"./general":"1tOWF","./cookieManagement":"jGPIs"}],"1tOWF":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function a(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function d(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,r=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,d=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",r=r?r.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:r,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:d=d?d.trim():""}}function s(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t))%10}function i(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function l(e){if(e.images){let t=e.images;return t.modelImageSmall||t.modelImage||t.coverImageSmall||t.coverImage||t.enhancedFrontImageSmall||t.enhancedFrontImage||t.frontImageSmall||t.frontImage}if(e.imagesv2)for(let t of["modelImage","enhancedFrontImage","frontImage"]){let n=e.imagesv2.find(e=>e.name===t);if(n){if(n.versions.small)return n.versions.small;if(n.versions.medium)return n.versions.medium;if(n.versions.large)return n.versions.large;if(n.url)return n.url}}return null}function u(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}function m(e){/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream?(document.getElementById("continueOnWebBottomSheet").href=window.location.origin+e,document.getElementById("darkOverlay").classList.add("active"),document.getElementById("channelBottomSheet").classList.add("active")):window.location.href=e}function c(){document.getElementById("darkOverlay").classList.remove("active"),document.getElementById("channelBottomSheet").classList.remove("active")}r.defineInteropFlag(n),r.export(n,"signOut",()=>o),r.export(n,"setFormAddressFields",()=>a),r.export(n,"getFormAddressFields",()=>d),r.export(n,"isValidSwedishSsn",()=>s),r.export(n,"formatPersonalId",()=>i),r.export(n,"itemCoverImage",()=>l),r.export(n,"shareCode",()=>u),r.export(n,"channelRouter",()=>m),r.export(n,"hideChannelBottomSheet",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}],jGPIs:[function(e,t,n){},{}]},["3PxFl"],"3PxFl","parcelRequire81ca");
//# sourceMappingURL=bookPhotoShoot.js.map
