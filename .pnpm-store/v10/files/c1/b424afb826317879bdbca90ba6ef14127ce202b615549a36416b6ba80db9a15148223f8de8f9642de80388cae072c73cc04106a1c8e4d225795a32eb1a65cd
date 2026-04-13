import Column_default from "./Column.js";
import ColumnGroup_default from "./ColumnGroup.js";
import { SELECTION_ALL, SELECTION_COLUMN, SELECTION_INVERT, SELECTION_NONE } from "./hooks/useSelection.js";
import InternalTable_default from "./InternalTable.js";
import { createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import { omit } from "es-toolkit";
import { EXPAND_COLUMN, Summary } from "@v-c/table";

//#region src/table/Table.tsx
const ForwardTable = /* @__PURE__ */ defineComponent((props, { slots, attrs, expose, emit }) => {
	const renderTimesRef = shallowRef(0);
	renderTimesRef.value += 1;
	const tableRef = shallowRef(null);
	expose({
		scrollTo: (...args) => tableRef.value?.scrollTo?.(...args),
		get nativeElement() {
			return tableRef.value?.nativeElement;
		}
	});
	return () => createVNode(InternalTable_default, mergeProps(omit(props, ["onUpdate:expandedRowKeys", "onChange"]), attrs, {
		"onChange": (pagination, filters, sorter, extra) => {
			emit("change", pagination, filters, sorter, extra);
		},
		"onUpdate:expandedRowKeys": (keys) => {
			emit("update:expandedRowKeys", keys);
		},
		"_renderTimes": renderTimesRef.value,
		"ref": tableRef
	}), slots);
}, {
	props: {
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		dropdownPrefixCls: {
			type: String,
			required: false
		},
		dataSource: {
			type: Array,
			required: false
		},
		columns: {
			type: Array,
			required: false
		},
		pagination: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		loading: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
			required: false
		},
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		locale: {
			type: Object,
			required: false
		},
		rowSelection: {
			type: Object,
			required: false
		},
		getPopupContainer: {
			type: Function,
			required: false
		},
		scroll: {
			type: Object,
			required: false
		},
		sortDirections: {
			type: Array,
			required: false
		},
		showSorterTooltip: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		virtual: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		rowKey: {
			type: [String, Function],
			required: false,
			skipCheck: true
		},
		tableLayout: {
			type: String,
			required: false
		},
		expandable: {
			type: Object,
			required: false
		},
		indentSize: {
			type: Number,
			required: false
		},
		rowClassName: {
			type: [String, Function],
			required: false
		},
		title: {
			type: Function,
			required: false
		},
		footer: {
			type: Function,
			required: false
		},
		summary: {
			type: Function,
			required: false
		},
		headerCell: {
			type: Function,
			required: false
		},
		bodyCell: {
			type: Function,
			required: false
		},
		caption: { required: false },
		id: {
			type: String,
			required: false
		},
		showHeader: {
			type: Boolean,
			required: false,
			default: void 0
		},
		components: {
			type: Object,
			required: false
		},
		onRow: {
			type: Function,
			required: false
		},
		onHeaderRow: {
			type: Function,
			required: false
		},
		direction: {
			type: String,
			required: false
		},
		sticky: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		rowHoverable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tailor: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getContainerWidth: {
			type: Function,
			required: false
		},
		measureRowRender: {
			type: Function,
			required: false
		},
		expandedRowKeys: {
			type: Array,
			required: false
		},
		defaultExpandedRowKeys: {
			type: Array,
			required: false
		},
		expandedRowRender: {
			type: Function,
			required: false
		},
		expandRowByClick: {
			type: Boolean,
			required: false,
			default: void 0
		},
		expandIcon: {
			type: Function,
			required: false
		},
		onExpand: {
			type: Function,
			required: false
		},
		onExpandedRowsChange: {
			type: Function,
			required: false
		},
		defaultExpandAllRows: {
			type: Boolean,
			required: false,
			default: void 0
		},
		expandIconColumnIndex: {
			type: Number,
			required: false
		},
		expandedRowClassName: {
			type: Function,
			required: false
		},
		childrenColumnName: {
			type: String,
			required: false
		}
	},
	emits: [
		"change",
		"update:expandedRowKeys",
		"scroll"
	],
	name: "ATable",
	inheritAttrs: false
});
ForwardTable.SELECTION_COLUMN = SELECTION_COLUMN;
ForwardTable.EXPAND_COLUMN = EXPAND_COLUMN;
ForwardTable.SELECTION_ALL = SELECTION_ALL;
ForwardTable.SELECTION_INVERT = SELECTION_INVERT;
ForwardTable.SELECTION_NONE = SELECTION_NONE;
ForwardTable.Column = Column_default;
ForwardTable.ColumnGroup = ColumnGroup_default;
ForwardTable.Summary = Summary;
var Table_default = ForwardTable;

//#endregion
export { Table_default as default };