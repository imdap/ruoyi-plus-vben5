"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getRowUniqueId = getRowUniqueId;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _dom = require("../../ui/src/dom");
var _vn = require("../../ui/src/vn");
var _utils = require("../../ui/src/utils");
var _log = require("../../ui/src/log");
var _input = _interopRequireDefault(require("../../input/src/input"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getRowUniqueId() {
  return _xeUtils.default.uniqueId('row_');
}
function createInternalData() {
  return {
    // hpTimeout: undefined,
    // vpTimeout: undefined,
    fullRowMaps: {}
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTableSelect',
  props: {
    modelValue: [String, Number, Array],
    clearable: Boolean,
    placeholder: {
      type: String,
      default: () => _xeUtils.default.eqNull((0, _ui.getConfig)().tableSelect.placeholder) ? (0, _ui.getI18n)('vxe.base.pleaseSelect') : (0, _ui.getConfig)().tableSelect.placeholder
    },
    readonly: {
      type: Boolean,
      default: null
    },
    loading: Boolean,
    disabled: {
      type: Boolean,
      default: null
    },
    multiple: Boolean,
    className: [String, Function],
    prefixIcon: String,
    placement: String,
    columns: Array,
    options: Array,
    optionProps: Object,
    lazyOptions: Array,
    /**
     * 已废弃，请使用 popupConfig.zIndex
     * @deprecated
     */
    zIndex: Number,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().tableSelect.size || (0, _ui.getConfig)().size
    },
    popupConfig: Object,
    gridConfig: Object,
    transfer: {
      type: Boolean,
      default: null
    }
  },
  emits: ['update:modelValue', 'change', 'clear', 'blur', 'focus', 'click', 'form-submit', 'form-reset', 'form-collapse', 'page-change'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const VxeTableGridComponent = _ui.VxeUI.getComponent('vxe-grid');
    const $xeModal = (0, _vue.inject)('$xeModal', null);
    const $xeDrawer = (0, _vue.inject)('$xeDrawer', null);
    const $xeTable = (0, _vue.inject)('$xeTable', null);
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const formItemInfo = (0, _vue.inject)('xeFormItemInfo', null);
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refInput = (0, _vue.ref)();
    const refGridWrapper = (0, _vue.ref)();
    const refOptionPanel = (0, _vue.ref)();
    const refGrid = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      initialized: false,
      tableColumns: [],
      fullOptionList: [],
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: null,
      triggerFocusPanel: false,
      visiblePanel: false,
      isAniVisible: false,
      isActivated: false
    });
    const internalData = createInternalData();
    const refMaps = {
      refElem
    };
    const computeFormReadonly = (0, _vue.computed)(() => {
      const {
        readonly
      } = props;
      if (readonly === null) {
        if ($xeForm) {
          return $xeForm.props.readonly;
        }
        return false;
      }
      return readonly;
    });
    const computeIsDisabled = (0, _vue.computed)(() => {
      const {
        disabled
      } = props;
      if (disabled === null) {
        if ($xeForm) {
          return $xeForm.props.disabled;
        }
        return false;
      }
      return disabled;
    });
    const computeBtnTransfer = (0, _vue.computed)(() => {
      const {
        transfer
      } = props;
      const popupOpts = computePopupOpts.value;
      if (_xeUtils.default.isBoolean(popupOpts.transfer)) {
        return popupOpts.transfer;
      }
      if (transfer === null) {
        const globalTransfer = (0, _ui.getConfig)().tableSelect.transfer;
        if (_xeUtils.default.isBoolean(globalTransfer)) {
          return globalTransfer;
        }
        if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
          return true;
        }
      }
      return transfer;
    });
    const computePropsOpts = (0, _vue.computed)(() => {
      return props.optionProps || {};
    });
    const computeRowOpts = (0, _vue.computed)(() => {
      const gridOpts = computeGridOpts.value;
      return Object.assign({}, gridOpts.rowConfig, {
        isCurrent: true
      });
    });
    const computeRowKeyField = (0, _vue.computed)(() => {
      const rowOpts = computeRowOpts.value;
      return rowOpts.keyField || '_X_ROW_KEY';
    });
    const computeLabelField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.label || 'label';
    });
    const computeValueField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.value || 'value';
    });
    const computePopupOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().tableSelect.popupConfig, props.popupConfig);
    });
    const computeGridOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().tableSelect.gridConfig, props.gridConfig, {
        data: undefined
      });
    });
    const computeSelectGridOpts = (0, _vue.computed)(() => {
      const gridOpts = computeGridOpts.value;
      const {
        pagerConfig,
        proxyConfig
      } = gridOpts;
      if (proxyConfig) {
        const proxyAjax = proxyConfig.ajax;
        if (proxyAjax && proxyAjax.query) {
          const newProxyConfig = _xeUtils.default.clone(proxyConfig, true);
          const ajaxMethods = proxyAjax.query;
          if (ajaxMethods) {
            const resConfigs = proxyConfig.response || proxyConfig.props || {};
            Object.assign(newProxyConfig.ajax, {
              query(params, ...args) {
                return Promise.resolve(ajaxMethods(params, ...args)).then(rest => {
                  let tableData = [];
                  if (pagerConfig) {
                    const resultProp = resConfigs.result;
                    tableData = (_xeUtils.default.isFunction(resultProp) ? resultProp({
                      data: rest,
                      $table: null,
                      $grid: null,
                      $gantt: null
                    }) : _xeUtils.default.get(rest, resultProp || 'result')) || [];
                  } else {
                    const listProp = resConfigs.list;
                    tableData = (listProp ? _xeUtils.default.isFunction(listProp) ? listProp({
                      data: rest,
                      $table: null,
                      $grid: null,
                      $gantt: null
                    }) : _xeUtils.default.get(rest, listProp) : rest) || [];
                  }
                  cacheDataMap(tableData || []);
                  return rest;
                });
              }
            });
          }
          return Object.assign({}, gridOpts, {
            proxyConfig: newProxyConfig
          });
        }
      }
      return gridOpts;
    });
    const computeSelectLabel = (0, _vue.computed)(() => {
      const {
        modelValue,
        lazyOptions
      } = props;
      const {
        fullOptionList
      } = reactData;
      const {
        fullRowMaps
      } = internalData;
      const valueField = computeValueField.value;
      const labelField = computeLabelField.value;
      if (!fullOptionList) {
        return '';
      }
      return (_xeUtils.default.isArray(modelValue) ? modelValue : [modelValue]).map(val => {
        const cacheItem = fullRowMaps[val];
        if (cacheItem) {
          return cacheItem.item[labelField];
        }
        if (lazyOptions) {
          const lazyItem = lazyOptions.find(item => item[valueField] === val);
          if (lazyItem) {
            return lazyItem[labelField];
          }
        }
        return val;
      }).join(', ');
    });
    const computePopupWrapperStyle = (0, _vue.computed)(() => {
      const popupOpts = computePopupOpts.value;
      const {
        height,
        width
      } = popupOpts;
      const stys = {};
      if (width) {
        stys.width = (0, _dom.toCssUnit)(width);
      }
      if (height) {
        stys.height = (0, _dom.toCssUnit)(height);
      }
      return stys;
    });
    const computeMaps = {};
    const $xeTableSelect = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const gridEventKeys = ['form-submit', 'form-reset', 'form-collapse', 'page-change'];
    const gridEvents = {};
    gridEventKeys.forEach(name => {
      gridEvents[(0, _vn.getOnName)(_xeUtils.default.camelCase(name))] = params => {
        dispatchEvent(name, params, params.$event);
      };
    });
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $tableSelect: $xeTableSelect
      }, params));
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const tableSelectMethods = {
      dispatchEvent
    };
    const tableSelectPrivateMethods = {};
    const getRowid = option => {
      const nodeKeyField = computeRowKeyField.value;
      const rowid = option[nodeKeyField];
      return rowid ? encodeURIComponent(rowid) : '';
    };
    const getRowsByValue = modelValue => {
      const {
        fullRowMaps
      } = internalData;
      const rows = [];
      const vals = _xeUtils.default.eqNull(modelValue) ? [] : _xeUtils.default.isArray(modelValue) ? modelValue : [modelValue];
      vals.forEach(val => {
        const cacheItem = fullRowMaps[val];
        if (cacheItem) {
          rows.push(cacheItem.item);
        }
      });
      return rows;
    };
    const updateModel = modelValue => {
      const {
        multiple
      } = props;
      (0, _vue.nextTick)(() => {
        const $grid = refGrid.value;
        if ($grid) {
          const selectList = getRowsByValue(modelValue);
          if (selectList.length) {
            if (multiple) {
              $grid.setCheckboxRow(selectList, true);
            } else {
              $grid.setRadioRow(selectList[0]);
            }
          }
        }
      });
    };
    const loadTableColumn = columns => {
      if (!columns || !columns.length) {
        return;
      }
      const {
        multiple
      } = props;
      const tableCols = [];
      let hasRadioCol = false;
      let hasCheckboxCol = false;
      columns.forEach(column => {
        if (!hasRadioCol && column.type === 'radio') {
          hasRadioCol = true;
        } else if (!hasCheckboxCol && column.type === 'checkbox') {
          hasCheckboxCol = true;
        }
        tableCols.push(column);
      });
      if (multiple) {
        if (!hasCheckboxCol) {
          tableCols.unshift({
            type: 'checkbox',
            width: 70
          });
        }
      } else {
        if (!hasRadioCol) {
          tableCols.unshift({
            type: 'radio',
            width: 70
          });
        }
      }
      reactData.tableColumns = tableCols;
    };
    const cacheDataMap = dataList => {
      const {
        options
      } = props;
      const rowKeyField = computeRowKeyField.value;
      const valueField = computeValueField.value;
      const gridOpts = computeGridOpts.value;
      const {
        treeConfig,
        pagerConfig
      } = gridOpts;
      const rowMaps = {};
      const keyMaps = {};
      if (treeConfig) {
        // x
      } else {
        _xeUtils.default.arrayEach(dataList || options || [], (item, index, items) => {
          let rowid = getRowid(item);
          if (!rowid) {
            rowid = getRowUniqueId();
          }
          if (keyMaps[rowid]) {
            (0, _log.errLog)('vxe.error.repeatKey', [`[table-select] ${rowKeyField}`, rowid]);
          }
          keyMaps[rowid] = true;
          const value = item[valueField];
          if (rowMaps[value]) {
            (0, _log.errLog)('vxe.error.repeatKey', [`[table-select] ${valueField}`, value]);
          }
          rowMaps[value] = {
            item,
            index,
            items,
            parent: null,
            nodes: []
          };
        });
      }
      reactData.fullOptionList = dataList || options || [];
      internalData.fullRowMaps = pagerConfig ? Object.assign({}, internalData.fullRowMaps, rowMaps) : rowMaps;
      updateModel(props.modelValue);
    };
    const updateZindex = () => {
      const popupOpts = computePopupOpts.value;
      const customZIndex = popupOpts.zIndex || props.zIndex;
      if (customZIndex) {
        reactData.panelIndex = _xeUtils.default.toNumber(customZIndex);
      } else if (reactData.panelIndex < (0, _utils.getLastZIndex)()) {
        reactData.panelIndex = (0, _utils.nextZIndex)();
      }
    };
    const updatePlacement = () => {
      const {
        placement
      } = props;
      const {
        panelIndex
      } = reactData;
      const targetElem = refElem.value;
      const panelElem = refOptionPanel.value;
      const btnTransfer = computeBtnTransfer.value;
      const popupOpts = computePopupOpts.value;
      const handleStyle = () => {
        const ppObj = (0, _dom.updatePanelPlacement)(targetElem, panelElem, {
          placement: popupOpts.placement || placement,
          defaultPlacement: popupOpts.defaultPlacement,
          teleportTo: btnTransfer
        });
        const panelStyle = Object.assign(ppObj.style, {
          zIndex: panelIndex
        });
        reactData.panelStyle = panelStyle;
        reactData.panelPlacement = ppObj.placement;
      };
      handleStyle();
      return (0, _vue.nextTick)().then(handleStyle);
    };
    const showOptionPanel = () => {
      const {
        loading
      } = props;
      const isDisabled = computeIsDisabled.value;
      if (!loading && !isDisabled) {
        if (internalData.vpTimeout) {
          clearTimeout(internalData.vpTimeout);
        }
        if (internalData.hpTimeout) {
          clearTimeout(internalData.hpTimeout);
        }
        if (!reactData.initialized) {
          reactData.initialized = true;
        }
        reactData.isActivated = true;
        reactData.isAniVisible = true;
        internalData.vpTimeout = setTimeout(() => {
          reactData.visiblePanel = true;
          updateModel(props.modelValue);
          internalData.vpTimeout = undefined;
          updatePlacement();
        }, 10);
        updateZindex();
        updatePlacement();
      }
    };
    const hideOptionPanel = () => {
      reactData.visiblePanel = false;
      if (internalData.vpTimeout) {
        clearTimeout(internalData.vpTimeout);
      }
      if (internalData.hpTimeout) {
        clearTimeout(internalData.hpTimeout);
      }
      internalData.hpTimeout = setTimeout(() => {
        reactData.isAniVisible = false;
        internalData.hpTimeout = undefined;
      }, 350);
    };
    const changeEvent = (evnt, selectValue, row) => {
      emitModel(selectValue);
      if (selectValue !== props.modelValue) {
        dispatchEvent('change', {
          value: selectValue,
          row,
          option: row
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, selectValue);
        }
      }
    };
    const clearValueEvent = (evnt, selectValue) => {
      changeEvent(evnt, selectValue, null);
      dispatchEvent('clear', {
        value: selectValue
      }, evnt);
    };
    const clearEvent = (params, evnt) => {
      clearValueEvent(evnt, null);
      hideOptionPanel();
    };
    const handleGlobalMousewheelEvent = evnt => {
      const {
        visiblePanel
      } = reactData;
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        if (visiblePanel) {
          const panelElem = refOptionPanel.value;
          if ((0, _dom.getEventTargetNode)(evnt, panelElem).flag) {
            updatePlacement();
          } else {
            hideOptionPanel();
          }
        }
      }
    };
    const handleGlobalMousedownEvent = evnt => {
      const {
        visiblePanel
      } = reactData;
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        const el = refElem.value;
        const panelElem = refOptionPanel.value;
        reactData.isActivated = (0, _dom.getEventTargetNode)(evnt, el).flag || (0, _dom.getEventTargetNode)(evnt, panelElem).flag;
        if (visiblePanel && !reactData.isActivated) {
          hideOptionPanel();
        }
      }
    };
    const handleGlobalBlurEvent = () => {
      const {
        visiblePanel,
        isActivated
      } = reactData;
      if (visiblePanel) {
        hideOptionPanel();
      }
      if (isActivated) {
        reactData.isActivated = false;
      }
      if (visiblePanel || isActivated) {
        const $input = refInput.value;
        if ($input) {
          $input.blur();
        }
      }
    };
    const handleGlobalResizeEvent = () => {
      const {
        visiblePanel
      } = reactData;
      if (visiblePanel) {
        updatePlacement();
      }
    };
    const focusEvent = evnt => {
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        if (!reactData.visiblePanel) {
          reactData.triggerFocusPanel = true;
          showOptionPanel();
          setTimeout(() => {
            reactData.triggerFocusPanel = false;
          }, 150);
        }
      }
      dispatchEvent('focus', {}, evnt);
    };
    const clickEvent = evnt => {
      togglePanelEvent(evnt);
      dispatchEvent('click', {}, evnt);
    };
    const blurEvent = evnt => {
      reactData.isActivated = false;
      dispatchEvent('blur', {}, evnt);
    };
    const togglePanelEvent = params => {
      const {
        $event
      } = params;
      $event.preventDefault();
      if (reactData.triggerFocusPanel) {
        reactData.triggerFocusPanel = false;
      } else {
        if (reactData.visiblePanel) {
          hideOptionPanel();
        } else {
          showOptionPanel();
        }
      }
    };
    const radioChangeEvent = params => {
      const {
        $event,
        row
      } = params;
      const valueField = computeValueField.value;
      const value = row[valueField];
      changeEvent($event, value, row);
      hideOptionPanel();
    };
    const checkboxChangeEvent = params => {
      const {
        $grid,
        $event,
        row
      } = params;
      const valueField = computeValueField.value;
      if ($grid) {
        const checkboxRecords = $grid.getCheckboxRecords();
        const value = checkboxRecords.map(row => {
          return row[valueField];
        });
        changeEvent($event, value, row);
      }
    };
    const checkboxAllEvent = params => {
      checkboxChangeEvent(params);
    };
    Object.assign($xeTableSelect, tableSelectMethods, tableSelectPrivateMethods);
    const renderVN = () => {
      const {
        className,
        options,
        loading
      } = props;
      const {
        initialized,
        isActivated,
        isAniVisible,
        visiblePanel,
        tableColumns
      } = reactData;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const selectLabel = computeSelectLabel.value;
      const btnTransfer = computeBtnTransfer.value;
      const formReadonly = computeFormReadonly.value;
      const popupOpts = computePopupOpts.value;
      const selectGridOpts = computeSelectGridOpts.value;
      const rowOpts = computeRowOpts.value;
      const popupWrapperStyle = computePopupWrapperStyle.value;
      const headerSlot = slots.header;
      const footerSlot = slots.footer;
      const prefixSlot = slots.prefix;
      const ppClassName = popupOpts.className;
      if (formReadonly) {
        return (0, _vue.h)('div', {
          ref: refElem,
          class: ['vxe-table-select--readonly', className]
        }, [(0, _vue.h)('span', {
          class: 'vxe-table-select-label'
        }, selectLabel)]);
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-table-select', className ? _xeUtils.default.isFunction(className) ? className({
          $tableSelect: $xeTableSelect
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--visible': visiblePanel,
          'is--disabled': isDisabled,
          'is--loading': loading,
          'is--active': isActivated
        }]
      }, [(0, _vue.h)(_input.default, {
        ref: refInput,
        clearable: props.clearable,
        placeholder: loading ? (0, _ui.getI18n)('vxe.select.loadingText') : props.placeholder,
        editable: false,
        disabled: isDisabled,
        type: 'text',
        prefixIcon: props.prefixIcon,
        suffixIcon: loading ? (0, _ui.getIcon)().TABLE_SELECT_LOADED : visiblePanel ? (0, _ui.getIcon)().TABLE_SELECT_OPEN : (0, _ui.getIcon)().TABLE_SELECT_CLOSE,
        modelValue: loading ? '' : selectLabel,
        onClear: clearEvent,
        onClick: clickEvent,
        onFocus: focusEvent,
        onBlur: blurEvent,
        onSuffixClick: togglePanelEvent
      }, prefixSlot ? {
        prefix: () => prefixSlot({})
      } : {}), (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: btnTransfer ? !initialized : true
      }, [(0, _vue.h)('div', {
        ref: refOptionPanel,
        class: ['vxe-table--ignore-clear vxe-table-select--panel', ppClassName ? _xeUtils.default.isFunction(ppClassName) ? ppClassName({
          $tableSelect: $xeTableSelect
        }) : ppClassName : '', {
          [`size--${vSize}`]: vSize,
          'is--transfer': btnTransfer,
          'ani--leave': !loading && isAniVisible,
          'ani--enter': !loading && visiblePanel
        }],
        placement: reactData.panelPlacement,
        style: reactData.panelStyle
      }, initialized ? [(0, _vue.h)('div', {
        class: 'vxe-table-select--panel-wrapper'
      }, [headerSlot ? (0, _vue.h)('div', {
        class: 'vxe-table-select--panel-header'
      }, headerSlot({})) : (0, _ui.renderEmptyElement)($xeTableSelect), (0, _vue.h)('div', {
        class: 'vxe-table-select--panel-body'
      }, [(0, _vue.h)('div', {
        ref: refGridWrapper,
        class: 'vxe-table-select-grid--wrapper',
        style: popupWrapperStyle
      }, [VxeTableGridComponent ? (0, _vue.h)(VxeTableGridComponent, Object.assign(Object.assign(Object.assign({}, selectGridOpts), gridEvents), {
        class: 'vxe-table-select--grid',
        ref: refGrid,
        rowConfig: rowOpts,
        data: options,
        columns: tableColumns.length ? tableColumns : selectGridOpts.columns,
        height: '100%',
        autoResize: true,
        onRadioChange: radioChangeEvent,
        onCheckboxChange: checkboxChangeEvent,
        onCheckboxAll: checkboxAllEvent
      }), Object.assign({}, slots, {
        header: undefined,
        footer: undefined,
        prefixSlot: undefined
      })) : (0, _ui.renderEmptyElement)($xeTableSelect)])]), footerSlot ? (0, _vue.h)('div', {
        class: 'vxe-table-select--panel-footer'
      }, footerSlot({})) : (0, _ui.renderEmptyElement)($xeTableSelect)])] : [])])]);
    };
    (0, _vue.watch)(() => props.options, () => {
      cacheDataMap();
    });
    (0, _vue.watch)(() => props.columns, val => {
      loadTableColumn(val);
    });
    (0, _vue.watch)(() => props.modelValue, val => {
      updateModel(val);
    });
    loadTableColumn(props.columns);
    cacheDataMap();
    (0, _vue.onMounted)(() => {
      const {
        gridConfig
      } = props;
      if (gridConfig && gridConfig.proxyConfig) {
        if (gridConfig.proxyConfig.autoLoad !== false) {
          reactData.initialized = true;
        }
      }
      _ui.globalEvents.on($xeTableSelect, 'mousewheel', handleGlobalMousewheelEvent);
      _ui.globalEvents.on($xeTableSelect, 'mousedown', handleGlobalMousedownEvent);
      _ui.globalEvents.on($xeTableSelect, 'blur', handleGlobalBlurEvent);
      _ui.globalEvents.on($xeTableSelect, 'resize', handleGlobalResizeEvent);
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeTableSelect, 'mousewheel');
      _ui.globalEvents.off($xeTableSelect, 'mousedown');
      _ui.globalEvents.off($xeTableSelect, 'blur');
      _ui.globalEvents.off($xeTableSelect, 'resize');
      _xeUtils.default.assign(internalData, createInternalData());
    });
    (0, _vue.nextTick)(() => {
      if (!VxeTableGridComponent) {
        (0, _log.errLog)('vxe.error.reqComp', ['[table-select] vxe-grid']);
      }
    });
    (0, _vue.provide)('$xeTableSelect', $xeTableSelect);
    $xeTableSelect.renderVN = renderVN;
    return $xeTableSelect;
  },
  render() {
    return this.renderVN();
  }
});