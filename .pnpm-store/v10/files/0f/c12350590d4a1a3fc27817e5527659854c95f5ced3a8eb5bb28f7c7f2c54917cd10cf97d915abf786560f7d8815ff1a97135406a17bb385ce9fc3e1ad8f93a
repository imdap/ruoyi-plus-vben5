import { SeedToken } from "../../interface/seeds.js";
import { ColorMapToken } from "../../interface/maps/colors.js";
import "../../interface/index.js";
import { GenerateColorMap, GenerateNeutralColorMap } from "../ColorMap.js";

//#region src/theme/themes/shared/genColorMapToken.d.ts
interface PaletteGenerators {
  generateColorPalettes: GenerateColorMap;
  generateNeutralColorPalettes: GenerateNeutralColorMap;
}
declare function genColorMapToken(seed: SeedToken, {
  generateColorPalettes,
  generateNeutralColorPalettes
}: PaletteGenerators): ColorMapToken;
//#endregion
export { genColorMapToken as default };