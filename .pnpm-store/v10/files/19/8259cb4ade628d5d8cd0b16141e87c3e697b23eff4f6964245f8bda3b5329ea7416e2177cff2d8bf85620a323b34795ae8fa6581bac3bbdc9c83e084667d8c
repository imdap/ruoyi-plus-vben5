import { VxeComponentEventParams } from '@vxe-ui/core'
import { VxeTableDefines, VxeTableConstructor } from '../table'
import { VxeGridConstructor } from '../grid'
import { VxeColumnPropTypes } from '../column'
import { VxeModalConstructor, VxeModalMethods } from '../modal'

/* eslint-disable @typescript-eslint/no-empty-interface,no-use-before-define,@typescript-eslint/no-unused-vars */

export interface VxeTableExtendCellAreaMethods<D = any> {
  /**
   * 用于 mouse-config.area，用于获取鼠标选择的区域
   */
  getCellAreas(): VxeTableExtendCellAreaDefines.MouseCellArea[]
  /**
   * 用于 mouse-config.area，用于获取区域中的活动单元格
   */
  getActiveCellArea(): VxeTableExtendCellAreaDefines.MouseActiveCellArea | null
  /**
   * 被 getCopyCellAreas 替换
   * @deprecated
   */
  getCopyCellArea(): VxeTableExtendCellAreaDefines.MouseCellArea | null
  /**
   * 用于 mouse-config.area，复制指定区域，返回转换后的文本
   */
  getCopyCellAreas(): VxeTableExtendCellAreaDefines.MouseCellArea[]
  /**
   * 用于 mouse-config.area，复制指定区域，返回转换后的文本
   */
  copyCellArea(): { text: string, html: string }
  /**
   * 用于 mouse-config.area，剪贴指定区域，返回转换后的文本
   */
  cutCellArea(): { text: string, html: string }
  /**
   * 用于 mouse-config.area，粘贴从表格中被复制的数据，如果不是从表格中操作，则无法粘贴
   */
  pasteCellArea(): Promise<any>
  /**
   * 用于 mouse-config.area，用于清除鼠标选择的区域，可以指定清除的区域
   */
  clearCellAreas(area?: number | VxeTableExtendCellAreaDefines.MouseCellArea): Promise<any>
  /**
   * 用于 mouse-config.area，手动清除标记为复制粘贴的区域
   */
  clearCopyCellArea(): Promise<any>
  /**
   * 用于 mouse-config.area，选取指定区域的单元格
   * @param areaConfigs 指定区域
   */
  setCellAreas(areaConfigs: VxeTableExtendCellAreaDefines.CellAreaConfig[], activeArea?: {
    area?: number | VxeTableExtendCellAreaDefines.CellAreaConfig<D>
    column?: number | VxeTableDefines.ColumnInfo<D>
    row?: D | number
  }): Promise<any>
  /**
   * 用于 mouse-config.area，设置活动的区域的单元格
   * @param activeArea
   */
  setActiveCellArea(activeArea: VxeTableExtendCellAreaDefines.ActiveCellAreaConfig): Promise<any>
  /**
   * 打开单元格查找窗口
   */
  openFind(): Promise<any>
  /**
   * 打开单元格替换窗口
   */
  openReplace(): Promise<any>
  /**
   * 手动打开查找与替换窗口
   */
  openFNR(options: {
    type?: 'find' | 'replace' | '' | null
  }): Promise<any>
  /**
   * 手动关闭查找与替换窗口
   */
  closeFNR(): Promise<any>
}

