!function(e,t,n,a,i){var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof r[a]&&r[a],o=l.cache||{},d="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(t,n){if(!o[t]){if(!e[t]){var i="function"==typeof r[a]&&r[a];if(!n&&i)return i(t,!0);if(l)return l(t,!0);if(d&&"string"==typeof t)return d(t);var m=Error("Cannot find module '"+t+"'");throw m.code="MODULE_NOT_FOUND",m}c.resolve=function(n){var a=e[t][1][n];return null!=a?a:n},c.cache={};var u=o[t]=new s.Module(t);e[t][0].call(u.exports,c,u,u.exports,this)}return o[t].exports;function c(e){var t=c.resolve(e);return!1===t?{}:s(t)}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=o,s.parent=l,s.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(s,"root",{get:function(){return r[a]}}),r[a]=s;for(var m=0;m<t.length;m++)s(t[m]);if(n){var u=s(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):i&&(this[i]=u)}}({eIGyM:[function(e,t,n){async function a(e){document.getElementById("valuationHeading").style.display="none",document.getElementById("valuationMotivation").style.display="none",document.getElementById("valuationText").innerText="Säljer ej",document.getElementById("valuationText").style.display="block",document.getElementById("rejectButton").style.display="none",document.getElementById("confirmButton").style.display="none",document.getElementById("okejButton").style.display="flex",document.getElementById("newItemButton").style.display="flex",document.getElementById("declineExplanation").style.display="block",document.getElementById("valuationRange").style.display="none",document.getElementById("adjustIntervalButton").style.display="none",document.getElementById("valuationExplanation").style.display="none",document.getElementById("valuationExplanationHeader").style.display="none",document.getElementById("chatDiv").style.display="block",document.getElementById("newItemButton").addEventListener("click",()=>{sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId"),sessionStorage.removeItem("itemValuation"),window.location.href="/sell-item"}),document.getElementById("okejButton").addEventListener("click",()=>{sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId"),sessionStorage.removeItem("itemValuation"),window.location.href="/private"}),e.id&&await firebase.app().functions("europe-west1").httpsCallable("markItemRejected")({itemId:e.id,userDecline:!1})}window.itemValuationJsLoaded=!0;let i=(e,t)=>{let n=document.getElementById("minPrice").value,a=document.getElementById("maxPrice").value;return!o(e,t,Number(n),Number(a))},r=(e,t)=>!!(e<500)&&!!(t>1.5*e)||!!(e>=500)&&!!(e<1e3)&&!!(t>1.4*e)||!!(e>=1e3)&&!!(t>1.3*e),l=(e,t,n)=>r(e,n)||n>x(e,t),o=(e,t,n,a)=>l(e,t,n)||r(t,a),d=(e,t)=>r(e,t)?"Ovanligt högt startpris":null,s=(e,t)=>r(e,t)?"Ovanligt högt lägsta pris":null,m=(e,t)=>e>t?"Lägsta priset överstiger vår värdering":null,u=(e,t,n,a)=>[d(t,a),s(e,n),m(n,x(e,t))].filter(e=>e).join("<br>"),c=(e,t,n,a)=>{let i=Number(n.value),d=Number(a.value);if(a.style.color=r(t,d)?"#E20000":"#333",n.style.color=l(e,t,i)?"#E20000":"#333",o(e,t,i,d))"block"!==document.getElementById("requiresReviewDiv").style.display&&(document.getElementById("requiresReviewDiv").style.display="block",analytics.track("Element Viewed",{elementID:"requiresReviewDiv"})),document.getElementById("adjustmentWarningText").innerHTML=u(e,t,i,d),document.getElementById("noteDiv").style.display="none",document.getElementById("sendForReviewButton").style.display="flex",document.getElementById("confirmButton").style.display="none",document.getElementById("rejectButton").style.display="none";else if(d!==t||i!==e){document.getElementById("confirmButton").style.display="flex",document.getElementById("sendForReviewButton").style.display="none","visible"!==document.getElementById("resetButton").style.visibility&&(document.getElementById("resetButton").style.visibility="visible",analytics.track("Element Viewed",{elementID:"resetButton"})),document.getElementById("requiresReviewDiv").style.display="none";let n=document.getElementById("noteText").innerText,a="";d>t&&(a+="Ett höjt startpris kan innebära att det tar längre tid för plagget att säljas."),i>e&&(a+=`${a?" ":""}Ett h\xf6jt l\xe4gsta pris minskar sannolikheten att det blir s\xe5lt.`),a||(a="Bra att du kan tänka dig sänka priset! Det ökar sannolikheten att det blir sålt."),document.getElementById("noteHeading").innerHTML="Notera!",document.getElementById("noteText").innerText=a,document.getElementById("noteDiv").style.display="block",a!==n&&document.getElementById("noteDiv").click(),document.getElementById("confirmButton").innerText="Påbörja försäljning",document.getElementById("rejectButton").style.display="flex"}else document.getElementById("resetButton").style.visibility="hidden",document.getElementById("noteHeading").innerHTML="Tips!",document.getElementById("noteText").innerText="Sänkta priser ger en säkrare och snabbare försäljning. Höjda priser kan ge mer pengar, men riskerar också att det blir osålt eller tar längre tid.",document.getElementById("noteDiv").style.display="block",document.getElementById("requiresReviewDiv").style.display="none",document.getElementById("confirmButton").style.display="flex",document.getElementById("sendForReviewButton").style.display="none",document.getElementById("rejectButton").style.display="flex"};function y(){let e=document.getElementById("minPrice"),t=document.getElementById("maxPrice"),n=Number(e.value),a=Number(t.value);return n<100?e.setCustomValidity("Vi försöker tyvärr aldrig sälja något under 100kr"):n>a?(t.setCustomValidity("Startpris måste vara högre än lägsta pris"),e.setCustomValidity("Lägsta pris måste vara mindre än startpris")):(e.setCustomValidity(""),t.setCustomValidity("")),document.getElementById("wf-form-Valuation-form").reportValidity()}async function g(e,t,n){if(!y())return;let a=Number(document.getElementById("minPrice").value),r=Number(document.getElementById("maxPrice").value);if(sessionStorage.getItem("itemToBeCreatedAfterSignIn")){let e=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"));return e.item.infoRequests.price.status="Resolved",e.item.infoRequests.price.response="Accepted",a!==t||r!==n?(e.item.infoRequests.price.userAdjustedMin=a,e.item.infoRequests.price.userAdjustedMax=r,i(t,n)?(e.item.minPriceEstimate=t,e.item.maxPriceEstimate=n):(e.item.infoRequests.price.response="User proposal",e.item.infoRequests.price.userProposalMotivation=document.getElementById("userProposalMotivation").value)):(e.item.minPriceEstimate=t,e.item.maxPriceEstimate=n),sessionStorage.setItem("itemToBeCreatedAfterSignIn",JSON.stringify(e)),window.location.href="/sign-in"}{await firebase.app().functions("europe-west1").httpsCallable("saveValuationStatus")({itemId:e,minPrice:t,maxPrice:n,adjustmentMin:a,adjustmentMax:r,userProposalMotivation:document.getElementById("userProposalMotivation").value,adjustmentRequiresReview:!i(t,n)});let l=getParamsObject();if(localStorage.getItem("latestItemCreated")&&!l.id){let e=JSON.parse(localStorage.getItem("latestItemCreated"));e.infoRequests.price.response=i(t,n)?"Accepted":"User proposal",i(t,n)&&(e.minPriceEstimate=a,e.maxPriceEstimate=r),localStorage.setItem("latestItemCreated",JSON.stringify(e))}if(document.referrer.includes("/private"))return window.location.href="/private";{let e=user.current?.phoneNumber?.length;return window.location.href=e?"/item-confirmation":"/user-contact"}}}let v=e=>{document.getElementById("itemImage").src=window.innerWidth<=400?e?.images?.enhancedFrontImageSmall||e?.images?.enhancedFrontImage||e?.images?.modelImage||e?.images?.frontImageSmall||e?.images?.frontImage:e?.images?.enhancedFrontImage||e?.images?.modelImage||e?.images?.frontImage;let{minPriceEstimate:t,newMinPriceEstimate:n,newMaxPriceEstimate:a,maxPriceEstimate:i}=e.mlValuation||{},r=e.infoRequests?.price?.minPrice||n||t,l=e.infoRequests?.price?.maxPrice||a||i;document.getElementById("chatLink").onclick=()=>Intercom("showNewMessage",e.mlValuation?.decline?`ID: ${e.id}

G\xe4llande att ni tackat nej till ${e.brand.trim()}-${e.category.toLowerCase()}:

`:`ID: ${e.id}

G\xe4llande prisintervallet p\xe5 ${r}-${l} kr f\xf6r ${e.brand.trim()}-${e.category.toLowerCase()}. Vad skulle du vilja \xe4ndra det till och varf\xf6r?

`),document.getElementById("valuationClose").addEventListener("click",()=>(sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),getParamsObject().id||(localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId")),window.location.href="/private"))},p=async e=>(e.id&&await firebase.app().functions("europe-west1").httpsCallable("markItemRejected")({itemId:e.id,userDecline:!0}),sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),getParamsObject().id||(localStorage.removeItem("newItem"),localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("newItemId")),window.location.href="/private"),I=()=>{for(let e of document.getElementsByClassName("tooltip-motivation"))e.classList.remove("tooltip-show")},f=e=>e<200?20:e<500?50:100,E=(e,t)=>{let n=Number(e.value),a=f(t),i=Math.floor(n/a)*a;e.value=Math.max(0,i===n?n-a:i),e.dispatchEvent(new Event("input"))},B=(e,t)=>{let n=Number(e.value),a=f(t),i=Math.ceil(n/a)*a;e.value=i===n?n+a:i,e.dispatchEvent(new Event("input"))},x=(e,t)=>10*Math.round((e+t)/20),h=async e=>{let{minPriceEstimate:t,newMinPriceEstimate:n,newMaxPriceEstimate:i,maxPriceEstimate:r,decline:l,newBrand:o,newBrandCategory:d}=e.mlValuation||{},s=getParamsObject(),m=s.version||e?.mlValuation?.modelVersion;if(!s.id&&l){await a(e),document.getElementById("valuationResultDiv").style.display="flex";return}let u=e.infoRequests?.price?.minPrice||n||t,c=e.infoRequests?.price?.maxPrice||i||r;document.getElementById("valuationText").innerText=`${x(u,c)} kr`,document.getElementById("valuationResultDiv").style.display="flex",document.body.addEventListener("click",I),document.getElementById("valuationRange").style.display="flex",document.getElementById("minPrice").value=u,document.getElementById("minPrice").disabled=!0,document.getElementById("maxPrice").value=c,document.getElementById("maxPrice").disabled=!0,e.infoRequests?.price?.type?(document.getElementById("valuationExplanation").innerText=e.infoRequests.price.description,e.infoRequests?.price?.type==="Final Offer"&&(document.getElementById("valuationExplanationHeader").innerText="Motivering",document.getElementById("valuationExplanationHeader").style.display="block")):m&&"1.76"===m?document.getElementById("valuationExplanation").innerText=b(e):(o||d)&&(document.getElementById("valuationExplanationHeader").style.display="block",document.getElementById("valuationExplanation").innerText=o?"Vi har inte sålt så mycket av detta varumärke tidigare och har därför lite mindre data. Du får justera om du upplever att värderingen inte är rimlig. Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar.":"Vi har inte sålt så mycket av denna kategori från varumärket tidigare och har därför lite mindre data. Du får justera om du upplever att värderingen inte är rimlig. Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar."),document.getElementById("valuationText").style.display="block",sessionStorage.getItem("itemToBeCreatedAfterSignIn")&&(document.getElementById("chatDiv").style.display="none"),await w(e),document.getElementById("confirmButton").addEventListener("click",()=>g(e.id,u,c)),document.getElementById("sendForReviewButton").addEventListener("click",()=>g(e.id,u,c)),document.getElementById("rejectButton").addEventListener("click",()=>p(e))},k=e=>{let t=getParamsObject();return t.valuatedBrandItems=parseInt(t.valuatedBrandItems||`${e.valuatedBrandItems}`),t.brandMeanMax=parseInt(t.brandMeanMax||`${e.brandMeanMax}`),t.brandAccuracy=parseFloat(t.brandAccuracy||`${e.brandAccuracy}`),t.brandCategoryAccuracy=parseFloat(t.brandCategoryAccuracy||`${e.brandCategoryAccuracy}`),t.fewBrand=t.fewBrand?"true"===t.fewBrand:e.fewBrand,t.brandMeanSold=parseInt(t.brandMeanSold||`${e.brandMeanSold}`),t},b=e=>{let{mlValuation:{valuatedBrandItems:t,brandMeanMax:n,brandAccuracy:a,brandCategoryAccuracy:i,fewBrand:r,brandMeanSold:l,brandCategoryMeanSold:o},cleanedBrand:d,brand:s}={...e,mlValuation:{...k(e.mlValuation)}},m=d||s,u=a>.8&&l>0?`Snittpriset f\xf6r s\xe5lda plagg f\xf6r varum\xe4rket \xe4r ${l} kr.`:i>.7&&o>0?`Snittpriset f\xf6r s\xe5lda plagg f\xf6r varum\xe4rket i denna kategori \xe4r ${o} kr.`:"";return r||0===t?"Värderingen är mer osäker då vi har sålt relativt lite av detta varumärke. Efterfrågan på mer okända och små varumärken är ofta lägre. För att öka sannolikheten att få det sålt kan du justera ner lägsta priset":n<=400?`V\xe4rderingen baseras p\xe5 ${t} plagg fr\xe5n ${m} som vi tidigare v\xe4rderat. ${u}`:a>=.8&&!r?`AI-v\xe4rderingen baseras p\xe5 ${t} plagg fr\xe5n ${m} som vi tidigare v\xe4rderat, och vi brukar ha h\xf6g tr\xe4ffs\xe4kerhet p\xe5 detta varum\xe4rke. Om du mot f\xf6rmodan \xe4nd\xe5 vill justera kan du g\xf6ra det, men t\xe4nk p\xe5 att det p\xe5verkar sannolikheten att f\xe5 det s\xe5lt. ${u}`:a<.8&&i>=.7&&!r?`AI-v\xe4rderingen baseras p\xe5 ${t} plagg fr\xe5n ${m} som vi tidigare v\xe4rderat, och f\xf6r just denna kategori fr\xe5n varum\xe4rket brukar vi ha h\xf6g tr\xe4ffs\xe4kerhet. Om du mot f\xf6rmodan \xe4nd\xe5 vill justera kan du g\xf6ra det, men t\xe4nk p\xe5 att det p\xe5verkar sannolikheten att f\xe5 det s\xe5lt. ${u}`:"Värderingen baseras på plagg från liknande varumärken som vi värderat tidigare. För att öka sannolikheten att få det sålt kan du justera ner lägsta priset."},w=async e=>{let{minPriceEstimate:t,newMinPriceEstimate:n,newMaxPriceEstimate:a,maxPriceEstimate:i,adjustmentAllowed:r,version:l}=e.mlValuation||{},o=e.infoRequests?.price?.minPrice||n||t,d=e.infoRequests?.price?.maxPrice||a||i;("1.76"===l||r||["1A","1B","1C","2A","3","5A","7","8"].includes(e.brandSegment)||e.infoRequests?.price?.adjustmentAllowed)&&(document.getElementById("adjustIntervalButton").style.display="flex",analytics.track("Element Viewed",{elementID:"adjustIntervalButton"}),document.getElementById("chatDiv").style.display="none",document.getElementById("adjustIntervalButton").addEventListener("click",()=>{document.getElementById("valuationExplanation").style.display="none",document.getElementById("valuationExplanationHeader").style.display="none",document.getElementById("minPrice").disabled=!1,document.getElementById("maxPrice").disabled=!1,document.getElementById("adjustIntervalButton").style.display="none",document.getElementById("noteDiv").style.display="block",document.getElementById("origMinPrice").style.display="block",document.getElementById("origMaxPrice").style.display="block",document.getElementById("sliderDiv").style.display="block",document.querySelectorAll(".field-underline").forEach(e=>e.style.visibility="visible")})),e.infoRequests?.price?.type==="Final Offer"&&(document.getElementById("adjustIntervalButton").style.display="none",document.getElementById("chatDiv").style.display="none"),function(e,t,n){let a=document.getElementById("adjustmentSlider");a.addEventListener("touchend",()=>{a.value=Math.round(Number(a.value)),analytics.track("Click",{elementID:"adjustmentSlider"}),y()}),a.addEventListener("mouseup",()=>{a.value=Math.round(Number(a.value)),analytics.track("Click",{elementID:"adjustmentSlider"}),y()}),a.addEventListener("input",function(){let i=document.getElementById("minPrice"),r=document.getElementById("maxPrice");switch(Math.round(Number(a.value))){case 0:i.value=Math.max(100,10*Math.round(.5*e/10)),r.value=Math.max(100,10*Math.round(.5*t/10));break;case 1:i.value=Math.max(100,10*Math.round(.66*e/10)),r.value=Math.max(100,10*Math.round(.66*t/10));break;case 2:i.value=Math.max(100,10*Math.round(.83*e/10)),r.value=Math.max(100,10*Math.round(.83*t/10));break;case 3:i.value=e,r.value=t;break;case 4:i.value=10*Math.round((e+.33*j(e,t,n.mlValuation))/10),r.value=10*Math.round((t+.33*P(t,n.mlValuation))/10);break;case 5:i.value=10*Math.round((e+.67*j(e,t,n.mlValuation))/10),r.value=10*Math.round((t+.67*P(t,n.mlValuation))/10);break;case 6:i.value=10*Math.floor((e+j(e,t,n.mlValuation))/10),r.value=10*Math.floor((t+P(t,n.mlValuation))/10)}i.dispatchEvent(new Event("input")),r.dispatchEvent(new Event("input"))})}(o,d,e),document.getElementById("valuationMotivation").addEventListener("click",e=>{let t=document.getElementsByClassName("tooltip-motivation"),n=t[0]?.classList.contains("tooltip-show");for(let e of t)n?e.classList.remove("tooltip-show"):e.classList.add("tooltip-show");e.stopPropagation()}),document.getElementById("origMinPrice").innerText=o,document.getElementById("origMinPrice").style.visibility="hidden",document.getElementById("origMaxPrice").innerText=d,document.getElementById("origMaxPrice").style.visibility="hidden",document.getElementById("resetButton").addEventListener("click",()=>{document.getElementById("minPrice").value=o,document.getElementById("maxPrice").value=d,document.getElementById("minPrice").dispatchEvent(new Event("input")),document.getElementById("maxPrice").dispatchEvent(new Event("input")),document.getElementById("adjustmentSlider").value=3,document.getElementById("resetButton").style.visibility="hidden",y()}),document.getElementById("minPrice").addEventListener("blur",()=>y()),document.getElementById("minPrice").addEventListener("input",()=>{let e=document.getElementById("minPrice"),t=document.getElementById("maxPrice");Number(e.value)!==o?document.getElementById("origMinPrice").style.visibility="visible":document.getElementById("origMinPrice").style.visibility="hidden",c(o,d,e,t)}),document.getElementById("minIncrease").addEventListener("click",()=>{B(document.getElementById("minPrice"),o),analytics.track("Click",{elementID:"minIncrease"}),y()}),document.getElementById("minDecrease").addEventListener("click",()=>{E(document.getElementById("minPrice"),o),analytics.track("Click",{elementID:"minDecrease"}),y()}),document.getElementById("maxPrice").addEventListener("blur",()=>y()),document.getElementById("maxPrice").addEventListener("input",()=>{let e=document.getElementById("maxPrice"),t=document.getElementById("minPrice");Number(e.value)!==d?document.getElementById("origMaxPrice").style.visibility="visible":document.getElementById("origMaxPrice").style.visibility="hidden",c(o,d,t,e)}),document.getElementById("maxIncrease").addEventListener("click",()=>{B(document.getElementById("maxPrice"),d),analytics.track("Click",{elementID:"maxIncrease"}),y()}),document.getElementById("maxDecrease").addEventListener("click",()=>{E(document.getElementById("maxPrice"),d),analytics.track("Click",{elementID:"maxDecrease"}),y()}),(e.infoRequests?.price?.type==="Final Offer"||e.infoRequests?.price?.type==="Valuation")&&(document.getElementById("valuationMotivation").style.display="none")},M=async e=>{let t=await firebase.app().functions("europe-west1").httpsCallable("getItem")({itemId:e});return{...t?.data||{},id:e}},P=(e,t)=>{let{fewBrand:n,newBrand:a,brandAccuracy:i,brandCategoryAccuracy:r,highPriceVarBrandCategory:l}=k(t),o=n||a||l||i<.8||r<.7?.1:0;return e<=400?e*(.3+o):e<=800?e*(.25+o):e*(.2+o)},j=(e,t,n)=>Math.min(P(e,n),x(e,t)-e);(async()=>{window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var n=document,a=function(){a.c(arguments)};a.q=[],a.c=function(e){a.q.push(e)},e.Intercom=a;var i=function(){var e=n.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=n.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",i):e.addEventListener("load",i,!1)}}(),Intercom("update",{hide_default_launcher:!0});let e=getParamsObject(),t=e.id?await M(e.id):JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn")||"{}")?.item||JSON.parse(localStorage.getItem("latestItemCreated")||"{}");if(!t)return console.error("Invalid item id or no saved item to show valuation for"),location.href="/private";v(t),await h(t),triggerShowContent.click()})()},{}]},["eIGyM"],"eIGyM","parcelRequire81ca");
//# sourceMappingURL=itemValuation.js.map
