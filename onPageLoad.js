// REDIRECTS
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var path = window.location.pathname;
var domain = window.location.origin;

// Redirect to Home Desktop if on desktop
if (!isMobile && !(path == "/home-desktop" || path == "/privacy-policy" || path == "/end-user-agreement" || path == "/private" || path == "/user-management") && !domain.includes("shh-test")) {
  window.location.replace('./home-desktop');
}

// GET USER
var user;
var authUser;
firebase.auth().onAuthStateChanged((result) => {
  if (result) {
    authUser = result;

    // Get and set currentUser
    db.collection("users").doc(authUser.uid).get().then((doc) => {
      if (doc.exists) {
        user = doc.data();
        console.log("user:", user);
        fbq('init', '681886049842735', { 'external_id': authUser.uid }); fbq('track', 'PageView');
        tryAttribution();
        analytics.identify(`${authUser.uid}`, {
          logged_in: true
        });
      }

      if (typeof window.main === "function") {
        main();
      }
    }).catch((error) => { console.log("Error getting document:", error); });
  } else {
    analytics.identify({
      logged_in: false
    });
    console.log('No user');
  }
});