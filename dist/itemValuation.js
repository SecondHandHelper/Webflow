!function(e,t,n,i,a){var l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r="function"==typeof l[i]&&l[i],o=r.cache||{},d="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(t,n){if(!o[t]){if(!e[t]){var a="function"==typeof l[i]&&l[i];if(!n&&a)return a(t,!0);if(r)return r(t,!0);if(d&&"string"==typeof t)return d(t);var m=Error("Cannot find module '"+t+"'");throw m.code="MODULE_NOT_FOUND",m}u.resolve=function(n){var i=e[t][1][n];return null!=i?i:n},u.cache={};var c=o[t]=new s.Module(t);e[t][0].call(c.exports,u,c,c.exports,this)}return o[t].exports;function u(e){var t=u.resolve(e);return!1===t?{}:s(t)}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=o,s.parent=r,s.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(s,"root",{get:function(){return l[i]}}),l[i]=s;for(var m=0;m<t.length;m++)s(t[m]);if(n){var c=s(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):a&&(this[a]=c)}}({eIGyM:[function(e,t,n){async function i(e){document.getElementById("valuationHeading").style.display="none",document.getElementById("valuationMotivation").style.display="none",document.getElementById("valuationText").innerText="Säljer ej",document.getElementById("valuationText").style.display="block",document.getElementById("rejectButton").style.display="none",document.getElementById("confirmButton").style.display="none",document.getElementById("okejButton").style.display="flex",document.getElementById("newItemButton").style.display="flex",document.getElementById("declineExplanation").style.display="block",document.getElementById("valuationRange").style.display="none",document.getElementById("adjustIntervalButton").style.display="none",document.getElementById("valuationExplanation").style.display="none",document.getElementById("valuationExplanationHeader").style.display="none",document.getElementById("chatDiv").style.display="block",document.getElementById("newItemButton").addEventListener("click",()=>{sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId"),sessionStorage.removeItem("itemValuation"),window.location.href="/sell-item"}),document.getElementById("okejButton").addEventListener("click",()=>{sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId"),sessionStorage.removeItem("itemValuation"),window.location.href="/private"}),e.id&&await callBackendApi(`/api/valuation/${e.id}/reject`,{data:{userDecline:!1}})}window.itemValuationJsLoaded=!0;let a=(e,t)=>{let n=document.getElementById("minPrice").value,i=document.getElementById("maxPrice").value;return!o(e,t,Number(n),Number(i))},l=(e,t)=>!!(e<500)&&!!(t>1.5*e)||!!(e>=500)&&!!(e<1e3)&&!!(t>1.4*e)||!!(e>=1e3)&&!!(t>1.3*e),r=(e,t,n)=>l(e,n)||n>x(e,t),o=(e,t,n,i)=>r(e,t,n)||l(t,i),d=(e,t)=>l(e,t)?"Ovanligt högt startpris":null,s=(e,t)=>l(e,t)?"Ovanligt högt lägsta pris":null,m=(e,t)=>e>t?"Lägsta priset överstiger vår värdering":null,c=(e,t,n,i)=>[d(t,i),s(e,n),m(n,x(e,t))].filter(e=>e).join("<br>"),u=(e,t,n,i)=>{let a=Number(n.value),d=Number(i.value);if(i.style.color=l(t,d)?"#E20000":"#333",n.style.color=r(e,t,a)?"#E20000":"#333",o(e,t,a,d))"block"!==document.getElementById("requiresReviewDiv").style.display&&(document.getElementById("requiresReviewDiv").style.display="block",analytics.track("Element Viewed",{elementID:"requiresReviewDiv"})),document.getElementById("adjustmentWarningText").innerHTML=c(e,t,a,d),document.getElementById("noteDiv").style.display="none",document.getElementById("sendForReviewButton").style.display="flex",document.getElementById("confirmButton").style.display="none",document.getElementById("rejectButton").style.display="none";else if(d!==t||a!==e){document.getElementById("confirmButton").style.display="flex",document.getElementById("sendForReviewButton").style.display="none","visible"!==document.getElementById("resetButton").style.visibility&&(document.getElementById("resetButton").style.visibility="visible",analytics.track("Element Viewed",{elementID:"resetButton"})),document.getElementById("requiresReviewDiv").style.display="none";let n=document.getElementById("noteText").innerText,i="";d>t&&(i+="Ett höjt startpris kan innebära att det tar längre tid för plagget att säljas."),a>e&&(i+=`${i?" ":""}Ett h\xf6jt l\xe4gsta pris minskar sannolikheten att det blir s\xe5lt.`),i||(i="Bra att du kan tänka dig sänka priset! Det ökar sannolikheten att det blir sålt."),document.getElementById("noteHeading").innerHTML="Notera!",document.getElementById("noteText").innerText=i,document.getElementById("noteDiv").style.display="block",i!==n&&document.getElementById("noteDiv").click(),document.getElementById("confirmButton").innerText="Påbörja försäljning",document.getElementById("rejectButton").style.display="flex"}else document.getElementById("resetButton").style.visibility="hidden",document.getElementById("noteHeading").innerHTML="Tips!",document.getElementById("noteText").innerText="Sänkta priser ger en säkrare och snabbare försäljning. Höjda priser kan ge mer pengar, men riskerar också att det blir osålt eller tar längre tid.",document.getElementById("noteDiv").style.display="block",document.getElementById("requiresReviewDiv").style.display="none",document.getElementById("confirmButton").style.display="flex",document.getElementById("sendForReviewButton").style.display="none",document.getElementById("rejectButton").style.display="flex"};function y(){let e=document.getElementById("minPrice"),t=document.getElementById("maxPrice"),n=Number(e.value),i=Number(t.value);return n<100?e.setCustomValidity("Vi försöker tyvärr aldrig sälja något under 100kr"):n>i?(t.setCustomValidity("Startpris måste vara högre än lägsta pris"),e.setCustomValidity("Lägsta pris måste vara mindre än startpris")):(e.setCustomValidity(""),t.setCustomValidity("")),document.getElementById("wf-form-Valuation-form").reportValidity()}async function g(e,t,n){if(!y())return;let i=Number(document.getElementById("minPrice").value),l=Number(document.getElementById("maxPrice").value);if(sessionStorage.getItem("itemToBeCreatedAfterSignIn")){let e=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"));return e.item.infoRequests.price.status="Resolved",e.item.infoRequests.price.response="Accepted",i!==t||l!==n?(e.item.infoRequests.price.userAdjustedMin=i,e.item.infoRequests.price.userAdjustedMax=l,a(t,n)?(e.item.minPriceEstimate=i,e.item.newMinPriceEstimate=i,e.item.maxPriceEstimate=l,e.item.newMaxPriceEstimate=l):(e.item.infoRequests.price.response="User proposal",e.item.infoRequests.price.userProposalMotivation=document.getElementById("userProposalMotivation").value)):(e.item.minPriceEstimate=t,e.item.maxPriceEstimate=n),sessionStorage.setItem("itemToBeCreatedAfterSignIn",JSON.stringify(e)),window.location.href="/sign-in"}{await callBackendApi(`/api/valuation/${e}`,{method:"PUT",data:{itemId:e,minPrice:t,maxPrice:n,adjustmentMin:i,adjustmentMax:l,userProposalMotivation:document.getElementById("userProposalMotivation").value,adjustmentRequiresReview:!a(t,n)}});let r=getParamsObject();if(localStorage.getItem("latestItemCreated")&&!r.id){let e=JSON.parse(localStorage.getItem("latestItemCreated"));e.infoRequests.price.response=a(t,n)?"Accepted":"User proposal",a(t,n)&&(e.minPriceEstimate=i,e.maxPriceEstimate=l),localStorage.setItem("latestItemCreated",JSON.stringify(e))}if(document.referrer.includes("/private"))return window.location.href="/private";{let e=user.current?.phoneNumber?.length;return window.location.href=e?"/item-confirmation":"/user-contact"}}}let v=e=>{document.getElementById("itemImage").src=window.innerWidth<=400?e?.images?.enhancedFrontImageSmall||e?.images?.enhancedFrontImage||e?.images?.modelImage||e?.images?.frontImageSmall||e?.images?.frontImage:e?.images?.enhancedFrontImage||e?.images?.modelImage||e?.images?.frontImage;let{minPriceEstimate:t,newMinPriceEstimate:n,newMaxPriceEstimate:i,maxPriceEstimate:a}=e.mlValuation||{},l=e.infoRequests?.price?.minPrice||n||t,r=e.infoRequests?.price?.maxPrice||i||a;document.getElementById("chatLink").onclick=()=>Intercom("showNewMessage",e.mlValuation?.decline?`ID: ${e.id}

G\xe4llande att ni tackat nej till ${e.brand.trim()}-${e.category.toLowerCase()}:

`:`ID: ${e.id}

G\xe4llande prisintervallet p\xe5 ${l}-${r} kr f\xf6r ${e.brand.trim()}-${e.category.toLowerCase()}. Vad skulle du vilja \xe4ndra det till och varf\xf6r?

`),document.getElementById("valuationClose").addEventListener("click",()=>(sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),getParamsObject().id||(localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId")),window.location.href="/private"))},p=async e=>(e.id&&await callBackendApi(`/api/valuation/${e.id}/reject`,{data:{userDecline:!0}}),sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),getParamsObject().id||(localStorage.removeItem("newItem"),localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("newItemId")),window.location.href="/private"),I=()=>{for(let e of document.getElementsByClassName("tooltip-motivation"))e.classList.remove("tooltip-show")},f=e=>e<200?20:e<500?50:100,E=(e,t)=>{let n=Number(e.value),i=f(t),a=Math.floor(n/i)*i;e.value=Math.max(0,a===n?n-i:a),e.dispatchEvent(new Event("input"))},B=(e,t)=>{let n=Number(e.value),i=f(t),a=Math.ceil(n/i)*i;e.value=a===n?n+i:a,e.dispatchEvent(new Event("input"))},x=(e,t)=>10*Math.round((e+t)/20),k=async e=>{let{minPriceEstimate:t,newMinPriceEstimate:n,newMaxPriceEstimate:a,maxPriceEstimate:l,decline:r}=e.mlValuation||{},o=getParamsObject();if(o.version||e?.mlValuation?.modelVersion,!o.id&&r){await i(e),document.getElementById("valuationResultDiv").style.display="flex";return}let d=e.infoRequests?.price?.minPrice||n||t,s=e.infoRequests?.price?.maxPrice||a||l;document.getElementById("valuationText").innerText=`${x(d,s)} kr`,document.getElementById("valuationResultDiv").style.display="flex",document.body.addEventListener("click",I),document.getElementById("valuationRange").style.display="flex",document.getElementById("minPrice").value=d,document.getElementById("minPrice").disabled=!0,document.getElementById("maxPrice").value=s,document.getElementById("maxPrice").disabled=!0,e.infoRequests?.price?.type?(document.getElementById("valuationExplanation").innerText=e.infoRequests.price.description,e.infoRequests?.price?.type==="Final Offer"&&(document.getElementById("valuationExplanationHeader").innerText="Motivering",document.getElementById("valuationExplanationHeader").style.display="block")):document.getElementById("valuationExplanation").innerText=h(e),document.getElementById("valuationText").style.display="block",sessionStorage.getItem("itemToBeCreatedAfterSignIn")&&(document.getElementById("chatDiv").style.display="none"),await b(e),S(e),document.getElementById("confirmButton").addEventListener("click",()=>g(e.id,d,s)),document.getElementById("sendForReviewButton").addEventListener("click",()=>g(e.id,d,s)),document.getElementById("rejectButton").addEventListener("click",()=>p(e))},h=e=>{if(!e||!e.mlValuation)return"Värderingen baseras på plagg från liknande varumärken som vi värderat tidigare. För att öka sannolikheten att få det sålt kan du justera ner lägsta priset.";let{mlValuation:{valuatedBrandItems:t,brandMeanMax:n,brandAccuracy:i,brandCategoryAccuracy:a,fewBrand:l,brandMeanSold:r,brandCategoryMeanSold:o,newMinMaxLog:d,brandShareSold:s,lowValueSegment:m},cleanedBrand:c,brand:u}=e,y=c||u,g=i>.8&&r>0?`Plagg fr\xe5n ${y} har i genomsnitt s\xe5lts f\xf6r ${r} kr baserat p\xe5 ${Math.round(t*s)} s\xe5lda plagg. `:a>.7&&o>0?`Snittpriset f\xf6r s\xe5lda plagg f\xf6r varum\xe4rket i denna kategori \xe4r ${o} kr. `:"",v=d.match(/accept price is above max/i)?"Plagget har värderat till under ditt lägsta accepterade pris. ":"",p=s<.5&&!m?`Notera att efterfr\xe5gan p\xe5 ${y} p\xe5 andrahandsmarknaden \xe4r l\xe4gre \xe4n snittet, s\xe5 vill du \xf6ka sannolikheten att f\xe5 det s\xe5lt kan du s\xe4nka det l\xe4gsta priset.`:"",I="Ibland träffar den dock inte rätt, så känn dig fri att justera priset om du tycker värderingen verkar konstig.";return l||0===t?`${v}V\xe4rderingen \xe4r mer os\xe4ker d\xe5 vi har s\xe5lt relativt lite av detta varum\xe4rke. Efterfr\xe5gan p\xe5 mer ok\xe4nda och sm\xe5 varum\xe4rken \xe4r ofta l\xe4gre. F\xf6r att \xf6ka sannolikheten att f\xe5 det s\xe5lt kan du justera ner l\xe4gsta priset`:i>=.8&&!l?`${v}${g}AI-v\xe4rderingen tar h\xe4nsyn till material, modell, skick och originalpris och brukar ha h\xf6g tr\xe4ffs\xe4kerhet f\xf6r detta varum\xe4rke. ${p||I}`:i<.8&&a>=.7&&!l?`${v}${g}AI-v\xe4rderingen tar h\xe4nsyn till material, modell, skick och originalpris och brukar ha h\xf6g tr\xe4ffs\xe4kerhet f\xf6r denna kategori och varum\xe4rke. ${p||I}`:n<=400?`${v}V\xe4rderingen baseras p\xe5 ${t} plagg fr\xe5n ${y} som vi tidigare v\xe4rderat. ${[p,g].join(" ")}`:`${v}V\xe4rderingen baseras p\xe5 plagg fr\xe5n liknande varum\xe4rken som vi v\xe4rderat tidigare. F\xf6r att \xf6ka sannolikheten att f\xe5 det s\xe5lt kan du justera ner l\xe4gsta priset.`},b=async e=>{let{minPriceEstimate:t,newMinPriceEstimate:n,newMaxPriceEstimate:i,maxPriceEstimate:a}=e.mlValuation||{},l=e.infoRequests?.price?.minPrice||n||t,r=e.infoRequests?.price?.maxPrice||i||a;document.getElementById("adjustIntervalButton").style.display="flex",analytics.track("Element Viewed",{elementID:"adjustIntervalButton"}),document.getElementById("chatDiv").style.display="none",document.getElementById("adjustIntervalButton").addEventListener("click",()=>{document.getElementById("valuationExplanation").style.display="none",document.getElementById("valuationExplanationHeader").style.display="none",document.getElementById("minPrice").disabled=!1,document.getElementById("maxPrice").disabled=!1,document.getElementById("adjustIntervalButton").style.display="none",document.getElementById("noteDiv").style.display="block",document.getElementById("origMinPrice").style.display="block",document.getElementById("origMaxPrice").style.display="block",document.getElementById("sliderDiv").style.display="block",document.querySelectorAll(".field-underline").forEach(e=>e.style.visibility="visible")}),e.infoRequests?.price?.type==="Final Offer"&&(document.getElementById("adjustIntervalButton").style.display="none",document.getElementById("chatDiv").style.display="none"),function(e,t,n){let i=document.getElementById("adjustmentSlider");i.addEventListener("touchend",()=>{i.value=Math.round(Number(i.value)),analytics.track("Click",{elementID:"adjustmentSlider"}),y()}),i.addEventListener("mouseup",()=>{i.value=Math.round(Number(i.value)),analytics.track("Click",{elementID:"adjustmentSlider"}),y()}),i.addEventListener("input",function(){let a=document.getElementById("minPrice"),l=document.getElementById("maxPrice");switch(Math.round(Number(i.value))){case 0:a.value=Math.max(100,10*Math.round(.5*e/10)),l.value=Math.max(100,10*Math.round(.5*t/10));break;case 1:a.value=Math.max(100,10*Math.round(.66*e/10)),l.value=Math.max(100,10*Math.round(.66*t/10));break;case 2:a.value=Math.max(100,10*Math.round(.83*e/10)),l.value=Math.max(100,10*Math.round(.83*t/10));break;case 3:a.value=e,l.value=t;break;case 4:a.value=10*Math.round((e+.33*M(e,t,n.mlValuation))/10),l.value=10*Math.round((t+.33*P(t,n.mlValuation))/10);break;case 5:a.value=10*Math.round((e+.67*M(e,t,n.mlValuation))/10),l.value=10*Math.round((t+.67*P(t,n.mlValuation))/10);break;case 6:a.value=10*Math.floor((e+M(e,t,n.mlValuation))/10),l.value=10*Math.floor((t+P(t,n.mlValuation))/10)}a.dispatchEvent(new Event("input")),l.dispatchEvent(new Event("input"))})}(l,r,e),document.getElementById("valuationMotivation").addEventListener("click",e=>{let t=document.getElementsByClassName("tooltip-motivation"),n=t[0]?.classList.contains("tooltip-show");for(let e of t)n?e.classList.remove("tooltip-show"):e.classList.add("tooltip-show");e.stopPropagation()}),document.getElementById("origMinPrice").innerText=l,document.getElementById("origMinPrice").style.visibility="hidden",document.getElementById("origMaxPrice").innerText=r,document.getElementById("origMaxPrice").style.visibility="hidden",document.getElementById("resetButton").addEventListener("click",()=>{document.getElementById("minPrice").value=l,document.getElementById("maxPrice").value=r,document.getElementById("minPrice").dispatchEvent(new Event("input")),document.getElementById("maxPrice").dispatchEvent(new Event("input")),document.getElementById("adjustmentSlider").value=3,document.getElementById("resetButton").style.visibility="hidden",y()}),document.getElementById("minPrice").addEventListener("blur",()=>y()),document.getElementById("minPrice").addEventListener("input",()=>{let e=document.getElementById("minPrice"),t=document.getElementById("maxPrice");Number(e.value)!==l?document.getElementById("origMinPrice").style.visibility="visible":document.getElementById("origMinPrice").style.visibility="hidden",u(l,r,e,t)}),document.getElementById("minIncrease").addEventListener("click",()=>{B(document.getElementById("minPrice"),l),analytics.track("Click",{elementID:"minIncrease"}),y()}),document.getElementById("minDecrease").addEventListener("click",()=>{E(document.getElementById("minPrice"),l),analytics.track("Click",{elementID:"minDecrease"}),y()}),document.getElementById("maxPrice").addEventListener("blur",()=>y()),document.getElementById("maxPrice").addEventListener("input",()=>{let e=document.getElementById("maxPrice"),t=document.getElementById("minPrice");Number(e.value)!==r?document.getElementById("origMaxPrice").style.visibility="visible":document.getElementById("origMaxPrice").style.visibility="hidden",u(l,r,t,e)}),document.getElementById("maxIncrease").addEventListener("click",()=>{B(document.getElementById("maxPrice"),r),analytics.track("Click",{elementID:"maxIncrease"}),y()}),document.getElementById("maxDecrease").addEventListener("click",()=>{E(document.getElementById("maxPrice"),r),analytics.track("Click",{elementID:"maxDecrease"}),y()}),(e.infoRequests?.price?.type==="Final Offer"||e.infoRequests?.price?.type==="Valuation")&&(document.getElementById("valuationMotivation").style.display="none")},w=async e=>{let t=await callBackendApi(`/api/items/${e}`);return{...t?.data||{},id:e}},P=(e,t)=>{let{fewBrand:n,newBrand:i,brandAccuracy:a,brandCategoryAccuracy:l,highPriceVarBrandCategory:r}=t,o=n||i||r||a<.8||l<.7?.1:0;return e<=400?e*(.3+o):e<=800?e*(.25+o):e*(.2+o)},M=(e,t,n)=>Math.min(P(e,n),x(e,t)-e);function S(e){let t=e.infoRequests?.price?.minPrice;if(!(e.infoRequests?.price?.sellToMaiOffer&&t))return;let n=Math.round(.7*t);document.getElementById("sellToMaiDiv").style.display="flex",document.getElementById("openSellToMaiBtnText").innerText=`S\xe4lj nu f\xf6r ${n} kr`,document.getElementById("sellNowPrice").innerText=`${n} kr`,document.getElementById("popupButtonText").innerText=`Ja, s\xe4lj till Mai f\xf6r ${n} kr`,document.getElementById("openSellToMaiPopupBtn").addEventListener("click",()=>{document.getElementById("sellToMaiPopup").style.display="flex"}),document.getElementById("sellToMaiButton").addEventListener("click",()=>{console.log("Sell item to Mai: ",e.id)}),document.getElementById("closeSellToMaiPopup").addEventListener("click",()=>{document.getElementById("sellToMaiPopup").style.display="none"});let i=e.images?.enhancedFrontImageSmall||e.images?.enhancedFrontImage||e.images?.frontImage;i&&(document.getElementById("popUpImage").src=i)}(async()=>{window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var n=document,i=function(){i.c(arguments)};i.q=[],i.c=function(e){i.q.push(e)},e.Intercom=i;var a=function(){var e=n.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=n.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}}(),Intercom("update",{hide_default_launcher:!0});let e=getParamsObject(),t=e.id?await w(e.id):JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn")||"{}")?.item||JSON.parse(localStorage.getItem("latestItemCreated")||"{}");if(!t)return console.error("Invalid item id or no saved item to show valuation for"),location.href="/private";v(t),await k(t),S(t),triggerShowContent.click()})()},{}]},["eIGyM"],"eIGyM","parcelRequire81ca");
//# sourceMappingURL=itemValuation.js.map
