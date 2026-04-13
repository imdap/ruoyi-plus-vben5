import useMutateObserver from "./useMutateObserver.js";
import Wrapper_default from "./Wrapper.js";
import { createVNode, defineComponent, isVNode, nextTick, ref, shallowRef, toRef } from "vue";
import findDOMNode from "@v-c/util/dist/Dom/findDOMNode";
import { cloneElement } from "@v-c/util/dist/vnode";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var MutateObserver_default = /* @__PURE__ */ defineComponent({
	name: "VCMutateObserver",
	props: {
		onMutate: {
			type: Function,
			default: () => {}
		},
		options: {
			type: Object,
			default: void 0
		}
	},
	setup(props, { slots }) {
		const internalOptions = toRef(props, "options");
		const elementRef = ref();
		const wrapperRef = ref();
		const target = shallowRef(null);
		const callback = (...args) => props.onMutate(...args);
		const bindRef = (e) => elementRef.value = e;
		const getDom = () => {
			const dom = findDOMNode(elementRef) || (elementRef.value && typeof elementRef.value === "object" ? findDOMNode(elementRef.value.nativeElement) : null) || wrapperRef.value && findDOMNode(wrapperRef.value);
			if (dom && dom.nodeType === 3 && dom.nextElementSibling) return dom.nextElementSibling;
			return dom;
		};
		useMutateObserver(target, callback, internalOptions);
		return () => {
			let _slot;
			const children = slots?.default?.();
			if (!children) {
				if (process.env.NODE_ENV !== "production") console.error("MutationObserver need children props");
				return null;
			}
			nextTick(() => {
				target.value = getDom();
			});
			return createVNode(Wrapper_default, { "ref": wrapperRef }, _isSlot(_slot = cloneElement(children, { ref: bindRef }, true, true)) ? _slot : { default: () => [_slot] });
		};
	}
});
export { MutateObserver_default as default };
