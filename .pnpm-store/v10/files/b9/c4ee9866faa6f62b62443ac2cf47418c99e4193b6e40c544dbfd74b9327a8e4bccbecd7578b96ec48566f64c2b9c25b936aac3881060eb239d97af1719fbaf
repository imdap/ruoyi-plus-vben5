"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _loading = _interopRequireDefault(require("../../loading"));
var _backtop = _interopRequireDefault(require("../../backtop"));
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createInternalData() {
  return {};
}
function createReactData() {
  return {};
}
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeLayoutBody',
  props: {
    loading: Boolean,
    padding: Boolean,
    showBacktop: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().layoutBody.showBacktop
    },
    backtopConfig: Object,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().layoutBody.size || (0, _ui.getConfig)().size
    }
  },
  emits: [],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const backtopId = `vxe_layout_body_backtop_${xID}`;
    const refElem = (0, _vue.ref)();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const internalData = createInternalData();
    const reactData = (0, _vue.reactive)(createReactData());
    const refMaps = {
      refElem
    };
    const computeBacktopOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().layoutBody.backtopConfig, props.backtopConfig, {
        target: '#' + backtopId
      });
    });
    const computeMaps = {
      computeSize
    };
    const $xeLayoutBody = {
      xID,
      props,
      context,
      internalData,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $layoutBody: $xeLayoutBody
      }, params));
    };
    const layoutBodyMethods = {
      dispatchEvent
    };
    const layoutBodyPrivateMethods = {};
    Object.assign($xeLayoutBody, layoutBodyMethods, layoutBodyPrivateMethods);
    const renderVN = () => {
      const {
        loading,
        padding,
        showBacktop
      } = props;
      const backtopOpts = computeBacktopOpts.value;
      const vSize = computeSize.value;
      const defaultSlot = slots.default;
      const backtopSlot = slots.backtop;
      const backtopTopSlot = slots.backtopTop || slots['backtop-top'];
      const backtopBottomSlot = slots.backtopBottom || slots['backtop-bottom'];
      const backtopScopeSlots = {};
      if (backtopSlot) {
        backtopScopeSlots.default = backtopSlot;
      }
      if (backtopTopSlot) {
        backtopScopeSlots.top = backtopTopSlot;
      }
      if (backtopBottomSlot) {
        backtopScopeSlots.bottom = backtopBottomSlot;
      }
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-layout-body', {
          [`size--${vSize}`]: vSize,
          'is--loading': loading,
          'is--padding': padding
        }]
      }, [(0, _vue.h)('div', {
        id: showBacktop ? backtopId : '',
        class: 'vxe-layout-body--inner'
      }, defaultSlot ? defaultSlot({}) : []),
      /**
       * 加载中
       */
      (0, _vue.h)(_loading.default, {
        class: 'vxe-list-view--loading',
        modelValue: loading
      }),
      /**
       * 回到顶部
       */
      showBacktop ? (0, _vue.h)(_backtop.default, backtopOpts, backtopScopeSlots) : (0, _ui.renderEmptyElement)($xeLayoutBody)]);
    };
    $xeLayoutBody.renderVN = renderVN;
    return $xeLayoutBody;
  },
  render() {
    return this.renderVN();
  }
});