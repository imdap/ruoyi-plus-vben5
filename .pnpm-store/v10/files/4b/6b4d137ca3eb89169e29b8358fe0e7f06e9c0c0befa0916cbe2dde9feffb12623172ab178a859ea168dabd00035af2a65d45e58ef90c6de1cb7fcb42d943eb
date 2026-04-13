import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/layout/style/index.ts
const genLayoutStyle = (token) => {
	const { antCls, componentCls, colorText, footerBg, headerHeight, headerPadding, headerColor, footerPadding, fontSize, bodyBg, headerBg } = token;
	return {
		[componentCls]: {
			display: "flex",
			flex: "auto",
			flexDirection: "column",
			minHeight: 0,
			background: bodyBg,
			"&, *": { boxSizing: "border-box" },
			[`&${componentCls}-has-sider`]: {
				flexDirection: "row",
				[`> ${componentCls}, > ${componentCls}-content`]: { width: 0 }
			},
			[`${componentCls}-header, &${componentCls}-footer`]: { flex: "0 0 auto" },
			"&-rtl": { direction: "rtl" }
		},
		[`${componentCls}-header`]: {
			height: headerHeight,
			padding: headerPadding,
			color: headerColor,
			lineHeight: unit(headerHeight),
			background: headerBg,
			[`${antCls}-menu`]: { lineHeight: "inherit" }
		},
		[`${componentCls}-footer`]: {
			padding: footerPadding,
			color: colorText,
			fontSize,
			background: footerBg
		},
		[`${componentCls}-content`]: {
			flex: "auto",
			color: colorText,
			minHeight: 0
		}
	};
};
const prepareComponentToken = (token) => {
	const { colorBgLayout, controlHeight, controlHeightLG, colorText, controlHeightSM, marginXXS, colorTextLightSolid, colorBgContainer } = token;
	const paddingInline = controlHeightLG * 1.25;
	return {
		colorBgHeader: "#001529",
		colorBgBody: colorBgLayout,
		colorBgTrigger: "#002140",
		bodyBg: colorBgLayout,
		headerBg: "#001529",
		headerHeight: controlHeight * 2,
		headerPadding: `0 ${paddingInline}px`,
		headerColor: colorText,
		footerPadding: `${controlHeightSM}px ${paddingInline}px`,
		footerBg: colorBgLayout,
		siderBg: "#001529",
		triggerHeight: controlHeightLG + marginXXS * 2,
		triggerBg: "#002140",
		triggerColor: colorTextLightSolid,
		zeroTriggerWidth: controlHeightLG,
		zeroTriggerHeight: controlHeightLG,
		lightSiderBg: colorBgContainer,
		lightTriggerBg: colorBgContainer,
		lightTriggerColor: colorText
	};
};
const DEPRECATED_TOKENS = [
	["colorBgBody", "bodyBg"],
	["colorBgHeader", "headerBg"],
	["colorBgTrigger", "triggerBg"]
];
var style_default = genStyleHooks("Layout", genLayoutStyle, prepareComponentToken, { deprecatedTokens: DEPRECATED_TOKENS });

//#endregion
export { DEPRECATED_TOKENS, style_default as default, prepareComponentToken };