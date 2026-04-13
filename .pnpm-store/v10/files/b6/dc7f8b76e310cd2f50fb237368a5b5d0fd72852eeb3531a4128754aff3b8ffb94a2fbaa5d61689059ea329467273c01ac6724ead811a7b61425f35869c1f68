import { InternalNamePath, Meta } from "./types.js";
import { ValidateStatus } from "./FormItem/index.js";

//#region src/form/util.d.ts
declare function toArray<T>(candidate?: T | T[] | false): T[];
declare function getFieldId(namePath: InternalNamePath, formName?: string): string | undefined;
/**
 * Get merged status by meta or passed `validateStatus`.
 */
declare function getStatus<DefaultValue>(errors: any[], warnings: any[], meta: Meta, defaultValidateStatus: ValidateStatus | DefaultValue, hasFeedback?: boolean, validateStatus?: ValidateStatus): ValidateStatus | DefaultValue;
declare function initialValueFormat(value: any): any;
//#endregion
export { getFieldId, getStatus, initialValueFormat, toArray };