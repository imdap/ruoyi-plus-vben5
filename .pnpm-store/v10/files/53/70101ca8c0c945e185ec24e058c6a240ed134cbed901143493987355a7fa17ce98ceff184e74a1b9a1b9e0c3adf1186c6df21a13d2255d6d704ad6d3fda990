import type { MappedText, SubstitutionDefinitions, Substitutions } from '@cspell/cspell-types';
type DeepReadonly<T> = T extends object ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
} : T;
export interface SubstitutionInfo {
    substitutions?: Substitutions | undefined;
    substitutionDefinitions?: SubstitutionDefinitions | undefined;
}
export type ReadonlySubstitutionInfo = DeepReadonly<SubstitutionInfo>;
export declare class SubstitutionTransformer {
    #private;
    constructor(subMap: Map<string, string> | undefined);
    transform(text: string | MappedText): MappedText;
    transformString(text: string): MappedText;
}
export interface CreateSubstitutionTransformerResult {
    transformer: SubstitutionTransformer;
    /**
     * The list of substitutions that were requested but not found in the definitions.
     * This is used to report errors to the user about missing substitutions.
     */
    missing: string[] | undefined;
}
/**
 * Creates a SubstitutionTransformer based upon the provided SubstitutionInfo.
 * This will create a transformer that can be used to apply the substitutions to a document before spell checking.
 * @param info
 * @returns
 */
export declare function createSubstitutionTransformer(info: ReadonlySubstitutionInfo): CreateSubstitutionTransformerResult;
export {};
//# sourceMappingURL=SubstitutionTransformer.d.ts.map