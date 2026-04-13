"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeButtonGroup = exports.ButtonGroup = void 0;
var _core = require("@vxe-ui/core");
var _buttonGroup = _interopRequireDefault(require("../button/src/button-group"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeButtonGroup = exports.VxeButtonGroup = Object.assign({}, _buttonGroup.default, {
  install(app) {
    app.component(_buttonGroup.default.name, _buttonGroup.default);
  }
});
_dynamics.dynamicApp.use(VxeButtonGroup);
_core.VxeUI.component(_buttonGroup.default);
const ButtonGroup = exports.ButtonGroup = VxeButtonGroup;
var _default = exports.default = VxeButtonGroup;