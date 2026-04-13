/**
  * @alova/shared 1.3.2 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2025 Scott Hu. All Rights Reserved
  * Licensed under MIT (https://github.com/alovajs/alova/blob/main/LICENSE)
*/

const undefStr = 'undefined';
// The following unified processing functions or variables added to reduce the amount of compiled code
const PromiseCls = Promise;
const promiseResolve = (value) => PromiseCls.resolve(value);
const promiseReject = (value) => PromiseCls.reject(value);
const ObjectCls = Object;
const RegExpCls = RegExp;
const undefinedValue = undefined;
const nullValue = null;
const trueValue = true;
const falseValue = false;
const promiseThen = (promise, onFulfilled, onrejected) => promise.then(onFulfilled, onrejected);
const promiseCatch = (promise, onrejected) => promise.catch(onrejected);
const promiseFinally = (promise, onfinally) => promise.finally(onfinally);
const promiseAll = (values) => PromiseCls.all(values);
const JSONStringify = (value, replacer, space) => JSON.stringify(value, replacer, space);
const JSONParse = (value) => JSON.parse(value);
const setTimeoutFn = (fn, delay = 0) => setTimeout(fn, delay);
const clearTimeoutTimer = (timer) => clearTimeout(timer);
const objectKeys = (obj) => ObjectCls.keys(obj);
const objectValues = (obj) => ObjectCls.values(obj);
const forEach = (ary, fn) => ary.forEach(fn);
const pushItem = (ary, ...item) => ary.push(...item);
const mapItem = (ary, callbackfn) => ary.map(callbackfn);
const filterItem = (ary, predicate) => ary.filter(predicate);
const shift = (ary) => ary.shift();
const slice = (ary, start, end) => ary.slice(start, end);
const splice = (ary, start, deleteCount = 0, ...items) => ary.splice(start, deleteCount, ...items);
const len = (data) => data.length;
const isArray = (arg) => Array.isArray(arg);
const deleteAttr = (arg, attr) => delete arg[attr];
const typeOf = (arg) => typeof arg;
const regexpTest = (reg, str) => reg.test(`${str}`);
const includes = (ary, target) => ary.includes(target);
const valueObject = (value, writable = falseValue) => ({ value, writable });
const defineProperty = (o, key, value, isDescriptor = falseValue) => ObjectCls.defineProperty(o, key, isDescriptor ? value : valueObject(value, falseValue));
// Whether it is running on the server side, node and bun are judged by process, and deno is judged by Deno.
// Some frameworks (such as Alipay and uniapp) will inject the process object as a global variable which `browser` is true
const isSSR = typeof window === undefStr && (typeof process !== undefStr ? !process.browser : typeof Deno !== undefStr);
/** cache mode */
// only cache in memory, it's default option
const MEMORY = 'memory';
// persistent cache, and will be read to memory when page is refreshed, it means that the memory cache always exist until cache is expired.
const STORAGE_RESTORE = 'restore';

/**
 * Empty function for compatibility processing
 */
const noop = () => { };
/**
 * A function that returns the parameter itself, used for compatibility processing
 * Since some systems use self as a reserved word, $self is used to distinguish it.
 * @param arg any parameter
 * @returns return parameter itself
 */
const $self = (arg) => arg;
/**
 * Determine whether the parameter is a function any parameter
 * @returns Whether the parameter is a function
 */
const isFn = (arg) => typeOf(arg) === 'function';
/**
 * Determine whether the parameter is a number any parameter
 * @returns Whether the parameter is a number
 */
const isNumber = (arg) => typeOf(arg) === 'number' && !Number.isNaN(arg);
/**
 * Determine whether the parameter is a string any parameter
 * @returns Whether the parameter is a string
 */
const isString = (arg) => typeOf(arg) === 'string';
/**
 * Determine whether the parameter is an object any parameter
 * @returns Whether the parameter is an object
 */
const isObject = (arg) => arg !== nullValue && typeOf(arg) === 'object';
/**
 * Global toString any parameter stringified parameters
 */
