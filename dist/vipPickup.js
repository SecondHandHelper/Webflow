!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(e,t,n,r,o){/* eslint-disable no-undef */var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof i[r]&&i[r],s=a.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(t,n){if(!s[t]){if(!e[t]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var o="function"==typeof i[r]&&i[r];if(!n&&o)return o(t,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(a)return a(t,!0);// Try the node require function if it exists.
if(l&&"string"==typeof t)return l(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}f.resolve=function(n){var r=e[t][1][n];return null!=r?r:n},f.cache={};var d=s[t]=new u.Module(t);e[t][0].call(d.exports,f,d,d.exports,this)}return s[t].exports;function f(e){var t=f.resolve(e);return!1===t?{}:u(t)}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=s,u.parent=a,u.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(u,"root",{get:function(){return i[r]}}),i[r]=u;for(var c=0;c<t.length;c++)u(t[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var d=u(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=d:"function"==typeof define&&define.amd?define(function(){return d}):o&&(this[o]=d)}}({eLALs:[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js"),o=e("./general"),i=e("qrcode"),a=r.interopDefault(i);// Track VIP pickup button clicks with Intercom
function s(){["bookVipPickupCtaButton","stickyBookVipPickupButton","centerBookVipPickupButton"].forEach(e=>{let t=document.getElementById(e);t&&t.addEventListener("click",()=>{"function"==typeof Intercom&&Intercom("startSurvey",57206742)})})}// Setup tracking after Intercom is loaded
if(!// Load recently sold items
function(){let e=callBackendApi("/api/items/recentlySold");e.then(e=>{// Read result of the Cloud Function.
let t=document.getElementById("itemListRecentlySold1");t.innerHTML="",e.data.forEach((e,n)=>{let r=e.brand,i=e.soldPrice,a=new Date(e.soldDate),s=new Date(e.publishedDate),l=(0,o.itemCoverImage)(e),u=Math.floor((a.getTime()-s.getTime())/864e5);if(i>=180||u<=20){let e=`<div class="item-card-recently-sold"><div class="ratio-box _16-9"><div class="content-block with-image">
                        <div class="img-container" style="background-image: url('${l}');"></div></div></div>
                        <div>
                        <div>${r}</div>
                        <div>S\xe5ld f\xf6r ${i} kr</div>
                        </div>
                        </div>`;t.innerHTML+=e}}),// Start auto-scroll after items are loaded
function(e){if(!e)return;let t=!0,n=null,r=!1,o=e.scrollLeft,i=e.scrollWidth-e.clientWidth;if(i<=0)return;// No scrolling needed
let a=()=>{if(!t)return;let i=e.scrollLeft,s=e.scrollWidth-e.clientWidth;// Stop if we've reached the end
i>=s-1||(// Scroll to the right programmatically
r=!0,e.scrollLeft+=.5,o=e.scrollLeft,r=!1,n=requestAnimationFrame(a))},s=()=>{t=!1,n&&(cancelAnimationFrame(n),n=null)},l=()=>{if(r){o=e.scrollLeft;return}let t=e.scrollLeft;// If scroll changed and it wasn't our programmatic scroll, user is interacting
Math.abs(t-o)>.75?(s(),e.removeEventListener("scroll",l)):o=t};// Listen for direct user interactions (these immediately pause)
e.addEventListener("touchstart",s,{once:!0}),e.addEventListener("mousedown",s,{once:!0}),e.addEventListener("wheel",s,{once:!0}),e.addEventListener("scroll",l),// Start auto-scroll after a short delay to ensure content is rendered
setTimeout(()=>{t&&(o=e.scrollLeft,n=requestAnimationFrame(a))},500)}(t)}).catch(e=>{errorHandler.report(e);// Getting the Error details.
var t=e.code;console.log("Error message: ",e.message,t)});// [END fb_functions_call_add_message_error]
}(),isIos&&function(){let e=document.getElementById("downloadAppLink");e.style.display="flex"}(),// Show intercom messenger
window.intercomSettings={app_id:"klyy0le5"},!function(){var e=window,t=e.Intercom;if("function"==typeof t)t("reattach_activator"),t("update",e.intercomSettings);else{var n=document,r=function(){r.c(arguments)};r.q=[],r.c=function(e){r.q.push(e)},e.Intercom=r;var o=function(){var e=n.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://widget.intercom.io/widget/klyy0le5";var t=n.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)};e.attachEvent?e.attachEvent("onload",o):e.addEventListener("load",o,!1)}}(),"function"==typeof Intercom)s();else{// Wait for Intercom to load
let e=setInterval(()=>{"function"==typeof Intercom&&(clearInterval(e),s())},100);// Timeout after 5 seconds if Intercom doesn't load
setTimeout(()=>clearInterval(e),5e3)}if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){let e=document.getElementById("qrCanvas");e&&(0,a.default).toCanvas(e,window.location.href,function(e){e?(console.error("QR code generation error:",e),errorHandler.report(e)):console.log("QR code generated successfully")})}},{"./general":"1tOWF",qrcode:"6s2CO","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"1tOWF":[function(e,t,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");function o(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),callBackendApi("/api/users/session",{method:"DELETE",requiresAuth:!1,fetchInit:{credentials:"include"}}).catch(e=>{errorHandler.report(e),console.warn("[SSO] Error clearing session cookie:",e)}),location.href="/"}).catch(e=>{errorHandler.report(e),console.log(e)})}function i(e){document.getElementById("addressFirstName").value=e.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=e.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=e.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=e.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=e.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=e.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=e.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function a(){let e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,r=document.getElementById("addressCO").value,o=document.getElementById("addressPostalCode").value,i=document.getElementById("addressCity").value,a=document.getElementById("addressDoorCode").value;return e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",r=r?r.trim():"",{addressFirstName:e,addressLastName:t,addressStreetAddress:n,addressCO:r,addressPostalCode:o=o?o.trim().replace(/\D/g,""):"",addressCity:i=i?i.trim().charAt(0).toUpperCase()+i.trim().slice(1):"",addressDoorCode:a=a?a.trim():""}}function s(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}function l(e){let t=e.replace("-","");return(12!==t.length&&("19"!==t.substring(0,2)||"20"!==t.substring(0,2))&&(t=99>=Number(t.substring(0,2))&&Number(t.substring(0,2))>25?"19"+t:"20"+t),12===t.length)?t:null}function u(e){if(e.images){let t=e.images;return t.modelImageSmall||t.modelImage||t.coverImageSmall||t.coverImage||t.enhancedFrontImageSmall||t.enhancedFrontImage||t.frontImageSmall||t.frontImage}if(e.imagesv2)for(let t of["modelImage","enhancedFrontImage","frontImage"]){let n=e.imagesv2.find(e=>e.name===t);if(n){if(n?.versions?.small)return n.versions.small;if(n?.versions?.medium)return n.versions.medium;if(n?.versions?.large)return n.versions.large;if(n.url)return n.url}}return null}function c(){let e;let t=user.current.referralData.referralCode;if(e=user.current?.maiCircle?"H\xe4r f\xe5r du en exklusiv inbjudan till Mai, som ger en extra fin start med tre kommissionsfria f\xf6rs\xe4ljningar.":"Jag bjuder in dig till Mai f\xf6r att s\xe4lja dina kl\xe4der! G\xe5 genom min l\xe4nk f\xf6r att f\xe5 en extra kommissionsfri f\xf6rs\xe4ljning.",navigator.share)navigator.share({text:e,url:`https://invite.maiapp.se/refer?invite=${t}`}).then(()=>{console.log("Thanks for sharing!")}).catch(e=>{console.error(e),errorHandler.report(e)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=e+"\n"+`https://invite.maiapp.se/refer?invite=${t}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}function d(e){let t=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;t?(document.getElementById("continueOnWebBottomSheet").href=window.location.origin+e,document.getElementById("darkOverlay").classList.add("active"),document.getElementById("channelBottomSheet").classList.add("active")):window.location.href=e}function f(){document.getElementById("darkOverlay").classList.remove("active"),document.getElementById("channelBottomSheet").classList.remove("active")}function h(e){let t=document.getElementById(e);t&&(// Set initial position below screen
t.style.transform="translateY(100%)",t.style.transition="transform 0.3s ease-out",t.style.display="block",// Animate to visible position
setTimeout(()=>{t.style.transform="translateY(0%)"},10),document.getElementById("darkOverlay").classList.add("active"))}function g(e){let t=document.getElementById(e);// Add the visibility check here
t&&"none"!==t.style.display&&(// Animate down and hide
t.style.transform="translateY(100%)",t.style.transition="transform 0.3s ease-in",// Hide after animation completes
setTimeout(()=>{t.style.display="none"},300),document.getElementById("darkOverlay").classList.remove("active"))}function m(e){let t=document.getElementById(e);if(t){t.style.display="none";// Check if there are any remaining visible cards
let e=document.getElementById("infoRequestsList");if(e){let t=e.querySelectorAll('[id^="infoRequest"]:not([style*="display: none"])');if(0===t.length){let e=document.getElementById("infoRequestsDiv");e&&(e.style.display="none")}}}}r.defineInteropFlag(n),r.export(n,"signOut",()=>o),r.export(n,"setFormAddressFields",()=>i),r.export(n,"getFormAddressFields",()=>a),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
r.export(n,"isValidSwedishSsn",()=>s),r.export(n,"formatPersonalId",()=>l),r.export(n,"itemCoverImage",()=>u),r.export(n,"shareCode",()=>c),// Channel bottom sheet
r.export(n,"channelRouter",()=>d),r.export(n,"hideChannelBottomSheet",()=>f),// End of channel bottom sheet
// Toast animation functions
r.export(n,"animateOpenToast",()=>h),r.export(n,"animateCloseToast",()=>g),r.export(n,"hideInfoRequestCard",()=>m)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(e,t,n){n.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},n.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.exportAll=function(e,t){return Object.keys(e).forEach(function(n){"default"===n||"__esModule"===n||t.hasOwnProperty(n)||Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[n]}})}),t},n.export=function(e,t,n){Object.defineProperty(e,t,{enumerable:!0,get:n})}},{}],"6s2CO":[function(e,t,n){let r=e("da1f68cc1fc16077"),o=e("8c6cf49ef2287430"),i=e("8a60cf7722cc14ce"),a=e("f6fcc816b915ba37");function s(e,t,n,i,a){let s=[].slice.call(arguments,1),l=s.length,u="function"==typeof s[l-1];if(!u&&!r())throw Error("Callback required as last argument");if(u){if(l<2)throw Error("Too few arguments provided");2===l?(a=n,n=t,t=i=void 0):3===l&&(t.getContext&&void 0===a?(a=i,i=void 0):(a=i,i=n,n=t,t=void 0))}else{if(l<1)throw Error("Too few arguments provided");return 1===l?(n=t,t=i=void 0):2!==l||t.getContext||(i=n,n=t,t=void 0),new Promise(function(r,a){try{let a=o.create(n,i);r(e(a,t,i))}catch(e){a(e)}})}try{let r=o.create(n,i);a(null,e(r,t,i))}catch(e){a(e)}}n.create=o.create,n.toCanvas=s.bind(null,i.render),n.toDataURL=s.bind(null,i.renderToDataURL),// only svg for now.
n.toString=s.bind(null,function(e,t,n){return a.render(e,n)})},{da1f68cc1fc16077:"2F9VO","8c6cf49ef2287430":"e9qY0","8a60cf7722cc14ce":"i1BDL",f6fcc816b915ba37:"8CcR1"}],"2F9VO":[function(e,t,n){// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
t.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},{}],e9qY0:[function(e,t,n){let r=e("4cf6a8173d9f3a2"),o=e("2ad62f61c352884c"),i=e("87d5a6270eb1dc26"),a=e("91abc94f777368cc"),s=e("9737c3939ab85d95"),l=e("cee3d371e219e45e"),u=e("8700c8c682afabf3"),c=e("65ad903a6ba3e"),d=e("1e8e447afb4d169c"),f=e("8a4a19af97836d80"),h=e("26720f9d94c9e268"),g=e("7b6429a248ecc51f"),m=e("1368d0fa14524351");/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */function p(e,t,n){let r,o;let i=e.size,a=h.getEncodedBits(t,n);for(r=0;r<15;r++)o=(a>>r&1)==1,r<6?e.set(r,8,o,!0):r<8?e.set(r+1,8,o,!0):e.set(i-15+r,8,o,!0),r<8?e.set(8,i-r-1,o,!0):r<9?e.set(8,15-r-1+1,o,!0):e.set(8,15-r-1,o,!0);// fixed module
e.set(i-8,8,1,!0)}/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */n.create=function(e,t){let n,h;if(void 0===e||""===e)throw Error("No input text");let y=o.M;return void 0!==t&&(// Use higher error correction level as default
y=o.from(t.errorCorrectionLevel,o.M),n=f.from(t.version),h=u.from(t.maskPattern),t.toSJISFunc&&r.setToSJISFunction(t.toSJISFunc)),/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */function(e,t,n,o){let h;if(Array.isArray(e))h=m.fromArray(e);else if("string"==typeof e){let r=t;if(!r){let t=m.rawSplit(e);// Estimate best version that can contain raw splitted segments
r=f.getBestVersionForData(t,n)}// Build optimized segments
// If estimated version is undefined, try with the highest version
h=m.fromString(e,r||40)}else throw Error("Invalid data");// Get the min version that can contain data
let y=f.getBestVersionForData(h,n);// If no version is found, data cannot be stored
if(!y)throw Error("The amount of data is too big to be stored in a QR Code");// If not specified, use min version as default
if(t){if(t<y)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+y+".\n")}else t=y;let v=/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */function(e,t,n){// Prepare data buffer
let o=new i;n.forEach(function(t){// prefix data with mode indicator (4 bits)
o.put(t.mode.bit,4),// Prefix data with character count indicator.
// The character count indicator is a string of bits that represents the
// number of characters that are being encoded.
// The character count indicator must be placed after the mode indicator
// and must be a certain number of bits long, depending on the QR version
// and data mode
// @see {@link Mode.getCharCountIndicator}.
o.put(t.getLength(),g.getCharCountIndicator(t.mode,e)),// add binary data sequence to buffer
t.write(o)});// Calculate required number of bits
let a=r.getSymbolTotalCodewords(e),s=c.getTotalCodewordsCount(e,t),l=(a-s)*8;// If the bit string is fewer than four bits shorter, add only the number of 0s that
// are needed to reach the required number of bits.
// After adding the terminator, if the number of bits in the string is not a multiple of 8,
// pad the string on the right with 0s to make the string's length a multiple of 8.
for(o.getLengthInBits()+4<=l&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(0);// Add pad bytes if the string is still shorter than the total number of required bits.
// Extend the buffer to fill the data capacity of the symbol corresponding to
// the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
// and 00010001 (0x11) alternately.
let u=(l-o.getLengthInBits())/8;for(let e=0;e<u;e++)o.put(e%2?17:236,8);return(/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */function(e,t,n){let o,i;// Total codewords for this QR code version (Data + Error correction)
let a=r.getSymbolTotalCodewords(t),s=c.getTotalCodewordsCount(t,n),l=a-s,u=c.getBlocksCount(t,n),f=a%u,h=u-f,g=Math.floor(a/u),m=Math.floor(l/u),p=m+1,y=g-m,v=new d(y),E=0,b=Array(u),I=Array(u),B=0,w=new Uint8Array(e.buffer);// Divide the buffer into the required number of blocks
for(let e=0;e<u;e++){let t=e<h?m:p;// extract a block of data from buffer
b[e]=w.slice(E,E+t),// Calculate EC codewords for this data block
I[e]=v.encode(b[e]),E+=t,B=Math.max(B,t)}// Create final data
// Interleave the data and error correction codewords from each block
let C=new Uint8Array(a),A=0;// Add data codewords
for(o=0;o<B;o++)for(i=0;i<u;i++)o<b[i].length&&(C[A++]=b[i][o]);// Apped EC codewords
for(o=0;o<y;o++)for(i=0;i<u;i++)C[A++]=I[i][o];return C}(o,e,t))}(t,n,h),E=r.getSymbolSize(t),b=new a(E);return(// Add function modules
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
 */function(e,t){let n=e.size,r=l.getPositions(t);for(let t=0;t<r.length;t++){let o=r[t][0],i=r[t][1];for(let t=-1;t<=7;t++)if(!(o+t<=-1)&&!(n<=o+t))for(let r=-1;r<=7;r++)i+r<=-1||n<=i+r||(t>=0&&t<=6&&(0===r||6===r)||r>=0&&r<=6&&(0===t||6===t)||t>=2&&t<=4&&r>=2&&r<=4?e.set(o+t,i+r,!0,!0):e.set(o+t,i+r,!1,!0))}}(b,t),/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */function(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}(b),/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(e,t){let n=s.getPositions(t);for(let t=0;t<n.length;t++){let r=n[t][0],o=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)-2===t||2===t||-2===n||2===n||0===t&&0===n?e.set(r+t,o+n,!0,!0):e.set(r+t,o+n,!1,!0)}}(b,t),// Add temporary dummy bits for format info just to set them as reserved.
// This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
// since the masking operation must be performed only on the encoding region.
// These blocks will be replaced with correct values later in code.
p(b,n,0),t>=7&&/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(e,t){let n,r,o;let i=e.size,a=f.getEncodedBits(t);for(let t=0;t<18;t++)n=Math.floor(t/3),r=t%3+i-8-3,o=(a>>t&1)==1,e.set(n,r,o,!0),e.set(r,n,o,!0)}(b,t),// Add data codewords
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */function(e,t){let n=e.size,r=-1,o=n-1,i=7,a=0;for(let s=n-1;s>0;s-=2)for(6===s&&s--;;){for(let n=0;n<2;n++)if(!e.isReserved(o,s-n)){let r=!1;a<t.length&&(r=(t[a]>>>i&1)==1),e.set(o,s-n,r),-1==--i&&(a++,i=7)}if((o+=r)<0||n<=o){o-=r,r=-r;break}}}(b,v),isNaN(o)&&(o=u.getBestMask(b,p.bind(null,b,n))),// Apply mask pattern
u.applyMask(o,b),// Replace format info bits with correct values
p(b,n,o),{modules:b,version:t,errorCorrectionLevel:n,maskPattern:o,segments:h})}(e,n,y,h)}},{"4cf6a8173d9f3a2":"2iHLf","2ad62f61c352884c":"kU8Fo","87d5a6270eb1dc26":"dvmjt","91abc94f777368cc":"4koKB","9737c3939ab85d95":"2m37T",cee3d371e219e45e:"9BWaM","8700c8c682afabf3":"2hy8U","65ad903a6ba3e":"ivpAq","1e8e447afb4d169c":"ixGQe","8a4a19af97836d80":"61NkN","26720f9d94c9e268":"4DCia","7b6429a248ecc51f":"2XDDf","1368d0fa14524351":"kBoY1"}],"2iHLf":[function(e,t,n){let r;let o=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */n.getSymbolSize=function(e){if(!e)throw Error('"version" cannot be null or undefined');if(e<1||e>40)throw Error('"version" should be in range from 1 to 40');return 4*e+17},/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */n.getSymbolTotalCodewords=function(e){return o[e]},/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */n.getBCHDigit=function(e){let t=0;for(;0!==e;)t++,e>>>=1;return t},n.setToSJISFunction=function(e){if("function"!=typeof e)throw Error('"toSJISFunc" is not a valid function.');r=e},n.isKanjiModeEnabled=function(){return void 0!==r},n.toSJIS=function(e){return r(e)}},{}],kU8Fo:[function(e,t,n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2},n.isValid=function(e){return e&&void 0!==e.bit&&e.bit>=0&&e.bit<4},n.from=function(e,t){if(n.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw Error("Param is not a string");let t=e.toLowerCase();switch(t){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw Error("Unknown EC Level: "+e)}}(e)}catch(e){return t}}},{}],dvmjt:[function(e,t,n){function r(){this.buffer=[],this.length=0}r.prototype={get:function(e){return(this.buffer[Math.floor(e/8)]>>>7-e%8&1)==1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},t.exports=r},{}],"4koKB":[function(e,t,n){/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */function r(e){if(!e||e<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */r.prototype.set=function(e,t,n,r){let o=e*this.size+t;this.data[o]=n,r&&(this.reservedBit[o]=!0)},/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */r.prototype.get=function(e,t){return this.data[e*this.size+t]},/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */r.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */r.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},t.exports=r},{}],"2m37T":[function(e,t,n){/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */let r=e("3fa093180e62a22a").getSymbolSize;/**
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
 */n.getRowColCoords=function(e){if(1===e)return[];let t=Math.floor(e/7)+2,n=r(e),o=145===n?26:2*Math.ceil((n-13)/(2*t-2)),i=[n-7]// Last coord is always (size - 7)
;for(let e=1;e<t-1;e++)i[e]=i[e-1]-o;return i.push(6)// First coord is always 6
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
 */n.getPositions=function(e){let t=[],r=n.getRowColCoords(e),o=r.length;for(let e=0;e<o;e++)for(let n=0;n<o;n++)// Skip if position is occupied by finder patterns
(0!==e||0!==n)&&// top-left
(0!==e||n!==o-1)&&// bottom-left
(e!==o-1||0!==n)&&t.push([r[e],r[n]]);return t}},{"3fa093180e62a22a":"2iHLf"}],"9BWaM":[function(e,t,n){let r=e("6ec9ae5660047293").getSymbolSize;/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */n.getPositions=function(e){let t=r(e);return[// top-left
[0,0],// top-right
[t-7,0],// bottom-left
[0,t-7]]}},{"6ec9ae5660047293":"2iHLf"}],"2hy8U":[function(e,t,n){/**
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
 */n.isValid=function(e){return null!=e&&""!==e&&!isNaN(e)&&e>=0&&e<=7},/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */n.from=function(e){return n.isValid(e)?parseInt(e,10):void 0},/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/n.getPenaltyN1=function(e){let t=e.size,n=0,o=0,i=0,a=null,s=null;for(let l=0;l<t;l++){o=i=0,a=s=null;for(let u=0;u<t;u++){let t=e.get(l,u);t===a?o++:(o>=5&&(n+=r.N1+(o-5)),a=t,o=1),(t=e.get(u,l))===s?i++:(i>=5&&(n+=r.N1+(i-5)),s=t,i=1)}o>=5&&(n+=r.N1+(o-5)),i>=5&&(n+=r.N1+(i-5))}return n},/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */n.getPenaltyN2=function(e){let t=e.size,n=0;for(let r=0;r<t-1;r++)for(let o=0;o<t-1;o++){let t=e.get(r,o)+e.get(r,o+1)+e.get(r+1,o)+e.get(r+1,o+1);(4===t||0===t)&&n++}return n*r.N2},/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */n.getPenaltyN3=function(e){let t=e.size,n=0,o=0,i=0;for(let r=0;r<t;r++){o=i=0;for(let a=0;a<t;a++)o=o<<1&2047|e.get(r,a),a>=10&&(1488===o||93===o)&&n++,i=i<<1&2047|e.get(a,r),a>=10&&(1488===i||93===i)&&n++}return n*r.N3},/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */n.getPenaltyN4=function(e){let t=0,n=e.data.length;for(let r=0;r<n;r++)t+=e.data[r];let o=Math.abs(Math.ceil(100*t/n/5)-10);return o*r.N4},/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */n.applyMask=function(e,t){let r=t.size;for(let o=0;o<r;o++)for(let i=0;i<r;i++)t.isReserved(i,o)||t.xor(i,o,/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */function(e,t,r){switch(e){case n.Patterns.PATTERN000:return(t+r)%2==0;case n.Patterns.PATTERN001:return t%2==0;case n.Patterns.PATTERN010:return r%3==0;case n.Patterns.PATTERN011:return(t+r)%3==0;case n.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(r/3))%2==0;case n.Patterns.PATTERN101:return t*r%2+t*r%3==0;case n.Patterns.PATTERN110:return(t*r%2+t*r%3)%2==0;case n.Patterns.PATTERN111:return(t*r%3+(t+r)%2)%2==0;default:throw Error("bad maskPattern:"+e)}}(e,i,o))},/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */n.getBestMask=function(e,t){let r=Object.keys(n.Patterns).length,o=0,i=1/0;for(let a=0;a<r;a++){t(a),n.applyMask(a,e);// Calculate penalty
let r=n.getPenaltyN1(e)+n.getPenaltyN2(e)+n.getPenaltyN3(e)+n.getPenaltyN4(e);// Undo previously applied mask
n.applyMask(a,e),r<i&&(i=r,o=a)}return o}},{}],ivpAq:[function(e,t,n){let r=e("7baaa530584d1bc4"),o=[// L  M  Q  H
1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[// L  M  Q  H
7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */n.getBlocksCount=function(e,t){switch(t){case r.L:return o[(e-1)*4+0];case r.M:return o[(e-1)*4+1];case r.Q:return o[(e-1)*4+2];case r.H:return o[(e-1)*4+3];default:return}},/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */n.getTotalCodewordsCount=function(e,t){switch(t){case r.L:return i[(e-1)*4+0];case r.M:return i[(e-1)*4+1];case r.Q:return i[(e-1)*4+2];case r.H:return i[(e-1)*4+3];default:return}}},{"7baaa530584d1bc4":"kU8Fo"}],ixGQe:[function(e,t,n){let r=e("742a7ee6d6a2d145");function o(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */o.prototype.initialize=function(e){// create an irreducible generator polynomial
this.degree=e,this.genPoly=r.generateECPolynomial(this.degree)},/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */o.prototype.encode=function(e){if(!this.genPoly)throw Error("Encoder not initialized");// Calculate EC for this data block
// extends data size to data+genPoly size
let t=new Uint8Array(e.length+this.degree);t.set(e);// The error correction codewords are the remainder after dividing the data codewords
// by a generator polynomial
let n=r.mod(t,this.genPoly),o=this.degree-n.length;if(o>0){let e=new Uint8Array(this.degree);return e.set(n,o),e}return n},t.exports=o},{"742a7ee6d6a2d145":"bFrZA"}],bFrZA:[function(e,t,n){let r=e("780c74029318268c");/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */n.mul=function(e,t){let n=new Uint8Array(e.length+t.length-1);for(let o=0;o<e.length;o++)for(let i=0;i<t.length;i++)n[o+i]^=r.mul(e[o],t[i]);return n},/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */n.mod=function(e,t){let n=new Uint8Array(e);for(;n.length-t.length>=0;){let e=n[0];for(let o=0;o<t.length;o++)n[o]^=r.mul(t[o],e);// remove all zeros from buffer head
let o=0;for(;o<n.length&&0===n[o];)o++;n=n.slice(o)}return n},/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */n.generateECPolynomial=function(e){let t=new Uint8Array([1]);for(let o=0;o<e;o++)t=n.mul(t,new Uint8Array([1,r.exp(o)]));return t}},{"780c74029318268c":"3WlDl"}],"3WlDl":[function(e,t,n){let r=new Uint8Array(512),o=new Uint8Array(256)/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */;!function(){let e=1;for(let t=0;t<255;t++)r[t]=e,o[e]=t,256&(e<<=1// multiply by 2
)&&(e^=285);// Optimization: double the size of the anti-log table so that we don't need to mod 255 to
// stay inside the bounds (because we will mainly use this table for the multiplication of
// two GF numbers, no more).
// @see {@link mul}
for(let e=255;e<512;e++)r[e]=r[e-255]}(),/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.log=function(e){if(e<1)throw Error("log("+e+")");return o[e]},/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.exp=function(e){return r[e]},/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */n.mul=function(e,t){return 0===e||0===t?0:r[o[e]+o[t]]}},{}],"61NkN":[function(e,t,n){let r=e("f67b02cdf61cb7c6"),o=e("777da0d92c463f2e"),i=e("acd5b4fcd696edf3"),a=e("5303c314c4a688d7"),s=e("663d0e03da8b2897"),l=r.getBCHDigit(7973);function u(e,t){// Character count indicator + mode indicator bits
return a.getCharCountIndicator(e,t)+4}/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */n.from=function(e,t){return s.isValid(e)?parseInt(e,10):t},/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */n.getCapacity=function(e,t,n){if(!s.isValid(e))throw Error("Invalid QR Code version");// Use Byte mode as default
void 0===n&&(n=a.BYTE);// Total codewords for this QR code version (Data + Error correction)
let i=r.getSymbolTotalCodewords(e),l=o.getTotalCodewordsCount(e,t),c=(i-l)*8;if(n===a.MIXED)return c;let d=c-u(n,e);// Return max number of storable codewords
switch(n){case a.NUMERIC:return Math.floor(d/10*3);case a.ALPHANUMERIC:return Math.floor(d/11*2);case a.KANJI:return Math.floor(d/13);case a.BYTE:default:return Math.floor(d/8)}},/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */n.getBestVersionForData=function(e,t){let r;let o=i.from(t,i.M);if(Array.isArray(e)){if(e.length>1)return function(e,t){for(let r=1;r<=40;r++){let o=function(e,t){let n=0;return e.forEach(function(e){let r=u(e.mode,t);n+=r+e.getBitsLength()}),n}(e,r);if(o<=n.getCapacity(r,t,a.MIXED))return r}}(e,o);if(0===e.length)return 1;r=e[0]}else r=e;return function(e,t,r){for(let o=1;o<=40;o++)if(t<=n.getCapacity(o,r,e))return o}(r.mode,r.getLength(),o)},/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */n.getEncodedBits=function(e){if(!s.isValid(e)||e<7)throw Error("Invalid QR Code version");let t=e<<12;for(;r.getBCHDigit(t)-l>=0;)t^=7973<<r.getBCHDigit(t)-l;return e<<12|t}},{f67b02cdf61cb7c6:"2iHLf","777da0d92c463f2e":"ivpAq",acd5b4fcd696edf3:"kU8Fo","5303c314c4a688d7":"2XDDf","663d0e03da8b2897":"dFhhu"}],"2XDDf":[function(e,t,n){let r=e("488660fac9162579"),o=e("a23fd227d32f3622");/**
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
 */n.getCharCountIndicator=function(e,t){if(!e.ccBits)throw Error("Invalid mode: "+e);if(!r.isValid(t))throw Error("Invalid version: "+t);return t>=1&&t<10?e.ccBits[0]:t<27?e.ccBits[1]:e.ccBits[2]},/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */n.getBestModeForData=function(e){return o.testNumeric(e)?n.NUMERIC:o.testAlphanumeric(e)?n.ALPHANUMERIC:o.testKanji(e)?n.KANJI:n.BYTE},/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */n.toString=function(e){if(e&&e.id)return e.id;throw Error("Invalid mode")},/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */n.isValid=function(e){return e&&e.bit&&e.ccBits},/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */n.from=function(e,t){if(n.isValid(e))return e;try{return(/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */function(e){if("string"!=typeof e)throw Error("Param is not a string");let t=e.toLowerCase();switch(t){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw Error("Unknown mode: "+e)}}(e))}catch(e){return t}}},{"488660fac9162579":"dFhhu",a23fd227d32f3622:"fkiQV"}],dFhhu:[function(e,t,n){/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */n.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}},{}],fkiQV:[function(e,t,n){let r="[0-9]+",o="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";o=o.replace(/u/g,"\\u");let i="(?:(?![A-Z0-9 $%*+\\-./:]|"+o+")(?:.|[\r\n]))+";n.KANJI=RegExp(o,"g"),n.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),n.BYTE=RegExp(i,"g"),n.NUMERIC=RegExp(r,"g"),n.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let a=RegExp("^"+o+"$"),s=RegExp("^"+r+"$"),l=RegExp("^[A-Z0-9 $%*+\\-./:]+$");n.testKanji=function(e){return a.test(e)},n.testNumeric=function(e){return s.test(e)},n.testAlphanumeric=function(e){return l.test(e)}},{}],"4DCia":[function(e,t,n){let r=e("eeca831a42e85d6c"),o=r.getBCHDigit(1335);/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */n.getEncodedBits=function(e,t){let n=e.bit<<3|t,i=n<<10;for(;r.getBCHDigit(i)-o>=0;)i^=1335<<r.getBCHDigit(i)-o;// xor final data with mask pattern in order to ensure that
// no combination of Error Correction Level and data mask pattern
// will result in an all-zero data string
return(n<<10|i)^21522}},{eeca831a42e85d6c:"2iHLf"}],kBoY1:[function(e,t,n){let r=e("45f6d4bff9d2fc72"),o=e("73109cbf4f3c309d"),i=e("5320016e34c30467"),a=e("fd16f8f25b581951"),s=e("8a7b84039f1cf0d2"),l=e("79379a3a8f3c26bb"),u=e("66903ca51bd2ea1d"),c=e("3b9f47d541e7d71f");/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */function d(e){return unescape(encodeURIComponent(e)).length}/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */function f(e,t,n){let r;let o=[];for(;null!==(r=e.exec(n));)o.push({data:r[0],index:r.index,mode:t,length:r[0].length});return o}/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */function h(e){let t,n;let o=f(l.NUMERIC,r.NUMERIC,e),i=f(l.ALPHANUMERIC,r.ALPHANUMERIC,e);u.isKanjiModeEnabled()?(t=f(l.BYTE,r.BYTE,e),n=f(l.KANJI,r.KANJI,e)):(t=f(l.BYTE_KANJI,r.BYTE,e),n=[]);let a=o.concat(i,t,n);return a.sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */function g(e,t){switch(t){case r.NUMERIC:return o.getBitsLength(e);case r.ALPHANUMERIC:return i.getBitsLength(e);case r.KANJI:return s.getBitsLength(e);case r.BYTE:return a.getBitsLength(e)}}/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */function m(e,t){let n;let l=r.getBestModeForData(e);// Make sure data can be encoded
if((n=r.from(t,l))!==r.BYTE&&n.bit<l.bit)throw Error('"'+e+'" cannot be encoded with mode '+r.toString(n)+".\n Suggested mode is: "+r.toString(l));switch(n!==r.KANJI||u.isKanjiModeEnabled()||(n=r.BYTE),n){case r.NUMERIC:return new o(e);case r.ALPHANUMERIC:return new i(e);case r.KANJI:return new s(e);case r.BYTE:return new a(e)}}/**
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
 */n.fromArray=function(e){return e.reduce(function(e,t){return"string"==typeof t?e.push(m(t,null)):t.data&&e.push(m(t.data,t.mode)),e},[])},/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */n.fromString=function(e,t){let o=h(e,u.isKanjiModeEnabled()),i=/**
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
 */function(e){let t=[];for(let n=0;n<e.length;n++){let o=e[n];switch(o.mode){case r.NUMERIC:t.push([o,{data:o.data,mode:r.ALPHANUMERIC,length:o.length},{data:o.data,mode:r.BYTE,length:o.length}]);break;case r.ALPHANUMERIC:t.push([o,{data:o.data,mode:r.BYTE,length:o.length}]);break;case r.KANJI:t.push([o,{data:o.data,mode:r.BYTE,length:d(o.data)}]);break;case r.BYTE:t.push([{data:o.data,mode:r.BYTE,length:d(o.data)}])}}return t}(o),a=/**
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
 */function(e,t){let n={},o={start:{}},i=["start"];for(let a=0;a<e.length;a++){let s=e[a],l=[];for(let e=0;e<s.length;e++){let u=s[e],c=""+a+e;l.push(c),n[c]={node:u,lastCount:0},o[c]={};for(let e=0;e<i.length;e++){let a=i[e];n[a]&&n[a].node.mode===u.mode?(o[a][c]=g(n[a].lastCount+u.length,u.mode)-g(n[a].lastCount,u.mode),n[a].lastCount+=u.length):(n[a]&&(n[a].lastCount=u.length),o[a][c]=g(u.length,u.mode)+4+r.getCharCountIndicator(u.mode,t)// switch cost
)}}i=l}for(let e=0;e<i.length;e++)o[i[e]].end=0;return{map:o,table:n}}(i,t),s=c.find_path(a.map,"start","end"),l=[];for(let e=1;e<s.length-1;e++)l.push(a.table[s[e]].node);return n.fromArray(l.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?e[e.length-1].data+=t.data:e.push(t),e},[]))},/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */n.rawSplit=function(e){return n.fromArray(h(e,u.isKanjiModeEnabled()))}},{"45f6d4bff9d2fc72":"2XDDf","73109cbf4f3c309d":"hTs8T","5320016e34c30467":"203uh",fd16f8f25b581951:"f7sIe","8a7b84039f1cf0d2":"1otz8","79379a3a8f3c26bb":"fkiQV","66903ca51bd2ea1d":"2iHLf","3b9f47d541e7d71f":"2Nh6w"}],hTs8T:[function(e,t,n){let r=e("29134b0b0820b091");function o(e){this.mode=r.NUMERIC,this.data=e.toString()}o.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},o.prototype.getLength=function(){return this.data.length},o.prototype.getBitsLength=function(){return o.getBitsLength(this.data.length)},o.prototype.write=function(e){let t,n;// The input data string is divided into groups of three digits,
// and each group is converted to its 10-bit binary equivalent.
for(t=0;t+3<=this.data.length;t+=3)n=parseInt(this.data.substr(t,3),10),e.put(n,10);// If the number of input digits is not an exact multiple of three,
// the final one or two digits are converted to 4 or 7 bits respectively.
let r=this.data.length-t;r>0&&(n=parseInt(this.data.substr(t),10),e.put(n,3*r+1))},t.exports=o},{"29134b0b0820b091":"2XDDf"}],"203uh":[function(e,t,n){let r=e("9c7c9b869570f846"),o=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(e){this.mode=r.ALPHANUMERIC,this.data=e}i.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;// Input data characters are divided into groups of two characters
// and encoded as 11-bit binary codes.
for(t=0;t+2<=this.data.length;t+=2){// The character value of the first character is multiplied by 45
let n=45*o.indexOf(this.data[t]);// The character value of the second digit is added to the product
n+=o.indexOf(this.data[t+1]),// The sum is then stored as 11-bit binary number
e.put(n,11)}// If the number of input data characters is not a multiple of two,
// the character value of the final character is encoded as a 6-bit binary number.
this.data.length%2&&e.put(o.indexOf(this.data[t]),6)},t.exports=i},{"9c7c9b869570f846":"2XDDf"}],f7sIe:[function(e,t,n){let r=e("1658cb836325c397"),o=e("a20a51f6cd184253");function i(e){this.mode=o.BYTE,"string"==typeof e&&(e=r(e)),this.data=new Uint8Array(e)}i.getBitsLength=function(e){return 8*e},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},t.exports=i},{"1658cb836325c397":"lmLJ0",a20a51f6cd184253:"2XDDf"}],lmLJ0:[function(e,t,n){t.exports=function(e){for(var t=[],n=e.length,r=0;r<n;r++){var o=e.charCodeAt(r);if(o>=55296&&o<=56319&&n>r+1){var i=e.charCodeAt(r+1);i>=56320&&i<=57343&&(// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
o=(o-55296)*1024+i-56320+65536,r+=1)}// US-ASCII
if(o<128){t.push(o);continue}// 2-byte UTF-8
if(o<2048){t.push(o>>6|192),t.push(63&o|128);continue}// 3-byte UTF-8
if(o<55296||o>=57344&&o<65536){t.push(o>>12|224),t.push(o>>6&63|128),t.push(63&o|128);continue}// 4-byte UTF-8
if(o>=65536&&o<=1114111){t.push(o>>18|240),t.push(o>>12&63|128),t.push(o>>6&63|128),t.push(63&o|128);continue}// Invalid character
t.push(239,191,189)}return new Uint8Array(t).buffer}},{}],"1otz8":[function(e,t,n){let r=e("b935cfd1cd03a1f6"),o=e("ca4944585cc8d12d");function i(e){this.mode=r.KANJI,this.data=e}i.getBitsLength=function(e){return 13*e},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(e){let t;// In the Shift JIS system, Kanji characters are represented by a two byte combination.
// These byte values are shifted from the JIS X 0208 values.
// JIS X 0208 gives details of the shift coded representation.
for(t=0;t<this.data.length;t++){let n=o.toSJIS(this.data[t]);// For characters with Shift JIS values from 0x8140 to 0x9FFC:
if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error("Invalid SJIS character: "+this.data[t]+"\nMake sure your charset is UTF-8");// Multiply most significant byte of result by 0xC0
// and add least significant byte to product
n=(n>>>8&255)*192+(255&n),// Convert result to a 13-bit binary string
e.put(n,13)}},t.exports=i},{b935cfd1cd03a1f6:"2XDDf",ca4944585cc8d12d:"2iHLf"}],"2Nh6w":[function(e,t,n){/******************************************************************************
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
 *****************************************************************************/var r={single_source_shortest_paths:function(e,t,n){// Predecessor map for each node that has been encountered.
// node ID => predecessor node ID
var o,i,a,s,l,u,c,d={},f={};f[t]=0;// Costs of shortest paths from s to all nodes encountered; differs from
// `costs` in that it provides easy access to the node that currently has
// the known shortest path from s.
// XXX: Do we actually need both `costs` and `open`?
var h=r.PriorityQueue.make();for(h.push(t,0);!h.empty();)// ...and explore the edges that connect u to those nodes, updating
// the cost of the shortest paths to any or all of those nodes as
// necessary. v is the node across the current edge from u.
for(a in i=// In the nodes remaining in graph that have a known cost from s,
// find the node, u, that currently has the shortest path from s.
(o=h.pop()).value,s=o.cost,// Get nodes adjacent to u...
l=e[i]||{})l.hasOwnProperty(a)&&(// Cost of s to u plus the cost of u to v across e--this is *a*
// cost from s to v that may or may not be less than the current
// known cost to v.
u=s+l[a],// If we haven't visited v yet OR if the current known cost from s to
// v is greater than the new cost we just found (cost of s to u plus
// cost of u to v across e), update v's cost in the cost list and
// update v's predecessor in the predecessor list (it's now u).
c=f[a],(void 0===f[a]||c>u)&&(f[a]=u,h.push(a,u),d[a]=i));if(void 0!==n&&void 0===f[n])throw Error(["Could not find a path from ",t," to ",n,"."].join(""));return d},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],r=t;r;)n.push(r),e[r],r=e[r];return n.reverse(),n},find_path:function(e,t,n){var o=r.single_source_shortest_paths(e,t,n);return r.extract_shortest_path_from_predecessor_list(o,n)},/**
   * A very naive priority queue implementation.
   */PriorityQueue:{make:function(e){var t,n=r.PriorityQueue,o={};for(t in e=e||{},n)n.hasOwnProperty(t)&&(o[t]=n[t]);return o.queue=[],o.sorter=e.sorter||n.default_sorter,o},default_sorter:function(e,t){return e.cost-t.cost},/**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */push:function(e,t){this.queue.push({value:e,cost:t}),this.queue.sort(this.sorter)},/**
     * Return the highest priority element in the queue.
     */pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=r},{}],i1BDL:[function(e,t,n){let r=e("5b3f7c513802d6c7");n.render=function(e,t,n){var o;let i=n,a=t;void 0!==i||t&&t.getContext||(i=t,t=void 0),t||(a=function(){try{return document.createElement("canvas")}catch(e){throw Error("You need to specify a canvas element")}}()),i=r.getOptions(i);let s=r.getImageWidth(e.modules.size,i),l=a.getContext("2d"),u=l.createImageData(s,s);return r.qrToImageData(u.data,e,i),o=a,l.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=s,o.width=s,o.style.height=s+"px",o.style.width=s+"px",l.putImageData(u,0,0),a},n.renderToDataURL=function(e,t,r){let o=r;void 0!==o||t&&t.getContext||(o=t,t=void 0),o||(o={});let i=n.render(e,t,o),a=o.type||"image/png",s=o.rendererOpts||{};return i.toDataURL(a,s.quality)}},{"5b3f7c513802d6c7":"3YBlJ"}],"3YBlJ":[function(e,t,n){function r(e){if("number"==typeof e&&(e=e.toString()),"string"!=typeof e)throw Error("Color should be defined as hex string");let t=e.slice().replace("#","").split("");if(t.length<3||5===t.length||t.length>8)throw Error("Invalid hex color: "+e);(3===t.length||4===t.length)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),6===t.length&&t.push("F","F");let n=parseInt(t.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:255&n,hex:"#"+t.slice(0,6).join("")}}n.getOptions=function(e){e||(e={}),e.color||(e.color={});let t=void 0===e.margin||null===e.margin||e.margin<0?4:e.margin,n=e.width&&e.width>=21?e.width:void 0,o=e.scale||4;return{width:n,scale:n?4:o,margin:t,color:{dark:r(e.color.dark||"#000000ff"),light:r(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}},n.getScale=function(e,t){return t.width&&t.width>=e+2*t.margin?t.width/(e+2*t.margin):t.scale},n.getImageWidth=function(e,t){let r=n.getScale(e,t);return Math.floor((e+2*t.margin)*r)},n.qrToImageData=function(e,t,r){let o=t.modules.size,i=t.modules.data,a=n.getScale(o,r),s=Math.floor((o+2*r.margin)*a),l=r.margin*a,u=[r.color.light,r.color.dark];for(let t=0;t<s;t++)for(let n=0;n<s;n++){let c=(t*s+n)*4,d=r.color.light;if(t>=l&&n>=l&&t<s-l&&n<s-l){let e=Math.floor((t-l)/a),r=Math.floor((n-l)/a);d=u[i[e*o+r]?1:0]}e[c++]=d.r,e[c++]=d.g,e[c++]=d.b,e[c]=d.a}}},{}],"8CcR1":[function(e,t,n){let r=e("c36bbcf663291acc");function o(e,t){let n=e.a/255,r=t+'="'+e.hex+'"';return n<1?r+" "+t+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function i(e,t,n){let r=e+t;return void 0!==n&&(r+=" "+n),r}n.render=function(e,t,n){let a=r.getOptions(t),s=e.modules.size,l=e.modules.data,u=s+2*a.margin,c=a.color.light.a?"<path "+o(a.color.light,"fill")+' d="M0 0h'+u+"v"+u+'H0z"/>':"",d="<path "+o(a.color.dark,"stroke")+' d="'+function(e,t,n){let r="",o=0,a=!1,s=0;for(let l=0;l<e.length;l++){let u=Math.floor(l%t),c=Math.floor(l/t);u||a||(a=!0),e[l]?(s++,l>0&&u>0&&e[l-1]||(r+=a?i("M",u+n,.5+c+n):i("m",o,0),o=0,a=!1),u+1<t&&e[l+1]||(r+=i("h",s),s=0)):o++}return r}(l,s,a.margin)+'"/>',f=a.width?'width="'+a.width+'" height="'+a.width+'" ':"",h='<svg xmlns="http://www.w3.org/2000/svg" '+f+('viewBox="0 0 '+u)+" "+u+'" shape-rendering="crispEdges">'+c+d+"</svg>\n";return"function"==typeof n&&n(null,h),h}},{c36bbcf663291acc:"3YBlJ"}]},["eLALs"],"eLALs","parcelRequire81ca")//# sourceMappingURL=vipPickup.js.map
;
//# sourceMappingURL=vipPickup.js.map
