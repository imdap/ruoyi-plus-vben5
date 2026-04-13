import { Linter } from "./linters/interface.js";
import linter$1 from "./linters/legacyNotSelectorLinter.js";
import linter$2 from "./linters/logicalPropertiesLinter.js";
import linter from "./linters/NaNLinter.js";
import { StyleProvider, StyleProviderProps, createCache, provideStyleContext, useStyleContext, useStyleContextProvide } from "./StyleContext.js";
import AbstractCalculator from "./theme/calc/calculator.js";
import genCalc from "./theme/calc/index.js";
import { DerivativeFunc, TokenType } from "./theme/interface.js";
import Theme from "./theme/Theme.js";
import createTheme from "./theme/createTheme.js";
import { Transformer } from "./transformers/interface.js";
import _default from "./util/resolveHash.js";
import { token2CSSVar } from "./util/css-variables.js";
import { unit } from "./util/index.js";
import useCSSVarRegister from "./hooks/useCSSVarRegister.js";
import extractStyle from "./extractStyle.js";
import useCacheToken, { getComputedToken } from "./hooks/useCacheToken.js";
import { collectStyleText, setStyleCollector } from "./ssr/styleCollector.js";
import transform from "./transformers/autoPrefix.js";
import transform$1 from "./transformers/legacyLogicalProperties.js";
import transform$2 from "./transformers/px2rem.js";
import { ComponentToken, ComponentTokenKey, GlobalToken, GlobalTokenWithComponent, OverrideTokenMap, TokenMap, TokenMapKey } from "./cssinjs-utils/interface/components.js";
import genStyleUtils, { CSSUtil, CSSVarRegisterProps, FullToken, GenStyleFn, GetCompUnitless, GetDefaultToken, GetDefaultTokenFn, GetResetStyles, StyleInfo, SubStyleComponentProps, TokenWithCommonCls } from "./cssinjs-utils/util/genStyleUtils.js";
import statisticToken, { merge, statistic } from "./cssinjs-utils/util/statistic.js";
import "./cssinjs-utils/index.js";
import linter$3 from "./linters/parentSelectorLinter.js";
import "./linters/index.js";
import useStyleRegister, { CSSInterpolation, CSSObject } from "./hooks/useStyleRegister.js";
import Keyframe from "./Keyframes.js";

//#region src/index.d.ts
declare const _experimental: {
  supportModernCSS: () => boolean;
};
//#endregion
export { type AbstractCalculator, type CSSInterpolation, type CSSObject, CSSUtil, CSSVarRegisterProps, ComponentToken, ComponentTokenKey, type DerivativeFunc, FullToken, GenStyleFn, GetCompUnitless, GetDefaultToken, GetDefaultTokenFn, GetResetStyles, GlobalToken, GlobalTokenWithComponent, Keyframe as Keyframes, type Linter, linter as NaNLinter, OverrideTokenMap, StyleInfo, StyleProvider, type StyleProviderProps, SubStyleComponentProps, Theme, TokenMap, TokenMapKey, type TokenType, TokenWithCommonCls, type Transformer, _experimental, transform as autoPrefixTransformer, collectStyleText, createCache, createTheme, extractStyle, genCalc, genStyleUtils, getComputedToken, _default as hash, transform$1 as legacyLogicalPropertiesTransformer, linter$1 as legacyNotSelectorLinter, linter$2 as logicalPropertiesLinter, merge as mergeToken, linter$3 as parentSelectorLinter, provideStyleContext, transform$2 as px2remTransformer, setStyleCollector, statistic, statisticToken, token2CSSVar, unit, useCSSVarRegister, useCacheToken, useStyleContext, useStyleContextProvide, useStyleRegister };