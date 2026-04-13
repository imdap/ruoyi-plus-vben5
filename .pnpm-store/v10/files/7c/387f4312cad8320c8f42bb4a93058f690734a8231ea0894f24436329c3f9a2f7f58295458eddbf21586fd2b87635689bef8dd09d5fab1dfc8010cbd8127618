"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeColgroup = exports.Colgroup = void 0;
var _ui = require("../ui");
var _group = _interopRequireDefault(require("../table/src/group"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeColgroup = exports.VxeColgroup = Object.assign({}, _group.default, {
  install(app) {
    app.component(_group.default.name, _group.default);
    // 兼容旧用法
    app.component('VxeTableColgroup', _group.default);
  }
});
if (_ui.VxeUI.dynamicApp) {
  _ui.VxeUI.dynamicApp.component(_group.default.name, _group.default);
  // 兼容旧用法
  _ui.VxeUI.dynamicApp.component('VxeTableColgroup', _group.default);
}
_ui.VxeUI.component(_group.default);
const Colgroup = exports.Colgroup = VxeColgroup;
var _default = exports.default = VxeColgroup;