"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeSelect = exports.Select = void 0;
var _core = require("@vxe-ui/core");
var _select = _interopRequireDefault(require("./src/select"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeSelect = exports.VxeSelect = Object.assign(_select.default, {
  install: function (app) {
    app.component(_select.default.name, _select.default);
  }
});
_dynamics.dynamicApp.use(VxeSelect);
_core.VxeUI.component(_select.default);
const Select = exports.Select = VxeSelect;
var _default = exports.default = VxeSelect;