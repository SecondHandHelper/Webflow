!function(e,t,n,i,o){var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof r[i]&&r[i],d=a.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(t,n){if(!d[t]){if(!e[t]){var o="function"==typeof r[i]&&r[i];if(!n&&o)return o(t,!0);if(a)return a(t,!0);if(l&&"string"==typeof t)return l(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}m.resolve=function(n){var i=e[t][1][n];return null!=i?i:n},m.cache={};var s=d[t]=new c.Module(t);e[t][0].call(s.exports,m,s,s.exports,this)}return d[t].exports;function m(e){var t=m.resolve(e);return!1===t?{}:c(t)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=d,c.parent=a,c.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(c,"root",{get:function(){return r[i]}}),r[i]=c;for(var u=0;u<t.length;u++)c(t[u]);if(n){var s=c(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=s:"function"==typeof define&&define.amd?define(function(){return s}):o&&(this[o]=s)}}({"9Hsg4":[function(e,t,n){async function i(){return new Promise(e=>{["itemId","systemRole","prompt"].forEach(e=>{let t=document.getElementById(e);t.setCustomValidity(t.value?"":"Required")});let t=!document.getElementById("formInner").checkValidity();document.getElementById("formInner").reportValidity(),e(!t)})}async function o(){if(!await i())return!1;let e={itemId:document.getElementById("itemId").value,systemRole:document.getElementById("systemRole").value,prompt:document.getElementById("prompt").value};console.log("Body: ",{itemId,body:e});let t=await callBackendApi(`/api/items/${itemId}/getValuation`,{data:{body:e},requiresAuth:!1});return{...t?.data||{},id:itemId}}let r=async e=>{let t=await callBackendApi(`/api/items/${e}`);return{...t?.data||{},id:e}};(async()=>{let e=getParamsObject(),t=e.id?await r(e.id):"";t||(console.error("Invalid item id param"),location.href="/"),document.getElementById("itemId").value=t.id||"tsFDKftTtL",document.getElementById("systemRole").value="You are an expert at valuating second hand apparel and setting prices",document.getElementById("prompt").value=`Your goal is to give me the resale value in USD of a specific item with the below characteristics, give an upper and lower bound. Conduct these four steps:

1. Scrape sold prices on the brand + category on platforms where we sell (Tradera, Vestiare, Grailed). Do a web search.
2. Find similar items based on the image I send you, take into account if it has defects
3. Give me a price range
4. Provide reasoning with why you set the span

Now execute step 1-4 to deliver the goal.

Characteristics:
- Orignal price: ${t.originalPrice}
- Brand: ${t.cleanedBrand}
- Condition: ${t.condition}
- Age: ${t.age}
- User comment: ${t.userComment}
- Defects: ${t.defects}
- Defect description: ${t.defectDescription}
- Size: ${t.size}
- Material: ${t.material}
- Model: ${t.model}
- Color: ${t.color}
- Category: ${t.category}`,document.getElementById("runButton").addEventListener("click",async function(){await o()&&(document.getElementById("result").innerText="RESULT HERE")}),document.querySelectorAll("input, select, textarea").forEach(e=>{e.addEventListener("input",e=>{e.setCustomValidity("")}),"select"===e.tagName.toLowerCase()&&e.addEventListener("change",()=>{e.setCustomValidity("")})})})()},{}]},["9Hsg4"],"9Hsg4","parcelRequire81ca");
//# sourceMappingURL=prototypeAiValuation.js.map
