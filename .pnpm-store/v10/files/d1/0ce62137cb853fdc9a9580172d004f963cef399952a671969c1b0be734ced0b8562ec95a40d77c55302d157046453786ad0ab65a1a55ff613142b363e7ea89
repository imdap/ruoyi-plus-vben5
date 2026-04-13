import { CSSProperties } from 'vue';
import { DefaultOptionType, LegacyKey, SingleValueType } from '../Cascader';
export declare const FIX_LABEL = "__cascader_fix_label__";
export interface ColumnProps<OptionType extends DefaultOptionType = DefaultOptionType> {
    prefixCls: string;
    multiple?: boolean;
    options: OptionType[];
    /** Current Column opened item key */
    activeValue?: LegacyKey;
    /** The value path before current column */
    prevValuePath: LegacyKey[];
    onToggleOpen: (open: boolean) => void;
    onSelect: (valuePath: SingleValueType, leaf: boolean) => void;
    onActive: (valuePath: SingleValueType) => void;
    checkedSet: Set<LegacyKey>;
    halfCheckedSet: Set<LegacyKey>;
    loadingKeys: LegacyKey[];
    isSelectable: (option: DefaultOptionType) => boolean;
    disabled?: boolean;
    style?: CSSProperties;
}
declare const Column: import('vue').DefineSetupFnComponent<ColumnProps<DefaultOptionType>, {}, {}, ColumnProps<DefaultOptionType> & {}, import('vue').PublicProps>;
export default Column;
