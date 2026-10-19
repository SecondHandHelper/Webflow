// "Sälj vidare i appen": what a logged-in seller on a phone gets instead of the web sell
// form (/sell-item). New listings are made in the app; Mina sidor stays on the web for
// following sales and shipping what sold.
//
// The sheet is built here, markup and CSS, so the Webflow designer needs nothing.
//
// Its button is a Branch link (invite.mairesale.com) that opens the app, or the store
// when the app is missing, and carries a one-time handoff code from the backend
// (Functions src/users/appHandoff). The app trades the code for a sign-in on this
// account, but only when Branch reports the match as guaranteed:
// - app already installed: the link opens it directly;
// - Android install: Google Play's install referrer;
// - iPhone install: NativeLink, the link copied to the pasteboard below and read by the
//   app on its first open (iOS asks the seller to allow the paste).
// Logged-out visitors keep the channel sheet in general.js.

const BRANCH_SELL_LINK = 'https://invite.mairesale.com/sell-item';
const APP_ICON_URL = 'https://cdn.shopify.com/s/files/1/0645/1229/5125/files/app-icon-1024.png?v=1766272333';
const HANDOFF_FETCH_TIMEOUT_MS = 4000;
// The backend's 30 minutes have to cover the store and the install after the tap, so a
// code is only reused while this much of it is left; otherwise a new one is fetched.
const HANDOFF_MIN_REMAINING_MS = 25 * 60 * 1000;

const SHEET_ID = 'sellAppSheet';
const OVERLAY_ID = 'sellAppSheetOverlay';
const STYLE_ID = 'sellAppSheetStyle';

