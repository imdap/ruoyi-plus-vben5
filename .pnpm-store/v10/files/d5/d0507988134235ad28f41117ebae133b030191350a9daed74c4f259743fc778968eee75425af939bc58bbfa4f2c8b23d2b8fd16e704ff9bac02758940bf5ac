import { Key, VueNode } from '../../util/src/type';
import { CSSProperties, Ref, TransitionProps } from 'vue';
export type SemanticName = 'header' | 'title' | 'body' | 'icon';
export interface CollapsePanelProps {
    id?: string;
    header?: VueNode;
    prefixCls?: string;
    headerClass?: string;
    showArrow?: boolean;
    class?: string;
    classNames?: Partial<Record<SemanticName, string>>;
    style?: object;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    isActive?: boolean;
    openMotion?: TransitionProps;
    destroyOnHidden?: boolean;
    accordion?: boolean;
    forceRender?: boolean;
    extra?: VueNode;
    onItemClick?: (panelKey: Key) => void;
    expandIcon?: (props: object) => any;
    panelKey?: Key;
    role?: string;
    collapsible?: CollapsibleType;
    children?: VueNode | string;
}
export type CollapsibleType = 'header' | 'icon' | 'disabled';
export interface ItemType extends Omit<CollapsePanelProps, 'header' | 'prefixCls' | 'panelKey' | 'isActive' | 'accordion' | 'openMotion' | 'expandIcon'> {
    key?: CollapsePanelProps['panelKey'];
    label?: CollapsePanelProps['header'];
    ref?: Ref<HTMLDivElement>;
}
export interface CollapseProps {
    prefixCls?: string;
    activeKey?: Key | Key[];
    defaultActiveKey?: Key | Key[];
    openMotion?: TransitionProps;
    onChange?: (key: Key[]) => void;
    accordion?: boolean;
    destroyOnHidden?: boolean;
    expandIcon?: (props: object) => any;
    collapsible?: CollapsibleType;
    /**
     * Collapse items content
     * @since 3.6.0
     */
    items?: ItemType[];
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
}
export type { Key, };
