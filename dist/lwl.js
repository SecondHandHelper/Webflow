!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(t,e,n,r,o){/* eslint-disable no-undef */var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof i[r]&&i[r],l=a.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(e,n){if(!l[e]){if(!t[e]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var o="function"==typeof i[r]&&i[r];if(!n&&o)return o(e,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(a)return a(e,!0);// Try the node require function if it exists.
if(s&&"string"==typeof e)return s(e);var u=Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}f.resolve=function(n){var r=t[e][1][n];return null!=r?r:n},f.cache={};var d=l[e]=new c.Module(e);t[e][0].call(d.exports,f,d,d.exports,this)}return l[e].exports;function f(t){var e=f.resolve(t);return!1===e?{}:c(e)}}c.isParcelRequire=!0,c.Module=function(t){this.id=t,this.bundle=c,this.exports={}},c.modules=t,c.cache=l,c.parent=a,c.register=function(e,n){t[e]=[function(t,e){e.exports=n},{}]},Object.defineProperty(c,"root",{get:function(){return i[r]}}),i[r]=c;for(var u=0;u<e.length;u++)c(e[u]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var d=c(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=d:"function"==typeof define&&define.amd?define(function(){return d}):o&&(this[o]=d)}}({"2mRjC":[function(t,e,n){var r=t("@parcel/transformer-js/src/esmodule-helpers.js"),o=t("qrcode"),i=r.interopDefault(o);let a=getParamsObject();if("true"===a.createDrafts&&localStorage.getItem("lwlItemDrafts")&&(document.referrer.includes("sign-in")||document.referrer.includes("private"))){document.getElementsByClassName("div-block-230")[0].style.display="none",document.getElementById("header").style.display="none",document.getElementById("formDiv").style.display="none",document.getElementById("threadInputDiv").style.display="none",document.getElementById("lwlItemsDiv").style.display="none",document.getElementById("loadingDiv").style.display="flex";let t=JSON.parse(localStorage.getItem("lwlItemDrafts"));authUser.whenSet(async()=>{await Promise.all(t.map(t=>callFirebaseFunction("europe-west1","createItem",{id:t.id,item:t}))),localStorage.removeItem("lwlItemDrafts"),location.href="/private#wardrobe"})}let l=!1,s=t=>{document.getElementById("errorMessage").innerHTML=t||"N\xe5got gick fel, kontrollera att du skrivit in en giltig LWL tr\xe5d och f\xf6rs\xf6k igen.",document.getElementsByClassName("w-form-fail")[0].style.display="block",document.getElementById("lwlThreadUrl").style.display="block",document.getElementById("buttonsDiv").style.display="block",document.getElementById("doneButton").style.display="flex",document.getElementById("doneButton").innerText="Starta om",document.getElementById("introHeading").style.display="block",document.getElementById("scrapeProgressDiv").style.display="none",l=!1};document.getElementById("doneButton").addEventListener("click",()=>{if(l)return;c=!1,document.getElementById("lwlItemsDiv").style.display="none",document.getElementsByClassName("w-form-fail")[0].style.display="none";let t=document.getElementById("lwlThreadUrl");if(!t.value.length){console.log("No url thread given");return}if(!t.value.match(/^https:\/\/www.facebook.com\/groups\/982264948455365\/permalink\/\d+/)&&!t.value.match(/^https:\/\/www.facebook.com\/share\/p\/\w+/)){s("Ogilitg LWL url angiven.");return}l=!0,document.getElementById("lwlThreadUrl").style.display="none",document.getElementById("buttonsDiv").style.display="none",document.getElementById("doneButton").style.display="none",document.getElementById("introHeading").style.display="none",document.getElementById("openIntroDiv").style.display="none",document.getElementById("scrapeProgressDiv").style.display="flex",document.getElementById("scrapeProgress").innerText="Startar...";let e=new WebSocket("wss://lwl-to-mai-22-heypmjzjfq-lz.a.run.app");e.addEventListener("open",()=>{console.log("connected to lwl thread scraping server"),e.send(JSON.stringify({url:t.value}))}),e.addEventListener("error",t=>{s(),e.close()}),e.addEventListener("message",async n=>{console.log("received message from server",n.data);let r=n.data;try{r=JSON.parse(n.data)}catch(t){r={status:"Startar..."}}if("Error"===r.status){s(r.data?.threadIsValid?"N\xe5got gick fel, f\xf6rs\xf6k g\xe4rna igen.":null),e.close();return}if("Item"===r.status&&r.data&&u(r.data),document.getElementById("scrapeProgress").innerText=r.status,r.status.match(/klar/i)){if(e.close(),document.getElementById("scrapeProgress").innerText="Skapar plaggen i Mai...",!r.data.length){s(),e.close();return}let n=await firebase.app().functions("europe-west3").httpsCallable("createItemDraftsFromLwl",{timeout:24e4})({itemData:r.data,url:t.value},240);authUser.current?location.href="/private#wardrobe":(document.getElementById("scrapeProgressDiv").style.display="none",document.getElementById("introHeading").innerText="Os\xe5lda plagg fr\xe5n din tr\xe5d. Logga in f\xf6r att justera och s\xe4lja.",document.getElementById("introHeading").style.display="block",d(n.data),// TODO: remove this comment and the function when we are happy with addLwLItemPreview + showLwLDraftItemsFromPreview
// showLwLDraftItems(draftItemResponse.data);
document.getElementById("buttonsDiv").style.display="block",document.getElementById("signInButton").style.display="flex",document.getElementById("signInButton").addEventListener("click",async()=>{localStorage.setItem("lwlItemDrafts",JSON.stringify(n.data)),location.href="/sign-in"}))}})});let c=!1,u=t=>{let e=document.getElementsByClassName("lwlitemcard")[0],n=document.getElementById("lwlItemList");c||(document.getElementById("lwlItemsDiv").style.display="block",n.innerHTML="",c=!0);let r=e.cloneNode(!0);r.classList.add("lwlItemCard");let o=t.images?.[0];o?(r.querySelector(".img-container").style.backgroundImage=`url("${o}")`,r.querySelector(".no-image-text").style.display="none",r.style.opacity="0.5"):r.querySelector(".img-container").style.display="none",r.querySelector(".lwl-item-title").innerText="",r.querySelector(".lwl-item-subtext").innerText="",n.appendChild(r)},d=t=>{let e=document.getElementsByClassName("lwlItemCard");for(let n of e){let e=n.getElementsByClassName("img-container")[0].style.backgroundImage.slice(4,-1).replaceAll(/"/g,""),r=t.find(t=>t.draftSourceProperties.rawData.images.includes(e));n.style.opacity="1",n.querySelector(".lwl-item-title").innerText=`${r.cleanedBrand||r.brand?.trim()}`,n.querySelector(".lwl-item-subtext").innerText=`${[r.category,r.maiSize].filter(t=>t).join(", ")}`}},f=document.getElementById("qrCanvas");f&&(0,i.default).toCanvas(f,window.location.href,function(t){t&&console.error(t)}),//INTRO STUFF
document.getElementById("introNext").addEventListener("click",()=>{"S\xe4tt ig\xe5ng"===document.getElementById("introNext").innerText&&(setCookie("lwlIntroSeen","true"),document.getElementById("introSection").style.display="none"),document.getElementById("introRightArrow").click(),document.querySelector(".w-slider-nav div:last-child").classList.contains("w-active")&&(document.getElementById("introNext").innerText="S\xe4tt ig\xe5ng")}),document.getElementById("skipIntro").addEventListener("click",()=>{setCookie("lwlIntroSeen","true"),document.getElementById("introSection").style.display="none"}),"true"!==getCookie("lwlIntroSeen")&&(document.getElementById("introSection").style.display="flex"),document.getElementById("openIntroButton").addEventListener("click",()=>{document.getElementById("introSection").style.display="flex",document.querySelector(".slide-nav-lwl div.w-slider-dot").click(),document.getElementById("introNext").innerText="N\xe4sta"}),document.getElementById("chatLink").addEventListener("click",()=>{Intercom("showNewMessage","Klistra in en l\xe4nk till LWL tr\xe5den du f\xf6rs\xf6kte l\xe4sa in?\n\n")}),window.intercomSettings={app_id:"klyy0le5"},function(){var t=window,e=t.Intercom;if("function"==typeof e)e("reattach_activator"),e("update",t.intercomSettings);else{var n=document,r=function(){r.c(arguments)};r.q=[],r.c=function(t){r.q.push(t)},t.Intercom=r;var o=function(){var t=n.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://widget.intercom.io/widget/klyy0le5";var e=n.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)};t.attachEvent?t.attachEvent("onload",o):t.addEventListener("load",o,!1)}}()},{qrcode:"6s2CO","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"6s2CO":[function(t,e,n){let r=t("da1f68cc1fc16077"),o=t("8c6cf49ef2287430"),i=t("8a60cf7722cc14ce"),a=t("f6fcc816b915ba37");function l(t,e,n,i,a){let l=[].slice.call(arguments,1),s=l.length,c="function"==typeof l[s-1];if(!c&&!r())throw Error("Callback required as last argument");if(c){if(s<2)throw Error("Too few arguments provided");2===s?(a=n,n=e,e=i=void 0):3===s&&(e.getContext&&void 0===a?(a=i,i=void 0):(a=i,i=n,n=e,e=void 0))}else{if(s<1)throw Error("Too few arguments provided");return 1===s?(n=e,e=i=void 0):2!==s||e.getContext||(i=n,n=e,e=void 0),new Promise(function(r,a){try{let a=o.create(n,i);r(t(a,e,i))}catch(t){a(t)}})}try{let r=o.create(n,i);a(null,t(r,e,i))}catch(t){a(t)}}n.create=o.create,n.toCanvas=l.bind(null,i.render),n.toDataURL=l.bind(null,i.renderToDataURL),// only svg for now.
n.toString=l.bind(null,function(t,e,n){return a.render(t,n)})},{da1f68cc1fc16077:"2F9VO","8c6cf49ef2287430":"e9qY0","8a60cf7722cc14ce":"i1BDL",f6fcc816b915ba37:"8CcR1"}],"2F9VO":[function(t,e,n){// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
e.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},{}],e9qY0:[function(t,e,n){let r=t("4cf6a8173d9f3a2"),o=t("2ad62f61c352884c"),i=t("87d5a6270eb1dc26"),a=t("91abc94f777368cc"),l=t("9737c3939ab85d95"),s=t("cee3d371e219e45e"),c=t("8700c8c682afabf3"),u=t("65ad903a6ba3e"),d=t("1e8e447afb4d169c"),f=t("8a4a19af97836d80"),g=t("26720f9d94c9e268"),h=t("7b6429a248ecc51f"),m=t("1368d0fa14524351");/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */function p(t,e,n){let r,o;let i=t.size,a=g.getEncodedBits(e,n);for(r=0;r<15;r++)o=(a>>r&1)==1,r<6?t.set(r,8,o,!0):r<8?t.set(r+1,8,o,!0):t.set(i-15+r,8,o,!0),r<8?t.set(8,i-r-1,o,!0):r<9?t.set(8,15-r-1+1,o,!0):t.set(8,15-r-1,o,!0);// fixed module
t.set(i-8,8,1,!0)}/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */n.create=function(t,e){let n,g;if(void 0===t||""===t)throw Error("No input text");let y=o.M;return void 0!==e&&(// Use higher error correction level as default
y=o.from(e.errorCorrectionLevel,o.M),n=f.from(e.version),g=c.from(e.maskPattern),e.toSJISFunc&&r.setToSJISFunction(e.toSJISFunc)),/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */function(t,e,n,o){let g;if(Array.isArray(t))g=m.fromArray(t);else if("string"==typeof t){let r=e;if(!r){let e=m.rawSplit(t);// Estimate best version that can contain raw splitted segments
r=f.getBestVersionForData(e,n)}// Build optimized segments
// If estimated version is undefined, try with the highest version
g=m.fromString(t,r||40)}else throw Error("Invalid data");// Get the min version that can contain data
let y=f.getBestVersionForData(g,n);// If no version is found, data cannot be stored
if(!y)throw Error("The amount of data is too big to be stored in a QR Code");// If not specified, use min version as default
if(e){if(e<y)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+y+".\n")}else e=y;let E=/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */function(t,e,n){// Prepare data buffer
let o=new i;n.forEach(function(e){// prefix data with mode indicator (4 bits)
o.put(e.mode.bit,4),// Prefix data with character count indicator.
// The character count indicator is a string of bits that represents the
// number of characters that are being encoded.
// The character count indicator must be placed after the mode indicator
// and must be a certain number of bits long, depending on the QR version
// and data mode
// @see {@link Mode.getCharCountIndicator}.
o.put(e.getLength(),h.getCharCountIndicator(e.mode,t)),// add binary data sequence to buffer
e.write(o)});// Calculate required number of bits
let a=r.getSymbolTotalCodewords(t),l=u.getTotalCodewordsCount(t,e),s=(a-l)*8;// If the bit string is fewer than four bits shorter, add only the number of 0s that
// are needed to reach the required number of bits.
// After adding the terminator, if the number of bits in the string is not a multiple of 8,
// pad the string on the right with 0s to make the string's length a multiple of 8.
for(o.getLengthInBits()+4<=s&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(0);// Add pad bytes if the string is still shorter than the total number of required bits.
// Extend the buffer to fill the data capacity of the symbol corresponding to
// the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
// and 00010001 (0x11) alternately.
let c=(s-o.getLengthInBits())/8;for(let t=0;t<c;t++)o.put(t%2?17:236,8);return(/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */function(t,e,n){let o,i;// Total codewords for this QR code version (Data + Error correction)
let a=r.getSymbolTotalCodewords(e),l=u.getTotalCodewordsCount(e,n),s=a-l,c=u.getBlocksCount(e,n),f=a%c,g=c-f,h=Math.floor(a/c),m=Math.floor(s/c),p=m+1,y=h-m,E=new d(y),w=0,b=Array(c),I=Array(c),B=0,v=new Uint8Array(t.buffer);// Divide the buffer into the required number of blocks
for(let t=0;t<c;t++){let e=t<g?m:p;// extract a block of data from buffer
b[t]=v.slice(w,w+e),// Calculate EC codewords for this data block
I[t]=E.encode(b[t]),w+=e,B=Math.max(B,e)}// Create final data
// Interleave the data and error correction codewords from each block
let C=new Uint8Array(a),N=0;// Add data codewords
for(o=0;o<B;o++)for(i=0;i<c;i++)o<b[i].length&&(C[N++]=b[i][o]);// Apped EC codewords
for(o=0;o<y;o++)for(i=0;i<c;i++)C[N++]=I[i][o];return C}(o,t,e))}(e,n,g),w=r.getSymbolSize(e),b=new a(w);return(// Add function modules
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*//**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(t,e){let n=t.size,r=s.getPositions(e);for(let e=0;e<r.length;e++){let o=r[e][0],i=r[e][1];for(let e=-1;e<=7;e++)if(!(o+e<=-1)&&!(n<=o+e))for(let r=-1;r<=7;r++)i+r<=-1||n<=i+r||(e>=0&&e<=6&&(0===r||6===r)||r>=0&&r<=6&&(0===e||6===e)||e>=2&&e<=4&&r>=2&&r<=4?t.set(o+e,i+r,!0,!0):t.set(o+e,i+r,!1,!0))}}(b,e),/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */function(t){let e=t.size;for(let n=8;n<e-8;n++){let e=n%2==0;t.set(n,6,e,!0),t.set(6,n,e,!0)}}(b),/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(t,e){let n=l.getPositions(e);for(let e=0;e<n.length;e++){let r=n[e][0],o=n[e][1];for(let e=-2;e<=2;e++)for(let n=-2;n<=2;n++)-2===e||2===e||-2===n||2===n||0===e&&0===n?t.set(r+e,o+n,!0,!0):t.set(r+e,o+n,!1,!0)}}(b,e),// Add temporary dummy bits for format info just to set them as reserved.
// This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
// since the masking operation must be performed only on the encoding region.
// These blocks will be replaced with correct values later in code.
p(b,n,0),e>=7&&/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(t,e){let n,r,o;let i=t.size,a=f.getEncodedBits(e);for(let e=0;e<18;e++)n=Math.floor(e/3),r=e%3+i-8-3,o=(a>>e&1)==1,t.set(n,r,o,!0),t.set(r,n,o,!0)}(b,e),// Add data codewords
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */function(t,e){let n=t.size,r=-1,o=n-1,i=7,a=0;for(let l=n-1;l>0;l-=2)for(6===l&&l--;;){for(let n=0;n<2;n++)if(!t.isReserved(o,l-n)){let r=!1;a<e.length&&(r=(e[a]>>>i&1)==1),t.set(o,l-n,r),-1==--i&&(a++,i=7)}if((o+=r)<0||n<=o){o-=r,r=-r;break}}}(b,E),isNaN(o)&&(o=c.getBestMask(b,p.bind(null,b,n))),// Apply mask pattern
c.applyMask(o,b),// Replace format info bits with correct values
p(b,n,o),{modules:b,version:e,errorCorrectionLevel:n,maskPattern:o,segments:g})}(t,n,y,g)}},{"4cf6a8173d9f3a2":"2iHLf","2ad62f61c352884c":"kU8Fo","87d5a6270eb1dc26":"dvmjt","91abc94f777368cc":"4koKB","9737c3939ab85d95":"2m37T",cee3d371e219e45e:"9BWaM","8700c8c682afabf3":"2hy8U","65ad903a6ba3e":"ivpAq","1e8e447afb4d169c":"ixGQe","8a4a19af97836d80":"61NkN","26720f9d94c9e268":"4DCia","7b6429a248ecc51f":"2XDDf","1368d0fa14524351":"kBoY1"}],"2iHLf":[function(t,e,n){let r;let o=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */n.getSymbolSize=function(t){if(!t)throw Error('"version" cannot be null or undefined');if(t<1||t>40)throw Error('"version" should be in range from 1 to 40');return 4*t+17},/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */n.getSymbolTotalCodewords=function(t){return o[t]},/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */n.getBCHDigit=function(t){let e=0;for(;0!==t;)e++,t>>>=1;return e},n.setToSJISFunction=function(t){if("function"!=typeof t)throw Error('"toSJISFunc" is not a valid function.');r=t},n.isKanjiModeEnabled=function(){return void 0!==r},n.toSJIS=function(t){return r(t)}},{}],kU8Fo:[function(t,e,n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2},n.isValid=function(t){return t&&void 0!==t.bit&&t.bit>=0&&t.bit<4},n.from=function(t,e){if(n.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw Error("Param is not a string");let e=t.toLowerCase();switch(e){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw Error("Unknown EC Level: "+t)}}(t)}catch(t){return e}}},{}],dvmjt:[function(t,e,n){function r(){this.buffer=[],this.length=0}r.prototype={get:function(t){return(this.buffer[Math.floor(t/8)]>>>7-t%8&1)==1},put:function(t,e){for(let n=0;n<e;n++)this.putBit((t>>>e-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(t){let e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},e.exports=r},{}],"4koKB":[function(t,e,n){/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */function r(t){if(!t||t<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */r.prototype.set=function(t,e,n,r){let o=t*this.size+e;this.data[o]=n,r&&(this.reservedBit[o]=!0)},/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */r.prototype.get=function(t,e){return this.data[t*this.size+e]},/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */r.prototype.xor=function(t,e,n){this.data[t*this.size+e]^=n},/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */r.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},e.exports=r},{}],"2m37T":[function(t,e,n){/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */let r=t("3fa093180e62a22a").getSymbolSize;/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */n.getRowColCoords=function(t){if(1===t)return[];let e=Math.floor(t/7)+2,n=r(t),o=145===n?26:2*Math.ceil((n-13)/(2*e-2)),i=[n-7]// Last coord is always (size - 7)
;for(let t=1;t<e-1;t++)i[t]=i[t-1]-o;return i.push(6)// First coord is always 6
,i.reverse()},/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */n.getPositions=function(t){let e=[],r=n.getRowColCoords(t),o=r.length;for(let t=0;t<o;t++)for(let n=0;n<o;n++)// Skip if position is occupied by finder patterns
(0!==t||0!==n)&&// top-left
(0!==t||n!==o-1)&&// bottom-left
(t!==o-1||0!==n)&&e.push([r[t],r[n]]);return e}},{"3fa093180e62a22a":"2iHLf"}],"9BWaM":[function(t,e,n){let r=t("6ec9ae5660047293").getSymbolSize;/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */n.getPositions=function(t){let e=r(t);return[// top-left
[0,0],// top-right
[e-7,0],// bottom-left
[0,e-7]]}},{"6ec9ae5660047293":"2iHLf"}],"2hy8U":[function(t,e,n){/**
 * Data mask pattern reference
 * @type {Object}
 */n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */let r={N1:3,N2:3,N3:40,N4:10};/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */n.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */n.from=function(t){return n.isValid(t)?parseInt(t,10):void 0},/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/n.getPenaltyN1=function(t){let e=t.size,n=0,o=0,i=0,a=null,l=null;for(let s=0;s<e;s++){o=i=0,a=l=null;for(let c=0;c<e;c++){let e=t.get(s,c);e===a?o++:(o>=5&&(n+=r.N1+(o-5)),a=e,o=1),(e=t.get(c,s))===l?i++:(i>=5&&(n+=r.N1+(i-5)),l=e,i=1)}o>=5&&(n+=r.N1+(o-5)),i>=5&&(n+=r.N1+(i-5))}return n},/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */n.getPenaltyN2=function(t){let e=t.size,n=0;for(let r=0;r<e-1;r++)for(let o=0;o<e-1;o++){let e=t.get(r,o)+t.get(r,o+1)+t.get(r+1,o)+t.get(r+1,o+1);(4===e||0===e)&&n++}return n*r.N2},/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */n.getPenaltyN3=function(t){let e=t.size,n=0,o=0,i=0;for(let r=0;r<e;r++){o=i=0;for(let a=0;a<e;a++)o=o<<1&2047|t.get(r,a),a>=10&&(1488===o||93===o)&&n++,i=i<<1&2047|t.get(a,r),a>=10&&(1488===i||93===i)&&n++}return n*r.N3},/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */n.getPenaltyN4=function(t){let e=0,n=t.data.length;for(let r=0;r<n;r++)e+=t.data[r];let o=Math.abs(Math.ceil(100*e/n/5)-10);return o*r.N4},/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */n.applyMask=function(t,e){let r=e.size;for(let o=0;o<r;o++)for(let i=0;i<r;i++)e.isReserved(i,o)||e.xor(i,o,/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */function(t,e,r){switch(t){case n.Patterns.PATTERN000:return(e+r)%2==0;case n.Patterns.PATTERN001:return e%2==0;case n.Patterns.PATTERN010:return r%3==0;case n.Patterns.PATTERN011:return(e+r)%3==0;case n.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case n.Patterns.PATTERN101:return e*r%2+e*r%3==0;case n.Patterns.PATTERN110:return(e*r%2+e*r%3)%2==0;case n.Patterns.PATTERN111:return(e*r%3+(e+r)%2)%2==0;default:throw Error("bad maskPattern:"+t)}}(t,i,o))},/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */n.getBestMask=function(t,e){let r=Object.keys(n.Patterns).length,o=0,i=1/0;for(let a=0;a<r;a++){e(a),n.applyMask(a,t);// Calculate penalty
let r=n.getPenaltyN1(t)+n.getPenaltyN2(t)+n.getPenaltyN3(t)+n.getPenaltyN4(t);// Undo previously applied mask
n.applyMask(a,t),r<i&&(i=r,o=a)}return o}},{}],ivpAq:[function(t,e,n){let r=t("7baaa530584d1bc4"),o=[// L  M  Q  H
1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[// L  M  Q  H
7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */n.getBlocksCount=function(t,e){switch(e){case r.L:return o[(t-1)*4+0];case r.M:return o[(t-1)*4+1];case r.Q:return o[(t-1)*4+2];case r.H:return o[(t-1)*4+3];default:return}},/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */n.getTotalCodewordsCount=function(t,e){switch(e){case r.L:return i[(t-1)*4+0];case r.M:return i[(t-1)*4+1];case r.Q:return i[(t-1)*4+2];case r.H:return i[(t-1)*4+3];default:return}}},{"7baaa530584d1bc4":"kU8Fo"}],ixGQe:[function(t,e,n){let r=t("742a7ee6d6a2d145");function o(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */o.prototype.initialize=function(t){// create an irreducible generator polynomial
this.degree=t,this.genPoly=r.generateECPolynomial(this.degree)},/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */o.prototype.encode=function(t){if(!this.genPoly)throw Error("Encoder not initialized");// Calculate EC for this data block
// extends data size to data+genPoly size
let e=new Uint8Array(t.length+this.degree);e.set(t);// The error correction codewords are the remainder after dividing the data codewords
// by a generator polynomial
let n=r.mod(e,this.genPoly),o=this.degree-n.length;if(o>0){let t=new Uint8Array(this.degree);return t.set(n,o),t}return n},e.exports=o},{"742a7ee6d6a2d145":"bFrZA"}],bFrZA:[function(t,e,n){let r=t("780c74029318268c");/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */n.mul=function(t,e){let n=new Uint8Array(t.length+e.length-1);for(let o=0;o<t.length;o++)for(let i=0;i<e.length;i++)n[o+i]^=r.mul(t[o],e[i]);return n},/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */n.mod=function(t,e){let n=new Uint8Array(t);for(;n.length-e.length>=0;){let t=n[0];for(let o=0;o<e.length;o++)n[o]^=r.mul(e[o],t);// remove all zeros from buffer head
let o=0;for(;o<n.length&&0===n[o];)o++;n=n.slice(o)}return n},/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */n.generateECPolynomial=function(t){let e=new Uint8Array([1]);for(let o=0;o<t;o++)e=n.mul(e,new Uint8Array([1,r.exp(o)]));return e}},{"780c74029318268c":"3WlDl"}],"3WlDl":[function(t,e,n){let r=new Uint8Array(512),o=new Uint8Array(256)/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */;!function(){let t=1;for(let e=0;e<255;e++)r[e]=t,o[t]=e,256&(t<<=1// multiply by 2
)&&(t^=285);// Optimization: double the size of the anti-log table so that we don't need to mod 255 to
// stay inside the bounds (because we will mainly use this table for the multiplication of
// two GF numbers, no more).
// @see {@link mul}
for(let t=255;t<512;t++)r[t]=r[t-255]}(),/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.log=function(t){if(t<1)throw Error("log("+t+")");return o[t]},/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.exp=function(t){return r[t]},/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */n.mul=function(t,e){return 0===t||0===e?0:r[o[t]+o[e]]}},{}],"61NkN":[function(t,e,n){let r=t("f67b02cdf61cb7c6"),o=t("777da0d92c463f2e"),i=t("acd5b4fcd696edf3"),a=t("5303c314c4a688d7"),l=t("663d0e03da8b2897"),s=r.getBCHDigit(7973);function c(t,e){// Character count indicator + mode indicator bits
return a.getCharCountIndicator(t,e)+4}/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */n.from=function(t,e){return l.isValid(t)?parseInt(t,10):e},/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */n.getCapacity=function(t,e,n){if(!l.isValid(t))throw Error("Invalid QR Code version");// Use Byte mode as default
void 0===n&&(n=a.BYTE);// Total codewords for this QR code version (Data + Error correction)
let i=r.getSymbolTotalCodewords(t),s=o.getTotalCodewordsCount(t,e),u=(i-s)*8;if(n===a.MIXED)return u;let d=u-c(n,t);// Return max number of storable codewords
switch(n){case a.NUMERIC:return Math.floor(d/10*3);case a.ALPHANUMERIC:return Math.floor(d/11*2);case a.KANJI:return Math.floor(d/13);case a.BYTE:default:return Math.floor(d/8)}},/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */n.getBestVersionForData=function(t,e){let r;let o=i.from(e,i.M);if(Array.isArray(t)){if(t.length>1)return function(t,e){for(let r=1;r<=40;r++){let o=function(t,e){let n=0;return t.forEach(function(t){let r=c(t.mode,e);n+=r+t.getBitsLength()}),n}(t,r);if(o<=n.getCapacity(r,e,a.MIXED))return r}}(t,o);if(0===t.length)return 1;r=t[0]}else r=t;return function(t,e,r){for(let o=1;o<=40;o++)if(e<=n.getCapacity(o,r,t))return o}(r.mode,r.getLength(),o)},/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */n.getEncodedBits=function(t){if(!l.isValid(t)||t<7)throw Error("Invalid QR Code version");let e=t<<12;for(;r.getBCHDigit(e)-s>=0;)e^=7973<<r.getBCHDigit(e)-s;return t<<12|e}},{f67b02cdf61cb7c6:"2iHLf","777da0d92c463f2e":"ivpAq",acd5b4fcd696edf3:"kU8Fo","5303c314c4a688d7":"2XDDf","663d0e03da8b2897":"dFhhu"}],"2XDDf":[function(t,e,n){let r=t("488660fac9162579"),o=t("a23fd227d32f3622");/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */n.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */n.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */n.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */n.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */n.MIXED={bit:-1},/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */n.getCharCountIndicator=function(t,e){if(!t.ccBits)throw Error("Invalid mode: "+t);if(!r.isValid(e))throw Error("Invalid version: "+e);return e>=1&&e<10?t.ccBits[0]:e<27?t.ccBits[1]:t.ccBits[2]},/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */n.getBestModeForData=function(t){return o.testNumeric(t)?n.NUMERIC:o.testAlphanumeric(t)?n.ALPHANUMERIC:o.testKanji(t)?n.KANJI:n.BYTE},/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */n.toString=function(t){if(t&&t.id)return t.id;throw Error("Invalid mode")},/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */n.isValid=function(t){return t&&t.bit&&t.ccBits},/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */n.from=function(t,e){if(n.isValid(t))return t;try{return(/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */function(t){if("string"!=typeof t)throw Error("Param is not a string");let e=t.toLowerCase();switch(e){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw Error("Unknown mode: "+t)}}(t))}catch(t){return e}}},{"488660fac9162579":"dFhhu",a23fd227d32f3622:"fkiQV"}],dFhhu:[function(t,e,n){/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */n.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}},{}],fkiQV:[function(t,e,n){let r="[0-9]+",o="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";o=o.replace(/u/g,"\\u");let i="(?:(?![A-Z0-9 $%*+\\-./:]|"+o+")(?:.|[\r\n]))+";n.KANJI=RegExp(o,"g"),n.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),n.BYTE=RegExp(i,"g"),n.NUMERIC=RegExp(r,"g"),n.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let a=RegExp("^"+o+"$"),l=RegExp("^"+r+"$"),s=RegExp("^[A-Z0-9 $%*+\\-./:]+$");n.testKanji=function(t){return a.test(t)},n.testNumeric=function(t){return l.test(t)},n.testAlphanumeric=function(t){return s.test(t)}},{}],"4DCia":[function(t,e,n){let r=t("eeca831a42e85d6c"),o=r.getBCHDigit(1335);/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */n.getEncodedBits=function(t,e){let n=t.bit<<3|e,i=n<<10;for(;r.getBCHDigit(i)-o>=0;)i^=1335<<r.getBCHDigit(i)-o;// xor final data with mask pattern in order to ensure that
// no combination of Error Correction Level and data mask pattern
// will result in an all-zero data string
return(n<<10|i)^21522}},{eeca831a42e85d6c:"2iHLf"}],kBoY1:[function(t,e,n){let r=t("45f6d4bff9d2fc72"),o=t("73109cbf4f3c309d"),i=t("5320016e34c30467"),a=t("fd16f8f25b581951"),l=t("8a7b84039f1cf0d2"),s=t("79379a3a8f3c26bb"),c=t("66903ca51bd2ea1d"),u=t("3b9f47d541e7d71f");/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */function d(t){return unescape(encodeURIComponent(t)).length}/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */function f(t,e,n){let r;let o=[];for(;null!==(r=t.exec(n));)o.push({data:r[0],index:r.index,mode:e,length:r[0].length});return o}/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */function g(t){let e,n;let o=f(s.NUMERIC,r.NUMERIC,t),i=f(s.ALPHANUMERIC,r.ALPHANUMERIC,t);c.isKanjiModeEnabled()?(e=f(s.BYTE,r.BYTE,t),n=f(s.KANJI,r.KANJI,t)):(e=f(s.BYTE_KANJI,r.BYTE,t),n=[]);let a=o.concat(i,e,n);return a.sort(function(t,e){return t.index-e.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */function h(t,e){switch(e){case r.NUMERIC:return o.getBitsLength(t);case r.ALPHANUMERIC:return i.getBitsLength(t);case r.KANJI:return l.getBitsLength(t);case r.BYTE:return a.getBitsLength(t)}}/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */function m(t,e){let n;let s=r.getBestModeForData(t);// Make sure data can be encoded
if((n=r.from(e,s))!==r.BYTE&&n.bit<s.bit)throw Error('"'+t+'" cannot be encoded with mode '+r.toString(n)+".\n Suggested mode is: "+r.toString(s));switch(n!==r.KANJI||c.isKanjiModeEnabled()||(n=r.BYTE),n){case r.NUMERIC:return new o(t);case r.ALPHANUMERIC:return new i(t);case r.KANJI:return new l(t);case r.BYTE:return new a(t)}}/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */n.fromArray=function(t){return t.reduce(function(t,e){return"string"==typeof e?t.push(m(e,null)):e.data&&t.push(m(e.data,e.mode)),t},[])},/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */n.fromString=function(t,e){let o=g(t,c.isKanjiModeEnabled()),i=/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */function(t){let e=[];for(let n=0;n<t.length;n++){let o=t[n];switch(o.mode){case r.NUMERIC:e.push([o,{data:o.data,mode:r.ALPHANUMERIC,length:o.length},{data:o.data,mode:r.BYTE,length:o.length}]);break;case r.ALPHANUMERIC:e.push([o,{data:o.data,mode:r.BYTE,length:o.length}]);break;case r.KANJI:e.push([o,{data:o.data,mode:r.BYTE,length:d(o.data)}]);break;case r.BYTE:e.push([{data:o.data,mode:r.BYTE,length:d(o.data)}])}}return e}(o),a=/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */function(t,e){let n={},o={start:{}},i=["start"];for(let a=0;a<t.length;a++){let l=t[a],s=[];for(let t=0;t<l.length;t++){let c=l[t],u=""+a+t;s.push(u),n[u]={node:c,lastCount:0},o[u]={};for(let t=0;t<i.length;t++){let a=i[t];n[a]&&n[a].node.mode===c.mode?(o[a][u]=h(n[a].lastCount+c.length,c.mode)-h(n[a].lastCount,c.mode),n[a].lastCount+=c.length):(n[a]&&(n[a].lastCount=c.length),o[a][u]=h(c.length,c.mode)+4+r.getCharCountIndicator(c.mode,e)// switch cost
)}}i=s}for(let t=0;t<i.length;t++)o[i[t]].end=0;return{map:o,table:n}}(i,e),l=u.find_path(a.map,"start","end"),s=[];for(let t=1;t<l.length-1;t++)s.push(a.table[l[t]].node);return n.fromArray(s.reduce(function(t,e){let n=t.length-1>=0?t[t.length-1]:null;return n&&n.mode===e.mode?t[t.length-1].data+=e.data:t.push(e),t},[]))},/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */n.rawSplit=function(t){return n.fromArray(g(t,c.isKanjiModeEnabled()))}},{"45f6d4bff9d2fc72":"2XDDf","73109cbf4f3c309d":"hTs8T","5320016e34c30467":"203uh",fd16f8f25b581951:"f7sIe","8a7b84039f1cf0d2":"1otz8","79379a3a8f3c26bb":"fkiQV","66903ca51bd2ea1d":"2iHLf","3b9f47d541e7d71f":"2Nh6w"}],hTs8T:[function(t,e,n){let r=t("29134b0b0820b091");function o(t){this.mode=r.NUMERIC,this.data=t.toString()}o.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(t){let e,n;// The input data string is divided into groups of three digits,
// and each group is converted to its 10-bit binary equivalent.
for(e=0;e+3<=this.data.length;e+=3)n=parseInt(this.data.substr(e,3),10),t.put(n,10);// If the number of input digits is not an exact multiple of three,
// the final one or two digits are converted to 4 or 7 bits respectively.
let r=this.data.length-e;r>0&&(n=parseInt(this.data.substr(e),10),t.put(n,3*r+1))},e.exports=o},{"29134b0b0820b091":"2XDDf"}],"203uh":[function(t,e,n){let r=t("9c7c9b869570f846"),o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(t){this.mode=r.ALPHANUMERIC,this.data=t}i.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){let e;// Input data characters are divided into groups of two characters
// and encoded as 11-bit binary codes.
for(e=0;e+2<=this.data.length;e+=2){// The character value of the first character is multiplied by 45
let n=45*o.indexOf(this.data[e]);// The character value of the second digit is added to the product
n+=o.indexOf(this.data[e+1]),// The sum is then stored as 11-bit binary number
t.put(n,11)}// If the number of input data characters is not a multiple of two,
// the character value of the final character is encoded as a 6-bit binary number.
this.data.length%2&&t.put(o.indexOf(this.data[e]),6)},e.exports=i},{"9c7c9b869570f846":"2XDDf"}],f7sIe:[function(t,e,n){let r=t("1658cb836325c397"),o=t("a20a51f6cd184253");function i(t){this.mode=o.BYTE,"string"==typeof t&&(t=r(t)),this.data=new Uint8Array(t)}i.getBitsLength=function(t){return 8*t},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){for(let e=0,n=this.data.length;e<n;e++)t.put(this.data[e],8)},e.exports=i},{"1658cb836325c397":"lmLJ0",a20a51f6cd184253:"2XDDf"}],lmLJ0:[function(t,e,n){e.exports=function(t){for(var e=[],n=t.length,r=0;r<n;r++){var o=t.charCodeAt(r);if(o>=55296&&o<=56319&&n>r+1){var i=t.charCodeAt(r+1);i>=56320&&i<=57343&&(// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
o=(o-55296)*1024+i-56320+65536,r+=1)}// US-ASCII
if(o<128){e.push(o);continue}// 2-byte UTF-8
if(o<2048){e.push(o>>6|192),e.push(63&o|128);continue}// 3-byte UTF-8
if(o<55296||o>=57344&&o<65536){e.push(o>>12|224),e.push(o>>6&63|128),e.push(63&o|128);continue}// 4-byte UTF-8
if(o>=65536&&o<=1114111){e.push(o>>18|240),e.push(o>>12&63|128),e.push(o>>6&63|128),e.push(63&o|128);continue}// Invalid character
e.push(239,191,189)}return new Uint8Array(e).buffer}},{}],"1otz8":[function(t,e,n){let r=t("b935cfd1cd03a1f6"),o=t("ca4944585cc8d12d");function i(t){this.mode=r.KANJI,this.data=t}i.getBitsLength=function(t){return 13*t},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){let e;// In the Shift JIS system, Kanji characters are represented by a two byte combination.
// These byte values are shifted from the JIS X 0208 values.
// JIS X 0208 gives details of the shift coded representation.
for(e=0;e<this.data.length;e++){let n=o.toSJIS(this.data[e]);// For characters with Shift JIS values from 0x8140 to 0x9FFC:
if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error("Invalid SJIS character: "+this.data[e]+"\nMake sure your charset is UTF-8");// Multiply most significant byte of result by 0xC0
// and add least significant byte to product
n=(n>>>8&255)*192+(255&n),// Convert result to a 13-bit binary string
t.put(n,13)}},e.exports=i},{b935cfd1cd03a1f6:"2XDDf",ca4944585cc8d12d:"2iHLf"}],"2Nh6w":[function(t,e,n){/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/var r={single_source_shortest_paths:function(t,e,n){// Predecessor map for each node that has been encountered.
// node ID => predecessor node ID
var o,i,a,l,s,c,u,d={},f={};f[e]=0;// Costs of shortest paths from s to all nodes encountered; differs from
// `costs` in that it provides easy access to the node that currently has
// the known shortest path from s.
// XXX: Do we actually need both `costs` and `open`?
var g=r.PriorityQueue.make();for(g.push(e,0);!g.empty();)// ...and explore the edges that connect u to those nodes, updating
// the cost of the shortest paths to any or all of those nodes as
// necessary. v is the node across the current edge from u.
for(a in i=// In the nodes remaining in graph that have a known cost from s,
// find the node, u, that currently has the shortest path from s.
(o=g.pop()).value,l=o.cost,// Get nodes adjacent to u...
s=t[i]||{})s.hasOwnProperty(a)&&(// Cost of s to u plus the cost of u to v across e--this is *a*
// cost from s to v that may or may not be less than the current
// known cost to v.
c=l+s[a],// If we haven't visited v yet OR if the current known cost from s to
// v is greater than the new cost we just found (cost of s to u plus
// cost of u to v across e), update v's cost in the cost list and
// update v's predecessor in the predecessor list (it's now u).
u=f[a],(void 0===f[a]||u>c)&&(f[a]=c,g.push(a,c),d[a]=i));if(void 0!==n&&void 0===f[n])throw Error(["Could not find a path from ",e," to ",n,"."].join(""));return d},extract_shortest_path_from_predecessor_list:function(t,e){for(var n=[],r=e;r;)n.push(r),t[r],r=t[r];return n.reverse(),n},find_path:function(t,e,n){var o=r.single_source_shortest_paths(t,e,n);return r.extract_shortest_path_from_predecessor_list(o,n)},/**
   * A very naive priority queue implementation.
   */PriorityQueue:{make:function(t){var e,n=r.PriorityQueue,o={};for(e in t=t||{},n)n.hasOwnProperty(e)&&(o[e]=n[e]);return o.queue=[],o.sorter=t.sorter||n.default_sorter,o},default_sorter:function(t,e){return t.cost-e.cost},/**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */push:function(t,e){this.queue.push({value:t,cost:e}),this.queue.sort(this.sorter)},/**
     * Return the highest priority element in the queue.
     */pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};e.exports=r},{}],i1BDL:[function(t,e,n){let r=t("5b3f7c513802d6c7");n.render=function(t,e,n){var o;let i=n,a=e;void 0!==i||e&&e.getContext||(i=e,e=void 0),e||(a=function(){try{return document.createElement("canvas")}catch(t){throw Error("You need to specify a canvas element")}}()),i=r.getOptions(i);let l=r.getImageWidth(t.modules.size,i),s=a.getContext("2d"),c=s.createImageData(l,l);return r.qrToImageData(c.data,t,i),o=a,s.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=l,o.width=l,o.style.height=l+"px",o.style.width=l+"px",s.putImageData(c,0,0),a},n.renderToDataURL=function(t,e,r){let o=r;void 0!==o||e&&e.getContext||(o=e,e=void 0),o||(o={});let i=n.render(t,e,o),a=o.type||"image/png",l=o.rendererOpts||{};return i.toDataURL(a,l.quality)}},{"5b3f7c513802d6c7":"3YBlJ"}],"3YBlJ":[function(t,e,n){function r(t){if("number"==typeof t&&(t=t.toString()),"string"!=typeof t)throw Error("Color should be defined as hex string");let e=t.slice().replace("#","").split("");if(e.length<3||5===e.length||e.length>8)throw Error("Invalid hex color: "+t);(3===e.length||4===e.length)&&(e=Array.prototype.concat.apply([],e.map(function(t){return[t,t]}))),6===e.length&&e.push("F","F");let n=parseInt(e.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:255&n,hex:"#"+e.slice(0,6).join("")}}n.getOptions=function(t){t||(t={}),t.color||(t.color={});let e=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,n=t.width&&t.width>=21?t.width:void 0,o=t.scale||4;return{width:n,scale:n?4:o,margin:e,color:{dark:r(t.color.dark||"#000000ff"),light:r(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},n.getScale=function(t,e){return e.width&&e.width>=t+2*e.margin?e.width/(t+2*e.margin):e.scale},n.getImageWidth=function(t,e){let r=n.getScale(t,e);return Math.floor((t+2*e.margin)*r)},n.qrToImageData=function(t,e,r){let o=e.modules.size,i=e.modules.data,a=n.getScale(o,r),l=Math.floor((o+2*r.margin)*a),s=r.margin*a,c=[r.color.light,r.color.dark];for(let e=0;e<l;e++)for(let n=0;n<l;n++){let u=(e*l+n)*4,d=r.color.light;if(e>=s&&n>=s&&e<l-s&&n<l-s){let t=Math.floor((e-s)/a),r=Math.floor((n-s)/a);d=c[i[t*o+r]?1:0]}t[u++]=d.r,t[u++]=d.g,t[u++]=d.b,t[u]=d.a}}},{}],"8CcR1":[function(t,e,n){let r=t("c36bbcf663291acc");function o(t,e){let n=t.a/255,r=e+'="'+t.hex+'"';return n<1?r+" "+e+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function i(t,e,n){let r=t+e;return void 0!==n&&(r+=" "+n),r}n.render=function(t,e,n){let a=r.getOptions(e),l=t.modules.size,s=t.modules.data,c=l+2*a.margin,u=a.color.light.a?"<path "+o(a.color.light,"fill")+' d="M0 0h'+c+"v"+c+'H0z"/>':"",d="<path "+o(a.color.dark,"stroke")+' d="'+function(t,e,n){let r="",o=0,a=!1,l=0;for(let s=0;s<t.length;s++){let c=Math.floor(s%e),u=Math.floor(s/e);c||a||(a=!0),t[s]?(l++,s>0&&c>0&&t[s-1]||(r+=a?i("M",c+n,.5+u+n):i("m",o,0),o=0,a=!1),c+1<e&&t[s+1]||(r+=i("h",l),l=0)):o++}return r}(s,l,a.margin)+'"/>',f=a.width?'width="'+a.width+'" height="'+a.width+'" ':"",g='<svg xmlns="http://www.w3.org/2000/svg" '+f+('viewBox="0 0 '+c)+" "+c+'" shape-rendering="crispEdges">'+u+d+"</svg>\n";return"function"==typeof n&&n(null,g),g}},{c36bbcf663291acc:"3YBlJ"}],bNgzC:[function(t,e,n){n.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},n.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.exportAll=function(t,e){return Object.keys(t).forEach(function(n){"default"===n||"__esModule"===n||e.hasOwnProperty(n)||Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[n]}})}),e},n.export=function(t,e,n){Object.defineProperty(t,e,{enumerable:!0,get:n})}},{}]},["2mRjC"],"2mRjC","parcelRequire81ca")//# sourceMappingURL=lwl.js.map
;
//# sourceMappingURL=lwl.js.map
