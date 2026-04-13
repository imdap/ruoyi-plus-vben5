import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";

//#region src/space/style/index.ts
const genSpaceStyle = (token) => {
	const { componentCls, antCls } = token;
	return { [componentCls]: {
		display: "inline-flex",
		"&-rtl": { direction: "rtl" },
		"&-vertical": { flexDirection: "column" },
		"&-align": {
			flexDirection: "column",
			"&-center": { alignItems: "center" },
			"&-start": { alignItems: "flex-start" },
			"&-end": { alignItems: "flex-end" },
			"&-baseline": { alignItems: "baseline" }
		},
		[`${componentCls}-item:empty`]: { display: "none" },
		[`${componentCls}-item > ${antCls}-badge-not-a-wrapper:only-child`]: { display: "block" }
	} };
};
const genSpaceGapStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		"&-gap-row-small": { rowGap: token.spaceGapSmallSize },
		"&-gap-row-middle": { rowGap: token.spaceGapMiddleSize },
		"&-gap-row-medium": { rowGap: token.spaceGapMiddleSize },
		"&-gap-row-large": { rowGap: token.spaceGapLargeSize },
		"&-gap-col-small": { columnGap: token.spaceGapSmallSize },
		"&-gap-col-middle": { columnGap: token.spaceGapMiddleSize },
		"&-gap-col-medium": { columnGap: token.spaceGapMiddleSize },
		"&-gap-col-large": { columnGap: token.spaceGapLargeSize }
	} };
};
const prepareComponentToken = () => ({});
var style_default = genStyleHooks("Space", (token) => {
	const spaceToken = mergeToken(token, {
		spaceGapSmallSize: token.paddingXS,
		spaceGapMiddleSize: token.padding,
		spaceGapLargeSize: token.paddingLG
	});
	return [genSpaceStyle(spaceToken), genSpaceGapStyle(spaceToken)];
}, () => ({}), { resetStyle: false });

//#endregion
export { style_default as default, prepareComponentToken };