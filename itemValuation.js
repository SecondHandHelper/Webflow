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
