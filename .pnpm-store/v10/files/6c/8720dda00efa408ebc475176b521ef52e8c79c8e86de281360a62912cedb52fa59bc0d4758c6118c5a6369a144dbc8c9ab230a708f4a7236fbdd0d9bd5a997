import type IVirtualConsoleLogEntry from './IVirtualConsoleLogEntry.js';
import VirtualConsoleLogLevelEnum from './enums/VirtualConsoleLogLevelEnum.js';
import Event from '../event/Event.js';
import type IVirtualConsolePrinter from './IVirtualConsolePrinter.js';
/**
 * Virtual console printer.
 */
export default class VirtualConsolePrinter implements IVirtualConsolePrinter {
    #private;
    /**
     * Returns closed state.
     *
     * @returns True if the printer is closed.
     */
    get closed(): boolean;
    /**
     * Writes to the output.
     *
     * @param logEntry Log entry.
     */
    print(logEntry: IVirtualConsoleLogEntry): void;
    /**
     * Clears the output.
     */
    clear(): void;
    /**
     * Clears and closes the virtual console printer.
     */
    close(): void;
    /**
     * Adds an event listener.
     *
     * @param eventType Event type ("print" or "clear").
     * @param listener Listener.
     */
    addEventListener(eventType: 'print' | 'clear', listener: (event: Event) => void): void;
    /**
     * Removes an event listener.
     *
     * @param eventType Event type ("print" or "clear").
     * @param listener Listener.
     */
    removeEventListener(eventType: 'print' | 'clear', listener: (event: Event) => void): void;
    /**
     * Dispatches an event.
     *
     * @param event Event.
     */
    dispatchEvent(event: Event): void;
    /**
     * Reads the buffer.
     *
     * @returns Console log entries.
     */
    read(): IVirtualConsoleLogEntry[];
    /**
     * Returns the buffer as a string.
     *
     * @param [logLevel] Log level.
     * @returns Buffer as a string of concatenated log entries.
     */
    readAsString(logLevel?: VirtualConsoleLogLevelEnum): string;
}
//# sourceMappingURL=VirtualConsolePrinter.d.ts.map