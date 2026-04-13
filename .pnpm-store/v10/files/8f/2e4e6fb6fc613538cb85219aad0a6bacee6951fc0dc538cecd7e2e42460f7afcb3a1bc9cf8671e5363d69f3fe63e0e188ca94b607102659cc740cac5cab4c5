import { cloneVNode, defineComponent, shallowRef } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";
var Item_default = /* @__PURE__ */ defineComponent({
	name: "Item",
	props: { setRef: {
		type: Function,
		required: true
	} },
	setup(props, { slots }) {
		const currentElement = shallowRef(null);
		const refFunc = (node) => {
			if (currentElement.value !== node) {
				currentElement.value = node;
				props.setRef(node);
			}
		};
		return () => {
			const child = filterEmpty(slots.default?.() ?? [])[0];
			if (!child) return null;
			return cloneVNode(child, { ref: refFunc });
		};
	}
});
export { Item_default as default };
