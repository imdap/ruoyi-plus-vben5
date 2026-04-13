import { resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";

//#region src/statistic/style/index.ts
const genStatisticStyle = (token) => {
	const { componentCls, marginXXS, padding, colorTextDescription, titleFontSize, colorTextHeading, contentFontSize, fontFamily } = token;
	return { [componentCls]: {
		...resetComponent(token),
		[`${componentCls}-header`]: {
			paddingBottom: marginXXS,
			[`${componentCls}-title`]: {
				color: colorTextDescription,
				fontSize: titleFontSize
			}
		},
		[`${componentCls}-skeleton`]: { paddingTop: padding },
		[`${componentCls}-content`]: {
			color: colorTextHeading,
			fontSize: contentFontSize,
			fontFamily,
			[`${componentCls}-content-value`]: {
				display: "inline-block",
				direction: "ltr"
			},
			[`${componentCls}-content-prefix, ${componentCls}-content-suffix`]: { display: "inline-block" },
			[`${componentCls}-content-prefix`]: { marginInlineEnd: marginXXS },
			[`${componentCls}-content-suffix`]: { marginInlineStart: marginXXS }
		}
	} };
};
const prepareComponentToken = (token) => {
	const { fontSizeHeading3, fontSize } = token;
	return {
		titleFontSize: fontSize,
		contentFontSize: fontSizeHeading3
	};
};
var style_default = genStyleHooks("Statistic", (token) => {
	return genStatisticStyle(mergeToken(token, {}));
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };