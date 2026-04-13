import { isArrayEqual } from './util.js';
export function memoizeLastCall(fn) {
    let last;
    return (...p) => {
        if (last && isArrayEqual(last.args, p)) {
            return last.value;
        }
        const args = p;
        const value = fn(...args);
        last = { args, value };
        return value;
    };
}
//# sourceMappingURL=memoizeLastCall.js.map