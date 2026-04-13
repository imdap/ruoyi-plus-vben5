import { genFocusStyle, resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/breadcrumb/style/index.ts
const genBreadcrumbStyle = (token) => {
	const { componentCls, iconCls, calc } = token;
	return { [componentCls]: {
		...resetComponent(token),
		color: token.itemColor,
		fontSize: token.fontSize,
		[iconCls]: { fontSize: token.iconFontSize },
		ol: {
			display: "flex",
			flexWrap: "wrap",
			margin: 0,
			padding: 0,
			listStyle: "none"
		},
		[`${componentCls}-item a`]: {
			color: token.linkColor,
			transition: `color ${token.motionDurationMid}`,
			padding: `0 ${unit(token.paddingXXS)}`,
			borderRadius: token.borderRadiusSM,
			height: token.fontHeight,
			display: "inline-block",
			marginInline: calc(token.marginXXS).mul(-1).equal(),
			"&:hover": {
				color: token.linkHoverColor,
				backgroundColor: token.colorBgTextHover
			},
			...genFocusStyle(token)
		},
		[`${componentCls}-item:last-child`]: { color: token.lastItemColor },
		[`${componentCls}-separator`]: {
			marginInline: token.separatorMargin,
			color: token.separatorColor
		},
		[`${componentCls}-link`]: { [`
          > ${iconCls} + span,
          > ${iconCls} + a
        `]: { marginInlineStart: token.marginXXS } },
		[`${componentCls}-overlay-link`]: {
			borderRadius: token.borderRadiusSM,
			height: token.fontHeight,
			display: "inline-block",
			padding: `0 ${unit(token.paddingXXS)}`,
			marginInline: calc(token.marginXXS).mul(-1).equal(),
			[`> ${iconCls}`]: {
				marginInlineStart: token.marginXXS,
				fontSize: token.fontSizeIcon
			},
			"&:hover": {
				color: token.linkHoverColor,
				backgroundColor: token.colorBgTextHover,
				a: { color: token.linkHoverColor }
			},
			a: { "&:hover": { backgroundColor: "transparent" } }
		},
		[`&${token.componentCls}-rtl`]: { direction: "rtl" }
	} };
};
const prepareComponentToken = (token) => ({
	itemColor: token.colorTextDescription,
	lastItemColor: token.colorText,
	iconFontSize: token.fontSize,
	linkColor: token.colorTextDescription,
	linkHoverColor: token.colorText,
	separatorColor: token.colorTextDescription,
	separatorMargin: token.marginXS
});
var style_default = genStyleHooks("Breadcrumb", (token) => {
	return genBreadcrumbStyle(mergeToken(token, {}));
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };