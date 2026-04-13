import { shallowRef } from "vue";
function useRefFunc(callback) {
	const funcRef = shallowRef(callback);
	funcRef.value = callback;
	const cacheFn = (...args) => {
		return funcRef.value(...args);
	};
	return cacheFn;
}
export { useRefFunc as default };
