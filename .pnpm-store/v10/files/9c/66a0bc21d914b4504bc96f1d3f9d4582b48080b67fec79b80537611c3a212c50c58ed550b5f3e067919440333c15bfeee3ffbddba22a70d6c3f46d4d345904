/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

'use strict';

var shared = require('@alova/shared');
var solidJs = require('solid-js');

// solid hooks predefined
var solid = {
    name: 'Solid',
    create: data => solidJs.createSignal(data),
    export: state => state[0],
    dehydrate: state => state[0](),
    update: (newVal, state) => {
        state[1](newVal);
    },
    effectRequest: ({ handler, removeStates, immediate, watchingStates = [] }) => {
        // remove states when component unmounted
        solidJs.onCleanup(removeStates);
        immediate && handler();
        shared.forEach(watchingStates, (state, i) => {
            solidJs.createEffect(solidJs.on(state, () => {
                handler(i);
            }, { defer: true }));
        });
    },
    computed: getter => [solidJs.createMemo(getter), shared.noop],
    watch: (states, callback) => {
        const curStates = Array.isArray(states) ? states : [states];
        const syncRunner = shared.createSyncOnceRunner();
        solidJs.createEffect(solidJs.on(curStates.map(state => state), () => syncRunner(() => {
            callback();
        }), { defer: true }));
    },
    onMounted: callback => {
        solidJs.onMount(callback);
    },
    onUnmounted: callback => {
        solidJs.onCleanup(callback);
    }
};

module.exports = solid;
