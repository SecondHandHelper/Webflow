// "Sälj vidare i appen" / "Fortsätt med appen": what every visitor gets instead of the web
// sell form (/sell-item) and instead of creating an account on /sign-in. New listings and
// new accounts are made in the app; Mina sidor stays on the web for following sales and
// shipping what sold, and an existing seller can still sign in on the web.
//
// The sheet is built here, markup and CSS, so the Webflow designer needs nothing. On a
// phone it is a bottom sheet with a "Ladda ner appen" button; on a computer a centered
// dialog with a QR code of the same link and the two store links.
//
// Its button is a Branch link (invite.mairesale.com) that opens the app, or the store
// when the app is missing. For a logged-in seller on a phone it carries a one-time
// handoff code from the backend (Functions src/users/appHandoff). The app trades the
// code for a sign-in on this account, but only when Branch reports the match as
// guaranteed:
// - app already installed: the link opens it directly;
// - Android install: Google Play's install referrer;
// - iPhone install: the link is copied to the pasteboard below, and the app's
//   "Logga in på samma konto" sheet (MaiApp WebHandoffSheet) pastes it with Apple's
//   paste button.
// Every other "download the app" link on the page carries a code too
// (installAppLinkHandoff), so any of them signs the app in, not only this sheet's.
// The "Logga in" buttons keep the channel sheet in general.js.

import QRCode from 'qrcode';

const BRANCH_SELL_LINK = 'https://invite.mairesale.com/sell-item';
const APP_STORE_LINK = 'https://apps.apple.com/se/app/mai-premium-resale/id6738430790';
const PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=se.maiapp.app.prod';
const APP_ICON_URL = 'https://cdn.shopify.com/s/files/1/0645/1229/5125/files/app-icon-1024.png?v=1766272333';
const HANDOFF_FETCH_TIMEOUT_MS = 4000;
// The backend's 30 minutes have to cover the store and the install after the tap, so a
// code is only reused while this much of it is left; otherwise a new one is fetched.
const HANDOFF_MIN_REMAINING_MS = 25 * 60 * 1000;
// The backend's lifetime (Functions HANDOFF_TTL_MINUTES), counted from when the request left
// this phone: its own clock may be minutes off the server's expiresAt.
const HANDOFF_TTL_MS = 30 * 60 * 1000;

const SHEET_ID = 'sellAppSheet';
const OVERLAY_ID = 'sellAppSheetOverlay';
const STYLE_ID = 'sellAppSheetStyle';

// `sell` is a click that would have opened the web sell form; `signup` is an attempt to
// create an account on /sign-in (signInHelpers.js).
export const SHEET_VARIANTS = ['sell', 'signup'];

const COPY = {
  // A seller who is signed in here: the move is about their selling.
  sellLoggedIn: {
    title: 'Sälj vidare i appen',
    body: 'Mai flyttar nu till appen. För att fortsätta lägga upp nya plagg och följa din försäljningskvalitet behöver du ladda ner appen.',
  },
  sell: {
    title: 'Fortsätt med appen',
    body: 'Nya plagg läggs upp i Mai-appen. Ladda ner appen för att komma igång – det tar bara en minut.',
  },
  signup: {
    title: 'Fortsätt med appen',
    body: 'Nya konton skapas i Mai-appen. Ladda ner appen för att komma igång – det tar bara en minut. Har du redan ett konto kan du logga in här på webben.',
  },
  // Only for a seller with something on sale or sold and not yet shipped (hasOngoingSales).
  ongoingSales: 'Du kan fortfarande se dina pågående försäljningar och skicka det som redan sålts här på webben under en övergångsperiod.',
  button: 'Ladda ner appen',
  // On a computer, above the QR code; the store links follow it.
  scan: 'Skanna QR-koden med mobilen så öppnas appen – eller App Store/Google Play om du inte har den än.',
  appStore: 'App Store',
  playStore: 'Google Play',
  // Under the button, small and grey; hidden until the app can keep the promise (showSignInNote).
  note: 'När du laddar ner appen via knappen ovan loggas du in automatiskt på ditt konto.',
  close: 'Stäng',
};

/** The title and body for a variant, given who is looking at it. */
export function copyFor(variant, loggedIn) {
  if (variant === 'signup') return COPY.signup;
  return loggedIn ? COPY.sellLoggedIn : COPY.sell;
}

