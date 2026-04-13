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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeRow',
  props: {
    gutter: [Number, String, Array],
    wrap: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().row.wrap
    },
    vertical: Boolean,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().row.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['click'],
  setup(props, context) {
    const {
      slots,
      emit
    } = context;
    const xID = _xeUtils.default.uniqueId();
    (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({});
    const refMaps = {
      refElem
    };
    const computeRowStyle = (0, _vue.computed)(() => {
      const {
        gutter,
        vertical
      } = props;
      const style = {};
      if (gutter) {
        let [lrGutter, tbGutter] = _xeUtils.default.isArray(gutter) ? gutter : [gutter];
        if (vertical) {
          tbGutter = lrGutter;
          lrGutter = '';
        }
        if (lrGutter) {
          const offsetSize = _xeUtils.default.isNumber(lrGutter) ? (0, _dom.toCssUnit)(-(lrGutter / 2)) : `calc(${(0, _dom.toCssUnit)(lrGutter)} / 2 * -1)`;
          style.marginLeft = offsetSize;
          style.marginRight = offsetSize;
        }
        if (tbGutter) {
          const offsetSize = _xeUtils.default.isNumber(tbGutter) ? (0, _dom.toCssUnit)(-(tbGutter / 2)) : `calc(${(0, _dom.toCssUnit)(tbGutter)} / 2 * -1)`;
          style.marginTop = offsetSize;
          style.marginBottom = offsetSize;
        }
      }
      return style;
    });
    const computeMaps = {};
    const $xeRow = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const clickEvent = evnt => {
      dispatchEvent('click', {}, evnt);
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $row: $xeRow
      }, params));
    };
    const rowMethods = {
      dispatchEvent
    };
    const rowPrivateMethods = {};
    Object.assign($xeRow, rowMethods, rowPrivateMethods);
    const renderVN = () => {
      const {
        vertical,
        wrap
      } = props;
      const rowStyle = computeRowStyle.value;
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-row', {
          'is--vertical': vertical,
          'is--wrap': wrap
        }],
        style: rowStyle,
        onClick: clickEvent
      }, defaultSlot ? defaultSlot({}) : []);
    };
    (0, _vue.provide)('$xeRow', $xeRow);
    $xeRow.renderVN = renderVN;
    return $xeRow;
  },
  render() {
    return this.renderVN();
  }
});