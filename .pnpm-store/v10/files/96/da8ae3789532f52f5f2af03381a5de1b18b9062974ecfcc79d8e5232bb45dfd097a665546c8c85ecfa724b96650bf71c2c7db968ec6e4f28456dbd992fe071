"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeInput = exports.Input = void 0;
var _core = require("@vxe-ui/core");
var _input = _interopRequireDefault(require("./src/input"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeInput = exports.VxeInput = Object.assign(_input.default, {
  install(app) {
    app.component(_input.default.name, _input.default);
  }
});
_dynamics.dynamicApp.use(VxeInput);
_core.VxeUI.component(_input.default);
const Input = exports.Input = VxeInput;
var _default = exports.default = VxeInput;