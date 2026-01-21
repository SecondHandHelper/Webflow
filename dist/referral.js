!// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
function(t,r,n,o,i){/* eslint-disable no-undef */var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof a[o]&&a[o],l=s.cache||{},u="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(r,n){if(!l[r]){if(!t[r]){// if we cannot find the module within our internal map or
// cache jump to the current global require ie. the last bundle
// that was added to the page.
var i="function"==typeof a[o]&&a[o];if(!n&&i)return i(r,!0);// If there are other bundles on this page the require from the
// previous one is saved to 'previousRequire'. Repeat this as
// many times as there are bundles until the module is found or
// we exhaust the require chain.
if(s)return s(r,!0);// Try the node require function if it exists.
if(u&&"string"==typeof r)return u(r);var c=Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}h.resolve=function(n){var o=t[r][1][n];return null!=o?o:n},h.cache={};var f=l[r]=new d.Module(r);t[r][0].call(f.exports,h,f,f.exports,this)}return l[r].exports;function h(t){var r=h.resolve(t);return!1===r?{}:d(r)}}d.isParcelRequire=!0,d.Module=function(t){this.id=t,this.bundle=d,this.exports={}},d.modules=t,d.cache=l,d.parent=s,d.register=function(r,n){t[r]=[function(t,r){r.exports=n},{}]},Object.defineProperty(d,"root",{get:function(){return a[o]}}),a[o]=d;for(var c=0;c<r.length;c++)d(r[c]);if(n){// Expose entry point to Node, AMD or browser globals
// Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
var f=d(n);// CommonJS
"object"==typeof exports&&"undefined"!=typeof module?module.exports=f:"function"==typeof define&&define.amd?define(function(){return f}):i&&(this[i]=f)}}({"7rA3f":[function(t,r,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js"),i=t("./general"),a=t("qrcode"),s=o.interopDefault(a);async function l(){console.log("referral main");let t=new URL(window.location).searchParams;if(!t.has("app")&&!user.current?.referralData?.referralCode)return location.href="/private";user.current?.maiCircle&&(document.getElementById("referralText").style.display="none",document.getElementById("referralTextMaiCircle").style.display="block");let r=user.current?.referralData?.referralCode;document.getElementById("referralCode").innerText=r||"",user.current?.referralData?.referredUsers?.length>0&&(document.getElementById("topStatsLoadingIcon").style.display="block"),document.getElementById("referralCode").innerText=user.current.referralData.referralCode,user.current?.referralData?.referredUsers?.length>0&&(//TOP STATS
document.getElementById("invitedFriends").innerText=user.current.referralData.referredUsers.length,document.getElementById("topStatsDiv").style.visibility="visible",document.getElementById("topStats").style.display="flex",document.getElementById("topStatsLoadingIcon").style.display="none")}let u=getParamsObject();if(shareReferralLinkButton.addEventListener("click",i.shareCode),document.getElementById("referralCode").innerText="",/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))user.whenSet(l),user.current||u.has("app")||(location.href="/sign-in");else{let t=document.getElementById("qrCanvas");t&&(0,s.default).toCanvas(t,window.location.href,function(t){t&&console.error(t),console.log("success!")})}},{"./general":"1tOWF",qrcode:"6s2CO","@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],"1tOWF":[function(t,r,n){var o=t("@parcel/transformer-js/src/esmodule-helpers.js");function i(){firebase.auth().signOut().then(()=>{console.log("User signed out"),authUser.current=null,user.current=null,userId=null,localStorage.removeItem("sessionUser"),localStorage.removeItem("idToken"),localStorage.removeItem("authUserId"),localStorage.removeItem("authUser"),deleteCookie("maiAuth"),callBackendApi("/api/users/session",{method:"DELETE",fetchInit:{credentials:"include"}}).catch(t=>{errorHandler.report(t),console.warn("[SSO] Error clearing session cookie:",e)}),location.href="/"}).catch(t=>{errorHandler.report(t),console.log(t)})}function a(t){document.getElementById("addressFirstName").value=t.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=t.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=t.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=t.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=t.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=t.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=t.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}function s(){let t=document.getElementById("addressFirstName").value,r=document.getElementById("addressLastName").value,n=document.getElementById("addressStreetAddress").value,o=document.getElementById("addressCO").value,i=document.getElementById("addressPostalCode").value,a=document.getElementById("addressCity").value,s=document.getElementById("addressDoorCode").value;return t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",r=r?r.trim().charAt(0).toUpperCase()+r.trim().slice(1):"",n=n?n.trim().charAt(0).toUpperCase()+n.trim().slice(1):"",o=o?o.trim():"",{addressFirstName:t,addressLastName:r,addressStreetAddress:n,addressCO:o,addressPostalCode:i=i?i.trim().replace(/\D/g,""):"",addressCity:a=a?a.trim().charAt(0).toUpperCase()+a.trim().slice(1):"",addressDoorCode:s=s?s.trim():""}}function l(t){// verify we got 10 digits, otherwise it is invalid
if(10!==(t=t.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let r=t.map(t=>Number(t)).reduce((t,r,n)=>(n%2&&(r*=2),r>9&&(r-=9),t+r));return 0==r%10}function u(t){let r=t.replace("-","");return(12!==r.length&&("19"!==r.substring(0,2)||"20"!==r.substring(0,2))&&(r=99>=Number(r.substring(0,2))&&Number(r.substring(0,2))>25?"19"+r:"20"+r),12===r.length)?r:null}function d(t){if(t.images){let r=t.images;return r.modelImageSmall||r.modelImage||r.coverImageSmall||r.coverImage||r.enhancedFrontImageSmall||r.enhancedFrontImage||r.frontImageSmall||r.frontImage}if(t.imagesv2)for(let r of["modelImage","enhancedFrontImage","frontImage"]){let n=t.imagesv2.find(t=>t.name===r);if(n){if(n?.versions?.small)return n.versions.small;if(n?.versions?.medium)return n.versions.medium;if(n?.versions?.large)return n.versions.large;if(n.url)return n.url}}return null}function c(){let t;let r=user.current.referralData.referralCode;if(t=user.current?.maiCircle?"H\xe4r f\xe5r du en exklusiv inbjudan till Mai, som ger en extra fin start med tre kommissionsfria f\xf6rs\xe4ljningar.":"Jag bjuder in dig till Mai f\xf6r att s\xe4lja dina kl\xe4der! G\xe5 genom min l\xe4nk f\xf6r att f\xe5 en extra kommissionsfri f\xf6rs\xe4ljning.",navigator.share)navigator.share({text:t,url:`https://invite.maiapp.se/refer?invite=${r}`}).then(()=>{console.log("Thanks for sharing!")}).catch(t=>{console.error(t),errorHandler.report(t)});else{console.log("Browser doesn't support navigator.share => Copy to clipboard!");let n=t+"\n"+`https://invite.maiapp.se/refer?invite=${r}`;navigator.clipboard.writeText(n),linkCopiedBanner.style.display="flex",setTimeout(function(){linkCopiedBanner.style.display="none"},1500)}}function f(t){let r=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;r?(document.getElementById("continueOnWebBottomSheet").href=window.location.origin+t,document.getElementById("darkOverlay").classList.add("active"),document.getElementById("channelBottomSheet").classList.add("active")):window.location.href=t}function h(){document.getElementById("darkOverlay").classList.remove("active"),document.getElementById("channelBottomSheet").classList.remove("active")}function g(t){let r=document.getElementById(t);r&&(// Set initial position below screen
r.style.transform="translateY(100%)",r.style.transition="transform 0.3s ease-out",r.style.display="block",// Animate to visible position
setTimeout(()=>{r.style.transform="translateY(0%)"},10),document.getElementById("darkOverlay").classList.add("active"))}function m(t){let r=document.getElementById(t);// Add the visibility check here
r&&"none"!==r.style.display&&(// Animate down and hide
r.style.transform="translateY(100%)",r.style.transition="transform 0.3s ease-in",// Hide after animation completes
setTimeout(()=>{r.style.display="none"},300),document.getElementById("darkOverlay").classList.remove("active"))}function p(t){let r=document.getElementById(t);if(r){r.style.display="none";// Check if there are any remaining visible cards
let t=document.getElementById("infoRequestsList");if(t){let r=t.querySelectorAll('[id^="infoRequest"]:not([style*="display: none"])');if(0===r.length){let t=document.getElementById("infoRequestsDiv");t&&(t.style.display="none")}}}}o.defineInteropFlag(n),o.export(n,"signOut",()=>i),o.export(n,"setFormAddressFields",()=>a),o.export(n,"getFormAddressFields",()=>s),// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
o.export(n,"isValidSwedishSsn",()=>l),o.export(n,"formatPersonalId",()=>u),o.export(n,"itemCoverImage",()=>d),o.export(n,"shareCode",()=>c),// Channel bottom sheet
o.export(n,"channelRouter",()=>f),o.export(n,"hideChannelBottomSheet",()=>h),// End of channel bottom sheet
// Toast animation functions
o.export(n,"animateOpenToast",()=>g),o.export(n,"animateCloseToast",()=>m),o.export(n,"hideInfoRequestCard",()=>p)},{"@parcel/transformer-js/src/esmodule-helpers.js":"bNgzC"}],bNgzC:[function(t,r,n){n.interopDefault=function(t){return t&&t.__esModule?t:{default:t}},n.defineInteropFlag=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.exportAll=function(t,r){return Object.keys(t).forEach(function(n){"default"===n||"__esModule"===n||r.hasOwnProperty(n)||Object.defineProperty(r,n,{enumerable:!0,get:function(){return t[n]}})}),r},n.export=function(t,r,n){Object.defineProperty(t,r,{enumerable:!0,get:n})}},{}],"6s2CO":[function(t,r,n){let o=t("da1f68cc1fc16077"),i=t("8c6cf49ef2287430"),a=t("8a60cf7722cc14ce"),s=t("f6fcc816b915ba37");function l(t,r,n,a,s){let l=[].slice.call(arguments,1),u=l.length,d="function"==typeof l[u-1];if(!d&&!o())throw Error("Callback required as last argument");if(d){if(u<2)throw Error("Too few arguments provided");2===u?(s=n,n=r,r=a=void 0):3===u&&(r.getContext&&void 0===s?(s=a,a=void 0):(s=a,a=n,n=r,r=void 0))}else{if(u<1)throw Error("Too few arguments provided");return 1===u?(n=r,r=a=void 0):2!==u||r.getContext||(a=n,n=r,r=void 0),new Promise(function(o,s){try{let s=i.create(n,a);o(t(s,r,a))}catch(t){s(t)}})}try{let o=i.create(n,a);s(null,t(o,r,a))}catch(t){s(t)}}n.create=i.create,n.toCanvas=l.bind(null,a.render),n.toDataURL=l.bind(null,a.renderToDataURL),// only svg for now.
n.toString=l.bind(null,function(t,r,n){return s.render(t,n)})},{da1f68cc1fc16077:"2F9VO","8c6cf49ef2287430":"e9qY0","8a60cf7722cc14ce":"i1BDL",f6fcc816b915ba37:"8CcR1"}],"2F9VO":[function(t,r,n){// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
r.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},{}],e9qY0:[function(t,r,n){let o=t("4cf6a8173d9f3a2"),i=t("2ad62f61c352884c"),a=t("87d5a6270eb1dc26"),s=t("91abc94f777368cc"),l=t("9737c3939ab85d95"),u=t("cee3d371e219e45e"),d=t("8700c8c682afabf3"),c=t("65ad903a6ba3e"),f=t("1e8e447afb4d169c"),h=t("8a4a19af97836d80"),g=t("26720f9d94c9e268"),m=t("7b6429a248ecc51f"),p=t("1368d0fa14524351");/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */function y(t,r,n){let o,i;let a=t.size,s=g.getEncodedBits(r,n);for(o=0;o<15;o++)i=(s>>o&1)==1,o<6?t.set(o,8,i,!0):o<8?t.set(o+1,8,i,!0):t.set(a-15+o,8,i,!0),o<8?t.set(8,a-o-1,i,!0):o<9?t.set(8,15-o-1+1,i,!0):t.set(8,15-o-1,i,!0);// fixed module
t.set(a-8,8,1,!0)}/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */n.create=function(t,r){let n,g;if(void 0===t||""===t)throw Error("No input text");let E=i.M;return void 0!==r&&(// Use higher error correction level as default
E=i.from(r.errorCorrectionLevel,i.M),n=h.from(r.version),g=d.from(r.maskPattern),r.toSJISFunc&&o.setToSJISFunction(r.toSJISFunc)),/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */function(t,r,n,i){let g;if(Array.isArray(t))g=p.fromArray(t);else if("string"==typeof t){let o=r;if(!o){let r=p.rawSplit(t);// Estimate best version that can contain raw splitted segments
o=h.getBestVersionForData(r,n)}// Build optimized segments
// If estimated version is undefined, try with the highest version
g=p.fromString(t,o||40)}else throw Error("Invalid data");// Get the min version that can contain data
let E=h.getBestVersionForData(g,n);// If no version is found, data cannot be stored
if(!E)throw Error("The amount of data is too big to be stored in a QR Code");// If not specified, use min version as default
if(r){if(r<E)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+E+".\n")}else r=E;let v=/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */function(t,r,n){// Prepare data buffer
let i=new a;n.forEach(function(r){// prefix data with mode indicator (4 bits)
i.put(r.mode.bit,4),// Prefix data with character count indicator.
// The character count indicator is a string of bits that represents the
// number of characters that are being encoded.
// The character count indicator must be placed after the mode indicator
// and must be a certain number of bits long, depending on the QR version
// and data mode
// @see {@link Mode.getCharCountIndicator}.
i.put(r.getLength(),m.getCharCountIndicator(r.mode,t)),// add binary data sequence to buffer
r.write(i)});// Calculate required number of bits
let s=o.getSymbolTotalCodewords(t),l=c.getTotalCodewordsCount(t,r),u=(s-l)*8;// If the bit string is fewer than four bits shorter, add only the number of 0s that
// are needed to reach the required number of bits.
// After adding the terminator, if the number of bits in the string is not a multiple of 8,
// pad the string on the right with 0s to make the string's length a multiple of 8.
for(i.getLengthInBits()+4<=u&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(0);// Add pad bytes if the string is still shorter than the total number of required bits.
// Extend the buffer to fill the data capacity of the symbol corresponding to
// the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
// and 00010001 (0x11) alternately.
let d=(u-i.getLengthInBits())/8;for(let t=0;t<d;t++)i.put(t%2?17:236,8);return(/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */function(t,r,n){let i,a;// Total codewords for this QR code version (Data + Error correction)
let s=o.getSymbolTotalCodewords(r),l=c.getTotalCodewordsCount(r,n),u=s-l,d=c.getBlocksCount(r,n),h=s%d,g=d-h,m=Math.floor(s/d),p=Math.floor(u/d),y=p+1,E=m-p,v=new f(E),b=0,B=Array(d),I=Array(d),C=0,w=new Uint8Array(t.buffer);// Divide the buffer into the required number of blocks
for(let t=0;t<d;t++){let r=t<g?p:y;// extract a block of data from buffer
B[t]=w.slice(b,b+r),// Calculate EC codewords for this data block
I[t]=v.encode(B[t]),b+=r,C=Math.max(C,r)}// Create final data
// Interleave the data and error correction codewords from each block
let A=new Uint8Array(s),N=0;// Add data codewords
for(i=0;i<C;i++)for(a=0;a<d;a++)i<B[a].length&&(A[N++]=B[a][i]);// Apped EC codewords
for(i=0;i<E;i++)for(a=0;a<d;a++)A[N++]=I[a][i];return A}(i,t,r))}(r,n,g),b=o.getSymbolSize(r),B=new s(b);return(// Add function modules
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
 */function(t,r){let n=t.size,o=u.getPositions(r);for(let r=0;r<o.length;r++){let i=o[r][0],a=o[r][1];for(let r=-1;r<=7;r++)if(!(i+r<=-1)&&!(n<=i+r))for(let o=-1;o<=7;o++)a+o<=-1||n<=a+o||(r>=0&&r<=6&&(0===o||6===o)||o>=0&&o<=6&&(0===r||6===r)||r>=2&&r<=4&&o>=2&&o<=4?t.set(i+r,a+o,!0,!0):t.set(i+r,a+o,!1,!0))}}(B,r),/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */function(t){let r=t.size;for(let n=8;n<r-8;n++){let r=n%2==0;t.set(n,6,r,!0),t.set(6,n,r,!0)}}(B),/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(t,r){let n=l.getPositions(r);for(let r=0;r<n.length;r++){let o=n[r][0],i=n[r][1];for(let r=-2;r<=2;r++)for(let n=-2;n<=2;n++)-2===r||2===r||-2===n||2===n||0===r&&0===n?t.set(o+r,i+n,!0,!0):t.set(o+r,i+n,!1,!0)}}(B,r),// Add temporary dummy bits for format info just to set them as reserved.
// This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
// since the masking operation must be performed only on the encoding region.
// These blocks will be replaced with correct values later in code.
y(B,n,0),r>=7&&/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */function(t,r){let n,o,i;let a=t.size,s=h.getEncodedBits(r);for(let r=0;r<18;r++)n=Math.floor(r/3),o=r%3+a-8-3,i=(s>>r&1)==1,t.set(n,o,i,!0),t.set(o,n,i,!0)}(B,r),// Add data codewords
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */function(t,r){let n=t.size,o=-1,i=n-1,a=7,s=0;for(let l=n-1;l>0;l-=2)for(6===l&&l--;;){for(let n=0;n<2;n++)if(!t.isReserved(i,l-n)){let o=!1;s<r.length&&(o=(r[s]>>>a&1)==1),t.set(i,l-n,o),-1==--a&&(s++,a=7)}if((i+=o)<0||n<=i){i-=o,o=-o;break}}}(B,v),isNaN(i)&&(i=d.getBestMask(B,y.bind(null,B,n))),// Apply mask pattern
d.applyMask(i,B),// Replace format info bits with correct values
y(B,n,i),{modules:B,version:r,errorCorrectionLevel:n,maskPattern:i,segments:g})}(t,n,E,g)}},{"4cf6a8173d9f3a2":"2iHLf","2ad62f61c352884c":"kU8Fo","87d5a6270eb1dc26":"dvmjt","91abc94f777368cc":"4koKB","9737c3939ab85d95":"2m37T",cee3d371e219e45e:"9BWaM","8700c8c682afabf3":"2hy8U","65ad903a6ba3e":"ivpAq","1e8e447afb4d169c":"ixGQe","8a4a19af97836d80":"61NkN","26720f9d94c9e268":"4DCia","7b6429a248ecc51f":"2XDDf","1368d0fa14524351":"kBoY1"}],"2iHLf":[function(t,r,n){let o;let i=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */n.getSymbolSize=function(t){if(!t)throw Error('"version" cannot be null or undefined');if(t<1||t>40)throw Error('"version" should be in range from 1 to 40');return 4*t+17},/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */n.getSymbolTotalCodewords=function(t){return i[t]},/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */n.getBCHDigit=function(t){let r=0;for(;0!==t;)r++,t>>>=1;return r},n.setToSJISFunction=function(t){if("function"!=typeof t)throw Error('"toSJISFunc" is not a valid function.');o=t},n.isKanjiModeEnabled=function(){return void 0!==o},n.toSJIS=function(t){return o(t)}},{}],kU8Fo:[function(t,r,n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2},n.isValid=function(t){return t&&void 0!==t.bit&&t.bit>=0&&t.bit<4},n.from=function(t,r){if(n.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw Error("Param is not a string");let r=t.toLowerCase();switch(r){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw Error("Unknown EC Level: "+t)}}(t)}catch(t){return r}}},{}],dvmjt:[function(t,r,n){function o(){this.buffer=[],this.length=0}o.prototype={get:function(t){return(this.buffer[Math.floor(t/8)]>>>7-t%8&1)==1},put:function(t,r){for(let n=0;n<r;n++)this.putBit((t>>>r-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(t){let r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),t&&(this.buffer[r]|=128>>>this.length%8),this.length++}},r.exports=o},{}],"4koKB":[function(t,r,n){/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */function o(t){if(!t||t<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */o.prototype.set=function(t,r,n,o){let i=t*this.size+r;this.data[i]=n,o&&(this.reservedBit[i]=!0)},/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */o.prototype.get=function(t,r){return this.data[t*this.size+r]},/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */o.prototype.xor=function(t,r,n){this.data[t*this.size+r]^=n},/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */o.prototype.isReserved=function(t,r){return this.reservedBit[t*this.size+r]},r.exports=o},{}],"2m37T":[function(t,r,n){/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */let o=t("3fa093180e62a22a").getSymbolSize;/**
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
 */n.getRowColCoords=function(t){if(1===t)return[];let r=Math.floor(t/7)+2,n=o(t),i=145===n?26:2*Math.ceil((n-13)/(2*r-2)),a=[n-7]// Last coord is always (size - 7)
;for(let t=1;t<r-1;t++)a[t]=a[t-1]-i;return a.push(6)// First coord is always 6
,a.reverse()},/**
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
 */n.getPositions=function(t){let r=[],o=n.getRowColCoords(t),i=o.length;for(let t=0;t<i;t++)for(let n=0;n<i;n++)// Skip if position is occupied by finder patterns
(0!==t||0!==n)&&// top-left
(0!==t||n!==i-1)&&// bottom-left
(t!==i-1||0!==n)&&r.push([o[t],o[n]]);return r}},{"3fa093180e62a22a":"2iHLf"}],"9BWaM":[function(t,r,n){let o=t("6ec9ae5660047293").getSymbolSize;/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */n.getPositions=function(t){let r=o(t);return[// top-left
[0,0],// top-right
[r-7,0],// bottom-left
[0,r-7]]}},{"6ec9ae5660047293":"2iHLf"}],"2hy8U":[function(t,r,n){/**
 * Data mask pattern reference
 * @type {Object}
 */n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */let o={N1:3,N2:3,N3:40,N4:10};/**
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
*/n.getPenaltyN1=function(t){let r=t.size,n=0,i=0,a=0,s=null,l=null;for(let u=0;u<r;u++){i=a=0,s=l=null;for(let d=0;d<r;d++){let r=t.get(u,d);r===s?i++:(i>=5&&(n+=o.N1+(i-5)),s=r,i=1),(r=t.get(d,u))===l?a++:(a>=5&&(n+=o.N1+(a-5)),l=r,a=1)}i>=5&&(n+=o.N1+(i-5)),a>=5&&(n+=o.N1+(a-5))}return n},/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */n.getPenaltyN2=function(t){let r=t.size,n=0;for(let o=0;o<r-1;o++)for(let i=0;i<r-1;i++){let r=t.get(o,i)+t.get(o,i+1)+t.get(o+1,i)+t.get(o+1,i+1);(4===r||0===r)&&n++}return n*o.N2},/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */n.getPenaltyN3=function(t){let r=t.size,n=0,i=0,a=0;for(let o=0;o<r;o++){i=a=0;for(let s=0;s<r;s++)i=i<<1&2047|t.get(o,s),s>=10&&(1488===i||93===i)&&n++,a=a<<1&2047|t.get(s,o),s>=10&&(1488===a||93===a)&&n++}return n*o.N3},/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */n.getPenaltyN4=function(t){let r=0,n=t.data.length;for(let o=0;o<n;o++)r+=t.data[o];let i=Math.abs(Math.ceil(100*r/n/5)-10);return i*o.N4},/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */n.applyMask=function(t,r){let o=r.size;for(let i=0;i<o;i++)for(let a=0;a<o;a++)r.isReserved(a,i)||r.xor(a,i,/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */function(t,r,o){switch(t){case n.Patterns.PATTERN000:return(r+o)%2==0;case n.Patterns.PATTERN001:return r%2==0;case n.Patterns.PATTERN010:return o%3==0;case n.Patterns.PATTERN011:return(r+o)%3==0;case n.Patterns.PATTERN100:return(Math.floor(r/2)+Math.floor(o/3))%2==0;case n.Patterns.PATTERN101:return r*o%2+r*o%3==0;case n.Patterns.PATTERN110:return(r*o%2+r*o%3)%2==0;case n.Patterns.PATTERN111:return(r*o%3+(r+o)%2)%2==0;default:throw Error("bad maskPattern:"+t)}}(t,a,i))},/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */n.getBestMask=function(t,r){let o=Object.keys(n.Patterns).length,i=0,a=1/0;for(let s=0;s<o;s++){r(s),n.applyMask(s,t);// Calculate penalty
let o=n.getPenaltyN1(t)+n.getPenaltyN2(t)+n.getPenaltyN3(t)+n.getPenaltyN4(t);// Undo previously applied mask
n.applyMask(s,t),o<a&&(a=o,i=s)}return i}},{}],ivpAq:[function(t,r,n){let o=t("7baaa530584d1bc4"),i=[// L  M  Q  H
1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],a=[// L  M  Q  H
7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */n.getBlocksCount=function(t,r){switch(r){case o.L:return i[(t-1)*4+0];case o.M:return i[(t-1)*4+1];case o.Q:return i[(t-1)*4+2];case o.H:return i[(t-1)*4+3];default:return}},/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */n.getTotalCodewordsCount=function(t,r){switch(r){case o.L:return a[(t-1)*4+0];case o.M:return a[(t-1)*4+1];case o.Q:return a[(t-1)*4+2];case o.H:return a[(t-1)*4+3];default:return}}},{"7baaa530584d1bc4":"kU8Fo"}],ixGQe:[function(t,r,n){let o=t("742a7ee6d6a2d145");function i(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */i.prototype.initialize=function(t){// create an irreducible generator polynomial
this.degree=t,this.genPoly=o.generateECPolynomial(this.degree)},/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */i.prototype.encode=function(t){if(!this.genPoly)throw Error("Encoder not initialized");// Calculate EC for this data block
// extends data size to data+genPoly size
let r=new Uint8Array(t.length+this.degree);r.set(t);// The error correction codewords are the remainder after dividing the data codewords
// by a generator polynomial
let n=o.mod(r,this.genPoly),i=this.degree-n.length;if(i>0){let t=new Uint8Array(this.degree);return t.set(n,i),t}return n},r.exports=i},{"742a7ee6d6a2d145":"bFrZA"}],bFrZA:[function(t,r,n){let o=t("780c74029318268c");/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */n.mul=function(t,r){let n=new Uint8Array(t.length+r.length-1);for(let i=0;i<t.length;i++)for(let a=0;a<r.length;a++)n[i+a]^=o.mul(t[i],r[a]);return n},/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */n.mod=function(t,r){let n=new Uint8Array(t);for(;n.length-r.length>=0;){let t=n[0];for(let i=0;i<r.length;i++)n[i]^=o.mul(r[i],t);// remove all zeros from buffer head
let i=0;for(;i<n.length&&0===n[i];)i++;n=n.slice(i)}return n},/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */n.generateECPolynomial=function(t){let r=new Uint8Array([1]);for(let i=0;i<t;i++)r=n.mul(r,new Uint8Array([1,o.exp(i)]));return r}},{"780c74029318268c":"3WlDl"}],"3WlDl":[function(t,r,n){let o=new Uint8Array(512),i=new Uint8Array(256)/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */;!function(){let t=1;for(let r=0;r<255;r++)o[r]=t,i[t]=r,256&(t<<=1// multiply by 2
)&&(t^=285);// Optimization: double the size of the anti-log table so that we don't need to mod 255 to
// stay inside the bounds (because we will mainly use this table for the multiplication of
// two GF numbers, no more).
// @see {@link mul}
for(let t=255;t<512;t++)o[t]=o[t-255]}(),/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.log=function(t){if(t<1)throw Error("log("+t+")");return i[t]},/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */n.exp=function(t){return o[t]},/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */n.mul=function(t,r){return 0===t||0===r?0:o[i[t]+i[r]]}},{}],"61NkN":[function(t,r,n){let o=t("f67b02cdf61cb7c6"),i=t("777da0d92c463f2e"),a=t("acd5b4fcd696edf3"),s=t("5303c314c4a688d7"),l=t("663d0e03da8b2897"),u=o.getBCHDigit(7973);function d(t,r){// Character count indicator + mode indicator bits
return s.getCharCountIndicator(t,r)+4}/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */n.from=function(t,r){return l.isValid(t)?parseInt(t,10):r},/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */n.getCapacity=function(t,r,n){if(!l.isValid(t))throw Error("Invalid QR Code version");// Use Byte mode as default
void 0===n&&(n=s.BYTE);// Total codewords for this QR code version (Data + Error correction)
let a=o.getSymbolTotalCodewords(t),u=i.getTotalCodewordsCount(t,r),c=(a-u)*8;if(n===s.MIXED)return c;let f=c-d(n,t);// Return max number of storable codewords
switch(n){case s.NUMERIC:return Math.floor(f/10*3);case s.ALPHANUMERIC:return Math.floor(f/11*2);case s.KANJI:return Math.floor(f/13);case s.BYTE:default:return Math.floor(f/8)}},/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */n.getBestVersionForData=function(t,r){let o;let i=a.from(r,a.M);if(Array.isArray(t)){if(t.length>1)return function(t,r){for(let o=1;o<=40;o++){let i=function(t,r){let n=0;return t.forEach(function(t){let o=d(t.mode,r);n+=o+t.getBitsLength()}),n}(t,o);if(i<=n.getCapacity(o,r,s.MIXED))return o}}(t,i);if(0===t.length)return 1;o=t[0]}else o=t;return function(t,r,o){for(let i=1;i<=40;i++)if(r<=n.getCapacity(i,o,t))return i}(o.mode,o.getLength(),i)},/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */n.getEncodedBits=function(t){if(!l.isValid(t)||t<7)throw Error("Invalid QR Code version");let r=t<<12;for(;o.getBCHDigit(r)-u>=0;)r^=7973<<o.getBCHDigit(r)-u;return t<<12|r}},{f67b02cdf61cb7c6:"2iHLf","777da0d92c463f2e":"ivpAq",acd5b4fcd696edf3:"kU8Fo","5303c314c4a688d7":"2XDDf","663d0e03da8b2897":"dFhhu"}],"2XDDf":[function(t,r,n){let o=t("488660fac9162579"),i=t("a23fd227d32f3622");/**
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
 */n.getCharCountIndicator=function(t,r){if(!t.ccBits)throw Error("Invalid mode: "+t);if(!o.isValid(r))throw Error("Invalid version: "+r);return r>=1&&r<10?t.ccBits[0]:r<27?t.ccBits[1]:t.ccBits[2]},/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */n.getBestModeForData=function(t){return i.testNumeric(t)?n.NUMERIC:i.testAlphanumeric(t)?n.ALPHANUMERIC:i.testKanji(t)?n.KANJI:n.BYTE},/**
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
 */n.from=function(t,r){if(n.isValid(t))return t;try{return(/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */function(t){if("string"!=typeof t)throw Error("Param is not a string");let r=t.toLowerCase();switch(r){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw Error("Unknown mode: "+t)}}(t))}catch(t){return r}}},{"488660fac9162579":"dFhhu",a23fd227d32f3622:"fkiQV"}],dFhhu:[function(t,r,n){/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */n.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}},{}],fkiQV:[function(t,r,n){let o="[0-9]+",i="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";i=i.replace(/u/g,"\\u");let a="(?:(?![A-Z0-9 $%*+\\-./:]|"+i+")(?:.|[\r\n]))+";n.KANJI=RegExp(i,"g"),n.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),n.BYTE=RegExp(a,"g"),n.NUMERIC=RegExp(o,"g"),n.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let s=RegExp("^"+i+"$"),l=RegExp("^"+o+"$"),u=RegExp("^[A-Z0-9 $%*+\\-./:]+$");n.testKanji=function(t){return s.test(t)},n.testNumeric=function(t){return l.test(t)},n.testAlphanumeric=function(t){return u.test(t)}},{}],"4DCia":[function(t,r,n){let o=t("eeca831a42e85d6c"),i=o.getBCHDigit(1335);/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */n.getEncodedBits=function(t,r){let n=t.bit<<3|r,a=n<<10;for(;o.getBCHDigit(a)-i>=0;)a^=1335<<o.getBCHDigit(a)-i;// xor final data with mask pattern in order to ensure that
// no combination of Error Correction Level and data mask pattern
// will result in an all-zero data string
return(n<<10|a)^21522}},{eeca831a42e85d6c:"2iHLf"}],kBoY1:[function(t,r,n){let o=t("45f6d4bff9d2fc72"),i=t("73109cbf4f3c309d"),a=t("5320016e34c30467"),s=t("fd16f8f25b581951"),l=t("8a7b84039f1cf0d2"),u=t("79379a3a8f3c26bb"),d=t("66903ca51bd2ea1d"),c=t("3b9f47d541e7d71f");/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */function f(t){return unescape(encodeURIComponent(t)).length}/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */function h(t,r,n){let o;let i=[];for(;null!==(o=t.exec(n));)i.push({data:o[0],index:o.index,mode:r,length:o[0].length});return i}/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */function g(t){let r,n;let i=h(u.NUMERIC,o.NUMERIC,t),a=h(u.ALPHANUMERIC,o.ALPHANUMERIC,t);d.isKanjiModeEnabled()?(r=h(u.BYTE,o.BYTE,t),n=h(u.KANJI,o.KANJI,t)):(r=h(u.BYTE_KANJI,o.BYTE,t),n=[]);let s=i.concat(a,r,n);return s.sort(function(t,r){return t.index-r.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */function m(t,r){switch(r){case o.NUMERIC:return i.getBitsLength(t);case o.ALPHANUMERIC:return a.getBitsLength(t);case o.KANJI:return l.getBitsLength(t);case o.BYTE:return s.getBitsLength(t)}}/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */function p(t,r){let n;let u=o.getBestModeForData(t);// Make sure data can be encoded
if((n=o.from(r,u))!==o.BYTE&&n.bit<u.bit)throw Error('"'+t+'" cannot be encoded with mode '+o.toString(n)+".\n Suggested mode is: "+o.toString(u));switch(n!==o.KANJI||d.isKanjiModeEnabled()||(n=o.BYTE),n){case o.NUMERIC:return new i(t);case o.ALPHANUMERIC:return new a(t);case o.KANJI:return new l(t);case o.BYTE:return new s(t)}}/**
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
 */n.fromArray=function(t){return t.reduce(function(t,r){return"string"==typeof r?t.push(p(r,null)):r.data&&t.push(p(r.data,r.mode)),t},[])},/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */n.fromString=function(t,r){let i=g(t,d.isKanjiModeEnabled()),a=/**
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
 */function(t){let r=[];for(let n=0;n<t.length;n++){let i=t[n];switch(i.mode){case o.NUMERIC:r.push([i,{data:i.data,mode:o.ALPHANUMERIC,length:i.length},{data:i.data,mode:o.BYTE,length:i.length}]);break;case o.ALPHANUMERIC:r.push([i,{data:i.data,mode:o.BYTE,length:i.length}]);break;case o.KANJI:r.push([i,{data:i.data,mode:o.BYTE,length:f(i.data)}]);break;case o.BYTE:r.push([{data:i.data,mode:o.BYTE,length:f(i.data)}])}}return r}(i),s=/**
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
 */function(t,r){let n={},i={start:{}},a=["start"];for(let s=0;s<t.length;s++){let l=t[s],u=[];for(let t=0;t<l.length;t++){let d=l[t],c=""+s+t;u.push(c),n[c]={node:d,lastCount:0},i[c]={};for(let t=0;t<a.length;t++){let s=a[t];n[s]&&n[s].node.mode===d.mode?(i[s][c]=m(n[s].lastCount+d.length,d.mode)-m(n[s].lastCount,d.mode),n[s].lastCount+=d.length):(n[s]&&(n[s].lastCount=d.length),i[s][c]=m(d.length,d.mode)+4+o.getCharCountIndicator(d.mode,r)// switch cost
)}}a=u}for(let t=0;t<a.length;t++)i[a[t]].end=0;return{map:i,table:n}}(a,r),l=c.find_path(s.map,"start","end"),u=[];for(let t=1;t<l.length-1;t++)u.push(s.table[l[t]].node);return n.fromArray(u.reduce(function(t,r){let n=t.length-1>=0?t[t.length-1]:null;return n&&n.mode===r.mode?t[t.length-1].data+=r.data:t.push(r),t},[]))},/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */n.rawSplit=function(t){return n.fromArray(g(t,d.isKanjiModeEnabled()))}},{"45f6d4bff9d2fc72":"2XDDf","73109cbf4f3c309d":"hTs8T","5320016e34c30467":"203uh",fd16f8f25b581951:"f7sIe","8a7b84039f1cf0d2":"1otz8","79379a3a8f3c26bb":"fkiQV","66903ca51bd2ea1d":"2iHLf","3b9f47d541e7d71f":"2Nh6w"}],hTs8T:[function(t,r,n){let o=t("29134b0b0820b091");function i(t){this.mode=o.NUMERIC,this.data=t.toString()}i.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){let r,n;// The input data string is divided into groups of three digits,
// and each group is converted to its 10-bit binary equivalent.
for(r=0;r+3<=this.data.length;r+=3)n=parseInt(this.data.substr(r,3),10),t.put(n,10);// If the number of input digits is not an exact multiple of three,
// the final one or two digits are converted to 4 or 7 bits respectively.
let o=this.data.length-r;o>0&&(n=parseInt(this.data.substr(r),10),t.put(n,3*o+1))},r.exports=i},{"29134b0b0820b091":"2XDDf"}],"203uh":[function(t,r,n){let o=t("9c7c9b869570f846"),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function a(t){this.mode=o.ALPHANUMERIC,this.data=t}a.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(t){let r;// Input data characters are divided into groups of two characters
// and encoded as 11-bit binary codes.
for(r=0;r+2<=this.data.length;r+=2){// The character value of the first character is multiplied by 45
let n=45*i.indexOf(this.data[r]);// The character value of the second digit is added to the product
n+=i.indexOf(this.data[r+1]),// The sum is then stored as 11-bit binary number
t.put(n,11)}// If the number of input data characters is not a multiple of two,
// the character value of the final character is encoded as a 6-bit binary number.
this.data.length%2&&t.put(i.indexOf(this.data[r]),6)},r.exports=a},{"9c7c9b869570f846":"2XDDf"}],f7sIe:[function(t,r,n){let o=t("1658cb836325c397"),i=t("a20a51f6cd184253");function a(t){this.mode=i.BYTE,"string"==typeof t&&(t=o(t)),this.data=new Uint8Array(t)}a.getBitsLength=function(t){return 8*t},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(t){for(let r=0,n=this.data.length;r<n;r++)t.put(this.data[r],8)},r.exports=a},{"1658cb836325c397":"lmLJ0",a20a51f6cd184253:"2XDDf"}],lmLJ0:[function(t,r,n){r.exports=function(t){for(var r=[],n=t.length,o=0;o<n;o++){var i=t.charCodeAt(o);if(i>=55296&&i<=56319&&n>o+1){var a=t.charCodeAt(o+1);a>=56320&&a<=57343&&(// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
i=(i-55296)*1024+a-56320+65536,o+=1)}// US-ASCII
if(i<128){r.push(i);continue}// 2-byte UTF-8
if(i<2048){r.push(i>>6|192),r.push(63&i|128);continue}// 3-byte UTF-8
if(i<55296||i>=57344&&i<65536){r.push(i>>12|224),r.push(i>>6&63|128),r.push(63&i|128);continue}// 4-byte UTF-8
if(i>=65536&&i<=1114111){r.push(i>>18|240),r.push(i>>12&63|128),r.push(i>>6&63|128),r.push(63&i|128);continue}// Invalid character
r.push(239,191,189)}return new Uint8Array(r).buffer}},{}],"1otz8":[function(t,r,n){let o=t("b935cfd1cd03a1f6"),i=t("ca4944585cc8d12d");function a(t){this.mode=o.KANJI,this.data=t}a.getBitsLength=function(t){return 13*t},a.prototype.getLength=function(){return this.data.length},a.prototype.getBitsLength=function(){return a.getBitsLength(this.data.length)},a.prototype.write=function(t){let r;// In the Shift JIS system, Kanji characters are represented by a two byte combination.
// These byte values are shifted from the JIS X 0208 values.
// JIS X 0208 gives details of the shift coded representation.
for(r=0;r<this.data.length;r++){let n=i.toSJIS(this.data[r]);// For characters with Shift JIS values from 0x8140 to 0x9FFC:
if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error("Invalid SJIS character: "+this.data[r]+"\nMake sure your charset is UTF-8");// Multiply most significant byte of result by 0xC0
// and add least significant byte to product
n=(n>>>8&255)*192+(255&n),// Convert result to a 13-bit binary string
t.put(n,13)}},r.exports=a},{b935cfd1cd03a1f6:"2XDDf",ca4944585cc8d12d:"2iHLf"}],"2Nh6w":[function(t,r,n){/******************************************************************************
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
 *****************************************************************************/var o={single_source_shortest_paths:function(t,r,n){// Predecessor map for each node that has been encountered.
// node ID => predecessor node ID
var i,a,s,l,u,d,c,f={},h={};h[r]=0;// Costs of shortest paths from s to all nodes encountered; differs from
// `costs` in that it provides easy access to the node that currently has
// the known shortest path from s.
// XXX: Do we actually need both `costs` and `open`?
var g=o.PriorityQueue.make();for(g.push(r,0);!g.empty();)// ...and explore the edges that connect u to those nodes, updating
// the cost of the shortest paths to any or all of those nodes as
// necessary. v is the node across the current edge from u.
for(s in a=// In the nodes remaining in graph that have a known cost from s,
// find the node, u, that currently has the shortest path from s.
(i=g.pop()).value,l=i.cost,// Get nodes adjacent to u...
u=t[a]||{})u.hasOwnProperty(s)&&(// Cost of s to u plus the cost of u to v across e--this is *a*
// cost from s to v that may or may not be less than the current
// known cost to v.
d=l+u[s],// If we haven't visited v yet OR if the current known cost from s to
// v is greater than the new cost we just found (cost of s to u plus
// cost of u to v across e), update v's cost in the cost list and
// update v's predecessor in the predecessor list (it's now u).
c=h[s],(void 0===h[s]||c>d)&&(h[s]=d,g.push(s,d),f[s]=a));if(void 0!==n&&void 0===h[n])throw Error(["Could not find a path from ",r," to ",n,"."].join(""));return f},extract_shortest_path_from_predecessor_list:function(t,r){for(var n=[],o=r;o;)n.push(o),t[o],o=t[o];return n.reverse(),n},find_path:function(t,r,n){var i=o.single_source_shortest_paths(t,r,n);return o.extract_shortest_path_from_predecessor_list(i,n)},/**
   * A very naive priority queue implementation.
   */PriorityQueue:{make:function(t){var r,n=o.PriorityQueue,i={};for(r in t=t||{},n)n.hasOwnProperty(r)&&(i[r]=n[r]);return i.queue=[],i.sorter=t.sorter||n.default_sorter,i},default_sorter:function(t,r){return t.cost-r.cost},/**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */push:function(t,r){this.queue.push({value:t,cost:r}),this.queue.sort(this.sorter)},/**
     * Return the highest priority element in the queue.
     */pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};r.exports=o},{}],i1BDL:[function(t,r,n){let o=t("5b3f7c513802d6c7");n.render=function(t,r,n){var i;let a=n,s=r;void 0!==a||r&&r.getContext||(a=r,r=void 0),r||(s=function(){try{return document.createElement("canvas")}catch(t){throw Error("You need to specify a canvas element")}}()),a=o.getOptions(a);let l=o.getImageWidth(t.modules.size,a),u=s.getContext("2d"),d=u.createImageData(l,l);return o.qrToImageData(d.data,t,a),i=s,u.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=l,i.width=l,i.style.height=l+"px",i.style.width=l+"px",u.putImageData(d,0,0),s},n.renderToDataURL=function(t,r,o){let i=o;void 0!==i||r&&r.getContext||(i=r,r=void 0),i||(i={});let a=n.render(t,r,i),s=i.type||"image/png",l=i.rendererOpts||{};return a.toDataURL(s,l.quality)}},{"5b3f7c513802d6c7":"3YBlJ"}],"3YBlJ":[function(t,r,n){function o(t){if("number"==typeof t&&(t=t.toString()),"string"!=typeof t)throw Error("Color should be defined as hex string");let r=t.slice().replace("#","").split("");if(r.length<3||5===r.length||r.length>8)throw Error("Invalid hex color: "+t);(3===r.length||4===r.length)&&(r=Array.prototype.concat.apply([],r.map(function(t){return[t,t]}))),6===r.length&&r.push("F","F");let n=parseInt(r.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:255&n,hex:"#"+r.slice(0,6).join("")}}n.getOptions=function(t){t||(t={}),t.color||(t.color={});let r=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,n=t.width&&t.width>=21?t.width:void 0,i=t.scale||4;return{width:n,scale:n?4:i,margin:r,color:{dark:o(t.color.dark||"#000000ff"),light:o(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},n.getScale=function(t,r){return r.width&&r.width>=t+2*r.margin?r.width/(t+2*r.margin):r.scale},n.getImageWidth=function(t,r){let o=n.getScale(t,r);return Math.floor((t+2*r.margin)*o)},n.qrToImageData=function(t,r,o){let i=r.modules.size,a=r.modules.data,s=n.getScale(i,o),l=Math.floor((i+2*o.margin)*s),u=o.margin*s,d=[o.color.light,o.color.dark];for(let r=0;r<l;r++)for(let n=0;n<l;n++){let c=(r*l+n)*4,f=o.color.light;if(r>=u&&n>=u&&r<l-u&&n<l-u){let t=Math.floor((r-u)/s),o=Math.floor((n-u)/s);f=d[a[t*i+o]?1:0]}t[c++]=f.r,t[c++]=f.g,t[c++]=f.b,t[c]=f.a}}},{}],"8CcR1":[function(t,r,n){let o=t("c36bbcf663291acc");function i(t,r){let n=t.a/255,o=r+'="'+t.hex+'"';return n<1?o+" "+r+'-opacity="'+n.toFixed(2).slice(1)+'"':o}function a(t,r,n){let o=t+r;return void 0!==n&&(o+=" "+n),o}n.render=function(t,r,n){let s=o.getOptions(r),l=t.modules.size,u=t.modules.data,d=l+2*s.margin,c=s.color.light.a?"<path "+i(s.color.light,"fill")+' d="M0 0h'+d+"v"+d+'H0z"/>':"",f="<path "+i(s.color.dark,"stroke")+' d="'+function(t,r,n){let o="",i=0,s=!1,l=0;for(let u=0;u<t.length;u++){let d=Math.floor(u%r),c=Math.floor(u/r);d||s||(s=!0),t[u]?(l++,u>0&&d>0&&t[u-1]||(o+=s?a("M",d+n,.5+c+n):a("m",i,0),i=0,s=!1),d+1<r&&t[u+1]||(o+=a("h",l),l=0)):i++}return o}(u,l,s.margin)+'"/>',h=s.width?'width="'+s.width+'" height="'+s.width+'" ':"",g='<svg xmlns="http://www.w3.org/2000/svg" '+h+('viewBox="0 0 '+d)+" "+d+'" shape-rendering="crispEdges">'+c+f+"</svg>\n";return"function"==typeof n&&n(null,g),g}},{c36bbcf663291acc:"3YBlJ"}]},["7rA3f"],"7rA3f","parcelRequire81ca")//# sourceMappingURL=referral.js.map
;
//# sourceMappingURL=referral.js.map
