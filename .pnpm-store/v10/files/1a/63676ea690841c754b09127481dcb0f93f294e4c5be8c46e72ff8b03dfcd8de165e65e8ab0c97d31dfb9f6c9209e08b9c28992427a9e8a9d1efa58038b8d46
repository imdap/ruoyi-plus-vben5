import useBaseProps from "../../hooks/useBaseProps.js";
import TransBtn_default from "../../TransBtn.js";
import { getTitle } from "../../utils/commonUtil.js";
import { useSelectInputContext } from "../context.js";
import Input_default from "../Input.js";
import Placeholder_default from "./Placeholder.js";
import { computed, createTextVNode, createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import Overflow from "@v-c/overflow";
function itemKey(value) {
	return value.key ?? value.value ?? "";
}
function onPreventMouseDown(event) {
	event.preventDefault();
	event.stopPropagation();
}
var MultipleContent_default = /* @__PURE__ */ defineComponent((props, { expose }) => {
	const selectInputContext = useSelectInputContext();
	const baseProps = useBaseProps();
	const inputRef = shallowRef();
	const prefixCls = computed(() => selectInputContext.value?.prefixCls ?? "");
	const displayValues = computed(() => selectInputContext.value?.displayValues ?? []);
	const searchValue = computed(() => selectInputContext.value?.searchValue ?? "");
	const mode = computed(() => selectInputContext.value?.mode);
	const removeIconFromContext = computed(() => selectInputContext.value?.removeIcon);
	const onSelectorRemove = computed(() => selectInputContext.value?.onSelectorRemove);
	const disabled = computed(() => baseProps.value?.disabled ?? false);
	const showSearch = computed(() => baseProps.value?.showSearch ?? false);
	const triggerOpen = computed(() => baseProps.value?.triggerOpen ?? false);
	const toggleOpen = computed(() => baseProps.value?.toggleOpen);
	const autoClearSearchValue = computed(() => baseProps.value?.autoClearSearchValue);
	const tagRenderFromContext = computed(() => baseProps.value?.tagRender);
	const maxTagPlaceholderFromContext = computed(() => baseProps.value?.maxTagPlaceholder);
	const maxTagTextLength = computed(() => baseProps.value?.maxTagTextLength);
	const maxTagCount = computed(() => baseProps.value?.maxTagCount);
	const classNamesConfig = computed(() => baseProps.value?.classNames);
	const stylesConfig = computed(() => baseProps.value?.styles);
	const selectionItemPrefixCls = computed(() => `${prefixCls.value}-selection-item`);
	const computedSearchValue = computed(() => {
		if (!triggerOpen.value && mode.value === "multiple" && autoClearSearchValue.value !== false) return "";
		return searchValue.value;
	});
	const inputValue = computed(() => showSearch.value ? computedSearchValue.value || "" : "");
	const inputEditable = computed(() => showSearch.value && !disabled.value);
	const removeIcon = computed(() => removeIconFromContext.value ?? "×");
	const maxTagPlaceholder = computed(() => maxTagPlaceholderFromContext.value ?? ((omittedValues) => `+ ${omittedValues.length} ...`));
	const tagRender = computed(() => tagRenderFromContext.value);
	const onToggleOpen = (newOpen) => {
		toggleOpen.value?.(newOpen);
	};
	const onRemove = (value) => {
		onSelectorRemove.value?.(value);
	};
	expose({ input: computed(() => inputRef.value?.input) });
	const defaultRenderSelector = (item, content, itemDisabled, closable, onClose) => createVNode("span", {
		"title": getTitle(item),
		"class": clsx(selectionItemPrefixCls.value, { [`${selectionItemPrefixCls.value}-disabled`]: itemDisabled }, classNamesConfig.value?.item),
		"style": stylesConfig.value?.item
	}, [createVNode("span", {
		"class": clsx(`${selectionItemPrefixCls.value}-content`, classNamesConfig.value?.itemContent),
		"style": stylesConfig.value?.itemContent
	}, [content]), closable && createVNode(TransBtn_default, {
		"className": clsx(`${selectionItemPrefixCls.value}-remove`, classNamesConfig.value?.itemRemove),
		"style": stylesConfig.value?.itemRemove,
		"onMouseDown": onPreventMouseDown,
		"onClick": onClose,
		"customizeIcon": removeIcon.value
	}, { default: () => [createTextVNode("×")] })]);
	const customizeRenderSelector = (value, content, itemDisabled, closable, onClose, isMaxTag, info) => {
		const onMouseDown = (e) => {
			onPreventMouseDown(e);
			onToggleOpen(!triggerOpen.value);
		};
		return createVNode("span", { "onMousedown": onMouseDown }, [tagRender.value?.({
			label: content,
			value,
			index: info?.index ?? 0,
			disabled: itemDisabled,
			closable: !!closable,
			onClose,
			isMaxTag: !!isMaxTag
		})]);
	};
	const renderItem = (valueItem, info) => {
		const { disabled: itemDisabled, label, value } = valueItem;
		const closable = !disabled.value && !itemDisabled;
		let displayLabel = label;
		if (typeof maxTagTextLength.value === "number") {
			if (typeof label === "string" || typeof label === "number") {
				const strLabel = String(displayLabel);
				if (strLabel.length > maxTagTextLength.value) displayLabel = `${strLabel.slice(0, maxTagTextLength.value)}...`;
			}
		}
		const onClose = (event) => {
			if (event) event.stopPropagation();
			onRemove(valueItem);
		};
		return typeof tagRender.value === "function" ? customizeRenderSelector(value, displayLabel, !!itemDisabled, closable, onClose, void 0, info) : defaultRenderSelector(valueItem, displayLabel, !!itemDisabled, closable, onClose);
	};
	const renderRest = (omittedValues) => {
		if (!displayValues.value.length) return null;
		const content = typeof maxTagPlaceholder.value === "function" ? maxTagPlaceholder.value(omittedValues) : maxTagPlaceholder.value;
		return typeof tagRender.value === "function" ? customizeRenderSelector(void 0, content, false, false, void 0, true) : defaultRenderSelector({ title: content }, content, false);
	};
	return () => {
		const { inputProps } = props;
		const prefixNode = !displayValues.value.length && !inputValue.value ? () => createVNode(Placeholder_default, null, null) : null;
		const suffixNode = () => createVNode(Input_default, mergeProps({
			"ref": inputRef,
			"disabled": disabled.value,
			"readOnly": !inputEditable.value
		}, inputProps, {
			"value": inputValue.value || "",
			"syncWidth": true
		}), null);
		return createVNode(Overflow, {
			"prefixCls": `${prefixCls.value}-content`,
			"class": classNamesConfig.value?.content,
			"style": stylesConfig.value?.content,
			"prefix": prefixNode,
			"data": displayValues.value,
			"renderItem": renderItem,
			"renderRest": renderRest,
			"suffix": suffixNode,
			"itemKey": itemKey,
			"maxCount": maxTagCount.value
		}, null);
	};
}, {
	props: { inputProps: {
		type: Object,
		required: true,
		default: void 0
	} },
	name: "MultipleContent",
	inheritAttrs: false
});
export { MultipleContent_default as default };
