"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _dom = require("../../ui/src/dom");
var _utils = require("../../ui/src/utils");
var _util = require("../../tree/src/util");
var _log = require("../../ui/src/log");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _input = _interopRequireDefault(require("../../input/src/input"));
var _button = _interopRequireDefault(require("../../button/src/button"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getOptUniqueId() {
  return _xeUtils.default.uniqueId('node_');
}
function createInternalData() {
  return {
    // hpTimeout: undefined,
    fullOptionList: [],
    fullNodeMaps: {}
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeCascader',
  props: {
    modelValue: [String, Number, Array],
    clearable: Boolean,
    placeholder: {
      type: String,
      default: () => _xeUtils.default.eqNull((0, _ui.getConfig)().cascader.placeholder) ? (0, _ui.getI18n)('vxe.base.pleaseSelect') : (0, _ui.getConfig)().cascader.placeholder
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
    filterable: Boolean,
    filterConfig: Object,
    multiple: Boolean,
    className: [String, Function],
    prefixIcon: String,
    placement: String,
    transform: Boolean,
    lazyOptions: Array,
    options: Array,
    optionProps: Object,
    zIndex: Number,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().cascader.size || (0, _ui.getConfig)().size
    },
    remote: Boolean,
    remoteConfig: Function,
    popupConfig: Object,
    autoClose: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().cascader.autoClose
    },
    showTotalButoon: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().cascader.showTotalButoon
    },
    showCheckedButoon: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().cascader.showCheckedButoon
    },
    showClearButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().cascader.showClearButton
    },
    transfer: {
      type: Boolean,
      default: null
    },
    /**
     * 已废弃，被 remote-config.queryMethod 替换
     * @deprecated
     */
    remoteMethod: Function
  },
  emits: ['update:modelValue', 'change', 'all-change', 'clear', 'blur', 'focus', 'click', 'node-click'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
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
    const refInpSearch = (0, _vue.ref)();
    const refTreeWrapper = (0, _vue.ref)();
    const refOptionPanel = (0, _vue.ref)();
    const refTree = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      initialized: false,
      searchValue: '',
      searchLoading: false,
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
      if (transfer === null) {
        const globalTransfer = (0, _ui.getConfig)().select.transfer;
        if (_xeUtils.default.isBoolean(globalTransfer)) {
          return globalTransfer;
        }
        if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
          return true;
        }
      }
      return transfer;
    });
    const computePopupOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().cascader.popupConfig, props.popupConfig);
    });
    const computePropsOpts = (0, _vue.computed)(() => {
      return props.optionProps || {};
    });
    const computeNodeKeyField = (0, _vue.computed)(() => {
      const valueField = computeValueField.value;
      return valueField;
    });
    const computeLabelField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.label || 'label';
    });
    const computeValueField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.value || 'value';
    });
    const computeChildrenField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.children || 'children';
    });
    const computeRemoteOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().cascader.remoteConfig, props.remoteConfig);
    });
    const computeSelectLabel = (0, _vue.computed)(() => {
      const {
        modelValue,
        lazyOptions
      } = props;
      const {
        fullNodeMaps
      } = internalData;
      const valueField = computeValueField.value;
      const labelField = computeLabelField.value;
      const selectVals = _xeUtils.default.eqNull(modelValue) ? [] : _xeUtils.default.isArray(modelValue) ? modelValue : [modelValue];
      return selectVals.map(val => {
        const cacheItem = fullNodeMaps[val];
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
        stys.maxHeight = (0, _dom.toCssUnit)(height);
      }
      return stys;
    });
    const computeMaps = {};
    const $xeCascader = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $cascader: $xeCascader
      }, params));
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const cascaderMethods = {
      dispatchEvent
    };
    const getNodeid = option => {
      const nodeKeyField = computeNodeKeyField.value;
      const nodeid = option[nodeKeyField];
      return nodeid ? encodeURIComponent(nodeid) : '';
    };
    const cacheDataMap = () => {
      const {
        transform,
        options
      } = props;
      const nodeKeyField = computeNodeKeyField.value;
      const childrenField = computeChildrenField.value;
      const valueField = computeValueField.value;
      const nodeMaps = {};
      const keyMaps = {};
      const handleOptNode = (item, index, items, path, parent, nodes) => {
        let nodeid = getNodeid(item);
        if (!nodeid) {
          nodeid = getOptUniqueId();
        }
        if (keyMaps[nodeid]) {
          (0, _log.errLog)('vxe.error.repeatKey', [`[tree-select] ${nodeKeyField}`, nodeid]);
        }
        keyMaps[nodeid] = true;
        const value = item[valueField];
        if (nodeMaps[value]) {
          (0, _log.errLog)('vxe.error.repeatKey', [`[tree-select] ${valueField}`, value]);
        }
        nodeMaps[value] = {
          item,
          index,
          items,
          parent,
          nodes
        };
      };
      if (options) {
        if (transform) {
          options.forEach((item, index, items) => {
            handleOptNode(item, index, items, [], null, []);
          });
        } else {
          _xeUtils.default.eachTree(options, handleOptNode, {
            children: childrenField
          });
        }
      }
      internalData.fullOptionList = options || [];
      internalData.fullNodeMaps = nodeMaps;
    };
    const updateZindex = () => {
      const {
        zIndex
      } = props;
      if (zIndex) {
        reactData.panelIndex = zIndex;
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
        loading,
        remote,
        filterable
      } = props;
      const {
        fullOptionList
      } = internalData;
      const isDisabled = computeIsDisabled.value;
      const remoteOpts = computeRemoteOpts.value;
      if (!loading && !isDisabled) {
        clearTimeout(internalData.hpTimeout);
        if (!reactData.initialized) {
          reactData.initialized = true;
        }
        reactData.isActivated = true;
        reactData.isAniVisible = true;
        if (filterable) {
          if (remote && remoteOpts.enabled && remoteOpts.autoLoad && !fullOptionList.length) {
            handleSearchEvent();
          }
        }
        setTimeout(() => {
          reactData.visiblePanel = true;
          handleFocusSearch();
        }, 10);
        updateZindex();
        updatePlacement();
      }
    };
    const hideOptionPanel = () => {
      reactData.visiblePanel = false;
      internalData.hpTimeout = setTimeout(() => {
        reactData.isAniVisible = false;
      }, 350);
    };
    const changeEvent = (evnt, selectValue, node) => {
      const value = _xeUtils.default.isArray(selectValue) ? selectValue.map(_util.deNodeValue) : (0, _util.deNodeValue)(selectValue);
      emitModel(value);
      if (value !== props.modelValue) {
        dispatchEvent('change', {
          value,
          node,
          option: node
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
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
    const allCheckedPanelEvent = params => {
      const {
        $event
      } = params;
      const {
        multiple,
        autoClose
      } = props;
      const $tree = refTree.value;
      if (multiple) {
        if ($tree) {
          $tree.setAllCheckboxNode(true).then(({
            checkNodeKeys,
            checkNodes
          }) => {
            changeEvent($event, checkNodeKeys, checkNodes[0]);
            dispatchEvent('all-change', {
              value: checkNodeKeys
            }, $event);
            if (autoClose) {
              hideOptionPanel();
            }
          });
        }
      }
    };
    const clearCheckedPanelEvent = params => {
      const {
        $event
      } = params;
      const {
        multiple,
        autoClose
      } = props;
      const $tree = refTree.value;
      if ($tree) {
        const value = multiple ? [] : null;
        $tree.clearCheckboxNode().then(() => {
          if (autoClose) {
            hideOptionPanel();
          }
        });
        changeEvent($event, value, null);
        dispatchEvent('clear', {
          value
        }, $event);
      }
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
    const handleFocusSearch = () => {
      if (props.filterable) {
        (0, _vue.nextTick)(() => {
          const inpSearch = refInpSearch.value;
          if (inpSearch) {
            inpSearch.focus();
          }
        });
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
    const modelSearchEvent = value => {
      reactData.searchValue = value;
    };
    const handleSearchEvent = () => {
      const {
        modelValue,
        remote,
        remoteMethod
      } = props;
      const {
        searchValue
      } = reactData;
      const remoteOpts = computeRemoteOpts.value;
      const queryMethod = remoteOpts.queryMethod || remoteMethod;
      if (remote && queryMethod && remoteOpts.enabled) {
        reactData.searchLoading = true;
        Promise.resolve(queryMethod({
          $cascader: $xeCascader,
          searchValue,
          value: modelValue
        })).then(() => (0, _vue.nextTick)()).catch(() => (0, _vue.nextTick)()).finally(() => {
          reactData.searchLoading = false;
        });
      }
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
    const cascaderPrivateMethods = {};
    Object.assign($xeCascader, cascaderMethods, cascaderPrivateMethods);
    const renderVN = () => {
      const {
        className,
        modelValue,
        multiple,
        loading,
        filterable,
        showTotalButoon,
        showCheckedButoon,
        showClearButton
      } = props;
      const {
        initialized,
        isActivated,
        isAniVisible,
        visiblePanel,
        searchValue
      } = reactData;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const selectLabel = computeSelectLabel.value;
      const btnTransfer = computeBtnTransfer.value;
      const formReadonly = computeFormReadonly.value;
      const popupWrapperStyle = computePopupWrapperStyle.value;
      const headerSlot = slots.header;
      const footerSlot = slots.footer;
      const prefixSlot = slots.prefix;
      const popupOpts = computePopupOpts.value;
      const popupClassName = popupOpts.className;
      if (formReadonly) {
        return (0, _vue.h)('div', {
          ref: refElem,
          class: ['vxe-cascader--readonly', className]
        }, [(0, _vue.h)('span', {
          class: 'vxe-cascader-label'
        }, selectLabel)]);
      }
      const selectVals = _xeUtils.default.eqNull(modelValue) ? [] : _xeUtils.default.isArray(modelValue) ? modelValue : [modelValue];
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-cascader', className ? _xeUtils.default.isFunction(className) ? className({
          $cascader: $xeCascader
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--filterable': filterable,
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
        suffixIcon: loading ? (0, _ui.getIcon)().TREE_SELECT_LOADED : visiblePanel ? (0, _ui.getIcon)().TREE_SELECT_OPEN : (0, _ui.getIcon)().TREE_SELECT_CLOSE,
        modelValue: loading ? '' : selectLabel,
        title: selectLabel,
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
        class: ['vxe-table--ignore-clear vxe-cascader--panel', popupClassName ? _xeUtils.default.isFunction(popupClassName) ? popupClassName({
          $cascader: $xeCascader
        }) : popupClassName : '', {
          [`size--${vSize}`]: vSize,
          'is--transfer': btnTransfer,
          'ani--leave': !loading && isAniVisible,
          'ani--enter': !loading && visiblePanel
        }],
        placement: reactData.panelPlacement,
        style: reactData.panelStyle
      }, initialized ? [(0, _vue.h)('div', {
        class: 'vxe-cascader--panel-wrapper'
      }, [filterable ? (0, _vue.h)('div', {
        class: 'vxe-cascader--panel-search'
      }, [(0, _vue.h)(_input.default, {
        ref: refInpSearch,
        class: 'vxe-cascader-search--input',
        modelValue: searchValue,
        clearable: true,
        disabled: false,
        readonly: false,
        placeholder: (0, _ui.getI18n)('vxe.cascader.search'),
        prefixIcon: (0, _ui.getIcon)().INPUT_SEARCH,
        'onUpdate:modelValue': modelSearchEvent
      })]) : (0, _ui.renderEmptyElement)($xeCascader), showTotalButoon || showCheckedButoon && multiple || showClearButton || headerSlot ? (0, _vue.h)('div', {
        class: 'vxe-cascader--panel-header'
      }, headerSlot ? headerSlot({}) : [(0, _vue.h)('div', {
        class: 'vxe-cascader--header-button'
      }, [showTotalButoon ? (0, _vue.h)('div', {
        class: 'vxe-cascader--header-total'
      }, (0, _ui.getI18n)('vxe.cascader.total', [selectVals.length])) : (0, _ui.renderEmptyElement)($xeCascader), (0, _vue.h)('div', {
        class: 'vxe-cascader--header-btns'
      }, [showCheckedButoon && multiple ? (0, _vue.h)(_button.default, {
        content: (0, _ui.getI18n)('vxe.cascader.allChecked'),
        mode: 'text',
        onClick: allCheckedPanelEvent
      }) : (0, _ui.renderEmptyElement)($xeCascader), showClearButton ? (0, _vue.h)(_button.default, {
        content: (0, _ui.getI18n)('vxe.cascader.clearChecked'),
        mode: 'text',
        onClick: clearCheckedPanelEvent
      }) : (0, _ui.renderEmptyElement)($xeCascader)])])]) : (0, _ui.renderEmptyElement)($xeCascader), (0, _vue.h)('div', {
        class: 'vxe-cascader--panel-body'
      }, [(0, _vue.h)('div', {
        ref: refTreeWrapper,
        class: 'vxe-cascader-tree--wrapper',
        style: popupWrapperStyle
      }, [])]), footerSlot ? (0, _vue.h)('div', {
        class: 'vxe-cascader--panel-footer'
      }, footerSlot({})) : (0, _ui.renderEmptyElement)($xeCascader)])] : [])])]);
    };
    (0, _vue.watch)(() => props.options, () => {
      cacheDataMap();
    });
    cacheDataMap();
    (0, _vue.onMounted)(() => {
      _ui.globalEvents.on($xeCascader, 'mousewheel', handleGlobalMousewheelEvent);
      _ui.globalEvents.on($xeCascader, 'mousedown', handleGlobalMousedownEvent);
      _ui.globalEvents.on($xeCascader, 'blur', handleGlobalBlurEvent);
      _ui.globalEvents.on($xeCascader, 'resize', handleGlobalResizeEvent);
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeCascader, 'mousewheel');
      _ui.globalEvents.off($xeCascader, 'mousedown');
      _ui.globalEvents.off($xeCascader, 'blur');
      _ui.globalEvents.off($xeCascader, 'resize');
      _xeUtils.default.assign(internalData, createInternalData());
    });
    (0, _vue.provide)('$xeCascader', $xeCascader);
    $xeCascader.renderVN = renderVN;
    return $xeCascader;
  },
  render() {
    return this.renderVN();
  }
});