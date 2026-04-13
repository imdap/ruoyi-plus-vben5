import { DisabledDate } from '../interface';
export interface PanelBodyProps<DateType = any> {
    rowNum: number;
    colNum: number;
    baseDate: DateType;
    titleFormat?: string;
    getCellDate: (date: DateType, offset: number) => DateType;
    getCellText: (date: DateType) => any;
    getCellClassName: (date: DateType) => Record<string, any>;
    disabledDate?: DisabledDate<DateType>;
    headerCells?: any[];
    prefixColumn?: (date: DateType) => any;
    rowClassName?: (date: DateType) => string;
    cellSelection?: boolean;
}
declare const PanelBody: import('vue').DefineSetupFnComponent<PanelBodyProps<any>, {}, {}, PanelBodyProps<any> & {}, import('vue').PublicProps>;
export default PanelBody;
