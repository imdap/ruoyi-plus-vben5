function get(entity, path) {
	let current = entity;
	for (let i = 0; i < path.length; i += 1) {
		if (current === null || current === void 0) return void 0;
		current = current[path[i]];
	}
	return current;
}
export { get as default };