export interface VxeTableExtendCellAreaPrivateMethods<D = any> {
  /**
   * @private
   */
  handleKeyboardCellAreaEvent(evnt: KeyboardEvent): void
  /**
   * @private
   */
  handleHeaderCellAreaMouseDnEvent(evnt: MouseEvent, params: VxeTableDefines.HeaderCellClickEventParams<D>): void
  /**
   * @private
   */
  triggerClAreaModnEvent(evnt: MouseEvent, params: VxeTableDefines.CellClickEventParams<D>): void
  /**
   * @private
   */
  handleFilterEvent(evnt: Event, params: VxeTableDefines.FilterChangeEventParams<D>): any
  /**
   * @private
   */
  handleSortEvent(evnt: Event, params: VxeTableDefines.SortChangeEventParams<D>): any
  /**
   * @private
   */
  handleRecalculateCellAreaEvent(): any
  /**
   * @private
   */
  handleCyClAreaEvent(evnt: ClipboardEvent): void
  /**
   * @private
   */
  handlePeClAreaEvent(evnt: ClipboardEvent): void
  /**
   * @private
   */
  handleCutCellAreaEvent(evnt: ClipboardEvent): void
  /**
   * @private
   */
  handleColResizeCellAreaEvent(evnt: MouseEvent, params: any): void
  /**
   * @private
   */
  handleColResizeDblclickCellAreaEvent(evnt: MouseEvent, params: any): void
  /**
   * @private
   */
  handleRowResizeCellAreaEvent(evnt: MouseEvent, params: any): void
  /**
   * @private
   */
  handleRowResizeDblclickCellAreaEvent(evnt: MouseEvent, params: any): void
  /**
   * @private
   */
  triggerCellAreaExtendMousedownEvent(evnt: MouseEvent, params: any): void
  /**
   * @private
   */
  triggerCopyCellAreaEvent(evnt: MouseEvent): void
  /**
   * @private
   */
  triggerCutCellAreaEvent(evnt: MouseEvent): void
  /**
   * @private
   */
  triggerPasteCellAreaEvent(evnt: MouseEvent): void
  /**
   * @private
   */
  triggerFNROpenEvent(evnt: MouseEvent, tab: 'find' | 'replace'): void
}

declare module '../table' {
  export interface TableInternalData<D = any> {
    fnrStore?: {
      visible: boolean
      activeTab: string
      findValue: string
      replaceValue: string
      isRE: boolean
      isWhole: boolean
      isSensitive: boolean
      showREErr: boolean
      showCount: boolean
      findCellRE: RegExp | null
      findCount: number
    }
    fnrTabs?: VxeTableExtendCellAreaDefines.FNRTab[]
    fnrSearchList?: VxeTableExtendCellAreaDefines.FNRSearch[]
    azIndex?: number
    fnrActiveModal?: (VxeModalConstructor & VxeModalMethods) | null

    copyAreaMpas?: {
      cut: boolean
      cellAreas: VxeTableExtendCellAreaDefines.MouseCellArea[]
      _c?: boolean
      _r?: boolean
    } | null

    trialElem?: HTMLElement | null

    _msTout?: any
    _isCAEd?: boolean

    isDragcellArea?: boolean
    isDragcellExtend?: boolean

    cellAreas?: VxeTableExtendCellAreaDefines.MouseCellArea<D>[] | null
    activeCellArea?: VxeTableExtendCellAreaDefines.MouseActiveCellArea | null
  }
  export interface VxeTableMethods<D = any> extends VxeTableExtendCellAreaMethods<D> { }
  export interface VxeTablePrivateMethods<D = any> extends VxeTableExtendCellAreaPrivateMethods<D> { }
}

declare module '../grid' {
  export interface VxeGridMethods<D = any> extends VxeTableExtendCellAreaMethods<D> { }
  export interface VxeGridPrivateMethods<D = any> extends VxeTableExtendCellAreaPrivateMethods<D> { }
}

export namespace VxeTableExtendCellAreaDefines {
  export interface CellAreaParams<D = any> {
    cols: VxeTableDefines.ColumnInfo<D>[]
    rows: D[]
  }

  export interface FNRTab {
    value: string
    label: string
  }

  export interface FNRSearch {
    seq: number
    row: number
    col: number
    isActived: boolean
    value: string
  }

  export interface MouseActiveCellArea<D = any> {
    el?: HTMLElement | null
    type: CELL_AREA_TYPE
    area: MouseCellArea<D>
    row: any
    column: VxeTableDefines.ColumnInfo<D>
    top: number
    left: number
    width: number
    height: number
  }

  export interface MouseCellArea<D = any> {
    el?: HTMLElement | null
    leftEl?: HTMLElement | null
    rightEl?: HTMLElement | null
    type: CELL_AREA_TYPE
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    top: number
    left: number
    width: number
    height: number
  }

  export type CELL_AREA_TYPE = 'main' | 'copy' | 'extend' | 'multi' | 'active'

