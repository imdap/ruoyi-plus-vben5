import { ColumnType, StickyOffsets } from '../interface';
type FlattenColumns<RecordType> = readonly (ColumnType<RecordType> & {
    scrollbar?: boolean;
})[];
export interface SummaryContextProps<RecordType = any> {
    stickyOffsets?: StickyOffsets;
    scrollColumnIndex?: number | null;
    flattenColumns?: FlattenColumns<RecordType>;
}
export declare function useProvideSummaryContext(value: SummaryContextProps): void;
export declare function useInjectSummaryContext<RecordType = any>(): SummaryContextProps<any>;
export {};
