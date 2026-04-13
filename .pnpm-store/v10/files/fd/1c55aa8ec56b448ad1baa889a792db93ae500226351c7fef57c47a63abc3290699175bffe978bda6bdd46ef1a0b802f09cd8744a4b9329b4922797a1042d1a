function watchState() {
	let states = [];
	return (fn, args) => {
		states = JSON.stringify(args);
		return fn(args, states);
	};
}
function renderFirstTrigger() {
	let triggered = false;
	return (fn, args) => {
		if (!triggered) {
			triggered = true;
			return fn(args);
		}
	};
}
export { renderFirstTrigger, watchState };
