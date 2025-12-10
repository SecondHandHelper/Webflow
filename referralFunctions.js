async function showReferralSection() {
  if (user.current?.referralData?.referralCode) {
    document.getElementById("myReferralCodeText").innerHTML = user.current.referralData.referralCode;
    if (user.current?.referralData?.activatedReferredUsersCount > 0) {
      // shareCodeState 'block', but should also show the bonus received... TODO"... Eller förresten, detta ska nog ligga på en referral sida + SMS
      shareCodeState.style.display = 'block';
    } else {
      shareCodeState.style.display = 'block';
    }
  }
  referralSection.style.display = 'block';
}

async function showBonusSection() {
  const userCreatedDate = new Date(authUser.current.metadata.creationTime);
  const now = new Date();
  let daysDiff = (now.getTime() - userCreatedDate.getTime()) / (1000 * 3600 * 24);
  console.log("Days since user registered", daysDiff);
  const referralData = user.current?.referralData;

  // Check for VIP invite first
  if (user.current?.vipInvite) {
    return;
  }

  if (!user.current?.vipInvite && referralData && referralData?.referredBy && !referralData?.referredByBonusPaid && !referralData?.referredByDiscountUsed) {
    // Get inviters first name
    const inviter = referralData?.referredBy;
    const res = await callBackendApi(`/api/users/${inviter}/referrerInfo`, { requiresAuth: true });
    console.log('referrerName result', res);
    await showActivatedBonus(res?.data?.name, res?.data?.code);
    bonusSection.style.display = 'block';
    return;
  }
  
  if ((user.current?.referralData?.referredBy ? false : true) && daysDiff <= 30) {
    if (bonusActivatedState.style.display === 'none' || bonusActivatedState.style.display === '') {
      enterCodeState.style.display = 'block';
      bonusSection.style.display = 'block';
    }
  }
}

async function showActivatedBonus(referrerName, referrerCode, isVipInvite = false) {
  console.log('showActivatedBonus run');
  if (document.getElementById("bonusSection")) {
    if (isVipInvite) {
      // VIP invite special handling
      let bonusNameText = 'INBJUDEN AV VÄN';
      if (referrerName) {
        bonusNameText = "INBJUDEN AV " + referrerName.toUpperCase();
      }
      document.getElementById("bonusName").innerHTML = bonusNameText;
      document.getElementById("bonusTitle").innerHTML = 'Välkommen';
      document.getElementById("bonusText").innerHTML = 'Eftersom du blivit särskilt inbjuden vill vi ge dig en extra fin start. Du får sälja dina första tre plagg helt utan avgift, och vi bjuder på 200 kr att handla för på Mai.';
      document.getElementById("bonusActivatedState").style.display = 'block';
      document.getElementById("enterCodeState").style.display = 'none';
      bonusSection.style.display = 'block';
    } else {
      let bonusNameText = 'BONUS';
      if (referrerName && referrerName !== 'Mai') {
        bonusNameText = "BONUS - INBJUDEN AV " + referrerName.toUpperCase();
      } else if (referrerCode) {
        bonusNameText = "BONUS - " + referrerCode.toUpperCase();
      }
      document.getElementById("bonusName").innerHTML = bonusNameText;
      document.getElementById("bonusActivatedState").style.display = 'block';
      document.getElementById("enterCodeState").style.display = 'none';
      bonusSection.style.display = 'block';
    }
  }
}

async function createReferralCode() {
  if (!user.current?.referralData?.referralCode) {
    const referralCode = await callBackendApi(`/api/users/referralCode`, { method: 'PUT' });
    console.log("New referral code stored: ", referralCode?.data?.referralCode);
    user.current.referralData = { ...user.current.referralData, referralCode: referralCode?.data?.referralCode };
    await showReferralSection();
  }
}

async function showReferralErrorMessage(msg) {
  // Show message they can't add their own code
  errorBannerMessage.innerHTML = msg ? msg : errorBannerMessage.innerHTML;
  errorMessageBanner.style.display = 'flex';
  saveRefCodeLoadingDiv.style.display = 'none';
  saveReferralCodeButton.style.display = 'inline-block';
  //saveReferralCodeButton.click(); //To trigger animation
  setTimeout(function () {
    errorMessageBanner.style.display = 'none';
  }, 2500);
}

async function connectReferralUsers(inputCode) {
  inputCode = inputCode.trim().toUpperCase();
  if (inputCode === user.current?.referralData?.referralCode) {
    await showReferralErrorMessage('Du kan inte aktivera din egen kod');
    return
  }

  // Find user with matching referral code and connect users
  try {
    const res = await callBackendApi('/api/users/referredBy', { data: { code: inputCode }, method: 'PUT' });
    deleteCookie('invite');
    console.log('connecReferralUser response: ', res);
    if (res?.data?.code === 400) { //User already used a referral
      return 
    }
    if (res?.data?.name) {
      // Refresh user data to get updated vipInvite status
      const userResponse = await callBackendApi('/api/users', { requiresAuth: true });
      if (userResponse?.data) {
        user.current = userResponse.data;
        localStorage.setItem('sessionUser', JSON.stringify(user.current));
      }
      
      // Check if user has vipInvite after refresh
      if (user.current?.vipInvite) {
        await showActivatedBonus(res?.data?.name, inputCode, true);
      } else {
        await showActivatedBonus(res?.data?.name, inputCode);
      }
      console.log("Referral connection successfully stored");
    } else {
      console.log("Failed to use referral code", res?.data);
      await showReferralErrorMessage(`Koden ${inputCode} finns inte`);
    }
  } catch (e) {
    errorHandler.report(e);
    console.log("Failed to use referral code", e);
  }
}
