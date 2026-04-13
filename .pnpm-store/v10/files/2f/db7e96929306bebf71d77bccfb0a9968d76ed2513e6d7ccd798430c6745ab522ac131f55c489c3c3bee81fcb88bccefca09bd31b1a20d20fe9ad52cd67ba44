"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeSlider',
  props: {
    modelValue: [String, Number, Array],
    vertical: Boolean,
    max: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().slider.max
    },
    min: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().slider.min
    },
    step: {
      type: [String, Number],
      default: () => (0, _ui.getConfig)().slider.step
    },
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().slider.size || (0, _ui.getConfig)().size
    },
    range: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().slider.range
    },
    readonly: {
      type: Boolean,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    }
  },
  emits: ['update:modelValue', 'change', 'track-dragstart', 'track-dragover', 'track-dragend'],
  setup(props, context) {
    const {
      emit
    } = context;
    const $xeForm = (0, _vue.inject)('$xeForm', null);
    const formItemInfo = (0, _vue.inject)('xeFormItemInfo', null);
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const refBarElem = (0, _vue.ref)();
    const refTrackElem = (0, _vue.ref)();
    const refStartBtnElem = (0, _vue.ref)();
    const refEndBtnElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      startValue: 0,
      endValue: 0
    });
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
    const computeMaxNum = (0, _vue.computed)(() => {
      return _xeUtils.default.toNumber(props.max || 0);
    });
    const computeMinNum = (0, _vue.computed)(() => {
      return _xeUtils.default.toNumber(props.min || 0);
    });
    const computeMaps = {};
    const $xeSlider = {
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
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $slider: $xeSlider
      }, params));
    };
    const collapsePaneMethods = {
      dispatchEvent
    };
    const getStartPercent = startValue => {
      const {
        range
      } = props;
      const maxNum = computeMaxNum.value;
      const minNum = computeMinNum.value;
      return range ? _xeUtils.default.floor((startValue - minNum) / _xeUtils.default.toNumber(maxNum - minNum) * 100) : 0;
    };
    const getEndPercent = (startValue, endValue) => {
      const {
        range
      } = props;
      const maxNum = computeMaxNum.value;
      const minNum = computeMinNum.value;
      return _xeUtils.default.floor((endValue - (range ? startValue : 0) - minNum) / _xeUtils.default.toNumber(maxNum - minNum) * 100);
    };
    const updateModel = () => {
      const {
        modelValue
      } = props;
      if (_xeUtils.default.isArray(modelValue)) {
        const [sVal, eVal] = _xeUtils.default.clone(modelValue, true).sort();
        reactData.startValue = _xeUtils.default.floor(_xeUtils.default.toNumber(sVal || 0));
        reactData.endValue = _xeUtils.default.floor(_xeUtils.default.toNumber(eVal || 0));
      } else {
        reactData.startValue = 0;
        reactData.endValue = _xeUtils.default.floor(_xeUtils.default.toNumber(modelValue || 0));
      }
    };
    const updateBarStyle = () => {
      const {
        startValue,
        endValue
      } = reactData;
      const trackElem = refTrackElem.value;
      const startBtnElem = refStartBtnElem.value;
      const endBtnElem = refEndBtnElem.value;
      let startPercent = 0;
      let endPercent = 0;
      if (startValue > endValue) {
        startPercent = getStartPercent(endValue);
        endPercent = getEndPercent(endValue, startValue);
      } else {
        startPercent = getStartPercent(startValue);
        endPercent = getEndPercent(startValue, endValue);
      }
      if (trackElem) {
        trackElem.style.left = `${startPercent}%`;
        trackElem.style.width = `${endPercent}%`;
      }
      if (startBtnElem) {
        startBtnElem.style.left = `${startPercent}%`;
      }
      if (endBtnElem) {
        endBtnElem.style.left = `${_xeUtils.default.floor(startPercent + endPercent)}%`;
      }
    };
    const changeEvent = evnt => {
      const {
        range
      } = props;
      const {
        startValue,
        endValue
      } = reactData;
      const value = range ? [startValue, endValue].sort() : endValue;
      emitModel(value);
      dispatchEvent('change', {
        value
      }, evnt);
      // 自动更新校验状态
      if ($xeForm && formItemInfo) {
        $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, value);
      }
    };
    const handleMousedownEvent = (evnt, isEnd) => {
      const formReadonly = computeFormReadonly.value;
      const isDisabled = computeIsDisabled.value;
      const maxNum = computeMaxNum.value;
      const minNum = computeMinNum.value;
      if (!(formReadonly || isDisabled)) {
        evnt.preventDefault();
        document.onmousemove = evnt => {
          evnt.preventDefault();
          const el = refElem.value;
          const barElem = refBarElem.value;
          if (el && barElem) {
            const barRect = barElem.getBoundingClientRect();
            const trackWidth = (evnt.clientX - barRect.left) / barRect.width;
            if (isEnd) {
              reactData.endValue = _xeUtils.default.floor(Math.max(minNum, Math.min(maxNum, trackWidth * (maxNum - minNum) + minNum)));
            } else {
              reactData.startValue = _xeUtils.default.floor(Math.max(minNum, Math.min(maxNum, trackWidth * (maxNum - minNum))));
            }
            dispatchEvent('track-dragover', {
              startValue: reactData.startValue,
              endValue: reactData.endValue
            }, evnt);
          }
          updateBarStyle();
        };
        document.onmouseup = evnt => {
          document.onmousemove = null;
          document.onmouseup = null;
          dispatchEvent('track-dragend', {
            startValue: reactData.startValue,
            endValue: reactData.endValue
          }, evnt);
          changeEvent(evnt);
          updateBarStyle();
        };
        dispatchEvent('track-dragstart', {
          startValue: reactData.startValue,
          endValue: reactData.endValue
        }, evnt);
      }
    };
    const handleStartMousedownEvent = evnt => {
      const endBtnElem = refEndBtnElem.value;
      const startBtnElem = evnt.currentTarget;
      handleMousedownEvent(evnt, endBtnElem ? endBtnElem.offsetLeft < startBtnElem.offsetLeft : false);
    };
    const handleEndMousedownEvent = evnt => {
      const startBtnElem = refStartBtnElem.value;
      const endBtnElem = evnt.currentTarget;
      handleMousedownEvent(evnt, startBtnElem ? endBtnElem.offsetLeft > startBtnElem.offsetLeft : true);
    };
    const collapsePanePrivateMethods = {};
    Object.assign($xeSlider, collapsePaneMethods, collapsePanePrivateMethods);
    const renderVN = () => {
      const {
        vertical,
        range
      } = props;
      const vSize = computeSize.value;
      const formReadonly = computeFormReadonly.value;
      const isDisabled = computeIsDisabled.value;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-slider', {
          [`size--${vSize}`]: vSize,
          'is--vertical': vertical,
          'is--readonly': formReadonly,
          'is--disabled': isDisabled
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-slider--inner'
      }, [(0, _vue.h)('div', {
        ref: refBarElem,
        class: 'vxe-slider--bar-wrapper'
      }), (0, _vue.h)('div', {
        ref: refTrackElem,
        class: 'vxe-slider--bar-track'
      }), formReadonly || !range ? (0, _ui.renderEmptyElement)($xeSlider) : (0, _vue.h)('div', {
        ref: refStartBtnElem,
        class: 'vxe-slider--bar-btn vxe-slider--start-btn',
        onMousedown: handleStartMousedownEvent
      }), formReadonly ? (0, _ui.renderEmptyElement)($xeSlider) : (0, _vue.h)('div', {
        ref: refEndBtnElem,
        class: 'vxe-slider--bar-btn vxe-slider--end-btn',
        onMousedown: handleEndMousedownEvent
      })])]);
    };
    (0, _vue.watch)(() => props.modelValue, () => {
      updateModel();
    });
    (0, _vue.onMounted)(() => {
      updateBarStyle();
    });
    updateModel();
    $xeSlider.renderVN = renderVN;
    return $xeSlider;
  },
  render() {
    return this.renderVN();
  }
});