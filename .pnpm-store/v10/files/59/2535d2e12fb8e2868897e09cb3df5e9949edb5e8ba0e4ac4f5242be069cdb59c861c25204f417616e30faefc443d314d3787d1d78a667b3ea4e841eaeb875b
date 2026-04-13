import { genFocusStyle } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import motion_default from "./motion.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/drawer/style/index.ts
const genDrawerStyle = (token) => {
	const { borderRadiusSM, componentCls, zIndexPopup, colorBgMask, colorBgElevated, motionDurationSlow, motionDurationMid, paddingXS, padding, paddingLG, fontSizeLG, lineHeightLG, lineWidth, lineType, colorSplit, marginXS, colorIcon, colorIconHover, colorBgTextHover, colorBgTextActive, colorText, fontWeightStrong, footerPaddingBlock, footerPaddingInline, draggerSize, calc } = token;
	const wrapperCls = `${componentCls}-content-wrapper`;
	const draggerCls = `${componentCls}-resizable-dragger`;
	return { [componentCls]: {
		position: "fixed",
		inset: 0,
		zIndex: zIndexPopup,
		pointerEvents: "none",
		color: colorText,
		"&-pure": {
			position: "relative",
			background: colorBgElevated,
			display: "flex",
			flexDirection: "column",
			pointerEvents: "auto",
			[`&${componentCls}-left`]: { boxShadow: token.boxShadowDrawerLeft },
			[`&${componentCls}-right`]: { boxShadow: token.boxShadowDrawerRight },
			[`&${componentCls}-top`]: { boxShadow: token.boxShadowDrawerUp },
			[`&${componentCls}-bottom`]: { boxShadow: token.boxShadowDrawerDown }
		},
		"&-inline": { position: "absolute" },
		[`${componentCls}-mask`]: {
			position: "absolute",
			inset: 0,
			zIndex: zIndexPopup,
			background: colorBgMask,
			pointerEvents: "auto",
			[`&${componentCls}-mask-blur`]: { backdropFilter: "blur(4px)" }
		},
		[wrapperCls]: {
			position: "absolute",
			zIndex: zIndexPopup,
			maxWidth: "100vw",
			transition: `all ${motionDurationSlow}`,
			"&-hidden": { display: "none" }
		},
		[`&-left > ${wrapperCls}`]: {
			top: 0,
			bottom: 0,
			left: {
				_skip_check_: true,
				value: 0
			},
			boxShadow: token.boxShadowDrawerLeft
		},
		[`&-right > ${wrapperCls}`]: {
			top: 0,
			right: {
				_skip_check_: true,
				value: 0
			},
			bottom: 0,
			boxShadow: token.boxShadowDrawerRight
		},
		[`&-top > ${wrapperCls}`]: {
			top: 0,
			insetInline: 0,
			boxShadow: token.boxShadowDrawerUp
		},
		[`&-bottom > ${wrapperCls}`]: {
			bottom: 0,
			insetInline: 0,
			boxShadow: token.boxShadowDrawerDown
		},
		[`${componentCls}-section`]: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "100%",
			overflow: "auto",
			background: colorBgElevated,
			pointerEvents: "auto"
		},
		[`${componentCls}-header`]: {
			display: "flex",
			flex: 0,
			alignItems: "center",
			padding: `${unit(padding)} ${unit(paddingLG)}`,
			fontSize: fontSizeLG,
			lineHeight: lineHeightLG,
			borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
			"&-title": {
				display: "flex",
				flex: 1,
				alignItems: "center",
				minWidth: 0,
				minHeight: 0
			}
		},
		[`${componentCls}-extra`]: { flex: "none" },
		[`${componentCls}-close`]: {
			display: "inline-flex",
			width: calc(fontSizeLG).add(paddingXS).equal(),
			height: calc(fontSizeLG).add(paddingXS).equal(),
			borderRadius: borderRadiusSM,
			justifyContent: "center",
			alignItems: "center",
			color: colorIcon,
			fontWeight: fontWeightStrong,
			fontSize: fontSizeLG,
			fontStyle: "normal",
			lineHeight: 1,
			textAlign: "center",
			textTransform: "none",
			textDecoration: "none",
			background: "transparent",
			border: 0,
			cursor: "pointer",
			transition: `all ${motionDurationMid}`,
			textRendering: "auto",
			[`&${componentCls}-close-end`]: { marginInlineStart: marginXS },
			[`&:not(${componentCls}-close-end)`]: { marginInlineEnd: marginXS },
			"&:hover": {
				color: colorIconHover,
				backgroundColor: colorBgTextHover,
				textDecoration: "none"
			},
			"&:active": { backgroundColor: colorBgTextActive },
			...genFocusStyle(token)
		},
		[`${componentCls}-title`]: {
			flex: 1,
			margin: 0,
			fontWeight: token.fontWeightStrong,
			fontSize: fontSizeLG,
			lineHeight: lineHeightLG
		},
		[`${componentCls}-body`]: {
			flex: 1,
			minWidth: 0,
			minHeight: 0,
			padding: paddingLG,
			overflow: "auto",
			[`${componentCls}-body-skeleton`]: {
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center"
			}
		},
		[`${componentCls}-footer`]: {
			flexShrink: 0,
			padding: `${unit(footerPaddingBlock)} ${unit(footerPaddingInline)}`,
			borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`
		},
		[draggerCls]: {
			position: "absolute",
			zIndex: 1,
			backgroundColor: "transparent",
			userSelect: "none",
			pointerEvents: "auto",
			"&:hover": {
				backgroundColor: token.colorPrimary,
				opacity: .2
			},
			"&-dragging": {
				backgroundColor: token.colorPrimary,
				opacity: .3
			}
		},
		[`${draggerCls}-left`]: {
			top: 0,
			bottom: 0,
			right: {
				_skip_check_: true,
				value: 0
			},
			width: draggerSize,
			cursor: "col-resize"
		},
		[`${draggerCls}-right`]: {
			top: 0,
			bottom: 0,
			left: {
				_skip_check_: true,
				value: 0
			},
			width: draggerSize,
			cursor: "col-resize"
		},
		[`${draggerCls}-top`]: {
			insetInline: 0,
			bottom: 0,
			height: draggerSize,
			cursor: "row-resize"
		},
		[`${draggerCls}-bottom`]: {
			insetInline: 0,
			top: 0,
			height: draggerSize,
			cursor: "row-resize"
		},
		[`${wrapperCls}-dragging`]: {
			userSelect: "none",
			transition: "none",
			willChange: "width, height",
			[`${componentCls}-content`]: { pointerEvents: "none" },
			[`${componentCls}-section`]: { pointerEvents: "none" }
		},
		"&-rtl": { direction: "rtl" }
	} };
};
const prepareComponentToken = (token) => ({
	zIndexPopup: token.zIndexPopupBase,
	footerPaddingBlock: token.paddingXS,
	footerPaddingInline: token.padding,
	draggerSize: 4
});
var style_default = genStyleHooks("Drawer", (token) => {
	const drawerToken = mergeToken(token, {});
	return [genDrawerStyle(drawerToken), motion_default(drawerToken)];
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };