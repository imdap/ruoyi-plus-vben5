import { inject, provide, reactive } from "vue";
//#region src/context/PerfContext.tsx
var defaultPerfRecord = { renderWithProps: false };
var PerfContextKey = Symbol("TablePerfContext");
function useProvidePerfContext(record = reactive({ ...defaultPerfRecord })) {
	provide(PerfContextKey, record);
	return record;
}
function useInjectPerfContext() {
	return inject(PerfContextKey, defaultPerfRecord);
}
//#endregion
export { useInjectPerfContext, useProvidePerfContext };
