"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCheckbox = exports.Checkbox = void 0;
var _core = require("@vxe-ui/core");
var _checkbox = _interopRequireDefault(require("./src/checkbox"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCheckbox = exports.VxeCheckbox = Object.assign(_checkbox.default, {
  install(app) {
    app.component(_checkbox.default.name, _checkbox.default);
  }
});
_dynamics.dynamicApp.use(VxeCheckbox);
_core.VxeUI.component(_checkbox.default);
const Checkbox = exports.Checkbox = VxeCheckbox;
var _default = exports.default = VxeCheckbox;