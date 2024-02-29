!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,r,o){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof a[r]&&a[r],s=i.cache||{},d="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,n){if(!s[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var o="function"==typeof a[r]&&a[r];if(!n&&o)return o(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(i)return i(t,!0);// Try the node require function if it exists.
if(d&&"string"==typeof t)return d(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},m.cache={};var u=s[t]=new l.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return s[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=s,l.parent=i,l.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(l,"root",{get:function(){return a[r]}}),a[r]=l;for(var c=0;c<t.length;c++)l(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=l(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):o&&(this[o]=u)}}({ar62u:[function(e,t,n){var r=e("./general"),o=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),a=window.location.origin;async function i(){try{let e=await firebase.app().functions("europe-west1").httpsCallable("fetchMaiShopRecentlyAddedItems")(),t=document.getElementById("ItemListRecentlyAddedItems");for(let n of(t.innerHTML="",e.data)){let e=`<div class="div-block-14-big"><a href="${n.url}"/><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${n.image}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${n.brand}</div>
                            <div class="recent-added-items-subheader-category">${n.category}</div>
                            <div class="recently-added-price">${n.currentPrice} kr</div>
                            <div class="recently-added-brands-link-text">Mai Shop</div>
                        </div><a/></div>`;t.innerHTML+=e}}catch(e){errorHandler.report(e),console.log("error",e)}}o||a.includes("shh-test.page")||(desktopDiv.style.display="block",mobileContainer.style.display="none"),authUser.whenSet(signedInNextStep),function(){let e=firebase.app().functions("europe-west1").httpsCallable("recentlySoldItems");e().then(e=>{// Read result of the Cloud Function.
let t=document.getElementById("itemListRecentlySoldStartPage");for(let n of(t.innerHTML="",itemListRecentlySoldStartPageDesktop.innerHTML="",e.data)){let e=n.brand,o=n.soldPrice,a=new Date(n.soldDate),i=new Date(n.publishedDate);new Date(n.soldDate).toISOString().split("T")[0],new Date().toISOString().split("T")[0];let s=(0,r.itemCoverImage)(n),d=Math.floor((a.getTime()-i.getTime())/864e5);if(o>=180||d<=20){let n=`<div class="div-block-14-big"><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${s}');"></div></div></div>
                        <div class="text-block-14">${o} kr</div>
                        <div class='text-block-34'>${e}</div>`;//I cut out the "Idag / Igår" during summer, since so little is sold every day. Add this last to show it again: <div class='text-block-34'>${soldTimeText}</div></div>
t.innerHTML+=n,itemListRecentlySoldStartPageDesktop.innerHTML+=n}}}).catch(e=>{errorHandler.report(e);// Getting the Error details.
var t=e.code;console.log("Error message: ",e.message,t)});// [END fb_functions_call_add_message_error]
}(),i(),(()=>{let e=document.getElementById("howItWorksDiv");new IntersectionObserver((e,t)=>{e[0].isIntersecting&&(analytics.track("Element Viewed",{elementID:"howItWorksSlide1"}),t.disconnect())},{rootMargin:"0px 0px -600px 0px"}).observe(e),new MutationObserver(e=>{let t=e.find(e=>"attributes"===e.type&&"aria-hidden"===e.attributeName);t&&t.oldValue&&!t.target["aria-hidden"]&&analytics.track("Element Viewed",{elementID:`howItWorksSlide${t.target.ariaLabel.slice(0,1)}`})}).observe(e,{attributeFilter:["aria-hidden"],attributeOldValue:!0,subtree:!0})})(),function(){let e="noCommissionCampaignCookie",t=getCookie(e);if("noCommission"===t||Math.random()>.5){let t=document.getElementById("noCommissionCampaign");analytics.track("Element Viewed",{elementID:"noCommissionCampaign"}),setCookie(e,"noCommission",7),t.style.display="block",new IntersectionObserver((e,n)=>{e.at(0).isIntersecting&&(t.style.top="0px"===t.style.top?"-80px":"0px")},{rootMargin:"0px 0px -100%"}).observe(document.getElementById("sellItemCtaButton"))}else setCookie(e,"commission",7)}(),// Set attribution cookies (could be put on any campaign page)
checkCookie("utm_campaign"),checkCookie("utm_source"),checkCookie("utm_medium"),checkCookie("utm_term"),checkCookie("utm_content");// Set invite code cookie
let s=checkCookie("invite");s&&(referralCodeText.innerHTML=s,activeCode.style.display="flex"),window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var n=document,r=function(){r.c(arguments)};r.q=[],r.c=function(e){r.q.push(e)},e.Intercom=r;var o=function(){var e=n.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=n.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",o):e.addEventListener("load",o,!1)}}()},{"./general":"1tOWF"}],"1tOWF":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function a(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function i(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,r=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,i=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",r=r?r.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:r,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:i=i?i.trim():""}}function s(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function d(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function l(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function c(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}r.defineInteropFlag(n),r.export(n,"signOut",()=>o),r.export(n,"setFormAddressFields",()=>a),r.export(n,"getFormAddressFields",()=>i),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
r.export(n,"isValidSwedishSsn",()=>s),r.export(n,"formatPersonalId",()=>d),r.export(n,"itemCoverImage",()=>l),r.export(n,"shareCode",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||t.hasOwnProperty(n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["ar62u"],"ar62u","parcelRequire81ca")//# sourceMappingURL=home.js.map
;
//# sourceMappingURL=home.js.map
