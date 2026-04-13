import { ComputedRef, Ref, ShallowRef } from 'vue';
import { Direction, OnStartMove } from '../interface';
import { OffsetValues } from './useOffset';
declare function useDrag(containerRef: Ref<HTMLDivElement>, direction: ShallowRef<Direction> | ComputedRef<Direction>, rawValues: Ref<number[]>, min: ShallowRef<number> | ComputedRef<number>, max: ShallowRef<number> | ComputedRef<number>, formatValue: Ref<(value: number) => number> | ComputedRef<(value: number) => number>, triggerChange: (values: number[]) => void, finishChange: (draggingDelete: boolean) => void, offsetValues: Ref<OffsetValues> | ComputedRef<OffsetValues>, editable: ShallowRef<boolean> | ComputedRef<boolean>, minCount: ShallowRef<number> | ComputedRef<number>): [
    draggingIndex: Ref<number>,
    draggingValue: Ref<number>,
    draggingDelete: Ref<boolean>,
    returnValues: Ref<number[]>,
    onStartMove: OnStartMove
];
export default useDrag;
