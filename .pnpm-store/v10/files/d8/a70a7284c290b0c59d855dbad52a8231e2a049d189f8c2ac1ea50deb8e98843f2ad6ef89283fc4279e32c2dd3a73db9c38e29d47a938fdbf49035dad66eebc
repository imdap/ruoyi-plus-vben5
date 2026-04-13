import type IMutationObserverInit from './IMutationObserverInit.js';
import type MutationObserver from './MutationObserver.js';
import type MutationRecord from './MutationRecord.js';
import type Node from '../nodes/node/Node.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type IMutationListener from './IMutationListener.js';
/**
 * Mutation Observer Listener.
 */
export default class MutationObserverListener {
    #private;
    target: Node;
    options: IMutationObserverInit;
    mutationListener: IMutationListener;
    /**
     * Constructor.
     *
     * @param init Options.
     * @param init.window Window.
     * @param init.options Options.
     * @param init.target Target.
     * @param init.observer Observer.
     * @param init.callback Callback.
     */
    constructor(init: {
        window: BrowserWindow;
        options: IMutationObserverInit;
        target: Node;
        observer: MutationObserver;
        callback: (record: MutationRecord[], observer: MutationObserver) => void;
    });
    /**
     * Reports mutations.
     *
     * @param record Record.
     */
    report(record: MutationRecord): void;
    /**
     * Destroys the listener.
     */
    takeRecords(): MutationRecord[];
    /**
     * Destroys the listener.
     */
    destroy(): void;
}
//# sourceMappingURL=MutationObserverListener.d.ts.map