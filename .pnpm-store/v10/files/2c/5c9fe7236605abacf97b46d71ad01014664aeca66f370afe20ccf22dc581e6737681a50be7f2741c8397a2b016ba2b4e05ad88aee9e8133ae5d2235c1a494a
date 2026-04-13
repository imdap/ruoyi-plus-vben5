import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import useClosable, { pickClosable } from "../_util/hooks/useClosable.js";
import skeleton_default from "../skeleton/index.js";
import { Fragment, computed, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";

//#region src/drawer/DrawerPanel.tsx
const DrawerPanel = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const { classes: contextClassNames, styles: contextStyles, closable: contextClosable, closeIcon: contextCloseIcon } = useComponentBaseConfig("drawer", props, ["closable", "closeIcon"]);
	const { classes: drawerClassNames, styles: drawerStyles } = toPropsRefs(props, "classes", "styles");
	const mergedProps = computed(() => {
		return {
			...props,
			closable: props?.closable ?? contextClosable.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, drawerClassNames), useToArr(contextStyles, drawerStyles), useToProps(mergedProps));
	const closablePlacement = computed(() => {
		const merged = props?.closable ?? contextClosable.value;
		if (merged === false) return;
		if (typeof merged === "object" && merged.placement === "end") return "end";
		return "start";
	});
	const customCloseIconRender = (icon) => {
		icon = getSlotPropsFnRun({}, { icon }, "icon");
		const { onClose, prefixCls } = props;
		return createVNode("button", {
			"type": "button",
			"onClick": onClose,
			"class": clsx(`${prefixCls}-close`, { [`${prefixCls}-close-${closablePlacement.value}`]: closablePlacement.value === "end" }, mergedClassNames.value.close),
			"style": mergedStyles.value.close
		}, [icon]);
	};
	const closableInfo = useClosable(pickClosable(computed(() => {
		return {
			closable: props.closable,
			closeIcon: slots?.closeIcon ?? props.closeIcon
		};
	})), pickClosable(computed(() => {
		return {
			closable: contextClosable.value,
			closeIcon: contextCloseIcon.value
		};
	})), computed(() => {
		return {
			closable: true,
			closeIconRender: customCloseIconRender
		};
	}));
	return () => {
		const { headerStyle, prefixCls, ariaId, bodyStyle, loading, footerStyle } = props;
		const title = getSlotPropsFnRun(slots, props, "title");
		const footer = getSlotPropsFnRun(slots, props, "footer");
		const extra = getSlotPropsFnRun(slots, props, "extra");
		const [mergedClosable, mergedCloseIcon] = closableInfo.value;
		const renderHeader = () => {
			if (!title && !mergedClosable) return null;
			return createVNode("div", {
				"style": {
					...mergedStyles.value?.header,
					...headerStyle
				},
				"class": clsx(`${prefixCls}-header`, mergedClassNames.value.header, { [`${prefixCls}-header-close-only`]: mergedClosable && !title && !extra })
			}, [createVNode("div", { "class": `${prefixCls}-header-title` }, [
				closablePlacement.value === "start" && mergedCloseIcon,
				!!title && createVNode("div", {
					"class": clsx(`${prefixCls}-title`, mergedClassNames.value.title),
					"style": mergedStyles.value.title,
					"id": ariaId
				}, [title]),
				!!extra && createVNode("div", {
					"class": clsx(`${prefixCls}-extra`, mergedClassNames.value.extra),
					"style": mergedStyles.value.extra
				}, [extra])
			]), closablePlacement.value === "end" && mergedCloseIcon]);
		};
		const renderFooter = () => {
			if (!footer) return null;
			return createVNode("div", {
				"class": clsx(`${prefixCls}-footer`, mergedClassNames.value.footer),
				"style": [mergedStyles.value.footer, footerStyle]
			}, [footer]);
		};
		return createVNode(Fragment, null, [
			renderHeader(),
			createVNode("div", {
				"class": clsx(`${prefixCls}-body`, mergedClassNames.value.body),
				"style": {
					...mergedStyles.value.body,
					...bodyStyle
				}
			}, [loading ? createVNode(skeleton_default, {
				"active": true,
				"title": false,
				"paragraph": { rows: 5 },
				"class": `${prefixCls}-body-skeleton`
			}, null) : slots?.default?.()]),
			renderFooter()
		]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
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
		}
	},
	name: "DrawerPanel",
	inheritAttrs: false
});
var DrawerPanel_default = DrawerPanel;

//#endregion
export { DrawerPanel_default as default };