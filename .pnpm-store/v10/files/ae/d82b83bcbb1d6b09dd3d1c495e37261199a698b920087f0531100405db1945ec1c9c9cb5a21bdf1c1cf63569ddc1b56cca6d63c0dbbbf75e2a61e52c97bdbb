import { InternalNamePath } from "../types.js";

//#region src/form/utils/NameMap.d.ts
interface KV<T> {
  key: InternalNamePath;
  value: T;
}
/**
 * NameMap like a `Map` but accepts `string[]` as key.
 */
declare class NameMap<T> {
  private kvs;
  set(key: InternalNamePath, value: T): void;
  get(key: InternalNamePath): T | undefined;
  update(key: InternalNamePath, updater: (origin: T) => T | null): void;
  delete(key: InternalNamePath): void;
  map<U>(callback: (kv: KV<T>) => U): U[];
  toJSON(): Record<string, T>;
}
//#endregion
export { NameMap as default };