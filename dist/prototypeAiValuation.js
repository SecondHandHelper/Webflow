!function(e,t,n,o,i){var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof r[o]&&r[o],l=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!l[t]){if(!e[t]){var i="function"==typeof r[o]&&r[o];if(!n&&i)return i(t,!0);if(a)return a(t,!0);if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}m.resolve=function(n){var o=e[t][1][n];return null!=o?o:n},m.cache={};var u=l[t]=new d.Module(t);e[t][0].call(u.exports,m,u,u.exports,this)}return l[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=a,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return r[o]}}),r[o]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){var u=d(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):i&&(this[i]=u)}}({"9Hsg4":[function(e,t,n){async function o(){return new Promise(e=>{["itemId","systemRole","prompt"].forEach(e=>{let t=document.getElementById(e);t.setCustomValidity(t.value?"":"Required")});let t=document.getElementById("promptForm"),n=!t.checkValidity();t.reportValidity(),e(!n)})}async function i(){if(!await o())return!1;document.getElementById("result").innerHTML="Thinking...";let e=document.getElementById("itemId").value,t={systemTemplate:document.getElementById("systemRole").value,userTemplate:document.getElementById("prompt").value};console.log("Body: ",{body:t});let n=await callBackendApi(`/api/chatGptValuation/${e}`,{method:"POST",data:{body:t},requiresAuth:!1});return console.log("RES: ",n),{...n?.data||{}}}let r=async e=>{let t=await callBackendApi(`/api/items/${e}`);return{...t?.data||{},id:e}};(async()=>{var e;let t=getParamsObject();e=t.id?await r(t.id):"",document.getElementById("itemId").value=e.id||"",document.getElementById("systemRole").value="As a seasoned appraiser specializing in pre-owned apparel, you possess extensive expertise in evaluating second-hand clothing and determining appropriate pricing strategies.",document.getElementById("prompt").value=`Your goal is to give me the resale value in USD of a specific item with the below characteristics, give an upper and lower bound. Conduct these four steps:

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
- Category: ${e.category||"{category}"}`,document.getElementById("runButton").addEventListener("click",async function(){let e=await i();if(console.log("DATA: ",e),e){let t=e=>"object"==typeof e&&null!==e?Object.entries(e).map(([e,t])=>`<br>- ${e}: ${t}`).join(""):e,n=Object.entries(e).map(([e,n])=>`<p><strong>${e}:</strong> ${t(n)}</p>`).join("");document.getElementById("result").innerHTML=n}}),document.querySelectorAll("input, select, textarea").forEach(e=>{e.addEventListener("input",e=>{e.setCustomValidity("")}),"select"===e.tagName.toLowerCase()&&e.addEventListener("change",()=>{e.setCustomValidity("")})})})()},{}]},["9Hsg4"],"9Hsg4","parcelRequire81ca");
//# sourceMappingURL=prototypeAiValuation.js.map
