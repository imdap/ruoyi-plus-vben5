import { INTERNAL_HOOKS } from "../constant.js";
import ImmutableTable from "../Table.js";
import { useProvideStaticContext } from "./context.js";
import BodyGrid from "./BodyGrid.js";
import { computed, createVNode, defineComponent, isRef, mergeProps, reactive, ref, watchEffect } from "vue";
import { clsx, get, warning } from "@v-c/util";
//#region src/VirtualTable/index.tsx
var VirtualTable = /* @__PURE__ */ defineComponent((props, { expose, slots, attrs }) => {
	const tableRef = ref(null);
	const bodyRef = ref();
	const mergedScrollX = computed(() => {
		const scrollX = props.scroll?.x;
		if (typeof scrollX !== "number") {
			if (process.env.NODE_ENV !== "production") warning(!scrollX, "`scroll.x` in virtual table must be number.");
			return 1;
		}
		return scrollX;
	});
	const mergedScrollY = computed(() => {
		const scrollY = props.scroll?.y;
		if (typeof scrollY !== "number") {
			if (process.env.NODE_ENV !== "production") warning(false, "`scroll.y` in virtual table must be number.");
			return 500;
		}
		return scrollY;
	});
	const getComponent = (path, defaultComponent) => {
		return get(props.components, path) || defaultComponent;
	};
	const onTablePropScroll = (event) => {
		props.onScroll?.(event);
	};
	const staticContext = reactive({
		scrollY: mergedScrollY.value,
		listItemHeight: props.listItemHeight,
		sticky: props.sticky,
		getComponent,
		onScroll: onTablePropScroll
	});
	useProvideStaticContext(staticContext);
	watchEffect(() => {
		staticContext.scrollY = mergedScrollY.value;
		staticContext.listItemHeight = props.listItemHeight;
		staticContext.sticky = props.sticky;
	});
	expose({
		get nativeElement() {
			return tableRef.value?.nativeElement;
		},
		scrollTo: (config) => {
			bodyRef.value?.scrollTo?.(config);
		}
	});
	return () => {
		const { scroll, listItemHeight, components, ...restProps } = props;
		const mergedClassName = clsx(restProps.className, `${props.prefixCls || "vc-table"}-virtual`);
		const renderBody = (rawData, info) => {
			return createVNode(BodyGrid, {
				"ref": (el) => {
					bodyRef.value = el;
					if (typeof info.ref === "function") info.ref(el);
					else if (isRef(info.ref)) info.ref.value = el;
				},
				"data": rawData,
				"onScroll": info.onScroll
			}, null);
		};
		return createVNode(ImmutableTable, mergeProps(attrs, restProps, {
			"className": mergedClassName,
			"scroll": {
				...scroll,
				x: mergedScrollX.value,
				y: mergedScrollY.value
			},
			"components": {
				...components || {},
				body: props.data?.length ? renderBody : void 0
			},
			"internalHooks": INTERNAL_HOOKS,
			"tailor": true,
			"ref": tableRef
		}), { default: () => [slots.default?.()] });
	};
}, { props: {
	listItemHeight: {
		type: Number,
		required: false,
		default: void 0
	},
	scroll: {
		type: Object,
		required: true
	},
	prefixCls: {
		type: String,
		required: false,
		default: void 0
	},
	className: {
		type: String,
		required: false,
		default: void 0
	},
	style: {
		type: Object,
		required: false,
		default: void 0
	},
	classNames: {
		type: Object,
		required: false,
		default: void 0
	},
	styles: {
		type: Object,
		required: false,
		default: void 0
	},
	data: {
		type: Array,
		required: false,
		default: void 0
	},
	columns: {
		type: Array,
		required: false,
		default: void 0
	},
	rowKey: {
		type: [
			String,
			Number,
			Symbol,
			Function
		],
		required: false,
		default: void 0
	},
	tableLayout: {
		type: String,
		required: false,
		default: void 0
	},
	expandable: {
		type: Object,
		required: false,
		default: void 0
	},
	indentSize: {
		type: Number,
		required: false,
		default: void 0
	},
	rowClassName: {
		type: [String, Function],
		required: false,
		default: void 0
	},
	title: {
		type: Function,
		required: false,
		default: void 0
	},
	footer: {
		type: Function,
		required: false,
		default: void 0
	},
	summary: {
		type: Function,
		required: false,
		default: void 0
	},
	headerCell: {
		type: Function,
		required: false,
		default: void 0
	},
	bodyCell: {
		type: Function,
		required: false,
		default: void 0
	},
	caption: {
		required: false,
		default: void 0
	},
	id: {
		type: String,
		required: false,
		default: void 0
	},
	showHeader: {
		type: Boolean,
		required: false,
		default: void 0
	},
	components: {
		type: Object,
		required: false,
		default: void 0
	},
	onRow: {
		type: Function,
		required: false,
		default: void 0
	},
	onHeaderRow: {
		type: Function,
		required: false,
		default: void 0
	},
	emptyText: {
		type: Function,
		required: false,
		skipCheck: true,
		default: void 0
	},
	direction: {
		type: String,
		required: false,
		default: void 0
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
	onScroll: {
		type: Function,
		required: false,
		default: void 0
	},
	internalHooks: {
		type: String,
		required: false,
		default: void 0
	},
	transformColumns: {
		type: Function,
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
		required: false,
		default: void 0
	},
	internalRefs: {
		type: Object,
		required: false,
		default: void 0
	},
	measureRowRender: {
		type: Function,
		required: false,
		default: void 0
	},
	getPopupContainer: {
		type: Function,
		required: false,
		default: void 0
	},
	"onUpdate:expandedRowKeys": {
		type: Function,
		required: false,
		default: void 0
	},
	expandedRowKeys: {
		type: Array,
		required: false,
		default: void 0
	},
	defaultExpandedRowKeys: {
		type: Array,
		required: false,
		default: void 0
	},
	expandedRowRender: {
		type: Function,
		required: false,
		default: void 0
	},
	expandRowByClick: {
		type: Boolean,
		required: false,
		default: void 0
	},
	expandIcon: {
		type: Function,
		required: false,
		default: void 0
	},
	onExpand: {
		type: Function,
		required: false,
		default: void 0
	},
	onExpandedRowsChange: {
		type: Function,
		required: false,
		default: void 0
	},
	defaultExpandAllRows: {
		type: Boolean,
		required: false,
		default: void 0
	},
	expandIconColumnIndex: {
		type: Number,
		required: false,
		default: void 0
	},
	expandedRowClassName: {
		type: Function,
		required: false,
		default: void 0
	},
	childrenColumnName: {
		type: String,
		required: false,
		default: void 0
	}
} });
//#endregion
export { VirtualTable as default };
