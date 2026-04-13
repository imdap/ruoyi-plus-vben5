import { genComponentStyleHook, genCssVar } from "../../theme/util/genStyleUtils.js";

//#region src/_util/wave/style.ts
const genWaveStyle = (token) => {
	const { componentCls, colorPrimary, motionDurationSlow, motionEaseInOut, motionEaseOutCirc, antCls } = token;
	const [, varRef] = genCssVar(antCls, "wave");
	return { [componentCls]: {
		position: "absolute",
		background: "transparent",
		pointerEvents: "none",
		boxSizing: "border-box",
		color: varRef("color", colorPrimary),
		boxShadow: `0 0 0 0 currentcolor`,
		opacity: .2,
		"&.wave-motion-appear": {
			transition: [`box-shadow 0.4s`, `opacity 2s`].map((prop) => `${prop} ${motionEaseOutCirc}`).join(","),
			"&-active": {
				boxShadow: `0 0 0 6px currentcolor`,
				opacity: 0
			},
			"&.wave-quick": { transition: [`box-shadow`, `opacity`].map((prop) => `${prop} ${motionDurationSlow} ${motionEaseInOut}`).join(",") }
		}
	} };
};
var style_default = genComponentStyleHook("Wave", genWaveStyle);

//#endregion
export { style_default as default };