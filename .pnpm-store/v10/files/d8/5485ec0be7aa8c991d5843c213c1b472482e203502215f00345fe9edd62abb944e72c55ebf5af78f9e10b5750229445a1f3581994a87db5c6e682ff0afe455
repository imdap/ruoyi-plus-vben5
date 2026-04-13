import { Ref } from 'vue';
export interface PathRegisterContextProps {
    registerPath: (key: string, keyPath: string[]) => void;
    unregisterPath: (key: string, keyPath: string[]) => void;
}
export declare function useMeasure(): PathRegisterContextProps | null;
export declare function useMeasureProvider(context: PathRegisterContextProps): void;
export declare const MeasureProvider: import('vue').DefineSetupFnComponent<PathRegisterContextProps, {}, {}, PathRegisterContextProps & {}, import('vue').PublicProps>;
export declare function useFullPath(eventKey?: Ref<string | undefined>): import('vue').ComputedRef<(string | undefined)[]>;
export declare const PathTrackerProvider: import('vue').DefineSetupFnComponent<{
    value: string[];
}, {}, {}, {
    value: string[];
} & {}, import('vue').PublicProps>;
export interface PathUserContextProps {
    isSubPathKey: (pathKeys: string[], eventKey: string) => boolean;
}
export declare function usePathUserContextProvider(context: PathUserContextProps): void;
export declare function usePathUserContext(): PathUserContextProps;
export declare const PathUserProvider: import('vue').DefineSetupFnComponent<PathUserContextProps, {}, {}, PathUserContextProps & {}, import('vue').PublicProps>;
export declare const PathTrackerContext: {
    Provider: import('vue').DefineSetupFnComponent<{
        value: string[];
    }, {}, {}, {
        value: string[];
    } & {}, import('vue').PublicProps>;
};
export declare const PathRegisterContext: {
    Provider: import('vue').DefineSetupFnComponent<PathRegisterContextProps, {}, {}, PathRegisterContextProps & {}, import('vue').PublicProps>;
};
export declare const PathUserContext: {
    Provider: import('vue').DefineSetupFnComponent<PathUserContextProps, {}, {}, PathUserContextProps & {}, import('vue').PublicProps>;
};
