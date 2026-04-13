import type { PipeFn } from '../internalTypes.js';
export declare function opFilterAsync<T, S extends T>(filterFn: (v: T) => v is S): (iter: AsyncIterable<T>) => AsyncIterable<S>;
export declare function opFilterAsync<T, S extends Awaited<T>>(filterFn: (v: Awaited<T>) => v is S): (iter: AsyncIterable<T>) => AsyncIterable<S>;
export declare function opFilterAsync<T>(filterFn: (v: Awaited<T>) => boolean): (iter: AsyncIterable<T>) => AsyncIterable<Awaited<T>>;
export declare function opFilterAsync<T>(filterFn: (v: Awaited<T>) => Promise<boolean>): (iter: AsyncIterable<T>) => AsyncIterable<Awaited<T>>;
export declare function opFilterSync<T, S extends T>(filterFn: (v: T) => v is S): (iter: Iterable<T>) => Iterable<S>;
export declare function opFilterSync<T>(filterFn: (v: T) => boolean): (iter: Iterable<T>) => Iterable<T>;
export declare function _opFilterSync<T, S extends T>(filterFn: (v: T) => v is S): (iter: Iterable<T>) => Iterable<S>;
export declare function _opFilterSync<T>(filterFn: (v: T) => boolean): (iter: Iterable<T>) => Iterable<T>;
export declare function opFilter<T, S extends T>(fn: (v: T) => v is S): PipeFn<T, S>;
export declare function opFilter<T>(fn: (v: T) => boolean): PipeFn<T, T>;
//# sourceMappingURL=filter.d.ts.map