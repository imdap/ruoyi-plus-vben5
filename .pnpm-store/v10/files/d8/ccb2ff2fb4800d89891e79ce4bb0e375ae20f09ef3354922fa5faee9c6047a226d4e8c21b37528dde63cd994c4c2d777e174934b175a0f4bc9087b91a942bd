import { useComponentBaseConfig } from "../config-provider/context.js";
import useToken from "../theme/useToken.js";
import { pureAttrs, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { ZIndexProvider } from "../_util/zindexContext.js";
import { useZIndex } from "../_util/hooks/useZIndex.js";
import getPlacements from "../_util/placements.js";
import { toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import { checkRenderNode } from "../_util/vueNode.js";
import panelRender_default from "./panelRender.js";
import style_default from "./style/index.js";
import PurePanel_default from "./PurePanel.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { omit } from "es-toolkit";
import VcTour from "@v-c/tour";

//#region src/tour/index.tsx
const Tour = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs }) => {
	const { prefixCls, direction, closeIcon: contextCloseIcon, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("tour", props, ["closeIcon"]);
	const { classes, styles } = toPropsRefs$1(props, "classes", "styles");
	const [hashId, cssVarCls] = style_default(prefixCls);
	const [, token] = useToken();
	const mergedSteps = computed(() => {
		return (props?.steps ?? []).map((step, index) => {
			const _cover = filterEmpty(slots?.coverRender?.({
				step,
				index
			})).filter(Boolean);
			const _title = filterEmpty(slots?.titleRender?.({
				step,
				index
			})).filter(Boolean);
			const _description = filterEmpty(slots?.descriptionRender?.({
				step,
				index
			})).filter(Boolean);
			return {
				...step,
				cover: step?.cover ?? checkRenderNode(_cover),
				title: step?.title ?? checkRenderNode(_title),
				description: step?.description ?? checkRenderNode(_description),
				class: clsx(step.class, { [`${prefixCls.value}-primary`]: (step.type ?? props.type) === "primary" })
			};
		});
	});
	const vcSteps = computed(() => {
		return mergedSteps.value.map((step) => {
			const { class: stepClass, ...restStep } = step ?? {};
			return {
				...restStep,
				className: stepClass
			};
		});
	});
	const mergedProps = computed(() => {
		return {
			...props,
			steps: mergedSteps.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const builtinPlacements = (config) => getPlacements({
		arrowPointAtCenter: config?.arrowPointAtCenter ?? true,
		autoAdjustOverflow: true,
		offset: token.value.marginXXS,
		arrowWidth: token.value.sizePopupArrow,
		borderRadius: token.value.borderRadius
	});
	const [zIndex, contextZIndex] = useZIndex("Tour", computed(() => props.zIndex));
	return () => {
		const { rootClass, type, closeIcon } = props;
		const mergedRootClassName = clsx({ [`${prefixCls.value}-rtl`]: direction.value === "rtl" }, hashId.value, cssVarCls.value, rootClass, contextClassName.value, mergedClassNames.value?.root, attrs.class);
		const semanticStyles = {
			...mergedStyles.value,
			mask: {
				...mergedStyles.value?.root,
				...mergedStyles.value?.mask,
				...contextStyle.value,
				...attrs.style
			}
		};
		const indicatorsRender = slots?.indicatorsRender ?? props?.indicatorsRender;
		const actionsRender = slots?.actionsRender ?? props?.actionsRender;
		const mergedRenderPanel = (stepProps, stepCurrent) => {
			return createVNode(panelRender_default, {
				"styles": semanticStyles,
				"classes": mergedClassNames.value,
				"type": type,
				"stepProps": {
					...stepProps,
					classes: stepProps?.classes ?? stepProps?.classNames
				},
				"current": stepCurrent,
				"indicatorsRender": indicatorsRender,
				"actionsRender": actionsRender,
				"prevButtonProps": slots?.prevButton,
				"nextButtonProps": slots?.nextButton
			}, null);
		};
		const restProps = omit(props, [
			"prefixCls",
			"type",
			"indicatorsRender",
			"actionsRender",
			"steps",
			"closeIcon",
			"styles"
		]);
		return createVNode(ZIndexProvider, { "value": contextZIndex.value }, { default: () => [createVNode(VcTour, mergeProps(pureAttrs(attrs), restProps, {
			"styles": semanticStyles,
			"classNames": mergedClassNames.value,
			"closeIcon": closeIcon ?? contextCloseIcon.value,
			"zIndex": zIndex.value,
			"rootClassName": mergedRootClassName,
			"prefixCls": prefixCls.value,
			"animated": true,
			"renderPanel": mergedRenderPanel,
			"builtinPlacements": builtinPlacements,
			"steps": vcSteps.value,
			"onClose": (current) => {
				emit("close", current);
				emit("update:open", false);
			},
			"onChange": (current) => {
				emit("update:current", current);
				emit("change", current);
			},
			"onFinish": () => {
				emit("finish");
				emit("update:open", false);
			},
			"onPopupAlign": (el, info) => {
				emit("popupAlign", el, info);
			}
		}), null)] });
	};
}, {
	props: {
		steps: {
			type: Array,
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
		indicatorsRender: {
			type: Function,
			required: false
		},
		actionsRender: {
			type: Function,
			required: false
		},
		type: {
			type: String,
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
		rootClass: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultCurrent: {
			type: Number,
			required: false
		},
		closeIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		mask: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false
		},
		gap: { required: false },
		animated: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		scrollIntoViewOptions: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false
		},
		getPopupContainer: {
			type: [Function, Boolean],
			required: false,
			default: void 0
		},
		builtinPlacements: {
			type: Function,
			required: false,
			skipCheck: true
		},
		disabledInteraction: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: [
		"change",
		"close",
		"finish",
		"update:open",
		"update:current",
		"popupAlign"
	],
	name: "ATour",
	inheritAttrs: false
});
Tour.install = (app) => {
	app.component(Tour.name, Tour);
};
Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default;
var tour_default = Tour;

//#endregion
export { tour_default as default };