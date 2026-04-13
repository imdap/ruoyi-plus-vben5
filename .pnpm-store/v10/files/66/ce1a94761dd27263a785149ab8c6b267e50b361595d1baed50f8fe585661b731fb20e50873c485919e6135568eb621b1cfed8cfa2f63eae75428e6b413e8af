import { genCssVar } from "../../theme/util/genStyleUtils.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/steps/style/panel.ts
const genPanelStyle = (token) => {
	const { componentCls, lineWidthBold, borderRadius, borderRadiusSM, motionDurationMid, paddingXS, lineType, paddingSM, antCls, calc } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	const borderStyle = `${unit(lineWidthBold)} ${lineType} ${varRef("panel-border-color")}`;
	return { [`${componentCls}${componentCls}-panel`]: [
		{
			[`${itemCls}-rail`]: { display: "none" },
			[`&${componentCls}-horizontal`]: {
				alignItems: "stretch",
				[itemCls]: {
					flex: 1,
					margin: 0
				}
			}
		},
		{
			"&": {
				[varName("panel-padding")]: paddingSM,
				[varName("item-border-radius")]: borderRadius,
				[itemCls]: {
					[varName("panel-bg-color")]: varRef("item-icon-bg-color"),
					[varName("panel-border-color")]: varRef("item-icon-border-color"),
					[varName("panel-active-bg-color")]: varRef("item-icon-active-bg-color"),
					[varName("panel-active-border-color")]: varRef("item-icon-active-border-color"),
					[varName("panel-title-height")]: `calc(${varRef("title-font-size")} * ${varRef("title-line-height")})`,
					[varName("item-base-height")]: calc(varRef("panel-padding")).mul(2).add(varRef("icon-size")).add(varRef("panel-title-height")).equal(),
					[varName("item-base-width")]: `calc(${varRef("item-base-height")} * 0.7071)`,
					transition: `background-color ${motionDurationMid}`
				}
			},
			[`${itemCls}-icon`]: { display: "none" },
			[`${itemCls}-header`]: { minHeight: "auto" },
			[`${componentCls}-panel-arrow`]: {
				position: "absolute",
				top: calc(lineWidthBold).mul(-1).equal(),
				insetInlineStart: "100%",
				zIndex: 1,
				height: calc(lineWidthBold).mul(2).add("100%").equal(),
				width: varRef("item-base-width"),
				overflow: "visible",
				strokeLinecap: "round",
				path: {
					fill: varRef("panel-bg-color"),
					stroke: varRef("panel-border-color"),
					strokeWidth: lineWidthBold,
					vectorEffect: "non-scaling-stroke",
					transition: `fill ${motionDurationMid}`
				}
			},
			[`${itemCls}:last-child ${componentCls}-panel-arrow`]: { display: "none" },
			[itemCls]: {
				padding: varRef("panel-padding"),
				background: varRef("panel-bg-color"),
				position: "relative",
				borderBlock: borderStyle,
				"&:not(:first-child)": { paddingInlineStart: `calc(${varRef("panel-padding")} + ${varRef("item-base-width")})` },
				"&:first-child": {
					borderInlineStart: borderStyle,
					borderStartStartRadius: varRef("item-border-radius"),
					borderEndStartRadius: varRef("item-border-radius")
				},
				"&:last-child": {
					borderInlineEnd: borderStyle,
					borderStartEndRadius: varRef("item-border-radius"),
					borderEndEndRadius: varRef("item-border-radius")
				},
				"&-active": {
					background: varRef("panel-active-bg-color"),
					borderColor: varRef("panel-active-border-color"),
					[`${componentCls}-panel-arrow`]: { path: {
						fill: varRef("panel-active-bg-color"),
						stroke: varRef("panel-active-border-color")
					} },
					[`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: { color: varRef("item-icon-active-text-color") }
				}
			}
		},
		{ [`&${componentCls}-small`]: {
			[varName("panel-padding")]: paddingXS,
			[varName("item-border-radius")]: borderRadiusSM
		} },
		{ [`&${componentCls}-filled`]: { [itemCls]: { "&:not(:first-child)": { clipPath: `polygon(${[
			`${unit(lineWidthBold)} 0`,
			`calc(100% + ${varRef("item-base-width")}) 0`,
			`calc(100% + ${varRef("item-base-width")}) 100%`,
			`${unit(lineWidthBold)} 100%`,
			`calc(${varRef("item-base-width")} + ${unit(lineWidthBold)}) 50%`
		].join(",")})` } } } },
		{ [`&${componentCls}-outlined`]: { [`${componentCls}-panel-arrow`]: {
			top: calc(lineWidthBold).div(2).mul(-1).equal(),
			height: calc(lineWidthBold).add("100%").equal()
		} } }
	] };
};
var panel_default = genPanelStyle;

//#endregion
export { panel_default as default };