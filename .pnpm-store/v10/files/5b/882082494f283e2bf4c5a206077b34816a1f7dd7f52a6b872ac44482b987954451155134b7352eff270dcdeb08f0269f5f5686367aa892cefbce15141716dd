import { AnyObject, VueNode } from "../_util/type.js";
import { Breakpoint } from "../_util/responsiveObserver.js";
import { TooltipProps } from "../tooltip/index.js";
import { PaginationEmits } from "../pagination/interface.js";
import { PaginationProps } from "../pagination/index.js";
import { CheckboxProps } from "../checkbox/Checkbox.js";
import "../checkbox/index.js";
import { DropdownProps } from "../dropdown/dropdown.js";
import "../dropdown/index.js";
import { INTERNAL_SELECTION_ITEM } from "./hooks/useSelection.js";
import * as _v_c_table0 from "@v-c/table";
import { ExpandableConfig, FixedType, GetComponentProps, GetRowKey, Reference, RenderedCell } from "@v-c/table";

//#region src/table/interface.d.ts
type Key = string | number;
type SafeKey = Exclude<Key, bigint>;
type RowSelectionType = 'checkbox' | 'radio';
type SelectionItemSelectFn = (currentRowKeys: Key[]) => void;
type ExpandType = null | 'row' | 'nest';
interface TableLocale {
  filterTitle?: VueNode;
  filterConfirm?: VueNode;
  filterReset?: VueNode;
  filterEmptyText?: VueNode;
  /**
   * @deprecated Please use `filterCheckAll` instead.
   */
  filterCheckall?: VueNode;
  filterCheckAll?: VueNode;
  filterSearchPlaceholder?: string;
  emptyText?: VueNode | (() => VueNode);
  selectAll?: VueNode;
  selectNone?: VueNode;
  selectInvert?: VueNode;
  selectionAll?: VueNode;
  sortTitle?: string;
  expand?: string;
  collapse?: string;
  triggerDesc?: string;
  triggerAsc?: string;
  cancelSort?: string;
}
type SortOrder = 'descend' | 'ascend' | null;
type SorterTooltipTarget = 'full-header' | 'sorter-icon';
type SorterTooltipProps = TooltipProps & {
  target?: SorterTooltipTarget;
};
declare const _TableActions: readonly ["paginate", "sort", "filter"];
type TableAction = (typeof _TableActions)[number];
type CompareFn<T = AnyObject> = (a: T, b: T, sortOrder?: SortOrder) => number;
interface ColumnFilterItem {
  text: VueNode;
  value: Key | boolean;
  children?: ColumnFilterItem[];
}
interface ColumnTitleProps<RecordType = AnyObject> {
  /** @deprecated Will be remove in v7, Please use `sorterColumns` instead. */
  sortOrder?: SortOrder;
  /** @deprecated Will be remove in v7, Please use `sorterColumns` instead. */
  sortColumn?: ColumnType<RecordType>;
  sortColumns?: {
    column: ColumnType<RecordType>;
    order: SortOrder;
  }[];
  filters?: Record<string, FilterValue>;
}
type ColumnTitle<RecordType = AnyObject> = any | ((props: ColumnTitleProps<RecordType>) => any);
type FilterValue = (Key | boolean)[];
type FilterKey = (string | number)[] | null;
type FilterSearchType<RecordType = AnyObject> = boolean | ((input: string, record: RecordType) => boolean);
interface FilterConfirmProps {
  closeDropdown: boolean;
}
interface FilterRestProps {
  confirm?: boolean;
  closeDropdown?: boolean;
}
interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (selectedKeys: Key[]) => void;
  selectedKeys: Key[];
  /**
   * Confirm filter value, if you want to close dropdown before commit, you can call with
   * {closeDropdown: true}
   */
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters?: (param?: FilterRestProps) => void;
  filters?: ColumnFilterItem[];
  /** Only close filterDropdown */
  close: () => void;
  visible: boolean;
}
interface CoverableDropdownProps extends DropdownProps {
  onOpenChange?: (open: boolean) => void;
}
interface ColumnType<RecordType = AnyObject> extends Omit<_v_c_table0.ColumnType<RecordType>, 'title'> {
  title?: ColumnTitle<RecordType>;
  sorter?: boolean | CompareFn<RecordType> | {
    compare?: CompareFn<RecordType>; /** Config multiple sorter order priority */
    multiple?: number;
  };
  sortOrder?: SortOrder;
  defaultSortOrder?: SortOrder;
  sortDirections?: SortOrder[];
  sortIcon?: (props: {
    sortOrder: SortOrder;
  }) => VueNode;
  showSorterTooltip?: boolean | SorterTooltipProps;
  filtered?: boolean;
  filters?: ColumnFilterItem[];
  filterDropdown?: VueNode | ((props: FilterDropdownProps) => VueNode);
  filterOnClose?: boolean;
  filterMultiple?: boolean;
  filteredValue?: FilterValue | null;
  defaultFilteredValue?: FilterValue | null;
  filterIcon?: VueNode | ((filtered: boolean) => VueNode);
  filterMode?: 'menu' | 'tree';
  filterSearch?: FilterSearchType<ColumnFilterItem>;
  onFilter?: (value: Key | boolean, record: RecordType) => boolean;
  /**
   * Can cover `<Dropdown>` props
   * @since 5.22.0
   */
  filterDropdownProps?: CoverableDropdownProps;
  filterResetToDefaultFilteredValue?: boolean;
  responsive?: Breakpoint[];
  /**
   * @deprecated Please use `filterDropdownProps.open` instead.
   * @since 4.23.0
   */
  filterDropdownOpen?: boolean;
  /**
   * @deprecated Please use `filterDropdownProps.onOpenChange` instead.
   * @since 4.23.0
   */
  onFilterDropdownOpenChange?: (visible: boolean) => void;
}
interface ColumnGroupType<RecordType = AnyObject> extends Omit<ColumnType<RecordType>, 'dataIndex'> {
  children: ColumnsType<RecordType>;
}
type ColumnsType<RecordType = AnyObject> = (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];
interface SelectionItem {
  key: string;
  text: VueNode;
  onSelect?: SelectionItemSelectFn;
}
type SelectionSelectFn<T = AnyObject> = (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void;
type RowSelectMethod = 'all' | 'none' | 'invert' | 'single' | 'multiple';
interface TableRowSelection<T = AnyObject> {
  /** Keep the selection keys in list even the key not exist in `dataSource` anymore */
  preserveSelectedRowKeys?: boolean;
  type?: RowSelectionType;
  selectedRowKeys?: Key[];
  defaultSelectedRowKeys?: Key[];
  onChange?: (selectedRowKeys: Key[], selectedRows: T[], info: {
    type: RowSelectMethod;
  }) => void;
  getCheckboxProps?: (record: T) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
  onSelect?: SelectionSelectFn<T>;
  /** @deprecated This function will be remove in v7 and should use `onChange` instead */
  onSelectMultiple?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  /** @deprecated This function will be remove in v7 and should use `onChange` instead */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  /** @deprecated This function will be remove in v7 and should use `onChange` instead */
  onSelectInvert?: (selectedRowKeys: Key[]) => void;
  /** @deprecated This function will be remove in v7 and should use `onChange` instead */
  onSelectNone?: () => void;
  selections?: INTERNAL_SELECTION_ITEM[] | boolean;
  hideSelectAll?: boolean;
  fixed?: FixedType;
  columnWidth?: string | number;
  columnTitle?: VueNode | ((checkboxNode: VueNode) => VueNode);
  checkStrictly?: boolean;
  /** Set the alignment of the selection column */
  align?: 'left' | 'center' | 'right';
  renderCell?: (value: boolean, record: T, index: number, originNode: VueNode) => VueNode | RenderedCell<T>;
  onCell?: GetComponentProps<T>;
  getTitleCheckboxProps?: () => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
}
type TransformColumns<RecordType = AnyObject> = (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>;
interface TableCurrentDataSource<RecordType = AnyObject> {
  currentDataSource: RecordType[];
  action: TableAction;
}
interface SorterResult<RecordType = AnyObject> {
  column?: ColumnType<RecordType>;
  order?: SortOrder;
  field?: Key | readonly Key[];
  columnKey?: Key;
}
type GetPopupContainer = (triggerNode: HTMLElement) => HTMLElement;
type TablePaginationPlacement = 'topStart' | 'topCenter' | 'topEnd' | 'bottomStart' | 'bottomCenter' | 'bottomEnd' | 'none';
type TablePaginationPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'none';
interface TablePaginationConfig extends PaginationProps {
  placement?: TablePaginationPlacement[];
  /** @deprecated please use `placement` instead */
  position?: TablePaginationPosition[];
  onChange?: PaginationEmits['change'];
  onShowSizeChange?: PaginationEmits['showSizeChange'];
}
//#endregion
export { ColumnFilterItem, ColumnGroupType, ColumnTitle, ColumnTitleProps, ColumnType, ColumnsType, CompareFn, CoverableDropdownProps, ExpandType, type ExpandableConfig, FilterConfirmProps, FilterDropdownProps, FilterKey, FilterRestProps, FilterSearchType, FilterValue, GetPopupContainer, type GetRowKey, Key, type Reference, RowSelectMethod, RowSelectionType, SafeKey, SelectionItem, SelectionItemSelectFn, SelectionSelectFn, SortOrder, SorterResult, SorterTooltipProps, SorterTooltipTarget, TableAction, TableCurrentDataSource, TableLocale, TablePaginationConfig, TablePaginationPlacement, TablePaginationPosition, TableRowSelection, TransformColumns };