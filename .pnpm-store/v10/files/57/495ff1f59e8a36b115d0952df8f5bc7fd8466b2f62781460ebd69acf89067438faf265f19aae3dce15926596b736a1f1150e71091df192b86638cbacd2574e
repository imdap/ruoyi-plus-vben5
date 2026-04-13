import { warning } from "@v-c/util";
function useCellRender(cellRender, dateRender, monthCellRender, range) {
	if (process.env.NODE_ENV !== "production") {
		warning(!dateRender?.value, `'dateRender' is deprecated. Please use 'cellRender' instead.`);
		warning(!monthCellRender?.value, `'monthCellRender' is deprecated. Please use 'cellRender' instead.`);
	}
	const mergedCellRender = (current, info) => {
		if (cellRender.value) return cellRender.value(current, info);
		const date = current;
		if (dateRender?.value && info.type === "date") return dateRender.value(date, info.today);
		if (monthCellRender?.value && info.type === "month") return monthCellRender.value(date, info.locale);
		return info.originNode;
	};
	const onInternalCellRender = (date, info) => mergedCellRender(date, {
		...info,
		range: range?.value
	});
	return onInternalCellRender;
}
export { useCellRender as default };
