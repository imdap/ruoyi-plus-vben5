import { PresetColorKey } from "../theme/interface/presetColors.js";
import "../theme/interface/index.js";

//#region src/_util/colors.d.ts
type InverseColor = `${PresetColorKey}-inverse`;
declare const PresetStatusColorTypes: readonly ["success", "processing", "error", "default", "warning"];
type PresetColorType = PresetColorKey | InverseColor;
type PresetStatusColorType = (typeof PresetStatusColorTypes)[number];
/**
 * determine if the color keyword belongs to the `Ant Design` {@link PresetColors}.
 * @param color color to be judged
 * @param includeInverse whether to include reversed colors
 */
declare function isPresetColor(color?: any, includeInverse?: boolean): boolean;
declare function isPresetStatusColor(color?: any): color is PresetStatusColorType;
//#endregion
export { PresetColorType, PresetStatusColorType, PresetStatusColorTypes, isPresetColor, isPresetStatusColor };