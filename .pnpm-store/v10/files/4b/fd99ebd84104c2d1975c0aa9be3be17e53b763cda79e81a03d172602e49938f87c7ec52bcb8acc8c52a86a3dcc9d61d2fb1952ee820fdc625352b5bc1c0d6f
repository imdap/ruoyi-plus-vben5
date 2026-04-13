import * as vue from 'vue';
import { Ref, CSSProperties, UnwrapRef, Directive, App, PropType, Component, VNode, Reactive } from 'vue';
import { MaybeRef, VueInstance } from '@vueuse/core';
import { MaybeRef as MaybeRef$1 } from '@vueuse/shared';

type GenericHandler = (...args: any) => void;
/**
 * A generic subscription manager.
 */
declare class SubscriptionManager<Handler extends GenericHandler> {
    private subscriptions;
    add(handler: Handler): () => boolean;
    notify(
    /**
     * Using ...args would be preferable but it's array creation and this
     * might be fired every frame.
     */
    a?: Parameters<Handler>[0], b?: Parameters<Handler>[1], c?: Parameters<Handler>[2]): void;
    clear(): void;
}

/**
 * `MotionValue` is used to track the state and velocity of motion values.
 */
declare class MotionValue<V = any> {
    /**
     * The current state of the `MotionValue`.
     */
    private current;
    /**
     * The previous state of the `MotionValue`.
     */
    private prev;
    /**
     * Duration, in milliseconds, since last updating frame.
     */
    private timeDelta;
    /**
     * Timestamp of the last time this `MotionValue` was updated.
     */
    private lastUpdated;
    /**
     * Functions to notify when the `MotionValue` updates.
     */
    updateSubscribers: SubscriptionManager<Subscriber<V>>;
    /**
     * A reference to the currently-controlling Popmotion animation
     */
    private stopAnimation?;
    /**
     * Tracks whether this value can output a velocity.
     */
    private canTrackVelocity;
    /**
     * init - The initiating value
     * config - Optional configuration options
     */
    constructor(init: V);
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     */
    onChange(subscription: Subscriber<V>): () => void;
    clearListeners(): void;
    /**
     * Sets the state of the `MotionValue`.
     *
     * @param v
     * @param render
     */
    set(v: V): void;
    /**
     * Update and notify `MotionValue` subscribers.
     *
     * @param v
     * @param render
     */
    updateAndNotify: (v: V) => void;
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     */
    get(): V;
    /**
     * Get previous value.
     *
     * @returns - The previous latest state of `MotionValue`
     */
    getPrevious(): V;
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     */
    getVelocity(): number;
    /**
     * Schedule a velocity check for the next frame.
     */
    private scheduleVelocityCheck;
    /**
     * Updates `prev` with `current` if the value hasn't been updated this frame.
     * This ensures velocity calculations return `0`.
     */
    private velocityCheck;
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     */
    start(animation: StartAnimation): Promise<void>;
    /**
     * Stop the currently active animation.
     */
    stop(): void;
    /**
     * Returns `true` if this value is currently animating.
     */
    isAnimating(): boolean;
    /**
     * Clear the current animation reference.
     */
    private clearAnimation;
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     */
    destroy(): void;
}

