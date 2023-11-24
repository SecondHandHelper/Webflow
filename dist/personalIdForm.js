!function(){async function e(){// Grab values from form
let e,t=document.getElementById("personalId").value;// Write to Firestore
if(12!==(e=t.replace("-","")).length&&("19"!==e.substring(0,2)||"20"!==e.substring(0,2))&&(e=99>=Number(e.substring(0,2))&&Number(e.substring(0,2))>25?"19"+e:"20"+e),t=12===e.length?e:null){let e=db.collection("users").doc(authUser.current.uid);e.update({personalId:t}).then(()=>{console.log(`PersonalId of ${authUser.current.uid} is now updated`),personalIdConfirmationDiv.style.display="block",personalIdFormDiv.style.display="none"}).catch(e=>{errorHandler.report(e),// The document probably doesn't exist.
console.error("Error updating document: ",e)})}else location.href="/private"}document.getElementById("userPersonalIdForm").addEventListener("submit",e),document.getElementById("personalId").addEventListener("input",()=>{let e=!function(e){// verify we got 10 digits, otherwise it is invalid
if(10!==(e=e.replace(/\D/g,"")// strip out all but digits
.split("")// convert string to array
.reverse()// reverse order for Luhn
.slice(0,10)).length)return!1;let t=e.map(e=>Number(e)).reduce((e,t,n)=>(n%2&&(t*=2),t>9&&(t-=9),e+t));return 0==t%10}(document.getElementById("personalId").value)?"Ogiltigt personnummer":"";document.getElementById("personalId").setCustomValidity(e)})}();//# sourceMappingURL=personalIdForm.js.map

//# sourceMappingURL=personalIdForm.js.map