const CSS = `
#${OVERLAY_ID} {
  position: fixed; inset: 0; z-index: 10000;
  background: rgba(0, 0, 0, 0.45);
  opacity: 0; visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}
#${OVERLAY_ID}.active { opacity: 1; visibility: visible; }
#${SHEET_ID} {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 10001;
  box-sizing: border-box; width: 100%; max-width: 520px; margin: 0 auto;
  max-height: 92vh; overflow-y: auto;
  padding: 28px 24px calc(24px + env(safe-area-inset-bottom, 0px));
  background: #fff; color: #101010;
  border-radius: 16px 16px 0 0;
  text-align: center;
  transform: translateY(100%); visibility: hidden;
  transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out;
}
#${SHEET_ID}.active { transform: translateY(0); visibility: visible; }
/* Placed like the X on the site's other sheets (link-block-11 + image-197 in Webflow). */
#${SHEET_ID} .sell-app-sheet__close {
  position: absolute; top: 0; right: calc(5% - 10px);
  padding: 20px; border: 0; border-radius: 0;
  background: transparent; cursor: pointer; line-height: 0;
}
#${SHEET_ID} .sell-app-sheet__close img { display: block; width: 21px; height: 21px; }
#${SHEET_ID} .sell-app-sheet__app {
  display: flex; justify-content: center; margin-top: 40px;
}
#${SHEET_ID} .sell-app-sheet__icon {
  width: 80px; height: 80px; border-radius: 18px;
}
/* The site's serif at the one weight it loads (400): any heavier is a faux bold. */
#${SHEET_ID} .sell-app-sheet__title {
  margin: 36px 0 12px; font-family: "Source Serif 4 Subhead", "Times New Roman", serif;
  font-size: 31px; line-height: 1.2; font-weight: 400; letter-spacing: normal; color: #101010;
}
/* Ersjo Grotesk Medium 14/19, the app's medium-sm (and the site's body text). */
#${SHEET_ID} .sell-app-sheet__text {
  margin: 0 0 12px; font-family: "Ersjo Grotesk", Arial, sans-serif;
  font-size: 14px; line-height: 19px; font-weight: 500; color: #101010;
}
#${SHEET_ID} .sell-app-sheet__cta {
  display: flex; align-items: center; justify-content: center;
  box-sizing: border-box; width: 100%; height: 52px; margin-top: 44px;
  border-radius: 0; background: #101010; color: #fff;
  font-size: 16px; font-weight: 500; text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.2s ease-in-out;
}
#${SHEET_ID} .sell-app-sheet__cta.is-loading { opacity: 0.6; pointer-events: none; }
#${SHEET_ID} .sell-app-sheet__note {
  margin: 12px 0 0; font-family: "Ersjo Grotesk", Arial, sans-serif;
  font-size: 13px; line-height: 17px; font-weight: 500; color: #848484;
}
/* On a computer: a centered dialog with the QR code instead of the button. */
#${SHEET_ID}.sell-app-sheet--modal {
  left: 50%; right: auto; top: 50%; bottom: auto;
  width: calc(100% - 32px); max-width: 440px; max-height: 90vh;
  padding: 28px 32px 36px; border-radius: 16px;
  transform: translate(-50%, -46%);
  transition: transform 0.25s ease-out, visibility 0.25s ease-out;
}
#${SHEET_ID}.sell-app-sheet--modal.active { transform: translate(-50%, -50%); }
#${SHEET_ID}.sell-app-sheet--modal .sell-app-sheet__close { right: 12px; }
#${SHEET_ID}.sell-app-sheet--modal .sell-app-sheet__app { margin-top: 24px; }
#${SHEET_ID}.sell-app-sheet--modal .sell-app-sheet__cta,
#${SHEET_ID}.sell-app-sheet--modal .sell-app-sheet__note { display: none; }
#${SHEET_ID} .sell-app-sheet__desktop { display: none; margin-top: 20px; }
#${SHEET_ID}.sell-app-sheet--modal .sell-app-sheet__desktop { display: block; }
#${SHEET_ID} .sell-app-sheet__qr { display: block; width: 140px; height: 140px; margin: 0 auto; }
/* Under the code, in the note's small grey. */
#${SHEET_ID} .sell-app-sheet__scan {
  margin: 14px auto 0; max-width: 330px; font-family: "Ersjo Grotesk", Arial, sans-serif;
  font-size: 13px; line-height: 17px; font-weight: 500; color: #848484;
}
#${SHEET_ID} .sell-app-sheet__stores {
  display: flex; justify-content: center; gap: 20px; margin-top: 16px;
}
#${SHEET_ID} .sell-app-sheet__store {
  font-family: "Ersjo Grotesk", Arial, sans-serif; font-size: 13px; line-height: 17px; font-weight: 500;
  color: #101010; text-decoration: underline; text-underline-offset: 2px;
}
`;

// The same X image the site's other bottom sheets use (Webflow asset Close_mai.svg).
const CLOSE_ICON_URL = 'https://cdn.prod.website-files.com/6297d3d527db5dd4cf02e924/6979cc39c0eab851b0d57719_Close_mai.svg';

