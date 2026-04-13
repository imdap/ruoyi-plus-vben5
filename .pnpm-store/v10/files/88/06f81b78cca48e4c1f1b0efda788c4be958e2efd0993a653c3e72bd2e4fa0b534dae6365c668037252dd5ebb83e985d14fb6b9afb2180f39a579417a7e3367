"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeRadio = exports.Radio = void 0;
var _core = require("@vxe-ui/core");
var _radio = _interopRequireDefault(require("./src/radio"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeRadio = exports.VxeRadio = Object.assign(_radio.default, {
  install: function (app) {
    app.component(_radio.default.name, _radio.default);
  }
});
_dynamics.dynamicApp.use(VxeRadio);
_core.VxeUI.component(_radio.default);
const Radio = exports.Radio = VxeRadio;
var _default = exports.default = VxeRadio;