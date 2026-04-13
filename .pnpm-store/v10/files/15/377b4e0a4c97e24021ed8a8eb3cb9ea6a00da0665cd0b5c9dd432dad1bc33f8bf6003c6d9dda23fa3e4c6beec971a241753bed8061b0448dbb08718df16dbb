import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties, MaybeRef, TransitionGroupProps } from 'vue';
import { Key, OpenConfig, Placement, StackConfig } from '../interface';
import { NotificationsProps } from '../Notifications';
type OptionalConfig = Partial<OpenConfig>;
export interface NotificationConfig {
    prefixCls?: string;
    /** Customize container. It will repeat call which means you should return same container element. */
    getContainer?: () => HTMLElement | ShadowRoot;
    motion?: TransitionGroupProps | ((placement: Placement) => TransitionGroupProps);
    closeIcon?: VueNode;
    closable?: boolean | ({
        closeIcon?: VueNode;
        onClose?: VoidFunction;
    } & Record<string, any>);
    maxCount?: number;
    duration?: number | false | null;
    showProgress?: boolean;
    pauseOnHover?: boolean;
    /** @private. Config for notification holder style. Safe to remove if refactor */
    className?: (placement: Placement) => string;
    /** @private. Config for notification holder style. Safe to remove if refactor */
    style?: (placement: Placement) => CSSProperties;
    /** @private Trigger when all the notification closed. */
    onAllRemoved?: VoidFunction;
    stack?: StackConfig;
    /** @private Slot for style in Notifications */
    renderNotifications?: NotificationsProps['renderNotifications'];
}
export interface NotificationAPI {
    open: (config: OptionalConfig) => void;
    close: (key: Key) => void;
    destroy: () => void;
}
export default function useNotification(rootConfig?: MaybeRef<NotificationConfig>): [NotificationAPI, () => VueNode];
export {};
