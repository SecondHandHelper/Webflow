!function(e,t,n,i,o,r,a){var d="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof d[i]&&d[i],s=l.i||{},c=l.cache||{},u="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function m(t,n){if(!c[t]){if(!e[t]){var o="function"==typeof d[i]&&d[i];if(!n&&o)return o(t,!0);if(l)return l(t,!0);if(u&&"string"==typeof t)return u(t);var r=Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}s.resolve=function(n){var i=e[t][1][n];return null!=i?i:n},s.cache={};var a=c[t]=new m.Module(t);e[t][0].call(a.exports,s,a,a.exports,d)}return c[t].exports;function s(e){var t=s.resolve(e);return!1===t?{}:m(t)}}m.isParcelRequire=!0,m.Module=function(e){this.id=e,this.bundle=m,this.require=u,this.exports={}},m.modules=e,m.cache=c,m.parent=l,m.distDir=void 0,m.publicUrl=void 0,m.devServer=void 0,m.i=s,m.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(m,"root",{get:function(){return d[i]}}),d[i]=m;for(var p=0;p<t.length;p++)m(t[p]);if(n){var f=m(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=f:"function"==typeof define&&define.amd&&define(function(){return f})}}({"9Hsg4":[function(e,t,n,i){async function o(){return new Promise(e=>{["itemId","systemRole","prompt"].forEach(e=>{let t=document.getElementById(e);t.setCustomValidity(t.value?"":"Required")});let t=document.getElementById("promptForm"),n=!t.checkValidity();t.reportValidity(),e(!n)})}async function r(){if(!await o())return!1;document.getElementById("result").innerHTML="Thinking...";let e=document.getElementById("itemId").value,t={systemTemplate:document.getElementById("systemRole").value,userTemplate:document.getElementById("prompt").value};console.log("Body: ",{body:t});let n=await callBackendApi(`/api/chatGptValuation/${e}`,{method:"POST",data:{body:t},requiresAuth:!1});return console.log("RES: ",n),{...n?.data||{}}}let a=async e=>{let t=await callBackendApi(`/api/items/${e}`);return{...t?.data||{},id:e}};(async()=>{var e;let t=getParamsObject();e=t.id?await a(t.id):"",document.getElementById("itemId").value=e.id||"",document.getElementById("systemRole").value="As a seasoned appraiser specializing in pre-owned apparel, you possess extensive expertise in evaluating second-hand clothing and determining appropriate pricing strategies.",document.getElementById("prompt").value=`Your goal is to give me the resale value in USD of a specific item with the below characteristics, give an upper and lower bound. Conduct these four steps:

1. Look at the data from sold items from the resale platforms Vestiaire Collective and Tradera.
2. Give me the best price range for my item, considering the characteristics below. Don't forget the condition aspect of the appraisal.
2. Provide reasoning with why you set the span

Now execute step 1-4 to deliver the goal.

Characteristics:
- Original price: SEK ${e.originalPrice||"{originalPrice}"}
- Brand: ${e.cleanedBrand||"{cleanedBrand}"}
- Condition: ${e.condition||"{condition}"}
- Age: ${e.age||"{age}"}
- User comment: ${e.userComment||"{userComment}"}${e.defects?`
- Defects: ${e.defects}`:"\n- Defects: {defects}"}${e.defectDescription?`
- Defects description: ${e.defectDescription}`:"\n- Defects description: {defectDescription}"}
- Size: ${e.size||"{size}"}
- Material: ${e.material||"{material}"}
- Model: ${e.model||"{model}"}
- Color: ${e.color||"{color}"}
- Category: ${e.category||"{category}"}`,document.getElementById("runButton").addEventListener("click",async function(){let e=await r();if(console.log("DATA: ",e),e){let t=e=>"object"==typeof e&&null!==e?Object.entries(e).map(([e,t])=>`<br>- ${e}: ${t}`).join(""):e,n=Object.entries(e).map(([e,n])=>`<p><strong>${e}:</strong> ${t(n)}</p>`).join("");document.getElementById("result").innerHTML=n}}),document.querySelectorAll("input, select, textarea").forEach(e=>{e.addEventListener("input",e=>{e.setCustomValidity("")}),"select"===e.tagName.toLowerCase()&&e.addEventListener("change",()=>{e.setCustomValidity("")})})})()},{}]},["9Hsg4"],"9Hsg4","parcelRequire81ca");
//# sourceMappingURL=prototypeAiValuation.js.map
