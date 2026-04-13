/**
  * alova 3.5.1 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott Hu. All Rights Reserved
  * Licensed under MIT (https://github.com/alovajs/alova/blob/main/LICENSE)
*/

'use strict';

var shared = require('@alova/shared');

exports.globalConfigMap = {
    autoHitCache: 'global',
    ssr: shared.isSSR
};
/**
 * Set global configuration
 * @param config
 */
var globalConfig = (config) => {
    exports.globalConfigMap = {
        ...exports.globalConfigMap,
        ...config
    };
};

const titleStyle = 'color: black; font-size: 12px; font-weight: bolder';
/**
 * Default cacheLogger function
 */
var defaultCacheLogger = (response, methodInstance, cacheMode, tag) => {
    const cole = console;
    // eslint-disable-next-line
    const log = (...args) => console.log(...args);
    const { url } = methodInstance;
    const isRestoreMode = cacheMode === shared.STORAGE_RESTORE;
    const hdStyle = '\x1B[42m%s\x1B[49m';
    const labelStyle = '\x1B[32m%s\x1B[39m';
    const startSep = ` [HitCache]${url} `;
    const endSepFn = () => Array(shared.len(startSep) + 1).join('^');
    if (exports.globalConfigMap.ssr) {
        log(hdStyle, startSep);
        log(labelStyle, ' Cache ', response);
        log(labelStyle, ' Mode  ', cacheMode);
        isRestoreMode && log(labelStyle, ' Tag   ', tag);
        log(labelStyle, endSepFn());
    }
    else {
        cole.groupCollapsed
            ? cole.groupCollapsed('%cHitCache', 'padding: 2px 6px; background: #c4fcd3; color: #53b56d;', url)
            : log(hdStyle, startSep);
        log('%c[Cache]', titleStyle, response);
        log('%c[Mode]', titleStyle, cacheMode);
        isRestoreMode && log('%c[Tag]', titleStyle, tag);
        log('%c[Method]', titleStyle, methodInstance);
        cole.groupEnd ? cole.groupEnd() : log(labelStyle, endSepFn());
    }
};

const hitSourceStringCacheKey = (key) => `hss.${key}`;
const hitSourceRegexpPrefix = 'hsr.';
const hitSourceRegexpCacheKey = (regexpStr) => hitSourceRegexpPrefix + regexpStr;
const unifiedHitSourceRegexpCacheKey = '$$hsrs';
const regexpSourceFlagSeparator = '__$<>$__';
const addItem = (obj, item) => {
    obj[item] = 0;
};
/**
 * set or update cache
 * @param namespace namespace
 * @param key stored key
 * @param response Stored response content
 * @param expireTimestamp Timestamp representation of expiration time point
 * @param storage storage object
 * @param tag Storage tags, used to distinguish different storage tags
 */
const setWithCacheAdapter = async (namespace, key, data, expireTimestamp, cacheAdapter, hitSource, tag) => {
    // not to cache if expireTimestamp is less than current timestamp
    if (expireTimestamp > shared.getTime() && data) {
        const methodCacheKey = shared.buildNamespacedCacheKey(namespace, key);
        await cacheAdapter.set(methodCacheKey, shared.filterItem([data, expireTimestamp === Infinity ? shared.undefinedValue : expireTimestamp, tag], Boolean));
        // save the relationship between this method and its hitSources.
        // cache structure is like this:
        /*
          {
            "$a.[namespace][methodKey]": [cache data],
            ...
            "hss.[sourceMethodKey]": "{
              [targetMethodKey1]: 0,
              [targetMethodKey2]: 0,
              ...
            }",
            "hss.[sourceMethodName]": "{
              [targetMethodKey3]: 0,
              [targetMethodKey4]: 0,
              ...
            }",
            "hsr.[sourceMethodNameRegexpSource]": "{
              [targetMethodKey5]: 0,
              [targetMethodKey6]: 0,
              ...
            }",
            "hsr.regexp1": ["hss.key1", "hss.key2"],
            "hsr.regexp2": ["hss.key1", "hss.key2"]
          }
        */
        if (hitSource) {
            // filter repeat items and categorize the regexp, to prevent unnecessary cost of IO
            const hitSourceKeys = {};
            const hitSourceRegexpSources = [];
            shared.forEach(hitSource, sourceItem => {
                const isRegexp = shared.instanceOf(sourceItem, shared.RegExpCls);
                const targetHitSourceKey = isRegexp
                    ? sourceItem.source + (sourceItem.flags ? regexpSourceFlagSeparator + sourceItem.flags : '')
                    : sourceItem;
                if (targetHitSourceKey) {
                    if (isRegexp && !hitSourceKeys[targetHitSourceKey]) {
                        shared.pushItem(hitSourceRegexpSources, targetHitSourceKey);
                    }
                    addItem(hitSourceKeys, isRegexp ? hitSourceRegexpCacheKey(targetHitSourceKey) : hitSourceStringCacheKey(targetHitSourceKey));
                }
            });
            // save the relationship. Minimize IO as much as possible
            const promises = shared.mapItem(shared.objectKeys(hitSourceKeys), async (hitSourceKey) => {
                // filter the empty strings.
                const targetMethodKeys = (await cacheAdapter.get(hitSourceKey)) || {};
                addItem(targetMethodKeys, methodCacheKey);
                await cacheAdapter.set(hitSourceKey, targetMethodKeys);
            });
            const saveRegexp = async () => {
                // save the regexp source if regexp exists.
                if (shared.len(hitSourceRegexpSources)) {
                    const regexpList = (await cacheAdapter.get(unifiedHitSourceRegexpCacheKey)) || [];
                    // TODO: hitSourceRegexpSources needs to be deduplicated
                    shared.pushItem(regexpList, ...hitSourceRegexpSources);
                    await cacheAdapter.set(unifiedHitSourceRegexpCacheKey, regexpList);
                }
            };
            // parallel executing all async tasks.
            await shared.PromiseCls.all([...promises, saveRegexp()]);
        }
    }
};
/**
 * Delete stored response data
 * @param namespace namespace
 * @param key stored key
 * @param storage storage object
 */
