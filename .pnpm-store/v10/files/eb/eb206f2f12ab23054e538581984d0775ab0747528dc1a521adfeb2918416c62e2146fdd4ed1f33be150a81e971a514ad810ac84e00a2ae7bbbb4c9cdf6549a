/**
  * @alova/client 2.0.0 (https://alova.js.org)
  * Document https://alova.js.org
  * Copyright 2026 Scott hu. All Rights Reserved
  * Licensed under MIT (git://github.com/alovajs/alova/blob/main/LICENSE)
*/

import { noop, undefinedValue, isNumber, falseValue } from '@alova/shared';
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

const stateToData = (reactState) => (2 in reactState ? reactState[2] : reactState[0]);
const refCurrent = (ref) => ref.current;
const setRef = (ref, newVal) => {
    ref.current = newVal;
};
// the react predefined hooks
var react = {
    name: 'React',
    create: initialValue => useState(initialValue),
    export: stateToData,
    dehydrate: stateToData,
    update: (newVal, state) => {
        // update value synchronously so that we can access the new value synchronously.
        state[2] = newVal;
        state[1](newVal);
    },
    memorize: fn => {
        // use `useCallback` to ensure the same reference, and refer the newest function with `useRef`
        const fnRef = useRef(noop);
        setRef(fnRef, fn);
        return useCallback((...args) => refCurrent(fnRef)(...args), []);
    },
    ref: initialValue => {
        const refObj = useRef(initialValue);
        refCurrent(refObj) === undefinedValue && setRef(refObj, initialValue);
        return refObj;
    },
    effectRequest({ handler, removeStates, immediate, watchingStates = [] }) {
        // `handler` is called when some states change are detected
        const oldStates = useRef(watchingStates);
        useEffect(() => {
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
        useEffect(() => removeStates, []);
    },
    computed: (getter, depList) => {
        const memo = useMemo(getter, depList);
        return [memo, noop];
    },
    watch: (states, callback) => {
        // When there is a monitoring state, the state changes and then triggers
        const needEmit = useRef(falseValue);
        useEffect(() => {
            needEmit.current ? callback() : (needEmit.current = true);
        }, states);
    },
    onMounted: callback => {
        useEffect(callback, []);
    },
    onUnmounted: callback => {
        useEffect(() => callback, []);
    }
};

export { react as default };
