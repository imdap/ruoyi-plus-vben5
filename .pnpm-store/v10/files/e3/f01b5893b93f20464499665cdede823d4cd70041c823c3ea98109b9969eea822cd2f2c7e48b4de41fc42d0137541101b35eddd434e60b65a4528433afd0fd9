"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeBacktop = exports.Backtop = void 0;
var _core = require("@vxe-ui/core");
var _backtop = _interopRequireDefault(require("./src/backtop"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeBacktop = exports.VxeBacktop = Object.assign({}, _backtop.default, {
  install(app) {
    app.component(_backtop.default.name, _backtop.default);
  }
});
_dynamics.dynamicApp.use(VxeBacktop);
_core.VxeUI.component(_backtop.default);
const Backtop = exports.Backtop = VxeBacktop;
var _default = exports.default = VxeBacktop;