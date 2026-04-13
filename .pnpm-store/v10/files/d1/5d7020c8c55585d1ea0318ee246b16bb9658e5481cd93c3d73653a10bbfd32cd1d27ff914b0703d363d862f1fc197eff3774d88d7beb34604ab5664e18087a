import { CSSMotionProps } from '@v-c/util/dist/utils/transition';
import { Ref } from 'vue';
import { BuiltinPlacements, MenuClickEventHandler, MenuMode, PopupRender, RenderIconType, TriggerSubMenuAction } from '../interface.ts';
import { SubMenuProps } from '../SubMenu';
export interface MenuContextProps {
    prefixCls: string;
    classes?: SubMenuProps['classes'];
    styles?: SubMenuProps['styles'];
    rootClass?: string;
    openKeys: string[];
    rtl?: boolean;
    mode: MenuMode;
    disabled?: boolean;
    overflowDisabled?: boolean;
    activeKey: string;
    onActive: (key: string) => void;
    onInactive: (key: string) => void;
    selectedKeys: string[];
    inlineIndent: number;
    motion?: CSSMotionProps;
    defaultMotions?: Partial<{
        [key in MenuMode | 'other']: CSSMotionProps;
    }>;
    subMenuOpenDelay: number;
    subMenuCloseDelay: number;
    forceSubMenuRender?: boolean;
    builtinPlacements?: BuiltinPlacements;
    triggerSubMenuAction?: TriggerSubMenuAction;
    popupRender?: PopupRender;
    itemIcon?: RenderIconType;
    expandIcon?: RenderIconType;
    onItemClick: MenuClickEventHandler;
    onOpenChange: (key: string, open: boolean) => void;
    getPopupContainer: (node: HTMLElement) => HTMLElement;
}
export interface InheritableContextProps extends Partial<MenuContextProps> {
    locked?: boolean;
}
export declare function useMenuContext(): Ref<MenuContextProps, MenuContextProps> | null;
export declare function useMenuContextProvider(context: Ref<MenuContextProps>): void;
declare const InheritableContextProvider: import('vue').DefineSetupFnComponent<InheritableContextProps, {}, {}, InheritableContextProps & {}, import('vue').PublicProps>;
export default InheritableContextProvider;
