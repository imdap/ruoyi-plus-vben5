import { PortalProps } from '@v-c/portal';
import { CSSMotionProps } from '@v-c/util/dist/utils/transition';
import { CSSProperties, InjectionKey, Ref } from 'vue';
import { TriggerProps } from './index';
import { AlignType, ArrowTypeOuter, BuildInPlacements } from './interface';
export interface TriggerContextProps {
    registerSubPopup: (id: string, node: HTMLElement | null) => void;
}
export declare function useTriggerContext(): Ref<TriggerContextProps, TriggerContextProps> | undefined;
export declare const TriggerContextProvider: import('vue').DefineSetupFnComponent<{
    registerSubPopup: any;
}, {}, {}, {
    registerSubPopup: any;
} & {}, import('vue').PublicProps>;
export interface UniqueShowOptions {
    id: string;
    popup: TriggerProps['popup'];
    target: HTMLElement;
    delay: number;
    prefixCls?: string;
    popupClassName?: string;
    uniqueContainerClassName?: string;
    uniqueContainerStyle?: CSSProperties;
    popupStyle?: CSSProperties;
    popupPlacement?: string;
    builtinPlacements?: BuildInPlacements;
    popupAlign?: AlignType;
    zIndex?: number;
    mask?: boolean;
    maskClosable?: boolean;
    popupMotion?: CSSMotionProps;
    maskMotion?: CSSMotionProps;
    arrow?: ArrowTypeOuter;
    getPopupContainer?: TriggerProps['getPopupContainer'];
    getPopupClassNameFromAlign?: (align: AlignType) => string;
    onEsc?: PortalProps['onEsc'];
}
export interface UniqueContextProps {
    show: (options: UniqueShowOptions, isOpen: () => boolean) => void;
    hide: (delay: number) => void;
}
export declare const UniqueContextKey: InjectionKey<UniqueContextProps>;
export declare function useUniqueContext(): UniqueContextProps | undefined;
export declare const UniqueContextProvider: import('vue').DefineSetupFnComponent<{
    hide: any;
    show: any;
}, {}, {}, {
    hide: any;
    show: any;
} & {}, import('vue').PublicProps>;
