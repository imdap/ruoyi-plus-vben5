import { resetComponent } from "../../style/index.js";
import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import horizontal_default from "./horizontal.js";

//#region src/timeline/style/index.ts
const genTimelineStyle = (token) => {
	const { componentCls, tailColor, fontHeight, dotSize, dotBg, dotBorderWidth, fontSize, lineHeight, colorText, tailWidth, colorPrimary, colorError, colorSuccess, colorTextDisabled, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [componentCls]: [{
		...resetComponent(token),
		[itemCls]: {
			[varName("title-horizontal-title-height")]: fontHeight,
			[varName("vertical-rail-margin")]: "0px",
			[varName("title-horizontal-rail-gap")]: "0px",
			[varName("icon-dot-size-origin")]: varRef("icon-size-active"),
			[varName("icon-dot-size-custom")]: dotSize,
			[varName("item-icon-dot-bg-color-origin")]: varRef("item-icon-dot-bg-color"),
			[varName("item-icon-dot-bg-color-custom")]: dotBg,
			[varName("icon-size")]: varRef("icon-dot-size-custom", varRef("icon-dot-size-origin")),
			[`${itemCls}-icon`]: {
				[varName("dot-icon-border-width")]: dotBorderWidth,
				[varName("dot-icon-size")]: varRef("icon-size"),
				[varName("item-icon-dot-bg-color")]: varRef("item-icon-dot-bg-color-custom", varRef("item-icon-dot-bg-color-origin"))
			},
			[`${itemCls}-title`]: {
				fontSize,
				lineHeight
			},
			[`${itemCls}-content`]: { color: colorText },
			[`${itemCls}-rail`]: {
				[varName("item-solid-line-color")]: tailColor,
				[varName("rail-size")]: tailWidth
			}
		}
	}, {
		[itemCls]: { [varName("item-process-rail-line-style")]: "dotted" },
		[`${itemCls}${itemCls}${itemCls}-color`]: {
			"&-blue": { [varName("item-icon-dot-color")]: colorPrimary },
			"&-red": { [varName("item-icon-dot-color")]: colorError },
			"&-green": { [varName("item-icon-dot-color")]: colorSuccess },
			"&-gray": { [varName("item-icon-dot-color")]: colorTextDisabled }
		}
	}] };
};
const genVerticalStyle = (token) => {
	const { calc, componentCls, itemPaddingBottom, margin, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [, stepsVarRef] = genCssVar(antCls, "cmp-steps");
	const [timelineVarName, timelineVarRef] = genCssVar(antCls, "timeline");
	return { [`${componentCls}:not(${componentCls}-horizontal)`]: {
		[timelineVarName("head-span")]: "12",
		[timelineVarName("head-span-ptg")]: `calc(${timelineVarRef("head-span")} / 24 * 100%)`,
		[`&${componentCls}-layout-alternate`]: { [itemCls]: {
			[timelineVarName("alternate-gap")]: calc(margin).mul(2).add(stepsVarRef("dot-icon-size")).equal(),
			minHeight: "auto",
			paddingBottom: itemPaddingBottom,
			[`${itemCls}-icon, ${itemCls}-rail`]: {
				position: "absolute",
				insetInlineStart: timelineVarRef("head-span-ptg")
			},
			[`${itemCls}-icon`]: { marginInlineStart: `calc(${stepsVarRef("icon-size")} / -2)` },
			[`${itemCls}-section`]: {
				display: "flex",
				flexWrap: "nowrap",
				gap: timelineVarRef("alternate-gap")
			},
			[`${itemCls}-header`]: {
				textAlign: "end",
				flexDirection: "column",
				alignItems: "stretch",
				flex: `1 1 calc(${timelineVarRef("head-span-ptg")} - ${timelineVarRef("alternate-gap")} / 2)`
			},
			[`${itemCls}-content`]: {
				textAlign: "start",
				flex: `1 1 calc(100% - ${timelineVarRef("head-span-ptg")} - ${timelineVarRef("alternate-gap")} / 2)`
			},
			"&-placement-end": {
				[`${itemCls}-header`]: {
					textAlign: "start",
					order: 1
				},
				[`${itemCls}-content`]: { textAlign: "end" },
				[`${itemCls}-icon, ${itemCls}-rail`]: { insetInlineStart: `calc(100% - ${timelineVarRef("head-span-ptg")})` }
			}
		} },
		[`&:not(${componentCls}-layout-alternate)`]: { [`${itemCls}-placement-end`]: {
			textAlign: "end",
			[`${itemCls}-icon`]: { order: 1 },
			[`${itemCls}-rail`]: {
				insetInlineStart: "auto",
				insetInlineEnd: `calc(${stepsVarRef("icon-size")} / 2)`,
				marginInlineEnd: `calc(${stepsVarRef("rail-size")} / -2)`
			}
		} }
	} };
};
const prepareComponentToken = (token) => ({
	tailColor: token.colorSplit,
	tailWidth: token.lineWidthBold,
	dotBorderWidth: token.lineWidthBold,
	dotBg: void 0,
	dotSize: void 0,
	itemPaddingBottom: token.padding * 1.25
});
var style_default = genStyleHooks("Timeline", (token) => {
	const timeLineToken = mergeToken(token, {
		itemHeadSize: 10,
		customHeadPaddingVertical: token.paddingXXS,
		paddingInlineEnd: 2
	});
	return [
		genTimelineStyle(timeLineToken),
		genVerticalStyle(timeLineToken),
		horizontal_default(timeLineToken)
	];
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };