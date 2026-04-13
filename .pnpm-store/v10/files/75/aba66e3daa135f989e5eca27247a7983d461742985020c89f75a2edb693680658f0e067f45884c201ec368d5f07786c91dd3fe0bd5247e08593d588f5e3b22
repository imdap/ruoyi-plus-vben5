import extendsObject_default from "../../_util/extendsObject.js";
import { computed, shallowRef, unref } from "vue";

//#region src/table/hooks/usePagination.ts
const DEFAULT_PAGE_SIZE = 10;
function getPaginationParam(mergedPagination, pagination) {
	const param = {
		current: mergedPagination.current,
		pageSize: mergedPagination.pageSize
	};
	const paginationObj = pagination && typeof pagination === "object" ? pagination : {};
	Object.keys(paginationObj).forEach((pageProp) => {
		const value = mergedPagination[pageProp];
		if (typeof value !== "function") param[pageProp] = value;
	});
	return param;
}
function usePagination(total, onChange, pagination) {
	const paginationRef = computed(() => unref(pagination));
	const totalRef = computed(() => unref(total));
	const paginationObj = computed(() => paginationRef.value && typeof paginationRef.value === "object" ? paginationRef.value : {});
	const paginationTotal = computed(() => paginationObj.value?.total ?? 0);
	const innerPagination = shallowRef({
		current: "defaultCurrent" in paginationObj.value ? paginationObj.value.defaultCurrent : 1,
		pageSize: "defaultPageSize" in paginationObj.value ? paginationObj.value.defaultPageSize : DEFAULT_PAGE_SIZE
	});
	const mergedPagination = computed(() => {
		if (paginationRef.value === false) return {};
		const merged = extendsObject_default(innerPagination.value, paginationObj.value, { total: paginationTotal.value > 0 ? paginationTotal.value : totalRef.value });
		const maxPage = Math.ceil((paginationTotal.value || totalRef.value || 0) / (merged.pageSize || DEFAULT_PAGE_SIZE));
		if (merged.current && merged.current > maxPage) merged.current = maxPage || 1;
		return merged;
	});
	const refreshPagination = (current, pageSize) => {
		if (paginationRef.value === false) return;
		innerPagination.value = {
			current: current ?? 1,
			pageSize: pageSize || mergedPagination.value.pageSize
		};
	};
	const onInternalChange = (current, pageSize) => {
		if (paginationRef.value && typeof paginationRef.value === "object") paginationRef.value.onChange?.(current, pageSize);
		refreshPagination(current, pageSize);
		onChange(current, pageSize || mergedPagination.value.pageSize || DEFAULT_PAGE_SIZE);
	};
	return [computed(() => {
		if (paginationRef.value === false) return {};
		return {
			...mergedPagination.value,
			onChange: onInternalChange
		};
	}), refreshPagination];
}

//#endregion
export { DEFAULT_PAGE_SIZE, usePagination as default, getPaginationParam };