let sellerItems = null; // the seller's items once known (rememberSellerItems / fetchSellerItems)
let sellerItemsRequest = null;
let handoff = null; // { code, expiresAtMs }
let handoffRequest = null; // Promise while a code is being fetched
let currentTarget = {};
let currentVariant = 'sell';
let currentLoggedIn = false; // the login state the sheet was last prepared for
let currentOnClose = null;
let lastFocused = null;
let needsFreshCode = false;

function isIosDevice() {
  return typeof isIos !== 'undefined' && isIos;
}

function isAndroidDevice() {
  return typeof isAndroid !== 'undefined' && isAndroid;
}

export function isPhone() {
  return isIosDevice() || isAndroidDevice();
}

export function isLoggedIn() {
  if (typeof authUser !== 'undefined' && authUser.current) return true;
  try {
    return !!localStorage.getItem('authUserId');
  } catch (e) {
    return false;
  }
}

/**
 * True where a sell click should open the sheet instead of the web sell form: everywhere,
 * since 2026-10-23. New listings are made in the app on every device, signed in or not.
 * Kept as a function so the callers read as the rule they apply.
 */
export function shouldSellInApp() {
  return true;
}

/**
 * True where the app can be signed in on this account: a logged-in seller on a phone.
 * Only then is a handoff code fetched and put on the sheet's button and the page's app
 * links; a computer shows a QR code, and a visitor who is logged out has no account to hand over.
 */
export function canHandoff() {
  return isPhone() && isLoggedIn();
}

/**
 * The item a link to the web sell form is about: `{ itemId, type }`, `{}` for a new
 * listing, or null when the URL is not this site's /sell-item.
 */
export function sellItemTarget(url) {
  let parsed;
  try {
    parsed = new URL(url, window.location.href);
  } catch (e) {
    return null;
  }
  if (parsed.origin !== window.location.origin) return null;
  if (!/^\/sell-item\/?$/.test(parsed.pathname)) return null;
  const itemId = parsed.searchParams.get('id');
  if (!itemId) return {};
  const type = parsed.searchParams.get('type');
  return type ? { itemId, type } : { itemId };
}

/**
 * The Branch link behind the button. The app reads `id`/`type` the way it reads the web
 * sell form's own links, `sell=new` as "start a new listing", and `handoff` as the code.
 */
export function branchSellLink({ itemId, type } = {}, code) {
  const url = new URL(BRANCH_SELL_LINK);
  if (itemId) {
    url.searchParams.set('id', itemId);
    if (type) url.searchParams.set('type', type);
  } else {
    url.searchParams.set('sell', 'new');
  }
  if (code) url.searchParams.set('handoff', code);
  return url.toString();
}

function track(event, props = {}) {
  try {
    if (typeof analytics !== 'undefined' && analytics.track) {
      const platform = isIosDevice() ? 'ios' : isAndroidDevice() ? 'android' : 'desktop';
      analytics.track(event, { platform, ...props });
    }
  } catch (e) {
    // Tracking never blocks the sheet.
  }
}

function hasFreshHandoff() {
  return !!handoff && handoff.expiresAtMs - Date.now() >= HANDOFF_MIN_REMAINING_MS;
}

/** Resolves to a usable code, or null when none could be had (the button then works without one). */
function fetchHandoff() {
  if (hasFreshHandoff()) return Promise.resolve(handoff.code);
  if (handoffRequest) return handoffRequest;
  const requestedAtMs = Date.now();
  handoffRequest = callBackendApi('/api/users/app-handoff', { method: 'POST', requiresAuth: true, timeoutSec: 10 })
    .then((res) => {
      const code = res?.data?.code;
      if (!code || Number.isNaN(Date.parse(res?.data?.expiresAt))) return null;
      handoff = { code, expiresAtMs: requestedAtMs + HANDOFF_TTL_MS };
      return code;
    })
    .catch((e) => {
      console.warn('[sellAppSheet] no handoff code', e);
      if (typeof errorHandler !== 'undefined') errorHandler.report(e);
      return null;
    })
    .finally(() => {
      handoffRequest = null;
    });
  return handoffRequest;
}

function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(() => resolve(null), ms))]);
}

/**
 * For an iPhone install: the app's sign-in sheet only opens while the pasteboard holds a
 * URL (UIPasteboard.hasURLs), hence text/uri-list next to plain text, and only for this
 * copy: text/html is what tells it apart from any other copied link. The app reads only
 * the pasteboard's type names, never the content (MaiApp src/lib/webHandoffPasteboard.ts:
 * WebKit's custom data, public.url and public.html together). Must run inside the
 * tap, which Safari requires for clipboard writes. `link` may be a promise of the link
 * (or of null, which writes nothing): Safari lets the tap start the write and the content
 * follow once the code has arrived. Resolves when the write is done or has failed.
 */
