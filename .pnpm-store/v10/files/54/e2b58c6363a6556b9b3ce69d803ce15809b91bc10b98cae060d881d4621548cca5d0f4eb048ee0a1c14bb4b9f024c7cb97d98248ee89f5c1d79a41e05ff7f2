import { Ref } from 'vue';
export declare function getFocusNodeList(node: HTMLElement, includePositive?: boolean): HTMLElement[];
export interface InputFocusOptions extends FocusOptions {
    cursor?: 'start' | 'end' | 'all';
}
export declare function triggerFocus(element?: HTMLInputElement | HTMLTextAreaElement, option?: InputFocusOptions): void;
/**
 * Lock focus in the element.
 * It will force back to the first focusable element when focus leaves the element.
 * @param id - A stable ID for this lock instance
 */
export declare function lockFocus(element: HTMLElement, id: string): VoidFunction;
/**
 * Lock focus within an element.
 * When locked, focus will be restricted to focusable elements within the specified element.
 * If multiple elements are locked, only the last locked element will be effective.
 * @returns A function to mark an element as ignored, which will temporarily allow focus on that element even if it's outside the locked area.
 */
export declare function useLockFocus(lock: Ref<boolean>, getElement: () => HTMLElement | null): [
    ignoreElement: (ele: HTMLElement) => void,
    registerAllowedElement: (ele: HTMLElement) => VoidFunction
];
