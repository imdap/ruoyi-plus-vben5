import { SizeType } from "../config-provider/SizeContext.js";
import { ComponentBaseProps } from "../config-provider/context.js";
import { CSSProperties } from "vue";

//#region src/flex/interface.d.ts
interface FlexProps extends ComponentBaseProps {
  vertical?: boolean;
  wrap?: boolean | CSSProperties['flexWrap'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  flex?: CSSProperties['flex'];
  gap?: CSSProperties['gap'] | SizeType;
  component?: any;
}
//#endregion
export { FlexProps };