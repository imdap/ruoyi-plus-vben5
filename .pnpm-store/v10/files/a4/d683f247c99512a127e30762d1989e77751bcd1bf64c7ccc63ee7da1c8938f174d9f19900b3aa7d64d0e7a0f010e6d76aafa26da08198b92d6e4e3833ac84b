import { useInjectTableContext } from "../context/TableContext.js";
import Cell from "../Cell/index.js";
import { getCellFixedInfo } from "../utils/fixUtil.js";
import { useInjectSummaryContext } from "./SummaryContext.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
//#region src/Footer/Cell.tsx
var SummaryCell = /* @__PURE__ */ defineComponent({
	name: "TableSummaryCell",
	props: [
		"className",
		"index",
		"colSpan",
		"rowSpan",
		"align"
	],
	setup(props, { slots }) {
		const { prefixCls } = useInjectTableContext();
		const summaryContext = useInjectSummaryContext();
		const mergedColSpan = computed(() => {
			const lastIndex = props.index + (props.colSpan || 1) - 1;
			const scrollColumnIndex = summaryContext.scrollColumnIndex;
			return scrollColumnIndex !== null && lastIndex + 1 === scrollColumnIndex ? (props.colSpan || 1) + 1 : props.colSpan || 1;
		});
		const fixedInfo = computed(() => {
			const stickyOffsets = summaryContext.stickyOffsets || {
				start: [],
				end: [],
				widths: []
			};
			return getCellFixedInfo(props.index, props.index + mergedColSpan.value - 1, summaryContext.flattenColumns || [], stickyOffsets);
		});
		return () => createVNode(Cell, mergeProps({
			"className": props.className,
			"index": props.index,
			"component": "td",
			"prefixCls": prefixCls,
			"record": null,
			"dataIndex": null,
			"align": props.align,
			"colSpan": mergedColSpan.value,
			"rowSpan": props.rowSpan,
			"render": () => slots.default?.()
		}, fixedInfo.value), null);
	}
});
//#endregion
export { SummaryCell as default };
