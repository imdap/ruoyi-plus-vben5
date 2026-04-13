import genRadius_default from "./genRadius.js";

//#region src/theme/themes/shared/genCommonMapToken.ts
function genCommonMapToken(token) {
	const { motionUnit, motionBase, borderRadius, lineWidth } = token;
	return {
		motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
		motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
		motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
		lineWidthBold: lineWidth + 1,
		...genRadius_default(borderRadius)
	};
}

//#endregion
export { genCommonMapToken as default };