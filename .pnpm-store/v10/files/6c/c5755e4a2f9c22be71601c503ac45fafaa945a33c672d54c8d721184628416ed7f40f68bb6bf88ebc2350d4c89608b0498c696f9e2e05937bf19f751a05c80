"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNativeSync = exports.useNative = void 0;
/* c8 ignore next */
const [major = 0, minor = 0] = process.version
    .replace(/^v/, '')
    .split('.')
    .map(v => parseInt(v, 10));
const hasNative = major > 14 || (major === 14 && minor >= 14);
// we do NOT use native by default on Windows, because Node's native
// rm implementation is less advanced.  Change this code if that changes.
exports.useNative = !hasNative || process.platform === 'win32' ?
    () => false
    : opt => !opt?.signal && !opt?.filter;
exports.useNativeSync = !hasNative || process.platform === 'win32' ?
    () => false
    : opt => !opt?.signal && !opt?.filter;
//# sourceMappingURL=use-native.js.map