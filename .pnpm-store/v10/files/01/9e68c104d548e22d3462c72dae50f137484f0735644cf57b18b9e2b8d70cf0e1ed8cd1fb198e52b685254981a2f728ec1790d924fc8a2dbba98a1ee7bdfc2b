import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { clsx as clsx$1, getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import noFound_default from "./noFound.js";
import serverError_default from "./serverError.js";
import style_default from "./style/index.js";
import unauthorized_default from "./unauthorized.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty, getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, WarningFilled } from "@antdv-next/icons";
import pickAttrs from "@v-c/util/dist/pickAttrs";

//#region src/result/index.tsx
const IconMap = {
	success: CheckCircleFilled,
	error: CloseCircleFilled,
	info: ExclamationCircleFilled,
	warning: WarningFilled
};
const ExceptionMap = {
	404: noFound_default,
	500: serverError_default,
	403: unauthorized_default
};
const ExceptionStatus = Object.keys(ExceptionMap);
const Icon = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	return () => {
		const { status } = props;
		const icon = getSlotPropsFnRun(slots, props, "icon", false);
		if (ExceptionStatus.includes(`${status}`)) {
			const SVGComponent = ExceptionMap[status];
			return createVNode("div", attrs, [createVNode(SVGComponent, null, null)]);
		}
		const iconNode = createVNode(IconMap[status]);
		if (icon === null || icon === false) return null;
		return createVNode("div", attrs, [icon || iconNode]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		icon: {
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
		status: { required: true }
	}, { icon: void 0 }),
	inheritAttrs: false
});
const Extra = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	return () => {
		const extra = getSlotPropsFnRun(slots, props, "extra");
		if (!extra) return null;
		return createVNode("div", attrs, [extra]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({ extra: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: true
	} }, { extra: void 0 }),
	inheritAttrs: false
});
const Result = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("result", props);
	const { classes, styles } = toPropsRefs$1(props, "classes", "styles");
	const [hashId, cssVarCls] = style_default(prefixCls);
	const mergedProps = computed(() => props);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	return () => {
		const { status, rootClass } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const rootClassNames = classNames(prefixCls.value, `${prefixCls.value}-${status}`, className, contextClassName.value, rootClass, { [`${prefixCls.value}-rtl`]: direction.value === "rtl" }, hashId.value, cssVarCls.value, mergedClassNames.value.root);
		const subTitle = getSlotPropsFnRun(slots, props, "subTitle");
		const title = getSlotPropsFnRun(slots, props, "title");
		const extra = getSlotPropsFnRun(slots, props, "extra");
		const icon = getSlotPropsFnRun(slots, props, "icon", false);
		const children = filterEmpty(slots?.default?.());
		const rootStyles = [
			mergedStyles.value.root,
			contextStyle.value,
			style
		];
		const titleClassNames = clsx$1(`${prefixCls.value}-title`, mergedClassNames.value.title);
		const subTitleClassNames = clsx$1(`${prefixCls.value}-subtitle`, mergedClassNames.value.subTitle);
		const extraClassNames = clsx$1(`${prefixCls.value}-extra`, mergedClassNames.value.extra);
		const bodyClassNames = clsx$1(`${prefixCls.value}-body`, mergedClassNames.value.body);
		const iconClassNames = clsx$1(`${prefixCls.value}-icon`, { [`${prefixCls.value}-image`]: ExceptionStatus.includes(`${status}`) }, mergedClassNames.value.icon);
		return createVNode("div", mergeProps(pickAttrs(restAttrs, {
			aria: true,
			data: true
		}), {
			"class": rootClassNames,
			"style": rootStyles
		}), [
			createVNode(Icon, {
				"class": iconClassNames,
				"status": status,
				"icon": icon,
				"style": mergedStyles.value.icon
			}, null),
			createVNode("div", {
				"class": titleClassNames,
				"style": mergedStyles.value.title
			}, [title]),
			!!subTitle && createVNode("div", {
				"class": subTitleClassNames,
				"style": mergedStyles.value.subTitle
			}, [subTitle]),
			createVNode(Extra, {
				"class": extraClassNames,
				"extra": extra,
				"style": mergedStyles.value.extra
			}, null),
			!!children.length && createVNode("div", {
				"class": bodyClassNames,
				"style": mergedStyles.value.body
			}, [children])
		]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		icon: {
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
		status: { required: false },
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
		subTitle: {
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
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
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
		icon: void 0,
		status: "info",
		title: void 0,
		subTitle: void 0,
		extra: void 0
	}),
	name: "AResult",
	inheritAttrs: false
});
Result.PRESENTED_IMAGE_403 = ExceptionMap["403"];
Result.PRESENTED_IMAGE_404 = ExceptionMap["404"];
Result.PRESENTED_IMAGE_500 = ExceptionMap["500"];
Result.install = (app) => {
	app.component(Result.name, Result);
};
var result_default = Result;

//#endregion
export { ExceptionMap, IconMap, result_default as default };