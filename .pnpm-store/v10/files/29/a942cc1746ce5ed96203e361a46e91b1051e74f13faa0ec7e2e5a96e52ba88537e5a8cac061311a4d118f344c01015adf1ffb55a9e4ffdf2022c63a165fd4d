import { useComponentBaseConfig } from "../config-provider/context.js";
import { pureAttrs, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { useZIndex } from "../_util/hooks/useZIndex.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { SpaceCompact } from "../space/index.js";
import flex_default from "../flex/index.js";
import { GroupContextProvider } from "./context.js";
import style_default from "./style/index.js";
import FloatButton_default, { floatButtonPrefixCls } from "./FloatButton.js";
import { Transition, computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, nextTick, onBeforeUnmount, onMounted, shallowRef, watch } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { CloseOutlined, FileTextOutlined } from "@antdv-next/icons";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";
import { omit } from "es-toolkit";

//#region src/float-button/FloatButtonGroup.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const VALID_PLACEMENTS = [
	"top",
	"bottom",
	"left",
	"right"
];
const groupOmittedProps = [
	"classes",
	"styles",
	"trigger",
	"open",
	"defaultOpen",
	"closeIcon",
	"placement",
	"style",
	"rootClass"
];
const FloatButtonGroup = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
	const { class: contextClassName, style: contextStyle, classes: contextClasses, styles: contextStyles, direction, closeIcon: contextCloseIcon, prefixCls } = useComponentBaseConfig("floatButtonGroup", props, ["closeIcon"], floatButtonPrefixCls);
	const groupPrefixCls = computed(() => `${prefixCls.value}-group`);
	const listCls = computed(() => `${groupPrefixCls.value}-list`);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const { classes, styles, trigger, placement, shape, type, style } = toPropsRefs$1(props, "classes", "styles", "trigger", "placement", "shape", "type", "style");
	const mergedPlacement = computed(() => {
		return VALID_PLACEMENTS.includes(placement.value) ? placement.value : "top";
	});
	const mergedShape = computed(() => shape.value ?? "circle");
	const individual = computed(() => mergedShape.value === "circle");
	const mergedType = computed(() => type.value ?? "default");
	const [zIndex] = useZIndex("FloatButton", computed(() => style.value?.zIndex));
	const zIndexStyle = computed(() => zIndex.value === void 0 ? void 0 : { zIndex: zIndex.value });
	const open = shallowRef(props.open ?? props.defaultOpen ?? false);
	watch(() => props.open, (val) => {
		open.value = !!val;
	});
	const triggerMode = computed(() => trigger.value && ["click", "hover"].includes(trigger.value));
	const hoverTrigger = computed(() => trigger.value === "hover");
	const clickTrigger = computed(() => trigger.value === "click");
	const triggerOpen = (nextOpen) => {
		emit("update:open", nextOpen);
		if (props.open !== void 0) return;
		if (open.value === nextOpen) return;
		open.value = nextOpen;
		emit("openChange", nextOpen);
	};
	const groupRef = shallowRef();
	const handleDocClick = (event) => {
		if (!clickTrigger.value) return;
		if (groupRef.value?.contains(event.target)) return;
		triggerOpen(false);
	};
	const canUseDocument = typeof document !== "undefined";
	const setupDocListener = () => {
		if (clickTrigger.value && canUseDocument) document.addEventListener("click", handleDocClick, { capture: true });
	};
	const removeDocListener = () => {
		if (canUseDocument) document.removeEventListener("click", handleDocClick, { capture: true });
	};
	watch(clickTrigger, async (_n, _o, onCleanup) => {
		await nextTick();
		setupDocListener();
		onCleanup(() => {
			removeDocListener();
		});
	});
	onMounted(() => {
		setupDocListener();
	});
	onBeforeUnmount(() => {
		removeDocListener();
	});
	const onMouseEnter = () => {
		if (hoverTrigger.value) triggerOpen(true);
	};
	const onMouseLeave = () => {
		if (hoverTrigger.value) triggerOpen(false);
	};
	const mergedProps = computed(() => ({
		...props,
		type: mergedType.value,
		shape: mergedShape.value,
		placement: mergedPlacement.value
	}));
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClasses, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const listContext = computed(() => ({
		shape: mergedShape.value,
		individual: individual.value,
		classNames: {
			root: mergedClassNames.value.item,
			icon: mergedClassNames.value.itemIcon,
			content: mergedClassNames.value.itemContent
		},
		styles: {
			root: mergedStyles.value.item,
			icon: mergedStyles.value.itemIcon,
			content: mergedStyles.value.itemContent
		}
	}));
	const triggerContext = computed(() => ({
		shape: mergedShape.value,
		individual: true,
		classNames: {
			root: mergedClassNames.value.trigger,
			icon: mergedClassNames.value.triggerIcon,
			content: mergedClassNames.value.triggerContent
		},
		styles: {
			root: mergedStyles.value.trigger,
			icon: mergedStyles.value.triggerIcon,
			content: mergedStyles.value.triggerContent
		}
	}));
	const restButtonProps = computed(() => {
		return omit(props, groupOmittedProps);
	});
	return () => {
		const closeIcon = getSlotPropsFnRun(slots, props, "closeIcon");
		const icon = getSlotPropsFnRun(slots, props, "icon");
		const _contextCloseIcon = getSlotPropsFnRun({}, { closeIcon: contextCloseIcon?.value }, "closeIcon");
		const mergedCloseIcon = closeIcon ?? _contextCloseIcon ?? createVNode(CloseOutlined, null, null);
		const mergedTriggerIcon = icon ?? createVNode(FileTextOutlined, null, null);
		const transitionProps = getTransitionProps(`${listCls.value}-motion`);
		const renderList = () => {
			const children = filterEmpty(slots.default?.() ?? []);
			if (!children.length) return null;
			const vertical = mergedPlacement.value === "top" || mergedPlacement.value === "bottom";
			const sharedClass = classNames(listCls.value, `${listCls.value}-motion`, mergedClassNames.value.list);
			const sharedStyle = mergedStyles.value.list;
			return individual.value ? createVNode(flex_default, {
				"vertical": vertical,
				"class": sharedClass,
				"style": sharedStyle
			}, _isSlot(children) ? children : { default: () => [children] }) : createVNode(SpaceCompact, {
				"direction": vertical ? "vertical" : "horizontal",
				"class": sharedClass,
				"style": sharedStyle
			}, _isSlot(children) ? children : { default: () => [children] });
		};
		const renderTrigger = () => {
			if (!triggerMode.value) return null;
			return createVNode(GroupContextProvider, { "value": triggerContext.value }, { default: () => [createVNode(FloatButton_default, mergeProps(restButtonProps.value, {
				"type": mergedType.value,
				"shape": mergedShape.value,
				"icon": open.value ? mergedCloseIcon : mergedTriggerIcon,
				"rootClass": classNames(`${groupPrefixCls.value}-trigger`, mergedClassNames.value.trigger),
				"classes": void 0,
				"styles": void 0,
				"onClick": (e) => {
					if (clickTrigger.value) triggerOpen(!open.value);
					emit("click", e);
				},
				"ariaLabel": props.ariaLabel
			}), null)] });
		};
		return createVNode(GroupContextProvider, { "value": listContext.value }, { default: () => [createVNode("div", mergeProps(pureAttrs(attrs), {
			"ref": groupRef,
			"class": classNames(groupPrefixCls.value, hashId.value, cssVarCls.value, rootCls.value, contextClassName.value, mergedClassNames.value.root, props.rootClass, attrs.class, {
				[`${groupPrefixCls.value}-rtl`]: direction.value === "rtl",
				[`${groupPrefixCls.value}-individual`]: individual.value,
				[`${groupPrefixCls.value}-${mergedPlacement.value}`]: !!triggerMode.value,
				[`${groupPrefixCls.value}-menu-mode`]: !!triggerMode.value
			}),
			"style": [
				contextStyle.value,
				mergedStyles.value.root,
				props.style,
				attrs.style,
				zIndexStyle.value
			],
			"onMouseenter": onMouseEnter,
			"onMouseleave": onMouseLeave
		}), [triggerMode.value ? createVNode(Transition, transitionProps, { default: () => [open.value ? renderList() : null] }) : renderList(), renderTrigger()])] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		trigger: {
			type: String,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
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
		placement: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
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
		content: {
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
		type: {
			type: String,
			required: false
		},
		shape: {
			type: String,
			required: false
		},
		tooltip: {
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
		href: {
			type: String,
			required: false
		},
		target: {
			type: String,
			required: false
		},
		badge: {
			type: Object,
			required: false
		},
		htmlType: {
			type: String,
			required: false
		},
		ariaLabel: {
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
	}, {
		shape: "circle",
		type: "default",
		icon: () => createVNode(FileTextOutlined, null, null)
	}),
	emits: [
		"openChange",
		"update:open",
		"click"
	],
	name: "AFloatButtonGroup",
	inheritAttrs: false
});
var FloatButtonGroup_default = FloatButtonGroup;

//#endregion
export { FloatButtonGroup_default as default };