const removeWithCacheAdapter = async (namespace, key, cacheAdapter) => {
    const methodStoreKey = shared.buildNamespacedCacheKey(namespace, key);
    await cacheAdapter.remove(methodStoreKey);
};
/**
 * Get stored response data
 * @param namespace namespace
 * @param key stored key
 * @param storage storage object
 * @param tag Store tags. If the tag changes, the data will become invalid.
 */
const getRawWithCacheAdapter = async (namespace, key, cacheAdapter, tag) => {
    const storagedData = await cacheAdapter.get(shared.buildNamespacedCacheKey(namespace, key));
    if (storagedData) {
        // Eslint disable next line
        const [dataUnused, expireTimestamp, storedTag] = storagedData;
        // If there is no expiration time, it means that the data will never expire. Otherwise, you need to determine whether it has expired.
        if (storedTag === tag && (!expireTimestamp || expireTimestamp > shared.getTime())) {
            return storagedData;
        }
        // If expired, delete cache
        await removeWithCacheAdapter(namespace, key, cacheAdapter);
    }
};
/**
 * Get stored response data
 * @param namespace namespace
 * @param key stored key
 * @param storage storage object
 * @param tag Store tags. If the tag changes, the data will become invalid.
 */
const getWithCacheAdapter = async (namespace, key, cacheAdapter, tag) => {
    const rawData = await getRawWithCacheAdapter(namespace, key, cacheAdapter, tag);
    return rawData ? rawData[0] : shared.undefinedValue;
};
/**
 * clear all cached data
 */
const clearWithCacheAdapter = async (cacheAdapters) => shared.PromiseCls.all(cacheAdapters.map(cacheAdapter => cacheAdapter.clear()));
/**
 * query and delete target cache with key and name of source method instance.
 * @param sourceKey source method instance key
 * @param sourceName source method instance name
 * @param cacheAdapter cache adapter
 */
const hitTargetCacheWithCacheAdapter = async (sourceKey, sourceName, cacheAdapter) => {
    const sourceNameStr = `${sourceName}`;
    // map that recording the source key and target method keys.
    const sourceTargetKeyMap = {};
    // get hit key by method key.
    const hitSourceKey = hitSourceStringCacheKey(sourceKey);
    sourceTargetKeyMap[hitSourceKey] = await cacheAdapter.get(hitSourceKey);
    let unifiedHitSourceRegexpChannel;
    if (sourceName) {
        const hitSourceName = hitSourceStringCacheKey(sourceNameStr);
        // get hit key by method name if it is exists.
        sourceTargetKeyMap[hitSourceName] = await cacheAdapter.get(hitSourceName);
        // match regexped key by source method name and get hit key by method name.
        unifiedHitSourceRegexpChannel = await cacheAdapter.get(unifiedHitSourceRegexpCacheKey);
        const matchedRegexpStrings = [];
        if (unifiedHitSourceRegexpChannel && shared.len(unifiedHitSourceRegexpChannel)) {
            shared.forEach(unifiedHitSourceRegexpChannel, regexpStr => {
                const [source, flag] = regexpStr.split(regexpSourceFlagSeparator);
                if (shared.newInstance(shared.RegExpCls, source, flag).test(sourceNameStr)) {
                    shared.pushItem(matchedRegexpStrings, regexpStr);
                }
            });
            // parallel get hit key by matched regexps.
            await shared.PromiseCls.all(shared.mapItem(matchedRegexpStrings, async (regexpString) => {
                const hitSourceRegexpString = hitSourceRegexpCacheKey(regexpString);
                sourceTargetKeyMap[hitSourceRegexpString] = await cacheAdapter.get(hitSourceRegexpString);
            }));
        }
    }
    const removeWithTargetKey = async (targetKey) => {
        try {
            await cacheAdapter.remove(targetKey);
            // loop sourceTargetKeyMap and remove this key to prevent unnecessary cost of IO.
            for (const sourceKey in sourceTargetKeyMap) {
                const targetKeys = sourceTargetKeyMap[sourceKey];
                if (targetKeys) {
                    shared.deleteAttr(targetKeys, targetKey);
                }
            }
        }
        catch (_a) {
            // the try-catch is used to prevent throwing error, cause throwing error in `Promise.all` below.
        }
    };
    // now let's start to delete target caches.
    // and filter the finished keys.
    const accessedKeys = {};
    await shared.PromiseCls.all(shared.mapItem(shared.objectKeys(sourceTargetKeyMap), async (sourceKey) => {
        const targetKeys = sourceTargetKeyMap[sourceKey];
        if (targetKeys) {
            const removingPromises = [];
            for (const key in targetKeys) {
                if (!accessedKeys[key]) {
                    addItem(accessedKeys, key);
                    shared.pushItem(removingPromises, removeWithTargetKey(key));
                }
            }
            await shared.PromiseCls.all(removingPromises);
        }
    }));
    // update source key if there is still has keys.
    // remove source key if its keys is empty.
    const unifiedHitSourceRegexpChannelLen = shared.len(unifiedHitSourceRegexpChannel || []);
    await shared.PromiseCls.all(shared.mapItem(shared.objectKeys(sourceTargetKeyMap), async (sourceKey) => {
        const targetKeys = sourceTargetKeyMap[sourceKey];
        if (targetKeys) {
            if (shared.len(shared.objectKeys(targetKeys))) {
                await cacheAdapter.set(sourceKey, targetKeys);
            }
            else {
                await cacheAdapter.remove(sourceKey);
                // if this is a regexped key, need to remove it from unified regexp channel.
                if (sourceKey.includes(hitSourceRegexpPrefix) && unifiedHitSourceRegexpChannel) {
                    unifiedHitSourceRegexpChannel = shared.filterItem(unifiedHitSourceRegexpChannel, rawRegexpStr => hitSourceRegexpCacheKey(rawRegexpStr) !== sourceKey);
                }
            }
        }
    }));
    // update unified hit source regexp channel if its length was changed.
    if (unifiedHitSourceRegexpChannelLen !== shared.len(unifiedHitSourceRegexpChannel || [])) {
        await cacheAdapter.set(unifiedHitSourceRegexpCacheKey, unifiedHitSourceRegexpChannel);
    }
};

