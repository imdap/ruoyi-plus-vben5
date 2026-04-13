import { AnimateUpdates } from './types';
import { Feature } from '../feature';
import { MotionState } from '../../state';
import { $Transition, AnimationFactory, Options } from '../../types';
declare const STATE_TYPES: readonly ["initial", "animate", "whileInView", "whileHover", "whilePress", "whileDrag", "whileFocus", "exit"];
export type StateType = typeof STATE_TYPES[number];
export declare class AnimationFeature extends Feature {
    unmountControls?: () => void;
    constructor(state: MotionState);
    updateAnimationControlsSubscription(): void;
    animateUpdates: AnimateUpdates;
    executeAnimations({ factories, getChildAnimations, transition, controlActiveState, isExit, }: {
        factories: AnimationFactory[];
        getChildAnimations: () => Promise<any>;
        transition: $Transition | undefined;
        controlActiveState: Partial<Record<string, boolean>> | undefined;
        isExit: boolean;
    }): Promise<any> | (() => Promise<any>);
    /**
     * Setup child animations
     */
    setupChildAnimations(transition: $Transition | undefined, controlActiveState: Partial<Record<string, boolean>> | undefined): {
        getChildAnimations: () => Promise<void>;
    } | {
        getChildAnimations: () => Promise<any[]>;
    };
    createAnimationFactories(prevTarget: Record<string, any>, animationOptions: $Transition, controlDelay: number): AnimationFactory[];
    resolveStateAnimation({ controlActiveState, directAnimate, directTransition, }: {
        controlActiveState: Partial<Record<string, boolean>> | undefined;
        directAnimate: Options['animate'];
        directTransition: Options['transition'] | undefined;
    }): import('motion-dom').Transition<any> & {
        layout?: $Transition;
    };
    /**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */
    mount(): void;
    update(): void;
    unmount(): void;
}
export {};
