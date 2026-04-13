import { useCascaderProvider } from "./context.js";
import useSearchOptions_default from "./hooks/useSearchOptions.js";
import { SHOW_PARENT, fillFieldNames, toPathKeys, toRawValues } from "./utils/commonUtil.js";
import { formatStrategyValues, toPathOptions } from "./utils/treeUtil.js";
import useDisplayValues_default from "./hooks/useDisplayValues.js";
import useMissingValues from "./hooks/useMissingValues.js";
import useOptions from "./hooks/useOptions.js";
import useSearchConfig from "./hooks/useSearchConfig.js";
import useSelect from "./hooks/useSelect.js";
import useValues from "./hooks/useValues.js";
import OptionList_default from "./OptionList/index.js";
import { warningNullOptions } from "./utils/warningPropsUtil.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { BaseSelect } from "@v-c/select";
import { useId, useMergedState } from "@v-c/util";
import useEvent from "@v-c/util/dist/hooks/useEvent";
import omit from "@v-c/util/dist/omit";
var cascaderDefaults = {
	prefixCls: "vc-cascader",
	expandIcon: ">",
	showCheckedStrategy: SHOW_PARENT,
	popupMatchSelectWidth: false
};
var omitKeyList = [
	"id",
	"prefixCls",
	"fieldNames",
	"optionRender",
	"value",
	"defaultValue",
	"onChange",
	"changeOnSelect",
	"displayRender",
	"checkable",
	"showCheckedStrategy",
	"showSearch",
	"searchValue",
	"onSearch",
	"autoClearSearchValue",
	"expandTrigger",
	"options",
	"popupPrefixCls",
	"loadData",
	"popupMenuColumnStyle",
	"popupClassName",
	"popupStyle",
	"open",
	"placement",
	"builtinPlacements",
	"onPopupVisibleChange",
	"popupMatchSelectWidth",
	"expandIcon",
	"loadingIcon",
	"classNames",
	"styles"
];
var Cascader_default = /* @__PURE__ */ defineComponent((props, { attrs, slots, expose }) => {
	const baseSelectRef = shallowRef(null);
	expose({
		focus: (options) => baseSelectRef.value?.focus(options),
		blur: () => baseSelectRef.value?.blur(),
		nativeElement: computed(() => baseSelectRef.value?.nativeElement)
	});
	const mergedId = useId(props.id);
	const multiple = computed(() => !!props.checkable);
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
	const [mergedShowSearch, searchConfig] = useSearchConfig(computed(() => props.showSearch), computed(() => ({
		autoClearSearchValue: props.autoClearSearchValue,
		searchValue: props.searchValue,
		onSearch: props.onSearch
	})));
	const mergedAutoClearSearchValue = computed(() => searchConfig.value.autoClearSearchValue !== false);
	const mergedShowCheckedStrategy = computed(() => props.showCheckedStrategy ?? cascaderDefaults.showCheckedStrategy);
	const [internalSearchValue, setSearchValue] = useMergedState("", { value: computed(() => searchConfig.value.searchValue) });
	const mergedSearchValue = computed(() => internalSearchValue.value || "");
	const onInternalSearch = (searchText, info) => {
		setSearchValue(searchText);
		if (info.source !== "blur") searchConfig.value.onSearch?.(searchText);
	};
	const searchOptions = useSearchOptions_default(mergedSearchValue, mergedOptions, mergedFieldNames, computed(() => props.popupPrefixCls || props.prefixCls || cascaderDefaults.prefixCls), searchConfig, computed(() => !!props.changeOnSelect || multiple.value));
	const valuesInfo = useValues(multiple, rawValues, getPathKeyEntities, getValueByKeyPath, useMissingValues(mergedOptions, mergedFieldNames));
	const checkedValues = computed(() => valuesInfo.value[0]);
	const halfCheckedValues = computed(() => valuesInfo.value[1]);
	const missingCheckedValues = computed(() => valuesInfo.value[2]);
	const displayValues = useDisplayValues_default(computed(() => {
		const deduplicateKeys = formatStrategyValues(toPathKeys(checkedValues.value), getPathKeyEntities, mergedShowCheckedStrategy.value);
		return [...missingCheckedValues.value, ...getValueByKeyPath(deduplicateKeys)];
	}), mergedOptions, mergedFieldNames, multiple, computed(() => props.displayRender));
	const triggerChange = useEvent((nextValues) => {
		setRawValues(nextValues);
		if (props.onChange) {
			const nextRawValues = toRawValues(nextValues);
			const valueOptions = nextRawValues.map((valueCells) => toPathOptions(valueCells, mergedOptions.value, mergedFieldNames.value).map((valueOpt) => valueOpt.option));
			const triggerValues = multiple.value ? nextRawValues : nextRawValues[0];
			const triggerOptions = multiple.value ? valueOptions : valueOptions[0];
			props.onChange(triggerValues, triggerOptions);
		}
	});
	const handleSelection = useSelect(multiple, triggerChange, checkedValues, halfCheckedValues, missingCheckedValues, getPathKeyEntities, getValueByKeyPath, mergedShowCheckedStrategy);
	const onInternalSelect = useEvent((valuePath) => {
		if (!multiple.value || mergedAutoClearSearchValue.value) setSearchValue("");
		handleSelection(valuePath);
	});
	const onDisplayValuesChange = (_, info) => {
		if (info.type === "clear") {
			triggerChange([]);
			return;
		}
		const { valueCells } = info.values[0];
		onInternalSelect(valueCells);
	};
	const onInternalPopupVisibleChange = (nextVisible) => {
		props.onPopupVisibleChange?.(nextVisible);
	};
	if (process.env.NODE_ENV !== "production") warningNullOptions(mergedOptions.value, mergedFieldNames.value);
	useCascaderProvider(computed(() => ({
		classNames: props.classNames,
		styles: props.styles,
		options: mergedOptions.value,
		fieldNames: mergedFieldNames.value,
		values: checkedValues.value,
		halfValues: halfCheckedValues.value,
		changeOnSelect: props.changeOnSelect,
		onSelect: onInternalSelect,
		checkable: props.checkable,
		searchOptions: searchOptions.value,
		popupPrefixCls: props.popupPrefixCls,
		loadData: props.loadData,
		expandTrigger: props.expandTrigger,
		expandIcon: props.expandIcon !== void 0 ? props.expandIcon : cascaderDefaults.expandIcon,
		loadingIcon: props.loadingIcon,
		popupMenuColumnStyle: props.popupMenuColumnStyle,
		optionRender: props.optionRender
	})));
	const emptyOptions = computed(() => {
		return !(mergedSearchValue.value ? searchOptions.value : mergedOptions.value).length;
	});
	const popupStyle = computed(() => mergedSearchValue.value && searchConfig.value.matchInputWidth || emptyOptions.value ? {} : { minWidth: "auto" });
	return () => {
		const restProps = omit(props, omitKeyList);
		const rawInputElement = slots.default ? () => slots.default?.()[0] : void 0;
		return createVNode(BaseSelect, mergeProps(attrs, restProps, {
			"ref": (el) => {
				baseSelectRef.value = el;
			},
			"id": mergedId,
			"prefixCls": props.prefixCls ?? cascaderDefaults.prefixCls,
			"autoClearSearchValue": mergedAutoClearSearchValue.value,
			"popupMatchSelectWidth": props.popupMatchSelectWidth ?? cascaderDefaults.popupMatchSelectWidth,
			"classNames": props.classNames,
			"styles": props.styles,
			"popupStyle": {
				...popupStyle.value,
				...props.popupStyle
			},
			"displayValues": displayValues.value,
			"onDisplayValuesChange": onDisplayValuesChange,
			"mode": multiple.value ? "multiple" : void 0,
			"searchValue": mergedSearchValue.value,
			"onSearch": onInternalSearch,
			"showSearch": mergedShowSearch.value,
			"OptionList": OptionList_default,
			"emptyOptions": emptyOptions.value,
			"open": props.open,
			"popupClassName": props.popupClassName,
			"placement": props.placement,
			"builtinPlacements": props.builtinPlacements,
			"onPopupVisibleChange": onInternalPopupVisibleChange,
			"getRawInputElement": rawInputElement
		}), null);
	};
}, { props: /* @__PURE__ */ mergeDefaults({
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
	checkable: {
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
	id: {
		type: String,
		required: false,
		default: void 0
	},
	prefixCls: {
		type: String,
		required: false,
		default: void 0
	},
	fieldNames: {
		type: Object,
		required: false,
		default: void 0
	},
	optionRender: {
		type: Function,
		required: false,
		default: void 0
	},
	changeOnSelect: {
		type: Boolean,
		required: false,
		default: void 0
	},
	displayRender: {
		type: Function,
		required: false,
		default: void 0
	},
	showCheckedStrategy: {
		required: false,
		default: void 0
	},
	autoClearSearchValue: {
		type: Boolean,
		required: false,
		default: void 0
	},
	showSearch: {
		type: [Boolean, Object],
		required: false,
		default: void 0
	},
	searchValue: {
		type: String,
		required: false,
		default: void 0
	},
	onSearch: {
		type: Function,
		required: false,
		default: void 0
	},
	expandTrigger: {
		type: String,
		required: false,
		default: void 0
	},
	options: {
		type: Array,
		required: false,
		default: void 0
	},
	popupPrefixCls: {
		type: String,
		required: false,
		default: void 0
	},
	loadData: {
		type: Function,
		required: false,
		default: void 0
	},
	popupClassName: {
		type: String,
		required: false,
		default: void 0
	},
	popupMenuColumnStyle: {
		type: Object,
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
	onPopupVisibleChange: {
		type: Function,
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
	tagRender: {
		type: Function,
		required: false,
		default: void 0
	},
	direction: {
		type: String,
		required: false,
		default: void 0
	},
	autoFocus: {
		type: Boolean,
		required: false,
		default: void 0
	},
	placeholder: {
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
	maxCount: {
		type: Number,
		required: false,
		default: void 0
	},
	title: {
		type: String,
		required: false,
		default: void 0
	},
	tabIndex: {
		type: Number,
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
	onClear: {
		type: Function,
		required: false,
		default: void 0
	},
	maxLength: {
		type: Number,
		required: false,
		default: void 0
	},
	showScrollBar: {
		type: [Boolean, String],
		required: false,
		default: void 0
	},
	choiceTransitionName: {
		type: String,
		required: false,
		default: void 0
	},
	disabled: {
		type: Boolean,
		required: false,
		default: void 0
	},
	loading: {
		type: Boolean,
		required: false,
		default: void 0
	},
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
	getInputElement: {
		type: Function,
		required: false,
		default: void 0
	},
	getRawInputElement: {
		type: Function,
		required: false,
		default: void 0
	},
	maxTagTextLength: {
		type: Number,
		required: false,
		default: void 0
	},
	maxTagCount: {
		type: [Number, String],
		required: false,
		default: void 0
	},
	maxTagPlaceholder: {
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
	suffix: {
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
	removeIcon: {
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
	animation: {
		type: String,
		required: false,
		default: void 0
	},
	transitionName: {
		type: String,
		required: false,
		default: void 0
	},
	popupStyle: {
		type: Object,
		required: false,
		default: void 0
	},
	popupMatchSelectWidth: {
		type: [Boolean, Number],
		required: false,
		default: void 0
	},
	popupRender: {
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
	showAction: {
		type: Array,
		required: false,
		default: void 0
	},
	onBlur: {
		type: Function,
		required: false,
		default: void 0
	},
	onFocus: {
		type: Function,
		required: false,
		default: void 0
	},
	onKeyUp: {
		type: Function,
		required: false,
		default: void 0
	},
	onKeyDown: {
		type: Function,
		required: false,
		default: void 0
	},
	onMouseDown: {
		type: Function,
		required: false,
		default: void 0
	},
	onPopupScroll: {
		type: Function,
		required: false,
		default: void 0
	},
	onInputKeyDown: {
		type: Function,
		required: false,
		default: void 0
	},
	onMouseEnter: {
		type: Function,
		required: false,
		default: void 0
	},
	onMouseLeave: {
		type: Function,
		required: false,
		default: void 0
	},
	onClick: {
		type: Function,
		required: false,
		default: void 0
	},
	components: {
		type: Object,
		required: false,
		default: void 0
	}
}, cascaderDefaults) });
export { Cascader_default as default };
