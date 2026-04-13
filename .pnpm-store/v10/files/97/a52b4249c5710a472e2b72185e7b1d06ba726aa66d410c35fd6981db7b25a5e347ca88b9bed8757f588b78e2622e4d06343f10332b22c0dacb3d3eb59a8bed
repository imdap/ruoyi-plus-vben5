import { Ref, ShallowRef } from 'vue';
export interface DrawerContextProps {
    pushDistance?: number | string;
    push: VoidFunction;
    pull: VoidFunction;
}
export interface RefContextProps {
    panel: ShallowRef<HTMLDivElement | undefined>;
    setPanel: (panel: HTMLDivElement) => void;
}
export declare function useRefProvide(customSet?: (panel: HTMLDivElement) => void): {
    panel: ShallowRef<HTMLDivElement | undefined, HTMLDivElement | undefined>;
    setPanel: (el: HTMLDivElement) => void;
};
export declare function useRefContext(): RefContextProps;
export declare function useDrawerContext(): Ref<DrawerContextProps | undefined, DrawerContextProps | undefined>;
export declare function useDrawerProvide(props: Ref<DrawerContextProps>): Ref<DrawerContextProps, DrawerContextProps>;
