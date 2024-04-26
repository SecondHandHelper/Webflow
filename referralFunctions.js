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

  if (referralData && referralData?.referredBy && !referralData?.referredByBonusPaid && !referralData?.referredByDiscountUsed) { //TODO: Behöver 'referredByDiscountUsed' till FS för att kunna se om de redan löst in 1 kommissionsfri försäljning
    // Get inviters first name
    const inviter = referralData?.referredBy;
    const res = await firebase.app().functions("europe-west3").httpsCallable('referrerName')({ referrerId: inviter });
    console.log('referrerName result', res);
    await showActivatedBonus(res?.data?.name, res?.data?.code);
    bonusSection.style.display = 'block';
    return;
  }
  
  if ((user.current?.referralData?.referredBy ? false : true) && (daysDiff <= 30 || daysDiff >= 60)) { //Ändra tillbaks till <=30 på måndag 29 april 2024
    console.log('IS THIS HAPPENING?!');
    if (bonusActivatedState.style.display === 'none' || bonusActivatedState.style.display === '') {
      console.log('IS THIS HAPPENING?!2');
      enterCodeState.style.display = 'block';
      bonusSection.style.display = 'block';
    }
  }
}

async function showActivatedBonus(referrerName, referrerCode) {
  console.log('showActivatedBonus run');
  let bonusNameText = 'BONUS';
  if (referrerName && referrerName !== 'Mai') {
    bonusNameText = "BONUS - INBJUDEN AV " + referrerName.toUpperCase();
  } else if (referrerCode) {
    bonusNameText = "BONUS - " + referrerCode.toUpperCase();
  }
  if (document.getElementById("bonusSection")) {
    document.getElementById("bonusName").innerHTML = bonusNameText;
    document.getElementById("bonusActivatedState").style.display = 'block';
    document.getElementById("enterCodeState").style.display = 'none';
    bonusSection.style.display = 'block';
  }
}

async function createReferralCode() {
  if (!user.current?.referralData?.referralCode) {
    const referralCode = await firebase.app().functions("europe-west3").httpsCallable('setUserReferralCode')();
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
    const res = await firebase.app().functions("europe-west3").httpsCallable('connectReferralUser')({ code: inputCode })
    deleteCookie('invite');
    console.log('connecReferralUser response: ', res);
    if (res?.data?.code === 400) { //User already used a referral
      return 
    }
    if (res?.data?.name) {
      await showActivatedBonus(res?.data?.name, inputCode);
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