var cloneMethod = (methodInstance) => {
    const { data, config } = methodInstance;
    const newConfig = { ...config };
    const { headers = {}, params = {} } = newConfig;
    const ctx = shared.getContext(methodInstance);
    newConfig.headers = { ...headers };
    newConfig.params = shared.isString(params) ? params : { ...params };
    const newMethod = shared.newInstance((Method), methodInstance.type, ctx, methodInstance.url, newConfig, data);
    return shared.objAssign(newMethod, {
        ...methodInstance,
        config: newConfig
    });
};

// Cache policy constants
const CACHE_POLICY_L2 = 'l2';
const CACHE_POLICY_ALL = 'all';
/*
 * The matchers in the following three functions are Method instance matchers, which are divided into three situations:
 * 1. If the matcher is a Method instance, clear the cache of the Method instance.
 * 2. If matcher is a string or regular expression, clear the cache of all Method instances that meet the conditions.
 * 3. If no matcher is passed in, all caches will be cleared.
 */
/**
 * Query cache
 * @param matcher Method instance matcher
 * @returns Cache data, return undefined if not found
 */
const queryCache = async (matcher, { policy = CACHE_POLICY_ALL } = {}) => {
    // if key exists, that means it's a method instance.
    if (matcher && matcher.key) {
        const { id, l1Cache, l2Cache } = shared.getContext(matcher);
        const methodKey = shared.getMethodInternalKey(matcher);
        const { f: cacheFor, c: controlled, s: store, e: expireMilliseconds, t: tag } = shared.getLocalCacheConfigParam(matcher);
        // if it's controlled cache, it will return the result of cacheFor function.
        if (controlled) {
            return cacheFor();
        }
        let cachedData = policy !== CACHE_POLICY_L2 ? await getWithCacheAdapter(id, methodKey, l1Cache) : shared.undefinedValue;
        if (policy === CACHE_POLICY_L2) {
            cachedData = await getWithCacheAdapter(id, methodKey, l2Cache, tag);
        }
        else if (policy === CACHE_POLICY_ALL && !cachedData) {
            if (store && expireMilliseconds(shared.STORAGE_RESTORE) > shared.getTime()) {
                cachedData = await getWithCacheAdapter(id, methodKey, l2Cache, tag);
            }
        }
        return cachedData;
    }
};
/**
 * Manually set cache response data. If the corresponding methodInstance sets persistent storage, the cache in the persistent storage will also be checked out.
 * @param matcher Method instance matcher cache data
 */
