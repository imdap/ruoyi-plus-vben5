import { Ref } from 'vue';
import { TourStepInfo } from '../interface.ts';
export interface Gap {
    offset?: number | [number, number];
    radius?: number;
}
export interface PosInfo {
    left: number;
    top: number;
    height: number;
    width: number;
    radius: number;
}
export default function useTarget(target: Ref<TourStepInfo['target']>, open: Ref<boolean>, gap?: Ref<Gap | undefined>, scrollIntoViewOptions?: Ref<boolean | ScrollIntoViewOptions>, inlineMode?: Ref<boolean>, placeholderRef?: Ref<HTMLDivElement | null>): readonly [import('vue').ComputedRef<{
    left: number;
    top: number;
    width: number;
    height: number;
    radius: number | undefined;
} | null>, import('vue').ShallowRef<HTMLElement | null, HTMLElement | null>];
