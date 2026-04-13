import { MaskType } from "../_util/hooks/useMergedMask.js";
import { VueNode } from "../_util/type.js";
import { SemanticClassNamesType, SemanticStylesType } from "../_util/hooks/useMergeSemantic.js";
import "../_util/hooks/index.js";
import { Breakpoint } from "../_util/responsiveObserver.js";
import { ClosableType } from "../_util/hooks/useClosable.js";
import { FocusableConfig, OmitFocusType } from "../drawer/useFocusable.js";
import { DirectionType } from "../config-provider/context.js";
import { ButtonProps, LegacyButtonType } from "../button/Button.js";
import "../button/index.js";
import { AppContext, CSSProperties } from "vue";
import { DialogProps } from "@v-c/dialog";

//#region src/modal/interface.d.ts
type ModalSemanticName = keyof ModalSemanticClassNames & keyof ModalSemanticStyles;
interface ModalSemanticClassNames {
  root?: string;
  header?: string;
  body?: string;
  footer?: string;
  container?: string;
  title?: string;
  wrapper?: string;
  mask?: string;
}
interface ModalSemanticStyles {
  root?: CSSProperties;
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
  container?: CSSProperties;
  title?: CSSProperties;
  wrapper?: CSSProperties;
  mask?: CSSProperties;
}
type ModalClassNamesType = SemanticClassNamesType<ModalProps, ModalSemanticClassNames>;
type ModalStylesType = SemanticStylesType<ModalProps, ModalSemanticStyles>;
interface ModalCommonProps extends Omit<DialogProps, 'footer' | 'width' | 'onClose' | 'animation' | 'maskAnimation' | 'transitionName' | 'maskTransitionName' | 'mask' | 'classNames' | 'styles' | 'modalRender' | 'rootStyle' | 'style' | OmitFocusType> {
  footer?: VueNode | ((params: {
    originNode: VueNode;
    extra: {
      OkBtn: any;
      CancelBtn: any;
    };
  }) => any);
  closable?: boolean | (Exclude<ClosableType, boolean> & {
    onClose?: () => void;
    afterClose?: () => void;
  });
  classes?: ModalClassNamesType;
  styles?: ModalStylesType;
}
type getContainerFunc = () => HTMLElement;
interface ModalProps extends ModalCommonProps {
  /** Whether the modal dialog is visible or not */
  open?: boolean;
  /** Whether to apply loading visual effect for OK button or not */
  confirmLoading?: boolean;
  /** The modal dialog's title */
  title?: VueNode;
  afterClose?: () => void;
  /** Callback when the animation ends when Modal is turned on and off */
  afterOpenChange?: (open: boolean) => void;
  /** Centered Modal */
  centered?: boolean;
  /** Width of the modal dialog */
  width?: string | number | Partial<Record<Breakpoint, string | number>>;
  /** Text of the OK button */
  okText?: VueNode;
  /** Button `type` of the OK button */
  okType?: LegacyButtonType;
  /** Text of the Cancel button */
  cancelText?: VueNode;
  /** Force render Modal */
  forceRender?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  /** @deprecated Please use `destroyOnHidden` instead */
  destroyOnClose?: boolean;
  /**
   * @since 5.25.0
   */
  destroyOnHidden?: boolean;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  rootClass?: string;
  rootStyle?: CSSProperties;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  zIndex?: number;
  /** @deprecated Please use `styles.body` instead */
  bodyStyle?: CSSProperties;
  /** @deprecated Please use `styles.mask` instead */
  maskStyle?: CSSProperties;
  mask?: MaskType;
  /**
   * @deprecated Please use `mask.closable` instead
   * @description Whether to close the modal dialog when the mask (area outside the modal) is clicked
   */
  maskClosable?: boolean;
  keyboard?: boolean;
  wrapProps?: any;
  prefixCls?: string;
  closeIcon?: VueNode;
  modalRender?: (node: any) => any;
  focusTriggerAfterClose?: boolean;
  mousePosition?: MousePosition;
  /**
   * @since 5.18.0
   */
  loading?: boolean;
  focusable?: FocusableConfig;
}
interface ModalEmits {
  /** Specify a function that will be called when a user clicks the OK button */
  'ok': (e: MouseEvent) => void;
  /** Specify a function that will be called when a user clicks mask, close button on top right or Cancel button, or presses Esc key */
  'cancel': (e: MouseEvent | KeyboardEvent) => void;
  'update:open': (open: boolean) => void;
}
interface ModalSlots {
  title?: () => any;
  okText?: () => any;
  cancelText?: () => any;
  closeIcon?: () => any;
  modalRender?: (node: any) => any;
  footer?: (params: {
    originNode: VueNode;
    extra: {
      OkBtn: any;
      CancelBtn: any;
    };
  }) => any;
  default?: () => any;
}
interface ModalFuncProps extends ModalCommonProps {
  prefixCls?: string;
  class?: string;
  rootClass?: string;
  open?: boolean;
  title?: VueNode;
  content?: VueNode;
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  onClose?: DialogProps['onClose'];
  afterClose?: () => void;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  centered?: boolean;
  width?: string | number;
  okText?: VueNode;
  okType?: LegacyButtonType;
  cancelText?: VueNode;
  icon?: VueNode;
  mask?: MaskType;
  maskClosable?: boolean;
  zIndex?: number;
  okCancel?: boolean;
  style?: CSSProperties;
  wrapClassName?: string;
  /** @deprecated Please use `styles.mask` instead */
  maskStyle?: CSSProperties;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  keyboard?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  autoFocusButton?: null | 'ok' | 'cancel';
  transitionName?: string;
  maskTransitionName?: string;
  direction?: DirectionType;
  /** @deprecated Please use `styles.body` instead */
  bodyStyle?: CSSProperties;
  closeIcon?: VueNode;
  footer?: ModalProps['footer'];
  modalRender?: ModalProps['modalRender'];
  focusTriggerAfterClose?: boolean;
  appContext?: AppContext;
}
interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}
type MousePosition = {
  x: number;
  y: number;
} | null;
//#endregion
export { ModalClassNamesType, ModalEmits, ModalFuncProps, ModalLocale, ModalProps, ModalSemanticClassNames, ModalSemanticName, ModalSemanticStyles, ModalSlots, ModalStylesType, MousePosition };