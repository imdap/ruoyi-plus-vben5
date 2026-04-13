//#region src/index.d.ts
declare const isSupported: boolean;
interface Options {
  skipNodeModules?: boolean;
}
declare function init({
  skipNodeModules
}?: Options): () => void;
declare function unregister(): void;
declare function clearRequireCache(): void;
//#endregion
export { Options, clearRequireCache, init, isSupported, unregister };