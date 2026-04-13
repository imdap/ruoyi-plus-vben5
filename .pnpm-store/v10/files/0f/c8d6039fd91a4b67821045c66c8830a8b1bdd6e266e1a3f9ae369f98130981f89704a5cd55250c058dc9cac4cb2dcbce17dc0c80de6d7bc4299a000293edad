import { InternalModuleFormat } from "rolldown";

//#region src/utils/types.d.ts
type Overwrite<T, U> = Omit<T, keyof U> & U;
type Awaitable<T> = T | Promise<T>;
type MarkPartial<T, K extends keyof T> = Omit<Required<T>, K> & Partial<Pick<T, K>>;
type Arrayable<T> = T | T[];
//#endregion
//#region src/utils/logger.d.ts
type LogType = "error" | "warn" | "info";
type LogLevel = LogType | "silent";
interface LoggerOptions {
  allowClearScreen?: boolean;
  customLogger?: Logger;
  console?: Console;
  failOnWarn?: boolean;
}
interface Logger {
  level: LogLevel;
  options?: LoggerOptions;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  warnOnce: (...args: any[]) => void;
  error: (...args: any[]) => void;
  success: (...args: any[]) => void;
  clearScreen: (type: LogType) => void;
}
declare const globalLogger: Logger;
//#endregion
export { Awaitable as a, Arrayable as i, Logger as n, MarkPartial as o, globalLogger as r, Overwrite as s, LogLevel as t };