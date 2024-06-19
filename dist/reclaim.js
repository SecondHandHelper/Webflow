!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,i,a){/* eslint-disable no-undef */var l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r="function"==typeof l[i]&&l[i],o=r.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!o[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var a="function"==typeof l[i]&&l[i];if(!n&&a)return a(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(r)return r(t,!0);// Try the node require function if it exists.
if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(n){var i=e[t][1][n];return null!=i?i:n},m.cache={};var u=o[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return o[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=o,d.parent=r,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return l[i]}}),l[i]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):a&&(this[a]=u)}}({"7h7Hl":[function(e,t,n){var i=e("./sellItemHelpers");function a(){resellButton.style.display="none",reclaimButton.style.display="none",cancelButton.style.display="none",doneButton.style.display="none",toMaiButton.style.display="none"}function l(){let e=document.querySelectorAll("input").values(),t=[];return e.forEach(e=>{e.id.includes("Image")&&e.files[0]&&t.push(e.files[0])}),t}async function r(){return document.getElementById("reclaimFormInner").reportValidity(),new Promise((e,t)=>{// Custom
let n=document.getElementById("reclaimReason");return n.value?n.value.includes("Defects")||n.value.includes("False")||n.value.includes("Dirty")?(imagesTitle.innerText="Bilder p\xe5 felet (obligatoriskt)",e(function(){let e=l();return!!e.length||(document.getElementById("reclaimImage1").setCustomValidity(`Ladda upp minst en bild p\xe5 felet`),document.getElementById("reclaimFormInner").reportValidity(),!1)}())):e(!0):(n.setCustomValidity(`V\xe4lj anledning till reklamationen`),document.getElementById("reclaimFormInner").reportValidity(),e(!1))})}async function o(e){if(!await r())return!1;let t=new Date,n=reclaimReason.value,i=reclaimListingError.value||"";if(reclaimListingError.required&&!i)return!1;// Borde vara del av validering
let a=reclaimDescription.value||"",l="",o=document.getElementsByName("compensationPreference");for(var d=0;d<o.length;d++)o[d].checked&&(l=o[d].value);if(!l)return!1;// Borde vara del av validering
let c=l.includes("10 percent discount")?parseInt(discount10PercentText.innerText.match(/\d+/g)):null,u={createdAt:t,status:"Pending",reason:n,description:a,listingError:i,compensationPreference:l,...c?{refundAmount:c}:{}};return(// Spinner
document.getElementById("doneButtonSpinner").style.display="block",document.getElementById("doneButtonText").style.display="none",// Save reclaim
console.log("Will update: ",{itemId:e,reclaim:u}),u.images=await s(e),await callBackendApi(`/api/items/${e}/reclaim`,{data:{reclaim:u}}),!0)}async function s(e){let t=l();// Uploads files and add the new imageUrls to the changes object
return await Promise.all(t.map(async(t,n)=>{let a=await (0,i.uploadTempImage)(t,`reclaim_${e}_${n}`);return a.url}))}let d=async e=>{let t=await callBackendApi(`/api/items/${e}`);return{...t?.data||{},id:e}},c=async()=>{let e=getParamsObject(),t=e.id?await d(e.id):"";t||(console.error("Invalid item id param"),location.href="/"),function(e){let t=(e.cleanedBrand||e.brand).trim()+"-"+e.category.toLowerCase();document.getElementById("itemTitle").innerText=t,document.getElementById("itemTitleBanner").innerText=t;let n=new Date(e.soldDate).toLocaleDateString("sv-SE",{day:"numeric",month:"long",year:"numeric"}),i=`${e.soldPrice} kr, ${n}`;document.getElementById("itemSubtitle").innerText="K\xf6ptes f\xf6r "+i,document.getElementById("itemSubtitleBanner").innerText=i;let l=window.innerWidth<=400?e?.images?.modelImage||e?.images?.enhancedFrontImageSmall||e?.images?.enhancedFrontImage||e?.images?.frontImageSmall||e?.images?.frontImage:e?.images?.modelImage||e?.images?.enhancedFrontImage||e?.images?.frontImage;document.getElementById("itemImage").src=l,document.getElementById("itemImageBanner").src=l,document.getElementById("resellButton").href=`./sell-item?id=${e.id}`;let r=Math.round(.1*e.soldPrice);r=r<60?60:r>250?250:r,discount10PercentText.innerText=`Beh\xe5lla plagget och f\xe5 ${r} kr \xe5terbetalt`;let o=e.buyer.Email||e.buyer.PhoneNumber;thankYouText.innerText=`Vi tittar p\xe5 \xe4rendet och skickar svar ${o.includes("@")?`till din email ${o}`:`p\xe5 SMS till ditt telefonnummer ${o}`}`,e?.reclaim?.status&&(a(),toMaiButton.style.display="flex",introDiv.style.display="none",thankYouDiv.style.display="block",itemBanner.style.display="block")}(t),document.getElementById("reclaimButton").addEventListener("click",function(){itemBanner.style.display="block",document.getElementById("reclaimForm").style.display="block",cancelButton.style.display="flex",doneButton.style.display="flex",resellButton.style.display="none",reclaimButton.style.display="none",document.getElementById("introDiv").style.display="none"}),reclaimReason.onchange=function(){// Color and label
let e=this.value;if(""===e){reasonLabel.style.display="none",this.style.color="#929292";return}reasonLabel.style.display="block",this.style.color="#101010";// Hide all fields
let t=document.querySelectorAll(".simple-input-container");t.forEach(function(e){e.id.includes("Reason")||(e.style.display="none")}),reclaimImagesContainer.style.display="none",reclaimDescription.required=!0,reclaimListingError.required=!1,e.includes("Defects")?(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block",imagesTitle.innerText="Bilder p\xe5 felet (obligatoriskt)"):e.includes("Listing")?(reclaimListingErrorContainer.style.display="block",reclaimDescription.required=!1,reclaimListingError.required=!0):e.includes("False")?(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block",imagesTitle.innerText="Bilder p\xe5 felet (obligatoriskt)"):e.includes("Dirty")?(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block",imagesTitle.innerText="Bilder p\xe5 felet (obligatoriskt)"):e.includes("Smelly")?reclaimDescriptionContainer.style.display="block":(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block"),compensationPreferenceDiv.style.display="block"},reclaimListingError.onchange=function(){// Color and label
let e=this.value;if(""===e){listingErrorLabel.style.display="none",this.style.color="#929292";return}listingErrorLabel.style.display="block",this.style.color="#101010","Other"===e&&(reclaimDescriptionContainer.style.display="block",reclaimDescription.required=!0)},document.getElementById("doneButton").addEventListener("click",async function(){// Save reclaim
let e=getParamsObject(),t=await o(e.id);// Show confirmation
t&&(console.log("RECLAIM SAVED"),reclaimForm.style.display="none",a(),toMaiButton.style.display="flex",thankYouDiv.style.display="block")}),["reclaimImage1","reclaimImage2","reclaimImage3","reclaimImage4"].forEach(function(e){let t=document.getElementById(e),n=document.getElementById(`${e}PreviewUploading`),a=document.getElementById(`${e}Preview`);t.addEventListener("change",function(){let t=this.files[0];if(t){let l=URL.createObjectURL(t);n.style.backgroundImage=`url('${l}')`,a.style.backgroundImage=`url('${l}')`,document.getElementById(`loading${(0,i.capitalizeFirstLetter)(e)}Icon`).style.display="none",document.getElementById(e).required=!1}})}),document.querySelectorAll("input, select, textarea").forEach(e=>{// Add an event listener to each input to clear validation message on input
e.addEventListener("input",e=>{e.setCustomValidity("");// Clear validation message
}),"select"===e.tagName.toLowerCase()&&e.addEventListener("change",()=>{e.setCustomValidity("")})}),triggerShowContent.click()};c()},{"./sellItemHelpers":"2G59s"}],"2G59s":[function(e,t,n){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");async function a(e,t){sessionStorage.getItem("newItemId")||sessionStorage.setItem("newItemId",await r());let n=sessionStorage.getItem("newItemId"),i=await l(e);if(!i)throw"Fel vid bearbetning av vald bild.";let a=new FormData;a.append("itemId",n),a.append("fileName",t),a.append("file",i),a.append("temporary","true"),a.append("generateSmallImage","true");let o=await fetch(`${BACKEND_API_URL}/api/items/${n}/uploadImage`,{method:"POST",body:a});return await o.json()}async function l(e){return e.size<9437184?Promise.resolve(e):new Promise((t,n)=>{let i=new FileReader;i.onload=()=>{let e=document.createElement("img");e.onload=()=>{let n=e.width,i=e.height;n>i?n>1512&&(i*=1512/n,n=1512):i>2016&&(n*=2016/i,i=2016);let a=document.createElement("canvas");a.width=n,a.height=i;let l=a.getContext("2d");l.imageSmoothingQuality="high",l.drawImage(e,0,0,n,i),a.toBlob(t,"image/jpeg")},e.src=i.result,i.onerror=n},i.readAsDataURL(e)})}async function r(){try{let e=await callBackendApi("/api/id",{method:"POST",requiresAuth:!1});return e.data.id}catch(e){return console.error(`Failed to fetch unique ID, generating uuidv4 id: ${e.message}`,e),uuidv4()}}async function o(e,t=!0){let n=await s(e);return n?.url&&(t&&c("enhancedFrontImage",n.url,n.urlSmall),u("frontImage",window.innerWidth<=370?n.urlSmall:n.url)),d("frontImage"),n}async function s(e){try{let t=await callBackendApi("/api/images/enhance",{data:{imageUrl:e},requiresAuth:!1});return sessionStorage.setItem("enhancedFrontImage",t.data.url),t.data}catch(e){return errorHandler.report(e),console.error(e),""}}function d(e){document.getElementById(`loading${m(e)}Icon`).style.display="none",document.getElementById(`delete${m(e)}Icon`).style.display="inline-block","frontImage"===e&&(document.getElementById("enhancedAnimationDiv").style.display="none")}function c(e,t,n){let i=JSON.parse(localStorage.getItem("newItem")||JSON.stringify({})),a=i.images||{};a[e]=t,a[`${e}Small`]=n,i.images=a,localStorage.setItem("newItem",JSON.stringify(i))}function u(e,t){document.getElementById(`${e}Preview`).style.backgroundImage=`url('${t}')`,d(e)}function m(e){return e.charAt(0).toUpperCase()+e.slice(1)}async function y(e,t,n=!0){try{!function(e){let t=document.getElementById(e).parentNode.parentNode;t.querySelector(".w-file-upload-error").style.display="none"}(t);let i=URL.createObjectURL(e);document.getElementById(`${t}PreviewUploading`).style.backgroundImage=`url('${i}')`,document.getElementById(`${t}Preview`).style.backgroundImage=`url('${i}')`,p(t),x(t,"success-state");let{url:l,urlSmall:r}=await a(e,t);return n&&c(t,l,r),l}catch(n){console.error("Failed to upload image",n),errorHandler.report(n),document.getElementById(`${t}PreviewUploading`).style.backgroundImage="",document.getElementById(`${t}Preview`).style.backgroundImage="",document.getElementById(`loading${m(t)}Icon`).style.display="none",x(t,"default-state"),e.size>10485760?g(t,"Error: Bilden \xe4r f\xf6r stor. Max 10 MB."):g(t,"Error: N\xe5got gick fel vid uppladdning, f\xf6rs\xf6k igen eller kontakt oss om felet kvarst\xe5r."),document.getElementById(t).value=""}}function g(e,t){let n=document.getElementById(e).parentNode.parentNode;n.querySelector(".w-file-upload-error").style.display="block",n.querySelector(".w-file-upload-error-msg").innerText=t}function x(e,t){let n=document.getElementById(e).parentNode.parentNode.childNodes;for(let e=0;e<n.length;e++)n[e].className.includes(t)?n[e].style.display="block":n[e].style.display="none"}function p(e){if("frontImage"===e){document.getElementById(`delete${m(e)}Icon`).style.display="none",document.getElementById(`loading${m(e)}Icon`).style.display="none",localStorage.getItem("sessionUser")||(document.getElementById("photoroomDiv").style.display="flex"),document.getElementById("enhancedAnimationDiv").style.display="block",triggerEnhancingAnimation.click();return}document.getElementById(`loading${m(e)}Icon`).style.display="inline-block",document.getElementById(`delete${m(e)}Icon`).style.display="none"}function f(e,t){let n=["shein","lager 157","divided","brandy melville","cubus","bubbleroom","bondelid","nelly","dobber","\xe5hl\xe9ns","kappahl","primark","jack & jones","sisters point","missguided","topman","bik bok","cubus","happy holly","zign","glamorous","hollister","river island","light before dark","bohoo","crocker","forever 21","maze","mint&berry","chiara forthi","zalando","din sko","pull & bear","svea","zoul","boohoo","gap","topshop","ellos","lager 157","stradivarius","studio total","indiska","bershka","shein","riley","vero moda","vila","don donna","aldo","new look denim"],i=document.getElementById("hardToSellDiv");document.getElementById("itemBrand").setCustomValidity("");let a=getParamsObject();return!a.id&&(n.includes(e.toLowerCase())||!["boots","dunjacka","jacka","k\xe4ngor","kappa","kavaj","kostym","p\xe4lsjacka","regnjacka","rock","skinnjacka","vinterskor"].includes(t?.toLowerCase())&&["tom tailor","monki","dressmann","urban outfitters","asos","holly & white","only","gina tricot"].includes(e.toLowerCase())||["baddr\xe4kt","bikini","bodysuit","chinos","flip-flops","halsduk","handduk","hatt","jeans","keps","l\xe5ng\xe4rmad t-shirt","linne","mjukisbyxor","morgonrock","m\xf6ssa","necess\xe4r","pik\xe9","pyjamas","sandaler","sarong","shorts","slips","sport-bh","strumpbyxor","t-shirt","tights","topp","tr\xe4ningsbyxor","tr\xe4ningstr\xf6ja","underst\xe4ll","vantar"].includes(t?.toLowerCase())&&["karl kani","rieker","uniqlo","carin wester","stockh lm","weekday","mango","wera","ichi","lindex","h&m","zara","mng","mq","cheap monday","h&m premium","na-kd","clarks","gant","hackett","hugo boss","la chemise","lacoste","lyle & scott","marc o'polo","melvin & hamilton","ray-ban","reebok","sebago","stenstr\xf6ms","the shirt factory","hampton republic","quicksilver","banana republic","pieces","sprit","denim","east west","xit","jacqueline de yong","mexx","fb sister","ok\xe4nt","bodyflirt","dorothy perkins","fransa","laurel","rut&circle","soc","junkyard","soyaconcept","amisu","u.s. polo assn.","line of oslo","gossip","i say","jascha stockholm","noisy may","six ames","velour by nostalgi","house of lola","fiveunits","miss me","flash","champion","under armour","oasis","fornarina","isolde","rosebud","chiquelle","kaffe","mckinley","cream","abercrombie & fitch","modstr\xf6m","ecco","esprit","alice bizous","craft","ellesse","wesc","dry lake","r\xf6hnisch","acqua limone","anna field","le","ax paris","burton","hansen & jacob","lou in love","mad lady","selected homme","tenson","whistles","zizzi","gerry weber"].includes(e.toLowerCase()))?(hardToSellText.innerHTML=n.includes(e.toLowerCase())?`Vi s\xe4ljer tyv\xe4rr inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`:`Vi s\xe4ljer tyv\xe4rr inte kategorin ${t} fr\xe5n ${e} p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`,stopIcon.style.display="flex",warningIcon.style.display="none",i.style.display="block",document.getElementById("itemBrand").setCustomValidity(n.includes(e.toLowerCase())?`Vi s\xe4ljer inte plagg fr\xe5n ${e}`:`Vi s\xe4ljer inte kategorin '${t}' fr\xe5n ${e}`),!0):["H&M","HM","Zara","ASOS","Nelly","Gina Tricot","BikBok","Bik Bok","Lindex","Kappahl","Cubus","NA-KD","NAKD","Mango","Ellos","Primark","Shein","Vila","Forever 21","Pull & Bear","Bershka","Stradivarius"].some(t=>e.toLowerCase().includes(t.toLowerCase()))?(hardToSellText.innerHTML=`Vi s\xe4ljer i regel inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5gt andrahandsv\xe4rde. Undantag kan finnas.`,stopIcon.style.display="none",warningIcon.style.display="block",i.style.display="block",!0):void(i.style.display="none")}function k(e="Kategori",t=f){$("#itemCategory").select2({selectionCssClass:"form-field",placeholder:e||"Kategori",data:[{id:"",text:""},{text:"\xd6verdelar",children:[{id:"Tr\xf6ja",text:"Tr\xf6ja"},{id:"Blus",text:"Blus"},{id:"Topp",text:"Topp"},{id:"Skjorta",text:"Skjorta"},{id:"Linneskjorta",text:"Linneskjorta"},{id:"T-shirt",text:"T-shirt"},{id:"Kavaj",text:"Kavaj"},{id:"Sweatshirt",text:"Sweatshirt"},{id:"Hoodie",text:"Hoodie"},{id:"Polotr\xf6ja",text:"Polotr\xf6ja"},{id:"Tunika",text:"Tunika"},{id:"V\xe4st",text:"V\xe4st"},{id:"Kofta",text:"Kofta"},{id:"Linne",text:"Linne"},{id:"Tr\xe4ningstr\xf6ja",text:"Tr\xe4ningstr\xf6ja"},{id:"Poncho",text:"Poncho"},{id:"Pik\xe9",text:"Pik\xe9"},{id:"L\xe5ng\xe4rmad T-shirt",text:"L\xe5ng\xe4rmad T-shirt"},{id:"Kostymv\xe4st",text:"Kostymv\xe4st"}]},{text:"Underdelar",children:[{id:"Kjol",text:"Kjol"},{id:"Byxor",text:"Byxor"},{id:"Jeans",text:"Jeans"},{id:"Chinos",text:"Chinos"},{id:"Fritidsbyxor",text:"Fritidsbyxor"},{id:"Tr\xe4ningsbyxor",text:"Tr\xe4ningsbyxor"},{id:"Tights",text:"Tights"},{id:"Strumpbyxor",text:"Strumpbyxor"},{id:"Mjukisbyxor",text:"Mjukisbyxor"},{id:"Kostymbyxor",text:"Kostymbyxor"},{id:"Shorts",text:"Shorts"},{id:"Sarong",text:"Sarong"}]},{text:"Helkropp",children:[{id:"Kl\xe4nning",text:"Kl\xe4nning"},{id:"Kaftan",text:"Kaftan"},{id:"Kostym",text:"Kostym"},{id:"Set",text:"Set"},{id:"Jumpsuit",text:"Jumpsuit"},{id:"Baddr\xe4kt",text:"Baddr\xe4kt"},{id:"Bikini",text:"Bikini"},{id:"Pyjamas",text:"Pyjamas"},{id:"Morgonrock",text:"Morgonrock"},{id:"Br\xf6llopskl\xe4nning",text:"Br\xf6llopskl\xe4nning"},{id:"Balkl\xe4nning",text:"Balkl\xe4nning"},{id:"Bodysuit",text:"Bodysuit"},{id:"Underst\xe4ll",text:"Underst\xe4ll"}]},{text:"Ytterkl\xe4der",children:[{id:"Jacka",text:"Jacka"},{id:"Kappa",text:"Kappa"},{id:"Rock",text:"Rock"},{id:"Fritidsjacka",text:"Fritidsjacka"},{id:"Trenchcoat",text:"Trenchcoat"},{id:"Skinnjacka",text:"Skinnjacka"},{id:"Dunjacka",text:"Dunjacka"},{id:"Regnjacka",text:"Regnjacka"},{id:"P\xe4lsjacka",text:"P\xe4lsjacka"}]},{text:"Skor",children:[{id:"Sneakers",text:"Sneakers"},{id:"Sandaler",text:"Sandaler"},{id:"Klackar",text:"Klackar"},{id:"Ballerinaskor",text:"Ballerinaskor"},{id:"Loafers",text:"Loafers"},{id:"Flip-flops",text:"Flip-flops"},{id:"Boots",text:"Boots"},{id:"K\xe4ngor",text:"K\xe4ngor"},{id:"Vinterskor",text:"Vinterskor"},{id:"Skor",text:"Annat (Skor)"}]},{text:"V\xe4skor",children:[{id:"Axelremsv\xe4ska",text:"Axelremsv\xe4ska"},{id:"Handv\xe4ska",text:"Handv\xe4ska"},{id:"Kuvertv\xe4ska",text:"Kuvertv\xe4ska"},{id:"Ryggs\xe4ck",text:"Ryggs\xe4ck"},{id:"Tr\xe4ningsv\xe4ska",text:"Tr\xe4ningsv\xe4ska"},{id:"Resv\xe4ska",text:"Resv\xe4ska"},{id:"Datorv\xe4ska",text:"Datorv\xe4ska"},{id:"V\xe4ska",text:"Annat (V\xe4ska)"}]},{text:"Accessoarer",children:[{id:"Solglas\xf6gon",text:"Solglas\xf6gon"},{id:"Glas\xf6gon",text:"Glas\xf6gon"},{id:"\xd6rh\xe4nge",text:"\xd6rh\xe4nge"},{id:"Halsband",text:"Halsband"},{id:"Armband",text:"Armband"},{id:"Ring",text:"Ring"},{id:"Brosch",text:"Brosch"},{id:"Keps",text:"Keps"},{id:"Sjal",text:"Sjal"},{id:"Krage",text:"Krage"},{id:"B\xe4lte",text:"B\xe4lte"},{id:"Pl\xe5nbok",text:"Pl\xe5nbok"},{id:"Halsduk",text:"Halsduk"},{id:"Hatt",text:"Hatt"},{id:"M\xf6ssa",text:"M\xf6ssa"},{id:"Vantar",text:"Vantar"},{id:"Necess\xe4r",text:"Necess\xe4r"},{id:"Slips",text:"Slips"},{id:"Handduk",text:"Handduk"},{id:"Klocka",text:"Klocka"}]}]}),$("body").on("click",".select2-container--open .select2-results__group",function(){$(this).parent().attr("class").match(/expanded-group/)?$(this).parent().removeClass("expanded-group"):($(".expanded-group").first().removeClass("expanded-group"),$(this).parent().addClass("expanded-group"))});let n=!1;$("#itemCategory").on("select2:select",()=>{analytics.track("Click",{elementID:"itemCategoryValue"}),document.querySelector("#itemCategory").dispatchEvent(new Event("change"))});let i=!1;$("#itemCategory").on("select2:open",()=>{i||(i=!0,$("input.select2-search__field").on("click",()=>{analytics.track("Click",{elementID:"itemCategorySearch"})}))}),$("#itemCategory").on("select2:close",()=>{document.querySelector("body").style.overflow="auto",document.querySelector("body").style.position="static",document.querySelector("html").style.overflow="static"}),$("#itemCategory").on("select2:open",function(){analytics.track("Element Viewed",{elementID:"itemCategoryContainer"}),document.querySelector("body").style.overflow="hidden",document.querySelector("body").style.position="fixed",document.querySelector("html").style.overflow="fixed";let e=document.querySelector(".select2-search__field");if(e.placeholder="S\xf6k... (t.ex. Kl\xe4nning/Sneakers/Blus)",$(".select2-search__field").on("input",e=>{e.target.value.length>0?$(".select2-results__option[role=group]").each((e,t)=>$(t).addClass("expanded-group")):$(".expanded-group").each((e,t)=>$(t).removeClass("expanded-group"))}),!n){let e=document.getElementById("categoryPopUpHeader"),t=document.querySelector(".select2-dropdown");t.insertBefore(e,t.firstChild),e.style.display="block",e.querySelector("#categorySelectClose").onclick=()=>$("#itemCategory").select2("close"),n=!0}document.querySelector(".select2-results__options").addEventListener("scroll",()=>document.activeElement.blur())}),$("#itemCategory").on("change",e=>{h("itemCategoryLabel")(e);let n=document.getElementById("itemCategory"),i=document.getElementById("itemBrand");t(i.value,n.value)}),// From https://github.com/select2/select2/issues/3015#issuecomment-570171720
$("#itemCategory").on("select2:open",function(){$(".select2-results").css("visibility","hidden")}),$("#itemCategory").on("select2:opening",function(){setTimeout(function(){$(".select2-results").css("visibility","visible")},50)})}function h(e){return t=>{document.getElementById(e).style.display=t.target.value.length>0?"inline-block":"none"}}i.defineInteropFlag(n),i.export(n,"uploadTempImage",()=>a),i.export(n,"requestUniqueId",()=>r),i.export(n,"enhanceFrontImage",()=>o),i.export(n,"showDeleteImageIcon",()=>d),i.export(n,"rememberNewItemImageField",()=>c),i.export(n,"showImagePreview",()=>u),i.export(n,"capitalizeFirstLetter",()=>m),i.export(n,"uploadImageAndShowPreview",()=>y),i.export(n,"showImageState",()=>x),i.export(n,"showLoadingIcon",()=>p),i.export(n,"checkBlockedOrLowShareSoldBrand",()=>f),i.export(n,"initializeCategorySelect",()=>k),i.export(n,"fieldLabelToggle",()=>h)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||t.hasOwnProperty(n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["7h7Hl"],"7h7Hl","parcelRequire81ca")//# sourceMappingURL=reclaim.js.map
;
//# sourceMappingURL=reclaim.js.map
