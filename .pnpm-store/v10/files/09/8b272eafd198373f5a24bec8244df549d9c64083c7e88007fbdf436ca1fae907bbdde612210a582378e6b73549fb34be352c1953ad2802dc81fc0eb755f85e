//#region src/linters/interface.d.ts
interface LinterInfo {
  path?: string;
  hashId?: string;
  parentSelectors: string[];
}
interface Linter {
  (key: string, value: string | number, info: LinterInfo): void;
}
//#endregion
export { Linter, LinterInfo };