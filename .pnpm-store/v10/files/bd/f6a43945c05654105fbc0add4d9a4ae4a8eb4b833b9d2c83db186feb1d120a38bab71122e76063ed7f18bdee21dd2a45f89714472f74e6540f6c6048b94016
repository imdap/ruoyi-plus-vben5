import { useInjectTableContext } from "../context/TableContext.js";
import Cell from "../Cell/index.js";
import { createVNode, defineComponent, isVNode } from "vue";
//#region src/Body/ExpandedRow.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var ExpandedRow = /* @__PURE__ */ defineComponent({
	name: "TableExpandedRow",
	props: [
		"prefixCls",
		"component",
		"cellComponent",
		"className",
		"expanded",
		"colSpan",
		"isEmpty",
		"stickyOffset"
	],
	setup(props, { slots }) {
		const context = useInjectTableContext();
		return () => {
			const { prefixCls, component: Component, cellComponent, className, expanded, colSpan, isEmpty, stickyOffset = 0 } = props;
			let contentNode = slots.default?.();
			if (isEmpty ? context.horizonScroll && context.componentWidth : context.fixColumn) {
				(function() {
					return contentNode;
				})();
				contentNode = createVNode("div", {
					"style": {
						width: `${context.componentWidth - stickyOffset - (context.fixHeader && !isEmpty ? context.scrollbarSize : 0)}px`,
						position: "sticky",
						left: `${stickyOffset}px`,
						overflow: "hidden"
					},
					"class": `${prefixCls}-expanded-row-fixed`
				}, [contentNode]);
			}
			return createVNode(Component, {
				"class": className,
				"style": { display: expanded ? null : "none" }
			}, { default: () => [createVNode(Cell, {
				"component": cellComponent,
				"prefixCls": prefixCls,
				"colSpan": colSpan
			}, _isSlot(contentNode) ? contentNode : { default: () => [contentNode] })] });
		};
	}
});
//#endregion
export { ExpandedRow as default };
