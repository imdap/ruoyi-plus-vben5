"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeGrid = exports.Grid = void 0;
var _ui = require("../ui");
var _grid = _interopRequireDefault(require("./src/grid"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeGrid = exports.VxeGrid = Object.assign({}, _grid.default, {
  install(app) {
    app.component(_grid.default.name, _grid.default);
  }
});
if (_ui.VxeUI.dynamicApp) {
  _ui.VxeUI.dynamicApp.component(_grid.default.name, _grid.default);
}
_ui.VxeUI.component(_grid.default);
const Grid = exports.Grid = VxeGrid;
var _default = exports.default = VxeGrid;