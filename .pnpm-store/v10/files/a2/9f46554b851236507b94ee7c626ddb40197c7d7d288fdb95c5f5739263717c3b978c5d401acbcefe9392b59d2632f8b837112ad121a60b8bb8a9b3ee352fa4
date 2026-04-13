import type { CSpellSettings } from '@cspell/cspell-types';
import type { ValueOf1 } from './types.js';
import type { RCfgNode } from './UpdateConfig/CfgTree.js';
export type { CfgNode } from './UpdateConfig/CfgTree.js';
export interface CSpellConfigFileReference {
    readonly url: URL;
}
export interface ICSpellConfigFile {
    /**
     * The url of the config file, used to resolve imports.
     */
    readonly url: URL;
    /**
     * The settings from the config file.
     */
    readonly settings: CSpellSettings;
    /**
     * Indicate that the config file is readonly.
     */
    readonly?: boolean;
    /**
     * Indicate that the config file is virtual and not associated with a file on disk.
     */
    virtual?: boolean;
    /**
     * Indicate that the config file is remote and not associated with a file on disk.
     */
    remote?: boolean;
}
export declare abstract class CSpellConfigFile implements ICSpellConfigFile {
    readonly url: URL;
    constructor(url: URL);
    /**
     * The settings from the config file.
     * Note: this is a copy of the settings from the config file. It should be treated as immutable.
     * For performance reasons, it might not be frozen.
     */
    abstract readonly settings: CSpellSettings;
    /**
     * Helper function to add words to the config file.
     * @param words - words to add to the config file.
     */
    abstract addWords(words: string[]): this;
    /**
     * Tell the config file to remove all comments.
     * This is useful when the config file is being serialized and comments are not needed.
     * @returns this - the config file.
     */
    abstract removeAllComments(): this;
    /**
     * Configure the jason.schema for the config file.
     * @param schema - The schema to set for the config file.
     */
    abstract setSchema(schema: string): this;
    abstract setValue<K extends keyof CSpellSettings>(key: K, value: CSpellSettings[K]): this;
    /**
     *
     * @param key - the field to set the comment for.
     * @param comment - the comment to set.
     * @param inline - if true, the comment will be set as an inline comment.
     */
    abstract setComment(key: keyof CSpellSettings, comment: string, inline?: boolean): this;
    get readonly(): boolean;
    get virtual(): boolean;
    get remote(): boolean;
}
type S = CSpellSettings;
export declare abstract class MutableCSpellConfigFile extends CSpellConfigFile {
    /**
     * Helper function to add words to the config file.
     * @param words - words to add to the config file.
     */
    abstract addWords(words: string[]): this;
    abstract setValue<K extends keyof S>(key: K, value: ValueOf1<S, K>): this;
    abstract getValue<K extends keyof S>(key: K): ValueOf1<S, K> | undefined;
    abstract getNode<K extends keyof S>(key: K): RCfgNode<ValueOf1<S, K>> | undefined;
    abstract getNode<K extends keyof S>(key: K, defaultValue: Exclude<ValueOf1<S, K>, undefined>): Exclude<RCfgNode<ValueOf1<S, K>>, undefined>;
    abstract getNode<K extends keyof S>(key: K, defaultValue: ValueOf1<S, K> | undefined): RCfgNode<ValueOf1<S, K>> | undefined;
}
export declare abstract class ImplCSpellConfigFile extends CSpellConfigFile {
    readonly url: URL;
    readonly settings: CSpellSettings;
    constructor(url: URL, settings: CSpellSettings);
    setSchema(_schema: string): this;
    removeAllComments(): this;
    addWords(words: string[]): this;
    setComment(_key: keyof CSpellSettings, _comment: string, _inline?: boolean): this;
    setValue<K extends keyof CSpellSettings>(key: K, value: CSpellSettings[K]): this;
}
/**
 * Adds words to a list, sorts the list and makes sure it is unique.
 * Note: this method is used to try and preserve comments in the config file.
 * @param list - list to be modified
 * @param toAdd - words to add
 */
declare function addUniqueWordsToListAndSort(list: string[], toAdd: string[]): void;
export declare function satisfiesCSpellConfigFile(obj: unknown): obj is ICSpellConfigFile;
export declare const cspellConfigFileSchema = "https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json";
export declare const __testing__: {
    addUniqueWordsToListAndSort: typeof addUniqueWordsToListAndSort;
};
//# sourceMappingURL=CSpellConfigFile.d.ts.map