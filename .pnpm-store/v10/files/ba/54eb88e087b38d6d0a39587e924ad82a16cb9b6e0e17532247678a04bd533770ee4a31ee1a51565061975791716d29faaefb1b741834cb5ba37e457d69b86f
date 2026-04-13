"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeBreadcrumbItem = exports.BreadcrumbItem = void 0;
var _core = require("@vxe-ui/core");
var _breadcrumbItem = _interopRequireDefault(require("../breadcrumb/src/breadcrumb-item"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeBreadcrumbItem = exports.VxeBreadcrumbItem = Object.assign({}, _breadcrumbItem.default, {
  install(app) {
    app.component(_breadcrumbItem.default.name, _breadcrumbItem.default);
  }
});
_dynamics.dynamicApp.use(VxeBreadcrumbItem);
_core.VxeUI.component(_breadcrumbItem.default);
const BreadcrumbItem = exports.BreadcrumbItem = VxeBreadcrumbItem;
var _default = exports.default = VxeBreadcrumbItem;