"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeRadioGroup = exports.RadioGroup = void 0;
var _core = require("@vxe-ui/core");
var _group = _interopRequireDefault(require("../radio/src/group"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeRadioGroup = exports.VxeRadioGroup = Object.assign(_group.default, {
  install: function (app) {
    app.component(_group.default.name, _group.default);
  }
});
_dynamics.dynamicApp.use(VxeRadioGroup);
_core.VxeUI.component(_group.default);
const RadioGroup = exports.RadioGroup = VxeRadioGroup;
var _default = exports.default = VxeRadioGroup;