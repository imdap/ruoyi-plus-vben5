"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assembleColumn = assembleColumn;
exports.clearTableAllStatus = clearTableAllStatus;
exports.clearTableDefaultStatus = clearTableDefaultStatus;
exports.colToVisible = colToVisible;
exports.convertHeaderColumnToRows = void 0;
exports.convertHeaderToGridRows = convertHeaderToGridRows;
exports.createColumn = createColumn;
exports.createHandleGetRowId = createHandleGetRowId;
exports.createHandleUpdateRowId = createHandleUpdateRowId;
exports.createInternalData = createInternalData;
exports.createReactData = createReactData;
exports.createRowId = createRowId;
exports.destroyColumn = destroyColumn;
exports.encodeRowid = encodeRowid;
exports.getCalcHeight = getCalcHeight;
exports.getCellRestHeight = getCellRestHeight;
exports.getCellValue = getCellValue;
exports.getColReMaxWidth = getColReMaxWidth;
exports.getColReMinWidth = getColReMinWidth;
exports.getColumnList = getColumnList;
exports.getFirstChildColumn = getFirstChildColumn;
exports.getLastChildColumn = getLastChildColumn;
exports.getRefElem = getRefElem;
exports.getRootColumn = getRootColumn;
exports.getRowUniqueId = getRowUniqueId;
exports.getRowid = getRowid;
exports.getRowkey = getRowkey;
exports.handleFieldOrColumn = handleFieldOrColumn;
exports.handleRowidOrRow = handleRowidOrRow;
exports.hasDeepKey = hasDeepKey;
exports.isColumnInfo = isColumnInfo;
exports.restoreScrollLocation = restoreScrollLocation;
exports.rowToVisible = rowToVisible;
exports.setCellValue = setCellValue;
exports.toFilters = toFilters;
exports.toTreePathSeq = toTreePathSeq;
exports.watchColumn = watchColumn;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _columnInfo = require("./columnInfo");
var _dom = require("../../ui/src/dom");
var _utils = require("../../ui/src/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createInternalData() {
  return {
    tZindex: 0,
    currKeyField: '',
    isCurrDeepKey: false,
    elemStore: {},
    // 存放横向 X 虚拟滚动相关的信息
    scrollXStore: {
      preloadSize: 0,
      offsetSize: 0,
      visibleSize: 0,
      visibleStartIndex: 0,
      visibleEndIndex: 0,
      startIndex: 0,
      endIndex: 0
    },
    // 存放纵向 Y 虚拟滚动相关信息
    scrollYStore: {
      preloadSize: 0,
      offsetSize: 0,
      visibleSize: 0,
      visibleStartIndex: 0,
      visibleEndIndex: 0,
      startIndex: 0,
      endIndex: 0
    },
    // 表格宽度
    tableWidth: 0,
    // 表格高度
    tableHeight: 0,
    customHeight: 0,
    customMinHeight: 0,
    customMaxHeight: 0,
    // 当前 hover 行
    hoverRow: null,
    // 最后滚动位置
    lastScrollLeft: 0,
    lastScrollTop: 0,
    // 单选框属性，已选中保留的行
    radioReserveRow: null,
    // 复选框属性，已选中保留的行集合
    checkboxReserveRowMap: {},
    // 行数据，已展开保留的行集合
    rowExpandedReserveRowMap: {},
    // 树结构数据，已展开保留的行集合
    treeExpandedReserveRowMap: {},
    // 树结构数据，不确定状态的集合
    treeIndeterminateRowMaps: {},
    // 列表完整数据、条件处理后
    tableFullData: [],
    afterFullData: [],
    afterTreeFullData: [],
    afterGroupFullData: [],
    // 列表条件处理后数据集合
    afterFullRowMaps: {},
    // 树结构完整数据、条件处理后
    tableFullTreeData: [],
    // 行分组全量数据、条件处理后
    tableFullGroupData: [],
    tableSynchData: [],
    tableSourceData: [],
    // 收集的列配置（带分组）
    collectColumn: [],
    // 完整所有列（不带分组）
    tableFullColumn: [],
    // 渲染所有列
    visibleColumn: [],
    // 全量数据集（包括当前和已删除）
    fullAllDataRowIdData: {},
    // 数据集（仅当前）
    fullDataRowIdData: {},
    // 数据集（仅可视）
    visibleDataRowIdData: {},
    keepUpdateFieldMaps: {},
    footerFullDataRowData: {},
    // 渲染中缓存数据
    sourceDataRowIdData: {},
    fullColumnIdData: {},
    fullColumnFieldData: {},
    // 当前行
    currentRow: null,
    // 合并表头单元格的数据
    mergeHeaderList: [],
    mergeHeaderMaps: {},
    // 已合并单元格数据集合
    mergeHeaderCellMaps: {},
    mergeHeaderRowMaps: {},
    mergeHeaderColMaps: {},
    // 合并单元格的数据
    mergeBodyList: [],
    mergeBodyMaps: {},
    // 已合并单元格数据集合
    mergeBodyCellMaps: {},
    mergeBodyRowMaps: {},
    mergeBodyColMaps: {},
    // 合并表尾的数据
    mergeFooterList: [],
    mergeFooterMaps: {},
    // 已合并表尾数据集合
    mergeFooterCellMaps: {},
    mergeFooterRowMaps: {},
    mergeFooterColMaps: {},
    // 已展开的行集合
    rowExpandedMaps: {},
    // 懒加载中的展开行的集合
    rowExpandLazyLoadedMaps: {},
    // 已展开的分组行
    rowGroupExpandedMaps: {},
    // 已展开树节点集合
    treeExpandedMaps: {},
    // 懒加载中的树节点的集合
    treeExpandLazyLoadedMaps: {},
    // 复选框属性，已选中的行集合
    selectCheckboxMaps: {},
    // 已标记的对象集
    pendingRowMaps: {},
    // 已新增的临时行
    insertRowMaps: {},
    // 已删除行
    removeRowMaps: {},
    cvCacheMaps: {},
    // 表头高度
    tHeaderHeight: 0,
    // 表体高度
    tBodyHeight: 0,
    // 表尾高度
    tFooterHeight: 0,
    teleportToWrapperElem: null,
    popupToWrapperElem: null,
    customPopupToElem: null,
    lastSTime: 0,
    // isCustomDragStatus: false,
    inited: false,
    tooltipTimeout: null,
    initStatus: false,
    isActivated: false
    // _sToTime: null
  };
}
function createReactData() {
  return {
    updateColFlag: 0,
    // 低性能的静态列
    staticColumns: [],
    // 渲染的列分组
    tableGroupColumn: [],
    // 可视区渲染的列
    tableColumn: [],
    // 渲染中的数据
    tableData: [],
    // 是否启用了横向 X 可视渲染方式加载
    scrollXLoad: false,
    // 是否启用了纵向 Y 可视渲染方式加载
    scrollYLoad: false,
    // 是否存在纵向滚动条
    overflowY: true,
    // 是否存在横向滚动条
    overflowX: false,
    // 纵向滚动条的宽度
    scrollbarWidth: 0,
    // 横向滚动条的高度
    scrollbarHeight: 0,
    // 行高
    rowHeight: 0,
    // 表格父容器的高度
    parentHeight: 0,
    // 是否使用分组表头
    isGroup: false,
    isAllOverflow: false,
    // 复选框属性，是否全选
    isAllSelected: false,
    // 复选框属性，有选中且非全选状态
    isIndeterminate: false,
    // 单选框属性，选中列
    currentColumn: null,
    // 单选框属性，选中行
    selectRadioRow: null,
    // 表尾合计数据
    footerTableData: [],
    // 行分组列信息
    rowGroupColumn: null,
    // 展开列信息
    expandColumn: null,
    checkboxColumn: null,
    radioColumn: null,
    // 树节点列信息
    treeNodeColumn: null,
    hasFixedColumn: false,
    // 刷新列标识，当列筛选被改变时，触发表格刷新数据
    upDataFlag: 0,
    // 刷新列标识，当列的特定属性被改变时，触发表格刷新列
    reColumnFlag: 0,
    // 初始化标识
    initStore: {
      filter: false,
      import: false,
      export: false,
      custom: false
    },
    // 自定义列相关的信息
    customStore: {
      btnEl: null,
      isAll: false,
      isIndeterminate: false,
      activeBtn: false,
      activeWrapper: false,
      visible: false,
      maxHeight: null,
      popupStyle: {},
      oldSortMaps: {},
      oldFixedMaps: {},
      oldVisibleMaps: {}
    },
    customColumnList: [],
    // 当前选中的筛选列
    filterStore: {
      isAllSelected: false,
      isIndeterminate: false,
      style: null,
      column: null,
      visible: false,
      maxHeight: null
    },
    // 存放列相关的信息
    columnStore: {
      leftList: [],
      centerList: [],
      rightList: [],
      resizeList: [],
      pxList: [],
      pxMinList: [],
      autoMinList: [],
      scaleList: [],
      scaleMinList: [],
      autoList: [],
      remainList: []
    },
    // 存放快捷菜单的信息
    ctxMenuStore: {
      selected: null,
      visible: false,
      showChild: false,
      selectChild: null,
      list: [],
      style: null
    },
    // 存放可编辑相关信息
    editStore: {
      indexs: {
        columns: []
      },
      titles: {
        columns: []
      },
      // 选中源
      selected: {
        row: null,
        column: null
      },
      // 已复制源
      copyed: {
        cut: false,
        rows: [],
        columns: []
      },
      // 激活
      actived: {
        row: null,
        column: null
      },
      // 当前被强制聚焦单元格，只会在鼠标点击后算聚焦
      focused: {
        row: null,
        column: null
      }
    },
    // 存放 tooltip 相关信息
    tooltipStore: {
      row: null,
      column: null,
      content: null,
      visible: false,
      type: null,
      currOpts: {}
    },
    // 存放数据校验相关信息
    validStore: {
      visible: false
    },
    validErrorMaps: {},
    // 导入相关信息
    importStore: {
      inited: false,
      file: null,
      type: '',
      modeList: [],
      typeList: [],
      filename: '',
      visible: false
    },
    importParams: {
      mode: '',
      types: null,
      message: true
    },
    // 导出相关信息
    exportStore: {
      inited: false,
      name: '',
      modeList: [],
      typeList: [],
      columns: [],
      isPrint: false,
      hasFooter: false,
      hasMerge: false,
      hasTree: false,
      hasColgroup: false,
      visible: false
    },
    exportParams: {
      filename: '',
      sheetName: '',
      mode: '',
      type: '',
      isColgroup: false,
      isMerge: false,
      isAllExpand: false,
      useStyle: false,
      original: false,
      message: true,
      isHeader: false,
      isTitle: false,
      isFooter: false
    },
    visiblwRowsFlag: 1,
    isRowGroupStatus: false,
    rowGroupList: [],
    aggHandleFields: [],
    aggHandleAggColumns: [],
    rowGroupExpandedFlag: 1,
    rowExpandedFlag: 1,
    treeExpandedFlag: 1,
    updateCheckboxFlag: 1,
    pendingRowFlag: 1,
    insertRowFlag: 1,
    removeRowFlag: 1,
    mergeHeadFlag: 1,
    mergeBodyFlag: 1,
    mergeFootFlag: 1,
    rowHeightStore: {
      large: 52,
      default: 48,
      medium: 44,
      small: 40,
      mini: 36
    },
    scrollVMLoading: false,
    scrollYHeight: 0,
    scrollYTop: 0,
    isScrollYBig: false,
    scrollXLeft: 0,
    scrollXWidth: 0,
    isScrollXBig: false,
    lazScrollLoading: false,
    rowExpandHeightFlag: 1,
    calcCellHeightFlag: 1,
    resizeHeightFlag: 1,
    resizeWidthFlag: 1,
    isCustomStatus: false,
    isCustomDragStatus: true,
    ctPopupFlag: 1,
    isCrossDragRow: false,
    dragRow: null,
    isCrossDragCol: false,
    dragCol: null,
    dragTipText: '',
    isDragResize: false,
    isRowLoading: false,
    isColLoading: false
  };
}
const getAllConvertColumns = (columns, parentColumn) => {
  const result = [];
  columns.forEach(column => {
    column.parentId = parentColumn ? parentColumn.id : null;
    if (column.visible) {
      if (column.children && column.children.length && column.children.some(column => column.visible)) {
        result.push(column);
        result.push(...getAllConvertColumns(column.children, column));
      } else {
        result.push(column);
      }
    }
  });
  return result;
};
const convertHeaderColumnToRows = originColumns => {
  let maxLevel = 1;
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      let colSpan = 0;
      column.children.forEach(subColumn => {
        if (subColumn.visible) {
          traverse(subColumn, column);
          colSpan += subColumn.colSpan;
        }
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };
  originColumns.forEach(column => {
    column.level = 1;
    traverse(column);
  });
  const rows = [];
  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }
  const allColumns = getAllConvertColumns(originColumns);
  allColumns.forEach(column => {
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      column.rowSpan = 1;
    } else {
      column.rowSpan = maxLevel - column.level + 1;
    }
    rows[column.level - 1].push(column);
  });
  return rows;
};
exports.convertHeaderColumnToRows = convertHeaderColumnToRows;
function convertHeaderToGridRows(spanColumns) {
  const rSize = spanColumns.length;
  const cSize = spanColumns[0].reduce((sum, cell) => sum + cell.colSpan, 0);
  const occupiedRows = [];
  const fullRows = [];
  for (let rIndex = 0; rIndex < rSize; rIndex++) {
    const oCols = [];
    const dCols = [];
    for (let cIndex = 0; cIndex < cSize; cIndex++) {
      oCols.push(false);
      dCols.push('');
    }
    occupiedRows.push(oCols);
    fullRows.push(dCols);
  }
  for (let rIndex = 0; rIndex < rSize; rIndex++) {
    let currColIndex = 0;
    for (const column of spanColumns[rIndex]) {
      const {
        colSpan,
        rowSpan
      } = column;
      let startColIndex = -1;
      for (let ccIndex = currColIndex; ccIndex <= cSize - colSpan; ccIndex++) {
        let oFlag = true;
        for (let csIndex = 0; csIndex < colSpan; csIndex++) {
          if (occupiedRows[rIndex][ccIndex + csIndex]) {
            oFlag = false;
            break;
          }
        }
        if (oFlag) {
          startColIndex = ccIndex;
          break;
        }
      }
      if (startColIndex === -1) {
        for (let j = 0; j <= cSize - colSpan; j++) {
          let oFlag = true;
          for (let k = 0; k < colSpan; k++) {
            if (occupiedRows[rIndex][j + k]) {
              oFlag = false;
              break;
            }
          }
          if (oFlag) {
            startColIndex = j;
            break;
          }
        }
        if (startColIndex === -1) {
          // error
          break;
        }
      }
      for (let srIndex = rIndex; srIndex < rIndex + rowSpan; srIndex++) {
        for (let scIndex = startColIndex; scIndex < startColIndex + colSpan; scIndex++) {
          occupiedRows[srIndex][scIndex] = true;
          fullRows[srIndex][scIndex] = column;
        }
      }
      currColIndex = startColIndex + colSpan;
    }
  }
  return fullRows;
}
function restoreScrollLocation($xeTable, scrollLeft, scrollTop) {
  const internalData = $xeTable.internalData;
  if (scrollLeft || scrollTop) {
    internalData.intoRunScroll = false;
    internalData.inVirtualScroll = false;
    internalData.inWheelScroll = false;
    internalData.inHeaderScroll = false;
    internalData.inBodyScroll = false;
    internalData.inFooterScroll = false;
    internalData.scrollRenderType = '';
    // 还原滚动状态
    return $xeTable.scrollTo(scrollLeft, scrollTop);
  }
  return $xeTable.clearScroll();
}
function getRowUniqueId() {
  return _xeUtils.default.uniqueId('row_');
}
/**
 * 生成行的唯一主键
 */