function copyHandoffLink(link) {
  if (!isIosDevice() || !navigator.clipboard) return Promise.resolve();
  // A link without a code would only make the app's sheet promise a sign-in it cannot do.
  if (typeof link === 'string' && !link.includes('handoff=')) return Promise.resolve();
  try {
    const canWriteUriList =
      typeof ClipboardItem !== 'undefined' &&
      navigator.clipboard.write &&
      (typeof ClipboardItem.supports !== 'function' || ClipboardItem.supports('text/uri-list'));
    if (canWriteUriList) {
      const asHtml = (value) => `<a href="${value}">${value}</a>`;
      const blob = (type, format = (value) => value) =>
        typeof link === 'string'
          ? new Blob([format(link)], { type })
          : link.then((value) => {
              if (!value) throw new Error('no link to copy');
              return new Blob([format(value)], { type });
            });
      const item = new ClipboardItem({
        'text/uri-list': blob('text/uri-list'),
        'text/plain': blob('text/plain'),
        'text/html': blob('text/html', asHtml),
      });
      return navigator.clipboard.write([item]).catch((e) => console.warn('[sellAppSheet] clipboard write failed', e));
    }
    if (navigator.clipboard.writeText && typeof link === 'string') {
      return navigator.clipboard.writeText(link).catch((e) => console.warn('[sellAppSheet] clipboard writeText failed', e));
    }
  } catch (e) {
    console.warn('[sellAppSheet] clipboard unavailable', e);
  }
  return Promise.resolve();
}

/**
 * The sentence under the button promises an automatic sign-in, which only app versions with
 * the handoff (MaiApp src/lib/appHandoff.ts) deliver. It stays hidden until
 * `sellAppSignInNote` is turned on in the footer's featureConfig (footer-custom-code.html).
 */
function showSignInNote() {
  try {
    return typeof featureIsEnabled === 'function' && !!featureIsEnabled('sellAppSignInNote');
  } catch (e) {
    return false;
  }
}

/** Something on sale, or sold and not yet shipped: the same rules as the lists on Mina sidor (loadItemCards.js). */
export function hasOngoingSales(items) {
  return (items || []).some(
    (item) =>
      item.status === 'Published' ||
      (item.status === 'Sold' && (item.shippingStatus === 'Not sent' || !item.shippingStatus)),
  );
}

/** Mina sidor hands over the items it has already fetched, so the sheet needs no second request there. */
export function rememberSellerItems(items) {
  if (Array.isArray(items)) sellerItems = items;
}

function fetchSellerItems() {
  if (sellerItems) return Promise.resolve(sellerItems);
  if (sellerItemsRequest) return sellerItemsRequest;
  sellerItemsRequest = callBackendApi('/api/items', { requiresAuth: true })
    .then((res) => {
      if (Array.isArray(res?.data)) sellerItems = res.data;
      return sellerItems;
    })
    .catch((e) => {
      console.warn('[sellAppSheet] no items', e);
      return null;
    })
    .finally(() => {
      sellerItemsRequest = null;
    });
  return sellerItemsRequest;
}

async function updateOngoingSalesSentence() {
  const sentence = document.querySelector(`#${SHEET_ID} .sell-app-sheet__ongoing`);
  if (!sentence) return;
  if (!sellerItems) sentence.hidden = true;
  // Only a signed-in seller has sales to speak of (and may read /api/items).
  if (!isLoggedIn() || currentVariant !== 'sell') return;
  const items = await fetchSellerItems();
  if (currentVariant !== 'sell') return;
  sentence.hidden = !hasOngoingSales(items);
}

/** Puts the variant's title and body in the sheet. Called on every open: the login state may have changed. */
function applyCopy() {
  const sheet = document.getElementById(SHEET_ID);
  if (!sheet) return;
  const copy = copyFor(currentVariant, isLoggedIn());
  sheet.querySelector('.sell-app-sheet__title').textContent = copy.title;
  sheet.querySelector('.sell-app-sheet__body').textContent = copy.body;
}

/** The QR code a computer shows instead of the button: the same Branch link, never with a code. */
function renderQr(target) {
  const canvas = document.querySelector(`#${SHEET_ID} .sell-app-sheet__qr`);
  if (!canvas) return;
  const link = branchSellLink(target);
  if (canvas.dataset.link === link) return;
  canvas.dataset.link = link;
  QRCode.toCanvas(canvas, link, { width: 140, margin: 0 }, (error) => {
    if (error) {
      console.warn('[sellAppSheet] QR code failed', error);
      if (typeof errorHandler !== 'undefined') errorHandler.report(error);
    }
  });
}

function ensureStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}