type ResolvedKeyframesTarget = [null, ...number[]] | number[] | [null, ...string[]] | string[];
type KeyframesTarget = ResolvedKeyframesTarget | [null, ...CustomValueType[]] | CustomValueType[];
type ResolvedSingleTarget = string | number;
type SingleTarget = ResolvedSingleTarget | CustomValueType;
type ResolvedValueTarget = ResolvedSingleTarget | ResolvedKeyframesTarget;
type ValueTarget = SingleTarget | KeyframesTarget;
type Props = Record<string, any>;
type EasingFunction = (v: number) => number;
type Easing = [number, number, number, number] | 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'circIn' | 'circOut' | 'circInOut' | 'backIn' | 'backOut' | 'backInOut' | 'anticipate' | EasingFunction;
interface Orchestration {
    /**
     * Delay the animation by this duration (in seconds). Defaults to `0`.
     */
    delay?: number;
    /**
     * Callback triggered on animation complete.
     */
    onComplete?: () => void;
    /**
     * Should the value be set imediately
     */
    immediate?: boolean;
}
interface Repeat {
    /**
     * The number of times to repeat the transition. Set to `Infinity` for perpetual repeating.
     *
     * Without setting `repeatType`, this will loop the animation.
     */
    repeat?: number;
    /**
     * How to repeat the animation. This can be either:
     *
     * "loop": Repeats the animation from the start
     *
     * "reverse": Alternates between forward and backwards playback
     *
     * "mirror": Switchs `from` and `to` alternately
     */
    repeatType?: 'loop' | 'reverse' | 'mirror';
    /**
     * When repeating an animation, `repeatDelay` will set the
     * duration of the time to wait, in seconds, between each repetition.
     */
    repeatDelay?: number;
}
/**
 * An animation that animates between two or more values over a specific duration of time.
 * This is the default animation for non-physical values like `color` and `opacity`.
 */
interface Tween extends Repeat {
    /**
     * Set `type` to `"tween"` to use a duration-based tween animation.
     * If any non-orchestration `transition` values are set without a `type` property,
     * this is used as the default animation.
     */
    type?: 'tween';
    /**
     * The duration of the tween animation. Set to `0.3` by default, 0r `0.8` if animating a series of keyframes.
     */
    duration?: number;
    /**
     * The easing function to use. Set as one of the below.
     *
     * - The name of an existing easing function.
     * - An array of four numbers to define a cubic bezier curve.
     * - An easing function, that accepts and returns a value `0-1`.
     *
     * If the animating value is set as an array of multiple values for a keyframes
     * animation, `ease` can be set as an array of easing functions to set different easings between
     * each of those values.
     */
    ease?: Easing | Easing[];
    /**
     * The duration of time already elapsed in the animation. Set to `0` by
     * default.
     */
    elapsed?: number;
    /**
     * When animating keyframes, `times` can be used to determine where in the animation each keyframe is reached.
     * Each value in `times` is a value between `0` and `1`, representing `duration`.
     *
     * There must be the same number of `times` as there are keyframes.
     * Defaults to an array of evenly-spread durations.
     */
    times?: number[];
    /**
     * When animating keyframes, `easings` can be used to define easing functions between each keyframe. This array should be one item fewer than the number of keyframes, as these easings apply to the transitions between the keyframes.
     */
    easings?: Easing[];
    /**
     * The value to animate from.
     * By default, this is the current state of the animating value.
     */
    from?: number | string;
    to?: number | string | ValueTarget;
    velocity?: number;
    delay?: number;
}
/**
 * An animation that simulates spring physics for realistic motion.
 * This is the default animation for physical values like `x`, `y`, `scale` and `rotate`.
 */
interface Spring extends Repeat {
    /**
     * Set `type` to `"spring"` to animate using spring physics for natural
     * movement. Type is set to `"spring"` by default.
     */
    type: 'spring';
    /**
     * Stiffness of the spring. Higher values will create more sudden movement.
     * Set to `100` by default.
     */
    stiffness?: number;
    /**
     * Strength of opposing force. If set to 0, spring will oscillate
     * indefinitely. Set to `10` by default.
     */
    damping?: number;
    /**
     * Mass of the moving object. Higher values will result in more lethargic
     * movement. Set to `1` by default.
     */
    mass?: number;
    /**
     * The duration of the animation, defined in seconds. Spring animations can be a maximum of 10 seconds.
     *
     * If `bounce` is set, this defaults to `0.8`.
     *
     * Note: `duration` and `bounce` will be overridden if `stiffness`, `damping` or `mass` are set.
     */
    duration?: number;
    /**
     * `bounce` determines the "bounciness" of a spring animation.
     *
     * `0` is no bounce, and `1` is extremely bouncy.
     *
     * If `duration` is set, this defaults to `0.25`.
     *
     * Note: `bounce` and `duration` will be overridden if `stiffness`, `damping` or `mass` are set.
     */
    bounce?: number;
    /**
     * End animation if absolute speed (in units per second) drops below this
     * value and delta is smaller than `restDelta`. Set to `0.01` by default.
     */
    restSpeed?: number;
    /**
     * End animation if distance is below this value and speed is below
     * `restSpeed`. When animation ends, spring gets “snapped” to. Set to
     * `0.01` by default.
     */
    restDelta?: number;
    /**
     * The value to animate from.
     * By default, this is the initial state of the animating value.
     */
    from?: number | string;
    to?: number | string | ValueTarget;
    /**
     * The initial velocity of the spring. By default this is the current velocity of the component.
     */
    velocity?: number;
    delay?: number;
}
/**
 * An animation that decelerates a value based on its initial velocity,
 * usually used to implement inertial scrolling.
 *
 * Optionally, `min` and `max` boundaries can be defined, and inertia
 * will snap to these with a spring animation.
 *
 * This animation will automatically precalculate a target value,
 * which can be modified with the `modifyTarget` property.
 *
 * This allows you to add snap-to-grid or similar functionality.
 *
 * Inertia is also the animation used for `dragTransition`, and can be configured via that prop.
 */
