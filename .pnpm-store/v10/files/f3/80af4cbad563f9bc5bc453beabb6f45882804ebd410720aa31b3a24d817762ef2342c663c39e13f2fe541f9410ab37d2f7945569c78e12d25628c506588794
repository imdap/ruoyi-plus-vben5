import { FocusEventHandler, KeyboardEventHandler } from '@v-c/util/dist/EventInterface';
import { StarProps } from './Star';
export type Direction = 'ltr' | 'rtl';
export interface RateProps extends Pick<StarProps, 'count' | 'character' | 'characterRender' | 'allowHalf' | 'disabled'> {
    'prefixCls'?: string;
    'defaultValue'?: number;
    'value'?: number;
    'allowClear'?: boolean;
    'keyboard'?: boolean;
    'direction'?: Direction;
    'tabIndex'?: number | string;
    'autoFocus'?: boolean;
    'onHoverChange'?: (value: number) => void;
    'onChange'?: (value: number) => void;
    'onFocus'?: () => void;
    'onBlur'?: () => void;
    'onKeyDown'?: KeyboardEventHandler;
    'onMouseLeave'?: FocusEventHandler;
    'onUpdate:value'?: (value: number) => void;
    'id'?: string;
}
declare const _default: import('vue').DefineSetupFnComponent<RateProps, {}, {}, RateProps & {}, import('vue').PublicProps>;
export default _default;
