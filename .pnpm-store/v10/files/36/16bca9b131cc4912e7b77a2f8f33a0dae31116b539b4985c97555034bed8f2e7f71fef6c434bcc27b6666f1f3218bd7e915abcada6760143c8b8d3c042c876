import { Key, VueNode } from '@v-c/util/dist/type';
import { CSSProperties, PropType } from 'vue';
import { default as RawItem } from './RawItem';
export { OverflowContextProvider } from './context';
declare const RESPONSIVE: "responsive";
declare const INVALIDATE: "invalidate";
export interface OverflowProps<ItemType = any> {
    prefixCls?: string;
    class?: any;
    style?: CSSProperties;
    data?: ItemType[];
    itemKey?: Key | ((item: ItemType) => Key);
    /** Used for `responsive`. It will limit render node to avoid perf issue */
    itemWidth?: number;
    renderItem?: (item: ItemType, info: {
        index: number;
    }) => VueNode;
    /** @private Do not use in your production. Render raw node that need wrap Item by developer self */
    renderRawItem?: (item: ItemType, index: number) => VueNode;
    maxCount?: number | typeof RESPONSIVE | typeof INVALIDATE;
    renderRest?: VueNode | ((omittedItems: ItemType[]) => VueNode);
    /** @private Do not use in your production. Render raw node that need wrap Item by developer self */
    renderRawRest?: (omittedItems: ItemType[]) => VueNode;
    prefix?: any;
    suffix?: any;
    component?: any;
    itemComponent?: any;
    /** @private This API may be refactor since not well design */
    onVisibleChange?: (visibleCount: number) => void;
    /** When set to `full`, ssr will render full items by default and remove at client side */
    ssr?: 'full';
}
declare const OverflowImpl: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    readonly prefixCls: {
        readonly type: StringConstructor;
        readonly default: "vc-overflow";
    };
    readonly data: {
        readonly type: PropType<any[]>;
        readonly default: () => never[];
    };
    readonly renderItem: PropType<(item: any, info: {
        index: number;
    }) => VueNode>;
    readonly renderRawItem: PropType<(item: any, index: number) => VueNode>;
    readonly itemKey: PropType<Key | ((item: any) => Key)>;
    readonly itemWidth: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    readonly maxCount: PropType<number | typeof RESPONSIVE | typeof INVALIDATE>;
    readonly renderRest: PropType<VueNode | ((omittedItems: any[]) => VueNode)>;
    readonly renderRawRest: PropType<(omittedItems: any[]) => VueNode>;
    readonly prefix: {};
    readonly suffix: {};
    readonly component: PropType<any>;
    readonly itemComponent: PropType<any>;
    readonly onVisibleChange: PropType<(visibleCount: number) => void>;
    readonly ssr: PropType<"full">;
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "visibleChange"[], "visibleChange", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    readonly prefixCls: {
        readonly type: StringConstructor;
        readonly default: "vc-overflow";
    };
    readonly data: {
        readonly type: PropType<any[]>;
        readonly default: () => never[];
    };
    readonly renderItem: PropType<(item: any, info: {
        index: number;
    }) => VueNode>;
    readonly renderRawItem: PropType<(item: any, index: number) => VueNode>;
    readonly itemKey: PropType<Key | ((item: any) => Key)>;
    readonly itemWidth: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    readonly maxCount: PropType<number | typeof RESPONSIVE | typeof INVALIDATE>;
    readonly renderRest: PropType<VueNode | ((omittedItems: any[]) => VueNode)>;
    readonly renderRawRest: PropType<(omittedItems: any[]) => VueNode>;
    readonly prefix: {};
    readonly suffix: {};
    readonly component: PropType<any>;
    readonly itemComponent: PropType<any>;
    readonly onVisibleChange: PropType<(visibleCount: number) => void>;
    readonly ssr: PropType<"full">;
}>> & Readonly<{
    onVisibleChange?: ((...args: any[]) => any) | undefined;
}>, {
    readonly prefixCls: string;
    readonly data: any[];
    readonly itemWidth: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
type OverflowComponent = typeof OverflowImpl & {
    Item: typeof RawItem;
    RESPONSIVE: typeof RESPONSIVE;
    INVALIDATE: typeof INVALIDATE;
};
declare const Overflow: OverflowComponent;
export default Overflow;
