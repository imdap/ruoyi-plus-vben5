import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties } from 'vue';
export type Status = 'error' | 'process' | 'finish' | 'wait';
export type SemanticName = 'root' | 'item' | 'itemWrapper' | 'itemHeader' | 'itemTitle' | 'itemSubtitle' | 'itemSection' | 'itemContent' | 'itemIcon' | 'itemRail';
export type ItemSemanticName = 'root' | 'wrapper' | 'header' | 'title' | 'subtitle' | 'section' | 'content' | 'icon' | 'rail';
export type ComponentType = string | any;
export interface StepItem {
    /** @deprecated Please use `content` instead. */
    description?: VueNode;
    content?: VueNode;
    disabled?: boolean;
    icon?: VueNode;
    status?: Status;
    subTitle?: VueNode;
    title?: VueNode;
    classNames?: Partial<Record<ItemSemanticName, string>>;
    styles?: Partial<Record<ItemSemanticName, CSSProperties>>;
    onClick?: (e: MouseEvent) => void;
    class?: string;
    style?: CSSProperties;
}
export type StepIconRender = (info: {
    index: number;
    status: Status;
    title: VueNode;
    description: VueNode;
    content: VueNode;
    node: VueNode;
}) => VueNode;
export interface RenderInfo {
    index: number;
    active: boolean;
    item: StepItem;
}
export interface StepsProps {
    prefixCls?: string;
    style?: CSSProperties;
    className?: string;
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    rootClassName?: string;
    orientation?: 'horizontal' | 'vertical';
    titlePlacement?: 'horizontal' | 'vertical';
    /** Internal usage of antd. Do not deps on this. */
    components?: {
        root?: ComponentType;
        item?: ComponentType;
    };
    status?: Status;
    current?: number;
    initial?: number;
    items?: StepItem[];
    onChange?: (current: number) => void;
    iconRender?: (originNode: any, info: RenderInfo & {
        components: {
            Icon: any;
        };
    }) => any;
    itemRender?: (originNode: any, info: RenderInfo) => any;
    itemWrapperRender?: (originNode: any) => any;
}
declare const Steps: import('vue').DefineSetupFnComponent<StepsProps, {}, {}, StepsProps & {}, import('vue').PublicProps>;
export default Steps;
