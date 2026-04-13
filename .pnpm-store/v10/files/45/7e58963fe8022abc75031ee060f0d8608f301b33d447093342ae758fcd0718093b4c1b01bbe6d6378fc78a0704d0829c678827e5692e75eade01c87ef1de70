import { getExpandableProps } from "../utils/legacyUtil.js";
import { findAllChildrenKeys, renderExpandIcon } from "../utils/expandUtil.js";
import "../constant.js";
import { computed, ref, unref } from "vue";
import { warning } from "@v-c/util";
//#region src/hooks/useExpand.ts
function useExpand(props, mergedData, getRowKey) {
	const expandableConfig = computed(() => getExpandableProps(props));
	const mergedExpandIcon = computed(() => expandableConfig.value.expandIcon || renderExpandIcon);
	const mergedChildrenColumnName = computed(() => expandableConfig.value.childrenColumnName || "children");
	const expandableType = computed(() => {
		if (expandableConfig.value.expandedRowRender) return "row";
		const data = unref(mergedData) || [];
		const childrenKey = mergedChildrenColumnName.value;
		if (props.expandable && props.internalHooks === "vc-table-internal-hook" && props.expandable.__PARENT_RENDER_ICON__ || data.some((record) => record && typeof record === "object" && record[childrenKey])) return "nest";
		return false;
	});
	const innerExpandedKeys = ref((() => {
		const config = expandableConfig.value;
		if (config.defaultExpandedRowKeys) return [...config.defaultExpandedRowKeys];
		if (config.defaultExpandAllRows) return findAllChildrenKeys(unref(mergedData) || [], unref(getRowKey), mergedChildrenColumnName.value);
		return [];
	})());
	const mergedExpandedKeys = computed(() => {
		return new Set(expandableConfig.value.expandedRowKeys || innerExpandedKeys.value || []);
	});
	const onTriggerExpand = (record, event) => {
		const data = unref(mergedData) || [];
		const rowKey = unref(getRowKey)(record, data.indexOf(record));
		const newExpandedKeys = new Set(mergedExpandedKeys.value);
		const hasKey = newExpandedKeys.has(rowKey);
		if (hasKey) newExpandedKeys.delete(rowKey);
		else newExpandedKeys.add(rowKey);
		innerExpandedKeys.value = Array.from(newExpandedKeys);
		expandableConfig.value.onExpand?.(!hasKey, record);
		expandableConfig.value.onExpandedRowsChange?.(Array.from(newExpandedKeys));
		props["onUpdate:expandedRowKeys"]?.(Array.from(newExpandedKeys));
		event?.stopPropagation?.();
	};
	if (process.env.NODE_ENV !== "production" && expandableConfig.value.expandedRowRender && (unref(mergedData) || []).some((record) => {
		return Array.isArray(record?.[mergedChildrenColumnName.value]);
	})) warning(false, "`expandedRowRender` should not use with nested Table");
	return [
		expandableConfig,
		expandableType,
		mergedExpandedKeys,
		mergedExpandIcon,
		mergedChildrenColumnName,
		onTriggerExpand
	];
}
//#endregion
export { useExpand as default };
