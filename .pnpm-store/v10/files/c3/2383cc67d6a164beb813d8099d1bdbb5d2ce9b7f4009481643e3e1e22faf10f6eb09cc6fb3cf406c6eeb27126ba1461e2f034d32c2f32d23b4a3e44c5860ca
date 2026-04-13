import { DropdownProps } from '@v-c/dropdown';
import { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from '@v-c/util/dist/EventInterface';
import { VueNode } from '@v-c/util/dist/type';
import { CSSMotionProps } from '@v-c/util/dist/utils/transition';
import { CSSProperties } from 'vue';
export type SizeInfo = [width: number, height: number];
export interface EditableConfig {
    onEdit: (type: 'add' | 'remove', info: {
        key?: string;
        event: MouseEvent | KeyboardEvent;
    }) => void;
    showAdd?: boolean;
    removeIcon?: VueNode;
    addIcon?: VueNode;
}
export interface AnimatedConfig {
    inkBar?: boolean;
    tabPane?: boolean;
    tabPaneMotion?: CSSMotionProps;
}
export interface TabsLocale {
    dropdownAriaLabel?: string;
    removeAriaLabel?: string;
    addAriaLabel?: string;
}
export interface AddButtonProps {
    prefixCls: string;
    editable?: EditableConfig;
    locale?: TabsLocale;
    style?: CSSProperties;
}
export type OnTabScroll = (info: {
    direction: 'left' | 'right' | 'top' | 'bottom';
}) => void;
export type TabBarExtraPosition = 'left' | 'right';
export type TabBarExtraMap = Partial<Record<TabBarExtraPosition, VueNode>>;
export type TabBarExtraContent = VueNode | TabBarExtraMap;
export interface ExtraContentProps {
    position: TabBarExtraPosition;
    prefixCls: string;
    extra?: TabBarExtraContent;
}
export interface TabPaneProps {
    tab?: VueNode;
    className?: unknown;
    style?: CSSProperties;
    disabled?: boolean;
    children?: VueNode;
    forceRender?: boolean;
    closable?: boolean;
    closeIcon?: VueNode;
    icon?: VueNode;
    prefixCls?: string;
    tabKey?: string;
    id?: string | null;
    animated?: boolean;
    active?: boolean;
    destroyOnHidden?: boolean;
}
export interface Tab extends Omit<TabPaneProps, 'tab'> {
    key: string;
    label: VueNode;
}
export type moreIcon = VueNode;
export type MoreProps = {
    icon?: moreIcon;
} & Omit<DropdownProps, 'children'>;
export interface OperationNodeProps {
    prefixCls: string;
    className?: unknown;
    style?: CSSProperties;
    id: string | null;
    tabs: Tab[];
    rtl: boolean;
    tabBarGutter?: number;
    activeKey: string;
    mobile: boolean;
    more?: MoreProps;
    editable?: EditableConfig;
    locale?: TabsLocale;
    removeAriaLabel?: string;
    onTabClick: (key: string, e: MouseEvent | KeyboardEvent) => void;
    tabMoving?: boolean;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    popupClassName?: string;
    popupStyle?: CSSProperties;
}
export interface TabNodeProps {
    id: string | null;
    prefixCls: string;
    tab: Tab;
    active: boolean;
    focus: boolean;
    closable?: boolean;
    editable?: EditableConfig;
    onClick?: (e: MouseEvent | KeyboardEvent) => void;
    onResize?: (width: number, height: number, left: number, top: number) => void;
    renderWrapper?: (node: VueNode) => VueNode;
    removeAriaLabel?: string;
    tabCount: number;
    currentPosition: number;
    removeIcon?: VueNode;
    onKeyDown: KeyboardEventHandler;
    onMouseDown: MouseEventHandler;
    onMouseUp: MouseEventHandler;
    onFocus: FocusEventHandler;
    onBlur: FocusEventHandler;
    style?: CSSProperties;
    className?: string;
}
export type TabPosition = 'left' | 'right' | 'top' | 'bottom';
export type GetIndicatorSize = number | ((origin: number) => number);
export type SemanticName = string;
export type RenderTabBar = (props: Record<string, any>, TabNavListComponent: any) => VueNode;
export interface IndicatorConfig {
    size?: GetIndicatorSize;
    align?: 'start' | 'center' | 'end';
}
export interface TabNavListProps {
    id: string | null;
    tabPosition: TabPosition;
    activeKey: string;
    rtl: boolean;
    animated?: AnimatedConfig;
    extra?: TabBarExtraContent;
    editable?: EditableConfig;
    more?: MoreProps;
    mobile: boolean;
    tabBarGutter?: number;
    renderTabBar?: RenderTabBar;
    className?: unknown;
    style?: CSSProperties;
    locale?: TabsLocale;
    onTabClick: (activeKey: string, e: MouseEvent | KeyboardEvent) => void;
    onTabScroll?: OnTabScroll;
    children?: (node: VueNode) => VueNode;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    popupClassName?: string;
    indicator?: IndicatorConfig;
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
}
export type TabNavListWrapperProps = Omit<TabNavListProps, 'children' | 'className'> & TabNavListProps;
export interface TabPaneProps {
    tab?: VueNode;
    className?: unknown;
    style?: CSSProperties;
    disabled?: boolean;
    children?: VueNode;
    forceRender?: boolean;
    closable?: boolean;
    closeIcon?: VueNode;
    icon?: VueNode;
    prefixCls?: string;
    tabKey?: string;
    id?: string | null;
    animated?: boolean;
    active?: boolean;
    destroyOnHidden?: boolean;
}
export interface TabsProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    id?: string | null;
    items?: Tab[];
    activeKey?: string;
    defaultActiveKey?: string;
    direction?: 'ltr' | 'rtl';
    animated?: boolean | AnimatedConfig;
    renderTabBar?: RenderTabBar;
    tabBarExtraContent?: TabBarExtraContent;
    tabBarGutter?: number;
    tabBarStyle?: CSSProperties;
    tabPosition?: TabPosition;
    destroyOnHidden?: boolean;
    onChange?: (activeKey: string) => void;
    onTabClick?: (activeKey: string, e: KeyboardEvent | MouseEvent) => void;
    onTabScroll?: OnTabScroll;
    editable?: EditableConfig;
    getPopupContainer?: (node: HTMLElement) => HTMLElement;
    locale?: TabsLocale;
    more?: MoreProps;
    /** @private Internal usage. Not promise will rename in future */
    popupClassName?: string;
    indicator?: {
        size?: GetIndicatorSize;
        align?: 'start' | 'center' | 'end';
    };
}
