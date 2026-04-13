"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _ui = require("../../ui");
var _util = require("./util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxePrintPageBreak',
  props: {},
  emits: [],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const $xePrint = (0, _vue.inject)('$xePrint', null);
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeMaps = {};
    const pageBreakConfig = (0, _vue.reactive)({
      id: xID,
      slots
    });
    const $xePrintPageBreak = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $print: $xePrint
      }, params));
    };
    const printPageBreakMethods = {
      dispatchEvent
    };
    const printPageBreakPrivateMethods = {};
    Object.assign($xePrintPageBreak, printPageBreakMethods, printPageBreakPrivateMethods);
    if (!$xePrint) {
      $xePrintPageBreak.renderVN = () => {
        return (0, _vue.createCommentVNode)();
      };
      return $xePrintPageBreak;
    }
    const renderVN = () => {
      return (0, _vue.h)('div', {
        ref: refElem
      });
    };
    (0, _vue.onMounted)(() => {
      const elem = refElem.value;
      if ($xePrint && elem) {
        (0, _util.assemblePageBreak)($xePrint, elem, pageBreakConfig);
      }
    });
    (0, _vue.onUnmounted)(() => {
      if ($xePrint) {
        (0, _util.destroyPageBreak)($xePrint, pageBreakConfig);
      }
    });
    $xePrintPageBreak.renderVN = renderVN;
    return $xePrintPageBreak;
  },
  render() {
    return this.renderVN();
  }
});