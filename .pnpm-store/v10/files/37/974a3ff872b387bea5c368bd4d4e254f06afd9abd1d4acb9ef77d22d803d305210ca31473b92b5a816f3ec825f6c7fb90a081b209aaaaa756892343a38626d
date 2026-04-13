import { Ref, VNode, VNodeNormalizedChildren } from 'vue';
export declare function isEmptyElement(c: any): boolean;
export declare function filterEmpty(children?: any): any[];
export declare const skipFlattenKey: unique symbol;
declare function flattenChildren(children?: VNode | VNodeNormalizedChildren, isFilterEmpty?: boolean): any[];
export { flattenChildren };
export declare function toPropsRefs<T extends Record<string, any>, K extends keyof T>(obj: T, ...args: K[]): { [key in K]-?: Ref<T[key]>; };
export declare function removeUndefined<T extends Record<string, any>>(obj: T): Partial<T>;
interface RemoveBaseAttributesOptions {
    class?: boolean;
    style?: boolean;
    omits?: string[];
}
export declare function pureAttrs(attrs: Record<string, any>, options?: RemoveBaseAttributesOptions): Omit<{
    [x: string]: any;
}, string>;
export declare function getAttrStyleAndClass(attrs: Record<string, any>, options?: RemoveBaseAttributesOptions): {
    className: any;
    style: any;
    restAttrs: Record<string, any>;
};
export declare function getStylePxValue(value: number | string | undefined | null): string;
