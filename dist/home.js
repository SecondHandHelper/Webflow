!function(e,t,n,r,o,i,d){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof a[r]&&a[r],l=s.i||{},c=s.cache||{},m="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(t,n){if(!c[t]){if(!e[t]){var o="function"==typeof a[r]&&a[r];if(!n&&o)return o(t,!0);if(s)return s(t,!0);if(m&&"string"==typeof t)return m(t);var i=Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}l.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},l.cache={};var d=c[t]=new u.Module(t);e[t][0].call(d.exports,l,d,d.exports,a)}return c[t].exports;function l(e){var t=l.resolve(e);return!1===t?{}:u(t)}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.require=m,this.exports={}},u.modules=e,u.cache=c,u.parent=s,u.distDir=void 0,u.publicUrl=void 0,u.devServer=void 0,u.i=l,u.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(u,"root",{get:function(){return a[r]}}),a[r]=u;for(var g=0;g<t.length;g++)u(t[g]);if(n){var v=u(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=v:"function"==typeof define&&define.amd&&define(function(){return v})}}({ar62u:[function(e,t,n,r){var o=e("./general");async function i(){try{let e=await callBackendApi("/api/shopify/recentlyAddedItems"),t=document.getElementById("ItemListRecentlyAddedItems"),n=document.getElementById("ItemListRecentlyAddedItemsDesktop");for(let r of(t.innerHTML="",n.innerHTML="",e.data)){let e=`<div class="div-block-14-big"><a href="${r.url}"/><div class="ratio-box _16-9"><div class="content-block with-image">
                        <div class="img-container" style="background-image: url('${r.image}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${r.brand}</div>
                            <div class="recent-added-items-subheader-category">${r.category}</div>
                            <div class="recently-added-price">${r.currentPrice} kr</div>
                        </div><a/></div>`;t.innerHTML+=e;let o=e.replace("14-big","14-big-desktop");n.innerHTML+=o}}catch(e){errorHandler.report(e),console.log("error",e)}}function d(e){if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream)document.getElementById("continueOnWebBottomSheet").href=window.location.origin+e,document.getElementById("darkOverlay").classList.add("active"),document.getElementById("channelBottomSheet").classList.add("active");else window.location.href=e}function a(){document.getElementById("darkOverlay").classList.remove("active"),document.getElementById("channelBottomSheet").classList.remove("active")}window.onload=function(){let e=document.getElementById("itemListRecentlySold1"),t=document.getElementById("itemListRecentlySold2");e&&e.classList.add("scroll-left"),t&&t.classList.add("scroll-right")},document.getElementById("sellItemCtaButton").addEventListener("click",()=>d("/sell-item")),document.getElementById("stickySellItemButton").addEventListener("click",()=>d("/sell-item")),document.getElementById("headerLoginButton").addEventListener("click",()=>d("/sign-in")),document.getElementById("darkOverlay").addEventListener("click",a),document.getElementById("closeChannelBottomSheet").addEventListener("click",a),authUser.whenSet(signedInNextStep),callBackendApi("/api/items/recentlySold").then(e=>{let t=document.getElementById("itemListRecentlySold1"),n=document.getElementById("itemListRecentlySold2");t.innerHTML="",n.innerHTML="";let r=document.getElementById("itemListRecentlySoldStartPageDesktop");r.innerHTML="",e.data.forEach((e,i)=>{let d=e.brand,a=e.soldPrice,s=new Date(e.soldDate),l=new Date(e.publishedDate),c=(0,o.itemCoverImage)(e),m=Math.floor((s.getTime()-l.getTime())/864e5);if(a>=180||m<=20){let e=`<div class="item-card-recently-sold"><div class="ratio-box _16-9"><div class="content-block with-image">
                        <div class="img-container" style="background-image: url('${c}');"></div></div></div>
                        <div>
                        <div>${d}</div>
                        <div>S\xe5ld f\xf6r ${a}kr</div>
                        </div>
                        </div>`;i%2==0?t.innerHTML+=e:n.innerHTML+=e,r.innerHTML+=e}})}).catch(e=>{errorHandler.report(e);var t=e.code;console.log("Error message: ",e.message,t)}),i();let s=document.getElementById("howItWorksDiv");new IntersectionObserver((e,t)=>{e[0].isIntersecting&&(analytics.track("Element Viewed",{elementID:"howItWorksSlide1"}),t.disconnect())},{rootMargin:"0px 0px -600px 0px"}).observe(s),new MutationObserver(e=>{let t=e.find(e=>"attributes"===e.type&&"aria-hidden"===e.attributeName);t&&t.oldValue&&!t.target["aria-hidden"]&&analytics.track("Element Viewed",{elementID:`howItWorksSlide${t.target.ariaLabel.slice(0,1)}`})}).observe(s,{attributeFilter:["aria-hidden"],attributeOldValue:!0,subtree:!0});let l="noCommissionCampaignCookie";getCookie(l);let c=new Intl.DateTimeFormat("se-SV").format(new Date);if(c>="2024-08-12"&&c<="2024-08-18"){let e=document.getElementById("noCommissionCampaign");analytics.track("Element Viewed",{elementID:"noCommissionCampaign"}),e.style.display="block",document.getElementById("noCommissionAd").style.display="block",document.getElementById("sellItemCtaButton").getBoundingClientRect().y<-47&&(e.style.top="0px"),new IntersectionObserver((t,n)=>{e.style.top=document.getElementById("sellItemCtaButton").getBoundingClientRect().y>-47?"-80px":"0px"},{rootMargin:"0px 0px -100%",root:null}).observe(document.getElementById("ctaSection")),new IntersectionObserver((e,t)=>{e[0].isIntersecting&&(analytics.track("Element Viewed",{elementID:"noCommissionCampaignAd"}),t.disconnect())},{rootMargin:"0px 0px -370px 0px"}).observe(document.getElementById("noCommissionAd")),setCookie(l,"noCommission",7)}checkCookie("utm_campaign"),checkCookie("utm_source"),checkCookie("utm_medium"),checkCookie("utm_term"),checkCookie("utm_content");let m=checkCookie("invite");m&&(referralCodeText.innerHTML=m,activeCode.style.display="flex"),window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var n=document,r=function(){r.c(arguments)};r.q=[],r.c=function(e){r.q.push(e)},e.Intercom=r;var o=function(){var e=n.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=n.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",o):e.addEventListener("load",o,!1)}}()},{"./general":"1tOWF"}],"1tOWF":[function(e,t,n,r){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");function i(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function d(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function a(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,r=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,i=document.getElementById("addressCity").value,d=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",r=r?r.trim():"",o=o?o.trim().replace(/\D/g,""):"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:r,addressPostalCode:o,addressCity:i=i?i.trim().charAt(0).toUpperCase()+i.trim().slice(1):"",addressDoorCode:d=d?d.trim():""}}function s(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t))%10}function l(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function c(e){if(e.images){let t=e.images;return t.modelImageSmall||t.modelImage||t.coverImageSmall||t.coverImage||t.enhancedFrontImageSmall||t.enhancedFrontImage||t.frontImageSmall||t.frontImage}if(e.imagesv2)for(let t of["modelImage","enhancedFrontImage","frontImage"]){let n=e.imagesv2.find(e=>e.name===t);if(n){if(n.versions.small)return n.versions.small;if(n.versions.medium)return n.versions.medium;if(n.versions.large)return n.versions.large;if(n.url)return n.url}}return null}function m(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}function u(e){var t;/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream?(t=e,document.getElementById("continueOnWebBottomSheet").href=window.location.origin+t,document.getElementById("darkOverlay").classList.add("active"),document.getElementById("channelBottomSheet").classList.add("active")):window.location.href=e}function g(){document.getElementById("darkOverlay").classList.remove("active"),document.getElementById("channelBottomSheet").classList.remove("active")}o.defineInteropFlag(n),o.export(n,"signOut",()=>i),o.export(n,"setFormAddressFields",()=>d),o.export(n,"getFormAddressFields",()=>a),o.export(n,"isValidSwedishSsn",()=>s),o.export(n,"formatPersonalId",()=>l),o.export(n,"itemCoverImage",()=>c),o.export(n,"shareCode",()=>m),o.export(n,"channelRouter",()=>u),o.export(n,"hideChannelBottomSheet",()=>g)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n,r){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["ar62u"],"ar62u","parcelRequire81ca");
//# sourceMappingURL=home.js.map
