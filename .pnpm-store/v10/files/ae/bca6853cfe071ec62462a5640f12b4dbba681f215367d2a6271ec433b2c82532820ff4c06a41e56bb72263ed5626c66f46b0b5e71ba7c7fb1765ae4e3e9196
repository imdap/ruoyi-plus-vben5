import { $Transition, MotionStateContext, Options } from '../types';
import { DOMKeyframesDefinition, VisualElement } from 'framer-motion';
import { frame } from 'framer-motion/dom';
import { Feature, StateType } from '../features';
import { PresenceContext } from '../components/animate-presence/presence';
import { AnimateUpdates } from '../features/animation/types';
import { LazyMotionContext } from '../components/lazy-motion/context';
export declare const mountedStates: WeakMap<Element, MotionState>;
/**
 * Core class that manages animation state and orchestrates animations.
 * Handles component lifecycle methods in the correct order based on component tree position.
 */
export declare class MotionState {
    readonly id: string;
    type: 'html' | 'svg';
    element: HTMLElement | SVGElement | null;
    parent?: MotionState;
    isExiting: boolean;
    presenceContainer: Element | null;
    options: Options & {
        animatePresenceContext?: PresenceContext;
        features?: Array<typeof Feature>;
        lazyMotionContext?: LazyMotionContext;
    };
    private children?;
    activeStates: Partial<Record<StateType, boolean>>;
    /**
     * Current animation process reference
     * Tracks the ongoing animation process for mount/update animations
     * Enables delayed animation loading and parent-child animation orchestration
     * Allows parent variant elements to control child element animations
     */
    currentProcess: ReturnType<typeof frame.render> | null;
    baseTarget: DOMKeyframesDefinition;
    target: DOMKeyframesDefinition;
    /**
     * The final transition to be applied to the state
     */
    finalTransition: $Transition;
    private featureManager;
    visualElement: VisualElement<Element>;
    constructor(options: Options, parent?: MotionState);
    private _context;
    get context(): MotionStateContext;
    private initTarget;
    updateOptions(options: Options): void;
    beforeMount(): void;
    mount(element: HTMLElement | SVGElement, options: Options, notAnimate?: boolean): void;
    clearAnimation(): void;
    startAnimation(): void;
    beforeUnmount(): void;
    unmount(): void;
    beforeUpdate(options: Options): void;
    update(options: Options): void;
    setActive(name: StateType, isActive: boolean, isAnimate?: boolean): void;
    animateUpdates: AnimateUpdates;
    isMounted(): boolean;
    getSnapshot(options: Options, isPresent?: boolean): void;
    didUpdate(label?: string): void;
}