const setCache = async (matcher, dataOrUpdater, { policy = CACHE_POLICY_ALL } = {}) => {
    const methodInstances = shared.isArray(matcher) ? matcher : [matcher];
    const batchPromises = methodInstances.map(async (methodInstance) => {
        const { hitSource } = methodInstance;
        const { id, l1Cache, l2Cache } = shared.getContext(methodInstance);
        const methodKey = shared.getMethodInternalKey(methodInstance);
        const { e: expireMilliseconds, s: toStore, t: tag, c: controlled } = shared.getLocalCacheConfigParam(methodInstance);
        // don't set cache when it's controlled cache.
        if (controlled) {
            return;
        }
        let data = dataOrUpdater;
        if (shared.isFn(dataOrUpdater)) {
            let cachedData = policy !== CACHE_POLICY_L2 ? await getWithCacheAdapter(id, methodKey, l1Cache) : shared.undefinedValue;
            if (policy === CACHE_POLICY_L2 ||
                (policy === CACHE_POLICY_ALL && !cachedData && toStore && expireMilliseconds(shared.STORAGE_RESTORE) > shared.getTime())) {
                cachedData = await getWithCacheAdapter(id, methodKey, l2Cache, tag);
            }
            data = dataOrUpdater(cachedData);
            if (data === shared.undefinedValue) {
                return;
            }
        }
        return shared.PromiseCls.all([
            policy !== CACHE_POLICY_L2 &&
                setWithCacheAdapter(id, methodKey, data, expireMilliseconds(shared.MEMORY), l1Cache, hitSource),
            policy === CACHE_POLICY_L2 || (policy === CACHE_POLICY_ALL && toStore)
                ? setWithCacheAdapter(id, methodKey, data, expireMilliseconds(shared.STORAGE_RESTORE), l2Cache, hitSource, tag)
                : shared.undefinedValue
        ]);
    });
    return shared.PromiseCls.all(batchPromises);
};
/**
 * invalid cache
 * @param matcher Method instance matcher
 */
const invalidateCache = async (matcher) => {
    if (!matcher) {
        await shared.PromiseCls.all([clearWithCacheAdapter(usingL1CacheAdapters), clearWithCacheAdapter(usingL2CacheAdapters)]);
        return;
    }
    const methodInstances = shared.isArray(matcher) ? matcher : [matcher];
    const batchPromises = methodInstances.map(methodInstance => {
        const { id, l1Cache, l2Cache } = shared.getContext(methodInstance);
        const { c: controlled, m: cacheMode } = shared.getLocalCacheConfigParam(methodInstance);
        // don't invalidate cache when it's controlled cache.
        if (controlled) {
            return;
        }
        const methodKey = shared.getMethodInternalKey(methodInstance);
        return shared.PromiseCls.all([
            removeWithCacheAdapter(id, methodKey, l1Cache),
            cacheMode === shared.STORAGE_RESTORE ? removeWithCacheAdapter(id, methodKey, l2Cache) : shared.promiseResolve()
        ]);
    });
    await shared.PromiseCls.all(batchPromises);
};
/**
 * hit(invalidate) target caches by source method
 * this is the implementation of auto invalidate cache
 * @param sourceMethod source method instance
 */
const hitCacheBySource = async (sourceMethod) => {
    // Find the hit target cache and invalidate its cache
    // Control the automatic cache invalidation range through global configuration `autoHitCache`
    const { autoHitCache } = exports.globalConfigMap;
    const { l1Cache, l2Cache } = shared.getContext(sourceMethod);
    const sourceKey = shared.getMethodInternalKey(sourceMethod);
    const { name: sourceName } = shared.getConfig(sourceMethod);
    const cacheAdaptersInvolved = {
        global: [...usingL1CacheAdapters, ...usingL2CacheAdapters],
        self: [l1Cache, l2Cache],
        close: []
    }[autoHitCache];
    if (cacheAdaptersInvolved && shared.len(cacheAdaptersInvolved)) {
        await shared.PromiseCls.all(shared.mapItem(cacheAdaptersInvolved, involvedCacheAdapter => hitTargetCacheWithCacheAdapter(sourceKey, sourceName, involvedCacheAdapter)));
    }
};

const adapterReturnMap = {};
/**
 * actual request function
 * @param method request method object
 * @param forceRequest Ignore cache
 * @returns response data
 */
