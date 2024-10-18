!function(e,t,n,r,o){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof i[r]&&i[r],l=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!l[t]){if(!e[t]){var o="function"==typeof i[r]&&i[r];if(!n&&o)return o(t,!0);if(a)return a(t,!0);if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},m.cache={};var u=l[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return l[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=a,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return i[r]}}),i[r]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){var u=d(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):o&&(this[o]=u)}}({YhYNY:[function(e,t,n){var r=e("./sellItemHelpers");let o=async e=>{let t=await callBackendApi(`/api/items/${e}`);return{...t?.data||{},id:e}};(async()=>{let e=getParamsObject(),t=e.id?await o(e.id):JSON.parse(localStorage.getItem("latestItemCreated"));t||(console.error("Invalid item id param or no recently created item"),location.href="/private"),function(e){var t;let n,{humanCheckNeeded:o,maxPriceEstimate:i,newMinMaxLog:a}=e.mlValuation||{};e.infoRequests?.price?.response==="User proposal"?(document.getElementById("nextStepTitle").style.display="block",document.getElementById("nextStepTitle").innerText="Granskar prisändringar",document.getElementById("nextStepText").innerText="Vi kikar på dina prisändringar, och om det ser bra ut så påbörjar vi försäljningen. Vi tar sedan hand om säljprocessen och hör av oss på SMS när plagget är sålt."):(o||!i&&!e.infoRequests?.price?.maxPrice||a)&&(document.getElementById("nextStepTitle").style.display="block",document.getElementById("nextStepText").innerText=`Ditt ${e.cleanedBrand||e.brand}-plagg beh\xf6ver v\xe4rderas manuellt, d\xe5 AI-v\xe4rderingen har l\xe4gre tr\xe4ffs\xe4kerhet p\xe5 detta varum\xe4rke. Du kommer f\xe5 ett SMS n\xe4r vi v\xe4rderat plagget som du kan ta st\xe4llning till.`),document.getElementById("itemTitle").innerText=(e.cleanedBrand||e.brand).trim()+"-"+e.category.toLowerCase(),document.getElementById("itemPrice").innerText=!e.maxPriceEstimate||o||a?"":`${e.maxPriceEstimate||i} SEK`,document.getElementById("itemPrice").style.display="block",document.getElementById("itemSubtitle").innerText=e.model?`${e.model}, ${(0,r.colorName)(e.color)}`:(0,r.colorName)(e.color),document.getElementById("itemSize").innerText=e.size,document.getElementById("itemMaterial").innerText=e.material,document.getElementById("itemCondition").innerText=e.condition=(n="",((n="Använd, tecken på slitage"===(t=e).condition&&(t.defects.length||t.defectDescription)?t.defectDescription?t.defectDescription:t.defects&&t.defects.length>0?"Anmärkning: "+t.defects.filter(e=>"Annat"!==e).join(", "):t.condition:t.condition)+".").replace("..",".")),e.originalPrice&&(itemOriginalPrice.innerText=e.originalPrice+" SEK",originalPriceDiv.style.display="flex"),e.userComment&&(document.getElementById("itemComment").innerText=e.userComment,document.getElementById("itemCommentDiv").style.display="block"),e?.platformsToBePublishedOn?.length?function(e){if(e?.platformsToBePublishedOn?.length<2){document.getElementById("platformsSection").style.display="none";return}let t=document.getElementById("platformTradera");e.platformsToBePublishedOn.forEach(e=>{if(e.match(/Tradera/))return;let n=t.cloneNode(!0);n.id=e,n.innerText=e,t.parentNode.appendChild(n)}),document.getElementById("platformsLoadingDiv").style.display="none",document.getElementById("platformsDiv").style.display="block"}(e):document.getElementById("platformsSection").style.display="none"}(t),triggerShowContent.click()})()},{"./sellItemHelpers":"2G59s"}],"2G59s":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");async function o(e,t){sessionStorage.getItem("newItemId")||sessionStorage.setItem("newItemId",await a());let n=sessionStorage.getItem("newItemId"),r=await i(e);if(!r)throw"Fel vid bearbetning av vald bild.";let o=new FormData;o.append("itemId",n),o.append("fileName",t),o.append("file",r),o.append("temporary","true"),o.append("generateSmallImage","true");let l=await fetch(`${BACKEND_API_URL}/api/items/${n}/uploadImage`,{method:"POST",body:o});return await l.json()}async function i(e){return e.size<5242880?Promise.resolve(e):new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=document.createElement("img");e.onload=()=>{let n=e.width,r=e.height;n>r?n>1512&&(r=1512/n*r,n=1512):r>2016&&(n=2016/r*n,r=2016);let o=document.createElement("canvas");o.width=n,o.height=r;let i=o.getContext("2d");i.imageSmoothingQuality="high",i.drawImage(e,0,0,n,r),o.toBlob(t,"image/jpeg")},e.src=r.result,r.onerror=n},r.readAsDataURL(e)})}async function a(){try{return(await callBackendApi("/api/id",{method:"POST",requiresAuth:!1})).data.id}catch(e){return console.error(`Failed to fetch unique ID, generating uuidv4 id: ${e.message}`,e),uuidv4()}}async function l(e,t=!0){let n=await s(e);return n?.url&&(t&&c("enhancedFrontImage",n.url,n.urlSmall),u("frontImage",window.innerWidth<=370?n.urlSmall:n.url)),d("frontImage"),n}async function s(e){try{let t=await callBackendApi("/api/images/enhance",{data:{imageUrl:e},requiresAuth:!1,timeoutSec:30});return sessionStorage.setItem("enhancedFrontImage",t.data.url),t.data}catch(e){return errorHandler.report(e),console.error(e),""}}function d(e){document.getElementById(`loading${m(e)}Icon`).style.display="none",document.getElementById(`delete${m(e)}Icon`).style.display="inline-block","frontImage"===e&&(document.getElementById("enhancedAnimationDiv").style.display="none")}function c(e,t,n){let r=JSON.parse(localStorage.getItem("newItem")||JSON.stringify({})),o=r.images||{};o[e]=t,o[`${e}Small`]=n,r.images=o,localStorage.setItem("newItem",JSON.stringify(r))}function u(e,t){document.getElementById(`${e}Preview`).style.backgroundImage=`url('${t}')`,d(e)}function m(e){return e.charAt(0).toUpperCase()+e.slice(1)}async function g(e,t,n=!0){try{document.getElementById(t).parentNode.parentNode.querySelector(".w-file-upload-error").style.display="none";let r=URL.createObjectURL(e);document.getElementById(`${t}PreviewUploading`).style.backgroundImage=`url('${r}')`,document.getElementById(`${t}Preview`).style.backgroundImage=`url('${r}')`,x(t),y(t,"success-state");let{url:i,urlSmall:a}=await o(e,t);return n&&c(t,i,a),i}catch(n){console.error("Failed to upload image",n),errorHandler.report(n),document.getElementById(`${t}PreviewUploading`).style.backgroundImage="",document.getElementById(`${t}Preview`).style.backgroundImage="",document.getElementById(`loading${m(t)}Icon`).style.display="none",y(t,"default-state"),e.size>10485760?p(t,"Error: Bilden är för stor. Max 10 MB."):p(t,"Error: Något gick fel vid uppladdning, försök igen eller kontakt oss om felet kvarstår."),document.getElementById(t).value=""}}function p(e,t){let n=document.getElementById(e).parentNode.parentNode;n.querySelector(".w-file-upload-error").style.display="block",n.querySelector(".w-file-upload-error-msg").innerText=t}function y(e,t){let n=document.getElementById(e).parentNode.parentNode.childNodes;for(let e=0;e<n.length;e++)n[e].className.includes(t)?n[e].style.display="block":n[e].style.display="none"}function x(e){if("frontImage"===e){document.getElementById(`delete${m(e)}Icon`).style.display="none",document.getElementById(`loading${m(e)}Icon`).style.display="none",localStorage.getItem("sessionUser")||(document.getElementById("photoroomDiv").style.display="flex"),document.getElementById("enhancedAnimationDiv").style.display="block",triggerEnhancingAnimation.click();return}document.getElementById(`loading${m(e)}Icon`).style.display="inline-block",document.getElementById(`delete${m(e)}Icon`).style.display="none"}function f(e,t){let n=["shein","lager 157","divided","brandy melville","cubus","bubbleroom","bondelid","nelly","dobber","åhléns","kappahl","primark","jack & jones","sisters point","missguided","topman","bik bok","cubus","happy holly","zign","glamorous","hollister","river island","light before dark","bohoo","crocker","forever 21","maze","mint&berry","chiara forthi","zalando","din sko","pull & bear","svea","zoul","boohoo","gap","topshop","ellos","lager 157","stradivarius","studio total","indiska","bershka","shein","riley","vero moda","vila","don donna","aldo","new look denim"],r=document.getElementById("hardToSellDiv");return(document.getElementById("itemBrand").setCustomValidity(""),!getParamsObject().id&&(n.includes(e.toLowerCase())||!["boots","dunjacka","jacka","kängor","kappa","kavaj","kostym","pälsjacka","regnjacka","rock","skinnjacka","vinterskor"].includes(t?.toLowerCase())&&["tom tailor","monki","dressmann","urban outfitters","asos","holly & white","only","gina tricot"].includes(e.toLowerCase())||["baddräkt","bikini","bodysuit","chinos","flip-flops","halsduk","handduk","hatt","jeans","keps","långärmad t-shirt","linne","mjukisbyxor","morgonrock","mössa","necessär","piké","pyjamas","sandaler","sarong","shorts","slips","sport-bh","strumpbyxor","t-shirt","tights","topp","träningsbyxor","träningströja","underställ","vantar"].includes(t?.toLowerCase())&&["karl kani","rieker","uniqlo","carin wester","stockh lm","weekday","mango","wera","ichi","lindex","h&m","zara","mng","mq","cheap monday","h&m premium","na-kd","clarks","gant","hackett","hugo boss","la chemise","lacoste","lyle & scott","marc o'polo","melvin & hamilton","ray-ban","reebok","sebago","stenströms","the shirt factory","hampton republic","quicksilver","banana republic","pieces","sprit","denim","east west","xit","jacqueline de yong","mexx","fb sister","okänt","bodyflirt","dorothy perkins","fransa","laurel","rut&circle","soc","junkyard","soyaconcept","amisu","u.s. polo assn.","line of oslo","gossip","i say","jascha stockholm","noisy may","six ames","velour by nostalgi","house of lola","fiveunits","miss me","flash","champion","under armour","oasis","fornarina","isolde","rosebud","chiquelle","kaffe","mckinley","cream","abercrombie & fitch","modström","ecco","esprit","alice bizous","craft","ellesse","wesc","dry lake","röhnisch","acqua limone","anna field","le","ax paris","burton","hansen & jacob","lou in love","mad lady","selected homme","tenson","whistles","zizzi","gerry weber"].includes(e.toLowerCase())))?(hardToSellText.innerHTML=n.includes(e.toLowerCase())?`Vi s\xe4ljer tyv\xe4rr inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`:`Vi s\xe4ljer tyv\xe4rr inte kategorin ${t} fr\xe5n ${e} p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`,stopIcon.style.display="flex",warningIcon.style.display="none",r.style.display="block",document.getElementById("itemBrand").setCustomValidity(n.includes(e.toLowerCase())?`Vi s\xe4ljer inte plagg fr\xe5n ${e}`:`Vi s\xe4ljer inte kategorin '${t}' fr\xe5n ${e}`),!0):["H&M","HM","Zara","ASOS","Nelly","Gina Tricot","BikBok","Bik Bok","Lindex","Kappahl","Cubus","NA-KD","NAKD","Mango","Ellos","Primark","Shein","Vila","Forever 21","Pull & Bear","Bershka","Stradivarius"].some(t=>e.toLowerCase().includes(t.toLowerCase()))?(hardToSellText.innerHTML=`Vi s\xe4ljer i regel inte ${e}-plagg p\xe5 grund av f\xf6r l\xe5gt andrahandsv\xe4rde. Undantag kan finnas.`,stopIcon.style.display="none",warningIcon.style.display="block",r.style.display="block",!0):void(r.style.display="none")}function k(e="Kategori",t=f){$("#itemCategory").select2({selectionCssClass:"form-field",placeholder:e||"Kategori",data:[{id:"",text:""},{text:"Överdelar",children:[{id:"Tröja",text:"Tröja"},{id:"Blus",text:"Blus"},{id:"Topp",text:"Topp"},{id:"Skjorta",text:"Skjorta"},{id:"Linneskjorta",text:"Linneskjorta"},{id:"T-shirt",text:"T-shirt"},{id:"Kavaj",text:"Kavaj"},{id:"Sweatshirt",text:"Sweatshirt"},{id:"Hoodie",text:"Hoodie"},{id:"Polotröja",text:"Polotröja"},{id:"Tunika",text:"Tunika"},{id:"Väst",text:"Väst"},{id:"Kofta",text:"Kofta"},{id:"Linne",text:"Linne"},{id:"Träningströja",text:"Träningströja"},{id:"Poncho",text:"Poncho"},{id:"Piké",text:"Piké"},{id:"Långärmad T-shirt",text:"Långärmad T-shirt"},{id:"Kostymväst",text:"Kostymväst"}]},{text:"Underdelar",children:[{id:"Kjol",text:"Kjol"},{id:"Byxor",text:"Byxor"},{id:"Jeans",text:"Jeans"},{id:"Chinos",text:"Chinos"},{id:"Fritidsbyxor",text:"Fritidsbyxor"},{id:"Träningsbyxor",text:"Träningsbyxor"},{id:"Tights",text:"Tights"},{id:"Strumpbyxor",text:"Strumpbyxor"},{id:"Mjukisbyxor",text:"Mjukisbyxor"},{id:"Kostymbyxor",text:"Kostymbyxor"},{id:"Shorts",text:"Shorts"},{id:"Sarong",text:"Sarong"}]},{text:"Helkropp",children:[{id:"Klänning",text:"Klänning"},{id:"Kaftan",text:"Kaftan"},{id:"Kostym",text:"Kostym"},{id:"Set",text:"Set"},{id:"Jumpsuit",text:"Jumpsuit"},{id:"Baddräkt",text:"Baddräkt"},{id:"Bikini",text:"Bikini"},{id:"Pyjamas",text:"Pyjamas"},{id:"Morgonrock",text:"Morgonrock"},{id:"Bröllopsklänning",text:"Bröllopsklänning"},{id:"Balklänning",text:"Balklänning"},{id:"Bodysuit",text:"Bodysuit"},{id:"Underställ",text:"Underställ"}]},{text:"Ytterkläder",children:[{id:"Jacka",text:"Jacka"},{id:"Kappa",text:"Kappa"},{id:"Rock",text:"Rock"},{id:"Fritidsjacka",text:"Fritidsjacka"},{id:"Trenchcoat",text:"Trenchcoat"},{id:"Skinnjacka",text:"Skinnjacka"},{id:"Dunjacka",text:"Dunjacka"},{id:"Regnjacka",text:"Regnjacka"},{id:"Pälsjacka",text:"Pälsjacka"}]},{text:"Skor",children:[{id:"Sneakers",text:"Sneakers"},{id:"Sandaler",text:"Sandaler"},{id:"Klackar",text:"Klackar"},{id:"Ballerinaskor",text:"Ballerinaskor"},{id:"Loafers",text:"Loafers"},{id:"Flip-flops",text:"Flip-flops"},{id:"Boots",text:"Boots"},{id:"Kängor",text:"Kängor"},{id:"Vinterskor",text:"Vinterskor"},{id:"Skor",text:"Annat (Skor)"}]},{text:"Väskor",children:[{id:"Axelremsväska",text:"Axelremsväska"},{id:"Handväska",text:"Handväska"},{id:"Kuvertväska",text:"Kuvertväska"},{id:"Ryggsäck",text:"Ryggsäck"},{id:"Träningsväska",text:"Träningsväska"},{id:"Resväska",text:"Resväska"},{id:"Datorväska",text:"Datorväska"},{id:"Väska",text:"Annat (Väska)"}]},{text:"Accessoarer",children:[{id:"Solglasögon",text:"Solglasögon"},{id:"Glasögon",text:"Glasögon"},{id:"Örhänge",text:"Örhänge"},{id:"Halsband",text:"Halsband"},{id:"Armband",text:"Armband"},{id:"Ring",text:"Ring"},{id:"Brosch",text:"Brosch"},{id:"Keps",text:"Keps"},{id:"Sjal",text:"Sjal"},{id:"Krage",text:"Krage"},{id:"Bälte",text:"Bälte"},{id:"Plånbok",text:"Plånbok"},{id:"Halsduk",text:"Halsduk"},{id:"Hatt",text:"Hatt"},{id:"Mössa",text:"Mössa"},{id:"Vantar",text:"Vantar"},{id:"Necessär",text:"Necessär"},{id:"Slips",text:"Slips"},{id:"Handduk",text:"Handduk"},{id:"Klocka",text:"Klocka"}]}]}),$("body").on("click",".select2-container--open .select2-results__group",function(){$(this).parent().attr("class").match(/expanded-group/)?$(this).parent().removeClass("expanded-group"):($(".expanded-group").first().removeClass("expanded-group"),$(this).parent().addClass("expanded-group"))});let n=!1;$("#itemCategory").on("select2:select",()=>{analytics.track("Click",{elementID:"itemCategoryValue"}),document.querySelector("#itemCategory").dispatchEvent(new Event("change"))});let r=!1;$("#itemCategory").on("select2:open",()=>{r||(r=!0,$("input.select2-search__field").on("click",()=>{analytics.track("Click",{elementID:"itemCategorySearch"})}))}),$("#itemCategory").on("select2:close",()=>{document.querySelector("body").style.overflow="auto",document.querySelector("body").style.position="static",document.querySelector("html").style.overflow="static"}),$("#itemCategory").on("select2:open",function(){if(analytics.track("Element Viewed",{elementID:"itemCategoryContainer"}),document.querySelector("body").style.overflow="hidden",document.querySelector("body").style.position="fixed",document.querySelector("html").style.overflow="fixed",document.querySelector(".select2-search__field").placeholder="Sök... (t.ex. Klänning/Sneakers/Blus)",$(".select2-search__field").on("input",e=>{e.target.value.length>0?$(".select2-results__option[role=group]").each((e,t)=>$(t).addClass("expanded-group")):$(".expanded-group").each((e,t)=>$(t).removeClass("expanded-group"))}),!n){let e=document.getElementById("categoryPopUpHeader"),t=document.querySelector(".select2-dropdown");t.insertBefore(e,t.firstChild),e.style.display="block",e.querySelector("#categorySelectClose").onclick=()=>$("#itemCategory").select2("close"),n=!0}document.querySelector(".select2-results__options").addEventListener("scroll",()=>document.activeElement.blur())}),$("#itemCategory").on("change",e=>{h("itemCategoryLabel")(e);let n=document.getElementById("itemCategory");t(document.getElementById("itemBrand").value,n.value)}),$("#itemCategory").on("select2:open",function(){$(".select2-results").css("visibility","hidden")}),$("#itemCategory").on("select2:opening",function(){setTimeout(function(){$(".select2-results").css("visibility","visible")},50)})}function h(e){return t=>{document.getElementById(e).style.display=t.target.value.length>0?"inline-block":"none"}}function b(e){return({Beige:"Beige",Blue:"Blå",Brown:"Brun",Green:"Grön",Grey:"Grå",Yellow:"Gul",Gold:"Guld",Purple:"Lila",Navy:"Navy",Orange:"Orange",Pink:"Rosa",Red:"Röd",Silver:"Silver",Black:"Svart",Turquoise:"Turkos",Burgundy:"Vinröd",White:"Vit",Multicolour:"Flerfärgad"})[e]||e}r.defineInteropFlag(n),r.export(n,"uploadTempImage",()=>o),r.export(n,"requestUniqueId",()=>a),r.export(n,"enhanceFrontImage",()=>l),r.export(n,"showDeleteImageIcon",()=>d),r.export(n,"rememberNewItemImageField",()=>c),r.export(n,"showImagePreview",()=>u),r.export(n,"capitalizeFirstLetter",()=>m),r.export(n,"uploadImageAndShowPreview",()=>g),r.export(n,"showImageState",()=>y),r.export(n,"showLoadingIcon",()=>x),r.export(n,"checkBlockedOrLowShareSoldBrand",()=>f),r.export(n,"initializeCategorySelect",()=>k),r.export(n,"fieldLabelToggle",()=>h),r.export(n,"colorName",()=>b)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||Object.prototype.hasOwnProperty.call(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}]},["YhYNY"],"YhYNY","parcelRequire81ca");
//# sourceMappingURL=itemConfirmation.js.map
