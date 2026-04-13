import warning_default from "./warning.js";
function isEqual(obj1, obj2, shallow = false) {
	const refSet = /* @__PURE__ */ new Set();
	function deepEqual(a, b, level = 1) {
		const circular = refSet.has(a);
		warning_default(!circular, "Warning: There may be circular references");
		if (circular) return false;
		if (a === b) return true;
		if (shallow && level > 1) return false;
		refSet.add(a);
		const newLevel = level + 1;
		if (Array.isArray(a)) {
			if (!Array.isArray(b) || a.length !== b.length) return false;
			for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i], newLevel)) return false;
			return true;
		}
		if (a && b && typeof a === "object" && typeof b === "object") {
			const keys = Object.keys(a);
			if (keys.length !== Object.keys(b).length) return false;
			return keys.every((key) => deepEqual(a[key], b[key], newLevel));
		}
		return false;
	}
	return deepEqual(obj1, obj2);
}
var isEqual_default = isEqual;
export { isEqual_default as default };
