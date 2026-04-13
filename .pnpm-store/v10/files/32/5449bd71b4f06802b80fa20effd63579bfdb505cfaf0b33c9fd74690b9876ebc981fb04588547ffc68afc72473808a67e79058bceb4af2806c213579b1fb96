import { Ref } from 'vue';
import { MenuMode } from '../interface';
/**
 * Get focusable elements from the element set under provided container
 */
export declare function getFocusableElements(container: HTMLElement | null, elements: Set<HTMLElement>): HTMLElement[];
export declare function refreshElements(keys: string[], id: string): {
    elements: Set<HTMLElement>;
    key2element: Map<string, HTMLElement>;
    element2key: Map<HTMLElement, string>;
};
export default function useAccessibility(mode: Ref<MenuMode>, activeKey: Ref<string>, isRtl: Ref<boolean>, id: string, containerRef: Ref<HTMLUListElement | null>, getKeys: () => string[], getKeyPath: (key: string, includeOverflow?: boolean) => string[], triggerActiveKey: (key: string) => void, triggerAccessibilityOpen: (key: string, open?: boolean) => void, originOnKeyDown?: (e: KeyboardEvent) => void): (e: KeyboardEvent) => void;
