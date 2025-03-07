!function(e,t,r,n,o){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof a[n]&&a[n],d=s.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function i(t,r){if(!d[t]){if(!e[t]){var o="function"==typeof a[n]&&a[n];if(!r&&o)return o(t,!0);if(s)return s(t,!0);if(l&&"string"==typeof t)return l(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}m.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},m.cache={};var c=d[t]=new i.Module(t);e[t][0].call(c.exports,m,c,c.exports,this)}return d[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:i(t)}}i.isParcelRequire=!0,i.Module=function(e){this.id=e,this.bundle=i,this.exports={}},i.modules=e,i.cache=d,i.parent=s,i.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(i,"root",{get:function(){return a[n]}}),a[n]=i;for(var u=0;u<t.length;u++)i(t[u]);if(r){var c=i(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):o&&(this[o]=c)}}({jCv41:[function(e,t,r){var n,o,a=e("./general");async function s(){let e=11;for(var t=document.getElementsByName("nps"),r=0;r<t.length;r++)t[r].checked&&(o=e=parseInt(t[r].value));if(!(e>=0&&e<=10)){npsErrorMessage.style.display="block";return}if(!authUser.current){npsErrorMessage.innerHTML="Du måste vara inloggad för att svara",npsErrorMessage.style.display="block";return}n=(await db.collection("nps").add({score:e,answeredAt:new Date,user:authUser.current.uid})).id,console.log(`Score '${e}' stored in DB with npsId: `,n),e>=0&&e<=6&&(followUpQuestion.innerHTML="Tack för feedbacken! Vilka förändringar skulle Mai behöva göra för att få ett högre betyg?"),e>=7&&e<=8&&(followUpQuestion.innerHTML="Tack för feedbacken! Vilka förändringar skulle göra Mai bättre?"),e>=9&&e<=10&&(followUpQuestion.innerHTML="Kul att du gillar det! Vad är Mai riktigt bra på?"),triggerShowFollowUpQuestion.click()}async function d(){let e=followUpQuestion.innerHTML,t=followUpAnswer.value;t&&await db.collection("nps").doc(n).update({followUpQuestion:e,followUpAnswer:t})}user.whenSet(async()=>{getParamsObject().app||(db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"npsSurvey",timestamp:new Date})}),analytics.track("Element Viewed",{elementID:"npsSurvey"}))}),npsSubmitButton.addEventListener("click",s),followUpSubmitButton.addEventListener("click",async function(){await d(),user.current?.referralData?.referralCode&&o>=9&&o<=10&&(referralCodeText.innerHTML=user.current.referralData.referralCode,thankYouNoPromotorDiv.style.display="none",thankYouPromotorDiv.style.display="block",analytics.track("Element Viewed",{elementID:"thankYouPromotorDiv"})),triggerShowThankYou.click()}),closeThankYouButton.addEventListener("click",function(){authUser.current?location.href="/private":location.href="/"}),sharePersonalLinkFromNpsButton.addEventListener("click",a.shareCode)},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function a(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function s(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,s=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:n,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:s=s?s.trim():""}}function d(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t))%10}function l(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function i(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function u(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}function c(e){/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream?(document.getElementById("continueOnWebBottomSheet").href=window.location.origin+e,document.getElementById("darkOverlay").classList.add("active"),document.getElementById("channelBottomSheet").classList.add("active")):window.location.href=e}function m(){document.getElementById("darkOverlay").classList.remove("active"),document.getElementById("channelBottomSheet").classList.remove("active")}n.defineInteropFlag(r),n.export(r,"signOut",()=>o),n.export(r,"setFormAddressFields",()=>a),n.export(r,"getFormAddressFields",()=>s),n.export(r,"isValidSwedishSsn",()=>d),n.export(r,"formatPersonalId",()=>l),n.export(r,"itemCoverImage",()=>i),n.export(r,"shareCode",()=>u),n.export(r,"channelRouter",()=>c),n.export(r,"hideChannelBottomSheet",()=>m)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["jCv41"],"jCv41","parcelRequire81ca");
//# sourceMappingURL=feedbackNps.js.map
