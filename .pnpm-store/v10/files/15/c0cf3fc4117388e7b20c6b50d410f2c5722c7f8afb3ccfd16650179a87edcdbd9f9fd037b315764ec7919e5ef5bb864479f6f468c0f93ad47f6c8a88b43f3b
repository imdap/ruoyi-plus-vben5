import type { DocumentUri } from '../util/IUri.js';
export { documentUriToURL } from '../util/Uri.js';
export interface Position {
    /**
     * The line number (zero-based).
     */
    line: number;
    /**
     * The zero based offset from the beginning of the line.
     * Note: surrogate pairs are counted as two characters.
     */
    character: number;
}
/**
 * Range offset tuple.
 */
export type SimpleRange = [start: number, end: number];
export interface TextDocumentLine {
    readonly text: string;
    readonly offset: number;
    readonly position: Position;
}
export interface TextDocumentRef {
    /**
     * The associated URI for this document. Most documents have the __file__-scheme, indicating that they
     * represent files on disk. However, some documents may have other schemes indicating that they are not
     * available on disk.
     */
    readonly uri: DocumentUri;
    /**
     * The identifier of the language associated with this document.
     */
    readonly languageId?: string | string[] | undefined;
    /**
     * the raw Document Text
     */
    readonly text?: string | undefined;
    /**
     * The natural language locale.
     */
    readonly locale?: string | undefined;
}
/**
 * A simple text document. Not to be implemented. The document keeps the content
 * as string.
 */
export interface TextDocument {
    /**
     * The associated URI for this document. Most documents have the __file__-scheme, indicating that they
     * represent files on disk. However, some documents may have other schemes indicating that they are not
     * available on disk.
     */
    readonly uri: DocumentUri;
    /**
     * The identifier of the language associated with this document.
     */
    readonly languageId: string | string[];
    /**
     * The version number of this document (it will increase after each
     * change, including undo/redo).
     */
    readonly version: number;
    /**
     * the raw Document Text
     */
    readonly text: string;
    /**
     * The natural language locale.
     */
    readonly locale?: string | undefined;
    positionAt(offset: number): Position;
    offsetAt(position: Position): number;
    lineAt(offset: number): TextDocumentLine;
    getLine(lineNum: number): TextDocumentLine;
    getLines(): Iterable<TextDocumentLine>;
}
export interface CreateTextDocumentParams {
    uri: DocumentUri | string;
    content: string;
    languageId?: string | string[] | undefined;
    locale?: string | undefined;
    version?: number | undefined;
}
export interface TextDocumentContentChangeEvent {
    range?: SimpleRange;
    text: string;
}
export declare function createTextDocument({ uri, content, languageId, locale, version, }: CreateTextDocumentParams): TextDocument;
export declare function updateTextDocument(doc: TextDocument, edits: TextDocumentContentChangeEvent[], version?: number): TextDocument;
export declare function loadTextDocument(filename: string | DocumentUri, languageId?: string): Promise<TextDocument>;
export declare const isTextDocument: (doc: TextDocument | unknown) => doc is TextDocument;
//# sourceMappingURL=TextDocument.d.ts.map