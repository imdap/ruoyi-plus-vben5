/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

'use strict';

var shared = require('@alova/shared');
var vueDemi$1 = require('vue-demi');

// Vue’s predefined hooks
var vueDemi = {
    name: 'VueDemi',
    create: data => vueDemi$1.ref(data),
    dehydrate: state => state.value,
    update: (newVal, state) => {
        state.value = newVal;
    },
    effectRequest({ handler, removeStates, immediate, watchingStates }) {
        // When used inside a component, the corresponding state is removed when the component is unloaded.
        if (vueDemi$1.getCurrentInstance()) {
            vueDemi$1.onUnmounted(removeStates);
        }
        immediate && handler();
        shared.forEach(watchingStates || [], (state, i) => {
            vueDemi$1.watch(state, () => {
                handler(i);
            }, { deep: shared.trueValue });
        });
    },
    computed: getter => vueDemi$1.computed(getter),
    watch: (states, callback) => {
        vueDemi$1.watch(states, callback, {
            deep: shared.trueValue
        });
    },
    onMounted: callback => {
        vueDemi$1.onMounted(callback);
    },
    onUnmounted: callback => {
        vueDemi$1.onUnmounted(callback);
    }
};

module.exports = vueDemi;
