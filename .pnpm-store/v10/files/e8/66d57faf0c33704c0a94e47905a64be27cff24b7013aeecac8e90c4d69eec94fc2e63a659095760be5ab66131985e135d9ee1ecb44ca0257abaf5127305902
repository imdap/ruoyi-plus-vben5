"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxePulldown = exports.Pulldown = void 0;
var _core = require("@vxe-ui/core");
var _pulldown = _interopRequireDefault(require("./src/pulldown"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxePulldown = exports.VxePulldown = Object.assign(_pulldown.default, {
  install: function (app) {
    app.component(_pulldown.default.name, _pulldown.default);
  }
});
_dynamics.dynamicApp.use(VxePulldown);
_core.VxeUI.component(_pulldown.default);
const Pulldown = exports.Pulldown = VxePulldown;
var _default = exports.default = VxePulldown;