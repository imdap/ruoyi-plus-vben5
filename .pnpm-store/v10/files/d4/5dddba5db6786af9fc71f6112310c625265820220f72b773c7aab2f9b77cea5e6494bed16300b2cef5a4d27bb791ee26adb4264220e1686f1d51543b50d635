import { CSpellConfigFilePackageJson, parseCSpellConfigFilePackageJson, } from '../CSpellConfigFile/CSpellConfigFilePackageJson.js';
const isSupportedFormat = /\bpackage\.json$/i;
function deserializer(params, next) {
    if (!isSupportedFormat.test(params.url.pathname))
        return next(params);
    return parseCSpellConfigFilePackageJson(params);
}
function serializer(settings, next) {
    if (!(settings instanceof CSpellConfigFilePackageJson))
        return next(settings);
    return settings.serialize();
}
export const serializerPackageJson = { deserialize: deserializer, serialize: serializer };
//# sourceMappingURL=packageJson.js.map