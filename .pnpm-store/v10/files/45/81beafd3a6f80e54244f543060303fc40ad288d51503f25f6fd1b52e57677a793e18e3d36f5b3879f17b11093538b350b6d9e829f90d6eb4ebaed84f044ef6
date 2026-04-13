"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
var _util = require("./util");
var _vn = require("../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  renderer,
  renderEmptyElement
} = _ui.VxeUI;
const sourceType = 'table';
const renderType = 'header';
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTableHeader',
  props: {
    tableData: Array,
    tableColumn: Array,
    tableGroupColumn: Array,
    fixedColumn: Array,
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
      computeColumnOpts,
      computeColumnDragOpts,
      computeCellOpts,
      computeMouseOpts,
      computeHeaderCellOpts,
      computeDefaultRowHeight,
      computeVirtualXOpts,
      computeFloatingFilterOpts,
      computeIsHeaderRenderOptimize
    } = $xeTable.getComputeMaps();
    const headerColumn = (0, _vue.ref)([]);
    const refElem = (0, _vue.ref)();
    const refHeaderScroll = (0, _vue.ref)();
    const refHeaderTable = (0, _vue.ref)();
    const refHeaderColgroup = (0, _vue.ref)();
    const refHeaderTHead = (0, _vue.ref)();
    const refHeaderXSpace = (0, _vue.ref)();
    const refHeaderBorderRepair = (0, _vue.ref)();
    const uploadColumn = () => {
      const {
        showCustomHeader
      } = tableProps;
      const {
        collectColumn,
        visibleColumn
      } = tableInternalData;
      const {
        tableGroupColumn
      } = props;
      const {
        isGroup
      } = tableReactData;
      let spanColumns = isGroup ? (0, _util.convertHeaderColumnToRows)(tableGroupColumn) : [];
      let visibleColgroups = [];
      if (showCustomHeader && spanColumns.length > 1) {
        visibleColgroups = (0, _util.convertHeaderToGridRows)(spanColumns);
        spanColumns = visibleColgroups;
      }
      headerColumn.value = spanColumns;
      $xeTable.dispatchEvent('columns-change', {
        visibleColgroups,
        collectColumn,
        visibleColumn
      }, null);
    };
    const renderRows = (isGroup, isOptimizeMode, headerGroups, $rowIndex, cols) => {
      const $xeGrid = $xeTable.xeGrid;
      const $xeGantt = $xeTable.xeGantt;
      const {
        fixedType
      } = props;
      const {
        resizable: allResizable,
        columnKey,
        showCustomHeader,
        headerCellClassName,
        headerCellStyle,
        showHeaderOverflow: allColumnHeaderOverflow,
        headerAlign: allHeaderAlign,
        align: allAlign,
        mouseConfig
      } = tableProps;
      const {
        currentColumn,
        dragCol,
        scrollXLoad,
        scrollYLoad,
        overflowX,
        mergeHeadFlag,
        tableColumn
      } = tableReactData;
      const {
        fullColumnIdData,
        scrollXStore,
        mergeHeaderList,
        mergeHeaderCellMaps
      } = tableInternalData;
      const virtualXOpts = computeVirtualXOpts.value;
      const columnOpts = computeColumnOpts.value;
      const columnDragOpts = computeColumnDragOpts.value;
      const cellOpts = computeCellOpts.value;
      const defaultRowHeight = computeDefaultRowHeight.value;
      const headerCellOpts = computeHeaderCellOpts.value;
      const currCellHeight = (0, _util.getCalcHeight)(headerCellOpts.height) || defaultRowHeight;
      const {
        disabledMethod: dragDisabledMethod,
        isCrossDrag,
        isPeerDrag
      } = columnDragOpts;
      const isLastRow = $rowIndex === headerGroups.length - 1;
      return cols.map((column, $columnIndex) => {
        const {
          type,
          showHeaderOverflow,
          headerAlign,
          align,
          filters,
          headerClassName,
          editRender,
          cellRender
        } = column;
        const colid = column.id;
        const colRest = fullColumnIdData[colid] || {};
        const renderOpts = editRender || cellRender;
        const compConf = renderOpts ? renderer.get(renderOpts.name) : null;
        const isColGroup = column.children && column.children.length;
        const fixedHiddenColumn = overflowX && !isColGroup && (fixedType ? column.fixed !== fixedType : !!column.fixed);
        const isPadding = _xeUtils.default.isBoolean(headerCellOpts.padding) ? headerCellOpts.padding : cellOpts.padding;
        const headOverflow = _xeUtils.default.eqNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
        const headAlign = headerAlign || (compConf ? compConf.tableHeaderCellAlign : '') || allHeaderAlign || align || (compConf ? compConf.tableCellAlign : '') || allAlign;
        const showEllipsis = headOverflow === 'ellipsis';
        const showTitle = headOverflow === 'title';
        const showTooltip = headOverflow === true || headOverflow === 'tooltip';
        const hasEllipsis = showTitle || showTooltip || showEllipsis;
        let hasFilter = false;
        let firstFilterOption = null;
        if (filters) {
          firstFilterOption = filters[0];
          hasFilter = filters.some(item => item.checked);
        }
        const columnIndex = colRest.index;
        const _columnIndex = colRest._index;
        const cellParams = {
          $table: $xeTable,
          $grid: $xeGrid,
          $gantt: $xeGantt,
          $rowIndex,
          column,
          columnIndex,
          $columnIndex,
          _columnIndex,
          firstFilterOption: firstFilterOption,
          fixed: fixedType,
          source: sourceType,
          type: renderType,
          isHidden: fixedHiddenColumn,
          hasFilter
        };
        const thAttrs = {
          colid
        };
        let isMergeCell = false;
        // 合并行或列
        if (!showCustomHeader) {
          thAttrs.colspan = column.colSpan > 1 ? column.colSpan : null;
          thAttrs.rowspan = column.rowSpan > 1 ? column.rowSpan : null;
        }
        if (mergeHeadFlag && mergeHeaderList.length && (showCustomHeader || isLastRow)) {
          const spanRest = mergeHeaderCellMaps[`${$rowIndex}:${showCustomHeader ? $columnIndex : _columnIndex}`];
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
              thAttrs.rowspan = rowspan;
            }
            if (colspan > 1) {
              isMergeCell = true;
              thAttrs.colspan = colspan;
            }
          }
        }
        const thOns = {
          onClick: evnt => $xeTable.triggerHeaderCellClickEvent(evnt, cellParams),
          onDblclick: evnt => $xeTable.triggerHeaderCellDblclickEvent(evnt, cellParams)
        };
        const isColDragCell = columnOpts.drag && columnDragOpts.trigger === 'cell';
        let isDisabledDrag = false;
        if (isColDragCell) {
          isDisabledDrag = !!(dragDisabledMethod && dragDisabledMethod(cellParams));
        }
        // 按下事件处理
        if (mouseConfig || isColDragCell) {
          thOns.onMousedown = evnt => $xeTable.triggerHeaderCellMousedownEvent(evnt, cellParams);
        }
        // 拖拽列事件
        if (columnOpts.drag) {
          thOns.onDragstart = $xeTable.handleHeaderCellDragDragstartEvent;
          thOns.onDragend = $xeTable.handleHeaderCellDragDragendEvent;
          thOns.onDragover = $xeTable.handleHeaderCellDragDragoverEvent;
          if (isColDragCell) {
            thOns.onMouseup = $xeTable.handleHeaderCellDragMouseupEvent;
          }
        }
        const isLastColumn = $columnIndex === cols.length - 1;
        const showResizable = _xeUtils.default.isBoolean(column.resizable) ? column.resizable : columnOpts.resizable || allResizable;
        const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto');
        let isVNPreEmptyStatus = false;
        if (isOptimizeMode && overflowX && !isGroup && !isMergeCell) {
          if (!dragCol || dragCol.id !== colid) {
            if (scrollXLoad && tableColumn.length > 10 && !column.fixed && !virtualXOpts.immediate && (_columnIndex < scrollXStore.visibleStartIndex - scrollXStore.preloadSize || _columnIndex > scrollXStore.visibleEndIndex + scrollXStore.preloadSize)) {
              isVNPreEmptyStatus = true;
            }
          }
        }
        const tcStyle = {};
        if (hasEllipsis) {
          tcStyle.height = `${currCellHeight}px`;
        } else {
          tcStyle.minHeight = `${currCellHeight}px`;
        }
        if (showCustomHeader) {
          // custom
        } else if (isColGroup && !isLastRow) {
          let childWidth = 0;
          _xeUtils.default.eachTree(column.children, childRow => {
            if (childRow.visible && (!childRow.children || !childRow.children.length)) {
              childWidth += childRow.renderWidth;
            }
          });
          tcStyle.width = `${childWidth}px`;
        }
        return (0, _vue.h)('th', Object.assign(Object.assign(Object.assign({
          class: ['vxe-table--column vxe-header--column', colid, fixedHiddenColumn ? 'fixed--hidden' : 'fixed--visible', {
            [`col--${headAlign}`]: headAlign,
            [`col--${type}`]: type,
            'col--last': isLastColumn,
            'col--fixed': column.fixed,
            'col--group': isColGroup,
            'col--ellipsis': hasEllipsis,
            'fixed--width': !isAutoCellWidth,
            'is--padding': isPadding,
            'is--sortable': column.sortable,
            'col--filter': !!filters,
            'is--filter-active': hasFilter,
            'is--drag-active': columnOpts.drag && !column.fixed && !isDisabledDrag && (isCrossDrag || isPeerDrag || !column.parentId),
            'is--drag-disabled': columnOpts.drag && isDisabledDrag,
            'col--current': currentColumn === column
          }, headerClassName ? _xeUtils.default.isFunction(headerClassName) ? headerClassName(cellParams) : headerClassName : '', headerCellClassName ? _xeUtils.default.isFunction(headerCellClassName) ? headerCellClassName(cellParams) : headerCellClassName : ''],
          style: headerCellStyle ? _xeUtils.default.isFunction(headerCellStyle) ? headerCellStyle(cellParams) : headerCellStyle : null
        }, thAttrs), thOns), {
          key: showCustomHeader ? `${colid}${$columnIndex}` : columnKey || scrollXLoad || scrollYLoad || columnOpts.useKey || columnOpts.drag || isColGroup ? colid : $columnIndex
        }), [(0, _vue.h)('div', {
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }],
          style: tcStyle
        }, isVNPreEmptyStatus || isOptimizeMode && fixedHiddenColumn ? [] : [(0, _vue.h)('div', {
          colid,
          class: 'vxe-cell--wrapper vxe-header-cell--wrapper'
        }, column.renderHeader(cellParams))]),
        /**
         * 列宽拖动
         */
        !fixedHiddenColumn && showResizable && (!showCustomHeader || isLastRow) ? (0, _vue.h)('div', {
          class: 'vxe-cell--col-resizable',
          onMousedown: evnt => $xeTable.handleColResizeMousedownEvent(evnt, fixedType, cellParams),
          onDblclick: evnt => $xeTable.handleColResizeDblclickEvent(evnt, cellParams)
        }) : renderEmptyElement($xeTable)]);
      });
    };
    const renderFilterRows = (isOptimizeMode, cols) => {
      const $xeGrid = $xeTable.xeGrid;
      const $xeGantt = $xeTable.xeGantt;
      const {
        fixedType
      } = props;
      const {
        showHeaderOverflow: allColumnHeaderOverflow,
        headerAlign: allHeaderAlign,
        align: allAlign
      } = tableProps;
      const {
        currentColumn,
        overflowX
      } = tableReactData;
      const {
        fullColumnIdData
      } = tableInternalData;
      const cellOpts = computeCellOpts.value;
      const defaultRowHeight = computeDefaultRowHeight.value;
      const headerCellOpts = computeHeaderCellOpts.value;
      const currCellHeight = (0, _util.getCalcHeight)(headerCellOpts.height) || defaultRowHeight;
      return cols.map((column, $columnIndex) => {
        const {
          type,
          showHeaderOverflow,
          headerAlign,
          align,
          filters,
          editRender,
          cellRender,
          floatingFilters,
          filterRender,
          slots
        } = column;
        const colid = column.id;
        const colRest = fullColumnIdData[colid] || {};
        const renderOpts = editRender || cellRender;
        const flSlot = slots ? slots.floatingFilter || slots['floating-filter'] : null;
        const compConf = renderOpts ? renderer.get(renderOpts.name) : null;
        const flCompConf = (0, _utils.isEnableConf)(filterRender) ? renderer.get(filterRender.name) : null;
        const rtFloatingFilter = flCompConf ? flCompConf.renderTableFloatingFilter : null;
        const fixedHiddenColumn = overflowX && (fixedType ? column.fixed !== fixedType : !!column.fixed);
        const isPadding = _xeUtils.default.isBoolean(headerCellOpts.padding) ? headerCellOpts.padding : cellOpts.padding;
        const headOverflow = _xeUtils.default.eqNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
        const headAlign = headerAlign || (compConf ? compConf.tableHeaderCellAlign : '') || allHeaderAlign || align || (compConf ? compConf.tableCellAlign : '') || allAlign;
        const showEllipsis = headOverflow === 'ellipsis';
        const showTitle = headOverflow === 'title';
        const showTooltip = headOverflow === true || headOverflow === 'tooltip';
        const hasEllipsis = showTitle || showTooltip || showEllipsis;
        let hasFilter = false;
        let firstFilterOption = null;
        if (filters) {
          firstFilterOption = filters[0];
          hasFilter = filters.some(item => item.checked);
        }
        const columnIndex = colRest.index;
        const _columnIndex = colRest._index;
        const cellParams = {
          $table: $xeTable,
          $grid: $xeGrid,
          $gantt: $xeGantt,
          column,
          columnIndex,
          $columnIndex,
          _columnIndex,
          option: firstFilterOption,
          fixed: fixedType,
          source: sourceType,
          type: renderType,
          isHidden: fixedHiddenColumn,
          hasFilter
        };
        const thAttrs = {
          colid
        };
        const isLastColumn = $columnIndex === cols.length - 1;
        const isAutoCellWidth = !column.resizeWidth && (column.minWidth === 'auto' || column.width === 'auto');
        const tcStyle = {};
        if (hasEllipsis) {
          tcStyle.height = `${currCellHeight}px`;
        } else {
          tcStyle.minHeight = `${currCellHeight}px`;
        }
        return (0, _vue.h)('th', Object.assign({
          class: ['vxe-table--column vxe-header--column', colid, fixedHiddenColumn ? 'fixed--hidden' : 'fixed--visible', {
            [`col--${headAlign}`]: headAlign,
            [`col--${type}`]: type,
            'col--last': isLastColumn,
            'col--fixed': column.fixed,
            'col--ellipsis': hasEllipsis,
            'fixed--width': !isAutoCellWidth,
            'is--padding': isPadding,
            'is--sortable': column.sortable,
            'col--current': currentColumn === column
          }],
          key: colid
        }, thAttrs), [(0, _vue.h)('div', {
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }],
          style: tcStyle
        }, isOptimizeMode && fixedHiddenColumn && !floatingFilters ? [] : [(0, _vue.h)('div', {
          colid,
          class: 'vxe-cell--wrapper vxe-header-cell--wrapper'
        }, flSlot ? $xeTable.callSlot(flSlot, cellParams) : rtFloatingFilter && firstFilterOption ? (0, _vn.getSlotVNs)(rtFloatingFilter(filterRender, cellParams)) : [])])]);
      });
    };
    const renderHeads = (isGroup, isOptimizeMode, headerGroups, renderColumnList) => {
      const {
        fixedType
      } = props;
      const {
        headerRowClassName,
        headerRowStyle
      } = tableProps;
      const floatingFilterOpts = computeFloatingFilterOpts.value;
      const rowVNs = headerGroups.map((cols, $rowIndex) => {
        const params = {
          $table: $xeTable,
          $rowIndex,
          fixed: fixedType,
          type: renderType
        };
        return (0, _vue.h)('tr', {
          key: $rowIndex,
          class: ['vxe-header--row', headerRowClassName ? _xeUtils.default.isFunction(headerRowClassName) ? headerRowClassName(params) : headerRowClassName : ''],
          style: headerRowStyle ? _xeUtils.default.isFunction(headerRowStyle) ? headerRowStyle(params) : headerRowStyle : null
        }, renderRows(isGroup, isOptimizeMode, headerGroups, $rowIndex, cols));
      });
      if (floatingFilterOpts.enabled) {
        rowVNs.push((0, _vue.h)('tr', {
          key: 'ff',
          class: ['vxe-header--row']
        }, renderFilterRows(isOptimizeMode, renderColumnList)));
      }
      return rowVNs;
    };
    const renderVN = () => {
      const {
        fixedType,
        fixedColumn,
        tableColumn
      } = props;
      const {
        mouseConfig
      } = tableProps;
      const {
        isGroup,
        isColLoading,
        overflowX,
        scrollXLoad,
        dragCol
      } = tableReactData;
      const {
        visibleColumn,
        fullColumnIdData
      } = tableInternalData;
      const mouseOpts = computeMouseOpts.value;
      const isHeaderRenderOptimize = computeIsHeaderRenderOptimize.value;
      let renderHeaderList = headerColumn.value || [];
      let renderColumnList = tableColumn;
      const isOptimizeMode = isHeaderRenderOptimize;
      if (isGroup) {
        renderColumnList = visibleColumn;
      } else {
        if (!isOptimizeMode || !isColLoading && (fixedType || !overflowX)) {
          renderColumnList = visibleColumn;
        }
        if (fixedType) {
          // 如果是使用优化模式
          if (isOptimizeMode) {
            renderColumnList = fixedColumn || [];
          }
        }
        renderHeaderList = [renderColumnList];
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
                  renderHeaderList = [[dragCol].concat(renderHeaderList[0])].concat(renderHeaderList.slice(1));
                } else if (dcIndex > lcIndex) {
                  renderColumnList = renderColumnList.concat([dragCol]);
                  renderHeaderList = [renderHeaderList[0].concat([dragCol])].concat(renderHeaderList.slice(1));
                }
              }
            }
          }
        }
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-table--header-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
        xid: xID
      }, [(0, _vue.h)('div', {
        ref: refHeaderScroll,
        class: 'vxe-table--header-inner-wrapper',
        onScroll(evnt) {
          $xeTable.triggerHeaderScrollEvent(evnt, fixedType);
        }
      }, [fixedType ? renderEmptyElement($xeTable) : (0, _vue.h)('div', {
        ref: refHeaderXSpace,
        class: 'vxe-body--x-space'
      }), (0, _vue.h)('table', {
        ref: refHeaderTable,
        class: 'vxe-table--header',
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
        ref: refHeaderColgroup
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
       * 头部
       */
      (0, _vue.h)('thead', {
        ref: refHeaderTHead
      }, renderHeads(isGroup, isOptimizeMode, renderHeaderList, renderColumnList))]), mouseConfig && mouseOpts.area ? (0, _vue.h)('div', {
        class: 'vxe-table--cell-area',
        xid: xID
      }, [(0, _vue.h)('span', {
        class: 'vxe-table--cell-main-area'
      }), (0, _vue.h)('span', {
        class: 'vxe-table--cell-clip-area'
      }), (0, _vue.h)('span', {
        class: 'vxe-table--cell-extend-area'
      }), (0, _vue.h)('span', {
        class: 'vxe-table--cell-multi-area'
      }), (0, _vue.h)('span', {
        class: 'vxe-table--cell-active-area'
      }), (0, _vue.h)('span', {
        class: 'vxe-table--cell-col-status-area'
      })]) : renderEmptyElement($xeTable)])]);
    };
    (0, _vue.watch)(() => props.tableColumn, uploadColumn);
    (0, _vue.onMounted)(() => {
      (0, _vue.nextTick)(() => {
        const {
          fixedType
        } = props;
        const {
          internalData
        } = $xeTable;
        const {
          elemStore
        } = internalData;
        const prefix = `${fixedType || 'main'}-header-`;
        elemStore[`${prefix}wrapper`] = refElem;
        elemStore[`${prefix}scroll`] = refHeaderScroll;
        elemStore[`${prefix}table`] = refHeaderTable;
        elemStore[`${prefix}colgroup`] = refHeaderColgroup;
        elemStore[`${prefix}list`] = refHeaderTHead;
        elemStore[`${prefix}xSpace`] = refHeaderXSpace;
        elemStore[`${prefix}repair`] = refHeaderBorderRepair;
        uploadColumn();
      });
    });
    (0, _vue.onUnmounted)(() => {
      const {
        fixedType
      } = props;
      const {
        internalData
      } = $xeTable;
      const {
        elemStore
      } = internalData;
      const prefix = `${fixedType || 'main'}-header-`;
      elemStore[`${prefix}wrapper`] = null;
      elemStore[`${prefix}scroll`] = null;
      elemStore[`${prefix}table`] = null;
      elemStore[`${prefix}colgroup`] = null;
      elemStore[`${prefix}list`] = null;
      elemStore[`${prefix}xSpace`] = null;
      elemStore[`${prefix}repair`] = null;
    });
    return renderVN;
  }
});