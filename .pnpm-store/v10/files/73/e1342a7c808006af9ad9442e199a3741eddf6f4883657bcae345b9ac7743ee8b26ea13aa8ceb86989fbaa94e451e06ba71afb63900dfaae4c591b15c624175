import { SubMenuType } from '../interface';
import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties } from 'vue';
export type SemanticName = 'list' | 'listTitle';
export interface SubMenuProps extends Omit<SubMenuType, 'key' | 'children' | 'label'> {
    classes?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    title?: VueNode;
    /** @private Used for rest popup. Do not use in your prod */
    internalPopupClose?: boolean;
    /** @private Internal filled key. Do not set it directly */
    eventKey?: string;
    /** @private Do not use. Private warning empty usage */
    warnKey?: boolean;
}
declare const SubMenu: import('vue').DefineSetupFnComponent<SubMenuProps, {}, {}, SubMenuProps & {}, import('vue').PublicProps>;
export default SubMenu;
