import * as PropertySymbol from '../../PropertySymbol.js';
import HTMLElement from '../html-element/HTMLElement.js';
import Event from '../../event/Event.js';
import DOMTokenList from '../../dom/DOMTokenList.js';
import DOMExceptionNameEnum from '../../exception/DOMExceptionNameEnum.js';
import ResourceFetch from '../../fetch/ResourceFetch.js';
import WindowBrowserContext from '../../window/WindowBrowserContext.js';
import Fetch from '../../fetch/Fetch.js';
import BrowserErrorCaptureEnum from '../../browser/enums/BrowserErrorCaptureEnum.js';
import ModuleFactory from '../../module/ModuleFactory.js';
import PreloadUtility from '../../fetch/preload/PreloadUtility.js';
import PreloadEntry from '../../fetch/preload/PreloadEntry.js';
import ElementEventAttributeUtility from '../element/ElementEventAttributeUtility.js';
/**
 * HTML Link Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement.
 */
export default class HTMLLinkElement extends HTMLElement {
    // Internal properties
    [PropertySymbol.sheet] = null;
    [PropertySymbol.disableEvaluation] = false;
    [PropertySymbol.relList] = null;
    #loadedStyleSheetURL = null;
    // Events
    /* eslint-disable jsdoc/require-jsdoc */
    get onerror() {
        return ElementEventAttributeUtility.getEventListener(this, 'onerror');
    }
    set onerror(value) {
        this[PropertySymbol.propertyEventListeners].set('onerror', value);
    }
    get onload() {
        return ElementEventAttributeUtility.getEventListener(this, 'onload');
    }
    set onload(value) {
        this[PropertySymbol.propertyEventListeners].set('onload', value);
    }
    /* eslint-enable jsdoc/require-jsdoc */
    /**
     * Returns sheet.
     */
    get sheet() {
        return this[PropertySymbol.sheet];
    }
    /**
     * Returns rel list.
     *
     * @returns Rel list.
     */
    get relList() {
        if (!this[PropertySymbol.relList]) {
            this[PropertySymbol.relList] = new DOMTokenList(PropertySymbol.illegalConstructor, this, 'rel', ['stylesheet', 'modulepreload', 'preload']);
        }
        return this[PropertySymbol.relList];
    }
    /**
     * Sets rel list.
     *
     * @param value Value.
     */
    set relList(value) {
        this.setAttribute('rel', value);
    }
    /**
     * Returns as.
     *
     * @returns As.
     */
    get as() {
        return this.getAttribute('as') || '';
    }
    /**
     * Sets as.
     *
     * @param as As.
     */
    set as(as) {
        this.setAttribute('as', as);
    }
    /**
     * Returns crossOrigin.
     *
     * @returns CrossOrigin.
     */
    get crossOrigin() {
        return this.getAttribute('crossorigin') || '';
    }
    /**
     * Sets crossOrigin.
     *
     * @param crossOrigin CrossOrigin.
     */
    set crossOrigin(crossOrigin) {
        this.setAttribute('crossorigin', crossOrigin);
    }
    /**
     * Returns href.
     *
     * @returns Href.
     */
    get href() {
        if (!this.hasAttribute('href')) {
            return '';
        }
        try {
            return new URL(this.getAttribute('href'), this[PropertySymbol.ownerDocument].location.href)
                .href;
        }
        catch (e) {
            return this.getAttribute('href');
        }
    }
    /**
     * Sets href.
     *
     * @param href Href.
     */
    set href(href) {
        this.setAttribute('href', href);
    }
    /**
     * Returns hreflang.
     *
     * @returns Hreflang.
     */
    get hreflang() {
        return this.getAttribute('hreflang') || '';
    }
    /**
     * Sets hreflang.
     *
     * @param hreflang Hreflang.
     */
    set hreflang(hreflang) {
        this.setAttribute('hreflang', hreflang);
    }
    /**
     * Returns media.
     *
     * @returns Media.
     */
    get media() {
        return this.getAttribute('media') || '';
    }
    /**
     * Sets media.
     *
     * @param media Media.
     */
    set media(media) {
        this.setAttribute('media', media);
    }
    /**
     * Returns referrerPolicy.
     *
     * @returns ReferrerPolicy.
     */
    get referrerPolicy() {
        return this.getAttribute('referrerPolicy') || '';
    }
    /**
     * Sets referrerPolicy.
     *
     * @param referrerPolicy ReferrerPolicy.
     */
    set referrerPolicy(referrerPolicy) {
        this.setAttribute('referrerPolicy', referrerPolicy);
    }
    /**
     * Returns rel.
     *
     * @returns Rel.
     */
    get rel() {
        return this.getAttribute('rel') || '';
    }
    /**
     * Sets rel.
     *
     * @param rel Rel.
     */
    set rel(rel) {
        this.setAttribute('rel', rel);
    }
    /**
     * Returns type.
     *
     * @returns Type.
     */
    get type() {
        return this.getAttribute('type') || '';
    }
    /**
     * Sets type.
     *
     * @param type Type.
     */
    set type(type) {
        this.setAttribute('type', type);
    }
    /**
     * @override
     */
    [PropertySymbol.connectedToDocument]() {
        super[PropertySymbol.connectedToDocument]();
        const rel = this.getAttribute('rel');
        const href = this.getAttribute('href');
        if (rel && href) {
            switch (rel) {
                case 'stylesheet':
                    this.#loadStyleSheet(href);
                    break;
                case 'modulepreload':
                    this.#preloadModule(href);
                    break;
                case 'preload':
                    this.#preloadResource(href);
                    break;
            }
        }
    }
    /**
     * @override
     */
    [PropertySymbol.onSetAttribute](attribute, replacedAttribute) {
        super[PropertySymbol.onSetAttribute](attribute, replacedAttribute);
        if (attribute[PropertySymbol.name] === 'rel' || attribute[PropertySymbol.name] === 'href') {
            const rel = this.getAttribute('rel');
            const href = this.getAttribute('href');
            if (rel && href) {
                switch (rel) {
                    case 'stylesheet':
                        this.#loadStyleSheet(href);
                        break;
                    case 'modulepreload':
                        this.#preloadModule(href);
                        break;
                    case 'preload':
                        this.#preloadResource(href);
                        break;
                }
            }
        }
    }
    /**
     * Preloads a module.
     *
     * @param url URL.
     */
    async #preloadModule(url) {
        const window = this[PropertySymbol.window];
        const browserFrame = new WindowBrowserContext(window).getBrowserFrame();
        const browserSettings = new WindowBrowserContext(window).getSettings();
        if (!browserFrame ||
            !browserSettings ||
            !this[PropertySymbol.isConnected] ||
            browserSettings.disableJavaScriptFileLoading ||
            !browserSettings.enableJavaScriptEvaluation) {
            return;
        }
        const moduleFactory = new ModuleFactory(window, window.location);
        if (browserSettings.disableErrorCapturing ||
            browserSettings.errorCapture !== BrowserErrorCaptureEnum.tryAndCatch) {
            const module = await moduleFactory.getModule(url);
            await module.preload();
        }
        else {
            try {
                const module = await moduleFactory.getModule(url);
                await module.preload();
            }
            catch (error) {
                browserFrame.page.console.error(error);
                window[PropertySymbol.dispatchError](error);
                return;
            }
        }
    }
    /**
     * Preloads a resource.
     *
     * @param url URL.
     */
    async #preloadResource(url) {
        const window = this[PropertySymbol.window];
        const browserFrame = new WindowBrowserContext(window).getBrowserFrame();
        const as = this.as;
        // Only "script", "style" and "fetch" are supported for now.
        if (!browserFrame ||
            !this[PropertySymbol.isConnected] ||
            (as !== 'script' && as !== 'style' && as !== 'fetch')) {
            return;
        }
        const browserSettings = browserFrame.page.context.browser.settings;
        if (as === 'script' &&
            (browserSettings.disableJavaScriptFileLoading || !browserSettings.enableJavaScriptEvaluation)) {
            return;
        }
        if (as === 'style' && browserSettings.disableCSSFileLoading) {
            return;
        }
        const absoluteURL = new URL(url, window.location.href).href;
        const preloadKey = PreloadUtility.getKey({
            url: absoluteURL,
            destination: as,
            mode: 'cors',
            credentialsMode: this.crossOrigin === 'use-credentials' ? 'include' : 'same-origin'
        });
        if (window.document[PropertySymbol.preloads].has(preloadKey)) {
            return;
        }
        const preloadEntry = new PreloadEntry();
        window.document[PropertySymbol.preloads].set(preloadKey, preloadEntry);
        const fetch = new Fetch({
            browserFrame,
            window,
            url: absoluteURL,
            disableSameOriginPolicy: as === 'script' || as === 'style',
            disablePreload: true,
            init: {
                credentials: this.crossOrigin === 'use-credentials' ? 'include' : 'same-origin'
            }
        });
        try {
            const response = await fetch.send();
            if (!response[PropertySymbol.buffer]) {
                await response.buffer();
            }
            preloadEntry.responseAvailable(null, response);
        }
        catch (error) {
            preloadEntry.responseAvailable(error, null);
            window.document[PropertySymbol.preloads].delete(preloadKey);
            browserFrame.page.console.error(`Failed to preload resource "${absoluteURL}": ${error.message}`);
        }
    }
    /**
     * Returns a URL relative to the given Location object.
     *
     * @param url URL.
     * @param rel Rel.
     */
    async #loadStyleSheet(url) {
        const window = this[PropertySymbol.window];
        const browserFrame = new WindowBrowserContext(window).getBrowserFrame();
        if (!browserFrame || url === null) {
            return;
        }
        const browserSettings = browserFrame.page.context.browser.settings;
        if (this[PropertySymbol.disableEvaluation] || !this[PropertySymbol.isConnected]) {
            return;
        }
        let absoluteURL;
        try {
            absoluteURL = new URL(url, window.location.href).href;
        }
        catch (error) {
            return;
        }
        if (this.#loadedStyleSheetURL === absoluteURL) {
            return;
        }
        if (browserSettings && browserSettings.disableCSSFileLoading) {
            if (browserSettings.handleDisabledFileLoadingAsSuccess) {
                this.dispatchEvent(new Event('load'));
            }
            else {
                const error = new window.DOMException(`Failed to load external stylesheet "${absoluteURL}". CSS file loading is disabled.`, DOMExceptionNameEnum.notSupportedError);
                browserFrame.page.console.error(error);
                this.dispatchEvent(new Event('error'));
            }
            return;
        }
        const resourceFetch = new ResourceFetch(window);
        const readyStateManager = window[PropertySymbol.readyStateManager];
        this.#loadedStyleSheetURL = absoluteURL;
        const taskID = readyStateManager.startTask();
        let response = null;
        let error = null;
        try {
            response = await resourceFetch.fetch(absoluteURL, 'style', {
                credentials: this.crossOrigin === 'use-credentials' ? 'include' : 'same-origin'
            });
        }
        catch (e) {
            error = e;
        }
        readyStateManager.endTask(taskID);
        if (error) {
            browserFrame.page.console.error(error);
            this.dispatchEvent(new Event('error'));
        }
        else {
            const styleSheet = new this[PropertySymbol.ownerDocument][PropertySymbol.window].CSSStyleSheet();
            styleSheet.replaceSync(response.content);
            this[PropertySymbol.sheet] = styleSheet;
            // Computed style cache is affected by all mutations.
            const document = this[PropertySymbol.ownerDocument];
            if (document) {
                for (const item of document[PropertySymbol.affectsComputedStyleCache]) {
                    item.result = null;
                }
                document[PropertySymbol.affectsComputedStyleCache] = [];
            }
            this.dispatchEvent(new Event('load'));
        }
    }
}
//# sourceMappingURL=HTMLLinkElement.js.map