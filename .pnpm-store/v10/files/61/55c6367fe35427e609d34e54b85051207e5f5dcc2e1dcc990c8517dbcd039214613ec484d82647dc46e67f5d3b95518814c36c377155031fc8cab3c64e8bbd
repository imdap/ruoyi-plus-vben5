import { toRef } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/_util/tools.ts
function getSlotPropFn(slots, props, key) {
	const fn = slots[key] || props[key];
	if (typeof fn === "function") return fn;
	return () => [fn];
}
function getSlotPropsFnRun(slots, props, key, isNull = true, params) {
	const fn = getSlotPropFn(slots, props, key);
	if (typeof fn === "function") {
		let node = fn?.(params);
		if (!Array.isArray(node)) node = [node];
		if (node && node.length === 1 && node[0] === null) return null;
		const nodes = filterEmpty(node).filter((node) => node !== void 0 && node !== null);
		if (nodes.length) {
			if (nodes.length === 1) return nodes[0];
			return nodes;
		}
		return isNull ? null : void 0;
	}
	return fn;
}
function toPropsRefs(obj, ...args) {
	const _res = {};
	args.forEach((key) => {
		_res[key] = toRef(obj, key);
	});
	return _res;
}
const clsx = classNames;

//#endregion
export { clsx, getSlotPropFn, getSlotPropsFnRun, toPropsRefs };