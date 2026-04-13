/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

import { forEach, trueValue, setTimeoutFn } from '@alova/shared';
import { ref, getCurrentInstance, onUnmounted, watch, computed, onMounted } from 'vue';

// the vue's predefined hooks
var vue = {
    name: 'Vue',
    create: data => ref(data),
    dehydrate: state => state.value,
    update: (newVal, state) => {
        state.value = newVal;
    },
    effectRequest({ handler, removeStates, immediate, watchingStates }) {
        // if call in component, remove current hook states when unmounting component
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
        if (getCurrentInstance()) {
            onMounted(callback);
        }
        else {
            setTimeoutFn(callback, 10);
        }
    },
    onUnmounted: callback => {
        getCurrentInstance() && onUnmounted(callback);
    }
};

export { vue as default };
