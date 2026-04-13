import VirtualConsoleLogLevelEnum from './enums/VirtualConsoleLogLevelEnum.js';
import Event from '../event/Event.js';
import VirtualConsoleLogEntryStringifier from './utilities/VirtualConsoleLogEntryStringifier.js';
/**
 * Virtual console printer.
 */
export default class VirtualConsolePrinter {
    #logEntries = [];
    #listeners = { print: [], clear: [] };
    #closed = false;
    /**
     * Returns closed state.
     *
     * @returns True if the printer is closed.
     */
    get closed() {
        return this.#closed;
    }
    /**
     * Writes to the output.
     *
     * @param logEntry Log entry.
     */
    print(logEntry) {
        if (this.#closed) {
            return;
        }
        this.#logEntries.push(logEntry);
        this.dispatchEvent(new Event('print'));
    }
    /**
     * Clears the output.
     */
    clear() {
        if (this.#closed) {
            return;
        }
        this.#logEntries = [];
        this.dispatchEvent(new Event('clear'));
    }
    /**
     * Clears and closes the virtual console printer.
     */
    close() {
        if (this.#closed) {
            return;
        }
        this.#logEntries = [];
        this.#listeners = { print: [], clear: [] };
        this.#closed = true;
    }
    /**
     * Adds an event listener.
     *
     * @param eventType Event type ("print" or "clear").
     * @param listener Listener.
     */
    addEventListener(eventType, listener) {
        if (this.#closed) {
            return;
        }
        if (!this.#listeners[eventType]) {
            throw new Error(`Event type "${eventType}" is not supported.`);
        }
        this.#listeners[eventType].push(listener);
    }
    /**
     * Removes an event listener.
     *
     * @param eventType Event type ("print" or "clear").
     * @param listener Listener.
     */
    removeEventListener(eventType, listener) {
        if (this.#closed) {
            return;
        }
        if (!this.#listeners[eventType]) {
            throw new Error(`Event type "${eventType}" is not supported.`);
        }
        const index = this.#listeners[eventType].indexOf(listener);
        if (index !== -1) {
            this.#listeners[eventType].splice(index, 1);
        }
    }
    /**
     * Dispatches an event.
     *
     * @param event Event.
     */
    dispatchEvent(event) {
        if (this.#closed) {
            return;
        }
        switch (event.type) {
            case 'print':
            case 'clear':
                for (const listener of this.#listeners[event.type]) {
                    listener(event);
                }
                break;
            default:
                throw new Error(`Event type "${event.type}" is not supported.`);
        }
    }
    /**
     * Reads the buffer.
     *
     * @returns Console log entries.
     */
    read() {
        const logEntries = this.#logEntries;
        this.#logEntries = [];
        return logEntries;
    }
    /**
     * Returns the buffer as a string.
     *
     * @param [logLevel] Log level.
     * @returns Buffer as a string of concatenated log entries.
     */
    readAsString(logLevel = VirtualConsoleLogLevelEnum.log) {
        const logEntries = this.read();
        let output = '';
        for (const logEntry of logEntries) {
            if (logEntry.level >= logLevel) {
                output += VirtualConsoleLogEntryStringifier.toString(logEntry);
            }
        }
        return output;
    }
}
//# sourceMappingURL=VirtualConsolePrinter.js.map