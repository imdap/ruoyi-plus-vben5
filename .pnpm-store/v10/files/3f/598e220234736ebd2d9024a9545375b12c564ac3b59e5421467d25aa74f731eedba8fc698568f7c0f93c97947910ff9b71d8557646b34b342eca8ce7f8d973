import { TokenType } from "../../theme/interface.js";

//#region src/cssinjs-utils/interface/components.d.ts
type TokenMap = Record<PropertyKey, any>;
type TokenMapKey<CompTokenMap extends TokenMap> = Extract<keyof CompTokenMap, string>;
type GlobalToken<CompTokenMap extends TokenMap, AliasToken extends TokenType> = AliasToken & CompTokenMap;
type OverrideTokenMap<CompTokenMap extends TokenMap, AliasToken extends TokenType> = { [key in keyof CompTokenMap]: Partial<CompTokenMap[key]> & Partial<AliasToken> };
type GlobalTokenWithComponent<CompTokenMap extends TokenMap, AliasToken extends TokenType, C extends TokenMapKey<CompTokenMap>> = GlobalToken<CompTokenMap, AliasToken> & CompTokenMap[C];
type ComponentToken<CompTokenMap extends TokenMap, AliasToken extends TokenType, C extends TokenMapKey<CompTokenMap>> = Exclude<OverrideTokenMap<CompTokenMap, AliasToken>[C], undefined>;
type ComponentTokenKey<CompTokenMap extends TokenMap, AliasToken extends TokenType, C extends TokenMapKey<CompTokenMap>> = keyof ComponentToken<CompTokenMap, AliasToken, C>;
//#endregion
export { ComponentToken, ComponentTokenKey, GlobalToken, GlobalTokenWithComponent, OverrideTokenMap, TokenMap, TokenMapKey };