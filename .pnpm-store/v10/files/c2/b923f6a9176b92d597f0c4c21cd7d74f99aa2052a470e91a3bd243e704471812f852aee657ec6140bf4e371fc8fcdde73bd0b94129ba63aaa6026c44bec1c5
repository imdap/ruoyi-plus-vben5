"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCountdown = exports.Countdown = void 0;
var _core = require("@vxe-ui/core");
var _countdown = _interopRequireDefault(require("./src/countdown"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCountdown = exports.VxeCountdown = Object.assign({}, _countdown.default, {
  install(app) {
    app.component(_countdown.default.name, _countdown.default);
  }
});
_dynamics.dynamicApp.use(VxeCountdown);
_core.VxeUI.component(_countdown.default);
const Countdown = exports.Countdown = VxeCountdown;
var _default = exports.default = VxeCountdown;