// REFERRAL PROGRAM FUNCTIONS
async function showReferralSection() {
    const userCreatedDate = new Date(authUser.metadata.creationTime);
    const now = new Date();
    let daysDiff = (now.getTime() - userCreatedDate.getTime()) / (1000 * 3600 * 24);
    console.log("Days since user registered", daysDiff);
    let soldItemExist = false;

    // Check if an item is sold
    await db.collection("items").where("user", "==", userId).where("status", "==", "Sold").get().then((querySnapshot) => {
        if (querySnapshot.size > 0) {
            soldItemExist = true;
        }
    });

    if (user?.referralData?.referralCode && soldItemExist) {
        document.getElementById("myReferralCodeText").innerHTML = user.referralData.referralCode;
        if (user?.referralData?.activatedReferredUsersCount > 0) {
            console.log("shareCodeState 'block', but should also show the bonus received... TODO");
            shareCodeState.style.display = 'block';
        } else {
            shareCodeState.style.display = 'block';
        }
    } else if (user?.referralData?.referredBy && !user?.referralData?.referredByBonusPaid) {
        // Get inviters first name
        const inviter = user?.referralData?.referredBy;

        const inviterName = await firebase.app().functions("europe-west3").httpsCallable('referrerName')({referrerId: inviter});
        if (inviterName?.data?.name) {
          document.getElementById("referredByBonusTitle").innerHTML = "Välkomstgåva från " + inviterName.data.name;
        }
        referredByBonusState.style.display = 'block';
    } else if ((user?.referralData?.referredBy ? false : true) && daysDiff < 100) {
        enterCodeState.style.display = 'block';
    }

    //START - Temporary showing enter code DIV for all users during Black Friday, delete this row after Black Friday 
    if ((user?.referralData?.referredBy ? false : true)) {
        enterCodeState.style.display = 'block'; 
    }
    //END
    
    referralSection.style.display = 'block';
}

async function createReferralCode() {
    if (!user?.referralData?.referralCode) {
      const referralCode = await firebase.app().functions("europe-west3").httpsCallable('setUserReferralCode')();
      console.log("New referral code stored: ", referralCode?.data?.referralCode);
      user.referralData.referralCode = referralCode?.data?.referralCode;
      await showReferralSection();
    }
}

async function connectReferralUsers(inputCode) {
    // Find user with matching referral code and connect users
  try {
    inputCode = inputCode.trim().toUpperCase();
    const referrerUser = await firebase.app().functions("europe-west3").httpsCallable('connectReferralUser')({code: inputCode})
    document.getElementById("referredByBonusTitle").innerHTML = "Välkomstgåva från " + referrerUser?.data?.name;
    referredByBonusState.style.display = 'block';
    enterCodeState.style.display = 'none';
    console.log("Referral connection successfully stored");
  } catch(e) {
    console.log("Failed to use referral code", e);
  }
}
