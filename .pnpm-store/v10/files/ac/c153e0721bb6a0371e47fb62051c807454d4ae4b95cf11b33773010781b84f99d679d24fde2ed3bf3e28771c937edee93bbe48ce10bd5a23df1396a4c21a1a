import { resetComponent } from "../../style/index.js";
import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { Keyframes } from "@antdv-next/cssinjs";

//#region src/spin/style/index.ts
const antSpinMove = new Keyframes("antSpinMove", { to: { opacity: 1 } });
const antRotate = new Keyframes("antRotate", { to: { transform: "rotate(405deg)" } });
const genSpinStyle = (token) => {
	const { componentCls } = token;
	const sectionCls = `${componentCls}-section`;
	return { [componentCls]: {
		...resetComponent(token),
		position: "relative",
		"&-rtl": { direction: "rtl" },
		[`&${sectionCls}, ${sectionCls}`]: {
			display: "flex",
			alignItems: "center",
			flexDirection: "column",
			gap: token.paddingSM,
			color: token.colorPrimary
		},
		[`&${sectionCls}`]: { display: "inline-flex" },
		[sectionCls]: {
			position: "absolute",
			top: "50%",
			left: {
				_skip_check_: true,
				value: "50%"
			},
			transform: "translate(-50%, -50%)",
			zIndex: 1
		},
		[`${componentCls}-description`]: {
			fontSize: token.fontSize,
			lineHeight: 1
		},
		[`${componentCls}-container`]: {
			position: "relative",
			transition: `opacity ${token.motionDurationSlow}`,
			"&::after": {
				position: "absolute",
				top: 0,
				insetInlineEnd: 0,
				bottom: 0,
				insetInlineStart: 0,
				zIndex: 10,
				width: "100%",
				height: "100%",
				background: token.colorBgContainer,
				opacity: 0,
				transition: `all ${token.motionDurationSlow}`,
				content: "\"\"",
				pointerEvents: "none"
			}
		},
		"&-spinning": {
			[`${componentCls}-description`]: { textShadow: `0 0px 5px ${token.colorBgContainer}` },
			[`${componentCls}-container`]: {
				clear: "both",
				opacity: .5,
				userSelect: "none",
				pointerEvents: "none",
				"&::after": {
					opacity: .4,
					pointerEvents: "auto"
				}
			}
		},
		"&-fullscreen": {
			position: "fixed",
			inset: 0,
			backgroundColor: token.colorBgMask,
			zIndex: token.zIndexPopupBase,
			opacity: 0,
			pointerEvents: "none",
			transition: `all ${token.motionDurationMid}`,
			[`&${componentCls}-spinning`]: {
				opacity: 1,
				pointerEvents: "auto"
			},
			[sectionCls]: {
				color: token.colorWhite,
				[`${componentCls}-description`]: { color: token.colorTextLightSolid }
			}
		}
	} };
};
const genIndicatorStyle = (token) => {
	const { componentCls, antCls, motionDurationSlow } = token;
	const [varName, varRef] = genCssVar(antCls, "spin");
	return { [componentCls]: {
		[varName("dot-holder-size")]: token.dotSize,
		[varName("dot-item-size")]: `calc((${varRef("dot-holder-size")} - ${token.marginXXS} / 2) / 2)`,
		[`${componentCls}-dot`]: {
			"&-holder": {
				width: "1em",
				height: "1em",
				fontSize: varRef("dot-holder-size"),
				display: "inline-block",
				transition: ["transform", "opacity"].map((prop) => `${prop} ${motionDurationSlow} ease`).join(", "),
				transformOrigin: "50% 50%",
				lineHeight: 1,
				"&-hidden": {
					transform: "scale(0.3)",
					opacity: 0
				}
			},
			position: "relative",
			display: "inline-block",
			fontSize: varRef("dot-holder-size"),
			width: "1em",
			height: "1em",
			"&-spin": {
				transform: "rotate(45deg)",
				animationName: antRotate,
				animationDuration: "1.2s",
				animationIterationCount: "infinite",
				animationTimingFunction: "linear"
			},
			"&-item": {
				position: "absolute",
				display: "block",
				width: varRef("dot-item-size"),
				height: varRef("dot-item-size"),
				background: "currentColor",
				borderRadius: "100%",
				transform: "scale(0.75)",
				transformOrigin: "50% 50%",
				opacity: .3,
				animationName: antSpinMove,
				animationDuration: "1s",
				animationIterationCount: "infinite",
				animationTimingFunction: "linear",
				animationDirection: "alternate",
				"&:nth-child(1)": {
					top: 0,
					insetInlineStart: 0,
					animationDelay: "0s"
				},
				"&:nth-child(2)": {
					top: 0,
					insetInlineEnd: 0,
					animationDelay: "0.4s"
				},
				"&:nth-child(3)": {
					insetInlineEnd: 0,
					bottom: 0,
					animationDelay: "0.8s"
				},
				"&:nth-child(4)": {
					bottom: 0,
					insetInlineStart: 0,
					animationDelay: "1.2s"
				}
			},
			"&-progress": {
				position: "absolute",
				left: "50%",
				top: 0,
				transform: "translateX(-50%)"
			},
			"&-circle": {
				strokeLinecap: "round",
				transition: [
					"stroke-dashoffset",
					"stroke-dasharray",
					"stroke",
					"stroke-width",
					"opacity"
				].map((item) => `${item} ${motionDurationSlow} ease`).join(","),
				fillOpacity: 0,
				stroke: "currentcolor"
			},
			"&-circle-bg": { stroke: token.colorFillSecondary }
		}
	} };
};
const genSizeStyle = (token) => {
	const { componentCls } = token;
	const [varName] = genCssVar(token.antCls, "spin");
	return { [componentCls]: {
		"&-sm": { [varName("dot-holder-size")]: token.dotSizeSM },
		"&-lg": { [varName("dot-holder-size")]: token.dotSizeLG }
	} };
};
const prepareComponentToken = (token) => {
	const { controlHeightLG, controlHeight } = token;
	return {
		contentHeight: 400,
		dotSize: controlHeightLG / 2,
		dotSizeSM: controlHeightLG * .35,
		dotSizeLG: controlHeight
	};
};
var style_default = genStyleHooks("Spin", (token) => {
	const spinToken = mergeToken(token, { spinDotDefault: token.colorTextDescription });
	return [
		genSpinStyle(spinToken),
		genIndicatorStyle(spinToken),
		genSizeStyle(spinToken)
	];
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };