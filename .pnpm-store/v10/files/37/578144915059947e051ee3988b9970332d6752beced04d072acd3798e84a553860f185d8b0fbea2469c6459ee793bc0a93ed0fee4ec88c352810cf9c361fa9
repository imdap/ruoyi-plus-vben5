/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

'use strict';

var shared = require('@alova/shared');
var alova = require('alova');

const defaultVisitorMeta = {
    authRole: null
};
const defaultLoginMeta = {
    authRole: 'login'
};
const defaultLogoutMeta = {
    authRole: 'logout'
};
const defaultRefreshTokenMeta = {
    authRole: 'refreshToken'
};
const checkMethodRole = ({ meta }, metaMatches) => {
    if (shared.isPlainObject(meta)) {
        for (const key in meta) {
            if (Object.prototype.hasOwnProperty.call(meta, key)) {
                const matchedMetaItem = metaMatches[key];
                if (shared.instanceOf(matchedMetaItem, RegExp) ? matchedMetaItem.test(meta[key]) : meta[key] === matchedMetaItem) {
                    return shared.trueValue;
                }
            }
        }
    }
    return shared.falseValue;
};
const waitForTokenRefreshed = (method, waitingList) => shared.newInstance(shared.PromiseCls, resolve => {
    shared.pushItem(waitingList, {
        method,
        resolve
    });
});
const callHandlerIfMatchesMeta = (method, authorizationInterceptor, defaultMeta, response) => {
    if (checkMethodRole(method, (authorizationInterceptor === null || authorizationInterceptor === void 0 ? void 0 : authorizationInterceptor.metaMatches) || defaultMeta)) {
        const handler = shared.isFn(authorizationInterceptor)
            ? authorizationInterceptor
            : shared.isPlainObject(authorizationInterceptor) && shared.isFn(authorizationInterceptor.handler)
                ? authorizationInterceptor.handler
                : shared.noop;
        return handler(response, method);
    }
};
const refreshTokenIfExpired = async (method, waitingList, updateRefreshStatus, handlerParams, refreshToken, tokenRefreshing) => {
    // When the number of handle params is greater than 2, it means that this function is called from the response, and the original interface needs to be requested again.
    const fromResponse = shared.len(handlerParams) >= 2;
    let isExpired = refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.isExpired(...handlerParams);
    // Compatible with synchronous and asynchronous functions
    if (shared.instanceOf(isExpired, shared.PromiseCls)) {
        isExpired = await isExpired;
    }
    if (isExpired) {
        try {
            // Make another judgment in the response to prevent multiple requests to refresh the token, intercept and wait for the token sent before the token refresh is completed.
            let intentToRefreshToken = shared.trueValue;
            if (fromResponse && tokenRefreshing) {
                intentToRefreshToken = shared.falseValue; // The requests waiting here indicate that the token is being refreshed. When they pass, there is no need to refresh the token again.
                await waitForTokenRefreshed(method, waitingList);
            }
            if (intentToRefreshToken) {
                updateRefreshStatus(shared.trueValue);
                // Call refresh token
                await (refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.handler(...handlerParams));
                updateRefreshStatus(shared.falseValue);
                // After the token refresh is completed, the requests in the waiting list are notified.
                shared.forEach(waitingList, ({ resolve }) => resolve());
            }
            if (fromResponse) {
                // Because the original interface is being requested again, superposition with the previous request will result in repeated calls to transform, so it is necessary to leave transform empty to remove one call.
                const { config } = method;
                const methodTransformData = config.transform;
                config.transform = shared.undefinedValue;
                const resentData = await method;
                config.transform = methodTransformData;
                return resentData;
            }
        }
        finally {
            updateRefreshStatus(shared.falseValue);
            shared.splice(waitingList, 0, shared.len(waitingList)); // Clear waiting list
        }
    }
};
const onResponded2Record = (onRespondedHandlers) => {
    let successHandler = shared.undefinedValue;
    let errorHandler = shared.undefinedValue;
    let onCompleteHandler = shared.undefinedValue;
    if (shared.isFn(onRespondedHandlers)) {
        successHandler = onRespondedHandlers;
    }
    else if (shared.isPlainObject(onRespondedHandlers)) {
        const { onSuccess, onError, onComplete } = onRespondedHandlers;
        successHandler = shared.isFn(onSuccess) ? onSuccess : successHandler;
        errorHandler = shared.isFn(onError) ? onError : errorHandler;
        onCompleteHandler = shared.isFn(onComplete) ? onComplete : onCompleteHandler;
    }
    return {
        onSuccess: successHandler,
        onError: errorHandler,
        onComplete: onCompleteHandler
    };
};

/**
 * Create a client-side token authentication interceptor
 * @param options Configuration parameters
 * @returns token authentication interceptor function
 */
const createClientTokenAuthentication = ({ visitorMeta, login, logout, refreshToken, assignToken = shared.noop }) => {
    let tokenRefreshing = shared.falseValue;
    const waitingList = [];
    const onAuthRequired = onBeforeRequest => async (method) => {
        const isVisitorRole = checkMethodRole(method, visitorMeta || defaultVisitorMeta);
        const isLoginRole = checkMethodRole(method, (login === null || login === void 0 ? void 0 : login.metaMatches) || defaultLoginMeta);
        // Ignored, login, and token refresh requests do not perform token authentication.
        if (!isVisitorRole &&
            !isLoginRole &&
            !checkMethodRole(method, (refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.metaMatches) || defaultRefreshTokenMeta)) {
            // If the token is being refreshed, wait for the refresh to complete before sending a request.
            if (tokenRefreshing) {
                await waitForTokenRefreshed(method, waitingList);
            }
            await refreshTokenIfExpired(method, waitingList, refreshing => {
                tokenRefreshing = refreshing;
            }, [method], refreshToken);
        }
        // Requests from non-guest and logged-in roles will enter the assignment token function
        if (!isVisitorRole && !isLoginRole) {
            await assignToken(method);
        }
        return onBeforeRequest === null || onBeforeRequest === void 0 ? void 0 : onBeforeRequest(method);
    };
    const onResponseRefreshToken = originalResponded => {
        const respondedRecord = onResponded2Record(originalResponded);
        return {
            ...respondedRecord,
            onSuccess: async (response, method) => {
                await callHandlerIfMatchesMeta(method, login, defaultLoginMeta, response);
                await callHandlerIfMatchesMeta(method, logout, defaultLogoutMeta, response);
                return (respondedRecord.onSuccess || shared.$self)(response, method);
            }
        };
    };
    return {
        waitingList,
        onAuthRequired,
        onResponseRefreshToken
    };
};
/**
 * Create a server-side token authentication interceptor
 * @param options Configuration parameters
 * @returns token authentication interceptor function
 */
const createServerTokenAuthentication = ({ visitorMeta, login, logout, refreshTokenOnSuccess, refreshTokenOnError, assignToken = shared.noop }) => {
    let tokenRefreshing = shared.falseValue;
    const waitingList = [];
    const onAuthRequired = onBeforeRequest => async (method) => {
        const isVisitorRole = checkMethodRole(method, visitorMeta || defaultVisitorMeta);
        const isLoginRole = checkMethodRole(method, (login === null || login === void 0 ? void 0 : login.metaMatches) || defaultLoginMeta);
        // Ignored, login, and token refresh requests do not perform token authentication.
        if (!isVisitorRole &&
            !isLoginRole &&
            !checkMethodRole(method, (refreshTokenOnSuccess === null || refreshTokenOnSuccess === void 0 ? void 0 : refreshTokenOnSuccess.metaMatches) || defaultRefreshTokenMeta) &&
            !checkMethodRole(method, (refreshTokenOnError === null || refreshTokenOnError === void 0 ? void 0 : refreshTokenOnError.metaMatches) || defaultRefreshTokenMeta)) {
            // If the token is being refreshed, wait for the refresh to complete before sending a request.
            if (tokenRefreshing) {
                await waitForTokenRefreshed(method, waitingList);
            }
        }
        if (!isVisitorRole && !isLoginRole) {
            await assignToken(method);
        }
        return onBeforeRequest === null || onBeforeRequest === void 0 ? void 0 : onBeforeRequest(method);
    };
    const onResponseRefreshToken = onRespondedHandlers => {
        const respondedRecord = onResponded2Record(onRespondedHandlers);
        return {
            ...respondedRecord,
            onSuccess: async (response, method) => {
                if (!checkMethodRole(method, visitorMeta || defaultVisitorMeta) &&
                    !checkMethodRole(method, (login === null || login === void 0 ? void 0 : login.metaMatches) || defaultLoginMeta) &&
                    !checkMethodRole(method, (refreshTokenOnSuccess === null || refreshTokenOnSuccess === void 0 ? void 0 : refreshTokenOnSuccess.metaMatches) || defaultRefreshTokenMeta)) {
                    const dataResent = await refreshTokenIfExpired(method, waitingList, refreshing => {
                        tokenRefreshing = refreshing;
                    }, [response, method], refreshTokenOnSuccess, tokenRefreshing);
                    if (dataResent) {
                        return dataResent;
                    }
                }
                await callHandlerIfMatchesMeta(method, login, defaultLoginMeta, response);
                await callHandlerIfMatchesMeta(method, logout, defaultLogoutMeta, response);
                return (respondedRecord.onSuccess || shared.$self)(response, method);
            },
            onError: async (error, method) => {
                if (!checkMethodRole(method, visitorMeta || defaultVisitorMeta) &&
                    !checkMethodRole(method, (login === null || login === void 0 ? void 0 : login.metaMatches) || defaultLoginMeta) &&
                    !checkMethodRole(method, (refreshTokenOnError === null || refreshTokenOnError === void 0 ? void 0 : refreshTokenOnError.metaMatches) || defaultRefreshTokenMeta)) {
                    const dataResent = await refreshTokenIfExpired(method, waitingList, refreshing => {
                        tokenRefreshing = refreshing;
                    }, [error, method], refreshTokenOnError, tokenRefreshing);
                    if (dataResent) {
                        return dataResent;
                    }
                }
                return (respondedRecord.onError || shared.noop)(error, method);
            }
        };
    };
    return {
        waitingList,
        onAuthRequired,
        onResponseRefreshToken
    };
};

/**
 * Compatible functions, throwing parameters
 * @param error mistake
 */
const throwFn = (error) => {
    throw error;
};
function useCallback(onCallbackChange = shared.noop) {
    let callbacks = [];
    const setCallback = (fn) => {
        if (!callbacks.includes(fn)) {
            callbacks.push(fn);
            onCallbackChange(callbacks);
        }
        // Return unregister function
        return () => {
            callbacks = shared.filterItem(callbacks, e => e !== fn);
            onCallbackChange(callbacks);
        };
    };
    const triggerCallback = (...args) => {
        if (callbacks.length > 0) {
            return shared.forEach(callbacks, fn => fn(...args));
        }
    };
    const removeAllCallback = () => {
        callbacks = [];
        onCallbackChange(callbacks);
    };
    return [setCallback, triggerCallback, removeAllCallback];
}
/**
 * Create a debounce function and trigger the function immediately when delay is 0
 * Scenario: When calling useWatcher and setting immediate to true, the first call must be executed immediately, otherwise it will cause a delayed call
 * @param {GeneralFn} fn callback function
 * @param {number|(...args: any[]) => number} delay Delay description, dynamic delay can be achieved when set as a function
 * @returns Delayed callback function
 */
const debounce = (fn, delay) => {
    let timer = shared.nullValue;
    return function debounceFn(...args) {
        const bindFn = fn.bind(this, ...args);
        const delayMill = shared.isNumber(delay) ? delay : delay(...args);
        timer && shared.clearTimeoutTimer(timer);
        if (delayMill > 0) {
            timer = shared.setTimeoutFn(bindFn, delayMill);
        }
        else {
            bindFn();
        }
    };
};
/**
 * Get the request method object
 * @param methodHandler Request method handle
 * @param args Method call parameters
 * @returns request method object
 */
const getHandlerMethod = (methodHandler, args = []) => {
    const methodInstance = shared.isFn(methodHandler) ? methodHandler(...args) : methodHandler;
    const assert = shared.createAssert('scene');
    assert(shared.instanceOf(methodInstance, alova.Method), 'hook handler must be a method instance or a function that returns method instance');
    return methodInstance;
};
/**
 * Convert each value of the object and return the new object
 * @param obj object
 * @param callback callback function
 * @returns converted object
 */
const mapObject = (obj, callback) => {
    const ret = {};
    for (const key in obj) {
        ret[key] = callback(obj[key], key, obj);
    }
    return ret;
};
var EnumHookType;
(function (EnumHookType) {
    EnumHookType[EnumHookType["USE_REQUEST"] = 1] = "USE_REQUEST";
    EnumHookType[EnumHookType["USE_WATCHER"] = 2] = "USE_WATCHER";
    EnumHookType[EnumHookType["USE_FETCHER"] = 3] = "USE_FETCHER";
})(EnumHookType || (EnumHookType = {}));
/**
 * create simple and unified, framework-independent states creators and handlers.
 * @param statesHook states hook from `promiseStatesHook` function of alova
 * @param referingObject refering object exported from `promiseStatesHook` function
 * @returns simple and unified states creators and handlers
 */
function statesHookHelper(statesHook, referingObject = {
    trackedKeys: {},
    bindError: shared.falseValue,
    initialRequest: shared.falseValue,
    ...shared.injectReferingObject()
}) {
    const ref = (initialValue) => (statesHook.ref ? statesHook.ref(initialValue) : { current: initialValue });
    referingObject = ref(referingObject).current;
    const exportState = (state) => (statesHook.export || shared.$self)(state, referingObject);
    const memorize = (fn) => {
        if (!shared.isFn(statesHook.memorize)) {
            return fn;
        }
        const memorizedFn = statesHook.memorize(fn);
        memorizedFn.memorized = shared.trueValue;
        return memorizedFn;
    };
    const { dehydrate } = statesHook;
    // For performance reasons, only value is different, and the key is tracked can be updated.
    const update = (newValue, state, key) => newValue !== dehydrate(state, key, referingObject) &&
        referingObject.trackedKeys[key] &&
        statesHook.update(newValue, state, key, referingObject);
    const mapDeps = (deps) => shared.mapItem(deps, item => (shared.instanceOf(item, shared.FrameworkReadableState) ? item.e : item));
    const createdStateList = [];
    // key of deps on computed
    const depKeys = {};
    return {
        create: (initialValue, key) => {
            shared.pushItem(createdStateList, key); // record the keys of created states.
            return shared.newInstance((shared.FrameworkState), statesHook.create(initialValue, key, referingObject), key, state => dehydrate(state, key, referingObject), exportState, (state, newValue) => update(newValue, state, key));
        },
        computed: (getter, depList, key) => {
            // Collect all dependencies in computed
            shared.forEach(depList, dep => {
                if (dep.k) {
                    depKeys[dep.k] = shared.trueValue;
                }
            });
            return shared.newInstance((shared.FrameworkReadableState), statesHook.computed(getter, mapDeps(depList), key, referingObject), key, state => dehydrate(state, key, referingObject), exportState);
        },
        effectRequest: (effectRequestParams) => statesHook.effectRequest(effectRequestParams, referingObject),
        ref,
        watch: (source, callback) => statesHook.watch(mapDeps(source), callback, referingObject),
        onMounted: (callback) => statesHook.onMounted(callback, referingObject),
        onUnmounted: (callback) => statesHook.onUnmounted(callback, referingObject),
        memorize,
        /**
         * refering object that sharing some value with this object.
         */
        __referingObj: referingObject,
        /**
         * expose provider for specified use hook.
         * @param object object that contains state proxy, framework state, operating function and event binder.
         * @returns provider component.
         */
        exposeProvider: (object) => {
            const provider = {};
            const originalStatesMap = {};
            const stateKeys = [];
            for (const key in object) {
                const value = object[key];
                const isValueFunction = shared.isFn(value);
                // if it's a memorized function, don't memorize it any more, add it to provider directly.
                // if it's start with `on`, that indicates it is an event binder, we should define a new function which return provider object.
                // if it's a common function, add it to provider with memorize mode.
                // Note that: in some situation, state is a function such as solid's signal, and state value is set to function in react,  the state will be detected as a function. so we should check whether the key is in `trackedKeys`
                if (isValueFunction && !referingObject.trackedKeys[key]) {
                    provider[key] = key.startsWith('on')
                        ? (...args) => {
                            value(...args);
                            // eslint-disable-next-line
                            return completedProvider;
                        }
                        : value.memorized
                            ? value
                            : memorize(value);
                }
                else {
                    // collect states of current exposures, and open tracked for these ststes
                    if (!shared.includes(['uploading', 'downloading'], key) && !key.startsWith('__')) {
                        shared.pushItem(stateKeys, key);
                    }
                    const isFrameworkState = shared.instanceOf(value, shared.FrameworkReadableState);
                    if (isFrameworkState) {
                        originalStatesMap[key] = value.s;
                    }
                    // otherwise, it's a state proxy or framework state, add it to provider with getter mode.
                    shared.ObjectCls.defineProperty(provider, key, {
                        get: () => {
                            // record the key that is being tracked.
                            referingObject.trackedKeys[key] = shared.trueValue;
                            return isFrameworkState ? value.e : value;
                        },
                        // set need to set an function,
                        // otherwise it will throw `TypeError: Cannot set property __referingObj of #<Object> which has only a getter` when setting value
                        set: shared.noop,
                        enumerable: shared.trueValue,
                        configurable: shared.trueValue
                    });
                }
            }
            const { update: nestedHookUpdate, __proxyState: nestedProxyState } = provider;
            // reset the tracked keys and bingError flag, so that the nest hook providers can be initialized.
            // Always track the dependencies in computed
            referingObject.trackedKeys = {
                ...depKeys
            };
            referingObject.bindError = shared.falseValue;
            const { then: providerThen } = provider;
            const extraProvider = {
                // expose referingObject automatically.
                __referingObj: referingObject,
                // the new updating function that can update the new states and nested hook states.
                update: memorize((newStates) => {
                    shared.objectKeys(newStates).forEach(key => {
                        if (shared.includes(createdStateList, key)) {
                            update(newStates[key], originalStatesMap[key], key);
                        }
                        else if (key in provider && shared.isFn(nestedHookUpdate)) {
                            nestedHookUpdate({
                                [key]: newStates[key]
                            });
                        }
                    });
                }),
                __proxyState: memorize((key) => {
                    if (shared.includes(createdStateList, key) && shared.instanceOf(object[key], shared.FrameworkReadableState)) {
                        // need to tag the key that is being tracked so that it can be updated with `state.v = xxx`.
                        referingObject.trackedKeys[key] = shared.trueValue;
                        return object[key];
                    }
                    return nestedProxyState(key);
                }),
                /**
                 * send and wait for responding with `await`
                 * this is always used in `nuxt3` and suspense in vue3
                 * @example
                 * ```js
                 * const { loading, data, error } = await useRequest(...);
                 * ```
                 */
                then(onfulfilled, onrejected) {
                    // open all the states to track.
                    shared.forEach(stateKeys, key => {
                        referingObject.trackedKeys[key] = shared.trueValue;
                    });
                    const handleFullfilled = () => {
                        // eslint-disable-next-line
                        shared.deleteAttr(completedProvider, 'then');
                        // eslint-disable-next-line
                        onfulfilled(completedProvider);
                    };
                    shared.isFn(providerThen) ? providerThen(handleFullfilled, onrejected) : handleFullfilled();
                }
            };
            const completedProvider = shared.objAssign(provider, extraProvider);
            return completedProvider;
        },
        /**
         * transform state proxies to object.
         * @param states proxy array of framework states
         * @param filterKey filter key of state proxy
         * @returns an object that contains the states of target form
         */
        objectify: (states, filterKey) => states.reduce((result, item) => {
            result[item.k] = filterKey ? item[filterKey] : item;
            return result;
        }, {}),
        transformState2Proxy: (state, key) => shared.newInstance((shared.FrameworkState), state, key, state => dehydrate(state, key, referingObject), exportState, (state, newValue) => update(newValue, state, key))
    };
}

const coreAssert = shared.createAssert('');
const requestHookAssert = shared.createAssert('useRequest');
const watcherHookAssert = shared.createAssert('useWatcher');
const fetcherHookAssert = shared.createAssert('useFetcher');
const coreHookAssert = (hookType) => ({
    [EnumHookType.USE_REQUEST]: requestHookAssert,
    [EnumHookType.USE_WATCHER]: watcherHookAssert,
    [EnumHookType.USE_FETCHER]: fetcherHookAssert
})[hookType];
/**
 * Assert whether it is a method instance
 * @param methodInstance method instance
 */
const assertMethod = (assert, methodInstance) => assert(shared.instanceOf(methodInstance, alova.Method), 'expected a method instance.');

const KEY_SUCCESS = 'success';
const KEY_ERROR = 'error';
const KEY_COMPLETE = 'complete';

var createHook = (ht, c, eventManager, ro) => ({
    /** The method instance of the last request */
    m: shared.undefinedValue,
    /** sent method keys */
    rf: {},
    /** frontStates */
    fs: {},
    /** eventManager */
    em: eventManager,
    /** hookType, useRequest=1, useWatcher=2, useFetcher=3 */
    ht,
    /** hook config */
    c,
    /** referingObject */
    ro,
    /** merged states */
    ms: {}
});

