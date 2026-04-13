"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeTip = exports.Tips = exports.Tip = void 0;
var _core = require("@vxe-ui/core");
var _tip = _interopRequireDefault(require("./src/tip"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeTip = exports.VxeTip = Object.assign({}, _tip.default, {
  install(app) {
    app.component(_tip.default.name, _tip.default);
    app.component('VxeTipsComponent', _tip.default);
  }
});
_dynamics.dynamicApp.use(VxeTip);
_core.VxeUI.component(_tip.default);
const Tips = exports.Tips = VxeTip;
const Tip = exports.Tip = VxeTip;
var _default = exports.default = VxeTip;