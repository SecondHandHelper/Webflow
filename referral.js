import {callBackendApi, shareCode} from "./general";
import QRCode from "qrcode";

async function main() {
  if (!user.current?.referralData?.referralCode) {
      return location.href = '/private';
  }
  document.getElementById('referralCode').innerText = user.current.referralData.referralCode;
  if (user.current?.referralData?.referredUsers?.length > 0) {
      //TOP STATS
      document.getElementById('invitedFriends').innerText = user.current.referralData.referredUsers.length;
      const referredUserStatsResponse = await callBackendApi('/api/users/referredUserStats');
      const referredUserStats = referredUserStatsResponse.data;
      document.getElementById('soldItems').innerText = `${referredUserStats.soldItems}`;
      // https://supermiljobloggen.se/nyheter/secondhand-200-ganger-mindre-klimatskadligt-an-nyproducerat/
      // 1 plagg orsakar 10 kg CO2 (2-17), och köpa begagnat orsakar 10/200 kg = 0.02kg så i genomsnitt 10kg sparat/plagg
      document.getElementById('savedCo2').innerText = (referredUserStats.soldItems * 10 / 1000).toLocaleString('sv');
      topStatsDiv.style.visibility = 'visible';
      triggerShowReferralTopStats.click();

      //INVITE STATS
      document.getElementById('invitesRegistered').innerText = referredUserStats.users?.length
      document.getElementById('invitesAddedItems').innerText = referredUserStats.users?.filter(usr => usr.status === 'activated' || usr.status === 'sold').length;
      document.getElementById('invitesSoldItems').innerText = referredUserStats.users?.filter(usr => usr.status === 'sold').length;
      const invitedFriendRow = document.getElementById('invitedFriendRow');
      const invitedFriendStatusesDiv = document.getElementById('invitedFriendStatusesDiv');
      invitedFriendStatusesDiv.innerHTML = '';
      for (const [idx, invitedFriend] of (referredUserStats.users?.entries() || [])) {
          const newRow = invitedFriendRow.cloneNode(true);
          newRow.id = `${newRow.id}_${idx}`;
          newRow.firstChild.innerText = invitedFriend.name;
          newRow.childNodes[1].innerText = statusText(invitedFriend.status);
          invitedFriendStatusesDiv.appendChild(newRow);
      }
      document.getElementById('referralDetails').style.display = 'block';
      callBackendApi('/api/users/referralStats').then(referralStatsResponse => {
        const referralStats = referralStatsResponse.data;
        document.getElementById('nextFreePill').style.display = referralStats.freeSells > referralStats.usedFreeSells ? 'block' : 'none';
        document.getElementById('freeSells').innerText = referralStats.freeSells;
        document.getElementById('usedFreeSells').innerText = referralStats.usedFreeSells;
        document.getElementById('availableFreeSells').innerText = `/${referralStats.freeSells}`;
        freeSellsStats.style.visibility = 'visible';
        freeSellsStatsLoadingIcon.style.display = 'none';
        //To add: Show airtable data...
      });
  }
}

function statusText(status) {
  return {
      registered: 'Skapat konto',
      activated: 'Lagt upp plagg',
      sold: 'Sålt plagg'
  }[status];
}

shareReferralLinkButton.addEventListener('click', shareCode);
document.getElementById('referralCode').innerText = '';
const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
const referralCode = sessionUser?.referralData?.referralCode;
document.getElementById('referralCode').innerText = referralCode || '';
if (sessionUser?.referralData?.referredUsers?.length > 0){
    document.getElementById('topStatsLoadingIcon').style.display = 'block';
}
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
  user.whenSet(main);
  if (!sessionUser) {
    location.href = '/sign-in'
  }
} else {
  const qrCanvas = document.getElementById('qrCanvas')
  if (qrCanvas) {
    QRCode.toCanvas(qrCanvas, window.location.href, function (error) {
      if (error) console.error(error)
      console.log('success!');
    });
  }
}

