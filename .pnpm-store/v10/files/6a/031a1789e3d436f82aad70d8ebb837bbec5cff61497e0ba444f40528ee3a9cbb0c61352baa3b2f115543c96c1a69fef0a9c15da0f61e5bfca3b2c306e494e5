import DataTransferItem from './DataTransferItem.js';
import DataTransferItemList from './DataTransferItemList.js';
/**
 * DataTransfer.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
 */
export default class DataTransfer {
    dropEffect = 'none';
    effectAllowed = 'none';
    items = new DataTransferItemList();
    /**
     * Returns files.
     *
     * @returns Files.
     */
    get files() {
        const files = [];
        for (const item of this.items) {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file) {
                    files.push(file);
                }
            }
        }
        return files;
    }
    /**
     * Returns types.
     *
     * @returns Types.
     */
    get types() {
        return this.items.map((item) => item.type);
    }
    /**
     * Clears the data.
     */
    clearData() {
        this.items.clear();
    }
    /**
     * Sets the data.
     *
     * @param format Format.
     * @param data Data.
     */
    setData(format, data) {
        for (let i = 0, max = this.items.length; i < max; i++) {
            if (this.items[i].type === format) {
                this.items[i] = new DataTransferItem(data, format);
                return;
            }
        }
        this.items.add(data, format);
    }
    /**
     * Gets the data.
     *
     * @param format Format.
     * @returns Data.
     */
    getData(format) {
        // Normalize format according to the spec
        // https://html.spec.whatwg.org/multipage/dnd.html#dom-datatransfer-getdata
        const normalizedFormat = this.#normalizeFormat(format);
        for (let i = 0, max = this.items.length; i < max; i++) {
            const itemFormat = this.#normalizeFormat(this.items[i].type);
            if (itemFormat === normalizedFormat) {
                let data = '';
                this.items[i].getAsString((s) => (data = s));
                return data;
            }
        }
        return '';
    }
    /**
     * Normalizes the format according to the HTML spec.
     *
     * @param format Format to normalize.
     * @returns Normalized format.
     */
    #normalizeFormat(format) {
        // Convert to lowercase as per spec
        const lowercaseFormat = format.toLowerCase();
        // "text" is a shorthand for "text/plain"
        if (lowercaseFormat === 'text') {
            return 'text/plain';
        }
        // "url" is a shorthand for "text/uri-list"
        if (lowercaseFormat === 'url') {
            return 'text/uri-list';
        }
        return lowercaseFormat;
    }
    /**
     * Sets drag image.
     *
     * TODO: Implement.
     */
    setDragImage() {
        throw new Error('Not implemented.');
    }
}
//# sourceMappingURL=DataTransfer.js.map