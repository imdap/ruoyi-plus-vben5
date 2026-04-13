import * as PropertySymbol from '../../PropertySymbol.js';
import Attr from '../attr/Attr.js';
import DOMExceptionNameEnum from '../../exception/DOMExceptionNameEnum.js';
import NamespaceURI from '../../config/NamespaceURI.js';
import StringUtility from '../../utilities/StringUtility.js';
/**
 * Named Node Map.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
 */
export default class NamedNodeMap {
    // Items by attribute namespaceURI
    [PropertySymbol.itemsByNamespaceURI] = new Map();
    // Items by attribute name
    [PropertySymbol.itemsByName] = new Map();
    // All items
    [PropertySymbol.items] = new Map();
    /**
     * Constructor.
     *
     * @param ownerElement Owner element.
     */
    constructor(ownerElement) {
        this[PropertySymbol.ownerElement] = ownerElement;
    }
    /**
     * Returns length.
     *
     * @returns Length.
     */
    get length() {
        return this[PropertySymbol.items].size;
    }
    /**
     * Returns string.
     *
     * @returns string.
     */
    get [Symbol.toStringTag]() {
        return 'NamedNodeMap';
    }
    /**
     * Returns string.
     *
     * @returns string.
     */
    toString() {
        return '[object NamedNodeMap]';
    }
    /**
     * Iterator.
     *
     * @returns Iterator.
     */
    [Symbol.iterator]() {
        return this[PropertySymbol.items].values();
    }
    /**
     * Returns item by index.
     *
     * @param index Index.
     */
    item(index) {
        const items = Array.from(this[PropertySymbol.items].values());
        return index >= 0 && items[index] ? items[index] : null;
    }
    /**
     * Returns named item.
     *
     * @param name Name.
     * @returns Item.
     */
    getNamedItem(name) {
        name = String(name);
        if (this[PropertySymbol.ownerElement][PropertySymbol.namespaceURI] === NamespaceURI.html &&
            this[PropertySymbol.ownerElement][PropertySymbol.ownerDocument][PropertySymbol.contentType] === 'text/html') {
            return this[PropertySymbol.itemsByName].get(StringUtility.asciiLowerCase(name))?.[0] || null;
        }
        return this[PropertySymbol.itemsByName].get(name)?.[0] || null;
    }
    /**
     * Returns item by name and namespace.
     *
     * @param namespace Namespace.
     * @param localName Local name of the attribute.
     * @returns Item.
     */
    getNamedItemNS(namespace, localName) {
        const item = this[PropertySymbol.itemsByNamespaceURI].get(`${namespace || ''}:${localName}`);
        // It seems like an item cant have a prefix without a namespaceURI
        // E.g. element.setAttribute('ns1:key', 'value1');
        // expect(element.attributes.getNamedItemNS(null, 'key')).toBeNull();
        if (item && (!item[PropertySymbol.prefix] || item[PropertySymbol.namespaceURI])) {
            return item;
        }
        return null;
    }
    /**
     * Sets named item.
     *
     * @param item Item.
     * @returns Replaced item.
     */
    setNamedItem(item) {
        return this[PropertySymbol.setNamedItem](item);
    }
    /**
     * Adds a new namespaced item.
     *
     * @alias setNamedItem()
     * @param item Item.
     * @returns Replaced item.
     */
    setNamedItemNS(item) {
        return this[PropertySymbol.setNamedItem](item);
    }
    /**
     * Removes an item.
     *
     * @throws DOMException
     * @param name Name of item.
     * @returns Removed item.
     */
    removeNamedItem(name) {
        const item = this.getNamedItem(name);
        if (!item) {
            throw new this[PropertySymbol.ownerElement][PropertySymbol.window].DOMException(`Failed to execute 'removeNamedItem' on 'NamedNodeMap': No item with name '${name}' was found.`, DOMExceptionNameEnum.notFoundError);
        }
        this[PropertySymbol.removeNamedItem](item);
        return item;
    }
    /**
     * Removes a namespaced item.
     *
     * @param namespace Namespace.
     * @param localName Local name of the item.
     * @returns Removed item.
     */
    removeNamedItemNS(namespace, localName) {
        const item = this.getNamedItemNS(namespace, localName);
        if (!item) {
            throw new this[PropertySymbol.ownerElement][PropertySymbol.window].DOMException(`Failed to execute 'removeNamedItemNS' on 'NamedNodeMap': No item with name '${localName}' in namespace '${namespace}' was found.`, DOMExceptionNameEnum.notFoundError);
        }
        this[PropertySymbol.removeNamedItem](item);
        return item;
    }
    /**
     * Sets named item.
     *
     * @param item Item.
     * @param [ignoreListeners] Ignore listeners.
     * @returns Replaced item.
     */
    [PropertySymbol.setNamedItem](item, ignoreListeners = false) {
        if (item[PropertySymbol.ownerElement] !== null &&
            item[PropertySymbol.ownerElement] !== this[PropertySymbol.ownerElement]) {
            throw new this[PropertySymbol.ownerElement][PropertySymbol.window].DOMException('The attribute is in use.', DOMExceptionNameEnum.inUseAttributeError);
        }
        item[PropertySymbol.ownerElement] = this[PropertySymbol.ownerElement];
        const replacedItem = this.getNamedItemNS(item[PropertySymbol.namespaceURI], item[PropertySymbol.localName]) ||
            null;
        const itemsByName = this[PropertySymbol.itemsByName].get(item[PropertySymbol.name]);
        if (replacedItem === item) {
            return item;
        }
        this[PropertySymbol.itemsByNamespaceURI].set(`${item[PropertySymbol.namespaceURI] || ''}:${item[PropertySymbol.localName]}`, item);
        this[PropertySymbol.items].set(`${item[PropertySymbol.namespaceURI] || ''}:${item[PropertySymbol.name]}`, item);
        if (!itemsByName?.length) {
            this[PropertySymbol.itemsByName].set(item[PropertySymbol.name], [item]);
        }
        else {
            const index = itemsByName.indexOf(replacedItem);
            if (index !== -1) {
                itemsByName.splice(index, 1);
            }
            itemsByName.push(item);
        }
        if (!ignoreListeners) {
            this[PropertySymbol.ownerElement][PropertySymbol.onSetAttribute](item, replacedItem);
        }
        return replacedItem;
    }
    /**
     * Removes named item.
     *
     * @param item Item.
     * @param ignoreListeners
     */
    [PropertySymbol.removeNamedItem](item, ignoreListeners = false) {
        item[PropertySymbol.ownerElement] = null;
        this[PropertySymbol.itemsByNamespaceURI].delete(`${item[PropertySymbol.namespaceURI] || ''}:${item[PropertySymbol.localName]}`);
        this[PropertySymbol.items].delete(`${item[PropertySymbol.namespaceURI] || ''}:${item[PropertySymbol.name]}`);
        const itemsByName = this[PropertySymbol.itemsByName].get(item[PropertySymbol.name]);
        if (itemsByName?.length) {
            const index = itemsByName.indexOf(item);
            if (index !== -1) {
                itemsByName.splice(index, 1);
            }
            if (!itemsByName.length) {
                this[PropertySymbol.itemsByName].delete(item[PropertySymbol.name]);
            }
        }
        if (!ignoreListeners) {
            this[PropertySymbol.ownerElement][PropertySymbol.onRemoveAttribute](item);
        }
    }
}
//# sourceMappingURL=NamedNodeMap.js.map