// base event
class AlovaEventBase {
    constructor(method, args) {
        this.method = method;
        this.args = args;
    }
    clone() {
        return { ...this };
    }
    static spawn(method, args) {
        return shared.newInstance((AlovaEventBase), method, args);
    }
}
class AlovaSuccessEvent extends AlovaEventBase {
    constructor(base, data, fromCache) {
        super(base.method, base.args);
        this.data = data;
        this.fromCache = fromCache;
    }
}
class AlovaErrorEvent extends AlovaEventBase {
    constructor(base, error) {
        super(base.method, base.args);
        this.error = error;
    }
}
class AlovaCompleteEvent extends AlovaEventBase {
    constructor(base, status, data, fromCache, error) {
        super(base.method, base.args);
        this.status = status;
        this.data = data;
        this.fromCache = status === 'error' ? false : fromCache;
        this.error = error;
    }
}
/** Sq top level events */
class SQEvent {
    constructor(behavior, method, silentMethod) {
        this.behavior = behavior;
        this.method = method;
        this.silentMethod = silentMethod;
    }
}
/** Sq global events */
class GlobalSQEvent extends SQEvent {
    constructor(behavior, method, silentMethod, queueName, retryTimes) {
        super(behavior, method, silentMethod);
        this.queueName = queueName;
        this.retryTimes = retryTimes;
    }
}
class GlobalSQSuccessEvent extends GlobalSQEvent {
    constructor(behavior, method, silentMethod, queueName, retryTimes, data, vDataResponse) {
        super(behavior, method, silentMethod, queueName, retryTimes);
        this.data = data;
        this.vDataResponse = vDataResponse;
    }
}
class GlobalSQErrorEvent extends GlobalSQEvent {
    constructor(behavior, method, silentMethod, queueName, retryTimes, error, retryDelay) {
        super(behavior, method, silentMethod, queueName, retryTimes);
        this.error = error;
        this.retryDelay = retryDelay;
    }
}
class GlobalSQFailEvent extends GlobalSQEvent {
    constructor(behavior, method, silentMethod, queueName, retryTimes, error) {
        super(behavior, method, silentMethod, queueName, retryTimes);
        this.error = error;
    }
}
/** Sq event */
class ScopedSQEvent extends SQEvent {
    constructor(behavior, method, silentMethod, args) {
        super(behavior, method, silentMethod);
        this.args = args;
    }
}
class ScopedSQSuccessEvent extends ScopedSQEvent {
    constructor(behavior, method, silentMethod, args, data) {
        super(behavior, method, silentMethod, args);
        this.data = data;
    }
}
class ScopedSQErrorEvent extends ScopedSQEvent {
    constructor(behavior, method, silentMethod, args, error) {
        super(behavior, method, silentMethod, args);
        this.error = error;
    }
}
class ScopedSQRetryEvent extends ScopedSQEvent {
    constructor(behavior, method, silentMethod, args, retryTimes, retryDelay) {
        super(behavior, method, silentMethod, args);
        this.retryTimes = retryTimes;
        this.retryDelay = retryDelay;
    }
}
class ScopedSQCompleteEvent extends ScopedSQEvent {
    constructor(behavior, method, silentMethod, args, status, data, error) {
        super(behavior, method, silentMethod, args);
        this.status = status;
        this.data = data;
        this.error = error;
    }
}
class RetriableRetryEvent extends AlovaEventBase {
    constructor(base, retryTimes, retryDelay) {
        super(base.method, base.args);
        this.retryTimes = retryTimes;
        this.retryDelay = retryDelay;
    }
}
class RetriableFailEvent extends AlovaErrorEvent {
    constructor(base, error, retryTimes) {
        super(base, error);
        this.retryTimes = retryTimes;
    }
}

const defaultMiddleware = (_, next) => next();

const stateCache = {};
/**
 * @description Get State cache data
 * @param baseURL Base URL
 * @param key Request key value
 * @returns Cached response data, if not returned {}
 */
const getStateCache = (namespace, key) => {
    const cachedState = stateCache[namespace] || {};
    return cachedState[key] ? Array.from(cachedState[key]) : [];
};
/**
 * @description Set State cache data
 * @param baseURL Base URL
 * @param key Request key value
 * @param data cache data
 */
const setStateCache = (namespace, key, hookInstance) => {
    const cachedState = (stateCache[namespace] = stateCache[namespace] || {});
    if (!cachedState[key]) {
        cachedState[key] = shared.newInstance((Set));
    }
    cachedState[key].add(hookInstance);
};
/**
 * @description Clear State cache data
 * @param baseURL Base URL
 * @param key Request key value
 */
const removeStateCache = (namespace, key, hookInstance) => {
    const cachedState = stateCache[namespace];
    const hookSet = cachedState[key];
    if (cachedState && hookSet) {
        hookInstance ? hookSet.delete(hookInstance) : hookSet.clear();
        if (hookSet.size === 0) {
            shared.deleteAttr(cachedState, key);
        }
    }
};

/**
 * Unified processing of request logic for useRequest/useWatcher/useFetcher and other request hook functions
 * @param hookInstance hook instance
 * @param methodHandler Request method object or get function
 * @param sendCallingArgs send function parameters
 * @returns Request status
 */
function useHookToSendRequest(hookInstance, methodHandler, sendCallingArgs = []) {
    const currentHookAssert = coreHookAssert(hookInstance.ht);
    let methodInstance = shared.getHandlerMethod(methodHandler, currentHookAssert, sendCallingArgs);
    const { fs: frontStates, ht: hookType, c: useHookConfig } = hookInstance;
    const { loading: loadingState, data: dataState, error: errorState } = frontStates;
    const isFetcher = hookType === EnumHookType.USE_FETCHER;
    const { force: forceRequest = shared.falseValue, middleware = defaultMiddleware } = useHookConfig;
    const alovaInstance = shared.getContext(methodInstance);
    const { id } = alovaInstance;
    // If it is a silent request, on success will be called directly after the request, on error will not be triggered, and progress will not be updated.
    const methodKey = shared.getMethodInternalKey(methodInstance);
    const { abortLast = shared.trueValue } = useHookConfig;
    const isFirstRequest = !hookInstance.m;
    hookInstance.m = methodInstance;
    return (async () => {
        // Initialize status data, which does not need to be loaded when pulling data, because pulling data does not require returning data.
        let removeStates = shared.noop;
        let isNextCalled = shared.falseValue;
        let responseHandlePromise = shared.promiseResolve(shared.undefinedValue);
        let offDownloadEvent = shared.noop;
        let offUploadEvent = shared.noop;
        const cachedResponse = await alova.queryCache(methodInstance);
        let fromCache = () => !!cachedResponse;
        // Whether it is a controlled loading state. When it is true, loading will no longer be set to false in response processing.
        let controlledLoading = shared.falseValue;
        if (!isFetcher) {
            // Store the initial state in cache for subsequent updates
            setStateCache(id, methodKey, hookInstance);
            // Setting the state removal function will be passed to the effect request in the hook, and it will be set to be called when the component is unloaded.
            removeStates = () => removeStateCache(id, methodKey, hookInstance);
        }
        // The middleware function next callback function allows you to modify mandatory request parameters and even replace the method instance that is about to send the request.
        const guardNext = guardNextConfig => {
            isNextCalled = shared.trueValue;
            const { force: guardNextForceRequest = forceRequest, method: guardNextReplacingMethod = methodInstance } = guardNextConfig || {};
            const forceRequestFinally = shared.sloughConfig(guardNextForceRequest, [
                shared.newInstance((AlovaEventBase), methodInstance, sendCallingArgs)
            ]);
            const progressUpdater = (stage) => ({ loaded, total }) => {
                frontStates[stage].v = {
                    loaded,
                    total
                };
            };
            methodInstance = guardNextReplacingMethod;
            // The latest controller needs to be saved every time a request is sent
            hookInstance.rf[methodKey] = removeStates;
            // Loading will not be changed when the loading state is controlled
            // The cache is missed, or loading needs to be set to true when forcing a request.
            if (!controlledLoading) {
                loadingState.v = !!forceRequestFinally || !cachedResponse;
            }
            // Determine whether to trigger a progress update based on the tracking status of downloading and uploading
            const { downloading: enableDownload, uploading: enableUpload } = hookInstance.ro.trackedKeys;
            offDownloadEvent = enableDownload ? methodInstance.onDownload(progressUpdater('downloading')) : offDownloadEvent;
            offUploadEvent = enableUpload ? methodInstance.onUpload(progressUpdater('uploading')) : offUploadEvent;
            responseHandlePromise = methodInstance.send(forceRequestFinally);
            fromCache = () => methodInstance.fromCache || shared.falseValue;
            return responseHandlePromise;
        };
        // Call middleware function
        const commonContext = {
            method: methodInstance,
            cachedResponse,
            config: useHookConfig,
            abort: () => methodInstance.abort()
        };
        // Whether it is necessary to update the response data and call the response callback
        const toUpdateResponse = () => hookType !== EnumHookType.USE_WATCHER || !abortLast || hookInstance.m === methodInstance;
        const controlLoading = (control = shared.trueValue) => {
            // only reset loading state in first request
            if (control && isFirstRequest) {
                loadingState.v = shared.falseValue;
            }
            controlledLoading = control;
        };
        // Call middleware function
        const middlewareCompletePromise = isFetcher
            ? middleware({
                ...commonContext,
                args: sendCallingArgs,
                fetch: (methodInstance, ...args) => {
                    assertMethod(currentHookAssert, methodInstance);
                    return useHookToSendRequest(hookInstance, methodInstance, args);
                },
                proxyStates: shared.omit(frontStates, 'data'),
                controlLoading
            }, guardNext)
            : middleware({
                ...commonContext,
                args: sendCallingArgs,
                send: (...args) => useHookToSendRequest(hookInstance, methodHandler, args),
                proxyStates: frontStates,
                controlLoading
            }, guardNext);
        let finallyResponse = shared.undefinedValue;
        const baseEvent = (AlovaEventBase).spawn(methodInstance, sendCallingArgs);
        try {
            // Unified processing of responses
            const middlewareReturnedData = await middlewareCompletePromise;
            const afterSuccess = (data) => {
                // Update cached response data
                if (!isFetcher) {
                    toUpdateResponse() && (dataState.v = data);
                }
                else if (hookInstance.c.updateState !== shared.falseValue) {
                    // Update the status in the cache, usually entered in use fetcher
                    shared.forEach(getStateCache(id, methodKey), hookInstance => {
                        hookInstance.fs.data.v = data;
                    });
                }
                // If the response data needs to be updated, the corresponding callback function is triggered after the request.
                if (toUpdateResponse()) {
                    errorState.v = shared.undefinedValue;
                    // Loading status will no longer change to false when controlled
                    !controlledLoading && (loadingState.v = shared.falseValue);
                    hookInstance.em.emit(KEY_SUCCESS, shared.newInstance((AlovaSuccessEvent), baseEvent, data, fromCache()));
                    hookInstance.em.emit(KEY_COMPLETE, shared.newInstance((AlovaCompleteEvent), baseEvent, KEY_SUCCESS, data, fromCache(), shared.undefinedValue));
                }
                return data;
            };
            finallyResponse =
                // When no data is returned or undefined is returned in the middleware, get the real response data
                // Otherwise, use the returned data and no longer wait for the response promise. At this time, you also need to call the response callback.
                middlewareReturnedData !== shared.undefinedValue
                    ? afterSuccess(middlewareReturnedData)
                    : isNextCalled
                        ? // There are two possibilities when middlewareCompletePromise is resolve
                            // 1. The request is normal
                            // 2. The request is incorrect, but the error is captured by the middleware function. At this time, the success callback will also be called, that is, afterSuccess(undefinedValue)
                            await shared.promiseThen(responseHandlePromise, afterSuccess, () => afterSuccess(shared.undefinedValue))
                        : // If is next called is not called, no data is returned
                            shared.undefinedValue;
            // When the next function is not called, update loading to false.
            !isNextCalled && !controlledLoading && (loadingState.v = shared.falseValue);
        }
        catch (error) {
            if (toUpdateResponse()) {
                // Controls the output of error messages
                errorState.v = error;
                // Loading status will no longer change to false when controlled
                !controlledLoading && (loadingState.v = shared.falseValue);
                hookInstance.em.emit(KEY_ERROR, shared.newInstance((AlovaErrorEvent), baseEvent, error));
                hookInstance.em.emit(KEY_COMPLETE, shared.newInstance((AlovaCompleteEvent), baseEvent, KEY_ERROR, shared.undefinedValue, fromCache(), error));
            }
            throw error;
        }
        // Unbind download and upload events after responding
        offDownloadEvent();
        offUploadEvent();
        return finallyResponse;
    })();
}

const refCurrent = (ref) => ref.current;
/**
 * Create request status and uniformly process consistent logic in useRequest, useWatcher, and useFetcher
 * This function will call the creation function of statesHook to create the corresponding request state.
 * When the value is empty, it means useFetcher enters, and data status and cache status are not needed at this time.
 * @param methodInstance request method object
 * @param useHookConfig hook request configuration object
 * @param initialData Initial data data
 * @param immediate Whether to initiate a request immediately
 * @param watchingStates The monitored status, if not passed in, call handleRequest directly.
 * @param debounceDelay Delay time for request initiation
 * @returns Current request status, operation function and event binding function
 */
function createRequestState(hookType, methodHandler, useHookConfig, initialData, immediate = shared.falseValue, watchingStates, debounceDelay = 0) {
    var _a;
    // shallow clone config object to avoid passing the same useHookConfig object which may cause vue2 state update error
    useHookConfig = { ...useHookConfig };
    let initialLoading = !!immediate;
    let cachedResponse = shared.undefinedValue;
    // When sending a request immediately, you need to determine the initial loading value by whether to force the request and whether there is a cache. This has the following two benefits:
    // 1. Sending the request immediately under react can save one rendering time
    // 2. In the HTML rendered by SSR, the initial view is in the loading state to avoid the loading view flashing when displayed on the client.
    if (immediate) {
        // An error may be reported when calling the get handler method, and try/catch is required.
        try {
            const methodInstance = shared.getHandlerMethod(methodHandler, coreHookAssert(hookType));
            const alovaInstance = shared.getContext(methodInstance);
            const l1CacheResult = alovaInstance.l1Cache.get(shared.buildNamespacedCacheKey(alovaInstance.id, shared.getMethodInternalKey(methodInstance)));
            // The cache is only checked synchronously, so it does not take effect on asynchronous l1Cache adapters.
            // It is recommended not to set up the asynchronous l1Cache adapter on the client side
            if (l1CacheResult && !shared.instanceOf(l1CacheResult, shared.PromiseCls)) {
                const [data, expireTimestamp] = l1CacheResult;
                // If there is no expiration time, it means that the data will never expire. Otherwise, you need to determine whether it has expired.
                if (!expireTimestamp || expireTimestamp > shared.getTime()) {
                    cachedResponse = data;
                }
            }
            const forceRequestFinally = shared.sloughConfig((_a = useHookConfig.force) !== null && _a !== void 0 ? _a : shared.falseValue);
            initialLoading = !!forceRequestFinally || !cachedResponse;
        }
        catch (_b) { }
    }
    const { create, effectRequest, ref, objectify, exposeProvider, transformState2Proxy, __referingObj: referingObject } = statesHookHelper(alova.promiseStatesHook(), useHookConfig.__referingObj);
    const progress = {
        total: 0,
        loaded: 0
    };
    // Put the externally incoming supervised states into the front states collection together
    const { managedStates = {} } = useHookConfig;
    const managedStatesProxy = mapObject(managedStates, (state, key) => transformState2Proxy(state, key));
    const data = create(cachedResponse !== null && cachedResponse !== void 0 ? cachedResponse : (shared.isFn(initialData) ? initialData() : initialData), 'data');
    const loading = create(initialLoading, 'loading');
    const error = create(shared.undefinedValue, 'error');
    const downloading = create({ ...progress }, 'downloading');
    const uploading = create({ ...progress }, 'uploading');
    const frontStates = objectify([data, loading, error, downloading, uploading]);
    const eventManager = shared.createEventManager();
    const hookInstance = refCurrent(ref(createHook(hookType, useHookConfig, eventManager, referingObject)));
    /**
     * ## react
     * Every time the function is executed, the following items need to be reset
     */
    hookInstance.fs = frontStates;
    hookInstance.em = eventManager;
    hookInstance.c = useHookConfig;
    hookInstance.ms = { ...frontStates, ...managedStatesProxy };
    const hasWatchingStates = watchingStates !== shared.undefinedValue;
    // Initialize request event
    // Unified send request function
    const handleRequest = (handler = methodHandler, sendCallingArgs) => useHookToSendRequest(hookInstance, handler, sendCallingArgs);
    // if user call hook like `await useRequest(...)`
    // that will stop the immediate request, because it will be call a request in function `then`
    const hookRequestPromiseCallback = ref(shared.undefinedValue);
    const isInitialRequest = ref(shared.falseValue);
    // only call once when multiple values changed at the same time
    const onceRunner = refCurrent(ref(shared.createSyncOnceRunner()));
    // Call `handleRequest` in a way that catches the exception
    // Catching exceptions prevents exceptions from being thrown out
    const wrapEffectRequest = (ro = referingObject, handler) => {
        onceRunner(() => {
            // Do not send requests when rendering on the server side
            // but if call hook with `await`, the `hookRequestPromiseCallback` will be set as `resolve` and `reject` function
            if (!alova.globalConfigMap.ssr || refCurrent(hookRequestPromiseCallback)) {
                // `referingObject.initialRequest` is used in nuxthook
                referingObject.initialRequest = isInitialRequest.current = shared.trueValue;
                shared.promiseThen(handleRequest(handler), () => {
                    var _a;
                    (_a = refCurrent(hookRequestPromiseCallback)) === null || _a === void 0 ? void 0 : _a.resolve();
                }, error => {
                    var _a;
                    // the error tracking indicates that the error need to throw.
                    // when user access the `error` state or bind the error event, the error instance won't be thrown out.
                    if (!ro.bindError && !ro.trackedKeys.error && !refCurrent(hookRequestPromiseCallback)) {
                        throw error;
                    }
                    (_a = refCurrent(hookRequestPromiseCallback)) === null || _a === void 0 ? void 0 : _a.reject(error);
                });
            }
        });
    };
    /**
     * fix: https://github.com/alovajs/alova/issues/421
     * Use ref wraps to prevent react from creating new debounce function in every render
     * Explicit passing is required because the context will change
     */
    const debouncingSendHandler = ref(debounce((_, ro, handler) => wrapEffectRequest(ro, handler), (changedIndex) => shared.isNumber(changedIndex) ? (shared.isArray(debounceDelay) ? debounceDelay[changedIndex] : debounceDelay) : 0));
    effectRequest({
        handler: 
        // When `watchingStates` is an array, it indicates the watching states (including an empty array). When it is undefined, it indicates the non-watching state.
        hasWatchingStates
            ? (changedIndex) => debouncingSendHandler.current(changedIndex, referingObject, methodHandler)
            : () => wrapEffectRequest(referingObject),
        removeStates: () => {
            shared.forEach(shared.objectValues(hookInstance.rf), fn => fn());
        },
        frontStates: { ...frontStates, ...managedStatesProxy },
        watchingStates,
        immediate: immediate !== null && immediate !== void 0 ? immediate : shared.trueValue
    });
    const hookProvider = exposeProvider({
        ...objectify([data, loading, error, downloading, uploading]),
        abort: () => hookInstance.m && hookInstance.m.abort(),
        /**
         * Manually initiate a request by executing this method
         * @param sendCallingArgs Parameters passed in when calling the send function
         * @param methodInstance method object
         * @param isFetcher Whether to call isFetcher
         * @returns Request promise
         */
        send: (sendCallingArgs, methodInstance) => handleRequest(methodInstance, sendCallingArgs),
        onSuccess(handler) {
            eventManager.on(KEY_SUCCESS, handler);
        },
        onError(handler) {
            // will not throw error when bindError is true.
            // it will reset in `exposeProvider` so that ignore the error binding in custom use hooks.
            referingObject.bindError = shared.trueValue;
            eventManager.on(KEY_ERROR, handler);
        },
        onComplete(handler) {
            eventManager.on(KEY_COMPLETE, handler);
        },
        /**
         * send and wait for responding with `await`
         * this is always used in `nuxt3` and `<suspense>` in vue3
         * @example
         * ```js
         * const { loading, data, error } = await useRequest(...);
         * ```
         */
        then(onfulfilled, onrejected) {
            const { promise, resolve, reject } = shared.usePromise();
            hookRequestPromiseCallback.current = {
                resolve,
                reject
            };
            // if the request handler is not called, the promise will resolve asynchronously.
            shared.setTimeoutFn(() => {
                !isInitialRequest.current && resolve();
            }, 10);
            shared.promiseThen(promise, () => {
                onfulfilled(hookProvider);
            }, onrejected);
        }
    });
    return hookProvider;
}

/**
 * Fetch request data and cache request method object
 */
function useFetcher(config = {}) {
    const props = createRequestState(EnumHookType.USE_FETCHER, shared.noop, config);
    const { send } = props;
    shared.deleteAttr(props, 'send');
    return shared.objAssign(props, {
        /**
         * Fetch data fetch will definitely send a request, and if the currently requested data has a corresponding management state, this state will be updated.
         * @param matcher Method object
         */
        fetch: (matcher, ...args) => {
            assertMethod(fetcherHookAssert, matcher);
            return send(args, matcher);
        }
    });
}

function useRequest(handler, config = {}) {
    const { immediate = shared.trueValue, initialData } = config;
    const props = createRequestState(EnumHookType.USE_REQUEST, handler, config, initialData, !!immediate);
    const { send } = props;
    return shared.objAssign(props, {
        send: (...args) => send(args)
    });
}

function useWatcher(handler, watchingStates, config = {}) {
    watcherHookAssert(watchingStates && shared.len(watchingStates) > 0, 'expected at least one watching state');
    const { immediate, debounce = 0, initialData } = config;
    const props = createRequestState(EnumHookType.USE_WATCHER, handler, config, initialData, !!immediate, // !!immediate means not send request immediately
    watchingStates, debounce);
    const { send } = props;
    return shared.objAssign(props, {
        send: (...args) => send(args)
    });
}