function sendRequest(methodInstance, forceRequest) {
    let fromCache = shared.trueValue;
    let requestAdapterCtrlsPromiseResolveFn;
    const requestAdapterCtrlsPromise = shared.newInstance(shared.PromiseCls, resolve => {
        requestAdapterCtrlsPromiseResolveFn = resolve;
    });
    const response = async () => {
        const { beforeRequest = shared.noop, responded, requestAdapter, cacheLogger } = shared.getOptions(methodInstance);
        const methodKey = shared.getMethodInternalKey(methodInstance);
        const { s: toStorage, t: tag, m: cacheMode, e: expireMilliseconds } = shared.getLocalCacheConfigParam(methodInstance);
        const { id, l1Cache, l2Cache, snapshots } = shared.getContext(methodInstance);
        // Get controlled cache or uncontrolled cache
        const { cacheFor } = shared.getConfig(methodInstance);
        const { hitSource: methodHitSource } = methodInstance;
        // If the current method sets a controlled cache, check whether there is custom data
        let cachedResponse = await (shared.isFn(cacheFor)
            ? cacheFor()
            : // If it is a forced request, skip the step of getting it from the cache
                // Otherwise, determine whether to use cached data
                forceRequest
                    ? shared.undefinedValue
                    : getWithCacheAdapter(id, methodKey, l1Cache));
        // If it is storage restore mode and there is no data in the cache, the persistent data needs to be restored to the cache, and the cached expiration time must be used.
        if (cacheMode === shared.STORAGE_RESTORE && !cachedResponse && !forceRequest) {
            const rawL2CacheData = await getRawWithCacheAdapter(id, methodKey, l2Cache, tag);
            if (rawL2CacheData) {
                const [l2Response, l2ExpireMilliseconds] = rawL2CacheData;
                await setWithCacheAdapter(id, methodKey, l2Response, l2ExpireMilliseconds, l1Cache, methodHitSource);
                cachedResponse = l2Response;
            }
        }
        // Clone the method as a parameter and pass it to beforeRequest to prevent side effects when using the original method instance request multiple times.
        // Place it after `let cachedResponse = await...` to solve the problem of first assigning promise to the method instance in method.send, otherwise the promise will be undefined in clonedMethod.
        const clonedMethod = cloneMethod(methodInstance);
        // Call the hook function before sending the request
        // beforeRequest supports synchronous functions and asynchronous functions
        await beforeRequest(clonedMethod);
        const { baseURL, url: newUrl, type, data } = clonedMethod;
        const { params = {}, headers = {}, transform = shared.$self, shareRequest } = shared.getConfig(clonedMethod);
        const namespacedAdapterReturnMap = (adapterReturnMap[id] = adapterReturnMap[id] || {});
        const requestBody = clonedMethod.data;
        const requestBodyIsSpecial = shared.isSpecialRequestBody(requestBody);
        // Will not share the request when requestBody is special data
        let requestAdapterCtrls = requestBodyIsSpecial ? shared.undefinedValue : namespacedAdapterReturnMap[methodKey];
        let responseSuccessHandler = shared.$self;
        let responseErrorHandler = shared.undefinedValue;
        let responseCompleteHandler = shared.noop;
        // uniform handler of onSuccess, onError, onComplete
        if (shared.isFn(responded)) {
            responseSuccessHandler = responded;
        }
        else if (shared.isPlainObject(responded)) {
            const { onSuccess: successHandler, onError: errorHandler, onComplete: completeHandler } = responded;
            responseSuccessHandler = shared.isFn(successHandler) ? successHandler : responseSuccessHandler;
            responseErrorHandler = shared.isFn(errorHandler) ? errorHandler : responseErrorHandler;
            responseCompleteHandler = shared.isFn(completeHandler) ? completeHandler : responseCompleteHandler;
        }
        // If there is no cache, make a request
        if (cachedResponse !== shared.undefinedValue) {
            requestAdapterCtrlsPromiseResolveFn(); // Ctrls will not be passed in when cache is encountered
            // Print cache log
            clonedMethod.fromCache = shared.trueValue;
            shared.sloughFunction(cacheLogger, defaultCacheLogger)(cachedResponse, clonedMethod, cacheMode, tag);
            responseCompleteHandler(clonedMethod);
            return cachedResponse;
        }
        fromCache = shared.falseValue;
        if (!shareRequest || !requestAdapterCtrls) {
            // Request data
            const ctrls = requestAdapter({
                url: shared.buildCompletedURL(baseURL, newUrl, params),
                type,
                data,
                headers
            }, clonedMethod);
            requestAdapterCtrls = namespacedAdapterReturnMap[methodKey] = ctrls;
        }
        // Pass request adapter ctrls to promise for use in on download, on upload and abort
        requestAdapterCtrlsPromiseResolveFn(requestAdapterCtrls);
        /**
         * Process response tasks and do not cache data on failure
         * @param responsePromise Respond to promise instances
         * @param responseHeaders Request header
         * @param callInSuccess Whether to call in success callback
         * @returns Processed response
         */
        const handleResponseTask = async (handlerReturns, responseHeaders, callInSuccess = shared.trueValue) => {
            const responseData = await handlerReturns;
            const transformedData = await transform(responseData, responseHeaders || {});
            snapshots.save(methodInstance);
            // Even if the cache operation fails, the response structure will be returned normally to avoid request errors caused by cache operation problems.
            // The cache operation results can be obtained through `cacheAdapter.emitter.on('success' | 'fail', event => {})`
            try {
                // Automatic cache invalidation
                await hitCacheBySource(clonedMethod);
            }
            catch (_a) { }
            // Do not save cache when requestBody is special data
            // Reason 1: Special data is generally submitted and requires interaction with the server.
            // Reason 2: Special data is not convenient for generating cache keys
            const toCache = !requestBody || !requestBodyIsSpecial;
            // Use the latest expiration time after the response to cache data to avoid the problem of expiration time loss due to too long response time
            if (toCache && callInSuccess) {
                try {
                    await shared.PromiseCls.all([
                        setWithCacheAdapter(id, methodKey, transformedData, expireMilliseconds(shared.MEMORY), l1Cache, methodHitSource),
                        toStorage &&
                            setWithCacheAdapter(id, methodKey, transformedData, expireMilliseconds(shared.STORAGE_RESTORE), l2Cache, methodHitSource, tag)
                    ]);
                }
                catch (_b) { }
            }
            // Deep clone the transformed data before returning to avoid reference issues
            // the `deepClone` will only clone array and plain object
            return shared.deepClone(transformedData);
        };
        return shared.promiseFinally(shared.promiseThen(shared.PromiseCls.all([requestAdapterCtrls.response(), requestAdapterCtrls.headers()]), ([rawResponse, rawHeaders]) => {
            // Regardless of whether the request succeeds or fails, the shared request needs to be removed first
            shared.deleteAttr(namespacedAdapterReturnMap, methodKey);
            return handleResponseTask(responseSuccessHandler(rawResponse, clonedMethod), rawHeaders);
        }, (error) => {
            // Regardless of whether the request succeeds or fails, the shared request needs to be removed first
            shared.deleteAttr(namespacedAdapterReturnMap, methodKey);
            return shared.isFn(responseErrorHandler)
                ? // When responding to an error, if no error is thrown, the successful response process will be processed, but the data will not be cached.
                    handleResponseTask(responseErrorHandler(error, clonedMethod), shared.undefinedValue, shared.falseValue)
                : shared.promiseReject(error);
        }), () => {
            responseCompleteHandler(clonedMethod);
        });
    };
    return {
        // request interrupt function
        abort: () => {
            shared.promiseThen(requestAdapterCtrlsPromise, requestAdapterCtrls => requestAdapterCtrls && requestAdapterCtrls.abort());
        },
        onDownload: (handler) => {
            shared.promiseThen(requestAdapterCtrlsPromise, requestAdapterCtrls => requestAdapterCtrls && requestAdapterCtrls.onDownload && requestAdapterCtrls.onDownload(handler));
        },
        onUpload: (handler) => {
            shared.promiseThen(requestAdapterCtrlsPromise, requestAdapterCtrls => requestAdapterCtrls && requestAdapterCtrls.onUpload && requestAdapterCtrls.onUpload(handler));
        },
        response,
        fromCache: () => fromCache
    };
}

