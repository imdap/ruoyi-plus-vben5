import { VueNode } from "../_util/type.js";
import { SemanticClassNamesType, SemanticStylesType } from "../_util/hooks/useMergeSemantic.js";
import { Orientation } from "../_util/hooks/useOrientation.js";
import "../_util/hooks/index.js";
import { ShowCollapsibleIconMode } from "./SplitBar.js";
import { ComponentBaseProps } from "../config-provider/context.js";
import { CSSProperties } from "vue";

//#region src/splitter/interface.d.ts
type SplitterSemanticName = keyof SplitterSemanticClassNames & keyof SplitterSemanticStyles;
interface SplitterSemanticClassNames {
  root?: string;
  panel?: string;
}
interface SplitterSemanticStyles {
  root?: CSSProperties;
  panel?: CSSProperties;
}
type DraggerSemantic = keyof DraggerSemanticClassNames & keyof DraggerSemanticStyles;
interface DraggerSemanticClassNames {
  default?: string;
  active?: string;
}
interface DraggerSemanticStyles {
  default?: CSSProperties;
  active?: CSSProperties;
}
interface SplitterSemanticDraggerClassNames {
  default?: string;
  active?: string;
}
type SplitterClassNamesType = SemanticClassNamesType<SplitterProps, SplitterSemanticClassNames, {
  dragger?: string | DraggerSemanticClassNames;
}>;
type SplitterStylesType = SemanticStylesType<SplitterProps, SplitterSemanticStyles, {
  dragger?: CSSProperties | DraggerSemanticStyles;
}>;
interface SplitterProps extends ComponentBaseProps {
  classes?: SplitterClassNamesType;
  styles?: SplitterStylesType;
  /**
   * @deprecated please use `orientation`
   * @default horizontal
   */
  layout?: Orientation;
  orientation?: Orientation;
  vertical?: boolean;
  draggerIcon?: VueNode;
  collapsibleIcon?: {
    start?: VueNode;
    end?: VueNode;
  };
  onDraggerDoubleClick?: (index: number) => void;
  onResizeStart?: (sizes: number[]) => void;
  onResize?: (sizes: number[]) => void;
  onResizeEnd?: (sizes: number[]) => void;
  onCollapse?: (collapsed: boolean[], sizes: number[]) => void;
  'onUpdate:collapse'?: (collapsed: boolean[]) => void;
  lazy?: boolean;
}
interface SplitterEmits {}
interface SplitterSlots {
  draggerIcon?: () => any;
  collapsibleIconStart?: () => any;
  collapsibleIconEnd?: () => any;
  default?: () => any;
}
interface PanelProps {
  class?: string;
  style?: CSSProperties;
  min?: number | string;
  max?: number | string;
  size?: number | string;
  collapsible?: boolean | {
    start?: boolean;
    end?: boolean;
    showCollapsibleIcon?: ShowCollapsibleIconMode;
  };
  resizable?: boolean;
  defaultSize?: number | string;
}
interface InternalPanelProps extends PanelProps {
  class?: string;
  prefixCls?: string;
}
interface UseResizeProps {
  basicsState: number[];
  items: PanelProps[];
  panelsRef: Array<{
    current: HTMLElement | null;
  }>;
  reverse: boolean;
  setBasicsState: (value: number[] | ((prevState: number[]) => number[])) => void;
  onResize: (sizes: number[]) => void;
}
interface UseResize {
  setSize: (data: {
    size: number;
    index: number;
  }[]) => void;
  setOffset: (offset: number, containerSize: number, index: number) => void;
}
interface UseHandleProps extends Pick<SplitterProps, 'layout'> {
  basicsState: number[];
  containerRef?: {
    current: HTMLDivElement | null;
  };
  setOffset: UseResize['setOffset'];
  setResizing: (value: boolean | ((prevState: boolean) => boolean)) => void;
  onResizeStart: (sizes: number[]) => void;
  onResizeEnd: (sizes: number[]) => void;
}
interface UseHandle {
  onStart: (x: number, y: number, index: number) => void;
}
interface UseCollapsibleProps {
  basicsState: number[];
  collapsible?: PanelProps['collapsible'];
  index: number;
  reverse: boolean;
  setSize?: UseResize['setSize'];
}
interface UseCollapsible {
  nextIcon: boolean;
  overlap: boolean;
  previousIcon: boolean;
  onFold: (type: 'previous' | 'next') => void;
  setOldBasics: () => void;
}
//#endregion
export { DraggerSemantic, DraggerSemanticClassNames, DraggerSemanticStyles, InternalPanelProps, PanelProps, SplitterClassNamesType, SplitterEmits, SplitterProps, SplitterSemanticClassNames, SplitterSemanticDraggerClassNames, SplitterSemanticName, SplitterSemanticStyles, SplitterSlots, SplitterStylesType, UseCollapsible, UseCollapsibleProps, UseHandle, UseHandleProps, UseResize, UseResizeProps };