import { DOMKeyframesDefinition, ResolvedValues, VariantLabels } from 'framer-motion';
import { MotionValue, TransformProperties, animate } from 'framer-motion/dom';
import { LayoutOptions } from '../features/layout/types';
import { DragProps } from '../features/gestures/drag/types';
import { PressProps } from '../features/gestures/press/types';
import { HoverProps } from '../features/gestures/hover/types';
import { InViewProps } from '../features/gestures/in-view/types';
import { LayoutGroupState } from '../components/context';
import { PanProps } from '../features/gestures/pan/types';
import { MotionConfigState } from '../components/motion-config/types';
import { $Transition } from './framer-motion';
import { FocusProps } from '../features/gestures/focus/types';
import { AnimationControls } from '../animation/types';
import { AsTag } from './common';
type AnimationPlaybackControls = ReturnType<typeof animate>;
export interface VariantType extends DOMKeyframesDefinition {
    transition?: Options['transition'];
    attrX?: DOMKeyframesDefinition['x'];
    attrY?: DOMKeyframesDefinition['y'];
    attrScale?: DOMKeyframesDefinition['scale'];
}
interface BoundingBox {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export interface DragOptions {
    constraints?: false | Partial<BoundingBox>;
    dragSnapToOrigin?: boolean;
}
type TransformPropertiesWithoutTransition = Omit<TransformProperties, 'transition'>;
export type MotionStyle = Partial<{
    [K in keyof Omit<VariantType & TransformPropertiesWithoutTransition, 'attrX' | 'attrY' | 'attrScale'>]: string | number | undefined | MotionValue;
}>;
export interface Options<T = any> extends LayoutOptions, PressProps, HoverProps, InViewProps, DragProps, PanProps, FocusProps {
    custom?: T;
    as?: AsTag;
    initial?: VariantLabels | VariantType | boolean;
    animate?: VariantLabels | VariantType | AnimationControls;
    exit?: VariantLabels | VariantType;
    variants?: {
        [k: string]: VariantType | ((custom: T) => VariantType);
    };
    inherit?: boolean;
    style?: MotionStyle;
    transformTemplate?: (transform: TransformProperties, generatedTransform: string) => string;
    transition?: $Transition & {
        layout?: $Transition;
    };
    layoutGroup?: LayoutGroupState;
    motionConfig?: MotionConfigState;
    onAnimationComplete?: (definition: Options['animate']) => void;
    onUpdate?: (latest: ResolvedValues) => void;
    onAnimationStart?: (definition: Options['animate']) => void;
}
export interface MotionStateContext {
    initial?: VariantLabels | boolean;
    animate?: VariantLabels;
    inView?: VariantLabels;
    hover?: VariantLabels;
    press?: VariantLabels;
    exit?: VariantLabels;
}
export type AnimationFactory = () => AnimationPlaybackControls | undefined;
export interface CssPropertyDefinition {
    syntax: `<${string}>`;
    initialValue: string | number;
    toDefaultUnit: (v: number) => string | number;
}
export type CssPropertyDefinitionMap = {
    [key: string]: CssPropertyDefinition;
};
export {};
