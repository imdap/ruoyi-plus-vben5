import { MessageChannel, Worker } from "node:worker_threads";
import { createCSpellRPCClient } from "cspell-lib/cspell-rpc";
import { cpus } from "node:os";
//#region src/cspellWorker.ts
function startCSpellWorker() {
	const { port1, port2 } = new MessageChannel();
	return new CSpellWorkerImpl({
		worker: new Worker(new URL("worker.js", import.meta.url), {
			workerData: { port: port1 },
			transferList: [port1],
			stderr: true,
			stdout: true
		}),
		port: port2
	});
}
var CSpellWorkerImpl = class {
	#terminated = false;
	#worker;
	#client;
	constructor(instance) {
		this.#worker = instance.worker;
		this.#client = createCSpellRPCClient({ port: instance.port });
	}
	get ready() {
		return this.#client.ready();
	}
	get isReadyNow() {
		return this.#client.isReady;
	}
	get numberOfPendingRequests() {
		return this.#client.length;
	}
	get client() {
		return this.#client;
	}
	get isTerminated() {
		return this.#terminated;
	}
	ok(timeoutMs) {
		return this.#client.isOK({ timeoutMs });
	}
	terminate() {
		return this[Symbol.asyncDispose]();
	}
	api() {
		return this.#client.getApi();
	}
	async [Symbol.asyncDispose]() {
		if (this.#terminated) return;
		this.#terminated = true;
		this.#client[Symbol.dispose]();
		await this.#worker.terminate();
	}
};
//#endregion
//#region src/cspellWorkerPool.ts
const MAX_WORKERS_TO_CORES_RATIO = .75;
const DEFAULT_WORKERS_TO_CORES_RATIO = .5;
var CSpellWorkerPool = class {
	#workers;
	#options;
	#maxWorkers;
	#minWorkers;
	#maxPendingTasksPerWorker;
	constructor(options) {
		this.#workers = /* @__PURE__ */ new Set();
		this.#options = options || {};
		this.#maxPendingTasksPerWorker = this.#options.maxPendingTasksPerWorker ?? 1;
		this.#maxPendingTasksPerWorker = Math.max(1, this.#maxPendingTasksPerWorker);
		const numCores = cpus().length;
		this.#maxWorkers = this.#options.maxWorkers ?? Math.ceil(numCores * DEFAULT_WORKERS_TO_CORES_RATIO);
		this.#maxWorkers = Math.min(this.#maxWorkers, Math.ceil(numCores * MAX_WORKERS_TO_CORES_RATIO));
		this.#maxWorkers = Math.max(1, this.#maxWorkers);
		this.#minWorkers = Math.min(this.#options.minWorkers ?? 0, this.#maxWorkers);
		for (let i = 0; i < this.#minWorkers; i++) this.#createWorker();
	}
	#createWorker() {
		const w = startCSpellWorker();
		this.#workers.add(w);
		return w;
	}
	get size() {
		return this.#workers.size;
	}
	get maxWorkers() {
		return this.#maxWorkers;
	}
	get minWorkers() {
		return this.#minWorkers;
	}
	get maxPendingTasksPerWorker() {
		return this.#maxPendingTasksPerWorker;
	}
	set maxPendingTasksPerWorker(value) {
		this.#maxPendingTasksPerWorker = Math.max(1, value);
	}
	getAvailableWorker(options) {
		let workers = [...this.#workers];
		workers = workers.filter((worker) => worker.numberOfPendingRequests < this.#maxPendingTasksPerWorker);
		workers = options?.onlyReady ? workers.filter((worker) => worker.isReadyNow) : workers;
		workers = options?.onlyIdle ? workers.filter((worker) => worker.numberOfPendingRequests === 0) : workers;
		workers.sort((a, b) => {
			let v = 0;
			v = (a.isReadyNow ? 0 : 1) - (b.isReadyNow ? 0 : 1);
			if (v !== 0) return v;
			v = a.numberOfPendingRequests - b.numberOfPendingRequests;
			return v;
		});
		if (workers.length > 0) return workers[0];
		if (options?.autostart && this.#workers.size < this.#maxWorkers) return this.#createWorker();
	}
	stopWorker(worker) {
		this.#workers.delete(worker);
		return worker[Symbol.asyncDispose]();
	}
	[Symbol.asyncDispose]() {
		const workers = [...this.#workers];
		this.#workers.clear();
		return Promise.all(workers.map((w) => this.stopWorker(w).catch(() => void 0))).then(() => void 0);
	}
};
//#endregion
export { CSpellWorkerPool, startCSpellWorker };

//# sourceMappingURL=index.js.map