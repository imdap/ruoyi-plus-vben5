export function isDictionaryDefinitionInlineInternal(def) {
    if (def.path)
        return false;
    const defInline = def;
    return !!(defInline.words || defInline.flagWords || defInline.ignoreWords || defInline.suggestWords);
}
export function isDictionaryFileDefinitionInternal(def) {
    return !!(def.path || def.file);
}
//# sourceMappingURL=InternalDictionaryDef.js.map