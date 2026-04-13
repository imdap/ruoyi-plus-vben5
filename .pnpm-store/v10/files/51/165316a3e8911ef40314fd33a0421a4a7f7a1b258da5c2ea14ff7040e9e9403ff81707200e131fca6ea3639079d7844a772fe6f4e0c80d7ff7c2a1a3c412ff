import { Key } from '@v-c/util/dist/type';
import { Ref } from 'vue';
import { GetKey } from '../interface';
import { default as CacheMap } from '../utils/CacheMap';
export type ScrollAlign = 'top' | 'bottom' | 'auto';
export interface ScrollPos {
    left?: number;
    top?: number;
}
export type ScrollTarget = {
    index: number;
    align?: ScrollAlign;
    offset?: number;
} | {
    key: Key;
    align?: ScrollAlign;
    offset?: number;
};
export default function useScrollTo(containerRef: Ref<HTMLDivElement>, data: Ref<any[]>, heights: CacheMap, itemHeight: Ref<number>, getKey: GetKey<any>, collectHeight: () => void, syncScrollTop: (newTop: number) => void, triggerFlash: () => void): [(arg: number | ScrollTarget) => void, () => number];
