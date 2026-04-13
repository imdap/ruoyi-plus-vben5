import input_number_default from "../../input-number/index.js";
import { computed, createVNode, defineComponent, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";

//#region src/color-picker/components/ColorSteppers.tsx
var ColorSteppers_default = /* @__PURE__ */ defineComponent((props) => {
	const internalValue = shallowRef(0);
	watch(() => props.value, (val) => {
		if (typeof val === "number") internalValue.value = val;
	});
	const stepValue = computed(() => !Number.isNaN(props.value) ? props.value : internalValue.value);
	return () => {
		const { prefixCls, className, min, max, formatter, onChange } = props;
		return createVNode(input_number_default, {
			"class": clsx(`${prefixCls}-steppers`, className),
			"min": min ?? 0,
			"max": max ?? 100,
			"value": stepValue.value,
			"formatter": formatter,
			"size": "small",
			"onChange": (step) => {
				internalValue.value = step ?? 0;
				onChange?.(step ?? null);
			}
		}, null);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: false
		},
		min: {
			type: Number,
			required: false
		},
		max: {
			type: Number,
			required: false
		},
		onChange: {
			type: Function,
			required: false
		},
		className: {
			type: String,
			required: false
		},
		formatter: {
			type: Function,
			required: false
		}
	},
	name: "ColorSteppers",
	inheritAttrs: false
});

//#endregion
export { ColorSteppers_default as default };