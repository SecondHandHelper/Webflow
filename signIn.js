async function signedInNextStep() {
    // User is signed in
    // If itemCreatedFromAnotherItem in sessionStorage => Back to sell-item
    if (authUser) {
      await updateFirestoreUserDocument(authUser.uid, email, phone); //Important that this happen first, since many other functions depend on an existing user document
    }
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn') && document.referrer.includes('/sell-item')) {
        window.location.replace('./sell-item');
    } else {
        window.location.replace('./private');
    }
}
