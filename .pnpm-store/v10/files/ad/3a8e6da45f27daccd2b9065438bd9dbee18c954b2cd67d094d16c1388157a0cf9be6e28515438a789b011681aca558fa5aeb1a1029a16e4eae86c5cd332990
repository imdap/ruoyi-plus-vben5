import { useBaseConfig } from "../config-provider/context.js";
import config_provider_default from "../config-provider/index.js";
import { createVNode, defineComponent, mergeProps, shallowRef, useAttrs, useSlots, watch } from "vue";

//#region src/_util/PurePanel.tsx
function withPureRenderTheme(Component) {
	return (props) => {
		const slots = useSlots();
		const attrs = useAttrs();
		return createVNode(config_provider_default, { "theme": { token: {
			motion: false,
			zIndexPopupBase: 0
		} } }, { default: () => [createVNode(Component, {
			...props,
			...attrs
		}, slots)] });
	};
}
/* istanbul ignore next */
function genPurePanel(Component, alignPropName, postProps, defaultPrefixCls, getDropdownCls) {
	return withPureRenderTheme(/* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
		const holderRef = shallowRef();
		const popupHeight = shallowRef(0);
		const popupWidth = shallowRef(0);
		const open = shallowRef(props?.open ?? false);
		const setOpen = (value) => {
			if (props.open !== void 0) return;
			open.value = value;
		};
		watch(() => props.open, () => {
			open.value = props.open ?? false;
		});
		const { prefixCls } = useBaseConfig(defaultPrefixCls ?? "select", props);
		watch(prefixCls, (_, _o, onCleanup) => {
			setOpen(true);
			if (typeof ResizeObserver !== "undefined") {
				const resizeObserver = new ResizeObserver((entries) => {
					const element = entries[0].target;
					popupHeight.value = element.offsetHeight + 8;
					popupWidth.value = element.offsetWidth;
				});
				const interval = setInterval(() => {
					const dropdownCls = getDropdownCls ? `.${getDropdownCls(prefixCls.value)}` : `.${prefixCls.value}-dropdown`;
					const popup = holderRef.value?.querySelector(dropdownCls);
					if (popup) {
						clearInterval(interval);
						resizeObserver.observe(popup);
					}
				}, 10);
				onCleanup(() => {
					clearInterval(interval);
					resizeObserver.disconnect();
				});
			}
		}, {
			immediate: true,
			flush: "post"
		});
		return () => {
			const { style } = props;
			let mergedProps = {
				...props,
				style: {
					...style,
					margin: 0
				},
				open: open.value,
				getPopupContainer: () => holderRef.value
			};
			if (postProps) mergedProps = postProps(mergedProps);
			if (alignPropName) Object.assign(mergedProps, { [alignPropName]: { overflow: {
				adjustX: false,
				adjustY: false
			} } });
			const mergedStyle = {
				paddingBottom: `${popupHeight.value}px`,
				position: "relative",
				minWidth: `${popupWidth.value}px`
			};
			return createVNode("div", {
				"ref": holderRef,
				"style": mergedStyle
			}, [createVNode(Component, mergeProps(attrs, mergedProps), slots)]);
		};
	}, { props: {
		prefixCls: {
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
		}
	} }));
}
var PurePanel_default = genPurePanel;

//#endregion
export { PurePanel_default as default, withPureRenderTheme };