import { unit } from "../../util/index.js";

//#region src/cssinjs-utils/util/maxmin.ts
function genMaxMin(type) {
	if (type === "js") return {
		max: Math.max,
		min: Math.min
	};
	return {
		max: (...args) => `max(${args.map((value) => unit(value)).join(",")})`,
		min: (...args) => `min(${args.map((value) => unit(value)).join(",")})`
	};
}
var maxmin_default = genMaxMin;

//#endregion
export { maxmin_default as default };