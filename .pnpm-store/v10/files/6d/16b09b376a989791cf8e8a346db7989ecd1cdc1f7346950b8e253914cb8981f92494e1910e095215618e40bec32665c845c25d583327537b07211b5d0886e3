import { InternalNamePath, InternalValidateOptions, RuleError, RuleObject, StoreValue } from "../types.js";

//#region src/form/utils/validateUtil.d.ts
/**
 * We use `async-validator` to validate the value.
 * But only check one value in a time to avoid namePath validate issue.
 */
declare function validateRules(namePath: InternalNamePath, value: StoreValue, rules: RuleObject[], options: InternalValidateOptions, validateFirst: boolean | 'parallel', messageVariables?: Record<string, string>): Promise<RuleError[]>;
//#endregion
export { validateRules };