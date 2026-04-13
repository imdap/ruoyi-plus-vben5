import { AnyObject } from "../../_util/type.js";
import { ColorPalettes, LegacyColorPalettes, PresetColorKey, PresetColorType, PresetColors } from "./presetColors.js";
import { SeedToken } from "./seeds.js";
import { ColorMapToken, ColorNeutralMapToken } from "./maps/colors.js";
import { FontMapToken } from "./maps/font.js";
import { HeightMapToken, SizeMapToken } from "./maps/size.js";
import { StyleMapToken } from "./maps/style.js";
import { CommonMapToken, MapToken } from "./maps/index.js";
import { AliasToken } from "./alias.js";
import { ComponentTokenMap } from "./components.js";
import { FullToken, GenStyleFn, GetDefaultToken, GlobalToken, OverrideComponent, OverrideToken } from "./cssinjs-utils.js";
import { CSSInterpolation, DerivativeFunc } from "@antdv-next/cssinjs";

//#region src/theme/interface/index.d.ts
type TokenType = object;
type GenerateStyle<ComponentToken extends AnyObject = AliasToken, ReturnType = CSSInterpolation> = (token: ComponentToken) => ReturnType;
type MappingAlgorithm = DerivativeFunc<SeedToken, MapToken>;
//#endregion
export { type AliasToken, type CSSInterpolation, type ColorMapToken, type ColorNeutralMapToken, type ColorPalettes, type CommonMapToken, type ComponentTokenMap, type DerivativeFunc, type FontMapToken, type FullToken, type GenStyleFn, GenerateStyle, type GetDefaultToken, type GlobalToken, type HeightMapToken, type LegacyColorPalettes, type MapToken, MappingAlgorithm, type OverrideComponent, type OverrideToken, type PresetColorKey, type PresetColorType, PresetColors, type SeedToken, type SizeMapToken, type StyleMapToken, TokenType };