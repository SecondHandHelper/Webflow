function showAccountInfo() {
    let identifier;
    if (authUser.phoneNumber) {
        identifier = authUser.phoneNumber;
    } else if (authUser.email) {
        identifier = authUser.email;
    }
    if (identifier) {
        accountInfoText.innerHTML = `Inloggad med ${identifier}`;
        accountInfoText.style.display = 'block';
    }
}

async function showOrderBagsSection() {
    const maxBags = await firebase.app().functions("europe-west1").httpsCallable('maxNumBags')();
    console.log("maxBags.data", maxBags.data);
    if (maxBags?.data?.maxOrderBags > 0) {
        document.getElementById('orderBagsSection').style.display = 'block';
    }
}

function showInviteToast(items) {
    let daysSinceLatestSold = 10;
    let soldItemsCount = 0;
    let oneSoldNotSentItemExist = false;
    let viewedToastBefore = user?.elementViews && user.elementViews.some(e => e.elementID === 'inviteToast') ? true : false;

    if (items) {
        items.forEach((doc) => { // Items is a global variable that equals to querySnapshot from loadCardLists.js
            var itemId = doc.id;
            var i = doc.data();
            let soldDate = i.soldDate;
            const status = i.status;
            const shippingStatus = i.shippingStatus;
            const shippingMethod = i.shippingMethod;
            const archived = i.archived;

            if (!archived && status === 'Sold' && soldDate) {
                soldItemsCount++;
                if (soldDate) {
                    soldDate = new Date(soldDate);
                    let nowDate = new Date();
                    let timeDifference = nowDate.getTime() - soldDate.getTime();
                    let daysDiff = Math.floor(timeDifference / (1000 * 3600 * 24));
                    if (daysDiff <= daysSinceLatestSold) { daysSinceLatestSold = daysDiff; }
                }
                if (shippingStatus !== 'Sent' && !shippingMethod) {
                    oneSoldNotSentItemExist = true;
                }
            }
        });
    }

    if (daysSinceLatestSold <= 3 && soldItemsCount >= 2 && oneSoldNotSentItemExist && user?.referralData?.referralCode && !viewedToastBefore) {
        referralCodeText.innerHTML = user.referralData.referralCode;
        triggerInviteToastOpen.click();

        // Store elementViews to be able to not show it again
        db.collection('users').doc(authUser.uid).update({ elementViews: firebase.firestore.FieldValue.arrayUnion({ elementID: "inviteToast", timestamp: new Date() }) });
        // Track with segment
        analytics.track("Element Viewed", { elementID: "inviteToast" });
    }
}

function showNpsSurvey(items) {
    const nowDate = new Date();
    let daysSinceFirstPublished = 0;
    let daysSinceLastPublished = 0;
    /*// Last viewed
    const surveyLastViewed = user?.elementViews && user.elementViews.some(e => e.elementID === 'npsSurvey') ? true : false;
    const lastViwedTimeDiff = nowDate.getTime() - surveyLastViewed.getTime();
    const daysSinceLastViewed = Math.floor(lastViwedTimeDiff / (1000 * 3600 * 24));*/

    // Last answered
    const doc = await db.collection('users').doc(authUser.uid).get();
    let npsArray = doc.data().nps;
    const surveyLastAnswered = new Date(npsArray[npsArray.length - 1].timestamp);
    const lastAnsweredTimeDiff = nowDate.getTime() - surveyLastAnswered.getTime();
    const daysSinceLastAnswered = Math.floor(lastAnsweredTimeDiff / (1000 * 3600 * 24));

    if (items) {
        items.forEach((doc) => {
            var itemId = doc.id;
            var i = doc.data();
            let soldDate = i.soldDate;
            let publishedDate = i.publishedDate;
            const status = i.status;
            const archived = i.archived;

            if (publishedDate && !archived) {
                publishedDate = new Date(publishedDate);
                let timeDiff = nowDate.getTime() - publishedDate.getTime();
                let daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
                if (daysDiff > daysSinceFirstPublished) {
                    daysSinceFirstPublished = daysDiff;
                    console.log("daysSinceFirstPublished UPDATED: ", daysSinceFirstPublished);
                }
                if (daysDiff < daysSinceLastPublished && daysDiff !== 0) {
                    daysSinceLastPublished = daysDiff;
                    console.log("daysSinceLastPublished UPDATED: ", daysSinceLastPublished);
                }
            }
        });
    }

    if (daysSinceFirstPublished >= 25 && daysSinceLastPublished <= 60 && surveyLastViewed) {
        window.location.href = window.location.origin + "/feedback-nps"
    }
}