  export interface CellAreaConfig<D = any> {
    type?: CELL_AREA_TYPE
    startColumn: VxeTableDefines.ColumnInfo<D> | VxeColumnPropTypes.Field | number
    endColumn: VxeTableDefines.ColumnInfo<D> | VxeColumnPropTypes.Field | number
    startRow: D | number
    endRow: D | number
  }

  export interface ActiveCellAreaConfig<D = any> {
    area: VxeTableExtendCellAreaDefines.MouseCellArea<D> | number
    column: VxeTableDefines.ColumnInfo<D> | VxeColumnPropTypes.Field | number
    row: D | number
  }

  export type ExtendCellAreaDirection = 'up' | 'down' | 'left' | 'right'

  export interface ExtendCellAreaCalcBaseParams<D = any> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    targetValues: any[][]
    targetRows: any[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
    extendRows: any[]
    extendCols: VxeTableDefines.ColumnInfo<D>[]
    direction: ExtendCellAreaDirection
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }

  interface EventParams<D = any> extends VxeComponentEventParams {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }

  type FnrTab = 'find' | 'replace'

  export interface OpenFnrParams<D = any> {
    tab: FnrTab
  }
  export interface OpenFnrEventParams<D = any> extends EventParams<D>, OpenFnrParams { }

  export type FnrChangeParams<D = any> = OpenFnrParams<D>
  export interface FnrChangeEventParams<D = any> extends EventParams<D>, FnrChangeParams { }

  export interface FnrFindParams<D = any> {
    findValue: string
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type FnrFindEventParams<D = any> = FnrFindParams<D>

  export interface FindAndReplaceResult<D = any> {
    row: D
    _rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    _columnIndex: number
  }

  export interface FnrFindAllParams<D = any> {
    findValue: string
    result: FindAndReplaceResult<D>[]
  }
  export type FnrFindAllEventParams<D = any> = FnrFindAllParams<D>

  export interface FnrReplaceParams<D = any> {
    findValue: string
    replaceValue: string
    row: any
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type FnrReplaceEventParams<D = any> = FnrReplaceParams<D>

  export interface FnrReplaceAllParams<D = any> {
    findValue: string
    replaceValue: string
    result: FindAndReplaceResult<D>[]
  }
  export type FnrReplaceAllEventParams<D = any> = FnrReplaceAllParams<D>

  export interface CellAreaCopyParams<D = any> {
    status: boolean
    invalid: boolean
    targetAreas: VxeTableExtendCellAreaDefines.CellAreaParams<D>[]
    cellValues: string[][]
  }
  export interface CellAreaCopyEventParams<D = any> extends EventParams<D>, CellAreaCopyParams<D> { }

  export interface CellAreaCutParams<D = any> {
    status: boolean
    invalid: boolean
    targetAreas: VxeTableExtendCellAreaDefines.CellAreaParams<D>[]
    cellValues: string[][]
  }
  export interface CellAreaCutEventParams<D = any> extends EventParams<D>, CellAreaCutParams<D> { }

  export interface CellAreaPasteParams<D = any> {
    status: boolean
    invalid: boolean
    targetAreas: VxeTableExtendCellAreaDefines.CellAreaParams<D>[]
  }
  export interface CellAreaPasteEventParams<D = any> extends EventParams<D>, CellAreaPasteParams<D> { }

  export interface CellAreaMergeParams<D = any> {
    status: boolean
    targetAreas: VxeTableExtendCellAreaDefines.CellAreaParams<D>[]
  }
  export interface CellAreaMergeEventParams<D = any> extends EventParams<D>, CellAreaMergeParams<D> { }

  export interface ClearCellAreaMergeParams<D = any> {
    mergeCells: VxeTableDefines.MergeInfo[]
  }
  export interface ClearCellAreaMergeEventParams<D = any> extends EventParams<D>, ClearCellAreaMergeParams<D> { }

  export interface ClearCellAreaSelectionParams<D = any> {
    cellAreas: VxeTableExtendCellAreaDefines.MouseCellArea<D>[]
  }
  export interface ClearCellAreaSelectionEventParams<D = any> extends EventParams<D>, ClearCellAreaSelectionParams<D> { }

  export interface HeaderCellAreaSelectionParams<D = any> {
    targetRows: D[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
    column: VxeTableDefines.ColumnInfo<D>
    _columnIndex: number
  }
  export interface HeaderCellAreaSelectionEventParams<D = any> extends EventParams<D>, HeaderCellAreaSelectionParams<D> { }

