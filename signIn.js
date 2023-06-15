firebase.auth().onAuthStateChanged(async (result) => {
  console.log("onAuthStateChanged callback");
  const now = new Date().toISOString();

  if (result) {
    // Get and set current user
    const authenticated = result;
    try {
      setPreferredLogInMethodCookie(authenticated.providerData[0].providerId);
      console.log("authUser", authUser.current);
      const doc = await db.collection("users").doc(authenticated.uid).get();
      authUser.current = authenticated;
      if (doc.exists) {
        identify(authenticated, doc.data());
        console.log("user:", doc.data());
        user.current = doc.data();
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  } else {
    console.log('No user');
    // Go to landing page if no user and on logged in pages
    const path = window.location.pathname;
    // Latest page view for logged out users
    analytics.identify({latestPageView: now});

    if (path === "/private" || path === "/personal-id-form" || path === "/address-form" || path === "/item" || path === "/ship-item" || path === "/edit-item" || path === "/order-bags") {
      location.href = './';
    }
  }
});

function userIsSellingNewItem() {
  return sessionStorage.getItem('itemToBeCreatedAfterSignIn') && document.referrer.includes('/sell-item')
}

async function signedInNextStep(fallbackRedirect) {
    // User is signed in
    if (authUser.current) {
      const email = authUser.current.email || sessionStorage.getItem("email");
      const phone = authUser.current.phoneNumber || sessionStorage.getItem("phoneNumber");
      await updateFirestoreUserDocument(authUser.current.uid, email, phone); //Important that this happens first, since many other functions depend on an existing user document
    }
    // If itemCreatedFromAnotherItem in sessionStorage => Back to sell-item
    if (userIsSellingNewItem()) {
        location.href = './sell-item';
    } else if (fallbackRedirect && typeof fallbackRedirect === 'string') {
        location.href = fallbackRedirect;
    } else {
        location.href = './private';
    }
}
