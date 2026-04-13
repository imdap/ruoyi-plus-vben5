import * as PropertySymbol from '../PropertySymbol.js';
import NodeTypeEnum from '../nodes/node/NodeTypeEnum.js';
import EventPhaseEnum from './EventPhaseEnum.js';
/**
 * Event.
 */
export default class Event {
    static NONE = EventPhaseEnum.none;
    static CAPTURING_PHASE = EventPhaseEnum.capturing;
    static AT_TARGET = EventPhaseEnum.atTarget;
    static BUBBLING_PHASE = EventPhaseEnum.bubbling;
    NONE = Event.NONE;
    CAPTURING_PHASE = Event.CAPTURING_PHASE;
    AT_TARGET = Event.AT_TARGET;
    BUBBLING_PHASE = Event.BUBBLING_PHASE;
    [PropertySymbol.composed] = false;
    [PropertySymbol.bubbles] = false;
    [PropertySymbol.cancelable] = false;
    [PropertySymbol.defaultPrevented] = false;
    [PropertySymbol.eventPhase] = EventPhaseEnum.none;
    [PropertySymbol.timeStamp] = performance.now();
    [PropertySymbol.type];
    [PropertySymbol.dispatching] = false;
    [PropertySymbol.immediatePropagationStopped] = false;
    [PropertySymbol.propagationStopped] = false;
    [PropertySymbol.target] = null;
    [PropertySymbol.currentTarget] = null;
    [PropertySymbol.isInPassiveEventListener] = false;
    /**
     * Constructor.
     *
     * @param type Event type.
     * @param [eventInit] Event init.
     */
    constructor(type, eventInit = null) {
        this[PropertySymbol.type] = type;
        this[PropertySymbol.bubbles] = eventInit?.bubbles ?? false;
        this[PropertySymbol.cancelable] = eventInit?.cancelable ?? false;
        this[PropertySymbol.composed] = eventInit?.composed ?? false;
    }
    /**
     * Returns composed.
     *
     * @returns Composed.
     */
    get composed() {
        return this[PropertySymbol.composed];
    }
    /**
     * Returns bubbles.
     *
     * @returns Bubbles.
     */
    get bubbles() {
        return this[PropertySymbol.bubbles];
    }
    /**
     * Returns cancelable.
     *
     * @returns Cancelable.
     */
    get cancelable() {
        return this[PropertySymbol.cancelable];
    }
    /**
     * Returns defaultPrevented.
     *
     * @returns Default prevented.
     */
    get defaultPrevented() {
        return this[PropertySymbol.defaultPrevented];
    }
    /**
     * Returns eventPhase.
     *
     * @returns Event phase.
     */
    get eventPhase() {
        return this[PropertySymbol.eventPhase];
    }
    /**
     * Returns timeStamp.
     *
     * @returns Time stamp.
     */
    get timeStamp() {
        return this[PropertySymbol.timeStamp];
    }
    /**
     * Returns type.
     *
     * @returns Type.
     */
    get type() {
        return this[PropertySymbol.type];
    }
    /**
     * Returns target.
     *
     * @returns Target.
     */
    get target() {
        return this[PropertySymbol.target];
    }
    /**
     * Returns target.
     *
     * @returns Target.
     */
    get currentTarget() {
        return this[PropertySymbol.currentTarget];
    }
    /**
     * Returns "true" if propagation has been stopped.
     *
     * @returns "true" if propagation has been stopped.
     */
    get cancelBubble() {
        return this[PropertySymbol.propagationStopped];
    }
    /**
     * Returns composed path.
     *
     * @returns Composed path.
     */
    composedPath() {
        if (!this[PropertySymbol.target]) {
            return [];
        }
        const composedPath = [];
        let eventTarget = (this[PropertySymbol.target]);
        while (eventTarget) {
            composedPath.push(eventTarget);
            if (eventTarget.parentNode) {
                eventTarget = eventTarget.parentNode;
            }
            else if (this[PropertySymbol.composed] &&
                eventTarget[PropertySymbol.nodeType] === NodeTypeEnum.documentFragmentNode &&
                eventTarget.host) {
                eventTarget = eventTarget.host;
            }
            else if (eventTarget[PropertySymbol.nodeType] === NodeTypeEnum.documentNode &&
                // The "load" event is a special case. It should not bubble up to the window.
                this[PropertySymbol.type] !== 'load') {
                eventTarget = eventTarget[PropertySymbol.window];
            }
            else {
                break;
            }
        }
        return composedPath;
    }
    /**
     * Init event.
     *
     * @deprecated
     * @param type Type.
     * @param [bubbles=false] "true" if it bubbles.
     * @param [cancelable=false] "true" if it cancelable.
     */
    initEvent(type, bubbles = false, cancelable = false) {
        this[PropertySymbol.type] = type;
        this[PropertySymbol.bubbles] = bubbles;
        this[PropertySymbol.cancelable] = cancelable;
        this[PropertySymbol.propagationStopped] = false;
        this[PropertySymbol.immediatePropagationStopped] = false;
        this[PropertySymbol.defaultPrevented] = false;
    }
    /**
     * Prevents default.
     */
    preventDefault() {
        if (!this[PropertySymbol.isInPassiveEventListener] && this.cancelable) {
            this[PropertySymbol.defaultPrevented] = true;
        }
    }
    /**
     * Stops immediate propagation.
     */
    stopImmediatePropagation() {
        this[PropertySymbol.immediatePropagationStopped] = true;
    }
    /**
     * Stops propagation.
     */
    stopPropagation() {
        this[PropertySymbol.propagationStopped] = true;
    }
}
//# sourceMappingURL=Event.js.map