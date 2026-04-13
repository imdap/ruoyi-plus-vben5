import { computed, defineComponent, inject, provide, ref } from "vue";

//#region src/table/TableMeasureRowContext.ts
const TableMeasureRowContextKey = Symbol("TableMeasureRowContextKey");
function useTableMeasureRowContext() {
	return inject(TableMeasureRowContextKey, ref(false));
}
const TableMeasureRowContextProvider = defineComponent((props, { slots }) => {
	provide(TableMeasureRowContextKey, computed(() => props.value));
	return () => {
		return slots?.default?.();
	};
}, {
	name: "TableMeasureRowContext",
	inheritAttrs: false,
	props: { value: Boolean }
});

//#endregion
export { TableMeasureRowContextProvider, useTableMeasureRowContext };