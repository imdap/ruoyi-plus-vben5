"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeDateRangePicker = exports.DateRangePicker = void 0;
var _core = require("@vxe-ui/core");
var _dateRangePicker = _interopRequireDefault(require("./src/date-range-picker"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeDateRangePicker = exports.VxeDateRangePicker = Object.assign({}, _dateRangePicker.default, {
  install(app) {
    app.component(_dateRangePicker.default.name, _dateRangePicker.default);
  }
});
_dynamics.dynamicApp.use(VxeDateRangePicker);
_core.VxeUI.component(_dateRangePicker.default);
const DateRangePicker = exports.DateRangePicker = VxeDateRangePicker;
var _default = exports.default = VxeDateRangePicker;