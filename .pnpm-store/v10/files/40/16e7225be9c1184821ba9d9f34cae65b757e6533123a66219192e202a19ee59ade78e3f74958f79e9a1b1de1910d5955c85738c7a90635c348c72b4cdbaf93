import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties } from 'vue';
import { ComponentsConfig } from '../hooks';
import { DisplayValueType, Mode, RenderNode } from '../interface';
export interface SelectInputRef {
    focus: (options?: FocusOptions) => void;
    blur: () => void;
    nativeElement: HTMLDivElement;
}
export interface SelectInputProps {
    prefixCls: string;
    prefix?: VueNode;
    suffix?: VueNode;
    clearIcon?: VueNode;
    removeIcon?: RenderNode;
    multiple?: boolean;
    displayValues: DisplayValueType[];
    placeholder?: VueNode;
    searchValue?: string;
    activeValue?: string;
    mode?: Mode;
    autoClearSearchValue?: boolean;
    onSearch?: (searchText: string, fromTyping: boolean, isCompositing: boolean) => void;
    onSearchSubmit?: (searchText: string) => void;
    onInputBlur?: () => void;
    onClearMouseDown?: (event: MouseEvent) => void;
    onInputKeyDown?: (event: KeyboardEvent) => void;
    onSelectorRemove?: (value: DisplayValueType) => void;
    maxLength?: number;
    autoFocus?: boolean;
    /** Check if `tokenSeparators` contains `\n` or `\r\n` */
    tokenWithEnter?: boolean;
    className?: string;
    style?: CSSProperties;
    focused?: boolean;
    components: ComponentsConfig;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
    onMouseDown?: (event: MouseEvent) => void;
}
declare const SelectInput: import('vue').DefineSetupFnComponent<SelectInputProps, {}, {}, SelectInputProps & {}, import('vue').PublicProps>;
export default SelectInput;
