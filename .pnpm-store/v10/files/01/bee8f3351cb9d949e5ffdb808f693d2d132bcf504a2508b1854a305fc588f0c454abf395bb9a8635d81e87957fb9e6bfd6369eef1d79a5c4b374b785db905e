import { URL as NodeJSURL } from 'url';
import * as PropertySymbol from '../PropertySymbol.js';
import { Blob as NodeJSBlob } from 'buffer';
import Blob from '../file/Blob.js';
import type BrowserWindow from '../window/BrowserWindow.js';
/**
 * URL.
 */
export default class URL extends NodeJSURL {
    protected [PropertySymbol.window]?: BrowserWindow;
    /**
     * Constructor.
     *
     * @param url URL.
     * @param [base] Base URL.
     */
    constructor(url: string | URL, base?: string | URL);
    /**
     * Creates a string containing a URL representing the object given in the parameter.
     *
     * @param object Object.
     * @returns URL.
     */
    static createObjectURL(object: NodeJSBlob | Blob): string;
}
//# sourceMappingURL=URL.d.ts.map