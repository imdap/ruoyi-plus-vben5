import { useInjectTableContext } from "../context/TableContext.js";
import { useInjectPerfContext } from "../context/PerfContext.js";
import { validateValue } from "../utils/valueUtil.js";
import useHoverState from "./useHoverState.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx, warning } from "@v-c/util";
import { filterEmpty, getStylePxValue } from "@v-c/util/dist/props-util";
import getValue from "@v-c/util/dist/utils/get";
//#region src/Cell/index.tsx
function getTitleFromCellRenderChildren({ ellipsis, rowType, children }) {
	const ellipsisConfig = ellipsis === true ? { showTitle: true } : ellipsis;
	const showTitle = !!(ellipsisConfig && typeof ellipsisConfig === "object" && ellipsisConfig.showTitle);
	if (ellipsisConfig && (showTitle || rowType === "header")) {
		if (typeof children === "string" || typeof children === "number") return children.toString();
		if (isVNode(children) && typeof children.children === "string") return children.children;
		if (Array.isArray(children)) {
			const first = filterEmpty(children)[0];
			if (typeof first === "string" || typeof first === "number") return first.toString();
			if (isVNode(first) && typeof first.children === "string") return first.children;
		}
	}
}
function isRenderCell(data) {
	return data && typeof data === "object" && !Array.isArray(data) && !isVNode(data);
}
function resolveCellRender({ record, dataIndex, renderIndex, children, render, perfRecord }) {
	if (validateValue(children)) return [children];
	const value = getValue(record, dataIndex === null || dataIndex === void 0 || dataIndex === "" ? [] : Array.isArray(dataIndex) ? dataIndex : [dataIndex]);
	let returnChildNode = value;
	let returnCellProps;
	if (render) {
		const renderData = render(value, record, renderIndex);
		if (isRenderCell(renderData)) {
			if (process.env.NODE_ENV !== "production") warning(false, "`columns.render` return cell props is deprecated with perf issue, please use `onCell` instead.");
			returnChildNode = renderData.props?.children ?? renderData.children;
			returnCellProps = renderData.props;
			if (perfRecord) perfRecord.renderWithProps = true;
		} else returnChildNode = renderData;
	}
	return [returnChildNode, returnCellProps];
}
var Cell = /* @__PURE__ */ defineComponent({
	name: "TableCell",
	props: [
		"prefixCls",
		"className",
		"style",
		"record",
		"index",
		"colIndex",
		"renderIndex",
		"dataIndex",
		"render",
		"component",
		"children",
		"colSpan",
		"rowSpan",
		"scope",
		"ellipsis",
		"align",
		"shouldCellUpdate",
		"column",
		"fixStart",
		"fixEnd",
		"fixedStartShadow",
		"fixedEndShadow",
		"offsetFixedStartShadow",
		"offsetFixedEndShadow",
		"zIndex",
		"zIndexReverse",
		"allColsFixedLeft",
		"appendNode",
		"additionalProps",
		"rowType",
		"isSticky"
	],
	setup(props, { slots }) {
		const tableContext = useInjectTableContext();
		const perfRecord = useInjectPerfContext();
		const isFixStart = computed(() => {
			return typeof props.fixStart === "number" && !tableContext.allColumnsFixedLeft;
		});
		const isFixEnd = computed(() => {
			return typeof props.fixEnd === "number" && !tableContext.allColumnsFixedLeft;
		});
		const shadowInfo = computed(() => {
			const { fixedEndShadow, offsetFixedStartShadow, offsetFixedEndShadow, fixedStartShadow } = props;
			const [absScroll = 0, scrollWidth = 0] = tableContext.scrollInfo || [];
			if (!isFixStart.value && !isFixEnd.value) return [false, false];
			return [isFixStart.value && fixedStartShadow ? absScroll - (offsetFixedStartShadow || 0) >= 1 : false, isFixEnd && fixedEndShadow ? scrollWidth - absScroll - (offsetFixedEndShadow || 0) > 1 : false];
		});
		return () => {
			const { component: Component = "td", ellipsis, scope, prefixCls, className, style, align, record, index, colIndex, renderIndex, dataIndex, render, column, rowType, colSpan, rowSpan, fixStart, fixEnd, fixedStartShadow, fixedEndShadow, zIndex, zIndexReverse, additionalProps = {}, isSticky, appendNode } = props;
			const cellPrefixCls = `${prefixCls}-cell`;
			const mergedAppendNode = appendNode ?? slots?.appendNode?.();
			const mergedRenderIndex = renderIndex ?? index ?? 0;
			const [childNode, legacyCellProps] = resolveCellRender({
				record,
				dataIndex,
				renderIndex: mergedRenderIndex,
				children: props.children ?? slots?.default?.(),
				render,
				perfRecord
			});
			const fixedStyle = {};
			const [showFixStartShadow, showFixEndShadow] = shadowInfo.value;
			if (isFixStart.value) {
				fixedStyle.insetInlineStart = getStylePxValue(fixStart);
				fixedStyle["--z-offset"] = zIndex;
				fixedStyle["--z-offset-reverse"] = zIndexReverse;
			}
			if (isFixEnd.value) {
				fixedStyle.insetInlineEnd = getStylePxValue(fixEnd);
				fixedStyle["--z-offset"] = zIndex;
				fixedStyle["--z-offset-reverse"] = zIndexReverse;
			}
			const mergedColSpan = legacyCellProps?.colSpan ?? additionalProps.colSpan ?? colSpan ?? 1;
			const mergedRowSpan = legacyCellProps?.rowSpan ?? additionalProps.rowSpan ?? rowSpan ?? 1;
			const [hovering, onHover] = useHoverState(index, mergedRowSpan, tableContext);
			const onMouseEnter = (event) => {
				if (record) onHover(index, index + mergedRowSpan - 1);
				(additionalProps.onMouseEnter || additionalProps.onMouseenter)?.(event);
			};
			const onMouseLeave = (event) => {
				if (record) onHover(-1, -1);
				(additionalProps.onMouseLeave || additionalProps.onMouseleave)?.(event);
			};
			if (mergedColSpan === 0 || mergedRowSpan === 0) return null;
			let mergedChildNode = childNode;
			const renderCell = rowType === "header" ? tableContext.headerCell : rowType === "body" ? tableContext.bodyCell : void 0;
			if (renderCell && column) {
				const ctxIndex = rowType === "header" ? colIndex ?? 0 : mergedRenderIndex;
				const renderCellNode = rowType === "body" ? renderCell({
					column,
					index: ctxIndex,
					text: childNode,
					record
				}) : renderCell({
					column,
					index: ctxIndex,
					text: childNode
				});
				if (Array.isArray(renderCellNode)) {
					const filteredNodes = filterEmpty(renderCellNode);
					if (filteredNodes.length > 0) mergedChildNode = filteredNodes;
				} else if (renderCellNode !== null && renderCellNode !== void 0) mergedChildNode = renderCellNode;
			}
			const title = additionalProps.title ?? getTitleFromCellRenderChildren({
				rowType,
				ellipsis,
				children: mergedChildNode
			});
			const additionalClassName = additionalProps.className || additionalProps.class;
			const mergedClassName = clsx(cellPrefixCls, className, {
				[`${cellPrefixCls}-fix`]: isFixStart.value || isFixEnd.value,
				[`${cellPrefixCls}-fix-start`]: isFixStart.value,
				[`${cellPrefixCls}-fix-end`]: isFixEnd.value,
				[`${cellPrefixCls}-fix-start-shadow`]: fixedStartShadow,
				[`${cellPrefixCls}-fix-start-shadow-show`]: fixedStartShadow && showFixStartShadow,
				[`${cellPrefixCls}-fix-end-shadow`]: fixedEndShadow,
				[`${cellPrefixCls}-fix-end-shadow-show`]: fixedEndShadow && showFixEndShadow,
				[`${cellPrefixCls}-ellipsis`]: ellipsis,
				[`${cellPrefixCls}-with-append`]: mergedAppendNode,
				[`${cellPrefixCls}-fix-sticky`]: (isFixStart.value || isFixEnd.value) && isSticky,
				[`${cellPrefixCls}-row-hover`]: !legacyCellProps && hovering.value
			}, additionalClassName, legacyCellProps?.className);
			const alignStyle = {};
			if (align) alignStyle.textAlign = align;
			const mergedStyle = {
				...legacyCellProps?.style,
				...fixedStyle,
				...alignStyle,
				...additionalProps.style,
				...style
			};
			if (typeof mergedChildNode === "object" && !Array.isArray(mergedChildNode) && !isVNode(mergedChildNode)) mergedChildNode = null;
			if (ellipsis && (fixedStartShadow || fixedEndShadow)) {
				(function() {
					return mergedChildNode;
				})();
				mergedChildNode = createVNode("span", { "class": `${cellPrefixCls}-content` }, [mergedChildNode]);
			}
			return createVNode(Component, mergeProps(legacyCellProps, additionalProps, {
				"class": mergedClassName,
				"style": mergedStyle,
				"title": title,
				"scope": scope,
				"onMouseenter": tableContext.rowHoverable ? onMouseEnter : void 0,
				"onMouseleave": tableContext.rowHoverable ? onMouseLeave : void 0,
				"colSpan": mergedColSpan !== 1 ? mergedColSpan : null,
				"rowSpan": mergedRowSpan !== 1 ? mergedRowSpan : null
			}), { default: () => [mergedAppendNode, mergedChildNode] });
		};
	}
});
//#endregion
export { Cell as default };
