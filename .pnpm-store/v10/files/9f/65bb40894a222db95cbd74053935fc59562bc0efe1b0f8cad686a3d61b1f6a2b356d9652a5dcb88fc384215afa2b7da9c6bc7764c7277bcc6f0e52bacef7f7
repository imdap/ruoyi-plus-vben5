import { createVNode, defineComponent, ref } from "vue";
import ResizeObserver from "@v-c/resize-observer";
import { useLayoutEffect } from "@v-c/util/dist/hooks/useLayoutEffect";
//#region src/Body/MeasureCell.tsx
var MeasureCell = /* @__PURE__ */ defineComponent({
	name: "TableMeasureCell",
	props: [
		"columnKey",
		"onColumnResize",
		"title"
	],
	setup(props) {
		const cellRef = ref(null);
		useLayoutEffect(() => {
			if (cellRef.value) props.onColumnResize(props.columnKey, cellRef.value.offsetWidth);
		}, []);
		return () => createVNode(ResizeObserver, { "data": props.columnKey }, { default: () => [createVNode("td", {
			"ref": cellRef,
			"style": {
				paddingTop: 0,
				paddingBottom: 0,
				borderTop: 0,
				borderBottom: 0,
				height: 0
			}
		}, [createVNode("div", { "style": {
			height: 0,
			overflow: "hidden",
			fontWeight: "bold"
		} }, [props.title || "\xA0"])])] });
	}
});
//#endregion
export { MeasureCell as default };