const COPY = {
  title: 'Sälj vidare i appen',
  body: 'Mai flyttar nu till appen. För att fortsätta lägga upp nya plagg och följa din försäljningskvalitet behöver du ladda ner appen.',
  // Only for a seller with something on sale or sold and not yet shipped (hasOngoingSales).
  ongoingSales: 'Du kan fortfarande se dina pågående försäljningar och skicka det som redan sålts här på webben under en övergångsperiod.',
  button: 'Ladda ner appen',
  // Under the button, small and grey; hidden until the app can keep the promise (showSignInNote).
  note: 'När du laddar ner appen via knappen ovan loggas du in automatiskt på ditt konto.',
  close: 'Stäng',
};

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
#${SHEET_ID} .sell-app-sheet__title {
  margin: 36px 0 12px; font-size: 31px; line-height: 1.2; font-weight: 600; color: #101010;
}
#${SHEET_ID} .sell-app-sheet__text {
  margin: 0 0 12px; font-size: 15px; line-height: 115%; color: #101010;
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
  margin: 12px 0 0; font-size: 13px; line-height: 115%; color: #848484;
}
`;

// The same X image the site's other bottom sheets use (Webflow asset Close_mai.svg).
const CLOSE_ICON_URL = 'https://cdn.prod.website-files.com/6297d3d527db5dd4cf02e924/6979cc39c0eab851b0d57719_Close_mai.svg';

let sellerItems = null; // the seller's items once known (rememberSellerItems / fetchSellerItems)
let sellerItemsRequest = null;
let handoff = null; // { code, expiresAtMs }
let handoffRequest = null; // Promise while a code is being fetched
let currentTarget = {};
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

/** True where a sell click should open the sheet instead of the web sell form. */
export function shouldSellInApp() {
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
      analytics.track(event, { platform: isIosDevice() ? 'ios' : 'android', ...props });
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
  handoffRequest = callBackendApi('/api/users/app-handoff', { method: 'POST', requiresAuth: true, timeoutSec: 10 })
    .then((res) => {
      const code = res?.data?.code;
      const expiresAtMs = Date.parse(res?.data?.expiresAt);
      if (!code || Number.isNaN(expiresAtMs)) return null;
      handoff = { code, expiresAtMs };
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
 * NativeLink: the app's Branch SDK reads the pasteboard on its first open and only
 * accepts an item typed as a URL (UIPasteboard.URL), hence text/uri-list next to plain
 * text. Must run inside the tap, which Safari requires for clipboard writes.
 */
function copyLinkForNativeLink(link) {
  if (!isIosDevice() || !navigator.clipboard) return;
  try {
    const canWriteUriList =
      typeof ClipboardItem !== 'undefined' &&
      navigator.clipboard.write &&
      (typeof ClipboardItem.supports !== 'function' || ClipboardItem.supports('text/uri-list'));
    if (canWriteUriList) {
      const item = new ClipboardItem({
        'text/uri-list': new Blob([link], { type: 'text/uri-list' }),
        'text/plain': new Blob([link], { type: 'text/plain' }),
      });
      navigator.clipboard.write([item]).catch((e) => console.warn('[sellAppSheet] clipboard write failed', e));
    } else if (navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).catch((e) => console.warn('[sellAppSheet] clipboard writeText failed', e));
    }
  } catch (e) {
    console.warn('[sellAppSheet] clipboard unavailable', e);
  }
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
  const items = await fetchSellerItems();
  sentence.hidden = !hasOngoingSales(items);
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
  title.textContent = COPY.title;

  const text = document.createElement('p');
  text.className = 'sell-app-sheet__text';
  text.append(COPY.body);
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

  sheet.append(close, app, title, text, cta, note);
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
  copyLinkForNativeLink(link);
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
 * itself, where closing leaves for Mina sidor.
 */
export function openSellAppSheet(target = {}, { onClose } = {}) {
  const sheet = ensureSheet();
  const wasOpen = sheet.classList.contains('active');
  const sameTarget = target.itemId === currentTarget.itemId && target.type === currentTarget.type;
  if (wasOpen && sameTarget) return;
  currentTarget = { ...target };
  // Retargeting an open sheet keeps its close behaviour (on /sell-item: leave for Mina sidor).
  currentOnClose = onClose || (wasOpen ? currentOnClose : null);
  needsFreshCode = false;
  prepareCta();
  updateOngoingSalesSentence();
  sheet.querySelector('.sell-app-sheet__note').hidden = !showSignInNote();

  lastFocused = document.activeElement;
  document.getElementById(OVERLAY_ID).classList.add('active');
  sheet.classList.add('active');
  sheet.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
  sheet.querySelector('.sell-app-sheet__close').focus({ preventScroll: true });
  track('Sell App Sheet Shown', { item_id: currentTarget.itemId || null, path: window.location.pathname });
}

export function closeSellAppSheet(method = 'close_button') {
  const sheet = document.getElementById(SHEET_ID);
  if (!sheet || !sheet.classList.contains('active')) return;
  sheet.classList.remove('active');
  sheet.setAttribute('aria-hidden', 'true');
  document.getElementById(OVERLAY_ID).classList.remove('active');
  document.documentElement.style.overflow = '';
  track('Sell App Sheet Dismissed', { dismiss_method: method });
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
 * On /sell-item itself: covers every way of arriving there that is not a click on this
 * site, such as the shop's "Sälj vidare", e-mails and JS redirects. `authUser.whenSet`
 * also catches a seller signed in after load by the session cookie from mairesale.com.
 * Closing leaves for Mina sidor: the form is not offered on a phone.
 */
export function gateSellItemPage() {
  if (!isPhone()) return;
  // A form filled in logged out is being created right now, after sign-in sent the
  // seller back here (sellItem.js shows its spinner on the same condition). Covering
  // it would invite a tap that aborts the create.
  const finishingWebListing =
    (sessionStorage.getItem('itemToBeCreatedAfterSignIn') || sessionStorage.getItem('expertValuationDraftAfterSignIn')) &&
    document.referrer.includes('/sign-in');
  if (finishingWebListing) return;
  const open = () => {
    const target = sellItemTarget(window.location.href) || {};
    openSellAppSheet(target, {
      onClose: () => {
        window.location.href = '/private';
      },
    });
  };
  if (isLoggedIn()) open();
  if (typeof authUser !== 'undefined') authUser.whenSet(open);
}
