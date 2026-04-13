//#region src/pagination/useShowSizeChanger.ts
function resolveShowSizeChanger(showSizeChanger) {
	if (typeof showSizeChanger === "boolean") return {
		show: showSizeChanger,
		selectProps: {}
	};
	if (showSizeChanger && typeof showSizeChanger === "object") return {
		show: true,
		selectProps: showSizeChanger
	};
	return {
		show: void 0,
		selectProps: void 0
	};
}

//#endregion
export { resolveShowSizeChanger as default };