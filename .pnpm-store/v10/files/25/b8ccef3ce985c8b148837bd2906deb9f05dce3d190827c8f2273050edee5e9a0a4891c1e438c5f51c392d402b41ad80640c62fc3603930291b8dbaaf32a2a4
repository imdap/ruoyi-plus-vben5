import { useComponentBaseConfig } from "../config-provider/context.js";
import Tree_default from "./Tree.js";
import { calcRangeKeys, convertDirectoryKeysToNodes } from "./utils/dictUtil.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty, getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { FileOutlined, FolderOpenOutlined, FolderOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import { conductExpandParent, convertDataToEntities, convertTreeToData } from "@v-c/tree";

//#region src/tree/DirectoryTree.tsx
function getIcon(props) {
	const { isLeaf, expanded } = props;
	if (isLeaf) return createVNode(FileOutlined, null, null);
	return expanded ? createVNode(FolderOpenOutlined, null, null) : createVNode(FolderOutlined, null, null);
}
function getTreeData({ treeData, children }) {
	return treeData || convertTreeToData(children);
}
const DirectoryTree = /* @__PURE__ */ defineComponent((props, { slots, emit, expose, attrs }) => {
	const lastSelectedKey = shallowRef();
	const cachedSelectedKeys = shallowRef();
	const children = computed(() => filterEmpty(slots?.default?.()));
	const getInitExpandedKeys = () => {
		const { defaultExpandAll, defaultExpandParent } = props;
		let _children = children.value;
		if (_children.length < 1) _children = void 0;
		const { keyEntities } = convertDataToEntities(getTreeData({
			...props,
			children: _children
		}), { fieldNames: props.fieldNames });
		let initExpandedKeys;
		if (defaultExpandAll) initExpandedKeys = Object.keys(keyEntities);
		else if (defaultExpandParent) initExpandedKeys = conductExpandParent(props.expandedKeys || props?.defaultExpandedKeys || [], keyEntities);
		else initExpandedKeys = props?.expandedKeys || props?.defaultExpandedKeys || [];
		return initExpandedKeys;
	};
	const selectedKeys = shallowRef(props?.selectedKeys || props?.defaultSelectedKeys || []);
	const expandedKeys = shallowRef(getInitExpandedKeys());
	watch(() => props.selectedKeys, () => {
		if (props.selectedKeys !== selectedKeys.value) selectedKeys.value = props?.selectedKeys || [];
	});
	watch(() => props.expandedKeys, () => {
		if (props.expandedKeys !== expandedKeys.value) expandedKeys.value = props?.expandedKeys || [];
	});
	const onExpand = (keys, info) => {
		emit("update:expandedKeys", keys);
		emit("expand", keys, info);
	};
	const onSelect = (keys, event) => {
		const { multiple, fieldNames } = props;
		const { node, nativeEvent } = event;
		const { key = "" } = node;
		let _children = children.value;
		if (_children.length < 1) _children = void 0;
		const treeData = getTreeData({
			...props,
			children: _children
		});
		const newEvent = {
			...event,
			selected: true
		};
		const ctrlPick = nativeEvent?.ctrlKey || nativeEvent?.metaKey;
		const shiftPick = nativeEvent?.shiftKey;
		let newSelectedKeys;
		if (multiple && ctrlPick) {
			newSelectedKeys = keys;
			lastSelectedKey.value = key;
			cachedSelectedKeys.value = newSelectedKeys;
			newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
		} else if (multiple && shiftPick) {
			newSelectedKeys = Array.from(new Set([...cachedSelectedKeys.value || [], ...calcRangeKeys({
				treeData,
				expandedKeys: expandedKeys.value,
				startKey: key,
				endKey: lastSelectedKey.value,
				fieldNames
			})]));
			newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
		} else {
			newSelectedKeys = [key];
			lastSelectedKey.value = key;
			cachedSelectedKeys.value = newSelectedKeys;
			newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
		}
		selectedKeys.value = newSelectedKeys;
		emit("update:selectedKeys", newSelectedKeys);
		emit("select", newSelectedKeys, newEvent);
	};
	const { prefixCls, direction } = useComponentBaseConfig("tree", props);
	const treeRef = shallowRef();
	expose({ scrollTo(...args) {
		return treeRef.value?.scrollTo?.(...args);
	} });
	return () => {
		const { showIcon = true, expandAction = "click", ...otherProps } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const connectClassName = clsx(`${prefixCls.value}-directory`, { [`${prefixCls.value}-directory-rtl`]: direction.value === "rtl" }, className);
		const onAttrs = {
			onCheck(checked, info) {
				emit("check", checked, info);
				emit("update:checkedKeys", checked);
			},
			onClick(...args) {
				emit("click", ...args);
			},
			onBlur(e) {
				emit("blur", e);
			},
			onLoad(loadKeys, info) {
				emit("load", loadKeys, info);
			},
			onFocus(e) {
				emit("focus", e);
			},
			onActiveChange(key) {
				emit("activeChange", key);
				emit("update:activeKey", key);
			},
			onDrop(info) {
				emit("drop", info);
			},
			onDragend(info) {
				emit("dragend", info);
			},
			onDragenter(info) {
				emit("dragenter", info);
			},
			onDragleave(info) {
				emit("dragleave", info);
			},
			onDragover(info) {
				emit("dragover", info);
			},
			onDoubleClick(...args) {
				emit("doubleClick", ...args);
				emit("dblclick", ...args);
			},
			onContextmenu(e) {
				emit("contextmenu", e);
			},
			onKeydown(e) {
				emit("keydown", e);
			},
			onScroll(e) {
				emit("scroll", e);
			},
			onRightClick(info) {
				emit("rightClick", info);
			},
			onDragstart(info) {
				emit("dragstart", info);
			},
			onMouseenter(e) {
				emit("mouseenter", e);
			},
			onMouseleave(e) {
				emit("mouseleave", e);
			}
		};
		return createVNode(Tree_default, mergeProps({ "ref": treeRef }, restAttrs, omit(otherProps, ["prefixCls"]), onAttrs, {
			"icon": props?.icon ?? getIcon,
			"blockNode": props?.blockNode ?? true,
			"showIcon": showIcon,
			"expandAction": expandAction,
			"prefixCls": prefixCls.value,
			"class": connectClassName,
			"style": style,
			"expandedKeys": expandedKeys.value,
			"selectedKeys": selectedKeys.value,
			"onSelect": onSelect,
			"onExpand": onExpand
		}), slots);
	};
}, {
	props: {
		expandAction: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		},
		showLine: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoExpandParent: {
			type: Boolean,
			required: false,
			default: void 0
		},
		checkStrictly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		checkable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultExpandAll: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultExpandParent: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultExpandedKeys: {
			type: Array,
			required: false
		},
		expandedKeys: {
			type: Array,
			required: false
		},
		checkedKeys: {
			type: [Array, Object],
			required: false
		},
		defaultCheckedKeys: {
			type: Array,
			required: false
		},
		selectedKeys: {
			type: Array,
			required: false
		},
		defaultSelectedKeys: {
			type: Array,
			required: false
		},
		selectable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		filterAntTreeNode: {
			type: Function,
			required: false
		},
		loadedKeys: {
			type: Array,
			required: false
		},
		draggable: {
			type: [
				Function,
				Boolean,
				Object
			],
			required: false,
			default: void 0
		},
		showIcon: {
			type: Boolean,
			required: false,
			default: void 0
		},
		icon: {
			type: Function,
			required: false,
			skipCheck: true
		},
		switcherIcon: {
			type: Function,
			required: false,
			skipCheck: true
		},
		switcherLoadingIcon: {
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
		prefixCls: {
			type: String,
			required: false
		},
		blockNode: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tabindex: {
			type: Number,
			required: false
		},
		focusable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		activeKey: {
			type: [
				String,
				Number,
				null
			],
			required: false
		},
		treeData: {
			type: Array,
			required: false
		},
		fieldNames: {
			type: Object,
			required: false
		},
		allowDrop: {
			type: Function,
			required: false
		},
		titleRender: {
			type: Function,
			required: false
		},
		dropIndicatorRender: {
			type: Function,
			required: false
		},
		onMouseDown: {
			type: Function,
			required: false
		},
		onMouseUp: {
			type: Function,
			required: false
		},
		loadData: {
			type: Function,
			required: false
		},
		filterTreeNode: {
			type: Function,
			required: false
		},
		motion: {
			type: Object,
			required: false
		},
		height: {
			type: Number,
			required: false
		},
		itemHeight: {
			type: Number,
			required: false
		},
		scrollWidth: {
			type: Number,
			required: false
		},
		itemScrollOffset: {
			type: Number,
			required: false
		},
		virtual: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootStyle: {
			type: Object,
			required: false
		}
	},
	emits: [
		"click",
		"check",
		"expand",
		"select",
		"blur",
		"focus",
		"rightClick",
		"dblclick",
		"doubleClick",
		"contextmenu",
		"dragstart",
		"dragenter",
		"dragover",
		"dragleave",
		"drop",
		"dragend",
		"load",
		"mouseleave",
		"mouseenter",
		"scroll",
		"activeChange",
		"keydown",
		"update:expandedKeys",
		"update:checkedKeys",
		"update:selectedKeys",
		"update:activeKey"
	],
	name: "ADirectoryTree",
	inheritAttrs: false
});
var DirectoryTree_default = DirectoryTree;

//#endregion
export { DirectoryTree_default as default };