interface Inertia {
    /**
     * Set `type` to animate using the inertia animation. Set to `"tween"` by
     * default. This can be used for natural deceleration, like momentum scrolling.
     */
    type: 'inertia';
    /**
     * A function that receives the automatically-calculated target and returns a new one. Useful for snapping the target to a grid.
     */
    modifyTarget?: (v: number) => number;
    /**
     * If `min` or `max` is set, this affects the stiffness of the bounce
     * spring. Higher values will create more sudden movement. Set to `500` by
     * default.
     */
    bounceStiffness?: number;
    /**
     * If `min` or `max` is set, this affects the damping of the bounce spring.
     * If set to `0`, spring will oscillate indefinitely. Set to `10` by
     * default.
     */
    bounceDamping?: number;
    /**
     * A higher power value equals a further target. Set to `0.8` by default.
     */
    power?: number;
    /**
     * Adjusting the time constant will change the duration of the
     * deceleration, thereby affecting its feel. Set to `700` by default.
     */
    timeConstant?: number;
    /**
     * End the animation if the distance to the animation target is below this value, and the absolute speed is below `restSpeed`.
     * When the animation ends, the value gets snapped to the animation target. Set to `0.01` by default.
     * Generally the default values provide smooth animation endings, only in rare cases should you need to customize these.
     */
    restDelta?: number;
    /**
     * Minimum constraint. If set, the value will "bump" against this value (or immediately spring to it if the animation starts as less than this value).
     */
    min?: number;
    /**
     * Maximum constraint. If set, the value will "bump" against this value (or immediately snap to it, if the initial animation value exceeds this value).
     */
    max?: number;
    /**
     * The value to animate from. By default, this is the current state of the animating value.
     */
    from?: number | string;
    /**
     * The initial velocity of the animation.
     * By default this is the current velocity of the component.
     */
    velocity?: number;
    delay?: number;
}
/**
 * Keyframes tweens between multiple `values`.
 *
 * These tweens can be arranged using the `duration`, `easings`, and `times` properties.
 */
interface Keyframes {
    /**
     * Set `type` to `"keyframes"` to animate using the keyframes animation.
     * Set to `"tween"` by default. This can be used to animate between a series of values.
     */
    type: 'keyframes';
    /**
     * An array of values to animate between.
     */
    values: KeyframesTarget;
    /**
     * An array of numbers between 0 and 1, where `1` represents the `total` duration.
     *
     * Each value represents at which point during the animation each item in the animation target should be hit, so the array should be the same length as `values`.
     *
     * Defaults to an array of evenly-spread durations.
     */
    times?: number[];
    /**
     * An array of easing functions for each generated tween, or a single easing function applied to all tweens.
     *
     * This array should be one item less than `values`, as these easings apply to the transitions *between* the `values`.
     */
    ease?: Easing | Easing[];
    /**
     * Popmotion's easing prop to define individual easings. `ease` will be mapped to this prop in keyframes animations.
     */
    easings?: Easing | Easing[];
    elapsed?: number;
    /**
     * The total duration of the animation. Set to `0.3` by default.
     */
    duration?: number;
    repeatDelay?: number;
    from?: number | string;
    to?: number | string | ValueTarget;
    velocity?: number;
    delay?: number;
}
type PopmotionTransitionProps = Tween | Spring | Keyframes | Inertia;
type PermissiveTransitionDefinition = Record<string, any>;
type TransitionDefinition = Tween | Spring | Keyframes | Inertia | PermissiveTransitionDefinition;
type TransitionMap = Orchestration & Record<string, TransitionDefinition>;
/**
 * Transition props
 */
