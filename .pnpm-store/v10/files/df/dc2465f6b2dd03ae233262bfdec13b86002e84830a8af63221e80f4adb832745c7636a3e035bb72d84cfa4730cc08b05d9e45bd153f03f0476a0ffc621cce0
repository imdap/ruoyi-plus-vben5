import { useLegacyProvider } from "./LegacyContext.js";
import { useTreeSelectProvider } from "./TreeSelectContext.js";
import { fillFieldNames, isNil, toArray } from "./utils/valueUtil.js";
import OptionList_default from "./OptionList.js";
import useCache from "./hooks/useCache.js";
import useCheckedKeys from "./hooks/useCheckedKeys.js";
import useDataEntities from "./hooks/useDataEntities.js";
import { convertChildrenToData, fillAdditionalInfo, fillLegacyProps } from "./utils/legacyUtil.js";
import useFilterTreeData from "./hooks/useFilterTreeData.js";
import useRefFunc from "./hooks/useRefFunc.js";
import useSearchConfig from "./hooks/useSearchConfig.js";
import useTreeData from "./hooks/useTreeData.js";
import { SHOW_ALL, SHOW_CHILD, formatStrategyValues } from "./utils/strategyUtil.js";
import warningProps from "./utils/warningPropsUtil.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { BaseSelect } from "@v-c/select";
import { conductCheck } from "@v-c/tree";
import { omit, useId, useMergedState } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
function isRawValue(value) {
	return !value || typeof value !== "object";
}
var defaults = {
	prefixCls: "vc-tree-select",
	listHeight: 200,
	listItemHeight: 20,
	listItemScrollOffset: 0,
	popupMatchSelectWidth: true
};
var omitKeyList = [
	"id",
	"prefixCls",
	"value",
	"defaultValue",
	"onChange",
	"showSearch",
	"searchValue",
	"inputValue",
	"onSearch",
	"autoClearSearchValue",
	"filterTreeNode",
	"treeNodeFilterProp",
	"onSelect",
	"onDeselect",
	"showCheckedStrategy",
	"treeNodeLabelProp",
	"fieldNames",
	"multiple",
	"treeCheckable",
	"treeCheckStrictly",
	"labelInValue",
	"maxCount",
	"treeData",
	"treeDataSimpleMode",
	"treeDefaultExpandAll",
	"treeExpandedKeys",
	"treeDefaultExpandedKeys",
	"onTreeExpand",
	"treeExpandAction",
	"virtual",
	"listHeight",
	"listItemHeight",
	"listItemScrollOffset",
	"onPopupVisibleChange",
	"popupMatchSelectWidth",
	"treeTitleRender",
	"treeLine",
	"treeIcon",
	"showTreeIcon",
	"switcherIcon",
	"treeMotion",
	"treeLoadedKeys",
	"onTreeLoad",
	"loadData",
	"onPopupScroll",
	"classNames",
	"styles"
];
var TreeSelect_default = /* @__PURE__ */ defineComponent({
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
		inputValue: {
			type: String,
			required: false,
			default: void 0
		},
		onSearch: {
			type: Function,
			required: false,
			default: void 0
		},
		autoClearSearchValue: {
			type: Boolean,
			required: false,
			default: void 0
		},
		filterTreeNode: {
			type: [Boolean, Function],
			required: false,
			default: void 0
		},
		treeNodeFilterProp: {
			type: String,
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
		showCheckedStrategy: {
			required: false,
			default: void 0
		},
		treeNodeLabelProp: {
			type: String,
			required: false,
			default: void 0
		},
		fieldNames: {
			type: Object,
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		treeCheckable: {
			type: [
				Boolean,
				Object,
				Function,
				String,
				Number,
				null,
				Array
			],
			required: false,
			default: void 0
		},
		treeCheckStrictly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		labelInValue: {
			type: Boolean,
			required: false,
			default: void 0
		},
		maxCount: {
			type: Number,
			required: false,
			default: void 0
		},
		treeData: {
			type: Array,
			required: false,
			default: void 0
		},
		treeDataSimpleMode: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		loadData: {
			type: Function,
			required: false,
			default: void 0
		},
		treeLoadedKeys: {
			type: Array,
			required: false,
			default: void 0
		},
		onTreeLoad: {
			type: Function,
			required: false,
			default: void 0
		},
		treeDefaultExpandAll: {
			type: Boolean,
			required: false,
			default: void 0
		},
		treeExpandedKeys: {
			type: Array,
			required: false,
			default: void 0
		},
		treeDefaultExpandedKeys: {
			type: Array,
			required: false,
			default: void 0
		},
		onTreeExpand: {
			type: Function,
			required: false,
			default: void 0
		},
		treeExpandAction: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		virtual: {
			type: Boolean,
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
		listItemScrollOffset: {
			type: Number,
			required: false,
			default: void 0
		},
		onPopupVisibleChange: {
			type: Function,
			required: false,
			default: void 0
		},
		treeTitleRender: {
			type: Function,
			required: false,
			default: void 0
		},
		treeLine: {
			type: Boolean,
			required: false,
			default: void 0
		},
		treeIcon: {
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
		showTreeIcon: {
			type: Boolean,
			required: false,
			default: void 0
		},
		switcherIcon: {
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
		treeMotion: {
			required: false,
			default: void 0
		},
		onPopupScroll: {
			type: Function,
			required: false,
			default: void 0
		},
		popupMatchSelectWidth: {
			type: [Boolean, Number],
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
	}, defaults),
	name: "TreeSelect",
	inheritAttrs: false,
	setup(props, { attrs, expose, slots }) {
		const baseSelectRef = shallowRef(null);
		expose({
			focus: () => baseSelectRef.value?.focus(),
			blur: () => baseSelectRef.value?.blur(),
			scrollTo: (arg) => baseSelectRef.value?.scrollTo?.(arg)
		});
		const mergedId = useId(props.id);
		const treeConduction = computed(() => !!props.treeCheckable && !props.treeCheckStrictly);
		const mergedCheckable = computed(() => props.treeCheckable || props.treeCheckStrictly);
		const mergedLabelInValue = computed(() => !!props.treeCheckStrictly || !!props.labelInValue);
		const mergedMultiple = computed(() => !!mergedCheckable.value || !!props.multiple);
		const searchProps = computed(() => ({
			searchValue: props.searchValue,
			inputValue: props.inputValue,
			onSearch: props.onSearch,
			autoClearSearchValue: props.autoClearSearchValue,
			filterTreeNode: props.filterTreeNode,
			treeNodeFilterProp: props.treeNodeFilterProp
		}));
		const [mergedShowSearch, searchConfig] = useSearchConfig(computed(() => props.showSearch), searchProps);
		const mergedTreeNodeFilterProp = computed(() => searchConfig.value.treeNodeFilterProp || "value");
		const mergedAutoClearSearchValue = computed(() => searchConfig.value.autoClearSearchValue !== false);
		const internalValue = shallowRef(props?.value ?? props?.defaultValue);
		watch(() => props.value, () => {
			internalValue.value = props?.value;
		});
		const setInternalValue = (val) => {
			internalValue.value = val;
		};
		const mergedShowCheckedStrategy = computed(() => {
			if (!props.treeCheckable) return SHOW_ALL;
			return props.showCheckedStrategy || "SHOW_CHILD";
		});
		if (process.env.NODE_ENV !== "production") warningProps(props);
		const mergedFieldNames = computed(() => fillFieldNames(props.fieldNames));
		const [internalSearchValue, setSearchValue] = useMergedState(() => "", { value: computed(() => searchConfig.value.searchValue) });
		const mergedSearchValue = computed(() => internalSearchValue.value || "");
		const onInternalSearch = (searchText) => {
			setSearchValue(searchText);
			searchConfig.value.onSearch?.(searchText);
		};
		const slotTreeData = shallowRef([]);
		const slotTreeDataSignature = shallowRef("");
		const mergedSourceTreeData = computed(() => {
			if (props.treeData !== void 0) return props.treeData;
			return slotTreeData.value;
		});
		const getTreeDataSignature = (data) => {
			const dig = (list) => {
				return (list || []).map((node) => {
					const key = String(node?.key);
					const children = node?.children;
					return `${key}{${children?.length ? dig(children) : ""}}`;
				}).join("|");
			};
			return dig(data);
		};
		const mergedTreeData = useTreeData(mergedSourceTreeData, computed(() => props.treeDataSimpleMode));
		const { keyEntities, valueEntities } = useDataEntities(mergedTreeData, mergedFieldNames);
		const splitRawValues = (newRawValues) => {
			const missingRawValues = [];
			const existRawValues = [];
			newRawValues.forEach((val) => {
				if (valueEntities.value.has(val)) existRawValues.push(val);
				else missingRawValues.push(val);
			});
			return {
				missingRawValues,
				existRawValues
			};
		};
		const filteredTreeData = useFilterTreeData(mergedTreeData, mergedSearchValue, {
			fieldNames: mergedFieldNames,
			treeNodeFilterProp: mergedTreeNodeFilterProp,
			filterTreeNode: computed(() => searchConfig.value.filterTreeNode)
		});
		const getLabel = (item) => {
			if (!item) return;
			if (props.treeNodeLabelProp) return item[props.treeNodeLabelProp];
			const titleList = mergedFieldNames.value._title;
			for (let i = 0; i < titleList.length; i += 1) {
				const title = item[titleList[i]];
				if (title !== void 0) return title;
			}
		};
		const toLabeledValues = (draftValues) => {
			return toArray(draftValues).map((val) => {
				if (isRawValue(val)) return { value: val };
				return val;
			});
		};
		const renderTreeTitleRender = (node) => {
			let label;
			const labelInfo = props?.treeTitleRender?.(node);
			if (typeof labelInfo === "string" || typeof labelInfo === "number") label = labelInfo;
			else {
				const labelArr = filterEmpty(Array.isArray(labelInfo) ? labelInfo : [labelInfo]);
				if (labelArr.length) label = labelArr.length === 1 ? labelArr[0] : labelArr;
			}
			return label;
		};
		const convert2LabelValues = (draftValues) => {
			return toLabeledValues(draftValues).map((item) => {
				let { label: rawLabel } = item;
				const { value: rawValue, halfChecked: rawHalfChecked } = item;
				let rawDisabled;
				const entity = valueEntities.value.get(rawValue);
				if (entity) {
					rawLabel = props.treeTitleRender ? renderTreeTitleRender(entity.node) : rawLabel ?? getLabel(entity.node);
					rawDisabled = entity.node.disabled;
				} else if (rawLabel === void 0) rawLabel = toLabeledValues(internalValue.value).find((labeledItem) => labeledItem.value === rawValue)?.label;
				return {
					label: rawLabel,
					value: rawValue,
					halfChecked: rawHalfChecked,
					disabled: rawDisabled
				};
			});
		};
		const rawMixedLabeledValues = computed(() => toLabeledValues(internalValue.value === null ? [] : internalValue.value));
		const rawLabeledValues = computed(() => rawMixedLabeledValues.value.filter((item) => !item.halfChecked));
		const rawHalfLabeledValues = computed(() => rawMixedLabeledValues.value.filter((item) => !!item.halfChecked));
		const rawValues = computed(() => rawLabeledValues.value.map((item) => item.value));
		const [rawCheckedValues, rawHalfCheckedValues] = useCheckedKeys(rawLabeledValues, rawHalfLabeledValues, treeConduction, keyEntities);
		const [cachedDisplayValues] = useCache(computed(() => {
			const rawDisplayValues = convert2LabelValues(formatStrategyValues(rawCheckedValues.value, mergedShowCheckedStrategy.value, keyEntities.value, mergedFieldNames.value).map((key) => keyEntities.value[String(key)]?.node?.[mergedFieldNames.value.value] ?? key).map((val) => {
				const targetItem = rawLabeledValues.value.find((item) => item.value === val);
				let label;
				if (props.labelInValue) label = targetItem?.label;
				else label = renderTreeTitleRender(targetItem);
				return {
					value: val,
					label
				};
			}));
			const firstVal = rawDisplayValues[0];
			if (!mergedMultiple.value && firstVal && isNil(firstVal.value) && isNil(firstVal.label)) return [];
			return rawDisplayValues.map((item) => ({
				...item,
				label: item.label ?? item.value
			}));
		}));
		const mergedMaxCount = computed(() => {
			if (mergedMultiple.value && (mergedShowCheckedStrategy.value === "SHOW_CHILD" || props.treeCheckStrictly || !props.treeCheckable)) return props.maxCount;
			return null;
		});
		const triggerChange = useRefFunc((newRawValues, extra, source) => {
			const formattedKeyList = formatStrategyValues(newRawValues, mergedShowCheckedStrategy.value, keyEntities.value, mergedFieldNames.value);
			if (mergedMaxCount.value && formattedKeyList.length > mergedMaxCount.value) return;
			setInternalValue(convert2LabelValues(newRawValues));
			if (mergedAutoClearSearchValue.value) setSearchValue("");
			if (props.onChange) {
				let eventValues = newRawValues;
				if (treeConduction.value) eventValues = formattedKeyList.map((key) => {
					const entity = valueEntities.value.get(key);
					return entity ? entity.node[mergedFieldNames.value.value] : key;
				});
				const { triggerValue, selected } = extra || {
					triggerValue: void 0,
					selected: void 0
				};
				let returnRawValues = eventValues;
				if (props.treeCheckStrictly) {
					const halfValues = rawHalfLabeledValues.value.filter((item) => !eventValues.includes(item.value));
					returnRawValues = [...returnRawValues, ...halfValues];
				}
				const returnLabeledValues = convert2LabelValues(returnRawValues);
				const additionalInfo = {
					preValue: rawLabeledValues.value,
					triggerValue
				};
				let showPosition = true;
				if (props.treeCheckStrictly || source === "selection" && !selected) showPosition = false;
				fillAdditionalInfo(additionalInfo, triggerValue, newRawValues, mergedTreeData.value, showPosition, mergedFieldNames.value);
				if (mergedCheckable.value) additionalInfo.checked = selected;
				else additionalInfo.selected = selected;
				const returnValues = mergedLabelInValue.value ? returnLabeledValues : returnLabeledValues.map((item) => item.value);
				props.onChange(mergedMultiple.value ? returnValues : returnValues[0], mergedLabelInValue.value ? null : returnLabeledValues.map((item) => item.label), additionalInfo);
			}
		});
		const onOptionSelect = (selectedKey, { selected, source }) => {
			const node = keyEntities.value[String(selectedKey)]?.node;
			const selectedValue = node?.[mergedFieldNames.value.value] ?? selectedKey;
			if (!mergedMultiple.value) triggerChange([selectedValue], {
				selected: true,
				triggerValue: selectedValue
			}, "option");
			else {
				let newRawValues = selected ? [...rawValues.value, selectedValue] : rawCheckedValues.value.filter((v) => v !== selectedValue);
				if (treeConduction.value) {
					const { missingRawValues, existRawValues } = splitRawValues(newRawValues);
					const keyList = existRawValues.map((val) => {
						const entity = valueEntities.value.get(val);
						return entity ? entity.key : val;
					});
					let checkedKeys;
					if (selected) ({checkedKeys} = conductCheck(keyList, true, keyEntities.value));
					else ({checkedKeys} = conductCheck(keyList, {
						checked: false,
						halfCheckedKeys: rawHalfCheckedValues.value
					}, keyEntities.value));
					newRawValues = [...missingRawValues, ...checkedKeys.map((key) => keyEntities.value[String(key)].node[mergedFieldNames.value.value])];
				}
				triggerChange(newRawValues, {
					selected,
					triggerValue: selectedValue
				}, source || "option");
			}
			if (selected || !mergedMultiple.value) props.onSelect?.(selectedValue, fillLegacyProps(node));
			else props.onDeselect?.(selectedValue, fillLegacyProps(node));
		};
		const onInternalPopupVisibleChange = (open) => {
			props.onPopupVisibleChange?.(open);
		};
		const onDisplayValuesChange = useRefFunc((newValues, info) => {
			const newRawValues = newValues.map((item) => item.value);
			if (info.type === "clear") {
				triggerChange(newRawValues, {}, "selection");
				return;
			}
			if (info.values.length) onOptionSelect(info.values[0].value, {
				selected: false,
				source: "selection"
			});
		});
		useTreeSelectProvider(computed(() => {
			return {
				virtual: props.virtual,
				popupMatchSelectWidth: props.popupMatchSelectWidth ?? defaults.popupMatchSelectWidth,
				listHeight: props.listHeight ?? defaults.listHeight,
				listItemHeight: props.listItemHeight ?? defaults.listItemHeight,
				listItemScrollOffset: props.listItemScrollOffset ?? defaults.listItemScrollOffset,
				treeData: filteredTreeData.value,
				fieldNames: mergedFieldNames.value,
				onSelect: onOptionSelect,
				treeExpandAction: props.treeExpandAction,
				treeTitleRender: props.treeTitleRender,
				onPopupScroll: props.onPopupScroll,
				leftMaxCount: props.maxCount === void 0 ? null : props.maxCount - cachedDisplayValues.value.length,
				leafCountOnly: mergedShowCheckedStrategy.value === "SHOW_CHILD" && !props.treeCheckStrictly && !!props.treeCheckable,
				valueEntities: valueEntities.value,
				classNames: props.classNames,
				styles: props.styles
			};
		}));
		useLegacyProvider(computed(() => ({
			checkable: mergedCheckable.value,
			loadData: props.loadData,
			treeLoadedKeys: props.treeLoadedKeys,
			onTreeLoad: props.onTreeLoad,
			checkedKeys: rawCheckedValues.value,
			halfCheckedKeys: rawHalfCheckedValues.value,
			treeDefaultExpandAll: props.treeDefaultExpandAll,
			treeExpandedKeys: props.treeExpandedKeys,
			treeDefaultExpandedKeys: props.treeDefaultExpandedKeys || [],
			onTreeExpand: props.onTreeExpand,
			treeIcon: props.treeIcon,
			treeMotion: props.treeMotion,
			showTreeIcon: props.showTreeIcon,
			switcherIcon: props.switcherIcon,
			treeLine: props.treeLine,
			treeNodeFilterProp: mergedTreeNodeFilterProp.value,
			keyEntities: keyEntities.value
		})));
		return () => {
			if (props.treeData === void 0) {
				const parsed = convertChildrenToData(slots.default?.() ?? []);
				const signature = getTreeDataSignature(parsed);
				if (signature !== slotTreeDataSignature.value) {
					slotTreeDataSignature.value = signature;
					slotTreeData.value = parsed;
				}
			}
			return createVNode(BaseSelect, mergeProps({ ...attrs }, omit(props, omitKeyList), {
				"ref": (el) => {
					baseSelectRef.value = el;
				},
				"id": mergedId,
				"prefixCls": props.prefixCls || defaults.prefixCls,
				"mode": mergedMultiple.value ? "multiple" : void 0,
				"classNames": props.classNames,
				"styles": props.styles,
				"displayValues": cachedDisplayValues.value,
				"onDisplayValuesChange": onDisplayValuesChange,
				"autoClearSearchValue": mergedAutoClearSearchValue.value,
				"showSearch": mergedShowSearch.value,
				"searchValue": mergedSearchValue.value,
				"onSearch": (v) => {
					onInternalSearch(v);
				},
				"OptionList": OptionList_default,
				"emptyOptions": !mergedTreeData.value.length,
				"onPopupVisibleChange": onInternalPopupVisibleChange,
				"popupMatchSelectWidth": props.popupMatchSelectWidth ?? defaults.popupMatchSelectWidth
			}), null);
		};
	}
});
export { TreeSelect_default as default };
