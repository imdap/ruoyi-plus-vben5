import { TokenType } from "../../theme/interface.js";
import Theme from "../../theme/Theme.js";
import { GlobalToken, OverrideTokenMap, TokenMap } from "../interface/components.js";
import { Ref } from "vue";

//#region src/cssinjs-utils/hooks/useToken.d.ts
type TokenMapWithTheme<CompTokenMap extends TokenMap, AliasToken extends TokenType, DesignToken extends TokenType> = { [key in keyof OverrideTokenMap<CompTokenMap, AliasToken>]?: OverrideTokenMap<CompTokenMap, AliasToken>[key] & {
  theme?: Theme<DesignToken, AliasToken>;
} };
interface UseTokenReturn<CompTokenMap extends TokenMap, AliasToken extends TokenType, DesignToken extends TokenType> {
  token: Ref<GlobalToken<CompTokenMap, AliasToken>>;
  realToken?: Ref<GlobalToken<CompTokenMap, AliasToken>>;
  theme?: Ref<Theme<DesignToken, AliasToken>>;
  components?: Ref<TokenMapWithTheme<CompTokenMap, DesignToken, AliasToken>>;
  hashId?: Ref<string>;
  hashed?: Ref<string | boolean>;
  cssVar?: Ref<{
    prefix?: string;
    key?: string;
  }>;
  zeroRuntime?: Ref<boolean>;
}
type UseToken<CompTokenMap extends TokenMap, AliasToken extends TokenType, DesignToken extends TokenType> = () => UseTokenReturn<CompTokenMap, AliasToken, DesignToken>;
//#endregion
export { TokenMapWithTheme, UseToken, UseTokenReturn };