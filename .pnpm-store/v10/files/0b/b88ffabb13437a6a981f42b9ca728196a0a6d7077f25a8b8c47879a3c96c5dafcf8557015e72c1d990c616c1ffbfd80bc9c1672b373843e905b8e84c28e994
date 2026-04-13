//#region src/util/cacheMapUtil.d.ts
declare const ATTR_CACHE_MAP = "data-ant-cssinjs-cache-path";
/**
 * This marks style from the css file.
 * Which means not exist in `<style />` tag.
 */
declare const CSS_FILE_STYLE = "_FILE_STYLE__";
declare function serialize(cachePathMap: Record<string, string>): string;
/**
 * @private Test usage only. Can save remove if no need.
 */
declare function reset(mockCache?: Record<string, string>, fromFile?: boolean): void;
declare function prepare(): void;
declare function existPath(path: string): boolean;
declare function getStyleAndHash(path: string): [style: string | null, hash: string];
//#endregion
export { ATTR_CACHE_MAP, CSS_FILE_STYLE, existPath, getStyleAndHash, prepare, reset, serialize };