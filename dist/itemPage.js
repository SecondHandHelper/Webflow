!function(e,t,r,n,i){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof a[n]&&a[n],d=s.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function o(t,r){if(!d[t]){if(!e[t]){var i="function"==typeof a[n]&&a[n];if(!r&&i)return i(t,!0);if(s)return s(t,!0);if(l&&"string"==typeof t)return l(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}m.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},m.cache={};var c=d[t]=new o.Module(t);e[t][0].call(c.exports,m,c,c.exports,this)}return d[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:o(t)}}o.isParcelRequire=!0,o.Module=function(e){this.id=e,this.bundle=o,this.exports={}},o.modules=e,o.cache=d,o.parent=s,o.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(o,"root",{get:function(){return a[n]}}),a[n]=o;for(var u=0;u<t.length;u++)o(t[u]);if(r){var c=o(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):i&&(this[i]=c)}}({"8ivRG":[function(e,t,r){var n=e("./general");let i=getParamsObject();async function a(e){let t=await callBackendApi(`/api/items/${e}`);if(!t.data)return;let r=t.data;console.log("Item data:",r);let i=r.infoRequests,a=r.category?r.category:"",s="",d=r.publishedDate,l="";if(r.publishedDate){d=new Date(d);let e=new Date().getTime()-d.getTime(),t=Math.max(0,Math.round((r.longerPeriodAcceptedDate?60:30)-e/864e5));l=`${t} ${1===t?"dag":"dagar"} kvar`}let o=r.minPriceEstimate,u=r.maxPriceEstimate,c=o&&u?`${o}-${u} kr`:"",m="",p="";if("New"===r.status&&(i?.price?.status==="Active"?(s=`Inv\xe4ntar ditt svar`,m="På huvudsidan kan du se plaggets värdering och<br>välja om du vill sälja till värderingen eller inte."):o&&u?(s=`F\xf6rbereds`,m="Förbereder det sista inför publicering.<br>Försäljningen påbörjas inom kort.",p=c):(s=`V\xe4rdering p\xe5g\xe5r`,m="Du får ett SMS när värderingen är klar.<br>Värderingen tar normalt 2 vardagar."),editItemLink.style.display="block"),"Published"===r.status&&o&&u&&(s=`F\xf6rs\xe4ljning p\xe5g\xe5r`,m=l,p=c,r.currentPrice&&(document.getElementById("itemCurrentPrice").innerText=Math.min(r.userSetCurrentPrice||r.currentPrice,r.currentPrice),document.getElementById("itemCurrentPriceDiv").style.display="flex"),editItemLink.style.display="block"),"Sold"===r.status){let n="Trusted"!==user.current.trustedSellerStatus;s=`S\xe5ld!`,m=n?"Utbetalning sker 5 dagar efter att köparen mottagit plagget och ingen skickavvikelse rapporteras.":"Payed"===r.payoutStatus?"":"Brand Gift Card"===r.payoutType?"Presentkortet skapas inom en dag":"Utbetalning kommer via Swish inom en dag",sellerGetsTitle.innerHTML="Payed"===r.payoutStatus?"Du fick":"Du får",sellerGetsText.innerHTML=`${"Brand Gift Card"===r.payoutType?r.soldPrice:r.sellerGets} kr`,sellerGetsDiv.style.display="flex","Not sent"===r.shippingStatus?(toShipItemLink.href=window.location.origin+`/ship-item?id=${e}`,toShipItemLink.style.display="flex"):n&&(r.saleApprovalStatus&&"Pending"!==r.saleApprovalStatus?t?.reclaim?.status==="Approved"&&"Seller"===t.refundResponsible&&("Collected"===t.returnShippingStatus?(s="Returnerat",m="Plagget har returnerats till dig."):t.returnPostnordShipmentId&&(s="På väg tillbaka till dig",m="Plaggets skick avvek från beskrivningen, det är nu på väg tillbaka till dig.",toTrackReturnLink.href=`https://tracking.postnord.com/se/tracking?id=${r.returnPostnordShipmentId}`,toTrackReturnLink.style.display="flex")):(s="Inväntar godkännande",toTrustedSellerArticleLink.style.display="flex")),s.includes("Såld")&&(itemStatusText.style.fontSize="18px",itemStatusText.style.fontWeight="500")}itemBrandText.innerHTML=r.brand,itemCategoryText.innerHTML=a,pageTitleDiv.style.display="flex",coverImageDiv.style.backgroundImage=`url('${(0,n.itemCoverImage)(r)}')`,itemStatusText.innerHTML=s,itemText1.innerHTML=m,itemText2.innerHTML=p,itemDiv.style.display="block",loadingDiv.style.display="none"}async function s(e){itemEventsDiv.innerHTML="";let t=await fetch(`https://europe-west3-second-hand-helper.cloudfunctions.net/itemEvents/${e}`,{method:"GET",headers:{"Content-Type":"application/json"}}),r=await t.json();console.log(r);let n=!1;if(r){for(let e=0;e<r.length;e++){let t=r[e];"itemAdded"===t.type&&(n=!0);let i=function(e,t){let r="",n='<div class="div-block-143"></div>';"highlighted"===t&&(r="highlighted-event",n='<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/62c53fa9db6d0f383ee430f9_check-mark%202%20(1).svg" loading="lazy" width="auto" alt="">');let i="block",a=new Date(e.timestamp),s=10>a.getMinutes()?"0"+a.getMinutes():a.getMinutes(),l=10>a.getHours()?"0"+a.getHours():a.getHours(),o=["Sön","Mån","Tis","Ons","Tor","Fre","Lör","Sön"][a.getDay()]+" "+l+":"+s;if(Math.round((new Date().getTime()-a.getTime())/864e5)>6&&(o=a.getDate()+" "+["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"][a.getMonth()]+" "+l+":"+s),"itemAdded"===e.type)return d("none",n,r,"Plagg lades upp på Mai",o);if("valuationCompleted"===e.type)return d(i,n,r,`V\xe4rderades till ${e.data.min}-${e.data.max} kr`,o);if("valuationAccepted"===e.type)return d(i,n,r,`Du accepterade v\xe4rderingen`,o);if("valuationFinalOffer"===e.type)return d(i,n,r,`Omv\xe4rderades till ${e.data.min}-${e.data.max} kr`,o);if("itemPublished"===e.type)return d(i,n,r,`F\xf6rs\xe4ljning p\xe5b\xf6rjades`,o);if("priceAdjusted"===e.type){let{platform:t,newPrice:a}=e.data,s=t&&t.charAt(0).toUpperCase()+t.slice(1).split(/(?=[A-Z])/).join(" ");return d(i,n,r,`Pris s\xe4nktes till ${a} kr ${t&&""!==t?" på "+s:""}`,o)}if("priceRequestSent"===e.type)return d(i,n,r,`Nytt prisf\xf6rslag p\xe5 ${e.data.min}-${e.data.max} kr`,o);if("priceRequestResponse"===e.type){if("Accepted"===e.data.response)return d(i,n,r,`Du accepterade prisf\xf6rslaget`,o);if("Denied"===e.data.response)return d(i,n,r,`Du avb\xf6jde prisf\xf6rslaget`,o)}return"listingRenewal"===e.type?d(i,n,r,`Annonser f\xf6rnyades`,o):"platformAdded"===e.type?(e.data.platforms||[]).filter(e=>"Google Shopping"!==e&&"Instagram Shop"!==e&&"Facebook Shop"!==e).map(e=>d(i,n,r,`Publicerades p\xe5 ${e}${"Mai Shop"===e?"<br>(Google Shopping, Instagram Shop, Facebook Shop)":""}`,o)).join("\n"):"itemSold"===e.type?d(i,n,r,`S\xe5ld f\xf6r ${e.data.soldPrice} kr till ${e.data.buyerFirstName} i ${e.data.buyerAddressCity}`,o):"bagSentToSeller"===e.type?d(i,n,r,"Fraktetikett skickades till dig",o):"itemSent"===e.type?d(i,n,r,`Plagget skickades iv\xe4g`,o):"payoutCompleted"===e.type?d(i,n,r,`Du fick ${e.data.amount} kr utbetalt`,o):"valuationUserAdjusted"===e.type&&d(i,n,r,`Du justerade v\xe4rderingen till ${e.data.min}-${e.data.max} kr`,o)}(t,e===r.length-1?"highlighted":"");if(i){let e=itemEventsDiv.innerHTML;itemEventsDiv.innerHTML=i.concat(e)}}itemEventsDiv.style.display="block",itemEventsLoadingDiv.style.display="none",n||(sellingProcessDiv.style.display="none")}}function d(e,t,r,n,i){return`<div class="div-block-135"><div class="div-block-144"><div class="div-block-142">
                        <div class="div-block-139" style="display: ${e};"></div>
                        </div>
                        <div class="div-block-138">${t}</div>
                        </div>
                    <div class="div-block-136">
                        <div class="item-event-text ${r}">${n}</div>
                        <div class="text-block-82">${i}</div>
                    </div></div>`}function l(){let e=getParamsObject();location.href=`/edit-item?id=${e.id}`}i.app&&document.querySelectorAll(".goback").forEach(e=>{e.style.visibility="hidden"}),editItemLink.addEventListener("click",l),coverImageDiv.addEventListener("click",l),itemText2.addEventListener("click",l),itemCurrentPrice.addEventListener("click",l),a(i.id),s(i.id)},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function i(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function a(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function s(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,i=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,s=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:n,addressPostalCode:i=i?i.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:s=s?s.trim():""}}function d(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t))%10}function l(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function o(e){if(e.images){let t=e.images;return t.modelImageSmall||t.modelImage||t.coverImageSmall||t.coverImage||t.enhancedFrontImageSmall||t.enhancedFrontImage||t.frontImageSmall||t.frontImage}if(e.imagesv2)for(let t of["modelImage","enhancedFrontImage","frontImage"]){let r=e.imagesv2.find(e=>e.name===t);if(r){if(r.versions.small)return r.versions.small;if(r.versions.medium)return r.versions.medium;if(r.versions.large)return r.versions.large;if(r.url)return r.url}}return null}function u(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}function c(e){/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream?(document.getElementById("continueOnWebBottomSheet").href=window.location.origin+e,document.getElementById("darkOverlay").classList.add("active"),document.getElementById("channelBottomSheet").classList.add("active")):window.location.href=e}function m(){document.getElementById("darkOverlay").classList.remove("active"),document.getElementById("channelBottomSheet").classList.remove("active")}n.defineInteropFlag(r),n.export(r,"signOut",()=>i),n.export(r,"setFormAddressFields",()=>a),n.export(r,"getFormAddressFields",()=>s),n.export(r,"isValidSwedishSsn",()=>d),n.export(r,"formatPersonalId",()=>l),n.export(r,"itemCoverImage",()=>o),n.export(r,"shareCode",()=>u),n.export(r,"channelRouter",()=>c),n.export(r,"hideChannelBottomSheet",()=>m)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["8ivRG"],"8ivRG","parcelRequire81ca");
//# sourceMappingURL=itemPage.js.map
