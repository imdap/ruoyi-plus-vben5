"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeFormItem = exports.FormItem = void 0;
var _core = require("@vxe-ui/core");
var _formItem = _interopRequireDefault(require("../form/src/form-item"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeFormItem = exports.VxeFormItem = Object.assign(_formItem.default, {
  install(app) {
    app.component(_formItem.default.name, _formItem.default);
  }
});
_dynamics.dynamicApp.use(VxeFormItem);
_core.VxeUI.component(_formItem.default);
const FormItem = exports.FormItem = VxeFormItem;
var _default = exports.default = VxeFormItem;