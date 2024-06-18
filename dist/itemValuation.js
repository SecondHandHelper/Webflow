// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
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
        this
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
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

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

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"an9lk":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "3e12d32e176d291d";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
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
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
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
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
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
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
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
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
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
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
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
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
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
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
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
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
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
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"bCEVa":[function(require,module,exports) {
var _general = require("./general");
window.itemValuationJsLoaded = true;
async function showDeclineValuation(item) {
    document.getElementById("valuationHeading").style.display = "none";
    document.getElementById("valuationMotivation").style.display = "none";
    document.getElementById("valuationText").innerText = "S\xe4ljer ej";
    document.getElementById("valuationText").style.display = "block";
    document.getElementById("rejectButton").style.display = "none";
    document.getElementById("confirmButton").style.display = "none";
    document.getElementById("okejButton").style.display = "flex";
    document.getElementById("newItemButton").style.display = "flex";
    document.getElementById("declineExplanation").style.display = "block";
    document.getElementById("valuationRange").style.display = "none";
    document.getElementById("adjustIntervalButton").style.display = "none";
    document.getElementById("valuationExplanation").style.display = "none";
    document.getElementById("valuationExplanationHeader").style.display = "none";
    document.getElementById("chatDiv").style.display = "block";
    document.getElementById("newItemButton").addEventListener("click", ()=>{
        sessionStorage.removeItem("itemToBeCreatedAfterSignIn");
        localStorage.removeItem("newItem");
        sessionStorage.removeItem("newItemId");
        sessionStorage.removeItem("itemValuation");
        window.location.href = "/sell-item";
    });
    document.getElementById("okejButton").addEventListener("click", ()=>{
        sessionStorage.removeItem("itemToBeCreatedAfterSignIn");
        localStorage.removeItem("newItem");
        sessionStorage.removeItem("newItemId");
        sessionStorage.removeItem("itemValuation");
        window.location.href = "/private";
    });
    if (item.id) await (0, _general.callBackendApi)(`/api/valuation/${itemId}/reject`, {
        data: {
            userDecline: false
        }
    });
}
const adjustmentOk = (minPrice, maxPrice)=>{
    const adjustedMin = document.getElementById("minPrice").value;
    const adjustedMax = document.getElementById("maxPrice").value;
    return !adjustmentRequiresReview(minPrice, maxPrice, Number(adjustedMin), Number(adjustedMax));
};
const priceTooHigh = (price, adjustedPrice)=>{
    if (price < 500 && adjustedPrice > price * 1.5) return true;
    else if (price >= 500 && price < 1000 && adjustedPrice > price * 1.4) return true;
    else if (price >= 1000 && adjustedPrice > price * 1.3) return true;
    return false;
};
const minPriceNotOk = (minPrice, maxPrice, adjustedMin)=>priceTooHigh(minPrice, adjustedMin) || adjustedMin > estimatedPrice(minPrice, maxPrice);
const adjustmentRequiresReview = (minPrice, maxPrice, adjustmentMin, adjustmentMax)=>minPriceNotOk(minPrice, maxPrice, adjustmentMin) || priceTooHigh(maxPrice, adjustmentMax);
const maxTooHighWarning = (maxPrice, adjustmentMax)=>priceTooHigh(maxPrice, adjustmentMax) ? "Ovanligt h\xf6gt startpris" : null;
const minTooHighWarning = (minPrice, adjustmentMin)=>priceTooHigh(minPrice, adjustmentMin) ? "Ovanligt h\xf6gt l\xe4gsta pris" : null;
const minAboveValuationWarning = (adjustmentMin, estimatedPrice)=>adjustmentMin > estimatedPrice ? "L\xe4gsta priset \xf6verstiger v\xe5r v\xe4rdering" : null;
const adjustmentWarningText = (minPrice, maxPrice, adjustmentMin, adjustmentMax)=>[
        maxTooHighWarning(maxPrice, adjustmentMax),
        minTooHighWarning(minPrice, adjustmentMin),
        minAboveValuationWarning(adjustmentMin, estimatedPrice(minPrice, maxPrice))
    ].filter((p)=>p).join("<br>");
const adjustmentValidations = (minPrice, maxPrice, adjustmentMinInput, adjustmentMaxInput)=>{
    const adjustmentMin = Number(adjustmentMinInput.value);
    const adjustmentMax = Number(adjustmentMaxInput.value);
    adjustmentMaxInput.style.color = priceTooHigh(maxPrice, adjustmentMax) ? "#E20000" : "#333";
    adjustmentMinInput.style.color = minPriceNotOk(minPrice, maxPrice, adjustmentMin) ? "#E20000" : "#333";
    if (adjustmentRequiresReview(minPrice, maxPrice, adjustmentMin, adjustmentMax)) {
        if (document.getElementById("requiresReviewDiv").style.display !== "block") {
            document.getElementById("requiresReviewDiv").style.display = "block";
            analytics.track("Element Viewed", {
                elementID: "requiresReviewDiv"
            });
        }
        document.getElementById("adjustmentWarningText").innerHTML = adjustmentWarningText(minPrice, maxPrice, adjustmentMin, adjustmentMax);
        document.getElementById("noteDiv").style.display = "none";
        document.getElementById("sendForReviewButton").style.display = "flex";
        document.getElementById("confirmButton").style.display = "none";
        document.getElementById("rejectButton").style.display = "none";
    } else if (adjustmentMax !== maxPrice || adjustmentMin !== minPrice) {
        document.getElementById("confirmButton").style.display = "flex";
        document.getElementById("sendForReviewButton").style.display = "none";
        if (document.getElementById("resetButton").style.visibility !== "visible") {
            document.getElementById("resetButton").style.visibility = "visible";
            analytics.track("Element Viewed", {
                elementID: "resetButton"
            });
        }
        document.getElementById("requiresReviewDiv").style.display = "none";
        const noteTextBefore = document.getElementById("noteText").innerText;
        let noteText = "";
        if (adjustmentMax > maxPrice) noteText += "Ett h\xf6jt startpris kan inneb\xe4ra att det tar l\xe4ngre tid f\xf6r\xa0plagget att s\xe4ljas.";
        if (adjustmentMin > minPrice) noteText += `${noteText ? " " : ""}Ett höjt lägsta pris minskar sannolikheten att det blir sålt.`;
        if (!noteText) noteText = "Bra att du kan t\xe4nka dig s\xe4nka priset! Det \xf6kar sannolikheten att det blir s\xe5lt.";
        document.getElementById("noteHeading").innerHTML = "Notera!";
        document.getElementById("noteText").innerText = noteText;
        document.getElementById("noteDiv").style.display = "block";
        if (noteText !== noteTextBefore) document.getElementById("noteDiv").click(); // Animation trigger to get users attention
        document.getElementById("confirmButton").innerText = "P\xe5b\xf6rja f\xf6rs\xe4ljning";
        document.getElementById("rejectButton").style.display = "flex";
    } else {
        document.getElementById("resetButton").style.visibility = "hidden";
        document.getElementById("noteHeading").innerHTML = "Tips!";
        document.getElementById("noteText").innerText = "S\xe4nkta priser ger en s\xe4krare och snabbare f\xf6rs\xe4ljning. H\xf6jda priser kan ge mer pengar, men riskerar ocks\xe5 att det blir os\xe5lt eller tar l\xe4ngre tid.";
        document.getElementById("noteDiv").style.display = "block";
        document.getElementById("requiresReviewDiv").style.display = "none";
        document.getElementById("confirmButton").style.display = "flex";
        document.getElementById("sendForReviewButton").style.display = "none";
        document.getElementById("rejectButton").style.display = "flex";
    }
};
function validateInput() {
    const adjustmentMinInput = document.getElementById("minPrice");
    const adjustmentMaxInput = document.getElementById("maxPrice");
    const adjustmentMin = Number(adjustmentMinInput.value);
    const adjustmentMax = Number(adjustmentMaxInput.value);
    if (adjustmentMin < 100) adjustmentMinInput.setCustomValidity("Vi f\xf6rs\xf6ker tyv\xe4rr aldrig s\xe4lja n\xe5got under 100kr");
    else if (adjustmentMin > adjustmentMax) {
        adjustmentMaxInput.setCustomValidity("Startpris m\xe5ste vara h\xf6gre \xe4n l\xe4gsta pris");
        adjustmentMinInput.setCustomValidity("L\xe4gsta pris m\xe5ste vara mindre \xe4n startpris");
    } else {
        adjustmentMinInput.setCustomValidity("");
        adjustmentMaxInput.setCustomValidity("");
    }
    return document.getElementById("wf-form-Valuation-form").reportValidity();
}
async function saveValuationStatus(itemId1, minPrice, maxPrice) {
    if (!validateInput()) return;
    const minInput = document.getElementById("minPrice");
    const adjustedMin = Number(minInput.value);
    const maxInput = document.getElementById("maxPrice");
    const adjustedMax = Number(maxInput.value);
    if (sessionStorage.getItem("itemToBeCreatedAfterSignIn")) {
        const savedItem = JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn"));
        savedItem.item.infoRequests.price.status = "Resolved";
        savedItem.item.infoRequests.price.response = "Accepted";
        if (adjustedMin !== minPrice || adjustedMax !== maxPrice) {
            savedItem.item.infoRequests.price.userAdjustedMin = adjustedMin;
            savedItem.item.infoRequests.price.userAdjustedMax = adjustedMax;
            if (adjustmentOk(minPrice, maxPrice)) {
                savedItem.item.minPriceEstimate = adjustedMin;
                savedItem.item.newMinPriceEstimate = adjustedMin;
                savedItem.item.maxPriceEstimate = adjustedMax;
                savedItem.item.newMaxPriceEstimate = adjustedMax;
            } else {
                savedItem.item.infoRequests.price.response = "User proposal";
                savedItem.item.infoRequests.price.userProposalMotivation = document.getElementById("userProposalMotivation").value;
            }
        } else {
            savedItem.item.minPriceEstimate = minPrice;
            savedItem.item.maxPriceEstimate = maxPrice;
        }
        sessionStorage.setItem("itemToBeCreatedAfterSignIn", JSON.stringify(savedItem));
        return window.location.href = "/sign-in";
    } else {
        await (0, _general.callBackendApi)(`/api/valuation/${itemId1}`, {
            method: "PUT",
            data: {
                itemId: itemId1,
                minPrice,
                maxPrice,
                adjustmentMin: adjustedMin,
                adjustmentMax: adjustedMax,
                userProposalMotivation: document.getElementById("userProposalMotivation").value,
                adjustmentRequiresReview: !adjustmentOk(minPrice, maxPrice)
            }
        });
        const params = getParamsObject();
        if (localStorage.getItem("latestItemCreated") && !params.id) {
            const latestItemCreated = JSON.parse(localStorage.getItem("latestItemCreated"));
            latestItemCreated.infoRequests.price.response = adjustmentOk(minPrice, maxPrice) ? "Accepted" : "User proposal";
            if (adjustmentOk(minPrice, maxPrice)) {
                latestItemCreated.minPriceEstimate = adjustedMin;
                latestItemCreated.maxPriceEstimate = adjustedMax;
            }
            localStorage.setItem("latestItemCreated", JSON.stringify(latestItemCreated));
        }
        if (!document.referrer.includes("/private")) {
            const userPhoneSet = user.current?.phoneNumber?.length;
            return window.location.href = userPhoneSet ? `/item-confirmation` : `/user-contact`;
        } else return window.location.href = `/private`;
    }
}
const initialPageSetup = (item)=>{
    document.getElementById("itemImage").src = window.innerWidth <= 400 ? item?.images?.enhancedFrontImageSmall || item?.images?.enhancedFrontImage || item?.images?.modelImage || item?.images?.frontImageSmall || item?.images?.frontImage : item?.images?.enhancedFrontImage || item?.images?.modelImage || item?.images?.frontImage;
    const { minPriceEstimate, newMinPriceEstimate, newMaxPriceEstimate, maxPriceEstimate } = item.mlValuation || {};
    const minPrice = item.infoRequests?.price?.minPrice || newMinPriceEstimate || minPriceEstimate;
    const maxPrice = item.infoRequests?.price?.maxPrice || newMaxPriceEstimate || maxPriceEstimate;
    document.getElementById("chatLink").onclick = ()=>Intercom("showNewMessage", item.mlValuation?.decline ? `ID: ${item.id}\n\nGällande att ni tackat nej till ${item.brand.trim()}-${item.category.toLowerCase()}:\n\n` : `ID: ${item.id}\n\nGällande prisintervallet på ${minPrice}-${maxPrice} kr för ${item.brand.trim()}-${item.category.toLowerCase()}. Vad skulle du vilja ändra det till och varför?\n\n`);
    document.getElementById("valuationClose").addEventListener("click", ()=>{
        sessionStorage.removeItem("itemToBeCreatedAfterSignIn");
        const params = getParamsObject();
        if (!params.id) {
            localStorage.removeItem("newItem");
            sessionStorage.removeItem("newItemId");
        }
        return window.location.href = "/private";
    });
};
const rejectValuation = async (item)=>{
    if (item.id) await (0, _general.callBackendApi)(`/api/valuation/${itemId}/reject`, {
        data: {
            userDecline: true
        }
    });
    sessionStorage.removeItem("itemToBeCreatedAfterSignIn");
    const params = getParamsObject();
    if (!params.id) {
        localStorage.removeItem("newItem");
        localStorage.removeItem("latestItemCreated");
        sessionStorage.removeItem("newItemId");
    }
    return window.location.href = "/private";
};
const hideTooltip = ()=>{
    for (const element of document.getElementsByClassName("tooltip-motivation"))element.classList.remove("tooltip-show");
};
const priceAdjustment = (inputValue)=>{
    if (inputValue < 200) return 20;
    else if (inputValue < 500) return 50;
    return 100;
};
const lowerPrice = (input, origValue)=>{
    const value = Number(input.value);
    const valPriceAdjustment = priceAdjustment(origValue);
    const newValue = Math.floor(value / valPriceAdjustment) * valPriceAdjustment;
    input.value = Math.max(0, newValue === value ? value - valPriceAdjustment : newValue);
    input.dispatchEvent(new Event("input"));
};
const increasePrice = (input, origValue)=>{
    const value = Number(input.value);
    const valPriceAdjustment = priceAdjustment(origValue);
    const newValue = Math.ceil(value / valPriceAdjustment) * valPriceAdjustment;
    input.value = newValue === value ? value + valPriceAdjustment : newValue;
    input.dispatchEvent(new Event("input"));
};
const estimatedPrice = (minPrice, maxPrice)=>Math.round((minPrice + maxPrice) / 20) * 10;
const showValuation = async (item)=>{
    const { minPriceEstimate, newMinPriceEstimate, newMaxPriceEstimate, maxPriceEstimate, decline } = item.mlValuation || {};
    const params = getParamsObject();
    const version = params.version || item?.mlValuation?.modelVersion;
    if (!params.id && decline) {
        await showDeclineValuation(item);
        document.getElementById("valuationResultDiv").style.display = "flex";
        return;
    }
    const minPrice = item.infoRequests?.price?.minPrice || newMinPriceEstimate || minPriceEstimate;
    const maxPrice = item.infoRequests?.price?.maxPrice || newMaxPriceEstimate || maxPriceEstimate;
    document.getElementById("valuationText").innerText = `${estimatedPrice(minPrice, maxPrice)} kr`;
    document.getElementById("valuationResultDiv").style.display = "flex";
    document.body.addEventListener("click", hideTooltip);
    document.getElementById("valuationRange").style.display = "flex";
    document.getElementById("minPrice").value = minPrice;
    document.getElementById("minPrice").disabled = true;
    document.getElementById("maxPrice").value = maxPrice;
    document.getElementById("maxPrice").disabled = true;
    if (item.infoRequests?.price?.type) {
        document.getElementById("valuationExplanation").innerText = item.infoRequests.price.description;
        if (item.infoRequests?.price?.type === "Final Offer") {
            document.getElementById("valuationExplanationHeader").innerText = "Motivering";
            document.getElementById("valuationExplanationHeader").style.display = "block";
        }
    } else document.getElementById("valuationExplanation").innerText = getValuationExplanation(item);
    document.getElementById("valuationText").style.display = "block";
    if (sessionStorage.getItem("itemToBeCreatedAfterSignIn")) document.getElementById("chatDiv").style.display = "none";
    await showAdjustValuation(item);
    document.getElementById("confirmButton").addEventListener("click", ()=>saveValuationStatus(item.id, minPrice, maxPrice));
    document.getElementById("sendForReviewButton").addEventListener("click", ()=>saveValuationStatus(item.id, minPrice, maxPrice));
    document.getElementById("rejectButton").addEventListener("click", ()=>rejectValuation(item));
};
const getValuationExplanation = (item)=>{
    if (!item || !item.mlValuation) return "V\xe4rderingen baseras p\xe5 plagg fr\xe5n liknande varum\xe4rken som vi v\xe4rderat tidigare. F\xf6r att \xf6ka sannolikheten att f\xe5 det s\xe5lt kan du justera ner l\xe4gsta priset.";
    const { mlValuation: { valuatedBrandItems, brandMeanMax, brandAccuracy, brandCategoryAccuracy, fewBrand, brandMeanSold, brandCategoryMeanSold, newMinMaxLog, brandShareSold, lowValueSegment }, cleanedBrand, brand } = item;
    const soldBrandItems = Math.round(valuatedBrandItems * brandShareSold);
    const brandName = cleanedBrand || brand;
    const bestMeanPrice = brandAccuracy > 0.8 && brandMeanSold > 0 ? `Plagg från ${brandName} har i genomsnitt sålts för ${brandMeanSold} kr baserat på ${soldBrandItems} sålda plagg. ` : brandCategoryAccuracy > 0.7 && brandCategoryMeanSold > 0 ? `Snittpriset för sålda plagg för varumärket i denna kategori är ${brandCategoryMeanSold} kr. ` : "";
    const acceptPriceNotice = newMinMaxLog.match(/accept price is above max/i) ? "Plagget har v\xe4rderat till under ditt l\xe4gsta accepterade pris. " : "";
    const adjustPriceLowShareSoldNotice = brandShareSold < 0.5 && !lowValueSegment ? `Notera att efterfrågan på ${brandName} på andrahandsmarknaden är lägre än snittet, så vill du öka sannolikheten att få det sålt kan du sänka det lägsta priset.` : "";
    const adjustPriceNotice = "Ibland tr\xe4ffar den dock inte r\xe4tt, s\xe5 k\xe4nn dig fri att justera priset om du tycker v\xe4rderingen verkar konstig.";
    if (fewBrand || valuatedBrandItems === 0) return `${acceptPriceNotice}Värderingen är mer osäker då vi har sålt relativt lite av detta varumärke. Efterfrågan på mer okända och små varumärken är ofta lägre. För att öka sannolikheten att få det sålt kan du justera ner lägsta priset`;
    if (brandAccuracy >= 0.8 && !fewBrand) return `${acceptPriceNotice}${bestMeanPrice}AI-värderingen tar hänsyn till material, modell, skick och originalpris och brukar ha hög träffsäkerhet för detta varumärke. ${adjustPriceLowShareSoldNotice || adjustPriceNotice}`;
    if (brandAccuracy < 0.8 && brandCategoryAccuracy >= 0.7 && !fewBrand) return `${acceptPriceNotice}${bestMeanPrice}AI-värderingen tar hänsyn till material, modell, skick och originalpris och brukar ha hög träffsäkerhet för denna kategori och varumärke. ${adjustPriceLowShareSoldNotice || adjustPriceNotice}`;
    if (brandMeanMax <= 400) return `${acceptPriceNotice}Värderingen baseras på ${valuatedBrandItems} plagg från ${brandName} som vi tidigare värderat. ${[
        adjustPriceLowShareSoldNotice,
        bestMeanPrice
    ].join(" ")}`;
    return `${acceptPriceNotice}Värderingen baseras på plagg från liknande varumärken som vi värderat tidigare. För att öka sannolikheten att få det sålt kan du justera ner lägsta priset.`;
};
const showAdjustValuation = async (item)=>{
    const { minPriceEstimate, newMinPriceEstimate, newMaxPriceEstimate, maxPriceEstimate } = item.mlValuation || {};
    const minPrice = item.infoRequests?.price?.minPrice || newMinPriceEstimate || minPriceEstimate;
    const maxPrice = item.infoRequests?.price?.maxPrice || newMaxPriceEstimate || maxPriceEstimate;
    document.getElementById("adjustIntervalButton").style.display = "flex";
    analytics.track("Element Viewed", {
        elementID: "adjustIntervalButton"
    });
    document.getElementById("chatDiv").style.display = "none";
    document.getElementById("adjustIntervalButton").addEventListener("click", ()=>{
        document.getElementById("valuationExplanation").style.display = "none";
        document.getElementById("valuationExplanationHeader").style.display = "none";
        document.getElementById("minPrice").disabled = false;
        document.getElementById("maxPrice").disabled = false;
        document.getElementById("adjustIntervalButton").style.display = "none";
        document.getElementById("noteDiv").style.display = "block";
        document.getElementById("origMinPrice").style.display = "block";
        document.getElementById("origMaxPrice").style.display = "block";
        document.getElementById("sliderDiv").style.display = "block";
        document.querySelectorAll(".field-underline").forEach((x)=>x.style.visibility = "visible");
    });
    if (item.infoRequests?.price?.type === "Final Offer") {
        document.getElementById("adjustIntervalButton").style.display = "none";
        document.getElementById("chatDiv").style.display = "none";
    }
    rangeSlider(minPrice, maxPrice, item);
    document.getElementById("valuationMotivation").addEventListener("click", (e)=>{
        const elements = document.getElementsByClassName("tooltip-motivation");
        const visible = elements[0]?.classList.contains("tooltip-show");
        for (const element of elements)visible ? element.classList.remove("tooltip-show") : element.classList.add("tooltip-show");
        e.stopPropagation();
    });
    document.getElementById("origMinPrice").innerText = minPrice;
    document.getElementById("origMinPrice").style.visibility = "hidden";
    document.getElementById("origMaxPrice").innerText = maxPrice;
    document.getElementById("origMaxPrice").style.visibility = "hidden";
    document.getElementById("resetButton").addEventListener("click", ()=>{
        document.getElementById("minPrice").value = minPrice;
        document.getElementById("maxPrice").value = maxPrice;
        document.getElementById("minPrice").dispatchEvent(new Event("input"));
        document.getElementById("maxPrice").dispatchEvent(new Event("input"));
        document.getElementById("adjustmentSlider").value = 3;
        document.getElementById("resetButton").style.visibility = "hidden";
        validateInput();
    });
    document.getElementById("minPrice").addEventListener("blur", ()=>validateInput());
    document.getElementById("minPrice").addEventListener("input", ()=>{
        const adjustmentMinInput = document.getElementById("minPrice");
        const adjustmentMaxInput = document.getElementById("maxPrice");
        const adjustmentMin = Number(adjustmentMinInput.value);
        if (adjustmentMin !== minPrice) document.getElementById("origMinPrice").style.visibility = "visible";
        else document.getElementById("origMinPrice").style.visibility = "hidden";
        adjustmentValidations(minPrice, maxPrice, adjustmentMinInput, adjustmentMaxInput);
    });
    document.getElementById("minIncrease").addEventListener("click", ()=>{
        increasePrice(document.getElementById("minPrice"), minPrice);
        analytics.track("Click", {
            elementID: "minIncrease"
        });
        validateInput();
    });
    document.getElementById("minDecrease").addEventListener("click", ()=>{
        lowerPrice(document.getElementById("minPrice"), minPrice);
        analytics.track("Click", {
            elementID: "minDecrease"
        });
        validateInput();
    });
    document.getElementById("maxPrice").addEventListener("blur", ()=>validateInput());
    document.getElementById("maxPrice").addEventListener("input", ()=>{
        const adjustmentMaxInput = document.getElementById("maxPrice");
        const adjustmentMinInput = document.getElementById("minPrice");
        const adjustmentMax = Number(adjustmentMaxInput.value);
        if (adjustmentMax !== maxPrice) document.getElementById("origMaxPrice").style.visibility = "visible";
        else document.getElementById("origMaxPrice").style.visibility = "hidden";
        adjustmentValidations(minPrice, maxPrice, adjustmentMinInput, adjustmentMaxInput);
    });
    document.getElementById("maxIncrease").addEventListener("click", ()=>{
        increasePrice(document.getElementById("maxPrice"), maxPrice);
        analytics.track("Click", {
            elementID: "maxIncrease"
        });
        validateInput();
    });
    document.getElementById("maxDecrease").addEventListener("click", ()=>{
        lowerPrice(document.getElementById("maxPrice"), maxPrice);
        analytics.track("Click", {
            elementID: "maxDecrease"
        });
        validateInput();
    });
    if (item.infoRequests?.price?.type === "Final Offer" || item.infoRequests?.price?.type === "Valuation") document.getElementById("valuationMotivation").style.display = "none";
};
const getItem = async (itemId1)=>{
    const res = await (0, _general.callBackendApi)(`/api/items/${itemId1}`);
    return {
        ...res?.data || {},
        id: itemId1
    };
};
const maxIncrease = (price, adjustFlags)=>{
    const { fewBrand, newBrand, brandAccuracy, brandCategoryAccuracy, highPriceVarBrandCategory } = adjustFlags;
    const uncertainValuationAdjustment = fewBrand || newBrand || highPriceVarBrandCategory || brandAccuracy < 0.8 || brandCategoryAccuracy < 0.7 ? 0.1 : 0;
    if (price <= 400) return price * (0.3 + uncertainValuationAdjustment);
    else if (price <= 800) return price * (0.25 + uncertainValuationAdjustment);
    return price * (0.2 + uncertainValuationAdjustment);
};
const minPriceMaxIncrease = (minPrice, maxPrice, adjustFlags)=>Math.min(maxIncrease(minPrice, adjustFlags), estimatedPrice(minPrice, maxPrice) - minPrice);
function rangeSlider(minPrice, maxPrice, item) {
    const range = document.getElementById("adjustmentSlider");
    range.addEventListener("touchend", ()=>{
        range.value = Math.round(Number(range.value));
        analytics.track("Click", {
            elementID: "adjustmentSlider"
        });
        validateInput();
    });
    range.addEventListener("mouseup", ()=>{
        range.value = Math.round(Number(range.value));
        analytics.track("Click", {
            elementID: "adjustmentSlider"
        });
        validateInput();
    });
    range.addEventListener("input", function() {
        let minInput = document.getElementById("minPrice");
        let maxInput = document.getElementById("maxPrice");
        const closestValue = Math.round(Number(range.value));
        switch(closestValue){
            case 0:
                minInput.value = Math.max(100, Math.round(minPrice * 0.5 / 10) * 10);
                maxInput.value = Math.max(100, Math.round(maxPrice * 0.5 / 10) * 10);
                break;
            case 1:
                minInput.value = Math.max(100, Math.round(minPrice * 0.66 / 10) * 10);
                maxInput.value = Math.max(100, Math.round(maxPrice * 0.66 / 10) * 10);
                break;
            case 2:
                minInput.value = Math.max(100, Math.round(minPrice * 0.83 / 10) * 10);
                maxInput.value = Math.max(100, Math.round(maxPrice * 0.83 / 10) * 10);
                break;
            case 3:
                minInput.value = minPrice;
                maxInput.value = maxPrice;
                break;
            case 4:
                minInput.value = Math.round((minPrice + minPriceMaxIncrease(minPrice, maxPrice, item.mlValuation) * 0.33) / 10) * 10;
                maxInput.value = Math.round((maxPrice + maxIncrease(maxPrice, item.mlValuation) * 0.33) / 10) * 10;
                break;
            case 5:
                minInput.value = Math.round((minPrice + minPriceMaxIncrease(minPrice, maxPrice, item.mlValuation) * 0.67) / 10) * 10;
                maxInput.value = Math.round((maxPrice + maxIncrease(maxPrice, item.mlValuation) * 0.67) / 10) * 10;
                break;
            case 6:
                minInput.value = Math.floor((minPrice + minPriceMaxIncrease(minPrice, maxPrice, item.mlValuation)) / 10) * 10;
                maxInput.value = Math.floor((maxPrice + maxIncrease(maxPrice, item.mlValuation)) / 10) * 10;
                break;
        }
        minInput.dispatchEvent(new Event("input"));
        maxInput.dispatchEvent(new Event("input"));
    });
}
const main = async ()=>{
    window.intercomSettings = {
        app_id: "klyy0le5"
    };
    (function() {
        var w = window;
        var ic = w.Intercom;
        if (typeof ic === "function") {
            ic("reattach_activator");
            ic("update", w.intercomSettings);
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
                var s = d.createElement("script");
                s.type = "text/javascript";
                s.async = true;
                s.src = "https://widget.intercom.io/widget/klyy0le5";
                var x = d.getElementsByTagName("script")[0];
                x.parentNode.insertBefore(s, x);
            };
            if (w.attachEvent) w.attachEvent("onload", l);
            else w.addEventListener("load", l, false);
        }
    })();
    Intercom("update", {
        "hide_default_launcher": true
    });
    const params = getParamsObject();
    const item = params.id ? await getItem(params.id) : JSON.parse(sessionStorage.getItem("itemToBeCreatedAfterSignIn") || "{}")?.item || JSON.parse(localStorage.getItem("latestItemCreated") || "{}");
    if (!item) {
        console.error("Invalid item id or no saved item to show valuation for");
        return location.href = "/private";
    }
    initialPageSetup(item);
    await showValuation(item);
    triggerShowContent.click();
};
main();

},{"./general":"lWrRo"}],"lWrRo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "signOut", ()=>signOut);
parcelHelpers.export(exports, "BACKEND_API_URL", ()=>BACKEND_API_URL);
// Function to call web api backend function, with or without auth
parcelHelpers.export(exports, "callBackendApi", ()=>callBackendApi);
parcelHelpers.export(exports, "setFormAddressFields", ()=>setFormAddressFields);
parcelHelpers.export(exports, "getFormAddressFields", ()=>getFormAddressFields);
// Validate Swedish Social Security Number (personnummer) using checksum
//   Note: this is somewhat simplified because it does not take into account
//   that the date of the number is valid (e.g. "000000-0000" does return as true)
parcelHelpers.export(exports, "isValidSwedishSsn", ()=>isValidSwedishSsn);
parcelHelpers.export(exports, "formatPersonalId", ()=>formatPersonalId);
parcelHelpers.export(exports, "itemCoverImage", ()=>itemCoverImage);
parcelHelpers.export(exports, "shareCode", ()=>shareCode);
function signOut() {
    firebase.auth().signOut().then(()=>{
        console.log("User signed out");
        authUser.current = null;
        user.current = null;
        userId = null;
        localStorage.removeItem("sessionUser");
        localStorage.removeItem("idToken");
        localStorage.removeItem("authUserId");
        localStorage.removeItem("authUser");
        deleteCookie("maiAuth");
        location.href = "/";
    }).catch((error)=>{
        errorHandler.report(error);
        console.log(error);
    });
}
const BACKEND_API_URL = "https://europe-west1-second-hand-helper.cloudfunctions.net/webApi";
async function callBackendApi(path, { data, method, requiresAuth = true, timeoutSec = 20 } = {}) {
    // const { data, method, requiresAuth, timeoutSec = 20 } = opts;
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), timeoutSec * 1000);
    let idToken = "";
    const useMethod = method || (data ? "POST" : "GET");
    if (requiresAuth === true || requiresAuth !== false && useMethod !== "GET") idToken = await getIdToken();
    try {
        const response = await fetch(`${BACKEND_API_URL}${path}`, {
            method: useMethod,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
            },
            ...data ? {
                body: JSON.stringify(data)
            } : {},
            signal: controller.signal
        });
        if (response.headers.get("content-length") === "0") return {
            data: undefined
        };
        const json = await response.json();
        return json.data ? json : {
            data: json
        };
    } catch (e) {
        console.error(e);
        errorHandler.report(`Failure calling backend function ${JSON.stringify(e)}`);
        throw e;
    } finally{
        clearTimeout(timeout);
    }
}
async function getIdToken() {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
        if (firebase.auth().currentUser) {
            const idToken = await result.getIdToken();
            localStorage.setItem("idToken", idToken);
            authUser.current = firebase.auth().currentUser;
            localStorage.setItem("authUser", JSON.stringify(authUser.current));
        } else throw new Error("User not authenticated");
    }
    return idToken;
}
function setFormAddressFields(user1) {
    document.getElementById("addressFirstName").value = user1.addressFirstName || "";
    document.getElementById("addressFirstName").dispatchEvent(new Event("input"));
    document.getElementById("addressLastName").value = user1.addressLastName || "";
    document.getElementById("addressLastName").dispatchEvent(new Event("input"));
    document.getElementById("addressStreetAddress").value = user1.addressStreetAddress || "";
    document.getElementById("addressStreetAddress").dispatchEvent(new Event("input"));
    document.getElementById("addressCO").value = user1.addressCO || "";
    document.getElementById("addressCO").dispatchEvent(new Event("input"));
    document.getElementById("addressPostalCode").value = user1.addressPostalCode || "";
    document.getElementById("addressPostalCode").dispatchEvent(new Event("input"));
    document.getElementById("addressCity").value = user1.addressCity || "";
    document.getElementById("addressCity").dispatchEvent(new Event("input"));
    document.getElementById("addressDoorCode").value = user1.addressDoorCode || "";
    document.getElementById("addressDoorCode").dispatchEvent(new Event("input"));
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
    addressPostalCode = addressPostalCode ? addressPostalCode.trim().replace(/\D/g, "") : "";
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
    let personalId = personalIdInput.replace("-", "");
    if (personalId.length !== 12 && (personalId.substring(0, 2) !== "19" || personalId.substring(0, 2) !== "20")) {
        if (Number(personalId.substring(0, 2)) <= 99 && Number(personalId.substring(0, 2)) > 25) personalId = "19" + personalId;
        else personalId = "20" + personalId;
    }
    if (personalId.length === 12) return personalId;
    return null;
}
function itemCoverImage(item) {
    const images = item.images;
    if (images.modelImage) return images.modelImageSmall || images.modelImage;
    if (images.coverImage) return images.coverImageSmall || images.coverImage;
    if (images.enhancedFrontImage) return images.enhancedFrontImageSmall || images.enhancedFrontImage;
    return images.frontImageSmall || images.frontImage;
}
function shareCode() {
    const code = user.current.referralData.referralCode;
    //const text = `Hej, jag vill tipsa om Mai för att rensa ur garderoben. Mai är en tjänst som hjälper dig att sälja dina kläder på ett enkelt sätt. Man tar bara bilder på sina plagg, sedan sköter Mai resten - såsom värdering, annonsering på flera plattformar, kontakt med köpare och frakt när det blir sålt. Man får själv behålla 80% av vinsten, och blir det inte sålt kostar det ingenting.\n\nOm du registrerar dig med min kod (följ länken) och provar sälja ett plagg inom 7 dagar får du behålla 100% av vinsten för det första plagget (istället för 80%). Min kod: ${code}\n\nLäs mer och använd min kod här:`;
    const text = `Hej! Följ min personliga länk så säljer Mai ditt första plagg kostnadsfritt! Mai sköter försäljningen av dina kläder, inklusive värdering, lägger ut på flera plattformar samtidigt, har kontakten med köpare och ordnar med frakt när det blir sålt. Man får själv behålla 80% av vinsten, och blir det inte sålt kostar det ingenting.\n\nOm du registrerar dig med min kod (följ länken) och provar sälja ett plagg inom 7 dagar får du behålla 100% av vinsten för det första plagget (istället för 80%). Min kod: ${code}`;
    if (navigator.share) navigator.share({
        text: text,
        url: `https://maiapp.se/?invite=${code}`
    }).then(()=>{
        console.log("Thanks for sharing!");
    }).catch((e)=>{
        console.error(e);
        errorHandler.report(e);
    });
    else {
        console.log("Browser doesn't support navigator.share => Copy to clipboard!");
        const shareText = text + "\n" + `https://maiapp.se/?invite=${code}`;
        navigator.clipboard.writeText(shareText);
        linkCopiedBanner.style.display = "flex";
        setTimeout(function() {
            linkCopiedBanner.style.display = "none";
        }, 1500);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
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

},{}]},["an9lk","bCEVa"], "bCEVa", "parcelRequire81ca")

//# sourceMappingURL=itemValuation.js.map
