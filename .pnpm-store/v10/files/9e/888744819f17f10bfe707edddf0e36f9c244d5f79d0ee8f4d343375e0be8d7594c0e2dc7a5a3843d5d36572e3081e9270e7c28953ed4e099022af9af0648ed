import { ref } from "vue";

//#region src/masonry/hooks/useRefs.ts
function useRefs() {
	const refs = ref(null);
	if (refs.value === null) refs.value = /* @__PURE__ */ new Map();
	const setRef = (key, element) => {
		refs.value.set(key, element);
	};
	const getRef = (key) => refs.value.get(key);
	return [setRef, getRef];
}

//#endregion
export { useRefs as default };