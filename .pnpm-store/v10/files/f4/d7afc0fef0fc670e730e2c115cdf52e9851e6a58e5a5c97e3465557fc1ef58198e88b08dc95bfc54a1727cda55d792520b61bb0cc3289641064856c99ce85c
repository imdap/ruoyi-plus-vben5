import assert from 'node:assert';
import { resolveDocumentToTextDocument } from '../Document/resolveDocument.js';
import { isTextDocument } from '../Models/TextDocument.js';
import * as Settings from '../Settings/index.js';
import { clean } from '../util/util.js';
import { DocumentValidator } from './docValidator.js';
import { calcTextInclusionRanges } from './textValidator.js';
import { validateText } from './validator.js';
/**
 * Annotate text with issues and include / exclude zones.
 * @param text - the text to annotate.
 * @param settings - the settings to use.
 * @returns the Check Text result
 * @deprecated
 */
export async function checkText(text, settings) {
    const languageId = settings.languageId || 'plaintext';
    const doc = clean({
        uri: '',
        text,
        languageId: Array.isArray(languageId) ? languageId.join(',') : languageId,
        locale: settings.language,
    });
    return checkTextDocument(doc, { noConfigSearch: true }, { loadDefaultConfiguration: false, ...settings });
}
/**
 * Annotate text with issues and include / exclude zones.
 * @param text - the text to annotate.
 * @param settings - the settings to use.
 * @returns the Check Text result
 * @deprecated
 */
export async function checkTextOld(text, settings) {
    const validationResult = validateText(text, settings);
    const finalSettings = Settings.finalizeSettings(settings);
    const includeRanges = calcTextInclusionRanges(text, finalSettings);
    const issues = await validationResult;
    return genResult(text, issues, includeRanges);
}
export var IncludeExcludeFlag;
(function (IncludeExcludeFlag) {
    IncludeExcludeFlag["INCLUDE"] = "I";
    IncludeExcludeFlag["EXCLUDE"] = "E";
})(IncludeExcludeFlag || (IncludeExcludeFlag = {}));
/**
 * Calculate document issues and include / exclude zones.
 * @param doc - document to check
 * @param options - check options
 * @param settings - optional settings
 * @returns
 */
export async function checkTextDocument(doc, options, settings = {}) {
    doc = isTextDocument(doc) ? doc : await resolveDocumentToTextDocument(doc);
    return genCheckText(new DocumentValidator(doc, options, settings));
}
export async function genCheckText(docValidator) {
    await docValidator.prepare();
    const issues = docValidator.checkDocument(true);
    const preparations = docValidator._getPreparations();
    assert(preparations);
    return genResult(docValidator.document.text, issues, preparations.includeRanges);
}
function genResult(text, issues, includeRanges) {
    const result = [];
    let lastPos = 0;
    for (const { startPos, endPos } of includeRanges) {
        result.push({
            text: text.slice(lastPos, startPos),
            startPos: lastPos,
            endPos: startPos,
            flagIE: IncludeExcludeFlag.EXCLUDE,
        }, {
            text: text.slice(startPos, endPos),
            startPos,
            endPos,
            flagIE: IncludeExcludeFlag.INCLUDE,
        });
        lastPos = endPos;
    }
    result.push({
        text: text.slice(lastPos),
        startPos: lastPos,
        endPos: text.length,
        flagIE: IncludeExcludeFlag.EXCLUDE,
    });
    function* merge() {
        let i = 0;
        for (const r of result) {
            if (i >= issues.length || issues[i].offset >= r.endPos) {
                yield r;
                continue;
            }
            const span = { ...r };
            while (i < issues.length && issues[i].offset < span.endPos) {
                const issue = issues[i];
                const endPos = issue.offset;
                const text = span.text.slice(0, endPos - span.startPos);
                const endPosError = issue.offset + issue.text.length;
                yield { ...span, text, endPos };
                yield {
                    ...span,
                    isError: true,
                    startPos: issue.offset,
                    endPos: endPosError,
                    text: issue.text,
                };
                span.text = span.text.slice(endPosError - span.startPos);
                span.startPos = endPosError;
                i += 1;
            }
            yield span;
        }
    }
    return {
        text,
        items: [...merge()].filter((i) => i.startPos < i.endPos),
    };
}
//# sourceMappingURL=checkText.js.map