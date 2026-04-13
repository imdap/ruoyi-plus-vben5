import { hasAddon, hasPrefixSuffix } from "./utils/commonUtils.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
//#region src/BaseInput.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var BaseInput = /* @__PURE__ */ defineComponent((props, { slots, expose, attrs }) => {
	const containerRef = shallowRef();
	const onInputClick = (e) => {
		if (containerRef.value?.contains(e.target)) props?.triggerFocus?.();
	};
	const hasAffix = computed(() => hasPrefixSuffix(props));
	const groupRef = shallowRef();
	expose({ nativeElement: computed(() => groupRef.value || containerRef.value) });
	return () => {
		const { components, allowClear, readOnly, disabled, value, prefixCls, handleReset, onClear, suffix, focused, classNames, styles, dataAttrs, prefix, addonAfter, addonBefore, hidden } = props;
		let children = filterEmpty(slots?.default?.() ?? []);
		if (children.length === 1) children = children[0];
		else children = createVNode(Fragment, null, children);
		const inputElement = children;
		const AffixWrapperComponent = components?.affixWrapper || "span";
		const GroupWrapperComponent = components?.groupWrapper || "span";
		const WrapperComponent = components?.wrapper || "span";
		const GroupAddonComponent = components?.groupAddon || "span";
		let element = createVNode(inputElement, {
			value,
			class: !hasAffix.value && classNames?.variant
		});
		if (hasAffix.value) {
			let clearIcon = null;
			if (allowClear) {
				const needClear = !disabled && !readOnly && value;
				const clearIconCls = `${prefixCls}-clear-icon`;
				const iconNode = typeof allowClear === "object" && allowClear?.clearIcon ? allowClear.clearIcon : "✖";
				clearIcon = createVNode("button", {
					"type": "button",
					"tabindex": -1,
					"onClick": (event) => {
						handleReset?.(event);
						onClear?.();
					},
					"onMousedown": (e) => e.preventDefault(),
					"class": clsx(clearIconCls, {
						[`${clearIconCls}-hidden`]: !needClear,
						[`${clearIconCls}-has-suffix`]: !!suffix
					})
				}, [iconNode]);
			}
			const affixWrapperPrefixCls = `${prefixCls}-affix-wrapper`;
			const affixWrapperCls = clsx(affixWrapperPrefixCls, {
				[`${prefixCls}-disabled`]: disabled,
				[`${affixWrapperPrefixCls}-disabled`]: disabled,
				[`${affixWrapperPrefixCls}-focused`]: focused,
				[`${affixWrapperPrefixCls}-readonly`]: readOnly,
				[`${affixWrapperPrefixCls}-input-with-clear-btn`]: suffix && allowClear && value
			}, classNames?.affixWrapper, classNames?.variant);
			const suffixNode = (suffix || allowClear) && createVNode("span", {
				"class": clsx(`${prefixCls}-suffix`, classNames?.suffix),
				"style": styles?.suffix
			}, [clearIcon, suffix]);
			const _element = function() {
				return element;
			}();
			element = createVNode(AffixWrapperComponent, mergeProps({
				"class": affixWrapperCls,
				"style": styles?.affixWrapper,
				"onClick": onInputClick
			}, dataAttrs?.affixWrapper, { "ref": containerRef }), { default: () => [
				prefix && createVNode("span", {
					"class": clsx(`${prefixCls}-prefix`, classNames?.prefix),
					"style": styles?.prefix
				}, [prefix]),
				_element,
				suffixNode
			] });
		}
		if (hasAddon(props)) {
			const wrapperCls = `${prefixCls}-group`;
			const addonCls = `${wrapperCls}-addon`;
			const groupWrapperCls = `${wrapperCls}-wrapper`;
			const mergedWrapperClassName = clsx(`${prefixCls}-wrapper`, wrapperCls, classNames?.wrapper);
			const mergedGroupClassName = clsx(groupWrapperCls, { [`${groupWrapperCls}-disabled`]: disabled }, classNames?.groupWrapper);
			element = createVNode(GroupWrapperComponent, {
				"class": mergedGroupClassName,
				"ref": groupRef
			}, { default: () => [createVNode(WrapperComponent, { "class": mergedWrapperClassName }, { default: () => [
				addonBefore && createVNode(GroupAddonComponent, { "class": addonCls }, _isSlot(addonBefore) ? addonBefore : { default: () => [addonBefore] }),
				element,
				addonAfter && createVNode(GroupAddonComponent, { "class": addonCls }, _isSlot(addonAfter) ? addonAfter : { default: () => [addonAfter] })
			] })] });
		}
		return createVNode(element, {
			...attrs,
			hidden
		});
	};
}, {
	props: {
		value: {
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focused: {
			type: Boolean,
			required: false,
			default: void 0
		},
		triggerFocus: {
			type: Function,
			required: false,
			default: void 0
		},
		readOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		handleReset: {
			type: Function,
			required: false,
			default: void 0
		},
		onClear: {
			type: Function,
			required: false,
			default: void 0
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dataAttrs: {
			type: Object,
			required: false,
			default: void 0
		},
		components: {
			type: Object,
			required: false,
			default: void 0
		},
		prefix: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		suffix: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		addonBefore: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		addonAfter: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		classes: {
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
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		}
	},
	name: "BaseInput",
	inheritAttrs: false
});
//#endregion
export { BaseInput as default };
