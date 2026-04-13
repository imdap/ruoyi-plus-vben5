/**
 * Create a collection of dictionary references to be able to easily determine if a dictionary is enabled or blocked.
 * @param dictionaries - list of dictionary references
 * @returns DictionaryReferenceCollection
 */
export function createDictionaryReferenceCollection(dictionaries) {
    return new _DictionaryReferenceCollection(dictionaries);
}
class _DictionaryReferenceCollection {
    dictionaries;
    collection;
    constructor(dictionaries) {
        this.dictionaries = dictionaries;
        this.collection = collect(dictionaries);
    }
    isEnabled(name) {
        const entry = this.collection[name];
        return entry === undefined ? undefined : !!(entry & 0x1);
    }
    isBlocked(name) {
        const entry = this.collection[name];
        return entry === undefined ? undefined : !(entry & 0x1);
    }
    enabled() {
        return this.dictionaryIds.filter((n) => this.isEnabled(n));
    }
    blocked() {
        return this.dictionaryIds.filter((n) => this.isBlocked(n));
    }
    get dictionaryIds() {
        return Object.keys(this.collection);
    }
}
function collect(dictionaries) {
    const refs = dictionaries.map(normalizeName).map(mapReference);
    const col = {};
    for (const ref of refs) {
        col[ref.name] = Math.max(ref.weight, col[ref.name] || 0);
    }
    return col;
}
function normalizeName(entry) {
    return entry.normalize().trim();
}
function mapReference(ref) {
    const name = ref.replace(/^!+/, '');
    const weight = ref.length - name.length + 1;
    return { name: name.trim(), weight };
}
//# sourceMappingURL=DictionaryReferenceCollection.js.map