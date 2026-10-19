
// The seller's status page (/trusted-seller-status). Since 2026-10-19 the seller status rule is
// the backend's (Functions users/salesQuality/sellerStatus.ts): extra benefits unlock at 9 of the
// first 10 sales approved, are kept at 90 % approved from 10 judged sales, and a seller is paused
// under 75 % (8 of the first 10 for a new seller). The copy below is the app's quality page's
// (MaiApp src/i18n/sv.json, salesQuality.*); every state sets its own text, so nothing written in
// the Webflow designer for this page shows any more.

const BENEFITS_AT = 9;
const CONTINUE_AT = 8;
const WINDOW = 10;

const BENEFITS = {
  fastPayout: 'Snabb utbetalning – betalt redan när du skickar. När din utbetalning är upp till 3 000 kr får du betalt så snart paketet registrerats som skickat hos fraktbolaget, oftast inom ett dygn. Vid högre belopp får du betalt när försäljningen godkänts.',
  fastPayoutCircle: 'Snabb utbetalning – betalt redan när du skickar. Du får betalt så snart paketet registrerats som skickat hos fraktbolaget, oftast inom ett dygn efter inlämning.',
  protection: 'Skydd vid reklamation – vi tar hand om kostnaden och hanteringen. Om en reklamation godkänns tar Mai hand om både hanteringen och kostnaden när din utbetalning är upp till 3 000 kr. Vid högre belopp skickas varan tillbaka till dig.',
  protectionCircle: 'Skydd vid reklamation – vi tar hand om kostnaden och hanteringen. Om en reklamation godkänns tar Mai hand om både hanteringen och kostnaden, oavsett varans försäljningspris.',
};

const PAUSED = {
  firstSales: `Minst ${CONTINUE_AT} av dina ${WINDOW} första försäljningar behöver vara godkända för att fortsätta sälja på Mai. Eftersom du inte nått dit har vi tillfälligt pausat din försäljning för att se över kvaliteten.`,
  share: 'Minst 75% av dina försäljningar behöver vara godkända för att fortsätta sälja på Mai. Eftersom du är under gränsen har vi tillfälligt pausat din försäljning för att se över kvaliteten.',
  fake: 'Vi har pausat din försäljning eftersom en såld vara har bedömts som oäkta.',
  ops: 'Vi har tillfälligt pausat din försäljning för att se över kvaliteten.',
};

// The app's rule (Functions BLOCKED_CONTACT_DAYS): "Vi hör av oss inom kort" for 30 days after the pause.
const CONTACT_DAYS = 30;

// blockedAt arrives as Firestore's JSON ({ _seconds, _nanoseconds }) or as a date string.
function dateOf(value) {
  if (value && typeof value === 'object' && typeof value._seconds === 'number') return new Date(value._seconds * 1000);
  const parsed = value ? new Date(value) : null;
  return parsed && !isNaN(parsed.getTime()) ? parsed : null;
}

// Mai Desk records that someone wrote to the seller about this pause (users.pauseContact, Functions
// webApi/deskIntercomApi.ts): the promise is kept, so it is not repeated. A later pause brings it back.
function contactedSincePause(seller) {
  const pausedAt = dateOf(seller?.blockedAt);
  const contactedAt = dateOf(seller?.pauseContact?.at);
  return !!pausedAt && !!contactedAt && contactedAt.getTime() >= pausedAt.getTime();
}

function contactSoon(seller) {
  const at = dateOf(seller?.blockedAt);
  return !!at && Date.now() - at.getTime() <= CONTACT_DAYS * 24 * 60 * 60 * 1000 && !contactedSincePause(seller);
}

function contentFor(seller) {
  const circle = seller?.maiCircle === true;
  const benefits = [circle ? BENEFITS.fastPayoutCircle : BENEFITS.fastPayout, circle ? BENEFITS.protectionCircle : BENEFITS.protection].join('\n\n');
  if (seller?.blocked === true) {
    return {
      trusted: false,
      heading: 'Pausat konto',
      body: `${PAUSED[seller.blockedReason] ?? PAUSED.ops}${contactSoon(seller) ? '\n\nVi hör av oss inom kort.' : ''}`,
    };
  }
  if (seller?.trustedSellerStatus === 'Trusted') {
    return {
      trusted: true,
      heading: 'Dina extra förmåner',
      body: `Tack att du beskriver korrekt och skickar i tid.\n\n${benefits}\n\nOm godkända försäljningar sjunker under 90% så pausas dina förmåner, men du kan fortsätta sälja på Mai som vanligt.`,
    };
  }
  if (seller?.trustedSellerStatus === 'Untrusted') {
    return {
      trusted: false,
      heading: 'Dina extra förmåner tar en paus',
      body: `Du kan fortsätta sälja som vanligt. De extra förmånerna låses upp igen när minst 90% av dina försäljningar är godkända.\n\n${benefits}\n\nOm godkända försäljningar sjunker under 75% så behöver vi pausa ditt konto för att se över kvaliteten.`,
    };
  }
  // Pending: a new seller.
  return {
    trusted: false,
    heading: 'Extra förmåner',
    body: `Låses upp när minst ${BENEFITS_AT} av dina ${WINDOW} första försäljningar är godkända.\n\n${benefits}\n\nFör att sälja på Mai behöver minst ${CONTINUE_AT} av dina ${WINDOW} första försäljningar vara godkända.`,
  };
}

function updateContentForUser() {
  // The link opened the 2024 "Pålitlig Säljare" article in Intercom; its rules no longer hold.
  document.getElementById('trustedSellerLink').style.display = 'none';
  const content = contentFor(user.current);
  console.log('user.current?.trustedSellerStatus', user.current?.trustedSellerStatus, 'blocked', user.current?.blocked === true);
  document.getElementById('trustedSellerIcon').style.display = content.trusted ? 'block' : 'none';
  document.getElementById('untrustedSellerIcon').style.display = content.trusted ? 'none' : 'block';
  document.getElementById('trustedSellerHeading').innerText = content.heading;
  document.getElementById('trustedSellerBody').innerText = content.body;
  loadingDiv.style.display = 'none';
  document.getElementById('contentDiv').style.display = 'block';
}

window.intercomSettings = { app_id: "klyy0le5" };
(function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/klyy0le5'; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); } } })();
Intercom('update', { 'hide_default_launcher': true });

user.whenSet(updateContentForUser);