var createSnapshotMethodsManager = (handler) => {
    let methodSnapshots = {};
    return {
        snapshots: () => methodSnapshots,
        save(methodInstance, force = shared.falseValue) {
            const key = shared.getMethodInternalKey(methodInstance);
            // Because it is impossible to locate the location of the total data in the cache
            // Therefore, this field is maintained redundantly here.
            if (!methodSnapshots[key] || force) {
                methodSnapshots[key] = {
                    entity: methodInstance
                };
            }
        },
        get: (entityOrPage) => methodSnapshots[shared.getMethodInternalKey(shared.instanceOf(entityOrPage, (alova.Method)) ? entityOrPage : handler(entityOrPage))],
        remove(key) {
            if (key) {
                delete methodSnapshots[key];
            }
            else {
                methodSnapshots = {};
            }
        }
    };
};

const paginationAssert = shared.createAssert('usePagination');
const indexAssert = (index, rawData) => paginationAssert(shared.isNumber(index) && index < shared.len(rawData), 'index must be a number that less than list length');
const parseSendArgs = (args) => [
    args[args.length - 2], // refreshPage
    args[args.length - 1], // isRefresh
    args.slice(0, args.length - 2) // send args
];
var usePagination = (handler, config = {}) => {
    const { create, computed, ref, watch, exposeProvider, objectify, __referingObj: referingObject } = statesHookHelper(alova.promiseStatesHook());
    const { preloadPreviousPage = shared.trueValue, preloadNextPage = shared.trueValue, total: totalGetter = res => res.total, data: dataGetter = res => res.data, append = shared.falseValue, initialPage = 1, initialPageSize = 10, watchingStates = [], initialData, immediate = shared.trueValue, middleware, force = shared.noop, actions = {}, ...others } = config;
    const handlerRef = ref(handler);
    const isReset = ref(shared.falseValue); // Used to control whether to reset
    // The number of requests during reset. In order to prevent repeated requests during reset, use this parameter to limit requests.
    const page = create(initialPage, 'page');
    const pageSize = create(initialPageSize, 'pageSize');
    const data = create((initialData ? dataGetter(initialData) || [] : []), 'data');
    const total = create(initialData ? totalGetter(initialData) : shared.undefinedValue, 'total');
    // Save snapshots of all method instances used by the current hook
    const { snapshots: methodSnapshots, get: getSnapshotMethods, save: saveSnapshot, remove: removeSnapshot } = ref(createSnapshotMethodsManager(page => handlerRef.current(page, pageSize.v))).current;
    const listDataGetter = (rawData) => dataGetter(rawData) || rawData;
    // Initialize fetcher
    const fetchStates = useFetcher({
        __referingObj: referingObject,
        updateState: shared.falseValue,
        force: ({ args }) => args[shared.len(args) - 1]
    });
    const { loading, fetch, abort: abortFetch, onSuccess: onFetchSuccess } = fetchStates;
    const fetchingRef = ref(loading);
    const getHandlerMethod = (refreshPage = page.v, customArgs = []) => {
        const handlerMethod = handler(refreshPage, pageSize.v, ...customArgs);
        // Define unified additional names to facilitate management
        saveSnapshot(handlerMethod);
        return handlerMethod;
    };
    // When monitoring status changes, reset page to 1
    watch(watchingStates, () => {
        page.v = initialPage;
        isReset.current = shared.trueValue;
    });
    // Compatible with react, store functions that require proxy here
    // In this way, the latest operation function can be called in the proxy function and avoid the react closure trap.
    const delegationActions = ref({});
    const status = create('', 'status');
    const removing = create([], 'removing');
    const replacing = create(shared.undefinedValue, 'replacing');
    // Calculate data, total, is last page parameters
    const pageCount = computed(() => {
        const totalVal = total.v;
        return totalVal !== shared.undefinedValue ? Math.ceil(totalVal / pageSize.v) : shared.undefinedValue;
    }, [pageSize, total], 'pageCount');
    const createDelegationAction = (actionName) => (...args) => delegationActions.current[actionName](...args);
    const states = useWatcher((...args) => {
        const [refreshPage, , customArgs] = parseSendArgs(args);
        return getHandlerMethod(refreshPage, customArgs);
    }, [...watchingStates, page.e, pageSize.e], {
        __referingObj: referingObject,
        immediate,
        initialData,
        managedStates: objectify([data, page, pageSize, total], 's'),
        middleware(ctx, next) {
            if (!middleware) {
                return next();
            }
            return middleware({
                ...ctx,
                delegatingActions: {
                    refresh: createDelegationAction('refresh'),
                    insert: createDelegationAction('insert'),
                    remove: createDelegationAction('remove'),
                    replace: createDelegationAction('replace'),
                    reload: createDelegationAction('reload'),
                    getState: (stateKey) => {
                        const states = {
                            page,
                            pageSize,
                            data,
                            pageCount,
                            total,
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            isLastPage
                        };
                        return states[stateKey].v;
                    }
                }
            }, next);
        },
        force: event => event.args[1] || (shared.isFn(force) ? force(event) : force),
        ...others
    });
    const { send } = states;
    const nestedData = states.__proxyState('data');
    // Determine whether data can be preloaded
    const canPreload = async (payload) => {
        const { rawData = nestedData.v, preloadPage, fetchMethod, forceRequest = shared.falseValue, isNextPage = shared.falseValue } = payload;
        const pageCountVal = pageCount.v;
        const exceedPageCount = pageCountVal
            ? preloadPage > pageCountVal
            : isNextPage // If it is judged to preload the next page of data and there is no page count, it is judged by whether the data volume of the last page reaches the page size.
                ? shared.len(listDataGetter(rawData)) < pageSize.v
                : shared.falseValue;
        const isMatchPageScope = preloadPage > 0 && !exceedPageCount;
        if (!isMatchPageScope) {
            return shared.falseValue;
        }
        const { e: expireMilliseconds } = shared.getLocalCacheConfigParam(fetchMethod);
        const hasCache = await alova.queryCache(fetchMethod);
        // If the cache time is less than or equal to the current time, it means that the cache is not set and the data will no longer be pre-pulled at this time.
        // Or there is already a cache and it is not pre-fetched.
        return expireMilliseconds(shared.MEMORY) <= shared.getTime() ? shared.falseValue : forceRequest || !hasCache;
    };
    // Preload next page data
    const fetchNextPage = async (rawData, force, customArgs = []) => {
        const nextPage = page.v + 1;
        const fetchMethod = getHandlerMethod(nextPage, customArgs);
        if (preloadNextPage &&
            (await canPreload({
                rawData,
                preloadPage: nextPage,
                fetchMethod,
                isNextPage: shared.trueValue,
                forceRequest: force
            }))) {
            shared.promiseCatch(fetch(fetchMethod, ...customArgs, force), shared.noop);
        }
    };
    // Preload previous page data
    const fetchPreviousPage = async (rawData, customArgs = []) => {
        const prevPage = page.v - 1;
        const fetchMethod = getHandlerMethod(prevPage, customArgs);
        if (preloadPreviousPage &&
            (await canPreload({
                rawData,
                preloadPage: prevPage,
                fetchMethod
            }))) {
            shared.promiseCatch(fetch(fetchMethod, ...customArgs, shared.undefinedValue), shared.noop);
        }
    };
    const computeIsLastPage = () => {
        const dataRaw = nestedData.v;
        if (!dataRaw) {
            return shared.trueValue;
        }
        const statesDataVal = listDataGetter(dataRaw);
        const pageVal = page.v;
        const pageCountVal = pageCount.v;
        const dataLen = shared.isArray(statesDataVal) ? shared.len(statesDataVal) : 0;
        return pageCountVal ? pageVal >= pageCountVal : dataLen < pageSize.v;
    };
    /**
     * fix #685
     * @see {https://github.com/alovajs/alova/issues/685}
     */
    const isLastPage = create(computeIsLastPage(), 'isLastPage');
    // If the returned data is smaller than the page size, it is considered the last page.
    watch([page, pageCount, nestedData, pageSize], async () => {
        // the reason why delay is used is that needed to wait for the `loading` state to be updated.
        shared.setTimeoutFn(() => {
            isLastPage.v = computeIsLastPage();
        });
    });
    // Update current page cache
    const updateCurrentPageCache = async () => {
        const snapshotItem = getSnapshotMethods(page.v);
        if (snapshotItem) {
            await alova.setCache(snapshotItem.entity, (rawData) => {
                // When caching is turned off, raw data is undefined
                if (rawData) {
                    const cachedListData = listDataGetter(rawData) || [];
                    shared.splice(cachedListData, 0, shared.len(cachedListData), ...data.v);
                    return rawData;
                }
            });
        }
    };
    onFetchSuccess(({ method, data: rawData }) => {
        // When fetch has not responded yet and the page is flipped to the page number corresponding to fetch, the list data needs to be updated manually.
        const snapshotItem = getSnapshotMethods(page.v);
        if (snapshotItem && shared.getMethodInternalKey(snapshotItem.entity) === shared.getMethodInternalKey(method)) {
            // If data is appended, data is updated
            const listData = listDataGetter(rawData); // Update data parameters
            if (append) {
                // The current page data needs to be replaced during pull-down loading.
                const dataRaw = data.v;
                const pageSizeVal = pageSize.v;
                // When performing a removal operation, the number of replacements is less than pageSize, and dataRaw % pageSizeVal will be greater than 0.
                // When adding a new operation, the number of replacements is equal to pageSize. At this time, dataRaw % pageSizeVal will be equal to 0. No replacement is needed at this time.
                const replaceNumber = shared.len(dataRaw) % pageSizeVal;
                if (replaceNumber > 0) {
                    const rawData = [...data.v];
                    shared.splice(rawData, (page.v - 1) * pageSizeVal, replaceNumber, ...listData);
                    data.v = rawData;
                }
            }
            else {
                data.v = listData;
            }
        }
    });
    const awaitResolve = ref(shared.undefinedValue);
    const awaitReject = ref(shared.undefinedValue);
    states
        .onSuccess(({ data: rawData, args, method }) => {
        const [refreshPage, isRefresh, customArgs] = parseSendArgs(args);
        const { total: cachedTotal } = getSnapshotMethods(method) || {};
        const typedRawData = rawData;
        total.v = cachedTotal !== shared.undefinedValue ? cachedTotal : totalGetter(typedRawData);
        if (!isRefresh) {
            fetchPreviousPage(typedRawData, customArgs);
            fetchNextPage(typedRawData, shared.falseValue, customArgs);
        }
        const pageSizeVal = pageSize.v;
        const listData = listDataGetter(typedRawData); // Get array
        paginationAssert(shared.isArray(listData), 'Got wrong array, did you return the correct array of list in `data` function');
        // If data is appended, data is updated
        if (append) {
            // If it is reset, clear the data first
            if (isReset.current) {
                data.v = [];
            }
            if (refreshPage === shared.undefinedValue) {
                data.v = [...data.v, ...listData];
            }
            else if (refreshPage) {
                const rawData = [...data.v];
                // If the page is refreshed, the data on that page is replaced.
                shared.splice(rawData, (refreshPage - 1) * pageSizeVal, pageSizeVal, ...listData);
                data.v = rawData;
            }
        }
        else {
            data.v = listData;
        }
    })
        .onSuccess(({ data }) => {
        var _a;
        (_a = awaitResolve.current) === null || _a === void 0 ? void 0 : _a.call(awaitResolve, data);
    })
        .onError(({ error }) => {
        var _a;
        (_a = awaitReject.current) === null || _a === void 0 ? void 0 : _a.call(awaitReject, error);
    })
        .onComplete(() => {
        // Whether the request is successful or not, it must be reset is reset
        isReset.current = shared.falseValue;
    });
    // Get the location of a list item
    const getItemIndex = (item) => {
        const index = data.v.indexOf(item);
        paginationAssert(index >= 0, 'item is not found in list');
        return index;
    };
    const { addQueue: add2AsyncQueue, onComplete: onAsyncQueueRunComplete } = ref(shared.createAsyncQueue()).current;
    /**
     * Refresh the specified page number data. This function will ignore the cache and force the request to be sent.
     * If no page number is passed in, the current page will be refreshed.
     * If a list item is passed in, the page where the list item is located will be refreshed, which is only valid in append mode.
     * @param pageOrItemPage Refreshed page number or list item
     */
    const refresh = async (pageOrItemPage = page.v) => {
        let refreshPage = pageOrItemPage;
        let awaitPromise = shared.promiseResolve();
        if (append) {
            if (!shared.isNumber(pageOrItemPage)) {
                const itemIndex = getItemIndex(pageOrItemPage);
                refreshPage = Math.floor(itemIndex / pageSize.v) + 1;
            }
            paginationAssert(refreshPage <= page.v, "refresh page can't greater than page");
            // Update current page data
            awaitPromise = send(refreshPage, shared.trueValue);
        }
        else {
            paginationAssert(shared.isNumber(refreshPage), 'unable to calculate refresh page by item in pagination mode');
            // If the number of pages is equal, refresh the current page, otherwise fetch data
            awaitPromise =
                refreshPage === page.v
                    ? send(shared.undefinedValue, shared.trueValue)
                    : fetch(handler(refreshPage, pageSize.v), shared.trueValue);
        }
        return awaitPromise;
    };
    // Delete all related caches except the current page and next page of this usehook
    const invalidatePaginationCache = async (all = shared.falseValue) => {
        const pageVal = page.v;
        const snapshotObj = methodSnapshots();
        let snapshots = shared.objectValues(snapshotObj);
        if (all) {
            removeSnapshot();
        }
        else {
            // Filter out data from the previous page, current page, and next page
            const excludeSnapshotKeys = shared.mapItem(shared.filterItem([getSnapshotMethods(pageVal - 1), getSnapshotMethods(pageVal), getSnapshotMethods(pageVal + 1)], Boolean), ({ entity }) => shared.getMethodInternalKey(entity));
            snapshots = shared.mapItem(shared.filterItem(shared.objectKeys(snapshotObj), key => !shared.includes(excludeSnapshotKeys, key)), key => {
                const item = snapshotObj[key];
                delete snapshotObj[key];
                return item;
            });
        }
        await alova.invalidateCache(shared.mapItem(snapshots, ({ entity }) => entity));
    };
    // The reason for taking it out separately is that
    // No matter how many times insert, remove, or a combination of them is called synchronously, the reset operation only needs to be executed asynchronously once
    const resetCache = async () => {
        fetchingRef.current && abortFetch();
        // cache invalidation
        await invalidatePaginationCache();
        // When the amount of data on the next page does not exceed the page size, the next page is forced to be requested. Because there is a request for sharing, the fetching needs to be performed asynchronously after interrupting the request.
        const snapshotItem = getSnapshotMethods(page.v + 1);
        if (snapshotItem) {
            const cachedListData = listDataGetter((await alova.queryCache(snapshotItem.entity)) || {}) || [];
            fetchNextPage(shared.undefinedValue, shared.len(cachedListData) < pageSize.v);
        }
    };
    // Unified update of total number of items
    const updateTotal = (offset) => {
        if (offset === 0) {
            return;
        }
        // Update current page
        const totalVal = total.v;
        if (shared.isNumber(totalVal)) {
            const offsetedTotal = Math.max(totalVal + offset, 0);
            total.v = offsetedTotal;
            const pageVal = page.v;
            // Update redundant total field
            shared.forEach([getSnapshotMethods(pageVal - 1), getSnapshotMethods(pageVal), getSnapshotMethods(pageVal + 1)], item => {
                item && (item.total = offsetedTotal);
            });
        }
    };
    /**
     * Insert a piece of data
     * If no index is passed in, it will be inserted at the front by default.
     * If a list item is passed in, it will be inserted after the list item. If the list item is not in the list data, an error will be thrown.
     * @param item insert
     * @param position Insert position (index) or list item
     */
    const insert = (item, position = 0) => {
        onAsyncQueueRunComplete(resetCache); // The cache needs to be reset at the end of execution
        return add2AsyncQueue(async () => {
            const index = shared.isNumber(position) ? position : getItemIndex(position) + 1;
            paginationAssert(index >= 0, 'illegal insert position');
            // if has insert action, call it
            if (shared.isFn(actions.insert)) {
                status.v = 'inserting';
                await shared.promiseFinally(actions.insert(item, position), () => {
                    status.v = '';
                });
            }
            let popItem = shared.undefinedValue;
            const rawData = [...data.v];
            // Only when the number of items currently displayed is exactly a multiple of page size, you need to remove an item of data to ensure that the number of operating pages is page size.
            if (shared.len(rawData) % pageSize.v === 0) {
                popItem = rawData.pop();
            }
            // If the insertion position is empty, it will be inserted to the front by default.
            shared.splice(rawData, index, 0, item);
            data.v = rawData;
            updateTotal(1);
            // The cache of the current page is updated synchronously
            await updateCurrentPageCache();
            // If there is a pop item, put it at the head of the next page cache, consistent with the remove operation.
            // In this way, the performance will be consistent when insert and remove are called synchronously.
            if (popItem) {
                const snapshotItem = getSnapshotMethods(page.v + 1);
                if (snapshotItem) {
                    await alova.setCache(snapshotItem.entity, (rawData) => {
                        if (rawData) {
                            const cachedListData = listDataGetter(rawData) || [];
                            cachedListData.unshift(popItem);
                            cachedListData.pop();
                            return rawData;
                        }
                    });
                }
            }
        });
    };
    /**
     * Remove a piece of data
     * If a list item is passed in, the list item will be removed. If the list item is not in the list data, an error will be thrown.
     * @param position Removed index or list item
     */
    const remove = (...positions) => {
        onAsyncQueueRunComplete(resetCache); // The cache needs to be reset at the end of execution
        return add2AsyncQueue(async () => {
            const indexes = shared.mapItem(positions, position => {
                const index = shared.isNumber(position) ? position : getItemIndex(position);
                indexAssert(index, data.v);
                return index;
            });
            // if has remove action, call it
            if (shared.isFn(actions.remove)) {
                status.v = 'removing';
                removing.v = [...indexes];
                const p = shared.promiseAll(shared.mapItem(positions, position => actions.remove(position)));
                await shared.promiseFinally(p, () => {
                    status.v = '';
                    removing.v = [];
                });
            }
            const pageVal = page.v;
            const nextPage = pageVal + 1;
            const snapshotItem = getSnapshotMethods(nextPage);
            const fillingItems = []; // padding data item
            if (snapshotItem) {
                await alova.setCache(snapshotItem.entity, (rawData) => {
                    if (rawData) {
                        const cachedListData = listDataGetter(rawData);
                        // Start filling data from the head of the list on the next page
                        if (shared.isArray(cachedListData)) {
                            shared.pushItem(fillingItems, ...shared.splice(cachedListData, 0, shared.len(indexes)));
                        }
                        return rawData;
                    }
                });
            }
            const isLastPageVal = computeIsLastPage();
            const fillingItemsLen = shared.len(fillingItems);
            let isLastEmptyPageInNonAppendMode = false;
            if (fillingItemsLen > 0 || isLastPageVal) {
                // Delete data at the specified index
                const newListData = shared.filterItem(data.v, (_, index) => !shared.includes(indexes, index));
                // In page turning mode, if it is the last page and all items have been deleted, then turn one page forward.
                isLastEmptyPageInNonAppendMode = !append && isLastPageVal && shared.len(newListData) <= 0;
                if (!isLastEmptyPageInNonAppendMode && fillingItemsLen > 0) {
                    shared.pushItem(newListData, ...fillingItems);
                }
                data.v = newListData;
            }
            else if (fillingItemsLen <= 0 && !isLastPageVal) {
                // When the last page of data is removed, there is no need to refresh
                refresh(pageVal);
            }
            updateTotal(-shared.len(indexes));
            // The cache of the current page is updated synchronously
            return updateCurrentPageCache().then(() => {
                if (isLastEmptyPageInNonAppendMode && pageVal > 1) {
                    page.v = pageVal - 1;
                }
            });
        });
    };
    /**
     * Replace a piece of data
     * If the position passed in is a list item, this list item will be replaced. If the list item is not in the list data, an error will be thrown.
     * @param item replacement
     * @param position Replace position (index) or list item
     */
    const replace = (item, position) => add2AsyncQueue(async () => {
        paginationAssert(position !== shared.undefinedValue, 'expect specify the replace position');
        const index = shared.isNumber(position) ? position : getItemIndex(position);
        indexAssert(index, data.v);
        // if has replace action, call it
        if (shared.isFn(actions.replace)) {
            status.v = 'replacing';
            replacing.v = index;
            await shared.promiseFinally(actions.replace(item, position), () => {
                status.v = '';
                replacing.v = shared.undefinedValue;
            });
        }
        const rawData = [...data.v];
        shared.splice(rawData, index, 1, item);
        data.v = rawData;
        // The cache of the current page is updated synchronously
        await updateCurrentPageCache();
    });
    /**
     * Reload the list starting from page ${initialPage} and clear the cache
     */
    const reload = async () => {
        await invalidatePaginationCache(shared.trueValue);
        isReset.current = shared.trueValue;
        page.v === initialPage ? shared.promiseCatch(send(), shared.noop) : (page.v = initialPage);
        const { resolve, reject, promise } = shared.usePromise();
        awaitResolve.current = resolve;
        awaitReject.current = reject;
        return promise;
    };
    // Compatible with react, caches the latest operation function each time, avoiding closure traps
    delegationActions.current = {
        refresh,
        insert,
        remove,
        replace,
        reload
    };
    /** @Returns */
    return exposeProvider({
        ...states,
        ...objectify([data, page, pageCount, pageSize, total, isLastPage, status, removing, replacing]),
        send: (...args) => send(...args, shared.undefinedValue, shared.undefinedValue),
        fetching: fetchStates.loading,
        onFetchSuccess: fetchStates.onSuccess,
        onFetchError: fetchStates.onError,
        onFetchComplete: fetchStates.onComplete,
        refresh,
        insert,
        remove,
        replace,
        reload
    });
};

