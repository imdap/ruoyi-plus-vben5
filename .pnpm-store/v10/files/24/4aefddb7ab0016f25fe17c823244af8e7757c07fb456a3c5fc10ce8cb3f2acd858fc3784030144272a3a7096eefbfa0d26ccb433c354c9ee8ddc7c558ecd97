import { VueNode } from "../_util/type.js";
import { SemanticClassNamesType, SemanticStylesType } from "../_util/hooks/useMergeSemantic.js";
import "../_util/hooks/index.js";
import { SizeType } from "../config-provider/SizeContext.js";
import { SelectProps } from "../select/index.js";
import { CSSProperties } from "vue";
import { PaginationProps as PaginationProps$1 } from "@v-c/pagination";

//#region src/pagination/interface.d.ts
interface PaginationLocale {
  items_per_page?: string;
  jump_to?: string;
  jump_to_confirm?: string;
  page?: string;
  prev_page?: string;
  next_page?: string;
  prev_5?: string;
  next_5?: string;
  prev_3?: string;
  next_3?: string;
  page_size?: string;
}
type SemanticName = keyof PaginationSemanticClassNames & keyof PaginationSemanticStyles;
type PaginationSemanticName = SemanticName;
interface PaginationSemanticClassNames {
  root?: string;
  item?: string;
}
interface PaginationSemanticStyles {
  root?: CSSProperties;
  item?: CSSProperties;
}
type PaginationClassNamesType = SemanticClassNamesType<PaginationProps, PaginationSemanticClassNames>;
type PaginationStylesType = SemanticStylesType<PaginationProps, PaginationSemanticStyles>;
interface PaginationProps extends Omit<PaginationProps$1, 'className' | 'style' | 'classNames' | 'styles' | 'locale' | 'showSizeChanger' | 'pageSizeOptions' | 'prevIcon' | 'nextIcon' | 'jumpPrevIcon' | 'jumpNextIcon' | 'onChange' | 'onShowSizeChange'> {
  showQuickJumper?: boolean | {
    goButton?: VueNode;
  };
  size?: SizeType;
  responsive?: boolean;
  totalBoundaryShowSizeChanger?: number;
  rootClass?: string;
  showSizeChanger?: boolean | SelectProps;
  pageSizeOptions?: (string | number)[];
  classes?: PaginationClassNamesType;
  styles?: PaginationStylesType;
  locale?: PaginationLocale;
  prevIcon?: VueNode;
  nextIcon?: VueNode;
  jumpPrevIcon?: VueNode;
  jumpNextIcon?: VueNode;
  /** @deprecated Not official support. Will be removed in next major version. */
  selectComponentClass?: any;
}
type PaginationPosition = 'top' | 'bottom' | 'both';
interface PaginationConfig extends Omit<PaginationProps, 'rootClass'> {
  position?: PaginationPosition;
}
interface PaginationEmits {
  'change': (page: number, pageSize: number) => void;
  'showSizeChange': (current: number, size: number) => void;
  'update:current': (page: number) => void;
  'update:pageSize': (size: number) => void;
}
interface PaginationSlots {
  itemRender?: (ctx: {
    page: number;
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';
    element: VueNode;
  }) => any;
  showTotal?: (ctx: {
    total: number;
    range: [number, number];
  }) => any;
  prevIcon?: () => any;
  nextIcon?: () => any;
  jumpPrevIcon?: () => any;
  jumpNextIcon?: () => any;
}
//#endregion
export { PaginationClassNamesType, PaginationConfig, PaginationEmits, PaginationLocale, PaginationPosition, PaginationProps, PaginationSemanticClassNames, PaginationSemanticName, PaginationSemanticStyles, PaginationSlots, PaginationStylesType, SemanticName };