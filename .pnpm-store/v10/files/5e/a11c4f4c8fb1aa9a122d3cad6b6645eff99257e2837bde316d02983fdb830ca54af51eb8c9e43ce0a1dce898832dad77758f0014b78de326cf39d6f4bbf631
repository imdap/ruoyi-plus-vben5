"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCheckboxButton = exports.CheckboxButton = void 0;
var _core = require("@vxe-ui/core");
var _button = _interopRequireDefault(require("../checkbox/src/button"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCheckboxButton = exports.VxeCheckboxButton = Object.assign(_button.default, {
  install: function (app) {
    app.component(_button.default.name, _button.default);
  }
});
_dynamics.dynamicApp.use(VxeCheckboxButton);
_core.VxeUI.component(_button.default);
const CheckboxButton = exports.CheckboxButton = VxeCheckboxButton;
var _default = exports.default = VxeCheckboxButton;