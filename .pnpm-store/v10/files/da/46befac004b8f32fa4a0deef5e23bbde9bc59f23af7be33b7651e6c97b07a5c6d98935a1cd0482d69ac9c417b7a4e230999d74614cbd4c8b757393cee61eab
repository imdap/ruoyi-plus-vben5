import { resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/divider/style/index.ts
const genSizeDividerStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: { "&-horizontal": { [`&${componentCls}`]: {
		"&-sm": { marginBlock: token.marginXS },
		"&-md": { marginBlock: token.margin }
	} } } };
};
const genSharedDividerStyle = (token) => {
	const { componentCls, sizePaddingEdgeHorizontal, colorSplit, lineWidth, textPaddingInline, orientationMargin, verticalMarginInline } = token;
	const railCls = `${componentCls}-rail`;
	return { [componentCls]: {
		...resetComponent(token),
		borderBlockStart: `${unit(lineWidth)} solid ${colorSplit}`,
		[railCls]: { borderBlockStart: `${unit(lineWidth)} solid ${colorSplit}` },
		"&-vertical": {
			position: "relative",
			top: "-0.06em",
			display: "inline-block",
			height: "0.9em",
			marginInline: verticalMarginInline,
			marginBlock: 0,
			verticalAlign: "middle",
			borderTop: 0,
			borderInlineStart: `${unit(lineWidth)} solid ${colorSplit}`
		},
		"&-horizontal": {
			display: "flex",
			clear: "both",
			width: "100%",
			minWidth: "100%",
			margin: `${unit(token.marginLG)} 0`
		},
		[`&-horizontal${componentCls}-with-text`]: {
			display: "flex",
			alignItems: "center",
			margin: `${unit(token.dividerHorizontalWithTextGutterMargin)} 0`,
			color: token.colorTextHeading,
			fontWeight: 500,
			fontSize: token.fontSizeLG,
			whiteSpace: "nowrap",
			textAlign: "center",
			borderBlockStart: `0 ${colorSplit}`,
			[`${railCls}-start, ${railCls}-end`]: {
				width: "50%",
				borderBlockStartColor: "inherit",
				borderBlockEnd: 0,
				content: "''"
			}
		},
		[`&-horizontal${componentCls}-with-text-start`]: {
			[`${railCls}-start`]: { width: `calc(${orientationMargin} * 100%)` },
			[`${railCls}-end`]: { width: `calc(100% - ${orientationMargin} * 100%)` }
		},
		[`&-horizontal${componentCls}-with-text-end`]: {
			[`${railCls}-start`]: { width: `calc(100% - ${orientationMargin} * 100%)` },
			[`${railCls}-end`]: { width: `calc(${orientationMargin} * 100%)` }
		},
		[`${componentCls}-inner-text`]: {
			display: "inline-block",
			paddingBlock: 0,
			paddingInline: textPaddingInline
		},
		"&-dashed": {
			background: "none",
			borderColor: colorSplit,
			borderStyle: "dashed",
			borderWidth: `${unit(lineWidth)} 0 0`,
			[railCls]: { borderBlockStart: `${unit(lineWidth)} dashed ${colorSplit}` }
		},
		[`&-horizontal${componentCls}-with-text${componentCls}-dashed`]: { [`${railCls}-start, ${railCls}-end`]: { borderStyle: "dashed none none" } },
		[`&-vertical${componentCls}-dashed`]: {
			borderInlineStartWidth: lineWidth,
			borderInlineEnd: 0,
			borderBlockStart: 0,
			borderBlockEnd: 0
		},
		"&-dotted": {
			background: "none",
			borderColor: colorSplit,
			borderStyle: "dotted",
			borderWidth: `${unit(lineWidth)} 0 0`,
			[railCls]: { borderBlockStart: `${unit(lineWidth)} dotted ${colorSplit}` }
		},
		[`&-horizontal${componentCls}-with-text${componentCls}-dotted`]: { "&::before, &::after": { borderStyle: "dotted none none" } },
		[`&-vertical${componentCls}-dotted`]: {
			borderInlineStartWidth: lineWidth,
			borderInlineEnd: 0,
			borderBlockStart: 0,
			borderBlockEnd: 0
		},
		[`&-plain${componentCls}-with-text`]: {
			color: token.colorText,
			fontWeight: "normal",
			fontSize: token.fontSize
		},
		[`&-horizontal${componentCls}-with-text-start${componentCls}-no-default-orientation-margin-start`]: {
			[`${railCls}-start`]: { width: 0 },
			[`${railCls}-end`]: { width: "100%" },
			[`${componentCls}-inner-text`]: { paddingInlineStart: sizePaddingEdgeHorizontal }
		},
		[`&-horizontal${componentCls}-with-text-end${componentCls}-no-default-orientation-margin-end`]: {
			[`${railCls}-start`]: { width: "100%" },
			[`${railCls}-end`]: { width: 0 },
			[`${componentCls}-inner-text`]: { paddingInlineEnd: sizePaddingEdgeHorizontal }
		}
	} };
};
const prepareComponentToken = (token) => ({
	textPaddingInline: "1em",
	orientationMargin: .05,
	verticalMarginInline: token.marginXS
});
var style_default = genStyleHooks("Divider", (token) => {
	const dividerToken = mergeToken(token, {
		dividerHorizontalWithTextGutterMargin: token.margin,
		sizePaddingEdgeHorizontal: 0
	});
	return [genSharedDividerStyle(dividerToken), genSizeDividerStyle(dividerToken)];
}, prepareComponentToken, { unitless: { orientationMargin: true } });

//#endregion
export { style_default as default, prepareComponentToken };