type Transition = (Orchestration & Repeat & TransitionDefinition) | (Orchestration & Repeat & TransitionMap);
type MakeCustomValueType<T> = {
    [K in keyof T]: T[K] | CustomValueType;
};
type Target = MakeCustomValueType<MotionProperties>;
type MakeKeyframes<T> = {
    [K in keyof T]: T[K] | T[K][] | [null, ...T[K][]];
};
type TargetWithKeyframes = MakeKeyframes<Target>;
/**
 * An object that specifies values to animate to. Each value may be set either as
 * a single value, or an array of values.
 */
type TargetAndTransition = TargetWithKeyframes & {
    transition?: Transition;
    transitionEnd?: Target;
};
type TargetResolver = (custom: any, current: Target, velocity: Target) => TargetAndTransition;
interface CustomValueType {
    mix: (from: any, to: any) => (p: number) => number | string;
    toValue: () => number | string;
}
type MotionValuesMap = {
    [key in keyof PermissiveMotionProperties]: MotionValue;
};
interface MotionTransitions {
    /**
     * Stop ongoing transitions for the current element.
     */
    stop: (keys?: string | string[]) => void;
    /**
     * Start a transition, push it to the `transitions` array.
     *
     * @param transition
     * @param values
     */
    push: (key: string, value: ResolvedValueTarget, target: MotionProperties, transition: Transition, onComplete?: () => void) => void;
    /**
     * @internal
     */
    motionValues: Ref<MotionValuesMap>;
}

/**
 * Permissive properties keys
 */
type PropertiesKeys = Record<string, string | number | undefined | any>;
/**
 * SVG Supported properties
 */
interface SVGPathProperties {
    pathLength?: number;
    pathOffset?: number;
    pathSpacing?: number;
}
/**
 * Transform properties
 */
type TransformValue = string | number;
interface TransformProperties {
    x?: TransformValue | TransformValue[];
    y?: TransformValue | TransformValue[];
    z?: TransformValue | TransformValue[];
    translateX?: TransformValue | TransformValue[];
    translateY?: TransformValue | TransformValue[];
    translateZ?: TransformValue | TransformValue[];
    rotate?: TransformValue | TransformValue[];
    rotateX?: TransformValue | TransformValue[];
    rotateY?: TransformValue | TransformValue[];
    rotateZ?: TransformValue | TransformValue[];
    scale?: TransformValue | TransformValue[];
    scaleX?: TransformValue | TransformValue[];
    scaleY?: TransformValue | TransformValue[];
    scaleZ?: TransformValue | TransformValue[];
    skew?: TransformValue | TransformValue[];
    skewX?: TransformValue | TransformValue[];
    skewY?: TransformValue | TransformValue[];
    originX?: TransformValue | TransformValue[];
    originY?: TransformValue | TransformValue[];
    originZ?: TransformValue | TransformValue[];
    perspective?: TransformValue | TransformValue[];
    transformPerspective?: TransformValue | TransformValue[];
}
/**
 * Relevant styling properties
 */
type StyleProperties = Omit<CSSProperties, 'transition' | 'rotate' | 'scale' | 'perspective' | 'transform' | 'transformBox' | 'transformOrigin' | 'transformStyle'>;
/**
 * Available properties for useMotion variants
 */
type MotionProperties = StyleProperties | TransformProperties | SVGPathProperties;
/**
 * Permissive properties for useSpring
 */
