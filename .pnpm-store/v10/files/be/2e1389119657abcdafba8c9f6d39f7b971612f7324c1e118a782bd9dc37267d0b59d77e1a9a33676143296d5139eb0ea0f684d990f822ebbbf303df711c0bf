import { IconBaseProps } from "./Icon.js";
import * as vue from "vue";

//#region src/components/IconFont.d.ts
interface CustomIconOptions {
  scriptUrl?: string | string[];
  extraCommonProps?: Record<string, unknown>;
}
interface IconFontProps<T extends string = string> extends IconBaseProps {
  type: T;
}
declare function create(options?: CustomIconOptions): vue.DefineSetupFnComponent<IconFontProps<string>, {}, {}, IconFontProps<string> & {}, vue.PublicProps>;
//#endregion
export { create };