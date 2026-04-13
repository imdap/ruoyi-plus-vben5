import { VueNode } from '@v-c/util/dist/type';
import { CSSMotionProps } from '@v-c/util/dist/utils/transition';
import { CSSProperties } from 'vue';
import { ActionType, AlignType, AnimationType, ArrowTypeOuter, BuildInPlacements } from './interface';
import { MobileConfig } from './Popup';
export type { ActionType, AlignType, AnimationType, ArrowTypeOuter as ArrowType, BuildInPlacements, };
export interface TriggerRef {
    nativeElement: HTMLElement;
    popupElement: HTMLDivElement;
    forceAlign: VoidFunction;
}
export interface TriggerProps {
    action?: ActionType | ActionType[];
    showAction?: ActionType[];
    hideAction?: ActionType[];
    prefixCls?: string;
    zIndex?: number;
    onPopupAlign?: (element: HTMLElement, align: AlignType) => void;
    stretch?: string;
    popupVisible?: boolean;
    defaultPopupVisible?: boolean;
    onOpenChange?: (visible: boolean) => void;
    afterOpenChange?: (visible: boolean) => void;
    /** @deprecated Use `onOpenChange` instead */
    onPopupVisibleChange?: (visible: boolean) => void;
    /** @deprecated Use `afterOpenChange` instead */
    afterPopupVisibleChange?: (visible: boolean) => void;
    getPopupContainer?: ((node: HTMLElement) => HTMLElement) | false;
    forceRender?: boolean;
    autoDestroy?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    /** Set popup motion. You can ref `rc-motion` for more info. */
    popupMotion?: CSSMotionProps;
    /** Set mask motion. You can ref `rc-motion` for more info. */
    maskMotion?: CSSMotionProps;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    focusDelay?: number;
    blurDelay?: number;
    popup: VueNode | (() => VueNode);
    popupPlacement?: string;
    builtinPlacements?: BuildInPlacements;
    popupAlign?: AlignType;
    popupClassName?: string;
    /** Pass to `UniqueProvider` UniqueContainer */
    uniqueContainerClassName?: string;
    /** Pass to `UniqueProvider` UniqueContainer */
    uniqueContainerStyle?: CSSProperties;
    popupStyle?: CSSProperties;
    getPopupClassNameFromAlign?: (align: AlignType) => string;
    onPopupClick?: (e: MouseEvent) => void;
    alignPoint?: boolean;
    /**
     * Trigger will memo content when close.
     * This may affect the case if want to keep content update.
     * Set `fresh` to `false` will always keep update.
     */
    fresh?: boolean;
    /**
     * Config with UniqueProvider to shared the floating popup.
     */
    unique?: boolean;
    arrow?: boolean | ArrowTypeOuter;
    /**
     * @private
     * Will replace the config of root props.
     * This will directly trade as mobile view which will not check what real is.
     * This is internal usage currently, do not use in your prod.
     */
    mobile?: MobileConfig;
}
export declare function generateTrigger(PortalComponent?: any): import('vue').DefineSetupFnComponent<TriggerProps, {}, {}, TriggerProps & {}, import('vue').PublicProps>;
declare const Trigger: import('vue').DefineSetupFnComponent<TriggerProps, {}, {}, TriggerProps & {}, import('vue').PublicProps>;
export { Trigger };
export default Trigger;
export { default as UniqueProvider } from './UniqueProvider';
export type { UniqueProviderProps } from './UniqueProvider';
