import { ColorPalettes, LegacyColorPalettes } from "../presetColors.js";
import { SeedToken } from "../seeds.js";
import { ColorLinkMapToken, ColorMapToken, ColorNeutralMapToken } from "./colors.js";
import { FontMapToken } from "./font.js";
import { HeightMapToken, SizeMapToken } from "./size.js";
import { StyleMapToken } from "./style.js";

//#region src/theme/interface/maps/index.d.ts
interface CommonMapToken extends StyleMapToken {
  /**
   * @desc 动效播放速度，快速。用于小型元素动画交互
   * @descEN Motion speed, fast speed. Used for small element animation interaction.
   */
  motionDurationFast: string;
  /**
   * @desc 动效播放速度，中速。用于中型元素动画交互
   * @descEN Motion speed, medium speed. Used for medium element animation interaction.
   */
  motionDurationMid: string;
  /**
   * @desc 动效播放速度，慢速。用于大型元素如面板动画交互
   * @descEN Motion speed, slow speed. Used for large element animation interaction.
   */
  motionDurationSlow: string;
}
interface MapToken extends SeedToken, ColorPalettes, LegacyColorPalettes, ColorMapToken, SizeMapToken, HeightMapToken, StyleMapToken, FontMapToken, CommonMapToken {}
//#endregion
export { ColorLinkMapToken, ColorMapToken, ColorNeutralMapToken, CommonMapToken, FontMapToken, HeightMapToken, MapToken, SizeMapToken, StyleMapToken };