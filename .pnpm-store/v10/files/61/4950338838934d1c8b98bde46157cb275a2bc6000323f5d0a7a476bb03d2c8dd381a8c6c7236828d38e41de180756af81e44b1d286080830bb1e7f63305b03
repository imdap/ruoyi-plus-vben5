import { InjectionKey, Ref } from 'vue';
import { AriaValueFormat, Direction, SliderClassNames, SliderStyles } from './interface';
export interface SliderContextProps {
    min: number;
    max: number;
    includedStart: number;
    includedEnd: number;
    direction: Direction;
    disabled?: boolean;
    keyboard?: boolean;
    included?: boolean;
    step: number | null;
    range?: boolean;
    tabIndex: number | number[];
    ariaLabelForHandle?: string | string[];
    ariaLabelledByForHandle?: string | string[];
    ariaRequired?: boolean;
    ariaValueTextFormatterForHandle?: AriaValueFormat | AriaValueFormat[];
    classNames: SliderClassNames;
    styles: SliderStyles;
}
export declare const defaultSliderContextValue: {
    min: number;
    max: number;
    direction: string;
    step: number;
    includedStart: number;
    includedEnd: number;
    tabIndex: number;
    keyboard: boolean;
    styles: {};
    classNames: {};
};
export declare function useProviderSliderContext(ctx: Ref<SliderContextProps>): void;
export declare function useInjectSlider(): Ref<SliderContextProps>;
export interface UnstableContextProps {
    onDragStart?: (info: {
        rawValues: number[];
        draggingIndex: number;
        draggingValue: number;
    }) => void;
    onDragChange?: (info: {
        rawValues: number[];
        deleteIndex: number;
        draggingIndex: number;
        draggingValue: number;
    }) => void;
}
/** @private NOT PROMISE AVAILABLE. DO NOT USE IN PRODUCTION. */
export declare const UnstableContextKey: InjectionKey<UnstableContextProps>;
export declare const defaultUnstableContextValue: UnstableContextProps;
export declare const UnstableProvider: import('vue').DefineSetupFnComponent<{
    value: any;
}, {}, {}, {
    value: any;
} & {}, import('vue').PublicProps>;
export declare function useUnstableContext(): UnstableContextProps;
