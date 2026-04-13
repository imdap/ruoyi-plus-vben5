"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeDatePicker = exports.DatePicker = void 0;
var _core = require("@vxe-ui/core");
var _datePicker = _interopRequireDefault(require("./src/date-picker"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeDatePicker = exports.VxeDatePicker = Object.assign({}, _datePicker.default, {
  install(app) {
    app.component(_datePicker.default.name, _datePicker.default);
  }
});
_dynamics.dynamicApp.use(VxeDatePicker);
_core.VxeUI.component(_datePicker.default);
const DatePicker = exports.DatePicker = VxeDatePicker;
var _default = exports.default = VxeDatePicker;