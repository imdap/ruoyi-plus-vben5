import Cell from "../Cell/index.js";
import useRowInfo from "../hooks/useRowInfo.js";
import { computedExpandedClassName } from "../utils/expandUtil.js";
import ExpandedRow from "./ExpandedRow.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeProps, ref, watchEffect } from "vue";
import { clsx } from "@v-c/util";
//#region src/Body/BodyRow.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function getCellProps(rowInfo, record, column, colIndex, indent, index, rowKeys = [], expandedRowOffset = 0) {
	const { columnsKey, nestExpandable, expanded, hasNestChildren, expandable } = rowInfo;
	const { prefixCls, fixedInfoList, expandIconColumnIndex, indentSize, expandIcon, onTriggerExpand, expandedKeys } = rowInfo.tableContext;
	const key = columnsKey.value[colIndex];
	const fixedInfo = fixedInfoList[colIndex];
	let appendCellNode;
	if (colIndex === (expandIconColumnIndex || 0) && nestExpandable.value) appendCellNode = createVNode(Fragment, null, [createVNode("span", {
		"style": { paddingLeft: `${indentSize * indent}px` },
		"class": `${prefixCls}-row-indent indent-level-${indent}`
	}, null), expandIcon({
		prefixCls,
		expanded: expanded.value,
		expandable: hasNestChildren.value,
		record,
		onExpand: onTriggerExpand
	})]);
	const additionalCellProps = column.onCell?.(record, index) || {};
	if (expandedRowOffset) {
		const { rowSpan = 1 } = additionalCellProps;
		if (expandable.value && rowSpan && colIndex < expandedRowOffset) {
			let currentRowSpan = rowSpan;
			for (let i = index; i < index + rowSpan; i += 1) {
				const keyInRow = rowKeys[i];
				if (expandedKeys.has(keyInRow)) currentRowSpan += 1;
			}
			additionalCellProps.rowSpan = currentRowSpan;
		}
	}
	return {
		key,
		fixedInfo,
		appendCellNode,
		additionalCellProps
	};
}
var BodyRow = /* @__PURE__ */ defineComponent({
	name: "TableBodyRow",
	props: [
		"record",
		"index",
		"renderIndex",
		"className",
		"style",
		"classNames",
		"styles",
		"rowComponent",
		"cellComponent",
		"scopeCellComponent",
		"indent",
		"rowKey",
		"rowKeys",
		"expandedRowInfo"
	],
	setup(props) {
		const expandedRef = ref(false);
		const rowInfo = useRowInfo(computed(() => props.record), computed(() => props.rowKey), computed(() => props.index), computed(() => props.indent || 0));
		watchEffect(() => {
			if (rowInfo.expanded.value) expandedRef.value = true;
		});
		return () => {
			let _slot;
			const { className, style, classNames, styles, record, index, renderIndex, rowKey, rowKeys, indent = 0, rowComponent: RowComponent, cellComponent: BodyCellComponent, scopeCellComponent, expandedRowInfo } = props;
			const { tableContext, rowProps, expanded, rowSupportExpand } = rowInfo;
			const prefixCls = tableContext.prefixCls;
			const flattenColumns = tableContext.flattenColumns;
			const expandedRowClassName = tableContext.expandedRowClassName;
			const expandedRowRender = tableContext.expandedRowRender;
			const expandedClsName = computedExpandedClassName(expandedRowClassName, record, index, indent);
			const rowPropsStyle = rowProps.value?.style;
			const mergedRowStyle = {
				...style || {},
				...typeof rowPropsStyle === "object" ? rowPropsStyle : {},
				...styles?.row || {}
			};
			const baseRowNode = createVNode(RowComponent, mergeProps(rowProps.value, {
				"data-row-key": rowKey,
				"key": `row-${rowKey}`,
				"class": clsx(className, `${prefixCls}-row`, `${prefixCls}-row-level-${indent}`, rowProps.value?.className, rowProps.value?.class, classNames?.row, { [expandedClsName]: indent >= 1 }),
				"style": mergedRowStyle
			}), _isSlot(_slot = flattenColumns.map((column, colIndex) => {
				const { render, dataIndex, className: columnClassName } = column;
				const { key, fixedInfo, appendCellNode, additionalCellProps } = getCellProps(rowInfo, record, column, colIndex, indent, index, rowKeys, expandedRowInfo?.offset);
				const scope = column.rowScope ? column.rowScope : column.title ? "row" : void 0;
				const CellComponent = column.rowScope ? scopeCellComponent : BodyCellComponent;
				return createVNode(Cell, mergeProps({
					"className": clsx(columnClassName, classNames?.cell),
					"style": styles?.cell,
					"ellipsis": column.ellipsis,
					"align": column.align,
					"component": CellComponent,
					"prefixCls": prefixCls,
					"key": key,
					"record": record,
					"index": index,
					"renderIndex": renderIndex,
					"dataIndex": dataIndex,
					"render": render,
					"scope": scope,
					"rowType": "body"
				}, fixedInfo, {
					"additionalProps": additionalCellProps,
					"column": column,
					"appendNode": appendCellNode
				}), null);
			})) ? _slot : { default: () => [_slot] });
			let expandRowNode;
			if (rowSupportExpand.value && (expandedRef.value || expanded.value)) {
				const expandContent = expandedRowRender(record, index, indent + 1, expanded.value);
				const computedExpandedRowClassName = computedExpandedClassName(expandedRowClassName, record, index, indent);
				expandRowNode = createVNode(ExpandedRow, {
					"expanded": expanded.value,
					"className": clsx(`${prefixCls}-expanded-row`, `${prefixCls}-expanded-row-level-${indent + 1}`, computedExpandedRowClassName),
					"key": `expanded-row-${rowKey}`,
					"prefixCls": prefixCls,
					"component": RowComponent,
					"cellComponent": BodyCellComponent,
					"colSpan": expandedRowInfo?.colSpan ?? flattenColumns.length,
					"stickyOffset": expandedRowInfo?.sticky,
					"isEmpty": false
				}, _isSlot(expandContent) ? expandContent : { default: () => [expandContent] });
			}
			if (expandRowNode) return createVNode(Fragment, null, [baseRowNode, expandRowNode]);
			return createVNode(Fragment, null, [baseRowNode]);
		};
	}
});
//#endregion
export { BodyRow as default, getCellProps };
