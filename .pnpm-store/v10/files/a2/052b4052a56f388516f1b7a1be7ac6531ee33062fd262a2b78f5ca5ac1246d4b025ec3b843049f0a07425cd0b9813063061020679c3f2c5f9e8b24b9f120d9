import { ImplCSpellConfigFile } from '../CSpellConfigFile.js';
import { detectIndent } from '../serializers/util.js';
export class CSpellConfigFilePackageJson extends ImplCSpellConfigFile {
    url;
    settings;
    serializer;
    constructor(url, settings, serializer) {
        super(url, settings);
        this.url = url;
        this.settings = settings;
        this.serializer = serializer;
    }
    serialize() {
        return this.serializer(this.settings);
    }
}
export function parseCSpellConfigFilePackageJson(file) {
    const { url, content } = file;
    const packageJson = JSON.parse(content);
    if (!packageJson || typeof packageJson !== 'object' || Array.isArray(packageJson)) {
        throw new Error(`Unable to parse ${url}`);
    }
    packageJson['cspell'] = packageJson['cspell'] || {};
    const cspell = packageJson['cspell'];
    if (typeof cspell !== 'object' || Array.isArray(cspell)) {
        throw new TypeError(`Unable to parse ${url}`);
    }
    const indent = detectIndent(content);
    function serialize(settings) {
        packageJson['cspell'] = settings;
        return JSON.stringify(packageJson, undefined, indent) + '\n';
    }
    return new CSpellConfigFilePackageJson(url, cspell, serialize);
}
//# sourceMappingURL=CSpellConfigFilePackageJson.js.map