//#region src/performance.ts
const symbolCSpell = Symbol.for("cspell");
const globalThisCSpell = globalThis;
function measurePerfStart(name) {
	_measurePerfStart(name, isEnabledPerformanceMeasurements());
}
function measurePerfEnd(name) {
	_measurePerfEnd(name, isEnabledPerformanceMeasurements());
}
function _measurePerfStart(name, enabled) {
	if (!enabled) return;
	performance.mark(name + "-start");
}
function _measurePerfEnd(name, enabled) {
	if (!enabled) return;
	performance.mark(name + "-end");
	performance.measure(name, name + "-start", name + "-end");
}
/**
* Creates performance marks and measures the time taken between them.
* @param name - name of the performance entry
* @returns a function to stop the timer.
*/
function measurePerf(name) {
	const enabled = isEnabledPerformanceMeasurements();
	_measurePerfStart(name, enabled);
	return makeDisposableFunction(() => {
		_measurePerfEnd(name, enabled);
	});
}
function makeDisposableFunction(fn) {
	const disposableFn = fn;
	disposableFn[Symbol.dispose] = fn;
	disposableFn[Symbol.asyncDispose] = () => (fn(), Promise.resolve());
	return disposableFn;
}
/**
* Enable or disable performance measurements.
* @param enable - true to enable, false to disable. Default is true.
*/
function enablePerformanceMeasurements(enable = true) {
	globalThisCSpell[symbolCSpell] ??= {};
	globalThisCSpell[symbolCSpell].enablePerformanceMeasurements = enable;
}
function isEnabledPerformanceMeasurements() {
	return !!globalThisCSpell[symbolCSpell]?.enablePerformanceMeasurements;
}
//#endregion
export { enablePerformanceMeasurements, measurePerf, measurePerfEnd, measurePerfStart };

//# sourceMappingURL=index.js.map