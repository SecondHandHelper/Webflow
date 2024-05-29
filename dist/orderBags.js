!function(e,t,n,r,d){var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof o[r]&&o[r],l=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function i(t,n){if(!l[t]){if(!e[t]){var d="function"==typeof o[r]&&o[r];if(!n&&d)return d(t,!0);if(a)return a(t,!0);if(s&&"string"==typeof t)return s(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}c.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},c.cache={};var m=l[t]=new i.Module(t);e[t][0].call(m.exports,c,m,m.exports,this)}return l[t].exports;function c(e){var t=c.resolve(e);return!1===t?{}:i(t)}}i.isParcelRequire=!0,i.Module=function(e){this.id=e,this.bundle=i,this.exports={}},i.modules=e,i.cache=l,i.parent=a,i.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(i,"root",{get:function(){return o[r]}}),o[r]=i;for(var u=0;u<t.length;u++)i(t[u]);if(n){var m=i(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=m:"function"==typeof define&&define.amd?define(function(){return m}):d&&(this[d]=m)}}({aCqKZ:[function(e,t,n){var r=e("./general"),d=10;async function o(){let e=await callFirebaseFunction("europe-west1","maxNumBags");if(e?.data)return e.data?.errorCode==="unfulfilled-order"?(document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Du har nyligen lagt en beställning som är på väg till dig.\nVänta in påsarna innan du lägger fler beställningar.",0):e.data?.maxOrderBags===0?(document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Du kan bara beställa påsar om\ndu har pågående försäljningar.",0):d=Math.min(e.data.maxOrderBags,d)}function a(){return+document.getElementById("numSmall").value+ +document.getElementById("numMedium").value+ +document.getElementById("numLarge").value}function l(){document.getElementById("orderBags").innerText=`Best\xe4ll ${a()} ${s()} gratis`,document.getElementById("orderBagsError").style.display="none"}function s(){return 1===a()?"påse":"påsar"}function i(e){return e?.replace(/\s/g,"")?.length>0}async function u(){let{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressPostalCode:r,addressCity:d}=(await db.collection("users").doc(authUser.current.uid).get()).data();return[e,t,n,r,d].every(i)}function m(e,t,n){document.getElementById(e).addEventListener("click",function(){var e;(e=document.getElementById(n)).value=Math.max(+e.value-1,0),e.style.color=0==+e.value?"#c3c2c2":"#000",l()}),document.getElementById(t).addEventListener("click",function(){var e;e=document.getElementById(n),a()>=10||(e.value=Math.min(+e.value+1,10),l(),1!=+e.value||(e.style.color="black"))})}m("minusSmall","plusSmall","numSmall"),m("minusMedium","plusMedium","numMedium"),m("minusLarge","plusLarge","numLarge"),document.getElementById("userAddressForm").addEventListener("submit",async()=>{let e=(0,r.getFormAddressFields)(),t=db.collection("users").doc(authUser.current.uid);await t.update(e),document.getElementById("orderBagsConfirmation").style.display="block",document.getElementById("addressFormDiv").style.display="none"}),document.getElementById("orderBags").addEventListener("click",async function(){if(0===a()){document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Välj minst 1 påse";return}if(a()>10){document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Max 10 påsar per beställning";return}document.getElementById("orderBagsError").style.display="none",document.getElementById("orderBags").style.display="none",document.getElementById("orderBagsSpinner").style.display="flex";let e=await o();if(0===e){document.getElementById("orderBags").style.display="flex",document.getElementById("orderBagsSpinner").style.display="none";return}if(a()>e){document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText=`Inte fler \xe4n antalet p\xe5g\xe5ende f\xf6rs\xe4ljningar, dvs ${e}`,document.getElementById("orderBags").style.display="flex",document.getElementById("orderBagsSpinner").style.display="none";return}let t=+document.getElementById("numSmall").value,n=+document.getElementById("numMedium").value,d=+document.getElementById("numLarge").value;try{await callFirebaseFunction("europe-west1","orderSellerBags",{numLargeBags:d,numSmallBags:t,numMediumBags:n}),document.getElementById("bagsOrdered").innerText=`${a()} ${s()} p\xe5 v\xe4g!`}catch(e){errorHandler.report(e),document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Något gick fel vid beställningen. Försök igen och kontakta oss om det fortfarande inte fungerar.",document.getElementById("orderBags").style.display="flex",document.getElementById("orderBagsSpinner").style.display="none";return}if(document.getElementById("orderBagsForm").style.display="none",await u())document.getElementById("orderBagsConfirmation").style.display="block";else{let e=(await db.collection("users").doc(authUser.current.uid).get()).data();document.getElementById("addressFormDiv").style.display="block",(0,r.setFormAddressFields)(e)}}),document.getElementById("closeOrderBagsConfirmationButton").addEventListener("click",function(){document.getElementById("closeOrderBagsConfirmationButton").style.display="none",document.getElementById("closeOrderBagsSpinner").style.display="flex"})},{"./general":"1tOWF"}],"1tOWF":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function d(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function o(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function a(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,r=document.getElementById("addressCO").value,d=document.getElementById("addressPostalCode").value,o=document.getElementById("addressCity").value,a=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",r=r?r.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:r,addressPostalCode:d=d?d.trim().replace(/\D/g,""):"",addressCity:o=o?o.trim().charAt(0).toUpperCase()+o.trim().slice(1):"",addressDoorCode:a=a?a.trim():""}}function l(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t))%10}function s(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function i(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function u(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}r.defineInteropFlag(n),r.export(n,"signOut",()=>d),r.export(n,"setFormAddressFields",()=>o),r.export(n,"getFormAddressFields",()=>a),r.export(n,"isValidSwedishSsn",()=>l),r.export(n,"formatPersonalId",()=>s),r.export(n,"itemCoverImage",()=>i),r.export(n,"shareCode",()=>u)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["aCqKZ"],"aCqKZ","parcelRequire81ca");
//# sourceMappingURL=orderBags.js.map
