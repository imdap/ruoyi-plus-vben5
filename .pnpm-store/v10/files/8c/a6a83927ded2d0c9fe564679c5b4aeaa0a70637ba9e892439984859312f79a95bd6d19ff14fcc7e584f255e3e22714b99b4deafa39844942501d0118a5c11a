import { mergeSettings, toInternalSettings } from './CSpellSettingsServer.js';
import { getInDocumentSettings } from './InDocSettings.js';
import { calcSettingsForLanguageId } from './LanguageSettings.js';
export function combineTextAndLanguageSettings(settings, text, languageId) {
    if (!text) {
        return toInternalSettings(calcSettingsForLanguageId(settings, languageId));
    }
    const docSettings = extractSettingsFromText(text);
    const settingsForText = mergeSettings(settings, docSettings);
    const langSettings = calcSettingsForLanguageId(settingsForText, languageId);
    // Merge again, to force In-Doc settings.
    const final = mergeSettings(langSettings, docSettings);
    return final;
}
export function extractSettingsFromText(text) {
    return getInDocumentSettings(text);
}
//# sourceMappingURL=TextDocumentSettings.js.map