/**
 * Assert serialHandlers
 * @param hookName hook name
 * @param serialHandlers Serial request method acquisition function
 */
const assertSerialHandlers = (hookName, serialHandlers) => shared.createAssert(hookName)(shared.isArray(serialHandlers) && shared.len(serialHandlers) > 0, 'please use an array to represent serial requests');
/**
 * Create serial request middleware
 * @param serialHandlers Serial request method acquisition function
 * @param hookMiddleware use hook middleware
 * @returns Serial request middleware
 */
const serialMiddleware = (serialHandlers, hookMiddleware, serialRequestMethods = []) => {
    // The first handler is passed to the use hook externally and does not need to be requested again.
    serialHandlers.shift();
    return ((ctx, next) => {
        hookMiddleware === null || hookMiddleware === void 0 ? void 0 : hookMiddleware(ctx, () => shared.promiseResolve(shared.undefinedValue));
        ctx.controlLoading();
        const loadingState = ctx.proxyStates.loading;
        loadingState.v = shared.trueValue;
        let serialPromise = next();
        for (const handler of serialHandlers) {
            serialPromise = shared.promiseThen(serialPromise, value => {
                const methodItem = handler(value, ...ctx.args);
                shared.pushItem(serialRequestMethods, methodItem);
                return methodItem.send();
            });
        }
        return serialPromise.finally(() => {
            loadingState.v = shared.falseValue;
        });
    });
};

/**
 * Serial request hook, each serialHandlers will receive the result of the previous request
 * Applicable scenario: Serial request for a set of interfaces
 * @param serialHandlers Serial request callback array
 * @param config Configuration parameters
 * @return useSerialRequest related data and operation functions
 */
var useSerialRequest = (serialHandlers, config = {}) => {
    assertSerialHandlers('useSerialRequest', serialHandlers);
    // eslint-disable-next-line
    const { ref, __referingObj } = statesHookHelper(alova.promiseStatesHook());
    const methods = ref([]).current;
    const exposures = useRequest(serialHandlers[0], {
        ...config,
        __referingObj,
        middleware: serialMiddleware(serialHandlers, config.middleware, methods)
    });
    // Decorate the error callback function and set event.method to the instance of the error
    exposures.onError = shared.decorateEvent(exposures.onError, (handler, event) => {
        event.method = methods[shared.len(methods) - 1];
        handler(event);
    });
    return exposures;
};

/**
 * Serial request hook, each serialHandlers will receive the result of the previous request
 * Applicable scenario: After monitoring status changes, serially request a set of interfaces
 * @param serialHandlers Serial request callback array
 * @param config Configuration parameters
 * @return useSerialRequest related data and operation functions
 */
var useSerialWatcher = (serialHandlers, watchingStates, config = {}) => {
    assertSerialHandlers('useSerialWatcher', serialHandlers);
    // eslint-disable-next-line
    const { ref, __referingObj } = statesHookHelper(alova.promiseStatesHook());
    const methods = ref([]).current;
    const exposures = useWatcher(serialHandlers[0], watchingStates, {
        ...config,
        __referingObj,
        middleware: serialMiddleware(serialHandlers, config.middleware, methods)
    });
    // Decorate the error callback function and set event.method to the instance of the error
    exposures.onError = shared.decorateEvent(exposures.onError, (handler, event) => {
        event.method = methods[shared.len(methods) - 1];
        handler(event);
    });
    return exposures;
};

const STR_VALUE_OF = 'valueOf';
const DEFAULT_QUEUE_NAME = 'default';
const BEHAVIOR_SILENT = 'silent';
const BEHAVIOR_QUEUE = 'queue';
const BEHAVIOR_STATIC = 'static';
/**
 * Global virtual data collection array
 * It will only be an array when the method is created, and undefined at other times
 *
 * Explanation: The purpose of collecting virtual data is to determine whether virtual data is used in a method instance.
 * Includes the following forms:
 * useSQRequest((vDataId) => createMethod({ vDataId }) //Reference function parameters
 * useSQRequest(() => createMethod({ vDataId }) //Directly reference scope parameters
 *
 * Or even:
 * function createMethod(obj) {
 *   return alovaInst.Get('/list', {
 *     params: { status: obj.vDataId ? 1 : 0 }
 *   })
 * }
 * useSQRequest(() => createMethod(obj) //Directly reference scope parameters
 *
 * Ways to use dummy data include:
 * 1. Directly assign values as parameters
 * 2. Use dummy data id
 * 3. Indirect use of virtual data, such as
 *    vData ? 1 : 0
 *    !!vData
 *    vData+1
 *    etc. as calculation parameters.
 */
let vDataIdCollectBasket;
const setVDataIdCollectBasket = (value) => {
    vDataIdCollectBasket = value;
};
/**
 * The dependent alova instance, its storage adapter, request adapter, etc. will be used to access the SilentMethod instance and send silent submissions
 */
let dependentAlovaInstance;
const setDependentAlova = (alovaInst) => {
    dependentAlovaInstance = alovaInst;
};
/**
 * Set up a custom serializer
 */
let customSerializers = {};
const setCustomSerializers = (serializers = {}) => {
    customSerializers = serializers;
};
/**
 * silentFactory status
 * 0 means not started
 * 1 means in progress, changed after calling bootSilentFactory
 * 2 indicates that the request failed, that is, when the maximum number of requests is reached according to the retry rules, or when the retry rules are not matched, the request is changed.
 */
let silentFactoryStatus = 0;
const setSilentFactoryStatus = (status) => {
    silentFactoryStatus = status;
};
/**
 * The request waiting time in silentQueue, in milliseconds (ms)
 * It indicates the waiting time of the silentMethod that is about to send the request
 * If not set, or set to 0, the silentMethod request is triggered immediately
 *
 * Tips:
 * 1. When set directly, it is effective for the default queue by default.
 * 2. If you need to set other queue settings, you can specify them as objects, such as:
 * [
 *   Indicates waiting 5000ms for the queue setting request named customName
 *   { name: 'customName', wait: 5000 },
 *
 *   //Indicates that in all queues with the prefix prefix, the request setting with method instance name xxx is set to wait 5000ms
 *   { name: /^prefix/, wait: silentMethod => silentMethod.entity.config.name === 'xxx' ? 5000 : 0 },
 * ]
 *
 * >>> It only works if the request succeeds, if it fails it will use the retry policy parameters
 */
let queueRequestWaitSetting = [];
const setQueueRequestWaitSetting = (requestWaitSetting = 0) => {
    queueRequestWaitSetting = shared.isArray(requestWaitSetting)
        ? requestWaitSetting
        : [
            {
                queue: DEFAULT_QUEUE_NAME,
                wait: requestWaitSetting
            }
        ];
};
const BootEventKey = Symbol('GlobalSQBoot');
const BeforeEventKey = Symbol('GlobalSQBefore');
const SuccessEventKey = Symbol('GlobalSQSuccess');
const ErrorEventKey = Symbol('GlobalSQError');
const FailEventKey$1 = Symbol('GlobalSQFail');
/** Global silent event management object */
const globalSQEventManager = shared.createEventManager();
/** Silent assert */
const silentAssert = shared.createAssert('useSQRequest');

/**
 * Update the status of the corresponding method
 * @param method request method object
 * @param handleUpdate update callback
 * @returns Whether the update is successful or not. If the corresponding status is not found, the update will not be successful.
 */
async function updateState(matcher, handleUpdate) {
    let updated = shared.falseValue;
    // Only process the first method instance that meets the conditions. If there is no instance that meets the conditions, it will not be processed.
    if (matcher) {
        const { update } = alova.promiseStatesHook();
        const methodKey = shared.getMethodInternalKey(matcher);
        const { id } = shared.getContext(matcher);
        const hookInstances = getStateCache(id, methodKey);
        const updateStateCollection = shared.isFn(handleUpdate)
            ? { data: handleUpdate }
            : handleUpdate;
        const updatePromises = shared.mapItem(hookInstances, async (hookInstance) => {
            let updatedDataColumnData = shared.undefinedValue;
            if (hookInstance) {
                const { ms: mergedStates, ro: referingObject } = hookInstance;
                // Loop through the updated data and assign it to the supervised state
                shared.forEach(shared.objectKeys(updateStateCollection), stateName => {
                    coreAssert(stateName in mergedStates, `state named \`${stateName}\` is not found`);
                    const targetStateProxy = mergedStates[stateName];
                    let updatedData = updateStateCollection[stateName](targetStateProxy.v);
                    // shallow clone the updatedData so that can effect in react.
                    updatedData = shared.isArray(updatedData)
                        ? [...updatedData]
                        : shared.isObject(updatedData)
                            ? { ...updatedData }
                            : updatedData;
                    // Record the updated value of the data field, used to update cached data
                    if (stateName === 'data') {
                        updatedDataColumnData = updatedData;
                    }
                    // Update directly using update without checking referring object.tracked keys
                    update(updatedData, mergedStates[stateName].s, stateName, referingObject);
                });
            }
            // If data is updated, cache and persistent data need to be updated at the same time
            if (updatedDataColumnData !== shared.undefinedValue) {
                await alova.setCache(matcher, updatedDataColumnData);
            }
        });
        if (shared.len(updatePromises) > 0) {
            await shared.PromiseCls.all(updatePromises);
            updated = shared.trueValue;
        }
    }
    return updated;
}

var dateSerializer = {
    forward: data => (shared.instanceOf(data, Date) ? data.getTime() : shared.undefinedValue),
    backward: ts => shared.newInstance(Date, ts)
};

var regexpSerializer = {
    forward: data => (shared.instanceOf(data, RegExp) ? data.source : undefined),
    backward: source => shared.newInstance(RegExp, source)
};

const createSerializerPerformer = (customSerializers = {}) => {
    /**
     * Merge built-in serializers and custom serializers
     */
    const serializers = {
        date: dateSerializer,
        regexp: regexpSerializer,
        ...customSerializers
    };
    /**
     * serialized data
     */
    const serialize = (payload) => {
        if (shared.isObject(payload)) {
            const { data } = shared.walkObject({ data: payload }, value => {
                let finallyApplySerializerName = shared.undefinedValue;
                // Find a matching serializer and serialize the value. If not found, return the original value.
                const serializedValue = shared.objectKeys(serializers).reduce((currentValue, serializerName) => {
                    if (!finallyApplySerializerName) {
                        const serializedValueItem = serializers[serializerName].forward(currentValue);
                        if (serializedValueItem !== shared.undefinedValue) {
                            finallyApplySerializerName = serializerName;
                            currentValue = serializedValueItem;
                        }
                    }
                    return currentValue;
                }, value);
                // You need to use the original value to judge, otherwise packaging classes such as new Number(1) will also be [object Object]
                const toStringTag = shared.ObjectCls.prototype.toString.call(value);
                if (toStringTag === '[object Object]') {
                    value = { ...value };
                }
                else if (shared.isArray(value)) {
                    value = [...value];
                }
                return finallyApplySerializerName !== shared.undefinedValue ? [finallyApplySerializerName, serializedValue] : value;
            });
            payload = data;
        }
        return payload;
    };
    /**
     * Deserialize data
     */
    const deserialize = (payload) => {
        if (shared.isObject(payload)) {
            return shared.walkObject({ data: payload }, value => {
                if (shared.isArray(value) && shared.len(value) === 2) {
                    const foundSerializer = serializers[value[0]];
                    value = foundSerializer ? foundSerializer.backward(value[1]) : value;
                }
                return value;
            }, shared.falseValue).data;
        }
        return payload;
    };
    return {
        serialize,
        deserialize
    };
};

const symbolVDataId = Symbol('vdid');
const symbolOriginal = Symbol('original');
const regVDataId = /\[vd:([0-9a-z]+)\]/;

/**
 * Unified vData collection function
 * It will be called in the following 4 places
 * 1. When accessing sub-properties
 * 2. When participating in calculation and triggering [Symbol.toPrimitive]
 * 3. When getting the id of vData
 * 4. When getting its original value
 *
 * @param returnValue Return value, if it is a function then call it
 * @returns collection function
 */
const vDataCollectUnified = (target) => {
    const vDataId = target === null || target === void 0 ? void 0 : target[symbolVDataId];
    vDataId && vDataIdCollectBasket && (vDataIdCollectBasket[vDataId] = shared.undefinedValue);
};
// export const vDataGetter = (key: string) => vDataCollectGetter((thisObj: any) => thisObj.__proto__[key].call(thisObj));

/**
 * Dummy data is stringified. If the parameter is not dummy data, the original data is returned.
 * @param target dummy data
 * @param returnOriginalIfNotVData If it is not virtual data, return the original value.
 * @returns Virtual data id or original data
 */
const stringifyVData = (target, returnOriginalIfNotVData = shared.trueValue) => {
    vDataCollectUnified(target);
    const vDataIdRaw = target === null || target === void 0 ? void 0 : target[symbolVDataId];
    const vDataId = vDataIdRaw ? `[vd:${vDataIdRaw}]` : shared.undefinedValue;
    return vDataId || (returnOriginalIfNotVData ? target : shared.undefinedValue);
};
/**
 * Create a getter function for virtual data id collection
 * @param valueReturnFn return value function
 * @returns getter function
 */
function stringifyWithThis() {
    return stringifyVData(this);
}

/**
 * Null wrapper class implementation
 */
const Null = function Null() { };
Null.prototype = shared.ObjectCls.create(shared.nullValue, {
    [STR_VALUE_OF]: shared.valueObject(stringifyWithThis)
});

/**
 * Undefined wrapper class implementation
 */
const Undefined = function Undefined() { };
Undefined.prototype = shared.ObjectCls.create(shared.nullValue, {
    [STR_VALUE_OF]: shared.valueObject(stringifyWithThis)
});

/**
 * Create dummy response data
 * @returns Virtual response data proxy instance
 */
var createVirtualResponse = (structure, vDataId = shared.uuid()) => {
    const transform2VData = (value, vDataIdInner = shared.uuid()) => {
        if (value === shared.nullValue) {
            value = shared.newInstance(Null);
        }
        else if (value === shared.undefinedValue) {
            value = shared.newInstance(Undefined);
        }
        else {
            const newValue = shared.ObjectCls(value);
            shared.defineProperty(newValue, STR_VALUE_OF, stringifyWithThis);
            shared.defineProperty(newValue, symbolOriginal, value);
            value = newValue;
        }
        shared.defineProperty(value, symbolVDataId, vDataIdInner);
        return value;
    };
    const virtualResponse = transform2VData(structure, vDataId);
    if (shared.isPlainObject(virtualResponse) || shared.isArray(virtualResponse)) {
        shared.walkObject(virtualResponse, value => transform2VData(value));
    }
    return virtualResponse;
};

/**
 * Get original value of variable with dummy data
 * This function will also perform vData collection
 * @param target target value
 * @param deepDehydrate Whether the depth of dehydration value
 * @returns target value with primitive type
 */
const dehydrateVDataUnified = (target, deepDehydrate = shared.trueValue) => {
    const dehydrateItem = (value) => {
        vDataCollectUnified(value);
        if (value === null || value === void 0 ? void 0 : value[symbolVDataId]) {
            if (shared.instanceOf(value, Undefined)) {
                value = shared.undefinedValue;
            }
            else if (shared.instanceOf(value, Null)) {
                value = shared.nullValue;
            }
            else if (shared.instanceOf(value, Number) || shared.instanceOf(value, String) || shared.instanceOf(value, Boolean)) {
                value = value[symbolOriginal];
            }
        }
        return value;
    };
    const newTarget = dehydrateItem(target);
    // If it is an object or array, deep traversal is required to obtain the virtual data value.
    if (deepDehydrate && (shared.isObject(newTarget) || shared.isArray(newTarget))) {
        shared.walkObject(newTarget, value => dehydrateItem(value));
    }
    return newTarget;
};
/**
 * The version above where deepDehydrate is true
 */
var dehydrateVData = (target) => dehydrateVDataUnified(target);

const vDataKey = '__$k';
const vDataValueKey = '__$v';
const getAlovaStorage = () => {
    // Provide prompt when silent factory is not started
    silentAssert(!!dependentAlovaInstance, 'alova instance is not found, Do you forget to set `alova` or call `bootSilentFactory`?');
    return dependentAlovaInstance.l2Cache;
};
let serializerPerformer = shared.undefinedValue;
const silentMethodIdQueueMapStorageKey = 'alova.SQ'; // Queue collection cache key composed of Silent method instance id
const silentMethodStorageKeyPrefix = 'alova.SM.'; // silentMethod instance cache key prefix
/**
 * Persistence of data collections with dummy data and serializable data
 * @param key persistence key
 * @param payload Persistent data
 */
