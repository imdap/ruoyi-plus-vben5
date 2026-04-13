import { useGetRefContext } from "../../context.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import { classNames, clsx } from "@v-c/util";
import pickAttrs from "@v-c/util/dist/pickAttrs";
import { useLockFocus } from "@v-c/util/dist/Dom/focus";
import { useFocusBoundaryProvider } from "@v-c/util/dist/Dom/focusBoundary";
import { getStylePxValue } from "@v-c/util/dist/props-util";
var Panel_default = /* @__PURE__ */ defineComponent((props, { expose, slots }) => {
	const { setPanel } = useGetRefContext();
	const internalRef = shallowRef();
	const mergeRefFun = (el) => {
		internalRef.value = el;
		setPanel?.(el);
		props?.holderRef?.(el);
	};
	const [, registerAllowedElement] = useLockFocus(computed(() => !!props.visible && !!props.isFixedPos && props.focusTrap !== false), () => internalRef.value);
	useFocusBoundaryProvider({ registerAllowedElement });
	expose({ focus: () => {
		internalRef.value?.focus?.({ preventScroll: true });
	} });
	return () => {
		const { width, height, footer, prefixCls, classNames: modalClassNames, styles: modalStyles, title, closable, closeIcon, bodyProps, bodyStyle, ariaId, style, className, forceRender, onClose, onMouseDown, onMouseUp, modalRender, animationVisible } = props;
		const contentStyle = {};
		if (width !== void 0) contentStyle.width = getStylePxValue(width);
		if (height !== void 0) contentStyle.height = getStylePxValue(height);
		const footerNode = footer ? createVNode("div", {
			"class": classNames(`${prefixCls}-footer`, modalClassNames?.footer),
			"style": { ...modalStyles?.footer }
		}, [footer]) : null;
		const headerNode = title ? createVNode("div", {
			"class": classNames(`${prefixCls}-header`, modalClassNames?.header),
			"style": { ...modalStyles?.header }
		}, [createVNode("div", {
			"class": clsx(`${prefixCls}-title`, modalClassNames?.title),
			"id": ariaId,
			"style": { ...modalStyles?.title }
		}, [title])]) : null;
		const closableFun = () => {
			if (typeof closable === "object" && closable !== null) return closable;
			if (closable) return { closeIcon: closeIcon ?? createVNode("span", { "class": `${prefixCls}-close-x` }, null) };
			return {};
		};
		const closableObj = closableFun();
		const ariaProps = pickAttrs(closableObj, true);
		const closeBtnIsDisabled = typeof closable === "object" && closable?.disabled;
		const closerNode = closable ? createVNode("button", mergeProps({
			"type": "button",
			"onClick": onClose,
			"aria-label": "Close"
		}, ariaProps, {
			"class": classNames(`${prefixCls}-close`, modalClassNames?.close),
			"style": modalStyles?.close,
			"disabled": closeBtnIsDisabled
		}), [closableObj.closeIcon]) : null;
		const content = createVNode("div", {
			"class": classNames(`${prefixCls}-container`, modalClassNames?.container),
			"style": modalStyles?.container
		}, [
			closerNode,
			headerNode,
			createVNode("div", mergeProps({
				"class": classNames(`${prefixCls}-body`, modalClassNames?.body),
				"style": {
					...bodyStyle,
					...modalStyles?.body
				}
			}, bodyProps), [slots?.default?.()]),
			footerNode
		]);
		const renderContent = () => {
			if (!animationVisible && forceRender) return null;
			return modalRender ? modalRender(content) : content;
		};
		return createVNode("div", mergeProps({
			"key": "dialog-element",
			"role": "dialog"
		}, { "aria-labelledby": title ? ariaId : null }, {
			"aria-modal": "true",
			"ref": mergeRefFun,
			"style": {
				...style,
				...contentStyle
			},
			"class": [prefixCls, className],
			"onMousedown": onMouseDown,
			"onMouseup": onMouseUp,
			"tabindex": -1
		}), [renderContent()]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		ariaId: {
			type: String,
			required: false,
			default: void 0
		},
		onMouseDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseUp: {
			type: Function,
			required: false,
			default: void 0
		},
		holderRef: {
			type: Function,
			required: false,
			default: void 0
		},
		isFixedPos: {
			type: Boolean,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		rootStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		mask: {
			type: Boolean,
			required: false,
			default: void 0
		},
		children: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		afterClose: {
			type: Function,
			required: false,
			default: void 0
		},
		afterOpenChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onClose: {
			type: Function,
			required: false,
			default: void 0
		},
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		maskClosable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		visible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mousePosition: {
			type: [Object, null],
			required: false,
			default: void 0
		},
		title: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		footer: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		transitionName: {
			type: String,
			required: false,
			default: void 0
		},
		maskTransitionName: {
			type: String,
			required: false,
			default: void 0
		},
		animation: {
			required: false,
			default: void 0
		},
		maskAnimation: {
			required: false,
			default: void 0
		},
		wrapStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		bodyStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		maskStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		wrapClassName: {
			type: String,
			required: false,
			default: void 0
		},
		width: {
			type: [String, Number],
			required: false,
			default: void 0
		},
		height: {
			type: [String, Number],
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false,
			default: void 0
		},
		bodyProps: {
			required: false,
			default: void 0
		},
		maskProps: {
			required: false,
			default: void 0
		},
		rootClassName: {
			type: String,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		wrapProps: {
			required: false,
			default: void 0
		},
		getContainer: {
			type: [
				String,
				Function,
				Boolean
			],
			required: false,
			skipCheck: true,
			default: void 0
		},
		closeIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		modalRender: {
			type: Function,
			required: false,
			default: void 0
		},
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focusTriggerAfterClose: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focusTrap: {
			type: Boolean,
			required: false,
			default: void 0
		},
		panelRef: {
			required: false,
			default: void 0
		},
		animationVisible: {
			type: Boolean,
			required: true,
			default: void 0
		}
	},
	name: "Panel",
	inheritAttrs: false
});
export { Panel_default as default };