  export interface CellAreaSelectionInvalidParams<D = any> {
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }
  export interface CellAreaSelectionInvalidEventParams<D = any> extends EventParams<D>, CellAreaSelectionInvalidParams<D> { }

  export interface CellAreaSelectionStartParams<D = any> {
    row: D
    _rowIndex: number
    $rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    _columnIndex: number
    $columnIndex: number
    cell: HTMLElement
  }
  export interface CellAreaSelectionStartEventParams<D = any> extends EventParams<D>, CellAreaSelectionStartParams<D> { }

  export interface CellAreaSelectionDragParams<D = any> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaSelectionDragEventParams<D = any> extends EventParams<D>, CellAreaSelectionDragParams<D> { }

  export interface CellAreaSelectionEndParams<D = any> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaSelectionEndEventParams<D = any> extends EventParams<D>, CellAreaSelectionEndParams<D> { }

  export interface CellAreaExtensionStartParams<D = any> {
    fixed: VxeColumnPropTypes.Fixed
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaExtensionStartEventParams<D = any> extends EventParams<D>, CellAreaExtensionStartParams<D> {
    targetRows: D[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
  }

  export interface CellAreaExtensionDragParams<D = any> {
    fixed: VxeColumnPropTypes.Fixed
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    targetRows: D[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaExtensionDragEventParams<D = any> extends EventParams<D>, CellAreaExtensionDragParams<D> { }

  export interface CellAreaExtensionEndParams<D = any> {
    fixed: VxeColumnPropTypes.Fixed
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    targetRows: D[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaExtensionEndEventParams<D = any> extends EventParams<D>, CellAreaExtensionEndParams<D> { }

  export interface CellAreaExtensionFillEventParams<D = any> extends EventParams<D> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    targetValues: any[][]
    targetRows: D[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
    extendRows: D[]
    extendCols: VxeTableDefines.ColumnInfo<D>[]
    direction: 'up' | 'down' | 'left' | 'right'
  }

  export interface CellAreaSelectionAllStartParams {
  }
  export interface CellAreaSelectionAllStartEventParams<D = any> extends EventParams<D>, CellAreaSelectionAllStartParams { }

  export interface CellAreaSelectionAllEndParams<D = any> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaSelectionAllEndEventParams<D = any> extends EventParams<D>, CellAreaSelectionAllEndParams<D> { }

  export interface CellAreaArrowsStartParams<D = any> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    isLeft: boolean
    isUp: boolean
    isRight: boolean
    isDown: boolean
  }
  export interface CellAreaArrowsStartEventParams<D = any> extends EventParams<D>, CellAreaArrowsStartParams<D> { }

  export interface CellAreaArrowsEndParams<D = any> extends CellAreaArrowsStartParams<D> {
    targetRows: D[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaArrowsEndEventParams<D = any> extends EventParams<D>, CellAreaArrowsEndParams<D> { }

  export interface ActiveCellChangeStartParams<D = any> {
    activeArea: VxeTableExtendCellAreaDefines.MouseActiveCellArea
    row: D
    column: VxeTableDefines.ColumnInfo<D>
    isTab: boolean
    isEnter: boolean
    isLeft: boolean
    isUp: boolean
    isRight: boolean
    isDown: boolean
  }
  export interface ActiveCellChangeStartEventParams<D = any> extends EventParams<D>, ActiveCellChangeStartParams<D> { }

  export interface ActiveCellChangeEndParams<D = any> extends ActiveCellChangeStartParams<D> {
    beforeActiveArea: VxeTableExtendCellAreaDefines.MouseActiveCellArea
  }
  export interface ActiveCellChangeEndEventParams<D = any> extends EventParams<D>, ActiveCellChangeEndParams<D> { }
}

export type VxeTableExtendCellAreaEmits = [
  'change-fnr', // 废弃

  'open-fnr',
  'show-fnr',
  'hide-fnr',
  'fnr-change',
  'fnr-find',
  'fnr-find-all',
  'fnr-replace',
  'fnr-replace-all',
  'cell-area-copy',
  'cell-area-cut',
  'cell-area-paste',
  'cell-area-merge',
  'clear-cell-area-selection',
  'clear-cell-area-merge',
  'header-cell-area-selection',
  'cell-area-selection-invalid',
  'cell-area-selection-start',
  'cell-area-selection-drag',
  'cell-area-selection-end',
  'cell-area-extension-start',
  'cell-area-extension-drag',
  'cell-area-extension-end',
  'cell-area-extension-fill',
  'cell-area-selection-all-start',
  'cell-area-selection-all-end',
  'cell-area-arrows-start',
  'cell-area-arrows-end',
  'active-cell-change-start',
  'active-cell-change-end'
]

declare module '../table' {
  export interface VxeTableEventProps<D = any> {
    onOpenFnr?: VxeTableEvents.OpenFnr<D>
    onFnrChange?: VxeTableEvents.FnrChange<D>
    onFnrFind?: VxeTableEvents.FnrFind<D>
    onFnrFindAll?: VxeTableEvents.FnrFindAll<D>
    onFnrReplace?: VxeTableEvents.FnrReplace<D>
    onFnrReplaceAll?: VxeTableEvents.FnrReplaceAll<D>
    onCellAreaCopy?: VxeTableEvents.CellAreaCopy<D>
    onCellAreaCut?: VxeTableEvents.CellAreaCut<D>
    onCellAreaPaste?: VxeTableEvents.CellAreaPaste<D>
    onCellAreaMerge?: VxeTableEvents.CellAreaMerge<D>
    onClearCellAreaMerge?: VxeTableEvents.ClearCellAreaMerge<D>
    onClearCellAreaSelection?: VxeTableEvents.ClearCellAreaSelection<D>
    onHeaderCellAreaSelection?: VxeTableEvents.HeaderCellAreaSelection<D>
    onCellAreaSelectionInvalid?: VxeTableEvents.CellAreaSelectionInvalid<D>
    onCellAreaSelectionStart?: VxeTableEvents.CellAreaSelectionStart<D>
    onCellAreaSelectionDrag?: VxeTableEvents.CellAreaSelectionDrag<D>
    onCellAreaSelectionEnd?: VxeTableEvents.CellAreaSelectionEnd<D>
    onCellAreaExtensionStart?: VxeTableEvents.CellAreaExtensionStart<D>
    onCellAreaExtensionDrag?: VxeTableEvents.CellAreaExtensionDrag<D>
    onCellAreaExtensionEnd?: VxeTableEvents.CellAreaExtensionEnd<D>
    onCellAreaExtensionFill?: VxeTableEvents.CellAreaExtensionFill<D>
    onCellAreaSelectionAllStart?: VxeTableEvents.CellAreaSelectionAllStart<D>
    onCellAreaSelectionAllEnd?: VxeTableEvents.CellAreaSelectionAllEnd<D>
    onCellAreaArrowsStart?: VxeTableEvents.CellAreaArrowsStart<D>
    onCellAreaArrowsEnd?: VxeTableEvents.CellAreaArrowsEnd<D>
    onActiveCellChangeStart?: VxeTableEvents.ActiveCellChangeStart<D>
    onActiveCellChangeEnd?: VxeTableEvents.ActiveCellChangeEnd<D>
  }
  export interface VxeTableListeners<D = any> {
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在查找与替换弹框被打开时会触发该事件
     */
    openFnr?: VxeTableEvents.OpenFnr<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在查找与替换弹框的 Tab 页被切换时会触发该事件
     */
    fnrChange?: VxeTableEvents.FnrChange<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击查找时会触发该事件
     */
    fnrFind?: VxeTableEvents.FnrFind<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击查找所有时会触发该事件
     */
    fnrFindAll?: VxeTableEvents.FnrFindAll<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击替换时会触发该事件
     */
    fnrReplace?: VxeTableEvents.FnrReplace<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击替换所有时会触发该事件
     */
    fnrReplaceAll?: VxeTableEvents.FnrReplaceAll<D>
    cellAreaCopy?: VxeTableEvents.CellAreaCopy<D>
    cellAreaCut?: VxeTableEvents.CellAreaCut<D>
    cellAreaPaste?: VxeTableEvents.CellAreaPaste<D>
    cellAreaMerge?: VxeTableEvents.CellAreaMerge<D>
    clearCellAreaMerge?: VxeTableEvents.ClearCellAreaMerge<D>
    clearCellAreaSelection?: VxeTableEvents.ClearCellAreaSelection<D>
    headerCellAreaSelection?: VxeTableEvents.HeaderCellAreaSelection<D>
    cellAreaSelectionInvalidtart?: VxeTableEvents.CellAreaSelectionInvalid<D>
    cellAreaSelectionStart?: VxeTableEvents.CellAreaSelectionStart<D>
    cellAreaSelectionDrag?: VxeTableEvents.CellAreaSelectionDrag<D>
    cellAreaSelectionEnd?: VxeTableEvents.CellAreaSelectionEnd<D>
    cellAreaExtensionStart?: VxeTableEvents.CellAreaExtensionStart<D>
    cellAreaExtensionDrag?: VxeTableEvents.CellAreaExtensionDrag<D>
    cellAreaExtensionEnd?: VxeTableEvents.CellAreaExtensionEnd<D>
    cellAreaExtensionFill?: VxeTableEvents.CellAreaExtensionFill<D>
    cellAreaSelectionAllStart?: VxeTableEvents.CellAreaSelectionAllStart<D>
    cellAreaSelectionAllEnd?: VxeTableEvents.CellAreaSelectionAllEnd<D>
    cellAreaArrowsStart?: VxeTableEvents.CellAreaArrowsStart<D>
    cellAreaArrowsEnd?: VxeTableEvents.CellAreaArrowsEnd<D>
    activeCellChangeStart?: VxeTableEvents.ActiveCellChangeStart<D>
    activeCellChangeEnd?: VxeTableEvents.ActiveCellChangeEnd<D>
  }
  export namespace VxeTableEvents {
    export type OpenFnr<D = any> = (params: VxeTableExtendCellAreaDefines.OpenFnrParams<D>) => void
    export type FnrChange<D = any> = (params: VxeTableExtendCellAreaDefines.FnrChangeParams<D>) => void
    export type FnrFind<D = any> = (params: VxeTableExtendCellAreaDefines.FnrFindParams<D>) => void
    export type FnrFindAll<D = any> = (params: VxeTableExtendCellAreaDefines.FnrFindAllParams<D>) => void
    export type FnrReplace<D = any> = (params: VxeTableExtendCellAreaDefines.FnrReplaceParams<D>) => void
    export type FnrReplaceAll<D = any> = (params: VxeTableExtendCellAreaDefines.FnrReplaceAllParams<D>) => void
    export type CellAreaCopy<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaCopyParams<D>) => void
    export type CellAreaCut<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaCutParams<D>) => void
    export type CellAreaPaste<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaPasteParams<D>) => void
    export type CellAreaMerge<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaMergeEventParams<D>) => void
    export type ClearCellAreaMerge<D = any> = (params: VxeTableExtendCellAreaDefines.ClearCellAreaMergeEventParams<D>) => void
    export type ClearCellAreaSelection<D = any> = (params: VxeTableExtendCellAreaDefines.ClearCellAreaSelectionEventParams<D>) => void
    export type HeaderCellAreaSelection<D = any> = (params: VxeTableExtendCellAreaDefines.HeaderCellAreaSelectionEventParams<D>) => void
    export type CellAreaSelectionInvalid<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionInvalidEventParams<D>) => void
    export type CellAreaSelectionStart<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionStartEventParams<D>) => void
    export type CellAreaSelectionDrag<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionDragEventParams<D>) => void
    export type CellAreaSelectionEnd<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionEndEventParams<D>) => void
    export type CellAreaExtensionStart<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaExtensionStartEventParams<D>) => void
    export type CellAreaExtensionDrag<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaExtensionDragEventParams<D>) => void
    export type CellAreaExtensionEnd<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaExtensionEndEventParams<D>) => void
    export type CellAreaExtensionFill<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaExtensionFillEventParams<D>) => void
    export type CellAreaSelectionAllStart<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionAllStartEventParams<D>) => void
    export type CellAreaSelectionAllEnd<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionAllEndEventParams<D>) => void
    export type CellAreaArrowsStart<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaArrowsStartEventParams<D>) => void
    export type CellAreaArrowsEnd<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaArrowsEndEventParams<D>) => void
    export type ActiveCellChangeStart<D = any> = (params: VxeTableExtendCellAreaDefines.ActiveCellChangeStartEventParams<D>) => void
    export type ActiveCellChangeEnd<D = any> = (params: VxeTableExtendCellAreaDefines.ActiveCellChangeEndEventParams<D>) => void
  }
}

