import { offset } from "../../util.js";
import Panel_default from "./Panel.js";
import { Transition, createVNode, defineComponent, mergeProps, nextTick, shallowRef, vShow, watch, withDirectives } from "vue";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";
var Content_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const dialogRef = shallowRef();
	const transformOrigin = shallowRef("");
	function onPrepare() {
		const { mousePosition } = props;
		nextTick(() => {
			if (dialogRef.value) {
				const elementOffset = offset(dialogRef.value);
				transformOrigin.value = mousePosition && (mousePosition.x || mousePosition.y) ? `${mousePosition.x - elementOffset.left}px ${mousePosition.y - elementOffset.top}px` : "";
			}
		});
	}
	const animationVisible = shallowRef(props.visible);
	watch(() => props.visible, () => {
		if (props.visible) animationVisible.value = true;
	});
	return () => {
		const { prefixCls, className, style, visible, destroyOnHidden, onVisibleChanged, ariaId, title, motionName } = props;
		const contentStyle = {};
		if (transformOrigin.value) contentStyle.transformOrigin = transformOrigin.value;
		return createVNode(Transition, mergeProps(getTransitionProps(motionName), {
			"onBeforeEnter": onPrepare,
			"onAfterEnter": () => onVisibleChanged?.(true),
			"onAfterLeave": () => {
				onVisibleChanged?.(false);
				animationVisible.value = false;
			}
		}), { default: () => [visible || !destroyOnHidden ? withDirectives(createVNode(Panel_default, mergeProps(props, {
			"animationVisible": animationVisible.value,
			"title": title,
			"ariaId": ariaId,
			"prefixCls": prefixCls,
			"style": {
				...style,
				...contentStyle
			},
			"class": [className],
			"holderRef": (el) => {
				dialogRef.value = el;
			}
		}), slots), [[vShow, visible]]) : null] });
	};
}, {
	props: {
		motionName: {
			type: String,
			required: false,
			default: void 0
		},
		ariaId: {
			type: String,
			required: false,
			default: void 0
		},
		onVisibleChanged: {
			type: Function,
			required: true,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: true,
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
		}
	},
	name: "Content"
});
export { Content_default as default };
