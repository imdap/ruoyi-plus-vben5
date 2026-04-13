function getMaskRange(key) {
	return {
		YYYY: [
			0,
			9999,
			(/* @__PURE__ */ new Date()).getFullYear()
		],
		MM: [1, 12],
		DD: [1, 31],
		HH: [0, 23],
		mm: [0, 59],
		ss: [0, 59],
		SSS: [0, 999]
	}[key];
}
function raf(callback, delayFrames = 1) {
	let id;
	let remainingFrames = delayFrames;
	function internalCallback() {
		remainingFrames -= 1;
		if (remainingFrames <= 0) callback();
		else id = requestAnimationFrame(internalCallback);
	}
	id = requestAnimationFrame(internalCallback);
	return id;
}
raf.cancel = (id) => {
	cancelAnimationFrame(id);
};
export { getMaskRange, raf };
