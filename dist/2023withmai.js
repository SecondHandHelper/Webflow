!function(e,t,n,o,r){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof i[o]&&i[o],l=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,n){if(!l[t]){if(!e[t]){var r="function"==typeof i[o]&&i[o];if(!n&&r)return r(t,!0);if(a)return a(t,!0);if(s&&"string"==typeof t)return s(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(n){var o=e[t][1][n];return null!=o?o:n},p.cache={};var u=l[t]=new d.Module(t);e[t][0].call(u.exports,p,u,u.exports,this)}return l[t].exports;function p(e){var t=p.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=l,d.parent=a,d.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return i[o]}}),i[o]=d;for(var c=0;c<t.length;c++)d(t[c]);if(n){var u=d(n);"object"==typeof exports&&"undefined"!=typeof module?module.exports=u:"function"==typeof define&&define.amd?define(function(){return u}):r&&(this[r]=u)}}({arxaN:[function(e,t,n){function o(){let e=getParamsObject();if(navigator.share)navigator.share({url:`https://maiapp.se/2023withmai?id=${e.id}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let t=`https://maiapp.se/2023withmai?id=${e.id}`;navigator.clipboard.writeText(t),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}(async function(){let e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:getParamsObject().id})},t=await fetch("https://europe-west3-second-hand-helper.cloudfunctions.net/yearlyData",e);if(!t.ok)throw Error("Network response was not ok.");let n=(await t.json()).data;console.log("yearlyData: ",n),n.sold&&(document.getElementById("moneyEarned").innerHTML=`${parseInt(n.earned).toLocaleString("en-US").replaceAll(","," ")} kr`,document.getElementById("soldItems").innerText=`${n.sold} st plagg`,document.getElementById("savedCo2").innerHTML=n.co2kg<100?`${parseInt(n.co2kg).toLocaleString("sv")} kg CO<sub>2</sub>`:`${(parseInt(n.co2kg)/1e3).toLocaleString("sv")} ton CO<sub>2</sub>`,n.name?document.getElementById("letterTitle").innerHTML=n.name.charAt(0).toUpperCase()+n.name.slice(1)+",":document.getElementById("letterTitle").style.display="none",document.getElementById("letterBody").innerText=n.letter+"\n\nTillsammans ser vi till att plaggen får komma till användning, och vi hoppas vi får förtroendet att fortsätta sälja dina kläder under 2024!",document.getElementById("topStatsLoadingIcon").style.display="none",topStatsDiv.style.visibility="visible",letterDiv.style.display="flex",document.getElementById("shareYearlyHeaderButton").addEventListener("click",o),document.getElementById("shareYearlyButton").addEventListener("click",o))})(),user.whenSet(async()=>{let e=getParamsObject();authUser.current.uid.includes(e.id)&&(airplaneIcon.style.display="block",shareYearlyButton.style.display="block",db.collection("users").doc(authUser.current.uid).update({elementViews:firebase.firestore.FieldValue.arrayUnion({elementID:"2023withmai",timestamp:new Date})}),analytics.track("Element Viewed",{elementID:"2023withmai"}))})},{}]},["arxaN"],"arxaN","parcelRequire81ca");
//# sourceMappingURL=2023withmai.js.map
