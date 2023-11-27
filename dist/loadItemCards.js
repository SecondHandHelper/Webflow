!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,i,n,o){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r="function"==typeof a[n]&&a[n],s=r.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,i){if(!s[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var o="function"==typeof a[n]&&a[n];if(!i&&o)return o(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(r)return r(t,!0);// Try the node require function if it exists.
if(l&&"string"==typeof t)return l(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(i){var n=e[t][1][i];return null!=n?n:i},m.cache={};var u=s[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return s[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=s,d.parent=r,d.register=function(t,i){e[t]=[function(e,t){t.exports=i},{}]},Object.defineProperty(d,"root",{get:function(){return a[n]}}),a[n]=d;for(var c=0;c<t.length;c++)d(t[c]);if(i){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(i);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):o&&(this[o]=u)}}({dxOtH:[function(e,t,i){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(i),n.export(i,"loadItemCards",()=>c);var o=e("./general"),a=e("./private");async function r(e,t){console.log(`storeShippingMethod(${e}, ${t}) is running`),await db.collection("items").doc(e).update({shippingMethod:t}).then(i=>{console.log(`Shipping method '${t}' stored on item with ID: `,e),window.pickupFlowItemId=e,"Service point"==t&&(document.getElementById("feedbackFormTitle").innerHTML="Tack, d\xe5 vet vi att paketet snart l\xe4mnas till ett ombud.",document.getElementById("triggerShippingToastClose").click()),(0,a.closePickupToast)(),document.getElementById("triggerFeedbackFormOpen").click()})}function s(e,t){console.log("openShippingToast"),window.pickupFlowItemId=e,servicePointButton.addEventListener.click(async()=>{await r(e,"Service point")}),bookPickupButton.addEventListener("click",()=>{l(e,t)}),triggerShippingToastOpen.click()}function l(e,t,i="none"){console.log(`openPickupToast(${e}, ${t}) is running`),triggerShippingToastClose.click(),triggerServicePointToastClose.click(),changeToServicePointButton.addEventListener("click",async()=>{await r(e,"Service point")}),changeToServicePointButton.style.display=i,function(e){console.log(`setDatesOfPickupToast(${e}) is running`),// Hide all options first, to later determine which ones to show
radioFieldOne.style.display="none",radioFieldTwo.style.display="none",radioFieldThree.style.display="none",radioFieldFour.style.display="none";// Create the 4 first possible pickup dates, starting 4 b-days after soldDate
var t=new Date(e);t.setTime(t.getTime()+36e5),t.setDate(t.getDate()+4),6==t.getDay()||0==t.getDay()||1==t.getDay()||2==t.getDay()?t.setDate(t.getDate()+2):3==t.getDay()&&t.setDate(t.getDate()+1);var i=new Date(t);i.setDate(i.getDate()+1),6==i.getDay()&&i.setDate(i.getDate()+2);var n=new Date(i);n.setDate(n.getDate()+1),6==n.getDay()&&n.setDate(n.getDate()+2);var o=new Date(n);o.setDate(o.getDate()+1),6==o.getDay()&&o.setDate(o.getDate()+2);var a=["S\xf6ndag","M\xe5ndag","Tisdag","Onsdag","Torsdag","Fredag","L\xf6rdag"],r=["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"];// Change value of radio buttons and display to user
let s=new Date,l=0;console.log("Today",s),console.log("firstDate > today",t>s),console.log("secondDate > today",i>s),console.log("thirdDate > today",n>s),console.log("forthDate > today",o>s);let d=document.getElementById("pickupDateOne"),c=document.getElementById("pickupDateTwo"),u=document.getElementById("pickupDateThree"),m=document.getElementById("pickupDateFour");// If less than two options displayed, add at least two options
if(t>s&&($("#radioButtonOne").val(t.toISOString().split("T")[0]),d.innerHTML=a[t.getDay()]+", "+t.getDate()+" "+r[t.getMonth()]+", kl 9-16",radioFieldOne.style.display="flex",l++),i>s&&($("#radioButtonTwo").val(i.toISOString().split("T")[0]),c.innerHTML=a[i.getDay()]+", "+i.getDate()+" "+r[i.getMonth()]+", kl 9-16",radioFieldTwo.style.display="flex",l++),n>s&&($("#radioButtonThree").val(n.toISOString().split("T")[0]),u.innerHTML=a[n.getDay()]+", "+n.getDate()+" "+r[n.getMonth()]+", kl 9-16",radioFieldThree.style.display="flex",l++),o>s&&($("#radioButtonFour").val(o.toISOString().split("T")[0]),m.innerHTML=a[o.getDay()]+", "+o.getDate()+" "+r[o.getMonth()]+", kl 9-16",radioFieldFour.style.display="flex",l++),l<2){radioFieldOne.style.display="none",radioFieldTwo.style.display="none",radioFieldThree.style.display="none",radioFieldFour.style.display="none";var g=new Date;g.setDate(s.getDate()+1),0==g.getDay()?g.setDate(g.getDate()+1):6==g.getDay()&&g.setDate(g.getDate()+2);var p=new Date(g);p.setDate(p.getDate()+1),6==p.getDay()&&p.setDate(p.getDate()+2),console.log("dayOne: ",g),console.log("dayTwo: ",p),// Show tomorrow as an option
$("#radioButtonOne").val(g.toISOString().split("T")[0]),d.innerHTML=a[g.getDay()]+", "+g.getDate()+" "+r[g.getMonth()]+", kl 9-16",radioFieldOne.style.display="flex",// Show day after tomorrow as an option
$("#radioButtonTwo").val(p.toISOString().split("T")[0]),c.innerHTML=a[p.getDay()]+", "+p.getDate()+" "+r[p.getMonth()]+", kl 9-16",radioFieldTwo.style.display="flex"}}(t),window.pickupFlowItemId=e,triggerPickupAnimation.click()}function d(e,t,i){let n=`<div class="w-form">
            <form method="get" name="wf-form-" id="bagReceivedForm">
                <label class="w-checkbox checkbox-field-3">
                    <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
                    <input type="checkbox" id="bagReceivedCheckbox-${e}" style="opacity:0;position:absolute;z-index:-1">
                    <span class="checkbox-label-3 w-form-label">Etiketten har kommit</span>
                </label>
            </form>
        </div>`;return n}async function c(e){itemListSelling.innerHTML="",itemListSoldNotSent.innerHTML="",itemListSold.innerHTML="";var t=0;e.forEach(e=>{var i=e.id;e.data().createdAt;var n=e.data().soldDate,a=e.data().status,r=e.data().shippingStatus,c=e.data().brand,u=e.data().soldPrice,m=e.data().sellerGets?Math.ceil(e.data().sellerGets):e.data().sellerGets,g=e.data().buyer?.FirstName||e.data().buyerFirstName,p=e.data().buyer?.City||e.data().buyerAddressCity,f=e.data().minPriceEstimate,v=e.data().maxPriceEstimate,y=e.data().infoRequests,h=e.data().pickupDate,k=e.data().shippingMethod,b=e.data().postnordQrCode,x=e.data().dhlLicensePlateBarcodeSrc,T=e.data().bagReceived,w=e.data().soldPlatform,D=e.data().archived,S=e.data().holidayMode,I=e.data().longerPeriodAcceptedDate;e.data().images;var E=(0,o.itemCoverImage)(e.data());let L="",P=e.data().publishedDate;if(P){P=new Date(P);let e=Math.round((I?60:30)-(new Date().getTime()-P.getTime())/864e5);L=e<=0?"0 dagar kvar":`${e} dagar kvar`}void 0==D&&"Unsold"!=a&&function(){//Putting the items in the right list
let e=window.location.origin+`/item?id=${i}`;// WE SELL RIGHT NOW
if("Sold"!=a){let t="",i="";if("New"===a&&(y?.price?.status==="Active"?t=`<div class='text-block-34'>Inv\xe4ntar ditt svar</div>`:f&&v?(t=`<div class='text-block-34'>${f} - ${v} kr</div>`,i=`<div class='text-block-34'>F\xf6rbereds</div>`):t=`<div class='text-block-34'>V\xe4rdering p\xe5g\xe5r</div>`),"Published"===a&&f&&v){t=`<div class='text-block-34'>${f} - ${v} kr</div>`;let e=S?"Pausad":L;i=`<div class='text-block-34'>${e}</div>`}let n=`<div class="div-block-14"><a id="itemLinkBlock" href="${e}" class="link-block-18 w-inline-block"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${E}');"></div></div></div><div class="text-block-14">${c}</div>${t}${i}</a></div>`;itemListSelling.innerHTML+=n,//Display list
myItemsDiv.style.display="block",//Hide empty state
noItemsDiv.style.display="none",headerSellItemButton.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg";// SOLD - NOT SENT
}else if("Sold"==a&&"Sent"!=r){// Prepare card
var o="";if(null!=g&&null!=p&&u){let e=`S\xe5ld till ${g} i ${p} f\xf6r ${u} kr`,t="",i=e.split(" ");i.forEach(function(i){t.trim().length>e.length/2&&!t.includes("<br>")&&(t+="<br>"),t+=i+" "}),t=t.trim(),o=`<div class="text-block-44">${t}</div>`}var D="",I="";let t="",a="";"Service point"===k&&(x?(D=function(e){let t=window.location.origin+`/ship-item?id=${e}`,i=`<a id="barcodeButton" href="${t}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/65418186f29682eaff3f74be_barcode-icon%20(1).svg" class="image-100">
                                            <div class="text-block-113">Visa streckkod</div>
                            </div>
                    </a>`;return i}(i),a="dhl"):"Vestiaire Collective"===w||"Grailed"===w?T||(D=d(i,n,k)):b&&(a="postnord",D=function(e){let t=window.location.origin+`/ship-item?id=${e}`,i=`<a id="qrCodeButton" href="${t}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63bdeaf1af902f05607f86ef_Group.svg" class="image-43">
                                            <div class="text-block-113">Visa QR</div>
                            </div>
                    </a>`;return i}(i))),"Pickup"===k&&(T?T&&!h&&(D=// TODO: Show a "Boka hämtning" button when the user has pressed bagreceievd but still hasn't picked a pickup
function(){let e=`<a id="bookPickupButton" href="#" class="link-block-39">
                            <div class="div-block-194">
                                <div class="text-block-113">Boka h\xe4mtning</div>
                            </div>
                    </a>`;return e}()):D=d(i,n,k)),// Always show the 'shippingInfoDiv' - Styling depending on state is set in the function
I=function(e,t,i,n,o,a){let r="",s=o&&(!o||"Pickup"!=t||n)?"":'<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63be70f55a4305a398cf918e_info-icon.svg" class="image-44">',l=window.location.origin+`/ship-item?id=${e}`;if("Service point"==t){let e="6297d3d527db5dd4cf02e924/6399ac2a3505ee6071fbc18a_Vector%20(1).svg";"postnord"===a&&(e="6297d3d527db5dd4cf02e924/655d182c37fc30df71b078cd_postnord-square-icon%20(1).svg"),"dhl"===a&&(e="6297d3d527db5dd4cf02e924/655d1830f259c0bc084c2937_dhl-square-icon%20(1).svg"),r+=`
                        <img src="https://global-uploads.webflow.com/${e}" class="shipper-icon">
                        <div class="next-step-text-small">L\xe4mnas till ombud</div>
                        ${s}
                    `}else if("Pickup"==t){if(n){var d=new Date(n),c=d.getDate(),u=["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"][d.getMonth()],m=["S\xf6n","M\xe5n","Tis","Ons","Tors","Fre","L\xf6r"][d.getDay()];r+=`
                                <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                                <div class="next-step-text-small">${m+", "+c+" "+u+", kl 9-16"}</div>`}else r+=`
                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                            <div class="next-step-text-small">Upph\xe4mtning</div>
                            ${s}
                        `}// Turn shipping info into a link to ship item page
let g=`
                        <a id="shipItemPageLink" href="${l}" class="link-block-40">
                                ${r}
                        </a>`;return g}(i,k,0,h,T,a),T&&("Service point"===k||"Pickup"===k&&h)&&(I='<div class="spacing-15-px"></div>'+I,t+=`
          <a id="changeShippingMethodA-${i}" href="#">
              <div id="changeShippingMethod-${i}" class="change-shipping-method-text">\xc4ndra frakts\xe4tt</div>
          </a>`);//Create card
var P="";P=`<div class="div-block-118"><div class="div-block-45"><div class="div-block-43"><div class="ratio-box _16-9"><div class="content-block with-image"><a id="itemLinkFromSoldNotSentSection" href="${e}"><div class="img-container" style="background-image: url('${E}');"></div></a></div></div></div><div class="div-block-46"><div class="div-block-47"><div class="text-block-43">Du f\xe5r ${m} kr</div>${o}
                      ${D}
                      ${I}
                      ${t}
                  </div></div></div></div>`,itemListSoldNotSent.innerHTML+=P,setTimeout(()=>{document.getElementById("bookPickUpButton").addEventListener("click",()=>{l(i,n)}),document.getElementById(`bagReceivedCheckbox-${i}`).addEventListener("click",e=>{var t,o,a,r;t=e.target,o=i,a=n,r=k,t.checked?(db.collection("items").doc(o).update({bagReceived:!0}).then(e=>{console.log("Stored in DB that bag is received for item with ID: ",o)}),"Pickup"===r)?l(o,a,"flex"):"Service point"===r?(console.log("openServicePointToast"),changeToPickupButton.addEventListener("click",()=>{l(o,a)}),triggerServicePointToastOpen.click()):s(o,a):db.collection("items").doc(o).update({bagReceived:!1}).then(e=>{console.log("Stored in DB that bag is NOT received for item with ID: ",o)})}),document.getElementById(`changeShippingMethodA-${i}`).addEventListener("click",()=>{s(i,n)})},0),// Display list
soldNotSentDiv.style.display="block",// Hide empty state
noItemsDiv.style.display="none",headerSellItemButton.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg";// SOLD BEFORE
}else{var B=`<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><a id="itemLinkFromSoldBeforeSection" href="${e}"><div class="img-container" style="background-image: url('${E}');"></div></a></div></div><div class="text-block-14">${u} kr</div><div class='text-block-34'>Du fick ${m} kr</div></div>`;itemListSold.innerHTML+=B,// Display list, hide empty state
soldItemsDiv.style.display="block",itemListSoldContainer.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg",t+=m,youEarnedDiv.innerHTML=`Du har tj\xe4nat ${Math.round(t)} kr`}}()}),loadingDiv.style.display="none",sectionsDiv.style.display="block",quickInfoDiv.style.display="block"}},{"./general":"1tOWF","./private":"flS2m","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"1tOWF":[function(e,t,i){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,location.href="/",deleteCookie("maiAuth")}).catch(e=>{errorHandler.report(e),console.log(e)})}function a(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function r(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,i=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,r=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",i=i?i.trim().charAt(0).toUpperCase()+i.trim().slice(1):"",n=n?n.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:i,addressCO:n,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:r=r?r.trim():""}}function s(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,i)=>(i%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function l(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function d(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function c(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai fixar allt s\xe5som v\xe4rdering, s\xe4ljer p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let i=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(i),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}n.defineInteropFlag(i),n.export(i,"signOut",()=>o),n.export(i,"setFormAddressFields",()=>a),n.export(i,"getFormAddressFields",()=>r),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
n.export(i,"isValidSwedishSsn",()=>s),n.export(i,"formatPersonalId",()=>l),n.export(i,"itemCoverImage",()=>d),n.export(i,"shareCode",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,i){i.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},i.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.exportAll=function(e,t){return Object.keys(e).forEach(function(i){"default"===i||"__esModule"===i||t.hasOwnProperty(i)||Object.defineProperty(t,i,{enumerable:!0,get:function(){return e[i]}})}),t},i.export=function(e,t,i){Object.defineProperty(e,t,{enumerable:!0,get:i})}},{}],flS2m:[function(e,t,i){var n,o,a,r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(i),r.export(i,"updateIC",()=>c),r.export(i,"closePickupToast",()=>f);var s=e("./general"),l=e("./infoRequestsFunctions"),d=e("./loadItemCards");function c(e,t,i){let n=t,o=i;null===n&&(n=""),null===o&&(o=""),window.intercomSettings={app_id:"klyy0le5",user_id:`${e}`},db.collection("users").doc(e).get().then(t=>{if(t.exists){let a=t.data(),r="",s="";if(a.addressFirstName){let e=a.addressFirstName,t=a.addressLastName;r=e+" "+t,s=a.addressCity}a.phoneNumber&&(o=a.phoneNumber);// Update intercom
var i={mai_user_id:`${e}`,user_id:`${e}`,phone:`${o}`,email:`${n}`,name:`${r}`,city:`${s}`};Intercom("update",i)}else console.log("No such user document exist!")}).catch(e=>{errorHandler.report(e),console.log("Error getting document:",e)})}async function u(){let e=await firebase.app().functions("europe-west1").httpsCallable("maxNumBags")();console.log("maxBags.data",e.data),e?.data?.maxOrderBags>0&&(document.getElementById("orderBagsSection").style.display="block")}async function m(e){let t,i="",n="",o=!0,a=!1,r=!1,s=!1;// First, get items with status "Sold" and shippingStatus "Not sent"
await db.collection("items").where("user","==",e).where("status","==","Sold").orderBy("soldDate").get().then(e=>{e.forEach(e=>{e.data().status,i=e.data().shippingStatus;let t=e.data().payoutStatus;"Not sent"===i&&(r=!0),"Payed"!==t&&(a=!0)})}),// Second, check if user has no address or personal id added yet
await db.collection("users").doc(e).get().then(e=>{n=e.data().addressFirstName,t=e.data().personalId;let i=e.data()?.preferences?.shippingMethod;t?""===t&&(o=!1):o=!1,"Pickup"==i&&(s=!0)}),!0==r&&void 0==n&&s&&(location.href="/address-form"),!0==a&&!1==o&&(location.href="/personal-id-form")}async function g(){var e,t;let i,r,g,f,v;if(console.log("privateMain running"),!user.current)return;n=authUser.current.uid,o=authUser.current.email||sessionStorage.getItem("email"),a=authUser.current.phoneNumber||sessionStorage.getItem("phoneNumber"),c(n,o,a),m(n),e=n,(t=document.getElementById("itemListSoldByOthers")).innerHTML="",// SOLD BY OTHERS QUERY + Add cards to list
db.collection("items").where("status","==","Sold").orderBy("soldDate","desc").limit(30).get().then(i=>{i.forEach(i=>{var n=i.data().user,o=i.data().brand,a=i.data().soldPrice,r=(0,s.itemCoverImage)(i.data());// Add card to list if seller is other than myself
if(n!=e&&a>=200){var l=`<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${r}');"></div></div></div><div class="text-block-14">${a} kr</div><div class='text-block-34'>${o}</div></div>`;t.innerHTML+=l}})}),soldByOthersDiv.style.display="block",setPreferredLogInMethodCookie(authUser.current.providerData[0].providerId),featureIsEnabled("menu")&&(document.getElementById("menuButton").style.display="flex"),"3OkW5av20HP8ScpUDS8ip9fBEZr1"===n&&window.location.origin.includes("shh-test")&&(n="3OkW5av20HP8ScpUDS8ip9fBEZr1");let y=await getItems(n);p(y),i=10,r=0,g=!1,f=!!(user.current?.elementViews&&user.current.elementViews.some(e=>"inviteToast"===e.elementID)),y&&y.forEach(e=>{e.id;var t=e.data();let n=t.soldDate,o=t.status,a=t.shippingStatus,s=t.archived;if(!s&&"Sold"===o&&n){if(r++,n){n=new Date(n);let e=Math.floor((new Date().getTime()-n.getTime())/864e5);e<=i&&(i=e)}"Sent"!==a&&(g=!0)}}),i<=3&&r>=2&&g&&user.current?.referralData?.referralCode&&!f&&(referralCodeText.innerHTML=user.current.referralData.referralCode,triggerInviteToastOpen.click(),// Store elementViews to be able to not show it again
db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"inviteToast",timestamp:new Date})}),// Track with segment
analytics.track("Element Viewed",{elementID:"inviteToast"})),user.current?.referralData?.referralCode&&(referralCodeText.innerHTML=user.current.referralData.referralCode,headerInviteButton.style.display="flex",menuInviteLink.style.display="block");let h=checkCookie("invite");h&&await connectReferralUsers(h);// Set invite code cookie
let k=checkCookie("photo_invite");k&&!localStorage.getItem("photoShootBooked")&&(photoShootOffer.style.display="block",bonusSection.style.display="block"),showBonusSection(),(0,d.loadItemCards)(y),(0,l.loadInfoRequests)(n),u(),showReferralSection(),authUser.current.phoneNumber?v=authUser.current.phoneNumber:authUser.current.email&&(v=authUser.current.email),v&&(accountInfoText.innerHTML=`Inloggad med ${v}`,accountInfoText.style.display="block",account.innerHTML=v,account.style.display="block"),user.current.addressFirstName&&user.current.addressFirstName&&(accountName.innerHTML=user.current.addressFirstName+" "+user.current.addressFirstName,accountName.style.display="block"),user.current&&user.current.addressFirstName&&user.current.addressLastName&&!user.current?.referralData?.referralCode&&await createReferralCode()}async function p(e){if(!user)return;let t=new Date,i=0,n=0,o=user.current?.elementViews?user.current.elementViews.reverse().find(e=>"npsSurvey"===e.elementID):null,a=o?o.timestamp.toDate():null,r=a?Math.floor((t.getTime()-a.getTime())/864e5):null;e&&e.forEach(e=>{let o=e.data();if(o.publishedDate&&!o.archived){let e=new Date(o.publishedDate),a=Math.floor((t.getTime()-e.getTime())/864e5);a>i&&(i=a),(a<n||0===n&&a>0)&&(n=a)}}),i>=25&&n<=60&&(!a||r>90)&&!document.referrer.includes("feedback-nps")&&(location.href="/feedback-nps")}function f(){document.getElementById("triggerPickupToastClose").click()}function v(){document.getElementById("triggerFeedbackFormClose").click(),setTimeout(function(){location.reload()},400)}async function y(){let e="";for(var t=document.getElementsByName("Pickup"),i=0;i<t.length;i++)t[i].checked&&(e=t[i].value);// yyyy--mm-dd
db.collection("items").doc(pickupFlowItemId).update({pickupDate:e,shippingMethod:"Pickup"}).then(t=>{console.log(`pickupDate '${e}' and shippingMethod 'Pickup' is now updated on Firestore item`),f(),document.getElementById("triggerFeedbackFormOpen").click()})}async function h(e){let t=db.collection("items").doc(pickupFlowItemId);await t.update({happinessRate:e}).then(function(){console.log("happinessRate is now set on Firestore item"),happinessQuestionDiv.style.display="none",openQuestionDiv.style.display="block",feedbackSubmitButton.style.display="block"})}async function k(){let e=feedbackTextField.value,t=db.collection("items").doc(pickupFlowItemId);await t.update({feedbackText:e}).then(function(){console.log("feedbackText is now set on Firestore item"),v()})}checkCookie("invite"),localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),console.log(`user ${user.current}`),user.whenSet(g),//Disable webflow form submissions
Webflow.push(function(){$("form").submit(function(){return!1})});let b=!1;function x(){console.log("onLoadHandler running"),signoutButton.addEventListener("click",s.signOut),menuSignoutButton.addEventListener("click",s.signOut),bookPickupForm.addEventListener("submit",y),closePickupToastIcon.addEventListener("click",f),closeFeedbackFormButton.addEventListener("click",v),happySmileyButton.addEventListener("click",function(){h(3)},!1),neutralSmileyButton.addEventListener("click",function(){h(2)},!1),angrySmileyButton.addEventListener("click",function(){h(1)},!1),feedbackSubmitButton.addEventListener("click",k),saveReferralCodeButton.addEventListener("click",async function(){saveRefCodeLoadingDiv.style.display="flex",saveReferralCodeButton.style.display="none";let e=referralCodeInput.value;await connectReferralUsers(e)}),closeMeasurementsToastButton.addEventListener("click",function(){triggerMeasurementsToastClose.click()}),closeNewPriceToastButton.addEventListener("click",function(){triggerNewPriceToastClose.click()}),closeInviteToastButton.addEventListener("click",function(){triggerInviteToastClose.click()}),closeServicePointToastButton.addEventListener("click",function(){triggerServicePointToastClose.click()}),confirmServicePointButton.addEventListener("click",function(){document.getElementById("feedbackFormTitle").innerHTML="",triggerServicePointToastClose.click(),triggerFeedbackFormOpen.click()}),closeLongerPeriodToastButton.addEventListener("click",function(){triggerLongerPeriodToastClose.click()}),shareCodeButton.addEventListener("click",s.shareCode),sharePersonalLinkButton.addEventListener("click",s.shareCode),b=!0}window.addEventListener("load",x),console.log(`document.readyState ${document.readyState}`),"complete"!==document.readyState||b||(console.log("Running it since event listener did not"),x()),window.addEventListener("pageshow",e=>{e.persisted?(console.log("This page was restored from the bfcache."),"none"!==menu.style.display&&(menu.style.display="none")):console.log("This page was loaded normally.")}),window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var i=document,n=function(){n.c(arguments)};n.q=[],n.c=function(e){n.q.push(e)},e.Intercom=n;var o=function(){var e=i.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=i.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",o):e.addEventListener("load",o,!1)}}()},{"./general":"1tOWF","./infoRequestsFunctions":"21npA","./loadItemCards":"dxOtH","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"21npA":[function(e,t,i){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(i),n.export(i,"loadInfoRequests",()=>d);var o=e("./general");async function a(e,t){measurementDescriptionText.innerHTML=t,measurementsSubmitButton.addEventListener("click",async function(){let t=measurementsInput.value;t.length>0&&" "!==t&&await db.collection("items").doc(e).update({measurements:t,"infoRequests.measurements.status":"Resolved"}),triggerMeasurementsToastClose.click(),setTimeout(function(){location.reload()},400)}),triggerMeasurementsToastOpen.click()}async function r(e,t,i,n){if(!e)return;console.log("is this happening?");let o=10*Math.ceil(.7*i/10),a=10*Math.ceil(.8*i/10);priceAfterDiscount30.innerHTML=`(Priset blir ${o} kr)`,priceAfterDiscount20.innerHTML=`(Priset blir ${a} kr)`,priceNoDiscount.innerHTML=`(${i} kr)`,i>=140&&!n?(longerPeriodDescriptionText.innerHTML=`S\xe4ljperioden f\xf6r ditt ${t}-plagg har n\xe5tt sitt slut. V\xe4lj om du vill f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar och om du vill s\xe4nka priset f\xf6r att \xf6ka chansen att f\xe5 det s\xe5lt.`,discountFormDiv.style.display="block"):(longerPeriodDescriptionText.innerHTML=`S\xe4ljperioden f\xf6r ditt ${t}-plagg har n\xe5tt sitt slut. Vill du f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar eller avsluta f\xf6rs\xe4ljningen?`,discountFormDiv.style.display="none"),// Accept longer selling window and store chosen discount
longerPeriodAcceptButton.addEventListener("click",async function(){let t=new Date,n=t.toISOString().split("T")[0],r=i,s=0;for(var l=document.getElementsByName("Discount"),d=0;d<l.length;d++)if(l[d].checked){let e=l[d].value;"30"===e&&(r=o,s=30),"20"===e&&(r=a,s=20)}await db.collection("items").doc(e).update({longerPeriodAcceptedDate:n,"infoRequests.longerPeriod.status":"Resolved","infoRequests.longerPeriod.response":"Accepted",longerPeriodAcceptedDiscount:s,minPriceEstimate:r}),triggerLongerPeriodToastClose.click(),setTimeout(function(){location.reload()},300)}),// Decline longer selling period and quit sales
longerPeriodDenyButton.addEventListener("click",async function(){await db.collection("items").doc(e).update({"infoRequests.longerPeriod.status":"Resolved","infoRequests.longerPeriod.response":"Denied",status:"Unsold"// This field is normally mastered by AT - I do this for the user to see the effect immediately (the card is removed)
}),triggerLongerPeriodToastClose.click(),setTimeout(function(){location.reload()},300)}),triggerLongerPeriodToastOpen.click()}async function s(e,t,i,n,o){// Deny price
if(console.log("storePriceResponse",e,t,i,n),"Accepted"===n&&await db.collection("items").doc(e).update({"infoRequests.price.status":"Resolved","infoRequests.price.response":"Accepted",maxPriceEstimate:t,minPriceEstimate:i}).then(function(){triggerNewPriceToastClose.click(),setTimeout(function(){location.reload()},300)}),"Denied"===n){let t={"infoRequests.price.status":"Resolved","infoRequests.price.response":"Denied"};"New"===o&&(t.archived=!0,t.willNotSell=!0),await db.collection("items").doc(e).update(t).then(function(){triggerNewPriceToastClose.click(),setTimeout(function(){location.reload()},300)})}}async function l(e,t,i,n,o,a,r,l,d,c){console.log("openNewPriceToast",e,t,i,n,o,a,r,l,d,c),previousMinPrice.style.display="none",previousMaxPrice.style.display="none",maxPriceDiv.style.display="block",minPriceDiv.style.display="block",// Set content of toast
newPriceToastTitle.innerHTML="Nytt l\xe4gsta pris",newPriceHeading.innerHTML=`${o}-plagg`;let u=r.toLowerCase();u&&"null"!==u&&(newPriceHeading.innerHTML=`${o}-${u}`),maxPrice.innerHTML=i,minPrice.innerHTML=n,d&&"null"!==d&&""!==d&&"undefined"!==d&&i!==d&&(previousMaxPrice.innerHTML=d,previousMaxPrice.style.display="block"),c&&"null"!==c&&""!==c&&"undefined"!==c&&n!==c&&(previousMinPrice.innerHTML=c,previousMinPrice.style.display="block"),acceptNewPriceButton.innerHTML="S\xe4lj med nytt pris",denyNewPriceButton.innerHTML="S\xe4nk ej","New"===t&&"Valuation"===l&&(newPriceToastTitle.innerHTML="V\xe4rdering",acceptNewPriceButton.innerHTML="S\xe4lj till v\xe4rdering",denyNewPriceButton.innerHTML="Avb\xf6j och avsluta"),"Adjusted ML Valuation"===l&&(newPriceToastTitle.innerHTML="Nytt prisintervall"),"Valuation"!==l&&"Adjusted ML Valuation"!==l&&(minPrice.innerHTML=`${n} kr`,maxPriceDiv.style.display="none"),a&&"undefined"!==a&&""!==a&&"null"!==a&&(newPriceText.innerHTML=a,descriptionDiv.style.display="block"),acceptNewPriceButton.addEventListener("click",()=>{s(e,i,n,"Accepted",t)}),denyNewPriceButton.addEventListener("click",()=>{s(e,i,n,"Denied",t)}),// Open toast
triggerNewPriceToastOpen.click()}function d(e){let t=document.getElementById("infoRequestMeasurementsTemplate").cloneNode(!0),i=document.getElementById("infoRequestLongerPeriodTemplate").cloneNode(!0),n=document.getElementById("infoRequestImagesTemplate").cloneNode(!0),s=document.getElementById("infoRequestValuationTemplate").cloneNode(!0),d=document.getElementById("infoRequestsList");d.replaceChildren(),db.collection("items").where("user","==",e).get().then(e=>{e.forEach(e=>{let c=e.id,u=e.data(),m=u.infoRequests,g=u.status,p=u.brand.replace(/'/g,""),f=u.minPriceEstimate,v=u.maxPriceEstimate,y=u?.infoRequests?.price?.response==="Denied",h=u.archived,k=u.category,b=(0,o.itemCoverImage)(u);void 0==h&&"Unsold"!==g&&"Sold"!==g&&m&&function(){for(let e in m)if(m[e]?.status==="Active"){let o=m[e].description;// PRICE REQUEST
if(o&&(o=o.replace(/'/g,"")),"price"===e){let t=m[e].type,i=s.cloneNode(!0);i.id=`infoRequestPrice-${c}`,i.querySelector(".img-container").style.backgroundImage=`url('${b}')`,i.querySelector("a .pricebuttontext").innerText="Se prisf\xf6rslag",i.querySelector(".text-block-72").innerText="Vill du s\xe4nka priset och f\xe5 det s\xe5lt?",d.appendChild(i),"New"===g&&"Adjusted ML Valuation"!==t?(i.querySelector("a .pricebuttontext").innerText="Se v\xe4rdering",i.querySelector(".text-block-72").innerText="Vill du s\xe4lja till v\xe5r v\xe4rdering?",i.querySelector("a").href=`/item-valuation?id=${c}`):setTimeout(()=>{let i=m[e].maxPrice,n=m[e].minPrice;document.querySelector(`#infoRequestPrice-${c} a`).addEventListener("click",async()=>{await l(c,g,i,n,p,o,k,t,v,f)})},0)}// MEASUREMENTS REQUEST
if("measurements"===e){let e=t.cloneNode(!0);e.id=`infoRequestMeasurements-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${b}')`,d.appendChild(e),setTimeout(()=>{document.querySelector(`#infoRequestMeasurements-${c} a`).addEventListener("click",async()=>{await a(c,o)})},0)}// IMAGES REQUEST
if("images"===e){let e=n.cloneNode(!0);e.id=`infoRequestImages-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${b}')`,e.querySelector("a").href=`/edit-item?id=${c}`,d.appendChild(e)}// LONGER PERIOD REQUEST
if("longerPeriod"===e){let e=i.cloneNode(!0);e.id=`infoRequestLongerPeriod-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${b}')`,d.appendChild(e),setTimeout(()=>{document.querySelector(`#infoRequestLongerPeriod-${c} a`).addEventListener("click",async()=>{await r(c,p,f,y)})},0)}infoRequestsDiv.style.display="block"}}()})})}},{"./general":"1tOWF","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}]},["dxOtH"],"dxOtH","parcelRequire81ca")//# sourceMappingURL=loadItemCards.js.map
;
//# sourceMappingURL=loadItemCards.js.map
