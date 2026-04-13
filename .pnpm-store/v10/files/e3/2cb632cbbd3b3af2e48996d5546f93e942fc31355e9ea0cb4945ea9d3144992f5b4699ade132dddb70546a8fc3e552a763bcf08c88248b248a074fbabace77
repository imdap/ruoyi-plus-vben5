//#region src/performance.d.ts
declare function measurePerfStart(name: string): void;
declare function measurePerfEnd(name: string): void;
type DisposableFunction = (() => void) & Disposable & AsyncDisposable;
/**
* Creates performance marks and measures the time taken between them.
* @param name - name of the performance entry
* @returns a function to stop the timer.
*/
declare function measurePerf(name: string): DisposableFunction;
/**
* Enable or disable performance measurements.
* @param enable - true to enable, false to disable. Default is true.
*/
declare function enablePerformanceMeasurements(enable?: boolean): void;
//#endregion
export { enablePerformanceMeasurements, measurePerf, measurePerfEnd, measurePerfStart };
//# sourceMappingURL=index.d.ts.map