type PermissiveMotionProperties = MotionProperties & Record<string, ResolvedSingleTarget>;
/**
 * Variant
 */
type Variant = {
    transition?: Transition;
} & MotionProperties;
/**
 * Motion variants object
 */
type MotionVariants<T extends string> = {
    initial?: Variant;
    enter?: Variant;
    leave?: Variant;
    visible?: Variant;
    visibleOnce?: Variant;
    hovered?: Variant;
    tapped?: Variant;
    focused?: Variant;
} & {
    [key in T]?: Variant;
};

type PermissiveTarget = VueInstance | MotionTarget;
type MotionTarget = HTMLElement | SVGElement | null | undefined;
interface MotionInstance<T extends string, V extends MotionVariants<T>> extends MotionControls<T, V> {
    target: MaybeRef<PermissiveTarget>;
    variants: MaybeRef<V>;
    variant: Ref<keyof V>;
    state: Ref<Variant | undefined>;
    motionProperties: UnwrapRef<MotionProperties>;
}
interface UseMotionOptions {
    syncVariants?: boolean;
    lifeCycleHooks?: boolean;
    visibilityHooks?: boolean;
    eventListeners?: boolean;
}
interface MotionControls<T extends string, V extends MotionVariants<T>> {
    /**
     * Apply a variant declaration and execute the resolved transitions.
     *
     * @param variant
     * @returns Promise<void[]>
     */
    apply: (variant: Variant | keyof V) => Promise<void[]> | undefined;
    /**
     * Apply a variant declaration without transitions.
     *
     * @param variant
     */
    set: (variant: Variant | keyof V) => void;
    /**
     * Stop all the ongoing transitions for the current element.
     */
    stop: (keys?: string | string[]) => void;
    /**
     * Helper to be passed to <transition> leave event.
     *
     * @param done
     */
    leave: (done: () => void) => void;
    /**
     * Computed reference reactive to the animation state of motion controls.
     */
    isAnimating: any;
}
interface SpringControls {
    /**
     * Apply new values with transitions.
     *
     * @param variant
     */
    set: (properties: MotionProperties) => void;
    /**
     * Stop all transitions.
     *
     * @param variant
     */
    stop: (key?: string | string[]) => void;
    /**
     * Object containing all the current values of the spring.
     *
     * @param
     */
    values: MotionProperties;
}
type MotionInstanceBindings<T extends string, V extends MotionVariants<T>> = Record<string, MotionInstance<T, V>>;
declare module 'vue' {
    interface ComponentCustomProperties {
        $motions?: MotionInstanceBindings<any, any>;
    }
}
declare module '@vue/runtime-dom' {
    interface HTMLAttributes {
        variants?: MotionVariants<any>;
        initial?: Variant;
        enter?: Variant;
        leave?: Variant;
        visible?: Variant;
        visibleOnce?: Variant;
        hovered?: Variant;
        tapped?: Variant;
        focused?: Variant;
    }
}

interface MotionPluginOptions<T extends string> {
    directives?: Record<T, MotionVariants<T>>;
    excludePresets?: boolean;
}

interface StopAnimation {
    stop: () => void;
}
type Transformer<T> = (v: T) => T;
type Subscriber<T> = (v: T) => void;
type PassiveEffect<T> = (v: T, safeSetter: (v: T) => void) => void;
type StartAnimation = (complete?: () => void) => StopAnimation;

interface ModuleOptions<T extends string> {
    directives?: Record<T, MotionVariants<T>>;
    excludePresets?: boolean;
}

declare function directive<T extends string>(variants?: MotionVariants<T>, isPreset?: boolean): Directive<HTMLElement | SVGElement>;

declare const MotionPlugin: {
    install(app: App, options?: MotionPluginOptions<string>): void;
};

/**
 * Convert a string to a slug.
 *
 * Source: https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
 * Credits: @hagemann
 *
 * Edited to transform camel naming to slug with `-`.
 */
declare function slugify(str: string): string;

/**
 * Check whether an object is a Motion Instance or not.
 *
 * Can be useful while building packages based on @vueuse/motion.
 *
 * @param obj
 * @returns bool
 */
