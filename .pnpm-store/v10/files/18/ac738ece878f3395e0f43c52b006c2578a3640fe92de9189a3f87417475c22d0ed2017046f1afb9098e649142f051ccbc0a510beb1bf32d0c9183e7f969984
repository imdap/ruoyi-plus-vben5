import { onBeforeUpdate, ref } from "vue";
import { getDOM } from "@v-c/util/dist/Dom/findDOMNode";
function useRefs() {
	const refs = ref(/* @__PURE__ */ new Map());
	const setRef = (key) => (el) => {
		refs.value.set(key, getDOM(el));
	};
	onBeforeUpdate(() => {
		refs.value = /* @__PURE__ */ new Map();
	});
	return [setRef, refs];
}
var useRefs_default = useRefs;
export { useRefs_default as default };
