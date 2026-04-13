import { useInjectTableContext } from "../context/TableContext.js";
import MeasureCell from "./MeasureCell.js";
import { cloneVNode, createVNode, defineComponent, isVNode, ref } from "vue";
import ResizeObserver from "@v-c/resize-observer";
import { filterEmpty } from "@v-c/util/dist/props-util";
import isVisible from "@v-c/util/dist/Dom/isVisible";
//#region src/Body/MeasureRow.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var MeasureRow = /* @__PURE__ */ defineComponent({
	name: "TableMeasureRow",
	props: [
		"prefixCls",
		"onColumnResize",
		"columnsKey",
		"columns"
	],
	setup(props) {
		const rowRef = ref(null);
		const { measureRowRender } = useInjectTableContext();
		return () => {
			let _slot;
			const cloneTitle = (title) => {
				if (Array.isArray(title)) return title.map((node) => cloneTitle(node));
				if (isVNode(title)) {
					const cloned = cloneVNode(title, { ref: void 0 });
					let children = cloned.children;
					if (cloned.children?.default && typeof cloned.children.default === "function") {
						children = filterEmpty(cloned.children?.default?.());
						if (Array.isArray(children)) children = children.map((child) => cloneTitle(child));
						else if (isVNode(children)) children = cloneTitle(children);
						cloned.children.default = () => children;
					} else if (Array.isArray(children)) cloned.children = children.map((child) => cloneTitle(child));
					return cloned;
				}
				return title;
			};
			const measureRow = createVNode("tr", {
				"aria-hidden": "true",
				"class": `${props.prefixCls}-measure-row`,
				"style": { height: 0 },
				"ref": rowRef
			}, [createVNode(ResizeObserver.Collection, { "onBatchResize": (infoList) => {
				if (isVisible(rowRef.value)) infoList.forEach(({ data: columnKey, size }) => {
					props.onColumnResize(columnKey, size.offsetWidth);
				});
			} }, _isSlot(_slot = props.columnsKey.map((columnKey) => {
				const titleForMeasure = cloneTitle(props.columns.find((col) => col.key === columnKey)?.title);
				return createVNode(MeasureCell, {
					"key": columnKey,
					"columnKey": columnKey,
					"onColumnResize": props.onColumnResize,
					"title": titleForMeasure
				}, null);
			})) ? _slot : { default: () => [_slot] })]);
			return typeof measureRowRender === "function" ? measureRowRender(measureRow) : measureRow;
		};
	}
});
//#endregion
export { MeasureRow as default };