const globalToString = (arg) => ObjectCls.prototype.toString.call(arg);
/**
 * Determine whether it is a normal object any parameter
 * @returns Judgment result
 */
const isPlainObject = (arg) => globalToString(arg) === '[object Object]';
/**
 * Determine whether it is an instance of a certain class any parameter
 * @returns Judgment result
 */
const instanceOf = (arg, cls) => arg instanceof cls;
/**
 * Unified timestamp acquisition function
 * @returns Timestamp
 */
const getTime = (date) => (date ? date.getTime() : Date.now());
/**
 * Get the alova instance through the method instance alova example
 */
const getContext = (methodInstance) => methodInstance.context;
/**
 * Get method instance configuration data
 * @returns Configuration object
 */
const getConfig = (methodInstance) => methodInstance.config;
/**
 * Get alova configuration data alova configuration object
 */
const getContextOptions = (alovaInstance) => alovaInstance.options;
/**
 * Get alova configuration data through method instance alova configuration object
 */
const getOptions = (methodInstance) => getContextOptions(getContext(methodInstance));
/**
 * Get the key value of the request method
 * @returns The key value of this request method
 */
const key = (methodInstance) => {
    const { params, headers } = getConfig(methodInstance);
    return JSONStringify([methodInstance.type, methodInstance.url, params, methodInstance.data, headers]);
};
/**
 * Create uuid simple version uuid
 */
const uuid = () => {
    const timestamp = new Date().getTime();
    return Math.floor(Math.random() * timestamp).toString(36);
};
/**
 * Get the key value of the method instance method instance
 * @returns The key value of this method instance
 */
const getMethodInternalKey = (methodInstance) => methodInstance.key;
/**
 * Get the request method object
 * @param methodHandler Request method handle
 * @param args Method call parameters request method object
 */
const getHandlerMethod = (methodHandler, assert, args = []) => {
    const methodInstance = isFn(methodHandler) ? methodHandler(...args) : methodHandler;
    assert(!!methodInstance.key, 'hook handler must be a method instance or a function that returns method instance');
    return methodInstance;
};
/**
 * Is it special data
 * @param data Submit data
 * @returns Judgment result
 */
const isSpecialRequestBody = (data) => {
    const dataTypeString = globalToString(data);
    return (/^\[object (Blob|FormData|ReadableStream|URLSearchParams)\]$/i.test(dataTypeString) || instanceOf(data, ArrayBuffer));
};
const objAssign = (target, ...sources) => ObjectCls.assign(target, ...sources);
/**
 * Excludes specified attributes from a data collection and returns a new data collection data collection
 * @param keys Excluded keys new data collection
 */
const omit = (obj, ...keys) => {
    const result = {};
    for (const key in obj) {
        if (!keys.includes(key)) {
            result[key] = obj[key];
        }
    }
    return result;
};
/**
 * the same as `Promise.withResolvers`
 * @returns promise with resolvers.
 */
function usePromise() {
    let retResolve;
    let retReject;
    const promise = new Promise((resolve, reject) => {
        retResolve = resolve;
        retReject = reject;
    });
    return { promise, resolve: retResolve, reject: retReject };
}
/**
 * Get cached configuration parameters, fixedly returning an object in the format { e: function, c: any, f: any, m: number, s: boolean, t: string } e is the abbreviation of expire, which returns the cache expiration time point (timestamp) in milliseconds.
 * c is controlled, indicating whether it is a controlled cache
 * f is the original value of cacheFor, which is used to call to obtain cached data when c is true.
 * m is the abbreviation of mode, storage mode
 * s is the abbreviation of storage, whether to store it locally
 * t is the abbreviation of tag, which stores tags persistently.
 * @param methodInstance method instance
 * @returns Unified cache parameter object
 */
