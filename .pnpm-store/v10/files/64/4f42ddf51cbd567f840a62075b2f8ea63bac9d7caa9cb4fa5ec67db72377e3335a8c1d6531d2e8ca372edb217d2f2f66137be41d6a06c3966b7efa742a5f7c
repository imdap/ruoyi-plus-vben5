import EventTarget from '../event/EventTarget.js';
import * as PropertySymbol from '../PropertySymbol.js';
import Event from '../event/Event.js';
import type BrowserWindow from '../window/BrowserWindow.js';
/**
 * AbortSignal.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
 */
export default class AbortSignal extends EventTarget {
    protected static [PropertySymbol.window]: BrowserWindow;
    protected [PropertySymbol.window]: BrowserWindow;
    [PropertySymbol.aborted]: boolean;
    [PropertySymbol.reason]: any;
    onabort: ((this: AbortSignal, event: Event) => void) | null;
    /**
     * Constructor.
     */
    constructor();
    /**
     * Return a default description for the AbortSignal class.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Returns true if the signal has been aborted.
     *
     * @returns True if the signal has been aborted.
     */
    get aborted(): boolean;
    /**
     * Setter for aborted. Value will be ignored as the property is read-only.
     *
     * @param _value Aborted.
     */
    set aborted(_value: boolean);
    /**
     * Returns the reason the signal was aborted.
     *
     * @returns Reason.
     */
    get reason(): any;
    /**
     * Setter for reason. Value will be ignored as the property is read-only.
     *
     * @param _value Reason.
     */
    set reason(_value: any);
    /**
     * Aborts the signal.
     *
     * @param [reason] Reason.
     */
    [PropertySymbol.abort](reason?: any): void;
    /**
     * Throws an "AbortError" if the signal has been aborted.
     */
    throwIfAborted(): void;
    /**
     * Returns an AbortSignal instance that has been set as aborted.
     *
     * @param [reason] Reason.
     * @returns AbortSignal instance.
     */
    static abort(reason?: any): AbortSignal;
    /**
     * Returns an AbortSignal that will automatically abort after a specified
     * time.
     *
     * @param [time] Time in milliseconds.
     * @returns AbortSignal instance.
     */
    static timeout(time: number): AbortSignal;
    /**
     * Takes an iterable of abort signals and returns an AbortSignal that is
     * aborted when any of the input iterable abort signals are aborted.
     *
     * The abort reason will be set to the reason of the first signal that is
     * aborted. If any of the given abort signals are already aborted then so will
     * be the returned AbortSignal.
     *
     * @param [signals] Iterable of abort signals.
     * @returns AbortSignal instance.
     */
    static any(signals: AbortSignal[]): AbortSignal;
}
//# sourceMappingURL=AbortSignal.d.ts.map