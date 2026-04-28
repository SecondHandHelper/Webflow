# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is **not a standalone web app**. The actual site (mairesale.com / maiapp.se) is built and hosted on **Webflow**. Webflow owns the HTML, CSS, and DOM. This repo holds:

1. The JS modules that drive each page, bundled by Parcel and served back to the live Webflow site via a CDN.
2. Snippets of HTML/JS that live inside Webflow's custom-code embeds (page `<head>`, before-`</body>`, and per-page).

Both halves are wired together by Webflow embed code that calls `urlDependentLoadJs('something.js')` — defined in `footer-custom-code.html` — which loads either `https://localhost:1234/<file>` in dev or `https://rawcdn.githack.com/SecondHandHelper/Webflow/<JS_VERSION>/dist/<file>` in prod.

## Common commands

```bash
npm start    # parcel dev server on https://localhost:1234 with HMR (port 50619)
npm run build   # production build into ./dist (no scope-hoisting, used by githack CDN)
npm run clean   # nuke .parcel-cache and dist
```

There are **no tests, no linter, no typechecker** wired up (`npm test` exits 1). Don't claim "tests pass" — there are none. EditorConfig enforces 2-space LF JS.

## Deploy flow (important)

Production loads JS from githack pinned to a tag in `footer-custom-code.html`:

```js
const JS_VERSION = 'v1.3.106';   // footer-custom-code.html:12
```

To ship a JS change:
1. Edit the `.js` source(s) at the repo root.
2. Bump `JS_VERSION` in `footer-custom-code.html` and paste that file into Webflow's site-wide footer custom-code area.
3. Commit, push to `master`, and create the matching tag — githack serves `dist/` from that ref.

The header (`header-custom-code.html`) and per-page head files (`*-head.html`, e.g. `private-head.html`, `sell-item-head.html`) are pasted into Webflow's corresponding embed slots. The page-level `*.html` files in the repo root (e.g. `home.html`, `sell-item.html`) are the small Webflow embed snippets that call `urlDependentLoadJs('xxx.js')`.

## Architecture

### Page → bundle mapping

