import type { PipeFn } from '../internalTypes.js';
export declare function opLastAsync<T, S extends T>(lastFn: (v: T) => v is S): (iter: AsyncIterable<T>) => AsyncIterable<S>;
export declare function opLastAsync<T, S extends Awaited<T>>(lastFn: (v: Awaited<T>) => v is S): (iter: AsyncIterable<T>) => AsyncIterable<S>;
export declare function opLastAsync<T>(lastFn: (v: Awaited<T>) => boolean): (iter: AsyncIterable<T>) => AsyncIterable<Awaited<T>>;
export declare function opLastAsync<T>(lastFn: (v: Awaited<T>) => Promise<boolean>): (iter: AsyncIterable<T>) => AsyncIterable<Awaited<T>>;
export declare function opLastSync<T, S extends T>(lastFn: (v: T) => v is S): (iter: Iterable<T>) => Iterable<S>;
export declare function opLastSync<T>(lastFn: (v: T) => boolean): (iter: Iterable<T>) => Iterable<T>;
export declare function opLast<T, S extends T>(fn: (v: T) => v is S): PipeFn<T, S>;
export declare function opLast<T>(fn: (v: T) => boolean): PipeFn<T, T>;
//# sourceMappingURL=last.d.ts.map