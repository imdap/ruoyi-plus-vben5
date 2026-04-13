import SVGGraphicsElement from '../svg-graphics-element/SVGGraphicsElement.js';
import SVGRect from '../../svg/SVGRect.js';
import SVGPoint from '../../svg/SVGPoint.js';
import SVGLength from '../../svg/SVGLength.js';
import SVGAngle from '../../svg/SVGAngle.js';
import SVGNumber from '../../svg/SVGNumber.js';
import SVGTransform from '../../svg/SVGTransform.js';
import SVGAnimatedRect from '../../svg/SVGAnimatedRect.js';
import type Event from '../../event/Event.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import SVGAnimatedPreserveAspectRatio from '../../svg/SVGAnimatedPreserveAspectRatio.js';
import SVGAnimatedLength from '../../svg/SVGAnimatedLength.js';
import type Element from '../element/Element.js';
import NodeList from '../node/NodeList.js';
import type SVGElement from '../svg-element/SVGElement.js';
import SVGMatrix from '../../svg/SVGMatrix.js';
import type HTMLCollection from '../element/HTMLCollection.js';
import type IHTMLElementTagNameMap from '../../config/IHTMLElementTagNameMap.js';
import type ISVGElementTagNameMap from '../../config/ISVGElementTagNameMap.js';
/**
 * SVGSVGElement.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement
 */
