import { devUseWarning } from "../../_util/warning.js";
import { useMultipleSelect } from "../../_util/hooks/useMultipleSelect.js";
import dropdown_default from "../../dropdown/index.js";
import radio_default from "../../radio/index.js";
import checkbox_default from "../../checkbox/index.js";
import { computed, createVNode, mergeProps, shallowRef, unref, watch } from "vue";
import { clsx } from "@v-c/util";
import { DownOutlined } from "@antdv-next/icons";
import { INTERNAL_COL_DEFINE } from "@v-c/table";
import { arrAdd, arrDel, conductCheck, convertDataToEntities } from "@v-c/tree";

//#region src/table/hooks/useSelection.tsx
const SELECTION_COLUMN = {};
const SELECTION_ALL = "SELECT_ALL";
const SELECTION_INVERT = "SELECT_INVERT";
const SELECTION_NONE = "SELECT_NONE";
const EMPTY_LIST = [];
function flattenData(childrenColumnName, data, list = []) {
	(data || []).forEach((record) => {
		list.push(record);
		if (record && typeof record === "object" && childrenColumnName in record) flattenData(childrenColumnName, record[childrenColumnName], list);
	});
	return list;
}
function useSelection(config, rowSelection) {
	const warning = devUseWarning("Table");
	const rowSelectionValue = computed(() => unref(rowSelection));
	const selectionConfig = computed(() => rowSelectionValue.value || {});
	const preserveSelectedRowKeys = computed(() => selectionConfig.value.preserveSelectedRowKeys);
	const selectionType = computed(() => selectionConfig.value.type);
	const selections = computed(() => selectionConfig.value.selections);
	const hideSelectAll = computed(() => selectionConfig.value.hideSelectAll);
	const checkStrictly = computed(() => selectionConfig.value.checkStrictly ?? true);
	const selectionColWidth = computed(() => selectionConfig.value.columnWidth);
	const fixed = computed(() => selectionConfig.value.fixed);
	const customizeRenderCell = computed(() => selectionConfig.value.renderCell);
	const prefixCls = computed(() => unref(config.prefixCls));
	const data = computed(() => unref(config.data));
	const pageData = computed(() => unref(config.pageData));
	const getRecordByKey = config.getRecordByKey;
	const getRowKey = computed(() => unref(config.getRowKey));
	const childrenColumnName = computed(() => unref(config.childrenColumnName));
	const tableLocale = computed(() => unref(config.locale));
	const getPopupContainer = computed(() => unref(config.getPopupContainer));
	const isTreeData = computed(() => (data.value || []).some((item) => item?.[childrenColumnName.value]));
	const [multipleSelect, updatePrevSelectedIndex] = useMultipleSelect((item) => item);
	const innerSelectedKeys = shallowRef(selectionConfig.value.defaultSelectedRowKeys || EMPTY_LIST);
	const mergedSelectedKeys = computed(() => selectionConfig.value.selectedRowKeys ?? innerSelectedKeys.value);
	const setMergedSelectedKeys = (keys) => {
		innerSelectedKeys.value = keys;
	};
	const preserveRecordsRef = shallowRef(/* @__PURE__ */ new Map());
	const updatePreserveRecordsCache = (keys) => {
		if (preserveSelectedRowKeys.value) {
			const newCache = /* @__PURE__ */ new Map();
			keys.forEach((key) => {
				let record = getRecordByKey(key);
				if (!record && preserveRecordsRef.value.has(key)) record = preserveRecordsRef.value.get(key);
				newCache.set(key, record);
			});
			preserveRecordsRef.value = newCache;
		}
	};
	watch(mergedSelectedKeys, (nextKeys) => {
		updatePreserveRecordsCache(nextKeys);
	});
	const flattedData = computed(() => flattenData(childrenColumnName.value, pageData.value));
	const keyEntities = computed(() => {
		if (checkStrictly.value) return { keyEntities: null };
		let convertData = data.value;
		if (preserveSelectedRowKeys.value) {
			const keysSet = new Set(flattedData.value.map((record, index) => getRowKey.value(record, index)));
			const preserveRecords = Array.from(preserveRecordsRef.value).reduce((total, [key, value]) => keysSet.has(key) ? total : total.concat(value), []);
			convertData = [...convertData, ...preserveRecords];
		}
		return convertDataToEntities(convertData, {
			externalGetKey: getRowKey.value,
			childrenPropName: childrenColumnName.value
		});
	});
	const checkboxPropsMap = computed(() => {
		const map = /* @__PURE__ */ new Map();
		flattedData.value.forEach((record, index) => {
			const key = getRowKey.value(record, index);
			const checkboxProps = (selectionConfig.value.getCheckboxProps ? selectionConfig.value.getCheckboxProps(record) : null) || {};
			map.set(key, checkboxProps);
			warning(!("checked" in checkboxProps || "defaultChecked" in checkboxProps), "usage", "Do not set `checked` or `defaultChecked` in `getCheckboxProps`. Please use `selectedRowKeys` instead.");
		});
		return map;
	});
	const isCheckboxDisabled = (r) => {
		const rowKey = getRowKey.value(r);
		let checkboxProps;
		if (checkboxPropsMap.value.has(rowKey)) checkboxProps = checkboxPropsMap.value.get(getRowKey.value(r));
		else checkboxProps = selectionConfig.value.getCheckboxProps ? selectionConfig.value.getCheckboxProps(r) : void 0;
		return !!checkboxProps?.disabled;
	};
	const derivedSelectedKeys = computed(() => {
		if (checkStrictly.value) return [mergedSelectedKeys.value || [], []];
		const { checkedKeys, halfCheckedKeys } = conductCheck(mergedSelectedKeys.value, true, keyEntities.value.keyEntities, isCheckboxDisabled);
		return [checkedKeys || [], halfCheckedKeys];
	});
	const derivedSelectedKeySet = computed(() => {
		const keys = selectionType.value === "radio" ? derivedSelectedKeys.value[0].slice(0, 1) : derivedSelectedKeys.value[0];
		return new Set(keys);
	});
	const derivedHalfSelectedKeySet = computed(() => selectionType.value === "radio" ? /* @__PURE__ */ new Set() : new Set(derivedSelectedKeys.value[1]));
	watch(() => !!rowSelectionValue.value, (hasSelection) => {
		if (!hasSelection) setMergedSelectedKeys(EMPTY_LIST);
	});
	const setSelectedKeys = (keys, method) => {
		let availableKeys;
		let records;
		updatePreserveRecordsCache(keys);
		if (preserveSelectedRowKeys.value) {
			availableKeys = keys;
			records = keys.map((key) => preserveRecordsRef.value.get(key));
		} else {
			availableKeys = [];
			records = [];
			keys.forEach((key) => {
				const record = getRecordByKey(key);
				if (record !== void 0) {
					availableKeys.push(key);
					records.push(record);
				}
			});
		}
		setMergedSelectedKeys(availableKeys);
		selectionConfig.value.onChange?.(availableKeys, records, { type: method });
	};
	const triggerSingleSelection = (key, selected, keys, event) => {
		if (selectionConfig.value.onSelect) {
			const rows = keys.map((k) => getRecordByKey(k));
			selectionConfig.value.onSelect(getRecordByKey(key), selected, rows, event);
		}
		setSelectedKeys(keys, "single");
	};
	const mergedSelections = computed(() => {
		if (!selections.value || hideSelectAll.value) return null;
		return (selections.value === true ? [
			SELECTION_ALL,
			SELECTION_INVERT,
			SELECTION_NONE
		] : selections.value).map((selection) => {
			if (selection === SELECTION_ALL) return {
				key: "all",
				text: tableLocale.value.selectionAll,
				onSelect() {
					setSelectedKeys(data.value.map((record, index) => getRowKey.value(record, index)).filter((key) => {
						return !checkboxPropsMap.value.get(key)?.disabled || derivedSelectedKeySet.value.has(key);
					}), "all");
				}
			};
			if (selection === SELECTION_INVERT) return {
				key: "invert",
				text: tableLocale.value.selectInvert,
				onSelect() {
					const keySet = new Set(derivedSelectedKeySet.value);
					pageData.value.forEach((record, index) => {
						const key = getRowKey.value(record, index);
						if (!checkboxPropsMap.value.get(key)?.disabled) if (keySet.has(key)) keySet.delete(key);
						else keySet.add(key);
					});
					const keys = Array.from(keySet);
					if (selectionConfig.value.onSelectInvert) {
						warning.deprecated(false, "onSelectInvert", "onChange");
						selectionConfig.value.onSelectInvert(keys);
					}
					setSelectedKeys(keys, "invert");
				}
			};
			if (selection === SELECTION_NONE) return {
				key: "none",
				text: tableLocale.value.selectNone,
				onSelect() {
					selectionConfig.value.onSelectNone?.();
					setSelectedKeys(Array.from(derivedSelectedKeySet.value).filter((key) => {
						return checkboxPropsMap.value.get(key)?.disabled;
					}), "none");
				}
			};
			return selection;
		}).map((selection) => ({
			...selection,
			onSelect: (...rest) => {
				selection.onSelect?.(...rest);
				updatePrevSelectedIndex(null);
			}
		}));
	});
	const transformColumns = (columns) => {
		if (!rowSelectionValue.value) {
			warning(!columns.includes(SELECTION_COLUMN), "usage", "`rowSelection` is not config but `SELECTION_COLUMN` exists in the `columns`.");
			return columns.filter((col) => col !== SELECTION_COLUMN);
		}
		let cloneColumns = [...columns];
		const keySet = new Set(derivedSelectedKeySet.value);
		const recordKeys = flattedData.value.map((record, index) => getRowKey.value(record, index)).filter((key) => !checkboxPropsMap.value.get(key)?.disabled);
		const checkedCurrentAll = recordKeys.every((key) => keySet.has(key));
		const checkedCurrentSome = recordKeys.some((key) => keySet.has(key));
		const onSelectAllChange = () => {
			const changeKeys = [];
			if (checkedCurrentAll) recordKeys.forEach((key) => {
				keySet.delete(key);
				changeKeys.push(key);
			});
			else recordKeys.forEach((key) => {
				if (!keySet.has(key)) {
					keySet.add(key);
					changeKeys.push(key);
				}
			});
			const keys = Array.from(keySet);
			selectionConfig.value.onSelectAll?.(!checkedCurrentAll, keys.map((k) => getRecordByKey(k)), changeKeys.map((k) => getRecordByKey(k)));
			setSelectedKeys(keys, "all");
			updatePrevSelectedIndex(null);
		};
		let title;
		let columnTitleCheckbox;
		if (selectionType.value !== "radio") {
			let customizeSelections;
			if (mergedSelections.value) {
				const menuItems = mergedSelections.value.map((selection, index) => ({
					key: selection.key ?? index,
					label: selection.text
				}));
				const selectionMap = /* @__PURE__ */ new Map();
				mergedSelections.value.forEach((selection, index) => {
					selectionMap.set(selection.key ?? index, selection);
				});
				customizeSelections = createVNode("div", { "class": `${prefixCls.value}-selection-extra` }, [createVNode(dropdown_default, {
					"menu": {
						getPopupContainer: getPopupContainer.value,
						items: menuItems
					},
					"getPopupContainer": getPopupContainer.value,
					"onMenuClick": (info) => {
						selectionMap.get(info?.key)?.onSelect?.(recordKeys);
					}
				}, { default: () => [createVNode("span", null, [createVNode(DownOutlined, null, null)])] })]);
			}
			const allDisabledData = flattedData.value.map((record, index) => {
				const key = getRowKey.value(record, index);
				const checkboxProps = checkboxPropsMap.value.get(key) || {};
				return {
					checked: keySet.has(key),
					...checkboxProps
				};
			}).filter(({ disabled }) => disabled);
			const allDisabled = !!allDisabledData.length && allDisabledData.length === flattedData.value.length;
			const allDisabledAndChecked = allDisabled && allDisabledData.every(({ checked }) => checked);
			const allDisabledSomeChecked = allDisabled && allDisabledData.some(({ checked }) => checked);
			const customCheckboxProps = selectionConfig.value.getTitleCheckboxProps?.() || {};
			const { onChange, disabled } = customCheckboxProps;
			columnTitleCheckbox = createVNode(checkbox_default, mergeProps({ "aria-label": customizeSelections ? "Custom selection" : "Select all" }, customCheckboxProps, {
				"checked": !allDisabled ? !!flattedData.value.length && checkedCurrentAll : allDisabledAndChecked,
				"indeterminate": !allDisabled ? !checkedCurrentAll && checkedCurrentSome : !allDisabledAndChecked && allDisabledSomeChecked,
				"onChange": (e) => {
					onSelectAllChange();
					onChange?.(e);
				},
				"disabled": disabled ?? (flattedData.value.length === 0 || allDisabled),
				"skipGroup": true
			}), null);
			title = !hideSelectAll.value && createVNode("div", { "class": `${prefixCls.value}-selection` }, [columnTitleCheckbox, customizeSelections]);
		}
		let renderCell;
		if (selectionType.value === "radio") renderCell = (_, record, index) => {
			const key = getRowKey.value(record, index);
			const checked = keySet.has(key);
			const checkboxProps = checkboxPropsMap.value.get(key);
			return {
				node: createVNode(radio_default, mergeProps(checkboxProps, {
					"checked": checked,
					"onClick": (e) => {
						e.stopPropagation();
						checkboxProps?.onClick?.(e);
					},
					"onChange": (event) => {
						if (!keySet.has(key)) triggerSingleSelection(key, true, [key], event.nativeEvent);
						checkboxProps?.onChange?.(event);
					}
				}), null),
				checked
			};
		};
		else renderCell = (_, record, index) => {
			const key = getRowKey.value(record, index);
			const checked = keySet.has(key);
			const indeterminate = derivedHalfSelectedKeySet.value.has(key);
			const checkboxProps = checkboxPropsMap.value.get(key);
			let mergedIndeterminate;
			if (isTreeData.value) {
				mergedIndeterminate = indeterminate;
				warning(typeof checkboxProps?.indeterminate !== "boolean", "usage", "set `indeterminate` using `rowSelection.getCheckboxProps` is not allowed with tree structured dataSource.");
			} else mergedIndeterminate = checkboxProps?.indeterminate ?? indeterminate;
			return {
				node: createVNode(checkbox_default, mergeProps(checkboxProps, {
					"indeterminate": mergedIndeterminate,
					"checked": checked,
					"skipGroup": true,
					"onClick": (e) => {
						e.stopPropagation();
						checkboxProps?.onClick?.(e);
					},
					"onChange": (event) => {
						const nativeEvent = event.nativeEvent;
						const { shiftKey } = nativeEvent;
						const currentSelectedIndex = recordKeys.indexOf(key);
						const isMultiple = derivedSelectedKeys.value[0].some((item) => recordKeys.includes(item));
						if (shiftKey && checkStrictly.value && isMultiple) {
							const changedKeys = multipleSelect(currentSelectedIndex, recordKeys, keySet);
							const keys = Array.from(keySet);
							selectionConfig.value.onSelectMultiple?.(!checked, keys.map((recordKey) => getRecordByKey(recordKey)), changedKeys.map((recordKey) => getRecordByKey(recordKey)));
							setSelectedKeys(keys, "multiple");
						} else {
							const originCheckedKeys = derivedSelectedKeys.value[0];
							if (checkStrictly.value) {
								const checkedKeys = checked ? arrDel(originCheckedKeys, key) : arrAdd(originCheckedKeys, key);
								triggerSingleSelection(key, !checked, checkedKeys, nativeEvent);
							} else {
								const { checkedKeys, halfCheckedKeys } = conductCheck([...originCheckedKeys, key], true, keyEntities.value.keyEntities, isCheckboxDisabled);
								let nextCheckedKeys = checkedKeys;
								if (checked) {
									const tempKeySet = new Set(checkedKeys);
									tempKeySet.delete(key);
									nextCheckedKeys = conductCheck(Array.from(tempKeySet), {
										checked: false,
										halfCheckedKeys
									}, keyEntities.value.keyEntities, isCheckboxDisabled).checkedKeys;
								}
								triggerSingleSelection(key, !checked, nextCheckedKeys, nativeEvent);
							}
						}
						if (checked) updatePrevSelectedIndex(null);
						else updatePrevSelectedIndex(currentSelectedIndex);
						checkboxProps?.onChange?.(event);
					}
				}), null),
				checked
			};
		};
		const renderSelectionCell = (_, record, index) => {
			const { node, checked } = renderCell(_, record, index);
			if (customizeRenderCell.value) return customizeRenderCell.value(checked, record, index, node);
			return node;
		};
		if (!cloneColumns.includes(SELECTION_COLUMN)) if (cloneColumns.findIndex((col) => col[INTERNAL_COL_DEFINE]?.columnType === "EXPAND_COLUMN") === 0) {
			const [expandColumn, ...restColumns] = cloneColumns;
			cloneColumns = [
				expandColumn,
				SELECTION_COLUMN,
				...restColumns
			];
		} else cloneColumns = [SELECTION_COLUMN, ...cloneColumns];
		const selectionColumnIndex = cloneColumns.indexOf(SELECTION_COLUMN);
		warning(cloneColumns.filter((col) => col === SELECTION_COLUMN).length <= 1, "usage", "Multiple `SELECTION_COLUMN` exist in `columns`.");
		cloneColumns = cloneColumns.filter((column, index) => column !== SELECTION_COLUMN || index === selectionColumnIndex);
		const prevCol = cloneColumns[selectionColumnIndex - 1];
		const nextCol = cloneColumns[selectionColumnIndex + 1];
		let mergedFixed = fixed.value;
		if (mergedFixed === void 0) {
			if (nextCol?.fixed !== void 0) mergedFixed = nextCol.fixed;
			else if (prevCol?.fixed !== void 0) mergedFixed = prevCol.fixed;
		}
		if (mergedFixed && prevCol && prevCol[INTERNAL_COL_DEFINE]?.columnType === "EXPAND_COLUMN" && prevCol.fixed === void 0) prevCol.fixed = mergedFixed;
		const columnCls = clsx(`${prefixCls.value}-selection-col`, { [`${prefixCls.value}-selection-col-with-dropdown`]: selections.value && selectionType.value === "checkbox" });
		const renderColumnTitle = () => {
			if (!selectionConfig.value.columnTitle) return title;
			if (typeof selectionConfig.value.columnTitle === "function") return selectionConfig.value.columnTitle(columnTitleCheckbox);
			return selectionConfig.value.columnTitle;
		};
		const selectionColumn = {
			fixed: mergedFixed,
			width: selectionColWidth.value,
			className: `${prefixCls.value}-selection-column`,
			title: renderColumnTitle(),
			render: renderSelectionCell,
			onCell: selectionConfig.value.onCell,
			align: selectionConfig.value.align,
			[INTERNAL_COL_DEFINE]: { className: columnCls }
		};
		return cloneColumns.map((col) => col === SELECTION_COLUMN ? selectionColumn : col);
	};
	return [transformColumns, derivedSelectedKeySet];
}

//#endregion
export { SELECTION_ALL, SELECTION_COLUMN, SELECTION_INVERT, SELECTION_NONE, useSelection as default };