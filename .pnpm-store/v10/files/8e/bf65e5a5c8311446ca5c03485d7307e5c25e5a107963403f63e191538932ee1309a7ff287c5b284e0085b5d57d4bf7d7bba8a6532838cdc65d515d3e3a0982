import { PresetColors } from "../theme/interface/presetColors.js";

//#region src/_util/colors.ts
const inverseColors = PresetColors.map((color) => `${color}-inverse`);
const PresetStatusColorTypes = [
	"success",
	"processing",
	"error",
	"default",
	"warning"
];
/**
* determine if the color keyword belongs to the `Ant Design` {@link PresetColors}.
* @param color color to be judged
* @param includeInverse whether to include reversed colors
*/
function isPresetColor(color, includeInverse = true) {
	if (includeInverse) return [...inverseColors, ...PresetColors].includes(color);
	return PresetColors.includes(color);
}
function isPresetStatusColor(color) {
	return PresetStatusColorTypes.includes(color);
}

//#endregion
export { PresetStatusColorTypes, isPresetColor, isPresetStatusColor };