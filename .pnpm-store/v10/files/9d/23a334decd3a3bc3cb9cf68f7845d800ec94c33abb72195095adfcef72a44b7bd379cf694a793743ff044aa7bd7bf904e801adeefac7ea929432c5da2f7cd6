import { getColorAlpha } from "../util.js";
import useLocale_default from "../../locale/useLocale.js";
import ColorClear_default from "./ColorClear.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { ColorBlock } from "@v-c/color-picker";

//#region src/color-picker/components/ColorTrigger.tsx
var ColorTrigger_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const [locale] = useLocale_default("ColorPicker");
	const colorTriggerPrefixCls = computed(() => `${props.prefixCls}-trigger`);
	const colorTextPrefixCls = computed(() => `${colorTriggerPrefixCls.value}-text`);
	const colorTextCellPrefixCls = computed(() => `${colorTextPrefixCls.value}-cell`);
	const desc = computed(() => {
		const { color, showText, format, activeIndex } = props;
		if (!showText) return "";
		if (typeof showText === "function") return showText({ color });
		if (color.cleared) return locale?.value?.transparent;
		if (color.isGradient()) return color.getColors().map((c, index) => {
			const inactive = activeIndex !== -1 && activeIndex !== index;
			return createVNode("span", {
				"key": index,
				"class": clsx(colorTextCellPrefixCls.value, inactive && `${colorTextCellPrefixCls.value}-inactive`)
			}, [`${c.color.toRgbString()} ${c.percent}%`]);
		});
		const hexString = color.toHexString().toUpperCase();
		const alpha = getColorAlpha(color);
		switch (format) {
			case "rgb": return color.toRgbString();
			case "hsb": return color.toHsbString();
			default: return alpha < 100 ? `${hexString.slice(0, 7)},${alpha}%` : hexString;
		}
	});
	const containerNode = computed(() => {
		const { color, prefixCls, classes, styles } = props;
		return color?.cleared ? createVNode(ColorClear_default, {
			"prefixCls": prefixCls,
			"class": classes.body,
			"style": styles.body
		}, null) : createVNode(ColorBlock, {
			"innerClassName": classes.content,
			"innerStyle": styles.content,
			"class": classes.body,
			"style": styles.body,
			"prefixCls": prefixCls,
			"color": color.toCssString()
		}, null);
	});
	return () => {
		const { open, disabled, style, className, classes, styles } = props;
		return createVNode("div", mergeProps(attrs, {
			"class": clsx(colorTriggerPrefixCls.value, className, classes.root, {
				[`${colorTriggerPrefixCls.value}-active`]: open,
				[`${colorTriggerPrefixCls.value}-disabled`]: disabled
			}),
			"style": [styles.root, style]
		}), [containerNode.value, props.showText && createVNode("div", {
			"class": [colorTextPrefixCls.value, classes.description],
			"style": classes.description
		}, [desc.value])]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		format: { required: false },
		color: {
			type: Object,
			required: true
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showText: {
			type: [Boolean, Function],
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		activeIndex: {
			type: Number,
			required: true
		},
		classes: {
			type: Object,
			required: true
		},
		styles: {
			type: Object,
			required: true
		}
	},
	name: "AColorTrigger",
	inheritAttrs: false
});

//#endregion
export { ColorTrigger_default as default };