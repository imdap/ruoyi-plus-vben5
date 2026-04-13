import assert from 'node:assert';
import { TextDocument as VsTextDocument } from 'vscode-languageserver-textdocument';
import { getFileSystem } from '../fileSystem.js';
import { getLanguagesForBasename } from '../fileTypes.js';
import { basename, documentUriToURL, toUri } from '../util/Uri.js';
export { documentUriToURL } from '../util/Uri.js';
class TextDocumentImpl {
    languageId;
    locale;
    vsTextDoc;
    uri;
    constructor(uri, text, languageId, locale, version) {
        this.languageId = languageId;
        this.locale = locale;
        const primaryLanguageId = typeof languageId === 'string' ? languageId : languageId[0] || 'plaintext';
        this.vsTextDoc = VsTextDocument.create(uri.toString(), primaryLanguageId, version, text);
        this.uri = documentUriToURL(uri);
    }
    get version() {
        return this.vsTextDoc.version;
    }
    get text() {
        return this.vsTextDoc.getText();
    }
    positionAt(offset) {
        return this.vsTextDoc.positionAt(offset);
    }
    offsetAt(position) {
        return this.vsTextDoc.offsetAt(position);
    }
    lineAt(offset) {
        const position = this.vsTextDoc.positionAt(offset);
        return this.getLine(position.line);
    }
    getLine(lineNum) {
        const position = { line: lineNum, character: 0 };
        const end = { line: lineNum + 1, character: 0 };
        const range = {
            start: position,
            end,
        };
        const lineOffset = this.vsTextDoc.offsetAt(position);
        const text = this.vsTextDoc.getText(range);
        return {
            text,
            offset: lineOffset,
            position,
        };
    }
    /**
     * Iterate over the lines of a document one-by-one.
     * Changing the document between iterations can change the result
     */
    *getLines() {
        const range = {
            start: { line: 0, character: 0 },
            end: { line: 1, character: 0 },
        };
        while (this.vsTextDoc.offsetAt(range.end) > this.vsTextDoc.offsetAt(range.start)) {
            const offset = this.vsTextDoc.offsetAt(range.start);
            yield {
                text: this.vsTextDoc.getText(range),
                offset,
                position: range.start,
            };
            ++range.start.line;
            ++range.end.line;
        }
    }
    /**
     * Apply edits to the text.
     * Note: the edits are applied one after the other.
     * @param edits - changes to the text
     * @param version - optional version to use.
     * @returns this
     */
    update(edits, version) {
        version = version ?? this.version + 1;
        for (const edit of edits) {
            const vsEdit = edit.range
                ? {
                    range: { start: this.positionAt(edit.range[0]), end: this.positionAt(edit.range[1]) },
                    text: edit.text,
                }
                : edit;
            VsTextDocument.update(this.vsTextDoc, [vsEdit], version);
        }
        return this;
    }
}
export function createTextDocument({ uri, content, languageId, locale, version, }) {
    version = version ?? 1;
    uri = toUri(uri);
    languageId = languageId ?? getLanguagesForBasename(basename(uri));
    languageId = languageId.length === 0 ? 'text' : languageId;
    return new TextDocumentImpl(uri, content, languageId, locale, version);
}
export function updateTextDocument(doc, edits, version) {
    assert(isTextDocumentImpl(doc), 'Unknown TextDocument type');
    return doc.update(edits, version);
}
function isTextDocumentImpl(doc) {
    return doc instanceof TextDocumentImpl;
}
export async function loadTextDocument(filename, languageId) {
    const uri = toUri(filename);
    const url = new URL(uri.toString());
    const file = await getFileSystem().readFile(url);
    return createTextDocument({ uri, languageId, content: file.getText() });
}
export const isTextDocument = isTextDocumentImpl;
//# sourceMappingURL=TextDocument.js.map