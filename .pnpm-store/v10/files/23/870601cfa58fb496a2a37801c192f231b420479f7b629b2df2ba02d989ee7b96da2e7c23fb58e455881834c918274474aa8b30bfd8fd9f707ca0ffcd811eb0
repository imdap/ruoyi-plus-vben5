import { parse, stringify } from 'smol-toml';
import { ImplCSpellConfigFile } from '../CSpellConfigFile.js';
import { ParseError } from './Errors.js';
export class CSpellConfigFileToml extends ImplCSpellConfigFile {
    url;
    constructor(url, settings) {
        super(url, settings);
        this.url = url;
    }
    serialize() {
        return stringify(this.settings);
    }
    removeAllComments() {
        return this;
    }
    setSchema(schema) {
        this.settings.$schema = schema;
        return this;
    }
    setComment(_field, _comment, _inline) {
        return this;
    }
    static parse(file) {
        try {
            const cspell = parse(file.content);
            if (!isCSpellSettings(cspell)) {
                throw new ParseError(file.url);
            }
            const cfg = new CSpellConfigFileToml(file.url, cspell);
            return cfg;
        }
        catch (cause) {
            if (cause instanceof ParseError) {
                throw cause;
            }
            throw new ParseError(file.url, undefined, { cause });
        }
    }
    static from(url, settings, _indent) {
        return new CSpellConfigFileToml(url, settings);
    }
}
export function parseCSpellConfigFileToml(file) {
    return CSpellConfigFileToml.parse(file);
}
function isCSpellSettings(cfg) {
    return !(!cfg || typeof cfg !== 'object' || Array.isArray(cfg));
}
//# sourceMappingURL=CSpellConfigFileToml.js.map