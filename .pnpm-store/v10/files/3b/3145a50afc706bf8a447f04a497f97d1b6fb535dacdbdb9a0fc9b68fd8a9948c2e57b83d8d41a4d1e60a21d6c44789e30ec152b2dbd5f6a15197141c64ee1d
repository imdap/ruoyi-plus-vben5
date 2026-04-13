"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeResult = exports.Result = void 0;
var _core = require("@vxe-ui/core");
var _result = _interopRequireDefault(require("./src/result"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeResult = exports.VxeResult = Object.assign({}, _result.default, {
  install(app) {
    app.component(_result.default.name, _result.default);
  }
});
_dynamics.dynamicApp.use(VxeResult);
_core.VxeUI.component(_result.default);
const Result = exports.Result = VxeResult;
var _default = exports.default = VxeResult;