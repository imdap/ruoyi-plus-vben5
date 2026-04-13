import { genCssVar } from "../../theme/util/genStyleUtils.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/timeline/style/horizontal.ts
const genHorizontalStyle = (token) => {
	const { componentCls, fontHeight, antCls, paddingXS } = token;
	const [stepsVarName, stepsVarRef] = genCssVar(antCls, "cmp-steps");
	const [timelineVarName, timelineVarRef] = genCssVar(antCls, "timeline");
	const itemCls = `${componentCls}-item`;
	return { [`${componentCls}-horizontal`]: {
		[stepsVarName("title-vertical-row-gap")]: paddingXS,
		[timelineVarName("content-height")]: unit(fontHeight),
		alignItems: "stretch",
		[`&${componentCls}-layout-alternate`]: { [itemCls]: {
			[`${itemCls}-wrapper`]: {
				[timelineVarName("alternate-content-offset")]: `calc(${timelineVarRef("content-height")} + ${stepsVarRef("title-vertical-row-gap")} * 2 + ${stepsVarRef("icon-size-max")})`,
				height: `calc(${timelineVarRef("content-height")} * 2 + ${stepsVarRef("title-vertical-row-gap")} * 2 + ${stepsVarRef("icon-size-max")})`
			},
			[`${itemCls}-icon`]: { position: "absolute" },
			[`${itemCls}-icon, ${itemCls}-rail`]: {
				position: "absolute",
				top: "50%",
				transform: "translateY(-50%)",
				margin: 0
			},
			[`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: {
				whiteSpace: "nowrap",
				maxWidth: "unset"
			},
			[`${itemCls}-title`]: {
				position: "absolute",
				left: {
					_skip_check_: true,
					value: "50%"
				},
				transform: "translateX(-50%)"
			},
			[`${itemCls}-content`]: {
				position: "absolute",
				left: {
					_skip_check_: true,
					value: "50%"
				},
				transform: "translateX(-50%)"
			},
			"&-placement-start": {
				[`${itemCls}-title`]: { bottom: timelineVarRef("alternate-content-offset") },
				[`${itemCls}-content`]: { top: timelineVarRef("alternate-content-offset") }
			},
			"&-placement-end": {
				[`${itemCls}-title`]: { top: timelineVarRef("alternate-content-offset") },
				[`${itemCls}-content`]: { bottom: timelineVarRef("alternate-content-offset") }
			}
		} },
		[`&:not(${componentCls}-layout-alternate)`]: { [`${itemCls}-placement-end`]: {
			display: "flex",
			alignItems: "flex-end",
			[`${itemCls}-wrapper`]: {
				flex: "auto",
				flexDirection: "column-reverse"
			},
			[`${itemCls}-rail`]: {
				top: "auto",
				bottom: stepsVarRef("horizontal-rail-margin"),
				transform: "translateY(50%)"
			}
		} }
	} };
};
var horizontal_default = genHorizontalStyle;

//#endregion
export { horizontal_default as default };