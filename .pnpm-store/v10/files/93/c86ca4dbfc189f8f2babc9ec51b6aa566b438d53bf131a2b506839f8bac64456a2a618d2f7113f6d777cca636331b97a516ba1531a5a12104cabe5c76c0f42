import { VueNode } from "../_util/type.js";
import { SemanticClassNamesType, SemanticStylesType } from "../_util/hooks/useMergeSemantic.js";
import "../_util/hooks/index.js";
import { TooltipProps } from "../tooltip/index.js";
import { ComponentBaseProps, DirectionType } from "../config-provider/context.js";
import { CSSProperties } from "vue";
import { TextAreaProps } from "@v-c/textarea";

//#region src/typography/interface.d.ts
type BaseType = 'secondary' | 'success' | 'warning' | 'danger';
interface CopyConfig {
  text?: string | (() => string | Promise<string>);
  onCopy?: (event?: MouseEvent) => void;
  icon?: VueNode | VueNode[];
  tooltips?: VueNode | VueNode[] | false;
  format?: 'text/plain' | 'text/html';
  tabIndex?: number;
}
interface EditConfig {
  text?: string;
  editing?: boolean;
  icon?: VueNode;
  tooltip?: VueNode;
  onStart?: () => void;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  onEnd?: () => void;
  maxLength?: number;
  autoSize?: boolean | TextAreaProps['autoSize'];
  triggerType?: ('icon' | 'text')[];
  enterIcon?: VueNode;
  tabIndex?: number;
}
interface EllipsisConfig {
  rows?: number;
  expandable?: boolean | 'collapsible';
  suffix?: string;
  symbol?: VueNode | ((expanded: boolean) => VueNode);
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpand?: (e: MouseEvent, info: {
    expanded: boolean;
  }) => void;
  onEllipsis?: (ellipsis: boolean) => void;
  tooltip?: VueNode | TooltipProps;
}
interface TypographySemanticClassNames {
  root?: string;
  copy?: string;
  edit?: string;
  expand?: string;
  content?: string;
}
interface TypographySemanticStyles {
  root?: CSSProperties;
  copy?: CSSProperties;
  edit?: CSSProperties;
  expand?: CSSProperties;
  content?: CSSProperties;
}
type TypographyClassNamesType = SemanticClassNamesType<BlockProps, TypographySemanticClassNames>;
type TypographyStylesType = SemanticStylesType<BlockProps, TypographySemanticStyles>;
interface BlockProps extends ComponentBaseProps {
  title?: string;
  editable?: boolean | EditConfig;
  copyable?: boolean | CopyConfig;
  type?: BaseType;
  disabled?: boolean;
  ellipsis?: boolean | EllipsisConfig;
  code?: boolean;
  mark?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  keyboard?: boolean;
  italic?: boolean;
  component?: keyof HTMLElementTagNameMap | string;
  direction?: DirectionType;
  classes?: TypographyClassNamesType;
  styles?: TypographyStylesType;
  id?: string;
  [key: `data-${string}`]: string | number | undefined;
}
interface TypographySlots {
  default?: () => any;
}
interface TypographyBaseEmits {
  'click': (e: MouseEvent) => void;
  'expand': (expanded: boolean, e: MouseEvent) => void;
  'copy': (e?: MouseEvent) => void;
  'edit:start': () => void;
  'edit:change': (value: string) => void;
  'edit:cancel': () => void;
  'edit:end': () => void;
  'update:expanded': (expanded: boolean) => void;
  'update:editing': (editing: boolean) => void;
}
interface TypographyBaseProps extends ComponentBaseProps {
  prefixCls?: string;
  rootClass?: string;
  component?: keyof HTMLElementTagNameMap | string;
  direction?: DirectionType;
  title?: string;
}
//#endregion
export { BaseType, BlockProps, CopyConfig, EditConfig, EllipsisConfig, TypographyBaseEmits, TypographyBaseProps, TypographyClassNamesType, TypographySemanticClassNames, TypographySemanticStyles, TypographySlots, TypographyStylesType };