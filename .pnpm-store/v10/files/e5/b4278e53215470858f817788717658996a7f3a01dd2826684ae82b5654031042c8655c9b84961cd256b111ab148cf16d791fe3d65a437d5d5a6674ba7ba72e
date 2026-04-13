import { AliasToken } from "./alias.js";
import { ComponentTokenMap } from "./components.js";
import { FullToken as FullToken$1, GenStyleFn as GenStyleFn$1, GetDefaultToken as GetDefaultToken$1, GlobalToken as GlobalToken$1, OverrideTokenMap, TokenMapKey } from "@antdv-next/cssinjs/cssinjs-utils";

//#region src/theme/interface/cssinjs-utils.d.ts
/** Final token which contains the components level override */
type GlobalToken = GlobalToken$1<ComponentTokenMap, AliasToken>;
type OverrideToken = OverrideTokenMap<ComponentTokenMap, AliasToken>;
type OverrideComponent = TokenMapKey<ComponentTokenMap>;
type FullToken<C extends TokenMapKey<ComponentTokenMap>> = FullToken$1<ComponentTokenMap, AliasToken, C>;
type GetDefaultToken<C extends TokenMapKey<ComponentTokenMap>> = GetDefaultToken$1<ComponentTokenMap, AliasToken, C>;
type GenStyleFn<C extends TokenMapKey<ComponentTokenMap>> = GenStyleFn$1<ComponentTokenMap, AliasToken, C>;
//#endregion
export { FullToken, GenStyleFn, GetDefaultToken, GlobalToken, OverrideComponent, OverrideToken };