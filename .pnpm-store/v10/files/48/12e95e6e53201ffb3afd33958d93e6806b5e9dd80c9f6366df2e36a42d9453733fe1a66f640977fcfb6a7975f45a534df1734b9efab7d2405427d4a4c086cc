/**
 * Operators used by Sequence
 */
//// Filters
export function* filter(i, fnFilter) {
    for (const v of i) {
        if (fnFilter(v)) {
            yield v;
        }
    }
}
export function* skip(i, n) {
    let a = 0;
    for (const t of i) {
        if (a >= n) {
            yield t;
        }
        a += 1;
    }
}
export function* take(i, n) {
    let a = 0;
    if (n) {
        for (const t of i) {
            if (a >= n) {
                break;
            }
            yield t;
            a += 1;
        }
    }
}
//// Extenders
/**
 * Concat two iterables together
 */
export function* concat(i, j) {
    yield* i;
    yield* j;
}
export function* concatMap(i, fn) {
    for (const t of i) {
        yield* fn(t);
    }
}
//// Mappers
/**
 * Combine two iterables together using fnMap function.
 */
export function* combine(i, j, fnMap) {
    const jit = j[Symbol.iterator]();
    for (const r of i) {
        const s = jit.next().value;
        yield fnMap(r, s);
    }
}
/**
 * apply a mapping function to an Iterable.
 */
export function map(i, fnMap) {
    function* fn(i, fnMap) {
        for (const v of i) {
            yield fnMap(v);
        }
    }
    return fn(i, fnMap);
}
export function* scan(i, fnReduce, initValue) {
    let index = 0;
    if (initValue === undefined) {
        // We need to create a new iterable to prevent for...of from restarting an array.
        index = 1;
        const iter = i[Symbol.iterator]();
        let r = iter.next();
        if (!r.done)
            yield r.value;
        initValue = r.value;
        i = makeIterable(iter);
    }
    let prevValue = initValue;
    for (const t of i) {
        const nextValue = fnReduce(prevValue, t, index);
        yield nextValue;
        prevValue = nextValue;
        index += 1;
    }
}
//// Reducers
export function all(i, fn) {
    for (const t of i) {
        if (!fn(t)) {
            return false;
        }
    }
    return true;
}
export function any(i, fn) {
    for (const t of i) {
        if (fn(t)) {
            return true;
        }
    }
    return false;
}
export function count(i) {
    return reduce(i, (p) => p + 1, 0);
}
export function first(i, fn, defaultValue) {
    fn = fn || (() => true);
    for (const t of i) {
        if (fn(t)) {
            return t;
        }
    }
    return defaultValue;
}
export function forEach(i, fn) {
    let index = 0;
    for (const t of i) {
        fn(t, index);
        index += 1;
    }
}
export function max(i, selector = (t) => t) {
    return reduce(i, (p, c) => (selector(c) > selector(p) ? c : p), undefined);
}
export function min(i, selector = (t) => t) {
    return reduce(i, (p, c) => (selector(c) < selector(p) ? c : p), undefined);
}
export function reduce(i, fnReduce, initialValue) {
    // We need to create a new iterable to prevent for...of from restarting an array.
    const iter = makeIterable(i[Symbol.iterator]());
    let index = 0;
    if (initialValue === undefined) {
        index = 1;
        const r = iter.next();
        initialValue = r.value;
    }
    let prevValue = initialValue;
    for (const t of iter) {
        const nextValue = fnReduce(prevValue, t, index);
        prevValue = nextValue;
        index += 1;
    }
    return prevValue;
}
export async function reduceAsync(i, fnReduce, initialValue) {
    // We need to create a new iterable to prevent for...of from restarting an array.
    const iter = makeIterable(i[Symbol.iterator]());
    let index = 0;
    if (initialValue === undefined) {
        index = 1;
        const r = iter.next();
        initialValue = r.value;
    }
    let previousValue = await initialValue;
    for (const p of iter) {
        const t = await p;
        const nextValue = await fnReduce(previousValue, t, index);
        previousValue = nextValue;
        index += 1;
    }
    return previousValue;
}
export async function reduceAsyncForAsyncIterator(i, fnReduce, initialValue) {
    const iter = makeAsyncIterable(i[Symbol.asyncIterator]());
    let index = 0;
    if (initialValue === undefined) {
        index = 1;
        const r = await iter.next();
        initialValue = r.value;
    }
    let previousValue = await initialValue;
    for await (const t of iter) {
        const nextValue = await fnReduce(previousValue, t, index);
        previousValue = nextValue;
        index += 1;
    }
    return previousValue;
}
//// Utilities
/**
 * Convert an Iterator into an IterableIterator
 */
export function makeIterable(i) {
    function* fromIterator(i) {
        for (let r = i.next(); !r.done; r = i.next()) {
            yield r.value;
        }
    }
    function* fromIterable(i) {
        yield* i;
    }
    return isIterable(i) ? (isIterableIterator(i) ? i : fromIterable(i)) : fromIterator(i);
}
export function isIterable(i) {
    return !!i[Symbol.iterator];
}
export function isIterableIterator(i) {
    return typeof i.next == 'function';
}
export function makeAsyncIterable(i) {
    async function* fromIterable(i) {
        for (const v of i) {
            yield v;
        }
    }
    async function* fromIterator(i) {
        for (let r = await i.next(); !r.done; r = await i.next()) {
            yield r.value;
        }
    }
    async function* fromAsyncIterable(i) {
        yield* i;
    }
    return isAsyncIterable(i) ? (isAsyncIterableIterator(i) ? i : fromAsyncIterable(i)) : isIterable(i) ? fromIterable(i) : fromIterator(i);
}
export function isAsyncIterable(i) {
    return !!i[Symbol.asyncIterator];
}
export function isAsyncIterableIterator(i) {
    return typeof i.next == 'function';
}
export function scanMap(accFn, init) {
    let acc = init;
    let first = true;
    return function (value) {
        if (first && acc === undefined) {
            first = false;
            acc = value;
            return acc;
        }
        acc = accFn(acc, value);
        return acc;
    };
}
//# sourceMappingURL=operatorsBase.js.map