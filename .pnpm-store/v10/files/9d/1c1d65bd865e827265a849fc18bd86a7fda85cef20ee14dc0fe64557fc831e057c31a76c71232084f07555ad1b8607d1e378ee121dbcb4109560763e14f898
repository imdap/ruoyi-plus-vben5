/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

'use strict';

var shared = require('@alova/shared');
var vue = require('vue');

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

const errorSerializer = {
    forward: err => shared.instanceOf(err, Error)
        ? {
            name: err.name,
            message: err.message,
            stack: err.stack
        }
        : shared.undefinedValue,
    backward: (errPayload) => {
        const err = new Error(errPayload.message);
        err.name = errPayload.name;
        err.stack = errPayload.stack;
        return err;
    }
};
const counterKey = '__ALOVA_COUNTER';
const assert = shared.createAssert('nuxt-hook');
let allowRequest = shared.isSSR;
// the vue's predefined hooks
var nuxt = ({ nuxtApp: useNuxtApp, serializers = {} }) => {
    assert(shared.isFn(useNuxtApp), '`useNuxtApp` is required in nuxt states hook');
    const performer = createSerializerPerformer({
        error: errorSerializer,
        ...serializers
    });
    const getCounter = (key) => {
        const nuxtApp = useNuxtApp();
        nuxtApp[counterKey] = nuxtApp[counterKey] || 0;
        const counter = (nuxtApp[counterKey] += 1);
        return `alova_${key}_${counter}`;
    };
    return {
        name: 'Vue',
        create: (data, key) => {
            var _a;
            const nuxtApp = useNuxtApp();
            const stateKey = getCounter(key);
            const nuxtStatePayload = nuxtApp.payload[stateKey];
            //  deserialize data in client
            const state = vue.ref((_a = performer.deserialize(nuxtStatePayload)) !== null && _a !== void 0 ? _a : data);
            shared.isSSR &&
                nuxtApp.hooks.hook('app:rendered', () => {
                    // serialize data in server so that it can be jsonify, and deserialize in client ↑↑↑
                    nuxtApp.payload[stateKey] = performer.serialize(state.value);
                });
            return state;
        },
        dehydrate: state => state.value,
        update: (newVal, state) => {
            // serialize data in server, and deserialize in client ↑↑↑
            state.value = newVal;
        },
        effectRequest({ handler, removeStates, immediate, watchingStates }, referingObject) {
            if (vue.getCurrentInstance()) {
                vue.onUnmounted(removeStates);
            }
            const nuxtApp = useNuxtApp();
            const stateKey = getCounter('initialRequest');
            let initialRequestInServer = referingObject.initialRequest;
            // sync the initial request flag to client, and then it can judge whether the request is allowed in client
            if (shared.isSSR) {
                nuxtApp.hooks.hook('app:rendered', () => {
                    nuxtApp.payload[stateKey] = referingObject.initialRequest;
                });
            }
            else {
                initialRequestInServer = !!nuxtApp.payload[stateKey];
                !allowRequest &&
                    nuxtApp.hooks.hook('page:loading:end', () => {
                        allowRequest = shared.trueValue;
                    });
            }
            // if initialRequestInServer is `false`, it indicated that is not call hook with `await`, so it need to request in client
            immediate && (allowRequest || !initialRequestInServer) && handler();
            watchingStates === null || watchingStates === void 0 ? void 0 : watchingStates.forEach((state, i) => {
                vue.watch(state, () => {
                    handler(i);
                }, { deep: shared.trueValue });
            });
        },
        computed: getter => vue.computed(getter),
        watch: (states, callback) => {
            vue.watch(states, callback, {
                deep: shared.trueValue
            });
        },
        onMounted: callback => {
            if (vue.getCurrentInstance()) {
                vue.onMounted(callback);
            }
            else {
                setTimeout(callback, 10);
            }
        },
        onUnmounted: callback => {
            vue.getCurrentInstance() && vue.onUnmounted(callback);
        }
    };
};

module.exports = nuxt;
