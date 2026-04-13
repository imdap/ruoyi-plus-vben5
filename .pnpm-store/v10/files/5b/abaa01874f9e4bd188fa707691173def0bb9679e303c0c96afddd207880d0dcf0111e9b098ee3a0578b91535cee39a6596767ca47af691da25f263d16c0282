import { resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { CONTAINER_MAX_OFFSET } from "../../_util/hooks/useZIndex.js";
import { Keyframes } from "@antdv-next/cssinjs";

//#region src/message/style/index.ts
const genMessageStyle = (token) => {
	const { componentCls, iconCls, boxShadow, colorText, colorSuccess, colorError, colorWarning, colorInfo, fontSizeLG, motionEaseInOutCirc, motionDurationSlow, marginXS, paddingXS, borderRadiusLG, zIndexPopup, contentPadding, contentBg } = token;
	const noticeCls = `${componentCls}-notice`;
	const messageMoveIn = new Keyframes("MessageMoveIn", {
		"0%": {
			padding: 0,
			transform: "translateY(-100%)",
			opacity: 0
		},
		"100%": {
			padding: paddingXS,
			transform: "translateY(0)",
			opacity: 1
		}
	});
	const messageMoveOut = new Keyframes("MessageMoveOut", {
		"0%": {
			maxHeight: token.height,
			padding: paddingXS,
			opacity: 1
		},
		"100%": {
			maxHeight: 0,
			padding: 0,
			opacity: 0
		}
	});
	const noticeStyle = {
		padding: paddingXS,
		textAlign: "center",
		[`${componentCls}-custom-content`]: {
			display: "flex",
			alignItems: "center"
		},
		[`${componentCls}-custom-content > ${iconCls}`]: {
			marginInlineEnd: marginXS,
			fontSize: fontSizeLG
		},
		[`${noticeCls}-content`]: {
			display: "inline-block",
			padding: contentPadding,
			background: contentBg,
			borderRadius: borderRadiusLG,
			boxShadow,
			pointerEvents: "all"
		},
		[`${componentCls}-success > ${iconCls}`]: { color: colorSuccess },
		[`${componentCls}-error > ${iconCls}`]: { color: colorError },
		[`${componentCls}-warning > ${iconCls}`]: { color: colorWarning },
		[`${componentCls}-info > ${iconCls},
      ${componentCls}-loading > ${iconCls}`]: { color: colorInfo }
	};
	return [
		{ [componentCls]: {
			...resetComponent(token),
			color: colorText,
			position: "fixed",
			top: marginXS,
			width: "100%",
			pointerEvents: "none",
			zIndex: zIndexPopup,
			[`${componentCls}-move-up`]: { animationFillMode: "forwards" },
			[`
        ${componentCls}-move-up-appear,
        ${componentCls}-move-up-enter
      `]: {
				animationName: messageMoveIn,
				animationDuration: motionDurationSlow,
				animationPlayState: "paused",
				animationTimingFunction: motionEaseInOutCirc
			},
			[`
        ${componentCls}-move-up-appear${componentCls}-move-up-appear-active,
        ${componentCls}-move-up-enter${componentCls}-move-up-enter-active
      `]: { animationPlayState: "running" },
			[`${componentCls}-move-up-leave`]: {
				animationName: messageMoveOut,
				animationDuration: motionDurationSlow,
				animationPlayState: "paused",
				animationTimingFunction: motionEaseInOutCirc
			},
			[`${componentCls}-move-up-leave${componentCls}-move-up-leave-active`]: { animationPlayState: "running" },
			"&-rtl": {
				direction: "rtl",
				span: { direction: "rtl" }
			}
		} },
		{ [componentCls]: { [`${noticeCls}-wrapper`]: { ...noticeStyle } } },
		{ [`${componentCls}-notice-pure-panel`]: {
			...noticeStyle,
			padding: 0,
			textAlign: "start"
		} }
	];
};
const prepareComponentToken = (token) => ({
	zIndexPopup: token.zIndexPopupBase + CONTAINER_MAX_OFFSET + 10,
	contentBg: token.colorBgElevated,
	contentPadding: `${(token.controlHeightLG - token.fontSize * token.lineHeight) / 2}px ${token.paddingSM}px`
});
var style_default = genStyleHooks("Message", (token) => {
	return genMessageStyle(mergeToken(token, { height: 150 }));
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };