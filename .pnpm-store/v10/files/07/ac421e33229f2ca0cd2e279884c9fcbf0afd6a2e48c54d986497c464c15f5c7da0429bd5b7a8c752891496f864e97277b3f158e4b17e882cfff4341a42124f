import { Linter } from "../linters/interface.js";
import { HashPriority } from "../StyleContext.js";
import Theme from "../theme/Theme.js";
import { Transformer } from "../transformers/interface.js";
import { ExtractStyle } from "./useGlobalCache.js";
import { Nonce } from "../util/index.js";
import "../linters/index.js";
import Keyframe from "../Keyframes.js";
import { Ref } from "vue";
import * as CSS from "csstype";

//#region src/hooks/useStyleRegister.d.ts
declare const SKIP_CHECK = "_skip_check_";
declare const MULTI_VALUE = "_multi_value_";
interface LayerConfig {
  name: string;
  dependencies?: string[];
}
type CSSProperties = Omit<CSS.PropertiesFallback<number | string>, 'animationName'> & {
  animationName?: CSS.PropertiesFallback<number | string>['animationName'] | Keyframe;
};
type CSSPropertiesWithMultiValues = { [K in keyof CSSProperties]: CSSProperties[K] | readonly Extract<CSSProperties[K], string>[] | {
  [SKIP_CHECK]?: boolean;
  [MULTI_VALUE]?: boolean;
  value: CSSProperties[K] | CSSProperties[K][];
} };
type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject };
type ArrayCSSInterpolation = readonly CSSInterpolation[];
type InterpolationPrimitive = null | undefined | boolean | number | string | CSSObject;
type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation | Keyframe;
type CSSOthersObject = Record<string, CSSInterpolation>;
interface CSSObject extends CSSPropertiesWithMultiValues, CSSPseudos, CSSOthersObject {}
declare function normalizeStyle(styleStr: string, autoPrefix: boolean): string;
interface ParseConfig {
  hashId?: string;
  hashPriority?: HashPriority;
  layer?: LayerConfig;
  path?: string;
  transformers?: Transformer[];
  linters?: Linter[];
}
interface ParseInfo {
  root?: boolean;
  injectHash?: boolean;
  parentSelectors: string[];
}
declare function parseStyle(interpolation: CSSInterpolation, config?: ParseConfig, {
  root,
  injectHash,
  parentSelectors
}?: ParseInfo): [parsedStr: string, effectStyle: Record<string, string>];
declare function uniqueHash(path: (string | number)[], styleStr: string): any;
declare const STYLE_PREFIX = "style";
type StyleCacheValue = [styleStr: string, styleId: string, effectStyle: Record<string, string>, clientOnly: boolean | undefined, order: number];
declare function useStyleRegister(info: Ref<{
  theme: Theme<any, any>;
  token: any;
  path: string[];
  hashId?: string;
  layer?: LayerConfig;
  nonce?: Nonce;
  clientOnly?: boolean;
  /**
   * Tell cssinjs the insert order of style.
   * It's useful when you need to insert style
   * before other style to overwrite for the same selector priority.
   */
  order?: number;
}>, styleFn: () => CSSInterpolation): void;
declare const extract: ExtractStyle<StyleCacheValue>;
//#endregion
export { CSSInterpolation, CSSObject, CSSOthersObject, CSSProperties, CSSPropertiesWithMultiValues, CSSPseudos, InterpolationPrimitive, LayerConfig, ParseConfig, ParseInfo, STYLE_PREFIX, useStyleRegister as default, extract, normalizeStyle, parseStyle, uniqueHash };