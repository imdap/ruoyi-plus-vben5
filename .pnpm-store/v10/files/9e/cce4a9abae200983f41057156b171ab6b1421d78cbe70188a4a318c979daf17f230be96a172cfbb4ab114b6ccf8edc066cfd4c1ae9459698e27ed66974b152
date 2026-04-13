import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import useToken from "../theme/useToken.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useLocale_default from "../locale/useLocale.js";
import select_default from "../select/index.js";
import useBreakpoint_default from "../grid/hooks/useBreakpoint.js";
import style_default from "./style/index.js";
import bordered_default from "./style/bordered.js";
import resolveShowSizeChanger from "./useShowSizeChanger.js";
import { Fragment, computed, createTextVNode, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import VcPagination from "@v-c/pagination";
import Pagination from "@v-c/pagination/locale/zh_CN";

//#region src/pagination/Pagination.tsx
const omitKeys = [
	"size",
	"responsive",
	"rootClass",
	"classes",
	"styles",
	"showSizeChanger",
	"pageSizeOptions",
	"selectComponentClass"
];
const Pagination$1 = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
	const { getPrefixCls, prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, showSizeChanger: contextShowSizeChangerConfig } = useComponentBaseConfig("pagination", props, ["showSizeChanger"]);
	const { size, responsive, classes, styles, showSizeChanger } = toPropsRefs$1(props, "size", "responsive", "classes", "styles", "showSizeChanger");
	const [hashId, cssVarCls] = style_default(prefixCls, prefixCls);
	const [, token] = useToken();
	const mergedSize = useSize(size);
	const screens = useBreakpoint_default(responsive);
	const isSmall = computed(() => mergedSize.value === "small" || !!screens.value?.xs && !mergedSize.value && responsive.value);
	const mergedProps = computed(() => {
		return {
			...props,
			size: mergedSize.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const [contextLocale] = useLocale_default("Pagination", Pagination);
	const mergedLocale = computed(() => ({
		...contextLocale?.value,
		...props.locale ?? {}
	}));
	const propShowSizeChanger = computed(() => resolveShowSizeChanger(showSizeChanger.value));
	const contextShowSizeChanger = computed(() => resolveShowSizeChanger(contextShowSizeChangerConfig.value));
	const mergedShowSizeChanger = computed(() => propShowSizeChanger.value.show ?? contextShowSizeChanger.value.show);
	const mergedShowSizeChangerSelectProps = computed(() => propShowSizeChanger.value.selectProps ?? contextShowSizeChanger.value.selectProps);
	const SizeChanger = computed(() => props.selectComponentClass || select_default);
	const mergedPageSizeOptions = computed(() => props.pageSizeOptions?.map((option) => Number(option)));
	const sizeChangerRender = (info) => {
		const { disabled, size: pageSize, onSizeChange, "aria-label": ariaLabel, className: sizeChangerClassName, options } = info;
		const selectProps = mergedShowSizeChangerSelectProps.value ?? {};
		const propSelectClass = selectProps.class ?? selectProps.className;
		const propSelectOnChange = selectProps.onChange;
		const selectedValue = options.find((option) => String(option.value) === String(pageSize))?.value;
		const SizeChangerComp = SizeChanger.value;
		return createVNode(SizeChangerComp, mergeProps({
			"disabled": disabled,
			"showSearch": true,
			"popupMatchSelectWidth": false,
			"getPopupContainer": (triggerNode) => triggerNode.parentNode,
			"aria-label": ariaLabel,
			"options": options
		}, selectProps, {
			"value": selectedValue,
			"onChange": (nextSize, option) => {
				onSizeChange?.(nextSize);
				propSelectOnChange?.(nextSize, option);
			},
			"size": mergedSize.value,
			"class": clsx(sizeChangerClassName, propSelectClass)
		}), null);
	};
	if (isDev) devUseWarning("Pagination")(!props.selectComponentClass, "usage", "`selectComponentClass` is not official api which will be removed.");
	const selectPrefixCls = computed(() => getPrefixCls("select", props.selectPrefixCls));
	const defaultEllipsis = computed(() => createVNode("span", { "class": `${prefixCls.value}-item-ellipsis` }, [createTextVNode("•••")]));
	const defaultPrevIcon = computed(() => createVNode("button", {
		"class": `${prefixCls.value}-item-link`,
		"type": "button",
		"tabindex": -1
	}, [direction.value === "rtl" ? createVNode(RightOutlined, null, null) : createVNode(LeftOutlined, null, null)]));
	const defaultNextIcon = computed(() => createVNode("button", {
		"class": `${prefixCls.value}-item-link`,
		"type": "button",
		"tabindex": -1
	}, [direction.value === "rtl" ? createVNode(LeftOutlined, null, null) : createVNode(RightOutlined, null, null)]));
	const defaultJumpPrevIcon = computed(() => createVNode("a", { "class": `${prefixCls.value}-item-link` }, [createVNode("div", { "class": `${prefixCls.value}-item-container` }, [direction.value === "rtl" ? createVNode(DoubleRightOutlined, { "class": `${prefixCls.value}-item-link-icon` }, null) : createVNode(DoubleLeftOutlined, { "class": `${prefixCls.value}-item-link-icon` }, null), defaultEllipsis.value])]));
	const defaultJumpNextIcon = computed(() => createVNode("a", { "class": `${prefixCls.value}-item-link` }, [createVNode("div", { "class": `${prefixCls.value}-item-container` }, [direction.value === "rtl" ? createVNode(DoubleLeftOutlined, { "class": `${prefixCls.value}-item-link-icon` }, null) : createVNode(DoubleRightOutlined, { "class": `${prefixCls.value}-item-link-icon` }, null), defaultEllipsis.value])]));
	const mergedPrevIcon = computed(() => getSlotPropsFnRun(slots, props, "prevIcon", false) ?? defaultPrevIcon.value);
	const mergedNextIcon = computed(() => getSlotPropsFnRun(slots, props, "nextIcon", false) ?? defaultNextIcon.value);
	const mergedJumpPrevIcon = computed(() => getSlotPropsFnRun(slots, props, "jumpPrevIcon", false) ?? defaultJumpPrevIcon.value);
	const mergedJumpNextIcon = computed(() => getSlotPropsFnRun(slots, props, "jumpNextIcon", false) ?? defaultJumpNextIcon.value);
	const mergedItemRender = computed(() => {
		if (slots.itemRender) return (page, type, element) => {
			return getSlotPropsFnRun(slots, {}, "itemRender", true, {
				page,
				type,
				element
			});
		};
		return props.itemRender;
	});
	const mergedShowTotal = computed(() => {
		if (slots.showTotal) return (total, range) => {
			return getSlotPropsFnRun(slots, {}, "showTotal", true, {
				total,
				range
			});
		};
		return props.showTotal;
	});
	const handleChange = (page, pageSize) => {
		if (props.current !== page) emit("update:current", page);
		else if (props.pageSize !== pageSize) emit("update:pageSize", pageSize);
		emit("change", page, pageSize);
	};
	const handleShowSizeChange = (current, size) => {
		emit("showSizeChange", current, size);
	};
	return () => {
		const { rootClass, align } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const extendedClassName = clsx({
			[`${prefixCls.value}-${align}`]: !!align,
			[`${prefixCls.value}-${mergedSize.value}`]: mergedSize.value,
			[`${prefixCls.value}-mini`]: isSmall.value,
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-bordered`]: token.value.wireframe
		}, contextClassName.value, className, rootClass, mergedClassNames.value.root, hashId.value, cssVarCls.value);
		const mergedStyle = {
			...mergedStyles.value?.root,
			...contextStyle.value,
			...style
		};
		const restProps = omit(props, omitKeys);
		return createVNode(Fragment, null, [token.value.wireframe && createVNode(bordered_default, { "prefixCls": prefixCls.value }, null), createVNode(VcPagination, mergeProps(restProps, restAttrs, {
			"prefixCls": prefixCls.value,
			"selectPrefixCls": selectPrefixCls.value,
			"class": extendedClassName,
			"style": mergedStyle,
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value,
			"locale": mergedLocale.value,
			"pageSizeOptions": mergedPageSizeOptions.value,
			"showSizeChanger": mergedShowSizeChanger.value,
			"sizeChangerRender": sizeChangerRender,
			"prevIcon": mergedPrevIcon.value,
			"nextIcon": mergedNextIcon.value,
			"jumpPrevIcon": mergedJumpPrevIcon.value,
			"jumpNextIcon": mergedJumpNextIcon.value,
			"itemRender": mergedItemRender.value,
			"showTotal": mergedShowTotal.value,
			"onChange": handleChange,
			"onShowSizeChange": handleShowSizeChange
		}), null)]);
	};
}, {
	props: {
		showQuickJumper: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
			required: false
		},
		responsive: {
			type: Boolean,
			required: false,
			default: void 0
		},
		totalBoundaryShowSizeChanger: {
			type: Number,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		showSizeChanger: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		pageSizeOptions: {
			type: Array,
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
		locale: {
			type: Object,
			required: false
		},
		prevIcon: {
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
		nextIcon: {
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
		jumpPrevIcon: {
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
		jumpNextIcon: {
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
		selectComponentClass: { required: false },
		itemRender: {
			type: Function,
			required: false
		},
		showTotal: {
			type: Function,
			required: false
		},
		role: {
			type: [String, null],
			required: false
		},
		selectPrefixCls: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		current: {
			type: Number,
			required: false
		},
		defaultCurrent: {
			type: Number,
			required: false
		},
		total: {
			type: Number,
			required: false
		},
		pageSize: {
			type: Number,
			required: false
		},
		defaultPageSize: {
			type: Number,
			required: false
		},
		hideOnSinglePage: {
			type: Boolean,
			required: false,
			default: void 0
		},
		align: {
			type: String,
			required: false
		},
		sizeChangerRender: {
			type: Function,
			required: false
		},
		showLessItems: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showPrevNextJumpers: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showTitle: {
			type: Boolean,
			required: false,
			default: void 0
		},
		simple: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: [
		"change",
		"showSizeChange",
		"update:current",
		"update:pageSize"
	],
	name: "APagination",
	inheritAttrs: false
});
Pagination$1.install = (app) => {
	app.component(Pagination$1.name, Pagination$1);
};
var Pagination_default = Pagination$1;

//#endregion
export { Pagination_default as default };