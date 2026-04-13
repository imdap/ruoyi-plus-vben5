import { CSpellConfigFileJson, parseCSpellConfigFileJson } from '../CSpellConfigFile/CSpellConfigFileJson.js';
function deserializer(params, next) {
    if (!isJsonFile(params.url.pathname))
        return next(params);
    return parseCSpellConfigFileJson(params);
}
function isJsonFile(pathname) {
    pathname = pathname.toLowerCase();
    return pathname.endsWith('.json') || pathname.endsWith('.jsonc');
}
function serializer(settings, next) {
    if (!(settings instanceof CSpellConfigFileJson))
        return next(settings);
    return settings.serialize();
}
export const serializerCSpellJson = { deserialize: deserializer, serialize: serializer };
//# sourceMappingURL=cspellJson.js.map