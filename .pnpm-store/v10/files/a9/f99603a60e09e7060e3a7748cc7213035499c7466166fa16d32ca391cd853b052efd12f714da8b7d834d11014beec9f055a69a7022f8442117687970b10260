import { useSelectProvider } from "./SelectContext.js";
import { fillFieldNames, flattenOptions, injectPropsWithOption } from "./utils/valueUtil.js";
import OptionList_default from "./OptionList.js";
import useCache from "./hooks/useCache.js";
import { hasValue, isComboNoValue, toArray } from "./utils/commonUtil.js";
import useFilterOptions from "./hooks/useFilterOptions.js";
import useOptions from "./hooks/useOptions.js";
import useRefFunc from "./hooks/useRefFunc.js";
import useSearchConfig from "./hooks/useSearchConfig.js";
import { BaseSelect, isMultiple } from "./BaseSelect/index.js";
import { convertChildrenToData } from "./utils/legacyUtil.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, toRef, watch } from "vue";
import useId from "@v-c/util/dist/hooks/useId";
import omit from "@v-c/util/dist/omit";
import { filterEmpty } from "@v-c/util/dist/props-util";
var OMIT_DOM_PROPS = ["inputValue"];
var omitKeyList = [
	"id",
	"mode",
	"prefixCls",
	"backfill",
	"fieldNames",
	"showSearch",
	"searchValue",
	"onSearch",
	"autoClearSearchValue",
	"filterOption",
	"optionFilterProp",
	"filterSort",
	"onSelect",
	"onDeselect",
	"onActive",
	"popupMatchSelectWidth",
	"optionLabelProp",
	"options",
	"optionRender",
	"children",
	"defaultActiveFirstOption",
	"menuItemSelectedIcon",
	"virtual",
	"direction",
	"listHeight",
	"listItemHeight",
	"labelRender",
	"value",
	"defaultValue",
	"labelInValue",
	"onChange",
	"maxCount",
	"classNames",
	"styles"
];
function isRawValue(value) {
	return !value || typeof value !== "object";
}
var Select_default = /* @__PURE__ */ defineComponent({
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: false,
			default: void 0
		},
		backfill: {
			type: Boolean,
			required: false,
			default: void 0
		},
		fieldNames: {
			type: Object,
			required: false,
			default: void 0
		},
		onSearch: {
			type: Function,
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
		autoClearSearchValue: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onSelect: {
			type: Function,
			required: false,
			default: void 0
		},
		onDeselect: {
			type: Function,
			required: false,
			default: void 0
		},
		onActive: {
			type: Function,
			required: false,
			default: void 0
		},
		filterOption: {
			type: [Boolean, Function],
			required: false,
			default: void 0
		},
		filterSort: {
			type: Function,
			required: false,
			default: void 0
		},
		optionFilterProp: {
			type: String,
			required: false,
			default: void 0
		},
		optionLabelProp: {
			type: String,
			required: false,
			default: void 0
		},
		options: {
			type: Array,
			required: false,
			default: void 0
		},
		optionRender: {
			type: Function,
			required: false,
			default: void 0
		},
		defaultActiveFirstOption: {
			type: Boolean,
			required: false,
			default: void 0
		},
		virtual: {
			type: Boolean,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		listHeight: {
			type: Number,
			required: false,
			default: void 0
		},
		listItemHeight: {
			type: Number,
			required: false,
			default: void 0
		},
		labelRender: {
			type: Function,
			required: false,
			default: void 0
		},
		menuItemSelectedIcon: {
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
		mode: {
			type: String,
			required: false,
			default: void 0
		},
		labelInValue: {
			type: Boolean,
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
		maxCount: {
			type: Number,
			required: false,
			default: void 0
		},
		onChange: {
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
		onPopupVisibleChange: {
			type: Function,
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
		tokenSeparators: {
			type: Array,
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
		popupClassName: {
			type: String,
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
	}, {
		prefixCls: "vc-select",
		popupMatchSelectWidth: true,
		listHeight: 200,
		listItemHeight: 20
	}),
	name: "VcSelect",
	inheritAttrs: false,
	setup(props, { attrs, expose, slots }) {
		const baseSelectRef = shallowRef(null);
		expose({
			focus: () => baseSelectRef.value?.focus(),
			blur: () => baseSelectRef.value?.blur(),
			scrollTo: (arg) => baseSelectRef.value?.scrollTo?.(arg)
		});
		const mergedId = useId(props.id);
		const multiple = computed(() => isMultiple(props.mode));
		const [mergedShowSearch, searchConfig] = useSearchConfig(toRef(props, "showSearch"), {
			filterOption: toRef(props, "filterOption"),
			searchValue: toRef(props, "searchValue"),
			optionFilterProp: toRef(props, "optionFilterProp"),
			filterSort: toRef(props, "filterSort"),
			onSearch: toRef(props, "onSearch"),
			autoClearSearchValue: toRef(props, "autoClearSearchValue")
		}, toRef(props, "mode"));
		const normalizedOptionFilterProps = computed(() => {
			return searchConfig.value?.optionFilterProp;
		});
		const mergedFilterOption = computed(() => {
			if (searchConfig.value.filterOption === void 0 && props.mode === "combobox") return false;
			return searchConfig.value.filterOption;
		});
		const mergedFieldNames = computed(() => fillFieldNames(props.fieldNames, false));
		const internalSearchValue = shallowRef(props.searchValue || "");
		watch(() => props.searchValue, (val) => {
			if (val !== void 0) internalSearchValue.value = val;
		});
		const setSearchValue = (val) => {
			internalSearchValue.value = val;
		};
		const mergedSearchValue = computed(() => internalSearchValue.value || "");
		const childrenOptionsRef = shallowRef([]);
		const parsedOptions = useOptions(toRef(props, "options"), childrenOptionsRef, mergedFieldNames, normalizedOptionFilterProps, toRef(props, "optionLabelProp"));
		const valueOptions = computed(() => parsedOptions.value.valueOptions);
		const labelOptions = computed(() => parsedOptions.value.labelOptions);
		const mergedOptions = computed(() => parsedOptions.value.options);
		const convert2LabelValues = (draftValues) => {
			return toArray(draftValues).map((val) => {
				let rawValue;
				let rawLabel;
				let rawDisabled;
				let rawTitle;
				if (isRawValue(val)) rawValue = val;
				else {
					rawLabel = val.label;
					rawValue = val.value;
				}
				const option = valueOptions.value.get(rawValue);
				if (option) {
					if (rawLabel === void 0) rawLabel = option?.[props.optionLabelProp || mergedFieldNames.value.label];
					rawDisabled = option?.disabled;
					rawTitle = option?.title;
				}
				return {
					label: rawLabel,
					value: rawValue,
					key: rawValue,
					disabled: rawDisabled,
					title: rawTitle
				};
			});
		};
		const internalValue = shallowRef(props?.value ?? props.defaultValue);
		watch(() => props.value, (val) => {
			if (val !== internalValue.value) internalValue.value = val;
		});
		const setInternalValue = (val) => {
			internalValue.value = val;
		};
		const [mergedValues, getMixedOption] = useCache(computed(() => {
			const values = convert2LabelValues(multiple.value && internalValue.value === null ? [] : internalValue.value);
			if (props.mode === "combobox" && isComboNoValue(values[0]?.value)) return [];
			return values;
		}), valueOptions);
		const displayValues = computed(() => {
			if (!props.mode && mergedValues.value.length === 1) {
				const firstValue = mergedValues.value[0];
				if ((firstValue.value === null || firstValue.value === "") && (firstValue.label === null || firstValue.label === void 0)) return [];
			}
			return mergedValues.value.map((item) => ({
				...item,
				label: (typeof props.labelRender === "function" ? props.labelRender(item) : item.label) ?? item.value
			}));
		});
		const rawValues = computed(() => new Set(mergedValues.value.map((val) => val.value)));
		watch(mergedValues, () => {
			if (props.mode === "combobox") {
				const strValue = mergedValues.value[0]?.value;
				setSearchValue(hasValue(strValue) ? String(strValue) : "");
			}
		});
		const createTagOption = useRefFunc((val, label) => {
			const mergedLabel = label ?? val;
			return {
				[mergedFieldNames.value.value]: val,
				[mergedFieldNames.value.label]: mergedLabel
			};
		});
		const filteredOptions = useFilterOptions(computed(() => {
			if (props.mode !== "tags") return mergedOptions.value;
			const cloneOptions = [...mergedOptions.value];
			const existOptions = (val) => valueOptions.value.has(val);
			[...mergedValues.value].sort((a, b) => a.value < b.value ? -1 : 1).forEach((item) => {
				const val = item.value;
				if (!existOptions(val)) cloneOptions.push(createTagOption(val, item.label));
			});
			return cloneOptions;
		}), mergedFieldNames, mergedSearchValue, mergedFilterOption, normalizedOptionFilterProps);
		const filledSearchOptions = computed(() => {
			if (props.mode !== "tags" || !mergedSearchValue.value || filteredOptions.value.some((item) => item[props.optionFilterProp || "value"] === mergedSearchValue.value)) return filteredOptions.value;
			if (filteredOptions.value.some((item) => item[mergedFieldNames.value.value] === mergedSearchValue.value)) return filteredOptions.value;
			return [createTagOption(mergedSearchValue.value), ...filteredOptions.value];
		});
		const sorter = (inputOptions) => {
			return [...inputOptions].sort((a, b) => searchConfig.value.filterSort(a, b, { searchValue: mergedSearchValue.value })).map((item) => {
				if (Array.isArray(item.options)) return {
					...item,
					options: item.options.length > 0 ? sorter(item.options) : item.options
				};
				return item;
			});
		};
		const orderedFilteredOptions = computed(() => {
			if (!searchConfig.value.filterSort) return filledSearchOptions.value;
			return sorter(filledSearchOptions.value);
		});
		const displayOptions = computed(() => flattenOptions(orderedFilteredOptions.value, {
			fieldNames: mergedFieldNames.value,
			childrenAsData: false
		}));
		const triggerChange = (values) => {
			const labeledValues = convert2LabelValues(values);
			const prevValues = mergedValues.value;
			setInternalValue(labeledValues);
			const onChange = props.onChange;
			if (onChange && (labeledValues.length !== prevValues.length || labeledValues.some((newVal, index) => prevValues[index]?.value !== newVal?.value))) {
				const returnValues = props.labelInValue ? labeledValues.map(({ label: l, value: v }) => ({
					label: l,
					value: v
				})) : labeledValues.map((v) => v.value);
				const returnOptions = labeledValues.map((v) => injectPropsWithOption(getMixedOption(v.value)));
				onChange(multiple.value ? returnValues : returnValues[0], multiple.value ? returnOptions : returnOptions[0]);
			}
		};
		const activeValue = shallowRef(null);
		const accessibilityIndex = shallowRef(0);
		const mergedDefaultActiveFirstOption = computed(() => props.defaultActiveFirstOption !== void 0 ? props.defaultActiveFirstOption : props.mode !== "combobox");
		const onActiveValue = (active, index, { source = "keyboard" } = {}) => {
			accessibilityIndex.value = index;
			if (props.backfill && props.mode === "combobox" && active !== null && source === "keyboard") activeValue.value = String(active);
			props.onActive?.(active);
		};
		const triggerSelect = (val, selected, type) => {
			const getSelectEnt = () => {
				const option = getMixedOption(val);
				return [props.labelInValue ? {
					label: option?.[mergedFieldNames.value.label],
					value: val
				} : val, injectPropsWithOption(option)];
			};
			if (selected && props.onSelect) {
				const [wrappedValue, option] = getSelectEnt();
				props.onSelect(wrappedValue, option);
			} else if (!selected && props.onDeselect && type !== "clear") {
				const [wrappedValue, option] = getSelectEnt();
				props.onDeselect(wrappedValue, option);
			}
		};
		const onInternalSelect = useRefFunc((val, info) => {
			let cloneValues;
			const mergedSelect = multiple.value ? info.selected : true;
			if (mergedSelect) cloneValues = multiple.value ? [...mergedValues.value, val] : [val];
			else cloneValues = mergedValues.value.filter((v) => v.value !== val);
			triggerChange(cloneValues);
			triggerSelect(val, mergedSelect);
			if (props.mode === "combobox") activeValue.value = "";
			else if (!multiple.value || searchConfig.value.autoClearSearchValue) {
				setSearchValue("");
				activeValue.value = "";
			}
		});
		const onDisplayValuesChange = (nextValues, info) => {
			triggerChange(nextValues);
			const { type, values } = info;
			if (type === "remove" || type === "clear") values.forEach((item) => {
				triggerSelect(item.value, false, type);
			});
		};
		const onInternalSearch = (searchText, info) => {
			setSearchValue(searchText);
			activeValue.value = null;
			if (info.source === "submit") {
				const formatted = (searchText || "").trim();
				if (formatted) {
					triggerChange(Array.from(new Set([...rawValues.value, formatted])));
					triggerSelect(formatted, true);
					setSearchValue("");
				}
				return;
			}
			if (info.source !== "blur") {
				if (props.mode === "combobox") triggerChange(searchText);
				searchConfig.value.onSearch?.(searchText);
			}
		};
		const onInternalSearchSplit = (words) => {
			let patchValues = words;
			if (props.mode !== "tags") patchValues = words.map((word) => {
				return labelOptions.value.get(word)?.[mergedFieldNames.value.value];
			}).filter((val) => val !== void 0);
			const newRawValues = Array.from(new Set([...rawValues.value, ...patchValues]));
			triggerChange(newRawValues);
			newRawValues.forEach((newRawValue) => {
				triggerSelect(newRawValue, true);
			});
		};
		useSelectProvider(computed(() => {
			const realVirtual = props.virtual !== false && props.popupMatchSelectWidth !== false;
			return {
				...parsedOptions.value,
				flattenOptions: displayOptions.value,
				onActiveValue,
				defaultActiveFirstOption: mergedDefaultActiveFirstOption.value,
				onSelect: onInternalSelect,
				menuItemSelectedIcon: props.menuItemSelectedIcon,
				rawValues: rawValues.value,
				fieldNames: mergedFieldNames.value,
				virtual: realVirtual,
				direction: props.direction,
				listHeight: props.listHeight,
				listItemHeight: props.listItemHeight,
				childrenAsData: false,
				maxCount: props.maxCount,
				optionRender: props.optionRender,
				classNames: props.classNames,
				styles: props.styles
			};
		}));
		let lastChildrenKey = "";
		return () => {
			if (!props.options || props.options.length === 0) {
				const newChildrenOptions = convertChildrenToData(filterEmpty(slots?.default?.() ?? []));
				const newKey = newChildrenOptions.map((o) => `${o.value}`).join(",");
				if (lastChildrenKey !== newKey) {
					lastChildrenKey = newKey;
					childrenOptionsRef.value = newChildrenOptions;
				}
			}
			const restAttrs = { ...attrs };
			const restProps = omit(props, omitKeyList);
			const { prefixCls, mode, classNames, styles, maxCount, placeholder, direction, popupMatchSelectWidth } = props;
			return createVNode(BaseSelect, mergeProps(restAttrs, restProps, {
				"placeholder": placeholder,
				"id": mergedId,
				"prefixCls": prefixCls,
				"ref": (el) => {
					baseSelectRef.value = el;
				},
				"omitDomProps": OMIT_DOM_PROPS,
				"mode": mode,
				"classNames": classNames,
				"styles": styles,
				"displayValues": displayValues.value,
				"onDisplayValuesChange": onDisplayValuesChange,
				"maxCount": maxCount,
				"direction": direction,
				"showSearch": mergedShowSearch.value,
				"searchValue": mergedSearchValue.value,
				"onSearch": onInternalSearch,
				"autoClearSearchValue": searchConfig.value.autoClearSearchValue,
				"onSearchSplit": onInternalSearchSplit,
				"popupMatchSelectWidth": popupMatchSelectWidth,
				"OptionList": OptionList_default,
				"emptyOptions": !displayOptions.value.length,
				"activeValue": activeValue.value || void 0,
				"activeDescendantId": `${mergedId}_list_${accessibilityIndex.value}`
			}), null);
		};
	}
});
export { Select_default as default };
