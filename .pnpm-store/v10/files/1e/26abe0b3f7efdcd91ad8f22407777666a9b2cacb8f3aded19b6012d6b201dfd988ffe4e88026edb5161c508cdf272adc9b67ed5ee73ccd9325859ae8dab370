import TextTrack from './TextTrack.js';
import EventTarget from '../../event/EventTarget.js';
import * as PropertySymbol from '../../PropertySymbol.js';
/**
 * TextTrackList.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TextTrackList
 */
export default class TextTrackList extends EventTarget {
    [index: number]: TextTrack | undefined;
    [PropertySymbol.items]: TextTrack[];
    onaddtrack: ((event: Event) => void) | null;
    onchange: ((event: Event) => void) | null;
    onremovetrack: ((event: Event) => void) | null;
    /**
     * Constructor.
     *
     * @param illegalConstructorSymbol Illegal constructor symbol.
     * @param items Items.
     */
    constructor(illegalConstructorSymbol: symbol, items: TextTrack[]);
    /**
     * Returns the number of TextTrack objects in the TextTrackList.
     *
     * @returns Number of TextTrack objects.
     */
    get length(): number;
    /**
     * Returns `Symbol.toStringTag`.
     *
     * @returns `Symbol.toStringTag`.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Returns `[object NodeList]`.
     *
     * @returns `[object NodeList]`.
     */
    toLocaleString(): string;
    /**
     * Returns `[object NodeList]`.
     *
     * @returns `[object NodeList]`.
     */
    toString(): string;
    /**
     * Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object.
     *
     * @returns Iterator.
     */
    [Symbol.iterator](): ArrayIterator<TextTrack>;
    /**
     * Returns the TextTrack found within the TextTrackList whose id matches the specified string. If no match is found, null is returned.
     *
     * @param id Text track cue identifier.
     * @returns TextTrack.
     */
    getTrackById(id: string): TextTrack | null;
}
//# sourceMappingURL=TextTrackList.d.ts.map