"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInternalData = createInternalData;
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../../ui/src/comp");
var _ui = require("../../../ui");
var _utils = require("../../../ui/src/utils");
var _dom = require("../../../ui/src/dom");
var _log = require("../../../ui/src/log");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  getI18n,
  getIcon,
  renderEmptyElement
} = _ui.VxeUI;
function createInternalData() {
  return {
    // teleportTo: undefined,
    // prevDragCol: undefined,
    // prevDragGroupField: undefined,
    // prevDragAggFnColid: undefined,
    // prevDragToChild: false,
    // prevDragPos: null,
    // customDragTime: null
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'TableCustomPanel',
  props: {
    customStore: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, context) {
    const xID = _xeUtils.default.uniqueId();
    const VxeUIModalComponent = _ui.VxeUI.getComponent('VxeModal');
    const VxeUIDrawerComponent = _ui.VxeUI.getComponent('VxeDrawer');
    const VxeUIButtonComponent = _ui.VxeUI.getComponent('VxeButton');
    const VxeUINumberInputComponent = _ui.VxeUI.getComponent('VxeNumberInput');
    const VxeUIRadioGroupComponent = _ui.VxeUI.getComponent('VxeRadioGroup');
    const $xeTable = (0, _vue.inject)('$xeTable', {});
    const {
      props: tableProps,
      reactData: tableReactData,
      internalData: tableInternalData
    } = $xeTable;
    const {
      computeSize,
      computeCustomOpts,
      computeColumnDragOpts,
      computeColumnOpts,
      computeIsMaxFixedColumn,
      computeResizableOpts
    } = $xeTable.getComputeMaps();
    const refElem = (0, _vue.ref)();
    const refBodyWrapperElem = (0, _vue.ref)();
    const refCustomBodyElem = (0, _vue.ref)();
    const refDragLineElem = (0, _vue.ref)();
    const refDragTipElem = (0, _vue.ref)();
    const customPanelReactData = (0, _vue.reactive)({
      dragCol: null,
      dragGroupField: null,
      dragAggFnCol: null,
      dragTipText: ''
    });
    let customPanelInternalData = createInternalData();
    const refMaps = {
      refElem,
      refBodyWrapperElem,
      refCustomBodyElem,
      refDragLineElem,
      refDragTipElem
    };
    const computeMaps = {};
    const handleWrapperMouseenterEvent = evnt => {
      const {
        customStore
      } = props;
      customStore.activeWrapper = true;
      $xeTable.customOpenEvent(evnt);
    };
    const handleWrapperMouseleaveEvent = evnt => {
      const {
        customStore
      } = props;
      customStore.activeWrapper = false;
      setTimeout(() => {
        if (!customStore.activeBtn && !customStore.activeWrapper) {
          $xeTable.customCloseEvent(evnt);
        }
      }, 300);
    };
    const confirmCustomEvent = ({
      $event
    }) => {
      tableReactData.isCustomStatus = true;
      $xeTable.saveCustom();
      $xeTable.closeCustom();
      $xeTable.emitCustomEvent('confirm', $event);
      $xeTable.emitCustomEvent('close', $event);
    };
    const cancelCloseEvent = ({
      $event
    }) => {
      $xeTable.closeCustom();
      $xeTable.emitCustomEvent('close', $event);
    };
    const cancelCustomEvent = ({
      $event
    }) => {
      $xeTable.cancelCustom();
      $xeTable.closeCustom();
      $xeTable.emitCustomEvent('cancel', $event);
      $xeTable.emitCustomEvent('close', $event);
    };
    const handleResetCustomEvent = evnt => {
      $xeTable.resetCustom(true);
      $xeTable.closeCustom();
      $xeTable.emitCustomEvent('reset', evnt);
      $xeTable.emitCustomEvent('close', evnt);
    };
    const resetCustomEvent = ({
      $event
    }) => {
      if (_ui.VxeUI.modal) {
        _ui.VxeUI.modal.confirm({
          content: getI18n('vxe.custom.cstmConfirmRestore'),
          className: 'vxe-table--ignore-clear',
          escClosable: true
        }).then(type => {
          if (type === 'confirm') {
            handleResetCustomEvent($event);
          }
        });
      } else {
        handleResetCustomEvent($event);
      }
    };
    const handleOptionCheck = column => {
      const {
        customColumnList
      } = tableReactData;
      const matchObj = _xeUtils.default.findTree(customColumnList, item => item === column);
      if (matchObj && matchObj.parent) {
        const {
          parent
        } = matchObj;
        if (parent.children && parent.children.length) {
          parent.renderVisible = parent.children.every(column => column.renderVisible);
          parent.halfVisible = !parent.renderVisible && parent.children.some(column => column.renderVisible || column.halfVisible);
          handleOptionCheck(parent);
        }
      }
    };
    const changeCheckboxOption = (column, evnt) => {
      const isChecked = !column.renderVisible;
      const customOpts = computeCustomOpts.value;
      if (customOpts.immediate) {
        _xeUtils.default.eachTree([column], item => {
          item.visible = isChecked;
          item.renderVisible = isChecked;
          item.halfVisible = false;
        });
        tableReactData.isCustomStatus = true;
        $xeTable.handleCustom();
        $xeTable.saveCustomStore('update:visible');
      } else {
        _xeUtils.default.eachTree([column], item => {
          item.renderVisible = isChecked;
          item.halfVisible = false;
        });
      }
      handleOptionCheck(column);
      $xeTable.checkCustomStatus();
      $xeTable.dispatchEvent('custom-visible-change', {
        column,
        checked: isChecked
      }, evnt);
    };
    const changeColumnWidth = column => {
      const customOpts = computeCustomOpts.value;
      if (customOpts.immediate) {
        if (column.renderResizeWidth !== column.renderWidth) {
          column.resizeWidth = column.renderResizeWidth;
          column.renderWidth = column.renderResizeWidth;
          tableReactData.isCustomStatus = true;
          $xeTable.handleCustom();
          $xeTable.saveCustomStore('update:width');
        }
      }
    };
    const changeFixedOption = (column, colFixed, evnt) => {
      const isMaxFixedColumn = computeIsMaxFixedColumn.value;
      const customOpts = computeCustomOpts.value;
      let targetFixed = null;
      if (customOpts.immediate) {
        if (column.renderFixed === colFixed) {
          targetFixed = '';
          _xeUtils.default.eachTree([column], col => {
            col.fixed = '';
            col.renderFixed = '';
          });
        } else {
          if (!isMaxFixedColumn || column.renderFixed) {
            targetFixed = colFixed;
            _xeUtils.default.eachTree([column], col => {
              col.fixed = colFixed;
              col.renderFixed = colFixed;
            });
          }
        }
        tableReactData.isCustomStatus = true;
        $xeTable.handleCustom();
        $xeTable.saveCustomStore('update:fixed');
      } else {
        if (column.renderFixed === colFixed) {
          targetFixed = '';
          _xeUtils.default.eachTree([column], col => {
            col.renderFixed = '';
          });
        } else {
          if (!isMaxFixedColumn || column.renderFixed) {
            targetFixed = colFixed;
            _xeUtils.default.eachTree([column], col => {
              col.renderFixed = colFixed;
            });
          }
        }
      }
      if (targetFixed !== null) {
        $xeTable.dispatchEvent('custom-fixed-change', {
          column,
          fixed: targetFixed
        }, evnt);
      }
    };
    const allOptionEvent = evnt => {
      const {
        customStore
      } = tableReactData;
      const isAll = !customStore.isAll;
      $xeTable.toggleCustomAllCheckbox();
      $xeTable.dispatchEvent('custom-visible-all', {
        checked: isAll
      }, evnt);
    };
    const showDropTip = (evnt, optEl, showLine, dragPos) => {
      const bodyWrapperElem = refBodyWrapperElem.value;
      if (!bodyWrapperElem) {
        return;
      }
      const customBodyElem = refCustomBodyElem.value;
      if (!customBodyElem) {
        return;
      }
      const {
        prevDragToChild
      } = customPanelInternalData;
      const bodyWrapperRect = bodyWrapperElem.getBoundingClientRect();
      const customBodyRect = customBodyElem.getBoundingClientRect();
      const dragLineEl = refDragLineElem.value;
      if (optEl) {
        if (dragLineEl) {
          if (showLine) {
            const optRect = optEl.getBoundingClientRect();
            dragLineEl.style.display = 'block';
            dragLineEl.style.left = `${Math.max(0, customBodyRect.x - bodyWrapperRect.x)}px`;
            dragLineEl.style.top = `${Math.max(1, optRect.y + bodyWrapperElem.scrollTop - bodyWrapperRect.y)}px`;
            dragLineEl.style.height = `${optRect.height}px`;
            dragLineEl.style.width = `${optRect.width}px`;
            dragLineEl.setAttribute('drag-pos', dragPos);
            dragLineEl.setAttribute('drag-to-child', prevDragToChild ? 'y' : 'n');
          } else {
            dragLineEl.style.display = '';
          }
        }
      } else {
        if (dragLineEl) {
          dragLineEl.style.display = 'node';
        }
      }
      const dragTipEl = refDragTipElem.value;
      if (dragTipEl) {
        dragTipEl.style.display = 'block';
        dragTipEl.style.top = `${Math.min(bodyWrapperElem.clientHeight + bodyWrapperElem.scrollTop - dragTipEl.clientHeight, evnt.clientY + bodyWrapperElem.scrollTop - bodyWrapperRect.y)}px`;
        dragTipEl.style.left = `${Math.min(bodyWrapperElem.clientWidth + bodyWrapperElem.scrollLeft - dragTipEl.clientWidth, evnt.clientX + bodyWrapperElem.scrollLeft - bodyWrapperRect.x)}px`;
        dragTipEl.setAttribute('drag-status', showLine ? prevDragToChild ? 'sub' : 'normal' : 'disabled');
      }
    };
    const updateColDropTipContent = () => {
      const {
        dragCol
      } = customPanelReactData;
      const columnDragOpts = computeColumnDragOpts.value;
      const {
        tooltipMethod
      } = columnDragOpts;
      let tipContent = '';
      if (tooltipMethod) {
        const dtParams = {
          $table: $xeTable,
          column: dragCol
        };
        tipContent = `${tooltipMethod(dtParams) || ''}`;
      } else {
        tipContent = getI18n('vxe.custom.cstmDragTarget', [dragCol && dragCol.type !== 'html' ? dragCol.getTitle() : '']);
      }
      customPanelReactData.dragTipText = tipContent;
    };
    const hideDropTip = () => {
      const dragTipEl = refDragTipElem.value;
      const dragLineEl = refDragLineElem.value;
      if (dragTipEl) {
        dragTipEl.style.display = '';
      }
      if (dragLineEl) {
        dragLineEl.style.display = '';
      }
    };
    const sortMousedownEvent = evnt => {
      const btnEl = evnt.currentTarget;
      const cellEl = btnEl.parentElement;
      const tdEl = cellEl.parentElement;
      const trEl = tdEl.parentElement;
      const colid = trEl.getAttribute('colid');
      const column = $xeTable.getColumnById(colid);
      trEl.draggable = true;
      customPanelReactData.dragCol = column;
      customPanelReactData.dragGroupField = null;
      customPanelReactData.dragAggFnCol = null;
      updateColDropTipContent();
      (0, _dom.addClass)(trEl, 'active--drag-origin');
    };
    const sortMouseupEvent = evnt => {
      const btnEl = evnt.currentTarget;
      const cellEl = btnEl.parentElement;
      const tdEl = cellEl.parentElement;
      const trEl = tdEl.parentElement;
      hideDropTip();
      trEl.draggable = false;
      customPanelReactData.dragCol = null;
      customPanelReactData.dragGroupField = null;
      customPanelReactData.dragAggFnCol = null;
      (0, _dom.removeClass)(trEl, 'active--drag-origin');
    };
    const sortDragstartEvent = evnt => {
      const {
        customDragTime
      } = customPanelInternalData;
      if (evnt.dataTransfer) {
        evnt.dataTransfer.setDragImage((0, _dom.getTpImg)(), 0, 0);
      }
      if (customDragTime) {
        clearTimeout(customDragTime);
      }
      tableReactData.isCustomDragStatus = true;
      customPanelInternalData.prevDragGroupField = null;
      customPanelInternalData.prevDragAggFnColid = null;
    };
    const sortDragendEvent = evnt => {
      const {
        mouseConfig
      } = tableProps;
      const {
        customColumnList
      } = tableReactData;
      const {
        collectColumn
      } = tableInternalData;
      const customOpts = computeCustomOpts.value;
      const {
        immediate
      } = customOpts;
      const trEl = evnt.currentTarget;
      const columnDragOpts = computeColumnDragOpts.value;
      const {
        isCrossDrag,
        isSelfToChildDrag,
        isToChildDrag,
        dragEndMethod
      } = columnDragOpts;
      const {
        dragCol
      } = customPanelReactData;
      const {
        prevDragCol,
        prevDragGroupField,
        prevDragAggFnColid,
        prevDragPos,
        prevDragToChild
      } = customPanelInternalData;
      const dragOffsetIndex = prevDragPos === 'bottom' ? 1 : 0;
      if (prevDragGroupField || prevDragAggFnColid) {
        if ($xeTable.handlePivotTableAggregatePanelDragendEvent) {
          $xeTable.handlePivotTableAggregatePanelDragendEvent(evnt);
        }
      } else if (prevDragCol && dragCol) {
        // 判断是否有拖动
        if (prevDragCol !== dragCol) {
          const dragColumn = dragCol;
          const newColumn = prevDragCol;
          Promise.resolve(dragEndMethod ? dragEndMethod({
            oldColumn: dragColumn,
            newColumn,
            dragColumn,
            dragPos: prevDragPos,
            dragToChild: !!prevDragToChild,
            offsetIndex: dragOffsetIndex
          }) : true).then(status => {
            if (!status) {
              return;
            }
            let oafIndex = -1;
            let nafIndex = -1;
            const oldAllMaps = {};
            _xeUtils.default.eachTree([dragColumn], column => {
              oldAllMaps[column.id] = column;
            });
            let isSelfToChildStatus = false;
            // 只有实时拖拽支持跨层级
            if (immediate) {
              if (dragColumn.parentId && newColumn.parentId) {
                // 子到子
                if (!isCrossDrag) {
                  return;
                }
                if (oldAllMaps[newColumn.id]) {
                  isSelfToChildStatus = true;
                  if (!(isCrossDrag && isSelfToChildDrag)) {
                    if (_ui.VxeUI.modal) {
                      _ui.VxeUI.modal.message({
                        status: 'error',
                        content: getI18n('vxe.error.treeDragChild')
                      });
                    }
                    return;
                  }
                }
              } else if (dragColumn.parentId) {
                // 子到根
                if (!isCrossDrag) {
                  return;
                }
              } else if (newColumn.parentId) {
                // 根到子
                if (!isCrossDrag) {
                  return;
                }
                if (oldAllMaps[newColumn.id]) {
                  isSelfToChildStatus = true;
                  if (!(isCrossDrag && isSelfToChildDrag)) {
                    if (_ui.VxeUI.modal) {
                      _ui.VxeUI.modal.message({
                        status: 'error',
                        content: getI18n('vxe.error.treeDragChild')
                      });
                    }
                    return;
                  }
                }
              } else {
                // 根到根
              }
              const oldewMatchRest = _xeUtils.default.findTree(collectColumn, item => item.id === dragColumn.id);
              // 改变层级
              if (isSelfToChildStatus && isCrossDrag && isSelfToChildDrag) {
                if (oldewMatchRest) {
                  const {
                    items: oCols,
                    index: oIndex
                  } = oldewMatchRest;
                  const childList = dragColumn.children || [];
                  childList.forEach(column => {
                    column.parentId = dragColumn.parentId;
                  });
                  oCols.splice(oIndex, 1, ...childList);
                  dragColumn.children = [];
                }
              } else {
                if (oldewMatchRest) {
                  const {
                    items: oCols,
                    index: oIndex,
                    parent: oParent
                  } = oldewMatchRest;
                  oCols.splice(oIndex, 1);
                  if (!oParent) {
                    oafIndex = oIndex;
                  }
                }
              }
              const newMatchRest = _xeUtils.default.findTree(collectColumn, item => item.id === newColumn.id);
              if (newMatchRest) {
                const {
                  items: nCols,
                  index: nIndex,
                  parent: nParent
                } = newMatchRest;
                // 转子级
                if (isCrossDrag && isToChildDrag && prevDragToChild) {
                  dragColumn.parentId = newColumn.id;
                  newColumn.children = (newColumn.children || []).concat([dragColumn]);
                } else {
                  dragColumn.parentId = newColumn.parentId;
                  nCols.splice(nIndex + dragOffsetIndex, 0, dragColumn);
                }
                if (!nParent) {
                  nafIndex = nIndex;
                }
              }
              _xeUtils.default.eachTree(collectColumn, (column, index, items, path, parent) => {
                if (!parent) {
                  const sortIndex = index + 1;
                  column.renderSortNumber = sortIndex;
                }
              });
            } else {
              oafIndex = _xeUtils.default.findIndexOf(customColumnList, item => item.id === dragColumn.id);
              customColumnList.splice(oafIndex, 1);
              nafIndex = _xeUtils.default.findIndexOf(customColumnList, item => item.id === newColumn.id);
              customColumnList.splice(nafIndex + dragOffsetIndex, 0, dragColumn);
            }
            if (mouseConfig) {
              if ($xeTable.clearSelected) {
                $xeTable.clearSelected();
              }
              if ($xeTable.clearCellAreas) {
                $xeTable.clearCellAreas();
                $xeTable.clearCopyCellArea();
              }
            }
            const csParams = {
              oldColumn: dragColumn,
              newColumn,
              dragColumn,
              dragPos: prevDragPos,
              offsetIndex: dragOffsetIndex,
              _index: {
                newIndex: nafIndex,
                oldIndex: oafIndex
              }
            };
            $xeTable.dispatchEvent('custom-sort-change', csParams, evnt);
            $xeTable.dispatchEvent('column-dragend', csParams, evnt);
            if (immediate) {
              tableReactData.customColumnList = collectColumn.slice(0);
              $xeTable.handleColDragSwapColumn();
            }
            customPanelInternalData.customDragTime = setTimeout(() => {
              tableReactData.isCustomDragStatus = false;
              customPanelInternalData.customDragTime = undefined;
            }, 350);
          }).catch(() => {});
        }
      }
      hideDropTip();
      customPanelReactData.dragCol = null;
      customPanelReactData.dragGroupField = null;
      customPanelReactData.dragAggFnCol = null;
      customPanelInternalData.prevDragGroupField = null;
      customPanelInternalData.prevDragAggFnColid = null;
      trEl.draggable = false;
      trEl.removeAttribute('drag-pos');
      (0, _dom.removeClass)(trEl, 'active--drag-target');
      (0, _dom.removeClass)(trEl, 'active--drag-origin');
    };
    const sortDragoverEvent = evnt => {
      const customOpts = computeCustomOpts.value;
      const {
        immediate
      } = customOpts;
      const columnDragOpts = computeColumnDragOpts.value;
      const {
        isCrossDrag,
        isToChildDrag
      } = columnDragOpts;
      const optEl = evnt.currentTarget;
      const isControlKey = (0, _dom.hasControlKey)(evnt);
      const colid = optEl.getAttribute('colid');
      const column = $xeTable.getColumnById(colid);
      const {
        dragCol
      } = customPanelReactData;
      customPanelInternalData.prevDragGroupField = null;
      customPanelInternalData.prevDragAggFnColid = null;
      // 是否移入有效列
      if (column && (isCrossDrag || column.level === 1)) {
        evnt.preventDefault();
        const offsetY = evnt.clientY - optEl.getBoundingClientRect().y;
        const dragPos = offsetY < optEl.clientHeight / 2 ? 'top' : 'bottom';
        if (!dragCol || dragCol && dragCol.id === column.id || !isCrossDrag && column.level > 1 || !immediate && column.level > 1) {
          showDropTip(evnt, optEl, false, dragPos);
          return;
        }
        customPanelInternalData.prevDragToChild = !!(isCrossDrag && isToChildDrag && isControlKey && immediate);
        customPanelInternalData.prevDragCol = column;
        customPanelInternalData.prevDragPos = dragPos;
        showDropTip(evnt, optEl, true, dragPos);
      }
    };
    const renderDragTip = () => {
      const {
        dragTipText
      } = customPanelReactData;
      const columnDragOpts = computeColumnDragOpts.value;
      return (0, _vue.h)('div', {}, [(0, _vue.h)('div', {
        ref: refDragLineElem,
        class: ['vxe-table-custom-popup--drag-line', {
          'is--guides': columnDragOpts.showGuidesStatus
        }]
      }), (0, _vue.h)('div', {
        ref: refDragTipElem,
        class: 'vxe-table-custom-popup--drag-tip'
      }, [(0, _vue.h)('div', {
        class: 'vxe-table-custom-popup--drag-tip-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-table-custom-popup--drag-tip-status'
      }, [(0, _vue.h)('span', {
        class: ['vxe-table-custom-popup--drag-tip-normal-status', getIcon().TABLE_DRAG_STATUS_ROW]
      }), (0, _vue.h)('span', {
        class: ['vxe-table-custom-popup--drag-tip-sub-status', getIcon().TABLE_DRAG_STATUS_SUB_ROW]
      }), (0, _vue.h)('span', {
        class: ['vxe-table-custom-popup--drag-tip-group-status', getIcon().TABLE_DRAG_STATUS_AGG_GROUP]
      }), (0, _vue.h)('span', {
        class: ['vxe-table-custom-popup--drag-tip-values-status', getIcon().TABLE_DRAG_STATUS_AGG_VALUES]
      }), (0, _vue.h)('span', {
        class: ['vxe-table-custom-popup--drag-tip-disabled-status', getIcon().TABLE_DRAG_DISABLED]
      })]), (0, _vue.h)('div', {
        class: 'vxe-table-custom-popup--drag-tip-content'
      }, `${dragTipText || ''}`)])])]);
    };
    const renderSimplePanel = () => {
      const $xeGrid = $xeTable.xeGrid;
      const $xeGantt = $xeTable.xeGantt;
      const tableProps = $xeTable.props;
      const {
        customStore
      } = props;
      const {
        treeConfig,
        rowGroupConfig,
        aggregateConfig
      } = tableProps;
      const {
        isCustomStatus,
        customColumnList,
        isCustomDragStatus
      } = tableReactData;
      const customOpts = computeCustomOpts.value;
      const {
        immediate
      } = customOpts;
      const columnDragOpts = computeColumnDragOpts.value;
      const {
        popupStyle
      } = customStore;
      const {
        checkMethod,
        visibleMethod,
        allowVisible,
        allowSort,
        allowFixed,
        trigger,
        placement
      } = customOpts;
      const isMaxFixedColumn = computeIsMaxFixedColumn.value;
      const vSize = computeSize.value;
      const {
        isCrossDrag
      } = columnDragOpts;
      const slots = customOpts.slots || {};
      const headerSlot = slots.header;
      const topSlot = slots.top;
      const bottomSlot = slots.bottom;
      const defaultSlot = slots.default;
      const footerSlot = slots.footer;
      const colVNs = [];
      const customWrapperOns = {};
      const isAllChecked = customStore.isAll;
      const isAllIndeterminate = customStore.isIndeterminate;
      // hover 触发
      if (trigger === 'hover') {
        customWrapperOns.onMouseenter = handleWrapperMouseenterEvent;
        customWrapperOns.onMouseleave = handleWrapperMouseleaveEvent;
      }
      const params = {
        $table: $xeTable,
        $grid: $xeGrid,
        $gantt: $xeGantt,
        columns: customColumnList,
        isAllChecked,
        isAllIndeterminate,
        isCustomStatus
      };
      _xeUtils.default.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({
          $table: $xeTable,
          column
        }) : true;
        if (isVisible) {
          const isChecked = column.renderVisible;
          const isIndeterminate = column.halfVisible;
          const isColGroup = column.children && column.children.length;
          const colTitle = (0, _utils.formatText)(column.getTitle(), 1);
          const isDisabled = checkMethod ? !checkMethod({
            $table: $xeTable,
            column
          }) : false;
          const isHidden = !isChecked;
          colVNs.push((0, _vue.h)('li', {
            key: column.id,
            colid: column.id,
            class: ['vxe-table-custom--option', `level--${column.level}`, {
              'is--hidden': isDisabled || isHidden,
              'is--group': isColGroup
            }],
            onDragstart: sortDragstartEvent,
            onDragend: sortDragendEvent,
            onDragover: sortDragoverEvent
          }, [allowVisible ? (0, _vue.h)('div', {
            class: ['vxe-table-custom--checkbox-option', {
              'is--checked': isChecked,
              'is--indeterminate': isIndeterminate,
              'is--disabled': isDisabled
            }],
            title: getI18n('vxe.custom.setting.colVisible'),
            onClick: evnt => {
              if (!isDisabled) {
                changeCheckboxOption(column, evnt);
              }
            }
          }, [(0, _vue.h)('span', {
            class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
          })]) : renderEmptyElement($xeTable), (0, _vue.h)('div', {
            class: 'vxe-table-custom--name-option'
          }, [allowSort && ((isCrossDrag ? immediate : false) || column.level === 1) ? (0, _vue.h)('div', {
            class: 'vxe-table-custom--sort-option'
          }, [(0, _vue.h)('span', Object.assign({
            class: ['vxe-table-custom--sort-btn', {
              'is--disabled': isHidden
            }],
            title: getI18n('vxe.custom.setting.sortHelpTip')
          }, isHidden ? {} : {
            onMousedown: sortMousedownEvent,
            onMouseup: sortMouseupEvent
          }), [(0, _vue.h)('i', {
            class: getIcon().TABLE_CUSTOM_SORT
          })])]) : renderEmptyElement($xeTable), column.type === 'html' ? (0, _vue.h)('div', {
            key: '1',
            class: 'vxe-table-custom--checkbox-label',
            innerHTML: colTitle
          }) : (0, _vue.h)('div', {
            key: '0',
            class: 'vxe-table-custom--checkbox-label'
          }, colTitle)]), !parent && allowFixed ? (0, _vue.h)('div', {
            class: 'vxe-table-custom--fixed-option'
          }, [VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
            mode: 'text',
            icon: column.renderFixed === 'left' ? getIcon().TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_LEFT,
            status: column.renderFixed === 'left' ? 'primary' : '',
            disabled: isHidden || isMaxFixedColumn && !column.renderFixed,
            title: getI18n(column.renderFixed === 'left' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedLeft'),
            onClick: ({
              $event
            }) => {
              changeFixedOption(column, 'left', $event);
            }
          }) : renderEmptyElement($xeTable), VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
            mode: 'text',
            icon: column.renderFixed === 'right' ? getIcon().TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE : getIcon().TOOLBAR_TOOLS_FIXED_RIGHT,
            status: column.renderFixed === 'right' ? 'primary' : '',
            disabled: isHidden || isMaxFixedColumn && !column.renderFixed,
            title: getI18n(column.renderFixed === 'right' ? 'vxe.toolbar.cancelFixed' : 'vxe.toolbar.fixedRight'),
            onClick: ({
              $event
            }) => {
              changeFixedOption(column, 'right', $event);
            }
          }) : renderEmptyElement($xeTable)]) : renderEmptyElement($xeTable)]));
        }
      });
      return (0, _vue.h)('div', {
        ref: refElem,
        key: 'simple',
        class: ['vxe-table-custom-wrapper', `placement--${placement}`, {
          [`size--${vSize}`]: vSize,
          'is--active': customStore.visible
        }],
        style: popupStyle
      }, customStore.visible ? [(0, _vue.h)('div', {
        ref: refBodyWrapperElem,
        class: 'vxe-table-custom-simple--body-wrapper'
      }, [!treeConfig && (aggregateConfig || rowGroupConfig) && $xeTable.getPivotTableAggregateSimplePanel ? (0, _vue.h)($xeTable.getPivotTableAggregateSimplePanel(), {
        customStore
      }) : renderEmptyElement($xeTable), (0, _vue.h)('div', {
        ref: refCustomBodyElem,
        class: 'vxe-table-custom--handle-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-table-custom--header'
      }, headerSlot ? $xeTable.callSlot(headerSlot, params) : [(0, _vue.h)('ul', {
        class: 'vxe-table-custom--panel-list'
      }, [(0, _vue.h)('li', {
        class: 'vxe-table-custom--option'
      }, [allowVisible ? (0, _vue.h)('div', {
        class: ['vxe-table-custom--checkbox-option', {
          'is--checked': isAllChecked,
          'is--indeterminate': isAllIndeterminate
        }],
        title: getI18n('vxe.table.allTitle'),
        onClick: allOptionEvent
      }, [(0, _vue.h)('span', {
        class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
      }), (0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, getI18n('vxe.toolbar.customAll'))]) : (0, _vue.h)('span', {
        class: 'vxe-checkbox--label'
      }, getI18n('vxe.table.customTitle'))])])]), (0, _vue.h)('div', {
        class: 'vxe-table-custom--body'
      }, [topSlot ? (0, _vue.h)('div', {
        class: 'vxe-table-custom--panel-top'
      }, $xeTable.callSlot(topSlot, params)) : renderEmptyElement($xeTable), defaultSlot ? (0, _vue.h)('div', {
        class: 'vxe-table-custom--panel-body'
      }, $xeTable.callSlot(defaultSlot, params)) : (0, _vue.h)(_vue.TransitionGroup, Object.assign({
        class: 'vxe-table-custom--panel-list',
        name: isCustomDragStatus ? 'vxe-table-custom--list' : '',
        tag: 'ul'
      }, customWrapperOns), {
        default: () => colVNs
      }), bottomSlot ? (0, _vue.h)('div', {
        class: 'vxe-table-custom--panel-bottom'
      }, $xeTable.callSlot(bottomSlot, params)) : renderEmptyElement($xeTable)]), customOpts.showFooter ? (0, _vue.h)('div', {
        class: 'vxe-table-custom--footer'
      }, footerSlot ? $xeTable.callSlot(footerSlot, params) : [(0, _vue.h)('div', {
        class: 'vxe-table-custom--footer-buttons'
      }, [VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
        mode: 'text',
        content: customOpts.resetButtonText || getI18n('vxe.table.customRestore'),
        disabled: !isCustomStatus,
        onClick: resetCustomEvent
      }) : renderEmptyElement($xeTable), immediate ? VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
        mode: 'text',
        content: customOpts.closeButtonText || getI18n('vxe.table.customClose'),
        onClick: cancelCloseEvent
      }) : renderEmptyElement($xeTable) : VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
        mode: 'text',
        content: customOpts.cancelButtonText || getI18n('vxe.table.customCancel'),
        onClick: cancelCustomEvent
      }) : renderEmptyElement($xeTable), immediate ? renderEmptyElement($xeTable) : VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
        mode: 'text',
        status: 'primary',
        content: customOpts.confirmButtonText || getI18n('vxe.table.customConfirm'),
        onClick: confirmCustomEvent
      }) : renderEmptyElement($xeTable)])]) : null]), renderDragTip()])] : []);
    };
    const renderPopupPanel = () => {
      const $xeGrid = $xeTable.xeGrid;
      const $xeGantt = $xeTable.xeGantt;
      const {
        customStore
      } = props;
      const {
        treeConfig,
        rowGroupConfig,
        aggregateConfig,
        resizable: allResizable
      } = tableProps;
      const {
        isCustomStatus,
        customColumnList
      } = tableReactData;
      const customOpts = computeCustomOpts.value;
      const {
        immediate
      } = customOpts;
      const columnDragOpts = computeColumnDragOpts.value;
      const {
        mode,
        modalOptions,
        drawerOptions,
        allowVisible,
        allowSort,
        allowFixed,
        allowResizable,
        checkMethod,
        visibleMethod
      } = customOpts;
      const columnOpts = computeColumnOpts.value;
      const {
        maxFixedSize
      } = columnOpts;
      const resizableOpts = computeResizableOpts.value;
      const {
        minWidth: reMinWidth,
        maxWidth: reMaxWidth
      } = resizableOpts;
      const modalOpts = Object.assign({}, modalOptions);
      const drawerOpts = Object.assign({}, drawerOptions);
      const isMaxFixedColumn = computeIsMaxFixedColumn.value;
      const {
        isCrossDrag
      } = columnDragOpts;
      const slots = customOpts.slots || {};
      const headerSlot = slots.header;
      const topSlot = slots.top;
      const bottomSlot = slots.bottom;
      const defaultSlot = slots.default;
      const footerSlot = slots.footer;
      const trVNs = [];
      const isAllChecked = customStore.isAll;
      const isAllIndeterminate = customStore.isIndeterminate;
      const params = {
        $table: $xeTable,
        $grid: $xeGrid,
        $gantt: $xeGantt,
        columns: customColumnList,
        isAllChecked,
        isAllIndeterminate,
        isCustomStatus
      };
      _xeUtils.default.eachTree(customColumnList, (column, index, items, path, parent) => {
        const isVisible = visibleMethod ? visibleMethod({
          $table: $xeTable,
          column
        }) : true;
        if (isVisible) {
          // 默认继承调整宽度
          let customMinWidth = 0;
          let customMaxWidth = 0;
          if (allowResizable) {
            const resizeParams = {
              $table: $xeTable,
              column,
              columnIndex: index,
              $columnIndex: index,
              $rowIndex: -1
            };
            if (reMinWidth) {
              customMinWidth = _xeUtils.default.toNumber(_xeUtils.default.isFunction(reMinWidth) ? reMinWidth(resizeParams) : reMinWidth);
            }
            if (reMaxWidth) {
              customMaxWidth = _xeUtils.default.toNumber(_xeUtils.default.isFunction(reMaxWidth) ? reMaxWidth(resizeParams) : reMaxWidth);
            }
          }
          const isChecked = column.renderVisible;
          const isIndeterminate = column.halfVisible;
          const colTitle = (0, _utils.formatText)(column.getTitle(), 1);
          const isColGroup = column.children && column.children.length;
          const isDisabled = checkMethod ? !checkMethod({
            $table: $xeTable,
            column
          }) : false;
          const isHidden = !isChecked;
          trVNs.push((0, _vue.h)('tr', {
            key: column.id,
            colid: column.id,
            class: [`vxe-table-custom-popup--row level--${column.level}`, {
              'is--group': isColGroup
            }],
            onDragstart: sortDragstartEvent,
            onDragend: sortDragendEvent,
            onDragover: sortDragoverEvent
          }, [allowVisible ? (0, _vue.h)('td', {
            class: 'vxe-table-custom-popup--column-item col--visible'
          }, [(0, _vue.h)('div', {
            class: ['vxe-table-custom--checkbox-option', {
              'is--checked': isChecked,
              'is--indeterminate': isIndeterminate,
              'is--disabled': isDisabled
            }],
            title: getI18n('vxe.custom.setting.colVisible'),
            onClick: evnt => {
              if (!isDisabled) {
                changeCheckboxOption(column, evnt);
              }
            }
          }, [(0, _vue.h)('span', {
            class: ['vxe-checkbox--icon', isIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
          })])]) : renderEmptyElement($xeTable), (0, _vue.h)('td', {
            class: 'vxe-table-custom-popup--column-item col--name'
          }, [(0, _vue.h)('div', {
            class: 'vxe-table-custom-popup--name'
          }, [allowSort ? (isCrossDrag ? immediate : false) || column.level === 1 ? (0, _vue.h)('div', Object.assign({
            class: ['vxe-table-custom-popup--column-sort-btn', {
              'is--disabled': isHidden
            }],
            title: getI18n('vxe.custom.setting.sortHelpTip')
          }, isHidden ? {} : {
            onMousedown: sortMousedownEvent,
            onMouseup: sortMouseupEvent
          }), [(0, _vue.h)('i', {
            class: getIcon().TABLE_CUSTOM_SORT
          })]) : (0, _vue.h)('div', {
            class: 'vxe-table-custom-popup--column-sort-placeholder'
          }) : renderEmptyElement($xeTable), column.type === 'html' ? (0, _vue.h)('div', {
            key: '1',
            class: 'vxe-table-custom-popup--title',
            innerHTML: colTitle
          }) : (0, _vue.h)('div', {
            key: '0',
            class: 'vxe-table-custom-popup--title',
            title: colTitle
          }, colTitle)])]), allowResizable ? (0, _vue.h)('td', {
            class: 'vxe-table-custom-popup--column-item col--resizable'
          }, [column.children && column.children.length || !(_xeUtils.default.isBoolean(column.resizable) ? column.resizable : columnOpts.resizable || allResizable) ? (0, _vue.h)('span', '-') : VxeUINumberInputComponent ? (0, _vue.h)(VxeUINumberInputComponent, {
            type: 'integer',
            immediate: false,
            disabled: isHidden,
            modelValue: column.renderResizeWidth,
            min: customMinWidth || undefined,
            max: customMaxWidth || undefined,
            'onUpdate:modelValue'(value) {
              const width = Math.max(0, Number(value));
              column.renderResizeWidth = width;
            },
            onChange() {
              changeColumnWidth(column);
            }
          }) : renderEmptyElement($xeTable)]) : renderEmptyElement($xeTable), allowFixed ? (0, _vue.h)('td', {
            class: 'vxe-table-custom-popup--column-item col--fixed'
          }, [parent ? (0, _vue.h)('span', '-') : VxeUIRadioGroupComponent ? (0, _vue.h)(VxeUIRadioGroupComponent, {
            modelValue: column.renderFixed || '',
            type: 'button',
            size: 'mini',
            disabled: isHidden,
            options: [{
              label: getI18n('vxe.custom.setting.fixedLeft'),
              value: 'left',
              disabled: isHidden || isMaxFixedColumn
            }, {
              label: getI18n('vxe.custom.setting.fixedUnset'),
              value: '',
              disabled: isHidden
            }, {
              label: getI18n('vxe.custom.setting.fixedRight'),
              value: 'right',
              disabled: isHidden || isMaxFixedColumn
            }],
            onChange({
              label,
              $event
            }) {
              changeFixedOption(column, label, $event);
            }
          }) : renderEmptyElement($xeTable)]) : renderEmptyElement($xeTable)]));
        }
      });
      const scopedSlots = {
        default: () => {
          return (0, _vue.h)('div', {
            ref: refBodyWrapperElem,
            class: 'vxe-table-custom-popup--body-wrapper'
          }, defaultSlot ? $xeTable.callSlot(defaultSlot, params) : [!treeConfig && (aggregateConfig || rowGroupConfig) && $xeTable.getPivotTableAggregatePopupPanel ? (0, _vue.h)($xeTable.getPivotTableAggregatePopupPanel(), {
            customStore
          }) : renderEmptyElement($xeTable), (0, _vue.h)('div', {
            ref: refCustomBodyElem,
            class: 'vxe-table-custom-popup--handle-wrapper'
          }, [topSlot ? (0, _vue.h)('div', {
            class: 'vxe-table-custom-popup--table-top'
          }, $xeTable.callSlot(topSlot, params)) : renderEmptyElement($xeTable), (0, _vue.h)('div', {
            class: 'vxe-table-custom-popup--table-wrapper'
          }, [(0, _vue.h)('table', {}, [(0, _vue.h)('colgroup', {}, [allowVisible ? (0, _vue.h)('col', {
            class: 'vxe-table-custom-popup--table-col-seq'
          }) : renderEmptyElement($xeTable), (0, _vue.h)('col', {
            class: 'vxe-table-custom-popup--table-col-title'
          }), allowResizable ? (0, _vue.h)('col', {
            class: 'vxe-table-custom-popup--table-col-width'
          }) : renderEmptyElement($xeTable), allowFixed ? (0, _vue.h)('col', {
            class: 'vxe-table-custom-popup--table-col-fixed'
          }) : renderEmptyElement($xeTable)]), (0, _vue.h)('thead', {}, [(0, _vue.h)('tr', {}, [allowVisible ? (0, _vue.h)('th', {}, [(0, _vue.h)('div', {
            class: ['vxe-table-custom--checkbox-option', {
              'is--checked': isAllChecked,
              'is--indeterminate': isAllIndeterminate
            }],
            title: getI18n('vxe.table.allTitle'),
            onClick: allOptionEvent
          }, [(0, _vue.h)('span', {
            class: ['vxe-checkbox--icon', isAllIndeterminate ? getIcon().TABLE_CHECKBOX_INDETERMINATE : isAllChecked ? getIcon().TABLE_CHECKBOX_CHECKED : getIcon().TABLE_CHECKBOX_UNCHECKED]
          }), (0, _vue.h)('span', {
            class: 'vxe-checkbox--label'
          }, getI18n('vxe.toolbar.customAll'))])]) : renderEmptyElement($xeTable), (0, _vue.h)('th', {}, getI18n('vxe.custom.setting.colTitle')), allowResizable ? (0, _vue.h)('th', {}, getI18n('vxe.custom.setting.colResizable')) : renderEmptyElement($xeTable), allowFixed ? (0, _vue.h)('th', {}, getI18n(`vxe.custom.setting.${maxFixedSize ? 'colFixedMax' : 'colFixed'}`, [maxFixedSize])) : renderEmptyElement($xeTable)])]), (0, _vue.h)(_vue.TransitionGroup, {
            class: 'vxe-table-custom--panel-list',
            tag: 'tbody',
            name: 'vxe-table-custom--list'
          }, {
            default: () => trVNs
          })])]), bottomSlot ? (0, _vue.h)('div', {
            class: 'vxe-table-custom-popup--table-bottom'
          }, $xeTable.callSlot(bottomSlot, params)) : renderEmptyElement($xeTable), renderDragTip()])]);
        },
        footer: () => {
          if (footerSlot) {
            return $xeTable.callSlot(footerSlot, params);
          }
          return (0, _vue.h)('div', {
            class: 'vxe-table-custom-popup--footer'
          }, [VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
            content: customOpts.resetButtonText || getI18n('vxe.custom.cstmRestore'),
            disabled: !isCustomStatus,
            onClick: resetCustomEvent
          }) : renderEmptyElement($xeTable), immediate ? VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
            content: customOpts.closeButtonText || getI18n('vxe.table.customClose'),
            onClick: cancelCloseEvent
          }) : renderEmptyElement($xeTable) : VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
            content: customOpts.cancelButtonText || getI18n('vxe.table.customCancel'),
            onClick: cancelCustomEvent
          }) : renderEmptyElement($xeTable), immediate ? renderEmptyElement($xeTable) : VxeUIButtonComponent ? (0, _vue.h)(VxeUIButtonComponent, {
            status: 'primary',
            content: customOpts.confirmButtonText || getI18n('vxe.custom.cstmConfirm'),
            onClick: confirmCustomEvent
          }) : renderEmptyElement($xeTable)]);
        }
      };
      if (headerSlot) {
        scopedSlots.header = () => $xeTable.callSlot(headerSlot, params);
      }
      if (mode === 'drawer') {
        return VxeUIDrawerComponent ? (0, _vue.h)(VxeUIDrawerComponent, {
          key: 'drawer',
          className: ['vxe-table-custom-drawer-wrapper', 'vxe-table--ignore-clear', drawerOpts.className || ''].join(' '),
          modelValue: customStore.visible,
          title: drawerOpts.title || getI18n('vxe.custom.cstmTitle'),
          width: drawerOpts.width || Math.min(880, Math.floor(document.documentElement.clientWidth * 0.6)),
          position: drawerOpts.position,
          resize: !!drawerOpts.resize,
          escClosable: !!drawerOpts.escClosable,
          maskClosable: !!drawerOpts.maskClosable,
          destroyOnClose: true,
          showFooter: true,
          'onUpdate:modelValue'(value) {
            customStore.visible = value;
          }
        }, scopedSlots) : renderEmptyElement($xeTable);
      }
      return VxeUIModalComponent ? (0, _vue.h)(VxeUIModalComponent, {
        key: 'modal',
        className: ['vxe-table-custom-modal-wrapper', 'vxe-table--ignore-clear', modalOpts.className || ''].join(' '),
        modelValue: customStore.visible,
        title: modalOpts.title || getI18n('vxe.custom.cstmTitle'),
        width: modalOpts.width || Math.min(880, document.documentElement.clientWidth),
        minWidth: modalOpts.minWidth || 700,
        height: modalOpts.height || Math.min(680, document.documentElement.clientHeight),
        minHeight: modalOpts.minHeight || 400,
        showZoom: modalOpts.showZoom,
        showMaximize: modalOpts.showMaximize,
        showMinimize: modalOpts.showMinimize,
        mask: modalOpts.mask,
        lockView: modalOpts.lockView,
        resize: modalOpts.resize,
        escClosable: !!modalOpts.escClosable,
        maskClosable: !!modalOpts.maskClosable,
        destroyOnClose: true,
        showFooter: true,
        'onUpdate:modelValue'(value) {
          customStore.visible = value;
        }
      }, scopedSlots) : renderEmptyElement($xeTable);
    };
    const renderVN = () => {
      const customOpts = computeCustomOpts.value;
      if (['modal', 'drawer', 'popup'].includes(`${customOpts.mode}`)) {
        return renderPopupPanel();
      }
      return renderSimplePanel();
    };
    (0, _vue.nextTick)(() => {
      const customOpts = computeCustomOpts.value;
      const {
        mode
      } = customOpts;
      if (!VxeUIModalComponent && mode === 'modal') {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-modal']);
      }
      if (!VxeUIDrawerComponent && mode === 'drawer') {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-drawer']);
      }
      if (!VxeUIButtonComponent) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-button']);
      }
      if (!VxeUINumberInputComponent) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-number-input']);
      }
      if (!VxeUIRadioGroupComponent) {
        (0, _log.errLog)('vxe.error.reqComp', ['vxe-radio-group']);
      }
    });
    const $xeTableCustomPanel = {
      xID,
      props,
      context,
      reactData: customPanelReactData,
      internalData: customPanelInternalData,
      xeTable: $xeTable,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps,
      renderVN
    };
    (0, _vue.onUnmounted)(() => {
      customPanelInternalData = createInternalData();
    });
    (0, _vue.provide)('$xeTableCustomPanel', $xeTableCustomPanel);
    return $xeTableCustomPanel;
  },
  render() {
    return this.renderVN();
  }
});