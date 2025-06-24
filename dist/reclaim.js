// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"fjNiH":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SERVER_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "b32aaeb5d6d6cad9";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            if (err.message) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"9ZHI8":[function(require,module,exports,__globalThis) {
var _sellItemHelpers = require("./sellItemHelpers");
function initializePage(item) {
    const itemTitle = (item.cleanedBrand || item.brand).trim() + "-" + item.category.toLowerCase();
    document.getElementById('itemTitle').innerText = itemTitle;
    document.getElementById('itemTitleBanner').innerText = itemTitle;
    const soldDate = new Date(item.soldDate).toLocaleDateString('sv-SE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const subtitleText = `K\xf6ptes ${soldDate}${item.soldPlatform && item.soldPlatform !== 'Other' ? ` via ${item.soldPlatform}` : ''}`;
    document.getElementById('itemSubtitle').innerText = subtitleText;
    document.getElementById('itemSubtitleBanner').innerText = subtitleText;
    const imageUrl = window.innerWidth <= 400 ? item?.images?.modelImage || item?.images?.enhancedFrontImageSmall || item?.images?.enhancedFrontImage || item?.images?.frontImageSmall || item?.images?.frontImage : item?.images?.modelImage || item?.images?.enhancedFrontImage || item?.images?.frontImage;
    document.getElementById('itemImage').src = imageUrl;
    document.getElementById('itemImageBanner').src = imageUrl;
    document.getElementById('resellButton').href = `./sell-item?id=${item.id}`;
    let compensation = Math.round(item.soldPrice * 0.1);
    compensation = compensation < 60 ? 60 : compensation > 250 ? 250 : compensation;
    discount10PercentText.innerText = `Beh\xe5lla plagget och f\xe5 ${compensation} kr \xe5terbetalt`;
    const contact = item.buyer.Email || item.buyer.PhoneNumber;
    thankYouText.innerText = `Vi tittar p\xe5 \xe4rendet och skickar svar ${contact.includes('@') ? `till din email ${contact}` : `p\xe5 SMS till ditt telefonnummer ${contact}`}`;
    // Om postnord qr code finns -> Visa den
    if (item?.returnQrCode) {
        hideAllButtons();
        toMaiButton.style.display = 'flex';
        introDiv.style.display = 'none';
        thankYouDiv.style.display = 'none';
        itemBanner.style.display = 'block';
        qrCodeImage.style.backgroundImage = `url('${item.returnQrCode}')`;
        postnordQrCodeLink.href = item.returnQrCodePage;
        postnordQrCodeDiv.style.display = 'flex';
        shippingText.innerText = `N\xe4r det skickats s\xe5 \xe5terbetalar vi dig och skickar bekr\xe4ftelse till din email ${contact}`;
    } else if (item?.reclaim?.status) {
        // Om reclaim redan finns -> Gå direkt till Tack!
        hideAllButtons();
        toMaiButton.style.display = 'flex';
        introDiv.style.display = 'none';
        thankYouDiv.style.display = 'block';
        itemBanner.style.display = 'block';
    }
}
function addEventListeners() {
    document.getElementById('reclaimButton').addEventListener('click', function() {
        itemBanner.style.display = 'block';
        document.getElementById('reclaimForm').style.display = 'block';
        cancelButton.style.display = 'flex';
        doneButton.style.display = 'flex';
        resellButton.style.display = 'none';
        reclaimButton.style.display = 'none';
        document.getElementById('introDiv').style.display = 'none';
    });
    reclaimReason.onchange = function() {
        // Color and label
        let input = this.value;
        if (input === '') {
            reasonLabel.style.display = 'none';
            this.style.color = "#929292";
            return;
        } else {
            reasonLabel.style.display = 'block';
            this.style.color = "#101010";
        }
        // Hide all fields
        const elements = document.querySelectorAll('.simple-input-container');
        elements.forEach(function(element) {
            if (!element.id.includes('Reason')) element.style.display = 'none';
        });
        reclaimImagesContainer.style.display = 'none';
        reclaimDescription.required = true;
        reclaimListingError.required = false;
        // Show the right fields
        if (input.includes('Defects')) {
            reclaimDescriptionContainer.style.display = 'block';
            reclaimImagesContainer.style.display = 'block';
            imagesTitle.innerText = "Bilder p\xe5 felet (obligatoriskt)";
        } else if (input.includes('Listing')) {
            reclaimListingErrorContainer.style.display = 'block';
            reclaimDescription.required = false;
            reclaimListingError.required = true;
        } else if (input.includes('False')) {
            reclaimDescriptionContainer.style.display = 'block';
            reclaimImagesContainer.style.display = 'block';
            imagesTitle.innerText = "Bilder p\xe5 felet (obligatoriskt)";
        } else if (input.includes('Dirty')) {
            reclaimDescriptionContainer.style.display = 'block';
            reclaimImagesContainer.style.display = 'block';
            imagesTitle.innerText = "Bilder p\xe5 felet (obligatoriskt)";
        } else if (input.includes('Smelly')) reclaimDescriptionContainer.style.display = 'block';
        else {
            reclaimDescriptionContainer.style.display = 'block';
            reclaimImagesContainer.style.display = 'block';
        }
        compensationPreferenceDiv.style.display = 'block';
    };
    reclaimListingError.onchange = function() {
        // Color and label
        let input = this.value;
        if (input === '') {
            listingErrorLabel.style.display = 'none';
            this.style.color = "#929292";
            return;
        } else {
            listingErrorLabel.style.display = 'block';
            this.style.color = "#101010";
        }
        if (input === 'Other') {
            reclaimDescriptionContainer.style.display = 'block';
            reclaimDescription.required = true;
        }
    };
    document.getElementById('doneButton').addEventListener('click', async function() {
        // Save reclaim
        const params = getParamsObject();
        const res = await saveReclaim(params.id);
        // Show confirmation
        if (res) {
            console.log('RECLAIM SAVED');
            reclaimForm.style.display = 'none';
            hideAllButtons();
            toMaiButton.style.display = 'flex';
            thankYouDiv.style.display = 'block';
        }
    });
    let imageElementIds = [
        'reclaimImage1',
        'reclaimImage2',
        'reclaimImage3',
        'reclaimImage4'
    ];
    imageElementIds.forEach(function(id) {
        let elemUpload = document.getElementById(id);
        let elemPreviewUploading = document.getElementById(`${id}PreviewUploading`);
        let elemPreview = document.getElementById(`${id}Preview`);
        elemUpload.addEventListener("change", function() {
            let input = this.files[0];
            if (input) {
                let src = URL.createObjectURL(input);
                elemPreviewUploading.style.backgroundImage = `url('${src}')`;
                elemPreview.style.backgroundImage = `url('${src}')`;
                document.getElementById(`loading${(0, _sellItemHelpers.capitalizeFirstLetter)(id)}Icon`).style.display = 'none';
                document.getElementById(id).required = false;
            }
        });
    });
    let inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input)=>{
        // Add an event listener to each input to clear validation message on input
        input.addEventListener('input', (input)=>{
            input.setCustomValidity(''); // Clear validation message
        });
        if (input.tagName.toLowerCase() === 'select') input.addEventListener('change', ()=>{
            input.setCustomValidity('');
        });
    });
}
function hideAllButtons() {
    resellButton.style.display = 'none';
    reclaimButton.style.display = 'none';
    cancelButton.style.display = 'none';
    doneButton.style.display = 'none';
    toMaiButton.style.display = 'none';
}
function getFormImages() {
    let elements = document.querySelectorAll("input").values();
    var elementsArr = [
        ...elements
    ];
    let images = [];
    console.log('elementsArr', elementsArr);
    elementsArr.forEach((elem)=>{
        if (elem.id.includes("Image") && elem.files[0]) images.push(elem.files[0]);
    });
    return images;
}
function validateMandatoryImages() {
    const i = getFormImages();
    if (!i.length) {
        document.getElementById('reclaimImage1').setCustomValidity(`Ladda upp minst en bild p\xe5 felet`);
        document.getElementById('reclaimFormInner').reportValidity();
        return false;
    }
    return true;
}
async function validateInput() {
    document.getElementById('reclaimFormInner').reportValidity();
    return new Promise((resolve, reject)=>{
        // Custom
        const reclaimReason1 = document.getElementById('reclaimReason');
        if (!reclaimReason1.value) {
            reclaimReason1.setCustomValidity(`V\xe4lj anledning till reklamationen`);
            document.getElementById('reclaimFormInner').reportValidity();
            return resolve(false);
        }
        // Images mandatory
        if (reclaimReason1.value.includes('Defects') || reclaimReason1.value.includes('False') || reclaimReason1.value.includes('Dirty')) {
            imagesTitle.innerText = "Bilder p\xe5 felet (obligatoriskt)";
            return resolve(validateMandatoryImages());
        }
        return resolve(true);
    });
}
async function saveReclaim(itemId) {
    if (!await validateInput()) return false;
    const now = new Date();
    const reason = reclaimReason.value;
    const listingError = reclaimListingError.value || '';
    if (reclaimListingError.required && !listingError) return false;
     // Borde vara del av validering
    const description = reclaimDescription.value || '';
    let compensationPreference = '';
    const radios = document.getElementsByName('compensationPreference');
    for(var i = 0; i < radios.length; i++)if (radios[i].checked) compensationPreference = radios[i].value;
    if (!compensationPreference) return false;
     // Borde vara del av validering
    const refundAmount = compensationPreference.includes('10 percent discount') ? parseInt(discount10PercentText.innerText.match(/\d+/g)) : null;
    let reclaim = {
        createdAt: now,
        status: 'Pending',
        reason,
        description,
        listingError,
        compensationPreference,
        ...refundAmount ? {
            refundAmount
        } : {}
    };
    // Spinner
    document.getElementById('doneButtonSpinner').style.display = 'block';
    document.getElementById('doneButtonText').style.display = 'none';
    // Save reclaim
    console.log('Will update: ', {
        itemId,
        reclaim
    });
    reclaim.images = await uploadImages(itemId);
    await callBackendApi(`/api/items/${itemId}/reclaim`, {
        data: {
            reclaim
        },
        requiresAuth: false
    });
    return true;
}
async function uploadImages(itemId) {
    const images = getFormImages();
    // Uploads files and add the new imageUrls to the changes object
    return await Promise.all(images.map(async (image, index)=>{
        const response = await (0, _sellItemHelpers.uploadTempImage)(image, `reclaim_${itemId}_${index}`);
        return response.url;
    }));
}
const getItem = async (itemId)=>{
    const res = await callBackendApi(`/api/items/${itemId}`);
    return {
        ...res?.data || {},
        id: itemId
    };
};
const main = async ()=>{
    const params = getParamsObject();
    const item = params.id ? await getItem(params.id) : '';
    if (!item) {
        console.error("Invalid item id param");
        location.href = '/';
    }
    initializePage(item);
    addEventListeners();
    triggerShowContent.click();
};
main();

},{"./sellItemHelpers":"8xEoj"}],"8xEoj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "uploadTempImage", ()=>uploadTempImage);
parcelHelpers.export(exports, "requestUniqueId", ()=>requestUniqueId);
parcelHelpers.export(exports, "enhanceFrontImage", ()=>enhanceFrontImage);
parcelHelpers.export(exports, "showDeleteImageIcon", ()=>showDeleteImageIcon);
parcelHelpers.export(exports, "rememberNewItemImageField", ()=>rememberNewItemImageField);
parcelHelpers.export(exports, "showImagePreview", ()=>showImagePreview);
parcelHelpers.export(exports, "capitalizeFirstLetter", ()=>capitalizeFirstLetter);
parcelHelpers.export(exports, "uploadImageAndShowPreview", ()=>uploadImageAndShowPreview);
parcelHelpers.export(exports, "showImageError", ()=>showImageError);
parcelHelpers.export(exports, "hideImageError", ()=>hideImageError);
parcelHelpers.export(exports, "showImageState", ()=>showImageState);
parcelHelpers.export(exports, "showLoadingIcon", ()=>showLoadingIcon);
parcelHelpers.export(exports, "checkBlockedOrLowShareSoldBrand", ()=>checkBlockedOrLowShareSoldBrand);
parcelHelpers.export(exports, "initializeCategorySelect", ()=>initializeCategorySelect);
parcelHelpers.export(exports, "fieldLabelToggle", ()=>fieldLabelToggle);
parcelHelpers.export(exports, "colorMapping", ()=>colorMapping);
parcelHelpers.export(exports, "colorName", ()=>colorName);
parcelHelpers.export(exports, "swedishColorToEnglish", ()=>swedishColorToEnglish);
async function uploadTempImage(input, fileName, existingItemId = null) {
    try {
        return await uploadTempImageWrapped(input, fileName, existingItemId);
    } catch (ex) {
        if (ex.name === 'ImageResizeError') {
            console.error('Failed to resize image', ex);
            errorHandler.report(ex);
            throw ex; // Don't retry for resize errors
        } else {
            console.error('Failed to upload image', ex);
            errorHandler.report(ex);
            // Retry once for upload errors
            return await uploadTempImageWrapped(input, fileName, existingItemId);
        }
    }
}
async function uploadTempImageWrapped(input, fileName, existingItemId = null) {
    if (!existingItemId && !sessionStorage.getItem('newItemId')) sessionStorage.setItem('newItemId', await requestUniqueId());
    const tempId = existingItemId || sessionStorage.getItem('newItemId');
    let image;
    try {
        image = await scaleImageToMaxSize(input);
        console.log(`Scaled image size: ${(image.size / 1024 / 1024).toFixed(2)} MB`);
    } catch (error) {
        const resizeError = new Error('Failed to resize image');
        resizeError.name = 'ImageResizeError';
        resizeError.originalError = error;
        throw resizeError;
    }
    if (!image) throw new Error('Fel vid bearbetning av vald bild.');
    const form = new FormData();
    form.append('itemId', tempId);
    form.append('fileName', fileName);
    form.append('file', image);
    form.append('temporary', !existingItemId);
    form.append('generateSmallImage', 'true');
    const response = await fetch(`${BACKEND_API_URL}/api/items/${tempId}/uploadImage`, {
        method: 'POST',
        body: form
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}
async function scaleImageToMaxSize(input) {
    if (input.size < 5242880) // Don't compress images < 5MB in size
    return Promise.resolve(input);
    const MAX_WIDTH = 3024;
    const MAX_HEIGHT = 4032;
    if ('createImageBitmap' in window) try {
        console.log('Attempting to scale image with createImageBitmap');
        return await imageBitmapScale(input, MAX_WIDTH, MAX_HEIGHT);
    } catch (error) {
        console.warn('createImageBitmap scaling method failed', error);
    }
    // If createImageBitmap is not supported or failed, try OffscreenCanvas
    if ('OffscreenCanvas' in window) try {
        console.log('Attempting to scale image with OffscreenCanvas');
        return await offscreenCanvasScale(input, MAX_WIDTH, MAX_HEIGHT);
    } catch (error) {
        console.warn('OffscreenCanvas scaling method failed', error);
    }
    // If both modern methods fail or are not supported, fall back to the original method
    try {
        console.log('Attempting to scale image with original method');
        return await canvasScale(input, MAX_WIDTH, MAX_HEIGHT);
    } catch (error) {
        console.error('All scaling methods failed', error);
        throw new Error('Unable to process image');
    }
}
async function imageBitmapScale(input, maxWidth, maxHeight) {
    try {
        const imageBitmap = await createImageBitmap(input);
        const canvas = new OffscreenCanvas(maxWidth, maxHeight);
        const ctx = canvas.getContext('2d');
        let { width, height } = imageBitmap;
        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(imageBitmap, 0, 0, width, height);
        return await canvas.convertToBlob({
            type: 'image/jpeg',
            quality: 0.9
        });
    } catch (error) {
        console.error('Image scaling failed', error);
        throw new Error('Unable to process image');
    }
}
async function offscreenCanvasScale(input, maxWidth, maxHeight) {
    const img = await createImageBitmap(input);
    let width = img.width;
    let height = img.height;
    if (width > height) {
        if (width > maxWidth) {
            height = height * (maxWidth / width);
            width = maxWidth;
        }
    } else if (height > maxHeight) {
        width = width * (maxHeight / height);
        height = maxHeight;
    }
    const offscreen = new OffscreenCanvas(width, height);
    const ctx = offscreen.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    return offscreen.convertToBlob({
        type: 'image/jpeg',
        quality: 0.9
    });
}
async function canvasScale(input, maxWidth, maxHeight) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.onload = ()=>{
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob)=>{
                console.log(`Fallback resize: ${(blob.size / 1024 / 1024).toFixed(2)} MB`);
                resolve(blob);
            }, 'image/jpeg', 0.9);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(input);
    });
}
async function requestUniqueId() {
    try {
        const response = await callBackendApi('/api/id', {
            method: 'POST',
            requiresAuth: false
        });
        return response.data.id;
    } catch (error) {
        console.error(`Failed to fetch unique ID, generating uuidv4 id: ${error.message}`, error);
        return uuidv4();
    }
}
async function enhanceFrontImage(imageUrl, saveState = true) {
    const enhancedImageUrls = await createEnhancedImage(imageUrl);
    if (enhancedImageUrls?.url) {
        if (saveState) rememberNewItemImageField('enhancedFrontImage', enhancedImageUrls.url, enhancedImageUrls.urlSmall);
        showImagePreview('frontImage', window.innerWidth <= 370 ? enhancedImageUrls.urlSmall : enhancedImageUrls.url);
    }
    showDeleteImageIcon('frontImage');
    return enhancedImageUrls;
}
async function createEnhancedImage(imageUrl) {
    try {
        const response = await callBackendApi('/api/images/enhance', {
            data: {
                imageUrl
            },
            requiresAuth: false,
            timeoutSec: 30
        });
        sessionStorage.setItem('enhancedFrontImage', response.data.url);
        return response.data;
    } catch (ex) {
        errorHandler.report(ex);
        console.error(ex);
        return '';
    }
}
function showDeleteImageIcon(imageName) {
    document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
    document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'inline-block';
    if (imageName === 'frontImage') document.getElementById('enhancedAnimationDiv').style.display = 'none';
}
function rememberNewItemImageField(imageName, imageUrl, imageUrlSmall) {
    let newItem = JSON.parse(localStorage.getItem('newItem') || JSON.stringify({}));
    const images = newItem.images || {};
    images[imageName] = imageUrl;
    images[`${imageName}Small`] = imageUrlSmall;
    newItem.images = images;
    localStorage.setItem('newItem', JSON.stringify(newItem));
}
function showImagePreview(imageName, url) {
    document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${url}')`;
    showDeleteImageIcon(imageName);
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
async function uploadImageAndShowPreview(input, imageName, saveState = true) {
    try {
        hideImageError(imageName);
        let src = URL.createObjectURL(input);
        document.getElementById(`${imageName}PreviewUploading`).style.backgroundImage = `url('${src}')`;
        document.getElementById(`${imageName}Preview`).style.backgroundImage = `url('${src}')`;
        showLoadingIcon(imageName);
        showImageState(imageName, 'success-state');
        const { url: imageUrl, urlSmall: imageUrlSmall } = await uploadTempImage(input, imageName);
        if (saveState) rememberNewItemImageField(imageName, imageUrl, imageUrlSmall);
        return imageUrl;
    } catch (ex) {
        console.error('Failed to upload image', ex);
        errorHandler.report(ex);
        document.getElementById(`${imageName}PreviewUploading`).style.backgroundImage = '';
        document.getElementById(`${imageName}Preview`).style.backgroundImage = '';
        document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
        showImageState(imageName, 'default-state');
        if (input.size > 10485760) showImageError(imageName, "Error: Bilden \xe4r f\xf6r stor. Max 10 MB.");
        else showImageError(imageName, "Error: N\xe5got gick fel vid uppladdning, f\xf6rs\xf6k igen eller kontakt oss om felet kvarst\xe5r.");
        document.getElementById(imageName).value = '';
    }
}
function showImageError(imageName, error) {
    const parentNode = document.getElementById(imageName).parentNode.parentNode;
    parentNode.querySelector('.w-file-upload-error').style.display = 'block';
    parentNode.querySelector('.w-file-upload-error-msg').innerText = error;
}
function hideImageError(imageName) {
    const parentNode = document.getElementById(imageName).parentNode.parentNode;
    parentNode.querySelector('.w-file-upload-error').style.display = 'none';
}
function showImageState(imageName, state) {
    const siblings = document.getElementById(imageName).parentNode.parentNode.childNodes;
    for(let i = 0; i < siblings.length; i++)if (siblings[i].className.includes(state)) siblings[i].style.display = 'block';
    else // Hide other states of file input field "empty-state" and "error-state"
    siblings[i].style.display = 'none';
}
function showLoadingIcon(imageName) {
    if (imageName === 'frontImage') {
        document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
        document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
        if (!localStorage.getItem('sessionUser')) document.getElementById('photoroomDiv').style.display = 'flex';
        document.getElementById('enhancedAnimationDiv').style.display = 'block';
        triggerEnhancingAnimation.click();
        return;
    }
    document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = 'inline-block';
    document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = 'none';
}
function checkBlockedOrLowShareSoldBrand(brand, category) {
    const BLOCKED_BRANDS = [
        'shein',
        'lager 157',
        'divided',
        'brandy melville',
        'cubus',
        'bubbleroom',
        'bondelid',
        'nelly',
        'dobber',
        "\xe5hl\xe9ns",
        'kappahl',
        'primark',
        'jack & jones',
        'sisters point',
        'missguided',
        'topman',
        'bik bok',
        'cubus',
        'happy holly',
        'zign',
        'glamorous',
        'hollister',
        'river island',
        'light before dark',
        'bohoo',
        'crocker',
        'forever 21',
        'maze',
        'mint&berry',
        'chiara forthi',
        'zalando',
        'din sko',
        'pull & bear',
        'svea',
        'zoul',
        'boohoo',
        'gap',
        'topshop',
        'ellos',
        'lager 157',
        'stradivarius',
        'studio total',
        'indiska',
        'bershka',
        'shein',
        'riley',
        'vero moda',
        'vila',
        'don donna',
        'aldo',
        'new look denim'
    ];
    const BLOCK_ONLY_LOW_VALUE_CATEGORY = [
        'karl kani',
        'rieker',
        'uniqlo',
        'carin wester',
        'stockh lm',
        'weekday',
        'mango',
        'wera',
        'ichi',
        'lindex',
        'h&m',
        'zara',
        'mng',
        'mq',
        'cheap monday',
        'h&m premium',
        'na-kd',
        'clarks',
        'gant',
        'hackett',
        'hugo boss',
        'la chemise',
        'lacoste',
        'lyle & scott',
        'marc o\'polo',
        'melvin & hamilton',
        'ray-ban',
        'reebok',
        'sebago',
        "stenstr\xf6ms",
        'the shirt factory',
        'hampton republic',
        'quicksilver',
        'banana republic',
        'pieces',
        'sprit',
        'denim',
        'east west',
        'xit',
        'jacqueline de yong',
        'mexx',
        'fb sister',
        "ok\xe4nt",
        'bodyflirt',
        'dorothy perkins',
        'fransa',
        'laurel',
        'rut&circle',
        'soc',
        'junkyard',
        'soyaconcept',
        'amisu',
        'u.s. polo assn.',
        'line of oslo',
        'gossip',
        'i say',
        'jascha stockholm',
        'noisy may',
        'six ames',
        'velour by nostalgi',
        'house of lola',
        'fiveunits',
        'miss me',
        'flash',
        'champion',
        'under armour',
        'oasis',
        'fornarina',
        'isolde',
        'rosebud',
        'chiquelle',
        'kaffe',
        'mckinley',
        'cream',
        'abercrombie & fitch',
        "modstr\xf6m",
        'ecco',
        'esprit',
        'alice bizous',
        'craft',
        'ellesse',
        'wesc',
        'dry lake',
        "r\xf6hnisch",
        'acqua limone',
        'anna field',
        'le',
        'ax paris',
        'burton',
        'hansen & jacob',
        'lou in love',
        'mad lady',
        'selected homme',
        'tenson',
        'whistles',
        'zizzi',
        'gerry weber'
    ];
    const BLOCK_NON_HIGH_VALUE_CATEGORY = [
        'tom tailor',
        'monki',
        'dressmann',
        'urban outfitters',
        'asos',
        'holly & white',
        'only',
        'gina tricot'
    ];
    const HIGH_VALUE_CATEGORY = [
        'boots',
        'dunjacka',
        'jacka',
        "k\xe4ngor",
        'kappa',
        'kavaj',
        'kostym',
        "p\xe4lsjacka",
        'regnjacka',
        'rock',
        'skinnjacka',
        'vinterskor'
    ];
    const LOW_VALUE_CATEGORY = [
        "baddr\xe4kt",
        'bikini',
        'bodysuit',
        'chinos',
        'flip-flops',
        'halsduk',
        'handduk',
        'hatt',
        'jeans',
        'keps',
        "l\xe5ng\xe4rmad t-shirt",
        'linne',
        'mjukisbyxor',
        'morgonrock',
        "m\xf6ssa",
        "necess\xe4r",
        "pik\xe9",
        'pyjamas',
        'sandaler',
        'sarong',
        'shorts',
        'slips',
        'sport-bh',
        'strumpbyxor',
        't-shirt',
        'tights',
        'topp',
        "tr\xe4ningsbyxor",
        "tr\xe4ningstr\xf6ja",
        "underst\xe4ll",
        'vantar'
    ];
    let hardToSellDiv = document.getElementById("hardToSellDiv");
    let wordsToWarnOn = [
        "H&M",
        "HM",
        "Zara",
        "ASOS",
        "Nelly",
        "Gina Tricot",
        "BikBok",
        "Bik Bok",
        "Lindex",
        "Kappahl",
        "Cubus",
        "NA-KD",
        "NAKD",
        "Mango",
        "Ellos",
        "Primark",
        "Shein",
        "Vila",
        "Forever 21",
        "Pull & Bear",
        "Bershka",
        "Stradivarius"
    ];
    document.getElementById("itemBrand").setCustomValidity('');
    const params = getParamsObject();
    if (!params.id && (BLOCKED_BRANDS.includes(brand.toLowerCase()) || !HIGH_VALUE_CATEGORY.includes(category?.toLowerCase()) && BLOCK_NON_HIGH_VALUE_CATEGORY.includes(brand.toLowerCase()) || LOW_VALUE_CATEGORY.includes(category?.toLowerCase()) && BLOCK_ONLY_LOW_VALUE_CATEGORY.includes(brand.toLowerCase()))) {
        hardToSellText.innerHTML = BLOCKED_BRANDS.includes(brand.toLowerCase()) ? `Vi s\xe4ljer tyv\xe4rr inte ${brand}-plagg p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.` : `Vi s\xe4ljer tyv\xe4rr inte kategorin ${category} fr\xe5n ${brand} p\xe5 grund av f\xf6r l\xe5g efterfr\xe5gan.`;
        stopIcon.style.display = 'flex';
        warningIcon.style.display = 'none';
        hardToSellDiv.style.display = 'block';
        document.getElementById("itemBrand").setCustomValidity(BLOCKED_BRANDS.includes(brand.toLowerCase()) ? `Vi s\xe4ljer inte plagg fr\xe5n ${brand}` : `Vi s\xe4ljer inte kategorin '${category}' fr\xe5n ${brand}`);
        return true;
    } else if (wordsToWarnOn.some((words)=>brand.toLowerCase().includes(words.toLowerCase()))) {
        hardToSellText.innerHTML = `Vi s\xe4ljer i regel inte ${brand}-plagg p\xe5 grund av f\xf6r l\xe5gt andrahandsv\xe4rde. Undantag kan finnas.`;
        stopIcon.style.display = 'none';
        warningIcon.style.display = 'block';
        hardToSellDiv.style.display = 'block';
        return true;
    } else hardToSellDiv.style.display = 'none';
}
function initializeCategorySelect(placeholderText = 'Kategori', onChangeCallback = checkBlockedOrLowShareSoldBrand) {
    const itemCategories = [
        {
            "id": "",
            "text": ""
        },
        {
            "text": "\xd6verdelar",
            "children": [
                {
                    "id": "Tr\xf6ja",
                    "text": "Tr\xf6ja"
                },
                {
                    "id": "Blus",
                    "text": "Blus"
                },
                {
                    "id": "Topp",
                    "text": "Topp"
                },
                {
                    "id": "Skjorta",
                    "text": "Skjorta"
                },
                {
                    "id": "Linneskjorta",
                    "text": "Linneskjorta"
                },
                {
                    "id": "T-shirt",
                    "text": "T-shirt"
                },
                {
                    "id": "Kavaj",
                    "text": "Kavaj"
                },
                {
                    "id": "Sweatshirt",
                    "text": "Sweatshirt"
                },
                {
                    "id": "Hoodie",
                    "text": "Hoodie"
                },
                {
                    "id": "Polotr\xf6ja",
                    "text": "Polotr\xf6ja"
                },
                {
                    "id": "Tunika",
                    "text": "Tunika"
                },
                {
                    "id": "V\xe4st",
                    "text": "V\xe4st"
                },
                {
                    "id": "Kofta",
                    "text": "Kofta"
                },
                {
                    "id": "Linne",
                    "text": "Linne"
                },
                {
                    "id": "Tr\xe4ningstr\xf6ja",
                    "text": "Tr\xe4ningstr\xf6ja"
                },
                {
                    "id": "Poncho",
                    "text": "Poncho"
                },
                {
                    "id": "Pik\xe9",
                    "text": "Pik\xe9"
                },
                {
                    "id": "L\xe5ng\xe4rmad T-shirt",
                    "text": "L\xe5ng\xe4rmad T-shirt"
                },
                {
                    "id": "Kostymv\xe4st",
                    "text": "Kostymv\xe4st"
                }
            ]
        },
        {
            "text": "Underdelar",
            "children": [
                {
                    "id": "Kjol",
                    "text": "Kjol"
                },
                {
                    "id": "Byxor",
                    "text": "Byxor"
                },
                {
                    "id": "Jeans",
                    "text": "Jeans"
                },
                {
                    "id": "Chinos",
                    "text": "Chinos"
                },
                {
                    "id": "Fritidsbyxor",
                    "text": "Fritidsbyxor"
                },
                {
                    "id": "Tr\xe4ningsbyxor",
                    "text": "Tr\xe4ningsbyxor"
                },
                {
                    "id": "Tights",
                    "text": "Tights"
                },
                {
                    "id": "Strumpbyxor",
                    "text": "Strumpbyxor"
                },
                {
                    "id": "Mjukisbyxor",
                    "text": "Mjukisbyxor"
                },
                {
                    "id": "Kostymbyxor",
                    "text": "Kostymbyxor"
                },
                {
                    "id": "Shorts",
                    "text": "Shorts"
                },
                {
                    "id": "Sarong",
                    "text": "Sarong"
                }
            ]
        },
        {
            "text": "Helkropp",
            "children": [
                {
                    "id": "Kl\xe4nning",
                    "text": "Kl\xe4nning"
                },
                {
                    "id": "Kaftan",
                    "text": "Kaftan"
                },
                {
                    "id": "Kostym",
                    "text": "Kostym"
                },
                {
                    "id": "Set",
                    "text": "Set"
                },
                {
                    "id": "Jumpsuit",
                    "text": "Jumpsuit"
                },
                {
                    "id": "Baddr\xe4kt",
                    "text": "Baddr\xe4kt"
                },
                {
                    "id": "Bikini",
                    "text": "Bikini"
                },
                {
                    "id": "Pyjamas",
                    "text": "Pyjamas"
                },
                {
                    "id": "Morgonrock",
                    "text": "Morgonrock"
                },
                {
                    "id": "Br\xf6llopskl\xe4nning",
                    "text": "Br\xf6llopskl\xe4nning"
                },
                {
                    "id": "Balkl\xe4nning",
                    "text": "Balkl\xe4nning"
                },
                {
                    "id": "Bodysuit",
                    "text": "Bodysuit"
                },
                {
                    "id": "Underst\xe4ll",
                    "text": "Underst\xe4ll"
                }
            ]
        },
        {
            "text": "Ytterkl\xe4der",
            "children": [
                {
                    "id": "Jacka",
                    "text": "Jacka"
                },
                {
                    "id": "Kappa",
                    "text": "Kappa"
                },
                {
                    "id": "Rock",
                    "text": "Rock"
                },
                {
                    "id": "Fritidsjacka",
                    "text": "Fritidsjacka"
                },
                {
                    "id": "Trenchcoat",
                    "text": "Trenchcoat"
                },
                {
                    "id": "Skinnjacka",
                    "text": "Skinnjacka"
                },
                {
                    "id": "Dunjacka",
                    "text": "Dunjacka"
                },
                {
                    "id": "Regnjacka",
                    "text": "Regnjacka"
                },
                {
                    "id": "P\xe4lsjacka",
                    "text": "P\xe4lsjacka"
                }
            ]
        },
        {
            "text": "Skor",
            "children": [
                {
                    "id": "Sneakers",
                    "text": "Sneakers"
                },
                {
                    "id": "Sandaler",
                    "text": "Sandaler"
                },
                {
                    "id": "Klackar",
                    "text": "Klackar"
                },
                {
                    "id": "Ballerinaskor",
                    "text": "Ballerinaskor"
                },
                {
                    "id": "Loafers",
                    "text": "Loafers"
                },
                {
                    "id": "Flip-flops",
                    "text": "Flip-flops"
                },
                {
                    "id": "Regnst\xf6vlar",
                    "text": "Regnst\xf6vlar"
                },
                {
                    "id": "Boots",
                    "text": "Boots"
                },
                {
                    "id": "K\xe4ngor",
                    "text": "K\xe4ngor"
                },
                {
                    "id": "Vinterskor",
                    "text": "Vinterskor"
                },
                {
                    "id": "Skor",
                    "text": "Annat (Skor)"
                }
            ]
        },
        {
            "text": "V\xe4skor",
            "children": [
                {
                    "id": "Axelremsv\xe4ska",
                    "text": "Axelremsv\xe4ska"
                },
                {
                    "id": "Handv\xe4ska",
                    "text": "Handv\xe4ska"
                },
                {
                    "id": "Kuvertv\xe4ska",
                    "text": "Kuvertv\xe4ska"
                },
                {
                    "id": "Ryggs\xe4ck",
                    "text": "Ryggs\xe4ck"
                },
                {
                    "id": "Tr\xe4ningsv\xe4ska",
                    "text": "Tr\xe4ningsv\xe4ska"
                },
                {
                    "id": "Resv\xe4ska",
                    "text": "Resv\xe4ska"
                },
                {
                    "id": "Datorv\xe4ska",
                    "text": "Datorv\xe4ska"
                },
                {
                    "id": "V\xe4ska",
                    "text": "Annat (V\xe4ska)"
                }
            ]
        },
        {
            "text": "Accessoarer",
            "children": [
                {
                    "id": "Solglas\xf6gon",
                    "text": "Solglas\xf6gon"
                },
                {
                    "id": "Glas\xf6gon",
                    "text": "Glas\xf6gon"
                },
                {
                    "id": "\xd6rh\xe4nge",
                    "text": "\xd6rh\xe4nge"
                },
                {
                    "id": "Halsband",
                    "text": "Halsband"
                },
                {
                    "id": "Armband",
                    "text": "Armband"
                },
                {
                    "id": "Ring",
                    "text": "Ring"
                },
                {
                    "id": "Brosch",
                    "text": "Brosch"
                },
                {
                    "id": "Keps",
                    "text": "Keps"
                },
                {
                    "id": "Sjal",
                    "text": "Sjal"
                },
                {
                    "id": "Krage",
                    "text": "Krage"
                },
                {
                    "id": "B\xe4lte",
                    "text": "B\xe4lte"
                },
                {
                    "id": "Pl\xe5nbok",
                    "text": "Pl\xe5nbok"
                },
                {
                    "id": "Halsduk",
                    "text": "Halsduk"
                },
                {
                    "id": "Hatt",
                    "text": "Hatt"
                },
                {
                    "id": "M\xf6ssa",
                    "text": "M\xf6ssa"
                },
                {
                    "id": "Vantar",
                    "text": "Vantar"
                },
                {
                    "id": "Necess\xe4r",
                    "text": "Necess\xe4r"
                },
                {
                    "id": "Slips",
                    "text": "Slips"
                },
                {
                    "id": "Handduk",
                    "text": "Handduk"
                },
                {
                    "id": "Klocka",
                    "text": "Klocka"
                }
            ]
        }
    ];
    $('#itemCategory').select2({
        selectionCssClass: 'form-field',
        placeholder: placeholderText || 'Kategori',
        data: itemCategories
    });
    $("body").on('click', '.select2-container--open .select2-results__group', function() {
        if ($(this).parent().attr('class').match(/expanded-group/)) $(this).parent().removeClass('expanded-group');
        else {
            $('.expanded-group').first().removeClass('expanded-group');
            $(this).parent().addClass('expanded-group');
        }
    });
    let headerAdded = false;
    $('#itemCategory').on('select2:select', ()=>{
        analytics.track('Click', {
            elementID: 'itemCategoryValue'
        });
        document.querySelector('#itemCategory').dispatchEvent(new Event('change'));
    });
    let searchClickTracked = false;
    $('#itemCategory').on('select2:open', ()=>{
        if (!searchClickTracked) {
            searchClickTracked = true;
            $('input.select2-search__field').on('click', ()=>{
                analytics.track('Click', {
                    elementID: 'itemCategorySearch'
                });
            });
        }
    });
    $('#itemCategory').on('select2:close', ()=>{
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector('body').style.position = 'static';
        document.querySelector('html').style.overflow = 'static';
    });
    $('#itemCategory').on('select2:open', function() {
        analytics.track("Element Viewed", {
            elementID: "itemCategoryContainer"
        });
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('body').style.position = 'fixed';
        document.querySelector('html').style.overflow = 'fixed';
        const searchField = document.querySelector('.select2-search__field');
        searchField.placeholder = "S\xf6k... (t.ex. Kl\xe4nning/Sneakers/Blus)";
        $('.select2-search__field').on('input', (e)=>{
            if (e.target.value.length > 0) $('.select2-results__option[role=group]').each((idx, elm)=>$(elm).addClass('expanded-group'));
            else $('.expanded-group').each((idx, elm)=>$(elm).removeClass('expanded-group'));
        });
        if (!headerAdded) {
            const header = document.getElementById('categoryPopUpHeader');
            const container = document.querySelector('.select2-dropdown');
            container.insertBefore(header, container.firstChild);
            header.style.display = 'block';
            header.querySelector('#categorySelectClose').onclick = ()=>$('#itemCategory').select2('close');
            headerAdded = true;
        }
        document.querySelector('.select2-results__options').addEventListener('scroll', ()=>document.activeElement.blur());
    });
    $('#itemCategory').on('change', (event)=>{
        fieldLabelToggle('itemCategoryLabel')(event);
        const category = document.getElementById('itemCategory');
        const brand = document.getElementById("itemBrand");
        onChangeCallback(brand.value, category.value);
    });
    // From https://github.com/select2/select2/issues/3015#issuecomment-570171720
    $("#itemCategory").on("select2:open", function() {
        $(".select2-results").css("visibility", "hidden");
    });
    $("#itemCategory").on('select2:opening', function() {
        setTimeout(function() {
            $(".select2-results").css("visibility", "visible");
        }, 50);
    });
}
function fieldLabelToggle(labelId) {
    return (event)=>{
        document.getElementById(labelId).style.display = event.target.value.length > 0 ? 'inline-block' : 'none';
    };
}
const colorMapping = {
    Beige: 'Beige',
    Blue: "Bl\xe5",
    Brown: 'Brun',
    Green: "Gr\xf6n",
    Grey: "Gr\xe5",
    Yellow: 'Gul',
    Gold: 'Guld',
    Purple: 'Lila',
    Navy: 'Navy',
    Orange: 'Orange',
    Pink: 'Rosa',
    Red: "R\xf6d",
    Silver: 'Silver',
    Black: 'Svart',
    Turquoise: 'Turkos',
    Burgundy: "Vinr\xf6d",
    White: 'Vit',
    Multicolour: "Flerf\xe4rgad"
};
function colorName(color) {
    return colorMapping[color] || color;
}
function swedishColorToEnglish(color) {
    return Object.entries(colorMapping).find(([key, value])=>value.toLowerCase() === color.toLowerCase())?.[0] || color;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["fjNiH","9ZHI8"], "9ZHI8", "parcelRequire81ca")

//# sourceMappingURL=reclaim.js.map
