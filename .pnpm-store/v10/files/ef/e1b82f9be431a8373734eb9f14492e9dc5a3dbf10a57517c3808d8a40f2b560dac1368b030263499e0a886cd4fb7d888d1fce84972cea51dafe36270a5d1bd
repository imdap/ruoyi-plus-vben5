import type { CSpellSettings } from '@cspell/cspell-types';
export declare const legacyLocationDir: string | undefined;
export declare const cspellGlobalLocationDir: string;
export declare const defaultConfigFileName = "cspell.json";
interface GlobalConfigFile {
    filename: string;
    config: CSpellSettings;
}
export declare class GlobalConfigStore {
    #private;
    constructor(filename?: string);
    readConfigFile(): Promise<GlobalConfigFile | undefined>;
    writeConfigFile(cfg: CSpellSettings): Promise<string>;
    get location(): string | undefined;
    static create(): GlobalConfigStore;
    static defaultLocation: string;
}
export {};
//# sourceMappingURL=cfgStore.d.ts.map