/**
  * alova 3.5.1 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott Hu. All Rights Reserved
  * Licensed under MIT (https://github.com/alovajs/alova/blob/main/LICENSE)
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.alovaFetch = factory());
})(this, (function () { 'use strict';

  /**
    * @alova/shared 1.3.2 (https://alova.js.org)
    * Document https://alova.js.org
    * Copyright 2026 Scott Hu. All Rights Reserved
    * Licensed under MIT (https://github.com/alovajs/alova/blob/main/LICENSE)
  */

  const undefStr = 'undefined';
  // The following unified processing functions or variables added to reduce the amount of compiled code
  const PromiseCls = Promise;
  const promiseReject = (value) => PromiseCls.reject(value);
  const ObjectCls = Object;
  const undefinedValue = undefined;
  const nullValue = null;
  const trueValue = true;
  const falseValue = false;
  const JSONStringify = (value, replacer, space) => JSON.stringify(value, replacer, space);
  const setTimeoutFn = (fn, delay = 0) => setTimeout(fn, delay);
  const clearTimeoutTimer = (timer) => clearTimeout(timer);
  const deleteAttr = (arg, attr) => delete arg[attr];
  const typeOf = (arg) => typeof arg;
  const includes = (ary, target) => ary.includes(target);
  // Whether it is running on the server side, node and bun are judged by process, and deno is judged by Deno.
  // Some frameworks (such as Alipay and uniapp) will inject the process object as a global variable which `browser` is true
  typeof window === undefStr && (typeof process !== undefStr ? !process.browser : typeof Deno !== undefStr);
  /**
   * Determine whether the parameter is a string any parameter
   * @returns Whether the parameter is a string
   */
  const isString = (arg) => typeOf(arg) === 'string';
  /**
   * Global toString any parameter stringified parameters
   */
  const globalToString = (arg) => ObjectCls.prototype.toString.call(arg);
  /**
   * Determine whether it is an instance of a certain class any parameter
   * @returns Judgment result
   */
  const instanceOf = (arg, cls) => arg instanceof cls;
  /**
   * Is it special data
   * @param data Submit data
   * @returns Judgment result
   */
  const isSpecialRequestBody = (data) => {
      const dataTypeString = globalToString(data);
      return (/^\[object (Blob|FormData|ReadableStream|URLSearchParams)\]$/i.test(dataTypeString) || instanceOf(data, ArrayBuffer));
  };
  /**
   * Create class instance
   * @param Cls Constructor
   * @param args Constructor parameters class instance
   */
  const newInstance = (Cls, ...args) => new Cls(...args);

  const isBodyData = (data) => isString(data) || isSpecialRequestBody(data);
  function adapterFetch(options = {}) {
      return (elements, method) => {
          const adapterConfig = method.config;
          const timeout = adapterConfig.timeout || 0;
          const ctrl = new AbortController();
          const { data, headers } = elements;
          const isContentTypeSet = /content-type/i.test(ObjectCls.keys(headers).join());
          const isFormData = data && data.toString() === '[object FormData]';
          // When the content type is not set and the data is not a form data object, the content type is set to application/json by default.
          if (!isContentTypeSet && !isFormData) {
              headers['Content-Type'] = 'application/json; charset=UTF-8';
          }
          const ignoringHeaderValues = ['', undefinedValue, nullValue, falseValue];
          ObjectCls.keys(headers).forEach(headerName => {
              // fetch headers do not allow setting undefined/null/false values
              if (includes(ignoringHeaderValues, headers[headerName])) {
                  deleteAttr(headers, headerName);
              }
          });
          const fetchPromise = (options.customFetch || fetch)(elements.url, {
              ...adapterConfig,
              method: elements.type,
              signal: ctrl.signal,
              body: isBodyData(data) ? data : JSONStringify(data)
          });
          // If the interruption time is set, the request will be interrupted after the specified time.
          let abortTimer;
          let isTimeout = falseValue;
          if (timeout > 0) {
              abortTimer = setTimeoutFn(() => {
                  isTimeout = trueValue;
                  ctrl.abort();
              }, timeout);
          }
          return {
              response: () => fetchPromise.then(response => {
                  // Clear interrupt processing after successful request
                  clearTimeoutTimer(abortTimer);
                  // Response's readable can only be read once and needs to be cloned before it can be reused.
                  return response.clone();
              }, err => promiseReject(isTimeout ? newInstance(Error, 'fetchError: network timeout') : err)),
              // The then in the Headers function needs to catch exceptions, otherwise the correct error object will not be obtained internally.
              headers: () => fetchPromise.then(({ headers: responseHeaders }) => responseHeaders, () => ({})),
              // Due to limitations of the node fetch library, this code cannot be unit tested, but it has passed the test in the browser.
              /* c8 ignore start */
              onDownload: async (cb) => {
                  let isAborted = falseValue;
                  const response = await fetchPromise.catch(() => {
                      isAborted = trueValue;
                  });
                  if (!response)
                      return;
                  const { headers: responseHeaders, body } = response.clone();
                  const reader = body ? body.getReader() : undefinedValue;
                  const total = Number(responseHeaders.get('Content-Length') || responseHeaders.get('content-length') || 0);
                  if (total <= 0) {
                      return;
                  }
                  let loaded = 0;
                  if (reader) {
                      const pump = () => reader.read().then(({ done, value = new Uint8Array() }) => {
                          if (done || isAborted) {
                              isAborted && cb(loaded, 0);
                          }
                          else {
                              loaded += value.byteLength;
                              cb(loaded, total);
                              return pump();
                          }
                      });
                      pump();
                  }
              },
              onUpload() {
                  // eslint-disable-next-line no-console
                  console.error("fetch API does'nt support uploading progress. please consider to change `@alova/adapter-xhr` or `@alova/adapter-axios`");
              },
              /* c8 ignore stop */
              abort: () => {
                  ctrl.abort();
                  clearTimeoutTimer(abortTimer);
              }
          };
      };
  }

  return adapterFetch;

}));
