import { defineComponent } from "vue";

//#region src/table/Column.tsx
/**
* Syntactic sugar for `columns` prop. HOC will not work on this.
*/
const Column = /* @__PURE__ */ defineComponent(() => {
	return () => null;
}, {
	props: {
		children: { required: false },
		title: {
			type: Function,
			required: false,
			skipCheck: true
		},
		sorter: {
			type: [
				Boolean,
				Function,
				Object
			],
			required: false,
			default: void 0
		},
		sortOrder: {
			type: [String, null],
			required: false
		},
		defaultSortOrder: {
			type: [String, null],
			required: false
		},
		sortDirections: {
			type: Array,
			required: false
		},
		sortIcon: {
			type: Function,
			required: false
		},
		showSorterTooltip: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		filtered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		filters: {
			type: Array,
			required: false
		},
		filterDropdown: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		filterOnClose: {
			type: Boolean,
			required: false,
			default: void 0
		},
		filterMultiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		filteredValue: {
			type: [Array, null],
			required: false
		},
		defaultFilteredValue: {
			type: [Array, null],
			required: false
		},
		filterIcon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		filterMode: {
			type: String,
			required: false
		},
		filterSearch: {
			type: [Boolean, Function],
			required: false,
			default: void 0
		},
		onFilter: {
			type: Function,
			required: false
		},
		filterDropdownProps: {
			type: Object,
			required: false
		},
		filterResetToDefaultFilteredValue: {
			type: Boolean,
			required: false,
			default: void 0
		},
		responsive: {
			type: Array,
			required: false
		},
		filterDropdownOpen: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onFilterDropdownOpenChange: {
			type: Function,
			required: false
		},
		colSpan: {
			type: Number,
			required: false
		},
		dataIndex: { required: false },
		render: {
			type: Function,
			required: false
		},
		shouldCellUpdate: {
			type: Function,
			required: false
		},
		rowSpan: {
			type: Number,
			required: false
		},
		width: {
			type: [Number, String],
			required: false
		},
		minWidth: {
			type: Number,
			required: false
		},
		onCell: {
			type: Function,
			required: false
		},
		onCellClick: {
			type: Function,
			required: false
		},
		key: {
			type: [String, Number],
			required: false
		},
		className: {
			type: String,
			required: false
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		fixed: {
			type: [String, Boolean],
			required: false,
			default: void 0
		},
		onHeaderCell: {
			type: Function,
			required: false
		},
		ellipsis: {
			type: [Object, Boolean],
			required: false,
			default: void 0
		},
		align: {
			type: String,
			required: false
		},
		rowScope: {
			type: String,
			required: false
		}
	},
	name: "ATableColumn",
	inheritAttrs: false
});
var Column_default = Column;

//#endregion
export { Column_default as default };