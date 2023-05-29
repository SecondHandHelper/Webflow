firebase.auth().onAuthStateChanged(async (result) => {
  console.log("onAuthStateChanged callback");
  const now = new Date().toISOString();

  if (result) {
    // Get and set current user
    authUser.current = result;
    try {
      const doc = await db.collection("users").doc(authUser.current.uid).get();
      if (doc.exists) {
        user.current = doc.data();
        console.log("user:", user);
        identify();
      }
      console.log("authUser", authUser.current);
      setPreferredLogInMethodCookie(authUser.current.providerData[0].providerId);
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
      window.location.replace('./');
    }
  }
});

async function signedInNextStep() {
    // User is signed in
    if (authUser.current) {
      const email = authUser.current.email || sessionStorage.getItem("email");
      const phone = authUser.current.phoneNumber || sessionStorage.getItem("phoneNumber");
      await updateFirestoreUserDocument(authUser.current.uid, email, phone); //Important that this happens first, since many other functions depend on an existing user document
    }
    console.log({referrer: document.referrer});
    // If itemCreatedFromAnotherItem in sessionStorage => Back to sell-item
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn') && document.referrer.includes('/sell-item')) {
        window.location.replace('./sell-item');
    } else {
        window.location.replace('./private');
    }
}
