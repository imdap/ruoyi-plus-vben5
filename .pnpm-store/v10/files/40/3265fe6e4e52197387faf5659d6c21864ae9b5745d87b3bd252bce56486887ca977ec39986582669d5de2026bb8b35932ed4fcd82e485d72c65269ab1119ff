import * as PropertySymbol from '../PropertySymbol.js';
import ClassMethodBinder from '../utilities/ClassMethodBinder.js';
const MEDIUM_REGEXP = /\s*,\s*/;
/**
 * MediaList interface.
 */
export default class MediaList {
    [PropertySymbol.cssRule];
    /**
     *
     * @param illegalConstructorSymbol
     * @param cssRule
     */
    constructor(illegalConstructorSymbol, cssRule) {
        if (illegalConstructorSymbol !== PropertySymbol.illegalConstructor) {
            throw new TypeError('Illegal constructor');
        }
        this[PropertySymbol.cssRule] = cssRule;
        const methodBinder = new ClassMethodBinder(this, [MediaList]);
        return new Proxy(this, {
            get: (target, property) => {
                if (property in target || typeof property === 'symbol') {
                    methodBinder.bind(property);
                    return target[property];
                }
                const index = Number(property);
                if (!isNaN(index)) {
                    return target[PropertySymbol.getItemList]()[index];
                }
            },
            set(target, property, newValue) {
                methodBinder.bind(property);
                if (property in target || typeof property === 'symbol') {
                    target[property] = newValue;
                    return true;
                }
                return true;
            },
            deleteProperty(target, property) {
                if (property in target || typeof property === 'symbol') {
                    delete target[property];
                    return true;
                }
                return true;
            },
            ownKeys(target) {
                return Object.keys(target[PropertySymbol.getItemList]());
            },
            has(target, property) {
                if (typeof property === 'symbol') {
                    return false;
                }
                if (property in target) {
                    return true;
                }
                const index = Number(property);
                return !isNaN(index) && index >= 0 && index < target[PropertySymbol.getItemList]().length;
            },
            defineProperty(target, property, descriptor) {
                methodBinder.preventBinding(property);
                if (property in target) {
                    Object.defineProperty(target, property, descriptor);
                    return true;
                }
                return false;
            },
            getOwnPropertyDescriptor(target, property) {
                if (property in target || typeof property === 'symbol') {
                    return;
                }
                const index = Number(property);
                const items = target[PropertySymbol.getItemList]();
                if (!isNaN(index) && items[index]) {
                    return {
                        value: items[index],
                        writable: false,
                        enumerable: true,
                        configurable: true
                    };
                }
            }
        });
    }
    /**
     * Returns length.
     *
     * @returns Length.
     */
    get length() {
        return this[PropertySymbol.getItemList]().length;
    }
    /**
     * Returns media text.
     *
     * @returns Media text.
     */
    get mediaText() {
        return this[PropertySymbol.cssRule][PropertySymbol.conditionText];
    }
    /**
     * Sets media text.
     *
     * @param mediaText Media text.
     */
    set mediaText(mediaText) {
        this[PropertySymbol.cssRule][PropertySymbol.conditionText] =
            mediaText === null ? '' : String(mediaText).split(MEDIUM_REGEXP).join(', ');
    }
    /**
     * Returns item.
     *
     * @param index Index.
     * @returns Item.
     */
    item(index) {
        const items = this[PropertySymbol.getItemList]();
        return items[Number(index)] || null;
    }
    /**
     * Appends a medium.
     *
     * @param medium Medium.
     */
    appendMedium(medium) {
        const items = this[PropertySymbol.getItemList]();
        if (items.indexOf(medium) === -1) {
            items.push(medium);
            this[PropertySymbol.cssRule][PropertySymbol.conditionText] = items.join(', ');
        }
    }
    /**
     * Deletes a medium.
     *
     * @param medium Medium.
     */
    deleteMedium(medium) {
        const items = this[PropertySymbol.getItemList]();
        const index = items.indexOf(medium);
        if (index !== -1) {
            items.splice(index, 1);
            this[PropertySymbol.cssRule][PropertySymbol.conditionText] = items.join(', ');
        }
    }
    /**
     * Returns item list.
     *
     * @returns Item list.
     */
    [PropertySymbol.getItemList]() {
        const text = this[PropertySymbol.cssRule][PropertySymbol.conditionText].trim();
        const media = text
            ? this[PropertySymbol.cssRule][PropertySymbol.conditionText].split(MEDIUM_REGEXP)
            : [];
        return media;
    }
}
//# sourceMappingURL=MediaList.js.map