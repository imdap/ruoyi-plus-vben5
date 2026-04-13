import { ComputedRef, Ref } from 'vue';
export type OperationType = 'input' | 'panel';
export type NextActive<DateType> = (nextValue: [DateType | null | undefined, DateType | null | undefined]) => number | null;
/**
 * When user first focus one input, any submit will trigger focus another one.
 * When second time focus one input, submit will not trigger focus again.
 * When click outside to close the panel, trigger event if it can trigger onChange.
 */
export default function useRangeActive<DateType>(disabled: Ref<(boolean | undefined)[]> | ComputedRef<(boolean | undefined)[]>, empty?: Ref<boolean[]>, mergedOpen?: Ref<boolean | undefined>): readonly [Ref<boolean, boolean>, (nextFocus: boolean) => void, (type?: OperationType) => OperationType, Ref<number, number>, (index: number) => void, NextActive<DateType>, Ref<number[], number[]>, (index: number | null) => void, (index: number) => boolean];
