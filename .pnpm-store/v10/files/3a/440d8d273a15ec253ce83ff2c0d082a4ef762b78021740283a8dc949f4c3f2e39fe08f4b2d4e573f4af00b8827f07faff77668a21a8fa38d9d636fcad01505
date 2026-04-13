import { Ref } from 'vue';
import { FilledPanelClassNames, FilledPanelStyles } from '../hooks/useSemantic';
import { PanelMode, SharedPanelProps } from '../interface';
export interface SharedPanelContextProps {
    classNames: FilledPanelClassNames;
    styles: FilledPanelStyles;
}
export declare function provideSharedPanelContext(context: Ref<SharedPanelContextProps>): void;
export declare function useSharedPanelContext(): Ref<SharedPanelContextProps> | null;
export interface PanelContextProps<DateType extends object = any> extends Pick<SharedPanelProps<DateType>, 'prefixCls' | 'cellRender' | 'generateConfig' | 'locale' | 'onSelect' | 'hoverValue' | 'hoverRangeValue' | 'onHover' | 'values' | 'pickerValue' | 'disabledDate' | 'minDate' | 'maxDate' | 'prevIcon' | 'nextIcon' | 'superPrevIcon' | 'superNextIcon'> {
    panelType: PanelMode;
    now: DateType;
    classNames: FilledPanelClassNames;
    styles: FilledPanelStyles;
}
export declare function providePanelContext<DateType extends object = any>(context: Ref<PanelContextProps<DateType>>): void;
export declare function usePanelContext<DateType extends object = any>(): Ref<PanelContextProps<DateType>> | null;
export declare function useInfo<DateType extends object = any>(props: SharedPanelProps<DateType>, panelType: PanelMode, sharedContext?: Ref<SharedPanelContextProps> | null): [sharedProps: PanelContextProps<DateType>, now: DateType];
export interface PickerHackContextProps {
    hidePrev?: boolean;
    hideNext?: boolean;
    hideHeader?: boolean;
    onCellDblClick?: () => void;
}
export declare function providePickerHackContext(context: Ref<PickerHackContextProps>): void;
export declare function usePickerHackContext(): Ref<PickerHackContextProps> | null;
