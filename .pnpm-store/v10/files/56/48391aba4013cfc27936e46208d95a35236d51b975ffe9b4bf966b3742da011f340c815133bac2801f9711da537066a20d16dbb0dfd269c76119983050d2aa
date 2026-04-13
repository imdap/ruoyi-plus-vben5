import { useComponentBaseConfig } from "../config-provider/context.js";
import useToken from "../theme/useToken.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import motion_default from "../_util/motion.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import style_default from "./style/index.js";
import dropIndicator_default from "./utils/dropIndicator.js";
import iconUtil_default from "./utils/iconUtil.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { HolderOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import VcTree from "@v-c/tree";

//#region src/tree/Tree.tsx
const Tree = /* @__PURE__ */ defineComponent((props, { slots, emit, expose, attrs }) => {
	const { virtual, prefixCls, rootPrefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("tree", props);
	const treeRef = shallowRef();
	const { classes, styles, motion: customMotion } = toPropsRefs$1(props, "classes", "styles", "motion");
	const contextDisabled = useDisabledContext();
	const mergedDisabled = computed(() => props?.disabled ?? contextDisabled.value);
	const motion = computed(() => customMotion.value ?? {
		...motion_default(rootPrefixCls.value),
		appear: false
	});
	const mergedProps = computed(() => {
		return {
			...props,
			disabled: mergedDisabled.value,
			motion: motion.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const [hashId, cssVarCls] = style_default(prefixCls);
	const [, token] = useToken();
	const itemHeight = computed(() => token.value.paddingXS / 2 + (token.value.Tree?.titleHeight || token.value.controlHeightSM));
	expose({ scrollTo(...args) {
		treeRef.value?.scrollTo?.(...args);
	} });
	return () => {
		const { draggable, showLine, selectable, blockNode, showIcon, checkable, rootClass, tabindex } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const draggableIcon = getSlotPropsFnRun(slots, props, "draggableIcon");
		const draggableConfigFn = () => {
			if (!draggable) return false;
			let mergedDraggable = {};
			switch (typeof draggable) {
				case "function":
					mergedDraggable.nodeDraggable = draggable;
					break;
				case "object":
					mergedDraggable = { ...draggable };
					break;
				default: break;
			}
			if (mergedDraggable.icon !== false) mergedDraggable.icon = draggableIcon || mergedDraggable.icon || createVNode(HolderOutlined, null, null);
			return mergedDraggable;
		};
		const draggableConfig = draggableConfigFn();
		const switcherIcon = slots?.switcherIcon ?? props?.switcherIcon;
		const switcherLoadingIcon = getSlotPropsFnRun(slots, props, "switcherLoadingIcon");
		const renderSwitcherIcon = (nodeProps) => createVNode(iconUtil_default, {
			"prefixCls": prefixCls.value,
			"switcherIcon": switcherIcon,
			"switcherLoadingIcon": switcherLoadingIcon,
			"treeNodeProps": nodeProps,
			"showLine": showLine
		}, null);
		const newProps = {
			...omit(props, ["icon"]),
			disabled: mergedDisabled.value,
			showLine: Boolean(showLine),
			dropIndicatorRender: dropIndicator_default
		};
		const onAttrs = {
			onCheck(checked, info) {
				emit("check", checked, info);
				if (Array.isArray(checked)) emit("update:checkedKeys", checked);
				else emit("update:checkedKeys", checked?.checked ?? []);
			},
			onClick(...args) {
				emit("click", ...args);
			},
			onExpand(expandKeys, info) {
				emit("expand", expandKeys, info);
				emit("update:expandedKeys", expandKeys);
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
			onDragEnd(info) {
				emit("dragend", info);
			},
			onDragEnter(info) {
				emit("dragenter", info);
			},
			onDragLeave(info) {
				emit("dragleave", info);
			},
			onDragOver(info) {
				emit("dragover", info);
			},
			onDoubleClick(...args) {
				emit("doubleClick", ...args);
				emit("dblclick", ...args);
			},
			onContextMenu(e) {
				emit("contextmenu", e);
			},
			onKeyDown(e) {
				emit("keydown", e);
			},
			onScroll(e) {
				emit("scroll", e);
			},
			onRightClick(info) {
				emit("rightClick", info);
			},
			onSelect(keys, info) {
				emit("select", keys, info);
				emit("update:selectedKeys", keys);
			},
			onDragStart(info) {
				emit("dragstart", info);
			},
			onMouseEnter(e) {
				emit("mouseenter", e);
			},
			onMouseLeave(e) {
				emit("mouseleave", e);
			}
		};
		const icon = slots?.icon ?? props?.icon;
		const titleRender = slots?.titleRender ?? props?.titleRender;
		return createVNode(VcTree, mergeProps(restAttrs, { "ref": treeRef }, newProps, {
			"virtual": props?.virtual ?? virtual.value,
			"itemHeight": props?.itemHeight ?? itemHeight.value
		}, onAttrs, {
			"icon": icon,
			"titleRender": titleRender,
			"motion": motion.value,
			"prefixCls": prefixCls.value,
			"className": clsx({
				[`${prefixCls.value}-icon-hide`]: !showIcon,
				[`${prefixCls.value}-block-node`]: blockNode,
				[`${prefixCls.value}-unselectable`]: !selectable,
				[`${prefixCls.value}-rtl`]: direction.value === "rtl",
				[`${prefixCls.value}-disabled`]: mergedDisabled.value
			}, contextClassName.value, className, hashId.value, cssVarCls.value),
			"tabIndex": tabindex,
			"style": {
				...contextStyle.value,
				...style
			},
			"rootClassName": clsx(mergedClassNames.value?.root, rootClass),
			"rootStyle": mergedStyles.value?.root,
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value,
			"direction": direction.value,
			"checkable": checkable ? createVNode("span", { "class": `${prefixCls.value}-checkbox-inner` }, null) : checkable,
			"selectable": selectable,
			"switcherIcon": renderSwitcherIcon,
			"draggable": draggableConfig
		}), { default: slots?.default });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
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
		expandAction: {
			type: [Boolean, String],
			required: false,
			default: void 0
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
	}, {
		showIcon: false,
		blockNode: false,
		checkable: false,
		selectable: true
	}),
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
	name: "ATree",
	inheritAttrs: false
});
var Tree_default = Tree;

//#endregion
export { Tree_default as default };