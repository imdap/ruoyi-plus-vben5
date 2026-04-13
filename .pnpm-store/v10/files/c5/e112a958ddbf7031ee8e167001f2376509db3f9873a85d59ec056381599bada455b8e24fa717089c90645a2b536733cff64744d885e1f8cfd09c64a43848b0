function createArray() {
	const arr = [];
	arr.__proto__ = [];
	arr.__proto__.format = function toString() {
		return this.map((obj) => ({
			...obj,
			path: obj.path.join(" > ")
		}));
	};
	arr.__proto__.toString = function toString() {
		return JSON.stringify(this.format(), null, 2);
	};
	return arr;
}
function diff(obj1, obj2, depth = 10, path = [], diffList = createArray()) {
	if (depth <= 0) return diffList;
	new Set([...Object.keys(obj1), ...Object.keys(obj2)]).forEach((key) => {
		const value1 = obj1[key];
		const value2 = obj2[key];
		if (value1 === value2) return;
		const type1 = typeof value1;
		if (type1 !== typeof value2) {
			diffList.push({
				path: path.concat(key),
				value1,
				value2
			});
			return;
		}
		if (Number.isNaN(value1) && Number.isNaN(value2)) return;
		if (type1 === "object" && value1 !== null && value2 !== null) {
			diff(value1, value2, depth - 1, path.concat(key), diffList);
			return;
		}
		diffList.push({
			path: path.concat(key),
			value1,
			value2
		});
	});
	return diffList;
}
export { diff as default };
