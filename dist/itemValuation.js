!function(e,t,n,i,a){var l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof l[i]&&l[i],r=o.cache||{},d="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(t,n){if(!r[t]){if(!e[t]){var a="function"==typeof l[i]&&l[i];if(!n&&a)return a(t,!0);if(o)return o(t,!0);if(d&&"string"==typeof t)return d(t);var m=Error("Cannot find module '"+t+"'");throw m.code="MODULE_NOT_FOUND",m}u.resolve=function(n){var i=e[t][1][n];return null!=i?i:n},u.cache={};var c=r[t]=new s.Module(t);e[t][0].call(c.exports,u,c,c.exports,this)}return r[t].exports;function u(e){var t=u.resolve(e);return!1===t?{}:s(t)}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=r,s.parent=o,s.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(s,"root",{get:function(){return l[i]}}),l[i]=s;for(var m=0;m<t.length;m++)s(t[m]);if(n){var c=s(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):a&&(this[a]=c)}}({eIGyM:[function(e,t,n){async function i(e){document.getElementById("valuationHeading").style.display="none",document.getElementById("valuationMotivation").style.display="none",document.getElementById("valuationText").innerText="Säljer ej",document.getElementById("valuationText").style.display="block",document.getElementById("rejectButton").style.display="none",document.getElementById("confirmButton").style.display="none",document.getElementById("okejButton").style.display="flex",document.getElementById("newItemButton").style.display="flex",document.getElementById("declineExplanation").style.display="block",document.getElementById("valuationRange").style.display="none",document.getElementById("adjustIntervalButton").style.display="none",document.getElementById("valuationExplanation").style.display="none",document.getElementById("valuationExplanationHeader").style.display="none",document.getElementById("chatDiv").style.display="block",document.getElementById("newItemButton").addEventListener("click",()=>{sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId"),sessionStorage.removeItem("itemValuation"),window.location.href="/sell-item"}),document.getElementById("okejButton").addEventListener("click",()=>{sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId"),sessionStorage.removeItem("itemValuation"),window.location.href="/private"}),e.id&&await firebase.app().functions("europe-west1").httpsCallable("markItemRejected")({itemId:e.id,userDecline:!1})}window.itemValuationJsLoaded=!0;let a=(e,t)=>{let n=document.getElementById("minPrice").value,i=document.getElementById("maxPrice").value;return!r(e,t,Number(n),Number(i))},l=(e,t)=>!!(e<500)&&!!(t>1.5*e)||!!(e>=500)&&!!(e<1e3)&&!!(t>1.4*e)||!!(e>=1e3)&&!!(t>1.3*e),o=(e,t,n)=>l(e,n)||n>h(e,t),r=(e,t,n,i)=>o(e,t,n)||l(t,i),d=(e,t)=>l(e,t)?"Ovanligt högt startpris":null,s=(e,t)=>l(e,t)?"Ovanligt högt lägsta pris":null,m=(e,t)=>e>t?"Lägsta priset överstiger vår värdering":null,c=(e,t,n,i)=>[d(t,i),s(e,n),m(n,h(e,t))].filter(e=>e).join("<br>"),u=(e,t,n,i)=>{let a=Number(n.value),d=Number(i.value);if(i.style.color=l(t,d)?"#E20000":"#333",n.style.color=o(e,t,a)?"#E20000":"#333",r(e,t,a,d))"block"!==document.getElementById("requiresReviewDiv").style.display&&(document.getElementById("requiresReviewDiv").style.display="block",analytics.track("Element Viewed",{elementID:"requiresReviewDiv"})),document.getElementById("adjustmentWarningText").innerHTML=c(e,t,a,d),document.getElementById("noteDiv").style.display="none",document.getElementById("sendForReviewButton").style.display="flex",document.getElementById("confirmButton").style.display="none",document.getElementById("rejectButton").style.display="none";else if(d!==t||a!==e){document.getElementById("confirmButton").style.display="flex",document.getElementById("sendForReviewButton").style.display="none","visible"!==document.getElementById("resetButton").style.visibility&&(document.getElementById("resetButton").style.visibility="visible",analytics.track("Element Viewed",{elementID:"resetButton"})),document.getElementById("requiresReviewDiv").style.display="none";let n=document.getElementById("noteText").innerText,i="";d>t&&(i+="Ett höjt startpris kan innebära att det tar längre tid för plagget att säljas."),a>e&&(i+=`${i?" ":""}Ett h\xf6jt l\xe4gsta pris minskar sannolikheten att det blir s\xe5lt.`),i||(i="Bra att du kan tänka dig sänka priset! Det ökar sannolikheten att det blir sålt."),document.getElementById("noteHeading").innerHTML="Notera!",document.getElementById("noteText").innerText=i,document.getElementById("noteDiv").style.display="block",i!==n&&document.getElementById("noteDiv").click(),document.getElementById("confirmButton").innerText="Påbörja försäljning",document.getElementById("rejectButton").style.display="flex"}else document.getElementById("resetButton").style.visibility="hidden",document.getElementById("noteHeading").innerHTML="Tips!",document.getElementById("noteText").innerText="Sänkta priser ger en säkrare och snabbare försäljning. Höjda priser kan ge mer pengar, men riskerar också att det blir osålt eller tar längre tid.",document.getElementById("noteDiv").style.display="block",document.getElementById("requiresReviewDiv").style.display="none",document.getElementById("confirmButton").style.display="flex",document.getElementById("sendForReviewButton").style.display="none",document.getElementById("rejectButton").style.display="flex"};function y(){let e=document.getElementById("minPrice"),t=document.getElementById("maxPrice"),n=Number(e.value),i=Number(t.value);return n<100?e.setCustomValidity("Vi försöker tyvärr aldrig sälja något under 100kr"):n>i?(t.setCustomValidity("Startpris måste vara högre än lägsta pris"),e.setCustomValidity("Lägsta pris måste vara mindre än startpris")):(e.setCustomValidity(""),t.setCustomValidity("")),document.getElementById("wf-form-Valuation-form").reportValidity()}async function g(e,t,n){if(!y())return;let i=Number(document.getElementById("minPrice").value),l=Number(document.getElementById("maxPrice").value);if(sessionStorage.getItem("itemToBeCreatedAfterSignIn")){let e=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"));return e.item.infoRequests.price.status="Resolved",e.item.infoRequests.price.response="Accepted",i!==t||l!==n?(e.item.infoRequests.price.userAdjustedMin=i,e.item.infoRequests.price.userAdjustedMax=l,a(t,n)?(e.item.minPriceEstimate=t,e.item.maxPriceEstimate=n):(e.item.infoRequests.price.response="User proposal",e.item.infoRequests.price.userProposalMotivation=document.getElementById("userProposalMotivation").value)):(e.item.minPriceEstimate=t,e.item.maxPriceEstimate=n),sessionStorage.setItem("itemToBeCreatedAfterSignIn",JSON.stringify(e)),window.location.href="/sign-in"}{await firebase.app().functions("europe-west1").httpsCallable("saveValuationStatus")({itemId:e,minPrice:t,maxPrice:n,adjustmentMin:i,adjustmentMax:l,userProposalMotivation:document.getElementById("userProposalMotivation").value,adjustmentRequiresReview:!a(t,n)});let o=getParamsObject();if(localStorage.getItem("latestItemCreated")&&!o.id){let e=JSON.parse(localStorage.getItem("latestItemCreated"));e.infoRequests.price.response=a(t,n)?"Accepted":"User proposal",a(t,n)&&(e.minPriceEstimate=i,e.maxPriceEstimate=l),localStorage.setItem("latestItemCreated",JSON.stringify(e))}if(document.referrer.includes("/private"))return window.location.href="/private";{let e=user.current?.phoneNumber?.length;return window.location.href=e?"/item-confirmation":"/user-contact"}}}let v=e=>{document.getElementById("itemImage").src=window.innerWidth<=400?e?.images?.enhancedFrontImageSmall||e?.images?.enhancedFrontImage||e?.images?.modelImage||e?.images?.frontImageSmall||e?.images?.frontImage:e?.images?.enhancedFrontImage||e?.images?.modelImage||e?.images?.frontImage;let{minPriceEstimate:t,newMinPriceEstimate:n,newMaxPriceEstimate:i,maxPriceEstimate:a}=e.mlValuation||{},l=e.infoRequests?.price?.minPrice||n||t,o=e.infoRequests?.price?.maxPrice||i||a;document.getElementById("chatLink").onclick=()=>Intercom("showNewMessage",e.mlValuation?.decline?`ID: ${e.id}

G\xe4llande att ni tackat nej till ${e.brand.trim()}-${e.category.toLowerCase()}:

`:`ID: ${e.id}

G\xe4llande prisintervallet p\xe5 ${l}-${o} kr f\xf6r ${e.brand.trim()}-${e.category.toLowerCase()}. Vad skulle du vilja \xe4ndra det till och varf\xf6r?

`),document.getElementById("valuationClose").addEventListener("click",()=>(sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),getParamsObject().id||(localStorage.removeItem("newItem"),sessionStorage.removeItem("newItemId")),window.location.href="/private"))},I=async e=>(e.id&&await firebase.app().functions("europe-west1").httpsCallable("markItemRejected")({itemId:e.id,userDecline:!0}),sessionStorage.removeItem("itemToBeCreatedAfterSignIn"),getParamsObject().id||(localStorage.removeItem("newItem"),localStorage.removeItem("latestItemCreated"),sessionStorage.removeItem("newItemId")),window.location.href="/private"),p=()=>{for(let e of document.getElementsByClassName("tooltip-motivation"))e.classList.remove("tooltip-show")},E=e=>e<200?20:e<500?50:100,f=(e,t)=>{let n=Number(e.value),i=E(t),a=Math.floor(n/i)*i;e.value=Math.max(0,a===n?n-i:a),e.dispatchEvent(new Event("input"))},B=(e,t)=>{let n=Number(e.value),i=E(t),a=Math.ceil(n/i)*i;e.value=a===n?n+i:a,e.dispatchEvent(new Event("input"))},h=(e,t)=>10*Math.round((e+t)/20),x=async e=>{let{minPriceEstimate:t,newMinPriceEstimate:n,newMaxPriceEstimate:a,maxPriceEstimate:l,decline:o,newBrand:r,newBrandCategory:d}=e.mlValuation||{};if(!getParamsObject().id&&o){await i(e),document.getElementById("valuationResultDiv").style.display="flex";return}let s=e.infoRequests?.price?.minPrice||n||t,m=e.infoRequests?.price?.maxPrice||a||l;document.getElementById("valuationText").innerText=`${h(s,m)} kr`,document.getElementById("valuationResultDiv").style.display="flex",document.body.addEventListener("click",p),document.getElementById("valuationRange").style.display="flex",document.getElementById("minPrice").value=s,document.getElementById("minPrice").disabled=!0,document.getElementById("maxPrice").value=m,document.getElementById("maxPrice").disabled=!0,e.infoRequests?.price?.description?(document.getElementById("valuationExplanation").innerText=e.infoRequests.price.description,e.infoRequests?.price?.type==="Final Offer"&&(document.getElementById("valuationExplanationHeader").innerText="Motivering",document.getElementById("valuationExplanationHeader").style.display="block")):(r||d)&&(document.getElementById("valuationExplanationHeader").style.display="block",document.getElementById("valuationExplanation").innerText=r?"Vi har inte sålt så mycket av detta varumärke tidigare och har därför lite mindre data. Du får justera om du upplever att värderingen inte är rimlig. Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar.":"Vi har inte sålt så mycket av denna kategori från varumärket tidigare och har därför lite mindre data. Du får justera om du upplever att värderingen inte är rimlig. Vi börjar med startpriset, och justerar successivt ner till lägsta priset under säljperioden på 30 dagar."),document.getElementById("valuationText").style.display="block",sessionStorage.getItem("itemToBeCreatedAfterSignIn")&&(document.getElementById("chatDiv").style.display="none"),await b(e),document.getElementById("confirmButton").addEventListener("click",()=>g(e.id,s,m)),document.getElementById("sendForReviewButton").addEventListener("click",()=>g(e.id,s,m)),document.getElementById("rejectButton").addEventListener("click",()=>I(e))},b=async e=>{let{minPriceEstimate:t,newMinPriceEstimate:n,newMaxPriceEstimate:i,maxPriceEstimate:a,adjustmentAllowed:l}=e.mlValuation||{},o=e.infoRequests?.price?.minPrice||n||t,r=e.infoRequests?.price?.maxPrice||i||a;(l||["1A","1B","1C","2A","3","5A","7","8"].includes(e.brandSegment)||e.infoRequests?.price?.adjustmentAllowed)&&(document.getElementById("adjustIntervalButton").style.display="flex",analytics.track("Element Viewed",{elementID:"adjustIntervalButton"}),document.getElementById("chatDiv").style.display="none",document.getElementById("adjustIntervalButton").addEventListener("click",()=>{document.getElementById("valuationExplanation").style.display="none",document.getElementById("valuationExplanationHeader").style.display="none",document.getElementById("minPrice").disabled=!1,document.getElementById("maxPrice").disabled=!1,document.getElementById("adjustIntervalButton").style.display="none",document.getElementById("noteDiv").style.display="block",document.getElementById("origMinPrice").style.display="block",document.getElementById("origMaxPrice").style.display="block",document.getElementById("sliderDiv").style.display="block",document.querySelectorAll(".field-underline").forEach(e=>e.style.visibility="visible")})),e.infoRequests?.price?.type==="Final Offer"&&(document.getElementById("adjustIntervalButton").style.display="none",document.getElementById("chatDiv").style.display="none"),function(e,t){let n=document.getElementById("adjustmentSlider");n.addEventListener("touchend",()=>{n.value=Math.round(Number(n.value)),analytics.track("Click",{elementID:"adjustmentSlider"}),y()}),n.addEventListener("mouseup",()=>{n.value=Math.round(Number(n.value)),analytics.track("Click",{elementID:"adjustmentSlider"}),y()}),n.addEventListener("input",function(){let i=document.getElementById("minPrice"),a=document.getElementById("maxPrice");switch(Math.round(Number(n.value))){case 0:i.value=Math.max(100,10*Math.round(.5*e/10)),a.value=Math.max(100,10*Math.round(.5*t/10));break;case 1:i.value=Math.max(100,10*Math.round(.66*e/10)),a.value=Math.max(100,10*Math.round(.66*t/10));break;case 2:i.value=Math.max(100,10*Math.round(.83*e/10)),a.value=Math.max(100,10*Math.round(.83*t/10));break;case 3:i.value=e,a.value=t;break;case 4:i.value=10*Math.round((e+.33*P(e,t))/10),a.value=10*Math.round((t+.33*k(t))/10);break;case 5:i.value=10*Math.round((e+.67*P(e,t))/10),a.value=10*Math.round((t+.67*k(t))/10);break;case 6:i.value=10*Math.floor((e+P(e,t))/10),a.value=10*Math.floor((t+k(t))/10)}i.dispatchEvent(new Event("input")),a.dispatchEvent(new Event("input"))})}(o,r),document.getElementById("valuationMotivation").addEventListener("click",e=>{let t=document.getElementsByClassName("tooltip-motivation"),n=t[0]?.classList.contains("tooltip-show");for(let e of t)n?e.classList.remove("tooltip-show"):e.classList.add("tooltip-show");e.stopPropagation()}),document.getElementById("origMinPrice").innerText=o,document.getElementById("origMinPrice").style.visibility="hidden",document.getElementById("origMaxPrice").innerText=r,document.getElementById("origMaxPrice").style.visibility="hidden",document.getElementById("resetButton").addEventListener("click",()=>{document.getElementById("minPrice").value=o,document.getElementById("maxPrice").value=r,document.getElementById("minPrice").dispatchEvent(new Event("input")),document.getElementById("maxPrice").dispatchEvent(new Event("input")),document.getElementById("adjustmentSlider").value=3,document.getElementById("resetButton").style.visibility="hidden",y()}),document.getElementById("minPrice").addEventListener("blur",()=>y()),document.getElementById("minPrice").addEventListener("input",()=>{let e=document.getElementById("minPrice"),t=document.getElementById("maxPrice");Number(e.value)!==o?document.getElementById("origMinPrice").style.visibility="visible":document.getElementById("origMinPrice").style.visibility="hidden",u(o,r,e,t)}),document.getElementById("minIncrease").addEventListener("click",()=>{B(document.getElementById("minPrice"),o),analytics.track("Click",{elementID:"minIncrease"}),y()}),document.getElementById("minDecrease").addEventListener("click",()=>{f(document.getElementById("minPrice"),o),analytics.track("Click",{elementID:"minDecrease"}),y()}),document.getElementById("maxPrice").addEventListener("blur",()=>y()),document.getElementById("maxPrice").addEventListener("input",()=>{let e=document.getElementById("maxPrice"),t=document.getElementById("minPrice");Number(e.value)!==r?document.getElementById("origMaxPrice").style.visibility="visible":document.getElementById("origMaxPrice").style.visibility="hidden",u(o,r,t,e)}),document.getElementById("maxIncrease").addEventListener("click",()=>{B(document.getElementById("maxPrice"),r),analytics.track("Click",{elementID:"maxIncrease"}),y()}),document.getElementById("maxDecrease").addEventListener("click",()=>{f(document.getElementById("maxPrice"),r),analytics.track("Click",{elementID:"maxDecrease"}),y()}),(e.infoRequests?.price?.type==="Final Offer"||e.infoRequests?.price?.type==="Valuation")&&(document.getElementById("valuationMotivation").style.display="none")},w=async e=>{let t=await firebase.app().functions("europe-west1").httpsCallable("getItem")({itemId:e});return{...t?.data||{},id:e}},k=e=>e<500?.5*e:e<1e3?.4*e:.3*e,P=(e,t)=>Math.min(k(e),h(e,t)-e);(async()=>{window.intercomSettings={app_id:"klyy0le5"},function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var n=document,i=function(){i.c(arguments)};i.q=[],i.c=function(e){i.q.push(e)},e.Intercom=i;var a=function(){var e=n.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=n.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}}(),Intercom("update",{hide_default_launcher:!0});let e=getParamsObject(),t=e.id?await w(e.id):JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn")||"{}")?.item||JSON.parse(localStorage.getItem("latestItemCreated")||"{}");if(!t)return console.error("Invalid item id or no saved item to show valuation for"),location.href="/private";v(t),await x(t),triggerShowContent.click()})()},{}]},["eIGyM"],"eIGyM","parcelRequire81ca");
//# sourceMappingURL=itemValuation.js.map
