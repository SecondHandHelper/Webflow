!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,r,i){/* eslint-disable no-undef */var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof o[r]&&o[r],a=s.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!a[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var i="function"==typeof o[r]&&o[r];if(!n&&i)return i(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(s)return s(t,!0);// Try the node require function if it exists.
if(l&&"string"==typeof t)return l(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},m.cache={};var u=a[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return a[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=a,d.parent=s,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return o[r]}}),o[r]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):i&&(this[i]=u)}}({"21npA":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"loadInfoRequests",()=>d);var i=e("./general");async function o(e,t){measurementDescriptionText.innerHTML=t,measurementsSubmitButton.addEventListener("click",async function(){let t=measurementsInput.value;t.length>0&&" "!==t&&await db.collection("items").doc(e).update({measurements:t,"infoRequests.measurements.status":"Resolved"}),triggerMeasurementsToastClose.click(),setTimeout(function(){location.reload()},400)}),triggerMeasurementsToastOpen.click()}async function s(e,t,n,r){if(!e)return;console.log("is this happening?");let i=10*Math.ceil(.7*n/10),o=10*Math.ceil(.8*n/10);priceAfterDiscount30.innerHTML=`(Priset blir ${i} kr)`,priceAfterDiscount20.innerHTML=`(Priset blir ${o} kr)`,priceNoDiscount.innerHTML=`(${n} kr)`,n>=140&&!r?(longerPeriodDescriptionText.innerHTML=`S\xe4ljperioden f\xf6r ditt ${t}-plagg har n\xe5tt sitt slut. V\xe4lj om du vill f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar och om du vill s\xe4nka priset f\xf6r att \xf6ka chansen att f\xe5 det s\xe5lt.`,discountFormDiv.style.display="block"):(longerPeriodDescriptionText.innerHTML=`S\xe4ljperioden f\xf6r ditt ${t}-plagg har n\xe5tt sitt slut. Vill du f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar eller avsluta f\xf6rs\xe4ljningen?`,discountFormDiv.style.display="none"),// Accept longer selling window and store chosen discount
longerPeriodAcceptButton.addEventListener("click",async function(){let t=new Date,r=t.toISOString().split("T")[0],s=n,a=0;for(var l=document.getElementsByName("Discount"),d=0;d<l.length;d++)if(l[d].checked){let e=l[d].value;"30"===e&&(s=i,a=30),"20"===e&&(s=o,a=20)}await db.collection("items").doc(e).update({longerPeriodAcceptedDate:r,"infoRequests.longerPeriod.status":"Resolved","infoRequests.longerPeriod.response":"Accepted",longerPeriodAcceptedDiscount:a,minPriceEstimate:s}),triggerLongerPeriodToastClose.click(),setTimeout(function(){location.reload()},300)}),// Decline longer selling period and quit sales
longerPeriodDenyButton.addEventListener("click",async function(){await db.collection("items").doc(e).update({"infoRequests.longerPeriod.status":"Resolved","infoRequests.longerPeriod.response":"Denied",status:"Unsold"// This field is normally mastered by AT - I do this for the user to see the effect immediately (the card is removed)
}),triggerLongerPeriodToastClose.click(),setTimeout(function(){location.reload()},300)}),triggerLongerPeriodToastOpen.click()}async function a(e,t,n,r,i){// Deny price
if(console.log("storePriceResponse",e,t,n,r),"Accepted"===r&&await db.collection("items").doc(e).update({"infoRequests.price.status":"Resolved","infoRequests.price.response":"Accepted",maxPriceEstimate:t,minPriceEstimate:n}).then(function(){triggerNewPriceToastClose.click(),setTimeout(function(){location.reload()},300)}),"Denied"===r){let t={"infoRequests.price.status":"Resolved","infoRequests.price.response":"Denied"};"New"===i&&(t.archived=!0,t.willNotSell=!0),await db.collection("items").doc(e).update(t).then(function(){triggerNewPriceToastClose.click(),setTimeout(function(){location.reload()},300)})}}async function l(e,t,n,r,i,o,s,l,d,c){console.log("openNewPriceToast",e,t,n,r,i,o,s,l,d,c),previousMinPrice.style.display="none",previousMaxPrice.style.display="none",maxPriceDiv.style.display="block",minPriceDiv.style.display="block",// Set content of toast
newPriceToastTitle.innerHTML="Nytt l\xe4gsta pris",newPriceHeading.innerHTML=`${i}-plagg`;let u=s.toLowerCase();u&&"null"!==u&&(newPriceHeading.innerHTML=`${i}-${u}`),maxPrice.innerHTML=n,minPrice.innerHTML=r,d&&"null"!==d&&""!==d&&"undefined"!==d&&n!==d&&(previousMaxPrice.innerHTML=d,previousMaxPrice.style.display="block"),c&&"null"!==c&&""!==c&&"undefined"!==c&&r!==c&&(previousMinPrice.innerHTML=c,previousMinPrice.style.display="block"),acceptNewPriceButton.innerHTML="S\xe4lj med nytt pris",denyNewPriceButton.innerHTML="S\xe4nk ej","New"===t&&"Valuation"===l&&(newPriceToastTitle.innerHTML="V\xe4rdering",acceptNewPriceButton.innerHTML="S\xe4lj till v\xe4rdering",denyNewPriceButton.innerHTML="Avb\xf6j och avsluta"),"Adjusted ML Valuation"===l&&(newPriceToastTitle.innerHTML="Nytt prisintervall"),"Valuation"!==l&&"Adjusted ML Valuation"!==l&&(minPrice.innerHTML=`${r} kr`,maxPriceDiv.style.display="none"),o&&"undefined"!==o&&""!==o&&"null"!==o&&(newPriceText.innerHTML=o,descriptionDiv.style.display="block"),acceptNewPriceButton.addEventListener("click",()=>{a(e,n,r,"Accepted",t)}),denyNewPriceButton.addEventListener("click",()=>{a(e,n,r,"Denied",t)}),// Open toast
triggerNewPriceToastOpen.click()}function d(e){let t=document.getElementById("infoRequestMeasurementsTemplate").cloneNode(!0),n=document.getElementById("infoRequestLongerPeriodTemplate").cloneNode(!0),r=document.getElementById("infoRequestImagesTemplate").cloneNode(!0),a=document.getElementById("infoRequestValuationTemplate").cloneNode(!0),d=document.getElementById("infoRequestsList");d.replaceChildren(),e.forEach(e=>{let c=e.id,u=e.infoRequests,m=e.status,p=e.brand.replace(/'/g,""),f=e.minPriceEstimate,g=e.maxPriceEstimate,y=e?.infoRequests?.price?.response==="Denied",v=e.archived,x=e.category,h=(0,i.itemCoverImage)(e);void 0==v&&"Unsold"!==m&&"Sold"!==m&&u&&function(){for(let e in u)if(u[e]?.status==="Active"){let i=u[e].description;// PRICE REQUEST
if(i&&(i=i.replace(/'/g,"")),"price"===e){let t=u[e].type,n=a.cloneNode(!0);n.id=`infoRequestPrice-${c}`,n.querySelector(".img-container").style.backgroundImage=`url('${h}')`,n.querySelector("a .pricebuttontext").innerText="Se prisf\xf6rslag",n.querySelector(".text-block-72").innerText="Vill du s\xe4nka priset och f\xe5 det s\xe5lt?",d.appendChild(n),"New"===m&&"Adjusted ML Valuation"!==t?(n.querySelector("a .pricebuttontext").innerText="Se v\xe4rdering",n.querySelector(".text-block-72").innerText="Vill du s\xe4lja till v\xe5r v\xe4rdering?",n.querySelector("a").href=`/item-valuation?id=${c}`):setTimeout(()=>{let n=u[e].maxPrice,r=u[e].minPrice;document.querySelector(`#infoRequestPrice-${c} a`).addEventListener("click",async()=>{await l(c,m,n,r,p,i,x,t,g,f)})},0)}// MEASUREMENTS REQUEST
if("measurements"===e){let e=t.cloneNode(!0);e.id=`infoRequestMeasurements-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${h}')`,d.appendChild(e),setTimeout(()=>{document.querySelector(`#infoRequestMeasurements-${c} a`).addEventListener("click",async()=>{await o(c,i)})},0)}// IMAGES REQUEST
if("images"===e){let e=r.cloneNode(!0);e.id=`infoRequestImages-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${h}')`,e.querySelector("a").href=`/edit-item?id=${c}`,d.appendChild(e)}// LONGER PERIOD REQUEST
if("longerPeriod"===e){let e=n.cloneNode(!0);e.id=`infoRequestLongerPeriod-${c}`,e.querySelector(".img-container").style.backgroundImage=`url('${h}')`,d.appendChild(e),setTimeout(()=>{document.querySelector(`#infoRequestLongerPeriod-${c} a`).addEventListener("click",async()=>{await s(c,p,f,y)})},0)}infoRequestsDiv.style.display="block"}}()});/*
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
*/}},{"./general":"1tOWF","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"1tOWF":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function i(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}async function o(e,t,n={},r=20){let i=localStorage.getItem("idToken");if(!i){if(firebase.auth().currentUser){let e=await result.getIdToken();authUser.idToken=e,localStorage.setItem("idToken",e),authUser.current=firebase.auth().currentUser,localStorage.setItem("authUser",JSON.stringify(authUser.current))}throw Error("User not authenticated")}let o=new AbortController,s=setTimeout(()=>o.abort(),1e3*r),a=fetch(`https://${e}-second-hand-helper.cloudfunctions.net/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(n),signal:o.signal});return a.finally(()=>clearTimeout(s)),a.catch(e=>{throw console.error(e),errorHandler.report(`Failure calling backend function ${JSON.stringify(e)}`),e}),await a.then(e=>{if(!a.ok)throw Error("Failed to call backend function");return a.json()})}function s(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function a(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,r=document.getElementById("addressCO").value,i=document.getElementById("addressPostalCode").value,o=document.getElementById("addressCity").value,s=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",r=r?r.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:r,addressPostalCode:i=i?i.trim().replace(/\D/g,""):"",addressCity:o=o?o.trim().charAt(0).toUpperCase()+o.trim().slice(1):"",addressDoorCode:s=s?s.trim():""}}function l(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function d(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function c(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function u(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}r.defineInteropFlag(n),r.export(n,"signOut",()=>i),// Function to call Firebase backend function
r.export(n,"callFirebaseFunction",()=>o),r.export(n,"setFormAddressFields",()=>s),r.export(n,"getFormAddressFields",()=>a),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
r.export(n,"isValidSwedishSsn",()=>l),r.export(n,"formatPersonalId",()=>d),r.export(n,"itemCoverImage",()=>c),r.export(n,"shareCode",()=>u)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||t.hasOwnProperty(n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["21npA"],"21npA","parcelRequire81ca")//# sourceMappingURL=infoRequestsFunctions.js.map
;
//# sourceMappingURL=infoRequestsFunctions.js.map
