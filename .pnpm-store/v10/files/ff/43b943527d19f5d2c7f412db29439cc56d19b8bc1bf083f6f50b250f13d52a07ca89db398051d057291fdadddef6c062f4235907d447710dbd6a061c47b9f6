import { useInjectTableContext } from "../context/TableContext.js";
import { useProvideSummaryContext } from "./SummaryContext.js";
import SummaryCell from "./Cell.js";
import FooterRow from "./Row.js";
import Summary from "./Summary.js";
import { createVNode, defineComponent, reactive, watchEffect } from "vue";
//#region src/Footer/index.tsx
var Footer = /* @__PURE__ */ defineComponent({
	name: "TableFooter",
	props: ["stickyOffsets", "flattenColumns"],
	inheritAttrs: false,
	setup(props, { slots }) {
		const context = useInjectTableContext();
		const summaryContext = reactive({
			stickyOffsets: props.stickyOffsets,
			flattenColumns: props.flattenColumns,
			scrollColumnIndex: null
		});
		watchEffect(() => {
			const lastColumnIndex = props.flattenColumns.length - 1;
			const scrollColumn = props.flattenColumns[lastColumnIndex];
			summaryContext.stickyOffsets = props.stickyOffsets;
			summaryContext.flattenColumns = props.flattenColumns;
			summaryContext.scrollColumnIndex = scrollColumn?.scrollbar ? lastColumnIndex : null;
		});
		useProvideSummaryContext(summaryContext);
		return () => createVNode("tfoot", { "class": `${context.prefixCls}-summary` }, [slots.default?.()]);
	}
});
var FooterComponents = Summary;
//#endregion
export { FooterComponents, SummaryCell, FooterRow as SummaryRow, Footer as default };
