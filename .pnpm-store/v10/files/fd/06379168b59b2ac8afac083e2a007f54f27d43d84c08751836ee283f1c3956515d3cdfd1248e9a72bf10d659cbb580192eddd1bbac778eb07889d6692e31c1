"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeFormGather = exports.FormGather = void 0;
var _core = require("@vxe-ui/core");
var _formGroup = _interopRequireDefault(require("../form/src/form-group"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeFormGatherComponent = Object.assign({}, _formGroup.default, {
  name: 'VxeFormGather'
});
/**
 * 已废弃，被 VxeFormGather 替换
 * @deprecated
 */
const VxeFormGather = exports.VxeFormGather = Object.assign(VxeFormGatherComponent, {
  install(app) {
    app.component(VxeFormGatherComponent.name, VxeFormGatherComponent);
  }
});
_dynamics.dynamicApp.use(VxeFormGather);
_core.VxeUI.component(VxeFormGatherComponent);
/**
 * 已废弃，被 FormGroup 替换
 * @deprecated
 */
const FormGather = exports.FormGather = VxeFormGather;
var _default = exports.default = VxeFormGather;