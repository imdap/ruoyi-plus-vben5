import Node from '../node/Node.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import DOMRect from '../../dom/DOMRect.js';
import DOMTokenList from '../../dom/DOMTokenList.js';
import QuerySelector from '../../query-selector/QuerySelector.js';
import ChildNodeUtility from '../child-node/ChildNodeUtility.js';
import ParentNodeUtility from '../parent-node/ParentNodeUtility.js';
import NonDocumentChildNodeUtility from '../child-node/NonDocumentChildNodeUtility.js';
import HTMLCollection from './HTMLCollection.js';
import DOMRectList from '../../dom/DOMRectList.js';
import NamedNodeMap from './NamedNodeMap.js';
import Event from '../../event/Event.js';
import NodeTypeEnum from '../node/NodeTypeEnum.js';
import MutationRecord from '../../mutation-observer/MutationRecord.js';
import MutationTypeEnum from '../../mutation-observer/MutationTypeEnum.js';
import NamespaceURI from '../../config/NamespaceURI.js';
import NamedNodeMapProxyFactory from './NamedNodeMapProxyFactory.js';
import NodeFactory from '../NodeFactory.js';
import HTMLSerializer from '../../html-serializer/HTMLSerializer.js';
import HTMLParser from '../../html-parser/HTMLParser.js';
import { AttributeUtility } from '../../utilities/AttributeUtility.js';
import DOMExceptionNameEnum from '../../exception/DOMExceptionNameEnum.js';
import ElementEventAttributeUtility from './ElementEventAttributeUtility.js';
/**
 * Element.
 */
