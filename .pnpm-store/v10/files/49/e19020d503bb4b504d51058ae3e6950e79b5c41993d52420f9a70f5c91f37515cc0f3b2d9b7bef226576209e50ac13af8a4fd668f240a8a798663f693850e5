import useBaseProps from "../../hooks/useBaseProps.js";
import { useSelectContext } from "../../SelectContext.js";
import { getTitle } from "../../utils/commonUtil.js";
import { useSelectInputContext } from "../context.js";
import Input_default from "../Input.js";
import Placeholder_default from "./Placeholder.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
var SingleContent_default = /* @__PURE__ */ defineComponent((props, { expose }) => {
	const selectInputContext = useSelectInputContext();
	const baseProps = useBaseProps();
	const selectContext = useSelectContext();
	const inputChanged = shallowRef(false);
	const combobox = computed(() => selectInputContext.value?.mode === "combobox");
	const displayValue = computed(() => selectInputContext.value?.displayValues[0]);
	const mergedSearchValue = computed(() => {
		if (combobox.value && selectInputContext.value?.activeValue && !inputChanged.value && baseProps.value?.triggerOpen) return selectInputContext.value.activeValue;
		return baseProps.value?.showSearch ? selectInputContext.value?.searchValue : "";
	});
	const optionClassName = computed(() => {
		if (displayValue.value && selectContext.value?.flattenOptions) {
			const option = selectContext.value.flattenOptions.find((opt) => opt.value === displayValue.value?.value);
			if (option?.data) return option.data.className || option.data.class;
		}
	});
	const optionStyle = computed(() => {
		if (displayValue.value && selectContext.value?.flattenOptions) {
			const option = selectContext.value.flattenOptions.find((opt) => opt.value === displayValue.value?.value);
			if (option?.data) return option.data.style;
		}
	});
	const optionTitle = computed(() => {
		let titleValue;
		if (displayValue.value && selectContext.value?.flattenOptions) {
			const option = selectContext.value.flattenOptions.find((opt) => opt.value === displayValue.value?.value);
			if (option?.data) titleValue = getTitle(option.data);
		}
		if (displayValue.value && !titleValue) titleValue = getTitle(displayValue.value);
		if (baseProps.value?.title !== void 0) titleValue = baseProps.value.title;
		return titleValue;
	});
	const hasOptionStyle = computed(() => !!optionClassName.value || !!optionStyle.value);
	watch([combobox, () => selectInputContext.value?.activeValue], () => {
		if (combobox.value) inputChanged.value = false;
	}, { immediate: true });
	const inputRef = shallowRef();
	expose({ input: computed(() => inputRef.value?.input) });
	return () => {
		const { prefixCls, mode, maxLength, components } = selectInputContext.value ?? {};
		const { classNames, styles } = baseProps.value ?? {};
		const { inputProps } = props;
		const showHasValueCls = displayValue.value && displayValue.value.label !== null && displayValue.value.label !== void 0 && String(displayValue.value.label).trim() !== "";
		const renderValue = !(combobox && components?.input) ? displayValue.value ? hasOptionStyle.value ? createVNode("div", {
			"class": clsx(`${prefixCls}-content-value`, optionClassName.value),
			"style": {
				...mergedSearchValue.value ? { visibility: "hidden" } : {},
				...optionStyle.value
			},
			"title": optionTitle.value
		}, [displayValue.value?.label]) : displayValue.value?.label : createVNode(Placeholder_default, { "show": !mergedSearchValue.value }, null) : null;
		return createVNode("div", {
			"class": clsx(`${prefixCls}-content`, showHasValueCls && `${prefixCls}-content-has-value`, mergedSearchValue.value && `${prefixCls}-content-has-search-value`, hasOptionStyle.value && `${prefixCls}-content-has-option-style`, classNames?.content),
			"style": styles?.content,
			"title": hasOptionStyle.value ? void 0 : optionTitle.value
		}, [renderValue, createVNode(Input_default, mergeProps(inputProps, {
			"value": mergedSearchValue.value,
			"maxLength": mode === "combobox" ? maxLength : void 0,
			"onChange": (e) => {
				inputChanged.value = true;
				inputProps.onChange?.(e);
			},
			"ref": inputRef
		}), null)]);
	};
}, {
	props: { inputProps: {
		type: Object,
		required: true,
		default: void 0
	} },
	name: "SingleContent",
	inheritAttrs: false
});
export { SingleContent_default as default };
