/* eslint-disable @typescript-eslint/no-explicit-any */
let _logger = console;
/**
 * See `Console.error`
 */
export function logError(...args) {
    _logger.error(...args);
}
/**
 * See `Console.warn`
 */
export function logWarning(...args) {
    _logger.warn(...args);
}
/**
 * See `Console.log`
 */
export function log(...args) {
    _logger.log(...args);
}
/**
 * Set the global cspell-lib logger
 * @param logger - a logger like `console`
 * @returns the old logger.
 */
export function setLogger(logger) {
    const oldLogger = _logger;
    _logger = logger;
    return oldLogger;
}
/**
 * Get the current cspell-lib logger.
 * @returns the current logger.
 */
export function getLogger() {
    return _logger;
}
//# sourceMappingURL=logger.js.map