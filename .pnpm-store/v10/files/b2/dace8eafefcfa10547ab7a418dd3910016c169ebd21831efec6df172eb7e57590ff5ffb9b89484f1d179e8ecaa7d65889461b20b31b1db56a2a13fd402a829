import type { CSpellUserSettings } from '@cspell/cspell-types';
import type { Document } from '../Document/index.js';
import type { TextDocument } from '../Models/TextDocument.js';
import type { DocumentValidatorOptions } from './docValidator.js';
import { DocumentValidator } from './docValidator.js';
/**
 * Annotate text with issues and include / exclude zones.
 * @param text - the text to annotate.
 * @param settings - the settings to use.
 * @returns the Check Text result
 * @deprecated
 */
export declare function checkText(text: string, settings: CSpellUserSettings): Promise<CheckTextInfo>;
/**
 * Annotate text with issues and include / exclude zones.
 * @param text - the text to annotate.
 * @param settings - the settings to use.
 * @returns the Check Text result
 * @deprecated
 */
export declare function checkTextOld(text: string, settings: CSpellUserSettings): Promise<CheckTextInfo>;
export interface CheckTextInfo {
    text: string;
    items: TextInfoItem[];
}
export interface TextInfoItem {
    text: string;
    startPos: number;
    endPos: number;
    flagIE: IncludeExcludeFlag;
    isError?: boolean;
}
export declare enum IncludeExcludeFlag {
    INCLUDE = "I",
    EXCLUDE = "E"
}
export interface CheckTextOptions extends DocumentValidatorOptions {
}
/**
 * Calculate document issues and include / exclude zones.
 * @param doc - document to check
 * @param options - check options
 * @param settings - optional settings
 * @returns
 */
export declare function checkTextDocument(doc: TextDocument | Document, options: CheckTextOptions, settings?: CSpellUserSettings): Promise<CheckTextInfo>;
export declare function genCheckText(docValidator: DocumentValidator): Promise<CheckTextInfo>;
//# sourceMappingURL=checkText.d.ts.map