import { PortalProps } from '@v-c/portal';
import { DrawerPanelEvents } from './DrawerPanel';
import { DrawerPopupProps } from './DrawerPopup';
import { DrawerClassNames, DrawerStyles } from './inter';
export type Placement = 'left' | 'top' | 'right' | 'bottom';
export interface DrawerProps extends Omit<DrawerPopupProps, 'prefixCls' | 'inline'>, DrawerPanelEvents {
    prefixCls?: string;
    open?: boolean;
    onClose?: (e: MouseEvent | KeyboardEvent) => void;
    destroyOnHidden?: boolean;
    getContainer?: PortalProps['getContainer'];
    panelRef?: any;
    wrapperClassName?: string;
    classNames?: DrawerClassNames;
    styles?: DrawerStyles;
    focusTriggerAfterClose?: boolean;
}
declare const Drawer: import('vue').DefineComponent<DrawerProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<DrawerProps> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default Drawer;
