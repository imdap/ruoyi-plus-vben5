"use strict";
// note: max backoff is the maximum that any *single* backoff will do
Object.defineProperty(exports, "__esModule", { value: true });
exports.retryBusySync = exports.retryBusy = exports.codes = exports.MAXRETRIES = exports.RATE = exports.MAXBACKOFF = void 0;
const promises_1 = require("timers/promises");
const error_js_1 = require("./error.js");
exports.MAXBACKOFF = 200;
exports.RATE = 1.2;
exports.MAXRETRIES = 10;
exports.codes = new Set(['EMFILE', 'ENFILE', 'EBUSY']);
const retryBusy = (fn) => {
    const method = async (path, opt, backoff = 1, total = 0) => {
        const mbo = opt.maxBackoff || exports.MAXBACKOFF;
        const rate = opt.backoff || exports.RATE;
        const max = opt.maxRetries || exports.MAXRETRIES;
        let retries = 0;
        while (true) {
            try {
                return await fn(path);
            }
            catch (er) {
                if ((0, error_js_1.isFsError)(er) && er.path === path && exports.codes.has(er.code)) {
                    backoff = Math.ceil(backoff * rate);
                    total = backoff + total;
                    if (total < mbo) {
                        await (0, promises_1.setTimeout)(backoff);
                        return method(path, opt, backoff, total);
                    }
                    if (retries < max) {
                        retries++;
                        continue;
                    }
                }
                throw er;
            }
        }
    };
    return method;
};
exports.retryBusy = retryBusy;
// just retries, no async so no backoff
const retryBusySync = (fn) => {
    const method = (path, opt) => {
        const max = opt.maxRetries || exports.MAXRETRIES;
        let retries = 0;
        while (true) {
            try {
                return fn(path);
            }
            catch (er) {
                if ((0, error_js_1.isFsError)(er) &&
                    er.path === path &&
                    exports.codes.has(er.code) &&
                    retries < max) {
                    retries++;
                    continue;
                }
                throw er;
            }
        }
    };
    return method;
};
exports.retryBusySync = retryBusySync;
//# sourceMappingURL=retry-busy.js.map