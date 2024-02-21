/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./bootstrap.js":
/*!**********************!*\
  !*** ./bootstrap.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// A dependency graph that contains any wasm must all be imported\n// asynchronously. This `bootstrap.js` file does the single async import, so\n// that no one else needs to worry about it again.\nPromise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_noSo-68cb7b\"), __webpack_require__.e(\"index_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./index.js */ \"./index.js\"))\n  .catch(e => console.error(\"Error importing `index.js`:\", e));\n\n\n//# sourceURL=webpack://nama-document-viz/./bootstrap.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bootstrap.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "nama-document-viz:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunknama_document_viz"] = self["webpackChunknama_document_viz"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/wasm chunk loading */
/******/ 	(() => {
/******/ 		// object to store loaded and loading wasm modules
/******/ 		var installedWasmModules = {};
/******/ 		
/******/ 		function promiseResolve() { return Promise.resolve(); }
/******/ 		
/******/ 		var wasmImportedFuncCache0;
/******/ 		var wasmImportedFuncCache1;
/******/ 		var wasmImportedFuncCache2;
/******/ 		var wasmImportedFuncCache3;
/******/ 		var wasmImportedFuncCache4;
/******/ 		var wasmImportedFuncCache5;
/******/ 		var wasmImportedFuncCache6;
/******/ 		var wasmImportedFuncCache7;
/******/ 		var wasmImportedFuncCache8;
/******/ 		var wasmImportedFuncCache9;
/******/ 		var wasmImportedFuncCache10;
/******/ 		var wasmImportedFuncCache11;
/******/ 		var wasmImportedFuncCache12;
/******/ 		var wasmImportedFuncCache13;
/******/ 		var wasmImportedFuncCache14;
/******/ 		var wasmImportedFuncCache15;
/******/ 		var wasmImportedFuncCache16;
/******/ 		var wasmImportedFuncCache17;
/******/ 		var wasmImportedFuncCache18;
/******/ 		var wasmImportedFuncCache19;
/******/ 		var wasmImportedFuncCache20;
/******/ 		var wasmImportedFuncCache21;
/******/ 		var wasmImportedFuncCache22;
/******/ 		var wasmImportedFuncCache23;
/******/ 		var wasmImportedFuncCache24;
/******/ 		var wasmImportedFuncCache25;
/******/ 		var wasmImportedFuncCache26;
/******/ 		var wasmImportedFuncCache27;
/******/ 		var wasmImportedFuncCache28;
/******/ 		var wasmImportedFuncCache29;
/******/ 		var wasmImportedFuncCache30;
/******/ 		var wasmImportedFuncCache31;
/******/ 		var wasmImportedFuncCache32;
/******/ 		var wasmImportedFuncCache33;
/******/ 		var wasmImportedFuncCache34;
/******/ 		var wasmImportedFuncCache35;
/******/ 		var wasmImportedFuncCache36;
/******/ 		var wasmImportedFuncCache37;
/******/ 		var wasmImportedFuncCache38;
/******/ 		var wasmImportedFuncCache39;
/******/ 		var wasmImportedFuncCache40;
/******/ 		var wasmImportedFuncCache41;
/******/ 		var wasmImportedFuncCache42;
/******/ 		var wasmImportedFuncCache43;
/******/ 		var wasmImportedFuncCache44;
/******/ 		var wasmImportedFuncCache45;
/******/ 		var wasmImportedFuncCache46;
/******/ 		var wasmImportedFuncCache47;
/******/ 		var wasmImportedFuncCache48;
/******/ 		var wasmImportedFuncCache49;
/******/ 		var wasmImportedFuncCache50;
/******/ 		var wasmImportedFuncCache51;
/******/ 		var wasmImportedFuncCache52;
/******/ 		var wasmImportedFuncCache53;
/******/ 		var wasmImportedFuncCache54;
/******/ 		var wasmImportedFuncCache55;
/******/ 		var wasmImportedFuncCache56;
/******/ 		var wasmImportedFuncCache57;
/******/ 		var wasmImportedFuncCache58;
/******/ 		var wasmImportedFuncCache59;
/******/ 		var wasmImportedFuncCache60;
/******/ 		var wasmImportedFuncCache61;
/******/ 		var wasmImportedFuncCache62;
/******/ 		var wasmImportedFuncCache63;
/******/ 		var wasmImportObjects = {
/******/ 			"./wasm/pkg/document_viz_wasm_bg.wasm": function() {
/******/ 				return {
/******/ 					"./document_viz_wasm_bg.js": {
/******/ 						"__wbindgen_error_new": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache0 === undefined) wasmImportedFuncCache0 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache0["__wbindgen_error_new"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 							if(wasmImportedFuncCache1 === undefined) wasmImportedFuncCache1 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache1["__wbindgen_object_drop_ref"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_is_undefined": function(p0i32) {
/******/ 							if(wasmImportedFuncCache2 === undefined) wasmImportedFuncCache2 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache2["__wbindgen_is_undefined"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_in": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache3 === undefined) wasmImportedFuncCache3 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache3["__wbindgen_in"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_string_get": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache4 === undefined) wasmImportedFuncCache4 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache4["__wbindgen_string_get"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_is_object": function(p0i32) {
/******/ 							if(wasmImportedFuncCache5 === undefined) wasmImportedFuncCache5 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache5["__wbindgen_is_object"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 							if(wasmImportedFuncCache6 === undefined) wasmImportedFuncCache6 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache6["__wbindgen_object_clone_ref"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_jsval_loose_eq": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache7 === undefined) wasmImportedFuncCache7 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache7["__wbindgen_jsval_loose_eq"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_boolean_get": function(p0i32) {
/******/ 							if(wasmImportedFuncCache8 === undefined) wasmImportedFuncCache8 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache8["__wbindgen_boolean_get"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_number_get": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache9 === undefined) wasmImportedFuncCache9 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache9["__wbindgen_number_get"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_as_number": function(p0i32) {
/******/ 							if(wasmImportedFuncCache10 === undefined) wasmImportedFuncCache10 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache10["__wbindgen_as_number"](p0i32);
/******/ 						},
/******/ 						"__wbg_String_389b54bd9d25375f": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache11 === undefined) wasmImportedFuncCache11 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache11["__wbg_String_389b54bd9d25375f"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_number_new": function(p0f64) {
/******/ 							if(wasmImportedFuncCache12 === undefined) wasmImportedFuncCache12 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache12["__wbindgen_number_new"](p0f64);
/******/ 						},
/******/ 						"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache13 === undefined) wasmImportedFuncCache13 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache13["__wbindgen_string_new"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_getwithrefkey_4a92a5eca60879b9": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache14 === undefined) wasmImportedFuncCache14 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache14["__wbg_getwithrefkey_4a92a5eca60879b9"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_set_9182712abebf82ef": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache15 === undefined) wasmImportedFuncCache15 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache15["__wbg_set_9182712abebf82ef"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_crypto_d05b68a3572bb8ca": function(p0i32) {
/******/ 							if(wasmImportedFuncCache16 === undefined) wasmImportedFuncCache16 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache16["__wbg_crypto_d05b68a3572bb8ca"](p0i32);
/******/ 						},
/******/ 						"__wbg_process_b02b3570280d0366": function(p0i32) {
/******/ 							if(wasmImportedFuncCache17 === undefined) wasmImportedFuncCache17 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache17["__wbg_process_b02b3570280d0366"](p0i32);
/******/ 						},
/******/ 						"__wbg_versions_c1cb42213cedf0f5": function(p0i32) {
/******/ 							if(wasmImportedFuncCache18 === undefined) wasmImportedFuncCache18 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache18["__wbg_versions_c1cb42213cedf0f5"](p0i32);
/******/ 						},
/******/ 						"__wbg_node_43b1089f407e4ec2": function(p0i32) {
/******/ 							if(wasmImportedFuncCache19 === undefined) wasmImportedFuncCache19 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache19["__wbg_node_43b1089f407e4ec2"](p0i32);
/******/ 						},
/******/ 						"__wbindgen_is_string": function(p0i32) {
/******/ 							if(wasmImportedFuncCache20 === undefined) wasmImportedFuncCache20 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache20["__wbindgen_is_string"](p0i32);
/******/ 						},
/******/ 						"__wbg_require_9a7e0f667ead4995": function() {
/******/ 							if(wasmImportedFuncCache21 === undefined) wasmImportedFuncCache21 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache21["__wbg_require_9a7e0f667ead4995"]();
/******/ 						},
/******/ 						"__wbg_msCrypto_10fc94afee92bd76": function(p0i32) {
/******/ 							if(wasmImportedFuncCache22 === undefined) wasmImportedFuncCache22 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache22["__wbg_msCrypto_10fc94afee92bd76"](p0i32);
/******/ 						},
/******/ 						"__wbg_randomFillSync_b70ccbdf4926a99d": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache23 === undefined) wasmImportedFuncCache23 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache23["__wbg_randomFillSync_b70ccbdf4926a99d"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_getRandomValues_7e42b4fb8779dc6d": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache24 === undefined) wasmImportedFuncCache24 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache24["__wbg_getRandomValues_7e42b4fb8779dc6d"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_get_0ee8ea3c7c984c45": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache25 === undefined) wasmImportedFuncCache25 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache25["__wbg_get_0ee8ea3c7c984c45"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_length_161c0d89c6535c1d": function(p0i32) {
/******/ 							if(wasmImportedFuncCache26 === undefined) wasmImportedFuncCache26 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache26["__wbg_length_161c0d89c6535c1d"](p0i32);
/******/ 						},
/******/ 						"__wbg_new_75208e29bddfd88c": function() {
/******/ 							if(wasmImportedFuncCache27 === undefined) wasmImportedFuncCache27 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache27["__wbg_new_75208e29bddfd88c"]();
/******/ 						},
/******/ 						"__wbindgen_is_function": function(p0i32) {
/******/ 							if(wasmImportedFuncCache28 === undefined) wasmImportedFuncCache28 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache28["__wbindgen_is_function"](p0i32);
/******/ 						},
/******/ 						"__wbg_newnoargs_cfecb3965268594c": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache29 === undefined) wasmImportedFuncCache29 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache29["__wbg_newnoargs_cfecb3965268594c"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_new_d1cc518eff6805bb": function() {
/******/ 							if(wasmImportedFuncCache30 === undefined) wasmImportedFuncCache30 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache30["__wbg_new_d1cc518eff6805bb"]();
/******/ 						},
/******/ 						"__wbg_next_586204376d2ed373": function(p0i32) {
/******/ 							if(wasmImportedFuncCache31 === undefined) wasmImportedFuncCache31 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache31["__wbg_next_586204376d2ed373"](p0i32);
/******/ 						},
/******/ 						"__wbg_next_b2d3366343a208b3": function(p0i32) {
/******/ 							if(wasmImportedFuncCache32 === undefined) wasmImportedFuncCache32 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache32["__wbg_next_b2d3366343a208b3"](p0i32);
/******/ 						},
/******/ 						"__wbg_done_90b14d6f6eacc42f": function(p0i32) {
/******/ 							if(wasmImportedFuncCache33 === undefined) wasmImportedFuncCache33 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache33["__wbg_done_90b14d6f6eacc42f"](p0i32);
/******/ 						},
/******/ 						"__wbg_value_3158be908c80a75e": function(p0i32) {
/******/ 							if(wasmImportedFuncCache34 === undefined) wasmImportedFuncCache34 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache34["__wbg_value_3158be908c80a75e"](p0i32);
/******/ 						},
/******/ 						"__wbg_iterator_40027cdd598da26b": function() {
/******/ 							if(wasmImportedFuncCache35 === undefined) wasmImportedFuncCache35 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache35["__wbg_iterator_40027cdd598da26b"]();
/******/ 						},
/******/ 						"__wbg_get_3fddfed2c83f434c": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache36 === undefined) wasmImportedFuncCache36 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache36["__wbg_get_3fddfed2c83f434c"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_call_3f093dd26d5569f8": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache37 === undefined) wasmImportedFuncCache37 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache37["__wbg_call_3f093dd26d5569f8"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_new_632630b5cec17f21": function() {
/******/ 							if(wasmImportedFuncCache38 === undefined) wasmImportedFuncCache38 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache38["__wbg_new_632630b5cec17f21"]();
/******/ 						},
/******/ 						"__wbg_self_05040bd9523805b9": function() {
/******/ 							if(wasmImportedFuncCache39 === undefined) wasmImportedFuncCache39 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache39["__wbg_self_05040bd9523805b9"]();
/******/ 						},
/******/ 						"__wbg_window_adc720039f2cb14f": function() {
/******/ 							if(wasmImportedFuncCache40 === undefined) wasmImportedFuncCache40 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache40["__wbg_window_adc720039f2cb14f"]();
/******/ 						},
/******/ 						"__wbg_globalThis_622105db80c1457d": function() {
/******/ 							if(wasmImportedFuncCache41 === undefined) wasmImportedFuncCache41 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache41["__wbg_globalThis_622105db80c1457d"]();
/******/ 						},
/******/ 						"__wbg_global_f56b013ed9bcf359": function() {
/******/ 							if(wasmImportedFuncCache42 === undefined) wasmImportedFuncCache42 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache42["__wbg_global_f56b013ed9bcf359"]();
/******/ 						},
/******/ 						"__wbg_set_79c308ecd9a1d091": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache43 === undefined) wasmImportedFuncCache43 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache43["__wbg_set_79c308ecd9a1d091"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_isArray_e783c41d0dd19b44": function(p0i32) {
/******/ 							if(wasmImportedFuncCache44 === undefined) wasmImportedFuncCache44 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache44["__wbg_isArray_e783c41d0dd19b44"](p0i32);
/******/ 						},
/******/ 						"__wbg_instanceof_ArrayBuffer_9221fa854ffb71b5": function(p0i32) {
/******/ 							if(wasmImportedFuncCache45 === undefined) wasmImportedFuncCache45 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache45["__wbg_instanceof_ArrayBuffer_9221fa854ffb71b5"](p0i32);
/******/ 						},
/******/ 						"__wbg_new_73a5987615ec8862": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache46 === undefined) wasmImportedFuncCache46 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache46["__wbg_new_73a5987615ec8862"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_call_67f2111acd2dfdb6": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache47 === undefined) wasmImportedFuncCache47 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache47["__wbg_call_67f2111acd2dfdb6"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_set_e4cfc2763115ffc7": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache48 === undefined) wasmImportedFuncCache48 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache48["__wbg_set_e4cfc2763115ffc7"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_isSafeInteger_a23a66ee7c41b273": function(p0i32) {
/******/ 							if(wasmImportedFuncCache49 === undefined) wasmImportedFuncCache49 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache49["__wbg_isSafeInteger_a23a66ee7c41b273"](p0i32);
/******/ 						},
/******/ 						"__wbg_buffer_b914fb8b50ebbc3e": function(p0i32) {
/******/ 							if(wasmImportedFuncCache50 === undefined) wasmImportedFuncCache50 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache50["__wbg_buffer_b914fb8b50ebbc3e"](p0i32);
/******/ 						},
/******/ 						"__wbg_newwithbyteoffsetandlength_0de9ee56e9f6ee6e": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache51 === undefined) wasmImportedFuncCache51 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache51["__wbg_newwithbyteoffsetandlength_0de9ee56e9f6ee6e"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_new_b1f2d6842d615181": function(p0i32) {
/******/ 							if(wasmImportedFuncCache52 === undefined) wasmImportedFuncCache52 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache52["__wbg_new_b1f2d6842d615181"](p0i32);
/******/ 						},
/******/ 						"__wbg_set_7d988c98e6ced92d": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache53 === undefined) wasmImportedFuncCache53 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache53["__wbg_set_7d988c98e6ced92d"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_length_21c4b0ae73cba59d": function(p0i32) {
/******/ 							if(wasmImportedFuncCache54 === undefined) wasmImportedFuncCache54 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache54["__wbg_length_21c4b0ae73cba59d"](p0i32);
/******/ 						},
/******/ 						"__wbg_instanceof_Uint8Array_c299a4ee232e76ba": function(p0i32) {
/******/ 							if(wasmImportedFuncCache55 === undefined) wasmImportedFuncCache55 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache55["__wbg_instanceof_Uint8Array_c299a4ee232e76ba"](p0i32);
/******/ 						},
/******/ 						"__wbg_newwithlength_0d03cef43b68a530": function(p0i32) {
/******/ 							if(wasmImportedFuncCache56 === undefined) wasmImportedFuncCache56 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache56["__wbg_newwithlength_0d03cef43b68a530"](p0i32);
/******/ 						},
/******/ 						"__wbg_subarray_adc418253d76e2f1": function(p0i32,p1i32,p2i32) {
/******/ 							if(wasmImportedFuncCache57 === undefined) wasmImportedFuncCache57 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache57["__wbg_subarray_adc418253d76e2f1"](p0i32,p1i32,p2i32);
/******/ 						},
/******/ 						"__wbg_new_abda76e883ba8a5f": function() {
/******/ 							if(wasmImportedFuncCache58 === undefined) wasmImportedFuncCache58 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache58["__wbg_new_abda76e883ba8a5f"]();
/******/ 						},
/******/ 						"__wbg_stack_658279fe44541cf6": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache59 === undefined) wasmImportedFuncCache59 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache59["__wbg_stack_658279fe44541cf6"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbg_error_f851667af71bcfc6": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache60 === undefined) wasmImportedFuncCache60 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache60["__wbg_error_f851667af71bcfc6"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache61 === undefined) wasmImportedFuncCache61 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache61["__wbindgen_debug_string"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 							if(wasmImportedFuncCache62 === undefined) wasmImportedFuncCache62 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache62["__wbindgen_throw"](p0i32,p1i32);
/******/ 						},
/******/ 						"__wbindgen_memory": function() {
/******/ 							if(wasmImportedFuncCache63 === undefined) wasmImportedFuncCache63 = __webpack_require__.c["./wasm/pkg/document_viz_wasm_bg.js"].exports;
/******/ 							return wasmImportedFuncCache63["__wbindgen_memory"]();
/******/ 						}
/******/ 					}
/******/ 				};
/******/ 			},
/******/ 		};
/******/ 		
/******/ 		var wasmModuleMap = {
/******/ 			"index_js": [
/******/ 				"./wasm/pkg/document_viz_wasm_bg.wasm"
/******/ 			]
/******/ 		};
/******/ 		
/******/ 		// object with all WebAssembly.instance exports
/******/ 		__webpack_require__.w = {};
/******/ 		
/******/ 		// Fetch + compile chunk loading for webassembly
/******/ 		__webpack_require__.f.wasm = function(chunkId, promises) {
/******/ 		
/******/ 			var wasmModules = wasmModuleMap[chunkId] || [];
/******/ 		
/******/ 			wasmModules.forEach(function(wasmModuleId, idx) {
/******/ 				var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/ 		
/******/ 				// a Promise means "currently loading" or "already loaded".
/******/ 				if(installedWasmModuleData)
/******/ 					promises.push(installedWasmModuleData);
/******/ 				else {
/******/ 					var importObject = wasmImportObjects[wasmModuleId]();
/******/ 					var req = fetch(__webpack_require__.p + "" + {"index_js":{"./wasm/pkg/document_viz_wasm_bg.wasm":"d914ba2e8b323be57594"}}[chunkId][wasmModuleId] + ".module.wasm");
/******/ 					var promise;
/******/ 					if(importObject && typeof importObject.then === 'function' && typeof WebAssembly.compileStreaming === 'function') {
/******/ 						promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 							return WebAssembly.instantiate(items[0], items[1]);
/******/ 						});
/******/ 					} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 						promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 					} else {
/******/ 						var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 						promise = bytesPromise.then(function(bytes) {
/******/ 							return WebAssembly.instantiate(bytes, importObject);
/******/ 						});
/******/ 					}
/******/ 					promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 						return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 					}));
/******/ 				}
/******/ 			});
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./bootstrap.js");
/******/ 	
/******/ })()
;