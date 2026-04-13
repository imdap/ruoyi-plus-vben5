import { Key } from '@v-c/util/dist/type';
import { CSSProperties, PropType, VNode } from 'vue';
import { InnerProps } from './Filler';
import { ExtraRenderInfo } from './interface';
import { ScrollBarDirectionType } from './ScrollBar';
export interface ScrollInfo {
    x: number;
    y: number;
}
export type ScrollTo = (arg?: number | ScrollConfig | null) => void;
export interface ListRef {
    nativeElement?: HTMLDivElement;
    scrollTo: ScrollTo;
    getScrollInfo: () => ScrollInfo;
}
export interface ScrollPos {
    left?: number;
    top?: number;
}
export interface ScrollTarget {
    index?: number;
    key?: Key;
    align?: 'top' | 'bottom' | 'auto';
    offset?: number;
}
export type ScrollConfig = ScrollTarget | ScrollPos;
export interface ListProps {
    prefixCls?: string;
    data?: any[];
    height?: number;
    itemHeight?: number;
    fullHeight?: boolean;
    itemKey: Key | ((item: any) => Key);
    component?: string;
    virtual?: boolean;
    direction?: ScrollBarDirectionType;
    /**
     * By default `scrollWidth` is same as container.
     * When set this, it will show the horizontal scrollbar and
     * `scrollWidth` will be used as the real width instead of container width.
     * When set, `virtual` will always be enabled.
     */
    scrollWidth?: number;
    styles?: {
        horizontalScrollBar?: CSSProperties;
        horizontalScrollBarThumb?: CSSProperties;
        verticalScrollBar?: CSSProperties;
        verticalScrollBarThumb?: CSSProperties;
    };
    showScrollBar?: boolean | 'optional';
    onScroll?: (e: Event) => void;
    onVirtualScroll?: (info: ScrollInfo) => void;
    onVisibleChange?: (visibleList: any[], fullList: any[]) => void;
    innerProps?: InnerProps;
    extraRender?: (info: ExtraRenderInfo) => VNode;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    prefixCls: {
        type: StringConstructor;
        default: string;
    };
    data: {
        type: PropType<any[]>;
    };
    height: NumberConstructor;
    itemHeight: NumberConstructor;
    fullHeight: {
        type: BooleanConstructor;
        default: boolean;
    };
    itemKey: {
        type: PropType<Key | ((item: any) => Key)>;
        required: true;
    };
    component: {
        type: StringConstructor;
        default: string;
    };
    direction: {
        type: PropType<ScrollBarDirectionType>;
    };
    scrollWidth: NumberConstructor;
    styles: ObjectConstructor;
    showScrollBar: {
        type: PropType<boolean | "optional">;
        default: string;
    };
    virtual: {
        type: BooleanConstructor;
        default: boolean;
    };
    onScroll: PropType<(e: Event) => void>;
    onVirtualScroll: PropType<(info: ScrollInfo) => void>;
    onVisibleChange: PropType<(visibleList: any[], fullList: any[]) => void>;
    innerProps: PropType<InnerProps>;
    extraRender: PropType<(info: ExtraRenderInfo) => VNode>;
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    prefixCls: {
        type: StringConstructor;
        default: string;
    };
    data: {
        type: PropType<any[]>;
    };
    height: NumberConstructor;
    itemHeight: NumberConstructor;
    fullHeight: {
        type: BooleanConstructor;
        default: boolean;
    };
    itemKey: {
        type: PropType<Key | ((item: any) => Key)>;
        required: true;
    };
    component: {
        type: StringConstructor;
        default: string;
    };
    direction: {
        type: PropType<ScrollBarDirectionType>;
    };
    scrollWidth: NumberConstructor;
    styles: ObjectConstructor;
    showScrollBar: {
        type: PropType<boolean | "optional">;
        default: string;
    };
    virtual: {
        type: BooleanConstructor;
        default: boolean;
    };
    onScroll: PropType<(e: Event) => void>;
    onVirtualScroll: PropType<(info: ScrollInfo) => void>;
    onVisibleChange: PropType<(visibleList: any[], fullList: any[]) => void>;
    innerProps: PropType<InnerProps>;
    extraRender: PropType<(info: ExtraRenderInfo) => VNode>;
}>> & Readonly<{}>, {
    prefixCls: string;
    showScrollBar: boolean | "optional";
    fullHeight: boolean;
    component: string;
    virtual: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
