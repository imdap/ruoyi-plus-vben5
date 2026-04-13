Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const VIEW_BOX_SIZE = 100;
function getCircleStyle(perimeter, perimeterWithoutGap, offset, percent, rotateDeg, gapDegree, gapPosition, strokeColor, strokeLinecap, strokeWidth, stepSpace = 0) {
	const offsetDeg = offset / 100 * 360 * ((360 - gapDegree) / 360);
	const positionDeg = gapDegree === 0 ? 0 : {
		bottom: 0,
		top: 180,
		left: 90,
		right: -90
	}[gapPosition];
	let strokeDashoffset = (100 - percent) / 100 * perimeterWithoutGap;
	if (strokeLinecap === "round" && percent !== 100) {
		strokeDashoffset += strokeWidth / 2;
		if (strokeDashoffset >= perimeterWithoutGap) strokeDashoffset = perimeterWithoutGap - .01;
	}
	const halfSize = 100 / 2;
	return {
		stroke: typeof strokeColor === "string" ? strokeColor : void 0,
		strokeDasharray: `${perimeterWithoutGap}px ${perimeter}`,
		strokeDashoffset: strokeDashoffset + stepSpace,
		transform: `rotate(${rotateDeg + offsetDeg + positionDeg}deg)`,
		transformOrigin: `${halfSize}px ${halfSize}px`,
		transition: "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s",
		fillOpacity: 0
	};
}
exports.VIEW_BOX_SIZE = VIEW_BOX_SIZE;
exports.getCircleStyle = getCircleStyle;
