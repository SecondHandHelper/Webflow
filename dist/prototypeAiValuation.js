!function(e,t,n,i,o){var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof r[i]&&r[i],d=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(t,n){if(!d[t]){if(!e[t]){var o="function"==typeof r[i]&&r[i];if(!n&&o)return o(t,!0);if(a)return a(t,!0);if(s&&"string"==typeof t)return s(t);var l=Error("Cannot find module '"+t+"'");throw l.code="MODULE_NOT_FOUND",l}f.resolve=function(n){var i=e[t][1][n];return null!=i?i:n},f.cache={};var u=d[t]=new c.Module(t);e[t][0].call(u.exports,f,u,u.exports,this)}return d[t].exports;function f(e){var t=f.resolve(e);return!1===t?{}:c(t)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=d,c.parent=a,c.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(c,"root",{get:function(){return r[i]}}),r[i]=c;for(var l=0;l<t.length;l++)c(t[l]);if(n){var u=c(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):o&&(this[o]=u)}}({"9Hsg4":[function(e,t,n){async function i(){return new Promise(e=>{["itemId","systemRole","prompt"].forEach(e=>{let t=document.getElementById(e);t.setCustomValidity(t.value?"":"Required")});let t=document.getElementById("promptForm"),n=!t.checkValidity();t.reportValidity(),e(!n)})}async function o(){if(!await i())return!1;let e={systemRole:document.getElementById("systemRole").value,prompt:document.getElementById("prompt").value};console.log("Body: ",{body:e});let t=await callBackendApi(`/api/items/${itemId}/getValuation`,{data:{body:e},requiresAuth:!1});return{...t?.data||{},id:itemId}}let r=async e=>{let t=await callBackendApi(`/api/items/${e}`);return{...t?.data||{},id:e}};(async()=>{var e;let t=getParamsObject();e=t.id?await r(t.id):"",document.getElementById("itemId").value=e.id||"",document.getElementById("systemRole").value="As a seasoned appraiser specializing in pre-owned apparel, you possess extensive expertise in evaluating second-hand clothing and determining appropriate pricing strategies.",document.getElementById("prompt").value=`Your goal is to give me the resale value in USD of a specific item with the below characteristics, give an upper and lower bound. Conduct these four steps:

1. Scrape sold prices on the brand + category on platforms where we sell (Tradera, Vestiare, Grailed). Do a web search.
2. Find similar items based on the image I send you, take into account if it has defects
3. Give me a price range
4. Provide reasoning with why you set the span

Now execute step 1-4 to deliver the goal.

Characteristics:
- Original price: SEK ${e.originalPrice||"${originalPrice}"}
- Brand: ${e.cleanedBrand||"${cleanedBrand}"}
- Condition: ${e.condition||"${condition}"}
- Age: ${e.age||"${age}"}
- User comment: ${e.userComment||"${userComment}"}${e.defects?`
- Defects: ${e.defects}`:"\n- Defects: ${defects}"}${e.defectDescription?`
- Defects description: ${e.defectDescription}`:"\n- Defects description: ${defectDescription}"}
- Size: ${e.size||"${size}"}
- Material: ${e.material||"${material}"}
- Model: ${e.model||"${model}"}
- Color: ${e.color||"${color}"}
- Category: ${e.category||"${category}"}`,document.getElementById("runButton").addEventListener("click",async function(){await o()&&(document.getElementById("result").innerText="RESULT HERE")}),document.querySelectorAll("input, select, textarea").forEach(e=>{e.addEventListener("input",e=>{e.setCustomValidity("")}),"select"===e.tagName.toLowerCase()&&e.addEventListener("change",()=>{e.setCustomValidity("")})})})()},{}]},["9Hsg4"],"9Hsg4","parcelRequire81ca");
//# sourceMappingURL=prototypeAiValuation.js.map
