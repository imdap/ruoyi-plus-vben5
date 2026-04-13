import { Component, ComponentPublicInstance, DefineComponent, IntrinsicElementAttributes } from 'vue';
import { MotionProps } from './types';
import { Feature } from '../../features';
import { ComponentProps, MotionHTMLAttributes } from '../../types';
type MotionCompProps = {
    create: <T extends DefineComponent>(T: any, options?: MotionCreateOptions) => DefineComponent<Omit<MotionProps<any, unknown>, 'as' | 'asChild'> & ComponentProps<T>>;
};
export interface MotionCreateOptions {
    forwardMotionProps?: boolean;
    features?: Array<typeof Feature>;
}
export declare function checkMotionIsHidden(instance: ComponentPublicInstance): boolean;
/**
 * Creates a motion component from a base component or HTML tag
 * Caches string-based components for reuse
 */
export declare function createMotionComponent(component: string | DefineComponent, options?: MotionCreateOptions): Component;
type MotionNameSpace = {
    [K in keyof IntrinsicElementAttributes]: DefineComponent<Omit<MotionProps<K, unknown>, 'as' | 'asChild' | 'motionConfig' | 'layoutGroup'> & MotionHTMLAttributes<K>, 'create'>;
} & MotionCompProps;
export declare function createMotionComponentWithFeatures(features?: Array<typeof Feature>): MotionNameSpace;
export {};
