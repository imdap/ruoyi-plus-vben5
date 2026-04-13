import { useConfig } from "../config-provider/context.js";
import { useRowStyle } from "./style/index.js";
import { responsiveArray } from "../_util/responsiveObserver.js";
import { useBreakpoint } from "./hooks/useBreakpoint.js";
import { useRowContextProvider } from "./RowContext.js";
import useGutter from "./hooks/useGutter.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { classNames } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";

//#region src/grid/row.tsx
function useMergedPropByScreen(oriProp, screen) {
	const prop = shallowRef(typeof oriProp.value === "string" ? oriProp.value : "");
	const calcMergedAlignOrJustify = () => {
		if (typeof oriProp.value === "string") prop.value = oriProp.value;
		if (typeof oriProp.value !== "object") return;
		for (let i = 0; i < responsiveArray.length; i++) {
			const breakpoint = responsiveArray[i];
			if (!screen.value || !screen.value[breakpoint]) continue;
			const curVal = oriProp.value[breakpoint];
			if (curVal !== void 0) {
				prop.value = curVal;
				return;
			}
		}
	};
	watch([() => JSON.stringify(oriProp.value), screen], () => {
		calcMergedAlignOrJustify();
	}, { immediate: true });
	return prop;
}
const Row = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const configCtx = useConfig();
	const screens = useBreakpoint(true, null);
	const mergedAlign = useMergedPropByScreen(computed(() => props.align), screens);
	const mergedJustify = useMergedPropByScreen(computed(() => props.justify), screens);
	const prefixCls = computed(() => configCtx.value?.getPrefixCls("row", props.prefixCls));
	const [hashId, cssVarCls] = useRowStyle(prefixCls);
	const gutters = useGutter(computed(() => props.gutter), screens);
	useRowContextProvider({
		gutter: gutters,
		wrap: computed(() => props.wrap)
	});
	return () => {
		const { wrap } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const classes = classNames(prefixCls.value, {
			[`${prefixCls.value}-no-wrap`]: wrap === false,
			[`${prefixCls.value}-${mergedJustify.value}`]: mergedJustify.value,
			[`${prefixCls.value}-${mergedAlign.value}`]: mergedAlign.value,
			[`${prefixCls.value}-rtl`]: configCtx.value.direction === "rtl"
		}, hashId.value, cssVarCls.value, className);
		const rowStyle = {};
		const horizontalGutter = gutters.value[0] != null && gutters.value[0] > 0 ? gutters.value[0] / -2 : void 0;
		if (horizontalGutter) {
			rowStyle.marginLeft = `${horizontalGutter}px`;
			rowStyle.marginRight = `${horizontalGutter}px`;
		}
		const [_, gutterV] = gutters.value;
		if (gutterV) rowStyle.rowGap = `${gutterV}px`;
		return createVNode("div", mergeProps(restAttrs, {
			"class": classes,
			"style": [rowStyle, style]
		}), [slots?.default?.()]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		gutter: {
			type: [
				Number,
				null,
				Object,
				Array
			],
			required: false
		},
		align: {
			type: [String, Object],
			required: false
		},
		justify: {
			type: [String, Object],
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		wrap: {
			type: Boolean,
			required: false,
			default: void 0
		}
	}, { gutter: 0 }),
	name: "ARow",
	inheritAttrs: false
});
Row.install = (app) => {
	app.component(Row.name, Row);
};
var row_default = Row;

//#endregion
export { row_default as default };