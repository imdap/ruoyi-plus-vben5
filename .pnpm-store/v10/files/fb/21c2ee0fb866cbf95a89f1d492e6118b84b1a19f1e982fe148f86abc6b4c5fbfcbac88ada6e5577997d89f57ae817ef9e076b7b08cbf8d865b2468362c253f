import { createVNode, defineComponent } from "vue";

//#region src/button/IconWrapper.tsx
const IconWrapper = /* @__PURE__ */ defineComponent((props, { slots }) => {
	return () => {
		const { prefixCls } = props;
		const iconWrapperCls = `${prefixCls}-icon`;
		return createVNode("span", { "class": [iconWrapperCls] }, [slots?.default?.()]);
	};
}, {
	props: { prefixCls: {
		type: String,
		required: true
	} },
	name: "IconWrapper"
});
var IconWrapper_default = IconWrapper;

//#endregion
export { IconWrapper_default as default };