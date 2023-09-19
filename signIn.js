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
      await saveRefreshToken();
    } catch (error) {
      errorHandler.report(error);
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

async function saveRefreshToken() {
  const refreshToken = authUser.current.refreshToken
  const idToken = await authUser.current.getIdToken();
  try {
    // TODO: Change to maiapp.se to go live
    return await fetch('https://api.shh-test.page/maiappAuth', {
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer ' + idToken,
        'X-Mai-Refresh-Token': refreshToken,
      }
    });
  } catch (ex) {
    errorHandler.report(ex);
    console.log('Error setting cookie with refresh token', ex);
  }
}

async function loginWithCookieToken() {
  const cookie = getCookie('maiAuth');
  if (!cookie?.length) {
    return;
  }
  if (authUser.current) {
    return; // No need to log in
  }
  try {
    // Get an id token that can be validated by the firebase function maiappAuth
    const refreshResponse = await fetch(`https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: cookie
      })
    });
    const refreshJson = await refreshResponse.json();
    if (refreshJson.id_token && !authUser.current) {
      // Get a custom token that we can use to sign in
      const customTokenResponse = await fetch(`https://api.shh-test.page/maiappAuth?id_token=${refreshJson.id_token}`);
      const customTokenJson = await customTokenResponse.json();
      if (customTokenJson.status === 'customToken' && !authUser.current) {
        await firebase.auth().signInWithCustomToken(customTokenJson.customToken);
      }
    }
  } catch (ex) {
    errorHandler.report(ex);
    console.log('Failed to log in using saved token', ex);
  }
}

loginWithCookieToken();

function userIsSellingNewItem() {
  return sessionStorage.getItem('itemToBeCreatedAfterSignIn') &&
      (document.referrer.includes('/sell-item') || document.referrer.includes('/item-valuation'));
}

async function signedInNextStep(fallbackRedirect) {
    // User is signed in
    if (authUser.current) {
      const email = authUser.current.email || sessionStorage.getItem("email");
      const phone = authUser.current.phoneNumber || sessionStorage.getItem("phoneNumber");
      const ssn = authUser.current.personalId || sessionStorage.getItem("personalId");
      await updateFirestoreUserDocument(authUser.current.uid, email, phone, ssn); //Important that this happens first, since many other functions depend on an existing user document
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
