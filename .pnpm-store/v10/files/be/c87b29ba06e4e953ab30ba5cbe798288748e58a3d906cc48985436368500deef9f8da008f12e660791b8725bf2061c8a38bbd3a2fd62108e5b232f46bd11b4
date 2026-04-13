import { CSSMotionProps } from '@v-c/util/dist/utils/transition';
import { CSSProperties } from 'vue';
import { DrawerPanelEvents } from './DrawerPanel';
import { DrawerClassNames, DrawerStyles } from './inter';
export type Placement = 'left' | 'right' | 'top' | 'bottom';
export interface PushConfig {
    distance?: number | string;
}
export interface DrawerPopupProps extends DrawerPanelEvents {
    prefixCls: string;
    open?: boolean;
    inline?: boolean;
    push?: boolean | PushConfig;
    forceRender?: boolean;
    autoFocus?: boolean;
    focusTrap?: boolean;
    keyboard?: boolean;
    rootClassName?: string;
    rootStyle?: CSSProperties;
    zIndex?: number;
    placement?: Placement;
    id?: string;
    width?: number | string;
    height?: number | string;
    /** Size of the drawer (width for left/right placement, height for top/bottom placement) */
    size?: number | string;
    /** Maximum size of the drawer */
    maxSize?: number;
    mask?: boolean;
    maskClosable?: boolean;
    maskClassName?: string;
    maskStyle?: CSSProperties;
    motion?: CSSMotionProps | ((placement: Placement | undefined) => CSSMotionProps);
    maskMotion?: CSSMotionProps;
    afterOpenChange?: (open: boolean) => void;
    onClose?: (e: MouseEvent | KeyboardEvent) => void;
    classNames?: DrawerClassNames;
    styles?: DrawerStyles;
    drawerRender?: (node: any) => any;
    /** Default size for uncontrolled resizable drawer */
    defaultSize?: number | string;
    resizable?: boolean | {
        onResize?: (size: number) => void;
        onResizeStart?: () => void;
        onResizeEnd?: () => void;
    };
}
declare const DrawerPopup: import('vue').DefineSetupFnComponent<DrawerPopupProps, {}, {}, DrawerPopupProps & {}, import('vue').PublicProps>;
export default DrawerPopup;
