import { useLegacyContext } from "./LegacyContext.js";
import { useTreeSelectContext } from "./TreeSelectContext.js";
import { getAllKeys, isCheckDisabled } from "./utils/valueUtil.js";
import { computed, createVNode, defineComponent, provide, ref, shallowRef, watch } from "vue";
import { useBaseProps } from "@v-c/select";
import Tree, { UnstableContextKey } from "@v-c/tree";
import { KeyCode } from "@v-c/util";
var HIDDEN_STYLE = {
	width: 0,
	height: 0,
	display: "flex",
	overflow: "hidden",
	opacity: 0,
	border: 0,
	padding: 0,
	margin: 0
};
var OptionList_default = /* @__PURE__ */ defineComponent({
	name: "OptionList",
	inheritAttrs: false,
	setup(_, { expose }) {
		const baseProps = useBaseProps();
		const context = useTreeSelectContext();
		const legacyContext = useLegacyContext();
		const treeRef = ref(null);
		const memoTreeData = computed(() => context.value?.treeData || []);
		const mergedCheckedKeys = computed(() => {
			if (!legacyContext.value?.checkable) return null;
			return {
				checked: legacyContext.value.checkedKeys,
				halfChecked: legacyContext.value.halfCheckedKeys
			};
		});
		watch(() => baseProps.value?.open, (open) => {
			if (open && !baseProps.value?.multiple && legacyContext.value?.checkedKeys?.length) treeRef.value?.scrollTo({ key: legacyContext.value.checkedKeys[0] });
		}, { immediate: true });
		const onListMouseDown = (event) => {
			event.preventDefault();
		};
		const onInternalSelect = (_$1, info) => {
			const { node } = info;
			if (legacyContext.value?.checkable && isCheckDisabled(node)) return;
			const checkedKeys = legacyContext.value?.checkedKeys || [];
			context.value?.onSelect(node.key, {
				selected: !checkedKeys.includes(node.key),
				source: "option"
			});
			if (!baseProps.value?.multiple) baseProps.value?.toggleOpen(false);
		};
		const expandedKeys = ref(legacyContext.value?.treeDefaultExpandedKeys || []);
		const searchExpandedKeys = ref(null);
		const mergedExpandedKeys = computed(() => {
			if (legacyContext.value?.treeExpandedKeys) return [...legacyContext.value.treeExpandedKeys];
			if (baseProps.value?.searchValue) return searchExpandedKeys.value || expandedKeys.value || [];
			return expandedKeys.value;
		});
		const onInternalExpand = (keys) => {
			expandedKeys.value = keys;
			searchExpandedKeys.value = keys;
			legacyContext.value?.onTreeExpand?.(keys);
		};
		const filterTreeNode = (treeNode) => {
			const searchValue = String(baseProps.value?.searchValue || "");
			if (!searchValue) return false;
			const lowerSearchValue = searchValue.toLowerCase();
			const treeNodeFilterProp = legacyContext.value?.treeNodeFilterProp || "value";
			return String(treeNode?.[treeNodeFilterProp]).toLowerCase().includes(lowerSearchValue);
		};
		watch(() => baseProps.value?.searchValue, (val) => {
			if (val) searchExpandedKeys.value = getAllKeys(memoTreeData.value, context.value?.fieldNames || {});
		}, { immediate: true });
		const disabledCache = shallowRef(/* @__PURE__ */ new Map());
		watch(() => context.value?.leftMaxCount, (val) => {
			if (val) disabledCache.value = /* @__PURE__ */ new Map();
		}, { immediate: true });
		function getDisabledWithCache(node) {
			const value = node[context.value.fieldNames.value];
			if (!disabledCache.value.has(value)) {
				const entity = context.value?.valueEntities.get(value);
				if (!((entity?.children || []).length === 0)) {
					const checkedKeys = legacyContext.value?.checkedKeys || [];
					const checkableChildren = (entity?.children || []).filter((child) => !child.node.disabled && !child.node.disableCheckbox && !checkedKeys.includes(child.node[context.value.fieldNames.value]));
					disabledCache.value.set(value, checkableChildren.length > (context.value?.leftMaxCount || 0));
				} else disabledCache.value.set(value, false);
			}
			return disabledCache.value.get(value);
		}
		const nodeDisabled = (node) => {
			const checkedKeys = legacyContext.value?.checkedKeys || [];
			const nodeValue = node[context.value.fieldNames.value];
			if (checkedKeys.includes(nodeValue)) return false;
			const leftMaxCount = context.value?.leftMaxCount ?? null;
			if (leftMaxCount === null) return false;
			if (leftMaxCount <= 0) return true;
			if (context.value?.leafCountOnly && leftMaxCount) return getDisabledWithCache(node) || false;
			return false;
		};
		provide(UnstableContextKey, { nodeDisabled });
		const getFirstMatchingNode = (nodes) => {
			for (const node of nodes) {
				if (node.disabled || node.selectable === false) continue;
				if (baseProps.value?.searchValue) {
					if (filterTreeNode(node)) return node;
				} else return node;
				const children = node[context.value.fieldNames.children];
				if (children) {
					const matchInChildren = getFirstMatchingNode(children);
					if (matchInChildren) return matchInChildren;
				}
			}
			return null;
		};
		const activeKey = ref(null);
		const activeEntity = computed(() => legacyContext.value?.keyEntities?.[String(activeKey.value)]);
		watch([() => baseProps.value?.open, () => baseProps.value?.searchValue], ([open]) => {
			if (!open) return;
			const fieldNames = context.value?.fieldNames;
			const getFirstNode = () => {
				const firstNode = getFirstMatchingNode(memoTreeData.value);
				return firstNode ? firstNode[fieldNames?.value] : null;
			};
			let nextActiveKey = null;
			if (!baseProps.value?.multiple && legacyContext.value?.checkedKeys?.length && !baseProps.value?.searchValue) nextActiveKey = legacyContext.value.checkedKeys[0];
			else nextActiveKey = getFirstNode();
			activeKey.value = nextActiveKey;
		}, { immediate: true });
		const onKeyDown = (event) => {
			switch (event.which || event.keyCode) {
				case KeyCode.UP:
				case KeyCode.DOWN:
				case KeyCode.LEFT:
				case KeyCode.RIGHT:
					treeRef.value?.onKeyDown(event);
					break;
				case KeyCode.ENTER:
					if (activeEntity.value) {
						const isNodeDisabled = nodeDisabled(activeEntity.value.node);
						const { selectable, value, disabled } = activeEntity.value.node;
						if (selectable !== false && !disabled && !isNodeDisabled) onInternalSelect([], {
							node: { key: activeKey.value },
							selected: !(legacyContext.value?.checkedKeys || []).includes(value)
						});
					}
					return;
				case KeyCode.ESC: baseProps.value?.toggleOpen(false);
			}
		};
		const onKeyUp = () => {};
		expose({
			scrollTo: (scroll) => {
				treeRef.value?.scrollTo(scroll);
			},
			onKeyDown,
			onKeyUp
		});
		return () => {
			const prefixCls = baseProps.value?.prefixCls;
			const open = baseProps.value?.open;
			const notFoundContent = baseProps.value?.notFoundContent;
			const checkable = legacyContext.value?.checkable;
			const checkedKeys = legacyContext.value?.checkedKeys || [];
			const treeLoadedKeys = legacyContext.value?.treeLoadedKeys;
			const treeDefaultExpandAll = legacyContext.value?.treeDefaultExpandAll;
			const treeIcon = legacyContext.value?.treeIcon;
			const showTreeIcon = legacyContext.value?.showTreeIcon;
			const switcherIcon = legacyContext.value?.switcherIcon;
			const treeLine = legacyContext.value?.treeLine;
			const treeMotion = legacyContext.value?.treeMotion;
			const loadData = legacyContext.value?.loadData;
			const onTreeLoad = legacyContext.value?.onTreeLoad;
			const { fieldNames, virtual, listHeight, listItemHeight, listItemScrollOffset, popupMatchSelectWidth, treeExpandAction, treeTitleRender, onPopupScroll, classNames, styles } = context.value || {};
			if (memoTreeData.value.length === 0) return createVNode("div", {
				"role": "listbox",
				"class": `${prefixCls}-empty`,
				"onMousedown": onListMouseDown
			}, [notFoundContent]);
			const syncLoadData = baseProps.value?.searchValue ? void 0 : loadData;
			return createVNode("div", { "onMousedown": onListMouseDown }, [activeEntity.value && open && createVNode("span", {
				"style": HIDDEN_STYLE,
				"aria-live": "assertive"
			}, [activeEntity.value.node.value]), createVNode(Tree, {
				"ref": (el) => {
					treeRef.value = el;
				},
				"focusable": false,
				"prefixCls": `${prefixCls}-tree`,
				"treeData": memoTreeData.value,
				"fieldNames": fieldNames,
				"height": listHeight,
				"itemHeight": listItemHeight,
				"itemScrollOffset": listItemScrollOffset,
				"virtual": virtual !== false && popupMatchSelectWidth !== false,
				"multiple": baseProps.value?.multiple,
				"icon": treeIcon,
				"showIcon": showTreeIcon,
				"switcherIcon": switcherIcon,
				"showLine": treeLine,
				"loadData": syncLoadData,
				"motion": treeMotion,
				"activeKey": activeKey.value,
				"checkable": checkable,
				"checkStrictly": true,
				"checkedKeys": mergedCheckedKeys.value,
				"selectedKeys": !checkable ? checkedKeys : [],
				"defaultExpandAll": treeDefaultExpandAll,
				"titleRender": treeTitleRender,
				"expandedKeys": mergedExpandedKeys.value,
				"loadedKeys": treeLoadedKeys,
				"onActiveChange": (key) => {
					activeKey.value = key;
				},
				"onSelect": onInternalSelect,
				"onCheck": onInternalSelect,
				"onExpand": onInternalExpand,
				"onLoad": onTreeLoad,
				"filterTreeNode": filterTreeNode,
				"expandAction": treeExpandAction,
				"onScroll": onPopupScroll,
				"classNames": classNames?.popup,
				"styles": styles?.popup
			}, null)]);
		};
	}
});
export { OptionList_default as default };
