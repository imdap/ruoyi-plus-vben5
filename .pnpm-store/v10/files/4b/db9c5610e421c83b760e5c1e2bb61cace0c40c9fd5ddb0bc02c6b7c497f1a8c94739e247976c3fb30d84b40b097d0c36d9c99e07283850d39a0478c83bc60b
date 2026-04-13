import { useComponentBaseConfig } from "../config-provider/context.js";
import { pureAttrs, useMergeSemanticNoRef } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropFn, getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import style_default from "./style/index.js";
import { Transition, computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef } from "vue";
import { classNames, clsx } from "@v-c/util";
import { filterEmpty, getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { CheckCircleFilled, CloseCircleFilled, CloseOutlined, ExclamationCircleFilled, InfoCircleFilled } from "@antdv-next/icons";

//#region src/alert/Alert.tsx
const alertDefaultProps = { showIcon: void 0 };
const IconNode = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	return () => {
		const { type } = props;
		const successIcon = getSlotPropsFnRun({}, props, "successIcon");
		const icon = getSlotPropsFnRun({}, props, "icon");
		const infoIcon = getSlotPropsFnRun({}, props, "infoIcon");
		const warningIcon = getSlotPropsFnRun({}, props, "warningIcon");
		const errorIcon = getSlotPropsFnRun({}, props, "errorIcon");
		const { className, style } = getAttrStyleAndClass(attrs);
		const iconMapFilled = {
			success: successIcon ?? createVNode(CheckCircleFilled, null, null),
			info: infoIcon ?? createVNode(InfoCircleFilled, null, null),
			error: errorIcon ?? createVNode(CloseCircleFilled, null, null),
			warning: warningIcon ?? createVNode(ExclamationCircleFilled, null, null)
		};
		return createVNode("span", {
			"class": clsx(`${props.prefixCls}-icon`, className),
			"style": style
		}, [icon ?? iconMapFilled[type]]);
	};
}, { props: {
	type: {
		type: String,
		required: true
	},
	icon: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	},
	prefixCls: {
		type: String,
		required: true
	},
	description: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: true
	},
	successIcon: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	},
	infoIcon: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	},
	warningIcon: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	},
	errorIcon: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	}
} });
const CloseIconNode = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	return () => {
		const { isClosable, prefixCls, handleClose, ariaProps } = props;
		const { className, style } = getAttrStyleAndClass(attrs);
		const closeIcon = getSlotPropsFnRun(slots, props, "closeIcon");
		const mergedCloseIcon = !closeIcon ? createVNode(CloseOutlined, null, null) : closeIcon;
		return isClosable ? createVNode("button", mergeProps({
			"type": "button",
			"onClick": handleClose,
			"class": clsx(`${prefixCls}-close-icon`, className),
			"tabindex": 0,
			"style": style
		}, ariaProps), [mergedCloseIcon]) : null;
	};
}, { props: {
	isClosable: {
		type: Boolean,
		required: true
	},
	prefixCls: {
		type: String,
		required: true
	},
	closeIcon: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: true
	},
	handleClose: {
		type: Function,
		required: true
	},
	ariaProps: {
		type: Object,
		required: true
	}
} });
const Alert = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs }) => {
	const { closable: contextClosable, closeIcon: contextCloseIcon, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, direction, prefixCls, successIcon, errorIcon, infoIcon, warningIcon } = useComponentBaseConfig("alert", props, [
		"closable",
		"closeIcon",
		"successIcon",
		"errorIcon",
		"infoIcon",
		"warningIcon"
	]);
	const { classes, styles } = toPropsRefs$1(props, "classes", "styles");
	const closed = shallowRef(false);
	const internalRef = shallowRef();
	const [hashId, cssVarCls] = style_default(prefixCls);
	const handleClose = (e) => {
		closed.value = true;
		emit("close", e);
	};
	const type = computed(() => {
		if (props.type) return props.type;
		return props?.banner ? "warning" : "info";
	});
	const handleBeforeLeave = (el) => {
		if (el) {
			const _el = el;
			_el.style.maxHeight = `${_el.offsetHeight}px`;
		}
	};
	return () => {
		const { closable, banner, showIcon, rootClass } = props;
		const { className, style } = getAttrStyleAndClass(attrs);
		const isClosableFn = () => {
			const closeIcon = getSlotPropsFnRun(slots, props, "closeIcon");
			if (typeof closable === "object" && closable.closeIcon) return true;
			if (typeof closable === "boolean") return closable;
			const closeIconNode = typeof closeIcon === "function" ? filterEmpty(closeIcon()) : closeIcon;
			if (Array.isArray(closeIconNode) && closeIconNode.length > 0) return true;
			if (closeIconNode) return true;
			if (closeIcon !== false && closeIcon !== null && closeIcon !== void 0) return true;
			return !!contextClosable.value;
		};
		const isClosable = isClosableFn();
		let message = getSlotPropsFnRun(slots, props, "message");
		const title = getSlotPropsFnRun(slots, props, "title");
		if (title) message = title;
		const description = getSlotPropsFnRun(slots, props, "description");
		const action = getSlotPropsFnRun(slots, props, "action");
		const isShowIcon = banner && showIcon === void 0 ? true : showIcon;
		const mergedProps = {
			...props,
			prefixCls: prefixCls.value,
			type: type.value,
			showIcon: isShowIcon,
			closable: isClosable
		};
		const [mergedClassNames, mergedStyles] = useMergeSemanticNoRef([contextClassNames.value, classes.value], [contextStyles.value, styles.value], { props: mergedProps });
		const alertCls = classNames(prefixCls.value, `${prefixCls.value}-${type.value}`, {
			[`${prefixCls.value}-with-description`]: !!description,
			[`${prefixCls.value}-no-icon`]: !isShowIcon,
			[`${prefixCls.value}-banner`]: !!banner,
			[`${prefixCls.value}-rtl`]: direction.value === "rtl"
		}, contextClassName.value, className, rootClass, mergedClassNames.root, cssVarCls.value, hashId.value);
		const mergedCloseIconFn = () => {
			if (typeof closable === "object" && closable.closeIcon) return closable.closeIcon;
			const closeIcon = getSlotPropFn(slots, props, "closeIcon");
			if (closeIcon) return closeIcon;
			if (typeof contextClosable.value === "object" && contextClosable.value) return contextClosable.value;
			return contextCloseIcon.value;
		};
		const mergedCloseIcon = mergedCloseIconFn();
		const mergedAriaPropsFn = () => {
			const merged = closable ?? contextClosable.value;
			if (typeof merged === "object") {
				const { closeIcon: _, ...ariaProps } = merged;
				return ariaProps;
			}
			return {};
		};
		const mergedAriaProps = mergedAriaPropsFn();
		return createVNode(Transition, {
			"name": `${prefixCls.value}-motion`,
			"appear": false,
			"leaveFromClass": "ant-alert-motion-leave",
			"leaveActiveClass": "ant-alert-motion-leave ant-alert-motion-leave-active",
			"leaveToClass": "ant-alert-motion-leave ant-alert-motion-leave-active",
			"onBeforeLeave": handleBeforeLeave,
			"onAfterLeave": () => props?.afterClose?.()
		}, { default: () => [!closed.value ? createVNode("div", mergeProps({
			"id": props.id,
			"ref": internalRef,
			"data-show": !closed.value,
			"role": props.role || "alert",
			"class": alertCls,
			"style": [
				mergedStyles.root,
				contextStyle.value,
				style
			]
		}, pureAttrs(attrs)), [
			isShowIcon ? createVNode(IconNode, {
				"class": mergedClassNames.icon,
				"style": mergedStyles.icon,
				"description": description,
				"icon": props.icon,
				"prefixCls": prefixCls.value,
				"type": type.value,
				"successIcon": successIcon.value,
				"infoIcon": infoIcon.value,
				"warningIcon": warningIcon.value,
				"errorIcon": errorIcon.value
			}, null) : null,
			createVNode("div", {
				"class": [`${prefixCls.value}-section`, mergedClassNames.section],
				"style": mergedStyles.section
			}, [message ? createVNode("div", {
				"class": [`${prefixCls.value}-title`, mergedClassNames.title],
				"style": mergedStyles.title
			}, [message]) : null, description ? createVNode("div", {
				"class": [`${prefixCls.value}-description`, mergedClassNames.description],
				"style": mergedStyles.description
			}, [description]) : null]),
			action ? createVNode("div", {
				"class": [`${prefixCls.value}-actions`, mergedClassNames.actions],
				"style": mergedStyles.actions
			}, [action]) : null,
			createVNode(CloseIconNode, {
				"class": mergedClassNames.close,
				"style": mergedStyles.close,
				"isClosable": isClosable,
				"prefixCls": prefixCls.value,
				"ariaProps": mergedAriaProps,
				"handleClose": handleClose,
				"closeIcon": mergedCloseIcon
			}, null)
		]) : null] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		type: {
			type: String,
			required: false
		},
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		title: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		message: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		description: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		afterClose: {
			type: Function,
			required: false
		},
		showIcon: {
			type: Boolean,
			required: false,
			default: void 0
		},
		role: {
			type: String,
			required: false
		},
		classes: {
			type: Function,
			required: false,
			skipCheck: true
		},
		styles: {
			type: Function,
			required: false,
			skipCheck: true
		},
		banner: {
			type: Boolean,
			required: false,
			default: void 0
		},
		icon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		closeIcon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		action: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, alertDefaultProps),
	emits: [
		"close",
		"mouseenter",
		"mouseleave",
		"click"
	],
	name: "AAlert",
	inheritAttrs: false
});
Alert.install = (app) => {
	app.component(Alert.name, Alert);
};
var Alert_default = Alert;

//#endregion
export { Alert_default as default };