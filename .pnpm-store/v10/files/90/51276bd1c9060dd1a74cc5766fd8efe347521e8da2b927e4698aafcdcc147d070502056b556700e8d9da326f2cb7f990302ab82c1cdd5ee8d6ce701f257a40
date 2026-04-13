import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties } from 'vue';
import { BaseSelectPropsWithoutPrivate, BaseSelectSemanticName } from './BaseSelect';
import { DisplayValueType, FlattenOptionData, RawValueType, RenderNode } from './interface';
export type OnActiveValue = (active: RawValueType | null, index: number, info?: {
    source?: 'keyboard' | 'mouse';
}) => void;
export type OnInternalSelect = (value: RawValueType, info: {
    selected: boolean;
}) => void;
export interface LabelInValueType {
    label: VueNode;
    value: RawValueType;
}
export type DraftValueType = RawValueType | LabelInValueType | DisplayValueType | (RawValueType | LabelInValueType | DisplayValueType)[];
export type FilterFunc = (inputValue: string, option?: any) => boolean;
export interface FieldNames {
    value?: string;
    label?: string;
    groupLabel?: string;
    options?: string;
}
export interface BaseOptionType {
    disabled?: boolean;
    className?: string;
    title?: string;
    [name: string]: any;
}
export interface DefaultOptionType extends BaseOptionType {
    label?: VueNode;
    value?: string | number | null;
    children?: Omit<DefaultOptionType, 'children'>[];
}
export type SelectHandler<ValueType, OptionType extends BaseOptionType = DefaultOptionType> = (value: ValueType, option: OptionType) => void;
type ArrayElementType<T> = T extends (infer E)[] ? E : T;
export type SemanticName = BaseSelectSemanticName;
export type PopupSemantic = 'listItem' | 'list';
export interface SearchConfig {
    searchValue?: string;
    autoClearSearchValue?: boolean;
    onSearch?: (value: string) => void;
    filterOption?: boolean | FilterFunc;
    filterSort?: (optionA: any, optionB: any, info: {
        searchValue: string;
    }) => number;
    optionFilterProp?: string;
}
export interface SelectProps extends Omit<BaseSelectPropsWithoutPrivate, 'showSearch'> {
    prefixCls?: string;
    id?: string;
    backfill?: boolean;
    fieldNames?: FieldNames;
    /**  @deprecated please use  showSearch.onSearch */
    onSearch?: SearchConfig['onSearch'];
    showSearch?: boolean | SearchConfig;
    /**  @deprecated please use  showSearch.searchValue */
    searchValue?: SearchConfig['searchValue'];
    /**  @deprecated please use  showSearch.autoClearSearchValue */
    autoClearSearchValue?: boolean;
    onSelect?: SelectHandler<ArrayElementType<any>, any>;
    onDeselect?: SelectHandler<ArrayElementType<any>, any>;
    onActive?: (value: any) => void;
    /**
     * In Select, `false` means do nothing.
     * In TreeSelect, `false` will highlight match item.
     * It's by design.
     */
    /**  @deprecated please use  showSearch.filterOption */
    filterOption?: SearchConfig['filterOption'];
    /**  @deprecated please use  showSearch.filterSort */
    filterSort?: SearchConfig['filterSort'];
    /**  @deprecated please use  showSearch.optionFilterProp */
    optionFilterProp?: string;
    optionLabelProp?: string;
    options?: DefaultOptionType[];
    optionRender?: (oriOption: FlattenOptionData, info: {
        index: number;
    }) => any;
    defaultActiveFirstOption?: boolean;
    virtual?: boolean;
    direction?: 'ltr' | 'rtl';
    listHeight?: number;
    listItemHeight?: number;
    labelRender?: (props: LabelInValueType) => any;
    menuItemSelectedIcon?: RenderNode;
    mode?: 'combobox' | 'multiple' | 'tags';
    labelInValue?: boolean;
    value?: any | null;
    defaultValue?: any | null;
    maxCount?: number;
    onChange?: (value: any, option?: any | any[]) => void;
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
}
declare const Select: import('vue').DefineComponent<SelectProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<SelectProps> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default Select;
