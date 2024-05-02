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
        localStorage.setItem('sessionUser', JSON.stringify(user.current));
      }
    } catch (error) {
      errorHandler.report(error);
      console.log("Error getting document:", error);
    }
  } else {
    console.log('No user');
    localStorage.removeItem('authUserId');
    localStorage.removeItem('sessionUser');
    // Go to landing page if no user and on logged in pages
    const path = window.location.pathname;
    // Latest page view for logged out users
    analytics.identify({ latestPageView: now });

    if (path === "/private" || path === "/personal-id-form" || path === "/address-form" || path === "/item" || path === "/ship-item" || path === "/edit-item" || path === "/order-bags") {
      location.href = './sign-in' + window.location.search;
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

function displayIntroDivText(introId) {
  if (document.referrer.includes('/ship-item?id=')) {
    document.getElementById(introId).innerText = 'Du behöver logga in för att se hur du skickar ditt sålda plagg';
  }
  if (document.referrer.includes('/order-bags')) {
    document.getElementById(introId).innerText = 'Du behöver logga in för att beställa påsar';
  }
  if (document.referrer.includes('/item?id=')) {
    document.getElementById(introId).innerText = 'Du behöver logga in för att se ditt plagg';
  }
  if (document.referrer.includes('/settings')) {
    document.getElementById(introId).innerText = 'Du behöver logga in för att ändra inställningar';
  }
  if (new URL(document.referrer).pathname === '/') {
    document.getElementById(introId).innerText = 'Du behöver logga in för att se dina plagg';
  }
}

async function getSignInInfo() {
  const params = getParamsObject();
  if (params['s'].length >= 3) {
    // response data: {"method":"google.com","email":"user@maiapp.se","phone":"+46734433221"}
    const response = await fetch(`https://usersignininfo-heypmjzjfq-ew.a.run.app?signInInfoKey=${params['s']}`);
    return await response.json();
  }
  return null;
}

async function signedInNextStep(fallbackRedirect) {
  // User is signed in
  if (authUser.current) {
    const email = authUser.current.email || sessionStorage.getItem("email");
    const phone = authUser.current.phoneNumber || sessionStorage.getItem("phoneNumber");
    const ssn = authUser.current.personalId || sessionStorage.getItem("personalId");
    await updateFirestoreUserDocument(authUser.current.uid, email, phone, ssn); //Important that this happens first, since many other functions depend on an existing user document
  }
  const hostname = window.location.protocol + "//" + window.location.host;
  if (getParamsObject()['s'].length >= 3 && document.referrer.startsWith(hostname)) {
    location.href = new URL(document.referrer).pathname;
  } else if (userIsSellingNewItem()) {
    // If itemCreatedFromAnotherItem in sessionStorage => Back to sell-item
    location.href = './sell-item';
  } else if (localStorage.getItem('lwlItemDrafts')) {
    location.href = '/lwl?createDrafts=true';
  } else if (fallbackRedirect && typeof fallbackRedirect === 'string') {
    location.href = fallbackRedirect;
  } else if (document.referrer.includes('referral')) {
    // Redirect to referral after sign-in if that's where they came from
    location.href = '/referral';
  } else {
    location.href = './private';
  }
}