function ensureSheet() {
  let sheet = document.getElementById(SHEET_ID);
  if (sheet) return sheet;
  ensureStyle();

  const overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  overlay.addEventListener('click', () => closeSellAppSheet('overlay'));

  sheet = document.createElement('div');
  sheet.id = SHEET_ID;
  if (!isPhone()) sheet.classList.add('sell-app-sheet--modal');
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');
  sheet.setAttribute('aria-labelledby', `${SHEET_ID}Title`);
  sheet.setAttribute('aria-hidden', 'true');

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'sell-app-sheet__close';
  close.setAttribute('aria-label', COPY.close);
  const closeIcon = document.createElement('img');
  closeIcon.src = CLOSE_ICON_URL;
  closeIcon.alt = '';
  close.append(closeIcon);
  close.addEventListener('click', () => closeSellAppSheet('close_button'));

  const app = document.createElement('div');
  app.className = 'sell-app-sheet__app';
  const icon = document.createElement('img');
  icon.className = 'sell-app-sheet__icon';
  icon.src = APP_ICON_URL;
  icon.alt = '';
  icon.width = 80;
  icon.height = 80;
  app.append(icon);

  const title = document.createElement('h2');
  title.id = `${SHEET_ID}Title`;
  title.className = 'sell-app-sheet__title';

  const text = document.createElement('p');
  text.className = 'sell-app-sheet__text';
  const body = document.createElement('span');
  body.className = 'sell-app-sheet__body';
  text.append(body);
  const ongoing = document.createElement('span');
  ongoing.className = 'sell-app-sheet__ongoing';
  ongoing.hidden = true;
  ongoing.textContent = ` ${COPY.ongoingSales}`;
  text.append(ongoing);

  const cta = document.createElement('a');
  cta.className = 'sell-app-sheet__cta';
  cta.textContent = COPY.button;
  cta.href = branchSellLink();
  cta.addEventListener('click', onCtaClick);

  const note = document.createElement('p');
  note.className = 'sell-app-sheet__note';
  note.textContent = COPY.note;

  // A computer cannot open the app: the QR code is the button there, right under the
  // text, with the how-to in small grey below it and the store links as plain links.
  const desktop = document.createElement('div');
  desktop.className = 'sell-app-sheet__desktop';
  const qr = document.createElement('canvas');
  qr.className = 'sell-app-sheet__qr';
  qr.setAttribute('aria-label', 'QR-kod till Mai-appen');
  const scan = document.createElement('p');
  scan.className = 'sell-app-sheet__scan';
  scan.textContent = COPY.scan;
  const stores = document.createElement('div');
  stores.className = 'sell-app-sheet__stores';
  [
    [COPY.appStore, APP_STORE_LINK],
    [COPY.playStore, PLAY_STORE_LINK],
  ].forEach(([label, href]) => {
    const store = document.createElement('a');
    store.className = 'sell-app-sheet__store';
    store.textContent = label;
    store.href = href;
    store.target = '_blank';
    store.rel = 'noopener';
    store.addEventListener('click', () => track('Sell App Sheet Store Clicked', { store: label }));
    stores.append(store);
  });
  desktop.append(qr, scan, stores);

  sheet.append(close, app, title, text, cta, note, desktop);
  document.body.append(overlay, sheet);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sheet.classList.contains('active')) closeSellAppSheet('escape');
  });
  document.addEventListener('visibilitychange', onPageVisible);
  window.addEventListener('pageshow', onPageVisible);
  return sheet;
}

function cta() {
  return document.querySelector(`#${SHEET_ID} .sell-app-sheet__cta`);
}

function onCtaClick() {
  const link = cta().href;
  const hadCode = link.includes('handoff=');
  track('Sell App Sheet Clicked', { has_handoff: hadCode, item_id: currentTarget.itemId || null });
  copyHandoffLink(link);
  if (hadCode) {
    // The app spends the code, so a seller who comes back and taps again needs a new
    // one: fetched when the page is visible again, not while they are in the store.
    handoff = null;
    needsFreshCode = true;
  }
}

function onPageVisible() {
  if (document.visibilityState !== 'visible' || !needsFreshCode) return;
  const sheet = document.getElementById(SHEET_ID);
  if (!sheet || !sheet.classList.contains('active')) return;
  needsFreshCode = false;
  prepareCta();
}

