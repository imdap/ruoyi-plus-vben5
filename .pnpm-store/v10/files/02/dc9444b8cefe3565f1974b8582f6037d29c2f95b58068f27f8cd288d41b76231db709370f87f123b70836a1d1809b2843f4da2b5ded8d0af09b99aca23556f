import { CSpellConfigFileToml, parseCSpellConfigFileToml } from '../CSpellConfigFile/CSpellConfigFileToml.js';
function deserializer(params, next) {
    if (!isTomlFile(params.url.pathname))
        return next(params);
    return parseCSpellConfigFileToml(params);
}
function isTomlFile(pathname) {
    pathname = pathname.toLowerCase();
    return pathname.endsWith('.toml');
}
function serializer(settings, next) {
    if (!(settings instanceof CSpellConfigFileToml))
        return next(settings);
    return settings.serialize();
}
export const serializerCSpellToml = { deserialize: deserializer, serialize: serializer };
//# sourceMappingURL=cspellToml.js.map