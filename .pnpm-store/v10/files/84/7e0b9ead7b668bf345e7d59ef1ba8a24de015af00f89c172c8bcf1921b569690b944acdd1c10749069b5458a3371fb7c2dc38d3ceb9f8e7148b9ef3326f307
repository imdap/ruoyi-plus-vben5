import SVGElement from '../svg-element/SVGElement.js';
import DOMRect from '../../dom/DOMRect.js';
import DOMMatrix from '../../dom/dom-matrix/DOMMatrix.js';
import SVGStringList from '../../svg/SVGStringList.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import SVGAnimatedTransformList from '../../svg/SVGAnimatedTransformList.js';
import type Event from '../../event/Event.js';
/**
 * SVG Graphics Element.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement
 */
export default class SVGGraphicsElement extends SVGElement {
    [PropertySymbol.requiredExtensions]: SVGStringList | null;
    [PropertySymbol.systemLanguage]: SVGStringList | null;
    [PropertySymbol.transform]: SVGAnimatedTransformList | null;
    get oncopy(): ((event: Event) => void) | null;
    set oncopy(value: ((event: Event) => void) | null);
    get oncut(): ((event: Event) => void) | null;
    set oncut(value: ((event: Event) => void) | null);
    get onpaste(): ((event: Event) => void) | null;
    set onpaste(value: ((event: Event) => void) | null);
    /**
     * Returns required extensions.
     *
     * @returns Required extensions.
     */
    get requiredExtensions(): SVGStringList;
    /**
     * Returns system language.
     *
     * @returns System language.
     */
    get systemLanguage(): SVGStringList;
    /**
     * Returns transform.
     *
     * @returns Transform.
     */
    get transform(): SVGAnimatedTransformList;
    /**
     * Returns DOM rect.
     *
     * @returns DOM rect.
     */
    getBBox(): DOMRect;
    /**
     * Returns CTM.
     *
     * @returns CTM.
     */
    getCTM(): DOMMatrix;
    /**
     * Returns screen CTM.
     *
     * @returns Screen CTM.
     */
    getScreenCTM(): DOMMatrix;
}
//# sourceMappingURL=SVGGraphicsElement.d.ts.map