import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { ContextIsolator } from "../_util/ContextIsolator.js";
import { useMergedMask } from "../_util/hooks/useMergedMask.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { ZIndexProvider } from "../_util/zindexContext.js";
import { useZIndex } from "../_util/hooks/useZIndex.js";
import { toPropsRefs } from "../_util/tools.js";
import useFocusable from "./useFocusable.js";
import { usePanelRef } from "../watermark/context.js";
import DrawerPanel_default from "./DrawerPanel.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, useId } from "vue";
import { clsx } from "@v-c/util";
import { getTransitionName } from "@v-c/util/dist/utils/transition";
import VcDrawer from "@v-c/drawer";

//#region src/drawer/index.tsx
const defaultPushState = { distance: 180 };
const DEFAULT_SIZE = 378;
const defaults = {
	defaultSize: DEFAULT_SIZE,
	push: defaultPushState,
	panelRef: null
};
const Drawer = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs }) => {
	const id = useId();
	const { getPopupContainer, direction, prefixCls, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, mask: contextMask } = useComponentBaseConfig("drawer", props, ["mask"]);
	const { zIndex: customZIndex, mask: drawerMask, classes, styles, focusable, maskClosable } = toPropsRefs(props, "zIndex", "mask", "classes", "styles", "focusable", "maskClosable");
	const [hashId, cssVarCls] = style_default(prefixCls);
	if (isDev) {
		const warning = devUseWarning("Drawer");
		[
			["headerStyle", "styles.header"],
			["bodyStyle", "styles.body"],
			["footerStyle", "styles.footer"],
			["contentWrapperStyle", "styles.wrapper"],
			["maskStyle", "styles.mask"],
			["drawerStyle", "styles.section"],
			["destroyInactivePanel", "destroyOnHidden"],
			["width", "size"],
			["height", "size"]
		].forEach(([deprecatedName, newName]) => {
			warning.deprecated(!(props[deprecatedName] !== void 0), deprecatedName, newName);
		});
	}
	const drawerSize = computed(() => {
		const { size, placement, width, height } = props;
		if (typeof size === "number") return size;
		if (size === "large") return 736;
		if (size === "default") return DEFAULT_SIZE;
		if (typeof size === "string") {
			if (/^\d+(\.\d+)?$/.test(size)) return Number(size);
			return size;
		}
		if (!placement || placement === "left" || placement === "right") return width;
		return height;
	});
	const innerPanelRef = usePanelRef();
	const panelRef = shallowRef();
	const [zIndex, contextZIndex] = useZIndex("Drawer", customZIndex);
	const [mergedMask, maskBlurClassName, mergedMaskClosable] = useMergedMask(drawerMask, contextMask, prefixCls, maskClosable);
	const mergedFocusable = useFocusable(focusable, computed(() => {
		return props?.getContainer !== false && mergedMask.value;
	}));
	const mergedProps = computed(() => {
		return {
			...props,
			zIndex: zIndex.value,
			mask: mergedMask.value,
			focusable: mergedFocusable.value,
			maskClosable: mergedMaskClosable.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	return () => {
		const { rootClass, maskStyle, drawerStyle, contentWrapperStyle, open, push, defaultSize, rootStyle, getContainer: customizeGetContainer, resizable, afterOpenChange, destroyOnClose, destroyOnHidden, size, ...rest } = props;
		const { className, restAttrs, style } = getAttrStyleAndClass(attrs);
		const maskMotion = {
			name: getTransitionName(prefixCls.value, "mask-motion"),
			appear: true
		};
		const panelMotion = (motionPlacement) => ({
			name: getTransitionName(prefixCls.value, `panel-motion-${motionPlacement}`),
			appear: true
		});
		const drawerClassName = clsx({
			"no-mask": !mergedMask.value,
			[`${prefixCls.value}-rtl`]: direction.value === "rtl"
		}, rootClass, hashId.value, cssVarCls.value, mergedClassNames.value.root);
		const getContainer = customizeGetContainer === void 0 && getPopupContainer ? () => getPopupContainer(document.body) : customizeGetContainer;
		const ariaLabelledby = restAttrs["aria-labelledby"];
		const ariaId = rest.title ? id : void 0;
		return createVNode(ContextIsolator, {
			"form": true,
			"space": true
		}, { default: () => [createVNode(ZIndexProvider, { "value": contextZIndex.value }, { default: () => [createVNode(VcDrawer, mergeProps(restAttrs, rest, {
			"prefixCls": prefixCls.value,
			"onClose": (e) => {
				emit("update:open", false);
				emit("close", e);
			},
			"onClick": (e) => {
				emit("click", e);
			},
			"onKeyUp": (e) => {
				emit("keyup", e);
			},
			"onKeyDown": (e) => {
				emit("keydown", e);
			},
			"onMouseEnter": (e) => {
				emit("mouseenter", e);
			},
			"onMouseLeave": (e) => {
				emit("mouseleave", e);
			},
			"onMouseOver": (e) => {
				emit("mouseover", e);
			},
			"maskMotion": maskMotion,
			"motion": panelMotion,
			"classNames": {
				mask: clsx(mergedClassNames.value.mask, maskBlurClassName.value.mask),
				section: mergedClassNames.value.section,
				wrapper: mergedClassNames.value.wrapper,
				dragger: mergedClassNames.value.dragger
			},
			"styles": {
				mask: {
					...mergedStyles.value.mask,
					...maskStyle
				},
				section: {
					...mergedStyles.value.section,
					...drawerStyle
				},
				wrapper: {
					...mergedStyles.value.wrapper,
					...contentWrapperStyle
				},
				dragger: mergedStyles.value.dragger
			},
			"open": open,
			"mask": mergedMask.value,
			"maskClosable": mergedMaskClosable.value,
			"push": push,
			"size": drawerSize.value,
			"defaultSize": defaultSize,
			"ref": (el) => {
				const panel = el?.panel;
				panelRef.value = panel;
				innerPanelRef(panel);
			},
			"style": {
				...contextStyle.value,
				...style
			},
			"rootStyle": {
				...rootStyle,
				...mergedStyles.value.root
			},
			"class": clsx(contextClassName.value, className),
			"rootClassName": drawerClassName,
			"getContainer": getContainer,
			"zIndex": zIndex.value,
			"afterOpenChange": afterOpenChange
		}, resizable ? { resizable } : {}, {
			"aria-labelledby": ariaLabelledby ?? ariaId,
			"destroyOnHidden": destroyOnHidden ?? destroyOnClose,
			"focusTriggerAfterClose": mergedFocusable.value.focusTriggerAfterClose,
			"focusTrap": mergedFocusable.value.trap
		}), { default: () => [createVNode(DrawerPanel_default, mergeProps(rest, {
			"prefixCls": prefixCls.value,
			"size": size,
			"ariaId": ariaId,
			"onClose": (e) => {
				emit("update:open", false);
				emit("close", e);
			}
		}), slots)] })] })] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		size: {
			type: [String, Number],
			required: false
		},
		resizable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		afterOpenChange: {
			type: Function,
			required: false
		},
		destroyOnClose: {
			type: Boolean,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mask: {
			type: [Object, Boolean],
			required: false,
			default: void 0
		},
		maskClosable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focusable: {
			type: Object,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		getContainer: { required: false },
		panelRef: { required: false },
		wrapperClassName: {
			type: String,
			required: false
		},
		push: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootStyle: {
			type: Object,
			required: false
		},
		zIndex: {
			type: Number,
			required: false
		},
		placement: {
			type: String,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		width: {
			type: [Number, String],
			required: false
		},
		height: {
			type: [Number, String],
			required: false
		},
		maxSize: {
			type: Number,
			required: false
		},
		maskClassName: {
			type: String,
			required: false
		},
		motion: {
			type: [Object, Function],
			required: false
		},
		maskMotion: {
			type: Object,
			required: false
		},
		drawerRender: {
			type: Function,
			required: false
		},
		defaultSize: {
			type: [Number, String],
			required: false
		},
		title: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		footer: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		extra: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		closeIcon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		loading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		headerStyle: {
			type: Object,
			required: false
		},
		bodyStyle: {
			type: Object,
			required: false
		},
		footerStyle: {
			type: Object,
			required: false
		},
		contentWrapperStyle: {
			type: Object,
			required: false
		},
		maskStyle: {
			type: Object,
			required: false
		},
		drawerStyle: {
			type: Object,
			required: false
		}
	}, defaults),
	emits: [
		"update:open",
		"afterOpenChange",
		"close",
		"keydown",
		"keyup",
		"mouseenter",
		"mouseleave",
		"mouseover",
		"click"
	],
	inheritAttrs: false,
	name: "ADrawer"
});
const PurePanel = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const { prefixCls } = useComponentBaseConfig("drawer", props);
	const [hashId, cssVarCls] = style_default(prefixCls);
	return () => {
		const { restAttrs, className, style } = getAttrStyleAndClass(attrs);
		const { placement = "right", ...restProps } = props;
		const cls = clsx(prefixCls.value, `${prefixCls.value}-pure`, `${prefixCls.value}-${placement}`, hashId.value, cssVarCls.value, className);
		return createVNode("div", {
			"class": cls,
			"style": style
		}, [createVNode(DrawerPanel_default, mergeProps(restAttrs, restProps, { "prefixCls": prefixCls.value }), slots)]);
	};
}, { props: {
	ariaId: {
		type: String,
		required: false
	},
	title: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	},
	footer: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	},
	extra: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	},
	size: { required: false },
	closable: {
		type: [Boolean, Object],
		required: false,
		default: void 0
	},
	closeIcon: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	},
	onClose: {
		type: Function,
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
	loading: {
		type: Boolean,
		required: false,
		default: void 0
	},
	headerStyle: {
		type: Object,
		required: false
	},
	bodyStyle: {
		type: Object,
		required: false
	},
	footerStyle: {
		type: Object,
		required: false
	},
	contentWrapperStyle: {
		type: Object,
		required: false
	},
	maskStyle: {
		type: Object,
		required: false
	},
	drawerStyle: {
		type: Object,
		required: false
	},
	prefixCls: {
		type: String,
		required: false
	},
	placement: {
		type: String,
		required: false
	}
} });
Drawer._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
Drawer.install = (app) => {
	app.component(Drawer.name, Drawer);
};
var drawer_default = Drawer;

//#endregion
export { PurePanel, drawer_default as default };