const storageSetItem = async (key, payload) => {
    const storage = getAlovaStorage();
    if (shared.isObject(payload)) {
        payload = shared.walkObject(shared.isArray(payload) ? [...payload] : { ...payload }, (value, key, parent) => {
            var _a;
            if (key === vDataValueKey && parent[vDataKey]) {
                return value;
            }
            // If a silent method instance is serialized, the alova instance is filtered out
            if (key === 'context' && ((_a = value === null || value === void 0 ? void 0 : value.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'Alova') {
                return shared.undefinedValue;
            }
            const vDataId = value === null || value === void 0 ? void 0 : value[symbolVDataId];
            let primitiveValue = dehydrateVDataUnified(value, shared.falseValue);
            // You need to use the original value to judge, otherwise packaging classes such as new Number(1) will also be [object Object]
            const toStringTag = shared.globalToString(primitiveValue);
            if (toStringTag === '[object Object]') {
                value = { ...value };
                primitiveValue = {};
            }
            else if (shared.isArray(value)) {
                value = [...value];
                primitiveValue = [];
            }
            if (vDataId) {
                const valueWithVData = {
                    [vDataKey]: vDataId,
                    // For objects and arrays, all their internal properties will be put to the outside through `...value`, so the internal ones do not need to be traversed and converted.
                    // Therefore, empty the array or object to avoid repeated conversions and contamination of the original object.
                    [vDataValueKey]: primitiveValue,
                    ...value
                };
                // If it is a string type, there will be items like arrays such as 0, 1, and 2 as subscripts and values as characters, and they need to be filtered out.
                if (shared.instanceOf(value, String)) {
                    for (let i = 0; i < shared.len(value); i += 1) {
                        valueWithVData === null || valueWithVData === void 0 ? true : delete valueWithVData[i];
                    }
                }
                // If it is converted into virtual data, the converted value is assigned to it internally, and is uniformly processed by value in the following logic.
                value = valueWithVData;
            }
            return value;
        });
    }
    serializerPerformer = serializerPerformer || createSerializerPerformer(customSerializers);
    await storage.set(key, serializerPerformer.serialize(payload));
};
/**
 * Take out the persistent data and convert the data into virtual data and serialized data
 * @param key Key to persistent data
 */
const storageGetItem = async (key) => {
    const storagedResponse = await getAlovaStorage().get(key);
    serializerPerformer = serializerPerformer || createSerializerPerformer(customSerializers);
    return shared.isObject(storagedResponse)
        ? shared.walkObject(serializerPerformer.deserialize(storagedResponse), value => {
            // Convert virtual data format back to virtual data instance
            if (shared.isObject(value) && (value === null || value === void 0 ? void 0 : value[vDataKey])) {
                const vDataId = value[vDataKey];
                const vDataValue = createVirtualResponse(value[vDataValueKey], vDataId);
                shared.forEach(shared.objectKeys(value), key => {
                    if (!shared.includes([vDataKey, vDataValueKey], key)) {
                        vDataValue[key] = value[key];
                    }
                });
                value = vDataValue;
            }
            return value;
        }, shared.falseValue)
        : storagedResponse;
};
/**
 * Remove persistent data
 * @param key Key to persistent data
 */
const storageRemoveItem = async (key) => {
    await getAlovaStorage().remove(key);
};

/**
 * Serialize and save silentMethod instance
 * @param silentMethodInstance silentMethod instance
 */
const persistSilentMethod = (silentMethodInstance) => storageSetItem(silentMethodStorageKeyPrefix + silentMethodInstance.id, silentMethodInstance);
/**
 * Put the configuration information of silent request into the corresponding storage
 * Logic: Construct a key and use this key to put the configuration information of the silent method into the corresponding storage, and then store the key in the unified management key storage.
 * @param silentMethod SilentMethodInstance
 * @param queue Operation queue name
 */
const push2PersistentSilentQueue = async (silentMethodInstance, queueName) => {
    await persistSilentMethod(silentMethodInstance);
    // Save the silent method instance id to queue storage
    const silentMethodIdQueueMap = ((await storageGetItem(silentMethodIdQueueMapStorageKey)) ||
        {});
    const currentQueue = (silentMethodIdQueueMap[queueName] = silentMethodIdQueueMap[queueName] || []);
    shared.pushItem(currentQueue, silentMethodInstance.id);
    await storageSetItem(silentMethodIdQueueMapStorageKey, silentMethodIdQueueMap);
};
/**
 * Remove or replace silentMethod instances in the cache
 * @param queue Operation queue name
 * @param targetSilentMethodId Target silentMethod instance id
 * @param newSilentMethod The new silentMethod instance to replace. If not passed, it means deleted.
 */
const spliceStorageSilentMethod = async (queueName, targetSilentMethodId, newSilentMethod) => {
    // Remove the silent method instance id from the queue
    const silentMethodIdQueueMap = ((await storageGetItem(silentMethodIdQueueMapStorageKey)) ||
        {});
    const currentQueue = silentMethodIdQueueMap[queueName] || [];
    const index = currentQueue.findIndex(id => id === targetSilentMethodId);
    if (index >= 0) {
        if (newSilentMethod) {
            shared.splice(currentQueue, index, 1, newSilentMethod.id);
            await persistSilentMethod(newSilentMethod);
        }
        else {
            shared.splice(currentQueue, index, 1);
        }
        await storageRemoveItem(silentMethodStorageKeyPrefix + targetSilentMethodId);
        // Delete this queue when it is empty
        shared.len(currentQueue) <= 0 && delete silentMethodIdQueueMap[queueName];
        if (shared.len(shared.objectKeys(silentMethodIdQueueMap)) > 0) {
            await storageSetItem(silentMethodIdQueueMapStorageKey, silentMethodIdQueueMap);
        }
        else {
            // Remove the queue collection when it is empty
            await storageRemoveItem(silentMethodIdQueueMapStorageKey);
        }
    }
};

/** Silent method queue collection */
let silentQueueMap = {};
/**
 * Merge queueMap into silentMethod queue collection
 * @param queueMap silentMethod queue collection
 */
const merge2SilentQueueMap = (queueMap) => {
    shared.forEach(shared.objectKeys(queueMap), targetQueueName => {
        const currentQueue = (silentQueueMap[targetQueueName] = silentQueueMap[targetQueueName] || []);
        shared.pushItem(currentQueue, ...queueMap[targetQueueName]);
    });
};
/**
 * Deeply traverse the target data and replace dummy data with real data
 * @param target target data
 * @param vDataResponse Collection of dummy data and real data
 * @returns Is there any replacement data?
 */
const deepReplaceVData = (target, vDataResponse) => {
    // Search for a single value and replace a dummy data object or dummy data id with an actual value
    const replaceVData = (value) => {
        const vData = stringifyVData(value);
        // If directly a dummy data object and in a vDataResponse, replace the Map with the value in the vDataResponse
        // If it is a string, it may contain virtual data id and in vDataResponse, it also needs to be replaced with the actual value Map
        // The virtual data not in this vDataResponse will remain unchanged. It may be the virtual data Map requested next time.
        if (vData in vDataResponse) {
            return vDataResponse[vData];
        }
        if (shared.isString(value)) {
            return value.replace(shared.newInstance(shared.RegExpCls, regVDataId.source, 'g'), mat => mat in vDataResponse ? vDataResponse[mat] : mat);
        }
        return value;
    };
    if (shared.isObject(target) && !stringifyVData(target, shared.falseValue)) {
        shared.walkObject(target, replaceVData);
    }
    else {
        target = replaceVData(target);
    }
    return target;
};
/**
 * Update the method instance in the queue and replace the dummy data with actual data
 * @param vDataResponse A collection of virtual IDs and corresponding real data
 * @param targetQueue target queue
 */
const updateQueueMethodEntities = (vDataResponse, targetQueue) => shared.PromiseCls.all(shared.mapItem(targetQueue, async (silentMethodItem) => {
    // Traverse the entity object deeply. If virtual data or virtual data ID is found, replace it with actual data.
    deepReplaceVData(silentMethodItem.entity, vDataResponse);
    // If the method instance is updated, re-persist this silent method instance
    silentMethodItem.cache && (await persistSilentMethod(silentMethodItem));
}));
/**
 * Replace dummy data with response data
 * @param response real response data
 * @param virtualResponse dummy response data
 * @returns The corresponding real data set composed of virtual data id
 */
const replaceVirtualResponseWithResponse = (virtualResponse, response) => {
    let vDataResponse = {};
    const vDataId = stringifyVData(virtualResponse, shared.falseValue);
    vDataId && (vDataResponse[vDataId] = response);
    if (shared.isObject(virtualResponse)) {
        for (const i in virtualResponse) {
            vDataResponse = {
                ...vDataResponse,
                ...replaceVirtualResponseWithResponse(virtualResponse[i], response === null || response === void 0 ? void 0 : response[i])
            };
        }
    }
    return vDataResponse;
};
/**
 * Start the SilentMethod queue
 * 1. Silent submission will be put into the queue and requests will be sent in order. Only after the previous request responds will it continue to send subsequent requests.
 * 2. The number of retries is only triggered when there is no response. If the server responds incorrectly or is disconnected, it will not retry.
 * 3. When the number of retries is reached and still fails, when nextRound (next round) is set, delay the time specified by nextRound and then request again, otherwise it will try again after refreshing.
 * 4. If there is resolveHandler and rejectHandler, they will be called after the request is completed (whether successful or failed) to notify the corresponding request to continue responding.
 *
 * @param queue SilentMethodqueue
 */
const setSilentMethodActive = (silentMethodInstance, active) => {
    if (active) {
        silentMethodInstance.active = active;
    }
    else {
        delete silentMethodInstance.active;
    }
};
const defaultBackoffDelay = 1000;
const bootSilentQueue = (queue, queueName) => {
    /**
     * The callback function is controlled by waiting parameters according to the request. If it is not set or is less than or equal to 0, it will be triggered immediately.
     * @param queueName queue name
     * @param callback callback function
     */
    const emitWithRequestDelay = (queueName) => {
        const nextSilentMethod = queue[0];
        if (nextSilentMethod) {
            const targetSetting = queueRequestWaitSetting.find(({ queue }) => shared.instanceOf(queue, shared.RegExpCls) ? shared.regexpTest(queue, queueName) : queue === queueName);
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const callback = () => queue[0] && silentMethodRequest(queue[0]);
            const delay = (targetSetting === null || targetSetting === void 0 ? void 0 : targetSetting.wait) ? shared.sloughConfig(targetSetting.wait, [nextSilentMethod, queueName]) : 0;
            delay && delay > 0 ? shared.setTimeoutFn(callback, delay) : callback();
        }
    };
    /**
     * Run a single silentMethod instance
     * @param silentMethodInstance silentMethod instance
     * @param retryTimes Number of retries
     */
    const silentMethodRequest = (silentMethodInstance, retryTimes = 0) => {
        // Set the current silent method instance to active status
        setSilentMethodActive(silentMethodInstance, shared.trueValue);
        const { cache, id, behavior, entity, retryError = /.*/, maxRetryTimes = 0, backoff = { delay: defaultBackoffDelay }, resolveHandler = shared.noop, rejectHandler = shared.noop, emitter: methodEmitter, handlerArgs = [], virtualResponse, force } = silentMethodInstance;
        // Trigger pre-request event
        globalSQEventManager.emit(BeforeEventKey, shared.newInstance((GlobalSQEvent), behavior, entity, silentMethodInstance, queueName, retryTimes));
        shared.promiseThen(entity.send(force), async (data) => {
            // The request is successful, remove the successful silent method, and continue with the next request
            shared.shift(queue);
            // If the request is successful, remove the successful silent method instance from storage and continue with the next request.
            cache && (await spliceStorageSilentMethod(queueName, id));
            // If there is a resolve handler, call it to notify the outside
            resolveHandler(data);
            // Only when there is a virtualResponse, virtual data is traversed and replaced, and global events are triggered.
            // Generally, it is silent behavior, but queue behavior is not required.
            if (behavior === BEHAVIOR_SILENT) {
                // Replace dummy data in subsequent method instances in the queue with real data
                // Only after unlocking can you access the hierarchical structure of virtualResponse normally.
                const vDataResponse = replaceVirtualResponseWithResponse(virtualResponse, data);
                const { targetRefMethod, updateStates } = silentMethodInstance; // It is accurate to obtain it in real time
                // If this silentMethod has targetRefMethod, call updateState again to update the data
                // This is an implementation of delayed data updates
                if (shared.instanceOf(targetRefMethod, alova.Method) && updateStates && shared.len(updateStates) > 0) {
                    const updateStateCollection = {};
                    shared.forEach(updateStates, stateName => {
                        // After the request is successful, replace the data with dummy data with real data
                        updateStateCollection[stateName] = dataRaw => deepReplaceVData(dataRaw, vDataResponse);
                    });
                    const updated = updateState(targetRefMethod, updateStateCollection);
                    // If the status modification is unsuccessful, modify the cached data.
                    if (!updated) {
                        await alova.setCache(targetRefMethod, (dataRaw) => deepReplaceVData(dataRaw, vDataResponse));
                    }
                }
                // Perform dummy data replacement on subsequent silent method instances of the current queue
                await updateQueueMethodEntities(vDataResponse, queue);
                // Trigger global success event
                globalSQEventManager.emit(SuccessEventKey, shared.newInstance((GlobalSQSuccessEvent), behavior, entity, silentMethodInstance, queueName, retryTimes, data, vDataResponse));
            }
            // Set to inactive state
            setSilentMethodActive(silentMethodInstance, shared.falseValue);
            // Continue to the next silent method processing
            emitWithRequestDelay(queueName);
        }, reason => {
            if (behavior !== BEHAVIOR_SILENT) {
                // When the behavior is not silent and the request fails, rejectHandler is triggered.
                // and removed from the queue and will not be retried.
                shared.shift(queue);
                rejectHandler(reason);
            }
            else {
                // Each request error will trigger an error callback
                const runGlobalErrorEvent = (retryDelay) => globalSQEventManager.emit(ErrorEventKey, shared.newInstance((GlobalSQErrorEvent), behavior, entity, silentMethodInstance, queueName, retryTimes, reason, retryDelay));
                // In silent behavior mode, determine whether retry is needed
                // Retry is only effective when the response error matches the retryError regular match
                const { name: errorName = '', message: errorMsg = '' } = reason || {};
                let regRetryErrorName;
                let regRetryErrorMsg;
                if (shared.instanceOf(retryError, RegExp)) {
                    regRetryErrorMsg = retryError;
                }
                else if (shared.isObject(retryError)) {
                    regRetryErrorName = retryError.name;
                    regRetryErrorMsg = retryError.message;
                }
                const matchRetryError = (regRetryErrorName && shared.regexpTest(regRetryErrorName, errorName)) ||
                    (regRetryErrorMsg && shared.regexpTest(regRetryErrorMsg, errorMsg));
                // If there are still retry times, try again
                if (retryTimes < maxRetryTimes && matchRetryError) {
                    // The next retry times need to be used to calculate the delay time, so +1 is needed here.
                    const retryDelay = shared.delayWithBackoff(backoff, retryTimes + 1);
                    runGlobalErrorEvent(retryDelay);
                    shared.setTimeoutFn(() => {
                        retryTimes += 1;
                        silentMethodRequest(silentMethodInstance, retryTimes);
                        methodEmitter.emit('retry', shared.newInstance((ScopedSQRetryEvent), behavior, entity, silentMethodInstance, handlerArgs, retryTimes, retryDelay));
                    }, 
                    // When there are still retry times, use timeout as the next request time.
                    retryDelay);
                }
                else {
                    setSilentFactoryStatus(2);
                    runGlobalErrorEvent();
                    // When the number of failures is reached, or the error message does not match the retry, the failure callback is triggered.
                    methodEmitter.emit('fallback', shared.newInstance((ScopedSQErrorEvent), behavior, entity, silentMethodInstance, handlerArgs, reason));
                    globalSQEventManager.emit(FailEventKey$1, shared.newInstance((GlobalSQFailEvent), behavior, entity, silentMethodInstance, queueName, retryTimes, reason));
                }
            }
            // Set to inactive state
            setSilentMethodActive(silentMethodInstance, shared.falseValue);
        });
    };
    emitWithRequestDelay(queueName);
};
/**
 * Put a new silentMethod instance into the queue
 * @param silentMethodInstance silentMethod instance
 * @param cache Does silentMethod have cache?
 * @param targetQueueName target queue name
 * @param onBeforePush Events before silentMethod instance push
 */
const pushNewSilentMethod2Queue = async (silentMethodInstance, cache, targetQueueName = DEFAULT_QUEUE_NAME, onBeforePush = () => []) => {
    silentMethodInstance.cache = cache;
    const currentQueue = (silentQueueMap[targetQueueName] =
        silentQueueMap[targetQueueName] || []);
    const isNewQueue = shared.len(currentQueue) <= 0;
    const beforePushReturns = await Promise.all(onBeforePush());
    const isPush2Queue = !beforePushReturns.some(returns => returns === shared.falseValue);
    // Under silent behavior, if there is no fallback event callback bound, it will be persisted.
    // If false is returned in onBeforePushQueue, it will no longer be placed in the queue.
    if (isPush2Queue) {
        cache && (await push2PersistentSilentQueue(silentMethodInstance, targetQueueName));
        shared.pushItem(currentQueue, silentMethodInstance);
        // If it is a new queue and the status is started, execute it
        isNewQueue && silentFactoryStatus === 1 && bootSilentQueue(currentQueue, targetQueueName);
    }
    return isPush2Queue;
};

/**
 * Locate the location of the silentMethod instance
 * @param silentMethodInstance silentMethod instance
 */
const getBelongQueuePosition = (silentMethodInstance) => {
    let queue = shared.undefinedValue;
    let queueName = '';
    let position = 0;
    for (const queueNameLoop in silentQueueMap) {
        position = silentQueueMap[queueNameLoop].indexOf(silentMethodInstance);
        if (position >= 0) {
            queue = silentQueueMap[queueNameLoop];
            queueName = queueNameLoop;
            break;
        }
    }
    return [queue, queueName, position];
};
/**
 * silentMethod instance
 * Requests that need to enter silentQueue will be packaged into silentMethod instances, which will carry various parameters of the request strategy.
 */
class SilentMethod {
    constructor(entity, behavior, emitter, id = shared.uuid(), force, retryError, maxRetryTimes, backoff, resolveHandler, rejectHandler, handlerArgs, vDatas) {
        const thisObj = this;
        thisObj.entity = entity;
        thisObj.behavior = behavior;
        thisObj.id = id;
        thisObj.emitter = emitter;
        thisObj.force = !!force;
        thisObj.retryError = retryError;
        thisObj.maxRetryTimes = maxRetryTimes;
        thisObj.backoff = backoff;
        thisObj.resolveHandler = resolveHandler;
        thisObj.rejectHandler = rejectHandler;
        thisObj.handlerArgs = handlerArgs;
        thisObj.vDatas = vDatas;
    }
    /**
     * Allow cache-time persistent updates to the current instance
     */
    async save() {
        this.cache && (await persistSilentMethod(this));
    }
    /**
     * Replace the current instance with a new silentMethod instance in the queue
     * If there is a persistent cache, the cache will also be updated.
     * @param newSilentMethod new silentMethod instance
     */
    async replace(newSilentMethod) {
        const targetSilentMethod = this;
        silentAssert(newSilentMethod.cache === targetSilentMethod.cache, 'the cache of new silentMethod must equal with this silentMethod');
        const [queue, queueName, position] = getBelongQueuePosition(targetSilentMethod);
        if (queue) {
            shared.splice(queue, position, 1, newSilentMethod);
            targetSilentMethod.cache && (await spliceStorageSilentMethod(queueName, targetSilentMethod.id, newSilentMethod));
        }
    }
    /**
     * Remove the current instance. If there is persistent data, it will also be removed synchronously.
     */
    async remove() {
        const targetSilentMethod = this;
        const [queue, queueName, position] = getBelongQueuePosition(targetSilentMethod);
        if (queue) {
            shared.splice(queue, position, 1);
            targetSilentMethod.cache && (await spliceStorageSilentMethod(queueName, targetSilentMethod.id));
        }
    }
    /**
     * Set the method instance corresponding to the delayed update status and the corresponding status name
     * It will find the corresponding status data and update vData to the actual data after responding to this silentMethod
     *
     * @param method method instance
     * @param updateStateName Updated status name, the default is data, you can also set multiple
     */
    setUpdateState(method, updateStateName = 'data') {
        if (method) {
            this.targetRefMethod = method;
            this.updateStates = shared.isArray(updateStateName) ? updateStateName : [updateStateName];
        }
    }
}

/**
 * Deserialize the silentMethod instance according to the name of the serializer.
 * @param methodInstance Request method instance
 * @returns Request method instance
 */
var convertPayload2SilentMethod = (payload) => {
    const { id, behavior, entity, retryError, maxRetryTimes, backoff, resolveHandler, rejectHandler, handlerArgs, targetRefMethod, force } = payload;
    // Method class instantiation
    const deserializeMethod = (methodPayload) => {
        const { type, url, config, data } = methodPayload;
        return shared.newInstance(alova.Method, type, dependentAlovaInstance, url, config, data);
    };
    const silentMethodInstance = shared.newInstance(SilentMethod, deserializeMethod(entity), behavior, shared.createEventManager(), id, force, retryError, maxRetryTimes, backoff, resolveHandler, rejectHandler, handlerArgs);
    silentMethodInstance.cache = shared.trueValue;
    // Target ref method deserialization
    if (targetRefMethod) {
        silentMethodInstance.targetRefMethod = deserializeMethod(targetRefMethod);
    }
    // Put extra content on the silent method instance
    shared.forEach(shared.objectKeys(payload), key => {
        if (!shared.includes([
            'id',
            'behavior',
            'emitter',
            'entity',
            'retryError',
            'maxRetryTimes',
            'backoff',
            'resolveHandler',
            'rejectHandler',
            'handlerArgs',
            'targetRefMethod',
            'force'
        ], key)) {
            silentMethodInstance[key] = payload[key];
        }
    });
    return silentMethodInstance;
};

/**
 * Load silent queue data from storage
 * @returns All queue data
 */
var loadSilentQueueMapFromStorage = async () => {
    const silentMethodIdQueueMap = ((await storageGetItem(silentMethodIdQueueMapStorageKey)) ||
        {});
    const silentQueueMap = {};
    const readingPromises = [];
    shared.forEach(shared.objectKeys(silentMethodIdQueueMap), queueName => {
        const currentQueue = (silentQueueMap[queueName] = silentQueueMap[queueName] || []);
        shared.pushItem(readingPromises, ...shared.mapItem(silentMethodIdQueueMap[queueName], async (silentMethodId) => {
            const serializedSilentMethodPayload = await storageGetItem(silentMethodStorageKeyPrefix + silentMethodId);
            serializedSilentMethodPayload &&
                shared.pushItem(currentQueue, convertPayload2SilentMethod(serializedSilentMethodPayload));
        }));
    });
    await shared.PromiseCls.all(readingPromises);
    return silentQueueMap;
};

/**
 * Bind silentSubmit startup event
 * @param {SilentSubmitBootHandler} handler event callback function
 * @returns unbind function
 */
const onSilentSubmitBoot = (handler) => globalSQEventManager.on(BootEventKey, handler);
/**
 * Bind silentSubmit success event
 * @param {SilentSubmitSuccessHandler} handler event callback function
 * @returns unbind function
 */
const onSilentSubmitSuccess = (handler) => globalSQEventManager.on(SuccessEventKey, handler);
/**
 * Bind silentSubmit error event
 * Every time there is a request error, an error callback is triggered.
 * @param {SilentSubmitErrorHandler} handler event callback function
 * @returns unbind function
 */
const onSilentSubmitError = (handler) => globalSQEventManager.on(ErrorEventKey, handler);
/**
 * Binding silentSubmit failure event
 * The failure event will be triggered when the maximum number of requests is reached, or when the error message does not match
 * @param {SilentSubmitFailHandler} handler event callback function
 * @returns unbind function
 */
const onSilentSubmitFail = (handler) => globalSQEventManager.on(FailEventKey$1, handler);
/**
 * Bind silentSubmit to initiate a pre-request event
 * @param {BeforeSilentSubmitHandler} handler event callback function
 * @returns unbind function
 */
const onBeforeSilentSubmit = (handler) => globalSQEventManager.on(BeforeEventKey, handler);
/**
 * Start silent submission, which will load the silent method in the cache and start silent submission
 * If no delay time is passed in, the sync starts immediately
 * @param {SilentFactoryBootOptions} options Delay in milliseconds
 */
const bootSilentFactory = (options) => {
    if (silentFactoryStatus === 0) {
        const { alova, delay = 500 } = options;
        setDependentAlova(alova);
        setCustomSerializers(options.serializers);
        setQueueRequestWaitSetting(options.requestWait);
        shared.setTimeoutFn(async () => {
            // Delayed loading puts the page’s queue at the front
            merge2SilentQueueMap(await loadSilentQueueMapFromStorage());
            // Loop start queue silent submission
            // Multiple queues are executed in parallel
            shared.forEach(shared.objectKeys(silentQueueMap), queueName => {
                bootSilentQueue(silentQueueMap[queueName], queueName);
            });
            setSilentFactoryStatus(1); // Set status to Started
            globalSQEventManager.emit(BootEventKey, shared.undefinedValue);
        }, delay);
    }
};

/**
 * A global silentMethod instance that will have a value from before the first success event is triggered to after the last success event is triggered (synchronization period)
 * In this way, the current silentMethod instance can be obtained in updateStateEffect in onSuccess.
 */
let currentSilentMethod = shared.undefinedValue;
/**
 * Create SilentQueue middleware function
 * @param config Configuration object
 * @returns middleware function
 */
var createSilentQueueMiddlewares = (handler, config) => {
    const { behavior = 'queue', queue = DEFAULT_QUEUE_NAME, retryError, maxRetryTimes, backoff } = config || {};
    const eventEmitter = shared.createEventManager();
    let handlerArgs;
    let behaviorFinally;
    let queueFinally = DEFAULT_QUEUE_NAME;
    let forceRequest = shared.falseValue;
    let silentMethodInstance;
    /**
     * method instance creation function
     * @param args Call the function passed in by send
     * @returns method instance
     */
    const createMethod = (...args) => {
        silentAssert(shared.isFn(handler), 'method handler must be a function. eg. useSQRequest(() => method)');
        setVDataIdCollectBasket({});
        handlerArgs = args;
        return handler(...args);
    };
    // Decorate success/error/complete event
    const decorateRequestEvent = (requestExposure) => {
        // Set event callback decorator
        requestExposure.onSuccess = shared.decorateEvent(requestExposure.onSuccess, (handler, event) => {
            currentSilentMethod = silentMethodInstance;
            handler(shared.newInstance((ScopedSQSuccessEvent), behaviorFinally, event.method, silentMethodInstance, event.args, event.data));
        });
        requestExposure.onError = shared.decorateEvent(requestExposure.onError, (handler, event) => {
            handler(shared.newInstance((ScopedSQErrorEvent), behaviorFinally, event.method, silentMethodInstance, event.args, event.error));
        });
        requestExposure.onComplete = shared.decorateEvent(requestExposure.onComplete, (handler, event) => {
            handler(shared.newInstance((ScopedSQCompleteEvent), behaviorFinally, event.method, silentMethodInstance, event.args, event.status, event.data, event.error));
        });
    };
    /**
     * middleware function
     * @param context Request context, containing request-related values
     * @param next continue executing function
     * @returns Promise object
     */
    const middleware = ({ method, args, cachedResponse, proxyStates, config }, next) => {
        const { silentDefaultResponse, vDataCaptured, force = shared.falseValue } = config;
        // Because the behavior return value may change, it should be called for each request to re-obtain the return value.
        const baseEvent = AlovaEventBase.spawn(method, args);
        behaviorFinally = shared.sloughConfig(behavior, [baseEvent]);
        queueFinally = shared.sloughConfig(queue, [baseEvent]);
        forceRequest = shared.sloughConfig(force, [baseEvent]);
        // Empty temporary collection variables
        // They need to be cleared before returning
        const resetCollectBasket = () => {
            setVDataIdCollectBasket((handlerArgs = shared.undefinedValue));
        };
        // If v data captured is set, first determine whether the request-related data contains virtual data.
        if (shared.isFn(vDataCaptured)) {
            let hasVData = vDataIdCollectBasket && shared.len(shared.objectKeys(vDataIdCollectBasket)) > 0;
            if (!hasVData) {
                const { url, data } = method;
                const { params, headers } = shared.getConfig(method);
                shared.walkObject({ url, params, data, headers }, value => {
                    if (!hasVData && (stringifyVData(value, shared.falseValue) || shared.regexpTest(regVDataId, value))) {
                        hasVData = shared.trueValue;
                    }
                    return value;
                });
            }
            // If v data captured has return data, use it as the response data, otherwise continue the request
            const customResponse = hasVData ? vDataCaptured(method) : shared.undefinedValue;
            if (customResponse !== shared.undefinedValue) {
                resetCollectBasket(); // Reset when captured by v data captured
                return shared.promiseResolve(customResponse);
            }
        }
        if (behaviorFinally !== BEHAVIOR_STATIC) {
            // Wait for the method in the queue to complete execution
            const createSilentMethodPromise = () => {
                const queueResolvePromise = shared.newInstance(shared.PromiseCls, (resolveHandler, rejectHandler) => {
                    silentMethodInstance = shared.newInstance((SilentMethod), method, behaviorFinally, eventEmitter, shared.undefinedValue, !!forceRequest, retryError, maxRetryTimes, backoff, resolveHandler, rejectHandler, handlerArgs, vDataIdCollectBasket && shared.objectKeys(vDataIdCollectBasket));
                    resetCollectBasket(); // Reset when Behavior is queue and silent
                });
                // On before push and on pushed events are bound synchronously, so they need to be queued asynchronously to trigger the event normally.
                shared.promiseThen(shared.promiseResolve(shared.undefinedValue), async () => {
                    const createPushEvent = () => shared.newInstance((ScopedSQEvent), behaviorFinally, method, silentMethodInstance, args);
                    // Put the silent method into the queue and persist it
                    const isPushed = await pushNewSilentMethod2Queue(silentMethodInstance, 
                    // After the onFallback event is bound, even the silent behavior mode is no longer stored.
                    // onFallback will be called synchronously, so it needs to be determined asynchronously whether there are fallbackHandlers
                    shared.len(eventEmitter.eventMap.fallback || []) <= 0 && behaviorFinally === BEHAVIOR_SILENT, queueFinally, 
                    // Execute the callback before putting it into the queue. If false is returned, it will prevent putting it into the queue.
                    () => eventEmitter.emit('beforePushQueue', createPushEvent()));
                    // Only after putting it into the queue, the callback after putting it into the queue will be executed.
                    isPushed && eventEmitter.emit('pushedQueue', createPushEvent());
                });
                return queueResolvePromise;
            };
            if (behaviorFinally === BEHAVIOR_QUEUE) {
                // Forced request, or loading status needs to be updated when cache is hit
                const needSendRequest = forceRequest || !cachedResponse;
                if (needSendRequest) {
                    // Manually set to true
                    proxyStates.loading.v = shared.trueValue;
                }
                // When using the cache, use the cache directly, otherwise enter the request queue
                return needSendRequest ? createSilentMethodPromise() : shared.promiseThen(shared.promiseResolve(cachedResponse));
            }
            const silentMethodPromise = createSilentMethodPromise();
            // Create virtual response data in silent mode. Virtual response data can generate arbitrary virtual data.
            const virtualResponse = (silentMethodInstance.virtualResponse = createVirtualResponse(shared.isFn(silentDefaultResponse) ? silentDefaultResponse() : shared.undefinedValue));
            shared.promiseThen(silentMethodPromise, realResponse => {
                // Update after obtaining real data
                proxyStates.data.v = realResponse;
            });
            // In Silent mode, the virtual response value is returned immediately, and then updated when the real data is returned.
            return shared.promiseResolve(virtualResponse);
        }
        resetCollectBasket(); // Reset when Behavior is static
        return next();
    };
    return {
        c: createMethod,
        m: middleware,
        d: decorateRequestEvent,
        // event binding function
        b: {
            /**
             * Bind fallback event
             * @param handler Fallback event callback
             */
            onFallback: (handler) => {
                eventEmitter.on('fallback', handler);
            },
            /**
             * Event before binding to queue
             * @param handler Event callback before enqueuing
             */
            onBeforePushQueue: (handler) => {
                eventEmitter.on('beforePushQueue', handler);
            },
            /**
             * Event after binding to queue
             * @param handler Event callback after being queued
             */
            onPushedQueue: (handler) => {
                eventEmitter.on('pushedQueue', handler);
            },
            /**
             * retry event
             * @param handler Retry event callback
             */
            onRetry: (handler) => {
                eventEmitter.on('retry', handler);
            }
        }
    };
};

function useSQRequest(handler, config = {}) {
    const { exposeProvider, __referingObj: referingObj } = statesHookHelper(alova.promiseStatesHook());
    const { middleware = shared.noop } = config;
    const { c: methodCreateHandler, m: silentMiddleware, b: binders, d: decorateEvent } = createSilentQueueMiddlewares(handler, config);
    const states = useRequest(methodCreateHandler, {
        ...config,
        __referingObj: referingObj,
        middleware: (ctx, next) => {
            const silentMidPromise = silentMiddleware(ctx, next);
            middleware(ctx, () => silentMidPromise);
            return silentMidPromise;
        }
    });
    decorateEvent(states);
    return exposeProvider({
        ...states,
        ...binders
    });
}

/**
 * Determine whether two values are equal in a way that is compatible with virtual data
 * @param prevValue Antecedent value
 * @param nextValue consequent value
 * @returns Are they equal?
 */
var equals = (prevValue, nextValue) => {
    // If equal, return directly
    if (prevValue === nextValue) {
        return shared.trueValue;
    }
    return stringifyVData(prevValue) === stringifyVData(nextValue);
};

/**
 * Filter all silentMethod instances that meet the criteria by method name or regular expression
 * @param methodNameMatcher method name matcher
 * @param queueName Find the queue name, the default is default queue
 * @param filterActive Whether to filter out active instances
 * @returns array of silentMethod instances
 */
const filterSilentMethods = async (methodNameMatcher, queueName = DEFAULT_QUEUE_NAME, filterActive = shared.falseValue) => {
    const matchSilentMethods = (targetQueue = []) => targetQueue.filter(silentMethodItem => {
        if (methodNameMatcher === shared.undefinedValue) {
            return shared.trueValue;
        }
        const name = shared.getConfig(silentMethodItem.entity).name || '';
        const retain = shared.instanceOf(methodNameMatcher, RegExp)
            ? shared.regexpTest(methodNameMatcher, name)
            : name === methodNameMatcher;
        return retain && (filterActive ? silentMethodItem.active : shared.trueValue);
    });
    return [
        ...matchSilentMethods(silentQueueMap[queueName]),
        // If the silent factory is not currently started, you also need to match the silent methods in the persistent storage.
        ...(silentFactoryStatus === 0 ? matchSilentMethods((await loadSilentQueueMapFromStorage())[queueName]) : [])
    ];
};
/**
 * Find the first silentMethod instance that meets the condition by method name or regular expression
 * @param methodNameMatcher method name matcher
 * @param queueName Find the queue name, the default is default queue
 * @param filterActive Whether to filter out active instances
 * @returns silentMethod instance, undefined when not found
 */
const getSilentMethod = async (methodNameMatcher, queueName = DEFAULT_QUEUE_NAME, filterActive = shared.falseValue) => (await filterSilentMethods(methodNameMatcher, queueName, filterActive))[0];

/**
 * Determine whether the target data is virtual data
 * @param target target data
 * @returns Is it virtual data?
 */
var isVData = (target) => !!stringifyVData(target, shared.falseValue) || shared.regexpTest(regVDataId, target);

/**
 * Update the status of the corresponding method
 * Unlike updateState, in addition to updating the state immediately, it will also update again after responding in silent mode in order to replace the virtual data with actual data.
 * @param method request method object
 * @param handleUpdate update callback
 */
const updateStateEffect = async (matcher, handleUpdate) => {
    // Save the target method instance to the current silent method instance
    if (currentSilentMethod) {
        currentSilentMethod.setUpdateState(matcher, shared.isFn(updateState) ? shared.undefinedValue : shared.objectKeys(updateState));
        await currentSilentMethod.save();
    }
    return updateState(matcher, handleUpdate);
};

class BaseEvent {
    constructor(type, eventInitDict = {}) {
        var _a, _b, _c;
        // Event standard properties
        this.cancelBubble = shared.falseValue;
        this.currentTarget = shared.nullValue;
        this.defaultPrevented = shared.falseValue;
        this.eventPhase = 0;
        this.isTrusted = shared.falseValue;
        this.returnValue = shared.trueValue;
        this.srcElement = shared.nullValue;
        this.target = shared.nullValue;
        this.NONE = 0;
        this.CAPTURING_PHASE = 1;
        this.AT_TARGET = 2;
        this.BUBBLING_PHASE = 3;
        this.type = type;
        this.bubbles = (_a = eventInitDict.bubbles) !== null && _a !== void 0 ? _a : false;
        this.cancelable = (_b = eventInitDict.cancelable) !== null && _b !== void 0 ? _b : false;
        this.composed = (_c = eventInitDict.composed) !== null && _c !== void 0 ? _c : false;
        this.timeStamp = Date.now();
    }
    // Event 标准方法
    preventDefault() {
        if (this.cancelable) {
            this.defaultPrevented = true;
        }
    }
    stopImmediatePropagation() { }
    stopPropagation() {
        this.cancelBubble = true;
    }
    composedPath() {
        return [];
    }
    initEvent(type, bubbles, cancelable) {
    }
}
// Event standard constants
BaseEvent.NONE = 0;
BaseEvent.CAPTURING_PHASE = 1;
BaseEvent.AT_TARGET = 2;
BaseEvent.BUBBLING_PHASE = 3;
const EventConstructor = typeof Event !== 'undefined' ? Event : BaseEvent;
class EventSourceFetchEvent extends EventConstructor {
    constructor(type, eventInitDict) {
        super(type, {
            bubbles: shared.trueValue,
            cancelable: shared.trueValue,
            composed: shared.trueValue
        });
        this.data = eventInitDict.data;
        this.lastEventId = eventInitDict.lastEventId;
        this.origin = eventInitDict.origin || '';
        this.error = eventInitDict.error;
    }
}
// extend event
class AlovaSSEEvent extends AlovaEventBase {
    constructor(base, eventSource) {
        super(base.method, base.args);
        this.eventSource = eventSource;
    }
}
class AlovaSSEErrorEvent extends AlovaSSEEvent {
    constructor(base, error) {
        super(base, base.eventSource);
        this.error = error;
    }
}
class AlovaSSEMessageEvent extends AlovaSSEEvent {
    constructor(base, data) {
        super(base, base.eventSource);
        this.data = data;
    }
}

const assert$4 = shared.createAssert('EventSourceFetch');
class EventSourceFetch {
    /**
     * Creates a new EventSourceFetch instance
     *
     * @param url The URL to connect to
     * @param options Configuration options (includes all fetch options plus EventSource specific options)
     */
    constructor(url, reconnectTime, options = {}) {
        /**
         * connecting status
         */
        this.CONNECTING = 0;
        /**
         * open status
         */
        this.OPEN = 1;
        /**
         * closed status
         */
        this.CLOSED = 2;
        /**
         * Handler for open events
         */
        this.onopen = null;
        /**
         * Handler for message events
         */
        this.onmessage = null;
        /**
         * Handler for error events
         */
        this.onerror = null;
        this._listeners = {};
        this._reconnectTime = null;
        this._controller = null;
        this._lastEventId = '';
        this._origin = '';
        this.url = url;
        this.readyState = EventSourceFetch.CONNECTING;
        this._options = { ...options };
        this._reconnectTime = reconnectTime;
        // Get origin from URL
        const urlObj = shared.newInstance(URL, url, window.location.href);
        this._origin = urlObj.origin;
        if (url) {
            // Auto-connect like native EventSource
            shared.setTimeoutFn(() => this._connect());
        }
    }
    /**
     * Adds an event listener for the specified event
     *
     * @param type Event type to listen for
     * @param listener Function or object to call when event is received
     * @param options EventListener options
     */
    addEventListener(type, listener) {
        this._listeners[type] = this._listeners[type] || [];
        // Don't add the same listener twice
        const existing = this._listeners[type].find(l => l === listener || (shared.isObject(l) && shared.isObject(listener) && (l === null || l === void 0 ? void 0 : l.handleEvent) === listener.handleEvent));
        if (!existing) {
            this._listeners[type].push(listener);
        }
    }
    /**
     * Removes an event listener for the specified event
     *
     * @param type Event type to remove listener from
     * @param listener Function to remove
     * @param options EventListener options
     */
    removeEventListener(type, listener) {
        if (!listener || !this._listeners[type])
            return;
        this._listeners[type] = shared.filterItem(this._listeners[type], l => l !== listener &&
            !(typeof l === 'object' && typeof listener === 'object' && (l === null || l === void 0 ? void 0 : l.handleEvent) === listener.handleEvent));
    }
    /**
     * Dispatches an event
     *
     * @param event Event to dispatch
     * @returns Whether preventDefault was called
     */
    dispatchEvent(event) {
        if (!(event instanceof EventSourceFetchEvent)) {
            return shared.trueValue;
        }
        const listeners = this._listeners[event.type] || [];
        // Call all event listeners
        for (const listener of listeners) {
            if (shared.isFn(listener)) {
                listener(event);
            }
            else if (listener && shared.isFn(listener.handleEvent)) {
                listener.handleEvent(event);
            }
        }
        // Call specific handler if exists
        const handlerName = `on${event.type}`;
        const handler = this[handlerName];
        if (shared.isFn(handler)) {
            handler(event);
        }
        return !event.defaultPrevented;
    }
    /**
     * Closes the connection
     */
    close() {
        if (this.readyState === EventSourceFetch.CLOSED) {
            return;
        }
        this.readyState = EventSourceFetch.CLOSED;
        this._dispatchEvent('close', '');
        if (this._controller) {
            this._controller.abort();
            this._controller = null;
        }
    }
    /**
     * Establishes connection to the event source
     */
    _connect() {
        if (this.readyState === EventSourceFetch.CLOSED) {
            return;
        }
        this._controller = shared.newInstance(AbortController);
        const options = this._options;
        const headers = options.headers || {};
        const accept = ['Accept', 'text/event-stream'];
        const lastEventIdKey = 'Last-Event-ID';
        const lastEventId = this._lastEventId;
        if (shared.isArray(headers)) {
            shared.pushItem(headers, accept);
            lastEventId && shared.pushItem(headers, [lastEventIdKey, lastEventId]);
        }
        else if (shared.instanceOf(headers, Headers)) {
            headers.append(accept[0], accept[1]);
            lastEventId && headers.append(lastEventIdKey, lastEventId);
        }
        else if (shared.isObject(headers)) {
            const [acceptHeaderKey, acceptHeaderValue] = accept;
            headers[acceptHeaderKey] = acceptHeaderValue;
            lastEventId && (headers[lastEventIdKey] = lastEventId);
        }
        // Start with base fetch options from user options
        const fetchOptions = {
            ...options,
            headers,
            signal: this._controller.signal
        };
        // Override/set specific options required for SSE
        fetch(this.url, fetchOptions)
            .then(response => {
            assert$4(response.ok, `HTTP error: ${response.status}`);
            assert$4(response.body, 'ReadableStream not supported');
            // Update origin if available
            const responseUrl = shared.newInstance(URL, response.url);
            this._origin = responseUrl.origin;
            this.readyState = EventSourceFetch.OPEN;
            this._dispatchEvent('open', '');
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            const processStream = ({ done, value }) => {
                if (done) {
                    if (this.readyState !== EventSourceFetch.CLOSED) {
                        this._reconnect();
                    }
                    return shared.promiseResolve();
                }
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split(/\r\n|\r|\n/);
                buffer = lines.pop() || '';
                this._processEventStream(lines);
                return reader
                    .read()
                    .then(processStream)
                    .catch(e => {
                    if (e.name !== 'AbortError' && this.readyState !== EventSourceFetch.CLOSED) {
                        this._onError(e);
                    }
                    return shared.promiseResolve();
                });
            };
            return reader
                .read()
                .then(processStream)
                .catch(e => {
                if (e.name !== 'AbortError' && this.readyState !== EventSourceFetch.CLOSED) {
                    this._onError(e);
                }
            });
        })
            .catch(err => {
            if (err.name !== 'AbortError' && this.readyState !== EventSourceFetch.CLOSED) {
                this._onError(err);
            }
        });
    }
    /**
     * Processes received event stream lines
     *
     * @param lines Lines received from the event stream
     */
    _processEventStream(lines) {
        let eventType = 'message';
        let data = '';
        let eventId = null;
        let retry = null;
        const dispatchPendingEvent = () => {
            if (data) {
                // Remove the last newline if present
                if (data.endsWith('\n')) {
                    data = data.substring(0, data.length - 1);
                }
                // Update lastEventId if we got one
                if (eventId !== null) {
                    this._lastEventId = eventId;
                }
                // Process retry value if present and _reconnectTime is null
                if (retry !== null && this._reconnectTime === null) {
                    const retryInt = parseInt(retry, 10);
                    if (!Number.isNaN(retryInt)) {
                        this._reconnectTime = retryInt;
                    }
                }
                // Dispatch the event
                this._dispatchEvent(eventType, data);
            }
            // Reset for next event
            eventType = 'message';
            data = '';
            eventId = null;
            retry = null;
        };
        for (const line of lines) {
            if (line === '') {
                // Empty line means the event is complete
                dispatchPendingEvent();
                continue;
            }
            // Skip comments
            if (line.startsWith(':')) {
                continue;
            }
            // Parse field:value
            let field;
            let value;
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) {
                field = line;
                value = '';
            }
            else {
                field = line.slice(0, colonIndex);
                value = line.slice(colonIndex + (line[colonIndex + 1] === ' ' ? 2 : 1));
            }
            // Process field
            switch (field) {
                case 'event':
                    eventType = value;
                    break;
                case 'data':
                    data = data ? `${data}\n${value}` : value;
                    break;
                case 'id':
                    // Null character in ID field terminates the connection
                    if (value.includes('\0')) {
                        continue;
                    }
                    eventId = value;
                    break;
                case 'retry':
                    retry = value;
                    break;
                default:
                    throw shared.newInstance(shared.AlovaError, 'EventSource', `EventSource: Unknown field "${field}", ignoring`);
            }
        }
        // If last line in buffer wasn't an empty line but we had data, consider the current event incomplete
        // It will be completed on next chunk or if the connection closes
    }
    /**
     * Dispatches an event
     *
     * @param type Event type
     * @param data Event data
     */
    _dispatchEvent(type, data) {
        const event = shared.newInstance(EventSourceFetchEvent, type, {
            type,
            data,
            lastEventId: this._lastEventId,
            origin: this._origin
        });
        this.dispatchEvent(event);
    }
    /**
     * Handles errors
     *
     * @param error Error object
     */
    _onError(error) {
        const event = shared.newInstance(EventSourceFetchEvent, 'error', {
            type: 'error',
            data: '',
            lastEventId: this._lastEventId,
            origin: this._origin,
            error
        });
        this.dispatchEvent(event);
        if (this.readyState !== EventSourceFetch.CLOSED) {
            this._reconnect();
        }
    }
    /**
     * Attempts to reconnect after connection closed or error
     */
    _reconnect() {
        var _a;
        if (this._reconnectTime !== null && this._reconnectTime <= 0) {
            this.close();
            return;
        }
        if (this.readyState !== EventSourceFetch.CLOSED) {
            this.readyState = EventSourceFetch.CONNECTING;
            // if _reconnectTime is null, use default value 1000ms
            const reconnectDelay = (_a = this._reconnectTime) !== null && _a !== void 0 ? _a : 1000;
            shared.setTimeoutFn(() => this._connect(), reconnectDelay);
        }
    }
}
/**
 * connecting status
 */
EventSourceFetch.CONNECTING = 0;
/**
 * open status
 */
EventSourceFetch.OPEN = 1;
/**
 * closed status
 */
EventSourceFetch.CLOSED = 2;

const SSEOpenEventKey = Symbol('SSEOpen');
const SSEMessageEventKey = Symbol('SSEMessage');
const SSEErrorEventKey = Symbol('SSEError');
var SSEHookReadyState;
(function (SSEHookReadyState) {
    SSEHookReadyState[SSEHookReadyState["CONNECTING"] = 0] = "CONNECTING";
    SSEHookReadyState[SSEHookReadyState["OPEN"] = 1] = "OPEN";
    SSEHookReadyState[SSEHookReadyState["CLOSED"] = 2] = "CLOSED";
})(SSEHookReadyState || (SSEHookReadyState = {}));
const errorPrefix = 'useSSE';
const assert$3 = shared.createAssert(errorPrefix);
var MessageType;
(function (MessageType) {
    MessageType["Open"] = "open";
    MessageType["Error"] = "error";
    MessageType["Message"] = "message";
    MessageType["Close"] = "close";
})(MessageType || (MessageType = {}));
var useSSE = (handler, config = {}) => {
    const { initialData, withCredentials, interceptByGlobalResponded = shared.trueValue, 
    /** abortLast = trueValue, */
    immediate = shared.falseValue, responseType = 'text', reconnectionTime = null, ...fetchOptions } = config;
    // ! Temporarily does not support specifying abortLast
    const abortLast = shared.trueValue;
    const { create, ref, onMounted, onUnmounted, objectify, exposeProvider, memorize } = statesHookHelper(alova.promiseStatesHook());
    const usingArgs = ref([]);
    const eventSource = ref(shared.undefinedValue);
    const sendPromiseObject = ref(shared.undefinedValue);
    const data = create(initialData, 'data');
    const readyState = create(SSEHookReadyState.CLOSED, 'readyState');
    const exposedEventSource = create(shared.undefinedValue, 'eventSource');
    let methodInstance = getHandlerMethod(handler);
    let responseUnified;
    const eventManager = shared.createEventManager();
    // UseCallback object that stores custom events, where key is eventName
    const customEventMap = ref(new Map());
    const onOpen = (handler) => {
        eventManager.on(SSEOpenEventKey, handler);
    };
    const onMessage = (handler) => {
        eventManager.on(SSEMessageEventKey, handler);
    };
    const onError = (handler) => {
        eventManager.on(SSEErrorEventKey, handler);
    };
    const responseSuccessHandler = ref(shared.$self);
    const responseErrorHandler = ref(throwFn);
    const responseCompleteHandler = ref(shared.noop);
    /**
     * Set up a response interceptor, which needs to be called after each send
     */
    const setResponseHandler = (instance) => {
        // responded removed since 3.0
        const { responded } = shared.getOptions(instance);
        responseUnified = responded;
        if (shared.isFn(responseUnified)) {
            responseSuccessHandler.current = responseUnified;
        }
        else if (responseUnified && shared.isPlainObject(responseUnified)) {
            const { onSuccess: successHandler, onError: errorHandler, onComplete: completeHandler } = responseUnified;
            responseSuccessHandler.current = shared.isFn(successHandler) ? successHandler : responseSuccessHandler.current;
            responseErrorHandler.current = shared.isFn(errorHandler) ? errorHandler : responseErrorHandler.current;
            responseCompleteHandler.current = shared.isFn(completeHandler) ? completeHandler : responseCompleteHandler.current;
        }
    };
    /**
     * Process response tasks and do not cache data on failure
     * @param handlerReturns Data returned by the interceptor
     * @returns Processed response
     */
    const handleResponseTask = async (handlerReturns) => {
        const { headers, transform: transformFn = shared.$self } = shared.getConfig(methodInstance);
        const returnsData = await handlerReturns;
        const transformedData = await transformFn(returnsData, (headers || {}));
        data.v = transformedData;
        // invalidate cache
        alova.hitCacheBySource(methodInstance);
        return transformedData;
    };
    /**
     * Create AlovaSSEHook event
     * For specific data processing procedures, please refer to the following link
     * @link https://alova.js.org/zh-CN/tutorial/combine-framework/response
     */
    const createSSEEvent = async (eventFrom, dataOrError) => {
        assert$3(eventSource.current, 'EventSource is not initialized');
        const es = eventSource.current;
        const baseEvent = shared.newInstance((AlovaSSEEvent), AlovaEventBase.spawn(methodInstance, usingArgs.current), es);
        if (eventFrom === MessageType.Open) {
            return baseEvent;
        }
        const globalSuccess = interceptByGlobalResponded ? responseSuccessHandler.current : shared.$self;
        const globalError = interceptByGlobalResponded ? responseErrorHandler.current : throwFn;
        const globalFinally = interceptByGlobalResponded ? responseCompleteHandler.current : shared.noop;
        const isStringData = shared.isString(dataOrError);
        if (responseType === 'json' && isStringData) {
            try {
                dataOrError = shared.JSONParse(dataOrError);
            }
            catch (error) {
                throw shared.newInstance(shared.AlovaError, errorPrefix, error.message);
            }
        }
        const p = shared.promiseFinally(shared.promiseThen(isStringData ? shared.promiseResolve(dataOrError) : shared.promiseReject(dataOrError), res => handleResponseTask(globalSuccess(res, methodInstance)), error => handleResponseTask(globalError(error, methodInstance))), () => {
            globalFinally(methodInstance);
        });
        // Regardless, the Promise object returned by the function must be fulfilled
        return shared.promiseThen(p, 
        // Get processed data (data after transform)
        res => shared.newInstance((AlovaSSEMessageEvent), baseEvent, res), 
        // There is an error
        error => new AlovaSSEErrorEvent(baseEvent, error));
    };
    /**
     * Select the required trigger function based on the event. If the event has no errors, the callback function passed in is triggered.
     * @param callback Callback function triggered when there is no error
     */
    const sendSSEEvent = (callback) => (event) => {
        if (event.error === shared.undefinedValue) {
            return callback(event);
        }
        return eventManager.emit(SSEErrorEventKey, event);
    };
    // * MARK: Event handling of EventSource
    const onCustomEvent = (eventName, callbackHandler) => {
        var _a;
        const currentMap = customEventMap.current;
        if (!currentMap.has(eventName)) {
            const useCallbackObject = useCallback(callbacks => {
                var _a;
                if (callbacks.length === 0) {
                    (_a = eventSource.current) === null || _a === void 0 ? void 0 : _a.removeEventListener(eventName, useCallbackObject[1]);
                    customEventMap.current.delete(eventName);
                }
            });
            const trigger = useCallbackObject[1];
            currentMap.set(eventName, useCallbackObject);
            (_a = eventSource.current) === null || _a === void 0 ? void 0 : _a.addEventListener(eventName, event => {
                shared.promiseThen(createSSEEvent(eventName, event.data), sendSSEEvent(trigger));
            });
        }
        const [onEvent] = currentMap.get(eventName);
        return onEvent(callbackHandler);
    };
    /**
     * Cancel the registration of custom events in useCallback
     */
    const offCustomEvent = () => {
        customEventMap.current.forEach(([_1, _2, offTrigger]) => {
            offTrigger();
        });
    };
    const esOpen = memorize(() => {
        var _a;
        // resolve the promise returned when using send()
        readyState.v = SSEHookReadyState.OPEN;
        shared.promiseThen(createSSEEvent(MessageType.Open), event => eventManager.emit(SSEOpenEventKey, event));
        // ! Must be resolved after calling onOpen
        (_a = sendPromiseObject.current) === null || _a === void 0 ? void 0 : _a.resolve();
    });
    const esError = memorize((event) => {
        var _a;
        readyState.v = SSEHookReadyState.CLOSED;
        shared.promiseThen(createSSEEvent(MessageType.Error, event.error || shared.newInstance(Error, 'SSE Error')), sendSSEEvent(event => eventManager.emit(SSEMessageEventKey, event)));
        (_a = sendPromiseObject.current) === null || _a === void 0 ? void 0 : _a.resolve();
    });
    const esMessage = memorize((event) => {
        shared.promiseThen(createSSEEvent(MessageType.Message, event.data), sendSSEEvent(event => eventManager.emit(SSEMessageEventKey, event)));
    });
    /**
     * Close the registration of the current eventSource
     */
    const close = () => {
        const es = eventSource.current;
        if (!es) {
            return;
        }
        if (sendPromiseObject.current) {
            // If the promise is still there when close
            sendPromiseObject.current.resolve();
        }
        // * MARK: Unbinding event handling
        es.close();
        es.removeEventListener(MessageType.Open, esOpen);
        es.removeEventListener(MessageType.Error, esError);
        es.removeEventListener(MessageType.Message, esMessage);
        es.removeEventListener(MessageType.Close, close);
        readyState.v = SSEHookReadyState.CLOSED;
        // After eventSource is closed, unregister all custom events
        // Otherwise it may cause memory leaks
        customEventMap.current.forEach(([_, eventTrigger], eventName) => {
            es.removeEventListener(eventName, eventTrigger);
        });
    };
    /**
     * Send request and initialize eventSource
     */
    const connect = (...args) => {
        let es = eventSource.current;
        let promiseObj = sendPromiseObject.current;
        if (es && abortLast) {
            // When abortLast === true, close the previous connection and re-establish it
            close();
        }
        // Set the promise object used by the send function
        if (!promiseObj) {
            promiseObj = sendPromiseObject.current = shared.usePromise();
            // Clear the promise object after open
            promiseObj &&
                shared.promiseFinally(promiseObj.promise, () => {
                    promiseObj = shared.undefinedValue;
                });
        }
        usingArgs.current = args;
        methodInstance = getHandlerMethod(handler, args);
        // Set up response interceptor
        setResponseHandler(methodInstance);
        const { params, headers } = shared.getConfig(methodInstance);
        const { baseURL, url, data, type } = methodInstance;
        const fullURL = shared.buildCompletedURL(baseURL, url, params);
        // Establish connection
        const isBodyData = (data) => shared.isString(data) || shared.isSpecialRequestBody(data);
        es = shared.newInstance(EventSourceFetch, fullURL, reconnectionTime, {
            credentials: withCredentials ? 'include' : 'same-origin',
            method: type || 'GET',
            headers,
            body: isBodyData(data) ? data : shared.JSONStringify(data),
            ...fetchOptions
        });
        eventSource.current = es;
        exposedEventSource.v = es;
        readyState.v = SSEHookReadyState.CONNECTING;
        // * MARK: Register to handle events
        // Register to handle event open error message
        es.addEventListener(MessageType.Open, esOpen);
        es.addEventListener(MessageType.Error, esError);
        es.addEventListener(MessageType.Message, esMessage);
        es.addEventListener(MessageType.Close, close);
        // and custom events
        // If the on listener is used before connect (send), there will already be events in customEventMap.
        customEventMap.current.forEach(([_, eventTrigger], eventName) => {
            es === null || es === void 0 ? void 0 : es.addEventListener(eventName, event => {
                shared.promiseThen(createSSEEvent(eventName, event.data), sendSSEEvent(eventTrigger));
            });
        });
        return promiseObj.promise;
    };
    onUnmounted(() => {
        close();
        // The above use of eventSource.removeEventListener just disconnects eventSource and trigger.
        // Here is the cancellation of the event registration in the useCallback object
        eventManager.off(SSEOpenEventKey);
        eventManager.off(SSEMessageEventKey);
        eventManager.off(SSEErrorEventKey);
        offCustomEvent();
    });
    // * MARK: initialization action
    onMounted(() => {
        var _a;
        if (immediate) {
            connect(...[]);
            (_a = sendPromiseObject.current) === null || _a === void 0 ? void 0 : _a.promise.catch(() => { });
        }
    });
    return exposeProvider({
        send: connect,
        close,
        on: onCustomEvent,
        onMessage,
        onError,
        onOpen,
        ...objectify([readyState, data, exposedEventSource])
    });
};

const assert$2 = shared.createAssert('useUploader');
function useUploader(handler, { limit = 0, localLink, replaceSrc, mode } = {}) {
    const { create, computed, exposeProvider, ref } = statesHookHelper(alova.promiseStatesHook());
    const eventManager = shared.createEventManager();
    const fileList = create([], 'fileList');
    const file = computed(() => fileList.v[0], [fileList], 'file');
    const uploading = create(false, 'uploading');
    const successCount = create(0, 'successCount');
    const failCount = create(0, 'failCount');
    const totalProgress = computed(() => ({
        ...fileList.v.reduce((progress, { progress: itemProgress, status }) => {
            if (status !== 0) {
                progress.total += itemProgress.total;
                progress.uploaded += itemProgress.uploaded;
            }
            return progress;
        }, {
            uploaded: 0,
            total: 0
        })
    }), [fileList], 'progress');
    const error = computed(() => { var _a; return (_a = fileList.v.find(item => item.error)) === null || _a === void 0 ? void 0 : _a.error; }, [fileList], 'error');
    const appendFiles = async (files = {}, options = {}) => {
        var _a;
        // If no files are provided, call selectFile to get them
        let optionsFiles = files;
        let finallyOptions = options;
        if (!files.file && !shared.isArray(files)) {
            finallyOptions = files;
            optionsFiles = [];
        }
        let rawFiles = shared.isArray(optionsFiles) ? optionsFiles : [optionsFiles];
        if (shared.len(rawFiles) <= 0) {
            rawFiles = await useUploader.selectFile(finallyOptions);
        }
        // Check file quantity limit
        assert$2(limit <= 0 || shared.len(fileList.v) + shared.len(rawFiles) <= limit, `The number of files exceeds the limit of ${limit}`);
        // File format conversion
        const { converters } = useUploader;
        const convertedFiles = await shared.PromiseCls.all(shared.mapItem(rawFiles, async (file) => {
            const converter = converters.find(({ is }) => is(file));
            assert$2(converter, `Invalid file type, only ${shared.mapItem(converters, ({ name }) => name).join(', ')} are supported, if other file needs, customize convert function with \`useUploader.convertFile.push({ is: ..., convert: ... })\``);
            const convertedFile = await converter.convert(file);
            assert$2(convertedFile, 'Failed to convert file');
            return {
                src: file.src || (localLink ? URL.createObjectURL(convertedFile) : undefined),
                file: convertedFile,
                status: 0,
                progress: { uploaded: 0, total: convertedFile.size }
            };
        }));
        // Update fileList
        const insertPosition = (_a = finallyOptions.start) !== null && _a !== void 0 ? _a : shared.len(fileList.v);
        const validConvertedFiles = shared.filterItem(convertedFiles, Boolean);
        const fileListValue = [...fileList.v];
        shared.splice(fileListValue, insertPosition, 0, ...validConvertedFiles);
        fileList.v = fileListValue;
        return shared.len(convertedFiles);
    };
    const getTargetFiles = (positions, excludeStatuses = [1, 2], type = 'upload') => {
        const assertErrorWords = {
            upload: 'uploaded',
            abort: 'aborted'
        }[type];
        const fileListValue = fileList.v;
        return shared.len(positions) > 0
            ? shared.mapItem(positions, (item, i) => {
                const isItemNum = shared.isNumber(item);
                const fileItem = isItemNum ? fileListValue[item] : item;
                const positionText = isItemNum ? `index ${item}` : `position ${i}`;
                assert$2(fileItem, `The file of ${positionText} does not exist`);
                shared.len(excludeStatuses) > 0 &&
                    assert$2(!shared.includes(excludeStatuses, fileItem.status) && shared.isObject(fileItem.file), `The file of ${positionText} cannot be ${assertErrorWords}, which status is ${fileItem.status}`);
                return fileItem;
            })
            : shared.filterItem(fileListValue, f => !shared.includes(excludeStatuses, f.status));
    };
    const filterFiles = (files, statuses) => shared.filterItem(files, file => (shared.len(statuses) > 0 ? shared.includes(statuses, file.status) : shared.trueValue));
    const uploadingMethods = ref([]);
    const pushMethod = (file, method) => {
        const index = fileList.v.findIndex(fileItem => fileItem.file === file);
        if (index > -1) {
            shared.pushItem(uploadingMethods.current, { f: file, m: method });
        }
    };
    const removeMethod = (method) => {
        uploadingMethods.current = shared.filterItem(uploadingMethods.current, ({ m }) => m !== method);
    };
    const abort = (...positions) => {
        const filesToAbort = getTargetFiles(positions, [0, 2, 3], 'abort');
        const abortMethods = [];
        if (shared.len(filesToAbort) > 0) {
            shared.forEach(filesToAbort, ({ file }) => {
                const uploadingItem = uploadingMethods.current.find(({ f }) => f === file);
                uploadingItem && shared.pushItem(abortMethods, uploadingItem.m);
            });
        }
        else {
            shared.pushItem(abortMethods, ...shared.mapItem(uploadingMethods.current, ({ m }) => m));
        }
        // remove the repeat items
        const abortMethodSet = [];
        shared.forEach(abortMethods, m => {
            if (!abortMethodSet.includes(m)) {
                shared.pushItem(abortMethodSet, m);
            }
        });
        return shared.promiseAll(shared.mapItem(abortMethodSet, method => method.abort()));
    };
    const removeFiles = (...positions) => {
        const filesToRemove = getTargetFiles(positions, []);
        if (shared.len(filesToRemove) > 0) {
            // abort uploading files before removing them
            abort(...filterFiles(filesToRemove, [1]));
            fileList.v = shared.filterItem(fileList.v, file => !shared.includes(filesToRemove, file));
            successCount.v = shared.len(filterFiles(fileList.v, [2]));
            failCount.v = shared.len(filterFiles(fileList.v, [3]));
        }
        else {
            abort(...filterFiles(fileList.v, [1]));
            fileList.v = [];
        }
    };
    const createEvent = (method, response, error) => {
        const baseEvent = (AlovaEventBase).spawn(method, []);
        return {
            successEvent: shared.newInstance((AlovaSuccessEvent), baseEvent, response, shared.falseValue),
            errorEvent: shared.newInstance((AlovaErrorEvent), baseEvent, error),
            completeEvent: shared.newInstance((AlovaCompleteEvent), baseEvent, error ? KEY_ERROR : KEY_SUCCESS, response, shared.falseValue, error)
        };
    };
    const updateFileStatus = (file, status, response, error, index = 0) => {
        file.status = status;
        if (status === 2) {
            file.progress.uploaded = file.progress.total;
            if (replaceSrc) {
                const src = replaceSrc(response, index);
                if (src) {
                    file.src = src;
                }
            }
        }
        else if (status === 3) {
            file.error = error;
        }
        // trigger reactivity in react
        fileList.v = [...fileList.v];
    };
    const createBatchUploadHandler = (filesToUpload, filesData) => {
        const uploadingMethod = handler(filesData);
        uploadingMethod.onUpload(totalProgress => {
            shared.forEach(filesToUpload, file => {
                file.progress.uploaded = totalProgress.loaded * (file.progress.total / totalProgress.total);
            });
        });
        shared.forEach(filesToUpload, ({ file }) => pushMethod(file, uploadingMethod));
        return uploadingMethod
            .then(response => {
            shared.forEach(filesToUpload, (file, i) => updateFileStatus(file, 2, response, undefined, i));
            successCount.v = shared.len(filterFiles(fileList.v, [2]));
            const { successEvent, completeEvent } = createEvent(uploadingMethod, response);
            eventManager.emit(KEY_SUCCESS, successEvent);
            eventManager.emit(KEY_COMPLETE, completeEvent);
            return response;
        }, error => {
            shared.forEach(filesToUpload, file => updateFileStatus(file, 3, undefined, error));
            failCount.v = shared.len(filterFiles(fileList.v, [3]));
            const { errorEvent, completeEvent } = createEvent(uploadingMethod, undefined, error);
            eventManager.emit(KEY_ERROR, errorEvent);
            eventManager.emit(KEY_COMPLETE, completeEvent);
            return error;
        })
            .finally(() => {
            uploading.v = false;
            removeMethod(uploadingMethod);
        });
    };
    const createEachUploadHandler = (filesToUpload) => {
        const uploadPromises = shared.mapItem(filesToUpload, (file, i) => {
            const uploadingMethod = handler({ file: file.file, name: file.file.name });
            uploadingMethod.onUpload(({ loaded, total }) => {
                shared.forEach(filesToUpload, file => {
                    file.progress.uploaded = loaded;
                    file.progress.total = total;
                });
            });
            pushMethod(file.file, uploadingMethod);
            return uploadingMethod
                .then(response => {
                updateFileStatus(file, 2, response, shared.undefinedValue, i);
                successCount.v += 1;
                const { successEvent, completeEvent } = createEvent(uploadingMethod, response);
                eventManager.emit(KEY_SUCCESS, successEvent);
                eventManager.emit(KEY_COMPLETE, completeEvent);
                return response;
            }, error => {
                updateFileStatus(file, 3, shared.undefinedValue, error);
                failCount.v += 1;
                const { errorEvent, completeEvent } = createEvent(uploadingMethod, shared.undefinedValue, error);
                eventManager.emit(KEY_ERROR, errorEvent);
                eventManager.emit(KEY_COMPLETE, completeEvent);
                return error;
            })
                .finally(() => {
                removeMethod(uploadingMethod);
            });
        });
        return shared.promiseFinally(shared.PromiseCls.all(uploadPromises), () => {
            uploading.v = shared.falseValue;
        });
    };
    const upload = async (...positions) => {
        const filesToUpload = getTargetFiles(positions);
        shared.forEach(filesToUpload, file => {
            file.status = 1;
        });
        const filesData = shared.mapItem(filesToUpload, ({ file }) => ({
            file,
            name: file.name
        }));
        uploading.v = shared.trueValue;
        return (mode === 'batch' ? createBatchUploadHandler(filesToUpload, filesData) : createEachUploadHandler(filesToUpload));
    };
    return exposeProvider({
        fileList,
        uploading,
        file,
        progress: totalProgress,
        successCount,
        failCount,
        error,
        appendFiles,
        removeFiles,
        upload,
        abort,
        onSuccess: (handler) => {
            eventManager.on(KEY_SUCCESS, handler);
        },
        onError: (handler) => {
            eventManager.on(KEY_ERROR, handler);
        },
        onComplete: (handler) => {
            eventManager.on(KEY_COMPLETE, handler);
        }
    });
}
/**
 * Utility function to select files
 * @param options File selection configuration options
 * @param options.multiple Whether to allow multiple file selection
 * @returns Promise<RawFile[]> Returns a Promise containing information about the selected files
 *
 * RawFile contains the following fields:
 * - file: The original file object
 * - src: The URL of the file
 * - name: The file name
 * - mimeType: The file type
 */
useUploader.selectFile = ({ multiple, accept } = {}) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = !!multiple;
    if (accept) {
        input.accept = accept;
    }
    input.click();
    return shared.newInstance((Promise), resolve => {
        input.addEventListener('change', () => {
            const rawFiles = shared.mapItem(Array.from(input.files || []), file => ({
                file,
                name: file.name,
                mimeType: file.type
            }));
            resolve(rawFiles);
        });
    });
};
const defaultMimeType = 'text/plain';
useUploader.converters = [
    {
        name: 'HTMLCanvasElement',
        is: ({ file }) => shared.instanceOf(file, HTMLCanvasElement),
        async convert({ file, mimeType, name }) {
            const blob = await shared.newInstance((shared.PromiseCls), resolve => file === null || file === void 0 ? void 0 : file.toBlob(resolve));
            if (blob) {
                return shared.newInstance(File, [blob], name || 'image.png', {
                    type: mimeType || blob.type
                });
            }
        }
    },
    {
        name: 'base64',
        is: ({ file }) => shared.isString(file),
        convert({ file = '', mimeType, name }) {
            var _a;
            assert$2(/data:.+;base64,/.test(file), 'Invalid base64 string');
            // Convert Base64 to File
            const arr = file.split(',');
            const mime = (_a = arr[0].match(/:(.*?);/)) === null || _a === void 0 ? void 0 : _a[1];
            const bstr = atob(arr[1]);
            const u8arr = new Uint8Array(shared.len(bstr));
            shared.forEach(Array.from(bstr), (char, n) => {
                u8arr[n] = char.charCodeAt(0);
            });
            return shared.newInstance(File, [u8arr], name || 'file', {
                type: mimeType || mime || defaultMimeType
            });
        }
    },
    {
        name: 'File',
        is: ({ file }) => shared.instanceOf(file, File),
        convert({ file }) {
            return file;
        }
    },
    {
        name: 'Blob',
        is: ({ file }) => shared.instanceOf(file, Blob),
        convert({ file, name, mimeType }) {
            return shared.newInstance(File, [file], name || 'file', {
                type: mimeType || file.type || defaultMimeType
            });
        }
    },
    {
        name: 'ArrayBuffer',
        is: ({ file }) => shared.instanceOf(file, ArrayBuffer),
        convert({ file, name, mimeType }) {
            return shared.newInstance(File, [shared.newInstance(Blob, [file])], name || 'file', {
                type: mimeType || defaultMimeType
            });
        }
    }
];

