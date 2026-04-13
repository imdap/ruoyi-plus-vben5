import { DerivativeFunc } from "./interface.js";
import Theme from "./Theme.js";

//#region src/theme/ThemeCache.d.ts
type DerivativeOptions = DerivativeFunc<any, any>[];
declare function sameDerivativeOption(left: DerivativeOptions, right: DerivativeOptions): boolean;
declare class ThemeCache {
  static MAX_CACHE_SIZE: number;
  static MAX_CACHE_OFFSET: number;
  private readonly cache;
  private keys;
  private cacheCallTimes;
  constructor();
  size(): number;
  private internalGet;
  get(derivativeOption: DerivativeOptions): Theme<any, any> | undefined;
  has(derivativeOption: DerivativeOptions): boolean;
  set(derivativeOption: DerivativeOptions, value: Theme<any, any>): void;
  private deleteByPath;
  delete(derivativeOption: DerivativeOptions): Theme<any, any> | undefined;
}
//#endregion
export { ThemeCache as default, sameDerivativeOption };