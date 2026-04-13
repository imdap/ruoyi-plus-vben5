import { operationUnit } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { getCopyableStyles, getEditableStyles, getEllipsisStyles, getLinkStyles, getResetStyles, getTitleStyles } from "./mixins.js";

//#region src/typography/style/index.ts
const genTypographyStyle = (token) => {
	const { componentCls, titleMarginTop } = token;
	return { [componentCls]: {
		color: token.colorText,
		wordBreak: "break-word",
		lineHeight: token.lineHeight,
		[`&${componentCls}-secondary, &${componentCls}-link${componentCls}-secondary`]: { color: token.colorTextDescription },
		[`&${componentCls}-success, &${componentCls}-link${componentCls}-success`]: { color: token.colorSuccessText },
		[`&${componentCls}-warning, &${componentCls}-link${componentCls}-warning`]: { color: token.colorWarningText },
		[`&${componentCls}-danger, &${componentCls}-link${componentCls}-danger`]: {
			color: token.colorErrorText,
			[`&${componentCls}-link:active, &${componentCls}-link:focus`]: { color: token.colorErrorTextActive },
			[`&${componentCls}-link:hover`]: { color: token.colorErrorTextHover }
		},
		[`&${componentCls}-disabled`]: {
			color: token.colorTextDisabled,
			cursor: "not-allowed",
			userSelect: "none"
		},
		[`
        div&,
        p
      `]: { marginBottom: "1em" },
		...getTitleStyles(token),
		[`
      & + h1${componentCls},
      & + h2${componentCls},
      & + h3${componentCls},
      & + h4${componentCls},
      & + h5${componentCls}
      `]: { marginTop: titleMarginTop },
		[`
      div,
      ul,
      li,
      p,
      h1,
      h2,
      h3,
      h4,
      h5`]: { [`
        + h1,
        + h2,
        + h3,
        + h4,
        + h5
        `]: { marginTop: titleMarginTop } },
		...getResetStyles(token),
		...getLinkStyles(token),
		[`${componentCls}-actions`]: { display: "inline" },
		[`
        ${componentCls}-expand,
        ${componentCls}-collapse,
        ${componentCls}-edit,
        ${componentCls}-copy
      `]: {
			...operationUnit(token),
			marginInlineStart: token.marginXXS
		},
		...getEditableStyles(token),
		...getCopyableStyles(token),
		...getEllipsisStyles(),
		"&-rtl": { direction: "rtl" }
	} };
};
const prepareComponentToken = () => ({
	titleMarginTop: "1.2em",
	titleMarginBottom: "0.5em"
});
var style_default = genStyleHooks("Typography", genTypographyStyle, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };