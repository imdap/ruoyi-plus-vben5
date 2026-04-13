"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _vn = require("../../ui/src/vn");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeLoading',
  props: {
    modelValue: Boolean,
    icon: {
      type: String,
      default: () => (0, _ui.getConfig)().loading.icon
    },
    showIcon: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().loading.showIcon
    },
    text: {
      type: String,
      default: () => (0, _ui.getConfig)().loading.text
    },
    showText: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().loading.showText
    },
    status: String,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().loading.size || (0, _ui.getConfig)().size
    }
  },
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const reactData = (0, _vue.reactive)({
      initialized: false
    });
    const computeMaps = {
      computeSize
    };
    const $xeLoading = {
      xID,
      props,
      context,
      reactData,
      getComputeMaps: () => computeMaps
    };
    const computeLoadingIcon = (0, _vue.computed)(() => {
      return props.icon || (0, _ui.getIcon)().LOADING;
    });
    const computeLoadingText = (0, _vue.computed)(() => {
      const {
        text
      } = props;
      return _xeUtils.default.isString(text) ? text : (0, _ui.getI18n)('vxe.loading.text');
    });
    const handleInit = () => {
      if (!reactData.initialized) {
        reactData.initialized = !!reactData.initialized;
      }
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $loading: $xeLoading
      }, params));
    };
    const loadingMethods = {
      dispatchEvent
    };
    const loadingPrivateMethods = {};
    Object.assign($xeLoading, loadingMethods, loadingPrivateMethods);
    const renderVN = () => {
      const {
        modelValue,
        showIcon,
        status
      } = props;
      const {
        initialized
      } = reactData;
      const vSize = computeSize.value;
      const defaultSlot = slots.default;
      const textSlot = slots.text;
      const iconSlot = slots.icon;
      const loadingIcon = computeLoadingIcon.value;
      const loadingText = computeLoadingText.value;
      if (!initialized && !modelValue) {
        return (0, _ui.renderEmptyElement)($xeLoading);
      }
      return (0, _vue.h)('div', {
        class: ['vxe-loading', {
          [`size--${vSize}`]: vSize,
          [`theme--${status}`]: status,
          'is--visible': modelValue
        }]
      }, defaultSlot ? [(0, _vue.h)('div', {
        class: 'vxe-loading--wrapper'
      }, (0, _vn.getSlotVNs)(defaultSlot({})))] : [(0, _vue.h)('div', {
        class: 'vxe-loading--chunk'
      }, [showIcon && (iconSlot || loadingIcon) ? (0, _vue.h)('div', {
        class: 'vxe-loading--icon'
      }, iconSlot ? (0, _vn.getSlotVNs)(iconSlot({})) : [(0, _vue.h)('i', {
        class: loadingIcon
      })]) : (0, _vue.h)('div', {
        class: 'vxe-loading--spinner'
      }), textSlot || loadingText ? (0, _vue.h)('div', {
        class: 'vxe-loading--text'
      }, textSlot ? (0, _vn.getSlotVNs)(textSlot({})) : `${loadingText}`) : null])]);
    };
    (0, _vue.watch)(() => props.modelValue, () => {
      handleInit();
    });
    handleInit();
    $xeLoading.renderVN = renderVN;
    return $xeLoading;
  },
  render() {
    return this.renderVN();
  }
});