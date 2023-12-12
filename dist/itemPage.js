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
})({"8vtyI":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "8d473a0894bf3d3e";
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
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
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
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
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
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
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
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
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

},{}],"elTz7":[function(require,module,exports) {
var _general = require("./general");
function loadItem(itemId) {
    db.collection("items").doc(itemId).get().then((doc)=>{
        if (doc.exists) {
            console.log("Item data:", doc.data());
            data = doc.data();
            const itemId = doc.id;
            const brand = data.brand;
            const infoRequests = data.infoRequests;
            let imgUrl = (0, _general.itemCoverImage)(data);
            const status = data.status;
            const category = data.category ? data.category : "";
            const longerPeriodAcceptedDate = data.longerPeriodAcceptedDate;
            let statusText = "";
            let publishedDate = data.publishedDate;
            let daysLeftText = "";
            if (data.publishedDate) {
                publishedDate = new Date(publishedDate);
                let nowDate = new Date();
                let timeDifference = nowDate.getTime() - publishedDate.getTime();
                let daysDifference = timeDifference / 86400000;
                let sellingPeriodLength = longerPeriodAcceptedDate ? 60 : 30;
                let daysLeft = Math.round(sellingPeriodLength - daysDifference);
                if (daysLeft <= 0) daysLeftText = `0 dagar kvar`;
                else daysLeftText = `${daysLeft} dagar kvar`;
            }
            let min = data.minPriceEstimate;
            let max = data.maxPriceEstimate;
            const valuationText = min && max ? `${min}-${max} kr` : "";
            const soldPrice = data.soldPrice;
            const sellerGets = data.sellerGets;
            const payoutStatus = data.payoutStatus;
            const shippingStatus = data.shippingStatus;
            let text1 = "";
            let text2 = "";
            if (status === "New") {
                if (infoRequests?.price?.status === "Active") {
                    statusText = `Inv\xe4ntar ditt svar`;
                    text1 = "P\xe5 huvudsidan kan du se plaggets v\xe4rdering och<br>v\xe4lja om du vill s\xe4lja till v\xe4rderingen eller inte.";
                } else if (min && max) {
                    statusText = `F\xf6rbereds`;
                    text1 = "F\xf6rbereder det sista inf\xf6r publicering.<br>Du f\xe5r ett SMS n\xe4r f\xf6rs\xe4ljningen p\xe5b\xf6rjas.";
                    text2 = valuationText;
                } else {
                    statusText = `V\xe4rdering p\xe5g\xe5r`;
                    text1 = "Du f\xe5r ett SMS n\xe4r v\xe4rderingen \xe4r klar.<br>V\xe4rderingen tar normalt 2 vardagar.";
                }
            }
            if (status === "Published" && min && max) {
                statusText = `F\xf6rs\xe4ljning p\xe5g\xe5r`;
                text1 = daysLeftText;
                text2 = valuationText;
            }
            if (status === "Sold") {
                statusText = `S\xe5ld!`;
                itemStatusText.style.fontSize = "18px";
                itemStatusText.style.fontWeight = "500";
                text1 = payoutStatus === "Payed" ? "" : "Utbetalning kommer via Swish inom en dag";
                if (shippingStatus === "Not sent") {
                    text1 = "Utbetalning sker n\xe4r du skickat plagget";
                    toShipItemLink.href = window.location.origin + `/ship-item?id=${itemId}`;
                    toShipItemLink.style.display = "flex";
                }
                sellerGetsTitle.innerHTML = payoutStatus === "Payed" ? "Du fick" : "Du f\xe5r";
                sellerGetsText.innerHTML = `${sellerGets} kr`;
                sellerGetsDiv.style.display = "flex";
            }
            itemBrandText.innerHTML = brand;
            itemCategoryText.innerHTML = category;
            pageTitleDiv.style.display = "flex";
            coverImageDiv.style.backgroundImage = `url('${imgUrl}')`;
            itemStatusText.innerHTML = statusText;
            itemText1.innerHTML = text1;
            itemText2.innerHTML = text2;
            itemDiv.style.display = "block";
            loadingDiv.style.display = "none";
        }
    }).catch((e)=>{
        console.log("Error getting item document:", e);
        errorHandler.report(e);
    });
}
async function loadItemEvents(itemId) {
    itemEventsDiv.innerHTML = "";
    let response = await fetch(`https://europe-west3-second-hand-helper.cloudfunctions.net/itemEvents/${itemId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const events = await response.json();
    console.log(events);
    itemAddedEventExists = false;
    if (events) {
        for(let i = 0; i < events.length; i++){
            const event = events[i];
            if (event.type === "itemAdded") itemAddedEventExists = true;
            // Build lists...
            let style = i === events.length - 1 ? "highlighted" : "";
            const component = getEventComponent(event, style);
            if (component) {
                let content = itemEventsDiv.innerHTML;
                itemEventsDiv.innerHTML = component.concat(content);
            }
        }
        itemEventsDiv.style.display = "block";
        itemEventsLoadingDiv.style.display = "none";
        // Show list if itemAdded exists
        if (!itemAddedEventExists) sellingProcessDiv.style.display = "none";
    }
}
function eventComponentHtml(displayLine, icon, className, text, time) {
    return `<div class="div-block-135"><div class="div-block-144"><div class="div-block-142">
                        <div class="div-block-139" style="display: ${displayLine};"></div>
                        </div>
                        <div class="div-block-138">${icon}</div>
                        </div>
                    <div class="div-block-136">
                        <div class="item-event-text ${className}">${text}</div>
                        <div class="text-block-82">${time}</div>
                    </div></div>`;
}
function getEventComponent(event, style) {
    let className = "";
    let icon = '<div class="div-block-143"></div>';
    // Highlighted event styling
    if (style === "highlighted") {
        className = "highlighted-event";
        icon = '<img src="https://global-uploads.webflow.com/6297d3d527db5dd4cf02e924/62c53fa9db6d0f383ee430f9_check-mark%202%20(1).svg" loading="lazy" width="auto" alt="">';
    }
    const displayLine = "block";
    const weekdays = [
        "S\xf6n",
        "M\xe5n",
        "Tis",
        "Ons",
        "Tor",
        "Fre",
        "L\xf6r",
        "S\xf6n"
    ];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Maj",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dec"
    ];
    const date = new Date(event.timestamp);
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let time = weekdays[date.getDay()] + " " + hours + ":" + minutes;
    let now = new Date();
    let daysDiff = Math.round((now.getTime() - date.getTime()) / 86400000);
    if (daysDiff > 6) time = date.getDate() + " " + months[date.getMonth()] + " " + hours + ":" + minutes;
    if (event.type === "itemAdded") return eventComponentHtml("none", icon, className, "Plagg lades upp p\xe5 Mai", time);
    if (event.type === "valuationCompleted") return eventComponentHtml(displayLine, icon, className, `V\xe4rderades till ${event.data.min}-${event.data.max} kr`, time);
    if (event.type === "valuationAccepted") return eventComponentHtml(displayLine, icon, className, `Du accepterade v\xe4rderingen`, time);
    if (event.type === "valuationFinalOffer") return eventComponentHtml(displayLine, icon, className, `Omv\xe4rderades till ${event.data.min}-${event.data.max} kr`, time);
    if (event.type === "itemPublished") return eventComponentHtml(displayLine, icon, className, `F\xf6rs\xe4ljning p\xe5b\xf6rjades`, time);
    if (event.type === "priceAdjusted") {
        const { platform, newPrice } = event.data;
        const capPlatform = platform && platform.charAt(0).toUpperCase() + platform.slice(1).split(/(?=[A-Z])/).join(" ");
        return eventComponentHtml(displayLine, icon, className, `Pris s\xe4nktes till ${newPrice} kr ${platform && platform !== "" ? " p\xe5 " + capPlatform : ""}`, time);
    }
    if (event.type === "priceRequestSent") return eventComponentHtml(displayLine, icon, className, `Nytt prisf\xf6rslag p\xe5 ${event.data.min}-${event.data.max} kr`, time);
    if (event.type === "priceRequestResponse") {
        if (event.data.response === "Accepted") return eventComponentHtml(displayLine, icon, className, `Du accepterade prisf\xf6rslaget`, time);
        else if (event.data.response === "Denied") return eventComponentHtml(displayLine, icon, className, `Du avb\xf6jde prisf\xf6rslaget`, time);
    }
    if (event.type === "listingRenewal") return eventComponentHtml(displayLine, icon, className, `Annonser f\xf6rnyades`, time);
    if (event.type === "platformAdded") return (event.data.platforms || []).filter((p)=>p !== "Google Shopping" && p !== "Instagram Shop" && p !== "Facebook Shop").map((p)=>eventComponentHtml(displayLine, icon, className, `Publicerades p\xe5 ${p}${p === "Mai Shop" ? "<br>(Google Shopping, Instagram Shop, Facebook Shop)" : ""}`, time)).join("\n");
    if (event.type === "itemSold") return eventComponentHtml(displayLine, icon, className, `S\xe5ld f\xf6r ${event.data.soldPrice} kr till ${event.data.buyerFirstName} i ${event.data.buyerAddressCity}`, time);
    if (event.type === "bagSentToSeller") return eventComponentHtml(displayLine, icon, className, `Fraktp\xe5se skickades till dig`, time);
    if (event.type === "itemSent") return eventComponentHtml(displayLine, icon, className, `Plagget skickades iv\xe4g`, time);
    if (event.type === "payoutCompleted") return eventComponentHtml(displayLine, icon, className, `Du fick ${event.data.amount} kr utbetalt`, time);
    if (event.type === "valuationUserAdjusted") return eventComponentHtml(displayLine, icon, className, `Du justerade v\xe4rderingen till ${event.data.min}-${event.data.max} kr`, time);
    return false;
}
editItemLink.addEventListener("click", function() {
    const params = getParamsObject();
    location.href = `/edit-item?id=${params.id}`;
});
// Load item
const params = getParamsObject();
loadItem(params.id);
loadItemEvents(params.id);

},{"./general":"lWrRo"}],"lWrRo":[function(require,module,exports) {
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
function signOut() {
    firebase.auth().signOut().then(()=>{
        console.log("User signed out");
        authUser.current = null;
        user.current = null;
        userId = null;
        location.href = "/";
        deleteCookie("maiAuth");
    }).catch((error)=>{
        errorHandler.report(error);
        console.log(error);
    });
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
    const text = `Hej! F\xf6lj min personliga l\xe4nk s\xe5 s\xe4ljer Mai ditt f\xf6rsta plagg kostnadsfritt! Mai sk\xf6ter f\xf6rs\xe4ljningen av dina kl\xe4der, inklusive v\xe4rdering, l\xe4gger ut p\xe5 flera plattformar samtidigt, har kontakten med k\xf6pare och ordnar med frakt n\xe4r det blir s\xe5lt. Man f\xe5r sj\xe4lv beh\xe5lla 80% av vinsten, och blir det inte s\xe5lt kostar det ingenting.

Om du registrerar dig med min kod (f\xf6lj l\xe4nken) och provar s\xe4lja ett plagg inom 7 dagar f\xe5r du beh\xe5lla 100% av vinsten f\xf6r det f\xf6rsta plagget (ist\xe4llet f\xf6r 80%). Min kod: ${code}`;
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
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
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

},{}]},["8vtyI","elTz7"], "elTz7", "parcelRequire81ca")

//# sourceMappingURL=itemPage.js.map
