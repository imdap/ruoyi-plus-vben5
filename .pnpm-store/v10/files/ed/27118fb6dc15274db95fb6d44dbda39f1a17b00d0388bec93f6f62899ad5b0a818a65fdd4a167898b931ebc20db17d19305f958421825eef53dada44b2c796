/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('solid-js')) :
  typeof define === 'function' && define.amd ? define(['solid-js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.solidHook = factory(global.Solid));
})(this, (function (solidJs) { 'use strict';

  /**
    * @alova/shared 1.3.2 (https://alova.js.org)
    * Document https://alova.js.org
    * Copyright 2026 Scott Hu. All Rights Reserved
    * Licensed under MIT (https://github.com/alovajs/alova/blob/main/LICENSE)
  */

  const undefStr = 'undefined';
  const undefinedValue = undefined;
  const setTimeoutFn = (fn, delay = 0) => setTimeout(fn, delay);
  const forEach = (ary, fn) => ary.forEach(fn);
  // Whether it is running on the server side, node and bun are judged by process, and deno is judged by Deno.
  // Some frameworks (such as Alipay and uniapp) will inject the process object as a global variable which `browser` is true
  typeof window === undefStr && (typeof process !== undefStr ? !process.browser : typeof Deno !== undefStr);

  /**
   * Empty function for compatibility processing
   */
  const noop = () => { };
  /**
   * Create an executor that calls multiple times synchronously and only executes it once asynchronously
   */
  const createSyncOnceRunner = (delay = 0) => {
      let timer = undefinedValue;
      // Executing multiple calls to this function will execute once asynchronously
      return (fn) => {
          if (timer) {
              clearTimeout(timer);
          }
          timer = setTimeoutFn(fn, delay);
      };
  };

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
          forEach(watchingStates, (state, i) => {
              solidJs.createEffect(solidJs.on(state, () => {
                  handler(i);
              }, { defer: true }));
          });
      },
      computed: getter => [solidJs.createMemo(getter), noop],
      watch: (states, callback) => {
          const curStates = Array.isArray(states) ? states : [states];
          const syncRunner = createSyncOnceRunner();
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

  return solid;

}));
