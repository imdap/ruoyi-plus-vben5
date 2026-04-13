import { resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/avatar/style/index.ts
const genBaseStyle = (token) => {
	const { antCls, componentCls, iconCls, avatarBg, avatarColor, containerSize, containerSizeLG, containerSizeSM, textFontSize, textFontSizeLG, textFontSizeSM, iconFontSize, iconFontSizeLG, iconFontSizeSM, borderRadius, borderRadiusLG, borderRadiusSM, lineWidth, lineType } = token;
	const avatarSizeStyle = (size, fontSize, iconFontSize, radius) => ({
		width: size,
		height: size,
		borderRadius: "50%",
		fontSize,
		[`&${componentCls}-square`]: { borderRadius: radius },
		[`&${componentCls}-icon`]: {
			fontSize: iconFontSize,
			[`> ${iconCls}`]: { margin: 0 }
		}
	});
	return { [componentCls]: {
		...resetComponent(token),
		position: "relative",
		display: "inline-flex",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
		color: avatarColor,
		whiteSpace: "nowrap",
		textAlign: "center",
		verticalAlign: "middle",
		background: avatarBg,
		border: `${unit(lineWidth)} ${lineType} transparent`,
		"&-image": { background: "transparent" },
		[`${antCls}-image-img`]: { display: "block" },
		...avatarSizeStyle(containerSize, textFontSize, iconFontSize, borderRadius),
		"&-lg": { ...avatarSizeStyle(containerSizeLG, textFontSizeLG, iconFontSizeLG, borderRadiusLG) },
		"&-sm": { ...avatarSizeStyle(containerSizeSM, textFontSizeSM, iconFontSizeSM, borderRadiusSM) },
		"> img": {
			display: "block",
			width: "100%",
			height: "100%",
			objectFit: "cover"
		}
	} };
};
const genGroupStyle = (token) => {
	const { componentCls, groupBorderColor, groupOverlapping, groupSpace } = token;
	return {
		[`${componentCls}-group`]: {
			display: "inline-flex",
			[componentCls]: { borderColor: groupBorderColor },
			"> *:not(:first-child)": { marginInlineStart: groupOverlapping }
		},
		[`${componentCls}-group-popover`]: { [`${componentCls} + ${componentCls}`]: { marginInlineStart: groupSpace } }
	};
};
const prepareComponentToken = (token) => {
	const { controlHeight, controlHeightLG, controlHeightSM, fontSize, fontSizeLG, fontSizeXL, fontSizeHeading3, marginXS, marginXXS, colorBorderBg } = token;
	return {
		containerSize: controlHeight,
		containerSizeLG: controlHeightLG,
		containerSizeSM: controlHeightSM,
		textFontSize: fontSize,
		textFontSizeLG: fontSize,
		textFontSizeSM: fontSize,
		iconFontSize: Math.round((fontSizeLG + fontSizeXL) / 2),
		iconFontSizeLG: fontSizeHeading3,
		iconFontSizeSM: fontSize,
		groupSpace: marginXXS,
		groupOverlapping: -marginXS,
		groupBorderColor: colorBorderBg
	};
};
var style_default = genStyleHooks("Avatar", (token) => {
	const { colorTextLightSolid, colorTextPlaceholder } = token;
	const avatarToken = mergeToken(token, {
		avatarBg: colorTextPlaceholder,
		avatarColor: colorTextLightSolid
	});
	return [genBaseStyle(avatarToken), genGroupStyle(avatarToken)];
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };