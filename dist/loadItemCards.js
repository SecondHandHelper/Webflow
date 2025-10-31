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
})({"aLNG8":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SERVER_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "ed3e03c180d4b8ec";
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

},{}],"ihd5m":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadItemCards", ()=>loadItemCards);
var _general = require("./general");
var _private = require("./private");
var _sellItemHelpers = require("./sellItemHelpers");
/**
 * @param {String} HTML representing a single element.
 * @param {Boolean} flag representing whether or not to trim input whitespace, defaults to true.
 * @return {Element | HTMLCollection | null}
 */ function fromHTML(html, trim = true) {
    // Process the HTML string.
    html = trim ? html : html.trim();
    if (!html) return null;
    // Then set up a new template element.
    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;
    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
}
function getQrCodeButton(itemId) {
    let itemPageUrl = window.location.origin + `/ship-item?id=${itemId}`;
    const div = `<a id="qrCodeButton" href="${itemPageUrl}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63bdeaf1af902f05607f86ef_Group.svg" class="image-43">
                                            <div class="text-block-113">Visa QR</div>
                            </div>
                    </a>`;
    return div;
}
function getBarcodeButton(itemId) {
    let itemPageUrl = window.location.origin + `/ship-item?id=${itemId}`;
    const div = `<a id="barcodeButton" href="${itemPageUrl}" class="link-block-39">
                            <div class="div-block-194">
                                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/65418186f29682eaff3f74be_barcode-icon%20(1).svg" class="image-100">
                                            <div class="text-block-113">Visa streckkod</div>
                            </div>
                    </a>`;
    return div;
}
function getResellButton(itemId) {
    let itemPageUrl = window.location.origin + `/sell-item?id=${itemId}`;
    const div = `<a id="resellButton" href="${itemPageUrl}" class="link-block-39">
                            <div class="div-block-194">
                                            <div class="text-block-113">L\xe4gg upp p\xe5 nytt</div>
                            </div>
                    </a>`;
    return div;
}
function getBookPickupButton(itemId) {
    const div = `<a id="bookPickupButton-${itemId}" href="#" class="link-block-39">
                            <div class="div-block-194">
                                <div class="text-block-113">Boka h\xe4mtning</div>
                            </div>
                    </a>`;
    return div;
}
async function storeShippingMethod(itemId, method) {
    console.log(`storeShippingMethod(${itemId}, ${method}) is running`);
    await db.collection('items').doc(itemId).update({
        shippingMethod: method
    }).then((docRef)=>{
        console.log(`Shipping method '${method}' stored on item with ID: `, itemId);
        window.pickupFlowItemId = itemId; // Legacy from before. Bad way of doing it. Should clean up 'pickupFlowItemId' at some point.
        if (method == "Service point") {
            document.getElementById('feedbackFormTitle').innerHTML = "Tack, d\xe5 vet vi att paketet snart l\xe4mnas till ett ombud.";
            document.getElementById('triggerShippingToastClose').click();
        }
        (0, _private.closePickupToast)();
        document.getElementById('triggerFeedbackFormOpen').click();
    });
}
function openShippingToast(itemId, soldDate) {
    console.log(`openShippingToast(${itemId}, ${soldDate})`);
    window.pickupFlowItemId = itemId;
    setTimeout(()=>{
        document.getElementById('servicePointButton').addEventListener('click', async ()=>{
            await storeShippingMethod(itemId, 'Service point');
        });
        document.getElementById('bookPickupButton').addEventListener('click', ()=>{
            openPickupToast(itemId, soldDate);
        });
    }, 0);
    triggerShippingToastOpen.click();
}
function openServicePointToast(itemId, soldDate) {
    console.log("openServicePointToast");
    changeToPickupButton.addEventListener('click', ()=>{
        openPickupToast(itemId, soldDate);
    });
    triggerServicePointToastOpen.click();
}
function openConvertToGiftCard(itemId, itemImage, soldPrice, brand) {
    document.getElementById('convertGiftCardInfoBox').style.display = 'flex';
    document.querySelector('.dark-overlay').style.display = 'block';
    document.getElementById('giftCardItemImage').src = itemImage;
    document.getElementById('giftCardText').innerText = `Vill du f\xe5 ${soldPrice}kr (100% av vinsten) att handla f\xf6r p\xe5 ${brandPartners[brand].url} ist\xe4llet?`;
    document.getElementById('closeGiftCardBox').addEventListener('click', ()=>{
        document.getElementById('convertGiftCardInfoBox').style.display = 'none';
        document.querySelector('.dark-overlay').style.display = 'none';
    });
    document.getElementById('closeGiftCardBoxButton').addEventListener('click', ()=>{
        document.getElementById('convertGiftCardInfoBox').style.display = 'none';
        document.querySelector('.dark-overlay').style.display = 'none';
    });
    // This is updating the dataset with the itemId, brand and soldPrice, to be used when the user clicks the button
    document.getElementById('convertToGiftCardButton').dataset.currentItemId = itemId;
    document.getElementById('convertToGiftCardButton').dataset.currentBrand = brand;
    document.getElementById('convertToGiftCardButton').dataset.currentSoldPrice = soldPrice;
}
document.getElementById('convertToGiftCardButton').addEventListener('click', async ()=>{
    const itemId = document.getElementById('convertToGiftCardButton').dataset.currentItemId;
    const brand = document.getElementById('convertToGiftCardButton').dataset.currentBrand;
    const soldPrice = document.getElementById('convertToGiftCardButton').dataset.currentSoldPrice;
    await callBackendApi(`/api/items/${itemId}`, {
        data: {
            payoutType: 'Brand Gift Card'
        },
        method: 'PUT'
    });
    document.getElementById('convertGiftCardInfoBox').style.display = 'none';
    document.querySelector('.dark-overlay').style.display = 'none';
    document.getElementById(`convertToGiftCardDiv-${itemId}`).style.display = 'none';
    document.getElementById(`text1-${itemId}`).innerHTML = document.getElementById(`text1-${itemId}`).innerHTML.replace(/\d+/, soldPrice);
    document.getElementById(`text2-${itemId}`).innerHTML = `(${brandPartners[brand].name}-presentkort)<br>`;
});
function openYouGetInfoBox(soldPrice, sellerGetsValue) {
    priceAfterPlatformFee.innerHTML = soldPrice;
    const commission = soldPrice - sellerGetsValue;
    commissionAmount.innerHTML = commission === 0 ? '-' : '-' + commission;
    if (commission / soldPrice > 0.9 && commission / soldPrice < 0.11) commissionTitle.innerHTML = `Rabatterad kommission (10%)`;
    if (commission / soldPrice > 0.19 && commission / soldPrice < 0.21) commissionTitle.innerHTML = `Kommission (20%)`;
    if (commission / soldPrice > 0.29 && commission / soldPrice < 0.31 && commission !== 50 && commission !== 500) commissionTitle.innerHTML = `Kommission (30%)`;
    if (commission < 1) commissionTitle.innerHTML = `Fri kommission (0%)`;
    youGetAmount.innerHTML = sellerGetsValue;
    youGetInfoBox.style.display = 'flex';
    darkOverlay.style.display = 'block';
    closeYouGetInfoBox.addEventListener('click', ()=>{
        youGetInfoBox.style.display = 'none';
        darkOverlay.style.display = 'none';
    });
}
function openPickupToast(itemId, soldDate, servicePointButtonDisplay = 'none') {
    console.log(`openPickupToast(${itemId}, ${soldDate}) is running`);
    triggerShippingToastClose.click();
    triggerServicePointToastClose.click();
    changeToServicePointButton.addEventListener('click', async ()=>{
        await storeShippingMethod(itemId, 'Service point');
    });
    changeToServicePointButton.style.display = servicePointButtonDisplay;
    setDatesOfPickupToast(soldDate);
    window.pickupFlowItemId = itemId;
    triggerPickupAnimation.click();
}
function setDatesOfPickupToast(soldDate) {
    console.log(`setDatesOfPickupToast(${soldDate}) is running`);
    // Hide all options first, to later determine which ones to show
    radioFieldOne.style.display = 'none';
    radioFieldTwo.style.display = 'none';
    radioFieldThree.style.display = 'none';
    radioFieldFour.style.display = 'none';
    // Create the 4 first possible pickup dates, starting 4 b-days after soldDate
    var firstDate = new Date(soldDate);
    firstDate.setTime(firstDate.getTime() + 3600000); // With soldDate on format "yyyy-m-dd" (note one m) the time is set to 00 which resulted in bug, had to add 1 hour, or fix the format.
    firstDate.setDate(firstDate.getDate() + 4);
    if (firstDate.getDay() == 6 || firstDate.getDay() == 0 || firstDate.getDay() == 1 || firstDate.getDay() == 2) firstDate.setDate(firstDate.getDate() + 2); // If sat, sun, mon, tue => compensate for weekend with 2 days
    else if (firstDate.getDay() == 3) firstDate.setDate(firstDate.getDate() + 1); // If wednesday, add 1 days to compensate for sunday
    var secondDate = new Date(firstDate);
    secondDate.setDate(secondDate.getDate() + 1);
    if (secondDate.getDay() == 6) secondDate.setDate(secondDate.getDate() + 2);
    var thirdDate = new Date(secondDate);
    thirdDate.setDate(thirdDate.getDate() + 1);
    if (thirdDate.getDay() == 6) thirdDate.setDate(thirdDate.getDate() + 2);
    var forthDate = new Date(thirdDate);
    forthDate.setDate(forthDate.getDate() + 1);
    if (forthDate.getDay() == 6) forthDate.setDate(forthDate.getDate() + 2);
    var days = [
        "S\xf6ndag",
        "M\xe5ndag",
        'Tisdag',
        'Onsdag',
        'Torsdag',
        'Fredag',
        "L\xf6rdag"
    ];
    var months = [
        'jan',
        'feb',
        'mar',
        'apr',
        'maj',
        'jun',
        'jul',
        'aug',
        'sep',
        'okt',
        'nov',
        'dec'
    ];
    // Change value of radio buttons and display to user
    let today = new Date();
    let optionsDisplayed = 0;
    console.log("Today", today);
    console.log("firstDate > today", firstDate > today);
    console.log("secondDate > today", secondDate > today);
    console.log("thirdDate > today", thirdDate > today);
    console.log("forthDate > today", forthDate > today);
    const pickupDateOne = document.getElementById('pickupDateOne');
    const pickupDateTwo = document.getElementById('pickupDateTwo');
    const pickupDateThree = document.getElementById('pickupDateThree');
    const pickupDateFour = document.getElementById('pickupDateFour');
    if (firstDate > today) {
        $('#radioButtonOne').val(firstDate.toISOString().split('T')[0]); //yyyy-mm-dd
        pickupDateOne.innerHTML = days[firstDate.getDay()] + ", " + firstDate.getDate() + " " + months[firstDate.getMonth()] + ", kl 9-16";
        radioFieldOne.style.display = 'flex';
        optionsDisplayed++;
    }
    if (secondDate > today) {
        $('#radioButtonTwo').val(secondDate.toISOString().split('T')[0]);
        pickupDateTwo.innerHTML = days[secondDate.getDay()] + ", " + secondDate.getDate() + " " + months[secondDate.getMonth()] + ", kl 9-16";
        radioFieldTwo.style.display = 'flex';
        optionsDisplayed++;
    }
    if (thirdDate > today) {
        $('#radioButtonThree').val(thirdDate.toISOString().split('T')[0]);
        pickupDateThree.innerHTML = days[thirdDate.getDay()] + ", " + thirdDate.getDate() + " " + months[thirdDate.getMonth()] + ", kl 9-16";
        radioFieldThree.style.display = 'flex';
        optionsDisplayed++;
    }
    if (forthDate > today) {
        $('#radioButtonFour').val(forthDate.toISOString().split('T')[0]);
        pickupDateFour.innerHTML = days[forthDate.getDay()] + ", " + forthDate.getDate() + " " + months[forthDate.getMonth()] + ", kl 9-16";
        radioFieldFour.style.display = 'flex';
        optionsDisplayed++;
    }
    // If less than two options displayed, add at least two options
    if (optionsDisplayed < 2) {
        radioFieldOne.style.display = 'none';
        radioFieldTwo.style.display = 'none';
        radioFieldThree.style.display = 'none';
        radioFieldFour.style.display = 'none';
        var dayOne = new Date();
        dayOne.setDate(today.getDate() + 1);
        if (dayOne.getDay() == 0) dayOne.setDate(dayOne.getDate() + 1);
        else if (dayOne.getDay() == 6) dayOne.setDate(dayOne.getDate() + 2);
        var dayTwo = new Date(dayOne);
        dayTwo.setDate(dayTwo.getDate() + 1);
        if (dayTwo.getDay() == 6) dayTwo.setDate(dayTwo.getDate() + 2);
        console.log("dayOne: ", dayOne);
        console.log("dayTwo: ", dayTwo);
        // Show tomorrow as an option
        $('#radioButtonOne').val(dayOne.toISOString().split('T')[0]);
        pickupDateOne.innerHTML = days[dayOne.getDay()] + ", " + dayOne.getDate() + " " + months[dayOne.getMonth()] + ", kl 9-16";
        radioFieldOne.style.display = 'flex';
        // Show day after tomorrow as an option
        $('#radioButtonTwo').val(dayTwo.toISOString().split('T')[0]);
        pickupDateTwo.innerHTML = days[dayTwo.getDay()] + ", " + dayTwo.getDate() + " " + months[dayTwo.getMonth()] + ", kl 9-16";
        radioFieldTwo.style.display = 'flex';
    }
}
function bagReceivedAction(checkbox, itemId, soldDate, shippingMethod) {
    if (checkbox.checked) {
        db.collection('items').doc(itemId).update({
            bagReceived: true
        }).then((docRef)=>{
            console.log(`Stored in DB that bag is received for item with ID: `, itemId);
        });
        if (shippingMethod === 'Pickup') openPickupToast(itemId, soldDate, 'flex');
        else if (shippingMethod === 'Service point') openServicePointToast(itemId, soldDate);
        else openShippingToast(itemId, soldDate);
    } else db.collection('items').doc(itemId).update({
        bagReceived: false
    }).then((docRef)=>{
        console.log(`Stored in DB that bag is NOT received for item with ID: `, itemId);
    });
}
function getBagReceivedCheckbox(itemId, soldDate, shippingMethod) {
    const div = `<div class="w-form">
            <form method="get" name="wf-form-" id="bagReceivedForm">
                <label class="w-checkbox checkbox-field-3">
                    <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox-2"></div>
                    <input type="checkbox" id="bagReceivedCheckbox-${itemId}" style="opacity:0;position:absolute;z-index:-1">
                    <span class="checkbox-label-3 w-form-label">Etiketten har kommit</span>
                </label>
            </form>
        </div>`;
    return div;
}
function getShippingInfoDiv(itemId, method, soldDate, pickupDate, bagReceived, shipper) {
    let shippingInfo = ``;
    const infoIcon = !bagReceived || bagReceived && method == "Pickup" && !pickupDate ? `<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63be70f55a4305a398cf918e_info-icon.svg" class="image-44">` : '';
    const shipItemPageUrl = window.location.origin + `/ship-item?id=${itemId}`;
    if (method == "Service point") {
        let shipperIcon = '6297d3d527db5dd4cf02e924/6399ac2a3505ee6071fbc18a_Vector%20(1).svg';
        if (shipper === 'postnord') shipperIcon = '6297d3d527db5dd4cf02e924/655d182c37fc30df71b078cd_postnord-square-icon%20(1).svg';
        if (shipper === 'dhl') shipperIcon = '6297d3d527db5dd4cf02e924/655d1830f259c0bc084c2937_dhl-square-icon%20(1).svg';
        if (shipper === 'ups') shipperIcon = '6297d3d527db5dd4cf02e924/6603eaef0d5af57f5cce2e40_ups-squared-icon.jpg';
        shippingInfo += `
                        <img src="https://global-uploads.webflow.com/${shipperIcon}" class="shipper-icon">
                        <div class="next-step-text-small">L\xe4mnas till ombud</div>
                        ${infoIcon}
                    `;
    } else if (method == "Pickup") {
        if (pickupDate) {
            var date = new Date(pickupDate);
            var days = [
                "S\xf6n",
                "M\xe5n",
                'Tis',
                'Ons',
                'Tors',
                'Fre',
                "L\xf6r"
            ];
            var months = [
                'jan',
                'feb',
                'mar',
                'apr',
                'maj',
                'jun',
                'jul',
                'aug',
                'sep',
                'okt',
                'nov',
                'dec'
            ];
            var dateNumber = date.getDate();
            var monthName = months[date.getMonth()];
            var dayName = days[date.getDay()];
            var pickupTimeInfoText = dayName + ", " + dateNumber + " " + monthName + ", kl 9-16";
            shippingInfo += `
                                <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                                <div class="next-step-text-small">${pickupTimeInfoText}</div>`;
        } else shippingInfo += `
                            <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63999dabb3be9ead61bf6488_Vector.svg" class="image-45">
                            <div class="next-step-text-small">Upph\xe4mtning</div>
                            ${infoIcon}
                        `;
    }
    // Turn shipping info into a link to ship item page
    const div = `
                        <a id="shipItemPageLink" href="${shipItemPageUrl}" class="link-block-40">
                                ${shippingInfo}
                        </a>`;
    return div;
}
function loadItemCards(items, userData = null) {
    // Clear containers
    itemListSelling.innerHTML = "";
    itemListSoldNotSent.innerHTML = "";
    itemListSold.innerHTML = "";
    // Create DocumentFragments for batch DOM updates
    const sellingFragment = document.createDocumentFragment();
    const soldNotSentFragment = document.createDocumentFragment();
    const soldFragment = document.createDocumentFragment();
    // Collect HTML strings for batch processing
    let sellingHTML = "";
    let soldNotSentHTML = "";
    let soldHTML = "";
    var youEarned = 0;
    (items || []).forEach((item)=>{
        var itemId = item.id;
        var soldDate = item.soldDate;
        var status = item.status;
        var shippingStatus = item.shippingStatus;
        var brand = item.brand;
        var soldPrice = item.soldPrice;
        var sellerGets = item.sellerGets ? Math.ceil(item.sellerGets) : item.sellerGets;
        var sellerGetsValue = item.payoutType === 'Brand Gift Card' ? soldPrice : sellerGets;
        var buyerFirstName = item.buyer?.FirstName || item.buyerFirstName;
        var buyerAddressCity = item.buyer?.City || item.buyerAddressCity;
        var minPriceEstimate = item.minPriceEstimate;
        var maxPriceEstimate = item.maxPriceEstimate;
        var infoRequests = item.infoRequests;
        var pickupDate = item.pickupDate;
        var shippingMethod = item.shippingMethod;
        var postnordQrCode = item.postnordQrCode;
        var dhlBarcode = item.dhlLicensePlateBarcodeSrc;
        var upsShipmentId = item.upsShipmentId;
        var bagReceived = item.bagReceived;
        var soldPlatform = item.soldPlatform;
        var archived = item.archived;
        var holidayMode = item.holidayMode;
        var longerPeriodAcceptedDate = item.longerPeriodAcceptedDate;
        const images = item.images;
        var frontImageUrl = (0, _general.itemCoverImage)(item);
        let daysLeftText = "";
        let publishedDate = item.publishedDate;
        let daysSincePublished;
        if (publishedDate) {
            publishedDate = new Date(publishedDate);
            let nowDate = new Date();
            let timeDifference = nowDate.getTime() - publishedDate.getTime();
            daysSincePublished = timeDifference / 86400000;
            let sellingPeriodLength = longerPeriodAcceptedDate ? 60 : 30;
            let daysLeft = Math.round(sellingPeriodLength - daysSincePublished);
            if (daysLeft <= 0) daysLeftText = `0 dagar kvar`;
            else daysLeftText = `${daysLeft} dagar kvar`;
        }
        let daysSinceSold;
        if (soldDate) {
            let specificDate = new Date(soldDate);
            let nowDate = new Date();
            specificDate.setHours(0, 0, 0, 0);
            nowDate.setHours(0, 0, 0, 0);
            let timeDifference = nowDate - specificDate;
            daysSinceSold = Math.round(timeDifference / 86400000);
        }
        if (!archived && status !== "Unsold") displayItemCard();
        function displayItemCard() {
            //Putting the items in the right list
            let itemPageUrl = window.location.origin + `/item?id=${itemId}`;
            // WE SELL RIGHT NOW
            if (status !== "Sold") {
                let textDiv1 = "";
                let textDiv2 = "";
                if (status === "New") {
                    if (infoRequests?.price?.status === "Active") textDiv1 = `<div class='text-block-34'>Inv\xe4ntar ditt svar</div>`;
                    else if (minPriceEstimate && maxPriceEstimate) {
                        textDiv1 = `<div class='text-block-34'>${minPriceEstimate} - ${maxPriceEstimate} kr</div>`;
                        textDiv2 = `<div class='text-block-34'>F\xf6rbereds</div>`;
                    } else textDiv1 = `<div class='text-block-34'>V\xe4rdering p\xe5g\xe5r</div>`;
                }
                if (status === "Published" && minPriceEstimate && maxPriceEstimate) {
                    textDiv1 = `<div class='text-block-34'>${minPriceEstimate} - ${maxPriceEstimate} kr</div>`;
                    const timeText = userData?.specialDeal ? `Live (${Math.round(daysSincePublished)} dagar)` : daysLeftText;
                    textDiv2 = `<div class='text-block-34'>${holidayMode ? "Pausad" : timeText}</div>`;
                }
                let sellingItemCardHTML = `<div class="div-block-14-big"><a id="itemLinkBlock" href="${itemPageUrl}" class="link-block-18 w-inline-block"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${frontImageUrl}');"></div></div></div><div class="text-block-14">${brand}</div>${textDiv1}${textDiv2}</a></div>`;
                sellingHTML += sellingItemCardHTML;
                //Display list
                myItemsDiv.style.display = "block";
                //Hide empty state
                noItemsDiv.style.display = "none";
                headerSellItemButton.style.display = "block";
                sellButtonText.innerHTML = "S\xe4lj ett plagg";
            // SOLD - NOT SENT
            } else if (status == "Sold" && (shippingStatus == "Not sent" || !shippingStatus)) {
                // Prepare card
                const isCanceled = soldPlatform === 'Vestiaire Collective' && daysSinceSold > 7 ? true : false;
                var userActionDiv = '';
                var shippingInfoDiv = '';
                let changeShippingMethod = '';
                let removeItemButton = '';
                let shipper = '';
                let text1 = `Du f\xe5r ${sellerGetsValue} kr`;
                let text2 = '';
                let text3 = '';
                if (!isCanceled) {
                    if (buyerFirstName != null && buyerAddressCity != null && soldPrice) {
                        const brandCollabGiftCard = isGiftCardPartner(item.brand)?.giftCards;
                        const str = `S\xe5ld till ${buyerFirstName} i ${buyerAddressCity}${brandCollabGiftCard ? '' : " f\xf6r " + soldPrice + ' kr'}`;
                        if (!brandCollabGiftCard) {
                            // Split sentence into two equally long rows
                            let output = '';
                            const words = str.split(' ');
                            words.forEach(function(word) {
                                if (output.trim().length > str.length / 2 && !output.includes('<br>')) output += '<br>';
                                output += word + ' ';
                            });
                            text2 = output.trim();
                        } else text2 = str.trim();
                        text2 = item.payoutType === 'Brand Gift Card' ? `(${brandPartners[item.brand].name}-presentkort)<br>` + text2 : text2;
                        text3 = brandCollabGiftCard && item.payoutType !== 'Brand Gift Card' ? `\xc4ndra till ${soldPrice} kr i presentkort?` : '';
                    }
                    // Add a user action, such as 'show QR button', 'show barcode' or 'bag received checkbox'
                    if (shippingMethod === 'Service point') {
                        if (dhlBarcode) {
                            userActionDiv = getBarcodeButton(itemId);
                            shipper = 'dhl';
                        } else if (soldPlatform === 'Vestiaire Collective' || soldPlatform === 'Grailed') {
                            if (!bagReceived) {
                                userActionDiv = getBagReceivedCheckbox(itemId, soldDate, shippingMethod);
                                if (upsShipmentId) shipper = 'ups';
                                // Store event listener data for batch processing
                                window._pendingEventListeners = window._pendingEventListeners || [];
                                window._pendingEventListeners.push({
                                    type: 'bagReceivedCheckbox',
                                    itemId: itemId,
                                    soldDate: soldDate,
                                    shippingMethod: shippingMethod
                                });
                            }
                        } else if (postnordQrCode) {
                            shipper = 'postnord';
                            userActionDiv = getQrCodeButton(itemId);
                        }
                    }
                    if (shippingMethod === 'Pickup') {
                        if (!bagReceived) {
                            userActionDiv = getBagReceivedCheckbox(itemId, soldDate, shippingMethod);
                            // Store event listener data for batch processing
                            window._pendingEventListeners = window._pendingEventListeners || [];
                            window._pendingEventListeners.push({
                                type: 'bagReceivedCheckbox',
                                itemId: itemId,
                                soldDate: soldDate,
                                shippingMethod: shippingMethod
                            });
                        } else if (bagReceived && !pickupDate) {
                            userActionDiv = getBookPickupButton(itemId);
                            // Store event listener data for batch processing
                            window._pendingEventListeners = window._pendingEventListeners || [];
                            window._pendingEventListeners.push({
                                type: 'bookPickupButton',
                                itemId: itemId,
                                soldDate: soldDate
                            });
                        }
                    }
                    // Always show the 'shippingInfoDiv' - Styling depending on state is set in the function
                    shippingInfoDiv = getShippingInfoDiv(itemId, shippingMethod, soldDate, pickupDate, bagReceived, shipper);
                    // Add "change shipping method" when applicable and some spacing
                    if (bagReceived && (shippingMethod === "Service point" || shippingMethod === "Pickup" && pickupDate)) {
                        shippingInfoDiv = '<div class="spacing-15-px"></div>' + shippingInfoDiv;
                        changeShippingMethod += `
          <a id="changeShippingMethodA-${itemId}" href="#">
              <div id="changeShippingMethod-${itemId}" class="change-shipping-method-text">\xc4ndra frakts\xe4tt</div>
          </a>`;
                        // Store event listener data for batch processing
                        window._pendingEventListeners = window._pendingEventListeners || [];
                        window._pendingEventListeners.push({
                            type: 'changeShippingMethod',
                            itemId: itemId,
                            soldDate: soldDate
                        });
                    }
                } else {
                    userActionDiv = getResellButton(itemId);
                    text1 = "K\xf6paren avbr\xf6t k\xf6pet";
                    text2 = 'Skickades ej inom 7 dagar';
                    removeItemButton += `
          <a id="removeItemButton-${itemId}" href="#" class="link-block-87">
              <img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/65269f37a18d8c128d29ed1c_trash-can%20(1).svg" class="image-154">
              <div class="text-block-373">Ta bort plagg</div>
          </a>`;
                    // Store event listener data for batch processing
                    window._pendingEventListeners = window._pendingEventListeners || [];
                    window._pendingEventListeners.push({
                        type: 'removeItemButton',
                        itemId: itemId
                    });
                }
                //Create card
                var soldNotSentCardHTML = ``;
                soldNotSentCardHTML = `<div class="div-block-118"><div class="div-block-45"><div class="div-block-43"><div class="ratio-box _16-9"><div class="content-block with-image"><a id="itemLinkFromSoldNotSentSection" href="${itemPageUrl}"><div class="img-container" style="background-image: url('${frontImageUrl}');"></div></a></div></div></div><div class="div-block-46">
          <a id="youGetLink-${itemId}" href="#" class="you-get-link">
              <div class="text-block-43" id="text1-${itemId}">${text1}</div>
              ${text1 !== "K\xf6paren avbr\xf6t k\xf6pet" ? '<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/63be70f55a4305a398cf918e_info-icon.svg" class="you-get-info-icon"></img>' : ''}
          </a>
          <div class="text-block-44" id="text2-${itemId}">${text2}</div>
          ${text3 ? `<div class="change-to-gift-card-text" id="convertToGiftCardDiv-${itemId}"><a id="convertToGiftCard-${itemId}">${text3}</a></div>` : ''}
          ${userActionDiv}
          ${shippingInfoDiv}
          ${changeShippingMethod}
          ${removeItemButton}
          </div></div></div></div>`;
                // Store event listener data for later batch processing
                window._pendingEventListeners = window._pendingEventListeners || [];
                window._pendingEventListeners.push({
                    type: 'youGetLink',
                    itemId: itemId,
                    soldPrice: soldPrice,
                    sellerGetsValue: sellerGetsValue
                });
                if (text3) window._pendingEventListeners.push({
                    type: 'convertToGiftCard',
                    itemId: itemId,
                    item: item,
                    soldPrice: soldPrice
                });
                soldNotSentHTML += soldNotSentCardHTML;
                // Display list
                soldNotSentDiv.style.display = "block";
                // Hide empty state
                noItemsDiv.style.display = "none";
                headerSellItemButton.style.display = "block";
                sellButtonText.innerHTML = "S\xe4lj ett plagg";
            // SOLD BEFORE
            } else {
                const voucher = item.payoutType === 'Brand Gift Card' ? '<br> (Presentkort)' : '';
                var soldItemCardHTML = `<div class="item-card-small"><div class="ratio-box _16-9"><div class="conten-block with-image"><a id="itemLinkFromSoldBeforeSection" href="${itemPageUrl}"><div class="img-container" style="background-image: url('${frontImageUrl}');"></div></a></div></div><div class="text-block-14">${soldPrice} kr</div><div class='text-block-34'>${item.payoutStatus === "Payed" ? "Du fick" : "Du f\xe5r"} ${sellerGetsValue} kr${voucher}</div></div>`;
                soldHTML += soldItemCardHTML;
                // Display list, hide empty state
                soldItemsDiv.style.display = "block";
                itemListSoldContainer.style.display = "block";
                sellButtonText.innerHTML = "S\xe4lj ett plagg";
                youEarned = youEarned + sellerGetsValue;
                youEarnedDiv.innerHTML = `Du har tj\xe4nat ${Math.round(youEarned).toLocaleString('en-US').replaceAll(',', ' ')} kr`;
            }
        }
    });
    // Batch DOM updates - single operations instead of multiple innerHTML +=
    if (sellingHTML) itemListSelling.innerHTML = sellingHTML;
    if (soldNotSentHTML) itemListSoldNotSent.innerHTML = soldNotSentHTML;
    if (soldHTML) itemListSold.innerHTML = soldHTML;
    // Batch event listener setup
    if (window._pendingEventListeners) {
        window._pendingEventListeners.forEach((listener)=>{
            if (listener.type === 'youGetLink') {
                const element = document.getElementById(`youGetLink-${listener.itemId}`);
                if (element) element.addEventListener('click', ()=>{
                    openYouGetInfoBox(listener.soldPrice, listener.sellerGetsValue);
                });
            } else if (listener.type === 'convertToGiftCard') {
                const element = document.getElementById(`convertToGiftCard-${listener.itemId}`);
                if (element) element.addEventListener('click', ()=>{
                    const itemImage = listener.item?.images?.modelImage || listener.item?.images?.enhancedFrontImageSmall || listener.item?.images?.enhancedFrontImage || listener.item?.images?.frontImageSmall || listener.item?.images?.frontImage;
                    openConvertToGiftCard(listener.itemId, itemImage, listener.soldPrice, listener.item.brand);
                });
            } else if (listener.type === 'bagReceivedCheckbox') {
                const element = document.getElementById(`bagReceivedCheckbox-${listener.itemId}`);
                if (element) element.addEventListener('click', (event)=>{
                    bagReceivedAction(event.target, listener.itemId, listener.soldDate, listener.shippingMethod);
                });
            } else if (listener.type === 'bookPickupButton') {
                const element = document.getElementById(`bookPickUpButton-${listener.itemId}`);
                if (element) element.addEventListener('click', ()=>{
                    openPickupToast(listener.itemId, listener.soldDate);
                });
            } else if (listener.type === 'changeShippingMethod') {
                const element = document.getElementById(`changeShippingMethodA-${listener.itemId}`);
                if (element) element.addEventListener('click', ()=>{
                    openShippingToast(listener.itemId, listener.soldDate);
                });
            } else if (listener.type === 'removeItemButton') {
                const element = document.getElementById(`removeItemButton-${listener.itemId}`);
                if (element) element.addEventListener('click', (e)=>{
                    itemMoreMenu.style.display = 'block';
                    setTimeout(()=>itemMoreMenu.classList.add('sticky-bottom-show'), 0);
                    itemMoreMenu.dataset.itemId = listener.itemId;
                    itemMoreMenu.dataset.section = 'sold-not-sent';
                    e.preventDefault();
                    e.stopPropagation();
                });
            }
        });
        // Clear the pending listeners
        window._pendingEventListeners = [];
    }
    loadingDiv.style.display = "none";
    sectionsDiv.style.display = "block";
    analytics.track("Element Viewed", {
        elementID: "sectionsDiv"
    });
    quickInfoDiv.style.display = "block";
}

},{"./general":"lWrRo","./private":"2orDs","./sellItemHelpers":"8xEoj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lWrRo":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "signOut", ()=>signOut);
parcelHelpers.export(exports, "setFormAddressFields", ()=>setFormAddressFields);
parcelHelpers.export(exports, "getFormAddressFields", ()=>getFormAddressFields);
// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
parcelHelpers.export(exports, "isValidSwedishSsn", ()=>isValidSwedishSsn);
parcelHelpers.export(exports, "formatPersonalId", ()=>formatPersonalId);
parcelHelpers.export(exports, "itemCoverImage", ()=>itemCoverImage);
parcelHelpers.export(exports, "shareCode", ()=>shareCode);
// Channel bottom sheet
parcelHelpers.export(exports, "channelRouter", ()=>channelRouter);
parcelHelpers.export(exports, "hideChannelBottomSheet", ()=>hideChannelBottomSheet);
// End of channel bottom sheet
// Toast animation functions
parcelHelpers.export(exports, "animateOpenToast", ()=>animateOpenToast);
parcelHelpers.export(exports, "animateCloseToast", ()=>animateCloseToast);
parcelHelpers.export(exports, "hideInfoRequestCard", ()=>hideInfoRequestCard);
function signOut() {
    firebase.auth().signOut().then(()=>{
        console.log('User signed out');
        authUser.current = null;
        user.current = null;
        userId = null;
        localStorage.removeItem('sessionUser');
        localStorage.removeItem('idToken');
        localStorage.removeItem('authUserId');
        localStorage.removeItem('authUser');
        deleteCookie('maiAuth');
        location.href = '/';
    }).catch((error)=>{
        errorHandler.report(error);
        console.log(error);
    });
}
function setFormAddressFields(user1) {
    document.getElementById("addressFirstName").value = user1.addressFirstName || '';
    document.getElementById("addressFirstName").dispatchEvent(new Event('input'));
    document.getElementById("addressLastName").value = user1.addressLastName || '';
    document.getElementById("addressLastName").dispatchEvent(new Event('input'));
    document.getElementById("addressStreetAddress").value = user1.addressStreetAddress || '';
    document.getElementById("addressStreetAddress").dispatchEvent(new Event('input'));
    document.getElementById("addressCO").value = user1.addressCO || '';
    document.getElementById("addressCO").dispatchEvent(new Event('input'));
    document.getElementById("addressPostalCode").value = user1.addressPostalCode || '';
    document.getElementById("addressPostalCode").dispatchEvent(new Event('input'));
    document.getElementById("addressCity").value = user1.addressCity || '';
    document.getElementById("addressCity").dispatchEvent(new Event('input'));
    document.getElementById("addressDoorCode").value = user1.addressDoorCode || '';
    document.getElementById("addressDoorCode").dispatchEvent(new Event('input'));
}
function getFormAddressFields() {
    let addressFirstName = document.getElementById("addressFirstName").value;
    let addressLastName = document.getElementById("addressLastName").value;
    let addressStreetAddress = document.getElementById("addressStreetAddress").value;
    let addressCO = document.getElementById("addressCO").value;
    let addressPostalCode = document.getElementById("addressPostalCode").value;
    let addressCity = document.getElementById("addressCity").value;
    let addressDoorCode = document.getElementById("addressDoorCode").value;
    addressFirstName = addressFirstName ? addressFirstName.trim().charAt(0).toUpperCase() + addressFirstName.trim().slice(1) : "";
    addressLastName = addressLastName ? addressLastName.trim().charAt(0).toUpperCase() + addressLastName.trim().slice(1) : "";
    addressStreetAddress = addressStreetAddress ? addressStreetAddress.trim().charAt(0).toUpperCase() + addressStreetAddress.trim().slice(1) : "";
    addressCO = addressCO ? addressCO.trim() : "";
    addressPostalCode = addressPostalCode ? addressPostalCode.trim().replace(/\D/g, '') : "";
    addressCity = addressCity ? addressCity.trim().charAt(0).toUpperCase() + addressCity.trim().slice(1) : "";
    addressDoorCode = addressDoorCode ? addressDoorCode.trim() : "";
    return {
        addressFirstName,
        addressLastName,
        addressStreetAddress,
        addressCO,
        addressPostalCode,
        addressCity,
        addressDoorCode
    };
}
function isValidSwedishSsn(ssn) {
    ssn = ssn.replace(/\D/g, "") // strip out all but digits
    .split("") // convert string to array
    .reverse() // reverse order for Luhn
    .slice(0, 10); // keep only 10 digits (i.e. 1977 becomes 77)
    // verify we got 10 digits, otherwise it is invalid
    if (ssn.length !== 10) return false;
    const sum = ssn.map((n)=>Number(n)).reduce((previous, current, index)=>{
        if (index % 2) current *= 2;
        if (current > 9) current -= 9;
        return previous + current;
    });
    return 0 === sum % 10;
}
function formatPersonalId(personalIdInput) {
    let personalId = personalIdInput.replace('-', '');
    if (personalId.length !== 12 && (personalId.substring(0, 2) !== '19' || personalId.substring(0, 2) !== '20')) {
        if (Number(personalId.substring(0, 2)) <= 99 && Number(personalId.substring(0, 2)) > 25) personalId = "19" + personalId;
        else personalId = "20" + personalId;
    }
    if (personalId.length === 12) return personalId;
    return null;
}
function itemCoverImage(item) {
    if (item.images) {
        const images = item.images;
        return images.modelImageSmall || images.modelImage || images.coverImageSmall || images.coverImage || images.enhancedFrontImageSmall || images.enhancedFrontImage || images.frontImageSmall || images.frontImage;
    } else if (item.imagesv2) {
        const priorityOrder = [
            'modelImage',
            'enhancedFrontImage',
            'frontImage'
        ];
        for (const name of priorityOrder){
            const image = item.imagesv2.find((img)=>img.name === name);
            if (image) {
                if (image?.versions?.small) return image.versions.small;
                if (image?.versions?.medium) return image.versions.medium;
                if (image?.versions?.large) return image.versions.large;
                if (image.url) return image.url;
            }
        }
    }
    return null;
}
function shareCode() {
    const code = user.current.referralData.referralCode;
    //const text = `Hej, jag vill tipsa om Mai för att rensa ur garderoben. Mai är en tjänst som hjälper dig att sälja dina kläder på ett enkelt sätt. Man tar bara bilder på sina plagg, sedan sköter Mai resten - såsom värdering, annonsering på flera plattformar, kontakt med köpare och frakt när det blir sålt. Man får själv behålla 80% av vinsten, och blir det inte sålt kostar det ingenting.\n\nOm du registrerar dig med min kod (följ länken) och provar sälja ett plagg inom 7 dagar får du behålla 100% av vinsten för det första plagget (istället för 80%). Min kod: ${code}\n\nLäs mer och använd min kod här:`;
    const text = `Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${code}`;
    if (navigator.share) navigator.share({
        text: text,
        url: `https://invite.maiapp.se/refer?invite=${code}`
    }).then(()=>{
        console.log('Thanks for sharing!');
    }).catch((e)=>{
        console.error(e);
        errorHandler.report(e);
    });
    else {
        console.log("Browser doesn't support navigator.share => Copy to clipboard!");
        const shareText = text + "\n" + `https://invite.maiapp.se/refer?invite=${code}`;
        navigator.clipboard.writeText(shareText);
        linkCopiedBanner.style.display = 'flex';
        setTimeout(function() {
            linkCopiedBanner.style.display = 'none';
        }, 1500);
    }
}
function channelRouter(webpath) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) showChannelBottomSheet(webpath);
    else window.location.href = webpath;
}
function showChannelBottomSheet(webpath) {
    document.getElementById('continueOnWebBottomSheet').href = window.location.origin + webpath;
    document.getElementById('darkOverlay').classList.add('active');
    document.getElementById('channelBottomSheet').classList.add('active');
}
function hideChannelBottomSheet() {
    document.getElementById('darkOverlay').classList.remove('active');
    document.getElementById('channelBottomSheet').classList.remove('active');
}
function animateOpenToast(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        // Set initial position below screen
        element.style.transform = 'translateY(100%)';
        element.style.transition = 'transform 0.3s ease-out';
        element.style.display = 'block';
        // Animate to visible position
        setTimeout(()=>{
            element.style.transform = 'translateY(0%)';
        }, 10);
        document.getElementById("darkOverlay").classList.add("active");
    }
}
function animateCloseToast(elementId) {
    const element = document.getElementById(elementId);
    // Add the visibility check here
    if (!element || element.style.display === 'none') return;
    // Animate down and hide
    element.style.transform = 'translateY(100%)';
    element.style.transition = 'transform 0.3s ease-in';
    // Hide after animation completes
    setTimeout(()=>{
        element.style.display = 'none';
    }, 300);
    document.getElementById("darkOverlay").classList.remove("active");
}
function hideInfoRequestCard(elementId) {
    const bidRequestElement = document.getElementById(elementId);
    if (bidRequestElement) {
        bidRequestElement.style.display = 'none';
        // Check if there are any remaining visible cards
        const infoRequestsList = document.getElementById('infoRequestsList');
        if (infoRequestsList) {
            const visibleCards = infoRequestsList.querySelectorAll('[id^="infoRequest"]:not([style*="display: none"])');
            if (visibleCards.length === 0) {
                const infoRequestsDiv = document.getElementById('infoRequestsDiv');
                if (infoRequestsDiv) infoRequestsDiv.style.display = 'none';
            }
        }
    }
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

},{}],"2orDs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateIC", ()=>updateIC);
parcelHelpers.export(exports, "closePickupToast", ()=>closePickupToast);
var _general = require("./general");
var _infoRequestsFunctions = require("./infoRequestsFunctions");
var _loadItemCards = require("./loadItemCards");
var userId;
var email;
var phone;
async function initAppDownloadBanner() {
    const customToken = await callBackendApi('/api/users/token', {
        method: 'POST',
        requiresAuth: true
    });
    document.getElementById('openAppAndSignIn').href = 'maiapp://?aat=' + encodeURIComponent(customToken.data.customToken);
}
initAppDownloadBanner();
setInterval(initAppDownloadBanner, 600000);
function updateIC(userId, em, ph) {
    let email = em;
    let phone = ph;
    if (email === null) email = "";
    if (phone === null) phone = "";
    window.intercomSettings = {
        app_id: "klyy0le5",
        user_id: `${userId}`
    };
    var docRef = db.collection("users").doc(userId);
    docRef.get().then((doc)=>{
        if (doc.exists) {
            const data = doc.data();
            let name = "";
            let city = "";
            if (data.addressFirstName) {
                const fn = data.addressFirstName;
                const ln = data.addressLastName;
                name = fn + " " + ln;
                city = data.addressCity;
            }
            if (data.phoneNumber) phone = data.phoneNumber;
            // Update intercom
            var fields = {
                mai_user_id: `${userId}`,
                user_id: `${userId}`,
                phone: `${phone}`,
                email: `${email}`,
                name: `${name}`,
                city: `${city}`
            };
            Intercom('update', fields);
        } else console.log("No such user document exist!");
    }).catch((error)=>{
        errorHandler.report(error);
        console.log("Error getting document:", error);
    });
}
function prepareMenu(u) {
    let identifier;
    let signInMethodText;
    console.log("Prepare menu", u.signInMethod);
    if (u.signInMethod === 'phone' && u.phoneNumber) {
        identifier = u.phoneNumber;
        signInMethodText = 'Inloggad med SMS-kod';
    } else if (u.signInMethod === 'password' && u.email) {
        identifier = u.email;
        signInMethodText = 'Inloggad med email';
    } else if (u.signInMethod === 'google.com' && u.email) {
        identifier = u.email;
        signInMethodText = 'Inloggad med Google';
    }
    if (identifier) {
        account.innerHTML = identifier;
        account.style.display = 'block';
        accountSignInMethod.innerHTML = signInMethodText;
        accountSignInMethod.style.display = 'block';
    }
    if (u.addressFirstName && u.addressLastName) {
        accountName.innerHTML = u.addressFirstName + ' ' + u.addressLastName;
        accountName.style.display = 'block';
    }
    if (u?.referralData?.referralCode) {
        referralCodeText.innerHTML = u.referralData.referralCode;
        headerInviteButton.style.display = 'flex';
        menuInviteLink.style.display = 'block';
    }
}
const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
if (sessionUser) {
    const referralCode = sessionUser?.referralData?.referralCode;
    prepareMenu(sessionUser);
}
async function showOrderBagsSection() {
    try {
        const maxBags = await callBackendApi('/api/bags/orders/allowed', {
            requiresAuth: true
        });
        if (maxBags?.data?.maxOrderBags > 0) document.getElementById('orderBagsSection').style.display = 'block';
    } catch (e) {
        console.log(e);
    }
}
function showInviteToast(items) {
    let nowDate = new Date();
    let daysSinceLatestSold = 10;
    let soldItemsCount = 0;
    let atLeastOneShippedItem = false;
    // Last viewed
    let inviteToastViews = user.current?.elementViews ? user.current.elementViews.filter((e)=>e.elementID === 'inviteToast') : [];
    const daysSinceToastViewsArray = inviteToastViews.length ? Array.from(inviteToastViews, (e)=>parseInt(Math.floor((nowDate.getTime() - e.timestamp.seconds * 1000) / 86400000))) : [];
    const daysSinceToastLastViewed = daysSinceToastViewsArray.length ? Math.min(...daysSinceToastViewsArray) : null;
    let viewedToastBefore = !!inviteToastViews.length;
    if (items) items.forEach((item)=>{
        let soldDate = item.soldDate;
        const status = item.status;
        const shippingStatus = item.shippingStatus;
        const archived = item.archived;
        if (!archived && status === 'Sold' && soldDate) {
            soldItemsCount++;
            if (soldDate) {
                soldDate = new Date(soldDate);
                let timeDifference = nowDate.getTime() - soldDate.getTime();
                let daysDiff = Math.floor(timeDifference / 86400000);
                if (daysDiff <= daysSinceLatestSold) daysSinceLatestSold = daysDiff;
            }
            if (shippingStatus === 'Sent') atLeastOneShippedItem = true;
        }
    });
    if (!user.current?.referralData?.referralCode) return;
    if (atLeastOneShippedItem && (!viewedToastBefore || daysSinceToastLastViewed > 45) && (daysSinceLatestSold <= 14 || soldItemsCount >= 3 && daysSinceLatestSold <= 45)) {
        referralCodeText.innerHTML = user.current.referralData.referralCode;
        triggerInviteToastOpen.click();
        // Store elementViews to be able to not show it again
        db.collection('users').doc(authUser.current.uid).update({
            elementViews: firebase.firestore.FieldValue.arrayUnion({
                elementID: "inviteToast",
                timestamp: new Date()
            })
        });
        // Track with segment
        analytics.track("Element Viewed", {
            elementID: "inviteToast"
        });
    }
}
function loadSoldByOthers(userID) {
    var itemListSoldByOthers = document.getElementById('itemListSoldByOthers');
    itemListSoldByOthers.innerHTML = "";
    // SOLD BY OTHERS QUERY + Add cards to list
    db.collection("items").where("status", "==", "Sold").orderBy('soldDate', 'desc').limit(30).get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            var sellerId = doc.data().user;
            var brand = doc.data().brand;
            var soldPrice = doc.data().soldPrice;
            var imageUrl = (0, _general.itemCoverImage)(doc.data());
            // Add card to list if seller is other than myself
            if (sellerId != userID && soldPrice >= 200) {
                var soldByOthersItemCardHTML = `<div class="div-block-14"><div class="ratio-box _16-9"><div class="conten-block with-image"><div class="img-container" style="background-image: url('${imageUrl}');"></div></div></div><div class="text-block-14">${soldPrice} kr</div><div class='text-block-34'>${brand}</div></div>`;
                itemListSoldByOthers.innerHTML += soldByOthersItemCardHTML;
            }
        });
    });
    soldByOthersDiv.style.display = "block";
}
async function askForAdditionalUserDetails(userID) {
    let status = "";
    let shippingStatus = "";
    let addressFirstName = "";
    let personalId;
    let personalIdExists = true;
    let oneItemNotPaid = false;
    let oneItemNotPaidAndApproved = false;
    let oneItemNotSent = false;
    let pickupShippingMethod = false;
    // First, get items with status "Sold" and shippingStatus "Not sent"
    await db.collection("items").where("user", "==", userID).where("status", "==", "Sold").orderBy("soldDate").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            status = doc.data().status;
            shippingStatus = doc.data().shippingStatus;
            const payoutStatus = doc.data().payoutStatus;
            const saleApprovalStatus = doc.data().saleApprovalStatus;
            if (shippingStatus === "Not sent") oneItemNotSent = true;
            if (payoutStatus !== "Payed") {
                oneItemNotPaid = true;
                if (saleApprovalStatus === 'Approved') oneItemNotPaidAndApproved = true;
            }
        });
    });
    // Second, check if user has no address or personal id added yet
    await db.collection("users").doc(userID).get().then((doc)=>{
        addressFirstName = doc.data().addressFirstName;
        personalId = doc.data().personalId;
        const shippingMethod = doc.data()?.preferences?.shippingMethod;
        if (personalId) {
            if (personalId === "") personalIdExists = false;
        } else personalIdExists = false;
        if (shippingMethod == 'Pickup') pickupShippingMethod = true;
    });
    // Redirect user if user has no address and at least one item that's sold but not shipped (only if shippingMethod is pickup)
    if (oneItemNotSent == true && addressFirstName == undefined && pickupShippingMethod) location.href = "/address-form";
    // Redirect user to personalId form if they haven't added it yet
    const userIsTrustedSeller = user.current?.trustedSellerStatus === 'Trusted';
    const userIsNotTrustedSeller = user.current?.trustedSellerStatus === 'Not Trusted';
    if (oneItemNotPaid && !personalIdExists && (userIsTrustedSeller || oneItemNotPaidAndApproved)) location.href = "/personal-id-form";
}
checkCookie("invite");
localStorage.removeItem('latestItemCreated');
sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
console.log(`user ${user.current}`);
user.whenSet(privateMain);
async function privateMain() {
    console.log('privateMain running');
    if (!user.current) return;
    userId = authUser.current.uid;
    email = authUser.current.email || sessionStorage.getItem("email");
    phone = authUser.current.phoneNumber || sessionStorage.getItem("phoneNumber");
    updateIC(userId, email, phone);
    askForAdditionalUserDetails(userId);
    if (user.current?.trustedSellerStatus === 'Trusted') document.getElementById('trustedIconHeader').style.display = 'block';
    else {
        document.getElementById('fullLogo').style.display = 'block';
        document.getElementById('onlyLogo').style.display = 'none';
    }
    loadSoldByOthers(userId);
    setPreferredLogInMethodCookie(authUser.current.providerData[0].providerId);
    //Yearly Summary
    /*
  yearlyDataExist(userId).then((result) => {
    if (result) {
      console.log('Yearly data exist!');
      document.getElementById('yearlySummaryDiv').style.display = 'block';
      document.getElementById('yearlySummaryDiv').addEventListener("click", function () {
        location.href = `/yearly-summary?id=${userId.substring(0, 10)}&year=2024`;
      });
    } else {
      console.log('No yearly summary exist!');
    }
  });
  */ const items = (await callBackendApi('/api/items', {
        requiresAuth: true
    }))?.data;
    showInviteToast(items);
    const inviteCode = checkCookie("invite");
    if (inviteCode) await connectReferralUsers(inviteCode);
    // Set invite code cookie
    const photoInvite = checkCookie("photo_invite");
    if (photoInvite && !localStorage.getItem('photoShootBooked')) {
        photoShootOffer.style.display = 'block';
        bonusSection.style.display = 'block';
    }
    setupBottomMenuPopupListeners();
    await Promise.all([
        showInYourWardrobeSection(),
        showOrderBagsSection(),
        showInactiveItemsSection()
    ]);
    (0, _loadItemCards.loadItemCards)(items, user.current);
    showTrustedSellerWidget(items);
    console.log('user.current', user.current);
    if (window.location.href.endsWith('#wardrobe')) setTimeout(()=>{
        document.getElementById('wardrobeItemsDiv').scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 600);
    showNpsSurvey(items);
    fetchAndShowRecommendedItems(items);
    showReferralSection();
    showBonusSection();
    showCommissionFreeBonus(items);
    prepareMenu(user.current);
    (0, _infoRequestsFunctions.loadInfoRequests)(items);
    showFreeSellBox(items);
    if (user.current?.trustedSellerStatus !== 'Pending' && user.current?.trustedSellerStatusChange && !user.current.trustedSellerStatusChange.seen) showTrustedSellerBottomSheet();
    //showAppPromoSection();
    showDownloadAppInMenu();
    //showHolidayModeDiv(items);
    // Create refCode
    if (user.current && user.current.addressFirstName && user.current.addressLastName && !user.current?.referralData?.referralCode) await createReferralCode();
}
function showCommissionFreeBonus(items) {
    const cookieName = 'noCommissionCampaignCookie';
    const cookie = getCookie(cookieName);
    const dateNow = new Intl.DateTimeFormat('se-SV').format(new Date());
    const campaignDateOk = dateNow >= '2024-08-12' && dateNow <= '2024-08-18';
    const itemsCount = items.filter((i)=>i?.status !== 'Draft').length;
    if (cookie === 'noCommission' && campaignDateOk && itemsCount < 1 && (bonusActivatedState.style.display === 'none' || bonusActivatedState.style.display === '')) {
        if (document.getElementById("bonusSection")) {
            document.getElementById("bonusName").innerHTML = "KAMPANJ - T.o.m s\xf6n 18/8";
            document.getElementById("bonusTitle").innerHTML = "S\xe4lj f\xf6rsta gratis";
            document.getElementById("bonusText").innerHTML = "L\xe4gg upp ett plagg senast s\xf6ndag 18 augusti s\xe5 f\xe5r du beh\xe5lla 100% av vinsten f\xf6r ditt f\xf6rsta s\xe5lda plagg (ist\xe4llet f\xf6r 80%).";
            document.getElementById("bonusActivatedState").style.display = 'block';
            document.getElementById("enterCodeState").style.display = 'none';
            bonusSection.style.display = 'block';
        }
    }
}
function showHolidayModeDiv(items) {
    if (items) items.forEach((item)=>{
        const status = item.status;
        const archived = item.archived;
        if (!archived && status === 'Published' && item.publishedDate) {
            const date = new Date(item.publishedDate);
            const nowDate = new Date();
            const daysDiff = Math.floor((nowDate.getTime() - date.getTime()) / 86400000);
            if (daysDiff <= 45) {
                document.getElementById('holidayModeDiv').style.display = 'block';
                document.getElementById('openHolidayChat').onclick = ()=>Intercom('showNewMessage', "N\xe4r reser du iv\xe4g, och n\xe4r \xe4r du tillbaka?\n\n");
            }
        }
    });
}
function inSeason(category) {
    if (!category) return true;
    const alwaysInSeason = [
        "Tr\xf6ja",
        "Blus",
        "Topp",
        "Skjorta",
        "Linneskjorta",
        "T-shirt",
        "Kavaj",
        "Sweatshirt",
        "Hoodie",
        "Polotr\xf6ja",
        "Tunika",
        "V\xe4st",
        "Kofta",
        "Linne",
        "Tr\xe4ningstr\xf6ja",
        "Poncho",
        "Pik\xe9",
        "L\xe5ng\xe4rmad T-shirt",
        "Kostymv\xe4st",
        "Kjol",
        "Byxor",
        "Jeans",
        "Chinos",
        "Fritidsbyxor",
        "Tr\xe4ningsbyxor",
        "Tights",
        "Strumpbyxor",
        "Mjukisbyxor",
        "Kostymbyxor",
        "Sarong",
        "Kl\xe4nning",
        "Kaftan",
        "Kostym",
        "Set",
        "Jumpsuit",
        "Baddr\xe4kt",
        "Bikini",
        "Pyjamas",
        "Morgonrock",
        "Br\xf6llopskl\xe4nning",
        "Balkl\xe4nning",
        "Bodysuit",
        "Jacka",
        "Kappa",
        "Rock",
        "Fritidsjacka",
        "Trenchcoat",
        "Skinnjacka",
        "Regnjacka",
        "Sneakers",
        "Klackar",
        "Ballerinaskor",
        "Loafers",
        "Boots",
        "K\xe4ngor",
        "Skor",
        "Axelremsv\xe4ska",
        "Handv\xe4ska",
        "Kuvertv\xe4ska",
        "Ryggs\xe4ck",
        "Tr\xe4ningsv\xe4ska",
        "Resv\xe4ska",
        "Datorv\xe4ska",
        "V\xe4ska",
        "Solglas\xf6gon",
        "Glas\xf6gon",
        "\xd6rh\xe4nge",
        "Halsband",
        "Armband",
        "Ring",
        "Brosch",
        "Keps",
        "Sjal",
        "Krage",
        "B\xe4lte",
        "Pl\xe5nbok",
        "Hatt",
        "Necess\xe4r",
        "Slips",
        "Handduk",
        "Klocka"
    ];
    const winterCategories = [
        "Underst\xe4ll",
        "Dunjacka",
        "P\xe4lsjacka",
        "Vinterskor",
        "Halsduk",
        "M\xf6ssa",
        "Vantar"
    ];
    const summerCategories = [
        "Shorts",
        "Sandaler",
        "Flip-flops"
    ];
    if (alwaysInSeason.includes(category)) return true;
    const today = new Date();
    const winterStart = new Date(today.getFullYear(), 7, 15);
    const winterEnd = new Date(today.getFullYear(), 3, 15);
    if (winterCategories.includes(category) && (today <= winterEnd || today >= winterStart)) return true;
    return summerCategories.includes(category) && today >= winterEnd && today <= winterStart;
}
async function showInactiveItemsSection() {
    const unsoldItems = await callBackendApi('/api/items/unsold', {
        requiresAuth: true
    });
    if (!unsoldItems.data?.length) return;
    unsoldItems.data.sort((a, b)=>{
        const aInSeason = inSeason(a.category);
        const bInSeason = inSeason(b.category);
        if (aInSeason && !bInSeason) return -1;
        if (bInSeason && !aInSeason) return 1;
        if (a.minPriceEstimate >= 100 && b.minPriceEstimate <= 100) return -1;
        if (a.minPriceEstimate <= 100 && b.minPriceEstimate >= 100) return 1;
        return 0;
    });
    const inactiveItemsDiv = document.querySelector('#inactiveItemsDiv');
    inactiveItemsDiv.style.display = 'block';
    const itemCard = inactiveItemsDiv.querySelector('#inactiveItemCard');
    const itemList = inactiveItemsDiv.querySelector('#inactiveItemList');
    itemList.innerHTML = '';
    const itemMoreMenu1 = document.querySelector('#itemMoreMenu');
    for (const item of unsoldItems.data){
        const newItemCard = itemCard.cloneNode(true);
        newItemCard.id = item.id;
        const frontImage = item.images?.modelImageLarge || item.images?.modelImage || item.images?.enhancedFrontImageLarge || item.images?.enhancedFrontImage || item.images?.frontImageLarge || item.images?.frontImage;
        newItemCard.querySelector('.img-container').style.backgroundImage = `url("${frontImage}")`;
        newItemCard.querySelector('.inactive-card-brand').innerText = `${item.cleanedBrand || item.brand?.trim()}`;
        newItemCard.querySelector('.inactive-card-category').innerText = `${item.category || ''}`;
        newItemCard.querySelector('.inactive-card-reason').innerText = 'Avslutad';
        if (inSeason(item.category)) {
            newItemCard.querySelector('.in-season-label').style.display = 'block';
            if (item.minPriceEstimate > 100) {
                newItemCard.querySelector('.restart-button').href = `/sell-item?id=${item.id}&type=${item.status === 'Draft' ? 'draft' : 'resell'}`;
                newItemCard.querySelector('.restart-button').style.display = 'inline-block';
            }
        }
        newItemCard.querySelector('.inactive-dots-button').style.display = 'block';
        newItemCard.querySelector('.inactive-dots-button').addEventListener('click', async (e)=>{
            itemMoreMenu1.style.display = 'block';
            setTimeout(()=>itemMoreMenu1.classList.add('sticky-bottom-show'), 0);
            itemMoreMenu1.dataset.itemId = item.id;
            itemMoreMenu1.dataset.section = 'inactive';
            e.preventDefault();
            e.stopPropagation();
        });
        itemList.appendChild(newItemCard);
    }
    //Tracking
    itemList.querySelectorAll("a").forEach((link)=>link.addEventListener('click', linkClickTracker));
}
async function showInYourWardrobeSection() {
    const wardrobeItems = await callBackendApi('/api/items/wardrobe', {
        requiresAuth: true
    });
    if (!wardrobeItems.data?.length) return;
    document.getElementById('wardrobeItemsDiv').style.display = 'block';
    const itemCard = document.getElementById('wardrobeItemCard');
    const itemList = document.getElementById('wardrobeItemList');
    itemList.innerHTML = '';
    const itemMoreMenu1 = document.getElementById('itemMoreMenu');
    for (const item of wardrobeItems.data){
        const newItemCard = itemCard.cloneNode(true);
        newItemCard.id = item.id;
        const frontImage = item.images?.modelImageLarge || item.images?.modelImage || item.images?.enhancedFrontImageLarge || item.images?.enhancedFrontImage || item.images?.frontImageLarge || item.images?.frontImage;
        if (frontImage) {
            newItemCard.querySelector('.img-container').style.backgroundImage = `url("${frontImage}")`;
            newItemCard.querySelector('.no-image-text').style.display = 'none';
        } else newItemCard.querySelector('.img-container').style.display = 'none';
        newItemCard.addEventListener('click', ()=>{
            location.href = `/sell-item?id=${item.id}&type=${item.status === 'Draft' ? 'draft' : 'resell'}`;
        });
        newItemCard.querySelector('.resell-button').href = `/sell-item?id=${item.id}&type=${item.status === 'Draft' ? 'draft' : 'resell'}`;
        newItemCard.querySelector('.resell-item-title').innerText = `${item.cleanedBrand || item.brand?.trim()}`;
        newItemCard.querySelector('.resell-subtext').innerText = `${[
            item.category,
            item.maiSize
        ].filter((i)=>i).join(', ')}`;
        const draftSource = item.soldPlatform || item.draftSource === 'Mai purchase' ? `K\xf6pt via Mai` : item.draftSource === 'Digital receipt' ? "Fr\xe5n digitalt kvitto" : item.draftSource === 'lwl' ? "Fr\xe5n LWL" : '';
        newItemCard.querySelector('.resell-sub-subtext').innerText = draftSource;
        const buttonId = item.soldPlatform || item.draftSource === 'Mai purchase' ? 'resellPurchaseButton' : item.draftSource === 'Digital receipt' ? 'resellDigitalReceiptButton' : item.draftSource === 'lwl' ? 'resellLwlButton' : '';
        newItemCard.querySelector('.resell-button').id = buttonId;
        newItemCard.querySelector('#wardrobeDotsButton').addEventListener('click', async (e)=>{
            itemMoreMenu1.style.display = 'block';
            setTimeout(()=>itemMoreMenu1.classList.add('sticky-bottom-show'), 0);
            itemMoreMenu1.dataset.itemId = item.id;
            itemMoreMenu1.dataset.section = 'wardrobe';
            e.preventDefault();
            e.stopPropagation();
        });
        itemList.appendChild(newItemCard);
    }
    //Tracking
    itemList.querySelectorAll("a").forEach((link)=>link.addEventListener('click', linkClickTracker));
}
function setupBottomMenuPopupListeners() {
    document.getElementById('stickyBottomClose').addEventListener('click', ()=>{
        itemMoreMenu.classList.remove('sticky-bottom-show');
        setTimeout(()=>itemMoreMenu.style.display = 'none', 500);
    });
    document.getElementById('stickyBottomDelete').addEventListener('click', async ()=>{
        itemMoreMenu.classList.remove('sticky-bottom-show');
        setTimeout(()=>itemMoreMenu.style.display = 'none', 500);
        if (itemMoreMenu.dataset.section === 'inactive') {
            document.getElementById(itemMoreMenu.dataset.itemId).style.display = 'none';
            const itemList = document.getElementById('inactiveItemList');
            const visibleChildren = Array.from(itemList.children).find((it)=>it.style.display !== 'none');
            if (!visibleChildren) document.getElementById('inactiveItemsDiv').style.display = 'none';
            await callBackendApi(`/api/items/unsold/${itemMoreMenu.dataset.itemId}`, {
                method: 'DELETE',
                data: {
                    itemId: itemMoreMenu.dataset.itemId
                }
            });
        }
        if (itemMoreMenu.dataset.section === 'sold-not-sent') {
            await callBackendApi(`/api/items/unsold/${itemMoreMenu.dataset.itemId}`, {
                method: 'DELETE',
                data: {
                    itemId: itemMoreMenu.dataset.itemId
                }
            });
            // hide the element from the list
            const removeButton = document.getElementById(`removeItemButton-${itemMoreMenu.dataset.itemId}`);
            let parent = removeButton.parentElement;
            while(parent && !parent.classList.contains('div-block-45'))parent = parent.parentElement;
            if (parent) parent.style.display = 'none';
            // Also hide the full 'Sold - to be sent' list if this was the only item in it
            const soldNotSentItems = document.querySelectorAll('#itemListSoldNotSent .div-block-45');
            const visibleChildren = Array.from(soldNotSentItems).filter((child)=>child.style.display !== 'none');
            if (visibleChildren.length === 0) document.getElementById('soldNotSentDiv').style.display = 'none';
        } else {
            document.getElementById(itemMoreMenu.dataset.itemId).style.display = 'none';
            const itemList = document.getElementById('wardrobeItemList');
            const visibleChildren = Array.from(itemList.children).find((it)=>it.style.display !== 'none');
            if (!visibleChildren) document.getElementById('wardrobeItemsDiv').style.display = 'none';
            await callBackendApi(`/api/items/wardrobe/${itemMoreMenu.dataset.itemId}`, {
                method: 'DELETE',
                data: {
                    itemId: itemMoreMenu.dataset.itemId
                }
            });
        }
    });
}
async function yearlyDataExist(userId) {
    //Get data
    const url = 'https://europe-west3-second-hand-helper.cloudfunctions.net/yearlyData';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userId,
            year: '2024'
        })
    };
    const yearlyDataResponse = await fetch(url, options);
    if (!yearlyDataResponse.ok) throw new Error('Network response was not ok.');
    const yearlyDataJson = await yearlyDataResponse.json();
    const yearlyData = yearlyDataJson.data;
    return yearlyData.sold ? true : false;
}
async function showFreeSellBox(items) {
    const noItems = items.length === 0;
    const noSoldItems = !items.some((item)=>item.status === "Sold");
    const doc = await db.collection("users").doc(authUser.current.uid).get();
    const hasActiveCoupon = doc.data()?.oneTimeCommissionFreeCoupon === "Active";
    if (hasActiveCoupon) {
        if (!noItems && noSoldItems) {
            document.getElementById('freeSellBoxTitle').innerHTML = "N\xe4sta f\xf6rs\xe4ljning \xe4r fri";
            document.getElementById('freeSellBoxText').innerHTML = "Du har f\xe5tt en fri f\xf6rs\xe4ljning av Mai";
        }
        document.getElementById('freeSellBox').style.display = 'block';
    }
}
async function closeAppPromoSection() {
    document.getElementById('appPromoSection').style.display = 'none';
    if (authUser.current) db.collection('users').doc(authUser.current.uid).update({
        elementViews: firebase.firestore.FieldValue.arrayUnion({
            elementID: "appPromoSection",
            timestamp: new Date()
        })
    });
}
async function showAppPromoSection() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (!isIOS) return;
    const hasViewedElement = user.current?.elementViews?.some((view)=>view.elementID === "appPromoSection");
    if (!hasViewedElement) document.getElementById('appPromoSection').style.display = 'block';
}
async function showDownloadAppInMenu() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (!isIOS) return;
    document.getElementById('menuDownloadApp').style.display = 'block';
}
async function showNpsSurvey(items) {
    if (!user) return;
    const nowDate = new Date();
    let daysSinceFirstPublished = 0;
    let daysSinceLastPublished = 0;
    // Last viewed
    const timestamp = user.current?.elementViews ? user.current.elementViews.reverse().find((e)=>e.elementID === 'npsSurvey') : null;
    const surveyLastViewed = timestamp ? typeof timestamp !== 'string' ? new Date(timestamp.seconds * 1000) : new Date(timestamp) : null;
    const daysSinceSurveyLastViewed = surveyLastViewed ? Math.floor((nowDate.getTime() - surveyLastViewed.getTime()) / 86400000) : null;
    if (items) items.forEach((item)=>{
        if (item.publishedDate && !item.archived) {
            const publishedDate = new Date(item.publishedDate);
            const daysDiff = Math.floor((nowDate.getTime() - publishedDate.getTime()) / 86400000);
            if (daysDiff > daysSinceFirstPublished) daysSinceFirstPublished = daysDiff;
            if (daysDiff < daysSinceLastPublished || daysSinceLastPublished === 0 && daysDiff > 0) daysSinceLastPublished = daysDiff;
        }
    });
    //console.log("IF all true -> Show NPS: ", `daysSinceFirstPublished(${daysSinceFirstPublished}) >= 25 && daysSinceLastPublished(${daysSinceLastPublished}) <= 60 && (!surveyLastViewed(${surveyLastViewed}) || daysSinceSurveyLastViewed(${daysSinceSurveyLastViewed}) > 90)`);
    if (daysSinceFirstPublished >= 25 && daysSinceLastPublished <= 60 && (!surveyLastViewed || daysSinceSurveyLastViewed > 90) && !document.referrer.includes('feedback-nps')) location.href = "/feedback-nps";
}
//Disable webflow form submissions
Webflow.push(function() {
    $('form').submit(function() {
        return false;
    });
});
async function fetchAndShowRecommendedItems(items) {
    if (!items || !items.length) return;
    try {
        const ids = [];
        items.forEach((item)=>ids.push(item.id));
        const query = ids.slice(0, 10).map((id)=>`items=${id}`).join('&') + '&number=20';
        const response = await callBackendApi(`/api/items/recommendations?${query}`, {
            requiresAuth: true
        });
        if (!response.data.length) return;
        document.getElementById('recommendedItemsDiv').style.display = 'block';
        const itemList = document.getElementById('recommendedItemsList');
        itemList.innerHTML = "";
        let itemSizes = [];
        let idx = 0;
        for (const item of response.data){
            if (!itemSizes.includes(item.maiSize)) itemSizes.push(item.maiSize);
            const image = item.images.modelImageLarge || item.images.modelImage || item.images.enhancedFrontImageLarge || item.images.enhancedFrontImage;
            const itemCardHTML = `<div class="div-block-14-big"><a id="recommendedItemCard${idx++}" href="${item.platformListings.maiShop.url}"/><div class="ratio-box _16-9"><div class="conten-block with-image">
                        <div class="img-container" style="background-image: url('${image}')"></div></div></div>
                        <div class="recently-added-text-block">
                            <div class="recent-added-items-subheader">${item.cleanedBrand}</div>
                            <div class="recent-added-items-subheader-category">${item.category}, ${item.maiSize}</div>
                            <div class="recently-added-price">${item.platformListings.maiShop.currentPrice} kr</div>
                            <div class="recently-added-brands-link-text">Mai Shop</div>
                        </div><a/></div>`;
            itemList.innerHTML += itemCardHTML;
        }
        itemList.querySelectorAll("a").forEach((link)=>link.addEventListener('click', linkClickTracker));
        document.getElementById('goToMaiShopLinkRecommendations').setAttribute("href", `https://shop.maiapp.se/collections/damklader/${response.data[0].sex || 'Woman'}?sort_by=created-descending&filter.p.m.global.size=${itemSizes.join('&filter.p.m.global.size=')}`);
        const observer = new IntersectionObserver((entries, opts)=>{
            const rect = itemList.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
            if (isVisible) {
                console.log("Recommendations viewed");
                analytics.track("Element Viewed", {
                    elementID: "recommendedItems"
                });
                observer.disconnect();
            }
        }, {
            threshold: 1,
            root: null
        });
        observer.observe(itemList);
    } catch (e) {
        errorHandler.report(e);
        console.log('error', e);
    }
}
function closePickupToast() {
    document.getElementById('triggerPickupToastClose').click();
}
function closeFeedbackForm() {
    document.getElementById('triggerFeedbackFormClose').click();
    setTimeout(function() {
        location.reload();
    }, 400);
}
async function bookPickup() {
    let pickupDate = "";
    var pickupRadioButtons = document.getElementsByName("Pickup");
    for(var x = 0; x < pickupRadioButtons.length; x++)if (pickupRadioButtons[x].checked) pickupDate = pickupRadioButtons[x].value; // yyyy--mm-dd
    db.collection('items').doc(pickupFlowItemId).update({
        pickupDate,
        shippingMethod: 'Pickup'
    }).then((docRef)=>{
        console.log(`pickupDate '${pickupDate}' and shippingMethod 'Pickup' is now updated on Firestore item`);
        closePickupToast();
        document.getElementById('triggerFeedbackFormOpen').click();
    });
}
async function setHappinessRate(value) {
    const itemRef = db.collection('items').doc(pickupFlowItemId);
    const res = await itemRef.update({
        happinessRate: value
    }).then(function() {
        console.log(`happinessRate is now set on Firestore item`);
        happinessQuestionDiv.style.display = 'none';
        openQuestionDiv.style.display = 'block';
        feedbackSubmitButton.style.display = 'block';
    });
}
async function storeFeedback() {
    const value = feedbackTextField.value;
    const itemRef = db.collection('items').doc(pickupFlowItemId);
    const res = await itemRef.update({
        feedbackText: value
    }).then(function() {
        console.log(`feedbackText is now set on Firestore item`);
        closeFeedbackForm();
    });
}
function showTrustedSellerBottomSheet() {
    document.getElementById("darkOverlay").classList.add("active");
    const change = user.current?.trustedSellerStatusChange.type;
    if (change === 'pendingToTrusted') {
        document.getElementById('trustedSellerTitle').innerText = "Du har uppn\xe5t statusen\nP\xe5litlig S\xe4ljare!";
        document.getElementById('trustedSellerText').innerText = "Tack vare en h\xf6g andel godk\xe4nda f\xf6rs\xe4ljningar har du nu blivit P\xe5litlig S\xe4ljare! Fr\xe5n och med nu f\xe5r du utbetalt direkt n\xe4r du skickar dina plagg och t\xe4cks av Mais s\xe4ljarskydd vid eventuella reklamationer.";
    } else if (change === 'untrustedToTrusted') {
        document.getElementById('trustedSellerTitle').innerText = "Du har uppn\xe5t statusen\nP\xe5litlig S\xe4ljare!";
        document.getElementById('trustedSellerText').innerText = `Tack${user.current?.addressFirstName ? ' ' + user.current.addressFirstName : ''}, f\xf6r att du g\xf6r det enkelt f\xf6r k\xf6pare att handla tryggt i andra hand! Fr\xe5n och med nu f\xe5r du utbetalt direkt n\xe4r du skickar dina plagg och t\xe4cks av Mais s\xe4ljarskydd vid eventuella reklamationer.`;
    } else if (change === 'pendingToUntrusted') {
        document.getElementById('trustedSellerButton').innerText = 'Okej';
        document.getElementById('trustedSellerIcon').style.opacity = '0.2';
        document.getElementById('trustedSellerLink').innerText = "Hur blir jag P\xe5litlig S\xe4ljare?";
        document.getElementById('trustedSellerTitle').innerText = "Just nu uppfyller du inte kriterierna f\xf6r P\xe5litlig S\xe4ljare";
        document.getElementById('trustedSellerText').innerHTML = `Eftersom en av dina f\xf6rsta f\xf6rs\xe4ljningar antingen reklamerades eller inte skickades i tid, s\xe5 uppfyller du just nu inte kriterierna f\xf6r statusen P\xe5litlig S\xe4ljare. Du kan fortfarande s\xe4lja, men har \xe4nnu inte kvalificerat dig f\xf6r snabbare utbetalningar eller Mais s\xe4ljarskydd.`;
    } else if (change === 'trustedToUntrusted') {
        document.getElementById('trustedSellerButton').innerText = 'Okej';
        document.getElementById('trustedSellerIcon').style.opacity = '0.2';
        document.getElementById('trustedSellerLink').innerText = "Hur blir jag P\xe5litlig S\xe4ljare igen?";
        document.getElementById('trustedSellerTitle').innerText = "Du har inte l\xe4ngre statusen P\xe5litlig S\xe4ljare";
        document.getElementById('trustedSellerText').innerText = `P\xe5 grund av upprepade reklamationer eller f\xf6rs\xe4ljningar som inte skickats i tid, s\xe5 uppfyller du f\xf6r n\xe4rvarande inte kriterierna f\xf6r s\xe4ljarstatusen P\xe5litlig S\xe4ljare. Du kan fortfarande s\xe4lja, men utbetalning sker f\xf6rst n\xe4r k\xf6paren mottagit varan och eventuella reklamationer skickas tillbaka till dig.`;
    }
    document.getElementById("trustedSellerBottomSheet").classList.add("active");
}
function showTrustedSellerWidget(items) {
    if (!user.current?.trustedSellerStatus || user.current?.trustedSellerStatus === 'Pending') {
        const trustedSellerWidget = document.getElementById('trustedSellerWidget');
        const hasItems = items?.data?.length > 0;
        // If no items, move widget after soldByOthersDiv
        if (!hasItems) {
            console.log('No items, moving widget after soldByOthersDiv');
            const soldByOthersDiv1 = document.getElementById('soldByOthersDiv');
            soldByOthersDiv1.parentNode.insertBefore(trustedSellerWidget, soldByOthersDiv1.nextSibling);
        }
        if (user.current?.approvedSalesCount) document.getElementById('widgetNumApprovedSales').innerText = Math.max(0, 3 - Number(user.current?.approvedSalesCount));
        if (user.current?.approvedSalesCount === 2) document.getElementById('approvedSalesText').innerText = "godk\xe4nd f\xf6rs\xe4ljning kvar";
        if (user.current?.approvedSalesCount >= 1) document.getElementById('widgetFirstSaleBar').style.backgroundColor = '#02AC08';
        if (user.current?.approvedSalesCount >= 2) document.getElementById('widgetSecondSaleBar').style.backgroundColor = '#02AC08';
        if (user.current?.approvedSalesCount >= 3) document.getElementById('widgetThirdSaleBar').style.backgroundColor = '#02AC08';
        trustedSellerWidget.style.display = 'block';
    }
}
async function hideApprovedSaleInfoBox() {
    document.getElementById('approvedSaleInfoBox').style.display = 'none';
    document.getElementById('darkOverlay').classList.remove('active');
}
async function hideTrustedSellerBottomSheet() {
    document.getElementById("darkOverlay").classList.remove("active");
    document.getElementById("trustedSellerBottomSheet").classList.remove("active");
    try {
        await callBackendApi('/api/users', {
            data: {
                data: {
                    trustedSellerStatusChange: {
                        type: user.current?.trustedSellerStatusChange?.type,
                        timestamp: new Date(),
                        seen: true
                    }
                }
            },
            method: 'PUT'
        });
    } catch (e) {
        errorHandler.report(e);
        console.log('Error updating user', e);
    }
}
let loadHandlerHasRun = false;
function onLoadHandler() {
    console.log('onLoadHandler running');
    menuSignoutButton.addEventListener('click', (0, _general.signOut));
    bookPickupForm.addEventListener("submit", bookPickup);
    closePickupToastIcon.addEventListener("click", closePickupToast);
    closeFeedbackFormButton.addEventListener("click", closeFeedbackForm);
    happySmileyButton.addEventListener("click", function() {
        setHappinessRate(3);
    }, false);
    neutralSmileyButton.addEventListener("click", function() {
        setHappinessRate(2);
    }, false);
    angrySmileyButton.addEventListener("click", function() {
        setHappinessRate(1);
    }, false);
    feedbackSubmitButton.addEventListener("click", storeFeedback);
    saveReferralCodeButton.addEventListener("click", async function() {
        saveRefCodeLoadingDiv.style.display = 'flex';
        saveReferralCodeButton.style.display = 'none';
        const inputCode = referralCodeInput.value;
        await connectReferralUsers(inputCode);
    });
    closeBidToastButton.addEventListener("click", function() {
        (0, _general.animateCloseToast)('bidToast');
    });
    closeMeasurementsToastButton.addEventListener("click", function() {
        triggerMeasurementsToastClose.click();
    });
    closeNewPriceToastButton.addEventListener("click", function() {
        triggerNewPriceToastClose.click();
    });
    closeInviteToastButton.addEventListener("click", function() {
        triggerInviteToastClose.click();
    });
    closeServicePointToastButton.addEventListener("click", function() {
        triggerServicePointToastClose.click();
    });
    confirmServicePointButton.addEventListener("click", function() {
        document.getElementById('feedbackFormTitle').innerHTML = '';
        triggerServicePointToastClose.click();
        triggerFeedbackFormOpen.click();
    });
    closeLongerPeriodToastButton.addEventListener("click", function() {
        triggerLongerPeriodToastClose.click();
    });
    shareCodeButton.addEventListener('click', (0, _general.shareCode));
    sharePersonalLinkButton.addEventListener('click', (0, _general.shareCode));
    loadHandlerHasRun = true;
    menuButton.addEventListener("click", function() {
        Intercom('update', {
            "hide_default_launcher": true
        });
    });
    closeMenuButton.addEventListener("click", function() {
        Intercom('update', {
            "hide_default_launcher": false
        });
    });
    document.getElementById("closeAppPromo").addEventListener("click", function(event) {
        console.log("Close button clicked!");
        closeAppPromoSection();
    });
    document.getElementById("darkOverlay").addEventListener("click", function() {
        hideTrustedSellerBottomSheet();
        hideApprovedSaleInfoBox();
        (0, _general.animateCloseToast)('bidToast');
    });
    document.getElementById("closeTrustedSellerBottomSheet").addEventListener("click", hideTrustedSellerBottomSheet);
    document.getElementById("trustedSellerButton").addEventListener("click", hideTrustedSellerBottomSheet);
    document.getElementById('approvedSalesLines').addEventListener('click', function() {
        document.getElementById('approvedSaleInfoBox').style.display = 'block';
        document.getElementById('darkOverlay').classList.add('active');
    });
    document.getElementById('closeApprovedSaleInfoBox').addEventListener('click', hideApprovedSaleInfoBox);
}
if (localStorage.getItem('lwlItemDrafts')) location.href = '/lwl?createDrafts=true';
window.addEventListener('load', onLoadHandler);
console.log(`document.readyState ${document.readyState}`);
if (document.readyState === "complete" && !loadHandlerHasRun) {
    console.log("Running it since event listener did not");
    onLoadHandler();
}
window.addEventListener('pageshow', (event)=>{
    if (event.persisted) {
        console.log('This page was restored from the bfcache.');
        if (menu.style.display !== 'none') menu.style.display = 'none';
    } else console.log('This page was loaded normally.');
});
window.intercomSettings = {
    app_id: "klyy0le5"
};
(function() {
    var w = window;
    var ic = w.Intercom;
    if (typeof ic === "function") {
        ic('reattach_activator');
        ic('update', w.intercomSettings);
    } else {
        var d = document;
        var i = function() {
            i.c(arguments);
        };
        i.q = [];
        i.c = function(args) {
            i.q.push(args);
        };
        w.Intercom = i;
        var l = function() {
            var s = d.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.intercom.io/widget/klyy0le5';
            var x = d.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
        };
        if (w.attachEvent) w.attachEvent('onload', l);
        else w.addEventListener('load', l, false);
    }
})();

},{"./general":"lWrRo","./infoRequestsFunctions":"dW4Oe","./loadItemCards":"ihd5m","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dW4Oe":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadInfoRequests", ()=>loadInfoRequests);
var _general = require("./general");
/**
 * Converts expires value to a Date object, handling both Firestore timestamp format
 * ({ _seconds, _nanoseconds }) and standard Date formats (string, number, Date)
 */ function convertExpiresToDate(expires) {
    // Handle Firestore timestamp format
    if (expires && typeof expires === 'object' && expires._seconds !== undefined) return new Date(expires._seconds * 1000 + (expires._nanoseconds || 0) / 1000000);
    // Handle standard Date formats
    return new Date(expires);
}
async function openMeasurementsToast(itemId, description) {
    measurementDescriptionText.innerHTML = description;
    measurementsSubmitButton.addEventListener('click', async function() {
        const input = measurementsInput.value;
        if (input.length > 0 && input !== " ") await db.collection('items').doc(itemId).update({
            measurements: input,
            "infoRequests.measurements.status": "Resolved"
        });
        triggerMeasurementsToastClose.click();
        setTimeout(function() {
            location.reload();
        }, 400);
    });
    triggerMeasurementsToastOpen.click();
}
async function openLongerPeriodToast(itemId, brand, currentMinPrice, deniedBefore) {
    if (!itemId) return;
    console.log('is this happening?');
    // If user is qualified to get the discount question -> Show it to the user
    const price = currentMinPrice;
    const priceWithDiscount30 = Math.ceil(price * 0.7 / 10) * 10;
    const priceWithDiscount20 = Math.ceil(price * 0.8 / 10) * 10;
    priceAfterDiscount30.innerHTML = `(Priset blir ${priceWithDiscount30} kr)`;
    priceAfterDiscount20.innerHTML = `(Priset blir ${priceWithDiscount20} kr)`;
    priceNoDiscount.innerHTML = `(${price} kr)`;
    if (price >= 140 && !deniedBefore) {
        longerPeriodDescriptionText.innerHTML = `S\xe4ljperioden f\xf6r ditt ${brand}-plagg har n\xe5tt sitt slut. V\xe4lj om du vill f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar och om du vill s\xe4nka priset f\xf6r att \xf6ka chansen att f\xe5 det s\xe5lt.`;
        discountFormDiv.style.display = 'block';
    } else {
        longerPeriodDescriptionText.innerHTML = `S\xe4ljperioden f\xf6r ditt ${brand}-plagg har n\xe5tt sitt slut. Vill du f\xf6rl\xe4nga s\xe4ljperioden med ytterligare 30 dagar eller avsluta f\xf6rs\xe4ljningen?`;
        discountFormDiv.style.display = 'none';
    }
    // Accept longer selling window and store chosen discount
    longerPeriodAcceptButton.addEventListener('click', async function() {
        const today = new Date();
        const todayDate = today.toISOString().split('T')[0];
        let newPrice = price;
        let discount = 0;
        var discountRadioButtons = document.getElementsByName("Discount");
        for(var x = 0; x < discountRadioButtons.length; x++)if (discountRadioButtons[x].checked) {
            const input = discountRadioButtons[x].value;
            if (input === '30') {
                newPrice = priceWithDiscount30;
                discount = 30;
            }
            if (input === '20') {
                newPrice = priceWithDiscount20;
                discount = 20;
            }
        }
        await db.collection('items').doc(itemId).update({
            longerPeriodAcceptedDate: todayDate,
            "infoRequests.longerPeriod.status": "Resolved",
            "infoRequests.longerPeriod.response": "Accepted",
            longerPeriodAcceptedDiscount: discount,
            minPriceEstimate: newPrice
        });
        triggerLongerPeriodToastClose.click();
        setTimeout(function() {
            location.reload();
        }, 300);
    });
    // Decline longer selling period and quit sales
    longerPeriodDenyButton.addEventListener('click', async function() {
        await db.collection('items').doc(itemId).update({
            "infoRequests.longerPeriod.status": "Resolved",
            "infoRequests.longerPeriod.response": "Denied",
            "status": "Unsold" // This field is normally mastered by AT - I do this for the user to see the effect immediately (the card is removed)
        });
        triggerLongerPeriodToastClose.click();
        setTimeout(function() {
            location.reload();
        }, 300);
    });
    triggerLongerPeriodToastOpen.click();
}
async function openBidToast(itemId, minPrice1, bidPrice, expires) {
    if (!itemId) return;
    bidButtonsContainer.style.visibility = 'visible';
    bidButtonsContainer.style.visibility = 'visible';
    bidPriceText.innerHTML = `${bidPrice} kr`;
    // Calculate hours and minutes remaining
    const now = new Date();
    const expirationDate = convertExpiresToDate(expires);
    const timeDiffMs = expirationDate.getTime() - now.getTime();
    const timeDiffMinutes = Math.floor(timeDiffMs / 60000);
    const hours = Math.floor(timeDiffMinutes / 60);
    const minutes = Math.floor(timeDiffMinutes % 60);
    bidDescription.innerHTML = `Budet ligger under ditt l\xe4gsta pris p\xe5 ${minPrice1} kr. Giltigt i ${hours} h och ${minutes} min.`;
    // Accept bid and show confirmation
    bidAcceptButton.removeEventListener("click", bidAcceptHandler);
    const acceptBid = async function() {
        try {
            acceptBidLoading.style.display = 'block';
            acceptBidButtonText.style.display = 'none';
            // Call the API endpoint to accept the bid
            await callBackendApi(`/api/items/${itemId}/infoRequests`, {
                method: 'PUT',
                data: {
                    type: 'bid',
                    response: 'Accepted'
                }
            });
            acceptBidLoading.style.display = 'none';
            acceptBidButtonText.style.display = 'block';
            bidTitle.style.visibility = 'hidden';
            bidButtonsContainer.style.visibility = 'hidden';
            // Fade out animation
            bidPriceText.style.transition = 'opacity 0.3s ease';
            bidDescription.style.transition = 'opacity 0.3s ease';
            bidPriceText.style.opacity = '0';
            bidDescription.style.opacity = '0';
            // Wait for fade out to complete, then change text and fade in
            setTimeout(()=>{
                bidPriceText.innerHTML = 'Toppen!';
                bidDescription.innerHTML = "N\xe4r k\xf6paren betalat f\xe5r du ett SMS om att det \xe4r s\xe5lt och redo att skickas.";
                // Fade in animation
                bidPriceText.style.opacity = '1';
                bidDescription.style.opacity = '1';
            }, 300);
            // Hide the specific info request element instead of reloading the page
            (0, _general.hideInfoRequestCard)(`infoRequestBid-${itemId}`);
        } catch (error) {
            console.error('Failed to accept bid:', error);
        // You might want to show an error message to the user here
        }
    };
    bidAcceptButton.addEventListener('click', acceptBid);
    bidAcceptHandler = acceptBid;
    // Decline bid
    bidDenyButton.removeEventListener("click", bidDenyHandler);
    const denyBid = async function() {
        await db.collection('items').doc(itemId).update({
            "infoRequests.bid.status": "Resolved",
            "infoRequests.bid.response": "Denied"
        });
        (0, _general.animateCloseToast)('bidToast');
        // Hide the specific info request element instead of reloading the page
        (0, _general.hideInfoRequestCard)(`infoRequestBid-${itemId}`);
    };
    bidDenyButton.addEventListener('click', denyBid);
    bidDenyHandler = denyBid;
    (0, _general.animateOpenToast)('bidToast');
}
async function storePriceResponse(itemId, max, min, response, status) {
    console.log("storePriceResponse", itemId, max, min, response);
    // Accept price
    if (response === "Accepted") await db.collection('items').doc(itemId).update({
        "infoRequests.price.status": "Resolved",
        "infoRequests.price.response": "Accepted",
        "maxPriceEstimate": max,
        "minPriceEstimate": min
    }).then(function() {
        triggerNewPriceToastClose.click();
        setTimeout(function() {
            location.reload();
        }, 300);
    });
    // Deny price
    if (response === "Denied") {
        let fields = {
            "infoRequests.price.status": "Resolved",
            "infoRequests.price.response": "Denied"
        };
        if (status === "New") {
            fields["archived"] = true;
            fields["willNotSell"] = true;
        }
        await db.collection('items').doc(itemId).update(fields).then(function() {
            triggerNewPriceToastClose.click();
            setTimeout(function() {
                location.reload();
            }, 300);
        });
    }
}
let acceptNewPriceHandler;
let denyNewPriceHandler;
let bidAcceptHandler;
let bidDenyHandler;
async function openNewPriceToast(itemId, status, max, min, brand, description, category, type, currentMax, currentMin) {
    console.log("openNewPriceToast", itemId, status, max, min, brand, description, category, type, currentMax, currentMin);
    previousMinPrice.style.display = 'none';
    previousMaxPrice.style.display = 'none';
    maxPriceDiv.style.display = 'block';
    minPriceDiv.style.display = 'block';
    // Set content of toast
    newPriceToastTitle.innerHTML = "Nytt l\xe4gsta pris";
    newPriceHeading.innerHTML = `${brand}-plagg`;
    const c = category.toLowerCase();
    if (c && c !== "null") newPriceHeading.innerHTML = `${brand}-${c}`;
    maxPrice.innerHTML = max;
    minPrice.innerHTML = min;
    if (currentMax && currentMax !== 'null' && currentMax !== '' && currentMax !== 'undefined' && max !== currentMax) {
        previousMaxPrice.innerHTML = currentMax;
        previousMaxPrice.style.display = 'block';
    }
    if (currentMin && currentMin !== 'null' && currentMin !== '' && currentMin !== 'undefined' && min !== currentMin) {
        previousMinPrice.innerHTML = currentMin;
        previousMinPrice.style.display = 'block';
    }
    acceptNewPriceButton.innerHTML = "S\xe4lj med nytt pris";
    denyNewPriceButton.innerHTML = "S\xe4nk ej";
    if (status === "New" && type === 'Valuation') {
        newPriceToastTitle.innerHTML = "V\xe4rdering";
        acceptNewPriceButton.innerHTML = "S\xe4lj till v\xe4rdering";
        denyNewPriceButton.innerHTML = "Avb\xf6j och avsluta";
    }
    if (type === 'Adjusted ML Valuation') newPriceToastTitle.innerHTML = "Nytt prisintervall";
    if (type !== 'Valuation' && type !== 'Adjusted ML Valuation') {
        minPrice.innerHTML = `${min} kr`;
        maxPriceDiv.style.display = 'none';
    }
    if (description && description !== 'undefined' && description !== '' && description !== 'null') {
        newPriceText.innerHTML = description;
        descriptionDiv.style.display = 'block';
    }
    acceptNewPriceButton.removeEventListener("click", acceptNewPriceHandler);
    const acceptNewPrice = ()=>{
        storePriceResponse(itemId, max, min, 'Accepted', status);
    };
    acceptNewPriceButton.addEventListener('click', acceptNewPrice);
    acceptNewPriceHandler = acceptNewPrice;
    denyNewPriceButton.removeEventListener("click", denyNewPriceHandler);
    const denyNewPrice = ()=>{
        storePriceResponse(itemId, max, min, 'Denied', status);
    };
    denyNewPriceButton.addEventListener('click', denyNewPrice);
    denyNewPriceHandler = denyNewPrice;
    // Open toast
    triggerNewPriceToastOpen.click();
}
function loadInfoRequests(items) {
    console.log("loadInfoRequests");
    const bidClone = document.getElementById('infoRequestBidTemplate').cloneNode(true);
    const measurementsClone = document.getElementById('infoRequestMeasurementsTemplate').cloneNode(true);
    const longerPeriodClone = document.getElementById('infoRequestLongerPeriodTemplate').cloneNode(true);
    const updateImagesClone = document.getElementById('infoRequestImagesTemplate').cloneNode(true);
    const valuationClone = document.getElementById('infoRequestValuationTemplate').cloneNode(true);
    const infoRequestsList = document.getElementById('infoRequestsList');
    infoRequestsList.replaceChildren();
    (items || []).forEach((item)=>{
        const itemId = item.id;
        const infoRequests = item.infoRequests;
        const status = item.status;
        const brand = item.brand.replace(/'/g, '');
        const currentMinPrice = item.minPriceEstimate;
        const currentMaxPrice = item.maxPriceEstimate;
        const deniedBefore = item?.infoRequests?.price?.response === "Denied" ? true : false;
        const archived = item.archived;
        const category = item.category;
        const frontImageUrl = (0, _general.itemCoverImage)(item);
        if (archived == undefined && status !== "Unsold" && status !== "Sold" && infoRequests) displayRequests();
        function displayRequests() {
            console.log("displayRequests", infoRequests);
            for(const req in infoRequests)if (infoRequests[req]?.status === "Active") {
                let description = infoRequests[req].description;
                if (description) description = description.replace(/'/g, '');
                // PRICE REQUEST
                if (req === "price") {
                    const type = infoRequests[req].type;
                    const newRequest = valuationClone.cloneNode(true);
                    newRequest.id = `infoRequestPrice-${itemId}`;
                    newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                    newRequest.querySelector('a .pricebuttontext').innerText = "Se prisf\xf6rslag";
                    newRequest.querySelector('.text-block-72').innerText = "Vill du s\xe4nka priset och f\xe5 det s\xe5lt?";
                    infoRequestsList.appendChild(newRequest);
                    if (status === "New" && type !== 'Adjusted ML Valuation') {
                        newRequest.querySelector('a .pricebuttontext').innerText = "Se v\xe4rdering";
                        newRequest.querySelector('.text-block-72').innerText = "Vill du s\xe4lja till v\xe5r v\xe4rdering?";
                        newRequest.querySelector('a').href = `/item-valuation?id=${itemId}`;
                    } else setTimeout(()=>{
                        const max = infoRequests[req].maxPrice;
                        const min = infoRequests[req].minPrice;
                        document.querySelector(`#infoRequestPrice-${itemId} a`).addEventListener('click', async ()=>{
                            await openNewPriceToast(itemId, status, max, min, brand, description, category, type, currentMaxPrice, currentMinPrice);
                        });
                    }, 0);
                }
                // MEASUREMENTS REQUEST
                if (req === "measurements") {
                    const newRequest = measurementsClone.cloneNode(true);
                    newRequest.id = `infoRequestMeasurements-${itemId}`;
                    newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                    infoRequestsList.appendChild(newRequest);
                    setTimeout(()=>{
                        document.querySelector(`#infoRequestMeasurements-${itemId} a`).addEventListener('click', async ()=>{
                            await openMeasurementsToast(itemId, description);
                        });
                    }, 0);
                }
                // IMAGES REQUEST
                if (req === "images") {
                    const newRequest = updateImagesClone.cloneNode(true);
                    newRequest.id = `infoRequestImages-${itemId}`;
                    newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                    newRequest.querySelector('a').href = `/edit-item?id=${itemId}`;
                    infoRequestsList.appendChild(newRequest);
                }
                // LONGER PERIOD REQUEST
                if (req === "longerPeriod") {
                    const newRequest = longerPeriodClone.cloneNode(true);
                    newRequest.id = `infoRequestLongerPeriod-${itemId}`;
                    newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                    infoRequestsList.appendChild(newRequest);
                    setTimeout(()=>{
                        document.querySelector(`#infoRequestLongerPeriod-${itemId} a`).addEventListener('click', async ()=>{
                            await openLongerPeriodToast(itemId, brand, currentMinPrice, deniedBefore);
                        });
                    }, 0);
                }
                // BID REQUEST
                if (req === "bid") {
                    const expires = infoRequests[req].expires;
                    const now = new Date();
                    const expirationDate = convertExpiresToDate(expires);
                    // Only show bid request if it hasn't expired
                    console.log("Expired?: ", expirationDate > now);
                    if (expirationDate > now) {
                        console.log("We try to show it!");
                        const newRequest = bidClone.cloneNode(true);
                        newRequest.id = `infoRequestBid-${itemId}`;
                        newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                        infoRequestsList.appendChild(newRequest);
                        setTimeout(()=>{
                            document.querySelector(`#infoRequestBid-${itemId} a`).addEventListener('click', async ()=>{
                                const bidPrice = infoRequests[req].price;
                                await openBidToast(itemId, currentMinPrice, bidPrice, expires);
                            });
                        }, 0);
                    }
                }
                if (infoRequestsList.children.length > 0) infoRequestsDiv.style.display = "block";
            }
        }
    });
/*
    db.collection("items").where("user", "==", userId).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const itemId = doc.id;
            const item = doc.data();
            const infoRequests = item.infoRequests;
            const status = item.status;
            const brand = item.brand.replace(/'/g, '');
            const currentMinPrice = item.minPriceEstimate;
            const currentMaxPrice = item.maxPriceEstimate;
            const deniedBefore = item?.infoRequests?.price?.response === "Denied" ? true : false;
            const archived = item.archived;
            const category = item.category;
            const frontImageUrl = itemCoverImage(item);
            if (archived == undefined && status !== "Unsold" && status !== "Sold" && infoRequests) {
                displayRequests();
            }

            function displayRequests() {
                for (const req in infoRequests) {
                    if (infoRequests[req]?.status === "Active") {
                        let description = infoRequests[req].description;
                        
                        if (description) { description = description.replace(/'/g, ''); }
                        // PRICE REQUEST
                        if (req === "price") {
                            const type = infoRequests[req].type;
                            const newRequest = valuationClone.cloneNode(true);
                            newRequest.id = `infoRequestPrice-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            newRequest.querySelector('a .pricebuttontext').innerText = 'Se prisförslag';
                            newRequest.querySelector('.text-block-72').innerText = "Vill du sänka priset och få det sålt?";
                            infoRequestsList.appendChild(newRequest);
                            if (status === "New" && type !== 'Adjusted ML Valuation') {
                                newRequest.querySelector('a .pricebuttontext').innerText = 'Se värdering';
                                newRequest.querySelector('.text-block-72').innerText = 'Vill du sälja till vår värdering?'
                                newRequest.querySelector('a').href = `/item-valuation?id=${itemId}`;
                            } else {
                                setTimeout(() => {
                                    const max = infoRequests[req].maxPrice;
                                    const min = infoRequests[req].minPrice;
                                    document.querySelector(`#infoRequestPrice-${itemId} a`).addEventListener('click', async () => {
                                        await openNewPriceToast(itemId, status, max, min, brand, description, category, type, currentMaxPrice, currentMinPrice);
                                    })
                                }, 0);
                            }
                        }
                        // MEASUREMENTS REQUEST
                        if (req === "measurements") {
                            const newRequest = measurementsClone.cloneNode(true);
                            newRequest.id = `infoRequestMeasurements-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            infoRequestsList.appendChild(newRequest);
                            setTimeout(() => {
                              document.querySelector(`#infoRequestMeasurements-${itemId} a`).addEventListener('click', async () => {
                                await openMeasurementsToast(itemId, description);
                              })
                            }, 0);
                        }
                        // IMAGES REQUEST
                        if (req === "images") {
                            const newRequest = updateImagesClone.cloneNode(true);
                            newRequest.id = `infoRequestImages-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            newRequest.querySelector('a').href = `/edit-item?id=${itemId}`;
                            infoRequestsList.appendChild(newRequest);
                        }
                        // LONGER PERIOD REQUEST
                        if (req === "longerPeriod") {
                            const newRequest = longerPeriodClone.cloneNode(true);
                            newRequest.id = `infoRequestLongerPeriod-${itemId}`;
                            newRequest.querySelector('.img-container').style.backgroundImage = `url('${frontImageUrl}')`;
                            infoRequestsList.appendChild(newRequest);
                            setTimeout(() => {
                              document.querySelector(`#infoRequestLongerPeriod-${itemId} a`).addEventListener('click', async () => {
                                await openLongerPeriodToast(itemId, brand, currentMinPrice, deniedBefore);
                              })
                            }, 0);
                        }
                        infoRequestsDiv.style.display = "block";
                    }
                }
            }
        });
    });
*/ }

},{"./general":"lWrRo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8xEoj":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["aLNG8","ihd5m"], "ihd5m", "parcelRequire81ca")

//# sourceMappingURL=loadItemCards.js.map
