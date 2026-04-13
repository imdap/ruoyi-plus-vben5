import type { PipeFn } from '../internalTypes.js';
export declare function opFirstAsync<T, S extends T>(firstFn: (v: T) => v is S): (iter: AsyncIterable<T>) => AsyncIterable<S>;
export declare function opFirstAsync<T, S extends Awaited<T>>(firstFn: (v: Awaited<T>) => v is S): (iter: AsyncIterable<T>) => AsyncIterable<S>;
export declare function opFirstAsync<T>(firstFn: (v: Awaited<T>) => boolean): (iter: AsyncIterable<T>) => AsyncIterable<Awaited<T>>;
export declare function opFirstAsync<T>(firstFn: (v: Awaited<T>) => Promise<boolean>): (iter: AsyncIterable<T>) => AsyncIterable<Awaited<T>>;
export declare function opFirstSync<T, S extends T>(firstFn: (v: T) => v is S): (iter: Iterable<T>) => Iterable<S>;
export declare function opFirstSync<T>(firstFn: (v: T) => boolean): (iter: Iterable<T>) => Iterable<T>;
export declare function opFirst<T, S extends T>(fn: (v: T) => v is S): PipeFn<T, S>;
export declare function opFirst<T>(fn: (v: T) => boolean): PipeFn<T, T>;
//# sourceMappingURL=first.d.ts.map