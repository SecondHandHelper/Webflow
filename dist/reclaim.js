!function(e,t,n,r,i,a,o){var l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof l[r]&&l[r],d=s.i||{},c=s.cache||{},u="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function m(t,n){if(!c[t]){if(!e[t]){var i="function"==typeof l[r]&&l[r];if(!n&&i)return i(t,!0);if(s)return s(t,!0);if(u&&"string"==typeof t)return u(t);var a=Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}d.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},d.cache={};var o=c[t]=new m.Module(t);e[t][0].call(o.exports,d,o,o.exports,l)}return c[t].exports;function d(e){var t=d.resolve(e);return!1===t?{}:m(t)}}m.isParcelRequire=!0,m.Module=function(e){this.id=e,this.bundle=m,this.require=u,this.exports={}},m.modules=e,m.cache=c,m.parent=s,m.distDir=void 0,m.publicUrl=void 0,m.devServer=void 0,m.i=d,m.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(m,"root",{get:function(){return l[r]}}),l[r]=m;for(var g=0;g<t.length;g++)m(t[g]);if(n){var y=m(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=y:"function"==typeof define&&define.amd&&define(function(){return y})}}({"7h7Hl":[function(e,t,n,r){var i=e("./sellItemHelpers");function a(){resellButton.style.display="none",reclaimButton.style.display="none",cancelButton.style.display="none",doneButton.style.display="none",toMaiButton.style.display="none"}function o(){var e=[...document.querySelectorAll("input").values()];let t=[];return console.log("elementsArr",e),e.forEach(e=>{e.id.includes("Image")&&e.files[0]&&t.push(e.files[0])}),t}async function l(){return document.getElementById("reclaimFormInner").reportValidity(),new Promise((e,t)=>{let n=document.getElementById("reclaimReason");return n.value?n.value.includes("Defects")||n.value.includes("False")||n.value.includes("Dirty")?(imagesTitle.innerText="Bilder på felet (obligatoriskt)",e(!!o().length||(document.getElementById("reclaimImage1").setCustomValidity(`Ladda upp minst en bild p\xe5 felet`),document.getElementById("reclaimFormInner").reportValidity(),!1))):e(!0):(n.setCustomValidity(`V\xe4lj anledning till reklamationen`),document.getElementById("reclaimFormInner").reportValidity(),e(!1))})}async function s(e){if(!await l())return!1;let t=new Date,n=reclaimReason.value,r=reclaimListingError.value||"";if(reclaimListingError.required&&!r)return!1;let i=reclaimDescription.value||"",a="",o=document.getElementsByName("compensationPreference");for(var s=0;s<o.length;s++)o[s].checked&&(a=o[s].value);if(!a)return!1;let c=a.includes("10 percent discount")?parseInt(discount10PercentText.innerText.match(/\d+/g)):null,u={createdAt:t,status:"Pending",reason:n,description:i,listingError:r,compensationPreference:a,...c?{refundAmount:c}:{}};return document.getElementById("doneButtonSpinner").style.display="block",document.getElementById("doneButtonText").style.display="none",console.log("Will update: ",{itemId:e,reclaim:u}),u.images=await d(e),await callBackendApi(`/api/items/${e}/reclaim`,{data:{reclaim:u},requiresAuth:!1}),!0}async function d(e){let t=o();return await Promise.all(t.map(async(t,n)=>(await (0,i.uploadTempImage)(t,`reclaim_${e}_${n}`)).url))}let c=async e=>{let t=await callBackendApi(`/api/items/${e}`);return{...t?.data||{},id:e}};(async()=>{let e=getParamsObject(),t=e.id?await c(e.id):"";t||(console.error("Invalid item id param"),location.href="/"),function(e){let t=(e.cleanedBrand||e.brand).trim()+"-"+e.category.toLowerCase();document.getElementById("itemTitle").innerText=t,document.getElementById("itemTitleBanner").innerText=t;let n=new Date(e.soldDate).toLocaleDateString("sv-SE",{day:"numeric",month:"long",year:"numeric"}),r=`K\xf6ptes ${n}${e.soldPlatform&&"Other"!==e.soldPlatform?` via ${e.soldPlatform}`:""}`;document.getElementById("itemSubtitle").innerText=r,document.getElementById("itemSubtitleBanner").innerText=r;let i=window.innerWidth<=400?e?.images?.modelImage||e?.images?.enhancedFrontImageSmall||e?.images?.enhancedFrontImage||e?.images?.frontImageSmall||e?.images?.frontImage:e?.images?.modelImage||e?.images?.enhancedFrontImage||e?.images?.frontImage;document.getElementById("itemImage").src=i,document.getElementById("itemImageBanner").src=i,document.getElementById("resellButton").href=`./sell-item?id=${e.id}`;let o=Math.round(.1*e.soldPrice);o=o<60?60:o>250?250:o,discount10PercentText.innerText=`Beh\xe5lla plagget och f\xe5 ${o} kr \xe5terbetalt`;let l=e.buyer.Email||e.buyer.PhoneNumber;thankYouText.innerText=`Vi tittar p\xe5 \xe4rendet och skickar svar ${l.includes("@")?`till din email ${l}`:`p\xe5 SMS till ditt telefonnummer ${l}`}`,e?.returnQrCode?(a(),toMaiButton.style.display="flex",introDiv.style.display="none",thankYouDiv.style.display="none",itemBanner.style.display="block",qrCodeImage.style.backgroundImage=`url('${e.returnQrCode}')`,postnordQrCodeLink.href=e.returnQrCodePage,postnordQrCodeDiv.style.display="flex",shippingText.innerText=`N\xe4r det skickats s\xe5 \xe5terbetalar vi dig och skickar bekr\xe4ftelse till din email ${l}`):e?.reclaim?.status&&(a(),toMaiButton.style.display="flex",introDiv.style.display="none",thankYouDiv.style.display="block",itemBanner.style.display="block")}(t),document.getElementById("reclaimButton").addEventListener("click",function(){itemBanner.style.display="block",document.getElementById("reclaimForm").style.display="block",cancelButton.style.display="flex",doneButton.style.display="flex",resellButton.style.display="none",reclaimButton.style.display="none",document.getElementById("introDiv").style.display="none"}),reclaimReason.onchange=function(){let e=this.value;if(""===e){reasonLabel.style.display="none",this.style.color="#929292";return}reasonLabel.style.display="block",this.style.color="#101010",document.querySelectorAll(".simple-input-container").forEach(function(e){e.id.includes("Reason")||(e.style.display="none")}),reclaimImagesContainer.style.display="none",reclaimDescription.required=!0,reclaimListingError.required=!1,e.includes("Defects")?(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block",imagesTitle.innerText="Bilder på felet (obligatoriskt)"):e.includes("Listing")?(reclaimListingErrorContainer.style.display="block",reclaimDescription.required=!1,reclaimListingError.required=!0):e.includes("False")||e.includes("Dirty")?(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block",imagesTitle.innerText="Bilder på felet (obligatoriskt)"):e.includes("Smelly")?reclaimDescriptionContainer.style.display="block":(reclaimDescriptionContainer.style.display="block",reclaimImagesContainer.style.display="block"),compensationPreferenceDiv.style.display="block"},reclaimListingError.onchange=function(){let e=this.value;if(""===e){listingErrorLabel.style.display="none",this.style.color="#929292";return}listingErrorLabel.style.display="block",this.style.color="#101010","Other"===e&&(reclaimDescriptionContainer.style.display="block",reclaimDescription.required=!0)},document.getElementById("doneButton").addEventListener("click",async function(){let e=getParamsObject();await s(e.id)&&(console.log("RECLAIM SAVED"),reclaimForm.style.display="none",a(),toMaiButton.style.display="flex",thankYouDiv.style.display="block")}),["reclaimImage1","reclaimImage2","reclaimImage3","reclaimImage4"].forEach(function(e){let t=document.getElementById(e),n=document.getElementById(`${e}PreviewUploading`),r=document.getElementById(`${e}Preview`);t.addEventListener("change",function(){let t=this.files[0];if(t){let a=URL.createObjectURL(t);n.style.backgroundImage=`url('${a}')`,r.style.backgroundImage=`url('${a}')`,document.getElementById(`loading${(0,i.capitalizeFirstLetter)(e)}Icon`).style.display="none",document.getElementById(e).required=!1}})}),document.querySelectorAll("input, select, textarea").forEach(e=>{e.addEventListener("input",e=>{e.setCustomValidity("")}),"select"===e.tagName.toLowerCase()&&e.addEventListener("change",()=>{e.setCustomValidity("")})}),triggerShowContent.click()})()},{"./sellItemHelpers":"2G59s"}],"2G59s":[function(e,t,n,r){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");async function a(e,t,n=null){try{return await o(e,t,n)}catch(r){if("ImageResizeError"!==r.name)return console.error("Failed to upload image",r),errorHandler.report(r),await o(e,t,n);throw console.error("Failed to resize image",r),errorHandler.report(r),r}}async function o(e,t,n=null){let r;n||sessionStorage.getItem("newItemId")||sessionStorage.setItem("newItemId",await u());let i=n||sessionStorage.getItem("newItemId");try{r=await l(e),console.log(`Scaled image size: ${(r.size/1024/1024).toFixed(2)} MB`)}catch(t){let e=Error("Failed to resize image");throw e.name="ImageResizeError",e.originalError=t,e}if(!r)throw Error("Fel vid bearbetning av vald bild.");let a=new FormData;a.append("itemId",i),a.append("fileName",t),a.append("file",r),a.append("temporary",!n),a.append("generateSmallImage","true");let s=await fetch(`${BACKEND_API_URL}/api/items/${i}/uploadImage`,{method:"POST",body:a});if(!s.ok)throw Error(`HTTP error! status: ${s.status}`);return await s.json()}async function l(e){if(e.size<5242880)return Promise.resolve(e);if("createImageBitmap"in window)try{return console.log("Attempting to scale image with createImageBitmap"),await s(e,3024,4032)}catch(e){console.warn("createImageBitmap scaling method failed",e)}if("OffscreenCanvas"in window)try{return console.log("Attempting to scale image with OffscreenCanvas"),await d(e,3024,4032)}catch(e){console.warn("OffscreenCanvas scaling method failed",e)}try{return console.log("Attempting to scale image with original method"),await c(e,3024,4032)}catch(e){throw console.error("All scaling methods failed",e),Error("Unable to process image")}}async function s(e,t,n){try{let r=await createImageBitmap(e),i=new OffscreenCanvas(t,n),a=i.getContext("2d"),{width:o,height:l}=r;return o>l?o>t&&(l*=t/o,o=t):l>n&&(o*=n/l,l=n),i.width=o,i.height=l,a.drawImage(r,0,0,o,l),await i.convertToBlob({type:"image/jpeg",quality:.9})}catch(e){throw console.error("Image scaling failed",e),Error("Unable to process image")}}async function d(e,t,n){let r=await createImageBitmap(e),i=r.width,a=r.height;i>a?i>t&&(a=t/i*a,i=t):a>n&&(i=n/a*i,a=n);let o=new OffscreenCanvas(i,a);return o.getContext("2d").drawImage(r,0,0,i,a),o.convertToBlob({type:"image/jpeg",quality:.9})}async function c(e,t,n){return new Promise((r,i)=>{let a=new Image;a.onload=()=>{let e=document.createElement("canvas"),i=a.width,o=a.height;i>o?i>t&&(o*=t/i,i=t):o>n&&(i*=n/o,o=n),e.width=i,e.height=o,e.getContext("2d").drawImage(a,0,0,i,o),e.toBlob(e=>{console.log(`Fallback resize: ${(e.size/1024/1024).toFixed(2)} MB`),r(e)},"image/jpeg",.9)},a.onerror=i,a.src=URL.createObjectURL(e)})}async function u(){try{return(await callBackendApi("/api/id",{method:"POST",requiresAuth:!1})).data.id}catch(e){return console.error(`Failed to fetch unique ID, generating uuidv4 id: ${e.message}`,e),uuidv4()}}async function m(e,t=!0){let n=await g(e);return n?.url&&(t&&p("enhancedFrontImage",n.url,n.urlSmall),f("frontImage",window.innerWidth<=370?n.urlSmall:n.url)),y("frontImage"),n}async function g(e){try{let t=await callBackendApi("/api/images/enhance",{data:{imageUrl:e},requiresAuth:!1,timeoutSec:30});return sessionStorage.setItem("enhancedFrontImage",t.data.url),t.data}catch(e){return errorHandler.report(e),console.error(e),""}}function y(e){document.getElementById(`loading${x(e)}Icon`).style.display="none",document.getElementById(`delete${x(e)}Icon`).style.display="inline-block","frontImage"===e&&(document.getElementById("enhancedAnimationDiv").style.display="none")}function p(e,t,n){let r=JSON.parse(localStorage.getItem("newItem")||JSON.stringify({})),i=r.images||{};i[e]=t,i[`${e}Small`]=n,r.images=i,localStorage.setItem("newItem",JSON.stringify(r))}function f(e,t){document.getElementById(`${e}Preview`).style.backgroundImage=`url('${t}')`,y(e)}function x(e){return e.charAt(0).toUpperCase()+e.slice(1)}async function h(e,t,n=!0){try{b(t);let r=URL.createObjectURL(e);document.getElementById(`${t}PreviewUploading`).style.backgroundImage=`url('${r}')`,document.getElementById(`${t}Preview`).style.backgroundImage=`url('${r}')`,v(t),I(t,"success-state");let{url:i,urlSmall:o}=await a(e,t);return n&&p(t,i,o),i}catch(n){console.error("Failed to upload image",n),errorHandler.report(n),document.getElementById(`${t}PreviewUploading`).style.backgroundImage="",document.getElementById(`${t}Preview`).style.backgroundImage="",document.getElementById(`loading${x(t)}Icon`).style.display="none",I(t,"default-state"),e.size>0xa00000?k(t,"Error: Bilden är för stor. Max 10 MB."):k(t,"Error: Något gick fel vid uppladdning, försök igen eller kontakt oss om felet kvarstår."),document.getElementById(t).value=""}}function k(e,t){let n=document.getElementById(e).parentNode.parentNode;n.querySelector(".w-file-upload-error").style.display="block",n.querySelector(".w-file-upload-error-msg").innerText=t}function b(e){document.getElementById(e).parentNode.parentNode.querySelector(".w-file-upload-error").style.display="none"}function I(e,t){let n=document.getElementById(e).parentNode.parentNode.childNodes;for(let e=0;e<n.length;e++)n[e].className.includes(t)?n[e].style.display="block":n[e].style.display="none"}function v(e){if("frontImage"===e){document.getElementById(`delete${x(e)}Icon`).style.display="none",document.getElementById(`loading${x(e)}Icon`).style.display="none",localStorage.getItem("sessionUser")||(document.getElementById("photoroomDiv").style.display="flex"),document.getElementById("enhancedAnimationDiv").style.display="block",triggerEnhancingAnimation.click();return}document.getElementById(`loading${x(e)}Icon`).style.display="inline-block",document.getElementById(`delete${x(e)}Icon`).style.display="none"}function B(e,t){let n=["shein","lager 157","divided","brandy melville","cubus","bubbleroom","bondelid","nelly","dobber","åhléns","kappahl","primark","jack & jones","sisters point","missguided","topman","bik bok","cubus","happy holly","zign","glamorous","hollister","river island","light before dark","bohoo","crocker","forever 21","maze","mint&berry","chiara forthi","zalando","din sko","pull & bear","svea","zoul","boohoo","gap","topshop","ellos","lager 157","stradivarius","studio total","indiska","bershka","shein","riley","vero moda","vila","don donna","aldo","new look denim"],r=document.getElementById("hardToSellDiv");return(document.getElementById("itemBrand").setCustomValidity(""),!getParamsObject().id&&(n.includes(e.toLowerCase())||!["boots","dunjacka","jacka","kängor","kappa","kavaj","kostym","pälsjacka","regnjacka","rock","skinnjacka","vinterskor"].includes(t?.toLowerCase())&&["tom tailor","monki","dressmann","urban outfitters","asos","holly & white","only","gina tricot"].includes(e.toLowerCase())||["baddräkt","bikini","bodysuit","chinos","flip-flops","halsduk","handduk","hatt","jeans","keps","långärmad t-shirt","linne","mjukisbyxor","morgonrock","mössa","necessär","piké","pyjamas","sandaler","sarong","shorts","slips","sport-bh","strumpbyxor","t-shirt","tights","topp","träningsbyxor","träningströja","underställ","vantar"].includes(t?.toLowerCase())&&["karl kani","rieker","uniqlo","carin wester","stockh lm","weekday","mango","wera","ichi","lindex","h&m","zara","mng","mq","cheap monday","h&m premium","na-kd","clarks","gant","hackett","hugo boss","la chemise","lacoste","lyle & scott","marc o'polo","melvin & hamilton","ray-ban","reebok","sebago","stenströms","the shirt factory","hampton republic","quicksilver","banana republic","pieces","sprit","denim","east west","xit","jacqueline de yong","mexx","fb sister","okänt","bodyflirt","dorothy perkins","fransa","laurel","rut&circle","soc","junkyard","soyaconcept","amisu","u.s. polo assn.","line of oslo","gossip","i say","jascha stockholm","noisy may","six ames","velour by nostalgi","house of lola","fiveunits","miss me","flash","champion","under armour","oasis","fornarina","isolde","rosebud","chiquelle","kaffe","mckinley","cream","abercrombie & fitch","modström","ecco","esprit","alice bizous","craft","ellesse","wesc","dry lake","röhnisch","acqua limone","anna field","le","ax paris","burton","hansen & jacob","lou in love","mad lady","selected homme","tenson","whistles","zizzi","gerry weber"].includes(e.toLowerCase())))?(hardToSellText.innerHTML=n.includes(e.toLowerCase())?`Vi s\xe4ljer tyv\xe4rr inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`:`Vi s\xe4ljer tyv\xe4rr inte kategorin ${t} fr\xe5n ${e} p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`,stopIcon.style.display="flex",warningIcon.style.display="none",r.style.display="block",document.getElementById("itemBrand").setCustomValidity(n.includes(e.toLowerCase())?`Vi s\xe4ljer inte plagg fr\xe5n ${e}`:`Vi s\xe4ljer inte kategorin '${t}' fr\xe5n ${e}`),!0):["H&M","HM","Zara","ASOS","Nelly","Gina Tricot","BikBok","Bik Bok","Lindex","Kappahl","Cubus","NA-KD","NAKD","Mango","Ellos","Primark","Shein","Vila","Forever 21","Pull & Bear","Bershka","Stradivarius"].some(t=>e.toLowerCase().includes(t.toLowerCase()))?(hardToSellText.innerHTML=`Vi s\xe4ljer i regel inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5gt andrahandsv\xe4rde. Undantag kan finnas.`,stopIcon.style.display="none",warningIcon.style.display="block",r.style.display="block",!0):void(r.style.display="none")}function w(e="Kategori",t=B){$("#itemCategory").select2({selectionCssClass:"form-field",placeholder:e||"Kategori",data:[{id:"",text:""},{text:"Överdelar",children:[{id:"Tröja",text:"Tröja"},{id:"Blus",text:"Blus"},{id:"Topp",text:"Topp"},{id:"Skjorta",text:"Skjorta"},{id:"Linneskjorta",text:"Linneskjorta"},{id:"T-shirt",text:"T-shirt"},{id:"Kavaj",text:"Kavaj"},{id:"Sweatshirt",text:"Sweatshirt"},{id:"Hoodie",text:"Hoodie"},{id:"Polotröja",text:"Polotröja"},{id:"Tunika",text:"Tunika"},{id:"Väst",text:"Väst"},{id:"Kofta",text:"Kofta"},{id:"Linne",text:"Linne"},{id:"Träningströja",text:"Träningströja"},{id:"Poncho",text:"Poncho"},{id:"Piké",text:"Piké"},{id:"Långärmad T-shirt",text:"Långärmad T-shirt"},{id:"Kostymväst",text:"Kostymväst"}]},{text:"Underdelar",children:[{id:"Kjol",text:"Kjol"},{id:"Byxor",text:"Byxor"},{id:"Jeans",text:"Jeans"},{id:"Chinos",text:"Chinos"},{id:"Fritidsbyxor",text:"Fritidsbyxor"},{id:"Träningsbyxor",text:"Träningsbyxor"},{id:"Tights",text:"Tights"},{id:"Strumpbyxor",text:"Strumpbyxor"},{id:"Mjukisbyxor",text:"Mjukisbyxor"},{id:"Kostymbyxor",text:"Kostymbyxor"},{id:"Shorts",text:"Shorts"},{id:"Sarong",text:"Sarong"}]},{text:"Helkropp",children:[{id:"Klänning",text:"Klänning"},{id:"Kaftan",text:"Kaftan"},{id:"Kostym",text:"Kostym"},{id:"Set",text:"Set"},{id:"Jumpsuit",text:"Jumpsuit"},{id:"Baddräkt",text:"Baddräkt"},{id:"Bikini",text:"Bikini"},{id:"Pyjamas",text:"Pyjamas"},{id:"Morgonrock",text:"Morgonrock"},{id:"Bröllopsklänning",text:"Bröllopsklänning"},{id:"Balklänning",text:"Balklänning"},{id:"Bodysuit",text:"Bodysuit"},{id:"Underställ",text:"Underställ"}]},{text:"Ytterkläder",children:[{id:"Jacka",text:"Jacka"},{id:"Kappa",text:"Kappa"},{id:"Rock",text:"Rock"},{id:"Fritidsjacka",text:"Fritidsjacka"},{id:"Trenchcoat",text:"Trenchcoat"},{id:"Skinnjacka",text:"Skinnjacka"},{id:"Dunjacka",text:"Dunjacka"},{id:"Regnjacka",text:"Regnjacka"},{id:"Pälsjacka",text:"Pälsjacka"}]},{text:"Skor",children:[{id:"Sneakers",text:"Sneakers"},{id:"Sandaler",text:"Sandaler"},{id:"Klackar",text:"Klackar"},{id:"Ballerinaskor",text:"Ballerinaskor"},{id:"Loafers",text:"Loafers"},{id:"Flip-flops",text:"Flip-flops"},{id:"Regnstövlar",text:"Regnstövlar"},{id:"Boots",text:"Boots"},{id:"Kängor",text:"Kängor"},{id:"Vinterskor",text:"Vinterskor"},{id:"Skor",text:"Annat (Skor)"}]},{text:"Väskor",children:[{id:"Axelremsväska",text:"Axelremsväska"},{id:"Handväska",text:"Handväska"},{id:"Kuvertväska",text:"Kuvertväska"},{id:"Ryggsäck",text:"Ryggsäck"},{id:"Träningsväska",text:"Träningsväska"},{id:"Resväska",text:"Resväska"},{id:"Datorväska",text:"Datorväska"},{id:"Väska",text:"Annat (Väska)"}]},{text:"Accessoarer",children:[{id:"Solglasögon",text:"Solglasögon"},{id:"Glasögon",text:"Glasögon"},{id:"Örhänge",text:"Örhänge"},{id:"Halsband",text:"Halsband"},{id:"Armband",text:"Armband"},{id:"Ring",text:"Ring"},{id:"Brosch",text:"Brosch"},{id:"Keps",text:"Keps"},{id:"Sjal",text:"Sjal"},{id:"Krage",text:"Krage"},{id:"Bälte",text:"Bälte"},{id:"Plånbok",text:"Plånbok"},{id:"Halsduk",text:"Halsduk"},{id:"Hatt",text:"Hatt"},{id:"Mössa",text:"Mössa"},{id:"Vantar",text:"Vantar"},{id:"Necessär",text:"Necessär"},{id:"Slips",text:"Slips"},{id:"Handduk",text:"Handduk"},{id:"Klocka",text:"Klocka"}]}]}),$("body").on("click",".select2-container--open .select2-results__group",function(){$(this).parent().attr("class").match(/expanded-group/)?$(this).parent().removeClass("expanded-group"):($(".expanded-group").first().removeClass("expanded-group"),$(this).parent().addClass("expanded-group"))});let n=!1;$("#itemCategory").on("select2:select",()=>{analytics.track("Click",{elementID:"itemCategoryValue"}),document.querySelector("#itemCategory").dispatchEvent(new Event("change"))});let r=!1;$("#itemCategory").on("select2:open",()=>{r||(r=!0,$("input.select2-search__field").on("click",()=>{analytics.track("Click",{elementID:"itemCategorySearch"})}))}),$("#itemCategory").on("select2:close",()=>{document.querySelector("body").style.overflow="auto",document.querySelector("body").style.position="static",document.querySelector("html").style.overflow="static"}),$("#itemCategory").on("select2:open",function(){if(analytics.track("Element Viewed",{elementID:"itemCategoryContainer"}),document.querySelector("body").style.overflow="hidden",document.querySelector("body").style.position="fixed",document.querySelector("html").style.overflow="fixed",document.querySelector(".select2-search__field").placeholder="Sök... (t.ex. Klänning/Sneakers/Blus)",$(".select2-search__field").on("input",e=>{e.target.value.length>0?$(".select2-results__option[role=group]").each((e,t)=>$(t).addClass("expanded-group")):$(".expanded-group").each((e,t)=>$(t).removeClass("expanded-group"))}),!n){let e=document.getElementById("categoryPopUpHeader"),t=document.querySelector(".select2-dropdown");t.insertBefore(e,t.firstChild),e.style.display="block",e.querySelector("#categorySelectClose").onclick=()=>$("#itemCategory").select2("close"),n=!0}document.querySelector(".select2-results__options").addEventListener("scroll",()=>document.activeElement.blur())}),$("#itemCategory").on("change",e=>{E("itemCategoryLabel")(e);let n=document.getElementById("itemCategory");t(document.getElementById("itemBrand").value,n.value)}),$("#itemCategory").on("select2:open",function(){$(".select2-results").css("visibility","hidden")}),$("#itemCategory").on("select2:opening",function(){setTimeout(function(){$(".select2-results").css("visibility","visible")},50)})}function E(e){return t=>{document.getElementById(e).style.display=t.target.value.length>0?"inline-block":"none"}}i.defineInteropFlag(n),i.export(n,"uploadTempImage",()=>a),i.export(n,"requestUniqueId",()=>u),i.export(n,"enhanceFrontImage",()=>m),i.export(n,"showDeleteImageIcon",()=>y),i.export(n,"rememberNewItemImageField",()=>p),i.export(n,"showImagePreview",()=>f),i.export(n,"capitalizeFirstLetter",()=>x),i.export(n,"uploadImageAndShowPreview",()=>h),i.export(n,"showImageError",()=>k),i.export(n,"hideImageError",()=>b),i.export(n,"showImageState",()=>I),i.export(n,"showLoadingIcon",()=>v),i.export(n,"checkBlockedOrLowShareSoldBrand",()=>B),i.export(n,"initializeCategorySelect",()=>w),i.export(n,"fieldLabelToggle",()=>E),i.export(n,"colorMapping",()=>S),i.export(n,"colorName",()=>C),i.export(n,"swedishColorToEnglish",()=>j);let S={Beige:"Beige",Blue:"Blå",Brown:"Brun",Green:"Grön",Grey:"Grå",Yellow:"Gul",Gold:"Guld",Purple:"Lila",Navy:"Navy",Orange:"Orange",Pink:"Rosa",Red:"Röd",Silver:"Silver",Black:"Svart",Turquoise:"Turkos",Burgundy:"Vinröd",White:"Vit",Multicolour:"Flerfärgad"};function C(e){return S[e]||e}function j(e){return Object.entries(S).find(([t,n])=>n.toLowerCase()===e.toLowerCase())?.[0]||e}},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n,r){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["7h7Hl"],"7h7Hl","parcelRequire81ca");
//# sourceMappingURL=reclaim.js.map
