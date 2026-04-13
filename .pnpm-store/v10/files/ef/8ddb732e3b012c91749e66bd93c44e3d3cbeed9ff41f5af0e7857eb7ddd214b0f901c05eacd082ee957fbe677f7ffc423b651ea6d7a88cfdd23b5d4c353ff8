import { InternalRuleItem, InternalValidateMessages, RuleItem, Rules, RuleType, SyncErrorType, ValidateCallback, ValidateMessages, ValidateOption, Values } from './interface';
export * from './interface';
/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */
declare class Schema {
    static register: (type: string, validator: any) => void;
    static warning: (type: string, errors: SyncErrorType[]) => void;
    static messages: InternalValidateMessages;
    static validators: {
        string: import('./interface').ExecuteValidator;
        method: import('./interface').ExecuteValidator;
        number: import('./interface').ExecuteValidator;
        boolean: import('./interface').ExecuteValidator;
        regexp: import('./interface').ExecuteValidator;
        integer: import('./interface').ExecuteValidator;
        float: import('./interface').ExecuteValidator;
        array: import('./interface').ExecuteValidator;
        object: import('./interface').ExecuteValidator;
        enum: import('./interface').ExecuteValidator;
        pattern: import('./interface').ExecuteValidator;
        date: import('./interface').ExecuteValidator;
        url: import('./interface').ExecuteValidator;
        hex: import('./interface').ExecuteValidator;
        email: import('./interface').ExecuteValidator;
        tel: import('./interface').ExecuteValidator;
        required: import('./interface').ExecuteValidator;
        any: import('./interface').ExecuteValidator;
    };
    rules: Record<string, RuleItem[]>;
    _messages: InternalValidateMessages;
    constructor(descriptor: Rules);
    define(rules: Rules): void;
    messages(messages?: ValidateMessages): InternalValidateMessages;
    validate(source: Values, option?: ValidateOption, callback?: ValidateCallback): Promise<Values>;
    validate(source: Values, callback: ValidateCallback): Promise<Values>;
    validate(source: Values): Promise<Values>;
    getType(rule: InternalRuleItem): RuleType;
    getValidationMethod(rule: InternalRuleItem): ((rule: InternalRuleItem, value: import('./interface').Value, callback: (error?: string | Error) => void, source: Values, options: ValidateOption) => import('./interface').SyncValidateResult | void) | import('./interface').ExecuteValidator;
}
export default Schema;
