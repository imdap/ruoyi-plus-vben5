import { AlignType, BuildInPlacements } from '@v-c/trigger';
import { CSSProperties } from 'vue';
import { Placement, RenderDOMFunc } from './interface.ts';
export interface SelectTriggerProps {
    prefixCls: string;
    disabled: boolean;
    visible: boolean;
    popupElement: any;
    animation?: string;
    transitionName?: string;
    placement?: Placement;
    builtinPlacements?: BuildInPlacements;
    popupStyle?: CSSProperties;
    popupClassName?: string;
    direction?: string;
    popupMatchSelectWidth?: boolean | number;
    popupRender?: (menu: any) => any;
    getPopupContainer?: RenderDOMFunc;
    popupAlign?: AlignType;
    empty: boolean;
    onPopupVisibleChange?: ((visible: boolean) => void) | null;
    onPopupMouseEnter: () => void;
    onPopupMouseDown: (event: MouseEvent) => void;
    onPopupBlur?: (event: FocusEvent) => void;
}
declare const SelectTrigger: import('vue').DefineSetupFnComponent<SelectTriggerProps, {}, {}, SelectTriggerProps & {}, import('vue').PublicProps>;
export default SelectTrigger;
