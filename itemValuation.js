const getMlValuation = async () => {
    if (!itemId) {
        return window.location.href = '/private';
    }
    const item = sessionStorage.getItem('itemToBeCreatedAfterSignIn');
    const itemId = params.id;
    // const res = { data: { mlDsValuationLog: 'Success', newMaxPriceEstimate: 600, newMinPriceEstimate: 390 }};
    const res = await firebase.app().functions("europe-west1").httpsCallable('itemMlValuation')({ itemId, item });
    const { newMinPriceEstimate: minPrice, newMaxPriceEstimate: maxPrice, mlDsValuationLog: valuationResult } = res.data;
    if (valuationResult === 'Manual') {
        return window.location.replace('/item-confirmation');
    }
    document.getElementById('loadingDiv').style.display = 'none';
    document.getElementById('valuationResultDiv').style.display = 'block';
    document.getElementById('valuationText').innerText = `${minPrice} - ${maxPrice} kr`;
    if (valuationResult === 'Decline') {
        document.getElementById('deniedText').style.display = 'block';
        document.getElementById('rejectButton').style.display = 'none';
        document.getElementById('confirmButton').innerText = 'Okej'
        document.getElementById('commissionText').style.display = 'none';
        document.getElementById('confirmButton').addEventListener('click', async () => {
            if (itemId) {
                await firebase.app().functions("europe-west1").httpsCallable('markItemRejected')({ itemId, minPrice, maxPrice, userDecline: false });
            }
            if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
                sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
                localStorage.removeItem('newItem');
            }
            return window.location.href = '/sell-item';
        });
    }
    document.getElementById('confirmButton').addEventListener('click', () => {
        // await firebase.app().functions("europe-west1").httpsCallable('deleteItem')({ itemId });
        return window.location.href = '/item-confirmation';
    });
    document.getElementById('rejectButton').addEventListener('click', async () => {
        if (itemId) {
            await firebase.app().functions("europe-west1").httpsCallable('markItemRejected')({ itemId, minPrice, maxPrice, userDecline: true });
        }
        if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
            sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
            localStorage.removeItem('newItem');
        }
        return window.location.href = '/sell-item';
    });
}

// uncomment when running locally
// const parceled = true
getMlValuation();

