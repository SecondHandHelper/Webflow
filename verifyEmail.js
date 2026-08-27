// Landing page for the email verification link when it is opened somewhere the app
// can't intercept it (desktop browser, a mail client's in-app browser). On a phone with
// the app installed the OS opens the app directly and this page never renders.
//
// Contract: POST /api/users/emailVerification/redeem { uid, token } → { verified: true }
// Errors: 400 invalid link, 404/410 expired, 500 other.
//
// Expected Webflow elements (all hidden via verify-email-head.html until JS decides):
//   #verifyEmailPending  – "Verifierar…"
//   #verifyEmailSuccess  – "Klart! Gå tillbaka till appen."
//   #verifyEmailExpired  – "Länken har gått ut. Öppna appen och skicka ett nytt mail."
//   #verifyEmailError    – generic failure
//   #verifyEmailOpenApp  – optional <a> shown on success, pointed at the app link

const show = (id) => {
  const el = document.getElementById(id);
  if (el) el.style.display = 'block';
};
const hideAll = () => {
  ['verifyEmailPending', 'verifyEmailSuccess', 'verifyEmailExpired', 'verifyEmailError']
    .forEach((id) => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
};

async function redeem() {
  const uid = params.get('uid');
  const token = params.get('token');
  hideAll();
  if (!uid || !token) {
    show('verifyEmailError');
    return;
  }
  show('verifyEmailPending');
  // Plain fetch rather than callBackendApi: that helper collapses every non-OK
  // response into { data: undefined }, and here the status code is the whole point.
  let status;
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/users/emailVerification/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...CLIENT_CHANNEL_HEADERS },
      body: JSON.stringify({ uid, token }),
    });
    status = response.status;
  } catch (e) {
    errorHandler.report(e);
  }
  hideAll();
  if (status === 200) {
    show('verifyEmailSuccess');
    const openApp = document.getElementById('verifyEmailOpenApp');
    if (openApp) openApp.href = 'https://invite.mairesale.com/sell-item';
    analytics.track('Email Verified Via Web');
  } else if (status === 404 || status === 410) {
    show('verifyEmailExpired');
  } else {
    show('verifyEmailError');
    if (status && status !== 400) errorHandler.report(`verify-email redeem failed with ${status}`);
  }
}

redeem();
