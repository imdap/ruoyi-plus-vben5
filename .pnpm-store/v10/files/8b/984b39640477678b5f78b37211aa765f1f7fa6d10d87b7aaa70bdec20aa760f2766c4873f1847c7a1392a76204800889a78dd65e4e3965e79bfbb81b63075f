import { onClearCache } from '../events/index.js';
import { AutoResolveWeakCache } from '../util/AutoResolve.js';
export class CalcLeftRightResultWeakCache {
    map = new AutoResolveWeakCache();
    _toDispose;
    constructor() {
        this._toDispose = onClearCache(() => {
            this.clear();
        });
    }
    get(left, right, calc) {
        const m = this.map.get(left, () => new AutoResolveWeakCache());
        return m.get(right, () => calc(left, right));
    }
    clear() {
        this.map.clear();
    }
    dispose() {
        this.map.dispose();
        this._toDispose?.dispose();
        this._toDispose = undefined;
    }
    stats() {
        return this.map.stats();
    }
}
//# sourceMappingURL=mergeCache.js.map