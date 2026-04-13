import { checkFilenameMatchesExcludeGlob } from '../globs/checkFilenameMatchesGlob.js';
import { mergeSettings, toInternalSettings } from './CSpellSettingsServer.js';
export function calcOverrideSettings(settings, filename) {
    const _settings = toInternalSettings(settings);
    const overrides = _settings.overrides || [];
    const result = overrides
        .filter((override) => checkFilenameMatchesExcludeGlob(filename, override.filename))
        .reduce((settings, override) => mergeSettings(settings, override), _settings);
    return result;
}
//# sourceMappingURL=calcOverrideSettings.js.map