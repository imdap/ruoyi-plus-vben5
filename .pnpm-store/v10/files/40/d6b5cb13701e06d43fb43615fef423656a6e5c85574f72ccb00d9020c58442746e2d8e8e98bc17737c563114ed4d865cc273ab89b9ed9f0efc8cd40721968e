import { GetComponent, TableSticky } from '../interface';
export interface StaticContextProps {
    scrollY: number;
    listItemHeight?: number;
    sticky?: boolean | TableSticky;
    getComponent: GetComponent;
    onScroll?: (event: Event) => void;
}
export interface GridContextProps {
    columnsOffset: number[];
}
export declare function useProvideStaticContext(value: StaticContextProps): void;
export declare function useInjectStaticContext(): StaticContextProps;
export declare function useProvideGridContext(value: GridContextProps): void;
export declare function useInjectGridContext(): GridContextProps;
