import type { ExtendedSuggestion } from './Suggestion.js';
import type { ValidationResult, ValidationResultRPC } from './ValidationResult.js';
export interface ValidationIssue extends ValidationResult {
    suggestions?: string[] | undefined;
    suggestionsEx?: ExtendedSuggestion[] | undefined;
}
/**
 * The ValidationIssueRPC is used for RPC communication. It is a subset of ValidationIssue that can be serialized.
 */
export interface ValidationIssueRPC extends ValidationResultRPC {
    suggestionsEx?: ExtendedSuggestion[] | undefined;
}
export declare function toValidationIssueRPC(issue: ValidationIssue, index?: number): ValidationIssueRPC;
//# sourceMappingURL=ValidationIssue.d.ts.map