const useAutoRequest = (handler, config = {}) => {
    let notifiable = shared.trueValue;
    const { enableFocus = shared.trueValue, enableVisibility = shared.trueValue, enableNetwork = shared.trueValue, pollingTime = 0, throttle = 1000 } = config;
    const { onMounted, onUnmounted, __referingObj: referingObject } = statesHookHelper(alova.promiseStatesHook());
    const states = useRequest(handler, {
        ...config,
        __referingObj: referingObject
    });
    const notify = () => {
        if (notifiable) {
            states.send();
            if (throttle > 0) {
                notifiable = shared.falseValue;
                setTimeout(() => {
                    notifiable = shared.trueValue;
                }, throttle);
            }
        }
    };
    let offNetwork = shared.noop;
    let offFocus = shared.noop;
    let offVisiblity = shared.noop;
    let offPolling = shared.noop;
    onMounted(() => {
        if (!alova.globalConfigMap.ssr) {
            offNetwork = enableNetwork ? useAutoRequest.onNetwork(notify, config) : offNetwork;
            offFocus = enableFocus ? useAutoRequest.onFocus(notify, config) : offFocus;
            offVisiblity = enableVisibility ? useAutoRequest.onVisibility(notify, config) : offVisiblity;
            offPolling = pollingTime > 0 ? useAutoRequest.onPolling(notify, config) : offPolling;
        }
    });
    onUnmounted(() => {
        offNetwork();
        offFocus();
        offVisiblity();
        offPolling();
    });
    return states;
};
const on = (type, handler) => {
    window.addEventListener(type, handler);
    return () => window.removeEventListener(type, handler);
};
useAutoRequest.onNetwork = notify => on('online', notify);
useAutoRequest.onFocus = notify => on('focus', notify);
useAutoRequest.onVisibility = notify => {
    const handle = () => document.visibilityState === 'visible' && notify();
    return on('visibilitychange', handle);
};
useAutoRequest.onPolling = (notify, config) => {
    const timer = setInterval(notify, config.pollingTime);
    return () => clearInterval(timer);
};