const offEventCallback = (offHandler, handlers) => () => {
    const index = handlers.indexOf(offHandler);
    index >= 0 && handlers.splice(index, 1);
};
class Method {
    constructor(type, context, url, config, data) {
        this.dhs = [];
        this.uhs = [];
        this.fromCache = shared.undefinedValue;
        const abortRequest = () => abortRequest.a();
        abortRequest.a = () => shared.promiseResolve();
        type = type.toUpperCase();
        const instance = this;
        const contextOptions = shared.getContextOptions(context);
        instance.abort = abortRequest;
        instance.baseURL = contextOptions.baseURL || '';
        instance.url = url;
        instance.type = type;
        instance.context = context;
        // Merge request-related global configuration into the method object
        const contextConcatConfig = {};
        const mergedLocalCacheKey = 'cacheFor';
        const globalLocalCache = shared.isPlainObject(contextOptions[mergedLocalCacheKey])
            ? contextOptions[mergedLocalCacheKey][type]
            : shared.undefinedValue;
        const hitSource = config && config.hitSource;
        // Merge parameters
        shared.forEach(['timeout', 'shareRequest'], mergedKey => {
            if (contextOptions[mergedKey] !== shared.undefinedValue) {
                contextConcatConfig[mergedKey] = contextOptions[mergedKey];
            }
        });
        // Merge local cache
        if (globalLocalCache !== shared.undefinedValue) {
            contextConcatConfig[mergedLocalCacheKey] = globalLocalCache;
        }
        // Unify hit sources into arrays and convert them into method keys when there are method instances
        if (hitSource) {
            instance.hitSource = shared.mapItem(shared.isArray(hitSource) ? hitSource : [hitSource], sourceItem => shared.instanceOf(sourceItem, Method) ? shared.getMethodInternalKey(sourceItem) : sourceItem);
            shared.deleteAttr(config, 'hitSource');
        }
        instance.config = {
            ...contextConcatConfig,
            headers: {},
            params: {},
            ...(config || {})
        };
        instance.data = data;
        instance.meta = config ? config.meta : instance.meta;
        // The original key needs to be used externally instead of generating the key in real time.
        // The reason is that the parameters of the method may pass in reference type values, but when the reference type value changes externally, the key generated in real time also changes, so it is more accurate to use the initial key.
        instance.key = instance.generateKey();
    }
    /**
     * Bind download progress callback function
     * @param progressHandler Download progress callback function
     * @version 2.17.0
     * @return unbind function
     */
    onDownload(downloadHandler) {
        shared.pushItem(this.dhs, downloadHandler);
        return offEventCallback(downloadHandler, this.dhs);
    }
    /**
     * Bind upload progress callback function
     * @param progressHandler Upload progress callback function
     * @version 2.17.0
     * @return unbind function
     */
    onUpload(uploadHandler) {
        shared.pushItem(this.uhs, uploadHandler);
        return offEventCallback(uploadHandler, this.uhs);
    }
    /**
     * Send a request through a method instance and return a promise object
     */
    send(forceRequest = shared.falseValue) {
        const instance = this;
        const { response, onDownload, onUpload, abort, fromCache } = sendRequest(instance, forceRequest);
        shared.len(instance.dhs) > 0 &&
            onDownload((loaded, total) => shared.forEach(instance.dhs, handler => handler({ loaded, total })));
        shared.len(instance.uhs) > 0 && onUpload((loaded, total) => shared.forEach(instance.uhs, handler => handler({ loaded, total })));
        // The interrupt function is bound to the method instance for each request. The user can also interrupt the current request through method instance.abort()
        const { promise: abortPromise, resolve: abortResolve } = shared.usePromise();
        instance.abort.a = () => {
            abort();
            return abortPromise;
        };
        instance.fromCache = shared.undefinedValue;
        instance.promise = response()
            .then(r => {
            instance.fromCache = fromCache();
            return r;
        })
            .finally(() => {
            // the reason of using setTimeout is to enable `method.catch` is called before `await method.abort()`.
            // so that can execute catch callback before aborting.
            shared.setTimeoutFn(abortResolve);
        });
        return instance.promise;
    }
    /**
     * Set the method name, if there is already a name it will be overwritten
     * @param name method name
     */
    setName(name) {
        shared.getConfig(this).name = name;
    }
    generateKey() {
        return shared.key(this);
    }
    /**
     * Bind callbacks for resolve and/or reject Promise
     * @param onfulfilled The callback to be executed when resolving the Promise
     * @param onrejected The callback to be executed when the Promise is rejected
     * @returns Returns a Promise for executing any callbacks
     */
    then(onfulfilled, onrejected) {
        return shared.promiseThen(this.send(), onfulfilled, onrejected);
    }
    /**
     * Bind a callback only for reject Promise
     * @param onrejected The callback to be executed when the Promise is rejected
     * @returns Returns a Promise that completes the callback
     */
    catch(onrejected) {
        return shared.promiseCatch(this.send(), onrejected);
    }
    /**
     * Bind a callback that is called when the Promise is resolved (resolve or reject)
     * @param onfinally Callback executed when Promise is resolved (resolve or reject).
     * @return Returns a Promise that completes the callback.
     */
    finally(onfinally) {
        return shared.promiseFinally(this.send(), onfinally);
    }
}

