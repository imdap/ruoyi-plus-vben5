import { clean } from '../../util/util.js';
export const SymbolCSpellSettingsInternal = Symbol('CSpellSettingsInternal');
export function cleanCSpellSettingsInternal(parts) {
    return parts
        ? Object.assign(clean(parts), { [SymbolCSpellSettingsInternal]: true })
        : { [SymbolCSpellSettingsInternal]: true };
}
export function createCSpellSettingsInternal(parts) {
    return cleanCSpellSettingsInternal({ ...parts });
}
export function isCSpellSettingsInternal(cs) {
    return !!cs[SymbolCSpellSettingsInternal];
}
//# sourceMappingURL=CSpellSettingsInternalDef.js.map