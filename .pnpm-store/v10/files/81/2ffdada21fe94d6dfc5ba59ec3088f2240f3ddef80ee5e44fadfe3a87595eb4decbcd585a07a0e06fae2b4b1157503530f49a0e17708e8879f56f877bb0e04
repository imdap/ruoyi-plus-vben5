import { Key } from '@v-c/util/dist/type';
import { ComputedRef, PropType } from 'vue';
export interface OverflowContextType {
    prefixCls: string;
    responsive: boolean;
    order: number;
    registerSize: (key: Key, width: number | null) => void;
    display: boolean;
    invalidate: boolean;
    item?: any;
    itemKey?: Key;
    className?: string;
}
export declare const OverflowContextProvider: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    value: {
        type: PropType<any>;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: {
        type: PropType<any>;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare function useInjectOverflowContext(): ComputedRef<OverflowContextType | null> | null;
