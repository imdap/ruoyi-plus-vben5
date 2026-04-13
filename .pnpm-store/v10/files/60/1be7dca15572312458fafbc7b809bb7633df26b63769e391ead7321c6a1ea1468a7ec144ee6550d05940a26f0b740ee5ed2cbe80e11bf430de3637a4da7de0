import { RimrafAsyncOptions, RimrafOptions } from './index.js';
export declare const MAXBACKOFF = 200;
export declare const RATE = 1.2;
export declare const MAXRETRIES = 10;
export declare const codes: Set<string>;
export declare const retryBusy: <T>(fn: (path: string) => Promise<T>) => (path: string, opt: RimrafAsyncOptions, backoff?: number, total?: number) => Promise<T>;
export declare const retryBusySync: <T>(fn: (path: string) => T) => (path: string, opt: RimrafOptions) => T;
//# sourceMappingURL=retry-busy.d.ts.map