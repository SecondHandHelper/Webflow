!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,r,n,o){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof a[n]&&a[n],d=i.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(t,r){if(!d[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var o="function"==typeof a[n]&&a[n];if(!r&&o)return o(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(i)return i(t,!0);// Try the node require function if it exists.
if(l&&"string"==typeof t)return l(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},m.cache={};var u=d[t]=new s.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return d[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:s(t)}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=d,s.parent=i,s.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(s,"root",{get:function(){return a[n]}}),a[n]=s;for(var c=0;c<t.length;c++)s(t[c]);if(r){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=s(r);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):o&&(this[o]=u)}}({YhYNY:[function(e,t,r){var n=e("./general");function o(e){return({Beige:"Beige",Blue:"Bl\xe5",Brown:"Brun",Green:"Gr\xf6n",Grey:"Gr\xe5",Yellow:"Gul",Gold:"Guld",Purple:"Lila",Navy:"Navy",Orange:"Orange",Pink:"Rosa",Red:"R\xf6d",Silver:"Silver",Black:"Svart",Turquoise:"Turkos",Burgundy:"Vinr\xf6d",White:"Vit",Multicolour:"Flerf\xe4rgad"})[e]||e}let a=async e=>{let t=await (0,n.callBackendApi)(`/api/items/${e}`);return{...t?.data||{},id:e}},i=async()=>{let e=getParamsObject(),t=e.id?await a(e.id):JSON.parse(localStorage.getItem("latestItemCreated"));t||(console.error("Invalid item id param or no recently created item"),location.href="/private"),function(e){var t;let r,{humanCheckNeeded:n,maxPriceEstimate:a,newMinMaxLog:i}=e.mlValuation||{};e.infoRequests?.price?.response==="User proposal"?(document.getElementById("nextStepTitle").style.display="block",document.getElementById("nextStepTitle").innerText="Granskar pris\xe4ndringar",document.getElementById("nextStepText").innerText="Vi kikar p\xe5 dina pris\xe4ndringar, och om det ser bra ut s\xe5 p\xe5b\xf6rjar vi f\xf6rs\xe4ljningen. Vi tar sedan hand om s\xe4ljprocessen och h\xf6r av oss p\xe5 SMS n\xe4r plagget \xe4r s\xe5lt."):(n||!a&&!e.infoRequests?.price?.maxPrice||i)&&(document.getElementById("nextStepTitle").style.display="block",document.getElementById("nextStepText").innerText=`Ditt ${e.cleanedBrand||e.brand}-plagg beh\xf6ver v\xe4rderas manuellt, d\xe5 AI-v\xe4rderingen har l\xe4gre tr\xe4ffs\xe4kerhet p\xe5 detta varum\xe4rke. Du kommer f\xe5 ett SMS n\xe4r vi v\xe4rderat plagget som du kan ta st\xe4llning till.`),document.getElementById("itemTitle").innerText=(e.cleanedBrand||e.brand).trim()+"-"+e.category.toLowerCase(),document.getElementById("itemPrice").innerText=!e.maxPriceEstimate||n||i?"":`${e.maxPriceEstimate||a} SEK`,document.getElementById("itemPrice").style.display="block",document.getElementById("itemSubtitle").innerText=e.model?`${e.model}, ${o(e.color)}`:o(e.color),document.getElementById("itemSize").innerText=e.size,document.getElementById("itemMaterial").innerText=e.material,document.getElementById("itemCondition").innerText=e.condition=(r="",((r="Anv\xe4nd, tecken p\xe5 slitage"===(t=e).condition&&(t.defects.length||t.defectDescription)?t.defectDescription?t.defectDescription:t.defects&&t.defects.length>0?"Anm\xe4rkning: "+t.defects.filter(e=>"Annat"!==e).join(", "):t.condition:t.condition)+".").replace("..",".")),e.originalPrice&&(itemOriginalPrice.innerText=e.originalPrice+" SEK",originalPriceDiv.style.display="flex"),e.userComment&&(document.getElementById("itemComment").innerText=e.userComment,document.getElementById("itemCommentDiv").style.display="block"),e?.platformsToBePublishedOn?.length?function(e){if(e?.platformsToBePublishedOn?.length<2){document.getElementById("platformsSection").style.display="none";return}let t=document.getElementById("platformTradera");e.platformsToBePublishedOn.forEach(e=>{if(e.match(/Tradera/))return;// Tradera is set statically in Webflow and always displayed
let r=t.cloneNode(!0);r.id=e,r.innerText=e,t.parentNode.appendChild(r)}),document.getElementById("platformsLoadingDiv").style.display="none",document.getElementById("platformsDiv").style.display="block"}(e):document.getElementById("platformsSection").style.display="none"}(t),triggerShowContent.click()};i()},{"./general":"1tOWF"}],"1tOWF":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}n.defineInteropFlag(r),n.export(r,"signOut",()=>o),n.export(r,"BACKEND_API_URL",()=>a),// Function to call web api backend function, with or without auth
n.export(r,"callBackendApi",()=>i),n.export(r,"setFormAddressFields",()=>l),n.export(r,"getFormAddressFields",()=>s),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
n.export(r,"isValidSwedishSsn",()=>c),n.export(r,"formatPersonalId",()=>u),n.export(r,"itemCoverImage",()=>m),n.export(r,"shareCode",()=>g);let a="https://europe-west1-second-hand-helper.cloudfunctions.net/webApi";async function i(e,{data:t,method:r,requiresAuth:n=!0,timeoutSec:o=20}={}){// const { data, method, requiresAuth, timeoutSec = 20 } = opts;
let i=new AbortController,l=setTimeout(()=>i.abort(),1e3*o),s="",c=r||(t?"POST":"GET");(!0===n||!1!==n&&"GET"!==c)&&(s=await d());try{let r=await fetch(`${a}${e}`,{method:c,headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},...t?{body:JSON.stringify(t)}:{},signal:i.signal});if("0"===r.headers.get("content-length"))return{data:void 0};let n=await r.json();return n.data?n:{data:n}}catch(e){throw console.error(e),errorHandler.report(`Failure calling backend function ${JSON.stringify(e)}`),e}finally{clearTimeout(l)}}async function d(){let e=localStorage.getItem("idToken");if(!e){if(firebase.auth().currentUser){let e=await result.getIdToken();localStorage.setItem("idToken",e),authUser.current=firebase.auth().currentUser,localStorage.setItem("authUser",JSON.stringify(authUser.current))}else throw Error("User not authenticated")}return e}function l(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function s(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,r=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,i=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:r,addressCO:n,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:i=i?i.trim():""}}function c(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,r)=>(r%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function u(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function m(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function g(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let r=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(r),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||t.hasOwnProperty(r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["YhYNY"],"YhYNY","parcelRequire81ca")//# sourceMappingURL=itemConfirmation.js.map
;
//# sourceMappingURL=itemConfirmation.js.map
