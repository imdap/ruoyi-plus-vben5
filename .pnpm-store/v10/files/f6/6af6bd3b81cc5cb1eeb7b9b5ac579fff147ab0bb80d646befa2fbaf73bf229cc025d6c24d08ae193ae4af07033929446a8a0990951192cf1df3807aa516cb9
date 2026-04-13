import ColorPresets_default from "./ColorPresets.js";
import { usePanelPresetsContext } from "../context.js";
import { createVNode, defineComponent } from "vue";

//#region src/color-picker/components/PanelPresets.tsx
var PanelPresets_default = /* @__PURE__ */ defineComponent(() => {
	const presetsContext = usePanelPresetsContext();
	return () => {
		const { prefixCls, value, presets, onChange } = presetsContext.value;
		return Array.isArray(presets) ? createVNode(ColorPresets_default, {
			"value": value,
			"presets": presets,
			"prefixCls": prefixCls,
			"onChange": onChange
		}, null) : null;
	};
}, {
	name: "ColorPanelPresets",
	inheritAttrs: false
});

//#endregion
export { PanelPresets_default as default };