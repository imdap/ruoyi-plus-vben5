import { usePickerContext } from "../context.js";
import { toArray } from "../../utils/miscUtil.js";
import Footer_default from "./Footer.js";
import PopupPanel_default from "./PopupPanel.js";
import PresetPanel_default from "./PresetPanel.js";
import { computed, createVNode, defineComponent, mergeProps, nextTick, ref, watch } from "vue";
import { clsx, omit } from "@v-c/util";
import { useResizeObserver } from "@v-c/resize-observer";
var Popup_default = /* @__PURE__ */ defineComponent((props) => {
	const activeInfo = computed(() => props.activeInfo || [
		0,
		0,
		0
	]);
	const ctx = usePickerContext();
	const panelPrefixCls = computed(() => `${ctx.value.prefixCls}-panel`);
	const rtl = computed(() => props.direction === "rtl");
	const arrowRef = ref();
	const wrapperRef = ref();
	const containerRef = ref();
	const containerWidth = ref(0);
	const containerOffset = ref(0);
	const arrowOffset = ref(0);
	const onResize = (info) => {
		if (info.width) containerWidth.value = info.width;
	};
	const rangeEnabled = ref(props.range);
	watch(() => props.range, (val) => {
		rangeEnabled.value = val;
	});
	useResizeObserver(rangeEnabled, containerRef, onResize);
	const retryTimes = ref(0);
	const calculateOffsets = () => {
		const [activeInputLeft, activeInputRight, selectorWidth] = activeInfo.value;
		if (props.range && wrapperRef.value) {
			const arrowWidth = arrowRef.value?.offsetWidth || 0;
			const wrapperRect = wrapperRef.value.getBoundingClientRect();
			if (!wrapperRect.height || wrapperRect.right < 0) {
				if (retryTimes.value > 0) {
					retryTimes.value--;
					requestAnimationFrame(() => {
						calculateOffsets();
					});
				}
				return;
			}
			arrowOffset.value = (rtl.value ? activeInputRight - arrowWidth : activeInputLeft) - wrapperRect.left;
			if (containerWidth.value && containerWidth.value < selectorWidth) {
				const offset = rtl.value ? wrapperRect.right - (activeInputRight - arrowWidth + containerWidth.value) : activeInputLeft + arrowWidth - wrapperRect.left - containerWidth.value;
				containerOffset.value = Math.max(0, offset);
			} else containerOffset.value = 0;
		}
	};
	watch(() => props.activeInfo, async () => {
		retryTimes.value = 10;
		await nextTick();
		calculateOffsets();
	}, { immediate: true });
	watch([
		rtl,
		containerWidth,
		() => props.range
	], async () => {
		await nextTick();
		calculateOffsets();
	}, { flush: "post" });
	function filterEmpty(list) {
		return list.filter((item) => item);
	}
	const valueList = computed(() => filterEmpty(toArray(props.value)));
	const isTimePickerEmptyValue = computed(() => props.picker === "time" && !valueList.value.length);
	const footerSubmitValue = computed(() => {
		if (isTimePickerEmptyValue.value) return filterEmpty([props.defaultOpenValue]);
		return valueList.value;
	});
	const popupPanelValue = computed(() => isTimePickerEmptyValue.value ? props.defaultOpenValue : valueList.value);
	const disableSubmit = computed(() => {
		if (!footerSubmitValue.value.length) return true;
		return footerSubmitValue.value.some((val) => props.isInvalid(val));
	});
	const onFooterSubmit = () => {
		if (isTimePickerEmptyValue.value) props.onSelect?.(props.defaultOpenValue);
		props.onOk();
		props.onSubmit();
	};
	return () => {
		const { classNames, panelRender, multiple, showNow, picker, range, presets, onPresetSubmit, onPresetHover, internalMode, styles, onFocus, onBlur, onPanelMouseDown } = props;
		const onPanelFocusIn = (event) => {
			onFocus?.(event);
		};
		const onPanelFocusOut = (event) => {
			onBlur?.(event);
		};
		const prefixCls = ctx.value.prefixCls;
		let mergedNodes = createVNode("div", { "class": `${prefixCls}-panel-layout` }, [createVNode(PresetPanel_default, {
			"prefixCls": prefixCls,
			"presets": presets,
			"onClick": onPresetSubmit,
			"onHover": onPresetHover
		}, null), createVNode("div", null, [createVNode(PopupPanel_default, mergeProps(props, { "value": popupPanelValue.value }), null), createVNode(Footer_default, mergeProps(omit(props, ["onSubmit"]), {
			"showNow": multiple ? false : showNow,
			"invalid": disableSubmit.value,
			"onSubmit": onFooterSubmit
		}), null)])]);
		if (panelRender) mergedNodes = panelRender(mergedNodes);
		const containerPrefixCls = `${panelPrefixCls.value}-container`;
		const marginLeft = "marginLeft";
		const marginRight = "marginRight";
		let renderNode = createVNode("div", {
			"ref": range ? containerRef : void 0,
			"onMousedown": onPanelMouseDown,
			"tabindex": -1,
			"class": clsx(containerPrefixCls, `${ctx.value.prefixCls}-${internalMode}-panel-container`, classNames?.popup?.container),
			"style": {
				[rtl.value ? marginRight : marginLeft]: `${containerOffset.value}px`,
				[rtl.value ? marginLeft : marginRight]: "auto",
				...styles?.popup?.container
			},
			"onFocusin": onPanelFocusIn,
			"onFocusout": onPanelFocusOut
		}, [mergedNodes]);
		if (range) renderNode = createVNode("div", {
			"onMousedown": onPanelMouseDown,
			"ref": wrapperRef,
			"class": clsx(`${ctx.value.prefixCls}-range-wrapper`, `${ctx.value.prefixCls}-${picker}-range-wrapper`)
		}, [createVNode("div", {
			"ref": arrowRef,
			"class": `${ctx.value.prefixCls}-range-arrow`,
			"style": { left: `${arrowOffset.value}px` }
		}, null), renderNode]);
		return renderNode;
	};
}, {
	props: {
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
		mode: {
			type: String,
			required: false,
			default: void 0
		},
		internalMode: {
			type: String,
			required: true,
			default: void 0
		},
		renderExtraFooter: {
			type: Function,
			required: false,
			default: void 0
		},
		showNow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		generateConfig: {
			type: Object,
			required: false,
			default: void 0
		},
		disabledDate: {
			type: Function,
			required: false,
			default: void 0
		},
		showTime: {
			type: Object,
			required: false,
			default: void 0
		},
		invalid: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onSubmit: {
			type: Function,
			required: true,
			default: void 0
		},
		needConfirm: {
			type: [Boolean, null],
			required: true,
			default: void 0
		},
		onNow: {
			type: Function,
			required: true,
			default: void 0
		},
		multiplePanel: {
			type: Boolean,
			required: false,
			default: void 0
		},
		range: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onPickerValueChange: {
			type: Function,
			required: true,
			default: void 0
		},
		onPanelChange: {
			type: Function,
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
		onSelect: {
			type: Function,
			required: false,
			default: void 0
		},
		defaultPickerValue: {
			required: false,
			default: void 0
		},
		pickerValue: {
			required: false,
			default: void 0
		},
		picker: {
			type: String,
			required: false,
			default: void 0
		},
		showWeek: {
			type: Boolean,
			required: false,
			default: void 0
		},
		cellRender: {
			type: Function,
			required: false,
			default: void 0
		},
		dateRender: {
			type: Function,
			required: false,
			default: void 0
		},
		monthCellRender: {
			type: Function,
			required: false,
			default: void 0
		},
		hoverValue: {
			type: Array,
			required: false,
			default: void 0
		},
		hoverRangeValue: {
			type: Array,
			required: false,
			default: void 0
		},
		onHover: {
			type: Function,
			required: false,
			default: void 0
		},
		components: {
			type: Object,
			required: false,
			default: void 0
		},
		hideHeader: {
			type: Boolean,
			required: false,
			default: void 0
		},
		locale: {
			type: Object,
			required: false,
			default: void 0
		},
		minDate: {
			required: false,
			default: void 0
		},
		maxDate: {
			required: false,
			default: void 0
		},
		prevIcon: {
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
		nextIcon: {
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
		superPrevIcon: {
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
		superNextIcon: {
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
		format: {
			type: String,
			required: false,
			default: void 0
		},
		showHour: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showMinute: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showSecond: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showMillisecond: {
			type: Boolean,
			required: false,
			default: void 0
		},
		use12Hours: {
			type: Boolean,
			required: false,
			default: void 0
		},
		hourStep: {
			required: false,
			default: void 0
		},
		minuteStep: {
			required: false,
			default: void 0
		},
		secondStep: {
			required: false,
			default: void 0
		},
		millisecondStep: {
			required: false,
			default: void 0
		},
		hideDisabledOptions: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultValue: {
			type: [Array, null],
			required: false,
			default: void 0
		},
		defaultOpenValue: {
			type: void 0,
			required: false,
			default: void 0
		},
		disabledHours: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledMinutes: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledSeconds: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledTime: {
			type: Function,
			required: false,
			default: void 0
		},
		changeOnScroll: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tabindex: {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		value: {
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		panelRender: {
			type: Function,
			required: false,
			default: void 0
		},
		presets: {
			type: Array,
			required: true,
			default: void 0
		},
		onPresetHover: {
			type: Function,
			required: true,
			default: void 0
		},
		onPresetSubmit: {
			type: Function,
			required: true,
			default: void 0
		},
		activeInfo: {
			type: Array,
			required: false,
			default: void 0
		},
		isInvalid: {
			type: Function,
			required: true,
			default: void 0
		},
		onOk: {
			required: true,
			default: void 0
		},
		onPanelMouseDown: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "Popup",
	inheritAttrs: false
});
export { Popup_default as default };
