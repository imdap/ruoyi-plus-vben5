import { resetComponent, textEllipsis } from "../../style/index.js";
import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import horizontal_default from "./horizontal.js";
import icon_default from "./icon.js";
import inline_default from "./inline.js";
import label_placement_default from "./label-placement.js";
import nav_default from "./nav.js";
import panel_default from "./panel.js";
import progress_default from "./progress.js";
import progress_dot_default from "./progress-dot.js";
import rtl_default from "./rtl.js";
import small_default from "./small.js";
import status_default from "./status.js";
import vertical_default from "./vertical.js";

//#region src/steps/style/index.ts
const genBasicStyle = (token) => {
	const { componentCls, antCls } = token;
	const itemCls = `${componentCls}-item`;
	const [varName, varRef] = genCssVar(antCls, "cmp-steps");
	return { [componentCls]: {
		[varName("title-font-size")]: token.fontSizeLG,
		[varName("title-line-height")]: token.lineHeightLG,
		[varName("subtitle-font-size")]: token.fontSize,
		[varName("subtitle-line-height")]: token.lineHeight,
		[varName("item-wrapper-padding-top")]: "0px",
		[varName("rail-size")]: token.lineWidth,
		[varName("rail-line-style")]: token.lineType,
		...resetComponent(token),
		display: "flex",
		flexWrap: "nowrap",
		alignItems: "flex-start",
		[itemCls]: {
			flex: "none",
			position: "relative"
		},
		[`${itemCls}-wrapper`]: {
			display: "flex",
			flexWrap: "nowrap",
			paddingTop: varRef("item-wrapper-padding-top")
		},
		[`${itemCls}-header`]: {
			display: "flex",
			flexWrap: "nowrap",
			alignItems: "center"
		},
		[`${itemCls}-title`]: {
			color: token.colorText,
			fontSize: varRef("title-font-size"),
			lineHeight: varRef("title-line-height"),
			wordBreak: "break-word"
		},
		[`${itemCls}-subtitle`]: {
			color: token.colorTextDescription,
			fontWeight: "normal",
			fontSize: varRef("subtitle-font-size"),
			lineHeight: varRef("subtitle-line-height"),
			marginInlineStart: token.marginXS,
			wordBreak: "break-word"
		},
		[`${itemCls}-content`]: {
			color: token.colorTextDescription,
			fontSize: token.fontSize,
			lineHeight: token.lineHeight,
			wordBreak: "break-word"
		},
		[`${itemCls}-rail`]: {
			borderStyle: varRef("rail-line-style"),
			borderWidth: 0
		},
		[`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content, ${itemCls}-rail`]: { transition: `all ${token.motionDurationSlow}` },
		[`&${componentCls}-ellipsis`]: { [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: textEllipsis },
		[`${itemCls}[role='button']:not(${itemCls}-active):hover`]: { cursor: "pointer" }
	} };
};
const prepareComponentToken = (token) => ({
	titleLineHeight: token.controlHeight,
	customIconSize: token.controlHeight,
	customIconTop: 0,
	customIconFontSize: token.controlHeightSM,
	iconSize: token.controlHeight,
	iconTop: -.5,
	iconFontSize: token.fontSize,
	iconSizeSM: token.fontSizeHeading3,
	dotSize: token.controlHeight / 4,
	dotCurrentSize: token.controlHeightLG / 4,
	navArrowColor: token.colorTextDisabled,
	navContentMaxWidth: "unset",
	descriptionMaxWidth: void 0,
	waitIconColor: token.wireframe ? token.colorTextDisabled : token.colorTextLabel,
	waitIconBgColor: token.wireframe ? token.colorBgContainer : token.colorFillContent,
	waitIconBorderColor: token.wireframe ? token.colorTextDisabled : "transparent",
	finishIconBgColor: token.wireframe ? token.colorBgContainer : token.controlItemBgActive,
	finishIconBorderColor: token.wireframe ? token.colorPrimary : token.controlItemBgActive
});
var style_default = genStyleHooks("Steps", (token) => {
	const stepsToken = mergeToken(token, { inlineDotSize: 6 });
	return [
		genBasicStyle(stepsToken),
		icon_default(stepsToken),
		vertical_default(stepsToken),
		horizontal_default(stepsToken),
		label_placement_default(stepsToken),
		small_default(stepsToken),
		progress_dot_default(stepsToken),
		status_default(stepsToken),
		nav_default(stepsToken),
		panel_default(stepsToken),
		inline_default(stepsToken),
		progress_default(stepsToken),
		rtl_default(stepsToken)
	];
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };