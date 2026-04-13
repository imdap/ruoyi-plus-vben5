/**
  * @alova/adapter-axios 2.0.18 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott Hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

'use strict';

var shared = require('@alova/shared');
var axios = require('axios');

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
        throw new axios.AxiosError(statusText, 'ERR_BAD_REQUEST', axiosConfig, shared.undefinedValue, axiosResponse);
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
        let downloadHandler = shared.noop;
        let uploadHandler = shared.noop;
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
            onUploadProgress: process.env.NODE_ENV !== 'test'
                ? event => {
                    uploadHandler(event.loaded, event.total || 1);
                }
                : shared.undefinedValue,
            // `onDownloadProgress` allows handling progress events for downloads
            onDownloadProgress: event => {
                downloadHandler(event.loaded, event.total || 1);
            },
            ...config
        });
        return {
            response: () => responsePromise,
            headers: () => responsePromise.then(res => ((res === null || res === void 0 ? void 0 : res.headers) || shared.newInstance(axios.AxiosHeaders))),
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
