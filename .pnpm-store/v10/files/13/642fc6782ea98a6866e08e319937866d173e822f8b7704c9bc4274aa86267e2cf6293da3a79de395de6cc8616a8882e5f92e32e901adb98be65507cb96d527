import { AssertionError } from 'node:assert';
function assertBooleanOrUndefined(key, value) {
    if (typeof value !== 'boolean' && value !== undefined) {
        throw new AssertionError({
            message: `cspell-json-reporter settings.${key} must be a boolean`,
            actual: typeof value,
            expected: 'boolean',
        });
    }
}
/**
 * Throws an error if passed cspell-json-reporter settings are invalid
 */
export function validateSettings(settings) {
    if (!settings || typeof settings !== 'object' || Array.isArray(settings)) {
        throw new AssertionError({
            message: 'cspell-json-reporter settings must be an object',
            actual: typeof settings,
            expected: 'object',
        });
    }
    const { outFile = 'stdout', debug, verbose, progress } = settings;
    if (typeof outFile !== 'string') {
        throw new AssertionError({
            message: 'cspell-json-reporter settings.outFile must be a string',
            actual: typeof outFile,
            expected: 'string',
        });
    }
    assertBooleanOrUndefined('verbose', verbose);
    assertBooleanOrUndefined('debug', debug);
    assertBooleanOrUndefined('progress', progress);
}
//# sourceMappingURL=validateSettings.js.map