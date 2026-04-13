import { BaseSelectPropsWithoutPrivate, BaseSelectRef, BaseSelectSemanticName, Placement } from '@v-c/select';
import { BuildInPlacements } from '../../trigger/src';
import { VueNode } from '../../util/src';
import { CSSProperties } from 'vue';
import { SHOW_CHILD, SHOW_PARENT } from './utils/commonUtil';
export interface BaseOptionType {
    disabled?: boolean;
    disableCheckbox?: boolean;
    label?: VueNode;
    value?: string | number | null;
    children?: DefaultOptionType[];
    isLeaf?: boolean;
}
export type DefaultOptionType = BaseOptionType & Record<string, any>;
export interface SearchConfig<OptionType extends DefaultOptionType = DefaultOptionType, ValueField extends keyof OptionType = keyof OptionType> {
    filter?: (inputValue: string, options: OptionType[], fieldNames: FieldNames<OptionType, ValueField>) => boolean;
    render?: (inputValue: string, path: OptionType[], prefixCls: string, fieldNames: FieldNames<OptionType, ValueField>) => VueNode;
    sort?: (a: OptionType[], b: OptionType[], inputValue: string, fieldNames: FieldNames<OptionType, ValueField>) => number;
    matchInputWidth?: boolean;
    limit?: number | false;
    searchValue?: string;
    onSearch?: (value: string) => void;
    autoClearSearchValue?: boolean;
}
export type ShowCheckedStrategy = typeof SHOW_PARENT | typeof SHOW_CHILD;
interface BaseCascaderProps<OptionType extends DefaultOptionType = DefaultOptionType, ValueField extends keyof OptionType = keyof OptionType> extends Omit<BaseSelectPropsWithoutPrivate, 'tokenSeparators' | 'labelInValue' | 'mode' | 'showSearch'> {
    id?: string;
    prefixCls?: string;
    fieldNames?: FieldNames<OptionType, ValueField>;
    optionRender?: (option: OptionType) => VueNode;
    changeOnSelect?: boolean;
    displayRender?: (label: string[], selectedOptions?: OptionType[]) => VueNode;
    checkable?: boolean | VueNode;
    showCheckedStrategy?: ShowCheckedStrategy;
    /** @deprecated please use showSearch.autoClearSearchValue */
    autoClearSearchValue?: boolean;
    showSearch?: boolean | SearchConfig<OptionType>;
    /** @deprecated please use showSearch.searchValue */
    searchValue?: string;
    /** @deprecated please use showSearch.onSearch */
    onSearch?: (value: string) => void;
    expandTrigger?: 'hover' | 'click';
    options?: OptionType[];
    /** @private Internal usage. Do not use in your production. */
    popupPrefixCls?: string;
    loadData?: (selectOptions: OptionType[]) => void;
    popupClassName?: string;
    popupMenuColumnStyle?: CSSProperties;
    placement?: Placement;
    builtinPlacements?: BuildInPlacements;
    onPopupVisibleChange?: (open: boolean) => void;
    expandIcon?: VueNode;
    loadingIcon?: VueNode;
}
export interface FieldNames<OptionType extends DefaultOptionType = DefaultOptionType, ValueField extends keyof OptionType = keyof OptionType> {
    label?: keyof OptionType;
    value?: keyof OptionType | ValueField;
    children?: keyof OptionType;
}
export type ValueType<OptionType extends DefaultOptionType = DefaultOptionType, ValueField extends keyof OptionType = keyof OptionType> = keyof OptionType extends ValueField ? unknown extends OptionType['value'] ? OptionType[ValueField] : OptionType['value'] : OptionType[ValueField];
export type GetValueType<OptionType extends DefaultOptionType = DefaultOptionType, ValueField extends keyof OptionType = keyof OptionType, Multiple extends boolean | VueNode = false> = false extends Multiple ? ValueType<Required<OptionType>, ValueField>[] : ValueType<Required<OptionType>, ValueField>[][];
export type GetOptionType<OptionType extends DefaultOptionType = DefaultOptionType, Multiple extends boolean | VueNode = false> = false extends Multiple ? OptionType[] : OptionType[][];
export type SemanticName = BaseSelectSemanticName;
export type PopupSemantic = 'list' | 'listItem';
export interface CascaderProps<OptionType extends DefaultOptionType = DefaultOptionType, ValueField extends keyof OptionType = keyof OptionType, Multiple extends boolean | VueNode = false> extends BaseCascaderProps<OptionType, ValueField> {
    styles?: Partial<Record<SemanticName, CSSProperties>> & {
        popup?: Partial<Record<PopupSemantic, CSSProperties>>;
    };
    classNames?: Partial<Record<SemanticName, string>> & {
        popup?: Partial<Record<PopupSemantic, string>>;
    };
    checkable?: Multiple;
    value?: GetValueType<OptionType, ValueField, Multiple>;
    defaultValue?: GetValueType<OptionType, ValueField, Multiple>;
    onChange?: (value: GetValueType<OptionType, ValueField, Multiple>, selectOptions: GetOptionType<OptionType, Multiple>) => void;
}
export type SingleValueType = (string | number)[];
export type LegacyKey = string | number;
export type InternalValueType = SingleValueType | SingleValueType[];
export interface InternalFieldNames extends Required<FieldNames> {
    key: string;
}
export type InternalCascaderProps = Omit<CascaderProps, 'onChange' | 'value' | 'defaultValue'> & {
    value?: InternalValueType;
    defaultValue?: InternalValueType;
    onChange?: (value: InternalValueType, selectOptions: BaseOptionType[] | BaseOptionType[][]) => void;
};
export type CascaderRef = Omit<BaseSelectRef, 'scrollTo'>;
declare const Cascader: import('vue').DefineSetupFnComponent<CascaderProps<DefaultOptionType, string, false>, {}, {}, CascaderProps<DefaultOptionType, string, false> & {}, import('vue').PublicProps>;
export default Cascader;
