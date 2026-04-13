import { useComponentBaseConfig } from "../config-provider/context.js";
import useClosable from "../_util/hooks/useClosable.js";
import { RawPurePanel } from "../popover/PurePanel.js";
import panelRender_default from "./panelRender.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults } from "vue";
import { clsx } from "@v-c/util";

//#region src/tour/PurePanel.tsx
/** @private Internal Component. Do not use in your production. */
const PurePanel = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const { prefixCls } = useComponentBaseConfig("tour", props);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const closableCollection = computed(() => ({
		closable: props.closable,
		closeIcon: props.closeIcon
	}));
	const fallbackCloseCollection = computed(() => ({
		closable: true,
		closeIconRender: (icon) => {
			if (isVNode(icon)) {
				const iconClass = icon.props?.class;
				return {
					...icon,
					props: {
						...icon.props,
						class: clsx(iconClass, `${prefixCls.value}-close-icon`)
					}
				};
			}
			return icon;
		}
	}));
	const closableResult = useClosable(closableCollection, computed(() => null), fallbackCloseCollection);
	return () => {
		const { current = 0, total = 6, type, closable: _closable, closeIcon: _closeIcon, ...restProps } = props;
		const [mergedClosable, mergedCloseIcon] = closableResult.value ?? [false, null];
		return createVNode(RawPurePanel, {
			"prefixCls": prefixCls.value,
			"hashId": hashId.value,
			"class": clsx(attrs.class, `${prefixCls.value}-pure`, type && `${prefixCls.value}-${type}`, cssVarCls.value, props.class),
			"style": [attrs.style, props.style]
		}, { default: () => [createVNode(panelRender_default, {
			"stepProps": {
				...restProps,
				prefixCls: prefixCls.value,
				total,
				closable: mergedClosable ? { closeIcon: mergedCloseIcon } : void 0
			},
			"current": current,
			"type": type
		}, null)] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		cover: {
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
		nextButtonProps: {
			type: Object,
			required: false
		},
		prevButtonProps: {
			type: Object,
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
			type: Object,
			required: false
		},
		styles: {
			type: Object,
			required: false
		},
		class: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		total: {
			type: Number,
			required: false
		},
		current: {
			type: Number,
			required: false
		},
		onClose: {
			type: Function,
			required: false
		},
		onFinish: {
			type: Function,
			required: false
		},
		renderPanel: {
			type: Function,
			required: false
		},
		onPrev: {
			type: Function,
			required: false
		},
		onNext: {
			type: Function,
			required: false
		},
		classNames: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		target: {
			type: [
				Object,
				null,
				Function
			],
			required: false,
			skipCheck: true
		},
		title: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: true
		},
		description: {
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
		placement: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		mask: {
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
		}
	}, {
		current: 0,
		total: 6
	}),
	name: "TourPurePanel",
	inheritAttrs: false
});
var PurePanel_default = PurePanel;

//#endregion
export { PurePanel_default as default };