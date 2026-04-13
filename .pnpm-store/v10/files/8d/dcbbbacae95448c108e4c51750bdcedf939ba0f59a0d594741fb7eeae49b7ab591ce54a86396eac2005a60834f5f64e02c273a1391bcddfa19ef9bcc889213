/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

import { forEach, noop, createSyncOnceRunner } from '@alova/shared';
import { createSignal, onCleanup, createEffect, on, createMemo, onMount } from 'solid-js';

// solid hooks predefined
var solid = {
    name: 'Solid',
    create: data => createSignal(data),
    export: state => state[0],
    dehydrate: state => state[0](),
    update: (newVal, state) => {
        state[1](newVal);
    },
    effectRequest: ({ handler, removeStates, immediate, watchingStates = [] }) => {
        // remove states when component unmounted
        onCleanup(removeStates);
        immediate && handler();
        forEach(watchingStates, (state, i) => {
            createEffect(on(state, () => {
                handler(i);
            }, { defer: true }));
        });
    },
    computed: getter => [createMemo(getter), noop],
    watch: (states, callback) => {
        const curStates = Array.isArray(states) ? states : [states];
        const syncRunner = createSyncOnceRunner();
        createEffect(on(curStates.map(state => state), () => syncRunner(() => {
            callback();
        }), { defer: true }));
    },
    onMounted: callback => {
        onMount(callback);
    },
    onUnmounted: callback => {
        onCleanup(callback);
    }
};

export { solid as default };
