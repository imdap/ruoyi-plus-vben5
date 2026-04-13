import { NoCompactStyle } from "../space/Compact.js";
import { createVNode, defineComponent, isVNode } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/_util/ContextIsolator.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ContextIsolator = /* @__PURE__ */ defineComponent((props, { slots }) => {
	return () => {
		const { space, form } = props;
		const children = filterEmpty(slots?.default?.());
		if (children.length === 0) return null;
		let result = children;
		if (form) {}
		if (space) {
			const _result = function() {
				return result;
			}();
			result = createVNode(NoCompactStyle, null, _isSlot(result) ? result : { default: () => [_result] });
		}
		return result;
	};
}, { props: {
	space: {
		type: Boolean,
		required: false,
		default: void 0
	},
	form: {
		type: Boolean,
		required: false,
		default: void 0
	}
} });

//#endregion
export { ContextIsolator };