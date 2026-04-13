"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeColumn = exports.Column = void 0;
var _ui = require("../ui");
var _column = _interopRequireDefault(require("../table/src/column"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeColumn = exports.VxeColumn = Object.assign({}, _column.default, {
  install(app) {
    app.component(_column.default.name, _column.default);
    // 兼容旧用法
    app.component('VxeTableColumn', _column.default);
  }
});
if (_ui.VxeUI.dynamicApp) {
  _ui.VxeUI.dynamicApp.component(_column.default.name, _column.default);
  // 兼容旧用法
  _ui.VxeUI.dynamicApp.component('VxeTableColumn', _column.default);
}
_ui.VxeUI.component(_column.default);
const Column = exports.Column = VxeColumn;
var _default = exports.default = VxeColumn;