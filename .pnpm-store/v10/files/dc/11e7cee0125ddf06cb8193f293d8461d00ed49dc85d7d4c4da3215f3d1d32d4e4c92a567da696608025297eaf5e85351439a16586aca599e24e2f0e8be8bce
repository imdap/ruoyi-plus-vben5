import { CSSProperties, Ref } from 'vue';
import { FlattenOptionData, RawValueType, RenderNode } from './interface';
import { BaseOptionType, FieldNames, OnActiveValue, OnInternalSelect, PopupSemantic, SelectProps, SemanticName } from './Select';
/**
 * SelectContext is only used for Select. BaseSelect should not consume this context.
 */
export interface SelectContextProps {
    classNames?: Partial<Record<SemanticName, string>> & {
        popup?: Partial<Record<PopupSemantic, string>>;
    };
    styles?: Partial<Record<SemanticName, CSSProperties>> & {
        popup?: Partial<Record<PopupSemantic, CSSProperties>>;
    };
    options: BaseOptionType[];
    optionRender?: SelectProps['optionRender'];
    flattenOptions: FlattenOptionData[];
    onActiveValue: OnActiveValue;
    defaultActiveFirstOption?: boolean;
    onSelect: OnInternalSelect;
    menuItemSelectedIcon?: RenderNode;
    rawValues: Set<RawValueType>;
    fieldNames?: FieldNames;
    virtual?: boolean;
    direction?: 'ltr' | 'rtl';
    listHeight?: number;
    listItemHeight?: number;
    childrenAsData?: boolean;
    maxCount?: number;
}
declare function useSelectProvider(value: Ref<SelectContextProps>): void;
declare function useSelectContext(): Ref<SelectContextProps | null>;
export { useSelectContext, useSelectProvider, };
