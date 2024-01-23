console.log('Check onAuthStateChanged: ', new Date());
firebase.auth().onAuthStateChanged(async (result) => {
  console.log("onAuthStateChanged callback: ", new Date());
  const now = new Date().toISOString();
  if (result) {
    // Get and set current user
    const authenticated = result;
    authUser.current = authenticated;
    console.log("authUser:", authUser.current);
    localStorage.setItem('authUserId', authenticated.uid);
    try {
      setPreferredLogInMethodCookie(authenticated.providerData[0].providerId);
      const doc = await db.collection("users").doc(authenticated.uid).get();
      if (doc.exists) {
        identify(authenticated, doc.data());
        console.log("user:", doc.data());
        user.current = doc.data();
        sessionStorage.setItem('sessionUser', JSON.stringify(user.current));
      }
    } catch (error) {
      errorHandler.report(error);
      console.log("Error getting document:", error);
    }
  } else {
    console.log('No user');
    localStorage.removeItem('authUserId');
    sessionStorage.removeItem('sessionUser');
    // Go to landing page if no user and on logged in pages
    const path = window.location.pathname;
    // Latest page view for logged out users
    analytics.identify({ latestPageView: now });

    if (path === "/private" || path === "/personal-id-form" || path === "/address-form" || path === "/item" || path === "/ship-item" || path === "/edit-item" || path === "/order-bags") {
      location.href = './';
    }
    if (path === "/"){
      headerLoginLoading.style.display = 'none';
      headerLoginButton.style.display = 'flex';
    }
  }
});

function userIsSellingNewItem() {
  return sessionStorage.getItem('itemToBeCreatedAfterSignIn') &&
    (document.referrer.includes('/sell-item') || document.referrer.includes('/item-valuation'));
}

async function updateFirestoreUserDocument(userId, email, phone, ssn) {
  let fields = {};
  if (email) { fields["email"] = email; }
  if (phone) { fields["phoneNumber"] = phone; }
  if (ssn) { fields["personalId"] = ssn; }
  const signInMethod = authUser.current.providerData[0].providerId;
  if (signInMethod) { fields["signInMethod"] = signInMethod; }
  const docRef = db.collection("users").doc(userId);

  try {
    const doc = await docRef.get();
    if (doc.exists) {
      await docRef.update(fields);
      console.log(`User document ${userId} was successfully updated with these fields: `, fields);
    } else {
      // Get and set attribution utm parameters only when creating user doc
      const utm_campaign = checkCookie("utm_campaign");
      const utm_source = checkCookie("utm_source");
      const utm_medium = checkCookie("utm_medium");
      const utm_term = checkCookie("utm_term");
      const utm_content = checkCookie("utm_content");
      let a = {};
      if (utm_campaign) { a["utm_campaign"] = utm_campaign; }
      if (utm_source) { a["utm_source"] = utm_source; }
      if (utm_medium) { a["utm_medium"] = utm_medium; }
      if (utm_term) { a["utm_term"] = utm_term; }
      if (utm_content) { a["utm_content"] = utm_content; }
      if (Object.keys(a).length > 0) { fields["attribution"] = a }

      // Create User Document
      await docRef.set(fields);
      console.log(`User document was created with id ${userId} and these fields: `, fields);
      identify(authUser.current, fields);
      user.current = fields;

      // Connect referral user from invite cookie only when creating user doc
      const inputCode = checkCookie("invite");
      if (inputCode) {
        await connectReferralUsers(inputCode);
      }
    }
  } catch (e) {
    errorHandler.report(e);
    console.log("Something went wrong:", e);
  }
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
  } else if (document.referrer.includes('referral')) {
    // Redirect to referral after sign-in if that's where they came from
    location.href = '/referral';
  } else {
    location.href = './private';
  }
}
