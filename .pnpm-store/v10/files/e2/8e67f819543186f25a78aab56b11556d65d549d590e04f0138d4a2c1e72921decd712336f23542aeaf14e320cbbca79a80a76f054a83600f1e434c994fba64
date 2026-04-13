"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeFormGroup = exports.FormGroup = void 0;
var _core = require("@vxe-ui/core");
var _formGroup = _interopRequireDefault(require("../form/src/form-group"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeFormGroup = exports.VxeFormGroup = Object.assign(_formGroup.default, {
  install(app) {
    app.component(_formGroup.default.name, _formGroup.default);
  }
});
_dynamics.dynamicApp.use(VxeFormGroup);
_core.VxeUI.component(_formGroup.default);
const FormGroup = exports.FormGroup = VxeFormGroup;
var _default = exports.default = VxeFormGroup;