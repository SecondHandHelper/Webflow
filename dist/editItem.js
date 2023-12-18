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
})({"73pXK":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 50619;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "1865bb0e3c5c65f5";
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

},{}],"9IZ5h":[function(require,module,exports) {
var _sellItemHelpers = require("./sellItemHelpers");
var _autocompleteBrands = require("./autocomplete-brands");
async function updateItem(itemId, changedImages) {
    console.log("updateItem()");
    $(".goback").data("disabled", true);
    const now = new Date();
    const size = itemSize.value;
    const material = itemMaterial.value;
    const brand = itemBrand.value;
    const model = itemModel.value;
    const originalPrice = Number(itemOriginalPrice.value);
    const age = itemAge.value;
    const condition = itemCondition.value;
    const defectDescription = itemDefectDescription.value;
    const userComment = itemUserComment.value;
    let changes = {
        updatedAt: now,
        size: size,
        material: material,
        brand: brand,
        model: model,
        originalPrice: originalPrice,
        age: age,
        condition: condition,
        defectDescription: defectDescription,
        userComment: userComment
    };
    async function uploadImages(itemId) {
        if (changedImages.length > 0) {
            // START - Mark imageRequest as Resolved
            await db.collection("items").doc(itemId).get().then((doc)=>{
                if (doc.data()?.infoRequests?.images?.status === "Active") changes["infoRequests.images.status"] = "Resolved";
            });
            // END - Mark imageRequest as Resolved
            let elements = changedImages;
            let images = new Map(); //Gather files from the form in a map "Images"
            elements.forEach((element)=>{
                if (document.getElementById(element).files[0]) {
                    let file = document.getElementById(element).files[0];
                    images.set(element, file);
                }
            });
            // Uploads files and add the new imageUrls to the changes object
            await Promise.all(Array.from(images).map(async ([imageName, value])=>{
                console.log(`${imageName}: ${value}`);
                // If images was changed, set photo directions to default, since an 'info request' of images could have been shown
                photoDirectionsText.style.display = "block";
                infoRequestImagesDiv.style.display = "none";
                const { url: imageUrl } = await (0, _sellItemHelpers.uploadTempImage)(value, imageName);
                await firebase.app().functions("europe-west1").httpsCallable("saveItemImage")({
                    itemId,
                    fileName: imageName,
                    url: imageUrl
                });
            }));
            if (changedImages.indexOf("frontImage") > -1) {
                // Front image was changed, also save the enhancedFrontImage in the right place
                const item = await firebase.app().functions("europe-west1").httpsCallable("getItem")({
                    itemId
                });
                const itemData = item.data;
                await firebase.app().functions("europe-west1").httpsCallable("saveItemImage")({
                    itemId,
                    fileName: `enhancedFrontImage`,
                    url: `${sessionStorage.getItem("enhancedFrontImage")}`
                });
                changes[`images.versionsStatus.enhancedFrontImage`] = "";
                if (itemData.images.coverImage === itemData.images.enhancedFrontImage) {
                    changes["images.coverImage"] = "";
                    changes["images.coverImageSmall"] = "";
                    changes["images.coverImageMedium"] = "";
                    changes["images.coverImageLarge"] = "";
                    changes[`images.versionsStatus.coverImage`] = "";
                }
            }
        }
        await updateItemDoc(itemId, changes);
        sessionStorage.removeItem("enhancedFrontImage");
    }
    async function updateItemDoc(itemId, changes) {
        console.log("updateItemDoc()");
        // Update item in FS without the images first, only because that's how I did it when adding an item.
        console.log("CHANGES: ", changes);
        const itemRef = db.collection("items").doc(itemId);
        const res = await itemRef.update(changes).then((itemRef)=>{
            console.log("Document updated with ID: ", itemId);
            saveChangesButtonText.style.color = "#7a7575";
            saveChangesButtonText.innerHTML = "Sparat";
        }).catch((error)=>{
            errorHandler.report(error);
            console.error("Error adding document: ", error);
        });
    }
    await uploadImages(itemId);
    $(".goback").data("disabled", false);
}
async function fillForm(itemId) {
    try {
        const userId = authUser.current.uid;
        const item = await firebase.app().functions("europe-west1").httpsCallable("getItem")({
            itemId
        });
        const data = item.data;
        if (userId === data.user || userId === "3OkW5av20HP8ScpUDS8ip9fBEZr1") {
            console.log("Item data:", data);
            const sex = data.sex;
            const size = data.size;
            const material = data.material;
            const brand = data.brand;
            const model = data.model;
            let originalPrice = data.originalPrice;
            if (originalPrice <= 0) originalPrice = null;
            const age = data.age;
            const condition = data.condition;
            const defects = data.defects;
            const defectDescription = data.defectDescription;
            const noSmoke = data.noSmoke;
            const noAnimals = data.noAnimals;
            const userComment = data.userComment;
            const infoRequests = data.infoRequests;
            const images = data.images;
            const status = data.status;
            let category = "";
            if (data.category) category = data.category;
            // Populate images
            function showImageAndHideSiblings(x, url) {
                document.getElementById(`${x}Preview`).style.backgroundImage = `url('${url}')`;
                const siblings = document.getElementById(x).parentNode.parentNode.childNodes;
                for(let i = 0; i < siblings.length; i++)if (siblings[i].className.includes("success-state")) siblings[i].style.display = "block";
                else siblings[i].style.display = "none";
            }
            for(const x in images){
                const possibleElmts = [
                    "brandTagImage",
                    "materialTagImage",
                    "defectImage",
                    "productImage",
                    "extraImage"
                ];
                const url = images[`${x}Small`] || images[`${x}Medium`] || images[`${x}Large`] || images[x];
                if (possibleElmts.includes(x)) showImageAndHideSiblings(x, url);
            }
            // Special case for frontImage where we want to show the enhancedFrontImage
            const frontImageUrl = images[`enhancedFrontImageSmall`] || images[`enhancedFrontImageMedium`] || images[`enhancedFrontImageLarge`] || images["enhancedFrontImage"] || images[`frontImageSmall`] || images[`frontImageMedium`] || images[`frontImageLarge`] || images["frontImage"];
            if (frontImageUrl) showImageAndHideSiblings("frontImage", frontImageUrl);
            // Populate text input fields
            pageTitle.innerHTML = brand;
            pageSubTitle.innerHTML = category;
            itemSize.setAttribute("value", size);
            itemBrand.setAttribute("value", brand);
            itemMaterial.setAttribute("value", material);
            itemModel.setAttribute("value", model);
            itemOriginalPrice.setAttribute("value", originalPrice);
            itemUserComment.value = userComment; //Textarea
            itemDefectDescription.value = defectDescription; //Textarea
            // Populate select fields
            let options = itemAge.options;
            for(let i = 0; i < options.length; i++)if (age === options[i].attributes.value.value) {
                itemAge.selectedIndex = i;
                if (age !== "") itemAge.style.color = "#333";
            }
            options = itemCondition.options;
            for(let i = 0; i < options.length; i++)if (condition === options[i].innerText) {
                itemCondition.selectedIndex = i;
                itemCondition.style.color = "#333";
                if (options[i].innerText === "Anv\xe4nd, tecken p\xe5 slitage") defectInfoDiv.style.display = "block";
            }
            // Populate checkboxes and readio-buttons is harder to do with Webflow, so not allowing users to change defects right now
            // If "info request" for images exist, show the directions
            if (infoRequests?.images?.status === "Active" && infoRequests?.images?.description) {
                photoDirectionsText.style.display = "none";
                infoRequestImagesText.innerHTML = infoRequests.images.description;
                infoRequestImagesDiv.style.display = "flex";
            }
            // Show form
            updateItemFormDiv.style.display = "block";
            pageTitleDiv.style.display = "flex";
            loadingDiv.style.display = "none";
        }
    } catch (error) {
        errorHandler.report(error);
        console.log("Error getting item document:", error);
    }
}
async function saveChanges() {
    saveChangesButtonText.style.color = "#e2dede";
    console.log("changedImages: ", changedImages);
    const params = getParamsObject();
    await updateItem(params.id, changedImages);
}
function setUpEventListeners() {
    // EVENT LISTENERS
    let imageElementIds = [
        "frontImage",
        "brandTagImage",
        "materialTagImage",
        "productImage",
        "defectImage",
        "extraImage"
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
            }
        });
    });
    document.getElementById("frontImage").addEventListener("change", async function() {
        let input = this.files[0];
        if (input) {
            const imageUrl = await (0, _sellItemHelpers.uploadImageAndShowPreview)(input, "frontImage", false);
            if (!imageUrl || Object.keys(imageUrl).length === 0) return;
            await (0, _sellItemHelpers.enhanceFrontImage)(imageUrl, false);
        }
    });
    let elementsArray = document.querySelectorAll("input");
    elementsArray.forEach(function(elem) {
        elem.addEventListener("input", function() {
            saveChangesButtonText.style.color = "#c24700";
            saveChangesButtonText.innerHTML = "Spara";
            if (elem.id.includes("Image")) changedImages.push(elem.id);
        });
    });
    itemCondition.onchange = function() {
        let input = this.value;
        if (input == "Anv\xe4nd, tecken p\xe5 slitage") {
            defectInfoDiv.style.display = "block";
            itemCondition.style.color = "#333";
        } else if (input == "") {
            defectInfoDiv.style.display = "none";
            itemCondition.style.color = "#929292";
        } else {
            defectInfoDiv.style.display = "none";
            itemCondition.style.color = "#333";
        }
    };
    itemAge.onchange = function() {
        let input = this.value;
        if (input != "") itemAge.style.color = "#333";
        else itemAge.style.color = "#929292";
    };
    saveChangesButton.addEventListener("click", saveChanges);
}
let changedImages = [];
sessionStorage.removeItem("enhancedFrontImage");
setUpEventListeners();
const params = getParamsObject();
user.whenSet(async ()=>await fillForm(params.id));
(0, _autocompleteBrands.autocomplete)(document.getElementById("itemBrand"), (0, _autocompleteBrands.brands)); // Enable autocomplete

},{"./sellItemHelpers":"8xEoj","./autocomplete-brands":"aDjZV"}],"8xEoj":[function(require,module,exports) {
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
parcelHelpers.export(exports, "showImageState", ()=>showImageState);
parcelHelpers.export(exports, "showLoadingIcon", ()=>showLoadingIcon);
async function uploadTempImage(input, fileName) {
    if (!sessionStorage.getItem("newItemId")) sessionStorage.setItem("newItemId", await requestUniqueId());
    const tempId = sessionStorage.getItem("newItemId");
    let image = await scaleImageToMaxSize(input);
    if (!image) throw "Fel vid bearbetning av vald bild.";
    const form = new FormData();
    form.append("itemId", tempId);
    form.append("fileName", fileName);
    form.append("file", image);
    form.append("temporary", "true");
    form.append("generateSmallImage", "true");
    const response = await fetch("https://uploaditemimagebinary-heypmjzjfq-ew.a.run.app", {
        method: "POST",
        body: form
    });
    return await response.json();
}
async function scaleImageToMaxSize(input) {
    if (input.size < 9437184) // Don't compress images < 9MB in size
    return Promise.resolve(input);
    return new Promise((resolve, reject)=>{
        const MAX_WIDTH = 1512;
        const MAX_HEIGHT = 2016;
        const reader = new FileReader();
        reader.onload = ()=>{
            const img = document.createElement("img");
            img.onload = ()=>{
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = height * (MAX_WIDTH / width);
                        width = MAX_WIDTH;
                    }
                } else if (height > MAX_HEIGHT) {
                    width = width * (MAX_HEIGHT / height);
                    height = MAX_HEIGHT;
                }
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.imageSmoothingQuality = "high";
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(resolve, "image/jpeg");
            };
            img.src = reader.result;
            reader.onerror = reject;
        };
        reader.readAsDataURL(input);
    });
}
async function requestUniqueId() {
    const endpointUrl = "https://generateuniqueid-heypmjzjfq-ew.a.run.app";
    try {
        const response = await fetch(endpointUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return null;
        }
        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error(`Failed to fetch unique ID, generating uuidv4 id: ${error.message}`, error);
        return uuidv4();
    }
}
async function enhanceFrontImage(imageUrl, saveState = true) {
    const enhancedImageUrls = await createEnhancedImage(imageUrl);
    if (enhancedImageUrls?.url) {
        if (saveState) rememberNewItemImageField("enhancedFrontImage", enhancedImageUrls.url, enhancedImageUrls.urlSmall);
        showImagePreview("frontImage", window.innerWidth <= 400 ? enhancedImageUrls.urlSmall : enhancedImageUrls.url);
    }
    showDeleteImageIcon("frontImage");
    return enhancedImageUrls;
}
async function createEnhancedImage(imageUrl) {
    try {
        const response = await firebase.app().functions("europe-west1").httpsCallable("enhanceFrontImage")({
            imageUrl
        });
        sessionStorage.setItem("enhancedFrontImage", response.data.url);
        return response.data;
    } catch (ex) {
        errorHandler.report(ex);
        console.error(ex);
        return "";
    }
}
function showDeleteImageIcon(imageName) {
    document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = "none";
    document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = "inline-block";
    if (imageName === "frontImage") document.getElementById("enhancedAnimationDiv").style.display = "none";
}
function rememberNewItemImageField(imageName, imageUrl, imageUrlSmall) {
    let newItem = JSON.parse(localStorage.getItem("newItem") || JSON.stringify({}));
    const images = newItem.images || {};
    images[imageName] = imageUrl;
    images[`${imageName}Small`] = imageUrlSmall;
    newItem.images = images;
    localStorage.setItem("newItem", JSON.stringify(newItem));
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
        showImageState(imageName, "success-state");
        const { url: imageUrl, urlSmall: imageUrlSmall } = await uploadTempImage(input, imageName);
        if (saveState) rememberNewItemImageField(imageName, imageUrl, imageUrlSmall);
        return imageUrl;
    } catch (ex) {
        console.error("Failed to upload image", ex);
        errorHandler.report(ex);
        document.getElementById(`${imageName}PreviewUploading`).style.backgroundImage = "";
        document.getElementById(`${imageName}Preview`).style.backgroundImage = "";
        document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = "none";
        showImageState(imageName, "default-state");
        if (input.size > 10485760) showImageError(imageName, "Error: Bilden \xe4r f\xf6r stor. Max 10 MB.");
        else showImageError(imageName, "Error: N\xe5got gick fel vid uppladdning, f\xf6rs\xf6k igen eller kontakt oss om felet kvarst\xe5r.");
        document.getElementById(imageName).value = "";
    }
}
function showImageError(imageName, error) {
    const parentNode = document.getElementById(imageName).parentNode.parentNode;
    parentNode.querySelector(".w-file-upload-error").style.display = "block";
    parentNode.querySelector(".w-file-upload-error-msg").innerText = error;
}
function hideImageError(imageName) {
    const parentNode = document.getElementById(imageName).parentNode.parentNode;
    parentNode.querySelector(".w-file-upload-error").style.display = "none";
}
function showImageState(imageName, state) {
    const siblings = document.getElementById(imageName).parentNode.parentNode.childNodes;
    for(let i = 0; i < siblings.length; i++)if (siblings[i].className.includes(state)) siblings[i].style.display = "block";
    else // Hide other states of file input field "empty-state" and "error-state"
    siblings[i].style.display = "none";
}
function showLoadingIcon(imageName) {
    if (imageName === "frontImage") {
        document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = "none";
        document.getElementById("enhancedAnimationDiv").style.display = "block";
        triggerEnhancingAnimation.click();
        return;
    }
    document.getElementById(`loading${capitalizeFirstLetter(imageName)}Icon`).style.display = "inline-block";
    document.getElementById(`delete${capitalizeFirstLetter(imageName)}Icon`).style.display = "none";
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

},{}],"aDjZV":[function(require,module,exports) {
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
                inp.dispatchEvent(new Event("input"));
                inp.dispatchEvent(new Event("blur"));
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
    "Levi's",
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["73pXK","9IZ5h"], "9IZ5h", "parcelRequire81ca")

//# sourceMappingURL=editItem.js.map
