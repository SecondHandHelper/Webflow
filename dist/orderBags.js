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
})({"3iht3":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SERVER_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "6bede3a7c0d1c667";
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

},{}],"bckJC":[function(require,module,exports,__globalThis) {
var _general = require("./general");
const params = getParamsObject();
if (params.app) {
    const goBackButtons = document.querySelectorAll('.goback');
    goBackButtons.forEach((button)=>{
        button.style.visibility = 'hidden';
    });
}
var maxNumBags = 10;
async function getMaxNumBags() {
    const maxBags = await callBackendApi('/api/bags/orders/allowed', {
        requiresAuth: true
    });
    if (maxBags?.data) {
        if (maxBags.data?.errorCode === 'unfulfilled-order') {
            document.getElementById('orderBagsError').style.display = 'block';
            document.getElementById('orderBagsError').innerText = "Du har nyligen lagt en best\xe4llning som \xe4r p\xe5 v\xe4g till dig.\nV\xe4nta in p\xe5sarna innan du l\xe4gger fler best\xe4llningar.";
            return 0;
        }
        if (maxBags.data?.maxOrderBags === 0) {
            document.getElementById('orderBagsError').style.display = 'block';
            document.getElementById('orderBagsError').innerText = "Du kan bara best\xe4lla p\xe5sar om\ndu har p\xe5g\xe5ende f\xf6rs\xe4ljningar.";
            return 0;
        }
        maxNumBags = Math.min(maxBags.data.maxOrderBags, maxNumBags);
        return maxNumBags;
    }
}
function validateAndDecrease(input) {
    input.value = Math.max(+input.value - 1, 0);
    input.style.color = +input.value === 0 ? '#c3c2c2' : '#000';
    updateOrderButton();
}
function numOrdered() {
    return +document.getElementById('numSmall').value + +document.getElementById('numMedium').value + +document.getElementById('numLarge').value + +document.getElementById('numXLarge').value;
}
function updateOrderButton() {
    document.getElementById('orderBags').innerText = `Best\xe4ll ${numOrdered()} ${bagOrBags()} gratis`;
    document.getElementById('orderBagsError').style.display = 'none';
}
function bagOrBags() {
    return numOrdered() === 1 ? "p\xe5se" : "p\xe5sar";
}
function validateAndIncrease(input) {
    if (numOrdered() >= 10) return;
    input.value = Math.min(+input.value + 1, 10);
    updateOrderButton();
    if (+input.value === 1) input.style.color = 'black';
}
function isSet(str) {
    return str?.replace(/\s/g, '')?.length > 0;
}
async function isAdressSet() {
    const doc = await db.collection("users").doc(authUser.current.uid).get();
    const { addressFirstName, addressLastName, addressStreetAddress, addressPostalCode, addressCity } = doc.data();
    return [
        addressFirstName,
        addressLastName,
        addressStreetAddress,
        addressPostalCode,
        addressCity
    ].every(isSet);
}
function addInputComponentEventListeners(minusElm, plusElm, inputElm) {
    document.getElementById(minusElm).addEventListener("click", function() {
        validateAndDecrease(document.getElementById(inputElm));
    });
    document.getElementById(plusElm).addEventListener("click", function() {
        validateAndIncrease(document.getElementById(inputElm));
    });
}
addInputComponentEventListeners('minusSmall', 'plusSmall', 'numSmall');
addInputComponentEventListeners('minusMedium', 'plusMedium', 'numMedium');
addInputComponentEventListeners('minusLarge', 'plusLarge', 'numLarge');
addInputComponentEventListeners('minusXLarge', 'plusXLarge', 'numXLarge');
document.getElementById('userAddressForm').addEventListener("submit", async ()=>{
    const addressFields = (0, _general.getFormAddressFields)();
    const userRef = db.collection('users').doc(authUser.current.uid);
    await userRef.update(addressFields);
    document.getElementById('orderBagsConfirmation').style.display = 'block';
    analytics.track("Element Viewed", {
        elementID: "orderBagsConfirmation"
    });
    document.getElementById('addressFormDiv').style.display = 'none';
});
document.getElementById('orderBags').addEventListener('click', async function() {
    if (numOrdered() === 0) {
        document.getElementById('orderBagsError').style.display = 'block';
        document.getElementById('orderBagsError').innerText = "V\xe4lj minst 1 p\xe5se";
        return;
    }
    if (numOrdered() > 10) {
        document.getElementById('orderBagsError').style.display = 'block';
        document.getElementById('orderBagsError').innerText = "Max 10 p\xe5sar per best\xe4llning";
        return;
    }
    document.getElementById('orderBagsError').style.display = 'none';
    document.getElementById('orderBags').style.display = 'none';
    document.getElementById('orderBagsSpinner').style.display = 'flex';
    //Tobias added
    const maxNumBags = await getMaxNumBags();
    if (maxNumBags === 0) {
        document.getElementById('orderBags').style.display = 'flex';
        document.getElementById('orderBagsSpinner').style.display = 'none';
        return;
    }
    if (numOrdered() > maxNumBags) {
        document.getElementById('orderBagsError').style.display = 'block';
        document.getElementById('orderBagsError').innerText = `Inte fler \xe4n antalet p\xe5g\xe5ende f\xf6rs\xe4ljningar, dvs ${maxNumBags}`;
        document.getElementById('orderBags').style.display = 'flex';
        document.getElementById('orderBagsSpinner').style.display = 'none';
        return;
    }
    const numSmallBags = +document.getElementById('numSmall').value;
    const numMediumBags = +document.getElementById('numMedium').value;
    const numLargeBags = +document.getElementById('numLarge').value;
    const numXLargeBags = +document.getElementById('numXLarge').value;
    try {
        await callBackendApi('/api/bags/order', {
            data: {
                numXLargeBags,
                numLargeBags,
                numSmallBags,
                numMediumBags
            }
        });
        document.getElementById('bagsOrdered').innerText = `${numOrdered()} ${bagOrBags()} p\xe5 v\xe4g!`;
    } catch (e) {
        errorHandler.report(e);
        document.getElementById('orderBagsError').style.display = 'block';
        document.getElementById('orderBagsError').innerText = "N\xe5got gick fel vid best\xe4llningen. F\xf6rs\xf6k igen och kontakta oss om det fortfarande inte fungerar.";
        document.getElementById('orderBags').style.display = 'flex';
        document.getElementById('orderBagsSpinner').style.display = 'none';
        return;
    }
    document.getElementById('orderBagsForm').style.display = 'none';
    if (await isAdressSet()) document.getElementById('orderBagsConfirmation').style.display = 'block';
    else {
        const userDocRef = await db.collection('users').doc(authUser.current.uid).get();
        const userDoc = userDocRef.data();
        document.getElementById('addressFormDiv').style.display = 'block';
        analytics.track("Element Viewed", {
            elementID: "addressFormDiv"
        });
        (0, _general.setFormAddressFields)(userDoc);
    }
});
document.getElementById('closeOrderBagsConfirmationButton').addEventListener("click", function() {
    document.getElementById('closeOrderBagsConfirmationButton').style.display = 'none';
    document.getElementById('closeOrderBagsSpinner').style.display = 'flex';
});

},{"./general":"lWrRo"}],"lWrRo":[function(require,module,exports,__globalThis) {
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

},{}]},["3iht3","bckJC"], "bckJC", "parcelRequire81ca", {})

//# sourceMappingURL=orderBags.js.map
