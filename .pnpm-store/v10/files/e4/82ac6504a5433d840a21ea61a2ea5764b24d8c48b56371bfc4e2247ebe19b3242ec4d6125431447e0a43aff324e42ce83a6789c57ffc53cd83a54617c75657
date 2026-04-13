import { CSpellRPCClient } from "cspell-lib/cspell-rpc";

//#region src/cspellWorker.d.ts
declare function startCSpellWorker(): CSpellWorker;
interface CSpellWorker {
  ready: Promise<boolean>;
  isReadyNow: boolean;
  numberOfPendingRequests: number;
  ok: (timeoutMs?: number) => Promise<boolean>;
  api: CSpellRPCClient["getApi"];
  client: CSpellRPCClient;
  [Symbol.asyncDispose](): Promise<void>;
}
//#endregion
//#region src/cspellWorkerPool.d.ts
interface CSpellWorkerPoolOptions {
  /**
  * The maximum number of workers to create in the pool.
  */
  maxWorkers?: number;
  /**
  * The minimum number of workers to create in the pool.
  */
  minWorkers?: number;
  /**
  * The maximum number of pending tasks allowed per worker before the worker is considered unavailable.
  */
  maxPendingTasksPerWorker?: number;
}
interface GetAvailableWorkerOptions {
  /**
  * If true, only return ready workers.
  */
  onlyReady?: boolean;
  /**
  * If true, only return workers that do not have pending requests.
  */
  onlyIdle?: boolean;
  /**
  * If true, start a new worker if no available worker is found.
  */
  autostart?: boolean;
}
declare class CSpellWorkerPool {
  #private;
  constructor(options?: CSpellWorkerPoolOptions);
  get size(): number;
  get maxWorkers(): number;
  get minWorkers(): number;
  get maxPendingTasksPerWorker(): number;
  set maxPendingTasksPerWorker(value: number);
  getAvailableWorker(options?: GetAvailableWorkerOptions): CSpellWorker | undefined;
  stopWorker(worker: CSpellWorker): Promise<void>;
  [Symbol.asyncDispose](): Promise<void>;
}
//#endregion
export { type CSpellWorker, CSpellWorkerPool, type CSpellWorkerPoolOptions, type GetAvailableWorkerOptions, startCSpellWorker };
//# sourceMappingURL=index.d.ts.map