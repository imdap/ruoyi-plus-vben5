import canUseDom from "@v-c/util/dist/Dom/canUseDom";
import warning from "@v-c/util/dist/warning";
//#region src/util.ts
function parseWidthHeight(value) {
	if (typeof value === "string") {
		const num = Number(value.replace(/px$/i, ""));
		if (parseFloat(value) === num) warning(false, "Invalid value type of `width` or `height` which should be number type instead.");
		if (!Number.isNaN(num)) return num;
	}
	return value;
}
function warnCheck(props) {
	warning(!props.wrapperClassName, `'wrapperClassName' is removed. Please use 'rootClassName' instead.`);
	warning(canUseDom() || !props.open, `Drawer with 'open' in SSR is not work since no place to createPortal. Please move to 'useEffect' instead.`);
}
//#endregion
export { parseWidthHeight, warnCheck };
