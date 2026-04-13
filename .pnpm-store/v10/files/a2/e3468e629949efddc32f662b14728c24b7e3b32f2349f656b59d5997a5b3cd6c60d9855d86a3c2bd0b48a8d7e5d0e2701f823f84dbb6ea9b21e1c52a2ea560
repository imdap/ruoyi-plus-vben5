import { resetComponent } from "../../style/index.js";
import { genCssVar } from "../../theme/util/genStyleUtils.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/float-button/style/group.ts
const genGroupStyle = (token) => {
	const { componentCls, antCls, floatButtonSize, padding } = token;
	const groupCls = `${componentCls}-group`;
	const listCls = `${groupCls}-list`;
	const [varName, varRef] = genCssVar(antCls, "float-btn");
	return { [groupCls]: [
		{
			[varName("list-transform-start")]: `translate(0,${unit(floatButtonSize)})`,
			[varName("list-trigger-offset")]: `calc(${unit(floatButtonSize)} + ${unit(padding)})`
		},
		{
			...resetComponent(token),
			position: "fixed",
			zIndex: token.zIndexPopupBase,
			insetInlineEnd: token.floatButtonInsetInlineEnd,
			bottom: token.floatButtonInsetBlockEnd,
			gap: padding,
			"&-rtl": { direction: "rtl" },
			[`&${componentCls}-pure`]: {
				position: "relative",
				inset: "auto"
			},
			[componentCls]: {
				position: "relative",
				inset: "auto"
			}
		},
		{
			[`&:not(${groupCls}-individual) ${listCls}`]: { boxShadow: token.boxShadowSecondary },
			[`&${groupCls}-individual ${listCls}`]: { gap: padding },
			[`&-menu-mode ${listCls}`]: { position: "absolute" },
			[listCls]: {
				borderRadius: token.borderRadiusLG,
				"&-motion": {
					transition: `all ${token.motionDurationSlow}`,
					"&-enter, &-appear": {
						opacity: 0,
						transform: varRef("list-transform-start"),
						"&-active": {
							opacity: 1,
							transform: `translate(0, 0)`
						}
					},
					"&-leave": { "&-active": {
						opacity: 0,
						transform: varRef("list-transform-start")
					} }
				}
			},
			"&-top": { [listCls]: { bottom: varRef("list-trigger-offset") } },
			"&-bottom": { [listCls]: {
				[varName("list-transform-start")]: `translate(0, calc(${unit(floatButtonSize)} * -1))`,
				top: varRef("list-trigger-offset")
			} },
			"&-left": { [listCls]: {
				[varName("list-transform-start")]: `translate(${unit(floatButtonSize)}, 0)`,
				right: varRef("list-trigger-offset")
			} },
			"&-right": { [listCls]: {
				[varName("list-transform-start")]: `translate(calc(${unit(floatButtonSize)} * -1), 0)`,
				left: varRef("list-trigger-offset")
			} }
		}
	] };
};
var group_default = genGroupStyle;

//#endregion
export { group_default as default };