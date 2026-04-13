import { useInjectTableContext } from "./context/TableContext.js";
import { INTERNAL_COL_DEFINE } from "./utils/legacyUtil.js";
import { createVNode, defineComponent, mergeProps } from "vue";
//#region src/ColGroup.tsx
var ColGroup = /* @__PURE__ */ defineComponent({
	name: "TableColGroup",
	props: [
		"colWidths",
		"columns",
		"columCount"
	],
	setup(props) {
		const context = useInjectTableContext();
		return () => {
			const { colWidths, columns, columCount } = props;
			const cols = [];
			const len = columCount || columns?.length || 0;
			let mustInsert = false;
			for (let i = len - 1; i >= 0; i -= 1) {
				const width = colWidths[i];
				const column = columns && columns[i];
				let additionalProps;
				let minWidth;
				if (column) {
					additionalProps = column[INTERNAL_COL_DEFINE];
					if (context.tableLayout === "auto") minWidth = column.minWidth;
				}
				if (width || minWidth || additionalProps || mustInsert) {
					const mergedWidth = typeof width === "number" ? `${width}px` : width;
					const mergedMinWidth = typeof minWidth === "number" ? `${minWidth}px` : minWidth;
					const { columnType, ...restAdditionalProps } = additionalProps || {};
					cols.unshift(createVNode("col", mergeProps({
						"key": i,
						"style": {
							width: mergedWidth,
							minWidth: mergedMinWidth
						}
					}, restAdditionalProps), null));
					mustInsert = true;
				}
			}
			return cols.length > 0 ? createVNode("colgroup", null, [cols]) : null;
		};
	}
});
//#endregion
export { ColGroup as default };