export default class Element extends Node {
    static [PropertySymbol.tagName] = null;
    static [PropertySymbol.localName] = null;
    static [PropertySymbol.namespaceURI] = null;
    // Internal properties
    [PropertySymbol.classList] = null;
    [PropertySymbol.isValue] = null;
    [PropertySymbol.nodeType] = NodeTypeEnum.elementNode;
    [PropertySymbol.prefix] = null;
    [PropertySymbol.shadowRoot] = null;
    [PropertySymbol.scrollHeight] = 0;
    [PropertySymbol.scrollWidth] = 0;
    [PropertySymbol.scrollTop] = 0;
    [PropertySymbol.scrollLeft] = 0;
    [PropertySymbol.attributes] = new NamedNodeMap(this);
    [PropertySymbol.attributesProxy] = null;
    [PropertySymbol.children] = null;
    [PropertySymbol.computedStyle] = null;
    [PropertySymbol.pointerCaptures] = new Set();
    [PropertySymbol.propertyEventListeners] = new Map();
    /**
     * Constructor.
     */
    constructor() {
        super();
        // CustomElementRegistry will populate the properties upon calling "CustomElementRegistry.define()".
        // Elements that can be constructed with the "new" keyword (without using "Document.createElement()") will also populate the properties.
        if (!this[PropertySymbol.tagName]) {
            this[PropertySymbol.tagName] = null;
        }
        if (!this[PropertySymbol.localName]) {
            this[PropertySymbol.localName] = null;
        }
        if (!this[PropertySymbol.namespaceURI]) {
            this[PropertySymbol.namespaceURI] = null;
        }
    }
    // Events
    /* eslint-disable jsdoc/require-jsdoc */
    get onfullscreenerror() {
        return ElementEventAttributeUtility.getEventListener(this, 'onfullscreenerror');
    }
    set onfullscreenerror(value) {
        this[PropertySymbol.propertyEventListeners].set('onfullscreenerror', value);
    }
    get onfullscreenchange() {
        return ElementEventAttributeUtility.getEventListener(this, 'onfullscreenchange');
    }
    set onfullscreenchange(value) {
        this[PropertySymbol.propertyEventListeners].set('onfullscreenchange', value);
    }
    get onbeforecopy() {
        return ElementEventAttributeUtility.getEventListener(this, 'onbeforecopy');
    }
    set onbeforecopy(value) {
        this[PropertySymbol.propertyEventListeners].set('onbeforecopy', value);
    }
    get onbeforecut() {
        return ElementEventAttributeUtility.getEventListener(this, 'onbeforecut');
    }
    set onbeforecut(value) {
        this[PropertySymbol.propertyEventListeners].set('onbeforecut', value);
    }
    get onbeforepaste() {
        return ElementEventAttributeUtility.getEventListener(this, 'onbeforepaste');
    }
    set onbeforepaste(value) {
        this[PropertySymbol.propertyEventListeners].set('onbeforepaste', value);
    }
    get onsearch() {
        return ElementEventAttributeUtility.getEventListener(this, 'onsearch');
    }
    set onsearch(value) {
        this[PropertySymbol.propertyEventListeners].set('onsearch', value);
    }
    /* eslint-enable jsdoc/require-jsdoc */
    /**
     * Returns tag name.
     *
     * @returns Tag name.
     */
    get tagName() {
        return this[PropertySymbol.tagName];
    }
    /**
     * Returns prefix.
     *
     * @returns Prefix.
     */
    get prefix() {
        return this[PropertySymbol.prefix];
    }
    /**
     * Returns shadow root.
     *
     * @returns Shadow root.
     */
    get shadowRoot() {
        const shadowRoot = this[PropertySymbol.shadowRoot];
        return shadowRoot && shadowRoot[PropertySymbol.mode] === 'open' ? shadowRoot : null;
    }
    /**
     * Returns scroll height.
     *
     * @returns Scroll height.
     */
    get scrollHeight() {
        return this[PropertySymbol.scrollHeight];
    }
    /**
     * Returns scroll width.
     *
     * @returns Scroll width.
     */
    get scrollWidth() {
        return this[PropertySymbol.scrollWidth];
    }
    /**
     * Returns scroll top.
     *
     * @returns Scroll top.
     */
    get scrollTop() {
        return this[PropertySymbol.scrollTop];
    }
    /**
     * Sets scroll top.
     *
     * @param value Scroll top.
     */
    set scrollTop(value) {
        this[PropertySymbol.scrollTop] = value;
    }
    /**
     * Returns scroll left.
     *
     * @returns Scroll left.
     */
    get scrollLeft() {
        return this[PropertySymbol.scrollLeft];
    }
    /**
     * Sets scroll left.
     *
     * @param value Scroll left.
     */
    set scrollLeft(value) {
        this[PropertySymbol.scrollLeft] = value;
    }
    /**
     * Returns attributes.
     *
     * @returns Attributes.
     */
    get attributes() {
        if (!this[PropertySymbol.attributesProxy]) {
            this[PropertySymbol.attributesProxy] = NamedNodeMapProxyFactory.createProxy(this[PropertySymbol.attributes]);
        }
        return this[PropertySymbol.attributesProxy];
    }
    /**
     * Returns namespace URI.
     *
     * @returns Namespace URI.
     */
    get namespaceURI() {
        return this[PropertySymbol.namespaceURI];
    }
    /**
     * Returns element children.
     */
    get children() {
        if (!this[PropertySymbol.children]) {
            const elements = this[PropertySymbol.elementArray];
            this[PropertySymbol.children] = new HTMLCollection(PropertySymbol.illegalConstructor, () => elements);
        }
        return this[PropertySymbol.children];
    }
    /**
     * Returns class list.
     *
     * @returns Class list.
     */
    get classList() {
        if (!this[PropertySymbol.classList]) {
            this[PropertySymbol.classList] = new DOMTokenList(PropertySymbol.illegalConstructor, this, 'class');
        }
        return this[PropertySymbol.classList];
    }
    /**
     * Sets class list.
     *
     * @param value Class list.
     */
    set classList(value) {
        this.setAttribute('class', value);
    }
    /**
     * Returns ID.
     *
     * @returns ID.
     */
    get id() {
        return this.getAttribute('id') || '';
    }
    /**
     * Sets ID.
     *
     * @param id ID.
     */
    set id(id) {
        this.setAttribute('id', id);
    }
    /**
     * Returns class name.
     *
     * @returns Class name.
     */
    get className() {
        return this.getAttribute('class') || '';
    }
    /**
     * Sets class name.
     *
     * @param className Class name.
     */
    set className(className) {
        this.setAttribute('class', className);
    }
    /**
     * Node name.
     *
     * @returns Node name.
     */
    get nodeName() {
        return this[PropertySymbol.tagName];
    }
    /**
     * Local name.
     *
     * @returns Local name.
     */
    get localName() {
        return this[PropertySymbol.localName];
    }
    /**
     * Returns role.
     *
     * @returns Role.
     */
    get role() {
        return this.getAttribute('role') || '';
    }
    /**
     * Sets role.
     *
     * @param role Role.
     */
    set role(role) {
        this.setAttribute('role', role);
    }
    /**
     * Previous element sibling.
     *
     * @returns Element.
     */
    get previousElementSibling() {
        return NonDocumentChildNodeUtility.previousElementSibling(this);
    }
    /**
     * Next element sibling.
     *
     * @returns Element.
     */
    get nextElementSibling() {
        return NonDocumentChildNodeUtility.nextElementSibling(this);
    }
    /**
     * Get text value of children.
     *
     * @returns Text content.
     */
    get textContent() {
        let result = '';
        for (const childNode of this[PropertySymbol.nodeArray]) {
            if (childNode[PropertySymbol.nodeType] === NodeTypeEnum.elementNode ||
                childNode[PropertySymbol.nodeType] === NodeTypeEnum.textNode) {
                result += childNode.textContent;
            }
        }
        return result;
    }
    /**
     * Sets text content.
     *
     * @param textContent Text content.
     */
    set textContent(textContent) {
        const childNodes = this[PropertySymbol.nodeArray];
        while (childNodes.length) {
            this.removeChild(childNodes[0]);
        }
        if (textContent) {
            this.appendChild(this[PropertySymbol.ownerDocument].createTextNode(textContent));
        }
    }
    /**
     * Returns inner HTML.
     *
     * @returns HTML.
     */
    get innerHTML() {
        return this.getHTML();
    }
    /**
     * Sets inner HTML.
     *
     * @param html HTML.
     */
    set innerHTML(html) {
        const childNodes = this[PropertySymbol.nodeArray];
        while (childNodes.length) {
            this.removeChild(childNodes[0]);
        }
        new HTMLParser(this[PropertySymbol.window]).parse(html, this);
    }
    /**
     * Returns outer HTML.
     *
     * @returns HTML.
     */
    get outerHTML() {
        return new HTMLSerializer().serializeToString(this);
    }
    /**
     * Returns outer HTML.
     *
     * @param html HTML.
     */
    set outerHTML(html) {
        const childNodes = new HTMLParser(this[PropertySymbol.window]).parse(html)[PropertySymbol.nodeArray];
        this.replaceWith(...childNodes);
    }
    /**
     * Last element child.
     *
     * @returns Element.
     */
    get childElementCount() {
        return this[PropertySymbol.elementArray].length;
    }
    /**
     * First element child.
     *
     * @returns Element.
     */
    get firstElementChild() {
        return this[PropertySymbol.elementArray][0] ?? null;
    }
    /**
     * Last element child.
     *
     * @returns Element.
     */
    get lastElementChild() {
        const children = this[PropertySymbol.elementArray];
        return children[children.length - 1] ?? null;
    }
    /**
     * Returns slot.
     *
     * @returns Slot.
     */
    get slot() {
        return this.getAttributeNS(null, 'slot') || '';
    }
    /**
     * Returns slot.
     *
     * @param slot Slot.
     */
    set slot(title) {
        this.setAttribute('slot', title);
    }
    /**
     * Returns inner HTML and optionally the content of shadow roots.
     *
     * @deprecated
     * @param [options] Options.
     * @param [options.includeShadowRoots] Set to "true" to include shadow roots.
     * @returns HTML.
     */
    getInnerHTML(options) {
        const serializer = new HTMLSerializer({
            allShadowRoots: !!options?.includeShadowRoots
        });
        let html = '';
        for (const node of this[PropertySymbol.nodeArray]) {
            html += serializer.serializeToString(node);
        }
        return html;
    }
    /**
     * Returns inner HTML and optionally the content of shadow roots.
     *
     * @param [options] Options.
     * @param [options.serializableShadowRoots] A boolean value that specifies whether to include serializable shadow roots. The default value is false.
     * @param [options.shadowRoots] An array of ShadowRoot objects to serialize. These are included regardless of whether they are marked as serializable, or if they are open or closed. The default value is an empty array.
     * @returns HTML.
     */
    getHTML(options) {
        const serializer = new HTMLSerializer({
            serializableShadowRoots: !!options?.serializableShadowRoots,
            shadowRoots: options?.shadowRoots ?? null
        });
        let html = '';
        for (const node of this[PropertySymbol.nodeArray]) {
            html += serializer.serializeToString(node);
        }
        return html;
    }
    /**
     * @override
     */
    [PropertySymbol.cloneNode](deep = false) {
        const clone = super[PropertySymbol.cloneNode](deep);
        clone[PropertySymbol.tagName] = this[PropertySymbol.tagName];
        clone[PropertySymbol.localName] = this[PropertySymbol.localName];
        clone[PropertySymbol.namespaceURI] = this[PropertySymbol.namespaceURI];
        if (this[PropertySymbol.shadowRoot]?.[PropertySymbol.clonable]) {
            clone[PropertySymbol.shadowRoot] = this[PropertySymbol.shadowRoot].cloneNode(deep);
            clone[PropertySymbol.shadowRoot][PropertySymbol.host] = clone;
        }
        clone[PropertySymbol.attributes] = new NamedNodeMap(clone);
        for (const attr of this[PropertySymbol.attributes][PropertySymbol.items].values()) {
            clone[PropertySymbol.attributes].setNamedItem(attr.cloneNode(deep));
        }
        return clone;
    }
    /**
     * Removes the node from its parent.
     */
    remove() {
        ChildNodeUtility.remove(this);
    }
    /**
     * The Node.replaceWith() method replaces this Node in the children list of its parent with a set of Node or DOMString objects.
     *
     * @param nodes List of Node or DOMString.
     */
    replaceWith(...nodes) {
        ChildNodeUtility.replaceWith(this, ...nodes);
    }
    /**
     * Inserts a set of Node or DOMString objects in the children list of this ChildNode's parent, just before this ChildNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    before(...nodes) {
        ChildNodeUtility.before(this, ...nodes);
    }
    /**
     * Inserts a set of Node or DOMString objects in the children list of this ChildNode's parent, just after this ChildNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    after(...nodes) {
        ChildNodeUtility.after(this, ...nodes);
    }
    /**
     * Inserts a set of Node objects or DOMString objects after the last child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    append(...nodes) {
        ParentNodeUtility.append(this, ...nodes);
    }
    /**
     * Inserts a set of Node objects or DOMString objects before the first child of the ParentNode. DOMString objects are inserted as equivalent Text nodes.
     *
     * @param nodes List of Node or DOMString.
     */
    prepend(...nodes) {
        ParentNodeUtility.prepend(this, ...nodes);
    }
    /**
     * Replaces the existing children of a node with a specified new set of children.
     *
     * @param nodes List of Node or DOMString.
     */
    replaceChildren(...nodes) {
        ParentNodeUtility.replaceChildren(this, ...nodes);
    }
    /**
     * Inserts a node to the given position.
     *
     * @param position Position to insert element.
     * @param element Node to insert.
     * @returns Inserted node or null if couldn't insert.
     */
    insertAdjacentElement(position, element) {
        if (position === 'beforebegin') {
            if (!this.parentElement) {
                return null;
            }
            this.parentElement.insertBefore(element, this);
        }
        else if (position === 'afterbegin') {
            this.insertBefore(element, this.firstChild);
        }
        else if (position === 'beforeend') {
            this.appendChild(element);
        }
        else if (position === 'afterend') {
            if (!this.parentElement) {
                return null;
            }
            this.parentElement.insertBefore(element, this.nextSibling);
        }
        return element;
    }
    /**
     * Inserts an HTML string to the given position.
     *
     * @param position Position to insert text.
     * @param text HTML string to insert.
     */
    insertAdjacentHTML(position, text) {
        const childNodes = new HTMLParser(this[PropertySymbol.window]).parse(text)[PropertySymbol.nodeArray];
        while (childNodes.length) {
            this.insertAdjacentElement(position, childNodes[0]);
        }
    }
    /**
     * Inserts text to the given position.
     *
     * @param position Position to insert text.
     * @param text String to insert.
     */
    insertAdjacentText(position, text) {
        if (!text) {
            return;
        }
        const textNode = this[PropertySymbol.ownerDocument].createTextNode(text);
        this.insertAdjacentElement(position, textNode);
    }
    /**
     * Sets an attribute.
     *
     * @param name Name.
     * @param value Value.
     */
    setAttribute(name, value) {
        AttributeUtility.validateAttributeName(name, this[PropertySymbol.ownerDocument][PropertySymbol.contentType], { method: 'setAttribute', instance: 'Element' });
        name = String(name);
        const namespaceURI = this[PropertySymbol.namespaceURI];
        if (namespaceURI === NamespaceURI.html) {
            const attribute = this[PropertySymbol.ownerDocument].createAttribute(name);
            attribute[PropertySymbol.value] = String(value);
            this[PropertySymbol.attributes][PropertySymbol.setNamedItem](attribute);
        }
        else {
            const nameParts = name.split(':');
            let attributeNamespaceURI = null;
            // In the XML namespace, the attribute "xmlns" should be set to the "http://www.w3.org/2000/xmlns/" namespace and "xlink" to the "http://www.w3.org/1999/xlink" namespace.
            switch (nameParts[0]) {
                case 'xmlns':
                    attributeNamespaceURI =
                        !nameParts[1] || nameParts[1] === 'xlink' ? NamespaceURI.xmlns : null;
                    break;
                case 'xlink':
                    attributeNamespaceURI = NamespaceURI.xlink;
                    break;
            }
            const attribute = NodeFactory.createNode(this[PropertySymbol.ownerDocument], this[PropertySymbol.window].Attr);
            attribute[PropertySymbol.namespaceURI] = attributeNamespaceURI;
            attribute[PropertySymbol.name] = name;
            attribute[PropertySymbol.localName] =
                attributeNamespaceURI && nameParts[1] ? nameParts[1] : name;
            attribute[PropertySymbol.prefix] =
                attributeNamespaceURI && nameParts[1] ? nameParts[0] : null;
            attribute[PropertySymbol.value] = String(value);
            this[PropertySymbol.attributes][PropertySymbol.setNamedItem](attribute);
        }
    }
    /**
     * Sets a namespace attribute.
     *
     * @param namespaceURI Namespace URI.
     * @param name Name.
     * @param value Value.
     */
    setAttributeNS(namespaceURI, name, value) {
        const attribute = this[PropertySymbol.ownerDocument].createAttributeNS(namespaceURI, name);
        if (!namespaceURI && attribute[PropertySymbol.prefix]) {
            throw new this[PropertySymbol.window].DOMException(`Failed to execute 'setAttributeNS' on 'Element': '' is an invalid namespace for attributes.`, DOMExceptionNameEnum.namespaceError);
        }
        attribute[PropertySymbol.value] = String(value);
        this[PropertySymbol.attributes].setNamedItemNS(attribute);
    }
    /**
     * Returns attribute names.
     *
     * @returns Attribute names.
     */
    getAttributeNames() {
        const names = [];
        for (const item of this[PropertySymbol.attributes][PropertySymbol.items].values()) {
            names.push(item[PropertySymbol.name]);
        }
        return names;
    }
    /**
     * Returns attribute value.
     *
     * @param name Name.
     */
    getAttribute(name) {
        const attribute = this[PropertySymbol.attributes].getNamedItem(name);
        if (attribute) {
            return attribute[PropertySymbol.value];
        }
        return null;
    }
    /**
     * Toggle an attribute.
     * Returns `true` if attribute name is eventually present, and `false` otherwise.
     *
     * @param name A DOMString specifying the name of the attribute to be toggled.
     * @param force A boolean value to determine whether the attribute should be added or removed, no matter whether the attribute is present or not at the moment.
     */
    toggleAttribute(name, force) {
        name = name.toLowerCase();
        const attribute = this[PropertySymbol.attributes].getNamedItem(name);
        if (attribute) {
            if (force === true) {
                return true;
            }
            this[PropertySymbol.attributes][PropertySymbol.removeNamedItem](attribute);
            return false;
        }
        if (force === false) {
            return false;
        }
        this.setAttribute(name, '');
        return true;
    }
    /**
     * Returns namespace attribute value.
     *
     * @param namespace Namespace URI.
     * @param localName Local name.
     */
    getAttributeNS(namespace, localName) {
        const attribute = this.getAttributeNodeNS(namespace, localName);
        if (attribute) {
            return attribute[PropertySymbol.value];
        }
        return null;
    }
    /**
     * Returns a boolean value indicating whether the specified element has the attribute or not.
     *
     * @param name Attribute name.
     * @returns True if attribute exists, false otherwise.
     */
    hasAttribute(name) {
        return !!this.getAttributeNode(name);
    }
    /**
     * Returns a boolean value indicating whether the specified element has the namespace attribute or not.
     *
     * @param namespace Namespace URI.
     * @param localName Local name.
     * @returns True if attribute exists, false otherwise.
     */
    hasAttributeNS(namespace, localName) {
        return this[PropertySymbol.attributes].getNamedItemNS(namespace, localName) !== null;
    }
    /**
     * Returns "true" if the element has attributes.
     *
     * @returns "true" if the element has attributes.
     */
    hasAttributes() {
        return this[PropertySymbol.attributes][PropertySymbol.items].size > 0;
    }
    /**
     * Removes an attribute.
     *
     * @param name Name.
     */
    removeAttribute(name) {
        const item = this[PropertySymbol.attributes].getNamedItem(name);
        if (item) {
            this[PropertySymbol.attributes][PropertySymbol.removeNamedItem](item);
        }
    }
    /**
     * Removes a namespace attribute.
     *
     * @param namespace Namespace URI.
     * @param localName Local name.
     */
    removeAttributeNS(namespace, localName) {
        const item = this[PropertySymbol.attributes].getNamedItemNS(namespace, localName);
        if (item) {
            this[PropertySymbol.attributes][PropertySymbol.removeNamedItem](item);
        }
    }
    /**
     * Attaches a shadow root.
     *
     * @param init Shadow root init.
     * @param init.mode Shadow root mode.
     * @param [init.clonable] Clonable.
     * @param [init.delegateFocus] Delegate focus.
     * @param [init.serializable] Serializable.
     * @param [init.slotAssignment] Slot assignment.
     * @returns Shadow root.
     */
    attachShadow(init) {
        const window = this[PropertySymbol.window];
        if (!init) {
            throw new window.TypeError("Failed to execute 'attachShadow' on 'Element': 1 argument required, but only 0 present.");
        }
        if (!init.mode) {
            throw new window.TypeError("Failed to execute 'attachShadow' on 'Element': Failed to read the 'mode' property from 'ShadowRootInit': Required member is undefined.");
        }
        if (init.mode !== 'open' && init.mode !== 'closed') {
            throw new window.TypeError(`Failed to execute 'attachShadow' on 'Element': Failed to read the 'mode' property from 'ShadowRootInit': The provided value '${init.mode}' is not a valid enum value of type ShadowRootMode.`);
        }
        if (this[PropertySymbol.shadowRoot]) {
            throw new window.DOMException("Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.");
        }
        const shadowRoot = NodeFactory.createNode(this[PropertySymbol.ownerDocument], this[PropertySymbol.window].ShadowRoot);
        this[PropertySymbol.shadowRoot] = shadowRoot;
        shadowRoot[PropertySymbol.host] = this;
        shadowRoot[PropertySymbol.mode] = init.mode;
        shadowRoot[PropertySymbol.clonable] = !!init.clonable;
        shadowRoot[PropertySymbol.delegatesFocus] = !!init.delegateFocus;
        shadowRoot[PropertySymbol.serializable] = !!init.serializable;
        shadowRoot[PropertySymbol.slotAssignment] =
            init.slotAssignment === 'manual' ? 'manual' : 'named';
        shadowRoot[PropertySymbol.connectedToNode]();
        return this[PropertySymbol.shadowRoot];
    }
    /**
     * Converts to string.
     *
     * @returns String.
     */
    toString() {
        return this.outerHTML;
    }
    /**
     * Returns the size of an element and its position relative to the viewport.
     *
     * @returns DOM rect.
     */
    getBoundingClientRect() {
        // TODO: Not full implementation
        return new DOMRect();
    }
    /**
     * Returns a collection of DOMRect objects that indicate the bounding rectangles for each CSS border box in a client.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getClientRects
     * @returns DOM rect list.
     */
    getClientRects() {
        // TODO: Not full implementation
        const domRectList = new DOMRectList(PropertySymbol.illegalConstructor);
        domRectList.push(this.getBoundingClientRect());
        return domRectList;
    }
    /**
     * Designates a specific element as the capture target of future pointer events.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture
     * @param pointerId Pointer ID.
     */
    setPointerCapture(pointerId) {
        this[PropertySymbol.pointerCaptures].add(pointerId);
    }
    /**
     * Returns whether the element on which it is invoked has pointer capture for the pointer identified by the given pointer ID.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/hasPointerCapture
     * @param pointerId Pointer ID.
     * @returns Whether the element has pointer capture.
     */
    hasPointerCapture(pointerId) {
        return this[PropertySymbol.pointerCaptures].has(pointerId);
    }
    /**
     * Releases pointer capture that was previously set for a specific pointer.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/releasePointerCapture
     * @param pointerId Pointer ID.
     */
    releasePointerCapture(pointerId) {
        this[PropertySymbol.pointerCaptures].delete(pointerId);
    }
    /**
     * The matches() method checks to see if the Element would be selected by the provided selectorString.
     *
     * @param selector Selector.
     * @returns "true" if matching.
     */
    matches(selector) {
        return !!QuerySelector.matches(this, selector);
    }
    /**
     * Traverses the Element and its parents (heading toward the document root) until it finds a node that matches the provided selector string.
     *
     * @param selector Selector.
     * @returns Closest matching element.
     */
    closest(selector) {
        // eslint-disable-next-line
        let parent = this;
        while (parent) {
            if (QuerySelector.matches(parent, selector)) {
                return parent;
            }
            parent = parent.parentElement;
        }
        return null;
    }
    /**
     * Query CSS selector to find matching elements.
     *
     * @param selector CSS selector.
     * @returns Matching elements.
     */
    querySelectorAll(selector) {
        return QuerySelector.querySelectorAll(this, selector);
    }
    /**
     * Query CSS Selector to find matching node.
     *
     * @param selector CSS selector.
     * @returns Matching element.
     */
    querySelector(selector) {
        return QuerySelector.querySelector(this, selector);
    }
    /**
     * Returns an elements by class name.
     *
     * @param className Tag name.
     * @returns Matching element.
     */
    getElementsByClassName(className) {
        return ParentNodeUtility.getElementsByClassName(this, className);
    }
    /**
     * Returns an elements by tag name.
     *
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagName(tagName) {
        return ParentNodeUtility.getElementsByTagName(this, tagName);
    }
    /**
     * Returns an elements by tag name and namespace.
     *
     * @param namespaceURI Namespace URI.
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagNameNS(namespaceURI, tagName) {
        return ParentNodeUtility.getElementsByTagNameNS(this, namespaceURI, tagName);
    }
    /**
     * The setAttributeNode() method adds a new Attr node to the specified element.
     *
     * @param attribute Attribute.
     * @returns Replaced attribute.
     */
    setAttributeNode(attribute) {
        return this[PropertySymbol.attributes].setNamedItem(attribute);
    }
    /**
     * The setAttributeNodeNS() method adds a new Attr node to the specified element.
     *
     * @param attribute Attribute.
     * @returns Replaced attribute.
     */
    setAttributeNodeNS(attribute) {
        return this[PropertySymbol.attributes].setNamedItemNS(attribute);
    }
    /**
     * Returns an Attr node.
     *
     * @param name Name.
     * @returns Replaced attribute.
     */
    getAttributeNode(name) {
        return this[PropertySymbol.attributes].getNamedItem(name);
    }
    /**
     * Returns a namespaced Attr node.
     *
     * @param namespace Namespace.
     * @param localName Name.
     * @returns Replaced attribute.
     */
    getAttributeNodeNS(namespace, localName) {
        return this[PropertySymbol.attributes].getNamedItemNS(namespace, localName);
    }
    /**
     * Removes an Attr node.
     *
     * @param attribute Attribute.
     * @returns Removed attribute.
     */
    removeAttributeNode(attribute) {
        if (attribute[PropertySymbol.ownerElement] !== this) {
            throw new this[PropertySymbol.window].DOMException("Failed to execute 'removeAttributeNode' on 'Element': The node provided is owned by another element.");
        }
        this[PropertySymbol.attributes][PropertySymbol.removeNamedItem](attribute);
        return attribute;
    }
    /**
     * Scrolls to a particular set of coordinates.
     *
     * @param x X position or options object.
     * @param y Y position.
     */
    scroll(x, y) {
        if (typeof x !== 'object' && arguments.length === 1) {
            throw new this[PropertySymbol.window].TypeError("Failed to execute 'scroll' on 'Element': The provided value is not of type 'ScrollToOptions'.");
        }
        const options = typeof x === 'object' ? x : { left: x, top: y };
        if (options.behavior === 'smooth') {
            this[PropertySymbol.window].setTimeout(() => {
                if (options.top !== undefined) {
                    const top = Number(options.top);
                    this.scrollTop = isNaN(top) ? 0 : top;
                }
                if (options.left !== undefined) {
                    const left = Number(options.left);
                    this.scrollLeft = isNaN(left) ? 0 : left;
                }
            });
        }
        else {
            if (options.top !== undefined) {
                const top = Number(options.top);
                this.scrollTop = isNaN(top) ? 0 : top;
            }
            if (options.left !== undefined) {
                const left = Number(options.left);
                this.scrollLeft = isNaN(left) ? 0 : left;
            }
        }
    }
    /**
     * Scrolls to a particular set of coordinates.
     *
     * @param x X position or options object.
     * @param y Y position.
     */
    scrollTo(x, y) {
        if (typeof x !== 'object' && arguments.length === 1) {
            throw new this[PropertySymbol.window].TypeError("Failed to execute 'scrollTo' on 'Element': The provided value is not of type 'ScrollToOptions'.");
        }
        this.scroll(x, y);
    }
    /**
     * Scrolls by a relative amount from the current position.
     *
     * @param x Pixels to scroll by from top or scroll options object.
     * @param y Pixels to scroll by from left.
     */
    scrollBy(x, y) {
        if (typeof x !== 'object' && arguments.length === 1) {
            throw new this[PropertySymbol.window].TypeError("Failed to execute 'scrollBy' on 'Element': The provided value is not of type 'ScrollToOptions'.");
        }
        const options = typeof x === 'object' ? x : { left: x, top: y };
        this.scroll({
            left: this.scrollLeft + (options.left ?? 0),
            top: this.scrollTop + (options.top ?? 0),
            behavior: options.behavior
        });
    }
    /**
     * Scrolls the element's ancestor containers such that the element on which scrollIntoView() is called is visible to the user.
     *
     * @param [_options] Options.
     */
    scrollIntoView(_options) {
        // Do nothing
    }
    /**
     * @override
     */
    [PropertySymbol.appendChild](node, disableValidations = false) {
        const returnValue = super[PropertySymbol.appendChild](node, disableValidations);
        this.#onSlotChange(node);
        return returnValue;
    }
    /**
     * @override
     */
    [PropertySymbol.removeChild](node) {
        const returnValue = super[PropertySymbol.removeChild](node);
        this.#onSlotChange(node);
        return returnValue;
    }
    /**
     * @override
     */
    [PropertySymbol.insertBefore](newNode, referenceNode, disableValidations = false) {
        const returnValue = super[PropertySymbol.insertBefore](newNode, referenceNode, disableValidations);
        this.#onSlotChange(newNode);
        return returnValue;
    }
    /**
     * Triggered when an attribute is set.
     *
     * @param attribute Attribute.
     * @param replacedAttribute Replaced attribute.
     */
    [PropertySymbol.onSetAttribute](attribute, replacedAttribute) {
        if (!attribute[PropertySymbol.name]) {
            return;
        }
        const oldValue = replacedAttribute ? replacedAttribute[PropertySymbol.value] : null;
        if (attribute[PropertySymbol.name] === 'slot' &&
            this[PropertySymbol.parentNode] &&
            this[PropertySymbol.parentNode][PropertySymbol.shadowRoot]) {
            const shadowRoot = this[PropertySymbol.parentNode][PropertySymbol.shadowRoot];
            if (shadowRoot && attribute[PropertySymbol.value] !== oldValue) {
                // Previous slot
                if (oldValue !== null && replacedAttribute) {
                    const slot = shadowRoot.querySelector(`slot[name="${replacedAttribute[PropertySymbol.value]}"]`);
                    if (slot) {
                        slot.dispatchEvent(new Event('slotchange', { bubbles: true }));
                    }
                }
                else {
                    const slot = shadowRoot.querySelector('slot:not([name])');
                    if (slot) {
                        slot.dispatchEvent(new Event('slotchange', { bubbles: true }));
                    }
                }
                // New slot
                const slot = shadowRoot.querySelector(`slot[name="${attribute[PropertySymbol.value]}"]`);
                if (slot) {
                    slot.dispatchEvent(new Event('slotchange', { bubbles: true }));
                }
            }
        }
        if (this[attribute[PropertySymbol.name]] !== undefined &&
            attribute[PropertySymbol.name][0] === 'o' &&
            attribute[PropertySymbol.name][1] === 'n') {
            this[PropertySymbol.propertyEventListeners].delete(attribute[PropertySymbol.name]);
        }
        if (attribute[PropertySymbol.name] === 'id' && this[PropertySymbol.isConnected]) {
            if (replacedAttribute?.[PropertySymbol.value]) {
                this.#removeIdentifierFromWindow(replacedAttribute[PropertySymbol.value]);
            }
            this.#addIdentifierToWindow(attribute[PropertySymbol.value]);
        }
        this[PropertySymbol.reportMutation](new MutationRecord({
            type: MutationTypeEnum.attributes,
            target: this,
            attributeName: attribute[PropertySymbol.name],
            oldValue
        }));
    }
    /**
     * Triggered when an attribute is set.
     *
     * @param removedAttribute Attribute.
     */
    [PropertySymbol.onRemoveAttribute](removedAttribute) {
        if (removedAttribute[PropertySymbol.name] === 'slot' &&
            this[PropertySymbol.parentNode] &&
            this[PropertySymbol.parentNode][PropertySymbol.shadowRoot]) {
            const shadowRoot = this[PropertySymbol.parentNode][PropertySymbol.shadowRoot];
            const namedSlot = shadowRoot.querySelector(`slot[name="${removedAttribute[PropertySymbol.value]}"]`);
            const defaultSlot = shadowRoot.querySelector('slot:not([name])');
            if (namedSlot) {
                namedSlot.dispatchEvent(new Event('slotchange', { bubbles: true }));
            }
            if (defaultSlot) {
                defaultSlot.dispatchEvent(new Event('slotchange', { bubbles: true }));
            }
        }
        if (removedAttribute[PropertySymbol.name] === 'id' && this[PropertySymbol.isConnected]) {
            this.#removeIdentifierFromWindow(removedAttribute[PropertySymbol.value]);
        }
        this[PropertySymbol.reportMutation](new MutationRecord({
            type: MutationTypeEnum.attributes,
            target: this,
            attributeName: removedAttribute[PropertySymbol.name],
            oldValue: removedAttribute[PropertySymbol.value]
        }));
    }
    /**
     * @override
     */
    [PropertySymbol.connectedToDocument]() {
        const id = this.getAttribute('id');
        if (id) {
            this.#addIdentifierToWindow(id);
        }
        super[PropertySymbol.connectedToDocument]();
        this[PropertySymbol.window][PropertySymbol.customElementReactionStack].enqueueReaction(this, 'connectedCallback');
        if (this[PropertySymbol.shadowRoot]) {
            for (const childNode of this[PropertySymbol.nodeArray]) {
                this.#onSlotChange(childNode);
            }
        }
    }
    /**
     * @override
     */
    [PropertySymbol.disconnectedFromDocument]() {
        super[PropertySymbol.disconnectedFromDocument]();
        const id = this.getAttribute('id');
        if (id) {
            this.#removeIdentifierFromWindow(id);
        }
        this[PropertySymbol.window][PropertySymbol.customElementReactionStack].enqueueReaction(this, 'disconnectedCallback');
    }
    /**
     * @override
     */
    [PropertySymbol.destroy]() {
        const id = this.getAttribute('id');
        if (id) {
            this.#removeIdentifierFromWindow(id);
        }
        this[PropertySymbol.window][PropertySymbol.customElementReactionStack].enqueueReaction(this, 'disconnectedCallback');
        super[PropertySymbol.destroy]();
        if (this[PropertySymbol.shadowRoot]) {
            this[PropertySymbol.shadowRoot][PropertySymbol.destroy]();
        }
        this[PropertySymbol.classList] = null;
        this[PropertySymbol.shadowRoot] = null;
        this[PropertySymbol.attributesProxy] = null;
        this[PropertySymbol.children] = null;
        this[PropertySymbol.computedStyle] = null;
        this[PropertySymbol.propertyEventListeners].clear();
        this[PropertySymbol.attributes][PropertySymbol.itemsByNamespaceURI].clear();
        this[PropertySymbol.attributes][PropertySymbol.itemsByName].clear();
        this[PropertySymbol.attributes][PropertySymbol.items].clear();
    }
    /**
     * Adds identifier to the window object.
     *
     * @param id Identifier.
     */
    #addIdentifierToWindow(id) {
        if (!id) {
            return;
        }
        const document = this[PropertySymbol.ownerDocument];
        const window = this[PropertySymbol.window];
        // We should not add the identifier when inside a shadow root
        if (this[PropertySymbol.rootNode] && this[PropertySymbol.rootNode] !== document) {
            return;
        }
        if (!document[PropertySymbol.elementIdMap].has(id)) {
            document[PropertySymbol.elementIdMap].set(id, { elements: [], htmlCollection: null });
        }
        const entry = document[PropertySymbol.elementIdMap].get(id);
        if (!entry) {
            return;
        }
        // HTMLFormElement and HTMLSelectElement can be a proxy, but the scope can be the target and not the actual proxy
        // To make sure we use the proxy we can check for the proxy property
        const element = this[PropertySymbol.proxy] || this;
        entry.elements.push(element);
        if (entry.elements.length > 1) {
            if (!entry.htmlCollection) {
                entry.htmlCollection = new HTMLCollection(PropertySymbol.illegalConstructor, () => entry.elements);
            }
            if (!(id in window) || window[id] === entry.elements[0]) {
                window[id] = entry.htmlCollection;
            }
        }
        else if (!(id in window) ||
            (entry.htmlCollection !== null && window[id] === entry.htmlCollection)) {
            window[id] = element;
        }
    }
    /**
     * Removes identifier from the window object.
     *
     * @param id Identifier.
     */
    #removeIdentifierFromWindow(id) {
        if (!id) {
            return;
        }
        const document = this[PropertySymbol.ownerDocument];
        const window = this[PropertySymbol.window];
        // We should not add the identifier when inside a shadow root
        if (this[PropertySymbol.rootNode] && this[PropertySymbol.rootNode] !== document) {
            return;
        }
        const entry = document[PropertySymbol.elementIdMap].get(id);
        if (!entry) {
            return;
        }
        // HTMLFormElement and HTMLSelectElement can be a proxy, but the scope can be the target and not the actual proxy
        // To make sure we use the proxy we can check for the proxy property
        const element = this[PropertySymbol.proxy] || this;
        const index = entry.elements.indexOf(element);
        if (index !== -1) {
            entry.elements.splice(index, 1);
        }
        if (entry.elements.length === 1) {
            if (window[id] === entry.htmlCollection) {
                window[id] = entry.elements[0];
            }
            entry.htmlCollection = null;
        }
        else if (!entry.elements.length) {
            document[PropertySymbol.elementIdMap].delete(id);
            if (window[id] === element || window[id] === entry.htmlCollection) {
                delete window[id];
            }
        }
    }
    /**
     * Triggered when child nodes are changed.
     *
     * @param addedOrRemovedNode Changed node.
     */
    #onSlotChange(addedOrRemovedNode) {
        const shadowRoot = this[PropertySymbol.shadowRoot];
        if (!shadowRoot || !this[PropertySymbol.isConnected]) {
            return;
        }
        const slotName = addedOrRemovedNode['getAttribute']
            ? addedOrRemovedNode.getAttribute('slot')
            : null;
        if (slotName) {
            const slot = shadowRoot.querySelector(`slot[name="${slotName}"]`);
            if (slot) {
                slot.dispatchEvent(new Event('slotchange', { bubbles: true }));
            }
        }
        else if (addedOrRemovedNode[PropertySymbol.nodeType] !== NodeTypeEnum.commentNode) {
            const slot = shadowRoot.querySelector('slot:not([name])');
            if (slot) {
                slot.dispatchEvent(new Event('slotchange', { bubbles: true }));
            }
        }
    }
}
//# sourceMappingURL=Element.js.map