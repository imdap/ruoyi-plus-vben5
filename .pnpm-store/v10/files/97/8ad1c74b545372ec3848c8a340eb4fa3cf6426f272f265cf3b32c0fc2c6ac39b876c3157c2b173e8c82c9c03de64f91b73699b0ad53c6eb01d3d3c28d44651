import { getSlotPropsFnRun } from "../_util/tools.js";

//#region src/select/useShowArrow.ts
/**
* Since Select, TreeSelect, Cascader is same Select like component.
* We just use same hook to handle this logic.
*
* If `suffixIcon` is not equal to `null`, always show it.
*/
function useShowArrow(suffixIcon, showArrow) {
	showArrow = getSlotPropsFnRun({}, { suffixIcon }, "suffixIcon");
	return showArrow !== void 0 ? showArrow : suffixIcon !== null;
}

//#endregion
export { useShowArrow as default };