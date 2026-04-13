import { initFadeMotion } from "../../style/motion/fade.js";
import { Keyframes } from "@antdv-next/cssinjs";

//#region src/upload/style/motion.ts
const genMotionStyle = (token) => {
	const { componentCls } = token;
	const uploadAnimateInlineIn = new Keyframes("uploadAnimateInlineIn", { from: {
		width: 0,
		height: 0,
		padding: 0,
		opacity: 0,
		margin: token.calc(token.marginXS).div(-2).equal()
	} });
	const uploadAnimateInlineOut = new Keyframes("uploadAnimateInlineOut", { to: {
		width: 0,
		height: 0,
		padding: 0,
		opacity: 0,
		margin: token.calc(token.marginXS).div(-2).equal()
	} });
	const inlineCls = `${componentCls}-animate-inline`;
	return [
		{ [`${componentCls}-wrapper`]: {
			[`${inlineCls}-appear, ${inlineCls}-enter, ${inlineCls}-leave`]: {
				animationDuration: token.motionDurationSlow,
				animationTimingFunction: token.motionEaseInOutCirc,
				animationFillMode: "forwards"
			},
			[`${inlineCls}-appear, ${inlineCls}-enter`]: { animationName: uploadAnimateInlineIn },
			[`${inlineCls}-leave`]: { animationName: uploadAnimateInlineOut }
		} },
		{ [`${componentCls}-wrapper`]: initFadeMotion(token) },
		uploadAnimateInlineIn,
		uploadAnimateInlineOut
	];
};
var motion_default = genMotionStyle;

//#endregion
export { motion_default as default };