/** Points the button at the current target, with a code when one can be had in time. */
async function prepareCta() {
  const button = cta();
  if (!button) return;
  const target = currentTarget;
  if (!canHandoff()) {
    // No account to hand over (logged out), or a computer: the bare link, and the QR code of it.
    button.href = branchSellLink(target);
    button.classList.remove('is-loading');
    if (!isPhone()) renderQr(target);
    return;
  }
  if (hasFreshHandoff()) {
    button.href = branchSellLink(target, handoff.code);
    button.classList.remove('is-loading');
    return;
  }
  button.href = branchSellLink(target);
  button.classList.add('is-loading');
  const request = fetchHandoff();
  const code = await withTimeout(request, HANDOFF_FETCH_TIMEOUT_MS);
  if (target !== currentTarget) return; // reopened for another item meanwhile
  button.href = branchSellLink(target, code);
  button.classList.remove('is-loading');
  if (!code) {
    // Timed out rather than failed: the button takes the code if it still arrives.
    request.then((late) => {
      if (late && target === currentTarget) button.href = branchSellLink(target, late);
    });
  }
}

/**
 * Opens the sheet for a sell click. `target` is `sellItemTarget(...)` of the URL the
 * click would have gone to; `onClose` replaces the default close, e.g. on /sell-item
 * itself, where closing leaves the page; `variant` picks the copy (SHEET_VARIANTS).
 */
export function openSellAppSheet(target = {}, { onClose, variant = 'sell' } = {}) {
  const sheet = ensureSheet();
  const wasOpen = sheet.classList.contains('active');
  const sameTarget = target.itemId === currentTarget.itemId && target.type === currentTarget.type;
  const loggedIn = isLoggedIn();
  // Opened again for the same thing: nothing to do, unless the seller has been signed in
  // meanwhile (the session cookie from mairesale.com, after the page gated itself): then
  // the copy, the button's code and the note are prepared again for them.
  const sameOpen = wasOpen && sameTarget && variant === currentVariant;
  if (sameOpen && loggedIn === currentLoggedIn) return;
  currentTarget = { ...target };
  currentVariant = SHEET_VARIANTS.includes(variant) ? variant : 'sell';
  currentLoggedIn = loggedIn;
  // Retargeting an open sheet keeps its close behaviour (on /sell-item: leave for Mina sidor).
  currentOnClose = onClose || (wasOpen ? currentOnClose : null);
  needsFreshCode = false;
  applyCopy();
  prepareCta();
  updateOngoingSalesSentence();
  sheet.querySelector('.sell-app-sheet__note').hidden = !(canHandoff() && showSignInNote());
  if (sameOpen) return;

  lastFocused = document.activeElement;
  document.getElementById(OVERLAY_ID).classList.add('active');
  sheet.classList.add('active');
  sheet.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
  sheet.querySelector('.sell-app-sheet__close').focus({ preventScroll: true });
  track('Sell App Sheet Shown', {
    variant: currentVariant,
    logged_in: isLoggedIn(),
    item_id: currentTarget.itemId || null,
    path: window.location.pathname,
  });
}

export function closeSellAppSheet(method = 'close_button') {
  const sheet = document.getElementById(SHEET_ID);
  if (!sheet || !sheet.classList.contains('active')) return;
  sheet.classList.remove('active');
  sheet.setAttribute('aria-hidden', 'true');
  document.getElementById(OVERLAY_ID).classList.remove('active');
  document.documentElement.style.overflow = '';
  track('Sell App Sheet Dismissed', { dismiss_method: method, variant: currentVariant });
  if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus({ preventScroll: true });
  const onClose = currentOnClose;
  currentOnClose = null;
  if (onClose) onClose();
}

/** For JS navigations to the web sell form: the sheet where it applies, the page otherwise. */
export function goToSellItem(url) {
  const target = sellItemTarget(url);
  if (target && shouldSellInApp()) {
    openSellAppSheet(target);
    return;
  }
  window.location.href = url;
}

/**
 * Catches every link to /sell-item on the page, including links Webflow renders and
 * cards built later. Capture phase, so it runs before the link's own handlers; those
 * still run (the menu closes itself, for one) and land on the already open sheet.
 */
export function installSellAppLinkInterceptor() {
  if (window.__maiSellAppInterceptor) return;
  window.__maiSellAppInterceptor = true;
  document.addEventListener(
    'click',
    (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!link) return;
      const target = sellItemTarget(link.getAttribute('href'));
      if (!target || !shouldSellInApp()) return;
      e.preventDefault();
      openSellAppSheet(target);
    },
    true,
  );
}

/**
 * On a page that creates listings (/sell-item, /expert-valuation, /lwl): covers every way
 * of arriving there that is not a click on this site, such as the shop's "Sälj vidare",
 * e-mails, search results and JS redirects. `authUser.whenSet` refreshes the copy for a
 * seller signed in after load by the session cookie from mairesale.com. Closing leaves
 * the page, for Mina sidor or the start page: the form is not offered on the web.
 * Returns true when the page is gated: the caller then leaves its form uninitialized,
 * so that hiding the sheet in the browser's devtools shows a form that does nothing.
 */