function createRowId(rowOpts, row, keyField) {
  const {
    createKeyMethod
  } = rowOpts;
  if (createKeyMethod) {
    return createKeyMethod({
      row,
      keyField
    });
  }
  return getRowUniqueId();
}
function hasDeepKey(rowKey) {
  return rowKey.indexOf('.') > -1;
}
// 行主键 key
function getRowkey($xeTable) {
  const {
    currKeyField
  } = $xeTable.internalData;
  return currKeyField;
}
// 行主键 value
function getRowid($xeTable, row) {
  const internalData = $xeTable.internalData;
  const {
    isCurrDeepKey,
    currKeyField
  } = internalData;
  return row ? encodeRowid((isCurrDeepKey ? getDeepRowIdByKey : getFastRowIdByKey)(row, currKeyField)) : '';
}
function createHandleUpdateRowId($xeTable) {
  const internalData = $xeTable.internalData;
  const {
    isCurrDeepKey,
    currKeyField
  } = internalData;
  const {
    computeRowOpts
  } = $xeTable.getComputeMaps();
  const rowOpts = computeRowOpts.value;
  const updateRId = isCurrDeepKey ? updateDeepRowKey : updateFastRowKey;
  return {
    rowKey: currKeyField,
    handleUpdateRowId(row) {
      return row ? updateRId(rowOpts, row, currKeyField) : '';
    }
  };
}
function createHandleGetRowId($xeTable) {
  const internalData = $xeTable.internalData;
  const {
    isCurrDeepKey,
    currKeyField
  } = internalData;
  const getRId = isCurrDeepKey ? getDeepRowIdByKey : getFastRowIdByKey;
  return {
    rowKey: currKeyField,
    handleGetRowId(row) {
      return row ? encodeRowid(getRId(row, currKeyField)) : '';
    }
  };
}
// 编码行主键
function encodeRowid(rowVal) {
  return _xeUtils.default.eqNull(rowVal) ? '' : encodeURIComponent(rowVal);
}
function getDeepRowIdByKey(row, rowKey) {
  return _xeUtils.default.get(row, rowKey);
}
function updateDeepRowKey(rowOpts, row, rowKey) {
  let rowid = encodeRowid(getDeepRowIdByKey(row, rowKey));
  if ((0, _utils.eqEmptyValue)(rowid)) {
    const newRowid = createRowId(rowOpts, row, rowKey);
    rowid = '' + newRowid;
    _xeUtils.default.set(row, rowKey, rowid);
  }
  return rowid;
}
function getFastRowIdByKey(row, rowKey) {
  return row[rowKey];
}
function updateFastRowKey(rowOpts, row, rowKey) {
  let rowid = encodeRowid(getFastRowIdByKey(row, rowKey));
  if ((0, _utils.eqEmptyValue)(rowid)) {
    const newRowid = createRowId(rowOpts, row, rowKey);
    rowid = '' + newRowid;
    row[rowKey] = newRowid;
  }
  return rowid;
}
function handleFieldOrColumn($xeTable, fieldOrColumn) {
  if (fieldOrColumn) {
    return _xeUtils.default.isString(fieldOrColumn) || _xeUtils.default.isNumber(fieldOrColumn) ? $xeTable.getColumnByField(`${fieldOrColumn}`) : fieldOrColumn;
  }
  return null;
}
function handleRowidOrRow($xeTable, rowidOrRow) {
  if (rowidOrRow) {
    const rowid = _xeUtils.default.isString(rowidOrRow) || _xeUtils.default.isNumber(rowidOrRow) ? rowidOrRow : getRowid($xeTable, rowidOrRow);
    return $xeTable.getRowById(rowid);
  }
  return null;
}
function getCellRestHeight(rowRest, cellOpts, rowOpts, defaultRowHeight) {
  return rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight;
}
function getPaddingLeftRightSize(elem) {
  if (elem) {
    const computedStyle = getComputedStyle(elem);
    const paddingLeft = _xeUtils.default.toNumber(computedStyle.paddingLeft);
    const paddingRight = _xeUtils.default.toNumber(computedStyle.paddingRight);
    return paddingLeft + paddingRight;
  }
  return 0;
}
function getElementMarginAndWidth(elem) {
  if (elem) {
    const computedStyle = getComputedStyle(elem);
    const marginLeft = _xeUtils.default.toNumber(computedStyle.marginLeft);
    const marginRight = _xeUtils.default.toNumber(computedStyle.marginRight);
    return elem.offsetWidth + marginLeft + marginRight;
  }
  return 0;
}
function toFilters(filters, colid) {
  if (filters) {
    if (_xeUtils.default.isArray(filters)) {
      return filters.map(({
        label,
        value,
        data,
        resetValue,
        checked
      }) => {
        return {
          label,
          value,
          data,
          resetValue,
          checked: !!checked,
          _checked: !!checked,
          _colId: colid
        };
      });
    }
    return [];
  }
  return filters;
}
function toTreePathSeq(path) {
  return path.map((num, i) => i % 2 === 0 ? Number(num) + 1 : '.').join('');
}
function getCellValue(row, column) {
  return _xeUtils.default.get(row, column.field);
}
function setCellValue(row, column, value) {
  return _xeUtils.default.set(row, column.field, value);
}
function getRefElem(refEl) {
  if (refEl) {
    const rest = refEl.value;
    if (rest) {
      return rest.$el || rest;
    }
  }
  return null;
}
function getCalcHeight(height) {
  if (height === 'unset') {
    return 0;
  }
  return height || 0;
}
/**
 * 列宽拖动最大宽度
 * @param params
 * @returns
 */
