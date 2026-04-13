import { parse, stringify } from 'comment-json';
import { ImplCSpellConfigFile } from '../CSpellConfigFile.js';
import { detectIndent } from '../serializers/util.js';
import { ParseError } from './Errors.js';
export class CSpellConfigFileJson extends ImplCSpellConfigFile {
    url;
    indent = 2;
    constructor(url, settings) {
        super(url, settings);
        this.url = url;
    }
    serialize() {
        return stringify(this.settings, undefined, this.indent) + '\n';
    }
    removeAllComments() {
        // comment-json uses symbols for comments, so we need to remove them.
        for (const key of Object.getOwnPropertySymbols(this.settings)) {
            delete this.settings[key];
        }
        Object.assign(this.settings, JSON.parse(JSON.stringify(this.settings)));
        return this;
    }
    setSchema(schema) {
        this.settings.$schema = schema;
        return this;
    }
    setComment(field, comment, inline) {
        const prefix = inline ? 'after:' : 'before:';
        const symbolKey = Symbol.for(prefix + field);
        const token = {
            type: 'LineComment',
            value: comment,
            inline,
        };
        const settings = this.settings;
        settings[symbolKey] = [token];
        return this;
    }
    static parse(file) {
        try {
            const cspell = parseJson(file.content);
            if (!isCSpellSettings(cspell)) {
                throw new ParseError(file.url);
            }
            const indent = detectIndent(file.content);
            const cfg = new CSpellConfigFileJson(file.url, cspell);
            cfg.indent = indent;
            return cfg;
        }
        catch (cause) {
            if (cause instanceof ParseError) {
                throw cause;
            }
            throw new ParseError(file.url, undefined, { cause });
        }
    }
    static from(url, settings, indent = 2) {
        const cfg = new CSpellConfigFileJson(url, settings);
        cfg.indent = indent;
        return cfg;
    }
}
function parseJson(content) {
    try {
        return JSON.parse(content);
    }
    catch {
        return parse(content);
    }
}
export function parseCSpellConfigFileJson(file) {
    return CSpellConfigFileJson.parse(file);
}
function isCSpellSettings(cfg) {
    return !(!cfg || typeof cfg !== 'object' || Array.isArray(cfg));
}
//# sourceMappingURL=CSpellConfigFileJson.js.map