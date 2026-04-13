import { genFocusOutline, resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { genNoMotionStyle } from "../../style/motion/util.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/checkbox/style/index.ts
const genCheckboxStyle = (token) => {
	const { checkboxCls, checkboxSize, lineWidth } = token;
	const wrapperCls = `${checkboxCls}-wrapper`;
	return [
		{
			[`${checkboxCls}-group`]: {
				...resetComponent(token),
				display: "inline-flex",
				flexWrap: "wrap",
				columnGap: token.marginXS,
				[`> ${token.antCls}-row`]: { flex: 1 }
			},
			[wrapperCls]: {
				...resetComponent(token),
				display: "inline-flex",
				alignItems: "baseline",
				cursor: "pointer",
				"&:after": {
					display: "inline-block",
					width: 0,
					overflow: "hidden",
					content: "'\\a0'"
				},
				[`& + ${wrapperCls}`]: { marginInlineStart: 0 },
				[`&${wrapperCls}-in-form-item`]: { "input[type=\"checkbox\"]": {
					width: 14,
					height: 14
				} }
			},
			[checkboxCls]: {
				...resetComponent(token),
				position: "relative",
				whiteSpace: "nowrap",
				lineHeight: 1,
				cursor: "pointer",
				alignSelf: "center",
				boxSizing: "border-box",
				display: "block",
				flex: "none",
				width: checkboxSize,
				height: checkboxSize,
				direction: "ltr",
				backgroundColor: token.colorBgContainer,
				border: `${unit(lineWidth)} ${token.lineType} ${token.colorBorder}`,
				borderRadius: token.borderRadiusSM,
				borderCollapse: "separate",
				transition: `all ${token.motionDurationSlow}`,
				...genNoMotionStyle(),
				"&:after": {
					boxSizing: "border-box",
					position: "absolute",
					top: `calc(${checkboxSize} / 2 - ${lineWidth})`,
					insetInlineStart: `calc(${checkboxSize} / 4 - ${lineWidth})`,
					display: "table",
					width: token.calc(checkboxSize).div(14).mul(5).equal(),
					height: token.calc(checkboxSize).div(14).mul(8).equal(),
					border: `${unit(token.lineWidthBold)} solid ${token.colorWhite}`,
					borderTop: 0,
					borderInlineStart: 0,
					transform: "rotate(45deg) scale(0) translate(-50%,-50%)",
					opacity: 0,
					content: "\"\"",
					transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`,
					...genNoMotionStyle()
				},
				[`${checkboxCls}-input`]: {
					position: "absolute",
					inset: `calc(-1 * (${lineWidth}))`,
					zIndex: 1,
					cursor: "pointer",
					opacity: 0,
					margin: 0
				},
				[`&:has(${checkboxCls}-input:focus-visible)`]: genFocusOutline(token),
				"& + span": {
					paddingInlineStart: token.paddingXS,
					paddingInlineEnd: token.paddingXS
				}
			}
		},
		{
			[`
        ${wrapperCls}:not(${wrapperCls}-disabled),
        ${checkboxCls}:not(${checkboxCls}-disabled)
      `]: { [`&:hover ${checkboxCls}`]: { borderColor: token.colorPrimary } },
			[`${wrapperCls}:not(${wrapperCls}-disabled)`]: { [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled)`]: {
				backgroundColor: token.colorPrimaryHover,
				borderColor: "transparent"
			} }
		},
		{ [`${checkboxCls}-checked`]: {
			backgroundColor: token.colorPrimary,
			borderColor: token.colorPrimary,
			"&:after": {
				opacity: 1,
				transform: "rotate(45deg) scale(1) translate(-50%,-50%)",
				transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`,
				...genNoMotionStyle()
			},
			[`&:not(${checkboxCls}-disabled):hover`]: {
				backgroundColor: token.colorPrimaryHover,
				borderColor: "transparent"
			}
		} },
		{ [checkboxCls]: { "&-indeterminate": {
			backgroundColor: token.colorBgContainer,
			borderColor: token.colorBorder,
			"&:after": {
				top: "50%",
				insetInlineStart: "50%",
				width: token.calc(token.fontSizeLG).div(2).equal(),
				height: token.calc(token.fontSizeLG).div(2).equal(),
				backgroundColor: token.colorPrimary,
				border: 0,
				transform: "translate(-50%, -50%) scale(1)",
				opacity: 1,
				content: "\"\""
			},
			"&:hover": {
				backgroundColor: token.colorBgContainer,
				borderColor: token.colorPrimary
			}
		} } },
		{
			[`${wrapperCls}-disabled`]: { cursor: "not-allowed" },
			[`${checkboxCls}-disabled`]: {
				[`&, ${checkboxCls}-input`]: {
					cursor: "not-allowed",
					pointerEvents: "none"
				},
				background: token.colorBgContainerDisabled,
				borderColor: token.colorBorder,
				"&:after": { borderColor: token.colorTextDisabled },
				"& + span": { color: token.colorTextDisabled },
				[`&${checkboxCls}-indeterminate::after`]: { background: token.colorTextDisabled }
			}
		}
	];
};
function getStyle(prefixCls, token) {
	return genCheckboxStyle(mergeToken(token, {
		checkboxCls: `.${prefixCls}`,
		checkboxSize: token.controlInteractiveSize
	}));
}
var style_default = genStyleHooks("Checkbox", (token, { prefixCls }) => [getStyle(prefixCls, token)]);

//#endregion
export { style_default as default, genCheckboxStyle, getStyle };