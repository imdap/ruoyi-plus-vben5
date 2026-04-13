import { CSSProperties, Ref, TransitionGroupProps, TransitionProps } from 'vue';
declare const SelectPlacements: ["bottomLeft", "bottomRight", "topLeft", "topRight"];
export type SelectCommonPlacement = (typeof SelectPlacements)[number];
declare function getTransitionDirection(placement: SelectCommonPlacement | undefined): "slide-down" | "slide-up";
export declare function getTransitionProps(transitionName?: string, opt?: TransitionProps): TransitionProps;
export declare function getTransitionGroupProps(transitionName?: string, opt?: TransitionProps): TransitionGroupProps;
export declare type MotionEvent = (TransitionEvent | AnimationEvent) & {
    deadline?: boolean;
};
export declare type MotionEventHandler = (element: Element, done?: () => void) => CSSProperties;
export declare type MotionEndEventHandler = (element: Element, done?: () => void) => boolean | void;
export interface CSSMotionProps extends Partial<TransitionProps> {
    name?: string;
    css?: boolean;
}
declare function collapseMotion(name: string, style: Ref<CSSProperties>, className: Ref<string>): CSSMotionProps;
declare function getTransitionName(rootPrefixCls: string, motion: string, transitionName?: string): string;
export { collapseMotion, getTransitionDirection, getTransitionName };
