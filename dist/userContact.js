!function(){let e=async()=>{let e=JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"))?.item||JSON.parse(localStorage.getItem("latestItemCreated"));e&&(itemImage.src=e?.images?.enhancedFrontImageSmall||e?.images?.enhancedFrontImage||"",itemNotificationText.innerHTML=`Vi beh\xf6ver dina uppgifter f\xf6r att fullf\xf6lja f\xf6rs\xe4ljningen av ditt ${e.brand}-plagg. Anges bara en g\xe5ng.`,itemToBeCreatedDiv.style.display="block"),phoneNumber.addEventListener("input",function(){t("phoneNumberLabel");let e=formatPhoneNumber(phoneNumber.value),n=e.length>=12&&e.includes("+")?"":"Ogiltigt mobilnummer";phoneNumber.setCustomValidity(n)}),personalId.addEventListener("input",t("personalIdLabel")),saveUserDetailsButton.addEventListener("click",async()=>{let e=!personalId.value?.length||function(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}(personalId.value)?"":"Ogiltigt personnummer";if(personalId.setCustomValidity(e),document.getElementById("wf-form-User-Details").reportValidity()){try{let e;await firebase.app().functions("europe-west1").httpsCallable("updateFirebaseUser")({phoneNumber:formatPhoneNumber(phoneNumber.value),personalId:(e=personalId.value.replace("-",""),(12!==e.length&&("19"!==e.substring(0,2)||"20"!==e.substring(0,2))&&(e=99>=Number(e.substring(0,2))&&Number(e.substring(0,2))>25?"19"+e:"20"+e),12===e.length)?e:null)})}catch(e){console.error("Failed saving user contact info",e)}location.href="/item-confirmation"}})};function t(e){return t=>{document.getElementById(e).style.display=t.target.value.length>0?"inline-block":"none"}}e()}();//# sourceMappingURL=userContact.js.map

//# sourceMappingURL=userContact.js.map
