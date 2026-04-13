import Blob from '../file/Blob.js';
import * as PropertySymbol from '../PropertySymbol.js';
import File from '../file/File.js';
import type HTMLInputElement from '../nodes/html-input-element/HTMLInputElement.js';
import type HTMLFormElement from '../nodes/html-form-element/HTMLFormElement.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type HTMLButtonElement from '../nodes/html-button-element/HTMLButtonElement.js';
/**
 * FormData.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
 */
export default class FormData implements Iterable<[string, string | File]> {
    #private;
    protected [PropertySymbol.window]: BrowserWindow;
    /**
     * Constructor.
     *
     * @param [form] Form.
     * @param [submitter] The element that triggered the submission if this came from a form submit.
     */
    constructor(form?: HTMLFormElement, submitter?: HTMLInputElement | HTMLButtonElement);
    /**
     * For each.
     *
     * @param callback Callback.
     * @param thisArg thisArg.
     */
    forEach(callback: (value: string | File, key: string, parent: this) => void, thisArg?: any): void;
    /**
     * Appends a new value onto an existing key.
     *
     * @param name Name.
     * @param value Value.
     * @param [filename] Filename.
     */
    append(name: string, value: string | Blob | File, filename?: string): void;
    /**
     * Removes a value.
     *
     * @param name Name.
     */
    delete(name: string): void;
    /**
     * Returns value.
     *
     * @param name Name.
     * @returns Value.
     */
    get(name: string): string | File | null;
    /**
     * Returns all values associated with the given name.
     *
     * @param name Name.
     * @returns Values.
     */
    getAll(name: string): Array<string | File>;
    /**
     * Returns whether a FormData object contains a certain key.
     *
     * @param name Name.
     * @returns "true" if the FormData object contains the key.
     */
    has(name: string): boolean;
    /**
     * Sets a new value for an existing key inside a FormData object, or adds the key/value if it does not already exist.
     *
     * @param name Name.
     * @param value Value.
     * @param [filename] Filename.
     */
    set(name: string, value: string | Blob | File, filename?: string): void;
    /**
     * Returns an iterator, allowing you to go through all keys of the key/value pairs contained in this object.
     *
     * @returns Iterator.
     */
    keys(): ArrayIterator<string>;
    /**
     * Returns an iterator, allowing you to go through all values of the key/value pairs contained in this object.
     *
     * @returns Iterator.
     */
    values(): ArrayIterator<string | File>;
    /**
     * Returns an iterator, allowing you to go through all key/value pairs contained in this object.
     *
     * @returns Iterator.
     */
    entries(): ArrayIterator<[string, string | File]>;
    /**
     * Iterator.
     *
     * @returns Iterator.
     */
    [Symbol.iterator](): ArrayIterator<[string, string | File]>;
}
//# sourceMappingURL=FormData.d.ts.map