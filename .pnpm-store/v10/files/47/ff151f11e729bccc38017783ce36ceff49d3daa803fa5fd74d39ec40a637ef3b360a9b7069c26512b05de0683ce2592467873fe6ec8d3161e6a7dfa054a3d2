import { getLanguagesForBasename, isGenerated } from '../fileTypes.js';
import { basename, toUri } from '../util/Uri.js';
import { normalizeLanguageIds } from './normalizeLanguageIds.js';
export function isBinaryDoc(document) {
    return isBinaryFile(toUri(document.uri), document.languageId, document.text);
}
export function isBinaryFile(filename, languageId, text) {
    const filenameUri = toUri(filename);
    if (languageId) {
        const ids = normalizeLanguageIds(languageId);
        if (ids.length)
            return isGenerated(ids);
    }
    const file = basename(filenameUri);
    const ids = getLanguagesForBasename(file);
    if (ids.length)
        return isGenerated(ids);
    // Unknown file type, check the content.
    return text?.slice(0, 1024).includes('\u0000') || false;
}
//# sourceMappingURL=isBinaryDoc.js.map