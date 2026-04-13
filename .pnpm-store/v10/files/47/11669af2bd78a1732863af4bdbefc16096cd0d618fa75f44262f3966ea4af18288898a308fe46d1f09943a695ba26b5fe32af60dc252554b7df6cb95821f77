//#region src/theme/interface/presetColors.d.ts
declare const PresetColors: readonly ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
type PresetColorKey = (typeof PresetColors)[number];
type PresetColorType = Record<PresetColorKey, string>;
type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type LegacyColorPalettes = { [key in `${keyof PresetColorType}-${ColorPaletteKeyIndex}`]: string };
type ColorPalettes = { [key in `${keyof PresetColorType}${ColorPaletteKeyIndex}`]: string };
//#endregion
export { ColorPalettes, LegacyColorPalettes, PresetColorKey, PresetColorType, PresetColors };