import { toInternalSettings } from './Settings/CSpellSettingsServer.js';
import { getDictionaryInternal } from './SpellingDictionary/index.js';
/**
 * Load a dictionary collection defined by the settings.
 * @param settings - that defines the dictionaries and the ones to load.
 * @returns a dictionary collection that represents all the enabled dictionaries.
 */
export async function getDictionary(settings) {
    return getDictionaryInternal(toInternalSettings(settings));
}
//# sourceMappingURL=getDictionary.js.map