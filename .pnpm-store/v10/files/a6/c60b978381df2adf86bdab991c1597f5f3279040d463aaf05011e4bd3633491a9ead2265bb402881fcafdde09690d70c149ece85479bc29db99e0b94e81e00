/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"));
	else if(typeof define === 'function' && define.amd)
		define(["axios"], factory);
	else if(typeof exports === 'object')
		exports["AxiosMockAdapter"] = factory(require("axios"));
	else
		root["AxiosMockAdapter"] = factory(root["axios"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_axios__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/fast-deep-equal/index.js":
/*!***********************************************!*\
  !*** ./node_modules/fast-deep-equal/index.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
eval("\n\n// do not edit .js files directly - edit src/index.jst\n\n\n\nmodule.exports = function equal(a, b) {\n  if (a === b) return true;\n\n  if (a && b && typeof a == 'object' && typeof b == 'object') {\n    if (a.constructor !== b.constructor) return false;\n\n    var length, i, keys;\n    if (Array.isArray(a)) {\n      length = a.length;\n      if (length != b.length) return false;\n      for (i = length; i-- !== 0;)\n        if (!equal(a[i], b[i])) return false;\n      return true;\n    }\n\n\n\n    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;\n    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();\n    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();\n\n    keys = Object.keys(a);\n    length = keys.length;\n    if (length !== Object.keys(b).length) return false;\n\n    for (i = length; i-- !== 0;)\n      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;\n\n    for (i = length; i-- !== 0;) {\n      var key = keys[i];\n\n      if (!equal(a[key], b[key])) return false;\n    }\n\n    return true;\n  }\n\n  // true if both NaN, false otherwise\n  return a!==a && b!==b;\n};\n\n\n//# sourceURL=webpack://AxiosMockAdapter/./node_modules/fast-deep-equal/index.js?");

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/***/ ((module) => {

eval("/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\nmodule.exports = function isBuffer (obj) {\n  return obj != null && obj.constructor != null &&\n    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)\n}\n\n\n//# sourceURL=webpack://AxiosMockAdapter/./node_modules/is-buffer/index.js?");

/***/ }),

/***/ "./src/handle_request.js":
/*!*******************************!*\
  !*** ./src/handle_request.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nfunction passThroughRequest (mockAdapter, config) {\n  // Axios v0.17 mutates the url to include the baseURL for non hostnames\n  // but does not remove the baseURL from the config\n  let baseURL = config.baseURL;\n  if (baseURL && !/^https?:/.test(baseURL)) {\n    baseURL = undefined;\n  }\n\n  // Axios pre 1.2\n  if (typeof mockAdapter.originalAdapter === \"function\") {\n    return mockAdapter.originalAdapter(config);\n  }\n\n  return mockAdapter.axiosInstanceWithoutInterceptors(Object.assign({}, config, {\n    baseURL,\n    //  Use the original adapter, not the mock adapter\n    adapter: mockAdapter.originalAdapter,\n    // The request transformation runs on the original axios handler already\n    transformRequest: [],\n    transformResponse: []\n  }));\n}\n\nasync function handleRequest(mockAdapter, config) {\n  let url = config.url || \"\";\n  // TODO we're not hitting this `if` in any of the tests, investigate\n  if (\n    config.baseURL &&\n    url.substr(0, config.baseURL.length) === config.baseURL\n  ) {\n    url = url.slice(config.baseURL.length);\n  }\n\n  delete config.adapter;\n  mockAdapter.history.push(config);\n\n  const handler = utils.findHandler(\n    mockAdapter.handlers,\n    config.method,\n    url,\n    config.data,\n    config.params,\n    (config.headers && config.headers.constructor.name === \"AxiosHeaders\")\n      ? Object.assign({}, config.headers.toJSON())\n      : config.headers,\n    config.baseURL\n  );\n\n  if (handler) {\n    if (handler.replyOnce) {\n      utils.purgeIfReplyOnce(mockAdapter, handler);\n    }\n\n    if (handler.passThrough) {\n      // passThrough handler\n      return passThroughRequest(mockAdapter, config);\n    } else {\n      return utils.settle(\n        config,\n        handler.response,\n        getEffectiveDelay(mockAdapter, handler)\n      );\n    }\n  } else {\n    // handler not found\n    switch (mockAdapter.onNoMatch) {\n      case \"passthrough\":\n        return passThroughRequest(mockAdapter, config);\n      case \"throwException\":\n        throw utils.createCouldNotFindMockError(config);\n      default:\n        return utils.settle(\n          config,\n          { status: 404 },\n          mockAdapter.delayResponse\n        );\n    }\n  }\n}\n\nfunction getEffectiveDelay(adapter, handler) {\n  return typeof handler.delay === \"number\" ? handler.delay : adapter.delayResponse;\n}\n\nmodule.exports = handleRequest;\n\n\n//# sourceURL=webpack://AxiosMockAdapter/./src/handle_request.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst handleRequest = __webpack_require__(/*! ./handle_request */ \"./src/handle_request.js\");\nconst utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nconst VERBS = [\n  \"get\",\n  \"post\",\n  \"head\",\n  \"delete\",\n  \"patch\",\n  \"put\",\n  \"options\",\n  \"list\",\n  \"link\",\n  \"unlink\",\n];\n\nfunction getVerbArray() {\n  const arr = [];\n  VERBS.forEach(function (verb) {\n    Object.defineProperty(arr, verb, {\n      get () {\n        return arr.filter(function (h) {\n          return !h.method || h.method === verb;\n        });\n      },\n    });\n  });\n  return arr;\n}\n\nclass AxiosMockAdapter {\n  constructor (axiosInstance, options = {}) {\n    this.reset();\n\n    if (axiosInstance) {\n      this.axiosInstance = axiosInstance;\n      // Clone the axios instance to remove interceptors\n      // this is used for the passThrough mode with axios > 1.2\n      this.axiosInstanceWithoutInterceptors = axiosInstance.create\n        ? axiosInstance.create()\n        : undefined;\n\n      this.originalAdapter = axiosInstance.defaults.adapter;\n      this.delayResponse = options.delayResponse > 0 ? options.delayResponse : null;\n      this.onNoMatch = options.onNoMatch || null;\n      axiosInstance.defaults.adapter = this.adapter();\n    } else {\n      throw new Error(\"Please provide an instance of axios to mock\");\n    }\n  }\n\n  adapter () {\n    return (config) => handleRequest(this, config);\n  }\n\n  restore () {\n    if (!this.axiosInstance) return;\n    this.axiosInstance.defaults.adapter = this.originalAdapter;\n    this.axiosInstance = undefined;\n  }\n\n  reset () {\n    this.resetHandlers();\n    this.resetHistory();\n  }\n\n  resetHandlers () {\n    if (this.handlers) this.handlers.length = 0;\n    else this.handlers = getVerbArray();\n  }\n\n  resetHistory () {\n    if (this.history) this.history.length = 0;\n    else this.history = getVerbArray();\n  }\n}\n\nconst methodsWithConfigsAsSecondArg = [\"any\", \"get\", \"delete\", \"head\", \"options\"];\nfunction convertDataAndConfigToConfig (method, data, config) {\n  if (methodsWithConfigsAsSecondArg.includes(method)) {\n    return validateconfig(method, data || {});\n  } else {\n    return validateconfig(method, Object.assign({}, config, { data: data }));\n  }\n}\n\nconst allowedConfigProperties = [\"headers\", \"params\", \"data\"];\nfunction validateconfig (method, config) {\n  for (const key in config) {\n    if (!allowedConfigProperties.includes(key)) {\n      throw new Error(\n        `Invalid config property ${\n        JSON.stringify(key)\n        } provided to ${\n        toMethodName(method)\n        }. Config: ${\n        JSON.stringify(config)}`\n      );\n    }\n  }\n\n  return config;\n}\n\nfunction toMethodName (method) {\n  return `on${method.charAt(0).toUpperCase()}${method.slice(1)}`;\n}\n\nVERBS.concat(\"any\").forEach(function (method) {\n  AxiosMockAdapter.prototype[toMethodName(method)] = function (matcher, data, config) {\n    const self = this;\n    let delay;\n    matcher = matcher === undefined ? /.*/ : matcher;\n\n    const paramsAndBody = convertDataAndConfigToConfig(method, data, config);\n\n    function reply (code, response, headers) {\n      const handler = {\n        url: matcher,\n        method: method === \"any\" ? undefined : method,\n        params: paramsAndBody.params,\n        data: paramsAndBody.data,\n        headers: paramsAndBody.headers,\n        replyOnce: false,\n        delay,\n        response: typeof code === \"function\" ? code : [\n          code,\n          response,\n          headers\n        ]\n      };\n      addHandler(method, self.handlers, handler);\n      return self;\n    }\n\n    function withDelayInMs (_delay) {\n      delay = _delay;\n      const respond = requestApi.reply.bind(requestApi);\n      Object.assign(respond, requestApi);\n      return respond;\n    }\n\n    function replyOnce (code, response, headers) {\n      const handler = {\n        url: matcher,\n        method: method === \"any\" ? undefined : method,\n        params: paramsAndBody.params,\n        data: paramsAndBody.data,\n        headers: paramsAndBody.headers,\n        replyOnce: true,\n        delay: delay,\n        response: typeof code === \"function\" ? code : [\n          code,\n          response,\n          headers\n        ]\n      };\n      addHandler(method, self.handlers, handler);\n      return self;\n    }\n\n    const requestApi = {\n      reply,\n      replyOnce,\n      withDelayInMs,\n      passThrough () {\n        const handler = {\n          passThrough: true,\n          method: method === \"any\" ? undefined : method,\n          url: matcher,\n          params: paramsAndBody.params,\n          data: paramsAndBody.data,\n          headers: paramsAndBody.headers\n        };\n        addHandler(method, self.handlers, handler);\n        return self;\n      },\n      abortRequest () {\n        return reply(async function (config) {\n          throw utils.createAxiosError(\n            \"Request aborted\",\n            config,\n            undefined,\n            \"ECONNABORTED\"\n          );\n        });\n      },\n      abortRequestOnce () {\n        return replyOnce(async function (config) {\n          throw utils.createAxiosError(\n            \"Request aborted\",\n            config,\n            undefined,\n            \"ECONNABORTED\"\n          );\n        });\n      },\n\n      networkError () {\n        return reply(async function (config) {\n          throw utils.createAxiosError(\"Network Error\", config);\n        });\n      },\n\n      networkErrorOnce () {\n        return replyOnce(async function (config) {\n          throw utils.createAxiosError(\"Network Error\", config);\n        });\n      },\n\n      timeout () {\n        return reply(async function (config) {\n          throw utils.createAxiosError(\n            config.timeoutErrorMessage ||\n              `timeout of ${config.timeout  }ms exceeded`,\n            config,\n            undefined,\n            config.transitional && config.transitional.clarifyTimeoutError\n              ? \"ETIMEDOUT\"\n              : \"ECONNABORTED\"\n          );\n        });\n      },\n\n      timeoutOnce () {\n        return replyOnce(async function (config) {\n          throw utils.createAxiosError(\n            config.timeoutErrorMessage ||\n              `timeout of ${config.timeout  }ms exceeded`,\n            config,\n            undefined,\n            config.transitional && config.transitional.clarifyTimeoutError\n              ? \"ETIMEDOUT\"\n              : \"ECONNABORTED\"\n          );\n        });\n      },\n    };\n\n    return requestApi;\n  };\n});\n\nfunction findInHandlers (handlers, handler) {\n  let index = -1;\n  for (let i = 0; i < handlers.length; i += 1) {\n    const item = handlers[i];\n    const comparePaths =\n      item.url instanceof RegExp && handler.url instanceof RegExp\n        ? String(item.url) === String(handler.url)\n        : item.url === handler.url;\n\n    const isSame =\n      (!item.method || item.method === handler.method) &&\n      comparePaths &&\n      utils.isEqual(item.params, handler.params) &&\n      utils.isEqual(item.data, handler.data) &&\n      utils.isEqual(item.headers, handler.headers);\n\n    if (isSame && !item.replyOnce) {\n      index = i;\n    }\n  }\n  return index;\n}\n\nfunction addHandler (method, handlers, handler) {\n  if (method === \"any\") {\n    handlers.push(handler);\n  } else {\n    const indexOfExistingHandler = findInHandlers(handlers, handler);\n    // handler.replyOnce indicates that a handler only runs once.\n    // It's supported to register muliple ones like that without\n    // overwriting the previous one.\n    if (indexOfExistingHandler > -1 && !handler.replyOnce) {\n      handlers.splice(indexOfExistingHandler, 1, handler);\n    } else {\n      handlers.push(handler);\n    }\n  }\n}\n\nmodule.exports = AxiosMockAdapter;\nmodule.exports[\"default\"] = AxiosMockAdapter;\n\n\n//# sourceURL=webpack://AxiosMockAdapter/./src/index.js?");

/***/ }),

