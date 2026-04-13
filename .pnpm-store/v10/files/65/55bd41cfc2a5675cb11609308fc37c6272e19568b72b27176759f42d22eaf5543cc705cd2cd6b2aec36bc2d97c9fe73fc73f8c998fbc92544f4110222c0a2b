import { VueNode } from '../../../../../util/src';
import { ComputedRef } from 'vue';
import { SelectorProps } from '../../../interface';
export interface InputProps {
    'readOnly'?: boolean;
    'required'?: boolean;
    'aria-required'?: boolean;
    'name'?: string;
    'autoComplete'?: string;
    'size'?: number;
    'id'?: string;
    'placeholder'?: string;
    'disabled'?: boolean;
    'onFocus'?: (e: FocusEvent) => void;
    'onBlur'?: (e: FocusEvent) => void;
    'onKeyDown'?: (e: KeyboardEvent) => void;
    'format'?: string;
    'validateFormat': (value: string) => boolean;
    'active'?: boolean;
    /** Used for single picker only */
    'showActiveCls'?: boolean;
    'suffixIcon'?: VueNode;
    'value'?: string;
    'onChange': (value: string) => void;
    'onSubmit': VoidFunction;
    /** Meaning current is from the hover cell getting the placeholder text */
    'helped'?: boolean;
    /**
     * Trigger when input need additional help.
     * Like open the popup for interactive.
     */
    'onHelp': () => void;
    'preserveInvalidOnBlur'?: boolean;
    'invalid'?: boolean;
    'clearIcon'?: VueNode;
    [key: string]: any;
}
export type UseInputProps<DateType extends object = any> = Pick<SelectorProps<DateType>, 'maskFormat' | 'format' | 'generateConfig' | 'locale' | 'preserveInvalidOnBlur' | 'inputReadOnly' | 'onSubmit' | 'onFocus' | 'onBlur' | 'onInputChange' | 'onInvalid' | 'onOpenChange' | 'onKeyDown' | 'activeHelp' | 'open' | 'picker'> & {
    'id'?: string | string[];
    'value'?: DateType[];
    'invalid'?: boolean | [boolean, boolean];
    'placeholder'?: string | [string, string];
    'disabled'?: boolean | [boolean, boolean];
    'onChange': (value: DateType | null, index?: number) => void;
    'required'?: boolean;
    'aria-required'?: boolean;
    'name'?: string;
    'autoComplete'?: string;
    'allHelp': boolean;
    'activeIndex'?: number | null;
};
export default function useInputProps<DateType extends object = any>(props: ComputedRef<UseInputProps<DateType>>, 
/** Used for SinglePicker */
postProps?: (info: {
    valueTexts: string[];
}) => Partial<InputProps>): readonly [(index?: number) => InputProps, (date: DateType) => string];
