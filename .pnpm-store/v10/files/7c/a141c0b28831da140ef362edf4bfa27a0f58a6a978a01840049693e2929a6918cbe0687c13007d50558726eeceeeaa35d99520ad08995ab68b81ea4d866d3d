import { useInjectTableContext } from "../context/TableContext.js";
import { useProvidePerfContext } from "../context/PerfContext.js";
import useFlattenRecords from "../hooks/useFlattenRecords.js";
import { getColumnsKey } from "../utils/valueUtil.js";
import ExpandedRow from "./ExpandedRow.js";
import BodyRow from "./BodyRow.js";
import MeasureRow from "./MeasureRow.js";
import { computed, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
//#region src/Body/index.tsx
var Body = /* @__PURE__ */ defineComponent({
	name: "TableBody",
	props: ["data", "measureColumnWidth"],
	setup(props) {
		useProvidePerfContext();
		const context = useInjectTableContext();
		const bodyCls = computed(() => context.classNames?.body || {});
		const bodyStyles = computed(() => context.styles?.body || {});
		const flattenData = useFlattenRecords(computed(() => props.data), computed(() => context.childrenColumnName), computed(() => context.expandedKeys), computed(() => context.getRowKey));
		const rowKeys = computed(() => flattenData.value.map((item) => item.rowKey));
		const expandedRowInfo = computed(() => {
			const expandedColSpan = context.flattenColumns.length - (context.expandedRowOffset || 0);
			let expandedStickyStart = 0;
			for (let i = 0; i < (context.expandedRowOffset || 0); i += 1) expandedStickyStart += context.colWidths[i] || 0;
			return {
				offset: context.expandedRowOffset || 0,
				colSpan: expandedColSpan,
				sticky: expandedStickyStart
			};
		});
		return () => {
			const WrapperComponent = context.getComponent(["body", "wrapper"], "tbody");
			const trComponent = context.getComponent(["body", "row"], "tr");
			const tdComponent = context.getComponent(["body", "cell"], "td");
			const thComponent = context.getComponent(["body", "cell"], "th");
			let rows;
			if (props.data.length) rows = flattenData.value.map((item, idx) => {
				const { record, indent, index: renderIndex, rowKey } = item;
				return createVNode(BodyRow, {
					"classNames": bodyCls.value,
					"styles": bodyStyles.value,
					"key": rowKey,
					"rowKey": rowKey,
					"rowKeys": rowKeys.value,
					"record": record,
					"index": idx,
					"renderIndex": renderIndex,
					"rowComponent": trComponent,
					"cellComponent": tdComponent,
					"scopeCellComponent": thComponent,
					"indent": indent,
					"expandedRowInfo": expandedRowInfo.value
				}, null);
			});
			else rows = createVNode(ExpandedRow, {
				"expanded": true,
				"className": `${context.prefixCls}-placeholder`,
				"prefixCls": context.prefixCls,
				"component": trComponent,
				"cellComponent": tdComponent,
				"colSpan": context.flattenColumns.length,
				"isEmpty": true
			}, { default: () => [context.emptyNode] });
			const columnsKey = getColumnsKey(context.flattenColumns);
			return createVNode(WrapperComponent, {
				"style": bodyStyles.value.wrapper,
				"class": clsx(`${context.prefixCls}-tbody`, bodyCls.value.wrapper)
			}, { default: () => [props.measureColumnWidth && createVNode(MeasureRow, {
				"prefixCls": context.prefixCls,
				"columnsKey": columnsKey,
				"onColumnResize": context.onColumnResize,
				"columns": context.flattenColumns
			}, null), rows] });
		};
	}
});
//#endregion
export { Body as default };
