// Symbol.dispose ??= Symbol('Symbol.dispose');
// Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose');
export function createPerfTimer(name, onEnd, timeNowFn) {
    return new SimpleTimer(name, onEnd, timeNowFn);
}
class SimpleTimer {
    name;
    onEnd;
    timeNowFn;
    _start = performance.now();
    _elapsed = undefined;
    _running = true;
    constructor(name, onEnd, timeNowFn = performance.now) {
        this.name = name;
        this.onEnd = onEnd;
        this.timeNowFn = timeNowFn;
    }
    get startTime() {
        return this._start;
    }
    get elapsed() {
        return this._elapsed ?? performance.now() - this._start;
    }
    end() {
        if (!this._running)
            return;
        this._running = false;
        const end = performance.now();
        this._elapsed = end - this._start;
        this.onEnd?.(this._elapsed, this.name);
    }
    start() {
        this._start = performance.now();
        this._running = true;
    }
}
//# sourceMappingURL=timer.js.map