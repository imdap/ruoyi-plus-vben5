import { VueNode } from "../_util/type.js";
import { SemanticClassNamesType, SemanticStylesType } from "../_util/hooks/useMergeSemantic.js";
import "../_util/hooks/index.js";
import { ClosableType } from "../_util/hooks/useClosable.js";
import { AppContext, CSSProperties, HTMLAttributes } from "vue";
import { Key } from "@v-c/util/dist/type";

//#region src/notification/interface.d.ts
interface DivProps extends HTMLAttributes {
  'data-testid'?: string;
}
declare const NotificationPlacements: readonly ["top", "topLeft", "topRight", "bottom", "bottomLeft", "bottomRight"];
type NotificationPlacement = (typeof NotificationPlacements)[number];
type IconType = 'success' | 'info' | 'error' | 'warning';
type NotificationSemanticName = keyof NotificationSemanticClassNames & keyof NotificationSemanticStyles;
interface NotificationSemanticClassNames {
  root?: string;
  title?: string;
  description?: string;
  actions?: string;
  icon?: string;
}
interface NotificationSemanticStyles {
  root?: CSSProperties;
  title?: CSSProperties;
  description?: CSSProperties;
  actions?: CSSProperties;
  icon?: CSSProperties;
}
type NotificationClassNamesType = SemanticClassNamesType<ArgsProps, NotificationSemanticClassNames>;
type NotificationStylesType = SemanticStylesType<ArgsProps, NotificationSemanticStyles>;
interface ArgsProps {
  title?: VueNode;
  description?: VueNode;
  actions?: VueNode;
  key?: Key;
  onClose?: () => void;
  duration?: number | false;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  icon?: VueNode;
  placement?: NotificationPlacement;
  style?: CSSProperties;
  class?: string;
  classes?: NotificationClassNamesType;
  styles?: NotificationStylesType;
  readonly type?: IconType;
  onClick?: () => void;
  closeIcon?: VueNode;
  closable?: boolean | (Exclude<ClosableType, boolean> & {
    onClose?: () => void;
  });
  props?: DivProps;
  role?: 'alert' | 'status';
}
interface NotificationConfig {
  top?: number;
  bottom?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement | ShadowRoot;
  placement?: NotificationPlacement;
  maxCount?: number;
  rtl?: boolean;
  stack?: boolean | {
    threshold?: number;
  };
  duration?: number | false;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  closeIcon?: VueNode;
  classes?: NotificationClassNamesType;
  styles?: NotificationStylesType;
}
type StaticFn = (args: ArgsProps) => void;
interface NotificationInstance {
  success: StaticFn;
  error: StaticFn;
  info: StaticFn;
  warning: StaticFn;
  open: StaticFn;
  destroy: (key?: Key) => void;
}
interface GlobalConfigProps {
  top?: number;
  bottom?: number;
  duration?: number | false;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  prefixCls?: string;
  getContainer?: () => HTMLElement | ShadowRoot;
  placement?: NotificationPlacement;
  closeIcon?: VueNode;
  closable?: ClosableType;
  rtl?: boolean;
  maxCount?: number;
  props?: DivProps;
  appContext?: AppContext;
}
//#endregion
export { ArgsProps, GlobalConfigProps, IconType, NotificationClassNamesType, NotificationConfig, NotificationInstance, NotificationPlacement, NotificationPlacements, NotificationSemanticClassNames, NotificationSemanticName, NotificationSemanticStyles, NotificationStylesType };