const getLocalCacheConfigParam = (methodInstance) => {
    const { cacheFor } = getConfig(methodInstance);
    const getCacheExpireTs = (cacheExpire) => isNumber(cacheExpire) ? getTime() + cacheExpire : getTime(cacheExpire || undefinedValue);
    let cacheMode = MEMORY;
    let expire = () => 0;
    let store = falseValue;
    let tag = undefinedValue;
    const controlled = isFn(cacheFor);
    if (!controlled) {
        let expireColumn = cacheFor;
        if (isPlainObject(cacheFor)) {
            const { mode = MEMORY, expire, tag: configTag } = cacheFor || {};
            cacheMode = mode;
            store = mode === STORAGE_RESTORE;
            tag = configTag ? configTag.toString() : undefinedValue;
            expireColumn = expire;
        }
        expire = (mode) => getCacheExpireTs(isFn(expireColumn) ? expireColumn({ method: methodInstance, mode }) : expireColumn);
    }
    return {
        f: cacheFor,
        c: controlled,
        e: expire,
        m: cacheMode,
        s: store,
        t: tag
    };
};
/**
 * Create class instance
 * @param Cls Constructor
 * @param args Constructor parameters class instance
 */
const newInstance = (Cls, ...args) => new Cls(...args);
/**
 * Unified configuration
 * @param data
 * @returns unified configuration
 */
const sloughConfig = (config, args = []) => isFn(config) ? config(...args) : config;
const sloughFunction = (arg, defaultFn) => isFn(arg) ? arg : ![falseValue, nullValue].includes(arg) ? defaultFn : noop;
/**
 * Create an executor that calls multiple times synchronously and only executes it once asynchronously
 */
const createSyncOnceRunner = (delay = 0) => {
    let timer = undefinedValue;
    // Executing multiple calls to this function will execute once asynchronously
    return (fn) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeoutFn(fn, delay);
    };
};
/**
 * Create an asynchronous function queue, the asynchronous function will be executed serially queue add function
 */
const createAsyncQueue = (catchError = falseValue) => {
    const queue = [];
    let completedHandler = undefinedValue;
    let executing = false;
    const executeQueue = async () => {
        executing = trueValue;
        while (len(queue) > 0) {
            const asyncFunc = shift(queue);
            if (asyncFunc) {
                await asyncFunc();
            }
        }
        completedHandler && completedHandler();
        executing = falseValue;
    };
    const addQueue = (asyncFunc) => newInstance((PromiseCls), (resolve, reject) => {
        const wrappedFunc = () => promiseThen(asyncFunc(), resolve, err => {
            catchError ? resolve(undefinedValue) : reject(err);
        });
        pushItem(queue, wrappedFunc);
        if (!executing) {
            executeQueue();
        }
    });
    const onComplete = (fn) => {
        completedHandler = fn;
    };
    return {
        addQueue,
        onComplete
    };
};
/**
 * Traverse the target object deeply target audience
 * @param callback Traversal callback
 * @param preorder Whether to traverse in preorder, the default is true
 * @param key The currently traversed key
 * @param parent The parent node currently traversed
 */
const walkObject = (target, callback, preorder = trueValue, key, parent) => {
    const callCallback = () => {
        if (parent && key) {
            target = callback(target, key, parent);
            if (target !== parent[key]) {
                parent[key] = target;
            }
        }
    };
    // Preorder traversal
    preorder && callCallback();
    if (isObject(target)) {
        for (const i in target) {
            if (!instanceOf(target, String)) {
                walkObject(target[i], callback, preorder, i, target);
            }
        }
    }
    // Postal order traversal
    !preorder && callCallback();
    return target;
};
const cacheKeyPrefix = '$a.';
/**
 * build common cache key.
 */
const buildNamespacedCacheKey = (namespace, key) => cacheKeyPrefix + namespace + key;
/**
 * Determine whether it is a cache key built by alova
 * @param key Cache key
 */
const isAlovaCacheKey = (key) => key.startsWith(cacheKeyPrefix);
/**
 * Calculate retry delay time based on avoidance strategy and number of retries avoid parameters
 * @param retryTimes Number of retries
 * @returns Retry delay time
 */
