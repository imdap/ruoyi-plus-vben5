/**
  * alova 3.5.1 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott Hu. All Rights Reserved
  * Licensed under MIT (https://github.com/alovajs/alova/blob/main/LICENSE)
*/

import { isSSR, STORAGE_RESTORE, len, getTime, buildNamespacedCacheKey, filterItem, undefinedValue, forEach, instanceOf, RegExpCls, pushItem, mapItem, objectKeys, PromiseCls, newInstance, deleteAttr, getContext, isString, objAssign, getMethodInternalKey, getLocalCacheConfigParam, isArray, isFn, MEMORY, promiseResolve, getConfig, promiseThen, trueValue, getOptions, isSpecialRequestBody, isPlainObject, sloughFunction, falseValue, buildCompletedURL, promiseFinally, promiseReject, noop, $self, deepClone, getContextOptions, usePromise, setTimeoutFn, key, promiseCatch, createAssert, createEventManager, JSONStringify, JSONParse, isAlovaCacheKey } from '@alova/shared';

let globalConfigMap = {
    autoHitCache: 'global',
    ssr: isSSR
};
/**
 * Set global configuration
 * @param config
 */
var globalConfig = (config) => {
    globalConfigMap = {
        ...globalConfigMap,
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
    const isRestoreMode = cacheMode === STORAGE_RESTORE;
    const hdStyle = '\x1B[42m%s\x1B[49m';
    const labelStyle = '\x1B[32m%s\x1B[39m';
    const startSep = ` [HitCache]${url} `;
    const endSepFn = () => Array(len(startSep) + 1).join('^');
    if (globalConfigMap.ssr) {
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
    if (expireTimestamp > getTime() && data) {
        const methodCacheKey = buildNamespacedCacheKey(namespace, key);
        await cacheAdapter.set(methodCacheKey, filterItem([data, expireTimestamp === Infinity ? undefinedValue : expireTimestamp, tag], Boolean));
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
            forEach(hitSource, sourceItem => {
                const isRegexp = instanceOf(sourceItem, RegExpCls);
                const targetHitSourceKey = isRegexp
                    ? sourceItem.source + (sourceItem.flags ? regexpSourceFlagSeparator + sourceItem.flags : '')
                    : sourceItem;
                if (targetHitSourceKey) {
                    if (isRegexp && !hitSourceKeys[targetHitSourceKey]) {
                        pushItem(hitSourceRegexpSources, targetHitSourceKey);
                    }
                    addItem(hitSourceKeys, isRegexp ? hitSourceRegexpCacheKey(targetHitSourceKey) : hitSourceStringCacheKey(targetHitSourceKey));
                }
            });
            // save the relationship. Minimize IO as much as possible
            const promises = mapItem(objectKeys(hitSourceKeys), async (hitSourceKey) => {
                // filter the empty strings.
                const targetMethodKeys = (await cacheAdapter.get(hitSourceKey)) || {};
                addItem(targetMethodKeys, methodCacheKey);
                await cacheAdapter.set(hitSourceKey, targetMethodKeys);
            });
            const saveRegexp = async () => {
                // save the regexp source if regexp exists.
                if (len(hitSourceRegexpSources)) {
                    const regexpList = (await cacheAdapter.get(unifiedHitSourceRegexpCacheKey)) || [];
                    // TODO: hitSourceRegexpSources needs to be deduplicated
                    pushItem(regexpList, ...hitSourceRegexpSources);
                    await cacheAdapter.set(unifiedHitSourceRegexpCacheKey, regexpList);
                }
            };
            // parallel executing all async tasks.
            await PromiseCls.all([...promises, saveRegexp()]);
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
    const methodStoreKey = buildNamespacedCacheKey(namespace, key);
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
    const storagedData = await cacheAdapter.get(buildNamespacedCacheKey(namespace, key));
    if (storagedData) {
        // Eslint disable next line
        const [dataUnused, expireTimestamp, storedTag] = storagedData;
        // If there is no expiration time, it means that the data will never expire. Otherwise, you need to determine whether it has expired.
        if (storedTag === tag && (!expireTimestamp || expireTimestamp > getTime())) {
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
    return rawData ? rawData[0] : undefinedValue;
};
/**
 * clear all cached data
 */
const clearWithCacheAdapter = async (cacheAdapters) => PromiseCls.all(cacheAdapters.map(cacheAdapter => cacheAdapter.clear()));
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
        if (unifiedHitSourceRegexpChannel && len(unifiedHitSourceRegexpChannel)) {
            forEach(unifiedHitSourceRegexpChannel, regexpStr => {
                const [source, flag] = regexpStr.split(regexpSourceFlagSeparator);
                if (newInstance(RegExpCls, source, flag).test(sourceNameStr)) {
                    pushItem(matchedRegexpStrings, regexpStr);
                }
            });
            // parallel get hit key by matched regexps.
            await PromiseCls.all(mapItem(matchedRegexpStrings, async (regexpString) => {
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
                    deleteAttr(targetKeys, targetKey);
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
    await PromiseCls.all(mapItem(objectKeys(sourceTargetKeyMap), async (sourceKey) => {
        const targetKeys = sourceTargetKeyMap[sourceKey];
        if (targetKeys) {
            const removingPromises = [];
            for (const key in targetKeys) {
                if (!accessedKeys[key]) {
                    addItem(accessedKeys, key);
                    pushItem(removingPromises, removeWithTargetKey(key));
                }
            }
            await PromiseCls.all(removingPromises);
        }
    }));
    // update source key if there is still has keys.
    // remove source key if its keys is empty.
    const unifiedHitSourceRegexpChannelLen = len(unifiedHitSourceRegexpChannel || []);
    await PromiseCls.all(mapItem(objectKeys(sourceTargetKeyMap), async (sourceKey) => {
        const targetKeys = sourceTargetKeyMap[sourceKey];
        if (targetKeys) {
            if (len(objectKeys(targetKeys))) {
                await cacheAdapter.set(sourceKey, targetKeys);
            }
            else {
                await cacheAdapter.remove(sourceKey);
                // if this is a regexped key, need to remove it from unified regexp channel.
                if (sourceKey.includes(hitSourceRegexpPrefix) && unifiedHitSourceRegexpChannel) {
                    unifiedHitSourceRegexpChannel = filterItem(unifiedHitSourceRegexpChannel, rawRegexpStr => hitSourceRegexpCacheKey(rawRegexpStr) !== sourceKey);
                }
            }
        }
    }));
    // update unified hit source regexp channel if its length was changed.
    if (unifiedHitSourceRegexpChannelLen !== len(unifiedHitSourceRegexpChannel || [])) {
        await cacheAdapter.set(unifiedHitSourceRegexpCacheKey, unifiedHitSourceRegexpChannel);
    }
};

var cloneMethod = (methodInstance) => {
    const { data, config } = methodInstance;
    const newConfig = { ...config };
    const { headers = {}, params = {} } = newConfig;
    const ctx = getContext(methodInstance);
    newConfig.headers = { ...headers };
    newConfig.params = isString(params) ? params : { ...params };
    const newMethod = newInstance((Method), methodInstance.type, ctx, methodInstance.url, newConfig, data);
    return objAssign(newMethod, {
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
        const { id, l1Cache, l2Cache } = getContext(matcher);
        const methodKey = getMethodInternalKey(matcher);
        const { f: cacheFor, c: controlled, s: store, e: expireMilliseconds, t: tag } = getLocalCacheConfigParam(matcher);
        // if it's controlled cache, it will return the result of cacheFor function.
        if (controlled) {
            return cacheFor();
        }
        let cachedData = policy !== CACHE_POLICY_L2 ? await getWithCacheAdapter(id, methodKey, l1Cache) : undefinedValue;
        if (policy === CACHE_POLICY_L2) {
            cachedData = await getWithCacheAdapter(id, methodKey, l2Cache, tag);
        }
        else if (policy === CACHE_POLICY_ALL && !cachedData) {
            if (store && expireMilliseconds(STORAGE_RESTORE) > getTime()) {
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
    const methodInstances = isArray(matcher) ? matcher : [matcher];
    const batchPromises = methodInstances.map(async (methodInstance) => {
        const { hitSource } = methodInstance;
        const { id, l1Cache, l2Cache } = getContext(methodInstance);
        const methodKey = getMethodInternalKey(methodInstance);
        const { e: expireMilliseconds, s: toStore, t: tag, c: controlled } = getLocalCacheConfigParam(methodInstance);
        // don't set cache when it's controlled cache.
        if (controlled) {
            return;
        }
        let data = dataOrUpdater;
        if (isFn(dataOrUpdater)) {
            let cachedData = policy !== CACHE_POLICY_L2 ? await getWithCacheAdapter(id, methodKey, l1Cache) : undefinedValue;
            if (policy === CACHE_POLICY_L2 ||
                (policy === CACHE_POLICY_ALL && !cachedData && toStore && expireMilliseconds(STORAGE_RESTORE) > getTime())) {
                cachedData = await getWithCacheAdapter(id, methodKey, l2Cache, tag);
            }
            data = dataOrUpdater(cachedData);
            if (data === undefinedValue) {
                return;
            }
        }
        return PromiseCls.all([
            policy !== CACHE_POLICY_L2 &&
                setWithCacheAdapter(id, methodKey, data, expireMilliseconds(MEMORY), l1Cache, hitSource),
            policy === CACHE_POLICY_L2 || (policy === CACHE_POLICY_ALL && toStore)
                ? setWithCacheAdapter(id, methodKey, data, expireMilliseconds(STORAGE_RESTORE), l2Cache, hitSource, tag)
                : undefinedValue
        ]);
    });
    return PromiseCls.all(batchPromises);
};
/**
 * invalid cache
 * @param matcher Method instance matcher
 */
const invalidateCache = async (matcher) => {
    if (!matcher) {
        await PromiseCls.all([clearWithCacheAdapter(usingL1CacheAdapters), clearWithCacheAdapter(usingL2CacheAdapters)]);
        return;
    }
    const methodInstances = isArray(matcher) ? matcher : [matcher];
    const batchPromises = methodInstances.map(methodInstance => {
        const { id, l1Cache, l2Cache } = getContext(methodInstance);
        const { c: controlled, m: cacheMode } = getLocalCacheConfigParam(methodInstance);
        // don't invalidate cache when it's controlled cache.
        if (controlled) {
            return;
        }
        const methodKey = getMethodInternalKey(methodInstance);
        return PromiseCls.all([
            removeWithCacheAdapter(id, methodKey, l1Cache),
            cacheMode === STORAGE_RESTORE ? removeWithCacheAdapter(id, methodKey, l2Cache) : promiseResolve()
        ]);
    });
    await PromiseCls.all(batchPromises);
};
/**
 * hit(invalidate) target caches by source method
 * this is the implementation of auto invalidate cache
 * @param sourceMethod source method instance
 */
const hitCacheBySource = async (sourceMethod) => {
    // Find the hit target cache and invalidate its cache
    // Control the automatic cache invalidation range through global configuration `autoHitCache`
    const { autoHitCache } = globalConfigMap;
    const { l1Cache, l2Cache } = getContext(sourceMethod);
    const sourceKey = getMethodInternalKey(sourceMethod);
    const { name: sourceName } = getConfig(sourceMethod);
    const cacheAdaptersInvolved = {
        global: [...usingL1CacheAdapters, ...usingL2CacheAdapters],
        self: [l1Cache, l2Cache],
        close: []
    }[autoHitCache];
    if (cacheAdaptersInvolved && len(cacheAdaptersInvolved)) {
        await PromiseCls.all(mapItem(cacheAdaptersInvolved, involvedCacheAdapter => hitTargetCacheWithCacheAdapter(sourceKey, sourceName, involvedCacheAdapter)));
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
    let fromCache = trueValue;
    let requestAdapterCtrlsPromiseResolveFn;
    const requestAdapterCtrlsPromise = newInstance(PromiseCls, resolve => {
        requestAdapterCtrlsPromiseResolveFn = resolve;
    });
    const response = async () => {
        const { beforeRequest = noop, responded, requestAdapter, cacheLogger } = getOptions(methodInstance);
        const methodKey = getMethodInternalKey(methodInstance);
        const { s: toStorage, t: tag, m: cacheMode, e: expireMilliseconds } = getLocalCacheConfigParam(methodInstance);
        const { id, l1Cache, l2Cache, snapshots } = getContext(methodInstance);
        // Get controlled cache or uncontrolled cache
        const { cacheFor } = getConfig(methodInstance);
        const { hitSource: methodHitSource } = methodInstance;
        // If the current method sets a controlled cache, check whether there is custom data
        let cachedResponse = await (isFn(cacheFor)
            ? cacheFor()
            : // If it is a forced request, skip the step of getting it from the cache
                // Otherwise, determine whether to use cached data
                forceRequest
                    ? undefinedValue
                    : getWithCacheAdapter(id, methodKey, l1Cache));
        // If it is storage restore mode and there is no data in the cache, the persistent data needs to be restored to the cache, and the cached expiration time must be used.
        if (cacheMode === STORAGE_RESTORE && !cachedResponse && !forceRequest) {
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
        const { params = {}, headers = {}, transform = $self, shareRequest } = getConfig(clonedMethod);
        const namespacedAdapterReturnMap = (adapterReturnMap[id] = adapterReturnMap[id] || {});
        const requestBody = clonedMethod.data;
        const requestBodyIsSpecial = isSpecialRequestBody(requestBody);
        // Will not share the request when requestBody is special data
        let requestAdapterCtrls = requestBodyIsSpecial ? undefinedValue : namespacedAdapterReturnMap[methodKey];
        let responseSuccessHandler = $self;
        let responseErrorHandler = undefinedValue;
        let responseCompleteHandler = noop;
        // uniform handler of onSuccess, onError, onComplete
        if (isFn(responded)) {
            responseSuccessHandler = responded;
        }
        else if (isPlainObject(responded)) {
            const { onSuccess: successHandler, onError: errorHandler, onComplete: completeHandler } = responded;
            responseSuccessHandler = isFn(successHandler) ? successHandler : responseSuccessHandler;
            responseErrorHandler = isFn(errorHandler) ? errorHandler : responseErrorHandler;
            responseCompleteHandler = isFn(completeHandler) ? completeHandler : responseCompleteHandler;
        }
        // If there is no cache, make a request
        if (cachedResponse !== undefinedValue) {
            requestAdapterCtrlsPromiseResolveFn(); // Ctrls will not be passed in when cache is encountered
            // Print cache log
            clonedMethod.fromCache = trueValue;
            sloughFunction(cacheLogger, defaultCacheLogger)(cachedResponse, clonedMethod, cacheMode, tag);
            responseCompleteHandler(clonedMethod);
            return cachedResponse;
        }
        fromCache = falseValue;
        if (!shareRequest || !requestAdapterCtrls) {
            // Request data
            const ctrls = requestAdapter({
                url: buildCompletedURL(baseURL, newUrl, params),
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
        const handleResponseTask = async (handlerReturns, responseHeaders, callInSuccess = trueValue) => {
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
                    await PromiseCls.all([
                        setWithCacheAdapter(id, methodKey, transformedData, expireMilliseconds(MEMORY), l1Cache, methodHitSource),
                        toStorage &&
                            setWithCacheAdapter(id, methodKey, transformedData, expireMilliseconds(STORAGE_RESTORE), l2Cache, methodHitSource, tag)
                    ]);
                }
                catch (_b) { }
            }
            // Deep clone the transformed data before returning to avoid reference issues
            // the `deepClone` will only clone array and plain object
            return deepClone(transformedData);
        };
        return promiseFinally(promiseThen(PromiseCls.all([requestAdapterCtrls.response(), requestAdapterCtrls.headers()]), ([rawResponse, rawHeaders]) => {
            // Regardless of whether the request succeeds or fails, the shared request needs to be removed first
            deleteAttr(namespacedAdapterReturnMap, methodKey);
            return handleResponseTask(responseSuccessHandler(rawResponse, clonedMethod), rawHeaders);
        }, (error) => {
            // Regardless of whether the request succeeds or fails, the shared request needs to be removed first
            deleteAttr(namespacedAdapterReturnMap, methodKey);
            return isFn(responseErrorHandler)
                ? // When responding to an error, if no error is thrown, the successful response process will be processed, but the data will not be cached.
                    handleResponseTask(responseErrorHandler(error, clonedMethod), undefinedValue, falseValue)
                : promiseReject(error);
        }), () => {
            responseCompleteHandler(clonedMethod);
        });
    };
    return {
        // request interrupt function
        abort: () => {
            promiseThen(requestAdapterCtrlsPromise, requestAdapterCtrls => requestAdapterCtrls && requestAdapterCtrls.abort());
        },
        onDownload: (handler) => {
            promiseThen(requestAdapterCtrlsPromise, requestAdapterCtrls => requestAdapterCtrls && requestAdapterCtrls.onDownload && requestAdapterCtrls.onDownload(handler));
        },
        onUpload: (handler) => {
            promiseThen(requestAdapterCtrlsPromise, requestAdapterCtrls => requestAdapterCtrls && requestAdapterCtrls.onUpload && requestAdapterCtrls.onUpload(handler));
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
        this.fromCache = undefinedValue;
        const abortRequest = () => abortRequest.a();
        abortRequest.a = () => promiseResolve();
        type = type.toUpperCase();
        const instance = this;
        const contextOptions = getContextOptions(context);
        instance.abort = abortRequest;
        instance.baseURL = contextOptions.baseURL || '';
        instance.url = url;
        instance.type = type;
        instance.context = context;
        // Merge request-related global configuration into the method object
        const contextConcatConfig = {};
        const mergedLocalCacheKey = 'cacheFor';
        const globalLocalCache = isPlainObject(contextOptions[mergedLocalCacheKey])
            ? contextOptions[mergedLocalCacheKey][type]
            : undefinedValue;
        const hitSource = config && config.hitSource;
        // Merge parameters
        forEach(['timeout', 'shareRequest'], mergedKey => {
            if (contextOptions[mergedKey] !== undefinedValue) {
                contextConcatConfig[mergedKey] = contextOptions[mergedKey];
            }
        });
        // Merge local cache
        if (globalLocalCache !== undefinedValue) {
            contextConcatConfig[mergedLocalCacheKey] = globalLocalCache;
        }
        // Unify hit sources into arrays and convert them into method keys when there are method instances
        if (hitSource) {
            instance.hitSource = mapItem(isArray(hitSource) ? hitSource : [hitSource], sourceItem => instanceOf(sourceItem, Method) ? getMethodInternalKey(sourceItem) : sourceItem);
            deleteAttr(config, 'hitSource');
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
        pushItem(this.dhs, downloadHandler);
        return offEventCallback(downloadHandler, this.dhs);
    }
    /**
     * Bind upload progress callback function
     * @param progressHandler Upload progress callback function
     * @version 2.17.0
     * @return unbind function
     */
    onUpload(uploadHandler) {
        pushItem(this.uhs, uploadHandler);
        return offEventCallback(uploadHandler, this.uhs);
    }
    /**
     * Send a request through a method instance and return a promise object
     */
    send(forceRequest = falseValue) {
        const instance = this;
        const { response, onDownload, onUpload, abort, fromCache } = sendRequest(instance, forceRequest);
        len(instance.dhs) > 0 &&
            onDownload((loaded, total) => forEach(instance.dhs, handler => handler({ loaded, total })));
        len(instance.uhs) > 0 && onUpload((loaded, total) => forEach(instance.uhs, handler => handler({ loaded, total })));
        // The interrupt function is bound to the method instance for each request. The user can also interrupt the current request through method instance.abort()
        const { promise: abortPromise, resolve: abortResolve } = usePromise();
        instance.abort.a = () => {
            abort();
            return abortPromise;
        };
        instance.fromCache = undefinedValue;
        instance.promise = response()
            .then(r => {
            instance.fromCache = fromCache();
            return r;
        })
            .finally(() => {
            // the reason of using setTimeout is to enable `method.catch` is called before `await method.abort()`.
            // so that can execute catch callback before aborting.
            setTimeoutFn(abortResolve);
        });
        return instance.promise;
    }
    /**
     * Set the method name, if there is already a name it will be overwritten
     * @param name method name
     */
    setName(name) {
        getConfig(this).name = name;
    }
    generateKey() {
        return key(this);
    }
    /**
     * Bind callbacks for resolve and/or reject Promise
     * @param onfulfilled The callback to be executed when resolving the Promise
     * @param onrejected The callback to be executed when the Promise is rejected
     * @returns Returns a Promise for executing any callbacks
     */
    then(onfulfilled, onrejected) {
        return promiseThen(this.send(), onfulfilled, onrejected);
    }
    /**
     * Bind a callback only for reject Promise
     * @param onrejected The callback to be executed when the Promise is rejected
     * @returns Returns a Promise that completes the callback
     */
    catch(onrejected) {
        return promiseCatch(this.send(), onrejected);
    }
    /**
     * Bind a callback that is called when the Promise is resolved (resolve or reject)
     * @param onfinally Callback executed when Promise is resolved (resolve or reject).
     * @return Returns a Promise that completes the callback.
     */
    finally(onfinally) {
        return promiseFinally(this.send(), onfinally);
    }
}

/**
 * Custom assertion function, throws an error when the expression is false
 * @param expression Judgment expression, true or false
 * @param msg assert message
 */
const myAssert = createAssert();

// local storage will not fail the operation.
const EVENT_SUCCESS_KEY = 'success';
const memoryAdapter = () => {
    let l1Cache = {};
    const l1CacheEmitter = createEventManager();
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
            deleteAttr(l1Cache, key);
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
    const l2CacheEmitter = createEventManager();
    const instance = localStorage;
    const adapter = {
        set: (key, value) => {
            instance.setItem(key, JSONStringify(value));
            l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: 'set', key, value, container: instance });
        },
        get: key => {
            const data = instance.getItem(key);
            const value = data ? JSONParse(data) : data;
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
                if (key && isAlovaCacheKey(key)) {
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
        myAssert(falseValue, 'l2Cache is not defined.');
    };
    return {
        set: () => {
            l2CacheNotDefinedAssert();
        },
        get: () => {
            l2CacheNotDefinedAssert();
            return undefinedValue;
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
        const { name } = getConfig(methodInstance);
        const { records, occupy, capacity } = this;
        if (name && occupy < capacity) {
            // Using the name of the method as the key, save the method instance to the snapshot
            const targetSnapshots = (records[name] = records[name] || newInstance(SetCls));
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
        if (isPlainObject(matcher)) {
            nameMatcher = matcher.name;
            matchHandler = matcher.filter;
        }
        if (instanceOf(nameMatcher, RegExpCls)) {
            nameReg = nameMatcher;
        }
        else if (isString(nameMatcher)) {
            nameString = nameMatcher;
        }
        const { records } = this;
        // Get the corresponding method instance snapshot through the deconstructed name matcher and filter handler
        let matches = newInstance((SetCls));
        // If the namespace parameter is provided, it will only be searched in this namespace, otherwise it will be searched in all cached data.
        if (nameString) {
            matches = records[nameString] || matches;
        }
        else if (nameReg) {
            forEach(filterItem(objectKeys(records), methodName => nameReg.test(methodName)), methodName => {
                records[methodName].forEach(method => matches.add(method));
            });
        }
        const fromMatchesArray = isFn(matchHandler) ? filterItem([...matches], matchHandler) : [...matches];
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
    shareRequest: trueValue,
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
        instance.snapshots = newInstance((MethodSnapshotContainer), (_b = (_a = options.snapshots) !== null && _a !== void 0 ? _a : defaultAlovaOptions.snapshots) !== null && _b !== void 0 ? _b : 0);
    }
    Request(config) {
        return newInstance((Method), config.method || typeGet, this, config.url, config, config.data);
    }
    Get(url, config) {
        return newInstance((Method), typeGet, this, url, config);
    }
    Post(url, data, config) {
        return newInstance((Method), typePost, this, url, config, data);
    }
    Delete(url, data, config) {
        return newInstance((Method), typeDelete, this, url, config, data);
    }
    Put(url, data, config) {
        return newInstance((Method), typePut, this, url, config, data);
    }
    Head(url, config) {
        return newInstance((Method), typeHead, this, url, config);
    }
    Patch(url, data, config) {
        return newInstance((Method), typePatch, this, url, config, data);
    }
    Options(url, config) {
        return newInstance((Method), typeOptions, this, url, config);
    }
}
let boundStatesHook = undefinedValue;
const usingL1CacheAdapters = [];
const usingL2CacheAdapters = [];
/**
 * create an alova instance.
 * @param options alova configuration.
 * @returns alova instance.
 */
const createAlova = (options) => {
    const alovaInstance = newInstance((Alova), options);
    const newStatesHook = alovaInstance.options.statesHook;
    if (boundStatesHook && newStatesHook) {
        myAssert(boundStatesHook.name === newStatesHook.name, 'expected to use the same `statesHook`');
    }
    boundStatesHook = newStatesHook;
    const { l1Cache, l2Cache } = alovaInstance;
    !usingL1CacheAdapters.includes(l1Cache) && pushItem(usingL1CacheAdapters, l1Cache);
    !usingL2CacheAdapters.includes(l2Cache) && pushItem(usingL2CacheAdapters, l2Cache);
    return alovaInstance;
};

const promiseStatesHook = () => {
    myAssert(boundStatesHook, '`statesHook` is not set in alova instance');
    return boundStatesHook;
};

export { Method, createAlova, globalConfig, globalConfigMap, hitCacheBySource, invalidateCache, promiseStatesHook, queryCache, setCache };
