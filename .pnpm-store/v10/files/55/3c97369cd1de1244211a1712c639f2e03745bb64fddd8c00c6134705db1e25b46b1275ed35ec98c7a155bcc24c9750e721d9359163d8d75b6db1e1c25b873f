import { PresetColors } from "../../theme/interface/presetColors.js";
import { genCssVar } from "../../theme/util/genStyleUtils.js";

//#region src/button/style/variant.ts
const genVariantStyle = (token) => {
	const { componentCls, antCls, lineWidth } = token;
	const [varName, varRef] = genCssVar(antCls, "btn");
	return { [componentCls]: [
		{
			[varName("border-width")]: lineWidth,
			[varName("border-color")]: "#000",
			[varName("border-color-hover")]: varRef("border-color"),
			[varName("border-color-active")]: varRef("border-color"),
			[varName("border-color-disabled")]: varRef("border-color"),
			[varName("border-style")]: "solid",
			[varName("text-color")]: "#000",
			[varName("text-color-hover")]: varRef("text-color"),
			[varName("text-color-active")]: varRef("text-color"),
			[varName("text-color-disabled")]: varRef("text-color"),
			[varName("bg-color")]: "#ddd",
			[varName("bg-color-hover")]: varRef("bg-color"),
			[varName("bg-color-active")]: varRef("bg-color"),
			[varName("bg-color-disabled")]: token.colorBgContainerDisabled,
			[varName("bg-color-container")]: token.colorBgContainer,
			[varName("shadow")]: "none"
		},
		{
			border: [
				varRef("border-width"),
				varRef("border-style"),
				varRef("border-color")
			].join(" "),
			color: varRef("text-color"),
			backgroundColor: varRef("bg-color"),
			[`&:not(:disabled):not(${componentCls}-disabled)`]: {
				"&:hover": {
					border: [
						varRef("border-width"),
						varRef("border-style"),
						varRef("border-color-hover")
					].join(" "),
					color: varRef("text-color-hover"),
					backgroundColor: varRef("bg-color-hover")
				},
				"&:active": {
					border: [
						varRef("border-width"),
						varRef("border-style"),
						varRef("border-color-active")
					].join(" "),
					color: varRef("text-color-active"),
					backgroundColor: varRef("bg-color-active")
				}
			}
		},
		{
			[`&${componentCls}-variant-solid`]: {
				[varName("solid-bg-color")]: varRef("color-base"),
				[varName("solid-bg-color-hover")]: varRef("color-hover"),
				[varName("solid-bg-color-active")]: varRef("color-active"),
				[varName("border-color")]: "transparent",
				[varName("text-color")]: token.colorTextLightSolid,
				[varName("bg-color")]: varRef("solid-bg-color"),
				[varName("bg-color-hover")]: varRef("solid-bg-color-hover"),
				[varName("bg-color-active")]: varRef("solid-bg-color-active"),
				boxShadow: varRef("shadow")
			},
			[`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
				[varName("border-color")]: varRef("color-base"),
				[varName("border-color-hover")]: varRef("color-hover"),
				[varName("border-color-active")]: varRef("color-active"),
				[varName("bg-color")]: varRef("bg-color-container"),
				[varName("text-color")]: varRef("color-base"),
				[varName("text-color-hover")]: varRef("color-hover"),
				[varName("text-color-active")]: varRef("color-active"),
				boxShadow: varRef("shadow")
			},
			[`&${componentCls}-variant-dashed`]: {
				[varName("border-style")]: "dashed",
				[varName("bg-color-disabled")]: token.dashedBgDisabled
			},
			[`&${componentCls}-variant-filled`]: {
				[varName("border-color")]: "transparent",
				[varName("text-color")]: varRef("color-base"),
				[varName("bg-color")]: varRef("color-light"),
				[varName("bg-color-hover")]: varRef("color-light-hover"),
				[varName("bg-color-active")]: varRef("color-light-active")
			},
			[`&${componentCls}-variant-text, &${componentCls}-variant-link`]: {
				[varName("border-color")]: "transparent",
				[varName("text-color")]: varRef("color-base"),
				[varName("text-color-hover")]: varRef("color-hover"),
				[varName("text-color-active")]: varRef("color-active"),
				[varName("bg-color")]: "transparent",
				[varName("bg-color-hover")]: "transparent",
				[varName("bg-color-active")]: "transparent",
				[`&:disabled, &${token.componentCls}-disabled`]: {
					background: "transparent",
					borderColor: "transparent"
				}
			},
			[`&${componentCls}-variant-text`]: {
				[varName("bg-color-hover")]: varRef("color-light"),
				[varName("bg-color-active")]: varRef("color-light-active")
			}
		},
		{
			[`&${componentCls}-variant-link`]: {
				[varName("color-base")]: token.colorLink,
				[varName("color-hover")]: token.colorLinkHover,
				[varName("color-active")]: token.colorLinkActive,
				[varName("bg-color-hover")]: token.linkHoverBg
			},
			[`&${componentCls}-color-primary`]: {
				[varName("color-base")]: token.colorPrimary,
				[varName("color-hover")]: token.colorPrimaryHover,
				[varName("color-active")]: token.colorPrimaryActive,
				[varName("color-light")]: token.colorPrimaryBg,
				[varName("color-light-hover")]: token.colorPrimaryBgHover,
				[varName("color-light-active")]: token.colorPrimaryBorder,
				[varName("shadow")]: token.primaryShadow,
				[`&${componentCls}-variant-solid`]: {
					[varName("text-color")]: token.primaryColor,
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				}
			},
			[`&${componentCls}-color-dangerous`]: {
				[varName("color-base")]: token.colorError,
				[varName("color-hover")]: token.colorErrorHover,
				[varName("color-active")]: token.colorErrorActive,
				[varName("color-light")]: token.colorErrorBg,
				[varName("color-light-hover")]: token.colorErrorBgFilledHover,
				[varName("color-light-active")]: token.colorErrorBgActive,
				[varName("shadow")]: token.dangerShadow,
				[`&${componentCls}-variant-solid`]: {
					[varName("text-color")]: token.dangerColor,
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				}
			},
			[`&${componentCls}-color-default`]: {
				[varName("solid-bg-color")]: token.colorBgSolid,
				[varName("solid-bg-color-hover")]: token.colorBgSolidHover,
				[varName("solid-bg-color-active")]: token.colorBgSolidActive,
				[varName("color-base")]: token.defaultBorderColor,
				[varName("color-hover")]: token.defaultHoverBorderColor,
				[varName("color-active")]: token.defaultActiveBorderColor,
				[varName("color-light")]: token.colorFillTertiary,
				[varName("color-light-hover")]: token.colorFillSecondary,
				[varName("color-light-active")]: token.colorFill,
				[varName("text-color")]: token.defaultColor,
				[varName("text-color-hover")]: token.defaultHoverColor,
				[varName("text-color-active")]: token.defaultActiveColor,
				[varName("shadow")]: token.defaultShadow,
				[`&${componentCls}-variant-outlined`]: { [varName("bg-color-disabled")]: token.defaultBgDisabled },
				[`&${componentCls}-variant-solid`]: {
					[varName("text-color")]: token.solidTextColor,
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				},
				[`&${componentCls}-variant-filled, &${componentCls}-variant-text`]: {
					[varName("text-color-hover")]: varRef("text-color"),
					[varName("text-color-active")]: varRef("text-color")
				},
				[`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
					[varName("text-color")]: token.defaultColor,
					[varName("text-color-hover")]: token.defaultHoverColor,
					[varName("text-color-active")]: token.defaultActiveColor,
					[varName("bg-color-container")]: token.defaultBg,
					[varName("bg-color-hover")]: token.defaultHoverBg,
					[varName("bg-color-active")]: token.defaultActiveBg
				},
				[`&${componentCls}-variant-text`]: {
					[varName("text-color")]: token.textTextColor,
					[varName("text-color-hover")]: token.textTextHoverColor,
					[varName("text-color-active")]: token.textTextActiveColor,
					[varName("bg-color-hover")]: token.textHoverBg
				},
				[`&${componentCls}-background-ghost`]: { [`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
					[varName("text-color")]: token.defaultGhostColor,
					[varName("border-color")]: token.defaultGhostBorderColor
				} }
			}
		},
		PresetColors.map((colorKey) => {
			const darkColor = token[`${colorKey}6`];
			const lightColor = token[`${colorKey}1`];
			const hoverColor = token[`${colorKey}Hover`];
			const lightHoverColor = token[`${colorKey}2`];
			const lightActiveColor = token[`${colorKey}3`];
			const activeColor = token[`${colorKey}Active`];
			const shadowColor = token[`${colorKey}ShadowColor`];
			return { [`&${componentCls}-color-${colorKey}`]: {
				[varName("color-base")]: darkColor,
				[varName("color-hover")]: hoverColor,
				[varName("color-active")]: activeColor,
				[varName("color-light")]: lightColor,
				[varName("color-light-hover")]: lightHoverColor,
				[varName("color-light-active")]: lightActiveColor,
				[varName("shadow")]: shadowColor
			} };
		}),
		{ [`&:disabled, &${token.componentCls}-disabled`]: {
			cursor: "not-allowed",
			borderColor: token.colorBorderDisabled,
			background: varRef("bg-color-disabled"),
			color: token.colorTextDisabled,
			boxShadow: "none"
		} },
		{ [`&${componentCls}-background-ghost`]: {
			[varName("bg-color")]: token.ghostBg,
			[varName("bg-color-hover")]: token.ghostBg,
			[varName("bg-color-active")]: token.ghostBg,
			[varName("shadow")]: "none",
			[`&${componentCls}-variant-outlined, &${componentCls}-variant-dashed`]: {
				[varName("bg-color-hover")]: token.ghostBg,
				[varName("bg-color-active")]: token.ghostBg
			}
		} }
	] };
};
var variant_default = genVariantStyle;

//#endregion
export { variant_default as default };