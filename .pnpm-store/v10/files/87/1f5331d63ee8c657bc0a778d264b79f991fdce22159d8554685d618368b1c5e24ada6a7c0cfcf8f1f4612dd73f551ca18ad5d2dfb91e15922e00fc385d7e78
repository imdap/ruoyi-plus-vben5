import { Key } from '@v-c/util/dist/type';
declare class CacheMap {
    maps: Record<string, number>;
    id: import('vue').ShallowRef<number, number>;
    diffRecords: Map<Key, number>;
    constructor();
    set(key: Key, value: number): void;
    get(key: Key): number;
    /**
     * CacheMap will record the key changed.
     * To help to know what's update in the next render.
     */
    resetRecord(): void;
    getRecord(): Map<Key, number>;
}
export default CacheMap;
