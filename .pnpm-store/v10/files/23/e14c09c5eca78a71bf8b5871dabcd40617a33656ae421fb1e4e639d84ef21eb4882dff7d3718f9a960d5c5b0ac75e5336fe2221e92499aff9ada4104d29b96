export interface PerfTimer {
    readonly name: string;
    readonly startTime: number;
    readonly elapsed: number;
    start(): void;
    end(): void;
}
type TimeNowFn = () => number;
export declare function createPerfTimer(name: string, onEnd?: (elapsed: number, name: string) => void, timeNowFn?: TimeNowFn): PerfTimer;
export {};
//# sourceMappingURL=timer.d.ts.map