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
            console.log("shareCodeState 'block'");
            shareCodeState.style.display = 'block';
        }
    } else if (user?.referralData?.referredBy && !user?.referralData?.referredByBonusPaid) {
        console.log("referredByBonusState 'block'");
        // Get inviters first name
        const inviter = user?.referralData?.referredBy;
        console.log("inviter", inviter);
        await db.collection("users").doc(inviter).get().then((doc) => {
            if (doc.exists) {
                const name = doc.data().addressFirstName;
                document.getElementById("referredByBonusTitle").innerHTML = "Välkomstgåva från " + name;
            }
        });
        referredByBonusState.style.display = 'block';
    } else if ((user?.referralData?.referredBy ? false : true) && daysDiff < 100) {
        console.log("enterCodeState 'block'");
        enterCodeState.style.display = 'block';
    }
    console.log("Showing referral section");
    referralSection.style.display = 'block';
}

function createReferralCode() {
    const fn = user.addressFirstName;
    const ln = user.addressLastName;
    let letterCombo = fn.trim() + ln.charAt(0);
    letterCombo = letterCombo.toUpperCase();
    let newCode = letterCombo;

    // Check if letterCombo exists and increase number
    if (!user?.referralData?.referralCode) {
        db.collection("users")
            .where("referralData.referralCode", "!=", "")
            .get()
            .then((querySnapshot) => {
                let letterComboExists = false;
                let highestNumber = 0;
                console.log("Users with referral code: ", querySnapshot.size);
                querySnapshot.forEach((doc) => {
                    const refCode = doc.data().referralData.referralCode.match(/[a-zA-Z]+|[0-9]+/g); //Split letters and numbers. TOBIASR1 -> ["TOBIASR", "1"]
                    if (refCode[0] == letterCombo) {
                        letterComboExists = true;
                        let n = Number(refCode[1]);
                        if (n > highestNumber) {
                            highestNumber = n;
                        }
                    }
                });

                // Put together new code
                if (letterComboExists) {
                    const number = highestNumber + 1;
                    newCode = letterCombo + number.toString();
                }

                // Store referral code
                db.collection('users').doc(authUser.uid).update({
                    "referralData.referralCode": newCode
                }).then(function () {
                    console.log("New referral code stored: ", newCode);
                    user.referralData.referralCode = newCode;
                    showReferralSection();
                });
            });
    }
}

function connectReferralUsers(inputCode) {
    // Find user with matching referral code and connect users
    
    inputCode = inputCode.trim().toUpperCase();
    db.collection("users")
        .where("referralData.referralCode", "!=", "")
        .get()
        .then((querySnapshot) => {
            let inviterUserId;
            let inviterName;
            let inviterCode;
            for (var i in querySnapshot.docs) {
                const doc = querySnapshot.docs[i];
                const refCode = doc.data().referralData.referralCode.toUpperCase();
                if (refCode == inputCode) {
                    inviterUserId = doc.id;
                    inviterName = doc.data().addressFirstName;
                    inviterCode = refCode;
                    break;
                }
            }

            // CONNECT USERS
            if (inviterUserId && !user?.referralData?.referredBy) {
                // Add referredBy
                db.collection('users').doc(authUser.uid).update({
                    "referralData.referredBy": inviterUserId
                }).then(() => {
                    // Update referredUsers of the inviter
                    db.collection('users').doc(inviterUserId).update({ "referralData.referredUsers": firebase.firestore.FieldValue.arrayUnion(authUser.uid) }).then(() => {
                        document.getElementById("referredByBonusTitle").innerHTML = "Välkomstgåva från " + inviterName;
                        referredByBonusState.style.display = 'block';
                        enterCodeState.style.display = 'none';
                        console.log("Referral connection successfully stored");
                    });
                });
            }
        });
}