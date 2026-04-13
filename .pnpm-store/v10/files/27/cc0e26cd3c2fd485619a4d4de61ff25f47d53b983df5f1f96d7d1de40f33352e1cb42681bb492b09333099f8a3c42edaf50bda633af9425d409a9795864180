import genPresetColor from "../../theme/util/genPresetColor.js";
import { resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { prepareComponentToken, prepareToken } from "./index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/badge/style/ribbon.ts
const genRibbonStyle = (token) => {
	const { antCls, badgeFontHeight, marginXS, badgeRibbonOffset, calc } = token;
	const ribbonPrefixCls = `${antCls}-ribbon`;
	const ribbonWrapperPrefixCls = `${antCls}-ribbon-wrapper`;
	const statusRibbonPreset = genPresetColor(token, (colorKey, { darkColor }) => ({ [`&${ribbonPrefixCls}-color-${colorKey}`]: {
		background: darkColor,
		color: darkColor
	} }));
	return {
		[ribbonWrapperPrefixCls]: { position: "relative" },
		[ribbonPrefixCls]: {
			...resetComponent(token),
			position: "absolute",
			top: marginXS,
			padding: `0 ${unit(token.paddingXS)}`,
			color: token.colorPrimary,
			lineHeight: unit(badgeFontHeight),
			whiteSpace: "nowrap",
			backgroundColor: token.colorPrimary,
			borderRadius: token.borderRadiusSM,
			[`${ribbonPrefixCls}-content`]: { color: token.badgeTextColor },
			[`${ribbonPrefixCls}-corner`]: {
				position: "absolute",
				top: "100%",
				width: badgeRibbonOffset,
				height: badgeRibbonOffset,
				color: "currentcolor",
				border: `${unit(calc(badgeRibbonOffset).div(2).equal())} solid`,
				transform: token.badgeRibbonCornerTransform,
				transformOrigin: "top",
				filter: token.badgeRibbonCornerFilter
			},
			...statusRibbonPreset,
			[`&${ribbonPrefixCls}-placement-end`]: {
				insetInlineEnd: calc(badgeRibbonOffset).mul(-1).equal(),
				borderEndEndRadius: 0,
				[`${ribbonPrefixCls}-corner`]: {
					insetInlineEnd: 0,
					borderInlineEndColor: "transparent",
					borderBlockEndColor: "transparent"
				}
			},
			[`&${ribbonPrefixCls}-placement-start`]: {
				insetInlineStart: calc(badgeRibbonOffset).mul(-1).equal(),
				borderEndStartRadius: 0,
				[`${ribbonPrefixCls}-corner`]: {
					insetInlineStart: 0,
					borderBlockEndColor: "transparent",
					borderInlineStartColor: "transparent"
				}
			},
			"&-rtl": { direction: "rtl" }
		}
	};
};
var ribbon_default = genStyleHooks(["Badge", "Ribbon"], (token) => {
	return genRibbonStyle(prepareToken(token));
}, prepareComponentToken);

//#endregion
export { ribbon_default as default };