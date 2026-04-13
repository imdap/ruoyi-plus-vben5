import { useCascaderContext } from "../context.js";
import { getFullPathKeys, isLeaf, scrollIntoParentView, toPathKey, toPathKeys, toPathValueStr } from "../utils/commonUtil.js";
import { toPathOptions } from "../utils/treeUtil.js";
import Column_default, { FIX_LABEL } from "./Column.js";
import useActive_default from "./useActive.js";
import useKeyboard from "./useKeyboard.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, nextTick, onBeforeUpdate, ref, shallowRef, watch, watchEffect } from "vue";
import { clsx } from "@v-c/util";
var List_default = /* @__PURE__ */ defineComponent((props, { expose }) => {
	const containerRef = ref(null);
	const rtl = computed(() => props.direction === "rtl");
	const context = useCascaderContext();
	const mergedPrefixCls = computed(() => context.value?.popupPrefixCls || props.prefixCls);
	const mergedFieldNames = computed(() => context.value?.fieldNames);
	const loadingKeys = ref([]);
	const internalLoadData = (valueCells) => {
		if (!context.value?.loadData || props.searchValue) return;
		const fieldNames = mergedFieldNames.value;
		const options = context.value?.options || [];
		if (!fieldNames) return;
		const rawOptions = toPathOptions(valueCells, options, fieldNames).map(({ option }) => option);
		const lastOption = rawOptions[rawOptions.length - 1];
		if (lastOption && !isLeaf(lastOption, fieldNames)) {
			const pathKey = toPathKey(valueCells);
			loadingKeys.value = [...loadingKeys.value, pathKey];
			context.value.loadData(rawOptions);
		}
	};
	watchEffect(() => {
		const fieldNames = mergedFieldNames.value;
		const options = context.value?.options || [];
		if (!loadingKeys.value.length || !fieldNames) return;
		const nextLoadingKeys = loadingKeys.value.filter((loadingKey) => {
			const optionList = toPathOptions(toPathValueStr(String(loadingKey)), options, fieldNames, true).map(({ option }) => option);
			const lastOption = optionList[optionList.length - 1];
			return !(!lastOption || lastOption[fieldNames.children] || isLeaf(lastOption, fieldNames));
		});
		if (!(nextLoadingKeys.length === loadingKeys.value.length && nextLoadingKeys.every((key, index) => key === loadingKeys.value[index]))) loadingKeys.value = nextLoadingKeys;
	});
	const checkedSet = computed(() => new Set(toPathKeys(context.value?.values || [])));
	const halfCheckedSet = computed(() => new Set(toPathKeys(context.value?.halfValues || [])));
	const [activeValueCells, setActiveValueCells] = useActive_default(computed(() => !!props.multiple), computed(() => props.open));
	const onPathOpen = (nextValueCells) => {
		setActiveValueCells(nextValueCells);
		internalLoadData(nextValueCells);
	};
	const isSelectable = (option) => {
		if (props.disabled) return false;
		const { disabled: optionDisabled } = option;
		const fieldNames = mergedFieldNames.value;
		if (!fieldNames) return false;
		const isMergedLeaf = isLeaf(option, fieldNames);
		return !optionDisabled && (isMergedLeaf || context.value?.changeOnSelect || props.multiple);
	};
	const onPathSelect = (valuePath, leaf, fromKeyboard = false) => {
		context.value?.onSelect(valuePath);
		if (!props.multiple && (leaf || context.value?.changeOnSelect && (context.value?.expandTrigger === "hover" || fromKeyboard))) props.toggleOpen(false);
	};
	const filteredOptions = computed(() => {
		if (props.searchValue) return context.value?.searchOptions || [];
		return context.value?.options || [];
	});
	const mergedOptions = shallowRef(filteredOptions.value);
	onBeforeUpdate(() => {
		if (!!props.open && !props.lockOptions && mergedOptions.value !== filteredOptions.value) mergedOptions.value = filteredOptions.value;
	});
	const optionColumns = computed(() => {
		const fieldNames = mergedFieldNames.value;
		if (!fieldNames) return [];
		const optionList = [{ options: mergedOptions.value }];
		let currentList = mergedOptions.value;
		const fullPathKeys = getFullPathKeys(currentList, fieldNames);
		for (let i = 0; i < activeValueCells.value.length; i += 1) {
			const activeValueCell = activeValueCells.value[i];
			const subOptions = currentList.find((option, index) => (fullPathKeys[index] ? toPathKey(fullPathKeys[index]) : option[fieldNames.value]) === activeValueCell)?.[fieldNames.children];
			if (!subOptions?.length) break;
			currentList = subOptions;
			optionList.push({ options: subOptions });
		}
		return optionList;
	});
	const onKeyboardSelect = (selectValueCells, option) => {
		if (isSelectable(option) && mergedFieldNames.value) onPathSelect(selectValueCells, isLeaf(option, mergedFieldNames.value), true);
	};
	expose(useKeyboard(mergedOptions, mergedFieldNames, activeValueCells, onPathOpen, onKeyboardSelect, {
		direction: computed(() => props.direction),
		searchValue: computed(() => props.searchValue || ""),
		toggleOpen: props.toggleOpen,
		open: computed(() => props.open)
	}));
	watch([() => activeValueCells.value, () => props.searchValue], () => {
		if (props.searchValue) return;
		nextTick(() => {
			for (let i = 0; i < activeValueCells.value.length; i += 1) {
				const cellKeyPath = toPathKey(activeValueCells.value.slice(0, i + 1));
				const ele = containerRef.value?.querySelector(`li[data-path-key="${cellKeyPath.replace(/\\{0,2}"/g, "\\\"")}"]`);
				if (ele) scrollIntoParentView(ele);
			}
		});
	}, { deep: true });
	return () => {
		const fieldNames = mergedFieldNames.value;
		if (!fieldNames) return null;
		const isEmpty = !optionColumns.value[0]?.options?.length;
		const emptyList = [{
			[fieldNames.value]: "__EMPTY__",
			[FIX_LABEL]: props.notFoundContent,
			disabled: true
		}];
		const columnProps = {
			multiple: !isEmpty && props.multiple,
			onSelect: onPathSelect,
			onActive: onPathOpen,
			onToggleOpen: props.toggleOpen,
			checkedSet: checkedSet.value,
			halfCheckedSet: halfCheckedSet.value,
			loadingKeys: loadingKeys.value,
			isSelectable,
			disabled: props.disabled
		};
		const columnNodes = (isEmpty ? [{ options: emptyList }] : optionColumns.value).map((col, index) => {
			const prevValuePath = activeValueCells.value.slice(0, index);
			const activeValue = activeValueCells.value[index];
			return createVNode(Column_default, mergeProps({ "key": index }, columnProps, {
				"prefixCls": mergedPrefixCls.value,
				"options": col.options,
				"prevValuePath": prevValuePath,
				"activeValue": activeValue
			}), null);
		});
		return createVNode("div", {
			"class": clsx(`${mergedPrefixCls.value}-menus`, {
				[`${mergedPrefixCls.value}-menu-empty`]: isEmpty,
				[`${mergedPrefixCls.value}-rtl`]: rtl.value
			}),
			"ref": containerRef
		}, [columnNodes]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		searchValue: {
			type: String,
			required: false,
			default: void 0
		},
		toggleOpen: {
			type: Function,
			required: true,
			default: void 0
		},
		notFoundContent: {
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		lockOptions: {
			type: Boolean,
			required: false,
			default: void 0
		}
	}, {
		prefixCls: "",
		multiple: false,
		searchValue: "",
		toggleOpen: () => {},
		open: false,
		direction: "ltr",
		disabled: false,
		lockOptions: false
	}),
	name: "RawOptionList",
	inheritAttrs: false
});
export { List_default as default };
