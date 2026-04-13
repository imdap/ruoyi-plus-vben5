import { CSpellConfigFileYaml, parseCSpellConfigFileYaml } from '../CSpellConfigFile/CSpellConfigFileYaml.js';
function deserializer(params, next) {
    if (!isYamlFile(params.url.pathname))
        return next(params);
    return parseCSpellConfigFileYaml(params);
}
function isYamlFile(pathname) {
    pathname = pathname.toLowerCase();
    return pathname.endsWith('.yml') || pathname.endsWith('.yaml');
}
function serializer(settings, next) {
    if (!(settings instanceof CSpellConfigFileYaml))
        return next(settings);
    return settings.serialize();
}
export const serializerCSpellYaml = { deserialize: deserializer, serialize: serializer };
//# sourceMappingURL=cspellYaml.js.map