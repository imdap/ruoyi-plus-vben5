//#region src/style/motion/collapse.ts
const genCollapseMotion = (token) => {
	const { componentCls, antCls, motionDurationMid, motionEaseInOut } = token;
	return { [componentCls]: {
		[`${antCls}-motion-collapse-legacy`]: {
			overflow: "hidden",
			"&-active": { transition: `${["height", "opacity"].map((prop) => `${prop} ${motionDurationMid} ${motionEaseInOut}`).join(", ")} !important` }
		},
		[`${antCls}-motion-collapse`]: {
			overflow: "hidden",
			transition: `${["height", "opacity"].map((prop) => `${prop} ${motionDurationMid} ${motionEaseInOut}`).join(", ")} !important`
		}
	} };
};
var collapse_default = genCollapseMotion;

//#endregion
export { collapse_default as default };