/***/ "./src/is_blob.js":
/*!************************!*\
  !*** ./src/is_blob.js ***!
  \************************/
/***/ ((module) => {

eval("/*!\n * MIT License\n *\n * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated\n * documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the\n * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit\n * persons to whom the Software is furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the\n * Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE\n * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\n * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n */\n\nfunction isBlob(value) {\n  if (typeof Blob === \"undefined\") {\n    return false;\n  }\n\n  return value instanceof Blob || Object.prototype.toString.call(value) === \"[object Blob]\";\n}\n\nmodule.exports = isBlob;\n\n\n//# sourceURL=webpack://AxiosMockAdapter/./src/is_blob.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst axios = __webpack_require__(/*! axios */ \"axios\");\nconst isEqual = __webpack_require__(/*! fast-deep-equal */ \"./node_modules/fast-deep-equal/index.js\");\nconst isBuffer = __webpack_require__(/*! is-buffer */ \"./node_modules/is-buffer/index.js\");\nconst isBlob = __webpack_require__(/*! ./is_blob */ \"./src/is_blob.js\");\nconst toString = Object.prototype.toString;\n\nfunction find(array, predicate) {\n  const length = array.length;\n  for (let i = 0; i < length; i++) {\n    const value = array[i];\n    if (predicate(value)) return value;\n  }\n}\n\nfunction isFunction(val) {\n  return toString.call(val) === \"[object Function]\";\n}\n\nfunction isObjectOrArray(val) {\n  return val !== null && typeof val === \"object\";\n}\n\nfunction isStream(val) {\n  return isObjectOrArray(val) && isFunction(val.pipe);\n}\n\nfunction isArrayBuffer(val) {\n  return toString.call(val) === \"[object ArrayBuffer]\";\n}\n\nfunction combineUrls(baseURL, url) {\n  if (baseURL) {\n    return `${baseURL.replace(/\\/+$/, \"\")}/${url.replace(/^\\/+/, \"\")}`;\n  }\n\n  return url;\n}\n\nfunction findHandler(\n  handlers,\n  method,\n  url,\n  body,\n  parameters,\n  headers,\n  baseURL\n) {\n  return find(handlers[method.toLowerCase()], function (handler) {\n    let matchesUrl = false;\n    if (typeof handler.url === \"string\") {\n      matchesUrl  = isUrlMatching(url, handler.url) ||\n        isUrlMatching(combineUrls(baseURL, url), handler.url);\n    } else if (handler.url instanceof RegExp) {\n      matchesUrl = handler.url.test(url) ||\n        handler.url.test(combineUrls(baseURL, url));\n    }\n\n    return matchesUrl &&\n      isBodyOrParametersMatching(body, parameters, handler) &&\n      isObjectMatching(headers, handler.headers);\n  });\n}\n\nfunction isUrlMatching(url, required) {\n  const noSlashUrl = url[0] === \"/\" ? url.substr(1) : url;\n  const noSlashRequired = required[0] === \"/\" ? required.substr(1) : required;\n  return noSlashUrl === noSlashRequired;\n}\n\nfunction isBodyOrParametersMatching(body, parameters, required) {\n  return isObjectMatching(parameters, required.params) &&\n    isBodyMatching(body, required.data);\n}\n\nfunction isObjectMatching(actual, expected) {\n  if (expected === undefined) return true;\n  if (typeof expected.asymmetricMatch === \"function\") {\n    return expected.asymmetricMatch(actual);\n  }\n  return isEqual(actual, expected);\n}\n\nfunction isBodyMatching(body, requiredBody) {\n  if (requiredBody === undefined) {\n    return true;\n  }\n  let parsedBody;\n  try {\n    parsedBody = JSON.parse(body);\n  } catch (_e) {}\n\n  return isObjectMatching(parsedBody ? parsedBody : body, requiredBody);\n}\n\nfunction purgeIfReplyOnce(mock, handler) {\n  const index = mock.handlers.indexOf(handler);\n  if (index > -1) {\n    mock.handlers.splice(index, 1);\n  }\n}\n\nfunction transformRequest(data) {\n  if (\n    isArrayBuffer(data) ||\n    isBuffer(data) ||\n    isStream(data) ||\n    isBlob(data)\n  ) {\n    return data;\n  }\n\n  // Object and Array: returns a deep copy\n  if (isObjectOrArray(data)) {\n    return JSON.parse(JSON.stringify(data));\n  }\n\n  // for primitives like string, undefined, null, number\n  return data;\n}\n\nasync function makeResponse(result, config) {\n  if (typeof result === \"function\") result = await result(config);\n\n  const status = result.status || result[0];\n  const data = transformRequest(result.data || result[1]);\n  const headers = result.headers || result[2];\n  if (result.config) config = result.config;\n\n  return {\n    status,\n    data,\n    headers,\n    config,\n    request: { responseURL: config.url }\n  };\n}\n\nasync function settle(config, response, delay) {\n  if (delay > 0) await new Promise(resolve => setTimeout(resolve, delay));\n\n  const result = await makeResponse(response, config);\n\n  if (\n    !result.config.validateStatus ||\n    result.config.validateStatus(result.status)\n  ) {\n    return result;\n  } else {\n    throw createAxiosError(\n      `Request failed with status code ${result.status}`,\n      result.config,\n      result\n    );\n  }\n}\n\nfunction createAxiosError(message, config, response, code) {\n  // axios v0.27.0+ defines AxiosError as constructor\n  if (typeof axios.AxiosError === \"function\") {\n    return axios.AxiosError.from(new Error(message), code, config, null, response);\n  }\n\n  // handling for axios v0.26.1 and below\n  const error = new Error(message);\n  error.isAxiosError = true;\n  error.config = config;\n  if (response !== undefined) {\n    error.response = response;\n  }\n  if (code !== undefined) {\n    error.code = code;\n  }\n\n  error.toJSON = function toJSON() {\n    return {\n      // Standard\n      message: this.message,\n      name: this.name,\n      // Microsoft\n      description: this.description,\n      number: this.number,\n      // Mozilla\n      fileName: this.fileName,\n      lineNumber: this.lineNumber,\n      columnNumber: this.columnNumber,\n      stack: this.stack,\n      // Axios\n      config: this.config,\n      code: this.code,\n    };\n  };\n  return error;\n}\n\nfunction createCouldNotFindMockError(config) {\n  const message =\n    `Could not find mock for: \\n${\n    JSON.stringify({\n      method: config.method,\n      url: config.url,\n      params: config.params,\n      headers: config.headers\n    }, null, 2)}`;\n  const error = new Error(message);\n  error.isCouldNotFindMockError = true;\n  error.url = config.url;\n  error.method = config.method;\n  return error;\n}\n\nmodule.exports = {\n  find,\n  findHandler,\n  purgeIfReplyOnce,\n  settle,\n  isObjectOrArray,\n  isBuffer,\n  isBlob,\n  isBodyOrParametersMatching,\n  isEqual,\n  createAxiosError,\n  createCouldNotFindMockError,\n};\n\n\n//# sourceURL=webpack://AxiosMockAdapter/./src/utils.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_axios__;

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});