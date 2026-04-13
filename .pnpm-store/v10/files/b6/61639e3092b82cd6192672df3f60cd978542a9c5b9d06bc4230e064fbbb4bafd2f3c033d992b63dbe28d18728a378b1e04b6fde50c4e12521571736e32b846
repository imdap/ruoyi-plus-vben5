import { VueNode } from "../_util/type.js";
import { SemanticClassNames, SemanticClassNamesType, SemanticStyles, SemanticStylesType } from "../_util/hooks/useMergeSemantic.js";
import "../_util/hooks/index.js";
import { ComponentBaseProps } from "../config-provider/context.js";
import { CSSProperties } from "vue";
import { TourProps as TourProps$1, TourStepProps as TourStepProps$1 } from "@v-c/tour";

//#region src/tour/interface.d.ts
type TourSemanticName = keyof TourSemanticClassNames & keyof TourSemanticStyles;
interface TourSemanticClassNames {
  root?: string;
  cover?: string;
  mask?: string;
  section?: string;
  footer?: string;
  actions?: string;
  indicator?: string;
  indicators?: string;
  header?: string;
  title?: string;
  description?: string;
}
interface TourSemanticStyles {
  root?: CSSProperties;
  cover?: CSSProperties;
  mask?: CSSProperties;
  section?: CSSProperties;
  footer?: CSSProperties;
  actions?: CSSProperties;
  indicator?: CSSProperties;
  indicators?: CSSProperties;
  header?: CSSProperties;
  title?: CSSProperties;
  description?: CSSProperties;
}
type TourClassNamesType = SemanticClassNamesType<TourProps, TourSemanticClassNames>;
type TourStylesType = SemanticStylesType<TourProps, TourSemanticStyles>;
interface TourProps extends ComponentBaseProps, Omit<TourProps$1, 'classNames' | 'styles' | 'renderPanel' | 'rootClassName' | 'onClose' | 'onFinish' | 'onChange' | 'onPopupAlign' | 'className'> {
  steps?: TourStepProps[];
  prefixCls?: string;
  current?: number;
  indicatorsRender?: (current: number, total: number) => any;
  actionsRender?: TourStepProps['actionsRender'];
  type?: 'default' | 'primary';
  classes?: TourClassNamesType;
  styles?: TourStylesType;
}
interface TourEmits {
  'change': (current: number) => void;
  'close': (current: number) => void;
  'finish': () => void;
  'update:open': (open: boolean) => void;
  'update:current': (current: number) => void;
  'popupAlign': (el: HTMLElement, info: any) => void;
}
interface TourSlots {
  actionsRender: (originNode: any, info: {
    current: number;
    total: number;
  }) => any;
  indicatorsRender: (current: number, total: number) => any;
  nextButton: (params: {
    current: number;
    isFirst: boolean;
    isLast: boolean;
  }) => any;
  prevButton: (params: {
    current: number;
    isFirst: boolean;
    isLast: boolean;
  }) => any;
  coverRender: (params: {
    step: TourStepProps;
    index: number;
  }) => any;
  titleRender: (params: {
    step: TourStepProps;
    index: number;
  }) => any;
  descriptionRender: (params: {
    step: TourStepProps;
    index: number;
  }) => any;
}
interface TourStepProps extends Omit<TourStepProps$1, 'className'> {
  cover?: VueNode;
  nextButtonProps?: {
    children?: VueNode;
    onClick?: () => void;
    class?: string;
    style?: CSSProperties;
  };
  prevButtonProps?: {
    children?: VueNode;
    onClick?: () => void;
    class?: string;
    style?: CSSProperties;
  };
  indicatorsRender?: (current: number, total: number) => any;
  actionsRender?: (originNode: any, info: {
    current: number;
    total: number;
  }) => any;
  type?: 'default' | 'primary';
  classes?: SemanticClassNames<TourSemanticName>;
  styles?: SemanticStyles<TourSemanticName>;
  class?: string;
}
interface TourLocale {
  Next: string;
  Previous: string;
  Finish: string;
}
//#endregion
export { TourClassNamesType, TourEmits, TourLocale, TourProps, TourSemanticClassNames, TourSemanticName, TourSemanticStyles, TourSlots, TourStepProps, TourStylesType };