function getColReMaxWidth(params) {
  const {
    $table
  } = params;
  const {
    computeResizableOpts
  } = $table.getComputeMaps();
  const resizableOpts = computeResizableOpts.value;
  const {
    maxWidth: reMaxWidth
  } = resizableOpts;
  // 如果自定义调整宽度逻辑
  if (reMaxWidth) {
    const customMaxWidth = _xeUtils.default.isFunction(reMaxWidth) ? reMaxWidth(params) : reMaxWidth;
    if (customMaxWidth !== 'auto') {
      return Math.max(1, _xeUtils.default.toNumber(customMaxWidth));
    }
  }
  return -1;
}
/**
 * 列宽拖动最小宽度
 * @param params
 * @returns
 */
function getColReMinWidth(params) {
  const {
    $table,
    column,
    cell
  } = params;
  const tableProps = $table.props;
  const internalData = $table.internalData;
  const {
    computeResizableOpts
  } = $table.getComputeMaps();
  const resizableOpts = computeResizableOpts.value;
  const {
    minWidth: reMinWidth
  } = resizableOpts;
  // 如果自定义调整宽度逻辑
  if (reMinWidth) {
    const customMinWidth = _xeUtils.default.isFunction(reMinWidth) ? reMinWidth(params) : reMinWidth;
    if (customMinWidth !== 'auto') {
      return Math.max(1, _xeUtils.default.toNumber(customMinWidth));
    }
  }
  const {
    elemStore
  } = internalData;
  const {
    showHeaderOverflow: allColumnHeaderOverflow
  } = tableProps;
  const {
    showHeaderOverflow,
    minWidth: colMinWidth
  } = column;
  const headOverflow = _xeUtils.default.isUndefined(showHeaderOverflow) || _xeUtils.default.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
  const showEllipsis = headOverflow === 'ellipsis';
  const showTitle = headOverflow === 'title';
  const showTooltip = headOverflow === true || headOverflow === 'tooltip';
  const hasEllipsis = showTitle || showTooltip || showEllipsis;
  const minTitleWidth = _xeUtils.default.floor((_xeUtils.default.toNumber(getComputedStyle(cell).fontSize) || 14) * 1.8);
  const paddingLeftRight = getPaddingLeftRightSize(cell) + getPaddingLeftRightSize((0, _dom.queryElement)(cell, '.vxe-cell'));
  let mWidth = minTitleWidth + paddingLeftRight;
  // 默认最小宽处理
  if (hasEllipsis) {
    const dragIconWidth = getElementMarginAndWidth((0, _dom.queryElement)(cell, '.vxe-cell--drag-handle'));
    const checkboxIconWidth = getElementMarginAndWidth((0, _dom.queryElement)(cell, '.vxe-cell--checkbox'));
    const requiredIconWidth = getElementMarginAndWidth((0, _dom.queryElement)(cell, '.vxe-cell--required-icon'));
    const editIconWidth = getElementMarginAndWidth((0, _dom.queryElement)(cell, '.vxe-cell--edit-icon'));
    const prefixIconWidth = getElementMarginAndWidth((0, _dom.queryElement)(cell, '.vxe-cell-title-prefix-icon'));
    const suffixIconWidth = getElementMarginAndWidth((0, _dom.queryElement)(cell, '.vxe-cell-title-suffix-icon'));
    const sortIconWidth = getElementMarginAndWidth((0, _dom.queryElement)(cell, '.vxe-cell--sort'));
    const filterIconWidth = getElementMarginAndWidth((0, _dom.queryElement)(cell, '.vxe-cell--filter'));
    mWidth += dragIconWidth + checkboxIconWidth + requiredIconWidth + editIconWidth + prefixIconWidth + suffixIconWidth + filterIconWidth + sortIconWidth;
  }
  // 如果设置最小宽
  if (colMinWidth) {
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll']);
    if (bodyScrollElem) {
      if ((0, _dom.isScale)(colMinWidth)) {
        const bodyWidth = bodyScrollElem.clientWidth - 1;
        const meanWidth = bodyWidth / 100;
        return Math.max(mWidth, Math.floor(_xeUtils.default.toInteger(colMinWidth) * meanWidth));
      } else if ((0, _dom.isPx)(colMinWidth)) {
        return Math.max(mWidth, _xeUtils.default.toInteger(colMinWidth));
      }
    }
  }
  return mWidth;
}
function isColumnInfo(column) {
  return column && (column.constructor === _columnInfo.ColumnInfo || column instanceof _columnInfo.ColumnInfo);
}
// 获取所有的列，排除分组
function getColumnList(columns) {
  const result = [];
  columns.forEach(column => {
    result.push(...(column.children && column.children.length ? getColumnList(column.children) : [column]));
  });
  return result;
}
function createColumn($xeTable, options, renderOptions) {
  return isColumnInfo(options) ? options : (0, _vue.reactive)(new _columnInfo.ColumnInfo($xeTable, options, renderOptions));
}
function watchColumn($xeTable, props, column) {
  Object.keys(props).forEach(name => {
    (0, _vue.watch)(() => props[name], value => {
      column.update(name, value);
      if ($xeTable) {
        if (name === 'filters') {
          $xeTable.setFilter(column, value);
          $xeTable.handleUpdateDataQueue();
        } else if (['visible', 'fixed', 'width', 'minWidth', 'maxWidth'].includes(name)) {
          $xeTable.handleRefreshColumnQueue();
        }
      }
    });
  });
}
function assembleColumn($xeTable, elem, column, colgroup) {
  const {
    reactData
  } = $xeTable;
  const {
    staticColumns
  } = reactData;
  const parentElem = elem.parentNode;
  const parentColumn = colgroup ? colgroup.columnConfig : null;
  const parentCols = parentColumn ? parentColumn.children : staticColumns;
  if (parentElem && parentCols) {
    column.defaultParentId = parentColumn ? parentColumn.id : null;
    parentCols.splice(_xeUtils.default.arrayIndexOf(parentElem.children, elem), 0, column);
    reactData.staticColumns = staticColumns.slice(0);
  }
}
function destroyColumn($xeTable, column) {
  const {
    reactData
  } = $xeTable;
  const {
    staticColumns
  } = reactData;
  const matchObj = _xeUtils.default.findTree(staticColumns, item => item.id === column.id, {
    children: 'children'
  });
  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
  reactData.staticColumns = staticColumns.slice(0);
}
function getRootColumn($xeTable, column) {
  const {
    internalData
  } = $xeTable;
  const {
    fullColumnIdData
  } = internalData;
  if (!column) {
    return null;
  }
  let parentColId = column.parentId;
  while (fullColumnIdData[parentColId]) {
    const column = fullColumnIdData[parentColId].column;
    parentColId = column.parentId;
    if (!parentColId) {
      return column;
    }
  }
  return column;
}
function getFirstChildColumn(column) {
  const {
    children
  } = column;
  if (children && children.length) {
    return getFirstChildColumn(_xeUtils.default.first(children));
  }
  return column;
}
function getLastChildColumn(column) {
  const {
    children
  } = column;
  if (children && children.length) {
    return getFirstChildColumn(_xeUtils.default.last(children));
  }
  return column;
}
function clearTableDefaultStatus($xeTable) {
  const {
    props,
    internalData
  } = $xeTable;
  internalData.initStatus = false;
  const actionList = [$xeTable.clearSort(), $xeTable.clearCurrentRow(), $xeTable.clearCurrentColumn(), $xeTable.clearRadioRow(), $xeTable.clearRadioReserve(), $xeTable.clearCheckboxRow(), $xeTable.clearCheckboxReserve(), $xeTable.clearRowExpand(), $xeTable.clearTreeExpand(), $xeTable.clearTreeExpandReserve(), $xeTable.clearPendingRow()];
  if ($xeTable.clearFilter) {
    actionList.push($xeTable.clearFilter());
  }
  if ($xeTable.clearSelected && (props.keyboardConfig || props.mouseConfig)) {
    actionList.push($xeTable.clearSelected());
  }
  if ($xeTable.clearCellAreas && props.mouseConfig) {
    actionList.push($xeTable.clearCellAreas(), $xeTable.clearCopyCellArea());
  }
  return Promise.all(actionList).then(() => {
    return $xeTable.clearScroll();
  });
}
function clearTableAllStatus($xeTable) {
  if ($xeTable.clearFilter) {
    $xeTable.clearFilter();
  }
  return clearTableDefaultStatus($xeTable);
}
function rowToVisible($xeTable, row) {
  const reactData = $xeTable.reactData;
  const internalData = $xeTable.internalData;
  const {
    computeLeftFixedWidth,
    computeRightFixedWidth,
    computeRowOpts,
    computeCellOpts,
    computeDefaultRowHeight
  } = $xeTable.getComputeMaps();
  const {
    scrollYLoad,
    scrollYTop,
    isAllOverflow
  } = reactData;
  const {
    elemStore,
    afterFullData,
    fullAllDataRowIdData,
    isResizeCellHeight
  } = internalData;
  const rowOpts = computeRowOpts.value;
  const cellOpts = computeCellOpts.value;
  const defaultRowHeight = computeDefaultRowHeight.value;
  const leftFixedWidth = computeLeftFixedWidth.value;
  const rightFixedWidth = computeRightFixedWidth.value;
  const bodyScrollElem = getRefElem(elemStore['main-body-scroll']);
  const rowid = getRowid($xeTable, row);
  if (bodyScrollElem) {
    const bodyHeight = bodyScrollElem.clientHeight;
    const bodyScrollTop = bodyScrollElem.scrollTop;
    const trElem = bodyScrollElem.querySelector(`[rowid="${rowid}"]`);
    if (trElem) {
      const trOffsetTop = trElem.offsetTop + (scrollYLoad ? scrollYTop : 0);
      const trHeight = trElem.clientHeight;
      // 检测行是否在可视区中
      if (trOffsetTop < bodyScrollTop || trOffsetTop > bodyScrollTop + bodyHeight) {
        return $xeTable.scrollTo(null, trOffsetTop);
      } else if (trOffsetTop + trHeight >= bodyHeight + bodyScrollTop) {
        return $xeTable.scrollTo(null, bodyScrollTop + trHeight);
      }
    } else {
      // 如果是虚拟渲染滚动
      if (scrollYLoad) {
        const isCustomCellHeight = isResizeCellHeight || cellOpts.height || rowOpts.height;
        if (!isCustomCellHeight && isAllOverflow) {
          return $xeTable.scrollTo(null, ($xeTable.findRowIndexOf(afterFullData, row) - 1) * defaultRowHeight);
        }
        const rowRest = fullAllDataRowIdData[rowid] || {};
        const rHeight = rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight;
        const scrollTop = rowRest.oTop;
        if (scrollTop < bodyScrollTop) {
          return $xeTable.scrollTo(null, scrollTop - leftFixedWidth - 1);
        }
        return $xeTable.scrollTo(null, scrollTop + rHeight - (bodyHeight - rightFixedWidth - 1));
      }
    }
  }
  return Promise.resolve();
}
function colToVisible($xeTable, isForce, column, row) {
  const reactData = $xeTable.reactData;
  const internalData = $xeTable.internalData;
  const {
    computeLeftFixedWidth,
    computeRightFixedWidth
  } = $xeTable.getComputeMaps();
  const {
    scrollXLoad,
    scrollXLeft
  } = reactData;
  const {
    elemStore,
    visibleColumn
  } = internalData;
  const leftFixedWidth = computeLeftFixedWidth.value;
  const rightFixedWidth = computeRightFixedWidth.value;
  const bodyScrollElem = getRefElem(elemStore['main-body-scroll']);
  if (column.fixed) {
    return Promise.resolve();
  }
  if (bodyScrollElem) {
    const bodyWidth = bodyScrollElem.clientWidth;
    const bodyScrollLeft = bodyScrollElem.scrollLeft;
    let tdElem = null;
    if (row) {
      const rowid = getRowid($xeTable, row);
      tdElem = bodyScrollElem.querySelector(`[rowid="${rowid}"] .${column.id}`);
    }
    if (!tdElem) {
      tdElem = bodyScrollElem.querySelector(`.${column.id}`);
    }
    if (tdElem) {
      const tdOffsetLeft = tdElem.offsetLeft + (scrollXLoad ? scrollXLeft : 0);
      const cellWidth = tdElem.clientWidth;
      // 检测是否在可视区中
      if (isForce || !(tdOffsetLeft <= bodyScrollLeft + leftFixedWidth && tdOffsetLeft + cellWidth > bodyScrollLeft + leftFixedWidth) && !(tdOffsetLeft >= bodyScrollLeft + leftFixedWidth && tdOffsetLeft < bodyScrollLeft + bodyWidth - rightFixedWidth)) {
        if (tdOffsetLeft < bodyScrollLeft + leftFixedWidth) {
          return $xeTable.scrollTo(tdOffsetLeft - leftFixedWidth - 1);
        } else if (tdOffsetLeft + cellWidth - bodyScrollLeft > bodyWidth - rightFixedWidth) {
          return $xeTable.scrollTo(tdOffsetLeft + cellWidth - (bodyWidth - rightFixedWidth - 1));
        }
      }
    } else {
      if (scrollXLoad) {
        let tdOffsetLeft = 0;
        const cellWidth = column.renderWidth;
        for (let i = 0; i < visibleColumn.length; i++) {
          const currCol = visibleColumn[i];
          if (currCol === column || currCol.id === column.id) {
            break;
          }
          tdOffsetLeft += currCol.renderWidth;
        }
        // 检测是否在可视区中
        if (isForce || !(tdOffsetLeft <= bodyScrollLeft + leftFixedWidth && tdOffsetLeft + cellWidth > bodyScrollLeft + leftFixedWidth) && !(tdOffsetLeft >= bodyScrollLeft + leftFixedWidth && tdOffsetLeft < bodyScrollLeft + bodyWidth - rightFixedWidth)) {
          if (tdOffsetLeft < bodyScrollLeft) {
            return $xeTable.scrollTo(tdOffsetLeft - leftFixedWidth - 1);
          }
          return $xeTable.scrollTo(tdOffsetLeft + cellWidth - (bodyWidth - rightFixedWidth - 1));
        }
      }
    }
  }
  return Promise.resolve();
}