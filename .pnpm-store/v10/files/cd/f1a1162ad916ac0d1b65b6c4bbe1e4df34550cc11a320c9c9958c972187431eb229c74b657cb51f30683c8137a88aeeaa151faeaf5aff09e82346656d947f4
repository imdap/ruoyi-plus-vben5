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
  name: 'VxeLayoutContainer',
  props: {
    vertical: Boolean,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().layoutContainer.size || (0, _ui.getConfig)().size
    }
  },
  emits: [],
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
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeMaps = {
      computeSize
    };
    const $xeLayoutContainer = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $layoutContainer: $xeLayoutContainer
      }, params));
    };
    const layoutContainerMethods = {
      dispatchEvent
    };
    const layoutContainerPrivateMethods = {};
    Object.assign($xeLayoutContainer, layoutContainerMethods, layoutContainerPrivateMethods);
    const renderVN = () => {
      const {
        vertical
      } = props;
      const vSize = computeSize.value;
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-layout-container', {
          [`size--${vSize}`]: vSize,
          'is--vertical': vertical
        }]
      }, defaultSlot ? defaultSlot({}) : []);
    };
    $xeLayoutContainer.renderVN = renderVN;
    return $xeLayoutContainer;
  },
  render() {
    return this.renderVN();
  }
});