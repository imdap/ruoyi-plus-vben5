import type { CSpellSettings } from '@cspell/cspell-types';
import { Document as YamlDocument } from 'yaml';
import { MutableCSpellConfigFile } from '../CSpellConfigFile.js';
import type { TextFile } from '../TextFile.js';
import type { ValueOf1 } from '../types.js';
import type { NodeOrValue, RCfgNode } from '../UpdateConfig/CfgTree.js';
type S = CSpellSettings;
export declare class CSpellConfigFileYaml extends MutableCSpellConfigFile {
    #private;
    readonly url: URL;
    readonly yamlDoc: YamlDocument;
    readonly indent: number;
    constructor(url: URL, yamlDoc: YamlDocument, indent: number);
    get settings(): CSpellSettings;
    addWords(wordsToAdd: string[]): this;
    serialize(): string;
    setValue<K extends keyof S>(key: K, value: NodeOrValue<ValueOf1<S, K>>): this;
    getValue<K extends keyof S>(key: K): ValueOf1<S, K>;
    getNode<K extends keyof S>(key: K): RCfgNode<ValueOf1<S, K>> | undefined;
    getNode<K extends keyof S>(key: K, defaultValue: Exclude<ValueOf1<S, K>, undefined>): Exclude<RCfgNode<ValueOf1<S, K>>, undefined>;
    getNode<K extends keyof S>(key: K, defaultValue: ValueOf1<S, K> | undefined): RCfgNode<ValueOf1<S, K>> | undefined;
    getFieldNode<K extends keyof S>(key: K): RCfgNode<string> | undefined;
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    delete(key: keyof S): boolean;
    get comment(): string | undefined;
    set comment(comment: string | undefined);
    setSchema(schemaRef: string): this;
    removeAllComments(): this;
    setComment(key: keyof CSpellSettings, comment: string, inline?: boolean): this;
    static parse(file: TextFile): CSpellConfigFileYaml;
    static from(url: URL, settings: CSpellSettings, indent?: number): CSpellConfigFileYaml;
}
export declare function parseCSpellConfigFileYaml(file: TextFile): CSpellConfigFileYaml;
export {};
//# sourceMappingURL=CSpellConfigFileYaml.d.ts.map