declare function isMotionInstance<T extends string, V extends MotionVariants<T>>(obj: any): obj is MotionInstance<T, V>;

declare const fade: MotionVariants<never>;
declare const fadeVisible: MotionVariants<never>;
declare const fadeVisibleOnce: MotionVariants<never>;

declare const pop: MotionVariants<never>;
declare const popVisible: MotionVariants<never>;
declare const popVisibleOnce: MotionVariants<never>;

declare const rollLeft: MotionVariants<never>;
declare const rollVisibleLeft: MotionVariants<never>;
declare const rollVisibleOnceLeft: MotionVariants<never>;
declare const rollRight: MotionVariants<never>;
declare const rollVisibleRight: MotionVariants<never>;
declare const rollVisibleOnceRight: MotionVariants<never>;
declare const rollTop: MotionVariants<never>;
declare const rollVisibleTop: MotionVariants<never>;
declare const rollVisibleOnceTop: MotionVariants<never>;
declare const rollBottom: MotionVariants<never>;
declare const rollVisibleBottom: MotionVariants<never>;
declare const rollVisibleOnceBottom: MotionVariants<never>;

declare const slideLeft: MotionVariants<never>;
declare const slideVisibleLeft: MotionVariants<never>;
declare const slideVisibleOnceLeft: MotionVariants<never>;
declare const slideRight: MotionVariants<never>;
declare const slideVisibleRight: MotionVariants<never>;
declare const slideVisibleOnceRight: MotionVariants<never>;
declare const slideTop: MotionVariants<never>;
declare const slideVisibleTop: MotionVariants<never>;
declare const slideVisibleOnceTop: MotionVariants<never>;
declare const slideBottom: MotionVariants<never>;
declare const slideVisibleBottom: MotionVariants<never>;
declare const slideVisibleOnceBottom: MotionVariants<never>;

