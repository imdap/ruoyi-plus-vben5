import assert from 'node:assert';
import { Document as YamlDocument, isAlias, isMap, isNode, isPair, isScalar, isSeq, parseDocument, Scalar, stringify, visit as yamlWalkAst, YAMLMap, YAMLSeq, } from 'yaml';
import { MutableCSpellConfigFile } from '../CSpellConfigFile.js';
import { detectIndentAsNum } from '../serializers/util.js';
import { isNodeValue } from '../UpdateConfig/CfgTree.js';
import { ParseError } from './Errors.js';
export class CSpellConfigFileYaml extends MutableCSpellConfigFile {
    url;
    yamlDoc;
    indent;
    #settings = undefined;
    constructor(url, yamlDoc, indent) {
        super(url);
        this.url = url;
        this.yamlDoc = yamlDoc;
        this.indent = indent;
        // Set the initial settings from the YAML document.
        this.#settings = this.yamlDoc.toJS();
    }
    get settings() {
        return this.#settings ?? this.yamlDoc.toJS();
    }
    addWords(wordsToAdd) {
        const cfgWords = this.yamlDoc.get('words') || new YAMLSeq();
        assert(isSeq(cfgWords), 'Expected words to be a YAML sequence');
        const knownWords = new Set(cfgWords.items.map((item) => getScalarValue(item)));
        wordsToAdd.forEach((w) => {
            if (knownWords.has(w))
                return;
            cfgWords.add(w);
            knownWords.add(w);
        });
        const sorted = sortWords(cfgWords.items);
        sorted.forEach((item, index) => cfgWords.set(index, item));
        cfgWords.items.length = sorted.length;
        this.#setValue('words', cfgWords);
        this.#markAsMutable();
        return this;
    }
    serialize() {
        return stringify(this.yamlDoc, { indent: this.indent });
    }
    setValue(key, value) {
        if (isNodeValue(value)) {
            let node = this.#getNode(key);
            if (!node) {
                node = this.yamlDoc.createNode(value.value);
                setYamlNodeComments(node, value);
                this.#setValue(key, node);
            }
            else {
                setYamlNodeValue(node, value);
            }
        }
        else {
            this.#setValue(key, value);
        }
        this.#markAsMutable();
        return this;
    }
    getValue(key) {
        const node = this.#getNode(key);
        return node?.toJS(this.yamlDoc);
    }
    #getNode(key) {
        return getYamlNode(this.yamlDoc, key);
    }
    getNode(key, defaultValue) {
        let yNode = this.#getNode(key);
        if (!yNode) {
            if (defaultValue === undefined) {
                return undefined;
            }
            yNode = this.yamlDoc.createNode(defaultValue);
            this.#setValue(key, yNode);
        }
        this.#markAsMutable();
        return toConfigNode(this.yamlDoc, yNode);
    }
    getFieldNode(key) {
        const contents = this.yamlDoc.contents;
        if (!isMap(contents)) {
            return undefined;
        }
        const found = findPair(contents, key);
        const pair = found && this.#fixPair(found);
        if (!pair) {
            return undefined;
        }
        return toConfigNode(this.yamlDoc, pair.key);
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
        const removed = this.yamlDoc.delete(key);
        if (removed) {
            this.#markAsMutable();
        }
        return removed;
    }
    get comment() {
        return this.yamlDoc.comment ?? undefined;
    }
    set comment(comment) {
        // eslint-disable-next-line unicorn/no-null
        this.yamlDoc.comment = comment ?? null;
    }
    setSchema(schemaRef) {
        removeSchemaComment(this.yamlDoc);
        let commentBefore = this.yamlDoc.commentBefore || '';
        commentBefore = commentBefore.replace(/^ yaml-language-server: \$schema=.*\n?/m, '');
        commentBefore = ` yaml-language-server: $schema=${schemaRef}` + (commentBefore ? '\n' + commentBefore : '');
        this.yamlDoc.commentBefore = commentBefore;
        // Remove any existing comment references that might be attached to the first field.
        const contents = this.#getContentsMap();
        const firstPair = contents.items[0];
        if (firstPair && isPair(firstPair)) {
            const key = firstPair.key;
            if (isNode(key)) {
                removeSchemaComment(key);
            }
        }
        if (this.getNode('$schema')) {
            this.setValue('$schema', schemaRef);
        }
        return this;
    }
    removeAllComments() {
        const doc = this.yamlDoc;
        // eslint-disable-next-line unicorn/no-null
        doc.comment = null;
        // eslint-disable-next-line unicorn/no-null
        doc.commentBefore = null;
        yamlWalkAst(this.yamlDoc, (_, node) => {
            if (!(isScalar(node) || isMap(node) || isSeq(node)))
                return;
            // eslint-disable-next-line unicorn/no-null
            node.comment = null;
            // eslint-disable-next-line unicorn/no-null
            node.commentBefore = null;
        });
        return this;
    }
    setComment(key, comment, inline) {
        const node = this.getFieldNode(key);
        if (!node)
            return this;
        if (inline) {
            node.comment = comment;
        }
        else {
            node.commentBefore = comment;
        }
        return this;
    }
    /**
     * Marks the config file as mutable. Any access to settings will the settings to be regenerated
     * from the YAML document.
     */
    #markAsMutable() {
        this.#settings = undefined;
    }
    #setValue(key, value) {
        this.yamlDoc.set(key, value);
        const contents = this.#getContentsMap();
        const pair = findPair(contents, key);
        assert(pair, `Expected pair for key: ${String(key)}`);
        this.#fixPair(pair);
    }
    #toNode(value) {
        return (isNode(value) ? value : this.yamlDoc.createNode(value));
    }
    #fixPair(pair) {
        assert(isPair(pair), 'Expected pair to be a Pair');
        pair.key = this.#toNode(pair.key);
        pair.value = this.#toNode(pair.value);
        return pair;
    }
    #getContentsMap() {
        const contents = this.yamlDoc.contents;
        assert(isMap(contents), 'Expected contents to be a YAMLMap');
        return contents;
    }
    static parse(file) {
        return parseCSpellConfigFileYaml(file);
    }
    static from(url, settings, indent = 2) {
        const yamlDoc = new YamlDocument(settings);
        return new CSpellConfigFileYaml(url, yamlDoc, indent);
    }
}
export function parseCSpellConfigFileYaml(file) {
    const { url, content } = file;
    try {
        const doc = parseDocument(content);
        // Force empty content to be a map.
        if (doc.contents === null || (isScalar(doc.contents) && !doc.contents.value)) {
            doc.contents = new YAMLMap();
        }
        if (!isMap(doc.contents)) {
            throw new ParseError(url, `Invalid YAML content ${url}`);
        }
        const indent = detectIndentAsNum(content);
        return new CSpellConfigFileYaml(url, doc, indent);
    }
    catch (e) {
        if (e instanceof ParseError) {
            throw e;
        }
        throw new ParseError(url, undefined, { cause: e });
    }
}
function getScalarValue(node) {
    if (isScalar(node)) {
        return node.value;
    }
    return node;
}
function toScalar(node) {
    if (isScalar(node)) {
        return node;
    }
    return new Scalar(node);
}
function groupWords(words) {
    const groups = [];
    if (words.length === 0) {
        return groups;
    }
    let currentGroup = [];
    groups.push(currentGroup);
    for (const word of words) {
        if (isSectionHeader(word)) {
            currentGroup = [];
            groups.push(currentGroup);
        }
        currentGroup.push(cloneWord(word));
    }
    return groups;
}
function isSectionHeader(word) {
    if (!isScalar(word) || (!word.commentBefore && !word.spaceBefore))
        return false;
    if (word.spaceBefore)
        return true;
    if (!word.commentBefore)
        return false;
    return word.commentBefore.includes('\n\n');
}
function adjustSectionHeader(word, prev, isFirstSection) {
    // console.log('adjustSectionHeader %o', { word, prev, isFirstSection });
    if (!isScalar(prev))
        return;
    let captureComment = isFirstSection;
    if (prev.spaceBefore) {
        word.spaceBefore = true;
        captureComment = true;
        delete prev.spaceBefore;
    }
    if (!prev.commentBefore)
        return;
    const originalComment = prev.commentBefore;
    const lines = originalComment.split(/^\n/gm);
    const lastLine = lines[lines.length - 1];
    // console.log('adjustSectionHeader lines %o', { lines, isFirstSection, lastLine, originalComment });
    captureComment = (captureComment && originalComment.trim() === lastLine.trim()) || originalComment.endsWith('\n');
    let header = originalComment;
    if (captureComment) {
        delete prev.commentBefore;
    }
    else {
        prev.commentBefore = lastLine;
        lines.pop();
        header = lines.join('\n');
    }
    if (word.commentBefore) {
        header += header.endsWith('\n\n') ? '' : '\n';
        header += header.endsWith('\n\n') ? '' : '\n';
        header += word.commentBefore;
    }
    word.commentBefore = header;
    // console.log('adjustSectionHeader after %o', { word, prev, isFirstSection, originalComment, lastLine, lines });
}
function sortWords(words) {
    const compare = new Intl.Collator().compare;
    const groups = groupWords(words);
    let firstGroup = true;
    for (const group of groups) {
        const head = group[0];
        group.sort((a, b) => {
            return compare(getScalarValue(a), getScalarValue(b));
        });
        if (group[0] !== head && isScalar(head)) {
            const first = (group[0] = toScalar(group[0]));
            adjustSectionHeader(first, head, firstGroup);
        }
        firstGroup = false;
    }
    const result = groups.flat();
    return result.map((w) => toScalar(w));
}
function cloneWord(word) {
    if (isScalar(word)) {
        return word.clone();
    }
    return word;
}
function getYamlNode(yamlDoc, key) {
    return (Array.isArray(key) ? yamlDoc.getIn(key, true) : yamlDoc.get(key, true));
}
function toConfigNode(doc, yNode) {
    if (isYamlSeq(yNode)) {
        return toConfigArrayNode(doc, yNode);
    }
    if (isMap(yNode)) {
        return toConfigObjectNode(doc, yNode);
    }
    if (isScalar(yNode)) {
        return toConfigScalarNode(doc, yNode);
    }
    throw new Error(`Unsupported YAML node type: ${yamlNodeType(yNode)}`);
}
class ConfigNodeBase {
    type;
    constructor(type) {
        this.type = type;
    }
}
class ConfigArrayNode extends ConfigNodeBase {
    #doc;
    #yNode;
    constructor(doc, yNode) {
        super('array');
        this.#doc = doc;
        this.#yNode = yNode;
    }
    get value() {
        return this.#yNode.toJS(this.#doc);
    }
    get comment() {
        return this.#yNode.comment ?? undefined;
    }
    set comment(comment) {
        // eslint-disable-next-line unicorn/no-null
        this.#yNode.comment = comment ?? null;
    }
    get commentBefore() {
        return this.#yNode.commentBefore ?? undefined;
    }
    set commentBefore(comment) {
        // eslint-disable-next-line unicorn/no-null
        this.#yNode.commentBefore = comment ?? null;
    }
    getNode(key) {
        const node = getYamlNode(this.#yNode, key);
        if (!node)
            return undefined;
        return toConfigNode(this.#doc, node);
    }
    getValue(key) {
        const node = getYamlNode(this.#yNode, key);
        if (!node)
            return undefined;
        return node.toJS(this.#doc);
    }
    setValue(key, value) {
        if (!isNodeValue(value)) {
            this.#yNode.set(key, value);
            return;
        }
        this.#yNode.set(key, value.value);
        const yNodeValue = getYamlNode(this.#yNode, key);
        assert(yNodeValue);
        // eslint-disable-next-line unicorn/no-null
        yNodeValue.comment = value.comment ?? null;
        // eslint-disable-next-line unicorn/no-null
        yNodeValue.commentBefore = value.commentBefore ?? null;
    }
    delete(key) {
        return this.#yNode.delete(key);
    }
    push(value) {
        if (!isNodeValue(value)) {
            this.#yNode.add(value);
            return this.#yNode.items.length;
        }
        this.#yNode.add(value.value);
        setYamlNodeComments(getYamlNode(this.#yNode, this.#yNode.items.length - 1), value);
        return this.#yNode.items.length;
    }
    get length() {
        return this.#yNode.items.length;
    }
}
function toConfigArrayNode(doc, yNode) {
    return new ConfigArrayNode(doc, yNode);
}
class ConfigObjectNode extends ConfigNodeBase {
    #doc;
    #yNode;
    constructor(doc, yNode) {
        super('object');
        this.#doc = doc;
        this.#yNode = yNode;
    }
    get value() {
        return this.#yNode.toJS(this.#doc);
    }
    get comment() {
        return this.#yNode.comment ?? undefined;
    }
    set comment(comment) {
        // eslint-disable-next-line unicorn/no-null
        this.#yNode.comment = comment ?? null;
    }
    get commentBefore() {
        return this.#yNode.commentBefore ?? undefined;
    }
    set commentBefore(comment) {
        // eslint-disable-next-line unicorn/no-null
        this.#yNode.commentBefore = comment ?? null;
    }
    getValue(key) {
        const node = getYamlNode(this.#yNode, key);
        if (!node)
            return undefined;
        return node.toJS(this.#doc);
    }
    getNode(key) {
        const node = getYamlNode(this.#yNode, key);
        if (!node)
            return undefined;
        return toConfigNode(this.#doc, node);
    }
    setValue(key, value) {
        if (!isNodeValue(value)) {
            this.#yNode.set(key, value);
            return;
        }
        this.#yNode.set(key, value.value);
        const yNodeValue = getYamlNode(this.#yNode, key);
        assert(yNodeValue);
        // eslint-disable-next-line unicorn/no-null
        yNodeValue.comment = value.comment ?? null;
        // eslint-disable-next-line unicorn/no-null
        yNodeValue.commentBefore = value.commentBefore ?? null;
    }
    delete(key) {
        return this.#yNode.delete(key);
    }
}
function toConfigObjectNode(doc, yNode) {
    return new ConfigObjectNode(doc, yNode);
}
class ConfigScalarNode extends ConfigNodeBase {
    $doc;
    $yNode;
    type = 'scalar';
    constructor(doc, yNode) {
        super('scalar');
        this.$doc = doc;
        this.$yNode = yNode;
        assert(isScalar(yNode), 'Expected yNode to be a Scalar');
    }
    get value() {
        return this.$yNode.toJS(this.$doc);
    }
    set value(value) {
        this.$yNode.value = value;
    }
    get comment() {
        return this.$yNode.comment ?? undefined;
    }
    set comment(comment) {
        // eslint-disable-next-line unicorn/no-null
        this.$yNode.comment = comment ?? null;
    }
    get commentBefore() {
        return this.$yNode.commentBefore ?? undefined;
    }
    set commentBefore(comment) {
        // eslint-disable-next-line unicorn/no-null
        this.$yNode.commentBefore = comment ?? null;
    }
    toJSON() {
        return {
            type: this.type,
            value: this.value,
            comment: this.comment,
            commentBefore: this.commentBefore,
        };
    }
}
function toConfigScalarNode(doc, yNode) {
    return new ConfigScalarNode(doc, yNode);
}
function isYamlSeq(node) {
    return isSeq(node);
}
function yamlNodeType(node) {
    if (isScalar(node))
        return 'scalar';
    if (isSeq(node))
        return 'seq';
    if (isMap(node))
        return 'map';
    if (isAlias(node))
        return 'alias';
    return 'unknown';
}
function setYamlNodeComments(yamlNode, comments) {
    if (!yamlNode)
        return;
    if ('comment' in comments) {
        // eslint-disable-next-line unicorn/no-null
        yamlNode.comment = comments.comment ?? null;
    }
    if ('commentBefore' in comments) {
        // eslint-disable-next-line unicorn/no-null
        yamlNode.commentBefore = comments.commentBefore ?? null;
    }
}
function setYamlNodeValue(yamlNode, nodeValue) {
    setYamlNodeComments(yamlNode, nodeValue);
    if (isScalar(yamlNode)) {
        yamlNode.value = nodeValue.value;
        return;
    }
    const value = nodeValue.value;
    if (isSeq(yamlNode)) {
        assert(Array.isArray(value), 'Expected value to be an array for YAMLSeq');
        yamlNode.items = [];
        for (let i = 0; i < value.length; ++i) {
            yamlNode.set(i, value[i]);
        }
        return;
    }
    if (isMap(yamlNode)) {
        assert(typeof value === 'object' && value !== null, 'Expected value to be an object for YAMLMap');
        yamlNode.items = [];
        for (const [key, val] of Object.entries(value)) {
            yamlNode.set(key, val);
        }
        return;
    }
    throw new Error(`Unsupported YAML node type: ${yamlNodeType(yamlNode)}`);
}
function findPair(yNode, yKey) {
    const key = isScalar(yKey) ? yKey.value : yKey;
    if (!isMap(yNode))
        return undefined;
    const items = yNode.items;
    for (const item of items) {
        if (!isPair(item))
            continue;
        if (item.key === key) {
            return item;
        }
        if (isScalar(item.key) && item.key.value === key) {
            return item;
        }
    }
    return undefined;
}
function removeSchemaComment(node) {
    if (!node.commentBefore)
        return;
    // eslint-disable-next-line unicorn/no-null
    node.commentBefore = node.commentBefore?.replaceAll(/^ yaml-language-server: \$schema=.*\n?/gm, '') ?? null;
}
//# sourceMappingURL=CSpellConfigFileYaml.js.map