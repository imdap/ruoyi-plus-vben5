import { useConfig } from "../config-provider/context.js";
import { isPresetSize } from "../_util/gapSize.js";
import utils_default from "./utils.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeDefaults } from "vue";
import { classNames } from "@v-c/util";
import { omit } from "es-toolkit";

//#region src/flex/index.tsx
const Flex = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const configCtx = useConfig();
	const prefixCls = computed(() => configCtx.value.getPrefixCls("flex", props.prefixCls));
	const [hashId, cssVarCls] = style_default(prefixCls);
	return () => {
		const { rootClass, flex, gap, vertical, component = "div" } = props;
		const ctxFlex = configCtx.value?.flex;
		const mergedVertical = vertical ?? ctxFlex?.vertical;
		const ctxDirection = configCtx.value?.direction;
		const mergedCls = classNames(rootClass, ctxFlex?.class, prefixCls.value, hashId.value, cssVarCls.value, utils_default(prefixCls.value, {
			...props,
			vertical: mergedVertical
		}), {
			[`${prefixCls.value}-rtl`]: ctxDirection === "rtl",
			[`${prefixCls.value}-gap-${gap}`]: isPresetSize(gap),
			[`${prefixCls.value}-vertical`]: mergedVertical
		});
		const mergedStyle = {};
		if (flex) mergedStyle.flex = flex;
		if (gap && !isPresetSize(gap)) mergedStyle.gap = /\d/.test(`${gap}`) ? `${gap}px` : gap;
		return createVNode(component, {
			class: [mergedCls, attrs.class],
			style: [mergedStyle, attrs.style],
			...omit(attrs, ["class", "style"])
		}, { default: slots.default });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		vertical: {
			type: Boolean,
			required: false,
			default: void 0
		},
		wrap: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		},
		justify: { required: false },
		align: { required: false },
		flex: { required: false },
		gap: { required: false },
		component: { required: false },
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, { vertical: void 0 }),
	inheritAttrs: false,
	name: "AFlex"
});
Flex.install = (app) => {
	app.component(Flex.name, Flex);
};
var flex_default = Flex;

//#endregion
export { flex_default as default };