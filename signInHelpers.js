
function isInAppBrowser() {
  const browsers = {
    facebook: /\bFB[\w_]+\//,
    twitter: /\bTwitter/i,
    tiktok: /\bBytedance\//i,
    instagram: /\bInstagram/i,
  }
  for (let [browser, regex] of Object.entries(browsers)) {
    if (regex.test(navigator.userAgent)) {
      return browser;
    }
  }
  return false;
}

async function signInWithGoogle() {
  if (isInAppBrowser()) {
    const element = document.getElementById('inAppBrowserInfo');
    if (!element.classList.contains('tooltip-show')) {
      setTimeout(() => element.classList.add('tooltip-show'), 0);
    }
    return;
  }
  googleButtonText.style.display = 'none';
  googleButtonLoadingIcon.style.display = 'block';
  // [START auth_google_provider_create]
  var provider = new firebase.auth.GoogleAuthProvider();
  // [END auth_google_provider_create]


  //NEW POPUP SIGNIN
  try {
    await firebase.auth().signInWithPopup(provider)
    await authUser.whenSet(signedInNextStep);
  } catch (error) {
    errorHandler.report(error);
    const errorText = `[webflow] Error signing in with Google: ${error.code}, ${error.message}, ${error.email}, ${error}`;
    console.log(errorText);
  }
}

document.addEventListener('click', event => {
  const tooltip = document.getElementById('inAppBrowserInfo')
  if (!tooltip.contains(event.target)) {
    tooltip.classList.remove('tooltip-show');
  }
});
googleSignInButton.addEventListener('click', signInWithGoogle);
googleSignInButton2.addEventListener('click', signInWithGoogle);
