// REFERRAL PROGRAM FUNCTIONS
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

  if (referralData && referralData?.referredBy && (!referralData?.referredByBonusPaid || !referralData?.referredByDiscountUsed)) { //TODO: Behöver 'referredByDiscountUsed' till FS för att kunna se om de redan löst in 1 kommissionsfri försäljning
    // Get inviters first name
    const inviter = referralData?.referredBy;
    const inviterName = await firebase.app().functions("europe-west3").httpsCallable('referrerName')({ referrerId: inviter });
    if (inviterName?.data?.name && inviterName?.data?.name !== 'Mai') {
      document.getElementById('bonusName').innerHTML = `BONUS - INBJUDEN AV " + ${inviterName.data.name}`;
    }
    bonusActivatedState.style.display = 'block';
    bonusSection.style.display = 'block';
    return;
  }
  
  if ((user.current?.referralData?.referredBy ? false : true) && daysDiff <= 10) {
    enterCodeState.style.display = 'block';
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

async function showReferralErrorMessage (msg){
  // Show message they can't add their own code
  errorBannerMessage.innerHTML = msg ? msg : errorBannerMessage.innerHTML;
  errorMessageBanner.style.display = 'flex';
  saveRefCodeLoadingDiv.style.display = 'none';
  saveReferralCodeButton.style.display = 'inline-block';
  saveReferralCodeButton.click(); //To trigger animation
  setTimeout(function () {
    errorMessageBanner.style.display = 'none';
  }, 2000);
}

async function connectReferralUsers(inputCode) {
  inputCode = inputCode.trim().toUpperCase();
  if (inputCode === user.current?.referralData?.referralCode) {
    await showReferralErrorMessage('Du kan inte aktivera din egen kod');
    return
  }

  // Find user with matching referral code and connect users
  try {
    const referrerUser = await firebase.app().functions("europe-west3").httpsCallable('connectReferralUser')({ code: inputCode })
    if (referrerUser?.data?.name) {
      document.getElementById("bonusName").innerHTML = "BONUS - INBJUDEN AV " + referrerUser?.data?.name;
      bonusActivatedState.style.display = 'block';
      enterCodeState.style.display = 'none';
      console.log("Referral connection successfully stored");
    } else {
      console.log("Failed to use referral code", referrerUser?.data);
      await showReferralErrorMessage('Koden finns inte');
      return
    }
  } catch (e) {
    errorHandler.report(e);
    console.log("Failed to use referral code", e);
  }
}

async function checkSoldItemExists (){
  // Check if an item is sold
  await db.collection("items").where("user", "==", userId).where("status", "==", "Sold").get().then((querySnapshot) => {
    if (querySnapshot.size > 0) {
      return true;
    }
  });
  return false
}