import { devUseWarning, isDev } from "../../_util/warning.js";
import { useComponentBaseConfig } from "../../config-provider/context.js";
import { useSize } from "../../config-provider/hooks/useSize.js";
import { useCompactItemContext } from "../../space/Compact.js";
import { ContextIsolator } from "../../_util/ContextIsolator.js";
import { getAttrStyleAndClass } from "../../_util/hooks/useMergeSemantic.js";
import { useZIndex } from "../../_util/hooks/useZIndex.js";
import { getSlotPropsFnRun, toPropsRefs } from "../../_util/tools.js";
import useCSSVarCls_default from "../../config-provider/hooks/useCSSVarCls.js";
import { useDisabledContext } from "../../config-provider/DisabledContext.js";
import en_US_default from "../locale/en_US.js";
import useLocale_default from "../../locale/useLocale.js";
import { getMergedStatus, getStatusClassNames } from "../../_util/statusUtils.js";
import { useFormItemInputContext } from "../../form/context.js";
import { useVariants } from "../../form/hooks/useVariant.js";
import style_default from "../style/index.js";
import useMergedPickerSemantic from "../hooks/useMergedPickerSemantic.js";
import { getRangePlaceholder, useIcons } from "../util.js";
import { TIME } from "./constant.js";
import SuffixIcon_default from "./SuffixIcon.js";
import useComponents from "./useComponents.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { SwapRightOutlined } from "@antdv-next/icons";
import { getTransitionName } from "@v-c/util/dist/utils/transition";
import { RangePicker } from "@v-c/picker";

