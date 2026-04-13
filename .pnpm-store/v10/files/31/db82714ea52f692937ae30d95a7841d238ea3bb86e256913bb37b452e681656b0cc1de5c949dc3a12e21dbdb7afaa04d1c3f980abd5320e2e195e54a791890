import { genFocusStyle, resetComponent } from "../../style/index.js";
import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { getArrowToken } from "../../style/roundedArrow.js";
import placementArrow_default, { MAX_VERTICAL_CONTENT_RADIUS, getArrowOffsetToken } from "../../style/placementArrow.js";
import { unit } from "@antdv-next/cssinjs";
import { FastColor } from "@ant-design/fast-color";

//#region src/tour/style/index.ts
const genBaseStyle = (token) => {
	const { componentCls, padding, paddingXS, borderRadius, borderRadiusXS, colorPrimary, colorFill, indicatorHeight, indicatorWidth, boxShadowTertiary, zIndexPopup, colorBgElevated, fontWeightStrong, marginXS, colorTextLightSolid, tourBorderRadius, colorWhite, primaryNextBtnHoverBg, closeBtnSize, motionDurationSlow, antCls, primaryPrevBtnBg, motionDurationMid } = token;
	const [varName, varRef] = genCssVar(antCls, "tooltip");
	return [{
		[componentCls]: {
			...resetComponent(token),
			position: "absolute",
			zIndex: zIndexPopup,
			maxWidth: "fit-content",
			visibility: "visible",
			width: 520,
			[varName("arrow-background-color")]: colorBgElevated,
			"&-pure": {
				maxWidth: "100%",
				position: "relative"
			},
			[`&${componentCls}-hidden`]: { display: "none" },
			[`${componentCls}-panel`]: { position: "relative" },
			[`${componentCls}-section`]: {
				textAlign: "start",
				textDecoration: "none",
				borderRadius: tourBorderRadius,
				boxShadow: boxShadowTertiary,
				position: "relative",
				backgroundColor: colorBgElevated,
				border: "none",
				backgroundClip: "padding-box",
				[`${componentCls}-close`]: {
					position: "absolute",
					top: padding,
					insetInlineEnd: padding,
					color: token.colorIcon,
					background: "none",
					border: "none",
					width: closeBtnSize,
					height: closeBtnSize,
					borderRadius: token.borderRadiusSM,
					transition: ["color", "background-color"].map((prop) => `${prop} ${motionDurationMid}`).join(", "),
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					cursor: "pointer",
					"&:hover": {
						color: token.colorIconHover,
						backgroundColor: token.colorBgTextHover
					},
					"&:active": { backgroundColor: token.colorBgTextActive },
					...genFocusStyle(token)
				},
				[`${componentCls}-cover`]: {
					textAlign: "center",
					padding: `${unit(token.calc(padding).add(closeBtnSize).add(paddingXS).equal())} ${unit(padding)} 0`,
					img: { width: "100%" }
				},
				[`${componentCls}-header`]: {
					padding: `${unit(padding)} ${unit(padding)} ${unit(paddingXS)}`,
					width: `calc(100% - ${unit(closeBtnSize)})`,
					wordBreak: "break-word",
					[`${componentCls}-title`]: { fontWeight: fontWeightStrong }
				},
				[`${componentCls}-description`]: {
					padding: `0 ${unit(padding)}`,
					wordWrap: "break-word"
				},
				[`${componentCls}-footer`]: {
					padding: `${unit(paddingXS)} ${unit(padding)} ${unit(padding)}`,
					textAlign: "end",
					borderRadius: `0 0 ${unit(borderRadiusXS)} ${unit(borderRadiusXS)}`,
					display: "flex",
					[`${componentCls}-indicators`]: {
						display: "inline-block",
						[`${componentCls}-indicator`]: {
							width: indicatorWidth,
							height: indicatorHeight,
							display: "inline-block",
							borderRadius: "50%",
							background: colorFill,
							"&:not(:last-child)": { marginInlineEnd: indicatorHeight },
							"&-active": { background: colorPrimary }
						}
					},
					[`${componentCls}-actions`]: {
						marginInlineStart: "auto",
						[`${antCls}-btn`]: { marginInlineStart: marginXS }
					}
				}
			},
			[`${componentCls}-primary, &${componentCls}-primary`]: {
				[varName("arrow-background-color")]: colorPrimary,
				[`${componentCls}-section`]: {
					color: colorTextLightSolid,
					textAlign: "start",
					textDecoration: "none",
					backgroundColor: colorPrimary,
					borderRadius,
					boxShadow: boxShadowTertiary,
					[`${componentCls}-close`]: { color: colorTextLightSolid },
					[`${componentCls}-indicators`]: { [`${componentCls}-indicator`]: {
						background: primaryPrevBtnBg,
						"&-active": { background: colorTextLightSolid }
					} },
					[`${componentCls}-prev-btn`]: {
						color: colorTextLightSolid,
						borderColor: primaryPrevBtnBg,
						backgroundColor: colorPrimary,
						"&:hover": {
							backgroundColor: primaryPrevBtnBg,
							borderColor: "transparent"
						}
					},
					[`${componentCls}-next-btn`]: {
						color: colorPrimary,
						borderColor: "transparent",
						background: colorWhite,
						"&:hover": { background: primaryNextBtnHoverBg }
					}
				}
			}
		},
		[`${componentCls}-mask`]: { [`${componentCls}-placeholder-animated`]: { transition: `all ${motionDurationSlow}` } },
		[[
			"&-placement-left",
			"&-placement-leftTop",
			"&-placement-leftBottom",
			"&-placement-right",
			"&-placement-rightTop",
			"&-placement-rightBottom"
		].join(",")]: { [`${componentCls}-section`]: { borderRadius: token.min(tourBorderRadius, MAX_VERTICAL_CONTENT_RADIUS) } }
	}, placementArrow_default(token, varRef("arrow-background-color"))];
};
const prepareComponentToken = (token) => ({
	zIndexPopup: token.zIndexPopupBase + 70,
	closeBtnSize: token.fontSize * token.lineHeight,
	primaryPrevBtnBg: new FastColor(token.colorTextLightSolid).setA(.15).toRgbString(),
	primaryNextBtnHoverBg: new FastColor(token.colorBgTextHover).onBackground(token.colorWhite).toRgbString(),
	...getArrowOffsetToken({
		contentRadius: token.borderRadiusLG,
		limitVerticalRadius: true
	}),
	...getArrowToken(token)
});
var style_default = genStyleHooks("Tour", (token) => {
	const { borderRadiusLG } = token;
	return genBaseStyle(mergeToken(token, {
		indicatorWidth: 6,
		indicatorHeight: 6,
		tourBorderRadius: borderRadiusLG
	}));
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };