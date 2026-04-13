import tooltip_default from "../../tooltip/index.js";
import { getColumnKey, getColumnPos, renderColumnTitle, safeColumnTitle } from "../util.js";
import { computed, createVNode, isVNode, shallowRef, unref } from "vue";
import { clsx } from "@v-c/util";
import { CaretDownOutlined, CaretUpOutlined } from "@antdv-next/icons";
import KeyCode from "@v-c/util/dist/KeyCode";

//#region src/table/hooks/useSorter.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ASCEND = "ascend";
const DESCEND = "descend";
function getMultiplePriority(column) {
	if (typeof column.sorter === "object" && typeof column.sorter.multiple === "number") return column.sorter.multiple;
	return false;
}
function getSortFunction(sorter) {
	if (typeof sorter === "function") return sorter;
	if (sorter && typeof sorter === "object" && sorter.compare) return sorter.compare;
	return false;
}
function nextSortDirection(sortDirections, current) {
	if (!current) return sortDirections[0];
	return sortDirections[sortDirections.indexOf(current) + 1];
}
function collectSortStates(columns, init, pos) {
	let sortStates = [];
	const pushState = (column, columnPos) => {
		sortStates.push({
			column,
			key: getColumnKey(column, columnPos),
			multiplePriority: getMultiplePriority(column),
			sortOrder: column.sortOrder
		});
	};
	(columns || []).forEach((column, index) => {
		const columnPos = getColumnPos(index, pos);
		if (column.children) {
			if ("sortOrder" in column) pushState(column, columnPos);
			sortStates = [...sortStates, ...collectSortStates(column.children, init, columnPos)];
		} else if (column.sorter) {
			if ("sortOrder" in column) pushState(column, columnPos);
			else if (init && column.defaultSortOrder) sortStates.push({
				column,
				key: getColumnKey(column, columnPos),
				multiplePriority: getMultiplePriority(column),
				sortOrder: column.defaultSortOrder
			});
		}
	});
	return sortStates;
}
function injectSorter(prefixCls, columns, sorterStates, triggerSorter, defaultSortDirections, tableLocale, tableShowSorterTooltip, pos, a11yLocale) {
	return (columns || []).map((column, index) => {
		const columnPos = getColumnPos(index, pos);
		let newColumn = column;
		if (newColumn.sorter) {
			const sortDirections = newColumn.sortDirections || defaultSortDirections;
			const showSorterTooltip = newColumn.showSorterTooltip === void 0 ? tableShowSorterTooltip : newColumn.showSorterTooltip;
			const columnKey = getColumnKey(newColumn, columnPos);
			const sorterState = sorterStates.find(({ key }) => key === columnKey);
			const sortOrder = sorterState ? sorterState.sortOrder : null;
			const nextSortOrder = nextSortDirection(sortDirections, sortOrder);
			const { cancelSort, triggerAsc, triggerDesc } = tableLocale || {};
			let sortTip = cancelSort;
			if (nextSortOrder === DESCEND) sortTip = triggerDesc;
			else if (nextSortOrder === ASCEND) sortTip = triggerAsc;
			const tooltipProps = typeof showSorterTooltip === "object" ? {
				title: sortTip,
				...showSorterTooltip
			} : { title: sortTip };
			newColumn = {
				...newColumn,
				className: clsx(newColumn.className, { [`${prefixCls}-column-sort`]: sortOrder }),
				title: (renderProps) => {
					let sorter;
					if (column.sortIcon) sorter = column.sortIcon({ sortOrder });
					else {
						const upNode = sortDirections.includes(ASCEND) && createVNode(CaretUpOutlined, { "class": clsx(`${prefixCls}-column-sorter-up`, { active: sortOrder === ASCEND }) }, null);
						const downNode = sortDirections.includes(DESCEND) && createVNode(CaretDownOutlined, { "class": clsx(`${prefixCls}-column-sorter-down`, { active: sortOrder === DESCEND }) }, null);
						sorter = createVNode("span", { "class": clsx(`${prefixCls}-column-sorter`, { [`${prefixCls}-column-sorter-full`]: !!(upNode && downNode) }) }, [createVNode("span", {
							"class": `${prefixCls}-column-sorter-inner`,
							"aria-hidden": "true"
						}, [upNode, downNode])]);
					}
					const columnSortersClass = `${prefixCls}-column-sorters`;
					const renderColumnTitleWrapper = createVNode("span", { "class": `${prefixCls}-column-title` }, [renderColumnTitle(column.title, renderProps)]);
					const renderSortTitle = createVNode("div", { "class": columnSortersClass }, [renderColumnTitleWrapper, sorter]);
					if (showSorterTooltip) {
						if (typeof showSorterTooltip !== "boolean" && showSorterTooltip?.target === "sorter-icon") return createVNode("div", { "class": clsx(columnSortersClass, `${columnSortersClass}-tooltip-target-sorter`) }, [renderColumnTitleWrapper, createVNode(tooltip_default, tooltipProps, _isSlot(sorter) ? sorter : { default: () => [sorter] })]);
						return createVNode(tooltip_default, tooltipProps, _isSlot(renderSortTitle) ? renderSortTitle : { default: () => [renderSortTitle] });
					}
					return renderSortTitle;
				},
				onHeaderCell: (col) => {
					const cell = column.onHeaderCell?.(col) || {};
					const originOnClick = cell.onClick;
					const originOnKeydown = cell.onKeydown || cell.onKeyDown;
					cell.onClick = (event) => {
						triggerSorter({
							column,
							key: columnKey,
							sortOrder: nextSortOrder,
							multiplePriority: getMultiplePriority(column)
						});
						originOnClick?.(event);
					};
					cell.onKeydown = (event) => {
						if (event.keyCode === KeyCode.ENTER) {
							triggerSorter({
								column,
								key: columnKey,
								sortOrder: nextSortOrder,
								multiplePriority: getMultiplePriority(column)
							});
							originOnKeydown?.(event);
						}
					};
					const renderTitle = safeColumnTitle(column.title, {});
					const displayTitle = renderTitle?.toString();
					if (sortOrder) cell["aria-sort"] = sortOrder === "ascend" ? "ascending" : "descending";
					cell["aria-description"] = a11yLocale?.sortable;
					cell["aria-label"] = displayTitle || "";
					cell.className = clsx(cell.className, `${prefixCls}-column-has-sorters`);
					cell.tabIndex = 0;
					if (column.ellipsis) cell.title = (renderTitle ?? "").toString();
					return cell;
				}
			};
		}
		if ("children" in newColumn) newColumn = {
			...newColumn,
			children: injectSorter(prefixCls, newColumn.children, sorterStates, triggerSorter, defaultSortDirections, tableLocale, tableShowSorterTooltip, columnPos, a11yLocale)
		};
		return newColumn;
	});
}
function stateToInfo(sorterState) {
	const { column, sortOrder } = sorterState;
	return {
		column,
		order: sortOrder,
		field: column.dataIndex,
		columnKey: column.key
	};
}
function generateSorterInfo(sorterStates) {
	const activeSorters = sorterStates.filter(({ sortOrder }) => sortOrder).map(stateToInfo);
	if (activeSorters.length === 0 && sorterStates.length) return {
		...stateToInfo(sorterStates[sorterStates.length - 1]),
		column: void 0,
		order: void 0,
		field: void 0,
		columnKey: void 0
	};
	if (activeSorters.length <= 1) return activeSorters[0] || {};
	return activeSorters;
}
function getSortData(data, sortStates, childrenColumnName) {
	const innerSorterStates = sortStates.slice().sort((a, b) => b.multiplePriority - a.multiplePriority);
	const cloneData = data.slice();
	const runningSorters = innerSorterStates.filter(({ column: { sorter }, sortOrder }) => getSortFunction(sorter) && sortOrder);
	if (!runningSorters.length) return cloneData;
	return cloneData.sort((record1, record2) => {
		for (let i = 0; i < runningSorters.length; i += 1) {
			const { column: { sorter }, sortOrder } = runningSorters[i];
			const compareFn = getSortFunction(sorter);
			if (compareFn && sortOrder) {
				const compareResult = compareFn(record1, record2, sortOrder);
				if (compareResult !== 0) return sortOrder === ASCEND ? compareResult : -compareResult;
			}
		}
		return 0;
	}).map((record) => {
		const subRecords = record?.[childrenColumnName];
		if (subRecords) return {
			...record,
			[childrenColumnName]: getSortData(subRecords, sortStates, childrenColumnName)
		};
		return record;
	});
}
function useSorter(props) {
	const { prefixCls: rawPrefixCls, mergedColumns: rawMergedColumns, sortDirections: rawSortDirections, tableLocale: rawTableLocale, showSorterTooltip: rawShowSorterTooltip, onSorterChange, globalLocale: rawGlobalLocale } = props;
	const prefixCls = computed(() => unref(rawPrefixCls));
	const mergedColumns = computed(() => unref(rawMergedColumns));
	const sortDirections = computed(() => unref(rawSortDirections));
	const tableLocale = computed(() => unref(rawTableLocale));
	const showSorterTooltip = computed(() => unref(rawShowSorterTooltip));
	const globalLocale = computed(() => unref(rawGlobalLocale));
	const sortStates = shallowRef(collectSortStates(mergedColumns.value, true));
	const getColumnKeys = (columns, pos) => {
		const newKeys = [];
		columns.forEach((item, index) => {
			const columnPos = getColumnPos(index, pos);
			newKeys.push(getColumnKey(item, columnPos));
			if (Array.isArray(item.children)) {
				const childKeys = getColumnKeys(item.children, columnPos);
				newKeys.push(...childKeys);
			}
		});
		return newKeys;
	};
	const mergedSorterStates = computed(() => {
		let validate = true;
		const collectedStates = collectSortStates(mergedColumns.value, false);
		if (!collectedStates.length) {
			const mergedColumnsKeys = getColumnKeys(mergedColumns.value);
			return sortStates.value.filter(({ key }) => mergedColumnsKeys.includes(key));
		}
		const validateStates = [];
		function patchStates(state) {
			if (validate) validateStates.push(state);
			else validateStates.push({
				...state,
				sortOrder: null
			});
		}
		let multipleMode = null;
		collectedStates.forEach((state) => {
			if (multipleMode === null) {
				patchStates(state);
				if (state.sortOrder) if (state.multiplePriority === false) validate = false;
				else multipleMode = true;
			} else if (multipleMode && state.multiplePriority !== false) patchStates(state);
			else {
				validate = false;
				patchStates(state);
			}
		});
		return validateStates;
	});
	const columnTitleSorterProps = computed(() => {
		const sortColumns = mergedSorterStates.value.map(({ column, sortOrder }) => ({
			column,
			order: sortOrder
		}));
		return {
			sortColumns,
			sortColumn: sortColumns[0]?.column,
			sortOrder: sortColumns[0]?.order
		};
	});
	const triggerSorter = (sortState) => {
		let newSorterStates;
		if (sortState.multiplePriority === false || !mergedSorterStates.value.length || mergedSorterStates.value[0].multiplePriority === false) newSorterStates = [sortState];
		else newSorterStates = [...mergedSorterStates.value.filter(({ key }) => key !== sortState.key), sortState];
		sortStates.value = newSorterStates;
		onSorterChange(generateSorterInfo(newSorterStates), newSorterStates);
	};
	const transformColumns = (innerColumns) => injectSorter(prefixCls.value, innerColumns, mergedSorterStates.value, triggerSorter, sortDirections.value, tableLocale.value, showSorterTooltip.value, void 0, globalLocale.value);
	const getSorters = () => generateSorterInfo(mergedSorterStates.value);
	return [
		transformColumns,
		mergedSorterStates,
		columnTitleSorterProps,
		getSorters
	];
}

//#endregion
export { useSorter as default, getSortData };