import { normalizeTwoToneColors } from "../utils.js";
import IconBaseComp from "./IconBase.js";

//#region src/components/twoTonePrimaryColor.ts
function setTwoToneColor(twoToneColor) {
	const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);
	return IconBaseComp.setTwoToneColors({
		primaryColor,
		secondaryColor
	});
}
function getTwoToneColor() {
	const colors = IconBaseComp.getTwoToneColors();
	if (!colors.calculated) return colors.primaryColor;
	return [colors.primaryColor, colors.secondaryColor];
}

//#endregion
export { getTwoToneColor, setTwoToneColor };