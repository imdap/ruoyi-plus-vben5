import { getCellFixedInfo } from "../utils/fixUtil.js";
import { computed, unref } from "vue";
import isEqual from "@v-c/util/dist/isEqual";
import useMemo from "@v-c/util/dist/hooks/useMemo";
//#region src/hooks/useFixedInfo.ts
function useFixedInfo(flattenColumns, stickyOffsets) {
	const fixedInfoList = computed(() => {
		const mergedColumns = unref(flattenColumns) || [];
		const mergedOffsets = unref(stickyOffsets);
		return mergedColumns.map((_, colIndex) => getCellFixedInfo(colIndex, colIndex, mergedColumns, mergedOffsets));
	});
	return useMemo(() => fixedInfoList.value, [fixedInfoList], (prev, next) => !isEqual(prev, next));
}
//#endregion
export { useFixedInfo as default };
