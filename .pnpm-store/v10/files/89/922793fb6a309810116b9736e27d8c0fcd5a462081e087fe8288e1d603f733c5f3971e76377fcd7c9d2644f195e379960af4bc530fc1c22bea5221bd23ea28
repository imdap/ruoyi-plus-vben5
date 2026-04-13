import { initSlideMotion } from "../../style/motion/slide.js";

//#region src/tabs/style/motion.ts
const genMotionStyle = (token) => {
	const { componentCls, motionDurationSlow } = token;
	return [{ [componentCls]: { [`${componentCls}-switch`]: {
		"&-appear, &-enter": {
			transition: "none",
			"&-start": { opacity: 0 },
			"&-active": {
				opacity: 1,
				transition: `opacity ${motionDurationSlow}`
			}
		},
		"&-leave": {
			position: "absolute",
			transition: "none",
			inset: 0,
			"&-start": { opacity: 1 },
			"&-active": {
				opacity: 0,
				transition: `opacity ${motionDurationSlow}`
			}
		}
	} } }, [initSlideMotion(token, "slide-up"), initSlideMotion(token, "slide-down")]];
};
var motion_default = genMotionStyle;

//#endregion
export { motion_default as default };