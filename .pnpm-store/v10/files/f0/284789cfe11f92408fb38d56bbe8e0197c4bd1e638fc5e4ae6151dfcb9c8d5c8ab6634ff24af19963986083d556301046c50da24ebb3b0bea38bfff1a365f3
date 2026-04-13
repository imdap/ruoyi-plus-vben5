import genControlHeight_default from "../shared/genControlHeight.js";
import genFontMapToken_default from "../shared/genFontMapToken.js";
import derivative$1 from "../default/index.js";
import genSizeMapToken from "./genCompactSizeMapToken.js";

//#region src/theme/themes/compact/index.ts
const derivative = (token, mapToken) => {
	const mergedMapToken = mapToken ?? derivative$1(token);
	const fontSize = mergedMapToken.fontSizeSM;
	const controlHeight = mergedMapToken.controlHeight - 4;
	return {
		...mergedMapToken,
		...genSizeMapToken(mapToken ?? token),
		...genFontMapToken_default(fontSize),
		controlHeight,
		...genControlHeight_default({
			...mergedMapToken,
			controlHeight
		})
	};
};
var compact_default = derivative;

//#endregion
export { compact_default as default };