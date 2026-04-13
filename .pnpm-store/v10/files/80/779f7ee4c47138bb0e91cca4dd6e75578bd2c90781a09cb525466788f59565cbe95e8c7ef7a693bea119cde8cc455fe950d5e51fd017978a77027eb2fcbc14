"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeRate = exports.Rate = void 0;
var _core = require("@vxe-ui/core");
var _rate = _interopRequireDefault(require("./src/rate"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeRate = exports.VxeRate = Object.assign({}, _rate.default, {
  install(app) {
    app.component(_rate.default.name, _rate.default);
  }
});
_dynamics.dynamicApp.use(VxeRate);
_core.VxeUI.component(_rate.default);
const Rate = exports.Rate = VxeRate;
var _default = exports.default = VxeRate;