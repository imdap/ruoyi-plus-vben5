import { LayoutGroupState } from './context';
/**
 * Props for configuring layout group behavior
 */
export interface LayoutGroupProps {
    /** Optional ID for the layout group */
    id?: string;
    /**
     * Controls inheritance of parent group properties:
     * - true: Inherit both id and group
     * - 'id': Only inherit id
     * - 'group': Only inherit group
     */
    inherit?: boolean | 'id' | 'group';
}
/**
 * Hook to create and manage a layout group
 * Handles group inheritance, force updates, and context management
 */
export declare function useLayoutGroupProvider(props: LayoutGroupProps): LayoutGroupState;
export declare function useLayoutGroup(): {
    forceRender: VoidFunction;
};
