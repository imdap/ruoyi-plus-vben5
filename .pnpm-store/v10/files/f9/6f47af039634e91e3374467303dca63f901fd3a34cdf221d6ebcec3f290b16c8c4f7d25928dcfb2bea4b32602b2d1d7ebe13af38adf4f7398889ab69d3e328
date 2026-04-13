"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeDatePanel = exports.DatePanel = void 0;
var _core = require("@vxe-ui/core");
var _datePanel = _interopRequireDefault(require("./src/date-panel"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeDatePanel = exports.VxeDatePanel = Object.assign({}, _datePanel.default, {
  install(app) {
    app.component(_datePanel.default.name, _datePanel.default);
  }
});
_dynamics.dynamicApp.use(VxeDatePanel);
_core.VxeUI.component(_datePanel.default);
const DatePanel = exports.DatePanel = VxeDatePanel;
var _default = exports.default = VxeDatePanel;