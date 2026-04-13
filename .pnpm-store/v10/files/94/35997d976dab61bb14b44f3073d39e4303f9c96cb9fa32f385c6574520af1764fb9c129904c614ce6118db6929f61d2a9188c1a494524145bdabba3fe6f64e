import { MenuItemType } from './interface.ts';
export interface MenuItemProps extends Omit<MenuItemType, 'label' | 'key'> {
    /** @private Internal filled key. Do not set it directly */
    eventKey?: string;
    /** @private Do not use. Private warning empty usage */
    warnKey?: boolean;
    /** @deprecated No place to use this. Should remove */
    attribute?: Record<string, string>;
    onKeyDown?: (e: KeyboardEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    role?: string;
}
declare const MenuItem: import('vue').DefineSetupFnComponent<MenuItemProps, {}, {}, MenuItemProps & {}, import('vue').PublicProps>;
export default MenuItem;
