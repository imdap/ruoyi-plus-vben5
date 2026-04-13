import { VueNode } from '@v-c/util/dist/type';
import { CSSMotionProps } from '@v-c/util/dist/utils/transition';
import { CSSProperties } from 'vue';
import { BuiltinPlacements, Components, ItemType, MenuClickEventHandler, MenuMode, PopupRender, RenderIconType, SelectEventHandler, TriggerSubMenuAction } from './interface.ts';
import { SemanticName } from './SubMenu';
export interface MenuProps {
    prefixCls?: string;
    rootClass?: string;
    classes?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    items?: ItemType[];
    disabled?: boolean;
    /** @private Disable auto overflow. Pls note the prop name may refactor since we do not final decided. */
    disabledOverflow?: boolean;
    /** direction of menu */
    direction?: 'ltr' | 'rtl';
    mode?: MenuMode;
    inlineCollapsed?: boolean;
    defaultOpenKeys?: string[];
    openKeys?: string[];
    activeKey?: string;
    defaultActiveFirst?: boolean;
    selectable?: boolean;
    multiple?: boolean;
    defaultSelectedKeys?: string[];
    selectedKeys?: string[];
    onSelect?: SelectEventHandler;
    onDeselect?: SelectEventHandler;
    inlineIndent?: number;
    /** Menu motion define. Use `defaultMotions` if you need config motion of each mode */
    motion?: CSSMotionProps;
    /** Default menu motion of each mode */
    defaultMotions?: Partial<{
        [key in MenuMode | 'other']: CSSMotionProps;
    }>;
    subMenuOpenDelay?: number;
    subMenuCloseDelay?: number;
    forceSubMenuRender?: boolean;
    triggerSubMenuAction?: TriggerSubMenuAction;
    builtinPlacements?: BuiltinPlacements;
    itemIcon?: RenderIconType;
    expandIcon?: RenderIconType;
    overflowedIndicator?: VueNode;
    /** @private Internal usage. Do not use in your production. */
    overflowedIndicatorPopupClassName?: string;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    onClick?: MenuClickEventHandler;
    onOpenChange?: (openKeys: string[]) => void;
    /***
       * @private Only used for `pro-layout`. Do not use in your prod directly
       * and we do not promise any compatibility for this.
       */
    _internalRenderMenuItem?: (originNode: any, menuItemProps: any, stateProps: {
        selected: boolean;
    }) => any;
    /***
       * @private Only used for `pro-layout`. Do not use in your prod directly
       * and we do not promise any compatibility for this.
       */
    _internalRenderSubMenuItem?: (originNode: any, subMenuItemProps: any, stateProps: {
        selected: boolean;
        open: boolean;
        active: boolean;
        disabled: boolean;
    }) => any;
    /**
     * @private NEVER! EVER! USE IN PRODUCTION!!!
     * This is a hack API for `antd` to fix `findDOMNode` issue.
     * Not use it! Not accept any PR try to make it as normal API.
     * By zombieJ
     */
    _internalComponents?: Components;
    popupRender?: PopupRender;
    id?: string;
    labelRender?: (item: ItemType) => any;
    extraRender?: (item: ItemType) => any;
    iconRender?: (item: ItemType) => any;
}
declare const Menu: import('vue').DefineSetupFnComponent<MenuProps, {}, {}, MenuProps & {}, import('vue').PublicProps>;
export default Menu;
