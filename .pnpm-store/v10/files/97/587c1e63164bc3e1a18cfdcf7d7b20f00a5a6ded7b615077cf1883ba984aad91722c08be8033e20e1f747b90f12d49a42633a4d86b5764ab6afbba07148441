"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeForm = exports.Form = void 0;
var _core = require("@vxe-ui/core");
var _form = _interopRequireDefault(require("./src/form"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeForm = exports.VxeForm = Object.assign(_form.default, {
  install(app) {
    app.component(_form.default.name, _form.default);
  }
});
_dynamics.dynamicApp.use(VxeForm);
_core.VxeUI.component(_form.default);
const Form = exports.Form = VxeForm;
var _default = exports.default = VxeForm;