"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _util = require("./util");
var _dom = require("../../ui/src/dom");
var _utils = require("../../ui/src/utils");
var _vn = require("../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getI18n,
  renderer,
  renderEmptyElement
} = _ui.VxeUI;
const sourceType = 'table';
const renderType = 'body';
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTableBody',
  props: {
    tableData: Array,
    tableColumn: Array,
    fixedColumn: Array,
    fixedType: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const $xeTable = (0, _vue.inject)('$xeTable', {});
    const {
      xID,
      props: tableProps,
      context: tableContext,
      reactData: tableReactData,
      internalData: tableInternalData
    } = $xeTable;
    const {
      computeEditOpts,
      computeMouseOpts,
      computeCellOffsetWidth,
      computeAreaOpts,
      computeDefaultRowHeight,
      computeEmptyOpts,
      computeTooltipOpts,
      computeRadioOpts,
      computeExpandOpts,
      computeTreeOpts,
      computeCheckboxOpts,
      computeCellOpts,
      computeValidOpts,
      computeRowOpts,
      computeColumnOpts,
      computeRowDragOpts,
      computeResizableOpts,
      computeVirtualXOpts,
      computeVirtualYOpts,
      computeIsBodyRenderOptimize
    } = $xeTable.getComputeMaps();
    const refElem = (0, _vue.ref)();
    const refBodyScroll = (0, _vue.ref)();
    const refBodyTable = (0, _vue.ref)();
    const refBodyColgroup = (0, _vue.ref)();
    const refBodyTBody = (0, _vue.ref)();
    const refBodyXSpace = (0, _vue.ref)();
    const refBodyYSpace = (0, _vue.ref)();
    const refBodyEmptyBlock = (0, _vue.ref)();
    // 滚动、拖动过程中不需要触发
    const isVMScrollProcess = () => {
      const {
        delayHover
      } = tableProps;
      const {
        isDragResize
      } = tableReactData;
      const {
        lastSTime
      } = tableInternalData;
      return !!(isDragResize || lastSTime && Date.now() < lastSTime + delayHover);
    };
    const renderLine = (rowid, params, cellHeight) => {
      const {
        column
      } = params;
      const {
        treeConfig
      } = tableProps;
      const cellOpts = computeCellOpts.value;
      const rowOpts = computeRowOpts.value;
      const defaultRowHeight = computeDefaultRowHeight.value;
      const treeOpts = computeTreeOpts.value;
      const {
        slots,
        treeNode
      } = column;
      const {
        fullAllDataRowIdData
      } = tableInternalData;
      if (treeConfig && treeNode && (treeOpts.showLine || treeOpts.line)) {
        if (slots && slots.line) {
          return $xeTable.callSlot(slots.line, params);
        }
        const rowRest = fullAllDataRowIdData[rowid];
        let rLevel = 0;
        let prevRow = null;
        let parentRow = null;
        let lineHeight = '';
        if (rowRest) {
          rLevel = rowRest.level;
          prevRow = rowRest.items[rowRest.treeIndex - 1];
          parentRow = rowRest.parent;
        }
        if (!rLevel && !treeOpts.showRootLine) {
          return [];
        }
        if (prevRow) {
          const prevRowRest = fullAllDataRowIdData[(0, _util.getRowid)($xeTable, prevRow)] || {};
          lineHeight = `${prevRowRest.lineHeight || 0}px`;
        } else if (rLevel && parentRow) {
          const parentRowRest = fullAllDataRowIdData[(0, _util.getRowid)($xeTable, parentRow)] || {};
          lineHeight = `calc(-1em + ${Math.floor(cellHeight / 2 + (0, _util.getCellRestHeight)(parentRowRest, cellOpts, rowOpts, defaultRowHeight) / 2)}px)`;
        }
        return [(0, _vue.h)('div', {
          key: 'tl',
          class: 'vxe-tree--line-wrapper'
        }, [(0, _vue.h)('div', {
          class: 'vxe-tree--line',
          style: {
            height: lineHeight,
            bottom: `-${Math.floor(cellHeight / 2)}px`,
            left: `calc(${rLevel * treeOpts.indent}px + 1em)`
          }
        })])];
      }
      return [];
    };
    /**
     * 渲染列
     */
    const renderTdColumn = (seq, rowid, fixedType, isOptimizeMode, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, columns, items) => {
      const $xeGrid = $xeTable.xeGrid;
      const $xeGantt = $xeTable.xeGantt;
      const {
        columnKey,
        resizable: allResizable,
        showOverflow: allShowOverflow,
        border,
        height,
        treeConfig,
        cellClassName: allCellClassName,
        cellStyle,
        align: allAlign,
        spanMethod,
        mouseConfig,
        editConfig,
        editRules,
        tooltipConfig,
        padding: allPadding
      } = tableProps;
      const {
        tableData,
        tableColumn,
        dragRow,
        overflowX,
        overflowY,
        currentColumn,
        scrollXLoad,
        scrollYLoad,
        mergeBodyFlag,
        calcCellHeightFlag,
        resizeHeightFlag,
        resizeWidthFlag,
        editStore,
        isAllOverflow,
        validErrorMaps
      } = tableReactData;
      const {
        fullAllDataRowIdData,
        fullColumnIdData,
        mergeBodyCellMaps,
        visibleColumn,
        afterFullData,
        mergeBodyList,
        scrollXStore,
        scrollYStore,
        keepUpdateFieldMaps
      } = tableInternalData;
      const cellOpts = computeCellOpts.value;
      const validOpts = computeValidOpts.value;
      const checkboxOpts = computeCheckboxOpts.value;
      const editOpts = computeEditOpts.value;
      const tooltipOpts = computeTooltipOpts.value;
      const resizableOpts = computeResizableOpts.value;
      const virtualXOpts = computeVirtualXOpts.value;
      const virtualYOpts = computeVirtualYOpts.value;
      const {
        isAllColumnDrag,
        isAllRowDrag
      } = resizableOpts;
      const rowOpts = computeRowOpts.value;
      const rowDragOpts = computeRowDragOpts.value;
      const defaultRowHeight = computeDefaultRowHeight.value;
      const customCellHeight = calcCellHeightFlag ? cellOpts.height || rowOpts.height : 0;
      const {
        disabledMethod: dragDisabledMethod,
        isCrossDrag,
        isPeerDrag
      } = rowDragOpts;
      const columnOpts = computeColumnOpts.value;
      const mouseOpts = computeMouseOpts.value;
      const areaOpts = computeAreaOpts.value;
      const cellOffsetWidth = computeCellOffsetWidth.value;
      const {
        selectCellToRow
      } = areaOpts;
      const {
        field,
        type,
        cellRender,
        editRender,
        align,
        showOverflow,
        className,
        treeNode,
        rowResize,
        padding,
        verticalAlign,
        slots
      } = column;
      const {
        verticalAlign: allVerticalAlign
      } = cellOpts;
      const {
        actived
      } = editStore;
      const rowRest = fullAllDataRowIdData[rowid] || {};
      const colid = column.id;
      const colRest = fullColumnIdData[colid] || {};
      const renderOpts = editRender || cellRender;
      const compConf = renderOpts ? renderer.get(renderOpts.name) : null;
      const compCellClassName = compConf ? compConf.tableCellClassName || compConf.cellClassName : null;
      const compCellStyle = compConf ? compConf.tableCellStyle || compConf.cellStyle : '';
      const showAllTip = tooltipOpts.showAll;
      const columnIndex = colRest.index;
      const _columnIndex = colRest._index;
      const isEdit = (0, _utils.isEnableConf)(editRender);
      const resizeHeight = resizeHeightFlag ? rowRest.resizeHeight : 0;
      let fixedHiddenColumn = overflowX && (fixedType ? column.fixed !== fixedType : !!column.fixed);
      const isCellPadding = _xeUtils.default.eqNull(padding) ? allPadding === null ? cellOpts.padding : allPadding : padding;
      const cellOverflow = _xeUtils.default.eqNull(showOverflow) ? allShowOverflow : showOverflow;
      const showEllipsis = cellOverflow === 'ellipsis';
      const showTitle = cellOverflow === 'title';
      const showTooltip = cellOverflow === true || cellOverflow === 'tooltip';
      const hasEllipsis = isAllOverflow || showTitle || showTooltip || showEllipsis;
      const showResizable = _xeUtils.default.isBoolean(column.resizable) ? column.resizable : columnOpts.resizable || allResizable;
      const isCsHeight = !!customCellHeight;
      const isRsHeight = resizeHeight > 0;
      let isDirty;
      const tdOns = {};
      const cellAlign = align || (compConf ? compConf.tableCellAlign : '') || allAlign;
      const cellVerticalAlign = _xeUtils.default.eqNull(verticalAlign) ? allVerticalAlign : verticalAlign;
      const errorValidItem = validErrorMaps[`${rowid}:${colid}`];
      const showValidTip = editRules && validOpts.showErrorMessage && (validOpts.message === 'default' ? height || tableData.length > 1 : validOpts.message === 'inline');
      const tdAttrs = {
        colid
      };
      const cellParams = {
        $table: $xeTable,
        $grid: $xeGrid,
        $gantt: $xeGantt,
        isEdit: false,
        seq,
        rowid,
        row,
        rowIndex,
        $rowIndex,
        _rowIndex,
        column,
        columnIndex,
        $columnIndex,
        _columnIndex,
        fixed: fixedType,
        source: sourceType,
        type: renderType,
        isHidden: !!fixedHiddenColumn,
        level: rowLevel,
        visibleData: afterFullData,
        data: tableData,
        items
      };
      let isRowDragCell = false;
      let isDisabledDrag = false;
      if (rowOpts.drag) {
        isRowDragCell = rowDragOpts.trigger === 'row' || column.dragSort && rowDragOpts.trigger === 'cell';
      }
      if (isRowDragCell) {
        isDisabledDrag = !!(dragDisabledMethod && dragDisabledMethod(cellParams));
      }
      // hover 进入事件
      if (showTitle || showTooltip || showAllTip || tooltipConfig) {
        tdOns.onMouseover = evnt => {
          if (!isVMScrollProcess()) {
            if (showTitle) {
              (0, _dom.updateCellTitle)(evnt.currentTarget, column);
            } else if (showTooltip || showAllTip) {
              // 如果配置了显示 tooltip
              $xeTable.triggerBodyTooltipEvent(evnt, cellParams);
            }
          }
          $xeTable.dispatchEvent('cell-mouseenter', Object.assign({
            cell: evnt.currentTarget
          }, cellParams), evnt);
        };
      }
      // hover 退出事件
      if (showTooltip || showAllTip || tooltipConfig) {
        tdOns.onMouseleave = evnt => {
          if (!isVMScrollProcess()) {
            if (showTooltip || showAllTip) {
              $xeTable.handleTargetLeaveEvent(evnt);
            }
          }
          $xeTable.dispatchEvent('cell-mouseleave', Object.assign({
            cell: evnt.currentTarget
          }, cellParams), evnt);
        };
      }
      // 按下事件处理
      if (isRowDragCell || checkboxOpts.range || mouseConfig) {
        tdOns.onMousedown = evnt => {
          $xeTable.triggerCellMousedownEvent(evnt, cellParams);
        };
      }
      // 拖拽列事件
      if (isRowDragCell) {
        tdOns.onMouseup = $xeTable.triggerCellMouseupEvent;
      }
      // 点击事件处理
      tdOns.onClick = evnt => {
        $xeTable.triggerCellClickEvent(evnt, cellParams);
      };
      // 双击事件处理
      tdOns.onDblclick = evnt => {
        $xeTable.triggerCellDblclickEvent(evnt, cellParams);
      };
      let isMergeCell = false;
      let mergeColspan = 1;
      let mergeRowspan = 1;
      // 合并行或列
      if (mergeBodyFlag && mergeBodyList.length) {
        const spanRest = mergeBodyCellMaps[`${_rowIndex}:${_columnIndex}`];
        if (spanRest) {
          const {
            rowspan,
            colspan
          } = spanRest;
          if (!rowspan || !colspan) {
            return renderEmptyElement($xeTable);
          }
          if (rowspan > 1) {
            isMergeCell = true;
            mergeRowspan = rowspan;
            tdAttrs.rowspan = rowspan;
          }
          if (colspan > 1) {
            isMergeCell = true;
            mergeColspan = colspan;
            tdAttrs.colspan = colspan;
          }
        }
      } else if (spanMethod) {
        // 自定义合并行或列的方法
        const {
          rowspan = 1,
          colspan = 1
        } = spanMethod(cellParams) || {};
        if (!rowspan || !colspan) {
          return renderEmptyElement($xeTable);
        }
        if (rowspan > 1) {
          isMergeCell = true;
          mergeRowspan = rowspan;
          tdAttrs.rowspan = rowspan;
        }
        if (colspan > 1) {
          isMergeCell = true;
          mergeColspan = colspan;
          tdAttrs.colspan = colspan;
        }
      }
      // 如果被合并不可隐藏
      if (fixedHiddenColumn && isMergeCell) {
        if (tdAttrs.colspan > 1 || tdAttrs.rowspan > 1) {
          fixedHiddenColumn = false;
        }
      }
      // 如果编辑列开启显示状态
      if (!fixedHiddenColumn && editConfig && (editOpts.showStatus || editOpts.showUpdateStatus) && keepUpdateFieldMaps[field]) {
        isDirty = $xeTable.isUpdateByRow(row, field);
      }
      const isVNAutoHeight = !hasEllipsis && (scrollYLoad || scrollXLoad);
      let cellHeight = (0, _util.getCellRestHeight)(rowRest, cellOpts, rowOpts, defaultRowHeight);
      const isLastColumn = $columnIndex === columns.length - 1;
      const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto');
      let isVNPreEmptyStatus = false;
      if (!isMergeCell) {
        if (!dragRow || (0, _util.getRowid)($xeTable, dragRow) !== rowid) {
          if (overflowY && scrollYLoad && tableData.length > 16 && !treeConfig && !virtualYOpts.immediate && (_rowIndex < scrollYStore.visibleStartIndex - scrollYStore.preloadSize || _rowIndex > scrollYStore.visibleEndIndex + scrollYStore.preloadSize)) {
            isVNPreEmptyStatus = true;
          } else if (overflowX && scrollXLoad && tableColumn.length > 10 && !virtualXOpts.immediate && !column.fixed && (_columnIndex < scrollXStore.visibleStartIndex - scrollXStore.preloadSize || _columnIndex > scrollXStore.visibleEndIndex + scrollXStore.preloadSize)) {
            isVNPreEmptyStatus = true;
          }
        }
      }
      if (mergeRowspan > 1) {
        const mEndRow = afterFullData[_rowIndex + mergeRowspan - 1];
        if (mEndRow) {
          const meRowRest = fullAllDataRowIdData[(0, _util.getRowid)($xeTable, mEndRow)];
          if (meRowRest) {
            cellHeight += meRowRest.oTop + (0, _util.getCellRestHeight)(meRowRest, cellOpts, rowOpts, defaultRowHeight) - rowRest.oTop - (0, _util.getCellRestHeight)(rowRest, cellOpts, rowOpts, defaultRowHeight);
          }
        }
      }
      const tcStyle = {};
      if (hasEllipsis && resizeWidthFlag) {
        let mergeColWidth = 0;
        if (mergeColspan > 1) {
          for (let index = 1; index < mergeColspan; index++) {
            const nextColumn = visibleColumn[columnIndex + index];
            if (nextColumn) {
              mergeColWidth += nextColumn.renderWidth;
            }
          }
        }
        tcStyle.width = `${column.renderWidth + mergeColWidth - cellOffsetWidth}px`;
      }
      if (scrollYLoad || scrollXLoad || hasEllipsis || isCsHeight || isRsHeight) {
        tcStyle.height = `${cellHeight}px`;
      } else {
        tcStyle.minHeight = `${cellHeight}px`;
      }
      const tdVNs = [];
      if (fixedHiddenColumn && isAllOverflow) {
        tdVNs.push((0, _vue.h)('div', {
          key: 'tc',
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }],
          style: tcStyle
        }));
      } else {
        // 渲染单元格
        if (treeConfig) {
          tdVNs.push(...renderLine(rowid, cellParams, cellHeight));
        }
        const clVNs = [];
        if (!isVNPreEmptyStatus) {
          clVNs.push((0, _vue.h)('div', {
            colid,
            rowid,
            class: 'vxe-cell--wrapper vxe-body-cell--wrapper'
          }, column.renderCell(cellParams)));
        }
        tdVNs.push((0, _vue.h)('div', {
          key: 'tc',
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }],
          style: tcStyle,
          title: showTitle ? $xeTable.getCellLabel(row, column) : null
        }, clVNs));
        if (showValidTip && errorValidItem) {
          const errRule = errorValidItem.rule;
          const validSlot = slots ? slots.valid : null;
          const validParams = Object.assign(Object.assign(Object.assign({}, cellParams), errorValidItem), {
            rule: errorValidItem
          });
          tdVNs.push((0, _vue.h)('div', {
            key: 'tcv',
            class: ['vxe-cell--valid-error-tip', (0, _dom.getPropClass)(validOpts.className, validParams)],
            style: errRule && errRule.maxWidth ? {
              width: `${errRule.maxWidth}px`
            } : null
          }, [(0, _vue.h)('div', {
            class: `vxe-cell--valid-error-wrapper vxe-cell--valid-error-theme-${validOpts.theme || 'normal'}`
          }, [validSlot ? $xeTable.callSlot(validSlot, validParams) : [(0, _vue.h)('span', {
            class: 'vxe-cell--valid-error-msg'
          }, errorValidItem.content)]])]));
        }
      }
      let showAreaRowStatus = false;
      if (mouseConfig && mouseOpts.area && !_columnIndex && selectCellToRow) {
        showAreaRowStatus = true;
      }
      if (!fixedHiddenColumn && showResizable && isAllColumnDrag) {
        tdVNs.push((0, _vue.h)('div', {
          key: 'tcc',
          class: ['vxe-cell--col-resizable', {
            'is--line': !border || border === 'none'
          }],
          onMousedown: evnt => $xeTable.handleColResizeMousedownEvent(evnt, fixedType, cellParams),
          onDblclick: evnt => $xeTable.handleColResizeDblclickEvent(evnt, cellParams)
        }));
      }
      if ((rowResize || isAllRowDrag) && rowOpts.resizable) {
        tdVNs.push((0, _vue.h)('div', {
          key: 'tcr',
          class: 'vxe-cell--row-resizable',
          onMousedown: evnt => $xeTable.handleRowResizeMousedownEvent(evnt, cellParams),
          onDblclick: evnt => $xeTable.handleRowResizeDblclickEvent(evnt, cellParams)
        }));
      }
      return (0, _vue.h)('td', Object.assign(Object.assign(Object.assign({
        class: ['vxe-table--column vxe-body--column', colid, cellVerticalAlign ? `col--vertical-${cellVerticalAlign}` : '', cellAlign ? `col--${cellAlign}` : '', type ? `col--${type}` : '', {
          'col--last': isLastColumn,
          'col--tree-node': treeNode,
          'col--edit': isEdit,
          'col--ellipsis': hasEllipsis,
          'col--cs-height': isCsHeight,
          'col--rs-height': isRsHeight,
          'col--to-row': showAreaRowStatus,
          'col--auto-height': isVNAutoHeight,
          'fixed--width': !isAutoCellWidth,
          'fixed--hidden': fixedHiddenColumn,
          'is--padding': isCellPadding,
          'is--progress': fixedHiddenColumn && isAllOverflow || isVNPreEmptyStatus,
          'is--drag-cell': isRowDragCell && (isCrossDrag || isPeerDrag || !rowLevel),
          'is--drag-disabled': isDisabledDrag,
          'col--dirty': isDirty,
          'col--active': editConfig && isEdit && actived.row === row && (actived.column === column || editOpts.mode === 'row'),
          'col--valid-error': !!errorValidItem,
          'show--valid-bg': errorValidItem && validOpts.showErrorBackground,
          'col--current': currentColumn === column
        }, (0, _dom.getPropClass)(compCellClassName, cellParams), (0, _dom.getPropClass)(className, cellParams), (0, _dom.getPropClass)(allCellClassName, cellParams)],
        key: columnKey || scrollXLoad || scrollYLoad || columnOpts.useKey || rowOpts.useKey || columnOpts.drag ? colid : $columnIndex
      }, tdAttrs), {
        style: Object.assign({}, _xeUtils.default.isFunction(compCellStyle) ? compCellStyle(cellParams) : compCellStyle, _xeUtils.default.isFunction(cellStyle) ? cellStyle(cellParams) : cellStyle)
      }), tdOns), isOptimizeMode && fixedHiddenColumn ? [] : tdVNs);
    };
    const renderRows = (fixedType, isOptimizeMode, tableData, tableColumn) => {
      const $xeGrid = $xeTable.xeGrid;
      const $xeGantt = $xeTable.xeGantt;
      const {
        stripe,
        rowKey,
        highlightHoverRow,
        rowClassName,
        rowStyle,
        editConfig,
        treeConfig
      } = tableProps;
      const {
        hasFixedColumn,
        treeExpandedFlag,
        scrollYLoad,
        isAllOverflow,
        rowExpandedFlag,
        expandColumn,
        selectRadioRow,
        pendingRowFlag,
        rowExpandHeightFlag,
        isRowGroupStatus
      } = tableReactData;
      const {
        fullAllDataRowIdData,
        fullColumnIdData,
        treeExpandedMaps,
        pendingRowMaps,
        rowExpandedMaps,
        currentRow
      } = tableInternalData;
      const checkboxOpts = computeCheckboxOpts.value;
      const radioOpts = computeRadioOpts.value;
      const treeOpts = computeTreeOpts.value;
      const editOpts = computeEditOpts.value;
      const rowOpts = computeRowOpts.value;
      const columnOpts = computeColumnOpts.value;
      const {
        transform,
        seqMode
      } = treeOpts;
      const childrenField = treeOpts.children || treeOpts.childrenField;
      const rows = [];
      const {
        handleGetRowId
      } = (0, _util.createHandleGetRowId)($xeTable);
      const isDeepRow = treeConfig || isRowGroupStatus;
      tableData.forEach((row, $rowIndex) => {
        const rowid = handleGetRowId(row);
        const rowRest = fullAllDataRowIdData[rowid] || {};
        let rowIndex = $rowIndex;
        let rowLevel = 0;
        let seq = -1;
        let _rowIndex = -1;
        const hasRowGroupAggregate = isRowGroupStatus && row.isAggregate;
        const trOn = {};
        // 当前行事件
        if (rowOpts.isHover || highlightHoverRow) {
          trOn.onMouseover = evnt => {
            if (isVMScrollProcess()) {
              return;
            }
            $xeTable.triggerHoverEvent(evnt, {
              row,
              rowIndex
            });
          };
          trOn.onMouseleave = () => {
            if (isVMScrollProcess()) {
              return;
            }
            $xeTable.clearHoverRow();
          };
        }
        if (rowRest) {
          rowIndex = rowRest.index;
          _rowIndex = rowRest._index;
          rowLevel = rowRest.level;
          seq = rowRest.seq;
          if (hasRowGroupAggregate || treeConfig && transform && seqMode === 'increasing') {
            seq = rowRest._index + 1;
          } else if (treeConfig && seqMode === 'fixed') {
            seq = rowRest._tIndex + 1;
          }
        }
        const params = {
          $table: $xeTable,
          seq,
          rowid,
          fixed: fixedType,
          type: renderType,
          level: rowLevel,
          row,
          rowIndex,
          $rowIndex,
          _rowIndex
        };
        // 行是否被展开
        const isExpandRow = expandColumn && !!rowExpandedFlag && !!rowExpandedMaps[rowid];
        // 树节点是否被展开
        let isExpandTree = false;
        let rowChildren = [];
        let isNewRow = false;
        if (editConfig) {
          isNewRow = $xeTable.isInsertByRow(row);
        }
        if (treeConfig && !scrollYLoad && !transform) {
          rowChildren = row[childrenField];
          isExpandTree = !!treeExpandedFlag && rowChildren && rowChildren.length > 0 && !!treeExpandedMaps[rowid];
        }
        // 拖拽行事件
        if (rowOpts.drag && !isRowGroupStatus && (!treeConfig || transform)) {
          trOn.onDragstart = $xeTable.handleRowDragDragstartEvent;
          trOn.onDragend = $xeTable.handleRowDragDragendEvent;
          trOn.onDragover = $xeTable.handleRowDragDragoverEvent;
        }
        const trClass = ['vxe-body--row', isDeepRow ? `row--level-${rowLevel}` : '', {
          'row--stripe': stripe && (_rowIndex + 1) % 2 === 0,
          'is--new': isNewRow,
          'is--expand-row': isExpandRow,
          'is--expand-tree': isExpandTree,
          'row--new': isNewRow && (editOpts.showStatus || editOpts.showInsertStatus),
          'row--radio': radioOpts.highlight && $xeTable.eqRow(selectRadioRow, row),
          'row--checked': checkboxOpts.highlight && $xeTable.isCheckedByCheckboxRow(row),
          'row--pending': !!pendingRowFlag && !!pendingRowMaps[rowid],
          'row--group': hasRowGroupAggregate,
          'row--current': currentRow && rowid === (0, _util.getRowid)($xeTable, currentRow)
        }, (0, _dom.getPropClass)(rowClassName, params)];
        const tdVNs = tableColumn.map((column, $columnIndex) => {
          return renderTdColumn(seq, rowid, fixedType, isOptimizeMode, rowLevel, row, rowIndex, $rowIndex, _rowIndex, column, $columnIndex, tableColumn, tableData);
        });
        rows.push((0, _vue.h)('tr', Object.assign({
          class: trClass,
          rowid: rowid,
          style: rowStyle ? _xeUtils.default.isFunction(rowStyle) ? rowStyle(params) : rowStyle : null,
          key: rowKey || rowOpts.useKey || rowOpts.drag || columnOpts.drag || isRowGroupStatus || treeConfig ? rowid : $rowIndex
        }, trOn), tdVNs));
        // 如果行被展开了
        if (isExpandRow) {
          const expandOpts = computeExpandOpts.value;
          const {
            height: expandHeight,
            padding,
            mode: expandMode
          } = expandOpts;
          if (expandMode === 'fixed') {
            const currExpHeight = rowRest.expandHeight;
            let expHeight = 0;
            if (rowExpandHeightFlag) {
              if (currExpHeight || expandHeight) {
                expHeight = (currExpHeight || expandHeight || 0) + 1;
              }
            }
            rows.push((0, _vue.h)('tr', {
              class: 'vxe-body--row-expanded-place',
              key: `expand_${rowid}`,
              rowid
            }, [(0, _vue.h)('td', {
              class: 'vxe-body--row-expanded-place-column',
              colspan: tableColumn.length,
              style: {
                height: `${expHeight}px`
              }
            })]));
          } else {
            const cellStyle = {};
            if (expandHeight) {
              cellStyle.height = `${expandHeight}px`;
            }
            if (treeConfig) {
              cellStyle.paddingLeft = `${rowLevel * treeOpts.indent + 30}px`;
            }
            const {
              showOverflow
            } = expandColumn || {};
            const colid = expandColumn.id;
            const colRest = fullColumnIdData[colid] || {};
            const hasEllipsis = _xeUtils.default.eqNull(showOverflow) ? isAllOverflow : showOverflow;
            let columnIndex = -1;
            let $columnIndex = -1;
            let _columnIndex = -1;
            if (colRest) {
              columnIndex = colRest.index;
              $columnIndex = colRest.$index;
              _columnIndex = colRest._index;
            }
            const expandParams = {
              $table: $xeTable,
              $grid: $xeGrid,
              $gantt: $xeGantt,
              seq,
              column: expandColumn,
              columnIndex,
              $columnIndex,
              _columnIndex,
              fixed: fixedType,
              source: sourceType,
              type: renderType,
              level: rowLevel,
              row,
              rowid,
              rowIndex,
              $rowIndex,
              _rowIndex,
              isHidden: false,
              isEdit: false,
              visibleData: [],
              data: [],
              items: []
            };
            rows.push((0, _vue.h)('tr', {
              class: ['vxe-body--expanded-row', {
                'is--padding': padding
              }],
              key: `expand_${rowid}`
            }, [(0, _vue.h)('td', {
              class: ['vxe-body--expanded-column', {
                'fixed--hidden': fixedType && !hasFixedColumn,
                'col--ellipsis': hasEllipsis
              }],
              colspan: tableColumn.length
            }, [(0, _vue.h)('div', {
              class: ['vxe-body--expanded-cell', {
                'is--ellipsis': expandHeight
              }],
              style: cellStyle
            }, [expandColumn.renderData(expandParams)])])]));
          }
        }
        // 如果是树形表格
        if (isExpandTree) {
          rows.push(...renderRows(fixedType, isOptimizeMode, rowChildren, tableColumn));
        }
      });
      return rows;
    };
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        const {
          fixedType
        } = props;
        const {
          elemStore
        } = tableInternalData;
        const prefix = `${fixedType || 'main'}-body-`;
        elemStore[`${prefix}wrapper`] = refElem;
        elemStore[`${prefix}scroll`] = refBodyScroll;
        elemStore[`${prefix}table`] = refBodyTable;
        elemStore[`${prefix}colgroup`] = refBodyColgroup;
        elemStore[`${prefix}list`] = refBodyTBody;
        elemStore[`${prefix}xSpace`] = refBodyXSpace;
        elemStore[`${prefix}ySpace`] = refBodyYSpace;
        elemStore[`${prefix}emptyBlock`] = refBodyEmptyBlock;
      });
    });
    (0, _vue.onUnmounted)(() => {
      const {
        fixedType
      } = props;
      const {
        elemStore
      } = tableInternalData;
      const prefix = `${fixedType || 'main'}-body-`;
      elemStore[`${prefix}wrapper`] = null;
      elemStore[`${prefix}scroll`] = null;
      elemStore[`${prefix}table`] = null;
      elemStore[`${prefix}colgroup`] = null;
      elemStore[`${prefix}list`] = null;
      elemStore[`${prefix}xSpace`] = null;
      elemStore[`${prefix}ySpace`] = null;
      elemStore[`${prefix}emptyBlock`] = null;
    });
    const renderVN = () => {
      const {
        slots
      } = tableContext;
      const $xeGrid = $xeTable.xeGrid;
      const $xeGantt = $xeTable.xeGantt;
      const {
        fixedColumn,
        fixedType,
        tableColumn
      } = props;
      const {
        mouseConfig
      } = tableProps;
      const {
        isGroup,
        tableData,
        isColLoading,
        overflowX,
        scrollXLoad,
        scrollYLoad,
        dragRow,
        dragCol
      } = tableReactData;
      const {
        visibleColumn,
        fullAllDataRowIdData,
        fullColumnIdData
      } = tableInternalData;
      const emptyOpts = computeEmptyOpts.value;
      const mouseOpts = computeMouseOpts.value;
      const isBodyRenderOptimize = computeIsBodyRenderOptimize.value;
      let renderDataList = tableData;
      let renderColumnList = tableColumn;
      const isOptimizeMode = isBodyRenderOptimize;
      if (!isColLoading && (fixedType || !overflowX)) {
        renderColumnList = visibleColumn;
      }
      if (fixedType) {
        if (isOptimizeMode) {
          renderColumnList = fixedColumn || [];
        }
      }
      // 行拖拽
      if (scrollYLoad && dragRow) {
        if (renderDataList.length > 2) {
          const dRowRest = fullAllDataRowIdData[(0, _util.getRowid)($xeTable, dragRow)];
          if (dRowRest) {
            const drIndex = dRowRest._index;
            const firstRow = renderDataList[0];
            const lastRow = renderDataList[renderDataList.length - 1];
            const firstRowRest = fullAllDataRowIdData[(0, _util.getRowid)($xeTable, firstRow)];
            const lastRowRest = fullAllDataRowIdData[(0, _util.getRowid)($xeTable, lastRow)];
            if (firstRowRest && lastRowRest) {
              const frIndex = firstRowRest._index;
              const lrIndex = lastRowRest._index;
              if (drIndex < frIndex) {
                renderDataList = [dragRow].concat(renderDataList);
              } else if (drIndex > lrIndex) {
                renderDataList = renderDataList.concat([dragRow]);
              }
            }
          }
        }
      }
      if (!fixedType && !isGroup) {
        // 列拖拽
        if (scrollXLoad && dragCol) {
          if (renderColumnList.length > 2) {
            const dCowRest = fullColumnIdData[dragCol.id];
            if (dCowRest) {
              const dcIndex = dCowRest._index;
              const firstCol = renderColumnList[0];
              const lastCol = renderColumnList[renderColumnList.length - 1];
              const firstColRest = fullColumnIdData[firstCol.id];
              const lastColRest = fullColumnIdData[lastCol.id];
              if (firstColRest && lastColRest) {
                const fcIndex = firstColRest._index;
                const lcIndex = lastColRest._index;
                if (dcIndex < fcIndex) {
                  renderColumnList = [dragCol].concat(renderColumnList);
                } else if (dcIndex > lcIndex) {
                  renderColumnList = renderColumnList.concat([dragCol]);
                }
              }
            }
          }
        }
      }
      let emptyContent;
      const emptySlot = slots ? slots.empty : null;
      const emptyParams = {
        $table: $xeTable,
        $grid: $xeGrid,
        $gantt: $xeGantt
      };
      if (emptySlot) {
        emptyContent = $xeTable.callSlot(emptySlot, emptyParams);
      } else {
        const compConf = emptyOpts.name ? renderer.get(emptyOpts.name) : null;
        const rtEmptyView = compConf ? compConf.renderTableEmpty || compConf.renderTableEmptyView || compConf.renderEmpty : null;
        if (rtEmptyView) {
          emptyContent = (0, _vn.getSlotVNs)(rtEmptyView(emptyOpts, emptyParams));
        } else {
          emptyContent = tableProps.emptyText || getI18n('vxe.table.emptyText');
        }
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-table--body-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID
      }, [(0, _vue.h)('div', {
        ref: refBodyScroll,
        class: 'vxe-table--body-inner-wrapper',
        onScroll(evnt) {
          $xeTable.triggerBodyScrollEvent(evnt, fixedType);
        }
      }, [fixedType ? renderEmptyElement($xeTable) : (0, _vue.h)('div', {
        ref: refBodyXSpace,
        class: 'vxe-body--x-space'
      }), (0, _vue.h)('div', {
        ref: refBodyYSpace,
        class: 'vxe-body--y-space'
      }), (0, _vue.h)('table', {
        ref: refBodyTable,
        class: 'vxe-table--body',
        xid: xID,
        cellspacing: 0,
        cellpadding: 0,
        border: 0,
        xvm: isOptimizeMode ? '1' : null
      }, [
      /**
       * 列宽
       */
      (0, _vue.h)('colgroup', {
        ref: refBodyColgroup
      }, renderColumnList.map((column, $columnIndex) => {
        return (0, _vue.h)('col', {
          name: column.id,
          key: $columnIndex,
          style: {
            width: `${column.renderWidth}px`
          }
        });
      })),
      /**
       * 内容
       */
      (0, _vue.h)('tbody', {
        ref: refBodyTBody
      }, renderRows(fixedType, isOptimizeMode, renderDataList, renderColumnList))]), (0, _vue.h)('div', {
        class: 'vxe-table--checkbox-range'
      }), mouseConfig && mouseOpts.area ? (0, _vue.h)('div', {
        class: 'vxe-table--cell-area',
        xid: xID
      }, [(0, _vue.h)('span', {
        class: 'vxe-table--cell-main-area'
      }, mouseOpts.extension ? [(0, _vue.h)('span', {
        class: 'vxe-table--cell-main-area-btn',
        onMousedown(evnt) {
          if ($xeTable.triggerCellAreaExtendMousedownEvent) {
            $xeTable.triggerCellAreaExtendMousedownEvent(evnt, {
              $table: $xeTable,
              fixed: fixedType,
              type: renderType
            });
          }
        }
      })] : []), (0, _vue.h)('span', {
        class: 'vxe-table--cell-clip-area'
      }), (0, _vue.h)('span', {
        class: 'vxe-table--cell-extend-area'
      }), (0, _vue.h)('span', {
        class: 'vxe-table--cell-multi-area'
      }), (0, _vue.h)('span', {
        class: 'vxe-table--cell-active-area'
      }), (0, _vue.h)('span', {
        class: 'vxe-table--cell-row-status-area'
      })]) : renderEmptyElement($xeTable), !fixedType ? (0, _vue.h)('div', {
        class: 'vxe-table--empty-block',
        ref: refBodyEmptyBlock
      }, [(0, _vue.h)('div', {
        class: 'vxe-table--empty-content'
      }, emptyContent)]) : renderEmptyElement($xeTable)])]);
    };
    return renderVN;
  }
});