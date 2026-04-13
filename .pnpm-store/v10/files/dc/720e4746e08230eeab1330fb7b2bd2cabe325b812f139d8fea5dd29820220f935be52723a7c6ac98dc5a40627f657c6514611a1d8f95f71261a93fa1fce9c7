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
  name: 'VxeSteps',
  props: {},
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
    const $xeSteps = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $steps: $xeSteps
      }, params));
    };
    const stepsMethods = {
      dispatchEvent
    };
    const stepsPrivateMethods = {};
    Object.assign($xeSteps, stepsMethods, stepsPrivateMethods);
    const renderVN = () => {
      return (0, _vue.h)('div', {
        ref: refElem,
        class: 'vxe-steps'
      }, []);
    };
    $xeSteps.renderVN = renderVN;
    return $xeSteps;
  },
  render() {
    return this.renderVN();
  }
});