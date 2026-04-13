import { SeedToken } from "./interface/seeds.js";
import { AliasToken } from "./interface/alias.js";
import { GlobalToken } from "./interface/cssinjs-utils.js";
import "./interface/index.js";
import { DesignTokenProviderProps } from "./context.js";
import { Ref } from "vue";
import { Theme } from "@antdv-next/cssinjs";

//#region src/theme/useToken.d.ts
declare const unitless: { [key in keyof AliasToken]?: boolean };
declare const ignore: { [key in keyof AliasToken]?: boolean };
declare function getComputedToken(originToken: SeedToken, overrideToken: DesignTokenProviderProps['components'] & {
  override?: Partial<AliasToken>;
}, theme: Theme<any, any>): any;
declare function useToken(): [theme: Ref<Theme<SeedToken, AliasToken>>, token: Ref<GlobalToken>, hashId: Ref<string>, realToken: Ref<GlobalToken>, cssVar: Ref<DesignTokenProviderProps['cssVar']>, zeroRuntime: Ref<boolean>];
//#endregion
export { useToken as default, getComputedToken, ignore, unitless };