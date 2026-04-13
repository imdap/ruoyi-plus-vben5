import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useMergedArrow_default from "../tooltip/hooks/useMergedArrow.js";
import tooltip_default from "../tooltip/index.js";
import style_default from "./style/index.js";
import PurePanel_default, { Overlay } from "./PurePanel.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty, removeUndefined } from "@v-c/util/dist/props-util";
import { getTransitionName } from "@v-c/util/dist/utils/transition";
import KeyCode from "@v-c/util/dist/KeyCode";

//#region src/popover/index.tsx
const Popover = /* @__PURE__ */ defineComponent((props, { slots, attrs, expose, emit }) => {
	const { getPrefixCls, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, arrow: contextArrow, trigger: contextTrigger, prefixCls } = useComponentBaseConfig("popover", props, ["arrow", "trigger"]);
	const { arrow: popoverArrow, classes, styles } = toPropsRefs$1(props, "arrow", "classes", "styles");
	const rootCls = computed(() => getPrefixCls());
	const [hashId, cssVarCls] = style_default(prefixCls);
	const mergedArrow = useMergedArrow_default(popoverArrow, contextArrow);
	const mergedTrigger = computed(() => props?.trigger ?? contextTrigger.value ?? "hover");
	const popoverRef = shallowRef();
	const forceAlign = () => {
		popoverRef.value?.forceAlign?.();
	};
	expose({
		forceAlign,
		nativeElement: computed(() => popoverRef.value?.nativeElement),
		popupElement: computed(() => popoverRef.value?.popupElement)
	});
	const mergedProps = computed(() => ({
		...props,
		trigger: mergedTrigger.value
	}));
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const open = shallowRef(props?.open ?? props?.defaultOpen ?? false);
	watch(() => props.open, (val, prevVal) => {
		if (val !== void 0) open.value = val;
		else if (prevVal !== void 0) open.value = false;
	}, { immediate: true });
	const settingOpen = (value, e) => {
		if (props.open === void 0) open.value = value;
		emit("openChange", value, e);
		emit("update:open", value);
	};
	const onKeyDown = (e) => {
		if (e.keyCode === KeyCode.ESC) settingOpen(false, e);
	};
	const onInternalOpenChange = (value) => {
		settingOpen(value);
	};
	return () => {
		const children = filterEmpty(slots?.default?.() ?? [])?.[0];
		const { placement, mouseLeaveDelay, mouseEnterDelay, motion, ...restProps } = props;
		const titleNode = getSlotPropsFnRun(slots, props, "title");
		const contentNode = getSlotPropsFnRun(slots, props, "content");
		const rootClassNames = clsx(hashId.value, cssVarCls.value, contextClassName.value, mergedClassNames.value.root);
		return createVNode(tooltip_default, mergeProps(attrs, {
			"unique": false,
			"arrow": mergedArrow.value,
			"placement": placement,
			"trigger": mergedTrigger.value,
			"mouseLeaveDelay": mouseLeaveDelay,
			"mouseEnterDelay": mouseEnterDelay
		}, removeUndefined(restProps), {
			"prefixCls": prefixCls.value,
			"classes": {
				root: rootClassNames,
				container: mergedClassNames.value?.container,
				arrow: mergedClassNames.value?.arrow
			},
			"styles": {
				root: {
					...mergedStyles.value?.root,
					...contextStyle.value
				},
				container: mergedStyles.value?.container,
				arrow: mergedStyles.value?.arrow
			},
			"open": open.value,
			"onOpenChange": onInternalOpenChange,
			"overlay": titleNode || contentNode ? createVNode(Overlay, {
				"prefixCls": prefixCls.value,
				"title": titleNode,
				"content": contentNode,
				"classes": mergedClassNames.value,
				"styles": mergedStyles.value
			}, null) : null,
			"motion": { name: getTransitionName(rootCls.value, "zoom-big", typeof motion?.name === "string" ? motion?.name : void 0) },
			"dataPopoverInject": true,
			"ref": popoverRef
		}), { default: () => [children ? createVNode(children, { onKeydown: onKeyDown }) : null] });
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
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
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
		mouseEnterDelay: .1,
		mouseLeaveDelay: .1
	}),
	emits: ["openChange", "update:open"],
	name: "APopover",
	inheritAttrs: false
});
Popover.install = (app) => {
	app.component(Popover.name, Popover);
};
Popover._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default;
var popover_default = Popover;

//#endregion
export { popover_default as default };