/**
 * Custom assertion function, throws an error when the expression is false
 * @param expression Judgment expression, true or false
 * @param msg assert message
 */
const myAssert = shared.createAssert();

// local storage will not fail the operation.
const EVENT_SUCCESS_KEY = 'success';
const memoryAdapter = () => {
    let l1Cache = {};
    const l1CacheEmitter = shared.createEventManager();
    const adapter = {
        set(key, value) {
            l1Cache[key] = value;
            l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: 'set', key, value, container: l1Cache });
        },
        get: key => {
            const value = l1Cache[key];
            l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: 'get', key, value, container: l1Cache });
            return value;
        },
        remove(key) {
            shared.deleteAttr(l1Cache, key);
            l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: 'remove', key, container: l1Cache });
        },
        clear: () => {
            l1Cache = {};
            l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: 'clear', key: '', container: l1Cache });
        },
        emitter: l1CacheEmitter
    };
    return adapter;
};
const localStorageAdapter = () => {
    const l2CacheEmitter = shared.createEventManager();
    const instance = localStorage;
    const adapter = {
        set: (key, value) => {
            instance.setItem(key, shared.JSONStringify(value));
            l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: 'set', key, value, container: instance });
        },
        get: key => {
            const data = instance.getItem(key);
            const value = data ? shared.JSONParse(data) : data;
            l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: 'get', key, value, container: instance });
            return value;
        },
        remove: key => {
            instance.removeItem(key);
            l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: 'remove', key, container: instance });
        },
        clear: () => {
            // Only remove alova cache keys
            for (let i = instance.length - 1; i >= 0; i -= 1) {
                const key = instance.key(i);
                if (key && shared.isAlovaCacheKey(key)) {
                    instance.removeItem(key);
                }
            }
            l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: 'clear', key: '', container: instance });
        },
        emitter: l2CacheEmitter
    };
    return adapter;
};
const placeholderAdapter = () => {
    const l2CacheNotDefinedAssert = () => {
        myAssert(shared.falseValue, 'l2Cache is not defined.');
    };
    return {
        set: () => {
            l2CacheNotDefinedAssert();
        },
        get: () => {
            l2CacheNotDefinedAssert();
            return shared.undefinedValue;
        },
        remove: () => {
            l2CacheNotDefinedAssert();
        },
        clear: () => { }
    };
};

