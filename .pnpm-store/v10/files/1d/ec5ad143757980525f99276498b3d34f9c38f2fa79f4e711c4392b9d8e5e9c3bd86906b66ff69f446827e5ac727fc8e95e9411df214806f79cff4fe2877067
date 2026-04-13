import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { useCompactItemContext } from "../space/Compact.js";
import { ContextIsolator } from "../_util/ContextIsolator.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import useMergedArrow_default from "../tooltip/hooks/useMergedArrow.js";
import { AggregationColor } from "./color.js";
import { formatColorValue, genAlphaColor, generateColor, getColorAlpha } from "./util.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import PurePanel_default from "../_util/PurePanel.js";
import { getStatusClassNames } from "../_util/statusUtils.js";
import { useFormItemInputContext } from "../form/context.js";
import popover_default from "../popover/index.js";
import ColorPickerPanel_default from "./ColorPickerPanel.js";
import ColorTrigger_default from "./components/ColorTrigger.js";
import useModeColor from "./hooks/useModeColor.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/color-picker/ColorPicker.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ColorPicker = /* @__PURE__ */ defineComponent((props, { slots, expose, emit, attrs }) => {
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, arrow: contextArrow } = useComponentBaseConfig("colorPicker", props, ["arrow"], "color-picker");
	const { size: customizeSize, classes, styles, value, mode, format, valueFormat, open, presets, disabledAlpha, disabledFormat, arrow } = toPropsRefs$1(props, "size", "classes", "styles", "value", "mode", "format", "valueFormat", "open", "presets", "disabledAlpha", "disabledFormat", "arrow");
	const contextDisabled = useDisabledContext();
	const mergedDisabled = computed(() => props.disabled ?? contextDisabled.value);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const mergedSize = useSize((ctx) => customizeSize.value ?? compactSize.value ?? ctx);
	const mergedArrow = useMergedArrow_default(arrow, contextArrow);
	const mergedProps = computed(() => {
		return {
			...props,
			trigger: props.trigger ?? "click",
			allowClear: props.allowClear ?? false,
			autoAdjustOverflow: props.autoAdjustOverflow ?? true,
			disabledAlpha: props.disabledAlpha ?? false,
			arrow: mergedArrow.value,
			placement: props.placement ?? "bottomLeft",
			disabled: mergedDisabled.value,
			size: mergedSize.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps), computed(() => ({ popup: { _default: "root" } })));
	const internalPopupOpen = shallowRef(open.value ?? false);
	watch(open, (val) => {
		internalPopupOpen.value = val ?? false;
	});
	const popupOpen = computed(() => !mergedDisabled.value && internalPopupOpen.value);
	const formatValue = shallowRef(format.value ?? props.defaultFormat);
	watch(format, (val) => {
		if (val !== void 0) formatValue.value = val;
	});
	const triggerFormatChange = (newFormat) => {
		const prev = formatValue.value;
		formatValue.value = newFormat;
		if (prev !== newFormat) {
			emit("formatChange", newFormat);
			emit("update:format", newFormat);
		}
	};
	const triggerOpenChange = (visible) => {
		if (open.value !== void 0) {
			emit("openChange", visible);
			emit("update:open", visible);
			return;
		}
		if (!visible || !mergedDisabled.value) {
			internalPopupOpen.value = visible;
			emit("openChange", visible);
			emit("update:open", visible);
		}
	};
	const [mergedColor, setColor, modeState, setModeState, modeOptions] = useModeColor(value, mode, props?.defaultValue);
	const isAlphaColor = computed(() => getColorAlpha(mergedColor.value) < 100);
	const cachedGradientColor = shallowRef();
	const onInternalChangeComplete = (color) => {
		let changeColor = generateColor(color);
		if (props?.disabledAlpha && isAlphaColor.value) changeColor = genAlphaColor(color);
		emit("changeComplete", changeColor);
	};
	const onInternalChange = (data, changeFromPickerDrag) => {
		let color = generateColor(data);
		if (props?.disabledAlpha && isAlphaColor.value) color = genAlphaColor(color);
		setColor(color);
		cachedGradientColor.value = void 0;
		emit("change", color, color.toCssString());
		emit("update:value", formatColorValue(color, valueFormat.value));
		if (!changeFromPickerDrag) onInternalChangeComplete(color);
	};
	const activeIndex = shallowRef(0);
	const gradientDragging = shallowRef(false);
	const onInternalModeChange = (newMode) => {
		const _mergedColor = mergedColor.value;
		setModeState(newMode);
		if (newMode === "single" && mergedColor.value?.isGradient()) {
			activeIndex.value = 0;
			onInternalChange(new AggregationColor(mergedColor.value.getColors()[0].color));
			cachedGradientColor.value = _mergedColor;
		} else if (newMode === "gradient" && !mergedColor.value?.isGradient()) {
			const baseColor = isAlphaColor.value ? genAlphaColor(mergedColor.value) : mergedColor.value;
			onInternalChange(new AggregationColor(cachedGradientColor.value || [{
				percent: 0,
				color: baseColor
			}, {
				percent: 100,
				color: baseColor
			}]));
		}
	};
	const formItemInputContext = useFormItemInputContext();
	const contextStatus = computed(() => formItemInputContext.value?.status);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const handleClear = () => {
		const cleared = new AggregationColor("");
		setColor(cleared);
		emit("clear");
		emit("change", cleared, cleared.toCssString());
		emit("update:value", valueFormat.value ? formatColorValue(cleared, valueFormat.value) : cleared.toCssString());
	};
	expose({
		focus: () => {},
		blur: () => {}
	});
	return () => {
		const { rootClass, trigger, placement, getPopupContainer, autoAdjustOverflow, destroyOnHidden } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass$1(attrs);
		const children = filterEmpty(slots?.default?.() ?? []);
		const showText = slots?.showText ?? props?.showText;
		const panelRender = slots?.panelRender ?? props?.panelRender;
		const rtlCls = { [`${prefixCls.value}-rtl`]: direction.value === "rtl" };
		const mergedRootCls = clsx(rootClass, cssVarCls.value, rootCls.value, rtlCls);
		const mergedCls = clsx(getStatusClassNames(prefixCls.value, contextStatus.value), {
			[`${prefixCls.value}-sm`]: mergedSize.value === "small",
			[`${prefixCls.value}-lg`]: mergedSize.value === "large"
		}, compactItemClassnames.value, contextClassName.value, mergedRootCls, className, hashId.value);
		const mergedPopupCls = clsx(prefixCls.value, mergedRootCls, mergedClassNames.value?.popup?.root);
		const popoverProps = {
			open: popupOpen.value,
			trigger,
			placement,
			arrow: mergedArrow.value,
			rootClass,
			getPopupContainer,
			autoAdjustOverflow,
			destroyOnHidden
		};
		const mergedStyle = {
			...contextStyle.value,
			...style
		};
		const mergedShowText = showText ? typeof showText === "function" ? (color) => showText({ color }) : showText : void 0;
		const panelNode = createVNode(ContextIsolator, { "form": true }, { default: () => [createVNode(ColorPickerPanel_default, mergeProps(restAttrs, {
			"prefixCls": prefixCls.value,
			"presets": presets.value,
			"panelRender": panelRender,
			"value": mergedColor.value,
			"allowClear": props.allowClear,
			"disabled": mergedDisabled.value,
			"disabledAlpha": disabledAlpha.value,
			"disabledFormat": disabledFormat.value,
			"mode": modeState.value,
			"onModeChange": onInternalModeChange,
			"modeOptions": modeOptions.value,
			"onChange": onInternalChange,
			"onChangeComplete": onInternalChangeComplete,
			"onClear": handleClear,
			"activeIndex": activeIndex.value,
			"onActive": (val) => activeIndex.value = val,
			"gradientDragging": gradientDragging.value,
			"onGradientDragging": (val) => gradientDragging.value = val,
			"format": formatValue.value
		}, { onFormatChange: triggerFormatChange }, {
			"classes": mergedClassNames.value,
			"styles": mergedStyles.value
		}), null)] });
		const triggerNode = children.length ? children : createVNode(ColorTrigger_default, {
			"activeIndex": popupOpen.value ? activeIndex.value : -1,
			"open": popupOpen.value,
			"className": mergedCls,
			"style": mergedStyle,
			"prefixCls": prefixCls.value,
			"disabled": mergedDisabled.value,
			"showText": mergedShowText,
			"format": formatValue.value,
			"color": mergedColor.value,
			"classes": mergedClassNames.value,
			"styles": mergedStyles.value
		}, null);
		return createVNode(popover_default, mergeProps({
			"classes": { root: mergedPopupCls },
			"styles": {
				root: mergedStyles.value?.popup?.root,
				container: styles.value?.popupOverlayInner
			},
			"onOpenChange": triggerOpenChange,
			"content": panelNode
		}, popoverProps), _isSlot(triggerNode) ? triggerNode : { default: () => [triggerNode] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		class: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mode: {
			type: [String, Array],
			required: false
		},
		value: {
			type: [
				Object,
				String,
				null,
				Array
			],
			required: false
		},
		defaultValue: {
			type: [
				Object,
				String,
				null,
				Array
			],
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false
		},
		trigger: {
			type: String,
			required: false
		},
		format: { required: false },
		defaultFormat: { required: false },
		valueFormat: {
			type: Function,
			required: false,
			skipCheck: true
		},
		allowClear: {
			type: Boolean,
			required: false,
			default: void 0
		},
		presets: {
			type: Array,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		panelRender: {
			type: Function,
			required: false
		},
		showText: {
			type: [Boolean, Function],
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
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
		rootClass: {
			type: String,
			required: false
		},
		disabledAlpha: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabledFormat: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: Function,
			required: false
		},
		autoAdjustOverflow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		}
	}, {
		trigger: "click",
		placement: "bottomLeft",
		autoAdjustOverflow: true,
		disabledAlpha: false,
		allowClear: false,
		destroyOnHidden: false
	}),
	emits: [
		"change",
		"clear",
		"changeComplete",
		"openChange",
		"update:open",
		"formatChange",
		"update:value",
		"update:format"
	],
	name: "AColorPicker",
	inheritAttrs: false
});
ColorPicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default(ColorPicker, void 0, (props) => ({
	...props,
	placement: "bottom",
	autoAdjustOverflow: false
}), "color-picker", (prefixCls) => prefixCls);
ColorPicker.install = (app) => {
	app.component(ColorPicker.name, ColorPicker);
};
var ColorPicker_default = ColorPicker;

//#endregion
export { ColorPicker_default as default };