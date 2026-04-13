/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.reactHook = factory(global.React));
})(this, (function (react$1) { 'use strict';

  /**
    * @alova/shared 1.3.2 (https://alova.js.org)
    * Document https://alova.js.org
    * Copyright 2026 Scott Hu. All Rights Reserved
    * Licensed under MIT (https://github.com/alovajs/alova/blob/main/LICENSE)
  */

  const undefStr = 'undefined';
  const undefinedValue = undefined;
  const falseValue = false;
  const typeOf = (arg) => typeof arg;
  // Whether it is running on the server side, node and bun are judged by process, and deno is judged by Deno.
  // Some frameworks (such as Alipay and uniapp) will inject the process object as a global variable which `browser` is true
  typeof window === undefStr && (typeof process !== undefStr ? !process.browser : typeof Deno !== undefStr);

  /**
   * Empty function for compatibility processing
   */
  const noop = () => { };
  /**
   * Determine whether the parameter is a number any parameter
   * @returns Whether the parameter is a number
   */
  const isNumber = (arg) => typeOf(arg) === 'number' && !Number.isNaN(arg);

  const stateToData = (reactState) => (2 in reactState ? reactState[2] : reactState[0]);
  const refCurrent = (ref) => ref.current;
  const setRef = (ref, newVal) => {
      ref.current = newVal;
  };
  // the react predefined hooks
  var react = {
      name: 'React',
      create: initialValue => react$1.useState(initialValue),
      export: stateToData,
      dehydrate: stateToData,
      update: (newVal, state) => {
          // update value synchronously so that we can access the new value synchronously.
          state[2] = newVal;
          state[1](newVal);
      },
      memorize: fn => {
          // use `useCallback` to ensure the same reference, and refer the newest function with `useRef`
          const fnRef = react$1.useRef(noop);
          setRef(fnRef, fn);
          return react$1.useCallback((...args) => refCurrent(fnRef)(...args), []);
      },
      ref: initialValue => {
          const refObj = react$1.useRef(initialValue);
          refCurrent(refObj) === undefinedValue && setRef(refObj, initialValue);
          return refObj;
      },
      effectRequest({ handler, removeStates, immediate, watchingStates = [] }) {
          // `handler` is called when some states change are detected
          const oldStates = react$1.useRef(watchingStates);
          react$1.useEffect(() => {
              const oldStatesValue = refCurrent(oldStates);
              // compare the old and new value, and get the index of changed state
              let changedIndex = undefinedValue;
              for (const index in watchingStates) {
                  if (!Object.is(oldStatesValue[index], watchingStates[index])) {
                      changedIndex = Number(index);
                      break;
                  }
              }
              setRef(oldStates, watchingStates);
              if (immediate || isNumber(changedIndex)) {
                  handler(changedIndex);
              }
          }, watchingStates);
          // remove states when component is unmounted
          react$1.useEffect(() => removeStates, []);
      },
      computed: (getter, depList) => {
          const memo = react$1.useMemo(getter, depList);
          return [memo, noop];
      },
      watch: (states, callback) => {
          // When there is a monitoring state, the state changes and then triggers
          const needEmit = react$1.useRef(falseValue);
          react$1.useEffect(() => {
              needEmit.current ? callback() : (needEmit.current = true);
          }, states);
      },
      onMounted: callback => {
          react$1.useEffect(callback, []);
      },
      onUnmounted: callback => {
          react$1.useEffect(() => callback, []);
      }
  };

  return react;

}));
