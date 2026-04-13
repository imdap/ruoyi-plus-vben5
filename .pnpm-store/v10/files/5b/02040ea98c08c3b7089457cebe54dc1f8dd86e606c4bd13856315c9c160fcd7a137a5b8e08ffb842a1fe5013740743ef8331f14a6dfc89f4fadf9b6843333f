/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

import { forEach, trueValue } from '@alova/shared';
import { ref, getCurrentInstance, onUnmounted, watch, computed, onMounted } from 'vue-demi';

// Vue’s predefined hooks
var vueDemi = {
    name: 'VueDemi',
    create: data => ref(data),
    dehydrate: state => state.value,
    update: (newVal, state) => {
        state.value = newVal;
    },
    effectRequest({ handler, removeStates, immediate, watchingStates }) {
        // When used inside a component, the corresponding state is removed when the component is unloaded.
        if (getCurrentInstance()) {
            onUnmounted(removeStates);
        }
        immediate && handler();
        forEach(watchingStates || [], (state, i) => {
            watch(state, () => {
                handler(i);
            }, { deep: trueValue });
        });
    },
    computed: getter => computed(getter),
    watch: (states, callback) => {
        watch(states, callback, {
            deep: trueValue
        });
    },
    onMounted: callback => {
        onMounted(callback);
    },
    onUnmounted: callback => {
        onUnmounted(callback);
    }
};

export { vueDemi as default };
