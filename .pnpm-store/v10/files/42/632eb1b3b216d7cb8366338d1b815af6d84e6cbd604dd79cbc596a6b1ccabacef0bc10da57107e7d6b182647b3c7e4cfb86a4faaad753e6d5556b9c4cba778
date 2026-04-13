import { DecimalClass, ValueType } from './interface';
import { default as BigIntDecimal } from './BigIntDecimal';
import { default as NumberDecimal } from './NumberDecimal';
export { BigIntDecimal, NumberDecimal };
export type { DecimalClass, ValueType };
export default function getMiniDecimal(value: ValueType): DecimalClass;
/**
 * Align the logic of toFixed to around like 1.5 => 2.
 * If set `cutOnly`, will just remove the over decimal part.
 */
export declare function toFixed(numStr: string, separatorStr: string, precision?: number, cutOnly?: boolean): string;
