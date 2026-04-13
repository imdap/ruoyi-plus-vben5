import { resetIcon } from "../../style/index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/date-picker/style/util.ts
/**
* Get multiple selector needed style. The calculation:
*
* ContainerPadding = BasePadding - ItemMargin
*
* Border:                    ╔═══════════════════════════╗                 ┬
* ContainerPadding:          ║                           ║                 │
*                            ╟───────────────────────────╢     ┬           │
* Item Margin:               ║                           ║     │           │
*                            ║             ┌──────────┐  ║     │           │
* Item(multipleItemHeight):  ║ BasePadding │   Item   │  ║  Overflow  Container(ControlHeight)
*                            ║             └──────────┘  ║     │           │
* Item Margin:               ║                           ║     │           │
*                            ╟───────────────────────────╢     ┴           │
* ContainerPadding:          ║                           ║                 │
* Border:                    ╚═══════════════════════════╝                 ┴
*/
function getMultipleSelectorUnit(token) {
	const { multipleSelectItemHeight, paddingXXS, lineWidth, INTERNAL_FIXED_ITEM_MARGIN } = token;
	const basePadding = token.max(token.calc(paddingXXS).sub(lineWidth).equal(), 0);
	return {
		basePadding,
		containerPadding: token.max(token.calc(basePadding).sub(INTERNAL_FIXED_ITEM_MARGIN).equal(), 0),
		itemHeight: unit(multipleSelectItemHeight),
		itemLineHeight: unit(token.calc(multipleSelectItemHeight).sub(token.calc(token.lineWidth).mul(2)).equal())
	};
}
/**
* Get the `@rc-component/overflow` needed style.
* It's a share style which means not affected by `size`.
*/
function genOverflowStyle(token) {
	const { componentCls, iconCls, borderRadiusSM, motionDurationSlow, paddingXS, multipleItemColorDisabled, multipleItemBorderColorDisabled, colorIcon, colorIconHover, INTERNAL_FIXED_ITEM_MARGIN } = token;
	return { [`${componentCls}-selection-overflow`]: {
		position: "relative",
		display: "flex",
		flex: "auto",
		flexWrap: "wrap",
		maxWidth: "100%",
		"&-item": {
			flex: "none",
			alignSelf: "center",
			maxWidth: "calc(100% - 4px)",
			display: "inline-flex"
		},
		[`${componentCls}-selection-item`]: {
			display: "flex",
			alignSelf: "center",
			flex: "none",
			boxSizing: "border-box",
			maxWidth: "100%",
			marginBlock: INTERNAL_FIXED_ITEM_MARGIN,
			borderRadius: borderRadiusSM,
			cursor: "default",
			transition: [
				`font-size`,
				`line-height`,
				`height`
			].map((prop) => `${prop} ${motionDurationSlow}`).join(", "),
			marginInlineEnd: token.calc(INTERNAL_FIXED_ITEM_MARGIN).mul(2).equal(),
			paddingInlineStart: paddingXS,
			paddingInlineEnd: token.calc(paddingXS).div(2).equal(),
			[`${componentCls}-disabled&`]: {
				color: multipleItemColorDisabled,
				borderColor: multipleItemBorderColorDisabled,
				cursor: "not-allowed"
			},
			"&-content": {
				display: "inline-block",
				marginInlineEnd: token.calc(paddingXS).div(2).equal(),
				overflow: "hidden",
				whiteSpace: "pre",
				textOverflow: "ellipsis"
			},
			"&-remove": {
				...resetIcon(),
				display: "inline-flex",
				alignItems: "center",
				color: colorIcon,
				fontWeight: "bold",
				fontSize: 10,
				lineHeight: "inherit",
				cursor: "pointer",
				[`> ${iconCls}`]: { verticalAlign: "-0.2em" },
				"&:hover": { color: colorIconHover }
			}
		}
	} };
}

//#endregion
export { genOverflowStyle, getMultipleSelectorUnit };