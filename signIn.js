async function signedInNextStep() {
    // User is signed in
    // If itemCreatedFromAnotherItem in sessionStorage => Back to sell-item
    if (authUser) {
      const email = authUser.email || sessionStorage.getItem("email");
      const phone = authUser.phoneNumber || sessionStorage.getItem("phoneNumber");
      await updateFirestoreUserDocument(authUser.uid, email, phone); //Important that this happens first, since many other functions depend on an existing user document
    }
    console.log({referrer: document.referrer});
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn') && document.referrer.includes('/sell-item')) {
        window.location.replace('./sell-item');
    } else {
        window.location.replace('./private');
    }
}