const hookPrefix$1 = 'useCaptcha';
const captchaAssert = shared.createAssert(hookPrefix$1);
var useCaptcha = (handler, config = {}) => {
    const { initialCountdown, middleware } = config;
    captchaAssert(initialCountdown === shared.undefinedValue || initialCountdown > 0, 'initialCountdown must be greater than 0');
    const { create, ref, objectify, exposeProvider, __referingObj: referingObject } = statesHookHelper(alova.promiseStatesHook());
    const countdown = create(0, 'countdown');
    const requestReturned = useRequest(handler, {
        ...config,
        __referingObj: referingObject,
        immediate: shared.falseValue,
        managedStates: objectify([countdown], 's'),
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        middleware: middleware ? (ctx, next) => middleware({ ...ctx, send }, next) : shared.undefinedValue
    });
    const timer = ref(shared.undefinedValue);
    const send = (...args) => shared.newInstance(shared.PromiseCls, (resolve, reject) => {
        if (countdown.v <= 0) {
            requestReturned
                .send(...args)
                .then(result => {
                countdown.v = config.initialCountdown || 60;
                timer.current = setInterval(() => {
                    countdown.v -= 1;
                    if (countdown.v <= 0) {
                        clearInterval(timer.current);
                    }
                }, 1000);
                resolve(result);
            })
                .catch(reason => reject(reason));
        }
        else {
            reject(shared.newInstance(shared.AlovaError, hookPrefix$1, 'the countdown is not over yet'));
        }
    });
    return exposeProvider({
        ...requestReturned,
        send,
        ...objectify([countdown])
    });
};

