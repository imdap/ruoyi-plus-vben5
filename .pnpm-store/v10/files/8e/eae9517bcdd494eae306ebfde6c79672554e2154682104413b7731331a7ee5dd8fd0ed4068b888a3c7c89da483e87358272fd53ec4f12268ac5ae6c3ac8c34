export type ContainerType = Element | DocumentFragment;
export type GetContainer = string | ContainerType | (() => ContainerType) | false;
export type EscCallback = ({ top, event, }: {
    top: boolean;
    event: KeyboardEvent;
}) => void;
export interface PortalProps {
    /** Customize container element. Default will create a div in document.body when `open` */
    getContainer?: GetContainer;
    /** Show the portal children */
    open?: boolean;
    /** Remove `children` when `open` is `false`. Set `false` will not handle remove process */
    autoDestroy?: boolean;
    /** Lock screen scroll when open */
    autoLock?: boolean;
    onEsc?: EscCallback;
    /** @private debug name. Do not use in prod */
    debug?: string;
}
declare const Portal: import('vue').DefineSetupFnComponent<PortalProps, {}, {}, PortalProps & {}, import('vue').PublicProps>;
export default Portal;
