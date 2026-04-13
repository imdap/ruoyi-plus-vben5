/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

import { isSSR, forEach, trueValue, createSyncOnceRunner, falseValue } from '@alova/shared';
import { onDestroy, onMount } from 'svelte';
import { writable, derived } from 'svelte/store';

// the svelte predefined hooks
var svelte = {
    name: 'Svelte',
    create: data => writable(data),
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
        !isSSR && onDestroy(removeStates);
        onMount(() => {
            immediate && handler();
        });
        forEach(watchingStates || [], (state, i) => {
            let needEmit = falseValue;
            state.subscribe(() => {
                // Svelte's `writable` will trigger once by default, so when immediate is false, you need to filter out the first trigger call
                needEmit ? handler(i) : (needEmit = trueValue);
            });
        });
    },
    computed: (getter, depList) => derived(depList, getter),
    watch: (states, callback) => {
        let needEmit = falseValue;
        const syncRunner = createSyncOnceRunner();
        states.forEach(state => {
            state.subscribe(() => {
                syncRunner(() => {
                    needEmit ? callback() : (needEmit = trueValue);
                });
            });
        });
    },
    onMounted: callback => {
        onMount(callback);
    },
    onUnmounted: callback => {
        !isSSR && onDestroy(callback);
    }
};

export { svelte as default };
