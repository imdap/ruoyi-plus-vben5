import { Rule } from "eslint";

//#region src/utils.d.ts
interface RuleModule<T extends readonly unknown[]> extends Rule.RuleModule {
  defaultOptions: T;
}
//#endregion
//#region src/index.d.ts
declare const _default: {
  meta: {
    name: string;
    version: string;
  };
  rules: {
    command: RuleModule<[]>;
  };
};
//#endregion
export { _default as default };