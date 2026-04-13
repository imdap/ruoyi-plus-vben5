import { genCssVar } from "../../theme/util/genStyleUtils.js";
import { getItemWithWidthStyle } from "./util.js";

//#region src/steps/style/label-placement.ts
const genLabelPlacementStyle = (token) => {
	const { componentCls, descriptionMaxWidth, marginXS, fontHeightLG, margin, paddingSM, marginXXS, antCls, calc } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return {
		[componentCls]: {
			[varName("icon-size-max")]: `max(${varRef("icon-size")}, ${varRef("icon-size-active", varRef("icon-size"))})`,
			[`${itemCls}-icon`]: { marginBlockStart: `calc((${varRef("heading-height")} - ${varRef("icon-size")}) / 2)` }
		},
		[`${componentCls}-title-horizontal`]: {
			[varName("title-horizontal-item-margin")]: margin,
			[varName("title-horizontal-rail-margin")]: margin,
			[varName("title-horizontal-title-height")]: fontHeightLG,
			[varName("heading-height")]: `max(${varRef("icon-size")}, ${varRef("title-horizontal-title-height")})`,
			[`&${componentCls}-horizontal, &${componentCls}-horizontal-alternate`]: {
				[`${itemCls}:not(:first-child)`]: { marginInlineStart: varRef("title-horizontal-item-margin") },
				[`${itemCls}:last-child`]: { flex: "0 1 auto" },
				[`${itemCls}-wrapper`]: { columnGap: token.marginXS }
			},
			[`&${componentCls}-vertical`]: {
				[`${itemCls}-wrapper`]: { columnGap: token.margin },
				[`${itemCls}-empty-header`]: {
					[`${itemCls}-header`]: { minHeight: "auto" },
					[`${itemCls}-content`]: { marginTop: calc(varRef("heading-height")).sub(token.fontHeight).div(2).equal() }
				}
			},
			[`${itemCls}-section`]: {
				flex: 1,
				minWidth: 0
			},
			[`${itemCls}-header`]: { minHeight: varRef("heading-height") },
			[`${itemCls}-title`]: { flex: "0 1 auto" },
			[`${itemCls}-content`]: { maxWidth: descriptionMaxWidth },
			[`${itemCls}-subtitle`]: { flex: "0 9999 auto" },
			[`&${componentCls}-horizontal ${itemCls}-rail`]: {
				[varName("item-wrapper-padding-top")]: "0px",
				flex: "1 1 0%",
				marginInlineStart: varRef("title-horizontal-rail-margin")
			}
		},
		[`${componentCls}-title-vertical`]: {
			[varName("title-vertical-row-gap")]: paddingSM,
			[varName("title-horizontal-rail-gap")]: marginXXS,
			[varName("heading-height")]: varRef("icon-size-max"),
			[`> ${itemCls}`]: {
				flex: "1 1 0%",
				[`${itemCls}-wrapper`]: {
					flexDirection: "column",
					rowGap: varRef("title-vertical-row-gap"),
					alignItems: "center"
				},
				[`${itemCls}-section`]: { alignSelf: "stretch" },
				[`${itemCls}-header`]: {
					flexDirection: "column",
					alignItems: "center"
				},
				[`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: {
					textAlign: "center",
					maxWidth: "100%"
				},
				[`${itemCls}-subtitle`]: { margin: 0 },
				[`${itemCls}-rail`]: {
					position: "absolute",
					top: 0,
					width: `calc(100% - ${varRef("icon-size")} - ${varRef("title-horizontal-rail-gap")} * 2)`,
					insetInlineStart: `calc(50% + ${varRef("icon-size")} / 2 + ${varRef("title-horizontal-rail-gap")})`
				}
			},
			...getItemWithWidthStyle(token, marginXS, {
				[`${itemCls}:last-child`]: { flex: "none" },
				[`${itemCls}-icon`]: { alignSelf: "flex-start" },
				[`${itemCls}-section`]: { width: descriptionMaxWidth }
			})
		}
	};
};
var label_placement_default = genLabelPlacementStyle;

//#endregion
export { label_placement_default as default };