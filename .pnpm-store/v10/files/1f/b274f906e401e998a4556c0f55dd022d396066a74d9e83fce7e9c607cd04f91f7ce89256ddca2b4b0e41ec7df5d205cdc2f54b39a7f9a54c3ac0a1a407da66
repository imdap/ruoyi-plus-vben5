import { PopupShowTimeConfig } from '.';
import { GenerateConfig } from '../../generate';
import { DisabledDate, InternalMode, PanelMode, SharedPickerProps } from '../../interface';
export interface FooterProps<DateType extends object = any> {
    mode: PanelMode;
    internalMode: InternalMode;
    renderExtraFooter?: SharedPickerProps['renderExtraFooter'];
    showNow: boolean;
    generateConfig: GenerateConfig<DateType>;
    disabledDate: DisabledDate<DateType>;
    showTime?: PopupShowTimeConfig<DateType>;
    /** From Footer component used only. Check if can OK button click */
    invalid?: boolean;
    onSubmit: (date?: DateType) => void;
    needConfirm: boolean;
    onNow: (now: DateType) => void;
}
declare const Footer: import('vue').DefineSetupFnComponent<FooterProps<any>, {}, {}, FooterProps<any> & {}, import('vue').PublicProps>;
export default Footer;
