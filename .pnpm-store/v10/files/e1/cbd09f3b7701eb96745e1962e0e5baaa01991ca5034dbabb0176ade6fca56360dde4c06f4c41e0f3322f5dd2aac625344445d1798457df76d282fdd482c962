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
  name: 'VxeCol',
  props: {
    span: [Number, String],
    align: String,
    width: [Number, String],
    fill: Boolean,
    ellipsis: Boolean,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().col.size || (0, _ui.getConfig)().size
    }
  },
  emits: [],
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
    const $xeRow = (0, _vue.inject)('$xeRow', null);
    const computeRowGutter = (0, _vue.computed)(() => {
      if ($xeRow) {
        return $xeRow.props.gutter;
      }
      return null;
    });
    const computeRowVertical = (0, _vue.computed)(() => {
      if ($xeRow) {
        return $xeRow.props.vertical;
      }
      return null;
    });
    const computeColStyle = (0, _vue.computed)(() => {
      const {
        width
      } = props;
      const rowGutter = computeRowGutter.value;
      const rowVertical = computeRowVertical.value;
      const style = {};
      if (rowGutter) {
        let [lrGutter, tbGutter] = _xeUtils.default.isArray(rowGutter) ? rowGutter : [rowGutter];
        if (rowVertical) {
          tbGutter = lrGutter;
          lrGutter = '';
        }
        if (lrGutter) {
          const padding = _xeUtils.default.isNumber(lrGutter) ? (0, _dom.toCssUnit)(lrGutter / 2) : `calc(${(0, _dom.toCssUnit)(lrGutter)} / 2)`;
          style.paddingLeft = padding;
          style.paddingRight = padding;
        }
        if (tbGutter) {
          const padding = _xeUtils.default.isNumber(tbGutter) ? (0, _dom.toCssUnit)(tbGutter / 2) : `calc(${(0, _dom.toCssUnit)(tbGutter)} / 2)`;
          style.paddingTop = padding;
          style.paddingBottom = padding;
        }
      }
      if (width) {
        style.width = (0, _dom.toCssUnit)(width);
      }
      return style;
    });
    const computeMaps = {};
    const $xeCol = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $col: $xeCol
      }, params));
    };
    const colMethods = {
      dispatchEvent
    };
    const colPrivateMethods = {};
    Object.assign($xeCol, colMethods, colPrivateMethods);
    const renderVN = () => {
      const {
        span,
        fill,
        align,
        width,
        ellipsis
      } = props;
      const colStyle = computeColStyle.value;
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-col', span ? `span${span}` : '', align ? `align--${align}` : '', {
          'is--span': !!span,
          'is--width': !!width,
          'is--fill': fill,
          'is--ellipsis': ellipsis
        }],
        style: colStyle
      }, [(0, _vue.h)('div', {
        class: 'vxe-col--inner'
      }, defaultSlot ? defaultSlot({}) : [])]);
    };
    $xeCol.renderVN = renderVN;
    return $xeCol;
  },
  render() {
    return this.renderVN();
  }
});