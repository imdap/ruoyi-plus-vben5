import { genFocusStyle, resetComponent, resetIcon } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import collapse_default from "../../style/motion/collapse.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/collapse/style/index.ts
const genBaseStyle = (token) => {
	const { componentCls, contentBg, padding, headerBg, headerPadding, collapseHeaderPaddingSM, collapseHeaderPaddingLG, collapsePanelBorderRadius, lineWidth, lineType, colorBorder, colorText, colorTextHeading, colorTextDisabled, fontSizeLG, lineHeight, lineHeightLG, marginSM, paddingSM, paddingLG, paddingXS, motionDurationSlow, fontSizeIcon, contentPadding, fontHeight, fontHeightLG } = token;
	const borderBase = `${unit(lineWidth)} ${lineType} ${colorBorder}`;
	return { [componentCls]: {
		...resetComponent(token),
		backgroundColor: headerBg,
		border: borderBase,
		borderRadius: collapsePanelBorderRadius,
		"&-rtl": { direction: "rtl" },
		[`& > ${componentCls}-item`]: {
			borderBottom: borderBase,
			"&:first-child": { [`
            &,
            & > ${componentCls}-header`]: { borderRadius: `${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)} 0 0` } },
			"&:last-child": { [`
            &,
            & > ${componentCls}-header`]: { borderRadius: `0 0 ${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)}` } },
			[`> ${componentCls}-header`]: {
				position: "relative",
				display: "flex",
				flexWrap: "nowrap",
				alignItems: "flex-start",
				padding: headerPadding,
				color: colorTextHeading,
				lineHeight,
				cursor: "pointer",
				transition: `all ${motionDurationSlow}, visibility 0s`,
				...genFocusStyle(token),
				[`> ${componentCls}-title`]: { flex: "auto" },
				[`${componentCls}-expand-icon`]: {
					height: fontHeight,
					display: "flex",
					alignItems: "center",
					marginInlineEnd: marginSM
				},
				[`${componentCls}-arrow`]: {
					...resetIcon(),
					fontSize: fontSizeIcon,
					transition: `transform ${motionDurationSlow}`,
					svg: { transition: `transform ${motionDurationSlow}` }
				},
				[`${componentCls}-title`]: { marginInlineEnd: "auto" }
			},
			[`${componentCls}-collapsible-header`]: {
				cursor: "default",
				[`${componentCls}-title`]: {
					flex: "none",
					cursor: "pointer"
				},
				[`${componentCls}-expand-icon`]: { cursor: "pointer" }
			},
			[`${componentCls}-collapsible-icon`]: {
				cursor: "unset",
				[`${componentCls}-expand-icon`]: { cursor: "pointer" }
			}
		},
		[`${componentCls}-panel`]: {
			color: colorText,
			backgroundColor: contentBg,
			borderTop: borderBase,
			[`& > ${componentCls}-body`]: { padding: contentPadding },
			"&-hidden": { display: "none" }
		},
		"&-small": { [`> ${componentCls}-item`]: {
			[`> ${componentCls}-header`]: {
				padding: collapseHeaderPaddingSM,
				paddingInlineStart: paddingXS,
				[`> ${componentCls}-expand-icon`]: { marginInlineStart: token.calc(paddingSM).sub(paddingXS).equal() }
			},
			[`> ${componentCls}-panel > ${componentCls}-body`]: { padding: paddingSM }
		} },
		"&-large": { [`> ${componentCls}-item`]: {
			fontSize: fontSizeLG,
			lineHeight: lineHeightLG,
			[`> ${componentCls}-header`]: {
				padding: collapseHeaderPaddingLG,
				paddingInlineStart: padding,
				[`> ${componentCls}-expand-icon`]: {
					height: fontHeightLG,
					marginInlineStart: token.calc(paddingLG).sub(padding).equal()
				}
			},
			[`> ${componentCls}-panel > ${componentCls}-body`]: { padding: paddingLG }
		} },
		[`${componentCls}-item:last-child`]: {
			borderBottom: 0,
			[`> ${componentCls}-panel`]: { borderRadius: `0 0 ${unit(collapsePanelBorderRadius)} ${unit(collapsePanelBorderRadius)}` }
		},
		[`& ${componentCls}-item-disabled > ${componentCls}-header`]: { [`
          &,
          & > .arrow
        `]: {
			color: colorTextDisabled,
			cursor: "not-allowed"
		} },
		[`&${componentCls}-icon-placement-end`]: { [`& > ${componentCls}-item`]: { [`> ${componentCls}-header`]: { [`${componentCls}-expand-icon`]: {
			order: 1,
			marginInlineEnd: 0,
			marginInlineStart: marginSM
		} } } }
	} };
};
const genArrowStyle = (token) => {
	const { componentCls } = token;
	const fixedSelector = `> ${componentCls}-item > ${componentCls}-header ${componentCls}-arrow`;
	return { [`${componentCls}-rtl`]: { [fixedSelector]: { transform: `rotate(180deg)` } } };
};
const genBorderlessStyle = (token) => {
	const { componentCls, headerBg, borderlessContentPadding, borderlessContentBg, colorBorder } = token;
	return { [`${componentCls}-borderless`]: {
		backgroundColor: headerBg,
		border: 0,
		[`> ${componentCls}-item`]: { borderBottom: `1px solid ${colorBorder}` },
		[`
        > ${componentCls}-item:last-child,
        > ${componentCls}-item:last-child ${componentCls}-header
      `]: { borderRadius: 0 },
		[`> ${componentCls}-item:last-child`]: { borderBottom: 0 },
		[`> ${componentCls}-item > ${componentCls}-panel`]: {
			backgroundColor: borderlessContentBg,
			borderTop: 0
		},
		[`> ${componentCls}-item > ${componentCls}-panel > ${componentCls}-body`]: { padding: borderlessContentPadding }
	} };
};
const genGhostStyle = (token) => {
	const { componentCls, paddingSM } = token;
	return { [`${componentCls}-ghost`]: {
		backgroundColor: "transparent",
		border: 0,
		[`> ${componentCls}-item`]: {
			borderBottom: 0,
			[`> ${componentCls}-panel`]: {
				backgroundColor: "transparent",
				border: 0,
				[`> ${componentCls}-body`]: { paddingBlock: paddingSM }
			}
		}
	} };
};
const prepareComponentToken = (token) => ({
	headerPadding: `${token.paddingSM}px ${token.padding}px`,
	headerBg: token.colorFillAlter,
	contentPadding: `${token.padding}px 16px`,
	contentBg: token.colorBgContainer,
	borderlessContentPadding: `${token.paddingXXS}px 16px ${token.padding}px`,
	borderlessContentBg: "transparent"
});
var style_default = genStyleHooks("Collapse", (token) => {
	const collapseToken = mergeToken(token, {
		collapseHeaderPaddingSM: `${unit(token.paddingXS)} ${unit(token.paddingSM)}`,
		collapseHeaderPaddingLG: `${unit(token.padding)} ${unit(token.paddingLG)}`,
		collapsePanelBorderRadius: token.borderRadiusLG
	});
	return [
		genBaseStyle(collapseToken),
		genBorderlessStyle(collapseToken),
		genGhostStyle(collapseToken),
		genArrowStyle(collapseToken),
		collapse_default(collapseToken)
	];
}, prepareComponentToken);

//#endregion
export { style_default as default, genBaseStyle, prepareComponentToken };