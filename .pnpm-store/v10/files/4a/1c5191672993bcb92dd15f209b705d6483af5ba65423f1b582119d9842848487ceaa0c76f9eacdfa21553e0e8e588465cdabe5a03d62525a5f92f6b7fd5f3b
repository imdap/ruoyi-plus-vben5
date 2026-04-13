import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties, PropType } from 'vue';
export interface PaginationLocale {
    items_per_page?: string;
    jump_to?: string;
    jump_to_confirm?: string;
    page?: string;
    prev_page?: string;
    next_page?: string;
    prev_5?: string;
    next_5?: string;
    prev_3?: string;
    next_3?: string;
    page_size?: string;
}
type SemanticName = 'item';
export interface PaginationData {
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    classNames?: Partial<Record<SemanticName, string>>;
    className: string;
    selectPrefixCls: string;
    prefixCls: string;
    pageSizeOptions: number[];
    current: number;
    defaultCurrent: number;
    total: number;
    totalBoundaryShowSizeChanger?: number;
    pageSize: number;
    defaultPageSize: number;
    hideOnSinglePage: boolean;
    align: 'start' | 'center' | 'end';
    showSizeChanger: boolean;
    sizeChangerRender?: SizeChangerRender;
    showLessItems: boolean;
    showPrevNextJumpers: boolean;
    showQuickJumper: boolean | object;
    showTitle: boolean;
    simple: boolean | {
        readOnly?: boolean;
    };
    disabled: boolean;
    locale: PaginationLocale;
    prevIcon: VueNode;
    nextIcon: VueNode;
    jumpPrevIcon: VueNode;
    jumpNextIcon: VueNode;
}
export interface PaginationProps extends Partial<PaginationData> {
    onChange?: (page: number, pageSize: number) => void;
    onShowSizeChange?: (current: number, size: number) => void;
    itemRender?: (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', element: VueNode) => VueNode;
    showTotal?: (total: number, range: [number, number]) => VueNode;
    role?: string | undefined;
}
export type SizeChangerRender = (info: {
    'disabled': boolean;
    'size': number;
    'onSizeChange': (value: string | number) => void;
    'aria-label': string;
    'className': string;
    'options': {
        label: string;
        value: string | number;
    }[];
}) => VueNode;
export declare function optionsProps(): {
    disabled: {
        type: BooleanConstructor;
    };
    locale: {
        type: PropType<PaginationLocale>;
        required: boolean;
    };
    rootPrefixCls: {
        type: StringConstructor;
        required: boolean;
    };
    selectPrefixCls: {
        type: StringConstructor;
    };
    pageSize: {
        type: NumberConstructor;
        required: boolean;
    };
    pageSizeOptions: {
        type: PropType<Array<number>>;
    };
    goButton: {
        type: (BooleanConstructor | StringConstructor)[];
    };
    changeSize: {
        type: PropType<(size: number) => void>;
    };
    quickGo: {
        type: PropType<(value: number | undefined) => void>;
    };
    buildOptionText: {
        type: PropType<(value: string | number) => string>;
    };
    showSizeChanger: {
        type: BooleanConstructor;
        require: boolean;
    };
    sizeChangerRender: {
        type: PropType<SizeChangerRender>;
    };
};
export {};
