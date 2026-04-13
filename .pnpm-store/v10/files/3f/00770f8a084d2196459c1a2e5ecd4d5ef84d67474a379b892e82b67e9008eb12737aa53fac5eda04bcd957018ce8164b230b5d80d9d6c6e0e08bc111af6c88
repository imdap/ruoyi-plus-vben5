import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import useToken from "../theme/useToken.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import useLocale_default from "../locale/useLocale.js";
import QrcodeStatus_default from "./QrcodeStatus.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { omit } from "es-toolkit";
import pickAttrs from "@v-c/util/dist/pickAttrs";
import { QRCodeCanvas, QRCodeSVG } from "@v-c/qrcode";

//#region src/qrcode/index.tsx
const QRCode = /* @__PURE__ */ defineComponent((props, { emit, attrs, slots }) => {
	const { prefixCls, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("qrcode", props);
	const { styles, classes } = toPropsRefs(props, "styles", "classes");
	const [hashId, cssVarCls] = style_default(prefixCls);
	const [locale] = useLocale_default("QRCode");
	const [, token] = useToken();
	const color = computed(() => props.color ?? token.value.colorText);
	const imageSettings = computed(() => {
		const { icon, iconSize } = props;
		return {
			src: icon,
			x: void 0,
			y: void 0,
			height: typeof iconSize === "number" ? iconSize : iconSize?.height ?? 40,
			width: typeof iconSize === "number" ? iconSize : iconSize?.width ?? 40,
			excavate: true,
			crossOrigin: "anonymous"
		};
	});
	const mergedProps = computed(() => {
		return props;
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	return () => {
		const { type, value, size, errorLevel, bgColor, icon, boostLevel, bordered, rootClass, status, marginSize } = props;
		const statusRender = slots?.statusRender ?? props?.statusRender;
		const a11yProps = pickAttrs(attrs, true);
		const restProps = omit(attrs, Object.keys(a11yProps));
		const style = attrs.style;
		const cls = attrs.class;
		const qrCodeProps = {
			value,
			size,
			level: errorLevel,
			bgColor,
			fgColor: color.value,
			style: {
				width: style?.width,
				height: style?.height
			},
			imageSettings: icon ? imageSettings.value : void 0,
			boostLevel,
			marginSize,
			...a11yProps
		};
		if (isDev) {
			const warning = devUseWarning("QRCode");
			warning(!!value, "usage", "need to receive `value` props");
			warning(!(icon && errorLevel === "L"), "usage", "ErrorLevel `L` is not recommended to be used with `icon`, for scanning result would be affected by low level.");
		}
		if (!value) return null;
		const mergedCls = classNames(prefixCls.value, cls, rootClass, hashId.value, cssVarCls.value, contextClassName.value, mergedClassNames.value.root, { [`${prefixCls.value}-borderless`]: !bordered });
		let _width = style?.width ?? size;
		let _height = style?.height ?? size;
		if (typeof _width === "number") _width = `${_width}px`;
		if (typeof _height === "number") _height = `${_height}px`;
		const rootStyle = {
			backgroundColor: bgColor,
			...mergedStyles.value?.root,
			...contextStyle.value,
			...style,
			width: _width,
			height: _height
		};
		return createVNode("div", mergeProps(restProps, {
			"class": mergedCls,
			"style": rootStyle
		}), [status !== "active" && createVNode("div", {
			"class": [`${prefixCls.value}-cover`, mergedClassNames.value.cover],
			"style": mergedStyles.value.cover
		}, [createVNode(QrcodeStatus_default, {
			"prefixCls": prefixCls.value,
			"locale": locale.value,
			"status": status,
			"onRefresh": () => {
				emit("refresh");
			},
			"statusRender": statusRender
		}, null)]), type === "canvas" ? createVNode(QRCodeCanvas, qrCodeProps, null) : createVNode(QRCodeSVG, qrCodeProps, null)]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		type: {
			type: String,
			required: false
		},
		icon: {
			type: String,
			required: false
		},
		iconSize: {
			type: [Number, Object],
			required: false
		},
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		errorLevel: {
			type: String,
			required: false
		},
		status: {
			type: String,
			required: false
		},
		statusRender: {
			type: Function,
			required: false
		},
		color: { required: false },
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		value: {
			type: [String, Array],
			required: true
		},
		boostLevel: {
			type: Boolean,
			required: false,
			default: void 0
		},
		size: {
			type: Number,
			required: false
		},
		level: {
			type: String,
			required: false
		},
		bgColor: {
			type: String,
			required: false
		},
		fgColor: {
			type: String,
			required: false
		},
		includeMargin: {
			type: Boolean,
			required: false,
			default: void 0
		},
		marginSize: {
			type: Number,
			required: false
		},
		imageSettings: {
			type: Object,
			required: false
		},
		title: {
			type: String,
			required: false
		},
		minVersion: {
			type: Number,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, {
		type: "canvas",
		icon: "",
		size: 160,
		bordered: true,
		errorLevel: "M",
		status: "active",
		bgColor: "transparent"
	}),
	emits: ["refresh"],
	name: "AQrcode",
	inheritAttrs: false
});
QRCode.install = (app) => {
	app.component(QRCode.name, QRCode);
};
var qrcode_default = QRCode;

//#endregion
export { qrcode_default as default };