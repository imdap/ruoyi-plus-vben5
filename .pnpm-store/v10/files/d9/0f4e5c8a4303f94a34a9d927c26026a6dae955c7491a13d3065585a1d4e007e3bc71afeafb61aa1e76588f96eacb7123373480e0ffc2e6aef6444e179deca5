import { ImplCSpellConfigFile } from '../CSpellConfigFile.js';
/**
 * A CSpell configuration file that had errors during loading.
 */
export class CSpellConfigFileWithErrors extends ImplCSpellConfigFile {
    url;
    settings;
    error;
    constructor(url, settings, error) {
        super(url, settings);
        this.url = url;
        this.settings = settings;
        this.error = error;
    }
    get readonly() {
        return true;
    }
}
//# sourceMappingURL=CSpellConfigFileWithErrors.js.map