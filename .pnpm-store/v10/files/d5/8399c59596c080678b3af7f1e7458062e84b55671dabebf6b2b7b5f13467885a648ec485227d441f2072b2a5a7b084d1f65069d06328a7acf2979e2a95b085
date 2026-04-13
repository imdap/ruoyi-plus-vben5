import HistoryScrollRestorationEnum from './HistoryScrollRestorationEnum.js';
import * as PropertySymbol from '../PropertySymbol.js';
import BrowserFrameURL from '../browser/utilities/BrowserFrameURL.js';
import DOMExceptionNameEnum from '../exception/DOMExceptionNameEnum.js';
/**
 * History API.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/History.
 */
export default class History {
    #browserFrame;
    #window;
    /**
     * Constructor.
     *
     * @param browserFrame Browser frame.
     * @param window Owner window.
     */
    constructor(browserFrame, window) {
        if (!browserFrame) {
            throw new TypeError('Illegal constructor');
        }
        this.#browserFrame = browserFrame;
        this.#window = window;
    }
    /**
     * Returns the history length.
     *
     * @returns History length.
     */
    get length() {
        return this.#browserFrame?.[PropertySymbol.history].items.length || 0;
    }
    /**
     * Returns an any value representing the state at the top of the history stack. This is a way to look at the state without having to wait for a popstate event.
     *
     * @returns State.
     */
    get state() {
        return this.#browserFrame?.[PropertySymbol.history].currentItem.state || null;
    }
    /**
     * Returns scroll restoration.
     *
     * @returns Sroll restoration.
     */
    get scrollRestoration() {
        return (this.#browserFrame?.[PropertySymbol.history].currentItem.scrollRestoration ||
            HistoryScrollRestorationEnum.auto);
    }
    /**
     * Sets scroll restoration.
     *
     * @param scrollRestoration Sroll restoration.
     */
    set scrollRestoration(scrollRestoration) {
        switch (scrollRestoration) {
            case HistoryScrollRestorationEnum.auto:
            case HistoryScrollRestorationEnum.manual:
                const currentItem = this.#browserFrame?.[PropertySymbol.history].currentItem;
                if (currentItem) {
                    currentItem.scrollRestoration = scrollRestoration;
                }
                break;
        }
    }
    /**
     * Goes to the previous page in session history.
     */
    back() {
        if (!this.#window.closed) {
            this.#browserFrame?.goBack();
        }
    }
    /**
     * Goes to the next page in session history.
     */
    forward() {
        if (!this.#window.closed) {
            this.#browserFrame?.goForward();
        }
    }
    /**
     * Load a specific page from the session history.
     *
     * @param delta Delta.
     * @param _delta
     */
    go(delta) {
        if (!this.#window.closed) {
            this.#browserFrame?.goSteps(delta);
        }
    }
    /**
     * Pushes the given data onto the session history stack.
     *
     * @param state State.
     * @param _unused Unused.
     * @param [url] URL.
     */
    pushState(state, _unused, url) {
        if (!this.#browserFrame || this.#window.closed) {
            return;
        }
        const history = this.#browserFrame?.[PropertySymbol.history];
        if (!history) {
            return;
        }
        if (arguments.length < 2) {
            throw new this.#window.TypeError(`Failed to execute 'pushState' on 'History': 2 arguments required, but only ${arguments.length} present.`);
        }
        const location = this.#window[PropertySymbol.location];
        const newURL = url ? BrowserFrameURL.getRelativeURL(this.#browserFrame, url) : location;
        if (url && newURL.origin !== location.origin) {
            throw new this.#window.DOMException(`Failed to execute 'pushState' on 'History': A history state object with URL '${url.toString()}' cannot be created in a document with origin '${location.origin}' and URL '${location.href}'.`, DOMExceptionNameEnum.securityError);
        }
        history.currentItem.popState = true;
        history.push({
            title: this.#window.document.title,
            href: newURL.href,
            state,
            popState: true,
            scrollRestoration: history.currentItem.scrollRestoration,
            method: history.currentItem.method || 'GET',
            formData: history.currentItem.formData || null
        });
        location[PropertySymbol.setURL](this.#browserFrame, history.currentItem.href);
    }
    /**
     * This method modifies the current history entry, replacing it with a new state.
     *
     * @param state State.
     * @param _unused Unused.
     * @param [url] URL.
     */
    replaceState(state, _unused, url) {
        if (!this.#browserFrame || this.#window.closed) {
            return;
        }
        const history = this.#browserFrame?.[PropertySymbol.history];
        if (!history) {
            return;
        }
        if (arguments.length < 2) {
            throw new this.#window.TypeError(`Failed to execute 'pushState' on 'History': 2 arguments required, but only ${arguments.length} present.`);
        }
        const location = this.#window[PropertySymbol.location];
        const newURL = url ? BrowserFrameURL.getRelativeURL(this.#browserFrame, url) : location;
        if (url && newURL.origin !== location.origin) {
            throw new this.#window.DOMException(`Failed to execute 'pushState' on 'History': A history state object with URL '${url.toString()}' cannot be created in a document with origin '${location.origin}' and URL '${location.href}'.`, DOMExceptionNameEnum.securityError);
        }
        history.replace({
            title: this.#window.document.title,
            href: newURL.href,
            state,
            popState: history.currentItem.popState,
            scrollRestoration: history.currentItem.scrollRestoration,
            method: history.currentItem.method,
            formData: history.currentItem.formData
        });
        if (url) {
            location[PropertySymbol.setURL](this.#browserFrame, history.currentItem.href);
        }
    }
    /**
     * Destroys the history.
     *
     * This will make sure that the History API can't access page data from the next history item.
     */
    [PropertySymbol.destroy]() {
        this.#browserFrame = null;
    }
}
//# sourceMappingURL=History.js.map