!function(e,t,r,n,a){var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},d="function"==typeof o[n]&&o[n],i=d.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,r){if(!i[t]){if(!e[t]){var a="function"==typeof o[n]&&o[n];if(!r&&a)return a(t,!0);if(d)return d(t,!0);if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},m.cache={};var u=i[t]=new l.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return i[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=i,l.parent=d,l.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(l,"root",{get:function(){return o[n]}}),o[n]=l;for(var c=0;c<t.length;c++)l(t[c]);if(r){var u=l(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):a&&(this[a]=u)}}({ar62u:[function(e,t,r){var n=e("./general"),a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),o=window.location.origin;async function d(){try{let e=await firebase.app().functions("europe-west1").httpsCallable("fetchMaiShopRecentlyAddedItems")(),t=document.getElementById("ItemListRecentlyAddedItems");for(let r of(t.innerHTML="",e.data)){let e=`<div class="div-block-14-big"><a href="${r.url}"/><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${r.image}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${r.brand}</div>
                            <div class="recent-added-items-subheader-category">${r.category}</div>
                            <div class="recently-added-price">${r.currentPrice} kr</div>
                            <div class="recently-added-brands-link-text">Mai Shop</div>
                        </div><a/></div>`;t.innerHTML+=e}}catch(e){errorHandler.report(e),console.log("error",e)}}a||o.includes("shh-test.page")||(desktopDiv.style.display="block",mobileContainer.style.display="none"),authUser.whenSet(signedInNextStep),firebase.app().functions("europe-west1").httpsCallable("recentlySoldItems")().then(e=>{let t=document.getElementById("itemListRecentlySoldStartPage");for(let r of(t.innerHTML="",e.data)){let e=r.brand,a=r.soldPrice,o=new Date(r.soldDate),d=new Date(r.publishedDate);new Date(r.soldDate).toISOString().split("T")[0],new Date().toISOString().split("T")[0];let i=(0,n.itemCoverImage)(r),s=Math.floor((o.getTime()-d.getTime())/864e5);if(a>=180||s<=20){let r=`<div class="div-block-14-big"><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${i}');"></div></div></div>
                        <div class="text-block-14">${a} kr</div>
                        <div class='text-block-34'>${e}</div>`;t.innerHTML+=r}}}).catch(e=>{errorHandler.report(e);var t=e.code;console.log("Error message: ",e.message,t)}),d(),checkCookie("utm_campaign"),checkCookie("utm_source"),checkCookie("utm_medium"),checkCookie("utm_term"),checkCookie("utm_content");let i=checkCookie("invite");i&&(referralCodeText.innerHTML=i,activeCode.style.display="flex"),window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var r=document,n=function(){n.c(arguments)};n.q=[],n.c=function(e){n.q.push(e)},e.Intercom=n;var a=function(){var e=r.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=r.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}}()},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function a(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,location.href="/",deleteCookie("maiAuth")}).catch(e=>{errorHandler.report(e),console.log(e)})}function o(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function d(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,a=document.getElementById("addressPostalCode").value,o=document.getElementById("addressCity").value,d=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:n,addressPostalCode:a=a?a.trim().replace(/\D/g,""):"",addressCity:o=o?o.trim().charAt(0).toUpperCase()+o.trim().slice(1):"",addressDoorCode:d=d?d.trim():""}}function i(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t))%10}function s(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function l(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function c(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}n.defineInteropFlag(r),n.export(r,"signOut",()=>a),n.export(r,"setFormAddressFields",()=>o),n.export(r,"getFormAddressFields",()=>d),n.export(r,"isValidSwedishSsn",()=>i),n.export(r,"formatPersonalId",()=>s),n.export(r,"itemCoverImage",()=>l),n.export(r,"shareCode",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["ar62u"],"ar62u","parcelRequire81ca");
//# sourceMappingURL=home.js.map
