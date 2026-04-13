import { defineComponent, shallowRef } from "vue";
var PopupContent_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const cachedChildren = shallowRef();
	return () => {
		const children = slots?.default?.();
		if (!props.cache) {
			cachedChildren.value = children;
			return children;
		}
		if (!cachedChildren.value) cachedChildren.value = children;
		return cachedChildren.value;
	};
}, {
	props: { cache: {
		type: Boolean,
		required: false,
		default: void 0
	} },
	name: "PopupContext"
});
export { PopupContent_default as default };