const delayWithBackoff = (backoff, retryTimes) => {
    let { startQuiver, endQuiver } = backoff;
    const { delay, multiplier = 1 } = backoff;
    let retryDelayFinally = (delay || 0) * multiplier ** (retryTimes - 1);
    // If start quiver or end quiver has a value, you need to increase the random jitter value in the specified range
    if (startQuiver || endQuiver) {
        startQuiver = startQuiver || 0;
        endQuiver = endQuiver || 1;
        retryDelayFinally +=
            retryDelayFinally * startQuiver + Math.random() * retryDelayFinally * (endQuiver - startQuiver);
        retryDelayFinally = Math.floor(retryDelayFinally); // round delay
    }
    return retryDelayFinally;
};
/**
 * Build the complete url baseURL path url parameters complete url
 */
const buildCompletedURL = (baseURL, url, params) => {
    // Check if the URL starts with http/https
    const startsWithPrefix = /^https?:\/\//i.test(url);
    if (!startsWithPrefix) {
        // If the Base url ends with /, remove /
        baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
        // If it does not start with /or http protocol, you need to add /
        // Compatible with some RESTful usage fix: https://github.com/alovajs/alova/issues/382
        if (url !== '') {
            // Since absolute URLs (http/https) are handled above,
            // we only need to ensure relative URLs start with a forward slash
            url = url.startsWith('/') ? url : `/${url}`;
        }
    }
    // fix: https://github.com/alovajs/alova/issues/653
    const completeURL = startsWithPrefix ? url : baseURL + url;
    // Convert params object to get string
    // Filter out those whose value is undefined
    const paramsStr = isString(params)
        ? params
        : mapItem(filterItem(objectKeys(params), key => params[key] !== undefinedValue), key => `${key}=${params[key]}`).join('&');
    // Splice the get parameters behind the url. Note that the url may already have parameters.
    return paramsStr
        ? +completeURL.includes('?')
            ? `${completeURL}&${paramsStr}`
            : `${completeURL}?${paramsStr}`
        : completeURL;
};
/**
 * Deep clone an object.
 *
 * @param obj The object to be cloned.
 * @returns The cloned object.
 */
const deepClone = (obj) => {
    if (isArray(obj)) {
        return mapItem(obj, deepClone);
    }
    if (isPlainObject(obj) && obj.constructor === ObjectCls) {
        const clone = {};
        forEach(objectKeys(obj), key => {
            clone[key] = deepClone(obj[key]);
        });
        return clone;
    }
    return obj;
};

/**
 * alova error class
 */
class AlovaError extends Error {
    constructor(prefix, message, errorCode) {
        super(message + (errorCode ? `\n\nFor detailed: https://alova.js.org/error#${errorCode}` : ''));
        this.name = `[alova${prefix ? `/${prefix}` : ''}]`;
    }
}
/**
 * Custom assertion function that throws an error when the expression is false
 * When errorCode is passed in, a link to the error document will be provided to guide the user to correct it.
 * @param expression Judgment expression, true or false
 * @param message Assert message
 */
const createAssert = (prefix = '') => (expression, message, errorCode) => {
    if (!expression) {
        throw newInstance(AlovaError, prefix, message, errorCode);
    }
};

const bridgeObject = JSON.parse;
/**
 * Injects a reference object with `JSON.parse` so that it can be accessed in another module.
 * @param object injecting object
 */
const provideReferingObject = (object) => {
    bridgeObject.bridgeData = object;
};
const injectReferingObject = () => (bridgeObject.bridgeData || {});

const createEventManager = () => {
    const eventMap = {};
    return {
        eventMap,
        on(type, handler) {
            const eventTypeItem = (eventMap[type] = eventMap[type] || []);
            pushItem(eventTypeItem, handler);
            // return the off function
            return () => {
                eventMap[type] = filterItem(eventTypeItem, item => item !== handler);
            };
        },
        off(type, handler) {
            const handlers = eventMap[type];
            if (!handlers) {
                return;
            }
            if (handler) {
                const index = handlers.indexOf(handler);
                index > -1 && handlers.splice(index, 1);
            }
            else {
                delete eventMap[type];
            }
        },
        emit(type, event) {
            const handlers = eventMap[type] || [];
            return mapItem(handlers, handler => handler(event));
        }
    };
};
const decorateEvent = (onEvent, decoratedHandler) => {
    const emitter = createEventManager();
    const eventType = uuid();
    const eventReturn = onEvent(event => emitter.emit(eventType, event));
    return (handler) => {
        emitter.on(eventType, event => {
            decoratedHandler(handler, event);
        });
        return eventReturn;
    };
};

