import * as path from "node:path";
//#region ../../node_modules/.pnpm/prettier-plugin-tailwindcss@0.0.0-insiders.3997fbd_prettier@3.8.1/node_modules/prettier-plugin-tailwindcss/dist/utils-D8dQkKEd.mjs
function isNodeLike(value) {
	return typeof (value === null || value === void 0 ? void 0 : value.type) === "string";
}
function visit(ast, callbackMap) {
	function _visit(node, path, meta) {
		if (typeof callbackMap === "function") {
			if (callbackMap(node, path, meta) === false) return;
		} else if (node.type in callbackMap) {
			if (callbackMap[node.type](node, path, meta) === false) return;
		}
		const keys = Object.keys(node);
		for (let i = 0; i < keys.length; i++) {
			const child = node[keys[i]];
			if (Array.isArray(child)) {
				for (let j = 0; j < child.length; j++) if (isNodeLike(child[j])) {
					let newMeta = { ...meta };
					let newPath = [{
						node: child[j],
						parent: node,
						key: keys[i],
						index: j,
						meta: newMeta
					}, ...path];
					_visit(child[j], newPath, newMeta);
				}
			} else if (isNodeLike(child)) {
				let newMeta = { ...meta };
				_visit(child, [{
					node: child,
					parent: node,
					key: keys[i],
					index: i,
					meta: newMeta
				}, ...path], newMeta);
			}
		}
	}
	let newMeta = {};
	_visit(ast, [{
		node: ast,
		parent: null,
		key: null,
		index: null,
		meta: newMeta
	}], newMeta);
}
function spliceChangesIntoString(str, changes) {
	if (!changes[0]) return str;
	changes.sort((a, b) => {
		return a.end - b.end || a.start - b.start;
	});
	let result = "";
	let previous = changes[0];
	result += str.slice(0, previous.start);
	result += previous.after;
	for (let i = 1; i < changes.length; ++i) {
		let change = changes[i];
		result += str.slice(previous.end, change.start);
		result += change.after;
		previous = change;
	}
	result += str.slice(previous.end);
	return result;
}
function bigSign(bigIntValue) {
	return Number(bigIntValue > 0n) - Number(bigIntValue < 0n);
}
function cacheForDirs(cache, inputDir, value, targetDir, makeKey = (dir) => dir) {
	let dir = inputDir;
	while (dir !== path.dirname(dir) && dir.length >= targetDir.length) {
		const key = makeKey(dir);
		if (cache.get(key) !== void 0) break;
		cache.set(key, value);
		if (dir === targetDir) break;
		dir = path.dirname(dir);
	}
}
//#endregion
export { visit as i, cacheForDirs as n, spliceChangesIntoString as r, bigSign as t };
