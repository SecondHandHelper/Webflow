!function(e,t,r,n,o){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof s[n]&&s[n],d=a.cache||{},i="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,r){if(!d[t]){if(!e[t]){var o="function"==typeof s[n]&&s[n];if(!r&&o)return o(t,!0);if(a)return a(t,!0);if(i&&"string"==typeof t)return i(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},m.cache={};var u=d[t]=new l.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return d[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=d,l.parent=a,l.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(l,"root",{get:function(){return s[n]}}),s[n]=l;for(var c=0;c<t.length;c++)l(t[c]);if(r){var u=l(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):o&&(this[o]=u)}}({fSnW0:[function(e,t,r){var n,o=e("./general");n=getParamsObject().id,console.log(`loadItem(${n})`),db.collection("items").doc(n).get().then(e=>{if(e.exists){console.log("Item data:",e.data());let t=e.data(),r=t.brand,n=(0,o.itemCoverImage)(t),s=t.category?t.category:"",a=t.postnordQrCode,d=t.postnordQrCodePage,i=t.dhlLicensePlateBarcodeSrc,l=t.dhlLicensePlate,c=t.upsShipmentId,u=t.buyer?.FirstName||t.buyerFirstName||"",m=t.buyer?.LastName||t.buyerLastName||"";t.buyer?.StreetAddress||t.buyerAddressStreetAddress,t.buyer?.PostalCode||t.buyerAddressPostalCode;let p=t.buyer?.City||t.buyerAddressCity||"",g=t.shippingMethod,f=t.shippingStatus,y=t.soldPlatform;pageTitleText.innerHTML=`Skicka ${r.trim()}-${s.trim().toLowerCase()}`,buyerAddressDiv.innerHTML=`${u.trim()} ${m.trim()}<br>${p.trim()}`,itemImageDiv.style.backgroundImage=`url('${n}')`,g&&("Service point"===g?a&&!("Vestiaire Collective"===y||"Grailed"===y)?(qrCodeImage.style.backgroundImage=`url('${a}')`,postnordQrCodeDiv.href=d,postnordQrCodeDiv.style.display="flex",mainInstructionDiv.style.display="block",howToShipQrDiv.style.display="block"):i&&"Vestiaire Collective"===y?(barcodeImageContainer.innerHTML=`<img src="${i}" alt="barcode" class="image-98">`,dhlBarcodeDiv.style.display="flex",l&&(dhlLicensePlateText.innerHTML=l,dhlLicensePlateText.style.display="block"),mainInstructionText.innerText="Lämna påsen till ett ombud och\nbe dem scanna streckkoden",findDhlServicePointLink.style.display="flex",mainInstructionDiv.style.display="block",howToShipDhlBarcodeDiv.style.display="block"):c&&"Vestiaire Collective"===y?(upsIconDiv.style.display="block",findUpsServicePointLink.style.display="flex",mainInstructionText.innerText="Sätt på fraktsedeln vi skickat dig på påsen och lämna till ombud",bullet3TitleNoQr.innerText="Lämna till UPS-ombud",howToShipNoQrDiv.style.display="block",mainInstructionDiv.style.display="block"):(howToShipNoQrDiv.style.display="block",dividerTop.style.display="none"):"Pickup"===g&&(howToShipPickupDiv.style.display="block",dividerTop.style.display="none")),pageTitleText.style.display="block",g&&"Sent"!==f?contentDiv.style.display="block":(g?"Sent"===f&&(errorMessage.innerHTML="Plagget har skickats!"):errorMessage.innerHTML="Plagget saknar fraktmetod!",errorMessageDiv.style.display="block"),loadingDiv.style.display="none"}else console.log("No such document!")}).catch(e=>{errorHandler.report(e),console.log("Error getting item document:",e)})},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function s(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function a(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,s=document.getElementById("addressCity").value,a=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:n,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:s=s?s.trim().charAt(0).toUpperCase()+s.trim().slice(1):"",addressDoorCode:a=a?a.trim():""}}function d(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t))%10}function i(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function l(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function c(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}n.defineInteropFlag(r),n.export(r,"signOut",()=>o),n.export(r,"setFormAddressFields",()=>s),n.export(r,"getFormAddressFields",()=>a),n.export(r,"isValidSwedishSsn",()=>d),n.export(r,"formatPersonalId",()=>i),n.export(r,"itemCoverImage",()=>l),n.export(r,"shareCode",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["fSnW0"],"fSnW0","parcelRequire81ca");
//# sourceMappingURL=shipItem.js.map
