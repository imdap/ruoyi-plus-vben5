import { useInjectTableContext } from "../context/TableContext.js";
import ColGroup from "../ColGroup.js";
import { computed, createVNode, defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import { clsx } from "@v-c/util";
import { getStylePxValue, toPropsRefs } from "@v-c/util/dist/props-util";
//#region src/FixedHolder/index.tsx
function useColumnWidth(colWidths, columnCount) {
	return computed(() => {
		const cloneColumns = [];
		for (let i = 0; i < columnCount.value; i += 1) {
			const val = colWidths.value[i];
			if (val !== void 0) cloneColumns[i] = val;
			else return null;
		}
		return cloneColumns;
	});
}
var FixedHolder = /* @__PURE__ */ defineComponent({
	name: "TableFixedHolder",
	props: [
		"className",
		"style",
		"noData",
		"columns",
		"flattenColumns",
		"colWidths",
		"colGroup",
		"columCount",
		"stickyOffsets",
		"direction",
		"fixHeader",
		"stickyTopOffset",
		"stickyBottomOffset",
		"stickyClassName",
		"scrollX",
		"tableLayout",
		"onScroll",
		"maxContentScroll"
	],
	setup(props, { slots, expose }) {
		const context = useInjectTableContext();
		const scrollRef = ref(null);
		const { colWidths, columCount } = toPropsRefs(props, "colWidths", "columCount");
		expose({ nativeElement: scrollRef });
		const combinationScrollBarSize = computed(() => {
			return context.isSticky && !props.fixHeader ? 0 : context.scrollbarSize;
		});
		const mergedColumnWidth = useColumnWidth(colWidths, columCount);
		const isColGroupEmpty = computed(() => {
			const widths = mergedColumnWidth.value;
			const noWidth = !widths || !widths.length || widths.every((w) => !w);
			return props.noData || noWidth;
		});
		const columnsWithScrollbar = computed(() => {
			const ScrollBarColumn = {
				fixed: props.flattenColumns[props.flattenColumns.length - 1]?.fixed,
				scrollbar: true,
				onHeaderCell: () => ({ class: `${context.prefixCls}-cell-scrollbar` })
			};
			return combinationScrollBarSize.value ? [...props.columns, ScrollBarColumn] : props.columns;
		});
		const flattenColumnsWithScrollbar = computed(() => {
			const ScrollBarColumn = {
				fixed: props.flattenColumns[props.flattenColumns.length - 1]?.fixed,
				scrollbar: true,
				onHeaderCell: () => ({ class: `${context.prefixCls}-cell-scrollbar` })
			};
			return combinationScrollBarSize.value ? [...props.flattenColumns, ScrollBarColumn] : props.flattenColumns;
		});
		const headerStickyOffsets = computed(() => {
			const { start, end } = props.stickyOffsets;
			return {
				...props.stickyOffsets,
				start,
				end: [...end.map((width) => width + combinationScrollBarSize.value), 0],
				isSticky: context.isSticky
			};
		});
		const onWheel = (event) => {
			const currentTarget = event.currentTarget;
			const { deltaX } = event;
			if (deltaX) {
				const { scrollLeft, scrollWidth, clientWidth } = currentTarget;
				const maxScrollWidth = scrollWidth - clientWidth;
				let nextScroll = scrollLeft + deltaX;
				if (props.direction === "rtl") {
					nextScroll = Math.max(-maxScrollWidth, nextScroll);
					nextScroll = Math.min(0, nextScroll);
				} else {
					nextScroll = Math.min(maxScrollWidth, nextScroll);
					nextScroll = Math.max(0, nextScroll);
				}
				props.onScroll({
					currentTarget,
					scrollLeft: nextScroll
				});
				event.preventDefault();
			}
		};
		onMounted(() => {
			scrollRef.value?.addEventListener("wheel", onWheel, { passive: false });
		});
		onBeforeUnmount(() => {
			scrollRef.value?.removeEventListener("wheel", onWheel);
		});
		return () => {
			const TableComp = context.getComponent(["header", "table"], "table");
			const slotsProps = {
				...props,
				columns: columnsWithScrollbar.value,
				flattenColumns: flattenColumnsWithScrollbar.value,
				stickyOffsets: headerStickyOffsets.value
			};
			return createVNode("div", {
				"style": {
					overflow: "hidden",
					...context.isSticky ? {
						top: getStylePxValue(props.stickyTopOffset),
						bottom: getStylePxValue(props.stickyBottomOffset)
					} : {},
					...props.style
				},
				"ref": scrollRef,
				"class": clsx(props.className, { [props.stickyClassName]: !!props.stickyClassName })
			}, [createVNode(TableComp, { "style": {
				tableLayout: props.tableLayout,
				minWidth: "100%",
				width: typeof props.scrollX === "number" ? `${props.scrollX}px` : props.scrollX
			} }, { default: () => [isColGroupEmpty.value ? props.colGroup : createVNode(ColGroup, {
				"colWidths": [...mergedColumnWidth.value || [], combinationScrollBarSize.value],
				"columCount": props.columCount + 1,
				"columns": flattenColumnsWithScrollbar.value
			}, null), slots.default?.(slotsProps)] })]);
		};
	}
});
//#endregion
export { FixedHolder as default };