`package.json#config.files` enumerates **every Parcel entry point** — one bundle per page. Adding a new page means adding its source `.js` to that list (otherwise `npm run build` won't emit `dist/<file>.js`).

Each page in Webflow has a tiny script tag like:

```html
<script>urlDependentLoadJs('sellItem.js');</script>
```

That maps Webflow page → repo entry file. Look at the small `*.html` files (e.g. `sell-item.html`, `private.html`) to see which JS bundle each page uses.

### Globals from Webflow custom-code (assume these exist)

`footer-custom-code.html` runs before any page bundle and defines globals that page modules use without importing:

- `firebase`, `db` (Firestore), `auth`, `functions`, `firebase.analytics()` — Firebase SDK v11.6.1 compat build, loaded from gstatic.
- `user` / `authUser` — observable singletons with `.current` getter/setter and `.whenSet(cb)`. `authUser` mirrors Firebase Auth state; `user` is the Firestore user doc. Don't replace these or read `firebase.auth().currentUser` directly when `authUser.current` is what callers expect.
- `callBackendApi(path, { data, method, requiresAuth, timeoutSec, useLegacyFallback, fetchInit })` — primary backend client. Hits `BACKEND_API_URL` (`https://api.mairesale.com`) first, falls back to `LEGACY_BACKEND_API_URL` (`europe-west1-second-hand-helper.cloudfunctions.net/webApi`) on failure. Image endpoints (`/api/images/*`) route to `IMAGE_BACKEND_API_URL`. Use `requiresAuth: AUTH_IF_AVAILABLE` to send the token only when present.
- `getIdToken(refresh)`, `onAuthStateChangedPromise()`, `bootstrapFromSessionCookie()`.
- `errorHandler` — Stackdriver reporter in prod, no-op in test/dev (`environment === 'web-test'` is anything not on maiapp.se / mairesale.com).
- `featureIsEnabled(name)` — feature gate keyed by `user.current.testGroups` (`alpha` / `beta` / `default`).
- `analytics` — Segment global (write key in header).
- `brandPartners`, `isBrandPartner(name)`, `isGiftCardPartner(name)` — brand partner registry (Flattered, Filippa K, Blankens, Eytys).
- `isMobile`, `isIos`, `params` (URLSearchParams), `JS_VERSION`, `CLIENT_CHANNEL_HEADERS`.

`clientUtils.js` adds non-module globals (`getParamsObject`, `getCookie`, `setCookie`, `deleteCookie`, `checkCookie`, `getPreferredLogInMethodCookie`, `setPreferredLogInMethodCookie`). It's loaded via Webflow custom code, **not imported by ES modules** — those globals are just ambient.

When writing new module code, you can call any of the above by name; Parcel won't complain, and they'll resolve at runtime in the browser.

### Module structure

The repo is flat — all `.js` lives at the root. Logical layers:

- **Page entry bundles** (one per Webflow page): `sellItem.js`, `private.js`, `home.js`, `itemPage.js`, `editItem.js`, `quickValuation.js`, `quickExpertValuation.js`, `signIn.js`, `settings.js`, `referral.js`, `orderBags.js`, `shipItem.js`, `userContact.js`, `userManagement.js`, `bookPhotoShoot.js`, `feedbackNps.js`, `feedbackPurchase.js`, `lwl.js`, `reclaim.js`, `partner.js`, `brand.js`, `personalIdForm.js`, `vipPickup.js`, `trustedSellerStatus.js`, `yearlySummary.js`, `2023withmai.js`, `howShippingWorks.js`, `prototypeAiValuation.js`, `emailSignUp.js`, `how-it-works.js`.
- **Shared module: `general.js`** — central shared utilities (`signOut`, address form helpers, `isValidSwedishSsn`, `formatPersonalId`, `itemCoverImage`, `shareCode`, `channelRouter`, `prepareMenu`, `setupMenuHandlers`, toast animations, `hideInfoRequestCard`). Most page bundles import from this.
- **Other shared helpers**: `sellItemHelpers.js` (sell/edit flow utilities — image upload/enhance, color mapping, model search helpers), `sellItemModelSearch.js`, `autocomplete-brands.js` (brand list + autocomplete), `signInHelpers.js`, `infoRequestsFunctions.js`, `loadItemCards.js`, `referralFunctions.js`.
- **Pure helpers loaded as a global**: `clientUtils.js` (cookie/param helpers — not part of the ES module graph).

`sellItem.js` is the largest entry (~70KB) and depends on most helper modules; treat it as the canonical example of how a page wires up Firebase auth + form handling + image upload + backend calls.

### Page CSS-hiding files

`*-head.html` files (e.g. `private-head.html`, `sell-item-head.html`, `quick-valuation-head.html`) are CSS that hides UI elements with `display: none` until the JS bundle reveals them. When changing visibility logic, check the matching `-head.html` for the initial state.

### Backend

- Primary: `https://api.mairesale.com` (Cloud Run, Go).
- Legacy fallback: `https://europe-west1-second-hand-helper.cloudfunctions.net/webApi` (Cloud Functions).
- Images: `https://images-api-886292162262.europe-west1.run.app`.
- Firebase project: `second-hand-helper`. Firestore is read directly from the client (`db.collection(...)`) for many flows.

### Auth model

- Firebase Auth (email/password, providers via providerData[0].providerId).
- Cross-domain SSO via session cookie at `/api/users/session/verify` → custom token sign-in (see `bootstrapFromSessionCookie` in `footer-custom-code.html`). Only attempted on cross-domain referrer, not page reloads.
- `signOut()` (in `general.js`) hits `DELETE /api/users/session`, then `firebase.auth().signOut()`, clears localStorage (`sessionUser`, `idToken`, `authUserId`, `authUser`) and the `maiAuth` cookie, then redirects to `/`.
- Protected pages list lives in `header-custom-code.html` — pages there redirect to `/sign-in` when no `authUserId` is in localStorage.

### A/B tests

Defined in `header-custom-code.html` under `EXPERIMENTS`. Pattern: a `<test>Live` boolean gate, URL param + cookie persistence, `analytics.track("Experiment Viewed", ...)`. Disable by flipping the `*Live` flag; do not delete the variant code without coordinating with the experiment owner.

## Conventions worth knowing

- DOM IDs are referenced unprefixed via `document.getElementById(...)` and via Webflow's auto-generated globals (e.g. `heroTitle.innerHTML = ...` works because Webflow exposes IDs as window globals).
- Currency, dates, and copy are Swedish. Don't translate strings unless asked.
- Personal-ID validation uses Swedish personnummer Luhn (`isValidSwedishSsn` in `general.js`).
- The `qrcode` npm package is the only runtime dep; everything else is loaded from CDNs in the Webflow custom code (Firebase, Segment, Stackdriver, select2, uuid).
- `.parcel-cache/` and `dist/` are build artefacts — `dist/` IS committed (githack serves it), `.parcel-cache/` is ignored.
- `package-lock.json` is gitignored.
