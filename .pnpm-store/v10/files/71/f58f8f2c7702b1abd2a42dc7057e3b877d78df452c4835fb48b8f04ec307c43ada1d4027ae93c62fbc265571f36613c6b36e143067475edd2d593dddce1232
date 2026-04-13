import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties, TransitionGroupProps } from 'vue';
import { Key, OpenConfig, Placement, StackConfig } from './interface.ts';
export interface NotificationsProps {
    prefixCls?: string;
    motion?: TransitionGroupProps | ((placement: Placement) => TransitionGroupProps);
    container?: HTMLElement | ShadowRoot;
    maxCount?: number;
    className?: (placement: Placement) => string;
    style?: (placement: Placement) => CSSProperties;
    onAllRemoved?: VoidFunction;
    stack?: StackConfig;
    renderNotifications?: (node: VueNode, info: {
        prefixCls: string;
        key: Key;
    }) => VueNode;
}
export interface NotificationsRef {
    open: (config: OpenConfig) => void;
    close: (key: Key) => void;
    destroy: () => void;
}
declare const Notifications: import('vue').DefineSetupFnComponent<NotificationsProps, {}, {}, NotificationsProps & {}, import('vue').PublicProps>;
export default Notifications;