//#region src/date-picker/generatePicker/generateRangePicker.tsx
function generateRangePicker(generateConfig) {
	return /* @__PURE__ */ defineComponent((props, { slots, attrs, emit, expose }) => {
		const { size: customizeSize, disabled: customDisabled, status: customStatus, variant: customVariant, classes, styles, rootClass, bordered } = toPropsRefs(props, "size", "disabled", "status", "variant", "classes", "styles", "rootClass", "bordered", "separator");
		const pickerType = computed(() => props.picker === TIME ? "timePicker" : "datePicker");
		const { prefixCls, direction, getPopupContainer, rootPrefixCls, class: contextClassName, style: contextStyle, separator: contextSeparator } = useComponentBaseConfig("rangePicker", props, ["separator"], "picker");
		const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
		const mergedSize = useSize((ctx) => customizeSize.value ?? compactSize.value ?? ctx);
		const disabled = useDisabledContext();
		const mergedDisabled = computed(() => customDisabled.value ?? disabled.value);
		const mergedProps = computed(() => ({
			...props,
			size: mergedSize.value,
			disabled: mergedDisabled.value,
			status: customStatus.value,
			variant: customVariant.value
		}));
		const popupClassName = computed(() => props.popupClassName || props.dropdownClassName);
		const popupStyle = computed(() => props.popupStyle);
		const [mergedClassNames, mergedStyles] = useMergedPickerSemantic(pickerType.value, classes, styles, popupClassName, popupStyle, mergedProps);
		const innerRef = shallowRef();
		const [variant, enableVariantCls] = useVariants("rangePicker", customVariant, bordered);
		const rootCls = useCSSVarCls_default(prefixCls);
		const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
		const mergedRootClassName = computed(() => clsx(hashId.value, cssVarCls.value, rootCls.value, rootClass.value));
		const [contextLocale] = useLocale_default("Calendar", en_US_default);
		const locale = computed(() => ({
			...contextLocale?.value,
			...props.locale ?? {}
		}));
		const [zIndex] = useZIndex("DatePicker", computed(() => mergedStyles.value?.popup?.root?.zIndex));
		const triggerChange = (dates, dateStrings) => {
			emit("update:value", dates);
			emit("change", dates, dateStrings);
		};
		const handleCalendarChange = (dates, dateStrings, info) => {
			emit("calendarChange", dates, dateStrings, info);
		};
		const handlePanelChange = (values, modes) => {
			emit("panelChange", values, modes);
		};
		const handleOpenChange = (open) => {
			emit("openChange", open);
		};
		const handleOk = (values) => {
			emit("ok", values);
		};
		const handleFocus = (e, info) => {
			emit("focus", e, info);
		};
		const handleBlur = (e, info) => {
			emit("blur", e, info);
		};
		const handleKeyDown = (e, preventDefault) => {
			emit("keydown", e, preventDefault);
		};
		const resolveRender = (key, args, slotParams) => {
			const slot = slots?.[key];
			if (slot) return slot(slotParams);
			const propValue = props[key];
			if (typeof propValue === "function") return propValue(...args);
			return propValue;
		};
		if (isDev) {
			const warning = devUseWarning("DatePicker.RangePicker");
			Object.entries({
				dropdownClassName: "classes.popup.root",
				popupClassName: "classes.popup.root",
				popupStyle: "styles.popup.root",
				bordered: "variant"
			}).forEach(([oldProp, newProp]) => {
				warning.deprecated(!props[oldProp], oldProp, newProp);
			});
		}
		expose({
			focus: (options) => innerRef.value?.focus?.(options),
			blur: () => innerRef.value?.blur?.(),
			nativeElement: computed(() => innerRef.value?.nativeElement)
		});
		return () => {
			const { placeholder, components, placement, suffixIcon, allowClear, popupClassName: _popupClassName, dropdownClassName: _dropdownClassName, popupStyle: _popupStyle, rootClass: _rootClass, classes: _classes, styles: _styles, status: _status, variant: _variant, bordered: _bordered, size: _size, disabled: _disabled, locale: _locale, getPopupContainer: _getPopupContainer, ...restProps } = props;
			const { className, style, restAttrs } = getAttrStyleAndClass(attrs, void 0, props);
			const mergedSuffixIcon = getSlotPropsFnRun(slots, { suffixIcon }, "suffixIcon", false);
			const [mergedAllowClear] = useIcons({ allowClear }, prefixCls.value);
			const mergedComponents = useComponents(components);
			const { hasFeedback, status: contextStatus, feedbackIcon } = useFormItemInputContext().value;
			const mergedStatus = getMergedStatus(contextStatus, customStatus.value);
			const suffixNode = createVNode(SuffixIcon_default, {
				picker: props.picker,
				hasFeedback,
				feedbackIcon,
				suffixIcon: mergedSuffixIcon
			}, null);
			const mergedClassName = clsx({
				[`${prefixCls.value}-${mergedSize.value}`]: mergedSize.value,
				[`${prefixCls.value}-${variant.value}`]: enableVariantCls.value
			}, getStatusClassNames(prefixCls.value, mergedStatus, hasFeedback), compactItemClassnames.value, contextClassName?.value, className);
			const mergedStyle = {
				...contextStyle?.value,
				...style
			};
			const cellRender = slots.cellRender || props.cellRender ? (current, info) => resolveRender("cellRender", [current, info], {
				current,
				info
			}) : void 0;
			const dateRender = slots.dateRender || props.dateRender ? (date, today) => resolveRender("dateRender", [date, today], {
				date,
				today
			}) : void 0;
			const monthCellRender = slots.monthCellRender || props.monthCellRender ? (date, localeInfo) => resolveRender("monthCellRender", [date, localeInfo], {
				date,
				locale: localeInfo
			}) : void 0;
			const renderExtraFooter = slots.renderExtraFooter || props.renderExtraFooter ? (mode) => resolveRender("renderExtraFooter", [mode], mode) : void 0;
			const panelRender = slots.panelRender || props.panelRender ? (panel) => resolveRender("panelRender", [panel], panel) : void 0;
			const inputRender = slots.inputRender || props.inputRender ? (inputProps) => resolveRender("inputRender", [inputProps], inputProps) : void 0;
			const _contextSeparator = getSlotPropsFnRun({}, { separator: contextSeparator?.value }, "separator", false);
			const mergedSeparator = (getSlotPropsFnRun(slots, props, "separator", false) || _contextSeparator) ?? _contextSeparator;
			return createVNode(ContextIsolator, { "space": true }, { default: () => [createVNode(RangePicker, mergeProps(restAttrs, restProps, {
				"ref": innerRef,
				"separator": createVNode("span", {
					"aria-label": "to",
					"class": `${prefixCls.value}-separator`
				}, [mergedSeparator ?? createVNode(SwapRightOutlined, null, null)]),
				"disabled": mergedDisabled.value,
				"placement": placement,
				"placeholder": getRangePlaceholder(locale.value, props.picker, placeholder),
				"suffixIcon": suffixNode,
				"prevIcon": createVNode("span", { "class": `${prefixCls.value}-prev-icon` }, null),
				"nextIcon": createVNode("span", { "class": `${prefixCls.value}-next-icon` }, null),
				"superPrevIcon": createVNode("span", { "class": `${prefixCls.value}-super-prev-icon` }, null),
				"superNextIcon": createVNode("span", { "class": `${prefixCls.value}-super-next-icon` }, null),
				"transitionName": getTransitionName(rootPrefixCls.value, "slide-up"),
				"picker": props.picker,
				"onCalendarChange": handleCalendarChange,
				"onChange": triggerChange,
				"onPanelChange": handlePanelChange,
				"onOpenChange": handleOpenChange,
				"onOk": handleOk,
				"onFocus": handleFocus,
				"onBlur": handleBlur,
				"onKeyDown": handleKeyDown,
				"locale": locale.value?.lang,
				"getPopupContainer": props.getPopupContainer || getPopupContainer,
				"generateConfig": generateConfig,
				"components": mergedComponents,
				"direction": direction.value,
				"prefixCls": prefixCls.value,
				"rootClassName": mergedRootClassName.value,
				"className": mergedClassName,
				"style": mergedStyle,
				"classNames": mergedClassNames.value,
				"styles": {
					...mergedStyles.value,
					popup: {
						...mergedStyles.value.popup,
						root: {
							...mergedStyles.value.popup?.root,
							zIndex: zIndex.value
						}
					}
				},
				"allowClear": mergedAllowClear,
				"cellRender": cellRender,
				"dateRender": dateRender,
				"monthCellRender": monthCellRender,
				"renderExtraFooter": renderExtraFooter,
				"panelRender": panelRender,
				"inputRender": inputRender
			}), null)] });
		};
	}, {
		props: {
			locale: {
				type: Object,
				required: false
			},
			size: {
				type: [String, null],
				required: false
			},
			placement: {
				type: String,
				required: false
			},
			bordered: {
				type: Boolean,
				required: false,
				default: void 0
			},
			status: {
				type: String,
				required: false
			},
			variant: {
				type: String,
				required: false
			},
			dropdownClassName: {
				type: String,
				required: false
			},
			popupClassName: {
				type: String,
				required: false
			},
			rootClass: {
				type: String,
				required: false
			},
			popupStyle: {
				type: Object,
				required: false
			},
			classes: {
				type: [Object, Function],
				required: false
			},
			styles: {
				type: [Object, Function],
				required: false
			},
			id: {
				type: [String, Object],
				required: false
			},
			separator: { required: false },
			value: {
				type: [Array, null],
				required: false
			},
			defaultValue: {
				type: Array,
				required: false
			},
			placeholder: {
				type: Array,
				required: false
			},
			defaultPickerValue: { required: false },
			pickerValue: { required: false },
			onPickerValueChange: {
				type: Function,
				required: false
			},
			presets: {
				type: Array,
				required: false
			},
			ranges: {
				type: Object,
				required: false
			},
			disabled: {
				type: [Boolean, Array],
				required: false,
				default: void 0
			},
			allowEmpty: {
				type: [Boolean, Array],
				required: false,
				default: void 0
			},
			showTime: {
				type: [Boolean, Object],
				required: false,
				default: void 0
			},
			mode: {
				type: Array,
				required: false
			},
			direction: {
				type: String,
				required: false
			},
			prefixCls: {
				type: String,
				required: false
			},
			picker: {
				type: String,
				required: false
			},
			showWeek: {
				type: Boolean,
				required: false,
				default: void 0
			},
			format: {
				type: [
					String,
					Function,
					Array,
					Object
				],
				required: false
			},
			valueFormat: {
				type: String,
				required: false
			},
			prefix: { required: false },
			suffixIcon: { required: false },
			allowClear: {
				type: [Boolean, Object],
				required: false,
				default: void 0
			},
			clearIcon: { required: false },
			inputReadOnly: {
				type: Boolean,
				required: false,
				default: void 0
			},
			order: {
				type: Boolean,
				required: false,
				default: void 0
			},
			disabledDate: {
				type: Function,
				required: false
			},
			minDate: { required: false },
			maxDate: { required: false },
			defaultOpenValue: { required: false },
			defaultOpen: {
				type: Boolean,
				required: false,
				default: void 0
			},
			open: {
				type: Boolean,
				required: false,
				default: void 0
			},
			popupAlign: { required: false },
			getPopupContainer: {
				type: Function,
				required: false
			},
			builtinPlacements: { required: false },
			needConfirm: {
				type: Boolean,
				required: false,
				default: void 0
			},
			changeOnBlur: {
				type: Boolean,
				required: false,
				default: void 0
			},
			preserveInvalidOnBlur: {
				type: Boolean,
				required: false,
				default: void 0
			},
			previewValue: {
				type: [Boolean, String],
				required: false,
				default: void 0
			},
			transitionName: {
				type: String,
				required: false
			},
			components: {
				type: Object,
				required: false
			},
			inputRender: {
				type: Function,
				required: false
			},
			cellRender: {
				type: Function,
				required: false
			},
			dateRender: {
				type: Function,
				required: false
			},
			monthCellRender: {
				type: Function,
				required: false
			},
			showNow: {
				type: Boolean,
				required: false,
				default: void 0
			},
			showToday: {
				type: Boolean,
				required: false,
				default: void 0
			},
			panelRender: {
				type: Function,
				required: false
			},
			renderExtraFooter: {
				type: Function,
				required: false
			},
			innerHTML: {
				type: [String, null],
				required: false
			},
			class: {
				type: [
					Boolean,
					null,
					String,
					Object,
					Array
				],
				required: false,
				default: void 0
			},
			accesskey: {
				type: [String, null],
				required: false
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
				required: false
			},
			dir: {
				type: [String, null],
				required: false
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
				required: false
			},
			enterKeyHint: {
				type: [String, null],
				required: false
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
				required: false
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
				required: false
			},
			title: {
				type: [String, null],
				required: false
			},
			translate: {
				type: [String, null],
				required: false
			},
			radiogroup: {
				type: [String, null],
				required: false
			},
			role: {
				type: [String, null],
				required: false
			},
			about: {
				type: [String, null],
				required: false
			},
			datatype: {
				type: [String, null],
				required: false
			},
			inlist: { required: false },
			property: {
				type: [String, null],
				required: false
			},
			resource: {
				type: [String, null],
				required: false
			},
			typeof: {
				type: [String, null],
				required: false
			},
			vocab: {
				type: [String, null],
				required: false
			},
			autocapitalize: {
				type: [String, null],
				required: false
			},
			autocorrect: {
				type: [String, null],
				required: false
			},
			autosave: {
				type: [String, null],
				required: false
			},
			color: {
				type: [String, null],
				required: false
			},
			itemprop: {
				type: [String, null],
				required: false
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
				required: false
			},
			itemid: {
				type: [String, null],
				required: false
			},
			itemref: {
				type: [String, null],
				required: false
			},
			results: {
				type: [
					Number,
					String,
					null
				],
				required: false
			},
			security: {
				type: [String, null],
				required: false
			},
			unselectable: {
				type: [String, null],
				required: false
			},
			inputmode: {
				type: [String, null],
				required: false
			},
			is: {
				type: [String, null],
				required: false
			},
			exportparts: {
				type: String,
				required: false
			},
			part: {
				type: String,
				required: false
			},
			"aria-activedescendant": {
				type: [String, null],
				required: false
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
				required: false
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
				required: false
			},
			"aria-colindex": {
				type: [
					Number,
					String,
					null
				],
				required: false
			},
			"aria-colspan": {
				type: [
					Number,
					String,
					null
				],
				required: false
			},
			"aria-controls": {
				type: [String, null],
				required: false
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
				required: false
			},
			"aria-details": {
				type: [String, null],
				required: false
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
				required: false
			},
			"aria-errormessage": {
				type: [String, null],
				required: false
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
				required: false
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
				required: false
			},
			"aria-label": {
				type: [String, null],
				required: false
			},
			"aria-labelledby": {
				type: [String, null],
				required: false
			},
			"aria-level": {
				type: [
					Number,
					String,
					null
				],
				required: false
			},
			"aria-live": {
				type: [String, null],
				required: false
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
				required: false
			},
			"aria-owns": {
				type: [String, null],
				required: false
			},
			"aria-placeholder": {
				type: [String, null],
				required: false
			},
			"aria-posinset": {
				type: [
					Number,
					String,
					null
				],
				required: false
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
				required: false
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
				required: false
			},
			"aria-rowcount": {
				type: [
					Number,
					String,
					null
				],
				required: false
			},
			"aria-rowindex": {
				type: [
					Number,
					String,
					null
				],
				required: false
			},
			"aria-rowspan": {
				type: [
					Number,
					String,
					null
				],
				required: false
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
				required: false
			},
			"aria-sort": {
				type: [String, null],
				required: false
			},
			"aria-valuemax": {
				type: [
					Number,
					String,
					null
				],
				required: false
			},
			"aria-valuemin": {
				type: [
					Number,
					String,
					null
				],
				required: false
			},
			"aria-valuenow": {
				type: [
					Number,
					String,
					null
				],
				required: false
			},
			"aria-valuetext": {
				type: [String, null],
				required: false
			},
			onCopy: {
				type: Function,
				required: false
			},
			onCut: {
				type: Function,
				required: false
			},
			onPaste: {
				type: Function,
				required: false
			},
			onCompositionend: {
				type: Function,
				required: false
			},
			onCompositionstart: {
				type: Function,
				required: false
			},
			onCompositionupdate: {
				type: Function,
				required: false
			},
			onDrag: {
				type: Function,
				required: false
			},
			onDragend: {
				type: Function,
				required: false
			},
			onDragenter: {
				type: Function,
				required: false
			},
			onDragexit: {
				type: Function,
				required: false
			},
			onDragleave: {
				type: Function,
				required: false
			},
			onDragover: {
				type: Function,
				required: false
			},
			onDragstart: {
				type: Function,
				required: false
			},
			onDrop: {
				type: Function,
				required: false
			},
			onFocusin: {
				type: Function,
				required: false
			},
			onFocusout: {
				type: Function,
				required: false
			},
			onBeforeinput: {
				type: Function,
				required: false
			},
			onFormdata: {
				type: Function,
				required: false
			},
			onInput: {
				type: Function,
				required: false
			},
			onReset: {
				type: Function,
				required: false
			},
			onSubmit: {
				type: Function,
				required: false
			},
			onFullscreenchange: {
				type: Function,
				required: false
			},
			onFullscreenerror: {
				type: Function,
				required: false
			},
			onLoad: {
				type: Function,
				required: false
			},
			onError: {
				type: Function,
				required: false
			},
			onKeydown: {
				type: Function,
				required: false
			},
			onKeypress: {
				type: Function,
				required: false
			},
			onKeyup: {
				type: Function,
				required: false
			},
			onDblclick: {
				type: Function,
				required: false
			},
			onMousedown: {
				type: Function,
				required: false
			},
			onMouseenter: {
				type: Function,
				required: false
			},
			onMouseleave: {
				type: Function,
				required: false
			},
			onMousemove: {
				type: Function,
				required: false
			},
			onMouseout: {
				type: Function,
				required: false
			},
			onMouseover: {
				type: Function,
				required: false
			},
			onMouseup: {
				type: Function,
				required: false
			},
			onAbort: {
				type: Function,
				required: false
			},
			onCanplay: {
				type: Function,
				required: false
			},
			onCanplaythrough: {
				type: Function,
				required: false
			},
			onDurationchange: {
				type: Function,
				required: false
			},
			onEmptied: {
				type: Function,
				required: false
			},
			onEncrypted: {
				type: Function,
				required: false
			},
			onEnded: {
				type: Function,
				required: false
			},
			onLoadeddata: {
				type: Function,
				required: false
			},
			onLoadedmetadata: {
				type: Function,
				required: false
			},
			onLoadstart: {
				type: Function,
				required: false
			},
			onPause: {
				type: Function,
				required: false
			},
			onPlay: {
				type: Function,
				required: false
			},
			onPlaying: {
				type: Function,
				required: false
			},
			onProgress: {
				type: Function,
				required: false
			},
			onRatechange: {
				type: Function,
				required: false
			},
			onSeeked: {
				type: Function,
				required: false
			},
			onSeeking: {
				type: Function,
				required: false
			},
			onStalled: {
				type: Function,
				required: false
			},
			onSuspend: {
				type: Function,
				required: false
			},
			onTimeupdate: {
				type: Function,
				required: false
			},
			onVolumechange: {
				type: Function,
				required: false
			},
			onWaiting: {
				type: Function,
				required: false
			},
			onScroll: {
				type: Function,
				required: false
			},
			onScrollend: {
				type: Function,
				required: false
			},
			onTouchcancel: {
				type: Function,
				required: false
			},
			onTouchend: {
				type: Function,
				required: false
			},
			onTouchmove: {
				type: Function,
				required: false
			},
			onTouchstart: {
				type: Function,
				required: false
			},
			onAuxclick: {
				type: Function,
				required: false
			},
			onContextmenu: {
				type: Function,
				required: false
			},
			onGotpointercapture: {
				type: Function,
				required: false
			},
			onLostpointercapture: {
				type: Function,
				required: false
			},
			onPointerdown: {
				type: Function,
				required: false
			},
			onPointermove: {
				type: Function,
				required: false
			},
			onPointerup: {
				type: Function,
				required: false
			},
			onPointercancel: {
				type: Function,
				required: false
			},
			onPointerenter: {
				type: Function,
				required: false
			},
			onPointerleave: {
				type: Function,
				required: false
			},
			onPointerover: {
				type: Function,
				required: false
			},
			onPointerout: {
				type: Function,
				required: false
			},
			onBeforetoggle: {
				type: Function,
				required: false
			},
			onToggle: {
				type: Function,
				required: false
			},
			onWheel: {
				type: Function,
				required: false
			},
			onAnimationcancel: {
				type: Function,
				required: false
			},
			onAnimationstart: {
				type: Function,
				required: false
			},
			onAnimationend: {
				type: Function,
				required: false
			},
			onAnimationiteration: {
				type: Function,
				required: false
			},
			onSecuritypolicyviolation: {
				type: Function,
				required: false
			},
			onTransitioncancel: {
				type: Function,
				required: false
			},
			onTransitionend: {
				type: Function,
				required: false
			},
			onTransitionrun: {
				type: Function,
				required: false
			},
			onTransitionstart: {
				type: Function,
				required: false
			},
			prevIcon: { required: false },
			nextIcon: { required: false },
			superPrevIcon: { required: false },
			superNextIcon: { required: false },
			showHour: {
				type: Boolean,
				required: false,
				default: void 0
			},
			showMinute: {
				type: Boolean,
				required: false,
				default: void 0
			},
			showSecond: {
				type: Boolean,
				required: false,
				default: void 0
			},
			showMillisecond: {
				type: Boolean,
				required: false,
				default: void 0
			},
			use12Hours: {
				type: Boolean,
				required: false,
				default: void 0
			},
			hourStep: { required: false },
			minuteStep: { required: false },
			secondStep: { required: false },
			millisecondStep: { required: false },
			hideDisabledOptions: {
				type: Boolean,
				required: false,
				default: void 0
			},
			disabledHours: {
				type: Function,
				required: false
			},
			disabledMinutes: {
				type: Function,
				required: false
			},
			disabledSeconds: {
				type: Function,
				required: false
			},
			changeOnScroll: {
				type: Boolean,
				required: false,
				default: void 0
			},
			disabledTime: {
				type: Function,
				required: false
			}
		},
		emits: [
			"change",
			"update:value",
			"calendarChange",
			"panelChange",
			"openChange",
			"ok",
			"focus",
			"blur",
			"keydown"
		],
		name: "ARangePicker",
		inheritAttrs: false
	});
}
var generateRangePicker_default = generateRangePicker;

//#endregion
export { generateRangePicker_default as default };