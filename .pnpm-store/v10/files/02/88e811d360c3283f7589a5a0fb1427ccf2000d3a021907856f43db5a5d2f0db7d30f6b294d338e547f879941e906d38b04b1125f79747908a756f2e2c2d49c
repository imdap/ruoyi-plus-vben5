"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _vn = require("../../ui/src/vn");
var _text = _interopRequireDefault(require("../../text/src/text"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeCountdown',
  props: {
    modelValue: [Number, String],
    format: String,
    prefixConfig: Object,
    suffixConfig: Object,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().countdown.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['update:modelValue', 'start', 'end'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      currNum: 0,
      secondNum: 0
    });
    const internalData = {
      dnTimeout: undefined
    };
    const refMaps = {
      refElem
    };
    const computeTimeFormats = (0, _vue.computed)(() => {
      const {
        secondNum
      } = reactData;
      if (secondNum >= 31622400000) {
        return ['yyyy', 'MM', 'dd', 'HH', 'mm', 'ss'];
      }
      if (secondNum >= 2678400000) {
        return ['MM', 'dd', 'HH', 'mm', 'ss'];
      }
      if (secondNum >= 86400000) {
        return ['dd', 'HH', 'mm', 'ss'];
      }
      if (secondNum >= 3600000) {
        return ['HH', 'mm', 'ss'];
      }
      if (secondNum >= 60000) {
        return ['mm', 'ss'];
      }
      return ['ss'];
    });
    const computeDiffConf = (0, _vue.computed)(() => {
      const {
        currNum
      } = reactData;
      const diffRest = _xeUtils.default.getDateDiff(Date.now(), Date.now() + currNum);
      return Object.assign(diffRest, {
        done: !(_xeUtils.default.isBoolean(diffRest.status) ? diffRest.status : diffRest.done)
      });
    });
    const computeFormatLabel = (0, _vue.computed)(() => {
      const {
        format
      } = props;
      const diffConf = computeDiffConf.value;
      let rest = '';
      if (format) {
        rest = `${format}`;
        _xeUtils.default.each(diffConf, (val, key) => {
          rest = rest.replace(new RegExp(key, 'g'), _xeUtils.default.padStart(val, key.length, '0'));
        });
        return rest;
      }
      return rest;
    });
    const computePrefixOpts = (0, _vue.computed)(() => {
      return Object.assign({}, props.prefixConfig, (0, _ui.getConfig)().countdown.prefixConfig);
    });
    const computeSuffixOpts = (0, _vue.computed)(() => {
      return Object.assign({}, props.suffixConfig, (0, _ui.getConfig)().countdown.suffixConfig);
    });
    const computeMaps = {
      computeSize
    };
    const $xeCountdown = {
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
        $carousel: $xeCountdown
      }, params));
    };
    const updateCount = () => {
      const secondNum = _xeUtils.default.toNumber(props.modelValue || 0);
      reactData.secondNum = secondNum;
      reactData.currNum = secondNum;
    };
    const handleTime = () => {
      const {
        currNum
      } = reactData;
      if (currNum > 1000) {
        reactData.currNum -= 1000;
        internalData.dnTimeout = setTimeout(() => {
          handleTime();
        }, 1000);
      } else {
        reactData.currNum = 0;
        handleStop();
      }
    };
    const countdownMethods = {
      dispatchEvent
    };
    const handleStart = () => {
      dispatchEvent('start', {}, null);
      handleTime();
    };
    const handleStop = () => {
      const {
        dnTimeout
      } = internalData;
      if (dnTimeout) {
        clearTimeout(dnTimeout);
        internalData.dnTimeout = undefined;
        dispatchEvent('end', {}, null);
      }
    };
    const countdownPrivateMethods = {};
    Object.assign($xeCountdown, countdownMethods, countdownPrivateMethods);
    const renderDefaultContentVNs = () => {
      const {
        format
      } = props;
      const timeFormats = computeTimeFormats.value;
      const diffConf = computeDiffConf.value;
      const formatLabel = computeFormatLabel.value;
      if (format) {
        return [(0, _vue.h)('div', {
          key: 'format',
          class: 'vxe-countdown--content-format'
        }, formatLabel)];
      }
      return timeFormats.map((key, index) => {
        return (0, _vue.h)('div', {
          key: index,
          class: 'vxe-countdown--content-item'
        }, [(0, _vue.h)('div', {
          class: 'vxe-countdown--content-num'
        }, `${diffConf[key] || 0}`), (0, _vue.h)('div', {
          class: 'vxe-countdown--content-unit'
        }, (0, _ui.getI18n)(`vxe.countdown.formats.${key}`))]);
      });
    };
    const renderVN = () => {
      const {
        prefixConfig,
        suffixConfig
      } = props;
      const {
        currNum
      } = reactData;
      const vSize = computeSize.value;
      const diffConf = computeDiffConf.value;
      const prefixOpts = computePrefixOpts.value;
      const suffixOpts = computeSuffixOpts.value;
      const prefixSlot = slots.prefix;
      const suffixSlot = slots.suffix;
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-countdown', diffConf.done ? 'is--progress' : 'is-end', {
          [`size--${vSize}`]: vSize
        }]
      }, [prefixSlot || prefixConfig ? (0, _vue.h)('div', {
        class: 'vxe-countdown--prefix'
      }, prefixSlot ? (0, _vn.getSlotVNs)(prefixSlot({
        currentValue: currNum,
        diffConf
      })) : [(0, _vue.h)(_text.default, {
        content: prefixOpts.content,
        icon: prefixOpts.icon,
        status: prefixOpts.status
      })]) : (0, _ui.renderEmptyElement)($xeCountdown), (0, _vue.h)('div', {
        class: 'vxe-countdown--content'
      }, defaultSlot ? (0, _vn.getSlotVNs)(defaultSlot({
        currentValue: currNum,
        diffConf
      })) : renderDefaultContentVNs()), suffixSlot || suffixConfig ? (0, _vue.h)('div', {
        class: 'vxe-countdown--suffix'
      }, suffixSlot ? (0, _vn.getSlotVNs)(suffixSlot({
        currentValue: currNum,
        diffConf
      })) : [(0, _vue.h)(_text.default, {
        content: suffixOpts.content,
        icon: suffixOpts.icon,
        status: suffixOpts.status
      })]) : (0, _ui.renderEmptyElement)($xeCountdown)]);
    };
    (0, _vue.watch)(() => props.modelValue, () => {
      updateCount();
      handleStop();
      handleStart();
    });
    (0, _vue.onUnmounted)(() => {
      handleStop();
    });
    (0, _vue.onMounted)(() => {
      handleStart();
    });
    updateCount();
    $xeCountdown.renderVN = renderVN;
    return $xeCountdown;
  },
  render() {
    return this.renderVN();
  }
});