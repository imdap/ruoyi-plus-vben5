/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

'use strict';

var shared = require('@alova/shared');
var vue$1 = require('vue');

// the vue's predefined hooks
var vue = {
    name: 'Vue',
    create: data => vue$1.ref(data),
    dehydrate: state => state.value,
    update: (newVal, state) => {
        state.value = newVal;
    },
    effectRequest({ handler, removeStates, immediate, watchingStates }) {
        // if call in component, remove current hook states when unmounting component
        if (vue$1.getCurrentInstance()) {
            vue$1.onUnmounted(removeStates);
        }
        immediate && handler();
        shared.forEach(watchingStates || [], (state, i) => {
            vue$1.watch(state, () => {
                handler(i);
            }, { deep: shared.trueValue });
        });
    },
    computed: getter => vue$1.computed(getter),
    watch: (states, callback) => {
        vue$1.watch(states, callback, {
            deep: shared.trueValue
        });
    },
    onMounted: callback => {
        if (vue$1.getCurrentInstance()) {
            vue$1.onMounted(callback);
        }
        else {
            shared.setTimeoutFn(callback, 10);
        }
    },
    onUnmounted: callback => {
        vue$1.getCurrentInstance() && vue$1.onUnmounted(callback);
    }
};

module.exports = vue;
