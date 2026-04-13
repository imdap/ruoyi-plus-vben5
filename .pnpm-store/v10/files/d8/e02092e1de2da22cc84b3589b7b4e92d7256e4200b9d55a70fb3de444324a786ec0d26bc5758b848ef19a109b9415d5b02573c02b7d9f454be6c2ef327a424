import type { CSpellSettings, CSpellSettingsWithSourceTrace } from '@cspell/cspell-types';
import type { CSpellConfigFile } from 'cspell-config-lib';
import type { CSpellSettingsWST } from './Controller/configLoader/types.js';
export interface GlobalSettingsWithSource extends Partial<GlobalCSpellSettings> {
    source: CSpellSettingsWithSourceTrace['source'];
}
export interface GlobalCSpellSettings extends Required<Pick<CSpellSettings, 'import'>> {
}
export declare function getRawGlobalSettings(): Promise<CSpellSettingsWST>;
export declare function getGlobalConfig(): Promise<CSpellConfigFile>;
export declare function writeRawGlobalSettings(settings: GlobalCSpellSettings): Promise<void>;
export declare function getGlobalConfigPath(): string | undefined;
//# sourceMappingURL=GlobalSettings.d.ts.map