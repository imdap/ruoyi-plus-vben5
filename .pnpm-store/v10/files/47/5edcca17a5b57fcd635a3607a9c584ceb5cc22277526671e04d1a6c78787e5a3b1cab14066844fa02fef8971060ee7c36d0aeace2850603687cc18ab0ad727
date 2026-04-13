import type CSSMediaRule from './rules/CSSMediaRule.js';
import * as PropertySymbol from '../PropertySymbol.js';
/**
 * MediaList interface.
 */
export default class MediaList {
    [index: number]: string;
    [PropertySymbol.cssRule]: CSSMediaRule;
    /**
     *
     * @param illegalConstructorSymbol
     * @param cssRule
     */
    constructor(illegalConstructorSymbol: Symbol, cssRule: CSSMediaRule);
    /**
     * Returns length.
     *
     * @returns Length.
     */
    get length(): number;
    /**
     * Returns media text.
     *
     * @returns Media text.
     */
    get mediaText(): string;
    /**
     * Sets media text.
     *
     * @param mediaText Media text.
     */
    set mediaText(mediaText: string | null);
    /**
     * Returns item.
     *
     * @param index Index.
     * @returns Item.
     */
    item(index: number): string | null;
    /**
     * Appends a medium.
     *
     * @param medium Medium.
     */
    appendMedium(medium: string): void;
    /**
     * Deletes a medium.
     *
     * @param medium Medium.
     */
    deleteMedium(medium: string): void;
    /**
     * Returns item list.
     *
     * @returns Item list.
     */
    [PropertySymbol.getItemList](): string[];
}
//# sourceMappingURL=MediaList.d.ts.map