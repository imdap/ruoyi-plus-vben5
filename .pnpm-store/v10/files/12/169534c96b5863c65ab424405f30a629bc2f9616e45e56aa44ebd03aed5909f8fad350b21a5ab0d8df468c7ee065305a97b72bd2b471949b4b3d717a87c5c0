import { CSSProperties } from 'vue';
import { HeaderProps } from '../Header/Header';
import { Direction, TableLayout } from '../interface';
export interface FixedHeaderProps<RecordType> extends HeaderProps<RecordType> {
    className: string;
    style?: CSSProperties;
    noData: boolean;
    maxContentScroll: boolean;
    colWidths: readonly number[];
    columCount: number;
    direction: Direction;
    fixHeader: boolean;
    stickyTopOffset?: number;
    stickyBottomOffset?: number;
    stickyClassName?: string;
    scrollX?: number | string | true;
    tableLayout?: TableLayout;
    onScroll: (info: {
        currentTarget: HTMLDivElement;
        scrollLeft?: number;
    }) => void;
    colGroup?: any;
}
declare const FixedHolder: import('vue').DefineComponent<FixedHeaderProps<any>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<FixedHeaderProps<any>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default FixedHolder;