class FrameworkReadableState {
    constructor(state, key, dehydrate, exportState) {
        this.s = state;
        this.k = key;
        this.$dhy = dehydrate;
        this.$exp = exportState;
    }
    get v() {
        return this.$dhy(this.s);
    }
    get e() {
        return this.$exp(this.s);
    }
}
class FrameworkState extends FrameworkReadableState {
    constructor(state, key, dehydrate, exportState, update) {
        super(state, key, dehydrate, exportState);
        this.$upd = update;
    }
    set v(newValue) {
        this.$upd(this.s, newValue);
    }
    get v() {
        return this.$dhy(this.s);
    }
}

class QueueCallback {
    /**
     * @param [limit=null] no limit if set undefined or null
     * @param [initialProcessing=false]
     */
    constructor(limit, initialProcessing = false) {
        this.limit = limit;
        this.callbackQueue = [];
        this.isProcessing = false;
        this.interrupt = false;
        this.isProcessing = initialProcessing;
    }
    /**
     * Adds a callback function to the callback queue.
     * If a limit is set and the queue has reached its limit, the callback will not be added.
     * @param callback The callback function to be added to the queue.
     */
    queueCallback(callback) {
        if (this.limit && this.callbackQueue.length >= this.limit) {
            return;
        }
        this.callbackQueue.push(callback);
        if (!this.isProcessing) {
            this.tryRunQueueCallback();
        }
    }
    /**
     * Tries to run the callbacks in the queue.
     * If there are callbacks in the queue, it removes the first callback and executes it.
     * This method is called recursively until there are no more callbacks in the queue.
     */
    async tryRunQueueCallback() {
        this.isProcessing = true;
        this.interrupt = false;
        while (this.callbackQueue.length > 0 && !this.interrupt) {
            const cb = this.callbackQueue.shift();
            await (cb === null || cb === void 0 ? void 0 : cb());
        }
        this.isProcessing = false;
    }
    /**
     * If set the param `state` to true, it will interrupt the current job (whether or not the current processing state is true)
     * If set the param `state` to false, then get on with the rest of the work
     */
    setProcessingState(state) {
        this.isProcessing = state;
        if (!state) {
            this.tryRunQueueCallback();
        }
        else {
            this.interrupt = true;
        }
    }
}

const type = {};

export { $self, AlovaError, FrameworkReadableState, FrameworkState, JSONParse, JSONStringify, MEMORY, ObjectCls, PromiseCls, QueueCallback, RegExpCls, STORAGE_RESTORE, buildCompletedURL, buildNamespacedCacheKey, clearTimeoutTimer, createAssert, createAsyncQueue, createEventManager, createSyncOnceRunner, decorateEvent, deepClone, defineProperty, delayWithBackoff, deleteAttr, falseValue, filterItem, forEach, getConfig, getContext, getContextOptions, getHandlerMethod, getLocalCacheConfigParam, getMethodInternalKey, getOptions, getTime, globalToString, includes, injectReferingObject, instanceOf, isAlovaCacheKey, isArray, isFn, isNumber, isObject, isPlainObject, isSSR, isSpecialRequestBody, isString, key, len, mapItem, newInstance, noop, nullValue, objAssign, objectKeys, objectValues, omit, promiseAll, promiseCatch, promiseFinally, promiseReject, promiseResolve, promiseThen, provideReferingObject, pushItem, regexpTest, setTimeoutFn, shift, slice, sloughConfig, sloughFunction, splice, trueValue, type, typeOf, undefinedValue, usePromise, uuid, valueObject, walkObject };
