!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,r,o){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof a[r]&&a[r],l=i.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!l[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var o="function"==typeof a[r]&&a[r];if(!n&&o)return o(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(i)return i(t,!0);// Try the node require function if it exists.
if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}u.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},u.cache={};var m=l[t]=new d.Module(t);e[t][0].call(m.exports,u,m,m.exports,this)}return l[t].exports;function u(e){var t=u.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=i,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return a[r]}}),a[r]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var m=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=m:"function"==typeof define&&define.amd?define(function(){return m}):o&&(this[o]=m)}}({YhYNY:[function(e,t,n){var r=e("./sellItemHelpers");let o=async e=>{let t=await callBackendApi(`/api/items/${e}`);return{...t?.data||{},id:e}},a=async()=>{let e=getParamsObject(),t=e.id?await o(e.id):JSON.parse(localStorage.getItem("latestItemCreated"));t||(console.error("Invalid item id param or no recently created item"),location.href="/private"),function(e){var t;let n,{humanCheckNeeded:o,maxPriceEstimate:a,newMinMaxLog:i}=e.mlValuation||{};e.infoRequests?.price?.response==="User proposal"?(document.getElementById("nextStepTitle").style.display="block",document.getElementById("nextStepTitle").innerText="Granskar pris\xe4ndringar",document.getElementById("nextStepText").innerText="Vi kikar p\xe5 dina pris\xe4ndringar, och om det ser bra ut s\xe5 p\xe5b\xf6rjar vi f\xf6rs\xe4ljningen. Vi tar sedan hand om s\xe4ljprocessen och h\xf6r av oss p\xe5 SMS n\xe4r plagget \xe4r s\xe5lt."):(o||!a&&!e.infoRequests?.price?.maxPrice||i)&&(document.getElementById("nextStepTitle").style.display="block",document.getElementById("nextStepText").innerText=`Ditt ${e.cleanedBrand||e.brand}-plagg beh\xf6ver v\xe4rderas manuellt, d\xe5 AI-v\xe4rderingen har l\xe4gre tr\xe4ffs\xe4kerhet p\xe5 detta varum\xe4rke. Du kommer f\xe5 ett SMS n\xe4r vi v\xe4rderat plagget som du kan ta st\xe4llning till.`),document.getElementById("itemTitle").innerText=(e.cleanedBrand||e.brand).trim()+"-"+e.category.toLowerCase(),document.getElementById("itemPrice").innerText=!e.maxPriceEstimate||o||i?"":`${e.maxPriceEstimate||a} SEK`,document.getElementById("itemPrice").style.display="block",document.getElementById("itemSubtitle").innerText=e.model?`${e.model}, ${(0,r.colorName)(e.color)}`:(0,r.colorName)(e.color),document.getElementById("itemSize").innerText=e.size,document.getElementById("itemMaterial").innerText=e.material,document.getElementById("itemCondition").innerText=e.condition=(n="",((n="Anv\xe4nd, tecken p\xe5 slitage"===(t=e).condition&&(t.defects.length||t.defectDescription)?t.defectDescription?t.defectDescription:t.defects&&t.defects.length>0?"Anm\xe4rkning: "+t.defects.filter(e=>"Annat"!==e).join(", "):t.condition:t.condition)+".").replace("..",".")),e.originalPrice&&(itemOriginalPrice.innerText=e.originalPrice+" SEK",originalPriceDiv.style.display="flex"),e.userComment&&(document.getElementById("itemComment").innerText=e.userComment,document.getElementById("itemCommentDiv").style.display="block"),e?.platformsToBePublishedOn?.length?function(e){if(e?.platformsToBePublishedOn?.length<2){document.getElementById("platformsSection").style.display="none";return}let t=document.getElementById("platformTradera");e.platformsToBePublishedOn.forEach(e=>{if(e.match(/Tradera/))return;// Tradera is set statically in Webflow and always displayed
let n=t.cloneNode(!0);n.id=e,n.innerText=e,t.parentNode.appendChild(n)}),document.getElementById("platformsLoadingDiv").style.display="none",document.getElementById("platformsDiv").style.display="block"}(e):document.getElementById("platformsSection").style.display="none"}(t),triggerShowContent.click()};a();//SLIDER INITIALIZATION AND FUNCTIONALITY
let i=document.querySelector(".carousel-wrapper"),l=document.querySelector(".carousel-track"),s=document.querySelector(".next-button"),d=document.querySelector(".previous-button"),c=0,m=0,u=()=>{let e=i.offsetWidth;c=document.querySelectorAll(".carousel-slide").length,// Hide/show arrows based on position
d.style.display=0===m?"none":"flex",s.style.display=m===c-1?"none":"flex",// Update carousel position
l.style.transition="transform 0.3s ease-in-out",l.style.transform=`translateX(-${m*e}px)`},g=()=>{m=(m+1)%c,u()},x=()=>{m=(m-1+c)%c,u()};function p(e){console.log("After initialization:",m=0);let t=e?.images;for(let e of(l.innerHTML="",console.log("images",t),["modelImage","frontImage","enhancedFrontImage","brandTagImage","materialTagImage","extraImage","defectImage"]))if(t[e]){if("frontImage"===e&&t.enhancedFrontImage)continue;console.log("imageName",e);let n=window.innerWidth<=350&&t[`${e}Small`]||t[e],r=`
            <div class='carousel-slide'>
              <img class='slider-image' src='${n}' id='${e}' />
            </div>
          `;l.innerHTML+=r,console.log(l)}let n=document.querySelectorAll(".carousel-slide");// Next button functionality
s.removeEventListener("click",g),d.removeEventListener("click",x),s.addEventListener("click",g),d.addEventListener("click",x);// Swipe functionality
let r=null,o=null,a=!1;i.addEventListener("touchstart",e=>{e.touches&&(o=r=e.touches[0].clientX,a=!0)}),i.addEventListener("touchmove",e=>{if(!e.touches||!a)return;o=e.touches[0].clientX;let t=o-r,i=n[0].offsetWidth,s=-m*i+t;l.style.transform=`translateX(${s}px)`}),i.addEventListener("touchend",()=>{if(a){// Determine if the swipe is significant enough to change slides
if(a=!1,null!==r&&null!==o){let e=o-r;Math.abs(e)>50&&(e>50?m=Math.max(m-1,0):e<-50&&(m=Math.min(m+1,n.length-1)))}// Reset the coordinates
r=null,o=null,u()}}),// Initialize carousel
u()}let y=getParamsObject();y.id?o(y.id).then(p).catch(e=>console.log("failed")):((item=JSON.parse(localStorage.getItem("latestItemCreated")))||(console.error("No recently created item found"),location.href="/private"),p(item))},{"./sellItemHelpers":"2G59s"}],"2G59s":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");async function o(e,t){try{return await a(e,t)}catch(n){if("ImageResizeError"!==n.name)// Retry once for upload errors
return console.error("Failed to upload image",n),errorHandler.report(n),await a(e,t);throw console.error("Failed to resize image",n),errorHandler.report(n),n;// Don't retry for resize errors
}}async function a(e,t){let n;sessionStorage.getItem("newItemId")||sessionStorage.setItem("newItemId",await c());let r=sessionStorage.getItem("newItemId");try{n=await i(e),console.log(`Scaled image size: ${(n.size/1024/1024).toFixed(2)} MB`)}catch(t){let e=Error("Failed to resize image");throw e.name="ImageResizeError",e.originalError=t,e}if(!n)throw Error("Fel vid bearbetning av vald bild.");let o=new FormData;o.append("itemId",r),o.append("fileName",t),o.append("file",n),o.append("temporary","true"),o.append("generateSmallImage","true");let a=await fetch(`${BACKEND_API_URL}/api/items/${r}/uploadImage`,{method:"POST",body:o});if(!a.ok)throw Error(`HTTP error! status: ${a.status}`);return await a.json()}async function i(e){if(e.size<5242880)return Promise.resolve(e);if("createImageBitmap"in window)try{return console.log("Attempting to scale image with createImageBitmap"),await l(e,3024,4032)}catch(e){console.warn("createImageBitmap scaling method failed",e)}// If createImageBitmap is not supported or failed, try OffscreenCanvas
if("OffscreenCanvas"in window)try{return console.log("Attempting to scale image with OffscreenCanvas"),await s(e,3024,4032)}catch(e){console.warn("OffscreenCanvas scaling method failed",e)}// If both modern methods fail or are not supported, fall back to the original method
try{return console.log("Attempting to scale image with original method"),await d(e,3024,4032)}catch(e){throw console.error("All scaling methods failed",e),Error("Unable to process image")}}async function l(e,t,n){try{let r=await createImageBitmap(e),o=new OffscreenCanvas(t,n),a=o.getContext("2d"),{width:i,height:l}=r;return i>l?i>t&&(l*=t/i,i=t):l>n&&(i*=n/l,l=n),o.width=i,o.height=l,a.drawImage(r,0,0,i,l),await o.convertToBlob({type:"image/jpeg",quality:.9})}catch(e){throw console.error("Image scaling failed",e),Error("Unable to process image")}}async function s(e,t,n){let r=await createImageBitmap(e),o=r.width,a=r.height;o>a?o>t&&(a*=t/o,o=t):a>n&&(o*=n/a,a=n);let i=new OffscreenCanvas(o,a),l=i.getContext("2d");return l.drawImage(r,0,0,o,a),i.convertToBlob({type:"image/jpeg",quality:.9})}async function d(e,t,n){return new Promise((r,o)=>{let a=new Image;a.onload=()=>{let e=document.createElement("canvas"),o=a.width,i=a.height;o>i?o>t&&(i*=t/o,o=t):i>n&&(o*=n/i,i=n),e.width=o,e.height=i;let l=e.getContext("2d");l.drawImage(a,0,0,o,i),e.toBlob(e=>{console.log(`Fallback resize: ${(e.size/1024/1024).toFixed(2)} MB`),r(e)},"image/jpeg",.9)},a.onerror=o,a.src=URL.createObjectURL(e)})}async function c(){try{let e=await callBackendApi("/api/id",{method:"POST",requiresAuth:!1});return e.data.id}catch(e){return console.error(`Failed to fetch unique ID, generating uuidv4 id: ${e.message}`,e),uuidv4()}}async function m(e,t=!0){let n=await u(e);return n?.url&&(t&&x("enhancedFrontImage",n.url,n.urlSmall),p("frontImage",window.innerWidth<=370?n.urlSmall:n.url)),g("frontImage"),n}async function u(e){try{let t=await callBackendApi("/api/images/enhance",{data:{imageUrl:e},requiresAuth:!1,timeoutSec:30});return sessionStorage.setItem("enhancedFrontImage",t.data.url),t.data}catch(e){return errorHandler.report(e),console.error(e),""}}function g(e){document.getElementById(`loading${y(e)}Icon`).style.display="none",document.getElementById(`delete${y(e)}Icon`).style.display="inline-block","frontImage"===e&&(document.getElementById("enhancedAnimationDiv").style.display="none")}function x(e,t,n){let r=JSON.parse(localStorage.getItem("newItem")||JSON.stringify({})),o=r.images||{};o[e]=t,o[`${e}Small`]=n,r.images=o,localStorage.setItem("newItem",JSON.stringify(r))}function p(e,t){document.getElementById(`${e}Preview`).style.backgroundImage=`url('${t}')`,g(e)}function y(e){return e.charAt(0).toUpperCase()+e.slice(1)}async function f(e,t,n=!0){try{k(t);let r=URL.createObjectURL(e);document.getElementById(`${t}PreviewUploading`).style.backgroundImage=`url('${r}')`,document.getElementById(`${t}Preview`).style.backgroundImage=`url('${r}')`,b(t),v(t,"success-state");let{url:a,urlSmall:i}=await o(e,t);return n&&x(t,a,i),a}catch(n){console.error("Failed to upload image",n),errorHandler.report(n),document.getElementById(`${t}PreviewUploading`).style.backgroundImage="",document.getElementById(`${t}Preview`).style.backgroundImage="",document.getElementById(`loading${y(t)}Icon`).style.display="none",v(t,"default-state"),e.size>10485760?h(t,"Error: Bilden \xe4r f\xf6r stor. Max 10 MB."):h(t,"Error: N\xe5got gick fel vid uppladdning, f\xf6rs\xf6k igen eller kontakt oss om felet kvarst\xe5r."),document.getElementById(t).value=""}}function h(e,t){let n=document.getElementById(e).parentNode.parentNode;n.querySelector(".w-file-upload-error").style.display="block",n.querySelector(".w-file-upload-error-msg").innerText=t}function k(e){let t=document.getElementById(e).parentNode.parentNode;t.querySelector(".w-file-upload-error").style.display="none"}function v(e,t){let n=document.getElementById(e).parentNode.parentNode.childNodes;for(let e=0;e<n.length;e++)n[e].className.includes(t)?n[e].style.display="block":n[e].style.display="none"}function b(e){if("frontImage"===e){document.getElementById(`delete${y(e)}Icon`).style.display="none",document.getElementById(`loading${y(e)}Icon`).style.display="none",localStorage.getItem("sessionUser")||(document.getElementById("photoroomDiv").style.display="flex"),document.getElementById("enhancedAnimationDiv").style.display="block",triggerEnhancingAnimation.click();return}document.getElementById(`loading${y(e)}Icon`).style.display="inline-block",document.getElementById(`delete${y(e)}Icon`).style.display="none"}function I(e,t){let n=["shein","lager 157","divided","brandy melville","cubus","bubbleroom","bondelid","nelly","dobber","\xe5hl\xe9ns","kappahl","primark","jack & jones","sisters point","missguided","topman","bik bok","cubus","happy holly","zign","glamorous","hollister","river island","light before dark","bohoo","crocker","forever 21","maze","mint&berry","chiara forthi","zalando","din sko","pull & bear","svea","zoul","boohoo","gap","topshop","ellos","lager 157","stradivarius","studio total","indiska","bershka","shein","riley","vero moda","vila","don donna","aldo","new look denim"],r=document.getElementById("hardToSellDiv");document.getElementById("itemBrand").setCustomValidity("");let o=getParamsObject();return!o.id&&(n.includes(e.toLowerCase())||!["boots","dunjacka","jacka","k\xe4ngor","kappa","kavaj","kostym","p\xe4lsjacka","regnjacka","rock","skinnjacka","vinterskor"].includes(t?.toLowerCase())&&["tom tailor","monki","dressmann","urban outfitters","asos","holly & white","only","gina tricot"].includes(e.toLowerCase())||["baddr\xe4kt","bikini","bodysuit","chinos","flip-flops","halsduk","handduk","hatt","jeans","keps","l\xe5ng\xe4rmad t-shirt","linne","mjukisbyxor","morgonrock","m\xf6ssa","necess\xe4r","pik\xe9","pyjamas","sandaler","sarong","shorts","slips","sport-bh","strumpbyxor","t-shirt","tights","topp","tr\xe4ningsbyxor","tr\xe4ningstr\xf6ja","underst\xe4ll","vantar"].includes(t?.toLowerCase())&&["karl kani","rieker","uniqlo","carin wester","stockh lm","weekday","mango","wera","ichi","lindex","h&m","zara","mng","mq","cheap monday","h&m premium","na-kd","clarks","gant","hackett","hugo boss","la chemise","lacoste","lyle & scott","marc o'polo","melvin & hamilton","ray-ban","reebok","sebago","stenstr\xf6ms","the shirt factory","hampton republic","quicksilver","banana republic","pieces","sprit","denim","east west","xit","jacqueline de yong","mexx","fb sister","ok\xe4nt","bodyflirt","dorothy perkins","fransa","laurel","rut&circle","soc","junkyard","soyaconcept","amisu","u.s. polo assn.","line of oslo","gossip","i say","jascha stockholm","noisy may","six ames","velour by nostalgi","house of lola","fiveunits","miss me","flash","champion","under armour","oasis","fornarina","isolde","rosebud","chiquelle","kaffe","mckinley","cream","abercrombie & fitch","modstr\xf6m","ecco","esprit","alice bizous","craft","ellesse","wesc","dry lake","r\xf6hnisch","acqua limone","anna field","le","ax paris","burton","hansen & jacob","lou in love","mad lady","selected homme","tenson","whistles","zizzi","gerry weber"].includes(e.toLowerCase()))?(hardToSellText.innerHTML=n.includes(e.toLowerCase())?`Vi s\xe4ljer tyv\xe4rr inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`:`Vi s\xe4ljer tyv\xe4rr inte kategorin ${t} fr\xe5n ${e} p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`,stopIcon.style.display="flex",warningIcon.style.display="none",r.style.display="block",document.getElementById("itemBrand").setCustomValidity(n.includes(e.toLowerCase())?`Vi s\xe4ljer inte plagg fr\xe5n ${e}`:`Vi s\xe4ljer inte kategorin '${t}' fr\xe5n ${e}`),!0):["H&M","HM","Zara","ASOS","Nelly","Gina Tricot","BikBok","Bik Bok","Lindex","Kappahl","Cubus","NA-KD","NAKD","Mango","Ellos","Primark","Shein","Vila","Forever 21","Pull & Bear","Bershka","Stradivarius"].some(t=>e.toLowerCase().includes(t.toLowerCase()))?(hardToSellText.innerHTML=`Vi s\xe4ljer i regel inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5gt andrahandsv\xe4rde. Undantag kan finnas.`,stopIcon.style.display="none",warningIcon.style.display="block",r.style.display="block",!0):void(r.style.display="none")}function w(e="Kategori",t=I){$("#itemCategory").select2({selectionCssClass:"form-field",placeholder:e||"Kategori",data:[{id:"",text:""},{text:"\xd6verdelar",children:[{id:"Tr\xf6ja",text:"Tr\xf6ja"},{id:"Blus",text:"Blus"},{id:"Topp",text:"Topp"},{id:"Skjorta",text:"Skjorta"},{id:"Linneskjorta",text:"Linneskjorta"},{id:"T-shirt",text:"T-shirt"},{id:"Kavaj",text:"Kavaj"},{id:"Sweatshirt",text:"Sweatshirt"},{id:"Hoodie",text:"Hoodie"},{id:"Polotr\xf6ja",text:"Polotr\xf6ja"},{id:"Tunika",text:"Tunika"},{id:"V\xe4st",text:"V\xe4st"},{id:"Kofta",text:"Kofta"},{id:"Linne",text:"Linne"},{id:"Tr\xe4ningstr\xf6ja",text:"Tr\xe4ningstr\xf6ja"},{id:"Poncho",text:"Poncho"},{id:"Pik\xe9",text:"Pik\xe9"},{id:"L\xe5ng\xe4rmad T-shirt",text:"L\xe5ng\xe4rmad T-shirt"},{id:"Kostymv\xe4st",text:"Kostymv\xe4st"}]},{text:"Underdelar",children:[{id:"Kjol",text:"Kjol"},{id:"Byxor",text:"Byxor"},{id:"Jeans",text:"Jeans"},{id:"Chinos",text:"Chinos"},{id:"Fritidsbyxor",text:"Fritidsbyxor"},{id:"Tr\xe4ningsbyxor",text:"Tr\xe4ningsbyxor"},{id:"Tights",text:"Tights"},{id:"Strumpbyxor",text:"Strumpbyxor"},{id:"Mjukisbyxor",text:"Mjukisbyxor"},{id:"Kostymbyxor",text:"Kostymbyxor"},{id:"Shorts",text:"Shorts"},{id:"Sarong",text:"Sarong"}]},{text:"Helkropp",children:[{id:"Kl\xe4nning",text:"Kl\xe4nning"},{id:"Kaftan",text:"Kaftan"},{id:"Kostym",text:"Kostym"},{id:"Set",text:"Set"},{id:"Jumpsuit",text:"Jumpsuit"},{id:"Baddr\xe4kt",text:"Baddr\xe4kt"},{id:"Bikini",text:"Bikini"},{id:"Pyjamas",text:"Pyjamas"},{id:"Morgonrock",text:"Morgonrock"},{id:"Br\xf6llopskl\xe4nning",text:"Br\xf6llopskl\xe4nning"},{id:"Balkl\xe4nning",text:"Balkl\xe4nning"},{id:"Bodysuit",text:"Bodysuit"},{id:"Underst\xe4ll",text:"Underst\xe4ll"}]},{text:"Ytterkl\xe4der",children:[{id:"Jacka",text:"Jacka"},{id:"Kappa",text:"Kappa"},{id:"Rock",text:"Rock"},{id:"Fritidsjacka",text:"Fritidsjacka"},{id:"Trenchcoat",text:"Trenchcoat"},{id:"Skinnjacka",text:"Skinnjacka"},{id:"Dunjacka",text:"Dunjacka"},{id:"Regnjacka",text:"Regnjacka"},{id:"P\xe4lsjacka",text:"P\xe4lsjacka"}]},{text:"Skor",children:[{id:"Sneakers",text:"Sneakers"},{id:"Sandaler",text:"Sandaler"},{id:"Klackar",text:"Klackar"},{id:"Ballerinaskor",text:"Ballerinaskor"},{id:"Loafers",text:"Loafers"},{id:"Flip-flops",text:"Flip-flops"},{id:"Boots",text:"Boots"},{id:"K\xe4ngor",text:"K\xe4ngor"},{id:"Vinterskor",text:"Vinterskor"},{id:"Skor",text:"Annat (Skor)"}]},{text:"V\xe4skor",children:[{id:"Axelremsv\xe4ska",text:"Axelremsv\xe4ska"},{id:"Handv\xe4ska",text:"Handv\xe4ska"},{id:"Kuvertv\xe4ska",text:"Kuvertv\xe4ska"},{id:"Ryggs\xe4ck",text:"Ryggs\xe4ck"},{id:"Tr\xe4ningsv\xe4ska",text:"Tr\xe4ningsv\xe4ska"},{id:"Resv\xe4ska",text:"Resv\xe4ska"},{id:"Datorv\xe4ska",text:"Datorv\xe4ska"},{id:"V\xe4ska",text:"Annat (V\xe4ska)"}]},{text:"Accessoarer",children:[{id:"Solglas\xf6gon",text:"Solglas\xf6gon"},{id:"Glas\xf6gon",text:"Glas\xf6gon"},{id:"\xd6rh\xe4nge",text:"\xd6rh\xe4nge"},{id:"Halsband",text:"Halsband"},{id:"Armband",text:"Armband"},{id:"Ring",text:"Ring"},{id:"Brosch",text:"Brosch"},{id:"Keps",text:"Keps"},{id:"Sjal",text:"Sjal"},{id:"Krage",text:"Krage"},{id:"B\xe4lte",text:"B\xe4lte"},{id:"Pl\xe5nbok",text:"Pl\xe5nbok"},{id:"Halsduk",text:"Halsduk"},{id:"Hatt",text:"Hatt"},{id:"M\xf6ssa",text:"M\xf6ssa"},{id:"Vantar",text:"Vantar"},{id:"Necess\xe4r",text:"Necess\xe4r"},{id:"Slips",text:"Slips"},{id:"Handduk",text:"Handduk"},{id:"Klocka",text:"Klocka"}]}]}),$("body").on("click",".select2-container--open .select2-results__group",function(){$(this).parent().attr("class").match(/expanded-group/)?$(this).parent().removeClass("expanded-group"):($(".expanded-group").first().removeClass("expanded-group"),$(this).parent().addClass("expanded-group"))});let n=!1;$("#itemCategory").on("select2:select",()=>{analytics.track("Click",{elementID:"itemCategoryValue"}),document.querySelector("#itemCategory").dispatchEvent(new Event("change"))});let r=!1;$("#itemCategory").on("select2:open",()=>{r||(r=!0,$("input.select2-search__field").on("click",()=>{analytics.track("Click",{elementID:"itemCategorySearch"})}))}),$("#itemCategory").on("select2:close",()=>{document.querySelector("body").style.overflow="auto",document.querySelector("body").style.position="static",document.querySelector("html").style.overflow="static"}),$("#itemCategory").on("select2:open",function(){analytics.track("Element Viewed",{elementID:"itemCategoryContainer"}),document.querySelector("body").style.overflow="hidden",document.querySelector("body").style.position="fixed",document.querySelector("html").style.overflow="fixed";let e=document.querySelector(".select2-search__field");if(e.placeholder="S\xf6k... (t.ex. Kl\xe4nning/Sneakers/Blus)",$(".select2-search__field").on("input",e=>{e.target.value.length>0?$(".select2-results__option[role=group]").each((e,t)=>$(t).addClass("expanded-group")):$(".expanded-group").each((e,t)=>$(t).removeClass("expanded-group"))}),!n){let e=document.getElementById("categoryPopUpHeader"),t=document.querySelector(".select2-dropdown");t.insertBefore(e,t.firstChild),e.style.display="block",e.querySelector("#categorySelectClose").onclick=()=>$("#itemCategory").select2("close"),n=!0}document.querySelector(".select2-results__options").addEventListener("scroll",()=>document.activeElement.blur())}),$("#itemCategory").on("change",e=>{B("itemCategoryLabel")(e);let n=document.getElementById("itemCategory"),r=document.getElementById("itemBrand");t(r.value,n.value)}),// From https://github.com/select2/select2/issues/3015#issuecomment-570171720
$("#itemCategory").on("select2:open",function(){$(".select2-results").css("visibility","hidden")}),$("#itemCategory").on("select2:opening",function(){setTimeout(function(){$(".select2-results").css("visibility","visible")},50)})}function B(e){return t=>{document.getElementById(e).style.display=t.target.value.length>0?"inline-block":"none"}}r.defineInteropFlag(n),r.export(n,"uploadTempImage",()=>o),r.export(n,"requestUniqueId",()=>c),r.export(n,"enhanceFrontImage",()=>m),r.export(n,"showDeleteImageIcon",()=>g),r.export(n,"rememberNewItemImageField",()=>x),r.export(n,"showImagePreview",()=>p),r.export(n,"capitalizeFirstLetter",()=>y),r.export(n,"uploadImageAndShowPreview",()=>f),r.export(n,"showImageError",()=>h),r.export(n,"hideImageError",()=>k),r.export(n,"showImageState",()=>v),r.export(n,"showLoadingIcon",()=>b),r.export(n,"checkBlockedOrLowShareSoldBrand",()=>I),r.export(n,"initializeCategorySelect",()=>w),r.export(n,"fieldLabelToggle",()=>B),r.export(n,"colorName",()=>E),r.export(n,"swedishColorToEnglish",()=>j);let S={Beige:"Beige",Blue:"Bl\xe5",Brown:"Brun",Green:"Gr\xf6n",Grey:"Gr\xe5",Yellow:"Gul",Gold:"Guld",Purple:"Lila",Navy:"Navy",Orange:"Orange",Pink:"Rosa",Red:"R\xf6d",Silver:"Silver",Black:"Svart",Turquoise:"Turkos",Burgundy:"Vinr\xf6d",White:"Vit",Multicolour:"Flerf\xe4rgad"};function E(e){return S[e]||e}function j(e){return Object.entries(S).find(([t,n])=>n.toLowerCase()===e.toLowerCase())?.[0]||e}},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||t.hasOwnProperty(n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["YhYNY"],"YhYNY","parcelRequire81ca")//# sourceMappingURL=itemConfirmation.js.map
;
//# sourceMappingURL=itemConfirmation.js.map
