import AsyncTaskManager from '../../async-task-manager/AsyncTaskManager.js';
/**
 * Document ready state manager.
 */
export default class DocumentReadyStateManager {
    #asyncTaskManager;
    /**
     * Constructor.
     *
     * @param browserFrame Browser frame.
     */
    constructor(browserFrame) {
        this.#asyncTaskManager = new AsyncTaskManager(browserFrame);
    }
    /**
     * Returns a promise that is fulfilled when ready state is complete.
     *
     * @returns Promise.
     */
    waitUntilComplete() {
        return this.#asyncTaskManager.waitUntilComplete();
    }
    /**
     * Starts a task.
     *
     * @returns Task ID.
     */
    startTask() {
        return this.#asyncTaskManager.startTask();
    }
    /**
     * Ends a task.
     *
     * @param taskID Task ID.
     */
    endTask(taskID) {
        this.#asyncTaskManager.endTask(taskID);
    }
    /**
     * Destroys the manager.
     */
    destroy() {
        return this.#asyncTaskManager.destroy();
    }
}
//# sourceMappingURL=DocumentReadyStateManager.js.map