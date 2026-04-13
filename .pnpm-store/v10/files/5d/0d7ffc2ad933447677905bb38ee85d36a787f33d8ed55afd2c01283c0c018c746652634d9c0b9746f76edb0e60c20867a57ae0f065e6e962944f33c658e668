"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeSegmented = exports.Segmented = void 0;
var _core = require("@vxe-ui/core");
var _segmented = _interopRequireDefault(require("./src/segmented"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeSegmented = exports.VxeSegmented = Object.assign({}, _segmented.default, {
  install(app) {
    app.component(_segmented.default.name, _segmented.default);
  }
});
_dynamics.dynamicApp.use(VxeSegmented);
_core.VxeUI.component(_segmented.default);
const Segmented = exports.Segmented = VxeSegmented;
var _default = exports.default = VxeSegmented;