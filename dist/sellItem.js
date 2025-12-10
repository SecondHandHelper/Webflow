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
  externals,
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
        if (externals[name]) {
          return externals[name];
        }
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
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
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
})({"e7GTA":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SERVER_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "42b0fa005ac14ff1";
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
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
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

},{}],"edX6B":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "rememberUnsavedChanges", ()=>rememberUnsavedChanges);
parcelHelpers.export(exports, "isNoBgImage", ()=>isNoBgImage);
var _sellItemHelpers = require("./sellItemHelpers");
var _qrcode = require("qrcode");
var _qrcodeDefault = parcelHelpers.interopDefault(_qrcode);
var _general = require("./general");
var _autocompleteBrands = require("./autocomplete-brands");
var _sellItemModelSearch = require("./sellItemModelSearch");
let itemDraftSaved = false;
const params = getParamsObject();
let itemDraft;
async function addUserDetails() {
    // Grab values from form
    const addressFields = (0, _general.getFormAddressFields)();
    let personalId1 = document.getElementById("personalId").value;
    personalId1 = personalId1 ? (0, _general.formatPersonalId)(personalId1) : null;
    // Write to Firestore
    const itemRef = db.collection('users').doc(authUser.current.uid);
    itemRef.update({
        ...addressFields,
        personalId: personalId1
    }).then(()=>{
        console.log(`User address of ${authUser.current.uid} is now updated`);
        itemConfirmationScreen.style.display = 'block';
        addressFormDiv.style.display = 'none';
    }).catch((error)=>{
        errorHandler.report(error);
        console.error("Error updating document: ", error);
    });
}
function defectsChoicesInSwedish() {
    return new Map().set("hole", "H\xe5l").set("stain", "Fl\xe4ck").set("lostFit", "Tappad passform").set("pilling", "Nopprig").set("threadUp", "Tr\xe5dsl\xe4pp").set("colorChange", "F\xe4rg\xe4ndring").set("otherDefect", "Annat");
}
function imageElements() {
    return [
        "frontImage",
        "brandTagImage",
        "defectImage",
        "materialTagImage",
        "extraImage"
    ];
}
async function trackUserActivated() {
    // Track with segment 'User Activated'
    if (await userItemsCount() === 1) analytics.track('User Activated');
}
async function userItemsCount() {
    const items = await getItems(authUser.current.uid);
    return items.docs.filter((i)=>i.data()?.status !== 'Draft').length;
}
function imageUploadHandlers() {
    let frontImageUpload = document.getElementById("frontImage");
    let brandTagImageUpload = document.getElementById("brandTagImage");
    let productImageUpload = document.getElementById("productImage");
    let defectImageUpload = document.getElementById("defectImage");
    let materialTagImageUpload = document.getElementById("materialTagImage");
    let extraImageUpload = document.getElementById("extraImage");
    // display image when file has been selected
    $('#frontImage').off('change');
    frontImageUpload.addEventListener('change', frontImageChangeHandler, {
        capture: true
    });
    $('#brandTagImage').off('change');
    brandTagImageUpload.addEventListener('change', brandTagImageChangeHandler, {
        capture: true
    });
    $('#productImage').off('change');
    productImageUpload.addEventListener('change', productImageChangeHandler, {
        capture: true
    });
    $('#defectImage').off('change');
    defectImageUpload.addEventListener('change', defectImageChangeHandler, {
        capture: true
    });
    $('#materialTag').off('change');
    materialTagImageUpload.addEventListener('change', materialTagImageChangeHandler, {
        capture: true
    });
    $('#extraImage').off('change');
    extraImageUpload.addEventListener('change', extraImageChangeHandler, {
        capture: true
    });
}
async function sellItemMainAuthenticated() {
    console.log("sellItemMainAuthenticated " + new Date());
    if (params.type !== 'draft' && params.type !== 'resell') document.getElementById('saveItemDraftButton').style.display = 'flex';
    window.addEventListener('beforeunload', ()=>{
        if (params.id || itemDraftSaved) localStorage.removeItem('newItem');
    });
    // Visa alla "viktiga" fält om man är inloggad
    toggleMoreInfoFields.click();
    // Create item from sessionStorage
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
        // ... if we are redirected here from the sign-in page
        if (document.referrer.includes('/sign-in')) {
            await createItemAfterSignIn();
            const shippingMethod = sessionStorage.getItem('shippingMethod');
            if (shippingMethod) await callBackendApi('/api/users', {
                data: {
                    data: {
                        preferences: {
                            shippingMethod
                        }
                    }
                },
                method: 'PUT'
            });
            const userPhoneSet = user.current?.phoneNumber?.length;
            return location.href = userPhoneSet ? '/item-confirmation' : '/user-contact';
        } else // otherwise make sure to remove any previously saved item as a precaution
        sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
    }
}
async function sellItemMain() {
    const qrCanvas = document.getElementById('qrCanvas');
    if (qrCanvas) (0, _qrcodeDefault.default).toCanvas(qrCanvas, window.location.href, function(error) {
        if (error) console.error(error);
        console.log('success!');
    });
    localStorage.removeItem('latestItemCreated');
    sessionStorage.removeItem('itemValuation');
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn') && document.referrer.includes('/sign-in')) {
        console.log(`showing spinner and waiting for item to be created when user is set ${user.current?.email}`);
        // ... if we are redirected here from the sign-in page and have a saved item that should be created
        document.getElementById('loadingDiv').style.display = 'flex';
        document.getElementById('creatingItemText').style.display = 'block';
        return;
    }
    // Initial state
    imageUploadHandlers();
    (0, _sellItemModelSearch.setupModelSearchEventListeners)();
    initializeSelectColor();
    initializeInputEventListeners();
    (0, _autocompleteBrands.autocomplete)(document.getElementById("itemBrand"), (0, _autocompleteBrands.brands));
    // Hide/Show warning about difficulty to sell certain brands
    let brand = document.getElementById("itemBrand");
    const category = document.getElementById('itemCategory');
    brand.oninput = function() {
        shareSoldDiv.style.display = 'none';
        (0, _sellItemHelpers.checkBlockedOrLowShareSoldBrand)(this.value, category.value);
    };
    brand.onblur = function() {
        const hardToSellDiv = document.getElementById('hardToSellDiv');
        const unknownBrandWords = [
            "Ok\xe4nt",
            'Unknown',
            'Vet ej',
            'Vet inte',
            "Ok\xe4nd",
            'Se bild'
        ];
        if (unknownBrandWords.some((words)=>this.value.toLowerCase().includes(words.toLowerCase())) || this.value.length && !this.value.match(/(\w|\d)/)) {
            hardToSellText.innerHTML = `Vi k\xe4nner inte till m\xe4rket '${this.value}', och s\xe4ljer i regel inte ok\xe4nda varum\xe4rken.`;
            stopIcon.style.display = 'none';
            warningIcon.style.display = 'block';
            hardToSellDiv.style.display = 'block';
        }
        (0, _sellItemModelSearch.displayFindModelDiv)(this.value);
    };
    // Hide/Show extra fields for defects
    itemCondition.onchange = function() {
        let input = this.value;
        if (input === "Anv\xe4nd, tecken p\xe5 slitage" || input === "Anv\xe4nd, tydligt slitage") {
            defectInfoDiv.style.display = 'block';
            itemCondition.style.color = "#333";
        } else if (input === "") {
            defectInfoDiv.style.display = 'none';
            itemCondition.style.color = "#929292";
        } else {
            defectInfoDiv.style.display = 'none';
            itemCondition.style.color = "#333";
        }
    };
    // Show intro info about the importance to accurately describe the items condition
    itemCondition.addEventListener("input", ()=>{
        if (itemCondition.value === "Anv\xe4nd, men utan anm\xe4rkning") {
            const hasCookieSeen = getCookie('conditionUsedInfoBoxSeen') === 'true';
            if (authUser.current) {
                const hasViewedElement = user.current?.elementViews?.some((view)=>view.elementID === "conditionUsedInfoBox");
                if (!hasViewedElement && !hasCookieSeen) {
                    document.getElementById("triggerOpenConditionUsedInfo").click();
                    // Store elementViews to be able to hinder it to show automatically again
                    db.collection('users').doc(authUser.current.uid).update({
                        elementViews: firebase.firestore.FieldValue.arrayUnion({
                            elementID: "conditionUsedInfoBox",
                            timestamp: new Date()
                        })
                    });
                    setCookie('conditionUsedInfoBoxSeen', 'true', 100);
                }
            } else if (!hasCookieSeen) {
                document.getElementById("triggerOpenConditionUsedInfo").click();
                setCookie('conditionUsedInfoBoxSeen', 'true', 100);
            }
        }
    });
    nwt.addEventListener('click', ()=>{
        (0, _sellItemModelSearch.selectFieldValue)(itemCondition, 'Helt ny, med prislapp kvar');
    });
    nwot.addEventListener('click', ()=>{
        (0, _sellItemModelSearch.selectFieldValue)(itemCondition, 'Helt ny, men utan prislapp');
    });
    usedLikeNew.addEventListener('click', ()=>{
        (0, _sellItemModelSearch.selectFieldValue)(itemCondition, "Anv\xe4nd, men utan anm\xe4rkning");
    });
    usedGood.addEventListener('click', ()=>{
        (0, _sellItemModelSearch.selectFieldValue)(itemCondition, "Anv\xe4nd, tecken p\xe5 slitage");
    });
    usedWorn.addEventListener('click', ()=>{
        (0, _sellItemModelSearch.selectFieldValue)(itemCondition, "Anv\xe4nd, tydligt slitage");
    });
    personalId.addEventListener("input", ()=>{
        const error = (0, _general.isValidSwedishSsn)(personalId.value) ? '' : 'Ogiltigt personnummer';
        personalId.setCustomValidity(error);
    });
    (0, _sellItemHelpers.initializeCategorySelect)();
    initializeColorConfirm();
    initializeBrandConfirm();
    initializeModelConfirm();
    initializeMaterialConfirm();
    initializeSizeConfirm();
    initializeCategoryConfirm();
    initializeSuggestButtonsSaveState();
    initializeClearFormButton();
    initializeSaveFormButton();
    initializeDeleteImageListeners();
    document.getElementById('clearItemForm').addEventListener('click', clearFormFields);
    window.addEventListener('scroll', function scrolledToBottom() {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 40) {
            document.getElementById('bottomBarContainer').classList.add('sticky-bottom-bar');
            window.removeEventListener('scroll', scrolledToBottom);
        }
    });
    if (params.id) {
        // Fill form if the user comes from a prefill link (re-sell item or continue with draft item)
        sessionStorage.removeItem('newItemId');
        localStorage.removeItem('newItem');
        localStorage.removeItem('detectedModel');
        authUser.whenSet(function(user1) {
            if (!user1) document.getElementById('maiIntro').style.display = 'block';
        });
        document.getElementById('resellIntro').style.display = 'block';
        document.getElementById('bottomBarContainer').classList.add('sticky-bottom-bar');
        document.getElementById('clearItemForm').style.display = 'none';
        if (params.type === 'draft' || params.type === 'resell') {
            document.querySelector('#resellIntro .text-block-176').innerText = "Fyll i de sista detaljerna f\xf6r att s\xe4lja ditt plagg och kontrollera skickbeskrivningen.";
            document.getElementById("frontImage").required = true;
            document.getElementById("brandTagImage").required = true;
        }
        await fillForm(params.id, null, params.type === 'draft');
        document.getElementById("triggerShowSellItemContent").click();
    } else if (localStorage.getItem('newItem') && !isDefaultFormState(JSON.parse(localStorage.getItem('newItem')))) {
        // Saved state from a previous visit to /sell-item - restore the data
        const newItem = JSON.parse(localStorage.getItem('newItem'));
        document.getElementById("frontImage").required = true;
        document.getElementById("brandTagImage").required = true;
        await fillForm(null, newItem, true);
        document.getElementById('clearItemForm').style.display = 'block';
        document.getElementById("triggerShowSellItemContent").click();
    } else {
        document.getElementById("triggerShowSellItemContent").click();
        document.getElementById("frontImage").required = true;
        document.getElementById("brandTagImage").required = true;
    }
    initializeSaveStateListeners();
    initializeRestoreOnNavigation();
    if (document.getElementById('imagesDownloadApp') && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) document.getElementById('imagesDownloadApp').style.display = 'block';
}
async function addItem() {
    const id = params.type === 'draft' ? params.id : sessionStorage.getItem('newItemId') || await (0, _sellItemHelpers.requestUniqueId)();
    let reUploadingImage = null;
    try {
        // Check that all images are uploaded
        const images = JSON.parse(localStorage.getItem('newItem') || '{}').images;
        document.querySelectorAll('input[type="file"]').forEach((input)=>{
            if (input.files.length && !images[input.id]) {
                reUploadingImage = input;
                (0, _sellItemHelpers.uploadImageAndShowPreview)(input.files[0], input.id, true);
            }
        });
    } catch (e) {
        if (reUploadingImage) {
            reUploadingImage.setCustomValidity("Uppladdning av bilden misslyckades, f\xf6rs\xf6k igen");
            (0, _sellItemHelpers.showImageError)(reUploadingImage, "Uppladdning av bilden misslyckades, f\xf6rs\xf6k igen");
            validateForm();
        }
        errorHandler.report(e);
        console.error('addItem failed', e);
        return;
    }
    try {
        document.getElementById('addItemFormDiv').style.display = 'none';
        document.getElementById('loadingDiv').style.display = 'flex';
        document.getElementById('clearItemForm').style.display = 'none';
        document.getElementById('saveItemDraftDiv').style.display = 'none';
        const item = await addItemInner(id);
        const nextStep = await getAndSaveValuation(id, item);
        location.href = nextStep;
    } catch (e) {
        errorHandler.report(e);
        console.error('addItem failed', e);
    }
}
function needsHumanCheck({ humanCheckNeeded, newMinMaxLog, lowValueSegment, lowValueCategory }) {
    return humanCheckNeeded || newMinMaxLog?.match(/accept price is above max/i) && !lowValueSegment && !lowValueCategory;
}
async function saveValuationInStorageOrBackend(valuationData, itemId) {
    if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) {
        const item = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
        sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify({
            id: item.id,
            item: {
                ...item.item,
                ...valuationData
            }
        }));
    } else {
        await callBackendApi(`/api/valuation/${itemId}`, {
            data: valuationData
        });
        const latestItemCreated = JSON.parse(localStorage.getItem('latestItemCreated'));
        localStorage.setItem('latestItemCreated', JSON.stringify({
            ...latestItemCreated,
            ...valuationData
        }));
    }
}
async function saveItemValuation(itemId, estimatedValuationData) {
    if (!estimatedValuationData?.minPriceEstimate && !estimatedValuationData?.decline) return;
    const estimatedData = {
        estimatedValuation: estimatedValuationData,
        newMinPriceEstimate: estimatedValuationData.minPriceEstimate,
        newMaxPriceEstimate: estimatedValuationData.maxPriceEstimate,
        ...estimatedValuationData.decline || estimatedValuationData.humanCheckNeeded ? {} : {
            valuationStatus: 'Completed',
            valuationDate: new Date().toISOString(),
            infoRequests: {
                price: {
                    type: 'MLValuation',
                    status: 'Active',
                    response: '',
                    description: "Vi b\xf6rjar med startpriset, och justerar successivt ner till l\xe4gsta priset under s\xe4ljperioden p\xe5 30 dagar. V\xe4rderingen utg\xe5r fr\xe5n vad liknande s\xe5lts f\xf6r.",
                    minPrice: estimatedValuationData.minPriceEstimate,
                    maxPrice: estimatedValuationData.maxPriceEstimate
                }
            }
        }
    };
    await saveValuationInStorageOrBackend(estimatedData, itemId);
}
function round10(val) {
    return Math.round((val || 0) / 10) * 10;
}
function shouldUseResellValuation(resellItem) {
    return resellItem.status !== 'Sold' && resellItem.valuatedBy && ![
        'Tobias Rosman',
        'Mai Development'
    ].includes(resellItem.valuatedBy);
}
async function setValuationFromResellItem(resellItem, itemId) {
    const maxPrice = resellItem.status === 'Sold' ? resellItem.maxPriceEstimate : Math.min(resellItem.maxPriceEstimate, Math.max(resellItem.minPriceEstimate + 150, round10(resellItem.minPriceEstimate * 1.3)));
    const valuationData = {
        valuationStatus: 'Completed',
        valuationDate: new Date().toISOString(),
        newMinPriceEstimate: resellItem.minPriceEstimate,
        newMaxPriceEstimate: maxPrice,
        infoRequests: {
            price: {
                status: 'Active',
                response: '',
                description: "Vi b\xf6rjar med startpriset, och justerar successivt ner till l\xe4gsta priset under s\xe4ljperioden p\xe5 30 dagar. V\xe4rderingen utg\xe5r fr\xe5n vad liknande s\xe5lts f\xf6r.",
                minPrice: resellItem.minPriceEstimate,
                maxPrice: maxPrice,
                type: 'Valuation',
                source: 'createdFromItem',
                adjustmentAllowed: true
            }
        }
    };
    await saveValuationInStorageOrBackend(valuationData, itemId);
}
async function getAndSaveValuation(itemId, item) {
    if (!itemId && !item) {
        console.error('No item and no itemId, unexpected!!');
        return '/item-confirmation';
    }
    if (params.id && params.type !== 'draft') {
        const getItemResponse = await callBackendApi(`/api/items/${params.id}`);
        const resellItem = getItemResponse.data;
        if (shouldUseResellValuation(resellItem)) {
            await setValuationFromResellItem(resellItem, itemId);
            return '/item-valuation';
        }
    }
    try {
        const res = await callBackendApi('/api/valuation/estimate', {
            data: {
                itemId,
                item
            },
            requiresAuth: false
        });
        const { minPriceEstimate: minPrice, maxPriceEstimate: maxPrice, decline } = res.data || {};
        await saveItemValuation(itemId, res.data);
        return nextStepAfterValuation(minPrice && maxPrice, decline, needsHumanCheck(res.data));
    } catch (e) {
        console.error('Failed to get ml valuation', e);
    }
    return nextStepAfterValuation();
}
function nextStepAfterValuation(valuationPresent, decline, valuationNeedsChecking) {
    if (!valuationPresent || valuationNeedsChecking) {
        if (sessionStorage.getItem('itemToBeCreatedAfterSignIn')) return '/sign-in';
        const userPhoneSet = user.current?.phoneNumber?.length;
        return userPhoneSet ? '/item-confirmation' : '/user-contact';
    }
    return '/item-valuation';
}
function defaultFormState() {
    return {
        acceptPrice: null,
        age: null,
        brand: null,
        category: null,
        color: null,
        condition: null,
        defectDescription: null,
        defects: [],
        images: {},
        material: null,
        model: null,
        originalPrice: null,
        userValuationApproval: true,
        sex: "Woman",
        size: null,
        userComment: null
    };
}
function collect() {
    let sex = "";
    const now = new Date();
    let shippingStatus = "Not sent";
    const size = itemSize.value;
    const material = itemMaterial.value ? itemMaterial.value.trim() : "";
    const brand = itemBrand.value ? itemBrand.value.trim() : "";
    const model = itemModel.value ? itemModel.value.trim() : "";
    const originalPrice = Number(itemOriginalPrice.value);
    const age = itemAge.value;
    const condition = itemCondition.value;
    const defectDescription = itemDefectDescription.value ? itemDefectDescription.value.trim() : "";
    const userComment = itemUserComment.value ? itemUserComment.value.trim() : "";
    const acceptPrice = Number(itemLowestAcceptPrice.value);
    // Get defects list
    let defectElements = new Map().set("hole", hole.checked).set("stain", stain.checked).set("lostFit", lostFit.checked).set("pilling", pilling.checked).set("threadUp", threadUp.checked).set("colorChange", colorChange.checked).set("otherDefect", otherDefect.checked);
    let defects = [];
    if (condition === "Anv\xe4nd, tecken p\xe5 slitage" || condition === "Anv\xe4nd, tydligt slitage") defectElements.forEach((value, key)=>{
        if (value) {
            let string = defectsChoicesInSwedish().get(key);
            defects.push(string);
        }
    });
    // Get radio buttons
    var sexRadioButtons = document.getElementsByName("Sex");
    for(var x = 0; x < sexRadioButtons.length; x++)if (sexRadioButtons[x].checked) sex = sexRadioButtons[x].id;
    const modelBoxFilled = document.getElementById('findModelBoxFilled');
    let modelVariantFields = {};
    if (modelBoxFilled.style.display === 'flex') modelVariantFields = JSON.parse(modelBoxFilled.getAttribute('data-model'));
    const images = JSON.parse(localStorage.getItem('newItem') || '{}').images;
    return {
        user: authUser.current?.uid || null,
        createdAt: now.toISOString(),
        status,
        shippingStatus,
        sex,
        size,
        material,
        color: itemColor.value,
        category: itemCategory.value,
        brand,
        model,
        originalPrice,
        age,
        condition,
        defects,
        defectDescription,
        userComment,
        acceptPrice,
        preferences: {
            userValuationApproval: true
        },
        modelVariantFields,
        images: images || {}
    };
}
async function getShippingMethod() {
    // If first time: User chooses shipping method preference in sell item form
    let shippingMethod = 'Service point';
    if (!user.current?.preferences?.shippingMethod) {
        if (authUser.current) await callBackendApi('/api/users', {
            data: {
                preferences: {
                    shippingMethod
                }
            },
            method: 'PUT'
        });
        else sessionStorage.setItem('shippingMethod', shippingMethod);
    } else shippingMethod = user.current?.preferences?.shippingMethod;
    return shippingMethod;
}
async function addItemInner(id, status1 = 'New') {
    const { modelVariantFields: { coverImage: modelCoverImageUrl, atVariantId: atModelVariantId, id: modelId }, images, ...pageData } = collect();
    const shippingMethod = await getShippingMethod();
    const modelConfirmed = modelSuggestButtons?.style?.display === 'none';
    if (modelConfirmed && modelCoverImageUrl) images['modelImage'] = modelCoverImageUrl;
    const createdFromItem = params.id && params.type !== 'draft' ? {
        createdFromItem: params.id
    } : {};
    const isCreatedFromItem = !!Object.keys(createdFromItem).length;
    const draftSource = status1 === 'Draft' ? {
        draftSource: isCreatedFromItem ? 'Mai purchase' : 'Sell item'
    } : {};
    const item = {
        ...pageData,
        status: status1,
        ...draftSource,
        shippingMethod,
        images,
        ...createdFromItem,
        ...modelConfirmed && {
            atModelVariantId,
            modelId
        },
        version: "2"
    };
    if (!authUser.current) {
        localStorage.removeItem('detectedModel');
        sessionStorage.setItem('itemToBeCreatedAfterSignIn', JSON.stringify({
            id,
            item
        }));
    } else {
        const createItemResponse = await callBackendApi(`/api/items/${id}`, {
            data: {
                item
            }
        });
        await trackUserActivated();
        await setCampaignCoupon();
        if (status1 !== 'Draft') {
            localStorage.removeItem('newItem');
            localStorage.removeItem('detectedModel');
            sessionStorage.removeItem('newItemId');
            localStorage.setItem('latestItemCreated', JSON.stringify(createItemResponse.data));
        }
        //Archive if "createdFromItem" is same seller
        if (isCreatedFromItem) {
            const createdFromItemUserId = await getCreatedFromItemUserId(params.id);
            if (createdFromItemUserId === authUser.current.uid) await db.collection('items').doc(params.id).update({
                'archived': true
            });
        }
    }
    return {
        ...item,
        id
    };
}
async function getCreatedFromItemUserId(itemId) {
    console.log('getCreatedFromItemUserId()');
    const item = await db.collection("items").doc(itemId).get();
    if (!item.exists) return null;
    return item.data().user;
}
function validateForm() {
    document.getElementById('wf-form-Add-Item').reportValidity();
    const invalidElements = document.getElementById('wf-form-Add-Item').querySelectorAll(':invalid');
    const element = invalidElements?.[0];
    if (element && element.getBoundingClientRect().height <= 1) element.style.cssText = 'width:100% !important;height:100% !important;';
    setTimeout(()=>{
        if (invalidElements.length > 0) {
            if (!isElementInView(element)) {
                const y = element.getBoundingClientRect().top + window.scrollY - 40;
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
            document.getElementById('wf-form-Add-Item').reportValidity();
        }
    }, 300);
}
function initializeInputEventListeners() {
    itemBrand.addEventListener('input', (0, _sellItemHelpers.fieldLabelToggle)('itemBrandLabel'));
    itemBrand.addEventListener('input', clearConfirmButtonValidity);
    itemModel.addEventListener('input', (0, _sellItemHelpers.fieldLabelToggle)('itemModelLabel'));
    itemSize.addEventListener('input', (0, _sellItemHelpers.fieldLabelToggle)('itemSizeLabel'));
    itemSize.addEventListener('input', clearConfirmButtonValidity);
    itemMaterial.addEventListener('input', (0, _sellItemHelpers.fieldLabelToggle)('itemMaterialLabel'));
    itemMaterial.addEventListener('input', clearConfirmButtonValidity);
    itemOriginalPrice.addEventListener('input', (0, _sellItemHelpers.fieldLabelToggle)('itemOriginalPriceLabel'));
    itemAge.addEventListener('input', (0, _sellItemHelpers.fieldLabelToggle)('itemAgeLabel'));
    itemCondition.addEventListener('input', (0, _sellItemHelpers.fieldLabelToggle)('itemConditionLabel'));
    itemColor.addEventListener('change', (0, _sellItemHelpers.fieldLabelToggle)('itemColorLabel'));
    itemColor.addEventListener('input', async (event)=>{
        clearConfirmButtonValidity(event);
        clearSuggestPills();
    });
    itemUserComment.addEventListener('input', (0, _sellItemHelpers.fieldLabelToggle)('userCommentLabel'));
    document.getElementById('saveItemDraftButton').addEventListener('click', async ()=>{
        document.getElementById('saveItemDraftButton').style.display = 'none';
        document.getElementById('saveDraftSpinner').style.display = 'flex';
        const id = sessionStorage.getItem('newItemId') || await (0, _sellItemHelpers.requestUniqueId)();
        const item = await addItemInner(id, 'Draft');
        itemDraftSaved = true;
        itemDraft = item;
        document.getElementById('clearItemForm').style.display = 'none';
        document.getElementById('saveDraftSpinner').style.display = 'none';
        document.getElementById('darkOverlay').style.display = 'block';
        const image = item.images?.enhancedFrontImageSmall || item.images?.enhancedFrontImage || item.images?.frontImage;
        if (image) {
            document.getElementById('popUpImage').src = image;
            document.getElementById('popUpImageDiv').style.display = 'block';
            document.getElementById('popUpCheckmark').style.display = 'none';
        } else {
            document.getElementById('popUpImage').src = '';
            document.getElementById('popUpImageDiv').style.display = 'none';
            document.getElementById('popUpCheckmark').style.display = 'block';
        }
        document.getElementById('itemDraftSavedPopup').style.display = 'flex';
    });
    document.getElementById('closeItemSavedPopup').addEventListener('click', ()=>{
        document.getElementById('itemDraftSavedPopup').style.display = 'none';
        document.getElementById('darkOverlay').style.display = 'none';
    });
    document.getElementById('popUpNewItem').addEventListener('click', ()=>{
        clearFormFields();
        location.href = '/sell-item';
    });
    document.getElementById('goToMyWardrobe').addEventListener('click', ()=>{
        window.location.href = '/private#wardrobe';
    });
    document.getElementById('addItemButton').addEventListener('click', validateForm);
    addItemForm.addEventListener("submit", ()=>addItem());
    userAddressForm.addEventListener("submit", addUserDetails);
}
function isElementInView(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) el = el[0];
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight / 2 || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}
async function setCampaignCoupon() {
    const campaignDateOk = new Intl.DateTimeFormat('se-SV').format(new Date()) <= '2024-08-18';
    if (campaignDateOk && getCookie('noCommissionCampaignCookie') === 'noCommission' && await userItemsCount() === 1) await callBackendApi('/api/users/noCommissionCoupon', {
        method: 'PUT'
    });
}
async function createItemAfterSignIn() {
    const itemFromStorage = JSON.parse(sessionStorage.getItem('itemToBeCreatedAfterSignIn'));
    sessionStorage.removeItem('itemToBeCreatedAfterSignIn');
    sessionStorage.removeItem('newItemId');
    await callBackendApi(`/api/items/${itemFromStorage.id}`, {
        data: itemFromStorage
    });
    await trackUserActivated();
    await setCampaignCoupon();
    localStorage.removeItem('newItem');
    itemFromStorage.item.id = itemFromStorage.id;
    localStorage.setItem('latestItemCreated', JSON.stringify(itemFromStorage.item));
}
const shouldSaveState = ()=>!(localStorage.getItem('latestItemCreated') || itemDraftSaved || params.id);
function rememberUnsavedChanges() {
    if (!shouldSaveState()) return;
    const { user: user1, createdAt, status: status1, shippingStatus, ...itemToSave } = collect();
    // Replace '' and {} with null values
    const item = Object.keys(itemToSave).reduce((acc, key)=>{
        acc[key] = itemToSave[key] === '' || isNaN(itemToSave[key]) && jQuery.isEmptyObject(itemToSave[key]) ? null : itemToSave[key];
        return acc;
    }, {});
    item.defects = item.defects ? item.defects : [];
    item.userValuationApproval = true;
    delete item.preferences;
    item.acceptPrice = item.acceptPrice && item.acceptPrice > 0 ? item.acceptPrice : null;
    item.originalPrice = item.originalPrice && item.originalPrice > 0 ? item.originalPrice : null;
    [
        'itemBrand',
        'itemSize',
        'itemMaterial',
        'itemColor',
        'itemCategory'
    ].forEach((inputName)=>{
        const suggestButtons = document.getElementById(inputName).parentNode.querySelector('.suggest-buttons') || document.getElementById(inputName).parentNode.parentNode.querySelector('.suggest-buttons');
        if (suggestButtons?.style?.display === 'block') item[`${inputName}Confirm`] = true;
    });
    const modelSuggestButtons1 = document.getElementById('modelSuggestButtons');
    if (modelSuggestButtons1?.style?.display === 'flex') item['itemModelConfirm'] = true;
    if (document.querySelector('#suggest-categories-div').style.display !== 'none') {
        item['categorySuggest1'] = document.querySelector('#categorySuggest1').innerText;
        if (document.querySelector('#categorySuggest2').style.display !== 'none') item['categorySuggest2'] = document.querySelector('#categorySuggest2').innerText;
    }
    if (document.querySelector('#suggest-colors-div').style.display !== 'none') {
        item['colorSuggest1'] = document.querySelector('#colorSuggest1').innerText;
        if (document.querySelector('#colorSuggest2').style.display !== 'none') item['colorSuggest2'] = document.querySelector('#colorSuggest2').innerText;
    }
    if (!isDefaultFormState(item)) localStorage.setItem('newItem', JSON.stringify(item));
    else localStorage.removeItem('newItem');
}
function isDraftItemChanged(itemState) {
    if (!itemDraft) return false;
    return itemStateDiffers(itemState, itemDraft);
}
function itemStateDiffers(itemState, defaultState) {
    for(const field in defaultState){
        if (!(field in itemState)) continue;
        if (defaultState[field] instanceof Object) {
            if (JSON.stringify(defaultState[field]) !== JSON.stringify(itemState[field])) return false;
            continue;
        }
        if (itemState[field] !== defaultState[field]) return false;
    }
    return true;
}
function isDefaultFormState(itemState) {
    return itemStateDiffers(itemState, defaultFormState());
}
function showSuggestButtons(fieldName, restoreSavedState, showConfirmation) {
    if (restoreSavedState && showConfirmation) {
        const suggestButtons = document.getElementById(fieldName).parentNode.querySelector('.suggest-buttons') || document.getElementById(fieldName).parentNode.parentNode.querySelector('.suggest-buttons');
        suggestButtons.style.display = 'block';
        document.getElementById(fieldName).setCustomValidity("Bekr\xe4fta eller \xe4ndra v\xe4rdet");
    }
}
async function fillForm(itemId, savedItem = null, restoreSavedState = false) {
    try {
        let item = {
            data: savedItem
        };
        let atItemResponse = null;
        if (!savedItem) {
            [item, atItemResponse] = await Promise.all([
                callBackendApi(`/api/items/${itemId}`),
                callBackendApi(`/api/items/${itemId}/atItem`)
            ]);
            itemDraft = item;
        }
        const atItem = atItemResponse?.data || {};
        const data = item.data;
        const images = data.images || {};
        let originalPrice = data.originalPrice;
        if (originalPrice <= 0) originalPrice = null;
        // Populate images
        for(const imageName in images){
            let urlSmall = images[`${imageName}Small`] || images[`${imageName}Medium`] || images[imageName] || images[`${imageName}Large`];
            let urlLarge = images[imageName] || images[`${imageName}Large`] || images[`${imageName}Medium`] || images[`${imageName}Small`];
            if (imageElements().includes(imageName)) {
                (0, _sellItemHelpers.rememberNewItemImageField)(imageName, urlLarge, urlSmall);
                if (imageName === 'frontImage') {
                    if (images.enhancedFrontImage) {
                        urlSmall = images['enhancedFrontImageSmall'] || images['enhancedFrontImageMedium'] || images['enhancedFrontImage'] || images['enhancedFrontImageLarge'];
                        urlLarge = images['enhancedFrontImage'] || images['enhancedFrontImageLarge'] || images['enhancedFrontImageMedium'] || images['enhancedFrontImageSmall'];
                        (0, _sellItemHelpers.rememberNewItemImageField)('enhancedFrontImage', urlLarge, urlSmall);
                    } else {
                        whenLoadingDivHidden(()=>(0, _sellItemHelpers.showLoadingIcon)(imageName));
                        // Don't await here to don't block the form from showing with the front image
                        (0, _sellItemHelpers.enhanceFrontImage)(urlLarge).then(()=>console.log('Image enhanced'));
                    }
                }
                (0, _sellItemHelpers.showImagePreview)(imageName, urlSmall);
                (0, _sellItemHelpers.showImageState)(imageName, 'success-state');
                document.getElementById(imageName).required = false;
            }
        }
        if (images.modelImage) {
            const modelImageLarge = images.modelImageLarge || images.modelImage;
            const modelImageSmall = images.modelImageSmall || images.modelImageMedium || images.modelImage;
            document.getElementById('coverImageContainer').style.backgroundImage = `url('${modelImageSmall}')`;
            document.getElementById('coverImagePreview').style.display = 'block';
            (0, _sellItemHelpers.rememberNewItemImageField)('modelImage', modelImageLarge, modelImageSmall);
        } else if (images.coverImage && !await isNoBgImage(images.coverImage)) {
            // Show cover image preview if it is a model image, if it is a noBg image we skip it
            sessionStorage.removeItem('coverImagePreviewUrl');
            const coverImageLarge = images.coverImageLarge || images.coverImage;
            const coverImageSmall = images.coverImage;
            document.getElementById('coverImageContainer').style.backgroundImage = `url('${coverImageSmall}')`;
            document.getElementById('coverImagePreview').style.display = 'block';
            (0, _sellItemHelpers.rememberNewItemImageField)('modelImage', coverImageLarge, coverImageSmall);
        }
        // Populate text input fields
        itemBrand.value = data.brand || '';
        showSuggestButtons('itemBrand', restoreSavedState, data.itemBrandConfirm);
        // Don't use the setFieldValue for the brand since that triggers a dropdown to open
        document.getElementById('itemBrandLabel').style.display = data.brand ? 'inline-block' : 'none';
        const modelDivShown = await (0, _sellItemModelSearch.displayFindModelDiv)(data.brand);
        if (modelDivShown) {
            const models = JSON.parse(sessionStorage.getItem('models'));
            let model = models?.find((m)=>m.id === data.modelId);
            if (!data.modelVariantFields && !model) {
                const response = await callBackendApi(`/api/models/${data.modelId}`);
                if (response.data) {
                    const { maiName, gender, maiCategory = '', collectionYear, brand } = response.data;
                    const { maiColor, coverImage, coverImageSmall } = response.data.variants[0];
                    model = {
                        maiName,
                        gender,
                        category: maiCategory,
                        maiColor,
                        coverImageSmall: coverImageSmall || coverImage,
                        brand,
                        coverImage,
                        collectionYear
                    };
                }
            }
            if (model || data.modelVariantFields) {
                if (restoreSavedState && data.itemModelConfirm) {
                    modelSuggestButtons.style.display = 'flex';
                    removeModelIcon.style.display = 'none';
                    (0, _sellItemModelSearch.showModelSuggestion)(model || data.modelVariantFields);
                } else {
                    (0, _sellItemModelSearch.showSelectedModel)(model || data.modelVariantFields);
                    modelSuggestButtons.style.display = 'none';
                    removeModelIcon.style.display = 'flex';
                }
            }
        }
        (0, _sellItemModelSearch.setFieldValue)('itemModel', data.model || atItem?.model);
        (0, _sellItemModelSearch.setFieldValue)('itemSize', data.size);
        showSuggestButtons('itemSize', restoreSavedState, data.itemSizeConfirm);
        (0, _sellItemModelSearch.setFieldValue)('itemMaterial', data.material);
        showSuggestButtons('itemMaterial', restoreSavedState, data.itemMaterialConfirm);
        (0, _sellItemModelSearch.setFieldValue)('itemOriginalPrice', originalPrice || atItem?.originalPrice);
        if (restoreSavedState) {
            (0, _sellItemModelSearch.setFieldValue)('itemUserComment', data.userComment);
            (0, _sellItemModelSearch.setFieldValue)('itemDefectDescription', data.defectDescription);
            (0, _sellItemModelSearch.setFieldValue)('itemLowestAcceptPrice', data.acceptPrice <= 0 ? null : data.acceptPrice);
            (0, _sellItemModelSearch.selectFieldValue)(itemCondition, data.condition);
        }
        if (params.id && data.status === 'Sold') document.getElementById('priceSettings').style.display = 'none';
        // Populate select fields
        (0, _sellItemModelSearch.selectFieldValue)(itemAge, data.age);
        (0, _sellItemModelSearch.selectFieldValue)(itemColor, data.color || atItem?.color);
        showSuggestButtons('itemColor', restoreSavedState, data.itemColorConfirm);
        if (data.itemColorConfirm && data.colorSuggest1) {
            document.querySelector('#colorSuggest1').innerText = data.colorSuggest1;
            if (data.colorSuggest2) {
                document.querySelector('#colorSuggest2').innerText = data.colorSuggest2;
                document.querySelector('#colorSuggest2').style.display = 'flex';
            } else document.querySelector('#colorSuggest2').style.display = 'none';
            document.querySelector('#suggest-colors-div').style.display = 'flex';
            document.querySelector('#suggest-colors-div').style.maxHeight = '200px';
        }
        if (itemCondition.selectedIndex >= 0 && (itemCondition.options[itemCondition.selectedIndex].text === "Anv\xe4nd, tecken p\xe5 slitage" || itemCondition.options[itemCondition.selectedIndex].text === "Anv\xe4nd, tydligt slitage")) defectInfoDiv.style.display = 'block';
        const itemCategory1 = $('#itemCategory');
        itemCategory1.val(data.category);
        itemCategory1.trigger('change');
        showSuggestButtons('itemCategory', restoreSavedState, data.itemCategoryConfirm);
        if (data.itemCategoryConfirm && data.categorySuggest1) {
            document.querySelector('#categorySuggest1').innerText = data.categorySuggest1;
            console.log('data.categorySuggest2', data.categorySuggest2);
            if (data.categorySuggest2) {
                document.querySelector('#categorySuggest2').innerText = data.categorySuggest2;
                document.querySelector('#categorySuggest2').style.display = 'flex';
            } else document.querySelector('#categorySuggest2').style.display = 'none';
            document.querySelector('#suggest-categories-div').style.display = 'flex';
            document.querySelector('#suggest-categories-div').style.maxHeight = '200px';
        }
        // Populate radio-buttons
        if (data.sex) {
            document.getElementById('Woman').previousElementSibling.classList.remove("w--redirected-checked"); // Unselect radio button 'Woman'
            document.getElementById('Woman').checked = false;
            document.getElementById(data.sex).previousElementSibling.classList.add("w--redirected-checked"); // Populate the right one
            document.getElementById(data.sex).checked = true;
        } else {
            document.getElementById('Woman').previousElementSibling.classList.add("w--redirected-checked"); // Unselect radio button 'Woman'
            document.getElementById('Woman').checked = true;
        }
        if (restoreSavedState) // Populate checkboxes
        defectsChoicesInSwedish().forEach((value, key)=>{
            if (data.defects && data.defects.includes(value)) {
                document.getElementById(key).previousElementSibling.classList.add("w--redirected-checked");
                document.getElementById(key).checked = true;
            }
        });
    } catch (error) {
        console.error("Error getting item document:", error);
        errorHandler.report(error);
    }
    document.getElementById('loadingDiv').style.display = 'none';
}
function whenLoadingDivHidden(cb) {
    const observer = new MutationObserver(cb);
    const elm = document.getElementById('loadingDiv');
    observer.observe(elm, {
        attributeFilter: [
            'style'
        ]
    });
}
async function checkAndDisplayShareSold(value) {
    const response = await callBackendApi(`/api/brands/shareSold?brand=${value}`);
    if (response.data && response.data.cleanedBrand) {
        console.log('data.shareSold', response.data.shareSold, 'data.cleanedBrand', response.data.cleanedBrand);
        if (response.data.shareSold >= '65%') {
            shareSoldText.innerHTML = `Det \xe4r h\xf6g efterfr\xe5gan p\xe5 ${response.data.cleanedBrand}`;
            shareSoldDiv.style.display = 'block';
            return;
        }
    } else {
        shareSoldText.innerHTML = '';
        shareSoldDiv.style.display = 'none';
    }
}
function initializeSelectColor() {
    const itemColor1 = document.getElementById("itemColor");
    itemColor1.onchange = function() {
        let input = this.value;
        if (input !== "") itemColor1.style.color = "#333";
        else itemColor1.style.color = "#929292";
    };
    // Change font color of dropdown itemAge when user selects a value
    const itemAge1 = document.getElementById("itemAge");
    itemAge1.onchange = function() {
        let input = this.value;
        if (input !== "") itemAge1.style.color = "#333";
        else itemAge1.style.color = "#929292";
    };
}
async function frontImageChangeHandler(event) {
    let input = this.files[0];
    if (input) {
        event.stopPropagation();
        const imageUrl = await (0, _sellItemHelpers.uploadImageAndShowPreview)(input, 'frontImage');
        if (!imageUrl || Object.keys(imageUrl).length === 0) return;
        const promises = [];
        promises.push(detectAndFillColor(imageUrl), detectAndFillBrandModelMaterialAndSize(imageUrl), (0, _sellItemHelpers.enhanceFrontImage)(imageUrl));
        await Promise.all(promises);
        rememberUnsavedChanges();
    }
}
async function brandTagImageChangeHandler(event) {
    let input = this.files[0];
    if (input) {
        event.stopPropagation();
        const imageUrl = await (0, _sellItemHelpers.uploadImageAndShowPreview)(input, 'brandTagImage');
        (0, _sellItemHelpers.showDeleteImageIcon)('brandTagImage');
        await detectAndFillBrandModelMaterialAndSize(imageUrl);
        rememberUnsavedChanges();
    }
}
async function productImageChangeHandler(event) {
    let input = this.files[0];
    if (input) {
        event.stopPropagation();
        const imageUrl = await (0, _sellItemHelpers.uploadImageAndShowPreview)(input, 'productImage');
        (0, _sellItemHelpers.showDeleteImageIcon)('productImage');
        await detectAndFillBrandModelMaterialAndSize(imageUrl);
        rememberUnsavedChanges();
    }
}
async function defectImageChangeHandler(event) {
    let input = this.files[0];
    if (input) {
        event.stopPropagation();
        const imageUrl = await (0, _sellItemHelpers.uploadImageAndShowPreview)(input, 'defectImage');
        (0, _sellItemHelpers.showDeleteImageIcon)('defectImage');
        await detectAndFillBrandModelMaterialAndSize(imageUrl);
        rememberUnsavedChanges();
    }
}
async function materialTagImageChangeHandler(event) {
    let input = this.files[0];
    if (input) {
        event.stopPropagation();
        const imageUrl = await (0, _sellItemHelpers.uploadImageAndShowPreview)(input, 'materialTagImage');
        (0, _sellItemHelpers.showDeleteImageIcon)('materialTagImage');
        await detectAndFillBrandModelMaterialAndSize(imageUrl);
        rememberUnsavedChanges();
    }
}
async function extraImageChangeHandler(event) {
    let input = this.files[0];
    if (input) {
        event.stopPropagation();
        const imageUrl = await (0, _sellItemHelpers.uploadImageAndShowPreview)(input, 'extraImage');
        (0, _sellItemHelpers.showDeleteImageIcon)('extraImage');
        await detectAndFillBrandModelMaterialAndSize(imageUrl);
        rememberUnsavedChanges();
    }
}
function clearConfirmButtonValidity(event) {
    event.currentTarget.setCustomValidity('');
    const suggestButtons = event.currentTarget.parentNode.querySelector('.suggest-buttons') || event.currentTarget.parentNode.parentNode.querySelector('.suggest-buttons');
    suggestButtons.style.display = 'none';
}
function clearSuggestPills() {
    document.querySelector('#itemColor').setCustomValidity('');
    document.querySelector('#suggest-colors-div').style.maxHeight = '0px';
    document.querySelector('#suggest-colors-div').style.display = 'none';
    document.querySelector('#colorSuggestButtons').style.display = 'none';
}
async function detectAndFillBrandModelMaterialAndSize(imageUrl) {
    try {
        if (document.querySelector('#itemBrand').value.length && document.querySelector('#itemMaterial').value.length && document.querySelector('#itemSize').value.length && document.querySelector('#itemModel').value.length) // Don't do anything if brand, material, size and model already filled in
        return;
        const [detectInfoResponse, detectCategoryResponse] = await Promise.all([
            callBackendApi('/api/images/detectInfo', {
                data: {
                    imageUrl,
                    brand: itemBrand.value,
                    color: itemColor.value
                },
                requiresAuth: false
            }),
            callBackendApi('/api/images/detectCategory', {
                data: {
                    imageUrl
                },
                requiresAuth: true
            })
        ]);
        if (!document.querySelector('#itemBrand').value.length && detectInfoResponse.data?.brand) {
            document.querySelector('#itemBrand').value = detectInfoResponse.data.brand;
            document.querySelector('#itemBrand').setCustomValidity("Bekr\xe4fta eller \xe4ndra m\xe4rket");
            document.getElementById('itemBrandLabel').style.display = 'inline-block';
            document.querySelector('#brandSuggestButtons').style.display = 'block';
            document.querySelector('#itemBrand').dispatchEvent(new Event('change'));
            await (0, _sellItemModelSearch.displayFindModelDiv)(detectInfoResponse.data.brand);
            analytics.track("Element Viewed", {
                elementID: "brandSuggestButtons"
            });
        }
        if (!document.querySelector('#itemMaterial').value.length && detectInfoResponse.data?.materials) {
            document.querySelector('#itemMaterial').value = detectInfoResponse.data.materials;
            document.querySelector('#itemMaterial').setCustomValidity("Bekr\xe4fta eller \xe4ndra materialet");
            document.getElementById('itemMaterialLabel').style.display = 'inline-block';
            document.querySelector('#materialSuggestButtons').style.display = 'block';
            document.querySelector('#itemMaterial').dispatchEvent(new Event('change'));
            analytics.track("Element Viewed", {
                elementID: "materialSuggestButtons"
            });
        }
        if (!document.querySelector('#itemSize').value.length && detectInfoResponse.data?.size) {
            document.querySelector('#itemSize').value = detectInfoResponse.data.size;
            document.querySelector('#itemSize').setCustomValidity("Bekr\xe4fta eller \xe4ndra storlek");
            document.getElementById('itemSizeLabel').style.display = 'inline-block';
            document.querySelector('#sizeSuggestButtons').style.display = 'block';
            document.querySelector('#itemSize').dispatchEvent(new Event('change'));
            analytics.track("Element Viewed", {
                elementID: "sizeSuggestButtons"
            });
        }
        if (!document.getElementById('itemModel').value.length && detectInfoResponse.data?.model) {
            const formBrandValue = document.getElementById('itemBrand').value;
            if (isBrandPartner(formBrandValue) && detectInfoResponse.data.model.brand === formBrandValue) (0, _sellItemModelSearch.showModelSuggestion)(detectInfoResponse.data.model);
            else localStorage.setItem('detectedModel', JSON.stringify(detectInfoResponse.data.model));
        }
        console.log('detectCategoryResponse.data.categoriesSv', detectCategoryResponse.data.categoriesSv);
        if (!document.querySelector('#itemCategory').value.length && detectCategoryResponse.data?.categoriesSv?.length) {
            document.querySelector('#itemCategory').value = detectCategoryResponse.data.categoriesSv[0];
            document.querySelector('#categorySuggestButtons').style.display = 'block';
            if (detectCategoryResponse.data.categoriesSv.length > 1) {
                document.querySelector('#categorySuggest1').innerText = detectCategoryResponse.data.categoriesSv[1];
                document.querySelector('#suggest-categories-div').style.maxHeight = '0px';
                document.querySelector('#suggest-categories-div').style.display = 'flex';
                document.querySelector('#suggest-categories-div').style.transition = 'max-height 300ms ease-in-out';
                // Need to trigger reflow before setting max-height for transition to work
                document.querySelector('#suggest-categories-div').offsetHeight;
                document.querySelector('#suggest-categories-div').style.maxHeight = '200px';
            }
            if (detectCategoryResponse.data.categoriesSv.length > 2) {
                document.querySelector('#categorySuggest2').innerText = detectCategoryResponse.data.categoriesSv[2];
                document.querySelector('#categorySuggest2').style.display = 'flex';
            } else document.querySelector('#categorySuggest2').style.display = 'none';
            document.querySelector('#itemCategory').dispatchEvent(new Event('change'));
            analytics.track("Element Viewed", {
                elementID: "categorySuggestButtons"
            });
        }
    } catch (e) {
        errorHandler.report(e);
        console.log('Error calling detectItemBrandAndMaterialAndSize', e);
    }
}
async function detectAndFillColor(imageUrl) {
    if (document.querySelector('#itemColor').value !== '') return;
    try {
        const response = await callBackendApi('/api/images/detectColor2', {
            data: {
                imageUrl
            },
            requiresAuth: true
        });
        if (!response.data?.colors || !response.data.colors.length) {
            console.log("Unable to detect product color");
            return;
        }
        console.log("response.data.colors", response.data.colors);
        if (!document.querySelector('#itemColor').value.length && response.data.colors?.[0]) {
            document.querySelector('#itemColor').value = response.data.colors?.[0];
            // TODO: Translate colors to swedish before setting colorSuggest1 & colorSuggest2
            if (response.data.colors.length > 1) {
                document.querySelector('#colorSuggest1').innerText = (0, _sellItemHelpers.colorMapping)[response.data.colors[1]];
                document.querySelector('#suggest-colors-div').style.maxHeight = '0px';
                document.querySelector('#suggest-colors-div').style.display = 'flex';
                document.querySelector('#suggest-colors-div').style.transition = 'max-height 300ms ease-in-out';
                // Need to trigger reflow before setting max-height for transition to work
                document.querySelector('#suggest-colors-div').offsetHeight;
                document.querySelector('#suggest-colors-div').style.maxHeight = '200px';
            }
            if (response.data.colors.length > 2) {
                document.querySelector('#colorSuggest2').innerText = (0, _sellItemHelpers.colorMapping)[response.data.colors[2]];
                document.querySelector('#colorSuggest2').style.display = 'flex';
            } else document.querySelector('#colorSuggest2').style.display = 'none';
        } else {
            console.log("Unable to set color from", response.data.colors?.[0]);
            return;
        }
        document.querySelector('#itemColor').setCustomValidity("Bekr\xe4fta eller \xe4ndra f\xe4rgen");
        document.querySelector('#colorSuggestButtons').style.display = 'block';
        document.querySelector('#itemColor').dispatchEvent(new Event('change'));
        analytics.track("Element Viewed", {
            elementID: "colorSuggestButtons"
        });
    } catch (e) {
        errorHandler.report(e);
        console.log('Error calling detectItemColor', e);
    }
}
function initializeMaterialConfirm() {
    document.getElementById('rejectMaterial').addEventListener('click', ()=>{
        document.querySelector('#itemMaterial').value = '';
        document.querySelector('#materialSuggestButtons').style.display = 'none';
        (0, _sellItemHelpers.fieldLabelToggle)('itemMaterialLabel');
        document.querySelector('#itemMaterial').setCustomValidity('');
    });
    document.getElementById('confirmMaterial').addEventListener('click', ()=>{
        document.querySelector('#itemMaterial').setCustomValidity('');
    });
}
function initializeBrandConfirm() {
    document.getElementById('rejectBrand').addEventListener('click', ()=>{
        document.querySelector('#itemBrand').value = '';
        document.querySelector('#brandSuggestButtons').style.display = 'none';
        document.querySelector('#itemBrand').setCustomValidity('');
        (0, _sellItemHelpers.fieldLabelToggle)('itemBrandLabel');
    });
    document.getElementById('confirmBrand').addEventListener('click', ()=>{
        document.querySelector('#itemBrand').setCustomValidity('');
        document.querySelector('#itemBrand').setCustomValidity('');
    });
}
function initializeModelConfirm() {
    document.getElementById('rejectModel').addEventListener('click', ()=>{
        document.getElementById('modelSuggestButtons').style.display = 'none';
        (0, _sellItemModelSearch.removeSelectedModel)();
        document.getElementById('findModelTitle').innerText = 'Modell';
        rememberUnsavedChanges();
    });
    document.getElementById('confirmModel').addEventListener('click', ()=>{
        const model = JSON.parse(document.getElementById('findModelBoxFilled').getAttribute("data-model"));
        document.getElementById('modelSuggestButtons').style.display = 'none';
        document.getElementById('findModelTitle').innerText = 'Modell';
        document.getElementById('removeModelIcon').style.display = 'flex';
        (0, _sellItemModelSearch.setFormValuesFromModel)(model, null, true);
    });
}
function initializeSaveFormButton() {
    const saveItemDraftDiv = document.getElementById('saveItemDraftDiv');
    function showButtonIfFormChanged(event) {
        if (!params.id && !itemDraftSaved || params.id && params.type !== 'resell' && params.type !== 'draft') return;
        let field = event.target;
        if (field instanceof Element) {
            const defaultValue = itemDraft[field.name];
            if (defaultValue !== field.value && field.value !== '') saveItemDraftDiv.style.display = 'block';
        }
    }
    document.getElementById('wf-form-Add-Item').addEventListener('input', showButtonIfFormChanged);
    document.querySelector('#wf-form-Add-Item select').addEventListener('change', showButtonIfFormChanged);
    document.getElementById('saveItemDraft').addEventListener('click', async ()=>{
        saveItemDraftDiv.classList.add('saving');
        const id = params.type === 'resell' ? await (0, _sellItemHelpers.requestUniqueId)() : params.type === 'draft' ? params.id : itemDraft.id;
        await addItemInner(id, 'Draft');
        saveItemDraftDiv.classList.remove('saving');
        saveItemDraftDiv.classList.add('saved');
        setTimeout(()=>{
            saveItemDraftDiv.classList.remove('saved');
            saveItemDraftDiv.style.display = 'none';
        }, 1500);
    });
}
function initializeClearFormButton() {
    function showButtonIfFormChanged(event) {
        if (itemDraftSaved) return;
        let field = event.target;
        if (field instanceof Element) {
            const defaultValue = defaultFormState()[field.name];
            if (defaultValue !== field.value && field.value !== '') document.getElementById('clearItemForm').style.display = 'block';
        }
    }
    if (!params.id) {
        document.getElementById('wf-form-Add-Item').addEventListener('input', showButtonIfFormChanged);
        document.querySelector('#wf-form-Add-Item select').addEventListener('change', showButtonIfFormChanged);
    }
}
function initializeSaveStateListeners() {
    // We delay the rememberUnsavedChanges call to allow any confirm/reject animations to finish
    document.getElementById('wf-form-Add-Item').querySelectorAll('input').forEach((elm)=>{
        elm.addEventListener('input', rememberUnsavedChanges);
    });
    document.getElementById('wf-form-Add-Item').querySelectorAll('input[type="radio"]').forEach((elm)=>{
        elm.addEventListener('change', rememberUnsavedChanges);
    });
    document.getElementById('wf-form-Add-Item').querySelectorAll('input[type="checkbox"]').forEach((elm)=>{
        elm.addEventListener('change', rememberUnsavedChanges);
    });
    // We delay the rememberUnsavedChanges call to allow any confirm/reject animations to finish
    document.getElementById('wf-form-Add-Item').querySelectorAll('select').forEach((elm)=>{
        elm.addEventListener('change', rememberUnsavedChanges);
    });
    document.getElementById('wf-form-Add-Item').querySelectorAll('textarea').forEach((elm)=>{
        elm.addEventListener('input', rememberUnsavedChanges);
    });
}
function initializeRestoreOnNavigation() {
    window.addEventListener('pageshow', (event)=>{
        if (event.persisted && localStorage.getItem('newItem')) // Use setTimeout to make sure the document is loaded before we call fillForm()
        setTimeout(async ()=>{
            await fillForm(null, JSON.parse(localStorage.getItem('newItem')), true);
        }, 10);
    });
}
function initializeCategoryConfirm() {
    document.getElementById('categorySuggest1').addEventListener('click', ()=>{
        document.querySelector('#categorySuggestButtons').style.display = 'none';
        document.getElementById('itemCategory').value = document.querySelector('#categorySuggest1').innerText;
        $('#itemCategory').trigger('change');
        document.querySelector('#suggest-categories-div').style.maxHeight = '0px';
        setTimeout(()=>{
            document.querySelector('#suggest-categories-div').style.display = 'none';
        }, 300);
        document.querySelector('#itemCategory').setCustomValidity('');
    });
    document.getElementById('categorySuggest2').addEventListener('click', ()=>{
        document.querySelector('#categorySuggestButtons').style.display = 'none';
        document.querySelector('#itemCategory').setCustomValidity('');
        document.getElementById('itemCategory').value = document.querySelector('#categorySuggest2').innerText;
        $('#itemCategory').trigger('change');
        document.querySelector('#suggest-categories-div').style.maxHeight = '0px';
        setTimeout(()=>{
            document.querySelector('#suggest-categories-div').style.display = 'none';
        }, 300);
    });
    document.getElementById('categorySuggestMore').addEventListener('click', ()=>{
        $('#itemCategory').select2('open');
    });
    document.getElementById('rejectCategory').addEventListener('click', ()=>{
        $('#itemCategory').val('');
        $('#itemCategory').trigger('change');
        document.querySelector('#suggest-categories-div').style.maxHeight = '0px';
        document.querySelector('#suggest-categories-div').style.display = 'none';
        (0, _sellItemHelpers.fieldLabelToggle)('itemCategoryLabel');
        document.querySelector('#itemCategory').setCustomValidity('');
        document.querySelector('#categorySuggestButtons').style.display = 'none';
    });
    document.getElementById('confirmCategory').addEventListener('click', ()=>{
        document.querySelector('#itemCategory').setCustomValidity('');
        document.querySelector('#suggest-categories-div').style.maxHeight = '0px';
        document.querySelector('#suggest-categories-div').style.display = 'none';
    });
    $('#itemCategory').on('select2:select', ()=>{
        document.querySelector('#itemCategory').setCustomValidity('');
        document.querySelector('#suggest-categories-div').style.maxHeight = '0px';
        document.querySelector('#suggest-categories-div').style.display = 'none';
        document.querySelector('#categorySuggestButtons').style.display = 'none';
    });
}
function initializeSizeConfirm() {
    document.getElementById('rejectSize').addEventListener('click', ()=>{
        document.querySelector('#itemSize').value = '';
        document.querySelector('#sizeSuggestButtons').style.display = 'none';
        (0, _sellItemHelpers.fieldLabelToggle)('itemSizeLabel');
        document.querySelector('#itemSize').setCustomValidity('');
    });
    document.getElementById('confirmSize').addEventListener('click', ()=>{
        document.querySelector('#itemSize').setCustomValidity('');
    });
}
function initializeSuggestButtonsSaveState() {
    const observer = new MutationObserver((mutationsList, observer)=>{
        const mutatedElement = mutationsList.find((elm)=>elm.attributeName === 'style');
        if (mutatedElement && mutatedElement.target.style.display === 'none') rememberUnsavedChanges();
    });
    Array.from(document.querySelectorAll('.suggest-buttons')).forEach((elm)=>observer.observe(elm, {
            attributes: true
        }));
}
function initializeColorConfirm() {
    document.getElementById('colorSuggest1').addEventListener('click', ()=>{
        document.querySelector('#colorSuggestButtons').style.display = 'none';
        const selectEntry = Object.entries((0, _sellItemHelpers.colorMapping)).find(([key, value])=>value == document.querySelector('#colorSuggest1').innerText);
        document.getElementById('itemColor').value = selectEntry[0];
        document.querySelector('#suggest-colors-div').style.maxHeight = '0px';
        setTimeout(()=>{
            document.querySelector('#suggest-colors-div').style.display = 'none';
        }, 300);
        document.querySelector('#itemColor').setCustomValidity('');
    });
    document.getElementById('colorSuggest2').addEventListener('click', ()=>{
        document.querySelector('#colorSuggestButtons').style.display = 'none';
        document.querySelector('#itemColor').setCustomValidity('');
        const selectEntry = Object.entries((0, _sellItemHelpers.colorMapping)).find(([key, value])=>value == document.querySelector('#colorSuggest2').innerText);
        document.getElementById('itemColor').value = selectEntry[0];
        document.querySelector('#suggest-colors-div').style.maxHeight = '0px';
        setTimeout(()=>{
            document.querySelector('#suggest-colors-div').style.display = 'none';
        }, 300);
    });
    document.getElementById('rejectColor').addEventListener('click', ()=>{
        document.querySelector('#itemColor').value = '';
        document.querySelector('#colorSuggestButtons').style.display = 'none';
        (0, _sellItemHelpers.fieldLabelToggle)('itemColorLabel');
        document.querySelector('#itemColor').setCustomValidity('');
    });
    document.getElementById('confirmColor').addEventListener('click', ()=>{
        document.querySelector('#itemColor').setCustomValidity('');
    });
}
function clearFormFields() {
    localStorage.removeItem('detectedModel');
    (0, _sellItemModelSearch.removeSelectedModel)();
    document.getElementById('findModelDiv').style.display = 'none';
    document.getElementById('clearItemForm').style.display = 'none';
    imageElements().forEach((imageName)=>{
        document.getElementById(`${imageName}Preview`).style.backgroundImage = '';
        (0, _sellItemHelpers.showImageState)(imageName, 'default-state');
    });
    (0, _sellItemModelSearch.setFieldValue)('itemBrand', null);
    Array.from(document.querySelectorAll('.suggest-buttons')).forEach((el)=>el.style.display = 'none');
    (0, _sellItemModelSearch.setFieldValue)('itemSize', null);
    (0, _sellItemModelSearch.setFieldValue)('itemMaterial', null);
    (0, _sellItemModelSearch.setFieldValue)('itemModel', null);
    (0, _sellItemModelSearch.setFieldValue)('itemOriginalPrice', null);
    (0, _sellItemModelSearch.setFieldValue)('itemUserComment', null);
    (0, _sellItemModelSearch.setFieldValue)('itemDefectDescription', null);
    (0, _sellItemModelSearch.setFieldValue)('itemLowestAcceptPrice', null);
    (0, _sellItemModelSearch.selectFieldValue)(itemAge, '');
    (0, _sellItemModelSearch.selectFieldValue)(itemColor, '');
    (0, _sellItemModelSearch.selectFieldValue)(itemCondition, '');
    defectInfoDiv.style.display = 'none';
    const itemCategory1 = $('#itemCategory');
    itemCategory1.val('');
    itemCategory1.trigger('change');
    document.querySelector('#suggest-categories-div').style.display = 'none';
    // Populate radio-buttons
    document.getElementById('Man').previousElementSibling.classList.remove("w--redirected-checked");
    document.getElementById('Man').checked = false;
    document.getElementById('Unisex').previousElementSibling.classList.remove("w--redirected-checked");
    document.getElementById('Unisex').checked = false;
    document.getElementById('Woman').previousElementSibling.classList.add("w--redirected-checked"); // select radio button 'Woman'
    document.getElementById('Woman').checked = true;
    // Populate checkboxes
    defectsChoicesInSwedish().forEach((value, key)=>{
        document.getElementById(key).previousElementSibling.classList.remove("w--redirected-checked");
        document.getElementById(key).checked = false;
    });
    sessionStorage.removeItem('newItemId');
    localStorage.removeItem('newItem');
}
function initializeDeleteImageListeners() {
    imageElements().forEach((imageName)=>{
        document.getElementById(`delete${(0, _sellItemHelpers.capitalizeFirstLetter)(imageName)}Icon`).addEventListener('click', ()=>{
            removeSavedImage(imageName);
            (0, _sellItemHelpers.hideImageError)(imageName);
        });
    });
    document.getElementById("deleteFrontImageIcon").addEventListener('click', ()=>{
        document.getElementById("frontImage").required = true;
        (0, _sellItemHelpers.showImageState)('frontImgae', 'default-state');
        removeSavedImage('enhancedFrontImage');
    });
    document.getElementById("deleteBrandTagImageIcon").addEventListener('click', ()=>{
        document.getElementById("brandTagImage").required = true;
    });
}
function removeSavedImage(imageName) {
    const newItem = JSON.parse(localStorage.getItem('newItem'));
    delete newItem?.images?.[imageName];
    delete newItem?.images?.[`${imageName}Small`];
    localStorage.setItem('newItem', JSON.stringify(newItem));
}
const BLACK_LIST = [
    'se',
    'bild',
    'vet',
    'ej',
    "fl\xe4tad",
    'klack',
    "\xf6verdel",
    'grovt',
    "h\xe4lrem",
    'vind',
    'och',
    "vattent\xe5lig",
    'utsida',
    'tillverkad',
    'av',
    'woolrichs',
    'signatur',
    'blandning',
    'avslutad',
    'med',
    'en',
    'speciell',
    "teflonbel\xe4ggning",
    "f\xf6r",
    'extra',
    'skydd',
    'ankdun',
    'vadderingen',
    'avtagbar',
    "tv\xe4ttbj\xf6rnsp\xe4ls",
    "p\xe5",
    'luvan'
];
const blackListSet = new Set(BLACK_LIST);
const blackListed = (s)=>blackListSet.has(s?.toLowerCase());
const partsMatch = (s0, s1)=>{
    return !blackListed(s0) && !blackListed(s1) && (s0.indexOf(s1) > -1 || s1.indexOf(s0) > -1);
};
const isNoBgImage = async (source)=>{
    const getImageMeta = async (url)=>{
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        await img.decode();
        return img;
    };
    const checkUniformColor = (data)=>{
        const [r, g, b, a] = [
            data[0],
            data[1],
            data[2],
            data[3]
        ];
        for(let i = 4; i < data.length; i += 4){
            if (data[i] !== r || data[i + 1] !== g || data[i + 2] !== b || data[i + 3] !== a) return false;
        }
        return true;
    };
    try {
        if (source.match(/nobg|no-bg/i)) return true;
        const img = await getImageMeta(source);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", {
            willReadFrequently: true
        });
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
        const topBorder = ctx.getImageData(0, 0, img.naturalWidth, 10).data;
        const bottomBorder = ctx.getImageData(0, img.naturalHeight, img.naturalWidth, -10).data;
        const leftBorder = ctx.getImageData(0, 0, 10, img.naturalHeight).data;
        const rightBorder = ctx.getImageData(img.naturalWidth, 0, -10, img.naturalHeight).data;
        return checkUniformColor(topBorder) && checkUniformColor(bottomBorder) && checkUniformColor(leftBorder) && checkUniformColor(rightBorder);
    } catch (e) {
        console.error(e);
        // If we cannot load the image, play it safe and assume it is the no-bg image
        return true;
    }
};
// Call sellItemMainAuthenticated after/when a user has logged in
user.whenSet(sellItemMainAuthenticated);
// Call sellItemMain directly
sellItemMain();

},{"./sellItemHelpers":"8xEoj","qrcode":"lB7MY","./general":"lWrRo","./autocomplete-brands":"aDjZV","./sellItemModelSearch":"a9ry4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8xEoj":[function(require,module,exports,__globalThis) {
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

},{}],"lB7MY":[function(require,module,exports,__globalThis) {
const canPromise = require("da1f68cc1fc16077");
const QRCode = require("8c6cf49ef2287430");
const CanvasRenderer = require("8a60cf7722cc14ce");
const SvgRenderer = require("f6fcc816b915ba37");
function renderCanvas(renderFunc, canvas, text, opts, cb) {
    const args = [].slice.call(arguments, 1);
    const argsNum = args.length;
    const isLastArgCb = typeof args[argsNum - 1] === 'function';
    if (!isLastArgCb && !canPromise()) throw new Error('Callback required as last argument');
    if (isLastArgCb) {
        if (argsNum < 2) throw new Error('Too few arguments provided');
        if (argsNum === 2) {
            cb = text;
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 3) {
            if (canvas.getContext && typeof cb === 'undefined') {
                cb = opts;
                opts = undefined;
            } else {
                cb = opts;
                opts = text;
                text = canvas;
                canvas = undefined;
            }
        }
    } else {
        if (argsNum < 1) throw new Error('Too few arguments provided');
        if (argsNum === 1) {
            text = canvas;
            canvas = opts = undefined;
        } else if (argsNum === 2 && !canvas.getContext) {
            opts = text;
            text = canvas;
            canvas = undefined;
        }
        return new Promise(function(resolve, reject) {
            try {
                const data = QRCode.create(text, opts);
                resolve(renderFunc(data, canvas, opts));
            } catch (e) {
                reject(e);
            }
        });
    }
    try {
        const data = QRCode.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
    } catch (e) {
        cb(e);
    }
}
exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
// only svg for now.
exports.toString = renderCanvas.bind(null, function(data, _, opts) {
    return SvgRenderer.render(data, opts);
});

},{"da1f68cc1fc16077":"9FrZa","8c6cf49ef2287430":"20hbG","8a60cf7722cc14ce":"2oGFV","f6fcc816b915ba37":"7Akrj"}],"9FrZa":[function(require,module,exports,__globalThis) {
// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
module.exports = function() {
    return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};

},{}],"20hbG":[function(require,module,exports,__globalThis) {
const Utils = require("4cf6a8173d9f3a2");
const ECLevel = require("2ad62f61c352884c");
const BitBuffer = require("87d5a6270eb1dc26");
const BitMatrix = require("91abc94f777368cc");
const AlignmentPattern = require("9737c3939ab85d95");
const FinderPattern = require("cee3d371e219e45e");
const MaskPattern = require("8700c8c682afabf3");
const ECCode = require("65ad903a6ba3e");
const ReedSolomonEncoder = require("1e8e447afb4d169c");
const Version = require("8a4a19af97836d80");
const FormatInfo = require("26720f9d94c9e268");
const Mode = require("7b6429a248ecc51f");
const Segments = require("1368d0fa14524351");
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/ /**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupFinderPattern(matrix, version) {
    const size = matrix.size;
    const pos = FinderPattern.getPositions(version);
    for(let i = 0; i < pos.length; i++){
        const row = pos[i][0];
        const col = pos[i][1];
        for(let r = -1; r <= 7; r++){
            if (row + r <= -1 || size <= row + r) continue;
            for(let c = -1; c <= 7; c++){
                if (col + c <= -1 || size <= col + c) continue;
                if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) matrix.set(row + r, col + c, true, true);
                else matrix.set(row + r, col + c, false, true);
            }
        }
    }
}
/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */ function setupTimingPattern(matrix) {
    const size = matrix.size;
    for(let r = 8; r < size - 8; r++){
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
    }
}
/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupAlignmentPattern(matrix, version) {
    const pos = AlignmentPattern.getPositions(version);
    for(let i = 0; i < pos.length; i++){
        const row = pos[i][0];
        const col = pos[i][1];
        for(let r = -2; r <= 2; r++){
            for(let c = -2; c <= 2; c++)if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) matrix.set(row + r, col + c, true, true);
            else matrix.set(row + r, col + c, false, true);
        }
    }
}
/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */ function setupVersionInfo(matrix, version) {
    const size = matrix.size;
    const bits = Version.getEncodedBits(version);
    let row, col, mod;
    for(let i = 0; i < 18; i++){
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
    }
}
/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */ function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
    const size = matrix.size;
    const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
    let i, mod;
    for(i = 0; i < 15; i++){
        mod = (bits >> i & 1) === 1;
        // vertical
        if (i < 6) matrix.set(i, 8, mod, true);
        else if (i < 8) matrix.set(i + 1, 8, mod, true);
        else matrix.set(size - 15 + i, 8, mod, true);
        // horizontal
        if (i < 8) matrix.set(8, size - i - 1, mod, true);
        else if (i < 9) matrix.set(8, 15 - i - 1 + 1, mod, true);
        else matrix.set(8, 15 - i - 1, mod, true);
    }
    // fixed module
    matrix.set(size - 8, 8, 1, true);
}
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */ function setupData(matrix, data) {
    const size = matrix.size;
    let inc = -1;
    let row = size - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    for(let col = size - 1; col > 0; col -= 2){
        if (col === 6) col--;
        while(true){
            for(let c = 0; c < 2; c++)if (!matrix.isReserved(row, col - c)) {
                let dark = false;
                if (byteIndex < data.length) dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                matrix.set(row, col - c, dark);
                bitIndex--;
                if (bitIndex === -1) {
                    byteIndex++;
                    bitIndex = 7;
                }
            }
            row += inc;
            if (row < 0 || size <= row) {
                row -= inc;
                inc = -inc;
                break;
            }
        }
    }
}
/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */ function createData(version, errorCorrectionLevel, segments) {
    // Prepare data buffer
    const buffer = new BitBuffer();
    segments.forEach(function(data) {
        // prefix data with mode indicator (4 bits)
        buffer.put(data.mode.bit, 4);
        // Prefix data with character count indicator.
        // The character count indicator is a string of bits that represents the
        // number of characters that are being encoded.
        // The character count indicator must be placed after the mode indicator
        // and must be a certain number of bits long, depending on the QR version
        // and data mode
        // @see {@link Mode.getCharCountIndicator}.
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        // add binary data sequence to buffer
        data.write(buffer);
    });
    // Calculate required number of bits
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    // Add a terminator.
    // If the bit string is shorter than the total number of required bits,
    // a terminator of up to four 0s must be added to the right side of the string.
    // If the bit string is more than four bits shorter than the required number of bits,
    // add four 0s to the end.
    if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) buffer.put(0, 4);
    // If the bit string is fewer than four bits shorter, add only the number of 0s that
    // are needed to reach the required number of bits.
    // After adding the terminator, if the number of bits in the string is not a multiple of 8,
    // pad the string on the right with 0s to make the string's length a multiple of 8.
    while(buffer.getLengthInBits() % 8 !== 0)buffer.putBit(0);
    // Add pad bytes if the string is still shorter than the total number of required bits.
    // Extend the buffer to fill the data capacity of the symbol corresponding to
    // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
    // and 00010001 (0x11) alternately.
    const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
    for(let i = 0; i < remainingByte; i++)buffer.put(i % 2 ? 0x11 : 0xEC, 8);
    return createCodewords(buffer, version, errorCorrectionLevel);
}
/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */ function createCodewords(bitBuffer, version, errorCorrectionLevel) {
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    const dataTotalCodewords = totalCodewords - ecTotalCodewords;
    // Total number of blocks
    const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
    // Calculate how many blocks each group should contain
    const blocksInGroup2 = totalCodewords % ecTotalBlocks;
    const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
    const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
    const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
    // Number of EC codewords is the same for both groups
    const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
    // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
    const rs = new ReedSolomonEncoder(ecCount);
    let offset = 0;
    const dcData = new Array(ecTotalBlocks);
    const ecData = new Array(ecTotalBlocks);
    let maxDataSize = 0;
    const buffer = new Uint8Array(bitBuffer.buffer);
    // Divide the buffer into the required number of blocks
    for(let b = 0; b < ecTotalBlocks; b++){
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        // extract a block of data from buffer
        dcData[b] = buffer.slice(offset, offset + dataSize);
        // Calculate EC codewords for this data block
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
    }
    // Create final data
    // Interleave the data and error correction codewords from each block
    const data = new Uint8Array(totalCodewords);
    let index = 0;
    let i, r;
    // Add data codewords
    for(i = 0; i < maxDataSize; i++){
        for(r = 0; r < ecTotalBlocks; r++)if (i < dcData[r].length) data[index++] = dcData[r][i];
    }
    // Apped EC codewords
    for(i = 0; i < ecCount; i++)for(r = 0; r < ecTotalBlocks; r++)data[index++] = ecData[r][i];
    return data;
}
/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */ function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
    let segments;
    if (Array.isArray(data)) segments = Segments.fromArray(data);
    else if (typeof data === 'string') {
        let estimatedVersion = version;
        if (!estimatedVersion) {
            const rawSegments = Segments.rawSplit(data);
            // Estimate best version that can contain raw splitted segments
            estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        // Build optimized segments
        // If estimated version is undefined, try with the highest version
        segments = Segments.fromString(data, estimatedVersion || 40);
    } else throw new Error('Invalid data');
    // Get the min version that can contain data
    const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
    // If no version is found, data cannot be stored
    if (!bestVersion) throw new Error('The amount of data is too big to be stored in a QR Code');
    // If not specified, use min version as default
    if (!version) version = bestVersion;
    else if (version < bestVersion) throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + '.\n');
    const dataBits = createData(version, errorCorrectionLevel, segments);
    // Allocate matrix buffer
    const moduleCount = Utils.getSymbolSize(version);
    const modules = new BitMatrix(moduleCount);
    // Add function modules
    setupFinderPattern(modules, version);
    setupTimingPattern(modules);
    setupAlignmentPattern(modules, version);
    // Add temporary dummy bits for format info just to set them as reserved.
    // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
    // since the masking operation must be performed only on the encoding region.
    // These blocks will be replaced with correct values later in code.
    setupFormatInfo(modules, errorCorrectionLevel, 0);
    if (version >= 7) setupVersionInfo(modules, version);
    // Add data codewords
    setupData(modules, dataBits);
    if (isNaN(maskPattern)) // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
    // Apply mask pattern
    MaskPattern.applyMask(maskPattern, modules);
    // Replace format info bits with correct values
    setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
    return {
        modules: modules,
        version: version,
        errorCorrectionLevel: errorCorrectionLevel,
        maskPattern: maskPattern,
        segments: segments
    };
}
/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */ exports.create = function create(data, options) {
    if (typeof data === 'undefined' || data === '') throw new Error('No input text');
    let errorCorrectionLevel = ECLevel.M;
    let version;
    let mask;
    if (typeof options !== 'undefined') {
        // Use higher error correction level as default
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) Utils.setToSJISFunction(options.toSJISFunc);
    }
    return createSymbol(data, version, errorCorrectionLevel, mask);
};

},{"4cf6a8173d9f3a2":"iXLHI","2ad62f61c352884c":"kbPwo","87d5a6270eb1dc26":"kiPfj","91abc94f777368cc":"fTjkX","9737c3939ab85d95":"1o9KB","cee3d371e219e45e":"dc6Ma","8700c8c682afabf3":"fyimH","65ad903a6ba3e":"5yWYH","1e8e447afb4d169c":"47Qq0","8a4a19af97836d80":"a8ag2","26720f9d94c9e268":"iThdR","7b6429a248ecc51f":"f1e9A","1368d0fa14524351":"4tKki"}],"iXLHI":[function(require,module,exports,__globalThis) {
let toSJISFunction;
const CODEWORDS_COUNT = [
    0,
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
];
/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */ exports.getSymbolSize = function getSymbolSize(version) {
    if (!version) throw new Error('"version" cannot be null or undefined');
    if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
    return version * 4 + 17;
};
/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */ exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
    return CODEWORDS_COUNT[version];
};
/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */ exports.getBCHDigit = function(data) {
    let digit = 0;
    while(data !== 0){
        digit++;
        data >>>= 1;
    }
    return digit;
};
exports.setToSJISFunction = function setToSJISFunction(f) {
    if (typeof f !== 'function') throw new Error('"toSJISFunc" is not a valid function.');
    toSJISFunction = f;
};
exports.isKanjiModeEnabled = function() {
    return typeof toSJISFunction !== 'undefined';
};
exports.toSJIS = function toSJIS(kanji) {
    return toSJISFunction(kanji);
};

},{}],"kbPwo":[function(require,module,exports,__globalThis) {
exports.L = {
    bit: 1
};
exports.M = {
    bit: 0
};
exports.Q = {
    bit: 3
};
exports.H = {
    bit: 2
};
function fromString(string) {
    if (typeof string !== 'string') throw new Error('Param is not a string');
    const lcStr = string.toLowerCase();
    switch(lcStr){
        case 'l':
        case 'low':
            return exports.L;
        case 'm':
        case 'medium':
            return exports.M;
        case 'q':
        case 'quartile':
            return exports.Q;
        case 'h':
        case 'high':
            return exports.H;
        default:
            throw new Error('Unknown EC Level: ' + string);
    }
}
exports.isValid = function isValid(level) {
    return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
};
exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) return value;
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};

},{}],"kiPfj":[function(require,module,exports,__globalThis) {
function BitBuffer() {
    this.buffer = [];
    this.length = 0;
}
BitBuffer.prototype = {
    get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
    },
    put: function(num, length) {
        for(let i = 0; i < length; i++)this.putBit((num >>> length - i - 1 & 1) === 1);
    },
    getLengthInBits: function() {
        return this.length;
    },
    putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) this.buffer.push(0);
        if (bit) this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
        this.length++;
    }
};
module.exports = BitBuffer;

},{}],"fTjkX":[function(require,module,exports,__globalThis) {
/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */ function BitMatrix(size) {
    if (!size || size < 1) throw new Error('BitMatrix size must be defined and greater than 0');
    this.size = size;
    this.data = new Uint8Array(size * size);
    this.reservedBit = new Uint8Array(size * size);
}
/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */ BitMatrix.prototype.set = function(row, col, value, reserved) {
    const index = row * this.size + col;
    this.data[index] = value;
    if (reserved) this.reservedBit[index] = true;
};
/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */ BitMatrix.prototype.get = function(row, col) {
    return this.data[row * this.size + col];
};
/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */ BitMatrix.prototype.xor = function(row, col, value) {
    this.data[row * this.size + col] ^= value;
};
/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */ BitMatrix.prototype.isReserved = function(row, col) {
    return this.reservedBit[row * this.size + col];
};
module.exports = BitMatrix;

},{}],"1o9KB":[function(require,module,exports,__globalThis) {
/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */ const getSymbolSize = require("3fa093180e62a22a").getSymbolSize;
/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */ exports.getRowColCoords = function getRowColCoords(version) {
    if (version === 1) return [];
    const posCount = Math.floor(version / 7) + 2;
    const size = getSymbolSize(version);
    const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
    const positions = [
        size - 7
    ] // Last coord is always (size - 7)
    ;
    for(let i = 1; i < posCount - 1; i++)positions[i] = positions[i - 1] - intervals;
    positions.push(6) // First coord is always 6
    ;
    return positions.reverse();
};
/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * let pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    const coords = [];
    const pos = exports.getRowColCoords(version);
    const posLength = pos.length;
    for(let i = 0; i < posLength; i++)for(let j = 0; j < posLength; j++){
        // Skip if position is occupied by finder patterns
        if (i === 0 && j === 0 || // top-left
        i === 0 && j === posLength - 1 || // bottom-left
        i === posLength - 1 && j === 0) continue;
        coords.push([
            pos[i],
            pos[j]
        ]);
    }
    return coords;
};

},{"3fa093180e62a22a":"iXLHI"}],"dc6Ma":[function(require,module,exports,__globalThis) {
const getSymbolSize = require("6ec9ae5660047293").getSymbolSize;
const FINDER_PATTERN_SIZE = 7;
/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */ exports.getPositions = function getPositions(version) {
    const size = getSymbolSize(version);
    return [
        // top-left
        [
            0,
            0
        ],
        // top-right
        [
            size - FINDER_PATTERN_SIZE,
            0
        ],
        // bottom-left
        [
            0,
            size - FINDER_PATTERN_SIZE
        ]
    ];
};

},{"6ec9ae5660047293":"iXLHI"}],"fyimH":[function(require,module,exports,__globalThis) {
/**
 * Data mask pattern reference
 * @type {Object}
 */ exports.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
};
/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */ const PenaltyScores = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
};
/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */ exports.isValid = function isValid(mask) {
    return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
};
/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */ exports.from = function from(value) {
    return exports.isValid(value) ? parseInt(value, 10) : undefined;
};
/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/ exports.getPenaltyN1 = function getPenaltyN1(data) {
    const size = data.size;
    let points = 0;
    let sameCountCol = 0;
    let sameCountRow = 0;
    let lastCol = null;
    let lastRow = null;
    for(let row = 0; row < size; row++){
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for(let col = 0; col < size; col++){
            let module = data.get(row, col);
            if (module === lastCol) sameCountCol++;
            else {
                if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
                lastCol = module;
                sameCountCol = 1;
            }
            module = data.get(col, row);
            if (module === lastRow) sameCountRow++;
            else {
                if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
                lastRow = module;
                sameCountRow = 1;
            }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
    }
    return points;
};
/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */ exports.getPenaltyN2 = function getPenaltyN2(data) {
    const size = data.size;
    let points = 0;
    for(let row = 0; row < size - 1; row++)for(let col = 0; col < size - 1; col++){
        const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
        if (last === 4 || last === 0) points++;
    }
    return points * PenaltyScores.N2;
};
/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */ exports.getPenaltyN3 = function getPenaltyN3(data) {
    const size = data.size;
    let points = 0;
    let bitsCol = 0;
    let bitsRow = 0;
    for(let row = 0; row < size; row++){
        bitsCol = bitsRow = 0;
        for(let col = 0; col < size; col++){
            bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
            if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
            bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
            if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
        }
    }
    return points * PenaltyScores.N3;
};
/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */ exports.getPenaltyN4 = function getPenaltyN4(data) {
    let darkCount = 0;
    const modulesCount = data.data.length;
    for(let i = 0; i < modulesCount; i++)darkCount += data.data[i];
    const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
    return k * PenaltyScores.N4;
};
/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */ function getMaskAt(maskPattern, i, j) {
    switch(maskPattern){
        case exports.Patterns.PATTERN000:
            return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
            return i % 2 === 0;
        case exports.Patterns.PATTERN010:
            return j % 3 === 0;
        case exports.Patterns.PATTERN011:
            return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
            return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
            throw new Error('bad maskPattern:' + maskPattern);
    }
}
/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */ exports.applyMask = function applyMask(pattern, data) {
    const size = data.size;
    for(let col = 0; col < size; col++)for(let row = 0; row < size; row++){
        if (data.isReserved(row, col)) continue;
        data.xor(row, col, getMaskAt(pattern, row, col));
    }
};
/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */ exports.getBestMask = function getBestMask(data, setupFormatFunc) {
    const numPatterns = Object.keys(exports.Patterns).length;
    let bestPattern = 0;
    let lowerPenalty = Infinity;
    for(let p = 0; p < numPatterns; p++){
        setupFormatFunc(p);
        exports.applyMask(p, data);
        // Calculate penalty
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        // Undo previously applied mask
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
            lowerPenalty = penalty;
            bestPattern = p;
        }
    }
    return bestPattern;
};

},{}],"5yWYH":[function(require,module,exports,__globalThis) {
const ECLevel = require("7baaa530584d1bc4");
const EC_BLOCKS_TABLE = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
];
const EC_CODEWORDS_TABLE = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
];
/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */ exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};
/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */ exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
    switch(errorCorrectionLevel){
        case ECLevel.L:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
            return undefined;
    }
};

},{"7baaa530584d1bc4":"kbPwo"}],"47Qq0":[function(require,module,exports,__globalThis) {
const Polynomial = require("742a7ee6d6a2d145");
function ReedSolomonEncoder(degree) {
    this.genPoly = undefined;
    this.degree = degree;
    if (this.degree) this.initialize(this.degree);
}
/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */ ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
    // create an irreducible generator polynomial
    this.degree = degree;
    this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */ ReedSolomonEncoder.prototype.encode = function encode(data) {
    if (!this.genPoly) throw new Error('Encoder not initialized');
    // Calculate EC for this data block
    // extends data size to data+genPoly size
    const paddedData = new Uint8Array(data.length + this.degree);
    paddedData.set(data);
    // The error correction codewords are the remainder after dividing the data codewords
    // by a generator polynomial
    const remainder = Polynomial.mod(paddedData, this.genPoly);
    // return EC data blocks (last n byte, where n is the degree of genPoly)
    // If coefficients number in remainder are less than genPoly degree,
    // pad with 0s to the left to reach the needed number of coefficients
    const start = this.degree - remainder.length;
    if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
    }
    return remainder;
};
module.exports = ReedSolomonEncoder;

},{"742a7ee6d6a2d145":"dxhHI"}],"dxhHI":[function(require,module,exports,__globalThis) {
const GF = require("780c74029318268c");
/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Uint8Array} p1 Polynomial
 * @param  {Uint8Array} p2 Polynomial
 * @return {Uint8Array}    Product of p1 and p2
 */ exports.mul = function mul(p1, p2) {
    const coeff = new Uint8Array(p1.length + p2.length - 1);
    for(let i = 0; i < p1.length; i++)for(let j = 0; j < p2.length; j++)coeff[i + j] ^= GF.mul(p1[i], p2[j]);
    return coeff;
};
/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Uint8Array} divident Polynomial
 * @param  {Uint8Array} divisor  Polynomial
 * @return {Uint8Array}          Remainder
 */ exports.mod = function mod(divident, divisor) {
    let result = new Uint8Array(divident);
    while(result.length - divisor.length >= 0){
        const coeff = result[0];
        for(let i = 0; i < divisor.length; i++)result[i] ^= GF.mul(divisor[i], coeff);
        // remove all zeros from buffer head
        let offset = 0;
        while(offset < result.length && result[offset] === 0)offset++;
        result = result.slice(offset);
    }
    return result;
};
/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Uint8Array}    Buffer containing polynomial coefficients
 */ exports.generateECPolynomial = function generateECPolynomial(degree) {
    let poly = new Uint8Array([
        1
    ]);
    for(let i = 0; i < degree; i++)poly = exports.mul(poly, new Uint8Array([
        1,
        GF.exp(i)
    ]));
    return poly;
};

},{"780c74029318268c":"2JC5s"}],"2JC5s":[function(require,module,exports,__globalThis) {
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);
(function initTables() {
    let x = 1;
    for(let i = 0; i < 255; i++){
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1 // multiply by 2
        ;
        // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
        // This means that when a number is 256 or larger, it should be XORed with 0x11D.
        if (x & 0x100) x ^= 0x11D;
    }
    // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
    // stay inside the bounds (because we will mainly use this table for the multiplication of
    // two GF numbers, no more).
    // @see {@link mul}
    for(let i = 255; i < 512; i++)EXP_TABLE[i] = EXP_TABLE[i - 255];
})();
/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.log = function log(n) {
    if (n < 1) throw new Error('log(' + n + ')');
    return LOG_TABLE[n];
};
/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */ exports.exp = function exp(n) {
    return EXP_TABLE[n];
};
/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */ exports.mul = function mul(x, y) {
    if (x === 0 || y === 0) return 0;
    // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
    // @see {@link initTables}
    return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};

},{}],"a8ag2":[function(require,module,exports,__globalThis) {
const Utils = require("f67b02cdf61cb7c6");
const ECCode = require("777da0d92c463f2e");
const ECLevel = require("acd5b4fcd696edf3");
const Mode = require("5303c314c4a688d7");
const VersionCheck = require("663d0e03da8b2897");
// Generator polynomial used to encode version information
const G18 = 7973;
const G18_BCH = Utils.getBCHDigit(G18);
function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
    for(let currentVersion = 1; currentVersion <= 40; currentVersion++){
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) return currentVersion;
    }
    return undefined;
}
function getReservedBitsCount(mode, version) {
    // Character count indicator + mode indicator bits
    return Mode.getCharCountIndicator(mode, version) + 4;
}
function getTotalBitsFromDataArray(segments, version) {
    let totalBits = 0;
    segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
    });
    return totalBits;
}
function getBestVersionForMixedData(segments, errorCorrectionLevel) {
    for(let currentVersion = 1; currentVersion <= 40; currentVersion++){
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) return currentVersion;
    }
    return undefined;
}
/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */ exports.from = function from(value, defaultValue) {
    if (VersionCheck.isValid(value)) return parseInt(value, 10);
    return defaultValue;
};
/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */ exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
    if (!VersionCheck.isValid(version)) throw new Error('Invalid QR Code version');
    // Use Byte mode as default
    if (typeof mode === 'undefined') mode = Mode.BYTE;
    // Total codewords for this QR code version (Data + Error correction)
    const totalCodewords = Utils.getSymbolTotalCodewords(version);
    // Total number of error correction codewords
    const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
    // Total number of data codewords
    const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
    if (mode === Mode.MIXED) return dataTotalCodewordsBits;
    const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
    // Return max number of storable codewords
    switch(mode){
        case Mode.NUMERIC:
            return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
            return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
            return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
            return Math.floor(usableBits / 8);
    }
};
/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */ exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
    let seg;
    const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
    if (Array.isArray(data)) {
        if (data.length > 1) return getBestVersionForMixedData(data, ecl);
        if (data.length === 0) return 1;
        seg = data[0];
    } else seg = data;
    return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};