const RestoreEventKey = Symbol('FormRestore');
const getStoragedKey = (targetKey) => `alova/form-${shared.instanceOf(targetKey, alova.Method) ? shared.getMethodInternalKey(targetKey) : targetKey}`;
const sharedEventManager = shared.createEventManager();
const sharedStates = {};
const cloneFormData = (form) => {
    const shallowClone = (value) => (shared.isArray(value) ? [...value] : shared.isPlainObject(value) ? { ...value } : value);
    return shared.walkObject(shallowClone(form), shallowClone);
};
var useForm = (handler, config = {}) => {
    // If the id in config also has a corresponding shared state, it will also be returned.
    // The reason for continuing the execution is to be compatible with the problem that the number of hook executions in react cannot be changed, otherwise it will throw "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
    const { id: originalId } = config;
    const sharedState = originalId ? sharedStates[originalId] : shared.undefinedValue;
    const { id, initialForm, store, resetAfterSubmiting, immediate = shared.falseValue, middleware } = (sharedState === null || sharedState === void 0 ? void 0 : sharedState.config) || config;
    alova.promiseStatesHook();
    const { create, ref, onMounted, onUnmounted, watch, objectify, exposeProvider, __referingObj: referingObject } = statesHookHelper(alova.promiseStatesHook());
    const isStoreObject = shared.isPlainObject(store);
    const enableStore = isStoreObject ? store.enable : store;
    const form = create(cloneFormData((sharedState === null || sharedState === void 0 ? void 0 : sharedState.form) || initialForm), 'form');
    const methodHandler = handler;
    const eventManager = shared.createEventManager();
    // Use computed properties to avoid calling methodHandler every time this use hook is executed.
    const initialMethod = ref(shared.undefinedValue);
    let storageContext = sharedState === null || sharedState === void 0 ? void 0 : sharedState.l2Cache;
    if (enableStore && !(sharedState === null || sharedState === void 0 ? void 0 : sharedState.l2Cache)) {
        initialMethod.current = shared.sloughConfig(methodHandler, [form.v]);
        storageContext = shared.getContext(initialMethod.current).l2Cache;
    }
    const storagedKey = getStoragedKey(id || initialMethod.current || '');
    const reseting = ref(shared.falseValue);
    const serializerPerformer = ref(createSerializerPerformer(isStoreObject ? store.serializers : shared.undefinedValue));
    // Only when there is an id, it is saved to sharedStates.
    // In react, because a new form will be generated after updating the form, it needs to be resaved every time it is called.
    if (id && !sharedStates[id]) {
        sharedStates[id] = {
            form: form.v,
            l2Cache: storageContext,
            config
        };
    }
    const originalHookProvider = useRequest((...args) => methodHandler(form.v, ...args), {
        ...config,
        __referingObj: referingObject,
        // Middleware function, also supports subscriber middleware
        middleware: middleware
            ? (ctx, next) => middleware({
                ...ctx,
                // eslint-disable-next-line
                delegatingActions: { updateForm, reset }
            }, next)
            : shared.undefinedValue,
        // 1. When persistence is required, it will be triggered after data recovery
        // 2. When there is a shared state, it means that it has been initialized before (regardless of whether there is an immediate request), and subsequent requests will no longer be automatically initiated. This is to be compatible with the issue of repeated requests when multiple forms initiate requests immediately.
        immediate: enableStore || sharedState ? shared.falseValue : immediate
    });
    /**
     * Reset form data
     */
    const reset = () => {
        reseting.current = shared.trueValue;
        const clonedFormData = cloneFormData(initialForm);
        clonedFormData && (form.v = clonedFormData);
        enableStore && (storageContext === null || storageContext === void 0 ? void 0 : storageContext.remove(storagedKey));
    };
    /**
     * Update form data
     * @param newForm new form data
     */
    const updateForm = (newForm) => {
        form.v = {
            ...form.v,
            ...newForm
        };
    };
    const hookProvider = exposeProvider({
        // The first parameter is fixed to form data
        ...originalHookProvider,
        ...objectify([form]),
        updateForm,
        reset,
        // Persistent data recovery event binding
        onRestore(handler) {
            eventManager.on(RestoreEventKey, handler);
        }
    });
    const sharedOffHandler = ref(shared.noop);
    const { send, onSuccess } = hookProvider;
    onMounted(() => {
        if (id) {
            // sync form data from other compoent when previous form component is keep-alive.
            sharedOffHandler.current = sharedEventManager.on(id, formData => {
                form.v = formData;
            });
        }
        // Update data when persistence is required
        if (enableStore && storageContext && !sharedState) {
            // Get storage and update data
            // It needs to be called in onMounted, otherwise it will cause it to be called repeatedly in react.
            const storagedForm = serializerPerformer.current.deserialize(storageContext.get(storagedKey));
            // When there is draft data, the data is restored asynchronously, otherwise the on restore event cannot be bound normally.
            if (storagedForm) {
                form.v = storagedForm;
                // Trigger persistent data recovery event
                eventManager.emit(RestoreEventKey, shared.undefinedValue);
            }
            immediate && send(...[]);
        }
    });
    // Monitor changes and store them synchronously. If it is triggered by reset, no further serialization is required.
    watch([form], () => {
        if (id) {
            // sync form data to other component
            sharedEventManager.emit(id, form.v);
            if (sharedStates[id]) {
                sharedStates[id].form = form.v;
            }
        }
        if (reseting.current || !enableStore) {
            reseting.current = shared.falseValue;
            return;
        }
        storageContext === null || storageContext === void 0 ? void 0 : storageContext.set(storagedKey, serializerPerformer.current.serialize(form.v));
    });
    onUnmounted(() => {
        sharedOffHandler.current();
    });
    // If data needs to be cleared after submission, call reset
    onSuccess(() => {
        resetAfterSubmiting && reset();
    });
    return hookProvider;
};

const RetryEventKey = Symbol('RetriableRetry');
const FailEventKey = Symbol('RetriableFail');
const hookPrefix = 'useRetriableRequest';
const assert$1 = shared.createAssert(hookPrefix);
var useRetriableRequest = (handler, config = {}) => {
    const { retry = 3, backoff = { delay: 1000 }, middleware = shared.noop } = config;
    const { ref: useFlag$, exposeProvider, __referingObj: referingObject } = statesHookHelper(alova.promiseStatesHook());
    const eventManager = shared.createEventManager();
    const retryTimes = useFlag$(0);
    const stopManuallyError = useFlag$(shared.undefinedValue); // Stop error object, has value when stop is triggered manually
    const methodInstanceLastest = useFlag$(shared.undefinedValue);
    const argsLatest = useFlag$(shared.undefinedValue);
    const requesting = useFlag$(shared.falseValue); // Is it being requested?
    const retryTimer = useFlag$(shared.undefinedValue);
    const stopPromiseObj = useFlag$(shared.usePromise());
    const emitOnFail = (method, args, error) => {
        // On fail needs to be triggered asynchronously, and on error and on complete should be triggered first.
        shared.setTimeoutFn(() => {
            eventManager.emit(FailEventKey, shared.newInstance((RetriableFailEvent), AlovaEventBase.spawn(method, args), error, retryTimes.current));
            stopManuallyError.current = shared.undefinedValue;
            retryTimes.current = 0; // Reset the number of retries
        });
    };
    const nestedHookProvider = useRequest(handler, {
        ...config,
        __referingObj: referingObject,
        middleware(ctx, next) {
            middleware({
                ...ctx,
                delegatingActions: {
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    stop
                }
            }, () => shared.promiseResolve());
            const { proxyStates, args, send, method, controlLoading } = ctx;
            controlLoading();
            const { loading } = proxyStates;
            const setLoading = (value = shared.falseValue) => {
                loading.v = value;
            };
            const resolveFail = (error) => {
                setLoading();
                proxyStates.error.v = error;
                clearTimeout(retryTimer.current); // Clear retry timer
                emitOnFail(method, args, error);
            };
            if (!loading.v) {
                shared.promiseCatch(stopPromiseObj.current.promise, error => {
                    resolveFail(error);
                    stopPromiseObj.current = shared.usePromise();
                });
            }
            setLoading(shared.trueValue);
            requesting.current = shared.trueValue;
            methodInstanceLastest.current = method;
            argsLatest.current = args;
            /**
             * Consider this situation: user call stop() and send another request immediately, but now the previous request haven't finished. `next()` will raises the branch on completion.
             *
             * By using Promise.race(), we can cause the returned promise to be rejected immediately when call `stop()`
             */
            return next()
                .then(val => {
                // set `loading` to false when request is successful
                setLoading();
                return val;
            }, 
            // Trigger retry mechanism when request fails
            error => {
                // There is no manual trigger to stop, and a retry is triggered when the number of retries does not reach the maximum.
                if (!stopManuallyError.current && (shared.isNumber(retry) ? retryTimes.current < retry : retry(error, ...args))) {
                    retryTimes.current += 1;
                    // Calculate retry delay time
                    const retryDelay = shared.delayWithBackoff(backoff, retryTimes.current);
                    // Delay the corresponding time and try again
                    retryTimer.current = shared.setTimeoutFn(() => {
                        // trigger retry event
                        eventManager.emit(RetryEventKey, shared.newInstance((RetriableRetryEvent), AlovaEventBase.spawn(method, args), retryTimes.current, retryDelay));
                        // If stopped manually, retry will no longer be triggered.
                        shared.promiseCatch(send(...args), shared.noop); // Captured errors will no longer be thrown out, otherwise errors will be thrown when retrying.
                    }, retryDelay);
                }
                else {
                    error = stopManuallyError.current || error; // If stop manually error has a value, it means that the stop is triggered through the stop function.
                    resolveFail(error);
                }
                // Return reject to execute the subsequent error process
                return shared.promiseReject(error);
            })
                .finally(() => {
                requesting.current = shared.falseValue;
            });
        }
    });
    /**
     * Stop retrying, only valid when called during retrying
     * If the request is in progress, trigger an interrupt request and let the request error throw an error. Otherwise, manually modify the status and trigger onFail.
     * The onFail event will be triggered immediately after stopping
     */
    const stop = () => {
        assert$1(nestedHookProvider.__proxyState('loading').v, 'there is no requests being retried');
        stopManuallyError.current = shared.newInstance(shared.AlovaError, hookPrefix, 'stop retry manually');
        if (requesting.current) {
            nestedHookProvider.abort();
        }
        else {
            stopPromiseObj.current.reject(stopManuallyError.current);
        }
    };
    /**
     * Retry event binding
     * They will be triggered after the retry is initiated
     * @param handler Retry event callback
     */
    const onRetry = (handler) => {
        eventManager.on(RetryEventKey, event => handler(event));
    };
    /**
     * failed event binding
     * They will be triggered when there are no more retries, such as when the maximum number of retries is reached, when the retry callback returns false, or when stop is manually called to stop retries.
     * The onError event of alova will be triggered every time an error is requested.
     *
     * Note: If there are no retries, onError, onComplete and onFail will be triggered at the same time.
     *
     * @param handler Failure event callback
     */
    const onFail = (handler) => {
        eventManager.on(FailEventKey, event => handler(event));
    };
    return exposeProvider({
        ...nestedHookProvider,
        stop,
        onRetry,
        onFail
    });
};

let currentHookIndex = 0;
// (id, (hookIndex, Actions))
const actionsMap = {};
const isFrontMiddlewareContext = (context) => !!context.send;
const assert = shared.createAssert('subscriber');
/**
 * Operation function delegation middleware
 * After using this middleware, you can call the delegated function through accessAction.
 * Can delegate multiple identical IDs
 * In order to eliminate the hierarchical restrictions of components
 * @param id Client ID
 * @returns alova middleware function
 */
const actionDelegationMiddleware = (id) => {
    const { ref, onUnmounted } = statesHookHelper(alova.promiseStatesHook());
    const hookIndex = ref(currentHookIndex + 1);
    if (hookIndex.current > currentHookIndex) {
        currentHookIndex += 1;
    }
    onUnmounted(() => {
        var _a;
        if ((_a = actionsMap[id]) === null || _a === void 0 ? void 0 : _a[hookIndex.current]) {
            // delete action on unmount
            delete actionsMap[id][hookIndex.current];
        }
    });
    return (context, next) => {
        // The middleware will be called repeatedly. If you have already subscribed, you do not need to subscribe again.
        const { abort, proxyStates, delegatingActions = {} } = context;
        const update = (newStates) => {
            for (const key in newStates) {
                proxyStates[key] && (proxyStates[key].v = newStates[key]);
            }
        };
        // Those with the same ID will be saved together in the form of an array
        const hooks = (actionsMap[id] = actionsMap[id] || []);
        const handler = isFrontMiddlewareContext(context)
            ? {
                ...delegatingActions,
                send: context.send,
                abort,
                update
            }
            : {
                ...delegatingActions,
                fetch: context.fetch,
                abort,
                update
            };
        hooks[hookIndex.current] = handler;
        return next();
    };
};
/**
 * Access the operation function, if there are multiple matches, onMatch will be called with this
 * @param id Delegator id, or regular expression
 * @param onMatch matching subscribers
 * @param silent Default is false. If true, no error will be reported if there is no match
 */
const accessAction = (id, onMatch, silent = false) => {
    const matched = [];
    if (typeof id === 'symbol' || shared.isString(id) || shared.isNumber(id)) {
        actionsMap[id] && shared.pushItem(matched, ...shared.objectValues(actionsMap[id]));
    }
    else if (shared.instanceOf(id, RegExp)) {
        shared.forEach(shared.filterItem(shared.objectKeys(actionsMap), idItem => id.test(idItem)), idItem => {
            shared.pushItem(matched, ...shared.objectValues(actionsMap[idItem]));
        });
    }
    // its opposite expression is too obscure
    if (matched.length === 0 && !silent) {
        assert(false, `no handler can be matched by using \`${id.toString()}\``);
    }
    shared.forEach(shared.filterItem(matched, shared.$self), onMatch);
};

exports.accessAction = accessAction;
exports.actionDelegationMiddleware = actionDelegationMiddleware;
exports.bootSilentFactory = bootSilentFactory;
exports.createClientTokenAuthentication = createClientTokenAuthentication;
exports.createServerTokenAuthentication = createServerTokenAuthentication;
exports.dehydrateVData = dehydrateVData;
exports.equals = equals;
exports.filterSilentMethods = filterSilentMethods;
exports.getSilentMethod = getSilentMethod;
exports.isVData = isVData;
exports.onBeforeSilentSubmit = onBeforeSilentSubmit;
exports.onSilentSubmitBoot = onSilentSubmitBoot;
exports.onSilentSubmitError = onSilentSubmitError;
exports.onSilentSubmitFail = onSilentSubmitFail;
exports.onSilentSubmitSuccess = onSilentSubmitSuccess;
exports.silentQueueMap = silentQueueMap;
exports.statesHookHelper = statesHookHelper;
exports.stringifyVData = stringifyVData;
exports.updateState = updateState;
exports.updateStateEffect = updateStateEffect;
exports.useAutoRequest = useAutoRequest;
exports.useCaptcha = useCaptcha;
exports.useFetcher = useFetcher;
exports.useForm = useForm;
exports.usePagination = usePagination;
exports.useRequest = useRequest;
exports.useRetriableRequest = useRetriableRequest;
exports.useSQRequest = useSQRequest;
exports.useSSE = useSSE;
exports.useSerialRequest = useSerialRequest;
exports.useSerialWatcher = useSerialWatcher;
exports.useUploader = useUploader;
exports.useWatcher = useWatcher;
