import { SlotsType } from 'vue';
import { default as ScrollLocker } from './Dom/scrollLocker';
/**
 * @private
 */
export declare function getOpenCount(): number;
export type GetContainer = string | HTMLElement | (() => HTMLElement);
export type DefaultSlotInfo = SlotsType<{
    default: {
        getOpenCount: () => number;
        getContainer: () => HTMLElement;
        switchScrollingEffect: () => void;
        scrollLocker: ScrollLocker;
    };
}>;
export interface PortalWrapperProps {
    visible?: boolean;
    getContainer?: GetContainer;
    wrapperClassName?: string;
    forceRender?: boolean;
}
interface PortalWrapperEmits {
    [key: string]: any;
}
declare const PortalWrapper: import('vue').DefineSetupFnComponent<PortalWrapperProps, PortalWrapperEmits, DefaultSlotInfo, PortalWrapperProps & {
    [x: `on${Capitalize<string>}`]: (...args: any[] | unknown[]) => any;
}, import('vue').PublicProps>;
export default PortalWrapper;
