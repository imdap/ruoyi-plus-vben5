import { CSSProperties } from 'vue';
import { RenderNode } from './interface.ts';
export interface TransBtnProps {
    className: string;
    style?: CSSProperties;
    customizeIcon?: RenderNode;
    customizeIconProps?: any;
    onMouseDown?: (event: MouseEvent) => void;
    onClick?: (event: MouseEvent) => void;
}
/**
 * Small wrapper for Select icons (clear/arrow/etc.).
 * Prevents default mousedown to avoid blurring or caret moves, and
 * renders a custom icon or a fallback icon span.
 *
 * DOM structure:
 * <span className={className} ...>
 *   { icon || <span className={`${className}-icon`}>{children}</span> }
 * </span>
 */
declare const TransBtn: import('vue').DefineSetupFnComponent<TransBtnProps, {}, {}, TransBtnProps & {}, import('vue').PublicProps>;
export default TransBtn;
