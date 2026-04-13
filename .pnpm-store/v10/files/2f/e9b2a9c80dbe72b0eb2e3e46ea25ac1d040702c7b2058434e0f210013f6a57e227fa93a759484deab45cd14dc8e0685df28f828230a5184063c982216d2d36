import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { initComponentToken, initInputToken } from "./token.js";

//#region src/input/style/textarea.ts
const genTextAreaStyle = (token) => {
	const { componentCls, paddingLG } = token;
	const textareaPrefixCls = `${componentCls}-textarea`;
	return {
		[`textarea${componentCls}`]: {
			maxWidth: "100%",
			height: "auto",
			minHeight: token.controlHeight,
			lineHeight: token.lineHeight,
			verticalAlign: "bottom",
			transition: `all ${token.motionDurationSlow}`,
			resize: "vertical",
			[`&${componentCls}-mouse-active`]: { transition: `all ${token.motionDurationSlow}, height 0s, width 0s` }
		},
		[`${componentCls}-textarea-affix-wrapper-resize-dirty`]: { width: "auto" },
		[textareaPrefixCls]: {
			position: "relative",
			"&-show-count": { [`${componentCls}-data-count`]: {
				position: "absolute",
				bottom: token.calc(token.fontSize).mul(token.lineHeight).mul(-1).equal(),
				insetInlineEnd: 0,
				color: token.colorTextDescription,
				whiteSpace: "nowrap",
				pointerEvents: "none"
			} },
			[`
        &-allow-clear > ${componentCls},
        &-affix-wrapper${textareaPrefixCls}-has-feedback ${componentCls}
      `]: { paddingInlineEnd: paddingLG },
			[`&-affix-wrapper${componentCls}-affix-wrapper`]: {
				padding: 0,
				[`> textarea${componentCls}`]: {
					fontSize: "inherit",
					border: "none",
					outline: "none",
					background: "transparent",
					minHeight: token.calc(token.controlHeight).sub(token.calc(token.lineWidth).mul(2)).equal(),
					"&:focus": { boxShadow: "none !important" }
				},
				[`${componentCls}-suffix`]: {
					margin: 0,
					"> *:not(:last-child)": { marginInline: 0 },
					[`${componentCls}-clear-icon`]: {
						position: "absolute",
						insetInlineEnd: token.paddingInline,
						insetBlockStart: token.paddingXS
					},
					[`${textareaPrefixCls}-suffix`]: {
						position: "absolute",
						top: 0,
						insetInlineEnd: token.paddingInline,
						bottom: 0,
						zIndex: 1,
						display: "inline-flex",
						alignItems: "center",
						margin: "auto",
						pointerEvents: "none"
					}
				}
			},
			[`&-affix-wrapper${componentCls}-affix-wrapper-rtl`]: { [`${componentCls}-suffix`]: { [`${componentCls}-data-count`]: {
				direction: "ltr",
				insetInlineStart: 0
			} } },
			[`&-affix-wrapper${componentCls}-affix-wrapper-sm`]: { [`${componentCls}-suffix`]: { [`${componentCls}-clear-icon`]: { insetInlineEnd: token.paddingInlineSM } } }
		}
	};
};
var textarea_default = genStyleHooks(["Input", "TextArea"], (token) => {
	return genTextAreaStyle(mergeToken(token, initInputToken(token)));
}, initComponentToken, { resetFont: false });

//#endregion
export { textarea_default as default, initComponentToken, initInputToken };