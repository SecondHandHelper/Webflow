!function(e,t,r,a,n){var d="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof d[a]&&d[a],s=o.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function i(t,r){if(!s[t]){if(!e[t]){var n="function"==typeof d[a]&&d[a];if(!r&&n)return n(t,!0);if(o)return o(t,!0);if(l&&"string"==typeof t)return l(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(r){var a=e[t][1][r];return null!=a?a:r},m.cache={};var u=s[t]=new i.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return s[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:i(t)}}i.isParcelRequire=!0,i.Module=function(e){this.id=e,this.bundle=i,this.exports={}},i.modules=e,i.cache=s,i.parent=o,i.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(i,"root",{get:function(){return d[a]}}),d[a]=i;for(var c=0;c<t.length;c++)i(t[c]);if(r){var u=i(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):n&&(this[n]=u)}}({fSnW0:[function(e,t,r){var a,n=e("./general");a=getParamsObject().id,console.log(`loadItem(${a})`),db.collection("items").doc(a).get().then(e=>{if(e.exists){console.log("Item data:",e.data());let t=(data=e.data()).brand,r=(0,n.itemCoverImage)(data),a=data.category?data.category:"",d=data.postnordQrCode,o=data.dhlLicensePlateBarcodeSrc,s=data.dhlLicensePlate,l=data.buyer?.FirstName||data.buyerFirstName||"",i=data.buyer?.LastName||data.buyerLastName||"";data.buyer?.StreetAddress||data.buyerAddressStreetAddress,data.buyer?.PostalCode||data.buyerAddressPostalCode;let c=data.buyer?.City||data.buyerAddressCity||"",u=data.shippingMethod,m=data.shippingStatus,p=data.soldPlatform;pageTitleText.innerHTML=`Skicka ${t.trim()}-${a.trim().toLowerCase()}`,buyerAddressDiv.innerHTML=`${l.trim()} ${i.trim()}<br>${c.trim()}`,itemImageDiv.style.backgroundImage=`url('${r}')`,u&&("Service point"===u?d&&!("Vestiaire Collective"===p||"Grailed"===p)?(qrCodeImage.style.backgroundImage=`url('${d}')`,postnordQrCodeDiv.style.display="flex",scanCodeDiv.style.display="block",howToShipQrDiv.style.display="block"):o&&"Vestiaire Collective"===p?(barcodeImageContainer.innerHTML=`<img src="${o}" alt="barcode" class="image-98">`,dhlBarcodeDiv.style.display="flex",s&&(dhlLicensePlateText.innerHTML=s,dhlLicensePlateText.style.display="block"),mainInstructionText.innerText="Lämna påsen till ett ombud och\nbe dem scanna streckkoden",findDhlServicePointLink.style.display="flex",scanCodeDiv.style.display="block",howToShipDhlBarcodeDiv.style.display="block"):(howToShipNoQrDiv.style.display="block",dividerTop.style.display="none"):"Pickup"===u&&(howToShipPickupDiv.style.display="block",dividerTop.style.display="none")),pageTitleText.style.display="block",u&&"Sent"!==m?contentDiv.style.display="block":(u?"Sent"===m&&(errorMessage.innerHTML="Plagget har skickats!"):errorMessage.innerHTML="Plagget saknar fraktmetod!",errorMessageDiv.style.display="block"),loadingDiv.style.display="none"}else console.log("No such document!")}).catch(e=>{errorHandler.report(e),console.log("Error getting item document:",e)})},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var a=e("@parcel/transformer-js/src/esmodule-helpers.js");function n(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,location.href="/",deleteCookie("maiAuth")}).catch(e=>{errorHandler.report(e),console.log(e)})}function d(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function o(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,a=document.getElementById("addressCO").value,n=document.getElementById("addressPostalCode").value,d=document.getElementById("addressCity").value,o=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",a=a?a.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:a,addressPostalCode:n=n?n.trim().replace(/\D/g,""):"",addressCity:d=d?d.trim().charAt(0).toUpperCase()+d.trim().slice(1):"",addressDoorCode:o=o?o.trim():""}}function s(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t))%10}function l(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function i(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function c(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai fixar allt s\xe5som v\xe4rdering, s\xe4ljer p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}a.defineInteropFlag(r),a.export(r,"signOut",()=>n),a.export(r,"setFormAddressFields",()=>d),a.export(r,"getFormAddressFields",()=>o),a.export(r,"isValidSwedishSsn",()=>s),a.export(r,"formatPersonalId",()=>l),a.export(r,"itemCoverImage",()=>i),a.export(r,"shareCode",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["fSnW0"],"fSnW0","parcelRequire81ca");
//# sourceMappingURL=shipItem.js.map
