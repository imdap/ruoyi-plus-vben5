import type { CSpellSettingsWithSourceTrace } from '@cspell/cspell-types';
import type { CSpellSettingsInternal, CSpellSettingsInternalFinalized } from './internal/index.js';
type CloneableSettings = CSpellSettingsWithSourceTrace | CSpellSettingsInternal | CSpellSettingsInternalFinalized;
/**
 * Sanitize settings for export by removing any internal only properties.
 *
 * @param settings - the input settings
 */
export declare function cloneSettingsForExport(settings: Readonly<CloneableSettings>): CSpellSettingsWithSourceTrace;
export {};
//# sourceMappingURL=sanitizeSettings.d.ts.map