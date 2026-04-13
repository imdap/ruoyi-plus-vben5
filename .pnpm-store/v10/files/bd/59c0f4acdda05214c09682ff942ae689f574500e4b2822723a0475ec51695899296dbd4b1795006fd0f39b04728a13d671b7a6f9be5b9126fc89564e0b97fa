import { Ref } from 'vue';
import { GenerateConfig } from '../generate';
import { FilledClassNames, FilledStyles } from '../hooks/useSemantic';
import { Components, Locale } from '../interface';
export interface PickerContextProps<DateType = any> {
    prefixCls: string | undefined;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    /** Customize button component */
    button?: Components['button'];
    input?: Components['input'];
    classNames: FilledClassNames;
    styles: FilledStyles;
}
export declare function providePickerContext(context: Ref<PickerContextProps>): void;
export declare function usePickerContext(): Ref<PickerContextProps>;
