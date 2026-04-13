import useBaseProps from "./hooks/useBaseProps.js";
import { useSelectContext } from "./SelectContext.js";
import TransBtn_default from "./TransBtn.js";
import { isPlatformMac } from "./utils/platformUtil.js";
import { isValidCount } from "./utils/valueUtil.js";
import { Fragment, computed, createVNode, defineComponent, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import KeyCode from "@v-c/util/dist/KeyCode";
import pickAttrs from "@v-c/util/dist/pickAttrs";
import List from "@v-c/virtual-list";
function isTitleType(content) {
	return typeof content === "string" || typeof content === "number";
}
var OptionList_default = /* @__PURE__ */ defineComponent({
	name: "OptionList",
	inheritAttrs: false,
	setup(_, { expose }) {
		const baseProps = useBaseProps();
		const context = useSelectContext();
		const itemPrefixCls = computed(() => `${baseProps.value?.prefixCls}-item`);
		const memoFlattenOptions = computed(() => {
			if (!baseProps.value?.open) return context.value?.flattenOptions || [];
			return context.value?.flattenOptions || [];
		});
		const listRef = shallowRef(null);
		const overMaxCount = computed(() => {
			const { maxCount, rawValues } = context.value || {};
			return !!(baseProps.value?.multiple && isValidCount(maxCount) && rawValues && rawValues.size >= maxCount);
		});
		const onListMouseDown = (event) => {
			event.preventDefault();
		};
		const scrollIntoView = (args) => {
			listRef.value?.scrollTo(typeof args === "number" ? { index: args } : args);
		};
		const isSelected = (value) => {
			if (baseProps.value?.mode === "combobox") return false;
			return context.value?.rawValues?.has(value) || false;
		};
		const getEnabledActiveIndex = (index, offset = 1) => {
			const len = memoFlattenOptions.value.length;
			for (let i = 0; i < len; i += 1) {
				const current = (index + i * offset + len) % len;
				const { group, data } = memoFlattenOptions.value[current] || {};
				if (!group && !data?.disabled && (isSelected(data?.value) || !overMaxCount.value)) return current;
			}
			return -1;
		};
		const activeIndex = shallowRef(-1);
		const setActive = (index, fromKeyboard = false) => {
			activeIndex.value = index;
			const info = { source: fromKeyboard ? "keyboard" : "mouse" };
			const flattenItem = memoFlattenOptions.value[index];
			if (!flattenItem) {
				context.value?.onActiveValue?.(null, -1, info);
				return;
			}
			context.value?.onActiveValue?.(flattenItem.value, index, info);
		};
		const getActiveIndexByRawValue = () => {
			const rawValues = context.value?.rawValues;
			if (baseProps.value?.multiple || rawValues?.size !== 1) return -1;
			const value = Array.from(rawValues)[0];
			const searchValue = baseProps.value?.searchValue;
			return memoFlattenOptions.value.findIndex(({ data }) => searchValue ? String(data?.value).startsWith(searchValue) : data?.value === value);
		};
		watch([() => memoFlattenOptions.value.length, () => baseProps.value?.searchValue], () => {
			const defaultFirst = context.value?.defaultActiveFirstOption !== false;
			const activeIndexByRawValue = getActiveIndexByRawValue();
			setActive(activeIndexByRawValue !== -1 ? activeIndexByRawValue : defaultFirst ? getEnabledActiveIndex(0) : -1);
		}, { immediate: true });
		const isAriaSelected = (value) => {
			if (baseProps.value?.mode === "combobox") return String(value).toLowerCase() === (baseProps.value?.searchValue || "").toLowerCase();
			return context.value?.rawValues?.has(value) || false;
		};
		watch([
			() => baseProps.value?.open,
			() => baseProps.value?.searchValue,
			() => memoFlattenOptions.value.length
		], (_$1, __, onCleanup) => {
			let timeoutId;
			const rawValues = context.value?.rawValues;
			if (!baseProps.value?.multiple && baseProps.value?.open && rawValues?.size === 1) {
				const index = getActiveIndexByRawValue();
				if (index !== -1) {
					setActive(index);
					timeoutId = setTimeout(() => {
						scrollIntoView(index);
					});
				}
			}
			if (baseProps.value?.open) listRef.value?.scrollTo(void 0);
			onCleanup(() => {
				if (timeoutId) clearTimeout(timeoutId);
			});
		}, {
			immediate: true,
			flush: "post"
		});
		const onSelectValue = (value) => {
			if (value !== void 0) context.value?.onSelect?.(value, { selected: !context.value?.rawValues?.has(value) });
			if (!baseProps.value?.multiple) baseProps.value?.toggleOpen?.(false);
		};
		const onKeyDown = (event) => {
			const { which, ctrlKey } = event;
			switch (which) {
				case KeyCode.N:
				case KeyCode.P:
				case KeyCode.UP:
				case KeyCode.DOWN: {
					let offset = 0;
					if (which === KeyCode.UP) offset = -1;
					else if (which === KeyCode.DOWN) offset = 1;
					else if (isPlatformMac() && ctrlKey) {
						if (which === KeyCode.N) offset = 1;
						else if (which === KeyCode.P) offset = -1;
					}
					if (offset !== 0) {
						const nextActiveIndex = getEnabledActiveIndex(activeIndex.value + offset, offset);
						scrollIntoView(nextActiveIndex);
						setActive(nextActiveIndex, true);
					}
					break;
				}
				case KeyCode.TAB:
				case KeyCode.ENTER: {
					const item = memoFlattenOptions.value[activeIndex.value];
					if (!item || item.data.disabled) {
						onSelectValue(void 0);
						return;
					}
					if (!overMaxCount.value || context.value?.rawValues?.has(item.value)) onSelectValue(item.value);
					else onSelectValue(void 0);
					if (baseProps.value?.open) event.preventDefault();
					break;
				}
				case KeyCode.ESC:
					baseProps.value?.toggleOpen?.(false);
					if (baseProps.value?.open) event.stopPropagation();
			}
		};
		const onKeyUp = () => {};
		expose({
			onKeyDown,
			onKeyUp,
			scrollTo: (index) => {
				scrollIntoView(index);
			}
		});
		return () => {
			const { id, notFoundContent, onPopupScroll } = baseProps.value || {};
			const { menuItemSelectedIcon, fieldNames, virtual, direction, listHeight, listItemHeight, optionRender, classNames: contextClassNames, styles: contextStyles } = context.value || {};
			if (memoFlattenOptions.value.length === 0) return createVNode("div", {
				"role": "listbox",
				"id": `${id}_list`,
				"class": `${itemPrefixCls.value}-empty`,
				"onMousedown": onListMouseDown
			}, [notFoundContent]);
			const omitFieldNameList = Object.keys(fieldNames || {}).map((key) => fieldNames?.[key]);
			const getLabel = (item) => item.label;
			function getItemAriaProps(item, index) {
				const { group } = item;
				return {
					role: group ? "presentation" : "option",
					id: `${id}_list_${index}`
				};
			}
			const renderItem = (index) => {
				const item = memoFlattenOptions.value[index];
				if (!item) return null;
				const itemData = item.data || {};
				const { value, disabled } = itemData;
				const { group } = item;
				const attrs = pickAttrs(itemData, true);
				const mergedLabel = getLabel(item);
				return item ? createVNode("div", mergeProps({ "aria-label": typeof mergedLabel === "string" && !group ? mergedLabel : void 0 }, attrs, { "key": index }, getItemAriaProps(item, index), {
					"aria-selected": isAriaSelected(value),
					"aria-disabled": disabled
				}), [value]) : null;
			};
			const a11yProps = {
				role: "listbox",
				id: `${id}_list`
			};
			return createVNode(Fragment, null, [virtual && createVNode("div", mergeProps(a11yProps, { "style": {
				height: 0,
				width: 0,
				overflow: "hidden"
			} }), [
				renderItem(activeIndex.value - 1),
				renderItem(activeIndex.value),
				renderItem(activeIndex.value + 1)
			]), createVNode(List, mergeProps({
				"itemKey": "key",
				"ref": (el) => {
					listRef.value = el;
				},
				"data": memoFlattenOptions.value,
				"height": listHeight,
				"itemHeight": listItemHeight,
				"fullHeight": false
			}, { onMousedown: onListMouseDown }, {
				"onScroll": onPopupScroll,
				"virtual": virtual,
				"direction": direction,
				"innerProps": virtual ? void 0 : a11yProps,
				"class": contextClassNames?.popup?.list,
				"style": contextStyles?.popup?.list
			}), { default: ({ item, index: itemIndex }) => {
				const { group, groupOption, data, label, value } = item;
				const { key } = data;
				if (group) {
					const groupTitle = data.title ?? (isTitleType(label) ? label.toString() : void 0);
					return createVNode("div", {
						"class": clsx(itemPrefixCls.value, `${itemPrefixCls.value}-group`, data.className),
						"title": groupTitle
					}, [label !== void 0 ? label : key]);
				}
				const { disabled, title, children, style, className, ...otherProps } = data;
				const passedProps = {};
				Object.keys(otherProps).forEach((propKey) => {
					if (!omitFieldNameList.includes(propKey)) passedProps[propKey] = otherProps[propKey];
				});
				const selected = isSelected(value);
				const mergedDisabled = disabled || !selected && overMaxCount.value;
				const optionPrefixCls = `${itemPrefixCls.value}-option`;
				const optionClassName = clsx(itemPrefixCls.value, optionPrefixCls, className, contextClassNames?.popup?.listItem, {
					[`${optionPrefixCls}-grouped`]: groupOption,
					[`${optionPrefixCls}-active`]: activeIndex.value === itemIndex && !mergedDisabled,
					[`${optionPrefixCls}-disabled`]: mergedDisabled,
					[`${optionPrefixCls}-selected`]: selected
				});
				const mergedLabel = getLabel(item);
				const iconVisible = !menuItemSelectedIcon || typeof menuItemSelectedIcon === "function" || selected;
				const content = typeof mergedLabel === "number" ? mergedLabel : mergedLabel || value;
				let optionTitle = isTitleType(content) ? content.toString() : void 0;
				if (title !== void 0) optionTitle = title;
				return createVNode("div", mergeProps(pickAttrs(passedProps), !virtual ? getItemAriaProps(item, itemIndex) : {}, {
					"aria-selected": virtual ? void 0 : isAriaSelected(value),
					"aria-disabled": mergedDisabled,
					"class": optionClassName,
					"title": optionTitle,
					"onMousemove": () => {
						if (activeIndex.value === itemIndex || mergedDisabled) return;
						setActive(itemIndex);
					},
					"onClick": () => {
						if (!mergedDisabled) onSelectValue(value);
					},
					"style": {
						...contextStyles?.popup?.listItem,
						...style
					}
				}), [createVNode("div", { "class": `${optionPrefixCls}-content` }, [typeof optionRender === "function" ? optionRender(item, { index: itemIndex }) : content]), iconVisible && createVNode(TransBtn_default, {
					"className": `${itemPrefixCls.value}-option-state`,
					"customizeIcon": menuItemSelectedIcon,
					"customizeIconProps": {
						value,
						disabled: mergedDisabled,
						isSelected: selected
					}
				}, { default: () => [selected ? "✓" : null] })]);
			} })]);
		};
	}
});
export { OptionList_default as default };
