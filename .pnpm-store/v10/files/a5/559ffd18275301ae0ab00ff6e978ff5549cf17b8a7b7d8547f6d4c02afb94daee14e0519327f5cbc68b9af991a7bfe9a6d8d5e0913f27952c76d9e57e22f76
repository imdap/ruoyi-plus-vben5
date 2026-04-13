/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

'use strict';

var shared = require('@alova/shared');
var svelte$1 = require('svelte');
var store = require('svelte/store');

// the svelte predefined hooks
var svelte = {
    name: 'Svelte',
    create: data => store.writable(data),
    dehydrate: state => {
        let raw;
        // The function will be executed once when subscribing, and the unsubscribe function will be called immediately after the value is obtained
        state.subscribe(value => {
            raw = value;
        })();
        return raw;
    },
    update: (newVal, state) => {
        state.set(newVal);
    },
    effectRequest({ handler, removeStates, immediate, watchingStates }) {
        // Remove the corresponding state when the component is unmounted
        !shared.isSSR && svelte$1.onDestroy(removeStates);
        svelte$1.onMount(() => {
            immediate && handler();
        });
        shared.forEach(watchingStates || [], (state, i) => {
            let needEmit = shared.falseValue;
            state.subscribe(() => {
                // Svelte's `writable` will trigger once by default, so when immediate is false, you need to filter out the first trigger call
                needEmit ? handler(i) : (needEmit = shared.trueValue);
            });
        });
    },
    computed: (getter, depList) => store.derived(depList, getter),
    watch: (states, callback) => {
        let needEmit = shared.falseValue;
        const syncRunner = shared.createSyncOnceRunner();
        states.forEach(state => {
            state.subscribe(() => {
                syncRunner(() => {
                    needEmit ? callback() : (needEmit = shared.trueValue);
                });
            });
        });
    },
    onMounted: callback => {
        svelte$1.onMount(callback);
    },
    onUnmounted: callback => {
        !shared.isSSR && svelte$1.onDestroy(callback);
    }
};

module.exports = svelte;