/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */ exports.getEncodedBits = function getEncodedBits(version) {
    if (!VersionCheck.isValid(version) || version < 7) throw new Error('Invalid QR Code version');
    let d = version << 12;
    while(Utils.getBCHDigit(d) - G18_BCH >= 0)d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
    return version << 12 | d;
};

},{"f67b02cdf61cb7c6":"iXLHI","777da0d92c463f2e":"5yWYH","acd5b4fcd696edf3":"kbPwo","5303c314c4a688d7":"f1e9A","663d0e03da8b2897":"enfTX"}],"f1e9A":[function(require,module,exports,__globalThis) {
const VersionCheck = require("488660fac9162579");
const Regex = require("a23fd227d32f3622");
/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */ exports.NUMERIC = {
    id: 'Numeric',
    bit: 1,
    ccBits: [
        10,
        12,
        14
    ]
};
/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */ exports.ALPHANUMERIC = {
    id: 'Alphanumeric',
    bit: 2,
    ccBits: [
        9,
        11,
        13
    ]
};
/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */ exports.BYTE = {
    id: 'Byte',
    bit: 4,
    ccBits: [
        8,
        16,
        16
    ]
};
/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */ exports.KANJI = {
    id: 'Kanji',
    bit: 8,
    ccBits: [
        8,
        10,
        12
    ]
};
/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */ exports.MIXED = {
    bit: -1
};
/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */ exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
    if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);
    if (!VersionCheck.isValid(version)) throw new Error('Invalid version: ' + version);
    if (version >= 1 && version < 10) return mode.ccBits[0];
    else if (version < 27) return mode.ccBits[1];
    return mode.ccBits[2];
};
/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */ exports.getBestModeForData = function getBestModeForData(dataStr) {
    if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
    else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
    else if (Regex.testKanji(dataStr)) return exports.KANJI;
    else return exports.BYTE;
};
/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */ exports.toString = function toString(mode) {
    if (mode && mode.id) return mode.id;
    throw new Error('Invalid mode');
};
/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */ exports.isValid = function isValid(mode) {
    return mode && mode.bit && mode.ccBits;
};
/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */ function fromString(string) {
    if (typeof string !== 'string') throw new Error('Param is not a string');
    const lcStr = string.toLowerCase();
    switch(lcStr){
        case 'numeric':
            return exports.NUMERIC;
        case 'alphanumeric':
            return exports.ALPHANUMERIC;
        case 'kanji':
            return exports.KANJI;
        case 'byte':
            return exports.BYTE;
        default:
            throw new Error('Unknown mode: ' + string);
    }
}
/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */ exports.from = function from(value, defaultValue) {
    if (exports.isValid(value)) return value;
    try {
        return fromString(value);
    } catch (e) {
        return defaultValue;
    }
};

},{"488660fac9162579":"enfTX","a23fd227d32f3622":"3Bqru"}],"enfTX":[function(require,module,exports,__globalThis) {
/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */ exports.isValid = function isValid(version) {
    return !isNaN(version) && version >= 1 && version <= 40;
};

},{}],"3Bqru":[function(require,module,exports,__globalThis) {
const numeric = '[0-9]+';
const alphanumeric = '[A-Z $%*+\\-./:]+';
let kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
kanji = kanji.replace(/u/g, '\\u');
const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
exports.KANJI = new RegExp(kanji, 'g');
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
exports.BYTE = new RegExp(byte, 'g');
exports.NUMERIC = new RegExp(numeric, 'g');
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
const TEST_KANJI = new RegExp('^' + kanji + '$');
const TEST_NUMERIC = new RegExp('^' + numeric + '$');
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
exports.testKanji = function testKanji(str) {
    return TEST_KANJI.test(str);
};
exports.testNumeric = function testNumeric(str) {
    return TEST_NUMERIC.test(str);
};
exports.testAlphanumeric = function testAlphanumeric(str) {
    return TEST_ALPHANUMERIC.test(str);
};

},{}],"iThdR":[function(require,module,exports,__globalThis) {
const Utils = require("eeca831a42e85d6c");
const G15 = 1335;
const G15_MASK = 21522;
const G15_BCH = Utils.getBCHDigit(G15);
/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */ exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
    const data = errorCorrectionLevel.bit << 3 | mask;
    let d = data << 10;
    while(Utils.getBCHDigit(d) - G15_BCH >= 0)d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
    // xor final data with mask pattern in order to ensure that
    // no combination of Error Correction Level and data mask pattern
    // will result in an all-zero data string
    return (data << 10 | d) ^ G15_MASK;
};

},{"eeca831a42e85d6c":"iXLHI"}],"4tKki":[function(require,module,exports,__globalThis) {
const Mode = require("45f6d4bff9d2fc72");
const NumericData = require("73109cbf4f3c309d");
const AlphanumericData = require("5320016e34c30467");
const ByteData = require("fd16f8f25b581951");
const KanjiData = require("8a7b84039f1cf0d2");
const Regex = require("79379a3a8f3c26bb");
const Utils = require("66903ca51bd2ea1d");
const dijkstra = require("3b9f47d541e7d71f");
/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */ function getStringByteLength(str) {
    return unescape(encodeURIComponent(str)).length;
}
/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */ function getSegments(regex, mode, str) {
    const segments = [];
    let result;
    while((result = regex.exec(str)) !== null)segments.push({
        data: result[0],
        index: result.index,
        mode: mode,
        length: result[0].length
    });
    return segments;
}
/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */ function getSegmentsFromString(dataStr) {
    const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
    const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
    let byteSegs;
    let kanjiSegs;
    if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
    } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
    }
    const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
    return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
    }).map(function(obj) {
        return {
            data: obj.data,
            mode: obj.mode,
            length: obj.length
        };
    });
}
/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */ function getSegmentBitsLength(length, mode) {
    switch(mode){
        case Mode.NUMERIC:
            return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
            return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
            return KanjiData.getBitsLength(length);
        case Mode.BYTE:
            return ByteData.getBitsLength(length);
    }
}
/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function mergeSegments(segs) {
    return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
            acc[acc.length - 1].data += curr.data;
            return acc;
        }
        acc.push(curr);
        return acc;
    }, []);
}
/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */ function buildNodes(segs) {
    const nodes = [];
    for(let i = 0; i < segs.length; i++){
        const seg = segs[i];
        switch(seg.mode){
            case Mode.NUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.ALPHANUMERIC,
                        length: seg.length
                    },
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.ALPHANUMERIC:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: seg.length
                    }
                ]);
                break;
            case Mode.KANJI:
                nodes.push([
                    seg,
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
                break;
            case Mode.BYTE:
                nodes.push([
                    {
                        data: seg.data,
                        mode: Mode.BYTE,
                        length: getStringByteLength(seg.data)
                    }
                ]);
        }
    }
    return nodes;
}
/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */ function buildGraph(nodes, version) {
    const table = {};
    const graph = {
        start: {}
    };
    let prevNodeIds = [
        'start'
    ];
    for(let i = 0; i < nodes.length; i++){
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for(let j = 0; j < nodeGroup.length; j++){
            const node = nodeGroup[j];
            const key = '' + i + j;
            currentNodeIds.push(key);
            table[key] = {
                node: node,
                lastCount: 0
            };
            graph[key] = {};
            for(let n = 0; n < prevNodeIds.length; n++){
                const prevNodeId = prevNodeIds[n];
                if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                    graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                    table[prevNodeId].lastCount += node.length;
                } else {
                    if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
                    graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version) // switch cost
                    ;
                }
            }
        }
        prevNodeIds = currentNodeIds;
    }
    for(let n = 0; n < prevNodeIds.length; n++)graph[prevNodeIds[n]].end = 0;
    return {
        map: graph,
        table: table
    };
}
/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */ function buildSingleSegment(data, modesHint) {
    let mode;
    const bestMode = Mode.getBestModeForData(data);
    mode = Mode.from(modesHint, bestMode);
    // Make sure data can be encoded
    if (mode !== Mode.BYTE && mode.bit < bestMode.bit) throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
    // Use Mode.BYTE if Kanji support is disabled
    if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) mode = Mode.BYTE;
    switch(mode){
        case Mode.NUMERIC:
            return new NumericData(data);
        case Mode.ALPHANUMERIC:
            return new AlphanumericData(data);
        case Mode.KANJI:
            return new KanjiData(data);
        case Mode.BYTE:
            return new ByteData(data);
    }
}
/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */ exports.fromArray = function fromArray(array) {
    return array.reduce(function(acc, seg) {
        if (typeof seg === 'string') acc.push(buildSingleSegment(seg, null));
        else if (seg.data) acc.push(buildSingleSegment(seg.data, seg.mode));
        return acc;
    }, []);
};
/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */ exports.fromString = function fromString(data, version) {
    const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
    const nodes = buildNodes(segs);
    const graph = buildGraph(nodes, version);
    const path = dijkstra.find_path(graph.map, 'start', 'end');
    const optimizedSegs = [];
    for(let i = 1; i < path.length - 1; i++)optimizedSegs.push(graph.table[path[i]].node);
    return exports.fromArray(mergeSegments(optimizedSegs));
};
/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */ exports.rawSplit = function rawSplit(data) {
    return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
};

},{"45f6d4bff9d2fc72":"f1e9A","73109cbf4f3c309d":"c44F8","5320016e34c30467":"cdBOf","fd16f8f25b581951":"ediQ9","8a7b84039f1cf0d2":"gphIw","79379a3a8f3c26bb":"3Bqru","66903ca51bd2ea1d":"iXLHI","3b9f47d541e7d71f":"lDJz9"}],"c44F8":[function(require,module,exports,__globalThis) {
const Mode = require("29134b0b0820b091");
function NumericData(data) {
    this.mode = Mode.NUMERIC;
    this.data = data.toString();
}
NumericData.getBitsLength = function getBitsLength(length) {
    return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};
NumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
NumericData.prototype.getBitsLength = function getBitsLength() {
    return NumericData.getBitsLength(this.data.length);
};
NumericData.prototype.write = function write(bitBuffer) {
    let i, group, value;
    // The input data string is divided into groups of three digits,
    // and each group is converted to its 10-bit binary equivalent.
    for(i = 0; i + 3 <= this.data.length; i += 3){
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
    }
    // If the number of input digits is not an exact multiple of three,
    // the final one or two digits are converted to 4 or 7 bits respectively.
    const remainingNum = this.data.length - i;
    if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
    }
};
module.exports = NumericData;

},{"29134b0b0820b091":"f1e9A"}],"cdBOf":[function(require,module,exports,__globalThis) {
const Mode = require("9c7c9b869570f846");
/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */ const ALPHA_NUM_CHARS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    ' ',
    '$',
    '%',
    '*',
    '+',
    '-',
    '.',
    '/',
    ':'
];
function AlphanumericData(data) {
    this.mode = Mode.ALPHANUMERIC;
    this.data = data;
}
AlphanumericData.getBitsLength = function getBitsLength(length) {
    return 11 * Math.floor(length / 2) + 6 * (length % 2);
};
AlphanumericData.prototype.getLength = function getLength() {
    return this.data.length;
};
AlphanumericData.prototype.getBitsLength = function getBitsLength() {
    return AlphanumericData.getBitsLength(this.data.length);
};
AlphanumericData.prototype.write = function write(bitBuffer) {
    let i;
    // Input data characters are divided into groups of two characters
    // and encoded as 11-bit binary codes.
    for(i = 0; i + 2 <= this.data.length; i += 2){
        // The character value of the first character is multiplied by 45
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        // The character value of the second digit is added to the product
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        // The sum is then stored as 11-bit binary number
        bitBuffer.put(value, 11);
    }
    // If the number of input data characters is not a multiple of two,
    // the character value of the final character is encoded as a 6-bit binary number.
    if (this.data.length % 2) bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
};
module.exports = AlphanumericData;

},{"9c7c9b869570f846":"f1e9A"}],"ediQ9":[function(require,module,exports,__globalThis) {
const Mode = require("a20a51f6cd184253");
function ByteData(data) {
    this.mode = Mode.BYTE;
    if (typeof data === 'string') this.data = new TextEncoder().encode(data);
    else this.data = new Uint8Array(data);
}
ByteData.getBitsLength = function getBitsLength(length) {
    return length * 8;
};
ByteData.prototype.getLength = function getLength() {
    return this.data.length;
};
ByteData.prototype.getBitsLength = function getBitsLength() {
    return ByteData.getBitsLength(this.data.length);
};
ByteData.prototype.write = function(bitBuffer) {
    for(let i = 0, l = this.data.length; i < l; i++)bitBuffer.put(this.data[i], 8);
};
module.exports = ByteData;

},{"a20a51f6cd184253":"f1e9A"}],"gphIw":[function(require,module,exports,__globalThis) {
const Mode = require("b935cfd1cd03a1f6");
const Utils = require("ca4944585cc8d12d");
function KanjiData(data) {
    this.mode = Mode.KANJI;
    this.data = data;
}
KanjiData.getBitsLength = function getBitsLength(length) {
    return length * 13;
};
KanjiData.prototype.getLength = function getLength() {
    return this.data.length;
};
KanjiData.prototype.getBitsLength = function getBitsLength() {
    return KanjiData.getBitsLength(this.data.length);
};
KanjiData.prototype.write = function(bitBuffer) {
    let i;
    // In the Shift JIS system, Kanji characters are represented by a two byte combination.
    // These byte values are shifted from the JIS X 0208 values.
    // JIS X 0208 gives details of the shift coded representation.
    for(i = 0; i < this.data.length; i++){
        let value = Utils.toSJIS(this.data[i]);
        // For characters with Shift JIS values from 0x8140 to 0x9FFC:
        if (value >= 0x8140 && value <= 0x9FFC) // Subtract 0x8140 from Shift JIS value
        value -= 0x8140;
        else if (value >= 0xE040 && value <= 0xEBBF) // Subtract 0xC140 from Shift JIS value
        value -= 0xC140;
        else throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
        // Multiply most significant byte of result by 0xC0
        // and add least significant byte to product
        value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff);
        // Convert result to a 13-bit binary string
        bitBuffer.put(value, 13);
    }
};
module.exports = KanjiData;

},{"b935cfd1cd03a1f6":"f1e9A","ca4944585cc8d12d":"iXLHI"}],"lDJz9":[function(require,module,exports,__globalThis) {
'use strict';
/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/ var dijkstra = {
    single_source_shortest_paths: function(graph, s, d) {
        // Predecessor map for each node that has been encountered.
        // node ID => predecessor node ID
        var predecessors = {};
        // Costs of shortest paths from s to all nodes encountered.
        // node ID => cost
        var costs = {};
        costs[s] = 0;
        // Costs of shortest paths from s to all nodes encountered; differs from
        // `costs` in that it provides easy access to the node that currently has
        // the known shortest path from s.
        // XXX: Do we actually need both `costs` and `open`?
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while(!open.empty()){
            // In the nodes remaining in graph that have a known cost from s,
            // find the node, u, that currently has the shortest path from s.
            closest = open.pop();
            u = closest.value;
            cost_of_s_to_u = closest.cost;
            // Get nodes adjacent to u...
            adjacent_nodes = graph[u] || {};
            // ...and explore the edges that connect u to those nodes, updating
            // the cost of the shortest paths to any or all of those nodes as
            // necessary. v is the node across the current edge from u.
            for(v in adjacent_nodes)if (adjacent_nodes.hasOwnProperty(v)) {
                // Get the cost of the edge running from u to v.
                cost_of_e = adjacent_nodes[v];
                // Cost of s to u plus the cost of u to v across e--this is *a*
                // cost from s to v that may or may not be less than the current
                // known cost to v.
                cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                // If we haven't visited v yet OR if the current known cost from s to
                // v is greater than the new cost we just found (cost of s to u plus
                // cost of u to v across e), update v's cost in the cost list and
                // update v's predecessor in the predecessor list (it's now u).
                cost_of_s_to_v = costs[v];
                first_visit = typeof costs[v] === 'undefined';
                if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                    costs[v] = cost_of_s_to_u_plus_cost_of_e;
                    open.push(v, cost_of_s_to_u_plus_cost_of_e);
                    predecessors[v] = u;
                }
            }
        }
        if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
            var msg = [
                'Could not find a path from ',
                s,
                ' to ',
                d,
                '.'
            ].join('');
            throw new Error(msg);
        }
        return predecessors;
    },
    extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while(u){
            nodes.push(u);
            predecessor = predecessors[u];
            u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
    },
    find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
    },
    /**
   * A very naive priority queue implementation.
   */ PriorityQueue: {
        make: function(opts) {
            var T = dijkstra.PriorityQueue, t = {}, key;
            opts = opts || {};
            for(key in T)if (T.hasOwnProperty(key)) t[key] = T[key];
            t.queue = [];
            t.sorter = opts.sorter || T.default_sorter;
            return t;
        },
        default_sorter: function(a, b) {
            return a.cost - b.cost;
        },
        /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */ push: function(value, cost) {
            var item = {
                value: value,
                cost: cost
            };
            this.queue.push(item);
            this.queue.sort(this.sorter);
        },
        /**
     * Return the highest priority element in the queue.
     */ pop: function() {
            return this.queue.shift();
        },
        empty: function() {
            return this.queue.length === 0;
        }
    }
};
module.exports = dijkstra;

},{}],"2oGFV":[function(require,module,exports,__globalThis) {
const Utils = require("5b3f7c513802d6c7");
function clearCanvas(ctx, canvas, size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!canvas.style) canvas.style = {};
    canvas.height = size;
    canvas.width = size;
    canvas.style.height = size + 'px';
    canvas.style.width = size + 'px';
}
function getCanvasElement() {
    try {
        return document.createElement('canvas');
    } catch (e) {
        throw new Error('You need to specify a canvas element');
    }
}
exports.render = function render(qrData, canvas, options) {
    let opts = options;
    let canvasEl = canvas;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!canvas) canvasEl = getCanvasElement();
    opts = Utils.getOptions(opts);
    const size = Utils.getImageWidth(qrData.modules.size, opts);
    const ctx = canvasEl.getContext('2d');
    const image = ctx.createImageData(size, size);
    Utils.qrToImageData(image.data, qrData, opts);
    clearCanvas(ctx, canvasEl, size);
    ctx.putImageData(image, 0, 0);
    return canvasEl;
};
exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
    let opts = options;
    if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = undefined;
    }
    if (!opts) opts = {};
    const canvasEl = exports.render(qrData, canvas, opts);
    const type = opts.type || 'image/png';
    const rendererOpts = opts.rendererOpts || {};
    return canvasEl.toDataURL(type, rendererOpts.quality);
};

},{"5b3f7c513802d6c7":"6rMWz"}],"6rMWz":[function(require,module,exports,__globalThis) {
function hex2rgba(hex) {
    if (typeof hex === 'number') hex = hex.toString();
    if (typeof hex !== 'string') throw new Error('Color should be defined as hex string');
    let hexCode = hex.slice().replace('#', '').split('');
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) throw new Error('Invalid hex color: ' + hex);
    // Convert from short to long form (fff -> ffffff)
    if (hexCode.length === 3 || hexCode.length === 4) hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
        return [
            c,
            c
        ];
    }));
    // Add default alpha value
    if (hexCode.length === 6) hexCode.push('F', 'F');
    const hexValue = parseInt(hexCode.join(''), 16);
    return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: '#' + hexCode.slice(0, 6).join('')
    };
}
exports.getOptions = function getOptions(options) {
    if (!options) options = {};
    if (!options.color) options.color = {};
    const margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
    const width = options.width && options.width >= 21 ? options.width : undefined;
    const scale = options.scale || 4;
    return {
        width: width,
        scale: width ? 4 : scale,
        margin: margin,
        color: {
            dark: hex2rgba(options.color.dark || '#000000ff'),
            light: hex2rgba(options.color.light || '#ffffffff')
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
    };
};
exports.getScale = function getScale(qrSize, opts) {
    return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
};
exports.getImageWidth = function getImageWidth(qrSize, opts) {
    const scale = exports.getScale(qrSize, opts);
    return Math.floor((qrSize + opts.margin * 2) * scale);
};
exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
    const size = qr.modules.size;
    const data = qr.modules.data;
    const scale = exports.getScale(size, opts);
    const symbolSize = Math.floor((size + opts.margin * 2) * scale);
    const scaledMargin = opts.margin * scale;
    const palette = [
        opts.color.light,
        opts.color.dark
    ];
    for(let i = 0; i < symbolSize; i++)for(let j = 0; j < symbolSize; j++){
        let posDst = (i * symbolSize + j) * 4;
        let pxColor = opts.color.light;
        if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
        }
        imgData[posDst++] = pxColor.r;
        imgData[posDst++] = pxColor.g;
        imgData[posDst++] = pxColor.b;
        imgData[posDst] = pxColor.a;
    }
};

},{}],"7Akrj":[function(require,module,exports,__globalThis) {
const Utils = require("c36bbcf663291acc");
function getColorAttrib(color, attrib) {
    const alpha = color.a / 255;
    const str = attrib + '="' + color.hex + '"';
    return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}
function svgCmd(cmd, x, y) {
    let str = cmd + x;
    if (typeof y !== 'undefined') str += ' ' + y;
    return str;
}
function qrToPath(data, size, margin) {
    let path = '';
    let moveBy = 0;
    let newRow = false;
    let lineLength = 0;
    for(let i = 0; i < data.length; i++){
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
            lineLength++;
            if (!(i > 0 && col > 0 && data[i - 1])) {
                path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
                moveBy = 0;
                newRow = false;
            }
            if (!(col + 1 < size && data[i + 1])) {
                path += svgCmd('h', lineLength);
                lineLength = 0;
            }
        } else moveBy++;
    }
    return path;
}
exports.render = function render(qrData, options, cb) {
    const opts = Utils.getOptions(options);
    const size = qrData.modules.size;
    const data = qrData.modules.data;
    const qrcodesize = size + opts.margin * 2;
    const bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
    const path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
    const viewBox = 'viewBox="0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
    const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
    const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';
    if (typeof cb === 'function') cb(null, svgTag);
    return svgTag;
};

},{"c36bbcf663291acc":"6rMWz"}],"lWrRo":[function(require,module,exports,__globalThis) {
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
    let text;
    if (user.current?.maiCircle) text = "H\xe4r f\xe5r du en exklusiv inbjudan till Mai, som ger en extra fin start med tre kommissionsfria f\xf6rs\xe4ljningar.";
    else text = "Jag bjuder in dig till Mai f\xf6r att s\xe4lja dina kl\xe4der! G\xe5 genom min l\xe4nk f\xf6r att f\xe5 en extra kommissionsfri f\xf6rs\xe4ljning.";
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aDjZV":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "autocomplete", ()=>autocomplete);
parcelHelpers.export(exports, "brands", ()=>brands);
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/ var currentFocus;
    /*execute a function when someone writes in the text field:*/ inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/ closeAllLists();
        if (!val) return false;
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/ a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/ this.parentNode.appendChild(a);
        /*for each item in the array...*/ for(i = 0; i < arr.length; i++)/*check if the item starts with the same letters as the text field value:*/ if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/ b = document.createElement("DIV");
            /*make the matching letters bold:*/ b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/ b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/ b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/ inp.value = this.getElementsByTagName("input")[0].value;
                inp.dispatchEvent(new Event('input'));
                inp.dispatchEvent(new Event('blur'));
                // TODO: Temporary fix to the problem that Levi's is cut after quotation mark
                if (inp.value === "Levi") {
                    inp.value = "Levi's";
                    console.log('this.getElementsByTagName("input")[0].value', this.getElementsByTagName("input")[0].value);
                    console.log('this.getElementsByTagName("input")', this.getElementsByTagName("input"));
                }
                /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/ closeAllLists();
            });
            a.appendChild(b);
        }
        // If no match, don't show list at all
        if (!a.innerHTML) closeAllLists();
    });
    /*execute a function presses a key on the keyboard:*/ inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/ currentFocus++;
            /*and and make the current item more visible:*/ addActive(x);
        } else if (e.keyCode == 38) {
            /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/ currentFocus--;
            /*and and make the current item more visible:*/ addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/ e.preventDefault();
            if (currentFocus > -1) /*and simulate a click on the "active" item:*/ {
                if (x) x[currentFocus].click();
            }
        }
    });
    // TOBIAS ADDED
    /*execute a function when bluring the input field:*/ inp.addEventListener("blur", function(e) {
        setTimeout(function() {
            closeAllLists();
        }, 50);
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/ if (!x) return false;
        /*start by removing the "active" class on all items:*/ removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/ x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/ for(var i = 0; i < x.length; i++)x[i].classList.remove("autocomplete-active");
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
    except the one passed as an argument:*/ var x = document.getElementsByClassName("autocomplete-items");
        for(var i = 0; i < x.length; i++)if (elmnt != x[i] && elmnt != inp) x[i].parentNode.removeChild(x[i]);
    }
    /*execute a function when someone clicks in the document:*/ document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}
