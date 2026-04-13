import { ColumnType, StickyOffsets } from '../interface';
import { default as SummaryCell } from './Cell';
import { default as SummaryRow } from './Row';
type FlattenColumns<RecordType> = readonly (ColumnType<RecordType> & {
    scrollbar?: boolean;
})[];
export interface FooterProps<RecordType> {
    stickyOffsets: StickyOffsets;
    flattenColumns: FlattenColumns<RecordType>;
}
declare const Footer: import('vue').DefineComponent<FooterProps<any>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<FooterProps<any>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default Footer;
export declare const FooterComponents: any;
export { SummaryCell, SummaryRow };
