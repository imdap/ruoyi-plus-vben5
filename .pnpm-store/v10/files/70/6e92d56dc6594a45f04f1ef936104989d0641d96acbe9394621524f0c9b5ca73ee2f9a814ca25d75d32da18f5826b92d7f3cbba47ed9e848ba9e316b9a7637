"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Cell = void 0;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _utils = require("../../ui/src/utils");
var _dom = require("../../ui/src/dom");
var _util = require("./util");
var _vn = require("../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getI18n,
  getIcon,
  renderer,
  renderEmptyElement
} = _ui.VxeUI;
function renderTitlePrefixIcon(params) {
  const {
    $table,
    column
  } = params;
  const titlePrefix = column.titlePrefix || column.titleHelp;
  if (titlePrefix) {
    return (0, _vue.h)('span', {
      class: ['vxe-cell-title-prefix-icon', titlePrefix.iconStatus ? `theme--${titlePrefix.iconStatus}` : ''],
      onMouseenter(evnt) {
        $table.triggerHeaderTitleEvent(evnt, titlePrefix, params);
      },
      onMouseleave(evnt) {
        $table.handleTargetLeaveEvent(evnt);
      }
    }, [(0, _vue.h)('i', {
      class: titlePrefix.icon || getIcon().TABLE_TITLE_PREFIX
    })]);
  }
  return renderEmptyElement($table);
}
function renderTitleSuffixIcon(params) {
  const {
    $table,
    column
  } = params;
  const titleSuffix = column.titleSuffix;
  if (titleSuffix) {
    return (0, _vue.h)('span', {
      class: ['vxe-cell-title-suffix-icon', titleSuffix.iconStatus ? `theme--${titleSuffix.iconStatus}` : ''],
      onMouseenter(evnt) {
        $table.triggerHeaderTitleEvent(evnt, titleSuffix, params);
      },
      onMouseleave(evnt) {
        $table.handleTargetLeaveEvent(evnt);
      }
    }, [(0, _vue.h)('i', {
      class: titleSuffix.icon || getIcon().TABLE_TITLE_SUFFIX
    })]);
  }
  return renderEmptyElement($table);
}
function renderCellDragIcon(params) {
  const {
    $table,
    column
  } = params;
  const {
    context
  } = $table;
  const tableSlots = context.slots;
  const tableProps = $table.props;
  const {
    slots
  } = column;
  const {
    dragConfig
  } = tableProps;
  const {
    computeRowDragOpts
  } = $table.getComputeMaps();
  const rowDragOpts = computeRowDragOpts.value;
  const {
    icon,
    trigger,
    disabledMethod
  } = rowDragOpts;
  const rDisabledMethod = disabledMethod || (dragConfig ? dragConfig.rowDisabledMethod : null);
  const isDisabled = rDisabledMethod && rDisabledMethod(params);
  const rowDragIconSlot = (slots ? slots.rowDragIcon || slots['row-drag-icon'] : null) || tableSlots.rowDragIcon || tableSlots['row-drag-icon'];
  const ons = {};
  if (trigger !== 'cell') {
    ons.onMousedown = evnt => {
      if (!isDisabled) {
        $table.handleCellDragMousedownEvent(evnt, params);
      }
    };
    ons.onMouseup = $table.handleCellDragMouseupEvent;
  }
  return (0, _vue.h)('span', Object.assign({
    key: 'dg',
    class: ['vxe-cell--drag-handle', {
      'is--disabled': isDisabled
    }]
  }, ons), rowDragIconSlot ? $table.callSlot(rowDragIconSlot, params) : [(0, _vue.h)('i', {
    class: icon || (dragConfig ? dragConfig.rowIcon : '') || getIcon().TABLE_DRAG_ROW
  })]);
}
function renderCellBaseVNs(params, content) {
  const {
    $table,
    column,
    level
  } = params;
  const {
    dragSort
  } = column;
  const tableProps = $table.props;
  const {
    treeConfig,
    dragConfig
  } = tableProps;
  const {
    computeRowOpts,
    computeRowDragOpts,
    computeTreeOpts
  } = $table.getComputeMaps();
  const rowOpts = computeRowOpts.value;
  const rowDragOpts = computeRowDragOpts.value;
  const treeOpts = computeTreeOpts.value;
  const {
    showIcon,
    isPeerDrag,
    isCrossDrag,
    visibleMethod
  } = rowDragOpts;
  const rVisibleMethod = visibleMethod || (dragConfig ? dragConfig.rowVisibleMethod : null);
  const vns = [];
  if (dragSort && rowOpts.drag && (showIcon || (dragConfig ? dragConfig.showRowIcon : false)) && (!rVisibleMethod || rVisibleMethod(params))) {
    if (treeConfig) {
      if (treeOpts.transform && (isPeerDrag || isCrossDrag || !level)) {
        vns.push(renderCellDragIcon(params));
      }
    } else {
      vns.push(renderCellDragIcon(params));
    }
  }
  return vns.concat(_xeUtils.default.isArray(content) ? content : [content]);
}
function renderHeaderCellDragIcon(params) {
  const {
    $table,
    column
  } = params;
  const {
    context
  } = $table;
  const tableSlots = context.slots;
  const {
    slots
  } = column;
  const {
    computeColumnOpts,
    computeColumnDragOpts
  } = $table.getComputeMaps();
  const columnOpts = computeColumnOpts.value;
  const columnDragOpts = computeColumnDragOpts.value;
  const {
    showIcon,
    icon,
    trigger,
    isPeerDrag,
    isCrossDrag,
    visibleMethod,
    disabledMethod
  } = columnDragOpts;
  if (columnOpts.drag && showIcon && (!visibleMethod || visibleMethod(params))) {
    if (!column.fixed && (isPeerDrag || isCrossDrag || !column.parentId)) {
      const isDisabled = disabledMethod && disabledMethod(params);
      const columnDragIconSlot = (slots ? slots.columnDragIcon || slots['column-drag-icon'] : null) || tableSlots.columnDragIcon || tableSlots['column-drag-icon'];
      const ons = {};
      if (trigger !== 'cell') {
        ons.onMousedown = evnt => {
          if (!isDisabled) {
            $table.handleHeaderCellDragMousedownEvent(evnt, params);
          }
        };
        ons.onMouseup = $table.handleHeaderCellDragMouseupEvent;
      }
      return (0, _vue.h)('span', Object.assign({
        key: 'dg',
        class: ['vxe-cell--drag-handle', {
          'is--disabled': isDisabled
        }]
      }, ons), columnDragIconSlot ? $table.callSlot(columnDragIconSlot, params) : [(0, _vue.h)('i', {
        class: icon || getIcon().TABLE_DRAG_COLUMN
      })]);
    }
  }
  return renderEmptyElement($table);
}
function renderHeaderCellBaseVNs(params, content) {
  const vns = [renderTitlePrefixIcon(params), renderHeaderCellDragIcon(params), ...(_xeUtils.default.isArray(content) ? content : [content]), renderTitleSuffixIcon(params)];
  return vns;
}
function getRenderDefaultColumnTitle(column, content) {
  if (column.type === 'html' && _xeUtils.default.isString(content)) {
    return (0, _vue.h)('span', {
      key: 'ch',
      innerHTML: content
    });
  }
  return (0, _vue.h)('span', {
    key: 'ct'
  }, (0, _vn.getSlotVNs)(content));
}
function renderTitleContent(params, content) {
  const {
    $table,
    column
  } = params;
  const tableProps = $table.props;
  const tableReactData = $table.reactData;
  const {
    computeHeaderTooltipOpts
  } = $table.getComputeMaps();
  const {
    showHeaderOverflow: allColumnHeaderOverflow
  } = tableProps;
  const {
    isRowGroupStatus
  } = tableReactData;
  const {
    showHeaderOverflow,
    slots
  } = column;
  const titleSlot = slots ? slots.title : null;
  const headerTooltipOpts = computeHeaderTooltipOpts.value;
  const showAllTip = headerTooltipOpts.showAll;
  const headOverflow = _xeUtils.default.eqNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
  const showTitle = headOverflow === 'title';
  const showTooltip = headOverflow === true || headOverflow === 'tooltip';
  const ons = {};
  if (showTitle || showTooltip || showAllTip) {
    ons.onMouseenter = evnt => {
      if (tableReactData.isDragResize) {
        return;
      }
      if (showTitle) {
        (0, _dom.updateCellTitle)(evnt.currentTarget, column);
      } else if (showTooltip || showAllTip) {
        $table.triggerHeaderTooltipEvent(evnt, params);
      }
    };
  }
  if (showTooltip || showAllTip) {
    ons.onMouseleave = evnt => {
      if (tableReactData.isDragResize) {
        return;
      }
      if (showTooltip || showAllTip) {
        $table.handleTargetLeaveEvent(evnt);
      }
    };
  }
  const titleVN = getRenderDefaultColumnTitle(column, content);
  return [(0, _vue.h)('span', Object.assign({
    class: 'vxe-cell--title'
  }, ons), isRowGroupStatus && column.aggFunc && $table.getPivotTableAggregateRenderColTitles ? $table.getPivotTableAggregateRenderColTitles(column, titleVN) : titleSlot ? $table.callSlot(titleSlot, params) : [titleVN])];
}
function getFooterContent(params) {
  const {
    $table,
    column,
    row
  } = params;
  const tableProps = $table.props;
  const {
    editConfig
  } = tableProps;
  const {
    slots,
    editRender,
    cellRender
  } = column;
  const footerSlot = slots ? slots.footer : null;
  if (footerSlot) {
    return $table.callSlot(footerSlot, params);
  }
  const isEnableEdit = editConfig && (0, _utils.isEnableConf)(editConfig);
  const editRenderOpts = isEnableEdit && (0, _utils.isEnableConf)(editRender) ? editRender : null;
  const cellRenderOpts = (0, _utils.isEnableConf)(cellRender) ? cellRender : null;
  const renderOpts = editRenderOpts || cellRenderOpts;
  const itemValue = $table.getFooterCellLabel(row, column);
  if (renderOpts) {
    const compConf = renderer.get(renderOpts.name);
    if (compConf) {
      const rtFooter = compConf.renderTableFooter || compConf.renderFooter;
      if (rtFooter) {
        const footParams = Object.assign(params, {
          cellValue: itemValue,
          itemValue
        });
        return (0, _vn.getSlotVNs)(rtFooter(renderOpts, footParams));
      }
    }
  }
  return [(0, _vue.h)('span', {
    class: 'vxe-cell--label'
  }, (0, _utils.formatText)(itemValue, 1))];
}
function getDefaultCellLabel(params) {
  const {
    $table,
    row,
    column
  } = params;
  return (0, _utils.formatText)($table.getCellLabel(row, column), 1);
}
function renderCellHandle(params) {
  const {
    column,
    row,
    $table
  } = params;
  const tableProps = $table.props;
  const tableReactData = $table.reactData;
  const {
    isRowGroupStatus
  } = tableReactData;
  const {
    editConfig
  } = tableProps;
  const {
    type,
    treeNode,
    rowGroupNode,
    editRender
  } = column;
  const {
    computeEditOpts,
    computeCheckboxOpts,
    computeAggregateOpts
  } = $table.getComputeMaps();
  const aggregateOpts = computeAggregateOpts.value;
  const {
    mode
  } = aggregateOpts;
  const checkboxOpts = computeCheckboxOpts.value;
  const editOpts = computeEditOpts.value;
  const isDeepCell = treeNode || isRowGroupStatus && (mode === 'column' ? column.field === row.groupField : rowGroupNode);
  switch (type) {
    case 'seq':
      return isDeepCell ? Cell.renderDeepIndexCell(params) : Cell.renderSeqCell(params);
    case 'radio':
      return isDeepCell ? Cell.renderDeepRadioCell(params) : Cell.renderRadioCell(params);
    case 'checkbox':
      return checkboxOpts.checkField ? isDeepCell ? Cell.renderDeepSelectionCellByProp(params) : Cell.renderCheckboxCellByProp(params) : isDeepCell ? Cell.renderDeepSelectionCell(params) : Cell.renderCheckboxCell(params);
    case 'expand':
      return Cell.renderExpandCell(params);
    case 'html':
      return isDeepCell ? Cell.renderDeepHTMLCell(params) : Cell.renderHTMLCell(params);
  }
  const isEnableEdit = editConfig && (0, _utils.isEnableConf)(editConfig);
  const editRenderOpts = isEnableEdit && (0, _utils.isEnableConf)(editRender) ? editRender : null;
  if (editRenderOpts) {
    return editOpts.mode === 'cell' ? isDeepCell ? Cell.renderDeepCellEdit(params) : Cell.renderCellEdit(params) : isDeepCell ? Cell.renderDeepRowEdit(params) : Cell.renderRowEdit(params);
  }
  return isDeepCell ? Cell.renderDeepCell(params) : Cell.renderDefaultCell(params);
}
function renderHeaderHandle(params) {
  const {
    column,
    $table
  } = params;
  const tableProps = $table.props;
  const {
    editConfig
  } = tableProps;
  const {
    type,
    filters,
    sortable,
    editRender
  } = column;
  switch (type) {
    case 'seq':
      return Cell.renderSeqHeader(params);
    case 'radio':
      return Cell.renderRadioHeader(params);
    case 'checkbox':
      return Cell.renderCheckboxHeader(params);
    case 'html':
      if (filters && sortable) {
        return Cell.renderSortAndFilterHeader(params);
      } else if (sortable) {
        return Cell.renderSortHeader(params);
      } else if (filters) {
        return Cell.renderFilterHeader(params);
      }
      break;
  }
  const isEnableEdit = editConfig && (0, _utils.isEnableConf)(editConfig);
  const editRenderOpts = isEnableEdit && (0, _utils.isEnableConf)(editRender) ? editRender : null;
  if (editRenderOpts) {
    return Cell.renderEditHeader(params);
  } else if (filters && sortable) {
    return Cell.renderSortAndFilterHeader(params);
  } else if (sortable) {
    return Cell.renderSortHeader(params);
  } else if (filters) {
    return Cell.renderFilterHeader(params);
  }
  return Cell.renderDefaultHeader(params);
}
function renderFooterHandle(params) {
  return Cell.renderDefaultFooter(params);
}
const Cell = exports.Cell = {
  createColumn($xeTable, columnOpts) {
    const {
      type
    } = columnOpts;
    const renConfs = {
      renderHeader: renderHeaderHandle,
      renderCell: renderCellHandle,
      renderFooter: renderFooterHandle
    };
    if (type === 'expand') {
      renConfs.renderData = Cell.renderExpandData;
    }
    return (0, _util.createColumn)($xeTable, columnOpts, renConfs);
  },
  /**
   * 列头标题
   */
  renderHeaderTitle(params) {
    const {
      $table,
      column
    } = params;
    const tableProps = $table.props;
    const {
      editConfig
    } = tableProps;
    const {
      slots,
      editRender,
      cellRender
    } = column;
    const headerSlot = slots ? slots.header : null;
    if (headerSlot) {
      return renderTitleContent(params, $table.callSlot(headerSlot, params));
    }
    const isEnableEdit = editConfig && (0, _utils.isEnableConf)(editConfig);
    const editRenderOpts = isEnableEdit && (0, _utils.isEnableConf)(editRender) ? editRender : null;
    const cellRenderOpts = (0, _utils.isEnableConf)(cellRender) ? cellRender : null;
    const renderOpts = editRenderOpts || cellRenderOpts;
    if (renderOpts) {
      const compConf = renderer.get(renderOpts.name);
      if (compConf) {
        const rtHeader = compConf.renderTableHeader || compConf.renderHeader;
        if (rtHeader) {
          return renderTitleContent(params, (0, _vn.getSlotVNs)(rtHeader(renderOpts, params)));
        }
      }
    }
    return renderTitleContent(params, (0, _utils.formatText)(column.getTitle(), 1));
  },
  renderDefaultHeader(params) {
    return renderHeaderCellBaseVNs(params, Cell.renderHeaderTitle(params));
  },
  renderDefaultCell(params) {
    const {
      $table,
      row,
      column
    } = params;
    const tableProps = $table.props;
    const tableReactData = $table.reactData;
    const tableInternalData = $table.internalData;
    const {
      isRowGroupStatus
    } = tableReactData;
    const {
      editConfig
    } = tableProps;
    const {
      field,
      slots,
      editRender,
      cellRender,
      rowGroupNode,
      aggFunc,
      formatter
    } = column;
    const isEnableEdit = editConfig && (0, _utils.isEnableConf)(editConfig);
    const editRenderOpts = isEnableEdit && (0, _utils.isEnableConf)(editRender) ? editRender : null;
    const cellRenderOpts = (0, _utils.isEnableConf)(cellRender) ? cellRender : null;
    const defaultSlot = slots ? slots.default : null;
    const gcSlot = slots ? slots.groupContent || slots['group-content'] : null;
    const gvSlot = slots ? slots.groupValues || slots['group-values'] : null;
    let cellValue = '';
    if (isRowGroupStatus && field && row.isAggregate) {
      const aggRow = row;
      const {
        fullColumnFieldData
      } = tableInternalData;
      const {
        computeAggregateOpts
      } = $table.getComputeMaps();
      const aggregateOpts = computeAggregateOpts.value;
      const {
        mode,
        showTotal,
        totalMethod,
        countFields,
        contentMethod,
        formatValuesMethod,
        mapChildrenField
      } = aggregateOpts;
      const aggData = aggRow.aggData;
      const currAggData = aggData ? aggData[field] : null;
      const groupField = aggRow.groupField;
      const groupContent = aggRow.groupContent;
      const childList = mapChildrenField ? aggRow[mapChildrenField] || [] : [];
      const childCount = aggRow.childCount;
      const colRest = fullColumnFieldData[groupField] || {};
      const ctParams = {
        $table,
        groupField,
        groupColumn: colRest ? colRest.column : null,
        column,
        groupValue: groupContent,
        childList,
        childCount,
        aggValue: null,
        /**
         * 已废弃
         * @deprecated
         */
        children: childList,
        /**
         * 已废弃
         * @deprecated
         */
        totalValue: childCount
      };
      if (mode === 'column' ? field === aggRow.groupField : rowGroupNode) {
        cellValue = groupContent;
        if (contentMethod) {
          cellValue = `${contentMethod(ctParams)}`;
        }
        if (showTotal) {
          cellValue = getI18n('vxe.table.rowGroupContentTotal', [cellValue, totalMethod ? totalMethod(ctParams) : childCount, childCount]);
        }
        if (gcSlot) {
          return renderCellBaseVNs(params, $table.callSlot(gcSlot, Object.assign({
            groupField,
            groupContent,
            childList,
            childCount
          }, params)));
        }
      } else if ($table.getPivotTableAggregateCellAggValue) {
        cellValue = $table.getPivotTableAggregateCellAggValue(params);
        ctParams.aggValue = cellValue;
        if (gvSlot) {
          return renderCellBaseVNs(params, $table.callSlot(gvSlot, Object.assign({
            groupField,
            groupContent,
            childList,
            childCount
          }, params, ctParams)));
        }
      } else if (aggFunc === true || countFields && countFields.includes(field)) {
        cellValue = currAggData ? currAggData.value : childCount;
        ctParams.aggValue = cellValue;
        if (formatValuesMethod) {
          cellValue = formatValuesMethod(ctParams);
        }
        if (gvSlot) {
          return renderCellBaseVNs(params, $table.callSlot(gvSlot, Object.assign({
            groupField,
            groupContent,
            childList,
            childCount
          }, params, ctParams)));
        }
      }
    } else {
      if (defaultSlot) {
        return renderCellBaseVNs(params, $table.callSlot(defaultSlot, params));
      }
      const renderOpts = editRenderOpts || cellRenderOpts;
      // formatter > (renderTableCell | renderTableDefault)
      if (renderOpts && !formatter) {
        const compConf = renderer.get(renderOpts.name);
        if (compConf) {
          const renderFn = editRenderOpts ? compConf.renderTableCell || compConf.renderCell : compConf.renderTableDefault || compConf.renderDefault;
          if (renderFn) {
            return renderCellBaseVNs(params, (0, _vn.getSlotVNs)(renderFn(renderOpts, Object.assign({
              $type: editRenderOpts ? 'edit' : 'cell'
            }, params))));
          }
        }
      }
      cellValue = $table.getCellLabel(row, column);
    }
    const cellPlaceholder = editRenderOpts ? editRenderOpts.placeholder : '';
    return renderCellBaseVNs(params, [(0, _vue.h)('span', {
      class: 'vxe-cell--label'
    }, [
    // 如果设置占位符
    editRenderOpts && (0, _utils.eqEmptyValue)(cellValue) ? (0, _vue.h)('span', {
      class: 'vxe-cell--placeholder'
    }, (0, _utils.formatText)((0, _utils.getFuncText)(cellPlaceholder), 1)) : (0, _vue.h)('span', (0, _utils.formatText)(cellValue, 1))])]);
  },
  renderDeepCell(params) {
    return Cell.renderDeepNodeBtn(params, Cell.renderDefaultCell(params));
  },
  renderDefaultFooter(params) {
    return getFooterContent(params);
  },
  /**
   * 行分组
   */
  renderRowGroupBtn(params, cellVNodes) {
    const {
      $table
    } = params;
    const tableReactData = $table.reactData;
    const tableInternalData = $table.internalData;
    const {
      row,
      level
    } = params;
    const {
      computeAggregateOpts
    } = $table.getComputeMaps();
    const {
      rowGroupExpandedFlag
    } = tableReactData;
    const {
      rowGroupExpandedMaps
    } = tableInternalData;
    const aggregateOpts = computeAggregateOpts.value;
    const {
      mode,
      padding,
      indent,
      showIcon,
      iconOpen,
      iconClose
    } = aggregateOpts;
    const rowid = (0, _util.getRowid)($table, row);
    const isExpand = !!rowGroupExpandedFlag && !!rowGroupExpandedMaps[rowid];
    return (0, _vue.h)('div', {
      class: ['vxe-row-group--tree-node', {
        'is--expanded': isExpand
      }],
      style: mode !== 'column' && padding && indent ? {
        paddingLeft: `${level * indent}px`
      } : undefined
    }, [showIcon && row.isAggregate ? (0, _vue.h)('span', {
      class: 'vxe-row-group--node-btn',
      onClick(evnt) {
        $table.triggerRowGroupExpandEvent(evnt, params);
      }
    }, [(0, _vue.h)('i', {
      class: isExpand ? iconOpen || getIcon().TABLE_ROW_GROUP_OPEN : iconClose || getIcon().TABLE_ROW_GROUP_CLOSE
    })]) : renderEmptyElement($table), (0, _vue.h)('div', {
      class: 'vxe-row-group-cell'
    }, cellVNodes)]);
  },
  /**
   * 树
   */
  renderTreeNodeBtn(params, cellVNodes) {
    const {
      $table,
      isHidden
    } = params;
    const tableReactData = $table.reactData;
    const tableInternalData = $table.internalData;
    const {
      row,
      column,
      level
    } = params;
    const {
      slots
    } = column;
    const iconSlot = slots ? slots.icon : null;
    if (iconSlot) {
      return $table.callSlot(iconSlot, params);
    }
    const {
      computeTreeOpts
    } = $table.getComputeMaps();
    const {
      treeExpandedFlag
    } = tableReactData;
    const {
      fullAllDataRowIdData,
      treeExpandedMaps,
      treeExpandLazyLoadedMaps
    } = tableInternalData;
    const treeOpts = computeTreeOpts.value;
    const {
      padding,
      indent,
      lazy,
      trigger,
      iconLoaded,
      showIcon,
      iconOpen,
      iconClose
    } = treeOpts;
    const childrenField = treeOpts.children || treeOpts.childrenField;
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField;
    const rowChilds = row[childrenField];
    const hasChild = rowChilds && rowChilds.length;
    let hasLazyChilds = false;
    let isActive = false;
    let isLazyLoading = false;
    let isLazyLoaded = false;
    const ons = {};
    if (!isHidden) {
      const rowid = (0, _util.getRowid)($table, row);
      isActive = !!treeExpandedFlag && !!treeExpandedMaps[rowid];
      if (lazy) {
        const rest = fullAllDataRowIdData[rowid];
        isLazyLoading = !!treeExpandLazyLoadedMaps[rowid];
        hasLazyChilds = row[hasChildField];
        isLazyLoaded = !!rest.treeLoaded;
      }
    }
    if (!trigger || trigger === 'default') {
      ons.onClick = evnt => {
        $table.triggerTreeExpandEvent(evnt, params);
      };
    }
    return (0, _vue.h)('div', {
      class: ['vxe-cell--tree-node', {
        'is--active': isActive
      }],
      style: padding && indent ? {
        paddingLeft: `${level * indent}px`
      } : undefined
    }, [showIcon && (lazy ? isLazyLoaded ? hasChild : hasChild || hasLazyChilds : hasChild) ? [(0, _vue.h)('div', Object.assign({
      class: 'vxe-cell--tree-btn'
    }, ons), [(0, _vue.h)('i', {
      class: isLazyLoading ? iconLoaded || getIcon().TABLE_TREE_LOADED : isActive ? iconOpen || getIcon().TABLE_TREE_OPEN : iconClose || getIcon().TABLE_TREE_CLOSE
    })])] : null, (0, _vue.h)('div', {
      class: 'vxe-tree-cell'
    }, cellVNodes)]);
  },
  /**
   * 层级节点。
   * 行分组、树结构
   */
  renderDeepNodeBtn(params, cellVNodes) {
    const {
      $table,
      row,
      column
    } = params;
    const {
      rowGroupNode
    } = column;
    const tableReactData = $table.reactData;
    const {
      rowGroupList
    } = tableReactData;
    if (rowGroupList.length) {
      const {
        computeAggregateOpts
      } = $table.getComputeMaps();
      const aggregateOpts = computeAggregateOpts.value;
      const {
        mode
      } = aggregateOpts;
      if (mode === 'column' ? column.field === row.groupField : rowGroupNode) {
        return [Cell.renderRowGroupBtn(params, cellVNodes)];
      }
    }
    return [Cell.renderTreeNodeBtn(params, cellVNodes)];
  },
  /**
   * 序号
   */
  renderSeqHeader(params) {
    const {
      $table,
      column
    } = params;
    const {
      slots
    } = column;
    const headerSlot = slots ? slots.header : null;
    return renderHeaderCellBaseVNs(params, renderTitleContent(params, headerSlot ? $table.callSlot(headerSlot, params) : (0, _utils.formatText)(column.getTitle(), 1)));
  },
  renderSeqCell(params) {
    const {
      $table,
      column
    } = params;
    const tableProps = $table.props;
    const {
      treeConfig
    } = tableProps;
    const {
      computeSeqOpts
    } = $table.getComputeMaps();
    const seqOpts = computeSeqOpts.value;
    const {
      slots
    } = column;
    const defaultSlot = slots ? slots.default : null;
    if (defaultSlot) {
      return renderCellBaseVNs(params, $table.callSlot(defaultSlot, params));
    }
    const {
      seq
    } = params;
    const seqMd = seqOpts.seqMethod;
    return renderCellBaseVNs(params, [(0, _vue.h)('span', `${(0, _utils.formatText)(seqMd ? seqMd(params) : treeConfig ? seq : (seqOpts.startIndex || 0) + seq, 1)}`)]);
  },
  renderDeepIndexCell(params) {
    return Cell.renderDeepNodeBtn(params, Cell.renderSeqCell(params));
  },
  /**
   * 单选
   */
  renderRadioHeader(params) {
    const {
      $table,
      column
    } = params;
    const {
      slots
    } = column;
    const headerSlot = slots ? slots.header : null;
    const titleSlot = slots ? slots.title : null;
    return renderHeaderCellBaseVNs(params, renderTitleContent(params, headerSlot ? $table.callSlot(headerSlot, params) : [(0, _vue.h)('span', {
      class: 'vxe-radio--label'
    }, titleSlot ? $table.callSlot(titleSlot, params) : (0, _utils.formatText)(column.getTitle(), 1))]));
  },
  renderRadioCell(params) {
    const {
      $table,
      column,
      isHidden
    } = params;
    const tableReactData = $table.reactData;
    const {
      computeRadioOpts
    } = $table.getComputeMaps();
    const {
      selectRadioRow
    } = tableReactData;
    const radioOpts = computeRadioOpts.value;
    const {
      slots
    } = column;
    const {
      labelField,
      checkMethod,
      visibleMethod
    } = radioOpts;
    const {
      row
    } = params;
    const defaultSlot = slots ? slots.default : null;
    const radioSlot = slots ? slots.radio : null;
    const isChecked = $table.eqRow(row, selectRadioRow);
    const isVisible = !visibleMethod || visibleMethod({
      $table,
      row
    });
    let isDisabled = !!checkMethod;
    let ons;
    if (!isHidden) {
      ons = {
        onClick(evnt) {
          if (!isDisabled && isVisible) {
            $table.triggerRadioRowEvent(evnt, params);
          }
        }
      };
      if (checkMethod) {
        isDisabled = !checkMethod({
          $table,
          row
        });
      }
    }
    const radioParams = Object.assign(Object.assign({}, params), {
      checked: isChecked,
      disabled: isDisabled,
      visible: isVisible
    });
    if (radioSlot) {
      return renderCellBaseVNs(params, $table.callSlot(radioSlot, radioParams));
    }
    const radioVNs = [];
    if (isVisible) {
      radioVNs.push((0, _vue.h)('span', {
        class: ['vxe-radio--icon', isChecked ? getIcon().TABLE_RADIO_CHECKED : isDisabled ? getIcon().TABLE_RADIO_DISABLED_UNCHECKED : getIcon().TABLE_RADIO_UNCHECKED]
      }));
    }
    if (defaultSlot || labelField) {
      radioVNs.push((0, _vue.h)('span', {
        class: 'vxe-radio--label'
      }, defaultSlot ? $table.callSlot(defaultSlot, radioParams) : _xeUtils.default.get(row, labelField)));
    }
    return renderCellBaseVNs(params, [(0, _vue.h)('span', Object.assign({
      class: ['vxe-cell--radio', {
        'is--checked': isChecked,
        'is--disabled': isDisabled
      }]
    }, ons), radioVNs)]);
  },
  renderDeepRadioCell(params) {
    return Cell.renderDeepNodeBtn(params, Cell.renderRadioCell(params));
  },
  /**
   * 多选
   */
  renderCheckboxHeader(params) {
    const {
      $table,
      column,
      isHidden
    } = params;
    const tableReactData = $table.reactData;
    const {
      computeIsAllCheckboxDisabled,
      computeCheckboxOpts
    } = $table.getComputeMaps();
    const {
      isAllSelected: isAllCheckboxSelected,
      isIndeterminate: isAllCheckboxIndeterminate
    } = tableReactData;
    const isAllCheckboxDisabled = computeIsAllCheckboxDisabled.value;
    const {
      slots
    } = column;
    const headerSlot = slots ? slots.header : null;
    const titleSlot = slots ? slots.title : null;
    const checkboxOpts = computeCheckboxOpts.value;
    const {
      checkStrictly,
      showHeader,
      headerTitle
    } = checkboxOpts;
    const colTitle = column.getTitle();
    const ons = {};
    if (!isHidden) {
      ons.onClick = evnt => {
        if (!isAllCheckboxDisabled) {
          $table.triggerCheckAllEvent(evnt, !isAllCheckboxSelected);
        }
      };
    }
    const checkboxParams = Object.assign(Object.assign({}, params), {
      checked: isAllCheckboxSelected,
      disabled: isAllCheckboxDisabled,
      indeterminate: isAllCheckboxIndeterminate
    });
    if (headerSlot) {
      return renderHeaderCellBaseVNs(params, renderTitleContent(checkboxParams, $table.callSlot(headerSlot, checkboxParams)));
    }
    if (checkStrictly ? !showHeader : showHeader === false) {
      return renderHeaderCellBaseVNs(params, renderTitleContent(checkboxParams, [(0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, titleSlot ? $table.callSlot(titleSlot, checkboxParams) : colTitle)]));
    }
    return renderHeaderCellBaseVNs(params, renderTitleContent(checkboxParams, [(0, _vue.h)('span', Object.assign({
      class: ['vxe-cell--checkbox', {
        'is--checked': isAllCheckboxSelected,
        'is--disabled': isAllCheckboxDisabled,
        'is--indeterminate': isAllCheckboxIndeterminate
      }],
      title: _xeUtils.default.eqNull(headerTitle) ? getI18n('vxe.table.allTitle') : `${headerTitle || ''}`
    }, ons), [(0, _vue.h)('span', {
      class: ['vxe-checkbox--icon', isAllCheckboxIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isAllCheckboxSelected ? getIcon().TABLE_CHECKBOX_CHECKED : isAllCheckboxDisabled ? getIcon().TABLE_CHECKBOX_DISABLED_UNCHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
    })].concat(titleSlot || colTitle ? [(0, _vue.h)('span', {
      class: 'vxe-checkbox--label'
    }, titleSlot ? $table.callSlot(titleSlot, checkboxParams) : colTitle)] : []))]));
  },
  renderCheckboxCell(params) {
    const {
      $table,
      row,
      column,
      isHidden
    } = params;
    const tableProps = $table.props;
    const tableReactData = $table.reactData;
    const tableInternalData = $table.internalData;
    const {
      treeConfig
    } = tableProps;
    const {
      updateCheckboxFlag,
      isRowGroupStatus
    } = tableReactData;
    const {
      selectCheckboxMaps,
      treeIndeterminateRowMaps
    } = tableInternalData;
    const {
      computeCheckboxOpts,
      computeAggregateOpts
    } = $table.getComputeMaps();
    const aggregateOpts = computeAggregateOpts.value;
    const {
      mapChildrenField
    } = aggregateOpts;
    const checkboxOpts = computeCheckboxOpts.value;
    const {
      labelField,
      checkMethod,
      visibleMethod
    } = checkboxOpts;
    const {
      slots
    } = column;
    const defaultSlot = slots ? slots.default : null;
    const checkboxSlot = slots ? slots.checkbox : null;
    let indeterminate = false;
    let isChecked = false;
    let isVisible = true;
    let isDisabled = false;
    const ons = {};
    if (!isHidden) {
      const rowid = (0, _util.getRowid)($table, row);
      isChecked = !!updateCheckboxFlag && !!selectCheckboxMaps[rowid];
      if (checkMethod && isRowGroupStatus && $table.isAggregateRecord(row)) {
        const childList = row[mapChildrenField || ''];
        if (!childList || !childList.length || childList.every(item => !checkMethod({
          $table,
          row: item
        }))) {
          isDisabled = true;
        }
      } else {
        isVisible = !visibleMethod || visibleMethod({
          $table,
          row
        });
        isDisabled = checkMethod ? !checkMethod({
          $table,
          row
        }) : !!checkMethod;
      }
      if (treeConfig || isRowGroupStatus) {
        indeterminate = !!treeIndeterminateRowMaps[rowid];
      }
      ons.onClick = evnt => {
        if (!isDisabled && isVisible) {
          $table.triggerCheckRowEvent(evnt, params, !isChecked);
        }
      };
    }
    const checkboxParams = Object.assign(Object.assign({}, params), {
      checked: isChecked,
      disabled: isDisabled,
      visible: isVisible,
      indeterminate
    });
    if (checkboxSlot) {
      return renderCellBaseVNs(params, $table.callSlot(checkboxSlot, checkboxParams));
    }
    const checkVNs = [];
    if (isVisible) {
      checkVNs.push((0, _vue.h)('span', {
        class: ['vxe-checkbox--icon', indeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : isDisabled ? getIcon().TABLE_CHECKBOX_DISABLED_UNCHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
      }));
    }
    if (defaultSlot || labelField) {
      checkVNs.push((0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams) : _xeUtils.default.get(row, labelField)));
    }
    return renderCellBaseVNs(params, [(0, _vue.h)('span', Object.assign({
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isDisabled,
        'is--indeterminate': indeterminate,
        'is--hidden': !isVisible
      }]
    }, ons), checkVNs)]);
  },
  renderDeepSelectionCell(params) {
    return Cell.renderDeepNodeBtn(params, Cell.renderCheckboxCell(params));
  },
  renderCheckboxCellByProp(params) {
    const {
      $table,
      row,
      column,
      isHidden
    } = params;
    const tableProps = $table.props;
    const tableReactData = $table.reactData;
    const tableInternalData = $table.internalData;
    const {
      treeConfig
    } = tableProps;
    const {
      updateCheckboxFlag,
      isRowGroupStatus
    } = tableReactData;
    const {
      treeIndeterminateRowMaps
    } = tableInternalData;
    const {
      computeCheckboxOpts,
      computeAggregateOpts
    } = $table.getComputeMaps();
    const aggregateOpts = computeAggregateOpts.value;
    const {
      mapChildrenField
    } = aggregateOpts;
    const checkboxOpts = computeCheckboxOpts.value;
    const {
      labelField,
      checkField,
      checkMethod,
      visibleMethod
    } = checkboxOpts;
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField;
    const {
      slots
    } = column;
    const defaultSlot = slots ? slots.default : null;
    const checkboxSlot = slots ? slots.checkbox : null;
    let indeterminate = false;
    let isChecked = false;
    let isVisible = true;
    let isDisabled = false;
    const ons = {};
    if (!isHidden) {
      const rowid = (0, _util.getRowid)($table, row);
      isChecked = !!updateCheckboxFlag && _xeUtils.default.get(row, checkField);
      if (checkMethod && isRowGroupStatus && $table.isAggregateRecord(row)) {
        const childList = row[mapChildrenField || ''];
        if (!childList || !childList.length || childList.every(item => !checkMethod({
          $table,
          row: item
        }))) {
          isDisabled = true;
        }
      } else {
        isVisible = !visibleMethod || visibleMethod({
          $table,
          row
        });
        isDisabled = checkMethod ? !checkMethod({
          $table,
          row
        }) : !!checkMethod;
      }
      if (treeConfig || isRowGroupStatus) {
        indeterminate = !!treeIndeterminateRowMaps[rowid];
      }
      ons.onClick = evnt => {
        if (!isDisabled && isVisible) {
          $table.triggerCheckRowEvent(evnt, params, !isChecked);
        }
      };
    }
    const checkboxParams = Object.assign(Object.assign({}, params), {
      checked: isChecked,
      disabled: isDisabled,
      visible: isVisible,
      indeterminate
    });
    if (checkboxSlot) {
      return renderCellBaseVNs(params, $table.callSlot(checkboxSlot, checkboxParams));
    }
    const checkVNs = [];
    if (isVisible) {
      checkVNs.push((0, _vue.h)('span', {
        class: ['vxe-checkbox--icon', indeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : isDisabled ? getIcon().TABLE_CHECKBOX_DISABLED_UNCHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
      }));
      if (defaultSlot || labelField) {
        checkVNs.push((0, _vue.h)('span', {
          class: 'vxe-checkbox--label'
        }, defaultSlot ? $table.callSlot(defaultSlot, checkboxParams) : _xeUtils.default.get(row, labelField)));
      }
    }
    return renderCellBaseVNs(params, [(0, _vue.h)('span', Object.assign({
      class: ['vxe-cell--checkbox', {
        'is--checked': isChecked,
        'is--disabled': isDisabled,
        'is--indeterminate': indeterminateField && !isChecked ? row[indeterminateField] : indeterminate,
        'is--hidden': !isVisible
      }]
    }, ons), checkVNs)]);
  },
  renderDeepSelectionCellByProp(params) {
    return Cell.renderDeepNodeBtn(params, Cell.renderCheckboxCellByProp(params));
  },
  /**
   * 展开行
   */
  renderExpandCell(params) {
    const {
      $table,
      isHidden,
      row,
      column
    } = params;
    const tableReactData = $table.reactData;
    const tableInternalData = $table.internalData;
    const {
      isRowGroupStatus
    } = tableReactData;
    const {
      rowExpandedMaps,
      rowExpandLazyLoadedMaps
    } = tableInternalData;
    const {
      computeExpandOpts
    } = $table.getComputeMaps();
    const expandOpts = computeExpandOpts.value;
    const {
      lazy,
      labelField,
      iconLoaded,
      showIcon,
      iconOpen,
      iconClose,
      visibleMethod
    } = expandOpts;
    const {
      slots
    } = column;
    const defaultSlot = slots ? slots.default : null;
    const iconSlot = slots ? slots.icon : null;
    let isActive = false;
    let isLazyLoading = false;
    if (isRowGroupStatus && row.isAggregate) {
      return renderCellBaseVNs(params, []);
    }
    if (iconSlot) {
      return renderCellBaseVNs(params, $table.callSlot(iconSlot, params));
    }
    if (!isHidden) {
      const rowid = (0, _util.getRowid)($table, row);
      isActive = !!rowExpandedMaps[rowid];
      if (lazy) {
        isLazyLoading = !!rowExpandLazyLoadedMaps[rowid];
      }
    }
    return renderCellBaseVNs(params, [showIcon && (!visibleMethod || visibleMethod(params)) ? (0, _vue.h)('span', {
      class: ['vxe-table--expanded', {
        'is--active': isActive
      }],
      onMousedown(evnt) {
        evnt.stopPropagation();
      },
      onClick(evnt) {
        $table.triggerRowExpandEvent(evnt, params);
      }
    }, [(0, _vue.h)('i', {
      class: ['vxe-table--expand-btn', isLazyLoading ? iconLoaded || getIcon().TABLE_EXPAND_LOADED : isActive ? iconOpen || getIcon().TABLE_EXPAND_OPEN : iconClose || getIcon().TABLE_EXPAND_CLOSE]
    })]) : renderEmptyElement($table), defaultSlot || labelField ? (0, _vue.h)('span', {
      class: 'vxe-table--expand-label'
    }, defaultSlot ? $table.callSlot(defaultSlot, params) : _xeUtils.default.get(row, labelField)) : renderEmptyElement($table)]);
  },
  renderExpandData(params) {
    const {
      $table,
      column
    } = params;
    const {
      slots,
      contentRender
    } = column;
    const contentSlot = slots ? slots.content : null;
    if (contentSlot) {
      return $table.callSlot(contentSlot, params);
    }
    if (contentRender) {
      const compConf = renderer.get(contentRender.name);
      if (compConf) {
        const rtExpand = compConf.renderTableExpand || compConf.renderExpand;
        if (rtExpand) {
          return (0, _vn.getSlotVNs)(rtExpand(contentRender, params));
        }
      }
    }
    return [];
  },
  /**
   * HTML 标签
   */
  renderHTMLCell(params) {
    const {
      $table,
      column
    } = params;
    const {
      slots
    } = column;
    const defaultSlot = slots ? slots.default : null;
    if (defaultSlot) {
      return renderCellBaseVNs(params, $table.callSlot(defaultSlot, params));
    }
    return renderCellBaseVNs(params, [(0, _vue.h)('span', {
      class: 'vxe-cell--html',
      innerHTML: getDefaultCellLabel(params)
    })]);
  },
  renderDeepHTMLCell(params) {
    return Cell.renderDeepNodeBtn(params, Cell.renderHTMLCell(params));
  },
  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader(params) {
    return renderHeaderCellBaseVNs(params, Cell.renderHeaderTitle(params).concat(Cell.renderSortIcon(params).concat(Cell.renderFilterIcon(params))));
  },
  /**
   * 排序
   */
  renderSortHeader(params) {
    return renderHeaderCellBaseVNs(params, Cell.renderHeaderTitle(params).concat(Cell.renderSortIcon(params)));
  },
  renderSortIcon(params) {
    const {
      $table,
      column
    } = params;
    const {
      computeSortOpts
    } = $table.getComputeMaps();
    const sortOpts = computeSortOpts.value;
    const {
      showIcon,
      allowBtn,
      ascTitle,
      descTitle,
      iconLayout,
      iconAsc,
      iconDesc,
      iconVisibleMethod
    } = sortOpts;
    const {
      order,
      slots
    } = column;
    if (showIcon && (!iconVisibleMethod || iconVisibleMethod(params))) {
      const sortSlot = slots ? slots.sort : null;
      return sortSlot ? (0, _vn.getSlotVNs)($table.callSlot(sortSlot, params)) : [(0, _vue.h)('span', {
        class: ['vxe-cell--sort', `vxe-cell--sort-${iconLayout}-layout`]
      }, [(0, _vue.h)('i', {
        class: ['vxe-sort--asc-btn', iconAsc || getIcon().TABLE_SORT_ASC, {
          'sort--active': order === 'asc'
        }],
        title: _xeUtils.default.eqNull(ascTitle) ? getI18n('vxe.table.sortAsc') : `${ascTitle || ''}`,
        onClick: allowBtn ? evnt => {
          evnt.stopPropagation();
          $table.triggerSortEvent(evnt, column, 'asc');
        } : undefined
      }), (0, _vue.h)('i', {
        class: ['vxe-sort--desc-btn', iconDesc || getIcon().TABLE_SORT_DESC, {
          'sort--active': order === 'desc'
        }],
        title: _xeUtils.default.eqNull(descTitle) ? getI18n('vxe.table.sortDesc') : `${descTitle || ''}`,
        onClick: allowBtn ? evnt => {
          evnt.stopPropagation();
          $table.triggerSortEvent(evnt, column, 'desc');
        } : undefined
      })])];
    }
    return [];
  },
  /**
   * 筛选
   */
  renderFilterHeader(params) {
    return renderHeaderCellBaseVNs(params, Cell.renderHeaderTitle(params).concat(Cell.renderFilterIcon(params)));
  },
  renderFilterIcon(params) {
    const {
      $table,
      column,
      hasFilter
    } = params;
    const tableReactData = $table.reactData;
    const {
      filterStore
    } = tableReactData;
    const {
      computeFilterOpts
    } = $table.getComputeMaps();
    const filterOpts = computeFilterOpts.value;
    const {
      showIcon,
      iconNone,
      iconMatch,
      iconVisibleMethod
    } = filterOpts;
    if (showIcon && (!iconVisibleMethod || iconVisibleMethod(params))) {
      return [(0, _vue.h)('span', {
        class: ['vxe-cell--filter', {
          'is--active': filterStore.visible && filterStore.column === column
        }],
        onClick(evnt) {
          if ($table.triggerFilterEvent) {
            $table.triggerFilterEvent(evnt, params.column, params);
          }
        }
      }, [(0, _vue.h)('i', {
        class: ['vxe-filter--btn', hasFilter ? iconMatch || getIcon().TABLE_FILTER_MATCH : iconNone || getIcon().TABLE_FILTER_NONE],
        title: getI18n('vxe.table.filter')
      })])];
    }
    return [];
  },
  /**
   * 可编辑
   */
  renderEditHeader(params) {
    const {
      $table,
      column
    } = params;
    const tableProps = $table.props;
    const {
      computeEditOpts
    } = $table.getComputeMaps();
    const {
      editConfig,
      editRules
    } = tableProps;
    const editOpts = computeEditOpts.value;
    const {
      sortable,
      filters,
      editRender
    } = column;
    const isEnableEdit = editConfig && (0, _utils.isEnableConf)(editConfig);
    const editRenderOpts = isEnableEdit && (0, _utils.isEnableConf)(editRender) ? editRender : null;
    let isRequired = false;
    if (editRules) {
      const columnRules = _xeUtils.default.get(editRules, column.field);
      if (columnRules) {
        isRequired = columnRules.some(rule => rule.required);
      }
    }
    let editIconVNs = [];
    if (isEnableEdit) {
      const {
        showAsterisk,
        showIcon,
        icon
      } = editOpts;
      editIconVNs = [isRequired && showAsterisk ? (0, _vue.h)('span', {
        class: 'vxe-cell--required-icon'
      }, [(0, _vue.h)('i')]) : renderEmptyElement($table), editRenderOpts && showIcon ? (0, _vue.h)('span', {
        class: 'vxe-cell--edit-icon'
      }, _xeUtils.default.isFunction(icon) ? (0, _vn.getSlotVNs)(icon({})) : [(0, _vue.h)('i', {
        class: icon || getIcon().TABLE_EDIT
      })]) : renderEmptyElement($table)];
    }
    return renderHeaderCellBaseVNs(params, editIconVNs.concat(Cell.renderHeaderTitle(params)).concat(sortable ? Cell.renderSortIcon(params) : []).concat(filters ? Cell.renderFilterIcon(params) : []));
  },
  // 行格编辑模式
  renderRowEdit(params) {
    const {
      $table,
      column
    } = params;
    const tableProps = $table.props;
    const {
      editConfig
    } = tableProps;
    const tableReactData = $table.reactData;
    const {
      editStore
    } = tableReactData;
    const {
      actived
    } = editStore;
    const {
      editRender
    } = column;
    const isEnableEdit = editConfig && (0, _utils.isEnableConf)(editConfig);
    const editRenderOpts = isEnableEdit && (0, _utils.isEnableConf)(editRender) ? editRender : null;
    return Cell.runRenderer(params, !!(editRenderOpts && actived && actived.row === params.row));
  },
  renderDeepRowEdit(params) {
    return Cell.renderDeepNodeBtn(params, Cell.renderRowEdit(params));
  },
  // 单元格编辑模式
  renderCellEdit(params) {
    const {
      $table,
      column
    } = params;
    const tableProps = $table.props;
    const {
      editConfig
    } = tableProps;
    const tableReactData = $table.reactData;
    const {
      editStore
    } = tableReactData;
    const {
      actived
    } = editStore;
    const {
      editRender
    } = column;
    const isEnableEdit = editConfig && (0, _utils.isEnableConf)(editConfig);
    const editRenderOpts = isEnableEdit && (0, _utils.isEnableConf)(editRender) ? editRender : null;
    return Cell.runRenderer(params, !!(editRenderOpts && actived && actived.row === params.row && actived.column === params.column));
  },
  renderDeepCellEdit(params) {
    return Cell.renderDeepNodeBtn(params, Cell.renderCellEdit(params));
  },
  runRenderer(params, isEdit) {
    const {
      $table,
      row,
      column
    } = params;
    const tableProps = $table.props;
    const {
      editConfig
    } = tableProps;
    const tableReactData = $table.reactData;
    const {
      isRowGroupStatus
    } = tableReactData;
    const {
      slots,
      field,
      editRender,
      formatter
    } = column;
    const isEnableEdit = editConfig && (0, _utils.isEnableConf)(editConfig);
    const editRenderOpts = isEnableEdit && (0, _utils.isEnableConf)(editRender) ? editRender : null;
    const defaultSlot = slots ? slots.default : null;
    const gcSlot = slots ? slots.groupContent || slots['group-content'] : null;
    const editSlot = slots ? slots.edit : null;
    const cellParams = Object.assign({
      $type: '',
      isEdit
    }, params);
    if (isEdit && editRenderOpts) {
      cellParams.$type = 'edit';
      if (editSlot) {
        return $table.callSlot(editSlot, cellParams);
      }
      const compConf = renderer.get(editRenderOpts.name);
      const rtEdit = compConf ? compConf.renderTableEdit || compConf.renderEdit : null;
      if (rtEdit) {
        return (0, _vn.getSlotVNs)(rtEdit(editRenderOpts, cellParams));
      }
      return [];
    }
    if (isRowGroupStatus && field && row.isAggregate) {
      const aggRow = row;
      const {
        computeAggregateOpts
      } = $table.getComputeMaps();
      const aggregateOpts = computeAggregateOpts.value;
      const {
        mapChildrenField
      } = aggregateOpts;
      const groupField = aggRow.groupField;
      const groupContent = aggRow.groupContent;
      const childList = mapChildrenField ? aggRow[mapChildrenField] || [] : [];
      const childCount = aggRow.childCount;
      if (gcSlot) {
        return renderCellBaseVNs(params, $table.callSlot(gcSlot, Object.assign({
          groupField,
          groupContent,
          childList,
          childCount
        }, params)));
      }
    } else {
      if (defaultSlot) {
        return renderCellBaseVNs(params, $table.callSlot(defaultSlot, cellParams));
      }
    }
    if (formatter) {
      return renderCellBaseVNs(params, [(0, _vue.h)('span', {
        class: 'vxe-cell--label'
      }, getDefaultCellLabel(cellParams))]);
    }
    return Cell.renderDefaultCell(cellParams);
  }
};
var _default = exports.default = Cell;