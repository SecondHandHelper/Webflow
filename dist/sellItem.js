!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,r,a){/* eslint-disable no-undef */var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof i[r]&&i[r],l=o.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!l[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var a="function"==typeof i[r]&&i[r];if(!n&&a)return a(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(o)return o(t,!0);// Try the node require function if it exists.
if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},m.cache={};var u=l[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return l[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=o,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return i[r]}}),i[r]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):a&&(this[a]=u)}}({"42EGR":[function(e,t,n){let r;var a=e("@parcel/transformer-js/src/esmodule-helpers.js");a.defineInteropFlag(n),a.export(n,"rememberUnsavedChanges",()=>N),a.export(n,"isNoBgImage",()=>X);var i=e("./sellItemHelpers"),o=e("qrcode"),l=a.interopDefault(o),s=e("./general"),d=e("./autocomplete-brands"),c=e("./sellItemModelSearch");let u=!1,m=getParamsObject();async function g(){// Grab values from form
let e=(0,s.getFormAddressFields)(),t=document.getElementById("personalId").value;t=t?(0,s.formatPersonalId)(t):null;// Write to Firestore
let n=db.collection("users").doc(authUser.current.uid);n.update({...e,personalId:t}).then(()=>{console.log(`User address of ${authUser.current.uid} is now updated`),itemConfirmationScreen.style.display="block",addressFormDiv.style.display="none"}).catch(e=>{errorHandler.report(e),console.error("Error updating document: ",e)})}function f(){return new Map().set("hole","H\xe5l").set("stain","Fl\xe4ck").set("lostFit","Tappad passform").set("pilling","Nopprig").set("threadUp","Tr\xe5dsl\xe4pp").set("colorChange","F\xe4rg\xe4ndring").set("otherDefect","Annat")}function h(){return["frontImage","brandTagImage","defectImage","materialTagImage","extraImage"]}async function A(){// Track with segment 'User Activated'
await p()===1&&analytics.track("User Activated")}async function p(){let e=await getItems(authUser.current.uid);return e.docs.filter(e=>e.data()?.status!=="Draft").length}async function y(){// Create item from sessionStorage
if(console.log("sellItemMainAuthenticated "+new Date),"draft"!==m.type&&"resell"!==m.type&&(document.getElementById("saveItemDraftButton").style.display="flex"),window.addEventListener("beforeunload",()=>{(m.id||u)&&localStorage.removeItem("newItem")}),// Visa alla "viktiga" fält om man är inloggad
toggleMoreInfoFields.click(),sessionStorage.getItem("itemToBeCreatedAfterSignIn")){// ... if we are redirected here from the sign-in page
if(document.referrer.includes("/sign-in")){await T();let e=sessionStorage.getItem("shippingMethod");e&&await callBackendApi("/api/users",{data:{data:{preferences:{shippingMethod:e}}},method:"PUT"});let t=user.current?.phoneNumber?.length;return location.href=t?"/item-confirmation":"/user-contact"}sessionStorage.removeItem("itemToBeCreatedAfterSignIn")}}async function I(){let e,t,n,a,o,f;let A=document.getElementById("qrCanvas");if(A&&(0,l.default).toCanvas(A,window.location.href,function(e){e&&console.error(e),console.log("success!")}),localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("itemValuation"),sessionStorage.getItem("itemToBeCreatedAfterSignIn")&&document.referrer.includes("/sign-in")){console.log(`showing spinner and waiting for item to be created when user is set ${user.current?.email}`),// ... if we are redirected here from the sign-in page and have a saved item that should be created
document.getElementById("loadingDiv").style.display="flex",document.getElementById("creatingItemText").style.display="block";return}e=document.getElementById("frontImage"),t=document.getElementById("brandTagImage"),n=document.getElementById("productImage"),a=document.getElementById("defectImage"),o=document.getElementById("materialTagImage"),f=document.getElementById("extraImage"),// display image when file has been selected
$("#frontImage").off("change"),e.addEventListener("change",H,{capture:!0}),$("#brandTagImage").off("change"),t.addEventListener("change",j,{capture:!0}),$("#productImage").off("change"),n.addEventListener("change",G,{capture:!0}),$("#defectImage").off("change"),a.addEventListener("change",q,{capture:!0}),$("#materialTag").off("change"),o.addEventListener("change",z,{capture:!0}),$("#extraImage").off("change"),f.addEventListener("change",V,{capture:!0}),(0,c.setupModelSearchEventListeners)(),function(){let e=document.getElementById("itemColor");e.onchange=function(){""!==this.value?e.style.color="#333":e.style.color="#929292"};// Change font color of dropdown itemAge when user selects a value
let t=document.getElementById("itemAge");t.onchange=function(){""!==this.value?t.style.color="#333":t.style.color="#929292"}}(),itemBrand.addEventListener("input",(0,i.fieldLabelToggle)("itemBrandLabel")),itemBrand.addEventListener("input",K),itemModel.addEventListener("input",(0,i.fieldLabelToggle)("itemModelLabel")),itemSize.addEventListener("input",(0,i.fieldLabelToggle)("itemSizeLabel")),itemSize.addEventListener("input",K),itemMaterial.addEventListener("input",(0,i.fieldLabelToggle)("itemMaterialLabel")),itemMaterial.addEventListener("input",K),itemOriginalPrice.addEventListener("input",(0,i.fieldLabelToggle)("itemOriginalPriceLabel")),itemAge.addEventListener("input",(0,i.fieldLabelToggle)("itemAgeLabel")),itemCondition.addEventListener("input",(0,i.fieldLabelToggle)("itemConditionLabel")),itemColor.addEventListener("change",(0,i.fieldLabelToggle)("itemColorLabel")),itemColor.addEventListener("input",K),itemUserComment.addEventListener("input",(0,i.fieldLabelToggle)("userCommentLabel")),document.getElementById("saveItemDraftButton").addEventListener("click",async()=>{document.getElementById("saveItemDraftButton").style.display="none",document.getElementById("saveDraftSpinner").style.display="flex";let e=sessionStorage.getItem("newItemId")||await (0,i.requestUniqueId)(),t=await _(e,"Draft");u=!0,r=t,document.getElementById("clearItemForm").style.display="none",document.getElementById("saveDraftSpinner").style.display="none",document.getElementById("darkOverlay").style.display="block";let n=t.images?.enhancedFrontImageSmall||t.images?.enhancedFrontImage||t.images?.frontImage;n?(document.getElementById("popUpImage").src=n,document.getElementById("popUpImageDiv").style.display="block",document.getElementById("popUpCheckmark").style.display="none"):(document.getElementById("popUpImage").src="",document.getElementById("popUpImageDiv").style.display="none",document.getElementById("popUpCheckmark").style.display="block"),document.getElementById("itemDraftSavedPopup").style.display="flex"}),document.getElementById("closeItemSavedPopup").addEventListener("click",()=>{document.getElementById("itemDraftSavedPopup").style.display="none",document.getElementById("darkOverlay").style.display="none"}),document.getElementById("popUpNewItem").addEventListener("click",()=>{Y(),location.href="/sell-item"}),document.getElementById("goToMyWardrobe").addEventListener("click",()=>{window.location.href="/private#wardrobe"}),document.getElementById("addItemButton").addEventListener("click",D),addItemForm.addEventListener("submit",()=>B()),userAddressForm.addEventListener("submit",g),(0,d.autocomplete)(document.getElementById("itemBrand"),d.brands);// Hide/Show warning about difficulty to sell certain brands
let p=document.getElementById("itemBrand"),y=document.getElementById("itemCategory");if(p.oninput=function(){shareSoldDiv.style.display="none",(0,i.checkBlockedOrLowShareSoldBrand)(this.value,y.value)},p.onblur=function(){let e=document.getElementById("hardToSellDiv");(["Ok\xe4nt","Unknown","Vet ej","Vet inte","Ok\xe4nd","Se bild"].some(e=>this.value.toLowerCase().includes(e.toLowerCase()))||this.value.length&&!this.value.match(/(\w|\d)/))&&(hardToSellText.innerHTML=`Vi k\xe4nner inte till m\xe4rket '${this.value}', och s\xe4ljer i regel inte ok\xe4nda varum\xe4rken.`,stopIcon.style.display="none",warningIcon.style.display="block",e.style.display="block"),(0,c.displayFindModelDiv)(this.value)},// Hide/Show extra fields for defects
itemCondition.onchange=function(){let e=this.value;"Anv\xe4nd, tecken p\xe5 slitage"===e?(defectInfoDiv.style.display="block",itemCondition.style.color="#333"):""===e?(defectInfoDiv.style.display="none",itemCondition.style.color="#929292"):(defectInfoDiv.style.display="none",itemCondition.style.color="#333")},// Show intro info about the importance to accurately describe the items condition
itemCondition.addEventListener("input",()=>{"Anv\xe4nd, men utan anm\xe4rkning"!==itemCondition.value||(authUser.current?"true"!==getCookie("conditionUsedInfoBoxSeen")?(user.current?.elementViews?user.current.elementViews.filter(e=>"conditionUsedInfoBox"===e.elementID):[]).length||(document.getElementById("triggerOpenConditionUsedInfo").click(),// Store elementViews to be able to hinder it to show automatically again
db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"conditionUsedInfoBox",timestamp:new Date})}),setCookie("conditionUsedInfoBoxSeen","true",100)):db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"conditionUsedInfoBox",timestamp:new Date})}):"true"!==getCookie("conditionUsedInfoBoxSeen")&&(document.getElementById("triggerOpenConditionUsedInfo").click(),setCookie("conditionUsedInfoBoxSeen","true",100)))}),nwt.addEventListener("click",()=>{(0,c.selectFieldValue)(itemCondition,"Helt ny, med prislapp kvar")}),nwot.addEventListener("click",()=>{(0,c.selectFieldValue)(itemCondition,"Helt ny, men utan prislapp")}),usedNoDefect.addEventListener("click",()=>{(0,c.selectFieldValue)(itemCondition,"Anv\xe4nd, men utan anm\xe4rkning")}),usedDefect.addEventListener("click",()=>{(0,c.selectFieldValue)(itemCondition,"Anv\xe4nd, tecken p\xe5 slitage")}),personalId.addEventListener("input",()=>{let e=(0,s.isValidSwedishSsn)(personalId.value)?"":"Ogiltigt personnummer";personalId.setCustomValidity(e)}),(0,i.initializeCategorySelect)(),document.getElementById("rejectColor").addEventListener("click",()=>{document.querySelector("#itemColor").value="",document.querySelector("#colorSuggestButtons").style.display="none",(0,i.fieldLabelToggle)("itemColorLabel"),document.querySelector("#itemColor").setCustomValidity("")}),document.getElementById("confirmColor").addEventListener("click",()=>{document.querySelector("#itemColor").setCustomValidity("")}),document.getElementById("rejectBrand").addEventListener("click",()=>{document.querySelector("#itemBrand").value="",document.querySelector("#brandSuggestButtons").style.display="none",document.querySelector("#itemBrand").setCustomValidity(""),(0,i.fieldLabelToggle)("itemBrandLabel")}),document.getElementById("confirmBrand").addEventListener("click",()=>{document.querySelector("#itemBrand").setCustomValidity(""),document.querySelector("#itemBrand").setCustomValidity("")}),document.getElementById("rejectModel").addEventListener("click",()=>{document.getElementById("modelSuggestButtons").style.display="none",(0,c.removeSelectedModel)(),document.getElementById("findModelTitle").innerText="Modell",N()}),document.getElementById("confirmModel").addEventListener("click",()=>{let e=JSON.parse(document.getElementById("findModelBoxFilled").getAttribute("data-model"));document.getElementById("modelSuggestButtons").style.display="none",document.getElementById("findModelTitle").innerText="Modell",document.getElementById("removeModelIcon").style.display="flex",(0,c.setFormValuesFromModel)(e,null,!0)}),document.getElementById("rejectMaterial").addEventListener("click",()=>{document.querySelector("#itemMaterial").value="",document.querySelector("#materialSuggestButtons").style.display="none",(0,i.fieldLabelToggle)("itemMaterialLabel"),document.querySelector("#itemMaterial").setCustomValidity("")}),document.getElementById("confirmMaterial").addEventListener("click",()=>{document.querySelector("#itemMaterial").setCustomValidity("")}),document.getElementById("rejectSize").addEventListener("click",()=>{document.querySelector("#itemSize").value="",document.querySelector("#sizeSuggestButtons").style.display="none",(0,i.fieldLabelToggle)("itemSizeLabel"),document.querySelector("#itemSize").setCustomValidity("")}),document.getElementById("confirmSize").addEventListener("click",()=>{document.querySelector("#itemSize").setCustomValidity("")}),function(){let e=new MutationObserver((e,t)=>{let n=e.find(e=>"style"===e.attributeName);n&&"none"===n.target.style.display&&N()});Array.from(document.querySelectorAll(".suggest-buttons")).forEach(t=>e.observe(t,{attributes:!0}))}(),function(){function e(e){if(u)return;let t=e.target;if(t instanceof Element){let e=S()[t.name];e!==t.value&&""!==t.value&&(document.getElementById("clearItemForm").style.display="block")}}m.id||(document.getElementById("wf-form-Add-Item").addEventListener("input",e),document.querySelector("#wf-form-Add-Item select").addEventListener("change",e))}(),function(){let e=document.getElementById("saveItemDraftDiv");function t(t){if(!m.id&&!u||m.id&&"resell"!==m.type&&"draft"!==m.type)return;let n=t.target;if(n instanceof Element){let t=r[n.name];t!==n.value&&""!==n.value&&(e.style.display="block")}}document.getElementById("wf-form-Add-Item").addEventListener("input",t),document.querySelector("#wf-form-Add-Item select").addEventListener("change",t),document.getElementById("saveItemDraft").addEventListener("click",async()=>{e.classList.add("saving");let t="resell"===m.type?await (0,i.requestUniqueId)():"draft"===m.type?m.id:r.id;await _(t,"Draft"),e.classList.remove("saving"),e.classList.add("saved"),setTimeout(()=>{e.classList.remove("saved"),e.style.display="none"},1500)})}(),h().forEach(e=>{document.getElementById(`delete${(0,i.capitalizeFirstLetter)(e)}Icon`).addEventListener("click",()=>{Z(e),(0,i.hideImageError)(e)})}),document.getElementById("deleteFrontImageIcon").addEventListener("click",()=>{document.getElementById("frontImage").required=!0,Z("enhancedFrontImage")}),document.getElementById("deleteBrandTagImageIcon").addEventListener("click",()=>{document.getElementById("brandTagImage").required=!0}),document.getElementById("clearItemForm").addEventListener("click",Y),window.addEventListener("scroll",function e(){window.innerHeight+window.pageYOffset>=document.body.offsetHeight-40&&(document.getElementById("bottomBarContainer").classList.add("sticky-bottom-bar"),window.removeEventListener("scroll",e))}),m.id)// Fill form if the user comes from a prefill link (re-sell item or continue with draft item)
sessionStorage.removeItem("newItemId"),localStorage.removeItem("newItem"),localStorage.removeItem("detectedModel"),authUser.whenSet(function(e){e||(document.getElementById("maiIntro").style.display="block")}),document.getElementById("resellIntro").style.display="block",document.getElementById("bottomBarContainer").classList.add("sticky-bottom-bar"),document.getElementById("clearItemForm").style.display="none",("draft"===m.type||"resell"===m.type)&&(document.querySelector("#resellIntro .text-block-176").innerText="Fyll i de sista detaljerna f\xf6r att s\xe4lja ditt plagg och kontrollera skickbeskrivningen.",document.getElementById("frontImage").required=!0,document.getElementById("brandTagImage").required=!0),await U(m.id,null,"draft"===m.type),document.getElementById("triggerShowSellItemContent").click();else if(localStorage.getItem("newItem")&&!F(JSON.parse(localStorage.getItem("newItem")))){// Saved state from a previous visit to /sell-item - restore the data
let e=JSON.parse(localStorage.getItem("newItem"));document.getElementById("frontImage").required=!0,document.getElementById("brandTagImage").required=!0,await U(null,e,!0),document.getElementById("clearItemForm").style.display="block",document.getElementById("triggerShowSellItemContent").click()}else document.getElementById("triggerShowSellItemContent").click(),document.getElementById("frontImage").required=!0,document.getElementById("brandTagImage").required=!0;// We delay the rememberUnsavedChanges call to allow any confirm/reject animations to finish
document.getElementById("wf-form-Add-Item").querySelectorAll("input").forEach(e=>{e.addEventListener("input",N)}),document.getElementById("wf-form-Add-Item").querySelectorAll('input[type="radio"]').forEach(e=>{e.addEventListener("change",N)}),document.getElementById("wf-form-Add-Item").querySelectorAll('input[type="checkbox"]').forEach(e=>{e.addEventListener("change",N)}),// We delay the rememberUnsavedChanges call to allow any confirm/reject animations to finish
document.getElementById("wf-form-Add-Item").querySelectorAll("select").forEach(e=>{e.addEventListener("change",N)}),document.getElementById("wf-form-Add-Item").querySelectorAll("textarea").forEach(e=>{e.addEventListener("input",N)}),window.addEventListener("pageshow",e=>{e.persisted&&localStorage.getItem("newItem")&&setTimeout(async()=>{await U(null,JSON.parse(localStorage.getItem("newItem")),!0)},10)})}async function B(){let e="draft"===m.type?m.id:sessionStorage.getItem("newItemId")||await (0,i.requestUniqueId)(),t=null;try{// Check that all images are uploaded
let e=JSON.parse(localStorage.getItem("newItem")||"{}").images;document.querySelectorAll('input[type="file"]').forEach(n=>{n.files.length&&!e[n.id]&&(t=n,(0,i.uploadImageAndShowPreview)(n,n.id,!0))})}catch(e){t&&(t.setCustomValidity("Uppladdning av bilden misslyckades, f\xf6rs\xf6k igen"),(0,i.showImageError)(t,"Uppladdning av bilden misslyckades, f\xf6rs\xf6k igen"),D()),errorHandler.report(e),console.error("addItem failed",e);return}try{document.getElementById("addItemFormDiv").style.display="none",document.getElementById("loadingDiv").style.display="flex",document.getElementById("clearItemForm").style.display="none",document.getElementById("saveItemDraftDiv").style.display="none";let t=await _(e),n=await C(e,t);location.href=n}catch(e){errorHandler.report(e),console.error("addItem failed",e)}}function E({humanCheckNeeded:e,newMinMaxLog:t,lowValueSegment:n,lowValueCategory:r}){return e||t.match(/accept price is above max/i)&&!n&&!r}async function v(e,t){if(sessionStorage.getItem("itemToBeCreatedAfterSignIn")){let t=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"));sessionStorage.setItem("itemToBeCreatedAfterSignIn",JSON.stringify({id:t.id,item:{...t.item,...e}}))}else{await callBackendApi(`/api/valuation/${t}`,{data:e});let n=JSON.parse(localStorage.getItem("latestItemCreated"));localStorage.setItem("latestItemCreated",JSON.stringify({...n,...e}))}}async function b(e,t){let{minPrice:n,maxPrice:r,decline:a,humanCheckNeeded:i,humanCheckExplanation:o,willNotSell:l,soldPrice:s,version:d,newMinPriceEstimate:c,newMaxPriceEstimate:u,newMinMaxLog:m,adjustmentAllowed:g,newBrand:f,newBrandCategory:h,valuatedBrandItems:A,brandMeanMax:p,brandAccuracy:y,brandCategoryAccuracy:I,fewBrand:B,brandMeanSold:b,brandCategoryMeanSold:w,highPriceVarBrandCategory:C,brandShareSold:x}=t||{};if(!n&&!a)return;let S={mlValuation:{decline:a,humanCheckNeeded:i,minPriceEstimate:n,maxPriceEstimate:r,humanCheckExplanation:o,willNotSellPrediction:l,soldPriceEstimate:s,modelVersion:d?.toString(),newMinPriceEstimate:c,newMaxPriceEstimate:u,newMinMaxLog:m,adjustmentAllowed:g,newBrand:f,newBrandCategory:h,valuatedBrandItems:A,brandMeanMax:p,brandAccuracy:y,brandCategoryAccuracy:I,fewBrand:B,brandMeanSold:b,brandCategoryMeanSold:w,highPriceVarBrandCategory:C,brandShareSold:x},newMinPriceEstimate:c||n,newMaxPriceEstimate:u||r,...a||E(t)?{}:{valuationStatus:"Completed",valuationDate:new Date().toISOString(),infoRequests:{price:{status:"Active",response:"",description:"Vi b\xf6rjar med startpriset, och justerar successivt ner till l\xe4gsta priset under s\xe4ljperioden p\xe5 30 dagar. V\xe4rderingen utg\xe5r fr\xe5n vad liknande s\xe5lts f\xf6r.",minPrice:c||n,maxPrice:u||r}}}};await v(S,e)}async function w(e,t,n){let r="Sold"===e.status?e.maxPriceEstimate:Math.min(e.maxPriceEstimate,Math.max(e.minPriceEstimate+150,10*Math.round((1.3*e.minPriceEstimate||0)/10))),a={valuationStatus:"Completed",valuationDate:new Date().toISOString(),newMinPriceEstimate:e.minPriceEstimate,newMaxPriceEstimate:r,infoRequests:{price:{status:"Active",response:"",description:"Vi b\xf6rjar med startpriset, och justerar successivt ner till l\xe4gsta priset under s\xe4ljperioden p\xe5 30 dagar. V\xe4rderingen utg\xe5r fr\xe5n vad liknande s\xe5lts f\xf6r.",minPrice:e.minPriceEstimate,maxPrice:r,type:"Valuation",source:"createdFromItem",adjustmentAllowed:!0}}};await v(a,n)}async function C(e,t){if(!e&&!t)return console.error("No item and no itemId, unexpected!!"),"/item-confirmation";if(m.id&&"draft"!==m.type){let n=await callBackendApi(`/api/items/${m.id}`),r=n.data;return await w(r,t,e),"/item-valuation"}try{let n=await callBackendApi("/api/valuation",{data:{itemId:e,item:t},requiresAuth:!1}),{minPrice:r,maxPrice:a,decline:i}=n.data||{};return await b(e,n.data),x(r&&a,i,E(n.data))}catch(e){console.error("Failed to get ml valuation",e)}return x()}function x(e,t,n){if(!e||n){if(sessionStorage.getItem("itemToBeCreatedAfterSignIn"))return"/sign-in";let e=user.current?.phoneNumber?.length;return e?"/item-confirmation":"/user-contact"}return"/item-valuation"}function S(){return{acceptPrice:null,age:null,brand:null,category:null,color:null,condition:null,defectDescription:null,defects:[],images:{},material:null,model:null,originalPrice:null,userValuationApproval:!0,sex:"Woman",size:null,userComment:null}}function k(){let e="",t=new Date,n=itemSize.value,r=itemMaterial.value?itemMaterial.value.trim():"",a=itemBrand.value?itemBrand.value.trim():"",i=itemModel.value?itemModel.value.trim():"",o=Number(itemOriginalPrice.value),l=itemAge.value,s=itemCondition.value,d=itemDefectDescription.value?itemDefectDescription.value.trim():"",c=itemUserComment.value?itemUserComment.value.trim():"",u=Number(itemLowestAcceptPrice.value),m=new Map().set("hole",hole.checked).set("stain",stain.checked).set("lostFit",lostFit.checked).set("pilling",pilling.checked).set("threadUp",threadUp.checked).set("colorChange",colorChange.checked).set("otherDefect",otherDefect.checked),g=[];"Anv\xe4nd, tecken p\xe5 slitage"===s&&m.forEach((e,t)=>{if(e){let e=f().get(t);g.push(e)}});for(var h=document.getElementsByName("Sex"),A=0;A<h.length;A++)h[A].checked&&(e=h[A].id);let p=document.getElementById("findModelBoxFilled"),y={};"flex"===p.style.display&&(y=JSON.parse(p.getAttribute("data-model")));let I=JSON.parse(localStorage.getItem("newItem")||"{}").images;return{user:authUser.current?.uid||null,createdAt:t.toISOString(),status,shippingStatus:"Not sent",sex:e,size:n,material:r,color:itemColor.value,category:itemCategory.value,brand:a,model:i,originalPrice:o,age:l,condition:s,defects:g,defectDescription:d,userComment:c,acceptPrice:u,preferences:{userValuationApproval:!0},modelVariantFields:y,images:I||{}}}async function M(){// If first time: User chooses shipping method preference in sell item form
let e="Service point";return user.current?.preferences?.shippingMethod?e=user.current?.preferences?.shippingMethod:authUser.current?await callBackendApi("/api/users",{data:{preferences:{shippingMethod:e}},method:"PUT"}):sessionStorage.setItem("shippingMethod",e),e}async function _(e,t="New"){let{modelVariantFields:{coverImage:n,atVariantId:r,id:a},images:i,...o}=k(),l=await M(),s=modelSuggestButtons?.style?.display==="none";s&&n&&(i.modelImage=n);let d=m.id&&"draft"!==m.type?{createdFromItem:m.id}:{},c=!!Object.keys(d).length,u={...o,status:t,..."Draft"===t?{draftSource:c?"Mai purchase":"Sell item"}:{},shippingMethod:l,images:i,...d,...s&&{atModelVariantId:r,modelId:a},version:"2"};if(authUser.current){let t=await callBackendApi(`/api/items/${e}`,{data:{item:u}});//Archive if "createdFromItem" is same seller
if(await A(),await P(),localStorage.removeItem("newItem"),localStorage.removeItem("detectedModel"),sessionStorage.removeItem("newItemId"),localStorage.setItem("latestItemCreated",JSON.stringify(t.data)),c){let e=await L(m.id);e===authUser.current.uid&&await db.collection("items").doc(m.id).update({archived:!0})}}else localStorage.removeItem("detectedModel"),sessionStorage.setItem("itemToBeCreatedAfterSignIn",JSON.stringify({id:e,item:u}));return{...u,id:e}}async function L(e){console.log("getCreatedFromItemUserId()");let t=await db.collection("items").doc(e).get();return t.exists?t.data().user:null}function D(){document.getElementById("wf-form-Add-Item").reportValidity();let e=document.getElementById("wf-form-Add-Item").querySelectorAll(":invalid"),t=e?.[0];t&&t.getBoundingClientRect().height<=1&&(t.style.cssText="width:100% !important;height:100% !important;"),setTimeout(()=>{if(e.length>0){if(!function(e){"function"==typeof jQuery&&e instanceof jQuery&&(e=e[0]);let t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight/2||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}(t)){let e=t.getBoundingClientRect().top+window.scrollY-40;window.scrollTo({top:e,behavior:"smooth"})}document.getElementById("wf-form-Add-Item").reportValidity()}},300)}async function P(){let e="2024-08-18">=new Intl.DateTimeFormat("se-SV").format(new Date);e&&"noCommission"===getCookie("noCommissionCampaignCookie")&&await p()===1&&await callBackendApi("/api/users/noCommissionCoupon",{method:"PUT"})}async function T(){let e=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"));sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),sessionStorage.removeItem("newItemId"),await callBackendApi(`/api/items/${e.id}`,{data:e}),await A(),await P(),localStorage.removeItem("newItem"),e.item.id=e.id,localStorage.setItem("latestItemCreated",JSON.stringify(e.item))}let Q=()=>!(localStorage.getItem("latestItemCreated")||u||m.id);function N(){if(!Q())return;let{user:e,createdAt:t,status:n,shippingStatus:r,...a}=k(),i=Object.keys(a).reduce((e,t)=>(e[t]=""===a[t]||isNaN(a[t])&&jQuery.isEmptyObject(a[t])?null:a[t],e),{});i.defects=i.defects?i.defects:[],i.userValuationApproval=!0,delete i.preferences,i.acceptPrice=i.acceptPrice&&i.acceptPrice>0?i.acceptPrice:null,i.originalPrice=i.originalPrice&&i.originalPrice>0?i.originalPrice:null,["itemBrand","itemSize","itemMaterial","itemColor"].forEach(e=>{let t=document.getElementById(e).parentNode.querySelector(".suggest-buttons")||document.getElementById(e).parentNode.parentNode.querySelector(".suggest-buttons");t?.style?.display==="block"&&(i[`${e}Confirm`]=!0)});let o=document.getElementById("modelSuggestButtons");o?.style?.display==="flex"&&(i.itemModelConfirm=!0),F(i)?localStorage.removeItem("newItem"):localStorage.setItem("newItem",JSON.stringify(i))}function F(e){return function(e,t){for(let n in t)if(n in e){if(t[n]instanceof Object){if(JSON.stringify(t[n])!==JSON.stringify(e[n]))return!1;continue}if(e[n]!==t[n])return!1}return!0}(e,S())}function R(e,t,n){if(t&&n){let t=document.getElementById(e).parentNode.querySelector(".suggest-buttons")||document.getElementById(e).parentNode.parentNode.querySelector(".suggest-buttons");t.style.display="block",document.getElementById(e).setCustomValidity("Bekr\xe4fta eller \xe4ndra v\xe4rdet")}}async function U(e,t=null,n=!1){try{let a={data:t},o=null;t||([a,o]=await Promise.all([callBackendApi(`/api/items/${e}`),callBackendApi(`/api/items/${e}/atItem`)]),r=a);let l=o?.data||{},s=a.data,d=s.images||{},u=s.originalPrice;// Populate images
for(let e in u<=0&&(u=null),d){let t=d[`${e}Small`]||d[`${e}Medium`]||d[e]||d[`${e}Large`],n=d[e]||d[`${e}Large`]||d[`${e}Medium`]||d[`${e}Small`];h().includes(e)&&((0,i.rememberNewItemImageField)(e,n,t),"frontImage"===e&&(d.enhancedFrontImage?(t=d.enhancedFrontImageSmall||d.enhancedFrontImageMedium||d.enhancedFrontImage||d.enhancedFrontImageLarge,n=d.enhancedFrontImage||d.enhancedFrontImageLarge||d.enhancedFrontImageMedium||d.enhancedFrontImageSmall,(0,i.rememberNewItemImageField)("enhancedFrontImage",n,t)):(function(e){let t=new MutationObserver(e),n=document.getElementById("loadingDiv");t.observe(n,{attributeFilter:["style"]})}(()=>(0,i.showLoadingIcon)(e)),// Don't await here to don't block the form from showing with the front image
(0,i.enhanceFrontImage)(n).then(()=>console.log("Image enhanced")))),(0,i.showImagePreview)(e,t),(0,i.showImageState)(e,"success-state"),document.getElementById(e).required=!1)}if(d.modelImage){let e=d.modelImageLarge||d.modelImage,t=d.modelImageSmall||d.modelImageMedium||d.modelImage;document.getElementById("coverImageContainer").style.backgroundImage=`url('${t}')`,document.getElementById("coverImagePreview").style.display="block",(0,i.rememberNewItemImageField)("modelImage",e,t)}else if(d.coverImage&&!await X(d.coverImage)){// Show cover image preview if it is a model image, if it is a noBg image we skip it
sessionStorage.removeItem("coverImagePreviewUrl");let e=d.coverImageLarge||d.coverImage,t=d.coverImage;document.getElementById("coverImageContainer").style.backgroundImage=`url('${t}')`,document.getElementById("coverImagePreview").style.display="block",(0,i.rememberNewItemImageField)("modelImage",e,t)}// Populate text input fields
itemBrand.value=s.brand||"",R("itemBrand",n,s.itemBrandConfirm),// Don't use the setFieldValue for the brand since that triggers a dropdown to open
document.getElementById("itemBrandLabel").style.display=s.brand?"inline-block":"none";let g=await (0,c.displayFindModelDiv)(s.brand);if(g){let e=JSON.parse(sessionStorage.getItem("models")),t=e?.find(e=>e.id===s.modelId);if(!s.modelVariantFields&&!t){let e=await callBackendApi(`/api/models/${s.modelId}`);if(e.data){let{maiName:n,gender:r,maiCategory:a="",collectionYear:i,brand:o}=e.data,{maiColor:l,coverImage:s,coverImageSmall:d}=e.data.variants[0];t={maiName:n,gender:r,category:a,maiColor:l,coverImageSmall:d||s,brand:o,coverImage:s,collectionYear:i}}}(t||s.modelVariantFields)&&(n&&s.itemModelConfirm?(modelSuggestButtons.style.display="flex",removeModelIcon.style.display="none",(0,c.showModelSuggestion)(t||s.modelVariantFields)):((0,c.showSelectedModel)(t||s.modelVariantFields),modelSuggestButtons.style.display="none",removeModelIcon.style.display="flex"))}(0,c.setFieldValue)("itemModel",s.model||l?.model),(0,c.setFieldValue)("itemSize",s.size),R("itemSize",n,s.itemSizeConfirm),(0,c.setFieldValue)("itemMaterial",s.material),R("itemMaterial",n,s.itemMaterialConfirm),(0,c.setFieldValue)("itemOriginalPrice",u||l?.originalPrice),n&&((0,c.setFieldValue)("itemUserComment",s.userComment),(0,c.setFieldValue)("itemDefectDescription",s.defectDescription),(0,c.setFieldValue)("itemLowestAcceptPrice",s.acceptPrice<=0?null:s.acceptPrice),(0,c.selectFieldValue)(itemCondition,s.condition)),m.id&&"Sold"===s.status&&(document.getElementById("priceSettings").style.display="none"),// Populate select fields
(0,c.selectFieldValue)(itemAge,s.age),(0,c.selectFieldValue)(itemColor,s.color||l?.color),R("itemColor",n,s.itemColorConfirm),itemCondition.selectedIndex>=0&&"Anv\xe4nd, tecken p\xe5 slitage"===itemCondition.options[itemCondition.selectedIndex].text&&(defectInfoDiv.style.display="block");let A=$("#itemCategory");A.val(s.category),A.trigger("change"),s.sex?(document.getElementById("Woman").previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById("Woman").checked=!1,document.getElementById(s.sex).previousElementSibling.classList.add("w--redirected-checked"),document.getElementById(s.sex).checked=!0):(document.getElementById("Woman").previousElementSibling.classList.add("w--redirected-checked"),document.getElementById("Woman").checked=!0),n&&f().forEach((e,t)=>{s.defects&&s.defects.includes(e)&&(document.getElementById(t).previousElementSibling.classList.add("w--redirected-checked"),document.getElementById(t).checked=!0)})}catch(e){console.error("Error getting item document:",e),errorHandler.report(e)}document.getElementById("loadingDiv").style.display="none"}let O={black:"Black",white:"White",gray:"Grey",blue:"Blue",dark_blue:"Navy","multicolor/colorful":"Multicolour",red:"Red",pink:"Pink",brown:"Brown",beige:"Beige",light_blue:"Blue",green:"Green",silver:"Silver",purple:"Purple",maroon:"Burgundy",gold:"Gold",orange:"Orange",yellow:"Yellow",teal:"Turquoise",olive:"Green",cyan:"Turquoise",magenta:"Pink",mustard:"Yellow"};async function H(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,i.uploadImageAndShowPreview)(t,"frontImage");if(!n||0===Object.keys(n).length)return;let r=[];r.push(W(n),J(n),(0,i.enhanceFrontImage)(n)),await Promise.all(r),N()}}async function j(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,i.uploadImageAndShowPreview)(t,"brandTagImage");(0,i.showDeleteImageIcon)("brandTagImage"),await J(n),N()}}async function G(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,i.uploadImageAndShowPreview)(t,"productImage");(0,i.showDeleteImageIcon)("productImage"),await J(n),N()}}async function q(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,i.uploadImageAndShowPreview)(t,"defectImage");(0,i.showDeleteImageIcon)("defectImage"),await J(n),N()}}async function z(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,i.uploadImageAndShowPreview)(t,"materialTagImage");(0,i.showDeleteImageIcon)("materialTagImage"),await J(n),N()}}async function V(e){let t=this.files[0];if(t){e.stopPropagation();let n=await (0,i.uploadImageAndShowPreview)(t,"extraImage");(0,i.showDeleteImageIcon)("extraImage"),await J(n),N()}}function K(e){e.currentTarget.setCustomValidity("");let t=e.currentTarget.parentNode.querySelector(".suggest-buttons")||e.currentTarget.parentNode.parentNode.querySelector(".suggest-buttons");t.style.display="none"}async function J(e){try{if(document.querySelector("#itemBrand").value.length&&document.querySelector("#itemMaterial").value.length&&document.querySelector("#itemSize").value.length&&document.querySelector("#itemModel").value.length)return;let t=await callBackendApi("/api/images/detectInfo",{data:{imageUrl:e,brand:itemBrand.value,color:itemColor.value},requiresAuth:!1});!document.querySelector("#itemBrand").value.length&&t.data?.brand&&(document.querySelector("#itemBrand").value=t.data.brand,document.querySelector("#itemBrand").setCustomValidity("Bekr\xe4fta eller \xe4ndra m\xe4rket"),document.getElementById("itemBrandLabel").style.display="inline-block",document.querySelector("#brandSuggestButtons").style.display="block",document.querySelector("#itemBrand").dispatchEvent(new Event("change")),await (0,c.displayFindModelDiv)(t.data.brand),analytics.track("Element Viewed",{elementID:"brandSuggestButtons"})),!document.querySelector("#itemMaterial").value.length&&t.data?.materials&&(document.querySelector("#itemMaterial").value=t.data.materials,document.querySelector("#itemMaterial").setCustomValidity("Bekr\xe4fta eller \xe4ndra materialet"),document.getElementById("itemMaterialLabel").style.display="inline-block",document.querySelector("#materialSuggestButtons").style.display="block",document.querySelector("#itemMaterial").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"materialSuggestButtons"})),!document.querySelector("#itemSize").value.length&&t.data?.size&&(document.querySelector("#itemSize").value=t.data.size,document.querySelector("#itemSize").setCustomValidity("Bekr\xe4fta eller \xe4ndra storlek"),document.getElementById("itemSizeLabel").style.display="inline-block",document.querySelector("#sizeSuggestButtons").style.display="block",document.querySelector("#itemSize").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"sizeSuggestButtons"})),!document.getElementById("itemModel").value.length&&t.data?.model&&("Eytys"===document.getElementById("itemBrand").value&&"Eytys"===t.data.model.brand?(0,c.showModelSuggestion)(t.data.model):localStorage.setItem("detectedModel",JSON.stringify(t.data.model)))}catch(e){errorHandler.report(e),console.log("Error calling detectItemBrandAndMaterialAndSize",e)}}async function W(e){if(""===document.querySelector("#itemColor").value)try{let t=await callBackendApi("/api/images/detectColor",{data:{imageUrl:e},requiresAuth:!1});if(!t.data?.colors||!t.data.colors.length){console.log("Unable to detect product color");return}if(t.data.colors.length>2)document.querySelector("#itemColor").value="Multicolour";else if(O[t.data.colors?.[0]])document.querySelector("#itemColor").value=O[t.data.colors?.[0]];else{console.log("Unable to set color from",t.data.colors?.[0]);return}document.querySelector("#itemColor").setCustomValidity("Bekr\xe4fta eller \xe4ndra f\xe4rgen"),document.querySelector("#colorSuggestButtons").style.display="block",document.querySelector("#itemColor").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"colorSuggestButtons"})}catch(e){errorHandler.report(e),console.log("Error calling detectItemColor",e)}}function Y(){localStorage.removeItem("detectedModel"),(0,c.removeSelectedModel)(),document.getElementById("findModelDiv").style.display="none",document.getElementById("clearItemForm").style.display="none",h().forEach(e=>{document.getElementById(`${e}Preview`).style.backgroundImage="",(0,i.showImageState)(e,"default-state")}),(0,c.setFieldValue)("itemBrand",null),Array.from(document.querySelectorAll(".suggest-buttons")).forEach(e=>e.style.display="none"),(0,c.setFieldValue)("itemSize",null),(0,c.setFieldValue)("itemMaterial",null),(0,c.setFieldValue)("itemModel",null),(0,c.setFieldValue)("itemOriginalPrice",null),(0,c.setFieldValue)("itemUserComment",null),(0,c.setFieldValue)("itemDefectDescription",null),(0,c.setFieldValue)("itemLowestAcceptPrice",null),(0,c.selectFieldValue)(itemAge,""),(0,c.selectFieldValue)(itemColor,""),(0,c.selectFieldValue)(itemCondition,""),defectInfoDiv.style.display="none";let e=$("#itemCategory");e.val(""),e.trigger("change"),// Populate radio-buttons
document.getElementById("Man").previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById("Man").checked=!1,document.getElementById("Unisex").previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById("Unisex").checked=!1,document.getElementById("Woman").previousElementSibling.classList.add("w--redirected-checked"),document.getElementById("Woman").checked=!0,// Populate checkboxes
f().forEach((e,t)=>{document.getElementById(t).previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById(t).checked=!1}),sessionStorage.removeItem("newItemId"),localStorage.removeItem("newItem")}function Z(e){let t=JSON.parse(localStorage.getItem("newItem"));delete t?.images?.[e],delete t?.images?.[`${e}Small`],localStorage.setItem("newItem",JSON.stringify(t))}let X=async e=>{let t=async e=>{let t=new Image;return t.crossOrigin="Anonymous",t.src=e,await t.decode(),t},n=e=>{let[t,n,r,a]=[e[0],e[1],e[2],e[3]];for(let i=4;i<e.length;i+=4)if(e[i]!==t||e[i+1]!==n||e[i+2]!==r||e[i+3]!==a)return!1;return!0};try{if(e.match(/nobg|no-bg/i))return!0;let r=await t(e),a=document.createElement("canvas"),i=a.getContext("2d",{willReadFrequently:!0});a.width=r.naturalWidth,a.height=r.naturalHeight,i.drawImage(r,0,0,r.naturalWidth,r.naturalHeight);let o=i.getImageData(0,0,r.naturalWidth,10).data,l=i.getImageData(0,r.naturalHeight,r.naturalWidth,-10).data,s=i.getImageData(0,0,10,r.naturalHeight).data,d=i.getImageData(r.naturalWidth,0,-10,r.naturalHeight).data;return n(o)&&n(l)&&n(s)&&n(d)}catch(e){// If we cannot load the image, play it safe and assume it is the no-bg image
return console.error(e),!0}};// Call sellItemMainAuthenticated after/when a user has logged in
user.whenSet(y),// Call sellItemMain directly
I()},{"./sellItemHelpers":"2G59s",qrcode:"6s2CO","./general":"1tOWF","./autocomplete-brands":"ljI8R","./sellItemModelSearch":"kdF4Q","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"2G59s":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"uploadTempImage",()=>l),r.export(n,"requestUniqueId",()=>c),r.export(n,"enhanceFrontImage",()=>u),r.export(n,"showDeleteImageIcon",()=>g),r.export(n,"rememberNewItemImageField",()=>f),r.export(n,"showImagePreview",()=>h),r.export(n,"capitalizeFirstLetter",()=>A),r.export(n,"uploadImageAndShowPreview",()=>p),r.export(n,"showImageError",()=>y),r.export(n,"hideImageError",()=>I),r.export(n,"showImageState",()=>B),r.export(n,"showLoadingIcon",()=>E),r.export(n,"checkBlockedOrLowShareSoldBrand",()=>v),r.export(n,"initializeCategorySelect",()=>b),r.export(n,"fieldLabelToggle",()=>w),r.export(n,"colorName",()=>C);var a=e("image-blob-reduce"),i=r.interopDefault(a);let o=(0,i.default)();async function l(e,t){try{return await s(e,t)}catch(n){if("ImageResizeError"!==n.name)// Retry once for upload errors
return console.error("Failed to upload image",n),errorHandler.report(n),await s(e,t);throw console.error("Failed to resize image",n),errorHandler.report(n),n;// Don't retry for resize errors
}}async function s(e,t){let n;sessionStorage.getItem("newItemId")||sessionStorage.setItem("newItemId",await c());let r=sessionStorage.getItem("newItemId");try{n=await d(e),console.log(`Resized image size: ${(n.size/1024/1024).toFixed(2)} MB`)}catch(t){let e=Error("Failed to resize image");throw e.name="ImageResizeError",e.originalError=t,e}if(!n)throw Error("Fel vid bearbetning av vald bild.");let a=new FormData;a.append("itemId",r),a.append("fileName",t),a.append("file",n),a.append("temporary","true"),a.append("generateSmallImage","true");let i=await fetch(`${BACKEND_API_URL}/api/items/${r}/uploadImage`,{method:"POST",body:a});if(!i.ok)throw Error(`HTTP error! status: ${i.status}`);return await i.json()}async function d(e){if(e.size<5242880)return Promise.resolve(e);try{return console.log("Attempting to scale image with image-blob-reduce"),await o.toBlob(e,{max:4032})}catch(e){throw console.error("Image scaling failed",e),Error("Unable to process image")}}async function c(){try{let e=await callBackendApi("/api/id",{method:"POST",requiresAuth:!1});return e.data.id}catch(e){return console.error(`Failed to fetch unique ID, generating uuidv4 id: ${e.message}`,e),uuidv4()}}async function u(e,t=!0){let n=await m(e);return n?.url&&(t&&f("enhancedFrontImage",n.url,n.urlSmall),h("frontImage",window.innerWidth<=370?n.urlSmall:n.url)),g("frontImage"),n}async function m(e){try{let t=await callBackendApi("/api/images/enhance",{data:{imageUrl:e},requiresAuth:!1,timeoutSec:30});return sessionStorage.setItem("enhancedFrontImage",t.data.url),t.data}catch(e){return errorHandler.report(e),console.error(e),""}}function g(e){document.getElementById(`loading${A(e)}Icon`).style.display="none",document.getElementById(`delete${A(e)}Icon`).style.display="inline-block","frontImage"===e&&(document.getElementById("enhancedAnimationDiv").style.display="none")}function f(e,t,n){let r=JSON.parse(localStorage.getItem("newItem")||JSON.stringify({})),a=r.images||{};a[e]=t,a[`${e}Small`]=n,r.images=a,localStorage.setItem("newItem",JSON.stringify(r))}function h(e,t){document.getElementById(`${e}Preview`).style.backgroundImage=`url('${t}')`,g(e)}function A(e){return e.charAt(0).toUpperCase()+e.slice(1)}async function p(e,t,n=!0){try{I(t);let r=URL.createObjectURL(e);document.getElementById(`${t}PreviewUploading`).style.backgroundImage=`url('${r}')`,document.getElementById(`${t}Preview`).style.backgroundImage=`url('${r}')`,E(t),B(t,"success-state");let{url:a,urlSmall:i}=await l(e,t);return n&&f(t,a,i),a}catch(n){console.error("Failed to upload image",n),errorHandler.report(n),document.getElementById(`${t}PreviewUploading`).style.backgroundImage="",document.getElementById(`${t}Preview`).style.backgroundImage="",document.getElementById(`loading${A(t)}Icon`).style.display="none",B(t,"default-state"),e.size>10485760?y(t,"Error: Bilden \xe4r f\xf6r stor. Max 10 MB."):y(t,"Error: N\xe5got gick fel vid uppladdning, f\xf6rs\xf6k igen eller kontakt oss om felet kvarst\xe5r."),document.getElementById(t).value=""}}function y(e,t){let n=document.getElementById(e).parentNode.parentNode;n.querySelector(".w-file-upload-error").style.display="block",n.querySelector(".w-file-upload-error-msg").innerText=t}function I(e){let t=document.getElementById(e).parentNode.parentNode;t.querySelector(".w-file-upload-error").style.display="none"}function B(e,t){let n=document.getElementById(e).parentNode.parentNode.childNodes;for(let e=0;e<n.length;e++)n[e].className.includes(t)?n[e].style.display="block":n[e].style.display="none"}function E(e){if("frontImage"===e){document.getElementById(`delete${A(e)}Icon`).style.display="none",document.getElementById(`loading${A(e)}Icon`).style.display="none",localStorage.getItem("sessionUser")||(document.getElementById("photoroomDiv").style.display="flex"),document.getElementById("enhancedAnimationDiv").style.display="block",triggerEnhancingAnimation.click();return}document.getElementById(`loading${A(e)}Icon`).style.display="inline-block",document.getElementById(`delete${A(e)}Icon`).style.display="none"}function v(e,t){let n=["shein","lager 157","divided","brandy melville","cubus","bubbleroom","bondelid","nelly","dobber","\xe5hl\xe9ns","kappahl","primark","jack & jones","sisters point","missguided","topman","bik bok","cubus","happy holly","zign","glamorous","hollister","river island","light before dark","bohoo","crocker","forever 21","maze","mint&berry","chiara forthi","zalando","din sko","pull & bear","svea","zoul","boohoo","gap","topshop","ellos","lager 157","stradivarius","studio total","indiska","bershka","shein","riley","vero moda","vila","don donna","aldo","new look denim"],r=document.getElementById("hardToSellDiv");document.getElementById("itemBrand").setCustomValidity("");let a=getParamsObject();return!a.id&&(n.includes(e.toLowerCase())||!["boots","dunjacka","jacka","k\xe4ngor","kappa","kavaj","kostym","p\xe4lsjacka","regnjacka","rock","skinnjacka","vinterskor"].includes(t?.toLowerCase())&&["tom tailor","monki","dressmann","urban outfitters","asos","holly & white","only","gina tricot"].includes(e.toLowerCase())||["baddr\xe4kt","bikini","bodysuit","chinos","flip-flops","halsduk","handduk","hatt","jeans","keps","l\xe5ng\xe4rmad t-shirt","linne","mjukisbyxor","morgonrock","m\xf6ssa","necess\xe4r","pik\xe9","pyjamas","sandaler","sarong","shorts","slips","sport-bh","strumpbyxor","t-shirt","tights","topp","tr\xe4ningsbyxor","tr\xe4ningstr\xf6ja","underst\xe4ll","vantar"].includes(t?.toLowerCase())&&["karl kani","rieker","uniqlo","carin wester","stockh lm","weekday","mango","wera","ichi","lindex","h&m","zara","mng","mq","cheap monday","h&m premium","na-kd","clarks","gant","hackett","hugo boss","la chemise","lacoste","lyle & scott","marc o'polo","melvin & hamilton","ray-ban","reebok","sebago","stenstr\xf6ms","the shirt factory","hampton republic","quicksilver","banana republic","pieces","sprit","denim","east west","xit","jacqueline de yong","mexx","fb sister","ok\xe4nt","bodyflirt","dorothy perkins","fransa","laurel","rut&circle","soc","junkyard","soyaconcept","amisu","u.s. polo assn.","line of oslo","gossip","i say","jascha stockholm","noisy may","six ames","velour by nostalgi","house of lola","fiveunits","miss me","flash","champion","under armour","oasis","fornarina","isolde","rosebud","chiquelle","kaffe","mckinley","cream","abercrombie & fitch","modstr\xf6m","ecco","esprit","alice bizous","craft","ellesse","wesc","dry lake","r\xf6hnisch","acqua limone","anna field","le","ax paris","burton","hansen & jacob","lou in love","mad lady","selected homme","tenson","whistles","zizzi","gerry weber"].includes(e.toLowerCase()))?(hardToSellText.innerHTML=n.includes(e.toLowerCase())?`Vi s\xe4ljer tyv\xe4rr inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`:`Vi s\xe4ljer tyv\xe4rr inte kategorin ${t} fr\xe5n ${e} p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`,stopIcon.style.display="flex",warningIcon.style.display="none",r.style.display="block",document.getElementById("itemBrand").setCustomValidity(n.includes(e.toLowerCase())?`Vi s\xe4ljer inte plagg fr\xe5n ${e}`:`Vi s\xe4ljer inte kategorin '${t}' fr\xe5n ${e}`),!0):["H&M","HM","Zara","ASOS","Nelly","Gina Tricot","BikBok","Bik Bok","Lindex","Kappahl","Cubus","NA-KD","NAKD","Mango","Ellos","Primark","Shein","Vila","Forever 21","Pull & Bear","Bershka","Stradivarius"].some(t=>e.toLowerCase().includes(t.toLowerCase()))?(hardToSellText.innerHTML=`Vi s\xe4ljer i regel inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5gt andrahandsv\xe4rde. Undantag kan finnas.`,stopIcon.style.display="none",warningIcon.style.display="block",r.style.display="block",!0):void(r.style.display="none")}function b(e="Kategori",t=v){$("#itemCategory").select2({selectionCssClass:"form-field",placeholder:e||"Kategori",data:[{id:"",text:""},{text:"\xd6verdelar",children:[{id:"Tr\xf6ja",text:"Tr\xf6ja"},{id:"Blus",text:"Blus"},{id:"Topp",text:"Topp"},{id:"Skjorta",text:"Skjorta"},{id:"Linneskjorta",text:"Linneskjorta"},{id:"T-shirt",text:"T-shirt"},{id:"Kavaj",text:"Kavaj"},{id:"Sweatshirt",text:"Sweatshirt"},{id:"Hoodie",text:"Hoodie"},{id:"Polotr\xf6ja",text:"Polotr\xf6ja"},{id:"Tunika",text:"Tunika"},{id:"V\xe4st",text:"V\xe4st"},{id:"Kofta",text:"Kofta"},{id:"Linne",text:"Linne"},{id:"Tr\xe4ningstr\xf6ja",text:"Tr\xe4ningstr\xf6ja"},{id:"Poncho",text:"Poncho"},{id:"Pik\xe9",text:"Pik\xe9"},{id:"L\xe5ng\xe4rmad T-shirt",text:"L\xe5ng\xe4rmad T-shirt"},{id:"Kostymv\xe4st",text:"Kostymv\xe4st"}]},{text:"Underdelar",children:[{id:"Kjol",text:"Kjol"},{id:"Byxor",text:"Byxor"},{id:"Jeans",text:"Jeans"},{id:"Chinos",text:"Chinos"},{id:"Fritidsbyxor",text:"Fritidsbyxor"},{id:"Tr\xe4ningsbyxor",text:"Tr\xe4ningsbyxor"},{id:"Tights",text:"Tights"},{id:"Strumpbyxor",text:"Strumpbyxor"},{id:"Mjukisbyxor",text:"Mjukisbyxor"},{id:"Kostymbyxor",text:"Kostymbyxor"},{id:"Shorts",text:"Shorts"},{id:"Sarong",text:"Sarong"}]},{text:"Helkropp",children:[{id:"Kl\xe4nning",text:"Kl\xe4nning"},{id:"Kaftan",text:"Kaftan"},{id:"Kostym",text:"Kostym"},{id:"Set",text:"Set"},{id:"Jumpsuit",text:"Jumpsuit"},{id:"Baddr\xe4kt",text:"Baddr\xe4kt"},{id:"Bikini",text:"Bikini"},{id:"Pyjamas",text:"Pyjamas"},{id:"Morgonrock",text:"Morgonrock"},{id:"Br\xf6llopskl\xe4nning",text:"Br\xf6llopskl\xe4nning"},{id:"Balkl\xe4nning",text:"Balkl\xe4nning"},{id:"Bodysuit",text:"Bodysuit"},{id:"Underst\xe4ll",text:"Underst\xe4ll"}]},{text:"Ytterkl\xe4der",children:[{id:"Jacka",text:"Jacka"},{id:"Kappa",text:"Kappa"},{id:"Rock",text:"Rock"},{id:"Fritidsjacka",text:"Fritidsjacka"},{id:"Trenchcoat",text:"Trenchcoat"},{id:"Skinnjacka",text:"Skinnjacka"},{id:"Dunjacka",text:"Dunjacka"},{id:"Regnjacka",text:"Regnjacka"},{id:"P\xe4lsjacka",text:"P\xe4lsjacka"}]},{text:"Skor",children:[{id:"Sneakers",text:"Sneakers"},{id:"Sandaler",text:"Sandaler"},{id:"Klackar",text:"Klackar"},{id:"Ballerinaskor",text:"Ballerinaskor"},{id:"Loafers",text:"Loafers"},{id:"Flip-flops",text:"Flip-flops"},{id:"Boots",text:"Boots"},{id:"K\xe4ngor",text:"K\xe4ngor"},{id:"Vinterskor",text:"Vinterskor"},{id:"Skor",text:"Annat (Skor)"}]},{text:"V\xe4skor",children:[{id:"Axelremsv\xe4ska",text:"Axelremsv\xe4ska"},{id:"Handv\xe4ska",text:"Handv\xe4ska"},{id:"Kuvertv\xe4ska",text:"Kuvertv\xe4ska"},{id:"Ryggs\xe4ck",text:"Ryggs\xe4ck"},{id:"Tr\xe4ningsv\xe4ska",text:"Tr\xe4ningsv\xe4ska"},{id:"Resv\xe4ska",text:"Resv\xe4ska"},{id:"Datorv\xe4ska",text:"Datorv\xe4ska"},{id:"V\xe4ska",text:"Annat (V\xe4ska)"}]},{text:"Accessoarer",children:[{id:"Solglas\xf6gon",text:"Solglas\xf6gon"},{id:"Glas\xf6gon",text:"Glas\xf6gon"},{id:"\xd6rh\xe4nge",text:"\xd6rh\xe4nge"},{id:"Halsband",text:"Halsband"},{id:"Armband",text:"Armband"},{id:"Ring",text:"Ring"},{id:"Brosch",text:"Brosch"},{id:"Keps",text:"Keps"},{id:"Sjal",text:"Sjal"},{id:"Krage",text:"Krage"},{id:"B\xe4lte",text:"B\xe4lte"},{id:"Pl\xe5nbok",text:"Pl\xe5nbok"},{id:"Halsduk",text:"Halsduk"},{id:"Hatt",text:"Hatt"},{id:"M\xf6ssa",text:"M\xf6ssa"},{id:"Vantar",text:"Vantar"},{id:"Necess\xe4r",text:"Necess\xe4r"},{id:"Slips",text:"Slips"},{id:"Handduk",text:"Handduk"},{id:"Klocka",text:"Klocka"}]}]}),$("body").on("click",".select2-container--open .select2-results__group",function(){$(this).parent().attr("class").match(/expanded-group/)?$(this).parent().removeClass("expanded-group"):($(".expanded-group").first().removeClass("expanded-group"),$(this).parent().addClass("expanded-group"))});let n=!1;$("#itemCategory").on("select2:select",()=>{analytics.track("Click",{elementID:"itemCategoryValue"}),document.querySelector("#itemCategory").dispatchEvent(new Event("change"))});let r=!1;$("#itemCategory").on("select2:open",()=>{r||(r=!0,$("input.select2-search__field").on("click",()=>{analytics.track("Click",{elementID:"itemCategorySearch"})}))}),$("#itemCategory").on("select2:close",()=>{document.querySelector("body").style.overflow="auto",document.querySelector("body").style.position="static",document.querySelector("html").style.overflow="static"}),$("#itemCategory").on("select2:open",function(){analytics.track("Element Viewed",{elementID:"itemCategoryContainer"}),document.querySelector("body").style.overflow="hidden",document.querySelector("body").style.position="fixed",document.querySelector("html").style.overflow="fixed";let e=document.querySelector(".select2-search__field");if(e.placeholder="S\xf6k... (t.ex. Kl\xe4nning/Sneakers/Blus)",$(".select2-search__field").on("input",e=>{e.target.value.length>0?$(".select2-results__option[role=group]").each((e,t)=>$(t).addClass("expanded-group")):$(".expanded-group").each((e,t)=>$(t).removeClass("expanded-group"))}),!n){let e=document.getElementById("categoryPopUpHeader"),t=document.querySelector(".select2-dropdown");t.insertBefore(e,t.firstChild),e.style.display="block",e.querySelector("#categorySelectClose").onclick=()=>$("#itemCategory").select2("close"),n=!0}document.querySelector(".select2-results__options").addEventListener("scroll",()=>document.activeElement.blur())}),$("#itemCategory").on("change",e=>{w("itemCategoryLabel")(e);let n=document.getElementById("itemCategory"),r=document.getElementById("itemBrand");t(r.value,n.value)}),// From https://github.com/select2/select2/issues/3015#issuecomment-570171720
$("#itemCategory").on("select2:open",function(){$(".select2-results").css("visibility","hidden")}),$("#itemCategory").on("select2:opening",function(){setTimeout(function(){$(".select2-results").css("visibility","visible")},50)})}function w(e){return t=>{document.getElementById(e).style.display=t.target.value.length>0?"inline-block":"none"}}function C(e){return({Beige:"Beige",Blue:"Bl\xe5",Brown:"Brun",Green:"Gr\xf6n",Grey:"Gr\xe5",Yellow:"Gul",Gold:"Guld",Purple:"Lila",Navy:"Navy",Orange:"Orange",Pink:"Rosa",Red:"R\xf6d",Silver:"Silver",Black:"Svart",Turquoise:"Turkos",Burgundy:"Vinr\xf6d",White:"Vit",Multicolour:"Flerf\xe4rgad"})[e]||e}},{"image-blob-reduce":"5kCCl","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"5kCCl":[function(e,t,n){/*! image-blob-reduce 4.1.0 https://github.com/nodeca/image-blob-reduce @license MIT */var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function a(e){throw Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}r.defineInteropFlag(n),r.export(n,"default",()=>A);var i={};function o(e,t){var n={};return t.forEach(function(t){Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}),n}i.assign=function(e){for(var t,n=1;n<arguments.length;n++)for(var r in t=Object(arguments[n]))Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},i.pick=o,i.pick_pica_resize_options=function(e){return o(e,["alpha","unsharpAmount","unsharpRadius","unsharpThreshold","cancelToken"])};var l={exports:{}};l.exports=(function e(t,n,r){function i(l,s){if(!n[l]){if(!t[l]){if(!s&&a)return a(l,!0);if(o)return o(l,!0);var d=Error("Cannot find module '"+l+"'");throw d.code="MODULE_NOT_FOUND",d}var c=n[l]={exports:{}};t[l][0].call(c.exports,function(e){return i(t[l][1][e]||e)},c,c.exports,e,t,n,r)}return n[l].exports}for(var o=a,l=0;l<r.length;l++)i(r[l]);return i})({1:[function(e,t,n){var r=e("multimath"),a=e("./mm_unsharp_mask"),i=e("./mm_resize");function o(e){var t=e||[],n={js:t.indexOf("js")>=0,wasm:t.indexOf("wasm")>=0};r.call(this,n),this.features={js:n.js,wasm:n.wasm&&this.has_wasm()},this.use(a),this.use(i)}o.prototype=Object.create(r.prototype),o.prototype.constructor=o,o.prototype.resizeAndUnsharp=function(e,t){var n=this.resize(e,t);return e.unsharpAmount&&this.unsharp_mask(n,e.toWidth,e.toHeight,e.unsharpAmount,e.unsharpRadius,e.unsharpThreshold),n},t.exports=o},{"./mm_resize":4,"./mm_unsharp_mask":9,multimath:19}],2:[function(e,t,n){//var FIXED_FRAC_BITS = 14;
function r(e){return e<0?0:e>255?255:e}function a(e){return e>=0?e:0}// Convolve image data in horizontal direction. Can be used for:
t.exports={convolveHor://
// 1. bitmap with premultiplied alpha
// 2. bitmap without alpha (all values 255)
//
// Notes:
//
// - output is transposed
// - output resolution is ~15 bits per channel(for better precision).
//
function(e,t,n,r,i,o){var l,s,d,c,u,m,g,f,h,A,p,y=0,I=0;// For each row
for(h=0;h<r;h++){for(A=0,u=0;A<i;A++){for(// Get the filter that determines the current output pixel.
m=o[u++],g=o[u++],f=y+4*m|0,l=s=d=c=0;g>0;g--)// Big thanks to @mraleph (Vyacheslav Egorov) for the tip.
c=c+(p=o[u++])*e[f+3]|0,d=d+p*e[f+2]|0,s=s+p*e[f+1]|0,l=l+p*e[f]|0,f=f+4|0;// Store 15 bits between passes for better precision
// Instead of shift to 14 (FIXED_FRAC_BITS), shift to 7 only
//
t[I+3]=a(c>>7),t[I+2]=a(d>>7),t[I+1]=a(s>>7),t[I]=a(l>>7),I=I+4*r|0}I=(h+1)*4|0,y=(h+1)*n*4|0}}// Supplementary method for `convolveHor()`
,convolveVert://
function(e,t,n,a,i,o){var l,s,d,c,u,m,g,f,h,A,p,y=0,I=0;// For each row
for(h=0;h<a;h++){for(A=0,u=0;A<i;A++){for(// Get the filter that determines the current output pixel.
m=o[u++],g=o[u++],f=y+4*m|0,l=s=d=c=0;g>0;g--)// Big thanks to @mraleph (Vyacheslav Egorov) for the tip.
c=c+(p=o[u++])*e[f+3]|0,d=d+p*e[f+2]|0,s=s+p*e[f+1]|0,l=l+p*e[f]|0,f=f+4|0;// Sync with premultiplied version for exact result match
l>>=7,s>>=7,d>>=7,c>>=7,//
t[I+3]=r(c+8192>>14),t[I+2]=r(d+8192>>14),t[I+1]=r(s+8192>>14),t[I]=r(l+8192>>14),I=I+4*a|0}I=(h+1)*4|0,y=(h+1)*n*4|0}}// Premultiply & convolve image data in horizontal direction. Can be used for:
,convolveHorWithPre://
// - Any bitmap data, extracted with `.getImageData()` method (with
//   non-premultiplied alpha)
//
// For images without alpha channel this method is slower than `convolveHor()`
//
function(e,t,n,r,i,o){var l,s,d,c,u,m,g,f,h,A,p,y,I=0,B=0;// For each row
for(A=0;A<r;A++){for(p=0,m=0;p<i;p++){for(// Get the filter that determines the current output pixel.
g=o[m++],f=o[m++],h=I+4*g|0,l=s=d=c=0;f>0;f--)c=c+(y=o[m++])*// Big thanks to @mraleph (Vyacheslav Egorov) for the tip.
(u=e[h+3])|0,d=d+y*e[h+2]*u|0,s=s+y*e[h+1]*u|0,l=l+y*e[h]*u|0,h=h+4|0;// Premultiply is (* alpha / 255).
// Postpone division for better performance
d=d/255|0,s=s/255|0,l=l/255|0,// Instead of shift to 14 (FIXED_FRAC_BITS), shift to 7 only
//
t[B+3]=a(c>>7),t[B+2]=a(d>>7),t[B+1]=a(s>>7),t[B]=a(l>>7),B=B+4*r|0}B=(A+1)*4|0,I=(A+1)*n*4|0}}// Supplementary method for `convolveHorWithPre()`
,convolveVertWithPre://
function(e,t,n,a,i,o){var l,s,d,c,u,m,g,f,h,A,p,y=0,I=0;// For each row
for(h=0;h<a;h++){for(A=0,u=0;A<i;A++){for(// Get the filter that determines the current output pixel.
m=o[u++],g=o[u++],f=y+4*m|0,l=s=d=c=0;g>0;g--)// Big thanks to @mraleph (Vyacheslav Egorov) for the tip.
c=c+(p=o[u++])*e[f+3]|0,d=d+p*e[f+2]|0,s=s+p*e[f+1]|0,l=l+p*e[f]|0,f=f+4|0;// Downscale to leave room for un-premultiply
l>>=7,s>>=7,d>>=7,c>>=7,(c=r(c+8192>>14))>0&&(l=255*l/c|0,s=255*s/c|0,d=255*d/c|0),// Shift value = FIXED_FRAC_BITS + 7
//
t[I+3]=c,t[I+2]=r(d+8192>>14),t[I+1]=r(s+8192>>14),t[I]=r(l+8192>>14),I=I+4*a|0}I=(h+1)*4|0,y=(h+1)*n*4|0}}}},{}],3:[function(e,t,n){/* eslint-disable max-len */t.exports="AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEYA2AGf39/f39/AGAAAGAIf39/f39/f38AAg8BA2VudgZtZW1vcnkCAAADBwYBAAAAAAIGBgF/AEEACweUAQgRX193YXNtX2NhbGxfY3RvcnMAAAtjb252b2x2ZUhvcgABDGNvbnZvbHZlVmVydAACEmNvbnZvbHZlSG9yV2l0aFByZQADE2NvbnZvbHZlVmVydFdpdGhQcmUABApjb252b2x2ZUhWAAUMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAKyA4GAwABC4wDARB/AkAgA0UNACAERQ0AIANBAnQhFQNAQQAhE0EAIQsDQCALQQJqIQcCfyALQQF0IAVqIgYuAQIiC0UEQEEAIQhBACEGQQAhCUEAIQogBwwBCyASIAYuAQBqIQhBACEJQQAhCiALIRRBACEOIAchBkEAIQ8DQCAFIAZBAXRqLgEAIhAgACAIQQJ0aigCACIRQRh2bCAPaiEPIBFB/wFxIBBsIAlqIQkgEUEQdkH/AXEgEGwgDmohDiARQQh2Qf8BcSAQbCAKaiEKIAhBAWohCCAGQQFqIQYgFEEBayIUDQALIAlBB3UhCCAKQQd1IQYgDkEHdSEJIA9BB3UhCiAHIAtqCyELIAEgDEEBdCIHaiAIQQAgCEEAShs7AQAgASAHQQJyaiAGQQAgBkEAShs7AQAgASAHQQRyaiAJQQAgCUEAShs7AQAgASAHQQZyaiAKQQAgCkEAShs7AQAgDCAVaiEMIBNBAWoiEyAERw0ACyANQQFqIg0gAmwhEiANQQJ0IQwgAyANRw0ACwsL2gMBD38CQCADRQ0AIARFDQAgAkECdCEUA0AgCyEMQQAhE0EAIQIDQCACQQJqIQYCfyACQQF0IAVqIgcuAQIiAkUEQEEAIQhBACEHQQAhCkEAIQkgBgwBCyAHLgEAQQJ0IBJqIQhBACEJIAIhCkEAIQ0gBiEHQQAhDkEAIQ8DQCAFIAdBAXRqLgEAIhAgACAIQQF0IhFqLwEAbCAJaiEJIAAgEUEGcmovAQAgEGwgDmohDiAAIBFBBHJqLwEAIBBsIA9qIQ8gACARQQJyai8BACAQbCANaiENIAhBBGohCCAHQQFqIQcgCkEBayIKDQALIAlBB3UhCCANQQd1IQcgDkEHdSEKIA9BB3UhCSACIAZqCyECIAEgDEECdGogB0GAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQQh0QYD+A3EgCUGAQGtBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobQRB0QYCA/AdxIApBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBgEBrQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG3I2AgAgAyAMaiEMIBNBAWoiEyAERw0ACyAUIAtBAWoiC2whEiADIAtHDQALCwuSAwEQfwJAIANFDQAgBEUNACADQQJ0IRUDQEEAIRNBACEGA0AgBkECaiEIAn8gBkEBdCAFaiIGLgECIgdFBEBBACEJQQAhDEEAIQ1BACEOIAgMAQsgEiAGLgEAaiEJQQAhDkEAIQ1BACEMIAchFEEAIQ8gCCEGA0AgBSAGQQF0ai4BACAAIAlBAnRqKAIAIhBBGHZsIhEgD2ohDyARIBBBEHZB/wFxbCAMaiEMIBEgEEEIdkH/AXFsIA1qIQ0gESAQQf8BcWwgDmohDiAJQQFqIQkgBkEBaiEGIBRBAWsiFA0ACyAPQQd1IQkgByAIagshBiABIApBAXQiCGogDkH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEECcmogDUH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEEcmogDEH/AW1BB3UiB0EAIAdBAEobOwEAIAEgCEEGcmogCUEAIAlBAEobOwEAIAogFWohCiATQQFqIhMgBEcNAAsgC0EBaiILIAJsIRIgC0ECdCEKIAMgC0cNAAsLC4IEAQ9/AkAgA0UNACAERQ0AIAJBAnQhFANAIAshDEEAIRJBACEHA0AgB0ECaiEKAn8gB0EBdCAFaiICLgECIhNFBEBBACEIQQAhCUEAIQYgCiEHQQAMAQsgAi4BAEECdCARaiEJQQAhByATIQJBACENIAohBkEAIQ5BACEPA0AgBSAGQQF0ai4BACIIIAAgCUEBdCIQai8BAGwgB2ohByAAIBBBBnJqLwEAIAhsIA5qIQ4gACAQQQRyai8BACAIbCAPaiEPIAAgEEECcmovAQAgCGwgDWohDSAJQQRqIQkgBkEBaiEGIAJBAWsiAg0ACyAHQQd1IQggDUEHdSEJIA9BB3UhBiAKIBNqIQcgDkEHdQtBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKGyIKQf8BcQRAIAlB/wFsIAJtIQkgCEH/AWwgAm0hCCAGQf8BbCACbSEGCyABIAxBAnRqIAlBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EIdEGA/gNxIAZBgEBrQQ51IgJB/wEgAkH/AUgbIgJBACACQQBKG0EQdEGAgPwHcSAKQRh0ciAIQYBAa0EOdSICQf8BIAJB/wFIGyICQQAgAkEAShtycjYCACADIAxqIQwgEkEBaiISIARHDQALIBQgC0EBaiILbCERIAMgC0cNAAsLC0AAIAcEQEEAIAIgAyAEIAUgABADIAJBACAEIAUgBiABEAQPC0EAIAIgAyAEIAUgABABIAJBACAEIAUgBiABEAIL"},{}],4:[function(e,t,n){t.exports={name:"resize",fn:e("./resize"),wasm_fn:e("./resize_wasm"),wasm_src:e("./convolve_wasm_base64")}},{"./convolve_wasm_base64":3,"./resize":5,"./resize_wasm":8}],5:[function(e,t,n){var r=e("./resize_filter_gen"),a=e("./convolve"),i=a.convolveHor,o=a.convolveVert,l=a.convolveHorWithPre,s=a.convolveVertWithPre;t.exports=function(e){var t=e.src,n=e.width,a=e.height,d=e.toWidth,c=e.toHeight,u=e.scaleX||e.toWidth/e.width,m=e.scaleY||e.toHeight/e.height,g=e.offsetX||0,f=e.offsetY||0,h=e.dest||new Uint8Array(d*c*4),A=void 0===e.filter?"mks2013":e.filter,p=r(A,n,d,u,g),y=r(A,a,c,m,f),I=new Uint16Array(d*a*4);return!function(e,t,n){for(var r=3,a=t*n*4|0;r<a;){if(255!==e[r])return!0;r=r+4|0}return!1}(t,n,a)?(i(t,I,n,a,d,p),o(I,h,a,d,c,y),function(e,t,n){for(var r=3,a=t*n*4|0;r<a;)e[r]=255,r=r+4|0}(h,d,c)):(l(t,I,n,a,d,p),s(I,h,a,d,c,y)),h}},{"./convolve":2,"./resize_filter_gen":6}],6:[function(e,t,n){var r=e("./resize_filter_info");// Precision of fixed FP values
function a(e){return Math.round(16383*e)}t.exports=function(e,t,n,i,o){var l,s,d,c,u,m,g,f,h,A,p,y,I,B,E,v,b,w=r.filter[e].fn,C=1/i,x=Math.min(1,i),S=r.filter[e].win/x,k=new Int16Array((Math.floor((S+1)*2)+2)*n),M=0,_=!k.subarray||!k.set;for(l=0;l<n;l++){for(d=Math.max(0,Math.floor(// Scaling should be done relative to central pixel point
(s=(l+.5)*C+o)-S)),u=(c=Math.min(t-1,Math.ceil(s+S)))-d+1,m=new Float32Array(u),g=new Int16Array(u),f=0,h=d,A=0;h<=c;h++,A++)f+=p=w((h+.5-s)*x),m[A]=p;// Normalize filter, convert to fixed point and accumulate conversion error
for(A=0,y=0;A<m.length;A++)y+=I=m[A]/f,g[A]=a(I);// Compensate normalization error, to minimize brightness drift
for(g[n>>1]+=a(1-y),// Now pack filter to useable form
//
// 1. Trim heading and tailing zero values, and compensate shitf/length
// 2. Put all to single array in this format:
//
//    [ pos shift, data length, value1, value2, value3, ... ]
//
B=0;B<g.length&&0===g[B];)B++;if(B<g.length){for(E=g.length-1;E>0&&0===g[E];)E--;if(v=d+B,b=E-B+1,k[M++]=v,k[M++]=b,_)for(A=B;A<=E;A++)k[M++]=g[A];else k.set(g.subarray(B,E+1),M),M+=b}else // zero data, write header only
k[M++]=0,k[M++]=0}return k}},{"./resize_filter_info":7}],7:[function(e,t,n){t.exports={filter:{// Nearest neibor
box:{win:.5,fn:function(e){return e<0&&(e=-e),e<.5?1:0}},// // Hamming
hamming:{win:1,fn:function(e){if(e<0&&(e=-e),e>=1)return 0;if(e<11920929e-14)return 1;var t=e*Math.PI;return Math.sin(t)/t*(.54+.46*Math.cos(t/1))}},// Lanczos, win = 2
lanczos2:{win:2,fn:function(e){if(e<0&&(e=-e),e>=2)return 0;if(e<11920929e-14)return 1;var t=e*Math.PI;return Math.sin(t)/t*Math.sin(t/2)/(t/2)}},// Lanczos, win = 3
lanczos3:{win:3,fn:function(e){if(e<0&&(e=-e),e>=3)return 0;if(e<11920929e-14)return 1;var t=e*Math.PI;return Math.sin(t)/t*Math.sin(t/3)/(t/3)}},// Magic Kernel Sharp 2013, win = 2.5
// http://johncostella.com/magic/
mks2013:{win:2.5,fn:function(e){return(e<0&&(e=-e),e>=2.5)?0:e>=1.5?-.125*(e-2.5)*(e-2.5):e>=.5?.25*(4*e*e-11*e+7):1.0625-1.75*e*e}}},// Legacy mapping
f2q:{box:0,hamming:1,lanczos2:2,lanczos3:3},q2f:["box","hamming","lanczos2","lanczos3"]}},{}],8:[function(e,t,n){var r=e("./resize_filter_gen"),a=!0;try{a=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0]}catch(e){}function i(e,t,n){if(a){t.set(new Uint8Array(e.buffer,0,e.byteLength),n);return}for(var r=n,i=0;i<e.length;i++){var o=e[i];t[r++]=255&o,t[r++]=o>>8&255}}t.exports=function(e){var t=e.src,n=e.width,a=e.height,o=e.toWidth,l=e.toHeight,s=e.scaleX||e.toWidth/e.width,d=e.scaleY||e.toHeight/e.height,c=e.offsetX||0,u=e.offsetY||0,m=e.dest||new Uint8Array(o*l*4),g=void 0===e.filter?"mks2013":e.filter,f=r(g,n,o,s,c),h=r(g,a,l,d,u),A=Math.max(t.byteLength,m.byteLength),p=this.__align(0+A),y=a*o*8,I=this.__align(p+y),B=this.__align(I+f.byteLength),E=B+h.byteLength,v=this.__instance("resize",E),b=new Uint8Array(this.__memory.buffer),w=new Uint32Array(this.__memory.buffer),C=new Uint32Array(t.buffer);w.set(C),// speed difference is not significant vs direct .set()
i(f,b,I),i(h,b,B);// emsdk does method names with '_'
var x=v.exports.convolveHV||v.exports._convolveHV;return!function(e,t,n){for(var r=3,a=t*n*4|0;r<a;){if(255!==e[r])return!0;r=r+4|0}return!1}(t,n,a)?(x(I,B,p,n,a,o,l,0),function(e,t,n){for(var r=3,a=t*n*4|0;r<a;)e[r]=255,r=r+4|0}(m,o,l)):x(I,B,p,n,a,o,l,1),new Uint32Array(m.buffer).set(new Uint32Array(this.__memory.buffer,0,l*o)),m}},{"./resize_filter_gen":6}],9:[function(e,t,n){t.exports={name:"unsharp_mask",fn:e("./unsharp_mask"),wasm_fn:e("./unsharp_mask_wasm"),wasm_src:e("./unsharp_mask_wasm_base64")}},{"./unsharp_mask":10,"./unsharp_mask_wasm":11,"./unsharp_mask_wasm_base64":12}],10:[function(e,t,n){var r=e("glur/mono16");t.exports=function(e,t,n,a,i,o){if(0!==a&&!(i<.5)){i>2&&(i=2);var l,s,d,c,u,m=function(e,t,n){for(var r,a,i,o,l=t*n,s=new Uint16Array(l),d=0;d<l;d++)r=e[4*d],a=e[4*d+1],i=e[4*d+2],o=r>=a&&r>=i?r:a>=i&&a>=r?a:i,s[d]=o<<8;return s}(e,t,n),g=new Uint16Array(m);r(g,t,n,i);/* eslint-disable indent */for(var f=a/100*4096+.5|0,h=o<<8,A=t*n,p=0;p<A;p++)Math.abs(c=(l=m[p])-g[p])>=h&&(// in RGB by the same constant (same for HSL), see also:
// https://beesbuzz.biz/code/16-hsv-color-transforms
d=((s=// [255.003 .. 255.996] (FF01-FFFF). This allows to round this value as (x+.5)|0
// later without overflowing.
(s=// add unsharp mask to the brightness channel
(s=l+(f*c+2048>>12))>65280?65280:s)<0?0:s)<<12)/// change this value (because diff between colors gets inflated), so no need to verify correctness.
(l=0!==l?l:1)|0,e[//  - all numbers are positive
//  - r,g,b <= (v1/256)
//  - r,g,b,(v1/256),(v2/256) <= 255
// So highest this number can get is X*255/X+0.5=255.5 which is < 256 and rounds down.
u=4*p]=e[u]*d+2048>>12,e[u+1]=e[u+1]*d+2048>>12,e[u+2]=e[u+2]*d+2048>>12)}}},{"glur/mono16":18}],11:[function(e,t,n){t.exports=function(e,t,n,r,a,i){if(0!==r&&!(a<.5)){a>2&&(a=2);var o=t*n,l=4*o,s=2*o,d=2*o,c=4*Math.max(t,n),u=l+s,m=u+d,g=m+d,f=g+c,h=this.__instance("unsharp_mask",l+s+2*d+c+32,{exp:Math.exp}),A=new Uint32Array(e.buffer);new Uint32Array(this.__memory.buffer).set(A);var p=h.exports.hsv_v16||h.exports._hsv_v16;p(0,l,t,n),(p=h.exports.blurMono16||h.exports._blurMono16)(l,u,m,g,f,t,n,a),(p=h.exports.unsharp||h.exports._unsharp)(0,0,l,u,t,n,r,i),A.set(new Uint32Array(this.__memory.buffer,0,o))}}},{}],12:[function(e,t,n){/* eslint-disable max-len */t.exports="AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL"},{}],13:[function(e,t,n){function r(e,t){this.create=e,this.available=[],this.acquired={},this.lastId=1,this.timeoutId=0,this.idle=t||2e3}r.prototype.acquire=function(){var e,t=this;return 0!==this.available.length?e=this.available.pop():((e=this.create()).id=this.lastId++,e.release=function(){return t.release(e)}),this.acquired[e.id]=e,e},r.prototype.release=function(e){var t=this;delete this.acquired[e.id],e.lastUsed=Date.now(),this.available.push(e),0===this.timeoutId&&(this.timeoutId=setTimeout(function(){return t.gc()},100))},r.prototype.gc=function(){var e=this,t=Date.now();this.available=this.available.filter(function(n){return!(t-n.lastUsed>e.idle)||(n.destroy(),!1)}),0!==this.available.length?this.timeoutId=setTimeout(function(){return e.gc()},100):this.timeoutId=0},t.exports=r},{}],14:[function(e,t,n){t.exports=function(e,t,n,r,a,i){var o=n/e,l=r/t,s=(2*i+2+1)/a;// it could only happen because of invalid options
if(s>.5)return[[n,r]];var d=Math.ceil(Math.log(Math.min(o,l))/Math.log(s));// no additional resizes are necessary,
// stageCount can be zero or be negative when enlarging the image
if(d<=1)return[[n,r]];for(var c=[],u=0;u<d;u++){var m=Math.round(Math.pow(Math.pow(e,d-u-1)*Math.pow(n,u+1),1/d)),g=Math.round(Math.pow(Math.pow(t,d-u-1)*Math.pow(r,u+1),1/d));c.push([m,g])}return c}},{}],15:[function(e,t,n){function r(e){var t=Math.round(e);return 1e-5>Math.abs(e-t)?t:Math.floor(e)}function a(e){var t=Math.round(e);return 1e-5>Math.abs(e-t)?t:Math.ceil(e)}t.exports=function(e){var t,n,i,o,l,s,d=e.toWidth/e.width,c=e.toHeight/e.height,u=r(e.srcTileSize*d)-2*e.destTileBorder,m=r(e.srcTileSize*c)-2*e.destTileBorder;if(u<1||m<1)throw Error("Internal error in pica: target tile width/height is too small.");var g=[];// doesn in the browser
for(o=0;o<e.toHeight;o+=m)for(i=0;i<e.toWidth;i+=u)(t=i-e.destTileBorder)<0&&(t=0),l=i+u+e.destTileBorder-t,t+l>=e.toWidth&&(l=e.toWidth-t),(n=o-e.destTileBorder)<0&&(n=0),s=o+m+e.destTileBorder-n,n+s>=e.toHeight&&(s=e.toHeight-n),g.push({toX:t,toY:n,toWidth:l,toHeight:s,toInnerX:i,toInnerY:o,toInnerWidth:u,toInnerHeight:m,offsetX:t/d-r(t/d),offsetY:n/c-r(n/c),scaleX:d,scaleY:c,x:r(t/d),y:r(n/c),width:a(l/d),height:a(s/c)});return g}},{}],16:[function(e,t,n){function r(e){return Object.prototype.toString.call(e)}t.exports.isCanvas=function(e){var t=r(e);return"[object HTMLCanvasElement]"===t||"[object OffscreenCanvas]"===t||"[object Canvas]"/* node-canvas */===t},t.exports.isImage=function(e){return"[object HTMLImageElement]"===r(e)},t.exports.isImageBitmap=function(e){return"[object ImageBitmap]"===r(e)},t.exports.limiter=function(e){var t=0,n=[];function r(){t<e&&n.length&&(t++,n.shift()())}return function(e){return new Promise(function(a,i){n.push(function(){e().then(function(e){a(e),t--,r()},function(e){i(e),t--,r()})}),r()})}},t.exports.cib_quality_name=function(e){switch(e){case 0:return"pixelated";case 1:return"low";case 2:return"medium"}return"high"},t.exports.cib_support=function(e){return Promise.resolve().then(function(){if("undefined"==typeof createImageBitmap)return!1;var t=e(100,100);return createImageBitmap(t,0,0,100,100,{resizeWidth:10,resizeHeight:10,resizeQuality:"high"}).then(function(e){var n=10===e.width;// Branch below is filtered on upper level. We do not call resize
return(// detection for basic ImageBitmap.
//
// https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
// old Crome 51 has ImageBitmap without .close(). Then this code
// will throw and return 'false' as expected.
//
e.close(),t=null,n)})}).catch(function(){return!1})},t.exports.worker_offscreen_canvas_support=function(){return new Promise(function(e,t){if("undefined"==typeof OffscreenCanvas){// if OffscreenCanvas is present, we assume browser supports Worker and built-in Promise as well
e(!1);return}var n=btoa("(".concat((function(e){if("undefined"==typeof createImageBitmap){e.postMessage(!1);return}Promise.resolve().then(function(){var e=new OffscreenCanvas(10,10);// test that 2d context can be used in worker
return e.getContext("2d").rect(0,0,1,1),createImageBitmap(e,0,0,1,1)}).then(function(){return e.postMessage(!0)},function(){return e.postMessage(!1)})}).toString(),")(self);")),r=new Worker("data:text/javascript;base64,".concat(n));r.onmessage=function(t){return e(t.data)},r.onerror=t}).then(function(e){return e},function(){return!1})},// FireFox randomizes the output of that function in `privacy.resistFingerprinting` mode
t.exports.can_use_canvas=function(e){var t=!1;try{var n=e(2,1).getContext("2d"),r=n.createImageData(2,1);r.data[0]=12,r.data[1]=23,r.data[2]=34,r.data[3]=255,r.data[4]=45,r.data[5]=56,r.data[6]=67,r.data[7]=255,n.putImageData(r,0,0),r=null,r=n.getImageData(0,0,2,1),12===r.data[0]&&23===r.data[1]&&34===r.data[2]&&255===r.data[3]&&45===r.data[4]&&56===r.data[5]&&67===r.data[6]&&255===r.data[7]&&(t=!0)}catch(e){}return t},// with JPEG images oriented with Exif;
// https://bugs.chromium.org/p/chromium/issues/detail?id=1220671
// TODO: remove after it's fixed in chrome for at least 2 releases
t.exports.cib_can_use_region=function(){return new Promise(function(e){if("undefined"==typeof createImageBitmap){e(!1);return}var t=new Image;t.src="data:image/jpeg;base64,/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRcZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z",t.onload=function(){createImageBitmap(t,0,0,t.width,t.height).then(function(n){n.width===t.width&&n.height===t.height?e(!0):e(!1)},function(){return e(!1)})},t.onerror=function(){return e(!1)}})}},{}],17:[function(e,t,n){t.exports=function(){var t,n=e("./mathlib");/* eslint-disable no-undef */onmessage=function(e){var r=e.data.opts;if(!r.src&&r.srcBitmap){var a=new OffscreenCanvas(r.width,r.height),i=a.getContext("2d");i.drawImage(r.srcBitmap,0,0),r.src=i.getImageData(0,0,r.width,r.height).data,a.width=a.height=0,a=null,r.srcBitmap.close(),r.srcBitmap=null;// https://github.com/nodeca/pica/issues/223
// returnBitmap = true;
}t||(t=new n(e.data.features));// Use multimath's sync auto-init. Avoid Promise use in old browsers,
// because polyfills are not propagated to webworker.
var o=t.resizeAndUnsharp(r);postMessage({data:o},[o.buffer])}}},{"./mathlib":1}],18:[function(e,t,n){// Calculate Gaussian blur of an image using IIR filter
// The method is taken from Intel's white paper and code example attached to it:
// https://software.intel.com/en-us/articles/iir-gaussian-blur-filter
// -implementation-using-intel-advanced-vector-extensions
var r,a,i,o,l,s,d,c;function u(e,t,n,r,a,i){var o,l,s,d,c,u,m,g,f,h,A,p,y,I;for(f=0;f<i;f++){for(h=0,u=f*a,m=f,g=0,d=c=// left to right
(o=e[u])*r[6],A=r[0],p=r[1],y=r[4],I=r[5];h<a;h++)s=(l=e[u])*A+o*p+d*y+c*I,c=d,d=s,o=l,n[g]=d,g++,u++;for(u--,g--,m+=i*(a-1),d=c=// right to left
(o=e[u])*r[7],l=o,A=r[2],p=r[3],h=a-1;h>=0;h--)s=l*A+o*p+d*y+c*I,c=d,d=s,o=l,l=e[u],t[m]=n[g]+d,u--,g--,m-=i}}t.exports=function(e,t,n,m){// Quick exit on zero radius
if(m){var g,f,h,A,p,y=new Uint16Array(e.length),I=new Float32Array(Math.max(t,n)),B=((g=m)<.5&&(g=.5),h=Math.exp(-(f=Math.exp(.527076)/g)),A=Math.exp(-2*f),r=p=(1-h)*(1-h)/(1+2*f*h-A),a=p*(f-1)*h,i=p*(f+1)*h,o=-p*A,d=(r+a)/(1-(l=2*h)-(s=-A)),c=(i+o)/(1-l-s),new Float32Array([r,a,i,o,l,s,d,c]));u(e,y,I,B,t,n),u(y,e,I,B,n,t)}}},{}],19:[function(e,t,n){var r=e("object-assign"),a=e("./lib/base64decode"),i=e("./lib/wa_detect"),o={js:!0,wasm:!0};function l(e){if(!(this instanceof l))return new l(e);var t=r({},o,e||{});if(this.options=t,this.__cache={},this.__init_promise=null,this.__modules=t.modules||{},this.__memory=null,this.__wasm={},this.__isLE=1===new Uint32Array(new Uint8Array([1,0,0,0]).buffer)[0],!this.options.js&&!this.options.wasm)throw Error('mathlib: at least "js" or "wasm" should be enabled')}l.prototype.has_wasm=i,l.prototype.use=function(e){return this.__modules[e.name]=e,this.options.wasm&&this.has_wasm()&&e.wasm_fn?this[e.name]=e.wasm_fn:this[e.name]=e.fn,this},l.prototype.init=function(){if(this.__init_promise)return this.__init_promise;if(!this.options.js&&this.options.wasm&&!this.has_wasm())return Promise.reject(Error('mathlib: only "wasm" was enabled, but it\'s not supported'));var e=this;return this.__init_promise=Promise.all(Object.keys(e.__modules).map(function(t){var n=e.__modules[t];return e.options.wasm&&e.has_wasm()&&n.wasm_fn&&!e.__wasm[t]?WebAssembly.compile(e.__base64decode(n.wasm_src)).then(function(n){e.__wasm[t]=n}):null})).then(function(){return e}),this.__init_promise},////////////////////////////////////////////////////////////////////////////////
// Methods below are for internal use from plugins
// Simple decode base64 to typed array. Useful to load embedded webassembly
// code. You probably don't need to call this method directly.
//
l.prototype.__base64decode=a,// Increase current memory to include specified number of bytes. Do nothing if
// size is already ok. You probably don't need to call this method directly,
// because it will be invoked from `.__instance()`.
//
l.prototype.__reallocate=function(e){if(!this.__memory)return this.__memory=new WebAssembly.Memory({initial:Math.ceil(e/65536)}),this.__memory;var t=this.__memory.buffer.byteLength;return t<e&&this.__memory.grow(Math.ceil((e-t)/65536)),this.__memory},// Returns instantinated webassembly item by name, with specified memory size
// and environment.
// - use cache if available
// - do sync module init, if async init was not called earlier
// - allocate memory if not enougth
// - can export functions to webassembly via "env_extra",
//   for example, { exp: Math.exp }
//
l.prototype.__instance=function(e,t,n){// If .init() was not called, do sync compile
if(t&&this.__reallocate(t),!this.__wasm[e]){var a=this.__modules[e];this.__wasm[e]=new WebAssembly.Module(this.__base64decode(a.wasm_src))}if(!this.__cache[e]){var i={memoryBase:0,memory:this.__memory,tableBase:0,table:new WebAssembly.Table({initial:0,element:"anyfunc"})};this.__cache[e]=new WebAssembly.Instance(this.__wasm[e],{env:r(i,n||{})})}return this.__cache[e]},// Helper to calculate memory aligh for pointers. Webassembly does not require
// this, but you may wish to experiment. Default base = 8;
//
l.prototype.__align=function(e,t){var n=e%(t=t||8);return e+(n?t-n:0)},t.exports=l},{"./lib/base64decode":20,"./lib/wa_detect":21,"object-assign":22}],20:[function(e,t,n){t.exports=function(e){for(var t=e.replace(/[\r\n=]/g,""),n=t.length,r=new Uint8Array(3*n>>2),a=0,i=0,o=0;o<n;o++)o%4==0&&o&&(r[i++]=a>>16&255,r[i++]=a>>8&255,r[i++]=255&a),a=a<<6|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(o));var l=n%4*6;return 0===l?(r[i++]=a>>16&255,r[i++]=a>>8&255,r[i++]=255&a):18===l?(r[i++]=a>>10&255,r[i++]=a>>2&255):12===l&&(r[i++]=a>>4&255),r}},{}],21:[function(e,t,n){var r;t.exports=function(){// use cache if called before;
if(void 0!==r||(r=!1,"undefined"==typeof WebAssembly))return r;// If WebAssenbly is disabled, code can throw on compile
try{// https://github.com/brion/min-wasm-fail/blob/master/min-wasm-fail.in.js
// Additional check that WA internals are correct
/* eslint-disable comma-spacing, max-len */var e=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),t=new WebAssembly.Module(e),n=new WebAssembly.Instance(t,{});// test storing to and loading from a non-zero location via a parameter.
// Safari on iOS 11.2.5 returns 0 unexpectedly at non-zero locations
0!==n.exports.test(4)&&(r=!0)}catch(e){}return r}},{}],22:[function(e,t,n){/* eslint-disable no-unused-vars */var r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;t.exports=!function(){try{if(!Object.assign)return!1;// Detect buggy property enumeration order in older V8 versions.
// https://bugs.chromium.org/p/v8/issues/detail?id=4118
var e=new String("abc");// eslint-disable-line no-new-wrappers
if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;// https://bugs.chromium.org/p/v8/issues/detail?id=3056
var r=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if("0123456789"!==r.join(""))return!1;// https://bugs.chromium.org/p/v8/issues/detail?id=3056
var a={};if("abcdefghijklmnopqrst".split("").forEach(function(e){a[e]=e}),"abcdefghijklmnopqrst"!==Object.keys(Object.assign({},a)).join(""))return!1;return!0}catch(e){// We don't expect any of the above to throw, but better to be safe.
return!1}}()?function(e,t){for(var n,o,l=function(e){if(null==e)throw TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),s=1;s<arguments.length;s++){for(var d in n=Object(arguments[s]))a.call(n,d)&&(l[d]=n[d]);if(r){o=r(n);for(var c=0;c<o.length;c++)i.call(n,o[c])&&(l[o[c]]=n[o[c]])}}return l}:Object.assign},{}],23:[function(e,t,n){var r=arguments[3],a=arguments[4],i=arguments[5],o=JSON.stringify;t.exports=function(e,t){for(var n,l=Object.keys(i),s=0,d=l.length;s<d;s++){var c=l[s],u=i[c].exports;// Using babel as a transpiler to use esmodule, the export will always
// be an object with the default export as a property of it. To ensure
// the existing api and babel esmodule exports are both supported we
// check for both
if(u===e||u&&u.default===e){n=c;break}}if(!n){n=Math.floor(4294967296*Math.random()).toString(16);for(var m={},s=0,d=l.length;s<d;s++){var c=l[s];m[c]=c}a[n]=["function(require,module,exports){"+e+"(self); }",m]}var g=Math.floor(4294967296*Math.random()).toString(16),f={};f[n]=n,a[g]=["function(require,module,exports){var f = require("+o(n)+");(f.default ? f.default : f)(self);}",f];var h={};!function e(t){for(var n in h[t]=!0,a[t][1]){var r=a[t][1][n];h[r]||e(r)}}(g);var A="("+r+")({"+Object.keys(h).map(function(e){return o(e)+":["+a[e][0]+","+o(a[e][1])+"]"}).join(",")+"},{},["+o(g)+"])",p=window.URL||window.webkitURL||window.mozURL||window.msURL,y=new Blob([A],{type:"text/javascript"});if(t&&t.bare)return y;var I=p.createObjectURL(y),B=new Worker(I);return B.objectURL=I,B}},{}],"/index.js":[function(e,t,n){function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var a=e("object-assign"),i=e("webworkify"),o=e("./lib/mathlib"),l=e("./lib/pool"),s=e("./lib/utils"),d=e("./lib/worker"),c=e("./lib/stepper"),u=e("./lib/tiler"),m=e("./lib/mm_resize/resize_filter_info"),g={},f=!1;try{"undefined"!=typeof navigator&&navigator.userAgent&&(f=navigator.userAgent.indexOf("Safari")>=0)}catch(e){}var h=1;"undefined"!=typeof navigator&&(h=Math.min(navigator.hardwareConcurrency||1,4));var A={tile:1024,concurrency:h,features:["js","wasm","ww"],idle:2e3,createCanvas:function(e,t){var n=document.createElement("canvas");return n.width=e,n.height=t,n}},p={filter:"mks2013",unsharpAmount:0,unsharpRadius:0,unsharpThreshold:0},y=!1,I=!1,B=!1,E=!1,v=!1;function b(){return{value:i(d),destroy:function(){if(this.value.terminate(),"undefined"!=typeof window){var e=window.URL||window.webkitURL||window.mozURL||window.msURL;e&&e.revokeObjectURL&&this.value.objectURL&&e.revokeObjectURL(this.value.objectURL)}}}}////////////////////////////////////////////////////////////////////////////////
// API methods
function w(e){if(!(this instanceof w))return new w(e);this.options=a({},A,e||{});var t="lk_".concat(this.options.concurrency);// Share limiters to avoid multiple parallel workers when user creates
// multiple pica instances.
this.__limit=g[t]||s.limiter(this.options.concurrency),g[t]||(g[t]=this.__limit),this.features={js:!1,// pure JS implementation, can be disabled for testing
wasm:!1,// webassembly implementation for heavy functions
cib:!1,// resize via createImageBitmap (only FF at this moment)
ww:!1// webworkers
},this.__workersPool=null,this.__requested_features=[],this.__mathlib=null}w.prototype.init=function(){var t,n,r=this;if(this.__initPromise)return this.__initPromise;// Test if we can create ImageData without canvas and memory copy
if("undefined"!=typeof ImageData&&"undefined"!=typeof Uint8ClampedArray)try{/* eslint-disable no-new */new ImageData(new Uint8ClampedArray(400),10,10),y=!0}catch(e){}"undefined"!=typeof ImageBitmap&&(ImageBitmap.prototype&&ImageBitmap.prototype.close?I=!0:this.debug("ImageBitmap does not support .close(), disabled"));var i=this.options.features.slice();if(i.indexOf("all")>=0&&(i=["cib","wasm","js","ww"]),this.__requested_features=i,this.__mathlib=new o(i),i.indexOf("ww")>=0&&"undefined"!=typeof window&&"Worker"in window)// https://connect.microsoft.com/IE/feedback/details/801810/web-workers-from-blob-urls-in-ie-10-and-11
try{e("webworkify")(function(){}).terminate(),this.features.ww=!0;var d="wp_".concat(JSON.stringify(this.options));g[d]?this.__workersPool=g[d]:(this.__workersPool=new l(b,this.options.idle),g[d]=this.__workersPool)}catch(e){}var c=this.__mathlib.init().then(function(e){// Copy detected features
a(r.features,e.features)});t=I?s.cib_support(this.options.createCanvas).then(function(e){if(r.features.cib&&0>i.indexOf("cib")){r.debug("createImageBitmap() resize supported, but disabled by config");return}i.indexOf("cib")>=0&&(r.features.cib=e)}):Promise.resolve(!1),B=s.can_use_canvas(this.options.createCanvas),n=(n=I&&y&&-1!==i.indexOf("ww")?s.worker_offscreen_canvas_support():Promise.resolve(!1)).then(function(e){E=e});// so need to check whether function works correctly;
// https://bugs.chromium.org/p/chromium/issues/detail?id=1220671
var u=s.cib_can_use_region().then(function(e){v=e});// Init math lib. That's async because can load some
return this.__initPromise=Promise.all([c,t,n,u]).then(function(){return r}),this.__initPromise},w.prototype.__invokeResize=function(e,t){var n=this;return(// Share cache between calls:
//
// - wasm instance
// - wasm memory object
//
t.__mathCache=t.__mathCache||{},Promise.resolve().then(function(){return n.features.ww?new Promise(function(r,a){var i=n.__workersPool.acquire();t.cancelToken&&t.cancelToken.catch(function(e){return a(e)}),i.value.onmessage=function(e){i.release(),e.data.err?a(e.data.err):r(e.data)};var o=[];e.src&&o.push(e.src.buffer),e.srcBitmap&&o.push(e.srcBitmap),i.value.postMessage({opts:e,features:n.__requested_features,preload:{wasm_nodule:n.__mathlib.__}},o)}):{data:n.__mathlib.resizeAndUnsharp(e,t.__mathCache)}}))},w.prototype.__extractTileData=function(e,t,n,r,a){if(this.features.ww&&E&&// can use canvas because canvas doesn't have orientation;
// see https://bugs.chromium.org/p/chromium/issues/detail?id=1220671
(s.isCanvas(t)||v))return this.debug("Create tile for OffscreenCanvas"),createImageBitmap(r.srcImageBitmap||t,e.x,e.y,e.width,e.height).then(function(e){return a.srcBitmap=e,a});// Extract tile RGBA buffer, depending on input type
if(s.isCanvas(t))return r.srcCtx||(r.srcCtx=t.getContext("2d")),this.debug("Get tile pixel data"),a.src=r.srcCtx.getImageData(e.x,e.y,e.width,e.height).data,a;// If input is Image or decoded to ImageBitmap,
// draw region to temporary canvas and extract data from it
//
// Note! Attempt to reuse this canvas causes significant slowdown in chrome
//
this.debug("Draw tile imageBitmap/image to temporary canvas");var i=this.options.createCanvas(e.width,e.height),o=i.getContext("2d");return o.globalCompositeOperation="copy",o.drawImage(r.srcImageBitmap||t,e.x,e.y,e.width,e.height,0,0,e.width,e.height),this.debug("Get tile pixel data"),a.src=o.getImageData(0,0,e.width,e.height).data,// https://github.com/nodeca/pica/issues/199
i.width=i.height=0,a},w.prototype.__landTileData=function(e,t,n){var r;if(this.debug("Convert raw rgba tile result to ImageData"),t.bitmap)return n.toCtx.drawImage(t.bitmap,e.toX,e.toY),null;if(y)// If `new ImageData()` & Uint8ClampedArray suported
r=new ImageData(new Uint8ClampedArray(t.data),e.toWidth,e.toHeight);else if(// fallback for `node-canvas` and old browsers
// (IE11 has ImageData but does not support `new ImageData()`)
(r=n.toCtx.createImageData(e.toWidth,e.toHeight)).data.set)r.data.set(t.data);else for(var a=r.data.length-1;a>=0;a--)r.data[a]=t.data[a];return this.debug("Draw tile"),f?n.toCtx.putImageData(r,e.toX,e.toY,e.toInnerX-e.toX,e.toInnerY-e.toY,e.toInnerWidth+1e-5,e.toInnerHeight+1e-5):n.toCtx.putImageData(r,e.toX,e.toY,e.toInnerX-e.toX,e.toInnerY-e.toY,e.toInnerWidth,e.toInnerHeight),null},w.prototype.__tileAndResize=function(e,t,n){var r=this,a={srcCtx:null,srcImageBitmap:null,isImageBitmapReused:!1,toCtx:null};// If image - try to decode in background if possible
return Promise.resolve().then(function(){if(a.toCtx=t.getContext("2d"),s.isCanvas(e))return null;if(s.isImageBitmap(e))return a.srcImageBitmap=e,a.isImageBitmapReused=!0,null;if(s.isImage(e))return(// try do decode image in background for faster next operations;
// if we're using offscreen canvas, cib is called per tile, so not needed here
I?(r.debug("Decode image via createImageBitmap"),createImageBitmap(e).then(function(e){a.srcImageBitmap=e})// Suppress error to use fallback, if method fails
.catch(function(e){return null})):null);throw Error('Pica: ".from" should be Image, Canvas or ImageBitmap')}).then(function(){if(n.canceled)return n.cancelToken;r.debug("Calculate tiles");var i=u({width:n.width,height:n.height,srcTileSize:r.options.tile,toWidth:n.toWidth,toHeight:n.toHeight,destTileBorder:n.__destTileBorder}).map(function(t){return r.__limit(function(){if(n.canceled)return n.cancelToken;var i={width:t.width,height:t.height,toWidth:t.toWidth,toHeight:t.toHeight,scaleX:t.scaleX,scaleY:t.scaleY,offsetX:t.offsetX,offsetY:t.offsetY,filter:n.filter,unsharpAmount:n.unsharpAmount,unsharpRadius:n.unsharpRadius,unsharpThreshold:n.unsharpThreshold};return r.debug("Invoke resize math"),Promise.resolve(i).then(function(i){return r.__extractTileData(t,e,n,a,i)}).then(function(e){return r.debug("Invoke resize math"),r.__invokeResize(e,n)}).then(function(e){return n.canceled?n.cancelToken:(a.srcImageData=null,r.__landTileData(t,e,a))})})});function o(e){e.srcImageBitmap&&(e.isImageBitmapReused||e.srcImageBitmap.close(),e.srcImageBitmap=null)}return r.debug("Process tiles"),Promise.all(i).then(function(){return r.debug("Finished!"),o(a),t},function(e){throw o(a),e})})},w.prototype.__processStages=function(e,t,n,i){var o,l,s,d=this;if(i.canceled)return i.cancelToken;var c=function(e){if(Array.isArray(e))return e}(o=e.shift())||function(e,t){var n,r,a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var i=[],o=!0,l=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);o=!0);}catch(e){l=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(l)throw r}}return i}}(o,2)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}}(o,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),u=c[0],g=c[1],f=0===e.length;return l=f||0>m.q2f.indexOf(i.filter)?i.filter:"box"===i.filter?"box":"hamming",i=a({},i,{toWidth:u,toHeight:g,filter:l}),f||(s=this.options.createCanvas(u,g)),this.__tileAndResize(t,f?n:s,i).then(function(){return f?n:(i.width=u,i.height=g,d.__processStages(e,s,n,i))}).then(function(e){return s&&// https://github.com/nodeca/pica/issues/199
(s.width=s.height=0),e})},w.prototype.__resizeViaCreateImageBitmap=function(e,t,n){var r=this,a=t.getContext("2d");return this.debug("Resize via createImageBitmap()"),createImageBitmap(e,{resizeWidth:n.toWidth,resizeHeight:n.toHeight,resizeQuality:s.cib_quality_name(m.f2q[n.filter])}).then(function(e){if(n.canceled)return n.cancelToken;// if no unsharp - draw directly to output canvas
if(!n.unsharpAmount)return a.drawImage(e,0,0),e.close(),a=null,r.debug("Finished!"),t;r.debug("Unsharp result");var i=r.options.createCanvas(n.toWidth,n.toHeight),o=i.getContext("2d");o.drawImage(e,0,0),e.close();var l=o.getImageData(0,0,n.toWidth,n.toHeight);return r.__mathlib.unsharp_mask(l.data,n.toWidth,n.toHeight,n.unsharpAmount,n.unsharpRadius,n.unsharpThreshold),a.putImageData(l,0,0),// https://github.com/nodeca/pica/issues/199
i.width=i.height=0,l=o=i=a=null,r.debug("Finished!"),t})},w.prototype.resize=function(e,t,n){var r=this;this.debug("Start resize...");var i=a({},p);if(isNaN(n)?n&&(i=a(i,n)):i=a(i,{quality:n}),i.toWidth=t.width,i.toHeight=t.height,i.width=e.naturalWidth||e.width,i.height=e.naturalHeight||e.height,Object.prototype.hasOwnProperty.call(i,"quality")){if(i.quality<0||i.quality>3)throw Error("Pica: .quality should be [0..3], got ".concat(i.quality));i.filter=m.q2f[i.quality]}// Prevent stepper from infinite loop
return 0===t.width||0===t.height?Promise.reject(Error("Invalid output size: ".concat(t.width,"x").concat(t.height))):(i.unsharpRadius>2&&(i.unsharpRadius=2),i.canceled=!1,i.cancelToken&&(i.cancelToken=i.cancelToken.then(function(e){throw i.canceled=!0,e},function(e){throw i.canceled=!0,e})),i.__destTileBorder=Math.ceil(Math.max(3,2.5*i.unsharpRadius|0)),this.init().then(function(){if(i.canceled)return i.cancelToken;// if createImageBitmap supports resize, just do it and return
if(r.features.cib){if(m.q2f.indexOf(i.filter)>=0)return r.__resizeViaCreateImageBitmap(e,t,i);r.debug("cib is enabled, but not supports provided filter, fallback to manual math")}if(!B){var n=Error("Pica: cannot use getImageData on canvas, make sure fingerprinting protection isn't enabled");throw n.code="ERR_GET_IMAGE_DATA",n}//
// No easy way, let's resize manually via arrays
//
var a=c(i.width,i.height,i.toWidth,i.toHeight,r.options.tile,i.__destTileBorder);return r.__processStages(a,e,t,i)}))},//
w.prototype.resizeBuffer=function(e){var t=this,n=a({},p,e);if(Object.prototype.hasOwnProperty.call(n,"quality")){if(n.quality<0||n.quality>3)throw Error("Pica: .quality should be [0..3], got ".concat(n.quality));n.filter=m.q2f[n.quality]}return this.init().then(function(){return t.__mathlib.resizeAndUnsharp(n)})},w.prototype.toBlob=function(e,t,n){return t=t||"image/png",new Promise(function(r){if(e.toBlob){e.toBlob(function(e){return r(e)},t,n);return}if(e.convertToBlob){r(e.convertToBlob({type:t,quality:n}));return}// Fallback for old browsers
for(var a=atob(e.toDataURL(t,n).split(",")[1]),i=a.length,o=new Uint8Array(i),l=0;l<i;l++)o[l]=a.charCodeAt(l);r(new Blob([o],{type:t}))})},w.prototype.debug=function(){},t.exports=w},{"./lib/mathlib":1,"./lib/mm_resize/resize_filter_info":7,"./lib/pool":13,"./lib/stepper":14,"./lib/tiler":15,"./lib/utils":16,"./lib/worker":17,"object-assign":22,webworkify:23}]},{},[])("/index.js");var s={},d={exports:{}};!function(e){//////////////////////////////////////////////////////////////////////////
// Helpers
//
function t(e,t){var n=Error(e);return n.code=t,n}// Convert number to 0xHH string
//
function n(e){for(var t=e.toString(16).toUpperCase(),n=2-t.length;n>0;n--)t="0"+t;return"0x"+t}// Check if input is a Uint8Array
//
function r(e){return"[object Uint8Array]"===Object.prototype.toString.call(e)}//////////////////////////////////////////////////////////////////////////
// Exif parser
//
// Input:
//  - jpeg_bin:   Uint8Array - jpeg file
//  - exif_start: Number     - start of TIFF header (after Exif\0\0)
//  - exif_end:   Number     - end of Exif segment
//  - on_entry:   Number     - callback
//
function a(e,n,r){// Uint8Array, exif without signature (which isn't included in offsets)
this.input=e.subarray(n,r),// offset correction for `on_entry` callback
this.start=n;// Check TIFF header (includes byte alignment and first IFD offset)
var a=String.fromCharCode.apply(null,this.input.subarray(0,4));if("II*\x00"!==a&&"MM\x00*"!==a)throw t("invalid TIFF signature","EBADDATA");// true if motorola (big endian) byte alignment, false if intel
this.big_endian="M"===a[0]}a.prototype.each=function(e){// allow premature exit
this.aborted=!1;var t=this.read_uint32(4);for(this.ifds_to_read=[{id:0,offset:t}];this.ifds_to_read.length>0&&!this.aborted;){var n=this.ifds_to_read.shift();n.offset&&this.scan_ifd(n.id,n.offset,e)}},a.prototype.filter=function(e){var n={};// make sure IFD0 always exists
n.ifd0={id:0,entries:[]},this.each(function(t){(!1!==e(t)||t.is_subifd_link)&&(t.is_subifd_link&&1!==t.count&&4!==t.format||(n["ifd"+t.ifd]||(n["ifd"+t.ifd]={id:t.ifd,entries:[]}),n["ifd"+t.ifd].entries.push(t)))}),// thumbnails are not supported just yet, so delete all information related to it
delete n.ifd1;// Calculate output size
var r=8;Object.keys(n).forEach(function(e){r+=2,n[e].entries.forEach(function(e){r+=12+(e.data_length>4?2*Math.ceil(e.data_length/2):0)}),r+=4}),this.output=new Uint8Array(r),this.output[0]=this.output[1]=(this.big_endian?"M":"I").charCodeAt(0),this.write_uint16(2,42);var a=8,i=this;if(this.write_uint32(4,a),Object.keys(n).forEach(function(e){n[e].written_offset=a;var t=a,r=t+2+12*n[e].entries.length+4;a=r,i.write_uint16(t,n[e].entries.length),n[e].entries.sort(function(e,t){// IFD entries must be in order of increasing tag IDs
return e.tag-t.tag}).forEach(function(e,r){var o=t+2+12*r;i.write_uint16(o,e.tag),i.write_uint16(o+2,e.format),i.write_uint32(o+4,e.count),e.is_subifd_link?n["ifd"+e.tag]&&(n["ifd"+e.tag].link_offset=o+8):e.data_length<=4?i.output.set(i.input.subarray(e.data_offset-i.start,e.data_offset-i.start+4),o+8):(i.write_uint32(o+8,a),i.output.set(i.input.subarray(e.data_offset-i.start,e.data_offset-i.start+e.data_length),a),a+=2*Math.ceil(e.data_length/2))});var o=n["ifd"+(n[e].id+1)];o&&(o.link_offset=r-4)}),Object.keys(n).forEach(function(e){n[e].written_offset&&n[e].link_offset&&i.write_uint32(n[e].link_offset,n[e].written_offset)}),this.output.length!==a)throw t("internal error: incorrect buffer size allocated");return this.output},a.prototype.read_uint16=function(e){var n=this.input;if(e+2>n.length)throw t("unexpected EOF","EBADDATA");return this.big_endian?256*n[e]+n[e+1]:n[e]+256*n[e+1]},a.prototype.read_uint32=function(e){var n=this.input;if(e+4>n.length)throw t("unexpected EOF","EBADDATA");return this.big_endian?16777216*n[e]+65536*n[e+1]+256*n[e+2]+n[e+3]:n[e]+256*n[e+1]+65536*n[e+2]+16777216*n[e+3]},a.prototype.write_uint16=function(e,t){var n=this.output;this.big_endian?(n[e]=t>>>8&255,n[e+1]=255&t):(n[e]=255&t,n[e+1]=t>>>8&255)},a.prototype.write_uint32=function(e,t){var n=this.output;this.big_endian?(n[e]=t>>>24&255,n[e+1]=t>>>16&255,n[e+2]=t>>>8&255,n[e+3]=255&t):(n[e]=255&t,n[e+1]=t>>>8&255,n[e+2]=t>>>16&255,n[e+3]=t>>>24&255)},a.prototype.is_subifd_link=function(e,t){return 0===e&&34665===t||// SubIFD
0===e&&34853===t||// GPS Info
34665===e&&40965===t;// Interop IFD
},// Returns byte length of a single component of a given format
//
a.prototype.exif_format_length=function(e){switch(e){case 1:case 2:case 6:case 7:return 1;case 3:case 8:return 2;case 4:case 9:case 11:return 4;case 5:case 10:case 12:return 8;default:// unknown type
return 0}},// Reads Exif data
//
a.prototype.exif_format_read=function(e,t){var n;switch(e){case 1:case 2:return this.input[t];case 6:return(n=this.input[t])|(128&n)*33554430;case 3:return this.read_uint16(t);case 8:return(n=this.read_uint16(t))|(32768&n)*131070;case 4:return this.read_uint32(t);case 9:return 0|(n=this.read_uint32(t));default:return null;// not implemented
}},a.prototype.scan_ifd=function(e,n,r){var a=this.read_uint16(n);n+=2;for(var i=0;i<a;i++){var o=this.read_uint16(n),l=this.read_uint16(n+2),s=this.read_uint32(n+4),d=this.exif_format_length(l),c=s*d,u=c<=4?n+8:this.read_uint32(n+8),m=!1;if(u+c>this.input.length)throw t("unexpected EOF","EBADDATA");for(var g=[],f=u,h=0;h<s;h++,f+=d){var A=this.exif_format_read(l,f);if(null===A){g=null;break}g.push(A)}if(Array.isArray(g)&&2===l){try{g=function(e){try{return decodeURIComponent(escape(e))}catch(t){return e}}(String.fromCharCode.apply(null,g))}catch(e){g=null}g&&"\x00"===g[g.length-1]&&(g=g.slice(0,-1))}if(this.is_subifd_link(e,o)&&Array.isArray(g)&&Number.isInteger(g[0])&&g[0]>0&&(this.ifds_to_read.push({id:o,offset:g[0]}),m=!0),!1===r({is_big_endian:this.big_endian,ifd:e,tag:o,format:l,count:s,entry_offset:n+this.start,data_length:c,data_offset:u+this.start,value:g,is_subifd_link:m})){this.aborted=!0;return}n+=12}0===e&&this.ifds_to_read.push({id:1,offset:this.read_uint32(n)})},// Check whether input is a JPEG image
//
// Input:
//  - jpeg_bin: Uint8Array - jpeg file
//
// Returns true if it is and false otherwise
//
e.exports.is_jpeg=function(e){return e.length>=4&&255===e[0]&&216===e[1]&&255===e[2]},// Call an iterator on each segment in the given JPEG image
//
// Input:
//  - jpeg_bin:   Uint8Array - jpeg file
//  - on_segment: Function - callback executed on each JPEG marker segment
//    - segment:  Object
//      - code:   Number - marker type (2nd byte, e.g. 0xE0 for APP0)
//      - offset: Number - offset of the first byte (0xFF) relative to `jpeg_bin` start
//      - length: Number - length of the entire marker segment including first two bytes and length
//        - 2 for standalone markers
//        - 4+length for markers with data
//
// Iteration stops when `EOI` (0xFFD9) marker is reached or if `on_segment`
// function returns `false`.
//
e.exports.jpeg_segments_each=function(a,i){if(!r(a))throw t("Invalid argument (jpeg_bin), Uint8Array expected","EINVAL");if("function"!=typeof i)throw t("Invalid argument (on_segment), Function expected","EINVAL");if(!e.exports.is_jpeg(a))throw t("Unknown file format","ENOTJPEG");for(var o=0,l=a.length,s=!1;;){if(o+1>=l)throw t("Unexpected EOF","EBADDATA");var d,c,u=a[o],m=a[o+1];if(255===u&&255===m)// padding
d=255,c=1;else if(255===u&&0!==m){if(c=2,208<=// marker
(d=m)&&d<=217||1===d);else{if(o+3>=l)throw t("Unexpected EOF","EBADDATA");if((c+=256*a[o+2]+a[o+3])<2)throw t("Invalid segment length","EBADDATA");if(o+c-1>=l)throw t("Unexpected EOF","EBADDATA")}s&&(d>=208&&d<=215||(s=!1)),218/* SOS */===d&&(s=!0)}else if(s)for(var g=o+1;;g++){// scan until we find FF
if(g>=l)throw t("Unexpected EOF","EBADDATA");if(255===a[g]){if(g+1>=l)throw t("Unexpected EOF","EBADDATA");if(0!==a[g+1]){d=0,c=g-o;break}}}else throw t("Unexpected byte at segment start: "+n(u)+" (offset "+n(o)+")","EBADDATA");if(!1===i({code:d,offset:o,length:c})||217/* EOI */===d)break;o+=c}},// Replace or remove segments in the given JPEG image
//
// Input:
//  - jpeg_bin:   Uint8Array - jpeg file
//  - on_segment: Function - callback executed on each JPEG marker segment
//    - segment:  Object
//      - code:   Number - marker type (2nd byte, e.g. 0xE0 for APP0)
//      - offset: Number - offset of the first byte (0xFF) relative to `jpeg_bin` start
//      - length: Number - length of the entire marker segment including first two bytes and length
//        - 2 for standalone markers
//        - 4+length for markers with data
//
// `on_segment` function should return one of the following:
//  - `false`        - segment is removed from the output
//  - Uint8Array     - segment is replaced with the new data
//  - [ Uint8Array ] - segment is replaced with the new data
//  - anything else  - segment is copied to the output as is
//
// Any data after `EOI` (0xFFD9) marker is removed.
//
e.exports.jpeg_segments_filter=function(n,a){if(!r(n))throw t("Invalid argument (jpeg_bin), Uint8Array expected","EINVAL");if("function"!=typeof a)throw t("Invalid argument (on_segment), Function expected","EINVAL");var i=[],o=0;e.exports.jpeg_segments_each(n,function(e){var t=a(e);if(r(t))i.push({data:t}),o+=t.length;else if(Array.isArray(t))t.filter(r).forEach(function(e){i.push({data:e}),o+=e.length});else if(!1!==t){var n={start:e.offset,end:e.offset+e.length};i.length>0&&i[i.length-1].end===n.start?i[i.length-1].end=n.end:i.push(n),o+=e.length}});var l=new Uint8Array(o),s=0;return i.forEach(function(e){var t=e.data||n.subarray(e.start,e.end);l.set(t,s),s+=t.length}),l},// Call an iterator on each Exif entry in the given JPEG image
//
// Input:
//  - jpeg_bin: Uint8Array - jpeg file
//  - on_entry: Function - callback executed on each Exif entry
//    - entry:  Object
//      - is_big_endian:  Boolean - whether Exif uses big or little endian byte alignment
//      - ifd:            Number  - IFD identifier (0 for IFD0, 1 for IFD1, 0x8769 for SubIFD,
//                                 0x8825 for GPS Info, 0xA005 for Interop IFD)
//      - tag:            Number  - exif entry tag (0x0110 - camera name, 0x0112 - orientation, etc. - see Exif spec)
//      - format:         Number  - exif entry format (1 - byte, 2 - ascii, 3 - short, etc. - see Exif spec)
//      - count:          Number  - number of components of the given format inside data
//                                 (usually 1, or string length for ascii format)
//      - entry_offset:   Number  - start of Exif entry (entry length is always 12, so not included)
//      - data_offset:    Number  - start of data attached to Exif entry (will overlap with entry if length <= 4)
//      - data_length:    Number  - length of data attached to Exif entry
//      - value:          Array|String|Null - our best attempt at parsing data (not all formats supported right now)
//      - is_subifd_link: Boolean - whether this entry is recognized to be a link to subifd (can't filter these out)
//
// Iteration stops early if iterator returns `false`.
//
// If Exif wasn't found anywhere (before start of the image data, SOS),
// iterator is never executed.
//
e.exports.jpeg_exif_tags_each=function(n,i){if(!r(n))throw t("Invalid argument (jpeg_bin), Uint8Array expected","EINVAL");if("function"!=typeof i)throw t("Invalid argument (on_exif_entry), Function expected","EINVAL");/* eslint-disable consistent-return */e.exports.jpeg_segments_each(n,function(e){return 218/* SOS */!==e.code&&(225===e.code&&e.length>=10&&69===n[e.offset+4]&&120===n[e.offset+5]&&105===n[e.offset+6]&&102===n[e.offset+7]&&0===n[e.offset+8]&&0===n[e.offset+9]?(new a(n,e.offset+10,e.offset+e.length).each(i),!1):void 0)})},// Remove Exif entries in the given JPEG image
//
// Input:
//  - jpeg_bin: Uint8Array - jpeg file
//  - on_entry: Function - callback executed on each Exif entry
//    - entry:  Object
//      - is_big_endian:  Boolean - whether Exif uses big or little endian byte alignment
//      - ifd:            Number  - IFD identifier (0 for IFD0, 1 for IFD1, 0x8769 for SubIFD,
//                                  0x8825 for GPS Info, 0xA005 for Interop IFD)
//      - tag:            Number  - exif entry tag (0x0110 - camera name, 0x0112 - orientation, etc. - see Exif spec)
//      - format:         Number  - exif entry format (1 - byte, 2 - ascii, 3 - short, etc. - see Exif spec)
//      - count:          Number  - number of components of the given format inside data
//                                  (usually 1, or string length for ascii format)
//      - entry_offset:   Number  - start of Exif entry (entry length is always 12, so not included)
//      - data_offset:    Number  - start of data attached to Exif entry (will overlap with entry if length <= 4)
//      - data_length:    Number  - length of data attached to Exif entry
//      - value:          Array|String|Null - our best attempt at parsing data (not all formats supported right now)
//      - is_subifd_link: Boolean - whether this entry is recognized to be a link to subifd (can't filter these out)
//
// This function removes following from Exif:
//  - all entries where iterator returned false (except subifd links which are mandatory)
//  - IFD1 and thumbnail image (the purpose of this function is to reduce file size,
//    so thumbnail is usually the first thing to go)
//  - all other data that isn't in IFD0, SubIFD, GPSIFD, InteropIFD
//    (theoretically possible proprietary extensions, I haven't seen any of these yet)
//
// Changing data inside Exif entries is NOT supported yet (modifying `entry` object inside callback may break stuff).
//
// If Exif wasn't found anywhere (before start of the image data, SOS),
// iterator is never executed, and original JPEG is returned as is.
//
e.exports.jpeg_exif_tags_filter=function(n,i){if(!r(n))throw t("Invalid argument (jpeg_bin), Uint8Array expected","EINVAL");if("function"!=typeof i)throw t("Invalid argument (on_exif_entry), Function expected","EINVAL");var o=!1;return e.exports.jpeg_segments_filter(n,function(e){if(!o&&(218/* SOS */===e.code&&(o=!0),225===e.code&&e.length>=10&&69===n[e.offset+4]&&120===n[e.offset+5]&&105===n[e.offset+6]&&102===n[e.offset+7]&&0===n[e.offset+8]&&0===n[e.offset+9])){var t=new a(n,e.offset+10,e.offset+e.length).filter(i);if(!t)return!1;var r=new Uint8Array(10);return r.set(n.slice(e.offset,e.offset+10)),r[2]=t.length+8>>>8&255,r[3]=t.length+8&255,o=!0,[r,t]}})},// Inserts a custom comment marker segment into JPEG file.
//
// Input:
//  - jpeg_bin: Uint8Array - jpeg file
//  - comment:  String
//
// Comment is inserted after first two bytes (FFD8, SOI).
//
// If JFIF (APP0) marker exists immediately after SOI (as mandated by the JFIF
// spec), we insert comment after it instead.
//
e.exports.jpeg_add_comment=function(t,n){var r=!1,a=0;return e.exports.jpeg_segments_filter(t,function(e){if((1!=++a||216/* SOI  */!==e.code)&&(2!==a||224/* APP0 */!==e.code)&&!r){n=function(e){try{return unescape(encodeURIComponent(e))}catch(t){return e}}(n);// comment segment
var i=new Uint8Array(5+n.length),o=0;return i[o++]=255,i[o++]=254,i[o++]=n.length+3>>>8&255,i[o++]=n.length+3&255,n.split("").forEach(function(e){i[o++]=255&e.charCodeAt(0)}),i[o++]=0,r=!0,[i,t.subarray(e.offset,e.offset+e.length)]}})}}(d);var c=d.exports;function u(e){return this._getUint8Array(e.blob).then(function(t){if(e.is_jpeg=c.is_jpeg(t),!e.is_jpeg)return Promise.resolve(e);e.orig_blob=e.blob;try{var n,r;if(/* eslint-disable consistent-return */c.jpeg_exif_tags_each(t,function(t){if(0===t.ifd&&274===t.tag&&Array.isArray(t.value))return e.orientation=t.value[0]||1,n=t.is_big_endian,r=t.data_offset,!1}),r){var a=new Uint8Array(n?[0,1]:[1,0]);e.blob=new Blob([t.slice(0,r),a,t.slice(r+2)],{type:"image/jpeg"})}}catch(e){}return e})}function m(e){if(!e.is_jpeg)return Promise.resolve(e);var t,n=e.orientation-1;if(!n)return Promise.resolve(e);var r=(t=4&n?this.pica.options.createCanvas(e.out_canvas.height,e.out_canvas.width):this.pica.options.createCanvas(e.out_canvas.width,e.out_canvas.height)).getContext("2d");return r.save(),1&n&&r.transform(-1,0,0,1,t.width,0),2&n&&r.transform(-1,0,0,-1,t.width,t.height),4&n&&r.transform(0,1,1,0,0,0),r.drawImage(e.out_canvas,0,0),r.restore(),// Safari 12 workaround
// https://github.com/nodeca/pica/issues/199
e.out_canvas.width=e.out_canvas.height=0,e.out_canvas=t,Promise.resolve(e)}function g(e){return e.is_jpeg?Promise.all([this._getUint8Array(e.blob),this._getUint8Array(e.out_blob)]).then(function(t){var n=t[0],r=t[1];if(!c.is_jpeg(n))return Promise.resolve(e);var a=[];return c.jpeg_segments_each(n,function(e){if(218/* SOS */===e.code)return!1;a.push(e)}),a=a.filter(function(e){return(// Drop ICC_PROFILE
//
226!==e.code&&(e.code>=224&&e.code<240||254===e.code))}).map(function(e){return n.slice(e.offset,e.offset+e.length)}),e.out_blob=new Blob([r.slice(0,2)].concat(a).concat([r.slice(20)]),{type:"image/jpeg"}),e}):Promise.resolve(e)}s.jpeg_patch_exif=u,s.jpeg_rotate_canvas=m,s.jpeg_attach_orig_segments=g,s.assign=function(e){e.before("_blob_to_image",u),e.after("_transform",m),e.after("_create_blob",g)};var f=l.exports;function h(e){if(!(this instanceof h))return new h(e);e=e||{},this.pica=e.pica||f({}),this.initialized=!1,this.utils=i}h.prototype.use=function(e/*, params, ... */){var t=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,t),this},h.prototype.init=function(){this.use(s.assign)},h.prototype.toBlob=function(e,t){var n=i.assign({max:1/0},t);return this.initialized||(this.init(),this.initialized=!0),Promise.resolve({blob:e,opts:n}).then(this._blob_to_image).then(this._calculate_size).then(this._transform).then(this._cleanup).then(this._create_blob).then(function(e){return(// Safari 12 workaround
// https://github.com/nodeca/pica/issues/199
e.out_canvas.width=e.out_canvas.height=0,e.out_blob)})},h.prototype.toCanvas=function(e,t){var n=i.assign({max:1/0},t);return this.initialized||(this.init(),this.initialized=!0),Promise.resolve({blob:e,opts:n}).then(this._blob_to_image).then(this._calculate_size).then(this._transform).then(this._cleanup).then(function(e){return e.out_canvas})},h.prototype.before=function(e,t){if(!this[e])throw Error('Method "'+e+'" does not exist');if("function"!=typeof t)throw Error('Invalid argument "fn", function expected');var n=this[e],r=this;return this[e]=function(e){return t.call(r,e).then(function(e){return n.call(r,e)})},this},h.prototype.after=function(e,t){if(!this[e])throw Error('Method "'+e+'" does not exist');if("function"!=typeof t)throw Error('Invalid argument "fn", function expected');var n=this[e],r=this;return this[e]=function(e){return n.call(r,e).then(function(e){return t.call(r,e)})},this},h.prototype._blob_to_image=function(e){var t=window.URL||window.webkitURL||window.mozURL||window.msURL;return e.image=document.createElement("img"),e.image_url=t.createObjectURL(e.blob),e.image.src=e.image_url,new Promise(function(t,n){e.image.onerror=function(){n(Error("ImageBlobReduce: failed to create Image() from blob"))},e.image.onload=function(){t(e)}})},h.prototype._calculate_size=function(e){//
// Note, if your need not "symmetric" resize logic, you MUST check
// `env.orientation` (set by plugins) and swap width/height appropriately.
//
var t=e.opts.max/Math.max(e.image.width,e.image.height);return t>1&&(t=1),e.transform_width=Math.max(Math.round(e.image.width*t),1),e.transform_height=Math.max(Math.round(e.image.height*t),1),// Info for user plugins, to check if scaling applied
e.scale_factor=t,Promise.resolve(e)},h.prototype._transform=function(e){e.out_canvas=this.pica.options.createCanvas(e.transform_width,e.transform_height),// Dim env temporary vars to prohibit use and avoid confusion when orientation
// changed. You should take real size from canvas.
e.transform_width=null,e.transform_height=null;// By default use alpha for png only
var t={alpha:"image/png"===e.blob.type};return(// Extract pica options if been passed
this.utils.assign(t,this.utils.pick_pica_resize_options(e.opts)),this.pica.resize(e.image,e.out_canvas,t).then(function(){return e}))},h.prototype._cleanup=function(e){e.image.src="",e.image=null;var t=window.URL||window.webkitURL||window.mozURL||window.msURL;return t.revokeObjectURL&&t.revokeObjectURL(e.image_url),e.image_url=null,Promise.resolve(e)},h.prototype._create_blob=function(e){return this.pica.toBlob(e.out_canvas,e.blob.type).then(function(t){return e.out_blob=t,e})},h.prototype._getUint8Array=function(e){return e.arrayBuffer?e.arrayBuffer().then(function(e){return new Uint8Array(e)}):new Promise(function(t,n){var r=new FileReader;r.readAsArrayBuffer(e),r.onload=function(){t(new Uint8Array(r.result))},r.onerror=function(){n(Error("ImageBlobReduce: failed to load data from input blob")),r.abort()},r.onabort=function(){n(Error("ImageBlobReduce: failed to load data from input blob (aborted)"))}})},h.pica=f;var A=h},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||t.hasOwnProperty(n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}],"6s2CO":[function(e,t,n){let r=e("da1f68cc1fc16077"),a=e("8c6cf49ef2287430"),i=e("8a60cf7722cc14ce"),o=e("f6fcc816b915ba37");function l(e,t,n,i,o){let l=[].slice.call(arguments,1),s=l.length,d="function"==typeof l[s-1];if(!d&&!r())throw Error("Callback required as last argument");if(d){if(s<2)throw Error("Too few arguments provided");2===s?(o=n,n=t,t=i=void 0):3===s&&(t.getContext&&void 0===o?(o=i,i=void 0):(o=i,i=n,n=t,t=void 0))}else{if(s<1)throw Error("Too few arguments provided");return 1===s?(n=t,t=i=void 0):2!==s||t.getContext||(i=n,n=t,t=void 0),new Promise(function(r,o){try{let o=a.create(n,i);r(e(o,t,i))}catch(e){o(e)}})}try{let r=a.create(n,i);o(null,e(r,t,i))}catch(e){o(e)}}n.create=a.create,n.toCanvas=l.bind(null,i.render),n.toDataURL=l.bind(null,i.renderToDataURL),// only svg for now.
n.toString=l.bind(null,function(e,t,n){return o.render(e,n)})},{da1f68cc1fc16077:"2F9VO","8c6cf49ef2287430":"e9qY0","8a60cf7722cc14ce":"i1BDL",f6fcc816b915ba37:"8CcR1"}],"2F9VO":[function(e,t,n){// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
t.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},{}],e9qY0:[function(e,t,n){let r=e("4cf6a8173d9f3a2"),a=e("2ad62f61c352884c"),i=e("87d5a6270eb1dc26"),o=e("91abc94f777368cc"),l=e("9737c3939ab85d95"),s=e("cee3d371e219e45e"),d=e("8700c8c682afabf3"),c=e("65ad903a6ba3e"),u=e("1e8e447afb4d169c"),m=e("8a4a19af97836d80"),g=e("26720f9d94c9e268"),f=e("7b6429a248ecc51f"),h=e("1368d0fa14524351");/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */function A(e,t,n){let r,a;let i=e.size,o=g.getEncodedBits(t,n);for(r=0;r<15;r++)a=(o>>r&1)==1,r<6?e.set(r,8,a,!0):r<8?e.set(r+1,8,a,!0):e.set(i-15+r,8,a,!0),r<8?e.set(8,i-r-1,a,!0):r<9?e.set(8,15-r-1+1,a,!0):e.set(8,15-r-1,a,!0);// fixed module
e.set(i-8,8,1,!0)}/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */n.create=function(e,t){let n,g;if(void 0===e||""===e)throw Error("No input text");let p=a.M;return void 0!==t&&(// Use higher error correction level as default
p=a.from(t.errorCorrectionLevel,a.M),n=m.from(t.version),g=d.from(t.maskPattern),t.toSJISFunc&&r.setToSJISFunction(t.toSJISFunc)),/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */function(e,t,n,a){let g;if(Array.isArray(e))g=h.fromArray(e);else if("string"==typeof e){let r=t;if(!r){let t=h.rawSplit(e);// Estimate best version that can contain raw splitted segments
r=m.getBestVersionForData(t,n)}// Build optimized segments
// If estimated version is undefined, try with the highest version
g=h.fromString(e,r||40)}else throw Error("Invalid data");// Get the min version that can contain data
let p=m.getBestVersionForData(g,n);// If no version is found, data cannot be stored
if(!p)throw Error("The amount of data is too big to be stored in a QR Code");// If not specified, use min version as default
if(t){if(t<p)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+p+".\n")}else t=p;let y=/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */function(e,t,n){// Prepare data buffer
let a=new i;n.forEach(function(t){// prefix data with mode indicator (4 bits)
a.put(t.mode.bit,4),// Prefix data with character count indicator.
// The character count indicator is a string of bits that represents the
// number of characters that are being encoded.
// The character count indicator must be placed after the mode indicator
// and must be a certain number of bits long, depending on the QR version
// and data mode
// @see {@link Mode.getCharCountIndicator}.
a.put(t.getLength(),f.getCharCountIndicator(t.mode,e)),// add binary data sequence to buffer
t.write(a)});// Calculate required number of bits
let o=r.getSymbolTotalCodewords(e),l=c.getTotalCodewordsCount(e,t),s=(o-l)*8;// If the bit string is fewer than four bits shorter, add only the number of 0s that
// are needed to reach the required number of bits.
// After adding the terminator, if the number of bits in the string is not a multiple of 8,
// pad the string on the right with 0s to make the string's length a multiple of 8.
for(a.getLengthInBits()+4<=s&&a.put(0,4);a.getLengthInBits()%8!=0;)a.putBit(0);// Add pad bytes if the string is still shorter than the total number of required bits.
// Extend the buffer to fill the data capacity of the symbol corresponding to
// the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
// and 00010001 (0x11) alternately.
let d=(s-a.getLengthInBits())/8;for(let e=0;e<d;e++)a.put(e%2?17:236,8);return(/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */function(e,t,n){let a,i;// Total codewords for this QR code version (Data + Error correction)
let o=r.getSymbolTotalCodewords(t),l=c.getTotalCodewordsCount(t,n),s=o-l,d=c.getBlocksCount(t,n),m=o%d,g=d-m,f=Math.floor(o/d),h=Math.floor(s/d),A=h+1,p=f-h,y=new u(p),I=0,B=Array(d),E=Array(d),v=0,b=new Uint8Array(e.buffer);// Divide the buffer into the required number of blocks
for(let e=0;e<d;e++){let t=e<g?h:A;// extract a block of data from buffer
B[e]=b.slice(I,I+t),// Calculate EC codewords for this data block
E[e]=y.encode(B[e]),I+=t,v=Math.max(v,t)}// Create final data
// Interleave the data and error correction codewords from each block
let w=new Uint8Array(o),C=0;// Add data codewords
for(a=0;a<v;a++)for(i=0;i<d;i++)a<B[i].length&&(w[C++]=B[i][a]);// Apped EC codewords
for(a=0;a<p;a++)for(i=0;i<d;i++)w[C++]=E[i][a];return w}(a,e,t))}(t,n,g),I=r.getSymbolSize(t),B=new o(I);return(// Add function modules
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
 */function(e,t){let n=e.size,r=s.getPositions(t);for(let t=0;t<r.length;t++){let a=r[t][0],i=r[t][1];for(let t=-1;t<=7;t++)if(!(a+t<=-1)&&!(n<=a+t))for(let r=-1;r<=7;r++)i+r<=-1||n<=i+r||(t>=0&&t<=6&&(0===r||6===r)||r>=0&&r<=6&&(0===t||6===t)||t>=2&&t<=4&&r>=2&&r<=4?e.set(a+t,i+r,!0,!0):e.set(a+t,i+r,!1,!0))}}(B,t),/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */function(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}(B),/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(e,t){let n=l.getPositions(t);for(let t=0;t<n.length;t++){let r=n[t][0],a=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)-2===t||2===t||-2===n||2===n||0===t&&0===n?e.set(r+t,a+n,!0,!0):e.set(r+t,a+n,!1,!0)}}(B,t),// Add temporary dummy bits for format info just to set them as reserved.
// This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
// since the masking operation must be performed only on the encoding region.
// These blocks will be replaced with correct values later in code.
A(B,n,0),t>=7&&/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(e,t){let n,r,a;let i=e.size,o=m.getEncodedBits(t);for(let t=0;t<18;t++)n=Math.floor(t/3),r=t%3+i-8-3,a=(o>>t&1)==1,e.set(n,r,a,!0),e.set(r,n,a,!0)}(B,t),// Add data codewords
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */function(e,t){let n=e.size,r=-1,a=n-1,i=7,o=0;for(let l=n-1;l>0;l-=2)for(6===l&&l--;;){for(let n=0;n<2;n++)if(!e.isReserved(a,l-n)){let r=!1;o<t.length&&(r=(t[o]>>>i&1)==1),e.set(a,l-n,r),-1==--i&&(o++,i=7)}if((a+=r)<0||n<=a){a-=r,r=-r;break}}}(B,y),isNaN(a)&&(a=d.getBestMask(B,A.bind(null,B,n))),// Apply mask pattern
d.applyMask(a,B),// Replace format info bits with correct values
A(B,n,a),{modules:B,version:t,errorCorrectionLevel:n,maskPattern:a,segments:g})}(e,n,p,g)}},{"4cf6a8173d9f3a2":"2iHLf","2ad62f61c352884c":"kU8Fo","87d5a6270eb1dc26":"dvmjt","91abc94f777368cc":"4koKB","9737c3939ab85d95":"2m37T",cee3d371e219e45e:"9BWaM","8700c8c682afabf3":"2hy8U","65ad903a6ba3e":"ivpAq","1e8e447afb4d169c":"ixGQe","8a4a19af97836d80":"61NkN","26720f9d94c9e268":"4DCia","7b6429a248ecc51f":"2XDDf","1368d0fa14524351":"kBoY1"}],"2iHLf":[function(e,t,n){let r;let a=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */n.getSymbolSize=function(e){if(!e)throw Error('"version" cannot be null or undefined');if(e<1||e>40)throw Error('"version" should be in range from 1 to 40');return 4*e+17},/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */n.getSymbolTotalCodewords=function(e){return a[e]},/**
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
 */r.prototype.set=function(e,t,n,r){let a=e*this.size+t;this.data[a]=n,r&&(this.reservedBit[a]=!0)},/**
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
 */n.getRowColCoords=function(e){if(1===e)return[];let t=Math.floor(e/7)+2,n=r(e),a=145===n?26:2*Math.ceil((n-13)/(2*t-2)),i=[n-7]// Last coord is always (size - 7)
;for(let e=1;e<t-1;e++)i[e]=i[e-1]-a;return i.push(6)// First coord is always 6
,i.reverse()},/**
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
 */n.getPositions=function(e){let t=[],r=n.getRowColCoords(e),a=r.length;for(let e=0;e<a;e++)for(let n=0;n<a;n++)// Skip if position is occupied by finder patterns
(0!==e||0!==n)&&// top-left
(0!==e||n!==a-1)&&// bottom-left
(e!==a-1||0!==n)&&t.push([r[e],r[n]]);return t}},{"3fa093180e62a22a":"2iHLf"}],"9BWaM":[function(e,t,n){let r=e("6ec9ae5660047293").getSymbolSize;/**
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
*/n.getPenaltyN1=function(e){let t=e.size,n=0,a=0,i=0,o=null,l=null;for(let s=0;s<t;s++){a=i=0,o=l=null;for(let d=0;d<t;d++){let t=e.get(s,d);t===o?a++:(a>=5&&(n+=r.N1+(a-5)),o=t,a=1),(t=e.get(d,s))===l?i++:(i>=5&&(n+=r.N1+(i-5)),l=t,i=1)}a>=5&&(n+=r.N1+(a-5)),i>=5&&(n+=r.N1+(i-5))}return n},/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */n.getPenaltyN2=function(e){let t=e.size,n=0;for(let r=0;r<t-1;r++)for(let a=0;a<t-1;a++){let t=e.get(r,a)+e.get(r,a+1)+e.get(r+1,a)+e.get(r+1,a+1);(4===t||0===t)&&n++}return n*r.N2},/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */n.getPenaltyN3=function(e){let t=e.size,n=0,a=0,i=0;for(let r=0;r<t;r++){a=i=0;for(let o=0;o<t;o++)a=a<<1&2047|e.get(r,o),o>=10&&(1488===a||93===a)&&n++,i=i<<1&2047|e.get(o,r),o>=10&&(1488===i||93===i)&&n++}return n*r.N3},/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */n.getPenaltyN4=function(e){let t=0,n=e.data.length;for(let r=0;r<n;r++)t+=e.data[r];let a=Math.abs(Math.ceil(100*t/n/5)-10);return a*r.N4},/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */n.applyMask=function(e,t){let r=t.size;for(let a=0;a<r;a++)for(let i=0;i<r;i++)t.isReserved(i,a)||t.xor(i,a,/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */function(e,t,r){switch(e){case n.Patterns.PATTERN000:return(t+r)%2==0;case n.Patterns.PATTERN001:return t%2==0;case n.Patterns.PATTERN010:return r%3==0;case n.Patterns.PATTERN011:return(t+r)%3==0;case n.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(r/3))%2==0;case n.Patterns.PATTERN101:return t*r%2+t*r%3==0;case n.Patterns.PATTERN110:return(t*r%2+t*r%3)%2==0;case n.Patterns.PATTERN111:return(t*r%3+(t+r)%2)%2==0;default:throw Error("bad maskPattern:"+e)}}(e,i,a))},/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */n.getBestMask=function(e,t){let r=Object.keys(n.Patterns).length,a=0,i=1/0;for(let o=0;o<r;o++){t(o),n.applyMask(o,e);// Calculate penalty
let r=n.getPenaltyN1(e)+n.getPenaltyN2(e)+n.getPenaltyN3(e)+n.getPenaltyN4(e);// Undo previously applied mask
n.applyMask(o,e),r<i&&(i=r,a=o)}return a}},{}],ivpAq:[function(e,t,n){let r=e("7baaa530584d1bc4"),a=[// L  M  Q  H
1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[// L  M  Q  H
7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */n.getBlocksCount=function(e,t){switch(t){case r.L:return a[(e-1)*4+0];case r.M:return a[(e-1)*4+1];case r.Q:return a[(e-1)*4+2];case r.H:return a[(e-1)*4+3];default:return}},/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */n.getTotalCodewordsCount=function(e,t){switch(t){case r.L:return i[(e-1)*4+0];case r.M:return i[(e-1)*4+1];case r.Q:return i[(e-1)*4+2];case r.H:return i[(e-1)*4+3];default:return}}},{"7baaa530584d1bc4":"kU8Fo"}],ixGQe:[function(e,t,n){let r=e("742a7ee6d6a2d145");function a(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */a.prototype.initialize=function(e){// create an irreducible generator polynomial
this.degree=e,this.genPoly=r.generateECPolynomial(this.degree)},/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */a.prototype.encode=function(e){if(!this.genPoly)throw Error("Encoder not initialized");// Calculate EC for this data block
// extends data size to data+genPoly size
let t=new Uint8Array(e.length+this.degree);t.set(e);// The error correction codewords are the remainder after dividing the data codewords
// by a generator polynomial
let n=r.mod(t,this.genPoly),a=this.degree-n.length;if(a>0){let e=new Uint8Array(this.degree);return e.set(n,a),e}return n},t.exports=a},{"742a7ee6d6a2d145":"bFrZA"}],bFrZA:[function(e,t,n){let r=e("780c74029318268c");/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */n.mul=function(e,t){let n=new Uint8Array(e.length+t.length-1);for(let a=0;a<e.length;a++)for(let i=0;i<t.length;i++)n[a+i]^=r.mul(e[a],t[i]);return n},/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */n.mod=function(e,t){let n=new Uint8Array(e);for(;n.length-t.length>=0;){let e=n[0];for(let a=0;a<t.length;a++)n[a]^=r.mul(t[a],e);// remove all zeros from buffer head
let a=0;for(;a<n.length&&0===n[a];)a++;n=n.slice(a)}return n},/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */n.generateECPolynomial=function(e){let t=new Uint8Array([1]);for(let a=0;a<e;a++)t=n.mul(t,new Uint8Array([1,r.exp(a)]));return t}},{"780c74029318268c":"3WlDl"}],"3WlDl":[function(e,t,n){let r=new Uint8Array(512),a=new Uint8Array(256)/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */;!function(){let e=1;for(let t=0;t<255;t++)r[t]=e,a[e]=t,256&(e<<=1// multiply by 2
)&&(e^=285);// Optimization: double the size of the anti-log table so that we don't need to mod 255 to
// stay inside the bounds (because we will mainly use this table for the multiplication of
// two GF numbers, no more).
// @see {@link mul}
for(let e=255;e<512;e++)r[e]=r[e-255]}(),/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.log=function(e){if(e<1)throw Error("log("+e+")");return a[e]},/**
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
 */n.mul=function(e,t){return 0===e||0===t?0:r[a[e]+a[t]]}},{}],"61NkN":[function(e,t,n){let r=e("f67b02cdf61cb7c6"),a=e("777da0d92c463f2e"),i=e("acd5b4fcd696edf3"),o=e("5303c314c4a688d7"),l=e("663d0e03da8b2897"),s=r.getBCHDigit(7973);function d(e,t){// Character count indicator + mode indicator bits
return o.getCharCountIndicator(e,t)+4}/**
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
void 0===n&&(n=o.BYTE);// Total codewords for this QR code version (Data + Error correction)
let i=r.getSymbolTotalCodewords(e),s=a.getTotalCodewordsCount(e,t),c=(i-s)*8;if(n===o.MIXED)return c;let u=c-d(n,e);// Return max number of storable codewords
switch(n){case o.NUMERIC:return Math.floor(u/10*3);case o.ALPHANUMERIC:return Math.floor(u/11*2);case o.KANJI:return Math.floor(u/13);case o.BYTE:default:return Math.floor(u/8)}},/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */n.getBestVersionForData=function(e,t){let r;let a=i.from(t,i.M);if(Array.isArray(e)){if(e.length>1)return function(e,t){for(let r=1;r<=40;r++){let a=function(e,t){let n=0;return e.forEach(function(e){let r=d(e.mode,t);n+=r+e.getBitsLength()}),n}(e,r);if(a<=n.getCapacity(r,t,o.MIXED))return r}}(e,a);if(0===e.length)return 1;r=e[0]}else r=e;return function(e,t,r){for(let a=1;a<=40;a++)if(t<=n.getCapacity(a,r,e))return a}(r.mode,r.getLength(),a)},/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */n.getEncodedBits=function(e){if(!l.isValid(e)||e<7)throw Error("Invalid QR Code version");let t=e<<12;for(;r.getBCHDigit(t)-s>=0;)t^=7973<<r.getBCHDigit(t)-s;return e<<12|t}},{f67b02cdf61cb7c6:"2iHLf","777da0d92c463f2e":"ivpAq",acd5b4fcd696edf3:"kU8Fo","5303c314c4a688d7":"2XDDf","663d0e03da8b2897":"dFhhu"}],"2XDDf":[function(e,t,n){let r=e("488660fac9162579"),a=e("a23fd227d32f3622");/**
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
 */n.getBestModeForData=function(e){return a.testNumeric(e)?n.NUMERIC:a.testAlphanumeric(e)?n.ALPHANUMERIC:a.testKanji(e)?n.KANJI:n.BYTE},/**
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
 */n.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}},{}],fkiQV:[function(e,t,n){let r="[0-9]+",a="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";a=a.replace(/u/g,"\\u");let i="(?:(?![A-Z0-9 $%*+\\-./:]|"+a+")(?:.|[\r\n]))+";n.KANJI=RegExp(a,"g"),n.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),n.BYTE=RegExp(i,"g"),n.NUMERIC=RegExp(r,"g"),n.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let o=RegExp("^"+a+"$"),l=RegExp("^"+r+"$"),s=RegExp("^[A-Z0-9 $%*+\\-./:]+$");n.testKanji=function(e){return o.test(e)},n.testNumeric=function(e){return l.test(e)},n.testAlphanumeric=function(e){return s.test(e)}},{}],"4DCia":[function(e,t,n){let r=e("eeca831a42e85d6c"),a=r.getBCHDigit(1335);/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */n.getEncodedBits=function(e,t){let n=e.bit<<3|t,i=n<<10;for(;r.getBCHDigit(i)-a>=0;)i^=1335<<r.getBCHDigit(i)-a;// xor final data with mask pattern in order to ensure that
// no combination of Error Correction Level and data mask pattern
// will result in an all-zero data string
return(n<<10|i)^21522}},{eeca831a42e85d6c:"2iHLf"}],kBoY1:[function(e,t,n){let r=e("45f6d4bff9d2fc72"),a=e("73109cbf4f3c309d"),i=e("5320016e34c30467"),o=e("fd16f8f25b581951"),l=e("8a7b84039f1cf0d2"),s=e("79379a3a8f3c26bb"),d=e("66903ca51bd2ea1d"),c=e("3b9f47d541e7d71f");/**
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
 */function m(e,t,n){let r;let a=[];for(;null!==(r=e.exec(n));)a.push({data:r[0],index:r.index,mode:t,length:r[0].length});return a}/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */function g(e){let t,n;let a=m(s.NUMERIC,r.NUMERIC,e),i=m(s.ALPHANUMERIC,r.ALPHANUMERIC,e);d.isKanjiModeEnabled()?(t=m(s.BYTE,r.BYTE,e),n=m(s.KANJI,r.KANJI,e)):(t=m(s.BYTE_KANJI,r.BYTE,e),n=[]);let o=a.concat(i,t,n);return o.sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */function f(e,t){switch(t){case r.NUMERIC:return a.getBitsLength(e);case r.ALPHANUMERIC:return i.getBitsLength(e);case r.KANJI:return l.getBitsLength(e);case r.BYTE:return o.getBitsLength(e)}}/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */function h(e,t){let n;let s=r.getBestModeForData(e);// Make sure data can be encoded
if((n=r.from(t,s))!==r.BYTE&&n.bit<s.bit)throw Error('"'+e+'" cannot be encoded with mode '+r.toString(n)+".\n Suggested mode is: "+r.toString(s));switch(n!==r.KANJI||d.isKanjiModeEnabled()||(n=r.BYTE),n){case r.NUMERIC:return new a(e);case r.ALPHANUMERIC:return new i(e);case r.KANJI:return new l(e);case r.BYTE:return new o(e)}}/**
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
 */n.fromArray=function(e){return e.reduce(function(e,t){return"string"==typeof t?e.push(h(t,null)):t.data&&e.push(h(t.data,t.mode)),e},[])},/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */n.fromString=function(e,t){let a=g(e,d.isKanjiModeEnabled()),i=/**
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
 */function(e){let t=[];for(let n=0;n<e.length;n++){let a=e[n];switch(a.mode){case r.NUMERIC:t.push([a,{data:a.data,mode:r.ALPHANUMERIC,length:a.length},{data:a.data,mode:r.BYTE,length:a.length}]);break;case r.ALPHANUMERIC:t.push([a,{data:a.data,mode:r.BYTE,length:a.length}]);break;case r.KANJI:t.push([a,{data:a.data,mode:r.BYTE,length:u(a.data)}]);break;case r.BYTE:t.push([{data:a.data,mode:r.BYTE,length:u(a.data)}])}}return t}(a),o=/**
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
 */function(e,t){let n={},a={start:{}},i=["start"];for(let o=0;o<e.length;o++){let l=e[o],s=[];for(let e=0;e<l.length;e++){let d=l[e],c=""+o+e;s.push(c),n[c]={node:d,lastCount:0},a[c]={};for(let e=0;e<i.length;e++){let o=i[e];n[o]&&n[o].node.mode===d.mode?(a[o][c]=f(n[o].lastCount+d.length,d.mode)-f(n[o].lastCount,d.mode),n[o].lastCount+=d.length):(n[o]&&(n[o].lastCount=d.length),a[o][c]=f(d.length,d.mode)+4+r.getCharCountIndicator(d.mode,t)// switch cost
)}}i=s}for(let e=0;e<i.length;e++)a[i[e]].end=0;return{map:a,table:n}}(i,t),l=c.find_path(o.map,"start","end"),s=[];for(let e=1;e<l.length-1;e++)s.push(o.table[l[e]].node);return n.fromArray(s.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?e[e.length-1].data+=t.data:e.push(t),e},[]))},/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */n.rawSplit=function(e){return n.fromArray(g(e,d.isKanjiModeEnabled()))}},{"45f6d4bff9d2fc72":"2XDDf","73109cbf4f3c309d":"hTs8T","5320016e34c30467":"203uh",fd16f8f25b581951:"f7sIe","8a7b84039f1cf0d2":"1otz8","79379a3a8f3c26bb":"fkiQV","66903ca51bd2ea1d":"2iHLf","3b9f47d541e7d71f":"2Nh6w"}],hTs8T:[function(e,t,n){let r=e("29134b0b0820b091");function a(e){this.mode=r.NUMERIC,this.data=e.toString()}a.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(e){let t,n;// The input data string is divided into groups of three digits,
// and each group is converted to its 10-bit binary equivalent.
for(t=0;t+3<=this.data.length;t+=3)n=parseInt(this.data.substr(t,3),10),e.put(n,10);// If the number of input digits is not an exact multiple of three,
// the final one or two digits are converted to 4 or 7 bits respectively.
let r=this.data.length-t;r>0&&(n=parseInt(this.data.substr(t),10),e.put(n,3*r+1))},t.exports=a},{"29134b0b0820b091":"2XDDf"}],"203uh":[function(e,t,n){let r=e("9c7c9b869570f846"),a=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(e){this.mode=r.ALPHANUMERIC,this.data=e}i.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;// Input data characters are divided into groups of two characters
// and encoded as 11-bit binary codes.
for(t=0;t+2<=this.data.length;t+=2){// The character value of the first character is multiplied by 45
let n=45*a.indexOf(this.data[t]);// The character value of the second digit is added to the product
n+=a.indexOf(this.data[t+1]),// The sum is then stored as 11-bit binary number
e.put(n,11)}// If the number of input data characters is not a multiple of two,
// the character value of the final character is encoded as a 6-bit binary number.
this.data.length%2&&e.put(a.indexOf(this.data[t]),6)},t.exports=i},{"9c7c9b869570f846":"2XDDf"}],f7sIe:[function(e,t,n){let r=e("1658cb836325c397"),a=e("a20a51f6cd184253");function i(e){this.mode=a.BYTE,"string"==typeof e&&(e=r(e)),this.data=new Uint8Array(e)}i.getBitsLength=function(e){return 8*e},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},t.exports=i},{"1658cb836325c397":"lmLJ0",a20a51f6cd184253:"2XDDf"}],lmLJ0:[function(e,t,n){t.exports=function(e){for(var t=[],n=e.length,r=0;r<n;r++){var a=e.charCodeAt(r);if(a>=55296&&a<=56319&&n>r+1){var i=e.charCodeAt(r+1);i>=56320&&i<=57343&&(// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
a=(a-55296)*1024+i-56320+65536,r+=1)}// US-ASCII
if(a<128){t.push(a);continue}// 2-byte UTF-8
if(a<2048){t.push(a>>6|192),t.push(63&a|128);continue}// 3-byte UTF-8
if(a<55296||a>=57344&&a<65536){t.push(a>>12|224),t.push(a>>6&63|128),t.push(63&a|128);continue}// 4-byte UTF-8
if(a>=65536&&a<=1114111){t.push(a>>18|240),t.push(a>>12&63|128),t.push(a>>6&63|128),t.push(63&a|128);continue}// Invalid character
t.push(239,191,189)}return new Uint8Array(t).buffer}},{}],"1otz8":[function(e,t,n){let r=e("b935cfd1cd03a1f6"),a=e("ca4944585cc8d12d");function i(e){this.mode=r.KANJI,this.data=e}i.getBitsLength=function(e){return 13*e},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;// In the Shift JIS system, Kanji characters are represented by a two byte combination.
// These byte values are shifted from the JIS X 0208 values.
// JIS X 0208 gives details of the shift coded representation.
for(t=0;t<this.data.length;t++){let n=a.toSJIS(this.data[t]);// For characters with Shift JIS values from 0x8140 to 0x9FFC:
if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error("Invalid SJIS character: "+this.data[t]+"\nMake sure your charset is UTF-8");// Multiply most significant byte of result by 0xC0
// and add least significant byte to product
n=(n>>>8&255)*192+(255&n),// Convert result to a 13-bit binary string
e.put(n,13)}},t.exports=i},{b935cfd1cd03a1f6:"2XDDf",ca4944585cc8d12d:"2iHLf"}],"2Nh6w":[function(e,t,n){/******************************************************************************
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
var a,i,o,l,s,d,c,u={},m={};m[t]=0;// Costs of shortest paths from s to all nodes encountered; differs from
// `costs` in that it provides easy access to the node that currently has
// the known shortest path from s.
// XXX: Do we actually need both `costs` and `open`?
var g=r.PriorityQueue.make();for(g.push(t,0);!g.empty();)// ...and explore the edges that connect u to those nodes, updating
// the cost of the shortest paths to any or all of those nodes as
// necessary. v is the node across the current edge from u.
for(o in i=// In the nodes remaining in graph that have a known cost from s,
// find the node, u, that currently has the shortest path from s.
(a=g.pop()).value,l=a.cost,// Get nodes adjacent to u...
s=e[i]||{})s.hasOwnProperty(o)&&(// Cost of s to u plus the cost of u to v across e--this is *a*
// cost from s to v that may or may not be less than the current
// known cost to v.
d=l+s[o],// If we haven't visited v yet OR if the current known cost from s to
// v is greater than the new cost we just found (cost of s to u plus
// cost of u to v across e), update v's cost in the cost list and
// update v's predecessor in the predecessor list (it's now u).
c=m[o],(void 0===m[o]||c>d)&&(m[o]=d,g.push(o,d),u[o]=i));if(void 0!==n&&void 0===m[n])throw Error(["Could not find a path from ",t," to ",n,"."].join(""));return u},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],r=t;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,t,n){var a=r.single_source_shortest_paths(e,t,n);return r.extract_shortest_path_from_predecessor_list(a,n)},/**
   * A very naive priority queue implementation.
   */PriorityQueue:{make:function(e){var t,n=r.PriorityQueue,a={};for(t in e=e||{},n)n.hasOwnProperty(t)&&(a[t]=n[t]);return a.queue=[],a.sorter=e.sorter||n.default_sorter,a},default_sorter:function(e,t){return e.cost-t.cost},/**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */push:function(e,t){this.queue.push({value:e,cost:t}),this.queue.sort(this.sorter)},/**
     * Return the highest priority element in the queue.
     */pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=r},{}],i1BDL:[function(e,t,n){let r=e("5b3f7c513802d6c7");n.render=function(e,t,n){var a;let i=n,o=t;void 0!==i||t&&t.getContext||(i=t,t=void 0),t||(o=function(){try{return document.createElement("canvas")}catch(e){throw Error("You need to specify a canvas element")}}()),i=r.getOptions(i);let l=r.getImageWidth(e.modules.size,i),s=o.getContext("2d"),d=s.createImageData(l,l);return r.qrToImageData(d.data,e,i),a=o,s.clearRect(0,0,a.width,a.height),a.style||(a.style={}),a.height=l,a.width=l,a.style.height=l+"px",a.style.width=l+"px",s.putImageData(d,0,0),o},n.renderToDataURL=function(e,t,r){let a=r;void 0!==a||t&&t.getContext||(a=t,t=void 0),a||(a={});let i=n.render(e,t,a),o=a.type||"image/png",l=a.rendererOpts||{};return i.toDataURL(o,l.quality)}},{"5b3f7c513802d6c7":"3YBlJ"}],"3YBlJ":[function(e,t,n){function r(e){if("number"==typeof e&&(e=e.toString()),"string"!=typeof e)throw Error("Color should be defined as hex string");let t=e.slice().replace("#","").split("");if(t.length<3||5===t.length||t.length>8)throw Error("Invalid hex color: "+e);(3===t.length||4===t.length)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),6===t.length&&t.push("F","F");let n=parseInt(t.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:255&n,hex:"#"+t.slice(0,6).join("")}}n.getOptions=function(e){e||(e={}),e.color||(e.color={});let t=void 0===e.margin||null===e.margin||e.margin<0?4:e.margin,n=e.width&&e.width>=21?e.width:void 0,a=e.scale||4;return{width:n,scale:n?4:a,margin:t,color:{dark:r(e.color.dark||"#000000ff"),light:r(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}},n.getScale=function(e,t){return t.width&&t.width>=e+2*t.margin?t.width/(e+2*t.margin):t.scale},n.getImageWidth=function(e,t){let r=n.getScale(e,t);return Math.floor((e+2*t.margin)*r)},n.qrToImageData=function(e,t,r){let a=t.modules.size,i=t.modules.data,o=n.getScale(a,r),l=Math.floor((a+2*r.margin)*o),s=r.margin*o,d=[r.color.light,r.color.dark];for(let t=0;t<l;t++)for(let n=0;n<l;n++){let c=(t*l+n)*4,u=r.color.light;if(t>=s&&n>=s&&t<l-s&&n<l-s){let e=Math.floor((t-s)/o),r=Math.floor((n-s)/o);u=d[i[e*a+r]?1:0]}e[c++]=u.r,e[c++]=u.g,e[c++]=u.b,e[c]=u.a}}},{}],"8CcR1":[function(e,t,n){let r=e("c36bbcf663291acc");function a(e,t){let n=e.a/255,r=t+'="'+e.hex+'"';return n<1?r+" "+t+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function i(e,t,n){let r=e+t;return void 0!==n&&(r+=" "+n),r}n.render=function(e,t,n){let o=r.getOptions(t),l=e.modules.size,s=e.modules.data,d=l+2*o.margin,c=o.color.light.a?"<path "+a(o.color.light,"fill")+' d="M0 0h'+d+"v"+d+'H0z"/>':"",u="<path "+a(o.color.dark,"stroke")+' d="'+function(e,t,n){let r="",a=0,o=!1,l=0;for(let s=0;s<e.length;s++){let d=Math.floor(s%t),c=Math.floor(s/t);d||o||(o=!0),e[s]?(l++,s>0&&d>0&&e[s-1]||(r+=o?i("M",d+n,.5+c+n):i("m",a,0),a=0,o=!1),d+1<t&&e[s+1]||(r+=i("h",l),l=0)):a++}return r}(s,l,o.margin)+'"/>',m=o.width?'width="'+o.width+'" height="'+o.width+'" ':"",g='<svg xmlns="http://www.w3.org/2000/svg" '+m+('viewBox="0 0 '+d)+" "+d+'" shape-rendering="crispEdges">'+c+u+"</svg>\n";return"function"==typeof n&&n(null,g),g}},{c36bbcf663291acc:"3YBlJ"}],"1tOWF":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function a(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function i(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function o(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,r=document.getElementById("addressCO").value,a=document.getElementById("addressPostalCode").value,i=document.getElementById("addressCity").value,o=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",r=r?r.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:r,addressPostalCode:a=a?a.trim().replace(/\D/g,""):"",addressCity:i=i?i.trim().charAt(0).toUpperCase()+i.trim().slice(1):"",addressDoorCode:o=o?o.trim():""}}function l(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function s(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function d(e){let t=e.images;return t.modelImage?t.modelImageSmall||t.modelImage:t.coverImage?t.coverImageSmall||t.coverImage:t.enhancedFrontImage?t.enhancedFrontImageSmall||t.enhancedFrontImage:t.frontImageSmall||t.frontImage}function c(){let e=user.current.referralData.referralCode,t=`Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${e}`;if(navigator.share)navigator.share({text:t,url:`https://maiapp.se/?invite=${e}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://maiapp.se/?invite=${e}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}r.defineInteropFlag(n),r.export(n,"signOut",()=>a),r.export(n,"setFormAddressFields",()=>i),r.export(n,"getFormAddressFields",()=>o),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
r.export(n,"isValidSwedishSsn",()=>l),r.export(n,"formatPersonalId",()=>s),r.export(n,"itemCoverImage",()=>d),r.export(n,"shareCode",()=>c)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],ljI8R:[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function a(e,t){/*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/var n;function r(e){/*a function to classify an item as "active":*/if(!e)return!1;/*start by removing the "active" class on all items:*/(function(e){/*a function to remove the "active" class from all autocomplete items:*/for(var t=0;t<e.length;t++)e[t].classList.remove("autocomplete-active")})(e),n>=e.length&&(n=0),n<0&&(n=e.length-1),/*add class "autocomplete-active":*/e[n].classList.add("autocomplete-active")}function a(t){for(var n=document.getElementsByClassName("autocomplete-items"),r=0;r<n.length;r++)t!=n[r]&&t!=e&&n[r].parentNode.removeChild(n[r])}/*execute a function when someone writes in the text field:*/e.addEventListener("input",function(r){var i,o,l,s=this.value;if(/*close any already open lists of autocompleted values*/a(),!s)return!1;/*for each item in the array...*/for(n=-1,/*create a DIV element that will contain the items (values):*/(i=document.createElement("DIV")).setAttribute("id",this.id+"autocomplete-list"),i.setAttribute("class","autocomplete-items"),/*append the DIV element as a child of the autocomplete container:*/this.parentNode.appendChild(i),l=0;l<t.length;l++)/*check if the item starts with the same letters as the text field value:*/t[l].substr(0,s.length).toUpperCase()==s.toUpperCase()&&(/*make the matching letters bold:*//*create a DIV element for each matching element:*/(o=document.createElement("DIV")).innerHTML="<strong>"+t[l].substr(0,s.length)+"</strong>",o.innerHTML+=t[l].substr(s.length),/*insert a input field that will hold the current array item's value:*/o.innerHTML+="<input type='hidden' value='"+t[l]+"'>",/*execute a function when someone clicks on the item value (DIV element):*/o.addEventListener("click",function(t){/*insert the value for the autocomplete text field:*/e.value=this.getElementsByTagName("input")[0].value,e.dispatchEvent(new Event("input")),e.dispatchEvent(new Event("blur")),"Levi"===e.value&&(e.value="Levi's",console.log('this.getElementsByTagName("input")[0].value',this.getElementsByTagName("input")[0].value),console.log('this.getElementsByTagName("input")',this.getElementsByTagName("input"))),/*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/a()}),i.appendChild(o));i.innerHTML||a()}),/*execute a function presses a key on the keyboard:*/e.addEventListener("keydown",function(e){var t=document.getElementById(this.id+"autocomplete-list");t&&(t=t.getElementsByTagName("div")),40==e.keyCode?(/*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/n++,/*and and make the current item more visible:*/r(t)):38==e.keyCode?(/*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/n--,/*and and make the current item more visible:*/r(t)):13==e.keyCode&&(/*If the ENTER key is pressed, prevent the form from being submitted,*/e.preventDefault(),n>-1&&t&&t[n].click())}),// TOBIAS ADDED
/*execute a function when bluring the input field:*/e.addEventListener("blur",function(e){setTimeout(function(){a()},50)}),/*execute a function when someone clicks in the document:*/document.addEventListener("click",function(e){a(e.target)})}r.defineInteropFlag(n),r.export(n,"autocomplete",()=>a),r.export(n,"brands",()=>i);let i=["& Other Stories","2nd Day","3.1 Phillip Lim","5 Preview","7 For All Mankind","A Day's March","A Nordin","A Pair","A part of the art","A-COLD-WALL","A-view","A. Christensen","Abercrombie & Fitch","Abercrombie Fitch","Acne Studios","Adanola","ADER error","Adidas","Adieu","Adnym Atelier","Adolfo Dominguez","Adoore","Adrianna Papell","Adventure boots","Aelfric eden","A\xe9ryne","AGN\xc8S B.","AGN\xc8S DE VERNEUIL","Agolde","AHLVAR GALLERY","Aim\xe9 Leon Dore","Ala\xefa","Alain Mikli","Alan Crocetti","Alan Paine","Alberto guardiani","Alberville","Alden","Alessandrini","Alexa Chung","Alexander McQueen","Alexander Wang","Alice & Olivia","All Blues","All Saints","All saints","Allen Edmonds","Allude","Almost famous","Alohas","Alpha Industries","Altuzarra","Amaort","Ambre","Ambre Babzoe","Ambush","American Apparel","American Eagle Outfitters","American Retro","American Vintage","AMI","AMIRI","Ammann","Amust","Anatomic Co","Andrea Fenzi","Anerkjendt","Angel infantes","Angulus","Anine Bing","Ann Demeulemeester","Ann Taylor","Anna","Anna Field","Anna Holtblad","Anni Lu","Anti Social Social Club","Anton Heunis","Antony Morato","APC","APC","Apepazza","AQAQ","Ara","Arbesko","Arc'Teryx","Arcopedico","Area forte","Aries","Arket","Armani","Armani Exchange","Armani jeans","Art kids","Ash","Asics","Asket","Asos","Aspesi","Astrid Andersen","Atmosphere","ATP Atelier","ATP Atelier","Audley","Australian luxe","AVAVAV","Avon Celli","Awake NY","AX Paris","Axel Arigato","Azzaro","Azzezo","B Store","B.Young","ba&sh","Babolat","Babycham","Back","Badgley mischka","Baffin","Bagutta","Baldessarini","Balenciaga","Ballerina closet","Bally","Balmain","Banana Republic","BAPE","Barbour","Bardot","Barena","Barker","BARRAG\xc1N","Barund CPH","Base London","Batistini","Baum und Pferdgarten","Bcbg Max Azria","Bebe","Beck Sonder Gaard","Becks\xf6ndergaard","Bel Air","Belle by Sigerson Morrison","Belmondo","Belstaff","Ben Sherman","Benetton","Bensimon","Bergans of Norway","Bergstein","Bershka","Bertoni","Betty Blue","Betula","Bianca Chand\xf4n","Bianco","Bik Bok","Bikkembergs","Billabong","Billi Bi","Billionaire Boys Club","Bimba y Lola","Birgitte Herskind","Birkenstock","Bisgaard","Bitte Kai Rand","Biviel","BJORN BORG","Bj\xf6rg","Bj\xf6rn Borg","Black Lily","Black Secret","Black Venus","Blackstone","Blankens","Blauer","Blend","Blink","Blk Dnm","Bloch","Blonde No.8","Blowfish","Bluebella","Blundstone","Bl\xe5kl\xe4der","Bl\xe4ck","Bobbie Burns","Boblbee","Bobux","Bode","BOGGI","Boglioli","Bogs","Bondelid","Boohoo","Boomerang","Boras","Bosch","Boss","Bottega Veneta","Boxfresh","Brain Dead","Brako","Brand Industries","Brandit","Braqeez","Brave Soul","Breitling","Bric-a-Brac","Brioni","British knights","Brixtol","Brixton","Bronx","Brooks Brothers","Brunng\xe5rd","Bruno Banani","Bruno Magli","Bruno Premi","Bruun & Stengade","Bruuns Bazaar","Buffalo","Bugatti","Bukvy","Bullboxer","Bulldozer","Bundgaard","Burberry","Burton","Buscemi","Busnel","Butter goods","Butterfly twists","Bvlgari","BXY","By Burin","By Malene Birger","By Malina","Byblos","B\xe5stad original","C.P. Company","C1rca","Ca Shott","Cactus Plant Dlea Market","Cafenoir","Calida","Call It Spring","Callaway","Calou","Calvin Klein","Calvin Klein Jeans","Camaieu","Cambio","Camel","Camilla Thulin","Camper","Campomaggi","Canada Goose","Canada Snow","Candice Cooper","Canon","Cappelletti","Caprice","Carhartt","Carin Wester","Caroline Hjerpe","Caroline Svedbom","Carpisa","Carriwell","Cars","Cartier","Carvela","Carven","Casablanca","Casall","Castaner","Catarina Martins","Caterpillar","CATH KIDSTON","Cathrine Hammel","Cavalet","Cayler & Sons","CDLP","Ceannis","Cece L Amour","Cecil","Cecilie bahnsen","CECILIE Copenhagen","Celavi","C\xe9line","Celio","Cellbes","Cellini","Cerruti","Chaco","Champion","Chanel","Chanelle","Charles David","Charles Jeffrey Loverboy","Cheap Monday","Cheapo","Chelsea Peers","Chi Chi London","Chie Mihara","Chimi","China girl","Chinese laundry","Chipie","Chipmunks","Chlo\xe9","Chopard","Christian Lacroix","Christian Louboutin","Christopher Kane","Church’s","Cinque","Ciso","Citizens Of Humanity","Citybird","Clae","Clarks","Claudie Pierlot","Clip Rope","Club L","Club Monaco","CMMN SWDN","Coach","Cobra golf","Coccinelle","Cole Haan","Collusion","Colmar","Colors of California","Colourful Rebel","Columbia","Comma","Comme Des Garcons","Comme des Gar\xe7ons","Common Projects","Comptoir Des Cotonniers","Conguitos","Converse","Copenhagen Muse","Copenhagen studios","Coperni","Coral blue","Corniche By Trickers","Cortefiel","Cos","Coster Copenhagen","Cotton On","Courr\xe8ges","Craft","Craig Green","Cream","Creative recreation","Crime","Criminal Damage","Crocker","Crockett & Jones","Crockett& Jones","Crocs","Croft & Barrow","Cross","Cubus","Culture","Cushe","Custommade","Cutler & Gross","C\xf4te & Ciel","D for Dasia","D.A.T.E.","D&G","Dada","Dagmar","Dahlin","Daisy Grace","Dala clogs","Damir Doma","Damn heels","Dance","Daniblack","Daniel W. Fletcher","Darkstone","Davida","Day Birger & Mikkelsen","Day birger et mikkelsen","DC Shoes","Dea Kudibal","Deadwood","Debbie","DeFacto","Defend Paris","Dekline","Denim Hunter","Depeche","Derhy","Design House Stockholm","Designers remix","Desigual","Deus ex machina","Dewalt","Diadora","Diana Orving","Diane von Furstenberg","Diavolina","Dickies","Dico Copenhagen","Diddi","Didriksons","DIEGA","Diemme","Diesel","Diggers","Dime","DinSko","Dior","Dirty Laundry","Disney","Dita","Divided","Dixie","Djerf Avenue","DKNY","Dkode","Do-win","Dockers","Dockers by Gerli","Docksta","Dodo bar or","Dolce & Gabbana","Dolly Do","Dollybird","Dolomite","Don Donna","Dondup","Donna girl","Donna Karan","Dopie","Dorina","Dorothy Perkins","Dr. Denim","Dr. Martens","Dr. Martens","Dranella","Draven","Dreimaster","Dressmann","Dries van Noten","Dry Lake","Drykorn","Dsquared2","Duffy","Dune","Dunhill","Duskii","D\xe4v","Eagle","Eastpak","Ebbe","Ecco","Eckhaus Latta","Ecko","Ed Hardy","Edwin","Efva Attling","Ek of Sweden","Ekn","El Naturalista","Element","Eleven Paris","Elie Saab","Elie tahari","Elisabetta Franchi","Ellesse","Elliatt","Ellos","Elvine","Elvio Zanon","Em","Emerica","Emilio","Emilio Pucci","Emily van den Bergh","Emporio armani","Emu Australia","Energie","Enfant","Enfants Riches D\xe9prim\xe9s","Engineered Garments","Envie de Fraise","Envii","Equipment","Erdem","Erfo","Ermenegildo Zegna","Escada","Eser","Eskimo","Esprit","Esska","Etam","Etienne Aigner","Etki","Etnies","Eton","Etro","Ettore Adriano","\xc9tudes","Even & Odd","Everest","Evisu","Exani","Exte","Eytys","Ezpz","F-Troupe","Fabi","Fabiana","Fabletics","Facetasm","Faguo","FALKE","Fantasy","Fashion by C","Fashion nova","Fashion Union","Fear Of God Essentials","Feiyue","Fendi","Fenty","Festool","Feud","Fila","Filippa K","Fiona McGuinness","Fiorelli","Firetrap","Fitflop","Fiveunits","Fjallr\xe4ven","Fj\xe4llr\xe4ven","Flash","Flattered","Fly London","Forever 21","Forever New","Fornarina","Fossil","Foxiedox","Frame","Frame Denim","Francesco Morichetti","Franco Sarto","Frank lyman","Frank Wright","Franklin & Marshall","Fred Perry","Free People","Freeman T. Porter","Freequent","French Connection","French Sole","Fresas con Nata","Friboo","Friis Company","From Future","Fruit of The Loom","Frye","Fubu","Fuchs Schmitt","Furla","FWSS","G STAR RAW","G-Star","G-STAR RAW","Gaastra","Gabba","Gabor","Galaxy","Game Boy","Ganni","Gant","Gap","Garden","Gardenia","Gardeur","Garmont","Garvalin","Gasp","GCDS","Geggamoja","Gentle Monster","Genuine Leather","Geox","Gerry Weber","Gestuz","Ghibi","Giacomorelli","Giambattista Valli x H&M","Gianni versace","Giesswein","Gigli","Gilberto","Gildan","Gina Tricot","Giuseppe Zanotti","Givenchy","Glagla","Glamorous","Glerups","GmbH","Gneis","Gogos","Gola","Golden Goose","Goliath","Good news","Gosha Rubchinskiy","Gourmet","Goyard","Gram","Graninge","Gravis","Green Comfort","Groundhog","Guardiadi","Gucci","Gudrun Sj\xf6d\xe9n","Guess","Guidi","Gul & Bl\xe5","Gulliver","Gunilla Ponten","Gymshark","H by Hudson","H&M","H&M Conscious exclusive","H&M STUDIO","H2o Fagerholt","Hackenbusch","Hackett","Hagl\xf6fs","Haider Ackermann","Han Kj\xf8benhavn","Happiness","Happy Holly","Happy Socks","Hard Hearted Harlot","Havaianas","Head","Heelys","Heimstone","HELIOT EMIL","Hell bunny","Helly Hansen","Helmut Lang","Henri Lloyd","Henrik Vibskov","Herm\xe8s","Heron Preston","Herschel","Hip","Hispanitas","Hobbs","Hogan","Hoka One One","Hollies","Hollister","Hood By Air","Hope","Horizn studios","Hoss","Houdini","House Of Dagmar","House of Harlow 1960","House of Lola","House of Montague","Hoya","Hub","Hub Footwear","Hudson","Hugo Boss","Hummel","Hunkem\xf6ller","Hunkon","Hunky Dory","Hunter","Hush Puppies","Husqvarna","Hype","IAMELENI","IcanIwill","Iceberg","Icebug","Ichi","Ida Sj\xf6stedt","IDEAL OF SWEDEN","Ikks","Ilenia P","Ilse Jacobsen","Ilves","Improvd","Imsevimse","Indiska","Inov8","intimissimi","Intrigo","INUIKII","InWear","IRO","Iron Fist","Irregular Choice","Isabel Marant","Isabel Marant Etoile","Issey Miyake","Ivory","J brand","J.Crew","J.Lindeberg","J.W. Anderson","Jack & Jones","Jack and Lily","Jack Wolfskin","Jackal","Jackpot","Jacqueline de Yong","Jacquemus","Jaded London","Jako","Jalas","Jana","Jascha Stockholm","JDY","Jean Paul Gaultier","JEANERICA","Jeffrey Campbell","Jenny by Ara","Jerome Dreyfuss","Jessica Simpson","Jet Set","Jil Sander","Jim Rickey","Jimmy Choo","JJ Footwear","Jofama","John Fluevog","John Galliano","John Spencer","Johnny Bulls","Johnny Was","Johnston Murphy","Joop!","Jordan","Josef Seibel","Joseph","Juicy Couture","Julie Fagerholt","Jumperfabriken","Junk De Luxe","Junkyard","Junya Watanabe","Just Female","Juun.J","K Cobler","K-Swiss","K1X","Kaffe","Kameleont","Kamik","Kangaroos","Kanna","Kaporal","Kappa","KappAhl","Karen by Simonsen","Karen Millen","Karen walker","Karhu","Kari Traa","Karin Halvors","Karl Kani","Karl Lagerfeld","Karmamia","Kat Von D","Kate Spade","Kathleen Madden","Katvig","Kavat","Kawasaki","Keds","Keen","Keep","KENDALL + KYLIE","Kennel Schmenger","Kenneth Cole","Kenzo","Kenzo X H&M","KG by Kurt Geiger","Khaite","Khrio","Kickers","Kidboxer","Kik Kid","Kiko Kostadinov","Killah","Kimmik","King","Kings of Indigo","Kl\xe4ttermusen","Kmb","KnowledgeCotton Apparel","Kompis","Konrad","Kookai","Koral","Korii Joko","Kowalski","Kriss Sweden","Kron by Kron","Kronstadt","Ksubi","KTZ","Kurt Geiger","KVD Los Angeles","L A Gear","L Homme Rouge","L.A.M.B.","L'agence","La Chemise","La Martina","La Perla","La Strada","Lacoste","Lacoste Live","Lacrosse","Lady CG","Lager 157","Lakai","Laksen","Lancel Paris","Lanvin","Lascana","Laura Biagiotti","Laura by Heppo","Lauren Ralph Lauren","LauRie","Lavoro","Lawrence Grey","Lazamani","LdiR","Le Chameau","Le Coq Sportif","Le Specs","LE TEMPS DES CERISES","Lee","Legend","Legero","Lego","Lemaire","Leonard Paris","Les Coyotes de Paris","Les Deux","Lesson 2","Levete Room","Levi's","Lexington","Liam Hodges","Libertine-Libertine","Lidl","Liebeskind Berlin","Lily & Rose","Lily And Rose","Linda Farrow","Lindbergh","Lindex","Line of Oslo","Lipsy","Lisa Larson","Lise Lindvig","Little Liffner","Little Marcel","Little Mistress","Liu Jo","Liverpool","Living Kitzb\xfchel","Livly","Lk Bennett","Loake","Lodi","Loewe","Loints of Holland","Lola Ramona","Londain","London Rebel","Longchamp","Lonsdale London","Looking","Loro Piana","Lost Ink","Lotto","Louis Vuitton","Loulou Studio","LTB","Luca Bossi","Ludwig Reiter","Lululemon","Lundhags","Lundmyr of Sweden","Lupilu","Lurdes Bergada","Luxury Rebel","Lyle & Scott","Lyle and Scott","L\xe4eder by Nature","Maa","Madewell","Mads N\xf8rgaard","Magicfelt","Magnanni","Maians","Maison Kitsun\xe9","Maison Margiela","Maison Martin Margiela","Maison Scotch","Maje","Maloles","Mamalicious","Mammut","Manas","Mango","Manolo Blahnik","Mansur Gavriel","Manufacture D Essai","Marc","Marc Aurel","Marc Cain","Marc Ecko","Marc Jacobs","Marc O Polo","Marc O'Polo","Marcelo Burlon","Marco Bossi","Marcus Martinus","Marella","Margaret Howell","Maria Black","Maria Nilsdotter","Marimekko","Marina Ferranti","Marine Serre","Mario Valentino","Marks & Spencer","Marlboro","Marlboro classics","Marmot","Marni","Marques Almeida","Mars\xe8ll","Marta Jonsson","Martine Ali","Martine Rose","Martinelli","Masai","Maska","Massimo Dutti","Matinique","Mauri","Mauro Grifoni","Mavi","Mavic","Max & Co","Max Mara","Max Mara 'S","Max Mara Weekend","Maya deluxe","Mayla","MbyM","McKenzie","McKinley","MCS","Me&I","Meadows","Meindl","Mel","Mellow Yellow","Melton","Melvin Hamilton","Menbur","Mensfield","Mentor","Merchandise","Merrell","Mes Dames","Meshki","Mexicana","Mexx","Micha","Michael Kors","Mickey Club","Miezko","Mih Jeans","Millen","Mina UK","Mini for Many","Mini Rodini","Minimarket","Minimum","Minna Heino","Minna Parikka","Minnetonka","Minnie Mouse","Minus","Mirunz","MISBHV","Miss KG","Miss Me","Miss P","Miss Selfridge","Miss Sixty","Missguided","Missoni","Mister Tee","Mitchell & Ness","Miu Miu","Mjus","Mm6","Mocklis","Mod8","Moda di Fausto","Moeva","Mohedatoffeln","Mohino","Molly Holly","Molo","Moma","Momino","Moncler","Monitor","Monki","Monsoon","Monster High","Montblanc","Montrail","Moomin","Moon Boot","Moonstar","Moose Knuckles","Moreschi","Morris","MOS Copenhagen","Mos Mosh","Moschino","Moschino Love","Moss Copenhagen","Mother","Mother of Pearl","Mouli","MQ","MSGM","MUCHACHOMALO","Muckboot","Muddus","Mugler","Muji","Mulberry","Mumbai","Mumin","Munthe","Munthe plus Simonsen","Mustang","Musto","Muubaa","Muxart Barcelona","Mykita","NA-KD","NAF NAF","Name It","Nana","Nanushka","Napapijri","Nasty gal","NATIONAL GEOGRAPHIC","Native","Naturino","Nautica","Navigator","Needles","Neil Barrett","Nelly","Neo noir","Neosens","Nestor","Network","Neuw","New Balance","New Black","New Era","New Look","New Rock","New York & Company","New Yorker","New Zealand Boots","Newbie","Newhouse","Next","NG by Tero Palmroth","Nicholas Kirkwood","Nike","Nikolaj d'\xc9toiles","Nine West","Nintendo","NN07","Noa Noa","Noah","Nobrand","No\xeb","Noel","Noisy May","Nokia","Nokian","Nolita","Nome","Non Sign\xe9 / Unsigned","Noodles","Noppies","Norr","Norrback","North Sails","Northwawe","Notabene","Notes du Nord","Nova Star","Novita","Novita Man","Nude","Nudie","Nudie Jeans","Nueva Epoca","Nunoo","N\xfanoo","Nyg\xe5rdsanna","N\xfcmph","O","O'Neill","Oakley","Oakwood","OAS Company","Oasis","Obey","Object","Ocra","Odd Molly","Odeur","ODLO","Off-White","Oill","Olang","Old Navy","Old Soles","Oliver Peoples","Olsenhaus Pure Vegan","Olymp","Omega","On","One True Saxon","Onemoment","OnePiece","Oneteaspoon","Onetruesaxon","Onitsuka Tiger","Online Ceramics","Only","ONLY & SONS","Onne","Opus","Original Penguin","Orla Kiely","Orrefors","Orsay","Oscar Jacobson","Osiris","Ottolinger","Our Legacy","Oxygen","Oysho","Paco Gil","Paco Mena","Paco Rabanne","Paez","Paige","Pairs in Paris","Pajar","Pakros","Palace","Palladium","Palm Angels","Paloma wool","Palomo Spain","Panama Jack","Pandora","Pantofola d`Oro","Papillio","Paraboot","Parajumpers","PARFOIS","paria /FARZANEH","Paris Hilton","Parisienne","Park lane","Park west","Part Two","Patagonia","Pataugas","Patrick","Patrizia Pepe","Paul & Friends","Paul & Joe","Paul Frank","Paul Green","Paul Shark","Paul Smith","Pavement","Pax","Peak Performance","Pearl Izumi","Pedag","Pelle P","Penelope","Pepe Jeans","Peperoni","Pepino by Ricosta","Peppercorn","Perfect","Persol","Pertti Palmroth","Peter Kaiser","Petit Bateau","Phase Eight","Philipp Plein","Pieces","Pier One","Pierre Cardin","Pikolinos","Pilgrim","Pimkie","Pink","Pinko","Pinocchio","Play Comme des Gar\xe7ons","Plexx","Po Zu","Poetic","Poetic Licence","Pointer","Polar Loop","Polar Skate Co.","Polarn O. Pyret","Polaroid","Polecat","Polo Ralph Lauren","Pom D Api","Pony","Posse","POW","Prada","Pr\xeat \xe0 Porter","Pretty Ballerinas","Primark","Primeboots","Primigi","Primo Piano","Principe di Bologna","Pring","Pringle of Scotland","Proenza Schouler","Progetto","Prokeds","Pull & Bear","PULZ","Puma","Puma by Alexander McQueen","Pura Lopez","Pure Cashmere Nyc","Pyer Moss","Qasimi","Quay","Quick","Quicksilver","Quiksilver","R.M.Williams","R13","Rabalder","Rabens Saloner","Race Marine","Radii","Raf Simons","Rag & Bone","Ragdoll","Rains","Ralph Boston","Ralph Lauren","Ralph Lauren Denim & Supply","Rap","Ras","Ravn","Ray-Ban","RE-HASH","R\xe9alisation","Rebecca Minkoff","Rebecca Taylor","Red valentino","Redfoot","Redwing","Reebok","Reef","Refined by Bobbie Burns","Rehab","Reima","Reiss","Repeat","Replay","Reschia","Reserved","Residus","Rester\xf6ds","RETROSUPERFUTURE","Rhude","Rice","Rick Owens","Ricosta","Rieker","Rimowa","Rinascimento","Rip Curl","Rip N Dip","River Island","Rivieras","Rizzo","Roberto Botella","Roberto Cavalli","Robustor","Rocco P","Rock and Blue","Rockabilly","Rockandblue","Rocket Dog","Rockport","Rodebjer","Rohde","Rokin","Rolex","Rolling Stones","Rombaut","Romika","Roobin's","Roots","Rose & Born","Rosemunde","Rosner","Rotate","Rotate Birger Christensen ","Rouje","Roxy","Royal RepubliQ","Rubber Duck","Ruby Brown","Rue de Femme","Rugged Eagle footwear","Rugged Gear","Rules by Mary","Rut & Circle","Ruthie Davis","R\xf6hnisch","S. Oliver","Sacai","Sadie & Sage","Sail Racing","Saint Laurent","Saint Tropez","Saint Vacant","Salamander","Salming","Salomon","Salvatore Ferragamo","Sam Edelman","Sams\xf8e Sams\xf8e","Sancho Boots","Sand","Sand Copenhagen","Sanders","Sandqvist","Sandro","Sandro Paris","Sanita Clogs","Sanita Workwear","Sanuk","Saucony","Sbar","Sbu","Scarpa","Schmoove","Schneiders","Scholl","Schott","Scorett","Scotch & Soda","Sebago","Sebastian","Second Female","See by Chlo\xe9","S\xe9fr","Seidensticker","Selected","Selected homme","Self-Portrait","Senator","Senso","S\xe9raphine","Sergio Tacchini","Sessun","S\xe9zane","Shabbies Amsterdam","Shabby Chic","Shake it up","Shein","Shepherd","Shimano","Shoe Biz","Shoe Biz by Gardenia","Shoe shi bar","Shoe the Bear","Sies Marjan","Sievi","Simone Gabor","Simone Rocha","Simple","Sinsay","Sioux","Sisley","Sisters Point","Six Ames","Sixth June","Sixtyseven","Skechers","Skin by Finsk","Skofabriken Stockholm","Sk\xf6na Marie","Sloggi","Sneaky Steve","Snipe","Soaked","Soaked In Luxury","SOC","Soda","Sofie Schnoor","Soft Comfort","Soft Goat","Soft Rebels","Softinos","Sole","Solid","Someday","Sonia Rykiel","Sony","Sophie by Sophie","Sorel","Soulland","Soulmate","Soulstar","Soxo","Soyaconcept","Spalwart","Spanx","Speedo","Sperry Top-Sider","Spiderman","Spm","Sportmax","Sportswear","Springfield","SSS World Corp","Stampd","Stand Studio","Star Trek","Star Wars","Stau","Stefanel","Steffen Schraut","Stella McCartney","Stella McCartney Pour Adidas","Stella Nova","Stenk","Stenstr\xf6ms","Steptronic","Steve Madden","Steven alan","Sthlm DG","Stig Lindberg","Stine Goya","STOCKH LM","Stone Island","Stork Steps","Stradivarius","Strawberry Shortcake","Street One","Strellson","STRONGER","Str\xf6ms","Stuart Weitzman","Stutterheim","Stylein","Stylesnob","St\xfcssy","Suecomma Bonnie","Sugarfree shoes","Sugarhill Brighton","Sun Buddies","Suncoo","Sunnei","Superdry","Superfit","Superga","Supertrash","Supra","Supreme","Supremebeing","Svea","Swear London","Swedish Hasbeens","Sweeks","Swims","Swissies","T.U.K.","Tamaris","Tara Jarmon","Targus","Tatoosh","Tbs","Techno","Tecnica","Ted Baker","Telfar","Tellus","Ten Points","Tenson","Terra Plana","Terranova","Tessa Mimmi Clogs","Testbrand","Teva","Tezenis","TFNC London","The classy issue","The Kooples","The last conspiracy","the local firm","The North Face","The Row","The Seller","THE SHIRT FACTORY","The Urban Project","The Vampire's Wife x H&M","Theory","Theresia M.","These Glory Days","Thierry Lasry","Think","Thinsulate","Thom Brovne","Thomas Sabo","Thrasher","Tiamo","Tibi","Tiger","Tiger mist","Tiger of Sweden","Tigha","Timberland","Tissot","Tiziana","TNY","Toga Pulla","Tom Ford","Tom Joule","Tom Tailor","Tom Wood","Tommy Bahama","Tommy Hilfiger","Tommy Jeans","Toms","Tony Mora","Tony Perotti","Topman","Topshop","Tory Burch","Tosca Blu","Toteme","Tous","Toy Story","Treksta","Trendyol","TR\xc9S BIEN","Tretorn","Triangl","Triwa","True Religion","Trussardi","Tsubo","Tuzzi","Twin Set","Twist & Tango","U.S. Polo Assn.","U.S. Star","Ugg","Ukala","Ulla Popken","Ulle","Umbro","Undefteated","Under Armour","Undercover","Underground","Underground England","Uniforms for the Dedicated","Uniqlo","Unisa","United Colors of Benetton","United Nude","Uno","Unstiched Utilities","Urban Outfitters","Urban revivo","Uterque","V Ave Shoe Repair","Vagabond","Vailent","Valentino","Valentino Garavani","Valerie","Valerie Khalfon","Valontano","Valsport","Van Gils","Van Laack","Vanessa Bruno","Vans","Veja","Velour","Venettini","Venice","Vero Moda","Veronica Virta","Versace","Versace 19.69","Vetements","Via vai","Vibram","Victoria","Victoria Beckham","Victoria’s Secret","Viking","Viktor&Rolf","Vila","Villervalla","Vince","Vince Camuto","Vincent","Vintage","Virus","Vision","Visvim","Vithings Pulse","Vivienne Westwood","Vivobarefoot","Vlado","Volcom","Voly","Vood Vood","Vt collection","Wallis","Walter Van Beirendonck","Wandelei","Warehouse","Warrior","Weekday","Wera","Werner","Werner Kern","Wesc","Whistles","White Mountaineering","Why Not","Whyred","Wiges","Wildflower","Williot","Wilson","Winnie the Pooh","Woden","Wolsey","Wolverine","Won Hundred","Wonderbra","Wonders","Wood Wood","Woolrich","World Industries","WOS","Wrangler","WTAPS","Xenon","Xti","Xti Kids","Y-3","Y/Project","Yamaha","Yang Li","YAS","YAYA","Yeezy","Yellow Cab","YKX","Yoana baraschi","Yohji Yamamoto","Yourturn","Yves Saint Laurent","Zadig & Voltaire","Zara","Zay","Zdar","Zeus","Zign","Zimmermann","Zizzi","Zoggs","Zoo York","Zunblock","\xc5hl\xe9ns"]},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],kdF4Q:[function(e,t,n){let r,a;var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(n),i.export(n,"setFieldValue",()=>s),i.export(n,"showModelSuggestion",()=>d),i.export(n,"showSelectedModel",()=>c),i.export(n,"selectFieldValue",()=>m),i.export(n,"setFormValuesFromModel",()=>g),i.export(n,"setupModelSearchEventListeners",()=>w),i.export(n,"removeSelectedModel",()=>C),i.export(n,"displayFindModelDiv",()=>x);var o=e("./sellItem"),l=e("./sellItemHelpers");let s=(e,t)=>{document.getElementById(e).value=t||"",document.getElementById(e).dispatchEvent(new Event("input"))},d=e=>{c(e,!1),document.getElementById("findModelTitle").innerText="\xc4r det denna modell?",document.getElementById("findNewModel").style.display="flex",document.getElementById("removeModelIcon").style.display="none",document.getElementById("modelSuggestButtons").style.display="flex",document.getElementById("rejectModel").style.opacity="100",document.getElementById("confirmModel").style.opacity="100"},c=e=>{// Show selected model in search box
document.getElementById("findModelDescription").style.display="none",document.getElementById("findNewModel").style.display="flex",document.getElementById("findModelBoxEmpty").style.display="none",document.getElementById("findModelBoxFilled").style.display="flex",document.getElementById("modelSuggestButtons").style.display="none",document.getElementById("findModelTitle").innerText="Modell",document.getElementById("removeModelIcon").style.display="flex",document.getElementById("findModelBoxFilled").setAttribute("data-model",JSON.stringify(e)),document.getElementById("findModelBoxImage").style.backgroundImage=`url('${e.coverImageSmall}')`,document.getElementById("findModelBoxNameCategory").innerText=`${e.brand}, ${e.category}`,document.getElementById("findModelBoxName").innerText=`${e.maiName}`,e.maiColor?(document.getElementById("findModelBoxColor").style.display="block",document.getElementById("findModelBoxColor").innerText=`${(0,l.colorName)((0,l.capitalizeFirstLetter)(e.maiColor))}`):document.getElementById("findModelBoxColor").style.display="none","Eytys"!==e.brand&&e.gender?(document.getElementById("findModelBoxGender").style.display="block","Unisex"===e.gender||e.multiGender||2===h(e).length?document.getElementById("findModelBoxGender").innerText="Unisex":document.getElementById("findModelBoxGender").innerText=`${({Woman:"Dam",Man:"Herr"})[e.gender]||e.gender}`):document.getElementById("findModelBoxGender").style.display="none"},u=e=>t=>{b(),c(e),// Fill form with attributes from selected model
    g(e,t.target.innerText)};function m(e,t){let n=Array.from(e.options).map(e=>e.attributes.value.value.toLowerCase()).indexOf(t?.toLowerCase());n>0?(e.selectedIndex=n,e.style.color="#333"):(e.selectedIndex=0,e.style.color="#929292"),e.dispatchEvent(new Event("input")),e.dispatchEvent(new Event("change"))}let g=(e,t,n=!1)=>{if(n&&(e.multiGender||"Unisex"===e.gender)||document.getElementById(e.gender)?.parentElement?.click(),t&&s("itemSize",t),s("itemMaterial",e.material),s("itemModel",e.maiName),s("itemOriginalPrice",e.originalPriceSek),e.collectionYear){let t=new Date().getFullYear()-e.collectionYear,n=document.getElementById("itemAge");n.selectedIndex=[1,1,2,3,4,4,5,5,5][t]||6,n.style.color="rgb(51, 51, 51)",n.dispatchEvent(new Event("input")),n.dispatchEvent(new Event("change"))}e.category&&(document.getElementById("itemCategory").value=e.category,$("#itemCategory").trigger("change")),document.getElementById("itemColor").querySelector('[value="'+(0,l.capitalizeFirstLetter)(e.maiColor)+'"]')&&m(document.getElementById("itemColor"),e.maiColor)},f=()=>{if(!r){let e=sessionStorage.getItem("models");r=JSON.parse(e)}return r},h=e=>f()?.filter(t=>t.maiName===e.maiName&&t.maiColor===e.maiColor&&t.category===e.category),A=e=>{window.scrollTo({top:0}),document.getElementById("chooseModelHeader").classList.add("stickyHeader");let t=document.getElementById("modelSizeTemplate"),n=document.getElementById("modelSizeList"),r=document.getElementById("modelSizeList2");for(;n.firstChild;)n.removeChild(n.lastChild);for(;r.firstChild;)r.removeChild(r.lastChild);let a=JSON.parse(e.getAttribute("data-model"));if(1===a.sizes.length)return u(a)({target:{innerText:a.sizes[0]}});let i=h(a),o=i[0].sizes.slice()?.sort(),l=i[1]?.sizes.slice()?.sort(),s=l&&(l?.length!==o.length||!o.every((e,t)=>e===l[t]));document.getElementById("modelSizeListHeading").style.display=s?"block":"none",document.getElementById("modelSizeList2Heading").style.display=s?"block":"none";let d=(e,n,r,a)=>{let i=t.cloneNode(!0);for(let r of(i.id=`${t.id}_${e}`,i.addEventListener("click",linkClickTracker),i.style.display="flex",i.addEventListener("click",function e(t){u(n)(t),this.removeEventListener("click",e)}),Array.from(i.getElementsByTagName("*"))))r.id=`${r.id}_${n.gender}_${e}`;r.appendChild(i),document.getElementById(`modelSize_${n.gender}_${e}`).innerText=a};for(let e of s?i:i.slice(0,1))for(let[t,a]of(n.parentElement.style.display=s||"Woman"===e.gender?"block":"none",e.sizes.sort(E).entries())){let i=a.split("-");d(t,e,"Woman"===e.gender?n:r,i.pop()),"Unisex"===e.gender&&1===i.length&&(// We have some models with Unisex and ['xxs-xs', 'xs-s', 's-m'] sizes, split them up and show as Woman-Man sizes
document.getElementById("modelSizeListHeading").style.display="block",document.getElementById("modelSizeList2Heading").style.display="block",d(`${t}u`,e,n,i[0]),n.parentElement.style.display="block")}n.parentElement.style.display=n.children.length?"block":"none",r.parentElement.style.display=r.children.length?"block":"none"},p=e=>{document.getElementById("modelList").style.display="none",document.getElementById("modelSizeSelect").style.display="block",document.getElementById("modelSelectTitle").innerText="V\xe4lj storlek",document.getElementById("modelSelectTitle").style.marginLeft="42%",A(e.currentTarget)},y=e=>{document.getElementById("modelSelectTitle").style.marginLeft="0%",document.getElementById("chooseModelHeader").classList.remove("stickyHeader"),window.scrollTo({top:0});let t=document.getElementById("modelCardTemplate"),n=document.getElementById("modelResultList");for(;n.firstChild;)n.removeChild(n.lastChild);let r=e.filter(t=>{let n=e.find(e=>e.maiName===t.maiName&&e.maiColor===t.maiColor&&e.category===t.category&&e.gender!==t.gender);return n&&(t.multiGender="Unisex"),!n||"Woman"===t.gender});for(let[e,a]of r.entries()){let r=t.cloneNode(!0);for(let n of(r.id=`${t.id}_${e}`,r.addEventListener("click",linkClickTracker),r.style.display="flex",r.style.cursor="pointer",r.setAttribute("data-model",JSON.stringify(a)),r.addEventListener("click",p),Array.from(r.getElementsByTagName("*"))))n.id=`${n.id}_${e}`;if(n.appendChild(r),document.getElementById(`modelImage_${e}`).src=a.coverImageSmall,document.getElementById(`brandNameCategory_${e}`).innerText=`${[a.brand,a.category].filter(e=>e).join(", ")}`,document.getElementById(`modelName_${e}`).innerText=`${a.maiName}`,a.maiColor?document.getElementById(`modelColor_${e}`).innerText=`${(0,l.colorName)((0,l.capitalizeFirstLetter)(a.maiColor))}`:document.getElementById(`modelColor_${e}`).style.display="none","Eytys"!==a.brand&&(a.multiGender||a.gender)){let t={Woman:"Dam",Man:"Herr"};document.getElementById(`modelGender_${e}`).innerText=`${a.multiGender||t[a.gender]||a.gender}`}else document.getElementById(`modelGender_${e}`).style.display="none"}},I=["mother ","odessa ","benz ","doja ","angel ","fugu ","naomi ","cypress ","titan ","laguna ","aphex ","jet turbo ","maze ","ortega ","raven ","alexia ","carmen ","ferris ","halo ","jade ","jet ","michigan ","olympia ","sonic "];function B(e,t){// For Blankens, jewelry should come last
if("Blankens"===e.brand&&"Blankens"===t.brand){let n=["Armband","\xd6rh\xe4nge","Halsband","Ring"],r=n.includes(e.category),a=n.includes(t.category);return(// If one is jewelry and the other isn't, put jewelry last
r&&!a?1:!r&&a?-1:0)}if("Eytys"===e.brand&&"Eytys"===t.brand){let n=e.maiName.toLowerCase(),r=t.maiName.toLowerCase(),a=e=>I.find(t=>e.startsWith(t))?I.findIndex(t=>e.startsWith(t)):100,i=a(n),o=a(r);if(i<100||o<100){if(i>o)return 1;if(i<o)return -1}if(n>r)return 1;if(n<r)return -1}return 0}function E(e,t){let n=["XXS","XS","S","M","L","XL","XXL"];return n.indexOf(e)>-1&&n.indexOf(t)>-1?n.indexOf(e)-n.indexOf(t):e-t}function v(){a=window.scrollY,document.getElementById("header").style.display="none",document.getElementById("addItemFormDiv").style.display="none",document.getElementById("modelSelectError").style.display="none",document.getElementById("modelSizeSelect").style.display="none",document.getElementById("modelSelectTitle").innerText="V\xe4lj modell",document.getElementById("modelSelectDiv").style.display="block",document.getElementById("modelList").style.display="block",document.getElementById("modelSearchInput").value="",window.scrollTo({top:0});let e=sessionStorage.getItem("models");if(e)document.getElementById("modelSpinner").style.display="none",y(JSON.parse(e).sort(B).slice(0,500));else{document.getElementById("modelSpinner").style.display="flex";let t=setInterval(()=>{(e=sessionStorage.getItem("models"))&&(clearInterval(t),document.getElementById("modelSpinner").style.display="none",y(JSON.parse(e).sort(B).slice(0,500)))},1e3)}}let b=()=>{document.getElementById("addItemFormDiv").style.display="block",document.getElementById("modelSelectDiv").style.display="none",document.getElementById("modelSizeSelect").style.display="none",document.getElementById("header").style.display="block",window.scrollTo({top:a})},w=()=>{document.getElementById("findModelBoxEmpty").addEventListener("click",v),document.getElementById("findNewModel").addEventListener("click",v),document.getElementById("modelSelectClose").addEventListener("click",()=>{b()}),document.getElementById("modelSearchInput").addEventListener("input",()=>{let e=document.getElementById("modelSearchInput").value,t=JSON.parse(sessionStorage.getItem("models"));if(e&&e.length>0){let n=new Fuse(t,{includeScore:!0,keys:["maiName","category","color","maiColor","articleNumber","name"]}),r=n.search(e.replace(", "," "));y(r.map(e=>e.item))}else y(t.sort(B).slice(0,500))}),document.getElementById("removeModelIcon").addEventListener("click",e=>{C(),e.stopPropagation(),e.preventDefault(),(0,o.rememberUnsavedChanges)()})},C=()=>{document.getElementById("itemModel").value="",document.getElementById("findModelBoxEmpty").style.display="flex",document.getElementById("findModelBoxFilled").style.display="none",document.getElementById("findModelDescription").style.display="block",document.getElementById("findNewModel").style.display="none"},x=async e=>{if(["Eytys","Blankens"].includes(e)){if(findModelDiv.style.display="block",localStorage.getItem("detectedModel")){let e=JSON.parse(localStorage.getItem("detectedModel"));"Eytys"===e.brand&&"Eytys"===itemBrand.value&&d(e),localStorage.removeItem("detectedModel")}let t=sessionStorage.getItem("models")?JSON.parse(sessionStorage.getItem("models")):void 0;return t&&t[0].brand===e||(sessionStorage.removeItem("models"),callBackendApi(`/api/models?brand=${e}`).then(e=>{console.log(`Got model response ${e.data.length}`),sessionStorage.setItem("models",JSON.stringify(e.data))})),!0}findModelDiv.style.display="none"}},{"./sellItem":"42EGR","./sellItemHelpers":"2G59s","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}]},["42EGR"],"42EGR","parcelRequire81ca")//# sourceMappingURL=sellItem.js.map
;
//# sourceMappingURL=sellItem.js.map
