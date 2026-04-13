"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeLayoutHeader',
  props: {
    fixed: Boolean
  },
  emits: [],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeLayoutHeader = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $layoutHeader: $xeLayoutHeader
      }, params));
    };
    const layoutHeaderMethods = {
      dispatchEvent
    };
    const layoutHeaderPrivateMethods = {};
    Object.assign($xeLayoutHeader, layoutHeaderMethods, layoutHeaderPrivateMethods);
    const renderVN = () => {
      const {
        fixed
      } = props;
      const defaultSlot = slots.default;
      return (0, _vue.h)('header', {
        ref: refElem,
        class: ['vxe-layout-header', {
          'is--fixed': fixed
        }]
      }, defaultSlot ? defaultSlot({}) : []);
    };
    $xeLayoutHeader.renderVN = renderVN;
    return $xeLayoutHeader;
  },
  render() {
    return this.renderVN();
  }
});