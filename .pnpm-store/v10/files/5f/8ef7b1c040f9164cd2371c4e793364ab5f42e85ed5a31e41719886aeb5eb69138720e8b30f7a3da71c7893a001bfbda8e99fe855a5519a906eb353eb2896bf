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
var _input = _interopRequireDefault(require("../../input"));
var _button = _interopRequireDefault(require("../../button"));
var _tree = _interopRequireDefault(require("../../tree"));
var _vn = require("../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getOptUniqueId() {
  return _xeUtils.default.uniqueId('node_');
}
function createReactData() {
  return {
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
  };
}
function createInternalData() {
  return {
    // hpTimeout: undefined,
    fullOptionList: [],
    fullNodeMaps: {}
  };
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeTreeSelect',
  props: {
    modelValue: [String, Number, Array],
    clearable: Boolean,
    placeholder: {
      type: String,
      default: () => _xeUtils.default.eqNull((0, _ui.getConfig)().treeSelect.placeholder) ? (0, _ui.getI18n)('vxe.base.pleaseSelect') : (0, _ui.getConfig)().treeSelect.placeholder
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
    /**
     * 已废弃，请使用 popupConfig.className
     * @deprecated
     */
    popupClassName: [String, Function],
    prefixIcon: String,
    placement: String,
    lazyOptions: Array,
    options: Array,
    optionProps: Object,
    /**
     * 已废弃，请使用 popupConfig.zIndex
     * @deprecated
     */
    zIndex: Number,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().treeSelect.size || (0, _ui.getConfig)().size
    },
    remote: Boolean,
    remoteConfig: Function,
    popupConfig: Object,
    treeConfig: Object,
    menuConfig: Object,
    virtualYConfig: Object,
    autoClose: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().treeSelect.autoClose
    },
    showTotalButoon: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().treeSelect.showTotalButoon
    },
    showCheckedButoon: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().treeSelect.showCheckedButoon
    },
    showClearButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().treeSelect.showClearButton
    },
    showExpandButton: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().treeSelect.showExpandButton
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
    const reactData = (0, _vue.reactive)(createReactData());
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
        const globalTransfer = (0, _ui.getConfig)().treeSelect.transfer;
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
      return Object.assign({}, (0, _ui.getConfig)().treeSelect.popupConfig, props.popupConfig);
    });
    const computeTreeOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().treeSelect.treeConfig, props.treeConfig, {
        data: undefined
      });
    });
    const computeMenuOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().treeSelect.menuConfig, props.menuConfig);
    });
    const computeTreeNodeOpts = (0, _vue.computed)(() => {
      const treeOpts = computeTreeOpts.value;
      return Object.assign({
        isHover: true
      }, treeOpts.nodeConfig);
    });
    const computeTreeCheckboxOpts = (0, _vue.computed)(() => {
      const treeOpts = computeTreeOpts.value;
      return Object.assign({
        showIcon: !!treeOpts.showCheckbox
      }, treeOpts.checkboxConfig, {
        trigger: 'node'
      });
    });
    const computeTreeRadioOpts = (0, _vue.computed)(() => {
      const treeOpts = computeTreeOpts.value;
      return Object.assign({
        showIcon: !!treeOpts.showRadio
      }, treeOpts.radioConfig, {
        trigger: 'node'
      });
    });
    const computePropsOpts = (0, _vue.computed)(() => {
      return props.optionProps || {};
    });
    const computeNodeKeyField = (0, _vue.computed)(() => {
      const treeOpts = computeTreeOpts.value;
      return treeOpts.keyField || 'id';
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
    const computeParentField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.parent || 'parentField';
    });
    const computeHasChildField = (0, _vue.computed)(() => {
      const propsOpts = computePropsOpts.value;
      return propsOpts.hasChild || 'hasChild';
    });
    const computeVirtualYOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().treeSelect.virtualYConfig, props.virtualYConfig);
    });
    const computeRemoteOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().treeSelect.remoteConfig, props.remoteConfig);
    });
    const computeFilterOpts = (0, _vue.computed)(() => {
      const treeOpts = computeTreeOpts.value;
      return Object.assign({}, treeOpts.filterConfig, props.filterConfig);
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
    const $xeTreeSelect = {
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
        $treeSelect: $xeTreeSelect
      }, params));
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const callSlot = (slotFunc, params) => {
      if (slotFunc) {
        if (_xeUtils.default.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null;
        }
        if (_xeUtils.default.isFunction(slotFunc)) {
          return (0, _vn.getSlotVNs)(slotFunc(params));
        }
      }
      return [];
    };
    const treeSelectMethods = {
      dispatchEvent
    };
    const getNodeid = option => {
      const nodeKeyField = computeNodeKeyField.value;
      const nodeid = option[nodeKeyField];
      return nodeid ? encodeURIComponent(nodeid) : '';
    };
    const cacheDataMap = () => {
      const {
        options
      } = props;
      const treeOpts = computeTreeOpts.value;
      const nodeKeyField = computeNodeKeyField.value;
      const childrenField = computeChildrenField.value;
      const valueField = computeValueField.value;
      const {
        transform
      } = treeOpts;
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
          updatePlacement();
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
    const allExpandPanelEvent = () => {
      const $tree = refTree.value;
      if ($tree) {
        $tree.setAllExpandNode(true);
      }
    };
    const clearExpandPanelEvent = () => {
      const $tree = refTree.value;
      if ($tree) {
        $tree.clearAllExpandNode();
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
          $treeSelect: $xeTreeSelect,
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
    const nodeExpandEvent = () => {
      updatePlacement();
    };
    const nodeClickEvent = params => {
      const {
        $event
      } = params;
      dispatchEvent('node-click', params, $event);
    };
    const radioChangeEvent = params => {
      const {
        value,
        $event,
        node
      } = params;
      changeEvent($event, value, node);
      hideOptionPanel();
    };
    const checkboxChangeEvent = params => {
      const {
        value,
        $event,
        node
      } = params;
      changeEvent($event, value, node);
    };
    const loadSuccessEvent = () => {
      cacheDataMap();
    };
    const treeSelectPrivateMethods = {};
    Object.assign($xeTreeSelect, treeSelectMethods, treeSelectPrivateMethods);
    const renderVN = () => {
      const {
        className,
        modelValue,
        multiple,
        options,
        loading,
        menuConfig,
        filterable,
        showTotalButoon,
        showCheckedButoon,
        showClearButton,
        showExpandButton
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
      const ppClassName = popupOpts.className || props.popupClassName;
      if (formReadonly) {
        return (0, _vue.h)('div', {
          ref: refElem,
          class: ['vxe-tree-select--readonly', className]
        }, [(0, _vue.h)('span', {
          class: 'vxe-tree-select-label'
        }, selectLabel)]);
      }
      const treeOpts = computeTreeOpts.value;
      const menuOpts = computeMenuOpts.value;
      const treeNodeOpts = computeTreeNodeOpts.value;
      const treeCheckboxOpts = computeTreeCheckboxOpts.value;
      const treeRadioOpts = computeTreeRadioOpts.value;
      const nodeKeyField = computeNodeKeyField.value;
      const labelField = computeLabelField.value;
      const valueField = computeValueField.value;
      const childrenField = computeChildrenField.value;
      const parentField = computeParentField.value;
      const hasChildField = computeHasChildField.value;
      const virtualYOpts = computeVirtualYOpts.value;
      const filterOpts = computeFilterOpts.value;
      const {
        slots: treeSlots
      } = treeOpts;
      const selectVals = _xeUtils.default.eqNull(modelValue) ? [] : _xeUtils.default.isArray(modelValue) ? modelValue : [modelValue];
      const treeScopedSlots = {};
      if (treeSlots) {
        const {
          icon: treeIconSlot,
          title: treeTitleSlot,
          extra: treeExtraSlot
        } = treeSlots;
        if (treeIconSlot) {
          treeScopedSlots.icon = slotParams => callSlot(treeIconSlot, slotParams);
        }
        if (treeTitleSlot) {
          treeScopedSlots.title = slotParams => callSlot(treeTitleSlot, slotParams);
        }
        if (treeExtraSlot) {
          treeScopedSlots.extra = slotParams => callSlot(treeExtraSlot, slotParams);
        }
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-tree-select', className ? _xeUtils.default.isFunction(className) ? className({
          $treeSelect: $xeTreeSelect
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
        class: ['vxe-table--ignore-clear vxe-tree-select--panel', ppClassName ? _xeUtils.default.isFunction(ppClassName) ? ppClassName({
          $treeSelect: $xeTreeSelect
        }) : ppClassName : '', {
          [`size--${vSize}`]: vSize,
          'is--transfer': btnTransfer,
          'ani--leave': !loading && isAniVisible,
          'ani--enter': !loading && visiblePanel
        }],
        placement: reactData.panelPlacement,
        style: reactData.panelStyle
      }, initialized ? [(0, _vue.h)('div', {
        class: 'vxe-tree-select--panel-wrapper'
      }, [filterable ? (0, _vue.h)('div', {
        class: 'vxe-tree-select--panel-search'
      }, [(0, _vue.h)(_input.default, {
        ref: refInpSearch,
        class: 'vxe-tree-select-search--input',
        modelValue: searchValue,
        clearable: true,
        disabled: false,
        readonly: false,
        placeholder: (0, _ui.getI18n)('vxe.treeSelect.search'),
        prefixIcon: (0, _ui.getIcon)().INPUT_SEARCH,
        'onUpdate:modelValue': modelSearchEvent
      })]) : (0, _ui.renderEmptyElement)($xeTreeSelect), showTotalButoon || showCheckedButoon && multiple || showClearButton || showExpandButton || headerSlot ? (0, _vue.h)('div', {
        class: 'vxe-tree-select--panel-header'
      }, headerSlot ? headerSlot({}) : [(0, _vue.h)('div', {
        class: 'vxe-tree-select--header-button'
      }, [showCheckedButoon && showClearButton ? (0, _vue.h)('div', {
        class: 'vxe-tree-select--selected-btns'
      }, [showCheckedButoon && multiple ? (0, _vue.h)(_button.default, {
        content: (0, _ui.getI18n)('vxe.treeSelect.allChecked'),
        mode: 'text',
        onClick: allCheckedPanelEvent
      }) : (0, _ui.renderEmptyElement)($xeTreeSelect), showClearButton ? (0, _vue.h)(_button.default, {
        content: (0, _ui.getI18n)('vxe.treeSelect.clearChecked'),
        mode: 'text',
        onClick: clearCheckedPanelEvent
      }) : (0, _ui.renderEmptyElement)($xeTreeSelect)]) : (0, _ui.renderEmptyElement)($xeTreeSelect), showExpandButton && showExpandButton ? (0, _vue.h)('div', {
        class: 'vxe-tree-select--expand-btns'
      }, [showExpandButton ? (0, _vue.h)(_button.default, {
        content: (0, _ui.getI18n)('vxe.treeSelect.allExpand'),
        mode: 'text',
        onClick: allExpandPanelEvent
      }) : (0, _ui.renderEmptyElement)($xeTreeSelect), showExpandButton ? (0, _vue.h)(_button.default, {
        content: (0, _ui.getI18n)('vxe.treeSelect.clearExpand'),
        mode: 'text',
        onClick: clearExpandPanelEvent
      }) : (0, _ui.renderEmptyElement)($xeTreeSelect)]) : (0, _ui.renderEmptyElement)($xeTreeSelect)])]) : (0, _ui.renderEmptyElement)($xeTreeSelect), (0, _vue.h)('div', {
        class: 'vxe-tree-select--panel-body'
      }, [(0, _vue.h)('div', {
        ref: refTreeWrapper,
        class: 'vxe-tree-select-tree--wrapper',
        style: popupWrapperStyle
      }, [(0, _vue.h)(_tree.default, {
        ref: refTree,
        class: 'vxe-tree-select--tree',
        height: popupOpts.height ? '100%' : treeOpts.height,
        minHeight: treeOpts.minHeight,
        maxHeight: popupOpts.height ? '' : treeOpts.maxHeight,
        autoResize: true,
        data: options,
        indent: treeOpts.indent,
        showRadio: !multiple,
        radioConfig: treeRadioOpts,
        checkNodeKey: multiple ? null : modelValue,
        showCheckbox: !!multiple,
        checkNodeKeys: multiple ? modelValue : null,
        checkboxConfig: treeCheckboxOpts,
        titleField: labelField,
        valueField: valueField,
        keyField: nodeKeyField,
        childrenField: treeOpts.childrenField || childrenField,
        parentField: treeOpts.parentField || parentField,
        hasChildField: treeOpts.hasChildField || hasChildField,
        accordion: treeOpts.accordion,
        expandAll: treeOpts.expandAll,
        expandNodeKeys: treeOpts.expandNodeKeys,
        nodeConfig: treeNodeOpts,
        lazy: treeOpts.lazy,
        loadMethod: treeOpts.loadMethod,
        toggleMethod: treeOpts.toggleMethod,
        transform: treeOpts.transform,
        trigger: treeOpts.trigger,
        showIcon: treeOpts.showIcon,
        showLine: treeOpts.showLine,
        iconOpen: treeOpts.iconOpen,
        iconLoaded: treeOpts.iconLoaded,
        iconClose: treeOpts.iconClose,
        filterValue: searchValue,
        filterConfig: filterOpts,
        menuConfig: menuConfig ? menuOpts : undefined,
        virtualYConfig: virtualYOpts,
        onNodeExpand: nodeExpandEvent,
        onNodeClick: nodeClickEvent,
        onRadioChange: radioChangeEvent,
        onCheckboxChange: checkboxChangeEvent,
        onLoadSuccess: loadSuccessEvent
      }, treeScopedSlots)])]), footerSlot || showTotalButoon ? (0, _vue.h)('div', {
        class: 'vxe-tree-select--panel-footer'
      }, footerSlot ? footerSlot({}) : [(0, _vue.h)('div', {
        class: 'vxe-tree-select--footer-button'
      }, [showTotalButoon ? (0, _vue.h)('div', {
        class: 'vxe-tree-select--total-btns'
      }, (0, _ui.getI18n)('vxe.treeSelect.total', [selectVals.length])) : (0, _ui.renderEmptyElement)($xeTreeSelect)])]) : (0, _ui.renderEmptyElement)($xeTreeSelect)])] : [])])]);
    };
    (0, _vue.watch)(() => props.options, () => {
      cacheDataMap();
    });
    cacheDataMap();
    (0, _vue.onMounted)(() => {
      _ui.globalEvents.on($xeTreeSelect, 'mousewheel', handleGlobalMousewheelEvent);
      _ui.globalEvents.on($xeTreeSelect, 'mousedown', handleGlobalMousedownEvent);
      _ui.globalEvents.on($xeTreeSelect, 'blur', handleGlobalBlurEvent);
      _ui.globalEvents.on($xeTreeSelect, 'resize', handleGlobalResizeEvent);
    });
    (0, _vue.onBeforeUnmount)(() => {
      _ui.globalEvents.off($xeTreeSelect, 'mousewheel');
      _ui.globalEvents.off($xeTreeSelect, 'mousedown');
      _ui.globalEvents.off($xeTreeSelect, 'blur');
      _ui.globalEvents.off($xeTreeSelect, 'resize');
      _xeUtils.default.assign(reactData, createReactData());
      _xeUtils.default.assign(internalData, createInternalData());
    });
    (0, _vue.provide)('$xeTreeSelect', $xeTreeSelect);
    $xeTreeSelect.renderVN = renderVN;
    return $xeTreeSelect;
  },
  render() {
    return this.renderVN();
  }
});