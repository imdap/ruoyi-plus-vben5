import type { CSpellSettings } from '@cspell/cspell-types';
import { ImplCSpellConfigFile } from '../CSpellConfigFile.js';
import type { TextFile } from '../TextFile.js';
export declare class CSpellConfigFileJson extends ImplCSpellConfigFile {
    readonly url: URL;
    indent: string | number;
    constructor(url: URL, settings: CSpellSettings);
    serialize(): string;
    removeAllComments(): this;
    setSchema(schema: string): this;
    setComment(field: keyof CSpellSettings, comment: string, inline?: boolean): this;
    static parse(file: TextFile): CSpellConfigFileJson;
    static from(url: URL, settings: CSpellSettings, indent?: number | string): CSpellConfigFileJson;
}
export declare function parseCSpellConfigFileJson(file: TextFile): CSpellConfigFileJson;
//# sourceMappingURL=CSpellConfigFileJson.d.ts.map