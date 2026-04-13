import { ref } from "vue";
//#region src/hooks/useHover.ts
function useHover() {
	const startRow = ref(-1);
	const endRow = ref(-1);
	const onHover = (start, end) => {
		startRow.value = start;
		endRow.value = end;
	};
	return [
		startRow,
		endRow,
		onHover
	];
}
//#endregion
export { useHover as default };
