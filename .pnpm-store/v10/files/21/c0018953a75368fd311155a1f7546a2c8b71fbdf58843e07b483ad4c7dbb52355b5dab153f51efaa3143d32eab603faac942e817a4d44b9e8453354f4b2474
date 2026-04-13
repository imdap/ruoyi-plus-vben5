import { toArray } from "../../utils/miscUtil.js";
import { parseValue } from "../../utils/valueUtil.js";
import useLocale from "../../hooks/useLocale.js";
import { fillShowTimeConfig, getTimeProps } from "../../hooks/useTimeConfig.js";
import { fillClearIcon } from "../Selector/hooks/useClearIcon.js";
import useDisabledBoundary from "./useDisabledBoundary.js";
import { useFieldFormat } from "./useFieldFormat.js";
import useInputReadOnly from "./useInputReadOnly.js";
import useInvalidate from "./useInvalidate.js";
import { computed } from "vue";
import { warning } from "@v-c/util";
function useList(value, fillMode = false, transform) {
	return computed(() => {
		const val = value.value;
		const list = val === null || val === void 0 ? val : toArray(val).map((item) => transform ? transform(item) : item);
		if (fillMode && list && Array.isArray(list)) {
			const clone = [...list];
			clone[1] = clone[1] || clone[0];
			return clone;
		}
		return list;
	});
}
function useFilledProps(props, updater) {
	const mergedPicker = computed(() => props.value.picker || "date");
	const mergedPrefixCls = computed(() => props.value.prefixCls || "vc-picker");
	const mergedPreviewValue = computed(() => props.value.previewValue ?? "hover");
	const mergedStyles = computed(() => props.value.styles || {});
	const mergedClassNames = computed(() => props.value.classNames || {});
	const mergedOrder = computed(() => props.value.order ?? true);
	const mergedComponents = computed(() => ({
		input: props.value.inputRender,
		...props.value.components
	}));
	const internalPicker = computed(() => mergedPicker.value === "date" && props.value.showTime ? "datetime" : mergedPicker.value);
	const multipleInteractivePicker = computed(() => internalPicker.value === "time" || internalPicker.value === "datetime");
	const complexPicker = computed(() => multipleInteractivePicker.value || props.value.multiple);
	const mergedNeedConfirm = computed(() => {
		return props.value.needConfirm ?? multipleInteractivePicker.value;
	});
	const timePropsInfo = computed(() => getTimeProps(props.value));
	const timeProps = computed(() => timePropsInfo.value[0]);
	const localeTimeProps = computed(() => timePropsInfo.value[1]);
	const showTimeFormat = computed(() => timePropsInfo.value[2]);
	const propFormat = computed(() => timePropsInfo.value[3]);
	const mergedLocale = useLocale(computed(() => props.value.locale), localeTimeProps);
	const valueFormat = computed(() => props.value.valueFormat);
	const parseByValueFormat = (val) => parseValue(val, {
		generateConfig: props.value.generateConfig,
		locale: mergedLocale.value,
		valueFormat: valueFormat.value
	});
	const mergedShowTime = computed(() => fillShowTimeConfig(internalPicker.value, showTimeFormat.value, propFormat.value, timeProps.value, mergedLocale.value));
	const values = useList(computed(() => props.value.value), false, parseByValueFormat);
	const defaultValues = useList(computed(() => props.value.defaultValue), false, parseByValueFormat);
	const pickerValues = useList(computed(() => props.value.pickerValue), false, parseByValueFormat);
	const defaultPickerValues = useList(computed(() => props.value.defaultPickerValue), false, parseByValueFormat);
	if (process.env.NODE_ENV !== "production") {
		if (mergedPicker.value === "time") {
			if ([
				"disabledHours",
				"disabledMinutes",
				"disabledSeconds"
			].some((key) => props[key])) warning(false, `'disabledHours', 'disabledMinutes', 'disabledSeconds' will be removed in the next major version, please use 'disabledTime' instead.`);
		}
	}
	const filledProps = computed(() => ({
		...props.value,
		previewValue: mergedPreviewValue.value,
		prefixCls: mergedPrefixCls.value,
		locale: mergedLocale.value,
		picker: mergedPicker.value,
		styles: mergedStyles.value,
		classNames: mergedClassNames.value,
		order: mergedOrder.value,
		components: mergedComponents.value,
		clearIcon: fillClearIcon(mergedPrefixCls.value, props.value.allowClear, props.value.clearIcon),
		showTime: mergedShowTime.value,
		value: values.value,
		defaultValue: defaultValues.value,
		pickerValue: pickerValues.value,
		defaultPickerValue: defaultPickerValues.value,
		...updater?.()
	}));
	const [formatList, maskFormat] = useFieldFormat(internalPicker, mergedLocale, computed(() => props.value.format));
	const mergedInputReadOnly = useInputReadOnly(formatList, computed(() => props.value.inputReadOnly), computed(() => props.value.multiple));
	const disabledBoundaryDate = useDisabledBoundary(computed(() => props.value.generateConfig), computed(() => props.value.locale), computed(() => props.value.disabledDate), computed(() => props.value.minDate), computed(() => props.value.maxDate));
	const isInvalidateDate = useInvalidate(computed(() => props.value.generateConfig), mergedPicker, disabledBoundaryDate, mergedShowTime);
	return [
		computed(() => {
			return {
				...filledProps.value,
				needConfirm: mergedNeedConfirm.value,
				inputReadOnly: mergedInputReadOnly.value,
				disabledDate: disabledBoundaryDate
			};
		}),
		internalPicker,
		complexPicker,
		formatList,
		maskFormat,
		isInvalidateDate
	];
}
export { useFilledProps as default };
