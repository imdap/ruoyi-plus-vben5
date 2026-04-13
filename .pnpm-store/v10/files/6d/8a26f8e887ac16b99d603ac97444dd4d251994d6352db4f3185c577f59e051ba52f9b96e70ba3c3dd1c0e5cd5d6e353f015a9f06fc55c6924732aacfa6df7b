import { inject, provide } from "vue";
const QueueContextKey = Symbol("QueueContextKey");
function useContextProvider(appendFunc) {
	const queueCreate = appendFunc;
	provide(QueueContextKey, queueCreate);
	return queueCreate;
}
function useContextState() {
	return inject(QueueContextKey, void 0);
}
export { QueueContextKey, useContextProvider, useContextState };
