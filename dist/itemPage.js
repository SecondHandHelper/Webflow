!function(e,t,r,n,a){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},d="function"==typeof i[n]&&i[n],s=d.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function o(t,r){if(!s[t]){if(!e[t]){var a="function"==typeof i[n]&&i[n];if(!r&&a)return a(t,!0);if(d)return d(t,!0);if(l&&"string"==typeof t)return l(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}m.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},m.cache={};var c=s[t]=new o.Module(t);e[t][0].call(c.exports,m,c,c.exports,this)}return s[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:o(t)}}o.isParcelRequire=!0,o.Module=function(e){this.id=e,this.bundle=o,this.exports={}},o.modules=e,o.cache=s,o.parent=d,o.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(o,"root",{get:function(){return i[n]}}),i[n]=o;for(var u=0;u<t.length;u++)o(t[u]);if(r){var c=o(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):a&&(this[a]=c)}}({"8ivRG":[function(e,t,r){var n=e("./general");async function a(e){itemEventsDiv.innerHTML="";let t=await fetch(`https://europe-west3-second-hand-helper.cloudfunctions.net/itemEvents/${e}`,{method:"GET",headers:{"Content-Type":"application/json"}}),r=await t.json();if(console.log(r),itemAddedEventExists=!1,r){for(let e=0;e<r.length;e++){let t=r[e];"itemAdded"===t.type&&(itemAddedEventExists=!0);let n=function(e,t){let r="",n='<div class="div-block-143"></div>';"highlighted"===t&&(r="highlighted-event",n='<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/62c53fa9db6d0f383ee430f9_check-mark%202%20(1).svg" loading="lazy" width="auto" alt="">');let a="block",d=new Date(e.timestamp),s=10>d.getMinutes()?"0"+d.getMinutes():d.getMinutes(),l=10>d.getHours()?"0"+d.getHours():d.getHours(),o=["Sön","Mån","Tis","Ons","Tor","Fre","Lör","Sön"][d.getDay()]+" "+l+":"+s;if(Math.round((new Date().getTime()-d.getTime())/864e5)>6&&(o=d.getDate()+" "+["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"][d.getMonth()]+" "+l+":"+s),"itemAdded"===e.type)return i("none",n,r,"Plagg lades upp på Mai",o);if("valuationCompleted"===e.type)return i(a,n,r,`V\xe4rderades till ${e.data.min}-${e.data.max} kr`,o);if("valuationAccepted"===e.type)return i(a,n,r,`Du accepterade v\xe4rderingen`,o);if("valuationFinalOffer"===e.type)return i(a,n,r,`Omv\xe4rderades till ${e.data.min}-${e.data.max} kr`,o);if("itemPublished"===e.type)return i(a,n,r,`F\xf6rs\xe4ljning p\xe5b\xf6rjades`,o);if("priceAdjusted"===e.type){let{platform:t,newPrice:d}=e.data,s=t&&t.charAt(0).toUpperCase()+t.slice(1).split(/(?=[A-Z])/).join(" ");return i(a,n,r,`Pris s\xe4nktes till ${d} kr ${t&&""!==t?" på "+s:""}`,o)}if("priceRequestSent"===e.type)return i(a,n,r,`Nytt prisf\xf6rslag p\xe5 ${e.data.min}-${e.data.max} kr`,o);if("priceRequestResponse"===e.type){if("Accepted"===e.data.response)return i(a,n,r,`Du accepterade prisf\xf6rslaget`,o);if("Denied"===e.data.response)return i(a,n,r,`Du avb\xf6jde prisf\xf6rslaget`,o)}return"listingRenewal"===e.type?i(a,n,r,`Annonser f\xf6rnyades`,o):"platformAdded"===e.type?(e.data.platforms||[]).filter(e=>"Google Shopping"!==e&&"Instagram Shop"!==e&&"Facebook Shop"!==e).map(e=>i(a,n,r,`Publicerades p\xe5 ${e}${"Mai Shop"===e?"<br>(Google Shopping, Instagram Shop, Facebook Shop)":""}`,o)).join("\n"):"itemSold"===e.type?i(a,n,r,`S\xe5ld f\xf6r ${e.data.soldPrice} kr till ${e.data.buyerFirstName} i ${e.data.buyerAddressCity}`,o):"bagSentToSeller"===e.type?i(a,n,r,`Fraktp\xe5se skickades till dig`,o):"itemSent"===e.type?i(a,n,r,`Plagget skickades iv\xe4g`,o):"payoutCompleted"===e.type?i(a,n,r,`Du fick ${e.data.amount} kr utbetalt`,o):"valuationUserAdjusted"===e.type&&i(a,n,r,`Du justerade v\xe4rderingen till ${e.data.min}-${e.data.max} kr`,o)}(t,e===r.length-1?"highlighted":"");if(n){let e=itemEventsDiv.innerHTML;itemEventsDiv.innerHTML=n.concat(e)}}itemEventsDiv.style.display="block",itemEventsLoadingDiv.style.display="none",itemAddedEventExists||(sellingProcessDiv.style.display="none")}}function i(e,t,r,n,a){return`<div class="div-block-135"><div class="div-block-144"><div class="div-block-142">
                        <div class="div-block-139" style="display: ${e};"></div>
                        </div>
                        <div class="div-block-138">${t}</div>
                        </div>
                    <div class="div-block-136">
                        <div class="item-event-text ${r}">${n}</div>
                        <div class="text-block-82">${a}</div>
                    </div></div>`}editItemLink.addEventListener("click",function(){let e=getParamsObject();location.href=`/edit-item?id=${e.id}`});let d=getParamsObject();!function(e){db.collection("items").doc(e).get().then(e=>{if(e.exists){console.log("Item data:",e.data()),data=e.data();let t=e.id,r=data.brand,a=data.infoRequests,i=(0,n.itemCoverImage)(data),d=data.status,s=data.category?data.category:"",l=data.longerPeriodAcceptedDate,o="",u=data.publishedDate,c="";if(data.publishedDate){u=new Date(u);let e=Math.round((l?60:30)-(new Date().getTime()-u.getTime())/864e5);c=e<=0?"0 dagar kvar":`${e} dagar kvar`}let m=data.minPriceEstimate,p=data.maxPriceEstimate,g=m&&p?`${m}-${p} kr`:"";data.soldPrice;let f=data.sellerGets,v=data.payoutStatus,h=data.shippingStatus,y="",x="";"New"===d&&(a?.price?.status==="Active"?(o=`Inv\xe4ntar ditt svar`,y="På huvudsidan kan du se plaggets värdering och<br>välja om du vill sälja till värderingen eller inte."):m&&p?(o=`F\xf6rbereds`,y="Förbereder det sista inför publicering.<br>Du får ett SMS när försäljningen påbörjas.",x=g):(o=`V\xe4rdering p\xe5g\xe5r`,y="Du får ett SMS när värderingen är klar.<br>Värderingen tar normalt 2 vardagar.")),"Published"===d&&m&&p&&(o=`F\xf6rs\xe4ljning p\xe5g\xe5r`,y=c,x=g),"Sold"===d&&(o=`S\xe5ld!`,itemStatusText.style.fontSize="18px",itemStatusText.style.fontWeight="500",y="Payed"===v?"":"Utbetalning kommer via Swish inom en dag","Not sent"===h&&(y="Utbetalning sker när du skickat plagget",toShipItemLink.href=window.location.origin+`/ship-item?id=${t}`,toShipItemLink.style.display="flex"),sellerGetsTitle.innerHTML="Payed"===v?"Du fick":"Du får",sellerGetsText.innerHTML=`${f} kr`,sellerGetsDiv.style.display="flex"),itemBrandText.innerHTML=r,itemCategoryText.innerHTML=s,pageTitleDiv.style.display="flex",coverImageDiv.style.backgroundImage=`url('${i}')`,itemStatusText.innerHTML=o,itemText1.innerHTML=y,itemText2.innerHTML=x,itemDiv.style.display="block",loadingDiv.style.display="none"}}).catch(e=>{console.log("Error getting item document:",e),errorHandler.report(e)})}(d.id),a(d.id)},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function a(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function i(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function d(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,a=document.getElementById("addressPostalCode").value,i=document.getElementById("addressCity").value,d=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:n,addressPostalCode:a=a?a.trim().replace(/\D/g,""):"",addressCity:i=i?i.trim().charAt(0).toUpperCase()+i.trim().slice(1):"",addressDoorCode:d=d?d.trim():""}}function s(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t))%10}function l(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function o(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function u(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}n.defineInteropFlag(r),n.export(r,"signOut",()=>a),n.export(r,"setFormAddressFields",()=>i),n.export(r,"getFormAddressFields",()=>d),n.export(r,"isValidSwedishSsn",()=>s),n.export(r,"formatPersonalId",()=>l),n.export(r,"itemCoverImage",()=>o),n.export(r,"shareCode",()=>u)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["8ivRG"],"8ivRG","parcelRequire81ca");
//# sourceMappingURL=itemPage.js.map
