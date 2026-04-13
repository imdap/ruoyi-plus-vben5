import { genFocusOutline, genFocusStyle, resetComponent } from "../../style/index.js";
import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { initComponentToken, initInputToken } from "../../input/style/token.js";
import { genBaseOutlinedStyle, genDisabledStyle } from "../../input/style/variants.js";
import { genBasicInputStyle, genInputLargeStyle, genInputSmallStyle } from "../../input/style/index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/pagination/style/index.ts
const genPaginationDisabledStyle = (token) => {
	const { componentCls } = token;
	return {
		[`${componentCls}-disabled`]: {
			"&, &:hover": {
				cursor: "not-allowed",
				[`${componentCls}-item-link`]: {
					color: token.colorTextDisabled,
					cursor: "not-allowed"
				}
			},
			"&:focus-visible": {
				cursor: "not-allowed",
				[`${componentCls}-item-link`]: {
					color: token.colorTextDisabled,
					cursor: "not-allowed"
				}
			}
		},
		[`&${componentCls}-disabled`]: {
			cursor: "not-allowed",
			[`${componentCls}-item`]: {
				cursor: "not-allowed",
				backgroundColor: "transparent",
				"&:hover, &:active": { backgroundColor: "transparent" },
				a: {
					color: token.colorTextDisabled,
					backgroundColor: "transparent",
					border: "none",
					cursor: "not-allowed"
				},
				"&-active": {
					borderColor: token.colorBorder,
					backgroundColor: token.itemActiveBgDisabled,
					"&:hover, &:active": { backgroundColor: token.itemActiveBgDisabled },
					a: { color: token.itemActiveColorDisabled }
				}
			},
			[`${componentCls}-item-link`]: {
				color: token.colorTextDisabled,
				cursor: "not-allowed",
				"&:hover, &:active": { backgroundColor: "transparent" },
				[`${componentCls}-simple&`]: {
					backgroundColor: "transparent",
					"&:hover, &:active": { backgroundColor: "transparent" }
				}
			},
			[`${componentCls}-simple-pager`]: { color: token.colorTextDisabled },
			[`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
				[`${componentCls}-item-link-icon`]: { opacity: 0 },
				[`${componentCls}-item-ellipsis`]: { opacity: 1 }
			}
		}
	};
};
const genPaginationSmallStyle = (token) => {
	const { componentCls } = token;
	return { [`&${componentCls}-small ${componentCls}-options`]: {
		marginInlineStart: token.paginationMiniOptionsMarginInlineStart,
		"&-quick-jumper": { input: {
			...genInputSmallStyle(token),
			width: token.paginationMiniQuickJumperInputWidth
		} }
	} };
};
const genPaginationLargeStyle = (token) => {
	const { componentCls } = token;
	return { [`&${componentCls}-large ${componentCls}-options`]: { "&-quick-jumper": { input: { ...genInputLargeStyle(token) } } } };
};
const genPaginationSimpleStyle = (token) => {
	const { componentCls, antCls } = token;
	const [, varRef] = genCssVar(antCls, "pagination");
	return { [`&${componentCls}-simple`]: {
		[`${componentCls}-prev, ${componentCls}-next`]: {
			height: varRef(`item-size-actual`),
			lineHeight: varRef(`item-size-actual`),
			verticalAlign: "top",
			[`${componentCls}-item-link`]: {
				height: varRef(`item-size-actual`),
				backgroundColor: "transparent",
				border: 0,
				"&:hover": { backgroundColor: token.colorBgTextHover },
				"&:active": { backgroundColor: token.colorBgTextActive },
				"&::after": {
					height: varRef(`item-size-actual`),
					lineHeight: varRef(`item-size-actual`)
				}
			}
		},
		[`${componentCls}-simple-pager`]: {
			display: "inline-flex",
			alignItems: "center",
			height: varRef(`item-size-actual`),
			marginInlineEnd: varRef(`item-spacing-actual`),
			input: {
				boxSizing: "border-box",
				height: "100%",
				width: token.quickJumperInputWidth,
				padding: `0 ${unit(token.paginationItemPaddingInline)}`,
				textAlign: "center",
				backgroundColor: token.itemInputBg,
				border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
				borderRadius: token.borderRadius,
				outline: "none",
				transition: `border-color ${token.motionDurationMid}`,
				color: "inherit",
				"&:hover": { borderColor: token.colorPrimary },
				"&:focus": {
					borderColor: token.colorPrimaryHover,
					boxShadow: `${unit(token.inputOutlineOffset)} 0 ${unit(token.controlOutlineWidth)} ${token.controlOutline}`
				},
				"&[disabled]": {
					color: token.colorTextDisabled,
					backgroundColor: token.colorBgContainerDisabled,
					borderColor: token.colorBorder,
					cursor: "not-allowed"
				}
			}
		},
		[`&${componentCls}-disabled`]: { [`${componentCls}-prev, ${componentCls}-next`]: { [`${componentCls}-item-link`]: { "&:hover, &:active": { backgroundColor: "transparent" } } } },
		[`&${componentCls}-small`]: { [`${componentCls}-simple-pager`]: { input: { width: token.paginationMiniQuickJumperInputWidth } } }
	} };
};
const genPaginationJumpStyle = (token) => {
	const { componentCls, antCls } = token;
	const [, varRef] = genCssVar(antCls, "pagination");
	return {
		[`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
			outline: 0,
			[`${componentCls}-item-container`]: {
				position: "relative",
				[`${componentCls}-item-link-icon`]: {
					color: token.colorPrimary,
					fontSize: token.fontSizeSM,
					opacity: 0,
					transition: `all ${token.motionDurationMid}`,
					"&-svg": {
						top: 0,
						insetInlineEnd: 0,
						bottom: 0,
						insetInlineStart: 0,
						margin: "auto"
					}
				},
				[`${componentCls}-item-ellipsis`]: {
					position: "absolute",
					top: 0,
					insetInlineEnd: 0,
					bottom: 0,
					insetInlineStart: 0,
					display: "block",
					margin: "auto",
					color: token.colorTextDisabled,
					letterSpacing: token.paginationEllipsisLetterSpacing,
					textAlign: "center",
					textIndent: token.paginationEllipsisTextIndent,
					opacity: 1,
					transition: `all ${token.motionDurationMid}`
				}
			},
			"&:hover": {
				[`${componentCls}-item-link-icon`]: { opacity: 1 },
				[`${componentCls}-item-ellipsis`]: { opacity: 0 }
			}
		},
		[`
    ${componentCls}-prev,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: { marginInlineEnd: varRef(`item-spacing-actual`) },
		[`
    ${componentCls}-prev,
    ${componentCls}-next,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: {
			display: "inline-block",
			minWidth: varRef(`item-size-actual`),
			height: varRef(`item-size-actual`),
			color: token.colorText,
			fontFamily: token.fontFamily,
			lineHeight: varRef(`item-size-actual`),
			textAlign: "center",
			verticalAlign: "middle",
			listStyle: "none",
			borderRadius: token.borderRadius,
			cursor: "pointer",
			transition: `all ${token.motionDurationMid}`
		},
		[`${componentCls}-prev, ${componentCls}-next`]: {
			outline: 0,
			button: {
				color: token.colorText,
				cursor: "pointer",
				userSelect: "none"
			},
			[`${componentCls}-item-link`]: {
				display: "block",
				width: "100%",
				height: "100%",
				padding: 0,
				fontSize: token.fontSizeSM,
				textAlign: "center",
				backgroundColor: "transparent",
				border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
				borderRadius: token.borderRadius,
				outline: "none",
				transition: `all ${token.motionDurationMid}`
			},
			[`&:hover ${componentCls}-item-link`]: { backgroundColor: token.colorBgTextHover },
			[`&:active ${componentCls}-item-link`]: { backgroundColor: token.colorBgTextActive },
			[`&${componentCls}-disabled:hover`]: { [`${componentCls}-item-link`]: { backgroundColor: "transparent" } }
		},
		[`${componentCls}-slash`]: {
			marginInlineEnd: token.paginationSlashMarginInlineEnd,
			marginInlineStart: token.paginationSlashMarginInlineStart
		},
		[`${componentCls}-options`]: {
			display: "inline-block",
			marginInlineStart: token.margin,
			verticalAlign: "middle",
			"&-size-changer": { width: "auto" },
			"&-quick-jumper": {
				display: "inline-block",
				height: varRef(`item-size-actual`),
				marginInlineStart: token.marginXS,
				lineHeight: varRef(`item-size-actual`),
				verticalAlign: "baseline",
				input: {
					...genBasicInputStyle(token),
					...genBaseOutlinedStyle(token, {
						borderColor: token.colorBorder,
						hoverBorderColor: token.colorPrimaryHover,
						activeBorderColor: token.colorPrimary,
						activeShadow: token.activeShadow
					}),
					"&[disabled]": { ...genDisabledStyle(token) },
					width: token.quickJumperInputWidth,
					height: varRef(`item-size-actual`),
					boxSizing: "border-box",
					margin: 0,
					marginInlineStart: varRef(`item-spacing-actual`),
					marginInlineEnd: varRef(`item-spacing-actual`)
				}
			}
		}
	};
};
const genPaginationItemStyle = (token) => {
	const { componentCls, antCls } = token;
	const [, varRef] = genCssVar(antCls, "pagination");
	return { [`${componentCls}-item`]: {
		display: "inline-block",
		minWidth: varRef(`item-size-actual`),
		height: varRef(`item-size-actual`),
		marginInlineEnd: varRef(`item-spacing-actual`),
		fontFamily: token.fontFamily,
		lineHeight: unit(token.calc(varRef("item-size-actual")).sub(2).equal()),
		textAlign: "center",
		verticalAlign: "middle",
		listStyle: "none",
		backgroundColor: token.itemBg,
		border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
		borderRadius: token.borderRadius,
		outline: 0,
		cursor: "pointer",
		userSelect: "none",
		a: {
			display: "block",
			padding: `0 ${unit(token.paginationItemPaddingInline)}`,
			color: token.colorText,
			"&:hover": { textDecoration: "none" }
		},
		[`&:not(${componentCls}-item-active)`]: {
			"&:hover": {
				transition: `all ${token.motionDurationMid}`,
				backgroundColor: token.colorBgTextHover
			},
			"&:active": { backgroundColor: token.colorBgTextActive }
		},
		"&-active": {
			fontWeight: token.fontWeightStrong,
			backgroundColor: token.itemActiveBg,
			borderColor: token.colorPrimary,
			a: { color: token.itemActiveColor },
			"&:hover": { borderColor: token.colorPrimaryHover },
			"&:hover a": { color: token.itemActiveColorHover }
		}
	} };
};
const genPaginationStyle = (token) => {
	const { componentCls, antCls } = token;
	const [varName, varRef] = genCssVar(antCls, "pagination");
	return {
		[componentCls]: {
			[varName(`item-size-actual`)]: unit(token.itemSize),
			[varName(`item-spacing-actual`)]: unit(token.marginXS),
			"&-small": {
				[varName(`item-size-actual`)]: unit(token.itemSizeSM),
				[varName(`item-spacing-actual`)]: unit(token.marginXXS)
			},
			"&-large": {
				[varName(`item-size-actual`)]: unit(token.itemSizeLG),
				[varName(`item-spacing-actual`)]: unit(token.marginSM)
			},
			...resetComponent(token),
			display: "flex",
			alignItems: "center",
			"&-start": { justifyContent: "start" },
			"&-center": { justifyContent: "center" },
			"&-end": { justifyContent: "end" },
			"ul, ol": {
				margin: 0,
				padding: 0,
				listStyle: "none"
			},
			"&::after": {
				display: "block",
				clear: "both",
				height: 0,
				overflow: "hidden",
				visibility: "hidden",
				content: "\"\""
			},
			[`${componentCls}-total-text`]: {
				display: "inline-block",
				height: varRef(`item-size-actual`),
				marginInlineEnd: varRef(`item-spacing-actual`),
				lineHeight: unit(token.calc(varRef(`item-size-actual`)).sub(2).equal()),
				verticalAlign: "middle"
			},
			...genPaginationItemStyle(token),
			...genPaginationJumpStyle(token),
			...genPaginationSimpleStyle(token),
			...genPaginationSmallStyle(token),
			...genPaginationLargeStyle(token),
			...genPaginationDisabledStyle(token),
			[`@media only screen and (max-width: ${token.screenLG}px)`]: { [`${componentCls}-item`]: { "&-after-jump-prev, &-before-jump-next": { display: "none" } } },
			[`@media only screen and (max-width: ${token.screenSM}px)`]: { [`${componentCls}-options`]: { display: "none" } }
		},
		[`&${token.componentCls}-rtl`]: { direction: "rtl" }
	};
};
const genPaginationFocusStyle = (token) => {
	const { componentCls } = token;
	return { [`${componentCls}:not(${componentCls}-disabled)`]: {
		[`${componentCls}-item`]: { ...genFocusStyle(token) },
		[`${componentCls}-jump-prev, ${componentCls}-jump-next`]: { "&:focus-visible": {
			[`${componentCls}-item-link-icon`]: { opacity: 1 },
			[`${componentCls}-item-ellipsis`]: { opacity: 0 },
			...genFocusOutline(token)
		} },
		[`${componentCls}-prev, ${componentCls}-next`]: { [`&:focus-visible ${componentCls}-item-link`]: genFocusOutline(token) }
	} };
};
const prepareComponentToken = (token) => ({
	itemBg: token.colorBgContainer,
	itemSize: token.controlHeight,
	itemSizeSM: token.controlHeightSM,
	itemSizeLG: token.controlHeightLG,
	itemActiveBg: token.colorBgContainer,
	itemActiveColor: token.colorPrimary,
	itemActiveColorHover: token.colorPrimaryHover,
	itemLinkBg: token.colorBgContainer,
	itemActiveColorDisabled: token.colorTextDisabled,
	itemActiveBgDisabled: token.controlItemBgActiveDisabled,
	itemInputBg: token.colorBgContainer,
	miniOptionsSizeChangerTop: 0,
	...initComponentToken(token)
});
function prepareToken(token) {
	return mergeToken(token, {
		inputOutlineOffset: 0,
		quickJumperInputWidth: token.calc(token.controlHeightLG).mul(1.25).equal(),
		paginationMiniOptionsMarginInlineStart: token.calc(token.marginXXS).div(2).equal(),
		paginationMiniQuickJumperInputWidth: token.calc(token.controlHeightLG).mul(1.1).equal(),
		paginationItemPaddingInline: token.calc(token.marginXXS).mul(1.5).equal(),
		paginationEllipsisLetterSpacing: token.calc(token.marginXXS).div(2).equal(),
		paginationSlashMarginInlineStart: token.marginSM,
		paginationSlashMarginInlineEnd: token.marginSM,
		paginationEllipsisTextIndent: "0.13em"
	}, initInputToken(token));
}
var style_default = genStyleHooks("Pagination", (token) => {
	const paginationToken = prepareToken(token);
	return [genPaginationStyle(paginationToken), genPaginationFocusStyle(paginationToken)];
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken, prepareToken };