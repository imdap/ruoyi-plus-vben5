import { Key, NoticeConfig } from './interface.ts';
export interface NoticeProps extends Omit<NoticeConfig, 'onClose'> {
    prefixCls: string;
    eventKey: Key;
    onClick?: (event: Event) => void;
    onNoticeClose?: (key: Key) => void;
    hovering?: boolean;
    props?: Record<string, any>;
}
declare const Notify: import('vue').DefineSetupFnComponent<NoticeProps & {
    times?: number;
}, {}, {}, NoticeProps & {
    times?: number;
} & {}, import('vue').PublicProps>;
export default Notify;
