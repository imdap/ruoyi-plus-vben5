import { TokenMap } from "../interface/components.js";

//#region src/cssinjs-utils/util/statistic.d.ts
declare function merge<CompTokenMap extends TokenMap>(...objs: Partial<CompTokenMap>[]): CompTokenMap;
declare const statistic: Record<string, {
  global: string[];
  component: Record<string, string | number>;
}>;
declare const _statistic_build_: typeof statistic;
declare function statisticToken<CompTokenMap extends TokenMap>(token: CompTokenMap): {
  token: CompTokenMap;
  keys: Set<string> | undefined;
  flush: (component: string, componentToken: Record<string, string | number>) => void;
};
//#endregion
export { _statistic_build_, statisticToken as default, merge, statistic };