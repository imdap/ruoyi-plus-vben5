import type { CacheStats } from '../util/AutoResolve.js';
interface IDisposable {
    dispose(): void;
}
export declare class CalcLeftRightResultWeakCache<TL extends object, TR extends object, R> implements IDisposable {
    private map;
    private _toDispose;
    constructor();
    get(left: TL, right: TR, calc: (left: TL, right: TR) => R): R;
    clear(): void;
    dispose(): void;
    stats(): Readonly<CacheStats>;
}
export {};
//# sourceMappingURL=mergeCache.d.ts.map