export function gateSellItemPage() {
  // A form filled in logged out is being created right now, after sign-in sent the
  // seller back here (sellItem.js shows its spinner on the same condition). Covering
  // it would invite a tap that aborts the create.
  const finishingWebListing =
    (sessionStorage.getItem('itemToBeCreatedAfterSignIn') || sessionStorage.getItem('expertValuationDraftAfterSignIn')) &&
    document.referrer.includes('/sign-in');
  if (finishingWebListing) return false;
  const open = () => {
    const target = sellItemTarget(window.location.href) || {};
    openSellAppSheet(target, {
      onClose: () => {
        window.location.href = isLoggedIn() ? '/private' : '/';
      },
    });
  };
  open();
  // The page's own form stays behind the overlay, which stops the pointer but not the
  // keyboard: `inert` keeps Tab out of it (browsers without it keep the overlay only).
  Array.from(document.body.children).forEach((el) => {
    if (el.id !== SHEET_ID && el.id !== OVERLAY_ID && 'inert' in el) el.inert = true;
  });
  if (typeof authUser !== 'undefined') authUser.whenSet(open);
  return true;
}

// Every other way to the app on the page: the "Hämta appen" links placed in Webflow
// (App Store, Google Play, menus, footer, banners) and any invite.mairesale.com/sell-item
// link. For a logged-in seller on a phone they carry a code like the sheet's button, so
// whichever one the seller taps, the app signs in on this account.

const APP_STORE_APP_ID = 'id6738430790';
const PLAY_PACKAGE = 'se.maiapp.app.prod';
const BRANCH_HOST = 'invite.mairesale.com';
const ORIGINAL_HREF = 'appHandoffHref'; // dataset key: the link's href before any code

// How long a navigation waits for a late clipboard write before it leaves anyway.
const CLIPBOARD_WAIT_MS = 1000;

let appLinkObserver = null;
let appLinkRefreshTimer = null;
let pageHasAppLinks = false; // a logged-in phone user on a page with app links
let appLinksHaveCode = false; // some link's href holds a code right now
let appLinksNeedFreshCode = false;

/** True for the App Store's and Google Play's Mai pages and the Branch sell link. */
export function isAppLink(href) {
  let url;
  try {
    url = new URL(href, window.location.href);
  } catch (e) {
    return false;
  }
  const host = url.hostname.toLowerCase();
  if (host === 'apps.apple.com') return url.pathname.includes(APP_STORE_APP_ID);
  if (host === 'play.google.com') return url.searchParams.get('id') === PLAY_PACKAGE;
  if (host === BRANCH_HOST) return /^\/sell-item\/?$/.test(url.pathname);
  return false;
}

/**
 * The Branch link an app link becomes. A store link turns into the plain sell link, which
 * opens the app (in sell mode) where it is installed and the right store where it is not;
 * a Branch sell link keeps its own parameters. Without a code it is the same link bare.
 */
export function appLinkWithHandoff(href, code) {
  const own = new URL(href, window.location.href);
  const url = own.hostname.toLowerCase() === BRANCH_HOST ? own : new URL(BRANCH_SELL_LINK);
  url.searchParams.delete('handoff');
  if (code) url.searchParams.set('handoff', code);
  return url.toString();
}

function originalHref(link) {
  return link.dataset[ORIGINAL_HREF] || link.getAttribute('href');
}

/** The page's app links, without the sheet's own button (it handles its code itself). */
function appLinks() {
  return Array.from(document.querySelectorAll('a[href]')).filter(
    (link) => !link.closest(`#${SHEET_ID}`) && isAppLink(originalHref(link)),
  );
}

/**
 * Remembers where a link went before it got a code. On Android an App Store link is
 * remembered as Google Play, as the footer rewrites it, whichever of the two ran first.
 */
function rememberOriginalHref(link) {
  if (link.dataset[ORIGINAL_HREF]) return;
  let href = link.getAttribute('href');
  if (isAndroidDevice() && /apps\.apple\.com/.test(href)) {
    href = `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`;
  }
  link.dataset[ORIGINAL_HREF] = href;
}

function pointAppLinks(code) {
  appLinks().forEach((link) => {
    rememberOriginalHref(link);
    link.href = appLinkWithHandoff(link.dataset[ORIGINAL_HREF], code);
  });
  appLinksHaveCode = !!code;
  clearTimeout(appLinkRefreshTimer);
  if (code && handoff) {
    // A code is fresh for its first five minutes (HANDOFF_MIN_REMAINING_MS); a page left
    // open gets the next one before then, so a tap never has to wait for one.
    const delay = Math.max(handoff.expiresAtMs - HANDOFF_MIN_REMAINING_MS - Date.now(), 60 * 1000);
    appLinkRefreshTimer = setTimeout(() => {
      if (document.visibilityState === 'visible') prepareAppLinks();
    }, delay);
  }
}

