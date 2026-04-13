"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeAlert = exports.Alert = void 0;
var _core = require("@vxe-ui/core");
var _alert = _interopRequireDefault(require("./src/alert"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeAlert = exports.VxeAlert = Object.assign({}, _alert.default, {
  install(app) {
    app.component(_alert.default.name, _alert.default);
  }
});
_dynamics.dynamicApp.use(VxeAlert);
_core.VxeUI.component(_alert.default);
const Alert = exports.Alert = VxeAlert;
var _default = exports.default = VxeAlert;