import AbstractCalculator from "../../theme/calc/calculator.js";
import { TokenType } from "../../theme/interface.js";
import { ComponentTokenKey, GlobalTokenWithComponent, TokenMap, TokenMapKey } from "../interface/components.js";
import { UseCSP } from "../hooks/useCSP.js";
import { UsePrefix } from "../hooks/usePrefix.js";
import { UseToken } from "../hooks/useToken.js";
import "../../index.js";
import useStyleRegister, { CSSInterpolation, CSSObject } from "../../hooks/useStyleRegister.js";
import * as vue0 from "vue";
import { Ref, UnwrapRef } from "vue";

//#region src/cssinjs-utils/util/genStyleUtils.d.ts
type LayerConfig = UnwrapRef<Parameters<typeof useStyleRegister>[0]>['layer'];
interface StyleInfo {
  hashId: string;
  prefixCls: string;
  rootPrefixCls: string;
  iconPrefixCls: string;
}
interface CSSUtil {
  calc: (number: any) => AbstractCalculator;
  max: (...values: (number | string)[]) => number | string;
  min: (...values: (number | string)[]) => number | string;
}
type TokenWithCommonCls<T> = T & {
  /** Wrap component class with `.` prefix */componentCls: string; /** Origin prefix which do not have `.` prefix */
  prefixCls: string; /** Wrap icon class with `.` prefix */
  iconCls: string; /** Wrap ant prefixCls class with `.` prefix */
  antCls: string;
} & CSSUtil;
type FullToken<CompTokenMap extends TokenMap, AliasToken extends TokenType, C extends TokenMapKey<CompTokenMap>> = TokenWithCommonCls<GlobalTokenWithComponent<CompTokenMap, AliasToken, C>>;
type GenStyleFn<CompTokenMap extends TokenMap, AliasToken extends TokenType, C extends TokenMapKey<CompTokenMap>> = (token: FullToken<CompTokenMap, AliasToken, C>, info: StyleInfo) => CSSInterpolation;
type GetDefaultTokenFn<CompTokenMap extends TokenMap, AliasToken extends TokenType, C extends TokenMapKey<CompTokenMap>> = (token: AliasToken & Partial<CompTokenMap[C]>) => CompTokenMap[C];
type GetDefaultToken<CompTokenMap extends TokenMap, AliasToken extends TokenType, C extends TokenMapKey<CompTokenMap>> = null | CompTokenMap[C] | GetDefaultTokenFn<CompTokenMap, AliasToken, C>;
interface SubStyleComponentProps {
  prefixCls: string;
  rootCls?: string;
}
interface CSSVarRegisterProps {
  rootCls: string;
  component: string;
  cssVar: {
    prefix?: string;
    key?: string;
  };
}
interface GetResetStylesConfig {
  prefix: ReturnType<UsePrefix>;
  csp: ReturnType<UseCSP>;
}
type GetResetStyles<AliasToken extends TokenType> = (token: AliasToken, config?: GetResetStylesConfig) => CSSInterpolation;
type GetCompUnitless<CompTokenMap extends TokenMap, AliasToken extends TokenType> = <C extends TokenMapKey<CompTokenMap>>(component: C | [C, string]) => Partial<Record<ComponentTokenKey<CompTokenMap, AliasToken, C>, boolean>>;
declare function genStyleUtils<CompTokenMap extends TokenMap, AliasToken extends TokenType, DesignToken extends TokenType>(config: {
  usePrefix: UsePrefix;
  useToken: UseToken<CompTokenMap, AliasToken, DesignToken>;
  useCSP?: UseCSP;
  getResetStyles?: GetResetStyles<AliasToken>;
  getCommonStyle?: (token: AliasToken, componentPrefixCls: string, rootCls?: string, resetFont?: boolean) => CSSObject;
  getCompUnitless?: GetCompUnitless<CompTokenMap, AliasToken>;
  layer?: LayerConfig;
}): {
  genStyleHooks: <C extends TokenMapKey<CompTokenMap>>(component: C | [C, string], styleFn: GenStyleFn<CompTokenMap, AliasToken, C>, getDefaultToken?: GetDefaultToken<CompTokenMap, AliasToken, C>, options?: {
    resetStyle?: boolean;
    resetFont?: boolean;
    deprecatedTokens?: [ComponentTokenKey<CompTokenMap, AliasToken, C>, ComponentTokenKey<CompTokenMap, AliasToken, C>][];
    /**
     * Component tokens that do not need unit.
     */
    unitless?: Partial<Record<ComponentTokenKey<CompTokenMap, AliasToken, C>, boolean>>;
    /**
     * Only use component style in client side. Ignore in SSR.
     */
    clientOnly?: boolean;
    /**
     * Set order of component style.
     * @default -999
     */
    order?: number;
    /**
     * Whether generate styles
     * @default true
     */
    injectStyle?: boolean;
  }) => (prefixCls: Ref<string>, rootCls?: Ref<string | undefined>) => readonly [Ref<string, string>, vue0.ComputedRef<string | undefined>];
  genSubStyleComponent: <C extends TokenMapKey<CompTokenMap>>(componentName: C | [C, string], styleFn: GenStyleFn<CompTokenMap, AliasToken, C>, getDefaultToken?: GetDefaultToken<CompTokenMap, AliasToken, C>, options?: {
    resetStyle?: boolean;
    resetFont?: boolean;
    deprecatedTokens?: [ComponentTokenKey<CompTokenMap, AliasToken, C>, ComponentTokenKey<CompTokenMap, AliasToken, C>][];
    /**
     * Only use component style in client side. Ignore in SSR.
     */
    clientOnly?: boolean;
    /**
     * Set order of component style. Default is -999.
     */
    order?: number;
    injectStyle?: boolean;
    unitless?: Partial<Record<ComponentTokenKey<CompTokenMap, AliasToken, C>, boolean>>;
  }) => vue0.DefineComponent<vue0.ExtractPropTypes<{
    prefixCls: StringConstructor;
    rootCls: StringConstructor;
  }>, () => null, {}, {}, {}, vue0.ComponentOptionsMixin, vue0.ComponentOptionsMixin, {}, string, vue0.PublicProps, Readonly<vue0.ExtractPropTypes<{
    prefixCls: StringConstructor;
    rootCls: StringConstructor;
  }>> & Readonly<{}>, {}, {}, {}, {}, string, vue0.ComponentProvideOptions, true, {}, any>;
  genComponentStyleHook: <C extends TokenMapKey<CompTokenMap>>(componentName: C | [C, string], styleFn: GenStyleFn<CompTokenMap, AliasToken, C>, getDefaultToken?: GetDefaultToken<CompTokenMap, AliasToken, C>, options?: {
    resetStyle?: boolean;
    resetFont?: boolean;
    deprecatedTokens?: [ComponentTokenKey<CompTokenMap, AliasToken, C>, ComponentTokenKey<CompTokenMap, AliasToken, C>][];
    /**
     * Only use component style in client side. Ignore in SSR.
     */
    clientOnly?: boolean;
    /**
     * Set order of component style. Default is -999.
     */
    order?: number;
    injectStyle?: boolean;
    unitless?: Partial<Record<ComponentTokenKey<CompTokenMap, AliasToken, C>, boolean>>;
  }) => (prefixCls: Ref<string>, rootCls?: Ref<string | undefined>) => Ref<string, string>;
};
//#endregion
export { CSSUtil, CSSVarRegisterProps, FullToken, GenStyleFn, GetCompUnitless, GetDefaultToken, GetDefaultTokenFn, GetResetStyles, StyleInfo, SubStyleComponentProps, TokenWithCommonCls, genStyleUtils as default };