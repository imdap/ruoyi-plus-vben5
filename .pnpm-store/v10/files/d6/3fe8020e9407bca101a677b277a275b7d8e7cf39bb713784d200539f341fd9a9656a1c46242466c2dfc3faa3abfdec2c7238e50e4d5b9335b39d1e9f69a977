import { PickerPanelProps } from '../../PickerPanel';
import { FooterProps } from './Footer';
export type MustProp<DateType extends object> = Required<Pick<PickerPanelProps<DateType>, 'mode' | 'onPanelChange'>>;
type PopupPanelPropsWrapper<DateType extends object = any> = MustProp<DateType> & Omit<PickerPanelProps<DateType>, 'onPickerValueChange' | 'showTime'> & FooterProps<DateType>;
export interface PopupPanelProps<DateType extends object = any> extends PopupPanelPropsWrapper<DateType> {
    multiplePanel?: boolean;
    range?: boolean;
    onPickerValueChange: (date: DateType) => void;
}
declare const PopupPanel: import('vue').DefineSetupFnComponent<PopupPanelProps<any>, {}, {}, PopupPanelProps<any> & {}, import('vue').PublicProps>;
export default PopupPanel;
