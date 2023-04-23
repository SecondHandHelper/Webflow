async function updateUserAddress() {
    try {
        loadOnSavePressed()
        await firebase.app().functions("europe-west1").httpsCallable(
            'updateFirebaseUser',
        )({ ...await getFormAddressFields() })
        await onUpdateComplete()
    } catch (e) {
        console.log('Error updating user', e)
    }
}

async function updateShippingPreference() {
    loadOnSavePressed()
    let shippingMethod = "";
    let radioButtons = document.getElementsByName('shippingMethodSettings');
    for (let x = 0; x < radioButtons.length; x++) {
        if (radioButtons[x].checked) {
            shippingMethod = radioButtons[x].value; // "Service point" or "Pickup"
        }
    }
    await firebase.app().functions("europe-west1").httpsCallable(
        'updateFirebaseUser',
    )({ preferences: { shippingMethod } })
    await onUpdateComplete()
}

async function updateContactNumbers(isSwish) {
    try {
        loadOnSavePressed()
        await firebase.app().functions("europe-west1").httpsCallable(
            'updateFirebaseUser',
        )({ ...getCleanedNumber(isSwish) })
        await onUpdateComplete()
    } catch (e) {

    }
}

async function updateUserPersonId() {
    try {
        loadOnSavePressed()
        await firebase.app().functions("europe-west1").httpsCallable(
            'updateFirebaseUser',
        )({ personalId: formatPersonalId(personalId.value.trim().replace(/\D/g, '')) })
        await onUpdateComplete()
    } catch (e) {
        console.log('Error updating user', e)
    }
}