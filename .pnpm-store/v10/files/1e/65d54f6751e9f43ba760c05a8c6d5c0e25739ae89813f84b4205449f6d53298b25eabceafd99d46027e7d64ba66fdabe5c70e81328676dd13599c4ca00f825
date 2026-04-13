import { Box } from 'framer-motion';
import { Ref } from 'vue';
export interface ReorderContextProps<T> {
    axis?: Ref<'x' | 'y'>;
    registerItem?: (item: T, layout: Box) => void;
    updateOrder?: (item: T, offset: number, velocity: number) => void;
    groupRef?: Ref<HTMLElement | null>;
}
export declare const useReorderContext: <T extends ReorderContextProps<any> = ReorderContextProps<any>>(fallback?: T) => T extends null ? ReorderContextProps<any> : ReorderContextProps<any>, reorderContextProvider: (contextValue: ReorderContextProps<any>) => ReorderContextProps<any>;
