!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,r,i){/* eslint-disable no-undef */var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof o[r]&&o[r],l=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!l[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var i="function"==typeof o[r]&&o[r];if(!n&&i)return i(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(a)return a(t,!0);// Try the node require function if it exists.
if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},m.cache={};var u=l[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return l[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=a,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return o[r]}}),o[r]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):i&&(this[i]=u)}}({flS2m:[function(e,t,n){var r,i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),// async function initAppDownloadBanner() {
//   const customToken = await callBackendApi('/api/users/token', { method: 'POST', requiresAuth: true });
//   document.getElementById('openAppAndSignIn').href = 'maiapp://?aat=' + encodeURIComponent(customToken.data.customToken);
// }
// initAppDownloadBanner();
// setInterval(initAppDownloadBanner, 10 * 60 * 1000);
i.export(n,"updateIC",()=>c),i.export(n,"prepareMenu",()=>u),i.export(n,"closePickupToast",()=>w);var o=e("./general"),a=e("./infoRequestsFunctions"),l=e("./loadItemCards"),s=e("qrcode"),d=i.interopDefault(s);function c(e,t,n){let r=t,i=n;null===r&&(r=""),null===i&&(i=""),window.intercomSettings={app_id:"klyy0le5",user_id:`${e}`},db.collection("users").doc(e).get().then(t=>{if(t.exists){let o=t.data(),a="",l="";if(o.addressFirstName){let e=o.addressFirstName,t=o.addressLastName;a=e+" "+t,l=o.addressCity}o.phoneNumber&&(i=o.phoneNumber);// Update intercom
var n={mai_user_id:`${e}`,user_id:`${e}`,phone:`${i}`,email:`${r}`,name:`${a}`,city:`${l}`};Intercom("update",n)}else console.log("No such user document exist!")}).catch(e=>{errorHandler.report(e),console.log("Error getting document:",e)})}function u(e){let t,n;console.log("Prepare menu",e.signInMethod),"phone"===e.signInMethod&&e.phoneNumber?(t=e.phoneNumber,n="Inloggad med SMS-kod"):"password"===e.signInMethod&&e.email?(t=e.email,n="Inloggad med email"):"google.com"===e.signInMethod&&e.email&&(t=e.email,n="Inloggad med Google"),t&&(account.innerHTML=t,account.style.display="block",accountSignInMethod.innerHTML=n,accountSignInMethod.style.display="block"),e.addressFirstName&&e.addressLastName&&(accountName.innerHTML=e.addressFirstName+" "+e.addressLastName,accountName.style.display="block"),e?.referralData?.referralCode&&(referralCodeText.innerHTML=e.referralData.referralCode,headerInviteButton.style.display="flex",menuInviteLink.style.display="block")}// Make prepareMenu available globally for session cookie auto-login
window.prepareMenu=u;let m=JSON.parse(localStorage.getItem("sessionUser"));async function g(){try{let e=await callBackendApi("/api/bags/orders/allowed",{requiresAuth:!0});e?.data?.maxOrderBags>0&&(document.getElementById("orderBagsSection").style.display="block")}catch(e){console.log(e)}}async function f(e){let t,n="",r="",i=!0,o=!1,a=!1,l=!1,s=!1;// First, get items with status "Sold" and shippingStatus "Not sent"
await db.collection("items").where("user","==",e).where("status","==","Sold").orderBy("soldDate").get().then(e=>{e.forEach(e=>{e.data().status,n=e.data().shippingStatus;let t=e.data().payoutStatus,r=e.data().saleApprovalStatus;"Not sent"===n&&(l=!0),"Payed"!==t&&(o=!0,"Approved"===r&&(a=!0))})}),// Second, check if user has no address or personal id added yet
await db.collection("users").doc(e).get().then(e=>{r=e.data().addressFirstName,t=e.data().personalId;let n=e.data()?.preferences?.shippingMethod;t?""===t&&(i=!1):i=!1,"Pickup"==n&&(s=!0)}),!0==l&&void 0==r&&s&&(location.href="/address-form");// Redirect user to personalId form if they haven't added it yet
let d=user.current?.trustedSellerStatus==="Trusted";user.current?.trustedSellerStatus,o&&!i&&!["l3FdLmp4CHU0tdmGXvVkjx1inr32"].includes(e)&&(d||a)&&(location.href="/personal-id-form")}async function p(){var e;if(console.log("privateMain running"),!user.current)return;c(r=authUser.current.uid,authUser.current.email||sessionStorage.getItem("email"),authUser.current.phoneNumber||sessionStorage.getItem("phoneNumber")),f(r),user.current?.trustedSellerStatus==="Trusted"?document.getElementById("trustedIconHeader").style.display="block":(document.getElementById("fullLogo").style.display="block",document.getElementById("onlyLogo").style.display="none"),user.current?.maiCircle&&(document.getElementById("headerMaiCircleButton").style.display="flex",document.getElementById("cta-header-text").style.display="none",document.getElementById("cta-header").style.borderRadius="9999px"),(e=document.getElementById("itemListSoldByOthers")).innerHTML="",// SOLD BY OTHERS QUERY + Add cards to list
db.collection("items").where("status","==","Sold").orderBy("soldDate","desc").limit(30).get().then(t=>{t.forEach(t=>{var n=t.data().user,i=t.data().brand,a=t.data().soldPrice,l=(0,o.itemCoverImage)(t.data());// Add card to list if seller is other than myself
if(n!=r&&a>=200){var s=`<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${l}');"></div></div></div><div class="text-block-14">${a} kr</div><div class='text-block-34'>${i}</div></div>`;e.innerHTML+=s}})}),soldByOthersDiv.style.display="block",setPreferredLogInMethodCookie(authUser.current.providerData[0].providerId);//Yearly Summary
/*
  yearlyDataExist(userId).then((result) => {
    if (result) {
      console.log('Yearly data exist!');
      document.getElementById('yearlySummaryDiv').style.display = 'block';
      document.getElementById('yearlySummaryDiv').addEventListener("click", function () {
        location.href = `/yearly-summary?id=${userId.substring(0, 10)}&year=2024`;
      });
    } else {
      console.log('No yearly summary exist!');
    }
  });
  */let t=(await callBackendApi("/api/items",{requiresAuth:!0}))?.data;!function(e){let t=new Date,n=10,r=0,i=!1,o=user.current?.elementViews?user.current.elementViews.filter(e=>"inviteToast"===e.elementID):[],a=o.length?Array.from(o,e=>parseInt(Math.floor((t.getTime()-1e3*e.timestamp.seconds)/864e5))):[],l=a.length?Math.min(...a):null,s=!!o.length;e&&e.forEach(e=>{let o=e.soldDate,a=e.status,l=e.shippingStatus,s=e.archived;if(!s&&"Sold"===a&&o){if(r++,o){o=new Date(o);let e=Math.floor((t.getTime()-o.getTime())/864e5);e<=n&&(n=e)}"Sent"===l&&(i=!0)}}),user.current?.referralData?.referralCode&&i&&(!s||l>45)&&(n<=14||r>=3&&n<=45)&&(referralCodeText.innerHTML=user.current.referralData.referralCode,triggerInviteToastOpen.click(),// Store elementViews to be able to not show it again
db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"inviteToast",timestamp:new Date})}),// Track with segment
analytics.track("Element Viewed",{elementID:"inviteToast"}))}(t);let n=checkCookie("invite");n&&await connectReferralUsers(n);// Set invite code cookie
let i=checkCookie("photo_invite");i&&!localStorage.getItem("photoShootBooked")&&(photoShootOffer.style.display="block",bonusSection.style.display="block"),document.getElementById("stickyBottomClose").addEventListener("click",()=>{itemMoreMenu.classList.remove("sticky-bottom-show"),setTimeout(()=>itemMoreMenu.style.display="none",500)}),document.getElementById("stickyBottomDelete").addEventListener("click",async()=>{if(itemMoreMenu.classList.remove("sticky-bottom-show"),setTimeout(()=>itemMoreMenu.style.display="none",500),"inactive"===itemMoreMenu.dataset.section){document.getElementById(itemMoreMenu.dataset.itemId).style.display="none";let e=document.getElementById("inactiveItemList"),t=Array.from(e.children).find(e=>"none"!==e.style.display);t||(document.getElementById("inactiveItemsDiv").style.display="none"),await callBackendApi(`/api/items/unsold/${itemMoreMenu.dataset.itemId}`,{method:"DELETE",data:{itemId:itemMoreMenu.dataset.itemId}})}if("sold-not-sent"===itemMoreMenu.dataset.section){await callBackendApi(`/api/items/unsold/${itemMoreMenu.dataset.itemId}`,{method:"DELETE",data:{itemId:itemMoreMenu.dataset.itemId}});// hide the element from the list
let e=document.getElementById(`removeItemButton-${itemMoreMenu.dataset.itemId}`),t=e.parentElement;for(;t&&!t.classList.contains("div-block-45");)t=t.parentElement;t&&(t.style.display="none");// Also hide the full 'Sold - to be sent' list if this was the only item in it
let n=document.querySelectorAll("#itemListSoldNotSent .div-block-45"),r=Array.from(n).filter(e=>"none"!==e.style.display);0===r.length&&(document.getElementById("soldNotSentDiv").style.display="none")}else{document.getElementById(itemMoreMenu.dataset.itemId).style.display="none";let e=document.getElementById("wardrobeItemList"),t=Array.from(e.children).find(e=>"none"!==e.style.display);t||(document.getElementById("wardrobeItemsDiv").style.display="none"),await callBackendApi(`/api/items/wardrobe/${itemMoreMenu.dataset.itemId}`,{method:"DELETE",data:{itemId:itemMoreMenu.dataset.itemId}})}}),await Promise.all([v(),g(),h()]),(0,l.loadItemCards)(t,user.current),function(e){if(!user.current?.trustedSellerStatus||user.current?.trustedSellerStatus==="Pending"){let t=document.getElementById("trustedSellerWidget"),n=e?.data?.length>0;// If no items, move widget after soldByOthersDiv
if(!n){console.log("No items, moving widget after soldByOthersDiv");let e=document.getElementById("soldByOthersDiv");e.parentNode.insertBefore(t,e.nextSibling)}user.current?.approvedSalesCount&&(document.getElementById("widgetNumApprovedSales").innerText=Math.max(0,3-Number(user.current?.approvedSalesCount))),user.current?.approvedSalesCount===2&&(document.getElementById("approvedSalesText").innerText="godk\xe4nd f\xf6rs\xe4ljning kvar"),user.current?.approvedSalesCount>=1&&(document.getElementById("widgetFirstSaleBar").style.backgroundColor="#02AC08"),user.current?.approvedSalesCount>=2&&(document.getElementById("widgetSecondSaleBar").style.backgroundColor="#02AC08"),user.current?.approvedSalesCount>=3&&(document.getElementById("widgetThirdSaleBar").style.backgroundColor="#02AC08"),t.style.display="block"}}(t),console.log("user.current",user.current),window.location.href.endsWith("#wardrobe")&&setTimeout(()=>{document.getElementById("wardrobeItemsDiv").scrollIntoView({behavior:"smooth",block:"center"})},600),I(t),B(t),showReferralSection(),showBonusSection(),function(e){let t=getCookie("noCommissionCampaignCookie"),n=new Intl.DateTimeFormat("se-SV").format(new Date),r=e.filter(e=>e?.status!=="Draft").length;"noCommission"===t&&n>="2024-08-12"&&n<="2024-08-18"&&r<1&&("none"===bonusActivatedState.style.display||""===bonusActivatedState.style.display)&&document.getElementById("bonusSection")&&(document.getElementById("bonusName").innerHTML="KAMPANJ - T.o.m s\xf6n 18/8",document.getElementById("bonusTitle").innerHTML="S\xe4lj f\xf6rsta gratis",document.getElementById("bonusText").innerHTML="L\xe4gg upp ett plagg senast s\xf6ndag 18 augusti s\xe5 f\xe5r du beh\xe5lla 100% av vinsten f\xf6r ditt f\xf6rsta s\xe5lda plagg (ist\xe4llet f\xf6r 80%).",document.getElementById("bonusActivatedState").style.display="block",document.getElementById("enterCodeState").style.display="none",bonusSection.style.display="block")}(t),u(user.current),(0,a.loadInfoRequests)(t),x(t),user.current?.trustedSellerStatus!=="Pending"&&user.current?.trustedSellerStatusChange&&!user.current.trustedSellerStatusChange.seen&&function(){document.getElementById("darkOverlay").classList.add("active");let e=user.current?.trustedSellerStatusChange.type;"pendingToTrusted"===e?(document.getElementById("trustedSellerTitle").innerText="Du har uppn\xe5t statusen\nP\xe5litlig S\xe4ljare!",document.getElementById("trustedSellerText").innerText="Tack vare en h\xf6g andel godk\xe4nda f\xf6rs\xe4ljningar har du nu blivit P\xe5litlig S\xe4ljare! Fr\xe5n och med nu f\xe5r du utbetalt direkt n\xe4r du skickar dina plagg och t\xe4cks av Mais s\xe4ljarskydd vid eventuella reklamationer."):"untrustedToTrusted"===e?(document.getElementById("trustedSellerTitle").innerText="Du har uppn\xe5t statusen\nP\xe5litlig S\xe4ljare!",document.getElementById("trustedSellerText").innerText=`Tack${user.current?.addressFirstName?" "+user.current.addressFirstName:""}, f\xf6r att du g\xf6r det enkelt f\xf6r k\xf6pare att handla tryggt i andra hand! Fr\xe5n och med nu f\xe5r du utbetalt direkt n\xe4r du skickar dina plagg och t\xe4cks av Mais s\xe4ljarskydd vid eventuella reklamationer.`):"pendingToUntrusted"===e?(document.getElementById("trustedSellerButton").innerText="Okej",document.getElementById("trustedSellerIcon").style.opacity="0.2",document.getElementById("trustedSellerLink").innerText="Hur blir jag P\xe5litlig S\xe4ljare?",document.getElementById("trustedSellerTitle").innerText="Just nu uppfyller du inte kriterierna f\xf6r P\xe5litlig S\xe4ljare",document.getElementById("trustedSellerText").innerHTML=`Eftersom en av dina f\xf6rsta f\xf6rs\xe4ljningar antingen reklamerades eller inte skickades i tid, s\xe5 uppfyller du just nu inte kriterierna f\xf6r statusen P\xe5litlig S\xe4ljare. Du kan fortfarande s\xe4lja, men har \xe4nnu inte kvalificerat dig f\xf6r snabbare utbetalningar eller Mais s\xe4ljarskydd.`):"trustedToUntrusted"===e&&(document.getElementById("trustedSellerButton").innerText="Okej",document.getElementById("trustedSellerIcon").style.opacity="0.2",document.getElementById("trustedSellerLink").innerText="Hur blir jag P\xe5litlig S\xe4ljare igen?",document.getElementById("trustedSellerTitle").innerText="Du har inte l\xe4ngre statusen P\xe5litlig S\xe4ljare",document.getElementById("trustedSellerText").innerText=`P\xe5 grund av upprepade reklamationer eller f\xf6rs\xe4ljningar som inte skickats i tid, s\xe5 uppfyller du f\xf6r n\xe4rvarande inte kriterierna f\xf6r s\xe4ljarstatusen P\xe5litlig S\xe4ljare. Du kan fortfarande s\xe4lja, men utbetalning sker f\xf6rst n\xe4r k\xf6paren mottagit varan och eventuella reklamationer skickas tillbaka till dig.`),document.getElementById("trustedSellerBottomSheet").classList.add("active")}(),//showAppPromoSection();
b(),user.current&&user.current.addressFirstName&&user.current.addressLastName&&!user.current?.referralData?.referralCode&&await createReferralCode()}function y(e){if(!e||["Tr\xf6ja","Blus","Topp","Skjorta","Linneskjorta","T-shirt","Kavaj","Sweatshirt","Hoodie","Polotr\xf6ja","Tunika","V\xe4st","Kofta","Linne","Tr\xe4ningstr\xf6ja","Poncho","Pik\xe9","L\xe5ng\xe4rmad T-shirt","Kostymv\xe4st","Kjol","Byxor","Jeans","Chinos","Fritidsbyxor","Tr\xe4ningsbyxor","Tights","Strumpbyxor","Mjukisbyxor","Kostymbyxor","Sarong","Kl\xe4nning","Kaftan","Kostym","Set","Jumpsuit","Baddr\xe4kt","Bikini","Pyjamas","Morgonrock","Br\xf6llopskl\xe4nning","Balkl\xe4nning","Bodysuit","Jacka","Kappa","Rock","Fritidsjacka","Trenchcoat","Skinnjacka","Regnjacka","Sneakers","Klackar","Ballerinaskor","Loafers","Boots","K\xe4ngor","Skor","Axelremsv\xe4ska","Handv\xe4ska","Kuvertv\xe4ska","Ryggs\xe4ck","Tr\xe4ningsv\xe4ska","Resv\xe4ska","Datorv\xe4ska","V\xe4ska","Solglas\xf6gon","Glas\xf6gon","\xd6rh\xe4nge","Halsband","Armband","Ring","Brosch","Keps","Sjal","Krage","B\xe4lte","Pl\xe5nbok","Hatt","Necess\xe4r","Slips","Handduk","Klocka"].includes(e))return!0;let t=new Date,n=new Date(t.getFullYear(),7,15),r=new Date(t.getFullYear(),3,15);return!!["Underst\xe4ll","Dunjacka","P\xe4lsjacka","Vinterskor","Halsduk","M\xf6ssa","Vantar"].includes(e)&&(t<=r||t>=n)||["Shorts","Sandaler","Flip-flops"].includes(e)&&t>=r&&t<=n}async function h(){let e=await callBackendApi("/api/items/unsold",{requiresAuth:!0});if(!e.data?.length)return;e.data.sort((e,t)=>{let n=y(e.category),r=y(t.category);return n&&!r?-1:r&&!n?1:e.minPriceEstimate>=100&&t.minPriceEstimate<=100?-1:e.minPriceEstimate<=100&&t.minPriceEstimate>=100?1:0});let t=document.querySelector("#inactiveItemsDiv");t.style.display="block";let n=t.querySelector("#inactiveItemCard"),r=t.querySelector("#inactiveItemList");r.innerHTML="";let i=document.querySelector("#itemMoreMenu");for(let t of e.data){let e=n.cloneNode(!0);e.id=t.id;let o=t.images?.modelImageLarge||t.images?.modelImage||t.images?.enhancedFrontImageLarge||t.images?.enhancedFrontImage||t.images?.frontImageLarge||t.images?.frontImage;e.querySelector(".img-container").style.backgroundImage=`url("${o}")`,e.querySelector(".inactive-card-brand").innerText=`${t.cleanedBrand||t.brand?.trim()}`,e.querySelector(".inactive-card-category").innerText=`${t.category||""}`,e.querySelector(".inactive-card-reason").innerText="Avslutad",y(t.category)&&(e.querySelector(".in-season-label").style.display="block",t.minPriceEstimate>100&&(e.querySelector(".restart-button").href=`/sell-item?id=${t.id}&type=${"Draft"===t.status?"draft":"resell"}`,e.querySelector(".restart-button").style.display="inline-block")),e.querySelector(".inactive-dots-button").style.display="block",e.querySelector(".inactive-dots-button").addEventListener("click",async e=>{i.style.display="block",setTimeout(()=>i.classList.add("sticky-bottom-show"),0),i.dataset.itemId=t.id,i.dataset.section="inactive",e.preventDefault(),e.stopPropagation()}),r.appendChild(e)}//Tracking
r.querySelectorAll("a").forEach(e=>e.addEventListener("click",linkClickTracker))}async function v(){let e=await callBackendApi("/api/items/wardrobe",{requiresAuth:!0});if(!e.data?.length)return;document.getElementById("wardrobeItemsDiv").style.display="block";let t=document.getElementById("wardrobeItemCard"),n=document.getElementById("wardrobeItemList");n.innerHTML="";let r=document.getElementById("itemMoreMenu");for(let i of e.data){let e=t.cloneNode(!0);e.id=i.id;let o=i.images?.modelImageLarge||i.images?.modelImage||i.images?.enhancedFrontImageLarge||i.images?.enhancedFrontImage||i.images?.frontImageLarge||i.images?.frontImage;o?(e.querySelector(".img-container").style.backgroundImage=`url("${o}")`,e.querySelector(".no-image-text").style.display="none"):e.querySelector(".img-container").style.display="none",e.addEventListener("click",()=>{location.href=`/sell-item?id=${i.id}&type=${"Draft"===i.status?"draft":"resell"}`}),e.querySelector(".resell-button").href=`/sell-item?id=${i.id}&type=${"Draft"===i.status?"draft":"resell"}`,e.querySelector(".resell-item-title").innerText=`${i.cleanedBrand||i.brand?.trim()}`,e.querySelector(".resell-subtext").innerText=`${[i.category,i.maiSize].filter(e=>e).join(", ")}`;let a=i.soldPlatform||"Mai purchase"===i.draftSource?`K\xf6pt via Mai`:"Digital receipt"===i.draftSource?"Fr\xe5n digitalt kvitto":"lwl"===i.draftSource?"Fr\xe5n LWL":"";e.querySelector(".resell-sub-subtext").innerText=a;let l=i.soldPlatform||"Mai purchase"===i.draftSource?"resellPurchaseButton":"Digital receipt"===i.draftSource?"resellDigitalReceiptButton":"lwl"===i.draftSource?"resellLwlButton":"";e.querySelector(".resell-button").id=l,e.querySelector("#wardrobeDotsButton").addEventListener("click",async e=>{r.style.display="block",setTimeout(()=>r.classList.add("sticky-bottom-show"),0),r.dataset.itemId=i.id,r.dataset.section="wardrobe",e.preventDefault(),e.stopPropagation()}),n.appendChild(e)}//Tracking
n.querySelectorAll("a").forEach(e=>e.addEventListener("click",linkClickTracker))}async function x(e){let t=0===e.length,n=!e.some(e=>"Sold"===e.status),r=await db.collection("users").doc(authUser.current.uid).get(),i=r.data()?.oneTimeCommissionFreeCoupon==="Active";i&&(!t&&n&&(document.getElementById("freeSellBoxTitle").innerHTML="N\xe4sta f\xf6rs\xe4ljning \xe4r fri",document.getElementById("freeSellBoxSubText").innerHTML="Du har f\xe5tt en fri f\xf6rs\xe4ljning av Mai"),document.getElementById("freeSellBox").style.display="block"),console.log("user.current?.referralData?.vipInviteDiscountsUsed",user.current?.referralData?.vipInviteDiscountsUsed);let o=user.current?.referralData?.vipInviteDiscountsUsed||0;console.log("vipInviteDiscountsUsed",o),console.log("user.current?.vipInvite && vipInviteDiscountsUsed < 3",user.current?.vipInvite&&o<3),user.current?.vipInvite&&o<3&&(document.getElementById("freeSellBoxTitle").innerHTML="Tre kostnadsfria f\xf6rs\xe4ljningar",document.getElementById("freeSellBoxSubText").innerHTML="Exklusiv inbjudan av v\xe4n",document.getElementById("freeSellBox").style.display="block")}async function k(){document.getElementById("appPromoSection").style.display="none",authUser.current&&db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"appPromoSection",timestamp:new Date})})}async function b(){let e=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;e&&(document.getElementById("menuDownloadApp").style.display="block")}async function I(e){if(!user)return;let t=new Date,n=0,r=0,i=user.current?.elementViews?user.current.elementViews.reverse().find(e=>"npsSurvey"===e.elementID):null,o=i?new Date("string"!=typeof i?1e3*i.seconds:i):null,a=o?Math.floor((t.getTime()-o.getTime())/864e5):null;e&&e.forEach(e=>{if(e.publishedDate&&!e.archived){let i=new Date(e.publishedDate),o=Math.floor((t.getTime()-i.getTime())/864e5);o>n&&(n=o),(o<r||0===r&&o>0)&&(r=o)}}),n>=25&&r<=60&&(!o||a>90)&&!document.referrer.includes("feedback-nps")&&(location.href="/feedback-nps")}async function B(e){if(e&&e.length)try{let t=[];e.forEach(e=>t.push(e.id));let n=t.slice(0,10).map(e=>`items=${e}`).join("&")+"&number=20",r=await callBackendApi(`/api/items/recommendations?${n}`,{requiresAuth:!0});if(!r.data.length)return;document.getElementById("recommendedItemsDiv").style.display="block";let i=document.getElementById("recommendedItemsList");i.innerHTML="";let o=[],a=0;for(let e of r.data){o.includes(e.maiSize)||o.push(e.maiSize);let t=e.images.modelImageLarge||e.images.modelImage||e.images.enhancedFrontImageLarge||e.images.enhancedFrontImage,n=`<div class="div-block-14-big"><a id="recommendedItemCard${a++}" href="${e.platformListings.maiShop.url}"/><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${t}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${e.cleanedBrand}</div>
                            <div class="recent-added-items-subheader-category">${e.category}, ${e.maiSize}</div>
                            <div class="recently-added-price">${e.platformListings.maiShop.currentPrice} kr</div>
                            <div class="recently-added-brands-link-text">Mai Shop</div>
                        </div><a/></div>`;i.innerHTML+=n}i.querySelectorAll("a").forEach(e=>e.addEventListener("click",linkClickTracker)),document.getElementById("goToMaiShopLinkRecommendations").setAttribute("href",`https://mairesale.com/collections/damklader/${r.data[0].sex||"Woman"}?sort_by=created-descending&filter.p.m.global.size=${o.join("&filter.p.m.global.size=")}`);let l=new IntersectionObserver((e,t)=>{let n=i.getBoundingClientRect(),r=n.top>=0&&n.bottom<=(window.innerHeight||document.documentElement.clientHeight);r&&(console.log("Recommendations viewed"),analytics.track("Element Viewed",{elementID:"recommendedItems"}),l.disconnect())},{threshold:1,root:null});l.observe(i)}catch(e){errorHandler.report(e),console.log("error",e)}}function w(){document.getElementById("triggerPickupToastClose").click()}function E(){document.getElementById("triggerFeedbackFormClose").click(),setTimeout(function(){location.reload()},400)}async function S(){let e="";for(var t=document.getElementsByName("Pickup"),n=0;n<t.length;n++)t[n].checked&&(e=t[n].value);// yyyy--mm-dd
db.collection("items").doc(pickupFlowItemId).update({pickupDate:e,shippingMethod:"Pickup"}).then(t=>{console.log(`pickupDate '${e}' and shippingMethod 'Pickup' is now updated on Firestore item`),w(),document.getElementById("triggerFeedbackFormOpen").click()})}async function T(e){let t=db.collection("items").doc(pickupFlowItemId);await t.update({happinessRate:e}).then(function(){console.log("happinessRate is now set on Firestore item"),happinessQuestionDiv.style.display="none",openQuestionDiv.style.display="block",feedbackSubmitButton.style.display="block"})}async function L(){let e=feedbackTextField.value,t=db.collection("items").doc(pickupFlowItemId);await t.update({feedbackText:e}).then(function(){console.log("feedbackText is now set on Firestore item"),E()})}async function C(){document.getElementById("approvedSaleInfoBox").style.display="none",document.getElementById("darkOverlay").classList.remove("active")}async function M(){document.getElementById("darkOverlay").classList.remove("active"),document.getElementById("trustedSellerBottomSheet").classList.remove("active");try{await callBackendApi("/api/users",{data:{data:{trustedSellerStatusChange:{type:user.current?.trustedSellerStatusChange?.type,timestamp:new Date,seen:!0}}},method:"PUT"})}catch(e){errorHandler.report(e),console.log("Error updating user",e)}}m&&(m?.referralData?.referralCode,u(m)),checkCookie("invite"),localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),console.log(`user ${user.current}`),user.whenSet(p),//Disable webflow form submissions
Webflow.push(function(){$("form").submit(function(){return!1})});let D=!1;function P(){console.log("onLoadHandler running"),menuSignoutButton.addEventListener("click",async function(){await (0,o.signOut)()}),bookPickupForm.addEventListener("submit",S),closePickupToastIcon.addEventListener("click",w),closeFeedbackFormButton.addEventListener("click",E),happySmileyButton.addEventListener("click",function(){T(3)},!1),neutralSmileyButton.addEventListener("click",function(){T(2)},!1),angrySmileyButton.addEventListener("click",function(){T(1)},!1),feedbackSubmitButton.addEventListener("click",L),saveReferralCodeButton.addEventListener("click",async function(){saveRefCodeLoadingDiv.style.display="flex",saveReferralCodeButton.style.display="none";let e=referralCodeInput.value;await connectReferralUsers(e)}),closeBidToastButton.addEventListener("click",function(){(0,o.animateCloseToast)("bidToast")}),closeMeasurementsToastButton.addEventListener("click",function(){triggerMeasurementsToastClose.click()}),closeNewPriceToastButton.addEventListener("click",function(){triggerNewPriceToastClose.click()}),closeInviteToastButton.addEventListener("click",function(){triggerInviteToastClose.click()}),closeServicePointToastButton.addEventListener("click",function(){triggerServicePointToastClose.click()}),confirmServicePointButton.addEventListener("click",function(){document.getElementById("feedbackFormTitle").innerHTML="",triggerServicePointToastClose.click(),triggerFeedbackFormOpen.click()}),closeLongerPeriodToastButton.addEventListener("click",function(){triggerLongerPeriodToastClose.click()}),shareCodeButton.addEventListener("click",o.shareCode),sharePersonalLinkButton.addEventListener("click",o.shareCode),D=!0,menuButton.addEventListener("click",function(){Intercom("update",{hide_default_launcher:!0})}),closeMenuButton.addEventListener("click",function(){Intercom("update",{hide_default_launcher:!1})}),document.getElementById("closeAppPromo").addEventListener("click",function(e){console.log("Close button clicked!"),k()}),document.getElementById("darkOverlay").addEventListener("click",function(){M(),C(),(0,o.animateCloseToast)("bidToast")}),document.getElementById("closeTrustedSellerBottomSheet").addEventListener("click",M),document.getElementById("trustedSellerButton").addEventListener("click",M),document.getElementById("approvedSalesLines").addEventListener("click",function(){document.getElementById("approvedSaleInfoBox").style.display="block",document.getElementById("darkOverlay").classList.add("active")}),document.getElementById("closeApprovedSaleInfoBox").addEventListener("click",C)}if(localStorage.getItem("lwlItemDrafts")&&(location.href="/lwl?createDrafts=true"),window.addEventListener("load",P),console.log(`document.readyState ${document.readyState}`),"complete"!==document.readyState||D||(console.log("Running it since event listener did not"),P()),window.addEventListener("pageshow",e=>{e.persisted?(console.log("This page was restored from the bfcache."),"none"!==menu.style.display&&(menu.style.display="none")):console.log("This page was loaded normally.")}),window.intercomSettings={app_id:"klyy0le5"},!function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var n=document,r=function(){r.c(arguments)};r.q=[],r.c=function(e){r.q.push(e)},e.Intercom=r;var i=function(){var e=n.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=n.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",i):e.addEventListener("load",i,!1)}}(),!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&"sell.mairesale.com"===window.location.hostname){// Generate QR code
let e=document.getElementById("qrCanvas");e&&(0,d.default).toCanvas(e,window.location.href,function(e){e?(console.error("QR code generation error:",e),errorHandler.report(e)):console.log("QR code generated successfully")});// Show blurryOverlay and onlyMobileBox on sell.mairesale.com (desktop only)
let t=document.getElementById("blurryOverlay");t&&(t.style.display="block");let n=document.getElementById("onlyMobileBox");n&&(n.style.display="block")}},{"./general":"1tOWF","./infoRequestsFunctions":"21npA","./loadItemCards":"dxOtH",qrcode:"6s2CO","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"1tOWF":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");async function i(){try{try{// Delete session cookie
await callBackendApi("/api/users/session",{method:"DELETE",fetchInit:{credentials:"include"}})}catch(e){console.warn("[SSO] Error clearing session cookie:",e),errorHandler.report(e)}await firebase.auth().signOut(),console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}catch(e){errorHandler.report(e),console.log(e)}}function o(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function a(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,r=document.getElementById("addressCO").value,i=document.getElementById("addressPostalCode").value,o=document.getElementById("addressCity").value,a=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",r=r?r.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:r,addressPostalCode:i=i?i.trim().replace(/\D/g,""):"",addressCity:o=o?o.trim().charAt(0).toUpperCase()+o.trim().slice(1):"",addressDoorCode:a=a?a.trim():""}}function l(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function s(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function d(e){if(e.images){let t=e.images;return t.modelImageSmall||t.modelImage||t.coverImageSmall||t.coverImage||t.enhancedFrontImageSmall||t.enhancedFrontImage||t.frontImageSmall||t.frontImage}if(e.imagesv2)for(let t of["modelImage","enhancedFrontImage","frontImage"]){let n=e.imagesv2.find(e=>e.name===t);if(n){if(n?.versions?.small)return n.versions.small;if(n?.versions?.medium)return n.versions.medium;if(n?.versions?.large)return n.versions.large;if(n.url)return n.url}}return null}function c(){let e;let t=user.current.referralData.referralCode;if(e=user.current?.maiCircle?"H\xe4r f\xe5r du en exklusiv inbjudan till Mai, som ger en extra fin start med tre kommissionsfria f\xf6rs\xe4ljningar.":"Jag bjuder in dig till Mai f\xf6r att s\xe4lja dina kl\xe4der! G\xe5 genom min l\xe4nk f\xf6r att f\xe5 en extra kommissionsfri f\xf6rs\xe4ljning.",navigator.share)navigator.share({text:e,url:`https://invite.maiapp.se/refer?invite=${t}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=e+"\n"+`https://invite.maiapp.se/refer?invite=${t}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}function u(e){let t=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;t?(document.getElementById("continueOnWebBottomSheet").href=window.location.origin+e,document.getElementById("darkOverlay").classList.add("active"),document.getElementById("channelBottomSheet").classList.add("active")):window.location.href=e}function m(){document.getElementById("darkOverlay").classList.remove("active"),document.getElementById("channelBottomSheet").classList.remove("active")}function g(e){let t=document.getElementById(e);t&&(// Set initial position below screen
t.style.transform="translateY(100%)",t.style.transition="transform 0.3s ease-out",t.style.display="block",// Animate to visible position
setTimeout(()=>{t.style.transform="translateY(0%)"},10),document.getElementById("darkOverlay").classList.add("active"))}function f(e){let t=document.getElementById(e);// Add the visibility check here
t&&"none"!==t.style.display&&(// Animate down and hide
t.style.transform="translateY(100%)",t.style.transition="transform 0.3s ease-in",// Hide after animation completes
setTimeout(()=>{t.style.display="none"},300),document.getElementById("darkOverlay").classList.remove("active"))}function p(e){let t=document.getElementById(e);if(t){t.style.display="none";// Check if there are any remaining visible cards
let e=document.getElementById("infoRequestsList");if(e){let t=e.querySelectorAll('[id^="infoRequest"]:not([style*="display: none"])');if(0===t.length){let e=document.getElementById("infoRequestsDiv");e&&(e.style.display="none")}}}}r.defineInteropFlag(n),r.export(n,"signOut",()=>i),r.export(n,"setFormAddressFields",()=>o),r.export(n,"getFormAddressFields",()=>a),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
r.export(n,"isValidSwedishSsn",()=>l),r.export(n,"formatPersonalId",()=>s),r.export(n,"itemCoverImage",()=>d),r.export(n,"shareCode",()=>c),// Channel bottom sheet
r.export(n,"channelRouter",()=>u),r.export(n,"hideChannelBottomSheet",()=>m),// End of channel bottom sheet
// Toast animation functions
r.export(n,"animateOpenToast",()=>g),r.export(n,"animateCloseToast",()=>f),r.export(n,"hideInfoRequestCard",()=>p)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||t.hasOwnProperty(n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}],"21npA":[function(e,t,n){let r,i,o,a;var l=e("@parcel/transformer-js/src/esmodule-helpers.js");l.defineInteropFlag(n),l.export(n,"loadInfoRequests",()=>p);var s=e("./general");/**
 * Converts expires value to a Date object, handling both Firestore timestamp format
 * ({ _seconds, _nanoseconds }) and standard Date formats (string, number, Date)
 */function d(e){return new Date(e&&"object"==typeof e&&void 0!==e._seconds?1e3*e._seconds+(e._nanoseconds||0)/1e6:e)}async function c(e,t){measurementDescriptionText.innerHTML=t,measurementsSubmitButton.addEventListener("click",async function(){let t=measurementsInput.value;t.length>0&&" "!==t&&await db.collection("items").doc(e).update({measurements:t,"infoRequests.measurements.status":"Resolved"}),triggerMeasurementsToastClose.click(),setTimeout(function(){location.reload()},400)}),triggerMeasurementsToastOpen.click()}async function u(e,t,n,r){if(!e)return;console.log("is this happening?");let i=10*Math.ceil(.7*n/10),o=10*Math.ceil(.8*n/10);priceAfterDiscount30.innerHTML=`(Priset blir ${i} kr)`,priceAfterDiscount20.innerHTML=`(Priset blir ${o} kr)`,priceNoDiscount.innerHTML=`(${n} kr)`,n>=140&&!r?(longerPeriodDescriptionText.innerHTML=`S\xe4ljperioden f\xf6r ditt ${t}-plagg har n\xe5tt sitt slut. V\xe4lj om du vill f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar och om du vill s\xe4nka priset f\xf6r att \xf6ka chansen att f\xe5 det s\xe5lt.`,discountFormDiv.style.display="block"):(longerPeriodDescriptionText.innerHTML=`S\xe4ljperioden f\xf6r ditt ${t}-plagg har n\xe5tt sitt slut. Vill du f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar eller avsluta f\xf6rs\xe4ljningen?`,discountFormDiv.style.display="none"),// Accept longer selling window and store chosen discount
longerPeriodAcceptButton.addEventListener("click",async function(){let t=new Date,r=t.toISOString().split("T")[0],a=n,l=0;for(var s=document.getElementsByName("Discount"),d=0;d<s.length;d++)if(s[d].checked){let e=s[d].value;"30"===e&&(a=i,l=30),"20"===e&&(a=o,l=20)}await db.collection("items").doc(e).update({longerPeriodAcceptedDate:r,"infoRequests.longerPeriod.status":"Resolved","infoRequests.longerPeriod.response":"Accepted",longerPeriodAcceptedDiscount:l,minPriceEstimate:a}),triggerLongerPeriodToastClose.click(),setTimeout(function(){location.reload()},300)}),// Decline longer selling period and quit sales
longerPeriodDenyButton.addEventListener("click",async function(){await db.collection("items").doc(e).update({"infoRequests.longerPeriod.status":"Resolved","infoRequests.longerPeriod.response":"Denied",status:"Unsold"// This field is normally mastered by AT - I do this for the user to see the effect immediately (the card is removed)
}),triggerLongerPeriodToastClose.click(),setTimeout(function(){location.reload()},300)}),triggerLongerPeriodToastOpen.click()}async function m(e,t,n,r){if(!e)return;bidButtonsContainer.style.visibility="visible",bidButtonsContainer.style.visibility="visible",bidPriceText.innerHTML=`${n} kr`;// Calculate hours and minutes remaining
let i=new Date,l=d(r),c=l.getTime()-i.getTime(),u=Math.floor(c/6e4);bidDescription.innerHTML=`Budet ligger under ditt l\xe4gsta pris p\xe5 ${t} kr. Giltigt i ${Math.floor(u/60)} tim och ${Math.floor(u%60)} min.`,// Accept bid and show confirmation
bidAcceptButton.removeEventListener("click",o);let m=async function(){try{acceptBidLoading.style.display="block",acceptBidButtonText.style.display="none",// Call the API endpoint to accept the bid
await callBackendApi(`/api/items/${e}/infoRequests`,{method:"PUT",data:{type:"bid",response:"Accepted"}}),acceptBidLoading.style.display="none",acceptBidButtonText.style.display="block",bidTitle.style.visibility="hidden",bidButtonsContainer.style.visibility="hidden",// Fade out animation
bidPriceText.style.transition="opacity 0.3s ease",bidDescription.style.transition="opacity 0.3s ease",bidPriceText.style.opacity="0",bidDescription.style.opacity="0",// Wait for fade out to complete, then change text and fade in
setTimeout(()=>{bidPriceText.innerHTML="Toppen!",bidDescription.innerHTML="N\xe4r k\xf6paren betalat f\xe5r du ett SMS om att det \xe4r s\xe5lt och redo att skickas.",// Fade in animation
bidPriceText.style.opacity="1",bidDescription.style.opacity="1"},300),// Hide the specific info request element instead of reloading the page
(0,s.hideInfoRequestCard)(`infoRequestBid-${e}`)}catch(e){console.error("Failed to accept bid:",e);// You might want to show an error message to the user here
}};bidAcceptButton.addEventListener("click",m),o=m,// Decline bid
bidDenyButton.removeEventListener("click",a);// TODO: Use web-api endpoint instead to trigger backend logic
let g=async function(){await db.collection("items").doc(e).update({"infoRequests.bid.status":"Resolved","infoRequests.bid.response":"Denied"}),(0,s.animateCloseToast)("bidToast"),// Hide the specific info request element instead of reloading the page
(0,s.hideInfoRequestCard)(`infoRequestBid-${e}`)};bidDenyButton.addEventListener("click",g),a=g,(0,s.animateOpenToast)("bidToast")}async function g(e,t,n,r,i){// Deny price
if(console.log("storePriceResponse",e,t,n,r),"Accepted"===r&&await db.collection("items").doc(e).update({"infoRequests.price.status":"Resolved","infoRequests.price.response":"Accepted",maxPriceEstimate:t,minPriceEstimate:n}).then(function(){triggerNewPriceToastClose.click(),setTimeout(function(){location.reload()},300)}),"Denied"===r){let t={"infoRequests.price.status":"Resolved","infoRequests.price.response":"Denied"};"New"===i&&(t.archived=!0,t.willNotSell=!0),await db.collection("items").doc(e).update(t).then(function(){triggerNewPriceToastClose.click(),setTimeout(function(){location.reload()},300)})}}async function f(e,t,n,o,a,l,s,d,c,u){console.log("openNewPriceToast",e,t,n,o,a,l,s,d,c,u),previousMinPrice.style.display="none",previousMaxPrice.style.display="none",maxPriceDiv.style.display="block",minPriceDiv.style.display="block",// Set content of toast
newPriceToastTitle.innerHTML="Nytt l\xe4gsta pris",newPriceHeading.innerHTML=`${a}-plagg`;let m=s.toLowerCase();m&&"null"!==m&&(newPriceHeading.innerHTML=`${a}-${m}`),maxPrice.innerHTML=n,minPrice.innerHTML=o,c&&"null"!==c&&""!==c&&"undefined"!==c&&n!==c&&(previousMaxPrice.innerHTML=c,previousMaxPrice.style.display="block"),u&&"null"!==u&&""!==u&&"undefined"!==u&&o!==u&&(previousMinPrice.innerHTML=u,previousMinPrice.style.display="block"),acceptNewPriceButton.innerHTML="S\xe4lj med nytt pris",denyNewPriceButton.innerHTML="S\xe4nk ej","New"===t&&"Valuation"===d&&(newPriceToastTitle.innerHTML="V\xe4rdering",acceptNewPriceButton.innerHTML="S\xe4lj till v\xe4rdering",denyNewPriceButton.innerHTML="Avb\xf6j och avsluta"),"Adjusted ML Valuation"===d&&(newPriceToastTitle.innerHTML="Nytt prisintervall"),"Valuation"!==d&&"Adjusted ML Valuation"!==d&&(minPrice.innerHTML=`${o} kr`,maxPriceDiv.style.display="none"),l&&"undefined"!==l&&""!==l&&"null"!==l&&(newPriceText.innerHTML=l,descriptionDiv.style.display="block"),acceptNewPriceButton.removeEventListener("click",r);let f=()=>{g(e,n,o,"Accepted",t)};acceptNewPriceButton.addEventListener("click",f),r=f,denyNewPriceButton.removeEventListener("click",i);let p=()=>{g(e,n,o,"Denied",t)};denyNewPriceButton.addEventListener("click",p),i=p,// Open toast
triggerNewPriceToastOpen.click()}function p(e){console.log("loadInfoRequests");let t=document.getElementById("infoRequestBidTemplate").cloneNode(!0),n=document.getElementById("infoRequestMeasurementsTemplate").cloneNode(!0),r=document.getElementById("infoRequestLongerPeriodTemplate").cloneNode(!0),i=document.getElementById("infoRequestImagesTemplate").cloneNode(!0),o=document.getElementById("infoRequestValuationTemplate").cloneNode(!0),a=document.getElementById("infoRequestsList");a.replaceChildren(),(e||[]).forEach(e=>{let l=e.id,g=e.infoRequests,p=e.status,y=e.brand.replace(/'/g,""),h=e.minPriceEstimate,v=e.maxPriceEstimate,x=e?.infoRequests?.price?.response==="Denied",k=e.archived,b=e.category,I=(0,s.itemCoverImage)(e);void 0==k&&"Unsold"!==p&&"Sold"!==p&&g&&function(){for(let e in console.log("displayRequests",g),g)if(g[e]?.status==="Active"){let s=g[e].description;// PRICE REQUEST
if(s&&(s=s.replace(/'/g,"")),"price"===e){let t=g[e].type,n=o.cloneNode(!0);n.id=`infoRequestPrice-${l}`,n.querySelector(".img-container").style.backgroundImage=`url('${I}')`,n.querySelector("a .pricebuttontext").innerText="Se prisf\xf6rslag",n.querySelector(".text-block-72").innerText="Vill du s\xe4nka priset och f\xe5 det s\xe5lt?",a.appendChild(n),"New"===p&&"Adjusted ML Valuation"!==t?(n.querySelector("a .pricebuttontext").innerText="Se v\xe4rdering",n.querySelector(".text-block-72").innerText="Vill du s\xe4lja till v\xe5r v\xe4rdering?",n.querySelector("a").href=`/item-valuation?id=${l}`):setTimeout(()=>{let n=g[e].maxPrice,r=g[e].minPrice;document.querySelector(`#infoRequestPrice-${l} a`).addEventListener("click",async()=>{await f(l,p,n,r,y,s,b,t,v,h)})},0)}// MEASUREMENTS REQUEST
if("measurements"===e){let e=n.cloneNode(!0);e.id=`infoRequestMeasurements-${l}`,e.querySelector(".img-container").style.backgroundImage=`url('${I}')`,a.appendChild(e),setTimeout(()=>{document.querySelector(`#infoRequestMeasurements-${l} a`).addEventListener("click",async()=>{await c(l,s)})},0)}// IMAGES REQUEST
if("images"===e){let e=i.cloneNode(!0);e.id=`infoRequestImages-${l}`,e.querySelector(".img-container").style.backgroundImage=`url('${I}')`,e.querySelector("a").href=`/edit-item?id=${l}`,a.appendChild(e)}// LONGER PERIOD REQUEST
if("longerPeriod"===e){let e=r.cloneNode(!0);e.id=`infoRequestLongerPeriod-${l}`,e.querySelector(".img-container").style.backgroundImage=`url('${I}')`,a.appendChild(e),setTimeout(()=>{document.querySelector(`#infoRequestLongerPeriod-${l} a`).addEventListener("click",async()=>{await u(l,y,h,x)})},0)}// BID REQUEST
if("bid"===e){let n=g[e].expires,r=new Date,i=d(n);if(// Only show bid request if it hasn't expired
console.log("Expired?: ",i>r),i>r){console.log("We try to show it!");let r=t.cloneNode(!0);r.id=`infoRequestBid-${l}`,r.querySelector(".img-container").style.backgroundImage=`url('${I}')`,a.appendChild(r),setTimeout(()=>{document.querySelector(`#infoRequestBid-${l} a`).addEventListener("click",async()=>{let t=g[e].price;await m(l,h,t,n)})},0)}}a.children.length>0&&(infoRequestsDiv.style.display="block")}}()});/*
    db.collection("items").where("user", "==", userId).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const itemId = doc.id;
            const item = doc.data();
            const infoRequests = item.infoRequests;
            const status = item.status;
            const brand = item.brand.replace(/'/g, '');
            const currentMinPrice = item.minPriceEstimate;
            const currentMaxPrice = item.maxPriceEstimate;
            const deniedBefore = item?.infoRequests?.price?.response === "Denied" ? true : false;
            const archived = item.archived;
            const category = item.category;
            const frontImageUrl = itemCoverImage(item);
            if (archived == undefined && status !== "Unsold" && status !== "Sold" && infoRequests) {
                displayRequests();
            }

            function displayRequests() {
                for (const req in infoRequests) {
                    if (infoRequests[req]?.status === "Active") {
                        let description = infoRequests[req].description;

                        if (description) { description = description.replace(/'/g, ''); }
                        // PRICE REQUEST
                        if (req === "price") {
                            const type = infoRequests[req].type;
                            const newRequest = valuationClone.cloneNode(true);
                            newRequest.id = `infoRequestPrice-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            newRequest.querySelector('a .pricebuttontext').innerText = 'Se prisförslag';
                            newRequest.querySelector('.text-block-72').innerText = "Vill du sänka priset och få det sålt?";
                            infoRequestsList.appendChild(newRequest);
                            if (status === "New" && type !== 'Adjusted ML Valuation') {
                                newRequest.querySelector('a .pricebuttontext').innerText = 'Se värdering';
                                newRequest.querySelector('.text-block-72').innerText = 'Vill du sälja till vår värdering?'
                                newRequest.querySelector('a').href = `/item-valuation?id=${itemId}`;
                            } else {
                                setTimeout(() => {
                                    const max = infoRequests[req].maxPrice;
                                    const min = infoRequests[req].minPrice;
                                    document.querySelector(`#infoRequestPrice-${itemId} a`).addEventListener('click', async () => {
                                        await openNewPriceToast(itemId, status, max, min, brand, description, category, type, currentMaxPrice, currentMinPrice);
                                    })
                                }, 0);
                            }
                        }
                        // MEASUREMENTS REQUEST
                        if (req === "measurements") {
                            const newRequest = measurementsClone.cloneNode(true);
                            newRequest.id = `infoRequestMeasurements-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            infoRequestsList.appendChild(newRequest);
                            setTimeout(() => {
                              document.querySelector(`#infoRequestMeasurements-${itemId} a`).addEventListener('click', async () => {
                                await openMeasurementsToast(itemId, description);
                              })
                            }, 0);
                        }
                        // IMAGES REQUEST
                        if (req === "images") {
                            const newRequest = updateImagesClone.cloneNode(true);
                            newRequest.id = `infoRequestImages-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            newRequest.querySelector('a').href = `/edit-item?id=${itemId}`;
                            infoRequestsList.appendChild(newRequest);
                        }
                        // LONGER PERIOD REQUEST
                        if (req === "longerPeriod") {
                            const newRequest = longerPeriodClone.cloneNode(true);
                            newRequest.id = `infoRequestLongerPeriod-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            infoRequestsList.appendChild(newRequest);
                            setTimeout(() => {
                              document.querySelector(`#infoRequestLongerPeriod-${itemId} a`).addEventListener('click', async () => {
                                await openLongerPeriodToast(itemId, brand, currentMinPrice, deniedBefore);
                              })
                            }, 0);
                        }
                        infoRequestsDiv.style.display = "block";
                    }
                }
            }
        });
    });
*/}},{"./general":"1tOWF","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],dxOtH:[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"loadItemCards",()=>c);var i=e("./general"),o=e("./private");async function a(e,t){console.log(`storeShippingMethod(${e}, ${t}) is running`),await db.collection("items").doc(e).update({shippingMethod:t}).then(n=>{console.log(`Shipping method '${t}' stored on item with ID: `,e),window.pickupFlowItemId=e,"Service point"==t&&(document.getElementById("feedbackFormTitle").innerHTML="Tack, d\xe5 vet vi att paketet snart l\xe4mnas till ett ombud.",document.getElementById("triggerShippingToastClose").click()),(0,o.closePickupToast)(),document.getElementById("triggerFeedbackFormOpen").click()})}function l(e,t){console.log(`openShippingToast(${e}, ${t})`),window.pickupFlowItemId=e,setTimeout(()=>{document.getElementById("servicePointButton").addEventListener("click",async()=>{await a(e,"Service point")}),document.getElementById("bookPickupButton").addEventListener("click",()=>{s(e,t)})},0),triggerShippingToastOpen.click()}function s(e,t,n="none"){console.log(`openPickupToast(${e}, ${t}) is running`),triggerShippingToastClose.click(),triggerServicePointToastClose.click(),changeToServicePointButton.addEventListener("click",async()=>{await a(e,"Service point")}),changeToServicePointButton.style.display=n,function(e){console.log(`setDatesOfPickupToast(${e}) is running`),// Hide all options first, to later determine which ones to show
radioFieldOne.style.display="none",radioFieldTwo.style.display="none",radioFieldThree.style.display="none",radioFieldFour.style.display="none";// Create the 4 first possible pickup dates, starting 4 b-days after soldDate
var t=new Date(e);t.setTime(t.getTime()+36e5),t.setDate(t.getDate()+4),6==t.getDay()||0==t.getDay()||1==t.getDay()||2==t.getDay()?t.setDate(t.getDate()+2):3==t.getDay()&&t.setDate(t.getDate()+1);var n=new Date(t);n.setDate(n.getDate()+1),6==n.getDay()&&n.setDate(n.getDate()+2);var r=new Date(n);r.setDate(r.getDate()+1),6==r.getDay()&&r.setDate(r.getDate()+2);var i=new Date(r);i.setDate(i.getDate()+1),6==i.getDay()&&i.setDate(i.getDate()+2);var o=["S\xf6ndag","M\xe5ndag","Tisdag","Onsdag","Torsdag","Fredag","L\xf6rdag"],a=["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"];// Change value of radio buttons and display to user
let l=new Date,s=0;console.log("Today",l),console.log("firstDate > today",t>l),console.log("secondDate > today",n>l),console.log("thirdDate > today",r>l),console.log("forthDate > today",i>l);let d=document.getElementById("pickupDateOne"),c=document.getElementById("pickupDateTwo"),u=document.getElementById("pickupDateThree"),m=document.getElementById("pickupDateFour");// If less than two options displayed, add at least two options
if(t>l&&($("#radioButtonOne").val(t.toISOString().split("T")[0]),d.innerHTML=o[t.getDay()]+", "+t.getDate()+" "+a[t.getMonth()]+", kl 9-16",radioFieldOne.style.display="flex",s++),n>l&&($("#radioButtonTwo").val(n.toISOString().split("T")[0]),c.innerHTML=o[n.getDay()]+", "+n.getDate()+" "+a[n.getMonth()]+", kl 9-16",radioFieldTwo.style.display="flex",s++),r>l&&($("#radioButtonThree").val(r.toISOString().split("T")[0]),u.innerHTML=o[r.getDay()]+", "+r.getDate()+" "+a[r.getMonth()]+", kl 9-16",radioFieldThree.style.display="flex",s++),i>l&&($("#radioButtonFour").val(i.toISOString().split("T")[0]),m.innerHTML=o[i.getDay()]+", "+i.getDate()+" "+a[i.getMonth()]+", kl 9-16",radioFieldFour.style.display="flex",s++),s<2){radioFieldOne.style.display="none",radioFieldTwo.style.display="none",radioFieldThree.style.display="none",radioFieldFour.style.display="none";var g=new Date;g.setDate(l.getDate()+1),0==g.getDay()?g.setDate(g.getDate()+1):6==g.getDay()&&g.setDate(g.getDate()+2);var f=new Date(g);f.setDate(f.getDate()+1),6==f.getDay()&&f.setDate(f.getDate()+2),console.log("dayOne: ",g),console.log("dayTwo: ",f),// Show tomorrow as an option
$("#radioButtonOne").val(g.toISOString().split("T")[0]),d.innerHTML=o[g.getDay()]+", "+g.getDate()+" "+a[g.getMonth()]+", kl 9-16",radioFieldOne.style.display="flex",// Show day after tomorrow as an option
$("#radioButtonTwo").val(f.toISOString().split("T")[0]),c.innerHTML=o[f.getDay()]+", "+f.getDate()+" "+a[f.getMonth()]+", kl 9-16",radioFieldTwo.style.display="flex"}}(t),window.pickupFlowItemId=e,triggerPickupAnimation.click()}function d(e,t,n){let r=`<div class="w-form">
            <form method="get" name="wf-form-" id="bagReceivedForm">
                <label class="w-checkbox checkbox-field-3">
                    <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
                    <input type="checkbox" id="bagReceivedCheckbox-${e}" style="opacity:0;position:absolute;z-index:-1">
                    <span class="checkbox-label-3 w-form-label">Etiketten har kommit</span>
                </label>
            </form>
        </div>`;return r}function c(e,t=null){// Clear containers
itemListSelling.innerHTML="",itemListSoldNotSent.innerHTML="",itemListSold.innerHTML="",document.createDocumentFragment(),document.createDocumentFragment(),document.createDocumentFragment();// Collect HTML strings for batch processing
let n="",r="",o="";var a=0;(e||[]).forEach(e=>{let l,s;var c=e.id,u=e.soldDate,m=e.status,g=e.shippingStatus,f=e.brand,p=e.soldPrice,y=e.sellerGets?Math.ceil(e.sellerGets):e.sellerGets,h="Brand Gift Card"===e.payoutType?p:y,v=e.buyer?.FirstName||e.buyerFirstName,x=e.buyer?.City||e.buyerAddressCity,k=e.minPriceEstimate,b=e.maxPriceEstimate,I=e.infoRequests,B=e.pickupDate,w=e.shippingMethod,E=e.postnordQrCode,S=e.dhlLicensePlateBarcodeSrc,T=e.upsShipmentId,L=e.bagReceived,C=e.soldPlatform,M=e.archived,D=e.holidayMode,P=e.longerPeriodAcceptedDate;e.images;var A=(0,i.itemCoverImage)(e);let N="",j=e.publishedDate;if(j){j=new Date(j);let e=Math.round((P?60:30)-(l=(new Date().getTime()-j.getTime())/864e5));N=e<=0?"0 dagar kvar":`${e} dagar kvar`}if(u){let e=new Date(u),t=new Date;e.setHours(0,0,0,0),t.setHours(0,0,0,0),s=Math.round((t-e)/864e5)}M||"Unsold"===m||function(){//Putting the items in the right list
let i=window.location.origin+`/item?id=${c}`;// WE SELL RIGHT NOW
if("Sold"!==m){let e="",r="";if("New"===m&&(I?.price?.status==="Active"?e=`<div class='text-block-34'>Inv\xe4ntar ditt svar</div>`:k&&b?(e=`<div class='text-block-34'>${k} - ${b} kr</div>`,r=`<div class='text-block-34'>F\xf6rbereds</div>`):e=`<div class='text-block-34'>V\xe4rdering p\xe5g\xe5r</div>`),"Published"===m&&k&&b){e=`<div class='text-block-34'>${k} - ${b} kr</div>`;let n=t?.specialDeal?`Live (${Math.round(l)} dagar)`:N;r=`<div class='text-block-34'>${D?"Pausad":n}</div>`}let o=`<div class="div-block-14-big"><a id="itemLinkBlock" href="${i}" class="link-block-18 w-inline-block"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${A}');"></div></div></div><div class="text-block-14">${f}</div>${e}${r}</a></div>`;n+=o,//Display list
myItemsDiv.style.display="block",//Hide empty state
noItemsDiv.style.display="none",headerSellItemButton.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg";// SOLD - NOT SENT
}else if("Sold"!=m||"Not sent"!=g&&g){let t="Brand Gift Card"===e.payoutType?"<br> (Presentkort)":"";var y=`<div class="item-card-small"><div class="ratio-box _16-9"><div class="conten-block with-image"><a id="itemLinkFromSoldBeforeSection" href="${i}"><div class="img-container" style="background-image: url('${A}');"></div></a></div></div><div class="text-block-14">${p} kr</div><div class='text-block-34'>${"Payed"===e.payoutStatus?"Du fick":"Du f\xe5r"} ${h} kr${t}</div></div>`;o+=y,// Display list, hide empty state
soldItemsDiv.style.display="block",itemListSoldContainer.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg",a+=h,youEarnedDiv.innerHTML=`Du har tj\xe4nat ${Math.round(a).toLocaleString("en-US").replaceAll(","," ")} kr`}else{// Prepare card
let t="Vestiaire Collective"===C&&s>7;var M="",P="";let n="",o="",a="",l=`Du f\xe5r ${h} kr`,m="",g="";if(t)M=function(e){let t=window.location.origin+`/sell-item?id=${e}`,n=`<a id="resellButton" href="${t}" class="link-block-39">
                            <div class="div-block-194">
                                            <div class="text-block-113">L\xe4gg upp p\xe5 nytt</div>
                            </div>
                    </a>`;return n}(c),l="K\xf6paren avbr\xf6t k\xf6pet",m="Skickades ej inom 7 dagar",o+=`
          <a id="removeItemButton-${c}" href="#" class="link-block-87">
              <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/65269f37a18d8c128d29ed1c_trash-can%20(1).svg" class="image-154">
              <div class="text-block-373">Ta bort plagg</div>
          </a>`,// Store event listener data for batch processing
window._pendingEventListeners=window._pendingEventListeners||[],window._pendingEventListeners.push({type:"removeItemButton",itemId:c});else{if(null!=v&&null!=x&&p){let t=isGiftCardPartner(e.brand)?.giftCards,n=`S\xe5ld till ${v} i ${x}${t?"":" f\xf6r "+p+" kr"}`;if(t)m=n.trim();else{// Split sentence into two equally long rows
let e="",t=n.split(" ");t.forEach(function(t){e.trim().length>n.length/2&&!e.includes("<br>")&&(e+="<br>"),e+=t+" "}),m=e.trim()}m="Brand Gift Card"===e.payoutType?`(${brandPartners[e.brand].name}-presentkort)<br>`+m:m,g=t&&"Brand Gift Card"!==e.payoutType?`\xc4ndra till ${p} kr i presentkort?`:""}"Service point"===w&&(S?(M=function(e){let t=window.location.origin+`/ship-item?id=${e}`,n=`<a id="barcodeButton" href="${t}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/65418186f29682eaff3f74be_barcode-icon%20(1).svg" class="image-100">
                                            <div class="text-block-113">Visa streckkod</div>
                            </div>
                    </a>`;return n}(c),a="dhl"):"Vestiaire Collective"===C||"Grailed"===C?L||(M=d(c,u,w),T&&(a="ups"),// Store event listener data for batch processing
window._pendingEventListeners=window._pendingEventListeners||[],window._pendingEventListeners.push({type:"bagReceivedCheckbox",itemId:c,soldDate:u,shippingMethod:w})):E&&(a="postnord",M=function(e){let t=window.location.origin+`/ship-item?id=${e}`,n=`<a id="qrCodeButton" href="${t}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63bdeaf1af902f05607f86ef_Group.svg" class="image-43">
                                            <div class="text-block-113">Visa QR</div>
                            </div>
                    </a>`;return n}(c))),"Pickup"===w&&(L?L&&!B&&(M=function(e){let t=`<a id="bookPickupButton-${e}" href="#" class="link-block-39">
                            <div class="div-block-194">
                                <div class="text-block-113">Boka h\xe4mtning</div>
                            </div>
                    </a>`;return t}(c),// Store event listener data for batch processing
window._pendingEventListeners=window._pendingEventListeners||[],window._pendingEventListeners.push({type:"bookPickupButton",itemId:c,soldDate:u})):(M=d(c,u,w),// Store event listener data for batch processing
window._pendingEventListeners=window._pendingEventListeners||[],window._pendingEventListeners.push({type:"bagReceivedCheckbox",itemId:c,soldDate:u,shippingMethod:w}))),// Always show the 'shippingInfoDiv' - Styling depending on state is set in the function
P=function(e,t,n,r,i,o){let a="",l=i&&(!i||"Pickup"!=t||r)?"":'<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63be70f55a4305a398cf918e_info-icon.svg" class="image-44">',s=window.location.origin+`/ship-item?id=${e}`;if("Service point"==t){let e="6297d3d527db5dd4cf02e924/6399ac2a3505ee6071fbc18a_Vector%20(1).svg";"postnord"===o&&(e="6297d3d527db5dd4cf02e924/655d182c37fc30df71b078cd_postnord-square-icon%20(1).svg"),"dhl"===o&&(e="6297d3d527db5dd4cf02e924/655d1830f259c0bc084c2937_dhl-square-icon%20(1).svg"),"ups"===o&&(e="6297d3d527db5dd4cf02e924/6603eaef0d5af57f5cce2e40_ups-squared-icon.jpg"),a+=`
                        <img src="https://global-uploads.webflow.com/${e}" class="shipper-icon">
                        <div class="next-step-text-small">L\xe4mnas till ombud</div>
                        ${l}
                    `}else if("Pickup"==t){if(r){var d=new Date(r),c=d.getDate(),u=["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"][d.getMonth()],m=["S\xf6n","M\xe5n","Tis","Ons","Tors","Fre","L\xf6r"][d.getDay()];a+=`
                                <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                                <div class="next-step-text-small">${m+", "+c+" "+u+", kl 9-16"}</div>`}else a+=`
                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                            <div class="next-step-text-small">Upph\xe4mtning</div>
                            ${l}
                        `}// Turn shipping info into a link to ship item page
let g=`
                        <a id="shipItemPageLink" href="${s}" class="link-block-40">
                                ${a}
                        </a>`;return g}(c,w,0,B,L,a),L&&("Service point"===w||"Pickup"===w&&B)&&(P='<div class="spacing-15-px"></div>'+P,n+=`
          <a id="changeShippingMethodA-${c}" href="#">
              <div id="changeShippingMethod-${c}" class="change-shipping-method-text">\xc4ndra frakts\xe4tt</div>
          </a>`,// Store event listener data for batch processing
window._pendingEventListeners=window._pendingEventListeners||[],window._pendingEventListeners.push({type:"changeShippingMethod",itemId:c,soldDate:u}))}//Create card
var j="";j=`<div class="div-block-118"><div class="div-block-45"><div class="div-block-43"><div class="ratio-box _16-9"><div class="content-block with-image"><a id="itemLinkFromSoldNotSentSection" href="${i}"><div class="img-container" style="background-image: url('${A}');"></div></a></div></div></div><div class="div-block-46">
          <a id="youGetLink-${c}" href="#" class="you-get-link">
              <div class="text-block-43" id="text1-${c}">${l}</div>
              ${"K\xf6paren avbr\xf6t k\xf6pet"!==l?'<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63be70f55a4305a398cf918e_info-icon.svg" class="you-get-info-icon"></img>':""}
          </a>
          <div class="text-block-44" id="text2-${c}">${m}</div>
          ${g?`<div class="change-to-gift-card-text" id="convertToGiftCardDiv-${c}"><a id="convertToGiftCard-${c}">${g}</a></div>`:""}
          ${M}
          ${P}
          ${n}
          ${o}
          </div></div></div></div>`,// Store event listener data for later batch processing
window._pendingEventListeners=window._pendingEventListeners||[],window._pendingEventListeners.push({type:"youGetLink",itemId:c,soldPrice:p,sellerGetsValue:h}),g&&window._pendingEventListeners.push({type:"convertToGiftCard",itemId:c,item:e,soldPrice:p}),r+=j,// Display list
soldNotSentDiv.style.display="block",// Hide empty state
noItemsDiv.style.display="none",headerSellItemButton.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg";// SOLD BEFORE
}}()}),n&&(itemListSelling.innerHTML=n),r&&(itemListSoldNotSent.innerHTML=r),o&&(itemListSold.innerHTML=o),window._pendingEventListeners&&(window._pendingEventListeners.forEach(e=>{if("youGetLink"===e.type){let t=document.getElementById(`youGetLink-${e.itemId}`);t&&t.addEventListener("click",()=>{!function(e,t){priceAfterPlatformFee.innerHTML=e;let n=e-t;commissionAmount.innerHTML=0===n?"-":"-"+n,n/e>.9&&n/e<.11&&(commissionTitle.innerHTML="Rabatterad kommission (10%)"),n/e>.19&&n/e<.21&&(commissionTitle.innerHTML="Kommission (20%)"),n/e>.29&&n/e<.31&&50!==n&&500!==n&&(commissionTitle.innerHTML="Kommission (30%)"),n<1&&(commissionTitle.innerHTML="Fri kommission (0%)"),youGetAmount.innerHTML=t,youGetInfoBox.style.display="flex",darkOverlay.style.display="block",closeYouGetInfoBox.addEventListener("click",()=>{youGetInfoBox.style.display="none",darkOverlay.style.display="none"})}(e.soldPrice,e.sellerGetsValue)})}else if("convertToGiftCard"===e.type){let t=document.getElementById(`convertToGiftCard-${e.itemId}`);t&&t.addEventListener("click",()=>{var t,n,r;let i=e.item?.images?.modelImage||e.item?.images?.enhancedFrontImageSmall||e.item?.images?.enhancedFrontImage||e.item?.images?.frontImageSmall||e.item?.images?.frontImage;t=e.itemId,n=e.soldPrice,r=e.item.brand,document.getElementById("convertGiftCardInfoBox").style.display="flex",document.querySelector(".dark-overlay").style.display="block",document.getElementById("giftCardItemImage").src=i,document.getElementById("giftCardText").innerText=`Vill du f\xe5 ${n}kr (100% av vinsten) att handla f\xf6r p\xe5 ${brandPartners[r].url} ist\xe4llet?`,document.getElementById("closeGiftCardBox").addEventListener("click",()=>{document.getElementById("convertGiftCardInfoBox").style.display="none",document.querySelector(".dark-overlay").style.display="none"}),document.getElementById("closeGiftCardBoxButton").addEventListener("click",()=>{document.getElementById("convertGiftCardInfoBox").style.display="none",document.querySelector(".dark-overlay").style.display="none"}),// This is updating the dataset with the itemId, brand and soldPrice, to be used when the user clicks the button
document.getElementById("convertToGiftCardButton").dataset.currentItemId=t,document.getElementById("convertToGiftCardButton").dataset.currentBrand=r,document.getElementById("convertToGiftCardButton").dataset.currentSoldPrice=n})}else if("bagReceivedCheckbox"===e.type){let t=document.getElementById(`bagReceivedCheckbox-${e.itemId}`);t&&t.addEventListener("click",t=>{var n,r,i,o;n=t.target,r=e.itemId,i=e.soldDate,o=e.shippingMethod,n.checked?(db.collection("items").doc(r).update({bagReceived:!0}).then(e=>{console.log("Stored in DB that bag is received for item with ID: ",r)}),"Pickup"===o)?s(r,i,"flex"):"Service point"===o?(console.log("openServicePointToast"),changeToPickupButton.addEventListener("click",()=>{s(r,i)}),triggerServicePointToastOpen.click()):l(r,i):db.collection("items").doc(r).update({bagReceived:!1}).then(e=>{console.log("Stored in DB that bag is NOT received for item with ID: ",r)})})}else if("bookPickupButton"===e.type){let t=document.getElementById(`bookPickUpButton-${e.itemId}`);t&&t.addEventListener("click",()=>{s(e.itemId,e.soldDate)})}else if("changeShippingMethod"===e.type){let t=document.getElementById(`changeShippingMethodA-${e.itemId}`);t&&t.addEventListener("click",()=>{l(e.itemId,e.soldDate)})}else if("removeItemButton"===e.type){let t=document.getElementById(`removeItemButton-${e.itemId}`);t&&t.addEventListener("click",t=>{itemMoreMenu.style.display="block",setTimeout(()=>itemMoreMenu.classList.add("sticky-bottom-show"),0),itemMoreMenu.dataset.itemId=e.itemId,itemMoreMenu.dataset.section="sold-not-sent",t.preventDefault(),t.stopPropagation()})}}),// Clear the pending listeners
window._pendingEventListeners=[]),loadingDiv.style.display="none",sectionsDiv.style.display="block",analytics.track("Element Viewed",{elementID:"sectionsDiv"}),quickInfoDiv.style.display="block"}e("./sellItemHelpers"),document.getElementById("convertToGiftCardButton").addEventListener("click",async()=>{let e=document.getElementById("convertToGiftCardButton").dataset.currentItemId,t=document.getElementById("convertToGiftCardButton").dataset.currentBrand,n=document.getElementById("convertToGiftCardButton").dataset.currentSoldPrice;await callBackendApi(`/api/items/${e}`,{data:{payoutType:"Brand Gift Card"},method:"PUT"}),document.getElementById("convertGiftCardInfoBox").style.display="none",document.querySelector(".dark-overlay").style.display="none",document.getElementById(`convertToGiftCardDiv-${e}`).style.display="none",document.getElementById(`text1-${e}`).innerHTML=document.getElementById(`text1-${e}`).innerHTML.replace(/\d+/,n),document.getElementById(`text2-${e}`).innerHTML=`(${brandPartners[t].name}-presentkort)<br>`})},{"./general":"1tOWF","./private":"flS2m","./sellItemHelpers":"2G59s","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"2G59s":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");async function i(e,t,n=null){try{return await o(e,t,n)}catch(r){if("ImageResizeError"!==r.name)// Retry once for upload errors
return console.error("Failed to upload image",r),errorHandler.report(r),await o(e,t,n);throw console.error("Failed to resize image",r),errorHandler.report(r),r;// Don't retry for resize errors
}}async function o(e,t,n=null){let r;n||sessionStorage.getItem("newItemId")||sessionStorage.setItem("newItemId",await c());let i=n||sessionStorage.getItem("newItemId");try{r=await a(e),console.log(`Scaled image size: ${(r.size/1024/1024).toFixed(2)} MB`)}catch(t){let e=Error("Failed to resize image");throw e.name="ImageResizeError",e.originalError=t,e}if(!r)throw Error("Fel vid bearbetning av vald bild.");let o=new FormData;o.append("itemId",i),o.append("fileName",t),o.append("file",r),o.append("temporary",!n),o.append("generateSmallImage","true");let l=await fetch(`${BACKEND_API_URL}/api/items/${i}/uploadImage`,{method:"POST",body:o});if(!l.ok)throw Error(`HTTP error! status: ${l.status}`);return await l.json()}async function a(e){if(e.size<5242880)return Promise.resolve(e);if("createImageBitmap"in window)try{return console.log("Attempting to scale image with createImageBitmap"),await l(e,3024,4032)}catch(e){console.warn("createImageBitmap scaling method failed",e)}// If createImageBitmap is not supported or failed, try OffscreenCanvas
if("OffscreenCanvas"in window)try{return console.log("Attempting to scale image with OffscreenCanvas"),await s(e,3024,4032)}catch(e){console.warn("OffscreenCanvas scaling method failed",e)}// If both modern methods fail or are not supported, fall back to the original method
try{return console.log("Attempting to scale image with original method"),await d(e,3024,4032)}catch(e){throw console.error("All scaling methods failed",e),Error("Unable to process image")}}async function l(e,t,n){try{let r=await createImageBitmap(e),i=new OffscreenCanvas(t,n),o=i.getContext("2d"),{width:a,height:l}=r;return a>l?a>t&&(l*=t/a,a=t):l>n&&(a*=n/l,l=n),i.width=a,i.height=l,o.drawImage(r,0,0,a,l),await i.convertToBlob({type:"image/jpeg",quality:.9})}catch(e){throw console.error("Image scaling failed",e),Error("Unable to process image")}}async function s(e,t,n){let r=await createImageBitmap(e),i=r.width,o=r.height;i>o?i>t&&(o*=t/i,i=t):o>n&&(i*=n/o,o=n);let a=new OffscreenCanvas(i,o),l=a.getContext("2d");return l.drawImage(r,0,0,i,o),a.convertToBlob({type:"image/jpeg",quality:.9})}async function d(e,t,n){return new Promise((r,i)=>{let o=new Image;o.onload=()=>{let e=document.createElement("canvas"),i=o.width,a=o.height;i>a?i>t&&(a*=t/i,i=t):a>n&&(i*=n/a,a=n),e.width=i,e.height=a;let l=e.getContext("2d");l.drawImage(o,0,0,i,a),e.toBlob(e=>{console.log(`Fallback resize: ${(e.size/1024/1024).toFixed(2)} MB`),r(e)},"image/jpeg",.9)},o.onerror=i,o.src=URL.createObjectURL(e)})}async function c(){try{let e=await callBackendApi("/api/id",{method:"POST",requiresAuth:!1});return e.data.id}catch(e){return console.error(`Failed to fetch unique ID, generating uuidv4 id: ${e.message}`,e),uuidv4()}}async function u(e,t=!0){let n=await m(e);return n?.url&&(t&&f("enhancedFrontImage",n.url,n.urlSmall),p("frontImage",window.innerWidth<=370?n.urlSmall:n.url)),g("frontImage"),n}async function m(e){try{let t=await callBackendApi("/api/images/enhance",{data:{imageUrl:e},requiresAuth:!1,timeoutSec:30});return sessionStorage.setItem("enhancedFrontImage",t.data.url),t.data}catch(e){return errorHandler.report(e),console.error(e),""}}function g(e){document.getElementById(`loading${y(e)}Icon`).style.display="none",document.getElementById(`delete${y(e)}Icon`).style.display="inline-block","frontImage"===e&&(document.getElementById("enhancedAnimationDiv").style.display="none")}function f(e,t,n){let r=JSON.parse(localStorage.getItem("newItem")||JSON.stringify({})),i=r.images||{};i[e]=t,i[`${e}Small`]=n,r.images=i,localStorage.setItem("newItem",JSON.stringify(r))}function p(e,t){document.getElementById(`${e}Preview`).style.backgroundImage=`url('${t}')`,g(e)}function y(e){return e.charAt(0).toUpperCase()+e.slice(1)}async function h(e,t,n=!0){try{x(t);let r=URL.createObjectURL(e);document.getElementById(`${t}PreviewUploading`).style.backgroundImage=`url('${r}')`,document.getElementById(`${t}Preview`).style.backgroundImage=`url('${r}')`,b(t),k(t,"success-state");let{url:o,urlSmall:a}=await i(e,t);return n&&f(t,o,a),o}catch(n){console.error("Failed to upload image",n),errorHandler.report(n),document.getElementById(`${t}PreviewUploading`).style.backgroundImage="",document.getElementById(`${t}Preview`).style.backgroundImage="",document.getElementById(`loading${y(t)}Icon`).style.display="none",k(t,"default-state"),e.size>10485760?v(t,"Error: Bilden \xe4r f\xf6r stor. Max 10 MB."):v(t,"Error: N\xe5got gick fel vid uppladdning, f\xf6rs\xf6k igen eller kontakt oss om felet kvarst\xe5r."),document.getElementById(t).value=""}}function v(e,t){let n=document.getElementById(e).parentNode.parentNode;n.querySelector(".w-file-upload-error").style.display="block",n.querySelector(".w-file-upload-error-msg").innerText=t}function x(e){let t=document.getElementById(e).parentNode.parentNode;t.querySelector(".w-file-upload-error").style.display="none"}function k(e,t){let n=document.getElementById(e).parentNode.parentNode.childNodes;for(let e=0;e<n.length;e++)n[e].className.includes(t)?n[e].style.display="block":n[e].style.display="none"}function b(e){if("frontImage"===e){document.getElementById(`delete${y(e)}Icon`).style.display="none",document.getElementById(`loading${y(e)}Icon`).style.display="none",localStorage.getItem("sessionUser")||(document.getElementById("photoroomDiv").style.display="flex"),document.getElementById("enhancedAnimationDiv").style.display="block",triggerEnhancingAnimation.click();return}document.getElementById(`loading${y(e)}Icon`).style.display="inline-block",document.getElementById(`delete${y(e)}Icon`).style.display="none"}function I(e,t){let n=["shein","lager 157","divided","brandy melville","cubus","bubbleroom","bondelid","nelly","dobber","\xe5hl\xe9ns","kappahl","primark","jack & jones","sisters point","missguided","topman","bik bok","cubus","happy holly","zign","glamorous","hollister","river island","light before dark","bohoo","crocker","forever 21","maze","mint&berry","chiara forthi","zalando","din sko","pull & bear","svea","zoul","boohoo","gap","topshop","ellos","lager 157","stradivarius","studio total","indiska","bershka","shein","riley","vero moda","vila","don donna","aldo","new look denim"],r=document.getElementById("hardToSellDiv");document.getElementById("itemBrand").setCustomValidity("");let i=getParamsObject();return!i.id&&(n.includes(e.toLowerCase())||!["boots","dunjacka","jacka","k\xe4ngor","kappa","kavaj","kostym","p\xe4lsjacka","regnjacka","rock","skinnjacka","vinterskor"].includes(t?.toLowerCase())&&["tom tailor","monki","dressmann","urban outfitters","asos","holly & white","only","gina tricot"].includes(e.toLowerCase())||["baddr\xe4kt","bikini","bodysuit","chinos","flip-flops","halsduk","handduk","hatt","jeans","keps","l\xe5ng\xe4rmad t-shirt","linne","mjukisbyxor","morgonrock","m\xf6ssa","necess\xe4r","pik\xe9","pyjamas","sandaler","sarong","shorts","slips","sport-bh","strumpbyxor","t-shirt","tights","topp","tr\xe4ningsbyxor","tr\xe4ningstr\xf6ja","underst\xe4ll","vantar"].includes(t?.toLowerCase())&&["karl kani","rieker","uniqlo","carin wester","stockh lm","weekday","mango","wera","ichi","lindex","h&m","zara","mng","mq","cheap monday","h&m premium","na-kd","clarks","gant","hackett","hugo boss","la chemise","lacoste","lyle & scott","marc o'polo","melvin & hamilton","ray-ban","reebok","sebago","stenstr\xf6ms","the shirt factory","hampton republic","quicksilver","banana republic","pieces","sprit","denim","east west","xit","jacqueline de yong","mexx","fb sister","ok\xe4nt","bodyflirt","dorothy perkins","fransa","laurel","rut&circle","soc","junkyard","soyaconcept","amisu","u.s. polo assn.","line of oslo","gossip","i say","jascha stockholm","noisy may","six ames","velour by nostalgi","house of lola","fiveunits","miss me","flash","champion","under armour","oasis","fornarina","isolde","rosebud","chiquelle","kaffe","mckinley","cream","abercrombie & fitch","modstr\xf6m","ecco","esprit","alice bizous","craft","ellesse","wesc","dry lake","r\xf6hnisch","acqua limone","anna field","le","ax paris","burton","hansen & jacob","lou in love","mad lady","selected homme","tenson","whistles","zizzi","gerry weber"].includes(e.toLowerCase()))?(hardToSellText.innerHTML=n.includes(e.toLowerCase())?`Vi s\xe4ljer tyv\xe4rr inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`:`Vi s\xe4ljer tyv\xe4rr inte kategorin ${t} fr\xe5n ${e} p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`,stopIcon.style.display="flex",warningIcon.style.display="none",r.style.display="block",document.getElementById("itemBrand").setCustomValidity(n.includes(e.toLowerCase())?`Vi s\xe4ljer inte plagg fr\xe5n ${e}`:`Vi s\xe4ljer inte kategorin '${t}' fr\xe5n ${e}`),!0):["H&M","HM","Zara","ASOS","Nelly","Gina Tricot","BikBok","Bik Bok","Lindex","Kappahl","Cubus","NA-KD","NAKD","Mango","Ellos","Primark","Shein","Vila","Forever 21","Pull & Bear","Bershka","Stradivarius"].some(t=>e.toLowerCase().includes(t.toLowerCase()))?(hardToSellText.innerHTML=`Vi s\xe4ljer i regel inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5gt andrahandsv\xe4rde. Undantag kan finnas.`,stopIcon.style.display="none",warningIcon.style.display="block",r.style.display="block",!0):void(r.style.display="none")}function B(e="Kategori",t=I){$("#itemCategory").select2({selectionCssClass:"form-field",placeholder:e||"Kategori",data:[{id:"",text:""},{text:"\xd6verdelar",children:[{id:"Tr\xf6ja",text:"Tr\xf6ja"},{id:"Blus",text:"Blus"},{id:"Topp",text:"Topp"},{id:"Skjorta",text:"Skjorta"},{id:"Linneskjorta",text:"Linneskjorta"},{id:"T-shirt",text:"T-shirt"},{id:"Kavaj",text:"Kavaj"},{id:"Sweatshirt",text:"Sweatshirt"},{id:"Hoodie",text:"Hoodie"},{id:"Polotr\xf6ja",text:"Polotr\xf6ja"},{id:"Tunika",text:"Tunika"},{id:"V\xe4st",text:"V\xe4st"},{id:"Kofta",text:"Kofta"},{id:"Linne",text:"Linne"},{id:"Tr\xe4ningstr\xf6ja",text:"Tr\xe4ningstr\xf6ja"},{id:"Poncho",text:"Poncho"},{id:"Pik\xe9",text:"Pik\xe9"},{id:"L\xe5ng\xe4rmad T-shirt",text:"L\xe5ng\xe4rmad T-shirt"},{id:"Kostymv\xe4st",text:"Kostymv\xe4st"}]},{text:"Underdelar",children:[{id:"Kjol",text:"Kjol"},{id:"Byxor",text:"Byxor"},{id:"Jeans",text:"Jeans"},{id:"Chinos",text:"Chinos"},{id:"Fritidsbyxor",text:"Fritidsbyxor"},{id:"Tr\xe4ningsbyxor",text:"Tr\xe4ningsbyxor"},{id:"Tights",text:"Tights"},{id:"Strumpbyxor",text:"Strumpbyxor"},{id:"Mjukisbyxor",text:"Mjukisbyxor"},{id:"Kostymbyxor",text:"Kostymbyxor"},{id:"Shorts",text:"Shorts"},{id:"Sarong",text:"Sarong"}]},{text:"Helkropp",children:[{id:"Kl\xe4nning",text:"Kl\xe4nning"},{id:"Kaftan",text:"Kaftan"},{id:"Kostym",text:"Kostym"},{id:"Set",text:"Set"},{id:"Jumpsuit",text:"Jumpsuit"},{id:"Baddr\xe4kt",text:"Baddr\xe4kt"},{id:"Bikini",text:"Bikini"},{id:"Pyjamas",text:"Pyjamas"},{id:"Morgonrock",text:"Morgonrock"},{id:"Br\xf6llopskl\xe4nning",text:"Br\xf6llopskl\xe4nning"},{id:"Balkl\xe4nning",text:"Balkl\xe4nning"},{id:"Bodysuit",text:"Bodysuit"},{id:"Underst\xe4ll",text:"Underst\xe4ll"}]},{text:"Ytterkl\xe4der",children:[{id:"Jacka",text:"Jacka"},{id:"Kappa",text:"Kappa"},{id:"Rock",text:"Rock"},{id:"Fritidsjacka",text:"Fritidsjacka"},{id:"Trenchcoat",text:"Trenchcoat"},{id:"Skinnjacka",text:"Skinnjacka"},{id:"Dunjacka",text:"Dunjacka"},{id:"Regnjacka",text:"Regnjacka"},{id:"P\xe4lsjacka",text:"P\xe4lsjacka"}]},{text:"Skor",children:[{id:"Sneakers",text:"Sneakers"},{id:"Sandaler",text:"Sandaler"},{id:"Klackar",text:"Klackar"},{id:"Ballerinaskor",text:"Ballerinaskor"},{id:"Loafers",text:"Loafers"},{id:"Flip-flops",text:"Flip-flops"},{id:"Regnst\xf6vlar",text:"Regnst\xf6vlar"},{id:"Boots",text:"Boots"},{id:"K\xe4ngor",text:"K\xe4ngor"},{id:"Vinterskor",text:"Vinterskor"},{id:"Skor",text:"Annat (Skor)"}]},{text:"V\xe4skor",children:[{id:"Axelremsv\xe4ska",text:"Axelremsv\xe4ska"},{id:"Handv\xe4ska",text:"Handv\xe4ska"},{id:"Kuvertv\xe4ska",text:"Kuvertv\xe4ska"},{id:"Ryggs\xe4ck",text:"Ryggs\xe4ck"},{id:"Tr\xe4ningsv\xe4ska",text:"Tr\xe4ningsv\xe4ska"},{id:"Resv\xe4ska",text:"Resv\xe4ska"},{id:"Datorv\xe4ska",text:"Datorv\xe4ska"},{id:"V\xe4ska",text:"Annat (V\xe4ska)"}]},{text:"Accessoarer",children:[{id:"Solglas\xf6gon",text:"Solglas\xf6gon"},{id:"Glas\xf6gon",text:"Glas\xf6gon"},{id:"\xd6rh\xe4nge",text:"\xd6rh\xe4nge"},{id:"Halsband",text:"Halsband"},{id:"Armband",text:"Armband"},{id:"Ring",text:"Ring"},{id:"Brosch",text:"Brosch"},{id:"Keps",text:"Keps"},{id:"Sjal",text:"Sjal"},{id:"Krage",text:"Krage"},{id:"B\xe4lte",text:"B\xe4lte"},{id:"Pl\xe5nbok",text:"Pl\xe5nbok"},{id:"Halsduk",text:"Halsduk"},{id:"Hatt",text:"Hatt"},{id:"M\xf6ssa",text:"M\xf6ssa"},{id:"Vantar",text:"Vantar"},{id:"Necess\xe4r",text:"Necess\xe4r"},{id:"Slips",text:"Slips"},{id:"Handduk",text:"Handduk"},{id:"Klocka",text:"Klocka"}]}]}),$("body").on("click",".select2-container--open .select2-results__group",function(){$(this).parent().attr("class").match(/expanded-group/)?$(this).parent().removeClass("expanded-group"):($(".expanded-group").first().removeClass("expanded-group"),$(this).parent().addClass("expanded-group"))});let n=!1;$("#itemCategory").on("select2:select",()=>{analytics.track("Click",{elementID:"itemCategoryValue"}),document.querySelector("#itemCategory").dispatchEvent(new Event("change"))});let r=!1;$("#itemCategory").on("select2:open",()=>{r||(r=!0,$("input.select2-search__field").on("click",()=>{analytics.track("Click",{elementID:"itemCategorySearch"})}))}),$("#itemCategory").on("select2:close",()=>{document.querySelector("body").style.overflow="auto",document.querySelector("body").style.position="static",document.querySelector("html").style.overflow="static"}),$("#itemCategory").on("select2:open",function(){analytics.track("Element Viewed",{elementID:"itemCategoryContainer"}),document.querySelector("body").style.overflow="hidden",document.querySelector("body").style.position="fixed",document.querySelector("html").style.overflow="fixed";let e=document.querySelector(".select2-search__field");if(e.placeholder="S\xf6k... (t.ex. Kl\xe4nning/Sneakers/Blus)",$(".select2-search__field").on("input",e=>{e.target.value.length>0?$(".select2-results__option[role=group]").each((e,t)=>$(t).addClass("expanded-group")):$(".expanded-group").each((e,t)=>$(t).removeClass("expanded-group"))}),!n){let e=document.getElementById("categoryPopUpHeader"),t=document.querySelector(".select2-dropdown");t.insertBefore(e,t.firstChild),e.style.display="block",e.querySelector("#categorySelectClose").onclick=()=>$("#itemCategory").select2("close"),n=!0}document.querySelector(".select2-results__options").addEventListener("scroll",()=>document.activeElement.blur())}),$("#itemCategory").on("change",e=>{w("itemCategoryLabel")(e);let n=document.getElementById("itemCategory"),r=document.getElementById("itemBrand");t(r.value,n.value)}),// From https://github.com/select2/select2/issues/3015#issuecomment-570171720
$("#itemCategory").on("select2:open",function(){$(".select2-results").css("visibility","hidden")}),$("#itemCategory").on("select2:opening",function(){setTimeout(function(){$(".select2-results").css("visibility","visible")},50)})}function w(e){return t=>{document.getElementById(e).style.display=t.target.value.length>0?"inline-block":"none"}}r.defineInteropFlag(n),r.export(n,"uploadTempImage",()=>i),r.export(n,"requestUniqueId",()=>c),r.export(n,"enhanceFrontImage",()=>u),r.export(n,"showDeleteImageIcon",()=>g),r.export(n,"rememberNewItemImageField",()=>f),r.export(n,"showImagePreview",()=>p),r.export(n,"capitalizeFirstLetter",()=>y),r.export(n,"uploadImageAndShowPreview",()=>h),r.export(n,"showImageError",()=>v),r.export(n,"hideImageError",()=>x),r.export(n,"showImageState",()=>k),r.export(n,"showLoadingIcon",()=>b),r.export(n,"checkBlockedOrLowShareSoldBrand",()=>I),r.export(n,"initializeCategorySelect",()=>B),r.export(n,"fieldLabelToggle",()=>w),r.export(n,"colorMapping",()=>E),r.export(n,"colorName",()=>S),r.export(n,"swedishColorToEnglish",()=>T);let E={Beige:"Beige",Blue:"Bl\xe5",Brown:"Brun",Green:"Gr\xf6n",Grey:"Gr\xe5",Yellow:"Gul",Gold:"Guld",Purple:"Lila",Navy:"Navy",Orange:"Orange",Pink:"Rosa",Red:"R\xf6d",Silver:"Silver",Black:"Svart",Turquoise:"Turkos",Burgundy:"Vinr\xf6d",White:"Vit",Multicolour:"Flerf\xe4rgad"};function S(e){return E[e]||e}function T(e){return Object.entries(E).find(([t,n])=>n.toLowerCase()===e.toLowerCase())?.[0]||e}},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"6s2CO":[function(e,t,n){let r=e("da1f68cc1fc16077"),i=e("8c6cf49ef2287430"),o=e("8a60cf7722cc14ce"),a=e("f6fcc816b915ba37");function l(e,t,n,o,a){let l=[].slice.call(arguments,1),s=l.length,d="function"==typeof l[s-1];if(!d&&!r())throw Error("Callback required as last argument");if(d){if(s<2)throw Error("Too few arguments provided");2===s?(a=n,n=t,t=o=void 0):3===s&&(t.getContext&&void 0===a?(a=o,o=void 0):(a=o,o=n,n=t,t=void 0))}else{if(s<1)throw Error("Too few arguments provided");return 1===s?(n=t,t=o=void 0):2!==s||t.getContext||(o=n,n=t,t=void 0),new Promise(function(r,a){try{let a=i.create(n,o);r(e(a,t,o))}catch(e){a(e)}})}try{let r=i.create(n,o);a(null,e(r,t,o))}catch(e){a(e)}}n.create=i.create,n.toCanvas=l.bind(null,o.render),n.toDataURL=l.bind(null,o.renderToDataURL),// only svg for now.
n.toString=l.bind(null,function(e,t,n){return a.render(e,n)})},{da1f68cc1fc16077:"2F9VO","8c6cf49ef2287430":"e9qY0","8a60cf7722cc14ce":"i1BDL",f6fcc816b915ba37:"8CcR1"}],"2F9VO":[function(e,t,n){// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
t.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},{}],e9qY0:[function(e,t,n){let r=e("4cf6a8173d9f3a2"),i=e("2ad62f61c352884c"),o=e("87d5a6270eb1dc26"),a=e("91abc94f777368cc"),l=e("9737c3939ab85d95"),s=e("cee3d371e219e45e"),d=e("8700c8c682afabf3"),c=e("65ad903a6ba3e"),u=e("1e8e447afb4d169c"),m=e("8a4a19af97836d80"),g=e("26720f9d94c9e268"),f=e("7b6429a248ecc51f"),p=e("1368d0fa14524351");/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */function y(e,t,n){let r,i;let o=e.size,a=g.getEncodedBits(t,n);for(r=0;r<15;r++)i=(a>>r&1)==1,r<6?e.set(r,8,i,!0):r<8?e.set(r+1,8,i,!0):e.set(o-15+r,8,i,!0),r<8?e.set(8,o-r-1,i,!0):r<9?e.set(8,15-r-1+1,i,!0):e.set(8,15-r-1,i,!0);// fixed module
e.set(o-8,8,1,!0)}/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */n.create=function(e,t){let n,g;if(void 0===e||""===e)throw Error("No input text");let h=i.M;return void 0!==t&&(// Use higher error correction level as default
h=i.from(t.errorCorrectionLevel,i.M),n=m.from(t.version),g=d.from(t.maskPattern),t.toSJISFunc&&r.setToSJISFunction(t.toSJISFunc)),/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */function(e,t,n,i){let g;if(Array.isArray(e))g=p.fromArray(e);else if("string"==typeof e){let r=t;if(!r){let t=p.rawSplit(e);// Estimate best version that can contain raw splitted segments
r=m.getBestVersionForData(t,n)}// Build optimized segments
// If estimated version is undefined, try with the highest version
g=p.fromString(e,r||40)}else throw Error("Invalid data");// Get the min version that can contain data
let h=m.getBestVersionForData(g,n);// If no version is found, data cannot be stored
if(!h)throw Error("The amount of data is too big to be stored in a QR Code");// If not specified, use min version as default
if(t){if(t<h)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+h+".\n")}else t=h;let v=/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */function(e,t,n){// Prepare data buffer
let i=new o;n.forEach(function(t){// prefix data with mode indicator (4 bits)
i.put(t.mode.bit,4),// Prefix data with character count indicator.
// The character count indicator is a string of bits that represents the
// number of characters that are being encoded.
// The character count indicator must be placed after the mode indicator
// and must be a certain number of bits long, depending on the QR version
// and data mode
// @see {@link Mode.getCharCountIndicator}.
i.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),// add binary data sequence to buffer
t.write(i)});// Calculate required number of bits
let a=r.getSymbolTotalCodewords(e),l=c.getTotalCodewordsCount(e,t),s=(a-l)*8;// If the bit string is fewer than four bits shorter, add only the number of 0s that
// are needed to reach the required number of bits.
// After adding the terminator, if the number of bits in the string is not a multiple of 8,
// pad the string on the right with 0s to make the string's length a multiple of 8.
for(i.getLengthInBits()+4<=s&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(0);// Add pad bytes if the string is still shorter than the total number of required bits.
// Extend the buffer to fill the data capacity of the symbol corresponding to
// the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
// and 00010001 (0x11) alternately.
let d=(s-i.getLengthInBits())/8;for(let e=0;e<d;e++)i.put(e%2?17:236,8);return(/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */function(e,t,n){let i,o;// Total codewords for this QR code version (Data + Error correction)
let a=r.getSymbolTotalCodewords(t),l=c.getTotalCodewordsCount(t,n),s=a-l,d=c.getBlocksCount(t,n),m=a%d,g=d-m,f=Math.floor(a/d),p=Math.floor(s/d),y=p+1,h=f-p,v=new u(h),x=0,k=Array(d),b=Array(d),I=0,B=new Uint8Array(e.buffer);// Divide the buffer into the required number of blocks
for(let e=0;e<d;e++){let t=e<g?p:y;// extract a block of data from buffer
k[e]=B.slice(x,x+t),// Calculate EC codewords for this data block
b[e]=v.encode(k[e]),x+=t,I=Math.max(I,t)}// Create final data
// Interleave the data and error correction codewords from each block
let w=new Uint8Array(a),E=0;// Add data codewords
for(i=0;i<I;i++)for(o=0;o<d;o++)i<k[o].length&&(w[E++]=k[o][i]);// Apped EC codewords
for(i=0;i<h;i++)for(o=0;o<d;o++)w[E++]=b[o][i];return w}(i,e,t))}(t,n,g),x=r.getSymbolSize(t),k=new a(x);return(// Add function modules
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*//**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(e,t){let n=e.size,r=s.getPositions(t);for(let t=0;t<r.length;t++){let i=r[t][0],o=r[t][1];for(let t=-1;t<=7;t++)if(!(i+t<=-1)&&!(n<=i+t))for(let r=-1;r<=7;r++)o+r<=-1||n<=o+r||(t>=0&&t<=6&&(0===r||6===r)||r>=0&&r<=6&&(0===t||6===t)||t>=2&&t<=4&&r>=2&&r<=4?e.set(i+t,o+r,!0,!0):e.set(i+t,o+r,!1,!0))}}(k,t),/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */function(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}(k),/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(e,t){let n=l.getPositions(t);for(let t=0;t<n.length;t++){let r=n[t][0],i=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)-2===t||2===t||-2===n||2===n||0===t&&0===n?e.set(r+t,i+n,!0,!0):e.set(r+t,i+n,!1,!0)}}(k,t),// Add temporary dummy bits for format info just to set them as reserved.
// This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
// since the masking operation must be performed only on the encoding region.
// These blocks will be replaced with correct values later in code.
y(k,n,0),t>=7&&/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(e,t){let n,r,i;let o=e.size,a=m.getEncodedBits(t);for(let t=0;t<18;t++)n=Math.floor(t/3),r=t%3+o-8-3,i=(a>>t&1)==1,e.set(n,r,i,!0),e.set(r,n,i,!0)}(k,t),// Add data codewords
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */function(e,t){let n=e.size,r=-1,i=n-1,o=7,a=0;for(let l=n-1;l>0;l-=2)for(6===l&&l--;;){for(let n=0;n<2;n++)if(!e.isReserved(i,l-n)){let r=!1;a<t.length&&(r=(t[a]>>>o&1)==1),e.set(i,l-n,r),-1==--o&&(a++,o=7)}if((i+=r)<0||n<=i){i-=r,r=-r;break}}}(k,v),isNaN(i)&&(i=d.getBestMask(k,y.bind(null,k,n))),// Apply mask pattern
d.applyMask(i,k),// Replace format info bits with correct values
y(k,n,i),{modules:k,version:t,errorCorrectionLevel:n,maskPattern:i,segments:g})}(e,n,h,g)}},{"4cf6a8173d9f3a2":"2iHLf","2ad62f61c352884c":"kU8Fo","87d5a6270eb1dc26":"dvmjt","91abc94f777368cc":"4koKB","9737c3939ab85d95":"2m37T",cee3d371e219e45e:"9BWaM","8700c8c682afabf3":"2hy8U","65ad903a6ba3e":"ivpAq","1e8e447afb4d169c":"ixGQe","8a4a19af97836d80":"61NkN","26720f9d94c9e268":"4DCia","7b6429a248ecc51f":"2XDDf","1368d0fa14524351":"kBoY1"}],"2iHLf":[function(e,t,n){let r;let i=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */n.getSymbolSize=function(e){if(!e)throw Error('"version" cannot be null or undefined');if(e<1||e>40)throw Error('"version" should be in range from 1 to 40');return 4*e+17},/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */n.getSymbolTotalCodewords=function(e){return i[e]},/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */n.getBCHDigit=function(e){let t=0;for(;0!==e;)t++,e>>>=1;return t},n.setToSJISFunction=function(e){if("function"!=typeof e)throw Error('"toSJISFunc" is not a valid function.');r=e},n.isKanjiModeEnabled=function(){return void 0!==r},n.toSJIS=function(e){return r(e)}},{}],kU8Fo:[function(e,t,n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2},n.isValid=function(e){return e&&void 0!==e.bit&&e.bit>=0&&e.bit<4},n.from=function(e,t){if(n.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw Error("Param is not a string");let t=e.toLowerCase();switch(t){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw Error("Unknown EC Level: "+e)}}(e)}catch(e){return t}}},{}],dvmjt:[function(e,t,n){function r(){this.buffer=[],this.length=0}r.prototype={get:function(e){return(this.buffer[Math.floor(e/8)]>>>7-e%8&1)==1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},t.exports=r},{}],"4koKB":[function(e,t,n){/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */function r(e){if(!e||e<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */r.prototype.set=function(e,t,n,r){let i=e*this.size+t;this.data[i]=n,r&&(this.reservedBit[i]=!0)},/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */r.prototype.get=function(e,t){return this.data[e*this.size+t]},/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */r.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */r.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},t.exports=r},{}],"2m37T":[function(e,t,n){/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */let r=e("3fa093180e62a22a").getSymbolSize;/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */n.getRowColCoords=function(e){if(1===e)return[];let t=Math.floor(e/7)+2,n=r(e),i=145===n?26:2*Math.ceil((n-13)/(2*t-2)),o=[n-7]// Last coord is always (size - 7)
;for(let e=1;e<t-1;e++)o[e]=o[e-1]-i;return o.push(6)// First coord is always 6
,o.reverse()},/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */n.getPositions=function(e){let t=[],r=n.getRowColCoords(e),i=r.length;for(let e=0;e<i;e++)for(let n=0;n<i;n++)// Skip if position is occupied by finder patterns
(0!==e||0!==n)&&// top-left
(0!==e||n!==i-1)&&// bottom-left
(e!==i-1||0!==n)&&t.push([r[e],r[n]]);return t}},{"3fa093180e62a22a":"2iHLf"}],"9BWaM":[function(e,t,n){let r=e("6ec9ae5660047293").getSymbolSize;/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */n.getPositions=function(e){let t=r(e);return[// top-left
[0,0],// top-right
[t-7,0],// bottom-left
[0,t-7]]}},{"6ec9ae5660047293":"2iHLf"}],"2hy8U":[function(e,t,n){/**
 * Data mask pattern reference
 * @type {Object}
 */n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */let r={N1:3,N2:3,N3:40,N4:10};/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */n.isValid=function(e){return null!=e&&""!==e&&!isNaN(e)&&e>=0&&e<=7},/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */n.from=function(e){return n.isValid(e)?parseInt(e,10):void 0},/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/n.getPenaltyN1=function(e){let t=e.size,n=0,i=0,o=0,a=null,l=null;for(let s=0;s<t;s++){i=o=0,a=l=null;for(let d=0;d<t;d++){let t=e.get(s,d);t===a?i++:(i>=5&&(n+=r.N1+(i-5)),a=t,i=1),(t=e.get(d,s))===l?o++:(o>=5&&(n+=r.N1+(o-5)),l=t,o=1)}i>=5&&(n+=r.N1+(i-5)),o>=5&&(n+=r.N1+(o-5))}return n},/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */n.getPenaltyN2=function(e){let t=e.size,n=0;for(let r=0;r<t-1;r++)for(let i=0;i<t-1;i++){let t=e.get(r,i)+e.get(r,i+1)+e.get(r+1,i)+e.get(r+1,i+1);(4===t||0===t)&&n++}return n*r.N2},/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */n.getPenaltyN3=function(e){let t=e.size,n=0,i=0,o=0;for(let r=0;r<t;r++){i=o=0;for(let a=0;a<t;a++)i=i<<1&2047|e.get(r,a),a>=10&&(1488===i||93===i)&&n++,o=o<<1&2047|e.get(a,r),a>=10&&(1488===o||93===o)&&n++}return n*r.N3},/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */n.getPenaltyN4=function(e){let t=0,n=e.data.length;for(let r=0;r<n;r++)t+=e.data[r];let i=Math.abs(Math.ceil(100*t/n/5)-10);return i*r.N4},/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */n.applyMask=function(e,t){let r=t.size;for(let i=0;i<r;i++)for(let o=0;o<r;o++)t.isReserved(o,i)||t.xor(o,i,/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */function(e,t,r){switch(e){case n.Patterns.PATTERN000:return(t+r)%2==0;case n.Patterns.PATTERN001:return t%2==0;case n.Patterns.PATTERN010:return r%3==0;case n.Patterns.PATTERN011:return(t+r)%3==0;case n.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(r/3))%2==0;case n.Patterns.PATTERN101:return t*r%2+t*r%3==0;case n.Patterns.PATTERN110:return(t*r%2+t*r%3)%2==0;case n.Patterns.PATTERN111:return(t*r%3+(t+r)%2)%2==0;default:throw Error("bad maskPattern:"+e)}}(e,o,i))},/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */n.getBestMask=function(e,t){let r=Object.keys(n.Patterns).length,i=0,o=1/0;for(let a=0;a<r;a++){t(a),n.applyMask(a,e);// Calculate penalty
let r=n.getPenaltyN1(e)+n.getPenaltyN2(e)+n.getPenaltyN3(e)+n.getPenaltyN4(e);// Undo previously applied mask
n.applyMask(a,e),r<o&&(o=r,i=a)}return i}},{}],ivpAq:[function(e,t,n){let r=e("7baaa530584d1bc4"),i=[// L  M  Q  H
1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],o=[// L  M  Q  H
7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */n.getBlocksCount=function(e,t){switch(t){case r.L:return i[(e-1)*4+0];case r.M:return i[(e-1)*4+1];case r.Q:return i[(e-1)*4+2];case r.H:return i[(e-1)*4+3];default:return}},/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */n.getTotalCodewordsCount=function(e,t){switch(t){case r.L:return o[(e-1)*4+0];case r.M:return o[(e-1)*4+1];case r.Q:return o[(e-1)*4+2];case r.H:return o[(e-1)*4+3];default:return}}},{"7baaa530584d1bc4":"kU8Fo"}],ixGQe:[function(e,t,n){let r=e("742a7ee6d6a2d145");function i(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */i.prototype.initialize=function(e){// create an irreducible generator polynomial
this.degree=e,this.genPoly=r.generateECPolynomial(this.degree)},/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */i.prototype.encode=function(e){if(!this.genPoly)throw Error("Encoder not initialized");// Calculate EC for this data block
// extends data size to data+genPoly size
let t=new Uint8Array(e.length+this.degree);t.set(e);// The error correction codewords are the remainder after dividing the data codewords
// by a generator polynomial
let n=r.mod(t,this.genPoly),i=this.degree-n.length;if(i>0){let e=new Uint8Array(this.degree);return e.set(n,i),e}return n},t.exports=i},{"742a7ee6d6a2d145":"bFrZA"}],bFrZA:[function(e,t,n){let r=e("780c74029318268c");/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */n.mul=function(e,t){let n=new Uint8Array(e.length+t.length-1);for(let i=0;i<e.length;i++)for(let o=0;o<t.length;o++)n[i+o]^=r.mul(e[i],t[o]);return n},/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */n.mod=function(e,t){let n=new Uint8Array(e);for(;n.length-t.length>=0;){let e=n[0];for(let i=0;i<t.length;i++)n[i]^=r.mul(t[i],e);// remove all zeros from buffer head
let i=0;for(;i<n.length&&0===n[i];)i++;n=n.slice(i)}return n},/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */n.generateECPolynomial=function(e){let t=new Uint8Array([1]);for(let i=0;i<e;i++)t=n.mul(t,new Uint8Array([1,r.exp(i)]));return t}},{"780c74029318268c":"3WlDl"}],"3WlDl":[function(e,t,n){let r=new Uint8Array(512),i=new Uint8Array(256)/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */;!function(){let e=1;for(let t=0;t<255;t++)r[t]=e,i[e]=t,256&(e<<=1// multiply by 2
)&&(e^=285);// Optimization: double the size of the anti-log table so that we don't need to mod 255 to
// stay inside the bounds (because we will mainly use this table for the multiplication of
// two GF numbers, no more).
// @see {@link mul}
for(let e=255;e<512;e++)r[e]=r[e-255]}(),/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.log=function(e){if(e<1)throw Error("log("+e+")");return i[e]},/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.exp=function(e){return r[e]},/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */n.mul=function(e,t){return 0===e||0===t?0:r[i[e]+i[t]]}},{}],"61NkN":[function(e,t,n){let r=e("f67b02cdf61cb7c6"),i=e("777da0d92c463f2e"),o=e("acd5b4fcd696edf3"),a=e("5303c314c4a688d7"),l=e("663d0e03da8b2897"),s=r.getBCHDigit(7973);function d(e,t){// Character count indicator + mode indicator bits
return a.getCharCountIndicator(e,t)+4}/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */n.from=function(e,t){return l.isValid(e)?parseInt(e,10):t},/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */n.getCapacity=function(e,t,n){if(!l.isValid(e))throw Error("Invalid QR Code version");// Use Byte mode as default
void 0===n&&(n=a.BYTE);// Total codewords for this QR code version (Data + Error correction)
let o=r.getSymbolTotalCodewords(e),s=i.getTotalCodewordsCount(e,t),c=(o-s)*8;if(n===a.MIXED)return c;let u=c-d(n,e);// Return max number of storable codewords
switch(n){case a.NUMERIC:return Math.floor(u/10*3);case a.ALPHANUMERIC:return Math.floor(u/11*2);case a.KANJI:return Math.floor(u/13);case a.BYTE:default:return Math.floor(u/8)}},/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */n.getBestVersionForData=function(e,t){let r;let i=o.from(t,o.M);if(Array.isArray(e)){if(e.length>1)return function(e,t){for(let r=1;r<=40;r++){let i=function(e,t){let n=0;return e.forEach(function(e){let r=d(e.mode,t);n+=r+e.getBitsLength()}),n}(e,r);if(i<=n.getCapacity(r,t,a.MIXED))return r}}(e,i);if(0===e.length)return 1;r=e[0]}else r=e;return function(e,t,r){for(let i=1;i<=40;i++)if(t<=n.getCapacity(i,r,e))return i}(r.mode,r.getLength(),i)},/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */n.getEncodedBits=function(e){if(!l.isValid(e)||e<7)throw Error("Invalid QR Code version");let t=e<<12;for(;r.getBCHDigit(t)-s>=0;)t^=7973<<r.getBCHDigit(t)-s;return e<<12|t}},{f67b02cdf61cb7c6:"2iHLf","777da0d92c463f2e":"ivpAq",acd5b4fcd696edf3:"kU8Fo","5303c314c4a688d7":"2XDDf","663d0e03da8b2897":"dFhhu"}],"2XDDf":[function(e,t,n){let r=e("488660fac9162579"),i=e("a23fd227d32f3622");/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */n.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */n.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */n.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */n.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */n.MIXED={bit:-1},/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */n.getCharCountIndicator=function(e,t){if(!e.ccBits)throw Error("Invalid mode: "+e);if(!r.isValid(t))throw Error("Invalid version: "+t);return t>=1&&t<10?e.ccBits[0]:t<27?e.ccBits[1]:e.ccBits[2]},/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */n.getBestModeForData=function(e){return i.testNumeric(e)?n.NUMERIC:i.testAlphanumeric(e)?n.ALPHANUMERIC:i.testKanji(e)?n.KANJI:n.BYTE},/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */n.toString=function(e){if(e&&e.id)return e.id;throw Error("Invalid mode")},/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */n.isValid=function(e){return e&&e.bit&&e.ccBits},/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */n.from=function(e,t){if(n.isValid(e))return e;try{return(/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */function(e){if("string"!=typeof e)throw Error("Param is not a string");let t=e.toLowerCase();switch(t){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw Error("Unknown mode: "+e)}}(e))}catch(e){return t}}},{"488660fac9162579":"dFhhu",a23fd227d32f3622:"fkiQV"}],dFhhu:[function(e,t,n){/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */n.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}},{}],fkiQV:[function(e,t,n){let r="[0-9]+",i="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";i=i.replace(/u/g,"\\u");let o="(?:(?![A-Z0-9 $%*+\\-./:]|"+i+")(?:.|[\r\n]))+";n.KANJI=RegExp(i,"g"),n.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),n.BYTE=RegExp(o,"g"),n.NUMERIC=RegExp(r,"g"),n.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let a=RegExp("^"+i+"$"),l=RegExp("^"+r+"$"),s=RegExp("^[A-Z0-9 $%*+\\-./:]+$");n.testKanji=function(e){return a.test(e)},n.testNumeric=function(e){return l.test(e)},n.testAlphanumeric=function(e){return s.test(e)}},{}],"4DCia":[function(e,t,n){let r=e("eeca831a42e85d6c"),i=r.getBCHDigit(1335);/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */n.getEncodedBits=function(e,t){let n=e.bit<<3|t,o=n<<10;for(;r.getBCHDigit(o)-i>=0;)o^=1335<<r.getBCHDigit(o)-i;// xor final data with mask pattern in order to ensure that
// no combination of Error Correction Level and data mask pattern
// will result in an all-zero data string
return(n<<10|o)^21522}},{eeca831a42e85d6c:"2iHLf"}],kBoY1:[function(e,t,n){let r=e("45f6d4bff9d2fc72"),i=e("73109cbf4f3c309d"),o=e("5320016e34c30467"),a=e("fd16f8f25b581951"),l=e("8a7b84039f1cf0d2"),s=e("79379a3a8f3c26bb"),d=e("66903ca51bd2ea1d"),c=e("3b9f47d541e7d71f");/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */function u(e){return unescape(encodeURIComponent(e)).length}/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */function m(e,t,n){let r;let i=[];for(;null!==(r=e.exec(n));)i.push({data:r[0],index:r.index,mode:t,length:r[0].length});return i}/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */function g(e){let t,n;let i=m(s.NUMERIC,r.NUMERIC,e),o=m(s.ALPHANUMERIC,r.ALPHANUMERIC,e);d.isKanjiModeEnabled()?(t=m(s.BYTE,r.BYTE,e),n=m(s.KANJI,r.KANJI,e)):(t=m(s.BYTE_KANJI,r.BYTE,e),n=[]);let a=i.concat(o,t,n);return a.sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */function f(e,t){switch(t){case r.NUMERIC:return i.getBitsLength(e);case r.ALPHANUMERIC:return o.getBitsLength(e);case r.KANJI:return l.getBitsLength(e);case r.BYTE:return a.getBitsLength(e)}}/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */function p(e,t){let n;let s=r.getBestModeForData(e);// Make sure data can be encoded
if((n=r.from(t,s))!==r.BYTE&&n.bit<s.bit)throw Error('"'+e+'" cannot be encoded with mode '+r.toString(n)+".\n Suggested mode is: "+r.toString(s));switch(n!==r.KANJI||d.isKanjiModeEnabled()||(n=r.BYTE),n){case r.NUMERIC:return new i(e);case r.ALPHANUMERIC:return new o(e);case r.KANJI:return new l(e);case r.BYTE:return new a(e)}}/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */n.fromArray=function(e){return e.reduce(function(e,t){return"string"==typeof t?e.push(p(t,null)):t.data&&e.push(p(t.data,t.mode)),e},[])},/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */n.fromString=function(e,t){let i=g(e,d.isKanjiModeEnabled()),o=/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */function(e){let t=[];for(let n=0;n<e.length;n++){let i=e[n];switch(i.mode){case r.NUMERIC:t.push([i,{data:i.data,mode:r.ALPHANUMERIC,length:i.length},{data:i.data,mode:r.BYTE,length:i.length}]);break;case r.ALPHANUMERIC:t.push([i,{data:i.data,mode:r.BYTE,length:i.length}]);break;case r.KANJI:t.push([i,{data:i.data,mode:r.BYTE,length:u(i.data)}]);break;case r.BYTE:t.push([{data:i.data,mode:r.BYTE,length:u(i.data)}])}}return t}(i),a=/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */function(e,t){let n={},i={start:{}},o=["start"];for(let a=0;a<e.length;a++){let l=e[a],s=[];for(let e=0;e<l.length;e++){let d=l[e],c=""+a+e;s.push(c),n[c]={node:d,lastCount:0},i[c]={};for(let e=0;e<o.length;e++){let a=o[e];n[a]&&n[a].node.mode===d.mode?(i[a][c]=f(n[a].lastCount+d.length,d.mode)-f(n[a].lastCount,d.mode),n[a].lastCount+=d.length):(n[a]&&(n[a].lastCount=d.length),i[a][c]=f(d.length,d.mode)+4+r.getCharCountIndicator(d.mode,t)// switch cost
)}}o=s}for(let e=0;e<o.length;e++)i[o[e]].end=0;return{map:i,table:n}}(o,t),l=c.find_path(a.map,"start","end"),s=[];for(let e=1;e<l.length-1;e++)s.push(a.table[l[e]].node);return n.fromArray(s.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?e[e.length-1].data+=t.data:e.push(t),e},[]))},/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */n.rawSplit=function(e){return n.fromArray(g(e,d.isKanjiModeEnabled()))}},{"45f6d4bff9d2fc72":"2XDDf","73109cbf4f3c309d":"hTs8T","5320016e34c30467":"203uh",fd16f8f25b581951:"f7sIe","8a7b84039f1cf0d2":"1otz8","79379a3a8f3c26bb":"fkiQV","66903ca51bd2ea1d":"2iHLf","3b9f47d541e7d71f":"2Nh6w"}],hTs8T:[function(e,t,n){let r=e("29134b0b0820b091");function i(e){this.mode=r.NUMERIC,this.data=e.toString()}i.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t,n;// The input data string is divided into groups of three digits,
// and each group is converted to its 10-bit binary equivalent.
for(t=0;t+3<=this.data.length;t+=3)n=parseInt(this.data.substr(t,3),10),e.put(n,10);// If the number of input digits is not an exact multiple of three,
// the final one or two digits are converted to 4 or 7 bits respectively.
let r=this.data.length-t;r>0&&(n=parseInt(this.data.substr(t),10),e.put(n,3*r+1))},t.exports=i},{"29134b0b0820b091":"2XDDf"}],"203uh":[function(e,t,n){let r=e("9c7c9b869570f846"),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function o(e){this.mode=r.ALPHANUMERIC,this.data=e}o.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(e){let t;// Input data characters are divided into groups of two characters
// and encoded as 11-bit binary codes.
for(t=0;t+2<=this.data.length;t+=2){// The character value of the first character is multiplied by 45
let n=45*i.indexOf(this.data[t]);// The character value of the second digit is added to the product
n+=i.indexOf(this.data[t+1]),// The sum is then stored as 11-bit binary number
e.put(n,11)}// If the number of input data characters is not a multiple of two,
// the character value of the final character is encoded as a 6-bit binary number.
this.data.length%2&&e.put(i.indexOf(this.data[t]),6)},t.exports=o},{"9c7c9b869570f846":"2XDDf"}],f7sIe:[function(e,t,n){let r=e("1658cb836325c397"),i=e("a20a51f6cd184253");function o(e){this.mode=i.BYTE,"string"==typeof e&&(e=r(e)),this.data=new Uint8Array(e)}o.getBitsLength=function(e){return 8*e},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},t.exports=o},{"1658cb836325c397":"lmLJ0",a20a51f6cd184253:"2XDDf"}],lmLJ0:[function(e,t,n){t.exports=function(e){for(var t=[],n=e.length,r=0;r<n;r++){var i=e.charCodeAt(r);if(i>=55296&&i<=56319&&n>r+1){var o=e.charCodeAt(r+1);o>=56320&&o<=57343&&(// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
i=(i-55296)*1024+o-56320+65536,r+=1)}// US-ASCII
if(i<128){t.push(i);continue}// 2-byte UTF-8
if(i<2048){t.push(i>>6|192),t.push(63&i|128);continue}// 3-byte UTF-8
if(i<55296||i>=57344&&i<65536){t.push(i>>12|224),t.push(i>>6&63|128),t.push(63&i|128);continue}// 4-byte UTF-8
if(i>=65536&&i<=1114111){t.push(i>>18|240),t.push(i>>12&63|128),t.push(i>>6&63|128),t.push(63&i|128);continue}// Invalid character
t.push(239,191,189)}return new Uint8Array(t).buffer}},{}],"1otz8":[function(e,t,n){let r=e("b935cfd1cd03a1f6"),i=e("ca4944585cc8d12d");function o(e){this.mode=r.KANJI,this.data=e}o.getBitsLength=function(e){return 13*e},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(e){let t;// In the Shift JIS system, Kanji characters are represented by a two byte combination.
// These byte values are shifted from the JIS X 0208 values.
// JIS X 0208 gives details of the shift coded representation.
for(t=0;t<this.data.length;t++){let n=i.toSJIS(this.data[t]);// For characters with Shift JIS values from 0x8140 to 0x9FFC:
if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error("Invalid SJIS character: "+this.data[t]+"\nMake sure your charset is UTF-8");// Multiply most significant byte of result by 0xC0
// and add least significant byte to product
n=(n>>>8&255)*192+(255&n),// Convert result to a 13-bit binary string
e.put(n,13)}},t.exports=o},{b935cfd1cd03a1f6:"2XDDf",ca4944585cc8d12d:"2iHLf"}],"2Nh6w":[function(e,t,n){/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/var r={single_source_shortest_paths:function(e,t,n){// Predecessor map for each node that has been encountered.
// node ID => predecessor node ID
var i,o,a,l,s,d,c,u={},m={};m[t]=0;// Costs of shortest paths from s to all nodes encountered; differs from
// `costs` in that it provides easy access to the node that currently has
// the known shortest path from s.
// XXX: Do we actually need both `costs` and `open`?
var g=r.PriorityQueue.make();for(g.push(t,0);!g.empty();)// ...and explore the edges that connect u to those nodes, updating
// the cost of the shortest paths to any or all of those nodes as
// necessary. v is the node across the current edge from u.
for(a in o=// In the nodes remaining in graph that have a known cost from s,
// find the node, u, that currently has the shortest path from s.
(i=g.pop()).value,l=i.cost,// Get nodes adjacent to u...
s=e[o]||{})s.hasOwnProperty(a)&&(// Cost of s to u plus the cost of u to v across e--this is *a*
// cost from s to v that may or may not be less than the current
// known cost to v.
d=l+s[a],// If we haven't visited v yet OR if the current known cost from s to
// v is greater than the new cost we just found (cost of s to u plus
// cost of u to v across e), update v's cost in the cost list and
// update v's predecessor in the predecessor list (it's now u).
c=m[a],(void 0===m[a]||c>d)&&(m[a]=d,g.push(a,d),u[a]=o));if(void 0!==n&&void 0===m[n])throw Error(["Could not find a path from ",t," to ",n,"."].join(""));return u},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],r=t;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,t,n){var i=r.single_source_shortest_paths(e,t,n);return r.extract_shortest_path_from_predecessor_list(i,n)},/**
   * A very naive priority queue implementation.
   */PriorityQueue:{make:function(e){var t,n=r.PriorityQueue,i={};for(t in e=e||{},n)n.hasOwnProperty(t)&&(i[t]=n[t]);return i.queue=[],i.sorter=e.sorter||n.default_sorter,i},default_sorter:function(e,t){return e.cost-t.cost},/**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */push:function(e,t){this.queue.push({value:e,cost:t}),this.queue.sort(this.sorter)},/**
     * Return the highest priority element in the queue.
     */pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=r},{}],i1BDL:[function(e,t,n){let r=e("5b3f7c513802d6c7");n.render=function(e,t,n){var i;let o=n,a=t;void 0!==o||t&&t.getContext||(o=t,t=void 0),t||(a=function(){try{return document.createElement("canvas")}catch(e){throw Error("You need to specify a canvas element")}}()),o=r.getOptions(o);let l=r.getImageWidth(e.modules.size,o),s=a.getContext("2d"),d=s.createImageData(l,l);return r.qrToImageData(d.data,e,o),i=a,s.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=l,i.width=l,i.style.height=l+"px",i.style.width=l+"px",s.putImageData(d,0,0),a},n.renderToDataURL=function(e,t,r){let i=r;void 0!==i||t&&t.getContext||(i=t,t=void 0),i||(i={});let o=n.render(e,t,i),a=i.type||"image/png",l=i.rendererOpts||{};return o.toDataURL(a,l.quality)}},{"5b3f7c513802d6c7":"3YBlJ"}],"3YBlJ":[function(e,t,n){function r(e){if("number"==typeof e&&(e=e.toString()),"string"!=typeof e)throw Error("Color should be defined as hex string");let t=e.slice().replace("#","").split("");if(t.length<3||5===t.length||t.length>8)throw Error("Invalid hex color: "+e);(3===t.length||4===t.length)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),6===t.length&&t.push("F","F");let n=parseInt(t.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:255&n,hex:"#"+t.slice(0,6).join("")}}n.getOptions=function(e){e||(e={}),e.color||(e.color={});let t=void 0===e.margin||null===e.margin||e.margin<0?4:e.margin,n=e.width&&e.width>=21?e.width:void 0,i=e.scale||4;return{width:n,scale:n?4:i,margin:t,color:{dark:r(e.color.dark||"#000000ff"),light:r(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}},n.getScale=function(e,t){return t.width&&t.width>=e+2*t.margin?t.width/(e+2*t.margin):t.scale},n.getImageWidth=function(e,t){let r=n.getScale(e,t);return Math.floor((e+2*t.margin)*r)},n.qrToImageData=function(e,t,r){let i=t.modules.size,o=t.modules.data,a=n.getScale(i,r),l=Math.floor((i+2*r.margin)*a),s=r.margin*a,d=[r.color.light,r.color.dark];for(let t=0;t<l;t++)for(let n=0;n<l;n++){let c=(t*l+n)*4,u=r.color.light;if(t>=s&&n>=s&&t<l-s&&n<l-s){let e=Math.floor((t-s)/a),r=Math.floor((n-s)/a);u=d[o[e*i+r]?1:0]}e[c++]=u.r,e[c++]=u.g,e[c++]=u.b,e[c]=u.a}}},{}],"8CcR1":[function(e,t,n){let r=e("c36bbcf663291acc");function i(e,t){let n=e.a/255,r=t+'="'+e.hex+'"';return n<1?r+" "+t+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function o(e,t,n){let r=e+t;return void 0!==n&&(r+=" "+n),r}n.render=function(e,t,n){let a=r.getOptions(t),l=e.modules.size,s=e.modules.data,d=l+2*a.margin,c=a.color.light.a?"<path "+i(a.color.light,"fill")+' d="M0 0h'+d+"v"+d+'H0z"/>':"",u="<path "+i(a.color.dark,"stroke")+' d="'+function(e,t,n){let r="",i=0,a=!1,l=0;for(let s=0;s<e.length;s++){let d=Math.floor(s%t),c=Math.floor(s/t);d||a||(a=!0),e[s]?(l++,s>0&&d>0&&e[s-1]||(r+=a?o("M",d+n,.5+c+n):o("m",i,0),i=0,a=!1),d+1<t&&e[s+1]||(r+=o("h",l),l=0)):i++}return r}(s,l,a.margin)+'"/>',m=a.width?'width="'+a.width+'" height="'+a.width+'" ':"",g='<svg xmlns="http://www.w3.org/2000/svg" '+m+('viewBox="0 0 '+d)+" "+d+'" shape-rendering="crispEdges">'+c+u+"</svg>\n";return"function"==typeof n&&n(null,g),g}},{c36bbcf663291acc:"3YBlJ"}]},["flS2m"],"flS2m","parcelRequire81ca")//# sourceMappingURL=private.js.map
;
//# sourceMappingURL=private.js.map
