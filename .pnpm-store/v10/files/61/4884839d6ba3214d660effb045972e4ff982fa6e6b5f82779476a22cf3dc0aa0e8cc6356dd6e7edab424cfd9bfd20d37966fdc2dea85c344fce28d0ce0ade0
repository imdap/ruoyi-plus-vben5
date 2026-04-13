"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeRow = exports.Row = void 0;
var _core = require("@vxe-ui/core");
var _row = _interopRequireDefault(require("./src/row"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeRow = exports.VxeRow = Object.assign({}, _row.default, {
  install(app) {
    app.component(_row.default.name, _row.default);
  }
});
_dynamics.dynamicApp.use(VxeRow);
_core.VxeUI.component(_row.default);
const Row = exports.Row = VxeRow;
var _default = exports.default = VxeRow;