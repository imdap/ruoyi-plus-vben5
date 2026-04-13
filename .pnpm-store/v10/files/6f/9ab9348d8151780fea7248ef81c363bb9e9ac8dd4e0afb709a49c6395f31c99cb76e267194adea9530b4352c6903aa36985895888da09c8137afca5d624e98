import { usePickerContext } from "../../context.js";
import { isSame } from "../../../utils/dateUtil.js";
import useInputProps from "../hooks/useInputHooks.js";
import useRootProps from "../hooks/useRootProps.js";
import Icon_default, { ClearIcon } from "../Icon.js";
import Input_default from "../Input.js";
import MultipleDates_default from "./MultipleDates.js";
import { Fragment, computed, createVNode, defineComponent, mergeProps, ref } from "vue";
import { clsx } from "@v-c/util";
var SingleSelector_default = /* @__PURE__ */ defineComponent((props, { attrs, expose }) => {
	const rtl = computed(() => props.direction === "rtl");
	const ctx = usePickerContext();
	const prefixCls = computed(() => ctx.value.prefixCls);
	const classNames = computed(() => ctx.value.classNames);
	const styles = computed(() => ctx.value.styles);
	const rootRef = ref();
	const inputRef = ref();
	expose({
		nativeElement: rootRef,
		focus: (options) => {
			inputRef.value?.focus(options);
		},
		blur: () => {
			inputRef.value?.blur();
		}
	});
	const rootProps = useRootProps(props);
	const onSingleChange = (date) => {
		props.onChange?.([date]);
	};
	const onMultipleRemove = (date) => {
		const nextValues = (props.value || []).filter((oriDate) => oriDate && !isSame(props.generateConfig, props.locale, oriDate, date, props.internalPicker));
		props.onChange?.(nextValues);
		if (!props.open) props.onSubmit?.();
	};
	const [getInputProps, getText] = useInputProps(computed(() => ({
		...props,
		"aria-required": !!props["aria-required"],
		"onChange": onSingleChange
	})), ({ valueTexts }) => ({
		value: valueTexts[0] || "",
		active: props.focused
	}));
	return () => {
		const { prefix, clearIcon, suffixIcon, placeholder, onClick, onClear, multiple, maxTagCount, removeIcon, onMouseDown, value, disabled, invalid, autoFocus, tabIndex } = props;
		const showClear = !!(clearIcon && value && value.length && !disabled);
		const selectorNode = multiple ? createVNode(Fragment, null, [
			createVNode(MultipleDates_default, {
				"prefixCls": prefixCls.value,
				"value": value,
				"onRemove": onMultipleRemove,
				"formatDate": getText,
				"maxTagCount": maxTagCount,
				"disabled": disabled,
				"removeIcon": removeIcon,
				"placeholder": placeholder
			}, null),
			createVNode("input", {
				"class": `${prefixCls.value}-multiple-input`,
				"value": (value || []).map(getText).join(","),
				"ref": inputRef,
				"readonly": true,
				"autofocus": autoFocus,
				"tabindex": tabIndex
			}, null),
			createVNode(Icon_default, {
				"type": "suffix",
				"icon": suffixIcon
			}, null),
			showClear && createVNode(ClearIcon, {
				"icon": clearIcon,
				"onClear": onClear
			}, null)
		]) : createVNode(Input_default, mergeProps({ "ref": inputRef }, getInputProps(), {
			"autofocus": autoFocus,
			"tabindex": tabIndex,
			"suffixIcon": suffixIcon,
			"clearIcon": showClear && createVNode(ClearIcon, {
				"icon": clearIcon,
				"onClear": onClear
			}, null),
			"showActiveCls": false
		}), null);
		return createVNode("div", mergeProps(rootProps.value, {
			"class": clsx(prefixCls.value, {
				[`${prefixCls.value}-multiple`]: multiple,
				[`${prefixCls.value}-focused`]: props.focused,
				[`${prefixCls.value}-disabled`]: disabled,
				[`${prefixCls.value}-invalid`]: invalid,
				[`${prefixCls.value}-rtl`]: rtl.value
			}, props.class, attrs.class),
			"style": {
				...attrs.style,
				...props.style
			},
			"ref": rootRef,
			"onClick": onClick,
			"onMousedown": (e) => {
				const { target } = e;
				if (target !== inputRef.value?.inputElement) e.preventDefault();
				onMouseDown?.(e);
			}
		}), [prefix && createVNode("div", {
			"class": clsx(`${prefixCls.value}-prefix`, classNames.value.prefix),
			"style": styles.value.prefix
		}, [prefix]), selectorNode]);
	};
}, {
	props: {
		id: {
			type: String,
			required: false,
			default: void 0
		},
		value: {
			type: Array,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: true,
			default: void 0
		},
		internalPicker: {
			type: String,
			required: true,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		allHelp: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
			required: false,
			default: void 0
		},
		invalid: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onInvalid: {
			type: Function,
			required: true,
			default: void 0
		},
		removeIcon: {
			required: false,
			default: void 0
		},
		maxTagCount: {
			type: [Number, String],
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onMouseDown: {
			type: Function,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tabIndex: {
			type: [Number, String],
			required: false,
			default: void 0
		},
		picker: {
			type: String,
			required: true,
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
		clearIcon: {
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
		suffixIcon: {
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
		className: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		activeHelp: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focused: {
			type: Boolean,
			required: true,
			default: void 0
		},
		onFocus: {
			type: Function,
			required: true,
			default: void 0
		},
		onBlur: {
			type: Function,
			required: true,
			default: void 0
		},
		onSubmit: {
			required: true,
			default: void 0
		},
		onKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		locale: {
			type: Object,
			required: true,
			default: void 0
		},
		generateConfig: {
			type: Object,
			required: true,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		onClick: {
			type: [Function, Array],
			required: true,
			default: void 0
		},
		onClear: {
			required: true,
			default: void 0
		},
		format: {
			type: Array,
			required: true,
			default: void 0
		},
		maskFormat: {
			type: String,
			required: false,
			default: void 0
		},
		onInputChange: {
			required: true,
			default: void 0
		},
		preserveInvalidOnBlur: {
			type: Boolean,
			required: false,
			default: void 0
		},
		open: {
			type: Boolean,
			required: true,
			default: void 0
		},
		onOpenChange: {
			type: Function,
			required: true,
			default: void 0
		},
		inputReadOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		innerHTML: {
			type: [String, null],
			required: false,
			default: void 0
		},
		class: {
			required: false,
			default: void 0
		},
		accesskey: {
			type: [String, null],
			required: false,
			default: void 0
		},
		contenteditable: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		contextmenu: {
			type: [String, null],
			required: false,
			default: void 0
		},
		dir: {
			type: [String, null],
			required: false,
			default: void 0
		},
		draggable: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		enterkeyhint: {
			type: [String, null],
			required: false,
			default: void 0
		},
		enterKeyHint: {
			type: [String, null],
			required: false,
			default: void 0
		},
		hidden: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		inert: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		lang: {
			type: [String, null],
			required: false,
			default: void 0
		},
		spellcheck: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		tabindex: {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		title: {
			type: [String, null],
			required: false,
			default: void 0
		},
		translate: {
			type: [String, null],
			required: false,
			default: void 0
		},
		radiogroup: {
			type: [String, null],
			required: false,
			default: void 0
		},
		role: {
			type: [String, null],
			required: false,
			default: void 0
		},
		about: {
			type: [String, null],
			required: false,
			default: void 0
		},
		datatype: {
			type: [String, null],
			required: false,
			default: void 0
		},
		inlist: {
			required: false,
			default: void 0
		},
		property: {
			type: [String, null],
			required: false,
			default: void 0
		},
		resource: {
			type: [String, null],
			required: false,
			default: void 0
		},
		typeof: {
			type: [String, null],
			required: false,
			default: void 0
		},
		vocab: {
			type: [String, null],
			required: false,
			default: void 0
		},
		autocapitalize: {
			type: [String, null],
			required: false,
			default: void 0
		},
		autocorrect: {
			type: [String, null],
			required: false,
			default: void 0
		},
		autosave: {
			type: [String, null],
			required: false,
			default: void 0
		},
		color: {
			type: [String, null],
			required: false,
			default: void 0
		},
		itemprop: {
			type: [String, null],
			required: false,
			default: void 0
		},
		itemscope: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		itemtype: {
			type: [String, null],
			required: false,
			default: void 0
		},
		itemid: {
			type: [String, null],
			required: false,
			default: void 0
		},
		itemref: {
			type: [String, null],
			required: false,
			default: void 0
		},
		results: {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		security: {
			type: [String, null],
			required: false,
			default: void 0
		},
		unselectable: {
			type: [String, null],
			required: false,
			default: void 0
		},
		inputmode: {
			type: [String, null],
			required: false,
			default: void 0
		},
		is: {
			type: [String, null],
			required: false,
			default: void 0
		},
		exportparts: {
			type: String,
			required: false,
			default: void 0
		},
		part: {
			type: String,
			required: false,
			default: void 0
		},
		"aria-activedescendant": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-atomic": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-autocomplete": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-busy": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-checked": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-colcount": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-colindex": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-colspan": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-controls": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-current": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-describedby": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-details": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-disabled": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-dropeffect": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-errormessage": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-expanded": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-flowto": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-grabbed": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-haspopup": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-hidden": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-invalid": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-keyshortcuts": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-label": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-labelledby": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-level": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-live": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-modal": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-multiline": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-multiselectable": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-orientation": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-owns": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-placeholder": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-posinset": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-pressed": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-readonly": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-relevant": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-required": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-roledescription": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-rowcount": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-rowindex": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-rowspan": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-selected": {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-setsize": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-sort": {
			type: [String, null],
			required: false,
			default: void 0
		},
		"aria-valuemax": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-valuemin": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-valuenow": {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		"aria-valuetext": {
			type: [String, null],
			required: false,
			default: void 0
		},
		onCopy: {
			type: Function,
			required: false,
			default: void 0
		},
		onCut: {
			type: Function,
			required: false,
			default: void 0
		},
		onPaste: {
			type: Function,
			required: false,
			default: void 0
		},
		onCompositionend: {
			type: Function,
			required: false,
			default: void 0
		},
		onCompositionstart: {
			type: Function,
			required: false,
			default: void 0
		},
		onCompositionupdate: {
			type: Function,
			required: false,
			default: void 0
		},
		onDrag: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragend: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragenter: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragexit: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragleave: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragover: {
			type: Function,
			required: false,
			default: void 0
		},
		onDragstart: {
			type: Function,
			required: false,
			default: void 0
		},
		onDrop: {
			type: Function,
			required: false,
			default: void 0
		},
		onFocusin: {
			type: Function,
			required: false,
			default: void 0
		},
		onFocusout: {
			type: Function,
			required: false,
			default: void 0
		},
		onBeforeinput: {
			type: Function,
			required: false,
			default: void 0
		},
		onFormdata: {
			type: Function,
			required: false,
			default: void 0
		},
		onInput: {
			type: Function,
			required: false,
			default: void 0
		},
		onReset: {
			type: Function,
			required: false,
			default: void 0
		},
		onFullscreenchange: {
			type: Function,
			required: false,
			default: void 0
		},
		onFullscreenerror: {
			type: Function,
			required: false,
			default: void 0
		},
		onLoad: {
			type: Function,
			required: false,
			default: void 0
		},
		onError: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeydown: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeypress: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyup: {
			type: Function,
			required: false,
			default: void 0
		},
		onDblclick: {
			type: Function,
			required: false,
			default: void 0
		},
		onMousedown: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseenter: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseleave: {
			type: Function,
			required: false,
			default: void 0
		},
		onMousemove: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseout: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseover: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseup: {
			type: Function,
			required: false,
			default: void 0
		},
		onAbort: {
			type: Function,
			required: false,
			default: void 0
		},
		onCanplay: {
			type: Function,
			required: false,
			default: void 0
		},
		onCanplaythrough: {
			type: Function,
			required: false,
			default: void 0
		},
		onDurationchange: {
			type: Function,
			required: false,
			default: void 0
		},
		onEmptied: {
			type: Function,
			required: false,
			default: void 0
		},
		onEncrypted: {
			type: Function,
			required: false,
			default: void 0
		},
		onEnded: {
			type: Function,
			required: false,
			default: void 0
		},
		onLoadeddata: {
			type: Function,
			required: false,
			default: void 0
		},
		onLoadedmetadata: {
			type: Function,
			required: false,
			default: void 0
		},
		onLoadstart: {
			type: Function,
			required: false,
			default: void 0
		},
		onPause: {
			type: Function,
			required: false,
			default: void 0
		},
		onPlay: {
			type: Function,
			required: false,
			default: void 0
		},
		onPlaying: {
			type: Function,
			required: false,
			default: void 0
		},
		onProgress: {
			type: Function,
			required: false,
			default: void 0
		},
		onRatechange: {
			type: Function,
			required: false,
			default: void 0
		},
		onSeeked: {
			type: Function,
			required: false,
			default: void 0
		},
		onSeeking: {
			type: Function,
			required: false,
			default: void 0
		},
		onStalled: {
			type: Function,
			required: false,
			default: void 0
		},
		onSuspend: {
			type: Function,
			required: false,
			default: void 0
		},
		onTimeupdate: {
			type: Function,
			required: false,
			default: void 0
		},
		onVolumechange: {
			type: Function,
			required: false,
			default: void 0
		},
		onWaiting: {
			type: Function,
			required: false,
			default: void 0
		},
		onScroll: {
			type: Function,
			required: false,
			default: void 0
		},
		onScrollend: {
			type: Function,
			required: false,
			default: void 0
		},
		onTouchcancel: {
			type: Function,
			required: false,
			default: void 0
		},
		onTouchend: {
			type: Function,
			required: false,
			default: void 0
		},
		onTouchmove: {
			type: Function,
			required: false,
			default: void 0
		},
		onTouchstart: {
			type: Function,
			required: false,
			default: void 0
		},
		onAuxclick: {
			type: Function,
			required: false,
			default: void 0
		},
		onContextmenu: {
			type: Function,
			required: false,
			default: void 0
		},
		onGotpointercapture: {
			type: Function,
			required: false,
			default: void 0
		},
		onLostpointercapture: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerdown: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointermove: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerup: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointercancel: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerenter: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerleave: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerover: {
			type: Function,
			required: false,
			default: void 0
		},
		onPointerout: {
			type: Function,
			required: false,
			default: void 0
		},
		onBeforetoggle: {
			type: Function,
			required: false,
			default: void 0
		},
		onToggle: {
			type: Function,
			required: false,
			default: void 0
		},
		onWheel: {
			type: Function,
			required: false,
			default: void 0
		},
		onAnimationcancel: {
			type: Function,
			required: false,
			default: void 0
		},
		onAnimationstart: {
			type: Function,
			required: false,
			default: void 0
		},
		onAnimationend: {
			type: Function,
			required: false,
			default: void 0
		},
		onAnimationiteration: {
			type: Function,
			required: false,
			default: void 0
		},
		onSecuritypolicyviolation: {
			type: Function,
			required: false,
			default: void 0
		},
		onTransitioncancel: {
			type: Function,
			required: false,
			default: void 0
		},
		onTransitionend: {
			type: Function,
			required: false,
			default: void 0
		},
		onTransitionrun: {
			type: Function,
			required: false,
			default: void 0
		},
		onTransitionstart: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "SingleSelector",
	inheritAttrs: false
});
export { SingleSelector_default as default };
