"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTable = exports.Table = void 0;
var _ui = require("../ui");
var _table = _interopRequireDefault(require("./src/table"));
var _use = require("./src/use");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTable = exports.VxeTable = Object.assign({}, _table.default, {
  install(app) {
    app.component(_table.default.name, _table.default);
  }
});
const tableHandle = {
  useCellView: _use.useCellView
};
if (_ui.VxeUI.dynamicApp) {
  _ui.VxeUI.dynamicApp.component(_table.default.name, _table.default);
}
_ui.VxeUI.component(_table.default);
_ui.VxeUI.tableHandle = tableHandle;
const Table = exports.Table = VxeTable;
var _default = exports.default = VxeTable;