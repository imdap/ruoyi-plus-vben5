import pagination_default from "../pagination/index.js";
import ListItem_default from "./ListItem.js";
import { Fragment, computed, createVNode, defineComponent, ref, watch } from "vue";
import { clsx } from "@v-c/util";

//#region src/transfer/ListBody.tsx
function parsePagination(pagination) {
	return {
		simple: true,
		showSizeChanger: false,
		showLessItems: false,
		...pagination
	};
}
const TransferListBody = /* @__PURE__ */ defineComponent((props, { expose }) => {
	const current = ref(1);
	const mergedPagination = computed(() => {
		if (!props.pagination) return null;
		return parsePagination(typeof props.pagination === "object" ? props.pagination : {});
	});
	const pageSize = ref(mergedPagination.value?.pageSize ?? 10);
	watch(() => mergedPagination.value?.pageSize, (nextPageSize) => {
		if (nextPageSize) pageSize.value = nextPageSize;
	});
	watch([
		() => props.filteredRenderItems.length,
		mergedPagination,
		pageSize
	], () => {
		if (mergedPagination.value) {
			const maxPageCount = Math.ceil(props.filteredRenderItems.length / pageSize.value);
			current.value = Math.min(current.value, maxPageCount || 1);
		}
	});
	const memoizedItems = computed(() => {
		if (!mergedPagination.value) return props.filteredRenderItems;
		const start = (current.value - 1) * pageSize.value;
		const end = current.value * pageSize.value;
		return props.filteredRenderItems.slice(start, end);
	});
	expose({ get items() {
		return memoizedItems.value;
	} });
	const onInternalClick = (item, e) => {
		props.onItemSelect(item.key, !props.selectedKeys.includes(item.key), e);
	};
	const onRemove = (item) => {
		props.onItemRemove?.([item.key]);
	};
	const onPageChange = (cur) => {
		current.value = cur;
	};
	const onSizeChange = (cur, size) => {
		current.value = cur;
		pageSize.value = size;
	};
	return () => {
		const { classes = {}, styles = {}, prefixCls, showRemove, filteredRenderItems, disabled, onScroll, selectedKeys } = props;
		const paginationNode = mergedPagination.value ? createVNode(pagination_default, {
			"size": "small",
			"disabled": disabled,
			"simple": mergedPagination.value.simple,
			"pageSize": pageSize.value,
			"showLessItems": mergedPagination.value.showLessItems,
			"showSizeChanger": mergedPagination.value.showSizeChanger,
			"class": `${prefixCls}-pagination`,
			"total": filteredRenderItems.length,
			"current": current.value,
			"onChange": onPageChange,
			"onShowSizeChange": onSizeChange
		}, null) : null;
		return createVNode(Fragment, null, [createVNode("ul", {
			"class": clsx(`${prefixCls}-content`, classes.list, { [`${prefixCls}-content-show-remove`]: showRemove }),
			"style": styles.list,
			"onScroll": onScroll
		}, [(memoizedItems.value || []).map(({ renderedEl, renderedText, item }) => createVNode(ListItem_default, {
			"key": item.key,
			"prefixCls": prefixCls,
			"classes": classes,
			"styles": styles,
			"item": item,
			"renderedText": renderedText,
			"renderedEl": renderedEl,
			"showRemove": showRemove,
			"onClick": onInternalClick,
			"onRemove": onRemove,
			"checked": selectedKeys.includes(item.key),
			"disabled": disabled
		}, null))]), paginationNode]);
	};
}, {
	props: {
		filteredItems: {
			type: Array,
			required: true
		},
		filteredRenderItems: {
			type: Array,
			required: true
		},
		selectedKeys: {
			type: Array,
			required: true
		},
		prefixCls: {
			type: String,
			required: true
		},
		style: {
			type: Object,
			required: false
		},
		classes: {
			type: Object,
			required: false
		},
		styles: {
			type: Object,
			required: false
		},
		titleText: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: true
		},
		dataSource: {
			type: Array,
			required: true
		},
		filterOption: {
			type: Function,
			required: false
		},
		onItemSelect: {
			type: Function,
			required: true
		},
		onItemSelectAll: {
			type: Function,
			required: true
		},
		onItemRemove: {
			type: Function,
			required: false
		},
		render: {
			type: Function,
			required: false
		},
		labelRender: {
			type: Function,
			required: false
		},
		showSearch: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		renderList: {
			type: Function,
			required: false
		},
		footer: {
			type: Function,
			required: false
		},
		onScroll: {
			type: Function,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: true
		},
		showSelectAll: {
			type: Boolean,
			required: false,
			default: void 0
		},
		selectAllLabel: {
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
		showRemove: {
			type: Boolean,
			required: false,
			default: void 0
		},
		pagination: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		selectionsIcon: {
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
		titles: {
			type: Array,
			required: false
		},
		notFoundContent: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		searchPlaceholder: {
			type: String,
			required: true
		},
		itemUnit: {
			type: String,
			required: true
		},
		itemsUnit: {
			type: String,
			required: true
		},
		remove: {
			type: String,
			required: false
		},
		selectAll: {
			type: String,
			required: false
		},
		deselectAll: {
			type: String,
			required: false
		},
		selectCurrent: {
			type: String,
			required: false
		},
		selectInvert: {
			type: String,
			required: false
		},
		removeAll: {
			type: String,
			required: false
		},
		removeCurrent: {
			type: String,
			required: false
		}
	},
	name: "ATransferListBody",
	inheritAttrs: false
});
var ListBody_default = TransferListBody;

//#endregion
export { ListBody_default as default };