import { Ref } from "vue";

//#region src/_util/warning.d.ts
declare function noop(): void;
declare function resetWarned(): void;
declare const isDev: boolean;
type Warning = (valid: boolean, component: string, message?: string) => void;
declare const warning: Warning;
type BaseTypeWarning = (valid: boolean,
/**
 * - deprecated: Some API will be removed in future but still support now.
 * - usage: Some API usage is not correct.
 * - breaking: Breaking change like API is removed.
 */

type: 'deprecated' | 'usage' | 'breaking', message?: string) => void;
type TypeWarning = BaseTypeWarning & {
  deprecated: (valid: boolean, oldProp: string, newProp: string, message?: string) => void;
};
interface WarningContextProps {
  /**
   * @descCN 设置警告等级，设置 `false` 时会将废弃相关信息聚合为单条信息。
   * @descEN Set the warning level. When set to `false`, discard related information will be aggregated into a single message.
   * @since 5.10.0
   */
  strict?: boolean;
}
interface WarningContextType {
  strict: Ref<boolean | undefined>;
}
declare function useWarningProvider(props: WarningContextType): void;
declare function useWarningContext(): any;
/**
 * This is a hook but we not named as `useWarning`
 * since this is only used in development.
 * We should always wrap this in `if (process.env.NODE_ENV !== 'production')` condition
 */
declare const devUseWarning: (component: string) => TypeWarning;
//#endregion
export { WarningContextProps, WarningContextType, warning as default, devUseWarning, isDev, noop, resetWarned, useWarningContext, useWarningProvider };