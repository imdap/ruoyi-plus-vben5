"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeRadioButton = exports.RadioButton = void 0;
var _core = require("@vxe-ui/core");
var _button = _interopRequireDefault(require("../radio/src/button"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeRadioButton = exports.VxeRadioButton = Object.assign(_button.default, {
  install: function (app) {
    app.component(_button.default.name, _button.default);
  }
});
_dynamics.dynamicApp.use(VxeRadioButton);
_core.VxeUI.component(_button.default);
const RadioButton = exports.RadioButton = VxeRadioButton;
var _default = exports.default = VxeRadioButton;