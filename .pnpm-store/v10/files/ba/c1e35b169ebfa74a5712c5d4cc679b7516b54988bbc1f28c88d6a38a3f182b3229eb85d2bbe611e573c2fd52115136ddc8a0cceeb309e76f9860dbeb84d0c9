var MIN_SIZE = 20;
function getSpinSize(containerSize = 0, scrollRange = 0) {
	let baseSize = containerSize / scrollRange * containerSize;
	if (isNaN(baseSize)) baseSize = 0;
	baseSize = Math.max(baseSize, MIN_SIZE);
	return Math.floor(baseSize);
}
export { getSpinSize };
