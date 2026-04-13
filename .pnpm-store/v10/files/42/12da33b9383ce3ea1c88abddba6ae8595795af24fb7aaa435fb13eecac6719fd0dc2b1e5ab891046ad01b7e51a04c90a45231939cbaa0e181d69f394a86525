import { ImplCSpellConfigFile } from '../CSpellConfigFile.js';
export class CSpellConfigFileJavaScript extends ImplCSpellConfigFile {
    url;
    settings;
    get readonly() {
        return true;
    }
    constructor(url, settings) {
        super(url, settings);
        this.url = url;
        this.settings = settings;
    }
    addWords(_words) {
        throw new Error('Unable to add words to a JavaScript config file.');
    }
}
//# sourceMappingURL=CSpellConfigFileJavaScript.js.map