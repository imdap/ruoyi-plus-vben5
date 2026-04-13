import { KeyboardEventHandler } from '@v-c/util/dist/EventInterface';
import { CSSProperties, VNodeChild } from 'vue';
export type SwitchChangeEventHandler = (checked: boolean, event: MouseEvent | KeyboardEvent) => void;
export type SwitchClickEventHandler = SwitchChangeEventHandler;
export interface SwitchProps {
    'className'?: string;
    'prefixCls'?: string;
    'disabled'?: boolean;
    'checkedChildren'?: VNodeChild | (() => VNodeChild);
    'unCheckedChildren'?: VNodeChild | (() => VNodeChild);
    'onChange'?: SwitchChangeEventHandler;
    'onUpdate:checked'?: (value: boolean) => void;
    'onKeyDown'?: KeyboardEventHandler;
    'onClick'?: SwitchClickEventHandler;
    'tabIndex'?: number;
    'checked'?: boolean;
    'defaultChecked'?: boolean;
    'loadingIcon'?: VNodeChild | (() => VNodeChild);
    'title'?: string;
    'styles'?: {
        content?: CSSProperties;
    };
    'classNames'?: {
        content?: string;
    };
}
declare const Switch: import('vue').DefineSetupFnComponent<SwitchProps, {}, {}, SwitchProps & {}, import('vue').PublicProps>;
export default Switch;
