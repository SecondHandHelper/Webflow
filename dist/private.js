!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,i,o){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r="function"==typeof a[i]&&a[i],s=r.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!s[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var o="function"==typeof a[i]&&a[i];if(!n&&o)return o(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(r)return r(t,!0);// Try the node require function if it exists.
if(l&&"string"==typeof t)return l(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(n){var i=e[t][1][n];return null!=i?i:n},m.cache={};var u=s[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return s[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=s,d.parent=r,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return a[i]}}),a[i]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):o&&(this[o]=u)}}({flS2m:[function(e,t,n){var i,o,a,r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"updateIC",()=>c),r.export(n,"closePickupToast",()=>v);var s=e("./general"),l=e("./infoRequestsFunctions"),d=e("./loadItemCards");function c(e,t,n){let i=t,o=n;null===i&&(i=""),null===o&&(o=""),window.intercomSettings={app_id:"klyy0le5",user_id:`${e}`},db.collection("users").doc(e).get().then(t=>{if(t.exists){let a=t.data(),r="",s="";if(a.addressFirstName){let e=a.addressFirstName,t=a.addressLastName;r=e+" "+t,s=a.addressCity}a.phoneNumber&&(o=a.phoneNumber);// Update intercom
var n={mai_user_id:`${e}`,user_id:`${e}`,phone:`${o}`,email:`${i}`,name:`${r}`,city:`${s}`};Intercom("update",n)}else console.log("No such user document exist!")}).catch(e=>{errorHandler.report(e),console.log("Error getting document:",e)})}async function u(){let e=await firebase.app().functions("europe-west1").httpsCallable("maxNumBags")();e?.data?.maxOrderBags>0&&(document.getElementById("orderBagsSection").style.display="block")}async function m(e){let t,n="",i="",o=!0,a=!1,r=!1,s=!1;// First, get items with status "Sold" and shippingStatus "Not sent"
await db.collection("items").where("user","==",e).where("status","==","Sold").orderBy("soldDate").get().then(e=>{e.forEach(e=>{e.data().status,n=e.data().shippingStatus;let t=e.data().payoutStatus;"Not sent"===n&&(r=!0),"Payed"!==t&&(a=!0)})}),// Second, check if user has no address or personal id added yet
await db.collection("users").doc(e).get().then(e=>{i=e.data().addressFirstName,t=e.data().personalId;let n=e.data()?.preferences?.shippingMethod;t?""===t&&(o=!1):o=!1,"Pickup"==n&&(s=!0)}),!0==r&&void 0==i&&s&&(location.href="/address-form"),!0==a&&!1==o&&(location.href="/personal-id-form")}async function g(){var e,t;let n,r,g,v,y;if(console.log("privateMain running"),!user.current)return;i=authUser.current.uid,o=authUser.current.email||sessionStorage.getItem("email"),a=authUser.current.phoneNumber||sessionStorage.getItem("phoneNumber"),c(i,o,a),m(i),e=i,(t=document.getElementById("itemListSoldByOthers")).innerHTML="",// SOLD BY OTHERS QUERY + Add cards to list
db.collection("items").where("status","==","Sold").orderBy("soldDate","desc").limit(30).get().then(n=>{n.forEach(n=>{var i=n.data().user,o=n.data().brand,a=n.data().soldPrice,r=(0,s.itemCoverImage)(n.data());// Add card to list if seller is other than myself
if(i!=e&&a>=200){var l=`<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${r}');"></div></div></div><div class="text-block-14">${a} kr</div><div class='text-block-34'>${o}</div></div>`;t.innerHTML+=l}})}),soldByOthersDiv.style.display="block",setPreferredLogInMethodCookie(authUser.current.providerData[0].providerId),"3OkW5av20HP8ScpUDS8ip9fBEZr1"===i&&window.location.origin.includes("shh-test")&&(i="P9fYQomeZBW3jnYjnLFKurAJXYF3"),//Yearly Summary
p(i).then(e=>{e?(console.log("Yearly data exist!"),document.getElementById("yearlySummaryDiv").style.display="block",document.getElementById("yearlySummaryDiv").addEventListener("click",function(){location.href=`/2023withmai?id=${i.substring(0,10)}`})):console.log("No yearly summary exist!")});let h=await getItems(i);f(h),n=10,r=0,g=!1,v=!!(user.current?.elementViews&&user.current.elementViews.some(e=>"inviteToast"===e.elementID)),h&&h.forEach(e=>{e.id;var t=e.data();let i=t.soldDate,o=t.status,a=t.shippingStatus,s=t.archived;if(!s&&"Sold"===o&&i){if(r++,i){i=new Date(i);let e=Math.floor((new Date().getTime()-i.getTime())/864e5);e<=n&&(n=e)}"Sent"!==a&&(g=!0)}}),n<=3&&r>=2&&g&&user.current?.referralData?.referralCode&&!v&&(referralCodeText.innerHTML=user.current.referralData.referralCode,triggerInviteToastOpen.click(),// Store elementViews to be able to not show it again
db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"inviteToast",timestamp:new Date})}),// Track with segment
analytics.track("Element Viewed",{elementID:"inviteToast"})),user.current?.referralData?.referralCode&&(referralCodeText.innerHTML=user.current.referralData.referralCode,headerInviteButton.style.display="flex",menuInviteLink.style.display="block");let k=checkCookie("invite");k&&await connectReferralUsers(k);// Set invite code cookie
let b=checkCookie("photo_invite");b&&!localStorage.getItem("photoShootBooked")&&(photoShootOffer.style.display="block",bonusSection.style.display="block"),showBonusSection(),authUser.current.phoneNumber?y=authUser.current.phoneNumber:authUser.current.email&&(y=authUser.current.email),y&&(account.innerHTML=y,account.style.display="block"),user.current.addressFirstName&&user.current.addressLastName&&(accountName.innerHTML=user.current.addressFirstName+" "+user.current.addressLastName,accountName.style.display="block"),(0,d.loadItemCards)(h),(0,l.loadInfoRequests)(i),u(),showReferralSection(),user.current&&user.current.addressFirstName&&user.current.addressLastName&&!user.current?.referralData?.referralCode&&await createReferralCode()}async function p(e){let t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e})},n=await fetch("https://europe-west3-second-hand-helper.cloudfunctions.net/yearlyData",t);if(!n.ok)throw Error("Network response was not ok.");let i=await n.json(),o=i.data;return!!o.sold}async function f(e){if(!user)return;let t=new Date,n=0,i=0,o=user.current?.elementViews?user.current.elementViews.reverse().find(e=>"npsSurvey"===e.elementID):null,a=o?o.timestamp.toDate():null,r=a?Math.floor((t.getTime()-a.getTime())/864e5):null;e&&e.forEach(e=>{let o=e.data();if(o.publishedDate&&!o.archived){let e=new Date(o.publishedDate),a=Math.floor((t.getTime()-e.getTime())/864e5);a>n&&(n=a),(a<i||0===i&&a>0)&&(i=a)}}),n>=25&&i<=60&&(!a||r>90)&&!document.referrer.includes("feedback-nps")&&(location.href="/feedback-nps")}function v(){document.getElementById("triggerPickupToastClose").click()}function y(){document.getElementById("triggerFeedbackFormClose").click(),setTimeout(function(){location.reload()},400)}async function h(){let e="";for(var t=document.getElementsByName("Pickup"),n=0;n<t.length;n++)t[n].checked&&(e=t[n].value);// yyyy--mm-dd
db.collection("items").doc(pickupFlowItemId).update({pickupDate:e,shippingMethod:"Pickup"}).then(t=>{console.log(`pickupDate '${e}' and shippingMethod 'Pickup' is now updated on Firestore item`),v(),document.getElementById("triggerFeedbackFormOpen").click()})}async function k(e){let t=db.collection("items").doc(pickupFlowItemId);await t.update({happinessRate:e}).then(function(){console.log("happinessRate is now set on Firestore item"),happinessQuestionDiv.style.display="none",openQuestionDiv.style.display="block",feedbackSubmitButton.style.display="block"})}async function b(){let e=feedbackTextField.value,t=db.collection("items").doc(pickupFlowItemId);await t.update({feedbackText:e}).then(function(){console.log("feedbackText is now set on Firestore item"),y()})}checkCookie("invite"),localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),console.log(`user ${user.current}`),user.whenSet(g),//Disable webflow form submissions
Webflow.push(function(){$("form").submit(function(){return!1})});let x=!1;function T(){console.log("onLoadHandler running"),menuSignoutButton.addEventListener("click",s.signOut),bookPickupForm.addEventListener("submit",h),closePickupToastIcon.addEventListener("click",v),closeFeedbackFormButton.addEventListener("click",y),happySmileyButton.addEventListener("click",function(){k(3)},!1),neutralSmileyButton.addEventListener("click",function(){k(2)},!1),angrySmileyButton.addEventListener("click",function(){k(1)},!1),feedbackSubmitButton.addEventListener("click",b),saveReferralCodeButton.addEventListener("click",async function(){saveRefCodeLoadingDiv.style.display="flex",saveReferralCodeButton.style.display="none";let e=referralCodeInput.value;await connectReferralUsers(e)}),closeMeasurementsToastButton.addEventListener("click",function(){triggerMeasurementsToastClose.click()}),closeNewPriceToastButton.addEventListener("click",function(){triggerNewPriceToastClose.click()}),closeInviteToastButton.addEventListener("click",function(){triggerInviteToastClose.click()}),closeServicePointToastButton.addEventListener("click",function(){triggerServicePointToastClose.click()}),confirmServicePointButton.addEventListener("click",function(){document.getElementById("feedbackFormTitle").innerHTML="",triggerServicePointToastClose.click(),triggerFeedbackFormOpen.click()}),closeLongerPeriodToastButton.addEventListener("click",function(){triggerLongerPeriodToastClose.click()}),shareCodeButton.addEventListener("click",s.shareCode),sharePersonalLinkButton.addEventListener("click",s.shareCode),x=!0,menuButton.addEventListener("click",function(){Intercom("update",{hide_default_launcher:!0})}),closeMenuButton.addEventListener("click",function(){Intercom("update",{hide_default_launcher:!1})}),document.getElementById("christmasHolidayDiv").onclick=()=>Intercom("showNewMessage","N\xe4r reser du iv\xe4g, och n\xe4r \xe4r du tillbaka?\n\n")}window.addEventListener("load",T),console.log(`document.readyState ${document.readyState}`),"complete"!==document.readyState||x||(console.log("Running it since event listener did not"),T()),window.addEventListener("pageshow",e=>{e.persisted?(console.log("This page was restored from the bfcache."),"none"!==menu.style.display&&(menu.style.display="none")):console.log("This page was loaded normally.")}),window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var n=document,i=function(){i.c(arguments)};i.q=[],i.c=function(e){i.q.push(e)},e.Intercom=i;var o=function(){var e=n.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=n.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",o):e.addEventListener("load",o,!1)}}()},{"./general":"1tOWF","./infoRequestsFunctions":"21npA","./loadItemCards":"dxOtH","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"1tOWF":[function(e,t,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,location.href="/",deleteCookie("maiAuth")}).catch(e=>{errorHandler.report(e),console.log(e)})}function a(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function r(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,i=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,r=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",i=i?i.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:i,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:r=r?r.trim():""}}function s(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function l(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function d(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function c(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}i.defineInteropFlag(n),i.export(n,"signOut",()=>o),i.export(n,"setFormAddressFields",()=>a),i.export(n,"getFormAddressFields",()=>r),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
i.export(n,"isValidSwedishSsn",()=>s),i.export(n,"formatPersonalId",()=>l),i.export(n,"itemCoverImage",()=>d),i.export(n,"shareCode",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||t.hasOwnProperty(n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}],"21npA":[function(e,t,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"loadInfoRequests",()=>d);var o=e("./general");async function a(e,t){measurementDescriptionText.innerHTML=t,measurementsSubmitButton.addEventListener("click",async function(){let t=measurementsInput.value;t.length>0&&" "!==t&&await db.collection("items").doc(e).update({measurements:t,"infoRequests.measurements.status":"Resolved"}),triggerMeasurementsToastClose.click(),setTimeout(function(){location.reload()},400)}),triggerMeasurementsToastOpen.click()}async function r(e,t,n,i){if(!e)return;console.log("is this happening?");let o=10*Math.ceil(.7*n/10),a=10*Math.ceil(.8*n/10);priceAfterDiscount30.innerHTML=`(Priset blir ${o} kr)`,priceAfterDiscount20.innerHTML=`(Priset blir ${a} kr)`,priceNoDiscount.innerHTML=`(${n} kr)`,n>=140&&!i?(longerPeriodDescriptionText.innerHTML=`S\xe4ljperioden f\xf6r ditt ${t}-plagg har n\xe5tt sitt slut. V\xe4lj om du vill f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar och om du vill s\xe4nka priset f\xf6r att \xf6ka chansen att f\xe5 det s\xe5lt.`,discountFormDiv.style.display="block"):(longerPeriodDescriptionText.innerHTML=`S\xe4ljperioden f\xf6r ditt ${t}-plagg har n\xe5tt sitt slut. Vill du f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar eller avsluta f\xf6rs\xe4ljningen?`,discountFormDiv.style.display="none"),// Accept longer selling window and store chosen discount
longerPeriodAcceptButton.addEventListener("click",async function(){let t=new Date,i=t.toISOString().split("T")[0],r=n,s=0;for(var l=document.getElementsByName("Discount"),d=0;d<l.length;d++)if(l[d].checked){let e=l[d].value;"30"===e&&(r=o,s=30),"20"===e&&(r=a,s=20)}await db.collection("items").doc(e).update({longerPeriodAcceptedDate:i,"infoRequests.longerPeriod.status":"Resolved","infoRequests.longerPeriod.response":"Accepted",longerPeriodAcceptedDiscount:s,minPriceEstimate:r}),triggerLongerPeriodToastClose.click(),setTimeout(function(){location.reload()},300)}),// Decline longer selling period and quit sales
longerPeriodDenyButton.addEventListener("click",async function(){await db.collection("items").doc(e).update({"infoRequests.longerPeriod.status":"Resolved","infoRequests.longerPeriod.response":"Denied",status:"Unsold"// This field is normally mastered by AT - I do this for the user to see the effect immediately (the card is removed)
}),triggerLongerPeriodToastClose.click(),setTimeout(function(){location.reload()},300)}),triggerLongerPeriodToastOpen.click()}async function s(e,t,n,i,o){// Deny price
if(console.log("storePriceResponse",e,t,n,i),"Accepted"===i&&await db.collection("items").doc(e).update({"infoRequests.price.status":"Resolved","infoRequests.price.response":"Accepted",maxPriceEstimate:t,minPriceEstimate:n}).then(function(){triggerNewPriceToastClose.click(),setTimeout(function(){location.reload()},300)}),"Denied"===i){let t={"infoRequests.price.status":"Resolved","infoRequests.price.response":"Denied"};"New"===o&&(t.archived=!0,t.willNotSell=!0),await db.collection("items").doc(e).update(t).then(function(){triggerNewPriceToastClose.click(),setTimeout(function(){location.reload()},300)})}}async function l(e,t,n,i,o,a,r,l,d,c){console.log("openNewPriceToast",e,t,n,i,o,a,r,l,d,c),previousMinPrice.style.display="none",previousMaxPrice.style.display="none",maxPriceDiv.style.display="block",minPriceDiv.style.display="block",// Set content of toast
newPriceToastTitle.innerHTML="Nytt l\xe4gsta pris",newPriceHeading.innerHTML=`${o}-plagg`;let u=r.toLowerCase();u&&"null"!==u&&(newPriceHeading.innerHTML=`${o}-${u}`),maxPrice.innerHTML=n,minPrice.innerHTML=i,d&&"null"!==d&&""!==d&&"undefined"!==d&&n!==d&&(previousMaxPrice.innerHTML=d,previousMaxPrice.style.display="block"),c&&"null"!==c&&""!==c&&"undefined"!==c&&i!==c&&(previousMinPrice.innerHTML=c,previousMinPrice.style.display="block"),acceptNewPriceButton.innerHTML="S\xe4lj med nytt pris",denyNewPriceButton.innerHTML="S\xe4nk ej","New"===t&&"Valuation"===l&&(newPriceToastTitle.innerHTML="V\xe4rdering",acceptNewPriceButton.innerHTML="S\xe4lj till v\xe4rdering",denyNewPriceButton.innerHTML="Avb\xf6j och avsluta"),"Adjusted ML Valuation"===l&&(newPriceToastTitle.innerHTML="Nytt prisintervall"),"Valuation"!==l&&"Adjusted ML Valuation"!==l&&(minPrice.innerHTML=`${i} kr`,maxPriceDiv.style.display="none"),a&&"undefined"!==a&&""!==a&&"null"!==a&&(newPriceText.innerHTML=a,descriptionDiv.style.display="block"),acceptNewPriceButton.addEventListener("click",()=>{s(e,n,i,"Accepted",t)}),denyNewPriceButton.addEventListener("click",()=>{s(e,n,i,"Denied",t)}),// Open toast
triggerNewPriceToastOpen.click()}function d(e){let t=document.getElementById("infoRequestMeasurementsTemplate").cloneNode(!0),n=document.getElementById("infoRequestLongerPeriodTemplate").cloneNode(!0),i=document.getElementById("infoRequestImagesTemplate").cloneNode(!0),s=document.getElementById("infoRequestValuationTemplate").cloneNode(!0),d=document.getElementById("infoRequestsList");d.replaceChildren(),db.collection("items").where("user","==",e).get().then(e=>{e.forEach(e=>{let c=e.id,u=e.data(),m=u.infoRequests,g=u.status,p=u.brand.replace(/'/g,""),f=u.minPriceEstimate,v=u.maxPriceEstimate,y=u?.infoRequests?.price?.response==="Denied",h=u.archived,k=u.category,b=(0,o.itemCoverImage)(u);void 0==h&&"Unsold"!==g&&"Sold"!==g&&m&&function(){for(let e in m)if(m[e]?.status==="Active"){let o=m[e].description;// PRICE REQUEST
if(o&&(o=o.replace(/'/g,"")),"price"===e){let t=m[e].type,n=s.cloneNode(!0);n.id=`infoRequestPrice-${c}`,n.querySelector(".img-container").style.backgroundImage=`url('${b}')`,n.querySelector("a .pricebuttontext").innerText="Se prisf\xf6rslag",n.querySelector(".text-block-72").innerText="Vill du s\xe4nka priset och f\xe5 det s\xe5lt?",d.appendChild(n),"New"===g&&"Adjusted ML Valuation"!==t?(n.querySelector("a .pricebuttontext").innerText="Se v\xe4rdering",n.querySelector(".text-block-72").innerText="Vill du s\xe4lja till v\xe5r v\xe4rdering?",n.querySelector("a").href=`/item-valuation?id=${c}`):setTimeout(()=>{let n=m[e].maxPrice,i=m[e].minPrice;document.querySelector(`#infoRequestPrice-${c} a`).addEventListener("click",async()=>{await l(c,g,n,i,p,o,k,t,v,f)})},0)}// MEASUREMENTS REQUEST
if("measurements"===e){let e=t.cloneNode(!0);e.id=`infoRequestMeasurements-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${b}')`,d.appendChild(e),setTimeout(()=>{document.querySelector(`#infoRequestMeasurements-${c} a`).addEventListener("click",async()=>{await a(c,o)})},0)}// IMAGES REQUEST
if("images"===e){let e=i.cloneNode(!0);e.id=`infoRequestImages-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${b}')`,e.querySelector("a").href=`/edit-item?id=${c}`,d.appendChild(e)}// LONGER PERIOD REQUEST
if("longerPeriod"===e){let e=n.cloneNode(!0);e.id=`infoRequestLongerPeriod-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${b}')`,d.appendChild(e),setTimeout(()=>{document.querySelector(`#infoRequestLongerPeriod-${c} a`).addEventListener("click",async()=>{await r(c,p,f,y)})},0)}infoRequestsDiv.style.display="block"}}()})})}},{"./general":"1tOWF","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],dxOtH:[function(e,t,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"loadItemCards",()=>u);var o=e("./general"),a=e("./private");async function r(e,t){console.log(`storeShippingMethod(${e}, ${t}) is running`),await db.collection("items").doc(e).update({shippingMethod:t}).then(n=>{console.log(`Shipping method '${t}' stored on item with ID: `,e),window.pickupFlowItemId=e,"Service point"==t&&(document.getElementById("feedbackFormTitle").innerHTML="Tack, d\xe5 vet vi att paketet snart l\xe4mnas till ett ombud.",document.getElementById("triggerShippingToastClose").click()),(0,a.closePickupToast)(),document.getElementById("triggerFeedbackFormOpen").click()})}function s(e,t){console.log(`openShippingToast(${e}, ${t})`),window.pickupFlowItemId=e,setTimeout(()=>{document.getElementById("servicePointButton").addEventListener("click",async()=>{await r(e,"Service point")}),document.getElementById("bookPickupButton").addEventListener("click",()=>{l(e,t)})},0),triggerShippingToastOpen.click()}function l(e,t,n="none"){console.log(`openPickupToast(${e}, ${t}) is running`),triggerShippingToastClose.click(),triggerServicePointToastClose.click(),changeToServicePointButton.addEventListener("click",async()=>{await r(e,"Service point")}),changeToServicePointButton.style.display=n,function(e){console.log(`setDatesOfPickupToast(${e}) is running`),// Hide all options first, to later determine which ones to show
radioFieldOne.style.display="none",radioFieldTwo.style.display="none",radioFieldThree.style.display="none",radioFieldFour.style.display="none";// Create the 4 first possible pickup dates, starting 4 b-days after soldDate
var t=new Date(e);t.setTime(t.getTime()+36e5),t.setDate(t.getDate()+4),6==t.getDay()||0==t.getDay()||1==t.getDay()||2==t.getDay()?t.setDate(t.getDate()+2):3==t.getDay()&&t.setDate(t.getDate()+1);var n=new Date(t);n.setDate(n.getDate()+1),6==n.getDay()&&n.setDate(n.getDate()+2);var i=new Date(n);i.setDate(i.getDate()+1),6==i.getDay()&&i.setDate(i.getDate()+2);var o=new Date(i);o.setDate(o.getDate()+1),6==o.getDay()&&o.setDate(o.getDate()+2);var a=["S\xf6ndag","M\xe5ndag","Tisdag","Onsdag","Torsdag","Fredag","L\xf6rdag"],r=["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"];// Change value of radio buttons and display to user
let s=new Date,l=0;console.log("Today",s),console.log("firstDate > today",t>s),console.log("secondDate > today",n>s),console.log("thirdDate > today",i>s),console.log("forthDate > today",o>s);let d=document.getElementById("pickupDateOne"),c=document.getElementById("pickupDateTwo"),u=document.getElementById("pickupDateThree"),m=document.getElementById("pickupDateFour");// If less than two options displayed, add at least two options
if(t>s&&($("#radioButtonOne").val(t.toISOString().split("T")[0]),d.innerHTML=a[t.getDay()]+", "+t.getDate()+" "+r[t.getMonth()]+", kl 9-16",radioFieldOne.style.display="flex",l++),n>s&&($("#radioButtonTwo").val(n.toISOString().split("T")[0]),c.innerHTML=a[n.getDay()]+", "+n.getDate()+" "+r[n.getMonth()]+", kl 9-16",radioFieldTwo.style.display="flex",l++),i>s&&($("#radioButtonThree").val(i.toISOString().split("T")[0]),u.innerHTML=a[i.getDay()]+", "+i.getDate()+" "+r[i.getMonth()]+", kl 9-16",radioFieldThree.style.display="flex",l++),o>s&&($("#radioButtonFour").val(o.toISOString().split("T")[0]),m.innerHTML=a[o.getDay()]+", "+o.getDate()+" "+r[o.getMonth()]+", kl 9-16",radioFieldFour.style.display="flex",l++),l<2){radioFieldOne.style.display="none",radioFieldTwo.style.display="none",radioFieldThree.style.display="none",radioFieldFour.style.display="none";var g=new Date;g.setDate(s.getDate()+1),0==g.getDay()?g.setDate(g.getDate()+1):6==g.getDay()&&g.setDate(g.getDate()+2);var p=new Date(g);p.setDate(p.getDate()+1),6==p.getDay()&&p.setDate(p.getDate()+2),console.log("dayOne: ",g),console.log("dayTwo: ",p),// Show tomorrow as an option
$("#radioButtonOne").val(g.toISOString().split("T")[0]),d.innerHTML=a[g.getDay()]+", "+g.getDate()+" "+r[g.getMonth()]+", kl 9-16",radioFieldOne.style.display="flex",// Show day after tomorrow as an option
$("#radioButtonTwo").val(p.toISOString().split("T")[0]),c.innerHTML=a[p.getDay()]+", "+p.getDate()+" "+r[p.getMonth()]+", kl 9-16",radioFieldTwo.style.display="flex"}}(t),window.pickupFlowItemId=e,triggerPickupAnimation.click()}function d(e,t,n,i){e.checked?(db.collection("items").doc(t).update({bagReceived:!0}).then(e=>{console.log("Stored in DB that bag is received for item with ID: ",t)}),"Pickup"===i)?l(t,n,"flex"):"Service point"===i?(console.log("openServicePointToast"),changeToPickupButton.addEventListener("click",()=>{l(t,n)}),triggerServicePointToastOpen.click()):s(t,n):db.collection("items").doc(t).update({bagReceived:!1}).then(e=>{console.log("Stored in DB that bag is NOT received for item with ID: ",t)})}function c(e,t,n){let i=`<div class="w-form">
            <form method="get" name="wf-form-" id="bagReceivedForm">
                <label class="w-checkbox checkbox-field-3">
                    <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
                    <input type="checkbox" id="bagReceivedCheckbox-${e}" style="opacity:0;position:absolute;z-index:-1">
                    <span class="checkbox-label-3 w-form-label">Etiketten har kommit</span>
                </label>
            </form>
        </div>`;return i}async function u(e){itemListSelling.innerHTML="",itemListSoldNotSent.innerHTML="",itemListSold.innerHTML="";var t=0;e.forEach(e=>{var n=e.id;e.data().createdAt;var i=e.data().soldDate,a=e.data().status,r=e.data().shippingStatus,u=e.data().brand,m=e.data().soldPrice,g=e.data().sellerGets?Math.ceil(e.data().sellerGets):e.data().sellerGets,p=e.data().buyer?.FirstName||e.data().buyerFirstName,f=e.data().buyer?.City||e.data().buyerAddressCity,v=e.data().minPriceEstimate,y=e.data().maxPriceEstimate,h=e.data().infoRequests,k=e.data().pickupDate,b=e.data().shippingMethod,x=e.data().postnordQrCode,T=e.data().dhlLicensePlateBarcodeSrc,w=e.data().bagReceived,D=e.data().soldPlatform,S=e.data().archived,I=e.data().holidayMode,E=e.data().longerPeriodAcceptedDate;e.data().images;var L=(0,o.itemCoverImage)(e.data());let B="",P=e.data().publishedDate;if(P){P=new Date(P);let e=Math.round((E?60:30)-(new Date().getTime()-P.getTime())/864e5);B=e<=0?"0 dagar kvar":`${e} dagar kvar`}void 0==S&&"Unsold"!=a&&function(){//Putting the items in the right list
let e=window.location.origin+`/item?id=${n}`;// WE SELL RIGHT NOW
if("Sold"!=a){let t="",n="";if("New"===a&&(h?.price?.status==="Active"?t=`<div class='text-block-34'>Inv\xe4ntar ditt svar</div>`:v&&y?(t=`<div class='text-block-34'>${v} - ${y} kr</div>`,n=`<div class='text-block-34'>F\xf6rbereds</div>`):t=`<div class='text-block-34'>V\xe4rdering p\xe5g\xe5r</div>`),"Published"===a&&v&&y){t=`<div class='text-block-34'>${v} - ${y} kr</div>`;let e=I?"Pausad":B;n=`<div class='text-block-34'>${e}</div>`}let i=`<div class="div-block-14"><a id="itemLinkBlock" href="${e}" class="link-block-18 w-inline-block"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${L}');"></div></div></div><div class="text-block-14">${u}</div>${t}${n}</a></div>`;itemListSelling.innerHTML+=i,//Display list
myItemsDiv.style.display="block",//Hide empty state
noItemsDiv.style.display="none",headerSellItemButton.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg";// SOLD - NOT SENT
}else if("Sold"==a&&"Sent"!=r){// Prepare card
var o="";if(null!=p&&null!=f&&m){let e=`S\xe5ld till ${p} i ${f} f\xf6r ${m} kr`,t="",n=e.split(" ");n.forEach(function(n){t.trim().length>e.length/2&&!t.includes("<br>")&&(t+="<br>"),t+=n+" "}),t=t.trim(),o=`<div class="text-block-44">${t}</div>`}var S="",E="";let t="",a="";"Service point"===b&&(T?(S=function(e){let t=window.location.origin+`/ship-item?id=${e}`,n=`<a id="barcodeButton" href="${t}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/65418186f29682eaff3f74be_barcode-icon%20(1).svg" class="image-100">
                                            <div class="text-block-113">Visa streckkod</div>
                            </div>
                    </a>`;return n}(n),a="dhl"):"Vestiaire Collective"===D||"Grailed"===D?w||(S=c(n,i,b),setTimeout(()=>{document.getElementById(`bagReceivedCheckbox-${n}`).addEventListener("click",e=>{d(e.target,n,i,b)})},0)):x&&(a="postnord",S=function(e){let t=window.location.origin+`/ship-item?id=${e}`,n=`<a id="qrCodeButton" href="${t}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63bdeaf1af902f05607f86ef_Group.svg" class="image-43">
                                            <div class="text-block-113">Visa QR</div>
                            </div>
                    </a>`;return n}(n))),"Pickup"===b&&(w?w&&!k&&(S=function(e){let t=`<a id="bookPickupButton-${e}" href="#" class="link-block-39">
                            <div class="div-block-194">
                                <div class="text-block-113">Boka h\xe4mtning</div>
                            </div>
                    </a>`;return t}(n),setTimeout(()=>{document.getElementById(`bookPickUpButton-${n}`).addEventListener("click",()=>{l(n,i)})},0)):(S=c(n,i,b),setTimeout(()=>{document.getElementById(`bagReceivedCheckbox-${n}`).addEventListener("click",e=>{d(e.target,n,i,b)})},0))),// Always show the 'shippingInfoDiv' - Styling depending on state is set in the function
E=function(e,t,n,i,o,a){let r="",s=o&&(!o||"Pickup"!=t||i)?"":'<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63be70f55a4305a398cf918e_info-icon.svg" class="image-44">',l=window.location.origin+`/ship-item?id=${e}`;if("Service point"==t){let e="6297d3d527db5dd4cf02e924/6399ac2a3505ee6071fbc18a_Vector%20(1).svg";"postnord"===a&&(e="6297d3d527db5dd4cf02e924/655d182c37fc30df71b078cd_postnord-square-icon%20(1).svg"),"dhl"===a&&(e="6297d3d527db5dd4cf02e924/655d1830f259c0bc084c2937_dhl-square-icon%20(1).svg"),r+=`
                        <img src="https://global-uploads.webflow.com/${e}" class="shipper-icon">
                        <div class="next-step-text-small">L\xe4mnas till ombud</div>
                        ${s}
                    `}else if("Pickup"==t){if(i){var d=new Date(i),c=d.getDate(),u=["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"][d.getMonth()],m=["S\xf6n","M\xe5n","Tis","Ons","Tors","Fre","L\xf6r"][d.getDay()];r+=`
                                <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                                <div class="next-step-text-small">${m+", "+c+" "+u+", kl 9-16"}</div>`}else r+=`
                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                            <div class="next-step-text-small">Upph\xe4mtning</div>
                            ${s}
                        `}// Turn shipping info into a link to ship item page
let g=`
                        <a id="shipItemPageLink" href="${l}" class="link-block-40">
                                ${r}
                        </a>`;return g}(n,b,0,k,w,a),w&&("Service point"===b||"Pickup"===b&&k)&&(E='<div class="spacing-15-px"></div>'+E,t+=`
          <a id="changeShippingMethodA-${n}" href="#">
              <div id="changeShippingMethod-${n}" class="change-shipping-method-text">\xc4ndra frakts\xe4tt</div>
          </a>`,setTimeout(()=>{document.getElementById(`changeShippingMethodA-${n}`).addEventListener("click",()=>{s(n,i)})},0));//Create card
var P="";P=`<div class="div-block-118"><div class="div-block-45"><div class="div-block-43"><div class="ratio-box _16-9"><div class="content-block with-image"><a id="itemLinkFromSoldNotSentSection" href="${e}"><div class="img-container" style="background-image: url('${L}');"></div></a></div></div></div><div class="div-block-46"><div class="div-block-47"><div class="text-block-43">Du f\xe5r ${g} kr</div>${o}
                      ${S}
                      ${E}
                      ${t}
                  </div></div></div></div>`,itemListSoldNotSent.innerHTML+=P,// Display list
soldNotSentDiv.style.display="block",// Hide empty state
noItemsDiv.style.display="none",headerSellItemButton.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg";// SOLD BEFORE
}else{var M=`<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><a id="itemLinkFromSoldBeforeSection" href="${e}"><div class="img-container" style="background-image: url('${L}');"></div></a></div></div><div class="text-block-14">${m} kr</div><div class='text-block-34'>Du fick ${g} kr</div></div>`;itemListSold.innerHTML+=M,// Display list, hide empty state
soldItemsDiv.style.display="block",itemListSoldContainer.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg",t+=g,youEarnedDiv.innerHTML=`Du har tj\xe4nat ${Math.round(t).toLocaleString("en-US").replaceAll(","," ")} kr`}}()}),loadingDiv.style.display="none",sectionsDiv.style.display="block",quickInfoDiv.style.display="block"}},{"./general":"1tOWF","./private":"flS2m","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}]},["flS2m"],"flS2m","parcelRequire81ca")//# sourceMappingURL=private.js.map
;
//# sourceMappingURL=private.js.map
