!function(){async function e(){if(!user.current.referralData?.referralCode)return location.href="/private";if(document.getElementById("referralCode").innerText=user.current.referralData.referralCode,user.current?.referralData?.referredUsers?.length>0){document.getElementById("topStats").classList.add("animatedBackground"),document.getElementById("invitedFriends").innerText=user.current.referralData.referredUsers.length,document.getElementById("topStatsDiv").style.display="flex",document.getElementById("referralDetails").style.display="block",firebase.app().functions("europe-west1").httpsCallable("referralStats")().then(e=>{let t=e.data;document.getElementById("nextFreePill").style.display=t.freeSells>t.usedFreeSells?"block":"none",document.getElementById("freeSells").innerText=t.freeSells,document.getElementById("usedFreeSells").innerText=t.usedFreeSells,document.getElementById("availableFreeSells").innerText=`/${t.freeSells}`});let e=await firebase.app().functions("europe-west1").httpsCallable("referredUserStats")(),t=e.data;document.getElementById("soldItems").innerText=`${t.soldItems}`,// https://supermiljobloggen.se/nyheter/secondhand-200-ganger-mindre-klimatskadligt-an-nyproducerat/
// 1 plagg orsakar 10 kg CO2 (2-17), och köpa begagnat orsakar 10/200 kg = 0.02kg så i genomsnitt 10kg sparat/plagg
document.getElementById("savedCo2").innerText=(10*t.soldItems/1e3).toLocaleString("sv"),document.getElementById("invitesRegistered").innerText=t.users?.length,document.getElementById("invitesAddedItems").innerText=t.users?.filter(e=>"activated"===e.status||"sold"===e.status).length,document.getElementById("invitesSoldItems").innerText=t.users?.filter(e=>"sold"===e.status).length;let n=document.getElementById("invitedFriendRow"),r=document.getElementById("invitedFriendStatusesDiv");for(let[e,l]of(r.innerHTML="",t.users?.entries()||[])){let t=n.cloneNode(!0);t.id=`${t.id}_${e}`,t.firstChild.innerText=l.name,t.childNodes[1].innerText=({registered:"Skapat konto",activated:"Lagt upp plagg",sold:"S\xe5lt plagg"})[l.status],r.appendChild(t)}}}shareReferralLinkButton.addEventListener("click",shareCode),document.getElementById("referralCode").innerText="",user.whenSet(e)}();//# sourceMappingURL=referral.js.map

//# sourceMappingURL=referral.js.map
