import { CollectionContext } from "../Collection.js";
import useResizeObserver from "../useResizeObserver.js";
import DomWrapper_default from "./DomWrapper.js";
import { computed, createVNode, defineComponent, inject, isVNode, shallowRef } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";
import findDOMNode from "@v-c/util/dist/Dom/findDOMNode";
var SingleObserver_default = /* @__PURE__ */ defineComponent({
	props: {
		data: {
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onResize: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "SingleObserver",
	inheritAttrs: false,
	setup(props, { expose, slots }) {
		const wrapperRef = shallowRef();
		const getDom = (el) => {
			const dom = findDOMNode(el);
			if (dom && (dom.nodeType === 3 || dom.nodeType === 8) && dom.nextElementSibling) return dom.nextElementSibling;
			return dom;
		};
		const setWrapperRef = (el) => {
			let _wrapper = el;
			if (el?.elementEl && typeof el.elementEl === "object") _wrapper = el.elementEl;
			else if (el?.__$el && typeof el.__$el === "object") _wrapper = el.__$el;
			wrapperRef.value = getDom(_wrapper);
		};
		const onCollectionResize = inject(CollectionContext, () => {});
		useResizeObserver(computed(() => !props.disabled), wrapperRef, (...args) => props?.onResize?.(...args), (size, element) => {
			onCollectionResize?.(size, element, props.data);
		});
		expose({ getDom });
		return () => {
			const children = filterEmpty(slots?.default?.());
			if (children.length === 1 && isVNode(children[0])) return createVNode(children[0], { ref: setWrapperRef });
			return createVNode(DomWrapper_default, { "ref": wrapperRef }, { default: () => [slots.default?.()] });
		};
	}
});
export { SingleObserver_default as default };
