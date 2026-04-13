import { useCascaderProvider } from "./context.js";
import { SHOW_PARENT, fillFieldNames, toRawValues } from "./utils/commonUtil.js";
import { toPathOptions } from "./utils/treeUtil.js";
import useMissingValues from "./hooks/useMissingValues.js";
import useOptions from "./hooks/useOptions.js";
import useSelect from "./hooks/useSelect.js";
import useValues from "./hooks/useValues.js";
import List_default from "./OptionList/List.js";
import { computed, createVNode, defineComponent, mergeDefaults, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import useEvent from "@v-c/util/dist/hooks/useEvent";
function noop() {}
var panelDefaults = {
	prefixCls: "vc-cascader",
	expandIcon: ">",
	showCheckedStrategy: SHOW_PARENT,
	notFoundContent: "Not Found"
};
var Panel_default = /* @__PURE__ */ defineComponent((props) => {
	const multiple = computed(() => !!props.checkable);
	const mergedShowCheckedStrategy = computed(() => props.showCheckedStrategy ?? panelDefaults.showCheckedStrategy);
	const internalRawValues = shallowRef(props?.value ?? props?.defaultValue);
	watch(() => props.value, () => {
		internalRawValues.value = props?.value;
	});
	const setRawValues = (values) => {
		internalRawValues.value = values;
	};
	const rawValues = computed(() => toRawValues(internalRawValues.value));
	const mergedFieldNames = computed(() => fillFieldNames(props.fieldNames));
	const [mergedOptions, getPathKeyEntities, getValueByKeyPath] = useOptions(mergedFieldNames, computed(() => props.options));
	const valuesInfo = useValues(multiple, rawValues, getPathKeyEntities, getValueByKeyPath, useMissingValues(mergedOptions, mergedFieldNames));
	const checkedValues = computed(() => valuesInfo.value[0]);
	const halfCheckedValues = computed(() => valuesInfo.value[1]);
	const missingCheckedValues = computed(() => valuesInfo.value[2]);
	const handleSelection = useSelect(multiple, useEvent((nextValues) => {
		setRawValues(nextValues);
		if (props.onChange) {
			const nextRawValues = toRawValues(nextValues);
			const valueOptions = nextRawValues.map((valueCells) => toPathOptions(valueCells, mergedOptions.value, mergedFieldNames.value).map((valueOpt) => valueOpt.option));
			const triggerValues = multiple.value ? nextRawValues : nextRawValues[0];
			const triggerOptions = multiple.value ? valueOptions : valueOptions[0];
			props.onChange(triggerValues, triggerOptions);
		}
	}), checkedValues, halfCheckedValues, missingCheckedValues, getPathKeyEntities, getValueByKeyPath, mergedShowCheckedStrategy);
	const onInternalSelect = useEvent((valuePath) => {
		handleSelection(valuePath);
	});
	useCascaderProvider(computed(() => ({
		options: mergedOptions.value,
		fieldNames: mergedFieldNames.value,
		values: checkedValues.value,
		halfValues: halfCheckedValues.value,
		changeOnSelect: props.changeOnSelect,
		onSelect: onInternalSelect,
		checkable: props.checkable,
		searchOptions: [],
		popupPrefixCls: void 0,
		loadData: props.loadData,
		expandTrigger: props.expandTrigger,
		expandIcon: props.expandIcon !== void 0 ? props.expandIcon : panelDefaults.expandIcon,
		loadingIcon: props.loadingIcon,
		popupMenuColumnStyle: void 0,
		optionRender: props.optionRender
	})));
	return () => {
		const panelPrefixCls = `${props.prefixCls ?? panelDefaults.prefixCls}-panel`;
		const isEmpty = !mergedOptions.value.length;
		return createVNode("div", {
			"class": clsx(panelPrefixCls, {
				[`${panelPrefixCls}-rtl`]: props.direction === "rtl",
				[`${panelPrefixCls}-empty`]: isEmpty
			}, props.className),
			"style": props.style
		}, [isEmpty ? props.notFoundContent ?? panelDefaults.notFoundContent : createVNode(List_default, {
			"prefixCls": props.prefixCls ?? panelDefaults.prefixCls,
			"searchValue": "",
			"multiple": multiple.value,
			"toggleOpen": noop,
			"open": true,
			"direction": props.direction,
			"disabled": props.disabled
		}, null)]);
	};
}, { props: /* @__PURE__ */ mergeDefaults({
	value: {
		required: false,
		default: void 0
	},
	defaultValue: {
		required: false,
		default: void 0
	},
	changeOnSelect: {
		type: Boolean,
		required: false,
		default: void 0
	},
	onChange: {
		type: Function,
		required: false,
		default: void 0
	},
	options: {
		type: Array,
		required: false,
		default: void 0
	},
	prefixCls: {
		type: String,
		required: false,
		default: void 0
	},
	checkable: {
		required: false,
		default: void 0
	},
	fieldNames: {
		type: Object,
		required: false,
		default: void 0
	},
	showCheckedStrategy: {
		required: false,
		default: void 0
	},
	loadData: {
		type: Function,
		required: false,
		default: void 0
	},
	expandTrigger: {
		type: String,
		required: false,
		default: void 0
	},
	expandIcon: {
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
	loadingIcon: {
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
	direction: {
		type: String,
		required: false,
		default: void 0
	},
	notFoundContent: {
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
	disabled: {
		type: Boolean,
		required: false,
		default: void 0
	},
	optionRender: {
		type: Function,
		required: false,
		default: void 0
	}
}, panelDefaults) });
export { Panel_default as default };
