import { MentionsProvider } from "./MentionsContext.js";
import KeywordTrigger_default from "./KeywordTrigger.js";
import { useUnstableContext } from "./context.js";
import useEffectState from "./hooks/useEffectState.js";
import { filterOption, getBeforeSelectionText, getLastMeasureIndex, replaceWithMeasure, setInputSelection, validateSearch } from "./util.js";
import { Fragment, computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { BaseInput } from "@v-c/input";
import TextArea from "@v-c/textarea";
import { KeyCode, clsx, omit, useId } from "@v-c/util";
import { toArray } from "@v-c/util/dist/Children/toArray";
import { filterEmpty, getAttrStyleAndClass } from "@v-c/util/dist/props-util";
var omitKeys = [
	"prefixCls",
	"className",
	"style",
	"classNames",
	"styles",
	"prefix",
	"split",
	"notFoundContent",
	"value",
	"defaultValue",
	"children",
	"options",
	"allowClear",
	"suffix",
	"hasWrapper",
	"silent",
	"validateSearch",
	"filterOption",
	"onChange",
	"onKeydown",
	"onKeyup",
	"onPressEnter",
	"onSearch",
	"onSelect",
	"onFocus",
	"onBlur",
	"transitionName",
	"placement",
	"direction",
	"getPopupContainer",
	"popupClassName",
	"rows",
	"visible",
	"onPopupScroll"
];
var defaults = {
	prefix: "@",
	prefixCls: "vc-mentions",
	split: " ",
	notFoundContent: "Not Found",
	validateSearch,
	filterOption,
	rows: 1
};
var InternalMentions = /* @__PURE__ */ defineComponent((props, { slots, expose, attrs }) => {
	const mergedPrefix = computed(() => {
		const prefix = props.prefix;
		return Array.isArray(prefix) ? prefix : [prefix];
	});
	const containerRef = shallowRef();
	const textareaRef = shallowRef();
	const measureRef = shallowRef();
	const getTextArea = () => textareaRef.value?.resizableTextArea?.textArea;
	expose({
		focus: () => textareaRef.value?.focus?.(),
		blur: () => textareaRef.value?.blur?.(),
		textarea: computed(() => textareaRef.value?.resizableTextArea?.textArea),
		nativeElement: containerRef
	});
	const measuring = shallowRef(false);
	const measureText = shallowRef("");
	const measurePrefix = shallowRef("");
	const measureLocation = shallowRef(0);
	const activeIndex = shallowRef(0);
	const isFocus = shallowRef(false);
	const setActiveIndex = (index) => {
		activeIndex.value = index;
	};
	const uniqueKey = useId(props.id);
	const mergedValue = shallowRef(props.value ?? props?.defaultValue ?? "");
	watch(() => props?.value, () => {
		mergedValue.value = props.value ?? "";
	});
	const { open } = useUnstableContext();
	watch(measuring, () => {
		if (measuring.value && measureRef.value) measureRef.value.scrollTop = getTextArea()?.scrollTop;
	}, { immediate: true });
	const mergedMeasuringInfo = computed(() => {
		if (open?.value) for (let i = 0; i < mergedPrefix.value.length; i += 1) {
			const curPrefix = mergedPrefix.value[i];
			const index = mergedValue.value.lastIndexOf(curPrefix);
			if (index >= 0) return [
				true,
				"",
				curPrefix,
				index
			];
		}
		return [
			measuring.value,
			measureText.value,
			measurePrefix.value,
			measureLocation.value
		];
	});
	const mergedMeasuring = computed(() => mergedMeasuringInfo.value[0]);
	const mergedMeasureText = computed(() => mergedMeasuringInfo.value[1]);
	const mergedMeasurePrefix = computed(() => mergedMeasuringInfo.value[2]);
	const mergedMeasureLocation = computed(() => mergedMeasuringInfo.value[3]);
	const children = computed(() => {
		const _child = slots?.default ? slots?.default?.() : [];
		if (_child) return filterEmpty(_child).filter(Boolean);
		return _child;
	});
	const getOptions = (targetMeasureText) => {
		let list;
		const options = props?.options ?? [];
		const filterOption$1 = props?.filterOption ?? filterOption;
		if (options && options.length > 0) list = options.map((item) => ({
			...item,
			key: `${item?.key ?? item.value}-${uniqueKey}`
		}));
		else list = toArray(children.value).map(({ props: optionProps, key }) => ({
			...optionProps,
			label: optionProps.children?.default?.(),
			key: `${key || optionProps.value}-${uniqueKey}`
		}));
		return list.filter((option) => {
			if (filterOption$1 === false) return true;
			if (typeof filterOption$1 !== "function") return true;
			return filterOption$1(targetMeasureText, option);
		});
	};
	const mergedOptions = computed(() => getOptions(mergedMeasureText.value));
	const onSelectionEffect = useEffectState();
	const startMeasure = (nextMeasureText, nextMeasurePrefix, nextMeasureLocation) => {
		measuring.value = true;
		measureText.value = nextMeasureText;
		measurePrefix.value = nextMeasurePrefix;
		measureLocation.value = nextMeasureLocation;
		activeIndex.value = 0;
	};
	const stopMeasure = (callback) => {
		measuring.value = false;
		measureLocation.value = 0;
		measureText.value = "";
		onSelectionEffect(callback);
	};
	const triggerChange = (nextValue) => {
		mergedValue.value = nextValue;
		props?.onChange?.(nextValue);
	};
	const onInternalChange = (e) => {
		const nextValue = e?.target?.value;
		triggerChange(nextValue);
	};
	const selectOption = (option) => {
		const { value: mentionValue = "" } = option;
		const textArea = getTextArea();
		const { text, selectionLocation } = replaceWithMeasure(mergedValue.value, {
			measureLocation: mergedMeasureLocation.value,
			targetText: mentionValue,
			prefix: mergedMeasurePrefix.value,
			selectionStart: textArea?.selectionStart,
			split: props.split
		});
		triggerChange(text);
		stopMeasure(() => {
			setInputSelection(textArea, selectionLocation);
		});
		props?.onSelect?.(option, mergedMeasurePrefix.value);
	};
	const onInternalKeyDown = (event) => {
		const { which } = event;
		props?.onKeydown?.(event);
		if (!mergedMeasuring.value) return;
		if (which === KeyCode.UP || which === KeyCode.DOWN) {
			const optionLen = mergedOptions.value.length;
			const offset = which === KeyCode.UP ? -1 : 1;
			activeIndex.value = (activeIndex.value + offset + optionLen) % optionLen;
			event.preventDefault();
		} else if (which === KeyCode.ESC) stopMeasure();
		else if (which === KeyCode.ENTER) {
			event.preventDefault();
			if (props?.silent) return;
			if (!mergedOptions.value.length) {
				stopMeasure();
				return;
			}
			const option = mergedOptions.value[activeIndex.value];
			selectOption(option);
		}
	};
	const onInternalKeyUp = (event) => {
		const { key, which } = event;
		const target = event.target;
		const selectionStartText = getBeforeSelectionText(target);
		const { location: measureIndex, prefix: nextMeasurePrefix } = getLastMeasureIndex(selectionStartText, mergedPrefix.value);
		props?.onKeyup?.(event);
		if ([
			KeyCode.ESC,
			KeyCode.UP,
			KeyCode.DOWN,
			KeyCode.ENTER
		].includes(which)) return;
		if (measureIndex !== -1) {
			const nextMeasureText = selectionStartText.slice(measureIndex + nextMeasurePrefix.length);
			const validateMeasure = (typeof props.validateSearch === "function" ? props.validateSearch : validateSearch)(nextMeasureText, props.split);
			const matchOption = !!getOptions(nextMeasureText).length;
			if (validateMeasure) {
				if (key === nextMeasurePrefix || key === "Shift" || which === KeyCode.ALT || key === "AltGraph" || mergedMeasuring.value || nextMeasureText !== mergedMeasureText.value && matchOption) startMeasure(nextMeasureText, nextMeasurePrefix, measureIndex);
			} else if (mergedMeasuring.value) stopMeasure();
			const onSearch = props?.onSearch;
			if (onSearch && validateMeasure) onSearch(nextMeasureText, nextMeasurePrefix);
		} else if (mergedMeasuring.value) stopMeasure();
	};
	const onInternalPressEnter = (event) => {
		const onPressEnter = props?.onPressEnter;
		if (!mergedMeasuring.value && onPressEnter) onPressEnter(event);
	};
	const focusRef = shallowRef();
	const onInternalFocus = (event) => {
		window.clearTimeout(focusRef.value);
		const onFocus = props?.onFocus;
		if (!isFocus.value && event && onFocus) onFocus(event);
		isFocus.value = true;
	};
	const onInternalBlur = (event) => {
		focusRef.value = window.setTimeout(() => {
			isFocus.value = false;
			stopMeasure();
			props?.onBlur?.(event);
		}, 0);
	};
	const onDropdownFocus = () => {
		onInternalFocus();
	};
	const onDropdownBlur = () => {
		onInternalBlur();
	};
	const onInternalPopupScroll = (event) => {
		props?.onPopupScroll?.(event);
	};
	return () => {
		const { classNames: mentionClassNames, styles, rows = 1, prefixCls, notFoundContent } = props;
		const restProps = omit(props, omitKeys);
		const { className, restAttrs, style } = getAttrStyleAndClass(attrs);
		const resizeStyle = styles?.textarea?.resize ?? style?.resize;
		const mergedTextareaStyle = { ...styles?.textarea };
		if (resizeStyle !== void 0) mergedTextareaStyle.resize = resizeStyle;
		const mergedStyles = {
			...styles,
			textarea: mergedTextareaStyle
		};
		const mentionNode = createVNode(Fragment, null, [createVNode(TextArea, mergeProps({
			"classNames": { textarea: mentionClassNames?.textarea },
			"styles": mergedStyles,
			"ref": textareaRef,
			"value": mergedValue.value
		}, restAttrs, restProps, { rows }, {
			"onChange": onInternalChange,
			"onKeydown": onInternalKeyDown,
			"onKeyup": onInternalKeyUp,
			"onPressEnter": onInternalPressEnter,
			"onFocus": onInternalFocus,
			"onBlur": onInternalBlur
		}), null), mergedMeasuring.value && createVNode("div", {
			"ref": measureRef,
			"class": `${prefixCls}-measure`
		}, [
			mergedValue.value.slice(0, mergedMeasureLocation.value),
			createVNode(MentionsProvider, { "value": {
				notFoundContent,
				activeIndex: activeIndex.value,
				setActiveIndex,
				selectOption,
				onFocus: onDropdownFocus,
				onBlur: onDropdownBlur,
				onScroll: onInternalPopupScroll
			} }, { default: () => [createVNode(KeywordTrigger_default, {
				"prefixCls": prefixCls,
				"transitionName": props.transitionName,
				"placement": props.placement,
				"direction": props.direction,
				"options": mergedOptions.value,
				"visible": true,
				"getPopupContainer": props.getPopupContainer,
				"popupClassName": clsx(props.popupClassName, mentionClassNames?.popup),
				"popupStyle": styles?.popup
			}, { default: () => [createVNode("span", null, [mergedMeasurePrefix.value])] })] }),
			mergedValue.value.slice(mergedMeasureLocation.value + mergedMeasurePrefix.value.length)
		])]);
		if (!props.hasWrapper) return createVNode("div", {
			"class": clsx(prefixCls, props.className, className),
			"style": style,
			"ref": containerRef
		}, [mentionNode]);
		return mentionNode;
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		hasWrapper: {
			type: Boolean,
			required: true,
			default: void 0
		},
		id: {
			type: String,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		defaultValue: {
			type: String,
			required: false,
			default: void 0
		},
		notFoundContent: {
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
		split: {
			type: String,
			required: false,
			default: void 0
		},
		transitionName: {
			type: String,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		prefix: {
			type: [String, Array],
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		value: {
			type: String,
			required: false,
			default: void 0
		},
		silent: {
			type: Boolean,
			required: false,
			default: void 0
		},
		filterOption: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		},
		validateSearch: {
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onSelect: {
			type: Function,
			required: false,
			default: void 0
		},
		onSearch: {
			type: Function,
			required: false,
			default: void 0
		},
		onFocus: {
			type: Function,
			required: false,
			default: void 0
		},
		onBlur: {
			type: Function,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: Function,
			required: false,
			default: void 0
		},
		popupClassName: {
			type: String,
			required: false,
			default: void 0
		},
		options: {
			type: Array,
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
		onPopupScroll: {
			type: Function,
			required: false,
			default: void 0
		},
		rows: {
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoSize: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		onPressEnter: {
			type: Function,
			required: false,
			default: void 0
		},
		onResize: {
			type: Function,
			required: false,
			default: void 0
		},
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		suffix: {
			required: false,
			default: void 0
		},
		count: {
			required: false,
			default: void 0
		},
		onClear: {
			type: Function,
			required: false,
			default: void 0
		},
		maxLength: {
			type: Number,
			required: false,
			default: void 0
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		readOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
			required: false,
			default: void 0
		},
		onKeydown: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyup: {
			type: Function,
			required: false,
			default: void 0
		}
	}, defaults),
	name: "VMentions",
	inheritAttrs: false
});
var Mentions_default = /* @__PURE__ */ defineComponent((props, { expose, attrs }) => {
	const hasSuffix = computed(() => !!(props.suffix || props.allowClear));
	const holderRef = shallowRef();
	const mentionRef = shallowRef();
	const mergedValue = shallowRef(props?.value ?? props?.defaultValue ?? "");
	watch(() => props.value, () => {
		mergedValue.value = props.value ?? "";
	});
	const setMergedValue = (value) => {
		mergedValue.value = value;
	};
	const triggerChange = (nextValue) => {
		setMergedValue(nextValue);
		props?.onChange?.(nextValue);
	};
	const handleReset = () => {
		triggerChange("");
	};
	expose({
		focus: () => mentionRef.value?.focus?.(),
		blur: () => mentionRef.value?.blur?.(),
		textarea: computed(() => mentionRef.value?.textarea || null),
		nativeElement: computed(() => holderRef.value?.nativeElement || mentionRef.value?.nativeElement)
	});
	return () => {
		const { suffix, prefixCls = "vc-mentions", allowClear, classNames: mentionsClassNames, styles, className: propsClassName, disabled, onClear, id, value: _value, defaultValue: _defaultValue, onChange: _onChange, ...rest } = props;
		const { className, style } = getAttrStyleAndClass(attrs);
		const internalClassName = clsx(mentionsClassNames?.mentions, propsClassName);
		const internalProps = {
			...attrs,
			...rest,
			id,
			value: mergedValue.value,
			prefixCls,
			className: internalClassName,
			classNames: mentionsClassNames,
			styles,
			disabled,
			hasWrapper: hasSuffix.value,
			onChange: triggerChange
		};
		return createVNode(BaseInput, {
			"ref": holderRef,
			"suffix": suffix,
			"prefixCls": prefixCls,
			"value": mergedValue.value,
			"allowClear": allowClear,
			"handleReset": handleReset,
			"class": clsx(prefixCls, propsClassName, className, { [`${prefixCls}-has-suffix`]: hasSuffix.value }),
			"style": style,
			"classNames": mentionsClassNames,
			"styles": styles,
			"disabled": disabled,
			"onClear": onClear
		}, { default: () => [createVNode(InternalMentions, mergeProps({ "ref": mentionRef }, internalProps), null)] });
	};
}, {
	props: {
		id: {
			type: String,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		defaultValue: {
			type: String,
			required: false,
			default: void 0
		},
		notFoundContent: {
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
		split: {
			type: String,
			required: false,
			default: void 0
		},
		transitionName: {
			type: String,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		prefix: {
			type: [String, Array],
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		value: {
			type: String,
			required: false,
			default: void 0
		},
		silent: {
			type: Boolean,
			required: false,
			default: void 0
		},
		filterOption: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		},
		validateSearch: {
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onSelect: {
			type: Function,
			required: false,
			default: void 0
		},
		onSearch: {
			type: Function,
			required: false,
			default: void 0
		},
		onFocus: {
			type: Function,
			required: false,
			default: void 0
		},
		onBlur: {
			type: Function,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: Function,
			required: false,
			default: void 0
		},
		popupClassName: {
			type: String,
			required: false,
			default: void 0
		},
		options: {
			type: Array,
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
		onPopupScroll: {
			type: Function,
			required: false,
			default: void 0
		},
		rows: {
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoSize: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		onPressEnter: {
			type: Function,
			required: false,
			default: void 0
		},
		onResize: {
			type: Function,
			required: false,
			default: void 0
		},
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		suffix: {
			required: false,
			default: void 0
		},
		count: {
			required: false,
			default: void 0
		},
		onClear: {
			type: Function,
			required: false,
			default: void 0
		},
		maxLength: {
			type: Number,
			required: false,
			default: void 0
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		readOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
			required: false,
			default: void 0
		},
		onKeydown: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyup: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "Mentions",
	inheritAttrs: false
});
export { Mentions_default as default };
