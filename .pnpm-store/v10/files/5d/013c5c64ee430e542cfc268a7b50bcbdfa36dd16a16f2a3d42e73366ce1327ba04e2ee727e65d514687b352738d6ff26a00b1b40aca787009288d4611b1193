"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _dom = require("../../ui/src/dom");
var _util = require("./util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  renderer,
  renderEmptyElement
} = _ui.VxeUI;
const sourceType = 'table';
const renderType = 'footer';
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTableFooter',
  props: {
    footerTableData: {
      type: Array,
      default: () => []
    },
    tableColumn: {
      type: Array,
      default: () => []
    },
    fixedColumn: {
      type: Array,
      default: () => []
    },
    fixedType: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const $xeTable = (0, _vue.inject)('$xeTable', {});
    const {
      xID,
      props: tableProps,
      reactData: tableReactData,
      internalData: tableInternalData
    } = $xeTable;
    const {
      computeFooterTooltipOpts,
      computeColumnOpts,
      computeCellOpts,
      computeFooterCellOpts,
      computeDefaultRowHeight,
      computeResizableOpts,
      computeVirtualXOpts,
      computeIsFooterRenderOptimize
    } = $xeTable.getComputeMaps();
    const refElem = (0, _vue.ref)();
    const refFooterScroll = (0, _vue.ref)();
    const refFooterTable = (0, _vue.ref)();
    const refFooterColgroup = (0, _vue.ref)();
    const refFooterTFoot = (0, _vue.ref)();
    const refFooterXSpace = (0, _vue.ref)();
    const renderRows = (isOptimizeMode, tableColumn, footerTableData, row, $rowIndex, _rowIndex) => {
      const $xeGrid = $xeTable.xeGrid;
      const $xeGantt = $xeTable.xeGantt;
      const {
        fixedType
      } = props;
      const {
        resizable: allResizable,
        border,
        footerCellClassName,
        footerCellStyle,
        footerAlign: allFooterAlign,
        footerSpanMethod,
        align: allAlign,
        columnKey,
        showFooterOverflow: allColumnFooterOverflow
      } = tableProps;
      const {
        scrollXLoad,
        scrollYLoad,
        overflowX,
        currentColumn,
        mergeFootFlag
      } = tableReactData;
      const {
        fullColumnIdData,
        mergeFooterList,
        mergeFooterCellMaps,
        scrollXStore
      } = tableInternalData;
      const virtualXOpts = computeVirtualXOpts.value;
      const footerTooltipOpts = computeFooterTooltipOpts.value;
      const resizableOpts = computeResizableOpts.value;
      const {
        isAllColumnDrag
      } = resizableOpts;
      const columnOpts = computeColumnOpts.value;
      const defaultRowHeight = computeDefaultRowHeight.value;
      const cellOpts = computeCellOpts.value;
      const footerCellOpts = computeFooterCellOpts.value;
      const currCellHeight = (0, _util.getCalcHeight)(footerCellOpts.height) || defaultRowHeight;
      return tableColumn.map((column, $columnIndex) => {
        const {
          type,
          showFooterOverflow,
          footerAlign,
          align,
          footerClassName,
          editRender,
          cellRender
        } = column;
        const colid = column.id;
        const colRest = fullColumnIdData[colid] || {};
        const renderOpts = editRender || cellRender;
        const compConf = renderOpts ? renderer.get(renderOpts.name) : null;
        const showAllTip = footerTooltipOpts.showAll;
        const fixedHiddenColumn = overflowX && (fixedType ? column.fixed !== fixedType : !!column.fixed);
        const isPadding = _xeUtils.default.isBoolean(footerCellOpts.padding) ? footerCellOpts.padding : cellOpts.padding;
        const footOverflow = _xeUtils.default.eqNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow;
        const footAlign = footerAlign || (compConf ? compConf.tableFooterCellAlign : '') || allFooterAlign || align || (compConf ? compConf.tableCellAlign : '') || allAlign;
        const showEllipsis = footOverflow === 'ellipsis';
        const showTitle = footOverflow === 'title';
        const showTooltip = footOverflow === true || footOverflow === 'tooltip';
        const hasEllipsis = showTitle || showTooltip || showEllipsis;
        const showResizable = _xeUtils.default.isBoolean(column.resizable) ? column.resizable : columnOpts.resizable || allResizable;
        const attrs = {
          colid
        };
        const tfOns = {};
        const columnIndex = colRest.index;
        const _columnIndex = colRest._index;
        const itemIndex = _columnIndex;
        const cellParams = {
          $table: $xeTable,
          $grid: $xeGrid,
          $gantt: $xeGantt,
          row,
          rowIndex: _rowIndex,
          _rowIndex,
          $rowIndex,
          column,
          columnIndex,
          $columnIndex,
          _columnIndex,
          itemIndex,
          items: row,
          fixed: fixedType,
          source: sourceType,
          type: renderType,
          data: footerTableData
        };
        if (showTitle || showTooltip || showAllTip) {
          tfOns.onMouseenter = evnt => {
            if (showTitle) {
              (0, _dom.updateCellTitle)(evnt.currentTarget, column);
            } else if (showTooltip || showAllTip) {
              $xeTable.triggerFooterTooltipEvent(evnt, cellParams);
            }
          };
        }
        if (showTooltip || showAllTip) {
          tfOns.onMouseleave = evnt => {
            if (showTooltip || showAllTip) {
              $xeTable.handleTargetLeaveEvent(evnt);
            }
          };
        }
        tfOns.onClick = evnt => {
          $xeTable.triggerFooterCellClickEvent(evnt, cellParams);
        };
        tfOns.onDblclick = evnt => {
          $xeTable.triggerFooterCellDblclickEvent(evnt, cellParams);
        };
        let isMergeCell = false;
        // 合并行或列
        if (mergeFootFlag && mergeFooterList.length) {
          const spanRest = mergeFooterCellMaps[`${_rowIndex}:${_columnIndex}`];
          if (spanRest) {
            const {
              rowspan,
              colspan
            } = spanRest;
            if (!rowspan || !colspan) {
              return null;
            }
            if (rowspan > 1) {
              isMergeCell = true;
              attrs.rowspan = rowspan;
            }
            if (colspan > 1) {
              isMergeCell = true;
              attrs.colspan = colspan;
            }
          }
        } else if (footerSpanMethod) {
          // 自定义合并方法
          const {
            rowspan = 1,
            colspan = 1
          } = footerSpanMethod(cellParams) || {};
          if (!rowspan || !colspan) {
            return null;
          }
          if (rowspan > 1) {
            attrs.rowspan = rowspan;
          }
          if (colspan > 1) {
            attrs.colspan = colspan;
          }
        }
        const isLastColumn = $columnIndex === tableColumn.length - 1;
        const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto');
        let isVNPreEmptyStatus = false;
        if (isOptimizeMode && overflowX && !isMergeCell) {
          if (scrollXLoad && tableColumn.length > 10 && !column.fixed && !virtualXOpts.immediate && (_columnIndex < scrollXStore.visibleStartIndex - scrollXStore.preloadSize || _columnIndex > scrollXStore.visibleEndIndex + scrollXStore.preloadSize)) {
            isVNPreEmptyStatus = true;
          }
        }
        const tcStyle = {};
        if (hasEllipsis) {
          tcStyle.height = `${currCellHeight}px`;
        } else {
          tcStyle.minHeight = `${currCellHeight}px`;
        }
        return (0, _vue.h)('td', Object.assign(Object.assign(Object.assign(Object.assign({
          class: ['vxe-table--column vxe-footer--column', column.id, {
            [`col--${footAlign}`]: footAlign,
            [`col--${type}`]: type,
            'col--last': isLastColumn,
            'fixed--width': !isAutoCellWidth,
            'fixed--hidden': fixedHiddenColumn,
            'is--padding': isPadding,
            'col--ellipsis': hasEllipsis,
            'col--current': currentColumn === column
          }, (0, _dom.getPropClass)(footerClassName, cellParams), (0, _dom.getPropClass)(footerCellClassName, cellParams)]
        }, attrs), {
          style: footerCellStyle ? _xeUtils.default.isFunction(footerCellStyle) ? footerCellStyle(cellParams) : footerCellStyle : null
        }), tfOns), {
          key: columnKey || scrollXLoad || scrollYLoad || columnOpts.useKey || columnOpts.drag ? column.id : $columnIndex
        }), [(0, _vue.h)('div', {
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }],
          style: tcStyle
        }, isVNPreEmptyStatus ? [] : [(0, _vue.h)('div', {
          colid,
          class: 'vxe-cell--wrapper vxe-footer-cell--wrapper'
        }, column.renderFooter(cellParams))]),
        /**
         * 列宽拖动
         */
        !fixedHiddenColumn && showResizable && isAllColumnDrag ? (0, _vue.h)('div', {
          class: ['vxe-cell--col-resizable', {
            'is--line': !border || border === 'none'
          }],
          onMousedown: evnt => $xeTable.handleColResizeMousedownEvent(evnt, fixedType, cellParams),
          onDblclick: evnt => $xeTable.handleColResizeDblclickEvent(evnt, cellParams)
        }) : renderEmptyElement($xeTable)]);
      });
    };
    const renderHeads = (isOptimizeMode, renderColumnList) => {
      const {
        fixedType,
        footerTableData
      } = props;
      const {
        footerRowClassName,
        footerRowStyle
      } = tableProps;
      return footerTableData.map((row, $rowIndex) => {
        const _rowIndex = $rowIndex;
        const rowParams = {
          $table: $xeTable,
          row,
          _rowIndex,
          $rowIndex,
          fixed: fixedType,
          type: renderType
        };
        return (0, _vue.h)('tr', {
          key: $rowIndex,
          class: ['vxe-footer--row', footerRowClassName ? _xeUtils.default.isFunction(footerRowClassName) ? footerRowClassName(rowParams) : footerRowClassName : ''],
          style: footerRowStyle ? _xeUtils.default.isFunction(footerRowStyle) ? footerRowStyle(rowParams) : footerRowStyle : null
        }, renderRows(isOptimizeMode, renderColumnList, footerTableData, row, $rowIndex, _rowIndex));
      });
    };
    const renderVN = () => {
      const {
        fixedType,
        fixedColumn,
        tableColumn
      } = props;
      const {
        visibleColumn,
        fullColumnIdData
      } = tableInternalData;
      const {
        isGroup,
        isColLoading,
        overflowX,
        scrollXLoad,
        dragCol
      } = tableReactData;
      const isFooterRenderOptimize = computeIsFooterRenderOptimize.value;
      let renderColumnList = tableColumn;
      const isOptimizeMode = isFooterRenderOptimize;
      if (!isOptimizeMode || !isColLoading && (fixedType || !overflowX)) {
        renderColumnList = visibleColumn;
      }
      if (fixedType) {
        if (isOptimizeMode) {
          renderColumnList = fixedColumn || [];
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
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-table--footer-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID
      }, [(0, _vue.h)('div', {
        ref: refFooterScroll,
        class: 'vxe-table--footer-inner-wrapper',
        onScroll(evnt) {
          $xeTable.triggerFooterScrollEvent(evnt, fixedType);
        }
      }, [fixedType ? renderEmptyElement($xeTable) : (0, _vue.h)('div', {
        ref: refFooterXSpace,
        class: 'vxe-body--x-space'
      }), (0, _vue.h)('table', {
        ref: refFooterTable,
        class: 'vxe-table--footer',
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
        ref: refFooterColgroup
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
      * 底部
      */
      (0, _vue.h)('tfoot', {
        ref: refFooterTFoot
      }, renderHeads(isOptimizeMode, renderColumnList))])])]);
    };
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        const {
          fixedType
        } = props;
        const {
          elemStore
        } = tableInternalData;
        const prefix = `${fixedType || 'main'}-footer-`;
        elemStore[`${prefix}wrapper`] = refElem;
        elemStore[`${prefix}scroll`] = refFooterScroll;
        elemStore[`${prefix}table`] = refFooterTable;
        elemStore[`${prefix}colgroup`] = refFooterColgroup;
        elemStore[`${prefix}list`] = refFooterTFoot;
        elemStore[`${prefix}xSpace`] = refFooterXSpace;
      });
    });
    (0, _vue.onUnmounted)(() => {
      const {
        fixedType
      } = props;
      const {
        elemStore
      } = tableInternalData;
      const prefix = `${fixedType || 'main'}-footer-`;
      elemStore[`${prefix}wrapper`] = null;
      elemStore[`${prefix}scroll`] = null;
      elemStore[`${prefix}table`] = null;
      elemStore[`${prefix}colgroup`] = null;
      elemStore[`${prefix}list`] = null;
      elemStore[`${prefix}xSpace`] = null;
    });
    return renderVN;
  }
});