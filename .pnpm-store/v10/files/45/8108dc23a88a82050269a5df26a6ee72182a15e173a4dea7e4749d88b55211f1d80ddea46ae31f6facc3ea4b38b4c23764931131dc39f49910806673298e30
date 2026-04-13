import { ImplCSpellConfigFile } from '../CSpellConfigFile.js';
export class CSpellConfigFileInMemory extends ImplCSpellConfigFile {
    url;
    settings;
    constructor(
    /** A url representing where it might exist, used to resolve imports. */
    url, settings) {
        super(url, settings);
        this.url = url;
        this.settings = settings;
    }
    setSchema(schema) {
        this.settings.$schema = schema;
        return this;
    }
    get virtual() {
        return true;
    }
    static from(url, settings, _indent) {
        return new CSpellConfigFileInMemory(url, settings);
    }
}
//# sourceMappingURL=CSpellConfigFileInMemory.js.map