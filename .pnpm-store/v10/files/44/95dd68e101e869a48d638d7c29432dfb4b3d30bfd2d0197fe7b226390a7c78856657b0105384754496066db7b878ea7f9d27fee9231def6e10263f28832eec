import { Ref } from 'vue';
import { GetKey } from '../interface';
import { default as CacheMap } from '../utils/CacheMap';
export default function useHeights<T>(getKey: GetKey<T>, onItemAdd?: (item: T) => void, onItemRemove?: (item: T) => void): [
    setInstanceRef: (item: T, instance: HTMLElement | null) => void,
    collectHeight: (sync?: boolean) => void,
    cacheMap: CacheMap,
    updatedMark: Ref<number>
];
