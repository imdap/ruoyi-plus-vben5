"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxePasswordInput = exports.PasswordInput = void 0;
var _core = require("@vxe-ui/core");
var _passwordInput = _interopRequireDefault(require("./src/password-input"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxePasswordInput = exports.VxePasswordInput = Object.assign({}, _passwordInput.default, {
  install(app) {
    app.component(_passwordInput.default.name, _passwordInput.default);
  }
});
_dynamics.dynamicApp.use(VxePasswordInput);
_core.VxeUI.component(_passwordInput.default);
const PasswordInput = exports.PasswordInput = VxePasswordInput;
var _default = exports.default = VxePasswordInput;