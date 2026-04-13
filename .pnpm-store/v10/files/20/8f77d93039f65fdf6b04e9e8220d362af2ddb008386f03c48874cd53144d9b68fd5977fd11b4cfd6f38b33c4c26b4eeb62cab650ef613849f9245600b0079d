"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCheckboxGroup = exports.CheckboxGroup = void 0;
var _core = require("@vxe-ui/core");
var _group = _interopRequireDefault(require("../checkbox/src/group"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCheckboxGroup = exports.VxeCheckboxGroup = Object.assign(_group.default, {
  install(app) {
    app.component(_group.default.name, _group.default);
  }
});
_dynamics.dynamicApp.use(VxeCheckboxGroup);
_core.VxeUI.component(_group.default);
const CheckboxGroup = exports.CheckboxGroup = VxeCheckboxGroup;
var _default = exports.default = VxeCheckboxGroup;