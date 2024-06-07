!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,a,o){/* eslint-disable no-undef */var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof r[a]&&r[a],l=i.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!l[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var o="function"==typeof r[a]&&r[a];if(!n&&o)return o(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(i)return i(t,!0);// Try the node require function if it exists.
if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(n){var a=e[t][1][n];return null!=a?a:n},m.cache={};var u=l[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return l[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=i,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return r[a]}}),r[a]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):o&&(this[o]=u)}}({"42EGR":[function(e,t,n){let a;var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"isNoBgImage",()=>ea);var r=e("./sellItemHelpers"),i=e("qrcode"),l=o.interopDefault(i),s=e("./general"),d=e("./autocomplete-brands"),c=e("./sellItemModelSearch");let u=!1,m=getParamsObject();async function g(){// Grab values from form
let e=(0,s.getFormAddressFields)(),t=document.getElementById("personalId").value;t=t?(0,s.formatPersonalId)(t):null;// Write to Firestore
let n=db.collection("users").doc(authUser.current.uid);n.update({...e,personalId:t}).then(()=>{console.log(`User address of ${authUser.current.uid} is now updated`),itemConfirmationScreen.style.display="block",addressFormDiv.style.display="none"}).catch(e=>{errorHandler.report(e),console.error("Error updating document: ",e)})}function f(){return new Map().set("hole","H\xe5l").set("stain","Fl\xe4ck").set("lostFit","Tappad passform").set("pilling","Nopprig").set("threadUp","Tr\xe5dsl\xe4pp").set("colorChange","F\xe4rg\xe4ndring").set("otherDefect","Annat")}function p(){return["frontImage","brandTagImage","defectImage","materialTagImage","extraImage"]}async function y(){// Track with segment 'User Activated'
await h()===1&&analytics.track("User Activated")}async function h(){let e=await getItems(authUser.current.uid);return e.docs.filter(e=>e.data()?.status!=="Draft").length}async function I(){// Create item from sessionStorage
if(console.log("sellItemMainAuthenticated "+new Date),"draft"!==m.type&&"resell"!==m.type&&(document.getElementById("saveItemDraftButton").style.display="flex"),window.addEventListener("beforeunload",()=>{(m.id||u)&&localStorage.removeItem("newItem")}),// Visa alla "viktiga" fält om man är inloggad
toggleMoreInfoFields.click(),sessionStorage.getItem("itemToBeCreatedAfterSignIn")){// ... if we are redirected here from the sign-in page
if(document.referrer.includes("/sign-in")){await N();let e=sessionStorage.getItem("shippingMethod");e&&await callFirebaseFunction("europe-west1","updateFirebaseUser",{preferences:{shippingMethod:e}});let t=user.current?.phoneNumber?.length;return location.href=t?"/item-confirmation":"/user-contact"}sessionStorage.removeItem("itemToBeCreatedAfterSignIn")}}async function S(){let e,t,n,o,i,f;let y=document.getElementById("qrCanvas");if(y&&(0,l.default).toCanvas(y,window.location.href,function(e){e&&console.error(e),console.log("success!")}),localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("itemValuation"),sessionStorage.getItem("itemToBeCreatedAfterSignIn")&&document.referrer.includes("/sign-in")){// ... if we are redirected here from the sign-in page and have a saved item that should be created
document.getElementById("loadingDiv").style.display="flex",document.getElementById("creatingItemText").style.display="block";return}e=document.getElementById("frontImage"),t=document.getElementById("brandTagImage"),n=document.getElementById("productImage"),o=document.getElementById("defectImage"),i=document.getElementById("materialTagImage"),f=document.getElementById("extraImage"),// display image when file has been selected
$("#frontImage").off("change"),e.addEventListener("change",U,{capture:!0}),$("#brandTagImage").off("change"),t.addEventListener("change",K,{capture:!0}),$("#productImage").off("change"),n.addEventListener("change",q,{capture:!0}),$("#defectImage").off("change"),o.addEventListener("change",z,{capture:!0}),$("#materialTag").off("change"),i.addEventListener("change",J,{capture:!0}),$("#extraImage").off("change"),f.addEventListener("change",G,{capture:!0}),(0,c.setupModelSearchEventListeners)(),function(){let e=document.getElementById("itemColor");e.onchange=function(){""!==this.value?e.style.color="#333":e.style.color="#929292"};// Change font color of dropdown itemAge when user selects a value
let t=document.getElementById("itemAge");t.onchange=function(){""!==this.value?t.style.color="#333":t.style.color="#929292"}}(),itemBrand.addEventListener("input",(0,r.fieldLabelToggle)("itemBrandLabel")),itemBrand.addEventListener("input",W),itemModel.addEventListener("input",(0,r.fieldLabelToggle)("itemModelLabel")),itemSize.addEventListener("input",(0,r.fieldLabelToggle)("itemSizeLabel")),itemSize.addEventListener("input",W),itemMaterial.addEventListener("input",(0,r.fieldLabelToggle)("itemMaterialLabel")),itemMaterial.addEventListener("input",W),itemOriginalPrice.addEventListener("input",(0,r.fieldLabelToggle)("itemOriginalPriceLabel")),itemAge.addEventListener("input",(0,r.fieldLabelToggle)("itemAgeLabel")),itemCondition.addEventListener("input",(0,r.fieldLabelToggle)("itemConditionLabel")),itemColor.addEventListener("change",(0,r.fieldLabelToggle)("itemColorLabel")),itemColor.addEventListener("input",W),itemUserComment.addEventListener("input",(0,r.fieldLabelToggle)("userCommentLabel")),document.getElementById("saveItemDraftButton").addEventListener("click",async()=>{document.getElementById("saveItemDraftButton").style.display="none",document.getElementById("saveDraftSpinner").style.display="flex";let e=sessionStorage.getItem("newItemId")||await (0,r.requestUniqueId)(),t=await A(e,"Draft");u=!0,a=t,document.getElementById("clearItemForm").style.display="none",document.getElementById("saveDraftSpinner").style.display="none",document.getElementById("darkOverlay").style.display="block";let n=t.images?.enhancedFrontImageSmall||t.images?.enhancedFrontImage||t.images?.frontImage;n?(document.getElementById("popUpImage").src=n,document.getElementById("popUpImageDiv").style.display="block",document.getElementById("popUpCheckmark").style.display="none"):(document.getElementById("popUpImage").src="",document.getElementById("popUpImageDiv").style.display="none",document.getElementById("popUpCheckmark").style.display="block"),document.getElementById("itemDraftSavedPopup").style.display="flex"}),document.getElementById("closeItemSavedPopup").addEventListener("click",()=>{document.getElementById("itemDraftSavedPopup").style.display="none",document.getElementById("darkOverlay").style.display="none"}),document.getElementById("popUpNewItem").addEventListener("click",()=>{et(),location.href="/sell-item"}),document.getElementById("goToMyWardrobe").addEventListener("click",()=>{window.location.href="/private#wardrobe"}),document.getElementById("addItemButton").addEventListener("click",()=>{document.getElementById("wf-form-Add-Item").reportValidity();let e=document.getElementById("wf-form-Add-Item").querySelectorAll(":invalid"),t=e?.[0];t&&t.getBoundingClientRect().height<=1&&(t.style.cssText="width:100% !important;height:100% !important;"),setTimeout(()=>{if(e.length>0){if(!function(e){"function"==typeof jQuery&&e instanceof jQuery&&(e=e[0]);let t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight/2||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}(t)){let e=t.getBoundingClientRect().top+window.scrollY-40;window.scrollTo({top:e,behavior:"smooth"})}document.getElementById("wf-form-Add-Item").reportValidity()}},300)}),addItemForm.addEventListener("submit",()=>v()),userAddressForm.addEventListener("submit",g),(0,d.autocomplete)(document.getElementById("itemBrand"),d.brands);// Hide/Show warning about difficulty to sell certain brands
let h=document.getElementById("itemBrand"),I=document.getElementById("itemCategory");if(h.oninput=function(){shareSoldDiv.style.display="none",(0,r.checkBlockedOrLowShareSoldBrand)(this.value,I.value)},h.onblur=function(){let e=document.getElementById("hardToSellDiv");(["Ok\xe4nt","Unknown","Vet ej","Vet inte","Ok\xe4nd","Se bild"].some(e=>this.value.toLowerCase().includes(e.toLowerCase()))||this.value.length&&!this.value.match(/(\w|\d)/))&&(hardToSellText.innerHTML=`Vi k\xe4nner inte till m\xe4rket '${this.value}', och s\xe4ljer i regel inte ok\xe4nda varum\xe4rken.`,stopIcon.style.display="none",warningIcon.style.display="block",e.style.display="block"),(0,c.displayFindModelDiv)(this.value)},// Hide/Show extra fields for defects
itemCondition.onchange=function(){let e=this.value;"Anv\xe4nd, tecken p\xe5 slitage"===e?(defectInfoDiv.style.display="block",itemCondition.style.color="#333"):""===e?(defectInfoDiv.style.display="none",itemCondition.style.color="#929292"):(defectInfoDiv.style.display="none",itemCondition.style.color="#333")},// Show intro info about the importance to accurately describe the items condition
itemCondition.addEventListener("input",()=>{"Anv\xe4nd, men utan anm\xe4rkning"!==itemCondition.value||(authUser.current?"true"!==getCookie("conditionUsedInfoBoxSeen")?(user.current?.elementViews?user.current.elementViews.filter(e=>"conditionUsedInfoBox"===e.elementID):[]).length||(document.getElementById("triggerOpenConditionUsedInfo").click(),// Store elementViews to be able to hinder it to show automatically again
db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"conditionUsedInfoBox",timestamp:new Date})}),setCookie("conditionUsedInfoBoxSeen","true",100)):db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"conditionUsedInfoBox",timestamp:new Date})}):"true"!==getCookie("conditionUsedInfoBoxSeen")&&(document.getElementById("triggerOpenConditionUsedInfo").click(),setCookie("conditionUsedInfoBoxSeen","true",100)))}),nwt.addEventListener("click",()=>{V(itemCondition,"Helt ny, med prislapp kvar")}),nwot.addEventListener("click",()=>{V(itemCondition,"Helt ny, men utan prislapp")}),usedNoDefect.addEventListener("click",()=>{V(itemCondition,"Anv\xe4nd, men utan anm\xe4rkning")}),usedDefect.addEventListener("click",()=>{V(itemCondition,"Anv\xe4nd, tecken p\xe5 slitage")}),personalId.addEventListener("input",()=>{let e=(0,s.isValidSwedishSsn)(personalId.value)?"":"Ogiltigt personnummer";personalId.setCustomValidity(e)}),(0,r.initializeCategorySelect)(),await ee(),await Z(),await Q(),await X(),function(){let e=new MutationObserver((e,t)=>{let n=e.find(e=>"style"===e.attributeName);n&&"none"===n.target.style.display&&F()});Array.from(document.querySelectorAll(".suggest-buttons")).forEach(t=>e.observe(t,{attributes:!0}))}(),function(){function e(e){if(u)return;let t=e.target;if(t instanceof Element){let e=w()[t.name];e!==t.value&&""!==t.value&&(document.getElementById("clearItemForm").style.display="block")}}m.id||(document.getElementById("wf-form-Add-Item").addEventListener("input",e),document.querySelector("#wf-form-Add-Item select").addEventListener("change",e))}(),function(){let e=document.getElementById("saveItemDraftDiv");function t(t){if(!m.id&&!u||m.id&&"resell"!==m.type&&"draft"!==m.type)return;let n=t.target;if(n instanceof Element){let t=a[n.name];t!==n.value&&""!==n.value&&(e.style.display="block")}}document.getElementById("wf-form-Add-Item").addEventListener("input",t),document.querySelector("#wf-form-Add-Item select").addEventListener("change",t),document.getElementById("saveItemDraft").addEventListener("click",async()=>{e.classList.add("saving");let t="resell"===m.type?await (0,r.requestUniqueId)():"draft"===m.type?m.id:a.id;await A(t,"Draft"),e.classList.remove("saving"),e.classList.add("saved"),setTimeout(()=>{e.classList.remove("saved"),e.style.display="none"},1500)})}(),p().forEach(e=>{document.getElementById(`delete${(0,r.capitalizeFirstLetter)(e)}Icon`).addEventListener("click",()=>{en(e)})}),document.getElementById("deleteFrontImageIcon").addEventListener("click",()=>{document.getElementById("frontImage").required=!0,en("enhancedFrontImage")}),document.getElementById("deleteBrandTagImageIcon").addEventListener("click",()=>{document.getElementById("brandTagImage").required=!0}),document.getElementById("clearItemForm").addEventListener("click",et),window.addEventListener("scroll",function e(){window.innerHeight+window.pageYOffset>=document.body.offsetHeight-40&&(document.getElementById("bottomBarContainer").classList.add("sticky-bottom-bar"),window.removeEventListener("scroll",e))}),m.id)// Fill form if the user comes from a prefill link (re-sell item or continue with draft item)
sessionStorage.removeItem("newItemId"),localStorage.removeItem("newItem"),authUser.whenSet(function(e){e||(document.getElementById("maiIntro").style.display="block")}),document.getElementById("resellIntro").style.display="block",document.getElementById("bottomBarContainer").classList.add("sticky-bottom-bar"),document.getElementById("clearItemForm").style.display="none",("draft"===m.type||"resell"===m.type)&&(document.querySelector("#resellIntro .text-block-176").innerText="Fyll i de sista detaljerna f\xf6r att s\xe4lja ditt plagg och kontrollera skickbeskrivningen.",document.getElementById("frontImage").required=!0,document.getElementById("brandTagImage").required=!0),await H(m.id,null,"draft"===m.type),document.getElementById("triggerShowSellItemContent").click();else if(localStorage.getItem("newItem")&&!R(JSON.parse(localStorage.getItem("newItem")))){// Saved state from a previous visit to /sell-item - restore the data
let e=JSON.parse(localStorage.getItem("newItem"));document.getElementById("frontImage").required=!0,document.getElementById("brandTagImage").required=!0,await H(null,e,!0),document.getElementById("clearItemForm").style.display="block",document.getElementById("triggerShowSellItemContent").click()}else document.getElementById("triggerShowSellItemContent").click(),document.getElementById("frontImage").required=!0,document.getElementById("brandTagImage").required=!0;// We delay the rememberUnsavedChanges call to allow any confirm/reject animations to finish
document.getElementById("wf-form-Add-Item").querySelectorAll("input").forEach(e=>{e.addEventListener("input",F)}),document.getElementById("wf-form-Add-Item").querySelectorAll('input[type="radio"]').forEach(e=>{e.addEventListener("change",F)}),document.getElementById("wf-form-Add-Item").querySelectorAll('input[type="checkbox"]').forEach(e=>{e.addEventListener("change",F)}),// We delay the rememberUnsavedChanges call to allow any confirm/reject animations to finish
document.getElementById("wf-form-Add-Item").querySelectorAll("select").forEach(e=>{e.addEventListener("change",F)}),document.getElementById("wf-form-Add-Item").querySelectorAll("textarea").forEach(e=>{e.addEventListener("input",F)}),window.addEventListener("pageshow",e=>{e.persisted&&localStorage.getItem("newItem")&&setTimeout(async()=>{await H(null,JSON.parse(localStorage.getItem("newItem")),!0)},10)})}async function v(){let e="draft"===m.type?m.id:sessionStorage.getItem("newItemId")||await (0,r.requestUniqueId)();try{document.getElementById("addItemFormDiv").style.display="none",document.getElementById("loadingDiv").style.display="flex",document.getElementById("clearItemForm").style.display="none",document.getElementById("saveItemDraftDiv").style.display="none";let t=await A(e),n=await k(e,t);location.href=n}catch(e){errorHandler.report(e),console.error("addItem failed",e)}}function b({humanCheckNeeded:e,newMinMaxLog:t,lowValueSegment:n,lowValueCategory:a}){return e||t.match(/accept price is above max/i)&&!n&&!a}async function B(e,t){if(sessionStorage.getItem("itemToBeCreatedAfterSignIn")){let t=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"));sessionStorage.setItem("itemToBeCreatedAfterSignIn",JSON.stringify({id:t.id,item:{...t.item,...e}}))}else{await callFirebaseFunction("europe-west1","saveItemValuationFields",{itemId:t,...e});let n=JSON.parse(localStorage.getItem("latestItemCreated"));localStorage.setItem("latestItemCreated",JSON.stringify({...n,...e}))}}async function x(e,t){let{minPrice:n,maxPrice:a,decline:o,humanCheckNeeded:r,humanCheckExplanation:i,willNotSell:l,soldPrice:s,version:d,newMinPriceEstimate:c,newMaxPriceEstimate:u,newMinMaxLog:m,adjustmentAllowed:g,newBrand:f,newBrandCategory:p,valuatedBrandItems:y,brandMeanMax:h,brandAccuracy:I,brandCategoryAccuracy:S,fewBrand:v,brandMeanSold:x,brandCategoryMeanSold:E,highPriceVarBrandCategory:k,brandShareSold:C}=t||{};if(!n&&!o)return;let w={mlValuation:{decline:o,humanCheckNeeded:r,minPriceEstimate:n,maxPriceEstimate:a,humanCheckExplanation:i,willNotSellPrediction:l,soldPriceEstimate:s,modelVersion:d?.toString(),newMinPriceEstimate:c,newMaxPriceEstimate:u,newMinMaxLog:m,adjustmentAllowed:g,newBrand:f,newBrandCategory:p,valuatedBrandItems:y,brandMeanMax:h,brandAccuracy:I,brandCategoryAccuracy:S,fewBrand:v,brandMeanSold:x,brandCategoryMeanSold:E,highPriceVarBrandCategory:k,brandShareSold:C},newMinPriceEstimate:c||n,newMaxPriceEstimate:u||a,...o||b(t)?{}:{valuationStatus:"Completed",valuationDate:new Date().toISOString(),infoRequests:{price:{status:"Active",response:"",description:"Vi b\xf6rjar med startpriset, och justerar successivt ner till l\xe4gsta priset under s\xe4ljperioden p\xe5 30 dagar. V\xe4rderingen utg\xe5r fr\xe5n vad liknande s\xe5lts f\xf6r.",minPrice:c||n,maxPrice:u||a}}}};await B(w,e)}async function E(e,t,n){let a="Sold"===e.status?e.maxPriceEstimate:Math.min(e.maxPriceEstimate,Math.max(e.minPriceEstimate+150,10*Math.round((1.3*e.minPriceEstimate||0)/10))),o={valuationStatus:"Completed",valuationDate:new Date().toISOString(),newMinPriceEstimate:e.minPriceEstimate,newMaxPriceEstimate:a,infoRequests:{price:{status:"Active",response:"",description:"Vi b\xf6rjar med startpriset, och justerar successivt ner till l\xe4gsta priset under s\xe4ljperioden p\xe5 30 dagar. V\xe4rderingen utg\xe5r fr\xe5n vad liknande s\xe5lts f\xf6r.",minPrice:e.minPriceEstimate,maxPrice:a,type:"Valuation",source:"createdFromItem",adjustmentAllowed:!0}}};await B(o,n)}async function k(e,t){if(!e&&!t)return console.error("No item and no itemId, unexpected!!"),"/item-confirmation";if(m.id&&"draft"!==m.type){let n=await firebase.app().functions("europe-west1").httpsCallable("getItem")({itemId:m.id}),a=n.data;return await E(a,t,e),"/item-valuation"}try{let n=await firebase.app().functions("europe-west1").httpsCallable("itemMlValuation")({itemId:e,item:t}),{minPrice:a,maxPrice:o,decline:r}=n.data||{};return await x(e,n.data),C(a&&o,r,b(n.data))}catch(e){console.error("Failed to get ml valuation",e)}return C()}function C(e,t,n){if(!e||n){if(sessionStorage.getItem("itemToBeCreatedAfterSignIn"))return"/sign-in";let e=user.current?.phoneNumber?.length;return e?"/item-confirmation":"/user-contact"}return"/item-valuation"}function w(){return{acceptPrice:null,age:null,brand:null,category:null,color:null,condition:null,defectDescription:null,defects:[],images:{},material:null,model:null,originalPrice:null,userValuationApproval:!0,sex:"Woman",size:null,userComment:null}}function M(){let e="",t=new Date,n=itemSize.value,a=itemMaterial.value?itemMaterial.value.trim():"",o=itemBrand.value?itemBrand.value.trim():"",r=itemModel.value?itemModel.value.trim():"",i=Number(itemOriginalPrice.value),l=itemAge.value,s=itemCondition.value,d=itemDefectDescription.value?itemDefectDescription.value.trim():"",c=itemUserComment.value?itemUserComment.value.trim():"",u=Number(itemLowestAcceptPrice.value),m=new Map().set("hole",hole.checked).set("stain",stain.checked).set("lostFit",lostFit.checked).set("pilling",pilling.checked).set("threadUp",threadUp.checked).set("colorChange",colorChange.checked).set("otherDefect",otherDefect.checked),g=[];"Anv\xe4nd, tecken p\xe5 slitage"===s&&m.forEach((e,t)=>{if(e){let e=f().get(t);g.push(e)}});for(var p=document.getElementsByName("Sex"),y=0;y<p.length;y++)p[y].checked&&(e=p[y].id);let h=document.getElementById("findModelBoxFilled"),I={};if("flex"===h.style.display){// There is a current model selected grab the cover image and id from it
let e=JSON.parse(h.getAttribute("data-model"));I={modelCoverImageUrl:e.coverImage,atModelVariantId:e.atVariantId}}let S=JSON.parse(localStorage.getItem("newItem")||"{}").images;return{user:authUser.current?.uid||null,createdAt:t.toISOString(),status,shippingStatus:"Not sent",sex:e,size:n,material:a,color:itemColor.value,category:itemCategory.value,brand:o,model:r,originalPrice:i,age:l,condition:s,defects:g,defectDescription:d,userComment:c,acceptPrice:u,preferences:{userValuationApproval:!0},...I,images:S}}async function L(){// If first time: User chooses shipping method preference in sell item form
let e="Service point";return user.current?.preferences?.shippingMethod?e=user.current?.preferences?.shippingMethod:authUser.current?await callFirebaseFunction("europe-west1","updateFirebaseUser",{preferences:{shippingMethod:e}}):sessionStorage.setItem("shippingMethod",e),e}async function A(e,t="New"){let{modelCoverImageUrl:n,images:a,...o}=M(),r=await L();n&&(a.modelImage=n);let i=m.id&&"draft"!==m.type?{createdFromItem:m.id}:{},l=!!Object.keys(i).length,s={...o,status:t,..."Draft"===t?{draftSource:l?"Mai purchase":"Sell item"}:{},shippingMethod:r,images:a,...i,version:"2"};if(authUser.current){let t=await callFirebaseFunction("europe-west1","createItem",{id:e,item:s});//Archive if "createdFromItem" is same seller
if(await y(),await T(),localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId"),localStorage.setItem("latestItemCreated",JSON.stringify(t.data)),l){let e=await P(m.id);e===authUser.current.uid&&await db.collection("items").doc(m.id).update({archived:!0})}}else sessionStorage.setItem("itemToBeCreatedAfterSignIn",JSON.stringify({id:e,item:s}));return{...s,id:e}}async function P(e){console.log("getCreatedFromItemUserId()");let t=await db.collection("items").doc(e).get();return t.exists?t.data().user:null}async function T(){let e="2024-03-10">=new Intl.DateTimeFormat("se-SV").format(new Date);e&&"noCommission"===getCookie("noCommissionCampaignCookie")&&await h()===1&&await callFirebaseFunction("europe-west1","setNoCommissionCoupon")}async function N(){let e=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"));sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),sessionStorage.removeItem("newItemId"),await callFirebaseFunction("europe-west1","createItem",e),await y(),await T(),localStorage.removeItem("newItem"),e.item.id=e.id,localStorage.setItem("latestItemCreated",JSON.stringify(e.item))}let D=()=>!(localStorage.getItem("latestItemCreated")||u||m.id);function F(){if(!D())return;console.log("rememberUnsavedChanges");let{user:e,createdAt:t,status:n,shippingStatus:a,modelVariantFields:o,...r}=M(),i=Object.keys(r).reduce((e,t)=>(e[t]=""===r[t]?null:r[t],e),{});i.defects=i.defects?i.defects:[],i.userValuationApproval=!0,delete i.preferences,i.acceptPrice=i.acceptPrice&&i.acceptPrice>0?i.acceptPrice:null,i.originalPrice=i.originalPrice&&i.originalPrice>0?i.originalPrice:null,["itemBrand","itemSize","itemMaterial","itemColor"].forEach(e=>{let t=document.getElementById(e).parentNode.querySelector(".suggest-buttons")||document.getElementById(e).parentNode.parentNode.querySelector(".suggest-buttons");t?.style?.display==="block"&&(i[`${e}Confirm`]=!0)}),R(i)?localStorage.removeItem("newItem"):localStorage.setItem("newItem",JSON.stringify(i))}function R(e){return function(e,t){for(let n in t)if(n in e){if(t[n]instanceof Object){if(JSON.stringify(t[n])!==JSON.stringify(e[n]))return!1;continue}if(e[n]!==t[n])return!1}return!0}(e,w())}function O(e,t,n){if(t&&n){let t=document.getElementById(e).parentNode.querySelector(".suggest-buttons")||document.getElementById(e).parentNode.parentNode.querySelector(".suggest-buttons");t.style.display="block",document.getElementById(e).setCustomValidity("Bekr\xe4fta eller \xe4ndra v\xe4rdet")}}async function H(e,t=null,n=!1){try{let o={data:t},i=null;t||([o,i]=await Promise.all([firebase.app().functions("europe-west1").httpsCallable("getItem")({itemId:e}),fetch(`https://getatitem-heypmjzjfq-ew.a.run.app?itemId=${e}`)]),a=o);let l=await i?.json()||{},s=o.data,d=s.images||{},u=s.originalPrice;// Populate images
for(let e in u<=0&&(u=null),d){let t=d[`${e}Small`]||d[`${e}Medium`]||d[e]||d[`${e}Large`],n=d[e]||d[`${e}Large`]||d[`${e}Medium`]||d[`${e}Small`];p().includes(e)&&((0,r.rememberNewItemImageField)(e,n,t),"frontImage"===e&&(d.enhancedFrontImage?(t=d.enhancedFrontImageSmall||d.enhancedFrontImageMedium||d.enhancedFrontImage||d.enhancedFrontImageLarge,n=d.enhancedFrontImage||d.enhancedFrontImageLarge||d.enhancedFrontImageMedium||d.enhancedFrontImageSmall,(0,r.rememberNewItemImageField)("enhancedFrontImage",n,t)):(function(e){let t=new MutationObserver(e),n=document.getElementById("loadingDiv");t.observe(n,{attributeFilter:["style"]})}(()=>(0,r.showLoadingIcon)(e)),// Don't await here to don't block the form from showing with the front image
(0,r.enhanceFrontImage)(n).then(()=>console.log("Image enhanced")))),(0,r.showImagePreview)(e,t),(0,r.showImageState)(e,"success-state"),document.getElementById(e).required=!1)}if(d.modelImage){let e=d.modelImageLarge||d.modelImage,t=d.modelImageSmall||d.modelImageMedium||d.modelImage;document.getElementById("coverImageContainer").style.backgroundImage=`url('${t}')`,document.getElementById("coverImagePreview").style.display="block",(0,r.rememberNewItemImageField)("modelImage",e,t)}else if(d.coverImage&&!await ea(d.coverImage)){// Show cover image preview if it is a model image, if it is a noBg image we skip it
sessionStorage.removeItem("coverImagePreviewUrl");let e=d.coverImageLarge||d.coverImage,t=d.coverImage;document.getElementById("coverImageContainer").style.backgroundImage=`url('${t}')`,document.getElementById("coverImagePreview").style.display="block",(0,r.rememberNewItemImageField)("modelImage",e,t)}// Populate text input fields
itemBrand.value=s.brand||"",s.brand&&(0,c.displayFindModelDiv)(s.brand).then(()=>{if(sessionStorage.getItem("models")&&s.atModelVariantId){let e=JSON.parse(sessionStorage.getItem("models")),t=e.find(e=>e.atVariantId===s.atModelVariantId);t&&(0,c.showSelectedModel)(JSON.stringify(t))}}),O("itemBrand",n,s.itemBrandConfirm),// Don't use the setFieldValue for the brand since that triggers a dropdown to open
document.getElementById("itemBrandLabel").style.display=s.brand?"inline-block":"none",(0,c.setFieldValue)("itemSize",s.size),O("itemSize",n,s.itemSizeConfirm),(0,c.setFieldValue)("itemMaterial",s.material),O("itemMaterial",n,s.itemMaterialConfirm),(0,c.setFieldValue)("itemModel",s.model||l?.model),(0,c.setFieldValue)("itemOriginalPrice",u||l?.originalPrice),n&&((0,c.setFieldValue)("itemUserComment",s.userComment),(0,c.setFieldValue)("itemDefectDescription",s.defectDescription),(0,c.setFieldValue)("itemLowestAcceptPrice",s.acceptPrice<=0?null:s.acceptPrice),V(itemCondition,s.condition)),m.id&&"Sold"===s.status&&(document.getElementById("priceSettings").style.display="none"),// Populate select fields
V(itemAge,s.age),V(itemColor,s.color||l?.color),O("itemColor",n,s.itemColorConfirm),itemCondition.selectedIndex>=0&&"Anv\xe4nd, tecken p\xe5 slitage"===itemCondition.options[itemCondition.selectedIndex].text&&(defectInfoDiv.style.display="block");let g=$("#itemCategory");g.val(s.category),g.trigger("change"),s.sex?(document.getElementById("Woman").previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById("Woman").checked=!1,document.getElementById(s.sex).previousElementSibling.classList.add("w--redirected-checked"),document.getElementById(s.sex).checked=!0):(document.getElementById("Woman").previousElementSibling.classList.add("w--redirected-checked"),document.getElementById("Woman").checked=!0),n&&f().forEach((e,t)=>{s.defects&&s.defects.includes(e)&&(document.getElementById(t).previousElementSibling.classList.add("w--redirected-checked"),document.getElementById(t).checked=!0)})}catch(e){console.error("Error getting item document:",e),errorHandler.report(e)}document.getElementById("loadingDiv").style.display="none"}function V(e,t){let n=Array.from(e.options).map(e=>e.attributes.value.value).indexOf(t);n>0?(e.selectedIndex=n,e.style.color="#333"):(e.selectedIndex=0,e.style.color="#929292"),e.dispatchEvent(new Event("input")),e.dispatchEvent(new Event("change"))}let j={black:"Black",white:"White",gray:"Grey",blue:"Blue",dark_blue:"Navy","multicolor/colorful":"Multicolour",red:"Red",pink:"Pink",brown:"Brown",beige:"Beige",light_blue:"Blue",green:"Green",silver:"Silver",purple:"Purple",maroon:"Burgundy",gold:"Gold",orange:"Orange",yellow:"Yellow",teal:"Turquoise",olive:"Green",cyan:"Turquoise",magenta:"Pink",mustard:"Yellow"};async function U(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,r.uploadImageAndShowPreview)(t,"frontImage");if(!n||0===Object.keys(n).length)return;let a=[];a.push(_(n),Y(n),(0,r.enhanceFrontImage)(n)),await Promise.all(a),F()}}async function K(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,r.uploadImageAndShowPreview)(t,"brandTagImage");(0,r.showDeleteImageIcon)("brandTagImage"),await Y(n),F()}}async function q(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,r.uploadImageAndShowPreview)(t,"productImage");(0,r.showDeleteImageIcon)("productImage"),await Y(n),F()}}async function z(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,r.uploadImageAndShowPreview)(t,"defectImage");(0,r.showDeleteImageIcon)("defectImage"),await Y(n),F()}}async function J(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,r.uploadImageAndShowPreview)(t,"materialTagImage");(0,r.showDeleteImageIcon)("materialTagImage"),await Y(n),F()}}async function G(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,r.uploadImageAndShowPreview)(t,"extraImage");(0,r.showDeleteImageIcon)("extraImage"),await Y(n),F()}}function W(e){e.currentTarget.setCustomValidity("");let t=e.currentTarget.parentNode.querySelector(".suggest-buttons")||e.currentTarget.parentNode.parentNode.querySelector(".suggest-buttons");t.style.display="none"}async function Y(e){try{if(document.querySelector("#itemBrand").value.length&&document.querySelector("#itemMaterial").value.length&&document.querySelector("#itemSize").value.length)return;let t=await firebase.app().functions("europe-west1").httpsCallable("detectItemBrandAndMaterialAndSize")({imageUrl:e});!document.querySelector("#itemBrand").value.length&&t.data?.brand&&(document.querySelector("#itemBrand").value=t.data.brand,document.querySelector("#itemBrand").setCustomValidity("Bekr\xe4fta eller \xe4ndra m\xe4rket"),document.getElementById("itemBrandLabel").style.display="inline-block",document.querySelector("#brandSuggestButtons").style.display="block",document.querySelector("#itemBrand").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"brandSuggestButtons"})),!document.querySelector("#itemMaterial").value.length&&t.data?.materials&&(document.querySelector("#itemMaterial").value=t.data.materials,document.querySelector("#itemMaterial").setCustomValidity("Bekr\xe4fta eller \xe4ndra materialet"),document.getElementById("itemMaterialLabel").style.display="inline-block",document.querySelector("#materialSuggestButtons").style.display="block",document.querySelector("#itemMaterial").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"materialSuggestButtons"})),!document.querySelector("#itemSize").value.length&&t.data?.size&&(document.querySelector("#itemSize").value=t.data.size,document.querySelector("#itemSize").setCustomValidity("Bekr\xe4fta eller \xe4ndra storlek"),document.getElementById("itemSizeLabel").style.display="inline-block",document.querySelector("#sizeSuggestButtons").style.display="block",document.querySelector("#itemSize").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"sizeSuggestButtons"}))}catch(e){errorHandler.report(e),console.log("Error calling detectItemBrandAndMaterialAndSize",e)}}async function _(e){if(""===document.querySelector("#itemColor").value)try{let t=await firebase.app().functions("europe-west1").httpsCallable("detectItemColor")({imageUrl:e});if(!t.data?.colors||!t.data.colors.length){console.log("Unable to detect product color");return}if(t.data.colors.length>2)document.querySelector("#itemColor").value="Multicolour";else if(j[t.data.colors?.[0]])document.querySelector("#itemColor").value=j[t.data.colors?.[0]];else{console.log("Unable to set color from",t.data.colors?.[0]);return}document.querySelector("#itemColor").setCustomValidity("Bekr\xe4fta eller \xe4ndra f\xe4rgen"),document.querySelector("#colorSuggestButtons").style.display="block",document.querySelector("#itemColor").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"colorSuggestButtons"})}catch(e){errorHandler.report(e),console.log("Error calling detectItemColor",e)}}async function Q(){document.getElementById("rejectMaterial").addEventListener("click",()=>{document.querySelector("#itemMaterial").value="",document.querySelector("#materialSuggestButtons").style.display="none",(0,r.fieldLabelToggle)("itemMaterialLabel"),document.querySelector("#itemMaterial").setCustomValidity("")}),document.getElementById("confirmMaterial").addEventListener("click",()=>{document.querySelector("#itemMaterial").setCustomValidity("")})}async function Z(){document.getElementById("rejectBrand").addEventListener("click",()=>{document.querySelector("#itemBrand").value="",document.querySelector("#brandSuggestButtons").style.display="none",document.querySelector("#itemBrand").setCustomValidity(""),(0,r.fieldLabelToggle)("itemBrandLabel")}),document.getElementById("confirmBrand").addEventListener("click",()=>{document.querySelector("#itemBrand").setCustomValidity(""),document.querySelector("#itemBrand").setCustomValidity("")})}async function X(){document.getElementById("rejectSize").addEventListener("click",()=>{document.querySelector("#itemSize").value="",document.querySelector("#sizeSuggestButtons").style.display="none",(0,r.fieldLabelToggle)("itemSizeLabel"),document.querySelector("#itemSize").setCustomValidity("")}),document.getElementById("confirmSize").addEventListener("click",()=>{document.querySelector("#itemSize").setCustomValidity("")})}async function ee(){document.getElementById("rejectColor").addEventListener("click",()=>{document.querySelector("#itemColor").value="",document.querySelector("#colorSuggestButtons").style.display="none",(0,r.fieldLabelToggle)("itemColorLabel"),document.querySelector("#itemColor").setCustomValidity("")}),document.getElementById("confirmColor").addEventListener("click",()=>{document.querySelector("#itemColor").setCustomValidity("")})}function et(){document.getElementById("clearItemForm").style.display="none",p().forEach(e=>{document.getElementById(`${e}Preview`).style.backgroundImage="",(0,r.showImageState)(e,"default-state")}),(0,c.setFieldValue)("itemBrand",null),Array.from(document.querySelectorAll(".suggest-buttons")).forEach(e=>e.style.display="none"),(0,c.setFieldValue)("itemSize",null),(0,c.setFieldValue)("itemMaterial",null),(0,c.setFieldValue)("itemModel",null),(0,c.setFieldValue)("itemOriginalPrice",null),(0,c.setFieldValue)("itemUserComment",null),(0,c.setFieldValue)("itemDefectDescription",null),(0,c.setFieldValue)("itemLowestAcceptPrice",null),V(itemAge,""),V(itemColor,""),V(itemCondition,""),defectInfoDiv.style.display="none";let e=$("#itemCategory");e.val(""),e.trigger("change"),// Populate radio-buttons
document.getElementById("Man").previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById("Man").checked=!1,document.getElementById("Unisex").previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById("Unisex").checked=!1,document.getElementById("Woman").previousElementSibling.classList.add("w--redirected-checked"),document.getElementById("Woman").checked=!0,// Populate checkboxes
f().forEach((e,t)=>{document.getElementById(t).previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById(t).checked=!1}),sessionStorage.removeItem("newItemId"),localStorage.removeItem("newItem")}function en(e){let t=JSON.parse(localStorage.getItem("newItem"));delete t?.images?.[e],delete t?.images?.[`${e}Small`],localStorage.setItem("newItem",JSON.stringify(t))}let ea=async e=>{let t=async e=>{let t=new Image;return t.crossOrigin="Anonymous",t.src=e,await t.decode(),t},n=e=>{let[t,n,a,o]=[e[0],e[1],e[2],e[3]];for(let r=4;r<e.length;r+=4)if(e[r]!==t||e[r+1]!==n||e[r+2]!==a||e[r+3]!==o)return!1;return!0};try{if(e.match(/nobg|no-bg/i))return!0;let a=await t(e),o=document.createElement("canvas"),r=o.getContext("2d",{willReadFrequently:!0});o.width=a.naturalWidth,o.height=a.naturalHeight,r.drawImage(a,0,0,a.naturalWidth,a.naturalHeight);let i=r.getImageData(0,0,a.naturalWidth,10).data,l=r.getImageData(0,a.naturalHeight,a.naturalWidth,-10).data,s=r.getImageData(0,0,10,a.naturalHeight).data,d=r.getImageData(a.naturalWidth,0,-10,a.naturalHeight).data;return n(i)&&n(l)&&n(s)&&n(d)}catch(e){// If we cannot load the image, play it safe and assume it is the no-bg image
return console.error(e),!0}};// Call sellItemMain directly
S(),// and call sellItemMainAuthenticated after/when a user has logged in
user.whenSet(I)},{"./sellItemHelpers":"2G59s",qrcode:"6s2CO","./general":"1tOWF","./autocomplete-brands":"ljI8R","./sellItemModelSearch":"kdF4Q","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"2G59s":[function(e,t,n){var a=e("@parcel/transformer-js/src/esmodule-helpers.js");async function o(e,t){sessionStorage.getItem("newItemId")||sessionStorage.setItem("newItemId",await i());let n=sessionStorage.getItem("newItemId"),a=await r(e);if(!a)throw"Fel vid bearbetning av vald bild.";let o=new FormData;o.append("itemId",n),o.append("fileName",t),o.append("file",a),o.append("temporary","true"),o.append("generateSmallImage","true");let l=await fetch("https://uploaditemimagebinary-heypmjzjfq-ew.a.run.app",{method:"POST",body:o});return await l.json()}async function r(e){return e.size<9437184?Promise.resolve(e):new Promise((t,n)=>{let a=new FileReader;a.onload=()=>{let e=document.createElement("img");e.onload=()=>{let n=e.width,a=e.height;n>a?n>1512&&(a*=1512/n,n=1512):a>2016&&(n*=2016/a,a=2016);let o=document.createElement("canvas");o.width=n,o.height=a;let r=o.getContext("2d");r.imageSmoothingQuality="high",r.drawImage(e,0,0,n,a),o.toBlob(t,"image/jpeg")},e.src=a.result,a.onerror=n},a.readAsDataURL(e)})}async function i(){try{let e=await fetch("https://generateuniqueid-heypmjzjfq-ew.a.run.app",{method:"POST",headers:{"Content-Type":"application/json"}});if(!e.ok)return console.error(`Error: ${e.statusText}`),null;let t=await e.json();return t.id}catch(e){return console.error(`Failed to fetch unique ID, generating uuidv4 id: ${e.message}`,e),uuidv4()}}async function l(e,t=!0){let n=await s(e);return n?.url&&(t&&c("enhancedFrontImage",n.url,n.urlSmall),u("frontImage",window.innerWidth<=370?n.urlSmall:n.url)),d("frontImage"),n}async function s(e){try{let t=await firebase.app().functions("europe-west1").httpsCallable("enhanceFrontImage")({imageUrl:e});return sessionStorage.setItem("enhancedFrontImage",t.data.url),t.data}catch(e){return errorHandler.report(e),console.error(e),""}}function d(e){document.getElementById(`loading${m(e)}Icon`).style.display="none",document.getElementById(`delete${m(e)}Icon`).style.display="inline-block","frontImage"===e&&(document.getElementById("enhancedAnimationDiv").style.display="none")}function c(e,t,n){let a=JSON.parse(localStorage.getItem("newItem")||JSON.stringify({})),o=a.images||{};o[e]=t,o[`${e}Small`]=n,a.images=o,localStorage.setItem("newItem",JSON.stringify(a))}function u(e,t){document.getElementById(`${e}Preview`).style.backgroundImage=`url('${t}')`,d(e)}function m(e){return e.charAt(0).toUpperCase()+e.slice(1)}async function g(e,t,n=!0){try{!function(e){let t=document.getElementById(e).parentNode.parentNode;t.querySelector(".w-file-upload-error").style.display="none"}(t);let a=URL.createObjectURL(e);document.getElementById(`${t}PreviewUploading`).style.backgroundImage=`url('${a}')`,document.getElementById(`${t}Preview`).style.backgroundImage=`url('${a}')`,y(t),p(t,"success-state");let{url:r,urlSmall:i}=await o(e,t);return n&&c(t,r,i),r}catch(n){console.error("Failed to upload image",n),errorHandler.report(n),document.getElementById(`${t}PreviewUploading`).style.backgroundImage="",document.getElementById(`${t}Preview`).style.backgroundImage="",document.getElementById(`loading${m(t)}Icon`).style.display="none",p(t,"default-state"),e.size>10485760?f(t,"Error: Bilden \xe4r f\xf6r stor. Max 10 MB."):f(t,"Error: N\xe5got gick fel vid uppladdning, f\xf6rs\xf6k igen eller kontakt oss om felet kvarst\xe5r."),document.getElementById(t).value=""}}function f(e,t){let n=document.getElementById(e).parentNode.parentNode;n.querySelector(".w-file-upload-error").style.display="block",n.querySelector(".w-file-upload-error-msg").innerText=t}function p(e,t){let n=document.getElementById(e).parentNode.parentNode.childNodes;for(let e=0;e<n.length;e++)n[e].className.includes(t)?n[e].style.display="block":n[e].style.display="none"}function y(e){if("frontImage"===e){document.getElementById(`delete${m(e)}Icon`).style.display="none",document.getElementById(`loading${m(e)}Icon`).style.display="none",localStorage.getItem("sessionUser")||(document.getElementById("photoroomDiv").style.display="flex"),document.getElementById("enhancedAnimationDiv").style.display="block",triggerEnhancingAnimation.click();return}document.getElementById(`loading${m(e)}Icon`).style.display="inline-block",document.getElementById(`delete${m(e)}Icon`).style.display="none"}function h(e,t){let n=["shein","lager 157","divided","brandy melville","cubus","bubbleroom","bondelid","nelly","dobber","\xe5hl\xe9ns","kappahl","primark","jack & jones","sisters point","missguided","topman","bik bok","cubus","happy holly","zign","glamorous","hollister","river island","light before dark","bohoo","crocker","forever 21","maze","mint&berry","chiara forthi","zalando","din sko","pull & bear","svea","zoul","boohoo","gap","topshop","ellos","lager 157","stradivarius","studio total","indiska","bershka","shein","riley","vero moda","vila","don donna","aldo","new look denim"],a=document.getElementById("hardToSellDiv");document.getElementById("itemBrand").setCustomValidity("");let o=getParamsObject();return!o.id&&(n.includes(e.toLowerCase())||!["boots","dunjacka","jacka","k\xe4ngor","kappa","kavaj","kostym","p\xe4lsjacka","regnjacka","rock","skinnjacka","vinterskor"].includes(t?.toLowerCase())&&["tom tailor","monki","dressmann","urban outfitters","asos","holly & white","only","gina tricot"].includes(e.toLowerCase())||["baddr\xe4kt","bikini","bodysuit","chinos","flip-flops","halsduk","handduk","hatt","jeans","keps","l\xe5ng\xe4rmad t-shirt","linne","mjukisbyxor","morgonrock","m\xf6ssa","necess\xe4r","pik\xe9","pyjamas","sandaler","sarong","shorts","slips","sport-bh","strumpbyxor","t-shirt","tights","topp","tr\xe4ningsbyxor","tr\xe4ningstr\xf6ja","underst\xe4ll","vantar"].includes(t?.toLowerCase())&&["karl kani","rieker","uniqlo","carin wester","stockh lm","weekday","mango","wera","ichi","lindex","h&m","zara","mng","mq","cheap monday","h&m premium","na-kd","clarks","gant","hackett","hugo boss","la chemise","lacoste","lyle & scott","marc o'polo","melvin & hamilton","ray-ban","reebok","sebago","stenstr\xf6ms","the shirt factory","hampton republic","quicksilver","banana republic","pieces","sprit","denim","east west","xit","jacqueline de yong","mexx","fb sister","ok\xe4nt","bodyflirt","dorothy perkins","fransa","laurel","rut&circle","soc","junkyard","soyaconcept","amisu","u.s. polo assn.","line of oslo","gossip","i say","jascha stockholm","noisy may","six ames","velour by nostalgi","house of lola","fiveunits","miss me","flash","champion","under armour","oasis","fornarina","isolde","rosebud","chiquelle","kaffe","mckinley","cream","abercrombie & fitch","modstr\xf6m","ecco","esprit","alice bizous","craft","ellesse","wesc","dry lake","r\xf6hnisch","acqua limone","anna field","le","ax paris","burton","hansen & jacob","lou in love","mad lady","selected homme","tenson","whistles","zizzi","gerry weber"].includes(e.toLowerCase()))?(hardToSellText.innerHTML=n.includes(e.toLowerCase())?`Vi s\xe4ljer tyv\xe4rr inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`:`Vi s\xe4ljer tyv\xe4rr inte kategorin ${t} fr\xe5n ${e} p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`,stopIcon.style.display="flex",warningIcon.style.display="none",a.style.display="block",document.getElementById("itemBrand").setCustomValidity(n.includes(e.toLowerCase())?`Vi s\xe4ljer inte plagg fr\xe5n ${e}`:`Vi s\xe4ljer inte kategorin '${t}' fr\xe5n ${e}`),!0):["H&M","HM","Zara","ASOS","Nelly","Gina Tricot","BikBok","Bik Bok","Lindex","Kappahl","Cubus","NA-KD","NAKD","Mango","Ellos","Primark","Shein","Vila","Forever 21","Pull & Bear","Bershka","Stradivarius"].some(t=>e.toLowerCase().includes(t.toLowerCase()))?(hardToSellText.innerHTML=`Vi s\xe4ljer i regel inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5gt andrahandsv\xe4rde. Undantag kan finnas.`,stopIcon.style.display="none",warningIcon.style.display="block",a.style.display="block",!0):void(a.style.display="none")}function I(e="Kategori",t=h){$("#itemCategory").select2({selectionCssClass:"form-field",placeholder:e||"Kategori",data:[{id:"",text:""},{text:"\xd6verdelar",children:[{id:"Tr\xf6ja",text:"Tr\xf6ja"},{id:"Blus",text:"Blus"},{id:"Topp",text:"Topp"},{id:"Skjorta",text:"Skjorta"},{id:"Linneskjorta",text:"Linneskjorta"},{id:"T-shirt",text:"T-shirt"},{id:"Kavaj",text:"Kavaj"},{id:"Sweatshirt",text:"Sweatshirt"},{id:"Hoodie",text:"Hoodie"},{id:"Polotr\xf6ja",text:"Polotr\xf6ja"},{id:"Tunika",text:"Tunika"},{id:"V\xe4st",text:"V\xe4st"},{id:"Kofta",text:"Kofta"},{id:"Linne",text:"Linne"},{id:"Tr\xe4ningstr\xf6ja",text:"Tr\xe4ningstr\xf6ja"},{id:"Poncho",text:"Poncho"},{id:"Pik\xe9",text:"Pik\xe9"},{id:"L\xe5ng\xe4rmad T-shirt",text:"L\xe5ng\xe4rmad T-shirt"},{id:"Kostymv\xe4st",text:"Kostymv\xe4st"}]},{text:"Underdelar",children:[{id:"Kjol",text:"Kjol"},{id:"Byxor",text:"Byxor"},{id:"Jeans",text:"Jeans"},{id:"Chinos",text:"Chinos"},{id:"Fritidsbyxor",text:"Fritidsbyxor"},{id:"Tr\xe4ningsbyxor",text:"Tr\xe4ningsbyxor"},{id:"Tights",text:"Tights"},{id:"Strumpbyxor",text:"Strumpbyxor"},{id:"Mjukisbyxor",text:"Mjukisbyxor"},{id:"Kostymbyxor",text:"Kostymbyxor"},{id:"Shorts",text:"Shorts"},{id:"Sarong",text:"Sarong"}]},{text:"Helkropp",children:[{id:"Kl\xe4nning",text:"Kl\xe4nning"},{id:"Kaftan",text:"Kaftan"},{id:"Kostym",text:"Kostym"},{id:"Set",text:"Set"},{id:"Jumpsuit",text:"Jumpsuit"},{id:"Baddr\xe4kt",text:"Baddr\xe4kt"},{id:"Bikini",text:"Bikini"},{id:"Pyjamas",text:"Pyjamas"},{id:"Morgonrock",text:"Morgonrock"},{id:"Br\xf6llopskl\xe4nning",text:"Br\xf6llopskl\xe4nning"},{id:"Balkl\xe4nning",text:"Balkl\xe4nning"},{id:"Bodysuit",text:"Bodysuit"},{id:"Underst\xe4ll",text:"Underst\xe4ll"}]},{text:"Ytterkl\xe4der",children:[{id:"Jacka",text:"Jacka"},{id:"Kappa",text:"Kappa"},{id:"Rock",text:"Rock"},{id:"Fritidsjacka",text:"Fritidsjacka"},{id:"Trenchcoat",text:"Trenchcoat"},{id:"Skinnjacka",text:"Skinnjacka"},{id:"Dunjacka",text:"Dunjacka"},{id:"Regnjacka",text:"Regnjacka"},{id:"P\xe4lsjacka",text:"P\xe4lsjacka"}]},{text:"Skor",children:[{id:"Sneakers",text:"Sneakers"},{id:"Sandaler",text:"Sandaler"},{id:"Klackar",text:"Klackar"},{id:"Ballerinaskor",text:"Ballerinaskor"},{id:"Loafers",text:"Loafers"},{id:"Flip-flops",text:"Flip-flops"},{id:"Boots",text:"Boots"},{id:"K\xe4ngor",text:"K\xe4ngor"},{id:"Vinterskor",text:"Vinterskor"},{id:"Skor",text:"Annat (Skor)"}]},{text:"V\xe4skor",children:[{id:"Axelremsv\xe4ska",text:"Axelremsv\xe4ska"},{id:"Handv\xe4ska",text:"Handv\xe4ska"},{id:"Kuvertv\xe4ska",text:"Kuvertv\xe4ska"},{id:"Ryggs\xe4ck",text:"Ryggs\xe4ck"},{id:"Tr\xe4ningsv\xe4ska",text:"Tr\xe4ningsv\xe4ska"},{id:"Resv\xe4ska",text:"Resv\xe4ska"},{id:"Datorv\xe4ska",text:"Datorv\xe4ska"},{id:"V\xe4ska",text:"Annat (V\xe4ska)"}]},{text:"Accessoarer",children:[{id:"Solglas\xf6gon",text:"Solglas\xf6gon"},{id:"Glas\xf6gon",text:"Glas\xf6gon"},{id:"\xd6rh\xe4nge",text:"\xd6rh\xe4nge"},{id:"Halsband",text:"Halsband"},{id:"Armband",text:"Armband"},{id:"Ring",text:"Ring"},{id:"Brosch",text:"Brosch"},{id:"Keps",text:"Keps"},{id:"Sjal",text:"Sjal"},{id:"Krage",text:"Krage"},{id:"B\xe4lte",text:"B\xe4lte"},{id:"Pl\xe5nbok",text:"Pl\xe5nbok"},{id:"Halsduk",text:"Halsduk"},{id:"Hatt",text:"Hatt"},{id:"M\xf6ssa",text:"M\xf6ssa"},{id:"Vantar",text:"Vantar"},{id:"Necess\xe4r",text:"Necess\xe4r"},{id:"Slips",text:"Slips"},{id:"Handduk",text:"Handduk"},{id:"Klocka",text:"Klocka"}]}]}),$("body").on("click",".select2-container--open .select2-results__group",function(){$(this).parent().attr("class").match(/expanded-group/)?$(this).parent().removeClass("expanded-group"):($(".expanded-group").first().removeClass("expanded-group"),$(this).parent().addClass("expanded-group"))});let n=!1;$("#itemCategory").on("select2:select",()=>{analytics.track("Click",{elementID:"itemCategoryValue"}),document.querySelector("#itemCategory").dispatchEvent(new Event("change"))});let a=!1;$("#itemCategory").on("select2:open",()=>{a||(a=!0,$("input.select2-search__field").on("click",()=>{analytics.track("Click",{elementID:"itemCategorySearch"})}))}),$("#itemCategory").on("select2:close",()=>{document.querySelector("body").style.overflow="auto",document.querySelector("body").style.position="static",document.querySelector("html").style.overflow="static"}),$("#itemCategory").on("select2:open",function(){analytics.track("Element Viewed",{elementID:"itemCategoryContainer"}),document.querySelector("body").style.overflow="hidden",document.querySelector("body").style.position="fixed",document.querySelector("html").style.overflow="fixed";let e=document.querySelector(".select2-search__field");if(e.placeholder="S\xf6k... (t.ex. Kl\xe4nning/Sneakers/Blus)",$(".select2-search__field").on("input",e=>{e.target.value.length>0?$(".select2-results__option[role=group]").each((e,t)=>$(t).addClass("expanded-group")):$(".expanded-group").each((e,t)=>$(t).removeClass("expanded-group"))}),!n){let e=document.getElementById("categoryPopUpHeader"),t=document.querySelector(".select2-dropdown");t.insertBefore(e,t.firstChild),e.style.display="block",e.querySelector("#categorySelectClose").onclick=()=>$("#itemCategory").select2("close"),n=!0}document.querySelector(".select2-results__options").addEventListener("scroll",()=>document.activeElement.blur())}),$("#itemCategory").on("change",e=>{S("itemCategoryLabel")(e);let n=document.getElementById("itemCategory"),a=document.getElementById("itemBrand");t(a.value,n.value)}),// From https://github.com/select2/select2/issues/3015#issuecomment-570171720
$("#itemCategory").on("select2:open",function(){$(".select2-results").css("visibility","hidden")}),$("#itemCategory").on("select2:opening",function(){setTimeout(function(){$(".select2-results").css("visibility","visible")},50)})}function S(e){return t=>{document.getElementById(e).style.display=t.target.value.length>0?"inline-block":"none"}}a.defineInteropFlag(n),a.export(n,"uploadTempImage",()=>o),a.export(n,"requestUniqueId",()=>i),a.export(n,"enhanceFrontImage",()=>l),a.export(n,"showDeleteImageIcon",()=>d),a.export(n,"rememberNewItemImageField",()=>c),a.export(n,"showImagePreview",()=>u),a.export(n,"capitalizeFirstLetter",()=>m),a.export(n,"uploadImageAndShowPreview",()=>g),a.export(n,"showImageState",()=>p),a.export(n,"showLoadingIcon",()=>y),a.export(n,"checkBlockedOrLowShareSoldBrand",()=>h),a.export(n,"initializeCategorySelect",()=>I),a.export(n,"fieldLabelToggle",()=>S)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||t.hasOwnProperty(n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}],"6s2CO":[function(e,t,n){let a=e("da1f68cc1fc16077"),o=e("8c6cf49ef2287430"),r=e("8a60cf7722cc14ce"),i=e("f6fcc816b915ba37");function l(e,t,n,r,i){let l=[].slice.call(arguments,1),s=l.length,d="function"==typeof l[s-1];if(!d&&!a())throw Error("Callback required as last argument");if(d){if(s<2)throw Error("Too few arguments provided");2===s?(i=n,n=t,t=r=void 0):3===s&&(t.getContext&&void 0===i?(i=r,r=void 0):(i=r,r=n,n=t,t=void 0))}else{if(s<1)throw Error("Too few arguments provided");return 1===s?(n=t,t=r=void 0):2!==s||t.getContext||(r=n,n=t,t=void 0),new Promise(function(a,i){try{let i=o.create(n,r);a(e(i,t,r))}catch(e){i(e)}})}try{let a=o.create(n,r);i(null,e(a,t,r))}catch(e){i(e)}}n.create=o.create,n.toCanvas=l.bind(null,r.render),n.toDataURL=l.bind(null,r.renderToDataURL),// only svg for now.
n.toString=l.bind(null,function(e,t,n){return i.render(e,n)})},{da1f68cc1fc16077:"2F9VO","8c6cf49ef2287430":"e9qY0","8a60cf7722cc14ce":"i1BDL",f6fcc816b915ba37:"8CcR1"}],"2F9VO":[function(e,t,n){// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
t.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},{}],e9qY0:[function(e,t,n){let a=e("4cf6a8173d9f3a2"),o=e("2ad62f61c352884c"),r=e("87d5a6270eb1dc26"),i=e("91abc94f777368cc"),l=e("9737c3939ab85d95"),s=e("cee3d371e219e45e"),d=e("8700c8c682afabf3"),c=e("65ad903a6ba3e"),u=e("1e8e447afb4d169c"),m=e("8a4a19af97836d80"),g=e("26720f9d94c9e268"),f=e("7b6429a248ecc51f"),p=e("1368d0fa14524351");/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */function y(e,t,n){let a,o;let r=e.size,i=g.getEncodedBits(t,n);for(a=0;a<15;a++)o=(i>>a&1)==1,a<6?e.set(a,8,o,!0):a<8?e.set(a+1,8,o,!0):e.set(r-15+a,8,o,!0),a<8?e.set(8,r-a-1,o,!0):a<9?e.set(8,15-a-1+1,o,!0):e.set(8,15-a-1,o,!0);// fixed module
e.set(r-8,8,1,!0)}/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */n.create=function(e,t){let n,g;if(void 0===e||""===e)throw Error("No input text");let h=o.M;return void 0!==t&&(// Use higher error correction level as default
h=o.from(t.errorCorrectionLevel,o.M),n=m.from(t.version),g=d.from(t.maskPattern),t.toSJISFunc&&a.setToSJISFunction(t.toSJISFunc)),/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */function(e,t,n,o){let g;if(Array.isArray(e))g=p.fromArray(e);else if("string"==typeof e){let a=t;if(!a){let t=p.rawSplit(e);// Estimate best version that can contain raw splitted segments
a=m.getBestVersionForData(t,n)}// Build optimized segments
// If estimated version is undefined, try with the highest version
g=p.fromString(e,a||40)}else throw Error("Invalid data");// Get the min version that can contain data
let h=m.getBestVersionForData(g,n);// If no version is found, data cannot be stored
if(!h)throw Error("The amount of data is too big to be stored in a QR Code");// If not specified, use min version as default
if(t){if(t<h)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+h+".\n")}else t=h;let I=/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */function(e,t,n){// Prepare data buffer
let o=new r;n.forEach(function(t){// prefix data with mode indicator (4 bits)
o.put(t.mode.bit,4),// Prefix data with character count indicator.
// The character count indicator is a string of bits that represents the
// number of characters that are being encoded.
// The character count indicator must be placed after the mode indicator
// and must be a certain number of bits long, depending on the QR version
// and data mode
// @see {@link Mode.getCharCountIndicator}.
o.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),// add binary data sequence to buffer
t.write(o)});// Calculate required number of bits
let i=a.getSymbolTotalCodewords(e),l=c.getTotalCodewordsCount(e,t),s=(i-l)*8;// If the bit string is fewer than four bits shorter, add only the number of 0s that
// are needed to reach the required number of bits.
// After adding the terminator, if the number of bits in the string is not a multiple of 8,
// pad the string on the right with 0s to make the string's length a multiple of 8.
for(o.getLengthInBits()+4<=s&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(0);// Add pad bytes if the string is still shorter than the total number of required bits.
// Extend the buffer to fill the data capacity of the symbol corresponding to
// the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
// and 00010001 (0x11) alternately.
let d=(s-o.getLengthInBits())/8;for(let e=0;e<d;e++)o.put(e%2?17:236,8);return(/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */function(e,t,n){let o,r;// Total codewords for this QR code version (Data + Error correction)
let i=a.getSymbolTotalCodewords(t),l=c.getTotalCodewordsCount(t,n),s=i-l,d=c.getBlocksCount(t,n),m=i%d,g=d-m,f=Math.floor(i/d),p=Math.floor(s/d),y=p+1,h=f-p,I=new u(h),S=0,v=Array(d),b=Array(d),B=0,x=new Uint8Array(e.buffer);// Divide the buffer into the required number of blocks
for(let e=0;e<d;e++){let t=e<g?p:y;// extract a block of data from buffer
v[e]=x.slice(S,S+t),// Calculate EC codewords for this data block
b[e]=I.encode(v[e]),S+=t,B=Math.max(B,t)}// Create final data
// Interleave the data and error correction codewords from each block
let E=new Uint8Array(i),k=0;// Add data codewords
for(o=0;o<B;o++)for(r=0;r<d;r++)o<v[r].length&&(E[k++]=v[r][o]);// Apped EC codewords
for(o=0;o<h;o++)for(r=0;r<d;r++)E[k++]=b[r][o];return E}(o,e,t))}(t,n,g),S=a.getSymbolSize(t),v=new i(S);return(// Add function modules
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
 */function(e,t){let n=e.size,a=s.getPositions(t);for(let t=0;t<a.length;t++){let o=a[t][0],r=a[t][1];for(let t=-1;t<=7;t++)if(!(o+t<=-1)&&!(n<=o+t))for(let a=-1;a<=7;a++)r+a<=-1||n<=r+a||(t>=0&&t<=6&&(0===a||6===a)||a>=0&&a<=6&&(0===t||6===t)||t>=2&&t<=4&&a>=2&&a<=4?e.set(o+t,r+a,!0,!0):e.set(o+t,r+a,!1,!0))}}(v,t),/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */function(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}(v),/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(e,t){let n=l.getPositions(t);for(let t=0;t<n.length;t++){let a=n[t][0],o=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)-2===t||2===t||-2===n||2===n||0===t&&0===n?e.set(a+t,o+n,!0,!0):e.set(a+t,o+n,!1,!0)}}(v,t),// Add temporary dummy bits for format info just to set them as reserved.
// This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
// since the masking operation must be performed only on the encoding region.
// These blocks will be replaced with correct values later in code.
y(v,n,0),t>=7&&/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(e,t){let n,a,o;let r=e.size,i=m.getEncodedBits(t);for(let t=0;t<18;t++)n=Math.floor(t/3),a=t%3+r-8-3,o=(i>>t&1)==1,e.set(n,a,o,!0),e.set(a,n,o,!0)}(v,t),// Add data codewords
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */function(e,t){let n=e.size,a=-1,o=n-1,r=7,i=0;for(let l=n-1;l>0;l-=2)for(6===l&&l--;;){for(let n=0;n<2;n++)if(!e.isReserved(o,l-n)){let a=!1;i<t.length&&(a=(t[i]>>>r&1)==1),e.set(o,l-n,a),-1==--r&&(i++,r=7)}if((o+=a)<0||n<=o){o-=a,a=-a;break}}}(v,I),isNaN(o)&&(o=d.getBestMask(v,y.bind(null,v,n))),// Apply mask pattern
d.applyMask(o,v),// Replace format info bits with correct values
y(v,n,o),{modules:v,version:t,errorCorrectionLevel:n,maskPattern:o,segments:g})}(e,n,h,g)}},{"4cf6a8173d9f3a2":"2iHLf","2ad62f61c352884c":"kU8Fo","87d5a6270eb1dc26":"dvmjt","91abc94f777368cc":"4koKB","9737c3939ab85d95":"2m37T",cee3d371e219e45e:"9BWaM","8700c8c682afabf3":"2hy8U","65ad903a6ba3e":"ivpAq","1e8e447afb4d169c":"ixGQe","8a4a19af97836d80":"61NkN","26720f9d94c9e268":"4DCia","7b6429a248ecc51f":"2XDDf","1368d0fa14524351":"kBoY1"}],"2iHLf":[function(e,t,n){let a;let o=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */n.getSymbolSize=function(e){if(!e)throw Error('"version" cannot be null or undefined');if(e<1||e>40)throw Error('"version" should be in range from 1 to 40');return 4*e+17},/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */n.getSymbolTotalCodewords=function(e){return o[e]},/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */n.getBCHDigit=function(e){let t=0;for(;0!==e;)t++,e>>>=1;return t},n.setToSJISFunction=function(e){if("function"!=typeof e)throw Error('"toSJISFunc" is not a valid function.');a=e},n.isKanjiModeEnabled=function(){return void 0!==a},n.toSJIS=function(e){return a(e)}},{}],kU8Fo:[function(e,t,n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2},n.isValid=function(e){return e&&void 0!==e.bit&&e.bit>=0&&e.bit<4},n.from=function(e,t){if(n.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw Error("Param is not a string");let t=e.toLowerCase();switch(t){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw Error("Unknown EC Level: "+e)}}(e)}catch(e){return t}}},{}],dvmjt:[function(e,t,n){function a(){this.buffer=[],this.length=0}a.prototype={get:function(e){return(this.buffer[Math.floor(e/8)]>>>7-e%8&1)==1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},t.exports=a},{}],"4koKB":[function(e,t,n){/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */function a(e){if(!e||e<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */a.prototype.set=function(e,t,n,a){let o=e*this.size+t;this.data[o]=n,a&&(this.reservedBit[o]=!0)},/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */a.prototype.get=function(e,t){return this.data[e*this.size+t]},/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */a.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */a.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},t.exports=a},{}],"2m37T":[function(e,t,n){/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */let a=e("3fa093180e62a22a").getSymbolSize;/**
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
 */n.getRowColCoords=function(e){if(1===e)return[];let t=Math.floor(e/7)+2,n=a(e),o=145===n?26:2*Math.ceil((n-13)/(2*t-2)),r=[n-7]// Last coord is always (size - 7)
;for(let e=1;e<t-1;e++)r[e]=r[e-1]-o;return r.push(6)// First coord is always 6
,r.reverse()},/**
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
 */n.getPositions=function(e){let t=[],a=n.getRowColCoords(e),o=a.length;for(let e=0;e<o;e++)for(let n=0;n<o;n++)// Skip if position is occupied by finder patterns
(0!==e||0!==n)&&// top-left
(0!==e||n!==o-1)&&// bottom-left
(e!==o-1||0!==n)&&t.push([a[e],a[n]]);return t}},{"3fa093180e62a22a":"2iHLf"}],"9BWaM":[function(e,t,n){let a=e("6ec9ae5660047293").getSymbolSize;/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */n.getPositions=function(e){let t=a(e);return[// top-left
[0,0],// top-right
[t-7,0],// bottom-left
[0,t-7]]}},{"6ec9ae5660047293":"2iHLf"}],"2hy8U":[function(e,t,n){/**
 * Data mask pattern reference
 * @type {Object}
 */n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */let a={N1:3,N2:3,N3:40,N4:10};/**
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
*/n.getPenaltyN1=function(e){let t=e.size,n=0,o=0,r=0,i=null,l=null;for(let s=0;s<t;s++){o=r=0,i=l=null;for(let d=0;d<t;d++){let t=e.get(s,d);t===i?o++:(o>=5&&(n+=a.N1+(o-5)),i=t,o=1),(t=e.get(d,s))===l?r++:(r>=5&&(n+=a.N1+(r-5)),l=t,r=1)}o>=5&&(n+=a.N1+(o-5)),r>=5&&(n+=a.N1+(r-5))}return n},/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */n.getPenaltyN2=function(e){let t=e.size,n=0;for(let a=0;a<t-1;a++)for(let o=0;o<t-1;o++){let t=e.get(a,o)+e.get(a,o+1)+e.get(a+1,o)+e.get(a+1,o+1);(4===t||0===t)&&n++}return n*a.N2},/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */n.getPenaltyN3=function(e){let t=e.size,n=0,o=0,r=0;for(let a=0;a<t;a++){o=r=0;for(let i=0;i<t;i++)o=o<<1&2047|e.get(a,i),i>=10&&(1488===o||93===o)&&n++,r=r<<1&2047|e.get(i,a),i>=10&&(1488===r||93===r)&&n++}return n*a.N3},/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */n.getPenaltyN4=function(e){let t=0,n=e.data.length;for(let a=0;a<n;a++)t+=e.data[a];let o=Math.abs(Math.ceil(100*t/n/5)-10);return o*a.N4},/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */n.applyMask=function(e,t){let a=t.size;for(let o=0;o<a;o++)for(let r=0;r<a;r++)t.isReserved(r,o)||t.xor(r,o,/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */function(e,t,a){switch(e){case n.Patterns.PATTERN000:return(t+a)%2==0;case n.Patterns.PATTERN001:return t%2==0;case n.Patterns.PATTERN010:return a%3==0;case n.Patterns.PATTERN011:return(t+a)%3==0;case n.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(a/3))%2==0;case n.Patterns.PATTERN101:return t*a%2+t*a%3==0;case n.Patterns.PATTERN110:return(t*a%2+t*a%3)%2==0;case n.Patterns.PATTERN111:return(t*a%3+(t+a)%2)%2==0;default:throw Error("bad maskPattern:"+e)}}(e,r,o))},/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */n.getBestMask=function(e,t){let a=Object.keys(n.Patterns).length,o=0,r=1/0;for(let i=0;i<a;i++){t(i),n.applyMask(i,e);// Calculate penalty
let a=n.getPenaltyN1(e)+n.getPenaltyN2(e)+n.getPenaltyN3(e)+n.getPenaltyN4(e);// Undo previously applied mask
n.applyMask(i,e),a<r&&(r=a,o=i)}return o}},{}],ivpAq:[function(e,t,n){let a=e("7baaa530584d1bc4"),o=[// L  M  Q  H
1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[// L  M  Q  H
7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */n.getBlocksCount=function(e,t){switch(t){case a.L:return o[(e-1)*4+0];case a.M:return o[(e-1)*4+1];case a.Q:return o[(e-1)*4+2];case a.H:return o[(e-1)*4+3];default:return}},/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */n.getTotalCodewordsCount=function(e,t){switch(t){case a.L:return r[(e-1)*4+0];case a.M:return r[(e-1)*4+1];case a.Q:return r[(e-1)*4+2];case a.H:return r[(e-1)*4+3];default:return}}},{"7baaa530584d1bc4":"kU8Fo"}],ixGQe:[function(e,t,n){let a=e("742a7ee6d6a2d145");function o(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */o.prototype.initialize=function(e){// create an irreducible generator polynomial
this.degree=e,this.genPoly=a.generateECPolynomial(this.degree)},/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */o.prototype.encode=function(e){if(!this.genPoly)throw Error("Encoder not initialized");// Calculate EC for this data block
// extends data size to data+genPoly size
let t=new Uint8Array(e.length+this.degree);t.set(e);// The error correction codewords are the remainder after dividing the data codewords
// by a generator polynomial
let n=a.mod(t,this.genPoly),o=this.degree-n.length;if(o>0){let e=new Uint8Array(this.degree);return e.set(n,o),e}return n},t.exports=o},{"742a7ee6d6a2d145":"bFrZA"}],bFrZA:[function(e,t,n){let a=e("780c74029318268c");/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */n.mul=function(e,t){let n=new Uint8Array(e.length+t.length-1);for(let o=0;o<e.length;o++)for(let r=0;r<t.length;r++)n[o+r]^=a.mul(e[o],t[r]);return n},/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */n.mod=function(e,t){let n=new Uint8Array(e);for(;n.length-t.length>=0;){let e=n[0];for(let o=0;o<t.length;o++)n[o]^=a.mul(t[o],e);// remove all zeros from buffer head
let o=0;for(;o<n.length&&0===n[o];)o++;n=n.slice(o)}return n},/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */n.generateECPolynomial=function(e){let t=new Uint8Array([1]);for(let o=0;o<e;o++)t=n.mul(t,new Uint8Array([1,a.exp(o)]));return t}},{"780c74029318268c":"3WlDl"}],"3WlDl":[function(e,t,n){let a=new Uint8Array(512),o=new Uint8Array(256)/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */;!function(){let e=1;for(let t=0;t<255;t++)a[t]=e,o[e]=t,256&(e<<=1// multiply by 2
)&&(e^=285);// Optimization: double the size of the anti-log table so that we don't need to mod 255 to
// stay inside the bounds (because we will mainly use this table for the multiplication of
// two GF numbers, no more).
// @see {@link mul}
for(let e=255;e<512;e++)a[e]=a[e-255]}(),/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.log=function(e){if(e<1)throw Error("log("+e+")");return o[e]},/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.exp=function(e){return a[e]},/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */n.mul=function(e,t){return 0===e||0===t?0:a[o[e]+o[t]]}},{}],"61NkN":[function(e,t,n){let a=e("f67b02cdf61cb7c6"),o=e("777da0d92c463f2e"),r=e("acd5b4fcd696edf3"),i=e("5303c314c4a688d7"),l=e("663d0e03da8b2897"),s=a.getBCHDigit(7973);function d(e,t){// Character count indicator + mode indicator bits
return i.getCharCountIndicator(e,t)+4}/**
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
void 0===n&&(n=i.BYTE);// Total codewords for this QR code version (Data + Error correction)
let r=a.getSymbolTotalCodewords(e),s=o.getTotalCodewordsCount(e,t),c=(r-s)*8;if(n===i.MIXED)return c;let u=c-d(n,e);// Return max number of storable codewords
switch(n){case i.NUMERIC:return Math.floor(u/10*3);case i.ALPHANUMERIC:return Math.floor(u/11*2);case i.KANJI:return Math.floor(u/13);case i.BYTE:default:return Math.floor(u/8)}},/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */n.getBestVersionForData=function(e,t){let a;let o=r.from(t,r.M);if(Array.isArray(e)){if(e.length>1)return function(e,t){for(let a=1;a<=40;a++){let o=function(e,t){let n=0;return e.forEach(function(e){let a=d(e.mode,t);n+=a+e.getBitsLength()}),n}(e,a);if(o<=n.getCapacity(a,t,i.MIXED))return a}}(e,o);if(0===e.length)return 1;a=e[0]}else a=e;return function(e,t,a){for(let o=1;o<=40;o++)if(t<=n.getCapacity(o,a,e))return o}(a.mode,a.getLength(),o)},/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */n.getEncodedBits=function(e){if(!l.isValid(e)||e<7)throw Error("Invalid QR Code version");let t=e<<12;for(;a.getBCHDigit(t)-s>=0;)t^=7973<<a.getBCHDigit(t)-s;return e<<12|t}},{f67b02cdf61cb7c6:"2iHLf","777da0d92c463f2e":"ivpAq",acd5b4fcd696edf3:"kU8Fo","5303c314c4a688d7":"2XDDf","663d0e03da8b2897":"dFhhu"}],"2XDDf":[function(e,t,n){let a=e("488660fac9162579"),o=e("a23fd227d32f3622");/**
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
 */n.getCharCountIndicator=function(e,t){if(!e.ccBits)throw Error("Invalid mode: "+e);if(!a.isValid(t))throw Error("Invalid version: "+t);return t>=1&&t<10?e.ccBits[0]:t<27?e.ccBits[1]:e.ccBits[2]},/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */n.getBestModeForData=function(e){return o.testNumeric(e)?n.NUMERIC:o.testAlphanumeric(e)?n.ALPHANUMERIC:o.testKanji(e)?n.KANJI:n.BYTE},/**
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
 */n.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}},{}],fkiQV:[function(e,t,n){let a="[0-9]+",o="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";o=o.replace(/u/g,"\\u");let r="(?:(?![A-Z0-9 $%*+\\-./:]|"+o+")(?:.|[\r\n]))+";n.KANJI=RegExp(o,"g"),n.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),n.BYTE=RegExp(r,"g"),n.NUMERIC=RegExp(a,"g"),n.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let i=RegExp("^"+o+"$"),l=RegExp("^"+a+"$"),s=RegExp("^[A-Z0-9 $%*+\\-./:]+$");n.testKanji=function(e){return i.test(e)},n.testNumeric=function(e){return l.test(e)},n.testAlphanumeric=function(e){return s.test(e)}},{}],"4DCia":[function(e,t,n){let a=e("eeca831a42e85d6c"),o=a.getBCHDigit(1335);/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */n.getEncodedBits=function(e,t){let n=e.bit<<3|t,r=n<<10;for(;a.getBCHDigit(r)-o>=0;)r^=1335<<a.getBCHDigit(r)-o;// xor final data with mask pattern in order to ensure that
// no combination of Error Correction Level and data mask pattern
// will result in an all-zero data string
return(n<<10|r)^21522}},{eeca831a42e85d6c:"2iHLf"}],kBoY1:[function(e,t,n){let a=e("45f6d4bff9d2fc72"),o=e("73109cbf4f3c309d"),r=e("5320016e34c30467"),i=e("fd16f8f25b581951"),l=e("8a7b84039f1cf0d2"),s=e("79379a3a8f3c26bb"),d=e("66903ca51bd2ea1d"),c=e("3b9f47d541e7d71f");/**
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
 */function m(e,t,n){let a;let o=[];for(;null!==(a=e.exec(n));)o.push({data:a[0],index:a.index,mode:t,length:a[0].length});return o}/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */function g(e){let t,n;let o=m(s.NUMERIC,a.NUMERIC,e),r=m(s.ALPHANUMERIC,a.ALPHANUMERIC,e);d.isKanjiModeEnabled()?(t=m(s.BYTE,a.BYTE,e),n=m(s.KANJI,a.KANJI,e)):(t=m(s.BYTE_KANJI,a.BYTE,e),n=[]);let i=o.concat(r,t,n);return i.sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */function f(e,t){switch(t){case a.NUMERIC:return o.getBitsLength(e);case a.ALPHANUMERIC:return r.getBitsLength(e);case a.KANJI:return l.getBitsLength(e);case a.BYTE:return i.getBitsLength(e)}}/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */function p(e,t){let n;let s=a.getBestModeForData(e);// Make sure data can be encoded
if((n=a.from(t,s))!==a.BYTE&&n.bit<s.bit)throw Error('"'+e+'" cannot be encoded with mode '+a.toString(n)+".\n Suggested mode is: "+a.toString(s));switch(n!==a.KANJI||d.isKanjiModeEnabled()||(n=a.BYTE),n){case a.NUMERIC:return new o(e);case a.ALPHANUMERIC:return new r(e);case a.KANJI:return new l(e);case a.BYTE:return new i(e)}}/**
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
 */n.fromString=function(e,t){let o=g(e,d.isKanjiModeEnabled()),r=/**
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
 */function(e){let t=[];for(let n=0;n<e.length;n++){let o=e[n];switch(o.mode){case a.NUMERIC:t.push([o,{data:o.data,mode:a.ALPHANUMERIC,length:o.length},{data:o.data,mode:a.BYTE,length:o.length}]);break;case a.ALPHANUMERIC:t.push([o,{data:o.data,mode:a.BYTE,length:o.length}]);break;case a.KANJI:t.push([o,{data:o.data,mode:a.BYTE,length:u(o.data)}]);break;case a.BYTE:t.push([{data:o.data,mode:a.BYTE,length:u(o.data)}])}}return t}(o),i=/**
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
 */function(e,t){let n={},o={start:{}},r=["start"];for(let i=0;i<e.length;i++){let l=e[i],s=[];for(let e=0;e<l.length;e++){let d=l[e],c=""+i+e;s.push(c),n[c]={node:d,lastCount:0},o[c]={};for(let e=0;e<r.length;e++){let i=r[e];n[i]&&n[i].node.mode===d.mode?(o[i][c]=f(n[i].lastCount+d.length,d.mode)-f(n[i].lastCount,d.mode),n[i].lastCount+=d.length):(n[i]&&(n[i].lastCount=d.length),o[i][c]=f(d.length,d.mode)+4+a.getCharCountIndicator(d.mode,t)// switch cost
)}}r=s}for(let e=0;e<r.length;e++)o[r[e]].end=0;return{map:o,table:n}}(r,t),l=c.find_path(i.map,"start","end"),s=[];for(let e=1;e<l.length-1;e++)s.push(i.table[l[e]].node);return n.fromArray(s.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?e[e.length-1].data+=t.data:e.push(t),e},[]))},/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */n.rawSplit=function(e){return n.fromArray(g(e,d.isKanjiModeEnabled()))}},{"45f6d4bff9d2fc72":"2XDDf","73109cbf4f3c309d":"hTs8T","5320016e34c30467":"203uh",fd16f8f25b581951:"f7sIe","8a7b84039f1cf0d2":"1otz8","79379a3a8f3c26bb":"fkiQV","66903ca51bd2ea1d":"2iHLf","3b9f47d541e7d71f":"2Nh6w"}],hTs8T:[function(e,t,n){let a=e("29134b0b0820b091");function o(e){this.mode=a.NUMERIC,this.data=e.toString()}o.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(e){let t,n;// The input data string is divided into groups of three digits,
// and each group is converted to its 10-bit binary equivalent.
for(t=0;t+3<=this.data.length;t+=3)n=parseInt(this.data.substr(t,3),10),e.put(n,10);// If the number of input digits is not an exact multiple of three,
// the final one or two digits are converted to 4 or 7 bits respectively.
let a=this.data.length-t;a>0&&(n=parseInt(this.data.substr(t),10),e.put(n,3*a+1))},t.exports=o},{"29134b0b0820b091":"2XDDf"}],"203uh":[function(e,t,n){let a=e("9c7c9b869570f846"),o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function r(e){this.mode=a.ALPHANUMERIC,this.data=e}r.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let t;// Input data characters are divided into groups of two characters
// and encoded as 11-bit binary codes.
for(t=0;t+2<=this.data.length;t+=2){// The character value of the first character is multiplied by 45
let n=45*o.indexOf(this.data[t]);// The character value of the second digit is added to the product
n+=o.indexOf(this.data[t+1]),// The sum is then stored as 11-bit binary number
e.put(n,11)}// If the number of input data characters is not a multiple of two,
// the character value of the final character is encoded as a 6-bit binary number.
this.data.length%2&&e.put(o.indexOf(this.data[t]),6)},t.exports=r},{"9c7c9b869570f846":"2XDDf"}],f7sIe:[function(e,t,n){let a=e("1658cb836325c397"),o=e("a20a51f6cd184253");function r(e){this.mode=o.BYTE,"string"==typeof e&&(e=a(e)),this.data=new Uint8Array(e)}r.getBitsLength=function(e){return 8*e},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},t.exports=r},{"1658cb836325c397":"lmLJ0",a20a51f6cd184253:"2XDDf"}],lmLJ0:[function(e,t,n){t.exports=function(e){for(var t=[],n=e.length,a=0;a<n;a++){var o=e.charCodeAt(a);if(o>=55296&&o<=56319&&n>a+1){var r=e.charCodeAt(a+1);r>=56320&&r<=57343&&(// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
o=(o-55296)*1024+r-56320+65536,a+=1)}// US-ASCII
if(o<128){t.push(o);continue}// 2-byte UTF-8
if(o<2048){t.push(o>>6|192),t.push(63&o|128);continue}// 3-byte UTF-8
if(o<55296||o>=57344&&o<65536){t.push(o>>12|224),t.push(o>>6&63|128),t.push(63&o|128);continue}// 4-byte UTF-8
if(o>=65536&&o<=1114111){t.push(o>>18|240),t.push(o>>12&63|128),t.push(o>>6&63|128),t.push(63&o|128);continue}// Invalid character
t.push(239,191,189)}return new Uint8Array(t).buffer}},{}],"1otz8":[function(e,t,n){let a=e("b935cfd1cd03a1f6"),o=e("ca4944585cc8d12d");function r(e){this.mode=a.KANJI,this.data=e}r.getBitsLength=function(e){return 13*e},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let t;// In the Shift JIS system, Kanji characters are represented by a two byte combination.
// These byte values are shifted from the JIS X 0208 values.
// JIS X 0208 gives details of the shift coded representation.
for(t=0;t<this.data.length;t++){let n=o.toSJIS(this.data[t]);// For characters with Shift JIS values from 0x8140 to 0x9FFC:
if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error("Invalid SJIS character: "+this.data[t]+"\nMake sure your charset is UTF-8");// Multiply most significant byte of result by 0xC0
// and add least significant byte to product
n=(n>>>8&255)*192+(255&n),// Convert result to a 13-bit binary string
e.put(n,13)}},t.exports=r},{b935cfd1cd03a1f6:"2XDDf",ca4944585cc8d12d:"2iHLf"}],"2Nh6w":[function(e,t,n){/******************************************************************************
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
 *****************************************************************************/var a={single_source_shortest_paths:function(e,t,n){// Predecessor map for each node that has been encountered.
// node ID => predecessor node ID
var o,r,i,l,s,d,c,u={},m={};m[t]=0;// Costs of shortest paths from s to all nodes encountered; differs from
// `costs` in that it provides easy access to the node that currently has
// the known shortest path from s.
// XXX: Do we actually need both `costs` and `open`?
var g=a.PriorityQueue.make();for(g.push(t,0);!g.empty();)// ...and explore the edges that connect u to those nodes, updating
// the cost of the shortest paths to any or all of those nodes as
// necessary. v is the node across the current edge from u.
for(i in r=// In the nodes remaining in graph that have a known cost from s,
// find the node, u, that currently has the shortest path from s.
(o=g.pop()).value,l=o.cost,// Get nodes adjacent to u...
s=e[r]||{})s.hasOwnProperty(i)&&(// Cost of s to u plus the cost of u to v across e--this is *a*
// cost from s to v that may or may not be less than the current
// known cost to v.
d=l+s[i],// If we haven't visited v yet OR if the current known cost from s to
// v is greater than the new cost we just found (cost of s to u plus
// cost of u to v across e), update v's cost in the cost list and
// update v's predecessor in the predecessor list (it's now u).
c=m[i],(void 0===m[i]||c>d)&&(m[i]=d,g.push(i,d),u[i]=r));if(void 0!==n&&void 0===m[n])throw Error(["Could not find a path from ",t," to ",n,"."].join(""));return u},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],a=t;a;)n.push(a),e[a],a=e[a];return n.reverse(),n},find_path:function(e,t,n){var o=a.single_source_shortest_paths(e,t,n);return a.extract_shortest_path_from_predecessor_list(o,n)},/**
   * A very naive priority queue implementation.
   */PriorityQueue:{make:function(e){var t,n=a.PriorityQueue,o={};for(t in e=e||{},n)n.hasOwnProperty(t)&&(o[t]=n[t]);return o.queue=[],o.sorter=e.sorter||n.default_sorter,o},default_sorter:function(e,t){return e.cost-t.cost},/**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */push:function(e,t){this.queue.push({value:e,cost:t}),this.queue.sort(this.sorter)},/**
     * Return the highest priority element in the queue.
     */pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=a},{}],i1BDL:[function(e,t,n){let a=e("5b3f7c513802d6c7");n.render=function(e,t,n){var o;let r=n,i=t;void 0!==r||t&&t.getContext||(r=t,t=void 0),t||(i=function(){try{return document.createElement("canvas")}catch(e){throw Error("You need to specify a canvas element")}}()),r=a.getOptions(r);let l=a.getImageWidth(e.modules.size,r),s=i.getContext("2d"),d=s.createImageData(l,l);return a.qrToImageData(d.data,e,r),o=i,s.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=l,o.width=l,o.style.height=l+"px",o.style.width=l+"px",s.putImageData(d,0,0),i},n.renderToDataURL=function(e,t,a){let o=a;void 0!==o||t&&t.getContext||(o=t,t=void 0),o||(o={});let r=n.render(e,t,o),i=o.type||"image/png",l=o.rendererOpts||{};return r.toDataURL(i,l.quality)}},{"5b3f7c513802d6c7":"3YBlJ"}],"3YBlJ":[function(e,t,n){function a(e){if("number"==typeof e&&(e=e.toString()),"string"!=typeof e)throw Error("Color should be defined as hex string");let t=e.slice().replace("#","").split("");if(t.length<3||5===t.length||t.length>8)throw Error("Invalid hex color: "+e);(3===t.length||4===t.length)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),6===t.length&&t.push("F","F");let n=parseInt(t.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:255&n,hex:"#"+t.slice(0,6).join("")}}n.getOptions=function(e){e||(e={}),e.color||(e.color={});let t=void 0===e.margin||null===e.margin||e.margin<0?4:e.margin,n=e.width&&e.width>=21?e.width:void 0,o=e.scale||4;return{width:n,scale:n?4:o,margin:t,color:{dark:a(e.color.dark||"#000000ff"),light:a(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}},n.getScale=function(e,t){return t.width&&t.width>=e+2*t.margin?t.width/(e+2*t.margin):t.scale},n.getImageWidth=function(e,t){let a=n.getScale(e,t);return Math.floor((e+2*t.margin)*a)},n.qrToImageData=function(e,t,a){let o=t.modules.size,r=t.modules.data,i=n.getScale(o,a),l=Math.floor((o+2*a.margin)*i),s=a.margin*i,d=[a.color.light,a.color.dark];for(let t=0;t<l;t++)for(let n=0;n<l;n++){let c=(t*l+n)*4,u=a.color.light;if(t>=s&&n>=s&&t<l-s&&n<l-s){let e=Math.floor((t-s)/i),a=Math.floor((n-s)/i);u=d[r[e*o+a]?1:0]}e[c++]=u.r,e[c++]=u.g,e[c++]=u.b,e[c]=u.a}}},{}],"8CcR1":[function(e,t,n){let a=e("c36bbcf663291acc");function o(e,t){let n=e.a/255,a=t+'="'+e.hex+'"';return n<1?a+" "+t+'-opacity="'+n.toFixed(2).slice(1)+'"':a}function r(e,t,n){let a=e+t;return void 0!==n&&(a+=" "+n),a}n.render=function(e,t,n){let i=a.getOptions(t),l=e.modules.size,s=e.modules.data,d=l+2*i.margin,c=i.color.light.a?"<path "+o(i.color.light,"fill")+' d="M0 0h'+d+"v"+d+'H0z"/>':"",u="<path "+o(i.color.dark,"stroke")+' d="'+function(e,t,n){let a="",o=0,i=!1,l=0;for(let s=0;s<e.length;s++){let d=Math.floor(s%t),c=Math.floor(s/t);d||i||(i=!0),e[s]?(l++,s>0&&d>0&&e[s-1]||(a+=i?r("M",d+n,.5+c+n):r("m",o,0),o=0,i=!1),d+1<t&&e[s+1]||(a+=r("h",l),l=0)):o++}return a}(s,l,i.margin)+'"/>',m=i.width?'width="'+i.width+'" height="'+i.width+'" ':"",g='<svg xmlns="http://www.w3.org/2000/svg" '+m+('viewBox="0 0 '+d)+" "+d+'" shape-rendering="crispEdges">'+c+u+"</svg>\n";return"function"==typeof n&&n(null,g),g}},{c36bbcf663291acc:"3YBlJ"}],"1tOWF":[function(e,t,n){var a=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function r(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function i(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,a=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,r=document.getElementById("addressCity").value,i=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",a=a?a.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:a,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",addressDoorCode:i=i?i.trim():""}}function l(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function s(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function d(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function c(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}a.defineInteropFlag(n),a.export(n,"signOut",()=>o),a.export(n,"setFormAddressFields",()=>r),a.export(n,"getFormAddressFields",()=>i),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
a.export(n,"isValidSwedishSsn",()=>l),a.export(n,"formatPersonalId",()=>s),a.export(n,"itemCoverImage",()=>d),a.export(n,"shareCode",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],ljI8R:[function(e,t,n){var a=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(e,t){/*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/var n;function a(e){/*a function to classify an item as "active":*/if(!e)return!1;/*start by removing the "active" class on all items:*/(function(e){/*a function to remove the "active" class from all autocomplete items:*/for(var t=0;t<e.length;t++)e[t].classList.remove("autocomplete-active")})(e),n>=e.length&&(n=0),n<0&&(n=e.length-1),/*add class "autocomplete-active":*/e[n].classList.add("autocomplete-active")}function o(t){for(var n=document.getElementsByClassName("autocomplete-items"),a=0;a<n.length;a++)t!=n[a]&&t!=e&&n[a].parentNode.removeChild(n[a])}/*execute a function when someone writes in the text field:*/e.addEventListener("input",function(a){var r,i,l,s=this.value;if(/*close any already open lists of autocompleted values*/o(),!s)return!1;/*for each item in the array...*/for(n=-1,/*create a DIV element that will contain the items (values):*/(r=document.createElement("DIV")).setAttribute("id",this.id+"autocomplete-list"),r.setAttribute("class","autocomplete-items"),/*append the DIV element as a child of the autocomplete container:*/this.parentNode.appendChild(r),l=0;l<t.length;l++)/*check if the item starts with the same letters as the text field value:*/t[l].substr(0,s.length).toUpperCase()==s.toUpperCase()&&(/*make the matching letters bold:*//*create a DIV element for each matching element:*/(i=document.createElement("DIV")).innerHTML="<strong>"+t[l].substr(0,s.length)+"</strong>",i.innerHTML+=t[l].substr(s.length),/*insert a input field that will hold the current array item's value:*/i.innerHTML+="<input type='hidden' value='"+t[l]+"'>",/*execute a function when someone clicks on the item value (DIV element):*/i.addEventListener("click",function(t){/*insert the value for the autocomplete text field:*/e.value=this.getElementsByTagName("input")[0].value,e.dispatchEvent(new Event("input")),e.dispatchEvent(new Event("blur")),"Levi"===e.value&&(e.value="Levi's",console.log('this.getElementsByTagName("input")[0].value',this.getElementsByTagName("input")[0].value),console.log('this.getElementsByTagName("input")',this.getElementsByTagName("input"))),/*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/o()}),r.appendChild(i));r.innerHTML||o()}),/*execute a function presses a key on the keyboard:*/e.addEventListener("keydown",function(e){var t=document.getElementById(this.id+"autocomplete-list");t&&(t=t.getElementsByTagName("div")),40==e.keyCode?(/*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/n++,/*and and make the current item more visible:*/a(t)):38==e.keyCode?(/*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/n--,/*and and make the current item more visible:*/a(t)):13==e.keyCode&&(/*If the ENTER key is pressed, prevent the form from being submitted,*/e.preventDefault(),n>-1&&t&&t[n].click())}),// TOBIAS ADDED
/*execute a function when bluring the input field:*/e.addEventListener("blur",function(e){setTimeout(function(){o()},50)}),/*execute a function when someone clicks in the document:*/document.addEventListener("click",function(e){o(e.target)})}a.defineInteropFlag(n),a.export(n,"autocomplete",()=>o),a.export(n,"brands",()=>r);let r=["& Other Stories","2nd Day","3.1 Phillip Lim","5 Preview","7 For All Mankind","A Day's March","A Nordin","A Pair","A part of the art","A-COLD-WALL","A-view","A. Christensen","Abercrombie & Fitch","Abercrombie Fitch","Acne Studios","Adanola","ADER error","Adidas","Adieu","Adnym Atelier","Adolfo Dominguez","Adoore","Adrianna Papell","Adventure boots","Aelfric eden","A\xe9ryne","AGN\xc8S B.","AGN\xc8S DE VERNEUIL","Agolde","AHLVAR GALLERY","Aim\xe9 Leon Dore","Ala\xefa","Alain Mikli","Alan Crocetti","Alan Paine","Alberto guardiani","Alberville","Alden","Alessandrini","Alexa Chung","Alexander McQueen","Alexander Wang","Alice & Olivia","All Blues","All Saints","All saints","Allen Edmonds","Allude","Almost famous","Alohas","Alpha Industries","Altuzarra","Amaort","Ambre","Ambre Babzoe","Ambush","American Apparel","American Eagle Outfitters","American Retro","American Vintage","AMI","AMIRI","Ammann","Amust","Anatomic Co","Andrea Fenzi","Anerkjendt","Angel infantes","Angulus","Anine Bing","Ann Demeulemeester","Ann Taylor","Anna","Anna Field","Anna Holtblad","Anni Lu","Anti Social Social Club","Anton Heunis","Antony Morato","APC","APC","Apepazza","AQAQ","Ara","Arbesko","Arc'Teryx","Arcopedico","Area forte","Aries","Arket","Armani","Armani Exchange","Armani jeans","Art kids","Ash","Asics","Asket","Asos","Aspesi","Astrid Andersen","Atmosphere","ATP Atelier","ATP Atelier","Audley","Australian luxe","AVAVAV","Avon Celli","Awake NY","AX Paris","Axel Arigato","Azzaro","Azzezo","B Store","B.Young","ba&sh","Babolat","Babycham","Back","Badgley mischka","Baffin","Bagutta","Baldessarini","Balenciaga","Ballerina closet","Bally","Balmain","Banana Republic","BAPE","Barbour","Bardot","Barena","Barker","BARRAG\xc1N","Barund CPH","Base London","Batistini","Baum und Pferdgarten","Bcbg Max Azria","Bebe","Beck Sonder Gaard","Becks\xf6ndergaard","Bel Air","Belle by Sigerson Morrison","Belmondo","Belstaff","Ben Sherman","Benetton","Bensimon","Bergans of Norway","Bergstein","Bershka","Bertoni","Betty Blue","Betula","Bianca Chand\xf4n","Bianco","Bik Bok","Bikkembergs","Billabong","Billi Bi","Billionaire Boys Club","Bimba y Lola","Birgitte Herskind","Birkenstock","Bisgaard","Bitte Kai Rand","Biviel","BJORN BORG","Bj\xf6rg","Bj\xf6rn Borg","Black Lily","Black Secret","Black Venus","Blackstone","Blankens","Blauer","Blend","Blink","Blk Dnm","Bloch","Blonde No.8","Blowfish","Bluebella","Blundstone","Bl\xe5kl\xe4der","Bl\xe4ck","Bobbie Burns","Boblbee","Bobux","Bode","BOGGI","Boglioli","Bogs","Bondelid","Boohoo","Boomerang","Boras","Bosch","Boss","Bottega Veneta","Boxfresh","Brain Dead","Brako","Brand Industries","Brandit","Braqeez","Brave Soul","Breitling","Bric-a-Brac","Brioni","British knights","Brixtol","Brixton","Bronx","Brooks Brothers","Brunng\xe5rd","Bruno Banani","Bruno Magli","Bruno Premi","Bruun & Stengade","Bruuns Bazaar","Buffalo","Bugatti","Bukvy","Bullboxer","Bulldozer","Bundgaard","Burberry","Burton","Buscemi","Busnel","Butter goods","Butterfly twists","Bvlgari","BXY","By Burin","By Malene Birger","By Malina","Byblos","B\xe5stad original","C.P. Company","C1rca","Ca Shott","Cactus Plant Dlea Market","Cafenoir","Calida","Call It Spring","Callaway","Calou","Calvin Klein","Calvin Klein Jeans","Camaieu","Cambio","Camel","Camilla Thulin","Camper","Campomaggi","Canada Goose","Canada Snow","Candice Cooper","Canon","Cappelletti","Caprice","Carhartt","Carin Wester","Caroline Hjerpe","Caroline Svedbom","Carpisa","Carriwell","Cars","Cartier","Carvela","Carven","Casablanca","Casall","Castaner","Catarina Martins","Caterpillar","CATH KIDSTON","Cathrine Hammel","Cavalet","Cayler & Sons","CDLP","Ceannis","Cece L Amour","Cecil","Cecilie bahnsen","CECILIE Copenhagen","Celavi","C\xe9line","Celio","Cellbes","Cellini","Cerruti","Chaco","Champion","Chanel","Chanelle","Charles David","Charles Jeffrey Loverboy","Cheap Monday","Cheapo","Chelsea Peers","Chi Chi London","Chie Mihara","Chimi","China girl","Chinese laundry","Chipie","Chipmunks","Chlo\xe9","Chopard","Christian Lacroix","Christian Louboutin","Christopher Kane","Church’s","Cinque","Ciso","Citizens Of Humanity","Citybird","Clae","Clarks","Claudie Pierlot","Clip Rope","Club L","Club Monaco","CMMN SWDN","Coach","Cobra golf","Coccinelle","Cole Haan","Collusion","Colmar","Colors of California","Colourful Rebel","Columbia","Comma","Comme Des Garcons","Comme des Gar\xe7ons","Common Projects","Comptoir Des Cotonniers","Conguitos","Converse","Copenhagen Muse","Copenhagen studios","Coperni","Coral blue","Corniche By Trickers","Cortefiel","Cos","Coster Copenhagen","Cotton On","Courr\xe8ges","Craft","Craig Green","Cream","Creative recreation","Crime","Criminal Damage","Crocker","Crockett & Jones","Crockett& Jones","Crocs","Croft & Barrow","Cross","Cubus","Culture","Cushe","Custommade","Cutler & Gross","C\xf4te & Ciel","D for Dasia","D.A.T.E.","D&G","Dada","Dagmar","Dahlin","Daisy Grace","Dala clogs","Damir Doma","Damn heels","Dance","Daniblack","Daniel W. Fletcher","Darkstone","Davida","Day Birger & Mikkelsen","Day birger et mikkelsen","DC Shoes","Dea Kudibal","Deadwood","Debbie","DeFacto","Defend Paris","Dekline","Denim Hunter","Depeche","Derhy","Design House Stockholm","Designers remix","Desigual","Deus ex machina","Dewalt","Diadora","Diana Orving","Diane von Furstenberg","Diavolina","Dickies","Dico Copenhagen","Diddi","Didriksons","DIEGA","Diemme","Diesel","Diggers","Dime","DinSko","Dior","Dirty Laundry","Disney","Dita","Divided","Dixie","Djerf Avenue","DKNY","Dkode","Do-win","Dockers","Dockers by Gerli","Docksta","Dodo bar or","Dolce & Gabbana","Dolly Do","Dollybird","Dolomite","Don Donna","Dondup","Donna girl","Donna Karan","Dopie","Dorina","Dorothy Perkins","Dr. Denim","Dr. Martens","Dr. Martens","Dranella","Draven","Dreimaster","Dressmann","Dries van Noten","Dry Lake","Drykorn","Dsquared2","Duffy","Dune","Dunhill","Duskii","D\xe4v","Eagle","Eastpak","Ebbe","Ecco","Eckhaus Latta","Ecko","Ed Hardy","Edwin","Efva Attling","Ek of Sweden","Ekn","El Naturalista","Element","Eleven Paris","Elie Saab","Elie tahari","Elisabetta Franchi","Ellesse","Elliatt","Ellos","Elvine","Elvio Zanon","Em","Emerica","Emilio","Emilio Pucci","Emily van den Bergh","Emporio armani","Emu Australia","Energie","Enfant","Enfants Riches D\xe9prim\xe9s","Engineered Garments","Envie de Fraise","Envii","Equipment","Erdem","Erfo","Ermenegildo Zegna","Escada","Eser","Eskimo","Esprit","Esska","Etam","Etienne Aigner","Etki","Etnies","Eton","Etro","Ettore Adriano","\xc9tudes","Even & Odd","Everest","Evisu","Exani","Exte","Eytys","Ezpz","F-Troupe","Fabi","Fabiana","Fabletics","Facetasm","Faguo","FALKE","Fantasy","Fashion by C","Fashion nova","Fashion Union","Fear Of God Essentials","Feiyue","Fendi","Fenty","Festool","Feud","Fila","Filippa K","Fiona McGuinness","Fiorelli","Firetrap","Fitflop","Fiveunits","Fjallr\xe4ven","Fj\xe4llr\xe4ven","Flash","Flattered","Fly London","Forever 21","Forever New","Fornarina","Fossil","Foxiedox","Frame","Frame Denim","Francesco Morichetti","Franco Sarto","Frank lyman","Frank Wright","Franklin & Marshall","Fred Perry","Free People","Freeman T. Porter","Freequent","French Connection","French Sole","Fresas con Nata","Friboo","Friis Company","From Future","Fruit of The Loom","Frye","Fubu","Fuchs Schmitt","Furla","FWSS","G STAR RAW","G-Star","G-STAR RAW","Gaastra","Gabba","Gabor","Galaxy","Game Boy","Ganni","Gant","Gap","Garden","Gardenia","Gardeur","Garmont","Garvalin","Gasp","GCDS","Geggamoja","Gentle Monster","Genuine Leather","Geox","Gerry Weber","Gestuz","Ghibi","Giacomorelli","Giambattista Valli x H&M","Gianni versace","Giesswein","Gigli","Gilberto","Gildan","Gina Tricot","Giuseppe Zanotti","Givenchy","Glagla","Glamorous","Glerups","GmbH","Gneis","Gogos","Gola","Golden Goose","Goliath","Good news","Gosha Rubchinskiy","Gourmet","Goyard","Gram","Graninge","Gravis","Green Comfort","Groundhog","Guardiadi","Gucci","Gudrun Sj\xf6d\xe9n","Guess","Guidi","Gul & Bl\xe5","Gulliver","Gunilla Ponten","Gymshark","H by Hudson","H&M","H&M Conscious exclusive","H&M STUDIO","H2o Fagerholt","Hackenbusch","Hackett","Hagl\xf6fs","Haider Ackermann","Han Kj\xf8benhavn","Happiness","Happy Holly","Happy Socks","Hard Hearted Harlot","Havaianas","Head","Heelys","Heimstone","HELIOT EMIL","Hell bunny","Helly Hansen","Helmut Lang","Henri Lloyd","Henrik Vibskov","Herm\xe8s","Heron Preston","Herschel","Hip","Hispanitas","Hobbs","Hogan","Hoka One One","Hollies","Hollister","Hood By Air","Hope","Horizn studios","Hoss","Houdini","House Of Dagmar","House of Harlow 1960","House of Lola","House of Montague","Hoya","Hub","Hub Footwear","Hudson","Hugo Boss","Hummel","Hunkem\xf6ller","Hunkon","Hunky Dory","Hunter","Hush Puppies","Husqvarna","Hype","IAMELENI","IcanIwill","Iceberg","Icebug","Ichi","Ida Sj\xf6stedt","IDEAL OF SWEDEN","Ikks","Ilenia P","Ilse Jacobsen","Ilves","Improvd","Imsevimse","Indiska","Inov8","intimissimi","Intrigo","INUIKII","InWear","IRO","Iron Fist","Irregular Choice","Isabel Marant","Isabel Marant Etoile","Issey Miyake","Ivory","J brand","J.Crew","J.Lindeberg","J.W. Anderson","Jack & Jones","Jack and Lily","Jack Wolfskin","Jackal","Jackpot","Jacqueline de Yong","Jacquemus","Jaded London","Jako","Jalas","Jana","Jascha Stockholm","JDY","Jean Paul Gaultier","JEANERICA","Jeffrey Campbell","Jenny by Ara","Jerome Dreyfuss","Jessica Simpson","Jet Set","Jil Sander","Jim Rickey","Jimmy Choo","JJ Footwear","Jofama","John Fluevog","John Galliano","John Spencer","Johnny Bulls","Johnny Was","Johnston Murphy","Joop!","Jordan","Josef Seibel","Joseph","Juicy Couture","Julie Fagerholt","Jumperfabriken","Junk De Luxe","Junkyard","Junya Watanabe","Just Female","Juun.J","K Cobler","K-Swiss","K1X","Kaffe","Kameleont","Kamik","Kangaroos","Kanna","Kaporal","Kappa","KappAhl","Karen by Simonsen","Karen Millen","Karen walker","Karhu","Kari Traa","Karin Halvors","Karl Kani","Karl Lagerfeld","Karmamia","Kat Von D","Kate Spade","Kathleen Madden","Katvig","Kavat","Kawasaki","Keds","Keen","Keep","KENDALL + KYLIE","Kennel Schmenger","Kenneth Cole","Kenzo","Kenzo X H&M","KG by Kurt Geiger","Khaite","Khrio","Kickers","Kidboxer","Kik Kid","Kiko Kostadinov","Killah","Kimmik","King","Kings of Indigo","Kl\xe4ttermusen","Kmb","KnowledgeCotton Apparel","Kompis","Konrad","Kookai","Koral","Korii Joko","Kowalski","Kriss Sweden","Kron by Kron","Kronstadt","Ksubi","KTZ","Kurt Geiger","KVD Los Angeles","L A Gear","L Homme Rouge","L.A.M.B.","L'agence","La Chemise","La Martina","La Perla","La Strada","Lacoste","Lacoste Live","Lacrosse","Lady CG","Lager 157","Lakai","Laksen","Lancel Paris","Lanvin","Lascana","Laura Biagiotti","Laura by Heppo","Lauren Ralph Lauren","LauRie","Lavoro","Lawrence Grey","Lazamani","LdiR","Le Chameau","Le Coq Sportif","Le Specs","LE TEMPS DES CERISES","Lee","Legend","Legero","Lego","Lemaire","Leonard Paris","Les Coyotes de Paris","Les Deux","Lesson 2","Levete Room","Levi's","Lexington","Liam Hodges","Libertine-Libertine","Lidl","Liebeskind Berlin","Lily & Rose","Lily And Rose","Linda Farrow","Lindbergh","Lindex","Line of Oslo","Lipsy","Lisa Larson","Lise Lindvig","Little Liffner","Little Marcel","Little Mistress","Liu Jo","Liverpool","Living Kitzb\xfchel","Livly","Lk Bennett","Loake","Lodi","Loewe","Loints of Holland","Lola Ramona","Londain","London Rebel","Longchamp","Lonsdale London","Looking","Loro Piana","Lost Ink","Lotto","Louis Vuitton","Loulou Studio","LTB","Luca Bossi","Ludwig Reiter","Lululemon","Lundhags","Lundmyr of Sweden","Lupilu","Lurdes Bergada","Luxury Rebel","Lyle & Scott","Lyle and Scott","L\xe4eder by Nature","Maa","Madewell","Mads N\xf8rgaard","Magicfelt","Magnanni","Maians","Maison Kitsun\xe9","Maison Margiela","Maison Martin Margiela","Maison Scotch","Maje","Maloles","Mamalicious","Mammut","Manas","Mango","Manolo Blahnik","Mansur Gavriel","Manufacture D Essai","Marc","Marc Aurel","Marc Cain","Marc Ecko","Marc Jacobs","Marc O Polo","Marc O'Polo","Marcelo Burlon","Marco Bossi","Marcus Martinus","Marella","Margaret Howell","Maria Black","Maria Nilsdotter","Marimekko","Marina Ferranti","Marine Serre","Mario Valentino","Marks & Spencer","Marlboro","Marlboro classics","Marmot","Marni","Marques Almeida","Mars\xe8ll","Marta Jonsson","Martine Ali","Martine Rose","Martinelli","Masai","Maska","Massimo Dutti","Matinique","Mauri","Mauro Grifoni","Mavi","Mavic","Max & Co","Max Mara","Max Mara 'S","Max Mara Weekend","Maya deluxe","Mayla","MbyM","McKenzie","McKinley","MCS","Me&I","Meadows","Meindl","Mel","Mellow Yellow","Melton","Melvin Hamilton","Menbur","Mensfield","Mentor","Merchandise","Merrell","Mes Dames","Meshki","Mexicana","Mexx","Micha","Michael Kors","Mickey Club","Miezko","Mih Jeans","Millen","Mina UK","Mini for Many","Mini Rodini","Minimarket","Minimum","Minna Heino","Minna Parikka","Minnetonka","Minnie Mouse","Minus","Mirunz","MISBHV","Miss KG","Miss Me","Miss P","Miss Selfridge","Miss Sixty","Missguided","Missoni","Mister Tee","Mitchell & Ness","Miu Miu","Mjus","Mm6","Mocklis","Mod8","Moda di Fausto","Moeva","Mohedatoffeln","Mohino","Molly Holly","Molo","Moma","Momino","Moncler","Monitor","Monki","Monsoon","Monster High","Montblanc","Montrail","Moomin","Moon Boot","Moonstar","Moose Knuckles","Moreschi","Morris","MOS Copenhagen","Mos Mosh","Moschino","Moschino Love","Moss Copenhagen","Mother","Mother of Pearl","Mouli","MQ","MSGM","MUCHACHOMALO","Muckboot","Muddus","Mugler","Muji","Mulberry","Mumbai","Mumin","Munthe","Munthe plus Simonsen","Mustang","Musto","Muubaa","Muxart Barcelona","Mykita","NA-KD","NAF NAF","Name It","Nana","Nanushka","Napapijri","Nasty gal","NATIONAL GEOGRAPHIC","Native","Naturino","Nautica","Navigator","Needles","Neil Barrett","Nelly","Neo noir","Neosens","Nestor","Network","Neuw","New Balance","New Black","New Era","New Look","New Rock","New York & Company","New Yorker","New Zealand Boots","Newbie","Newhouse","Next","NG by Tero Palmroth","Nicholas Kirkwood","Nike","Nikolaj d'\xc9toiles","Nine West","Nintendo","NN07","Noa Noa","Noah","Nobrand","No\xeb","Noel","Noisy May","Nokia","Nokian","Nolita","Nome","Non Sign\xe9 / Unsigned","Noodles","Noppies","Norr","Norrback","North Sails","Northwawe","Notabene","Notes du Nord","Nova Star","Novita","Novita Man","Nude","Nudie","Nudie Jeans","Nueva Epoca","Nunoo","N\xfanoo","Nyg\xe5rdsanna","N\xfcmph","O","O'Neill","Oakley","Oakwood","OAS Company","Oasis","Obey","Object","Ocra","Odd Molly","Odeur","ODLO","Off-White","Oill","Olang","Old Navy","Old Soles","Oliver Peoples","Olsenhaus Pure Vegan","Olymp","Omega","On","One True Saxon","Onemoment","OnePiece","Oneteaspoon","Onetruesaxon","Onitsuka Tiger","Online Ceramics","Only","ONLY & SONS","Onne","Opus","Original Penguin","Orla Kiely","Orrefors","Orsay","Oscar Jacobson","Osiris","Ottolinger","Our Legacy","Oxygen","Oysho","Paco Gil","Paco Mena","Paco Rabanne","Paez","Paige","Pairs in Paris","Pajar","Pakros","Palace","Palladium","Palm Angels","Paloma wool","Palomo Spain","Panama Jack","Pandora","Pantofola d`Oro","Papillio","Paraboot","Parajumpers","PARFOIS","paria /FARZANEH","Paris Hilton","Parisienne","Park lane","Park west","Part Two","Patagonia","Pataugas","Patrick","Patrizia Pepe","Paul & Friends","Paul & Joe","Paul Frank","Paul Green","Paul Shark","Paul Smith","Pavement","Pax","Peak Performance","Pearl Izumi","Pedag","Pelle P","Penelope","Pepe Jeans","Peperoni","Pepino by Ricosta","Peppercorn","Perfect","Persol","Pertti Palmroth","Peter Kaiser","Petit Bateau","Phase Eight","Philipp Plein","Pieces","Pier One","Pierre Cardin","Pikolinos","Pilgrim","Pimkie","Pink","Pinko","Pinocchio","Play Comme des Gar\xe7ons","Plexx","Po Zu","Poetic","Poetic Licence","Pointer","Polar Loop","Polar Skate Co.","Polarn O. Pyret","Polaroid","Polecat","Polo Ralph Lauren","Pom D Api","Pony","Posse","POW","Prada","Pr\xeat \xe0 Porter","Pretty Ballerinas","Primark","Primeboots","Primigi","Primo Piano","Principe di Bologna","Pring","Pringle of Scotland","Proenza Schouler","Progetto","Prokeds","Pull & Bear","PULZ","Puma","Puma by Alexander McQueen","Pura Lopez","Pure Cashmere Nyc","Pyer Moss","Qasimi","Quay","Quick","Quicksilver","Quiksilver","R.M.Williams","R13","Rabalder","Rabens Saloner","Race Marine","Radii","Raf Simons","Rag & Bone","Ragdoll","Rains","Ralph Boston","Ralph Lauren","Ralph Lauren Denim & Supply","Rap","Ras","Ravn","Ray-Ban","RE-HASH","R\xe9alisation","Rebecca Minkoff","Rebecca Taylor","Red valentino","Redfoot","Redwing","Reebok","Reef","Refined by Bobbie Burns","Rehab","Reima","Reiss","Repeat","Replay","Reschia","Reserved","Residus","Rester\xf6ds","RETROSUPERFUTURE","Rhude","Rice","Rick Owens","Ricosta","Rieker","Rimowa","Rinascimento","Rip Curl","Rip N Dip","River Island","Rivieras","Rizzo","Roberto Botella","Roberto Cavalli","Robustor","Rocco P","Rock and Blue","Rockabilly","Rockandblue","Rocket Dog","Rockport","Rodebjer","Rohde","Rokin","Rolex","Rolling Stones","Rombaut","Romika","Roobin's","Roots","Rose & Born","Rosemunde","Rosner","Rotate","Rotate Birger Christensen ","Rouje","Roxy","Royal RepubliQ","Rubber Duck","Ruby Brown","Rue de Femme","Rugged Eagle footwear","Rugged Gear","Rules by Mary","Rut & Circle","Ruthie Davis","R\xf6hnisch","S. Oliver","Sacai","Sadie & Sage","Sail Racing","Saint Laurent","Saint Tropez","Saint Vacant","Salamander","Salming","Salomon","Salvatore Ferragamo","Sam Edelman","Sams\xf8e Sams\xf8e","Sancho Boots","Sand","Sand Copenhagen","Sanders","Sandqvist","Sandro","Sandro Paris","Sanita Clogs","Sanita Workwear","Sanuk","Saucony","Sbar","Sbu","Scarpa","Schmoove","Schneiders","Scholl","Schott","Scorett","Scotch & Soda","Sebago","Sebastian","Second Female","See by Chlo\xe9","S\xe9fr","Seidensticker","Selected","Selected homme","Self-Portrait","Senator","Senso","S\xe9raphine","Sergio Tacchini","Sessun","S\xe9zane","Shabbies Amsterdam","Shabby Chic","Shake it up","Shein","Shepherd","Shimano","Shoe Biz","Shoe Biz by Gardenia","Shoe shi bar","Shoe the Bear","Sies Marjan","Sievi","Simone Gabor","Simone Rocha","Simple","Sinsay","Sioux","Sisley","Sisters Point","Six Ames","Sixth June","Sixtyseven","Skechers","Skin by Finsk","Skofabriken Stockholm","Sk\xf6na Marie","Sloggi","Sneaky Steve","Snipe","Soaked","Soaked In Luxury","SOC","Soda","Sofie Schnoor","Soft Comfort","Soft Goat","Soft Rebels","Softinos","Sole","Solid","Someday","Sonia Rykiel","Sony","Sophie by Sophie","Sorel","Soulland","Soulmate","Soulstar","Soxo","Soyaconcept","Spalwart","Spanx","Speedo","Sperry Top-Sider","Spiderman","Spm","Sportmax","Sportswear","Springfield","SSS World Corp","Stampd","Stand Studio","Star Trek","Star Wars","Stau","Stefanel","Steffen Schraut","Stella McCartney","Stella McCartney Pour Adidas","Stella Nova","Stenk","Stenstr\xf6ms","Steptronic","Steve Madden","Steven alan","Sthlm DG","Stig Lindberg","Stine Goya","STOCKH LM","Stone Island","Stork Steps","Stradivarius","Strawberry Shortcake","Street One","Strellson","STRONGER","Str\xf6ms","Stuart Weitzman","Stutterheim","Stylein","Stylesnob","St\xfcssy","Suecomma Bonnie","Sugarfree shoes","Sugarhill Brighton","Sun Buddies","Suncoo","Sunnei","Superdry","Superfit","Superga","Supertrash","Supra","Supreme","Supremebeing","Svea","Swear London","Swedish Hasbeens","Sweeks","Swims","Swissies","T.U.K.","Tamaris","Tara Jarmon","Targus","Tatoosh","Tbs","Techno","Tecnica","Ted Baker","Telfar","Tellus","Ten Points","Tenson","Terra Plana","Terranova","Tessa Mimmi Clogs","Testbrand","Teva","Tezenis","TFNC London","The classy issue","The Kooples","The last conspiracy","the local firm","The North Face","The Row","The Seller","THE SHIRT FACTORY","The Urban Project","The Vampire's Wife x H&M","Theory","Theresia M.","These Glory Days","Thierry Lasry","Think","Thinsulate","Thom Brovne","Thomas Sabo","Thrasher","Tiamo","Tibi","Tiger","Tiger mist","Tiger of Sweden","Tigha","Timberland","Tissot","Tiziana","TNY","Toga Pulla","Tom Ford","Tom Joule","Tom Tailor","Tom Wood","Tommy Bahama","Tommy Hilfiger","Tommy Jeans","Toms","Tony Mora","Tony Perotti","Topman","Topshop","Tory Burch","Tosca Blu","Toteme","Tous","Toy Story","Treksta","Trendyol","TR\xc9S BIEN","Tretorn","Triangl","Triwa","True Religion","Trussardi","Tsubo","Tuzzi","Twin Set","Twist & Tango","U.S. Polo Assn.","U.S. Star","Ugg","Ukala","Ulla Popken","Ulle","Umbro","Undefteated","Under Armour","Undercover","Underground","Underground England","Uniforms for the Dedicated","Uniqlo","Unisa","United Colors of Benetton","United Nude","Uno","Unstiched Utilities","Urban Outfitters","Urban revivo","Uterque","V Ave Shoe Repair","Vagabond","Vailent","Valentino","Valentino Garavani","Valerie","Valerie Khalfon","Valontano","Valsport","Van Gils","Van Laack","Vanessa Bruno","Vans","Veja","Velour","Venettini","Venice","Vero Moda","Veronica Virta","Versace","Versace 19.69","Vetements","Via vai","Vibram","Victoria","Victoria Beckham","Victoria’s Secret","Viking","Viktor&Rolf","Vila","Villervalla","Vince","Vince Camuto","Vincent","Vintage","Virus","Vision","Visvim","Vithings Pulse","Vivienne Westwood","Vivobarefoot","Vlado","Volcom","Voly","Vood Vood","Vt collection","Wallis","Walter Van Beirendonck","Wandelei","Warehouse","Warrior","Weekday","Wera","Werner","Werner Kern","Wesc","Whistles","White Mountaineering","Why Not","Whyred","Wiges","Wildflower","Williot","Wilson","Winnie the Pooh","Woden","Wolsey","Wolverine","Won Hundred","Wonderbra","Wonders","Wood Wood","Woolrich","World Industries","WOS","Wrangler","WTAPS","Xenon","Xti","Xti Kids","Y-3","Y/Project","Yamaha","Yang Li","YAS","YAYA","Yeezy","Yellow Cab","YKX","Yoana baraschi","Yohji Yamamoto","Yourturn","Yves Saint Laurent","Zadig & Voltaire","Zara","Zay","Zdar","Zeus","Zign","Zimmermann","Zizzi","Zoggs","Zoo York","Zunblock","\xc5hl\xe9ns"]},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],kdF4Q:[function(e,t,n){var a=e("@parcel/transformer-js/src/esmodule-helpers.js");a.defineInteropFlag(n),a.export(n,"setFieldValue",()=>o),a.export(n,"showSelectedModel",()=>r),a.export(n,"setupModelSearchEventListeners",()=>f),a.export(n,"displayFindModelDiv",()=>p);let o=(e,t)=>{document.getElementById(e).value=t||"",document.getElementById(e).dispatchEvent(new Event("input"))},r=e=>{// Show selected model in search box
let t=JSON.parse(e);document.getElementById("findModelBoxEmpty").style.display="none",document.getElementById("findModelBoxFilled").style.display="flex",document.getElementById("findModelBoxFilled").setAttribute("data-model",e),document.getElementById("findModelBoxImage").style.backgroundImage=`url('${t.coverImageSmall}')`,document.getElementById("findModelBoxNameCategory").innerText=`${t.brand}, ${t.category}`,document.getElementById("findModelBoxName").innerText=`${t.maiName}`,document.getElementById("findModelBoxColor").innerText=`${t.color}`,document.getElementById("findModelBoxGender").innerText=`${t.gender}`},i=e=>t=>{g();let n=e.getAttribute("data-model"),a=JSON.parse(n);r(n),// Fill form with attributes from selected model
    document.getElementById(a.gender).parentElement.click(),o("itemSize",t.target.innerText),o("itemMaterial",a.material),o("itemModel",a.maiName),o("itemOriginalPrice",a.originalPriceSek),document.getElementById("findModelDescription").style.display="none",document.getElementById("findNewModel").style.display="flex",a.collectionYear+1>=new Date().getFullYear()&&(document.getElementById("itemAge").selectedIndex=1,document.getElementById("itemAge").style.color="rgb(51, 51, 51)",document.getElementById("itemAge").dispatchEvent(new Event("input"))),document.getElementById("itemCategory").value=a.category,$("#itemCategory").trigger("change"),document.getElementById("itemColor").value=a.color,$("#itemColor").trigger("change"),document.getElementById("findModelDiv").scrollIntoView(!0)},l=e=>{window.scrollTo({top:0});let t=document.getElementById("modelSizeTemplate"),n=document.getElementById("modelSizeList");for(;n.firstChild;)n.removeChild(n.lastChild);let a=JSON.parse(e.getAttribute("data-model"));if(1===a.sizes.length)return i(e)({target:{innerText:a.sizes[0]}});for(let[o,r]of a.sizes.sort(u).entries()){let a=t.cloneNode(!0);for(let n of(a.id=`${t.id}_${o}`,a.addEventListener("click",linkClickTracker),a.style.display="block",a.addEventListener("click",function t(n){i(e)(n),this.removeEventListener("click",t)}),Array.from(a.getElementsByTagName("*"))))n.id=`${n.id}_${o}`;n.appendChild(a),document.getElementById(`modelSize_${o}`).innerText=r}},s=e=>{document.getElementById("modelList").style.display="none",document.getElementById("modelSizeSelect").style.display="block",document.getElementById("modelSelectTitle").innerText="V\xe4lj storlek",l(e.currentTarget)},d=e=>{window.scrollTo({top:0});let t=document.getElementById("modelCardTemplate"),n=document.getElementById("modelResultList");for(;n.firstChild;)n.removeChild(n.lastChild);for(let[a,o]of e.entries()){let e=t.cloneNode(!0);for(let n of(e.id=`${t.id}_${a}`,e.addEventListener("click",linkClickTracker),e.style.display="flex",e.style.cursor="pointer",e.setAttribute("data-model",JSON.stringify(o)),e.addEventListener("click",s),Array.from(e.getElementsByTagName("*"))))n.id=`${n.id}_${a}`;n.appendChild(e),document.getElementById(`modelImage_${a}`).src=o.coverImageSmall,document.getElementById(`brandNameCategory_${a}`).innerText=`${o.brand}, ${o.category}`,document.getElementById(`modelName_${a}`).innerText=`${o.maiName}`,document.getElementById(`modelColor_${a}`).innerText=`${o.color}`,document.getElementById(`modelGender_${a}`).innerText=`${o.gender}`}};function c(e,t){let n=e.maiName.toLowerCase(),a=t.maiName.toLowerCase();return n>a?1:n<a?-1:0}function u(e,t){let n=["XXS","XS","S","M","L","XL","XXL"];return n.indexOf(e)>-1&&n.indexOf(t)>-1?n.indexOf(e)-n.indexOf(t):e-t}function m(){document.getElementById("addItemFormDiv").style.display="none",document.getElementById("modelSelectError").style.display="none",document.getElementById("modelSizeSelect").style.display="none",document.getElementById("modelSelectTitle").innerText="V\xe4lj modell",document.getElementById("modelSelectDiv").style.display="block",document.getElementById("modelList").style.display="block",document.getElementById("modelSearchInput").value="",window.scrollTo({top:0});let e=sessionStorage.getItem("models");if(e)document.getElementById("modelSpinner").style.display="none",d(JSON.parse(e).sort(c));else{document.getElementById("modelSpinner").style.display="flex";let t=setInterval(()=>{(e=sessionStorage.getItem("models"))&&(clearInterval(t),document.getElementById("modelSpinner").style.display="none",d(JSON.parse(e).sort(c)))},1e3)}}let g=()=>{document.getElementById("addItemFormDiv").style.display="block",document.getElementById("modelSelectDiv").style.display="none",document.getElementById("modelSizeSelect").style.display="none"},f=()=>{document.getElementById("findModelBoxEmpty").addEventListener("click",m),document.getElementById("findNewModel").addEventListener("click",m),document.getElementById("modelSelectClose").addEventListener("click",()=>{g()}),document.getElementById("modelSearchInput").addEventListener("input",()=>{let e=document.getElementById("modelSearchInput").value,t=JSON.parse(sessionStorage.getItem("models"));if(e&&e.length>0){let n=new Fuse(t,{includeScore:!0,keys:["maiName","category","color","maiColor","articleNumber","name"]}),a=n.search(e.replace(", "," "));d(a.map(e=>e.item))}else d(t.sort(c))}),document.getElementById("removeModelIcon").addEventListener("click",e=>{document.getElementById("findModelBoxEmpty").style.display="flex",document.getElementById("findModelBoxFilled").style.display="none",document.getElementById("findModelDescription").style.display="block",document.getElementById("findNewModel").style.display="none",e.stopPropagation()})},p=async e=>{if(featureIsEnabled("modelDB")&&"Eytys"===e){findModelDiv.style.display="block";let e=sessionStorage.getItem("models")?JSON.parse(sessionStorage.getItem("models")):void 0;if(!e){let t=await fetch("https://getbrandmodels-heypmjzjfq-ew.a.run.app?brand=Eytys",{method:"GET",headers:{"Content-Type":"application/json"}});e=await t.json(),sessionStorage.setItem("models",JSON.stringify(e))}}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}]},["42EGR"],"42EGR","parcelRequire81ca")//# sourceMappingURL=sellItem.js.map
;
//# sourceMappingURL=sellItem.js.map
