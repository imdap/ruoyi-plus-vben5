import { CSSProperties } from 'vue';
import { PaginationProps } from './interface';
export interface PagerProps extends Pick<PaginationProps, 'itemRender'> {
    rootPrefixCls: string;
    page: number;
    active?: boolean;
    className?: string;
    style?: CSSProperties;
    showTitle: boolean;
    onClick?: (page: number) => void;
    onKeyPress?: (e: KeyboardEvent, onClick: PagerProps['onClick'], page: PagerProps['page']) => void;
}
declare const Pager: import('vue').DefineSetupFnComponent<PagerProps, {}, {}, PagerProps & {}, import('vue').PublicProps>;
export default Pager;
