import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { alignItemsValues, flexWrapValues, justifyContentValues } from "../utils.js";

//#region src/flex/style/index.ts
const genFlexStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		display: "flex",
		margin: 0,
		padding: 0,
		"&-vertical": { flexDirection: "column" },
		"&-rtl": { direction: "rtl" },
		"&:empty": { display: "none" }
	} };
};
const genFlexGapStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		"&-gap-small": { gap: token.flexGapSM },
		"&-gap-middle": { gap: token.flexGap },
		"&-gap-medium": { gap: token.flexGap },
		"&-gap-large": { gap: token.flexGapLG }
	} };
};
const genFlexWrapStyle = (token) => {
	const { componentCls } = token;
	const wrapStyle = {};
	flexWrapValues.forEach((value) => {
		wrapStyle[`${componentCls}-wrap-${value}`] = { flexWrap: value };
	});
	return wrapStyle;
};
const genAlignItemsStyle = (token) => {
	const { componentCls } = token;
	const alignStyle = {};
	alignItemsValues.forEach((value) => {
		alignStyle[`${componentCls}-align-${value}`] = { alignItems: value };
	});
	return alignStyle;
};
const genJustifyContentStyle = (token) => {
	const { componentCls } = token;
	const justifyStyle = {};
	justifyContentValues.forEach((value) => {
		justifyStyle[`${componentCls}-justify-${value}`] = { justifyContent: value };
	});
	return justifyStyle;
};
const prepareComponentToken = () => ({});
var style_default = genStyleHooks("Flex", (token) => {
	const { paddingXS, padding, paddingLG } = token;
	const flexToken = mergeToken(token, {
		flexGapSM: paddingXS,
		flexGap: padding,
		flexGapLG: paddingLG
	});
	return [
		genFlexStyle(flexToken),
		genFlexGapStyle(flexToken),
		genFlexWrapStyle(flexToken),
		genAlignItemsStyle(flexToken),
		genJustifyContentStyle(flexToken)
	];
}, prepareComponentToken, { resetStyle: false });

//#endregion
export { style_default as default, prepareComponentToken };