declare module '../grid' {
  export interface VxeGridEventProps<D = any> {
    onOpenFnr?: VxeGridEvents.OpenFnr<D>
    onFnrChange?: VxeGridEvents.FnrChange<D>
    onFnrFind?: VxeGridEvents.FnrFind<D>
    onFnrFindAll?: VxeGridEvents.FnrFindAll<D>
    onFnrReplace?: VxeGridEvents.FnrReplace<D>
    onFnrReplaceAll?: VxeGridEvents.FnrReplaceAll<D>
    onCellAreaCopy?: VxeGridEvents.CellAreaCopy<D>
    onCellAreaCut?: VxeGridEvents.CellAreaCut<D>
    onCellAreaPaste?: VxeGridEvents.CellAreaPaste<D>
    onCellAreaMerge?: VxeGridEvents.CellAreaMerge<D>
    onClearCellAreaMerge?: VxeGridEvents.ClearCellAreaMerge<D>
    onClearCellAreaSelection?: VxeGridEvents.ClearCellAreaSelection<D>
    onHeaderCellAreaSelection?: VxeGridEvents.HeaderCellAreaSelection<D>
    onCellAreaSelectionInvalid?: VxeGridEvents.CellAreaSelectionInvalid<D>
    onCellAreaSelectionStart?: VxeGridEvents.CellAreaSelectionStart<D>
    onCellAreaSelectionDrag?: VxeGridEvents.CellAreaSelectionDrag<D>
    onCellAreaSelectionEnd?: VxeGridEvents.CellAreaSelectionEnd<D>
    onCellAreaExtensionStart?: VxeGridEvents.CellAreaExtensionStart<D>
    onCellAreaExtensionDrag?: VxeGridEvents.CellAreaExtensionDrag<D>
    onCellAreaExtensionEnd?: VxeGridEvents.CellAreaExtensionEnd<D>
    onCellAreaExtensionFill?: VxeGridEvents.CellAreaExtensionFill<D>
    onCellAreaSelectionAllStart?: VxeGridEvents.CellAreaSelectionAllStart<D>
    onCellAreaSelectionAllEnd?: VxeGridEvents.CellAreaSelectionAllEnd<D>
    onCellAreaArrowsStart?: VxeGridEvents.CellAreaArrowsStart<D>
    onCellAreaArrowsEnd?: VxeGridEvents.CellAreaArrowsEnd<D>
    onActiveCellChangeStart?: VxeGridEvents.ActiveCellChangeStart<D>
    onActiveCellChangeEnd?: VxeGridEvents.ActiveCellChangeEnd<D>
  }
  export interface VxeGridListeners<D = any> {
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在查找与替换弹框被打开时会触发该事件
     */
    openFnr?: VxeGridEvents.OpenFnr<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在查找与替换弹框的 Tab 页被切换时会触发该事件
     */
    fnrChange?: VxeGridEvents.FnrChange<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击查找时会触发该事件
     */
    fnrFind?: VxeGridEvents.FnrFind<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击查找所有时会触发该事件
     */
    fnrFindAll?: VxeGridEvents.FnrFindAll<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击替换时会触发该事件
     */
    fnrReplace?: VxeGridEvents.FnrReplace<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击替换所有时会触发该事件
     */
    fnrReplaceAll?: VxeGridEvents.FnrReplaceAll<D>
    cellAreaCopy?: VxeGridEvents.CellAreaCopy<D>
    cellAreaCut?: VxeGridEvents.CellAreaCut<D>
    cellAreaPaste?: VxeGridEvents.CellAreaPaste<D>
    cellAreaMerge?: VxeGridEvents.CellAreaMerge<D>
    clearCellAreaMerge?: VxeGridEvents.ClearCellAreaMerge<D>
    clearCellAreaSelection?: VxeGridEvents.ClearCellAreaSelection<D>
    headerCellAreaSelection?: VxeGridEvents.HeaderCellAreaSelection<D>
    cellAreaSelectionInvalid?: VxeGridEvents.CellAreaSelectionInvalid<D>
    cellAreaSelectionStart?: VxeGridEvents.CellAreaSelectionStart<D>
    cellAreaSelectionDrag?: VxeGridEvents.CellAreaSelectionDrag<D>
    cellAreaSelectionEnd?: VxeGridEvents.CellAreaSelectionEnd<D>
    cellAreaExtensionStart?: VxeGridEvents.CellAreaExtensionStart<D>
    cellAreaExtensionDrag?: VxeGridEvents.CellAreaExtensionDrag<D>
    cellAreaExtensionEnd?: VxeGridEvents.CellAreaExtensionEnd<D>
    cellAreaExtensionFill?: VxeGridEvents.CellAreaExtensionFill<D>
    cellAreaSelectionAllStart?: VxeGridEvents.CellAreaSelectionAllStart<D>
    cellAreaSelectionAllEnd?: VxeGridEvents.CellAreaSelectionAllEnd<D>
    cellAreaArrowsStart?: VxeGridEvents.CellAreaArrowsStart<D>
    cellAreaArrowsEnd?: VxeGridEvents.CellAreaArrowsEnd<D>
    activeCellChangeStart?: VxeGridEvents.ActiveCellChangeStart<D>
    activeCellChangeEnd?: VxeGridEvents.ActiveCellChangeEnd<D>
  }
  export namespace VxeGridEvents {
    export type OpenFnr<D = any> = (params: VxeTableExtendCellAreaDefines.OpenFnrParams<D>) => void
    export type FnrChange<D = any> = (params: VxeTableExtendCellAreaDefines.FnrChangeParams<D>) => void
    export type FnrFind<D = any> = (params: VxeTableExtendCellAreaDefines.FnrFindParams<D>) => void
    export type FnrFindAll<D = any> = (params: VxeTableExtendCellAreaDefines.FnrFindAllParams<D>) => void
    export type FnrReplace<D = any> = (params: VxeTableExtendCellAreaDefines.FnrReplaceParams<D>) => void
    export type FnrReplaceAll<D = any> = (params: VxeTableExtendCellAreaDefines.FnrReplaceAllParams<D>) => void
    export type CellAreaCopy<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaCopyParams<D>) => void
    export type CellAreaCut<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaCutParams<D>) => void
    export type CellAreaPaste<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaPasteParams<D>) => void
    export type CellAreaMerge<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaMergeParams<D>) => void
    export type ClearCellAreaMerge<D = any> = (params: VxeTableExtendCellAreaDefines.ClearCellAreaMergeParams<D>) => void
    export type ClearCellAreaSelection<D = any> = (params: VxeTableExtendCellAreaDefines.ClearCellAreaSelectionParams<D>) => void
    export type HeaderCellAreaSelection<D = any> = (params: VxeTableExtendCellAreaDefines.HeaderCellAreaSelectionParams<D>) => void
    export type CellAreaSelectionInvalid<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionInvalidEventParams<D>) => void
    export type CellAreaSelectionStart<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionStartEventParams<D>) => void
    export type CellAreaSelectionDrag<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionDragEventParams<D>) => void
    export type CellAreaSelectionEnd<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionEndEventParams<D>) => void
    export type CellAreaExtensionStart<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaExtensionStartEventParams<D>) => void
    export type CellAreaExtensionDrag<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaExtensionDragEventParams<D>) => void
    export type CellAreaExtensionEnd<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaExtensionEndEventParams<D>) => void
    export type CellAreaExtensionFill<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaExtensionFillEventParams<D>) => void
    export type CellAreaArrowsStart<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaArrowsStartEventParams<D>) => void
    export type CellAreaSelectionAllStart<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionAllStartEventParams<D>) => void
    export type CellAreaSelectionAllEnd<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaSelectionAllEndEventParams<D>) => void
    export type CellAreaArrowsEnd<D = any> = (params: VxeTableExtendCellAreaDefines.CellAreaArrowsEndEventParams<D>) => void
    export type ActiveCellChangeStart<D = any> = (params: VxeTableExtendCellAreaDefines.ActiveCellChangeStartEventParams<D>) => void
    export type ActiveCellChangeEnd<D = any> = (params: VxeTableExtendCellAreaDefines.ActiveCellChangeEndEventParams<D>) => void
  }
}
