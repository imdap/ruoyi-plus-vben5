import canUseDom from "./Dom/canUseDom.js";
import { Teleport, createVNode, defineComponent, onBeforeUnmount, onMounted, onUnmounted, shallowRef } from "vue";
var Portal_default = /* @__PURE__ */ defineComponent((props, ctx) => {
	const parentRef = shallowRef();
	const containerRef = shallowRef();
	const initRef = shallowRef(false);
	if (!initRef.value && canUseDom()) {
		containerRef.value = props.getContainer();
		parentRef.value = containerRef.value?.parentNode;
		initRef.value = true;
	}
	onMounted(() => {
		if (containerRef.value?.parentNode === null && parentRef.value !== null) parentRef.value.appendChild(containerRef.value);
	});
	onBeforeUnmount(() => {
		props.didUpdate?.(props);
	});
	onUnmounted(() => {
		containerRef.value?.parentNode?.removeChild?.(containerRef.value);
	});
	return () => {
		if (containerRef.value) return createVNode(Teleport, { "to": containerRef.value }, { default: () => [ctx.slots.default?.()] });
		return null;
	};
}, {
	props: {
		didUpdate: {
			type: Function,
			required: false,
			default: void 0
		},
		getContainer: {
			type: Function,
			required: true,
			default: void 0
		}
	},
	inheritAttrs: false
});
export { Portal_default as default };
