import { AlignType, BuildInPlacements } from '@v-c/trigger';
import { VueNode } from '@v-c/util/dist/type';
import { ScrollConfig, ScrollTo } from '@v-c/virtual-list';
import { CSSProperties } from 'vue';
import { ComponentsConfig } from '../hooks';
import { DisplayInfoType, DisplayValueType, Mode, Placement, RawValueType, RenderDOMFunc, RenderNode } from '../interface';
export type BaseSelectSemanticName = 'prefix' | 'suffix' | 'input' | 'clear' | 'placeholder' | 'content' | 'item' | 'itemContent' | 'itemRemove';
/**
 * ZombieJ:
 * We are currently refactoring the semantic structure of the component. Changelog:
 * - Remove `suffixIcon` and change to `suffix`.
 * - Add `components.root` for replacing response element.
 *   - Remove `getInputElement` and `getRawInputElement` since we can use `components.input` instead.
 */
export type { DisplayInfoType, DisplayValueType, Mode, Placement, RawValueType, RenderDOMFunc, RenderNode, };
export interface RefOptionListProps {
    onKeyDown: (event: KeyboardEvent) => void;
    onKeyUp: (event: KeyboardEvent) => void;
    scrollTo: (args: number | ScrollConfig) => void;
}
export interface CustomTagProps {
    label: VueNode;
    value: any;
    disabled: boolean;
    onClose: (event?: MouseEvent) => void;
    closable: boolean;
    isMaxTag: boolean;
    index: number;
}
export interface BaseSelectRef {
    focus: (options?: FocusOptions) => void;
    blur: () => void;
    scrollTo: ScrollTo;
    nativeElement: HTMLElement;
}
export interface BaseSelectPrivateProps {
    id: string;
    prefixCls: string;
    omitDomProps?: string[];
    displayValues: DisplayValueType[];
    onDisplayValuesChange: (values: DisplayValueType[], info: {
        type: DisplayInfoType;
        values: DisplayValueType[];
    }) => void;
    /** Current dropdown list active item string value */
    activeValue?: string;
    /** Link search input with target element */
    activeDescendantId?: string;
    onActiveValueChange?: (value: string | null) => void;
    searchValue: string;
    autoClearSearchValue?: boolean;
    /** Trigger onSearch, return false to prevent trigger open event */
    onSearch: (searchValue: string, info: {
        source: 'typing' | 'effect' | 'submit' | 'blur';
    }) => void;
    /** Trigger when search text match the `tokenSeparators`. Will provide split content */
    onSearchSplit?: (words: string[]) => void;
    OptionList: any;
    /** Tell if provided `options` is empty */
    emptyOptions: boolean;
}
export type BaseSelectPropsWithoutPrivate = Omit<BaseSelectProps, keyof BaseSelectPrivateProps>;
export interface BaseSelectProps extends BaseSelectPrivateProps {
    className?: string;
    style?: CSSProperties;
    classNames?: Partial<Record<BaseSelectSemanticName, string>>;
    styles?: Partial<Record<BaseSelectSemanticName, CSSProperties>>;
    showSearch?: boolean;
    tagRender?: (props: CustomTagProps) => any;
    direction?: 'ltr' | 'rtl';
    autoFocus?: boolean;
    placeholder?: VueNode;
    maxCount?: number;
    title?: string;
    tabIndex?: number;
    notFoundContent?: VueNode;
    onClear?: () => void;
    maxLength?: number;
    showScrollBar?: boolean | 'optional';
    choiceTransitionName?: string;
    mode?: Mode;
    disabled?: boolean;
    loading?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    onPopupVisibleChange?: (open: boolean) => void;
    /** @private Internal usage. Do not use in your production. */
    getInputElement?: () => any;
    /** @private Internal usage. Do not use in your production. */
    getRawInputElement?: () => any;
    maxTagTextLength?: number;
    maxTagCount?: number | 'responsive';
    maxTagPlaceholder?: VueNode | ((omittedValues: DisplayValueType[]) => any);
    tokenSeparators?: string[];
    allowClear?: boolean | {
        clearIcon?: VueNode;
    };
    prefix?: VueNode;
    /** @deprecated Please use `suffix` instead. */
    suffixIcon?: RenderNode;
    suffix?: RenderNode;
    /**
     * Clear all icon
     * @deprecated Please use `allowClear` instead
     */
    clearIcon?: VueNode;
    /** Selector remove icon */
    removeIcon?: RenderNode;
    animation?: string;
    transitionName?: string;
    popupStyle?: CSSProperties;
    popupClassName?: string;
    popupMatchSelectWidth?: boolean | number;
    popupRender?: (menu: any) => any;
    popupAlign?: AlignType;
    placement?: Placement;
    builtinPlacements?: BuildInPlacements;
    getPopupContainer?: RenderDOMFunc;
    showAction?: ('focus' | 'click')[];
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onMouseDown?: (event: MouseEvent) => void;
    onPopupScroll?: (e: Event) => void;
    onInputKeyDown?: (event: KeyboardEvent) => void;
    onMouseEnter?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
    onClick?: (event: MouseEvent) => void;
    components?: ComponentsConfig;
}
export declare const isMultiple: (mode: Mode) => mode is "multiple" | "tags";
export declare const BaseSelect: import('vue').DefineSetupFnComponent<BaseSelectProps, {}, {}, BaseSelectProps & {}, import('vue').PublicProps>;
