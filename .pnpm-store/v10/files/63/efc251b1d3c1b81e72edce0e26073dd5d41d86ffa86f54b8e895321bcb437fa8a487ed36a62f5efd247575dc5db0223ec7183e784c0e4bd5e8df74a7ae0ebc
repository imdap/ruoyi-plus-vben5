import { ActionType, AlignType, AnimationType, BuildInPlacements, TriggerProps } from '../../trigger/src';
import { VueNode } from '../../util/src/type';
import { CSSProperties } from 'vue';
import { default as Placements } from './placements';
export interface DropdownProps extends Pick<TriggerProps, 'getPopupContainer' | 'mouseEnterDelay' | 'mouseLeaveDelay' | 'onPopupAlign' | 'builtinPlacements' | 'autoDestroy'> {
    minOverlayWidthMatchTrigger?: boolean;
    arrow?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    onOverlayClick?: (e: Event) => void;
    prefixCls?: string;
    transitionName?: string;
    overlayClassName?: string;
    openClassName?: string;
    animation?: AnimationType;
    align?: AlignType;
    overlayStyle?: CSSProperties;
    placement?: keyof typeof Placements;
    placements?: BuildInPlacements;
    overlay?: (() => VueNode) | VueNode;
    trigger?: ActionType | ActionType[];
    alignPoint?: boolean;
    showAction?: ActionType[];
    hideAction?: ActionType[];
    visible?: boolean;
    autoFocus?: boolean;
}
declare const Dropdown: import('vue').DefineSetupFnComponent<DropdownProps, {}, {}, DropdownProps & {}, import('vue').PublicProps>;
export default Dropdown;
