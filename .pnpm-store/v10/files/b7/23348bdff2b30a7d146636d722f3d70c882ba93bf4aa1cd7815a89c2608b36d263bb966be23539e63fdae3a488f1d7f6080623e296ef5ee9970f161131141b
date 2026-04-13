import { Options } from '../../../types';
import { Point, VisualElement } from 'framer-motion';
import { MotionProps } from '../../../components';
export declare const elementDragControls: WeakMap<VisualElement<unknown, unknown, {}>, VisualElementDragControls>;
export interface DragControlOptions {
    snapToCursor?: boolean;
    cursorProgress?: Point;
}
/**
 *
 */
export declare class VisualElementDragControls {
    private visualElement;
    private panSession?;
    private openGlobalLock;
    isDragging: boolean;
    private currentDirection;
    private originPoint;
    /**
     * The permitted boundaries of travel, in pixels.
     */
    private constraints;
    private hasMutatedConstraints;
    /**
     * The per-axis resolved elastic values.
     */
    private elastic;
    constructor(visualElement: VisualElement<HTMLElement>);
    start(originEvent: PointerEvent, { snapToCursor }?: DragControlOptions): void;
    private stop;
    private cancel;
    private updateAxis;
    private resolveConstraints;
    private resolveRefConstraints;
    private startAnimation;
    private startAxisValueAnimation;
    private stopAnimation;
    private pauseAnimation;
    private getAnimationState;
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - Otherwise, we apply the delta to the x/y motion values.
     */
    private getAxisMotionValue;
    private snapToCursor;
    /**
     * When the viewport resizes we want to check if the measured constraints
     * have changed and, if so, reposition the element within those new constraints
     * relative to where it was before the resize.
     */
    scalePositionWithinConstraints(): void;
    addListeners(): () => void;
    getProps(): Options;
}
export declare function expectsResolvedDragConstraints({ dragConstraints, onMeasureDragConstraints, }: MotionProps): boolean;
