import { CssPropertyDefinition } from '../types';
/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
export declare const axes: string[];
export declare const transformDefinitions: Map<string, CssPropertyDefinition>;
export declare const isTransform: (name: string) => boolean;
export declare const transformAlias: {
    x: string;
    y: string;
    z: string;
};
export declare function compareTransformOrder([a]: [string, any], [b]: [string, any]): number;
export declare function buildTransformTemplate(transforms: [string, any][]): string;
export declare const transformResetValue: {
    translate: number[];
    rotate: number;
    scale: number;
    skew: number;
    x: number;
    y: number;
    z: number;
};
