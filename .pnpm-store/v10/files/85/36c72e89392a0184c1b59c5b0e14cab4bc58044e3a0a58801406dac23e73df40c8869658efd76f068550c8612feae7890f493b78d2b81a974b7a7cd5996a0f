//#region src/style/motion/motion.ts
function initMotionCommon(duration) {
	return {
		animationDuration: duration,
		animationFillMode: "both"
	};
}
function initMotion(motionCls, inKeyframes, outKeyframes, duration, sameLevel = false) {
	const sameLevelPrefix = sameLevel ? "&" : "";
	return {
		[`
      ${sameLevelPrefix}${motionCls}-enter,
      ${sameLevelPrefix}${motionCls}-appear
    `]: {
			...initMotionCommon(duration),
			animationPlayState: "paused"
		},
		[`${sameLevelPrefix}${motionCls}-leave`]: {
			...initMotionCommon(duration),
			animationPlayState: "paused"
		},
		[`
      ${sameLevelPrefix}${motionCls}-enter${motionCls}-enter-active,
      ${sameLevelPrefix}${motionCls}-appear${motionCls}-appear-active
    `]: {
			animationName: inKeyframes,
			animationPlayState: "running"
		},
		[`${sameLevelPrefix}${motionCls}-leave${motionCls}-leave-active`]: {
			animationName: outKeyframes,
			animationPlayState: "running",
			pointerEvents: "none"
		}
	};
}

//#endregion
export { initMotion };