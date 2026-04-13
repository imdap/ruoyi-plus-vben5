import { SizeType } from "../config-provider/SizeContext.js";
import { ScreenSizeMap } from "../_util/responsiveObserver.js";
import { Ref } from "vue";

//#region src/avatar/AvatarContext.d.ts
/**
 * 'default' is deprecated and will be removed in v7, please use `medium` instead.
 */
type AvatarSize = SizeType | 'default' | number | ScreenSizeMap;
interface AvatarContextType {
  size?: AvatarSize;
  shape?: 'circle' | 'square';
}
declare function useAvatarContext(): Ref<{
  size?: number | "default" | SizeType | {
    xxxl?: number | undefined;
    xxl?: number | undefined;
    xl?: number | undefined;
    lg?: number | undefined;
    md?: number | undefined;
    sm?: number | undefined;
    xs?: number | undefined;
  };
  shape?: "circle" | "square" | undefined;
}, AvatarContextType | {
  size?: number | "default" | SizeType | {
    xxxl?: number | undefined;
    xxl?: number | undefined;
    xl?: number | undefined;
    lg?: number | undefined;
    md?: number | undefined;
    sm?: number | undefined;
    xs?: number | undefined;
  };
  shape?: "circle" | "square" | undefined;
}>;
declare function useAvatarProvider(value: Ref<AvatarContextType>): void;
//#endregion
export { AvatarContextType, AvatarSize, useAvatarContext, useAvatarProvider };