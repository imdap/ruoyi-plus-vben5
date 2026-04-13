//#region src/Cache.d.ts
type KeyType = string | number;
type ValueType = [number, any];
/** Connect key with `SPLIT` */
declare function pathKey(keys: KeyType[]): string;
declare class Entity {
  instanceId: string;
  constructor(instanceId: string);
  /** @private Internal cache map. Do not access this directly */
  cache: Map<string, ValueType>;
  /** @private Record update times for each key */
  updateTimes: Map<string, number>;
  extracted: Set<string>;
  get(keys: KeyType[]): ValueType | null;
  /** A fast get cache with `get` concat. */
  opGet(keyPathStr: string): ValueType | null;
  update(keys: KeyType[], valueFn: (origin: ValueType | null) => ValueType | null): void;
  /** A fast get cache with `get` concat. */
  opUpdate(keyPathStr: string, valueFn: (origin: ValueType | null) => ValueType | null): void;
}
//#endregion
export { KeyType, Entity as default, pathKey };