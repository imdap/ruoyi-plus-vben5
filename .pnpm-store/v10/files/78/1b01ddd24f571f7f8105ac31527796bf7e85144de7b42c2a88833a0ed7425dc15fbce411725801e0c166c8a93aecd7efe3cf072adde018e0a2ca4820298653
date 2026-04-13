/**
  * @alova/adapter-axios 2.0.18 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott Hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
  typeof define === 'function' && define.amd ? define(['exports', 'axios'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AlovaAdapterAxios = {}, global.axios));
})(this, (function (exports, axios) { 'use strict';

  /**
    * @alova/shared 1.3.2 (https://alova.js.org)
    * Document https://alova.js.org
    * Copyright 2026 Scott Hu. All Rights Reserved
    * Licensed under MIT (https://github.com/alovajs/alova/blob/main/LICENSE)
  */

  const undefStr = 'undefined';
  const undefinedValue = undefined;
  // Whether it is running on the server side, node and bun are judged by process, and deno is judged by Deno.
  // Some frameworks (such as Alipay and uniapp) will inject the process object as a global variable which `browser` is true
  typeof window === undefStr && (typeof process !== undefStr ? !process.browser : typeof Deno !== undefStr);

  /**
   * Empty function for compatibility processing
   */
  const noop = () => { };
  /**
   * Create class instance
   * @param Cls Constructor
   * @param args Constructor parameters class instance
   */
  const newInstance = (Cls, ...args) => new Cls(...args);

  const mockResponseHandler = ({ status, statusText, body }, _, currentMethod) => {
      const responseHeaders = {};
      const { config } = currentMethod;
      const axiosConfig = {
          baseURL: currentMethod.baseURL,
          url: currentMethod.url,
          data: currentMethod.data,
          ...config,
          headers: new axios.AxiosHeaders(config.headers)
      };
      const axiosResponse = {
          data: body,
          status,
          statusText,
          headers: responseHeaders,
          config: axiosConfig
      };
      // 状态大于等于400时抛出错误
      if (status >= 400) {
          throw new axios.AxiosError(statusText, 'ERR_BAD_REQUEST', axiosConfig, undefinedValue, axiosResponse);
      }
      return {
          response: axiosResponse,
          headers: responseHeaders
      };
  };
  const mockErrorHandler = (error, currentMethod) => {
      const { config } = currentMethod;
      return new axios.AxiosError(error.message, 'ERR_NETWORK', {
          baseURL: currentMethod.baseURL,
          url: currentMethod.url,
          data: currentMethod.data,
          ...config,
          headers: new axios.AxiosHeaders(config.headers)
      });
  };
  var mockResponse = {
      onMockResponse: mockResponseHandler,
      onMockError: mockErrorHandler
  };

  /**
   * axios request adapter
   */
  function requestAdapter(options = {}) {
      const adaptedAxiosInstance = options.axios || axios;
      const adapter = (_, method) => {
          let downloadHandler = noop;
          let uploadHandler = noop;
          const { config } = method;
          const controller = new AbortController();
          const { baseURL, timeout } = adaptedAxiosInstance.defaults;
          const responsePromise = adaptedAxiosInstance({
              url: method.url,
              method: method.type,
              baseURL: baseURL || method.baseURL,
              timeout: timeout || method.config.timeout,
              data: method.data,
              signal: controller.signal,
              // `onUploadProgress` allows handling progress events for uploads
              onUploadProgress: event => {
                      uploadHandler(event.loaded, event.total || 1);
                  }
                  ,
              // `onDownloadProgress` allows handling progress events for downloads
              onDownloadProgress: event => {
                  downloadHandler(event.loaded, event.total || 1);
              },
              ...config
          });
          return {
              response: () => responsePromise,
              headers: () => responsePromise.then(res => ((res === null || res === void 0 ? void 0 : res.headers) || newInstance(axios.AxiosHeaders))),
              abort: () => {
                  controller.abort();
              },
              onDownload: handler => {
                  downloadHandler = handler;
              },
              onUpload: handler => {
                  uploadHandler = handler;
              }
          };
      };
      return adapter;
  }

  exports.axiosMockResponse = mockResponse;
  exports.axiosRequestAdapter = requestAdapter;

}));
