!function(e,t,n,r,o){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof a[r]&&a[r],d=i.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,n){if(!d[t]){if(!e[t]){var o="function"==typeof a[r]&&a[r];if(!n&&o)return o(t,!0);if(i)return i(t,!0);if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}u.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},u.cache={};var m=d[t]=new l.Module(t);e[t][0].call(m.exports,u,m,m.exports,this)}return d[t].exports;function u(e){var t=u.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=d,l.parent=i,l.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(l,"root",{get:function(){return a[r]}}),a[r]=l;for(var c=0;c<t.length;c++)l(t[c]);if(n){var m=l(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=m:"function"==typeof define&&define.amd?define(function(){return m}):o&&(this[o]=m)}}({ar62u:[function(e,t,n){var r=e("./general");async function o(){try{let e=await callBackendApi("/api/shopify/recentlyAddedItems"),t=document.getElementById("ItemListRecentlyAddedItems"),n=document.getElementById("ItemListRecentlyAddedItemsDesktop");for(let r of(t.innerHTML="",n.innerHTML="",e.data)){let e=`<div class="div-block-14-big"><a href="${r.url}"/><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${r.image}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${r.brand}</div>
                            <div class="recent-added-items-subheader-category">${r.category}</div>
                            <div class="recently-added-price">${r.currentPrice} kr</div>
                            <div class="recently-added-brands-link-text">Mai Shop</div>
                        </div><a/></div>`;t.innerHTML+=e;let o=e.replace("14-big","14-big-desktop");n.innerHTML+=o}}catch(e){errorHandler.report(e),console.log("error",e)}}document.getElementById("sellItemCtaButton").addEventListener("click",function(){/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream?(console.log("iOS device - showing bottom sheet"),document.getElementById("channelBottomSheet").classList.toggle("active")):(console.log("Non-iOS device - redirecting to sell page"),window.location.href="/sell-item")}),document.getElementById("closeChannelBottomSheet").addEventListener("click",function(){console.log("clicking close channelpicker"),document.getElementById("channelBottomSheet").classList.remove("active")}),authUser.whenSet(signedInNextStep),callBackendApi("/api/items/recentlySold").then(e=>{let t=document.getElementById("itemListRecentlySoldStartPage");for(let n of(t.innerHTML="",itemListRecentlySoldStartPageDesktop.innerHTML="",e.data)){let e=n.brand,o=n.soldPrice,a=new Date(n.soldDate),i=new Date(n.publishedDate);new Date(n.soldDate).toISOString().split("T")[0],new Date().toISOString().split("T")[0];let d=(0,r.itemCoverImage)(n),s=Math.floor((a.getTime()-i.getTime())/864e5);if(o>=180||s<=20){let n=`<div class="div-block-14-big"><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${d}');"></div></div></div>
                        <div class="text-block-14">${o} kr</div>
                        <div class='text-block-34'>${e}</div>`;t.innerHTML+=n;let r=n.replace("14-big","14-big-desktop");itemListRecentlySoldStartPageDesktop.innerHTML+=r}}}).catch(e=>{errorHandler.report(e);var t=e.code;console.log("Error message: ",e.message,t)}),o(),(()=>{let e=document.getElementById("howItWorksDiv");new IntersectionObserver((e,t)=>{e[0].isIntersecting&&(analytics.track("Element Viewed",{elementID:"howItWorksSlide1"}),t.disconnect())},{rootMargin:"0px 0px -600px 0px"}).observe(e),new MutationObserver(e=>{let t=e.find(e=>"attributes"===e.type&&"aria-hidden"===e.attributeName);t&&t.oldValue&&!t.target["aria-hidden"]&&analytics.track("Element Viewed",{elementID:`howItWorksSlide${t.target.ariaLabel.slice(0,1)}`})}).observe(e,{attributeFilter:["aria-hidden"],attributeOldValue:!0,subtree:!0})})(),function(){let e="noCommissionCampaignCookie";getCookie(e);let t=new Intl.DateTimeFormat("se-SV").format(new Date);t>="2024-08-12"&&t<="2024-08-18"&&(function(){let e=document.getElementById("noCommissionCampaign");analytics.track("Element Viewed",{elementID:"noCommissionCampaign"}),e.style.display="block",document.getElementById("noCommissionAd").style.display="block",document.getElementById("sellItemCtaButton").getBoundingClientRect().y<-47&&(e.style.top="0px"),new IntersectionObserver((t,n)=>{e.style.top=document.getElementById("sellItemCtaButton").getBoundingClientRect().y>-47?"-80px":"0px"},{rootMargin:"0px 0px -100%",root:null}).observe(document.getElementById("ctaSection")),new IntersectionObserver((e,t)=>{e[0].isIntersecting&&(analytics.track("Element Viewed",{elementID:"noCommissionCampaignAd"}),t.disconnect())},{rootMargin:"0px 0px -370px 0px"}).observe(document.getElementById("noCommissionAd"))}(),setCookie(e,"noCommission",7))}(),checkCookie("utm_campaign"),checkCookie("utm_source"),checkCookie("utm_medium"),checkCookie("utm_term"),checkCookie("utm_content");let a=checkCookie("invite");a&&(referralCodeText.innerHTML=a,activeCode.style.display="flex"),window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var n=document,r=function(){r.c(arguments)};r.q=[],r.c=function(e){r.q.push(e)},e.Intercom=r;var o=function(){var e=n.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=n.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",o):e.addEventListener("load",o,!1)}}()},{"./general":"1tOWF"}],"1tOWF":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function a(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function i(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,r=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,i=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",r=r?r.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:r,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:i=i?i.trim():""}}function d(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t))%10}function s(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function l(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function c(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}r.defineInteropFlag(n),r.export(n,"signOut",()=>o),r.export(n,"setFormAddressFields",()=>a),r.export(n,"getFormAddressFields",()=>i),r.export(n,"isValidSwedishSsn",()=>d),r.export(n,"formatPersonalId",()=>s),r.export(n,"itemCoverImage",()=>l),r.export(n,"shareCode",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["ar62u"],"ar62u","parcelRequire81ca");
//# sourceMappingURL=home.js.map
