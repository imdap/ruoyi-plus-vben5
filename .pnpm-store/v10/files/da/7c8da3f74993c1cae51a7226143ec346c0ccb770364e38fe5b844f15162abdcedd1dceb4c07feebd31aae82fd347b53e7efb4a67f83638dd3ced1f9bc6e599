import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { DEPRECATED_TOKENS, prepareComponentToken } from "./index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/layout/style/sider.ts
const genSiderStyle = (token) => {
	const { componentCls, siderBg, motionDurationMid, motionDurationSlow, antCls, triggerHeight, triggerColor, triggerBg, headerHeight, zeroTriggerWidth, zeroTriggerHeight, borderRadiusLG, lightSiderBg, lightTriggerColor, lightTriggerBg, bodyBg } = token;
	return { [componentCls]: {
		position: "relative",
		minWidth: 0,
		background: siderBg,
		transition: `all ${motionDurationMid}, background 0s`,
		"&-has-trigger": { paddingBottom: triggerHeight },
		"&-right": { order: 1 },
		[`${componentCls}-children`]: {
			height: "100%",
			marginTop: -.1,
			paddingTop: .1,
			[`${antCls}-menu${antCls}-menu-inline-collapsed`]: { width: "auto" }
		},
		[`&-zero-width ${componentCls}-children`]: { overflow: "hidden" },
		[`${componentCls}-trigger`]: {
			position: "fixed",
			bottom: 0,
			zIndex: 1,
			height: triggerHeight,
			color: triggerColor,
			lineHeight: unit(triggerHeight),
			textAlign: "center",
			background: triggerBg,
			cursor: "pointer",
			transition: `all ${motionDurationMid}`
		},
		[`${componentCls}-zero-width-trigger`]: {
			position: "absolute",
			top: headerHeight,
			insetInlineEnd: token.calc(zeroTriggerWidth).mul(-1).equal(),
			zIndex: 1,
			width: zeroTriggerWidth,
			height: zeroTriggerHeight,
			color: triggerColor,
			fontSize: token.fontSizeXL,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background: siderBg,
			borderRadius: `0 ${unit(borderRadiusLG)} ${unit(borderRadiusLG)} 0`,
			cursor: "pointer",
			transition: `background-color ${motionDurationSlow} ease`,
			"&::after": {
				position: "absolute",
				inset: 0,
				background: "transparent",
				transition: `all ${motionDurationSlow}`,
				content: "\"\""
			},
			"&:hover::after": { background: `rgba(255, 255, 255, 0.2)` },
			"&-right": {
				insetInlineStart: token.calc(zeroTriggerWidth).mul(-1).equal(),
				borderRadius: `${unit(borderRadiusLG)} 0 0 ${unit(borderRadiusLG)}`
			}
		},
		"&-light": {
			background: lightSiderBg,
			[`${componentCls}-trigger`]: {
				color: lightTriggerColor,
				background: lightTriggerBg
			},
			[`${componentCls}-zero-width-trigger`]: {
				color: lightTriggerColor,
				background: lightTriggerBg,
				border: `1px solid ${bodyBg}`,
				borderInlineStart: 0
			}
		}
	} };
};
var sider_default = genStyleHooks(["Layout", "Sider"], genSiderStyle, prepareComponentToken, { deprecatedTokens: DEPRECATED_TOKENS });

//#endregion
export { sider_default as default };