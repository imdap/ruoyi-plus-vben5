/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

'use strict';

var shared = require('@alova/shared');
var react$1 = require('react');

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
        const fnRef = react$1.useRef(shared.noop);
        setRef(fnRef, fn);
        return react$1.useCallback((...args) => refCurrent(fnRef)(...args), []);
    },
    ref: initialValue => {
        const refObj = react$1.useRef(initialValue);
        refCurrent(refObj) === shared.undefinedValue && setRef(refObj, initialValue);
        return refObj;
    },
    effectRequest({ handler, removeStates, immediate, watchingStates = [] }) {
        // `handler` is called when some states change are detected
        const oldStates = react$1.useRef(watchingStates);
        react$1.useEffect(() => {
            const oldStatesValue = refCurrent(oldStates);
            // compare the old and new value, and get the index of changed state
            let changedIndex = shared.undefinedValue;
            for (const index in watchingStates) {
                if (!Object.is(oldStatesValue[index], watchingStates[index])) {
                    changedIndex = Number(index);
                    break;
                }
            }
            setRef(oldStates, watchingStates);
            if (immediate || shared.isNumber(changedIndex)) {
                handler(changedIndex);
            }
        }, watchingStates);
        // remove states when component is unmounted
        react$1.useEffect(() => removeStates, []);
    },
    computed: (getter, depList) => {
        const memo = react$1.useMemo(getter, depList);
        return [memo, shared.noop];
    },
    watch: (states, callback) => {
        // When there is a monitoring state, the state changes and then triggers
        const needEmit = react$1.useRef(shared.falseValue);
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

module.exports = react;
