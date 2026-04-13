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
var _utils = require("../../ui/src/utils");
var _vn = require("../../ui/src/vn");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeIconPicker',
  props: {
    modelValue: String,
    placeholder: String,
    clearable: Boolean,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().iconPicker.size || (0, _ui.getConfig)().size
    },
    className: [String, Function],
    /**
     * 已废弃，请使用 popupConfig.className
     * @deprecated
     */
    popupClassName: [String, Function],
    showIconTitle: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().iconPicker.showIconTitle
    },
    readonly: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    icons: Array,
    placement: String,
    popupConfig: Object,
    transfer: {
      type: Boolean,
      default: null
    }
  },
  emits: ['update:modelValue', 'change', 'clear', 'click'],
  setup(props, context) {
    const {
      emit
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
    const reactData = (0, _vue.reactive)({
      initialized: false,
      selectIcon: `${props.modelValue || ''}`,
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: null,
      visiblePanel: false,
      isAniVisible: false,
      isActivated: false
    });
    const internalData = {
      // hpTimeout: undefined
    };
    const refElem = (0, _vue.ref)();
    const refInput = (0, _vue.ref)();
    const refOptionPanel = (0, _vue.ref)();
    const refMaps = {
      refElem
    };
    const $xeIconPicker = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps
    };
    let iconPickerMethods = {};
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
        const globalTransfer = (0, _ui.getConfig)().iconPicker.transfer;
        if (_xeUtils.default.isBoolean(globalTransfer)) {
          return globalTransfer;
        }
        if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
          return true;
        }
      }
      return transfer;
    });
    const computeInpPlaceholder = (0, _vue.computed)(() => {
      const {
        placeholder
      } = props;
      if (placeholder) {
        return (0, _utils.getFuncText)(placeholder);
      }
      const globalPlaceholder = (0, _ui.getConfig)().select.placeholder;
      if (globalPlaceholder) {
        return (0, _utils.getFuncText)(globalPlaceholder);
      }
      return (0, _ui.getI18n)('vxe.base.pleaseSelect');
    });
    const computeIconList = (0, _vue.computed)(() => {
      let {
        icons
      } = props;
      if (!icons || !icons.length) {
        icons = (0, _ui.getConfig)().iconPicker.icons || [];
      }
      return icons.map(item => {
        if (_xeUtils.default.isString(item)) {
          return {
            title: item,
            icon: `vxe-icon-${`${item || ''}`.replace(/^vxe-icon-/, '')}`
          };
        }
        return {
          title: `${item.title || ''}`,
          icon: item.icon || '',
          iconRender: item.iconRender
        };
      });
    });
    const computePopupOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().iconPicker.popupConfig, props.popupConfig);
    });
    const computeIconGroupList = (0, _vue.computed)(() => {
      const iconList = computeIconList.value;
      return _xeUtils.default.chunk(iconList, 4);
    });
    const computeSelectIconItem = (0, _vue.computed)(() => {
      const {
        selectIcon
      } = reactData;
      const iconList = computeIconList.value;
      return selectIcon ? iconList.find(item => item.icon === selectIcon) : null;
    });
    const updateZindex = () => {
      if (reactData.panelIndex < (0, _utils.getLastZIndex)()) {
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
        hpTimeout
      } = internalData;
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        if (hpTimeout) {
          clearTimeout(hpTimeout);
          internalData.hpTimeout = undefined;
        }
        if (!reactData.initialized) {
          reactData.initialized = true;
        }
        reactData.isActivated = true;
        reactData.isAniVisible = true;
        setTimeout(() => {
          reactData.visiblePanel = true;
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
    const changeEvent = (evnt, selectValue) => {
      reactData.selectIcon = selectValue;
      if (selectValue !== props.modelValue) {
        emit('update:modelValue', selectValue);
        dispatchEvent('change', {
          value: selectValue
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, selectValue);
        }
      }
    };
    const focusEvent = () => {
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        if (!reactData.visiblePanel) {
          showOptionPanel();
        }
      }
    };
    const blurEvent = () => {
      reactData.isActivated = false;
    };
    const clearValueEvent = (evnt, selectValue) => {
      changeEvent(evnt, selectValue);
      dispatchEvent('clear', {
        value: selectValue
      }, evnt);
    };
    const clearEvent = (params, evnt) => {
      clearValueEvent(evnt, null);
      hideOptionPanel();
    };
    const togglePanelEvent = evnt => {
      evnt.preventDefault();
      if (reactData.visiblePanel) {
        hideOptionPanel();
      } else {
        showOptionPanel();
      }
    };
    const clickEvent = evnt => {
      togglePanelEvent(evnt);
      dispatchEvent('click', {}, evnt);
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
    const handleGlobalKeydownEvent = evnt => {
      const {
        clearable
      } = props;
      const {
        visiblePanel
      } = reactData;
      const isDisabled = computeIsDisabled.value;
      if (!isDisabled) {
        const isTab = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.TAB);
        const isEnter = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ENTER);
        const isEsc = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ESCAPE);
        const isUpArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_UP);
        const isDwArrow = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.ARROW_DOWN);
        const isDel = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.DELETE);
        const isSpacebar = _ui.globalEvents.hasKey(evnt, _ui.GLOBAL_EVENT_KEYS.SPACEBAR);
        if (isTab) {
          reactData.isActivated = false;
        }
        if (visiblePanel) {
          if (isEsc || isTab) {
            hideOptionPanel();
          } else if (isEnter) {
            evnt.preventDefault();
            evnt.stopPropagation();
            // changeOptionEvent(evnt, currentValue, currentOption)
          } else if (isUpArrow || isDwArrow) {
            evnt.preventDefault();
            // let { firstOption, offsetOption } = findOffsetOption(currentValue, isUpArrow)
            // if (!offsetOption && !findVisibleOption(currentValue)) {
            //   offsetOption = firstOption
            // }
            // setCurrentOption(offsetOption)
            // scrollToOption(offsetOption, isDwArrow)
          } else if (isSpacebar) {
            evnt.preventDefault();
          }
        } else if ((isUpArrow || isDwArrow || isEnter || isSpacebar) && reactData.isActivated) {
          evnt.preventDefault();
          showOptionPanel();
        }
        if (reactData.isActivated) {
          if (isDel && clearable) {
            clearValueEvent(evnt, null);
          }
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
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $iconPicker: $xeIconPicker
      }, params));
    };
    iconPickerMethods = {
      dispatchEvent,
      isPanelVisible() {
        return reactData.visiblePanel;
      },
      togglePanel() {
        if (reactData.visiblePanel) {
          hideOptionPanel();
        } else {
          showOptionPanel();
        }
        return (0, _vue.nextTick)();
      },
      hidePanel() {
        if (reactData.visiblePanel) {
          hideOptionPanel();
        }
        return (0, _vue.nextTick)();
      },
      showPanel() {
        if (!reactData.visiblePanel) {
          showOptionPanel();
        }
        return (0, _vue.nextTick)();
      },
      focus() {
        const $input = refInput.value;
        reactData.isActivated = true;
        if ($input) {
          $input.blur();
        }
        return (0, _vue.nextTick)();
      },
      blur() {
        const $input = refInput.value;
        if ($input) {
          $input.blur();
        }
        reactData.isActivated = false;
        return (0, _vue.nextTick)();
      }
    };
    const handleClickIconEvent = (evnt, item) => {
      const value = item.icon;
      changeEvent(evnt, value);
      hideOptionPanel();
    };
    Object.assign($xeIconPicker, iconPickerMethods);
    const renderIconWrapper = () => {
      const {
        showIconTitle
      } = props;
      const {
        selectIcon
      } = reactData;
      const iconGroupList = computeIconGroupList.value;
      const isDisabled = computeIsDisabled.value;
      return (0, _vue.h)('div', {
        class: 'vxe-ico-picker--list-wrapper'
      }, iconGroupList.map(list => {
        return (0, _vue.h)('div', {
          class: 'vxe-ico-picker--list'
        }, list.map(item => {
          const {
            iconRender
          } = item;
          const compConf = iconRender ? _ui.renderer.get(iconRender.name) : null;
          const oIconMethod = compConf ? compConf.renderIconPickerOptionIcon : null;
          return (0, _vue.h)('div', {
            class: ['vxe-ico-picker--item', {
              'is--selected': selectIcon === item.icon
            }],
            onClick(evnt) {
              if (!isDisabled) {
                handleClickIconEvent(evnt, item);
              }
            }
          }, [(0, _vue.h)('div', {
            class: 'vxe-ico-picker--item-icon'
          }, oIconMethod && iconRender ? (0, _vn.getSlotVNs)(oIconMethod(iconRender, {
            $iconPicker: $xeIconPicker,
            option: item
          })) : [(0, _vue.h)('i', {
            class: item.icon || ''
          })]), showIconTitle ? (0, _vue.h)('div', {
            class: 'vxe-ico-picker--item-title'
          }, `${item.title || ''}`) : (0, _ui.renderEmptyElement)($xeIconPicker)]);
        }));
      }));
    };
    const renderIconView = () => {
      const {
        selectIcon
      } = reactData;
      const selectIconItem = computeSelectIconItem.value;
      if (selectIconItem) {
        const {
          iconRender
        } = selectIconItem;
        const compConf = iconRender ? _ui.renderer.get(iconRender.name) : null;
        const oIconMethod = compConf ? compConf.renderIconPickerOptionIcon : null;
        if (oIconMethod && iconRender) {
          return (0, _vue.h)('div', {
            key: 'inc',
            class: 'vxe-ico-picker--icon'
          }, (0, _vn.getSlotVNs)(oIconMethod(iconRender, {
            $iconPicker: $xeIconPicker,
            option: selectIconItem
          })));
        }
      }
      return (0, _vue.h)('div', {
        key: 'ind',
        class: 'vxe-ico-picker--icon'
      }, [(0, _vue.h)('i', {
        class: selectIcon
      })]);
    };
    const renderVN = () => {
      const {
        className,
        clearable
      } = props;
      const {
        initialized,
        isActivated,
        isAniVisible,
        visiblePanel,
        selectIcon
      } = reactData;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const btnTransfer = computeBtnTransfer.value;
      const formReadonly = computeFormReadonly.value;
      const inpPlaceholder = computeInpPlaceholder.value;
      const popupOpts = computePopupOpts.value;
      const ppClassName = popupOpts.className || props.popupClassName;
      if (formReadonly) {
        return (0, _vue.h)('div', {
          ref: refElem,
          class: ['vxe-ico-picker--readonly', className]
        }, [(0, _vue.h)('i', {
          class: selectIcon
        })]);
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-ico-picker', className ? _xeUtils.default.isFunction(className) ? className({
          $iconPicker: $xeIconPicker
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'show--clear': clearable && !isDisabled && !!selectIcon,
          'is--visible': visiblePanel,
          'is--disabled': isDisabled,
          'is--active': isActivated
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-ico-picker--inner',
        onClick: clickEvent
      }, [(0, _vue.h)('input', {
        ref: refInput,
        class: 'vxe-ico-picker--input',
        onFocus: focusEvent,
        onBlur: blurEvent
      }), selectIcon ? renderIconView() : (0, _vue.h)('div', {
        class: 'vxe-ico-picker--placeholder'
      }, inpPlaceholder), (0, _vue.h)('div', {
        class: 'vxe-ico-picker--suffix'
      }, [(0, _vue.h)('div', {
        class: 'vxe-ico-picker--clear-icon',
        onClick: clearEvent
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().INPUT_CLEAR
      })]), (0, _vue.h)('div', {
        class: 'vxe-ico-picker--suffix-icon'
      }, [(0, _vue.h)('i', {
        class: visiblePanel ? (0, _ui.getIcon)().ICON_PICKER_OPEN : (0, _ui.getIcon)().ICON_PICKER_CLOSE
      })])])]), (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: btnTransfer ? !initialized : true
      }, [(0, _vue.h)('div', {
        ref: refOptionPanel,
        class: ['vxe-table--ignore-clear vxe-ico-picker--panel', ppClassName ? _xeUtils.default.isFunction(ppClassName) ? ppClassName({
          $iconPicker: $xeIconPicker
        }) : ppClassName : '', {
          [`size--${vSize}`]: vSize,
          'is--transfer': btnTransfer,
          'ani--leave': isAniVisible,
          'ani--enter': visiblePanel
        }],
        placement: reactData.panelPlacement,
        style: reactData.panelStyle
      }, [initialized && (visiblePanel || isAniVisible) ? (0, _vue.h)('div', {
        class: 'vxe-ico-picker--panel-wrapper'
      }, [renderIconWrapper()]) : (0, _ui.renderEmptyElement)($xeIconPicker)])])]);
    };
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.selectIcon = `${val || ''}`;
    });
    (0, _vue.onMounted)(() => {
      _ui.globalEvents.on($xeIconPicker, 'mousewheel', handleGlobalMousewheelEvent);
      _ui.globalEvents.on($xeIconPicker, 'mousedown', handleGlobalMousedownEvent);
      _ui.globalEvents.on($xeIconPicker, 'keydown', handleGlobalKeydownEvent);
      _ui.globalEvents.on($xeIconPicker, 'blur', handleGlobalBlurEvent);
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeIconPicker, 'mousewheel');
      _ui.globalEvents.off($xeIconPicker, 'mousedown');
      _ui.globalEvents.off($xeIconPicker, 'keydown');
      _ui.globalEvents.off($xeIconPicker, 'blur');
    });
    (0, _vue.provide)('$xeIconPicker', $xeIconPicker);
    $xeIconPicker.renderVN = renderVN;
    return $xeIconPicker;
  },
  render() {
    return this.renderVN();
  }
});