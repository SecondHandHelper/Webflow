!function(){var e;async function t(e,t){sessionStorage.getItem("newItemId")||sessionStorage.setItem("newItemId",await a());let i=sessionStorage.getItem("newItemId"),r=await n(e);if(!r)throw"Fel vid bearbetning av vald bild.";let l=new FormData;l.append("itemId",i),l.append("fileName",t),l.append("file",r),l.append("temporary","true"),l.append("generateSmallImage","true");let o=await fetch("https://uploaditemimagebinary-heypmjzjfq-ew.a.run.app",{method:"POST",body:l});return await o.json()}async function n(e){return e.size<9437184?Promise.resolve(e):new Promise((t,n)=>{let a=new FileReader;a.onload=()=>{let e=document.createElement("img");e.onload=()=>{let n=e.width,a=e.height;n>a?n>1512&&(a*=1512/n,n=1512):a>2016&&(n*=2016/a,a=2016);let i=document.createElement("canvas");i.width=n,i.height=a;let r=i.getContext("2d");r.imageSmoothingQuality="high",r.drawImage(e,0,0,n,a),i.toBlob(t,"image/jpeg")},e.src=a.result,a.onerror=n},a.readAsDataURL(e)})}async function a(){try{let e=await fetch("https://generateuniqueid-heypmjzjfq-ew.a.run.app",{method:"POST",headers:{"Content-Type":"application/json"}});if(!e.ok)return console.error(`Error: ${e.statusText}`),null;let t=await e.json();return t.id}catch(e){return console.error(`Failed to fetch unique ID, generating uuidv4 id: ${e.message}`,e),uuidv4()}}async function i(e,t=!0){let n=await r(e);return n?.url&&(t&&o("enhancedFrontImage",n.url,n.urlSmall),d("frontImage",window.innerWidth<=400?n.urlSmall:n.url)),l("frontImage"),n}async function r(e){try{let t=await firebase.app().functions("europe-west1").httpsCallable("enhanceFrontImage")({imageUrl:e});return sessionStorage.setItem("enhancedFrontImage",t.data.url),t.data}catch(e){return errorHandler.report(e),console.error(e),""}}function l(e){document.getElementById(`loading${s(e)}Icon`).style.display="none",document.getElementById(`delete${s(e)}Icon`).style.display="inline-block","frontImage"===e&&(document.getElementById("enhancedAnimationDiv").style.display="none")}function o(e,t,n){let a=JSON.parse(localStorage.getItem("newItem")||JSON.stringify({})),i=a.images||{};i[e]=t,i[`${e}Small`]=n,a.images=i,localStorage.setItem("newItem",JSON.stringify(a))}function d(e,t){document.getElementById(`${e}Preview`).style.backgroundImage=`url('${t}')`,l(e)}function s(e){return e.charAt(0).toUpperCase()+e.slice(1)}async function c(e,n,a=!0){try{!function(e){let t=document.getElementById(e).parentNode.parentNode;t.querySelector(".w-file-upload-error").style.display="none"}(n);let i=URL.createObjectURL(e);document.getElementById(`${n}PreviewUploading`).style.backgroundImage=`url('${i}')`,document.getElementById(`${n}Preview`).style.backgroundImage=`url('${i}')`,function(e){if("frontImage"===e){document.getElementById(`delete${s(e)}Icon`).style.display="none",document.getElementById("enhancedAnimationDiv").style.display="block",triggerEnhancingAnimation.click();return}document.getElementById(`loading${s(e)}Icon`).style.display="inline-block",document.getElementById(`delete${s(e)}Icon`).style.display="none"}(n),u(n,"success-state");let{url:r,urlSmall:l}=await t(e,n);return a&&o(n,r,l),r}catch(t){console.error("Failed to upload image",t),errorHandler.report(t),document.getElementById(`${n}PreviewUploading`).style.backgroundImage="",document.getElementById(`${n}Preview`).style.backgroundImage="",document.getElementById(`loading${s(n)}Icon`).style.display="none",u(n,"default-state"),e.size>10485760?m(n,"Error: Bilden \xe4r f\xf6r stor. Max 10 MB."):m(n,"Error: N\xe5got gick fel vid uppladdning, f\xf6rs\xf6k igen eller kontakt oss om felet kvarst\xe5r."),document.getElementById(n).value=""}}function m(e,t){let n=document.getElementById(e).parentNode.parentNode;n.querySelector(".w-file-upload-error").style.display="block",n.querySelector(".w-file-upload-error-msg").innerText=t}function u(e,t){let n=document.getElementById(e).parentNode.parentNode.childNodes;for(let e=0;e<n.length;e++)n[e].className.includes(t)?n[e].style.display="block":n[e].style.display="none"}function g(){return new Map().set("hole","H\xe5l").set("stain","Fl\xe4ck").set("lostFit","Tappad passform").set("nopprig","Nopprig").set("threadUp","Tr\xe5dsl\xe4pp").set("colorChange","F\xe4rg\xe4ndring").set("otherDefect","Annat")}function y(){return["frontImage","brandTagImage","defectImage","materialTagImage","extraImage"]}async function p(){// Create item from sessionStorage
if(console.log("sellItemMainAuthenticated "+new Date),// Visa alla "viktiga" fält om man är inloggad
toggleMoreInfoFields.click(),sessionStorage.getItem("itemToBeCreatedAfterSignIn")){// ... if we are redirected here from the sign-in page
if(document.referrer.includes("/sign-in")){document.getElementById("loadingDiv").style.display="flex",document.getElementById("creatingItemText").style.display="block",await b();let e=sessionStorage.getItem("shippingMethod");e&&await firebase.app().functions("europe-west1").httpsCallable("updateFirebaseUser")({preferences:{shippingMethod:e}});let t=user.current?.phoneNumber?.length;return location.href=t?"/item-confirmation":"/user-contact"}sessionStorage.removeItem("itemToBeCreatedAfterSignIn")}// Get user's item count to be able to send 'User Activated' event
let t=await getItems(authUser.current.uid);e=t.size}async function I(){let e,t,n,a,i,r;localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("itemValuation"),e=document.getElementById("frontImage"),t=document.getElementById("brandTagImage"),n=document.getElementById("productImage"),a=document.getElementById("defectImage"),i=document.getElementById("materialTagImage"),r=document.getElementById("extraImage"),// display image when file has been selected
$("#frontImage").off("change"),e.addEventListener("change",T,{capture:!0}),$("#brandTagImage").off("change"),t.addEventListener("change",F,{capture:!0}),$("#productImage").off("change"),n.addEventListener("change",N,{capture:!0}),$("#defectImage").off("change"),a.addEventListener("change",j,{capture:!0}),$("#materialTag").off("change"),i.addEventListener("change",D,{capture:!0}),$("#extraImage").off("change"),r.addEventListener("change",U,{capture:!0}),setupModelSearchEventListeners(),function(){let e=document.getElementById("itemColor");e.onchange=function(){""!==this.value?e.style.color="#333":e.style.color="#929292"};// Change font color of dropdown itemAge when user selects a value
let t=document.getElementById("itemAge");t.onchange=function(){""!==this.value?t.style.color="#333":t.style.color="#929292"}}(),itemBrand.addEventListener("input",A("itemBrandLabel")),itemBrand.addEventListener("input",O),itemModel.addEventListener("input",A("itemModelLabel")),itemSize.addEventListener("input",A("itemSizeLabel")),itemSize.addEventListener("input",O),itemMaterial.addEventListener("input",A("itemMaterialLabel")),itemMaterial.addEventListener("input",O),itemOriginalPrice.addEventListener("input",A("itemOriginalPriceLabel")),itemAge.addEventListener("input",A("itemAgeLabel")),itemCondition.addEventListener("input",A("itemConditionLabel")),itemColor.addEventListener("change",A("itemColorLabel")),itemColor.addEventListener("input",O),itemUserComment.addEventListener("input",A("userCommentLabel")),document.getElementById("addItemButton").addEventListener("click",()=>{document.getElementById("wf-form-Add-Item").reportValidity();let e=document.getElementById("wf-form-Add-Item").querySelectorAll(":invalid"),t=e?.[0];t&&t.getBoundingClientRect().height<=1&&(t.style.cssText="width:100% !important;height:100% !important;"),setTimeout(()=>{if(e.length>0){if(!function(e){"function"==typeof jQuery&&e instanceof jQuery&&(e=e[0]);let t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight/2||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}(t)){let e=t.getBoundingClientRect().top+window.scrollY-40;window.scrollTo({top:e,behavior:"smooth"})}document.getElementById("wf-form-Add-Item").reportValidity()}},300)}),addItemForm.addEventListener("submit",f),userAddressForm.addEventListener("submit",addUserDetails),autocomplete(document.getElementById("itemBrand"),brands);// Hide/Show warning about difficulty to sell certain brands
let l=document.getElementById("itemBrand");if(document.getElementById("hardToSellDiv"),l.oninput=function(){shareSoldDiv.style.display="none",function(e){if(words.some(t=>e.toLowerCase().includes(t.toLowerCase())))return hardToSellText.innerHTML=`Vi s\xe4ljer i regel inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5gt andrahandsv\xe4rde. Undantag kan finnas.`,hardToSellDiv.style.display="block";hardToSellDiv.style.display="none"}(this.value)},// Hide/Show extra fields for defects
itemCondition.onchange=function(){let e=this.value;"Anv\xe4nd, tecken p\xe5 slitage"==e?(defectInfoDiv.style.display="block",itemCondition.style.color="#333"):""==e?(defectInfoDiv.style.display="none",itemCondition.style.color="#929292"):(defectInfoDiv.style.display="none",itemCondition.style.color="#333")},personalId.addEventListener("input",()=>{let e=isValidSwedishSsn(personalId.value)?"":"Ogiltigt personnummer";personalId.setCustomValidity(e)}),await Y(),await W(),await J(),await H(),await R(),function(){let e=new MutationObserver((e,t)=>{let n=e.find(e=>"style"===e.attributeName);n&&"none"===n.target.style.display&&C()});Array.from(document.querySelectorAll(".suggest-buttons")).forEach(t=>e.observe(t,{attributes:!0}))}(),function(){function e(e){let t=e.target;if(t instanceof Element){let e=E()[t.name];e!==t.value&&""!==t.value&&(document.getElementById("clearItemForm").style.display="block")}}document.getElementById("wf-form-Add-Item").addEventListener("input",e),document.querySelector("#wf-form-Add-Item select").addEventListener("change",e)}(),y().forEach(e=>{document.getElementById(`delete${s(e)}Icon`).addEventListener("click",()=>{G(e)})}),document.getElementById("deleteFrontImageIcon").addEventListener("click",()=>{document.getElementById("frontImage").required=!0,G("enhancedFrontImage")}),document.getElementById("deleteBrandTagImageIcon").addEventListener("click",()=>{document.getElementById("brandTagImage").required=!0}),document.getElementById("clearItemForm").addEventListener("click",_),params.id)// Fill form if the user comes from a prefill link (re-sell item)
sessionStorage.removeItem("newItemId"),localStorage.removeItem("newItem"),auth.onAuthStateChanged(function(e){e||(document.getElementById("maiIntro").style.display="block")}),document.getElementById("resellIntro").style.display="block",await P(params.id),document.getElementById("triggerShowSellItemContent").click();else if(sessionStorage.getItem("itemToBeCreatedAfterSignIn")&&document.referrer.includes("/sign-in"));else if(localStorage.getItem("newItem")&&!L(JSON.parse(localStorage.getItem("newItem")))){// Saved state from a previous visit to /sell-item - restore the data
let e=JSON.parse(localStorage.getItem("newItem"));document.getElementById("frontImage").required=!0,document.getElementById("brandTagImage").required=!0,await P(null,e,!0),document.getElementById("clearItemForm").style.display="block",document.getElementById("triggerShowSellItemContent").click()}else document.getElementById("triggerShowSellItemContent").click(),document.getElementById("frontImage").required=!0,document.getElementById("brandTagImage").required=!0;// We delay the rememberUnsavedChanges call to allow any confirm/reject animations to finish
document.getElementById("wf-form-Add-Item").querySelectorAll("input").forEach(e=>{e.addEventListener("input",C)}),document.getElementById("wf-form-Add-Item").querySelectorAll('input[type="radio"]').forEach(e=>{e.addEventListener("change",C)}),document.getElementById("wf-form-Add-Item").querySelectorAll('input[type="checkbox"]').forEach(e=>{e.addEventListener("change",C)}),// We delay the rememberUnsavedChanges call to allow any confirm/reject animations to finish
document.getElementById("wf-form-Add-Item").querySelectorAll("select").forEach(e=>{e.addEventListener("change",C)}),document.getElementById("wf-form-Add-Item").querySelectorAll("textarea").forEach(e=>{e.addEventListener("input",C)}),window.addEventListener("pageshow",e=>{e.persisted&&localStorage.getItem("newItem")&&setTimeout(async()=>{await P(null,JSON.parse(localStorage.getItem("newItem")),!0)},10)})}async function f(t){let n=sessionStorage.getItem("newItemId")||await a();try{document.getElementById("addItemFormDiv").style.display="none",document.getElementById("loadingDiv").style.display="flex",document.getElementById("clearItemForm").style.display="none";let t=await w(n),a=await S(n,t.preferences.userValuationApproval);0===e&&analytics.track("User Activated"),location.href=a}catch(e){errorHandler.report(e),console.error("addItem failed",e)}}function h({humanCheckNeeded:e,newMinMaxLog:t}){return e||t.match(/accept price is above max/i)}async function x(e,t,n){let{minPrice:a,maxPrice:i,decline:r,humanCheckNeeded:l,humanCheckExplanation:o,willNotSell:d,soldPrice:s,version:c,newMinPriceEstimate:m,newMaxPriceEstimate:u,newMinMaxLog:g,adjustmentAllowed:y,newBrand:p,newBrandCategory:I}=t||{};if(!a&&!r)return;let f={mlValuation:{decline:r,humanCheckNeeded:l,minPriceEstimate:a,maxPriceEstimate:i,humanCheckExplanation:o,willNotSellPrediction:d,soldPriceEstimate:s,modelVersion:c?.toString(),newMinPriceEstimate:m,newMaxPriceEstimate:u,newMinMaxLog:g,adjustmentAllowed:y,newBrand:p,newBrandCategory:I},...r||h(t)?{}:{valuationStatus:"Completed",valuationDate:new Date().toISOString(),...n?{}:{minPriceEstimate:a,maxPriceEstimate:i},infoRequests:{price:{status:n?"Active":"Resolved",response:n?"":"Accepted",description:"Vi b\xf6rjar med startpriset, och justerar successivt ner till l\xe4gsta priset under s\xe4ljperioden p\xe5 30 dagar. V\xe4rderingen utg\xe5r fr\xe5n vad liknande s\xe5lts f\xf6r.",minPrice:m||a,maxPrice:u||i}}}};if(sessionStorage.getItem("itemToBeCreatedAfterSignIn")){let e=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"));sessionStorage.setItem("itemToBeCreatedAfterSignIn",JSON.stringify({id:e.id,item:{...e.item,...f}}))}else{await firebase.app().functions("europe-west1").httpsCallable("saveItemValuationFields")({itemId:e,...f});let t=JSON.parse(localStorage.getItem("latestItemCreated"));localStorage.setItem("latestItemCreated",JSON.stringify({...t,...f}))}}async function S(e,t){let n=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn")||"{}").item;if(!e&&!n)return console.error("No item and no itemId, unexpected!!"),"/item-confirmation";try{let a=await firebase.app().functions("europe-west1").httpsCallable("itemMlValuation")({itemId:e,item:n}),{minPrice:i,maxPrice:r,decline:l}=a.data||{};return await x(e,a.data,t),v(i&&r,l,h(a.data),t)}catch(e){console.error("Failed to get ml valuation",e)}return v()}function v(e,t,n,a){if(!e||n||!a){if(sessionStorage.getItem("itemToBeCreatedAfterSignIn"))return"/sign-in";let e=user.current?.phoneNumber?.length;return e?"/item-confirmation":"/user-contact"}return"/item-valuation"}function E(){return{acceptPrice:null,age:null,brand:null,category:null,color:null,condition:null,defectDescription:null,defects:[],images:{},material:null,model:null,originalPrice:null,userValuationApproval:!0,sex:"Woman",size:null,userComment:null}}function B(){let e="",t=new Date,n=itemSize.value,a=itemMaterial.value?itemMaterial.value.trim():"",i=itemBrand.value?itemBrand.value.trim():"",r=itemModel.value?itemModel.value.trim():"",l=Number(itemOriginalPrice.value),o=itemAge.value,d=itemCondition.value,s=itemDefectDescription.value?itemDefectDescription.value.trim():"",c=itemUserComment.value?itemUserComment.value.trim():"",m=Number(itemLowestAcceptPrice.value),u=itemUserValuationApproval.checked,y=new Map().set("hole",hole.checked).set("stain",stain.checked).set("lostFit",lostFit.checked).set("nopprig",nopprig.checked).set("threadUp",threadUp.checked).set("colorChange",colorChange.checked).set("otherDefect",otherDefect.checked),p=[];"Anv\xe4nd, tecken p\xe5 slitage"===d&&y.forEach((e,t)=>{if(e){let e=g().get(t);p.push(e)}});for(var I=document.getElementsByName("Sex"),f=0;f<I.length;f++)I[f].checked&&(e=I[f].id);let h=document.getElementById("findModelBoxFilled"),x={};if("flex"===h.style.display){// There is a current model selected grab the cover image and id from it
let e=JSON.parse(h.getAttribute("data-model"));x={modelCoverImageUrl:e.coverImage,atModelVariantId:e.atVariantId}}let S=JSON.parse(localStorage.getItem("newItem")||"{}").images;return{user:authUser.current?.uid||null,createdAt:t.toISOString(),status:"New",shippingStatus:"Not sent",sex:e,size:n,material:a,color:itemColor.value,category:itemCategory.value,brand:i,model:r,originalPrice:l,age:o,condition:d,defects:p,defectDescription:s,userComment:c,acceptPrice:m,preferences:{userValuationApproval:u},...x,images:S}}async function k(){// If first time: User chooses shipping method preference in sell item form
let e="Service point";return user.current?.preferences?.shippingMethod?e=user.current?.preferences?.shippingMethod:authUser.current?await firebase.app().functions("europe-west1").httpsCallable("updateFirebaseUser")({preferences:{shippingMethod:e}}):sessionStorage.setItem("shippingMethod",e),e}async function w(e){let{modelCoverImageUrl:t,images:n,...a}=B(),i=await k();t&&(n.modelImage=t);let r=params.id?{createdFromItem:params.id}:{},l={...a,shippingMethod:i,images:n,...r,version:"2"};if(authUser.current){let t=await firebase.app().functions("europe-west1").httpsCallable("createItem")({id:e,item:l});localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId"),localStorage.setItem("latestItemCreated",JSON.stringify(t.data))}else sessionStorage.setItem("itemToBeCreatedAfterSignIn",JSON.stringify({id:e,item:l}));return l}async function b(){let e=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"));sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),sessionStorage.removeItem("newItemId"),await firebase.app().functions("europe-west1").httpsCallable("createItem")(e),localStorage.removeItem("newItem"),e.item.id=e.id,localStorage.setItem("latestItemCreated",JSON.stringify(e.item))}function C(){if(localStorage.getItem("latestItemCreated"))return;let{user:e,createdAt:t,status:n,shippingStatus:a,modelVariantFields:i,...r}=B(),l=Object.keys(r).reduce((e,t)=>(e[t]=""===r[t]?null:r[t],e),{});l.defects=l.defects?l.defects:[],l.userValuationApproval=l.preferences.userValuationApproval,delete l.preferences,l.acceptPrice=l.acceptPrice&&l.acceptPrice>0?l.acceptPrice:null,l.originalPrice=l.originalPrice&&l.originalPrice>0?l.originalPrice:null,["itemBrand","itemSize","itemMaterial","itemColor"].forEach(e=>{let t=document.getElementById(e).parentNode.querySelector(".suggest-buttons")||document.getElementById(e).parentNode.parentNode.querySelector(".suggest-buttons");t?.style?.display==="block"&&(l[`${e}Confirm`]=!0)}),L(l)?localStorage.removeItem("newItem"):localStorage.setItem("newItem",JSON.stringify(l))}function L(e){let t=E();for(let n in t)if(n in e){if(t[n]instanceof Object){if(JSON.stringify(t[n])!==JSON.stringify(e[n]))return!1;continue}if(e[n]!==t[n])return!1}return!0}function A(e){return t=>{document.getElementById(e).style.display=t.target.value.length>0?"inline-block":"none"}}function q(e,t,n){if(t&&n){let t=document.getElementById(e).parentNode.querySelector(".suggest-buttons")||document.getElementById(e).parentNode.parentNode.querySelector(".suggest-buttons");t.style.display="block",document.getElementById(e).setCustomValidity("Bekr\xe4fta eller \xe4ndra v\xe4rdet")}}async function P(e,t=null,n=!1){try{let a={data:t};t||(a=await firebase.app().functions("europe-west1").httpsCallable("getItem")({itemId:e}));let r=a.data,l=r.images||{},s=r.originalPrice;// Populate images
for(let e in s<=0&&(s=null),l){let t=l[`${e}Small`]||l[`${e}Medium`]||l[e]||l[`${e}Large`],n=l[e]||l[`${e}Large`]||l[`${e}Medium`]||l[`${e}Small`];if(y().includes(e)){if(o(e,n,t),"frontImage"===e){if(l.enhancedFrontImage)t=l.enhancedFrontImageSmall||l.enhancedFrontImageMedium||l.enhancedFrontImage||l.enhancedFrontImageLarge,n=l.enhancedFrontImage||l.enhancedFrontImageLarge||l.enhancedFrontImageMedium||l.enhancedFrontImageSmall,o("enhancedFrontImage",n,t);else{let e=await i(n);n=e.url,t=e.urlSmall}}d(e,t),u(e,"success-state"),document.getElementById(e).required=!1}}if(l.modelImage){let e=l.modelImageLarge||l.modelImage,t=l.modelImageSmall||l.modelImageMedium||l.modelImage;document.getElementById("coverImageContainer").style.backgroundImage=`url('${t}')`,document.getElementById("coverImagePreview").style.display="block",o("modelImage",e,t)}else if(l.coverImage&&!await Q(l.coverImage)){// Show cover image preview if it is a model image, if it is a noBg image we skip it
sessionStorage.removeItem("coverImagePreviewUrl");let e=l.coverImageLarge||l.coverImage,t=l.coverImage;document.getElementById("coverImageContainer").style.backgroundImage=`url('${t}')`,document.getElementById("coverImagePreview").style.display="block",o("modelImage",e,t)}// Populate text input fields
itemBrand.value=r.brand||"",q("itemBrand",n,r.itemBrandConfirm),// Don't use the setFieldValue for the brand since that triggers a dropdown to open
document.getElementById("itemBrandLabel").style.display=r.brand?"inline-block":"none",setFieldValue("itemSize",r.size),q("itemSize",n,r.itemSizeConfirm),setFieldValue("itemMaterial",r.material),q("itemMaterial",n,r.itemMaterialConfirm),setFieldValue("itemModel",r.model),setFieldValue("itemOriginalPrice",s),n&&(setFieldValue("itemUserComment",r.userComment),setFieldValue("itemDefectDescription",r.defectDescription),setFieldValue("itemLowestAcceptPrice",r.acceptPrice<=0?null:r.acceptPrice)),// Populate select fields
M(itemAge,r.age),M(itemColor,r.color),q("itemColor",n,r.itemColorConfirm),M(itemCondition,r.condition),itemCondition.selectedIndex>=0&&"Anv\xe4nd, tecken p\xe5 slitage"===itemCondition.options[itemCondition.selectedIndex].text&&(defectInfoDiv.style.display="block");let c=$("#itemCategory");c.val(r.category),c.trigger("change"),r.sex?(document.getElementById("Woman").previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById("Woman").checked=!1,document.getElementById(r.sex).previousElementSibling.classList.add("w--redirected-checked"),document.getElementById(r.sex).checked=!0):(document.getElementById("Woman").previousElementSibling.classList.add("w--redirected-checked"),document.getElementById("Woman").checked=!0),// Populate checkboxes
g().forEach((e,t)=>{r.defects&&r.defects.includes(e)&&(document.getElementById(t).previousElementSibling.classList.add("w--redirected-checked"),document.getElementById(t).checked=!0)}),n&&"userValuationApproval"in r&&!r.userValuationApproval&&(document.getElementById("itemUserValuationApproval").click(),document.getElementById("itemUserValuationApproval").previousElementSibling.classList.remove("w--redirected-checked"))}catch(e){console.error("Error getting item document:",e),errorHandler.report(e)}document.getElementById("loadingDiv").style.display="none"}function M(e,t){let n=Array.from(e.options).map(e=>e.attributes.value.value).indexOf(t);n>0?(e.selectedIndex=n,e.style.color="#333"):(e.selectedIndex=0,e.style.color="#929292"),e.dispatchEvent(new Event("input")),e.dispatchEvent(new Event("change"))}let V={black:"Black",white:"White",gray:"Grey",blue:"Blue",dark_blue:"Navy","multicolor/colorful":"Multicolour",red:"Red",pink:"Pink",brown:"Brown",beige:"Beige",light_blue:"Blue",green:"Green",silver:"Silver",purple:"Purple",maroon:"Burgundy",gold:"Gold",orange:"Orange",yellow:"Yellow",teal:"Turquoise",olive:"Green",cyan:"Turquoise",magenta:"Pink",mustard:"Yellow"};async function T(e){let t=this.files[0];if(t){e.stopPropagation();let n=await c(t,"frontImage");if(!n||0===Object.keys(n).length)return;let a=[];a.push(K(n),z(n),i(n)),await Promise.all(a),C()}}async function F(e){let t=this.files[0];if(t){e.stopPropagation();let n=await c(t,"brandTagImage");l("brandTagImage"),await z(n),C()}}async function N(e){let t=this.files[0];if(t){e.stopPropagation();let n=await c(t,"productImage");l("productImage"),await z(n),C()}}async function j(e){let t=this.files[0];if(t){e.stopPropagation();let n=await c(t,"defectImage");l("defectImage"),await z(n),C()}}async function D(e){let t=this.files[0];if(t){e.stopPropagation();let n=await c(t,"materialTagImage");l("materialTagImage"),await z(n),C()}}async function U(e){let t=this.files[0];if(t){e.stopPropagation();let n=await c(t,"extraImage");l("extraImage"),await z(n),C()}}function O(e){e.currentTarget.setCustomValidity("");let t=e.currentTarget.parentNode.querySelector(".suggest-buttons")||e.currentTarget.parentNode.parentNode.querySelector(".suggest-buttons");t.style.display="none"}async function z(e){try{if(document.querySelector("#itemBrand").value.length&&document.querySelector("#itemMaterial").value.length&&document.querySelector("#itemSize").value.length)return;let t=await firebase.app().functions("europe-west1").httpsCallable("detectItemBrandAndMaterialAndSize")({imageUrl:e});!document.querySelector("#itemBrand").value.length&&t.data?.brand&&(document.querySelector("#itemBrand").value=t.data.brand,document.querySelector("#itemBrand").setCustomValidity("Bekr\xe4fta eller \xe4ndra m\xe4rket"),document.getElementById("itemBrandLabel").style.display="inline-block",document.querySelector("#brandSuggestButtons").style.display="block",document.querySelector("#itemBrand").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"brandSuggestButtons"})),!document.querySelector("#itemMaterial").value.length&&t.data?.materials&&(document.querySelector("#itemMaterial").value=t.data.materials,document.querySelector("#itemMaterial").setCustomValidity("Bekr\xe4fta eller \xe4ndra materialet"),document.getElementById("itemMaterialLabel").style.display="inline-block",document.querySelector("#materialSuggestButtons").style.display="block",document.querySelector("#itemMaterial").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"materialSuggestButtons"})),!document.querySelector("#itemSize").value.length&&t.data?.size&&(document.querySelector("#itemSize").value=t.data.size,document.querySelector("#itemSize").setCustomValidity("Bekr\xe4fta eller \xe4ndra storlek"),document.getElementById("itemSizeLabel").style.display="inline-block",document.querySelector("#sizeSuggestButtons").style.display="block",document.querySelector("#itemSize").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"sizeSuggestButtons"}))}catch(e){errorHandler.report(e),console.log("Error calling detectItemBrandAndMaterialAndSize",e)}}async function K(e){try{let t=await firebase.app().functions("europe-west1").httpsCallable("detectItemColor")({imageUrl:e});if(!t.data?.colors||!t.data.colors.length){console.log("Unable to detect product color");return}if(t.data.colors.length>2)document.querySelector("#itemColor").value="Multicolour";else if(V[t.data.colors?.[0]])document.querySelector("#itemColor").value=V[t.data.colors?.[0]];else{console.log("Unable to set color from",t.data.colors?.[0]);return}document.querySelector("#itemColor").setCustomValidity("Bekr\xe4fta eller \xe4ndra f\xe4rgen"),document.querySelector("#colorSuggestButtons").style.display="block",document.querySelector("#itemColor").dispatchEvent(new Event("change")),analytics.track("Element Viewed",{elementID:"colorSuggestButtons"})}catch(e){errorHandler.report(e),console.log("Error calling detectItemColor",e)}}async function H(){document.getElementById("rejectMaterial").addEventListener("click",()=>{document.querySelector("#itemMaterial").value="",document.querySelector("#materialSuggestButtons").style.display="none",A("itemMaterialLabel"),document.querySelector("#itemMaterial").setCustomValidity("")}),document.getElementById("confirmMaterial").addEventListener("click",()=>{document.querySelector("#itemMaterial").setCustomValidity("")})}async function J(){document.getElementById("rejectBrand").addEventListener("click",()=>{document.querySelector("#itemBrand").value="",document.querySelector("#brandSuggestButtons").style.display="none",document.querySelector("#itemBrand").setCustomValidity(""),A("itemBrandLabel")}),document.getElementById("confirmBrand").addEventListener("click",()=>{document.querySelector("#itemBrand").setCustomValidity(""),document.querySelector("#itemBrand").setCustomValidity("")})}async function R(){document.getElementById("rejectSize").addEventListener("click",()=>{document.querySelector("#itemSize").value="",document.querySelector("#sizeSuggestButtons").style.display="none",A("itemBrandLabel"),document.querySelector("#itemSize").setCustomValidity("")}),document.getElementById("confirmSize").addEventListener("click",()=>{document.querySelector("#itemSize").setCustomValidity("")})}async function W(){document.getElementById("rejectColor").addEventListener("click",()=>{document.querySelector("#itemColor").value="",document.querySelector("#colorSuggestButtons").style.display="none",A("itemColorLabel"),document.querySelector("#itemColor").setCustomValidity("")}),document.getElementById("confirmColor").addEventListener("click",()=>{document.querySelector("#itemColor").setCustomValidity("")})}function _(){document.getElementById("clearItemForm").style.display="none",y().forEach(e=>{document.getElementById(`${e}Preview`).style.backgroundImage="",u(e,"default-state")}),setFieldValue("itemBrand",null),Array.from(document.querySelectorAll(".suggest-buttons")).forEach(e=>e.style.display="none"),setFieldValue("itemSize",null),setFieldValue("itemMaterial",null),setFieldValue("itemModel",null),setFieldValue("itemOriginalPrice",null),setFieldValue("itemUserComment",null),setFieldValue("itemDefectDescription",null),setFieldValue("itemLowestAcceptPrice",null),M(itemAge,""),M(itemColor,""),M(itemCondition,""),defectInfoDiv.style.display="none";let e=$("#itemCategory");e.val(""),e.trigger("change"),// Populate radio-buttons
document.getElementById("Man").previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById("Man").checked=!1,document.getElementById("Unisex").previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById("Unisex").checked=!1,document.getElementById("Woman").previousElementSibling.classList.add("w--redirected-checked"),document.getElementById("Woman").checked=!0,// Populate checkboxes
g().forEach((e,t)=>{document.getElementById(t).previousElementSibling.classList.remove("w--redirected-checked"),document.getElementById(t).checked=!1}),!1===document.getElementById("itemUserValuationApproval").checked&&(document.getElementById("itemUserValuationApproval").click(),document.getElementById("itemUserValuationApproval").previousElementSibling.classList.add("w--redirected-checked")),sessionStorage.removeItem("newItemId"),localStorage.removeItem("newItem")}function G(e){let t=JSON.parse(localStorage.getItem("newItem"));delete t?.images?.[e],delete t?.images?.[`${e}Small`],localStorage.setItem("newItem",JSON.stringify(t))}async function Y(){$("#itemCategory").select2({selectionCssClass:"form-field",placeholder:"Kategori",data:[{id:"",text:""},{text:"\xd6verdelar",children:[{id:"Tr\xf6ja",text:"Tr\xf6ja"},{id:"Blus",text:"Blus"},{id:"Topp",text:"Topp"},{id:"Skjorta",text:"Skjorta"},{id:"Linneskjorta",text:"Linneskjorta"},{id:"T-shirt",text:"T-shirt"},{id:"Kavaj",text:"Kavaj"},{id:"Sweatshirt",text:"Sweatshirt"},{id:"Hoodie",text:"Hoodie"},{id:"Polotr\xf6ja",text:"Polotr\xf6ja"},{id:"Tunika",text:"Tunika"},{id:"V\xe4st",text:"V\xe4st"},{id:"Kofta",text:"Kofta"},{id:"Linne",text:"Linne"},{id:"Tr\xe4ningstr\xf6ja",text:"Tr\xe4ningstr\xf6ja"},{id:"Poncho",text:"Poncho"},{id:"Pik\xe9",text:"Pik\xe9"},{id:"L\xe5ng\xe4rmad T-shirt",text:"L\xe5ng\xe4rmad T-shirt"},{id:"Kostymv\xe4st",text:"Kostymv\xe4st"}]},{text:"Underdelar",children:[{id:"Kjol",text:"Kjol"},{id:"Byxor",text:"Byxor"},{id:"Jeans",text:"Jeans"},{id:"Chinos",text:"Chinos"},{id:"Fritidsbyxor",text:"Fritidsbyxor"},{id:"Tr\xe4ningsbyxor",text:"Tr\xe4ningsbyxor"},{id:"Tights",text:"Tights"},{id:"Strumpbyxor",text:"Strumpbyxor"},{id:"Mjukisbyxor",text:"Mjukisbyxor"},{id:"Kostymbyxor",text:"Kostymbyxor"},{id:"Shorts",text:"Shorts"},{id:"Sarong",text:"Sarong"}]},{text:"Helkropp",children:[{id:"Kl\xe4nning",text:"Kl\xe4nning"},{id:"Kaftan",text:"Kaftan"},{id:"Kostym",text:"Kostym"},{id:"Set",text:"Set"},{id:"Jumpsuit",text:"Jumpsuit"},{id:"Baddr\xe4kt",text:"Baddr\xe4kt"},{id:"Bikini",text:"Bikini"},{id:"Pyjamas",text:"Pyjamas"},{id:"Morgonrock",text:"Morgonrock"},{id:"Br\xf6llopskl\xe4nning",text:"Br\xf6llopskl\xe4nning"},{id:"Balkl\xe4nning",text:"Balkl\xe4nning"},{id:"Bodysuit",text:"Bodysuit"},{id:"Underst\xe4ll",text:"Underst\xe4ll"}]},{text:"Ytterkl\xe4der",children:[{id:"Jacka",text:"Jacka"},{id:"Kappa",text:"Kappa"},{id:"Rock",text:"Rock"},{id:"Fritidsjacka",text:"Fritidsjacka"},{id:"Trenchcoat",text:"Trenchcoat"},{id:"Skinnjacka",text:"Skinnjacka"},{id:"Dunjacka",text:"Dunjacka"},{id:"Regnjacka",text:"Regnjacka"},{id:"P\xe4lsjacka",text:"P\xe4lsjacka"}]},{text:"Skor",children:[{id:"Sneakers",text:"Sneakers"},{id:"Sandaler",text:"Sandaler"},{id:"Klackar",text:"Klackar"},{id:"Ballerinaskor",text:"Ballerinaskor"},{id:"Loafers",text:"Loafers"},{id:"Flip-flops",text:"Flip-flops"},{id:"Boots",text:"Boots"},{id:"K\xe4ngor",text:"K\xe4ngor"},{id:"Vinterskor",text:"Vinterskor"},{id:"Skor",text:"Annat (Skor)"}]},{text:"V\xe4skor",children:[{id:"Axelremsv\xe4ska",text:"Axelremsv\xe4ska"},{id:"Handv\xe4ska",text:"Handv\xe4ska"},{id:"Kuvertv\xe4ska",text:"Kuvertv\xe4ska"},{id:"Ryggs\xe4ck",text:"Ryggs\xe4ck"},{id:"Tr\xe4ningsv\xe4ska",text:"Tr\xe4ningsv\xe4ska"},{id:"Resv\xe4ska",text:"Resv\xe4ska"},{id:"Datorv\xe4ska",text:"Datorv\xe4ska"},{id:"V\xe4ska",text:"Annat (V\xe4ska)"}]},{text:"Accessoarer",children:[{id:"Solglas\xf6gon",text:"Solglas\xf6gon"},{id:"Glas\xf6gon",text:"Glas\xf6gon"},{id:"\xd6rh\xe4nge",text:"\xd6rh\xe4nge"},{id:"Halsband",text:"Halsband"},{id:"Armband",text:"Armband"},{id:"Ring",text:"Ring"},{id:"Brosch",text:"Brosch"},{id:"Keps",text:"Keps"},{id:"Sjal",text:"Sjal"},{id:"Krage",text:"Krage"},{id:"B\xe4lte",text:"B\xe4lte"},{id:"Pl\xe5nbok",text:"Pl\xe5nbok"},{id:"Halsduk",text:"Halsduk"},{id:"Hatt",text:"Hatt"},{id:"M\xf6ssa",text:"M\xf6ssa"},{id:"Vantar",text:"Vantar"},{id:"Necess\xe4r",text:"Necess\xe4r"},{id:"Slips",text:"Slips"},{id:"Handduk",text:"Handduk"},{id:"Klocka",text:"Klocka"}]}]}),$("body").on("click",".select2-container--open .select2-results__group",function(){$(this).parent().attr("class").match(/expanded-group/)?$(this).parent().removeClass("expanded-group"):($(".expanded-group").first().removeClass("expanded-group"),$(this).parent().addClass("expanded-group"))});let e=!1;$("#itemCategory").on("select2:select",()=>{analytics.track("Click",{elementID:"itemCategoryValue"}),document.querySelector("#itemCategory").dispatchEvent(new Event("change"))});let t=!1;$("#itemCategory").on("select2:open",()=>{t||(t=!0,$("input.select2-search__field").on("click",()=>{analytics.track("Click",{elementID:"itemCategorySearch"})}))}),$("#itemCategory").on("select2:close",()=>{document.querySelector("body").style.overflow="auto",document.querySelector("body").style.position="static",document.querySelector("html").style.overflow="static"}),$("#itemCategory").on("select2:open",function(){analytics.track("Element Viewed",{elementID:"itemCategoryContainer"}),document.querySelector("body").style.overflow="hidden",document.querySelector("body").style.position="fixed",document.querySelector("html").style.overflow="fixed";let t=document.querySelector(".select2-search__field");if(t.placeholder="S\xf6k... (t.ex. Kl\xe4nning/Sneakers/Blus)",$(".select2-search__field").on("input",e=>{e.target.value.length>0?$(".select2-results__option[role=group]").each((e,t)=>$(t).addClass("expanded-group")):$(".expanded-group").each((e,t)=>$(t).removeClass("expanded-group"))}),!e){let t=document.getElementById("categoryPopUpHeader"),n=document.querySelector(".select2-dropdown");n.insertBefore(t,n.firstChild),t.style.display="block",t.querySelector("#categorySelectClose").onclick=()=>$("#itemCategory").select2("close"),e=!0}document.querySelector(".select2-results__options").addEventListener("scroll",()=>document.activeElement.blur())}),$("#itemCategory").on("change",A("itemCategoryLabel")),// From https://github.com/select2/select2/issues/3015#issuecomment-570171720
$("#itemCategory").on("select2:open",function(){$(".select2-results").css("visibility","hidden")}),$("#itemCategory").on("select2:opening",function(){setTimeout(function(){$(".select2-results").css("visibility","visible")},50)})}let Q=async e=>{let t=async e=>{let t=new Image;return t.crossOrigin="Anonymous",t.src=e,await t.decode(),t},n=e=>{let[t,n,a,i]=[e[0],e[1],e[2],e[3]];for(let r=4;r<e.length;r+=4)if(e[r]!==t||e[r+1]!==n||e[r+2]!==a||e[r+3]!==i)return!1;return!0};try{if(e.match(/nobg|no-bg/i))return!0;let a=await t(e),i=document.createElement("canvas"),r=i.getContext("2d");r.drawImage(a,0,0,a.naturalWidth,a.naturalHeight);let l=r.getImageData(0,0,a.naturalWidth,10).data,o=r.getImageData(0,a.naturalHeight-10,a.naturalWidth,10).data,d=r.getImageData(0,0,10,a.naturalHeight).data,s=r.getImageData(a.naturalWidth-10,0,10,a.naturalHeight).data;return n(l)&&n(o)&&n(d)&&n(s)}catch(e){// If we cannot load the image, play it safe and assume it is the no-bg image
return console.error(e),!0}};// Call sellItemMain directly
I(),// and call sellItemMainAuthenticated after/when a user has logged in
user.whenSet(p)}();//# sourceMappingURL=sellItem.js.map

//# sourceMappingURL=sellItem.js.map
