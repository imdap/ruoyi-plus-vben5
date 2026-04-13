"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeNumberInput = exports.NumberInput = void 0;
var _core = require("@vxe-ui/core");
var _numberInput = _interopRequireDefault(require("./src/number-input"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeNumberInput = exports.VxeNumberInput = Object.assign({}, _numberInput.default, {
  install(app) {
    app.component(_numberInput.default.name, _numberInput.default);
  }
});
_dynamics.dynamicApp.use(VxeNumberInput);
_core.VxeUI.component(_numberInput.default);
const NumberInput = exports.NumberInput = VxeNumberInput;
var _default = exports.default = VxeNumberInput;