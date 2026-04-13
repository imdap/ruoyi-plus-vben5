import EventTarget from '../event/EventTarget.js';
import type Event from '../event/Event.js';
import type BrowserWindow from '../window/BrowserWindow.js';
import type { TEventListener } from '../event/TEventListener.js';
/**
 * Media Query List.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList.
 */
export default class MediaQueryList extends EventTarget {
    #private;
    onchange: ((event: Event) => void) | null;
    /**
     * Constructor.
     *
     * @param options Options.
     * @param options.window Owner window.
     * @param options.media Media.
     * @param [options.rootFontSize] Root font size.
     */
    constructor(options: {
        window: BrowserWindow;
        media: string;
        rootFontSize?: string | number | null;
    });
    /**
     * Returns media.
     *
     * @returns Media.
     */
    get media(): string;
    /**
     * Returns "true" if the document matches.
     *
     * @returns Matches.
     */
    get matches(): boolean;
    /**
     * Adds a listener.
     *
     * @deprecated
     * @param callback Callback.
     */
    addListener(callback: (event: Event) => void): void;
    /**
     * Removes listener.
     *
     * @deprecated
     * @param callback Callback.
     */
    removeListener(callback: (event: Event) => void): void;
    /**
     * @override
     */
    addEventListener(type: string, listener: TEventListener): void;
    /**
     * @override
     */
    removeEventListener(type: string, listener: TEventListener): void;
}
//# sourceMappingURL=MediaQueryList.d.ts.map