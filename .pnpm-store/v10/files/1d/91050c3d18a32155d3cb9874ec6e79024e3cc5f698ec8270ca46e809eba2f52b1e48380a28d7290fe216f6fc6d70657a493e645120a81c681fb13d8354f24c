"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeSteps = exports.Steps = void 0;
var _core = require("@vxe-ui/core");
var _steps = _interopRequireDefault(require("./src/steps"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeSteps = exports.VxeSteps = Object.assign({}, _steps.default, {
  install(app) {
    app.component(_steps.default.name, _steps.default);
  }
});
_dynamics.dynamicApp.use(VxeSteps);
_core.VxeUI.component(_steps.default);
const Steps = exports.Steps = VxeSteps;
var _default = exports.default = VxeSteps;