const brands = [
    "& Other Stories",
    "2nd Day",
    "3.1 Phillip Lim",
    "5 Preview",
    "7 For All Mankind",
    "A Day's March",
    "A Nordin",
    "A Pair",
    "A part of the art",
    "A-COLD-WALL",
    "A-view",
    "A. Christensen",
    "Abercrombie & Fitch",
    "Abercrombie Fitch",
    "Acne Studios",
    "Adanola",
    "ADER error",
    "Adidas",
    "Adieu",
    "Adnym Atelier",
    "Adolfo Dominguez",
    "Adoore",
    "Adrianna Papell",
    "Adventure boots",
    "Aelfric eden",
    "A\xe9ryne",
    "AGN\xc8S B.",
    "AGN\xc8S DE VERNEUIL",
    "Agolde",
    "AHLVAR GALLERY",
    "Aim\xe9 Leon Dore",
    "Ala\xefa",
    "Alain Mikli",
    "Alan Crocetti",
    "Alan Paine",
    "Alberto guardiani",
    "Alberville",
    "Alden",
    "Alessandrini",
    "Alexa Chung",
    "Alexander McQueen",
    "Alexander Wang",
    "Alice & Olivia",
    "All Blues",
    "All Saints",
    "All saints",
    "Allen Edmonds",
    "Allude",
    "Almost famous",
    "Alohas",
    "Alpha Industries",
    "Altuzarra",
    "Amaort",
    "Ambre",
    "Ambre Babzoe",
    "Ambush",
    "American Apparel",
    "American Eagle Outfitters",
    "American Retro",
    "American Vintage",
    "AMI",
    "AMIRI",
    "Ammann",
    "Amust",
    "Anatomic Co",
    "Andrea Fenzi",
    "Anerkjendt",
    "Angel infantes",
    "Angulus",
    "Anine Bing",
    "Ann Demeulemeester",
    "Ann Taylor",
    "Anna",
    "Anna Field",
    "Anna Holtblad",
    "Anni Lu",
    "Anti Social Social Club",
    "Anton Heunis",
    "Antony Morato",
    "APC",
    "APC",
    "Apepazza",
    "AQAQ",
    "Ara",
    "Arbesko",
    "Arc'Teryx",
    "Arcopedico",
    "Area forte",
    "Aries",
    "Arket",
    "Armani",
    "Armani Exchange",
    "Armani jeans",
    "Art kids",
    "Ash",
    "Asics",
    "Asket",
    "Asos",
    "Aspesi",
    "Astrid Andersen",
    "Atmosphere",
    "ATP Atelier",
    "ATP Atelier",
    "Audley",
    "Australian luxe",
    "AVAVAV",
    "Avon Celli",
    "Awake NY",
    "AX Paris",
    "Axel Arigato",
    "Azzaro",
    "Azzezo",
    "B Store",
    "B.Young",
    "ba&sh",
    "Babolat",
    "Babycham",
    "Back",
    "Badgley mischka",
    "Baffin",
    "Bagutta",
    "Baldessarini",
    "Balenciaga",
    "Ballerina closet",
    "Bally",
    "Balmain",
    "Banana Republic",
    "BAPE",
    "Barbour",
    "Bardot",
    "Barena",
    "Barker",
    "BARRAG\xc1N",
    "Barund CPH",
    "Base London",
    "Batistini",
    "Baum und Pferdgarten",
    "Bcbg Max Azria",
    "Bebe",
    "Beck Sonder Gaard",
    "Becks\xf6ndergaard",
    "Bel Air",
    "Belle by Sigerson Morrison",
    "Belmondo",
    "Belstaff",
    "Ben Sherman",
    "Benetton",
    "Bensimon",
    "Bergans of Norway",
    "Bergstein",
    "Bershka",
    "Bertoni",
    "Betty Blue",
    "Betula",
    "Bianca Chand\xf4n",
    "Bianco",
    "Bik Bok",
    "Bikkembergs",
    "Billabong",
    "Billi Bi",
    "Billionaire Boys Club",
    "Bimba y Lola",
    "Birgitte Herskind",
    "Birkenstock",
    "Bisgaard",
    "Bitte Kai Rand",
    "Biviel",
    "BJORN BORG",
    "Bj\xf6rg",
    "Bj\xf6rn Borg",
    "Black Lily",
    "Black Secret",
    "Black Venus",
    "Blackstone",
    "Blankens",
    "Blauer",
    "Blend",
    "Blink",
    "Blk Dnm",
    "Bloch",
    "Blonde No.8",
    "Blowfish",
    "Bluebella",
    "Blundstone",
    "Bl\xe5kl\xe4der",
    "Bl\xe4ck",
    "Bobbie Burns",
    "Boblbee",
    "Bobux",
    "Bode",
    "BOGGI",
    "Boglioli",
    "Bogs",
    "Bondelid",
    "Boohoo",
    "Boomerang",
    "Boras",
    "Bosch",
    "Boss",
    "Bottega Veneta",
    "Boxfresh",
    "Brain Dead",
    "Brako",
    "Brand Industries",
    "Brandit",
    "Braqeez",
    "Brave Soul",
    "Breitling",
    "Bric-a-Brac",
    "Brioni",
    "British knights",
    "Brixtol",
    "Brixton",
    "Bronx",
    "Brooks Brothers",
    "Brunng\xe5rd",
    "Bruno Banani",
    "Bruno Magli",
    "Bruno Premi",
    "Bruun & Stengade",
    "Bruuns Bazaar",
    "Buffalo",
    "Bugatti",
    "Bukvy",
    "Bullboxer",
    "Bulldozer",
    "Bundgaard",
    "Burberry",
    "Burton",
    "Buscemi",
    "Busnel",
    "Butter goods",
    "Butterfly twists",
    "Bvlgari",
    "BXY",
    "By Burin",
    "By Malene Birger",
    "By Malina",
    "Byblos",
    "B\xe5stad original",
    "C.P. Company",
    "C1rca",
    "Ca Shott",
    "Cactus Plant Dlea Market",
    "Cafenoir",
    "Cala Jade",
    "Calida",
    "Call It Spring",
    "Callaway",
    "Calou",
    "Calvin Klein",
    "Calvin Klein Jeans",
    "Camaieu",
    "Cambio",
    "Camel",
    "Camilla Thulin",
    "Camper",
    "Campomaggi",
    "Canada Goose",
    "Canada Snow",
    "Candice Cooper",
    "Canon",
    "Cappelletti",
    "Caprice",
    "Carhartt",
    "Carin Wester",
    "Caroline Hjerpe",
    "Caroline Svedbom",
    "Carpisa",
    "Carriwell",
    "Cars",
    "Cartier",
    "Carvela",
    "Carven",
    "Casablanca",
    "Casall",
    "Castaner",
    "Catarina Martins",
    "Caterpillar",
    "CATH KIDSTON",
    "Cathrine Hammel",
    "Cavalet",
    "Cayler & Sons",
    "CDLP",
    "Ceannis",
    "Cece L Amour",
    "Cecil",
    "Cecilie bahnsen",
    "CECILIE Copenhagen",
    "Celavi",
    "C\xe9line",
    "Celio",
    "Cellbes",
    "Cellini",
    "Cerruti",
    "Chaco",
    "Champion",
    "Chanel",
    "Chanelle",
    "Charles David",
    "Charles Jeffrey Loverboy",
    "Cheap Monday",
    "Cheapo",
    "Chelsea Peers",
    "Chi Chi London",
    "Chie Mihara",
    "Chimi",
    "China girl",
    "Chinese laundry",
    "Chipie",
    "Chipmunks",
    "Chlo\xe9",
    "Chopard",
    "Christian Lacroix",
    "Christian Louboutin",
    "Christopher Kane",
    "Church\u2019s",
    "Cinque",
    "Ciso",
    "Citizens Of Humanity",
    "Citybird",
    "Clae",
    "Clarks",
    "Claudie Pierlot",
    "Clip Rope",
    "Club L",
    "Club Monaco",
    "CMMN SWDN",
    "Coach",
    "Cobra golf",
    "Coccinelle",
    "Cole Haan",
    "Collusion",
    "Colmar",
    "Colors of California",
    "Colourful Rebel",
    "Columbia",
    "Comma",
    "Comme Des Garcons",
    "Comme des Gar\xe7ons",
    "Common Projects",
    "Comptoir Des Cotonniers",
    "Conguitos",
    "Converse",
    "Copenhagen Muse",
    "Copenhagen studios",
    "Coperni",
    "Coral blue",
    "Corniche By Trickers",
    "Cortefiel",
    "Cos",
    "Coster Copenhagen",
    "Cotton On",
    "Courr\xe8ges",
    "Craft",
    "Craig Green",
    "Cream",
    "Creative recreation",
    "Crime",
    "Criminal Damage",
    "Crocker",
    "Crockett & Jones",
    "Crockett& Jones",
    "Crocs",
    "Croft & Barrow",
    "Cross",
    "Cubus",
    "Culture",
    "Cushe",
    "Custommade",
    "Cutler & Gross",
    "C\xf4te & Ciel",
    "D for Dasia",
    "D.A.T.E.",
    "D&G",
    "Dada",
    "Dagmar",
    "Dahlin",
    "Daisy Grace",
    "Dala clogs",
    "Damir Doma",
    "Damn heels",
    "Dance",
    "Daniblack",
    "Daniel W. Fletcher",
    "Darkstone",
    "Davida",
    "Day Birger & Mikkelsen",
    "Day birger et mikkelsen",
    "DC Shoes",
    "Dea Kudibal",
    "Deadwood",
    "Debbie",
    "DeFacto",
    "Defend Paris",
    "Dekline",
    "Denim Hunter",
    "Depeche",
    "Derhy",
    "Design House Stockholm",
    "Designers remix",
    "Desigual",
    "Deus ex machina",
    "Dewalt",
    "Diadora",
    "Diana Orving",
    "Diane von Furstenberg",
    "Diavolina",
    "Dickies",
    "Dico Copenhagen",
    "Diddi",
    "Didriksons",
    "DIEGA",
    "Diemme",
    "Diesel",
    "Diggers",
    "Dime",
    "DinSko",
    "Dior",
    "Dirty Laundry",
    "Disney",
    "Dita",
    "Divided",
    "Dixie",
    "Djerf Avenue",
    "DKNY",
    "Dkode",
    "Do-win",
    "Dockers",
    "Dockers by Gerli",
    "Docksta",
    "Dodo bar or",
    "Dolce & Gabbana",
    "Dolly Do",
    "Dollybird",
    "Dolomite",
    "Don Donna",
    "Dondup",
    "Donna girl",
    "Donna Karan",
    "Dopie",
    "Dorina",
    "Dorothy Perkins",
    "Dr. Denim",
    "Dr. Martens",
    "Dr. Martens",
    "Dranella",
    "Draven",
    "Dreimaster",
    "Dressmann",
    "Dries van Noten",
    "Dry Lake",
    "Drykorn",
    "Dsquared2",
    "Duffy",
    "Dune",
    "Dunhill",
    "Duskii",
    "D\xe4v",
    "Eagle",
    "Eastpak",
    "Ebbe",
    "Ecco",
    "Eckhaus Latta",
    "Ecko",
    "Ed Hardy",
    "Edwin",
    "Efva Attling",
    "Ek of Sweden",
    "Ekn",
    "El Naturalista",
    "Element",
    "Eleven Paris",
    "Elie Saab",
    "Elie tahari",
    "Elisabetta Franchi",
    "Ellesse",
    "Elliatt",
    "Ellos",
    "Elvine",
    "Elvio Zanon",
    "Em",
    "Emerica",
    "Emilio",
    "Emilio Pucci",
    "Emily van den Bergh",
    "Emporio armani",
    "Emu Australia",
    "Energie",
    "Enfant",
    "Enfants Riches D\xe9prim\xe9s",
    "Engineered Garments",
    "Envie de Fraise",
    "Envii",
    "Equipment",
    "Erdem",
    "Erfo",
    "Ermenegildo Zegna",
    "Escada",
    "Eser",
    "Eskimo",
    "Esprit",
    "Esska",
    "Etam",
    "Etienne Aigner",
    "Etki",
    "Etnies",
    "Eton",
    "Etro",
    "Ettore Adriano",
    "\xc9tudes",
    "Even & Odd",
    "Everest",
    "Evisu",
    "Exani",
    "Exte",
    "Eytys",
    "Ezpz",
    "F-Troupe",
    "Fabi",
    "Fabiana",
    "Fabletics",
    "Facetasm",
    "Faguo",
    "FALKE",
    "Fantasy",
    "Fashion by C",
    "Fashion nova",
    "Fashion Union",
    "Fear Of God Essentials",
    "Feiyue",
    "Fendi",
    "Fenty",
    "Festool",
    "Feud",
    "Fila",
    "Filippa K",
    "Fiona McGuinness",
    "Fiorelli",
    "Firetrap",
    "Fitflop",
    "Fiveunits",
    "Fjallr\xe4ven",
    "Fj\xe4llr\xe4ven",
    "Flash",
    "Flattered",
    "Fly London",
    "Forever 21",
    "Forever New",
    "Fornarina",
    "Fossil",
    "Foxiedox",
    "Frame",
    "Frame Denim",
    "Francesco Morichetti",
    "Franco Sarto",
    "Frank lyman",
    "Frank Wright",
    "Franklin & Marshall",
    "Fred Perry",
    "Free People",
    "Freeman T. Porter",
    "Freequent",
    "French Connection",
    "French Sole",
    "Fresas con Nata",
    "Friboo",
    "Friis Company",
    "From Future",
    "Fruit of The Loom",
    "Frye",
    "Fubu",
    "Fuchs Schmitt",
    "Furla",
    "FWSS",
    "G STAR RAW",
    "G-Star",
    "G-STAR RAW",
    "Gaastra",
    "Gabba",
    "Gabor",
    "Galaxy",
    "Game Boy",
    "Ganni",
    "Gant",
    "Gap",
    "Garden",
    "Gardenia",
    "Gardeur",
    "Garmont",
    "Garvalin",
    "Gasp",
    "GCDS",
    "Geggamoja",
    "Gentle Monster",
    "Genuine Leather",
    "Geox",
    "Gerry Weber",
    "Gestuz",
    "Ghibi",
    "Giacomorelli",
    "Giambattista Valli x H&M",
    "Gianni versace",
    "Giesswein",
    "Gigli",
    "Gilberto",
    "Gildan",
    "Gina Tricot",
    "Giuseppe Zanotti",
    "Givenchy",
    "Glagla",
    "Glamorous",
    "Glerups",
    "GmbH",
    "Gneis",
    "Gogos",
    "Gola",
    "Golden Goose",
    "Goliath",
    "Good news",
    "Gosha Rubchinskiy",
    "Gourmet",
    "Goyard",
    "Gram",
    "Graninge",
    "Gravis",
    "Green Comfort",
    "Groundhog",
    "Guardiadi",
    "Gucci",
    "Gudrun Sj\xf6d\xe9n",
    "Guess",
    "Guidi",
    "Gul & Bl\xe5",
    "Gulliver",
    "Gunilla Ponten",
    "Gymshark",
    "H by Hudson",
    "H&M",
    "H&M Conscious exclusive",
    "H&M STUDIO",
    "H2o Fagerholt",
    "Hackenbusch",
    "Hackett",
    "Hagl\xf6fs",
    "Haider Ackermann",
    "Han Kj\xf8benhavn",
    "Happiness",
    "Happy Holly",
    "Happy Socks",
    "Hard Hearted Harlot",
    "Havaianas",
    "Head",
    "Heelys",
    "Heimstone",
    "HELIOT EMIL",
    "Hell bunny",
    "Helly Hansen",
    "Helmut Lang",
    "Henri Lloyd",
    "Henrik Vibskov",
    "Herm\xe8s",
    "Heron Preston",
    "Herschel",
    "Hip",
    "Hispanitas",
    "Hobbs",
    "Hogan",
    "Hoka One One",
    "Hollies",
    "Hollister",
    "Hood By Air",
    "Hope",
    "Horizn studios",
    "Hoss",
    "Houdini",
    "House Of Dagmar",
    "House of Harlow 1960",
    "House of Lola",
    "House of Montague",
    "Hoya",
    "Hub",
    "Hub Footwear",
    "Hudson",
    "Hugo Boss",
    "Hummel",
    "Hunkem\xf6ller",
    "Hunkon",
    "Hunky Dory",
    "Hunter",
    "Hush Puppies",
    "Husqvarna",
    "Hype",
    "IAMELENI",
    "IcanIwill",
    "Iceberg",
    "Icebug",
    "Ichi",
    "Ida Sj\xf6stedt",
    "IDEAL OF SWEDEN",
    "Ikks",
    "Ilenia P",
    "Ilse Jacobsen",
    "Ilves",
    "Improvd",
    "Imsevimse",
    "Indiska",
    "Inov8",
    "intimissimi",
    "Intrigo",
    "INUIKII",
    "InWear",
    "IRO",
    "Iron Fist",
    "Irregular Choice",
    "Isabel Marant",
    "Isabel Marant Etoile",
    "Issey Miyake",
    "Ivory",
    "J brand",
    "J.Crew",
    "J.Lindeberg",
    "J.W. Anderson",
    "Jack & Jones",
    "Jack and Lily",
    "Jack Wolfskin",
    "Jackal",
    "Jackpot",
    "Jacqueline de Yong",
    "Jacquemus",
    "Jaded London",
    "Jako",
    "Jalas",
    "Jana",
    "Jascha Stockholm",
    "JDY",
    "Jean Paul Gaultier",
    "JEANERICA",
    "Jeffrey Campbell",
    "Jenny by Ara",
    "Jerome Dreyfuss",
    "Jessica Simpson",
    "Jet Set",
    "Jil Sander",
    "Jim Rickey",
    "Jimmy Choo",
    "JJ Footwear",
    "Jofama",
    "John Fluevog",
    "John Galliano",
    "John Spencer",
    "Johnny Bulls",
    "Johnny Was",
    "Johnston Murphy",
    "Joop!",
    "Jordan",
    "Josef Seibel",
    "Joseph",
    "Juicy Couture",
    "Julie Fagerholt",
    "Jumperfabriken",
    "Junk De Luxe",
    "Junkyard",
    "Junya Watanabe",
    "Just Female",
    "Juun.J",
    "K Cobler",
    "K-Swiss",
    "K1X",
    "Kaffe",
    "Kameleont",
    "Kamik",
    "Kangaroos",
    "Kanna",
    "Kaporal",
    "Kappa",
    "KappAhl",
    "Karen by Simonsen",
    "Karen Millen",
    "Karen walker",
    "Karhu",
    "Kari Traa",
    "Karin Halvors",
    "Karl Kani",
    "Karl Lagerfeld",
    "Karmamia",
    "Kat Von D",
    "Kate Spade",
    "Kathleen Madden",
    "Katvig",
    "Kavat",
    "Kawasaki",
    "Keds",
    "Keen",
    "Keep",
    "KENDALL + KYLIE",
    "Kennel Schmenger",
    "Kenneth Cole",
    "Kenzo",
    "Kenzo X H&M",
    "KG by Kurt Geiger",
    "Khaite",
    "Khrio",
    "Kickers",
    "Kidboxer",
    "Kik Kid",
    "Kiko Kostadinov",
    "Killah",
    "Kimmik",
    "King",
    "Kings of Indigo",
    "Kl\xe4ttermusen",
    "Kmb",
    "KnowledgeCotton Apparel",
    "Kompis",
    "Konrad",
    "Kookai",
    "Koral",
    "Korii Joko",
    "Kowalski",
    "Kriss Sweden",
    "Kron by Kron",
    "Kronstadt",
    "Ksubi",
    "KTZ",
    "Kurt Geiger",
    "KVD Los Angeles",
    "L A Gear",
    "L Homme Rouge",
    "L.A.M.B.",
    "L'agence",
    "La Chemise",
    "La Martina",
    "La Perla",
    "La Strada",
    "Lacoste",
    "Lacoste Live",
    "Lacrosse",
    "Lady CG",
    "Lager 157",
    "Lakai",
    "Laksen",
    "Lancel Paris",
    "Lanvin",
    "Lascana",
    "Laura Biagiotti",
    "Laura by Heppo",
    "Lauren Ralph Lauren",
    "LauRie",
    "Lavoro",
    "Lawrence Grey",
    "Lazamani",
    "LdiR",
    "Le Chameau",
    "Le Coq Sportif",
    "Le Specs",
    "LE TEMPS DES CERISES",
    "Lee",
    "Legend",
    "Legero",
    "Lego",
    "Lemaire",
    "Leonard Paris",
    "Les Coyotes de Paris",
    "Les Deux",
    "Lesson 2",
    "Levete Room",
    "Levi\'s",
    "Lexington",
    "Liam Hodges",
    "Libertine-Libertine",
    "Lidl",
    "Liebeskind Berlin",
    "Lily & Rose",
    "Lily And Rose",
    "Linda Farrow",
    "Lindbergh",
    "Lindex",
    "Line of Oslo",
    "Lipsy",
    "Lisa Larson",
    "Lise Lindvig",
    "Little Liffner",
    "Little Marcel",
    "Little Mistress",
    "Liu Jo",
    "Liverpool",
    "Living Kitzb\xfchel",
    "Livly",
    "Lk Bennett",
    "Loake",
    "Lodi",
    "Loewe",
    "Loints of Holland",
    "Lola Ramona",
    "Londain",
    "London Rebel",
    "Longchamp",
    "Lonsdale London",
    "Looking",
    "Loro Piana",
    "Lost Ink",
    "Lotto",
    "Louis Vuitton",
    "Loulou Studio",
    "LTB",
    "Luca Bossi",
    "Ludwig Reiter",
    "Lululemon",
    "Lundhags",
    "Lundmyr of Sweden",
    "Lupilu",
    "Lurdes Bergada",
    "Luxury Rebel",
    "Lyle & Scott",
    "Lyle and Scott",
    "L\xe4eder by Nature",
    "Maa",
    "Madewell",
    "Mads N\xf8rgaard",
    "Magicfelt",
    "Magnanni",
    "Maians",
    "Maison Kitsun\xe9",
    "Maison Margiela",
    "Maison Martin Margiela",
    "Maison Scotch",
    "Maje",
    "Maloles",
    "Mamalicious",
    "Mammut",
    "Manas",
    "Mango",
    "Manolo Blahnik",
    "Mansur Gavriel",
    "Manufacture D Essai",
    "Marc",
    "Marc Aurel",
    "Marc Cain",
    "Marc Ecko",
    "Marc Jacobs",
    "Marc O Polo",
    "Marc O'Polo",
    "Marcelo Burlon",
    "Marco Bossi",
    "Marcus Martinus",
    "Marella",
    "Margaret Howell",
    "Maria Black",
    "Maria Nilsdotter",
    "Marimekko",
    "Marina Ferranti",
    "Marine Serre",
    "Mario Valentino",
    "Marks & Spencer",
    "Marlboro",
    "Marlboro classics",
    "Marmot",
    "Marni",
    "Marques Almeida",
    "Mars\xe8ll",
    "Marta Jonsson",
    "Martine Ali",
    "Martine Rose",
    "Martinelli",
    "Masai",
    "Maska",
    "Massimo Dutti",
    "Matinique",
    "Mauri",
    "Mauro Grifoni",
    "Mavi",
    "Mavic",
    "Max & Co",
    "Max Mara",
    "Max Mara 'S",
    "Max Mara Weekend",
    "Maya deluxe",
    "Mayla",
    "MbyM",
    "McKenzie",
    "McKinley",
    "MCS",
    "Me&I",
    "Meadows",
    "Meindl",
    "Mel",
    "Mellow Yellow",
    "Melton",
    "Melvin Hamilton",
    "Menbur",
    "Mensfield",
    "Mentor",
    "Merchandise",
    "Merrell",
    "Mes Dames",
    "Meshki",
    "Mexicana",
    "Mexx",
    "Micha",
    "Michael Kors",
    "Mickey Club",
    "Miezko",
    "Mih Jeans",
    "Millen",
    "Mina UK",
    "Mini for Many",
    "Mini Rodini",
    "Minimarket",
    "Minimum",
    "Minna Heino",
    "Minna Parikka",
    "Minnetonka",
    "Minnie Mouse",
    "Minus",
    "Mirunz",
    "MISBHV",
    "Miss KG",
    "Miss Me",
    "Miss P",
    "Miss Selfridge",
    "Miss Sixty",
    "Missguided",
    "Missoni",
    "Mister Tee",
    "Mitchell & Ness",
    "Miu Miu",
    "Mjus",
    "Mm6",
    "Mocklis",
    "Mod8",
    "Moda di Fausto",
    "Moeva",
    "Mohedatoffeln",
    "Mohino",
    "Molly Holly",
    "Molo",
    "Moma",
    "Momino",
    "Moncler",
    "Monitor",
    "Monki",
    "Monsoon",
    "Monster High",
    "Montblanc",
    "Montrail",
    "Moomin",
    "Moon Boot",
    "Moonstar",
    "Moose Knuckles",
    "Moreschi",
    "Morris",
    "MOS Copenhagen",
    "Mos Mosh",
    "Moschino",
    "Moschino Love",
    "Moss Copenhagen",
    "Mother",
    "Mother of Pearl",
    "Mouli",
    "MQ",
    "MSGM",
    "MUCHACHOMALO",
    "Muckboot",
    "Muddus",
    "Mugler",
    "Muji",
    "Mulberry",
    "Mumbai",
    "Mumin",
    "Munthe",
    "Munthe plus Simonsen",
    "Mustang",
    "Musto",
    "Muubaa",
    "Muxart Barcelona",
    "Mykita",
    "NA-KD",
    "NAF NAF",
    "Name It",
    "Nana",
    "Nanushka",
    "Napapijri",
    "Nasty gal",
    "NATIONAL GEOGRAPHIC",
    "Native",
    "Naturino",
    "Nautica",
    "Navigator",
    "Needles",
    "Neil Barrett",
    "Nelly",
    "Neo noir",
    "Neosens",
    "Nestor",
    "Network",
    "Neuw",
    "New Balance",
    "New Black",
    "New Era",
    "New Look",
    "New Rock",
    "New York & Company",
    "New Yorker",
    "New Zealand Boots",
    "Newbie",
    "Newhouse",
    "Next",
    "NG by Tero Palmroth",
    "Nicholas Kirkwood",
    "Nike",
    "Nikolaj d'\xc9toiles",
    "Nine West",
    "Nintendo",
    "NN07",
    "Noa Noa",
    "Noah",
    "Nobrand",
    "No\xeb",
    "Noel",
    "Noisy May",
    "Nokia",
    "Nokian",
    "Nolita",
    "Nome",
    "Non Sign\xe9 / Unsigned",
    "Noodles",
    "Noppies",
    "Norr",
    "Norrback",
    "North Sails",
    "Northwawe",
    "Notabene",
    "Notes du Nord",
    "Nova Star",
    "Novita",
    "Novita Man",
    "Nude",
    "Nudie",
    "Nudie Jeans",
    "Nueva Epoca",
    "Nunoo",
    "N\xfanoo",
    "Nyg\xe5rdsanna",
    "N\xfcmph",
    "O",
    "O'Neill",
    "Oakley",
    "Oakwood",
    "OAS Company",
    "Oasis",
    "Obey",
    "Object",
    "Ocra",
    "Odd Molly",
    "Odeur",
    "ODLO",
    "Off-White",
    "Oill",
    "Olang",
    "Old Navy",
    "Old Soles",
    "Oliver Peoples",
    "Olsenhaus Pure Vegan",
    "Olymp",
    "Omega",
    "On",
    "One True Saxon",
    "Onemoment",
    "OnePiece",
    "Oneteaspoon",
    "Onetruesaxon",
    "Onitsuka Tiger",
    "Online Ceramics",
    "Only",
    "ONLY & SONS",
    "Onne",
    "Opus",
    "Original Penguin",
    "Orla Kiely",
    "Orrefors",
    "Orsay",
    "Oscar Jacobson",
    "Osiris",
    "Ottolinger",
    "Our Legacy",
    "Oxygen",
    "Oysho",
    "Paco Gil",
    "Paco Mena",
    "Paco Rabanne",
    "Paez",
    "Paige",
    "Pairs in Paris",
    "Pajar",
    "Pakros",
    "Palace",
    "Palladium",
    "Palm Angels",
    "Paloma wool",
    "Palomo Spain",
    "Panama Jack",
    "Pandora",
    "Pantofola d`Oro",
    "Papillio",
    "Paraboot",
    "Parajumpers",
    "PARFOIS",
    "paria /FARZANEH",
    "Paris Hilton",
    "Parisienne",
    "Park lane",
    "Park west",
    "Part Two",
    "Patagonia",
    "Pataugas",
    "Patrick",
    "Patrizia Pepe",
    "Paul & Friends",
    "Paul & Joe",
    "Paul Frank",
    "Paul Green",
    "Paul Shark",
    "Paul Smith",
    "Pavement",
    "Pax",
    "Peak Performance",
    "Pearl Izumi",
    "Pedag",
    "Pelle P",
    "Penelope",
    "Pepe Jeans",
    "Peperoni",
    "Pepino by Ricosta",
    "Peppercorn",
    "Perfect",
    "Persol",
    "Pertti Palmroth",
    "Peter Kaiser",
    "Petit Bateau",
    "Phase Eight",
    "Philipp Plein",
    "Pieces",
    "Pier One",
    "Pierre Cardin",
    "Pikolinos",
    "Pilgrim",
    "Pimkie",
    "Pink",
    "Pinko",
    "Pinocchio",
    "Play Comme des Gar\xe7ons",
    "Plexx",
    "Po Zu",
    "Poetic",
    "Poetic Licence",
    "Pointer",
    "Polar Loop",
    "Polar Skate Co.",
    "Polarn O. Pyret",
    "Polaroid",
    "Polecat",
    "Polo Ralph Lauren",
    "Pom D Api",
    "Pony",
    "Posse",
    "POW",
    "Prada",
    "Pr\xeat \xe0 Porter",
    "Pretty Ballerinas",
    "Primark",
    "Primeboots",
    "Primigi",
    "Primo Piano",
    "Principe di Bologna",
    "Pring",
    "Pringle of Scotland",
    "Proenza Schouler",
    "Progetto",
    "Prokeds",
    "Pull & Bear",
    "PULZ",
    "Puma",
    "Puma by Alexander McQueen",
    "Pura Lopez",
    "Pure Cashmere Nyc",
    "Pyer Moss",
    "Qasimi",
    "Quay",
    "Quick",
    "Quicksilver",
    "Quiksilver",
    "R.M.Williams",
    "R13",
    "Rabalder",
    "Rabens Saloner",
    "Race Marine",
    "Radii",
    "Raf Simons",
    "Rag & Bone",
    "Ragdoll",
    "Rains",
    "Ralph Boston",
    "Ralph Lauren",
    "Ralph Lauren Denim & Supply",
    "Rap",
    "Ras",
    "Ravn",
    "Ray-Ban",
    "RE-HASH",
    "R\xe9alisation",
    "Rebecca Minkoff",
    "Rebecca Taylor",
    "Red valentino",
    "Redfoot",
    "Redwing",
    "Reebok",
    "Reef",
    "Refined by Bobbie Burns",
    "Rehab",
    "Reima",
    "Reiss",
    "Repeat",
    "Replay",
    "Reschia",
    "Reserved",
    "Residus",
    "Rester\xf6ds",
    "RETROSUPERFUTURE",
    "Rhude",
    "Rice",
    "Rick Owens",
    "Ricosta",
    "Rieker",
    "Rimowa",
    "Rinascimento",
    "Rip Curl",
    "Rip N Dip",
    "River Island",
    "Rivieras",
    "Rizzo",
    "Roberto Botella",
    "Roberto Cavalli",
    "Robustor",
    "Rocco P",
    "Rock and Blue",
    "Rockabilly",
    "Rockandblue",
    "Rocket Dog",
    "Rockport",
    "Rodebjer",
    "Rohde",
    "Rokin",
    "Rolex",
    "Rolling Stones",
    "Rombaut",
    "Romika",
    "Roobin's",
    "Roots",
    "Rose & Born",
    "Rosemunde",
    "Rosner",
    "Rotate",
    "Rotate Birger Christensen ",
    "Rouje",
    "Roxy",
    "Royal RepubliQ",
    "Rubber Duck",
    "Ruby Brown",
    "Rue de Femme",
    "Rugged Eagle footwear",
    "Rugged Gear",
    "Rules by Mary",
    "Rut & Circle",
    "Ruthie Davis",
    "R\xf6hnisch",
    "S. Oliver",
    "Sacai",
    "Sadie & Sage",
    "Sail Racing",
    "Saint Laurent",
    "Saint Tropez",
    "Saint Vacant",
    "Salamander",
    "Salming",
    "Salomon",
    "Salvatore Ferragamo",
    "Sam Edelman",
    "Sams\xf8e Sams\xf8e",
    "Sancho Boots",
    "Sand",
    "Sand Copenhagen",
    "Sanders",
    "Sandqvist",
    "Sandro",
    "Sandro Paris",
    "Sanita Clogs",
    "Sanita Workwear",
    "Sanuk",
    "Saucony",
    "Sbar",
    "Sbu",
    "Scarpa",
    "Schmoove",
    "Schneiders",
    "Scholl",
    "Schott",
    "Scorett",
    "Scotch & Soda",
    "Sebago",
    "Sebastian",
    "Second Female",
    "See by Chlo\xe9",
    "S\xe9fr",
    "Seidensticker",
    "Selected",
    "Selected homme",
    "Self-Portrait",
    "Senator",
    "Senso",
    "S\xe9raphine",
    "Sergio Tacchini",
    "Sessun",
    "S\xe9zane",
    "Shabbies Amsterdam",
    "Shabby Chic",
    "Shake it up",
    "Shein",
    "Shepherd",
    "Shimano",
    "Shoe Biz",
    "Shoe Biz by Gardenia",
    "Shoe shi bar",
    "Shoe the Bear",
    "Sies Marjan",
    "Sievi",
    "Simone Gabor",
    "Simone Rocha",
    "Simple",
    "Sinsay",
    "Sioux",
    "Sisley",
    "Sisters Point",
    "Six Ames",
    "Sixth June",
    "Sixtyseven",
    "Skechers",
    "Skin by Finsk",
    "Skofabriken Stockholm",
    "Sk\xf6na Marie",
    "Sloggi",
    "Sneaky Steve",
    "Snipe",
    "Soaked",
    "Soaked In Luxury",
    "SOC",
    "Soda",
    "Sofie Schnoor",
    "Soft Comfort",
    "Soft Goat",
    "Soft Rebels",
    "Softinos",
    "Sole",
    "Solid",
    "Someday",
    "Sonia Rykiel",
    "Sony",
    "Sophie by Sophie",
    "Sorel",
    "Soulland",
    "Soulmate",
    "Soulstar",
    "Soxo",
    "Soyaconcept",
    "Spalwart",
    "Spanx",
    "Speedo",
    "Sperry Top-Sider",
    "Spiderman",
    "Spm",
    "Sportmax",
    "Sportswear",
    "Springfield",
    "SSS World Corp",
    "Stampd",
    "Stand Studio",
    "Star Trek",
    "Star Wars",
    "Stau",
    "Stefanel",
    "Steffen Schraut",
    "Stella McCartney",
    "Stella McCartney Pour Adidas",
    "Stella Nova",
    "Stenk",
    "Stenstr\xf6ms",
    "Steptronic",
    "Steve Madden",
    "Steven alan",
    "Sthlm DG",
    "Stig Lindberg",
    "Stine Goya",
    "STOCKH LM",
    "Stone Island",
    "Stork Steps",
    "Stradivarius",
    "Strawberry Shortcake",
    "Street One",
    "Strellson",
    "STRONGER",
    "Str\xf6ms",
    "Stuart Weitzman",
    "Stutterheim",
    "Stylein",
    "Stylesnob",
    "St\xfcssy",
    "Suecomma Bonnie",
    "Sugarfree shoes",
    "Sugarhill Brighton",
    "Sun Buddies",
    "Suncoo",
    "Sunnei",
    "Superdry",
    "Superfit",
    "Superga",
    "Supertrash",
    "Supra",
    "Supreme",
    "Supremebeing",
    "Svea",
    "Swear London",
    "Swedish Hasbeens",
    "Sweeks",
    "Swims",
    "Swissies",
    "T.U.K.",
    "Tamaris",
    "Tara Jarmon",
    "Targus",
    "Tatoosh",
    "Tbs",
    "Techno",
    "Tecnica",
    "Ted Baker",
    "Telfar",
    "Tellus",
    "Ten Points",
    "Tenson",
    "Terra Plana",
    "Terranova",
    "Tessa Mimmi Clogs",
    "Testbrand",
    "Teurn Studios",
    "Teva",
    "Tezenis",
    "TFNC London",
    "The classy issue",
    "The Kooples",
    "The last conspiracy",
    "the local firm",
    "The North Face",
    "The Row",
    "The Seller",
    "THE SHIRT FACTORY",
    "The Urban Project",
    "The Vampire's Wife x H&M",
    "Theory",
    "Theresia M.",
    "These Glory Days",
    "Thierry Lasry",
    "Think",
    "Thinsulate",
    "Thom Brovne",
    "Thomas Sabo",
    "Thrasher",
    "Tiamo",
    "Tibi",
    "Tiger",
    "Tiger mist",
    "Tiger of Sweden",
    "Tigha",
    "Timberland",
    "Tissot",
    "Tiziana",
    "TNY",
    "Toga Pulla",
    "Tom Ford",
    "Tom Joule",
    "Tom Tailor",
    "Tom Wood",
    "Tommy Bahama",
    "Tommy Hilfiger",
    "Tommy Jeans",
    "Toms",
    "Tony Mora",
    "Tony Perotti",
    "Topman",
    "Topshop",
    "Tory Burch",
    "Tosca Blu",
    "Toteme",
    "Tous",
    "Toy Story",
    "Treksta",
    "Trendyol",
    "TR\xc9S BIEN",
    "Tretorn",
    "Triangl",
    "Triwa",
    "True Religion",
    "Trussardi",
    "Tsubo",
    "Tuzzi",
    "Twin Set",
    "Twist & Tango",
    "U.S. Polo Assn.",
    "U.S. Star",
    "Ugg",
    "Ukala",
    "Ulla Popken",
    "Ulle",
    "Umbro",
    "Undefteated",
    "Under Armour",
    "Undercover",
    "Underground",
    "Underground England",
    "Uniforms for the Dedicated",
    "Uniqlo",
    "Unisa",
    "United Colors of Benetton",
    "United Nude",
    "Uno",
    "Unstiched Utilities",
    "Urban Outfitters",
    "Urban revivo",
    "Uterque",
    "V Ave Shoe Repair",
    "Vagabond",
    "Vailent",
    "Valentino",
    "Valentino Garavani",
    "Valerie",
    "Valerie Khalfon",
    "Valontano",
    "Valsport",
    "Van Gils",
    "Van Laack",
    "Vanessa Bruno",
    "Vans",
    "Veja",
    "Velour",
    "Venettini",
    "Venice",
    "Vero Moda",
    "Veronica Virta",
    "Versace",
    "Versace 19.69",
    "Vetements",
    "Via vai",
    "Vibram",
    "Victoria",
    "Victoria Beckham",
    "Victoria\u2019s Secret",
    "Viking",
    "Viktor&Rolf",
    "Vila",
    "Villervalla",
    "Vince",
    "Vince Camuto",
    "Vincent",
    "Vintage",
    "Virus",
    "Vision",
    "Visvim",
    "Vithings Pulse",
    "Vivienne Westwood",
    "Vivobarefoot",
    "Vlado",
    "Volcom",
    "Voly",
    "Vood Vood",
    "Vt collection",
    "Wallis",
    "Walter Van Beirendonck",
    "Wandelei",
    "Warehouse",
    "Warrior",
    "Weekday",
    "Wera",
    "Werner",
    "Werner Kern",
    "Wesc",
    "Whistles",
    "White Mountaineering",
    "Why Not",
    "Whyred",
    "Wiges",
    "Wildflower",
    "Williot",
    "Wilson",
    "Winnie the Pooh",
    "Woden",
    "Wolsey",
    "Wolverine",
    "Won Hundred",
    "Wonderbra",
    "Wonders",
    "Wood Wood",
    "Woolrich",
    "World Industries",
    "WOS",
    "Wrangler",
    "WTAPS",
    "Xenon",
    "Xti",
    "Xti Kids",
    "Y-3",
    "Y/Project",
    "Yamaha",
    "Yang Li",
    "YAS",
    "YAYA",
    "Yeezy",
    "Yellow Cab",
    "YKX",
    "Yoana baraschi",
    "Yohji Yamamoto",
    "Yourturn",
    "Yves Saint Laurent",
    "Zadig & Voltaire",
    "Zara",
    "Zay",
    "Zdar",
    "Zeus",
    "Zign",
    "Zimmermann",
    "Zizzi",
    "Zoggs",
    "Zoo York",
    "Zunblock",
    "\xc5hl\xe9ns"
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a9ry4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setFieldValue", ()=>setFieldValue);
parcelHelpers.export(exports, "showModelSuggestion", ()=>showModelSuggestion);
parcelHelpers.export(exports, "showSelectedModel", ()=>showSelectedModel);
parcelHelpers.export(exports, "selectFieldValue", ()=>selectFieldValue);
parcelHelpers.export(exports, "setFormValuesFromModel", ()=>setFormValuesFromModel);
parcelHelpers.export(exports, "setupModelSearchEventListeners", ()=>setupModelSearchEventListeners);
parcelHelpers.export(exports, "removeSelectedModel", ()=>removeSelectedModel);
parcelHelpers.export(exports, "displayFindModelDiv", ()=>displayFindModelDiv);
var _sellItem = require("./sellItem");
var _sellItemHelpers = require("./sellItemHelpers");
const setFieldValue = (fieldId, value)=>{
    document.getElementById(fieldId).value = value || '';
    document.getElementById(fieldId).dispatchEvent(new Event('input'));
};
const showModelSuggestion = (model)=>{
    showSelectedModel(model, false);
    document.getElementById('findModelTitle').innerText = "\xc4r det denna modell?";
    document.getElementById('findNewModel').style.display = 'flex';
    document.getElementById('removeModelIcon').style.display = 'none';
    document.getElementById('modelSuggestButtons').style.display = 'flex';
    document.getElementById('rejectModel').style.opacity = '100';
    document.getElementById('confirmModel').style.opacity = '100';
};
const showSelectedModel = (model)=>{
    // Show selected model in search box
    document.getElementById('findModelDescription').style.display = 'none';
    document.getElementById('findNewModel').style.display = 'flex';
    document.getElementById('findModelBoxEmpty').style.display = 'none';
    document.getElementById('findModelBoxFilled').style.display = 'flex';
    document.getElementById('modelSuggestButtons').style.display = 'none';
    document.getElementById('findModelTitle').innerText = 'Modell';
    document.getElementById('removeModelIcon').style.display = 'flex';
    document.getElementById('findModelBoxFilled').setAttribute("data-model", JSON.stringify(model));
    document.getElementById('findModelBoxImage').style.backgroundImage = `url('${model["coverImageSmall"]}')`;
    document.getElementById('findModelBoxNameCategory').innerText = `${model['brand']}, ${model['category']}`;
    document.getElementById('findModelBoxName').innerText = `${model['maiName']}`;
    if (model['maiColor']) {
        document.getElementById('findModelBoxColor').style.display = 'block';
        document.getElementById('findModelBoxColor').innerText = `${(0, _sellItemHelpers.colorName)((0, _sellItemHelpers.capitalizeFirstLetter)(model['maiColor']))}`;
    } else document.getElementById('findModelBoxColor').style.display = 'none';
    if (model.brand !== 'Eytys' && model.gender) {
        document.getElementById('findModelBoxGender').style.display = 'block';
        if (model.gender === 'Unisex' || model.multiGender || allModelsMatching(model).length === 2) document.getElementById('findModelBoxGender').innerText = `Unisex`;
        else {
            const genders = {
                'Woman': 'Dam',
                'Man': 'Herr'
            };
            document.getElementById('findModelBoxGender').innerText = `${genders[model.gender] || model.gender}`;
        }
    } else document.getElementById('findModelBoxGender').style.display = 'none';
};
const selectSize = (model)=>(event)=>{
        closeModelSelect();
        showSelectedModel(model);
        // Fill form with attributes from selected model
        setFormValuesFromModel(model, event.target.innerText);
    };
function selectFieldValue(field, value) {
    const selectIndex = Array.from(field.options).map((elm)=>elm.attributes.value.value.toLowerCase()).indexOf(value?.toLowerCase());
    if (selectIndex > 0) {
        field.selectedIndex = selectIndex;
        field.style.color = "#333";
    } else {
        field.selectedIndex = 0;
        field.style.color = '#929292';
    }
    field.dispatchEvent(new Event('input'));
    field.dispatchEvent(new Event('change'));
}
const setFormValuesFromModel = (model, size, optionalGender = false)=>{
    if (optionalGender) {
        if (!model.multiGender && model.gender !== 'Unisex') document.getElementById(model.gender)?.parentElement?.click();
    } else document.getElementById(model.gender)?.parentElement?.click();
    if (size) setFieldValue('itemSize', size);
    setFieldValue('itemMaterial', model['material']);
    setFieldValue('itemModel', model['maiName']);
    setFieldValue('itemOriginalPrice', model['originalPriceSek']);
    if (model['collectionYear']) {
        const yearDiff = new Date().getFullYear() - model['collectionYear'];
        // Depending on yearDiff value we translate to a itemAge selectedIndex using this ageIndex array
        const ageIndex = [
            1,
            1,
            2,
            3,
            4,
            4,
            5,
            5,
            5
        ];
        const ageField = document.getElementById('itemAge');
        ageField.selectedIndex = ageIndex[yearDiff] || 6;
        ageField.style.color = 'rgb(51, 51, 51)';
        ageField.dispatchEvent(new Event('input'));
        ageField.dispatchEvent(new Event('change'));
    }
    if (model['category']) {
        document.getElementById('itemCategory').value = model['category'];
        $('#itemCategory').trigger('change');
    }
    if (document.getElementById('itemColor').querySelector('[value="' + (0, _sellItemHelpers.capitalizeFirstLetter)(model['maiColor']) + '"]')) selectFieldValue(document.getElementById('itemColor'), model['maiColor']);
};
let modelDbModels;
const modelDb = ()=>{
    if (!modelDbModels) {
        const savedModels = sessionStorage.getItem('models');
        modelDbModels = JSON.parse(savedModels);
    }
    return modelDbModels;
};
const allModelsMatching = (model)=>modelDb()?.filter((m)=>m.maiName === model.maiName && m.maiColor === model.maiColor && m.category === model.category && m.color === model.color);
const showModelSizes = (modelClicked)=>{
    window.scrollTo({
        top: 0
    });
    document.getElementById('chooseModelHeader').classList.add('stickyHeader');
    const templateSize = document.getElementById('modelSizeTemplate');
    const modelSizeList = document.getElementById('modelSizeList');
    const modelSizeList2 = document.getElementById('modelSizeList2');
    while(modelSizeList.firstChild)modelSizeList.removeChild(modelSizeList.lastChild);
    while(modelSizeList2.firstChild)modelSizeList2.removeChild(modelSizeList2.lastChild);
    const model = JSON.parse(modelClicked.getAttribute("data-model"));
    if (model.sizes.length === 1) return selectSize(model)({
        target: {
            innerText: model.sizes[0]
        }
    });
    const genderModels = allModelsMatching(model);
    // genderModels should contain 1 or 2 models (Man / Woman or Man & Woman)
    const modelSizes = genderModels[0].sizes.slice()?.sort();
    const otherModelSizes = genderModels[1]?.sizes.slice()?.sort();
    const differentSizes = otherModelSizes && (otherModelSizes?.length !== modelSizes.length || !modelSizes.every((size, index)=>size === otherModelSizes[index]));
    document.getElementById('modelSizeListHeading').style.display = differentSizes ? 'block' : 'none';
    document.getElementById('modelSizeList2Heading').style.display = differentSizes ? 'block' : 'none';
    const createSizeNode = (idx, genderModel, sizeList, size)=>{
        const newNode = templateSize.cloneNode(true);
        newNode.id = `${templateSize.id}_${idx}`;
        newNode.addEventListener('click', linkClickTracker);
        newNode.style.display = 'flex';
        newNode.addEventListener('click', function clickHandler(event) {
            selectSize(genderModel)(event);
            this.removeEventListener('click', clickHandler);
        });
        for (const child of Array.from(newNode.getElementsByTagName('*')))child.id = `${child.id}_${genderModel.gender}_${idx}`;
        sizeList.appendChild(newNode);
        document.getElementById(`modelSize_${genderModel.gender}_${idx}`).innerText = size;
    };
    for (const genderModel of differentSizes ? genderModels : genderModels.slice(0, 1)){
        modelSizeList.parentElement.style.display = !differentSizes && genderModel.gender !== 'Woman' ? 'none' : 'block';
        for (const [idx, size] of genderModel.sizes.sort(sizeCompare).entries()){
            const sizeSplits = size.split("-");
            createSizeNode(idx, genderModel, genderModel.gender === 'Woman' ? modelSizeList : modelSizeList2, sizeSplits.pop());
            if (genderModel.gender === 'Unisex' && sizeSplits.length === 1) {
                // We have some models with Unisex and ['xxs-xs', 'xs-s', 's-m'] sizes, split them up and show as Woman-Man sizes
                document.getElementById('modelSizeListHeading').style.display = 'block';
                document.getElementById('modelSizeList2Heading').style.display = 'block';
                createSizeNode(`${idx}u`, genderModel, modelSizeList, sizeSplits[0]);
                modelSizeList.parentElement.style.display = 'block';
            }
        }
    }
    modelSizeList.parentElement.style.display = modelSizeList.children.length ? 'block' : 'none';
    modelSizeList2.parentElement.style.display = modelSizeList2.children.length ? 'block' : 'none';
};
const selectModel = (event)=>{
    document.getElementById('modelList').style.display = 'none';
    document.getElementById('modelSizeSelect').style.display = 'block';
    document.getElementById('modelSelectTitle').innerText = "V\xe4lj storlek";
    document.getElementById('modelSelectTitle').style.marginLeft = '42%';
    showModelSizes(event.currentTarget);
};
const showModelItems = (models)=>{
    document.getElementById('modelSelectTitle').style.marginLeft = '0%';
    document.getElementById('chooseModelHeader').classList.remove('stickyHeader');
    window.scrollTo({
        top: 0
    });
    const templateCard = document.getElementById('modelCardTemplate');
    const modelResultList = document.getElementById('modelResultList');
    while(modelResultList.firstChild)modelResultList.removeChild(modelResultList.lastChild);
    const modelsToShow = models.filter((model)=>{
        const sameModelOtherGender = models.find((m)=>m.maiName === model.maiName && m.maiColor === model.maiColor && m.category === model.category && m.gender !== model.gender);
        if (sameModelOtherGender) model.multiGender = 'Unisex';
        return !sameModelOtherGender || model.gender === 'Woman';
    });
    for (const [idx, model] of modelsToShow.entries()){
        const newNode = templateCard.cloneNode(true);
        newNode.id = `${templateCard.id}_${idx}`;
        newNode.addEventListener('click', linkClickTracker);
        newNode.style.display = 'flex';
        newNode.style.cursor = 'pointer';
        newNode.setAttribute("data-model", JSON.stringify(model));
        newNode.addEventListener('click', selectModel);
        for (const child of Array.from(newNode.getElementsByTagName('*')))child.id = `${child.id}_${idx}`;
        modelResultList.appendChild(newNode);
        document.getElementById(`modelImage_${idx}`).src = model['coverImageSmall'];
        document.getElementById(`brandNameCategory_${idx}`).innerText = `${[
            model['brand'],
            model['category']
        ].filter((e)=>e).join(', ')}`;
        document.getElementById(`modelName_${idx}`).innerText = `${model['maiName']}`;
        if (model['maiColor']) document.getElementById(`modelColor_${idx}`).innerText = `${(0, _sellItemHelpers.colorName)((0, _sellItemHelpers.capitalizeFirstLetter)(model['maiColor']))}`;
        else document.getElementById(`modelColor_${idx}`).style.display = 'none';
        if (model.brand !== 'Eytys' && (model['multiGender'] || model['gender'])) {
            const genders = {
                'Woman': 'Dam',
                'Man': 'Herr'
            };
            document.getElementById(`modelGender_${idx}`).innerText = `${model['multiGender'] || genders[model['gender']] || model['gender']}`;
        } else document.getElementById(`modelGender_${idx}`).style.display = 'none';
    }
};
const mostPopularEytysModels = [
    "mother ",
    "odessa ",
    "benz ",
    "doja ",
    "angel ",
    "fugu ",
    "naomi ",
    "cypress ",
    "titan ",
    "laguna ",
    "aphex ",
    "jet turbo ",
    "maze ",
    "ortega ",
    "raven ",
    "alexia ",
    "carmen ",
    "ferris ",
    "halo ",
    "jade ",
    "jet ",
    "michigan ",
    "olympia ",
    "sonic "
];
const mostPopularFilippaKModels = [
    "alexa ",
    "mika yak funnelneck sweater",
    "sammy shirt",
    "terry cropped trousers",
    "karlie trousers"
];
const popIdx = (popularModels, name)=>popularModels.find((e)=>name.startsWith(e)) ? popularModels.findIndex((e)=>name.startsWith(e)) : 100;
function modelCompare(a, b) {
    if (a.brand === 'Filippa K' && b.brand === 'Filippa K') {
        const nameA = a["maiName"].toLowerCase();
        const nameB = b["maiName"].toLowerCase();
        const nameAPopIdx = popIdx(mostPopularFilippaKModels, nameA);
        const nameBPopIdx = popIdx(mostPopularFilippaKModels, nameB);
        if (nameAPopIdx > nameBPopIdx) return 1;
        else if (nameAPopIdx < nameBPopIdx) return -1;
    }
    // For Blankens, jewelry should come last
    if (a.brand === 'Blankens' && b.brand === 'Blankens') {
        const jewelryCategories = [
            'Armband',
            "\xd6rh\xe4nge",
            'Halsband',
            'Ring'
        ];
        const isAJewelry = jewelryCategories.includes(a.category);
        const isBJewelry = jewelryCategories.includes(b.category);
        // If one is jewelry and the other isn't, put jewelry last
        if (isAJewelry && !isBJewelry) return 1;
        if (!isAJewelry && isBJewelry) return -1;
        // If both are jewelry or both are not, maintain their current order
        return 0;
    }
    if (a.brand === 'Eytys' && b.brand === 'Eytys') {
        const nameA = a["maiName"].toLowerCase();
        const nameB = b["maiName"].toLowerCase();
        const nameAPopIdx = popIdx(mostPopularEytysModels, nameA);
        const nameBPopIdx = popIdx(mostPopularEytysModels, nameB);
        if (nameAPopIdx < 100 || nameBPopIdx < 100) {
            if (nameAPopIdx > nameBPopIdx) return 1;
            else if (nameAPopIdx < nameBPopIdx) return -1;
        }
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
    }
    return 0;
}
function sizeCompare(a, b) {
    const sizeOrdering = [
        'XXS',
        'XS',
        'S',
        'M',
        'L',
        'XL',
        'XXL'
    ];
    if (sizeOrdering.indexOf(a) > -1 && sizeOrdering.indexOf(b) > -1) return sizeOrdering.indexOf(a) - sizeOrdering.indexOf(b);
    return a - b;
}
let scrollY;
function showFindModelPage() {
    scrollY = window.scrollY;
    document.getElementById('header').style.display = 'none';
    document.getElementById('addItemFormDiv').style.display = 'none';
    document.getElementById('modelSelectError').style.display = 'none';
    document.getElementById('modelSizeSelect').style.display = 'none';
    document.getElementById('modelSelectTitle').innerText = "V\xe4lj modell";
    document.getElementById('modelSelectDiv').style.display = 'block';
    document.getElementById('modelList').style.display = 'block';
    document.getElementById('modelSearchInput').value = '';
    window.scrollTo({
        top: 0
    });
    let modelDb = sessionStorage.getItem('models');
    if (!modelDb) {
        document.getElementById('modelSpinner').style.display = 'flex';
        const timerId = setInterval(()=>{
            modelDb = sessionStorage.getItem('models');
            if (modelDb) {
                clearInterval(timerId);
                document.getElementById('modelSpinner').style.display = 'none';
                showModelItems(JSON.parse(modelDb).sort(modelCompare).slice(0, 500));
            }
        }, 1000);
    } else {
        document.getElementById('modelSpinner').style.display = 'none';
        showModelItems(JSON.parse(modelDb).sort(modelCompare).slice(0, 500));
    }
}
const closeModelSelect = ()=>{
    document.getElementById('addItemFormDiv').style.display = 'block';
    document.getElementById('modelSelectDiv').style.display = 'none';
    document.getElementById('modelSizeSelect').style.display = 'none';
    document.getElementById('header').style.display = 'block';
    window.scrollTo({
        top: scrollY
    });
};
const setupModelSearchEventListeners = ()=>{
    document.getElementById('findModelBoxEmpty').addEventListener('click', showFindModelPage);
    document.getElementById('findNewModel').addEventListener('click', showFindModelPage);
    document.getElementById('modelSelectClose').addEventListener('click', ()=>{
        closeModelSelect();
    });
    document.getElementById('modelSearchInput').addEventListener('input', ()=>{
        const modelSearchString = document.getElementById('modelSearchInput').value;
        const modelDb = JSON.parse(sessionStorage.getItem('models'));
        if (modelSearchString && modelSearchString.length > 1) {
            const keys = [
                "maiName",
                "category",
                "color",
                "maiColor",
                "articleNumber",
                "name",
                "gender"
            ];
            const fuse = new Fuse(modelDb, {
                includeScore: true,
                minMatchCharLength: 2,
                keys
            });
            const searchTerms = modelSearchString.replace(', ', ' ').split(' ').map((0, _sellItemHelpers.swedishColorToEnglish)).map(swedishGenderToEnglish);
            const searchObjects = searchTerms.flatMap((str)=>keys.map((key)=>({
                        [key]: str
                    })));
            const searchResult = fuse.search({
                $or: searchObjects
            });
            showModelItems(searchResult.map((r)=>r.item));
        } else showModelItems(modelDb.sort(modelCompare).slice(0, 500));
    });
    const swedishGenderToEnglish = (gender)=>{
        const genders = {
            'dam': 'woman',
            'herr': 'man'
        };
        return genders[gender?.toLowerCase()] || gender;
    };
    document.getElementById('removeModelIcon').addEventListener('click', (event)=>{
        removeSelectedModel();
        event.stopPropagation();
        event.preventDefault();
        (0, _sellItem.rememberUnsavedChanges)();
    });
};
const removeSelectedModel = ()=>{
    document.getElementById('itemModel').value = '';
    document.getElementById('findModelBoxEmpty').style.display = 'flex';
    document.getElementById('findModelBoxFilled').style.display = 'none';
    document.getElementById('findModelDescription').style.display = 'block';
    document.getElementById('findNewModel').style.display = 'none';
};
const displayFindModelDiv = async (value)=>{
    if (isBrandPartner(value)) {
        findModelDiv.style.display = 'block';
        if (localStorage.getItem('detectedModel')) {
            let detectedModel = JSON.parse(localStorage.getItem('detectedModel'));
            if (detectedModel.brand === itemBrand.value) showModelSuggestion(detectedModel);
            localStorage.removeItem('detectedModel');
        }
        let models = sessionStorage.getItem('models') ? JSON.parse(sessionStorage.getItem('models')) : undefined;
        if (!models || models[0]?.brand !== value) {
            sessionStorage.removeItem('models');
            callBackendApi(`/api/models?brand=${value}`).then((response)=>{
                console.log(`Got model response ${response.data.length}`);
                sessionStorage.setItem('models', JSON.stringify(response.data));
            });
        }
        return true;
    } else findModelDiv.style.display = 'none';
};

},{"./sellItem":"edX6B","./sellItemHelpers":"8xEoj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["e7GTA","edX6B"], "edX6B", "parcelRequire81ca", {})

//# sourceMappingURL=sellItem.js.map
