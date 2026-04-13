import { isFragment } from "./isFragment.js";
function toArray(children, option = {}) {
	let ret = [];
	if (!Array.isArray(children)) children = [children];
	for (const child of children) {
		if ((child === void 0 || child === null) && !option.keepEmpty) continue;
		if (Array.isArray(child)) ret = ret.concat(toArray(child, option));
		else if (isFragment(child) && child.children) ret = ret.concat(toArray(child.children, option));
		else ret.push(child);
	}
	return ret;
}
export { toArray };
