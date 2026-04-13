import type Document from '../nodes/document/Document.js';
import type Element from '../nodes/element/Element.js';
import type DocumentFragment from '../nodes/document-fragment/DocumentFragment.js';
import type BrowserWindow from '../window/BrowserWindow.js';
/**
 * HTML parser.
 */
export default class HTMLParser {
    private window;
    private evaluateScripts;
    private isTemplateDocumentFragment;
    private rootNode;
    private rootDocument;
    private nodeStack;
    private tagNameStack;
    private documentStructure;
    private startTagIndex;
    private markupRegExp;
    private nextElement;
    private currentNode;
    private readState;
    /**
     * Constructor.
     *
     * @param window Window.
     * @param [options] Options.
     * @param [options.evaluateScripts] Set to "true" to enable script execution
     * @param [options.isTemplateDocumentFragment] Set to "true" if parsing a template content fragment.
     */
    constructor(window: BrowserWindow, options?: {
        evaluateScripts?: boolean;
        isTemplateDocumentFragment?: boolean;
    });
    /**
     * Parses HTML a root element containing nodes found.
     *
     * @param html HTML string.
     * @param [rootNode] Root node.
     * @returns Root node.
     */
    parse(html: string, rootNode?: Element | DocumentFragment | Document): Element | DocumentFragment | Document;
    /**
     * Parses plain text.
     *
     * @param text Text.
     */
    private parsePlainText;
    /**
     * Parses end of start tag.
     *
     * @param attributeString Attribute string.
     * @param isSelfClosed Is self closed.
     */
    private parseEndOfStartTag;
    /**
     * Parses end tag.
     *
     * @param tagName Tag name.
     */
    private parseEndTag;
    /**
     * Parses comment.
     *
     * @param comment Comment.
     */
    private parseComment;
    /**
     * Parses document type.
     *
     * @param text Text.
     */
    private parseDocumentType;
    /**
     * Parses raw text content for elements such as <script> and <style>.
     *
     * @param tagName End tag name.
     * @param text Text.
     */
    private parseRawTextElementContent;
    /**
     * Creates an element or returns a reference to it.
     *
     * @param tagName Tag name.
     */
    private getStartTagElement;
    /**
     * Returns document type.
     *
     * @param value Value.
     * @returns Document type.
     */
    private getDocumentType;
}
//# sourceMappingURL=HTMLParser.d.ts.map