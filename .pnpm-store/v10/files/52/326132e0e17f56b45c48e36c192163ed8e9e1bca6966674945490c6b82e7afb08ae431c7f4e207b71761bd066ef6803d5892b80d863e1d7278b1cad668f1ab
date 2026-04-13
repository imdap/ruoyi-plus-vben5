import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { useMultipleSelect } from "../_util/hooks/useMultipleSelect.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import en_US_default from "../locale/en_US.js";
import useLocale_default from "../locale/useLocale.js";
import { getMergedStatus, getStatusClassNames } from "../_util/statusUtils.js";
import { DefaultRenderEmpty } from "../config-provider/defaultRenderEmpty.js";
import { useFormItemInputContext } from "../form/context.js";
import Actions_default from "./Actions.js";
import { groupDisabledKeysMap, groupKeysMap } from "../_util/transKeys.js";
import Section_default from "./Section.js";
import useData_default from "./hooks/useData.js";
import useSelection_default from "./hooks/useSelection.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/transfer/Transfer.tsx
const Transfer = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, selectionsIcon: contextSelectionsIcon, renderEmpty } = useComponentBaseConfig("transfer", props, ["selectionsIcon"]);
	const { disabled, classes, styles, rootClass } = toPropsRefs$1(props, "disabled", "classes", "styles", "rootClass");
	const contextDisabled = useDisabledContext();
	const mergedDisabled = computed(() => disabled.value ?? contextDisabled.value);
	const mergedProps = computed(() => ({
		...props,
		disabled: mergedDisabled.value
	}));
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const normalizeNodes = (nodes) => filterEmpty(Array.isArray(nodes) ? nodes : [nodes]);
	const getSlotNodes = (slot) => {
		if (!slot) return;
		const items = normalizeNodes(slot());
		return items.length ? items : void 0;
	};
	const mergedActions = computed(() => {
		const slotActions = getSlotNodes(slots.actions);
		if (slotActions?.length) return slotActions;
		return normalizeNodes(props.actions ?? props.operations ?? []);
	});
	const dataSource = computed(() => props.dataSource || []);
	const targetKeys = computed(() => props.targetKeys || []);
	const [mergedDataSource, leftDataSource, rightDataSource] = useData_default(dataSource, computed(() => props.rowKey), targetKeys);
	const [sourceSelectedKeys, targetSelectedKeys, setSourceSelectedKeys, setTargetSelectedKeys] = useSelection_default(leftDataSource, rightDataSource, computed(() => props.selectedKeys));
	const [leftMultipleSelect, updateLeftPrevSelectedIndex] = useMultipleSelect((item) => item.key);
	const [rightMultipleSelect, updateRightPrevSelectedIndex] = useMultipleSelect((item) => item.key);
	const setStateKeys = (directionValue, keys) => {
		if (directionValue === "left") {
			const nextKeys = typeof keys === "function" ? keys(sourceSelectedKeys.value || []) : keys;
			setSourceSelectedKeys(nextKeys);
			return nextKeys;
		}
		const nextKeys = typeof keys === "function" ? keys(targetSelectedKeys.value || []) : keys;
		setTargetSelectedKeys(nextKeys);
		return nextKeys;
	};
	const setPrevSelectedIndex = (directionValue, value) => {
		(directionValue === "left" ? updateLeftPrevSelectedIndex : updateRightPrevSelectedIndex)(value);
	};
	const handleSelectChange = (directionValue, holder) => {
		if (directionValue === "left") emit("selectChange", holder, targetSelectedKeys.value);
		else emit("selectChange", sourceSelectedKeys.value, holder);
	};
	const emitSelectedKeysUpdate = (sourceKeys, targetKeysValue) => {
		emit("update:selectedKeys", [...sourceKeys, ...targetKeysValue]);
	};
	const getTitles = (transferLocale) => props.titles ?? transferLocale.titles ?? [];
	const handleLeftScroll = (e) => {
		emit("scroll", "left", e);
	};
	const handleRightScroll = (e) => {
		emit("scroll", "right", e);
	};
	const moveTo = (directionValue) => {
		const moveKeys = directionValue === "right" ? sourceSelectedKeys.value : targetSelectedKeys.value;
		const dataSourceDisabledKeysMap = groupDisabledKeysMap(mergedDataSource.value);
		const newMoveKeys = moveKeys.filter((key) => !dataSourceDisabledKeysMap.has(key));
		const newMoveKeysMap = groupKeysMap(newMoveKeys);
		const newTargetKeys = directionValue === "right" ? newMoveKeys.concat(targetKeys.value) : targetKeys.value.filter((targetKey) => !newMoveKeysMap.has(targetKey));
		const oppositeDirection = directionValue === "right" ? "left" : "right";
		handleSelectChange(oppositeDirection, setStateKeys(oppositeDirection, []));
		if (directionValue === "right") emitSelectedKeysUpdate([], targetSelectedKeys.value);
		else emitSelectedKeysUpdate(sourceSelectedKeys.value, []);
		emit("update:targetKeys", newTargetKeys);
		emit("change", newTargetKeys, directionValue, newMoveKeys);
	};
	const moveToLeft = () => {
		moveTo("left");
		setPrevSelectedIndex("left", null);
	};
	const moveToRight = () => {
		moveTo("right");
		setPrevSelectedIndex("right", null);
	};
	const onItemSelectAll = (directionValue, keys, checkAll) => {
		const prevKeys = directionValue === "left" ? sourceSelectedKeys.value : targetSelectedKeys.value;
		let mergedCheckedKeys = [];
		if (checkAll === "replace") mergedCheckedKeys = keys;
		else if (checkAll) mergedCheckedKeys = Array.from(new Set([...prevKeys, ...keys]));
		else {
			const selectedKeysMap = groupKeysMap(keys);
			mergedCheckedKeys = prevKeys.filter((key) => !selectedKeysMap.has(key));
		}
		setStateKeys(directionValue, mergedCheckedKeys);
		handleSelectChange(directionValue, mergedCheckedKeys);
		emitSelectedKeysUpdate(directionValue === "left" ? mergedCheckedKeys : sourceSelectedKeys.value, directionValue === "left" ? targetSelectedKeys.value : mergedCheckedKeys);
		setPrevSelectedIndex(directionValue, null);
	};
	const onLeftItemSelectAll = (keys, checkAll) => {
		onItemSelectAll("left", keys, checkAll);
	};
	const onRightItemSelectAll = (keys, checkAll) => {
		onItemSelectAll("right", keys, checkAll);
	};
	const handleSingleSelect = (directionValue, holder, selectedKey, checked, currentSelectedIndex) => {
		if (holder.has(selectedKey)) {
			holder.delete(selectedKey);
			setPrevSelectedIndex(directionValue, null);
		}
		if (checked) {
			holder.add(selectedKey);
			setPrevSelectedIndex(directionValue, currentSelectedIndex);
		}
	};
	const handleMultipleSelect = (directionValue, data, holder, currentSelectedIndex) => {
		(directionValue === "left" ? leftMultipleSelect : rightMultipleSelect)(currentSelectedIndex, data, holder);
	};
	const onItemSelect = (directionValue, selectedKey, checked, multiple) => {
		const isLeftDirection = directionValue === "left";
		const holder = [...isLeftDirection ? sourceSelectedKeys.value : targetSelectedKeys.value];
		const holderSet = new Set(holder);
		const data = [...isLeftDirection ? leftDataSource.value : rightDataSource.value].filter((item) => !item?.disabled);
		const currentSelectedIndex = data.findIndex((item) => item.key === selectedKey);
		if (multiple && holder.length > 0) handleMultipleSelect(directionValue, data, holderSet, currentSelectedIndex);
		else handleSingleSelect(directionValue, holderSet, selectedKey, checked, currentSelectedIndex);
		const holderArr = Array.from(holderSet);
		handleSelectChange(directionValue, holderArr);
		setStateKeys(directionValue, holderArr);
		emitSelectedKeysUpdate(directionValue === "left" ? holderArr : sourceSelectedKeys.value, directionValue === "left" ? targetSelectedKeys.value : holderArr);
	};
	const onLeftItemSelect = (selectedKey, checked, e) => {
		onItemSelect("left", selectedKey, checked, e?.shiftKey);
	};
	const onRightItemSelect = (selectedKey, checked, e) => {
		onItemSelect("right", selectedKey, checked, e?.shiftKey);
	};
	const onRightItemRemove = (keys) => {
		setStateKeys("right", []);
		emitSelectedKeysUpdate(sourceSelectedKeys.value, []);
		const nextTargetKeys = targetKeys.value.filter((key) => !keys.includes(key));
		emit("update:targetKeys", nextTargetKeys);
		emit("change", nextTargetKeys, "left", [...keys]);
	};
	const handleListStyle = (directionValue) => {
		if (typeof props.listStyle === "function") return props.listStyle({ direction: directionValue });
		return props.listStyle || {};
	};
	const formItemInputContext = useFormItemInputContext();
	const hasFeedback = computed(() => formItemInputContext.value.hasFeedback);
	const mergedStatus = computed(() => getMergedStatus(formItemInputContext.value.status, props.status));
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const [contextLocale] = useLocale_default("Transfer", en_US_default.Transfer);
	const listLocale = computed(() => ({
		...contextLocale?.value,
		notFoundContent: renderEmpty?.value?.("Transfer") || createVNode(DefaultRenderEmpty, { "componentName": "Transfer" }, null),
		...props.locale || {}
	}));
	const titles = computed(() => getSlotNodes(slots.titles) ?? getTitles(listLocale.value));
	const mergedLabelRender = computed(() => {
		if (!slots.labelRender && !props.labelRender) return;
		return (item) => getSlotPropsFnRun(slots, props, "labelRender", true, item);
	});
	const mergedSelectionsIcon = computed(() => getSlotPropsFnRun(slots, props, "selectionsIcon", false) ?? contextSelectionsIcon.value);
	const mergedPagination = computed(() => !slots.default ? props.pagination : false);
	const mergedShowSelectAll = computed(() => props.showSelectAll ?? true);
	const mergedSelectAllLabels = computed(() => props.selectAllLabels ?? []);
	const leftActive = computed(() => rightDataSource.value.filter((d) => targetSelectedKeys.value.includes(d.key) && !d.disabled).length > 0);
	const rightActive = computed(() => leftDataSource.value.filter((d) => sourceSelectedKeys.value.includes(d.key) && !d.disabled).length > 0);
	const renderList = computed(() => {
		if (!slots.default) return;
		return (listProps) => slots.default?.(listProps);
	});
	const mergedRender = computed(() => {
		return (item) => getSlotPropsFnRun(slots, props, "render", true, item);
	});
	const mergedFooter = computed(() => {
		if (!slots.footer && !props.footer) return;
		return (listProps, info) => {
			if (slots.footer) return slots.footer({
				props: listProps,
				info
			});
			return props.footer?.(listProps, info);
		};
	});
	if (isDev) {
		const warning = devUseWarning("Transfer");
		warning(!props.pagination || !slots.default, "usage", "`pagination` not support customize render list.");
		[
			["listStyle", "styles.section"],
			["operationStyle", "styles.actions"],
			["operations", "actions"]
		].forEach(([deprecatedName, newName]) => {
			warning.deprecated(!(props[deprecatedName] !== void 0), deprecatedName, newName);
		});
	}
	return () => {
		const { className, style, restAttrs } = getAttrStyleAndClass$1(attrs);
		const mergedClassName = clsx(prefixCls.value, {
			[`${prefixCls.value}-disabled`]: mergedDisabled.value,
			[`${prefixCls.value}-customize-list`]: !!slots.default,
			[`${prefixCls.value}-rtl`]: direction.value === "rtl"
		}, getStatusClassNames(prefixCls.value, mergedStatus.value, hasFeedback.value), contextClassName.value, rootClass.value, cssVarCls.value, rootCls.value, hashId.value, mergedClassNames.value.root, className);
		const rootStyle = {
			...contextStyle.value,
			...mergedStyles.value.root,
			...style
		};
		const leftTitle = titles.value[0];
		const rightTitle = titles.value[1];
		return createVNode("div", mergeProps({
			"class": mergedClassName,
			"style": rootStyle
		}, restAttrs), [
			createVNode(Section_default, mergeProps({
				"prefixCls": prefixCls.value,
				"style": handleListStyle("left"),
				"classes": mergedClassNames.value,
				"styles": mergedStyles.value,
				"titleText": leftTitle,
				"dataSource": leftDataSource.value,
				"filterOption": props.filterOption,
				"checkedKeys": sourceSelectedKeys.value,
				"handleFilter": (e) => emit("search", "left", e.target?.value || ""),
				"handleClear": () => emit("search", "left", ""),
				"onItemSelect": onLeftItemSelect,
				"onItemSelectAll": onLeftItemSelectAll,
				"render": mergedRender.value,
				"labelRender": mergedLabelRender.value,
				"showSearch": props.showSearch,
				"renderList": renderList.value,
				"footer": mergedFooter.value,
				"onScroll": handleLeftScroll,
				"disabled": mergedDisabled.value,
				"direction": direction.value === "rtl" ? "right" : "left",
				"showSelectAll": mergedShowSelectAll.value,
				"selectAllLabel": mergedSelectAllLabels.value[0],
				"pagination": mergedPagination.value,
				"selectionsIcon": mergedSelectionsIcon.value
			}, listLocale.value), null),
			createVNode(Actions_default, {
				"class": clsx(`${prefixCls.value}-actions`, mergedClassNames.value.actions),
				"rightActive": rightActive.value,
				"moveToRight": moveToRight,
				"leftActive": leftActive.value,
				"actions": mergedActions.value,
				"moveToLeft": moveToLeft,
				"style": {
					...props.operationStyle,
					...mergedStyles.value.actions
				},
				"disabled": mergedDisabled.value,
				"direction": direction.value,
				"oneWay": props.oneWay
			}, null),
			createVNode(Section_default, mergeProps({
				"prefixCls": prefixCls.value,
				"style": handleListStyle("right"),
				"classes": mergedClassNames.value,
				"styles": mergedStyles.value,
				"titleText": rightTitle,
				"dataSource": rightDataSource.value,
				"filterOption": props.filterOption,
				"checkedKeys": targetSelectedKeys.value,
				"handleFilter": (e) => emit("search", "right", e.target?.value || ""),
				"handleClear": () => emit("search", "right", ""),
				"onItemSelect": onRightItemSelect,
				"onItemSelectAll": onRightItemSelectAll,
				"onItemRemove": onRightItemRemove,
				"render": mergedRender.value,
				"labelRender": mergedLabelRender.value,
				"showSearch": props.showSearch,
				"renderList": renderList.value,
				"footer": mergedFooter.value,
				"onScroll": handleRightScroll,
				"disabled": mergedDisabled.value,
				"direction": direction.value === "rtl" ? "left" : "right",
				"showSelectAll": mergedShowSelectAll.value,
				"selectAllLabel": mergedSelectAllLabels.value[1],
				"showRemove": props.oneWay,
				"pagination": mergedPagination.value,
				"selectionsIcon": mergedSelectionsIcon.value
			}, listLocale.value), null)
		]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		listStyle: {
			type: [Function, Object],
			required: false
		},
		operationStyle: {
			type: Object,
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dataSource: {
			type: Array,
			required: false
		},
		targetKeys: {
			type: Array,
			required: false
		},
		selectedKeys: {
			type: Array,
			required: false
		},
		render: {
			type: Function,
			required: false
		},
		labelRender: {
			type: Function,
			required: false
		},
		titles: {
			type: Array,
			required: false
		},
		operations: {
			type: Array,
			required: false
		},
		actions: {
			type: Array,
			required: false
		},
		showSearch: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		filterOption: {
			type: Function,
			required: false
		},
		locale: {
			type: Object,
			required: false
		},
		footer: {
			type: Function,
			required: false
		},
		rowKey: {
			type: Function,
			required: false
		},
		showSelectAll: {
			type: Boolean,
			required: false,
			default: void 0
		},
		selectAllLabels: {
			type: Array,
			required: false
		},
		oneWay: {
			type: Boolean,
			required: false,
			default: void 0
		},
		pagination: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		status: {
			type: String,
			required: false
		},
		selectionsIcon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, {
		dataSource: [],
		targetKeys: [],
		selectedKeys: void 0,
		selectAllLabels: [],
		showSearch: false,
		showSelectAll: true,
		oneWay: false
	}),
	emits: [
		"change",
		"selectChange",
		"search",
		"scroll",
		"update:targetKeys",
		"update:selectedKeys"
	],
	name: "ATransfer",
	inheritAttrs: false
});
var Transfer_default = Transfer;

//#endregion
export { Transfer_default as default };