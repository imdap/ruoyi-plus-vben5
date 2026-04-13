/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue-demi')) :
  typeof define === 'function' && define.amd ? define(['vue-demi'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vueHook = factory(global.Vue));
})(this, (function (vueDemi$1) { 'use strict';

  /**
    * @alova/shared 1.3.2 (https://alova.js.org)
    * Document https://alova.js.org
    * Copyright 2026 Scott Hu. All Rights Reserved
    * Licensed under MIT (https://github.com/alovajs/alova/blob/main/LICENSE)
  */

  const undefStr = 'undefined';
  const trueValue = true;
  const forEach = (ary, fn) => ary.forEach(fn);
  // Whether it is running on the server side, node and bun are judged by process, and deno is judged by Deno.
  // Some frameworks (such as Alipay and uniapp) will inject the process object as a global variable which `browser` is true
  typeof window === undefStr && (typeof process !== undefStr ? !process.browser : typeof Deno !== undefStr);

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
          forEach(watchingStates || [], (state, i) => {
              vueDemi$1.watch(state, () => {
                  handler(i);
              }, { deep: trueValue });
          });
      },
      computed: getter => vueDemi$1.computed(getter),
      watch: (states, callback) => {
          vueDemi$1.watch(states, callback, {
              deep: trueValue
          });
      },
      onMounted: callback => {
          vueDemi$1.onMounted(callback);
      },
      onUnmounted: callback => {
          vueDemi$1.onUnmounted(callback);
      }
  };

  return vueDemi;

}));
