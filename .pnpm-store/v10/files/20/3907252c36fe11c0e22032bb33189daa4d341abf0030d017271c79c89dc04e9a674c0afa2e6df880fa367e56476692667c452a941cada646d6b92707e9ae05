import MotionThumb from "./MotionThumb.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, ref, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import omit from "@v-c/util/dist/omit";
//#region src/index.tsx
function getValidTitle(option) {
	if (typeof option.title !== "undefined") return option.title;
	if (typeof option.label !== "object") return option.label?.toString();
}
function normalizeOptions(options) {
	return options.map((option) => {
		if (typeof option === "object" && option !== null) {
			const validTitle = getValidTitle(option);
			return {
				...option,
				title: validTitle
			};
		}
		return {
			label: option?.toString(),
			title: option?.toString(),
			value: option
		};
	});
}
var InternalSegmentedOption = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const handleChange = (event) => {
		if (props.disabled) return;
		props?.onChange?.(event, props.value);
	};
	return () => {
		const { prefixCls, disabled, onMouseDown, onKeyDown, onKeyUp, onBlur, onFocus, name, checked, classNames: segmentedClassNames, styles, label, title, data, itemRender } = props;
		const itemContent = createVNode("label", {
			"class": clsx(attrs.class, { [`${prefixCls}-item-disabled`]: disabled }),
			"style": attrs.style,
			"onMousedown": onMouseDown
		}, [createVNode("input", {
			"name": name,
			"class": `${prefixCls}-item-input`,
			"type": "radio",
			"disabled": disabled,
			"checked": checked,
			"onChange": handleChange,
			"onFocus": onFocus,
			"onBlur": onBlur,
			"onKeydown": onKeyDown,
			"onKeyup": onKeyUp
		}, null), createVNode("div", {
			"class": clsx(`${prefixCls}-item-label`, segmentedClassNames?.label),
			"title": title,
			"style": styles?.label
		}, [typeof label === "function" ? label?.() : label])]);
		return itemRender?.(itemContent, { item: data });
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true
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
	data: {
		type: Object,
		required: true
	},
	disabled: {
		type: Boolean,
		required: false,
		default: void 0
	},
	checked: {
		type: Boolean,
		required: true
	},
	label: {
		type: [
			Object,
			Function,
			String,
			Number,
			null,
			Boolean,
			Array
		],
		required: true
	},
	title: {
		type: String,
		required: false,
		default: void 0
	},
	value: {
		type: [String, Number],
		required: true
	},
	name: {
		type: String,
		required: false,
		default: void 0
	},
	onChange: {
		type: Function,
		required: true
	},
	onFocus: {
		type: Function,
		required: true
	},
	onBlur: {
		type: Function,
		required: true
	},
	onKeyDown: {
		type: Function,
		required: true
	},
	onKeyUp: {
		type: Function,
		required: true
	},
	onMouseDown: {
		type: Function,
		required: true
	},
	itemRender: {
		type: Function,
		required: false,
		default: void 0
	}
} });
var Segmented = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const containerRef = ref();
	const segmentedOptions = computed(() => {
		return normalizeOptions(props?.options ?? []);
	});
	const rawValue = shallowRef(props?.value ?? props?.defaultValue ?? props?.options?.[0]?.value);
	watch(() => props.value, () => {
		rawValue.value = props.value;
	});
	const thumbShow = shallowRef(false);
	const handleChange = (_event, val) => {
		rawValue.value = val;
		props?.onChange?.(val);
	};
	const isKeyboard = shallowRef(false);
	const isFocused = shallowRef(true);
	const handleFocus = () => {
		isFocused.value = true;
	};
	const handleBlur = () => {
		isFocused.value = false;
	};
	const handleMouseDown = () => {
		isKeyboard.value = false;
	};
	const handleKeyUp = (event) => {
		if (event.key === "Tab") isKeyboard.value = true;
	};
	const onOffset = (offset) => {
		const validOptions = segmentedOptions.value.filter((option) => option.value === rawValue.value || !option.disabled);
		const currentIndex = validOptions.findIndex((option) => option?.value === rawValue.value);
		const total = validOptions.length;
		const nextOption = validOptions[(currentIndex + offset + total) % total];
		if (nextOption && nextOption.value !== rawValue.value) {
			rawValue.value = nextOption.value;
			props?.onChange?.(nextOption.value);
		}
	};
	const handleKeyDown = (event) => {
		switch (event.key) {
			case "ArrowLeft":
			case "ArrowUp":
				onOffset(-1);
				break;
			case "ArrowRight":
			case "ArrowDown":
				onOffset(1);
				break;
		}
	};
	return () => {
		const { itemRender, prefixCls, classNames: segmentedClassNames, styles, disabled, name, direction, vertical, motionName } = props;
		const renderOption = (segmentedOption) => {
			const { value: optionValue, disabled: optionDisabled } = segmentedOption;
			return createVNode(InternalSegmentedOption, mergeProps(segmentedOption, {
				"name": name,
				"data": segmentedOption,
				"itemRender": itemRender,
				"key": optionValue,
				"prefixCls": prefixCls,
				"class": clsx(segmentedOption.class, `${prefixCls}-item`, segmentedClassNames?.item, {
					[`${prefixCls}-item-selected`]: optionValue === rawValue.value && !thumbShow.value,
					[`${prefixCls}-item-focused`]: isFocused.value && isKeyboard.value && optionValue === rawValue.value
				}),
				"style": styles?.item,
				"classNames": segmentedClassNames,
				"styles": styles,
				"checked": optionValue === rawValue.value,
				"onChange": handleChange,
				"onFocus": handleFocus,
				"onBlur": handleBlur,
				"onKeyDown": handleKeyDown,
				"onKeyUp": handleKeyUp,
				"onMouseDown": handleMouseDown,
				"disabled": !!disabled || !!optionDisabled
			}), null);
		};
		const divProps = omit(attrs, ["class", "style"]);
		const attrClass = attrs.class;
		const attrStyle = attrs.style;
		return createVNode("div", mergeProps({
			"role": "radiogroup",
			"aria-label": "segmented control",
			"tabindex": disabled ? void 0 : 0,
			"style": attrStyle,
			"aria-orientation": vertical ? "vertical" : "horizontal"
		}, divProps, {
			"class": clsx(prefixCls, {
				[`${prefixCls}-rtl`]: direction === "rtl",
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-vertical`]: vertical
			}, attrClass),
			"ref": containerRef
		}), [createVNode("div", { "class": `${prefixCls}-group` }, [createVNode(MotionThumb, {
			"vertical": vertical,
			"prefixCls": prefixCls,
			"value": rawValue.value,
			"containerRef": containerRef.value,
			"motionName": `${prefixCls}-${motionName}`,
			"direction": direction,
			"getValueIndex": (val) => segmentedOptions.value.findIndex((n) => n.value === val),
			"onMotionStart": () => {
				thumbShow.value = true;
			},
			"onMotionEnd": () => {
				thumbShow.value = false;
			}
		}, null), segmentedOptions.value.map(renderOption)])]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		options: {
			type: Array,
			required: true
		},
		defaultValue: {
			type: [String, Number],
			required: false,
			default: void 0
		},
		value: {
			type: [String, Number],
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		motionName: {
			type: String,
			required: false,
			default: void 0
		},
		vertical: {
			type: Boolean,
			required: false,
			default: void 0
		},
		name: {
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
		itemRender: {
			type: Function,
			required: false,
			default: void 0
		}
	}, {
		prefixCls: "vc-segmented",
		options: [],
		motionName: "thumb-motion",
		itemRender: (node) => node
	}),
	name: "Segmented"
});
//#endregion
export { Segmented as default };
