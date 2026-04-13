import { computed, defineComponent, inject, provide, shallowRef } from "vue";

//#region src/color-picker/context.tsx
const PanelPickerContextKey = Symbol("PanelPickerContext");
const PanelPresetsContextKey = Symbol("PanelPresetsContext");
function usePanelPickerProvider(value) {
	provide(PanelPickerContextKey, value);
}
function usePanelPickerContext() {
	return inject(PanelPickerContextKey, shallowRef({}));
}
const PanelPickerContextProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	usePanelPickerProvider(computed(() => props));
	return () => slots.default?.();
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		allowClear: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabledAlpha: {
			type: Boolean,
			required: false,
			default: void 0
		},
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
			required: false
		},
		onChangeComplete: {
			type: Function,
			required: false
		},
		format: { required: false },
		onFormatChange: {
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
		disabledFormat: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	inheritAttrs: false
});
function usePanelPresetsProvider(value) {
	provide(PanelPresetsContextKey, value);
}
function usePanelPresetsContext() {
	return inject(PanelPresetsContextKey, shallowRef({}));
}
const PanelPresetsContextProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	usePanelPresetsProvider(computed(() => props));
	return () => slots.default?.();
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		presets: {
			type: Array,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		value: {
			type: Object,
			required: true
		},
		onChange: {
			type: Function,
			required: false
		}
	},
	inheritAttrs: false
});

//#endregion
export { PanelPickerContextProvider, PanelPresetsContextProvider, usePanelPickerContext, usePanelPickerProvider, usePanelPresetsContext, usePanelPresetsProvider };