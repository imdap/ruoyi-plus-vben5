import { TransitionGroupProps } from 'vue';
import { Key, OpenConfig, Placement, StackConfig } from './interface.ts';
export interface NoticeListProps {
    configList?: OpenConfig[];
    placement?: Placement;
    prefixCls?: string;
    motion?: TransitionGroupProps | ((placement: Placement) => TransitionGroupProps);
    stack?: StackConfig;
    onAllNoticeRemoved?: (placement: Placement) => void;
    onNoticeClose?: (key: Key) => void;
}
declare const NoticeList: import('vue').DefineSetupFnComponent<NoticeListProps, {}, {}, NoticeListProps & {}, import('vue').PublicProps>;
export default NoticeList;
