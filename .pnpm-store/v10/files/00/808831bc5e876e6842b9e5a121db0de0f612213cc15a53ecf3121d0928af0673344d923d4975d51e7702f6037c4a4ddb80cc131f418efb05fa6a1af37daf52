import type { CSpellSettings } from '@cspell/cspell-types';
import { ImplCSpellConfigFile } from '../CSpellConfigFile.js';
import type { TextFile } from '../TextFile.js';
export declare class CSpellConfigFileToml extends ImplCSpellConfigFile {
    readonly url: URL;
    constructor(url: URL, settings: CSpellSettings);
    serialize(): string;
    removeAllComments(): this;
    setSchema(schema: string): this;
    setComment(_field: keyof CSpellSettings, _comment: string, _inline?: boolean): this;
    static parse(file: TextFile): CSpellConfigFileToml;
    static from(url: URL, settings: CSpellSettings, _indent?: number): CSpellConfigFileToml;
}
export declare function parseCSpellConfigFileToml(file: TextFile): CSpellConfigFileToml;
//# sourceMappingURL=CSpellConfigFileToml.d.ts.map