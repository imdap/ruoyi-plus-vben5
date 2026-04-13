import { RendererElement, RendererNode, VNode, VNodeNormalizedChildren } from 'vue';
import { CollapsePanelProps, CollapseProps, ItemType, Key } from '../interface';
type Props = Pick<CollapsePanelProps, 'prefixCls' | 'onItemClick' | 'openMotion' | 'expandIcon' | 'classNames' | 'styles'> & Pick<CollapseProps, 'accordion' | 'collapsible' | 'destroyOnHidden'> & {
    activeKey: Key[];
};
export declare function useItems(items?: ItemType[], children?: () => VNode | VNodeNormalizedChildren, props?: Props): (VNode<RendererNode, RendererElement, {
    [key: string]: any;
}> | null)[];
export {};
