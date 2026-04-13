import { useConfig } from "../config-provider/context.js";
import { genCssVar } from "../theme/util/genStyleUtils.js";
import { useColStyle } from "./style/index.js";
import { responsiveArrayReversed } from "../_util/responsiveObserver.js";
import { useRowContext } from "./RowContext.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";

//#region src/grid/col.tsx
function isNumber(value) {
	return typeof value === "number" && !Number.isNaN(value);
}
function parseFlex(flex) {
	if (isNumber(flex)) return `${flex} ${flex} auto`;
	if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) return `0 0 ${flex}`;
	return flex;
}
const Col = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const configCtx = useConfig();
	const { gutter, wrap } = useRowContext();
	const prefixCls = computed(() => configCtx.value?.getPrefixCls("col", props.prefixCls));
	const [varName] = genCssVar(computed(() => configCtx.value?.getPrefixCls()).value, "col");
	const [hashId, cssVarCls] = useColStyle(prefixCls);
	return () => {
		const { span, order, offset, push, pull, flex } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const sizeStyle = {};
		let sizeClassObj = {};
		responsiveArrayReversed.forEach((size) => {
			let sizeProps = {};
			const propSize = props[size];
			if (typeof propSize === "number") sizeProps.span = propSize;
			else if (typeof propSize === "object") sizeProps = propSize || {};
			sizeClassObj = {
				...sizeClassObj,
				[`${prefixCls.value}-${size}-${sizeProps.span}`]: sizeProps.span !== void 0,
				[`${prefixCls.value}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
				[`${prefixCls.value}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
				[`${prefixCls.value}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
				[`${prefixCls.value}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
				[`${prefixCls.value}-rtl`]: configCtx.value.direction === "rtl"
			};
			if (sizeProps.flex) {
				sizeClassObj[`${prefixCls.value}-${size}-flex`] = true;
				sizeStyle[varName(`${size}-flex`)] = parseFlex(sizeProps.flex);
			}
		});
		const classes = classNames(prefixCls.value, {
			[`${prefixCls.value}-${span}`]: span !== void 0,
			[`${prefixCls.value}-order-${order}`]: order,
			[`${prefixCls.value}-offset-${offset}`]: offset,
			[`${prefixCls.value}-push-${push}`]: push,
			[`${prefixCls.value}-pull-${pull}`]: pull
		}, sizeClassObj, hashId.value, cssVarCls.value, className);
		const mergedStyle = {};
		if (gutter?.value && gutter.value[0] > 0) {
			const horizontalGutter = gutter.value[0] / 2;
			mergedStyle.paddingLeft = `${horizontalGutter}px`;
			mergedStyle.paddingRight = `${horizontalGutter}px`;
		}
		if (flex) {
			mergedStyle.flex = parseFlex(flex);
			if (wrap?.value === false && !mergedStyle.minWidth) mergedStyle.minWidth = 0;
		}
		return createVNode("div", mergeProps(restAttrs, {
			"class": classes,
			"style": [
				mergedStyle,
				style,
				sizeStyle
			]
		}), [slots.default?.()]);
	};
}, {
	props: {
		flex: {
			type: [
				Number,
				String,
				Object
			],
			required: false
		},
		span: {
			type: [Number, String],
			required: false
		},
		order: {
			type: [Number, String],
			required: false
		},
		offset: {
			type: [Number, String],
			required: false
		},
		push: {
			type: [Number, String],
			required: false
		},
		pull: {
			type: [Number, String],
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		xs: {
			type: [
				Number,
				String,
				Object
			],
			required: false
		},
		sm: {
			type: [
				Number,
				String,
				Object
			],
			required: false
		},
		md: {
			type: [
				Number,
				String,
				Object
			],
			required: false
		},
		lg: {
			type: [
				Number,
				String,
				Object
			],
			required: false
		},
		xl: {
			type: [
				Number,
				String,
				Object
			],
			required: false
		},
		xxl: {
			type: [
				Number,
				String,
				Object
			],
			required: false
		},
		xxxl: {
			type: [
				Number,
				String,
				Object
			],
			required: false
		}
	},
	name: "ACol",
	inheritAttrs: false
});
Col.install = (app) => {
	app.component(Col.name, Col);
};
var col_default = Col;

//#endregion
export { col_default as default };