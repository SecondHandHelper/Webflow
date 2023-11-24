!function(){var e=10;async function t(){let t=await firebase.app().functions("europe-west1").httpsCallable("maxNumBags")();if(t?.data)return t.data?.errorCode==="unfulfilled-order"?(document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Du har nyligen lagt en best\xe4llning som \xe4r p\xe5 v\xe4g till dig.\nV\xe4nta in p\xe5sarna innan du l\xe4gger fler best\xe4llningar.",0):t.data?.maxOrderBags===0?(document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Du kan bara best\xe4lla p\xe5sar om\ndu har p\xe5g\xe5ende f\xf6rs\xe4ljningar.",0):e=Math.min(t.data.maxOrderBags,e)}function d(){return+document.getElementById("numSmall").value+ +document.getElementById("numMedium").value+ +document.getElementById("numLarge").value}function n(){document.getElementById("orderBags").innerText=`Best\xe4ll ${d()} ${r()} gratis`,document.getElementById("orderBagsError").style.display="none"}function r(){return 1===d()?"p\xe5se":"p\xe5sar"}function s(e){return e?.replace(/\s/g,"")?.length>0}async function a(){let e=await db.collection("users").doc(authUser.current.uid).get(),{addressFirstName:t,addressLastName:d,addressStreetAddress:n,addressPostalCode:r,addressCity:a}=e.data();return[t,d,n,r,a].every(s)}function l(e,t,r){document.getElementById(e).addEventListener("click",function(){var e;(e=document.getElementById(r)).value=Math.max(+e.value-1,0),e.style.color=0==+e.value?"#c3c2c2":"#000",n()}),document.getElementById(t).addEventListener("click",function(){var e;e=document.getElementById(r),d()>=10||(e.value=Math.min(+e.value+1,10),n(),1!=+e.value||(e.style.color="black"))})}l("minusSmall","plusSmall","numSmall"),l("minusMedium","plusMedium","numMedium"),l("minusLarge","plusLarge","numLarge"),document.getElementById("userAddressForm").addEventListener("submit",async()=>{let e,t,d,n,r,s,a;let l=(e=document.getElementById("addressFirstName").value,t=document.getElementById("addressLastName").value,d=document.getElementById("addressStreetAddress").value,n=document.getElementById("addressCO").value,r=document.getElementById("addressPostalCode").value,s=document.getElementById("addressCity").value,a=document.getElementById("addressDoorCode").value,e=e?e.trim().charAt(0).toUpperCase()+e.trim().slice(1):"",t=t?t.trim().charAt(0).toUpperCase()+t.trim().slice(1):"",d=d?d.trim().charAt(0).toUpperCase()+d.trim().slice(1):"",{addressFirstName:e,addressLastName:t,addressStreetAddress:d,addressCO:n=n?n.trim():"",addressPostalCode:r=r?r.trim().replace(/\D/g,""):"",addressCity:s=s?s.trim().charAt(0).toUpperCase()+s.trim().slice(1):"",addressDoorCode:a=a?a.trim():""}),o=db.collection("users").doc(authUser.current.uid);await o.update(l),document.getElementById("orderBagsConfirmation").style.display="block",document.getElementById("addressFormDiv").style.display="none"}),document.getElementById("orderBags").addEventListener("click",async function(){if(0===d()){document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="V\xe4lj minst 1 p\xe5se";return}if(d()>10){document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="Max 10 p\xe5sar per best\xe4llning";return}document.getElementById("orderBagsError").style.display="none",document.getElementById("orderBags").style.display="none",document.getElementById("orderBagsSpinner").style.display="flex";//Tobias added
let e=await t();if(0===e){document.getElementById("orderBags").style.display="flex",document.getElementById("orderBagsSpinner").style.display="none";return}if(d()>e){document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText=`Inte fler \xe4n antalet p\xe5g\xe5ende f\xf6rs\xe4ljningar, dvs ${e}`,document.getElementById("orderBags").style.display="flex",document.getElementById("orderBagsSpinner").style.display="none";return}let n=+document.getElementById("numSmall").value,s=+document.getElementById("numMedium").value,l=+document.getElementById("numLarge").value;try{await firebase.app().functions("europe-west1").httpsCallable("orderSellerBags")({numLargeBags:l,numSmallBags:n,numMediumBags:s}),document.getElementById("bagsOrdered").innerText=`${d()} ${r()} p\xe5 v\xe4g!`}catch(e){errorHandler.report(e),document.getElementById("orderBagsError").style.display="block",document.getElementById("orderBagsError").innerText="N\xe5got gick fel vid best\xe4llningen. F\xf6rs\xf6k igen och kontakta oss om det fortfarande inte fungerar.",document.getElementById("orderBags").style.display="flex",document.getElementById("orderBagsSpinner").style.display="none";return}if(document.getElementById("orderBagsForm").style.display="none",await a())document.getElementById("orderBagsConfirmation").style.display="block";else{let e=await db.collection("users").doc(authUser.current.uid).get(),t=e.data();document.getElementById("addressFormDiv").style.display="block",document.getElementById("addressFirstName").value=t.addressFirstName||"",document.getElementById("addressFirstName").dispatchEvent(new Event("input")),document.getElementById("addressLastName").value=t.addressLastName||"",document.getElementById("addressLastName").dispatchEvent(new Event("input")),document.getElementById("addressStreetAddress").value=t.addressStreetAddress||"",document.getElementById("addressStreetAddress").dispatchEvent(new Event("input")),document.getElementById("addressCO").value=t.addressCO||"",document.getElementById("addressCO").dispatchEvent(new Event("input")),document.getElementById("addressPostalCode").value=t.addressPostalCode||"",document.getElementById("addressPostalCode").dispatchEvent(new Event("input")),document.getElementById("addressCity").value=t.addressCity||"",document.getElementById("addressCity").dispatchEvent(new Event("input")),document.getElementById("addressDoorCode").value=t.addressDoorCode||"",document.getElementById("addressDoorCode").dispatchEvent(new Event("input"))}}),document.getElementById("closeOrderBagsConfirmationButton").addEventListener("click",function(){document.getElementById("closeOrderBagsConfirmationButton").style.display="none",document.getElementById("closeOrderBagsSpinner").style.display="flex"})}();//# sourceMappingURL=orderBags.js.map

//# sourceMappingURL=orderBags.js.map
