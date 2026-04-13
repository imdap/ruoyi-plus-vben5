import Popup_default from "./Popup.js";
import placements_default from "./placements.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, ref } from "vue";
import { clsx } from "@v-c/util";
import { Trigger } from "@v-c/trigger";
import useId from "@v-c/util/dist/hooks/useId";
import { filterEmpty } from "@v-c/util/dist/props-util";
var Tooltip_default = /* @__PURE__ */ defineComponent((props, { slots, expose }) => {
	const mergedId = useId(props.id);
	const triggerRef = ref();
	const mergedArrow = computed(() => {
		const showArrow = props.showArrow;
		const classNames = props.classNames;
		const styles = props.styles || {};
		const arrowContent = props.arrowContent;
		if (!showArrow) return false;
		const arrowConfig = showArrow === true ? {} : showArrow;
		return {
			...arrowConfig,
			className: clsx(arrowConfig.className, classNames?.arrow),
			style: {
				...arrowConfig.style,
				...styles?.arrow
			},
			content: arrowConfig.content ?? arrowContent
		};
	});
	expose({
		nativeElement: computed(() => triggerRef.value?.nativeElement),
		popupElement: computed(() => triggerRef.value?.popupElement),
		forceAlign: () => {
			triggerRef.value?.forceAlign();
		}
	});
	return () => {
		const { trigger = ["hover"], mouseEnterDelay = 0, mouseLeaveDelay = .1, prefixCls = "vc-tooltip", onVisibleChange, afterVisibleChange, motion, placement = "right", align = {}, destroyOnHidden = false, defaultVisible, getTooltipContainer, arrowContent, overlay, id, showArrow = true, classNames, styles, builtinPlacements, ...restProps } = props;
		const mergedPlacements = builtinPlacements ?? placements_default;
		const getChildren = ({ open }) => {
			const child = filterEmpty(slots?.default?.({ open }))?.[0];
			return createVNode(child, { "aria-describedby": overlay && open ? mergedId : void 0 });
		};
		const extraProps = { ...restProps };
		if ("visible" in props) extraProps.popupVisible = props.visible;
		return createVNode(Trigger, mergeProps(extraProps, {
			"popupClassName": classNames?.root,
			"prefixCls": prefixCls,
			"popup": createVNode(Popup_default, {
				"key": "content",
				"prefixCls": prefixCls,
				"id": mergedId,
				"classNames": classNames,
				"styles": styles
			}, { default: () => [typeof overlay === "function" ? overlay?.() : overlay] }),
			"action": trigger,
			"builtinPlacements": mergedPlacements,
			"popupPlacement": placement,
			"ref": triggerRef,
			"popupAlign": align,
			"getPopupContainer": getTooltipContainer,
			"onOpenChange": onVisibleChange,
			"afterOpenChange": afterVisibleChange,
			"popupMotion": motion,
			"defaultPopupVisible": defaultVisible,
			"autoDestroy": destroyOnHidden,
			"mouseLeaveDelay": mouseLeaveDelay,
			"popupStyle": styles?.root,
			"mouseEnterDelay": mouseEnterDelay,
			"arrow": mergedArrow.value,
			"uniqueContainerClassName": classNames?.uniqueContainer,
			"uniqueContainerStyle": styles?.uniqueContainer
		}), getChildren);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
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
		motion: {
			required: false,
			default: void 0
		},
		trigger: {
			type: [String, Array],
			required: false,
			default: void 0
		},
		defaultVisible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		visible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false,
			default: void 0
		},
		onVisibleChange: {
			type: Function,
			required: false,
			default: void 0
		},
		afterVisibleChange: {
			type: Function,
			required: false,
			default: void 0
		},
		overlay: {
			type: [
				Function,
				Object,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: true,
			default: void 0
		},
		getTooltipContainer: {
			type: Function,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		align: {
			type: Object,
			required: false,
			default: void 0
		},
		showArrow: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		},
		arrowContent: {
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
		id: {
			type: String,
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false,
			default: void 0
		},
		unique: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onPopupAlign: {
			type: Function,
			required: false,
			default: void 0
		},
		builtinPlacements: {
			type: Object,
			required: false,
			default: void 0
		},
		fresh: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mouseLeaveDelay: {
			type: Number,
			required: false,
			default: void 0
		},
		mouseEnterDelay: {
			type: Number,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		popupVisible: {
			type: Boolean,
			required: false,
			default: void 0
		}
	}, {
		mouseEnterDelay: 0,
		mouseLeaveDelay: .1,
		prefixCls: "vc-tooltip",
		trigger: ["hover"],
		placement: "right",
		align: {},
		showArrow: true,
		visible: void 0,
		defaultVisible: void 0,
		forceRender: void 0,
		fresh: void 0
	}),
	name: "VcTooltip"
});
export { Tooltip_default as default };
