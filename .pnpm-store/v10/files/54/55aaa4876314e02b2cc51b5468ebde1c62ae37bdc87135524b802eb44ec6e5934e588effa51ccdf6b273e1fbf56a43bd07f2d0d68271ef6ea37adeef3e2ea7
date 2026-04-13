import { resetComponent } from "../../style/index.js";
import { genCssVar, genStyleHooks } from "../../theme/util/genStyleUtils.js";

//#region src/splitter/style/index.ts
const centerStyle = {
	position: "absolute",
	top: "50%",
	left: {
		_skip_check_: true,
		value: "50%"
	},
	transform: "translate(-50%, -50%)"
};
const genSplitterStyle = (token) => {
	const { componentCls, colorFill, splitBarDraggableSize, splitBarSize, splitTriggerSize, controlItemBgHover, controlItemBgActive, controlItemBgActiveHover, colorPrimary, antCls, calc } = token;
	const [, varRef] = genCssVar(antCls, "splitter");
	const splitBarCls = `${componentCls}-bar`;
	const splitMaskCls = `${componentCls}-mask`;
	const splitPanelCls = `${componentCls}-panel`;
	const halfTriggerSize = calc(splitTriggerSize).div(2).equal();
	const splitterBarPreviewStyle = {
		position: "absolute",
		background: token.colorPrimary,
		opacity: .2,
		pointerEvents: "none",
		transition: "none",
		zIndex: 1,
		display: "none"
	};
	return { [componentCls]: {
		...resetComponent(token),
		display: "flex",
		width: "100%",
		height: "100%",
		alignItems: "stretch",
		[`> ${splitBarCls}`]: {
			flex: "none",
			position: "relative",
			userSelect: "none",
			[`${splitBarCls}-dragger`]: {
				...centerStyle,
				zIndex: 1,
				"&::before": {
					content: "\"\"",
					background: controlItemBgHover,
					...centerStyle
				},
				"&::after": {
					content: "\"\"",
					background: colorFill,
					...centerStyle
				},
				[`&:hover:not(${splitBarCls}-dragger-active)`]: { "&::before": { background: controlItemBgActive } },
				"&-active": {
					zIndex: 2,
					"&::before": { background: controlItemBgActiveHover }
				},
				[`&-active${splitBarCls}-dragger-customize`]: { [`${splitBarCls}-dragger-icon`]: { color: colorPrimary } },
				[`&-disabled${splitBarCls}-dragger`]: {
					zIndex: 0,
					"&, &:hover, &-active": {
						cursor: "default",
						"&::before": { background: controlItemBgHover }
					},
					"&::after": { display: "none" },
					[`${splitBarCls}-dragger-icon`]: { display: "none" }
				},
				"&-customize": {
					[`${splitBarCls}-dragger-icon`]: {
						...centerStyle,
						display: "flex",
						alignItems: "center",
						color: colorFill
					},
					"&::after": { display: "none" }
				}
			},
			[`${splitBarCls}-collapse-bar`]: {
				...centerStyle,
				zIndex: token.zIndexPopupBase,
				background: controlItemBgHover,
				fontSize: token.fontSizeSM,
				borderRadius: token.borderRadiusXS,
				color: token.colorText,
				cursor: "pointer",
				opacity: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				[`&:hover:not(${splitBarCls}-collapse-bar-customize)`]: { background: controlItemBgActive },
				[`&:active:not(${splitBarCls}-collapse-bar-customize)`]: { background: controlItemBgActiveHover },
				[`${splitBarCls}-collapse-icon`]: {
					display: "flex",
					alignItems: "center"
				}
			},
			[`${splitBarCls}-collapse-bar-customize`]: { background: "transparent" },
			"&:hover, &:active": { [`${splitBarCls}-collapse-bar-hover-only`]: { opacity: 1 } },
			[`${splitBarCls}-collapse-bar-hover-only`]: { "@media(hover:none)": { opacity: 1 } },
			[`${splitBarCls}-collapse-bar-always-hidden`]: { display: "none" },
			[`${splitBarCls}-collapse-bar-always-visible`]: { opacity: 1 }
		},
		[splitMaskCls]: {
			position: "fixed",
			zIndex: token.zIndexPopupBase,
			inset: 0,
			"&-horizontal": { cursor: "col-resize" },
			"&-vertical": { cursor: "row-resize" }
		},
		"&-horizontal": {
			flexDirection: "row",
			[`> ${splitBarCls}`]: {
				width: 0,
				[`${splitBarCls}-preview`]: {
					height: "100%",
					width: splitBarSize,
					...splitterBarPreviewStyle,
					[`&${splitBarCls}-preview-active`]: {
						display: "block",
						transform: `translate3d(${varRef("bar-preview-offset")}, 0, 0)`
					}
				},
				[`${splitBarCls}-dragger`]: {
					cursor: "col-resize",
					height: "100%",
					width: splitTriggerSize,
					"&::before": {
						height: "100%",
						width: splitBarSize
					},
					"&::after": {
						height: splitBarDraggableSize,
						width: splitBarSize
					}
				},
				[`${splitBarCls}-collapse-bar`]: {
					width: token.fontSizeSM,
					height: token.controlHeightSM,
					"&-start": {
						left: {
							_skip_check_: true,
							value: "auto"
						},
						right: {
							_skip_check_: true,
							value: halfTriggerSize
						},
						transform: "translateY(-50%)"
					},
					"&-end": {
						left: {
							_skip_check_: true,
							value: halfTriggerSize
						},
						right: {
							_skip_check_: true,
							value: "auto"
						},
						transform: "translateY(-50%)"
					}
				}
			}
		},
		"&-vertical": {
			flexDirection: "column",
			[`> ${splitBarCls}`]: {
				height: 0,
				[`${splitBarCls}-preview`]: {
					height: splitBarSize,
					width: "100%",
					...splitterBarPreviewStyle,
					[`&${splitBarCls}-preview-active`]: {
						display: "block",
						transform: `translate3d(0, ${varRef("bar-preview-offset")}, 0)`
					}
				},
				[`${splitBarCls}-dragger`]: {
					cursor: "row-resize",
					width: "100%",
					height: splitTriggerSize,
					"&::before": {
						width: "100%",
						height: splitBarSize
					},
					"&::after": {
						width: splitBarDraggableSize,
						height: splitBarSize
					}
				},
				[`${splitBarCls}-collapse-bar`]: {
					height: token.fontSizeSM,
					width: token.controlHeightSM,
					"&-start": {
						top: "auto",
						bottom: halfTriggerSize,
						transform: "translateX(-50%)"
					},
					"&-end": {
						top: halfTriggerSize,
						bottom: "auto",
						transform: "translateX(-50%)"
					}
				}
			}
		},
		[splitPanelCls]: {
			overflow: "auto",
			padding: "0 1px",
			scrollbarWidth: "thin",
			boxSizing: "border-box",
			"&-hidden": {
				padding: 0,
				overflow: "hidden"
			},
			[`&:has(${componentCls}:only-child)`]: { overflow: "hidden" }
		}
	} };
};
const prepareComponentToken = (token) => {
	const splitBarSize = token.splitBarSize || 2;
	const splitTriggerSize = token.splitTriggerSize || 6;
	const resizeSpinnerSize = token.resizeSpinnerSize || 20;
	return {
		splitBarSize,
		splitTriggerSize,
		splitBarDraggableSize: token.splitBarDraggableSize ?? resizeSpinnerSize,
		resizeSpinnerSize
	};
};
var style_default = genStyleHooks("Splitter", genSplitterStyle, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };