import { GlobMatcher } from 'cspell-glob';
import { onClearCache } from '../events/index.js';
const simpleGlobCache = new Map();
let globCache = new WeakMap();
onClearCache(() => {
    globCache = new WeakMap();
    simpleGlobCache.clear();
});
const emptyIgnorePaths = [];
export function getGlobMatcherForExcluding(glob) {
    if (!glob || (Array.isArray(glob) && !glob.length))
        return getGlobMatcherGlobGlob(emptyIgnorePaths);
    return typeof glob === 'string' ? getGlobMatcherGlobString(glob) : getGlobMatcherGlobGlob(glob);
}
function getGlobMatcherGlobString(glob) {
    const cached = simpleGlobCache.get(glob);
    if (cached)
        return cached;
    const m = new GlobMatcher(glob);
    simpleGlobCache.set(glob, m);
    return m;
}
function getGlobMatcherGlobGlob(glob) {
    const cached = globCache.get(glob);
    if (cached)
        return cached;
    const m = new GlobMatcher(glob);
    globCache.set(glob, m);
    return m;
}
//# sourceMappingURL=getGlobMatcher.js.map