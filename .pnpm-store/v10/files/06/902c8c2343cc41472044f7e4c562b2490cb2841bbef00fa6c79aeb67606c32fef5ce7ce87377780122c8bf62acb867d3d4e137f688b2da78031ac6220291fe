import { Ref } from 'vue';
import { CascaderProps, DefaultOptionType, InternalFieldNames, SingleValueType } from './Cascader';
export interface CascaderContextProps {
    options: NonNullable<CascaderProps['options']>;
    fieldNames: InternalFieldNames;
    values: SingleValueType[];
    halfValues: SingleValueType[];
    changeOnSelect?: boolean;
    onSelect: (valuePath: SingleValueType) => void;
    checkable?: boolean | any;
    searchOptions: DefaultOptionType[];
    popupPrefixCls?: string;
    loadData?: (selectOptions: DefaultOptionType[]) => void;
    expandTrigger?: 'hover' | 'click';
    expandIcon?: any;
    loadingIcon?: any;
    popupMenuColumnStyle?: CascaderProps['popupMenuColumnStyle'];
    optionRender?: CascaderProps['optionRender'];
    classNames?: CascaderProps['classNames'];
    styles?: CascaderProps['styles'];
}
export declare function useCascaderProvider(value: Ref<CascaderContextProps>): void;
export declare function useCascaderContext(): Ref<CascaderContextProps | null>;
