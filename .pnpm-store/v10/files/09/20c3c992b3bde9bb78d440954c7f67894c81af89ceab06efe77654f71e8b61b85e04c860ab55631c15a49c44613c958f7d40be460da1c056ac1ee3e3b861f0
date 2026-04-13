"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxePrint = exports.Print = void 0;
var _core = require("@vxe-ui/core");
var _print = _interopRequireDefault(require("./src/print"));
var _dynamics = require("../dynamics");
var _util = require("./src/util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxePrint = exports.VxePrint = Object.assign({}, _print.default, {
  install(app) {
    app.component(_print.default.name, _print.default);
  }
});
_dynamics.dynamicApp.use(VxePrint);
_core.VxeUI.component(_print.default);
_core.VxeUI.print = _util.printHtml;
const Print = exports.Print = VxePrint;
var _default = exports.default = VxePrint;