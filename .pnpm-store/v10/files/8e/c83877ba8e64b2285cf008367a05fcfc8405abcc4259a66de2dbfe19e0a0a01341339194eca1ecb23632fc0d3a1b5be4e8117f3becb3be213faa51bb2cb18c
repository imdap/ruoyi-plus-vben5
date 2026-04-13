// prettier-ignore
export function memoizeWeak(fn) {
    const r = {};
    function find(p) {
        let n = r;
        for (const k of p) {
            if (!n)
                break;
            n = n.c?.get(k);
        }
        return n;
    }
    function set(p, v) {
        let n = r;
        for (const k of p) {
            const c = n.c?.get(k);
            if (c) {
                n = c;
                continue;
            }
            const r = {};
            n.c = n.c || new WeakMap();
            n.c.set(k, r);
            n = r;
        }
        n.v = v;
    }
    return (...p) => {
        const f = find(p);
        if (f && 'v' in f) {
            return f.v;
        }
        const v = fn(...p);
        set(p, v);
        return v;
    };
}
//# sourceMappingURL=memoizeWeak.js.map