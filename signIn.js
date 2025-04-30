console.log('Check onAuthStateChanged: ', new Date());
firebase.auth().onAuthStateChanged(async (result) => {
  console.log("onAuthStateChanged callback: ", new Date());
  const now = new Date().toISOString();
  if (result) {
    // Get and set current user
    const authenticated = result;
    const idToken = await result.getIdToken();
    authUser.current = authenticated;
    console.log("authUser:", authUser.current);
    localStorage.setItem('authUserId', authenticated.uid);
    localStorage.setItem('authUser', JSON.stringify(authUser.current));
    localStorage.setItem('idToken', idToken);
    try {
      setPreferredLogInMethodCookie(authenticated.providerData[0].providerId);
      const response = await callBackendApi('/api/users', { requiresAuth: true });
      const fsUser = response.data;
      if (fsUser) {
        const createdToday = new Date(fsUser.createdAt).toDateString() === new Date().toDateString();
        if (createdToday && !fsUser.preferences?.shippingMethod) {
          await callBackendApi('/api/users', { method: 'PUT', data: { data: {
            preferences: { shippingMethod: 'Service point' },
            ...(!fsUser.channelsInUse && { channelsInUse: ['Web'] })
          }}});
        }
        identify(authenticated, fsUser);
        console.log("user:", fsUser);
        user.current = fsUser;
        localStorage.setItem('sessionUser', JSON.stringify(user.current));
      }
    } catch (error) {
      errorHandler.report(error);
      console.log("Error getting document:", error);
    }
  } else {
    console.log('No user');
    user.current = null;
    authUser.current = null;
    localStorage.removeItem('authUserId');
    localStorage.removeItem('sessionUser');
    localStorage.removeItem('idToken');
    localStorage.removeItem('authUser');
    // Go to landing page if no user and on logged in pages
    // Latest page view for logged out users
    analytics.identify({ latestPageView: now });

    if (window.location.pathname === "/"){
      headerLoginLoading.style.display = 'none';
      headerLoginButton.style.display = 'flex';
    }
  }
});

// Refresh token and update localStorage
firebase.auth().onIdTokenChanged(async (user) => {
  if (user) {
    const idToken = await user.getIdToken();
    localStorage.setItem('idToken', idToken);
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

function displayIntroDivText(introId, email) {
  const element = document.getElementById(introId)
  if (!document.referrer || new URL(document.referrer).pathname === '/') {
    element.innerHTML = email ? `Logga in för att se dina plagg. Använd<br><strong>${email}</strong>.` : 'Du behöver logga in för att<br><strong>se dina plagg</strong>';
  } else if (document.referrer.includes('/ship-item?id=')) {
    element.innerHTML = email ? `Logga in för att se hur du skickar plagget. Använd<br><strong>${email}</strong>.` : 'Du behöver logga in för att <br><strong>se hur du skickar plagget</strong>';
  } else if (document.referrer.includes('/order-bags')) {
    element.innerHTML = email ? `Logga in för att beställa påsar. Använd<br><strong>${email}</strong>.` : 'Du behöver logga in för att <br><strong>beställa påsar</strong>';
  } else if (document.referrer.includes('/item?id=')) {
    element.innerHTML = email ? `Logga in för att se ditt plagg. Använd<br><strong>${email}</strong>.` : 'Du behöver logga in för att <br><strong>se ditt plagg</strong>';
  } else if (document.referrer.includes('/settings')) {
    element.innerHTML = email ? `Logga in för att ändra inställningar. Använd<br><strong>${email}</strong>.` : 'Du behöver logga in för att <br><strong>ändra inställningar</strong>';
  }
  if (element.innerHTML.length) {
    document.getElementById('notificationBanner').style.display = 'flex';
  }
}

async function getSignInInfo(signInInfoKey) {
  try {
    // response data: {"method":"google.com","email":"user@maiapp.se","phone":"+46734433221"}
    const response = await fetch(`https://europe-west1-second-hand-helper.cloudfunctions.net/webApi/api/users/signInInfo?signInInfoKey=${signInInfoKey}`);
    return await response.json();
  } catch(e) {
    console.error(e);
    return null;
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
  const hostname = window.location.protocol + "//" + window.location.host;
  const params = new URL(window.location).searchParams;
  if (params.has('s') && params.get('s').length >= 3 && document.referrer.startsWith(hostname)) {
    if (!document.referrer) {
      location.href = '/private';
    } else {
      const url = new URL(document.referrer);
      url.search = document.location.search;
      url.searchParams.delete('s');
      location.href = url.pathname + url.search;
    }
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
