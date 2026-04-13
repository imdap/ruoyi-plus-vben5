import { toError } from '../util/errors.js';
export function createEmitter(name) {
    return new EventEmitter(name);
}
export class EventEmitter {
    name;
    #listeners = new Set();
    constructor(name) {
        this.name = name;
    }
    /**
     * The event listeners can subscribe to.
     */
    on = (listener) => {
        this.#listeners.add(listener);
        return {
            dispose: () => {
                this.#listeners.delete(listener);
            },
        };
    };
    /**
     * Notify all subscribers of the {@link EventEmitter.on event}. Failure
     * of one or more listener will not fail this function call.
     *
     * @param data The event object.
     */
    fire(event) {
        let errors;
        for (const listener of this.#listeners) {
            try {
                listener(event);
            }
            catch (e) {
                errors = errors ?? [];
                errors.push(toError(e));
            }
        }
        return errors;
    }
    /**
     * Dispose this object and free resources.
     */
    dispose = () => {
        this.#listeners.clear();
    };
}
/**
 * Event indicating that the cache should be cleared.
 */
class ClearCacheEvent extends EventEmitter {
    constructor() {
        super(ClearCacheEvent.eventName);
    }
    static eventName = 'clear-cache';
}
const clearCacheEvent = new ClearCacheEvent();
export function onClearCache(listener) {
    return clearCacheEvent.on(listener);
}
export function dispatchClearCache() {
    clearCacheEvent.fire(undefined);
}
//# sourceMappingURL=events.js.map