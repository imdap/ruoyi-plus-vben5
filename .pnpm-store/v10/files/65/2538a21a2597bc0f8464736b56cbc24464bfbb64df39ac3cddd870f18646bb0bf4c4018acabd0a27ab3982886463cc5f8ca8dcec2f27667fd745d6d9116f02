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
  name: 'VxeMention',
  props: {
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().mention.size || (0, _ui.getConfig)().size
    }
  },
  emits: [],
  setup(props, context) {
    const {
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const $xeMention = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $mention: $xeMention
      }, params));
    };
    const tagMethods = {
      dispatchEvent
    };
    const tagPrivateMethods = {};
    Object.assign($xeMention, tagMethods, tagPrivateMethods);
    const renderVN = () => {
      return (0, _vue.h)('div', {
        ref: refElem,
        class: 'vxe-mention'
      });
    };
    $xeMention.renderVN = renderVN;
    return $xeMention;
  },
  render() {
    return this.renderVN();
  }
});