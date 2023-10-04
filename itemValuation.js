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

const adjustmentOk = (minPrice, maxPrice) => {
    const minInput = document.getElementById('minPrice').value;
    const maxInput = document.getElementById('maxPrice').value;
    return minInput <= minPrice * 1.5 && maxInput <= maxPrice * 1.5 && minInput < maxInput && minInput >= 100;
}

const adjustmentValidations = (minPrice, maxPrice, adjustmentMinInput, adjustmentMaxInput) => {
    const adjustmentMin = Number(adjustmentMinInput.value);
    const adjustmentMax = Number(adjustmentMaxInput.value);
    adjustmentMaxInput.style.color = adjustmentMax > maxPrice * 1.5 ? '#E20000' : '#333';
    adjustmentMinInput.style.color = adjustmentMin > minPrice * 1.5 ? '#E20000' : '#333';
    if (adjustmentMax > maxPrice * 1.5 || adjustmentMin > minPrice * 1.5) {
        document.getElementById('adjustmentMotivation').style.display = 'block';
        const highPrice = [
            adjustmentMax > maxPrice * 1.5 ? 'startpris' : null,
            adjustmentMin > minPrice * 1.5 ? 'lägsta pris' : null
        ].filter(p => p).join(' och ');
        document.getElementById('adjustmentWarningText').innerText = `Ovanligt högt ${highPrice}, kräver granskning.`
        document.getElementById('adjustmentTips').style.display = 'none';
        document.getElementById('adjustmentNote').style.display = 'none';
        document.getElementById('confirmButton').innerText = 'Skicka för granskning';
    } else if (adjustmentMax > maxPrice || adjustmentMin > minPrice || adjustmentMin < minPrice || adjustmentMax < maxPrice) {
        document.getElementById('adjustmentNote').style.display = 'block';
        if (adjustmentMax > maxPrice) {
            document.getElementById('higherMaxPrice').style.display = 'block';
            document.getElementById('higherMinPrice').style.display = 'none';
            document.getElementById('lowerMinOrMaxPrice').style.display = 'none';
        } else if (adjustmentMin > minPrice) {
            document.getElementById('higherMaxPrice').style.display = 'none';
            document.getElementById('higherMinPrice').style.display = 'block';
            document.getElementById('lowerMinOrMaxPrice').style.display = 'none';
        } else {
            document.getElementById('higherMaxPrice').style.display = 'none';
            document.getElementById('higherMinPrice').style.display = 'none';
            document.getElementById('lowerMinOrMaxPrice').style.display = 'block';
        }
        document.getElementById('adjustmentMotivation').style.display = 'none;'
        document.getElementById('adjustmentTips').style.display = 'none';
        document.getElementById('confirmButton').innerText = 'Påbörja försäljning';
    } else {
        document.getElementById('adjustmentTips').style.display = 'block';
        document.getElementById('adjustmentNote').style.display = 'none';
        document.getElementById('adjustmentMotivation').style.display = 'none';
        document.getElementById('confirmButton').innerText = 'Påbörja försäljning';
    }
}

async function acceptValuation(itemId, minPrice, maxPrice) {
    if (!document.getElementById('wf-form-Valuation-form').reportValidity()) {
        return;
    }
    const minInput = document.getElementById('minPrice');
    const maxInput = document.getElementById('maxPrice');
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
        const savedItem = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
        savedItem.item.infoRequests.price.status = 'Resolved';
        savedItem.item.infoRequests.price.response = 'Accepted';
        if (featureIsEnabled('adjustValuation') && (minInput?.value !== `${minPrice}` || maxInput?.value !== `${maxPrice}`)) {
            savedItem.item.infoRequests.price.userAdjustedMin = Number(minInput.value);
            savedItem.item.infoRequests.price.userAdjustedMax = Number(maxInput.value);
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
            itemId, minPrice, maxPrice, adjustmentMin: Number(minInput.value), adjustmentMax: Number(maxInput.value),
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

const initialPageSetup = (item) => {
    document.getElementById('itemImage').src = window.innerWidth <= 400 ? item?.images?.enhancedFrontImageSmall : item?.images?.enhancedFrontImage;
    document.getElementById('chatLink').onclick = () => Intercom('showNewMessage',
        item.mlValuation?.decline ?
            `ID: ${item.id}\n\nGällande att ni tackade nej till ${item.brand.trim()}-${item.category.toLowerCase()}:\n\n` :
            `ID: ${item.id}\n\nGällande värderingen på ${item.mlValuation.minPriceEstimate}-${item.mlValuation.maxPriceEstimate} kr för ${item.brand.trim()}-${item.category.toLowerCase()}. Vad skulle du vilja ändra värderingen till och varför?\n\n`);
    document.getElementById('valuationClose').addEventListener('click', () => {
        sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
        if (!params.id) {
            localStorage.removeItem('newItem');
            sessionStorage.removeItem('newItemId');
        }
        return window.location.href = '/private';
    })
}

const rejectValuation = async (item) => {
    if (item.id) {
        await firebase.app().functions("europe-west1").httpsCallable('markItemRejected')({
            itemId: item.id, userDecline: true
        });
    }
    sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
    if (!params.id) {
        localStorage.removeItem('newItem');
        sessionStorage.removeItem('newItemId');
    }
    return window.location.href = '/private';
}
