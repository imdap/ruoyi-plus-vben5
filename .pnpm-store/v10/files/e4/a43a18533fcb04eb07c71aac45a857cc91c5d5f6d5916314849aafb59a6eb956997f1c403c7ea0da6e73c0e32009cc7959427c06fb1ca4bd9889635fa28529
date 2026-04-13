import { decodeHTML, decodeHTMLAttribute, decodeXML, escapeText } from 'entities';
/**
 * Pre-compiled RegExp patterns for encoding/decoding.
 * Using pre-compiled patterns avoids RegExp compilation on each call.
 */
// Encoding patterns
const ENCODE_XML_ATTR_REGEXP = /[&"<>\t\n\r]/g;
const ENCODE_HTML_ATTR_REGEXP = /[&"]/g;
// Decoding patterns
const DECODE_TEXT_CONTENT_REGEXP = /&(?:nbsp|lt|gt|amp);/g;
// Encoding lookup tables
const ENCODE_XML_ATTR_MAP = {
    '&': '&amp;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;',
    '\t': '&#x9;',
    '\n': '&#xA;',
    '\r': '&#xD;'
};
const ENCODE_HTML_ATTR_MAP = {
    '&': '&amp;',
    '"': '&quot;'
};
// Decoding lookup tables
const DECODE_TEXT_CONTENT_MAP = {
    '&nbsp;': String.fromCharCode(160),
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&'
};
/**
 * Utility for encoding.
 */
export default class XMLEncodeUtility {
    /**
     * Encodes attribute value.
     *
     * @param value Value.
     * @returns Escaped value.
     */
    static encodeXMLAttributeValue(value) {
        if (value === null) {
            return '';
        }
        return value.replace(ENCODE_XML_ATTR_REGEXP, (char) => ENCODE_XML_ATTR_MAP[char]);
    }
    /**
     * Decodes attribute value.
     *
     * Uses the 'entities' library for comprehensive XML character reference support.
     *
     * @param value Value.
     * @returns Decoded value.
     */
    static decodeXMLAttributeValue(value) {
        if (value === null) {
            return '';
        }
        return decodeXML(value);
    }
    /**
     * Encodes attribute value.
     *
     * @param value Value.
     * @returns Escaped value.
     */
    static encodeHTMLAttributeValue(value) {
        if (value === null) {
            return '';
        }
        return value.replace(ENCODE_HTML_ATTR_REGEXP, (char) => ENCODE_HTML_ATTR_MAP[char]);
    }
    /**
     * Decodes attribute value.
     *
     * Uses the 'entities' library for comprehensive HTML5 character reference support,
     * including named entities, decimal numeric references (&#34;), and
     * hexadecimal numeric references (&#x22;).
     *
     * @param value Value.
     * @returns Decoded value.
     */
    static decodeHTMLAttributeValue(value) {
        if (value === null) {
            return '';
        }
        return decodeHTMLAttribute(value);
    }
    /**
     * Encodes text content.
     *
     * Uses the 'entities' library which follows the WHATWG HTML serialization spec.
     * Encodes &, <, >, and non-breaking space.
     *
     * @param text Value.
     * @returns Escaped value.
     */
    static encodeTextContent(text) {
        if (text === null) {
            return '';
        }
        return escapeText(text);
    }
    /**
     * Decodes text content.
     *
     * @param text Value.
     * @returns Decoded value.
     */
    static decodeTextContent(text) {
        if (text === null) {
            return '';
        }
        return text.replace(DECODE_TEXT_CONTENT_REGEXP, (entity) => DECODE_TEXT_CONTENT_MAP[entity]);
    }
    /**
     * Decodes HTML entities.
     *
     * Uses the 'entities' library for comprehensive HTML5 named character reference support.
     *
     * @param value Value.
     * @returns Decoded value.
     */
    static decodeHTMLEntities(value) {
        if (value === null) {
            return '';
        }
        return decodeHTML(value);
    }
    /**
     * Decodes XML entities.
     *
     * Uses the 'entities' library for comprehensive XML character reference support,
     * including named entities and numeric references.
     *
     * @param value Value.
     * @returns Decoded value.
     */
    static decodeXMLEntities(value) {
        if (value === null) {
            return '';
        }
        return decodeXML(value);
    }
}
//# sourceMappingURL=XMLEncodeUtility.js.map