import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useMergedArrow_default from "../tooltip/hooks/useMergedArrow.js";
import popover_default from "../popover/index.js";
import style_default from "./style/index.js";
import PurePanel_default, { Overlay } from "./PurePanel.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { removeUndefined } from "@v-c/util/dist/props-util";
import { ExclamationCircleFilled } from "@antdv-next/icons";
import { omit } from "es-toolkit";

//#region src/popconfirm/index.tsx
const OMITTED_PROP_KEYS = [
	"title",
	"description",
	"okText",
	"cancelText",
	"okType",
	"okButtonProps",
	"cancelButtonProps",
	"showCancel",
	"icon",
	"disabled",
	"classes",
	"styles",
	"prefixCls",
	"arrow"
];
const defaultIcon = createVNode(ExclamationCircleFilled, null, null);
const Popconfirm = /* @__PURE__ */ defineComponent((props, { slots, attrs, expose, emit }) => {
	const { class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, arrow: contextArrow, trigger: contextTrigger, prefixCls } = useComponentBaseConfig("popconfirm", props, ["arrow", "trigger"]);
	const { arrow: arrowProp, classes, styles } = toPropsRefs$1(props, "arrow", "classes", "styles");
	const [hashId, cssVarCls] = style_default(prefixCls);
	const mergedArrow = useMergedArrow_default(arrowProp, contextArrow);
	const mergedTrigger = computed(() => props?.trigger ?? contextTrigger.value ?? "click");
	const popoverRef = shallowRef();
	const open = shallowRef(props.open ?? props.defaultOpen ?? false);
	watch(() => props.open, (val, prevVal) => {
		if (val !== void 0) open.value = val;
		else if (prevVal !== void 0) open.value = false;
	}, { immediate: true });
	const settingOpen = (value, e) => {
		if (props.open === void 0) open.value = value;
		emit("openChange", value, e);
		emit("update:open", value);
	};
	const close = (e) => {
		settingOpen(false, e);
	};
	const onCancel = (e) => {
		emit("cancel", e);
		settingOpen(false, e);
	};
	const handlePopupClick = (e) => {
		emit("popupClick", e);
	};
	const onInternalOpenChange = (value, e) => {
		if (props.disabled) return;
		settingOpen(value, e);
	};
	expose({
		forceAlign: () => popoverRef.value?.forceAlign?.(),
		nativeElement: computed(() => popoverRef.value?.nativeElement),
		popupElement: computed(() => popoverRef.value?.popupElement)
	});
	const mergedProps = computed(() => ({
		...props,
		trigger: mergedTrigger.value
	}));
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const rootClassNames = computed(() => clsx(prefixCls.value, hashId.value, cssVarCls.value, contextClassName.value, mergedClassNames.value.root));
	return () => {
		const titleNode = getSlotPropsFnRun(slots, props, "title") ?? props.title;
		const descriptionNode = getSlotPropsFnRun(slots, props, "description") ?? props.description;
		const iconNode = getSlotPropsFnRun(slots, props, "icon") ?? props.icon ?? defaultIcon;
		const okTextNode = getSlotPropsFnRun(slots, props, "okText") ?? props.okText;
		const cancelTextNode = getSlotPropsFnRun(slots, props, "cancelText") ?? props.cancelText;
		const restProps = omit(props, OMITTED_PROP_KEYS);
		const content = createVNode(Overlay, {
			"prefixCls": prefixCls.value,
			"title": titleNode,
			"description": descriptionNode,
			"icon": iconNode,
			"okText": okTextNode,
			"cancelText": cancelTextNode,
			"okType": props.okType ?? "primary",
			"showCancel": props.showCancel ?? true,
			"okButtonProps": props.okButtonProps,
			"cancelButtonProps": props.cancelButtonProps,
			"close": close,
			"onConfirm": props.onConfirm,
			"onCancel": onCancel,
			"onPopupClick": handlePopupClick,
			"classes": mergedClassNames.value,
			"styles": mergedStyles.value
		}, null);
		return createVNode(popover_default, mergeProps(attrs, removeUndefined(restProps), {
			"trigger": mergedTrigger.value,
			"ref": popoverRef,
			"open": open.value,
			"arrow": mergedArrow.value,
			"onOpenChange": onInternalOpenChange,
			"content": content,
			"classes": {
				root: rootClassNames.value,
				container: mergedClassNames.value.container,
				arrow: mergedClassNames.value.arrow
			},
			"styles": {
				root: {
					...mergedStyles.value.root,
					...contextStyle.value
				},
				container: mergedStyles.value.container,
				arrow: mergedStyles.value.arrow
			}
		}), { default: () => [slots.default?.()] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
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
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		okText: {
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
		cancelText: {
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
		okType: {
			type: String,
			required: false
		},
		okButtonProps: {
			type: Object,
			required: false
		},
		cancelButtonProps: {
			type: Object,
			required: false
		},
		showCancel: {
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
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		onConfirm: {
			type: Function,
			required: false
		},
		afterOpenChange: {
			type: Function,
			required: false
		},
		builtinPlacements: { required: false },
		overlay: {
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
		openClass: {
			type: String,
			required: false
		},
		unique: {
			type: Boolean,
			required: false,
			default: void 0
		},
		align: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		autoAdjustOverflow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		color: { required: false },
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
		getPopupContainer: {
			type: Function,
			required: false
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false
		},
		placement: {
			type: String,
			required: false
		},
		trigger: {
			type: [String, Array],
			required: false
		},
		fresh: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mouseEnterDelay: {
			type: Number,
			required: false
		},
		mouseLeaveDelay: {
			type: Number,
			required: false
		},
		getTooltipContainer: {
			type: Function,
			required: false
		},
		motion: { required: false },
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, {
		placement: "top",
		okType: "primary"
	}),
	emits: [
		"openChange",
		"confirm",
		"cancel",
		"popupClick",
		"update:open"
	],
	name: "APopconfirm",
	inheritAttrs: false
});
Popconfirm.install = (app) => {
	app.component(Popconfirm.name, Popconfirm);
};
Popconfirm._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default;
var popconfirm_default = Popconfirm;

//#endregion
export { popconfirm_default as default };