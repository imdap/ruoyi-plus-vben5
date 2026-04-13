import { useStepsProvider } from "./Context.js";
import Step_default from "./Step.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { toPropsRefs } from "@v-c/util/dist/props-util";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var EmptyObject = {};
var Steps_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const { orientation, titlePlacement, items, initial, current, status, components, prefixCls } = toPropsRefs(props, "orientation", "titlePlacement", "items", "initial", "current", "status", "components", "prefixCls");
	const isVertical = computed(() => orientation.value === "vertical");
	const mergedOrientation = computed(() => isVertical.value ? "vertical" : "horizontal");
	const mergeTitlePlacement = computed(() => !isVertical.value && titlePlacement.value === "vertical" ? "vertical" : "horizontal");
	const mergedItems = computed(() => {
		return (items.value || []).filter(Boolean);
	});
	const statuses = computed(() => {
		return mergedItems.value.map((item, index) => {
			const itemStatus = item.status;
			const stepNumber = initial.value + index;
			if (!itemStatus) {
				if (stepNumber === current.value) return status.value;
				else if (stepNumber < current.value) return "finish";
				return "wait";
			}
			return itemStatus;
		});
	});
	const onStepClick = (next) => {
		if (props.onChange && current.value !== next) props.onChange(next);
	};
	useStepsProvider(computed(() => {
		return {
			prefixCls: prefixCls.value,
			classNames: props.classNames,
			styles: props.styles,
			ItemComponent: components.value?.item ?? "div"
		};
	}));
	const renderStep = (item, index) => {
		const { classNames, styles, itemRender, iconRender, itemWrapperRender } = props;
		const stepIndex = initial.value + index;
		const itemStatus = statuses.value[index];
		const nextStatus = statuses.value[index + 1];
		const data = {
			...item,
			status: itemStatus
		};
		return createVNode(Step_default, {
			"key": stepIndex,
			"prefixCls": prefixCls.value,
			"classNames": classNames ?? {},
			"styles": styles ?? {},
			"data": data,
			"nextStatus": nextStatus,
			"active": stepIndex === current.value,
			"index": stepIndex,
			"last": mergedItems.value.length - 1 === index,
			"iconRender": iconRender,
			"itemRender": itemRender,
			"itemWrapperRender": itemWrapperRender,
			"onClick": props.onChange ? onStepClick : void 0
		}, null);
	};
	return () => {
		let _slot;
		const { classNames = EmptyObject, styles = EmptyObject, rootClassName, className, style } = props;
		const { root: RootComponent = "div" } = components.value ?? {};
		const classString = clsx(prefixCls.value, `${prefixCls.value}-${mergedOrientation.value}`, `${prefixCls.value}-title-${mergeTitlePlacement.value}`, rootClassName, className, classNames.root);
		return createVNode(RootComponent, mergeProps({
			"class": classString,
			"style": {
				...style,
				...styles?.root
			}
		}, attrs), _isSlot(_slot = mergedItems.value.map(renderStep)) ? _slot : { default: () => [_slot] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		className: {
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
		rootClassName: {
			type: String,
			required: false,
			default: void 0
		},
		orientation: {
			type: String,
			required: false,
			default: void 0
		},
		titlePlacement: {
			type: String,
			required: false,
			default: void 0
		},
		components: {
			type: Object,
			required: false,
			default: void 0
		},
		status: {
			type: String,
			required: false,
			default: void 0
		},
		current: {
			type: Number,
			required: false,
			default: void 0
		},
		initial: {
			type: Number,
			required: false,
			default: void 0
		},
		items: {
			type: Array,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		iconRender: {
			type: Function,
			required: false,
			default: void 0
		},
		itemRender: {
			type: Function,
			required: false,
			default: void 0
		},
		itemWrapperRender: {
			type: Function,
			required: false,
			default: void 0
		}
	}, {
		prefixCls: "vc-steps",
		status: "process",
		current: 0,
		initial: 0
	}),
	name: "Steps",
	inheritAttrs: false
});
export { Steps_default as default };
