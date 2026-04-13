"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeCalendar = exports.Calendar = void 0;
var _core = require("@vxe-ui/core");
var _calendar = _interopRequireDefault(require("./src/calendar"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeCalendar = exports.VxeCalendar = Object.assign({}, _calendar.default, {
  install(app) {
    app.component(_calendar.default.name, _calendar.default);
  }
});
_dynamics.dynamicApp.use(VxeCalendar);
_core.VxeUI.component(_calendar.default);
const Calendar = exports.Calendar = VxeCalendar;
var _default = exports.default = VxeCalendar;