import { format } from 'node:util';
function getTypeOf(t) {
    return typeof t;
}
const allowStringOrUndefined = {
    string: true,
    undefined: true,
};
const allowNumberOrUndefined = {
    number: true,
    undefined: true,
};
export function isErrnoException(e) {
    if (!e || typeof e !== 'object')
        return false;
    if (!isError(e))
        return false;
    const ex = e;
    return ((typeof ex.errno) in allowNumberOrUndefined &&
        (typeof ex.code) in allowStringOrUndefined &&
        (typeof ex.path) in allowStringOrUndefined);
}
export function isError(e) {
    if (e instanceof Error)
        return true;
    if (!e || typeof e !== 'object')
        return false;
    const ex = e;
    return typeof ex.name === 'string' && typeof ex.message === 'string' && (typeof ex.stack) in allowStringOrUndefined;
}
export function toError(e, errorFactory = UnknownError) {
    if (isError(e))
        return e;
    return new errorFactory(e);
}
export class UnknownError extends Error {
    cause;
    constructor(cause) {
        super(format(cause));
        this.cause = cause;
    }
}
export function catchPromiseError(p, handler) {
    if (p === undefined)
        return undefined;
    return _catchPromiseError(p, handler);
}
export function wrapCall(fn, handler) {
    return (...p) => {
        try {
            return fn(...p);
        }
        catch (e) {
            return handler(e);
        }
    };
}
async function _catchPromiseError(p, handler) {
    try {
        return await p;
    }
    catch (e) {
        return handler(e);
    }
}
export const __testing__ = {
    getTypeOf,
};
//# sourceMappingURL=errors.js.map