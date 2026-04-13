import { shallowRef } from "vue";
function useRefFunc(callback) {
	const callbackRef = shallowRef(callback);
	callbackRef.value = callback;
	const cacheFn = ((...args) => {
		return callbackRef.value(...args);
	});
	return cacheFn;
}
export { useRefFunc as default };
