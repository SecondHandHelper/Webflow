!function(){var e,t,i,a={};function n(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function o(){let e=user.current.referralData.referralCode,t=`Hej, jag vill tipsa om Mai f\xf6r att rensa ur garderoben. Mai \xe4r en tj\xe4nst som hj\xe4lper dig att s\xe4lja dina kl\xe4der p\xe5 ett enkelt s\xe4tt. Man tar bara bilder p\xe5 sina plagg, sedan sk\xf6ter Mai resten - s\xe5som v\xe4rdering, annonsering p\xe5 flera plattformar, kontakt med k\xf6pare och frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}

L\xe4s mer och anv\xe4nd min kod h\xe4r:`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let i=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(i),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}var s={};async function r(){let e=await firebase.app().functions("europe-west1").httpsCallable("maxNumBags")();console.log("maxBags.data",e.data),e?.data?.maxOrderBags>0&&(document.getElementById("orderBagsSection").style.display="block")}async function l(e){let t,i="",a="",n=!0,o=!1,s=!1,r=!1;// First, get items with status "Sold" and shippingStatus "Not sent"
await db.collection("items").where("user","==",e).where("status","==","Sold").orderBy("soldDate").get().then(e=>{e.forEach(e=>{e.data().status,i=e.data().shippingStatus;let t=e.data().payoutStatus;"Not sent"===i&&(s=!0),"Payed"!==t&&(o=!0)})}),// Second, check if user has no address or personal id added yet
await db.collection("users").doc(e).get().then(e=>{a=e.data().addressFirstName,t=e.data().personalId;let i=e.data()?.preferences?.shippingMethod;t?""===t&&(n=!1):n=!1,"Pickup"==i&&(r=!0)}),!0==s&&void 0==a&&r&&(location.href="/address-form"),!0==o&&!1==n&&(location.href="/personal-id-form")}async function d(){var o,d,u,m;let v,p,g,f,k,b,x;if(console.log("privateMain running"),!user.current)return;e=authUser.current.uid,t=authUser.current.email||sessionStorage.getItem("email"),i=authUser.current.phoneNumber||sessionStorage.getItem("phoneNumber"),o=e,null===(v=t)&&(v=""),null===(p=i)&&(p=""),window.intercomSettings={app_id:"klyy0le5",user_id:`${o}`},db.collection("users").doc(o).get().then(e=>{if(e.exists){let i=e.data(),a="",n="";if(i.addressFirstName){let e=i.addressFirstName,t=i.addressLastName;a=e+" "+t,n=i.addressCity}i.phoneNumber&&(p=i.phoneNumber);// Update intercom
var t={mai_user_id:`${o}`,user_id:`${o}`,phone:`${p}`,email:`${v}`,name:`${a}`,city:`${n}`};Intercom("update",t)}else console.log("No such user document exist!")}).catch(e=>{errorHandler.report(e),console.log("Error getting document:",e)}),l(e),d=e,(u=document.getElementById("itemListSoldByOthers")).innerHTML="",// SOLD BY OTHERS QUERY + Add cards to list
db.collection("items").where("status","==","Sold").orderBy("soldDate","desc").limit(30).get().then(e=>{e.forEach(e=>{var t=e.data().user,i=e.data().brand,a=e.data().soldPrice,o=n(e.data());// Add card to list if seller is other than myself
if(t!=d&&a>=200){var s=`<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${o}');"></div></div></div><div class="text-block-14">${a} kr</div><div class='text-block-34'>${i}</div></div>`;u.innerHTML+=s}})}),soldByOthersDiv.style.display="block",(0,a.setPreferredLogInMethodCookie)(authUser.current.providerData[0].providerId),featureIsEnabled("menu")&&(document.getElementById("menuButton").style.display="flex"),"3OkW5av20HP8ScpUDS8ip9fBEZr1"===e&&window.location.origin.includes("shh-test")&&(e="3OkW5av20HP8ScpUDS8ip9fBEZr1");let y=await getItems(e);c(y),g=10,f=0,k=!1,b=!!(user.current?.elementViews&&user.current.elementViews.some(e=>"inviteToast"===e.elementID)),y&&y.forEach(e=>{e.id;var t=e.data();let i=t.soldDate,a=t.status,n=t.shippingStatus,o=t.archived;if(!o&&"Sold"===a&&i){if(f++,i){i=new Date(i);let e=Math.floor((new Date().getTime()-i.getTime())/864e5);e<=g&&(g=e)}"Sent"!==n&&(k=!0)}}),g<=3&&f>=2&&k&&user.current?.referralData?.referralCode&&!b&&(referralCodeText.innerHTML=user.current.referralData.referralCode,triggerInviteToastOpen.click(),// Store elementViews to be able to not show it again
db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"inviteToast",timestamp:new Date})}),// Track with segment
analytics.track("Element Viewed",{elementID:"inviteToast"})),user.current?.referralData?.referralCode&&(referralCodeText.innerHTML=user.current.referralData.referralCode,headerInviteButton.style.display="flex");let w=checkCookie("invite");w&&await (0,s.connectReferralUsers)(w);// Set invite code cookie
let S=checkCookie("photo_invite");S&&!localStorage.getItem("photoShootBooked")&&(photoShootOffer.style.display="block",bonusSection.style.display="block"),(0,s.showBonusSection)(),h(y),m=e,infoRequestsList.innerHTML="",db.collection("items").where("user","==",m).get().then(e=>{e.forEach(e=>{var t=e.id,i=e.data(),a=i.infoRequests,o=i.status,s=i.brand.replace(/'/g,""),r=i.minPriceEstimate,l=i.maxPriceEstimate,d=i?.infoRequests?.price?.response==="Denied",c=i.archived,u=i.category;i.images;var m=n(i);void 0==c&&"Unsold"!==o&&"Sold"!==o&&a&&function(){for(let e in a)if(a[e]?.status==="Active"){let i="",n="",c="",v="Komplettera",p="completerequestbutton",g="text-block-69",f=a[e].description;// PRICE REQUEST
if(f&&(f=f.replace(/'/g,"")),"price"===e){let d=a[e].type;i="L\xe4gre pris",p="acceptnewpricebutton",g="text-block-69-copy-copy",v="Se prisf\xf6rslag",n="Vill du s\xe4nka priset och f\xe5 det s\xe5lt?";let m=a[e].maxPrice,k=a[e].minPrice;c=`javascript:openNewPriceToast('${t}', '${o}', ${m}, ${k}, '${s}', '${f}', '${u}', '${d}', '${l}', '${r}');`,"New"===o&&"Adjusted ML Valuation"!==d&&(i="V\xe4rdering",p="acceptnewpricebutton",g="text-block-69-copy-copy",v="Se v\xe4rdering",n="Vill du s\xe4lja till v\xe5r v\xe4rdering?",c=`/item-valuation?id=${t}`)}"measurements"===e&&(i="M\xe5tt",n="Vi beh\xf6ver m\xe5tt f\xf6r detta plagg",v="Se mer",c=`javascript:openMeasurementsToast('${t}', '${f}');`),"images"===e&&(i="Bilder",n="Bilderna beh\xf6ver kompletteras",v="\xc4ndra bilder",c=window.location.origin+`/edit-item?id=${t}`),"longerPeriod"===e&&(i="F\xf6rl\xe4ng",n="Vill du f\xf6rl\xe4nga med 30 dagar till?",v="Svara",c=`javascript:openLongerPeriodToast('${t}', '${s}', ${r}, ${d});`);// CARD
let k=`<div class="div-block-126">
                                                <div class="ratio-box _16-9">
                                                    <div class="content-block with-image">
                                                        <div class="img-container" style="background-image: url('${m}');"></div>
                                                    </div>
                                                </div>
                                                <div class="text-block-73">${i}</div>
                                                <div class="text-block-72">${n}</div>
                                                <a href="${c}" id="" class="link-block-23 w-inline-block">
                                                    <div class="${p}">
                                                        <div class="${g}">${v}</div>
                                                    </div>
                                                </a>
                                            </div>`;infoRequestsList.innerHTML+=k,infoRequestsDiv.style.display="block"}}()})}),r(),(0,s.showReferralSection)(),authUser.current.phoneNumber?x=authUser.current.phoneNumber:authUser.current.email&&(x=authUser.current.email),x&&(accountInfoText.innerHTML=`Inloggad med ${x}`,accountInfoText.style.display="block",account.innerHTML=x,account.style.display="block"),user.current.addressFirstName&&user.current.addressFirstName&&(accountName.innerHTML=user.current.addressFirstName+" "+user.current.addressFirstName,accountName.style.display="block"),user.current&&user.current.addressFirstName&&user.current.addressLastName&&!user.current?.referralData?.referralCode&&await (0,s.createReferralCode)()}async function c(e){if(!user)return;let t=new Date,i=0,a=0,n=user.current?.elementViews?user.current.elementViews.reverse().find(e=>"npsSurvey"===e.elementID):null,o=n?n.timestamp.toDate():null,s=o?Math.floor((t.getTime()-o.getTime())/864e5):null;e&&e.forEach(e=>{let n=e.data();if(n.publishedDate&&!n.archived){let e=new Date(n.publishedDate),o=Math.floor((t.getTime()-e.getTime())/864e5);o>i&&(i=o),(o<a||0===a&&o>0)&&(a=o)}}),i>=25&&a<=60&&(!o||s>90)&&!document.referrer.includes("feedback-nps")&&(location.href="/feedback-nps")}function u(){document.getElementById("triggerPickupToastClose").click()}function m(){document.getElementById("triggerFeedbackFormClose").click(),setTimeout(function(){location.reload()},400)}async function v(){let e="";for(var t=document.getElementsByName("Pickup"),i=0;i<t.length;i++)t[i].checked&&(e=t[i].value);// yyyy--mm-dd
db.collection("items").doc(pickupFlowItemId).update({pickupDate:e,shippingMethod:"Pickup"}).then(t=>{console.log(`pickupDate '${e}' and shippingMethod 'Pickup' is now updated on Firestore item`),u(),document.getElementById("triggerFeedbackFormOpen").click()})}async function p(e){let t=db.collection("items").doc(pickupFlowItemId);await t.update({happinessRate:e}).then(function(){console.log("happinessRate is now set on Firestore item"),happinessQuestionDiv.style.display="none",openQuestionDiv.style.display="block",feedbackSubmitButton.style.display="block"})}async function g(){let e=feedbackTextField.value,t=db.collection("items").doc(pickupFlowItemId);await t.update({feedbackText:e}).then(function(){console.log("feedbackText is now set on Firestore item"),m()})}checkCookie("invite"),localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),console.log(`user ${user.current}`),user.whenSet(d),//Disable webflow form submissions
Webflow.push(function(){$("form").submit(function(){return!1})});let f=!1;function k(){console.log("onLoadHandler running"),signoutButton.addEventListener("click",signOut),menuSignoutButton.addEventListener("click",signOut),bookPickupForm.addEventListener("submit",v),closePickupToastIcon.addEventListener("click",u),closeFeedbackFormButton.addEventListener("click",m),happySmileyButton.addEventListener("click",function(){p(3)},!1),neutralSmileyButton.addEventListener("click",function(){p(2)},!1),angrySmileyButton.addEventListener("click",function(){p(1)},!1),feedbackSubmitButton.addEventListener("click",g),saveReferralCodeButton.addEventListener("click",async function(){saveRefCodeLoadingDiv.style.display="flex",saveReferralCodeButton.style.display="none";let e=referralCodeInput.value;await (0,s.connectReferralUsers)(e)}),closeMeasurementsToastButton.addEventListener("click",function(){triggerMeasurementsToastClose.click()}),closeNewPriceToastButton.addEventListener("click",function(){triggerNewPriceToastClose.click()}),closeInviteToastButton.addEventListener("click",function(){triggerInviteToastClose.click()}),closeServicePointToastButton.addEventListener("click",function(){triggerServicePointToastClose.click()}),confirmServicePointButton.addEventListener("click",function(){document.getElementById("feedbackFormTitle").innerHTML="",triggerServicePointToastClose.click(),triggerFeedbackFormOpen.click()}),closeLongerPeriodToastButton.addEventListener("click",function(){triggerLongerPeriodToastClose.click()}),shareCodeButton.addEventListener("click",o),sharePersonalLinkButton.addEventListener("click",o),headerInviteButton.addEventListener("click",function(){triggerInviteToastOpen.click()}),f=!0}function b(e,t,i){let a=`<div class="w-form">
            <form method="get" name="wf-form-" id="bagReceivedForm">
                <label class="w-checkbox checkbox-field-3">
                    <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
                    <input type="checkbox" id="bagReceivedCheckbox-${e}" style="opacity:0;position:absolute;z-index:-1" onclick="javascript:bagReceivedAction(this, '${e}', '${t}', '${i}');">
                    <span class="checkbox-label-3 w-form-label">Etiketten har kommit</span>
                </label>
            </form>
        </div>`;return a}async function h(e){itemListSelling.innerHTML="",itemListSoldNotSent.innerHTML="",itemListSold.innerHTML="";var t=0;e.forEach(e=>{var i=e.id;e.data().createdAt;var a=e.data().soldDate,o=e.data().status,s=e.data().shippingStatus,r=e.data().brand,l=e.data().soldPrice,d=e.data().sellerGets?Math.ceil(e.data().sellerGets):e.data().sellerGets,c=e.data().buyer?.FirstName||e.data().buyerFirstName,u=e.data().buyer?.City||e.data().buyerAddressCity,m=e.data().minPriceEstimate,v=e.data().maxPriceEstimate,p=e.data().infoRequests,g=e.data().pickupDate,f=e.data().shippingMethod,k=e.data().postnordQrCode,h=e.data().dhlLicensePlateBarcodeSrc,x=e.data().bagReceived,y=e.data().soldPlatform,w=e.data().archived,S=e.data().holidayMode,T=e.data().longerPeriodAcceptedDate;e.data().images;var L=n(e.data());let I="",B=e.data().publishedDate;if(B){B=new Date(B);let e=Math.round((T?60:30)-(new Date().getTime()-B.getTime())/864e5);I=e<=0?"0 dagar kvar":`${e} dagar kvar`}void 0==w&&"Unsold"!=o&&function(){//Putting the items in the right list
let e=window.location.origin+`/item?id=${i}`;// WE SELL RIGHT NOW
if("Sold"!=o){let t="",i="";if("New"===o&&(p?.price?.status==="Active"?t=`<div class='text-block-34'>Inv\xe4ntar ditt svar</div>`:m&&v?(t=`<div class='text-block-34'>${m} - ${v} kr</div>`,i=`<div class='text-block-34'>F\xf6rbereds</div>`):t=`<div class='text-block-34'>V\xe4rdering p\xe5g\xe5r</div>`),"Published"===o&&m&&v){t=`<div class='text-block-34'>${m} - ${v} kr</div>`;let e=S?"Pausad":I;i=`<div class='text-block-34'>${e}</div>`}let a=`<div class="div-block-14"><a id="itemLinkBlock" href="${e}" class="link-block-18 w-inline-block"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${L}');"></div></div></div><div class="text-block-14">${r}</div>${t}${i}</a></div>`;itemListSelling.innerHTML+=a,//Display list
myItemsDiv.style.display="block",//Hide empty state
noItemsDiv.style.display="none",headerSellItemButton.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg";// SOLD - NOT SENT
}else if("Sold"==o&&"Sent"!=s){// Prepare card
var n="";if(null!=c&&null!=u&&l){let e=`S\xe5ld till ${c} i ${u} f\xf6r ${l} kr`,t="",i=e.split(" ");i.forEach(function(i){t.trim().length>e.length/2&&!t.includes("<br>")&&(t+="<br>"),t+=i+" "}),t=t.trim(),n=`<div class="text-block-44">${t}</div>`}var w="",T="";let t="",o="";"Service point"===f&&(h?(w=function(e){let t=window.location.origin+`/ship-item?id=${e}`,i=`<a id="barcodeButton" href="${t}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/65418186f29682eaff3f74be_barcode-icon%20(1).svg" class="image-100">
                                            <div class="text-block-113">Visa streckkod</div>
                            </div>
                    </a>`;return i}(i),o="dhl"):"Vestiaire Collective"===y||"Grailed"===y?x||(w=b(i,a,f)):k&&(o="postnord",w=function(e){let t=window.location.origin+`/ship-item?id=${e}`,i=`<a id="qrCodeButton" href="${t}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63bdeaf1af902f05607f86ef_Group.svg" class="image-43">
                                            <div class="text-block-113">Visa QR</div>
                            </div>
                    </a>`;return i}(i))),"Pickup"===f&&(x?x&&!g&&(w=// TODO: Show a "Boka hämtning" button when the user has pressed bagreceievd but still hasn't picked a pickup
function(e,t){let i=`<a id="bookPickupButton" href="javascript:openPickupToast('${e}', '${t}');" class="link-block-39">
                            <div class="div-block-194">
                                <div class="text-block-113">Boka h\xe4mtning</div>
                            </div>
                    </a>`;return i}(i,a)):w=b(i,a,f)),// Always show the 'shippingInfoDiv' - Styling depending on state is set in the function
T=function(e,t,i,a,n,o){let s="",r=n&&(!n||"Pickup"!=t||a)?"":'<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63be70f55a4305a398cf918e_info-icon.svg" class="image-44">',l=window.location.origin+`/ship-item?id=${e}`;if("Service point"==t){let e="6297d3d527db5dd4cf02e924/6399ac2a3505ee6071fbc18a_Vector%20(1).svg";"postnord"===o&&(e="6297d3d527db5dd4cf02e924/655d182c37fc30df71b078cd_postnord-square-icon%20(1).svg"),"dhl"===o&&(e="6297d3d527db5dd4cf02e924/655d1830f259c0bc084c2937_dhl-square-icon%20(1).svg"),s+=`
                        <img src="https://global-uploads.webflow.com/${e}" class="shipper-icon">
                        <div class="next-step-text-small">L\xe4mnas till ombud</div>
                        ${r}
                    `}else if("Pickup"==t){if(a){var d=new Date(a),c=d.getDate(),u=["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"][d.getMonth()],m=["S\xf6n","M\xe5n","Tis","Ons","Tors","Fre","L\xf6r"][d.getDay()];s+=`
                                <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                                <div class="next-step-text-small">${m+", "+c+" "+u+", kl 9-16"}</div>`}else s+=`
                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                            <div class="next-step-text-small">Upph\xe4mtning</div>
                            ${r}
                        `}// Turn shipping info into a link to ship item page
let v=`
                        <a id="shipItemPageLink" href="${l}" class="link-block-40">
                                ${s}
                        </a>`;return v}(i,f,0,g,x,o),x&&("Service point"===f||"Pickup"===f&&g)&&(T='<div class="spacing-15-px"></div>'+T,t+=`
          <a href="javascript:openShippingToast('${i}', '${a}');">
              <div id="changeShippingMethod-${i}" class="change-shipping-method-text">\xc4ndra frakts\xe4tt</div>
          </a>`);//Create card
var B="";B=`<div class="div-block-118"><div class="div-block-45"><div class="div-block-43"><div class="ratio-box _16-9"><div class="content-block with-image"><a id="itemLinkFromSoldNotSentSection" href="${e}"><div class="img-container" style="background-image: url('${L}');"></div></a></div></div></div><div class="div-block-46"><div class="div-block-47"><div class="text-block-43">Du f\xe5r ${d} kr</div>${n}
                      ${w}
                      ${T}
                      ${t}
                  </div></div></div></div>`,itemListSoldNotSent.innerHTML+=B,// Display list
soldNotSentDiv.style.display="block",// Hide empty state
noItemsDiv.style.display="none",headerSellItemButton.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg";// SOLD BEFORE
}else{var D=`<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><a id="itemLinkFromSoldBeforeSection" href="${e}"><div class="img-container" style="background-image: url('${L}');"></div></a></div></div><div class="text-block-14">${l} kr</div><div class='text-block-34'>Du fick ${d} kr</div></div>`;itemListSold.innerHTML+=D,// Display list, hide empty state
soldItemsDiv.style.display="block",itemListSoldContainer.style.display="block",sellButtonText.innerHTML="S\xe4lj ett plagg",t+=d,youEarnedDiv.innerHTML=`Du har tj\xe4nat ${Math.round(t)} kr`}}()}),loadingDiv.style.display="none",sectionsDiv.style.display="block",quickInfoDiv.style.display="block"}window.addEventListener("load",k),console.log(`document.readyState ${document.readyState}`),"complete"!==document.readyState||f||(console.log("Running it since event listener did not"),k()),window.addEventListener("pageshow",e=>{e.persisted?(console.log("This page was restored from the bfcache."),"none"!==menu.style.display&&(menu.style.display="none")):console.log("This page was loaded normally.")}),window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var i=document,a=function(){a.c(arguments)};a.q=[],a.c=function(e){a.q.push(e)},e.Intercom=a;var n=function(){var e=i.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=i.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",n):e.addEventListener("load",n,!1)}}()}();//# sourceMappingURL=loadItemCards.js.map

//# sourceMappingURL=loadItemCards.js.map
