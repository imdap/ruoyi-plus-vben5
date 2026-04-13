import { genCssVar } from "../../theme/util/genStyleUtils.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/steps/style/nav.ts
const genLegacyNavStyle = (token) => {
	const { componentCls, fontSizeIcon, navContentMaxWidth, navArrowColor, colorPrimary, motionDurationSlow, antCls, calc } = token;
	const itemCls = `${componentCls}-item`;
	const stepsNavActiveColor = colorPrimary;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}${componentCls}-navigation`]: {
		[itemCls.repeat(4)]: {
			display: "flex",
			justifyContent: "center",
			position: "relative",
			flex: 1,
			marginInlineStart: 0,
			[`${itemCls}-wrapper`]: { paddingBlock: token.paddingSM },
			[`${itemCls}-section`]: { maxWidth: navContentMaxWidth },
			[`${itemCls}-rail`]: { display: "none" },
			"&:before": {
				position: "absolute",
				display: "block",
				backgroundColor: stepsNavActiveColor,
				transition: `all ${motionDurationSlow}`,
				transitionTimingFunction: "ease-out",
				content: "\"\""
			},
			"&:not(:last-child):after": {
				position: "absolute",
				display: "block",
				borderTop: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
				borderBottom: "none",
				borderInlineStart: "none",
				borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
				content: "\"\""
			},
			[`&${itemCls}-active`]: {
				[varName("item-content-active-color")]: varRef("item-content-color"),
				[varName("item-icon-active-bg-color")]: varRef("item-icon-bg-color"),
				[varName("item-icon-active-border-color")]: varRef("item-icon-border-color"),
				[varName("item-icon-active-text-color")]: varRef("item-icon-text-color")
			}
		},
		[`&${componentCls}-horizontal`]: { [itemCls]: {
			"&:before": {
				bottom: 0,
				insetInlineStart: "50%",
				width: 0,
				height: token.lineWidthBold
			},
			[`&${itemCls}-active:before`]: {
				insetInlineStart: 0,
				width: "100%"
			},
			"&:not(:last-child):after": {
				top: `50%`,
				insetInlineStart: calc(fontSizeIcon).div(2).mul(-1).add("100%").equal(),
				width: fontSizeIcon,
				height: fontSizeIcon,
				transform: "translateY(-50%) rotate(45deg)"
			}
		} },
		[`&${componentCls}-vertical`]: { [itemCls.repeat(4)]: {
			[`${itemCls}-content`]: { padding: 0 },
			"&:before": {
				insetInlineEnd: 0,
				top: "50%",
				width: token.lineWidthBold,
				height: 0
			},
			[`&${itemCls}-active::before`]: {
				top: 0,
				height: "100%"
			},
			"&:not(:last-child):after": {
				left: {
					_skip_check_: true,
					value: "50%"
				},
				top: "100%",
				width: calc(fontSizeIcon).div(3).mul(2).equal(),
				height: calc(fontSizeIcon).div(3).mul(2).equal(),
				transform: "translateY(-50%) translateX(-50%) rotate(135deg)"
			}
		} }
	} };
};
var nav_default = genLegacyNavStyle;

//#endregion
export { nav_default as default };