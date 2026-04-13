"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeToolbar = exports.Toolbar = void 0;
var _ui = require("../ui");
var _toolbar = _interopRequireDefault(require("./src/toolbar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeToolbar = exports.VxeToolbar = Object.assign({}, _toolbar.default, {
  install(app) {
    app.component(_toolbar.default.name, _toolbar.default);
  }
});
if (_ui.VxeUI.dynamicApp) {
  _ui.VxeUI.dynamicApp.component(_toolbar.default.name, _toolbar.default);
}
_ui.VxeUI.component(_toolbar.default);
const Toolbar = exports.Toolbar = VxeToolbar;
var _default = exports.default = VxeToolbar;