import divider_default from "../divider/index.js";
import { usePanelPickerProvider, usePanelPresetsProvider } from "./context.js";
import PanelPicker_default from "./components/PanelPicker/index.js";
import PanelPresets_default from "./components/PanelPresets.js";
import { computed, createVNode, defineComponent } from "vue";

//#region src/color-picker/ColorPickerPanel.tsx
var ColorPickerPanel_default = /* @__PURE__ */ defineComponent((props) => {
	const colorPickerPanelPrefix = `${props.prefixCls}-inner`;
	const innerPanel = () => createVNode("div", { "class": `${colorPickerPanelPrefix}-content` }, [
		createVNode(PanelPicker_default, null, null),
		Array.isArray(props.presets) ? createVNode(divider_default, null, null) : null,
		createVNode(PanelPresets_default, null, null)
	]);
	usePanelPresetsProvider(computed(() => props));
	usePanelPickerProvider(computed(() => props));
	return () => {
		return createVNode("div", { "class": colorPickerPanelPrefix }, [typeof props.panelRender === "function" ? props.panelRender({
			panel: innerPanel(),
			extra: { components: {
				Picker: PanelPicker_default,
				Presets: PanelPresets_default
			} }
		}) : innerPanel()]);
	};
}, {
	props: {
		mode: {
			type: String,
			required: true
		},
		onModeChange: {
			type: Function,
			required: true
		},
		modeOptions: {
			type: Array,
			required: true
		},
		value: {
			type: Object,
			required: true
		},
		onChange: {
			type: Function,
			required: true
		},
		onChangeComplete: {
			type: Function,
			required: false
		},
		activeIndex: {
			type: Number,
			required: true
		},
		onActive: {
			type: Function,
			required: true
		},
		gradientDragging: {
			type: Boolean,
			required: true
		},
		onGradientDragging: {
			type: Function,
			required: true
		},
		onClear: {
			type: Function,
			required: false
		},
		panelRender: {
			type: Function,
			required: false
		},
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
	},
	name: "AColorPickerPanel",
	inheritAttrs: false
});

//#endregion
export { ColorPickerPanel_default as default };