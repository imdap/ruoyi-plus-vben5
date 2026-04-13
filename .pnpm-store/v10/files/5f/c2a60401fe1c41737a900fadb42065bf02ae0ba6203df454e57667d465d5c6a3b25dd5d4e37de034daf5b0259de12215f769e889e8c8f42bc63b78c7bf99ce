import { Collection } from "./Collection.js";
import { _rs } from "./utils/observerUtil.js";
import useResizeObserver from "./useResizeObserver.js";
import SingleObserver_default from "./SingleObserver/index.js";
import { createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { warning } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var INTERNAL_PREFIX_KEY = "vc-observer-key";
var ResizeObserver = /* @__PURE__ */ defineComponent({
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
	setup(props, { slots }) {
		return () => {
			const childNodes = filterEmpty(slots.default?.() ?? []).filter(Boolean);
			if (process.env.NODE_ENV !== "production") {
				if (childNodes.length > 1) warning(false, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.");
				else if (childNodes.length === 0) warning(false, "`children` of ResizeObserver is empty. Nothing is in observe.");
			}
			return childNodes.map((child, index) => {
				const key = child?.key || `${INTERNAL_PREFIX_KEY}-${index}`;
				return createVNode(SingleObserver_default, mergeProps(props, { "key": key }), _isSlot(child) ? child : { default: () => [child] });
			});
		};
	}
});
ResizeObserver.Collection = Collection;
var src_default = ResizeObserver;
export { _rs, src_default as default, useResizeObserver };
