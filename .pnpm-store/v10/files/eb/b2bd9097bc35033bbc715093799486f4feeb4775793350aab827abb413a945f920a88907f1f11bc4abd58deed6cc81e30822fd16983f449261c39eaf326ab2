"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCollapse = exports.Collapse = void 0;
var _core = require("@vxe-ui/core");
var _collapse = _interopRequireDefault(require("./src/collapse"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCollapse = exports.VxeCollapse = Object.assign({}, _collapse.default, {
  install(app) {
    app.component(_collapse.default.name, _collapse.default);
  }
});
_dynamics.dynamicApp.use(VxeCollapse);
_core.VxeUI.component(_collapse.default);
const Collapse = exports.Collapse = VxeCollapse;
var _default = exports.default = VxeCollapse;