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
var _util = require("./util");
var _button = _interopRequireDefault(require("../../button/src/button"));
var _input = _interopRequireDefault(require("../../input/src/input"));
var _numberInput = _interopRequireDefault(require("../../number-input/src/number-input"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeColorPicker',
  props: {
    modelValue: String,
    placeholder: String,
    clearable: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().colorPicker.clearable
    },
    type: {
      type: String,
      default: () => (0, _ui.getConfig)().colorPicker.type
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().colorPicker.size || (0, _ui.getConfig)().size
    },
    className: [String, Function],
    popupClassName: [String, Function],
    colors: {
      type: Array,
      default: () => _xeUtils.default.clone((0, _ui.getConfig)().colorPicker.colors, true) || []
    },
    showAlpha: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().colorPicker.showAlpha
    },
    showEyeDropper: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().colorPicker.showEyeDropper
    },
    showColorExtractor: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().colorPicker.showColorExtractor
    },
    showQuick: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().colorPicker.showQuick
    },
    readonly: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    clickToCopy: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().colorPicker.clickToCopy
    },
    placement: String,
    transfer: {
      type: Boolean,
      default: null
    },
    popupConfig: Object
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
    const WinEyeDropper = typeof window !== 'undefined' ? window.EyeDropper : null;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refInputTarget = (0, _vue.ref)();
    const refOptionPanel = (0, _vue.ref)();
    const refHueSliderElem = (0, _vue.ref)();
    const refHueSliderBtnElem = (0, _vue.ref)();
    const refAlphaSliderElem = (0, _vue.ref)();
    const refAlphaSliderBtnElem = (0, _vue.ref)();
    const refColorPanelElem = (0, _vue.ref)();
    const refColorActiveElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      initialized: false,
      selectTyle: 'hex',
      selectColor: `${props.modelValue || ''}`,
      showTypePopup: false,
      panelColor: '',
      hexValue: '',
      rValue: 0,
      gValue: 0,
      bValue: 0,
      aValue: 0,
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: null,
      visiblePanel: false,
      isAniVisible: false,
      isActivated: false
    });
    const typeList = [{
      label: 'HEX',
      value: 'hex'
    }, {
      label: 'RGB',
      value: 'rgb'
    }];
    const internalData = {
      // hpTimeout: undefined
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
        const globalTransfer = (0, _ui.getConfig)().colorPicker.transfer;
        if (_xeUtils.default.isBoolean(globalTransfer)) {
          return globalTransfer;
        }
        if ($xeTable || $xeModal || $xeDrawer || $xeForm) {
          return true;
        }
      }
      return transfer;
    });
    const computeColorList = (0, _vue.computed)(() => {
      const {
        colors
      } = props;
      if (colors) {
        return colors.map(item => {
          if (_xeUtils.default.isString(item)) {
            return {
              label: item,
              value: item
            };
          }
          return {
            label: _xeUtils.default.eqNull(item.label) ? item.value : item.label,
            value: item.value
          };
        });
      }
      return [];
    });
    const computePopupOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().colorPicker.popupConfig, props.popupConfig);
    });
    const computeIsRgb = (0, _vue.computed)(() => {
      const {
        selectTyle
      } = reactData;
      return selectTyle === 'rgb';
    });
    const computeSelectTypeItem = (0, _vue.computed)(() => {
      const {
        selectTyle
      } = reactData;
      return typeList.find(item => item.value === selectTyle);
    });
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeColorPicker = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const emitModel = value => {
      emit('update:modelValue', value);
    };
    const updateMode = () => {
      const {
        modelValue
      } = props;
      reactData.selectColor = _xeUtils.default.toValueString(modelValue);
      updateModelColor();
    };
    const updateType = () => {
      const {
        type
      } = props;
      let selectTyle = 'hex';
      if (type === 'rgb' || type === 'rgba') {
        selectTyle = 'rgb';
      }
      reactData.selectTyle = selectTyle;
      updateMode();
    };
    const updateModelColor = () => {
      const {
        selectColor,
        isAniVisible
      } = reactData;
      const isRgb = computeIsRgb.value;
      const hueSliderEl = refHueSliderElem.value;
      const alphaSliderEl = refAlphaSliderElem.value;
      const colorRest = (0, _util.parseColor)(selectColor);
      reactData.hexValue = colorRest.hex;
      reactData.rValue = colorRest.r;
      reactData.gValue = colorRest.g;
      reactData.bValue = colorRest.b;
      reactData.aValue = colorRest.a;
      if (colorRest.value) {
        if (isRgb) {
          if (colorRest.type === 'hex') {
            const rgbRest = (0, _util.hexToRgb)(colorRest.hex);
            if (rgbRest) {
              reactData.rValue = rgbRest.r;
              reactData.gValue = rgbRest.g;
              reactData.bValue = rgbRest.b;
              reactData.aValue = rgbRest.a;
            }
          }
        } else {
          if (colorRest.type !== 'hex') {
            reactData.hexValue = (0, _util.rgbToHex)(colorRest);
          }
        }
      }
      if (isAniVisible) {
        const hsvRest = colorRest.type === 'hex' ? (0, _util.hexToHsv)(colorRest.hex) : (0, _util.rgbToHsv)(colorRest);
        const colorPanelEl = refColorPanelElem.value;
        if (hsvRest) {
          if (colorPanelEl) {
            const offsetTop = colorPanelEl.clientHeight * (1 - hsvRest.v);
            const offsetLeft = colorPanelEl.clientWidth * hsvRest.s;
            handlePanelColor(offsetLeft, offsetTop);
          }
          if (hueSliderEl) {
            handleHueColor(_xeUtils.default.ceil((1 - hsvRest.h / 360) * hueSliderEl.clientWidth));
          }
        }
        if (alphaSliderEl) {
          handleAlphaColor(alphaSliderEl.clientWidth * colorRest.a);
        }
      }
    };
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
          updateModelColor();
          reactData.visiblePanel = true;
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
    const changeEvent = (evnt, value) => {
      reactData.selectColor = value;
      if (value !== props.modelValue) {
        emitModel(value);
        dispatchEvent('change', {
          value
        }, evnt);
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
        }
      }
    };
    const clearValueEvent = (evnt, selectValue) => {
      changeEvent(evnt, selectValue);
      dispatchEvent('clear', {
        value: selectValue
      }, evnt);
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
    const clearEvent = evnt => {
      clearValueEvent(evnt, null);
      hideOptionPanel();
    };
    const confirmEvent = evnt => {
      const {
        selectColor
      } = reactData;
      changeEvent(evnt, selectColor);
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
    const handlePanelClickEvent = () => {
      reactData.showTypePopup = false;
    };
    const toggleTypeVisibleEvent = evnt => {
      evnt.stopPropagation();
      reactData.showTypePopup = !reactData.showTypePopup;
    };
    const handleChangeType = type => {
      const {
        selectTyle
      } = reactData;
      if (type !== selectTyle) {
        reactData.selectTyle = type;
        updateModelColor();
      }
      reactData.showTypePopup = false;
    };
    const handleHueColor = offsetLeft => {
      const hueSliderEl = refHueSliderElem.value;
      const hueSliderBtnEl = refHueSliderBtnElem.value;
      if (hueSliderEl && hueSliderBtnEl) {
        if (offsetLeft < 0) {
          offsetLeft = 0;
        }
        const barWidth = _xeUtils.default.toInteger(hueSliderEl.clientWidth);
        const itemNum = 255;
        const countNum = itemNum * 6;
        const offsetX = _xeUtils.default.ceil(countNum / barWidth * offsetLeft);
        const offsetNum = offsetX % itemNum;
        let rNum = 0;
        let gNum = 0;
        let bNum = 0;
        switch (Math.ceil(offsetX / itemNum)) {
          case 1:
            rNum = itemNum;
            bNum = offsetNum;
            break;
          case 2:
            rNum = itemNum - offsetNum;
            bNum = itemNum;
            break;
          case 3:
            gNum = offsetNum;
            bNum = itemNum;
            break;
          case 4:
            gNum = itemNum;
            bNum = itemNum - offsetNum;
            break;
          case 5:
            rNum = offsetNum;
            gNum = itemNum;
            break;
          case 6:
            rNum = itemNum;
            gNum = itemNum - offsetNum;
            break;
        }
        reactData.panelColor = (0, _util.toRgb)(rNum, gNum, bNum);
        hueSliderBtnEl.style.left = (0, _dom.toCssUnit)(offsetLeft);
      }
    };
    const handleHueBarEvent = evnt => {
      const hueSliderEl = refHueSliderElem.value;
      const hueSliderBtnEl = refHueSliderBtnElem.value;
      if (hueSliderEl && hueSliderBtnEl) {
        const hueSliderRect = hueSliderEl.getBoundingClientRect();
        const barWidth = _xeUtils.default.toInteger(hueSliderEl.clientWidth);
        const offsetLeft = _xeUtils.default.ceil(Math.min(barWidth - 1, Math.max(1, evnt.clientX - hueSliderRect.x)));
        handleHueColor(offsetLeft);
      }
    };
    const handleHueSliderMousedownEvent = evnt => {
      evnt.preventDefault();
      document.onmousemove = evnt => {
        evnt.preventDefault();
        handleHueBarEvent(evnt);
      };
      document.onmouseup = evnt => {
        document.onmousemove = null;
        document.onmouseup = null;
        handleHueBarEvent(evnt);
      };
    };
    const handleAlphaColor = offsetLeft => {
      const {
        selectColor
      } = reactData;
      const alphaSliderEl = refAlphaSliderElem.value;
      const alphaSliderBtnEl = refAlphaSliderBtnElem.value;
      if (alphaSliderEl && alphaSliderBtnEl) {
        const alphaSliderRect = alphaSliderEl.getBoundingClientRect();
        const barWidth = alphaSliderRect.width;
        if (offsetLeft < 0) {
          offsetLeft = 0;
        }
        if (offsetLeft > barWidth) {
          offsetLeft = barWidth;
        }
        const alpha = _xeUtils.default.ceil(100 / barWidth * offsetLeft / 100, 2);
        reactData.aValue = alpha;
        alphaSliderBtnEl.style.left = (0, _dom.toCssUnit)(offsetLeft);
        reactData.selectColor = (0, _util.updateColorAlpha)(selectColor, alpha);
      }
    };
    const handleAlphaBarEvent = evnt => {
      const alphaSliderEl = refAlphaSliderElem.value;
      const alphaSliderBtnEl = refAlphaSliderBtnElem.value;
      if (alphaSliderEl && alphaSliderBtnEl) {
        const alphaSliderRect = alphaSliderEl.getBoundingClientRect();
        const barWidth = alphaSliderRect.width;
        const offsetLeft = Math.min(barWidth, Math.max(0, evnt.clientX - alphaSliderRect.x));
        handleAlphaColor(offsetLeft);
        updateModelColor();
      }
    };
    const handleAlphaSliderMousedownEvent = evnt => {
      evnt.preventDefault();
      document.onmousemove = evnt => {
        evnt.preventDefault();
        handleAlphaBarEvent(evnt);
      };
      document.onmouseup = evnt => {
        document.onmousemove = null;
        document.onmouseup = null;
        handleAlphaBarEvent(evnt);
      };
    };
    const handleInputRgbEvent = () => {
      const {
        rValue,
        gValue,
        bValue,
        aValue
      } = reactData;
      reactData.selectColor = (0, _util.toRgb)(rValue, gValue, bValue, aValue);
      updateModelColor();
    };
    const handleInputAlphaEvent = () => {
      const {
        aValue
      } = reactData;
      const alphaSliderEl = refAlphaSliderElem.value;
      const alphaSliderBtnEl = refAlphaSliderBtnElem.value;
      if (alphaSliderEl && alphaSliderBtnEl) {
        const alphaSliderRect = alphaSliderEl.getBoundingClientRect();
        const barWidth = alphaSliderRect.width;
        const offsetLeft = barWidth * aValue;
        handleAlphaColor(offsetLeft);
      }
    };
    const handleQuickEvent = (evnt, item) => {
      const value = item.value;
      reactData.selectColor = value;
      updateModelColor();
    };
    const handlePanelColor = (offsetLeft, offsetTop) => {
      const colorActiveEl = refColorActiveElem.value;
      if (colorActiveEl) {
        colorActiveEl.style.top = (0, _dom.toCssUnit)(offsetTop);
        colorActiveEl.style.left = (0, _dom.toCssUnit)(offsetLeft);
      }
    };
    const handleEyeDropperEvent = () => {
      if (WinEyeDropper) {
        try {
          const eyeDropper = new WinEyeDropper();
          eyeDropper.open().then(rest => {
            if (rest && rest.sRGBHex) {
              reactData.selectColor = rest.sRGBHex;
              updateModelColor();
            }
          }).catch(() => {});
        } catch (e) {}
      }
    };
    const handleSelectColorByXY = (clientX, clientY) => {
      const {
        showAlpha
      } = props;
      const {
        panelColor,
        aValue
      } = reactData;
      const colorPanelEl = refColorPanelElem.value;
      const colorActiveEl = refColorActiveElem.value;
      if (colorPanelEl && colorActiveEl) {
        const {
          clientWidth,
          clientHeight
        } = colorPanelEl;
        const colorPanelRect = colorPanelEl.getBoundingClientRect();
        const offsetTop = Math.min(clientHeight, Math.max(0, clientY - colorPanelRect.y));
        const offsetLeft = Math.min(clientWidth, Math.max(0, clientX - colorPanelRect.x));
        const colorRest = (0, _util.parseColor)(panelColor);
        if (colorRest) {
          const hsvRest = colorRest.type === 'hex' ? (0, _util.hexToHsv)(colorRest.hex) : (0, _util.rgbToHsv)(colorRest);
          if (hsvRest) {
            const ragRest = (0, _util.hsvToRgb)(hsvRest.h, offsetLeft / clientWidth, 1 - offsetTop / clientHeight);
            reactData.selectColor = (0, _util.toRgb)(ragRest.r, ragRest.g, ragRest.b, showAlpha ? aValue : null);
            updateModelColor();
          }
        }
        handlePanelColor(offsetLeft, offsetTop);
      }
    };
    const handleSelectColorMousedownEvent = evnt => {
      evnt.stopPropagation();
      evnt.preventDefault();
      handleSelectColorByXY(evnt.clientX, evnt.clientY);
      document.onmousemove = evnt => {
        handleSelectColorByXY(evnt.clientX, evnt.clientY);
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
    const handleCopyColorEvent = () => {
      const {
        selectColor
      } = reactData;
      if (selectColor) {
        if (_ui.VxeUI.clipboard.copy(selectColor)) {
          if (_ui.VxeUI.modal) {
            _ui.VxeUI.modal.message({
              content: (0, _ui.getI18n)('vxe.colorPicker.copySuccess', [selectColor]),
              status: 'success'
            });
          }
        }
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
        const targetElem = refInputTarget.value;
        if (targetElem) {
          targetElem.blur();
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
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $colorPicker: $xeColorPicker
      }, params));
    };
    const colorPickerMethods = {
      dispatchEvent
    };
    const colorPickerPrivateMethods = {};
    Object.assign($xeColorPicker, colorPickerMethods, colorPickerPrivateMethods);
    const renderColorWrapper = () => {
      const {
        showColorExtractor
      } = props;
      const {
        panelColor
      } = reactData;
      if (showColorExtractor) {
        return (0, _vue.h)('div', {
          ref: refColorPanelElem,
          class: 'vxe-color-picker--color-wrapper',
          onMousedown: handleSelectColorMousedownEvent
        }, [(0, _vue.h)('div', {
          class: 'vxe-color-picker--color-bg',
          style: {
            backgroundColor: panelColor
          }
        }), (0, _vue.h)('div', {
          class: 'vxe-color-picker--white-bg'
        }), (0, _vue.h)('div', {
          class: 'vxe-color-picker--black-bg'
        }), (0, _vue.h)('div', {
          ref: refColorActiveElem,
          class: 'vxe-color-picker--color-active'
        })]);
      }
      return (0, _ui.renderEmptyElement)($xeColorPicker);
    };
    const renderColorBar = () => {
      const {
        showAlpha,
        clickToCopy,
        showEyeDropper
      } = props;
      const {
        selectTyle,
        showTypePopup,
        hexValue,
        rValue,
        gValue,
        bValue,
        aValue,
        selectColor,
        panelColor
      } = reactData;
      const isRgb = computeIsRgb.value;
      const selectTypeItem = computeSelectTypeItem.value;
      return (0, _vue.h)('div', {
        class: 'vxe-color-picker--bar-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-color-picker--slider-wrapper'
      }, [showEyeDropper && WinEyeDropper ? (0, _vue.h)('div', {
        class: 'vxe-color-picker--color-dropper'
      }, [(0, _vue.h)('span', {
        class: 'vxe-color-picker--color-dropper-btn',
        onClick: handleEyeDropperEvent
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().COLOR_PICKER_EYE_DROPPER
      })])]) : (0, _ui.renderEmptyElement)($xeColorPicker), (0, _vue.h)('div', {
        class: 'vxe-color-picker--slider-preview'
      }, [(0, _vue.h)('div', {
        class: 'vxe-color-picker--preview-btn'
      }, [(0, _vue.h)('div', {
        class: 'vxe-color-picker--preview-color',
        style: {
          backgroundColor: selectColor
        }
      }, clickToCopy ? [(0, _vue.h)('span', {
        class: 'vxe-color-picker--preview-copy-btn',
        onClick: handleCopyColorEvent
      }, [(0, _vue.h)('i', {
        class: (0, _ui.getIcon)().COLOR_PICKER_COLOR_COPY
      })])] : [])])]), (0, _vue.h)('div', {
        class: 'vxe-color-picker--slider-handle'
      }, [(0, _vue.h)('div', {
        ref: refHueSliderElem,
        class: 'vxe-color-picker--bar-hue-slider',
        onClick: handleHueBarEvent
      }, [(0, _vue.h)('div', {
        ref: refHueSliderBtnElem,
        class: 'vxe-color-picker--bar-hue-btn',
        onMousedown: handleHueSliderMousedownEvent
      })]), showAlpha ? (0, _vue.h)('div', {
        ref: refAlphaSliderElem,
        class: 'vxe-color-picker--bar-alpha-slider',
        onClick: handleAlphaBarEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-color-picker--bar-alpha-bg',
        style: {
          background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${panelColor})`
        }
      }), (0, _vue.h)('div', {
        ref: refAlphaSliderBtnElem,
        class: 'vxe-color-picker--bar-alpha-btn',
        onMousedown: handleAlphaSliderMousedownEvent
      })]) : (0, _ui.renderEmptyElement)($xeColorPicker)])]), (0, _vue.h)('div', {
        class: 'vxe-color-picker--custom-wrapper'
      }, [(0, _vue.h)('div', {
        class: 'vxe-color-picker--type-switch'
      }, [(0, _vue.h)('div', {
        class: 'vxe-color-picker--type-label',
        onClick: toggleTypeVisibleEvent
      }, [(0, _vue.h)('span', `${selectTypeItem ? selectTypeItem.label : selectTyle}`), (0, _vue.h)('span', {
        class: 'vxe-color-picker--type-icon'
      }, [(0, _vue.h)('i', {
        class: showTypePopup ? (0, _ui.getIcon)().COLOR_PICKER_TPTY_OPEN : (0, _ui.getIcon)().COLOR_PICKER_TPTY_CLOSE
      })])]), (0, _vue.h)('div', {
        class: ['vxe-color-picker--type-popup', {
          'is--visible': showTypePopup
        }]
      }, typeList.map(item => {
        return (0, _vue.h)('div', {
          class: 'vxe-color-picker--type-item',
          onClick(evnt) {
            evnt.stopPropagation();
            handleChangeType(item.value);
          }
        }, item.label);
      }))]), (0, _vue.h)('div', {
        class: `vxe-color-picker--${selectTyle}-wrapper`
      }, isRgb ? [(0, _vue.h)('div', {
        class: 'vxe-color-picker--input-wrapper'
      }, [(0, _vue.h)(_numberInput.default, {
        type: 'integer',
        size: 'mini',
        align: 'center',
        min: 0,
        max: 255,
        maxLength: 3,
        placeholder: '',
        modelValue: rValue,
        controlConfig: {
          showButton: false
        },
        'onUpdate:modelValue'(val) {
          reactData.rValue = val;
        },
        onChange: handleInputRgbEvent
      }), (0, _vue.h)(_numberInput.default, {
        type: 'integer',
        size: 'mini',
        align: 'center',
        min: 0,
        max: 255,
        maxLength: 3,
        placeholder: '',
        modelValue: gValue,
        controlConfig: {
          showButton: false
        },
        'onUpdate:modelValue'(val) {
          reactData.gValue = val;
        },
        onChange: handleInputRgbEvent
      }), (0, _vue.h)(_numberInput.default, {
        type: 'integer',
        size: 'mini',
        align: 'center',
        min: 0,
        max: 255,
        maxLength: 3,
        placeholder: '',
        modelValue: bValue,
        controlConfig: {
          showButton: false
        },
        'onUpdate:modelValue'(val) {
          reactData.bValue = val;
        },
        onChange: handleInputRgbEvent
      }), (0, _vue.h)(_numberInput.default, {
        type: 'number',
        size: 'mini',
        align: 'center',
        min: 0,
        max: 1,
        step: 0.01,
        maxLength: 4,
        placeholder: '',
        modelValue: aValue,
        controlConfig: {
          showButton: false
        },
        'onUpdate:modelValue'(val) {
          reactData.aValue = val;
        },
        onChange: handleInputAlphaEvent
      })]), (0, _vue.h)('div', {
        class: 'vxe-color-picker--input-title'
      }, [(0, _vue.h)('span', 'R'), (0, _vue.h)('span', 'G'), (0, _vue.h)('span', 'B'), (0, _vue.h)('span', 'A')])] : [(0, _vue.h)('div', {
        class: 'vxe-color-picker--input-wrapper'
      }, [(0, _vue.h)(_input.default, {
        type: 'text',
        size: 'mini',
        align: 'center',
        maxLength: 9,
        placeholder: '',
        modelValue: hexValue,
        'onUpdate:modelValue'(val) {
          reactData.hexValue = val;
        },
        onChange() {
          const colorRest = (0, _util.parseColor)(reactData.hexValue);
          if (colorRest) {
            if (colorRest.value) {
              reactData.selectColor = colorRest.value;
              updateModelColor();
            }
          }
        }
      })]), (0, _vue.h)('div', {
        class: 'vxe-color-picker--input-title'
      }, (0, _ui.getI18n)('vxe.colorPicker.hex'))])])]);
    };
    const renderQuickWrapper = () => {
      const {
        showQuick
      } = props;
      const colorList = computeColorList.value;
      if (showQuick && colorList.length) {
        return (0, _vue.h)('div', {
          class: 'vxe-color-picker--quick-wrapper'
        }, colorList.map((item, i) => {
          return (0, _vue.h)('div', {
            key: i,
            class: 'vxe-color-picker--quick-item',
            title: item.label || '',
            style: {
              backgroundColor: item.value
            },
            onClick(evnt) {
              handleQuickEvent(evnt, item);
            }
          });
        }));
      }
      return (0, _ui.renderEmptyElement)($xeColorPicker);
    };
    const renderVN = () => {
      const {
        className,
        popupClassName,
        clearable,
        modelValue
      } = props;
      const {
        initialized,
        isActivated,
        isAniVisible,
        visiblePanel
      } = reactData;
      const vSize = computeSize.value;
      const isDisabled = computeIsDisabled.value;
      const btnTransfer = computeBtnTransfer.value;
      const formReadonly = computeFormReadonly.value;
      if (formReadonly) {
        return (0, _vue.h)('div', {
          ref: refElem,
          class: ['vxe-color-picker--readonly', className]
        }, [(0, _vue.h)('div', {
          class: 'vxe-color-picker--readonly-color',
          style: {
            backgroundColor: modelValue
          }
        })]);
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-color-picker', className ? _xeUtils.default.isFunction(className) ? className({
          $colorPicker: $xeColorPicker
        }) : className : '', {
          [`size--${vSize}`]: vSize,
          'is--selected': !!modelValue,
          'is--visible': visiblePanel,
          'is--disabled': isDisabled,
          'is--active': isActivated
        }]
      }, [(0, _vue.h)('input', {
        ref: refInputTarget,
        class: 'vxe-color-picker--input',
        onFocus: focusEvent,
        onBlur: blurEvent
      }), (0, _vue.h)('div', {
        class: 'vxe-color-picker--inner',
        onClick: clickEvent
      }, [(0, _vue.h)('div', {
        class: 'vxe-color-picker--inner-color',
        style: {
          backgroundColor: modelValue
        }
      })]), (0, _vue.h)(_vue.Teleport, {
        to: 'body',
        disabled: btnTransfer ? !initialized : true
      }, [(0, _vue.h)('div', {
        ref: refOptionPanel,
        class: ['vxe-table--ignore-clear vxe-color-picker--panel', popupClassName ? _xeUtils.default.isFunction(popupClassName) ? popupClassName({
          $colorPicker: $xeColorPicker
        }) : popupClassName : '', {
          [`size--${vSize}`]: vSize,
          'is--transfer': btnTransfer,
          'ani--leave': isAniVisible,
          'ani--enter': visiblePanel
        }],
        placement: reactData.panelPlacement,
        style: reactData.panelStyle
      }, [initialized && (visiblePanel || isAniVisible) ? (0, _vue.h)('div', {
        class: 'vxe-color-picker--panel-wrapper',
        onClick: handlePanelClickEvent
      }, [renderColorWrapper(), renderColorBar(), renderQuickWrapper(), (0, _vue.h)('div', {
        class: 'vxe-color-picker--footer-wrapper'
      }, [clearable ? (0, _vue.h)(_button.default, {
        content: (0, _ui.getI18n)('vxe.colorPicker.clear'),
        size: 'mini',
        onClick: clearEvent
      }) : (0, _ui.renderEmptyElement)($xeColorPicker), (0, _vue.h)(_button.default, {
        content: (0, _ui.getI18n)('vxe.colorPicker.confirm'),
        size: 'mini',
        status: 'primary',
        onClick: confirmEvent
      })])]) : (0, _ui.renderEmptyElement)($xeColorPicker)])])]);
    };
    (0, _vue.watch)(() => props.modelValue, () => {
      updateMode();
    });
    (0, _vue.watch)(() => props.type, () => {
      updateType();
    });
    (0, _vue.onMounted)(() => {
      _ui.globalEvents.on($xeColorPicker, 'mousewheel', handleGlobalMousewheelEvent);
      _ui.globalEvents.on($xeColorPicker, 'mousedown', handleGlobalMousedownEvent);
      _ui.globalEvents.on($xeColorPicker, 'blur', handleGlobalBlurEvent);
      _ui.globalEvents.on($xeColorPicker, 'resize', handleGlobalResizeEvent);
    });
    (0, _vue.onUnmounted)(() => {
      _ui.globalEvents.off($xeColorPicker, 'mousewheel');
      _ui.globalEvents.off($xeColorPicker, 'mousedown');
      _ui.globalEvents.off($xeColorPicker, 'blur');
      _ui.globalEvents.off($xeColorPicker, 'resize');
    });
    updateType();
    (0, _vue.provide)('$xeColorPicker', $xeColorPicker);
    $xeColorPicker.renderVN = renderVN;
    return $xeColorPicker;
  },
  render() {
    return this.renderVN();
  }
});