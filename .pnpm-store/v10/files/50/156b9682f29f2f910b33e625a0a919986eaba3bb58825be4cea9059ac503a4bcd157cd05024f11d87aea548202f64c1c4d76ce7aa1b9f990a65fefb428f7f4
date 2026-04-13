export class CSpellConfigFile {
    url;
    constructor(url) {
        this.url = url;
    }
    get readonly() {
        return this.settings.readonly || this.url.protocol !== 'file:';
    }
    get virtual() {
        return false;
    }
    get remote() {
        return this.url.protocol !== 'file:';
    }
}
export class MutableCSpellConfigFile extends CSpellConfigFile {
}
export class ImplCSpellConfigFile extends CSpellConfigFile {
    url;
    settings;
    constructor(url, settings) {
        super(url);
        this.url = url;
        this.settings = settings;
    }
    setSchema(_schema) {
        return this;
    }
    removeAllComments() {
        if (this.readonly) {
            throw new Error(`Config file is readonly: ${this.url.href}`);
        }
        // do nothing
        return this;
    }
    addWords(words) {
        if (this.readonly)
            throw new Error(`Config file is readonly: ${this.url.href}`);
        const w = this.settings.words || [];
        this.settings.words = w;
        addUniqueWordsToListAndSort(w, words);
        return this;
    }
    setComment(_key, _comment, _inline) {
        if (this.readonly)
            throw new Error(`Config file is readonly: ${this.url.href}`);
        // do nothing
        return this;
    }
    setValue(key, value) {
        if (this.readonly)
            throw new Error(`Config file is readonly: ${this.url.href}`);
        this.settings[key] = value;
        return this;
    }
}
/**
 * Adds words to a list, sorts the list and makes sure it is unique.
 * Note: this method is used to try and preserve comments in the config file.
 * @param list - list to be modified
 * @param toAdd - words to add
 */
function addUniqueWordsToListAndSort(list, toAdd) {
    list.push(...toAdd);
    list.sort();
    for (let i = 1; i < list.length; ++i) {
        if (list[i] === list[i - 1]) {
            list.splice(i, 1);
            --i;
        }
    }
}
export function satisfiesCSpellConfigFile(obj) {
    const r = obj instanceof CSpellConfigFile ||
        (!!obj &&
            typeof obj === 'object' &&
            'url' in obj &&
            obj.url instanceof URL &&
            'settings' in obj &&
            !!obj.settings &&
            typeof obj.settings === 'object');
    return r;
}
export const cspellConfigFileSchema = 'https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json';
export const __testing__ = {
    addUniqueWordsToListAndSort,
};
//# sourceMappingURL=CSpellConfigFile.js.map