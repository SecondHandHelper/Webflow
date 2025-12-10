import { shareCode } from "./general";
import QRCode from "qrcode";

async function main() {
  console.log('referral main');
  const params = new URL(window.location).searchParams;
  if (!params.has('app')) {
    if (!user.current?.referralData?.referralCode) {
      return location.href = '/private';
    }
  }
  
  // Show/hide referral text based on maiCircle status
  if (user.current?.maiCircle) {
    document.getElementById('referralText').style.display = 'none';
    document.getElementById('referralTextMaiCircle').style.display = 'block';
  }
  
  const referralCode = user.current?.referralData?.referralCode;
  document.getElementById('referralCode').innerText = referralCode || '';
  if (user.current?.referralData?.referredUsers?.length > 0) {
    document.getElementById('topStatsLoadingIcon').style.display = 'block';
  }

  document.getElementById('referralCode').innerText = user.current.referralData.referralCode;
  if (user.current?.referralData?.referredUsers?.length > 0) {
    //TOP STATS
    document.getElementById('invitedFriends').innerText = user.current.referralData.referredUsers.length;
    document.getElementById('topStatsDiv').style.visibility = 'visible';
    document.getElementById('topStats').style.display = 'flex';
    document.getElementById('topStatsLoadingIcon').style.display = 'none';
  }
}

const params = getParamsObject();
shareReferralLinkButton.addEventListener('click', shareCode);
document.getElementById('referralCode').innerText = '';
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
  user.whenSet(main);
  if (!user.current && !params.has('app')) {
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

