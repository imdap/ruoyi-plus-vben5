export interface Disposable {
    dispose(): void;
}
type EventListener<T, U = unknown> = (e: T) => U;
export interface EventFn<T, U = unknown> {
    /**
     * A function that represents an event to which you subscribe by calling it with
     * a listener function as argument.
     *
     * @param listener The listener function will be called when the event happens.
     * @returns A disposable which unsubscribes the event listener.
     */
    (listener: (e: T) => U): Disposable;
}
export type DisposableListener = Disposable;
export interface IEventEmitter<T> extends Disposable {
    readonly name: string;
    readonly on: EventFn<T>;
    fire(event: T): Error[] | undefined | void;
}
export declare function createEmitter<T>(name: string): IEventEmitter<T>;
export declare class EventEmitter<T> implements IEventEmitter<T> {
    #private;
    readonly name: string;
    constructor(name: string);
    /**
     * The event listeners can subscribe to.
     */
    readonly on: (listener: EventListener<T>) => Disposable;
    /**
     * Notify all subscribers of the {@link EventEmitter.on event}. Failure
     * of one or more listener will not fail this function call.
     *
     * @param data The event object.
     */
    fire(event: T): undefined | Error[];
    /**
     * Dispose this object and free resources.
     */
    readonly dispose: () => void;
}
export declare function onClearCache(listener: () => void): DisposableListener;
export declare function dispatchClearCache(): void;
export {};
//# sourceMappingURL=events.d.ts.map