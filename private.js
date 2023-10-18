function showAccountInfo() {
    let identifier;
    if (authUser.current.phoneNumber) {
        identifier = authUser.current.phoneNumber;
    } else if (authUser.current.email) {
        identifier = authUser.current.email;
    }
    if (identifier) {
        accountInfoText.innerHTML = `Inloggad med ${identifier}`;
        accountInfoText.style.display = 'block';
        account.innerHTML = identifier;
        account.style.display = 'block'
    }
    if (user.current.addressFirstName && user.current.addressFirstName) {
        accountName.innerHTML = user.current.addressFirstName + ' ' + user.current.addressFirstName;
        accountName.style.display = 'block';
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
    let viewedToastBefore = user.current?.elementViews && user.current.elementViews.some(e => e.elementID === 'inviteToast') ? true : false;

    if (items) {
        items.forEach((doc) => { // Items is a global variable that equals to querySnapshot from loadCardLists.js
            var itemId = doc.id;
            var i = doc.data();
            let soldDate = i.soldDate;
            const status = i.status;
            const shippingStatus = i.shippingStatus;
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
                if (shippingStatus !== 'Sent') {
                    oneSoldNotSentItemExist = true;
                }
            }
        });
    }

    if (daysSinceLatestSold <= 3 && soldItemsCount >= 2 && oneSoldNotSentItemExist && user.current?.referralData?.referralCode && !viewedToastBefore) {
        referralCodeText.innerHTML = user.current.referralData.referralCode;
        triggerInviteToastOpen.click();

        // Store elementViews to be able to not show it again
        db.collection('users').doc(authUser.current.uid).update({ elementViews: firebase.firestore.FieldValue.arrayUnion({ elementID: "inviteToast", timestamp: new Date() }) });
        // Track with segment
        analytics.track("Element Viewed", { elementID: "inviteToast" });
    }
}
