import type IBrowserFrame from '../../browser/types/IBrowserFrame.js';
/**
 * Document ready state manager.
 */
export default class DocumentReadyStateManager {
    #private;
    /**
     * Constructor.
     *
     * @param browserFrame Browser frame.
     */
    constructor(browserFrame: IBrowserFrame);
    /**
     * Returns a promise that is fulfilled when ready state is complete.
     *
     * @returns Promise.
     */
    waitUntilComplete(): Promise<void>;
    /**
     * Starts a task.
     *
     * @returns Task ID.
     */
    startTask(): number;
    /**
     * Ends a task.
     *
     * @param taskID Task ID.
     */
    endTask(taskID: number): void;
    /**
     * Destroys the manager.
     */
    destroy(): Promise<void>;
}
//# sourceMappingURL=DocumentReadyStateManager.d.ts.map