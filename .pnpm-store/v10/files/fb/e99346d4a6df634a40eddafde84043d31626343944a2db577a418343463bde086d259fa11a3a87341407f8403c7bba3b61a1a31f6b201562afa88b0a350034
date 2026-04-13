"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeBreadcrumb = exports.Breadcrumb = void 0;
var _core = require("@vxe-ui/core");
var _breadcrumb = _interopRequireDefault(require("./src/breadcrumb"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeBreadcrumb = exports.VxeBreadcrumb = Object.assign({}, _breadcrumb.default, {
  install(app) {
    app.component(_breadcrumb.default.name, _breadcrumb.default);
  }
});
_dynamics.dynamicApp.use(VxeBreadcrumb);
_core.VxeUI.component(_breadcrumb.default);
const Breadcrumb = exports.Breadcrumb = VxeBreadcrumb;
var _default = exports.default = VxeBreadcrumb;