export default class SVGSVGElement extends SVGGraphicsElement {
    [PropertySymbol.preserveAspectRatio]: SVGAnimatedPreserveAspectRatio | null;
    [PropertySymbol.x]: SVGAnimatedLength | null;
    [PropertySymbol.y]: SVGAnimatedLength | null;
    [PropertySymbol.width]: SVGAnimatedLength | null;
    [PropertySymbol.height]: SVGAnimatedLength | null;
    [PropertySymbol.currentScale]: number;
    [PropertySymbol.viewBox]: SVGAnimatedRect | null;
    cloneNode: (deep?: boolean) => SVGSVGElement;
    get onafterprint(): ((event: Event) => void) | null;
    set onafterprint(value: ((event: Event) => void) | null);
    get onbeforeprint(): ((event: Event) => void) | null;
    set onbeforeprint(value: ((event: Event) => void) | null);
    get onbeforeunload(): ((event: Event) => void) | null;
    set onbeforeunload(value: ((event: Event) => void) | null);
    get ongamepadconnected(): ((event: Event) => void) | null;
    set ongamepadconnected(value: ((event: Event) => void) | null);
    get ongamepaddisconnected(): ((event: Event) => void) | null;
    set ongamepaddisconnected(value: ((event: Event) => void) | null);
    get onhashchange(): ((event: Event) => void) | null;
    set onhashchange(value: ((event: Event) => void) | null);
    get onlanguagechange(): ((event: Event) => void) | null;
    set onlanguagechange(value: ((event: Event) => void) | null);
    get onmessage(): ((event: Event) => void) | null;
    set onmessage(value: ((event: Event) => void) | null);
    get onmessageerror(): ((event: Event) => void) | null;
    set onmessageerror(value: ((event: Event) => void) | null);
    get onoffline(): ((event: Event) => void) | null;
    set onoffline(value: ((event: Event) => void) | null);
    get ononline(): ((event: Event) => void) | null;
    set ononline(value: ((event: Event) => void) | null);
    get onpagehide(): ((event: Event) => void) | null;
    set onpagehide(value: ((event: Event) => void) | null);
    get onpageshow(): ((event: Event) => void) | null;
    set onpageshow(value: ((event: Event) => void) | null);
    get onpopstate(): ((event: Event) => void) | null;
    set onpopstate(value: ((event: Event) => void) | null);
    get onrejectionhandled(): ((event: Event) => void) | null;
    set onrejectionhandled(value: ((event: Event) => void) | null);
    get onstorage(): ((event: Event) => void) | null;
    set onstorage(value: ((event: Event) => void) | null);
    get onunhandledrejection(): ((event: Event) => void) | null;
    set onunhandledrejection(value: ((event: Event) => void) | null);
    get onunload(): ((event: Event) => void) | null;
    set onunload(value: ((event: Event) => void) | null);
    /**
     * Returns preserve aspect ratio.
     *
     * @returns Preserve aspect ratio.
     */
    get preserveAspectRatio(): SVGAnimatedPreserveAspectRatio;
    /**
     * Returns height.
     *
     * @returns Height.
     */
    get height(): SVGAnimatedLength;
    /**
     * Returns width.
     *
     * @returns Width.
     */
    get width(): SVGAnimatedLength;
    /**
     * Returns x position.
     *
     * @returns X position.
     */
    get x(): SVGAnimatedLength;
    /**
     * Returns y position.
     *
     * @returns Y position.
     */
    get y(): SVGAnimatedLength;
    /**
     * Returns currentScale.
     *
     * @returns CurrentScale.
     */
    get currentScale(): number;
    /**
     * Sets currentScale.
     *
     * @param currentScale CurrentScale.
     */
    set currentScale(currentScale: number);
    /**
     * Returns current translate.
     *
     * @returns SVG point.
     */
    get currentTranslate(): SVGPoint;
    /**
     * Returns view box.
     *
     * @returns View box.
     */
    get viewBox(): SVGAnimatedRect;
    /**
     * Pauses animation.
     */
    pauseAnimations(): void;
    /**
     * Unpauses animation.
     */
    unpauseAnimations(): void;
    /**
     * Returns "true" if animation is paused.
     *
     * @returns "true" if animation is paused.
     */
    animationsPaused(): boolean;
    /**
     * Returns the current time in seconds relative to the start time for the current SVG document fragment.
     *
     * @returns Current time in seconds.
     */
    getCurrentTime(): number;
    /**
     * Sets current time.
     *
     * @param _seconds Seconds.
     */
    setCurrentTime(_seconds: number): void;
    /**
     * Returns intersection list.
     *
     * @param _rect SVG Rect.
     * @param _element SVG Element.
     * @returns Intersection list.
     */
    getIntersectionList(_rect: SVGRect, _element: SVGElement): NodeList<SVGElement>;
    /**
     * Returns enclousure list.
     *
     * @param _rect SVG Rect.
     * @param _element SVG Element.
     * @returns Enclousure list.
     */
    getEnclosureList(_rect: SVGRect, _element: SVGElement): NodeList<SVGElement>;
    /**
     * Returns true if the rendered content of the given element intersects the supplied rectangle.
     *
     * @param _element SVG Element.
     * @param _rect SVG Rect.
     * @returns Intersection state.
     */
    checkIntersection(_element: SVGElement, _rect: SVGRect): boolean;
    /**
     * Returns true if the rendered content of the given element is entirely contained within the supplied rectangle.
     *
     * @param _element SVG Element.
     * @param _rect SVG Rect.
     * @returns Enclousure state.
     */
    checkEnclosure(_element: SVGElement, _rect: SVGRect): boolean;
    /**
     * Unselects any selected objects, including any selections of text strings and type-in bars.
     */
    deselectAll(): void;
    /**
     * Returns a number.
     *
     * @returns Number.
     */
    createSVGNumber(): SVGNumber;
    /**
     * Returns a length.
     *
     * @returns Length.
     */
    createSVGLength(): SVGLength;
    /**
     * Returns a angle.
     *
     * @returns Angle.
     */
    createSVGAngle(): SVGAngle;
    /**
     * Returns a point.
     *
     * @returns Point.
     */
    createSVGPoint(): SVGPoint;
    /**
     * Returns a matrix.
     *
     * @returns Matrix.
     */
    createSVGMatrix(): SVGMatrix;
    /**
     * Returns a rect.
     *
     * @returns Rect.
     */
    createSVGRect(): SVGRect;
    /**
     * Returns a transform.
     *
     * @returns Transform.
     */
    createSVGTransform(): SVGTransform;
    /**
     * Returns a transform from a matrix.
     *
     * @param matrix Matrix.
     */
    createSVGTransformFromMatrix(matrix: SVGMatrix): SVGTransform;
    /**
     * Returns an elements by class name.
     *
     * @param className Tag name.
     * @returns Matching element.
     */
    getElementsByClassName(className: string): HTMLCollection<Element>;
    /**
     * Returns an elements by tag name.
     *
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagName<K extends keyof ISVGElementTagNameMap>(tagName: K): HTMLCollection<ISVGElementTagNameMap[K]>;
    /**
     * Returns an elements by tag name.
     *
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagName(tagName: string): HTMLCollection<Element>;
    /**
     * Returns an elements by tag name and namespace.
     *
     * @param namespaceURI Namespace URI.
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagNameNS<K extends keyof IHTMLElementTagNameMap>(namespaceURI: 'http://www.w3.org/1999/xhtml', tagName: K): HTMLCollection<IHTMLElementTagNameMap[K]>;
    /**
     * Returns an elements by tag name and namespace.
     *
     * @param namespaceURI Namespace URI.
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagNameNS<K extends keyof ISVGElementTagNameMap>(namespaceURI: 'http://www.w3.org/2000/svg', tagName: K): HTMLCollection<ISVGElementTagNameMap[K]>;
    /**
     * Returns an elements by tag name and namespace.
     *
     * @param namespaceURI Namespace URI.
     * @param tagName Tag name.
     * @returns Matching element.
     */
    getElementsByTagNameNS(namespaceURI: string, tagName: string): HTMLCollection<Element>;
    /**
     * Returns an element by ID.
     *
     * @param id ID.
     * @returns Matching element.
     */
    getElementById(id: string): Element | null;
    /**
     * @override
     */
    [PropertySymbol.cloneNode](deep?: boolean): SVGSVGElement;
}
//# sourceMappingURL=SVGSVGElement.d.ts.map