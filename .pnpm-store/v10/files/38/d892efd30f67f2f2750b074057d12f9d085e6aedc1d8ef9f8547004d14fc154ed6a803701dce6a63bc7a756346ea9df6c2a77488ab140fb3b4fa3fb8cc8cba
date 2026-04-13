import AsyncTaskManagerDebugError from './AsyncTaskManagerDebugError.js';
// We need to set this as a global constant, so that using fake timers in Jest and Vitest won't override this on the global object.
const TIMER = {
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
    clearImmediate: globalThis.clearImmediate.bind(globalThis)
};
/**
 * Handles async tasks.
 */
export default class AsyncTaskManager {
    static taskID = 0;
    runningTasks = {};
    runningTaskCount = 0;
    runningTimers = [];
    runningImmediates = [];
    debugTrace = new Map();
    waitUntilCompleteTimer = null;
    waitUntilCompleteResolvers = [];
    destroyed = false;
    #debugTimeout = null;
    #browserFrame;
    /**
     * Constructor.
     *
     * @param browserFrame Browser frame.
     */
    constructor(browserFrame) {
        this.#browserFrame = browserFrame;
    }
    /**
     * Returns a promise that is resolved when async tasks are complete.
     *
     * @returns Promise.
     */
    waitUntilComplete() {
        return new Promise((resolve, reject) => {
            this.waitUntilCompleteResolvers.push({ resolve, reject });
            this.resolveWhenComplete();
        });
    }
    /**
     * Aborts all tasks.
     */
    abort() {
        if (this.destroyed) {
            return new Promise((resolve, reject) => {
                this.waitUntilCompleteResolvers.push({ resolve, reject });
                this.resolveWhenComplete();
            });
        }
        return this.abortAll(false);
    }
    /**
     * Destroys the manager.
     */
    destroy() {
        if (this.destroyed) {
            return new Promise((resolve, reject) => {
                this.waitUntilCompleteResolvers.push({ resolve, reject });
                this.resolveWhenComplete();
            });
        }
        return this.abortAll(true);
    }
    /**
     * Starts a timer.
     *
     * @param timerID Timer ID.
     */
    startTimer(timerID) {
        if (this.destroyed) {
            TIMER.clearTimeout(timerID);
            return;
        }
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        this.runningTimers.push(timerID);
        if (this.#browserFrame.page.context.browser.settings.debug.traceWaitUntilComplete > 0) {
            this.debugTrace.set(timerID, new AsyncTaskManagerDebugError().stack);
        }
    }
    /**
     * Ends a timer.
     *
     * @param timerID Timer ID.
     */
    endTimer(timerID) {
        if (this.destroyed) {
            TIMER.clearTimeout(timerID);
            return;
        }
        const index = this.runningTimers.indexOf(timerID);
        if (index !== -1) {
            this.runningTimers.splice(index, 1);
            this.resolveWhenComplete();
        }
        if (this.#browserFrame.page.context.browser.settings.debug.traceWaitUntilComplete > 0) {
            this.debugTrace.delete(timerID);
        }
    }
    /**
     * Starts an immediate.
     *
     * @param immediateID Immediate ID.
     */
    startImmediate(immediateID) {
        if (this.destroyed) {
            TIMER.clearImmediate(immediateID);
            return;
        }
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        this.runningImmediates.push(immediateID);
        if (this.#browserFrame.page?.context?.browser?.settings?.debug?.traceWaitUntilComplete > 0) {
            this.debugTrace.set(immediateID, new AsyncTaskManagerDebugError().stack);
        }
    }
    /**
     * Ends an immediate.
     *
     * @param immediateID Immediate ID.
     */
    endImmediate(immediateID) {
        if (this.destroyed) {
            TIMER.clearImmediate(immediateID);
            return;
        }
        const index = this.runningImmediates.indexOf(immediateID);
        if (index !== -1) {
            this.runningImmediates.splice(index, 1);
            this.resolveWhenComplete();
        }
        if (this.#browserFrame.page.context.browser.settings.debug.traceWaitUntilComplete > 0) {
            this.debugTrace.delete(immediateID);
        }
    }
    /**
     * Starts an async task.
     *
     * @param abortHandler Abort handler.
     * @returns Task ID.
     */
    startTask(abortHandler) {
        if (this.destroyed) {
            if (abortHandler) {
                abortHandler(this.destroyed);
            }
            throw new this.#browserFrame.window.Error(`Failed to execute 'startTask()' on 'AsyncTaskManager': The asynchronous task manager has been destroyed. This error can be thrown if scripts continue to run while a browser frame is closed.`);
        }
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        const taskID = this.newTaskID();
        this.runningTasks[taskID] = abortHandler ? abortHandler : () => { };
        this.runningTaskCount++;
        if (this.#browserFrame.page.context.browser.settings.debug.traceWaitUntilComplete > 0) {
            this.debugTrace.set(taskID, new AsyncTaskManagerDebugError().stack);
        }
        return taskID;
    }
    /**
     * Ends an async task.
     *
     * @param taskID Task ID.
     */
    endTask(taskID) {
        if (this.destroyed) {
            return;
        }
        if (this.runningTasks[taskID]) {
            delete this.runningTasks[taskID];
            this.runningTaskCount--;
            this.resolveWhenComplete();
        }
        if (this.#browserFrame.page.context.browser.settings.debug.traceWaitUntilComplete > 0) {
            this.debugTrace.delete(taskID);
        }
    }
    /**
     * Returns the amount of running tasks.
     *
     * @returns Count.
     */
    getTaskCount() {
        return this.runningTaskCount;
    }
    /**
     * Returns a new task ID.
     *
     * @returns Task ID.
     */
    newTaskID() {
        this.constructor.taskID++;
        return this.constructor.taskID;
    }
    /**
     * Resolves when complete.
     */
    resolveWhenComplete() {
        this.applyDebugging();
        if (this.runningTaskCount || this.runningTimers.length || this.runningImmediates.length) {
            return;
        }
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        // It is not possible to detect when all microtasks are complete (such as process.nextTick() or promises).
        // To cater for this we use setTimeout() which has the lowest priority and will be executed last.
        // @see https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
        this.waitUntilCompleteTimer = TIMER.setTimeout(() => {
            this.waitUntilCompleteTimer = null;
            if (!this.runningTaskCount && !this.runningTimers.length && !this.runningImmediates.length) {
                if (this.#debugTimeout) {
                    TIMER.clearTimeout(this.#debugTimeout);
                }
                const resolvers = this.waitUntilCompleteResolvers;
                this.waitUntilCompleteResolvers = [];
                for (const resolver of resolvers) {
                    resolver.resolve();
                }
                this.destroyed = false;
            }
            else {
                this.applyDebugging();
            }
        }, 1);
    }
    /**
     * Applies debugging.
     */
    applyDebugging() {
        const debug = this.#browserFrame.page.context.browser.settings.debug;
        if (!debug?.traceWaitUntilComplete || debug.traceWaitUntilComplete < 1) {
            return;
        }
        if (this.#debugTimeout) {
            return;
        }
        this.#debugTimeout = TIMER.setTimeout(() => {
            this.#debugTimeout = null;
            let errorMessage = `The maximum time was reached for "waitUntilComplete()".\n\n${this.debugTrace.size} task${this.debugTrace.size === 1 ? '' : 's'} did not end in time.\n\nThe following traces were recorded:\n\n`;
            let number = 1;
            for (const [key, value] of this.debugTrace.entries()) {
                const type = typeof key === 'number' ? 'Task' : 'Timer';
                errorMessage += `${type} #${number}\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾${value
                    .replace(/AsyncTaskManagerDebugError:{0,1}/, '')
                    .replace(/\s+at /gm, '\n> ')}\n\n`;
                number++;
            }
            const error = new Error(errorMessage);
            for (const resolver of this.waitUntilCompleteResolvers) {
                resolver.reject(error);
            }
            this.abortAll(true);
        }, debug.traceWaitUntilComplete);
    }
    /**
     * Aborts all tasks.
     *
     * @param destroy Destroy.
     */
    abortAll(destroy) {
        const runningTimers = this.runningTimers;
        const runningImmediates = this.runningImmediates;
        const runningTasks = this.runningTasks;
        if (destroy) {
            this.destroyed = true;
        }
        this.runningTasks = {};
        this.runningTaskCount = 0;
        this.runningImmediates = [];
        this.runningTimers = [];
        this.debugTrace = new Map();
        if (this.waitUntilCompleteTimer) {
            TIMER.clearTimeout(this.waitUntilCompleteTimer);
            this.waitUntilCompleteTimer = null;
        }
        for (const immediate of runningImmediates) {
            TIMER.clearImmediate(immediate);
        }
        for (const timer of runningTimers) {
            TIMER.clearTimeout(timer);
        }
        for (const key of Object.keys(runningTasks)) {
            runningTasks[key](destroy);
        }
        // We need to wait for microtasks to complete before resolving.
        return new Promise((resolve, reject) => {
            this.waitUntilCompleteResolvers.push({ resolve, reject });
            this.resolveWhenComplete();
        });
    }
}
//# sourceMappingURL=AsyncTaskManager.js.map