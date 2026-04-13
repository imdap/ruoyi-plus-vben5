import calculateAutoSizeStyle from "./calculateNodeHeight.js";
import { computed, createVNode, defineComponent, mergeProps, nextTick, onUnmounted, ref, shallowRef, watch } from "vue";
import { useResizeObserver } from "@v-c/resize-observer";
import { clsx } from "@v-c/util";
import omit from "@v-c/util/dist/omit";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import raf from "@v-c/util/dist/raf";
//#region src/ResizableTextArea.tsx
var RESIZE_START = 0;
var RESIZE_MEASURING = 1;
var RESIZE_STABLE = 2;
var ResizableTextArea = /* @__PURE__ */ defineComponent((props, { expose, attrs }) => {
	const internalValue = ref(props?.value ?? props?.defaultValue ?? "");
	watch(() => props.value, () => {
		internalValue.value = props.value;
	});
	const mergedValue = computed(() => internalValue.value ?? "");
	const onInternalChange = (e) => {
		if (props.value === void 0) internalValue.value = e.target.value;
		props?.onChange?.(e);
	};
	const textareaRef = shallowRef();
	expose({ textArea: textareaRef });
	const autoSizeData = computed(() => {
		const autoSize = props.autoSize;
		if (autoSize && typeof autoSize === "object") return [autoSize.minRows, autoSize.maxRows];
		return [];
	});
	const minRows = computed(() => autoSizeData?.value?.[0]);
	const maxRows = computed(() => autoSizeData?.value?.[1]);
	const resizeState = ref(RESIZE_STABLE);
	const autoSizeStyle = shallowRef({});
	const startResize = () => {
		resizeState.value = RESIZE_START;
	};
	const needAutoSize = computed(() => !!props.autoSize);
	watch([
		() => props.value,
		minRows,
		maxRows,
		needAutoSize
	], async () => {
		await nextTick();
		if (needAutoSize.value) startResize();
	}, {
		immediate: true,
		flush: "post"
	});
	watch([resizeState, textareaRef], () => {
		if (!textareaRef.value) return;
		if (resizeState.value === RESIZE_START) resizeState.value = RESIZE_MEASURING;
		else if (resizeState.value === RESIZE_MEASURING) {
			const textareaStyles = calculateAutoSizeStyle(textareaRef.value, false, minRows.value, maxRows.value);
			resizeState.value = RESIZE_STABLE;
			autoSizeStyle.value = textareaStyles;
		}
	});
	const resizeRafRef = shallowRef();
	const cleanRaf = () => {
		raf.cancel(resizeRafRef.value);
	};
	const onInternalResize = (size) => {
		if (resizeState.value === RESIZE_STABLE) {
			props?.onResize?.(size);
			if (props.autoSize) {
				cleanRaf();
				resizeRafRef.value = raf(() => {
					startResize();
				});
			}
		}
	};
	onUnmounted(() => {
		cleanRaf();
	});
	useResizeObserver(computed(() => {
		return !!(props.autoSize || props.onResize);
	}), textareaRef, onInternalResize);
	return () => {
		const { prefixCls, disabled, readOnly } = props;
		const { style, restAttrs, className } = getAttrStyleAndClass(attrs, { omits: ["onKeydown"] });
		const mergedAutoSizeStyle = needAutoSize.value ? autoSizeStyle.value : null;
		const mergedStyle = {
			...style,
			...mergedAutoSizeStyle
		};
		if (resizeState.value === RESIZE_START || resizeState.value === RESIZE_MEASURING) {
			mergedStyle.overflowY = "hidden";
			mergedStyle.overflowX = "hidden";
		}
		return createVNode("textarea", mergeProps(omit(restAttrs, ["readonly"]), omit(props, [
			"suffix",
			"classNames",
			"styles",
			"prefixCls",
			"allowClear",
			"autoSize",
			"showCount",
			"disabled",
			"hidden",
			"readOnly",
			"onClear",
			"maxLength",
			"onResize",
			"onChange"
		]), {
			"readonly": restAttrs?.readonly ?? readOnly,
			"ref": textareaRef,
			"style": mergedStyle,
			"class": clsx(prefixCls, className, { [`${prefixCls}-disabled`]: disabled }),
			"disabled": disabled,
			"value": mergedValue.value,
			"onInput": onInternalChange
		}), null);
	};
}, {
	props: {
		value: {
			required: false,
			default: void 0
		},
		defaultValue: {
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoSize: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		onPressEnter: {
			type: Function,
			required: false,
			default: void 0
		},
		onResize: {
			type: Function,
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
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		suffix: {
			required: false,
			default: void 0
		},
		showCount: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		count: {
			required: false,
			default: void 0
		},
		onClear: {
			type: Function,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		maxLength: {
			type: Number,
			required: false,
			default: void 0
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		readOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onKeydown: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyup: {
			type: Function,
			required: false,
			default: void 0
		},
		onFocus: {
			type: Function,
			required: false,
			default: void 0
		},
		onBlur: {
			type: Function,
			required: false,
			default: void 0
		},
		changeOnComposing: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	name: "ResizableTextArea",
	inheritAttrs: false
});
//#endregion
export { ResizableTextArea as default };