const SetCls = Set;
class MethodSnapshotContainer {
    constructor(capacity) {
        /**
         * Method instance snapshot collection, method instances that have sent requests will be saved
         */
        this.records = {};
        this.occupy = 0;
        myAssert(capacity >= 0, 'expected snapshots limit to be >= 0');
        this.capacity = capacity;
    }
    /**
     * Save method instance snapshot
     * @param methodInstance method instance
     */
    save(methodInstance) {
        const { name } = shared.getConfig(methodInstance);
        const { records, occupy, capacity } = this;
        if (name && occupy < capacity) {
            // Using the name of the method as the key, save the method instance to the snapshot
            const targetSnapshots = (records[name] = records[name] || shared.newInstance(SetCls));
            targetSnapshots.add(methodInstance);
            // Statistical quantity
            this.occupy += 1;
        }
    }
    /**
     * Get a Method instance snapshot, which will filter out the corresponding Method instance based on the matcher
     * @param matcher Matching snapshot name, which can be a string or regular expression, or an object with a filter function
     * @returns Array of matched Method instance snapshots
     */
    match(matcher, matchAll = true) {
        // Unify the filter parameters into name matcher and match handler
        let nameString;
        let nameReg;
        let matchHandler;
        let nameMatcher = matcher;
        if (shared.isPlainObject(matcher)) {
            nameMatcher = matcher.name;
            matchHandler = matcher.filter;
        }
        if (shared.instanceOf(nameMatcher, shared.RegExpCls)) {
            nameReg = nameMatcher;
        }
        else if (shared.isString(nameMatcher)) {
            nameString = nameMatcher;
        }
        const { records } = this;
        // Get the corresponding method instance snapshot through the deconstructed name matcher and filter handler
        let matches = shared.newInstance((SetCls));
        // If the namespace parameter is provided, it will only be searched in this namespace, otherwise it will be searched in all cached data.
        if (nameString) {
            matches = records[nameString] || matches;
        }
        else if (nameReg) {
            shared.forEach(shared.filterItem(shared.objectKeys(records), methodName => nameReg.test(methodName)), methodName => {
                records[methodName].forEach(method => matches.add(method));
            });
        }
        const fromMatchesArray = shared.isFn(matchHandler) ? shared.filterItem([...matches], matchHandler) : [...matches];
        return (matchAll ? fromMatchesArray : fromMatchesArray[0]);
    }
}

const typeGet = 'GET';
const typeHead = 'HEAD';
const typePost = 'POST';
const typePut = 'PUT';
const typePatch = 'PATCH';
const typeDelete = 'DELETE';
const typeOptions = 'OPTIONS';
const defaultAlovaOptions = {
    /**
     * GET requests are cached for 5 minutes (300000 milliseconds) by default, and other requests are not cached by default.
     */
    cacheFor: {
        [typeGet]: 300000
    },
    /**
     * Share requests default to true
     */
    shareRequest: shared.trueValue,
    /**
     * Number of method snapshots, default is 1000
     */
    snapshots: 1000
};
let idCount = 0;
class Alova {
    constructor(options) {
        var _a, _b;
        const instance = this;
        instance.id = (options.id || (idCount += 1)).toString();
        // If storage is not specified, local storage is used by default.
        instance.l1Cache = options.l1Cache || memoryAdapter();
        instance.l2Cache =
            options.l2Cache || (typeof localStorage !== 'undefined' ? localStorageAdapter() : placeholderAdapter());
        // Merge default options
        instance.options = {
            ...defaultAlovaOptions,
            ...options
        };
        instance.snapshots = shared.newInstance((MethodSnapshotContainer), (_b = (_a = options.snapshots) !== null && _a !== void 0 ? _a : defaultAlovaOptions.snapshots) !== null && _b !== void 0 ? _b : 0);
    }
    Request(config) {
        return shared.newInstance((Method), config.method || typeGet, this, config.url, config, config.data);
    }
    Get(url, config) {
        return shared.newInstance((Method), typeGet, this, url, config);
    }
    Post(url, data, config) {
        return shared.newInstance((Method), typePost, this, url, config, data);
    }
    Delete(url, data, config) {
        return shared.newInstance((Method), typeDelete, this, url, config, data);
    }
    Put(url, data, config) {
        return shared.newInstance((Method), typePut, this, url, config, data);
    }
    Head(url, config) {
        return shared.newInstance((Method), typeHead, this, url, config);
    }
    Patch(url, data, config) {
        return shared.newInstance((Method), typePatch, this, url, config, data);
    }
    Options(url, config) {
        return shared.newInstance((Method), typeOptions, this, url, config);
    }
}
let boundStatesHook = shared.undefinedValue;
const usingL1CacheAdapters = [];
const usingL2CacheAdapters = [];
/**
 * create an alova instance.
 * @param options alova configuration.
 * @returns alova instance.
 */
const createAlova = (options) => {
    const alovaInstance = shared.newInstance((Alova), options);
    const newStatesHook = alovaInstance.options.statesHook;
    if (boundStatesHook && newStatesHook) {
        myAssert(boundStatesHook.name === newStatesHook.name, 'expected to use the same `statesHook`');
    }
    boundStatesHook = newStatesHook;
    const { l1Cache, l2Cache } = alovaInstance;
    !usingL1CacheAdapters.includes(l1Cache) && shared.pushItem(usingL1CacheAdapters, l1Cache);
    !usingL2CacheAdapters.includes(l2Cache) && shared.pushItem(usingL2CacheAdapters, l2Cache);
    return alovaInstance;
};

const promiseStatesHook = () => {
    myAssert(boundStatesHook, '`statesHook` is not set in alova instance');
    return boundStatesHook;
};

exports.Method = Method;
exports.createAlova = createAlova;
exports.globalConfig = globalConfig;
exports.hitCacheBySource = hitCacheBySource;
exports.invalidateCache = invalidateCache;
exports.promiseStatesHook = promiseStatesHook;
exports.queryCache = queryCache;
exports.setCache = setCache;
