import { Ref } from 'vue';
import { InternalMarkObj } from '../Marks';
/** Format value align with step & marks */
type FormatValue = (value: number) => number;
type OffsetMode = 'unit' | 'dist';
export type OffsetValues = (values: number[], offset: number | 'min' | 'max', valueIndex: number, mode?: OffsetMode) => {
    value: number;
    values: number[];
};
export default function useOffset(min: Ref<number>, max: Ref<number>, step: Ref<number | null>, markList: Ref<InternalMarkObj[]>, allowCross: Ref<boolean>, pushable: Ref<false | number | null>): [FormatValue, OffsetValues];
export {};
