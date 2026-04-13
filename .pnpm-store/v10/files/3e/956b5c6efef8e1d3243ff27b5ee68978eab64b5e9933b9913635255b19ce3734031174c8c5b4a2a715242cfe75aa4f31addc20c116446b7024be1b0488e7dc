import { resetComponent } from "../../style/index.js";
import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import collapse_default from "../../style/motion/collapse.js";
import { zoomIn } from "../../style/motion/zoom.js";
import explain_default from "./explain.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/form/style/index.ts
const resetForm = (token) => ({
	legend: {
		display: "block",
		width: "100%",
		marginBottom: token.marginLG,
		padding: 0,
		color: token.colorTextDescription,
		fontSize: token.fontSizeLG,
		lineHeight: "inherit",
		border: 0,
		borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`
	},
	"input[type=\"search\"]": { boxSizing: "border-box" },
	"input[type=\"radio\"], input[type=\"checkbox\"]": { lineHeight: "normal" },
	"input[type=\"file\"]": { display: "block" },
	"input[type=\"range\"]": {
		display: "block",
		width: "100%"
	},
	"select[multiple], select[size]": { height: "auto" },
	[`input[type='file']:focus,
  input[type='radio']:focus,
  input[type='checkbox']:focus`]: {
		outline: 0,
		boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${token.controlOutline}`
	},
	output: {
		display: "block",
		paddingTop: 15,
		color: token.colorText,
		fontSize: token.fontSize,
		lineHeight: token.lineHeight
	}
});
function genFormSize(token, height) {
	const { formItemCls } = token;
	return { [formItemCls]: {
		[`${formItemCls}-label > label`]: { height },
		[`${formItemCls}-control-input`]: { minHeight: height }
	} };
}
const genFormStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		...resetComponent(token),
		...resetForm(token),
		[`${componentCls}-text`]: {
			display: "inline-block",
			paddingInlineEnd: token.paddingSM
		},
		"&-small": { ...genFormSize(token, token.controlHeightSM) },
		"&-large": { ...genFormSize(token, token.controlHeightLG) }
	} };
};
const genFormItemStyle = (token) => {
	const { formItemCls, iconCls, rootPrefixCls, antCls, labelRequiredMarkColor, labelColor, labelFontSize, labelHeight, labelColonMarginInlineStart, labelColonMarginInlineEnd, itemMarginBottom } = token;
	const [varName] = genCssVar(antCls, "grid");
	return { [formItemCls]: {
		...resetComponent(token),
		marginBottom: itemMarginBottom,
		verticalAlign: "top",
		"&-with-help": { transition: "none" },
		[`&-hidden,
        &-hidden${antCls}-row`]: { display: "none" },
		"&-has-warning": { [`${formItemCls}-split`]: { color: token.colorError } },
		"&-has-error": { [`${formItemCls}-split`]: { color: token.colorWarning } },
		[`${formItemCls}-label`]: {
			flexGrow: 0,
			overflow: "hidden",
			whiteSpace: "nowrap",
			textAlign: "end",
			verticalAlign: "middle",
			"&-left": { textAlign: "start" },
			"&-wrap": {
				overflow: "unset",
				lineHeight: token.lineHeight,
				whiteSpace: "unset",
				"> label": {
					verticalAlign: "middle",
					textWrap: "balance"
				}
			},
			"> label": {
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				maxWidth: "100%",
				height: labelHeight,
				color: labelColor,
				fontSize: labelFontSize,
				[`> ${iconCls}`]: {
					fontSize: token.fontSize,
					verticalAlign: "top"
				},
				[`&${formItemCls}-required`]: {
					"&::before": {
						display: "inline-block",
						marginInlineEnd: token.marginXXS,
						color: labelRequiredMarkColor,
						fontSize: token.fontSize,
						fontFamily: "sans-serif",
						lineHeight: 1,
						content: "\"*\""
					},
					[`&${formItemCls}-required-mark-hidden, &${formItemCls}-required-mark-optional`]: { "&::before": { display: "none" } }
				},
				[`${formItemCls}-optional`]: {
					display: "inline-block",
					marginInlineStart: token.marginXXS,
					color: token.colorTextDescription,
					[`&${formItemCls}-required-mark-hidden`]: { display: "none" }
				},
				[`${formItemCls}-tooltip`]: {
					color: token.colorTextDescription,
					cursor: "help",
					writingMode: "horizontal-tb",
					marginInlineStart: token.marginXXS
				},
				"&::after": {
					content: "\":\"",
					position: "relative",
					marginBlock: 0,
					marginInlineStart: labelColonMarginInlineStart,
					marginInlineEnd: labelColonMarginInlineEnd
				},
				[`&${formItemCls}-no-colon::after`]: { content: "\"\\a0\"" }
			}
		},
		[`${formItemCls}-control`]: {
			[varName("display")]: "flex",
			flexDirection: "column",
			flexGrow: 1,
			[`&:first-child:not([class^="'${rootPrefixCls}-col-'"]):not([class*="' ${rootPrefixCls}-col-'"])`]: { width: "100%" },
			"&-input": {
				position: "relative",
				display: "flex",
				alignItems: "center",
				minHeight: token.controlHeight,
				"&-content": {
					flex: "auto",
					maxWidth: "100%",
					[`&:has(> ${antCls}-switch:only-child, > ${antCls}-rate:only-child)`]: {
						display: "flex",
						alignItems: "center"
					}
				}
			}
		},
		[formItemCls]: {
			"&-additional": {
				display: "flex",
				flexDirection: "column"
			},
			"&-explain, &-extra": {
				clear: "both",
				color: token.colorTextDescription,
				fontSize: token.fontSize,
				lineHeight: token.lineHeight
			},
			"&-explain-connected": { width: "100%" },
			"&-extra": {
				minHeight: token.controlHeightSM,
				transition: `color ${token.motionDurationMid} ${token.motionEaseOut}`
			},
			"&-explain": {
				"&-error": { color: token.colorError },
				"&-warning": { color: token.colorWarning }
			}
		},
		[`&-with-help ${formItemCls}-explain`]: {
			height: "auto",
			opacity: 1
		},
		[`${formItemCls}-feedback-icon`]: {
			fontSize: token.fontSize,
			textAlign: "center",
			visibility: "visible",
			animationName: zoomIn,
			animationDuration: token.motionDurationMid,
			animationTimingFunction: token.motionEaseOutBack,
			pointerEvents: "none",
			"&-success": { color: token.colorSuccess },
			"&-error": { color: token.colorError },
			"&-warning": { color: token.colorWarning },
			"&-validating": { color: token.colorPrimary }
		}
	} };
};
const makeVerticalLayoutLabel = (token) => ({
	padding: token.verticalLabelPadding,
	margin: token.verticalLabelMargin,
	whiteSpace: "initial",
	textAlign: "start",
	"> label": {
		margin: 0,
		"&::after": { visibility: "hidden" }
	}
});
const genHorizontalStyle = (token) => {
	const { antCls, formItemCls } = token;
	return { [`${formItemCls}-horizontal`]: {
		[`${formItemCls}-label`]: { flexGrow: 0 },
		[`${formItemCls}-control`]: {
			flex: "1 1 0",
			minWidth: 0
		},
		[`${formItemCls}-label[class$='-24'], ${formItemCls}-label[class*='-24 ']`]: { [`& + ${formItemCls}-control`]: { minWidth: "unset" } },
		[`${antCls}-col-24${formItemCls}-label,
        ${antCls}-col-xl-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
	} };
};
const genInlineStyle = (token) => {
	const { componentCls, formItemCls, inlineItemMarginBottom } = token;
	return { [`${componentCls}-inline`]: {
		display: "flex",
		flexWrap: "wrap",
		[`${formItemCls}-inline`]: {
			flex: "none",
			marginInlineEnd: token.margin,
			marginBottom: inlineItemMarginBottom,
			"&-row": { flexWrap: "nowrap" },
			[`> ${formItemCls}-label,
        > ${formItemCls}-control`]: {
				display: "inline-block",
				verticalAlign: "top"
			},
			[`> ${formItemCls}-label`]: { flex: "none" },
			[`${componentCls}-text`]: { display: "inline-block" },
			[`${formItemCls}-has-feedback`]: { display: "inline-block" }
		}
	} };
};
const makeVerticalLayout = (token) => {
	const { componentCls, formItemCls, rootPrefixCls } = token;
	return {
		[`${formItemCls} ${formItemCls}-label`]: makeVerticalLayoutLabel(token),
		[`${componentCls}:not(${componentCls}-inline)`]: { [formItemCls]: {
			flexWrap: "wrap",
			[`${formItemCls}-label, ${formItemCls}-control`]: { [`&:not([class*=" ${rootPrefixCls}-col-xs"])`]: {
				flex: "0 0 100%",
				maxWidth: "100%"
			} }
		} }
	};
};
const genVerticalStyle = (token) => {
	const { componentCls, formItemCls, antCls } = token;
	return {
		[`${formItemCls}-vertical`]: {
			[`${formItemCls}-row`]: { flexDirection: "column" },
			[`${formItemCls}-label > label`]: { height: "auto" },
			[`${formItemCls}-control`]: { width: "100%" },
			[`${formItemCls}-label,
        ${antCls}-col-24${formItemCls}-label,
        ${antCls}-col-xl-24${formItemCls}-label`]: makeVerticalLayoutLabel(token)
		},
		[`@media (max-width: ${unit(token.screenXSMax)})`]: [makeVerticalLayout(token), { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-xs-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } }],
		[`@media (max-width: ${unit(token.screenSMMax)})`]: { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-sm-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } },
		[`@media (max-width: ${unit(token.screenMDMax)})`]: { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-md-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } },
		[`@media (max-width: ${unit(token.screenLGMax)})`]: { [componentCls]: { [`${formItemCls}:not(${formItemCls}-horizontal)`]: { [`${antCls}-col-lg-24${formItemCls}-label`]: makeVerticalLayoutLabel(token) } } }
	};
};
const prepareComponentToken = (token) => ({
	labelRequiredMarkColor: token.colorError,
	labelColor: token.colorTextHeading,
	labelFontSize: token.fontSize,
	labelHeight: token.controlHeight,
	labelColonMarginInlineStart: token.marginXXS / 2,
	labelColonMarginInlineEnd: token.marginXS,
	itemMarginBottom: token.marginLG,
	verticalLabelPadding: `0 0 ${token.paddingXS}px`,
	verticalLabelMargin: 0,
	inlineItemMarginBottom: 0
});
function prepareToken(token, rootPrefixCls) {
	return mergeToken(token, {
		formItemCls: `${token.componentCls}-item`,
		rootPrefixCls
	});
}
var style_default = genStyleHooks("Form", (token, { rootPrefixCls }) => {
	const formToken = prepareToken(token, rootPrefixCls);
	return [
		genFormStyle(formToken),
		genFormItemStyle(formToken),
		explain_default(formToken),
		genHorizontalStyle(formToken),
		genInlineStyle(formToken),
		genVerticalStyle(formToken),
		collapse_default(formToken),
		zoomIn
	];
}, prepareComponentToken, { order: -1e3 });

//#endregion
export { style_default as default, prepareComponentToken, prepareToken };