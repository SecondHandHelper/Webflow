async function showDeclineValuation(item) {
    document.getElementById('valuationText').innerText = 'Säljer ej';
    document.getElementById('valuationText').style.display = 'block';
    document.getElementById('rejectButton').style.display = 'none';
    document.getElementById('confirmButton').innerText = 'Okej'
    document.getElementById('newItemButton').style.display = 'flex';
    document.getElementById('declineExplanation').style.display = 'block';
    document.getElementById('valuationExplanation').style.display = 'none';
    document.getElementById('newItemButton').addEventListener('click', () => {
        sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
        localStorage.removeItem('newItem');
        sessionStorage.removeItem('newItemId');
        sessionStorage.removeItem('itemValuation');
        window.location.href = '/sell-item';
    });
    document.getElementById('confirmButton').addEventListener('click', () => {
        sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
        localStorage.removeItem('newItem');
        sessionStorage.removeItem('newItemId');
        sessionStorage.removeItem('itemValuation');
        window.location.href = '/private';
    });
    if (item.id) {
        await firebase.app().functions("europe-west1").httpsCallable('markItemRejected')({
            itemId: item.id, userDecline: false
        });
    }
}
async function acceptValuation(itemId, minPrice, maxPrice) {
    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
        const savedItem = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
        savedItem.item.infoRequests.price.status = 'Resolved';
        savedItem.item.infoRequests.price.response = 'Accepted';
        if (featureIsEnabled('adjustValuation') && (minInput?.value !== `${minPrice}` || maxInput?.value !== `${maxPrice}`)) {
            savedItem.item.infoRequests.price.userAdjustedMin = minInput.value;
            savedItem.item.infoRequests.price.userAdjustedMax = maxInput.value;
            if (!adjustmentOk(minPrice, maxPrice)) {
                savedItem.item.infoRequests.price.response = 'User proposal';
                savedItem.item.infoRequests.price.userProposalMotivation = document.getElementById('userProposalMotivation').value;
            }
        } else {
            savedItem.item.minPriceEstimate = minPrice;
            savedItem.item.maxPriceEstimate = maxPrice;
        }
        sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify(savedItem));
        return window.location.href = '/sign-in';
    } else {
        await firebase.app().functions("europe-west1").httpsCallable('saveAcceptedValuation')({
            itemId, minPrice, maxPrice, adjustmentMin: minInput.value, adjustmentMax: maxInput.value,
            userProposalMotivation: document.getElementById('userProposalMotivation').value
        });
        if (!document.referrer.includes('/private')) {
            const userPhoneSet = user.current?.phoneNumber?.length;
            return window.location.href = userPhoneSet ? `/item-confirmation` :
                `/user-contact`;
        } else {
            return window.location.href = `/private`;
        }
    }
}
