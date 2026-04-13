//#region src/drawer/style/motion.ts
function getMoveTranslate(direction) {
	const value = "100%";
	return {
		left: `translateX(-${value})`,
		right: `translateX(${value})`,
		top: `translateY(-${value})`,
		bottom: `translateY(${value})`
	}[direction];
}
function getEnterLeaveStyle(startStyle, endStyle) {
	return {
		"&-enter, &-appear": {
			...startStyle,
			"&-active": endStyle
		},
		"&-leave": {
			...endStyle,
			"&-active": startStyle
		}
	};
}
function getFadeStyle(from, duration) {
	return {
		"&-enter, &-appear, &-leave": {
			"&-start": { transition: "none" },
			"&-active": { transition: `all ${duration}` }
		},
		...getEnterLeaveStyle({ opacity: from }, { opacity: 1 })
	};
}
function getPanelMotionStyles(direction, duration) {
	return [getFadeStyle(.7, duration), getEnterLeaveStyle({ transform: getMoveTranslate(direction) }, { transform: "none" })];
}
const genMotionStyle = (token) => {
	const { componentCls, motionDurationSlow } = token;
	return { [componentCls]: {
		[`${componentCls}-mask-motion`]: getFadeStyle(0, motionDurationSlow),
		[`${componentCls}-panel-motion`]: [
			"left",
			"right",
			"top",
			"bottom"
		].reduce((obj, direction) => {
			return {
				...obj,
				[`&-${direction}`]: getPanelMotionStyles(direction, motionDurationSlow)
			};
		}, {})
	} };
};
var motion_default = genMotionStyle;

//#endregion
export { motion_default as default };