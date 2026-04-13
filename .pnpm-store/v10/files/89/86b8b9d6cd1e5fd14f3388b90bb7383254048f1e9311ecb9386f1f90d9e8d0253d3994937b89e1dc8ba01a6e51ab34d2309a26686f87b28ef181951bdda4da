Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_MentionsContext = require("./MentionsContext.cjs");
const require_KeywordTrigger = require("./KeywordTrigger.cjs");
const require_context = require("./context.cjs");
const require_useEffectState = require("./hooks/useEffectState.cjs");
const require_util = require("./util.cjs");
let vue = require("vue");
let _v_c_input = require("@v-c/input");
let _v_c_textarea = require("@v-c/textarea");
_v_c_textarea = require_rolldown_runtime.__toESM(_v_c_textarea);
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_Children_toArray = require("@v-c/util/dist/Children/toArray");
let _v_c_util_dist_props_util = require("@v-c/util/dist/props-util");
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
	validateSearch: require_util.validateSearch,
	filterOption: require_util.filterOption,
	rows: 1
};
var InternalMentions = /* @__PURE__ */ (0, vue.defineComponent)((props, { slots, expose, attrs }) => {
	const mergedPrefix = (0, vue.computed)(() => {
		const prefix = props.prefix;
		return Array.isArray(prefix) ? prefix : [prefix];
	});
	const containerRef = (0, vue.shallowRef)();
	const textareaRef = (0, vue.shallowRef)();
	const measureRef = (0, vue.shallowRef)();
	const getTextArea = () => textareaRef.value?.resizableTextArea?.textArea;
	expose({
		focus: () => textareaRef.value?.focus?.(),
		blur: () => textareaRef.value?.blur?.(),
		textarea: (0, vue.computed)(() => textareaRef.value?.resizableTextArea?.textArea),
		nativeElement: containerRef
	});
	const measuring = (0, vue.shallowRef)(false);
	const measureText = (0, vue.shallowRef)("");
	const measurePrefix = (0, vue.shallowRef)("");
	const measureLocation = (0, vue.shallowRef)(0);
	const activeIndex = (0, vue.shallowRef)(0);
	const isFocus = (0, vue.shallowRef)(false);
	const setActiveIndex = (index) => {
		activeIndex.value = index;
	};
	const uniqueKey = (0, _v_c_util.useId)(props.id);
	const mergedValue = (0, vue.shallowRef)(props.value ?? props?.defaultValue ?? "");
	(0, vue.watch)(() => props?.value, () => {
		mergedValue.value = props.value ?? "";
	});
	const { open } = require_context.useUnstableContext();
	(0, vue.watch)(measuring, () => {
		if (measuring.value && measureRef.value) measureRef.value.scrollTop = getTextArea()?.scrollTop;
	}, { immediate: true });
	const mergedMeasuringInfo = (0, vue.computed)(() => {
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
	const mergedMeasuring = (0, vue.computed)(() => mergedMeasuringInfo.value[0]);
	const mergedMeasureText = (0, vue.computed)(() => mergedMeasuringInfo.value[1]);
	const mergedMeasurePrefix = (0, vue.computed)(() => mergedMeasuringInfo.value[2]);
	const mergedMeasureLocation = (0, vue.computed)(() => mergedMeasuringInfo.value[3]);
	const children = (0, vue.computed)(() => {
		const _child = slots?.default ? slots?.default?.() : [];
		if (_child) return (0, _v_c_util_dist_props_util.filterEmpty)(_child).filter(Boolean);
		return _child;
	});
	const getOptions = (targetMeasureText) => {
		let list;
		const options = props?.options ?? [];
		const filterOption$1 = props?.filterOption ?? require_util.filterOption;
		if (options && options.length > 0) list = options.map((item) => ({
			...item,
			key: `${item?.key ?? item.value}-${uniqueKey}`
		}));
		else list = (0, _v_c_util_dist_Children_toArray.toArray)(children.value).map(({ props: optionProps, key }) => ({
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
	const mergedOptions = (0, vue.computed)(() => getOptions(mergedMeasureText.value));
	const onSelectionEffect = require_useEffectState.default();
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
		const { text, selectionLocation } = require_util.replaceWithMeasure(mergedValue.value, {
			measureLocation: mergedMeasureLocation.value,
			targetText: mentionValue,
			prefix: mergedMeasurePrefix.value,
			selectionStart: textArea?.selectionStart,
			split: props.split
		});
		triggerChange(text);
		stopMeasure(() => {
			require_util.setInputSelection(textArea, selectionLocation);
		});
		props?.onSelect?.(option, mergedMeasurePrefix.value);
	};
	const onInternalKeyDown = (event) => {
		const { which } = event;
		props?.onKeydown?.(event);
		if (!mergedMeasuring.value) return;
		if (which === _v_c_util.KeyCode.UP || which === _v_c_util.KeyCode.DOWN) {
			const optionLen = mergedOptions.value.length;
			const offset = which === _v_c_util.KeyCode.UP ? -1 : 1;
			activeIndex.value = (activeIndex.value + offset + optionLen) % optionLen;
			event.preventDefault();
		} else if (which === _v_c_util.KeyCode.ESC) stopMeasure();
		else if (which === _v_c_util.KeyCode.ENTER) {
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
		const selectionStartText = require_util.getBeforeSelectionText(target);
		const { location: measureIndex, prefix: nextMeasurePrefix } = require_util.getLastMeasureIndex(selectionStartText, mergedPrefix.value);
		props?.onKeyup?.(event);
		if ([
			_v_c_util.KeyCode.ESC,
			_v_c_util.KeyCode.UP,
			_v_c_util.KeyCode.DOWN,
			_v_c_util.KeyCode.ENTER
		].includes(which)) return;
		if (measureIndex !== -1) {
			const nextMeasureText = selectionStartText.slice(measureIndex + nextMeasurePrefix.length);
			const validateMeasure = (typeof props.validateSearch === "function" ? props.validateSearch : require_util.validateSearch)(nextMeasureText, props.split);
			const matchOption = !!getOptions(nextMeasureText).length;
			if (validateMeasure) {
				if (key === nextMeasurePrefix || key === "Shift" || which === _v_c_util.KeyCode.ALT || key === "AltGraph" || mergedMeasuring.value || nextMeasureText !== mergedMeasureText.value && matchOption) startMeasure(nextMeasureText, nextMeasurePrefix, measureIndex);
			} else if (mergedMeasuring.value) stopMeasure();
			const onSearch = props?.onSearch;
			if (onSearch && validateMeasure) onSearch(nextMeasureText, nextMeasurePrefix);
		} else if (mergedMeasuring.value) stopMeasure();
	};
	const onInternalPressEnter = (event) => {
		const onPressEnter = props?.onPressEnter;
		if (!mergedMeasuring.value && onPressEnter) onPressEnter(event);
	};
	const focusRef = (0, vue.shallowRef)();
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
		const restProps = (0, _v_c_util.omit)(props, omitKeys);
		const { className, restAttrs, style } = (0, _v_c_util_dist_props_util.getAttrStyleAndClass)(attrs);
		const resizeStyle = styles?.textarea?.resize ?? style?.resize;
		const mergedTextareaStyle = { ...styles?.textarea };
		if (resizeStyle !== void 0) mergedTextareaStyle.resize = resizeStyle;
		const mergedStyles = {
			...styles,
			textarea: mergedTextareaStyle
		};
		const mentionNode = (0, vue.createVNode)(vue.Fragment, null, [(0, vue.createVNode)(_v_c_textarea.default, (0, vue.mergeProps)({
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
		}), null), mergedMeasuring.value && (0, vue.createVNode)("div", {
			"ref": measureRef,
			"class": `${prefixCls}-measure`
		}, [
			mergedValue.value.slice(0, mergedMeasureLocation.value),
			(0, vue.createVNode)(require_MentionsContext.MentionsProvider, { "value": {
				notFoundContent,
				activeIndex: activeIndex.value,
				setActiveIndex,
				selectOption,
				onFocus: onDropdownFocus,
				onBlur: onDropdownBlur,
				onScroll: onInternalPopupScroll
			} }, { default: () => [(0, vue.createVNode)(require_KeywordTrigger.default, {
				"prefixCls": prefixCls,
				"transitionName": props.transitionName,
				"placement": props.placement,
				"direction": props.direction,
				"options": mergedOptions.value,
				"visible": true,
				"getPopupContainer": props.getPopupContainer,
				"popupClassName": (0, _v_c_util.clsx)(props.popupClassName, mentionClassNames?.popup),
				"popupStyle": styles?.popup
			}, { default: () => [(0, vue.createVNode)("span", null, [mergedMeasurePrefix.value])] })] }),
			mergedValue.value.slice(mergedMeasureLocation.value + mergedMeasurePrefix.value.length)
		])]);
		if (!props.hasWrapper) return (0, vue.createVNode)("div", {
			"class": (0, _v_c_util.clsx)(prefixCls, props.className, className),
			"style": style,
			"ref": containerRef
		}, [mentionNode]);
		return mentionNode;
	};
}, {
	props: /* @__PURE__ */ (0, vue.mergeDefaults)({
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
var Mentions = /* @__PURE__ */ (0, vue.defineComponent)((props, { expose, attrs }) => {
	const hasSuffix = (0, vue.computed)(() => !!(props.suffix || props.allowClear));
	const holderRef = (0, vue.shallowRef)();
	const mentionRef = (0, vue.shallowRef)();
	const mergedValue = (0, vue.shallowRef)(props?.value ?? props?.defaultValue ?? "");
	(0, vue.watch)(() => props.value, () => {
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
		textarea: (0, vue.computed)(() => mentionRef.value?.textarea || null),
		nativeElement: (0, vue.computed)(() => holderRef.value?.nativeElement || mentionRef.value?.nativeElement)
	});
	return () => {
		const { suffix, prefixCls = "vc-mentions", allowClear, classNames: mentionsClassNames, styles, className: propsClassName, disabled, onClear, id, value: _value, defaultValue: _defaultValue, onChange: _onChange, ...rest } = props;
		const { className, style } = (0, _v_c_util_dist_props_util.getAttrStyleAndClass)(attrs);
		const internalClassName = (0, _v_c_util.clsx)(mentionsClassNames?.mentions, propsClassName);
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
		return (0, vue.createVNode)(_v_c_input.BaseInput, {
			"ref": holderRef,
			"suffix": suffix,
			"prefixCls": prefixCls,
			"value": mergedValue.value,
			"allowClear": allowClear,
			"handleReset": handleReset,
			"class": (0, _v_c_util.clsx)(prefixCls, propsClassName, className, { [`${prefixCls}-has-suffix`]: hasSuffix.value }),
			"style": style,
			"classNames": mentionsClassNames,
			"styles": styles,
			"disabled": disabled,
			"onClear": onClear
		}, { default: () => [(0, vue.createVNode)(InternalMentions, (0, vue.mergeProps)({ "ref": mentionRef }, internalProps), null)] });
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
var Mentions_default = Mentions;
exports.default = Mentions_default;