/** Puts a code on the links, or a fresh one when theirs is getting old. */
function prepareAppLinks() {
  if (!canHandoff()) return;
  if (hasFreshHandoff()) {
    pointAppLinks(handoff.code);
    return;
  }
  fetchHandoff().then((code) => {
    if (code && canHandoff()) pointAppLinks(code);
  });
}

/**
 * Once a code may have been used, or may belong to whoever was signed in before, it is
 * dropped: after the tap that spent it, a click that opened it elsewhere, and whenever the
 * page is hidden (the app opened, another tab, maybe a sign-out there). The links go back to
 * the bare Branch link, and the page and the sheet's button get a new code when visible again.
 */
function retireAppLinkCode() {
  clearTimeout(appLinkRefreshTimer);
  if (!pageHasAppLinks) return;
  handoff = null;
  needsFreshCode = true;
  appLinksNeedFreshCode = true;
  if (appLinksHaveCode) pointAppLinks(null);
}

function onAppLinkClick(e) {
  if (e.defaultPrevented) return;
  const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
  if (!link || link.closest(`#${SHEET_ID}`)) return;
  const own = originalHref(link);
  if (!isAppLink(own)) return;
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    // Opened in another tab or window with the code it holds: not reused here.
    setTimeout(retireAppLinkCode, 0);
    return;
  }
  if (!canHandoff()) {
    // Signed out since the code was put there: the link goes where it went before.
    if (link.dataset[ORIGINAL_HREF]) link.href = own;
    return;
  }

  if (hasFreshHandoff()) {
    // The link's own navigation: a tap on a universal link is what opens an installed app.
    const href = appLinkWithHandoff(own, handoff.code);
    rememberOriginalHref(link);
    link.href = href;
    appLinksHaveCode = true;
    track('App Link Clicked', { has_handoff: true, path: window.location.pathname });
    copyHandoffLink(href);
    // After the navigation has taken the href, not before.
    setTimeout(retireAppLinkCode, 0);
    return;
  }

  // No usable code yet (the fetch is slow or failed, or the code is too old): wait briefly
  // for one. The clipboard write has to start inside the tap; its content follows with the
  // code, and the page leaves once it is written. A navigation this late may land on
  // Branch's store page instead of an installed app; the pasted link still signs in there.
  e.preventDefault();
  const hrefPromise = withTimeout(fetchHandoff(), HANDOFF_FETCH_TIMEOUT_MS).then((code) => ({
    code,
    href: appLinkWithHandoff(own, code),
  }));
  const written = copyHandoffLink(hrefPromise.then(({ code, href }) => (code ? href : null)));
  hrefPromise.then(({ code, href }) => {
    track('App Link Clicked', { has_handoff: !!code, path: window.location.pathname });
    if (code) {
      handoff = null;
      appLinksNeedFreshCode = true;
    }
    withTimeout(written, CLIPBOARD_WAIT_MS).then(() => {
      window.location.href = href;
      if (code) setTimeout(retireAppLinkCode, 0);
    });
  });
}

function onAppLinksHidden() {
  if (document.visibilityState === 'hidden') retireAppLinkCode();
}

function onAppLinksVisible() {
  if (document.visibilityState !== 'visible' || !appLinksNeedFreshCode) return;
  appLinksNeedFreshCode = false;
  prepareAppLinks();
}

function observeAppLinks() {
  if (pageHasAppLinks || !canHandoff()) return;
  const links = appLinks();
  if (!links.length) return;
  pageHasAppLinks = true;
  // Fetched now, so that a link in a menu opened a second before the tap has its code too.
  prepareAppLinks();
  if (typeof IntersectionObserver === 'undefined') return;
  // A link that comes into view after the code has aged gets a new one.
  appLinkObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) prepareAppLinks();
  });
  links.forEach((link) => appLinkObserver.observe(link));
}

/** Installed once per page (general.js). Does nothing for visitors who are logged out or on a computer. */
export function installAppLinkHandoff() {
  if (window.__maiAppLinkHandoff) return;
  window.__maiAppLinkHandoff = true;
  document.addEventListener('click', onAppLinkClick, true);
  document.addEventListener('visibilitychange', onAppLinksHidden);
  document.addEventListener('visibilitychange', onAppLinksVisible);
  window.addEventListener('pagehide', retireAppLinkCode);
  window.addEventListener('pageshow', onAppLinksVisible);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeAppLinks);
  } else {
    observeAppLinks();
  }
  // Signed in after load, e.g. by the session cookie from mairesale.com.
  if (typeof authUser !== 'undefined') authUser.whenSet(observeAppLinks);
}
