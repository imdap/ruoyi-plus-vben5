import { VNodeChild } from "vue";

//#region src/statistic/utils.d.ts
type valueType = number | string;
type countdownValueType = number | string;
type Formatter = false | 'number' | 'countdown' | ((value: valueType, config?: FormatConfig) => VNodeChild);
interface FormatConfig {
  formatter?: Formatter;
  decimalSeparator?: string;
  groupSeparator?: string;
  precision?: number;
}
interface CountdownFormatConfig extends FormatConfig {
  format?: string;
}
declare function formatTimeStr(duration: number, format: string): any;
declare function formatCounter(value: valueType, config: CountdownFormatConfig, down: boolean): any;
//#endregion
export { CountdownFormatConfig, FormatConfig, Formatter, countdownValueType, formatCounter, formatTimeStr, valueType };