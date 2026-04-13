import useSemantic from "../hooks/useSemantic.js";
import { providePickerContext } from "./context.js";
import PickerTrigger_default from "../PickerTrigger/index.js";
import { toArray } from "../utils/miscUtil.js";
import { pickTriggerProps } from "../PickerTrigger/util.js";
import { formatValue, formatValues } from "../utils/valueUtil.js";
import useCellRender from "./hooks/useCellRender.js";
import useFieldsInvalidate from "./hooks/useFieldsInvalidate.js";
import useFilledProps from "./hooks/useFilledProps.js";
import useOpen from "./hooks/useOpen.js";
import usePresets from "./hooks/usePresets.js";
import useRangeActive from "./hooks/useRangeActive.js";
import useRangePickerValue from "./hooks/useRangePickerValue.js";
import useRangeValue, { useInnerValue } from "./hooks/useRangeValue.js";
import useShowNow from "./hooks/useShowNow.js";
import useToggleDates from "../hooks/useToggleDates.js";
import Popup_default from "./Popup/index.js";
import SingleSelector_default from "./Selector/SingleSelector/index.js";
import { computed, createVNode, defineComponent, mergeProps, ref, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import omit$1 from "@v-c/util/dist/omit";
import pickAttrs from "@v-c/util/dist/pickAttrs";
var SinglePicker_default = /* @__PURE__ */ defineComponent((props, { expose }) => {
	const [filledProps, internalPicker, complexPicker, formatList, maskFormat, isInvalidateDate] = useFilledProps(computed(() => props));
	const fp = computed(() => filledProps.value);
	const prefixCls = computed(() => fp.value.prefixCls);
	const rootClassName = computed(() => fp.value.rootClassName);
	const styles = computed(() => fp.value.styles);
	const classNames = computed(() => fp.value.classNames);
	const previewValue = computed(() => fp.value.previewValue);
	const order = computed(() => fp.value.order);
	const defaultValue = computed(() => fp.value.defaultValue);
	const value = computed(() => fp.value.value);
	const needConfirm = computed(() => fp.value.needConfirm);
	const onKeyDown = computed(() => fp.value.onKeyDown);
	const disabled = computed(() => fp.value.disabled);
	const disabledDate = computed(() => fp.value.disabledDate);
	const minDate = computed(() => fp.value.minDate);
	const maxDate = computed(() => fp.value.maxDate);
	const defaultOpen = computed(() => fp.value.defaultOpen);
	const open = computed(() => fp.value.open);
	const onOpenChange = computed(() => fp.value.onOpenChange);
	const locale = computed(() => fp.value.locale);
	const generateConfig = computed(() => fp.value.generateConfig);
	const picker = computed(() => fp.value.picker);
	const showNow = computed(() => fp.value.showNow);
	const showToday = computed(() => fp.value.showToday);
	const showTime = computed(() => fp.value.showTime);
	const mode = computed(() => fp.value.mode);
	const onPanelChange = computed(() => fp.value.onPanelChange);
	const onCalendarChange = computed(() => fp.value.onCalendarChange);
	const onOk = computed(() => fp.value.onOk);
	const valueFormat = computed(() => fp.value.valueFormat);
	const multiple = computed(() => fp.value.multiple);
	const defaultPickerValue = computed(() => fp.value.defaultPickerValue);
	const pickerValue = computed(() => fp.value.pickerValue);
	const onPickerValueChange = computed(() => fp.value.onPickerValueChange);
	const inputReadOnly = computed(() => fp.value.inputReadOnly);
	const suffixIcon = computed(() => fp.value.suffixIcon);
	const removeIcon = computed(() => fp.value.removeIcon);
	const onFocus = computed(() => fp.value.onFocus);
	const onBlur = computed(() => fp.value.onBlur);
	const presets = computed(() => fp.value.presets);
	const components = computed(() => fp.value.components);
	const cellRender = computed(() => fp.value.cellRender);
	const dateRender = computed(() => fp.value.dateRender);
	const monthCellRender = computed(() => fp.value.monthCellRender);
	const onClick = computed(() => {
		const handler = fp.value.onClick;
		if (Array.isArray(handler)) return (event) => {
			handler.forEach((fn) => fn?.(event));
		};
		return handler;
	});
	const autoFocus = computed(() => fp.value.autoFocus ?? fp.value.autofocus);
	const tabIndex = computed(() => fp.value.tabIndex ?? fp.value.tabindex);
	const onMouseDown = computed(() => fp.value.onMouseDown ?? fp.value.onMousedown ?? (() => {}));
	const selectorRef = shallowRef();
	expose({
		nativeElement: computed(() => selectorRef.value?.nativeElement),
		focus: (options) => {
			selectorRef.value?.focus(options);
		},
		blur: () => {
			selectorRef.value?.blur();
		}
	});
	function pickerParam(values) {
		if (values === null) return null;
		return multiple.value ? values : values[0];
	}
	const toValueByFormat = (values) => {
		const parsed = pickerParam(values);
		const config = {
			generateConfig: generateConfig.value,
			locale: locale.value,
			valueFormat: valueFormat.value
		};
		if (Array.isArray(parsed)) return formatValues(parsed, config);
		return formatValue(parsed, config);
	};
	const toggleDates = useToggleDates(generateConfig, locale, internalPicker);
	const semanticCtx = useSemantic(classNames, styles);
	const [mergedOpen, triggerOpen] = useOpen(open, defaultOpen, computed(() => [disabled.value]), (open$1) => {
		onOpenChange.value?.(open$1);
	});
	const onInternalCalendarChange = (dates, dateStrings, info) => {
		if (onCalendarChange.value) {
			const filteredInfo = { ...info };
			delete filteredInfo.range;
			onCalendarChange.value(toValueByFormat(dates), pickerParam(dateStrings), filteredInfo);
		}
	};
	const onInternalOk = (dates) => {
		onOk.value?.(toValueByFormat(dates));
	};
	const [mergedValue, setInnerValue, getCalendarValue, triggerCalendarChange, triggerOk] = useInnerValue(generateConfig, locale, formatList, ref(false), order, defaultValue, value, onInternalCalendarChange, onInternalOk);
	const calendarValue = computed(() => getCalendarValue.value);
	const [focused, triggerFocus, lastOperation, activeIndex] = useRangeActive(computed(() => [disabled.value]));
	const onSharedFocus = (event) => {
		triggerFocus(true);
		onFocus.value?.(event, {});
	};
	const onSharedBlur = (event) => {
		triggerFocus(false);
		onBlur.value?.(event, {});
	};
	const mergedMode = ref(picker.value ?? mode.value);
	watch(picker, () => {
		mergedMode.value = picker.value;
	});
	const setMode = (val) => {
		mergedMode.value = val;
	};
	const internalMode = computed(() => mergedMode.value === "date" && showTime.value ? "datetime" : mergedMode.value);
	const mergedShowNow = useShowNow(picker, mergedMode, showNow, showToday);
	const onInternalChange = (dates, dateStrings) => {
		if (props?.onChange) props?.onChange?.(toValueByFormat(dates), pickerParam(dateStrings));
	};
	const [, triggerSubmitChange] = useRangeValue(computed(() => {
		return {
			...fp.value,
			onChange: onInternalChange
		};
	}), mergedValue, setInnerValue, () => getCalendarValue.value, triggerCalendarChange, computed(() => []), formatList, focused, mergedOpen, isInvalidateDate);
	const [submitInvalidates, onSelectorInvalid] = useFieldsInvalidate(calendarValue, isInvalidateDate);
	const submitInvalidate = computed(() => submitInvalidates.value.some((invalidated) => invalidated));
	const onInternalPickerValueChange = (dates, info) => {
		if (onPickerValueChange.value) {
			const cleanInfo = {
				...info,
				mode: info.mode[0]
			};
			delete cleanInfo.range;
			onPickerValueChange.value(dates[0], cleanInfo);
		}
	};
	const [currentPickerValue, setCurrentPickerValue] = useRangePickerValue(generateConfig, locale, calendarValue, computed(() => [mergedMode.value]), mergedOpen, activeIndex, internalPicker, ref(false), defaultPickerValue, pickerValue, computed(() => toArray(showTime.value?.defaultOpenValue)), onInternalPickerValueChange, minDate, maxDate);
	const triggerModeChange = (nextPickerValue, nextMode, triggerEvent) => {
		setMode(nextMode);
		if (onPanelChange.value && triggerEvent !== false) {
			const lastPickerValue = nextPickerValue || calendarValue.value[calendarValue.value.length - 1];
			onPanelChange.value(lastPickerValue, nextMode);
		}
	};
	const triggerConfirm = () => {
		triggerSubmitChange(getCalendarValue.value);
		triggerOpen(false, { force: true });
	};
	const onSelectorClick = (event) => {
		if (!disabled.value && !selectorRef.value?.nativeElement?.contains(document.activeElement)) selectorRef.value?.focus();
		triggerOpen(true);
		onClick.value?.(event);
	};
	const onSelectorClear = () => {
		triggerSubmitChange(null);
		triggerOpen(false, { force: true });
	};
	const hoverSource = ref(null);
	const internalHoverValue = ref(null);
	const hoverValues = computed(() => {
		const values = [internalHoverValue.value, ...calendarValue.value].filter((date) => date);
		return multiple.value ? values : values.slice(0, 1);
	});
	const selectorValues = computed(() => {
		if (!multiple.value && internalHoverValue.value) return [internalHoverValue.value];
		return calendarValue.value.filter((date) => date);
	});
	watch(mergedOpen, () => {
		if (!mergedOpen.value) internalHoverValue.value = null;
	});
	const onSetHover = (date, source) => {
		if (previewValue.value !== "hover") return;
		internalHoverValue.value = date;
		hoverSource.value = source;
	};
	const presetList = usePresets(presets);
	const onPresetHover = (nextValue) => {
		onSetHover(nextValue, "preset");
	};
	const onPresetSubmit = (nextValue) => {
		if (triggerSubmitChange(multiple.value ? toggleDates(getCalendarValue.value, nextValue) : [nextValue]) && !multiple.value) triggerOpen(false, { force: true });
	};
	const onNow = (now) => {
		onPresetSubmit(now);
	};
	const onPanelHover = (date) => {
		onSetHover(date, "cell");
	};
	const onPanelFocus = (event) => {
		triggerOpen(true);
		onSharedFocus(event);
	};
	const onPanelSelect = (date) => {
		lastOperation("panel");
		if (multiple.value && internalMode.value !== picker.value) return;
		triggerCalendarChange(multiple.value ? toggleDates(getCalendarValue.value, date) : [date]);
		if (!needConfirm.value && !complexPicker.value && internalPicker.value === internalMode.value) triggerConfirm();
	};
	const onPopupClose = () => {
		triggerOpen(false);
	};
	const onInternalCellRender = useCellRender(cellRender, dateRender, monthCellRender);
	const panelProps = computed(() => {
		const domProps = pickAttrs(fp.value, false);
		return {
			...omit$1(fp.value, [
				...Object.keys(domProps),
				"onChange",
				"onCalendarChange",
				"style",
				"className",
				"onPanelChange",
				"classNames",
				"styles"
			]),
			multiple: fp.value.multiple
		};
	});
	const onSelectorChange = (date) => {
		triggerCalendarChange(date);
	};
	const onSelectorInputChange = () => {
		lastOperation("input");
	};
	const onSelectorFocus = (event) => {
		lastOperation("input");
		triggerOpen(true, { inherit: true });
		onSharedFocus(event);
	};
	const onSelectorBlur = (event) => {
		triggerOpen(false);
		onSharedBlur(event);
	};
	const onSelectorKeyDown = (event, preventDefault) => {
		if (event.key === "Tab") triggerConfirm();
		onKeyDown.value?.(event, preventDefault);
	};
	providePickerContext(computed(() => {
		const [mergedClassNames, mergedStyles] = semanticCtx.value;
		return {
			prefixCls: prefixCls.value,
			locale: locale.value,
			generateConfig: generateConfig.value,
			button: components.value?.button,
			input: components.value?.input,
			classNames: mergedClassNames,
			styles: mergedStyles
		};
	}));
	watch([
		mergedOpen,
		activeIndex,
		picker
	], () => {
		if (mergedOpen.value && activeIndex.value !== void 0) triggerModeChange(null, picker.value, false);
	}, { flush: "post" });
	watch(mergedOpen, () => {
		const lastOp = lastOperation();
		if (!mergedOpen.value && lastOp === "input") {
			triggerOpen(false);
			triggerConfirm();
		}
		if (!mergedOpen.value && complexPicker.value && !needConfirm.value && lastOp === "panel") triggerConfirm();
	}, { flush: "post" });
	const popupProps = computed(() => {
		const [mergedClassNames, mergedStyles] = semanticCtx.value;
		return {
			...panelProps.value,
			showNow: mergedShowNow.value,
			showTime: showTime.value,
			disabledDate: disabledDate.value,
			onFocus: onPanelFocus,
			onBlur: onSharedBlur,
			picker: picker.value,
			mode: mergedMode.value,
			internalMode: internalMode.value,
			onPanelChange: triggerModeChange,
			format: maskFormat.value,
			value: calendarValue.value,
			isInvalid: isInvalidateDate,
			onChange: null,
			onSelect: onPanelSelect,
			pickerValue: currentPickerValue.value,
			defaultOpenValue: showTime.value?.defaultOpenValue,
			onPickerValueChange: setCurrentPickerValue,
			hoverValue: hoverValues.value,
			onHover: onPanelHover,
			needConfirm: needConfirm.value,
			onSubmit: triggerConfirm,
			onOk: triggerOk,
			presets: presetList.value,
			onPresetHover,
			onPresetSubmit,
			onNow,
			cellRender: onInternalCellRender,
			classNames: mergedClassNames,
			styles: mergedStyles
		};
	});
	return () => {
		const [mergedClassNames, mergedStyles] = semanticCtx.value;
		const panel = createVNode(Popup_default, popupProps.value, null);
		const singleSelectorProps = {
			...omit$1(fp.value, [
				"autoFocus",
				"autofocus",
				"tabIndex",
				"tabindex",
				"onClick",
				"onMouseDown",
				"onMousedown"
			]),
			class: clsx(fp.value.className, rootClassName.value, mergedClassNames.root),
			style: {
				...mergedStyles.root,
				...fp.value.style
			},
			suffixIcon: suffixIcon.value,
			removeIcon: removeIcon.value,
			activeHelp: !!internalHoverValue.value,
			allHelp: !!internalHoverValue.value && hoverSource.value === "preset",
			focused: focused.value,
			onFocus: onSelectorFocus,
			onBlur: onSelectorBlur,
			onKeyDown: onSelectorKeyDown,
			onSubmit: triggerConfirm,
			value: selectorValues.value,
			maskFormat: maskFormat.value,
			onChange: onSelectorChange,
			onInputChange: onSelectorInputChange,
			internalPicker: internalPicker.value,
			onMouseDown: onMouseDown.value,
			format: formatList.value,
			inputReadOnly: inputReadOnly.value,
			disabled: disabled.value,
			open: mergedOpen.value,
			onOpenChange: triggerOpen,
			onClick: onSelectorClick,
			onClear: onSelectorClear,
			invalid: submitInvalidate.value,
			onInvalid: (invalid) => {
				onSelectorInvalid(invalid, 0);
			}
		};
		if (autoFocus.value !== void 0) singleSelectorProps.autoFocus = autoFocus.value;
		if (tabIndex.value !== void 0) singleSelectorProps.tabIndex = tabIndex.value;
		Object.keys(singleSelectorProps).forEach((key) => {
			if (singleSelectorProps[key] === void 0) delete singleSelectorProps[key];
		});
		return createVNode(PickerTrigger_default, mergeProps(pickTriggerProps(fp.value), {
			"popupElement": panel,
			"popupStyle": mergedStyles?.popup?.root,
			"popupClassName": clsx(rootClassName.value, mergedClassNames?.popup?.root),
			"visible": mergedOpen.value,
			"onClose": onPopupClose
		}), { default: () => [createVNode(SingleSelector_default, mergeProps(singleSelectorProps, { "ref": selectorRef }), null)] });
	};
}, {
	props: {
		use12Hours: {
			type: Boolean,
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		removeIcon: {
			required: false,
			default: void 0
		},
		maxTagCount: {
			type: [Number, String],
			required: false,
			default: void 0
		},
		value: {
			required: false,
			default: void 0
		},
		defaultValue: {
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onCalendarChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onOk: {
			type: Function,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
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
		onPickerValueChange: {
			type: Function,
			required: false,
			default: void 0
		},
		presets: {
			type: Array,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mode: {
			type: String,
			required: false,
			default: void 0
		},
		onPanelChange: {
			type: Function,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		rootClassName: {
			type: String,
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
		locale: {
			type: Object,
			required: true,
			default: void 0
		},
		generateConfig: {
			type: Object,
			required: true,
			default: void 0
		},
		picker: {
			type: String,
			required: false,
			default: void 0
		},
		showTime: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		showWeek: {
			type: Boolean,
			required: false,
			default: void 0
		},
		format: {
			type: [
				String,
				Function,
				Array,
				Object
			],
			required: false,
			default: void 0
		},
		valueFormat: {
			type: String,
			required: false,
			default: void 0
		},
		prefix: {
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
		suffixIcon: {
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
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		clearIcon: {
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
		onKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		inputReadOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		order: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabledDate: {
			type: Function,
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
		defaultOpenValue: {
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false,
			default: void 0
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onOpenChange: {
			type: Function,
			required: false,
			default: void 0
		},
		popupAlign: {
			type: Object,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: Function,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false,
			default: void 0
		},
		builtinPlacements: {
			type: Object,
			required: false,
			default: void 0
		},
		needConfirm: {
			type: Boolean,
			required: false,
			default: void 0
		},
		changeOnBlur: {
			type: Boolean,
			required: false,
			default: void 0
		},
		preserveInvalidOnBlur: {
			type: Boolean,
			required: false,
			default: void 0
		},
		previewValue: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		transitionName: {
			type: String,
			required: false,
			default: void 0
		},
		components: {
			type: Object,
			required: false,
			default: void 0
		},
		inputRender: {
			type: Function,
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
		showNow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showToday: {
			type: Boolean,
			required: false,
			default: void 0
		},
		panelRender: {
			type: Function,
			required: false,
			default: void 0
		},
		renderExtraFooter: {
			type: Function,
			required: false,
			default: void 0
		},
		innerHTML: {
			type: [String, null],
			required: false,
			default: void 0
		},
		class: {
			required: false,
			default: void 0
		},
		accesskey: {
			type: [String, null],
			required: false,
			default: void 0
		},
		contenteditable: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		contextmenu: {
			type: [String, null],
			required: false,
			default: void 0
		},
		dir: {
			type: [String, null],
			required: false,
			default: void 0
		},
		draggable: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		enterkeyhint: {
			type: [String, null],
			required: false,
			default: void 0
		},
		enterKeyHint: {
			type: [String, null],
			required: false,
			default: void 0
		},
		hidden: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		inert: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		lang: {
			type: [String, null],
			required: false,
			default: void 0
		},
		spellcheck: {
			type: [
				Boolean,
				String,
				null
			],
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
		title: {
			type: [String, null],
			required: false,
			default: void 0
		},
		translate: {
			type: [String, null],
			required: false,
			default: void 0
		},
		radiogroup: {
			type: [String, null],
			required: false,
			default: void 0
		},
		role: {
			type: [String, null],
			required: false,
			default: void 0
		},
		about: {
			type: [String, null],
			required: false,
			default: void 0
		},
		datatype: {
			type: [String, null],
			required: false,
			default: void 0
		},
		inlist: {
			required: false,
			default: void 0
		},
		property: {
			type: [String, null],
			required: false,
			default: void 0
		},
		resource: {
			type: [String, null],
			required: false,
			default: void 0
		},
		typeof: {
			type: [String, null],
			required: false,
			default: void 0
		},
		vocab: {
			type: [String, null],
			required: false,
			default: void 0
		},
		autocapitalize: {
			type: [String, null],
			required: false,
			default: void 0
		},
		autocorrect: {
			type: [String, null],
			required: false,
			default: void 0
		},
		autosave: {
			type: [String, null],
			required: false,
			default: void 0
		},
		color: {
			type: [String, null],
			required: false,
			default: void 0
		},
		itemprop: {
			type: [String, null],
			required: false,
			default: void 0
		},
		itemscope: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		itemtype: {
			type: [String, null],
			required: false,
			default: void 0
		},
		itemid: {
			type: [String, null],
			required: false,
			default: void 0
		},
		itemref: {
			type: [String, null],
			required: false,
			default: void 0
		},
		results: {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		security: {
			type: [String, null],
			required: false,
			default: void 0
		},
		unselectable: {
			type: [String, null],
			required: false,
			default: void 0
		},
		inputmode: {
			type: [String, null],
			required: false,
			default: void 0
		},
		is: {
			type: [String, null],
			required: false,
			default: void 0
		},
		exportparts: {
			type: String,
			required: false,
			default: void 0
		},
		part: {
			type: String,
			required: false,
			default: void 0
		},
		"aria-activedescendant": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-atomic": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-autocomplete": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-busy": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-checked": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-colcount": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-colindex": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-colspan": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-controls": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-current": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-describedby": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-details": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-disabled": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-dropeffect": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-errormessage": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-expanded": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-flowto": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-grabbed": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-haspopup": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-hidden": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-invalid": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-keyshortcuts": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-label": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-labelledby": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-level": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-live": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-modal": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-multiline": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-multiselectable": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-orientation": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-owns": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-placeholder": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-posinset": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-pressed": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-readonly": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-relevant": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-required": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-roledescription": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-rowcount": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-rowindex": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-rowspan": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-selected": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-setsize": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-sort": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-valuemax": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-valuemin": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-valuenow": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-valuetext": {
			type: [String, null],
			required: false,
			default: void 0
		},
		onCopy: {
			type: Function,
			required: false,
			default: void 0
		},
		onCut: {
			type: Function,
			required: false,
			default: void 0
		},
		onPaste: {
			type: Function,
			required: false,
			default: void 0
		},
		onCompositionend: {
			type: Function,
			required: false,
			default: void 0
		},
		onCompositionstart: {
			type: Function,
			required: false,
			default: void 0
		},
		onCompositionupdate: {
			type: Function,
			required: false,
			default: void 0
		},
		onDrag: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragend: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragenter: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragexit: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragleave: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragover: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragstart: {
			type: Function,
			required: false,
			default: void 0
		},
		onDrop: {
			type: Function,
			required: false,
			default: void 0
		},
		onFocusin: {
			type: Function,
			required: false,
			default: void 0
		},
		onFocusout: {
			type: Function,
			required: false,
			default: void 0
		},
		onBeforeinput: {
			type: Function,
			required: false,
			default: void 0
		},
		onFormdata: {
			type: Function,
			required: false,
			default: void 0
		},
		onInput: {
			type: Function,
			required: false,
			default: void 0
		},
		onReset: {
			type: Function,
			required: false,
			default: void 0
		},
		onSubmit: {
			type: Function,
			required: false,
			default: void 0
		},
		onFullscreenchange: {
			type: Function,
			required: false,
			default: void 0
		},
		onFullscreenerror: {
			type: Function,
			required: false,
			default: void 0
		},
		onLoad: {
			type: Function,
			required: false,
			default: void 0
		},
		onError: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeydown: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeypress: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyup: {
			type: Function,
			required: false,
			default: void 0
		},
		onDblclick: {
			type: Function,
			required: false,
			default: void 0
		},
		onMousedown: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseenter: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseleave: {
			type: Function,
			required: false,
			default: void 0
		},
		onMousemove: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseout: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseover: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseup: {
			type: Function,
			required: false,
			default: void 0
		},
		onAbort: {
			type: Function,
			required: false,
			default: void 0
		},
		onCanplay: {
			type: Function,
			required: false,
			default: void 0
		},
		onCanplaythrough: {
			type: Function,
			required: false,
			default: void 0
		},
		onDurationchange: {
			type: Function,
			required: false,
			default: void 0
		},
		onEmptied: {
			type: Function,
			required: false,
			default: void 0
		},
		onEncrypted: {
			type: Function,
			required: false,
			default: void 0
		},
		onEnded: {
			type: Function,
			required: false,
			default: void 0
		},
		onLoadeddata: {
			type: Function,
			required: false,
			default: void 0
		},
		onLoadedmetadata: {
			type: Function,
			required: false,
			default: void 0
		},
		onLoadstart: {
			type: Function,
			required: false,
			default: void 0
		},
		onPause: {
			type: Function,
			required: false,
			default: void 0
		},
		onPlay: {
			type: Function,
			required: false,
			default: void 0
		},
		onPlaying: {
			type: Function,
			required: false,
			default: void 0
		},
		onProgress: {
			type: Function,
			required: false,
			default: void 0
		},
		onRatechange: {
			type: Function,
			required: false,
			default: void 0
		},
		onSeeked: {
			type: Function,
			required: false,
			default: void 0
		},
		onSeeking: {
			type: Function,
			required: false,
			default: void 0
		},
		onStalled: {
			type: Function,
			required: false,
			default: void 0
		},
		onSuspend: {
			type: Function,
			required: false,
			default: void 0
		},
		onTimeupdate: {
			type: Function,
			required: false,
			default: void 0
		},
		onVolumechange: {
			type: Function,
			required: false,
			default: void 0
		},
		onWaiting: {
			type: Function,
			required: false,
			default: void 0
		},
		onScroll: {
			type: Function,
			required: false,
			default: void 0
		},
		onScrollend: {
			type: Function,
			required: false,
			default: void 0
		},
		onTouchcancel: {
			type: Function,
			required: false,
			default: void 0
		},
		onTouchend: {
			type: Function,
			required: false,
			default: void 0
		},
		onTouchmove: {
			type: Function,
			required: false,
			default: void 0
		},
		onTouchstart: {
			type: Function,
			required: false,
			default: void 0
		},
		onAuxclick: {
			type: Function,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		},
		onContextmenu: {
			type: Function,
			required: false,
			default: void 0
		},
		onGotpointercapture: {
			type: Function,
			required: false,
			default: void 0
		},
		onLostpointercapture: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerdown: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointermove: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerup: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointercancel: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerenter: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerleave: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerover: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerout: {
			type: Function,
			required: false,
			default: void 0
		},
		onBeforetoggle: {
			type: Function,
			required: false,
			default: void 0
		},
		onToggle: {
			type: Function,
			required: false,
			default: void 0
		},
		onWheel: {
			type: Function,
			required: false,
			default: void 0
		},
		onAnimationcancel: {
			type: Function,
			required: false,
			default: void 0
		},
		onAnimationstart: {
			type: Function,
			required: false,
			default: void 0
		},
		onAnimationend: {
			type: Function,
			required: false,
			default: void 0
		},
		onAnimationiteration: {
			type: Function,
			required: false,
			default: void 0
		},
		onSecuritypolicyviolation: {
			type: Function,
			required: false,
			default: void 0
		},
		onTransitioncancel: {
			type: Function,
			required: false,
			default: void 0
		},
		onTransitionend: {
			type: Function,
			required: false,
			default: void 0
		},
		onTransitionrun: {
			type: Function,
			required: false,
			default: void 0
		},
		onTransitionstart: {
			type: Function,
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
		}
	},
	name: "SinglePicker",
	inheritAttrs: false
});
export { SinglePicker_default as default };
