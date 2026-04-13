import { useCascaderContext } from "../context.js";
import { SEARCH_MARK } from "../hooks/useSearchOptions.js";
import { isLeaf, scrollIntoParentView, toPathKey } from "../utils/commonUtil.js";
import Checkbox_default from "./Checkbox.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, ref, watch } from "vue";
import { clsx } from "@v-c/util";
import pickAttrs from "@v-c/util/dist/pickAttrs";
const FIX_LABEL = "__cascader_fix_label__";
var columnDefaults = {
	prefixCls: "",
	options: [],
	prevValuePath: [],
	onToggleOpen: () => {},
	onSelect: () => {},
	onActive: () => {},
	checkedSet: /* @__PURE__ */ new Set(),
	halfCheckedSet: /* @__PURE__ */ new Set(),
	loadingKeys: [],
	isSelectable: () => false
};
var Column_default = /* @__PURE__ */ defineComponent((props) => {
	const menuRef = ref(null);
	const context = useCascaderContext();
	const menuPrefixCls = computed(() => `${props.prefixCls}-menu`);
	const menuItemPrefixCls = computed(() => `${props.prefixCls}-menu-item`);
	const hoverOpen = computed(() => context.value?.expandTrigger === "hover");
	const isOptionDisabled = (disabled) => props.disabled || disabled;
	const optionInfoList = computed(() => {
		const fieldNames = context.value?.fieldNames;
		if (!fieldNames) return [];
		return props.options.map((option) => {
			const { disabled, disableCheckbox } = option;
			const searchOptions = option[SEARCH_MARK];
			const label = option["__cascader_fix_label__"] ?? option[fieldNames.label];
			const value = option[fieldNames.value];
			const isMergedLeaf = isLeaf(option, fieldNames);
			const fullPath = searchOptions ? searchOptions.map((opt) => opt[fieldNames.value]) : [...props.prevValuePath, value];
			const fullPathKey = toPathKey(fullPath);
			return {
				disabled,
				label,
				value,
				isLeaf: isMergedLeaf,
				isLoading: props.loadingKeys.includes(fullPathKey),
				checked: props.checkedSet.has(fullPathKey),
				halfChecked: props.halfCheckedSet.has(fullPathKey),
				option,
				disableCheckbox,
				fullPath,
				fullPathKey
			};
		});
	});
	watch(() => props.activeValue, async () => {
		if (menuRef.value) {
			const selector = `.${menuItemPrefixCls.value}-active`;
			const activeElement = menuRef.value.querySelector(selector);
			if (activeElement) scrollIntoParentView(activeElement);
		}
	}, {
		immediate: true,
		flush: "post"
	});
	return () => {
		const fieldNames = context.value?.fieldNames;
		const changeOnSelect = context.value?.changeOnSelect;
		const expandIcon = context.value?.expandIcon;
		const loadingIcon = context.value?.loadingIcon;
		const popupMenuColumnStyle = context.value?.popupMenuColumnStyle;
		const optionRender = context.value?.optionRender;
		const classNames = context.value?.classNames;
		const styles = context.value?.styles;
		if (!fieldNames) return null;
		return createVNode("ul", {
			"class": clsx(menuPrefixCls.value, classNames?.popup?.list),
			"style": styles?.popup?.list,
			"ref": menuRef,
			"role": "menu"
		}, [optionInfoList.value.map(({ disabled, label, value, isLeaf: isMergedLeaf, isLoading, checked, halfChecked, option, fullPath, fullPathKey, disableCheckbox }) => {
			const ariaProps = pickAttrs(option, {
				aria: true,
				data: true
			});
			const triggerOpenPath = () => {
				if (isOptionDisabled(disabled)) return;
				const nextValueCells = [...fullPath];
				if (hoverOpen.value && isMergedLeaf) nextValueCells.pop();
				props.onActive(nextValueCells);
			};
			const triggerSelect = () => {
				if (props.isSelectable(option) && !isOptionDisabled(disabled)) props.onSelect(fullPath, isMergedLeaf);
			};
			let title;
			if (typeof option.title === "string") title = option.title;
			else if (typeof label === "string") title = label;
			return createVNode("li", mergeProps({ "key": fullPathKey }, ariaProps, {
				"class": clsx(menuItemPrefixCls.value, classNames?.popup?.listItem, {
					[`${menuItemPrefixCls.value}-expand`]: !isMergedLeaf,
					[`${menuItemPrefixCls.value}-active`]: props.activeValue === value || props.activeValue === fullPathKey,
					[`${menuItemPrefixCls.value}-disabled`]: isOptionDisabled(disabled),
					[`${menuItemPrefixCls.value}-loading`]: isLoading
				}),
				"style": {
					...popupMenuColumnStyle,
					...styles?.popup?.listItem
				},
				"role": "menuitemcheckbox",
				"title": title,
				"aria-checked": checked,
				"data-path-key": fullPathKey,
				"onClick": () => {
					triggerOpenPath();
					if (disableCheckbox) return;
					if (!props.multiple || isMergedLeaf) triggerSelect();
				},
				"onDblclick": () => {
					if (changeOnSelect) props.onToggleOpen(false);
				},
				"onMouseenter": () => {
					if (hoverOpen.value) triggerOpenPath();
				},
				"onMousedown": (e) => {
					e.preventDefault();
				}
			}), [
				props.multiple && createVNode(Checkbox_default, {
					"prefixCls": `${props.prefixCls}-checkbox`,
					"checked": checked,
					"halfChecked": halfChecked,
					"disabled": isOptionDisabled(disabled) || disableCheckbox,
					"disableCheckbox": disableCheckbox,
					"onClick": (e) => {
						if (disableCheckbox) return;
						e.stopPropagation();
						triggerSelect();
					}
				}, null),
				createVNode("div", { "class": `${menuItemPrefixCls.value}-content` }, [optionRender && value !== "__EMPTY__" ? optionRender(option) : label]),
				!isLoading && expandIcon && !isMergedLeaf && createVNode("div", { "class": `${menuItemPrefixCls.value}-expand-icon` }, [expandIcon]),
				isLoading && loadingIcon && createVNode("div", { "class": `${menuItemPrefixCls.value}-loading-icon` }, [loadingIcon])
			]);
		})]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		options: {
			type: Array,
			required: true,
			default: void 0
		},
		activeValue: {
			type: [String, Number],
			required: false,
			default: void 0
		},
		prevValuePath: {
			type: Array,
			required: true,
			default: void 0
		},
		onToggleOpen: {
			type: Function,
			required: true,
			default: void 0
		},
		onSelect: {
			type: Function,
			required: true,
			default: void 0
		},
		onActive: {
			type: Function,
			required: true,
			default: void 0
		},
		checkedSet: {
			type: Set,
			required: true,
			default: void 0
		},
		halfCheckedSet: {
			type: Set,
			required: true,
			default: void 0
		},
		loadingKeys: {
			type: Array,
			required: true,
			default: void 0
		},
		isSelectable: {
			type: Function,
			required: true,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		}
	}, columnDefaults),
	name: "Column",
	inheritAttrs: false
});
export { FIX_LABEL, Column_default as default };
