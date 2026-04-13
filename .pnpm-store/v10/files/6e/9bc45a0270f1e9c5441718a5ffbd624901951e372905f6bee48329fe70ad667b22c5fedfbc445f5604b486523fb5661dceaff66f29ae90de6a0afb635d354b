import { TokenType } from "../../theme/interface.js";
import { ComponentTokenKey, GlobalToken, TokenMap, TokenMapKey } from "../interface/components.js";

//#region src/cssinjs-utils/util/getComponentToken.d.ts
declare function getComponentToken<CompTokenMap extends TokenMap, AliasToken extends TokenType, C extends TokenMapKey<CompTokenMap>>(component: C, token: GlobalToken<CompTokenMap, AliasToken>, defaultToken: CompTokenMap[C], options?: {
  deprecatedTokens?: [ComponentTokenKey<CompTokenMap, AliasToken, C>, ComponentTokenKey<CompTokenMap, AliasToken, C>][];
}): any;
//#endregion
export { getComponentToken as default };