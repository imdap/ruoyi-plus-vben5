import { ActionType, AlignType, ArrowType, TriggerProps, TriggerRef } from '@v-c/trigger';
import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties } from 'vue';
export type SemanticName = 'root' | 'arrow' | 'container' | 'uniqueContainer';
export interface TooltipProps extends Pick<TriggerProps, 'onPopupAlign' | 'builtinPlacements' | 'fresh' | 'mouseLeaveDelay' | 'mouseEnterDelay' | 'prefixCls' | 'forceRender' | 'popupVisible'> {
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    /** Config popup motion */
    motion?: TriggerProps['popupMotion'];
    trigger?: ActionType | ActionType[];
    defaultVisible?: boolean;
    visible?: boolean;
    placement?: string;
    onVisibleChange?: (visible: boolean) => void;
    afterVisibleChange?: (visible: boolean) => void;
    overlay: (() => VueNode) | VueNode;
    getTooltipContainer?: (node: HTMLElement) => HTMLElement;
    destroyOnHidden?: boolean;
    align?: AlignType;
    showArrow?: boolean | ArrowType;
    arrowContent?: VueNode;
    id?: string;
    zIndex?: number;
    /**
     * Configures Tooltip to reuse the background for transition usage.
     * This is an experimental API and may not be stable.
     */
    unique?: TriggerProps['unique'];
}
export interface TooltipRef extends TriggerRef {
}
declare const Tooltip: import('vue').DefineSetupFnComponent<TooltipProps, {}, {}, TooltipProps & {}, import('vue').PublicProps>;
export default Tooltip;
