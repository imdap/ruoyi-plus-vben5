"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _column = require("./column");
var _util = require("./util");
var _cell = _interopRequireDefault(require("./cell"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeColgroup',
  props: _column.columnProps,
  setup(props, {
    slots
  }) {
    const refElem = (0, _vue.ref)();
    const $xeTable = (0, _vue.inject)('$xeTable', null);
    const $xeParentColgroup = (0, _vue.inject)('$xeColgroup', null);
    if (!$xeTable) {
      return () => (0, _vue.createCommentVNode)();
    }
    const columnConfig = _cell.default.createColumn($xeTable, props);
    const columnSlots = {};
    if (slots.header) {
      columnSlots.header = slots.header;
    }
    columnConfig.slots = columnSlots;
    columnConfig.children = [];
    (0, _util.watchColumn)($xeTable, props, columnConfig);
    (0, _vue.onMounted)(() => {
      const elem = refElem.value;
      if (elem) {
        (0, _util.assembleColumn)($xeTable, elem, columnConfig, $xeParentColgroup);
      }
    });
    (0, _vue.onUnmounted)(() => {
      (0, _util.destroyColumn)($xeTable, columnConfig);
    });
    const renderVN = () => {
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: refElem
      }, defaultSlot ? defaultSlot() : []);
    };
    const $xeColgroup = {
      columnConfig
    };
    (0, _vue.provide)('$xeColgroup', $xeColgroup);
    (0, _vue.provide)('$xeGrid', null);
    (0, _vue.provide)('$xeGantt', null);
    return renderVN;
  }
});