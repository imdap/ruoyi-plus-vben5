var raf = (callback) => +setTimeout(callback, 16);
var caf = (num) => clearTimeout(num);
if (typeof window !== "undefined" && "requestAnimationFrame" in window) {
	raf = (callback) => window.requestAnimationFrame(callback);
	caf = (handle) => window.cancelAnimationFrame(handle);
}
var rafUUID = 0;
var rafIds = /* @__PURE__ */ new Map();
function cleanup(id) {
	rafIds.delete(id);
}
function wrapperRaf(callback, times = 1) {
	rafUUID += 1;
	const id = rafUUID;
	function callRef(leftTimes) {
		if (leftTimes === 0) {
			cleanup(id);
			callback();
		} else {
			const realId = raf(() => {
				callRef(leftTimes - 1);
			});
			rafIds.set(id, realId);
		}
	}
	callRef(times);
	return id;
}
wrapperRaf.cancel = (id) => {
	const realId = rafIds.get(id);
	cleanup(id);
	return caf(realId);
};
if (process.env.NODE_ENV !== "production") wrapperRaf.ids = () => rafIds;
var raf_default = wrapperRaf;
function rafDebounce(fn) {
	let id = null;
	return () => {
		if (id !== null) wrapperRaf.cancel(id);
		id = wrapperRaf(fn);
	};
}
export { raf_default as default, rafDebounce };
