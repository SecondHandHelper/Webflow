!function(e,t,i,n,o){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r="function"==typeof a[n]&&a[n],s=r.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,i){if(!s[t]){if(!e[t]){var o="function"==typeof a[n]&&a[n];if(!i&&o)return o(t,!0);if(r)return r(t,!0);if(l&&"string"==typeof t)return l(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(i){var n=e[t][1][i];return null!=n?n:i},m.cache={};var u=s[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return s[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=s,d.parent=r,d.register=function(t,i){e[t]=[function(e,t){t.exports=i},{}]},Object.defineProperty(d,"root",{get:function(){return a[n]}}),a[n]=d;for(var c=0;c<t.length;c++)d(t[c]);if(i){var u=d(i);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):o&&(this[o]=u)}}({flS2m:[function(e,t,i){var n,o,a,r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i),r.export(i,"updateIC",()=>c),r.export(i,"closePickupToast",()=>v);var s=e("./general"),l=e("./infoRequestsFunctions"),d=e("./loadItemCards");function c(e,t,i){let n=t,o=i;null===n&&(n=""),null===o&&(o=""),window.intercomSettings={app_id:"klyy0le5",user_id:`${e}`},db.collection("users").doc(e).get().then(t=>{if(t.exists){let a=t.data(),r="",s="";a.addressFirstName&&(r=a.addressFirstName+" "+a.addressLastName,s=a.addressCity),a.phoneNumber&&(o=a.phoneNumber);var i={mai_user_id:`${e}`,user_id:`${e}`,phone:`${o}`,email:`${n}`,name:`${r}`,city:`${s}`};Intercom("update",i)}else console.log("No such user document exist!")}).catch(e=>{errorHandler.report(e),console.log("Error getting document:",e)})}async function u(){let e=await firebase.app().functions("europe-west1").httpsCallable("maxNumBags")();e?.data?.maxOrderBags>0&&(document.getElementById("orderBagsSection").style.display="block")}async function m(e){let t,i="",n="",o=!0,a=!1,r=!1,s=!1;await db.collection("items").where("user","==",e).where("status","==","Sold").orderBy("soldDate").get().then(e=>{e.forEach(e=>{e.data().status,i=e.data().shippingStatus;let t=e.data().payoutStatus;"Not sent"===i&&(r=!0),"Payed"!==t&&(a=!0)})}),await db.collection("users").doc(e).get().then(e=>{n=e.data().addressFirstName,t=e.data().personalId;let i=e.data()?.preferences?.shippingMethod;t?""===t&&(o=!1):o=!1,"Pickup"==i&&(s=!0)}),!0==r&&void 0==n&&s&&(location.href="/address-form"),!0==a&&!1==o&&(location.href="/personal-id-form")}async function g(){var e,t;let i,r,g,v,y;if(console.log("privateMain running"),!user.current)return;n=authUser.current.uid,o=authUser.current.email||sessionStorage.getItem("email"),a=authUser.current.phoneNumber||sessionStorage.getItem("phoneNumber"),c(n,o,a),m(n),e=n,(t=document.getElementById("itemListSoldByOthers")).innerHTML="",db.collection("items").where("status","==","Sold").orderBy("soldDate","desc").limit(30).get().then(i=>{i.forEach(i=>{var n=i.data().user,o=i.data().brand,a=i.data().soldPrice,r=(0,s.itemCoverImage)(i.data());if(n!=e&&a>=200){var l=`<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${r}');"></div></div></div><div class="text-block-14">${a} kr</div><div class='text-block-34'>${o}</div></div>`;t.innerHTML+=l}})}),soldByOthersDiv.style.display="block",setPreferredLogInMethodCookie(authUser.current.providerData[0].providerId),"3OkW5av20HP8ScpUDS8ip9fBEZr1"===n&&window.location.origin.includes("shh-test")&&(n="P9fYQomeZBW3jnYjnLFKurAJXYF3"),p(n).then(e=>{e?(console.log("Yearly data exist!"),document.getElementById("yearlySummaryDiv").style.display="block",document.getElementById("yearlySummaryDiv").addEventListener("click",function(){location.href=`/2023withmai?id=${n.substring(0,10)}`})):console.log("No yearly summary exist!")});let h=await getItems(n);f(h),i=10,r=0,g=!1,v=!!(user.current?.elementViews&&user.current.elementViews.some(e=>"inviteToast"===e.elementID)),h&&h.forEach(e=>{e.id;var t=e.data();let n=t.soldDate,o=t.status,a=t.shippingStatus;if(!t.archived&&"Sold"===o&&n){if(r++,n){n=new Date(n);let e=Math.floor((new Date().getTime()-n.getTime())/864e5);e<=i&&(i=e)}"Sent"!==a&&(g=!0)}}),i<=3&&r>=2&&g&&user.current?.referralData?.referralCode&&!v&&(referralCodeText.innerHTML=user.current.referralData.referralCode,triggerInviteToastOpen.click(),db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"inviteToast",timestamp:new Date})}),analytics.track("Element Viewed",{elementID:"inviteToast"})),user.current?.referralData?.referralCode&&(referralCodeText.innerHTML=user.current.referralData.referralCode,headerInviteButton.style.display="flex",menuInviteLink.style.display="block");let k=checkCookie("invite");k&&await connectReferralUsers(k),checkCookie("photo_invite")&&!localStorage.getItem("photoShootBooked")&&(photoShootOffer.style.display="block",bonusSection.style.display="block"),showBonusSection(),authUser.current.phoneNumber?y=authUser.current.phoneNumber:authUser.current.email&&(y=authUser.current.email),y&&(account.innerHTML=y,account.style.display="block"),user.current.addressFirstName&&user.current.addressLastName&&(accountName.innerHTML=user.current.addressFirstName+" "+user.current.addressLastName,accountName.style.display="block"),(0,d.loadItemCards)(h),(0,l.loadInfoRequests)(n),u(),showReferralSection(),h&&h.forEach(e=>{e.id;var t=e.data();let i=t.publishedDate,n=t.status;!t.archived&&"Published"===n&&i&&i&&(i=new Date(i),45>=Math.floor((new Date().getTime()-i.getTime())/864e5)&&(document.getElementById("holidayModeDiv").style.display="block"))}),user.current&&user.current.addressFirstName&&user.current.addressLastName&&!user.current?.referralData?.referralCode&&await createReferralCode()}async function p(e){let t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e})},i=await fetch("https://europe-west3-second-hand-helper.cloudfunctions.net/yearlyData",t);if(!i.ok)throw Error("Network response was not ok.");return!!(await i.json()).data.sold}async function f(e){if(!user)return;let t=new Date,i=0,n=0,o=user.current?.elementViews?user.current.elementViews.reverse().find(e=>"npsSurvey"===e.elementID):null,a=o?o.timestamp.toDate():null,r=a?Math.floor((t.getTime()-a.getTime())/864e5):null;e&&e.forEach(e=>{let o=e.data();if(o.publishedDate&&!o.archived){let e=new Date(o.publishedDate),a=Math.floor((t.getTime()-e.getTime())/864e5);a>i&&(i=a),(a<n||0===n&&a>0)&&(n=a)}}),i>=25&&n<=60&&(!a||r>90)&&!document.referrer.includes("feedback-nps")&&(location.href="/feedback-nps")}function v(){document.getElementById("triggerPickupToastClose").click()}function y(){document.getElementById("triggerFeedbackFormClose").click(),setTimeout(function(){location.reload()},400)}async function h(){let e="";for(var t=document.getElementsByName("Pickup"),i=0;i<t.length;i++)t[i].checked&&(e=t[i].value);db.collection("items").doc(pickupFlowItemId).update({pickupDate:e,shippingMethod:"Pickup"}).then(t=>{console.log(`pickupDate '${e}' and shippingMethod 'Pickup' is now updated on Firestore item`),v(),document.getElementById("triggerFeedbackFormOpen").click()})}async function k(e){let t=db.collection("items").doc(pickupFlowItemId);await t.update({happinessRate:e}).then(function(){console.log("happinessRate is now set on Firestore item"),happinessQuestionDiv.style.display="none",openQuestionDiv.style.display="block",feedbackSubmitButton.style.display="block"})}async function b(){let e=feedbackTextField.value,t=db.collection("items").doc(pickupFlowItemId);await t.update({feedbackText:e}).then(function(){console.log("feedbackText is now set on Firestore item"),y()})}checkCookie("invite"),localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),console.log(`user ${user.current}`),user.whenSet(g),Webflow.push(function(){$("form").submit(function(){return!1})});let T=!1;function w(){console.log("onLoadHandler running"),menuSignoutButton.addEventListener("click",s.signOut),bookPickupForm.addEventListener("submit",h),closePickupToastIcon.addEventListener("click",v),closeFeedbackFormButton.addEventListener("click",y),happySmileyButton.addEventListener("click",function(){k(3)},!1),neutralSmileyButton.addEventListener("click",function(){k(2)},!1),angrySmileyButton.addEventListener("click",function(){k(1)},!1),feedbackSubmitButton.addEventListener("click",b),saveReferralCodeButton.addEventListener("click",async function(){saveRefCodeLoadingDiv.style.display="flex",saveReferralCodeButton.style.display="none";let e=referralCodeInput.value;await connectReferralUsers(e)}),closeMeasurementsToastButton.addEventListener("click",function(){triggerMeasurementsToastClose.click()}),closeNewPriceToastButton.addEventListener("click",function(){triggerNewPriceToastClose.click()}),closeInviteToastButton.addEventListener("click",function(){triggerInviteToastClose.click()}),closeServicePointToastButton.addEventListener("click",function(){triggerServicePointToastClose.click()}),confirmServicePointButton.addEventListener("click",function(){document.getElementById("feedbackFormTitle").innerHTML="",triggerServicePointToastClose.click(),triggerFeedbackFormOpen.click()}),closeLongerPeriodToastButton.addEventListener("click",function(){triggerLongerPeriodToastClose.click()}),shareCodeButton.addEventListener("click",s.shareCode),sharePersonalLinkButton.addEventListener("click",s.shareCode),T=!0,menuButton.addEventListener("click",function(){Intercom("update",{hide_default_launcher:!0})}),closeMenuButton.addEventListener("click",function(){Intercom("update",{hide_default_launcher:!1})}),document.getElementById("christmasHolidayDiv").onclick=()=>Intercom("showNewMessage","När reser du iväg, och när är du tillbaka?\n\n")}window.addEventListener("load",w),console.log(`document.readyState ${document.readyState}`),"complete"!==document.readyState||T||(console.log("Running it since event listener did not"),w()),window.addEventListener("pageshow",e=>{e.persisted?(console.log("This page was restored from the bfcache."),"none"!==menu.style.display&&(menu.style.display="none")):console.log("This page was loaded normally.")}),window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var i=document,n=function(){n.c(arguments)};n.q=[],n.c=function(e){n.q.push(e)},e.Intercom=n;var o=function(){var e=i.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=i.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",o):e.addEventListener("load",o,!1)}}()},{"./general":"1tOWF","./infoRequestsFunctions":"21npA","./loadItemCards":"dxOtH","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"1tOWF":[function(e,t,i){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,location.href="/",deleteCookie("maiAuth")}).catch(e=>{errorHandler.report(e),console.log(e)})}function a(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function r(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,i=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,r=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",i=i?i.trim().charAt(0).toUpperCase()+i.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:i,addressCO:n,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:r=r?r.trim():""}}function s(e){return 10===(e=e.replace(/\D/g,"").split("").reverse().slice(0,10)).length&&0==e.map(e=>Number(e)).reduce((e,t,i)=>(i%2&&(t*=2),t>9&&(t-=9),e+t))%10}function l(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function d(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function c(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let i=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(i),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}n.defineInteropFlag(i),n.export(i,"signOut",()=>o),n.export(i,"setFormAddressFields",()=>a),n.export(i,"getFormAddressFields",()=>r),n.export(i,"isValidSwedishSsn",()=>s),n.export(i,"formatPersonalId",()=>l),n.export(i,"itemCoverImage",()=>d),n.export(i,"shareCode",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,i){i.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},i.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.exportAll=function(e,t){return Object.keys(e).forEach(function(i){"default"===i||"__esModule"===i||Object.prototype.hasOwnProperty.call(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[i]}})}),t},i.export=function(e,t,i){Object.defineProperty(e,t,{enumerable:!0,get:i})}},{}],"21npA":[function(e,t,i){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(i),n.export(i,"loadInfoRequests",()=>d);var o=e("./general");async function a(e,t){measurementDescriptionText.innerHTML=t,measurementsSubmitButton.addEventListener("click",async function(){let t=measurementsInput.value;t.length>0&&" "!==t&&await db.collection("items").doc(e).update({measurements:t,"infoRequests.measurements.status":"Resolved"}),triggerMeasurementsToastClose.click(),setTimeout(function(){location.reload()},400)}),triggerMeasurementsToastOpen.click()}async function r(e,t,i,n){if(!e)return;console.log("is this happening?");let o=10*Math.ceil(.7*i/10),a=10*Math.ceil(.8*i/10);priceAfterDiscount30.innerHTML=`(Priset blir ${o} kr)`,priceAfterDiscount20.innerHTML=`(Priset blir ${a} kr)`,priceNoDiscount.innerHTML=`(${i} kr)`,i>=140&&!n?(longerPeriodDescriptionText.innerHTML=`S\xe4ljperioden f\xf6r ditt ${t}-plagg har n\xe5tt sitt slut. V\xe4lj om du vill f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar och om du vill s\xe4nka priset f\xf6r att \xf6ka chansen att f\xe5 det s\xe5lt.`,discountFormDiv.style.display="block"):(longerPeriodDescriptionText.innerHTML=`S\xe4ljperioden f\xf6r ditt ${t}-plagg har n\xe5tt sitt slut. Vill du f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar eller avsluta f\xf6rs\xe4ljningen?`,discountFormDiv.style.display="none"),longerPeriodAcceptButton.addEventListener("click",async function(){let t=new Date().toISOString().split("T")[0],n=i,r=0;for(var s=document.getElementsByName("Discount"),l=0;l<s.length;l++)if(s[l].checked){let e=s[l].value;"30"===e&&(n=o,r=30),"20"===e&&(n=a,r=20)}await db.collection("items").doc(e).update({longerPeriodAcceptedDate:t,"infoRequests.longerPeriod.status":"Resolved","infoRequests.longerPeriod.response":"Accepted",longerPeriodAcceptedDiscount:r,minPriceEstimate:n}),triggerLongerPeriodToastClose.click(),setTimeout(function(){location.reload()},300)}),longerPeriodDenyButton.addEventListener("click",async function(){await db.collection("items").doc(e).update({"infoRequests.longerPeriod.status":"Resolved","infoRequests.longerPeriod.response":"Denied",status:"Unsold"}),triggerLongerPeriodToastClose.click(),setTimeout(function(){location.reload()},300)}),triggerLongerPeriodToastOpen.click()}async function s(e,t,i,n,o){if(console.log("storePriceResponse",e,t,i,n),"Accepted"===n&&await db.collection("items").doc(e).update({"infoRequests.price.status":"Resolved","infoRequests.price.response":"Accepted",maxPriceEstimate:t,minPriceEstimate:i}).then(function(){triggerNewPriceToastClose.click(),setTimeout(function(){location.reload()},300)}),"Denied"===n){let t={"infoRequests.price.status":"Resolved","infoRequests.price.response":"Denied"};"New"===o&&(t.archived=!0,t.willNotSell=!0),await db.collection("items").doc(e).update(t).then(function(){triggerNewPriceToastClose.click(),setTimeout(function(){location.reload()},300)})}}async function l(e,t,i,n,o,a,r,l,d,c){console.log("openNewPriceToast",e,t,i,n,o,a,r,l,d,c),previousMinPrice.style.display="none",previousMaxPrice.style.display="none",maxPriceDiv.style.display="block",minPriceDiv.style.display="block",newPriceToastTitle.innerHTML="Nytt lägsta pris",newPriceHeading.innerHTML=`${o}-plagg`;let u=r.toLowerCase();u&&"null"!==u&&(newPriceHeading.innerHTML=`${o}-${u}`),maxPrice.innerHTML=i,minPrice.innerHTML=n,d&&"null"!==d&&""!==d&&"undefined"!==d&&i!==d&&(previousMaxPrice.innerHTML=d,previousMaxPrice.style.display="block"),c&&"null"!==c&&""!==c&&"undefined"!==c&&n!==c&&(previousMinPrice.innerHTML=c,previousMinPrice.style.display="block"),acceptNewPriceButton.innerHTML="Sälj med nytt pris",denyNewPriceButton.innerHTML="Sänk ej","New"===t&&"Valuation"===l&&(newPriceToastTitle.innerHTML="Värdering",acceptNewPriceButton.innerHTML="Sälj till värdering",denyNewPriceButton.innerHTML="Avböj och avsluta"),"Adjusted ML Valuation"===l&&(newPriceToastTitle.innerHTML="Nytt prisintervall"),"Valuation"!==l&&"Adjusted ML Valuation"!==l&&(minPrice.innerHTML=`${n} kr`,maxPriceDiv.style.display="none"),a&&"undefined"!==a&&""!==a&&"null"!==a&&(newPriceText.innerHTML=a,descriptionDiv.style.display="block"),acceptNewPriceButton.addEventListener("click",()=>{s(e,i,n,"Accepted",t)}),denyNewPriceButton.addEventListener("click",()=>{s(e,i,n,"Denied",t)}),triggerNewPriceToastOpen.click()}function d(e){let t=document.getElementById("infoRequestMeasurementsTemplate").cloneNode(!0),i=document.getElementById("infoRequestLongerPeriodTemplate").cloneNode(!0),n=document.getElementById("infoRequestImagesTemplate").cloneNode(!0),s=document.getElementById("infoRequestValuationTemplate").cloneNode(!0),d=document.getElementById("infoRequestsList");d.replaceChildren(),db.collection("items").where("user","==",e).get().then(e=>{e.forEach(e=>{let c=e.id,u=e.data(),m=u.infoRequests,g=u.status,p=u.brand.replace(/'/g,""),f=u.minPriceEstimate,v=u.maxPriceEstimate,y=u?.infoRequests?.price?.response==="Denied",h=u.archived,k=u.category,b=(0,o.itemCoverImage)(u);void 0==h&&"Unsold"!==g&&"Sold"!==g&&m&&function(){for(let e in m)if(m[e]?.status==="Active"){let o=m[e].description;if(o&&(o=o.replace(/'/g,"")),"price"===e){let t=m[e].type,i=s.cloneNode(!0);i.id=`infoRequestPrice-${c}`,i.querySelector(".img-container").style.backgroundImage=`url('${b}')`,i.querySelector("a .pricebuttontext").innerText="Se prisförslag",i.querySelector(".text-block-72").innerText="Vill du sänka priset och få det sålt?",d.appendChild(i),"New"===g&&"Adjusted ML Valuation"!==t?(i.querySelector("a .pricebuttontext").innerText="Se värdering",i.querySelector(".text-block-72").innerText="Vill du sälja till vår värdering?",i.querySelector("a").href=`/item-valuation?id=${c}`):setTimeout(()=>{let i=m[e].maxPrice,n=m[e].minPrice;document.querySelector(`#infoRequestPrice-${c} a`).addEventListener("click",async()=>{await l(c,g,i,n,p,o,k,t,v,f)})},0)}if("measurements"===e){let e=t.cloneNode(!0);e.id=`infoRequestMeasurements-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${b}')`,d.appendChild(e),setTimeout(()=>{document.querySelector(`#infoRequestMeasurements-${c} a`).addEventListener("click",async()=>{await a(c,o)})},0)}if("images"===e){let e=n.cloneNode(!0);e.id=`infoRequestImages-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${b}')`,e.querySelector("a").href=`/edit-item?id=${c}`,d.appendChild(e)}if("longerPeriod"===e){let e=i.cloneNode(!0);e.id=`infoRequestLongerPeriod-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${b}')`,d.appendChild(e),setTimeout(()=>{document.querySelector(`#infoRequestLongerPeriod-${c} a`).addEventListener("click",async()=>{await r(c,p,f,y)})},0)}infoRequestsDiv.style.display="block"}}()})})}},{"./general":"1tOWF","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],dxOtH:[function(e,t,i){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(i),n.export(i,"loadItemCards",()=>u);var o=e("./general"),a=e("./private");async function r(e,t){console.log(`storeShippingMethod(${e}, ${t}) is running`),await db.collection("items").doc(e).update({shippingMethod:t}).then(i=>{console.log(`Shipping method '${t}' stored on item with ID: `,e),window.pickupFlowItemId=e,"Service point"==t&&(document.getElementById("feedbackFormTitle").innerHTML="Tack, då vet vi att paketet snart lämnas till ett ombud.",document.getElementById("triggerShippingToastClose").click()),(0,a.closePickupToast)(),document.getElementById("triggerFeedbackFormOpen").click()})}function s(e,t){console.log(`openShippingToast(${e}, ${t})`),window.pickupFlowItemId=e,setTimeout(()=>{document.getElementById("servicePointButton").addEventListener("click",async()=>{await r(e,"Service point")}),document.getElementById("bookPickupButton").addEventListener("click",()=>{l(e,t)})},0),triggerShippingToastOpen.click()}function l(e,t,i="none"){console.log(`openPickupToast(${e}, ${t}) is running`),triggerShippingToastClose.click(),triggerServicePointToastClose.click(),changeToServicePointButton.addEventListener("click",async()=>{await r(e,"Service point")}),changeToServicePointButton.style.display=i,function(e){console.log(`setDatesOfPickupToast(${e}) is running`),radioFieldOne.style.display="none",radioFieldTwo.style.display="none",radioFieldThree.style.display="none",radioFieldFour.style.display="none";var t=new Date(e);t.setTime(t.getTime()+36e5),t.setDate(t.getDate()+4),6==t.getDay()||0==t.getDay()||1==t.getDay()||2==t.getDay()?t.setDate(t.getDate()+2):3==t.getDay()&&t.setDate(t.getDate()+1);var i=new Date(t);i.setDate(i.getDate()+1),6==i.getDay()&&i.setDate(i.getDate()+2);var n=new Date(i);n.setDate(n.getDate()+1),6==n.getDay()&&n.setDate(n.getDate()+2);var o=new Date(n);o.setDate(o.getDate()+1),6==o.getDay()&&o.setDate(o.getDate()+2);var a=["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"],r=["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"];let s=new Date,l=0;console.log("Today",s),console.log("firstDate > today",t>s),console.log("secondDate > today",i>s),console.log("thirdDate > today",n>s),console.log("forthDate > today",o>s);let d=document.getElementById("pickupDateOne"),c=document.getElementById("pickupDateTwo"),u=document.getElementById("pickupDateThree"),m=document.getElementById("pickupDateFour");if(t>s&&($("#radioButtonOne").val(t.toISOString().split("T")[0]),d.innerHTML=a[t.getDay()]+", "+t.getDate()+" "+r[t.getMonth()]+", kl 9-16",radioFieldOne.style.display="flex",l++),i>s&&($("#radioButtonTwo").val(i.toISOString().split("T")[0]),c.innerHTML=a[i.getDay()]+", "+i.getDate()+" "+r[i.getMonth()]+", kl 9-16",radioFieldTwo.style.display="flex",l++),n>s&&($("#radioButtonThree").val(n.toISOString().split("T")[0]),u.innerHTML=a[n.getDay()]+", "+n.getDate()+" "+r[n.getMonth()]+", kl 9-16",radioFieldThree.style.display="flex",l++),o>s&&($("#radioButtonFour").val(o.toISOString().split("T")[0]),m.innerHTML=a[o.getDay()]+", "+o.getDate()+" "+r[o.getMonth()]+", kl 9-16",radioFieldFour.style.display="flex",l++),l<2){radioFieldOne.style.display="none",radioFieldTwo.style.display="none",radioFieldThree.style.display="none",radioFieldFour.style.display="none";var g=new Date;g.setDate(s.getDate()+1),0==g.getDay()?g.setDate(g.getDate()+1):6==g.getDay()&&g.setDate(g.getDate()+2);var p=new Date(g);p.setDate(p.getDate()+1),6==p.getDay()&&p.setDate(p.getDate()+2),console.log("dayOne: ",g),console.log("dayTwo: ",p),$("#radioButtonOne").val(g.toISOString().split("T")[0]),d.innerHTML=a[g.getDay()]+", "+g.getDate()+" "+r[g.getMonth()]+", kl 9-16",radioFieldOne.style.display="flex",$("#radioButtonTwo").val(p.toISOString().split("T")[0]),c.innerHTML=a[p.getDay()]+", "+p.getDate()+" "+r[p.getMonth()]+", kl 9-16",radioFieldTwo.style.display="flex"}}(t),window.pickupFlowItemId=e,triggerPickupAnimation.click()}function d(e,t,i,n){e.checked?(db.collection("items").doc(t).update({bagReceived:!0}).then(e=>{console.log("Stored in DB that bag is received for item with ID: ",t)}),"Pickup"===n)?l(t,i,"flex"):"Service point"===n?(console.log("openServicePointToast"),changeToPickupButton.addEventListener("click",()=>{l(t,i)}),triggerServicePointToastOpen.click()):s(t,i):db.collection("items").doc(t).update({bagReceived:!1}).then(e=>{console.log("Stored in DB that bag is NOT received for item with ID: ",t)})}function c(e,t,i){return`<div class="w-form">
            <form method="get" name="wf-form-" id="bagReceivedForm">
                <label class="w-checkbox checkbox-field-3">
                    <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
                    <input type="checkbox" id="bagReceivedCheckbox-${e}" style="opacity:0;position:absolute;z-index:-1">
                    <span class="checkbox-label-3 w-form-label">Etiketten har kommit</span>
                </label>
            </form>
        </div>`}async function u(e){itemListSelling.innerHTML="",itemListSoldNotSent.innerHTML="",itemListSold.innerHTML="";var t=0;e.forEach(e=>{var i=e.id;e.data().createdAt;var n=e.data().soldDate,a=e.data().status,r=e.data().shippingStatus,u=e.data().brand,m=e.data().soldPrice,g=e.data().sellerGets?Math.ceil(e.data().sellerGets):e.data().sellerGets,p=e.data().buyer?.FirstName||e.data().buyerFirstName,f=e.data().buyer?.City||e.data().buyerAddressCity,v=e.data().minPriceEstimate,y=e.data().maxPriceEstimate,h=e.data().infoRequests,k=e.data().pickupDate,b=e.data().shippingMethod,T=e.data().postnordQrCode,w=e.data().dhlLicensePlateBarcodeSrc,x=e.data().bagReceived,D=e.data().soldPlatform,S=e.data().archived,I=e.data().holidayMode,E=e.data().longerPeriodAcceptedDate;e.data().images;var L=(0,o.itemCoverImage)(e.data());let B="",P=e.data().publishedDate;if(P){P=new Date(P);let e=Math.round((E?60:30)-(new Date().getTime()-P.getTime())/864e5);B=e<=0?"0 dagar kvar":`${e} dagar kvar`}void 0==S&&"Unsold"!=a&&function(){let e=window.location.origin+`/item?id=${i}`;if("Sold"!=a){let t="",i="";if("New"===a&&(h?.price?.status==="Active"?t=`<div class='text-block-34'>Inv\xe4ntar ditt svar</div>`:v&&y?(t=`<div class='text-block-34'>${v} - ${y} kr</div>`,i=`<div class='text-block-34'>F\xf6rbereds</div>`):t=`<div class='text-block-34'>V\xe4rdering p\xe5g\xe5r</div>`),"Published"===a&&v&&y){t=`<div class='text-block-34'>${v} - ${y} kr</div>`;let e=I?"Pausad":B;i=`<div class='text-block-34'>${e}</div>`}let n=`<div class="div-block-14"><a id="itemLinkBlock" href="${e}" class="link-block-18 w-inline-block"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${L}');"></div></div></div><div class="text-block-14">${u}</div>${t}${i}</a></div>`;itemListSelling.innerHTML+=n,myItemsDiv.style.display="block",noItemsDiv.style.display="none",headerSellItemButton.style.display="block",sellButtonText.innerHTML="Sälj ett plagg"}else if("Sold"==a&&"Sent"!=r){var o="";if(null!=p&&null!=f&&m){let e=`S\xe5ld till ${p} i ${f} f\xf6r ${m} kr`,t="";e.split(" ").forEach(function(i){t.trim().length>e.length/2&&!t.includes("<br>")&&(t+="<br>"),t+=i+" "}),t=t.trim(),o=`<div class="text-block-44">${t}</div>`}var S="",E="";let t="",a="";if("Service point"===b){if(w){let e;e=window.location.origin+`/ship-item?id=${i}`,S=`<a id="barcodeButton" href="${e}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/65418186f29682eaff3f74be_barcode-icon%20(1).svg" class="image-100">
                                            <div class="text-block-113">Visa streckkod</div>
                            </div>
                    </a>`,a="dhl"}else if("Vestiaire Collective"===D||"Grailed"===D)x||(S=c(i,n,b),setTimeout(()=>{document.getElementById(`bagReceivedCheckbox-${i}`).addEventListener("click",e=>{d(e.target,i,n,b)})},0));else if(T){let e;a="postnord",e=window.location.origin+`/ship-item?id=${i}`,S=`<a id="qrCodeButton" href="${e}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63bdeaf1af902f05607f86ef_Group.svg" class="image-43">
                                            <div class="text-block-113">Visa QR</div>
                            </div>
                    </a>`}}"Pickup"===b&&(x?x&&!k&&(S=`<a id="bookPickupButton-${i}" href="#" class="link-block-39">
                            <div class="div-block-194">
                                <div class="text-block-113">Boka h\xe4mtning</div>
                            </div>
                    </a>`,setTimeout(()=>{document.getElementById(`bookPickUpButton-${i}`).addEventListener("click",()=>{l(i,n)})},0)):(S=c(i,n,b),setTimeout(()=>{document.getElementById(`bagReceivedCheckbox-${i}`).addEventListener("click",e=>{d(e.target,i,n,b)})},0))),E=function(e,t,i,n,o,a){let r="",s=o&&(!o||"Pickup"!=t||n)?"":'<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63be70f55a4305a398cf918e_info-icon.svg" class="image-44">',l=window.location.origin+`/ship-item?id=${e}`;if("Service point"==t){let e="6297d3d527db5dd4cf02e924/6399ac2a3505ee6071fbc18a_Vector%20(1).svg";"postnord"===a&&(e="6297d3d527db5dd4cf02e924/655d182c37fc30df71b078cd_postnord-square-icon%20(1).svg"),"dhl"===a&&(e="6297d3d527db5dd4cf02e924/655d1830f259c0bc084c2937_dhl-square-icon%20(1).svg"),r+=`
                        <img src="https://global-uploads.webflow.com/${e}" class="shipper-icon">
                        <div class="next-step-text-small">L\xe4mnas till ombud</div>
                        ${s}
                    `}else if("Pickup"==t){if(n){var d=new Date(n),c=d.getDate(),u=["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"][d.getMonth()],m=["Sön","Mån","Tis","Ons","Tors","Fre","Lör"][d.getDay()];r+=`
                                <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                                <div class="next-step-text-small">${m+", "+c+" "+u+", kl 9-16"}</div>`}else r+=`
                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                            <div class="next-step-text-small">Upph\xe4mtning</div>
                            ${s}
                        `}return`
                        <a id="shipItemPageLink" href="${l}" class="link-block-40">
                                ${r}
                        </a>`}(i,b,0,k,x,a),x&&("Service point"===b||"Pickup"===b&&k)&&(E='<div class="spacing-15-px"></div>'+E,t+=`
          <a id="changeShippingMethodA-${i}" href="#">
              <div id="changeShippingMethod-${i}" class="change-shipping-method-text">\xc4ndra frakts\xe4tt</div>
          </a>`,setTimeout(()=>{document.getElementById(`changeShippingMethodA-${i}`).addEventListener("click",()=>{s(i,n)})},0));var P="";P=`<div class="div-block-118"><div class="div-block-45"><div class="div-block-43"><div class="ratio-box _16-9"><div class="content-block with-image"><a id="itemLinkFromSoldNotSentSection" href="${e}"><div class="img-container" style="background-image: url('${L}');"></div></a></div></div></div><div class="div-block-46"><div class="div-block-47"><div class="text-block-43">Du f\xe5r ${g} kr</div>${o}
                      ${S}
                      ${E}
                      ${t}
                  </div></div></div></div>`,itemListSoldNotSent.innerHTML+=P,soldNotSentDiv.style.display="block",noItemsDiv.style.display="none",headerSellItemButton.style.display="block",sellButtonText.innerHTML="Sälj ett plagg"}else{var M=`<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><a id="itemLinkFromSoldBeforeSection" href="${e}"><div class="img-container" style="background-image: url('${L}');"></div></a></div></div><div class="text-block-14">${m} kr</div><div class='text-block-34'>Du fick ${g} kr</div></div>`;itemListSold.innerHTML+=M,soldItemsDiv.style.display="block",itemListSoldContainer.style.display="block",sellButtonText.innerHTML="Sälj ett plagg",t+=g,youEarnedDiv.innerHTML=`Du har tj\xe4nat ${Math.round(t).toLocaleString("en-US").replaceAll(","," ")} kr`}}()}),loadingDiv.style.display="none",sectionsDiv.style.display="block",quickInfoDiv.style.display="block"}},{"./general":"1tOWF","./private":"flS2m","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}]},["flS2m"],"flS2m","parcelRequire81ca");
//# sourceMappingURL=private.js.map
