import { DirectionType } from "../config-provider/context.js";
import { Ref } from "vue";
import { SliderProps } from "@v-c/slider";

//#region src/slider/Context.d.ts
interface SliderInternalContextProps {
  handleRender?: SliderProps['handleRender'];
  direction?: Ref<DirectionType>;
}
/** @private Internal context. Do not use in your production. */
declare function useSliderInternalContext(): SliderInternalContextProps;
declare function useSliderInternalContextProvider(value: SliderInternalContextProps): void;
//#endregion
export { SliderInternalContextProps, useSliderInternalContext, useSliderInternalContextProvider };