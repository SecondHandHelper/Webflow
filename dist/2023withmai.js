!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,o,r){/* eslint-disable no-undef */var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof i[o]&&i[o],l=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!l[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var r="function"==typeof i[o]&&i[o];if(!n&&r)return r(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(a)return a(t,!0);// Try the node require function if it exists.
if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}f.resolve=function(n){var o=e[t][1][n];return null!=o?o:n},f.cache={};var u=l[t]=new d.Module(t);e[t][0].call(u.exports,f,u,u.exports,this)}return l[t].exports;function f(e){var t=f.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=a,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return i[o]}}),i[o]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var u=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):r&&(this[r]=u)}}({arxaN:[function(e,t,n){function o(){let e=getParamsObject();if(navigator.share)navigator.share({url:`https://mairesale.com/2023withmai?id=${e.id}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let t=`https://mairesale.com/2023withmai?id=${e.id}`;navigator.clipboard.writeText(t),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}(async function(){let e=getParamsObject(),t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e.id})},n=await fetch("https://europe-west3-second-hand-helper.cloudfunctions.net/yearlyData",t);if(!n.ok)throw Error("Network response was not ok.");let r=await n.json(),i=r.data;console.log("yearlyData: ",i),i.sold&&(document.getElementById("moneyEarned").innerHTML=`${parseInt(i.earned).toLocaleString("en-US").replaceAll(","," ")} kr`,document.getElementById("soldItems").innerText=`${i.sold} st plagg`,document.getElementById("savedCo2").innerHTML=i.co2kg<100?`${parseInt(i.co2kg).toLocaleString("sv")} kg CO<sub>2</sub>`:`${(parseInt(i.co2kg)/1e3).toLocaleString("sv")} ton CO<sub>2</sub>`,i.name?document.getElementById("letterTitle").innerHTML=i.name.charAt(0).toUpperCase()+i.name.slice(1)+",":document.getElementById("letterTitle").style.display="none",document.getElementById("letterBody").innerText=i.letter+"\n\nTillsammans ser vi till att plaggen f\xe5r komma till anv\xe4ndning, och vi hoppas vi f\xe5r f\xf6rtroendet att forts\xe4tta s\xe4lja dina kl\xe4der under 2024!",document.getElementById("topStatsLoadingIcon").style.display="none",topStatsDiv.style.visibility="visible",letterDiv.style.display="flex",document.getElementById("shareYearlyHeaderButton").addEventListener("click",o),document.getElementById("shareYearlyButton").addEventListener("click",o))})(),user.whenSet(async()=>{let e=getParamsObject();authUser.current.uid.includes(e.id)&&(airplaneIcon.style.display="block",shareYearlyButton.style.display="block",// Store elementViews to be able to hinder it to show automatically again
db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"2023withmai",timestamp:new Date})}),// Track with segment
analytics.track("Element Viewed",{elementID:"2023withmai"}))})},{}]},["arxaN"],"arxaN","parcelRequire81ca")//# sourceMappingURL=2023withmai.js.map
;
//# sourceMappingURL=2023withmai.js.map