declare const _default$1: vue.DefineComponent<vue.ExtractPropTypes<{
    is: {
        type: PropType<string | Component>;
        default: string;
    };
    preset: {
        type: PropType<string>;
        required: boolean;
    };
    instance: {
        type: PropType<MotionInstance<string, MotionVariants<string>>>;
        required: boolean;
    };
    variants: {
        type: PropType<MotionVariants<string>>;
        required: boolean;
    };
    initial: {
        type: PropType<Variant>;
        required: boolean;
    };
    enter: {
        type: PropType<Variant>;
        required: boolean;
    };
    leave: {
        type: PropType<Variant>;
        required: boolean;
    };
    visible: {
        type: PropType<Variant>;
        required: boolean;
    };
    visibleOnce: {
        type: PropType<Variant>;
        required: boolean;
    };
    hovered: {
        type: PropType<Variant>;
        required: boolean;
    };
    tapped: {
        type: PropType<Variant>;
        required: boolean;
    };
    focused: {
        type: PropType<Variant>;
        required: boolean;
    };
    delay: {
        type: PropType<number | string>;
        required: boolean;
    };
    duration: {
        type: PropType<number | string>;
        required: boolean;
    };
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    is: {
        type: PropType<string | Component>;
        default: string;
    };
    preset: {
        type: PropType<string>;
        required: boolean;
    };
    instance: {
        type: PropType<MotionInstance<string, MotionVariants<string>>>;
        required: boolean;
    };
    variants: {
        type: PropType<MotionVariants<string>>;
        required: boolean;
    };
    initial: {
        type: PropType<Variant>;
        required: boolean;
    };
    enter: {
        type: PropType<Variant>;
        required: boolean;
    };
    leave: {
        type: PropType<Variant>;
        required: boolean;
    };
    visible: {
        type: PropType<Variant>;
        required: boolean;
    };
    visibleOnce: {
        type: PropType<Variant>;
        required: boolean;
    };
    hovered: {
        type: PropType<Variant>;
        required: boolean;
    };
    tapped: {
        type: PropType<Variant>;
        required: boolean;
    };
    focused: {
        type: PropType<Variant>;
        required: boolean;
    };
    delay: {
        type: PropType<number | string>;
        required: boolean;
    };
    duration: {
        type: PropType<number | string>;
        required: boolean;
    };
}>> & Readonly<{}>, {
    is: string | Component;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

declare const _default: vue.DefineComponent<vue.ExtractPropTypes<{
    is: {
        type: PropType<string | Component>;
        required: false;
    };
    preset: {
        type: PropType<string>;
        required: boolean;
    };
    instance: {
        type: PropType<MotionInstance<string, MotionVariants<string>>>;
        required: boolean;
    };
    variants: {
        type: PropType<MotionVariants<string>>;
        required: boolean;
    };
    initial: {
        type: PropType<Variant>;
        required: boolean;
    };
    enter: {
        type: PropType<Variant>;
        required: boolean;
    };
    leave: {
        type: PropType<Variant>;
        required: boolean;
    };
    visible: {
        type: PropType<Variant>;
        required: boolean;
    };
    visibleOnce: {
        type: PropType<Variant>;
        required: boolean;
    };
    hovered: {
        type: PropType<Variant>;
        required: boolean;
    };
    tapped: {
        type: PropType<Variant>;
        required: boolean;
    };
    focused: {
        type: PropType<Variant>;
        required: boolean;
    };
    delay: {
        type: PropType<number | string>;
        required: boolean;
    };
    duration: {
        type: PropType<number | string>;
        required: boolean;
    };
}>, () => VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}> | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[], {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    is: {
        type: PropType<string | Component>;
        required: false;
    };
    preset: {
        type: PropType<string>;
        required: boolean;
    };
    instance: {
        type: PropType<MotionInstance<string, MotionVariants<string>>>;
        required: boolean;
    };
    variants: {
        type: PropType<MotionVariants<string>>;
        required: boolean;
    };
    initial: {
        type: PropType<Variant>;
        required: boolean;
    };
    enter: {
        type: PropType<Variant>;
        required: boolean;
    };
    leave: {
        type: PropType<Variant>;
        required: boolean;
    };
    visible: {
        type: PropType<Variant>;
        required: boolean;
    };
    visibleOnce: {
        type: PropType<Variant>;
        required: boolean;
    };
    hovered: {
        type: PropType<Variant>;
        required: boolean;
    };
    tapped: {
        type: PropType<Variant>;
        required: boolean;
    };
    focused: {
        type: PropType<Variant>;
        required: boolean;
    };
    delay: {
        type: PropType<number | string>;
        required: boolean;
    };
    duration: {
        type: PropType<number | string>;
        required: boolean;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

/**
 * Reactive style object implementing all native CSS properties.
 *
 * @param props
 */
declare function reactiveStyle(props?: StyleProperties): {
    state: Reactive<StyleProperties>;
    style: Ref<StyleProperties>;
};

/**
 * Reactive transform string implementing all native CSS transform properties.
 *
 * @param props
 * @param enableHardwareAcceleration
 */
declare function reactiveTransform(props?: TransformProperties, enableHardwareAcceleration?: boolean): {
    state: Reactive<TransformProperties>;
    transform: Ref<string>;
};

/**
 * A Composable giving access to a StyleProperties object, and binding the generated style object to a target.
 *
 * @param target
 */
declare function useElementStyle(target: MaybeRef<PermissiveTarget>, onInit?: (initData: Partial<StyleProperties>) => void): {
    style: Reactive<StyleProperties>;
};

/**
 * A Composable giving access to a TransformProperties object, and binding the generated transform string to a target.
 *
 * @param target
 */
declare function useElementTransform(target: MaybeRef<PermissiveTarget>, onInit?: (initData: Partial<TransformProperties>) => void): {
    transform: Reactive<TransformProperties>;
};

/**
 * A Vue Composable that put your components in motion.
 *
 * @docs https://motion.vueuse.js.org
 *
 * @param target
 * @param variants
 * @param options
 */
declare function useMotion<T extends string, V extends MotionVariants<T>>(target: MaybeRef<PermissiveTarget>, variants?: MaybeRef<V>, options?: UseMotionOptions): MotionInstance<T, V>;

/**
 * A Composable handling motion controls, pushing resolved variant to useMotionTransitions manager.
 */
declare function useMotionControls<T extends string, V extends MotionVariants<T>>(motionProperties: MotionProperties, variants?: MaybeRef<V>, { motionValues, push, stop }?: MotionTransitions): MotionControls<T, V>;

/**
 * A Composable executing resolved variants features from variants declarations.
 *
 * Supports:
 * - lifeCycleHooks: Bind the motion hooks to the component lifecycle hooks.
 */
declare function useMotionFeatures<T extends string, V extends MotionVariants<T>>(instance: MotionInstance<T, V>, options?: UseMotionOptions): void;

/**
 * A Composable giving access to both `transform` and `style`objects for a single element.
 *
 * @param target
 */
declare function useMotionProperties(target: MaybeRef<PermissiveTarget>, defaultValues?: Partial<MotionProperties>): {
    motionProperties: Reactive<MotionProperties>;
    style: Reactive<StyleProperties>;
    transform: Reactive<TransformProperties>;
};

declare function useMotions(): MotionInstanceBindings<string, MotionVariants<never>>;

/**
 * A Composable holding all the ongoing transitions in a local reference.
 */
declare function useMotionTransitions(): MotionTransitions;

/**
 * A Composable handling variants selection and features.
 */
declare function useMotionVariants<T extends string, V extends MotionVariants<T>>(variants?: MaybeRef<V>): {
    state: vue.ComputedRef<Variant | undefined>;
    variant: Ref<keyof V, keyof V>;
};

type UseSpringOptions = Partial<Spring> & {
    target?: MaybeRef$1<PermissiveTarget>;
};
declare function useSpring(values: Partial<PermissiveMotionProperties>, spring?: UseSpringOptions): SpringControls;

/**
 * Reactive prefers-reduced-motion.
 */
declare function useReducedMotion(options?: {
    window?: Window;
}): Ref<boolean>;

export { type CustomValueType, type Easing, type EasingFunction, type Inertia, type Keyframes, type KeyframesTarget, type MakeCustomValueType, type MakeKeyframes, type ModuleOptions, _default$1 as MotionComponent, type MotionControls, directive as MotionDirective, _default as MotionGroupComponent, type MotionInstance, type MotionInstanceBindings, MotionPlugin, type MotionPluginOptions, type MotionProperties, type MotionTarget, type MotionTransitions, type MotionValuesMap, type MotionVariants, type Orchestration, type PassiveEffect, type PermissiveMotionProperties, type PermissiveTarget, type PermissiveTransitionDefinition, type PopmotionTransitionProps, type PropertiesKeys, type Props, type Repeat, type ResolvedKeyframesTarget, type ResolvedSingleTarget, type ResolvedValueTarget, type SVGPathProperties, type SingleTarget, type Spring, type SpringControls, type StartAnimation, type StopAnimation, type StyleProperties, type Subscriber, type Target, type TargetAndTransition, type TargetResolver, type TargetWithKeyframes, type TransformProperties, type TransformValue, type Transformer, type Transition, type TransitionDefinition, type TransitionMap, type Tween, type UseMotionOptions, type ValueTarget, type Variant, fade, fadeVisible, fadeVisibleOnce, isMotionInstance, pop, popVisible, popVisibleOnce, reactiveStyle, reactiveTransform, rollBottom, rollLeft, rollRight, rollTop, rollVisibleBottom, rollVisibleLeft, rollVisibleOnceBottom, rollVisibleOnceLeft, rollVisibleOnceRight, rollVisibleOnceTop, rollVisibleRight, rollVisibleTop, slideBottom, slideLeft, slideRight, slideTop, slideVisibleBottom, slideVisibleLeft, slideVisibleOnceBottom, slideVisibleOnceLeft, slideVisibleOnceRight, slideVisibleOnceTop, slideVisibleRight, slideVisibleTop, slugify, useElementStyle, useElementTransform, useMotion, useMotionControls, useMotionFeatures, useMotionProperties, useMotionTransitions, useMotionVariants, useMotions, useReducedMotion, useSpring };
