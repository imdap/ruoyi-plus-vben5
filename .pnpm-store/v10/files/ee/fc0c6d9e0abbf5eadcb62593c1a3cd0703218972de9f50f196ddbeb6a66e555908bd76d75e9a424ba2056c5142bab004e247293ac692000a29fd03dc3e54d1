import type { CachingDictionary, SpellingDictionary } from 'cspell-dictionary';
import type { SubstitutionTransformer } from '../Transform/index.js';
import type { LineValidatorFn, TextValidatorFn, ValidationOptions } from './ValidationTypes.js';
interface LineValidator {
    fn: LineValidatorFn;
    dict: CachingDictionary;
}
export declare function lineValidatorFactory(sDict: SpellingDictionary, options: ValidationOptions): LineValidator;
export interface TextValidator {
    validate: TextValidatorFn;
    lineValidator: LineValidator;
}
export interface TextValidationFactoryOptions extends ValidationOptions {
    transformer: SubstitutionTransformer | undefined;
}
export declare function textValidatorFactory(dict: SpellingDictionary, options: TextValidationFactoryOptions): TextValidator;
export {};
//# sourceMappingURL=lineValidatorFactory.d.ts.map