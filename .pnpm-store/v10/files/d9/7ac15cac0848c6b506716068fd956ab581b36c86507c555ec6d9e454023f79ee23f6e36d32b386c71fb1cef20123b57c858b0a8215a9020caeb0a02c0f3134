"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionInfo = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class OptionInfo {
  constructor($xeselect, _vm) {
    Object.assign(this, {
      id: _xeUtils.default.uniqueId('option_'),
      value: _vm.value,
      label: _vm.label,
      visible: _vm.visible,
      className: _vm.className,
      disabled: _vm.disabled
    });
  }
  update(name, value) {
    this[name] = value;
  }
}
exports.OptionInfo = OptionInfo;